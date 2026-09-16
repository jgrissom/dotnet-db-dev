# Week 10 — Lesson Plan

**Topic:** EF Core I — a class becomes a table, user secrets, migrations, and the log moving onto a server that isn't yours.
**Session length:** 3h 45m

> Everything the station knows has lived on one laptop since week 3. Students finish the memory→file→database arc tonight, meet the answer week 2 owed them about where a password lives, and watch the console and the database give different answers to the same question.

## 🎯 The payoff moment — the demo's

**§5, and it is the same beat as week 8 with the ground moved.** A sign-out typed at the desk, `q`, a fresh process — and Nakamura is still on the board. Then:

> *"There he is. Week eight, that came out of a file. Look in `week-10` — there is no file."*

Then the mssql extension, `Select Top 1000`, and the same row with the program closed:

> *"I am not reading that out of my program. This is a query, against the server, and my program is shut. A file is still your file — it is on your laptop, in your folder, and nobody else can see it. This is on a machine none of us owns."*

⚠️ **The database has to be EMPTY when §5 starts** or the beat lands on a board that already looks right. §0 drops it; §4 makes it again.

## 🎯 The payoff moment — the lab's

**Task 5, and it is the first time a student's own program reads out of a database.** Two shifts: air the hour, sign off, start a completely new shift, press `t` — and every cart says `1` play, carried over from a shift that has already ended.

⚠️ **The moment to make them look at is the folder, not the screen:** there is no `rotation.json` in `week-10/`, and there never will be again.

⚠️ **The commonest wrong reflex to catch while circulating** is at **Task 4** — a `Save` with no `SaveChanges()`. The desk behaves perfectly, the table stays empty, and nothing anywhere complains.

## Learning objectives

By the end of this session, students can:

1. Shape an ordinary class for a table: an `Id` the database fills in, and `[NotMapped]` on the properties the class works out rather than keeps.
2. Write a `DbContext` — a `DbSet` per table, and `OnConfiguring` to say where the database is.
3. Explain why a console app has to build its own configuration, and wire `ConfigurationBuilder` + `AddUserSecrets` by hand.
4. Use `dotnet user-secrets init` / `set` / `list`, say where the file actually lives, and restore it in one command after a machine is wiped.
5. State what user secrets are **not** — not encrypted, not shared, not deployment — and what the one problem is that they solve.
6. Tell `dotnet ef migrations add` from `dotnet ef database update`, and say which one touches the server.
7. Read a generated `Up()` method and match it back to their own class.
8. Write `Save` and `Load` against a context, including what `Id == 0` means and why `SaveChanges()` is not optional.
9. Test code that uses a database **without a database**, and say why that is possible.
10. Say why a search that fails in C# can succeed in SQL.

> [!NOTE]
> **Objectives 4 and 6 are the two that bite**, and both are measurable. If the night runs short, protect §3's silent-failure warning and §4's *only one of these touches the server* — those two are most of the support load for the next three weeks.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html))
- **The instructor demo repo**, where week 9 left it — `week-01/` … `week-09/` in it, clean, `main` up to date
- ⚠️ ⚠️ **`~/haldane-connection.txt`**, holding your real connection string. §3 reads it from there so your password never reaches the projector
- ⚠️ ⚠️ **An empty demo database.** Drop it if you have rehearsed — §4 remakes it and §5's payoff needs it empty
- ⚠️ **`week-10/season.txt` in place** — 51,309 lines to day 275; the banner reads the day off it
- ⚠️ **The mssql extension already knowing your server** — §4 uses it live
- **A current `dotnet-ef`** — `dotnet tool update --global dotnet-ef`

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 15 min | **Where we finished last week** *(demo §1)*. Run week 9, open `watch-log.txt`, name the weeks the promise was made in. Branch, `week-10/Haldane`, the suite, one path edit. 🎯 **Day 275 arrives on its own — last week bought that and this is the first time it pays.** |
| 0:15 | 30 min | **A table is the line you already had** *(slides 2–4, demo §2)*. Four packages. `LogRow` read against a line of the file. `StationContext`, and what a `DbSet` is. ⚠️ **Do not explain the second constructor — it is §5's beat.** |
| 0:45 | 10 min | **☕ Break** |
| 0:55 | 25 min | **Where a password is allowed to live** *(slides 5–6, demo §3)*. Week 2 collected by name. `init`, and the id in the csproj. 🎯 **The connection string is read out of a file so the room never sees it — and saying why IS the lesson.** Then the honest half: what secrets are not. |
| 1:20 | 25 min | **The migration** *(slides 7–8, demo §4)*. `migrations add`, read `Up()` against `LogRow`. ⚠️ **Ask whether anything has happened to the server yet, and wait.** Then `database update`, and the empty table in the mssql extension. |
| 1:45 | 10 min | **☕ Break** |
| 1:55 | 25 min | 💥 **The log leaves the building** *(slides 9–10, demo §5)*. Two methods on `Watch`. The suite stops compiling — **two errors, one test** — and the fix is a table that lives in the test. Then sign somebody out, restart, and read the row from the server. 🎯 **Week 3's promise, paid a second time.** |
| 2:20 | 15 min | 💥 **The same question, two answers** *(slide 11, demo §6)*. `reyes` at the desk is refused; `WHERE Who = 'reyes'` hands the row over. Mechanism in two sentences, then week 12. |
| 2:35 | 5 min | **Lab launch** *(slide 12, demo §7)*. Make the database EARLY; my checks never touch the server. |
| 2:40 | 50 min | **Lab: the carts leave the building**. **In-class target: 5 green.** Circulate at Setup 5d, Task 2's `DbSet`, and Task 4's `SaveChanges()`. |
| 3:30 | 15 min | **Wrap-up** *(slide 13, demo §8)*. Project repo URL, the checks-copy line — **four checks this week** — ⚠️ **and say that the run-it points are build-it points now, and why.** |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, **§2 is the segment to shorten** — the four packages can be one line of narration instead of four. **Do not take it from §3** (the silent failure is next week's support load), **from §5** (the payoff), or from the lab.

## Instructor notes

- ⚠️ ⚠️ **§3 PUTS YOUR PASSWORD ON A PROJECTOR IF YOU LET IT.** The sheet reads the connection string out of `~/haldane-connection.txt` with `$(cat …)` so it is never displayed. **Do not `cat` the secrets file, and do not run `dotnet user-secrets list` on screen** — both print it. `ls ~/.microsoft/usersecrets/` shows the folder and proves the point without showing anything.
- 🎯 **That evasion is the lesson, so say it out loud rather than doing it quietly** — *"everything I just did to keep it off this projector is the same reason it does not go in the repo. A repo is a room with more people in it."*
- ⚠️ ⚠️ **The silent failure is the single most valuable thirty seconds in the week.** `AddUserSecrets` on a project with no `UserSecretsId` **does not throw** — it reads back empty, and the symptom arrives much later as `The ConnectionString property has not been initialized.` **Measured, not assumed.** Say it flatly at §3 and it saves a dozen messages over the next three weeks.
- 🎯 **§4's question is the one to actually wait for**: *"has anything happened to the server yet?"* The answer — no, `migrations add` connects to nothing — is what makes the two commands separable in their heads. **It is also the commonest thing they get wrong at home**, in exactly one direction: they write the migration and never run it.
- 💡 **§1's day 275 is worth fifteen seconds and no more.** Last week took the day out of the source code; this week nobody typed one and it moved anyway. **Point, say it, move on.**
- ⚠️ **§2: do not explain the `DbContextOptions` constructor when you paste it.** Say *"you will see who, in about forty minutes"* and leave it. It lands ten times harder in §5 when the test suite needs it, and that is the whole shape of the segment.
- 💥 **§5's compile error is the beat, so run the tests and then stop talking.** Two `CS1503`s, both in one test. **Let somebody say "the database" before you answer** — the answer is that a test needing the college's server is a test that fails when the network does.
- ⚠️ **§6 is not a trick and it must not be staged as one.** Type `reyes` without comment, let the refusal sit, then ask the database. The room finds it, not you. ⚠️ **Two sentences of mechanism and stop** — LINQ translating to SQL is week 12 and this beat is only the symptom.
- 💡 **If anybody asks why the `Id` column doesn't start at 1** — `Save` empties the table and writes the whole book back every time the desk closes, exactly as the file did, and the database numbers every row it has ever been handed. **Week 11 stops doing that**, so it is a good place to leave it.
- **The demo commits four times, silently** — the carry-forward, the migration, the move, and the case beat with the push.
- **The branch is spoken, briefly** — five seconds, nothing new this week.
- ⚠️ ⚠️ **Say the grading change at the wrap, because they will meet it in the rubric anyway.** From this week the run-it points are build-it points: their program cannot run on the grading machine, because it needs their connection string. **Frame it as a fact about databases, not as a concession** — and say that both suites still run their code.
- ⚠️ **Say the due date normally.** Next class.

## What could go wrong

| If | Then |
|---|---|
| `dotnet ef` isn't found | The tool isn't installed on this machine. `dotnet tool install --global dotnet-ef`. |
| Every `dotnet ef` command prints a version warning | The tool is older than the packages. `dotnet tool update --global dotnet-ef` — do it in §0, not on screen. |
| `database update` fails with a login error | Your connection string. `cat ~/haldane-connection.txt` **on your own screen, not the projector**, and check the four fields. |
| `database update` fails on the certificate | `TrustServerCertificate=True` is missing from the end of the string. |
| §5's board already shows Nakamura before you sign him out | You rehearsed and did not drop the database. §0 says to; §4 remakes it in about two seconds. |
| The `Id` column starts at 25 rather than 1 | **Correct, and it is rehearsal showing.** Every close rewrites the whole book, so the identity keeps climbing. There is a 💡 line for it if anybody asks. |
| The suite compiles after §5's edits | You pasted the fixed test before running the broken one. The two `CS1503`s are the beat — **run the tests first**. |
| `reyes` is NOT refused at the desk | Somebody marked her back in an earlier run, or you typed `Reyes`. The board still has to show her outside for §6 to work. |
| The SQL query returns nothing for `reyes` | The database's collation is case-**sensitive**, which is not the usual default. **Check with `SELECT SERVERPROPERTY('Collation')`** — if it does not contain `_CI_`, the beat does not work on this server and should be dropped rather than fudged. |
| A student's checks pass but their desk can't connect | **Exactly right, and worth saying to the room.** The checks never touch the server. Only running the desk tests the connection string. |
| Several students fail at Setup 5d at once | That is why it is at minute 3 of the lab rather than minute 30. Work the connection string field by field; it is nearly always the server name or a dismissed certificate prompt. |
| A student's `dotnet ef` says *Unable to create a 'DbContext'* | They deleted the empty constructor when they added the options one. Both are required. |
| Somebody asks whether user secrets are encrypted | **No, and say so plainly.** It is a plain file in the home directory. The one problem it solves is that it is not in the repo. |
| Somebody asks how this works on a real deployed server | Environment variables, or a secret manager the host provides. **Name it and move on** — nothing in this course deploys. |
| Somebody asks why not just use a local database | Because the point of tonight is the machine that isn't yours, and next week the whole room is on one table. |
