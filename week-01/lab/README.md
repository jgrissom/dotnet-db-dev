# Week 1 Lab — KDXR Signs On 📻

It's 11:58 PM and you're the overnight desk at **KDXR 88.1, "The Owl."** The sign-on sequence runs off this terminal, the way it has since 1987, and four of its five pieces are missing.

**Time:** ~40 minutes in class — **in-class target: checks 1–4 green.** Check 5 is small, and it's fine if it goes home with you.

## Setup

**1. Update your clone of the course repo:**

```bash
cd dotnet-db-dev && git pull
```

**2. Copy the `week-01/lab/starter` folder out to wherever you keep your projects, and rename the copy** — `KDXRLab` works. (Copy it *out*; never work inside the clone, or next week's `git pull` will fight your edits.)

```
KDXRLab/              ← the folder you copied and renamed
├─ KDXR/             ← the station — ALL your work happens in here
└─ KDXR.Checks/      ← the checks — read-only, never edit
```

**3. Open `KDXRLab` in VS Code** — the folder that *contains* both project folders.

**4. In the VS Code terminal, from that same folder:**

```bash
dotnet test KDXR.Checks
```

**1 / 5 passing.** Check 1 is the station you were handed, already on the air. The other four are tonight.

> [!CAUTION]
> **The folder split trips everybody, all term.** `dotnet test KDXR.Checks` and `dotnet run --project KDXR` both run from the folder holding **both** project folders — the one you opened in VS Code. Not from inside `KDXR`, and never from inside `KDXR.Checks`.

## Where tonight's work happens

| File | What you do to it |
|---|---|
| `KDXR/Broadcast.cs` | **everything.** Four methods to fill in |
| `KDXR/Program.cs` | read it, don't change it — it's what a human sees |
| `KDXR.Checks/` | **never edit.** It's how you know you're done |

> [!NOTE]
> **Notice what the checks never look at: your output.** They call your methods and inspect what comes back. That's why `Broadcast.cs` exists separately from `Program.cs` — and it's the shape [every homework this term asks for](../lecture-notes.md#the-class-is-a-box-to-put-methods-in).

## The tasks

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
dotnet run --project KDXR
```

It asks who's on duty, then prints a sign-on that's blank, a countdown that says 0, and a number of hours that's also 0. Everything it's lying about is one of tonight's four methods.

**Then open `KDXR/Broadcast.cs` and read it.** Every method is [a `def` with the types written down](../lecture-notes.md#a-method-is-a-def-with-the-types-written-down):

```csharp
public static string SignOn(string djName)
```

...means *"give me a `string` called `djName`, and I'll give you back a `string`."* The word in front of the name is what comes **out**.

`CallSign()` is done for you. It's the one to copy the shape from.

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

- **The `$` before the quote** is what makes `{djName}` become the name instead of printing literally. It's [Python's f-string with the letter moved](../lecture-notes.md#putting-values-into-text).
- **`CallSign()` is *called*, not retyped.** Two places that both know the station's name is one place too many — and the check tests this indirectly by asking for a second DJ's sign-on.

The words between the braces are yours. Make it sound like 3 AM.

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
> If you're off by exactly 60 somewhere, check the order of operations — the hour has to be multiplied by 60 *before* the minutes are added. Brackets make it obvious: `(hour * 60) + minute`.

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

### Task 5 in full

**Check:** `Check5_TheOwlKnowsWhenItsLate`

The overnight block runs **22:00 through 05:59**. Return `true` when the hour you're given (0–23) is inside it.

```
22, 23, 0, 1, 3, 5   →  true
6, 9, 12, 17, 21     →  false
```

The block **wraps past midnight**, which makes this more interesting than it looks. An hour counts if it's late enough **or** early enough:

```csharp
return hour >= 22 || hour < 6;
```

⚠️ **`||` means "or", and `&&` means "and".** It has to be `||` here — no single hour is ever both `>= 22` and `< 6`, so `&&` could never be true for anything.

Check the two boundaries when you're done: **6 is not overnight, and 22 is.**

`dotnet test KDXR.Checks`: **5 / 5.** The Owl is on the air. 🦉

## Rules

> [!IMPORTANT]
> - **Never edit `KDXR.Checks`** — it's how you know you're done, and next week it's how I know too.
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
- **`dotnet test` says it can't find `KDXR.Checks`** — same cause, same fix.
- The [troubleshooting appendix](../lecture-notes.md#appendix-troubleshooting) covers the rest.

## 🚀 Done early?

- **Make the sign-on know what time it is.** Feed `SignOn` an hour as well as a name, and have it say something different before 3 AM than after. (`if` works exactly like Python's, with braces instead of a colon.)
- **Add a method of your own** — `Broadcast.NextTrackIn(int minutes)`, or a station ident that changes with the hour. Nothing checks it. That's rather the point.
- **Break something deliberately and read the error.** Assign a `string` to an `int`. Delete a semicolon. Return the wrong type. You'll see all three for real this term, and they're cheaper to meet now, on purpose, than at 11 PM on a Sunday.
- **Print the sunrise countdown as hours and minutes** instead of a lump of minutes. `/` and `%` together will do it — and `%` is one of the few operators that behaves exactly like Python's.
