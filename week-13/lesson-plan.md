# Week 13 — Lesson Plan

**Topic:** Exceptions and defensive code. What a program does when something goes wrong: `try`, `catch` and `throw`, and the choice between four answers — ask again, say no, throw, or stop.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor teaches the switchboard each answer, live, and pushes each finished file to the starters repo. Students copy it in, then teach the rotation the same answers.

## 🎯 The payoff moment — the demo's

**§5's two desks.** One desk sits at its menu. A second desk pulls Slack Water and quits. The first desk presses `a`, every cart goes out on air, and the shift dies on a `DbUpdateException`. **Nothing typed was wrong.** The world changed under the program. After the `catch` around the whole shift, the same failure is two plain sentences. The line to land:

> *"The same kind of failure, and now the person gets two sentences and knows what to do."*

## 🎯 The payoff moment — the lab's

**Task 3's red fact, then the crash after green.** A cart that is minus 198 seconds long gets on the rotation with no complaint. The student's fact goes in red, `Import` throws, the fact goes green, and then **the desk crashes anyway.** That run is the week's idea in one screen: the throwing class and the catching class are different classes. The third `catch` goes in, and the desk says `Refused: "Dead Air" has no length.`

⚠️ **The earlier one to protect is Task 2's two crashes.** Students read the exception's name off their own stack dump, then write that name in a `catch`. Most of them have never read one of those on purpose.

## Learning objectives

By the end of this session, students can:

1. Name the four answers, and say which one a given failure gets and why.
2. Write a re-ask loop with a way out on Enter and on the end of the input.
3. Read an exception's type off a crash, and write a `try` with a `catch` for it.
4. Say why `catch` lives in the class that talks to the person, and `throw` in the class that does the thinking.
5. Throw `InvalidDataException` before any change is made, so a bad file adds nothing, and pin that with `Assert.Throws`.
6. Stop a program in a sentence, with `CanConnect` and a `catch (DbUpdateException)`.
7. Say why the desk doesn't save in `finally`.

## Materials

- `slides.md` / `slides.html` — the deck, five slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-13/demo/script.html)) — type your database name in the **Database** box at the top of the published page once
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **Your secret set before class, by the starter's fixed id, off the projector** — §0 has the command
- ⚠️ **A way to cut your network for two runs in §5** — the Wi-Fi switch, or the cable
- ⚠️ **The SQL Server view already connected to your server**, and a current `dotnet-ef`
- ⚠️ **`demo/week-13/` in the starters repo empty or missing** before class — it fills up during the night
- **A browser tab on the lab README** (`week-13/lab/README.md` on GitHub) — it is the projector screen for Lab A–F

## The chunked night, on one station

Each demo segment is followed by the lab task that practices it. **The demo teaches the switchboard while the lab teaches the rotation** — same technique, sibling objects, one database each.

- **After §2, §3 and §4 you push your finished files to `demo/week-13/` in the starters repo.** Each of Tasks 1–3 opens with the student pulling and copying them in. The files you push are only ones students never edit — `SwitchboardDesk.cs`, `Switchboard.cs` and `DayListTests.cs` — so a copy can never overwrite their work.
- ⚠️ **`Program.cs` is never pushed.** It's theirs in Task 4, so §5 has no push.
- **Push only what you just ran.** Each push comes right after the segment's last run.
- **Every lab block ends at an "In class, stop here" note** in the README. Lab F absorbs what is left; anyone finished starts the homework.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **Four answers** *(slide 1, demo §1)*. Read the slide. |
| 0:03 | 12 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 13 in alongside the room. **1 / 5**, a fresh database, the starter commit. Stop there. |
| 0:15 | 12 min | 💥 **The input lies** *(slide 2, demo §2)*. `x` says no and forgets the question. A loop asks again. **Push #1.** |
| 0:27 | 15 min | **Lab B: Task 1** — copy one file, the same loop on `p`. |
| 0:42 | 18 min | 💥 **The file is missing, or damaged** *(slide 3, demo §3)*. Two crashes, two names, one `try`, two `catch` blocks. **Push #2.** |
| 1:00 | 20 min | 🎯 **Lab C: Task 2** — copy one file, crash `i` twice, `try` and `catch`. |
| 1:20 | 10 min | **☕ Break** |
| 1:30 | 18 min | 💥 **The file lies** *(demo §4)*. A blank name gets in. The fact first, red. `throw`, green. **The desk crashes anyway.** The third `catch`. **Push #3.** |
| 1:48 | 22 min | 🎯 **Lab D: Task 3** — copy three files, `Dead Air` on the rotation, the fact red, the checking loop, green, the crash, the catch. |
| 2:10 | 18 min | 🎯 **The row is gone** *(slide 4, demo §5)*. Two desks. The `catch` around the shift. Wifi off, `CanConnect`. |
| 2:28 | 20 min | **Lab E: Task 4** — two desks, then the same lines in `Program.cs`. |
| 2:48 | 10 min | **☕ Break** |
| 2:58 | 40 min | **Lab F: finish, then start the homework.** Anyone not finished works on their next task; finished students start the homework, which is four tasks, and push their branch while you're there. |
| 3:38 | 7 min | **Wrap-up** *(slide 5, demo §6)*. Project repo URL, **the homework is the lab again**, it's the last one, the branch line, the checks-copy line, and the due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 76 of demo in six segments, 129 of lab in six blocks, and two breaks.** If the night runs long, take it from Lab F. **Do not take it from §5's two desks or Lab D.**

## Instructor notes

- ⚠️ ⚠️ **YOUR PASSWORD NEVER GOES ON THE PROJECTOR.** §0 checks the secret before class, so nothing on the projector shows it. **Do not run `dotnet user-secrets list` on screen, and do not open `secrets.json`.**
- ⚠️ **Lab A drops and remakes your database along with the room's.** Students' databases hold a migration id of their own from week 12, and this week's starter ships the key's, so `update` alone fails with *There is already an object named 'Airings'*. The demo's numbers all start from that fresh database.
- ⚠️ **The starter has no `LogTo` line.** The lab runs `dotnet ef`, and a stack dump is tonight's subject, so nothing else prints SQL. Students' own projects keep theirs, and it prints the failed save above their sentence.
- ⚠️ **§4's bad list leaves a row with a blank name in `Callers`.** The sheet deletes it with one query, because `x` can't reach a blank name: Enter means give up. Skip that and every later switchboard shows a blank row.
- ⚠️ **In §5, wifi goes off for two runs and back on for the third.** The two runs with it off wait about fifteen seconds each. It is a real wait, and the room should sit through the first one. It touches no server.
- 💥 **§4's crash after green is the point, not a slip.** Say that the test is right and the desk is right, and that they are testing different classes.
- **Lab C is where `catch` won't compile** — `CS0246` on `JsonException` is the missing `using System.Text.Json;`.
- **Lab D is where the throw goes in the wrong loop.** Check 4's message says the good carts got in.
- **There is no debugger tonight.** A printed exception says everything a debugger beat could.

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. |
| `dotnet ef` says `Unable to retrieve project metadata` | The project has never been built. Lab A's `dotnet test` builds it; run that first. |
| Lab A's `drop` says `The ConnectionString property has not been initialized` | The fixed id's secret store is empty on this machine. Run §0's `set`, off the projector, then the drop again. |
| `update` says `There is already an object named 'Airings'` | The `drop` was skipped. Run both, in order. |
| §5's first desk shows no crash after `a` | The second desk didn't finish, or pulled a different title. Check its `Pulled:` line. |
| The class network drops by itself | §5's wifi beat has just happened for real. Use it. Students who can't reach the server work on Tasks 1–3 with the checks, which need no network. |
| Students get `Your login failed.` | Their connection string, set in week 11. `dotnet user-secrets set` again, on their own screen. |
