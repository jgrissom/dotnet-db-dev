# Week 10 — Lecture Notes

**These notes are further reading.** The [lab](lab/README.md) and the [homework](homework.md) each tell you what to write and give you the syntax. Come here when you want to know **why** a line is written the way it is.

The examples are the lab's, on KDXR's `Rotation`, `Switchboard`, `Song` and `Caller`. Where a section is about the homework, the example is a registry of lighthouses.

**Entity Framework Core**, EF Core for short, is how a C# program keeps its data in a database without writing the database's own language, SQL, by hand. You describe the tables with classes. EF Core makes the tables, and turns objects into rows and rows back into objects.

## A class becomes a table

A table has columns, and EF Core makes one for each property the class **keeps**. This is `Song`, from `Lab/Song.cs`, as the database sees it:

| Property | A column? | Why |
|---|---|---|
| `Id` | yes, and the key | the database's own number for the row |
| `Title`, `Artist`, `Seconds` | yes | facts the cart keeps, with a `get` and a `set` |
| `PlaysTonight` | yes | it has a `private set`, and EF Core uses that the same way the class does |
| `Length`, `Kind`, `Cue` | **no** | they have only a `get`. They are worked out from the others, so EF Core leaves them out without being told |

**Every table needs one column that is unique.** EF Core looks for a property called `Id`:

```csharp
    public int Id { get; set; }
```

That line goes at the top of the class, inside its braces. **Nothing in the program sets it.** A cart that has never been saved has `Id` 0, and `SaveChanges` fills in the number the database gave its row. The migration marks it `Identity`, which means the database numbers the rows itself, 1, 2, 3, and never reuses a number, even after a row is deleted.

**Two things stop EF Core making a table for a class, and the switchboard's `Caller` had both.**

- **A constructor parameter EF Core can't fill in.** When EF Core reads a caller back, it builds one with `new Caller(name)`, and it fills `name` from the `Name` column. `Name` was `{ get; }`, so it had no column, and EF Core said `Cannot bind 'name' in 'Caller(string name)'`. **The fix is a `private set`:** `public string Name { get; private set; }`. The property gets a column, and nothing outside the class can change it.
- **A property that holds another class.** `Caller.Favorite` is a whole `Song`. EF Core saw it and decided songs needed a table of their own, then said `The entity type 'Song' requires a primary key`. A favorite isn't saved this week, so `[NotMapped]` tells EF Core to leave the property out:

  ```csharp
      [NotMapped]
      public Song? Favorite { get; private set; }
  ```

  `[NotMapped]` needs `using System.ComponentModel.DataAnnotations.Schema;` at the top of the file.

## The DbContext

**A `DbContext` is the program's database, in one class.** It says which tables there are, and how to reach them. This is the lab's whole `Lab/DeskContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class DeskContext : DbContext
{
    public DbSet<Caller> Callers { get; set; }

    public DbSet<Song> Songs { get; set; }

    public DeskContext()
    {
    }

    public DeskContext(DbContextOptions<DeskContext> options)
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
            .AddUserSecrets<DeskContext>()
            .Build();

        options.UseSqlServer(config["ConnectionStrings:Desk"]);
    }
}
```

- **One `DbSet` is one table**, and the property's name is the table's name. `db.Songs` is how the rest of the program reaches the carts.
- **The constructor that takes nothing** is the one the desk uses: `DeskContext db = new DeskContext();`. So does `dotnet ef`, when it makes migrations. Take it away and `dotnet ef` says `Unable to create a 'DbContext'`.
- **The constructor that takes `options`** lets somebody else say where the rows go. Tests use it to hand in [a table that lives inside the test run](#testing-without-a-database). `: base(options)` passes the options on to `DbContext`.
- **`OnConfiguring`** runs when the context first needs a connection. If a test already handed in options, `IsConfigured` is true and it leaves them alone. Otherwise it reads the connection string and tells EF Core to use SQL Server.
- **A console program reads no settings on its own.** A web project gets its configuration built for it. A console app builds it by hand: `new ConfigurationBuilder()`, one source, `.AddUserSecrets<DeskContext>()`, then `.Build()`. The `<DeskContext>` tells it which project's secret store to read.

⚠️ **Making a `DeskContext` connects to nothing.** The connection opens the first time something asks the database a question, which in the desk is `Load`.

## User secrets — a password outside the repo

A **connection string** is one line saying which server, which database, and who you are:

```
Server=YOUR-SERVER;Database=DB_KDXR_156101411_ABL;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True
```

**It has your password in it, so it never goes in a repo.** A repo is read by other people, and anything pushed to one stays in its history. User secrets keep values like this in a file in your home folder, outside every repo you have.

**Four commands, all run from the top of your repo:**

| Command | What it does |
|---|---|
| `dotnet user-secrets init --project week-10/Lab` | Turns the store on. It writes a `<UserSecretsId>` into the `.csproj`. That id is a folder name, not a secret, and it is committed |
| `dotnet user-secrets set "ConnectionStrings:Desk" "…" --project week-10/Lab` | Puts a value in. Running it again replaces it |
| `dotnet user-secrets list --project week-10/Lab` | Shows what is in the store — **including the password**, so on your own screen only |
| `dotnet user-secrets remove "ConnectionStrings:Desk" --project week-10/Lab` | Takes one value out |

**`list` is the first thing to run when the program can't find its database**, because it answers three different ways:

| `list` says | What it means |
|---|---|
| `Could not find the global property 'UserSecretsId'` | `init` never ran on this project |
| `No secrets configured for this application.` | `init` ran, and `set` didn't — or this is a lab PC that rebooted |
| `ConnectionStrings:Desk = Server=…` | the store is fine. The problem is in the string itself, or on the server |

⚠️ **The first two both show up later, when the program runs, as the same message:** `The ConnectionString property has not been initialized.` Nothing complains at startup. `list` is how you tell them apart.

The file itself is `secrets.json`, in a folder named by the `UserSecretsId`:

- **Mac and Linux:** `~/.microsoft/usersecrets/<UserSecretsId>/secrets.json`
- **Windows:** `%APPDATA%\Microsoft\UserSecrets\<UserSecretsId>\secrets.json`

### What user secrets are not

- **Not encrypted.** It is a plain text file. Anybody who can open your home folder can read it.
- **Not shared.** It is on this machine only. A classmate cloning your repo gets the `UserSecretsId` and no secret.
- **Not for a deployed program.** A program running on a server gets its connection string from that server's own settings. Nothing in this course deploys.

**The one problem user secrets solve is that the password is not in the repo.** That is the whole job.

### A lab PC that rebooted

Lab PCs wipe your home folder when they restart, and the secret store goes with it. **The `UserSecretsId` is still in your `.csproj`, so `init` is not needed again.** Putting it back is the one `set` command, run again with your connection string:

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=…;Database=…;User Id=…;Password=…;TrustServerCertificate=True" --project week-10/Lab
```

For the homework it is `"ConnectionStrings:Project"` and `--project Project`. **Keep your connection string somewhere that isn't the repo and isn't that PC**, so the command is a paste, not a memory test.

### Naming your database

**Every database in this course starts `DB_`:** `DB_<APP>_<COURSE-NUMBER>_<INITIALS>`.

- The lab's: `DB_KDXR_156101411_ABL`
- A homework about lighthouses: `DB_LIGHTHOUSES_156101411_ABL`

**The `DB_` is not decoration.** If you take another course on the same server and pick the same topic, your databases can't collide.

**Two fields in the connection string trip people up:**

- **`Database=`** is a database that doesn't exist yet the first time. `dotnet ef database update` makes it.
- **`TrustServerCertificate=True`** is required. Without it the server refuses the connection, with *The certificate chain was issued by an authority that is not trusted*.

## Migrations — `add`, then `update`

**A migration is the instructions for making your tables, written as a C# class.** `dotnet ef` writes it for you, by reading your context and comparing it with what it wrote last time. Two commands, and **only the second one touches the server:**

| Command | What it does | Needs the server? |
|---|---|---|
| `dotnet ef migrations add TheDeskMovesIn --project week-10/Lab` | writes `Lab/Migrations/…_TheDeskMovesIn.cs` | **no** |
| `dotnet ef database update --project week-10/Lab` | carries out every migration the database hasn't had, making the database first if it isn't there | **yes** |

**The commonest mistake is running the first and not the second.** The migration exists, so the checks are happy, and the program says `Invalid object name 'Songs'`: the database is there and the table isn't.

**Read `Up()`.** It is your class with the column types filled in:

```csharp
            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Artist = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seconds = table.Column<int>(type: "int", nullable: false),
                    PlaysTonight = table.Column<int>(type: "int", nullable: false)
                },
```

That is a fragment of `Up()`, from the lab's migration. **Count the columns against your class**: everything it keeps, nothing it works out. `Down()`, under it, undoes `Up()`. The database keeps a table of its own, `__EFMigrationsHistory`, listing which migrations it has had, which is how `update` knows what is left to do.

⚠️ **The `dotnet-ef` tool must be at least as new as the packages**, or every command prints a version warning first. `dotnet tool update --global dotnet-ef` installs it if it's missing and updates it if it's old.

## `Save` — `Add`, then `SaveChanges`

This is the rotation's first `Save`, from Task 4. It goes in `Rotation.cs`, in place of `Save(string path)`:

```csharp
    public void Save(DeskContext db)
    {
        foreach (Song song in _songs)
        {
            db.Songs.Add(song);
        }

        db.SaveChanges();
    }
```

- **`db.Songs.Add(song)` doesn't touch the server.** It tells the context *this one is to be put in the table*. The context keeps a list of everything it has been told.
- **`db.SaveChanges()` sends the whole list**, in one trip. Leave it out, and nothing arrives and nothing complains.
- **The context is handed in, never made inside `Rotation`.** That is the same reason the file path was handed in: `Rotation` doesn't know where it is being saved. A test can hand it a different place.

⚠️ **One context for the whole shift saves more than you asked it to.** The desk makes one `DeskContext` and hands it to both the switchboard and the rotation. **`SaveChanges()` sends every change that context is tracking**, carts included, whichever `Save` called it. So in the lab, a `Rotation.Save` with no `SaveChanges()` still seems to work, because the switchboard's runs first. Check 4 makes a fresh context, and catches it.

## `Load`, and the first night

```csharp
    public void Load(DeskContext db)
    {
        List<Song> loaded = db.Songs.OrderBy(song => song.Id).ToList();

        if (loaded.Count == 0)
        {
            return;
        }

        _songs.Clear();

        _songs.AddRange(loaded);
    }
```

That is the whole `Load`, in `Rotation.cs`.

- **`db.Songs` is a question, not an answer.** `ToList()` is the moment it is sent to the server and the rows come back, the same way `ToList()` ran a query in week 9.
- **A table keeps no order of its own.** Without `OrderBy`, the server may hand rows back in any order it likes. `OrderBy` on `Id` gives them back in the order they first went in.
- ⚠️ **The first night.** The old `Load` asked `File.Exists` first, because a desk that had never signed off had no file. The table is always there, because the migration made it, but the first time it is **empty**. A `Load` that clears before it looks throws away the carts `Program.cs` just added, and the desk crashes building the hour with `ArgumentOutOfRangeException`. **Read the rows first, and return when there are none.**
- **Loading is replacing.** `Clear()` before `AddRange`, or the loaded carts go in on top of the ones already there.

## The second save — `Add` or `Update`

**A cart that came out of the table is carrying the number of its row.** Its `Id` isn't 0 any more. Hand it to `Add` and the context tries to put a second row in with the same number, which the database refuses:

```
Cannot insert explicit value for identity column in table 'Songs' when IDENTITY_INSERT is set to OFF.
```

**So `Save` asks each cart which it is.** This replaces the one `Add` line inside `Save`'s loop:

```csharp
            if (song.Id == 0)
            {
                db.Songs.Add(song);
            }
            else
            {
                db.Songs.Update(song);
            }
```

- **`Id` 0** has never been saved: `Add` puts in a new row.
- **Any other `Id`** is a row the table already has: `Update` changes that row.

⚠️ **This week's `Save` only puts rows in and changes them.** A record taken off with `Remove()` is still in the table, so it comes back the next time the program loads. Taking rows out is a different job, for a later week.

## Testing without a database

**A test that needs the college's server fails whenever the network does, and needs your password.** So the tests hand the context a table that lives inside the test run, with the in-memory provider:

```bash
dotnet add week-10/Lab.Tests package Microsoft.EntityFrameworkCore.InMemory --version 10.0.13
```

This is the lab's `ACartRemembersItsPlays`, whole, in `Lab.Tests/DeskTests.cs` with `using Microsoft.EntityFrameworkCore;` at the top of the file:

```csharp
    [Fact]
    public void ACartRemembersItsPlays()
    {
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Song nightjar = new Song("Nightjar", "The Lamplighters", 227);
        nightjar.Play();
        nightjar.Play();

        Rotation rotation = new Rotation();
        rotation.Add(nightjar);
        rotation.Save(new DeskContext(options));

        Rotation reopened = new Rotation();
        reopened.Load(new DeskContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Equal(2, reopened.All()[0].PlaysTonight);
    }
```

- **`Guid.NewGuid().ToString()`** names the table something new every time, so no fact can see another fact's rows.
- **`new DeskContext(options)`** is the second constructor. It's why the context has one.
- **Save through one context and load through another.** Reading back through the same context can hand you the very same objects, which proves nothing about what reached the table. Assert on `reopened`, never on the rotation that saved.
- ⚠️ **The table in a test words mistakes differently.** The second-save mistake on the server is *Cannot insert explicit value for identity column*. In a test it is `System.ArgumentException : An item with the same key has already been added. Key: 1`. The same key means the same `Id`, twice.

**This is how my checks work too.** They never touch the server, which is why they pass with the wifi off and why they can't tell you whether your connection string is right. **Only running the program tests that.**

## The same name, twice

```
│ Dorothy │ 4     │ -         │
│ dorothy │ 1     │ Nightjar  │
```

The desk was asked for `dorothy`, with a small d. `Switchboard.Find` compares with `==`, and **`==` on strings compares every letter exactly, capitals included**. It found nobody, so the desk made a second caller. Then the database was asked:

```sql
SELECT * FROM Callers WHERE Name = 'dorothy';
```

**and it handed back both rows.** SQL Server compares text using the database's **collation**, a setting for how text is sorted and compared. The usual one, `SQL_Latin1_General_CP1_CI_AS`, has `CI` in it: case-insensitive. To this database, `Dorothy` and `dorothy` are the same name.

**Right now the desk asks its own list, in C#, so the C# rule wins.** A program that sends the question to the database instead gets the database's rule. Same question, same word, a different answer.

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `warning NU1902` / `NU1903` on `System.Security.Cryptography.Pkcs` | The SQL Server package uses a version with a known security problem. Add `System.Security.Cryptography.Pkcs --version 10.0.13` to the project yourself. |
| `The Entity Framework tools version '…' is older than that of the runtime` | `dotnet tool update --global dotnet-ef`. |
| `The ConnectionString property has not been initialized.` | No connection string was found. [`dotnet user-secrets list`](#user-secrets--a-password-outside-the-repo) says whether `init` or `set` is missing. |
| `Cannot open database "DB_…" requested by the login` | The database doesn't exist yet — `dotnet ef database update` — or the name in the connection string is different from the one you made. It arrives wrapped in *An exception has been raised that is likely due to a transient failure*. |
| `Login failed for user` | Wrong login or password. `set` again; `set` replaces. |
| `A network-related or instance-specific error…` | Wrong `Server=`, or a network that can't reach the server. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing. |
| `Invalid object name '…'` | The migration exists and was never carried out. `dotnet ef database update`. |
| `There is already an object named '…' in the database` | A migration is trying to make a table the database already has — usually two first migrations for the same database. |
| `Cannot bind 'name' in '…(string name)'` | A property the constructor needs has only a `get`. Give it a `private set`. |
| `The entity type '…' requires a primary key` | That class needs `public int Id { get; set; }` — or, if your context never mentions it, a property holding it needs `[NotMapped]`. |
| `Unable to create a 'DbContext' of type '…'` | `dotnet ef` couldn't make your context. Read the message after it; if there is none, the constructor that takes nothing is missing. |
| `CS1503: cannot convert from 'string' to '…Context'` | Something still hands `Save` or `Load` a file name. |
| `CS1061` … `UseInMemoryDatabase` | The test project hasn't got `Microsoft.EntityFrameworkCore.InMemory`. |
| `Cannot insert explicit value for identity column` | `Add` on a record that came out of the table. [`Update` it.](#the-second-save--add-or-update) |
| `ArgumentException: An item with the same key has already been added` | The same mistake, in a test. |
| `ArgumentOutOfRangeException` on the very first run | [`Load` cleared, and the table was empty.](#load-and-the-first-night) |
| Records show up twice | `Load` lost its `Clear()`. Fix it, then `DELETE FROM` the table — the extra rows were saved. |
| A record you removed is back | [Expected this week.](#the-second-save--add-or-update) |
| The SQL Server view shows nothing new | Right-click the connection → **Refresh**. It doesn't refresh on its own. |
| Red squiggles under `DbSet`, and `dotnet build` is fine | The editor, not your code. Command Palette → **`Developer: Reload Window`**. |

**Prev:** [Week 9 — Lecture Notes](../week-09/lecture-notes.md) · **Next:** Week 11 *(coming)*
