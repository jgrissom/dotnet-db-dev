# Week 3 — Collections, and Losing Everything at Midnight

The week the station gets a memory, and finds out how long a memory lasts. `List<T>` for the things you can't count in advance, `Dictionary<K,V>` for the things you look up by name, and **Spectre.Console** — the first NuGet package — for drawing them. Then the beat the rest of the course is built on: **you quit, you run it again, and it's empty.**

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the list/dictionary split, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-03/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The station gets a memory* — the sign-out board, three breaks, and the run that empties it; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-03/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;60&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The night's log* — 5 checks, 1/5 green out of the box, and a shift you lose on purpose (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The **one folder students copy in** — lab, homework skeleton, and both checks projects, **byte-for-byte the ones the grader runs** |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Their station keeps the night — and it's the station's last week (20 pts) |

## What students walk out with

**Two collections, a package, and a problem.** They can say why a fixed-size array is a decision somebody had to make and use `List<T>` instead; hold a list of a type they wrote; use a `Dictionary<K,V>` to look up and to count; explain that *reading* a missing key throws while *assigning* one creates it, and reach for `TryGetValue` — recognising it as last week's `TryParse` in new clothes. They add their first NuGet package and can say why nothing was installed on the machine.

And they walk out annoyed, on purpose: **everything above lives in memory, and memory is the length of one process.**

> [!IMPORTANT]
> **This is where the spine of the course starts.** The loss in week 3 is not a bug, a caveat, or a thing to soften — it's the problem that **week 8** answers with a file and **week 10** answers with a database. Both of those weeks explicitly call back to tonight. **Don't teach a workaround**, and don't let a student leave thinking they did something wrong.

> [!NOTE]
> **First NuGet package = first restore.** Both the lab and the homework projects fetch `Spectre.Console` the first time they build. It's a one-time cost per machine, it needs the network, and on class night it lands on fifteen laptops at once — the lesson plan's *What could go wrong* table has the fallback.

## 📋 Before class, don't forget

- ⚠️ **Warm the NuGet cache** — `dotnet add package` on a cold cache is a silent thirty seconds in front of the room. §0 of the cue sheet has the one-line command
- ⚠️ **Delete `week-03/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite, and §2 starts with it
- **Rehearse the whole demo once (≈25 min)** — §3's column shear and §6's re-run are the two beats you want in your hands
- **VS Code open on the demo repo's top** (`~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework`), exactly where week 2 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — it matters more this week than any other, and you still say nothing about it. In §4 the program starts looking exactly like it

**Prev:** [Week 2 — The Mistakes the Compiler Can't Catch](../week-02/) · **Next:** Week 4 — OOP With a Reason, and the Semester Project *(coming)*
