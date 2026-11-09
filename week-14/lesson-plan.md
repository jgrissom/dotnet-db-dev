# Week 14 — Lesson Plan

**Topic:** Schema changes against live data. Adding a column to a table that already has rows: a nullable column when nobody knows the old rows' value, and a migration that says the value when everybody does. Reading a migration before running it, and taking one back. Then the room's own projects, and the runway to week 16.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor gives the switchboard two new columns, live. Students give the carts the same two. **Nothing is copied in this week:** a class or a migration from another project would change the student's next migration, so the instructor's files go to the starters repo to be read on GitHub. **Nothing is graded this week, and nothing is collected.**

## 🎯 The payoff moment — the demo's

**§3's four `no`s.** The class says every caller starts out welcome. The migration is run without being read, and the switchboard comes back with Dorothy, Bex, Teodoro and Ray all marked not welcome — four callers, the same four, every value wrong. Then the migration is opened and `defaultValue: false` is right there. The line to land:

> *"The = true in my class only reaches callers made from now on. The callers already in the table get whatever the migration says."*

## 🎯 The payoff moment — the lab's

**Task 2's red fact, with the same `0` students just read in their migration.** Students read `defaultValue: 0` in their own migration and *don't* run it. Their fact makes the migration and reads its plan: `Expected: 3` / `Actual: 0`. They change one character in a file EF Core wrote, the fact goes green, and only then does the database change. **Then they count their carts, and the number is the one they wrote down in Setup.**

⚠️ **The earlier one to protect is Task 1's crash.** `Invalid column name 'Added'` is what a class with no migration looks like, and it's the reason the next three commands exist. Let them hit it.

## Learning objectives

By the end of this session, students can:

1. Ask what the true value of a new column is for the rows already in a table, and choose a nullable column or a migration default from the answer.
2. Add a property, write a migration, read its `Up` method, and run it.
3. Say why a class's `= 3` doesn't reach the rows already in a table, and change a migration's `defaultValue` before running it.
4. Pin a migration's default with a test that reads `UpOperations`.
5. Take a migration back: `migrations remove` before it has run, `database update` with an earlier name after.
6. Recognize *may result in the loss of data* as a reason to stop and read.
7. Run their own project from a clean clone.

## Materials

- `slides.md` / `slides.html` — the deck, five slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-14/demo/script.html)) — type your database name in the **Database** box at the top of the published page once
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **Your secret set before class, by the starter's fixed id, off the projector** — §0 has the command
- ⚠️ **Your desk's database reset to the first night before class** — §0's four commands. It's the only drop of the night, and it's off the projector
- ⚠️ **The SQL Server view already connected to your server**, and a current `dotnet-ef`
- ⚠️ **`demo/week-14/` in the starters repo empty or missing** before class — it fills up during the night
- **Browser tabs on the lab README and the project work** (`week-14/lab/README.md` and `week-14/homework.md` on GitHub) — the projector screen for the lab and project blocks

## The night: on one station, then on the students' own projects

The first half is chunked like weeks 8 to 13: each demo segment is followed by the lab task that practices it. **The demo teaches the switchboard while the lab teaches the rotation.** The second half is the students' own projects, in two blocks, with the instructor circulating.

- **After §2 and §3 you push to `demo/week-14/` in the starters repo, for reading only.** `Caller.cs`, the migration, and in §3 the test. **Nobody copies them in.** The lab README says why and links the folder.
- **Every lab block ends at an "In class, stop here" note** in the README.
- **Lab D is the project work's Tasks 1 and 2, done in class**, because it changes a database that holds the student's real records. **Lab E is the week 16 runway**: a clean clone, three notes in the README, and anything still red from earlier weeks.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **Two new columns** *(slide 1, demo §1)*. Read the slide. |
| 0:03 | 11 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 14 in alongside the room. **1 / 3**, `database update` with nothing to do, the carts and the switchboard counted, the starter commit. |
| 0:14 | 16 min | **A column nobody knows** *(slide 2, demo §2)*. `FirstCalled`, a migration read and run, three dashes, then Ray with a date. **Push #1, to read.** |
| 0:30 | 18 min | **Lab B: Task 1** — `Added`, the crash, the migration, the dashes, the delivery. |
| 0:48 | 20 min | 💥 **A column everybody knows** *(demo §3)*. `Welcome`, run without reading: four `no`s. Taken back, the fact red, the migration fixed, green, run again. **Push #2, to read.** |
| 1:08 | 25 min | 🎯 **Lab C: Task 2** — `Stars`, read the `0`, the fact red, the fix, green, then run. |
| 1:33 | 10 min | **☕ Break** |
| 1:43 | 7 min | **The warning, and taking it back** *(slide 3, demo §4)*. `[MaxLength(40)]`, the loss-of-data line, `migrations remove`. |
| 1:50 | 45 min | 🎯 **Lab D: your own project** *(the project work)*. Count the rows, the two columns, read every migration, count again. |
| 2:35 | 10 min | **☕ Break** |
| 2:45 | 2 min | **The week 16 runway** *(slide 4, demo §5)*. Four tens; tonight is the first and the third. |
| 2:47 | 53 min | **Lab E: the runway** — push, a clean clone, three notes in the README, anything red from earlier weeks. |
| 3:40 | 5 min | **Wrap-up** *(slide 5, demo §6)*. Nothing graded, the branch line, week 16. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 53 of demo in six segments, 54 of lab in three blocks, 98 on their own projects in two blocks, and two breaks.** If the night runs long, take it from Lab E. **Do not take it from Lab D**: it's the one block that changes their real records.

## Instructor notes

- ⚠️ ⚠️ **YOUR PASSWORD NEVER GOES ON THE PROJECTOR.** §0 checks the secret before class, so nothing on the projector shows it. **Do not run `dotnet user-secrets list` on screen, and do not open `secrets.json`.**
- ⚠️ **No drop in class.** Students' lab databases already hold what this week's starter ships, if they did last week's Setup on that machine, so `update` says *No migrations were applied*. A student who missed it gets *There is already an object named 'Airings'*, and Setup step 6's box drops theirs, once.
- ⚠️ **Your demo database is reset once, before class, in §0.** Every table on the sheet assumes the first night's three callers and three carts. **The dates in FIRST CALLED are whatever day it is**; the sheet's are an example.
- ⚠️ **§3 runs a migration without reading it, on purpose.** Say that you're skipping the step people skip. Take it back with `database update ACallerHasAFirstCall`, not `remove`: it has already run.
- ⚠️ **§4's `migrations remove` rewrites `DeskContextModelSnapshot.cs`** with `(string)null` in each `ToTable`, so `git status` shows it changed. Same meaning. Don't stop to explain it unless someone asks; the notes and the 🆘 tables say so.
- 💥 **Task 1's crash is the point, not a slip.** `Invalid column name 'Added'` means the class has a column the table doesn't.
- **Lab B is where a `;` doesn't move down.** `CS1513` or `CS1002` in `Program.cs`.
- **Lab C is where someone runs `update` with the `0`.** The README's last box in Task 2 takes it back.
- **Lab D: ask every student to show you their migration's `Up` before they run it.** That one look is what the block is for.
- **There is no debugger tonight.** A plain run shows the dashes and the stars; nothing is hidden.

## What could go wrong

| If | Then |
|---|---|
| §0's `drop` says `Unable to retrieve project metadata` | The starters clone's week 14 has never been built. Run §0's `dotnet build` line first. |
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again. If it is rejected as behind, the pull in the same step fixes it — run the step again. Nobody's lab depends on it. |
| `update` in Lab A says `Applying migration` instead of `No migrations were applied` | §0's reset didn't run, or ran against a different database. Carry on: the tables are made, and the desk saves the first night when you quit. |
| A student's `update` says `There is already an object named 'Airings'` | They missed last week's Setup. Setup step 6's box: drop, update, once. |
| `migrations remove` says `The ConnectionString property has not been initialized` | `remove` checks the database. Their secret isn't set for this id: Setup step 6's box. |
| A student's own migration has `DropColumn` or `AlterColumn` in it | Stop them before `update`. `dotnet ef migrations remove --project Project`, then look at what changed in the class. |
| The clean clone won't build | A file was never committed. That's the most useful thing tonight can find. |
| The network drops | Lab A to Lab C need the server only for `update` and the desk. The checks and the tests need no network. |
