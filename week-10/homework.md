# Week 10 Homework — The Registry Moves In 🗄️

**20 points · due before next class**

Your registry has held records since week 4, remembered them since week 8, and answered questions about them since week 9. All of it has been on your laptop.

Tonight it moves onto the college's SQL Server — **a machine that is not yours**, which is the one thing a file was never going to fix.

**Four things happen, and only the first is new thinking:** your record gets shaped for a table, a context says where the table is, a migration makes it, and `Save`/`Load` take a database instead of a path.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and [the troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors — there are more of them than usual, because tonight is the first time your program depends on a machine that can say no.

> [!IMPORTANT]
> **Tonight's lab is the worked example for all of it.** KDXR's rotation made exactly this move, with different nouns. If you were in class, you have already done this once.

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

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-10/Project.Checks .
```

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched.

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **four** checks, and check 1 is called `Check1_WeeksFourToNineStillHold`. If you see a different first name, you are running last week's.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 4.** The green one is check 1 — weeks 4 through 9, still holding. The other three are tonight's.

---

## Part 2 — The packages, the tool, and a database of your own

**This is the part that talks to the college's server.** Do it before you write a line, so a problem with your login or the network surfaces while you still have the whole evening.

**1. Four packages, on `Project`:**

```bash
dotnet add Project package Microsoft.EntityFrameworkCore.SqlServer
```

```bash
dotnet add Project package Microsoft.EntityFrameworkCore.Design
```

```bash
dotnet add Project package Microsoft.Extensions.Configuration
```

```bash
dotnet add Project package Microsoft.Extensions.Configuration.UserSecrets
```

The first two are the database — one talks to SQL Server, one is the tooling that writes migrations. [The other two are because a console app does not get configuration for free](lecture-notes.md#a-console-app-builds-its-own-configuration).

**2. One on `Project.Tests`**, so your own suite can keep rows without a server:

```bash
dotnet add Project.Tests package Microsoft.EntityFrameworkCore.InMemory
```

**3. The EF tool** — once per machine, ever:

```bash
dotnet tool install --global dotnet-ef
```

> [!NOTE]
> **`tool 'dotnet-ef' is already installed`?** Good. `dotnet tool update --global dotnet-ef` instead — a stale one prints a version warning on every command.

**4. Turn on the secret store:**

```bash
dotnet user-secrets init --project Project
```

> [!WARNING]
> ⚠️ **Skip this and NOTHING COMPLAINS.** [`AddUserSecrets` on a project with no `UserSecretsId` does not throw — it reads back empty](lecture-notes.md#dotnet-user-secrets--the-four-commands), and you find out much later as `The ConnectionString property has not been initialized.` **If you hit that error tonight, this is the first thing to check.**

**5. Your connection string.** Swap all four `YOUR-…` parts — the server is the one from class, the login and password are your college SQL account, and **the database name is yours**:

```bash
dotnet user-secrets set "ConnectionStrings:Project" "Server=YOUR-SERVER;Database=DB_YOURTOPIC_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project Project
```

> [!IMPORTANT]
> **[The name has a shape and it is not optional](lecture-notes.md#naming-your-database): `DB_<APP>_<COURSE-NUMBER>_<INITIALS>`.** Lighthouses becomes `DB_LIGHTHOUSES_156101411_ABL`. **It must be a different database from the lab's** — `DB_KDXR_…` is the desk's, this one is your project's.
>
> **`TrustServerCertificate=True` is not decoration.** Without it the connection is refused outright.

> [!CAUTION]
> **Your connection string has your password in it. It does not go in the repo, it does not go in a file inside your project folder, and it does not go in a comment.** That is the whole reason user secrets exist, and [it is the thing week 2 promised you an answer to](lecture-notes.md#where-secrets-actually-live-and-the-restore-drill). **Keep a copy somewhere that is not the repo** — you will need it again the first time a lab PC reboots.

**6. Commit what you have so far.** The csproj changed:

```bash
git add .
git commit -m "EF Core, and somewhere for the password to live"
```

---

## Part 3 — The code

**Two suites this week, so two counts:**

- **Mine:** `dotnet test Project.Checks` — climbs **1 → 2 → 3 → 4**.
- **Yours:** `dotnet test Project.Tests` — **6 facts** now, 7 by the end.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToNineStillHold` | mine | **Nothing to write.** Green before you start. |
| 2 | `Check2_TheRecordIsShapedForATable` | mine | An `Id`, and a context. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_ThereIsAMigration` | mine | Make the table. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_TheRegistrySurvivesARestart` | mine | `Save` and `Load`. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `Week10_AnEmptyTableLeavesTheRegistryAlone` | **yours** | One fact, in your own suite. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **Row 5's name is dictated exactly as spelled**, the way `Week9_FindComesBackEmptyHanded` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 2 in full

**An `Id`, and somewhere to put the table.**

**Check:** `Check2_TheRecordIsShapedForATable` — *mine*

**1. Your record gets an `Id`.** At the top of your record class:

```csharp
public int Id { get; set; }
```

[It is the database's own name for the row](lecture-notes.md#id-and-why-the-database-wants-one) — nothing in your topic has one, you never set it, and the database fills it in.

**2. Anything your record WORKS OUT rather than KEEPS gets `[NotMapped]`.** If you have a property like `Summary => $"{Name} ({Year})"` or a computed length, it is not a fact and it should not be a column:

```csharp
using System.ComponentModel.DataAnnotations.Schema;

[NotMapped]
public string Summary => $"{Name} ({Year})";
```

💡 **`Line()` from week 6 is a method, not a property, so it is already ignored.** This is only about **get-only properties**. [The test is one question.](lecture-notes.md#notmapped--the-things-a-class-works-out)

💡 **And `[JsonInclude]` comes off** whatever you put it on in week 8. [EF Core sets private setters without being asked.](lecture-notes.md#notmapped--the-things-a-class-works-out)

**3. A new file, `Project/ProjectContext.cs`.** ⚠️ **The class name is dictated — `ProjectContext`, spelled exactly that way.** It is the second fixed name in the whole contract after `Registry`, and for the same reason: my checks have to find it without knowing your topic. **Swap `YourRecord` for your own type and the DbSet name for something that reads like a table of them:**

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class ProjectContext : DbContext
{
    public DbSet<YourRecord> YourRecords { get; set; }

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

⚠️ **Both constructors are required and neither is optional.** The empty one is what `dotnet ef` uses — delete it and Task 3 fails with *Unable to create a 'DbContext'*. The other one is [what lets anything test this without a database](lecture-notes.md#testing-database-code-without-a-database), including my checks. [The notes say what each line is doing.](lecture-notes.md#the-dbcontext)

**Run mine:**

```bash
dotnet test Project.Checks
```

**2 / 4.**

```bash
git add .
git commit -m "A record the database can keep"
```

---

### Task 3 in full

**Make the table.**

**Check:** `Check3_ThereIsAMigration` — *mine*

**1. Write the instructions:**

```bash
dotnet ef migrations add TheRegistryMovesIn --project Project
```

This **connects to nothing.** It compares your classes to what it wrote last time and writes a file.

**2. Read what it wrote** — this is the point of the task, not a formality. Open `Project/Migrations/`, the file ending `_TheRegistryMovesIn.cs`, and find `Up()`.

**That is your own record class with the column types filled in.** ⚠️ **Count the columns against your class.** Anything you marked `[NotMapped]` should not be there; anything the record actually keeps should be. [If something is missing or something extra turned up, that is Task 2 rather than this one.](lecture-notes.md#reading-the-up-method)

**3. Now carry them out.** This is the command that talks to the server:

```bash
dotnet ef database update --project Project
```

It **creates your database**, because you do not have one yet, and then it makes the table.

> [!CAUTION]
> **This is where an evening goes if your connection string is wrong**, and every error it can give you is [in the troubleshooting table](lecture-notes.md#-troubleshooting) with what it means. The four commonest: a wrong server, a wrong password, a missing `TrustServerCertificate=True`, and a skipped `user-secrets init`.

**4. Look at it.** If you were not in the lab, install the extension first: Extensions (<kbd>⇧⌘X</kbd> / <kbd>Ctrl⇧X</kbd>) → **`SQL Server (mssql)`**, publisher **Microsoft**, id `ms-mssql.mssql`. **It is the only database tool this course uses.**

Then VS Code's **SQL Server** view (<kbd>⌘⌥D</kbd> / <kbd>Ctrl+Alt+D</kbd>) → **Add Connection** if you have not already → your server → Databases → yours → Tables → right-click your table → **Select Top 1000**.

**Empty, and that is right.** The table exists and your program has never written to it.

```bash
dotnet test Project.Checks
```

**3 / 4.**

```bash
git add .
git commit -m "The migration that made the table"
```

---

### Task 4 in full

**`Save` and `Load` take a database.**

**Check:** `Check4_TheRegistrySurvivesARestart` — *mine*

⚠️ **Their signatures are dictated, and the change is exactly the parameter:**

```csharp
public void Save(ProjectContext db)
public void Load(ProjectContext db)
```

**1. `Save`.** [The notes work the whole method through](lecture-notes.md#save--add-update-or-remove), and the shape is:

- **Every record is one of three things, and its `Id` says which.** `Id == 0` has never been on file — it is new. Any other `Id` means the table already has that row, and the row changes. And a row the table has that your registry no longer holds comes off.
- ⚠️ **Then one line sends the lot.** Without it nothing arrives and nothing complains — **it is the single most common failure this week.**

⚠️ **Week 8's version emptied the file and wrote it again. You cannot do that here** — [a record loaded out of row 3 is still carrying the number 3](lecture-notes.md#save--add-update-or-remove), and SQL Server will not let your program pick its own row numbers.

**2. `Load`.** Two things it has to get right, and **week 8 had both**:

- **Loading is REPLACING.** `Program.cs` seeds records and *then* calls `Load`, so without a `Clear()` you end up holding twice as many.
- ⚠️ ⚠️ **THE FIRST RUN.** Week 8 asked `File.Exists` first, because a program nobody has run has no file. **Your table is always there — the migration made it — but the first time it is EMPTY.** A `Load` that clears before it looks throws your seeded records away, and the next line of `Program.cs` reaches for one and finds nothing. [The notes say what to do about it.](lecture-notes.md#load--and-the-first-night)

**3. `Program.cs`** — wherever it made a path and handed it over, it makes a context instead:

```csharp
ProjectContext db = new ProjectContext();
```

and then `registry.Load(db);` near the top and `registry.Save(db);` near the end. ⚠️ **Anything else in `Program.cs` that printed the file name has to stop** — there isn't one any more.

**4. Your own suite will stop compiling**, and that is correct. `Week8_TheRegistrySurvivesARestart` hands `Save` a path. **Give it a table that lives inside the test instead** — [the notes have the shape](lecture-notes.md#testing-database-code-without-a-database), and it is the same move for both facts.

**Now run it. Twice.**

```bash
dotnet run --project Project
```

Let it do whatever your program does, and let it finish.

```bash
dotnet run --project Project
```

**Your records are still there — out of a database, on a machine that is not yours.** Then look at the table in the SQL Server view: **that is your data, and you are not reading it out of your program.**

```bash
dotnet test Project.Checks
```

**4 / 4.**

```bash
git add .
git commit -m "The registry moves into the database"
```

---

### Task 5 in full

**One fact of your own, about the run that only happens once.**

**Check:** `Week10_AnEmptyTableLeavesTheRegistryAlone` — *yours*

Every fact in your suite so far describes something that happens every time. **This one describes something that happens once, ever, and then never again** — which is exactly why it is worth writing down. A first run is the state you cannot get back to by accident, and it is the state that crashes.

**In `Project.Tests`, add a `[Fact]` with that exact name.** What it has to show:

- a registry **holding at least one record**
- `Load`ed from a table **nobody has saved anything to**
- and **the record is still there afterwards**

[The in-memory shape is in the notes](lecture-notes.md#testing-database-code-without-a-database) — a fresh `Guid` in the database name, and the options constructor.

```bash
dotnet test Project.Tests
```

**7 passed.**

> [!TIP]
> **Make it fail once.** Take the first-run guard out of `Load`, run your suite, and watch this fact go red. Put it back. [A test you have never seen fail is a test you are trusting rather than relying on.](../week-07/lecture-notes.md#make-it-fail-once)

```bash
git add .
git commit -m "A fact about the first run"
```

---

## Part 4 — The pull request

```bash
git push -u origin the-registry-moves-in
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it**.

⚠️ **Read it properly this week.** You have been handling a password all evening. **The diff is where you find out whether any of it got in** — if you see your connection string anywhere in those changes, stop and take it out before you merge.

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

Five moments worth saving, written into the parts above at the point where each thing starts working — the packages and the secret, the record and the context, the migration, the round trip, and your own fact. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-9 still hold — Topic, no public fields, All() copies, Find and Remove behave, IListed kept by record and registry, Everything() intact, Add refuses a duplicate, and Names/Sorted/Matching still answer |
| 2 | Your record has an Id the database can tell its rows apart by, and the property holding its name is stored |
| 2 | A migration exists in your project — you ran `dotnet ef migrations add` rather than making the table by hand |
| 4 | Save and Load round-trip every record and everything on it — and an empty table leaves a seeded registry alone |
| 2 | Your test: loading from a table nobody has saved to yet does not throw your records away — written by you, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The project compiles from a clean clone — from this week it cannot be RUN anywhere but your own machine, because your connection string is not in the repo |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!IMPORTANT]
> ⚠️ **ONE THING IN THAT TABLE CHANGED THIS WEEK, AND IT IS NOT A SOFTENING.** Every week until now, two points were for *the program builds and runs*. **I cannot run your program any more.** Running it needs your connection string, which needs your password, which is — correctly — not in your repo. So those two points are for it **compiling** from a clean clone.
>
> **Your code is still executed, heavily.** My four checks drive your registry, your record, your context and the round trip, and your own suite runs exactly as you wrote it. Nothing about that changed.

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| **Two or three checks listed**, not four | You're running an earlier week's. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) copies this week's in — this week lists four, starting `Check1_WeeksFourToNineStillHold`. |
| `InvalidOperationException: The ConnectionString property has not been initialized.` | The config read back nothing. **`dotnet user-secrets list --project Project` tells you which of two causes it is** — [all three answers are in the notes](lecture-notes.md#dotnet-user-secrets--the-four-commands). |
| `Could not find the global property 'UserSecretsId'` | [Part 2 step 4](#part-2--the-packages-the-tool-and-a-database-of-your-own) never ran. It is the silent one. |
| `No secrets configured for this application.` | `init` ran, `set` didn't — or your machine was wiped. [One command.](lecture-notes.md#where-secrets-actually-live-and-the-restore-drill) |
| `Login failed for user` | Wrong login or password. Run the `set` again — it replaces. |
| `A network-related or instance-specific error…` | Wrong `Server=`, or you are not on a network that can reach it. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` missing from the end of the connection string. |
| `Cannot open database "DB_…" requested by the login` | The database isn't made. [Task 3, step 3.](#task-3-in-full) |
| `Invalid object name '…'` | The database is there, the table isn't. You wrote the migration and never ran `database update`. |
| `Unable to create a 'DbContext' of type 'ProjectContext'` | `dotnet ef` can't construct it. **The empty constructor** — check you didn't delete it when you added the options one. |
| `There is no class called ProjectContext in your project` | The name is dictated, spelled exactly that way. [Task 2.](#task-2-in-full) |
| `Registry has no Save that takes a ProjectContext` | The signature is dictated and **the types in the brackets are part of a method's identity in C#** — the old `Save(string)` does not count. |
| `Cannot insert explicit value for identity column` | `Save` is `Add`ing a record that came out of the table. [It's an `Update`.](lecture-notes.md#save--add-update-or-remove) |
| Nothing arrives in the table and nothing errors | **No `db.SaveChanges()`.** [`Add` only writes down what you intend.](lecture-notes.md#save--add-update-or-remove) |
| Your seeded records vanish on the first run | [`Load` cleared before it looked.](lecture-notes.md#load--and-the-first-night) That is check 4's last assert, and your own fact. |
| The registry holds twice as many records as it should | `_items.Clear()` is missing from `Load`. |
| A count comes back 0 after a round trip | The property is `[NotMapped]`, or it's worked out rather than kept. **`[JsonInclude]` is not the answer any more.** |
| `dotnet ef` : *command not found* | [Part 2 step 3.](#part-2--the-packages-the-tool-and-a-database-of-your-own) |
| `CS0246: 'DbContext' could not be found` | `using Microsoft.EntityFrameworkCore;`, or the SqlServer package never got added. |
| `CS0246: 'NotMappedAttribute' could not be found` | `using System.ComponentModel.DataAnnotations.Schema;` at the top of your record's file. |
| Your own suite won't compile | Expected — it hands `Save` a path. [Give it a table instead.](lecture-notes.md#testing-database-code-without-a-database) |
| Your fact name doesn't match the table | The grader reads it **exactly** — `Week10_AnEmptyTableLeavesTheRegistryAlone`, on a `public void` method taking nothing. |
| My checks pass and your program can't connect | **Right, and worth understanding.** [My checks never touch your server.](lecture-notes.md#testing-database-code-without-a-database) Only running it tells you that. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-registry-moves-in`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 10 Lab — The Carts Leave the Building](lab/) · **Next:** Week 11 — everyone on the same table *(coming)*
