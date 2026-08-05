# Week 1 Homework

**Due:** before the start of Week 2's class.
**Submit via Canvas:** the URL of your **private** `dotnet-db-coursework` repo.

## Part 1 — Finish the lab (nobody collects this)

All five checks green:

```bash
dotnet test week-01/Lab.Checks
# Passed! - Failed: 0, Passed: 5 ...
```

> [!IMPORTANT]
> **You should have got all five of these in class.** If you didn't, finish them first — it isn't submitted and it isn't worth points, but it's the guided version of exactly what Part 3 asks you to do alone. Same shapes, different station. Doing it first is what turns Part 3 into an hour.

## Part 2 — Put it under git, before you write anything (graded)

**Do this first — before your station exists.** Two reasons, and the second is the real one:

- Your commits should record the work **as it happens**. A repo made at the end holds one commit that says "everything, at once", which tells nobody anything — including you, in week 9, trying to remember when something broke.
- If your push is going to argue with you about credentials or a branch name, **find out now**, with nothing on the line. Not at 11pm with a finished program you can't submit.

**You're already standing where all of this happens** — your window is the top of the repo, [where git lives, one repo for the whole semester](lecture-notes.md#getting-your-work-onto-github). Nothing to open, nowhere to move.

⚠️ **The repo has to already exist on GitHub, and `git push` will not create it for you.** If you skipped it during setup: [`setup-guide.md` §5](setup-guide.md#5-github-an-account-your-coursework-repo-and-the-course-repo) — `dotnet-db-coursework`, **Private**, **no** README, then add `jgrissom` as a collaborator. That last part is 3 of tonight's points.

**1. Make it a repo**, from your terminal at the top:

```bash
git init
```

The Source Control icon in the sidebar grows a badge with a number on it — every file in the folder, including hundreds you never wrote.

**2. Then the `.gitignore`, exactly as the demo did it** — [the four lines, before your first commit](lecture-notes.md#the-gitignore-written-before-your-first-commit). In the Explorer, click the empty space below the file list (so it lands at the root), **New File → `.gitignore`**, and type it **with that badge in view**:

```
bin/
obj/
*.user
.DS_Store
```

Watch the number fall as the lines land — that's git losing sight of the machinery, which is the point. Your repo will only ever hold what you wrote.

> [!NOTE]
> **Four lines, at the top, once — and that's the whole file for the semester.** It covers `week-01`, `week-02`, and the fourteen folders that don't exist yet. Nothing gets added to it later, including your lab: **the lab is something you wrote**, so it belongs in your repo like everything else you wrote. What gets ignored is what a machine can regenerate.

**3. Commit what you already have** — the lab you just finished:

```bash
git add .
```

```bash
git commit -m "Week 1: lab"
```

**4. Point it at GitHub.** Use the line **GitHub itself shows you** on the repo page — it has *your* username in it, not the placeholder:

```bash
git remote add origin https://github.com/YOUR-USERNAME/dotnet-db-coursework.git
```

**5. Push.** This is the one that talks to the internet, so it's the one that can ask you for credentials or complain about a branch name — if either happens, 🆘 Stuck? below has both:

```bash
git push -u origin main
```

**Go and look at it on GitHub.** Your lab, your `.gitignore`, and nothing you didn't write — no `bin/`, no `obj/`, anywhere. That's a repo born clean, and it stays that way for sixteen weeks.

## Part 3 — Your own station (graded)

KDXR is mine. **This one is yours:** you invent the station, and the program tells the world about it.

Pick a call sign, a city and a sign-off time. It can be a real town or an invented one, a jazz station or a pirate transmitter in somebody's attic. The code is the same either way — and the more specific it is, the better it reads at 3 AM.

**Your station works the overnight shift, the way KDXR does: on the air at midnight, off at your sign-off hour.** That's why the sign-off hour is 1 to 12 — it's an early-morning hour, not an evening one — and why every time your countdown is handed sits between midnight and that hour.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open while you work.** Every requirement below links to the section that shows it done, and the [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) names this week's actual error codes.

### Set it up

There's nothing to install and nothing to copy — the `week-01` folder you dragged in for the lab **already contains your homework's starting point**: a `Homework` project waiting to become your station, with `Homework.Checks` beside it.

**1. Your coursework window is the whole setup** — VS Code open on `dotnet-db-coursework`, the same window as tonight's lab and the demo. (Didn't get to the lab? [Its setup](lab/README.md#setup) brings the whole week in — do that first.) The week looks like this:

```
dotnet-db-coursework/
└─ week-01/
   ├─ Lab/                ← tonight's lab (not graded)
   ├─ Lab.Checks/
   ├─ Homework/           ← your program — the work below happens here
   └─ Homework.Checks/    ← the checks, unchanged
```

> [!CAUTION]
> **The folder names are not suggestions.** The checks find your project by the name `Homework`, and I run the same checks against your repo. Rename either homework folder and nothing can find your work — which looks exactly like not doing it. (And `Homework.Checks` stays *beside* `Homework`, never inside it — a project folder can't contain another project.)

### Write it

**2. [A `Station` class in its own file](lecture-notes.md#where-your-code-has-to-live)** — `week-01/Homework/Station.cs`, `public`, holding five methods. ⚠️ **Its own file, not the bottom of `Program.cs`** — that's the single most expensive mistake available this week. **This is the whole file's shape, with every answer taken out** — the blanks are where your station shows up:

```csharp
public static class Station
{
    public static string CallSign()
    {
        return "";      // ← yours
    }

    public static string City()
    {
        return "";      // ← yours
    }

    public static int SignOffHour()
    {
        return 0;       // ← yours
    }

    public static string SignOn()
    {
        return "";      // ← yours
    }

    public static int MinutesUntilSignOff(int hour, int minute)
    {
        return 0;       // ← yours
    }
}
```

**Paste that and it builds — and all four checks are red.** That's deliberate, and it's what makes the loop below work: it compiles from the first minute, so you can fill in one method, run the checks, and watch exactly one go green.

**Every command in this assignment runs from your terminal in `dotnet-db-coursework`, naming the week** — [the one place every command runs from](lecture-notes.md#the-project-not-the-file). Two commands, and you'll use both after every method you write.

See what the checks say:

```bash
dotnet test week-01/Homework.Checks
```

Then watch your program do it:

```bash
dotnet run --project week-01/Homework
```

**Do that after every single method** — fill in `CallSign()`, test, run. Then `City()`, test, run. Four methods, four rounds, and the count goes **0 → 1 → 2 → 3 → 4**. A check that goes red right after you wrote something tells you exactly where to look; twenty minutes of writing followed by one test run tells you nothing.

**When the count stops going up, commit.** You're standing where git lives, so it's two commands and no navigation:

```bash
git add .
```

```bash
git commit -m "Week 1: station class"
```

**Commit whenever you're somewhere solid** — that's the habit, and it's the one every week from here is graded on. Somewhere solid means: the checks went green, or you're about to try something that might not work and you'd like a way back.

What each one has to do:

| Method | Returns | Rules |
|---|---|---|
| `CallSign()` | `string` | **four capital letters, starting with K or W** — that's the real US convention, and the check enforces it |
| `City()` | `string` | wherever your station broadcasts from |
| `SignOffHour()` | `int` | the morning hour it shuts down, **1 to 12** — a station going off at 5:00 AM returns `5` |
| `SignOn()` | `string` | must contain **your call sign and your city** — [built by calling your own methods](lecture-notes.md#methods-and-what-the-words-in-front-of-them-mean), not by retyping them |
| `MinutesUntilSignOff(int hour, int minute)` | `int` | minutes from the given time until **your** sign-off hour. **`hour` is the clock hour and `minute` is the minutes past it** — 2:30 AM arrives as `hour = 2, minute = 30`, and midnight is `(0, 0)`. Not minutes-past-midnight; that's the thing you work out |

> [!WARNING]
> **`MinutesUntilSignOff` has to work out its answer from `SignOffHour()`.** If you type the number in and the two disagree, the check says so by name. A program that contradicts itself is worse than one that's simply wrong.

**Worked through, with my station's 5:00 AM sign-off** — yours will use your own hour:

```
MinutesUntilSignOff(2, 30)  →  150
```

Both times become minutes past midnight, then you subtract: 5:00 is `5 * 60` = 300, and 2:30 is `(2 * 60) + 30` = 150. **300 − 150 = 150.** ⚠️ **Multiply the hour by 60 *before* adding the minutes** — brackets make it obvious, and getting it backwards is off-by-a-multiple-of-59, which the check names for you.

**3. `week-01/Homework/Program.cs` prints the sign-on** and a countdown. The starter ships it with a placeholder line — replace the whole file with this. Small on purpose; everything worth checking lives in `Station.cs`:

```csharp
Console.WriteLine(Station.SignOn());
Console.WriteLine($"{Station.MinutesUntilSignOff(2, 30)} minutes until sign-off.");
```

Same two commands again. The checks:

```bash
dotnet test week-01/Homework.Checks
```

And the program, which is the half the checks never look at:

```bash
dotnet run --project week-01/Homework
```

You should see your station's sign-on line and a countdown — your own call sign, your own city, your own hour.

> [!NOTE]
> **No `Console.ReadLine` this week.** Your program prints and exits. Reading input arrives in week 2 — and there's a reason for the order: I have to *run* your program to grade it, and a program that sits waiting for input nobody types is a program that never finishes.

⚠️ **Run the program too, not just the checks.** **Two of tonight's twenty points are simply "it builds and runs without crashing"** — and a `Station.cs` that satisfies every check can still sit inside a `Program.cs` that throws on line one. The checks never look at `Program.cs`; I do.

**Commit again once it prints your station:**

```bash
git add .
```

```bash
git commit -m "Week 1: countdown working"
```

## Part 4 — Check it, then push it ✅

**These are the same checks I run.** There isn't a second, secret set.

Same terminal, same place it's been all night:

```bash
dotnet test week-01/Homework.Checks
```

```
Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

**And one last run**, because two points ride on it and no check will tell you:

```bash
dotnet run --project week-01/Homework
```

> [!TIP]
> **Read the failures, don't just count them.** Each one names what's wrong and what to write instead. If a check can't find your `Station` class at all, that's the first line of its message and it's usually a file in the wrong place.

**Then send it.** The remote was set up in Part 2, so from here on it's the one word:

```bash
git push
```

**Three or more commits touching `week-01/`, and they should mean something.** If you followed the parts in order you already have them — `week 1 lab`, `station class`, `countdown working` tells a story; `a`, `b`, `asdf` doesn't. I read these.

> [!IMPORTANT]
> **Check that `jgrissom` is on your repo's collaborator list** (Settings → Collaborators). It's worth 3 points, it's how I read your work at all, and a private repo I can't open is indistinguishable from an empty one.

> [!NOTE]
> **Last look at GitHub: no `bin/`, no `obj/`, anywhere.** Just your source, your `.csproj` files, and the `.gitignore` doing its quiet work. If machinery *did* sneak in — you ran `git add` before writing the four lines — week 2's first segment teaches the three-command repair, or ask me in class.

## 🆘 Stuck?

- **The checks say they can't find `Station`** — it needs to be `public`, spelled `Station` exactly, in `Homework/Station.cs`. ⚠️ **A class written at the bottom of `Program.cs` is invisible to them, `public` or not** — [it has to be its own file](lecture-notes.md#where-your-code-has-to-live).
- **`error CS0161: not all code paths return a value`** — you left `MinutesUntilSignOff` without a `return`, or its only `return` is inside an `if`.
- **"Station has no public static method called SignOn"** but you wrote one — check the capital letters (`signOn` and `SignOn` are different names), and that it says `static`.
- **Check 4 says your countdown disagrees with your sign-off hour** — you typed a number instead of working it out from `SignOffHour()`.
- **Check 4 is off by a multiple of 59** — the minutes got added before the hour was multiplied. `(hour * 60) + minute`.
- **`error CS0117`/"does not contain a definition for"** — a method name doesn't match what you're calling.
- **`MSB1003: Specify which project or solution file to use`** — the command ran without its week in front. From the top it is always `dotnet test week-01/Homework.Checks` — week first, then the project.
- **`fatal: not a git repository`** — your terminal wandered out of the repo (a leftover `cd`?). Close it and open a fresh one (`` Ctrl+` ``) — it starts back at the top, where git lives.
- **`git status` shows nothing, or a repo you didn't expect** — you ran `git init` in the wrong folder. It belongs at `dotnet-db-coursework`, **once ever**. If you ran it inside `week-01` or inside a project (a leftover `cd`), delete the stray `.git` folder that got made there, open a fresh terminal, and run it again — a fresh `` Ctrl+` `` terminal always starts at the top.
- **`git push` says `src refspec main does not match any`** — your first branch got called `master`, not `main`, because `init.defaultBranch` wasn't set when you ran `git init`. Fix it in one line: `git branch -M main`, then push again. ([Setting it once](setup-guide.md) stops it happening in week 2.)
- **`git push` says "Authentication failed"** — GitHub wants a token, not your password. Easiest fix is to install [GitHub CLI](https://cli.github.com/) and run `gh auth login`; come find me if it fights you.
- The [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) covers the rest.

## 📊 Grading (20 pts)

| Item | Points | Checked by |
|------|--------|------------|
| Your call sign is four capital letters starting with K or W | 2 | `dotnet test` |
| Your station broadcasts from somewhere real enough to name | 2 | `dotnet test` |
| `SignOn()` says the call sign and the city — built from your own methods | 4 | `dotnet test` |
| `MinutesUntilSignOff()` counts down to **your** sign-off hour, correctly | 4 | `dotnet test` |
| Private coursework repo exists and I can clone it (collaborator accepted) | 3 | your repo |
| The program builds and runs without crashing | 2 | your repo |
| 3+ commits touching `week-01/` 👀 | 3 | your repo |

*Reminder: the explain-it standard applies — I ask a couple of people in person each week. The ones I'll reach for this week: "why does `SignOn` call `CallSign()` instead of just writing the letters again?", "330 divided by 60 gave you 5 — would casting the answer to `double` have fixed it?", and "which of your two files can the checks actually see, and why?"*

## 📖 Reading for next week (~10 min)

Week 2 is **the mistakes the compiler can't catch for you** — input that lies, `null`, and the warnings you've been scrolling past — plus the one thing your `.gitignore` *can't* do.

- **Go and look at your repo on GitHub.** It's clean — source files, a `.csproj`, your four-line `.gitignore`, and nothing you didn't write. Then look at [GitHub's official `.gitignore` for Visual Studio](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore): several hundred lines. Yours is four, and both are correct — answer for yourself: **what would have to be true about a project for it to need all the rest?**
- Have a look at [the C# error code list](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/) — not to read it, just to see that it exists and that every error you hit has a page. Find `CS0029` and see what it says.
