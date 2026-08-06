# Week 1 — Setup and First Contact

Setup night — but for a room that already took a C# course, setup is a *verification*, not an installation. Students leave with a verified toolchain, their work on GitHub, and the two things their last course didn't give them: **the compiler checks your types, not your program**, and **logic inside `Program.cs` can't be called, tested or graded by anyone.**

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| In&nbsp;class,&nbsp;setup&nbsp;segment | 🧭&nbsp;[setup-⁠guide.md](setup-guide.md) | Self-serve: 4 ✓-checks first, full install path for whatever failed |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, what the recap adds, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-01/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *Haldane Station boots up* — built from an empty folder; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-01/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;50&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *KDXR signs on* — 5 `dotnet test` checks; 1/5 green out of the box (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starters&nbsp;repo⁠](https://github.com/jgrissom/dotnet-db-starters) | The **one folder students copy in** — lab, homework skeleton, and both checks projects, **byte-for-byte the ones the grader runs** |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Their own invented radio station + first push to a private repo (20 pts) |

## What students walk out with

**A verified toolchain, a repo, and the two ideas their last course didn't have room for.** They can verify the toolchain and fix what's missing; say what `dotnet new console` actually produced and what the `.csproj` is for; read a C# error down to file, line and code; **explain why `4300 / 800` is `5` with no error and no warning, and why casting the result doesn't fix it**; **say which of their two files a test can call, and why logic left in `Program.cs` can be neither tested nor graded**; run `dotnet test` and read a failure as instructions — and get all of it onto GitHub in a private repo with the instructor added.

> [!IMPORTANT]
> **The intake has already completed an intro C# course**, through classes and objects. Weeks 3–4 of the agenda are recap and are timed as recap. **The night's weight is on §5's second break and §6's split** — the two things that are genuinely new. Pacing a familiar beat slowly is how this room is lost; see the lesson plan's instructor notes.

## 📋 Before class, don't forget

- ⚠️ **Delete any rehearsal `Haldane` folder.** The first beat is an empty folder becoming a program — the finished state in `week-01/demo-starter/` is for rehearsing against, **not** for opening in class
- **Rehearse the whole demo once (≈20 min)** — it also warms the NuGet cache, so the live `dotnet new console` is instant instead of a thirty-second stare
- Post the setup guide ahead of time and ask people to run the four ✓-checks before they arrive — most will pass all four and the segment collapses to git
- **Your own `git config --global user.name`** set to something you're happy projecting
- Your finished lab answer key with `dotnet test Lab.Checks` at **5/5**, for the 60-second *what done looks like*
- Editor font **and** terminal sized for the back row — tonight is when people find out whether they can read the screen at all
- ⚠️ **Do not hand out the SQL Server credentials.** They're not needed until week 10 and they'll be lost by then

**Next:** [Week 2 — The Mistakes the Compiler Can't Catch](../week-02/)
