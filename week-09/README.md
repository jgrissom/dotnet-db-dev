# Week 9 — LINQ, and Thirty Lines Become One

The desk learns to answer questions, and every answer is one line. **The demo and the lab are both KDXR.** The instructor changes the switchboard and the hour live and pushes each finished file; students copy it in and do the same to the rotation. One question quietly rewrites a save file — first on the switchboard, then, if they reach for the wrong word, on their own rotation.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: every word with what it hands back, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-09/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *Thirty lines become one* — the switchboard and the hour, changed live in seven short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The night's numbers* — 4 checks, 1/4 out of the box, and a first task that turns nothing green (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-09/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: a fact about `Find`, then `Matching`, `Names` and `Sorted` (20 pts) |

## What students walk out with

**One shape, and the confidence that it is only one.** A list, a word, and a question asked of one item at a time. Once a student can read `song => song.Seconds > 240` out loud, `FirstOrDefault`, `Where`, `Select` and `OrderBy` all read the same way, and they can pick between them **by what each one hands back**.

Students can also say what a word does **when nothing matches** — that `First` throws where `FirstOrDefault` hands back `null`, and that a search loop could never crash that way. They have seen it happen on their own desk.

**And two things a question must never do.** It must not change the list it is asked of: `OrderBy` builds a new list, while `List.Sort` rearranges the one it is given and the save file with it. And it must not change the items: a `Select` that plays each item puts the hour on air when somebody only wanted to read it.

> [!IMPORTANT]
> **Task 1 turns nothing green, on purpose.** Students write one fact, change two working loops into one line each, and the check count stays at 1 / 4. Their own suite is how they know nothing broke. The homework's Task 1 is the same task on their own registry.

## 📋 Before class, don't forget

- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it five times tonight. The cue sheet's §0 tests it
- ⚠️ **`demo/week-09/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-09/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- ⚠️ **Rehearse §6's debugger steps once** — a breakpoint, Debug Test, one Step Over, two Continues
- **VS Code open on the demo repo's top**, and a browser tab on the lab README

**Prev:** [Week 8 — File I/O, and the Night Stops Being Gone](../week-08/) · **Next:** [Week 10 — EF Core I: The Log Leaves the Building](../week-10/)
