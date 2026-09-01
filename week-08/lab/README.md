# Week 8 Lab — The Log Book 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the desk has a hole in it that nobody has noticed because nobody has looked: **the station forgets the entire night the moment the shift ends.** Which carts went out, how many times, who was even on — all of it goes when the program goes.

That has been true since week 4, and [it has been promised an answer since week 3](../lecture-notes.md#the-log-stops-being-gone). Tonight it stops.

Your job is two files and one surprise: the carts get written down and read back, the station keeps an air log that every shift adds a line to — and one number is going to refuse to come home even though you can see it sitting in the file.

**Time:** ~50 minutes in class — **target tonight: all five checks green, and a desk that remembers.**

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the four empty methods you're about to fill in, and nothing tonight depends on remembering last week's code — only on reading this week's.

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
cp -r ../dotnet-db-starters/week-08 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-08` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-08`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — three projects again, same as last week:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-08/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — three of its files have work in them
   ├─ Lab.Tests/           ← YOURS, carried forward. One fact goes in it tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-08` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight you make KDXR remember its night, and the homework has you do it to your own registry.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-08/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the desk already does, and it stays green all night. **The four red ones are tonight's four tasks** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 8: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-08/Lab.Checks`, `dotnet test week-08/Lab.Tests` and `dotnet run --project week-08/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

**Two suites and a desk, same as last week:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-08/Lab` | the desk | what any of it looks like on the air |
| `dotnet test week-08/Lab.Checks` | mine | *is the station fixed?* — climbs 1 → 5 as you build it |
| `dotnet test week-08/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 2 facts now, 3 by the end |

| File | What it is |
|---|---|
| `Lab/Rotation.cs` | Two empty methods at the bottom. **Tasks 2 and 3.** |
| `Lab/Song.cs` | One line to add — and you will not guess which. **Task 4.** |
| `Lab/Broadcast.cs` | Two empty methods at the bottom. **Task 5.** |
| `Lab.Tests/DeskTests.cs` | **Yours.** Two facts ship written; one more goes in at Task 4. |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always — but read it.** Every check hands `Save` a path of its own, and [there is a reason it has to](../lecture-notes.md#where-the-file-actually-goes). |
| `Lab/Program.cs` | Shipped, finished, and **it already calls everything you are about to write** — which is why running it is how you see each task land. |

💡 **Two files get made tonight, and they are not the same kind of thing.** `week-08/rotation.json` is the carts as they stand — rewritten at every sign-off. `week-08/air-log.txt` is one line per shift, [added to and never rewritten](../lecture-notes.md#appending-a-log-that-keeps-every-line). Both appear in your Explorer, in the week folder, because [that is where a relative path lands when you run from the top of your repo](../lecture-notes.md#where-the-file-actually-goes).

## The tasks

**The rhythm is the same all four times, and the order is the lesson:** run the desk and *see the problem* → write the code → run the desk again and *see it gone* → run my checks (the count climbs). **Commit every time a check goes green** — each task hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Work a shift, lose it, and look at what got lost. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheRotationIsWrittenDown` | The carts go into a file. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheRotationComesBack` | …and come back out of it. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `ACartRemembersItsPlays` | The number that is in the file and still comes back wrong. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheAirLogRemembersTheLastShift` | The desk finds out who was on before you. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

Nothing to write. Find out exactly what the station loses at 6 AM.

**Work a shift.** Type a DJ name, press `a` to put the hour on air, then `t` to look at the carts:

```bash
dotnet run --project week-08/Lab
```

```
── the carts ───────────────────────────────────────────────
╭────────────────┬──────────────────┬────────┬────────╮
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │
├────────────────┼──────────────────┼────────┼────────┤
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │
╰────────────────┴──────────────────┴────────┴────────╯
3 carts loaded.
```

**Every cart has been out once.** Press `q` to end the shift — and now start it again, and press `t` before you do anything else:

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
```

**Zero. The station has no memory of the night at all.** And look at the line above the DJ prompt while you're here:

```
Nothing on the desk. First shift on this log.
```

It says that every single time, forever, because there is no log. Press `q`.

**Two files fix those two things, and they work differently.** [The whole of `File` is six methods](../lecture-notes.md#a-file-is-a-place-to-put-text) — read that section now; it's short, and Task 2 starts immediately after it.

Then open **`week-08/Lab.Tests/DeskTests.cs`** and read the second fact. It is a fact about a *file*, and its first line is the only new thing in it: [a scratch path of its own](../lecture-notes.md#so-hand-the-path-in). Run the suite so you know where you're starting:

```bash
dotnet test week-08/Lab.Tests
```

**2 passed.**

---

### Task 2 in full

**Check:** `Check2_TheRotationIsWrittenDown`

**First, work a whole shift and end it properly.** DJ name, `a` to air the hour, `q` to sign off — a complete night, start to finish:

```bash
dotnet run --project week-08/Lab
```

**Now look for what it left behind.** Open the `week-08` folder in the Explorer:

```
week-08/
├─ Lab/
├─ Lab.Checks/
└─ Lab.Tests/
```

**Three folders and nothing else.** A whole shift ended and the station wrote nothing down — there is no file for the carts to have been saved in.

`Program.cs` already asks for one. <kbd>⌘F</kbd> for `rotation.Save` in `week-08/Lab/Program.cs` and you'll find it sitting in the sign-off block, called at the end of every shift. It is calling a method with nothing in it.

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 2` comment.** [Your rotation is one list of one type, which is exactly the case a serializer is for](../lecture-notes.md#one-list-one-type-the-serializer) — so this one is worked all the way through [in the notes](../lecture-notes.md#jsonserializer-both-directions):

```csharp
    public void Save(string path)
    {
        string json = JsonSerializer.Serialize(_songs,
            new JsonSerializerOptions { WriteIndented = true });

        File.WriteAllText(path, json);
    }
```

Three things worth knowing about those two lines:

- **`Serialize` takes the list itself** — `_songs`, the actual songs. Not a count of them, and [not lines you built out of them](../lecture-notes.md#readable-and-useless), which is the version the demo tried first and threw away.
- **`WriteIndented = true` is for you**, not for the program. It puts the JSON on separate lines so a person can read it.
- **The path is the one `Save` was handed.** [Never a name written inside the method](../lecture-notes.md#so-hand-the-path-in) — that is the difference between a class that works and one that works until it is tested.

**Run the shift, air the hour, and sign off:** DJ name, then `a`, then `q`.

```bash
dotnet run --project week-08/Lab
```

**Now look in the Explorer again** — `week-08/rotation.json` is there. **Open it:**

```json
[
  {
    "Title": "Nightjar",
    "Artist": "The Lamplighters",
    "Seconds": 227,
    "Length": "3:47",
    "PlaysTonight": 1,
    "Kind": "SONG",
    "Cue": "Nightjar - The Lamplighters"
  },
```

**That is your rotation, on disk, and it outlived the program.** Every property that could be read went into it — including three that are worked out from the others, which is a thing worth noticing and the ⭐ *Done early?* list has the fix.

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**2 / 5.**

**Green? Commit it:**

```
week 8 lab: the rotation is written down
```

---

### Task 3 in full

**Check:** `Check3_TheRotationComesBack`

**First, watch the file get ignored.** You have a `week-08/rotation.json` with play counts in it. Start the shift and press `t` before anything else:

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**The file says `"PlaysTonight": 1` and the desk says `0`.** Nothing reads it. Press `q`.

`Program.cs` already asks for this one too — <kbd>⌘F</kbd> for `rotation.Load`, near the top, right after the three carts are added.

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 3` comment.** This is the same trip backwards, and it is yours. The spec:

- **Ask `File.Exists(path)` first, and `return` if it's false.** A desk that has never signed off has no file, and [that is a first night rather than a failure](../lecture-notes.md#a-missing-file-is-not-an-error).
- **`File.ReadAllText(path)` gives you the text back**; `JsonSerializer.Deserialize<List<Song>>(...)` turns it into songs. The type in the angle brackets is how it knows what to build, and what comes back is `List<Song>?` — nullable, so check it before you use it.
- ⚠️ **Empty the list before you fill it.** `_songs` already holds the three carts `Program.cs` added. Load on top of them and you get six.

> [!TIP]
> **Stuck on the shape?** The check's failure message has the two lines in it — run `dotnet test week-08/Lab.Checks` and read check 3.

**Run the shift and press `t`.**

```bash
dotnet run --project week-08/Lab
```

**Nothing looks different — and that is not a failure.** The file holds the same three carts the program already had, so loading them changes nothing you can see. (The play counts are a different story and they are Task 4's.)

**So prove it is really reading the file.** Open `week-08/rotation.json`, change the first `"Title"` to something else, and save:

```json
    "Title": "Owl Hours",
```

**Now run it again and press `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Owl Hours      │ The Lamplighters │ 3:47   │ 0      │
```

**There is your proof.** That title exists nowhere in your code. Press `q` — and put the real title back, or don't; the rotation is yours now.

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**3 / 5.**

**Green? Commit it:**

```
week 8 lab: the rotation comes back
```

---

### Task 4 in full

**Check:** `Check4_ACartRemembersItsPlays`

The one that surprises everybody. **Write the test first on this one** — the same discipline as last week, and here it earns its keep, because the bug looks like a bug in your `Load`.

**First, start the night from nothing** — throw away the file so the counts begin at zero:

```bash
rm week-08/rotation.json
```

**Then run the shift**, press `a` to air the hour, press `t`, then `q`:

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
```

**Now open `week-08/rotation.json`.** The count is *in there*:

```json
    "PlaysTonight": 1,
```

**And now run the shift again and press `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Zero — with the right answer sitting in the file.** Everything else came back. The title came back. The length came back. Press `q`.

**Write the fact — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 4` comment.** Yours, and [the three moves are the ones you know](../lecture-notes.md#testing-something-that-touches-a-file):

- **Set the scene.** A `Song`, played twice, in a `Rotation`. `Play()` is on the interface, so `((IScheduleItem)song).Play();` — or add it through the hour, whichever you prefer.
- **Do the thing.** `Save` to a scratch path, then `Load` into a **new** `Rotation`. [The scratch path is one line](../lecture-notes.md#so-hand-the-path-in), and the second `Rotation` is the whole point: loading into the one that just saved proves nothing.
- **Check the answer.** `Assert.Equal` — what should `PlaysTonight` say?
- Name it after the rule it proves. Mine is `ACartRemembersItsPlays`; yours doesn't have to be.

**Run yours, and expect red:**

```bash
dotnet test week-08/Lab.Tests
```

```
  Assert.Equal() Failure: Values differ
Expected: 2
Actual:   0
```

**Red, for the right reason.** Now the fix, and it is one line — but the reason is the whole task:

**A serializer writes every property it can READ, and reads back only the ones it can WRITE.** `PlaysTonight` is `{ get; private set; }` — sealed in week 4 so nothing outside the class could claim a play that never happened. That is still right. It also means the serializer has no way to put the value back.

So you tell it that this one is allowed. In `Lab/Song.cs`, under the `TODO — Task 4` comment:

```csharp
    [JsonInclude]
    public int PlaysTonight { get; private set; }
```

and at the top of the file:

```csharp
using System.Text.Json.Serialization;
```

⚠️ **Do not fix it by making the setter public.** That would undo weeks 4 and 5 — [the attribute changes what the serializer may do, and nothing else](../lecture-notes.md#what-the-serializer-will-not-read-back).

**Now start from nothing once more and do exactly the same thing** — throw the file away, run, `a`, `q`:

```bash
rm week-08/rotation.json
```

```bash
dotnet run --project week-08/Lab
```

**Then run it again and press `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
```

**The night survived.** Air it again and it goes to 2, and to 3, and the station finally knows what it has been playing.

**Yours, green:**

```bash
dotnet test week-08/Lab.Tests
```

**3 passed.**

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**4 / 5.**

**Green? Commit it:**

```
week 8 lab: a cart remembers its plays
```

---

### Task 5 in full

**Check:** `Check5_TheAirLogRemembersTheLastShift`

One thing left, and it is the other kind of file.

**First, read the line that never changes.** Start the shift and look at the line above the DJ prompt:

```bash
dotnet run --project week-08/Lab
```

```
Nothing on the desk. First shift on this log.
```

**You have signed off five or six times tonight and it still says that.** Press `q`.

The rotation is *the carts as they stand* — rewritten every sign-off. The air log is different: it is **one line per shift, and it keeps every line before it.** [Two `File` methods you have not used yet do that](../lecture-notes.md#appending-a-log-that-keeps-every-line), and `Program.cs` already calls both.

**Write them — in `Lab/Broadcast.cs`, under the two `TODO — Task 5` comments.** Yours. The spec:

- **`LogShift(string path, string line)`** adds `line` to the end of the file. There is a `File` method that appends instead of overwriting, and it makes the file if it isn't there yet — which is why an air log needs no setting-up step. Put a `"\n"` on the end so the next shift starts a new line. ⚠️ **`"\n"`, not `Environment.NewLine`** — [the reason is a paragraph in the notes](../lecture-notes.md#appending-a-log-that-keeps-every-line).
- **`LastShift(string path)`** hands back the last line in the file, or `""` when there is no file — an empty string is the honest answer to *"who was on before me?"* when the answer is nobody. `File.ReadAllLines` gives you a `string[]`; **the last index is one less than the length.**

⚠️ **Check the file exists before you read it**, and check the array isn't empty before you index it. Both of those happen on a real desk on a real first night.

**Run the shift twice** — a DJ name and `q` each time, and use a different name the second time:

```bash
dotnet run --project week-08/Lab
```

```
Last on this desk: Bell signed off - 6 in the hour, 3 on the switchboard.
```

**The desk knows who had it before you** — and that name is whatever you typed on the previous run. Open `week-08/air-log.txt` and there is one line per shift, oldest first, none of them overwritten.

**Yours, green:**

```bash
dotnet test week-08/Lab.Tests
```

**3 passed.**

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift:**

```
week 8 lab: the air log remembers the last shift
```

**Five commits, five green checks, and a station that remembers its own night.**

---

## Now try to break it

The desk remembers. Prove it — and then prove how thin the memory is:

```bash
dotnet run --project week-08/Lab
```

- Air the hour four times over three separate shifts. Does `PLAYED` add up across all of them?
- **Delete `week-08/rotation.json` while the desk is closed**, then run it. What happens, and is that the right thing to happen?
- **Open `week-08/rotation.json` and change a `"Seconds"` to `0`.** Run it and press `t`. Did the length change? [Look at `Song.Seconds` and work out why not](../lecture-notes.md#what-the-serializer-will-not-read-back) — a setter that refuses nonsense refuses it whoever is asking, including a file.
- **Open `week-08/air-log.txt` and add a line by hand.** Run the desk. It believes you. That is the honest half of tonight, and it is what week 10 is for.
- **Falsify your Task 4 fact** — [make it lie](../../week-07/lecture-notes.md#make-it-fail-once), run your suite, read the failure, put it back.

## ⭐ Done early?

1. **Stop writing what you already know.** `rotation.json` holds `Length`, `Kind` and `Cue`, and all three are worked out from the other fields — so the file is storing the same fact twice. Put `[JsonIgnore]` on them ([the mirror of the attribute you just used](../lecture-notes.md#the-mirror-what-it-writes-that-you-did-not-want)), run a shift, and look at how much smaller the file gets. Check 1 has to stay green.
2. **A fact for the air log.** Append two lines to a scratch path, and assert that `LastShift` gives you the second one and that `File.ReadAllLines` finds exactly two. Born green — so [falsify it once](../../week-07/lecture-notes.md#make-it-fail-once) before you believe it.
3. **Make the sign-off line worth reading.** It says how many were in the hour and on the switchboard. Add what the busiest cart was, or the request that came in latest. It is one string; the air log will take whatever you give it.
4. **Put a time on it.** The air log records *what* happened and not *when*. Give `LogShift` a stamp — [the station clock the duty console uses is two lines](../lecture-notes.md#the-stations-own-clock) — and write `HH:mm` in front of each entry. Then notice something: the air log needs no sorting, ever, because it is only ever appended to. [Haldane's log is not so lucky](../lecture-notes.md#keeping-the-book-in-order), and the reason is worth ten seconds.
5. **The demo did it the long way, on purpose.** Haldane's log holds three different kinds of things, so a serializer cannot rebuild it — it was [written by hand, one line per entry](../lecture-notes.md#saving-by-hand-one-line-per-record-fields-kept-apart) and [read back by looking at the kind word first](../lecture-notes.md#loading-by-hand-the-kind-word-first). Read those two sections and work out what `Rotation.Save` would have to look like if the rotation held ads and weather beds as well as songs.
6. ⭐ **The one that pays off later:** your `Load` walks a list to fill another list, and `LastShift` walks an array to reach the last item. In **week 9** both of those become one line each — and your suite is how you'll *prove* the one-liners do the same job.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-08/Lab.Checks`. |
| `CS0103: The name 'JsonSerializer' does not exist` | Missing `using System.Text.Json;` at the top of `Rotation.cs`. It ships in the starter — check it's still there. [Both directions need it.](../lecture-notes.md#jsonserializer-both-directions) |
| `CS0246: 'JsonInclude' could not be found` | Different using, and it catches everybody: `using System.Text.Json.Serialization;` — the `.Serialization` on the end is the whole difference. [What the attribute is for.](../lecture-notes.md#what-the-serializer-will-not-read-back) |
| No file appears after a sign-off | `Save` still has an empty body, or you ended the shift some way other than `q`. The save happens at sign-off, not as you go — and [`WriteAllText` makes the file if it isn't there](../lecture-notes.md#a-file-is-a-place-to-put-text). |
| The rotation has **six** carts | `Load` isn't clearing the list before it fills it. [Loading is replacing](../lecture-notes.md#jsonserializer-both-directions), and `Program.cs` has already added three carts before `Load` runs. |
| `PLAYED` is still 0 after Task 4 | Two possibilities. Either [the attribute isn't on `PlaysTonight`](../lecture-notes.md#what-the-serializer-will-not-read-back), or the file on disk was written *before* you added it and holds zeros — air the hour, sign off, and run again. |
| Everything comes back with blank titles | Your `Song` was changed so the serializer can't find a way in. `Song` ships with one public constructor whose parameters match the property names; [that is the road it uses](../lecture-notes.md#-troubleshooting). |
| `JsonException: The JSON value could not be converted` | The file was hand-edited into something that no longer matches — a `"Seconds"` in quotes, a missing comma. Delete `week-08/rotation.json` and let the desk write a new one. [More of these in the notes.](../lecture-notes.md#-troubleshooting) |
| `IndexOutOfRangeException` in `LastShift` | The file exists and is empty. Check `lines.Length` before you index — [the last index is one less than the length](../lecture-notes.md#appending-a-log-that-keeps-every-line). |
| `Nothing on the desk` after Task 5 | You've only signed off once *since writing it* — the log records sign-offs from now on, not the ones that already happened. Run it once more. [An empty answer is the honest one on a first night.](../lecture-notes.md#a-missing-file-is-not-an-error) |
| My check is green but yours is red | Read your assert against the check's. One of you is asserting the old behavior, and [tests are code that can be wrong](../../week-07/lecture-notes.md#make-it-fail-once). |
| My check is red but yours is green | Your fact isn't asking the hard question — usually loading into the *same* rotation instead of a new one. Read the check; it names what it asked. |
| `dotnet test` passes and the shift looks wrong | Run the program, not just the suites. Neither one looks at `Program.cs`, and half of tonight is only visible on the air. |
| Red squiggles under `Assert` or `[Fact]`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| <kbd>F5</kbd>'s project list has no `week-08` in it | Same cause. **`Developer: Reload Window`**, then type `08` in the picker to narrow it. |
| The file is there and the program says it isn't | The working directory. `dotnet run` stands at the top of your repo and <kbd>F5</kbd> stands in the project folder, so they write to two different places. [The whole story is in the notes](../lecture-notes.md#where-the-file-actually-goes). |
| Not sure what a serializer even is | [Two lines, both directions](../lecture-notes.md#jsonserializer-both-directions) — and [the honest version by hand](../lecture-notes.md#turning-objects-into-text-and-back) is what the demo did first. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 8 lab: the rotation is written down"
> ```

**Prev:** [Week 7 Lab — The Update](../../week-07/lab/) · **Next:** [Week 8 Homework — It Survives the Night](../homework.md)
