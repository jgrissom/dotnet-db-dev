# Week 10 — EF Core I: The Log Leaves the Building

The week the memory→file→database arc finishes. Week 3 lost three records at the door and named the two weeks that would answer it; week 8 gave the log a file; tonight it gets a table on the college's SQL Server, and the demo reads a row back from a query with the program closed. Students also meet the answer week 2 owed them — where a password is allowed to live — and the evening ends on the station disagreeing with itself.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the restore drill, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-10/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The log leaves the building* — a table, a secret, a migration, and a row read from somewhere else; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The carts leave the building* — 5 checks, 1/5 out of the box, and a database of your own (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-10/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Your registry moves into a database of your own (20 pts) |

## What students walk out with

**A class, a table, and the three commands between them.** They can shape a record for a table (`Id`, and `[NotMapped]` for the things a class works out rather than keeps), write a `DbContext` that says which tables exist and how to reach them, and tell `dotnet ef migrations add` from `dotnet ef database update` — **which is the pair that decides whether anything ever reaches the server**.

**And somewhere for a password to live.** User secrets, taught as the answer to week 2's committed password rather than as configuration plumbing: what they are, what they are *not* (not encrypted, not shared, not deployment), where the file actually sits, and the one-command restore drill for a lab PC that has rebooted.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is tell the two failure modes apart.** `The ConnectionString property has not been initialized.` has two causes — a skipped `user-secrets init`, which fails **silently**, and an empty store. `dotnet user-secrets list` answers three different ways and is the whole diagnostic.

## 💥 And the two beats that carry it

**§5 is the promise, paid a second time.** A sign-out typed at the desk, `q`, and a fresh process shows it still there — with **no file anywhere in `week-10/`**. Then the same row, read out of the mssql extension with the program closed: *"a file is still your file; this is on a machine none of us owns."*

**§6 is the break, and nothing about it is staged.** Type `reyes` at the desk and it is refused; ask the database `WHERE Who = 'reyes'` and the row comes back:

```
b → reyes             Nobody outside by that name.
WHERE Who = 'reyes'   →   SIGNOUT  14:20  Reyes  DIG OUT  14:45
```

**Same station, same log, same word.** C# compares letters; this server's collation does not care about case. It is the collection of a thought weeks 5, 7 and 9 all told students to hold — and the mechanism is one sentence, because **LINQ actually translating to SQL is week 12**.

## 📋 Before class, don't forget

- ⚠️ ⚠️ **Your connection string has your password in it and the room can read the projector.** §0 puts it in `~/haldane-connection.txt` and §3 reads it from there — **nothing sensitive is ever typed on screen**, and saying why *is* the lesson
- ⚠️ ⚠️ **Drop the demo database if you've rehearsed.** §5's payoff is a row arriving in an empty table; a full one makes the beat land on a board that already looks right. §4 makes it again
- ⚠️ **`week-10/season.txt` must be in the demo repo before class** — 51,309 lines, running to day 275. **The banner reads the day off its last line**, and nothing this week types a date
- ⚠️ **Delete `week-10/Haldane` and `week-10/Haldane.Tests` if you've rehearsed** — ⚠️ **not `season.txt`**
- ⚠️ **The mssql extension should already know your server.** §4 uses it live, and a first connection means a dialog, a password prompt and a trust prompt
- **`dotnet tool update --global dotnet-ef`** — a stale tool prints a version warning on every command, all night
- **`main` up to date in the demo repo**, and `dotnet run --project week-09/Haldane` run once — §1 opens by running it
- 💡 **The published cue sheet has a Database box at the top.** Type your database name in once and every mention on the page changes, including what the Copy buttons hand you
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 10's board is up, and it is the first one that says where the log is kept

**Prev:** [Week 9 — LINQ, and Thirty Lines Become One](../week-09/) · **Next:** Week 11 — EF Core II *(coming)*
