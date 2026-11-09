# Week 14 Project Work — Two Columns of Your Own 🗄️

**Not graded · nothing to submit · done in class, with your instructor in the room**

> [!NOTE]
> **Nothing this week is graded, and nothing goes in Canvas.** Week 13's homework was the last one. This is still worth an hour: it's work on the same project you present in week 16, and it's the one change this semester that touches the records already in your database.

**This is the lab again, on your own project.** Your Task 1 is the lab's Task 1, and your Task 2 is the lab's Task 2. Where the lab gave each cart a date and three stars, you give each of **your** records the same two: **when it was added**, and **how many stars you give it**.

> [!IMPORTANT]
> **Your database carries on. Nothing here drops it.** It *changes*, though: two new columns, in a table that holds the records you typed in yourself. **So you read every migration before you run it**, and you count your rows before and after.

**Nothing new is dictated.** The checks are last week's, and they stay green. The names below match the lab so the two pages read side by side; you can choose your own.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Every task below says which lab task it is. Each one has a **Stuck? Show me the shape** box.

---

## Part 1 — Catch up, branch, and count your rows

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet, or no database in it?** Then an earlier week is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes the repo, and [week 10's homework](../week-10/homework.md) moves the registry into a database. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

Now the branch this week's work happens on:

```bash
git checkout -b two-columns
```

**No new checks this week.** Last week's are already in your repo, and tonight they're your guard: they should be green before you start and green when you finish.

```bash
dotnet test Project.Checks
```

**5 / 5.** *(A red one is unfinished week 13 work, and its message names what's missing. Finish that first, if you can: week 16 runs the whole program.)*

```bash
dotnet test Project.Tests
```

**Every fact green.** Write down how many there are. Task 2 adds one.

**Turn last week's log off, if it's still on.** Open `Project/ProjectContext.cs`. If it still has this line, delete it. With it in, every `dotnet ef` command tonight prints every command it sends to the database, and the lines you need to read get lost:

```text
options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
```

**Count your rows.** In the **SQL Server** view, right-click your project's database → **New Query**, and run this with **your** table's name — the name of the `DbSet` in your `ProjectContext`:

```sql
SELECT COUNT(*) FROM YourRecords
```

**Write that number down.** It has to be the same after each task.

---

## Read every migration before you run it

Both tasks make a migration, and each one changes the database that holds your real records. **Before every `database update`**, open the new migration — the file in `Project/Migrations/` ending with the name you gave it, **not** the `.Designer.cs` one — and read its `Up` method:

| Look for | Good | Stop |
|---|---|---|
| What it does | `AddColumn` | `DropColumn`, `DropTable`, `AlterColumn`, `RenameColumn` you didn't ask for |
| Which table | **your** record's table | some other table |
| What the old rows get | `nullable: true`, or the `defaultValue` you mean | a `defaultValue` that's wrong for the records you already have |
| What `migrations add` printed | `Done.` | *An operation was scaffolded that may result in the loss of data* |

**If it looks wrong and you haven't run it**, take it back. Nothing has touched your database yet:

```bash
dotnet ef migrations remove --project Project
```

Fix the class, then `migrations add` again.

**If you've already run it**, run it backward: `database update` with the name of the migration **before** it. First find that name. This lists your migrations in order, oldest first, and one nobody has run yet says `(Pending)` on the end:

```bash
dotnet ef migrations list --project Project
```

Then use the name of the one just above yours — the words after the number are enough. Swap in that name for `THE-ONE-BEFORE`:

```bash
dotnet ef database update THE-ONE-BEFORE --project Project
```

Then fix the migration, or `migrations remove` it, and `database update` again.

---

## Part 2 — The tasks

| # | Lab task | What to do |
|---|---|---|
| 1 | [Task 1](lab/README.md#task-1-in-full) | A column nobody knows: when each record was added. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | [Task 2](lab/README.md#task-2-in-full) | A column everybody knows: three stars, for the old records too. A fact first. **[Task 2 in full ↓](#task-2-in-full)** |

### Task 1 in full

**A column nobody knows: when each record was added.**

This is [the lab's Task 1](lab/README.md#task-1-in-full).

**1. Two members on your record.** Open your record's class — the file in `Project/` named after your topic, the class `NewItem` makes. Directly under its last property, add:

- **`public DateTime? Added { get; private set; }`** — the `?` because nobody wrote down when your existing records went on file.
- **`public string AddedOn()`**: if `Added == null`, `return "-";`, and otherwise `return Added.Value.ToString("yyyy-MM-dd");`

<details>
<summary><b>Stuck? Show me the shape</b></summary>

These two work in any record, whatever its topic:

```csharp
    public DateTime? Added { get; private set; }

    public string AddedOn()
    {
        if (Added == null)
        {
            return "-";
        }

        return Added.Value.ToString("yyyy-MM-dd");
    }
```

</details>

**2. Stamp it in the constructor.** In your record's constructor, as its last line:

```csharp
        Added = DateTime.Now;
```

**3. Show it.** In the same class, your `Line()` method builds the line your listing prints. Inside its quotes, just before the closing `"`, add:

```text
 - added {AddedOn()}
```

**4. Run your program before the migration.** Press Enter at every prompt.

```bash
dotnet run --project Project
```

**It crashes with `Invalid column name 'Added'`.** Your class has a column your table doesn't. That's the migration's job.

**5. Write the migration:**

```bash
dotnet ef migrations add AnAddedDate --project Project
```

**6. Read it** — [the table above](#read-every-migration-before-you-run-it). You want **`AddColumn`**, on **your** table, with **`nullable: true`**:

```text
            migrationBuilder.AddColumn<DateTime>(
                name: "Added",
                table: "YourRecords",
                type: "datetime2",
                nullable: true);
```

**7. Run it:**

```bash
dotnet ef database update --project Project
```

**8. Run your program again.** Press Enter at every prompt.

```bash
dotnet run --project Project
```

**Every record already on file says `added -`.** Count your rows again with Part 1's query: **the same number.** *(A record your program makes on this run — a seed, or one from a file you read in — has today's date instead.)*

```bash
dotnet test Project.Checks
```

**Still 5 / 5.**

```bash
git add .
git commit -m "A column nobody knows"
```

📖 *Further reading:* [a column nobody knows](lecture-notes.md#a-column-nobody-knows) · [read it before you run it](lecture-notes.md#read-it-before-you-run-it).

---

### Task 2 in full

**A column everybody knows: three stars, for the old records too. A fact first.**

This is [the lab's Task 2](lab/README.md#task-2-in-full).

**1. One property**, under `AddedOn()`:

```csharp
    public int Stars { get; set; } = 3;
```

**2. Show it.** In `Line()`, just before the closing `"`, after the `added` you put there in Task 1:

```text
, {Stars} stars
```

**3. Write the migration:**

```bash
dotnet ef migrations add EveryRecordGetsStars --project Project
```

**4. Read it, and don't run it yet:**

```text
            migrationBuilder.AddColumn<int>(
                name: "Stars",
                table: "YourRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
```

**`defaultValue: 0` is what every record already in your table would get.** Your `= 3` only reaches records made from now on.

#### First, the fact — before you touch the migration

**In `Project.Tests/RegistryTests.cs`, under `Week13_ABadFileAddsNothing`**, a fact called `Week14_TheOldRecordsGetThreeStars`. It's the lab's `TheOldCartsGetThreeStars`, on your migration:

- `Migration migration = new EveryRecordGetsStars();` — your migration's class name is the name you gave `migrations add`.
- Pick out the one that adds `Stars`: `migration.UpOperations.OfType<AddColumnOperation>().Single(op => op.Name == "Stars")`
- `Assert.Equal(3, stars.DefaultValue);`

**And three using lines at the top of `RegistryTests.cs`, directly under `using Microsoft.EntityFrameworkCore;`.** Your migrations live in `Project.Migrations`:

```csharp
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Project.Migrations;
```

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void Week14_TheOldRecordsGetThreeStars()
    {
        Migration migration = new EveryRecordGetsStars();

        AddColumnOperation stars = migration.UpOperations
            .OfType<AddColumnOperation>()
            .Single(op => op.Name == "Stars");

        Assert.Equal(3, stars.DefaultValue);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
Assert.Equal() Failure: Values differ
Expected: 3
Actual:   0
```

```bash
git add .
git commit -m "A test: the old records get three stars"
```

#### Now the fix

**In the `_EveryRecordGetsStars.cs` migration, change `defaultValue: 0` to `defaultValue: 3`.** Nothing has run it yet.

```bash
dotnet test Project.Tests
```

**Every fact green**, the new one included. **Now run it:**

```bash
dotnet ef database update --project Project
```

**Run your program.** Press Enter at every prompt.

```bash
dotnet run --project Project
```

**Every record ends `, 3 stars`.** Count your rows: **the same number** as Part 1.

```bash
dotnet test Project.Checks
```

**Still 5 / 5.**

```bash
git add .
git commit -m "Every record gets three stars"
```

<details>
<summary><b>Already ran <code>database update</code> with the <code>0</code> in it?</b> Every old record has 0 stars. Take it back, then fix it.</summary>

```bash
dotnet ef database update AnAddedDate --project Project
```

That runs `EveryRecordGetsStars` backward: the `Stars` column comes off, and every row stays. Change the `0` to `3`, and run `dotnet ef database update --project Project` again.

</details>

📖 *Further reading:* [a column everybody knows](lecture-notes.md#a-column-everybody-knows) · [a test that reads a migration](lecture-notes.md#a-test-that-reads-a-migration) · [taking a migration back](lecture-notes.md#taking-a-migration-back).

---

## Part 3 — The week 16 runway

Week 16 you present this project, for **40 points, in four tens** ([the notes have the table](lecture-notes.md#the-week-16-runway)): **it runs** from start to finish · **you show** what it does · **you explain one decision** you made, and why · **you say what's next.** Tonight is for the first and the third.

**1. Push your branch**, so GitHub has tonight's work:

```bash
git push -u origin two-columns
```

**2. A clean clone.** Your laptop has files GitHub may not. A clean clone has exactly what's in your repo, which is what has to run in week 16. Ask git for your repo's URL:

```bash
git remote get-url origin
```

Then clone tonight's branch next to your project, with **your** URL in place of `YOUR-URL`:

```bash
git clone -b two-columns YOUR-URL ../clean-check
```

**And run it from there.** Press Enter at every prompt.

```bash
dotnet run --project ../clean-check/Project
```

**If it builds and runs, your project runs from GitHub.** It uses the same connection string as your own copy, because the `UserSecretsId` in the `.csproj` came with it. **If it doesn't build**, read the first error: usually a file you never committed. Commit it in your own copy, push, and clone again.

When you're done, **delete the `clean-check` folder in your file manager.** It's a copy, and nothing of yours is in it.

**3. Three notes in your `README.md`.** Open it in your project, and add three headings with a line or two under each:

```markdown
## What it does

## One decision, and why

## What's next
```

**The decision is yours to pick:** why a property has a `private set`, why something is nullable, why a record has many details, why a file is checked before anything is added. **One, and the reason.** That's the ten points nobody else can write for you.

```bash
git add .
git commit -m "Notes for the presentation"
```

```bash
git push
```

**4. Anything red from an earlier week?** Fix it now, while your instructor is in the room. Nothing is graded again, but week 16 runs the whole program.

---

## Part 4 — The pull request

GitHub answers your first push with a URL. Open it (or use the **Compare & pull request** banner), **read your own diff**, and merge it with the plain **"Merge pull request"** button. If you see your connection string anywhere in those changes, stop, take it out, commit, and push again before you merge.

```bash
git checkout main
```

```bash
git pull
```

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `Invalid column name 'Added'` (or `'Stars'`) | Your class has a column your table doesn't. `migrations add`, read it, then `database update`. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that hasn't been built. `dotnet build Project`, then the `dotnet ef` command again. |
| `No project was found. Change the current working directory or use the --project option.` | The `--project Project` is missing from the end of a `dotnet ef` command. |
| `The name 'AnAddedDate' is used by an existing migration.` | You've made it already. Look in `Project/Migrations/`. |
| `The migration '…' has already been applied to the database. Revert it and try again.` | `migrations remove` only takes back a migration nobody has run. [Read every migration](#read-every-migration-before-you-run-it) says how to run one backward. |
| `migrations remove` says `The ConnectionString property has not been initialized` | `remove` asks your database whether the migration has been run, so it needs your connection string and the network. `dotnet user-secrets list --project Project` says what's in the store. |
| `CS0246` … `'Migration'` or `'AddColumnOperation'` | The three using lines are missing from `RegistryTests.cs`. |
| `CS0246` … `'EveryRecordGetsStars'` | `using Project.Migrations;` is missing, or your migration has a different name. |
| `CS0102: The type '…' already contains a definition for 'Added'` (or `'Stars'`) | Your record already has a member with that name. Pick another name for the new one, everywhere you use it. |
| `Sequence contains no matching element` in your fact | Nothing in that migration adds `Stars`. Check the spelling in `op.Name == "Stars"`. |
| Every old record says `0 stars` | You ran `database update` before you fixed the migration. [Task 2's last box](#task-2-in-full) takes it back. |
| `Project/Migrations/ProjectContextModelSnapshot.cs` shows as changed after `migrations remove` | `remove` rewrites that file, and writes `ToTable("…", (string)null)` where it said `ToTable("…")`. They mean the same thing. Commit it. |
| A check in `Project.Checks` went red tonight | Something you changed broke last week's work. The message names it. |
| `fatal: destination path '../clean-check' already exists and is not an empty directory.` | You cloned before. Delete that folder in your file manager, and clone again. |
| The clean clone says `Login failed` or can't connect | The clone uses your own connection string, so that's your project's connection, not the clone. Does `dotnet run --project Project` work? |
| `MSB1003: Specify which project` | You're in the wrong window. This page runs from your **project** repo's window; the lab runs from the coursework one. |
| An error that isn't in this table | [The notes' troubleshooting list](lecture-notes.md#-troubleshooting) has more of them. |

**Prev:** [Week 14 Lab — The Old Carts](lab/README.md) · **Next:** Week 15 *(coming)*
