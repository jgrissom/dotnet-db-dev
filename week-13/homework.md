# Week 13 Homework — Four Answers of Your Own 🗄️

**20 points · due before next class**

> [!NOTE]
> **This is the last homework of the semester.** Weeks 14 and 15 collect nothing, and week 16 you present. Set in one class and due before the next one, like every other week.

Since week 2 your programs have asked once and answered gracefully. That was the right rule for a program nobody was sitting at. **This week your program gets the rest of the answers.** It asks again when a person can fix it, it says no to a bad file, its logic throws when it can't do its job, and it stops in a sentence when it can't carry on.

**This homework is the lab again, on your own project.** Your Task 1 is the lab's Task 1, and so on through Task 4. Where the lab read a delivery of carts, your registry reads **a file of names**, and it makes one record for each with `NewItem`.

> [!IMPORTANT]
> **Your database carries on. Nothing in this homework drops it.** This week adds no table and no migration.

**One member is added to `Registry`, and one new class is dictated, because my checks have to call them. The signatures are exact:**

```csharp
public int Import(string path)
```

That one goes on `Registry`. It hands back how many records were new. And this is a new class, in its own file:

```csharp
public static class RegistryDesk
{
    public static void Remove(Registry registry)
    public static void Import(Registry registry)
}
```

- **`RegistryDesk` is the lab's `RotationDesk`:** the class that talks to the person. `Registry` thinks and throws. `RegistryDesk` asks and catches.
- **One more name is dictated, and it's your fact's:** `Week13_ABadFileAddsNothing`.

Everything you named before keeps its name.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Every task below says which lab task it is. Each one has a **Stuck? Show me the shape** box. These shapes have a **`?`** where the week's new line goes, and it will not build until you replace it. The line above each box tells you what goes there.

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
git checkout -b four-answers
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
cp -r ../dotnet-db-starters/project/week-13/Project.Checks .
```

⚠️ **Don't skip the `rm`.** Copying over the top of the old folder is not enough: on Windows the copied files keep their old dates, `dotnet` decides nothing has changed, and it runs **last week's** checks again without telling you.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **five** checks, and the first is called `Check1_WeeksFourToTwelveStillHold`. If yours is called `Check1_WeeksFourToElevenStillHold`, you are running **week 12's** — come back and run the `rm` and the `cp` above, both of them.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 5.** The green one is check 1 — weeks 4 through 12 still holding. The other four are this week's.

**Turn last week's log off.** It prints every command your program sends to the database, and this week that buries the messages you're writing. In `Project/ProjectContext.cs`, delete this one line. Nothing is graded on it:

```text
options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
```

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 13: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — **2** after Task 1, **3** after Task 2, **4** after Task 3, **5** after Task 4.
- **Yours:** `dotnet test Project.Tests` — the suite you have been growing since week 7. It gains one fact at Task 3.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check2_AWrongNameAsksAgain` | mine | Ask again: `RegistryDesk.Remove`. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check3_TheDeskCatchesABadFile` | mine | `Registry.Import`, and `RegistryDesk.Import` with `try` and `catch`. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check4_ABadFileAddsNothing` | mine | `Import` throws, and a bad file adds nothing. **[Task 3 in full ↓](#task-3-in-full)** |
| 3 | `Week13_ABadFileAddsNothing` | **yours** | Your own fact about it, written first. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check5_TheProgramStopsInASentence` | mine | `CanConnect`, and a `catch` around your save. **[Task 4 in full ↓](#task-4-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Week12_DetailsComeBack` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

**Ask again: `RegistryDesk.Remove`.**

**Check:** `Check2_AWrongNameAsksAgain` — *mine*

This is [the lab's Task 1](lab/README.md#task-1-in-full).

**1. Make `Project/RegistryDesk.cs`.** A `public static class RegistryDesk` holding one method, `public static void Remove(Registry registry)`, which does this, in this order:

- **`while (true)`** around all of it.
- **The prompt:** a `Console.Write` that asks which record to take off, and says Enter skips. If your program already asks this (week 11's homework), move that line in and keep your wording. If not, something like `Console.Write("Take one off the books (Enter to skip): ");`
- **`string? typed = Console.ReadLine();`**
- **`if (string.IsNullOrWhiteSpace(typed))`, then `return;`** — Enter gives up, and so does the input ending.
- **`if (registry.Remove(typed.Trim()))`**: say it came off, then **`return;`**
- **After that `if`, say there's nothing by that name.** No `else` and no `return`, so the loop asks again.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The wording is yours. Replace the `?` with `registry.Remove(typed.Trim())`.

```csharp
public static class RegistryDesk
{
    public static void Remove(Registry registry)
    {
        while (true)
        {
            Console.Write("Take one off the books (Enter to skip): ");
            string? typed = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(typed))
            {
                return;
            }

            if (?)
            {
                Console.WriteLine("Removed.");
                return;
            }

            Console.WriteLine("Nothing by that name.");
        }
    }
}
```

</details>

**2. Use it.** Your `Project/Program.cs` has a prompt that takes one off the books (week 11's homework). **Delete it** — the `Console.Write`, the `ReadLine` and the `if` that calls `registry.Remove` — and put this one line where it was:

```csharp
RegistryDesk.Remove(registry);
```

*No such prompt in your program?* Put the line directly above `registry.Save(db);`.

**Run your program, type a name nobody has, and then press Enter.**

```bash
dotnet run --project Project
```

**It says nothing by that name, and asks again.** Enter moves on, and your program's other prompts work as before.

```bash
dotnet test Project.Checks
```

**2 / 5.**

```bash
git add .
git commit -m "A wrong name asks again"
```

📖 *Further reading:* [ask again](lecture-notes.md#ask-again).

---

### Task 2 in full

**`Registry.Import`, and `RegistryDesk.Import` with `try` and `catch`.**

**Check:** `Check3_TheDeskCatchesABadFile` — *mine*

This is [the lab's Task 2](lab/README.md#task-2-in-full). In the lab `Import` shipped written, so here it is whole. Reading a file is week 8's job, not tonight's.

**1. `Import` on your registry.** In `Project/Registry.cs`, directly under `Load`. It works for any registry, so paste it as it is:

```csharp
    public int Import(string path)
    {
        string json = File.ReadAllText(path);
        List<string> names = JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();

        int before = Count;

        foreach (string name in names)
        {
            Add(NewItem(name));
        }

        return Count - before;
    }
```

**If `Registry.cs` doesn't already have it, add this at the very top:**

```csharp
using System.Text.Json;
```

Your `Add` refuses a name already on file, quietly, so `Count - before` is how many were new.

**2. Two files to read in, at the top of your project repo**: beside the `Project` and `Project.Checks` folders, **not inside `Project`**. Your program runs from the top of the repo, so that's where it looks for a file you name. Make **`delivery.json`** with this in it, using two names of your own that aren't on file yet:

```json
[ "A new name of yours", "Another new name of yours" ]
```

Make **`damaged.json`** with this in it, exactly, cut off in the middle:

```text
[ "A new name of yours", "Anoth
```

**3. A second method in `RegistryDesk`.** In `Project/RegistryDesk.cs`, under `Remove`: `public static void Import(Registry registry)`, which does this, in this order:

- **`while (true)`** around all of it, the same as `Remove`.
- **The prompt:** a `Console.Write` that asks for a file name and says Enter skips, something like `Console.Write("File to import (Enter to skip): ");`
- **`string? typed = Console.ReadLine();`**, and **Enter gives up**, the same as `Remove`.
- **`string path = typed.Trim();`**
- **`try { … }`** holding **`int added = registry.Import(path);`**, a line saying how many were new, and **`return;`**
- **`catch (IOException)`** under it. It says there's no file there, and nothing else, so the loop asks again.
- **`catch (JsonException)`** under that. It says the file is damaged and nothing was added, then **`return;`**

**And at the very top of `RegistryDesk.cs`:**

```csharp
using System.Text.Json;
```

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The wording is yours. This goes inside the class, under `Remove`. Replace the first `?` with `IOException`, and the second with `JsonException`.

```csharp
    public static void Import(Registry registry)
    {
        while (true)
        {
            Console.Write("File to import (Enter to skip): ");
            string? typed = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(typed))
            {
                return;
            }

            string path = typed.Trim();

            try
            {
                int added = registry.Import(path);
                Console.WriteLine($"{added} new.");
                return;
            }
            catch (?)
            {
                Console.WriteLine($"No file at \"{path}\".");
            }
            catch (?)
            {
                Console.WriteLine("Refused: that file is damaged. Nothing was added.");
                return;
            }
        }
    }
```

</details>

**4. Use it.** In `Project/Program.cs`, **directly above `registry.Save(db);`**:

```csharp
RegistryDesk.Import(registry);
```

**Run your program. Press Enter at the first prompt, then at the new one type a wrong path, then `damaged.json`.**

```bash
dotnet run --project Project
```

**The wrong path asks again, and `damaged.json` says no and moves on.** No crash. **Then run it once more: Enter at the first prompt, then `delivery.json` at the file prompt.** It says `2 new`, and your two new records are in the listing the next time you run it. Run it again with the same file and it says `0 new`, because your `Add` refused them.

```bash
dotnet test Project.Checks
```

**3 / 5.**

```bash
git add .
git commit -m "The desk catches a bad file"
```

📖 *Further reading:* [try and catch](lecture-notes.md#try-and-catch) · [catch by name](lecture-notes.md#catch-by-name).

---

### Task 3 in full

**A fact first, then `Import` throws, and a bad file adds nothing.**

**Checks:** `Check4_ABadFileAddsNothing` — *mine* · `Week13_ABadFileAddsNothing` — *yours*

This is [the lab's Task 3](lab/README.md#task-3-in-full). In your file, a lie is **a blank name**.

#### First, the fact — before you touch `Import`

**Write it in `Project.Tests/RegistryTests.cs`, under `Week12_DetailsComeBack`.** The name is dictated: `Week13_ABadFileAddsNothing`. The moves are the lab's `ABadDeliveryAddsNothing`:

- **Set the scene.** A path in the temp folder, and `File.WriteAllText` puts a small file there: one good name, then a blank one.
- **Do the thing and check the answer:** a `new Registry()`, and **`Assert.Throws<InvalidDataException>(() => registry.Import(path));`**
- **Check the other half:** **`Assert.Equal(0, registry.Count);`** The good name ahead of the blank one must not get in.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The name in the file is yours, and any name will do: it doesn't have to be one on file. The test makes its own empty registry and its own small file, and never touches your database. Replace the `?` with `0`.

```csharp
    [Fact]
    public void Week13_ABadFileAddsNothing()
    {
        string path = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
        File.WriteAllText(path, """[ "a name of yours", "" ]""");

        Registry registry = new Registry();

        Assert.Throws<InvalidDataException>(() => registry.Import(path));
        Assert.Equal(?, registry.Count);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
Assert.Throws() Failure: No exception was thrown
Expected: typeof(System.IO.InvalidDataException)
```

**Commit it, red** — it is the rule, written down before the code that keeps it:

```bash
git add .
git commit -m "A test: a bad file adds nothing"
```

#### Now the fix

**In `Project/Registry.cs`, in `Import`, directly under the `List<string> names` line, with a blank line above it**, a `foreach` that only checks:

- **`if (string.IsNullOrWhiteSpace(name))`**
- **`throw new InvalidDataException("The file has a blank name in it.");`**

⚠️ **It has to be its own loop, above the one that adds.** Put the `throw` inside the adding loop and the good names ahead of the blank one are already in.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Replace the `?` with `string.IsNullOrWhiteSpace(name)`.

```csharp
        foreach (string name in names)
        {
            if (?)
            {
                throw new InvalidDataException("The file has a blank name in it.");
            }
        }
```

</details>

```bash
dotnet test Project.Tests
```

**Every fact green**, the new one included.

**Then the catch.** In `Project/RegistryDesk.cs`, in `Import`, directly under the `}` that closes `catch (JsonException)`, a third `catch`. Naming the exception `problem` lets you print the sentence `Import` wrote:

```csharp
            catch (InvalidDataException problem)
            {
                Console.WriteLine($"Refused: {problem.Message} Nothing was added.");
                return;
            }
```

**Make `blank.json` at the top of your project repo, beside `delivery.json`, with a good new name and a blank one in it**, then run your program. Press Enter at the first prompt, the one that takes a record off, then type `blank.json` at the file prompt:

```json
[ "One more name of yours", "" ]
```

```bash
dotnet run --project Project
```

**It says `Refused:`, with your sentence**, and the good name isn't on file.

```bash
dotnet test Project.Checks
```

**4 / 5.**

```bash
git add .
git commit -m "A bad file adds nothing"
```

📖 *Further reading:* [throw](lecture-notes.md#throw) · [check the whole file first](lecture-notes.md#check-the-whole-file-first).

---

### Task 4 in full

**`CanConnect`, and a `catch` around your save.**

**Check:** `Check5_TheProgramStopsInASentence` — *mine*

This is [the lab's Task 4](lab/README.md#task-4-in-full). Your program has one save, so the `try` wraps that one line.

**First, crash it.** Run your program, and **stop at the first prompt.**

```bash
dotnet run --project Project
```

While it waits, take a row out from under it. In the **SQL Server** view, right-click your record's table → **Select Top 1000**, and pick an `Id`. Then right-click your database → **New Query**, and run this, with your table and that `Id`:

```sql
DELETE FROM YourRecords WHERE Id = 1
```

**Back in the terminal, press Enter at every prompt until the program saves.** It crashes with **`DbUpdateConcurrencyException`**, because it was still holding a record whose row has gone. *(A second run reads the table, so it's fine. That record is gone for good, along with its details: `Cascade`.)*

**1. The `catch`.** In `Project/Program.cs`, replace the line `registry.Save(db);` with a `try` around it and a `catch` that says what happened, then **`return;`**:

- **`catch (DbUpdateException)`** — it covers `DbUpdateConcurrencyException` too.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The wording is yours. Replace the `?` with `DbUpdateException`.

```csharp
try
{
    registry.Save(db);
}
catch (?)
{
    Console.WriteLine("A record this run was holding has gone from its table, so nothing was saved.");
    Console.WriteLine("Run the program again to pick up from what's there.");
    return;
}
```

</details>

**It needs a using line, as the very first line of `Program.cs`**, with a blank line under it. Everything else in the file goes below it:

```csharp
using Microsoft.EntityFrameworkCore;
```

**2. `CanConnect`.** In `Project/Program.cs`, directly under the line that makes your `ProjectContext`, before anything touches the database: **`if (!db.Database.CanConnect())`**, a sentence saying what's wrong, then **`return;`**

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The wording is yours. Replace the `?` with `db.Database.CanConnect()`, with a `!` in front.

```csharp
if (?)
{
    Console.WriteLine("The program can't reach its database, so it stopped here.");
    Console.WriteLine("Check your network and your connection string, then run it again.");
    return;
}
```

</details>

**Turn your wifi off and run your program.** It waits about fifteen seconds, then prints your sentence. **Turn your wifi back on**, and run it once more.

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

**5 / 5.**

```bash
git add .
git commit -m "The program stops in a sentence"
```

📖 *Further reading:* [stop](lecture-notes.md#stop).

---

## Part 3 — The pull request

```bash
git push -u origin four-answers
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

Six moments worth saving, written into the parts above: the checks copied in, asking again, the catches, the fact while it's red, the fix, and the stop. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-12 still hold — everything check 1 covered last week, plus last week's: each record has many details, they come back, and the database answers |
| 2 | RegistryDesk.Remove asks again on a name nobody has, and Enter gives up |
| 3 | Registry.Import says how many were new; RegistryDesk.Import asks again on a wrong path and says no to a damaged file, with no crash |
| 2 | Registry.Import throws InvalidDataException on a blank name, and a bad file adds nothing |
| 1 | The program asks CanConnect before it starts, and catches DbUpdateException around its save |
| 2 | Your test: a file with a blank name throws and adds nothing — written by you, before the fix, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The project compiles from a clean clone — it cannot be RUN anywhere but your own machine, because your connection string is not in the repo |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The two points for your program are still for building it, not running it**, the same as last week. Your program needs your connection string to run, and that is correctly not in your repo. **Your code is still run**: my checks drive your registry and your `RegistryDesk`, typing at it the way a person would, and your own suite runs exactly as you wrote it. **Check 5 reads your source**, because nothing can call the top of a program.

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| The first check is called `Check1_WeeksFourToElevenStillHold` | You're running **week 12's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) removes them and copies this week's in — run the `rm` and the `cp`, both. |
| `CS1525`, `CS1003`, `CS1031` or `CS0839` near a `?` | A `?` from a shape is still there: `if (?)` gives `CS1525: Invalid expression term '?'`, `catch (?)` gives `CS1031: Type expected`, and `Assert.Equal(?, …)` gives `CS0839: Argument missing`. The line above each shape says what goes in its place. |
| `No file at "delivery.json"` when the file is there | It's inside the `Project` folder. Move it to the top of your project repo, beside `Project` and `Project.Checks`. |
| `CS0246` … `'JsonException'` | `using System.Text.Json;` is missing from the top of `RegistryDesk.cs`. |
| `CS0103: The name 'JsonSerializer' does not exist` | `using System.Text.Json;` is missing from the top of `Registry.cs`. |
| `CS0246` … `'DbUpdateException'` | `using Microsoft.EntityFrameworkCore;` is missing from the top of `Program.cs`. |
| `CS1529: A using clause must precede all other elements` | Your `using` isn't the first thing in `Program.cs`. It goes above everything except comments. |
| Check 2 red: *I can't find a class called RegistryDesk* | `Project/RegistryDesk.cs`. Task 1. |
| Check 2 red: *no public static method* | The name, the `static` and the one parameter are all dictated: `public static void Remove(Registry registry)`. |
| Check 2 red: *still going after ten seconds* | Your loop doesn't leave when the input ends. `if (string.IsNullOrWhiteSpace(typed))`, then `return;`, right after `ReadLine`. |
| Check 2 red: *stopped listening* | No `while (true)` yet, or a `return` after the *nothing by that name* line. |
| Check 3 red: *no public method called Import* | Task 2, step 1. It goes on `Registry`, and takes one `string`. |
| Check 3 red: *should say 2* | `Import` hands back how many were NEW. `Count - before`. |
| Check 3 red: *crashed with FileNotFoundException* | No `catch (IOException)` yet, or the `try` doesn't reach `registry.Import`. |
| Check 3 red: *a damaged file, then a good one* | `catch (JsonException)` has no `return;`, so it asked again. |
| Check 4 red: *threw nothing* | The checking `foreach`, and the `throw`. Task 3. |
| Check 4 red: *got on file ahead of the blank name* | Your `throw` is in the adding loop. One loop checks every name; a second one adds. |
| Check 4 red: *crashed with InvalidDataException* | `Import` is right. `RegistryDesk.Import` needs its third `catch`. |
| Check 5 red | The message names which of the two is missing. Task 4. |
| `The ConnectionString property has not been initialized.` | No connection string found. **`dotnet user-secrets list --project Project`** says what is in the store. |
| `Login failed for user` | Wrong login or password. Run [week 10's Task 1c](../week-10/homework.md#task-1-in-full) `set` again; `set` replaces. |
| A wrong password takes about a minute to print your sentence | That's `CanConnect` trying again before it gives up. It's working. |
| My checks pass and your program can't connect | **That is exactly right.** My checks never touch the server. Only running your program tests your connection string. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week13_ABadFileAddsNothing`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b four-answers`, push that. |
| An error that isn't in this table | [The notes' troubleshooting list](lecture-notes.md#-troubleshooting) has more of them. |

**Prev:** [Week 13 Lab — The Delivery](lab/README.md) · **Next:** Week 14 *(coming)*
