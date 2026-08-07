# Week 4 — OOP With a Reason, and the Semester Project

The week a class you've been looking at since week 3 gets convicted. Four public fields, on the projector all term, never questioned — and one typed correction at −39 loses a person's return time without a single warning. Properties, `private`, `private set`, and a class that owns its own collection. Then the hinge: **your own topic, a public repo, and the first pull request you merge into your own `main`.**

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, every property shape, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-04/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The board that defends itself* — a blank that gets in, a typo that becomes a compile error, and a real pull request; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-04/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The rotation that fights back* — 5 checks, 1/5 green out of the box, and a 3am glitch you shut out one task at a time (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-04/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Their own topic, their own public repo, branch → PR → merge (20 pts) |

## What students walk out with

**A reason, not a rule.** They can say what a public field costs — that there is nowhere to put the rule — and they've watched it silently destroy a value that mattered. They can write a property with a backing field, say what `value` is, write a setter that refuses without crashing, and reach for an auto-property when there's no rule yet. They can lock a fact with `{ get; }` and hand a fact's authority to the class itself with `{ get; private set; }`. They can build a class that owns a private collection and hands out a copy — and say what returning the real list would have undone.

And they walk out with **a repo of their own**: public, on a topic they picked, with one feature already merged through a pull request.

> [!IMPORTANT]
> **This is the hinge week.** From here the homework is always *their* program. Weeks 5–13 each extend it, and week 16 is the presentation. A student who picks a topic that can't grow a **second, related thing** hits a wall in week 12 — the homework makes them finish the sentence *"each one of my ___ has many ___"* before they commit to it.

> [!NOTE]
> **Two repos from this week on, and two URLs in Canvas.** The coursework repo (private, where the lab lives) and the project repo (public, where the graded work lives). **Two VS Code windows, one per repo** — not a multi-root workspace, so each window's terminal stands in exactly one place.

## 📋 Before class, don't forget

- ⚠️ **Delete `week-04/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite, and §1 starts with it
- ⚠️ **A browser signed in to GitHub, on the demo repo** — §7 opens a real pull request in front of the room, and fumbling it makes the workflow look fiddly when it isn't
- **Rehearse §4 and §7** — the "helpful typo" has to be delivered like a real one, and the PR flow is the only browser work in the course so far
- **VS Code open on the demo repo's top**, exactly where week 3 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 4's board adds the STATUS column the demo builds tonight

**Prev:** [Week 3 — Collections, and Losing Everything at Midnight](../week-03/) · **Next:** Week 5 — Behaviour, `static`, and the Debugger *(coming)*
