# Week 9 Lab — The Night's Numbers 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the desk knows more than it can say. It has the carts, it has the hour, it has every call that came in. Ask it *"which carts are long enough to cover the news?"* and there is no answer, because nobody was ever going to write a loop for that.

Tonight [every answer is one line](../lecture-notes.md#thirty-lines-become-one).

Your job: change two loops that already work into one line each, and prove nothing moved. Then give the rotation three questions it can answer.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all four checks green, and three lines of the `[n]` screen that are yours.**

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except `Rotation.cs`, and nothing tonight depends on remembering last week's code — only on reading this week's.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch the **switchboard** and the **hour** get changed, then copy those finished files into your project before each task. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, all of them finished, and the copy commands work the same.

## Setup

Four steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

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
cp -r ../dotnet-db-starters/week-09 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-09` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-09`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — three projects again, same as last week:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-09/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — Rotation.cs has tonight's work in it
   ├─ Lab.Tests/           ← YOURS — four facts ship written; you add one tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-09` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight the rotation learns to answer questions, and the homework has your own registry do the same.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-09/Lab.Checks
```

**1 / 4 passing.** Check 1 is everything the desk already does, and it stays green all night. **The three red ones are tonight's questions** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 9: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-09/Lab.Checks`, `dotnet test week-09/Lab.Tests` and `dotnet run --project week-09/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

**Two suites and a desk, same as last week:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-09/Lab` | the desk | what any of it looks like on the air |
| `dotnet test week-09/Lab.Checks` | mine | *can the rotation answer it?* — 1 through Task 1, then 2, 3, 4 |
| `dotnet test week-09/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 4 facts now; your instructor's makes 5, and yours makes 6 |

| File | What it is |
|---|---|
| `Lab/Rotation.cs` | **Yours, all night.** Two loops to rewrite in Task 1, and three empty methods for Tasks 2, 3 and 4. |
| `Lab.Tests/DeskTests.cs` | **Yours.** Three facts ship written; one more goes in at Task 1. |
| `Lab/Switchboard.cs`, `Lab/Hour.cs` | **Your instructor's.** You copy the finished files in at the start of each task, and read them as you work. You never edit them. |
| `Lab.Tests/SwitchboardTests.cs` | **Your instructor's facts**, copied in at Task 1. |
| `Lab/Program.cs` | Shipped, finished. It already calls every method you are about to write. |
| `Lab.Checks/DeskChecks.cs` | My four. **Read-only, as always.** |

💡 **Two keys on the desk are new tonight.** `f` finds a cart by its title. `n` shows *the night's numbers*: one line for each of tonight's questions. The top four lines and the running order are your instructor's. **The middle three are yours**, and each shows a dash until you write the method behind it.

## The tasks

**The rhythm is the same every time:** run the desk and *look* → write the code → run the desk again and *see the difference* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need, and [all of tonight's words are in one table](../lecture-notes.md#the-words-you-need-tonight). **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole method is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green — and has to stay that way)* | Write one fact, then turn two working loops into one line each. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheDeskFindsALongCart` | The carts long enough to cover the news. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheDeskReadsOffItsTitles` | Just the titles. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheCartsComeBackInOrder` | In order by title, with the rotation left alone. **[Task 4 in full ↓](#task-4-in-full)** |

---

### Task 1 in full

**Check:** `Check1_TheDeskStillAnswers` — **and it is already green.**

This task is different from every other one you have done. **Nothing goes from red to green.** You are going to change two pieces of code that work, and the check count is going to stay at 1 / 4. Your own suite is how you'll know nothing broke.

**First, bring in your instructor's code.** Pull the starters clone, then copy the two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-09/Switchboard.cs week-09/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-09/SwitchboardTests.cs week-09/Lab.Tests/
```

Open `week-09/Lab/Switchboard.cs` and look at `Find` and at the bottom of `Load`. Each was a loop, and each is one line now. That's what you just watched. Open `week-09/Lab.Tests/SwitchboardTests.cs` and read `FindHandsBackTheCallerOrNothing`: it's the fact you're about to write, for the switchboard.

**Now see what you're about to change.** Start the desk and type a DJ name:

```bash
dotnet run --project week-09/Lab
```

**Press `f` and type `Nightjar`:**

```
  Found: Nightjar - The Lamplighters (3:47)
```

**Press `f` again and type `Owl Hours`:**

```
  No cart called "Owl Hours" in the rotation.
```

**Both answers are right.** `Rotation.Find` handed back the cart the first time and nothing the second time. Press `q`.

**Then run both suites, so you know where each one starts.** Mine:

```bash
dotnet test week-09/Lab.Checks
```

**1 / 4.**

Yours:

```bash
dotnet test week-09/Lab.Tests
```

**5 passed** — the three in `DeskTests.cs`, and your instructor's two.

#### First, the fact — before you touch `Find`

**Write it in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 1` comment.** It pins down what `Find` answers while `Find` is still the loop you can read. The same three moves as every fact: set the scene, do the thing, check the answer.

- **Set the scene.** A `Rotation`. A `Song` in a variable — `new Song("Nightjar", "The Lamplighters", 227)` — added to the rotation.
- **Check the cart that is there.** `Assert.Same(expected, actual)` passes only when both are the **same object**. Expected is your song variable. Actual is `rotation.Find("Nightjar")`. `Find` hands back the cart itself, never a copy.
- **Check the title nobody has.** `Assert.Null(value)` passes when the value is `null`. Ask `Find` for a title you didn't add, like `"Owl Hours"`.
- Name the fact after the rule it proves. Mine is `FindHandsBackTheCartOrNothing`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void FindHandsBackTheCartOrNothing()
    {
        Rotation rotation = new Rotation();
        Song nightjar = new Song("Nightjar", "The Lamplighters", 227);
        rotation.Add(nightjar);

        Assert.Same(nightjar, rotation.Find("Nightjar"));
        Assert.Null(rotation.Find("Owl Hours"));
    }
```

</details>

**Run yours:**

```bash
dotnet test week-09/Lab.Tests
```

**6 passed.** It went green the first time, **and that is not a mistake.** `Find` already works, so a fact about `Find` passes. This fact isn't there to catch a bug. It's there so you can change `Find` and know you didn't break it.

#### Now make `Find` one line

**In `Lab/Rotation.cs`, under the first `TODO — Task 1` comment.** Replace the whole `foreach` loop **and** the `return null;` under it with one `return` line. Here is what that line needs:

- **`_songs.FirstOrDefault(question)`** hands back the first song the question is true for. If it is true for none of them, it hands back `null`. That is exactly what the loop did when it reached the end.
- **The question** goes in the brackets, and it is asked of one song at a time: `song => song.Title == title`. Read it as *"song goes to: is this song's title the title I was handed?"* `song` is a name you pick. The `=>` is the only new syntax tonight, and [the notes read one out loud](../lecture-notes.md#reading-a-lambda-out-loud).

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public Song? Find(string title)
    {
        return _songs.FirstOrDefault(song => song.Title == title);
    }
```

</details>

**Run the desk and do the same two finds:** DJ name, `f`, `Nightjar`, then `f`, `Owl Hours`, then `q`.

```bash
dotnet run --project week-09/Lab
```

```
  Found: Nightjar - The Lamplighters (3:47)
```

```
  No cart called "Owl Hours" in the rotation.
```

**The same two answers.** Then yours:

```bash
dotnet test week-09/Lab.Tests
```

**6 passed.** Then mine:

```bash
dotnet test week-09/Lab.Checks
```

**1 / 4 — exactly where you started.** Five lines of loop are gone, and two commands just told you `Find` still answers the same way.

#### Make it fail once

A fact that has never been red hasn't proved it can catch anything. **In your new line, change `FirstOrDefault` to `First`**, and run your suite:

```bash
dotnet test week-09/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.FindHandsBackTheCartOrNothing
  Error Message:
   System.InvalidOperationException : Sequence contains no matching element
```

**Red.** `First` does not hand back `null` when it finds nothing. It throws. ([Every word does something when nothing matches.](../lecture-notes.md#on-an-empty-sequence)) **Now see it on the desk:** DJ name, `f`, `Owl Hours`.

```bash
dotnet run --project week-09/Lab
```

```
Unhandled exception. System.InvalidOperationException: Sequence contains no matching element
```

**The desk crashed on a title that isn't there.** The loop could never do that. **Put `FirstOrDefault` back**, and run your suite again:

```bash
dotnet test week-09/Lab.Tests
```

**6 passed.**

#### And the loop at the bottom of `Load`

**In `Lab/Rotation.cs`, under the second `TODO — Task 1` comment.** That loop puts every loaded cart into the rotation, one at a time. It isn't asking a question, so [it isn't a query](../lecture-notes.md#a-loop-that-fills-a-list-is-not-a-question). The list already has a method for the job:

- **`_songs.AddRange(loaded)`** adds every item of another list in one call. Replace the `foreach` loop with it.
- ⚠️ **The `_songs.Clear();` above it stays.** Loading replaces what the rotation holds.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
        _songs.Clear();

        _songs.AddRange(loaded);
    }
```

</details>

**`Load` only shows on a second run**, because it reads the carts the last shift saved. **Run the desk, type a DJ name, press `t`, then `q`. Then run it again and press `t` once more.**

```bash
dotnet run --project week-09/Lab
```

```
3 carts loaded.
```

**Three carts, both times.** If the second run says `6 carts loaded.`, the `Clear()` is gone and the loaded carts went in on top of the ones already there. Press `q`.

**Then yours:**

```bash
dotnet test week-09/Lab.Tests
```

**6 passed.** One of the facts that shipped, `ACartRemembersItsPlays`, saves a rotation and loads it into a second one. That is the fact watching `Load` for you.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**1 / 4.**

**Commit it:**

```
week 9 lab: Find and Load, one line each
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Try the first item of [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [`FirstOrDefault`, and what `First` does instead](../lecture-notes.md#firstordefault--the-one-or-nothing-at-all) · [a fact about nothing being there](../lecture-notes.md#writing-a-fact-about-nothing-being-there).

---

### Task 2 in full

**Check:** `Check2_TheDeskFindsALongCart`

**First, bring in your instructor's code.** Pull the starters clone, then copy the two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-09/Switchboard.cs week-09/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-09/Hour.cs week-09/Lab/
```

**Now look at the night's numbers.** Run the desk, type a DJ name, and press `n`:

```bash
dotnet run --project week-09/Lab
```

```
  the switchboard      5 calls from 3 people
  rang more than once  Dorothy
  busiest two          -
  the regular          -

  over four minutes    -
  the titles           -
  in order by title    -
```

**The top two lines answer now.** That's your instructor's `Sum` and `Where`, in the `Switchboard.cs` you just copied in, running on your desk. **The three in the middle are yours, and all three are dashes.** Press `q`.

*(Working at home, or copied the files in late? Then more of the top lines have answers already. If you've taken requests with `r`, the numbers are bigger. Only your three lines matter here.)*

**Write `LongerThan` — in `Lab/Rotation.cs`, under the `TODO — Task 2` comment.** The 4 AM news runs four minutes, and the DJ needs a cart that covers it. Replace the `return new List<Song>();` line with one line that hands back every cart longer than `seconds`:

- **`_songs.Where(question)`** keeps the songs the question is true for and drops the rest. It keeps them in the order it found them.
- **The question** is asked of one song at a time, and it answers yes or no: is this song's `Seconds` greater than the `seconds` handed in?
- **`.ToList()`** goes on the end. `Where` does not hand back a list, and this method has to. ([Why every one of tonight's methods ends with it.](../lecture-notes.md#tolist-and-why-every-query-here-ends-with-it))

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public List<Song> LongerThan(int seconds)
    {
        return _songs.Where(song => song.Seconds > seconds).ToList();
    }
```

</details>

**Run the desk: DJ name, then `n`, then `q`.**

```bash
dotnet run --project week-09/Lab
```

```
  over four minutes    Slack Water, Long Way Round
```

**Two of the three.** Nightjar is 3:47, so it isn't on the line.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**2 / 4.**

**Green? Commit it:**

```
week 9 lab: a cart long enough for the news
```

> [!NOTE]
> **In class, stop here.** Task 3 comes after the next part of the demo. Finished early? Try item 1 of [⭐ Done early?](#-done-early), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [`Where` — keeping some of them](../lecture-notes.md#where--keeping-some-of-them).

---

### Task 3 in full

**Check:** `Check3_TheDeskReadsOffItsTitles`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-09/Hour.cs week-09/Lab/
```

**Run the desk, type a DJ name, and press `n`:**

```bash
dotnet run --project week-09/Lab
```

```
  the titles           -
  in order by title    -

  the running order:
    IDENT - KDXR 88.1, The Owl
    SONG - Nightjar - The Lamplighters
    AD - Pham's Bakery - "open at five" (3 left)
    SONG - Slack Water - Marguerite Vance
    WEATHER - clear, four below, wind out of the northwest
    SONG - Long Way Round - The Ferrymen
```

**The running order is there now.** That's your instructor's `Select`, in the `Hour.cs` you just copied in. It turned every item in the hour into one line of text, without putting any of it on air — [`Run()` does that, and stays a loop](../lecture-notes.md#what-should-stay-a-loop). **`the titles` is still a dash.** Press `q`.

**Write `Titles` — in `Lab/Rotation.cs`, under the `TODO — Task 3` comment.** Replace the `return new List<string>();` line with one line that hands back just the title of every cart:

- **`_songs.Select(question)`** keeps **every** song and hands back one thing about each. `Where` keeps some of the songs. `Select` keeps all of them and changes what each one is.
- **The question** answers with the thing you want from each song. Here that is the song's `Title`. A list of songs goes in, and a list of strings comes out.
- **`.ToList()`** on the end, the same as Task 2.
- ⚠️ **In the rotation's own order.** Putting them in order is Task 4.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public List<string> Titles()
    {
        return _songs.Select(song => song.Title).ToList();
    }
```

</details>

**Run the desk: DJ name, then `n`, then `q`.**

```bash
dotnet run --project week-09/Lab
```

```
  the titles           Nightjar, Slack Water, Long Way Round
```

**Three titles, in the order the carts were loaded.**

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**3 / 4.**

**Green? Commit it:**

```
week 9 lab: just the titles
```

> [!NOTE]
> **In class, stop here.** Task 4 comes after the next part of the demo. Finished early? Try item 2 of [⭐ Done early?](#-done-early), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [`Select` — turning each one into something else](../lecture-notes.md#select--turning-each-one-into-something-else).

---

### Task 4 in full

**Check:** `Check4_TheCartsComeBackInOrder`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-09/Switchboard.cs week-09/Lab/
```

**Run the desk, type a DJ name, and press `n`, then `t`:**

```bash
dotnet run --project week-09/Lab
```

```
  in order by title    -
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
```

**The last dash is yours.** And look at the cart table: Nightjar, Slack Water, Long Way Round. **That is the rotation's own order, and it must look exactly like that when you've finished.** Press `q`.

**Write `ByTitle` — in `Lab/Rotation.cs`, under the `TODO — Task 4` comment.** Replace the `return new List<Song>();` line with one line that hands back every cart, in order by title:

- **`_songs.OrderBy(question)`** hands back the songs in order, smallest first. For text that means A to Z.
- **The question** answers with the thing to put them in order by. Here that is the song's `Title`.
- **`.ToList()`** on the end.

> [!CAUTION]
> **`OrderBy` builds a new list in sorted order and leaves `_songs` alone. `_songs.Sort(...)` does not: it rearranges the rotation itself.** If you reach for `Sort`, the rotation comes out in a different order than the carts were loaded in, and `Save` writes the file in that new order. Nothing tells you. **Check 4 looks for exactly this.**

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public List<Song> ByTitle()
    {
        return _songs.OrderBy(song => song.Title).ToList();
    }
```

</details>

**Run the desk: DJ name, then `n`, then `t`, then `q`.**

```bash
dotnet run --project week-09/Lab
```

```
  in order by title    Long Way Round, Nightjar, Slack Water
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
```

**The answer is in order. The rotation is not, and that is right.** The cart table is still Nightjar, Slack Water, Long Way Round. *(Your `PLAYED` numbers are bigger if you've aired the hour. The order is what matters.)*

**Now check the file.** Open `week-09/rotation.json` and look at the three `"Title"` lines:

```json
    "Title": "Nightjar",
    "Title": "Slack Water",
    "Title": "Long Way Round",
```

**Still the order the carts were loaded in.** Asking for the carts in order did not rewrite the file.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**4 / 4.**

**And yours:**

```bash
dotnet test week-09/Lab.Tests
```

**6 passed.**

**Then clock out — commit the shift:**

```
week 9 lab: in order, and the rotation left alone
```

**Four commits after the starter, four green checks, and three lines of the night's numbers that are yours.**

> [!NOTE]
> **In class, stop here.** The demo has one more part. After it, if your lab is done, [start the homework](../homework.md#part-1--catch-up-branch-and-bring-in-this-weeks-checks): it's this lab again, on your own project. Do Part 1 and Task 1 and push your branch before you leave, while your instructor is in the room to help. [Now try to break it](#now-try-to-break-it) and [⭐ Done early?](#-done-early) are there if you want more. Working at home? Carry straight on.

📖 *Further reading:* [`OrderBy` — and it leaves the thing you asked alone](../lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone).

---

## Now try to break it

```bash
dotnet run --project week-09/Lab
```

- **Take the `Clear()` out of `Load`**, run the desk twice, and press `t` on the second run. Then run my checks and read check 1's message. Put it back.
- **Change `>` to `>=` in `LongerThan`.** Press `n`: the line looks the same. Run my checks: check 2 is red. Nightjar is exactly 227 seconds long, and the check asks at 227.
- **Take `.ToList()` off the end of `LongerThan`.** It doesn't build: `CS0266`. `Where` hands back something that isn't a list yet.
- **Swap `OrderBy` for `Sort` in `ByTitle`.** Replace the line with these two:

  ```csharp
          _songs.Sort((a, b) => a.Title.CompareTo(b.Title));
          return _songs;
  ```

  Press `n`, then `t`. The `in order by title` line looks right. Now look at the cart table, then press `q` and open `week-09/rotation.json`. Run my checks and read check 4's message. ⚠️ **Then put `OrderBy` back and delete `week-09/rotation.json`**: the wrong order is saved in it, and the next shift would load it.
- **Type `nightjar` at the `f` prompt**, with a small n. The desk says there's no such cart. Is that a bug? [Hold that thought.](#-stuck)

## ⭐ Done early?

None of these has a check. Each one is a method on `Rotation` — add it at the bottom of `Rotation.cs`, and write a fact for it in `DeskTests.cs` if you want proof.

1. **What hasn't been out tonight.** Write `NeverPlayed()`: every cart whose `PlaysTonight` is `0`. It's Task 2's line with a different question in it. ⚠️ **Delete `week-09/rotation.json` first** — play counts survive a restart, so your carts may already have plays on them.
2. **Add it up.** Write a `TotalSeconds` property on `Rotation`: every cart's `Seconds`, added together. [`Sum`](../lecture-notes.md#sum-count-and-average--one-number-out-of-many) is the word, and your instructor's `Hour.TotalSeconds` is the same line on a different list.
3. **The longest cart.** Write `Longest()`, handing back a `Song?`: the one cart with the most `Seconds`. [`MaxBy`](../lecture-notes.md#maxby--the-item-with-the-biggest-something) is the word. Then say what it hands back when the rotation is empty, and look at how your instructor's `TheRegular` deals with that.
4. **What the desk worked hardest.** Write `TopPlayed(int n)`: the `n` carts with the most plays, most first. `OrderByDescending`, then [`Take`](../lecture-notes.md#take--stop-after-n), then `ToList`. Your instructor's `Busiest` is the same line. ⚠️ **Delete `week-09/rotation.json` first**, air the hour, take one request, air it again, and then ask.
5. **A yes or a no.** Write `AnythingAired()`, handing back a `bool`: has any cart been out tonight? [`Any`](../lecture-notes.md#any--a-yes-or-a-no) answers that in one word. It isn't `Where` followed by a count.
6. **Just the songs.** The hour holds four kinds of items. In a fact, build an `Hour`, add an ident, a song and an ad, and count only the songs: [`hour.All().OfType<Song>().Count()`](../lecture-notes.md#oftype--the-ones-that-turned-out-to-be-a-certain-kind).
7. **When does a question get asked?** Your instructor's last fact is in the starters repo. Copy it in and run it:

   ```bash
   cp ../dotnet-db-starters/demo/week-09/BusyCallerTests.cs week-09/Lab.Tests/
   ```

   Take the `.ToList()` off the end of its `Where` line, run your suite, and read the failure. [The notes say what happened.](../lecture-notes.md#a-query-is-a-question-not-an-answer)
8. ⭐ **The one that pays off later:** every question tonight was asked of a list that is already in your program's memory. In **week 10** the carts move into a database, and in **week 12** a line like `Where(song => song.Seconds > 240)` is answered by the database instead of by your program.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-09/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. Your task doesn't need the file to start. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-09/Lab.Checks`. |
| `CS0266: Cannot implicitly convert type 'IEnumerable<Song>' to 'List<Song>'` | The `.ToList()` on the end is missing. `Where`, `Select` and `OrderBy` don't hand back a list. |
| `CS0103: The name 'song' does not exist in the current context` | The question is missing its front half. `Where(song.Seconds > seconds)` has to be `Where(song => song.Seconds > seconds)`. |
| `CS0029: Cannot implicitly convert type 'string' to 'bool'` | One `=` where two belong, inside `Find`'s question. `==` compares; `=` assigns. |
| `CS0029: Cannot implicitly convert type 'List<Song>' to 'List<string>'` | `Titles` is handing back whole songs. The question in `Select` has to answer with the song's `Title`. |
| `CS0029: Cannot implicitly convert type 'void' to 'List<Song>'` | You tried to `return _songs.Sort(...)`. `Sort` hands nothing back, because it rearranges the list itself. `OrderBy` is the word for Task 4. |
| `InvalidOperationException: Sequence contains no matching element` | `First` where `FirstOrDefault` belongs. `First` throws when it finds nothing. |
| Check 1 red, and it was green when you started | A rewrite changed an answer. Read the message: it names `Find` or `Load` and says which line to look at. |
| The rotation has **six** carts on the second run | `Load` lost its `Clear()` when the loop became `AddRange`. |
| Your Task 1 fact is red before you've changed `Find` | Check the title you asked for is spelled exactly like the one you added, capital letters included. |
| `over four minutes` shows all three carts | The comparison is the wrong way round. |
| `the titles` comes out in alphabetical order | There's an `OrderBy` in `Titles`. That's Task 4's job, and check 3 says so. |
| Check 4 red: *Sorting the rotation SORTED THE ROTATION* | `Sort` instead of `OrderBy`. Fix the line, then delete `week-09/rotation.json`. |
| The carts are in the wrong order even after you fixed `ByTitle` | The wrong order was saved to `week-09/rotation.json`, and every shift loads it. Delete that file. |
| The top lines of `n` don't match this page | They're your instructor's, and they depend on which files you've copied in and whether you've taken requests. Only your three lines have to match. |
| `f` can't find `nightjar` and you can see Nightjar in the table | The titles are compared exactly, capital letters included. **If you're wondering whether they should be, hold that thought: it's a database-week conversation.** |
| `dotnet test` passes and the shift looks wrong | Run the program, not just the suites. Neither one looks at `Program.cs`. |
| Red squiggles under `Where` or `Assert`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |
| Not sure how to read `song => song.Seconds > seconds` | [One shape, read out loud](../lecture-notes.md#one-shape-and-it-does-not-change) — the list, the word, and the question. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 9 lab: Find and Load, one line each"
> ```

**Prev:** [Week 8 Lab — The Log Book](../../week-08/lab/) · **Next:** [Week 9 Homework — Three Questions](../homework.md)
