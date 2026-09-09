# Week 9 Lab — The Night's Numbers 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the desk knows more than it can say. It has the carts, it has the hour, it has every call that came in — and if the DJ asks *"what haven't we played yet?"* there is no answer, because nobody was ever going to write a loop for it.

Tonight you write seven answers. And you start by **deleting seven loops that already work.**

**Time:** ~50 minutes in class — **target tonight: all five checks green, and a screen that fills itself in.**

> [!IMPORTANT]
> **Task 1 turns nothing green, and that is the whole point of it.** You will delete seven working loops and the check count will sit exactly where it started. **Your own test suite is how you find out it worked.** That is what [last week's ⭐ *Done early?* item promised you](../../week-08/lab/README.md): *your suite is how you'll prove the one-liners do the same job.*

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished, the loops you are replacing are all in front of you whether you wrote them or not, and nothing tonight depends on remembering last week's code.

## Setup

Four steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

**1. Confirm your coursework window is open.** If VS Code is already showing `dotnet-db-coursework` from last week — done, skip to step 2. Otherwise: **File → Open Folder → `dotnet-db-coursework` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder at all?** Then you're starting from scratch, which is fine — [week 1's setup guide](../../week-01/setup-guide.md) makes it and connects it to GitHub. Do that first; nothing tonight depends on having been here last week.

**2. Update your starters clone — from the terminal you already have.** `` Ctrl+` `` (it opens standing at the top of your repo), then:

```bash
cd ../dotnet-db-starters
```

```bash
git pull
```

```bash
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
   ├─ Lab/                 ← the desk — four of its files have work in them
   ├─ Lab.Tests/           ← YOURS, carried forward. One fact goes in it tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-09` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight KDXR learns to answer questions, and the homework has your own registry do the same.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-09/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the desk already does — including the seven methods you are about to rewrite. **It is green now, and its only job tonight is to still be green when you have finished deleting things.**

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 9: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-09/Lab.Checks`, `dotnet test week-09/Lab.Tests` and `dotnet run --project week-09/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

**Two suites and a desk, same as last week:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-09/Lab` | the desk | what any of it looks like on the air |
| `dotnet test week-09/Lab.Checks` | mine | *can the desk answer it?* — climbs 1 → 5 as you build it |
| `dotnet test week-09/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 3 facts now, 4 by the end |

| File | What it is |
|---|---|
| `Lab/Rotation.cs` | **Two loops to delete and three empty methods.** Tasks 1, 2, 3 and 4 |
| `Lab/Hour.cs` | **Two loops to delete and one empty method.** Tasks 1 and 5 — and one loop that stays |
| `Lab/Switchboard.cs` | **Two loops to delete.** Task 1 |
| `Lab/Broadcast.cs` | **One loop to delete.** Task 1 |
| `Lab.Tests/DeskTests.cs` | **Yours.** Three facts ship written; one more goes in at Task 1 |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always — but read check 1.** It is the reason tonight is safe |
| `Lab/Program.cs` | Shipped, finished, and **it already calls everything you are about to write** |

💡 **Tonight's whole vocabulary is [one table — the words, and what each one hands back](../lecture-notes.md#the-words-you-need-tonight)**, and every one of them is [the same three parts read the same way](../lecture-notes.md#reading-a-lambda-out-loud).

💡 **The new screen is `[n]` — the night's numbers.** Seven lines. Four of them answer already, because four of tonight's methods work perfectly and are about to be deleted anyway. The other three are blank, and each task fills one in.

## The tasks

**The rhythm is the same all five times, and the order is the lesson:** run the desk and *look at the screen* → write the code → run the desk again and *see the line fill in* → run my checks (the count climbs). **Commit every time a check goes green** — each task hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green — and has to stay that way)* | Write one fact, then delete seven working loops. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheDeskFindsALongCart` | Something long enough to cover the news. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheDeskKnowsWhatHasNotBeenOut` | The carts nobody has aired tonight. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheDeskKnowsWhatItPlayedMost` | What the desk worked hardest. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheHourReadsWithoutAiring` | Read the hour without putting it on the air. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

**Check:** `Check1_TheDeskStillAnswers` — **and it is already green.**

This task is different from every other task you have done in this course. **Nothing goes from red to green.** You are going to delete about forty lines of code that works, and the number on the screen is going to stay exactly where it is.

**First, look at what you are about to change.** Start the shift, type a DJ name, and press `n`:

```bash
dotnet run --project week-09/Lab
```

```
── the night's numbers ─────────────────────────────
  the rotation         3 carts, 13:30 on the clock
  the switchboard      5 calls from 3 people
  the regular          Dorothy
  longest in the hour  Long Way Round - The Ferrymen (5:31)

  over four minutes    -
  never been out       -
  worked hardest       -

  coming up, not yet aired:
```

**The top four lines are right.** Four loops produced them and every one of those loops is correct. **The bottom three are blank**, and they are Tasks 2, 3 and 4. Press `q`.

**Now run both suites, and write both numbers down.**

```bash
dotnet test week-09/Lab.Checks
```

**1 / 5.**

```bash
dotnet test week-09/Lab.Tests
```

**3 passed.**

#### First, the fact — before you touch anything

Open **`week-09/Lab.Tests/DeskTests.cs`** and find the `TODO — Task 1` comment. You are going to pin down what `Switchboard.TheRegular()` answers **while it is still the loop you can read**, so that when the loop is gone you can prove nothing moved.

Two situations, and the second is the one a rewrite breaks:

```csharp
    [Fact]
    public void TheRegularIsWhoeverRangMost()
    {
        Switchboard quiet = new Switchboard();

        Assert.Equal("nobody yet", quiet.TheRegular());
        Assert.Equal(0, quiet.TotalCalls);

        Switchboard board = new Switchboard();
        board.Take("Dorothy");
        board.Take("Bex");
        board.Take("Dorothy");

        Assert.Equal("Dorothy", board.TheRegular());
        Assert.Equal(3, board.TotalCalls);
    }
```

```bash
dotnet test week-09/Lab.Tests
```

**4 passed.** It went green immediately, **and that is not a mistake.** It describes code that already works. It is not there to catch anything — it is there so that in about ten minutes you can delete that code and know.

#### Now the seven loops

[The notes open with the receipt](../lecture-notes.md#thirty-lines-become-one): every one of these was promised to you as one line, in the week you wrote it. Work down the list. **The first four are written out; the last three are the same lines with different nouns.**

**1 — `Lab/Hour.cs`, `TotalSeconds`.** Week 7's. Replace the whole property with:

```csharp
    public int TotalSeconds => _items.Sum(item => item.Seconds);
```

[`Sum` takes the list and the thing to add up about each one](../lecture-notes.md#sum-count-and-average--one-number-out-of-many). `item` is a name you pick; the compiler already knows what is in the list. **If the `=>` is new, [read one out loud first](../lecture-notes.md#reading-a-lambda-out-loud)** — it takes thirty seconds and it is the only new syntax tonight.

⚠️ **There are TWO arrows on that line and they mean different things.** The first one says *this property is one expression* — you have had that since week 4, in `Kind => "SONG"`. The second is inside the brackets and it is tonight's. [Both are named in the notes](../lecture-notes.md#reading-a-lambda-out-loud), and it is worth thirty seconds now rather than confusion at Task 3.

**2 — `Lab/Switchboard.cs`, `TheRegular()`.** Week 3's, and [the one to slow down on](../lecture-notes.md#on-an-empty-sequence). Replace the body with:

```csharp
        return _callers.MaxBy(caller => caller.CallsTonight)?.Name ?? "nobody yet";
```

⚠️ **The two operators on the end are not decoration.** [`MaxBy` hands back `null` for an empty list](../lecture-notes.md#maxby--the-item-with-the-biggest-something), so `?.` means *don't ask a nothing for its Name*, and `??` means *and when there is nothing, say this instead*. **That is exactly what `string best = "nobody yet";` above the loop was doing.** Take them off and check 1 goes red — try it, it takes ten seconds.

**3 — `Lab/Broadcast.cs`, `LastShift`.** Week 8's. Replace the body **below the `File.Exists` guard** with:

```csharp
        return File.ReadAllLines(path).LastOrDefault() ?? "";
```

⚠️ **The `File.Exists` guard at the top stays.** `ReadAllLines` throws on a file that isn't there, so LINQ never gets a chance to be asked anything. What goes is the array indexing *and* the empty-array check — [`LastOrDefault` copes with both](../lecture-notes.md#firstordefault--the-one-or-nothing-at-all).

**Now the last four are yours, and three of them are lines you have already written tonight with different nouns:**

- **`Lab/Rotation.cs`, `TotalSeconds`** — week 4's. The same as Hour's, over `_songs`. [`Sum`.](../lecture-notes.md#sum-count-and-average--one-number-out-of-many)
- **`Lab/Switchboard.cs`, `TotalCalls`** — week 5's. The same again, over `_callers`.
- **`Lab/Hour.cs`, `LongestItem()`** — week 6's. [`MaxBy`](../lecture-notes.md#maxby--the-item-with-the-biggest-something), like `TheRegular` — but this one hands back **the item**, not a name, so there is nothing to put a `?.` in front of. Its return type already says it can come back empty.
- **`Lab/Rotation.cs`, inside `Load`** — week 8's other one, and ⚠️ **this one is not LINQ at all.** The job is *put all of these in*, which is not a question — and [the list already has a method for it](../lecture-notes.md#thirty-lines-become-one). One call, and the name says exactly what it does. ⚠️ **The `_songs.Clear();` above it stays**: loading is replacing, and without it the rotation ends the night with six carts.

**Run the desk, press `n`, and compare it with what you wrote down:**

```bash
dotnet run --project week-09/Lab
```

```
  the rotation         3 carts, 13:30 on the clock
  the switchboard      5 calls from 3 people
  the regular          Dorothy
  longest in the hour  Long Way Round - The Ferrymen (5:31)
```

**Identical. Every number the same.** Press `q`.

**Then yours, and this is the moment the task exists for:**

```bash
dotnet test week-09/Lab.Tests
```

**4 passed.**

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**1 / 5 — exactly where you started.**

> [!IMPORTANT]
> **Read that number again.** You deleted about forty lines of a program you did not write, and two commands told you in under a second that you had broken nothing. **That is what a test suite is actually for.** Every check you have ever run caught something; these two gave you permission.

**Commit it:**

```
week 9 lab: seven loops, gone
```

---

### Task 2 in full

**Check:** `Check2_TheDeskFindsALongCart`

**First, look at the blank.** Run the desk, DJ name, then `n`:

```bash
dotnet run --project week-09/Lab
```

```
  over four minutes    -
```

**The desk has three carts and their lengths and it cannot tell you which are long.** Press `q`.

The 4 AM news feed runs four minutes. The DJ needs a cart that covers it. **Write it — in `Lab/Rotation.cs`, under the `TODO — Task 2` comment.** This is your first `Where`, so here it is:

```csharp
    public List<Song> LongerThan(int seconds)
    {
        return _songs.Where(song => song.Seconds > seconds).ToList();
    }
```

Three things worth a second before you run it:

- **`Where` keeps the ones the question is true for** and drops the rest. [The lambda answers yes or no.](../lecture-notes.md#where--keeping-some-of-them)
- **`song` is a name you picked**, and the compiler works out its type from the list — [same three parts as every other line tonight](../lecture-notes.md#one-shape-and-it-does-not-change).
- **It does not reorder anything.** What is left comes back in the order it was found — worth knowing before Task 4.
- **`.ToList()` on the end is what turns it into an answer.** Without it you hand back [a recipe that re-runs every time anybody looks at it](../lecture-notes.md#a-query-is-a-recipe-not-an-answer) — [and every query in this course ends with one](../lecture-notes.md#tolist-and-why-every-query-here-ends-with-it).

**Run the desk, DJ name, then `n`:**

```bash
dotnet run --project week-09/Lab
```

```
  over four minutes    Slack Water, Long Way Round
```

**Two of the three, and Nightjar is 3:47.** Press `q`.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**2 / 5 — checks 1 and 2.**

**Green? Commit it:**

```
week 9 lab: a cart long enough for the news
```

---

### Task 3 in full

**Check:** `Check3_TheDeskKnowsWhatHasNotBeenOut`

It is 4 AM and the DJ wants something the station has not already worn out tonight. **Nothing on the desk can answer that.**

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 3` comment.** Yours this time, and it is Task 2's line with a different question in it. The spec:

- **One [`Where`](../lecture-notes.md#where--keeping-some-of-them), one `ToList()`**, exactly the shape you just wrote.
- **One [`Where`](../lecture-notes.md#where--keeping-some-of-them)**, and the question is about `PlaysTonight` — *never* is `0`.
- ⚠️ **Read your comparison twice.** `> 0` is also a perfectly good list of carts — it is just the opposite answer, and both look right on screen.

**Run the desk, DJ name, then `n` — and do NOT air the hour first:**

```bash
dotnet run --project week-09/Lab
```

```
  never been out       Nightjar, Slack Water, Long Way Round
```

**All three, because nothing has been on the air yet.** Now press `a` to air the hour, then `n` again:

```
  never been out       -
```

**The answer changed as the night went on, which is the entire reason the question is worth asking.** Press `q`.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**3 / 5 — checks 1, 2 and 3.**

**Green? Commit it:**

```
week 9 lab: what hasn't been out tonight
```

---

### Task 4 in full

**Check:** `Check4_TheDeskKnowsWhatItPlayedMost`

**First, the blank.** Run the desk, DJ name, then `n`:

```bash
dotnet run --project week-09/Lab
```

```
  worked hardest       -
```

Press `q`.

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 4` comment.** Two new words at once, so here it is:

```csharp
    public List<Song> TopPlayed(int n)
    {
        return _songs.OrderByDescending(song => song.PlaysTonight).Take(n).ToList();
    }
```

**Read it left to right: [put them in order](../lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone), [stop after n](../lecture-notes.md#take--stop-after-n), hand back a list.**

> [!CAUTION]
> **`OrderByDescending` sorts a COPY and hands the copy back. `List.Sort` does not — it rearranges the list itself.** If you reach for `Sort` here, the rotation comes out in a different order than it went in, [your `Save` writes the file in that new order](../lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone), and nothing tells you. **Check 4 tests for exactly this**, and it is the only check tonight that is about something you cannot see on screen.

**Now put some hours on the clock so there is something to rank.** Run the desk, then: **`r`, caller `Dorothy`, song `1`** — that puts Nightjar in the hour a second time — then **`a`** to air it, then **`n`**:

```bash
dotnet run --project week-09/Lab
```

```
  worked hardest       Nightjar (2), Slack Water (1)
```

**Nightjar twice, because it was in the hour twice.** Press `q`.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.**

**Green? Commit it:**

```
week 9 lab: what the desk worked hardest
```

---

### Task 5 in full

**Check:** `Check5_TheHourReadsWithoutAiring`

One left, and it is the one that is about the *difference* between two methods rather than about a new word.

**First, look at the blank.** Run the desk, DJ name, then `n`:

```bash
dotnet run --project week-09/Lab
```

```
  coming up, not yet aired:
```

**Nothing under it.** Press `q`.

**Now open `Lab/Hour.cs` and read `Run()` before you write anything.** It walks the items, calls `Play()` on each one, and builds a line for each. The DJ wants those same lines at three minutes to the hour — **to read off the screen, before any of it happens.**

**Write it — in `Lab/Hour.cs`, under the `TODO — Task 5` comment.** Yours. The spec:

- **One [`Select`](../lecture-notes.md#select--turning-each-one-into-something-else), one `ToList()`.** [`Where` keeps some of the things; `Select` keeps all of them and turns each one into something else](../lecture-notes.md#select--turning-each-one-into-something-else) — here, into a string.
- **The line is the same one `Run()` builds:** the item's `Kind`, then a space, a hyphen, a space, then its `Cue`. [A lambda can build a string, not just read a property.](../lecture-notes.md#select--turning-each-one-into-something-else)
- ⚠️ ⚠️ **Nothing may go on the air.** `Run()` has one line in it that this method must not have. Read it again and work out which.

> [!TIP]
> **This is the one place tonight where a query would be actively wrong if you copied `Run()` too closely.** A lambda that *changes* something on the way past turns a question into an action, and nobody reading the call site can tell. [The notes say it in one paragraph](../lecture-notes.md#select--turning-each-one-into-something-else).

**Run the desk, DJ name, then `n`:**

```bash
dotnet run --project week-09/Lab
```

```
  coming up, not yet aired:
    IDENT - KDXR 88.1, The Owl
    SONG - Nightjar - The Lamplighters
    AD - Pham's Bakery - "open at five" (3 left)
    SONG - Slack Water - Marguerite Vance
    WEATHER - clear, four below, wind out of the northwest
    SONG - Long Way Round - The Ferrymen
```

⚠️ **Look at the ad: `(3 left)`, not `(2 left)`. And the weather bed does not say `(read)`.** Nothing aired. Press `n` again — same numbers. **Now press `a`**, and *then* `n`, and watch both of those change. Press `q`.

**Then mine:**

```bash
dotnet test week-09/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift:**

```
week 9 lab: the hour, read without airing it
```

**Five commits, five green checks, four of your own facts, and about forty lines of code that are no longer there.**

---

## Now try to break it

```bash
dotnet run --project week-09/Lab
```

- **Take the `?? "nobody yet"` off `TheRegular`** and run my checks. Read the message. Put it back.
- **Change `TheRegular`'s `MaxBy` to `MinBy`** and press `n`. The desk now reports the person who called *least* as its regular, and nothing objects. **Which of your four facts caught it?**
- **Swap `OrderByDescending` for `List.Sort` in `TopPlayed`**, then press `n`, then `t`. The numbers look right. Now look at the order of the carts. [Then read check 4's message.](../lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone)
- **Put `item.Play()` inside `RunningOrder`'s lambda** and press `n` twice in a row. Watch the ad's `(N left)` count down without anything going on the air.
- **Ask `LongerThan(227)`** — Nightjar is exactly 227 seconds. Does it come back? Should it? *(Change `240` to `227` in `Program.cs` for a moment if you want to see it on screen.)*

## ⭐ Done early?

1. **Sum with a filter.** `TotalSeconds` adds up everything. Add a `SongSeconds` to `Hour` that adds up only the songs — [`OfType<Song>()` first](../lecture-notes.md#oftype--the-ones-that-turned-out-to-be-a-certain-kind), then `Sum`. Two words, one line.
2. **The quietest cart.** You have `TopPlayed`. Write `LeastPlayed(int n)` beside it and change exactly one word.
3. **Ask the switchboard a question it has never been asked.** Who has asked for something, and who just rang and said nothing? `Caller.Favorite` is `null` until they ask. One `Where`, and the question is about `null`. Then ask the *yes-or-no* version — *has anybody asked for anything at all tonight?* — which is [one word and not `Where`](../lecture-notes.md#any--a-yes-or-a-no).
4. **The air log, queried.** `Broadcast.LastShift` reads the last line. Write a `ShiftCount(string path)` that says how many shifts are on the log — and then a `ShiftsBy(string path, string dj)` that counts one DJ's. Both are one line over `File.ReadAllLines`.
5. ⭐ **The one that pays off later:** every query you wrote tonight walks a list **that is already in your program's memory**. Add fifty thousand carts to the rotation in a loop, then run `TopPlayed(3)` and time it with a `Stopwatch`. It will be fast. **Now ask yourself what it would cost if those carts were on disk** — [that is exactly what the demo measured](../lecture-notes.md#querying-a-file-and-what-it-costs), and [the bill is the reason week 10 exists](../lecture-notes.md#and-then-the-bill).

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-09/Lab.Checks`. |
| `NullReferenceException` in `TheRegular` | `MaxBy` handed back `null` for an empty board and something asked it for a `.Name`. [`?.` in front, `??` behind](../lecture-notes.md#on-an-empty-sequence) — and it is what `string best = "nobody yet";` used to do. |
| Check 1 red, and it was green when you started | **A rewrite changed an answer.** Read the message — every assert in check 1 names the week its rule came from *and* the LINQ cause. This is check 1 doing its job, not you losing last week's work. |
| `InvalidOperationException: Sequence contains no elements` | `First()`, `Last()`, `Single()` or `Average()` on an empty list. [The `...OrDefault` versions hand back `null` instead](../lecture-notes.md#on-an-empty-sequence) — which is what your loop did when it found nothing. |
| `CS1061: does not contain a definition for 'Where'` | `using System.Linq;` is missing. It ships in every project in this course, so check nothing was deleted at the top of the file. [Every word tonight is an extension on `List<T>`.](../lecture-notes.md#the-words-you-need-tonight) |
| `CS0029: cannot convert 'IEnumerable<Song>' to 'List<Song>'` | The `.ToList()` on the end is missing. [That is what turns a recipe into an answer.](../lecture-notes.md#a-query-is-a-recipe-not-an-answer) |
| `CS1503: cannot convert from 'method group'` | You wrote `Sum(song.Seconds)` instead of `Sum(song => song.Seconds)`. [The `=>` is not optional, and it is the only new syntax tonight.](../lecture-notes.md#reading-a-lambda-out-loud) |
| `Sum` gives 0 and there is definitely data | [The lambda is adding up the wrong thing.](../lecture-notes.md#sum-count-and-average--one-number-out-of-many) Print the list's own `Count` first. |
| The carts come back in a different order after `n` | `List.Sort` in `TopPlayed`. [It rearranges the list itself; `OrderByDescending` sorts a copy.](../lecture-notes.md#orderby--and-it-leaves-the-thing-you-asked-alone) |
| `never been out` is `-` and you have not aired anything | You aired the hour earlier in the same run. Press `q` and start a fresh shift. |
| The ad's `(N left)` goes down when you press `n` | `Play()` is inside `RunningOrder`'s lambda. [A query asks; it does not do.](../lecture-notes.md#what-should-stay-a-loop) |
| Check 4 red: *Sorting the rotation SORTED THE ROTATION* | Exactly the trap, working as designed. `OrderByDescending`, not `Sort`. |
| Check 5 red: *PUT THE HOUR ON THE AIR* | Same cause as the `(N left)` row above — [`Select` asks; `Run()` does](../lecture-notes.md#select--turning-each-one-into-something-else). |
| The rotation has **six** carts | `Load` lost its `Clear()` when the `foreach` became one call. [Loading is replacing.](../lecture-notes.md#thirty-lines-become-one) |
| A count you read twice gave two different answers | A query with no `.ToList()`, [being read twice — it re-runs every time](../lecture-notes.md#a-query-is-a-recipe-not-an-answer). |
| `LongestItem()` on an empty hour threw | [`MaxBy` hands back `null` for an empty list](../lecture-notes.md#maxby--the-item-with-the-biggest-something), and something asked the answer for a property. |
| You want *"is there at least one…"* | [`Any`, in one word](../lecture-notes.md#any--a-yes-or-a-no) — not a `Where` and a `Count`. |
| You want *"the top three"* | [`OrderByDescending`, then `Take`.](../lecture-notes.md#take--stop-after-n) |
| My check is green but yours is red | Read your assert against the check's. One of you is asserting the old behavior, and [tests are code that can be wrong](../../week-07/lecture-notes.md#make-it-fail-once). |
| `dotnet test` passes and the shift looks wrong | Run the program, not just the suites. Neither one looks at `Program.cs`. |
| Red squiggles under `Assert` or `[Fact]`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| <kbd>F5</kbd>'s project list has no `week-09` in it | Same cause. **`Developer: Reload Window`**, then type `09` in the picker to narrow it. |
| A search finds nothing and you can see the record | Compare exactly what you typed with exactly what is stored. String comparison is exact — **and if you're wondering whether it should be, hold that thought; it's a database-week conversation.** |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 9 lab: seven loops, gone"
> ```

**Prev:** [Week 8 Lab — The Log Book](../../week-08/lab/) · **Next:** [Week 9 Homework — Three Questions](../homework.md)
