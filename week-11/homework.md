# Week 11 Homework — A Record Comes Off 🗄️

**20 points · due before next class**

> [!NOTE]
> **A normal week.** Set in one class and due before the next one.

Your registry has been able to take a record off since week 5: `Remove` finds it and takes it out of the list. Since last week the list lives in a database, and **a record you remove comes back the next time you run**, because `Save` puts rows in and changes them and never takes one out. This week a removed record stays gone.

**This homework is the lab again, on your own project, and it is shorter than the lab.** Your Task 1 is the lab's Task 2 — watching a removed record come back — and your Task 2 is the lab's Task 3. **The lab's Task 1 has no twin here:** your project's database and its secret store both carry on from last week, because your project repo is the same repo it was. Where the lab said `Rotation`, `Song`, `db.Songs` and `_songs`, you use your `Registry`, your record type, your `DbSet` and the list inside your `Registry`.

**Nothing new is dictated.** `Remove(string name)` has been dictated since week 5 and `Save(ProjectContext db)` since week 10, and neither changes its signature. **One name is dictated, and it's your fact's:** `Week11_ARemovedRecordStaysGone`.

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
git checkout -b a-record-comes-off
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
cp -r ../dotnet-db-starters/project/week-11/Project.Checks .
```

⚠️ **Don't skip the `rm`.** Copying over the top of the old folder is not enough: on Windows the copied files keep their old dates, `dotnet` decides nothing has changed, and it runs **last week's** checks again without telling you.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **two** checks, and the first is called `Check1_WeeksFourToTenStillHold`. If yours is called `Check1_WeeksFourToNineStillHold`, you are running **week 10's** — come back and run the `rm` and the `cp` above, both of them.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 2.** The green one is check 1 — weeks 4 through 10, the database included, still holding. The other one is this week's.

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 11: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — **1** through Task 1, then **2**.
- **Yours:** `dotnet test Project.Tests` — the suite you have been growing since week 7. It gains one fact at Task 2.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToTenStillHold` | mine | Already green. Remove a record and watch it come back. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check2_ARemovedRecordStaysGone` | mine | `Save` takes a removed record's row out of the table. **[Task 2 in full ↓](#task-2-in-full)** |
| 2 | `Week11_ARemovedRecordStaysGone` | **yours** | Your own fact about it, written first. **[Task 2 in full ↓](#task-2-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Week10_ASecondSaveChangesTheRow` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

**Remove a record, and watch it come back.**

**Check:** `Check1_WeeksFourToTenStillHold` — *mine, already green*

This is the lab's Task 2, without the code: your `Remove` has worked since week 5. **Nothing turns green, and nothing changes in your files.** It is the problem Task 2 fixes, seen first.

**Run your program:**

```bash
dotnet run --project Project
```

**When it asks for a record to take off** — the prompt week 5 had you add — **type the name of one of your records.** It says it took it off, and the listing it prints after that doesn't have it. Let the program finish: it saves.

**Run it again,** and this time press **Enter** at that prompt:

```bash
dotnet run --project Project
```

**The record is back in the listing.** Look at your table in the SQL Server view (right-click it → **Select Top 1000**): **its row never left.** `Save` added your new records and updated the old ones. The removed one wasn't in the list any more, so `Save` never mentioned it, and `Load` read it straight back.

<details>
<summary><b>Your program doesn't ask for a record to take off?</b> Add one line, run it, take the line out.</summary>

Directly above `registry.Save(db);` in `Project/Program.cs`, add a line that removes one of your records by name:

```csharp
registry.Remove("a name of yours");
```

Run the program once. **Its listing may still show the record**, because the listing prints before that line runs; the count printed under the listing is one lower. Then **delete the line** and run it again: the record is back in the listing. Leave the line out when you're done.

</details>

```bash
dotnet test Project.Checks
```

**1 / 2 — still.** Nothing to commit: nothing in your files changed.

📖 *Further reading:* [a removed record comes back](lecture-notes.md#a-removed-record-comes-back).

---

### Task 2 in full

**A fact first, then `Save` takes a removed record's row out of the table.**

**Checks:** `Check2_ARemovedRecordStaysGone` — *mine* · `Week11_ARemovedRecordStaysGone` — *yours*

This is the lab's Task 3.

#### First, the fact — before you touch `Save`

**Write it in `Project.Tests/RegistryTests.cs`, under `Week10_ASecondSaveChangesTheRow`.** The name is dictated: `Week11_ARemovedRecordStaysGone`. The moves are the lab's `APulledCartStaysPulled`:

- **Set the scene.** The three `options` lines your week-10 fact starts with. A `Registry` holding **two** records from `NewItem`, each with a name of yours, saved with `registry.Save(new ProjectContext(options))`.
- **Do the thing: the next run.** One `ProjectContext db = new ProjectContext(options);`, used for both halves. A second registry, `nextRun`, loads from `db`, **removes one of the two by name**, and saves back to `db`.
- **Check the answer** in a third registry, `reopened`, loaded from a fresh `new ProjectContext(options)`: it holds **1** record, and `Find` on the removed name hands back `null`. **Assert on `reopened`, never on the registry that saved.**

| In the lab | In yours | For a lighthouse registry |
|---|---|---|
| `new Song("Nightjar", …)` | a record from `NewItem` — its type is written `YourRecord` below | `Lighthouse` |
| `nextNight.Remove("Nightjar")` | `nextRun.Remove(…)`, with one of your two names | `nextRun.Remove("Bodie Island")` |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord` for your record type, and both names for names of your own, or it will not build.

```csharp
    [Fact]
    public void Week11_ARemovedRecordStaysGone()
    {
        DbContextOptions<ProjectContext> options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Registry registry = new Registry();
        YourRecord kept = registry.NewItem("a name of yours");
        YourRecord removed = registry.NewItem("another name of yours");
        registry.Add(kept);
        registry.Add(removed);
        registry.Save(new ProjectContext(options));

        ProjectContext db = new ProjectContext(options);
        Registry nextRun = new Registry();
        nextRun.Load(db);
        nextRun.Remove("another name of yours");
        nextRun.Save(db);

        Registry reopened = new Registry();
        reopened.Load(new ProjectContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Null(reopened.Find("another name of yours"));
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
Assert.Equal() Failure: Values differ
Expected: 1
Actual:   2
```

**Red, and it is Task 1 again.** One record was removed, and the next run's registry still holds two.

**Commit it, red** — it is the rule, written down before the code that keeps it:

```bash
git add .
git commit -m "A test: a removed record stays gone"
```

#### Now the fix

**Open `Project/Registry.cs`. In `Save`, after the loop that adds and updates, and before `db.SaveChanges();`, add [a second loop](lecture-notes.md#saves-third-job-rows-the-list-no-longer-holds)**, the lab's: read every row in your table, and take out each one whose `Id` no record in your list has.

| In the lab | In yours |
|---|---|
| `Song` | your record type — written `YourRecord` below |
| `db.Songs` | your `DbSet` — written `db.YourRecords` below |
| `_songs` | the list inside your `Registry` — written `_yourList` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `YourRecords` and `_yourList` for your own names, or it will not build.

```csharp
        foreach (YourRecord row in db.YourRecords.ToList())
        {
            if (!_yourList.Any(item => item.Id == row.Id))
            {
                db.YourRecords.Remove(row);
            }
        }
```

</details>

```bash
dotnet test Project.Tests
```

**Every fact green**, the new one included. Then run your program, and remove a record at the prompt again:

```bash
dotnet run --project Project
```

**Run it once more, pressing Enter at the prompt:**

```bash
dotnet run --project Project
```

**The record you removed stays gone**, and in the SQL Server view its row is gone from the table. **Every other record keeps its row and its `Id`.**

```bash
dotnet test Project.Checks
```

**2 / 2.**

```bash
git add .
git commit -m "A removed record stays gone"
```

---

## Part 3 — The pull request

```bash
git push -u origin a-record-comes-off
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

Three moments worth saving, written into the parts above: the checks copied in, the fact while it's red, and the fix. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 4 | Weeks 4-10 still hold — everything check 1 covered last week, plus last week's four: a record shaped for a table, a migration, Save and Load round-tripping, and a second save changing the row |
| 4 | A record removed on the next run is gone from the table, and the records that weren't removed keep their rows |
| 4 | Your test: a record loaded, removed and saved is gone the next time the registry loads — written by you, before the fix, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The project compiles from a clean clone — it cannot be RUN anywhere but your own machine, because your connection string is not in the repo |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The two points for your program are still for building it, not running it**, the same as last week. Your program needs your connection string to run, and that is correctly not in your repo. **Your code is still run**: my two checks drive your registry and your context, and your own suite runs exactly as you wrote it.

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| The first check is called `Check1_WeeksFourToNineStillHold` | You're running **week 10's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) removes them and copies this week's in — run the `rm` and the `cp`, both. |
| `CS0246: The type or namespace name 'YourRecord' could not be found` | You pasted a **Stuck?** shape without swapping the placeholder. `YourRecord` is your record type's name — the class `NewItem` hands back. |
| `CS1061` naming `YourRecords` | The same thing: `YourRecords` is your `DbSet`'s name in `ProjectContext`. |
| `CS0103: The name '_yourList' does not exist in the current context` | `_yourList` is the name of the list field inside your `Registry`. Open `Registry.cs` and use the name you gave it. |
| Check 1 red: *This was week 10's check …* | Something you changed broke last week's work. The rest of the message is week 10's own, and says what. |
| Check 2 red: *put it straight back* | No second loop in `Save` yet, or it is after `db.SaveChanges()`. It goes before. |
| Check 2 red: *its Id went from … to …* | Your `Save` empties the table and puts everything back. Take out only the rows no record in your list has. |
| Your table is **empty** after a run where you removed nothing | The `!` is missing from `!_yourList.Any(...)`, so `Save` takes out every record you kept. Put it back, then run your program twice: the first run starts from your seeded records, because the table was empty. |
| You removed **every** record, and next run they're all back | An empty table is what your program's first run looks like, so it seeds again. That's your `Load`'s first-run rule doing its job. |
| `The ConnectionString property has not been initialized.` | No connection string found. **`dotnet user-secrets list --project Project`** says what is in the store. |
| `Login failed for user` | Wrong login or password. Run [week 10's Task 1c](../week-10/homework.md#task-1-in-full) `set` again; `set` replaces. |
| The SQL Server view still shows a removed record | Right-click the table → **Select Top 1000** again. It doesn't refresh on its own. |
| My checks pass and your program can't connect | **That is exactly right.** My checks never touch the server. Only running your program tests your connection string. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week11_ARemovedRecordStaysGone`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b a-record-comes-off`, push that. |
| An error that isn't in this table | [The notes' troubleshooting list](lecture-notes.md#-troubleshooting) has more of them. |

**Prev:** [Week 11 Lab — A Cart Comes Off](lab/README.md) · **Next:** Week 12 *(coming)*
