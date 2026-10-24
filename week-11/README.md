# Week 11 — EF Core II: A Cart Comes Off

The desk can put rows in its database and change them, and this week it takes one out. **The demo and the lab are both KDXR.** The instructor takes a caller off the switchboard live and pushes each finished file; students copy it in and pull a cart off the rotation the same way. The record comes back the next night until `Save` learns to take its row out, and a fact written before the fix is what turns it green.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: a fresh database, `Remove`, `Save`'s third job, testing a removal, saving as it happens, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-11/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *A cart comes off* — a caller taken off the switchboard in seven short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-11/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *A cart comes off* — 3 checks, 1/3 out of the box, and a pulled cart that stays pulled (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-11/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: a removed record comes back, then a fact and a `Save` that keeps it gone (20 pts) |

## What students walk out with

**A `Save` that makes the table match the list.** Students can write `Remove` on top of `Find`, explain why a removed record comes back when `Save` only walks the list, and give `Save` its third job: take out every row whose `Id` no record in the list has, before `SaveChanges()`.

**And when to save.** A program that only saves at the end loses everything when it's stopped early. Saving when something changes loses nothing, and `Save` is safe to call as often as it's needed.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is see that the table only changes when something tells it to.** Taking a record out of a list in memory tells the table nothing. `Save` has to say so, row by row, or the record is back the next time the program runs.

## 📋 Before class, don't forget

- ⚠️ **This week's secret set before class, by the starter's fixed id** — the command is in the cue sheet's §0. It stays set for weeks 12 and 13
- ⚠️ **The server name still posted in Canvas** — Task 1's fallback box tells students it is there
- ⚠️ **The SQL Server view already connected to your server, and `dotnet tool update --global dotnet-ef`**
- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it twice tonight. The cue sheet's §0 tests it
- ⚠️ **`demo/week-11/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-11/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- 💡 **Type your database name in the Database box at the top of the published cue sheet** — every mention on the page changes, including what the Copy buttons hand you

**Prev:** [Week 10 — EF Core I: The Carts Move In](../week-10/) · **Next:** [Week 12 — EF Core III: One Caller, Many Requests](../week-12/)
