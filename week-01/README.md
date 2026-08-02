# Week 1 — Setup and First Contact

Setup night, and the first hour of the language. Students leave with a working toolchain, a program they wrote, and their work on GitHub — plus the two facts the rest of the course is built on: **a compiler reads everything before anything runs**, and **it still can't catch everything**.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| In&nbsp;class,&nbsp;setup&nbsp;segment | 🧭&nbsp;[setup-⁠guide.md](setup-guide.md) | Student-facing walkthrough: 5 installs, each with a ✓-verify checkpoint |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the Python bridges, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-01/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *Haldane Station boots up* — built from an empty folder; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-01/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;40&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *KDXR signs on* — 5 `dotnet test` checks; 1/5 green out of the box (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[homework-⁠checks/⁠](homework-checks/) | The checks students run on their own work — **byte-for-byte the ones the grader runs** |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Their own invented radio station + first push to a private repo (20 pts) |

## What students walk out with

**A toolchain, and a compiler they've met.** They can create and run a console project; declare `int`, `double`, `string` and `bool` and say what a declared type promises; put values into text with `$"..."` and map it to the f-string they already know; read a C# error down to file, line and code; explain why `4300 / 800` is `5` here and `5.375` in Python; write a `public static` method and call it from `Program.cs`; say which of their two files a test can actually see — and get all of it onto GitHub in a private repo with the instructor added.

## 📋 Before class, don't forget

- ⚠️ **Delete any rehearsal `Haldane` folder.** The first beat is an empty folder becoming a program — the finished state in `week-01/demo-starter/` is for rehearsing against, **not** for opening in class
- **Rehearse the whole demo once (≈25 min)** — it also warms the NuGet cache, so the live `dotnet new console` is instant instead of a thirty-second stare
- Post the install links ahead of time; anyone who arrives with the SDK already on is thirty minutes of their own evening saved
- **Your own `git config --global user.name`** set to something you're happy projecting
- Your finished lab answer key with `dotnet test KDXR.Checks` at **5/5**, for the 60-second *what done looks like*
- Editor font **and** terminal sized for the back row — tonight is when people find out whether they can read the screen at all
- ⚠️ **Do not hand out the SQL Server credentials.** They're not needed until week 10 and they'll be lost by then

**Next:** Week 2 — Types, the Compiler and Git Hygiene *(coming)*
