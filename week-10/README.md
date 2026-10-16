# Week 10 — EF Core I: The Carts Move In

The desk's night moves out of two files and into a database on the college's SQL Server. **The demo and the lab are both KDXR.** The instructor moves the switchboard live and pushes each finished file; students copy it in and move the rotation the same way. The second time the desk saves, it crashes — first the switchboard, then the rotation — and a fact written before the fix is what turns it green.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: tables, the context, user secrets, migrations, save and load, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-10/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The carts move in* — the switchboard moved into the database in seven short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The carts move in* — 5 checks, 1/5 out of the box, and a database of your own on the college's server (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-10/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: a `ProjectContext`, a migration, `Save` and `Load`, and a fact about the second save (20 pts) |

## What students walk out with

**A class, a table, and the two commands between them.** Students can give a class an `Id`, fix the two things that stop EF Core making a table from it, write a `DbContext`, and tell `dotnet ef migrations add` from `dotnet ef database update` — **the pair that decides whether anything ever reaches the server.**

**And somewhere for a password to live.** User secrets: what they are, what they are *not* (not encrypted, not shared, not on any other machine), where the file sits, and the one command that puts it back on a lab PC that rebooted.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is tell a new record from one that came out of the table.** `Id` 0 is new and gets `Add`; any other `Id` is a row that already exists and gets `Update`. Get it wrong and the program works the first time and crashes the second, which is the hardest kind of bug to see coming.

## 📋 Before class, don't forget

- ⚠️ **Your connection string in `~/kdxr-connection.txt`** — §2 reads it, so your password never reaches the projector
- ⚠️ **No `DB_KDXR_156101411_JSG` on the server** — drop it if you've rehearsed; §3 makes it
- ⚠️ **The SQL Server view already connected to your server, and `dotnet tool update --global dotnet-ef`**
- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it three times tonight. The cue sheet's §0 tests it
- ⚠️ **`demo/week-10/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-10/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- 💡 **Type your database name in the Database box at the top of the published cue sheet** — every mention on the page changes, including what the Copy buttons hand you

**Prev:** [Week 9 — LINQ, and Thirty Lines Become One](../week-09/) · **Next:** Week 11 — EF Core II *(coming)*
