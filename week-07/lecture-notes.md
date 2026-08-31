# Week 7 — Lecture Notes

## The bill for testable shape

Since the first night of this course, one rule has been under everything: **logic goes in a class where a check can call it, and printing stays in `Program.cs`.** Every homework you have handed in obeyed it. Tonight is the week you find out why — from both sides.

A check — a test — is not magic. It is a **caller**. It makes one of your objects, calls a method on it, and compares what came back with what should have. That is all any `*.Checks` project has ever done to your code.

Which is why code in `Program.cs` cannot be tested by anything: a local function in a top-level program is not a member of any class, so there is no name another file can use to reach it. Nothing outside that file can call it, so nothing outside that file can check it. The demo's duty board kept two wrong records for weeks — a person could sign out twice, and an amended return time could land on a trip that was already over — and no test could be written against either rule, because both rules lived in `Program.cs`.

Your own project never had this problem. `Registry` was born a class in week 4, which means it was born testable. Tonight it finally gets tested — by you.

---

## A test project

A test project is an ordinary project from an ordinary template:

```bash
dotnet new xunit -o Project.Tests
```

`xunit` is a template the way `console` is a template. **xUnit** is the library it wires up — the most widely used test library in .NET, and the one every `*.Checks` project in this course is built on. Nothing about it is course equipment.

The new project can't see your code until you point it there:

```bash
dotnet add Project.Tests reference Project
```

That one line is the same wiring every `Lab.Checks` you have ever copied ships with: a `ProjectReference`, so the test project can use your classes by name.

### The csproj, trimmed

The template's csproj works as-is, but this course replaces the whole file rather than describing it — select all, paste this over (this is the homework's exact block; the demo's differs only in the project it references):

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

Two lines are worth knowing about, because you have been living with their output all semester:

- **`VSTestLogger`** is why a test run lists every test by name, green and red, instead of only the failures. Open any week's `Lab.Checks.csproj` — it is there too.
- The little **`Directory.Build.rsp`** file that rides beside it (two lines, `-tl:off` and a comment) stops the build tool printing every failure a second time as `error TESTERROR` and claiming `Build failed` for a build that succeeded. Also in every checks project you have ever run.

And a rule that has bitten people before: **the test project sits BESIDE the project it tests, never inside it.** A folder is a project or a container, never both — put `Project.Tests` inside `Project/` and the app project swallows the test files, and the build fails blaming *your* csproj for attributes you never wrote.

---

## A fact: set the scene, do the thing, check the answer

A test is a method with `[Fact]` on it, in a public class, in a test project. The runner finds every method wearing that attribute and calls all of them, every time you run:

```bash
dotnet test Project.Tests
```

Here is one, whole — this file is `Project.Tests/RegistryTests.cs`, and mine is payphones:

```csharp
namespace Project.Tests;

public class RegistryTests
{
    [Fact]
    public void Check2_AddingGrowsTheCount()
    {
        Registry registry = new Registry();

        registry.Add(registry.NewItem("Route 9 at the feed store"));
        registry.Add(registry.NewItem("Behind the county pool"));

        Assert.Equal(2, registry.Count);
    }
}
```

Every test you will ever write has the same three moves, in the same order:

1. **Set the scene.** Make the objects the question needs — a fresh registry, two records. Nothing else: no console, no prompts, no seeds you don't need. This is what testable shape buys you — you can stand up *exactly the part of the world you are asking about*, in three lines.
2. **Do the thing.** The action under question. Here it is the two `Add` calls; often it is one method call.
3. **Check the answer.** One or more `Assert`s. If every assert is satisfied, the test is green; the first one that isn't turns it red and stops.

The method's name is the first thing you read when it fails, so name it after the **rule it proves**, not the method it calls. `Check2_AddingGrowsTheCount` tells you what broke before you open a file; `TestAdd` tells you nothing.

> [!NOTE]
> **A fact takes nothing and returns nothing.** No parameters, `void`, and the runner calls it — you never call a test yourself. (There is a version with parameters, `[Theory]` — real and useful, and the first thing worth learning after tonight. Nothing in this course needs it.)

---

## The Assert family

Four are enough for everything this week asks:

```csharp
// inside any fact
Assert.Equal(2, registry.Count);          // expected FIRST, actual second
Assert.True(watch.SignOut(okonkwo, "MET RUN", "15:00"));
Assert.False(registry.Remove("Corner of Nowhere and Never"));
Assert.Same(depot, registry.Find("Bus depot, west wall"));
Assert.Contains("(2 left)", aired[0]);
```

- **`Assert.Equal(expected, actual)`** — the workhorse. ⚠️ **The order is part of the meaning:** the value you *expect* goes first. Swap them and the test still passes and fails at the right times — but every failure message reads backwards, telling you the bug is in the truth.
- **`Assert.True` / `Assert.False`** — for answers that are already yes/no. Prefer `Assert.Equal` when there is a value to compare, because its failure says *what* it got, not just that it was wrong.
- **`Assert.Same(expected, actual)`** — the identity question: are these **the same object**, not two lookalikes with the same values? This is week 5's `==`-on-references as an assert, and it is exactly the question to ask of a method like `Find` or `Take` that promises to hand back *the* record rather than a copy.
- **`Assert.Contains(part, whole)`** — a substring must appear. For lines built for humans, where pinning the entire wording would break every time the wording improves.

---

## Reading a failure

```
  Failed Project.Tests.RegistryTests.Check5_TheSameNameCannotRegisterTwice [3 ms]
  Error Message:
   Assert.Equal() Failure: Values differ
Expected: 1
Actual:   2
```

Three things, in the order you need them: the **name** says which rule broke. **Expected / Actual** says how — you wanted one record, there are two. And below that (not shown) a stack trace names the file and line of the assert that objected. You have been reading failures shaped exactly like this since your first red check in week 1 — the difference tonight is that you also write them.

---

## Make it fail once

A test that has never failed proves less than you think. Maybe it checks the wrong value. Maybe it checks nothing. **A green line only means something if you have seen that same line red.**

So, for a test that is born green — one that pins behavior that already works — you falsify it, once, on purpose:

1. Run it. Green.
2. Change the expectation to something false — `Assert.Equal(3, registry.Count)` when the truth is 2.
3. Run it. **Red** — and read the failure it produces, because this is the failure a real bug would produce someday.
4. Put the truth back. Green again.

Thirty seconds, and now the green is evidence instead of decoration. The homework asks for this by name.

---

## Red, then green

For a **bug**, the falsify step comes free — the code is already wrong. The discipline is about order:

1. **Write the test first**, against the bug, asserting what *should* be true.
2. **Run it and watch it fail** — red, for the right reason. Read the expected/actual and confirm it describes the bug you meant.
3. **Fix the code.** The fix and only the fix.
4. **Run it again.** Green.

The red is not a formality. It is the only proof you will ever have that your test can *see* this bug — fix first, and the green that follows proves nothing about the test at all. And the payoff compounds: the test never comes off the suite, so the bug can never quietly return. A fix you checked by hand has been checked once; a fix with a test has been checked every run since.

---

## Move it, don't fix it

Some code cannot be tested where it lives — the demo's sign-out rule in `Program.cs`. The repair is a **move**: a class gets the list and every rule about it; `Program.cs` keeps the prompts and the paint, and calls in.

Two disciplines make a move safe:

- **Move faithfully — bugs and all.** If you fix while you move and something changes, you cannot tell which act did it. The demo carried both bugs into `Watch.cs` on purpose, proved the program behaved identically, and only then wrote the first red test.
- **Let the compiler write the checklist.** Replace the old code, build, and every error is a place still calling the old names. Work down the list; when it builds clean, the move is complete.

The desk actions that can refuse — amend a time for a name nobody has, mark back someone who isn't out — come back as `bool`, which is week 2's `TryParse` deal on methods of your own: try, and say whether it worked.

---

## What a test cannot see

Honesty about the instrument, because it matters from tonight on:

- **A test only asks what you thought to ask.** The lab's clock bug printed `10:5` for `10:05` — and a test that only ever feeds it `893` seconds stays green forever, because `:53` already has two digits. The screen looked right all night for the same reason. Choosing *which* values to ask about is the actual skill, and edges (`605`, `600`, a one-run ad aired twice, exactly `-50.0`) are where bugs live.
- **Green means "no assert objected," never "the program is right."** The compiler's silence didn't mean correct in week 1, and a suite's green doesn't mean it now. It means every question you wrote down has today's answer.
- **A test is code, and it can be wrong.** Which is why it must fail once before you believe it.

---

## The registry's new rule

Your homework's one change of behavior: **the same name cannot register twice.** Until tonight, nothing stopped it — call `Add` twice with records carrying the same name and your registry holds both, and `Count` answers a question with a lie in it. Every registry in the room has this bug, which is what makes it the perfect first red: you will write the test, run it against your real code, and watch it fail honestly.

### The guard in Add

The fix goes in `Add`, and it is built on the `Find` you have had since week 5 — the same way `Remove` was:

```csharp
// inside Registry — Payphone and Corner are mine; yours are your own
public void Add(Payphone item)
{
    if (Find(item.Corner) != null)
    {
        return;
    }

    _items.Add(item);
}
```

Read `item.Corner` as *the property `NewItem` puts the name into* — whatever you called it, it is the same one your `Find` compares against. `NewItem` itself does not change: *making* a record was never the problem, registering it twice was.

Notice the refusal is **quiet** — `Add` is `void` (dictated since week 4, and it stays that way), so it cannot say no out loud the way `Remove` says `false`. A quiet refusal is only visible to something that checks the count afterwards… which is your test. When you want a refusal to be loud, you give the method a `bool` — the demo's `Watch.SignOut` did exactly that — and weeks from now, week 13 upgrades this whole conversation.

### The four facts, and their names

This week the contract dictates **test names** instead of members — nothing is added to `Registry`'s eleven names. Your `Project.Tests/RegistryTests.cs` holds four facts, spelled exactly:

| Fact | Proves | Born |
|---|---|---|
| `Check2_AddingGrowsTheCount` | two Adds, `Count` is 2 | green |
| `Check3_FindHandsBackTheRecordItHolds` | `Assert.Same` — the record, not a copy | green |
| `Check4_RemovingAStrangerSaysNo` | `Remove` on a stranger: `false`, nothing removed | green |
| `Check5_TheSameNameCannotRegisterTwice` | the new rule | **red**, until you write the guard |

The **bodies are yours** — your type, your property names, your values. The dictated part is the four method names, because they are what the grader reads out of your test run. (My check 5 tests the same rule from outside; both have to be green, which is what makes an empty test with the right name worthless.)

---

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS0246: The type or namespace name 'FactAttribute' could not be found` — **blamed on your app's csproj** | The test project is *inside* the app folder, so the app is trying to compile the test files. A folder is a project or a container, never both — move `Project.Tests` up beside `Project`. |
| `CS0246: 'Fact'` or `'Xunit'` not found, blamed on the **test** project | The csproj lost its packages or the `<Using Include="Xunit" />`. Paste the whole csproj block from these notes over yours. |
| `CS0246: The type or namespace name 'Registry' could not be found` — in the test project | No `ProjectReference`. `dotnet add Project.Tests reference Project`, or check the csproj's last ItemGroup. |
| `dotnet test` says **0 tests** ran | The method isn't marked `[Fact]`, or the class isn't `public`. The runner only calls what wears the attribute. |
| Your test is green against a bug you can see | It asserts a value the bug happens to answer correctly — the clock's `893`. Feed it the value that hurts (`605`), and make the test fail once before trusting it. |
| A failure message that reads backwards — *expected* is obviously the broken value | `Assert.Equal`'s arguments are swapped. Expected first, actual second. |
| `error TESTERROR` lines and `Build failed` under a test run that clearly ran | No `Directory.Build.rsp` beside the csproj. Two lines; it ships in every checks project to copy from. |
| Red test, and the failure names a line in the **test** | Tests are code too. Read your own assert first — half of first-night reds are a typo in the expectation. |
| `MSB1003: Specify which project` | You're at the top of a repo and didn't name one. `dotnet test Project.Tests` in the project repo; `dotnet test week-07/Lab.Tests` in the coursework one. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) still applies, and it is still faster than a `Console.WriteLine`. |
