# Week 8 — Lesson Plan

**Topic:** File I/O — `File`, JSON serialization, where a relative path actually goes, and the private-setter trap.
**Session length:** 3h 45m

> **From this week the demo works on KDXR, the same station as the lab.** The instructor builds the switchboard's `Save` and `Load` live and pushes each finished file to the starters repo; students copy it in, then do the same to the rotation. The demo and the lab use the same technique on sibling objects, so the code a student is reading while they work is the code they just watched get written.

## 🎯 The payoff moment — the demo's

**§5, the number that came back wrong.** §4's `Load` brings the switchboard back with every caller at **0** while the file on screen says Dorothy has **4**. §5 writes the fact first, asks the room for the color, and runs it: `Expected: 4 / Actual: 0`. Then slide 3 says why, `[JsonInclude]` goes on, the suite goes green, and after a restart Dorothy is back at four calls with her request. The line to land:

> *"Four calls and Nightjar, after a restart. The switchboard remembers the night."*

⚠️ **Leave the 0 alone in §4.** It is planted there and §5 opens on it.

## 🎯 The payoff moment — the lab's

**Task 4, and the file is the evidence.** They air the hour, sign off, and open `rotation.json` to find `"PlaysTonight": 1` sitting in it. Then they run the desk again and the board says `0`. **It lands right after §5, which has just shown the same thing on the switchboard** — and your fixed `Caller.cs` and your fact are sitting in their project while they work.

⚠️ **They write the fact before the fix**, which is last week's discipline arriving on this week's material. The commonest wrong reflex to catch while circulating: reading the check's message and going straight to `Song.cs`.

## Learning objectives

By the end of this session, students can:

1. Read and write a file with `File.WriteAllText` / `ReadAllText` / `Exists`. *(`AppendAllText` and the difference between a save file and a log are the lab's first Done early item.)*
2. Say where a relative path resolves — and why `dotnet run` and `dotnet test` disagree about it.
3. Take a path as a parameter rather than naming a file inside a class, and say what that buys.
4. Use `JsonSerializer.Serialize` / `Deserialize<T>` on a list of one type.
5. Explain why a `{ get; private set; }` property does not survive a round trip, and correct it with `[JsonInclude]`.
6. Treat a missing file as a first run rather than an error.
7. Write a fact that saves, reloads into a **second** object, and asserts on what came back — **before** the fix, and watch it go red.

> [!NOTE]
> **Objectives 2 and 5 are the week's two surprises**, and both are measurable rather than matters of taste. If the night runs short, protect §5's red and the lab's Task 4.

## Materials

- `slides.md` / `slides.html` — the deck, four slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html))
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 sets it up and tests a push
- ⚠️ **`demo/week-08/` in the starters repo empty or missing** before class — it fills up during the night
- ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- **A browser tab on the lab README** (`week-08/lab/README.md` on GitHub) — it is the projector screen for Lab A–F
- **The pace question, set up before class** — the same anonymous one-tap question as week 7 (*too slow · about right · too fast · I got lost somewhere*). An ungraded anonymous Canvas survey does it

## The chunked night, on one station

*Re-cut 2026-09-30, and moved onto KDXR 2026-10-02.* Each demo segment is followed by the lab task that practices it, and **the demo works on the switchboard while the lab works on the rotation** — same technique, sibling objects.

- **After §3, §4 and §5 you push your finished file to `demo/week-08/` in the starters repo.** Each lab task opens with the student pulling and copying it in. The files you push are only ones students never edit — `Switchboard.cs`, `Caller.cs`, `SwitchboardTests.cs` — so a copy can never overwrite their work.
- ⚠️ **Nothing in the lab waits on a push.** Their tasks are on `Rotation` and `Song`. If a push stalls, they start the task and copy your file when it lands.
- **Push only what you just ran.** Each push comes right after the segment's last run or green test, so nothing broken reaches the room.
- **Every lab block ends at an "In class, stop here" note** in the README, with an early-finisher extra. Lab F has no stop; it absorbs what is left.
- **The pace question at the wrap is how the format gets judged.** Keep the answers — this week decides whether weeks 9–16 run the same way.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 8 min | **The same station** *(demo §1)*. From tonight the demo is KDXR. You build the switchboard; they build the rotation. |
| 0:08 | 10 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 8 in alongside the room. **1 / 4**, the starter commit. Stop there. |
| 0:18 | 15 min | 💥 **Gone** *(demo §2)*. Dorothy's fourth call, quit, run again — *"where did Dorothy's call go?"* Not a bug: memory goes with the program. `File` in one line. |
| 0:33 | 8 min | **Lab B: Task 1.** Air the hour, quit, run again: `PLAYED` is 0. No code. |
| 0:41 | 20 min | **The switchboard, written down** *(slide 2, demo §3)*. Where a path goes. `Switchboard.Save`, run, open `switchboard.json`. **Push #1.** |
| 1:01 | 20 min | **Lab C: Task 2** — copy your file in, then `Rotation.Save` and its two `Program.cs` lines. |
| 1:21 | 10 min | **☕ Break** |
| 1:31 | 15 min | **Read back** *(demo §4)*. `Switchboard.Load`, then Ray typed into the file by hand: he shows up, so the file was read — and every caller comes back at 0. The lost data and the reason (private setters) are named; the fix is §5's. **Push #2.** |
| 1:46 | 22 min | **Lab D: Task 3** — copy your file in, then `Rotation.Load`, its one line, and a hand-edited title to prove it reads the file. |
| 2:08 | 20 min | 💥 **The number that came back wrong** *(slide 3, demo §5)*. The fact first, red, slide 3, `[JsonInclude]` on both sealed properties, green, Dorothy back at 4. **Push #3.** |
| 2:28 | 30 min | 🎯 **Lab E: Task 4** — the lab's payoff. Copy your two files in, then fact first, red, `[JsonInclude]`, green. **Circulate hard.** |
| 2:58 | 10 min | **☕ Break** |
| 3:08 | 8 min | 💥 **A file is a text file** *(demo §6)*. Dorothy's calls edited to 500 by hand, and the desk believes it. Weeks 10 and 13, named. Done, defined. |
| 3:16 | 19 min | **Lab F: finish, or try to break it.** |
| 3:35 | 10 min | **Wrap-up** *(slide 4, demo §7)*. Project repo URL, **the homework is the lab again**, the checks-copy line — **four checks this week, not two** — ⚠️ **the two-week due date**, and the pace question. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 86 of demo in six segments, 109 of lab in six blocks.** If the night runs long, take it from Lab F. **Do not take it from §5** (the red) **or Lab E** (the payoff). If the demo runs fast, the time goes to Lab E.

## Instructor notes

- 🎯 **§1 is two sentences, not a speech.** *"From tonight, I work on the same station you do."* Then straight into setup with the room.
- 🎯 **§2's loss is theirs to name.** Ask *"where did Dorothy's call go?"* and wait.
- 🎯 **§4 proves the load before it shows the problem.** Ray is typed into `switchboard.json` by hand, and he appears on the board — he exists nowhere in the code, so the file was read. Only then does the room look at the zeros: say that data was lost, say why (private setters the serializer can't set), and say the next step fixes it. **Slide 3 in §5 is then the recap, not the reveal.** Without Ray, a board that went from Dorothy's 3 calls to 0 reads as *Load made it worse*.
- ⚠️ **§4's run writes the zeros back over the file when you quit.** That is said out loud — it's exactly what students meet in Task 3 — and it's why §5 deletes the file before its final run.
- 🎯 **In §5, ask for the color before the test runs, and wait for an answer.**
- 💡 **§5 puts `[JsonInclude]` on both `CallsTonight` and `Favorite`.** Both have private setters, and without the second one Dorothy's request comes back as `-`. That is the homework's own tip — every sealed property needs it — shown live.
- ⚠️ **Each push is three steps: copy the file, commit, then pull-and-push.** The cue sheet has them as three Copy buttons. **A push that asks you to sign in or is rejected costs a minute, not the block** — their task doesn't need your file to start.
- ⚠️ **§6 must not become a lecture on security.** Edit one number, run it, say the two sentences. Week 10 moves the data and week 13 handles damage.
- **The demo commits once, silently** — the starter, alongside the room in Lab A. The three pushes go to the starters repo, not the demo repo.
- ⚠️ **Say the checks-copy line at the wrap with this week's twist.** This week's `Project.Checks` holds **four** checks; last week's held two.
- ⚠️ ⚠️ **Say the due date out loud, twice if you have to.** The term break falls between this session and the next, so this homework is set today and due two weeks out. It is not bigger; students will assume it is.
- **Lab D is where the wrong answer looks right** — a `Load` with no `Clear()` gives six carts and a plausible-looking board.
- **Lab E is where the discipline happens to them** — watch for students fixing `Song.cs` before writing the fact. The question over a shoulder: *"what color is your test right now?"*

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. Their task doesn't need the file to start. |
| `demo/week-08/` already has files in it at the start of class | Left from rehearsing, or from last term. §0 resets it. If you forget, nothing breaks — students simply have your files before you've built them. |
| §4's board shows Dorothy at 4, not 0 | `[JsonInclude]` is already on `Caller.CallsTonight` — you copied the push-3 `Caller.cs` in while rehearsing. Put the starter's `Caller.cs` back. |
| §5's test is green on the first run | Same cause. The red is the beat. |
| A student's `Load` gives them six carts | No `Clear()` before filling. The lab's 🆘 names it and the check's message does too. |
| A student's `Load` runs and nothing from the file shows up | `Deserialize` built a list and nothing moved it into `_songs`. The `foreach` at the end of `Load`. |
| A student copies your `Switchboard.cs` over their own work | It can't happen: they never edit `Switchboard.cs`, `Caller.cs` or `SwitchboardTests.cs`. If they did, the copy replaces only those files. |
| A student is passing `Save` a name instead of the path | The most common shape of "works for me, red in the checks". `dotnet test` does not stand where `dotnet run` stands — slide 2. |
| <kbd>F5</kbd> reads a different file than the terminal did | It does, and it is not a bug: `launch.json` sets the working directory to the project folder. Named in the notes and the lab's 🆘. |
| A student asks where the air log went | It is item 1 of the lab's *⭐ Done early?*, complete, with no check. |
| Somebody asks why not just make the setter public | Because the setter is private for a reason, and that has not changed. The attribute changes what the *serializer* may do; the rest of the program still cannot touch it. |
