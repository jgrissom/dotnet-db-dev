# Week 2 Lab — The Caller Line 📻

It's 2:04 AM at **KDXR 88.1, "The Owl."** The desk you finished last week is holding the station together nicely — and then the phone lights up. Everything a caller says arrives as text typed by a tired human, and the day shift's code believes every word of it.

**Time:** ~60 minutes in class — **in-class target: all five green, then try to crash your own desk and fail.**

> [!NOTE]
> **Missed week 1, or didn't finish the lab?** You're not behind. `Broadcast.cs` ships in tonight's starter **already finished** — the desk is on the air before you touch anything, and all of tonight's work is in a new file.

## Setup

**1. Update your clone of the course repo:**

```bash
cd dotnet-db-dev
git pull
```

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it yet — one command, from your home folder, then the two above:
> ```bash
> git clone https://github.com/jgrissom/dotnet-db-dev.git
> ```

**2. Make a `week-02` folder inside your `dotnet-db-coursework` folder** — a new week, the same move:

**VS Code → File → Open Folder → `dotnet-db-coursework` → *New Folder* → name it `week-02` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder?** Make that one first, the same way, then `week-02` inside it. (It's also fine that your `week-01` is sitting next to it — that's the whole idea.)

**3. Copy the two folders inside `week-02/lab/starter` into your `week-02`.** Out of the clone, never working inside it:

```
├─ dotnet-db-coursework/week-02/       ← INTO here
└─ dotnet-db-dev/week-02/lab/starter/  ← FROM here
```

```
dotnet-db-coursework/
├─ week-01/           ← last week, untouched
└─ week-02/           ← keep THIS open in VS Code
   ├─ Lab/            ← the station — ALL your work happens in here
   └─ Lab.Checks/     ← the checks — read-only, never edit
```

**4. With `week-02` open**, in the VS Code terminal (`` Ctrl+` ``):

```bash
dotnet test Lab.Checks
```

**1 / 5 passing.** Check 1 is last week's desk, shipped finished and still on the air. The other four are tonight.

> [!CAUTION]
> **Same rule as every week:** `dotnet test Lab.Checks` and `dotnet run --project Lab` both run from **`week-02`** — the folder holding **both** project folders. Never from inside either one. **You never `cd` anywhere.**

## Where tonight's work happens

| File | What you do to it |
|---|---|
| `Lab/CallerLine.cs` | **everything.** Three methods to write, one to fix |
| `Lab/Broadcast.cs` | last week's desk, finished — don't touch it |
| `Lab/Program.cs` | read it, run it — it's how you crash the desk in Task 1 |
| `Lab.Checks/` | **never edit.** It's how you know you're done |

> [!NOTE]
> **New this week: the checks feed your methods input that lies.** Several of them hand your code `null`, blank text, and answers that only claim to be numbers. A method that crashes fails the check exactly as hard as one that's wrong — and the failure message tells you which happened. [The notes cover every tool you need.](../lecture-notes.md#parse-believes-tryparse-asks)

## The tasks

**Run the checks after every task.** Each one turns exactly one more check green, and the number tells you where you are.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Run the program — and crash it with your own typing. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheLineCanBeDead` | A name for every caller — even [the ones who are `null`](../lecture-notes.md#readline-and-null). **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheMarkerHasToBeReal` | Is what the DJ typed [really a mile marker](../lecture-notes.md#parse-believes-tryparse-asks)? **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `RayCanSayAnything` | Fix the day shift's method — ⚠️ it ships **already wrong**. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `EveryCallGetsAnAnswer` | The on-air line, built from your own methods. **[Task 5 in full ↓](#task-5-in-full)** |

### Task 1 in full

**Check 1 is already green** — this task is about breaking something on purpose.

**Run the station and take the calls politely.** Answer the caller's name, a request, and give Ray's position as a number, like `240`:

```bash
dotnet run --project Lab
```

Works fine. Some of the output is blank or lying — those are your unwritten methods, same as last week.

**Now run it again, and when it asks where Ray is, answer the way Ray actually talks:** `somewhere past the truck stop`. Or `mile two-forty`. Or just press Enter.

💥 **`Unhandled exception. System.FormatException`** — the desk is down, and your typing did it. Read the crash before you fix anything: the exception **type**, the message (it names your exact input), and the line — it points into `WhereIsRay`, in `Lab/CallerLine.cs`. Open that file and find the `int.Parse`. That's the day shift's work. It believes people.

`dotnet test Lab.Checks`: still **1 / 5.** Now go earn the rest.

### Task 2 in full

**Check:** `Check2_TheLineCanBeDead`

In `CallerLine.cs`, make `CallerName` return the caller's name with the spare spaces trimmed — and when there's no usable name at all (`null`, empty, or only whitespace), return exactly **`"some night owl"`**, the desk's word for a caller who won't say.

```csharp
public static string CallerName(string? typed)
{
    if (string.IsNullOrWhiteSpace(typed))
    {
        return "some night owl";
    }
    return typed.Trim();
}
```

Two things worth noticing:

- **`IsNullOrWhiteSpace` is one question that covers three situations** — `null`, `""`, and `"   "` are all "nobody there", and [they all need the same answer](../lecture-notes.md#readline-and-null).
- **The order is load-bearing.** `.Trim()` on a `null` is itself a crash — test for nothing *first*. (That's also why the compiler's null warning goes quiet here: it can see `null` can't reach the `Trim`.)

`dotnet test Lab.Checks`: **2 / 5.**

### Task 3 in full

**Check:** `Check3_TheMarkerHasToBeReal`

Ray's stretch of interstate runs **mile 1 to mile 400**. `IsOnTheStretch` gets whatever the DJ typed and returns `true` only for a whole number in that range.

This is [the `TryParse` idiom](../lecture-notes.md#parse-believes-tryparse-asks), and the whole method is one line:

```csharp
public static bool IsOnTheStretch(string? typed)
{
    return int.TryParse(typed, out int marker) && marker >= 1 && marker <= 400;
}
```

- **`TryParse` never throws** — words, blanks, even `null` just come back `false`. It also shrugs off spaces around a number on its own.
- **Parsing and believing are different steps.** `"9000"` parses perfectly and is still nowhere Ray can be — that's what the range check after the `&&` is for. (The `&&` only runs its right side when the parse succeeded, which is why `marker` is safe to look at there.)

`dotnet test Lab.Checks`: **3 / 5.**

### Task 4 in full

**Check:** `Check4_RayCanSayAnything`

This is the method that crashed the desk in Task 1, and now you know everything you need to fix it. **Keep the working half working:** a real marker on the stretch still gets the mile line. Everything else — words, nothing, mile 9000 — gets the desk's standard answer, exactly:

```
Ray's out there somewhere. He'll call back.
```

```csharp
public static string WhereIsRay(string? typed)
{
    if (int.TryParse(typed, out int marker) && marker >= 1 && marker <= 400)
    {
        return $"Ray at mile {marker} - {400 - marker} to go on his stretch.";
    }
    return "Ray's out there somewhere. He'll call back.";
}
```

Same tool as Task 3 — deliberately. If you'd rather call your own `IsOnTheStretch` as the guard, that's correct too.

**Then re-run Task 1's crash:** `dotnet run --project Lab`, and answer Ray's line with anything you like. **The desk doesn't die anymore.** That run — the same sentence that killed it twenty minutes ago, now getting a civil answer — is what tonight is for.

`dotnet test Lab.Checks`: **4 / 5.**

### Task 5 in full

**Check:** `Check5_EveryCallGetsAnAnswer`

`TakeRequest` builds the line the DJ reads on air, from a name and a request, shaped like:

```
For Dorothy: something with strings.
```

The rules, and both are checked:

- **The name goes through `CallerName` — call it, don't redo the trimming.** Task 2 already knows what to call a nameless caller; two places that both know the rule is one place too many. (Sound familiar? It's week 1's `CallSign()` lesson wearing a new shirt.)
- **A `null` or blank request becomes exactly `"dealer's choice"`** — same `IsNullOrWhiteSpace` shape as Task 2.

```csharp
public static string TakeRequest(string? name, string? request)
{
    string track = string.IsNullOrWhiteSpace(request) ? "dealer's choice" : request.Trim();
    return $"For {CallerName(name)}: {track}.";
}
```

(That `? :` is the conditional operator — an `if`/`else` that fits inside an expression. Writing it as a full `if` is exactly as correct.)

`dotnet test Lab.Checks`: **5 / 5.** Now run the program one last time and answer every prompt as badly as you can. **The Owl stays on the air.** 🦉

## Rules

> [!IMPORTANT]
> - **Never edit `Lab.Checks`** — it's how you know you're done.
> - **Don't touch `Broadcast.cs`** — it shipped finished, and check 1 goes red if it changes.
> - Don't rename `CallerLine` or its methods. The checks find them by name.
> - The exact strings matter: `"some night owl"`, `"dealer's choice"`, and Ray's standard line are the desk's house style, and the checks compare them exactly.

## 🆘 Stuck?

- **`FormatException` when you run the program** — that's Task 1 doing its job. If it's *still* happening after Task 4, an `int.Parse` survived somewhere — search `CallerLine.cs` for `Parse` and make sure only `TryParse` remains.
- **`NullReferenceException` in `CallerName`** — `.Trim()` ran before the nothing-check. [Test first, trim second.](../lecture-notes.md#readline-and-null)
- **Check 2 wants `"some night owl"` exactly** — capitals and spelling count; the on-air line is built from it.
- **Check 3 fails on `"9000"`** — parsing succeeded and belief followed. Add the range check after the `&&`.
- **Check 3 fails on `"0"`** — the stretch starts at mile **1**. `>= 1`, not `>= 0`.
- **Check 4 passes garbage but fails `"9000"`** — your `WhereIsRay` parses but doesn't range-check. Same guard as Task 3.
- **Check 5 shows `For   Ray  :` with the spaces still in** — the name didn't go through `CallerName`. Call it; don't re-trim.
- **`error CS8936` or complaints about `out`** — the `out int marker` goes *inside* the `TryParse(...)` brackets, [exactly as the notes show](../lecture-notes.md#parse-believes-tryparse-asks).
- **`MSB1003: Specify which project or solution file to use`** — wrong folder. Go up to `week-02`, the one holding *both* project folders.
- The [troubleshooting appendix](../lecture-notes.md#appendix-troubleshooting) covers the rest.

## 🚀 Done early?

You will be. These are real, and the first one closes tonight's loop.

- ⭐ **Make the warning come back.** In `WhereIsRay`, you deleted the day shift's `int.Parse(typed ?? "")`. Retype just that line somewhere — without the `?? ""` — and look at the squiggle: **`CS8604`, warning you about `null`**. That squiggle was pointing at half of tonight's crash all along, on the day shift's original line, and everyone scrolled past it. Read it, believe it, delete the line.
- **Crash-proof the DJ too.** `Program.cs` reads the DJ's name with `?? "somebody"`. Route it through `CallerName` instead and see what changes when you sign on with a fistful of spaces.
- **Give the desk opinions.** A request for anything containing `"freebird"` gets `"For {name}: no."` — the check doesn't mind extra behaviour, as long as Dorothy still gets her strings.
- **Count Ray down.** When the marker's real, add how many *hours* to the state line at 65 mph. ⚠️ You know exactly what `/` does to two whole numbers — week 1's break, still armed.
- **Add a method of your own** — `CallerLine.IsRegular(string? name)`, a caller log line, whatever the desk needs. Nothing checks it. That's rather the point.
