# Week 8 — Lesson Plan

**Topic:** File I/O — text, delimited fields and JSON serialization; where a relative path actually goes; and the course's oldest promise, collected.
**Session length:** 3h 45m

> Students have watched a list die at every restart since week 3 and have been told three times that week 8 was the answer. Tonight they get it — and they also get the honest half: a save file is a text file, on one laptop, that anybody who can open it can change.

## 🎯 The payoff moment — the demo's

**§5, and it is two beats rather than one.** The save file goes up in the editor — the station's whole day, in plain text, still readable — and then the program runs again and Nakamura is still on the board. The line to land is the promise being paid, not the feature:

> *"There he is. Same board, new process. Week three's promise, paid."*

⚠️ **Do not skip the line after it.** `4 trips logged today.` is a sum of counts each crew member keeps, and nothing in the file says four — it is right because `Load` looked the crew up rather than building new people out of names. **Measured: build fresh ones and that line reads `0` while the board above it looks identical.** That is week 5 and week 7's `Assert.Same` arriving somewhere nobody expected them.

## 🎯 The payoff moment — the lab's

**Task 4, and the file is the evidence.** They air the hour, sign off, and open `rotation.json` to find `"PlaysTonight": 1` sitting in it. Then they run the desk again and the board says `0`.

**The right answer is visible and the program still gets it wrong** — and the cause is a rule they have been obeying since week 4. A serializer writes what it can read and reads back what it can write; `{ get; private set; }` is half of that. One attribute fixes it, and the task frames it as a decision about what should survive rather than as a repair.

⚠️ **They write the fact before the fix**, which is last week's discipline arriving on this week's material. The commonest wrong reflex to catch while circulating: reading the check's message and going straight to `Song.cs`.

## Learning objectives

By the end of this session, students can:

1. Read and write a file with `File.WriteAllText` / `ReadAllText` / `WriteAllLines` / `ReadAllLines` / `AppendAllText` / `Exists`, and say which of those is a save file and which is a log.
2. Say where a relative path resolves — and why `dotnet run` and `dotnet test` disagree about it.
3. Take a path as a parameter rather than naming a file inside a class, and say what that buys.
4. Turn a list of objects into text and back by hand, kind-word first, with a separator that cannot appear in a field.
5. Use `JsonSerializer.Serialize` / `Deserialize<T>` on a list of one type.
6. Explain why a `{ get; private set; }` property does not survive a round trip, and correct it with `[JsonInclude]`.
7. Treat a missing file as a first run rather than an error.
8. Write a fact that saves, reloads into a **second** object, and asserts on what came back.

> [!NOTE]
> **Objectives 2 and 6 are the week's two surprises**, and both are measurable rather than matters of taste. If the night runs short, protect §5's payoff and the lab's Task 4 — and let §6's ordering beat shorten to the spoken finding without the second fact.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html))
- **The instructor demo repo**, where week 7 left it — `week-01/` … `week-07/` in it, clean, `main` up to date after last week's merge
- ⚠️ **Week 7's project has to RUN** — §1 opens by running it. One `dotnet run --project week-07/Haldane` before class warms the restore
- ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — both projects **and `week-08/watch-log.txt`**

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 15 min | **Where we finished last week** *(demo §1)*. Run week 7, take a reading, and the question: everything you just did is gone. Branch, `week-08/Haldane`, the suite carried forward, the date. |
| 0:15 | 25 min | 💥 **Gone** *(slides 2–4, demo §2)*. Sign Nakamura out, quit, run again — *"where is Nakamura?"* 🎯 **The promise collected by name**, then the test they cannot write, then the six `File` methods. |
| 0:40 | 10 min | **☕ Break** |
| 0:50 | 20 min | **Readable, and useless** *(slides 5–6, demo §3)*. Where a path goes, measured. The first save — one line per entry — then the file on screen and the question: *where does the name stop and the reason start?* |
| 1:10 | 30 min | **A format both sides can read** *(slides 7–8, demo §4)*. Kind word first, a `\|` not a comma, `Split`, and the crew lookup. 🎯 **Then the serializer named as the tool for the ordinary case**, which the lab uses. |
| 1:40 | 10 min | **☕ Break** |
| 1:50 | 16 min | 🎯 **It is still there** *(slide 9, demo §5)*. The file in the editor, then the restart. Week 3's promise, paid — and the trips line that proves the lookup. |
| 2:06 | 16 min | **The station's own clock** *(slide 10, demo §6)*. `14:57` on every line, all term. `UtcNow`, then the ordering that was luck until now. |
| 2:22 | 10 min | **The fact week seven could not write** *(slide 11, demo §7)*. Two facts, a scratch path, and a **second** watch. 3 → 5. |
| 2:32 | 8 min | 💥 **A record you can edit by hand** *(slide 12, demo §8)*. Delete Reyes's line in the editor. She is on the ice and on nothing. Week 10 and week 13, named. |
| 2:40 | 5 min | **Lab launch** *(slide 13, demo §9)*. Two files, one attribute. Done is 5 green and a desk that knows who was on before you. |
| 2:45 | 50 min | **Lab: the log book** *(slide 13 stays up)*. **In-class target: 5 green.** Circulate hard at Task 3 (clearing the list) and Task 4 (writing the fact before the fix). |
| 3:35 | 10 min | **Wrap-up** *(slide 14, demo §10)*. Two URLs, the checks-copy line — **four checks this week, not two** — and ⚠️ **the two-week due date**. |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, §6 is the segment to shorten — keep the clock change and the spoken finding about ordering, drop the second fact in §7. **Do not take it from §5** (the payoff) **or from §2** (the promise), and do not take it from the lab.

## Instructor notes

- 🎯 **§2's loss is theirs to name, not yours.** Sign Nakamura out, quit, run again, and ask *"where is Nakamura?"* — then wait. The room has been told three times that this week answers it; let somebody say so before you do.
- ⚠️ **Collect the promise by naming the weeks it was made in** — week 3, week 6, week 7. It is the oldest promise in the course and the room notices when it is paid on time.
- 🎯 **§3's whole point is that the first attempt is a good one that does not work.** The file is genuinely readable and the room will think it is finished. The question *"where does the name stop and the reason start?"* is what turns it — ask it and wait rather than explaining it.
- ⚠️ **Do not skip the `rm week-08/watch-log.txt` in §4.** The format changed, so the file on disk is unreadable by the new code, and the honest move is to say that out loud — it also plants week 14.
- 💡 **The `Lookup` beat in §4 is the one that connects three weeks at once**: week 5's references, week 7's `Assert.Same`, and tonight's file. It is worth thirty seconds even when the clock is tight.
- 🎯 **In §5, the `4 trips logged today.` line is the proof, not decoration.** Measured: a `Load` that builds fresh crew members leaves the board identical and that line at `0`. Say that you checked it.
- ⚠️ **§6's ordering change is the better lesson of the two in that segment**, and it is easy to rush past. *The book is in order because something puts it in order* — before tonight it was in order because the lines happened to arrive that way, and only one of those can be tested. The second fact in §7 is what makes it real.
- 💡 **The times in §6's and §8's output blocks are station time when the sheet was captured.** Yours will differ; nothing else in those blocks does. Say so if anybody asks, and don't retype the sheet's numbers.
- ⚠️ **§8 is 8 minutes and it must not become a lecture on security.** Delete one line, run it, let the muster print, and say the two sentences. The point is that the record is a text file on one laptop — week 10 moves it and week 13 handles it being damaged.
- **The demo commits four times, silently**, and the first is immediately after the carry-forward — the same commit the lab's Setup asks of them. Then the format (§5), the clock (§6), and the two facts with the push (§7).
- **The branch is spoken, briefly** — five seconds, nothing new this week.
- ⚠️ **Say the checks-copy line at the wrap with this week's twist.** This week's `Project.Checks` holds **four** checks; last week's held two. A student on last week's sees two names and 1/2.
- ⚠️ ⚠️ **Say the due date out loud, twice if you have to.** Fall break falls between this session and the next, so this homework is set today and due two weeks out. It is not bigger; students will assume it is.
- **The lab's Task 3 is where the wrong answer looks right** — a `Load` with no `Clear()` gives six carts and a plausible-looking board. Circulate for a rotation with six rows in it.
- 💡 **`Lab.Tests` fact names are theirs.** The homework dictates exactly one name, and the note explaining why it carries the week rather than a number is worth reading aloud if anybody asks.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-08/Haldane` refuses | You rehearsed and left `week-08/` behind. Delete both project folders **and the log file**; §0 says so. |
| §5's restart shows an empty log | A `week-08/watch-log.txt` from a rehearsal is still there in the old format, so `Load` reads nothing out of it. Delete it and re-run §5's first run. |
| The log's new line lands at the TOP of the book | Correct, and only visible outside class hours: station time is UTC, so a line stamped `02:47` genuinely belongs before the `07:40` fuel dip. During class (12:30–4:20 Central) it is 17:30–21:20 at the station and new lines land at the bottom. |
| A student's file has `-39,8` in it | Their machine's language setting. The demo writes with `CultureInfo.InvariantCulture` for exactly this; the lab uses JSON, which has one number format everywhere. |
| Somebody asks why not just make the setter public | Because weeks 4 and 5 said no, and the reason has not changed. The attribute changes what the *serializer* may do; the rest of the program still cannot touch it. |
| Somebody asks what happens if the file is damaged | Honestly: tonight, the line is skipped or the program throws, depending on the damage. **That is week 13**, and §8 says so. Don't build it now. |
| Somebody asks why the demo didn't just use JSON | Because the log holds three different kinds of things, and a serializer handed a `List<ILogEntry>` cannot build an interface back. There is a way to make it work; it is more machinery than tonight has room for, and doing it by hand is twelve readable lines. §4 says exactly this. |
| A student's `Load` gives them six carts | No `Clear()` before filling. The lab's 🆘 names it and the check's message does too. |
| A student is passing `Save` a name instead of the path | The most common shape of "works for me, red in the checks". `dotnet test` does not stand where `dotnet run` stands — show them `Path.GetFullPath(path)` printed once. |
| <kbd>F5</kbd> reads a different file than the terminal did | It does, and it is not a bug: `launch.json` sets the working directory to the project folder. Named in the notes and the lab's 🆘. |
