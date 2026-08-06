# Week 2 Lab — The Caller Line 📻

It's 2:04 AM at **KDXR 88.1, "The Owl."** The desk you finished last week is holding the station together nicely — and then the phone lights up. Everything a caller says arrives as text typed by a tired human, and the day shift's code believes every word of it. (The software on this desk is older than the DJ, by the way. The station likes it that way.)

**Time:** ~60 minutes in class — **in-class target: all five green, then run a shift nobody can crash.**

> [!NOTE]
> **Missed week 1, or didn't finish the lab?** You're not behind. `Broadcast.cs` ships in tonight's starter **already finished** — the desk is on the air before you touch anything, and all of tonight's work is in a new file.

## Setup

Three steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

**1. Confirm your coursework window is open.** If VS Code is already showing `dotnet-db-coursework` from last week — done, skip to step 2. Otherwise: **File → Open Folder → `dotnet-db-coursework` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder?** Make it now: File → Open Folder → *New Folder* → name it `dotnet-db-coursework` → Open. It starts empty; the next two steps fill it.

**2. Update your starters clone — from the terminal you already have.** `` Ctrl+` `` (it opens standing at the top of your repo), then:

```bash
cd ../dotnet-db-starters
git pull
cd ../dotnet-db-coursework
```

One hop sideways into the clone (it sits right next to your repo, [the way setup left them](../../week-01/setup-guide.md#then-clone-the-starters)), pull, hop back.

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it. From the same terminal:
> ```bash
> cd ..
> git clone https://github.com/jgrissom/dotnet-db-starters.git
> cd dotnet-db-coursework
> ```
> Now the two folders sit side by side, and the pull above will work every week after.

**3. Drag this week in — one folder, in your file manager.**

Open **Finder** (Mac) or **File Explorer** (Windows):

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-02`**.
2. **Copy it** (don't drag-move — the clone keeps its copy).
3. Go into `dotnet-db-coursework` → **Paste**.

It appears in your VS Code Explorer immediately — nothing to reopen. That one folder is the whole week:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/                ← last week, untouched
└─ week-02/                ← the folder you just pasted
   ├─ Lab/                 ← the station — tonight's work happens in here
   ├─ Lab.Checks/          ← the lab's checks — read-only, never edit
   ├─ Homework/            ← your station — the homework builds this
   └─ Homework.Checks/     ← the homework's checks — read-only, never edit
```

**Then run the checks** — from the terminal, naming the week:

```bash
dotnet test week-02/Lab.Checks
```

**1 / 5 passing.** Check 1 is last week's desk, shipped finished and still on the air. The other four are tonight.


**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 2: starter
```
> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-02/Lab.Checks` and `dotnet run --project week-02/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

| File | What you do to it |
|---|---|
| `Lab/CallerLine.cs` | **everything.** Three methods to write, one to fix |
| `Lab/Broadcast.cs` | last week's desk, finished — don't touch it |
| `Lab/Program.cs` | **the shift.** You run it and live in it; you don't edit it |
| `Lab.Checks/` | **never edit.** It's how you know you're done |
| `Homework/`, `Homework.Checks/` | tonight: nothing. They're the homework's starting point |

> [!NOTE]
> **New this week: the checks feed your methods input that lies.** Several of them hand your code `null`, blank text, and answers that only claim to be numbers. A method that crashes fails the check exactly as hard as one that's wrong — and the failure message tells you which happened. [The notes cover every tool you need.](../lecture-notes.md#parse-believes-tryparse-asks)

## The tasks

**Run the checks after every task.** Each one turns exactly one more check green, and the number tells you where you are.

**Commit every time a check goes green.** Three clicks in the Source Control view, and each task below hands you the message to paste. Nobody collects this lab — the habit is the point, and it's the one your repo gets graded on every week from here.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Run the program — and crash it with your own typing. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheLineCanBeDead` | A name for every caller — even [the ones who are `null`](../lecture-notes.md#readline-and-null). **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheMarkerHasToBeReal` | Is what the DJ typed [really a mile marker](../lecture-notes.md#parse-believes-tryparse-asks)? **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `RayCanSayAnything` | Fix the day shift's method — ⚠️ it ships **already wrong**. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `EveryCallGetsAnAnswer` | The on-air line, built from your own methods. **[Task 5 in full ↓](#task-5-in-full)** |

### Task 1 in full

**Check 1 is already green** — this task is about working a shift, and then ending it early.

**Start your shift and take a few calls politely:**

```bash
dotnet run --project week-02/Lab
```

Sign on with your name. The phone lights up: give a caller's name, a request. It lights up again — calls keep coming until you type `q`. **When the caller is `ray`**, the desk asks where he's at instead; answer with a number, like `240`, and his position gets logged. Take three or four calls, then `q` to end the shift.

Works fine — though some of the output is blank or lying. Those are your unwritten methods, same as last week.

**Now start another shift, and when Ray calls, answer the way Ray actually talks:** `somewhere past the truck stop`. Or `mile two-forty`. Or just press Enter.

💥 **`Unhandled exception. System.FormatException`** — the whole shift is down, mid-call, and your typing did it. Read the crash before you fix anything: the exception **type**, the message (it names your exact input), and the line — it points into `WhereIsRay`, in `Lab/CallerLine.cs`. Open that file and find the `int.Parse`. That's the day shift's work. It believes people.

```bash
dotnet test week-02/Lab.Checks
```

Still **1 / 5.** Now go earn the rest.

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

```bash
dotnet test week-02/Lab.Checks
```

**2 / 5.**

**Green? Commit it** — same three clicks:

```
week 2 lab: every caller gets a name
```

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

```bash
dotnet test week-02/Lab.Checks
```

**3 / 5.**

**Green? Commit it.** You're somewhere solid, and that's when a commit happens:

```
week 2 lab: the marker has to be real
```

⚠️ **Notice what the *Changes* list doesn't show: no `bin/`, no `obj/`.** The four lines you wrote in week 1 have been quietly covering this brand-new folder since the moment you pasted it in.

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

**Then re-run Task 1's crash:** start a shift, call in as `ray`, and answer with the exact sentence that killed the desk twenty minutes ago. **The shift doesn't die anymore** — Ray gets logged as out there somewhere, and the phone lights up for the next call. That run is what tonight is for.

```bash
dotnet test week-02/Lab.Checks
```

**4 / 5.**

**Commit again** — same three clicks, new message:

```
week 2 lab: Ray can say anything
```

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

```bash
dotnet test week-02/Lab.Checks
```

**5 / 5.** Now pull a real shift:

```bash
dotnet run --project week-02/Lab
```

Be the worst night of calls the desk has ever had — blank names, blank requests, Ray answering in riddles, all of it. Every call gets a civil answer, and the phone keeps ringing until *you* type `q`. **The Owl stays on the air.** 🦉

And read the desk's sign-off. It counted your calls — and it can't tell you a single thing about them. Sit with that for a second before you close the terminal.

**Then clock out — commit the shift**, the same way you did after Tasks 3 and 4:

```
week 2 lab: the desk survives its callers
```

**That's three commits, and you didn't set out to make any of them** — you just saved every time you got somewhere solid. That's the habit, it's [what the homework grades](../homework.md#part-3--repo-hygiene-graded), and it means the risky stretches always have a save point behind them.

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. Or just skip this; the homework's push collects everything either way.

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
- **`MSB1003: Specify which project or solution file to use`** — the command ran without its week in front. From the top it is always `dotnet test week-02/Lab.Checks` — week first, then the project.
- The [troubleshooting appendix](../lecture-notes.md#appendix-troubleshooting) covers the rest.

## 🚀 Done early?

You will be. These are real, and the first one closes tonight's loop.

- ⭐ **Make the warning come back.** In `WhereIsRay`, you deleted the day shift's `int.Parse(typed ?? "")`. Retype just that line somewhere — without the `?? ""` — and look at the squiggle: **`CS8604`, warning you about `null`**. That squiggle was pointing at half of tonight's crash all along, on the day shift's original line, and everyone scrolled past it. Read it, believe it, delete the line.
- **Crash-proof the DJ too.** `Program.cs` reads the DJ's name with `?? "somebody"`. Route it through `CallerName` instead and see what changes when you sign on with a fistful of spaces.
- **Give the desk opinions.** A request for anything containing `"freebird"` gets `"For {name}: no."` — the check doesn't mind extra behaviour, as long as Dorothy still gets her strings.
- **Count Ray down.** When the marker's real, add how many *hours* to the state line at 65 mph. ⚠️ You know exactly what `/` does to two whole numbers — week 1's break, still armed.
- **Add a method of your own** — `CallerLine.IsRegular(string? name)`, a caller log line, whatever the desk needs. Nothing checks it. That's rather the point.
