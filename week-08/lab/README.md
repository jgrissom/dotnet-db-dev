# Week 8 Lab — The Log Book 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the desk has a hole in it that nobody has noticed because nobody has looked: **the station forgets the entire night the moment the shift ends.** Which carts went out, and how many times — all of it goes when the program goes.

Tonight it stops.

Your job: write the carts to a file when the shift ends, read them back when the next one starts — and then chase down the one number that refuses to come home even though you can see it sitting in the file.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all four checks green, and a desk that remembers.**

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the two empty methods in `Rotation.cs`, one line of `Song.cs`, and three lines of `Program.cs`. Nothing tonight depends on remembering last week's code — only on reading this week's.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch the **switchboard** get written, then copy those finished files into your project before each task. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, and the copy commands work the same.

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
   ├─ Lab/                 ← the desk — Rotation.cs, Song.cs and Program.cs have work in them
   ├─ Lab.Tests/           ← YOURS — two facts ship written; you add one tonight
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

**1 / 4 passing.** Check 1 is everything the desk already does, and it stays green all night. **The three red ones are tonight's work** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 8: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-08/Lab.Checks`, `dotnet test week-08/Lab.Tests` and `dotnet run --project week-08/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

**Two suites and a desk, same as last week:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-08/Lab` | the desk | what any of it looks like on the air |
| `dotnet test week-08/Lab.Checks` | mine | *does the station remember?* — climbs 1 → 4 as you build it |
| `dotnet test week-08/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 2 facts now; your instructor's makes 3, and yours makes 4 |

| File | What it is |
|---|---|
| `Lab/Rotation.cs` | Two empty methods at the bottom, `Save` and `Load`. **Tasks 2 and 3.** |
| `Lab/Program.cs` | Three lines are yours: two in Task 2, one in Task 3. Each spot has a comment naming its task. |
| `Lab/Song.cs` | One line to add — and you will not guess which. **Task 4.** |
| `Lab/Switchboard.cs`, `Lab/Caller.cs` | **Your instructor's.** You copy the finished files in at the start of Tasks 2, 3 and 4, and read them as you work. |
| `Lab.Tests/SwitchboardTests.cs` | **Your instructor's fact**, copied in at Task 4. |
| `Lab.Tests/DeskTests.cs` | **Yours.** Two facts ship written; one more goes in at Task 4. |
| `Lab.Checks/DeskChecks.cs` | My four. **Read-only, as always.** |

💡 **Tonight makes two files: `week-08/switchboard.json`, from your instructor's code, and `week-08/rotation.json`, from yours.** Each holds its list as it stands, and each is rewritten every time the shift ends. It appears in your Explorer, inside the week folder, because a relative path is worked out from where you were standing when you ran the program — and you always run from the top of your repo.

## The tasks

**The rhythm is the same every time:** run the desk and *see the problem* → write the code → run the desk again and *see it gone* → run my checks and watch the count climb. **Commit every time a check goes green** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting the lines in the right order is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole method is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Work a shift, lose it, and see what got lost. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheRotationIsWrittenDown` | The carts go into a file. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheRotationComesBack` | …and come back out of it. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `ACartRemembersItsPlays` | The number that is in the file and still comes back wrong. **[Task 4 in full ↓](#task-4-in-full)** |

---

### Task 1 in full

Nothing to write. Find out exactly what the station loses at 6 AM.

**Work a shift.** Start the desk and type a DJ name:

```bash
dotnet run --project week-08/Lab
```

**First, press `t` to look at the carts before anything has aired:**

```
╭────────────────┬──────────────────┬────────┬────────╮
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │
├────────────────┼──────────────────┼────────┼────────┤
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
╰────────────────┴──────────────────┴────────┴────────╯
3 carts loaded.
```

**`PLAYED` is 0 for every cart.** Nothing has gone out yet.

**Without quitting, press `a` to put the hour on air,** then **`t` again:**

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │
```

**Every cart has been on air once.** Now press `q` to end the shift.

**Start the desk again, type a DJ name, and press `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
```

**Zero. The station has no memory of the night at all.** The play counts lived in the program's memory, and that memory went away when the program ended.

**Now run your own suite** so you know where you're starting:

```bash
dotnet test week-08/Lab.Tests
```

**2 passed.** Open `week-08/Lab.Tests/DeskTests.cs` and read the second fact, `AFirstNightKeepsItsCarts`. It is a fact about a file, and its first two lines are the only new thing in it:

```csharp
string path = Path.Combine(Path.GetTempPath(), "kdxr-mine-nofile.json");
File.Delete(path);
```

- **`Path.GetTempPath()`** is the folder your computer keeps for scratch files. The test makes its own file there and never touches `week-08/rotation.json`.
- **`File.Delete(path)`** clears out anything an earlier run left behind. Deleting a file that isn't there does nothing and throws nothing.

You'll use the same two lines in Task 4.

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Working at home? Carry straight on.

📖 *Further reading:* [the six `File` methods](../lecture-notes.md#a-file-is-a-place-to-put-text).

---

### Task 2 in full

**Check:** `Check2_TheRotationIsWrittenDown`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-08/Switchboard.cs week-08/Lab/
```

Open `week-08/Lab/Switchboard.cs` and scroll to `Save` at the bottom. That's what you just watched get written. Yours goes in `Rotation.cs`, and it's the same two lines on a different list.

**Now work a whole shift and end it properly.** DJ name, `a` to air the hour, `q` to sign off:

```bash
dotnet run --project week-08/Lab
```

**Now look in the Explorer, in the `week-08` folder:**

```
week-08/
├─ Lab/
├─ Lab.Checks/
├─ Lab.Tests/
└─ switchboard.json
```

**One file: `switchboard.json`.** Your program just wrote it, when you pressed `q` — that's the `Save` you copied in, running on your machine. A whole shift ended and nothing wrote the carts down.

**Write `Save` — in `Lab/Rotation.cs`, under the `TODO — Task 2` comment.** It has to do two things: turn the list of songs into text, then put that text in the file at `path`.

The syntax for each:

- **`JsonSerializer.Serialize(list, options)`** hands back one `string` holding the whole list, written as JSON. The list is `_songs`, the rotation's own list. For the options, use `new JsonSerializerOptions { WriteIndented = true }`, which puts each property on its own line so a person can read the file.
- **`File.WriteAllText(path, text)`** writes a string to a file. It makes the file if it isn't there, and replaces everything in it if it is.

⚠️ **Use the `path` that `Save` was handed**, never a file name typed inside the method. The program and the tests run from different folders, so the path has to come from whoever is calling.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public void Save(string path)
    {
        string json = JsonSerializer.Serialize(_songs,
            new JsonSerializerOptions { WriteIndented = true });

        File.WriteAllText(path, json);
    }
```

</details>

**Now call it — two lines in `Lab/Program.cs`.**

1. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2 — where the carts get written down`. Under that comment, add:

   ```csharp
   string rotationFile = "week-08/rotation.json";
   ```

2. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2 — clocking out`. Under that comment, add:

   ```csharp
   rotation.Save(rotationFile);
   ```

That second line runs when you press `q`, which is when a DJ signs off.

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

**That is your rotation, on disk, and it outlived the program.** Every property the serializer could read went into it — including `"PlaysTonight": 1`.

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**2 / 4.**

**Green? Commit it:**

```
week 8 lab: the rotation is written down
```

> [!NOTE]
> **In class, stop here.** Task 3 comes after the next part of the demo. Finished early? Try item 2 of [⭐ Done early?](#-done-early), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [the serializer, both directions](../lecture-notes.md#jsonserializer-both-directions).

---

### Task 3 in full

**Check:** `Check3_TheRotationComesBack`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-08/Switchboard.cs week-08/Lab/
```

Your instructor's `Load` is now at the bottom of `Switchboard.cs`, under the `Save`.

**Now watch the file get ignored.** First, give the file a play count to ignore: start the desk, type a DJ name, press `a` to air the hour, then `q`:

```bash
dotnet run --project week-08/Lab
```

Now open `week-08/rotation.json` and find Nightjar's line:

```json
    "PlaysTonight": 1,
```

**Then start the shift again and go straight to the carts — DJ name, then `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**The file says 1 and the desk says 0.** Nothing reads the file. Press `q` — then look at the file again:

```json
    "PlaysTonight": 0,
```

**Quitting wrote the desk's zeros over the file.** A program that saves without ever loading throws away whatever the file held.

**Write `Load` — in `Lab/Rotation.cs`, under the `TODO — Task 3` comment.** It is Task 2 backwards: read the text out of the file, and turn it back into songs. Here is everything it needs:

- **`File.Exists(path)`** answers `true` or `false`. A desk that has never signed off has no file. That is a first night, not a failure, so when it's `false`, `return` and leave the three carts `Program.cs` already added.
- **`File.ReadAllText(path)`** hands back the whole file as one `string`.
- **`JsonSerializer.Deserialize<List<Song>>(text)`** turns that text back into a list of songs. The type in the angle brackets tells it what to build. It hands back a `List<Song>?` — the `?` means it can be `null`, so check for that and `return` if it is.
- **`_songs.Clear()`** empties the rotation. ⚠️ `Program.cs` adds three carts *before* it calls `Load`, so without this you get six.
- **A `foreach` over the loaded list**, calling `_songs.Add(song)` for each one. ⚠️ `Deserialize` builds a brand new list. It does not put anything in `_songs`. Moving the songs in is your code, and it is the step the whole task is for.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public void Load(string path)
    {
        if (!File.Exists(path))
        {
            return;
        }

        List<Song>? loaded = JsonSerializer.Deserialize<List<Song>>(File.ReadAllText(path));

        if (loaded == null)
        {
            return;
        }

        _songs.Clear();

        foreach (Song song in loaded)
        {
            _songs.Add(song);
        }
    }
```

</details>

**Now call it — one line in `Lab/Program.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3 — last night's carts`. Under that comment, add:

```csharp
rotation.Load(rotationFile);
```

**Run the shift and look at the carts: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Nothing looks different — and that is not a failure.** The file holds the same three carts the program already had, with the zeros your last run wrote over it. (The play count not coming back is a different problem. That's Task 4.)

**So prove it really reads the file.** Open `week-08/rotation.json`, change the first `"Title"` to something else, and save:

> [!CAUTION]
> **Sign off before you touch the file.** Pressing `q` writes the rotation back out, so an edit made while the shift is still running is overwritten the moment you quit. The run below would then show the OLD title, which looks exactly like a `Load` that isn't working.

```json
    "Title": "Owl Hours",
```

**Now run it again — DJ name, then `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Owl Hours      │ The Lamplighters │ 3:47   │ 0      │
```

**There is your proof.** That title exists nowhere in your code. Press `q`. Put the real title back, or don't — Task 4 starts from a fresh file anyway.

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**3 / 4.**

**Green? Commit it:**

```
week 8 lab: the rotation comes back
```

> [!NOTE]
> **In class, stop here.** Task 4 comes after the next part of the demo. Finished early? Try item 2 of [⭐ Done early?](#-done-early), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [a missing file is not an error](../lecture-notes.md#a-missing-file-is-not-an-error).

---

### Task 4 in full

**Check:** `Check4_ACartRemembersItsPlays`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

This time it's two files, your instructor's fixed `Caller.cs` and the fact that proves it:

```bash
cp ../dotnet-db-starters/demo/week-08/Caller.cs week-08/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-08/SwitchboardTests.cs week-08/Lab.Tests/
```

Run your suite once so you know where you're starting:

```bash
dotnet test week-08/Lab.Tests
```

**3 passed** — the two that shipped, and your instructor's. Open `Lab.Tests/SwitchboardTests.cs` and `Lab/Caller.cs`: the test you're about to write, and the fix you're about to make, are both sitting there for the switchboard.

**Now start the night from nothing** — throw away the file so the counts begin at zero:

```bash
rm week-08/rotation.json
```

**Then run the shift** — DJ name, then `a` to air the hour, then `t`, then `q`:

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
```

**Now open `week-08/rotation.json`.** The count is in there:

```json
    "PlaysTonight": 1,
```

**Run the shift again — DJ name, then `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Zero — with the right answer sitting in the file.** The title came back. The length came back. The play count didn't. Press `q`, then open `rotation.json` again: it says `"PlaysTonight": 0` now. Quitting saved the desk as it stands, so the 0 went back over the file. That's why the fix below starts by deleting it.

**Write the fact first — in `Lab.Tests/DeskTests.cs`, under the `TODO — Task 4` comment.** The same three moves as every fact: set the scene, do the thing, check the answer. Here's what each one needs:

- **A scratch path.** The same two lines as `AFirstNightKeepsItsCarts`, with a file name of your own:

  ```csharp
  string path = Path.Combine(Path.GetTempPath(), "kdxr-mine-rotation.json");
  File.Delete(path);
  ```

- **Set the scene.** A `Song` in a variable — `new Song("Nightjar", "The Lamplighters", 227)` — played twice with `.Play()`. Then a `Rotation`, with the song added to it.
- **Do the thing.** Call `Save(path)` on that rotation. Then make a **second**, empty `Rotation` called `reopened`, and call `Load(path)` on *it*. Use that name: the lines below and the debugger steps use it. ⚠️ Loading into the rotation that just saved would prove nothing, because it already holds the song. A second, empty one is the same as quitting and starting the desk again.
- **Check the answer.** First, `Assert.Equal(1, reopened.Count)`: one song went in, so one should come back. If `Load` brought nothing back, you get a clear `Expected: 1 / Actual: 0` instead of a crash on the next line. Then the play count: `Assert.Equal(expected, actual)`, expected first. The actual value is the loaded song's play count, `reopened.All()[0].PlaysTonight`. **What should the expected value be?** It's how many times you played the song before you saved it. Write that number itself, like `2`, rather than your song variable's `PlaysTonight`. Both go red now and green after the fix, but if `Play()` were ever broken, the variable would be 0 too and the test would pass anyway.
- Name the fact after the rule it proves. Mine is `ACartRemembersItsPlays`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void ACartRemembersItsPlays()
    {
        string path = Path.Combine(Path.GetTempPath(), "kdxr-mine-rotation.json");
        File.Delete(path);

        Song nightjar = new Song("Nightjar", "The Lamplighters", 227);
        nightjar.Play();
        nightjar.Play();

        Rotation rotation = new Rotation();
        rotation.Add(nightjar);
        rotation.Save(path);

        Rotation reopened = new Rotation();
        reopened.Load(path);

        Assert.Equal(1, reopened.Count);
        Assert.Equal(2, reopened.All()[0].PlaysTonight);
    }
```

</details>

> [!IMPORTANT]
> **Run it before you touch `Song.cs`.** This one is written to fail, and watching it fail is the task. A green here means you fixed something before you saw what was broken.

**Run yours, and expect red:**

```bash
dotnet test week-08/Lab.Tests
```

```
  Assert.Equal() Failure: Values differ
Expected: 2
Actual:   0
```

**Red, for the right reason.** Your song played twice, the count went into the file, and the song came back with 0.

**Want to see it happen? Use the debugger.** This part is optional, and nothing in it changes any code.

1. In your fact, click in the margin just left of the line number on your last `Assert.Equal`. A red dot appears.
2. Just above `public class DeskTests`, click **Debug All Tests**. The debugger stops on your red dot.
3. Open the **Debug Console**, the tab next to Terminal at the bottom (<kbd>⇧⌘Y</kbd> / <kbd>Ctrl+Shift+Y</kbd>). Type this and press Enter:

   ```
   File.ReadAllText(path)
   ```

   It shows the file your test just wrote, with `"PlaysTonight": 2` in it.
4. Now type this and press Enter:

   ```
   reopened.All()[0].PlaysTonight
   ```

   It answers `0`. The number is in the file and not in the object.
5. Press **Stop** (<kbd>⇧F5</kbd> / <kbd>Shift+F5</kbd>), then click the red dot to remove it.

**Here is why.** A serializer writes every property it can **read**, and reads back only the ones it can **write**. `PlaysTonight` is `{ get; private set; }`. It's sealed so nothing outside the class can claim a play that never happened, and that is still right. It also means the serializer has no way to put the value back.

**So you tell it that this one is allowed.** First, the `using` the attribute needs — add this at the very top of `Lab/Song.cs`:

```csharp
using System.Text.Json.Serialization;
```

Then, under the `TODO — Task 4` comment, put one line directly above the property:

```csharp
    [JsonInclude]
    public int PlaysTonight { get; private set; }
```

⚠️ **Do not fix it by making the setter public.** That would undo weeks 4 and 5. The attribute changes what the serializer is allowed to do, and nothing else.

**Now start from nothing once more and do the same thing** — throw the file away, then run: DJ name, `a`, `q`:

```bash
rm week-08/rotation.json
```

```bash
dotnet run --project week-08/Lab
```

**Then run it again — DJ name, then `t`:**

```bash
dotnet run --project week-08/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
```

**The night survived.** Air the hour on this run and sign off, and the next run says 2.

**Yours, green:**

```bash
dotnet test week-08/Lab.Tests
```

**4 passed.**

**Then mine:**

```bash
dotnet test week-08/Lab.Checks
```

**4 / 4.**

**Then clock out — commit the shift:**

```
week 8 lab: a cart remembers its plays
```

**Four commits, four green checks, and a station that remembers its own night.**

> [!NOTE]
> **In class, stop here.** The demo has one more part. After it, [Now try to break it](#now-try-to-break-it) and [⭐ Done early?](#-done-early) are yours. Working at home? Carry straight on.

📖 *Further reading:* [what the serializer will not read back](../lecture-notes.md#what-the-serializer-will-not-read-back).

---

## Now try to break it

The desk remembers. Prove it — and then prove how thin the memory is:

```bash
dotnet run --project week-08/Lab
```

- Air the hour four times over three separate shifts. Does `PLAYED` add up across all of them?
- **Delete `week-08/rotation.json` while the desk is closed**, then run it. What happens, and is that the right thing to happen?
- **Open `week-08/rotation.json` while the desk is closed and change a `"Seconds"` to `0`.** Run it and press `t`. Did the length change? Look at how `Song.Seconds` is written and work out why not — a setter that refuses nonsense refuses it whoever is asking, including a file.
- **Open the file while the desk is closed and change a `"PlaysTonight"` to `500`.** Run it. The desk believes you. That is the weakness of a save file: anyone who can open it can change what the program believes. Week 10 moves the data off your laptop.
- **Falsify your Task 4 fact** — [make it lie](../../week-07/lecture-notes.md#make-it-fail-once): comment out the `[JsonInclude]`, run your suite, read the failure, put it back.

## ⭐ Done early?

1. **An air log: who had the desk before you.** The rotation is rewritten every sign-off. An air log is different: one line per shift, added to the end, and never rewritten. [It uses the two `File` methods you haven't touched yet](../lecture-notes.md#appending-a-log-that-keeps-every-line). There's no check for it — it's yours. Here is all of it:

   <details>
   <summary><b>Show me the air log</b></summary>

   Add these two methods to `Lab/Broadcast.cs`, inside the class:

   ```csharp
       // One more line on the end of the file. AppendAllText makes the file if
       // it isn't there yet, and never touches the lines already in it.
       public static void LogShift(string path, string line)
       {
           File.AppendAllText(path, line + "\n");
       }

       // The last line anybody wrote, or "" on a desk nobody has signed off.
       public static string LastShift(string path)
       {
           if (!File.Exists(path))
           {
               return "";
           }

           string[] lines = File.ReadAllLines(path);

           if (lines.Length == 0)
           {
               return "";
           }

           return lines[lines.Length - 1];
       }
   ```

   In `Lab/Program.cs`, just above `Console.Write("DJ on duty: ");`:

   ```csharp
   string previous = Broadcast.LastShift("week-08/air-log.txt");

   AnsiConsole.MarkupLine(previous.Length == 0
       ? $"[{Dim}]Nothing on the desk. First shift on this log.[/]"
       : $"[{Dim}]Last on this desk: {Markup.Escape(previous)}[/]");
   AnsiConsole.WriteLine();
   ```

   And right under your `rotation.Save(rotationFile);`:

   ```csharp
   Broadcast.LogShift("week-08/air-log.txt",
       $"{djName} signed off - {hour.Count} in the hour, {switchboard.Count} on the switchboard.");
   ```

   Run it twice, with a different DJ name each time. The second run opens with the first DJ's name. Open `week-08/air-log.txt`: one line per shift, oldest first, none of them overwritten.

   ⚠️ **`"\n"`, not `Environment.NewLine`** — [the reason is a paragraph in the notes](../lecture-notes.md#appending-a-log-that-keeps-every-line).

   </details>

2. **Stop writing what you already know.** `rotation.json` holds `Length`, `Kind` and `Cue`, and all three are worked out from the other fields — so the file stores the same fact twice. Put `[JsonIgnore]` on them ([the mirror of the attribute you just used](../lecture-notes.md#the-mirror-what-it-writes-that-you-did-not-want)), run a shift, and look at how much smaller the file gets. Check 1 has to stay green.
3. **A fact for the first night.** `AFirstNightKeepsItsCarts` is born green. [Falsify it once](../../week-07/lecture-notes.md#make-it-fail-once): take the `File.Exists` guard out of `Load`, run your suite, read the failure, put it back.
4. **Without a serializer.** A list that holds several different kinds of things can't be rebuilt by a serializer on its own. The notes show what happens instead: a first try that is [readable, and useless](../lecture-notes.md#readable-and-useless), then [objects turned into text and back by hand](../lecture-notes.md#turning-objects-into-text-and-back) — [written one line per entry](../lecture-notes.md#saving-by-hand-one-line-per-record-fields-kept-apart) and [read back by looking at the kind word first](../lecture-notes.md#loading-by-hand-the-kind-word-first). Read those and work out what `Rotation.Save` would have to look like if the rotation held ads and weather beds as well as songs.
5. **Put a time on it.** Once you have the air log from item 1: it records *what* happened and not *when*. Give `LogShift` a stamp — [the station's clock is two lines](../lecture-notes.md#the-stations-own-clock) — and write `HH:mm` in front of each entry. Then notice something: the air log needs no sorting, ever, because it is only ever appended to. [A log that has to stay in time order while lines arrive out of order is not so lucky](../lecture-notes.md#keeping-a-list-in-time-order), and the reason is worth ten seconds.
6. ⭐ **The one that pays off later:** your `Load` walks one list to fill another. In **week 9** that becomes one line — and your suite is how you'll *prove* the one-liner does the same job.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-08/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. Your task doesn't need the file to start. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-08/Lab.Checks`. |
| `CS0103: The name 'JsonSerializer' does not exist` | Missing `using System.Text.Json;` at the top of `Rotation.cs`. It ships in the starter — check it's still there. |
| `CS0103: The name 'rotationFile' does not exist` | The path line isn't in `Program.cs`, or it's below the line that uses it. It goes under the `Task 2 — where the carts get written down` comment, near the top. |
| `CS0246: 'JsonInclude' could not be found` | A different `using`, and it catches everybody: `using System.Text.Json.Serialization;` — the `.Serialization` on the end is the whole difference. |
| No file appears after a sign-off | `Save` still has an empty body, the `rotation.Save(rotationFile);` line isn't in `Program.cs`, or you ended the shift some way other than `q`. The save happens at sign-off, not as you go. |
| The rotation has **six** carts | `Load` isn't clearing the list before it fills it. `Program.cs` has already added three carts before `Load` runs. |
| `Load` runs and the rotation is still the three starter carts, even after a hand edit | `Deserialize` built a list, and nothing moved the songs into `_songs`. That's the `foreach` at the end of `Load`. |
| The file said 1, and after I quit it says 0 | Quitting saves the desk as it stands. If `Load` isn't working yet, the desk has zeros, and it writes them over the file. |
| `PLAYED` is still 0 after Task 4 | Either the attribute isn't on `PlaysTonight`, or the file on disk was written *before* you added it and holds zeros — air the hour, sign off, and run again. |
| Everything comes back with blank titles | `Song` was changed so the serializer can't find a way in. `Song` ships with one public constructor whose parameters match the property names; [that is the road it uses](../lecture-notes.md#-troubleshooting). |
| `JsonException: The JSON value could not be converted` | The file was hand-edited into something that no longer matches — a `"Seconds"` in quotes, a missing comma. Delete `week-08/rotation.json` and let the desk write a new one. |
| Your Task 4 fact is green before the fix | It's loading into the rotation that saved, not a second one — or it asserts the wrong number. It has to load into a **new** `Rotation`. |
| My check is red but yours is green | Your fact isn't asking the hard question — usually loading into the *same* rotation instead of a new one. Read the check; it names what it asked. |
| `dotnet test` passes and the shift looks wrong | Run the program, not just the suites. Neither one looks at `Program.cs`. |
| Red squiggles under `Assert` or `[Fact]`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| Not sure what a serializer even is | [One list, one type](../lecture-notes.md#one-list-one-type-the-serializer) — why a list of one type gets one, and a list of mixed kinds doesn't. Then [both directions, worked](../lecture-notes.md#jsonserializer-both-directions). |
| The debugger won't start, or builds fail now and then with *"being used by another process"* or *"access denied"* | Check whether your repo is inside OneDrive or another sync folder. On Windows, `Documents` often is. The sync program locks files while a build is writing them. Push your work, then clone your repos fresh into a folder outside it — [the setup guide's fix](../../week-01/setup-guide.md#-if-something-wouldnt-install). The debugger part of Task 4 is optional, so skip it until then. |
| The file is there and the program says it isn't | The working directory. `dotnet run` stands at the top of your repo and <kbd>F5</kbd> stands in the project folder, so they read two different places. [The whole story is in the notes](../lecture-notes.md#where-the-file-actually-goes). |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 8 lab: the rotation is written down"
> ```

**Prev:** [Week 7 Lab — The Update](../../week-07/lab/) · **Next:** [Week 8 Homework — It Survives the Night](../homework.md)
