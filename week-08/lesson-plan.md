# Week 8 — Lesson Plan

**Topic:** File I/O — text, delimited fields and JSON serialization; where a relative path actually goes; and the course's oldest promise, collected.
**Session length:** 3h 45m

> Students have watched a list die at every restart since week 3 and have been told three times that week 8 was the answer. Tonight they get it — and they also get the honest half: a save file is a text file, on one laptop, that anybody who can open it can change.

## 🎯 The payoff moment — the demo's

**§4, and §5 finishes it.** The save file goes up in the editor — the station's whole day, in plain text — and then the program runs again and Nakamura is still on the board. The line to land, and it says nothing about the weeks before:

> *"There he is. Same board, new program."*

⚠️ **And one number on that board is wrong, on purpose.** §4's `Load` builds a new `CrewMember` from each name — the natural first attempt — so every TRIPS cell says `1` and the line under them says **`0 trips logged today.`** Measured. **Leave it alone in §4.** §5 opens on it, writes `TheLogSurvivesARestart` first, and the red prints two Okonkwos that look identical: `Expected: CrewMember { Name = "Okonkwo", TripsToday = 1 }` over the same `Actual:`. `Lookup` fixes it and the line reads `4`. That is week 5 and week 7's `Assert.Same` arriving somewhere nobody expected them, and it is the exact shape of the lab's Task 4.

## 🎯 The payoff moment — the lab's

**Task 4, and the file is the evidence.** They air the hour, sign off, and open `rotation.json` to find `"PlaysTonight": 1` sitting in it. Then they run the desk again and the board says `0`. **It lands right after §5, which has just shown the same shape on Haldane** — a count that comes back wrong, a test written first, red, then the fix.

**The right answer is visible and the program still gets it wrong** — and the cause is a rule they have been obeying since week 4. A serializer writes what it can read and reads back what it can write; `{ get; private set; }` is half of that. One attribute fixes it, and the task frames it as a decision about what should survive rather than as a repair.

⚠️ **They write the fact before the fix**, which is last week's discipline arriving on this week's material. The commonest wrong reflex to catch while circulating: reading the check's message and going straight to `Song.cs`. ⚠️ **Slide 4, which explains why, comes AFTER Lab E, at the start of §6** — putting it before would spend the surprise.

## Learning objectives

By the end of this session, students can:

1. Read and write a file with `File.WriteAllText` / `ReadAllText` / `WriteAllLines` / `ReadAllLines` / `Exists`. *(`AppendAllText` and the difference between a save file and a log are the lab's first Done early item.)*
2. Say where a relative path resolves — and why `dotnet run` and `dotnet test` disagree about it.
3. Take a path as a parameter rather than naming a file inside a class, and say what that buys.
4. Turn a list of objects into text and back by hand, kind-word first, with a separator that cannot appear in a field.
5. Use `JsonSerializer.Serialize` / `Deserialize<T>` on a list of one type.
6. Explain why a `{ get; private set; }` property does not survive a round trip, and correct it with `[JsonInclude]`.
7. Treat a missing file as a first run rather than an error.
8. Write a fact that saves, reloads into a **second** object, and asserts on what came back — **before** the fix, and watch it go red.

> [!NOTE]
> **Objectives 2 and 6 are the week's two surprises**, and both are measurable rather than matters of taste. If the night runs short, protect §4's payoff, §5's red and the lab's Task 4 — and let §6's ordering beat shorten to the spoken finding without the order fact.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html))
- **The instructor demo repo**, where week 7 left it — `week-01/` … `week-07/` in it, clean, `main` up to date after last week's merge
- ⚠️ **Week 7's project has to RUN** — §1 opens by running it. One `dotnet run --project week-07/Haldane` before class warms the restore
- ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — both projects **and `week-08/watch-log.txt`**
- **A browser tab on the lab README** (`week-08/lab/README.md` on GitHub) — it is the projector screen for Lab A–F
- **The pace question, set up before class** — the same anonymous one-tap question as week 7 (*too slow · about right · too fast · I got lost somewhere*). An ungraded anonymous Canvas survey does it

## The chunked night

*Re-cut 2026-09-30, the second chunked week.* Week 7's pilot was an improvement, but attention still drifted and the lab was a struggle. **Week 8 keeps the demo's full time and cuts it into seven short segments, each followed by the lab task that practices it.** The longest stretch of watching is §3, at 25 minutes.

- **Every demo segment follows one shape: run it, see the issue, fix it, run it again.** The lab task after it has the students do the same on KDXR.
- **Five slides**, each about a minute, and only for what the editor cannot show: where a relative path goes, why the lab uses a serializer, and why a private setter does not come back.
- **Every lab block ends at an "In class, stop here" note** in the README, with an early-finisher extra. Lab F has no stop; it absorbs what is left.
- **The lab README carries every piece of syntax a task needs**, with the whole method in a collapsed *Stuck? Show me the shape* box. The arrangement is the student's. **Watch who opens the box** — it is the week's best signal of where the struggle is.
- ⚠️ **The one mismatch, said out loud in §3:** Haldane saves by hand because its log holds three kinds of entries; KDXR uses a serializer because a rotation is one list of one type. **Slide 3 bridges it.** Without it, Lab C looks unrelated to what they just watched.
- **The homework is the lab again, on their own project** — same four tasks, same order. Say so at the wrap.
- **The pace question at the wrap is how the format gets judged.** Keep the answers.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 14 min | **Where we finished last week** *(demo §1)*. Run week 7, take a reading, and the question: everything you just did is gone. Branch, `week-08/Haldane`, the suite carried forward, the date. |
| 0:14 | 5 min | **Lab A: setup** *(no slide — the lab README in the browser)*. Setup steps 1–4, **1 / 4** passing, the starter commit. Stop there. |
| 0:19 | 22 min | 💥 **Gone** *(demo §2)*. Sign Nakamura out, quit, run again — *"where is Nakamura?"* 🎯 Not a bug: memory goes with the program. The test they cannot write yet, and `File` in one line. |
| 0:41 | 7 min | **Lab B: Task 1.** Air the hour, quit, run again: `PLAYED` is 0. No code. |
| 0:48 | 25 min | **A file of our own** *(slides 2–3, demo §3)*. Where a path goes. The first save — readable — then *"where does the name stop and the reason start?"*, then the pipe format and the migration line. Closes on slide 3: one list, one type. |
| 1:13 | 12 min | **Lab C: Task 2** — `Save`, and the two `Program.cs` lines that call it. |
| 1:25 | 10 min | **☕ Break** |
| 1:35 | 20 min | 🎯 **It is still there** *(demo §4)*. `Load`, the first-run branch, and the restart: Nakamura is back. The trips line says `0`, and nobody points at it yet. |
| 1:55 | 13 min | **Lab D: Task 3** — `Load`, its one `Program.cs` line, and a hand-edited title to prove it reads the file. |
| 2:08 | 15 min | 💥 **The number that came back wrong** *(demo §5)*. `0 trips` against a column of 1s. The test first — red, two identical Okonkwos — then `Lookup`, two `CS7036`s, green, `4 trips`. |
| 2:23 | 23 min | 🎯 **Lab E: Task 4** — the lab's payoff. Fact first, red, `[JsonInclude]`, green. **Circulate hard.** |
| 2:46 | 20 min | **The station's own clock** *(slide 4, demo §6)*. Slide 4 explains what Task 4 just did. Then `UtcNow`, the ordered `Add`, and the order fact. 3 → 5 is complete. |
| 3:06 | 10 min | **☕ Break** |
| 3:16 | 12 min | 💥 **A file is a text file** *(demo §7)*. Delete Reyes's line in the editor. She is on the ice and on nothing. Week 10 and week 13, named. The hand-off. |
| 3:28 | 7 min | **Lab F: finish, or try to break it.** |
| 3:35 | 10 min | **Wrap-up** *(slide 5, demo §8)*. Project repo URL, **the homework is the lab again**, the checks-copy line — **four checks this week, not two** — ⚠️ **the two-week due date**, and the pace question. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 128 of demo in seven segments, 67 of lab in six blocks.** If the night runs long, §6 is the segment to shorten — keep the clock change and the spoken finding about ordering, drop the order fact. **Do not take it from §4** (the payoff), **§5** (the red), **or §2** (the loss), and do not take it from the lab. **If the demo runs fast, the time goes to Lab F.**

## Instructor notes

- 🎯 **§2's loss is theirs to name, not yours.** Sign Nakamura out, quit, run again, and ask *"where is Nakamura?"* — then wait. The room has been told three times that this week answers it; let somebody say so before you do.
- ⚠️ **No callback to the weeks the promise was made in.** Jeff, 2026-10-02: *"the callbacks are silly — nobody will remember that."* The loss and Nakamura coming back carry it on their own.
- 🎯 **§3's first save is a good one that does not work.** The file is genuinely readable and the room will think it is finished. The question *"where does the name stop and the reason start?"* is what turns it — ask it and wait rather than explaining it.
- ⚠️ **Do not point at `0 trips logged today` in §4.** It is planted there on purpose, and §5 opens on it. If somebody spots it early, say *"hold that thought — it's the next thing we do."*
- 🎯 **In §5, ask for the color before the test runs, and wait.** Then point at Expected and Actual printing the same text. Two objects that look identical is the whole idea of `Assert.Same`.
- 💡 **§5's two `CS7036`s arrive one at a time** — the test project cannot build past the error in `Program.cs`. Read each one off the screen; it names the file and the missing `crew`. That is week 7's "the error list is the checklist", one more time.
- ⚠️ **Slide 4 goes up at the START of §6, after Lab E, not before.** It explains what the lab's Task 4 just did to them. Before Lab E it would spend the surprise.
- 💡 **§6 ends with a ten-second plant for week 9** — the clock is real, the DAY is still typed into the source and hand-edited every week. It is collected in week 9's §5. **Say it and move on; nothing in week 8 fixes it.**
- ⚠️ **§6's ordering change is the better lesson of the two in that segment**, and it is easy to rush past. *The book is in order because something puts it in order* — before tonight it was in order because the lines happened to arrive that way, and only one of those can be tested. The order fact is what makes it real.
- 💡 **The time in §6's output block is station time when the sheet was captured.** Yours will differ; nothing else in that block does. Don't retype the sheet's numbers.
- ⚠️ **§7 is 12 minutes and it must not become a lecture on security.** Delete one line, run it, let the muster print, and say the two sentences. The point is that the record is a text file on one laptop — week 10 moves it and week 13 handles it being damaged.
- **The demo commits five times, silently**, and the first is immediately after the carry-forward — the same commit the lab's Setup asks of them. Then the save (§3), the load (§4), the lookup (§5), and the clock with the push (§6).
- **The branch is spoken, briefly** — five seconds, nothing new this week.
- ⚠️ **Say the checks-copy line at the wrap with this week's twist.** This week's `Project.Checks` holds **four** checks; last week's held two. A student on last week's sees two names and 1/2.
- ⚠️ ⚠️ **Say the due date out loud, twice if you have to.** The term break falls between this session and the next, so this homework is set today and due two weeks out. It is not bigger; students will assume it is.
- **Lab D is where the wrong answer looks right** — a `Load` with no `Clear()` gives six carts and a plausible-looking board. Circulate for a rotation with six rows in it.
- **Lab E is where the discipline happens to them** — watch for students fixing `Song.cs` before writing the fact. The question over a shoulder: *"what color is your test right now?"*
- 💡 **`Lab.Tests` fact names are theirs.** The homework dictates exactly one name, and its note on why the name carries the week is worth reading aloud if anybody asks.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-08/Haldane` refuses | You rehearsed and left `week-08/` behind. Delete both project folders **and the log file**; §0 says so. |
| §4's restart shows an empty log | A `week-08/watch-log.txt` from a rehearsal is still there in the old format, so `Load` reads nothing out of it. Delete it and re-run §4's first run. |
| §4's board says `4 trips logged today`, not `0` | The `Lookup` version of `Load` is already in — you pasted §5's code during §4, or a rehearsal file survived. Put §4's `Load` back (`rehearsal/Watch.after-4.cs`); the `0` is §5's whole beat. |
| §5's test is green on the first run | Same cause: `Load` already looks the crew up. The red is the beat. |
| The log's new line lands somewhere other than the BOTTOM of the book | Correct, and it is the ordered `Add` working. Station time is UTC and the seeded day runs `07:40`–`14:35`, so where a live line lands depends on the hour you are running it: a line stamped `02:47` genuinely belongs before the fuel dip. Nothing to fix — it is the one moment the insert is visible. |
| A student's file has `-39,8` in it | Their machine's language setting. The demo writes with `CultureInfo.InvariantCulture` for exactly this; the lab uses JSON, which has one number format everywhere. |
| Somebody asks why not just make the setter public | Because weeks 4 and 5 said no, and the reason has not changed. The attribute changes what the *serializer* may do; the rest of the program still cannot touch it. |
| Somebody asks what happens if the file is damaged | Honestly: tonight, the line is skipped or the program throws, depending on the damage. **That is week 13**, and §7 says so. Don't build it now. |
| Somebody asks why the demo didn't just use JSON | Because the log holds three different kinds of things, and a serializer handed a `List<ILogEntry>` cannot build an interface back. There is a way to make it work; it is more machinery than tonight has room for, and doing it by hand is twelve readable lines. §3 and slide 3 say exactly this. |
| A student's `Load` gives them six carts | No `Clear()` before filling. The lab's 🆘 names it and the check's message does too. |
| A student's `Load` runs and nothing from the file shows up | `Deserialize` built a list and nothing moved it into `_songs`. The `foreach` at the end of `Load`. |
| A student asks where the air log went | It is item 1 of the lab's *⭐ Done early?*, complete, with no check. |
| A student is passing `Save` a name instead of the path | The most common shape of "works for me, red in the checks". `dotnet test` does not stand where `dotnet run` stands — show them `Path.GetFullPath(path)` printed once. |
| <kbd>F5</kbd> reads a different file than the terminal did | It does, and it is not a bug: `launch.json` sets the working directory to the project folder. Named in the notes and the lab's 🆘. |
