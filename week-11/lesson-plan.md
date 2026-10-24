# Week 11 — Lesson Plan

**Topic:** EF Core II — taking a row out. A fresh database for the week, `Remove`, a `Save` that makes the table match the list, and saving as things happen.
**Session length:** 3h 45m

> **The demo and the lab are both KDXR.** The instructor takes a caller off the switchboard, live, and pushes each finished file to the starters repo. Students copy it in, then pull a cart off the rotation the same way.

## 🎯 The payoff moment — the demo's

**§3's question.** Teodoro comes off the switchboard, the desk saves, and the next night he's back. The line to land, once somebody has answered:

> *"His row never left the table. Save adds the new callers and updates the rest. Teodoro wasn't in the list any more, so Save never mentioned him."*

⚠️ **Ask "why is he back?" and wait.** The room has seen `Save` work all last week; the answer is that `Save` only walks the list, and somebody should say it before you do. §4 then collects it: the fact goes in red, the loop goes in, and Teodoro stays off while Dorothy and Bex keep `Id` 1 and 2.

## 🎯 The payoff moment — the lab's

**Task 2's second run.** Students pull Long Way Round, see `2 carts loaded`, quit, and run the desk again: **three carts.** It's their own code doing exactly what they wrote, and the cart is back anyway. Task 3 then makes it stay gone, test first.

⚠️ **The earlier one to protect is Task 1b.** Copying the connection string across is where a student who missed last week, or whose lab PC rebooted, finds out. It is at minute 5 of the first lab block on purpose.

## Learning objectives

By the end of this session, students can:

1. Say why a database that remembers one migration history won't take another, and start a lab database fresh with `dotnet ef database drop` and `database update`.
2. Say what a `UserSecretsId` is, and why the same one every week means setting a connection string once.
3. Write `Remove` on top of `Find`, handing back `true` or `false`.
4. Explain why a removed record comes back when `Save` only walks the list.
5. Give `Save` its third job: take out every row whose `Id` no record in the list has, before `SaveChanges`.
6. Test a removal with a table that lives inside the test run, with a record that must stay as well as one that must go.
7. Say what a program loses when it only saves at the end, and save when something changes instead.

## Materials

- `slides.md` / `slides.html` — the deck, four slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-11/demo/script.html)) — type your database name in the **Database** box at the top of the published page once
- **The instructor demo repo**, `dotnet-db-coursework`, with **a starters clone you can push to next to it** — §0 tests a push
- ⚠️ **This week's secret set before class**, by id, off the projector — §0 has the command
- ⚠️ **The SQL Server view already connected to your server**, and a current `dotnet-ef`
- ⚠️ **`demo/week-11/` in the starters repo empty or missing** before class — it fills up during the night
- **A browser tab on the lab README** (`week-11/lab/README.md` on GitHub) — it is the projector screen for Lab A–F

## The chunked night, on one station

Each demo segment is followed by the lab task that practices it. **The demo takes a caller off the switchboard while the lab pulls a cart off the rotation** — same technique, sibling objects, one database each.

- **After §3 and §4 you push your finished files to `demo/week-11/` in the starters repo.** Tasks 2 and 3 open with the student pulling and copying them in. The files you push are only ones students never edit — `Switchboard.cs` and `RemovedCallerTests.cs` — so a copy can never overwrite their work.
- **Push only what you just ran.** Each push comes right after the segment's last run.
- **§5 changes `Program.cs` and pushes nothing.** Students' `Program.cs` is theirs; the same two lines for the rotation are the first item of the lab's *Done early*.
- **Every lab block ends at an "In class, stop here" note** in the README. Lab F absorbs what is left; anyone finished starts the homework.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **What comes off** *(slide 1, demo §1)*. Read the slide. The desk can put rows in and change them, and it can't take one out. |
| 0:03 | 10 min | **Lab A: setup, together** *(the lab README in the browser)*. You copy week 11 in alongside the room. **1 / 3**, the starter commit. Stop there. |
| 0:13 | 12 min | **A fresh database for the week** *(demo §2)*. The `UserSecretsId` that ships in the starter. `database drop --force`, the empty view, `database update`, and the first night's three callers and three carts. |
| 0:25 | 15 min | **Lab B: Task 1** — the tool, the connection string copied across, the drop and the update, the desk once. **Circulate at 1b.** |
| 0:40 | 15 min | 💥 **A caller comes off, and comes back** *(demo §3)*. `x` does nothing, `Remove` written, Teodoro off, and the next night he's back. **Ask why, and wait.** **Push #1.** |
| 0:55 | 22 min | 🎯 **Lab C: Task 2** — copy `Switchboard.cs`, write `Remove`, pull Long Way Round, and watch it come back. |
| 1:17 | 10 min | **☕ Break** |
| 1:27 | 22 min | **Out of the table too** *(slide 2, demo §4)*. The fact first, red. `Save`'s second loop, green. Teodoro stays off; Dorothy and Bex keep `Id` 1 and 2. **Push #2.** |
| 1:49 | 25 min | **Lab D: Task 3** — copy two files, the fact first, red, then the loop in `Save`, and a pulled cart that stays pulled. **Circulate hard.** |
| 2:14 | 10 min | **☕ Break** |
| 2:24 | 12 min | 💥 **Saved as it happens** *(demo §5)*. Dorothy rings, <kbd>Ctrl+C</kbd>, and her fourth call is gone. Two typed lines; <kbd>Ctrl+C</kbd> again, and it's kept. |
| 2:36 | 62 min | **Lab F: finish, then start the homework.** The longest lab block of the night. Anyone not finished works on their next task; finished students start the homework, which is two tasks, and push their branch while you're there. |
| 3:38 | 7 min | **Wrap-up** *(slide 3, demo §6)*. Project repo URL, **the homework is the lab again**, the branch line, the checks-copy line, and the due date. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 71 of demo in six segments, 134 of lab in five blocks, and two breaks.** Lab F is long on purpose: it is the time for finishing the lab and starting the homework with you in the room. If the night runs long, take it from Lab F. **Do not take it from §3's question or Lab C.**

## Instructor notes

- ⚠️ ⚠️ **YOUR PASSWORD NEVER GOES ON THE PROJECTOR.** This week you set your secret before class, by the starter's fixed id, so nothing in the sheet shows it. **Do not run `dotnet user-secrets list` on screen tonight, and do not open `secrets.json`** — both print it.
- 💡 **The fixed `UserSecretsId` is the same in weeks 11, 12 and 13.** Once a student has set it on their own laptop, they never set it again. A lab PC that reboots loses it, and the `set` puts it back.
- ⚠️ **§2 drops your demo database in front of the room.** That is the point: the drop is the step every student does next.
- 💥 **§3's question is the demo's first payoff.** Teodoro is back. Ask why, and wait. The answer students should reach: `Save` walks the list, and he isn't in it.
- ⚠️ **§4 pastes the loop over `db.SaveChanges();`, and the block ends with the same `db.SaveChanges();`.** Say so, so nobody thinks it was removed.
- 💥 **§5's <kbd>Ctrl+C</kbd> is a real interrupt.** The desk never reaches `q`, so it never saves. Don't explain it as a crash on purpose; say what any early stop does.
- **Lab B is where the connection string goes wrong** — `Keyword not supported: 'connectionstrings:desk'` is a pasted key. `There is already an object named 'Callers'` is `update` before `drop`.
- **Lab D is where the `!` goes missing** — an empty `dbo.Songs` after a run where nothing was pulled.

## What could go wrong

| If | Then |
|---|---|
| A push asks you to sign in, or is rejected | §0's test push should have caught it. Sign in and push again; the room starts the task meanwhile. If it is rejected as behind, the pull in the same step fixes it — run the step again. |
| A student's copy says `No such file or directory` | Your push hasn't landed, or their starters clone isn't pulled. `git -C ../dotnet-db-starters pull` and copy again. |
| §2's `database update` says `There is already an object named 'Callers'` | The drop didn't run, or failed. Run it again, then `update`. |
| §2's drop says `did not exist, no action was taken` | Your database was already gone. Fine; carry on with `update`. |
| Every `dotnet ef` command prints a version warning | `dotnet tool update --global dotnet-ef` — in §0, not on screen. |
| §3's `x` already works before you paste | Your `Switchboard.cs` is a push file from rehearsal. Delete `week-11` and copy it in again. |
| §4's test is green before the fix | The same: a rehearsal push file. |
| §5's second <kbd>Ctrl+C</kbd> run still loses Dorothy's call | One of the two typed lines is missing, or in the wrong method. The first goes right after `Caller caller = switchboard.Take(who);`. |
| Students get `Your login failed.` | Their Task 1 connection string. Their desk can't connect either. |
