# Week 8 — File I/O, and the Night Stops Being Gone

The oldest promise in the course comes due: data that survives a restart. **From this week the demo works on KDXR, the same station as the lab.** The instructor builds the switchboard's `Save` and `Load` live and pushes each finished file; students copy it in and do the same to the rotation. One number goes into the file and refuses to come out again — first on the switchboard, then on the rotation.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the `File` and JSON syntax, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-08/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The night stops being gone* — the switchboard, built live in six short segments, each followed by the lab task it practices; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The log book* — 4 checks, 1/4 out of the box, `Save`, `Load` and one attribute (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-08/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | The lab again, on your own registry: `Save`, `Load`, the private-set trap, and a fact of your own (20 pts) |

## What students walk out with

**A program whose data outlives it.** They can write and read a file with `File`'s one-line methods, and turn a list of objects into text and back with `JsonSerializer`. They can say why a missing file is a first run rather than a failure, and handle it in three lines.

They can also say **where a file actually goes** — that a relative path resolves against the folder the command was typed in, that `dotnet run` and `dotnet test` do not stand in the same folder, and therefore that a path is a parameter and never a name written inside a class. That one is measurable, and the lab and both checks projects are built on it.

And they meet the trap that costs an evening: **a serializer writes every property it can read and reads back only the ones it can write**, so the `{ get; private set; }` they have been writing since week 4 goes into the file and never comes home. `[JsonInclude]` is the answer, and it is framed as a decision about what should survive rather than as a repair.

> [!IMPORTANT]
> **This week's homework has the term's only two-week window** — set in one session and due before the class after next, because the term break falls in between. It is the same size as any other week; the demo's wrap says so out loud, and so does the homework's first line.

## 📋 Before class, don't forget

- ⚠️ **A starters clone you can push to, next to your demo repo** — you push three files to it tonight. The cue sheet's §0 says how to set it up and test it
- ⚠️ **`demo/week-08/` in the starters repo empty or missing** — it fills up during class
- ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — you copy it in fresh, with the room
- **VS Code open on the demo repo's top**, and a browser tab on the lab README

**Prev:** [Week 7 — Unit Testing, and the Checks Stop Being Magic](../week-07/) · **Next:** [Week 9 — LINQ, and Thirty Lines Become One](../week-09/)
