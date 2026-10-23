# Week 10 Homework — The Registry Moves In 🗄️

**20 points · due before next class**

> [!NOTE]
> **A normal week.** Set in one class and due before the next one.

Your registry has held records since week 4, remembered them in a file since week 8, and answered questions about them since week 9. All of it has lived in a file on your laptop. This week it moves into a database of your own, on the college's SQL Server, with **EF Core**.

**This homework is the lab again, on your own project.** Same five tasks, same order. Where the lab said `Rotation`, `Song`, `Carts`, `DeskContext` and `_songs`, you use your `Registry`, your record type, a table of your records, `ProjectContext`, and the list inside your `Registry`. If you finished the lab, you have already done every step once.

**Three things are dictated, the way every name my checks look for has been since week 4:**

```csharp
public class ProjectContext : DbContext
public void Save(ProjectContext db)
public void Load(ProjectContext db)
```

`ProjectContext` is a new class you write in Task 2, spelled exactly that way. `Save` and `Load` are the two you already have, taking a `ProjectContext` instead of a path.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Each task below is the lab task with the same number. Every task also has a **Stuck? Show me the shape** box, written with placeholder names like `YourRecord` — swap in your own names before it will build.

> [!IMPORTANT]
> **Do Task 1 first, and early.** It is the part that talks to the college's server, so a problem with your login or the network turns up while you still have the whole week.

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then week 4 is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, and weeks [5](../week-05/homework.md), [6](../week-06/homework.md), [7](../week-07/homework.md), [8](../week-08/homework.md) and [9](../week-09/homework.md) add what this week's check 1 re-verifies. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b the-registry-moves-in
```

**Then bring in this week's checks.** They ship in the starters clone and **they are different every week.** Pull the clone first:

```bash
git -C ../dotnet-db-starters pull
```

Then take last week's out and copy this week's in. **Two commands, in this order:**

```bash
rm -r Project.Checks
```

```bash
cp -r ../dotnet-db-starters/project/week-10/Project.Checks .
```

⚠️ **Don't skip the `rm`.** Copying over the top of the old folder is not enough: on Windows the copied files keep their old dates, `dotnet` decides nothing has changed, and it runs **last week's** checks again without telling you.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds five checks, and the first is called `Check1_WeeksFourToNineStillHold`. If yours is called `Check1_WeeksFourToEightStillHold`, you are running **week 9's** — come back and run the `rm` and the `cp` above, both of them.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 5.** The green one is check 1 — weeks 4 through 9, still holding. The other four are this week's.

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 10: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — **1** through Task 1, then **2, 3, 4, 5**.
- **Yours:** `dotnet test Project.Tests` — the suite you have been growing since week 7. It has **6 facts** in it now, and gains one at Task 5.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToNineStillHold` | mine | Already green. The packages, and somewhere for a password. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check2_TheRecordIsShapedForATable` | mine | An `Id`, and a `ProjectContext`. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_ThereIsAMigration` | mine | The migration, and the table. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_TheRegistrySurvivesARestart` | mine | `Save` and `Load` take the database. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `Check5_ASecondSaveChangesTheRow` | mine | A record already in the table gets changed, not added again. **[Task 5 in full ↓](#task-5-in-full)** |
| 5 | `Week10_ASecondSaveChangesTheRow` | **yours** | Your own fact about it, written first. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Week9_FindComesBackEmptyHanded` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

**The packages, and somewhere for a password.**

**Check:** `Check1_WeeksFourToNineStillHold` — *mine, already green*

This is the lab's Task 1. **Nothing turns green.** It is the setup every later task stands on.

**1a — the EF tool.** You may have it from the lab already; this command installs it or updates it:

```bash
dotnet tool update --global dotnet-ef
```

**1b — five packages on `Project`.** The same five as the lab, in the same order:

```bash
dotnet add Project package System.Security.Cryptography.Pkcs --version 10.0.13
```

```bash
dotnet add Project package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.13
```

```bash
dotnet add Project package Microsoft.EntityFrameworkCore.Design --version 10.0.13
```

```bash
dotnet add Project package Microsoft.Extensions.Configuration --version 10.0.13
```

```bash
dotnet add Project package Microsoft.Extensions.Configuration.UserSecrets --version 10.0.13
```

The first one is a package the SQL Server one needs, so it goes in first.

**Check they all landed.** Open `Project/Project.csproj`. A new `<ItemGroup>` lists the five, each at `10.0.13`. If your project already had packages, they're in the list too.

```xml
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.13">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Configuration" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Configuration.UserSecrets" Version="10.0.13" />
    <PackageReference Include="System.Security.Cryptography.Pkcs" Version="10.0.13" />
  </ItemGroup>
```

They're in alphabetical order, and `Design`'s two extra lines are written by `dotnet add` itself, as in the lab. A package missing? Run its `dotnet add` again. **Then build, and check the bottom says `0 Error(s)`:**

```bash
dotnet build Project
```

**1c — [your project's own secret store](lecture-notes.md#user-secrets--a-password-outside-the-repo).** Turn it on:

```bash
dotnet user-secrets init --project Project
```

**Then your connection string.** It is the lab's, with two changes: the key is `ConnectionStrings:Project`, and **the database is a different one**, named after your topic. Swap all four `YOUR-…` parts. The server name is the one from the lab; it is in Canvas too.

```bash
dotnet user-secrets set "ConnectionStrings:Project" "Server=YOUR-SERVER;Database=DB_YOURTOPIC_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project Project
```

> [!IMPORTANT]
> **[The name has a shape](lecture-notes.md#naming-your-database): `DB_<TOPIC>_156101411_<INITIALS>`.** Lighthouses becomes `DB_LIGHTHOUSES_156101411_ABL`. **It must not be the lab's database.** `DB_KDXR_…` is the desk's; this one is your project's.

```bash
dotnet user-secrets list --project Project
```

That should show your connection string, on your own screen. *(It shows the password too. Don't paste its output anywhere.)*

> [!CAUTION]
> **Your connection string has your password in it. It does not go in the repo, in a file inside your project folder, or in a comment.** Keep a copy somewhere that isn't the repo — you'll need it again the first time a lab PC reboots.

**1d — the SQL Server view.** If you did the lab, it already knows your server. If you didn't: [the lab's Task 1d](lab/README.md#1d--prove-your-account-works) installs the extension and connects.

**Mine:**

```bash
dotnet test Project.Checks
```

**1 / 5 — still.**

```bash
git add .
git commit -m "EF Core, and somewhere for the password"
```

---

### Task 2 in full

**An `Id`, and a `ProjectContext`.**

**Check:** `Check2_TheRecordIsShapedForATable` — *mine*

This is the lab's Task 2.

**1 — [An `Id` on your record](lecture-notes.md#a-class-becomes-a-table).** At the top of your record class, the same line as the lab's `Song`:

```csharp
    public int Id { get; set; }
```

**2 — A new file, `Project/ProjectContext.cs`.** Paste this in. It is [the lab's `DeskContext`](lecture-notes.md#the-dbcontext) with its name and its key changed to `Project`, and no table yet:

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class ProjectContext : DbContext
{
    public ProjectContext()
    {
    }

    public ProjectContext(DbContextOptions<ProjectContext> options)
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
            .AddUserSecrets<ProjectContext>()
            .Build();

        options.UseSqlServer(config["ConnectionStrings:Project"]);
    }
}
```

**Then add the one line that's yours: a `DbSet` of your records**, at the top of the class. **Name it after your records, in the plural.** The property's name becomes the table's name, the way the lab's `Carts` did.

<details>
<summary><b>Stuck? Show me the line</b></summary>

Swap `YourRecord` for your record type, and `YourRecords` for a name for the table, or it will not build.

```csharp
    public DbSet<YourRecord> YourRecords { get; set; }
```

</details>

```bash
dotnet test Project.Checks
```

**2 / 5 — checks 1 and 2.**

> [!WARNING]
> **Check 2 red with *EF Core could not work out a table for your record*?** It quotes EF Core's own message, and there are two you are likely to see. Both are the ones your instructor hit with `Caller` in the demo:
> - **`Cannot bind 'name' in 'YourRecord(string name)'`** — the property that holds the name has only a `get`. Give it a `private set`: `public string Name { get; private set; }`.
> - **`The entity type 'Something' requires a primary key`, naming a class your context never mentions** — one of your record's properties holds that class. Put `[NotMapped]` above it, with `using System.ComponentModel.DataAnnotations.Schema;` at the top of the file.

```bash
git add .
git commit -m "A record the database can keep"
```

---

### Task 3 in full

**The migration, and the table.**

**Check:** `Check3_ThereIsAMigration` — *mine*

This is the lab's Task 3, with `--project Project`.

```bash
dotnet ef migrations add TheRegistryMovesIn --project Project
```

**Read what it wrote.** Open `Project/Migrations/`, the file ending `_TheRegistryMovesIn.cs`, and find `Up()`. **Count the columns against your record class.** Every property your record keeps should be there, and nothing it works out.

**Then make the table** — [the command that talks to the server](lecture-notes.md#migrations--add-then-update):

```bash
dotnet ef database update --project Project
```

**Look at it.** In the SQL Server view, right-click your connection → **Refresh** → Databases → yours → Tables → right-click your table → **Select Top 1000**. **Empty, and that is right.**

```bash
dotnet test Project.Checks
```

**3 / 5 — checks 1, 2 and 3.**

```bash
git add .
git commit -m "The migration that made the table"
```

---

### Task 4 in full

**`Save` and `Load` take the database.**

**Check:** `Check4_TheRegistrySurvivesARestart` — *mine*

This is the lab's Task 4.

**1 — `Save` and `Load`, in `Project/Registry.cs`.** Replace your `Save(string path)` and `Load(string path)` with two that take a `ProjectContext`. The moves are [the lab's](lecture-notes.md#save--add-then-savechanges):

- **`Save`**: `Add` each record to your `DbSet`, then **`db.SaveChanges()`** after the loop.
- **`Load`**: read the table into a list, in the order the records first went in, with `OrderBy` on `Id` and `ToList()`. **If the list is empty, `return`** — [that's the first run](lecture-notes.md#load-and-the-first-night). Otherwise `Clear()` your list, then `AddRange`.
- Delete `using System.Text.Json;` from the top of `Registry.cs`, and any `[JsonInclude]` on your record, with `using System.Text.Json.Serialization;`. Nothing reads a file now.

| In the lab | In yours |
|---|---|
| `Song` | your record type — written `YourRecord` below |
| `db.Carts` | your `DbSet` — written `db.YourRecords` below |
| `_songs` | the list inside your `Registry` — written `_yourList` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `YourRecords` and `_yourList` for your own names, or it will not build.

```csharp
    public void Save(ProjectContext db)
    {
        foreach (YourRecord item in _yourList)
        {
            db.YourRecords.Add(item);
        }

        db.SaveChanges();
    }

    public void Load(ProjectContext db)
    {
        List<YourRecord> loaded = db.YourRecords.OrderBy(item => item.Id).ToList();

        if (loaded.Count == 0)
        {
            return;
        }

        _yourList.Clear();

        _yourList.AddRange(loaded);
    }
```

</details>

**2 — `Program.cs`.** Build first, and read the errors:

```bash
dotnet build Project
```

Every `CS1503: Argument 1: cannot convert from 'string' to 'ProjectContext'` is a line that still hands `Save` or `Load` a file name. **Do what the lab did:** the line that makes the file name becomes `ProjectContext db = new ProjectContext();`, and the two calls become `registry.Load(db);` and `registry.Save(db);`. If any other line printed the file name, `CS0103` names it. Change what it prints, or take it out.

**3 — Your own suite.** It stops compiling, because `Week8_TheRegistrySurvivesARestart` hands `Save` and `Load` a path. Add the package the lab's tests needed:

```bash
dotnet add Project.Tests package Microsoft.EntityFrameworkCore.InMemory --version 10.0.13
```

Then move that fact off the file, [the way the lab moved `ACartRemembersItsPlays`](lecture-notes.md#testing-without-a-database): `using Microsoft.EntityFrameworkCore;` at the top of the test file, the two `path` lines become the three below, and every `path` it hands over becomes `new ProjectContext(options)`.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
        DbContextOptions<ProjectContext> options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
```

</details>

```bash
dotnet test Project.Tests
```

**6 passed.**

**4 — Run it twice.** If `registry.json` is at the top of your repo, delete it first — nothing reads it now.

```bash
dotnet run --project Project
```

Let it finish. Then look at your table in the SQL Server view: **your records are there, with an `Id` each, and you are not reading them out of your program.**

```bash
dotnet run --project Project
```

**Your records come back out of the database.** And then, at the very end, it crashes:

```
Cannot insert explicit value for identity column in table
```

**That is Task 5.** Your records came out of the table carrying their `Id`, and `Save` tried to `Add` them a second time.

```bash
dotnet test Project.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.**

```bash
git add .
git commit -m "The registry moves into the database"
```

> [!NOTE]
> **A record you take off with `Remove` comes back next run.** `Save` puts rows in and changes them. It doesn't take rows out of the table yet, and nothing this week grades it.

---

### Task 5 in full

**A fact first, then a record already in the table gets changed, not added again.**

**Checks:** `Check5_ASecondSaveChangesTheRow` — *mine* · `Week10_ASecondSaveChangesTheRow` — *yours*

This is the lab's Task 5.

#### First, the fact — before you touch `Save`

**Write it in `Project.Tests`, beside `Week8_TheRegistrySurvivesARestart`.** The name is dictated: `Week10_ASecondSaveChangesTheRow`. The moves are the lab's `ACartAiredAgainIsStillOneRow`:

- **Set the scene.** The three `options` lines. A `Registry` with one record from `NewItem("a name of yours")` in it, saved with `new ProjectContext(options)`.
- **Do the thing: the next run.** One `ProjectContext db = new ProjectContext(options);`, used for both halves. A second registry, `nextRun`, loads from `db`. Find your record in it and **call your verb on it** — the method that moves the count your record keeps, like a lighthouse's `Visit()` moving `TimesVisited`. Then `nextRun.Save(db)`.
- **Check the answer** in a third registry, `reopened`, loaded from a fresh `new ProjectContext(options)`: it holds 1 record, and the count your verb moves is 1. **Assert on `reopened`, never on the registry that saved.**

| In the lab | In yours |
|---|---|
| `new Song("Nightjar", …)` | a record from `NewItem` — its type is written `YourRecord` below |
| `nextNight.All()[0].Play()` | your verb, on the record `Find` hands back — written `YourVerb()` below |
| `PlaysTonight` | the count your verb moves — written `YourCount` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `YourVerb` and `YourCount` for your own names, and both names for a name of your own, or it will not build. If your verb takes an argument, give it one.

```csharp
    [Fact]
    public void Week10_ASecondSaveChangesTheRow()
    {
        DbContextOptions<ProjectContext> options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Registry registry = new Registry();
        registry.Add(registry.NewItem("a name of yours"));
        registry.Save(new ProjectContext(options));

        ProjectContext db = new ProjectContext(options);
        Registry nextRun = new Registry();
        nextRun.Load(db);
        YourRecord item = nextRun.Find("a name of yours")!;
        item.YourVerb();
        nextRun.Save(db);

        Registry reopened = new Registry();
        reopened.Load(new ProjectContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Equal(1, reopened.Find("a name of yours")!.YourCount);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
System.ArgumentException : An item with the same key has already been added. Key: 1
```

**Red, and it is the crash from Task 4.** The table inside the test words it differently.

#### Now the fix

**In `Save`, the one `Add` line becomes [an `if`/`else`](lecture-notes.md#the-second-save--add-or-update)**, the lab's: `Id` 0 is new, so `Add`. Anything else is a row the table already has, so `Update`.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `YourRecords` and `_yourList` for your own names, or it will not build.

```csharp
    public void Save(ProjectContext db)
    {
        foreach (YourRecord item in _yourList)
        {
            if (item.Id == 0)
            {
                db.YourRecords.Add(item);
            }
            else
            {
                db.YourRecords.Update(item);
            }
        }

        db.SaveChanges();
    }
```

</details>

```bash
dotnet test Project.Tests
```

**7 passed.** Then run your program twice more:

```bash
dotnet run --project Project
```

```bash
dotnet run --project Project
```

**No crash, either time.** Look at the table: still one row per record. If your `Program.cs` calls your verb, its count went up as well.

```bash
dotnet test Project.Checks
```

**5 / 5.**

```bash
git add .
git commit -m "A second save changes the row"
```

---

## Part 3 — The pull request

```bash
git push -u origin the-registry-moves-in
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it**.

⚠️ **Read it properly this week.** You have been handling a password. **The diff is where you find out whether it got in.** If you see your connection string anywhere in those changes, stop, take it out, commit, and push again before you merge. *(The `UserSecretsId` line in your `.csproj` is fine. It's a folder name, not a secret.)*

Then merge it with the plain **"Merge pull request"** button.

> [!CAUTION]
> **Not "Squash and merge", not "Rebase and merge".** Only the plain merge leaves a **merge commit**, and that's what I read out of your repo to see you did the round trip. It costs 2 points for work you actually did.

```bash
git checkout main
```

```bash
git pull
```

---

## Commit as you go

Six moments worth saving, written into the parts above at the point where each thing starts working — the checks copied in, then one for each of the five tasks. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-9 still hold — Topic, no public fields, All() copies, Find and Remove behave, IListed kept by record and registry, Everything() intact, Add refuses a duplicate, and Names/Sorted/Matching still answer |
| 2 | Your record has an Id the database can tell its rows apart by, its name is stored, and ProjectContext has a table for it |
| 2 | A migration exists in your project — you ran `dotnet ef migrations add` rather than making the table by hand |
| 2 | Save and Load round-trip every record and what it keeps — and an empty table leaves a seeded registry alone |
| 2 | A record that came out of the table and is saved again changes its row instead of adding a second one |
| 2 | Your test: a record loaded, changed and saved again is still one row, with the change on it — written by you, before the fix, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The project compiles from a clean clone — from this week it cannot be RUN anywhere but your own machine, because your connection string is not in the repo |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **Two points used to be for running your program. From this week they are for building it.** Your program needs your connection string to run, and your connection string is — correctly — not in your repo. So nobody can run your program from a clone, me included. **Your code is still run**: my five checks drive your registry, your record and your context, and your own suite runs exactly as you wrote it.

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| The first check is called `Check1_WeeksFourToEightStillHold` | You're running **week 9's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) removes them and copies this week's in — run the `rm` and the `cp`, both. |
| `CS0246: The type or namespace name 'YourRecord' could not be found` | You pasted a **Stuck?** shape without swapping the placeholder. `YourRecord` is your record type's name — the class `NewItem` hands back. |
| `CS1061` naming `YourRecords`, `YourVerb` or `YourCount` | The same thing: a placeholder still in a shape. `YourRecords` is your `DbSet`'s name in `ProjectContext`; `YourVerb` and `YourCount` are your record's verb and the count it moves. |
| `CS0103: The name '_yourList' does not exist in the current context` | `_yourList` is the name of the list field inside your `Registry`. Open `Registry.cs` and use the name you gave it. |
| `warning NU1902` / `warning NU1903` on `System.Security.Cryptography.Pkcs` | Task 1b's first package isn't in. Run its `dotnet add`, the `System.Security.Cryptography.Pkcs` one. |
| `The ConnectionString property has not been initialized.` | No connection string found. **`dotnet user-secrets list --project Project`** says why: *Could not find the global property 'UserSecretsId'* means `init` never ran; *No secrets configured* means `set` didn't, or the key isn't `ConnectionStrings:Project`. |
| `An exception has been raised that is likely due to a transient failure` … `Cannot open database "DB_…"` | The database isn't made yet. Task 3's `dotnet ef database update`, or a database name in your connection string that doesn't match. |
| `Login failed for user` | Wrong login or password. Run Task 1c's `set` again; `set` replaces. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing from the end of the connection string. |
| Your password has a `$` in it and the connection string goes wrong | The shell is reading the `$`. Put the connection string in **single** quotes instead of double. |
| `Invalid object name` naming your table | You wrote the migration and never ran `dotnet ef database update --project Project`. |
| Check 2 red: *Cannot bind* | The property holding the name has only a `get`. [Task 2's warning](#task-2-in-full) has the fix. |
| Check 2 red: *requires a primary key*, naming another class | One of your properties holds another class. `[NotMapped]` on it. [Task 2's warning](#task-2-in-full). |
| Check 2 red: *has no Id* | Task 2's one line, at the top of your record class. |
| `Unable to create a 'DbContext' of type 'ProjectContext'` | `dotnet ef` couldn't make your context. It needs the constructor that takes **nothing** — check it's still there — or it quotes one of the two check 2 messages above. |
| `error CS1503: Argument 1: cannot convert from 'string' to 'ProjectContext'` | Something still hands `Save` or `Load` a file name. The line number says where. |
| `error CS1061` … `UseInMemoryDatabase` | `Project.Tests` hasn't got the InMemory package. Task 4's `dotnet add`. |
| `Cannot insert explicit value for identity column in table …` | `Save` adds records that came out of the table. Task 5. |
| `ArgumentException : An item with the same key has already been added` | The same mistake, in your test. |
| Check 4 red: *Three records were saved and 0 came back* | No `db.SaveChanges()` at the end of `Save`, or `Load` isn't reading your `DbSet`. |
| Check 4 red: *loaded from an EMPTY table* | `Load` clears before it checks. The `if (loaded.Count == 0)` return goes first. |
| Your records show up twice | `Load` lost its `Clear()`. Fix it, then empty the table: SQL Server view → right-click your database → **New Query** → `DELETE FROM YourTable;` with your table's name. |
| A record you removed is back | Expected this week — [Task 4's note](#task-4-in-full). |
| My checks pass and your program can't connect | **That is exactly right.** My checks never touch the server. Only running your program tests your connection string. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week10_ASecondSaveChangesTheRow`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-registry-moves-in`, push that. |
| An error that isn't in this table | [The notes' troubleshooting list](lecture-notes.md#-troubleshooting) has more of them. |

**Prev:** [Week 10 Lab — The Carts Move In](lab/README.md) · **Next:** Week 11 *(coming)*
