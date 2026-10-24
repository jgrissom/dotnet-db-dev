# Week 12 — EF Core III: One Caller, Many Requests

Every table at the desk has stood alone, and this week one belongs to another. **The demo and the lab are both KDXR.** The instructor gives each caller a table of requests live and pushes each finished file; students copy it in and give each cart a table of airings the same way. The airings don't come back until `Load` asks for them with `Include`, and a fact written before the fix is what turns it green. Then a LINQ question goes to the database as SQL, and EF Core's log shows it.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: one record with many of something, reading the migration, `Include`, LINQ that runs as SQL, `ToList`, the log, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-12/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *One caller, many requests* — the switchboard gets a second table in five short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-12/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *Every cart has a log* — 4 checks, 1/4 out of the box, and a LAST ON AIR time on every cart (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-12/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: each record has many details, `Include` brings them back, and the database answers a question about them (20 pts) |

## What students walk out with

**A second table that belongs to the first.** Students can model *"each one of my ___ has many ___"* as a list on the parent class and a child class carrying the parent's `Id`, read the migration that makes the table and its foreign key, and bring the children back with `Include`.

**And a question the database answers.** Students can write a LINQ question against a `DbSet`, say which part becomes SQL and which runs in the program, and read the SQL in EF Core's log.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is say where a question runs.** Everything before `ToList()` is sent to the database as SQL. Everything after it runs in the program, on whatever came back — and the log is how to check.

## 📋 Before class, don't forget

- ⚠️ **Your demo database reset to the first night** — three commands with last week's project, in the cue sheet's §0
- ⚠️ **The server name still posted in Canvas** — Task 1's box tells a student who missed last week that it is there
- ⚠️ **The SQL Server view already connected to your server, and `dotnet tool update --global dotnet-ef`**
- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it three times tonight. The cue sheet's §0 tests it
- ⚠️ **`demo/week-12/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-12/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- 💡 **Type your database name in the Database box at the top of the published cue sheet** — every mention on the page changes, including what the Copy buttons hand you

**Prev:** [Week 11 — EF Core II: A Cart Comes Off](../week-11/) · **Next:** Week 13 *(coming)*
