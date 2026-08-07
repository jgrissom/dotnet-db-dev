# Week 4 Lab — The Rotation That Fights Back 📻

It's 3 AM at **KDXR 88.1, "The Owl."** Last week the desk got a memory — a list of every call, a count of every regular. Tonight it gets something to protect.

The overnight rotation is three carts and whatever you load into it. (A *cart* is what a station calls one recorded item; the word outlived the tape it came on. The software is still older than the DJ. The station still likes it that way.)

There is also, most nights around 03:14, **a glitch in the automation.**

**Time:** ~50 minutes in class — **target tonight: all five green, and the 03:14 glitch bouncing off every time.**

> [!NOTE]
> **Missed a week?** You're not behind. `Broadcast.cs` ships **already finished**, and everything tonight happens in two new files.

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
cp -r ../dotnet-db-starters/week-04 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-04` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-04`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — nothing to reopen:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ week-02/
├─ week-03/
└─ week-04/                ← the folder you just copied in
   ├─ Lab/                 ← the rotation — tonight's work happens in here
   └─ Lab.Checks/          ← the lab's checks — read-only, never edit
```

> [!IMPORTANT]
> **Two folders this week, not four.** From tonight your homework doesn't live here — it lives in a **second repo of its own**, holding a program on a topic you pick. [`homework.md`](../homework.md) sets that up from scratch, and this lab is the worked example for it.

**Then run the checks** — from the terminal, naming the week:

```bash
dotnet test week-04/Lab.Checks
```

**1 / 5 passing.** Check 1 is weeks 1–3, shipped finished and still on the air. The other four are tonight.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 4: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on, on the week you start committing for real on a repo that *is* graded.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-04/Lab.Checks` and `dotnet run --project week-04/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

Two files, and you should open both before you start.

| File | What it is |
|---|---|
| `Lab/Song.cs` | **One track.** It ships as four public fields and a constructor — the *exact* shape you wrote last week. Four of tonight's five tasks are in here. |
| `Lab/Rotation.cs` | **What's loaded tonight.** A class that owns a private `List<Song>`. Task 2 is in here, and it's the same shape your homework asks you to build for your own project. |
| `Lab/Program.cs` | The shift. **You don't change this** — but you run it after every task, because it's where you find out what you actually did. |
| `Lab/Broadcast.cs` | Weeks 1–3, finished. Don't touch it; check 1 goes red if you do. |

## The tasks

| # | Do this | Check |
|---|---|---|
| 1 | **Work a shift, and meet the 03:14 glitch.** No code. [Task 1 in full ↓](#task-1-in-full) | — |
| 2 | `Rotation` keeps its own list — `Add`, `Count`, and an `All()` that hands back a **copy**. [Task 2 in full ↓](#task-2-in-full) | 2 |
| 3 | `Title` and `Artist` become properties that refuse a blank. [Task 3 in full ↓](#task-3-in-full) | 3 |
| 4 | `Seconds` refuses nonsense, and `Length` reads off it. [Task 4 in full ↓](#task-4-in-full) | 4 |
| 5 | `PlaysTonight` can be read by anybody and written by nobody. [Task 5 in full ↓](#task-5-in-full) | 5 |

---

### Task 1 in full

Nothing to write. Work a shift and look at it.

```bash
dotnet run --project week-04/Lab
```

Type a DJ name, then `p` to play something, then `q`.

```
── in rotation ──────────────────────────────────────────
╭───┬───────┬────────┬────────┬───────╮
│ # │ TITLE │ ARTIST │ LENGTH │ PLAYS │
╰───┴───────┴────────┴────────┴───────╯
0 in rotation.

[p]lay  [a]dd  [g]  [q]uit: Nothing in the rotation. Dead air is a bad look.
```

**Three carts are loaded before the shift starts** — `Program.cs` adds them just after the sign-on, and you can see the three `rotation.Add(...)` lines for yourself. The board says nothing is there and the desk won't play anything.

That's Task 2. Nothing is broken; `Rotation` just hasn't been written yet.

Now open `Lab/Song.cs` and read the top of it. Four public fields. That's last week's shape, and by the end of tonight none of them will still be there.

---

### Task 2 in full

Open `Lab/Rotation.cs`. The private list is already there:

```csharp
private readonly List<Song> _songs = new List<Song>();
```

Write the three members underneath it:

- **`Add`** — one line. Put the song in `_songs`.
- **`Count`** — ask `_songs`. It ships returning a hard-coded `0`, which is right exactly once.
- **`All()`** — hand back **a copy**: `return new List<Song>(_songs);`

> [!WARNING]
> **`return _songs;` is the tempting one, and it undoes the `private` completely.** Whoever asked for the list now has *your* list, and can empty it. You'll get to watch that happen in about ninety seconds.

**Run the shift** — and this time press `g`.

```bash
dotnet run --project week-04/Lab
```

The board fills up. Then:

```
[p]lay  [a]dd  [g]  [q]uit: 03:14 automation glitch
  tried title -> ""   got in - now
  tried seconds -> -400   got in - now -400
  tried the whole rotation -> wiped   refused - still 3
```

```
│ 1 │                │ The Lamplighters │ 0:00   │ 0     │
```

**Track 1 has no name any more.** The automation reached straight into a public field and wrote an empty string, and nothing in your program had anywhere to stand to stop it. The rotation itself survived — because `All()` handed out a copy, which is the one door you closed.

**Now the checks:**

```bash
dotnet test week-04/Lab.Checks
```

**2 / 5.**

---

### Task 3 in full

Open `Lab/Song.cs`. Turn `Title` and `Artist` into properties with private fields behind them:

```csharp
private string _title = "(untitled)";

public string Title
{
    get { return _title; }
    set { if (!string.IsNullOrWhiteSpace(value)) { _title = value; } }
}
```

`value` is whatever was on the right of the `=`. You never declare it — inside a `set`, it's just there.

Do the same for `Artist`. The starting value for a blank one is yours to pick.

> [!NOTE]
> **You don't touch the constructor.** It already says `Title = title;` — which used to write straight into a field and now goes through your setter. The rule you wrote once protects the constructor too.

**Run the shift, press `g`:**

```bash
dotnet run --project week-04/Lab
```

```
  tried title -> ""   refused - still Nightjar
  tried seconds -> -400   got in - now -400
```

**One line flipped.** The title held; the duration still went through. That's exactly one hole closed, and you can see which one.

**Then the checks:**

```bash
dotnet test week-04/Lab.Checks
```

**3 / 5.**

---

### Task 4 in full

Still in `Lab/Song.cs`. Two pieces, both about `Seconds`.

**The setter refuses the impossible.** A song can't be zero seconds long and it certainly can't be negative:

```csharp
set { if (value >= 1) { _seconds = value; } }
```

> [!WARNING]
> **`value >= 1`, not `value >= 0`.** Zero slips straight through a "no negatives" test, and a zero-second song is still dead air.

**`Length` reads off it, and stores nothing:**

```csharp
public string Length => $"{Seconds / 60}:{Seconds % 60:00}";
```

`Seconds / 60` is whole ÷ whole = whole — week 1's trap, finally useful on purpose. The `:00` pads the seconds, so 187 comes out `3:07` rather than `3:7`. There's no `set`, because there's nothing to set.

**Run the shift, press `g`:**

```bash
dotnet run --project week-04/Lab
```

```
  tried title -> ""   refused - still Nightjar
  tried seconds -> -400   refused - still 227
  tried the whole rotation -> wiped   refused - still 3
```

**The glitch now bounces off everything it tries** — and the LENGTH column has real times in it for the first time tonight.

**Then the checks:**

```bash
dotnet test week-04/Lab.Checks
```

**4 / 5.**

---

### Task 5 in full

The last one, and the one worth slowing down for.

`PlaysTonight` is still a public field, which means any line anywhere in the program can claim a song played forty times. Make it this instead:

```csharp
public int PlaysTonight { get; private set; }
```

Read it from anywhere. Write it from **nowhere except inside `Song`**. Which means `Play()` becomes the only thing in the entire program that can move that number:

```csharp
public void Play()
{
    PlaysTonight++;
}
```

**Run the shift.** Play two different tracks, then `q`:

```bash
dotnet run --project week-04/Lab
```

```
╭───┬────────────────┬──────────────────┬────────┬───────╮
│ # │ TITLE          │ ARTIST           │ LENGTH │ PLAYS │
├───┼────────────────┼──────────────────┼────────┼───────┤
│ 1 │ Nightjar       │ The Lamplighters │ 3:47   │ 1     │
│ 2 │ Slack Water    │ Marguerite Vance │ 4:12   │ 1     │
│ 3 │ Long Way Round │ The Ferrymen     │ 5:31   │ 0     │
╰───┴────────────────┴──────────────────┴────────┴───────╯
```

Those numbers are now the only numbers the station *can* report. Not because everybody agreed to be careful — because there is no longer a way in.

**Then the checks:**

```bash
dotnet test week-04/Lab.Checks
```

**5 / 5.**

---

## Now try to break it

The shift is yours. Spend the last few minutes actually attacking it:

- Press `a` and add a song with **no title**. Then one with **no artist**. Then one whose length you type as `banana`.
- Press `g` a few more times.
- Add a song that's `1` second long. Then `0`. Then `-30`.
- Type `[hold music]` as a title — square brackets and all.

Everything you type goes through the same four doors you spent tonight building, and the board should never once show you a lie.

> [!TIP]
> **Found something that gets through?** That's the best possible outcome and it's worth a minute. Which door was it? A field you didn't convert, a `>=` that should be `>`, a rule in the setter that a blank slips past?

## ⭐ Done early?

1. **`Artist` gets a rule of its own.** Blank isn't the only bad artist — try refusing anything shorter than two characters, and see what that does to a caller who types `X`.
2. **A read-only fact.** Add `public string Slug { get; }` — set in the constructor from the title, never again — and put it on the board.
3. **Seal the rotation harder.** `Rotation.Add` currently takes anything. Make it refuse a `null` song, and a song whose `Seconds` is still 0.
4. ⭐ **The one that pays off later:** give `Rotation` a `TotalSeconds` property that adds up every song's length, and print the whole rotation's running time under the board. In **week 9** that entire loop becomes one line.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-04/Lab.Checks`. |
| `CS0272: ... the set accessor is inaccessible` | Something outside `Song` is assigning to a `private set` property. That's the property working — call `Play()` instead. Check `Program.cs` isn't the thing complaining; it shouldn't be. |
| `CS0200: Property ... cannot be assigned to — it is read only` | Your property has a `get` and no `set`. `Title` and `Seconds` both need one; only `PlaysTonight` goes `private set`. |
| The program hangs, or `StackOverflowException` | A setter assigning to itself: `set { Title = value; }`. It has to assign to the **backing field** — `set { _title = value; }`. |
| `CS0103: The name '_title' does not exist` | The private field above the property is missing or spelled differently. |
| `CS0102: The type 'Song' already contains a definition for 'Title'` | You added the property but left the old `public string Title;` field in place. Delete the field. |
| Check 2 says the rotation went from 2 songs to 0 | `All()` is returning `_songs` instead of a copy. `return new List<Song>(_songs);` |
| Check 4 says you got `3:7` instead of `3:07` | The seconds need padding — that's what `:00` is for inside `{Seconds % 60:00}`. |
| The board is empty however much you load | `Rotation.All()` is still returning the brand-new empty list it ships with. |
| `dotnet test` passes but the board still looks wrong | Run the program, not just the checks. The checks never look at `Program.cs`, and half of tonight is only visible on the board. |

**Prev:** [Week 3 Lab — The Night's Log](../../week-03/lab/) · **Next:** [Week 4 Homework — Your Own Topic](../homework.md)
