# Week 3 Lab — The Night's Log 📻

It's 2 AM at **KDXR 88.1, "The Owl."** Last week you made the desk survive its callers — anything anybody says, it answers politely and stays on the air. And then at the end of your shift it told you how many calls you'd taken and **not one single thing about any of them.**

Tonight the desk gets a memory. (The software is still older than the DJ. The station still likes it that way.)

**Time:** ~60 minutes in class — **in-class target: all five green, then lose the whole night.**

> [!NOTE]
> **Missed week 2, or didn't finish the lab?** You're not behind. `CallerLine.cs` ships in tonight's starter **already finished** — the desk answers the phone before you touch anything, and all of tonight's work is in a new file.

## Setup

Three steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

**1. Confirm your coursework window is open.** If VS Code is already showing `dotnet-db-coursework` from last week — done, skip to step 2. Otherwise: **File → Open Folder → `dotnet-db-coursework` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder at all?** Then you're starting from scratch, which is fine — [week 1's setup guide](../../week-01/setup-guide.md) makes it and connects it to GitHub. Do that first; nothing tonight depends on having been here last week.

**2. Update your starters clone — from the terminal you already have.** `` Ctrl+` `` (it opens standing at the top of your repo), then:

```bash
cd ../dotnet-db-starters
git pull
cd ../dotnet-db-coursework
```

One hop sideways into the clone, pull, hop back.

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it. From the same terminal:
> ```bash
> cd ..
> git clone https://github.com/jgrissom/dotnet-db-starters.git
> cd dotnet-db-coursework
> ```
> Now the two folders sit side by side, and the pull above will work every week after.

**3. Copy this week in — one command, from the same terminal.**

You haven't moved: step 2 left you standing at the top of your repo, which is exactly where this runs.

```bash
cp -r ../dotnet-db-starters/week-03 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-03` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-03`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — nothing to reopen:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ week-02/
└─ week-03/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — tonight's work happens in here
   ├─ Lab.Checks/          ← the lab's checks — read-only, never edit
   ├─ Homework/            ← your station — the homework builds this
   └─ Homework.Checks/     ← the homework's checks — read-only, never edit
```

**Then run the checks** — from the terminal, naming the week:

```bash
dotnet test week-03/Lab.Checks
```

**1 / 5 passing.** Check 1 is weeks 1 and 2, shipped finished and still on the air. The other four are tonight.

> [!IMPORTANT]
> **The first run will pause for a few seconds and print something about `Spectre.Console`.** That's NuGet fetching this week's package — the one the demo added — because tonight's project asks for it in `Lab.csproj`. **Nothing is being installed on your machine**, and it only happens once. If it fails outright, you're offline: [see 🆘 Stuck?](#-stuck)

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 3: starter
```

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-03/Lab.Checks` and `dotnet run --project week-03/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

| File | What you do to it |
|---|---|
| `Lab/RequestLog.cs` | **everything.** Four methods to write |
| `Lab/Call.cs` | one call — who rang, what went out. Ships finished, don't touch |
| `Lab/CallerLine.cs` | last week's desk, finished — don't touch it, but **do call it** |
| `Lab/Broadcast.cs` | week 1's desk, finished — don't touch it |
| `Lab/Program.cs` | **the shift.** You run it and live in it; nothing tonight asks you to edit it |
| `Lab.Checks/` | **never edit.** It's how you know you're done |
| `Homework/`, `Homework.Checks/` | tonight: nothing. They're the homework's starting point |

> [!NOTE]
> **Your two collections are already declared at the top of `RequestLog.cs`** — a `List<Call>` called `Tonight` and a `Dictionary<string, int>` called `Regulars`. They start empty. Every method you write tonight either puts something in one of them or asks one of them a question.

## The tasks

**Run the checks after every task, and then run the program.** Each task turns exactly one more check green — **1 → 2 → 3 → 4 → 5, one per round** — and each one changes something you can *see* on the board at the end of your shift. If a task doesn't change what you see, something's wrong.

**Commit every time a check goes green.** Three clicks in the Source Control view, and each task below hands you the message to paste. Nobody grades these; [the homework counts its own commits](../homework.md#part-3--repo-hygiene-graded), separately. This is practice with the safety on.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Work a shift, and look at what the desk can't tell you. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheNightIsKept` | The desk starts [keeping the calls](../lecture-notes.md#listt--the-collection-that-grows). **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheDeskKnowsItsRegulars` | Count the callers — and [survive a stranger](../lecture-notes.md#reading-a-key-that-isnt-there-is-a-crash). **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheDeskKnowsWhoWontStop` | [Walk the dictionary](../lecture-notes.md#walking-a-dictionary) and find who won't stop. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheShiftAddsUp` | The sign-off — and then the part tonight is really about. **[Task 5 in full ↓](#task-5-in-full)** |

### Task 1 in full

**Check 1 is already green** — this task is about seeing the hole before you fill it.

**Start your shift and take a few calls:**

```bash
dotnet run --project week-03/Lab
```

Sign on with your name. The phone lights up: give a caller's name, then what they want to hear. Calls keep coming until you type `q`. Take three or four, then `q`.

Now look at what came up at the end of your shift:

```
── the night so far ─────────────────────────────────────
╭───┬────────┬────────╮
│ # │ CALLER │ ON AIR │
╰───┴────────┴────────╯
╭─────┬───────╮
│ WHO │ CALLS │
╰─────┴───────╯
most calls tonight: 

KDXR - 
Keep it quiet out there.
```

*(The `──` rule stretches to fit your terminal, so yours will be longer or shorter than what's printed here. Everything else should match.)*

**Two tables with headings and nothing underneath them.** That's the shape of the night with the night missing — you took four calls and the desk has nowhere to put a single one. The blanks after `most calls tonight:` and `KDXR -` are your unwritten methods, same as every week.

⚠️ **Notice that the tables drew themselves anyway.** That's this week's package doing its job before you've written a line — the columns are there, they're just empty.

```bash
dotnet test week-03/Lab.Checks
```

Still **1 / 5.** Now go and fill it in.

### Task 2 in full

**Check:** `Check2_TheNightIsKept`

`Log` takes a call: it builds the line the DJ reads on air, **keeps it**, and hands it back so the shift can print it.

You're not building that line yourself — [last week's method already does](../../week-02/lecture-notes.md#parse-believes-tryparse-asks), and so does the one that cleans up a caller's name. Call them.

```csharp
public static string Log(string? caller, string? request)
{
    string name = CallerLine.CallerName(caller);
    string onAir = CallerLine.TakeRequest(caller, request);

    Tonight.Add(new Call(name, onAir));

    return onAir;
}
```

Two things worth noticing:

- **`Tonight.Add(...)` is the whole difference between this week and last week.** A `List<Call>` starts empty and grows on the end; nothing has to be resized and nothing gets replaced.
- **The line is built once and used twice** — stored and returned. Two places that both know how to write an on-air line is one place too many, which is week 1's lesson wearing its third shirt.

Now work a shift and watch it happen:

```bash
dotnet run --project week-03/Lab
```

Sign on, then take these two calls, then `q`:

| *Who's calling?* | *What do they want to hear?* |
|---|---|
| `Dorothy` | `something with strings` |
| `Bex` | `that one again` |

**Expect the board to have rows in it for the first time:**

```
╭───┬─────────┬──────────────────────────────────────╮
│ # │ CALLER  │ ON AIR                               │
├───┼─────────┼──────────────────────────────────────┤
│ 1 │ Dorothy │ For Dorothy: something with strings. │
│ 2 │ Bex     │ For Bex: that one again.             │
╰───┴─────────┴──────────────────────────────────────╯
```

Seen it? Now let the checks agree with you:

```bash
dotnet test week-03/Lab.Checks
```

**2 / 5.**

**Green? Commit it:**

```
week 3 lab: the desk keeps the night
```

### Task 3 in full

**Check:** `Check3_TheDeskKnowsItsRegulars`

Some people ring every night. The desk should know.

**First, go back into `Log`** and count the caller as well as keeping the line — an `if`/`else`, just above the `return`:

```csharp
    if (Regulars.ContainsKey(name))
    {
        Regulars[name] = Regulars[name] + 1;
    }
    else
    {
        Regulars[name] = 1;
    }
```

The first time somebody rings there's no number to add to, so there are genuinely two cases. **Assigning a key that doesn't exist is fine — that's what creates it.**

**Then write `TimesCalled`**, which is the other half:

```csharp
public static int TimesCalled(string? caller)
{
    string name = CallerLine.CallerName(caller);

    if (Regulars.TryGetValue(name, out int calls))
    {
        return calls;
    }
    return 0;
}
```

⚠️ **`return Regulars[name];` is the obvious version and it is a crash.** Reading a key the dictionary hasn't got throws `KeyNotFoundException` — and "somebody who has never called before" is the most ordinary question this method will ever be asked. [`TryGetValue` asks first](../lecture-notes.md#reading-a-key-that-isnt-there-is-a-crash), and it is the same shape as last week's `int.TryParse`.

💡 **Both methods put the name through `CallerName` first.** That's what makes `Dorothy` and `  Dorothy  ` the same person instead of two regulars.

Now run a shift where somebody calls twice:

```bash
dotnet run --project week-03/Lab
```

| *Who's calling?* | *What do they want to hear?* |
|---|---|
| `Dorothy` | `something with strings` |
| `Bex` | `that one again` |
| `Dorothy` | `the slow one` |

**On Dorothy's second call, the desk notices:**

```
  that's call number 2 tonight from Dorothy.
```

**And the second table has filled in:**

```
╭─────────┬───────╮
│ WHO     │ CALLS │
├─────────┼───────┤
│ Dorothy │ 2     │
│ Bex     │ 1     │
╰─────────┴───────╯
```

🎯 **Stop and compare the two tables for a second.** Three rows in the first, two in the second — three calls, two callers. **That's the entire difference between a `List` and a `Dictionary`, sitting on your own screen.** The list keeps every call in order; the dictionary keeps one entry per person and counts.

Now let the checks agree with you:

```bash
dotnet test week-03/Lab.Checks
```

**3 / 5.**

**Green? Commit it:**

```
week 3 lab: the desk knows its regulars
```

### Task 4 in full

**Check:** `Check4_TheDeskKnowsWhoWontStop`

Who rang the most tonight? The dictionary knows, but it won't just tell you — **you have to walk it.** [The notes show the walk](../lecture-notes.md#walking-a-dictionary): a `foreach` that visits every pair in turn. That version prints them as it goes; yours has to *remember* the best one it has seen.

**Two variables before the loop** — the leading name so far, and the highest count so far — **one comparison inside it**, and the name is what you hand back at the end.

> [!TIP]
> **Stuck on this one? Write what you can, then run the checks and *read* check 4.** It doesn't only tell you it's red — it tells you what it expected, what it got, and shows you the shape it's looking for. **And it says something different depending on how far you've got**, so run it again after each change rather than saving it for the end.

- **Each item is a pair** — `entry.Key` is the name, `entry.Value` is the count.
- ⚠️ **Whatever you set that name to *before* the loop is what comes back when nobody has called**, because an empty dictionary means the loop never runs at all. It has to be exactly `"nobody yet"` — and **you'll see that line tonight**, not because you did anything wrong.
- **There's no `break` in this loop.** You have to see everybody before you can know who called most.

*(In week 9 this whole loop becomes one line. It's worth writing by hand once first.)*

Run the same three calls as Task 3 — `Dorothy`, `Bex`, `Dorothy` — and the line under the tables now has an answer:

```bash
dotnet run --project week-03/Lab
```

```
most calls tonight: Dorothy
```

Now let the checks agree with you:

```bash
dotnet test week-03/Lab.Checks
```

**4 / 5.**

**Green? Commit it:**

```
week 3 lab: the desk knows who won't stop
```

### Task 5 in full

**Check:** `Check5_TheShiftAddsUp`

The line the desk signs off with. Two shapes, and **both of them matter tonight:**

- **Nobody called at all** — return exactly `Nobody called. Not one person.` Check the count first and return early, before you build anything else.
- **Otherwise** — one sentence carrying three facts: how many calls came in, how many different people rang, and who wouldn't stop. With `Dorothy`, `Bex`, `Dorothy` it reads `3 calls from 2 people. Dorothy would not stop.` **The wording is yours; the three facts aren't.**

All three are already sitting there waiting to be asked:

- **`Tonight.Count` is how many calls. `Regulars.Count` is how many people.** [Two collections, two different questions](../lecture-notes.md#list-or-dictionary) — different numbers, in one sentence, which is the whole week in one line of code.
- **Ask `TheRegular()` for the name** rather than working it out a second time. You already wrote that method.

**Now work a proper shift.** Take four or five calls — repeat a caller, leave a name blank, put in whatever you like — and end with `q`:

```bash
dotnet run --project week-03/Lab
```

With `Dorothy`, `Bex`, `Dorothy` the desk signs off like this — the `KDXR -` and the last line come from the shift itself, and the sentence between them is however you worded it:

```
most calls tonight: Dorothy

KDXR - 3 calls from 2 people. Dorothy would not stop.
Keep it quiet out there.
```

**That's the whole thing working.** The desk that couldn't tell you a single thing about your night last week now knows what came in, who rang, and who wouldn't stop.

Now let the checks agree with you:

```bash
dotnet test week-03/Lab.Checks
```

**5 / 5.** 🎉

**Commit it:**

```
week 3 lab: the shift adds up
```

### 🌙 Then do one more thing

**Run it again. Type `q` straight away — take no calls at all.**

```bash
dotnet run --project week-03/Lab
```

```
── the night so far ─────────────────────────────────────
╭───┬────────┬────────╮
│ # │ CALLER │ ON AIR │
╰───┴────────┴────────╯
╭─────┬───────╮
│ WHO │ CALLS │
╰─────┴───────╯
most calls tonight: nobody yet

KDXR - Nobody called. Not one person.
```

**Nothing is broken. You did nothing wrong.** Sit with it for a second before you read on.

That sentence is one *you* wrote, twenty minutes ago, for a shift where the phone never rang. It's now the desk's description of a night with five calls in it — because the calls were only ever in memory, and **memory lasts exactly as long as the program is running.** When you typed `q`, the operating system took it all back.

There is nothing in this week that fixes it. Not `List`, not `Dictionary`, not the package. [The whole explanation is in the notes](../lecture-notes.md#and-then-its-gone), and the fix is:

- **Week 8**, where your list gets a file and survives the night for the first time.
- **Week 10**, where it gets a database and stops being only yours.

**Being annoyed by this is the assignment.**

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 3 lab: the desk keeps the night"
> ```

## Rules

> [!IMPORTANT]
> - **Never edit `Lab.Checks`** — it's how you know you're done.
> - **Don't touch `Broadcast.cs`, `CallerLine.cs` or `Call.cs`** — they ship finished, and check 1 goes red if they change.
> - Don't rename `RequestLog`, its methods, or the two collections (`Tonight`, `Regulars`). The checks find them by name.
> - `"nobody yet"` and `"Nobody called. Not one person."` are the desk's house style and the checks compare them exactly.

## 🆘 Stuck?

- **The first `dotnet test` fails with `NU1101` or a network error** — NuGet couldn't reach the internet to fetch Spectre. Nothing is permanently broken; the package belongs to the project, so it'll restore the moment you're online. Pair up with someone for the lab hour.
- **`error CS0246: The type or namespace name 'Spectre' could not be found`** — the restore didn't finish. Run the checks again; it retries.
- **`KeyNotFoundException`** — you *read* a dictionary key that isn't there. [`TryGetValue`.](../lecture-notes.md#reading-a-key-that-isnt-there-is-a-crash) ⚠️ Note that *assigning* `Regulars[name] = 1` is fine and is not the problem.
- **Check 3 says your count is always 1** — the `else` branch is running every time, so `ContainsKey` is never true. Usually the name is spelled differently each call; make sure **both** methods put it through `CallerName`.
- **Check 3 says `"  Dorothy  "` is a different person** — same fix. One method knows how to clean a name; everything else asks it.
- **Check 4 says `TheRegular()` is `nobody yet` on a full log** — `most` is being reset inside the loop, or `best` never gets updated. Both are declared **before** the `foreach`.
- **Check 4 gives the wrong person** — the loop is stopping early. There's no `break`; you have to see everybody.
- **Check 5 is `⏸ BLOCKED`** — that's not a failure. `SignOff()` is built out of `TheRegular()`, so Task 4 has to be done first. The message says so.
- **`error CS1061: 'List<Call>' does not contain a definition for 'Count()'`** — `Count` is a property, not a method. No brackets.
- **`MSB1003: Specify which project or solution file to use`** — the command ran without its week in front. From the top it is always `dotnet test week-03/Lab.Checks`.
- **Everything you typed is gone when you run it again** — [that's the lab.](#-then-do-one-more-thing) Nothing is broken.
- The [troubleshooting appendix](../lecture-notes.md#appendix-troubleshooting) covers the rest.

## 🚀 Done early?

You will be. These are real, and the first one is week 9's homework arriving five weeks early.

- ⭐ **Count the requests, not the callers.** Add a second dictionary — `public static Dictionary<string, int> Rotation` — keyed on what people asked for, and a `MostRequested()` beside it. Now the desk knows the song of the night. *(This is exactly the shape that becomes one line of LINQ in week 9, and having written it twice by hand is what makes that land.)*
- **Sign on as your own station.** `Program.cs` is yours to break, and the ident at the top — the owl in the box — is three `const string`s and a `Panel`. Redraw the bird, change the call sign, change the colors. `BoxBorder.Heavy`, `BoxBorder.Double`, `BoxBorder.Ascii` for the plate; `TableBorder.Heavy` or `TableBorder.Ascii` for the board; a `Rule` between sections. **No check in this course looks at what your program prints**, so none of this can cost you anything. Make it a 3 AM radio desk — *yours*, not KDXR's.
  - ⚠️ **Keep your ASCII in a `const string`, the way the owl is.** Typed straight into the `$"..."`, C# reads `{o,o}` as an instruction to print a variable called `o`, and the project stops building.
- **Sort the night.** The regulars table comes out in whatever order people first rang. Print the busiest first instead — you already have the loop that finds the biggest.
- **Let the DJ ask.** Add a `?` option at the *Who's calling?* prompt that takes a name and prints `TimesCalled` for it. ⚠️ You'll want `TryGetValue`, and you'll find out fast if you didn't use it.
- **Give Teodoro a line.** He rings every week, asks for the same song, dedicates it to the same name. Nothing checks this. That's rather the point.
