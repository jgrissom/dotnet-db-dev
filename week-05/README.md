# Week 5 — How Many Are There?

Every variable they have written is a **name**. This week is about what is on the other end of it — one thing that is theirs, one thing somebody else is holding too, or **nothing at all**. Three answers they have used since their first C# course without ever being made to look at the difference, and each one costs a wrong number on a duty board tonight: a trip tally that belongs to nobody, a muster that clears two people off the ice, and a crash at −39 over one mistyped letter. Then the debugger, finally earned.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the debugger drill, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-05/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *How many are there?* — two compiler errors that walk you into a lie, an object built one field at a time, and a board that clears two people off the ice; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-05/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The switchboard* — 5 checks, 1/5 green out of the box, and three people sharing one number (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The lab folder, and **`project/week-05/Project.Checks`** — the checks the grader runs against your own project, byte-for-byte |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | `Find`, `Remove`, and a record that does something (20 pts) |

## What students walk out with

**A word they can finally explain.** They can say what `static` means — one copy belonging to the class, not one per object — read `CS0120` as *"which one did you mean?"* rather than as a request for the word, and name a case where `static` is right and give the test that decides it.

They can build a class that holds another class. They can say why two variables are sometimes two names for one object, and what that means for a "copy" handed around a program. They can write a method that returns `T?`, say what the question mark tells the compiler, and check before they use it — and say what `??` and `?.` each *decide*.

And they can set a breakpoint, step, and read an object's fields as it is built — including which object `this` is.

> [!IMPORTANT]
> **This is the week two old promises come due.** Week 1 said `static` would stop being the word you add to make the error go away; weeks 1 and 2 said the full story of `null` was week 5\'s. Both are collected here, and neither is re-taught at intro depth — the room has *used* all of it for four weeks without being told why.

> [!NOTE]
> **The debugger gets its slot here and is assumed from now on.** Weeks 10 and 11 use it without ceremony. It is the one beat in the week that depends on the editor rather than the terminal, so the cue sheet opens with a drill for proving it works before the room arrives.

## 📋 Before class, don\'t forget

- ⚠️ **Delete `week-05/` from the demo repo if you\'ve rehearsed** — `dotnet new` refuses to overwrite, and §1 starts with it
- ⚠️ **Watch a breakpoint actually stop, tonight, before they arrive** — §0 has the drill. If it doesn\'t, `Developer: Reload Window` is the fix
- ⚠️ **`main` up to date in the demo repo** — §1 carries week 4 forward, so last week\'s merge needs to be pulled
- **Rehearse §2\'s two compiler errors in order** — the cascade only works if you obey each message without hesitating
- **VS Code open on the demo repo\'s top**, exactly where week 4 left it
- **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive** — week 5\'s board adds the crew\'s trip tally

**Prev:** [Week 4 — OOP With a Reason, and the Semester Project](../week-04/) · **Next:** Week 6 — Interfaces and Polymorphism *(coming)*
