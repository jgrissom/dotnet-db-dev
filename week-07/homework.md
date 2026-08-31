# Week 7 Homework — Your Own Suite 🧪

**20 points · due before next class**

Your project has been graded by a test project since week 4, and tonight you found out that's all a check ever was. This week your project gets a suite of its own — **written by you, about your registry, permanent** — and one new rule that every registry in the room currently breaks.

Notice what you do *not* have to do first: the demo spent a whole segment [moving Haldane's rules out of `Program.cs`](lecture-notes.md#move-it-dont-fix-it) before anything could be tested. Your `Registry` was born a class in week 4 — born testable — so tonight goes straight to the tests.

The rule: [**the same name cannot register twice.**](lecture-notes.md#the-registrys-new-rule) Call `Add` twice with the same name and your `Count` says 2 for one real thing — and nothing anywhere tells you. Nothing in weeks 4–6 ever stopped it. You'll prove that with a red test before you fix it, which is [the whole discipline of the week](lecture-notes.md#red-then-green).

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

> [!NOTE]
> **Nothing in `Registry`'s contract changes.** No new member, no new name — the eleven you have are spelled exactly as they were and always will be. What this week dictates instead is **four test names** (and one behavior). [The bodies are entirely yours.](lecture-notes.md#the-four-facts-and-their-names)

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then week 4 is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, and weeks [5](../week-05/homework.md) and [6](../week-06/homework.md) add what this week's check 1 re-verifies. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b red-then-green
```

**Then bring in this week's checks.** They ship in the starters clone and **they are different every week.** Pull the clone first:

```bash
git -C ../dotnet-db-starters pull
```

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-07/Project.Checks .
```

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong — and this week the tell is loud.** This week's `Project.Checks` holds **two** checks, not five. If `dotnet test Project.Checks` lists five check names, you are running **week 6's** — come back and run the two commands above.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 2.** The green one is check 1 — weeks 4 through 6, still holding, and it stays green every week from here. The red one is check 5, **and it is supposed to be red**: it tests the new rule, and your registry doesn't have it yet. It stays red until Task 5 — your own test will go red against the same rule first.

---

## Part 2 — The code

**Two suites this week, so two counts** — keep them straight the way the lab did:

- **Yours:** `dotnet test Project.Tests` — doesn't exist until Task 2, then climbs **1 → 2 → 3 → 4 passed**, with one deliberate red in the middle of Task 5.
- **Mine:** `dotnet test Project.Checks` — sits at **1 / 2** all week, and flips to **2 / 2** when Task 5's guard lands.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `WeeksFourToSixStillHold` | mine | **Nothing to write.** Green before you start — every week from here. |
| 2 | `Check2_AddingGrowsTheCount` | **yours** | Make `Project.Tests`, and write your first fact. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_FindHandsBackTheRecordItHolds` | **yours** | `Assert.Same` — the record, not a lookalike. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_RemovingAStrangerSaysNo` | **yours** | `Assert.False`, and the count stands still. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `Check5_TheSameNameCannotRegisterTwice` | **both** | Your test goes red, you write [the guard](lecture-notes.md#the-guard-in-add), and my check agrees. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **The four fact names in rows 2–5 are dictated, exactly as spelled** — they are what the grader reads out of *your* test run, the way `Registry` and its members have been dictated since week 4. Each one is `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours**: your type, your property names, your values.

### Task 2 in full

**Make the suite, then its first fact.**

**Check:** `Check2_AddingGrowsTheCount` — *yours*

**1. Two commands, from the top of your project repo** — the same two the demo ran tonight:

```bash
dotnet new xunit -o Project.Tests
```

```bash
dotnet add Project.Tests reference Project
```

[The first makes an ordinary test project from an ordinary template; the second lets it see your classes.](lecture-notes.md#a-test-project)

**2. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

> [!IMPORTANT]
> **Do this before you open anything in the new folder.** VS Code worked out which projects exist when you opened this window, and `Project.Tests` did not exist then — so until you reload, `Assert` and `[Fact]` come up as red squiggles in a file that is perfectly fine. ⚠️ **`.NET: Restart Language Server` does not fix it. Only a window reload does.**

**3. Trim the template.** Open `Project.Tests/Project.Tests.csproj`, select the whole file (`⌘A`), and paste this over it — [the notes say what each line is doing there](lecture-notes.md#the-csproj-trimmed):

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
    <!-- List every test, passed and failed, not just the failures. -->
    <VSTestLogger>console%3Bverbosity=normal</VSTestLogger>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.14.1" />
    <PackageReference Include="xunit" Version="2.9.3" />
    <PackageReference Include="xunit.runner.visualstudio" Version="3.1.4" />
  </ItemGroup>

  <ItemGroup>
    <Using Include="Xunit" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Project\Project.csproj" />
  </ItemGroup>

</Project>
```

**4. Two small housekeeping moves:**

- **New file `Project.Tests/Directory.Build.rsp`** — paste the whole thing:

  ```
  # MSBuild reads this automatically. -tl:off turns off the terminal logger, which
  # otherwise prints every failure a second time as "error TESTERROR" and then
  # reports "Build failed" for a build that succeeded and a test that didn't.
  -tl:off
  ```

- **Delete `Project.Tests/UnitTest1.cs`** — the template's empty page.

**5. New file `Project.Tests/RegistryTests.cs`.** Paste this **shape**, then write the body — mine is payphones, and [the worked version is in the notes](lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer):

```csharp
namespace Project.Tests;

public class RegistryTests
{
    [Fact]
    public void Check2_AddingGrowsTheCount()
    {
        // set the scene: a fresh Registry
        // do the thing:   Add two records, with two DIFFERENT names
        // check:          Assert.Equal — what should Count be?
    }
}
```

⚠️ **Two different names**, deliberately — after Task 5's guard, two records with the *same* name would be one record, and this fact stays green forever only if it never asks about duplicates.

**6. Run yours:**

```bash
dotnet test Project.Tests
```

**1 passed**, named. A fact that does nothing also passes, so:

**7. [Make it fail once.](lecture-notes.md#make-it-fail-once)** Change your expected count to something false, run it, read the failure — [name, expected, actual](lecture-notes.md#reading-a-failure) — then put the truth back and see green again. **Thirty seconds, and now the green is evidence.** Do this for every born-green fact tonight; I won't repeat the step.

```bash
git add .
git commit -m "The project gets a suite of its own"
```

---

### Task 3 in full

**The identity question.**

**Check:** `Check3_FindHandsBackTheRecordItHolds` — *yours*

Week 5's rule, now pinned by you: `Find` hands back **the record the registry is holding** — never a fresh one with the same values. The lab's Task 4 was this exact question about the switchboard, and it is [`Assert.Same`'s whole job](lecture-notes.md#the-assert-family).

Under your first fact, in `Project.Tests/RegistryTests.cs`. [Same three moves as Task 2](lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer):

- **Set the scene.** A fresh registry, and **keep a variable** for one record — `var depot = registry.NewItem(...)` — then `Add` it. You cannot compare against a record you did not hold on to.
- **Do the thing.** `Find` it, by the same name.
- **Check the answer.** [`Assert.Same(depot, found)`](lecture-notes.md#the-assert-family) — expected first. Not `Assert.Equal`: [this is the identity question](lecture-notes.md#the-assert-family), and a lookalike with the same values would pass a value comparison.

**Run yours:**

```bash
dotnet test Project.Tests
```

**2 passed.** Then falsify-and-restore: swap `Assert.Same` for a wrong expectation — `Assert.Same(registry.NewItem("..."), found)` — watch it object, and put it back.

```bash
git add .
git commit -m "Find hands back the record it holds"
```

---

### Task 4 in full

**A stranger, refused — and nothing else moves.**

**Check:** `Check4_RemovingAStrangerSaysNo` — *yours*

Week 5's other rule: `Remove` on a name nobody has says `false` and takes nothing off the books.

In `Project.Tests/RegistryTests.cs`, under Task 3's fact. [Three moves again](lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer):

- **Set the scene.** A registry with one record in it.
- **Do the thing.** `Remove` a name that is definitely not on file.
- **Check the answer.** [`Assert.False`](lecture-notes.md#the-assert-family) on what came back — **and** `Assert.Equal` that `Count` still says 1. Two asserts, because *saying no* and *doing nothing* are two different promises, and a `Remove` that returned `false` while quietly deleting something would pass the first one.

**Run yours:**

```bash
dotnet test Project.Tests
```

**3 passed.**

```bash
git add .
git commit -m "Removing a stranger says no"
```

---

### Task 5 in full

**The red one.**

**Check:** `Check5_TheSameNameCannotRegisterTwice` — *yours AND mine*

Now the fact your registry will fail honestly. [The new rule](lecture-notes.md#the-registrys-new-rule): registering the same name twice leaves **one** record on the books.

**1. Write the fact first**, in `Project.Tests/RegistryTests.cs`, under the other three:

- Scene: a fresh registry.
- Do: `Add(registry.NewItem("..."))` **twice, with the identical name.**
- Check: `Assert.Equal` — how many should `Count` say?

**2. Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

```
  Assert.Equal() Failure: Values differ
Expected: 1
Actual:   2
```

**3 passed, 1 failed** — and this red is the point of the whole week. Your test just caught a real bug in your real registry, one that has been there since week 4. [Read the failure](lecture-notes.md#reading-a-failure), confirm it describes the bug — *then* fix.

**3. The guard goes in `Add`**, and it is [built on your own `Find`, exactly like `Remove` was](lecture-notes.md#the-guard-in-add) — the worked version is in the notes, and the two lines are yours to adapt: if `Find` already knows that name, return; otherwise add. ⚠️ **`Add` stays `void`** — the refusal is quiet, [and your test is precisely how a quiet refusal stays honest](lecture-notes.md#the-registrys-new-rule).

**4. Run yours:**

```bash
dotnet test Project.Tests
```

**4 passed.**

**5. Then mine:**

```bash
dotnet test Project.Checks
```

**2 / 2.** My check 5 asks the same rule from outside — the original survives, the imposter is turned away, and a *different* name still registers. If yours is green and mine isn't, [the 🆘 table has the usual suspects](#-stuck).

```bash
git add .
git commit -m "The same name cannot register twice: red, then green"
```

---

## Part 3 — Show it in the program

The checks never look at `Program.cs` — and the guard deserves one visible line. Open `Project/Program.cs` and, right after your seed `Add` calls, add a duplicate on purpose plus the line that tells on it — **swap the name for one your program actually seeds**:

```csharp
// Week 7's rule, visible: Add called twice with the same name, and the
// second one refused. The count is the only thing that tells you.
registry.Add(registry.NewItem("the second one"));
Console.WriteLine($"Tried to register \"the second one\" twice - {registry.Count} on file.");
```

**Run it and read that line** — the count shouldn't move for the duplicate. This is where the two *builds and runs* points live:

```bash
dotnet run --project Project
```

```bash
git add .
git commit -m "The guard, visible in the program"
```

---

## Part 4 — The pull request

```bash
git push -u origin red-then-green
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it** — this week it should be mostly green: a whole new test project, and a few lines of guard.

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

Five moments worth saving, written into the parts above at the point where each thing starts working — the suite, two green facts, the red-then-green, the visible guard. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4–6 still hold — Topic, no public fields, All() copies, Find and Remove behave, IListed kept by record and registry, Everything() intact |
| 2 | Your test: adding two records grows Count to 2 — written by you, green in your own suite |
| 2 | Your test: Find hands back the very record the registry is holding — Assert.Same, not a lookalike |
| 2 | Your test: removing a name nobody has returns false and removes nothing |
| 4 | The same name cannot register twice — your test proves it AND my check agrees the guard is really in Add |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your facts by name. It also lists every fact it found, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| **Five checks listed**, or 5 / 5 before you've written anything | You're running **week 6's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) copies this week's in — this week lists exactly two: `Check1_WeeksFourToSixStillHold` and `Check5_TheSameNameCannotRegisterTwice`. |
| Check 5 red in **my** suite after Part 1 | Correct — [it's waiting for Task 5](lecture-notes.md#the-registrys-new-rule), and your own test goes red against the same rule first. |
| **Red squiggles under `Assert` or `[Fact]` — but `dotnet test` runs fine** | **The editor, not your code.** VS Code worked out which projects exist when you opened the window, and the test project did not exist then. Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. The compiler is the witness here: if `dotnet test` is happy, believe it. |
| `CS0246: 'FactAttribute' could not be found` — blamed on **`Project.csproj`** | `Project.Tests` is *inside* `Project/`. [A folder is a project or a container, never both](lecture-notes.md#-troubleshooting) — move it up beside `Project`, at the repo root. |
| `CS0246: The type or namespace name 'Registry' could not be found` — in the test project | No reference. `dotnet add Project.Tests reference Project`, or [check the csproj block's last ItemGroup](lecture-notes.md#the-csproj-trimmed). |
| `dotnet test Project.Tests` says **0 tests** | No `[Fact]`, or the class isn't `public` — [a fact takes nothing, returns nothing, wears the attribute](lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer). |
| Your fact names don't match the table | The grader reads the four names **exactly** — `Check2_AddingGrowsTheCount`, spelled like the table, on `public void` methods taking nothing. The bodies are yours; the names aren't. |
| A failure where **Expected** is obviously the broken value | [`Assert.Equal`'s arguments are swapped](lecture-notes.md#the-assert-family) — expected first, actual second. |
| Your check 5 is green but mine is red | Three usual suspects: your fact isn't using the *identical* name twice; your guard compares something other than [the property `NewItem` sets and `Find` reads](lecture-notes.md#the-guard-in-add); or the guard rejects *everything* — my check also proves a **different** name still registers. |
| Mine is green but yours is red | Your fact asserts the old behavior — expected 2 for a duplicate. The rule changed; [re-read what it should say](lecture-notes.md#the-registrys-new-rule). |
| Check 1 went red tonight | The guard broke something older — usually `Add` returning early for *every* name (check your condition), which empties `All()` and `Everything()`. [Check 1's message names which week's rule broke.](lecture-notes.md#-troubleshooting) |
| `error TESTERROR` and `Build failed` under a run that clearly ran | The `Directory.Build.rsp` from Task 2's step 3 is missing or misplaced — it sits inside `Project.Tests/`. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) beats twenty minutes of guessing. |
| <kbd>F5</kbd>'s project list is unreadable | In your project repo you want **`Project`** — the tests run from the terminal with `dotnet test`. In the coursework repo, type the week and pick `Lab`. |
| `Assembly.Load("Project")` failed / no tests ran in **my** suite | The console project isn't called `Project`, or it isn't beside `Project.Checks` at the top of your repo. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b red-then-green`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 7 Lab — The Update](lab/) · **Next:** Week 8 — File I/O, and the log stops being gone *(coming)*
