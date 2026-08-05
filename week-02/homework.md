# Week 2 Homework

**Due:** before the start of Week 3's class.
**Submit via Canvas:** the URL of your **private** `dotnet-db-coursework` repo — same URL as last week. (Submitting it again just confirms which repo I grade.)

## Part 1 — Finish the lab (nobody collects this)

All five checks green, and the desk survives your worst typing:

```bash
dotnet test week-02/Lab.Checks
# Passed! - Failed: 0, Passed: 5 ...
```

> [!IMPORTANT]
> **You should have got all five in class.** If not, finish them first — the lab's Tasks 2–4 are the guided version of exactly what Part 2 asks you to do alone. Same tools, your station.

## Part 2 — Your station answers the phone (graded)

Last week you invented a station. **This week it gets a request line:** a greeting, a name for callers who won't give one, and a call-in contest that can survive any answer a human gives it.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open while you work.** Every requirement links to the section that shows it done, and the [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) names this week's actual crashes.

### Set it up

There's almost nothing to set up — the `week-02` folder you dragged in for the lab **already contains your homework's starting point**: a `Homework` project waiting to become your station, and `Homework.Checks` beside it.

**1. Your coursework window is the whole setup** — VS Code open on `dotnet-db-coursework`, the same window as tonight's lab. (Didn't get to the lab? [Its setup](lab/README.md#setup) brings the whole week in — do that first.)

**2. Carry your `Station` class forward** — [the same one-move copy from the demo](lecture-notes.md#carrying-a-class-forward), from the terminal:

```bash
cp week-01/Homework/Station.cs week-02/Homework/
```

> [!NOTE]
> **No week 1 `Station.cs` to copy?** Type the minimum and move on — the file is `week-02/Homework/Station.cs`, the call sign rules are [week 1's](../week-01/homework.md) (four capitals, starting K or W), and this is the whole file:
> ```csharp
> public static class Station
> {
>     public static string CallSign()
>     {
>         return "KRVN";   // yours, not mine
>     }
> }
> ```

> [!CAUTION]
> **The folder names are still not suggestions.** The checks find your project by the name `Homework`, `Homework.Checks` stays *beside* it (never inside), and I run the same checks against your repo. Rename anything and nothing can find your work.

### Write it

**3. A `Switchboard` class in its own file** — `week-02/Homework/Switchboard.cs`, `public`, four methods. This is the whole file, shapes included — **and the three blanks in it fail on purpose.** Pasting it as-is leaves two checks red; the blanks are where your station shows up:

```csharp
public static class Switchboard
{
    public static string Greeting()
    {
        return $"{Station.CallSign()} request line, what'll it be?";
    }

    public static string CallerName(string? typed)
    {
        if (string.IsNullOrWhiteSpace(typed))
        {
            return "";   // ← invent your station's word for a caller who won't say.
                         //   Blank fails the check, on purpose.
        }
        return typed.Trim();
    }

    public static int LuckyCallerNumber()
    {
        return 0;   // ← your contest's number, 1 to 100. Zero fails, on purpose.
    }

    public static bool IsWinner(string? typed)
    {
        // Parse what they typed — the tool that never throws — then compare it
        // with LuckyCallerNumber(). The notes show it done; so does the lab's Task 3.
        return false;
    }
}
```

What each one has to do:

| Method | Returns | Rules |
|---|---|---|
| `Greeting()` | `string` | how your station answers the phone — must contain **your call sign**, [by calling `Station.CallSign()`](lecture-notes.md#carrying-a-class-forward), not by retyping the letters |
| `CallerName(string? typed)` | `string` | a real name comes back **trimmed**; `null`, empty or whitespace-only gets **your invented no-name default** — non-blank, same answer for all three, [and it must not crash](lecture-notes.md#readline-and-null) |
| `LuckyCallerNumber()` | `int` | your contest's winning caller number, **1 to 100** |
| `IsWinner(string? typed)` | `bool` | `true` only when the typed text parses to exactly your lucky number — [built on `TryParse`](lecture-notes.md#parse-believes-tryparse-asks), so words, blanks and `null` lose **without throwing** |

> [!WARNING]
> **`IsWinner` works out the winning number from `LuckyCallerNumber()`.** Type the number in twice and the two can disagree — and the check says so by name. Same single-source-of-truth rule as last week's sign-off countdown.

**The no-name default is a writing assignment as much as a code one.** *"a voice in the dark"*, *"the 2 AM mystery"*, *"caller unknown"* — it's your station's house style. It just can't be blank.

**Every command in this assignment runs from your terminal in `dotnet-db-coursework`, naming the week.** Two of them, and you'll use both after every method you fill in.

See what the checks say:

```bash
dotnet test week-02/Homework.Checks
```

Then watch your program do it:

```bash
dotnet run --project week-02/Homework
```

**Do that after every method** — write `Greeting()`, test, run. Then `CallerName()`, test, run. **Four methods, four rounds**, and the pasted file starts you at 2 of 4. A check that goes red right after you wrote something tells you exactly where to look.

**4. `week-02/Homework/Program.cs` opens the line.** The skeleton ships with a placeholder — replace the whole file with this. Small on purpose; every decision lives in `Switchboard.cs`:

```csharp
Console.WriteLine(Switchboard.Greeting());

Console.Write("Who's calling? ");
string caller = Switchboard.CallerName(Console.ReadLine());

Console.Write("And what caller number are you? ");
string? claimed = Console.ReadLine();

if (Switchboard.IsWinner(claimed))
{
    Console.WriteLine($"{caller}, you're caller {Switchboard.LuckyCallerNumber()} - you win.");
}
else
{
    Console.WriteLine($"Not this time, {caller}.");
}
```

> [!IMPORTANT]
> **Your program gets run with nobody typing.** The grader answers every prompt by pressing Enter and then goes quiet — so `ReadLine` hands your code empty strings and then `null`. Built like the above, that's fine: a blank caller gets your default, a blank number loses the contest, the program exits cleanly. **[No loops that re-ask until the input is valid](lecture-notes.md#ask-once-answer-gracefully)** — a program that won't take no for an answer never finishes, and 2 of tonight's points are "runs cleanly when fed nothing but Enter."

Same two commands again. The checks:

```bash
dotnet test week-02/Homework.Checks
```

And the program, which is the half the checks never look at:

```bash
dotnet run --project week-02/Homework
```

**Run it the way the lab taught you to** — politely once, then rudely: spaces for a name, words for a number, Enter for everything. If anything crashes, [the appendix names it](lecture-notes.md#appendix-troubleshooting).

## Part 3 — Repo hygiene (graded)

**Hygiene is scored every week from now on** — and because your `.gitignore` has been guarding the door since your very first commit, most of it is already true. Tonight adds a README and the commit habit.

**You're already standing where all of this happens.** Your window is the top of the repo — the Explorer can make files at the root, and the terminal is where every `git` command runs. Nothing to open, nothing to change.

> [!NOTE]
> **Never connected this folder to GitHub at all?** Do [week 1's Part 3](../week-01/homework.md#part-3--push-it-graded) first — its *first time only* block makes the repo, connects it, and adds me as a collaborator. Then come back here.

**1. Glance at your repo's hygiene** — thirty seconds, two questions.

What's changed but not saved:

```bash
git status
```

And what's tracked that never should have been:

```bash
git ls-files | grep -E '(^|/)(bin|obj)/'
```

`status` should be quiet (or list only tonight's real work), and the second command should print **nothing** — no generated file is tracked anywhere. If something *did* slip in, [the eviction drill from the demo](lecture-notes.md#the-eviction-when-junk-gets-tracked-anyway) fixes it in three commands — that's exactly what it's for.

**2. A `README.md` at the repo root** — [who you are, what this is, a line per week](lecture-notes.md#a-readme-for-your-repo). In the Explorer, **click the empty space below the file list first** so it lands at the root, then New File → `README.md`. Commit it — from the Source Control panel if you like; the buttons are the verbs now.

**3. Commit as you go — three or more commits touching `week-02/`**, with messages that mean something. `week 2 lab`, `switchboard working`, `readme` tells a story. I read these. (A good rhythm, and the one the demo modeled: commit whenever you're somewhere solid — right after the setup compiles, again when the checks go green — so the risky stretches always have a save point behind them.)

```bash
git push
```

## Part 4 — Check it before you submit ✅

**These are the same checks I run.** Same terminal, same place it's been all night:

```bash
dotnet test week-02/Homework.Checks
```

```
Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

**And one last run**, because two points ride on it and no check will tell you:

```bash
dotnet run --project week-02/Homework
```

Then look at your repo **on GitHub** the way I will: no `bin/` or `obj/` anywhere, a README on the front page, and a commit history that says what happened.

## 🆘 Stuck?

- **The checks can't find `Station`** — it didn't make the trip. `Station.cs` goes **inside** `Homework/`, next to `Program.cs`, and the class stays `public` and spelled `Station`.
- **The checks can't find `Switchboard`** — same rules: `public`, exact spelling, its own file inside `Homework/`.
- **`NullReferenceException` in `CallerName`** — `.Trim()` before the nothing-test. [Test first.](lecture-notes.md#readline-and-null)
- **`FormatException` in `IsWinner`** — that's `int.Parse` believing a caller. [`TryParse` asks.](lecture-notes.md#parse-believes-tryparse-asks)
- **Check 3 says your defaults disagree** — `null`, `""` and `"   "` must all get the same answer; `IsNullOrWhiteSpace` makes that automatic.
- **Check 4 says the right number loses** — `IsWinner` compares against a typed-in number instead of `LuckyCallerNumber()`, and they disagree.
- **A generated file shows up tracked on GitHub** — something slipped past the ignore file at some point. [The eviction drill](lecture-notes.md#the-eviction-when-junk-gets-tracked-anyway) clears it in three commands.
- **`fatal: not a git repository`** — your terminal wandered out of the repo (a leftover `cd`?). Close it and open a fresh one (`` Ctrl+` ``) — it starts back at the top, where git lives.
- The [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) covers the rest.

## 📊 Grading (20 pts)

| Item | Points | Checked by |
|------|--------|------------|
| Your `Station` class came forward — call sign still four capitals, K or W | 2 | `dotnet test` |
| `Greeting()` names your station — built by calling `Station.CallSign()` | 2 | `dotnet test` |
| `CallerName()` trims real names and has a default for nobody — nothing crashes | 3 | `dotnet test` |
| `IsWinner()` survives any answer — your number wins, lies lose, nothing throws | 4 | `dotnet test` |
| Private coursework repo still reachable (same URL as week 1) | 1 | your repo |
| The program builds and runs without crashing — even when fed nothing but Enter | 2 | your repo |
| `bin/` and `obj/` tracked **nowhere** in the repo — the `.gitignore` holding | 3 | your repo |
| 3+ commits touching `week-02/` 👀 | 2 | your repo |
| `README.md` at the repo root that says whose repo this is 👀 | 1 | your repo |

*The explain-it standard applies — I ask a couple of people in person each week. This week's likely questions: "your `.gitignore` says `bin/` — so why did GitHub still show it until you ran the second command?", "what does `IsWinner` return for `null`, and where in your code does that get decided?", and "why can't your program loop until the caller types a real number?"*

## 📖 Reading for next week (~10 min)

Week 3 is **collections** — the station starts keeping a list, and you find out what it costs to keep one in memory.

- Go look at [GitHub's official `.gitignore` for Visual Studio](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore). It's several hundred lines. Yours is four, and both are correct — answer for yourself: **what would have to be true about a project for it to need all the rest?**
- Then, in your own week 2 program: take three calls in a row by running it three times. **Where are the first two calls while the third one is happening?** Write your answer down and bring it. (It's a trick question. That's the point.)
