# Week 9 Homework — Three Questions 🔎

**20 points · due before next class**

> [!NOTE]
> **Back to a normal week.** Last week's was the term's only two-week homework, because fall break sat in the middle of it. This one is set today and due before the next class.

Your registry has held records since week 4 and remembered them since week 8. It still cannot answer a single question about them.

Tonight it gets three, and [each one is a line](lecture-notes.md#one-shape-and-it-does-not-change): **just the names**, **in order**, and **the ones that match**. If the `=>` is new to you, [read one out loud before you write one](lecture-notes.md#reading-a-lambda-out-loud) — it is the only new syntax this week, and [the whole vocabulary fits in one table](lecture-notes.md#the-words-you-need-tonight). Their signatures are part of the deal the way every dictated name has been since week 4:

```csharp
public List<string> Names()
public List<YourRecord> Sorted()
public List<YourRecord> Matching(string term)
```

Then one fact of your own, and it is a different kind of fact from the five already in your suite: **it gives permission rather than catching something.**

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

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

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-09/Project.Checks .
```

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched.

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **four** checks, and check 1 is called `Check1_WeeksFourToEightStillHold`. If you see a different first name, you are running last week's.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 4.** The green one is check 1 — weeks 4 through 8, still holding. The other three are tonight's.

---

## Part 2 — The code

**Two suites this week, so two counts:**

- **Mine:** `dotnet test Project.Checks` — climbs **1 → 2 → 3 → 4**.
- **Yours:** `dotnet test Project.Tests` — **5 facts** now, 6 by the end.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToEightStillHold` | mine | **Nothing to write.** Green before you start — and [it is doing something new this week](#the-invitation-and-nothing-grades-it). |
| 2 | `Check2_TheRegistryHandsBackItsNames` | mine | `Names()`. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_TheRegistryComesBackInOrder` | mine | `Sorted()`. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_TheRegistryFindsEveryMatch` | mine | `Matching(term)`. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `Week9_FindComesBackEmptyHanded` | **yours** | One fact, in your own suite. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **Row 5's name is dictated exactly as spelled**, the way `Week8_TheRegistrySurvivesARestart` was — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

> [!NOTE]
> **The name carries the week, not a check number.** That changed in week 8 and it holds from here: your suite is permanent and grows every week, and check numbers restart annually. [Week 7's four `CheckN_` facts stay exactly as they are.](../week-08/homework.md#task-5-in-full)

### Task 2 in full

**Just the names.**

**Check:** `Check2_TheRegistryHandsBackItsNames` — *mine*

**1. Add the member.** In `Project/Registry.cs`, and the signature is dictated:

```csharp
public List<string> Names()
```

**2. One line inside it**, and [the notes work the shape through](lecture-notes.md#select--turning-each-one-into-something-else):

- `_items.Select(item => item.Name).ToList()` — swap `Name` for whatever your own name property is called. It is the one `NewItem` sets and `Find` matches on.
- **`Where` keeps SOME of the things. `Select` keeps all of them and changes what each one IS** — here, from one of your records into the one string on it. A `List<Lighthouse>` goes in and a `List<string>` comes out.

⚠️ **In the registry's own order**, which is the order records were added. Sorting is Task 3's job, and check 2 fails if you do it here.

**3. Run mine:**

```bash
dotnet test Project.Checks
```

**2 / 4.**

```bash
git add .
git commit -m "The registry hands back its names"
```

---

### Task 3 in full

**In order.**

**Check:** `Check3_TheRegistryComesBackInOrder` — *mine*

**1. Add the member**, dictated the same way:

```csharp
public List<YourRecord> Sorted()
```

**2. One line**, and it is [`OrderBy`](lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone) over your name property, with [`.ToList()`](lecture-notes.md#tolist-and-why-every-query-here-ends-with-it) on the end.

> [!CAUTION]
> **This is the week's trap and it is worth two minutes.** `OrderBy` sorts a **copy** and hands the copy back. `List<T>.Sort` does not — it rearranges the list it was given.
>
> Reach for `Sort` here and **your registry itself comes out in a different order than records went in**, which means your `Save` writes the file in the new order too. Nothing tells you. **Check 3 tests for exactly this**, and it is the only part of tonight you cannot see by running your program.

**3. Run mine:**

```bash
dotnet test Project.Checks
```

**3 / 4.**

```bash
git add .
git commit -m "And it comes back in order"
```

---

### Task 4 in full

**The ones that match.**

**Check:** `Check4_TheRegistryFindsEveryMatch` — *mine*

**1. Add the member**, dictated:

```csharp
public List<YourRecord> Matching(string term)
```

**2. One line** — [a `Where`](lecture-notes.md#where--keeping-some-of-them), and the question is whether the record's name **contains** the term:

- [`item.Name.Contains(term)`](lecture-notes.md#where--keeping-some-of-them) — **`Contains`, not `StartsWith`.** "Sable Point Light" has *Point* in the middle of it, and a search that only looks at the front misses it.
- **In the registry's own order.** [`Where` does not reorder anything.](lecture-notes.md#where--keeping-some-of-them)
- **A term nothing matches gives an empty list** — not `null`, and not an error. You do not have to write that; it is what `Where` already does, and [it is the opposite of what `First` would do](lecture-notes.md#on-an-empty-sequence).

**3. Run mine:**

```bash
dotnet test Project.Checks
```

**4 / 4.**

```bash
git add .
git commit -m "And it finds every match"
```

---

### Task 5 in full

**Your own fact, and it is the first one that gives permission.**

**Check:** `Week9_FindComesBackEmptyHanded` — *yours*

Every fact in your suite so far was written to **catch** something. This one is written so that you can **change** something.

**In `Project.Tests/RegistryTests.cs`, under the five you already have.** Two asserts, and the second is the one that matters:

- **Set the scene.** A registry, one record, added.
- **`Find` the record by the name you gave it** — and `Assert.Same` that you got back the record the registry is holding, not a copy.
- **Then `Find` a name nobody has**, and `Assert.Null` the answer. **That is half of what `Find` is for.**

**Run yours:**

```bash
dotnet test Project.Tests
```

**6 passed** — five from before, and this one.

**It went green immediately, and that is not a mistake.** It describes code that already works.

**So make it fail once, and this time the falsification IS the lesson.** In `Registry.cs`, change `Find`'s `FirstOrDefault` to `First` — just `First`, no `OrDefault` — and run your suite again:

```bash
dotnet test Project.Tests
```

```
System.InvalidOperationException : Sequence contains no matching element
```

**Read that.** [`First` objects to finding nothing](lecture-notes.md#on-an-empty-sequence); `FirstOrDefault` hands back `null`. Your loop could never have done that — it walked, found nothing, and fell out of the bottom to a `return null;`. **Put it back**, and now the green means something.

```bash
git add .
git commit -m "Find comes back empty-handed: my own fact"
```

---

### The invitation, and nothing grades it

**Your `Registry` still has loops in it**, and you now know what most of them are:

- **`Find`** — a `foreach` that walks and returns. That is [`FirstOrDefault`](lecture-notes.md#firstordefault--the-one-or-nothing-at-all), and you just watched what happens if you pick the wrong word.
- **`Load`** — a `foreach` that fills one list from another. That is `AddRange`, and ⚠️ **the `Clear()` above it stays.**
- **`Everything()`** — and this one **should stay a loop.** There is a LINQ spelling of it and [it reads worse](lecture-notes.md#what-should-stay-a-loop). A one-liner is not the goal.
- ⚠️ **And if your `Program.cs` has a loop that CHANGES something on each record**, leave that alone too — [a query asks, and a lambda that does something is not a question](lecture-notes.md#select--turning-each-one-into-something-else).

**Nothing scores this either way, and I am telling you that rather than pretending otherwise** — a collapsed `Find` and a `foreach` behave identically, so no check can tell them apart. **What check 1 can tell you is whether you broke anything**, which is the only reason it is safe to try. Run it before and after:

```bash
dotnet test Project.Checks
```

---

## Part 3 — Show it in the program

The checks never look at `Program.cs`, and a registry that can answer questions should be seen answering them.

Open `Project/Program.cs` and put this at the end, after your listing loop and after `registry.Save(...)`:

```csharp
Console.WriteLine();
Console.WriteLine("In order:");

foreach (var record in registry.Sorted())
{
    Console.WriteLine($"  {record.Name}");
}

Console.WriteLine();
Console.WriteLine($"On the books, as they arrived: {string.Join(", ", registry.Names())}");

Console.Write("Search (a word, or Enter to skip): ");
string? term = Console.ReadLine();

if (!string.IsNullOrWhiteSpace(term))
{
    var found = registry.Matching(term.Trim());

    Console.WriteLine(found.Count == 0
        ? $"  Nothing on file with \"{term.Trim()}\" in it."
        : $"  {found.Count} match(es).");
}
```

⚠️ **Swap `record.Name` for your own record's name property**, and `var` is doing real work in the first line — it is whatever type your `Sorted()` hands back.

**Run it and read the two lists against each other:**

```bash
dotnet run --project Project
```

**They hold the same records in different orders**, and the second one is the order your file is written in. That is [`OrderBy` handing back a copy](lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone), working — and [it is why every one of these ends with `.ToList()`](lecture-notes.md#tolist-and-why-every-query-here-ends-with-it).

```bash
git add .
git commit -m "The program asks its own registry three questions"
```

---

## Part 4 — The pull request

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

Five moments worth saving, written into the parts above at the point where each thing starts working — the names, the order, the search, your own fact, and the program. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-8 still hold — Topic, no public fields, All() copies, Find and Remove behave (including the empty-handed answer), IListed kept by record and registry, Everything() intact, Add refuses a duplicate, and Save/Load still round-trip |
| 2 | Names() hands back one name per record, in the order they were added |
| 4 | Sorted() hands back every record in order by name — and leaves the registry's own order alone |
| 2 | Matching(term) hands back every record whose name contains the term, in order, and an empty list when none do |
| 2 | Your test: Find hands back the record it holds, and null for a name nobody has — written by you, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
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
| **Two or three checks listed**, not four | You're running an earlier week's. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) copies this week's in — this week lists four, starting `Check1_WeeksFourToEightStillHold`. |
| `CS1061: does not contain a definition for 'Select'` | `using System.Linq;` is missing from `Registry.cs`. It ships via implicit usings, so something at the top of the file got deleted. |
| `CS0029: cannot convert 'IEnumerable<...>' to 'List<...>'` | The `.ToList()` on the end is missing. [It is what turns a recipe into an answer](lecture-notes.md#a-query-is-a-recipe-not-an-answer), and the dictated return types are all `List`. |
| `CS1503: cannot convert from 'method group'` | You wrote `Select(item.Name)` instead of `Select(item => item.Name)`. The `=>` is not optional. |
| Check 1 red: *Add threw InvalidOperationException* | You rewrote `Find` with `First()`. On an **empty** registry it throws, and `Add` asks `Find` first — so it dies on your very first record. [`FirstOrDefault`.](lecture-notes.md#on-an-empty-sequence) |
| Check 1 red: *a registry already holding 3 … now holds 6* | `Load`'s `foreach` became `AddRange` and the `Clear()` went with it. Put it back above. |
| Check 1 red, naming an older week | Something older broke, and the message names which week's rule. Check 1 doing its job. |
| Check 2 red: *gave the whole line* | `Select` is handing back `Line()` rather than the one name property. |
| Check 2 red: *gave them in order* | There is an `OrderBy` in `Names()`. It hands them back in the registry's own order; sorting is check 3's. |
| Check 3 red: *That is the first record ADDED* | Nothing sorted — `Sorted()` is handing back what `All()` would. |
| Check 3 red: *That is LAST alphabetically* | `OrderByDescending`. `OrderBy` is the one that starts at A. |
| Check 3 red: ***Sorting the registry SORTED THE REGISTRY*** | `List.Sort` instead of `OrderBy`. [The whole trap, in one message.](lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone) |
| Check 4 red: *handed back 1 … should hand back 2* | `StartsWith` instead of `Contains`. |
| Check 4 red: *hands back a `IEnumerable<…>`* | No `.ToList()`, so the method's return type is wrong. |
| `NullReferenceException` after a `MaxBy` or `MinBy` | They hand back `null` for an empty list. [`?.` in front, `??` behind.](lecture-notes.md#on-an-empty-sequence) |
| `Average` threw and `Sum` didn't | [The average of no numbers is not zero.](lecture-notes.md#sum-count-and-average--one-number-out-of-many) |
| You want *"is there at least one…"* and reached for `Where` | [`Any` answers yes or no in one word.](lecture-notes.md#any--a-yes-or-a-no) |
| You want *"the top three"* | [`OrderByDescending`, then `Take`.](lecture-notes.md#take--stop-after-n) |
| Your registry is small and you wonder when it stops being small | [The demo measured exactly that](lecture-notes.md#querying-a-file-and-what-it-costs), and [the bill is why week 10 exists](lecture-notes.md#and-then-the-bill). |
| Your fact name doesn't match the table | The grader reads it **exactly** — `Week9_FindComesBackEmptyHanded`, on a `public void` method taking nothing. |
| Your fact passes and you don't believe it | Good. [Make it fail once](#task-5-in-full) — swap `FirstOrDefault` for `First` and watch it throw. |
| A search finds nothing and you can see the record | Compare exactly what you typed with exactly what is stored. String comparison is exact — **and if you're wondering whether it should be, hold that thought; it is a database-week conversation.** |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| A value isn't what you think it is | **Set a breakpoint and look** — [week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for). ⚠️ A query in the Watch panel **runs** when the panel evaluates it. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b three-questions`, push that. |

**Prev:** [Week 9 Lab — The Night's Numbers](lab/) · **Next:** Week 10 — the list moves into a real database *(coming)*
