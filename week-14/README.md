# Week 14 — The Old Carts

Students have records in their own databases now, and this week they change the tables those records live in. **The demo and the lab are both KDXR.** The instructor gives the switchboard two new columns and keeps every caller; students give the carts the same two and keep every cart. One column nobody knows the old value of, so it can be empty. One everybody knows, so the migration has to say it — and `migrations add` writes the wrong value without a word. Then the second half of the night is their own project: the same two columns, and the runway to week 16.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: a column nobody knows, a column everybody knows, reading a migration, taking one back, a test that reads a migration, renames, the week 16 runway, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-14/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The old carts* — two new columns on the switchboard in six short segments; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-14/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The old carts* — 3 checks, 1/3 out of the box, and every cart still there at the end (answer key in the private repo) |
| In&nbsp;class,&nbsp;second&nbsp;half | 📤&nbsp;[homework.md](homework.md) | *Project work* — the lab again, on your own project, then the week 16 runway. **Not graded, nothing to submit** |

## What students walk out with

**One question to ask before every new column: what is the true value for the rows already here?** Nobody knows: the column can be empty. Everybody knows: the migration says it.

**And the habit that keeps rows safe.** Students read a migration's `Up` before they run it, recognize *may result in the loss of data*, and can take a migration back — with `remove` before it runs, and with `database update` and an earlier name after.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is read a migration before running it.** `migrations add` is right most of the time, and the time it isn't, it doesn't say so.

## 📋 Before class, don't forget

- ⚠️ **Your secret set by the starter's fixed id, off the projector** — the cue sheet's §0 checks it and sets it
- ⚠️ **Your desk's database reset to the first night** — §0's four commands, off the projector
- ⚠️ **The SQL Server view already connected to your server, and `dotnet tool update --global dotnet-ef`**
- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it twice tonight, for reading. The cue sheet's §0 tests it
- ⚠️ **`demo/week-14/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-14/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- 💡 **Type your database name in the Database box at the top of the published cue sheet** — every mention on the page changes, including what the Copy buttons hand you

**Prev:** [Week 13 — Exceptions: Four Answers](../week-13/) · **Next:** Week 15 *(coming)*
