# Week 9 Homework — Three Questions 🔎

**20 points · due before next class**

> [!NOTE]
> **A normal week.** Set in one class and due before the next one.

Your registry has held records since week 4 and remembered them since week 8. It still can't answer a question about them.

**This homework is the lab again, on your own project.** Same four tasks, same order, same steps. Where the lab said `Rotation`, `Song` and `_songs`, you use your `Registry`, your record type, and the list inside your `Registry`. If you finished the lab, you have already done every step once.

Three new members, and their signatures are part of the deal the way every dictated name has been since week 4:

```csharp
public List<YourRecord> Matching(string term)
public List<string> Names()
public List<YourRecord> Sorted()
```

`YourRecord` is your own record type — the class your `NewItem` hands back.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Each task below is the lab task with the same number. Every task also has a **Stuck? Show me the shape** box, written with placeholder names like `YourRecord` — swap in your own names before it will build.

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then week 4 is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, and weeks [5](../week-05/homework.md), [6](../week-06/homework.md), [7](../week-07/homework.md) and [8](../week-08/homework.md) add what this week's check 1 re-verifies. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b three-questions
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
cp -r ../dotnet-db-starters/project/week-09/Project.Checks .
```

⚠️ **Don't skip the `rm`.** Copying over the top of the old folder is not enough: on Windows the copied files keep their old dates, `dotnet` decides nothing has changed, and it runs **last week's** checks again without telling you.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds four checks, and the first is called `Check1_WeeksFourToEightStillHold`. If yours is called `Check1_WeeksFourToSevenStillHold`, you are running **week 8's** — come back and run the `rm` and the `cp` above, both of them.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 4.** The green one is check 1 — weeks 4 through 8, still holding. The other three are this week's three questions.

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 9: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — **1** through Task 1, then **2, 3, 4**.
- **Yours:** `dotnet test Project.Tests` — the suite you have been growing since week 7. It has **5 facts** in it now and gains one at Task 1.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToEightStillHold` | mine | Already green, and it has to stay green while you rewrite `Find` and `Load`. **[Task 1 in full ↓](#task-1-in-full)** |
| 1 | `Week9_FindComesBackEmptyHanded` | **yours** | Your own fact about `Find`, written first. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check2_TheRegistryFindsEveryMatch` | mine | Write `Matching`, and call it. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_TheRegistryHandsBackItsNames` | mine | Write `Names`, and call it. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_TheRegistryComesBackInOrder` | mine | Write `Sorted`, and call it. **[Task 4 in full ↓](#task-4-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Week8_TheRegistrySurvivesARestart` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

**A fact first, then two loops become one line each.**

**Checks:** `Check1_WeeksFourToEightStillHold` — *mine, already green* · `Week9_FindComesBackEmptyHanded` — *yours*

This is the lab's Task 1. **Nothing goes from red to green.** You change two pieces of code that work, and my count stays at 1 / 4. Your own suite is how you know nothing broke.

**First, see where both suites start.** Mine:

```bash
dotnet test Project.Checks
```

**1 / 4.** Yours:

```bash
dotnet test Project.Tests
```

**5 passed.**

#### First, the fact — before you touch `Find`

**Write it in `Project.Tests/RegistryTests.cs`, under the five you already have.** The name is dictated: `Week9_FindComesBackEmptyHanded`. The moves are the lab's:

- **Set the scene.** A `Registry`, and one record from `NewItem("a name of yours")`, kept in a variable and added to the registry.
- **Check the record that is there.** `Assert.Same(expected, actual)` passes only when both are the **same object**. Expected is your record variable. Actual is `registry.Find("a name of yours")` — the same name you gave `NewItem`.
- **Check the name nobody has.** `Assert.Null(registry.Find("a name nobody has"))`.

| In the lab | In yours |
|---|---|
| `Rotation` | `Registry` |
| `Song nightjar = new Song(...)` | a record from `NewItem` — its type is written `YourRecord` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord` for your record type, and both names for names of your own, or it will not build.

```csharp
    [Fact]
    public void Week9_FindComesBackEmptyHanded()
    {
        Registry registry = new Registry();
        YourRecord item = registry.NewItem("a name of yours");
        registry.Add(item);

        Assert.Same(item, registry.Find("a name of yours"));
        Assert.Null(registry.Find("a name nobody has"));
    }
```

</details>

**Run yours:**

```bash
dotnet test Project.Tests
```

**6 passed.** It went green the first time, **and that is not a mistake.** `Find` already works, so a fact about `Find` passes. It is there so you can change `Find` and know you didn't break it.

#### Now make `Find` one line

**In `Project/Registry.cs`.** Your `Find` is a `foreach` that walks your list, hands back the record whose name matches, and hands back `null` at the end. Keep its first line exactly as it is. Replace the loop **and** the `return null;` under it with one `return` line:

- **`FirstOrDefault(question)`**, called on the list inside your `Registry`, hands back the first record the question is true for. If it is true for none of them, it hands back `null`.
- **The question** is asked of one record at a time: `item => item.YourNameProperty == name`. `item` is a name you pick. `YourNameProperty` is the property `NewItem` puts the name into. `name` is whatever your `Find`'s parameter is called.

| In the lab | In yours |
|---|---|
| `_songs` | the list inside your `Registry` — written `_yourList` below |
| `song.Title` | your record's name property — written `YourNameProperty` below |
| `title` | your `Find`'s parameter — written `name` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `_yourList` and `YourNameProperty` for your own names, or it will not build.

```csharp
    public YourRecord? Find(string name)
    {
        return _yourList.FirstOrDefault(item => item.YourNameProperty == name);
    }
```

</details>

💡 **Is your `Find` already one line?** Then there is nothing to rewrite. Do *Make it fail once* below anyway, and carry on to `Load`.

**Run your program**, and check it prints what it printed before:

```bash
dotnet run --project Project
```

**Then yours:**

```bash
dotnet test Project.Tests
```

**6 passed.** Then mine:

```bash
dotnet test Project.Checks
```

**1 / 4 — exactly where you started.**

#### Make it fail once

**In your new line, change `FirstOrDefault` to `First`**, and run your suite:

```bash
dotnet test Project.Tests
```

```
   System.InvalidOperationException : Sequence contains no matching element
```

**Red — and probably more than one fact.** `First` does not hand back `null` when it finds nothing. It throws. Your new fact asks for a name nobody has, so it goes red. If your `Add` asks `Find` first, the way week 7's guard does, then **every fact that adds a record goes red too**, because the first record always goes into an empty registry.

**Now run your program:**

```bash
dotnet run --project Project
```

```
Unhandled exception. System.InvalidOperationException: Sequence contains no matching element
```

**If your `Add` asks `Find` first, it crashes on its very first record.** The loop could never do that. *(If your program ran, your `Add` doesn't use `Find`; your fact still caught the change.)* **Put `FirstOrDefault` back**, and run your suite again:

```bash
dotnet test Project.Tests
```

**6 passed.**

#### And the loop at the bottom of `Load`

**In `Project/Registry.cs`, at the bottom of `Load`.** The `foreach` there puts every loaded record into your list, one at a time. Replace that loop with one call:

- **`AddRange(loaded)`**, called on the list inside your `Registry`, adds every item of another list at once.
- ⚠️ **The `Clear()` above it stays.** Loading replaces what the registry holds.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `_yourList` for the list inside your `Registry`, or it will not build.

```csharp
        _yourList.Clear();

        _yourList.AddRange(loaded);
    }
```

</details>

**Run your program twice:**

```bash
dotnet run --project Project
```

```bash
dotnet run --project Project
```

**The same number of records both times.** If the second run has twice as many, the `Clear()` is gone.

**Then yours:**

```bash
dotnet test Project.Tests
```

**6 passed.** Your week 8 fact saves a registry and loads it into a second one, so it is the fact watching `Load`.

**Then mine:**

```bash
dotnet test Project.Checks
```

**1 / 4.**

> [!NOTE]
> **Nothing grades the rewrite itself.** A loop and a `FirstOrDefault` behave the same way, so no check can tell them apart. What is graded is your fact (2 points) and check 1 staying green (2 points). Check 1 is what tells you a rewrite broke something.

💡 **`Everything()` stays a loop.** It builds a list out of two different kinds of things, and [the one-line version reads worse](lecture-notes.md#everything-and-the-one-liner-that-reads-worse). One line is not the goal.

```bash
git add .
git commit -m "Find and Load, one line each, and my fact about Find"
```

---

### Task 2 in full

**The ones that match.**

**Check:** `Check2_TheRegistryFindsEveryMatch` — *mine*

**Write `Matching` — in `Project/Registry.cs`.** The signature is dictated:

```csharp
public List<YourRecord> Matching(string term)
```

It hands back every record whose name has `term` somewhere inside it. One line, the lab's Task 2 with a different question:

- **`Where(question)`**, called on the list inside your `Registry`, keeps the records the question is true for, in the order it found them.
- **The question** answers yes or no for one record: does this record's name contain the term? `text.Contains(term)` answers that for a string.
- **`.ToList()`** on the end. `Where` does not hand back a list, and this method has to.
- ⚠️ **`Contains`, not `StartsWith`.** "Sable Point Light" has *Point* in the middle of it.

| In the lab | In yours |
|---|---|
| `List<Song>` | a list of your record type — written `List<YourRecord>` below |
| `_songs` | the list inside your `Registry` — written `_yourList` below |
| `song.Seconds > seconds` | does the name contain the term — your name property is written `YourNameProperty` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `_yourList` and `YourNameProperty` for your own names, or it will not build.

```csharp
    public List<YourRecord> Matching(string term)
    {
        return _yourList.Where(item => item.YourNameProperty.Contains(term)).ToList();
    }
```

</details>

**Now call it — in `Project/Program.cs`, at the very end of the file**, after the line that says how many records were saved:

```csharp
Console.WriteLine();
Console.Write("Search (a word, or Enter to skip): ");
string? term = Console.ReadLine();

if (!string.IsNullOrWhiteSpace(term))
{
    var found = registry.Matching(term.Trim());

    Console.WriteLine(found.Count == 0
        ? $"  Nothing on file with \"{term.Trim()}\" in it."
        : $"  {found.Count} on file with \"{term.Trim()}\" in it.");
}
```

**Run it**, and at the `Search` prompt type a word that is inside one of your records' names:

```bash
dotnet run --project Project
```

It says how many records have that word in them. Run it again and type a word none of them has: `Nothing on file with …`. Run it once more and just press Enter: it skips the search.

**Then mine:**

```bash
dotnet test Project.Checks
```

**2 / 4.**

```bash
git add .
git commit -m "The registry finds every match"
```

---

### Task 3 in full

**Just the names.**

**Check:** `Check3_TheRegistryHandsBackItsNames` — *mine*

**Write `Names` — in `Project/Registry.cs`.** The signature is dictated:

```csharp
public List<string> Names()
```

It hands back the name of every record. One line, the lab's Task 3:

- **`Select(question)`**, called on the list inside your `Registry`, keeps **every** record and hands back one thing about each.
- **The question** answers with the thing you want from each record. Here that is the record's name property. A list of your records goes in, and a list of strings comes out.
- **`.ToList()`** on the end.
- ⚠️ **In the registry's own order**, which is the order the records were added in. Putting them in order is Task 4, and check 3 fails if you do it here.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `_yourList` and `YourNameProperty` for your own names, or it will not build.

```csharp
    public List<string> Names()
    {
        return _yourList.Select(item => item.YourNameProperty).ToList();
    }
```

</details>

**Now call it — in `Project/Program.cs`, at the very end of the file**, under the search:

```csharp
Console.WriteLine();
Console.WriteLine($"On the books, as they arrived: {string.Join(", ", registry.Names())}");
```

**Run it** — press Enter at the `Search` prompt:

```bash
dotnet run --project Project
```

The last line lists every record's name, in the order you added them.

**Then mine:**

```bash
dotnet test Project.Checks
```

**3 / 4.**

```bash
git add .
git commit -m "The registry hands back its names"
```

---

### Task 4 in full

**In order — and the registry left alone.**

**Check:** `Check4_TheRegistryComesBackInOrder` — *mine*

**Write `Sorted` — in `Project/Registry.cs`.** The signature is dictated:

```csharp
public List<YourRecord> Sorted()
```

It hands back every record, in order by name. One line, the lab's Task 4:

- **`OrderBy(question)`**, called on the list inside your `Registry`, hands back the records in order, A to Z.
- **The question** answers with the thing to put them in order by: the record's name property.
- **`.ToList()`** on the end.

> [!CAUTION]
> **`OrderBy` builds a new list in sorted order and leaves your registry's list alone. `Sort`, called on your list, does not: it rearranges the registry itself.** Reach for `Sort` and your registry comes out in a different order than the records went in, and your `Save` writes the file in that new order. Nothing tells you. **Check 4 looks for exactly this, and it is worth 4 points.**

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord`, `_yourList` and `YourNameProperty` for your own names, or it will not build.

```csharp
    public List<YourRecord> Sorted()
    {
        return _yourList.OrderBy(item => item.YourNameProperty).ToList();
    }
```

</details>

**Now call it — in `Project/Program.cs`, at the very end of the file**, under the names:

```csharp
Console.WriteLine();
Console.WriteLine("In order:");

foreach (var record in registry.Sorted())
{
    Console.WriteLine($"  {record.YourNameProperty}");
}
```

⚠️ **Swap `YourNameProperty` for your record's name property**, or it will not build.

**Run it** — press Enter at the `Search` prompt:

```bash
dotnet run --project Project
```

**Read the last two lists against each other.** *As they arrived* and *In order* hold the same records in two different orders.

**Now check the file.** Open `registry.json`. The records are in the order they arrived, not in A-to-Z order. Asking for the records in order did not rewrite your file — the lab's Task 4, on your project.

**Then mine:**

```bash
dotnet test Project.Checks
```

**4 / 4.**

**And yours:**

```bash
dotnet test Project.Tests
```

**6 passed.**

```bash
git add .
git commit -m "And it comes back in order"
```

---

## Part 3 — The pull request

```bash
git push -u origin three-questions
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it**.

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

Five moments worth saving, written into the parts above at the point where each thing starts working — the checks copied in, then one for each of the four tasks. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-8 still hold — Topic, no public fields, All() copies, Find and Remove behave (including the empty-handed answer), IListed kept by record and registry, Everything() intact, Add refuses a duplicate, and Save/Load still round-trip |
| 2 | Your test: Find hands back the record it holds, and null for a name nobody has — written by you, green in your own suite |
| 2 | Matching(term) hands back every record whose name contains the term, in order, and an empty list when none do |
| 2 | Names() hands back one name per record, in the order they were added |
| 4 | Sorted() hands back every record in order by name — and leaves the registry's own order alone |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found with an Assert count, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| The first check is called `Check1_WeeksFourToSevenStillHold` | You're running **week 8's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) removes them and copies this week's in — run the `rm` and the `cp`, both. |
| `CS0246: The type or namespace name 'YourRecord' could not be found` | You pasted a **Stuck?** shape without swapping the placeholder. `YourRecord` is your record type's name — the class `NewItem` hands back. |
| `CS0103: The name '_yourList' does not exist in the current context` | Same thing: `_yourList` is the name of the list field inside your `Registry`. Open `Registry.cs` and use the name you gave it. |
| `CS1061` naming `YourNameProperty` | The shape, or the `Program.cs` lines from Task 4, still have that placeholder in them. It's the property your `NewItem` puts the name into. |
| `CS0266: Cannot implicitly convert type 'IEnumerable<…>' to 'List<…>'` | The `.ToList()` on the end is missing. `Where`, `Select` and `OrderBy` don't hand back a list, and all three dictated methods have to. |
| `CS0103: The name 'item' does not exist in the current context` | The question is missing its front half. `Select(item.YourNameProperty)` has to be `Select(item => item.YourNameProperty)`. |
| `InvalidOperationException: Sequence contains no matching element` | `First` where `FirstOrDefault` belongs. `First` throws when it finds nothing. |
| Check 1 red: *Add threw InvalidOperationException* | Your rewritten `Find` uses `First`. On an empty registry it throws, and `Add` asks `Find` first — so the very first record fails. [`FirstOrDefault`.](lecture-notes.md#firstordefault--the-one-or-nothing-at-all) |
| Check 1 red: *a registry already holding 3 … now holds 6* | `Load`'s loop became `AddRange` and the `Clear()` went with it. Put it back above. |
| Check 1 red, naming an older week | Something older broke, and the message names which week's rule. |
| Check 2 red: *handed back 1 … should hand back 2* | `StartsWith` instead of `Contains`. |
| Check 3 red: *gave them in order* | There is an `OrderBy` in `Names()`. It hands them back in the registry's own order; sorting is check 4's. |
| Check 3 red, and the names look like whole lines | `Select` is handing back `Line()` or the whole record rather than the one name property. |
| Check 4 red: *That is the first record ADDED* | Nothing sorted — `Sorted()` is handing back what `All()` would. |
| Check 4 red: *That is LAST alphabetically* | `OrderByDescending`. `OrderBy` is the one that starts at A. |
| Check 4 red: ***Sorting the registry SORTED THE REGISTRY*** | `Sort` instead of `OrderBy`. [The whole trap, in one message.](lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone) Fix the line, then delete `registry.json` — the wrong order is saved in it. |
| Your records show up twice | `Load` lost its `Clear()`. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week9_FindComesBackEmptyHanded`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| Your fact is red before you've changed anything | The name you ask `Find` for has to be spelled exactly like the name you gave `NewItem`, capital letters included. |
| A search finds nothing and you can see the record | Compare exactly what you typed with exactly what is stored. The comparison is exact, capital letters included. **If you're wondering whether it should be, hold that thought: it's a database-week conversation.** |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| A value isn't what you think it is | **Set a breakpoint and look** — [week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for). |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b three-questions`, push that. |

📖 *Further reading, all of it optional:* [one shape, read out loud](lecture-notes.md#one-shape-and-it-does-not-change) · [`Where`](lecture-notes.md#where--keeping-some-of-them) · [`Select`](lecture-notes.md#select--turning-each-one-into-something-else) · [`OrderBy`, and the list left alone](lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone) · [a fact about nothing being there](lecture-notes.md#writing-a-fact-about-nothing-being-there).

**Prev:** [Week 9 Lab — The Night's Numbers](lab/) · **Next:** [Week 10 — EF Core I: The Log Leaves the Building](../week-10/)
