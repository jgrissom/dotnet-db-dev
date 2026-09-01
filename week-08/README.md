# Week 8 — File I/O, and the Log Stops Being Gone

The oldest promise in the course comes due. Students have watched a list die at every restart since week 3, were told three separate times that week 8 was the answer, and tonight they get it — a save file the duty console reads back, a serializer for the ordinary case, and one number that goes into the file and refuses to come out again.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the `File` and JSON syntax, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-08/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The log stops being gone* — a readable useless file, then one both sides can read; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The log book* — 5 checks, 1/5 out of the box, two files and one attribute (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-08/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | `Save` and `Load` on your registry, the private-set trap, and a fact of your own (20 pts) |

## What students walk out with

**A program whose data outlives it.** They can write and read a file with `File`'s one-line methods, tell a save file from a log (`WriteAllText` versus `AppendAllText`), turn objects into text and back by hand, and reach for `JsonSerializer` when the list is one type. They can say why a missing file is a first run rather than a failure, and handle it in three lines.

They can also say **where a file actually goes** — that a relative path resolves against the folder the command was typed in, that `dotnet run` and `dotnet test` do not stand in the same folder, and therefore that a path is a parameter and never a name written inside a class. That one is measurable, and the lab and both checks projects are built on it.

And they meet the trap that costs an evening: **a serializer writes every property it can read and reads back only the ones it can write**, so the `{ get; private set; }` they have been writing since week 4 goes into the file and never comes home. `[JsonInclude]` is the answer, and it is framed as a decision about what should survive rather than as a repair.

> [!IMPORTANT]
> **This week's homework has the term's only two-week window** — set on 6 October, due 20 October, because fall break falls in between. It is the same size as any other week; the demo's wrap says so out loud, and so does the homework's first line.

> [!NOTE]
> **The desk clock stops being a string.** `Watch.Now()` is `DateTime.UtcNow` from tonight, so the log carries real times — which is why `Watch.Add` now keeps the book in time order instead of relying on the entries happening to arrive in it. Both are small; the second one is the more interesting lesson and the demo says why.

## 📋 Before class, don't forget

- ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — `Haldane`, `Haldane.Tests` **and `watch-log.txt`**. A leftover log file skips §5's payoff by making the save file already exist
- ⚠️ **`main` up to date in the demo repo** — §1 carries week 7 forward, so last week's merge needs to be pulled
- ⚠️ **Run `dotnet run --project week-07/Haldane` once before class** — §1 opens by running it
- 💡 **The clock is real from §6 on**, so log times in the cue sheet's output blocks are the ones it was captured at. Nothing else in those blocks moves
- **VS Code open on the demo repo's top**, exactly where week 7 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 8's board is up, and it is the first one that shows an amended line and the standing order behind it

**Prev:** [Week 7 — Unit Testing, and the Checks Stop Being Magic](../week-07/) · **Next:** Week 9 — LINQ, and Thirty Lines Become One *(coming)*
