# Week 12 Homework — Each One Has Many 🗄️

**20 points · due before next class**

> [!NOTE]
> **A normal week.** Set in one class and due before the next one.

Since week 4 your project has had a sentence behind it: ***"each one of my ___ has many ___."*** This week the second blank gets a table of its own. Each of your records gets a list of **details** — the "many" in your sentence — each detail is a row that says which record it belongs to, `Load` brings them back with their record, and the database answers a question about them.

**This homework is the lab again, on your own project.** Your Task 1 is the lab's Task 1, your Task 2 is the lab's Task 2, and your Task 3 is the lab's Task 3. Where the lab said `Song`, `Airing`, `Airings`, `SongId` and `db.Songs`, you use your record, your detail class, your list, your record's `Id` and your `DbSet`.

> [!IMPORTANT]
> **Your database carries on. Nothing in this homework drops it.** The lab drops its database so everybody's desk starts the same; your project's database holds your records, and your migration adds a table to it without touching them.

**Two members are added to `Registry` this week, and their signatures are dictated exactly, the same way `NewItem`'s is:**

```csharp
public YourDetail NewDetail(string name)
public List<string> WithDetails(ProjectContext db)
```

- **`NewDetail` takes exactly one `string`, always**, however many facts your detail carries — give any other constructor parameters defaults. It is how my checks make one of your details without knowing what you called it.
- **`WithDetails` takes your `ProjectContext` and hands back a `List<string>`**: the names of the records that have at least one detail, in order by name, **asked of the database**.
- **One more name is dictated, and it's your fact's:** `Week12_DetailsComeBack`.

Everything you named before keeps its name. `YourDetail` is a placeholder; your detail class is called whatever your topic calls it.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Every task below says which lab task it is. Each one has a **Stuck? Show me the shape** box, written with placeholder names like `YourRecord` — swap in your own names before it will build.

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet, or no database in it?** Then an earlier week is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes the repo, and [week 10's homework](../week-10/homework.md) moves the registry into a database. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b a-second-table
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
cp -r ../dotnet-db-starters/project/week-12/Project.Checks .
```

⚠️ **Don't skip the `rm`.** Copying over the top of the old folder is not enough: on Windows the copied files keep their old dates, `dotnet` decides nothing has changed, and it runs **last week's** checks again without telling you.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **four** checks, and the first is called `Check1_WeeksFourToElevenStillHold`. If yours is called `Check1_WeeksFourToTenStillHold`, you are running **week 11's** — come back and run the `rm` and the `cp` above, both of them.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 4.** The green one is check 1 — weeks 4 through 11 still holding. The other three are this week's.

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 12: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — **2** after Task 1, **3** after Task 2, **4** after Task 3.
- **Yours:** `dotnet test Project.Tests` — the suite you have been growing since week 7. It gains one fact at Task 2.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check2_EachRecordHasManyDetails` | mine | A detail class, a list of them on your record, `NewDetail`, and the table. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check3_TheDetailsComeBack` | mine | `Load` brings each record's details back. **[Task 2 in full ↓](#task-2-in-full)** |
| 2 | `Week12_DetailsComeBack` | **yours** | Your own fact about it, written first. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check4_TheDatabaseAnswers` | mine | The log on, then `WithDetails`, a question the database answers. **[Task 3 in full ↓](#task-3-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Week11_ARemovedRecordStaysGone` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

**A detail class, a list of them on your record, `NewDetail`, and the table.**

**Check:** `Check2_EachRecordHasManyDetails` — *mine*

This is [the lab's Task 1](lab/README.md#task-1-in-full). First, finish your sentence: **each one of my ___ has many ___.** The second blank is your detail class. A lighthouse registry: *each lighthouse has many keepers*, so the detail class is `Keeper`.

| In the lab | In yours | For a lighthouse registry |
|---|---|---|
| `Airing` | your detail class — written `YourDetail` below | `Keeper` |
| `SongId` | your record's class name, then `Id` — written `YourRecordId` below | `LighthouseId` |
| `At` | whatever one fact your detail needs — written `Name` below | `Name` |
| `Song.Airings` | the list on your record — written `YourDetails` below | `Keepers` |
| `Song` | your record type — written `YourRecord` below | `Lighthouse` |

⚠️ **Don't name your detail class after a method your record already has.** If your record has a `Visit()` method, a class called `Visit` won't compile: inside your record, the name means the method. Pick another word.

**1. The detail class.** **Make `Project/YourDetail.cs`**, named after your class. It needs [an `Id`, your record's `Id`, and one string](lecture-notes.md#one-record-many-of-something), with a constructor that takes the string:

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourDetail` and `YourRecordId` for your own names, or it will not build.

```csharp
public class YourDetail
{
    public int Id { get; set; }

    public int YourRecordId { get; set; }

    public string Name { get; private set; }

    public YourDetail(string name)
    {
        Name = name;
    }
}
```

</details>

**2. The list on your record.** In your record's class, beside its other properties:

```csharp
    public List<YourDetail> YourDetails { get; private set; } = new List<YourDetail>();
```

**3. `NewDetail` on your `Registry`**, under `NewItem` — one line, the same shape:

```csharp
    public YourDetail NewDetail(string name) => new YourDetail(name);
```

**4. The table.** In `Project/ProjectContext.cs`, under your record's `DbSet`:

```csharp
    public DbSet<YourDetail> YourDetails { get; set; }
```

**Swap the placeholders in steps 2 to 4 for your own names** — `YourDetail`, `YourDetails` — the same names you gave in step 1. ⚠️ **These build even if you don't**, because step 1's class is the one they name. My check 2 refuses a detail class still called `YourDetail`.

**5. The migration, then the update.** From the top of your project repo:

```bash
dotnet ef migrations add ASecondTable --project Project
```

**Open the new file in `Project/Migrations`, the one whose name ends `_ASecondTable.cs`.** It makes one table, named after your `DbSet`, with a `YourRecordId` column and a `ForeignKey` pointing at your record's table. **Nothing else.** Your record's table is already there.

```bash
dotnet ef database update --project Project
```

It applies one migration, `ASecondTable`. **Your records are still in their table** — check in the SQL Server view.

**6. Give a record a detail, every run.** In `Project/Program.cs`, **directly above `registry.Save(db);`**, find one of your records by a name your program puts on file, and add a detail to it:

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord` and `YourDetails`, and both names, for your own.

```csharp
YourRecord? withDetails = registry.Find("a name of yours");

if (withDetails != null)
{
    withDetails.YourDetails.Add(registry.NewDetail("a detail of yours"));
    Console.WriteLine($"{withDetails.YourDetails.Count} details on file for that record.");
}
```

</details>

```bash
dotnet run --project Project
```

**It says `1 details on file for that record`.** Look at your new table in the SQL Server view (right-click your connection → **Refresh**, then the table → **Select Top 1000**): **one row, and its `YourRecordId` is that record's `Id`.**

```bash
dotnet test Project.Checks
```

**2 / 4.**

```bash
git add .
git commit -m "A second table"
```

📖 *Further reading:* [reading a migration that adds a table](lecture-notes.md#reading-a-migration-that-adds-a-table).

---

### Task 2 in full

**A fact first, then `Load` brings each record's details back.**

**Checks:** `Check3_TheDetailsComeBack` — *mine* · `Week12_DetailsComeBack` — *yours*

This is [the lab's Task 2](lab/README.md#task-2-in-full).

**First, look.** Run your program again:

```bash
dotnet run --project Project
```

**It says `1 details on file` again, not 2.** The table holds two rows for that record now — refresh the SQL Server view and see. Your `Load` read your record's table and nothing else, so the record started the run with an empty list, and this run added one.

#### First, the fact — before you touch `Load`

**Write it in `Project.Tests/RegistryTests.cs`, under `Week11_ARemovedRecordStaysGone`.** The name is dictated: `Week12_DetailsComeBack`. The moves are the lab's `ACartsAiringsComeBack`:

- **Set the scene.** The three `options` lines your week-11 fact starts with. A record from `NewItem`, with **two** details from `NewDetail` added to its list, in a `Registry` saved with `registry.Save(new ProjectContext(options))`.
- **Do the thing:** a second registry, `reopened`, loads from a fresh `new ProjectContext(options)`.
- **Check the answer:** the record `reopened.Find(…)` hands back has **2** details. **Assert on `reopened`, never on the registry that saved.**

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord` and `YourDetails` for your own names, and the three names for your own, or it will not build.

```csharp
    [Fact]
    public void Week12_DetailsComeBack()
    {
        DbContextOptions<ProjectContext> options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Registry registry = new Registry();
        YourRecord record = registry.NewItem("a name of yours");
        record.YourDetails.Add(registry.NewDetail("a detail of yours"));
        record.YourDetails.Add(registry.NewDetail("another detail of yours"));
        registry.Add(record);
        registry.Save(new ProjectContext(options));

        Registry reopened = new Registry();
        reopened.Load(new ProjectContext(options));

        Assert.Equal(2, reopened.Find("a name of yours")!.YourDetails.Count);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
Assert.Equal() Failure: Values differ
Expected: 2
Actual:   0
```

**Red, and it is the run you just saw.** Two details were saved, and the next registry's record has none.

**Commit it, red** — it is the rule, written down before the code that keeps it:

```bash
git add .
git commit -m "A test: a record's details come back"
```

#### Now the fix

**Open `Project/Registry.cs`. In `Load`, the first line reads your record's table.** [Add `Include`](lecture-notes.md#why-the-airings-dont-come-back-on-their-own) right after your `DbSet`, naming your list:

```csharp
.Include(item => item.YourDetails)
```

**And at the very top of `Registry.cs`**, on its own line with a blank line under it:

```csharp
using Microsoft.EntityFrameworkCore;
```

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `YourRecords` and `YourDetails` for your own names, or it will not build.

```csharp
        List<YourRecord> loaded = db.YourRecords.Include(item => item.YourDetails).OrderBy(item => item.Id).ToList();
```

</details>

```bash
dotnet test Project.Tests
```

**Every fact green**, the new one included. Then run your program:

```bash
dotnet run --project Project
```

**It says `3 details on file`** — the two already in the table came back, and this run added a third.

```bash
dotnet test Project.Checks
```

**3 / 4.**

```bash
git add .
git commit -m "A record's details come back"
```

---

### Task 3 in full

**The log on, then `WithDetails`, a question the database answers.**

**Check:** `Check4_TheDatabaseAnswers` — *mine*

This is [the lab's Task 3](lab/README.md#task-3-in-full).

**1. [The log](lecture-notes.md#the-log).** In `Project/ProjectContext.cs`, directly under `options.UseSqlServer(config["ConnectionStrings:Project"]);`, with a blank line above it:

```csharp
        options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
```

**And directly under `using Microsoft.Extensions.Configuration;` at the top:**

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
```

**2. `WithDetails` on your `Registry`.** The names of the records that have at least one detail, in order by name — [a question the database answers](lecture-notes.md#linq-that-runs-as-sql), so it starts from your `DbSet`, never from your list:

- **`db.YourRecords`**, then **`.Where(item => item.YourDetails.Any())`**, then **`.OrderBy(…)`** and **`.Select(…)`** on your name property, then **`.ToList()`**.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecords`, `YourDetails` and `Name` for your own names, or it will not build.

```csharp
    public List<string> WithDetails(ProjectContext db)
    {
        return db.YourRecords
            .Where(item => item.YourDetails.Any())
            .OrderBy(item => item.Name)
            .Select(item => item.Name)
            .ToList();
    }
```

</details>

**3. Ask it.** In `Project/Program.cs`, **directly under `registry.Save(db);`** — after the save, because the database only knows what has been saved:

```csharp
Console.WriteLine($"With details: {string.Join(", ", registry.WithDetails(db))}");
```

```bash
dotnet run --project Project
```

**Your program's output now has SQL in it.** Find the `SELECT` just before the `With details:` line: it has a `WHERE EXISTS` naming your detail table, and an `ORDER BY` on your name column. **That's your `Where`, your `Any` and your `OrderBy`, run by the database.** The line itself names the record you gave a detail in Task 1.

```bash
dotnet test Project.Checks
```

**4 / 4.**

```bash
git add .
git commit -m "The database answers"
```

---

## Part 3 — The pull request

```bash
git push -u origin a-second-table
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it**. If you see your connection string anywhere in those changes, stop, take it out, commit, and push again before you merge.

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

Five moments worth saving, written into the parts above: the checks copied in, the second table, the fact while it's red, the fix, and the question. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-11 still hold — everything check 1 covered last week, plus last week's: a removed record stays gone |
| 3 | A second table: NewDetail makes a detail, each record holds a list of them, and a migration makes the table |
| 2 | Each record comes back from the database with exactly its own details |
| 3 | WithDetails is answered by the database: the names of the records with at least one detail, in order |
| 2 | Your test: a record saved with its details has them again the next time the registry loads — written by you, before the fix, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The project compiles from a clean clone — it cannot be RUN anywhere but your own machine, because your connection string is not in the repo |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The two points for your program are still for building it, not running it**, the same as last week. Your program needs your connection string to run, and that is correctly not in your repo. **Your code is still run**: my four checks drive your registry and your context, and your own suite runs exactly as you wrote it.

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| The first check is called `Check1_WeeksFourToTenStillHold` | You're running **week 11's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) removes them and copies this week's in — run the `rm` and the `cp`, both. |
| `CS0246: The type or namespace name 'YourDetail' could not be found` | You pasted a shape without swapping the placeholder. `YourDetail` is your detail class's name. |
| Check 2 red: *still called YourDetail* | You kept the placeholder name for your detail class. Rename it — the class, its file, `NewDetail`'s return type and the list — then `migrations add` again. |
| `CS0246` naming `YourRecord` | The same: `YourRecord` is your record type — the class `NewItem` hands back. |
| `CS1061` naming `YourDetails` or `YourRecords` | `YourDetails` is the list on your record; `YourRecords` is your record's `DbSet` in `ProjectContext`. |
| `CS1061: … does not contain a definition for 'Include'` | `using Microsoft.EntityFrameworkCore;` is missing from the top of `Registry.cs`. |
| A pile of errors naming one of your record's methods | Your detail class has the same name as a method on your record. Rename the class. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that hasn't been built since you changed it. `dotnet build Project`, then the `dotnet ef` command again. |
| `Invalid object name` naming your detail table | No migration made it, or `database update` hasn't run since. Task 1, step 5. |
| Check 2 red: *no public method called NewDetail* | Task 1, step 3. One `string`, exactly. |
| Checks 2, 3 and 4 all red, and check 2 says *NewDetail exists, but not with the parameters* | Your `NewDetail` takes more than one `string`. It takes exactly one, always — give any other constructor parameters defaults, and let `NewDetail` pass only the name. |
| Check 2 red: *has no list of …s* | Task 1, step 2. |
| Check 2 red: *No migration in your project knows about* | `migrations add` hasn't run since your detail class existed. Task 1, step 5. |
| Check 3 red: *Load never asked for them* | No `Include` in `Load`. Task 2. |
| Check 4 red: *handed back nothing* | `WithDetails` asks your list. My check asks a registry holding NOTHING, so only the table can answer. Start from `db.YourRecords`. |
| Check 4 red: *in order by name* | `.OrderBy(…)` on your name property, before the `Select`. |
| `With details:` is empty when you run | `WithDetails` runs before `registry.Save(db);`, or no record has a detail yet. It goes directly under the save. |
| `1 details on file` every run | No `Include` yet. That is Task 2. |
| `dotnet ef database update` prints SQL, some lines twice | The log is on, and `dotnet ef` uses your `ProjectContext` too. It still works. |
| `The ConnectionString property has not been initialized.` | No connection string found. **`dotnet user-secrets list --project Project`** says what is in the store. |
| `Login failed for user` | Wrong login or password. Run [week 10's Task 1c](../week-10/homework.md#task-1-in-full) `set` again; `set` replaces. |
| My checks pass and your program can't connect | **That is exactly right.** My checks never touch the server. Only running your program tests your connection string. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week12_DetailsComeBack`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b a-second-table`, push that. |
| An error that isn't in this table | [The notes' troubleshooting list](lecture-notes.md#-troubleshooting) has more of them. |

**Prev:** [Week 12 Lab — Every Cart Has a Log](lab/README.md) · **Next:** Week 13 *(coming)*
