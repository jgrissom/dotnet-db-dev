# Week 6 Homework — Two Kinds of Row 🗂️

**20 points · due before next class**

Your project prints a list, and every row on it is one of your records. That has been fine, because there has only ever been one kind of thing to print.

This week the listing gets a **heading** — and a heading is a row too. Two completely different classes, one list, one loop, and [neither of them is a kind of the other](lecture-notes.md#one-parent-as-many-promises-as-you-like).

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

> [!NOTE]
> **Nothing you wrote in weeks 4 or 5 changes.** `Registry` gains three members and your record gains two. The eight names you already have are spelled exactly as they were and always will be.

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then week 4 is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, in about ten minutes, and [week 5's](../week-05/homework.md) gives you the `Find` and `Remove` that check 5 looks for. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b the-promise
```

**Then bring in this week's checks.** They ship in the starters clone and **they are different every week** — last week's cannot see a single thing you write tonight. Pull the clone first:

```bash
git -C ../dotnet-db-starters pull
```

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-06/Project.Checks .
```

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** Last week's checks report **5 / 5** before you have written a line tonight — because they are testing last week's work, and passing. If `dotnet test` says 5 / 5 at the end of Tasks 1 and 2 instead of 3 / 5, you are running the wrong checks: come back and run the two commands above.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 5.** The one that's green is check 1 — weeks 4 and 5, still holding, and it stays green every week from here.

---

## Part 2 — The code

**Run both after every task, in this order** — the program tells you whether it's *alive*, the checks tell you whether it's *right*, and **the checks never look at `Program.cs`**, which is exactly where the "builds and runs" points live.

| # | Check | What to do |
|---|---|---|
| 1 | `WeeksFourAndFiveStillHold` | **Nothing to write.** It re-checks weeks 4 and 5 and is green before you start — every week from here. |
| 2 | `YourRecordKeepsThePromise` | Your record declares `IListed` and keeps it. **[Tasks 2 and 3 in full ↓](#tasks-2-and-3-in-full)** |
| 3 | `EachRecordWritesItsOwnLine` | …and two records write two different lines — **same task.** **[Tasks 2 and 3 in full ↓](#tasks-2-and-3-in-full)** |
| 4 | `TheRegistryKeepsItToo` | A registry is not a kind of record, and goes on the list anyway. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `OneListHoldsThemBoth` | `Everything()` hands back one list holding both. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **The task numbers are check numbers**, so the number you finish is the number you see. **Check 1 is green before you start** — it re-checks weeks 4 and 5 — and Tasks 2 and 3 are one piece of work, because declaring the promise and keeping it go together. Your count runs **1 → 3 → 4 → 5**.

### Tasks 2 and 3 in full

**The promise, and your record keeps it.**

**Checks:** `Check2_YourRecordKeepsThePromise` and `Check3_EachRecordWritesItsOwnLine`

**The interface, and its shape is dictated** — the checks read it, so it is not up to you:

```csharp
public interface IListed
{
    string Kind { get; }
    string Line();
}
```

Put it in **`Project/IListed.cs`**. ⚠️ **Three parts of that matter:**

- **`IListed`**, spelled exactly that way, capital `I`.
- **`interface`, not `class`.** [There is nothing in there to make](lecture-notes.md#an-interface-is-a-promise) — no bodies, and a `;` where a method's body would go.
- **`public`**, or nothing outside your program can see it, including the checks.

**Then your record keeps it.** One phrase after the class name — `public class Lighthouse : IListed`, with your record's name — and then the two members:

- **`Kind`** — one word for the left-hand column. What one of your records *is*, in a word: `LIGHTHOUSE`, `PAYPHONE`, `TRAIN`.
- **`Line()`** — the rest of the row, and [`object` would not have given you one](lecture-notes.md#object-holds-anything-and-promises-nothing). The facts this record is the authority on, in whatever words and whatever order you like. ⚠️ **It has to name the record it is about** — read the property `NewItem` put the name into, [the same one `Find` compares against](../week-05/lecture-notes.md#finding-one-or-not-finding-one). A line on a listing that doesn't say which thing it's about is a line nobody can use.

> [!IMPORTANT]
> **Nothing else in your record changes.** Not the private fields, not the validating setters from week 4, not the `private set` and the verb from week 5. [Keeping a promise is additive](lecture-notes.md#keeping-a-promise) — you are adding two members to the bottom of a class that already worked.

#### Write it in two goes, so you can watch it fail

**1. Make the promise, and answer it badly.** This compiles, and it is wrong on purpose:

```csharp
public string Kind => "?";

public string Line() => "";
```

> [!TIP]
> **Type `: IListed` and build before you write either of them.** [The compiler answers with one `CS0535` per member you still owe](lecture-notes.md#keeping-a-promise), which is a to-do list rather than a telling-off. Get used to that — it is the fastest way to keep any promise in C#.

**2. Give `Program.cs` something to print.** Paste this on the end of the file — **swap `Thing` for your record's type**:

```csharp
Console.WriteLine();

foreach (Thing item in registry.All())
{
    Console.WriteLine($"{item.Kind,-12}{item.Line()}");
}
```

**3. Run it:**

```bash
dotnet run --project Project
```

```
?
?
?
```

**One row per record and not a word between them.** The promise is kept — the compiler is satisfied, the program runs — and the answers are worthless. That is worth ten seconds: **a promise is about the shape, and the shape being right is not the same as the answer being right.**

**4. Now write the real ones**, and run the *same* lines again:

```bash
dotnet run --project Project
```

```
LIGHTHOUSE  Bodie Island - 156ft - visited 0x
LIGHTHOUSE  Cape Hatteras - 210ft - visited 0x
LIGHTHOUSE  Currituck Beach - 162ft - visited 0x
```

**5. Then the checks:**

```bash
dotnet test Project.Checks
```

**3 / 5 — checks 1, 2 and 3.** Checks 4 and 5 are still ahead of you.

```bash
git add .
git commit -m "The records know how to be listed"
```

---

### Task 4 in full

**And so does the registry.**

**Check:** `Check4_TheRegistryKeepsItToo`

Here is the part that is worth the week.

**`Registry` keeps the same promise.** Not your record — the registry itself:

```csharp
public class Registry : IListed
```

⚠️ **Be clear about what that is not saying.** A registry is **not** a kind of record. It is not a lighthouse, a payphone or a claw machine, and it never will be — one of them holds the things, the other one *is* one of the things. [It goes on the same listing anyway](lecture-notes.md#a-promise-is-not-a-parent), because the listing only ever asks two questions and both classes can answer them.

**That is the whole idea of an interface**, and it is the thing a base class could never do for you.

Two members, at the bottom of `Registry`:

- **`Kind`** — a different word from your record's. `REGISTRY`, `THE LIST`, `LOGBOOK` — yours, but not the same one.
- **`Line()`** — the heading. The registry is the one object in your program that knows what to put there: what the project is about, and how many are on file. [`Topic` and `Count` have both been sitting there since week 4](../week-04/lecture-notes.md#the-one-class-whose-shape-isnt-up-to-you).

**Run it.** Add this one line to the end of `Program.cs` for now:

```csharp
Console.WriteLine($"{registry.Kind,-12}{registry.Line()}");
```

```bash
dotnet run --project Project
```

```
REGISTRY    Lighthouses of the Outer Banks - 3 on file
```

**Then the checks:**

```bash
dotnet test Project.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.** Only check 5 left.

```bash
git add .
git commit -m "The registry writes its own heading"
```

---

### Task 5 in full

**One list, both kinds.**

**Check:** `Check5_OneListHoldsThemBoth`

**The dictated member, and it is the last one this week:**

```csharp
public List<IListed> Everything()
```

- **`List<IListed>`, not a list of your records.** That type in the angle brackets is the point of the whole exercise: it will hold your records *and* your registry, because the only thing it asks of anything is whether the promise is kept.
- It hands back **the registry's own line, and every record the registry is actually holding** — the records themselves, not copies of them.
- **`this` is the registry the method is running on.** You have seen the word before: [it was at the top of the Variables pane last week](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) when the debugger stopped inside a constructor.

[**The worked version is in the notes**](lecture-notes.md#everything-the-registry-has-to-show) — six lines, and mine is lighthouses.

**Then one loop prints the lot.** Replace the two scratch blocks you pasted in Parts 2 and 3 with this — **the only thing to change is nothing at all**, because it never names one of your types:

```csharp
Console.WriteLine();

foreach (IListed thing in registry.Everything())
{
    Console.WriteLine($"{thing.Kind,-12}{thing.Line()}");
}
```

```bash
dotnet run --project Project
```

```
REGISTRY    Lighthouses of the Outer Banks - 3 on file
LIGHTHOUSE  Bodie Island - 156ft - visited 0x
LIGHTHOUSE  Cape Hatteras - 210ft - visited 0x
LIGHTHOUSE  Currituck Beach - 162ft - visited 0x
```

**Two classes went through that loop and it cannot name either of them.** [That is polymorphism](lecture-notes.md#one-list-one-loop), and it is not a big word for a big idea — it is that `foreach`.

**Then the checks:**

```bash
dotnet test Project.Checks
```

**5 / 5.**

```bash
git add .
git commit -m "One list holds them both"
```

---

## Part 3 — A `Program.cs` that shows it

You have been bolting scratch lines onto the end of `Program.cs` for three parts now, and they have done their job. **This replaces all of them with the tidy version.**

Select the whole of `Project/Program.cs` (`⌘A`), paste this over, then make it yours: your record's name, your own facts, your own wording.

```csharp
// Project/Program.cs — swap Thing for your record's name, and Visit for your verb
var registry = new Registry();

registry.Add(registry.NewItem("the first one"));
registry.Add(registry.NewItem("the second one"));
registry.Add(registry.NewItem("the third one"));

// One I know something about. Find hands back the record the registry is
// holding, so the change lands on the real one.
Thing? known = registry.Find("the second one");
if (known != null)
{
    known.Visit();
}

Console.Write("Take one off the books (Enter to skip): ");
string? name = Console.ReadLine();
if (!string.IsNullOrWhiteSpace(name))
{
    Console.WriteLine(registry.Remove(name) ? "Removed." : "Nothing by that name.");
}

Console.WriteLine();

// One loop. It knows about exactly one thing, and that thing is not a class.
foreach (IListed thing in registry.Everything())
{
    Console.WriteLine($"{thing.Kind,-12}{thing.Line()}");
}
```

> [!CAUTION]
> **Ask at most once, and never loop on input.** The grader runs your program with nothing but Enter on the keyboard. A `while` loop waiting for a menu choice hangs it, and a hung program scores zero for running.

**Run it once more, and read what it prints** — this is the part the checks can't see, and it's where the two points for *builds and runs* live:

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

**Save it before you push.** This is a whole file's worth of change and `git push` only sends what has been committed:

```bash
git add .
git commit -m "A program that shows all of it"
```

> [!CAUTION]
> **Skip this one and Part 4 pushes the file you had before.** Everything you just pasted is still sitting on your laptop, uncommitted — the branch on GitHub would stop at Part 4, and it is your own work that goes missing, not mine.

---

## Part 4 — The pull request

```bash
git push -u origin the-promise
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it** — scroll down to the changed files.

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

Four moments worth saving, and each one changes a file in `Project/` — they're written into Parts 2, 3, 4 and 5 above, at the point where each thing starts working. **The last one matters most**: `git push` sends commits, so anything you haven't committed simply doesn't travel. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4 and 5 still hold — no public fields, `All()` still copies, `Find` and `Remove` still behave, `Topic` still says something |
| 3 | `IListed` exists, and your record keeps it — a `Kind` of its own and a `Line()` that names the record it is about |
| 2 | Two different records write two different lines, and both call themselves the same `Kind` |
| 3 | `Registry` keeps `IListed` as well — a different `Kind`, a different `Line()`, and it is not a kind of record |
| 2 | `Registry.Everything()` hands back one `List<IListed>` holding the registry's own line and every record it is actually holding |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **Your count should climb 1 → 3 → 4 → 5**, one task at a time. Two checks land together in Tasks 2 and 3, because writing `Line()` properly answers both of them at once.

> [!WARNING]
> **A build failure zeroes all five checks at once.** One missing semicolon reads as "did nothing." Run `dotnet test Project.Checks` before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| **5 / 5 before you've written anything**, or check names you don't recognize | You're running **last week's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) copies this week's in — `Check2_YourRecordKeepsThePromise` is the first of tonight's; `Check2_YourRecordDoesSomething` is last week's. |
| `CS0535: '...' does not implement interface member '...'` | **The good one.** You wrote `: IListed` and haven't written that member yet — one line per thing you still owe. [It's a to-do list.](lecture-notes.md#keeping-a-promise) |
| `CS0246: The type or namespace name 'IListed' could not be found` | The file isn't there, the interface isn't `public`, or the name is spelled differently from the one you're using. Capital `I`, capital `L`. [The whole declaration is four lines.](lecture-notes.md#an-interface-is-a-promise) |
| `CS0525: Interfaces cannot contain instance fields` | You wrote `string Kind;` inside the interface instead of `string Kind { get; }`. [An interface holds no data](lecture-notes.md#an-interface-is-a-promise) — only the shape of what you can ask. |
| `CS0501: '...' must declare a body because it is not marked abstract` | You put a `;` after a method **in your class** instead of in the interface. Bodies belong in the class. |
| `CS0144: Cannot create an instance of the abstract type or interface` | You wrote `new IListed(...)`. [There is nothing there to make.](lecture-notes.md#an-interface-is-a-promise) |
| `CS0029: cannot implicitly convert type 'Thing' to 'IListed'` | Your record doesn't keep the promise yet. `: IListed` after the class name, then [build and read the list](lecture-notes.md#keeping-a-promise). |
| `CS0161: not all code paths return a value` | `Everything()` or `Line()` has a road through it that returns nothing — usually a `return` inside a loop and none after it. |
| `Registry.Everything() hands back a List<Thing>` | The type in the angle brackets is the point. It's `List<IListed>` — [that is what lets it hold two different classes](lecture-notes.md#one-list-one-loop). |
| `Everything() handed back the records and nothing else` | `listing.Add(this);` is missing. [The heading is a row too.](lecture-notes.md#everything-the-registry-has-to-show) |
| Every row on the listing says the same thing | `Line()` is built out of something fixed rather than out of the object it's running on. Read the properties of [the thing you're inside](lecture-notes.md#everything-the-registry-has-to-show). |
| `Registry` and your record report the same `Kind` | Two sorts of thing, two words — and [they are not two kinds of the same thing](lecture-notes.md#a-promise-is-not-a-parent). That column is how somebody reading the listing tells one row from another. |
| `Line()` doesn't name the record | It has to include the name `NewItem` was handed — whatever property you put it in. |
| The listing is missing your records | `Everything()` is adding `this` and forgetting the `foreach` over the private list. |
| Checks 1 and 2 both red | Fix `Line()` first — check 2 is built on the same method, so one bug reads as two. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Two minutes with the debugger](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) beats twenty with `Console.WriteLine`. |
| <kbd>F5</kbd>'s project list is unreadable | In your project repo it's two lines — your program and my checks — and you want **`Project`**. In the coursework repo, type the week and pick `Lab`. |
| `Assembly.Load("Project")` failed / no tests ran | The console project isn't called `Project`, or it isn't beside `Project.Checks` at the top of your repo. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-promise`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 6 Lab — The Hour](lab/) · **Next:** Week 7 — Unit testing, and the checks stop being magic *(coming)*
