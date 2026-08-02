# Week 1 Homework

**Due:** before the start of Week 2's class.
**Submit via Canvas:** the URL of your **private** `dotnet-db-coursework` repo.

## Part 1 — Finish the lab (nobody collects this)

All five checks green:

```bash
dotnet test KDXR.Checks
# Passed! - Failed: 0, Passed: 5 ...
```

> [!IMPORTANT]
> This isn't submitted and it isn't worth points. It's the guided version of exactly what Part 2 asks you to do alone — same four shapes, different station. Doing it first is what turns Part 2 into an hour.

## Part 2 — Your own station (graded)

KDXR is mine. **This one is yours:** you invent the station, and the program tells the world about it.

Pick a call sign, a city and a sign-off time. It can be a real town or an invented one, a jazz station or a pirate transmitter in somebody's attic. The code is the same either way — and the more specific it is, the better it reads at 3 AM.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open while you work.** Every requirement below links to the section that shows it done, and the [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) names this week's actual error codes.

### Set it up

**1. In your `dotnet-db-coursework` folder, make a `week-01` folder, and make the project inside it:**

```bash
mkdir week-01
cd week-01
dotnet new console -o Week01
```

**2. Copy the checks project in from your clone of the course repo** — the whole folder, into `week-01/` beside `Week01`:

```
dotnet-db-dev/week-01/homework-checks/Week01.HomeworkChecks     ← copy this folder
```

You should end up with exactly this:

```
dotnet-db-coursework/
└─ week-01/
   ├─ Week01/                    ← your program
   └─ Week01.HomeworkChecks/     ← the checks, unchanged
```

> [!CAUTION]
> **Those two folder names are not suggestions.** The checks find your project by the name `Week01`, and I run the same checks against your repo. Rename either folder and nothing can find your work — which looks exactly like not doing it.

### Write it

**3. [A `Station` class in its own file](lecture-notes.md#the-class-is-a-box-to-put-methods-in)** — `Week01/Station.cs`, `public`, holding five methods. This is the whole file, with my station's answers in it; yours will say something else:

```csharp
public static class Station
{
    public static string CallSign()
    {
        return "KRAB";
    }

    public static string City()
    {
        return "Monterey, California";
    }

    public static int SignOffHour()
    {
        return 5;
    }

    public static string SignOn()
    {
        return $"{CallSign()} 88.9 FM, broadcasting from {City()}.";
    }

    public static int MinutesUntilSignOff(int hour, int minute)
    {
        // your arithmetic here
    }
}
```

What each one has to do:

| Method | Returns | Rules |
|---|---|---|
| `CallSign()` | `string` | **four capital letters, starting with K or W** — that's the real US convention, and the check enforces it |
| `City()` | `string` | wherever your station broadcasts from |
| `SignOffHour()` | `int` | when it shuts down, **1 to 12** |
| `SignOn()` | `string` | must contain **your call sign and your city** — [built by calling your own methods](lecture-notes.md#a-method-is-a-def-with-the-types-written-down), not by retyping them |
| `MinutesUntilSignOff(int hour, int minute)` | `int` | minutes from the given time until **your** sign-off hour |

> [!WARNING]
> **`MinutesUntilSignOff` has to work out its answer from `SignOffHour()`.** If you type the number in and the two disagree, the check says so by name. A program that contradicts itself is worse than one that's simply wrong.

**4. `Week01/Program.cs` prints the sign-on** and a countdown. Small on purpose — everything worth checking lives in `Station.cs`:

```csharp
Console.WriteLine(Station.SignOn());
Console.WriteLine($"{Station.MinutesUntilSignOff(2, 30)} minutes until sign-off.");
```

> [!NOTE]
> **No `Console.ReadLine` this week.** Your program prints and exits. Reading input arrives in week 2 — and there's a reason for the order: I have to *run* your program to grade it, and a program that sits waiting for input nobody types is a program that never finishes.

## Part 3 — Push it (graded)

```bash
git add .
git commit -m "Week 1: KRAB signs on"
git push
```

**Three or more commits**, and they should mean something — `week 1 setup`, `station class`, `countdown working` tells a story; `a`, `b`, `asdf` doesn't. I read these.

> [!IMPORTANT]
> **Check that `jgrissom` is on your repo's collaborator list** (Settings → Collaborators). It's worth 3 points, it's how I read your work at all, and a private repo I can't open is indistinguishable from an empty one.

> [!NOTE]
> **Your push will include `bin/` and `obj/`** — dozens of files you didn't write. That's what everybody's first repo looks like, it costs you nothing this week, and **week 2 opens by cleaning it up.** Leave it.

## Part 4 — Check it before you submit ✅

**These are the same checks I run.** There isn't a second, secret set.

From your `week-01` folder — the one holding both project folders:

```bash
dotnet test Week01.HomeworkChecks
```

```
Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

> [!TIP]
> **Read the failures, don't just count them.** Each one names what's wrong and what to write instead. If a check can't find your `Station` class at all, that's the first line of its message and it's usually a file in the wrong place.

## 🆘 Stuck?

- **The checks say they can't find `Station`** — it needs to be `public`, spelled `Station` exactly, in `Week01/Station.cs`. ⚠️ **A class written at the bottom of `Program.cs` is invisible to them** — [it has to be its own file](lecture-notes.md#the-class-is-a-box-to-put-methods-in).
- **`error CS0161: not all code paths return a value`** — you left `MinutesUntilSignOff` without a `return`, or its only `return` is inside an `if`.
- **"Station has no public static method called SignOn"** but you wrote one — check the capital letters (`signOn` and `SignOn` are different names), and that it says `static`.
- **Check 4 says your countdown disagrees with your sign-off hour** — you typed a number instead of working it out from `SignOffHour()`.
- **Check 4 is off by a multiple of 59** — the minutes got added before the hour was multiplied. `(hour * 60) + minute`.
- **`error CS0117`/"does not contain a definition for"** — a method name doesn't match what you're calling.
- **`MSB1003: Specify which project or solution file to use`** — run `dotnet test` from `week-01/`, not from inside either project folder.
- **`fatal: not a git repository`** — you're not inside your `dotnet-db-coursework` folder.
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
| 3+ commits 👀 | 3 | your repo |

*Reminder: the explain-it standard applies — I ask a couple of people in person each week. The ones I'll reach for this week: "why does `SignOn` call `CallSign()` instead of just writing the letters again?", "what happens if you divide 330 by 60 in C#?", and "which of your two files can the checks actually see, and why?"*

## 📖 Reading for next week (~15 min)

Week 2 is **the compiler as a working partner**, and **cleaning up what git swept up tonight**.

- **Go and look at your repo on GitHub.** Click into `week-01/Week01/`. Count the folders you didn't write, and open one file inside `obj/`. You don't need to understand it — just get a sense of how much of what you pushed isn't yours. Bring the number.
- Then answer this for yourself, and write it down: **why would a compiler need a folder of its own working files, and why would anyone want those in a repo?** (One of those questions has a good answer. The other doesn't.)
- Have a look at [the C# error code list](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/) — not to read it, just to see that it exists and that every error you hit has a page. Find `CS0029` and see what it says.
