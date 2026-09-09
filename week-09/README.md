# Week 9 — LINQ, and Thirty Lines Become One

The most heavily pre-promised week in the course comes due. Since week 3, six separate times, students have written a loop by hand and been told *"in week 9 this becomes one line."* Tonight all six are collected — and then the evening turns, because the interesting half of LINQ is not the brevity. It is that a query **asks**: it never changes the thing it was asked about, and it is not an answer until somebody makes it one.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, every word with what it hands back, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-09/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *Thirty lines become one* — seven loops out, a muster that loses a name, a season queried; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The night's numbers* — 5 checks, 1/5 out of the box, and a first task that turns nothing green (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-09/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Three questions on your own registry, and a fact that gives permission (20 pts) |

## What students walk out with

**One shape, and the confidence that it is only one.** `sequence . word ( question )` — and once they can read `c => c.TripsToday` out loud, every word in the set reads the same way. They can pick between `Where`, `Select`, `OrderBy`, `Take`, `OfType<T>`, `Sum`/`Count`/`Average`, `Any`, `FirstOrDefault`/`LastOrDefault` and `MaxBy`/`MinBy` **by what each one hands back**, which is the only classification that decides what can come next.

They can also say what every one of those does to an **empty** sequence — and that `First` and `FirstOrDefault` are not interchangeable, because the loop they are replacing could never crash and `First` can.

**And two things a query must never do.** `OrderBy` sorts a *copy*, so a registry keeps the order records arrived in and the save file is not quietly rewritten. And a lambda that changes something on the way past has turned a question into an action — which is why `Hour.Run` and `Watch.Save` stay loops, and why a one-liner is not the goal.

> [!IMPORTANT]
> **The week's own payoff is a number that does not move.** Seven working loops come out of the demo and about forty lines out of the lab, and the test count sits still through all of it. **Week 7 promised exactly this** — *"your tests will be how you prove the one-liners do the same job"* — and this is where it is collected. The lab's Task 1 turns nothing green on purpose.

## 💥 And then the honest half

`Where` hands back **instructions**, not a list. §4 takes a muster of who is outside, marks somebody back, and reads the same muster again — **and a name has gone**. `ToList()` is what makes an answer out of a recipe, and week 5 is why the copy did not save them.

Then §6 asks the station's met book — **50,000 readings over 268 days** — six questions in six lines, and prints the bill:

```
reading the file       8 ms for all 50,000 lines
asking the questions   5.0 ms
the book, in memory    11.8 MB from a 1.1 MB file
```

⚠️ **This is deliberately not a speed beat, and it must not be built as one.** At this size a file is *fast* — the argument is **work and memory**: it read all 50,000 lines to answer a question about one, and a 1.1 MB file is ten times bigger once it is in the program. That is true on any machine, and a stopwatch race is not.

**That is where the week's forward promise is made, in as many words:** *querying a file is going to stop being good enough.* Week 10 moves it; week 12 collects it.

## 📋 Before class, don't forget

- ⚠️ ⚠️ **`week-09/season.txt` must be in the demo repo before class** — 50,000 lines, 1.1 MB, and **§5 and §6 cannot run without it.** The demo never types it; §0 has the copy line
- ⚠️ **Delete `week-09/` if you've rehearsed** — both projects **and `watch-log.txt`**, but ⚠️ **not `season.txt`**
- ⚠️ **`main` up to date in the demo repo** — §1 carries week 8 forward, so last week's merge needs to be pulled
- ⚠️ **Run `dotnet run --project week-08/Haldane` once before class** — §1 opens by running it
- 💡 **The two millisecond figures in §6 move every run**, which is why slide 11 carries only the memory line. Read yours off the screen
- **VS Code open on the demo repo's top**, exactly where week 8 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 9's board is up, and it is the first one with a met summary on it

**Prev:** [Week 8 — File I/O, and the Log Stops Being Gone](../week-08/) · **Next:** Week 10 — EF Core I *(coming)*
