# Week 10 — Lesson Plan

**Topic:** EF Core I — a password outside the repo, a class becomes a table, the migration that makes it, and save and load against a database.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor moves the switchboard into the database, live, and pushes each finished file to the starters repo. Students copy it in, then move the rotation the same way. Both live in one `DeskContext`, so the student's context is the instructor's with one more table.

## 🎯 The payoff moment — the demo's

**§5, the second night.** The callers come back out of the database with no file anywhere, Dorothy rings again, and the desk crashes on the way out: `Cannot insert explicit value for identity column in table 'Callers'`. The line to land:

> *"The first time, every caller was new, with Id zero. This time every caller came out of the table, carrying the number of its row."*

Then the fact goes in **before** the fix, red with the in-memory table's own wording, and `Update` turns it green. The table in the SQL Server view shows one Dorothy with four calls.

⚠️ **Ask "what's different about this shift?" and wait.** The room has seen the first save work. The difference is the `Id`, and somebody should say it before you do.

## 🎯 The payoff moment — the lab's

**Task 4, and the evidence is in two places at once.** They air the hour, quit, and look in `week-10/`: **no `.json` file at all**. Then `dbo.Carts` in the SQL Server view, with their three carts, one play each, and an `Id` the database filled in. They're reading their own data from a server, with the desk shut.

⚠️ **The earlier one to protect is Task 1d.** Connecting to the server in the SQL Server view is where a login or network problem shows up. It is at minute 10 of the first lab block on purpose, while you can still walk over.

## Learning objectives

By the end of this session, students can:

1. Keep a connection string in user secrets, say where the file lives, and say what user secrets are **not**.
2. Tell the two causes of `The ConnectionString property has not been initialized.` apart with `dotnet user-secrets list`.
3. Shape a class for a table: an `Id`, a `private set` on anything the constructor needs, and `[NotMapped]` on a property that holds another class.
4. Write a `DbContext` with a `DbSet` per table and two constructors, and say who uses each one.
5. Tell `dotnet ef migrations add` from `dotnet ef database update`, and say which one touches the server.
6. Write `Save` (`Add` / `Update` by `Id`, then `SaveChanges`) and `Load` (`OrderBy`, `ToList`, the empty-table return, `Clear`, `AddRange`) against a context.
7. Test database code with a table that lives inside the test run, and say why a test should not need the server.
8. Say why the same name can be one row to the database and two to C#.

> [!NOTE]
> **The packages include one students didn't ask for.** `Microsoft.EntityFrameworkCore.SqlServer` 10.0.13 asks for a `System.Security.Cryptography.Pkcs` with two security advisories published 2026-10-13. Adding the fixed version **first** means the vulnerable one is never used — measured: no warnings at either `dotnet add`, and the project resolves to 10.0.13. **Re-check each term**: NuGet checks the package graph against a live advisory list on every restore, so a new advisory can bring warnings back.

## Materials

- `slides.md` / `slides.html` — the deck, five slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html)) — type your database name in the **Database** box at the top of the published page once
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **Your real connection string ready to paste** — you set it at the start of Lab B, on your own screen, while the projector shows the lab README
- ⚠️ **No `DB_KDXR_156101411_JSG` on the server.** §3 makes it in front of the room; drop it if you've rehearsed
- ⚠️ **The SQL Server view already connected to your server**, and a current `dotnet-ef`
- ⚠️ **`demo/week-10/` in the starters repo empty or missing** before class — it fills up during the night
- **A browser tab on the lab README** (`week-10/lab/README.md` on GitHub) — it is the projector screen for Lab A–F

## The chunked night, on one station

Each demo segment is followed by the lab task that practices it. **The demo moves the switchboard while the lab moves the rotation** — same technique, sibling objects, one database.

- **After §3, §4 and §5 you push your finished files to `demo/week-10/` in the starters repo.** Each lab task from Task 2 opens with the student pulling and copying them in. The files you push are only ones students never edit — `Caller.cs`, `Switchboard.cs`, `SwitchboardTests.cs`, `SecondSaveTests.cs` — so a copy can never overwrite their work.
- ⚠️ **Your `DeskContext` is not pushed.** Students write their own in Task 2, with two tables. Yours has one, so it is their worked example and not their answer.
- ⚠️ **Copying `Switchboard.cs` in at Task 4 breaks their build in two places**, and they are the two `Program.cs` lines you fixed in §4. The README says so and gives the three edits. **That is the moment to say "the error is the instruction".**
- **Push only what you just ran.** Each push comes right after the segment's last run or green test.
- **Every lab block ends at an "In class, stop here" note** in the README. Lab F absorbs what is left; anyone finished starts the homework, whose Task 1 needs their login.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **Where the night is kept** *(slide 1, demo §1)*. Read the slide. Two files, on this laptop, become a database on a server none of us owns. |
| 0:03 | 10 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 10 in alongside the room. **1 / 5**, the starter commit. Stop there. |
| 0:13 | 18 min | **The packages, and somewhere for a password** *(slide 2, demo §2)*. Five packages, the fixed cryptography one first, so the vulnerable version is never used. `user-secrets list`, `init`, `list` run live; `set` shown, not run — **your password never goes on screen, and saying why is the lesson.** |
| 0:31 | 15 min | **Lab B: Task 1** — the tool, five packages, their own secret store, and a connection to the server in the SQL Server view. **Set your own secret first, while the projector shows the README.** Then **circulate at 1d.** |
| 0:46 | 25 min | 💥 **A class becomes a table** *(slide 3, demo §3)*. `DeskContext` with `Callers`. `migrations add` refuses three times: `Cannot bind 'name'`, a missing key, and `Song` — through `Favorite`. Each message names its fix. Read `Up()`. *"Has anything happened on the server yet?"* Slide 3. `database update`, and the empty table. **Push #1.** |
| 1:11 | 25 min | **Lab C: Tasks 2 and 3** — copy `Caller.cs`, `Song.Id`, their own `DeskContext` with two tables, then the migration, `database update`, and their tables in the SQL Server view. |
| 1:36 | 10 min | **☕ Break** |
| 1:46 | 22 min | 🎯 **The switchboard moves in** *(slide 4, demo §4)*. `Save` with `Add` and `SaveChanges`, `Load` with the empty-table return. Two errors in `Program.cs`, two in the suite. *"Should this test use the college's server?"* The in-memory table, and slide 4. Run once: no `switchboard.json`, and the rows in the SQL Server view with the desk shut. **Push #2.** |
| 2:08 | 25 min | 🎯 **Lab D: Task 4** — the lab's payoff. Their `Save` and `Load`, their two facts off the file, then two runs: no `.json`, three rows, and a crash on the way out of the second. **Circulate hard.** |
| 2:33 | 10 min | **☕ Break** |
| 2:43 | 12 min | 💥 **The second night** *(demo §5)*. The callers come back, Dorothy rings, and the desk crashes on `'Callers'`. The fact first, red. `Update`, green. One Dorothy with four calls. **Push #3.** |
| 2:55 | 15 min | **Lab E: Task 5** — copy your two files in, see their own crash on `'Carts'`, the fact, red, then `Update`. |
| 3:10 | 6 min | 💥 **The same name, twice** *(demo §6)*. `dorothy` at the desk makes a second caller; `WHERE Name = 'dorothy'` hands back both rows. |
| 3:16 | 22 min | **Lab F: finish, then start the homework.** Finished students do the homework's Part 1 and Task 1, which needs their login, and push their branch while you're there. |
| 3:38 | 7 min | **Wrap-up** *(slide 5, demo §7)*. Project repo URL, **the homework is the lab again**, the branch line, the checks-copy line, the build-not-run grading change, removed records coming back, and the due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 93 of demo in seven segments, 112 of lab in six blocks.** If the night runs long, take it from Lab F. **Do not take it from §3's three refusals, §5's crash, or Lab D** (the payoff). If the demo runs fast, the time goes to Lab C and Lab D.

## Instructor notes

- ⚠️ ⚠️ **YOUR PASSWORD NEVER GOES ON THE PROJECTOR.** §2 runs `list`, `init` and `list` live — none of them shows a password — and shows `set` with the lab's `YOUR-…` placeholders without running it. **You run your real `set` at the start of Lab B**, while the projector shows the README (frozen or blanked if your laptop mirrors it), **in a new terminal tab that you close straight after** — otherwise the command sits in the scrollback above §3, on the projector. **Do not run `dotnet user-secrets list` on screen after that, and do not open `secrets.json`** — both print it.
- 🎯 **That care is the lesson, so say it out loud rather than doing it quietly.** The line is in the sheet.
- 💡 **§2's first package is there because of a security advisory.** The SQL Server package asks for a vulnerable `System.Security.Cryptography.Pkcs`; adding the fixed version first means the old one is never used. One sentence, and move on.
- 💥 **§3's three refusals are the segment.** Run `migrations add` after every change, and read only the line that matters each time. **The third one, `Song`, is a question to the room**: the context never mentions songs.
- ⚠️ **§3: don't explain the second `DeskContext` constructor when you paste it.** Say you'll need it later. It lands in §4, when the test needs it.
- 🎯 **§3's question is the one to actually wait for**: *"has anything happened on the server yet?"* No — and the commonest homework mistake is writing the migration and never running `database update`.
- 🎯 **§4's question is the second to wait for**: *"should this test use the college's server?"* Let somebody say the network, or the password.
- 💥 **§5's crash is the demo's payoff. Let it sit.** Ask what's different about this shift. The answer is the `Id`.
- ⚠️ **§5 depends on §4's run.** The table must hold the three callers from §4's run before §5 starts — and no other rows. If you rehearsed, drop the database in §0 and §3 remakes it.
- 💡 **§6 is six minutes and two screens.** Say the C# rule and the database rule, and stop. It is a symptom, not a lesson on collations.
- **The demo commits five times, silently** — the starter, alongside the room in Lab A, and then once at the end of §2, §3, §4 and §5. The pushes go to the starters repo; the commits stay in the demo repo.
- ⚠️ **Say the grading change at the wrap.** From this week the run-it points are build-it points: their program needs their connection string, which is correctly not in their repo. **Frame it as a fact about databases**, and say both suites still run their code.
- ⚠️ **And say what a removed record does.** `Save` adds and updates; it doesn't delete. A record removed at runtime comes back. The homework says so in a note, and nothing grades it.
- **Lab C is where the context gets written** — watch for `Callers` spelled differently, which breaks your `Switchboard.cs` at Task 4, and for a migration made before `Carts` was added. Check 3's message names that one.
- **Lab D is where nothing complains** — a `Save` with no `SaveChanges()` still seems to work on the desk, because your switchboard's `SaveChanges()` runs first and sends their carts too. Check 4 catches it.

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. |
| A `dotnet add` in §2 shows `warning NU190…` anyway | A new advisory has landed since this week was built, on some other package. Read out the package it names; it is not something tonight broke. |
| Every `dotnet ef` command prints a version warning | `dotnet tool update --global dotnet-ef` — in §0, not on screen. |
| §3's first `migrations add` says `Done.` | Your `Caller.cs` is already shaped — a push file from rehearsal. Delete `week-10` and copy it in again. |
| `database update` fails with a login error | Your connection string. Run the Lab B `set` again with the corrected string, **on your own screen**, not the projector. |
| `database update` fails on the certificate | `TrustServerCertificate=True` is missing from the end of the string. |
| `database update` says `There is already an object named 'Callers'` | You rehearsed and didn't drop the database. Drop it (§0), then run `database update` again. |
| §4's first run shows the callers with more calls than 3 / 1 / 1 | The table wasn't empty when §4 started. Drop the database and run `database update` again before class. |
| §5's run doesn't crash | `Switchboard.Save` already has the `Update` branch — a push file from rehearsal. |
| §6's query hands back one row | The database's collation is case-sensitive. **Check with `SELECT SERVERPROPERTY('Collation')`** — if it has no `_CI_` in it, drop the beat rather than fudge it. |
| A student's checks pass and their desk can't connect | **Exactly right, and worth saying to the room.** The checks never touch the server. |
| Several students fail Task 1d at once | That is why it is in the first lab block. Work the connection field by field; it is nearly always the server name or a dismissed certificate prompt. |
| A student's `dotnet ef` says *Unable to create a 'DbContext'* with no reason | They deleted the constructor that takes nothing. Both constructors are required. |
| Somebody asks whether user secrets are encrypted | **No, and say so plainly.** It is a plain file in the home folder. The one problem it solves is that it's not in the repo. |
| Somebody asks how a deployed program gets its password | From the server's own settings. **Name it and move on** — nothing in this course deploys. |
| Somebody asks why not a local database | Because tonight is about a machine that isn't yours. |
