# Week 7 Lab — The Update 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and something happened while everybody slept: the scheduler software took a vendor update overnight. The release notes say it *improved* four things.

It broke four things. The clock can't spell its own seconds, Pham's Bakery is about to get airtime nobody paid for, the switchboard hands the desk a stranger wearing Dorothy's name, and the station reads ad copy on air that doesn't match its own log. **The checks caught all four before the morning show did** — which is what checks are for, and as of tonight you know what they are.

Your job is what the demo did to the duty board: for each broken rule, **write your own test first, watch it go red against the real bug, then fix the line and watch everything go green.**

**Time:** ~50 minutes in class — **target tonight: all five of my checks green, and a fact of yours per bug.**

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the four the update touched, and each of those needs exactly one repair you'll be guided to. Nothing tonight depends on remembering last week's code — only on reading this week's.

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
cp -r ../dotnet-db-starters/week-07 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-07` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-07`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — and this week the folder holds **three** projects, not two:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-07/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — four of its files took the update
   ├─ Lab.Tests/           ← YOURS. The tests you write tonight live here
   └─ Lab.Checks/          ← my checks — read-only, and finally readable
```

> [!TIP]
> **Reload the window now, before you start.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.
>
> VS Code worked out what was in this folder **when you opened it** — and `week-07` wasn't there then. Reloading is how it finds out. It saves you red squiggles on code that's perfectly fine, and a debugger that can't find this week's project.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight you practice writing tests on my bugs, and the homework has you write them on your own registry.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-07/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the update *didn't* touch, still holding. **The four red ones are the four bugs** — read their names; they're tonight's map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 7: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-07/Lab.Checks`, `dotnet test week-07/Lab.Tests` and `dotnet run --project week-07/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

**Two suites, one desk — keep the difference straight all night:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet test week-07/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — grows from 1 fact to 5 tonight |
| `dotnet test week-07/Lab.Checks` | mine | *is the station fixed?* — climbs 1 → 5 as you repair it |
| `dotnet run --project week-07/Lab` | the desk | what any of it looks like on the air |

| File | What it is |
|---|---|
| `Lab.Tests/DeskTests.cs` | **Yours.** One worked fact ships written — [read it first](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer); your four go under it, one per task. |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always — but read it.** [You can read every line of it now](../lecture-notes.md#the-bill-for-testable-shape), and tonight it's worth doing: each check is the professional-strength version of the fact you're about to write. |
| `Lab/Broadcast.cs` | The update touched one line. **Task 2.** |
| `Lab/Ad.cs` | The update deleted a guard. **Task 3.** |
| `Lab/Switchboard.cs` | The update "improved" `Take`. **Task 4.** |
| `Lab/Hour.cs` | The update reordered two lines in `Run()`. **Task 5.** |
| everything else in `Lab/` | Weeks 1–6, finished, untouched by the update. Check 1 goes red if it changes. |

💡 **The update signed its work.** Every line it touched has a `[scheduler update]` comment sitting on it — <kbd>⌘F</kbd> for `scheduler update` in the task's file and you're standing on the bug. Finding the line was never the job tonight; **proving it's wrong before you touch it is.**

## The tasks

**The rhythm is the same all four times, and the order is the lesson:** write your fact → run *your* tests and watch it go **red** → fix the line → run the desk → run your tests (green) → run my checks (the count climbs). **Commit every time a check goes green** — each task hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Work a shift, read the damage, read the worked fact. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheClockPadsItsSeconds` | The bug the board *can't* show you. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `ABuyNeverGoesBelowZero` | The station airs one ad too many. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TakeHandsBackTheCallerOnTheBoard` | Dorothy's calls land on a ghost. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheDeskPrintsWhatActuallyAired` | The station lies about what went out. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

Nothing to write. Find out what a night of damage looks like — and how little of it you can see.

**Work a shift.** Type a DJ name and look at the hour:

```bash
dotnet run --project week-07/Lab
```

```
── 04:00 - the hour ───────────────────────────────────────────
╭─────────┬──────────────────────────────────────────────┬────────╮
│ KIND    │ CUE                                          │ LENGTH │
├─────────┼──────────────────────────────────────────────┼────────┤
│ IDENT   │ KDXR 88.1, The Owl                           │ 0:12   │
│ SONG    │ Nightjar - The Lamplighters                  │ 3:47   │
│ AD      │ Pham's Bakery - "open at five" (3 left)      │ 0:30   │
│ SONG    │ Slack Water - Marguerite Vance               │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ SONG    │ Long Way Round - The Ferrymen                │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
6 items - 14:57 on the clock.
```

**Four bugs are live in this program right now, and that board shows none of them.** Every length happens to have two-digit seconds; every count reads clean. Now press `a` — five times, watching the AD line each time. The fourth and fifth presses print these two:

```
  ON AIR  AD - Pham's Bakery - "open at five" (0 left)
  ON AIR  AD - Pham's Bakery - "open at five" (-1 left)
```

There's one — the station now owes Pham's Bakery a negative spot. The other three are hiding better. **Press `q`.**

**Now open `week-07/Lab.Tests/DeskTests.cs` and read the worked fact** — [the anatomy is in the notes](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer): `[Fact]` on top, then set the scene, do the thing, check the answer. Run it:

```bash
dotnet test week-07/Lab.Tests
```

**1 passed** — `TheStationKnowsItsOwnName`, the fact that ships written. Yours will sit under it.

**And open `week-07/Lab.Checks/DeskChecks.cs` — really.** You have been forbidden to edit this species of file since week 1, and you still are. But tonight is the night it stops being a black box: scroll it, pick check 3, and read it top to bottom. [It is a class, some facts, and some asserts](../lecture-notes.md#the-bill-for-testable-shape) — every line is syntax you know.

---

### Task 2 in full

**Check:** `Check2_TheClockPadsItsSeconds`

The update *simplified* `Broadcast.Clock` — <kbd>⌘F</kbd> for `scheduler update` in `Lab/Broadcast.cs` to see the line.

**First, look for the damage.** Run the shift, type a DJ name, and read the LENGTH column:

```bash
dotnet run --project week-07/Lab
```

```
│ IDENT   │ KDXR 88.1, The Owl                           │ 0:12   │
│ SONG    │ Nightjar - The Lamplighters                  │ 3:47   │
│ AD      │ Pham's Bakery - "open at five" (3 left)      │ 0:30   │
│ SONG    │ Slack Water - Marguerite Vance               │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ SONG    │ Long Way Round - The Ferrymen                │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
6 items - 14:57 on the clock.
```

**Nothing is wrong with it.** Every length there happens to land on two-digit seconds, so the broken clock has nothing to show.

**Now take one request.** Still in the shift: press `r`, caller `Dorothy`, song **`2`** — then press `h` and read the clock at the bottom:

```
  Line 1: Dorothy asks for Slack Water
```

```
7 items - 19:9 on the clock.
```

**There it is.** `19:9`. Nineteen minutes and *nine* seconds, printed as though it were nineteen minutes and ninety. Press `q`.

⚠️ **Notice what it took to see it.** Slack Water is 4:12, and adding it happened to push the total onto a seconds value under ten. **Request song `1` or `3` instead and the clock looks perfect** — the bug is still there, and the screen says nothing. You found this one by being lucky. **A test does not need luck; it asks the same question every single time.**

**Write the fact — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 2` comment.** Yours to write, and here is the spec:

- [`Assert.Equal`](../lecture-notes.md#the-assert-family), expected first. `Broadcast.Clock` is `static`, so [the scene costs nothing](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer) — one assert per value you feed it.
- **Feed it at least one value whose seconds are under ten** — `605` is ten minutes, five seconds. ⚠️ **A test that only asks about `893` stays green with the bug in**, because `:53` already has two digits. [Choosing the value that hurts is the skill](../lecture-notes.md#what-a-test-cannot-see).
- Name it after the rule it proves. Mine's called `TheClockPadsItsSeconds`; yours doesn't have to be.

**Run yours, and expect red:**

```bash
dotnet test week-07/Lab.Tests
```

```
  Assert.Equal() Failure: Strings differ
Expected: "10:05"
Actual:   "10:5"
```

**Red, for the right reason** — [read the failure like a sentence](../lecture-notes.md#reading-a-failure): which rule, expected versus actual. If yours is green, it's asking an easy question — feed it `605`.

**Now the fix.** The update deleted a format spec. In `Lab/Broadcast.cs`, make `Clock` read:

```csharp
    public static string Clock(int seconds)
    {
        return $"{seconds / 60}:{seconds % 60:00}";
    }
```

The `:00` is the whole repair — *at least two digits, pad with a zero.* The minutes deliberately don't get one, which is why `0:45` still reads `0:45`.

**Run the shift again and do exactly the same thing** — `r`, `Dorothy`, song `2`, then `h`:

```
7 items - 19:09 on the clock.
```

**Nineteen oh nine.** One character, and the desk stops lying about its own hour.

**Yours, green:**

```bash
dotnet test week-07/Lab.Tests
```

**2 passed.**

**Then mine:**

```bash
dotnet test week-07/Lab.Checks
```

**2 / 5.**

**Green? Commit it:**

```
week 7 lab: the clock pads its seconds
```

---

### Task 3 in full

**Check:** `Check3_ABuyNeverGoesBelowZero`

The update decided the guard in `Ad.Play()` was *redundant* — <kbd>⌘F</kbd> for `scheduler update` in `Lab/Ad.cs`. You wrote that guard yourself in week 6. Tonight you prove it mattered before you put it back.

**First, watch it happen.** Run the shift, type a DJ name, then press `a` **five times**, watching the AD line each time:

```bash
dotnet run --project week-07/Lab
```

```
  ON AIR  AD - Pham's Bakery - "open at five" (1 left)
  ON AIR  AD - Pham's Bakery - "open at five" (0 left)
  ON AIR  AD - Pham's Bakery - "open at five" (-1 left)
```

Pham's Bakery bought three spots and the station just aired five. Press `q`.

**Write the fact — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 3` comment.**

⚠️ **This one needs all three moves, and Task 2 did not.** Task 2's asserts stood on their own, because `Broadcast.Clock` is `static` — there was nothing to make first. Here you make an object, keep it in a variable, do something to it twice, and then ask it a question. [That is the ordinary shape of a test](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer), and every fact you write from here looks like this one.

- **Set the scene.** One `Ad` with a **one-run** buy, in a variable, so you can ask it about itself afterwards:

  ```csharp
  Ad ad = new Ad("Pham's Bakery", "open at five", runs: 1);
  ```

- **Do the thing.** Play it **twice** — one airing the buy can pay for, and one it cannot.
- **Check the answer.** [`Assert.Equal`](../lecture-notes.md#the-assert-family), expected first. `Remaining` is a public property you can read. After two airings on a one-run buy it should be **0**: a buy stops at zero and never goes negative.
- Name it after the rule it proves. Mine is `ABuyStopsAtZero`; yours doesn't have to be.

**Run yours, and expect red:**

```bash
dotnet test week-07/Lab.Tests
```

```
Expected: 0
Actual:   -1
```

**Minus one.** Pham's Bakery bought one spot and the station just aired two — a free ad nobody paid for. You saw this on the board back in Task 1, but only because you pressed `a` five times and happened to be reading the right line. Your test asks every single time, in about a millisecond.

**Now the fix.** An airing only spends a run [if there is a run to spend](../lecture-notes.md#red-then-green). In `Lab/Ad.cs`, make `Play` read:

```csharp
    public void Play()
    {
        if (Remaining > 0)
        {
            Remaining--;
        }
    }
```

**Run the shift again** — same keys, `a` five times:

```bash
dotnet run --project week-07/Lab
```

```
  ON AIR  AD - Pham's Bakery - "open at five" (0 left)
  ON AIR  AD - Pham's Bakery - "open at five" (0 left)
```

The buy runs out and *stays* out. No more free spots.

**Yours, green:**

```bash
dotnet test week-07/Lab.Tests
```

**3 passed.**

**Then mine:**

```bash
dotnet test week-07/Lab.Checks
```

**3 / 5.**

**Green? Commit it:**

```
week 7 lab: a buy never goes below zero
```

---

### Task 4 in full

**Check:** `Check4_TakeHandsBackTheCallerOnTheBoard`

The sneakiest one. The update made `Take` hand out *fresh copies* of callers, "so nothing outside can mess with the board" — <kbd>⌘F</kbd> for `scheduler update` in `Lab/Switchboard.cs`. That is week 5's copy lesson [applied in exactly the wrong place](../lecture-notes.md#the-assert-family): `All()` copies the **list** so nobody can empty the board; `Take` must hand back **the caller** so the call lands on the person who made it.

**First, watch the board fail to learn.** Run the shift, DJ name, then `r`, caller `Dorothy`, song `2`, then `c`:

```bash
dotnet run --project week-07/Lab
```

```
│ CALLER  │ CALLS │ ASKED FOR │
├─────────┼───────┼───────────┤
│ Dorothy │ 3     │ -         │
│ Bex     │ 1     │ -         │
│ Teodoro │ 1     │ -         │
```

The desk printed `Line 1: Dorothy asks for Slack Water` a second ago — and her row still says **3 calls** and **no song**. Her call was counted on a ghost, her request was remembered by the ghost, and the ghost was thrown away. Press `q`.

**Write the fact — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 4` comment.** Same three moves as Task 3:

- Scene: a fresh `Switchboard`, and a `Caller` you keep a variable for — `var dorothy = new Caller("Dorothy");` — added to the board.
- Do: `Take("Dorothy")`, and keep what comes back.
- Check: **`Assert.Same(dorothy, took)`** — [the identity question](../lecture-notes.md#the-assert-family): the very object on the board, not a lookalike. Add `Assert.Equal(1, dorothy.CallsTonight);` if you want the consequence pinned too — with the bug, *her* count never moved.

**Run yours — red** (`Assert.Same() Failure: Values are not the same instance`).

**Now the fix.** `Take` asks `Find` first, and only makes a caller when `Find` comes back empty — the shape you wrote in week 5. In `Lab/Switchboard.cs`, make `Take` read:

```csharp
    public Caller Take(string name)
    {
        Caller? caller = Find(name);

        if (caller == null)
        {
            caller = new Caller(name);
            Add(caller);
        }

        caller.Calls();
        return caller;
    }
```

Both roads end in the same place, which is why `Calls()` sits after the `if` rather than inside one branch of it.

**Run the shift again** — same keys: `r`, `Dorothy`, song `2`, then `c`:

```bash
dotnet run --project week-07/Lab
```

```
│ Dorothy │ 4     │ Slack Water │
```

Her fourth call of the night, *on her own row*, and the board finally knows what she asked for.

**Yours, green:**

```bash
dotnet test week-07/Lab.Tests
```

**4 passed.**

**Then mine:**

```bash
dotnet test week-07/Lab.Checks
```

**4 / 5.**

**Green? Commit it:**

```
week 7 lab: take hands back the caller on the board
```

---

### Task 5 in full

**Check:** `Check5_TheDeskPrintsWhatActuallyAired`

Last week you were warned about this exact bug and you dodged it: *play the item, then read its cue.* The update un-dodged it — <kbd>⌘F</kbd> for `scheduler update` in `Lab/Hour.cs`.

**First, put the hour on air and read two lines.** DJ name, then `a`:

```bash
dotnet run --project week-07/Lab
```

```
  ON AIR  IDENT - KDXR 88.1, The Owl
  ON AIR  SONG - Nightjar - The Lamplighters
  ON AIR  AD - Pham's Bakery - "open at five" (3 left)
  ON AIR  SONG - Slack Water - Marguerite Vance
  ON AIR  WEATHER - clear, four below, wind out of the northwest
  ON AIR  SONG - Long Way Round - The Ferrymen
```

**Two things there are lies.** The ad went out and the log says `3 left` — the spot it just aired is not counted. And the weather bed has been read on air, but its line doesn't say `(read)`. Both for the same reason: the desk wrote down each cue *before* the item played. Press `q`.

A station that says one thing on air and logs another has a records problem — the same disease as Haldane's board tonight, in a different building.

**Write the fact — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 5` comment:**

- Scene: an `Hour` holding one `Ad` with a **three-run** buy.
- Do: `hour.Run()`, and keep the `List<string>` it hands back.
- Check: [`Assert.Contains`](../lecture-notes.md#the-assert-family) — the first line back should show the buy **after** the airing: `"(2 left)"`.

**Run yours — red** (`Assert.Contains() Failure: Sub-string not found`).

**Now the fix.** Swap the two lines back into week 6's order — play first, then speak. In `Lab/Hour.cs`, inside `Run()`'s loop:

```csharp
            item.Play();
            aired.Add($"{item.Kind} - {item.Cue}");
```

**Run the shift again** — DJ name, then `a`:

```bash
dotnet run --project week-07/Lab
```

```
  ON AIR  IDENT - KDXR 88.1, The Owl
  ON AIR  SONG - Nightjar - The Lamplighters
  ON AIR  AD - Pham's Bakery - "open at five" (2 left)
  ON AIR  SONG - Slack Water - Marguerite Vance
  ON AIR  WEATHER - clear, four below, wind out of the northwest (read)
  ON AIR  SONG - Long Way Round - The Ferrymen
```

The ident plays, the hour airs, and every line matches the books — the desk prints what happened, not what was about to.

**Yours, green:**

```bash
dotnet test week-07/Lab.Tests
```

**5 passed.**

**Then mine:**

```bash
dotnet test week-07/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift:**

```
week 7 lab: the desk prints what aired
```

**Five commits tonight, and ten green lines nobody can take away** — five of mine, five of yours. The difference between them, as of tonight, is whose folder they're in.

---

## Now try to break it

The station is fixed. Prove it — and prove your *tests*:

```bash
dotnet run --project week-07/Lab
```

- Press `a` six times. Where does Pham's Bakery stop, on air and on the `h` board?
- Take a request as `Dorothy`, then as `dorothy` — lowercase. Two rows? Is that a bug? *(Hold that thought until the database weeks — it gets stranger.)*
- **Falsify one of your own facts** — [make it lie](../lecture-notes.md#make-it-fail-once), run your suite, read the failure it produces, put it back. A test you've never seen red is a test you're trusting on faith.
- Break the station on purpose: take the `:00` back out of `Clock`, and run *my* checks, then *yours*. Same red? Yours caught it too? Put it back. **That's what you built tonight** — the thing that notices, forever.

## ⭐ Done early?

1. **A fact for the weather bed.** `Aired` starts false; one `Play()` flips it; the cue grows `(read)`. Three asserts, born green — so [falsify it once](../lecture-notes.md#make-it-fail-once) before you trust it.
2. **Pin the worked example harder.** `TheStationKnowsItsOwnName` checks one string — write a fact for `Broadcast.MinutesUntilSunrise` that asks about `4:30`, and about midnight exactly.
3. **The test the update deserves.** Write one fact that would have caught *two* of tonight's bugs at once — an `Hour` holding a one-run `Ad`, `Run()` twice, assert on `Remaining` *and* the lines. When it's green, ask yourself which of the two it would report first, and why that's worth knowing at 4 AM.
4. ⭐ **The one that pays off later:** your `Check5` in tonight's suite and the hour's `TotalSeconds` both walk a list. In **week 9** every one of those loops becomes one line — and your tests will be how you *prove* the one-liners do the same job. That's what a suite is for: permission to rewrite.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-07/Lab.Tests`. |
| **Your fact is green against the bug** | It asserts a value the bug answers correctly — the clock's `893`. [Feed it the value that hurts](../lecture-notes.md#what-a-test-cannot-see), and see it red once before you fix anything. |
| `dotnet test week-07/Lab.Tests` says **0 tests** — or 1 when you've written more | A fact is missing its `[Fact]`, or has parameters. [A fact takes nothing and returns nothing.](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer) |
| `CS0246: 'Fact'` or `'FactAttribute'` could not be found | You're writing in the wrong file — probably a `Lab/` file. Your facts live in `Lab.Tests/DeskTests.cs`, where the packages are. |
| A failure where **Expected** is obviously the broken value | Your `Assert.Equal` arguments are swapped — [expected comes first](../lecture-notes.md#the-assert-family), and [the failure message is the product](../lecture-notes.md#reading-a-failure). It passes and fails at the right times either way; it just reports backwards. |
| `Assert.Same() Failure: Values are not the same instance` | **The good red** in Task 4 — that's the ghost, [caught by the identity question](../lecture-notes.md#the-assert-family). If you're seeing it *after* your fix, `Take` still builds a `new Caller` on the found path. |
| Your Task 5 fact is red after the fix | Read which line it checked — [the scene decides the answer](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer). An hour with just your ad has the ad at `lines[0]`; if your scene added songs first, it's not the first line back. |
| My check is green but yours is red | Your test and mine disagree about the rule — read your assert against the check's. One of you is asserting the old behavior, and [tests are code that can be wrong](../lecture-notes.md#what-a-test-cannot-see). |
| My check is red but yours is green | Your fact isn't asking the hard question — a `605`, a second `Play()`, a `Same` instead of an `Equal`. Read the check; it names what it asked. |
| The AD line still shows the pre-air count | Cue read before `Play()` — Task 5's swap isn't in yet, or it got swapped back. |
| Dorothy's CALLS never moves, ASKED FOR stays `-` | The ghost — her calls are landing on a thrown-away copy. That's Task 4's bug; if it persists after your fix, `Take` is still building a `new Caller` before asking `Find`. |
| `dotnet test` passes but the shift looks wrong | Run the program, not just the suites. Neither one looks at `Program.cs`, and half of tonight is only visible on the air. |
| Breakpoints never stop | Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. `.NET: Restart Language Server` does not fix it. |
| <kbd>F5</kbd>'s project list has no `week-07` in it | The editor learned which projects exist when you opened the folder, and this week's did not exist yet. **`Developer: Reload Window`.** |
| Not sure what a test actually *is* | [A fact: set the scene, do the thing, check the answer](../lecture-notes.md#a-fact-set-the-scene-do-the-thing-check-the-answer) — and the file that's been grading you is [the same species](../lecture-notes.md#the-bill-for-testable-shape). |
| Not sure why red comes first | [Red, then green](../lecture-notes.md#red-then-green) — red is the only proof your test can see the bug at all. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 7 lab: the clock pads its seconds"
> ```

**Prev:** [Week 6 Lab — The Hour](../../week-06/lab/) · **Next:** [Week 7 Homework — Your Own Suite](../homework.md)
