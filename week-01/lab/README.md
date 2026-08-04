# Week 1 Lab — KDXR Signs On 📻

It's 11:58 PM and you're the overnight desk at **KDXR 88.1, "The Owl."** The sign-on sequence runs off this terminal, the way it has since 1987, and four of its five pieces are missing.

**Time:** ~50 minutes in class — **in-class target: all five green.**

> [!NOTE]
> **The C# here is not the hard part, and you'll know that within five minutes.** What's new is the loop: run the checks, read what they say, change one thing, run them again. That loop is how every week of this course works, and it's what you're actually practising tonight.

## Setup

**1. Update your clone of the course repo** — the one you cloned during [setup](../setup-guide.md):

```bash
cd dotnet-db-dev
git pull
```

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it yet. One command, from your home folder, and then run the two above:
> ```bash
> git clone https://github.com/jgrissom/dotnet-db-dev.git
> ```

**2. Make a `week-01` folder inside your `dotnet-db-coursework` folder** — the empty one you made during [setup](../setup-guide.md#then-make-the-folder-that-repo-will-hold). Exactly the move you watched in the demo:

**VS Code → File → Open Folder → `dotnet-db-coursework` → *New Folder* → name it `week-01` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder?** Make it now — File → Open Folder → *New Folder* → `dotnet-db-coursework` — then make `week-01` inside it. You'll add one folder like this every week for the rest of the term.

**3. Copy the two folders inside `week-01/lab/starter` into your `week-01`.** (Copy them *out* of the clone; never work inside it, or next week's `git pull` will fight your edits.)

The two folders sit side by side, [the way setup left them](../setup-guide.md#5-github-an-account-your-coursework-repo-and-the-course-repo) — so you're dragging from the right-hand one into the left:

```
├─ dotnet-db-coursework/week-01/     ← INTO here
└─ dotnet-db-dev/week-01/lab/starter/  ← FROM here
```

```
dotnet-db-coursework/
└─ week-01/           ← keep THIS open in VS Code
   ├─ Lab/            ← the station — ALL your work happens in here
   └─ Lab.Checks/     ← the checks — read-only, never edit
```

Your lab work lives in your repo alongside everything else from this week. It isn't graded — but it's the worked example your homework is built on, so you want it where you can find it.

**4. With `week-01` still open**, use the VS Code terminal (`` Ctrl+` ``) — it's already standing in that folder, exactly like the demo:

```bash
dotnet test Lab.Checks
```

**1 / 5 passing.** Check 1 is the station you were handed, already on the air. The other four are tonight.

> [!CAUTION]
> **The folder split trips everybody, all term.** `dotnet test Lab.Checks` and `dotnet run --project Lab` both run from `week-01` — the folder you opened in VS Code, the one holding **both** project folders. Not from inside `Lab`, and never from inside `Lab.Checks`. **You never `cd` anywhere.**

## Where tonight's work happens

| File | What you do to it |
|---|---|
| `Lab/Broadcast.cs` | **everything.** Four methods to fill in |
| `Lab/Program.cs` | read it, don't change it — it's what a human sees |
| `Lab.Checks/` | **never edit.** It's how you know you're done |

> [!NOTE]
> **Notice what the checks never look at: your output.** They call your methods and inspect what comes back. That's why `Broadcast.cs` exists separately from `Program.cs` — and it's the shape [every homework this term asks for](../lecture-notes.md#where-your-code-has-to-live). Put a method in `Program.cs` instead and nothing can reach it, `public` or not.

## The tasks

**Run the checks after every task, before you start the next one.** Each task turns exactly one more check green, so the number tells you where you are — and if it *doesn't* go up by one, the thing you just changed is the thing to look at, not the task you were about to start. Each task below ends with the number you should see.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Get the project running and read what you were handed. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheSignOnGreetsTheDj` | Return the line the DJ sees at the top of their shift, using [a `$"..."` string](../lecture-notes.md#putting-values-into-text). **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheClockCountsDownToSunrise` | Minutes until 6:00 AM, from an hour and a minute. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheHoursIncludeThePartHours` | Minutes into hours — ⚠️ [and this one has a trap in it](../lecture-notes.md#whole-numbers-and-real-numbers). **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheOwlKnowsWhenItsLate` | Is a given hour inside the overnight block? **[Task 5 in full ↓](#task-5-in-full)** |

### Task 1 in full

**Check 1 is already green** — this task is about looking before you type.

**Run the station:**

```bash
dotnet run --project Lab
```

It asks who's on duty, then prints a sign-on that's blank, a countdown that says 0, and a number of hours that's also 0. Everything it's lying about is one of tonight's four methods.

**Then open `Lab/Broadcast.cs` and read it.** Nothing in the signatures will surprise you — [they're the same words you've been writing](../lecture-notes.md#methods-and-what-the-words-in-front-of-them-mean):

```csharp
public static string SignOn(string djName)
```

`CallSign()` is done for you. It's the one to copy the shape from.

⚠️ **What's worth noticing before you start:** all of tonight's work happens in `Broadcast.cs` and none of it in `Program.cs`. That isn't a filing preference — it's the only reason the checks can see your work at all.

`dotnet test Lab.Checks`: **1 / 5.** Now run `dotnet run --project Lab` as well, and read it knowing the station clock says 2:15 AM — it claims nobody's on air, it isn't the overnight block, and there are 0 minutes until sunrise. **Every one of those is a lie, and each task you finish turns one of them true.**

### Task 2 in full

**Check:** `Check2_TheSignOnGreetsTheDj`

Return the line the DJ sees when their shift starts. It has to contain **the station's call sign** and **the DJ's name**.

```csharp
public static string SignOn(string djName)
{
    return $"{CallSign()} 88.1 The Owl - you're on with {djName}.";
}
```

Two things worth noticing, because both come back all term:

- **The `$` before the quote** is what makes `{djName}` become the name instead of printing literally — and [anything in the braces gets *evaluated*](../lecture-notes.md#putting-values-into-text), which is how `CallSign()` gets in there.
- **`CallSign()` is *called*, not retyped.** Two places that both know the station's name is one place too many — and the check tests this indirectly by asking for a second DJ's sign-on.

The words between the braces are yours. Make it sound like 3 AM.

`dotnet test Lab.Checks`: **2 / 5.** And in `dotnet run --project Lab`, the DJ gets greeted properly for the first time.

### Task 3 in full

**Check:** `Check3_TheClockCountsDownToSunrise`

The Owl runs midnight to 6:00 AM. Given the time as an hour and a minute, return how many minutes are left until sunrise.

```
2:15 AM  →  225
0:00     →  360
5:59     →  1
```

Two steps: turn the time you were given into **minutes past midnight**, then subtract that from **360**, which is what 6:00 AM is worth.

> [!TIP]
> If your answer is off by a multiple of 59, that's the order of operations — the hour has to be multiplied by 60 *before* the minutes are added. Brackets make it obvious: `(hour * 60) + minute`.

`dotnet test Lab.Checks`: **3 / 5.** The program now counts down properly — **225 minutes until sunrise**.

### Task 4 in full

**Check:** `Check4_TheHoursIncludeThePartHours`

Given minutes already broadcast, return how many **hours** that is — including the part hours.

```
330 minutes  →  5.5
90 minutes   →  1.5
60 minutes   →  1
```

> [!CAUTION]
> **This is the one you watched break during the demo.** The obvious answer is wrong, it's wrong *silently*, and there is no error and no warning of any kind:
>
> ```csharp
> return minutes / 60;      // 330 minutes -> 5.   Not 5.5.
> ```
>
> Both sides are whole numbers, so C# does whole-number division and drops the remainder — **before** the answer ever becomes a `double`. [The full explanation is in the notes](../lecture-notes.md#whole-numbers-and-real-numbers), and the fix is one character:
>
> ```csharp
> return minutes / 60.0;
> ```

In Python 3 you'd have got 5.5 without thinking about it. This is the single most common way a Python habit produces a wrong answer in C#, which is why it's a whole check.

`dotnet test Lab.Checks`: **4 / 5.** The program says **5.5 hours on air** now, where a minute ago it said 5.

### Task 5 in full

**Check:** `Check5_TheOwlKnowsWhenItsLate`

The overnight block runs **22:00 through 05:59**. Return `true` when the hour you're given (0–23) is inside it.

```
22, 23, 0, 1, 3, 5   →  true
6, 9, 12, 17, 21     →  false
```

The block **wraps past midnight**, which makes this more interesting than it looks — an hour counts if it's late enough **or** early enough. Write it yourself before you look:

```csharp
return hour >= 22 || hour < 6;
```

Check the two boundaries when you're done: **6 is not overnight, and 22 is.** Off-by-one at a boundary is the way this one usually fails.

`dotnet test Lab.Checks`: **5 / 5.** The Owl is on the air. 🦉

## Rules

> [!IMPORTANT]
> - **Never edit `Lab.Checks`** — it's how you know you're done, and next week it's how I know too.
> - Don't rename `Broadcast`, or its methods. The checks find them by name.
> - `Program.cs` is fine as it is. If you want to play with it, finish the checks first.

## 🆘 Stuck?

- **`error CS1002: ; expected`** — a missing semicolon, and about half the time it's on the line *above* the one named.
- **`error CS0161: not all code paths return a value`** — a method that promises a `string` has a route through it that returns nothing. Usually a `return` inside an `if` with nothing after it.
- **`error CS0029: Cannot implicitly convert type 'string' to 'int'`** — the type in front of the method name and the thing you're returning don't match.
- **The sign-on prints `{djName}` literally** — missing `$` before the opening quote.
- **Check 2 passes for Marisol but the message mentions Ford** — the name is typed into the text instead of coming from the parameter. A method has to work for every value it's handed.
- **Check 4 says you returned 5** — [whole ÷ whole = whole](../lecture-notes.md#whole-numbers-and-real-numbers). Put `.0` on one side.
- **Check 5 is never true** — you have `&&` where you need `||`.
- **`MSB1003: Specify which project or solution file to use`** — you're in the wrong folder. Go up to the one holding *both* project folders.
- **`dotnet test` says it can't find `Lab.Checks`** — same cause, same fix.
- The [troubleshooting appendix](../lecture-notes.md#appendix-troubleshooting) covers the rest.

## 🚀 Done early?

You will be. These are real, and the first one is the most useful thing you can do tonight.

- ⭐ **Prove the split to yourself.** Cut `HoursOnAir` out of `Broadcast.cs`, paste it at the bottom of `Program.cs`, mark it `public static`, and run the checks. Watch check 4 stop being able to find it *at all* — `public` doesn't help, and neither does anything else. Then put it back. That's five minutes and it's the idea the whole course rests on.
- **Break check 4 the silent way.** Change `60.0` back to `60`, run, and read the failure message — not the number, the message. It's telling you the same thing the generator fuel told you in the demo, and it's the shape of every failure message you'll get this term.
- **Make the sign-on know what time it is.** Feed `SignOn` an hour as well as a name, and have it say something different before 3 AM than after.
- **Print the sunrise countdown as hours and minutes** instead of a lump of minutes. `/` and `%` together will do it. ⚠️ Watch the `/` — you now know exactly what it does to whole numbers.
- **Add a method of your own** — `Broadcast.NextTrackIn(int minutes)`, or a station ident that changes with the hour. Nothing checks it. That's rather the point.
