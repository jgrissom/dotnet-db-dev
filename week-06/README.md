# Week 6 — One Loop, Four Kinds of Thing

Every list students have written since week 3 has held exactly one type, and it has never cost them anything. Tonight it costs twice: a duty log that cannot be read down because it is really two lists, and then one list that holds everything and can say nothing about any of it. The answer is a kind of type they have never written — no bodies, nothing to make — and by the end of the lab one `foreach` is putting a song, a station ident, an advert and a weather bed on air.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the interface syntax, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-06/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *One loop, four kinds of thing* — a log that isn't a log, a list that promises nothing, and a board that turns out to be a question; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-06/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The hour* — 5 checks, 1/5 green out of the box, and four classes that go on air from one loop (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-06/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | An interface, two classes that keep it, and one list that holds both (20 pts) |

## What students walk out with

**A type that isn't a class.** They can declare an interface and say what every part of the declaration means — the word `interface`, the missing bodies, the fact that there is nothing to `new`. They can make an existing class keep one without changing anything the class already did, and read `CS0535` as a to-do list rather than a telling-off.

They can write one `foreach` over a list of a promise and have several different classes go through it. They can say why `SignOut : ILogEntry` is not the claim *a sign-out is a kind of log entry*, and why C# gives a class one parent and any number of promises.

And they can use `is` to get back to the one kind that is different — and say when that is a design decision and when it is a smell.

> [!IMPORTANT]
> **This is the week the demo's console stops being a board.** Haldane keeps a **watch log** from tonight: a sign-out, a weather reading and a fuel check on one list, in order. That log is what week 8 stops throwing away, and the reading that belongs to a person is the shape week 12 turns into a second table.

> [!NOTE]
> **No debugger segment this week.** Week 5's was the earned one and it is assumed from here. It still appears twice, once in the lab and once in the homework, as the thing to reach for when a value isn't what you think it is.

## 📋 Before class, don't forget

- ⚠️ **Delete `week-06/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite, and §1 starts with it
- ⚠️ **`main` up to date in the demo repo** — §1 carries week 5 forward, so last week's merge needs to be pulled
- ⚠️ **Run `dotnet run --project week-05/Haldane` once before class** — §1 opens by running it
- **Rehearse §3's `CS0535` build** — it is the best twenty seconds of the night and it only works if `Reading` has *not* been given the interface yet
- **VS Code open on the demo repo's top**, exactly where week 5 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 6's board carries the watch log

**Prev:** [Week 5 — How Many Are There?](../week-05/) · **Next:** [Week 7 — Unit Testing, and the Checks Stop Being Magic](../week-07/)
