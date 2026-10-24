# Week 12 — Lesson Plan

**Topic:** EF Core III — a second related table. A caller has many requests, `Include` brings them back, and a LINQ question that runs as SQL inside the database, with EF Core's log showing every command.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor gives each caller a table of requests, live, and pushes each finished file to the starters repo. Students copy it in, then give each cart a table of airings the same way.

## 🎯 The payoff moment — the demo's

**§4's break.** `AskedFor` is written, the log is on, and pressing `f` on Nightjar prints a `SELECT … WHERE EXISTS … ORDER BY` and then *Asked for by: Bex, Dorothy*. Then one word is typed — `.ToList()`, right after `db.Callers` — and the same key prints the same answer, while the log shows **every caller coming back, with no `WHERE` at all**. The line to land:

> *"Same answer. Look at the log. Everything before ToList went to the database. Everything after it ran in my program."*

⚠️ **Let the second log sit on screen before saying anything.** The room has just seen the first one. The difference is visible without help.

## 🎯 The payoff moment — the lab's

**Task 2's before-run.** Students air the hour, quit, and run the desk again: every cart says `PLAYED 1` and `LAST ON AIR -`. **The desk says it was played and can't say when.** Their airings are in their table — they saw the rows in Task 1 — and `Load` never asked for them. The fact goes in red, `Include` goes in, and the times come back.

⚠️ **The earlier one to protect is Task 1's migration.** It makes **two** tables, `Airings` and `Requests`, because the copied `Caller.cs` asked for the second. Students who read the migration before updating see that `migrations add` compares the whole model, not one file.

## Learning objectives

By the end of this session, students can:

1. Model "each one of my ___ has many ___" as a list on the parent class, a child class with its own `Id`, and a property holding the parent's `Id`.
2. Read a migration that adds a table with a foreign key, and say what `onDelete: Cascade` means for a removed parent.
3. Say why a migration that adds a table leaves the rows in the other tables alone.
4. Explain why the children don't come back without `Include`, and add it.
5. Write a LINQ question against a `DbSet` and say which part runs in the database and which part runs in the program.
6. Turn on EF Core's log with `LogTo` and read the SQL a query sends.

## Materials

- `slides.md` / `slides.html` — the deck, four slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-12/demo/script.html)) — type your database name in the **Database** box at the top of the published page once
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **Your demo database reset to the first night before class** — §0 has the three commands
- ⚠️ **The SQL Server view already connected to your server**, and a current `dotnet-ef`
- ⚠️ **`demo/week-12/` in the starters repo empty or missing** before class — it fills up during the night
- **A browser tab on the lab README** (`week-12/lab/README.md` on GitHub) — it is the projector screen for Lab A–F

## The chunked night, on one station

Each demo segment is followed by the lab task that practices it. **The demo gives the callers their requests while the lab gives the carts their airings** — same technique, sibling objects, one database each.

- **After §2, §3 and §4 you push your finished files to `demo/week-12/` in the starters repo.** Each task opens with the student pulling and copying them in. The files you push are only ones students never edit — `Caller.cs`, `Request.cs`, `Switchboard.cs` and `RequestTests.cs` — so a copy can never overwrite their work.
- ⚠️ **`DeskContext.cs` is never pushed.** Students edit it too: Task 1 adds two `DbSet` lines and Task 3 adds the log line.
- **Push only what you just ran.** Each push comes right after the segment's last run.
- **Every lab block ends at an "In class, stop here" note** in the README. Lab F absorbs what is left; anyone finished starts the homework.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **One caller, many requests** *(slide 1, demo §1)*. Read the slide. |
| 0:03 | 10 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 12 in alongside the room. **1 / 4**, the starter commit. Stop there. |
| 0:13 | 20 min | 💥 **A caller has many requests** *(slide 2, demo §2)*. Dorothy's request is gone after a restart. `Request.cs`, the list on `Caller`, one `DbSet`, a migration that adds one table, and the request's row with `CallerId 1` in it. **Push #1.** |
| 0:33 | 25 min | **Lab B: Task 1** — copy two files, `Airing.cs`, the list on `Song`, two `DbSet`s, a migration that makes two tables, a fresh database, and three airings in the table. **Circulate at the migration.** |
| 0:58 | 10 min | **☕ Break** |
| 1:08 | 18 min | 💥 **The requests don't come back** *(demo §3)*. ASKED FOR is empty, the row is in the table. **Ask why, and wait.** The fact first, red. `Include`, green. **Push #2.** |
| 1:26 | 22 min | 🎯 **Lab C: Task 2** — copy two files, `LAST ON AIR -` first, the fact red, `Include`, green, and the times come back. |
| 1:48 | 20 min | 🎯 **The database answers** *(slide 3, demo §4)*. The log on. `AskedFor` on `f`, and its SQL. `n` prints none. **The `.ToList()` break.** **Push #3.** |
| 2:08 | 25 min | **Lab D: Task 3** — copy one file, the log on, `Aired` on `n`, and its SQL read off the screen. |
| 2:33 | 10 min | **☕ Break** |
| 2:43 | 55 min | **Lab F: finish, then start the homework.** Anyone not finished works on their next task; finished students start the homework, which is three tasks, and push their branch while you're there. |
| 3:38 | 7 min | **Wrap-up** *(slide 4, demo §5)*. Project repo URL, **the homework is the lab again**, the branch line, the checks-copy line, and the due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 68 of demo in five segments, 137 of lab in five blocks, and two breaks.** If the night runs long, take it from Lab F. **Do not take it from §4's break or Lab C.**

## Instructor notes

- ⚠️ ⚠️ **YOUR PASSWORD NEVER GOES ON THE PROJECTOR.** The secret was set in week 11 by the starter's fixed id, and week 12's starter ships the same id, so nothing tonight sets it. **Do not run `dotnet user-secrets list` on screen, and do not open `secrets.json`.**
- ⚠️ **§2's migration ADDS a table to a database that already has callers in it**, and their rows survive. That is the homework's path: students never drop their project database. The lab drops its database for a different reason — everybody starts Task 1 from the same three carts.
- 💥 **§3's question is the first payoff of the night.** The request is in its table, and ASKED FOR says `-`. Ask why, and wait. The answer students should reach: `Load` reads the `Callers` table, and nothing tells it to read `Requests`.
- 💥 **§4's `.ToList()` is typed, one word, and taken out again before the push.** If it goes out in push #3 nobody's answer changes, so nothing would catch it except the log.
- ⚠️ **From §4 the log prints at the start of every run (the two `Load`s) and at every save.** That is honest and it is the point; the expected-output blocks show only the part each beat is about. ⚠️ **Nothing runs `dotnet ef` after the log goes on.** With the log on, `database update` prints every command it sends, twice over in places.
- **Lab B is where the migration goes wrong** — a student who skipped copying push #1 makes a migration with one table, and the desk crashes on a request with `Invalid object name 'Requests'`. The fix is a second migration.
- **Lab C is where `Include` won't compile** — `CS1061 … does not contain a definition for 'Include'` is the missing `using Microsoft.EntityFrameworkCore;`.

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. |
| `dotnet ef` says `Unable to retrieve project metadata` | The project has never been built. Lab A's `dotnet test` builds it; run that first. |
| §2's `database update` says `There is already an object named 'Callers'` | Your database still has last week's history under another migration id. §0's reset fixes it — drop, update, run once — then `update` again. |
| §2's first run shows ASKED FOR `Nightjar` after the restart | Your `Caller.cs` is a push file from rehearsal. Delete `week-12` and copy it in again. |
| §3's test is green before the fix | The same: a rehearsal push file. |
| A student's desk says `Invalid object name 'Requests'` or `'Airings'` | Their migration doesn't make that table. `migrations add` again with a new name, then `database update`. |
| Students get `Your login failed.` | Their connection string, set in week 11. `dotnet user-secrets set` again, on their own screen. |
