# Week 9 — Lesson Plan

**Topic:** LINQ over a list — one shape, a handful of words, what each word does when nothing matches, and why a question never changes the list it is asked of.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor works on the switchboard and the hour, live, and pushes each finished file to the starters repo. Students copy it in, then do the same thing to the rotation. The code a student is reading while they work is the code they just watched get written.

## 🎯 The payoff moment — the demo's

**§5, the board that moved.** `Busiest` is written first with the list's own `Sort`. The answer on the `[n]` screen is right. Then `c` shows the switchboard in a different order, and `switchboard.json` shows the file was rewritten too. The line to land:

> *"I asked the desk a question, and the switchboard changed."*

Then `OrderByDescending` replaces it, the same answer comes back, and the board and the file are in the order the callers rang.

⚠️ **Ask "where is Bex now?" and wait.** The room has to find the changed row before it is explained.

## 🎯 The payoff moment — the lab's

**Task 4, and the file is the evidence.** They write `ByTitle`, see `Long Way Round, Nightjar, Slack Water` on the `[n]` screen, press `t`, and the cart table is still Nightjar, Slack Water, Long Way Round. Then they open `rotation.json` and the three titles are in loaded order. **It lands right after §5, which has just shown the same thing going wrong on the switchboard.**

⚠️ **The earlier one to protect is Task 1's red.** A student changes `FirstOrDefault` to `First`, their own fact goes red, and the desk crashes on a title that isn't there. That is the empty-list lesson happening to them rather than being told to them.

## Learning objectives

By the end of this session, students can:

1. Read a lambda out loud: the list, the word, and the question asked of one item at a time.
2. Use `FirstOrDefault`, `Where`, `Select` and `OrderBy`, each ending in `ToList()` where it hands back several things.
3. Say what `First` does when nothing matches, and why `FirstOrDefault` is the word that matches a search loop.
4. Change a working loop into a query **and prove the behavior did not change**, with a fact written before the change.
5. Say why `OrderBy` leaves the list alone and what `List.Sort` would have done to the list and to the save file.
6. Say why the question inside a query only reads, and name a loop that should stay a loop.
7. Say what `Where` hands back before `ToList()` — a question that has not been asked yet.

> [!NOTE]
> **`Sum`, `Take` and `MaxBy` are demo-only**, on the switchboard and the hour, with *Done early* items for students who want a rep. `Any`, `Count`, `Average`, `OfType` and `MinBy` are in the notes. The four the students write are the four the homework grades.

## Materials

- `slides.md` / `slides.html` — the deck, five slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html))
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **`demo/week-09/` in the starters repo empty or missing** before class — it fills up during the night
- ⚠️ **Delete `week-09/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- **A browser tab on the lab README** (`week-09/lab/README.md` on GitHub) — it is the projector screen for Lab A–F

## The chunked night, on one station

Each demo segment is followed by the lab task that practices it. **The demo works on the switchboard and the hour while the lab works on the rotation** — same technique, sibling objects.

- **After §2, §3, §4, §5 and §6 you push your finished files to `demo/week-09/` in the starters repo.** Each lab task opens with the student pulling and copying them in. The files you push are only ones students never edit — `Switchboard.cs`, `Hour.cs`, `SwitchboardTests.cs`, `BusyCallerTests.cs` — so a copy can never overwrite their work.
- ⚠️ **Nothing in the lab waits on a push.** Their tasks are all in `Rotation.cs`. If a push stalls, they start the task and copy your file when it lands.
- **Push only what you just ran.** Each push comes right after the segment's last run or green test.
- **Every lab block ends at an "In class, stop here" note** in the README, with an early-finisher extra. Lab F has no stop; it absorbs what is left, and anyone finished starts the homework.
- **The `[n]` screen is the scoreboard for both halves.** Your four lines and the running order fill in as you push; their three fill in as they finish tasks.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **Questions the desk can't answer** *(demo §1)*. Two sentences: tonight every answer is one line, and you build the switchboard's while they build the rotation's. |
| 0:03 | 10 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 9 in alongside the room. **1 / 4**, the starter commit. Stop there. |
| 0:13 | 22 min | 💥 **A fact first, then one line** *(slide 2, demo §2)*. The `[n]` screen, all dashes. A fact about `Switchboard.Find`, green at once. Slide 2: the shape. `Find` becomes `FirstOrDefault`. Then `First`: the fact goes red and a new caller crashes the desk. `Load`'s loop becomes `AddRange`. **Push #1.** |
| 0:35 | 25 min | **Lab B: Task 1** — copy your files in, write the fact, then `Rotation.Find` and `Load`. The count stays at 1 / 4. |
| 1:00 | 16 min | **A number, and some of them** *(slide 3, demo §3)*. `Hour.TotalSeconds` becomes `Sum`. New `TotalCalls`. `CalledMoreThan` with `Where`. Slide 3: what each word hands back. **Push #2.** |
| 1:16 | 15 min | **Lab C: Task 2** — `LongerThan`. |
| 1:31 | 10 min | **☕ Break** |
| 1:41 | 12 min | 💥 **Read the hour without airing it** *(demo §4)*. `RunningOrder` hands back `Run()`, and looking twice uses up two of the bakery's airings. `Select` replaces it. **Push #3.** |
| 1:53 | 15 min | **Lab D: Task 3** — `Titles`. |
| 2:08 | 20 min | 💥 **In order, and the list left alone** *(demo §5)*. `Busiest` with `Sort`: the board and the file both change. `OrderByDescending` and `Take`. Then `TheRegular` with `MaxBy`, `?.` and `??`. **Push #4.** |
| 2:28 | 25 min | 🎯 **Lab E: Task 4** — the lab's payoff. `ByTitle`, then the cart table, then the file. **Circulate hard.** |
| 2:53 | 10 min | **☕ Break** |
| 3:03 | 10 min | 💥 **A question, and an answer** *(slide 4, demo §6)*. A fact with no `ToList()`, red with two callers. The debugger: the question runs when the answer is read. `ToList()`, green. Week 10, named. **Push #5.** Done, defined. |
| 3:13 | 22 min | **Lab F: finish the lab, or start the homework.** Finished students do the homework's Part 1 and Task 1 and push their branch, while you're there to answer setup questions. |
| 3:35 | 10 min | **Wrap-up** *(slide 5, demo §7)*. Project repo URL, **the homework is the lab again**, the branch line, the checks-copy line, and a normal one-week due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 93 of demo in seven segments, 112 of lab in six blocks.** If the night runs long, take it from Lab F. **Do not take it from §2's red** or **Lab E** (the payoff). If the demo runs fast, the time goes to Lab B and Lab E.

## Instructor notes

- 🎯 **§2's fact is green the first time, and that has to be said.** A room that has only seen facts go red first will read a green as a mistake. The line is in the sheet: the fact is there so `Find` can be changed safely.
- 🎯 **Say "four" in §2 and "five" after the fact, out loud.** The numbers are the evidence that nothing moved.
- 💥 **In §2, type the change to `First`; don't paste it.** It is one word, and the break is that word.
- ⚠️ **§2's crash needs a caller who is not on the board.** `Ray` works. `Dorothy` does not crash, because `First` finds her.
- 💡 **§3's check run is honest.** Check 1 builds a small hour and expects `TotalSeconds` to be 257, so a broken `Sum` would turn it red. The sheet says that and no more.
- 💥 **§4 pastes `return Run();` on purpose.** It is the quick, natural first try, and it is wrong in a way the room can see: the bakery's ad counts down each time the screen is drawn. Ask what changed, and wait.
- ⚠️ **§4's run has to press `n` twice before `q`.** One press shows `(2 left)` and proves nothing on its own.
- 💥 **§5's `Sort` is the demo's payoff.** Press `c` *before* `n` so the room has seen Bex in second place. Then `n`, then `c` again.
- ⚠️ **§5 deletes `switchboard.json` before the fixed run.** The wrong order was saved when you quit, and `Load` would bring it straight back. The sheet has the `rm`.
- ⚠️ **§6's debugger steps are unverified on any machine but a rehearsal.** Run them once before class. The note at the end of §6 has the fallback if the breakpoint does not stop inside the question.
- 🎯 **§6 is one fact and ten minutes.** Nothing in the lab or the homework can get this wrong, because every dictated method returns a `List`. It is here so that `ToList()` is not a word they copy, and because week 10 needs it.
- **The demo commits once, silently** — the starter, alongside the room in Lab A. The five pushes go to the starters repo, not the demo repo.
- ⚠️ **Say the due date plainly at the wrap.** Last week's homework had two weeks. This one has one.
- **Lab B is where the discipline happens to them** — watch for a rewritten `Find` and no fact. The question over a shoulder: *"how many tests did you have before you started?"*
- **Lab E is where the wrong answer looks right** — `Sort` in `ByTitle` gives a perfect `[n]` line. Ask what order the carts are in when they press `t`.

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. Their task doesn't need the file to start. |
| `demo/week-09/` already has files in it at the start of class | Left from rehearsing, or from last term. §0 resets it. If you forget, nothing breaks — students simply have your files before you've built them. |
| §2's suite says more than 4 before you start | A push file from a rehearsal is in your `week-09`. Delete the folder and copy the week in again. |
| §2's `First` run is green | The name in `Assert.Null` is on the board. It has to be a caller nobody has taken. |
| §4's second `n` shows `(2 left)` again | `RunningOrder` already has the `Select` in it — you copied a push file in while rehearsing. |
| §5's board does not change after `n` | `Busiest` already has `OrderByDescending`. Same cause. |
| §5's fixed run still shows the board in the wrong order | `switchboard.json` was not deleted, so the saved wrong order was loaded. |
| §6's breakpoint stops once and the test ends | The debugger bound the red dot to the statement only. The fallback is in the note at the end of §6. |
| A student's `Find` rewrite crashes the desk on `f` | `First`. Their own fact is red too, and check 1 names it. |
| A student's rotation has six carts | `Load` lost its `Clear()` when the loop became `AddRange`. |
| A student's carts are in the wrong order after they fixed `ByTitle` | The wrong order is saved in `week-09/rotation.json`. Delete the file. |
| A student's top `[n]` lines don't match the README | They are the instructor's lines, and they depend on which push files are copied in and on any requests taken. Only the student's three have to match. |
| Somebody asks why not `First` | Because finding nothing is a normal answer for `Find`. `First` is right when a missing item means something is broken and you want to hear about it at once. |
| Somebody asks whether LINQ is slower than a loop | Usually a little, and it has never mattered in anything this course does. |
| Somebody asks whether the search should ignore capitals | It is as exact as the loop it replaced. **Don't spend it here** — it is a database-week conversation, and the lab and homework both say so. |
