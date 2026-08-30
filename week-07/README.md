# Week 7 — Unit Testing, and the Checks Stop Being Magic

Students have been graded by test projects since the first night and have never seen inside one. Tonight the duty board gets caught keeping two wrong records, a rule buried in `Program.cs` turns out to be untestable by anything — week 1's rule, arriving with a bill — and the fix ends with a test project of the room's own: red against a real bug first, green after the fix, forever. Then the file that has been grading them all semester comes up on screen, and every line of it is syntax they know.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the xUnit syntax, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-07/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The checks stop being magic* — two bugs on the board, the move, and red-then-green twice; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-07/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The update* — 5 checks, 1/5 green out of the box, four planted regressions, and a `Lab.Tests` that is the student's own (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-07/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | A `Project.Tests` of your own — three born-green facts, one honest red, and the guard that answers it (20 pts) |

## What students walk out with

**The reveal, from the inside.** They can create an xUnit test project with `dotnet new xunit`, point it at their code, and write a fact: set the scene, do the thing, check the answer. They can read a failure — the name, expected-versus-actual, the line — and they know why the course's own check output has looked the way it has all semester: they can now open any `*.Checks` file in the course and read every line of it.

They can practice the two disciplines the week is really about: **red, then green** — the test written against the bug first, so the red proves the test can see it — and **make it fail once**, for a test born green. And they can say what testable shape has been buying them since week 1, because they watched a rule trapped in `Program.cs` become testable by moving into a class, bugs and all.

> [!IMPORTANT]
> **This is the week the student's world gains its own test suites.** The lab folder holds **three** projects from now on — `Lab`, `Lab.Checks`, and `Lab.Tests`, which is theirs — and the project repo gains a permanent `Project.Tests`. The graded checks are only **two** this week; the other points are facts the student writes, read by name out of their own suite.

> [!NOTE]
> **No debugger segment this week, and no new Haldane features.** The demo's code motion is one extraction — `Watch.cs` — done as a *move, don't fix* discipline, and the two board bugs it carries were left in deliberately weeks ago as tonight's material.

## 📋 Before class, don't forget

- ⚠️ **Delete `week-07/` from the demo repo if you've rehearsed** — both `Haldane` and `Haldane.Tests`; `dotnet new` refuses to overwrite either
- ⚠️ **`main` up to date in the demo repo** — §1 carries week 6 forward, so last week's merge needs to be pulled
- ⚠️ **Run `dotnet run --project week-06/Haldane` once before class** — §1 opens by running it
- **A browser tab on the starters repo** at `week-06/Lab.Checks/HourChecks.cs` — §4's reveal scrolls it beside the editor
- **Rehearse §5's red** — it only lands if `Watch.cs` went in as the §3 block (no guard). If the first run comes up green, the §5 version got pasted early
- **VS Code open on the demo repo's top**, exactly where week 6 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 7's board is up

**Prev:** [Week 6 — One Loop, Four Kinds of Thing](../week-06/) · **Next:** Week 8 — File I/O, and the Log Stops Being Gone *(coming)*
