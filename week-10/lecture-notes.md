# Week 10 — EF Core I: The Log Leaves the Building

Everything the station knows has been on one laptop since week 3. Tonight it moves onto a server, and the last thing that happens is the station disagreeing with itself.

---

## The log leaves the building

Week 3 ended with three records typed in and lost at the door. Week 8 gave the log a file and it came back. A file fixed exactly one thing — *the program forgetting* — and left the other one alone:

> **A file is still your file.** It is on your laptop, in your folder. Nobody else can read it, nothing else can write to it, and if that machine goes in a drawer so does everything the station knows.

Tonight the same six lines live on the college's SQL Server, and the last beat of the demo reads one of them back from a query with the program closed.

**What actually changes is smaller than it sounds.** Two methods on `Watch` take a database instead of a path. Every rule about who may go out, when a time may be amended, what the last reading was — untouched, because none of it ever cared where the book was kept.

---

## A class becomes a table

EF Core's whole idea is that you already described your data, in C#, when you wrote the class. A table is that description with column types filled in.

Here is the one week 10 adds to Haldane. It is a complete file — `week-10/Haldane/LogRow.cs`:

```csharp
using System.ComponentModel.DataAnnotations.Schema;

public class LogRow
{
    public int Id { get; set; }

    public string Kind { get; set; } = "";
    public string Time { get; set; } = "";
    public string Who { get; set; } = "";
    public string Reason { get; set; } = "";
    public string Expected { get; set; } = "";

    [Column(TypeName = "decimal(4,1)")]
    public double Celsius { get; set; }

    public int Liters { get; set; }
    public bool IsBack { get; set; }
}
```

That is one line of the watch log — the same line the file has held since week 8 — with the pipes taken out and a name written over each field:

```
SIGNOUT|14:20|Reyes|DIG OUT|14:45|out
```

**A class EF Core keeps in a table is called an *entity*.** It is an ordinary class. There is no base class to inherit and no interface to satisfy.

### Id, and why the database wants one

One line, at the top of the class you just saw — and in the lab it goes at the top of `Song.cs`, in your project at the top of your own record:

```csharp
public int Id { get; set; }
```

A table needs one column that is different on every row, so it can say *that one*. It is called the **primary key**, and EF Core looks for a property called `Id` (or `<ClassName>Id`) and uses it without being asked.

⚠️ **Nothing at the station has an Id.** A payphone does not have one. A sign-out does not have one. It is the database's own name for the row, and it is the one property this week asks you to add that your world would not recognize.

**You never set it.** The migration marks the column `IDENTITY`, which means SQL Server fills it in. A record you have just made has `Id == 0`; a record that came out of the table has whatever number the database gave it — and [that difference is what `Save` runs on](#save--add-update-or-remove).

### `[NotMapped]` — the things a class works out

A table gets a column for **everything the class can tell you**, including the things it computes. That is usually wrong:

```csharp
// inside Song.cs, in the lab
[NotMapped]
public string Length => Broadcast.Clock(Seconds);
```

`Length` is not a fact about a cart. It is arithmetic on `Seconds`. Storing it would mean keeping the same fact in two places and letting them drift apart — a cart whose `Seconds` was corrected but whose `Length` column still says the old thing.

**The test is one question: is this something the record KEEPS, or something it WORKS OUT?** Keeps → a column. Works out → `[NotMapped]`.

It needs a using at the top of the file:

```csharp
using System.ComponentModel.DataAnnotations.Schema;
```

> 💡 **Week 8's `[JsonInclude]` comes OFF.** The JSON serializer would write a `private set` property out and then refuse to read it back, so week 8 had to say "yes, this one too". **EF Core sets private setters the same way your class does, from inside, and needs no telling.** Different tool, different rules — and one fewer attribute.

---

## The DbContext

One class, and it is two things at once: **the list of tables this program knows about**, and **the thing that knows how to reach them**.

A complete file — `week-10/Haldane/StationContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class StationContext : DbContext
{
    public DbSet<LogRow> Log { get; set; }

    public StationContext()
    {
    }

    public StationContext(DbContextOptions<StationContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (options.IsConfigured)
        {
            return;
        }

        IConfiguration config = new ConfigurationBuilder()
            .AddUserSecrets<StationContext>()
            .Build();

        options.UseSqlServer(config["ConnectionStrings:Haldane"]);
    }
}
```

**`public DbSet<LogRow> Log { get; set; }`** is the line that turns a class into a table. One property per table, and **the name of the property is the name of the table** — this one makes a table called `Log`.

**The two constructors are not ceremony**, and the second one is the more interesting:

| Constructor | Used by | Means |
|---|---|---|
| `StationContext()` | your program, and `dotnet ef` | *go and find out where the database is* |
| `StationContext(DbContextOptions<StationContext>)` | tests and checks | *I am telling you where to put the rows* |

`OnConfiguring` runs when a context is being set up. `if (options.IsConfigured) return;` means **somebody already said where the rows go — do not argue with it.** Without that line, a test that hands in a throwaway table would have its answer overwritten by the connection string. [That is what makes the whole week testable.](#testing-database-code-without-a-database)

> ⚠️ **Making a context connects to nothing.** `new StationContext()` opens no connection, touches no network and cannot fail. The first *question* you ask it is what opens a connection — which is why a wrong connection string surfaces as an error somewhere that looks unrelated.

---

## A console app builds its own configuration

**An ASP.NET app gets configuration handed to it. A console app does not, and this is not hand-waving — there is no settings file and nothing has read one.** You build it yourself, from whatever sources you choose.

This is the body of `OnConfiguring`, out of the complete `StationContext.cs` above:

```csharp
IConfiguration config = new ConfigurationBuilder()
    .AddUserSecrets<StationContext>()
    .Build();

string? connection = config["ConnectionStrings:Haldane"];
```

Three things, in order:

- **`new ConfigurationBuilder()`** — an empty pile of settings, with no sources in it.
- **`.AddUserSecrets<StationContext>()`** — add one source: the secret store for *this project*. ⚠️ **The type in the angle brackets is how it finds the project** — it reads the assembly that type lives in, and looks up the `UserSecretsId` recorded there. Any type from your own project does.
- **`.Build()`** — turn the pile into something you can read keys out of.

**`config["ConnectionStrings:Haldane"]` is the key**, and the colon means *nested*. A store holding

```json
{ "ConnectionStrings:Haldane": "Server=…" }
```

and one holding

```json
{ "ConnectionStrings": { "Haldane": "Server=…" } }
```

read back identically.

It needs two packages:

```bash
dotnet add <project> package Microsoft.Extensions.Configuration
dotnet add <project> package Microsoft.Extensions.Configuration.UserSecrets
```

---

## `dotnet user-secrets` — the four commands

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:Project" "Server=…;Database=…"
dotnet user-secrets list
dotnet user-secrets remove "ConnectionStrings:Project"
```

**`init` comes first and it is not optional.** It writes one line into your `.csproj`:

```xml
<UserSecretsId>7c7e0ab2-…</UserSecretsId>
```

⚠️ ⚠️ **That is not a secret. It is a folder name** — it says *this project's secrets live in a folder called that*. It is meant to be committed, and it is the only part of this that ever goes in the repo.

⚠️ ⚠️ **SKIPPING `init` FAILS SILENTLY, AND IT IS THE WORST BUG IN THIS WEEK.** `AddUserSecrets<T>()` on a project with no `UserSecretsId` **does not throw**. It adds a source that holds nothing, `config["…"]` reads back `null`, and the first thing you hear about it is much later:

```
System.InvalidOperationException: The ConnectionString property has not been initialized.
```

**`dotnet user-secrets list` is the one-line discriminator**, and it answers three different ways:

| What it says | What it means |
|---|---|
| `ConnectionStrings:Project = Server=…` | it is there |
| `No secrets configured for this application.` | `init` ran, the store is empty — **you never `set` it, or the machine was wiped** |
| `Could not find the global property 'UserSecretsId'…` | **`init` never ran** |

### Where secrets actually live (and the restore drill)

| | |
|---|---|
| **macOS / Linux** | `~/.microsoft/usersecrets/<UserSecretsId>/secrets.json` |
| **Windows** | `%APPDATA%\Microsoft\UserSecrets\<UserSecretsId>\secrets.json` |

Your home directory. **Not the repo, not the project, nowhere git has ever looked.** That is the whole of what user secrets do, and it is worth being exact about what they do *not*:

- **Not encrypted.** It is a plain text file. Anybody sitting at your machine can read it.
- **Not shared.** Per machine and per project. Your laptop's store and the lab PC's store are different files.
- **Not deployment.** A real server gets its own answer, and you will meet it somewhere that is not this course.

**What they are is *not in the repo*, which is the problem you actually have.**

> ⚠️ **THE RESTORE DRILL — the lab PCs wipe on reboot, and they take the secret store with them.** It is one command, under a minute, and nothing else is lost:
>
> ```bash
> dotnet user-secrets set "ConnectionStrings:Project" "Server=…;Database=…;User Id=…;Password=…;TrustServerCertificate=True"
> ```
>
> **Keep the string somewhere that is not the repo** — a note on your phone, a text file in your home folder. ⚠️ **Not in the repo, and not in a file inside the project folder**, which is the trap: a `connection.txt` next to your code is exactly the thing this week exists to prevent, and `.gitignore` will not save you from `git add -f` or from a future you.
>
> **`dotnet user-secrets init` does NOT need running again** — the id is in the csproj, which is committed. Only the value is gone.

### The connection string, field by field

```
Server=THE-SERVER;Database=DB_KDXR_156101411_ABL;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True
```

| Field | What it is |
|---|---|
| `Server` | the machine. The one on the board in class |
| `Database` | **yours**, and you choose the name — see below |
| `User Id` / `Password` | your college SQL account |
| `TrustServerCertificate=True` | ⚠️ **not optional decoration.** Connections are encrypted by default; without this, a server whose certificate your machine does not recognize is refused outright |

### Naming your database

**Every database in this course starts `DB_`:**

```
DB_<APP>_<COURSE-NUMBER>_<INITIALS>
```

so the lab's is `DB_KDXR_156101411_ABL` and your project's is `DB_<YOURTOPIC>_156101411_<YOURINITIALS>`.

⚠️ **The prefix is not decoration.** A student taking the web course as well can pick the same project topic in both, and without `DB_` the two collide — on a shared server, under one account, with no warning.

---

## Migrations — `add`, and `update`

Two commands. **Only one of them touches the server**, and confusing them is the commonest way this week goes wrong at home.

```bash
dotnet ef migrations add TheRegistryMovesIn
```

Compares your classes to what it wrote last time, and **writes a file**. It connects to nothing. It works on a plane, and it works with no connection string at all.

```bash
dotnet ef database update
```

**Connects.** Creates the database if there isn't one, then runs every migration that has not been run yet.

Both need the tool, installed once per machine:

```bash
dotnet tool install --global dotnet-ef
```

and a package in the project, so the tool can see your classes:

```bash
dotnet add <project> package Microsoft.EntityFrameworkCore.Design
```

### Reading the `Up()` method

`migrations add` writes a class into `Migrations/`. Open it — this is the point of the exercise, not a formality:

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.CreateTable(
        name: "Log",
        columns: table => new
        {
            Id = table.Column<int>(type: "int", nullable: false)
                .Annotation("SqlServer:Identity", "1, 1"),
            Kind = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Celsius = table.Column<decimal>(type: "decimal(4,1)", nullable: false),
            IsBack = table.Column<bool>(type: "bit", nullable: false)
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_Log", x => x.Id);
        });
}
```

**That is your class with the column types filled in.** `string` became `nvarchar(max)`. `bool` became `bit`. `Id` became an int the database fills in itself.

There is a `Down()` underneath it that drops the table again. **That is why it is called a migration rather than a script: it knows both directions.**

---

## `Save` — add, update, or remove

Week 8's `Save` wrote the whole file from scratch every time. **You cannot do that to a table**, and the reason is `Id`:

```
Cannot insert explicit value for identity column in table 'Payphones'
when IDENTITY_INSERT is set to OFF.
```

A record loaded out of row 3 is still carrying the number 3. Empty the table and put it back and you are asking SQL Server to let your program choose its own row numbers, which it will not.

**So `Save` says which of three things each record is, and `Id` is how it tells:**

```csharp
// inside Registry.cs
public void Save(ProjectContext db)
{
    // Off the books: anything the table holds that the registry does not.
    foreach (Payphone onFile in db.Payphones.ToList())
    {
        if (!_items.Any(phone => phone.Id == onFile.Id))
        {
            db.Payphones.Remove(onFile);
        }
    }

    foreach (Payphone phone in _items)
    {
        if (phone.Id == 0)
        {
            db.Payphones.Add(phone);
        }
        else
        {
            db.Payphones.Update(phone);
        }
    }

    db.SaveChanges();
}
```

| | |
|---|---|
| `Id == 0` | never been on file. **`Add`** |
| `Id != 0` | the table already has that row. **`Update`** |
| on file, not in the registry | **`Remove`** |

> ⚠️ ⚠️ **`Add`, `Update` and `Remove` DO NOTHING ON THEIR OWN.** They write down what is *intended*. **`SaveChanges()` is the line that goes to the server**, and it takes the lot in one trip — all of it or none of it. A `Save` with no `SaveChanges()` is the single most common failure this week, and the symptom is that nothing arrives and nothing complains.

---

## `Load` — and the first night

```csharp
// inside Registry.cs
public void Load(ProjectContext db)
{
    List<Payphone> loaded = db.Payphones.ToList();

    if (loaded.Count == 0)
    {
        return;
    }

    _items.Clear();
    _items.AddRange(loaded);
}
```

Two things it has to get right, and week 8 had both:

- **Loading is REPLACING.** `_items.Clear()` before the `AddRange`, or a `Program.cs` that seeds three records and then loads three ends up holding six.
- ⚠️ ⚠️ **THE FIRST NIGHT, and this is the one that bites.** Week 8 asked `File.Exists` before reading, because a program nobody has run has no file. **A table is not like that — the migration made it, so it is always there. On the first run it is EMPTY**, which is the same situation wearing different clothes. A `Load` that clears before it looks throws your seeded records away, and the next line of `Program.cs` reaches for one and finds nothing.

**Read the rows into a list first, and return early when there are none of them.**

> 💡 **`.ToList()` is week 9's, doing week 9's job.** `db.Payphones` is a question, not an answer; without `ToList()` every pass round a loop would go back to the server.

---

## Testing database code without a database

The suite you have been growing since week 7 does not stop working this week, and it does not need a server.

**EF Core can keep a table in memory** — one that lives inside the test run and disappears with it:

```csharp
// inside your test file
using Microsoft.EntityFrameworkCore;

DbContextOptions<ProjectContext> somewhereElse =
    new DbContextOptionsBuilder<ProjectContext>()
        .UseInMemoryDatabase("mine-" + Guid.NewGuid())
        .Options;

using (ProjectContext db = new ProjectContext(somewhereElse))
{
    registry.Save(db);
}

// A second registry, and a second context — reading the same rows.
Registry reopened = new Registry();

using (ProjectContext db = new ProjectContext(somewhereElse))
{
    reopened.Load(db);
}

Assert.Equal(1, reopened.Count);
```

It needs one package, **on the test project, not on your program**:

```bash
dotnet add Project.Tests package Microsoft.EntityFrameworkCore.InMemory
```

- **`Guid.NewGuid()` in the name** so two tests running at once can never see each other's rows.
- **The second constructor is what makes this possible** — the test tells the context where to put things, and `if (options.IsConfigured) return;` in `OnConfiguring` is what stops the connection string overruling it.
- **Two contexts, not one.** Saving and loading through the same context proves nothing: it would hand you back the objects it is already holding.

> ⚠️ **This says NOTHING about whether your connection string is right.** These tests pass on a laptop with the wifi off. **Running your program is the only thing that tells you the real database works** — which is why every task this week ends with a run as well as a test.

---

## Case, and what the database does not care about

Type a name in lower case at the desk and it is refused. Ask the database the same thing and it hands the row over:

```
b → reyes             Nobody outside by that name.
```
```sql
WHERE Who = 'reyes'   →   SIGNOUT  14:20  Reyes  DIG OUT  14:45
```

**C# compares strings letter by letter, and `R` is not `r`.** SQL Server compares them under a *collation*, and the usual default — `SQL_Latin1_General_CP1_CI_AS` — has `CI` in it for **case-insensitive**.

⚠️ **Nothing you wrote chose this.** It came with the database, and almost every SQL Server you will ever meet is set that way. It matters now because there are suddenly two things that can answer a question about your data, and this week they answer differently.

**When your searches start running inside the database rather than in C#, this stops being a curiosity — that is week 12.**

---

## 🆘 Troubleshooting

| What you see | What it means |
|---|---|
| `InvalidOperationException: The ConnectionString property has not been initialized.` | The config read back nothing. **Two causes, and `dotnet user-secrets list` tells them apart** — see [the four commands](#dotnet-user-secrets--the-four-commands). Either `init` never ran, or the store is empty. |
| `Could not find the global property 'UserSecretsId'` | `dotnet user-secrets init` never ran in this project. |
| `No secrets configured for this application.` | `init` ran; nothing was `set`. **On a lab PC this is the reboot** — [the restore drill](#where-secrets-actually-live-and-the-restore-drill) is one command. |
| `SqlException: Cannot open database "DB_…" requested by the login` | The database does not exist. `dotnet ef database update` makes it — you probably ran `migrations add` and stopped. |
| `SqlException: A network-related or instance-specific error…` | The server name is wrong, or you are not on a network that can reach it. Check `Server=` first. |
| `SqlException: The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing from the connection string. |
| `SqlException: Login failed for user` | Wrong `User Id` or `Password`. Retype the whole connection string with `dotnet user-secrets set` — it replaces. |
| `SqlException: Invalid object name 'Payphones'` | The database is there and the table is not. `dotnet ef database update`. |
| `Cannot insert explicit value for identity column` | `Save` is `Add`ing a record that came out of the table. [It is an `Update`, and `Id` is how you tell.](#save--add-update-or-remove) |
| Nothing arrives in the table and nothing complains | **No `db.SaveChanges()`.** [`Add` only writes down what you intend.](#save--add-update-or-remove) |
| Your seeded records vanish on the first run | [`Load` cleared before it looked, and the table was empty.](#load--and-the-first-night) |
| The registry holds six records and you added three | `_items.Clear()` is missing from `Load`. Loading is replacing. |
| A count that should be 1 comes back 0 after a round trip | The property is `[NotMapped]`, or it is worked out rather than kept. **`[JsonInclude]` is not the answer any more** — [EF Core sets private setters on its own](#notmapped--the-things-a-class-works-out). |
| `dotnet ef` : *command not found* | `dotnet tool install --global dotnet-ef`. |
| `The Entity Framework tools version … is older than that of the runtime` | Harmless, and one command to silence: `dotnet tool update --global dotnet-ef`. |
| `Unable to create a 'DbContext' of type …` | `dotnet ef` could not construct your context. It needs the **empty** constructor — check you did not delete it when you added the other one. |
| `CS0246: The type or namespace name 'DbContext' could not be found` | Missing `using Microsoft.EntityFrameworkCore;`, or the SqlServer package was never added. |
| `CS0246: … 'NotMappedAttribute' could not be found` | `using System.ComponentModel.DataAnnotations.Schema;` at the top of the file. |
| Your tests want a database | They should not. [Hand the context somewhere else.](#testing-database-code-without-a-database) |
| A search finds nothing and you can see the record | Compare exactly what you typed with exactly what is stored — **and if it matched in SQL and not in C#, [that is tonight's last beat](#case-and-what-the-database-does-not-care-about).** |

**Prev:** [Week 9 — LINQ, and Thirty Lines Become One](../week-09/lecture-notes.md) · **Next:** Week 11 *(coming)*
