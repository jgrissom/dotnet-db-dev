# Week 13 — Exceptions: Four Answers

Every crash in this course has been a surprise, and this week they happen on purpose. **The demo and the lab are both KDXR.** The instructor runs each failure on the switchboard, picks one of four answers, and pushes each finished file; students copy it in and do the same to the rotation. The input lies, the file is missing or damaged, the file lies, and the row is gone. `try`, `catch` and `throw` are the syntax. The choice between ask again, say no, throw and stop is the subject.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: the four answers, `try` and `catch`, `throw`, why not save in `finally`, every crash so far, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-13/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *Four answers* — the switchboard stops crashing in six short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-13/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The delivery* — 5 checks, 1/5 out of the box, and a desk you can't crash with a bad file (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-13/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: it reads a file of names, asks again, refuses a bad file, and stops in a sentence (20 pts). The last homework of the semester |

## What students walk out with

**Four answers, and a way to pick.** Students can say whether a failure should ask again, say no, throw or stop, by asking who can fix it.

**And the syntax in the right place.** Students can read an exception's name off a crash, write a `try` with a `catch` for it in the class that talks to the person, and `throw` from the class that does the thinking, with a fact that pins it down.

> [!IMPORTANT]
> **The one thing they must leave able to do alone is say why a failure gets the answer it gets.** The `catch` is a few lines. Knowing that a wrong path asks again and a damaged file doesn't is the week.

## 📋 Before class, don't forget

- ⚠️ **Your secret set by the starter's fixed id, off the projector** — the cue sheet's §0 checks it and sets it
- ⚠️ **The server name still posted in Canvas** — Setup's box tells a student who missed last week that it is there
- ⚠️ **The SQL Server view already connected to your server, and `dotnet tool update --global dotnet-ef`**
- ⚠️ **A starters clone you can push to, next to your demo repo** — you push to it three times tonight. The cue sheet's §0 tests it
- ⚠️ **`demo/week-13/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **A way to cut your network for one run in §5**
- ⚠️ **Delete `week-13/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- 💡 **Type your database name in the Database box at the top of the published cue sheet** — every mention on the page changes, including what the Copy buttons hand you

**Prev:** [Week 12 — EF Core III: One Caller, Many Requests](../week-12/) · **Next:** Week 14 *(coming)*
