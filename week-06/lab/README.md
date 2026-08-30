# Week 6 Lab — The Hour 📻

It's 4 AM at **KDXR 88.1, "The Owl."** The rotation is loaded, the switchboard is yours, and in about a minute the station is legally obliged to say its own call letters out loud.

An hour of radio is not songs. It's a song, then the **station ID**, then the **ad** Pham's Bakery paid for, then the **forecast** read over a music bed — and then more songs. Four different kinds of thing, one hour, in order, adding up to sixty minutes.

Tonight the desk gets an hour it can actually run. Right now it has one item on it that knows what it is, and a clock that says nothing is scheduled.

**Time:** ~50 minutes in class — **target tonight: all five green, and an hour that runs itself.**

> [!NOTE]
> **Missed a week?** You're not behind. `Broadcast.cs`, `Rotation.cs`, `Caller.cs` and `Switchboard.cs` all ship **already finished** — including last week's work, so you have a working switchboard whether or not you wrote one. Tonight happens in five other files.

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
cp -r ../dotnet-db-starters/week-06 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-06` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-06`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — the folder is there and you can open the files:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-06/                ← the folder you just copied in
   ├─ Lab/                 ← the hour — tonight's work happens in here
   └─ Lab.Checks/          ← the lab's checks — read-only, never edit
```

> [!TIP]
> **Reload the window now, before you start.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.
>
> VS Code worked out what was in this folder **when you opened it** — and `week-06` wasn't there then. Reloading is how it finds out. It saves you red squiggles on code that's perfectly fine, and a debugger that can't find this week's project.

> [!IMPORTANT]
> **Two folders, not four — same as the last two weeks.** Your homework lives in your **project repo**, in its own window. [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it.

**Then run the checks** — from the terminal, naming the week:

```bash
dotnet test week-06/Lab.Checks
```

**1 / 5 passing.** Check 1 is weeks 1–5, shipped finished and still on the air. The other four are tonight.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 6: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-06/Lab.Checks` and `dotnet run --project week-06/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

**Eleven files are in there, and seven of them matter tonight** — open the first two before you start.

| File | What it is |
|---|---|
| `Lab/IScheduleItem.cs` | **The promise**, and it ships written. Three lines of it are the whole week. Read it first — you never edit it. |
| `Lab/WeatherBed.cs` | **The worked example.** One class that already keeps the promise, all four members, done. Read it before Tasks 2, 3 and 4. Don't change it. |
| `Lab/Song.cs` | Week 4's, plus two members that ship saying nothing. **Task 2.** |
| `Lab/StationId.cs` | The legal ID. Keeps no promise yet. **Task 3.** |
| `Lab/Ad.cs` | A spot somebody paid for. **Task 4.** |
| `Lab/Hour.cs` | The hour itself — `Rotation`'s shape, holding a promise instead of a class. **Task 5.** |
| `Lab/Program.cs` | The shift. **You change exactly two characters in it, twice** — Tasks 3 and 4 each tell you which line, and the line says so itself. |
| `Lab/Broadcast.cs`, `Rotation.cs`, `Caller.cs`, `Switchboard.cs` | Weeks 1–5, finished. Don't touch them; check 1 goes red if you do. |

## The tasks

**Commit every time a check goes green.** Three clicks in the Source Control view, and each task below hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Run the shift and look at the hour. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `ASongKnowsHowToBeScheduled` | Two members on `Song`, and it already has the other two. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheIdentIsAnItemToo` | A class whose whole job is keeping the promise. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `AndSoIsTheAd` | Same again — and this one counts the other way. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheHourRunsItself` | Two loops, and neither knows what a song is. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

Nothing to write. Work a shift and look at it.

```bash
dotnet run --project week-06/Lab
```

Type a DJ name, then press `h` to redraw the hour. **Leave the shift running** — there is one more key to press in a moment.

```
── 04:00 - the hour ───────────────────────────────────────────
╭─────────┬──────────────────────────────────────────────┬────────╮
│ KIND    │ CUE                                          │ LENGTH │
├─────────┼──────────────────────────────────────────────┼────────┤
│ ?       │ (nothing to cue)                             │ 3:47   │
│ ?       │ (nothing to cue)                             │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ ?       │ (nothing to cue)                             │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
4 items - 0:00 on the clock.
```

**Four things on the hour and one of them can tell you what it is.** [A list holds one type](../lecture-notes.md#one-list-holds-one-type-and-that-is-the-problem), and this one holds `IScheduleItem` — so the only things on it are the ones that keep the promise. The three question marks are songs — you can see their lengths, so the desk knows how long they run and nothing else about them.

Two things aren't on that list at all: the **station ID** and **Pham's Bakery's ad**. They exist as files in `Lab/` and the hour will not take them.

Now press `a` — *put the hour on air*:

```
[r]equest  [h]our  [a]ir  [c] switchboard  [q]uit: a
```

Nothing happens. Nothing goes out. **Now press `q`.**

**Open `Lab/IScheduleItem.cs` and read it before you go any further.** It ships written, it is three questions long, and [it is the only reason any of tonight works](../lecture-notes.md#an-interface-is-a-promise). Then open `Lab/WeatherBed.cs`, which is the one class in the folder that already answers all three — [that is why it is the only row on the hour that says anything](../lecture-notes.md#keeping-a-promise).

---

### Task 2 in full

**Check:** `Check2_ASongKnowsHowToBeScheduled`

Open `Lab/Song.cs`. Everything in it is week 4's, except the last two members, which ship like this:

- **`Kind` — rewrite it.** It says `"?"`. It should say what a song is, in one word, for the KIND column. Every kind of item on the hour needs its own word — [that column is how the DJ tells them apart at four in the morning](../lecture-notes.md#one-list-one-loop).
- **`Cue` — rewrite it.** It says `"(nothing to cue)"`. It is what the DJ reads off the screen when the item comes up, so for a song it has to name **the track and who it is by**. The wording and the punctuation between them are yours; the two facts aren't. Read them off `Title` and `Artist` — [the properties, not the fields behind them, and it is still week 4's reason](../../week-04/lecture-notes.md#private-set--the-one-to-slow-down-on).

> [!IMPORTANT]
> **Look at what `Song` does NOT have to do.** `IScheduleItem` asks for four things and two of them have been in this file since week 4 — a `Seconds`, and a `Play()` that takes nothing and returns nothing. [A class that could already answer owes you nothing for it](../lecture-notes.md#keeping-a-promise). That is why `: IScheduleItem` ships already on the class: it was half true before you got here.

> [!TIP]
> **`Lab/WeatherBed.cs` is the shape, done once.** Four members, one class, no surprises. Read it, then come back — don't copy it, because a weather bed and a song answer completely different things.
>
> **Still stuck? Write what you can, then run the checks and *read* check 2.** It goes through the promise one member at a time and names the one that isn't answering yet — `Seconds` and `Play()` included, if they ever stop answering. **It says something different depending on how far you've got**, so run it again after each change.

**Run the shift.** DJ name, then `h`, then `q`:

```bash
dotnet run --project week-06/Lab
```

```
│ SONG    │ Nightjar - The Lamplighters                  │ 3:47   │
│ SONG    │ Slack Water - Marguerite Vance               │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ SONG    │ Long Way Round - The Ferrymen                │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
4 items - 0:00 on the clock.
```

**Three rows lit up and you did not touch the code that draws them.** That loop is in `Program.cs`, it has never heard of a song, and it did not change.

**Then the checks:**

```bash
dotnet test week-06/Lab.Checks
```

**2 / 5.**

**Green? Commit it:**

```
week 6 lab: a song knows how to be scheduled
```

---

### Task 3 in full

**Check:** `Check3_TheIdentIsAnItemToo`

At the top of every hour, this station has to say its own call letters out loud. That takes eight seconds and it is not a song — so it is a class of its own, and its entire job is to keep the promise.

Open `Lab/StationId.cs`. `Words` and the constructor ship; the rest is this:

```csharp
public class StationId : IScheduleItem
{
    public string Words { get; }

    // Readable anywhere, moved by Play() and nothing else. Last week's shape.
    public int TimesAired { get; private set; }

    public string Kind => "IDENT";

    public string Cue => Words;

    public int Seconds => 8;

    public StationId(string words)
    {
        Words = words;
    }

    public void Play()
    {
        TimesAired++;
    }
}
```

Three things in there are worth a second before you move on:

- **`: IScheduleItem` after the class name is the promise being made.** [Build the project the moment you have typed it and before you write a member](../lecture-notes.md#keeping-a-promise) — the compiler answers with one `CS0535` per thing you still owe, which is the most useful to-do list you will get tonight.
- **`Seconds => 8` is worked out, not stored.** Nothing is handed in for it and nothing needs to be. [The hour never asks where the number came from](../lecture-notes.md#a-new-kind-costs-one-class) — same shape as `Length` in week 4.
- **`Cue => Words` is one fact under two names.** [The ident already knew what it says](../lecture-notes.md#a-promise-you-already-keep); the property just points at it.

**Then turn it on.** In `Lab/Program.cs`, find the line that starts `// hour.Add(new StationId` and take the `//` off the front. That is the only edit you make to that file in this task.

**Run the shift** — DJ name, `h`, `q`:

```bash
dotnet run --project week-06/Lab
```

```
│ IDENT   │ KDXR 88.1, The Owl                           │ 0:08   │
│ SONG    │ Nightjar - The Lamplighters                  │ 3:47   │
│ SONG    │ Slack Water - Marguerite Vance               │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ SONG    │ Long Way Round - The Ferrymen                │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
5 items - 0:00 on the clock.
```

**A fifth row, at the top, and again nothing that draws the hour changed.**

**Then the checks:**

```bash
dotnet test week-06/Lab.Checks
```

**3 / 5.**

**Green? Commit it:**

```
week 6 lab: the ident is an item too
```

---

### Task 4 in full

**Check:** `Check4_AndSoIsTheAd`

Pham's Bakery bought **three runs** tonight. Somebody paid for those, so the desk has to know how many are left.

Open `Lab/Ad.cs`. `Sponsor`, `Copy`, `Remaining` and the constructor ship. **Everything else is yours, and it is the same two steps as the ident** — the promise, then the four members.

What each one has to be:

- **`Kind`** — one word, and **not one another kind is already using**. There are four sorts of thing on this hour and four words in that column.
- **`Cue`** — two things it must carry, and the wording around them is yours. It has to name the **sponsor**, because an ad the DJ can't attribute is an ad the station runs again for free. And it has to show **how many runs are left on the buy** — that is what the desk prints the moment the spot airs, and it is the only thing on the screen that says an airing actually happened.
- **`Seconds`** — a spot is **thirty seconds**. It has been thirty seconds since radio began, and nothing is handed in for it.
- **`Play()`** — this is the one that counts the other way. Every airing spends one run off the buy. ⚠️ **It never goes below zero:** a station that owes minus one spot has a bug, so the method asks before it spends.

> [!TIP]
> **Task 3 is the template and this should be quicker.** That is the actual lesson of the week showing up in your own hands — [the first kind of thing is not cheaper this way; the third one is](../lecture-notes.md#a-new-kind-costs-one-class).
>
> **Still stuck? Write what you can, then run the checks and *read* check 4.** It takes the four members the promise asks for in turn, then the rule that is easiest to miss — that a buy never goes below zero. **It says something different depending on how far you've got**, so run it again after each change.

> [!IMPORTANT]
> **Four classes now have a method called `Play()` and all four do something different** — one counts up, one counts down, one sets a flag, one is a song. [The loop that calls it never finds out which is which](../lecture-notes.md#the-same-method-four-different-jobs), and that is the whole point rather than an accident.

**Then turn it on**, same as last time: in `Lab/Program.cs`, take the `//` off the line that starts `// hour.Add(new Ad`.

**Run the shift** — DJ name, `h`, `q`:

```bash
dotnet run --project week-06/Lab
```

```
│ IDENT   │ KDXR 88.1, The Owl                           │ 0:08   │
│ SONG    │ Nightjar - The Lamplighters                  │ 3:47   │
│ AD      │ Pham's Bakery - "open at five" (3 left)      │ 0:30   │
│ SONG    │ Slack Water - Marguerite Vance               │ 4:12   │
│ WEATHER │ clear, four below, wind out of the northwest │ 0:45   │
│ SONG    │ Long Way Round - The Ferrymen                │ 5:31   │
╰─────────┴──────────────────────────────────────────────┴────────╯
6 items - 0:00 on the clock.
```

**Six items, four classes, one loop.** And a clock that still insists nothing is scheduled.

**Then the checks:**

```bash
dotnet test week-06/Lab.Checks
```

**4 / 5.**

**Green? Commit it:**

```
week 6 lab: and so is the ad
```

---

### Task 5 in full

**Check:** `Check5_TheHourRunsItself`

Open `Lab/Hour.cs`. It is `Rotation` and `Switchboard` again — a private list, `Add`, `Count`, `All()` — with [one difference, and it is the type in the angle brackets](../lecture-notes.md#a-class-that-holds-a-list-of-a-promise). Those three ship finished. The two at the bottom are yours.

**`TotalSeconds`** — the hour has to add up. Walk the items, add up their `Seconds`, hand back the total. It ships saying `0`, which is why the clock has said `0:00` all night. [The shape is the day-total loop from last week's notes](../lecture-notes.md#a-class-that-holds-a-list-of-a-promise), and nothing in it knows what a song is.

**`Run()`** — put the hour on air. This is the one the whole night has been for:

- Walk the items. **`Play()` each one** — every kind counts an airing differently and this loop will never find out how.
- Add **one line per item** to the list you hand back, so the desk can print it. The shape is the item's `Kind`, then `" - "`, then its `Cue`:

  ```
  SONG - Nightjar - The Lamplighters
  ```

- ⚠️ **`Play()` the item *before* you read its `Cue`.** An ad that has just aired has one fewer run left, and the desk should print what actually happened rather than what was about to.

> [!NOTE]
> **Why `Run()` hands back a list of strings instead of printing.** The same reason every week since week 1: [logic goes in a class where a check can call it](../../week-01/lecture-notes.md#where-your-code-has-to-live), and printing stays in `Program.cs`. Check 5 reads those strings.

> [!TIP]
> **Stuck on this one? Write what you can, then run the checks and *read* check 5.** It takes the total first, then the lines, then whether every kind actually moved rather than just the song — and it is the one that catches reading a `Cue` before you played the item. **It says something different depending on how far you've got**, so run it again after each change.

**Run the shift.** DJ name, then `a`, then `h`, then `q`:

```bash
dotnet run --project week-06/Lab
```

```
  ON AIR  IDENT - KDXR 88.1, The Owl
  ON AIR  SONG - Nightjar - The Lamplighters
  ON AIR  AD - Pham's Bakery - "open at five" (2 left)
  ON AIR  SONG - Slack Water - Marguerite Vance
  ON AIR  WEATHER - clear, four below, wind out of the northwest (read)
  ON AIR  SONG - Long Way Round - The Ferrymen
```

**Six things went out over the air from one `foreach`.** The ad is down to two, the weather bed says it's been read, and the two songs and the ident each moved a number of their own that you cannot see from here.

Press `h` and look at the clock:

```
6 items - 14:53 on the clock.
```

**Fourteen minutes and fifty-three seconds of radio**, added up by a loop that has never heard of a song, an ad, an ident or a forecast.

**Then the checks:**

```bash
dotnet test week-06/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift**, the same way you did after Tasks 2, 3 and 4:

```
week 6 lab: the hour runs itself
```

**That's five commits, and you didn't set out to make any of them** — you saved every time you got somewhere solid.

---

## Now try to break it

The shift is yours. Spend the last few minutes actually attacking it:

```bash
dotnet run --project week-06/Lab
```

- Press `a` **four times**. What does Pham's Bakery's ad say on the fifth? Is that right?
- Take a request as `Dorothy` and pick song **2**. Then press `h`. Where did it go, and how long is the hour now?
- Take a request and press Enter at the song prompt instead of typing a number.
- Take a request and type `banana` at the song prompt.
- Press `a`, then `c`. Dorothy's row says what she asked for — is the play count on that song the real one, or a copy of it?

> [!TIP]
> **Found something odd?** That's the best possible outcome and it's worth a minute. Is it a `Play()` that counts in the wrong direction, a `Cue` read before the item aired, or a genuine design question about what an hour *should* do?

## ⭐ Done early?

1. **A `Jingle`.** Six seconds, no counting, and the station has four of them. One class, and the hour takes it without a single other line changing — [which is the only reason any of this is worth doing](../lecture-notes.md#a-new-kind-costs-one-class).
2. **`Hour.Songs()`.** Hand back just the songs on the hour, so the desk can list what a caller could ask for. [You need `is` for that](../lecture-notes.md#when-one-kind-is-different), and think about what it returns when there are none.
3. **The hour is over an hour.** Give `Hour` a `bool Overruns` — more than 3600 seconds and the DJ has a problem. No field behind it.
4. ⭐ **Write your own promise.** A caller can request a song. They cannot request an advert, and they certainly cannot request the weather. So: an interface of your own — call it `IRequestable`, one member, whatever a caller needs to be able to ask for by name — and put it on `Song` and on nothing else. [The syntax is four lines and it is all in the notes.](../lecture-notes.md#an-interface-is-a-promise) **This is the one item on this list that is also your homework**, so it is worth the ten minutes: tonight's lab hands you `IScheduleItem` already written, and this week's homework asks you to write one from scratch.
5. ⭐ **The one that pays off later:** give `Hour` a `LongestItem()` that hands back the item that runs longest. It returns an `IScheduleItem`, so the caller gets something it can ask three questions and nothing else. In **week 9** that whole loop becomes one line.

6. 🔊 **Record your own ident.** The station has a voice — press `a` and you will hear it. It lives at `week-06/Lab/kdxr.wav`, and it is yours to replace: record eight seconds of your own station saying its own name, save it over that file, and run the shift again. ⚠️ **It has to be a `.wav`** — an `.mp3` plays on a Mac and throws on Windows. Nothing checks this and nothing ever will.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-06/Lab.Checks`. |
| `CS0535: '...' does not implement interface member` | **The good one.** You made the promise and haven't kept it yet — there's one line per member you still owe. [It's a to-do list.](../lecture-notes.md#keeping-a-promise) |
| `CS1503: cannot convert from 'Ad' to 'IScheduleItem'` | You uncommented the line in `Program.cs` before the class kept the promise. Add `: IScheduleItem` after the class name. |
| `CS0501: 'Ad.Play()' must declare a body` | You copied the interface's `void Play();` into the class. In a class it needs `{ }` — [the semicolon version only belongs in the interface](../lecture-notes.md#an-interface-is-a-promise). |
| `CS0525: Interfaces cannot contain instance fields` | You edited `IScheduleItem.cs`. Don't — it ships written. |
| `CS0144: Cannot create an instance of the abstract type or interface` | You wrote `new IScheduleItem(...)`. [There is nothing there to make.](../lecture-notes.md#an-interface-is-a-promise) |
| `CS0161: not all code paths return a value` | `Run()` or `TotalSeconds` has a road through it that returns nothing — usually a `return` inside the loop instead of after it. |
| `CS1002` or `CS1525` where `TotalSeconds` is | You put a loop inside `=> 0`. An `=>` property computes one expression and has no room for statements — it becomes `{ get { ... } }`. [The shape is in the notes.](../lecture-notes.md#a-class-that-holds-a-list-of-a-promise) |
| `CS0246: The type or namespace name 'IScheduleItem' could not be found` | The spelling. Capital `I`, capital `S`, capital `I` — `IScheduleItem`. |
| The hour still shows `?` for the songs | `Song.Kind` is still the shipped `"?"`. Both members have to change, not just one. [What each one is for.](../lecture-notes.md#keeping-a-promise) |
| The clock still says `0:00` | `TotalSeconds` is still the shipped `=> 0`. That's Task 5, and [the shape is in the notes](../lecture-notes.md#a-class-that-holds-a-list-of-a-promise). |
| `a` prints nothing | `Run()` is still handing back an empty list. That's Task 5 too. |
| The ident or the ad never appears | The `hour.Add(...)` line in `Program.cs` is still commented out. Tasks 3 and 4 each turn one on. |
| Pham's Bakery says `-1 left` | `Play()` is spending a run it doesn't have. Ask before you spend — [each kind counts its own way](../lecture-notes.md#the-same-method-four-different-jobs), and this is the one that counts down. |
| The ON AIR line shows the ad's count *before* it aired | You read `Cue` before calling `Play()`. Swap the two lines. |
| Two kinds of item share a word in the KIND column | Four sorts of thing, four words — [that column is what the one loop prints](../lecture-notes.md#one-list-one-loop). The check says which two collided. |
| `dotnet test` passes but the hour still looks wrong | Run the program, not just the checks. The checks never look at `Program.cs`, and most of tonight is only visible on the hour. |
| Breakpoints never stop | Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. `.NET: Restart Language Server` does not fix it. |
| <kbd>F5</kbd>'s project list has no `week-06` in it | The editor learned which projects exist when you opened the folder, and this week's did not exist yet. **`Developer: Reload Window`.** |
| Not sure what an interface actually *is* | [An interface is a promise](../lecture-notes.md#an-interface-is-a-promise) — three lines, and none of them is a class. |
| Not sure why the printing loop never changes | [One list, one loop](../lecture-notes.md#one-list-one-loop). It asks questions instead of naming types. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 6 lab: a song knows how to be scheduled"
> ```

**Prev:** [Week 5 Lab — The Switchboard](../../week-05/lab/) · **Next:** [Week 6 Homework — Two Kinds of Row](../homework.md)
