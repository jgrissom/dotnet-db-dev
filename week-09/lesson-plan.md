# Week 9 — Lesson Plan

**Topic:** LINQ over collections — one shape, a handful of words, and what a query must never do; deferred execution; and the honest limit of asking a file anything.
**Session length:** 3h 45m

> Students have been told six separate times, since week 3, that a loop they were writing by hand would become one line in week 9. Tonight all six are collected — and the collection is only half the evening. The other half is that a query **asks**: it never changes the thing it was asked about, and it is not an answer until somebody makes it one.

## 🎯 The payoff moment — the demo's

**§2, and it is a number rather than a line of code.** `LatestCelsius` — the method the room watched get written in week 6, and was promised in week 6 — becomes one line. Then:

```
Total tests: 5
     Passed: 5
```

The line to land is about the tests, not about the brevity:

> *"I deleted eleven lines of a working program. The board still reads minus forty-one point five. Five tests still pass. That is not proof that nothing broke — a suite only knows the things somebody wrote down. It is five things I did not have to go and check by hand, and before week seven I had none of them."*

⚠️ **Run the suite BEFORE the edit as well as after**, and say the number out loud both times. A green run after a change means nothing to a room that did not watch it be green before.

## 🎯 The payoff moment — the lab's

**Task 1, and it is the first task in this course whose success looks like nothing happening.** Students write one fact, rewrite seven methods across four files — six loops and one array walk — and then:

```
dotnet test week-09/Lab.Checks     →  1 / 5 — exactly where they started
dotnet test week-09/Lab.Tests      →  4 passed
```

**A student's own suite is the only thing that tells them it worked.** Week 7 promised exactly that, in as many words, and this is where it is collected.

⚠️ **The commonest wrong reflex to catch while circulating**: skipping the fact and going straight to the deleting. The fact takes ninety seconds and it is the whole point of the task.

## Learning objectives

By the end of this session, students can:

1. Read a lambda out loud — the sequence, the word, and the question asked of each thing.
2. Choose between `Where`, `Select`, `OrderBy`, `Take`, `OfType<T>`, `Sum`/`Count`/`Average`, `Any`, `FirstOrDefault`/`LastOrDefault` and `MaxBy`/`MinBy` by what each one hands back.
3. Say what happens to each of those on an **empty** sequence, and why `First` and `FirstOrDefault` are not interchangeable.
4. Replace a hand-written loop with a query **and prove the behavior did not change**, using a test written before the rewrite.
5. Say why `OrderBy` does not reorder the list it was asked about, and what `List.Sort` would have done instead.
6. Explain deferred execution: a query is a recipe, it re-runs when it is read, and `ToList()` is what makes it an answer.
7. Say which loops should NOT become queries — the ones that *do* something rather than ask something.
8. State the limit of querying a file: it must be read in full to answer anything, and it costs memory proportional to the whole of it.

> [!NOTE]
> **Objectives 3, 5 and 6 are the three that bite**, and all three are measurable rather than matters of taste. If the night runs short, protect §2's payoff and §6's break — and let §5 lose the five-coldest list.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html))
- **The instructor demo repo**, where week 8 left it — `week-01/` … `week-08/` in it, clean, `main` up to date after last week's merge
- ⚠️ **Week 8's project has to RUN** — §1 opens by running it
- ⚠️ ⚠️ **`week-09/season.txt` has to be in place before class.** It is 50,000 lines and 0.9 MB, the demo never types it, and **§5 and §6 cannot run without it.** §0 has the one-line copy

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 15 min | **Where we finished last week** *(demo §1)*. Run week 8, take a reading, then collect the promise the room has been hearing since week 3. Branch, `week-09/Haldane`, the suite carried forward, the date. 🎯 **Say "five tests" out loud and ask them to hold it.** |
| 0:15 | 28 min | 🎯 **The promise, collected** *(slides 2–4, demo §2)*. `LatestCelsius`: read the method out loud, replace it with one line, run the board, **run the suite**. Then the shape and the lambda, then `SignOuts` and `OutsideCount`. |
| 0:43 | 10 min | **☕ Break** |
| 0:53 | 30 min | **Six more of the same shape** *(slides 5–7, demo §3)*. `Any`, two `FirstOrDefault`s, `Lookup`, then `Program.cs` — `crew.Sum` (week 5's spoken promise) and `Find`. What an empty sequence does to you, and what stays a loop. |
| 1:23 | 8 min | **End of watch, in one line** *(demo §4)*. Week 5's muster becomes one line; the `ToList` is there because the variable is a list. |
| 1:31 | 10 min | **☕ Break** |
| 1:41 | 28 min | **A season of weather** *(slides 8–9, demo §5)*. The met book on screen, `SeasonReading` and `Season.Read` pasted — as a query, with no `ToList()` — then six questions in six lines over 50,000 rows. Every answer is right. |
| 2:09 | 26 min | 💥 **What it cost** *(slides 10–11, demo §6)*. The stopwatch says reading took `0 ms` and the book holds `0.0 MB`. A **hit-count breakpoint** stops on the last line of the book and then on the first: every question reads the file again. `ToList()`, and all three numbers flip. 🎯 **The promise made: querying a file is going to stop being good enough.** |
| 2:35 | 5 min | **Lab launch** *(slide 12, demo §7)*. Task 1 turns nothing green; the suite is how you know. |
| 2:40 | 50 min | **Lab: the night's numbers** *(slide 12 stays up)*. **In-class target: 5 green.** Circulate at Task 1 (`MaxBy` with no `?.`) and Task 4 (`List.Sort`). |
| 3:30 | 15 min | **Wrap-up** *(slide 13, demo §8)*. Two URLs, the checks-copy line — **four checks this week** — and a normal one-week due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, **§5 is the segment to shorten** — drop the five-coldest list and keep the four headline answers, which is all §6 needs. **Do not take it from §2** (the payoff), **from §6** (the break), or from the lab.

## Instructor notes

- 🎯 **§1's "five tests" is a setup, not filler.** Say the number, ask them to hold it, and then say it again after every collapse in §2 and §3. The whole evening's argument is that the number never moves.
- ⚠️ **Collect the promise, and do not recite the list.** The sheet says *"several times since week three"* on purpose. The weeks are 3, 4, 5, 6, 7 and 8 — that is for you, not for saying out loud, because naming all six turns a payoff into a roll-call. It is the most-repeated promise in the course and the room will remember at least two of them unprompted.
- ⚠️ ⚠️ **§2's `OutsideCount` edit is the one selection tonight that needs care.** It replaces a whole property, so the selection ends on **the second of the two `}` in a row**. Every other edit in §2 and §3 runs statement-to-statement.
- 💡 **§3 is deliberately repetitive and should be paced that way.** Explain the first `FirstOrDefault`; for the second, ask what goes there and wait. Three of the six need no commentary at all.
- ⚠️ **The `?.` and `??` in `LatestCelsius` are worth thirty seconds even when the clock is tight.** They are the single most common way the lab goes wrong tonight, and check 1's failure message says so — but a room that has seen it once reads that message much faster.
- 🎯 **§6's break needs the pause.** After the first run, read `0 ms` and `0.0 MB` out and **ask how reading a file can take no time** — before you touch the debugger. The room should be puzzled first.
- ⚠️ ⚠️ **§6 runs under the debugger, and the setup should not happen for the first time in front of the room.** Delete `.vscode`, set `"cwd": "${workspaceFolder}"` in the regenerated `launch.json`, then the gutter breakpoint in `Season.ReadLine` with **Hit Count `>= 50000`**. **Rehearse it once before class** — the `cwd` step in particular has not been run on the real Haldane program yet.
- 💡 **The hit count is the new tool tonight, so name it.** A plain breakpoint on that line would stop 50,000 times; the hit count is the answer to that, and the room has just watched why it is needed.
- ⚠️ **§6's explanation is a mechanism, not a principle.** *"`Read` handed back instructions, and every question ran them again from the top of the file."* Do not reach for a metaphor; the room is already holding a surprise.
- ⚠️ ⚠️ **§6 IS NOT A SPEED BEAT, and building it as one would falsify itself on screen.** Measured: 50,000 lines read in **8–24 ms**. The argument is **work and memory** — it read all 50,000 to answer a question about one, and a 0.9 MB file became 11.8 MB of program. Both of those are true on any machine.
- 💡 **The two millisecond figures move every run and the slide deliberately does not carry them.** Read yours off the screen. The memory figure was stable across every run and it is the one to land.
- 🎯 **§6's closing arithmetic is theirs, not yours.** *"And that is not even one whole season. Haldane has been open since 1994."* Then stop.
- ⚠️ **Say the P6 promise in as many words** — *"querying a file is going to stop being good enough"* — because week 12 collects it by name.
- **The demo commits four times, silently**, and the first is immediately after the carry-forward. Then the collapses (§3), the end-of-watch muster (§4), and the met book (§6) with the push.
- **The branch is spoken, briefly** — five seconds, nothing new this week.
- ⚠️ **Say the due date normally.** Last week was the term's only two-week homework; students who were told that twice will assume this one is too.
- 💡 **The lab's Task 3 is where a run instruction matters more than usual**: they must press `n` *before* airing the hour, or `never been out` reads `-` and the task looks broken. The doc says so in bold; say it again at the hand-off if you have ten seconds.

## What could go wrong

| If | Then |
|---|---|
| §1's reading does not move the headline temperature | **Correct, and it is the ordered `Add` working.** The headline is the last reading *in the book*, and the book is in time order — so a reading stamped earlier than the seeded `14:35` lands above it. Measured: `20:49` moves it to `-42.4`, `09:12` leaves it at `-41.5`. ⚠️ **The cue sheet says the mechanism rather than predicting the number**, and off-hours rehearsal is the only time you will see the insert work. |
| `dotnet new console -o week-09/Haldane` refuses | You rehearsed and left `week-09/` behind. Delete both project folders and the log file — but ⚠️ **not `season.txt`**, or §5 has nothing to open. §0 makes that distinction. |
| §5 says the met book isn't there | `season.txt` was never copied in, or `rm -rf week-09` took it. §0's copy line, again. |
| The met book's numbers differ from this sheet's | Somebody regenerated `season.txt`. The committed file is the source of truth; `demo-starter/tools/make-season.py` reproduces it. |
| §6's first run already shows about 9 ms and 11.8 MB | The `.ToList()` is already in `Season.Read`. §5 pastes it without on purpose — check you did not paste the fixed version. |
| <kbd>F5</kbd> stops at once with `FileNotFoundException` | Expected until `"cwd"` in `.vscode/launch.json` reads `"${workspaceFolder}"`. The debugger starts in the project folder, where `week-09/season.txt` does not exist. |
| The breakpoint stops on the first line of the book, not the last | The hit count is `50001` rather than `>= 50000`. Both prove the second read, but only `>= 50000` shows the last line first. |
| The breakpoint stops only once | `.ToList()` is already in `Season.Read`, so the file is read once. That is the fixed state, not a fault. |
| A collapse makes a test go red | **That is the segment working**, and it is worth saying so out loud rather than fixing it quietly. Read the failure, then fix it. |
| Somebody asks why `Everything()` doesn't collapse | Because the one-line version reads worse. Slide 7 says it, and it is the honest answer rather than a dodge. |
| Somebody asks about `First` vs `FirstOrDefault` performance | They are the same. The difference is what happens when there is nothing, and that is the only difference. |
| Somebody asks whether the search is case-sensitive | **It is, and it is exactly as case-sensitive as the loop it replaced** — nothing about tonight changed that. ⚠️ **Do not spend it here**; it is a database-week conversation and both the lab and the homework 🆘 point forward without spoiling it. |
| A student's `MaxBy` throws in the lab | `?.` and `??`. Check 1's message names it, and it is the most common failure of the night. |
| A student's rotation comes back in a different order | `List.Sort` in `TopPlayed`. Check 4 catches it and the message is written for exactly this. |
| Somebody asks whether LINQ is slower than a loop | Honestly: usually a little, and it has never mattered in anything this course does. **The thing that will matter is in §6**, and it is about the file rather than about the query. |
