# Week 2 — The Mistakes the Compiler Can't Catch

The compiler's limit, part two — and the `.gitignore`'s limit, first. Students learn the one thing last week's four lines can't do (a slip is manufactured live, then evicted — the untrack step everyone on the internet gets wrong), meet the Source Control view now that they know its verbs, and then get the week's real subject: **input happens after compiling is over.** A warning read properly, `null` handled without ceremony, and `TryParse` in place of faith.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Full lecture content, the eviction drill, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-02/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The slip and the lies* — junk tracked on purpose and evicted, then Haldane takes a typed reading; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-02/demo/script.html) |
| In&nbsp;class,&nbsp;last&nbsp;75&nbsp;min | 🧪&nbsp;[lab/⁠](lab/) | *The caller line* — 5 checks, 1/5 green out of the box, and one method that ships **already wrong** (answer key in the private repo) |
| With&nbsp;the&nbsp;homework | ✅&nbsp;[starter/⁠](starter/) | The **one folder students drag in** — lab, homework skeleton, and both checks projects, **byte-for-byte the ones the grader runs** |
| Assigned&nbsp;at&nbsp;wrap-⁠up | 📤&nbsp;[homework.md](homework.md) | Their station grows a request line + repo hygiene, both graded (20 pts) |

## What students walk out with

**The eviction drill, a read warning, and a program that survives its users.** They can explain why `.gitignore` can't untrack what's already committed and repair it (`git rm -r --cached .`, and what `--cached` spares); drive the Source Control view as the four verbs they already know; read a compiler warning as **the edge of the compiler's promise** rather than noise; handle `null` and blank input with `??`, `IsNullOrWhiteSpace` and `Trim`; and replace `Parse`'s faith with `TryParse`'s question — so the same typed sentence that crashed their program at 2:04 AM gets a civil answer at 2:50.

> [!IMPORTANT]
> **Weekly git hygiene scoring starts this week** — the `.gitignore` sweep, the scoped commit count, and the root README are all graded from here on. It's also the first week a check *feeds student methods hostile input*: null, blanks, and text that only claims to be a number. The failure messages say which crash happened; teach the room to read them.

## 📋 Before class, don't forget

- ⚠️ **The instructor demo repo from week 1, CLEAN** — four-line `.gitignore` at its root, zero tracked machinery; verify with §0's command, rebuild from §0's block if it's gone. §1 manufactures its own mess, one file, live
- **Rehearse the whole demo once (≈20 min)** — the slip beat especially; its order (slip in → show the gitignore powerless → *then* evict) is the lesson
- **VS Code open on the demo repo's top** (`~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework`) — the one window, exactly where week 1's class left it; the view needs no configuration because the workspace *is* the repo
- Editor font **and** terminal sized for the back row, as ever

**Prev:** [Week 1 — Setup and First Contact](../week-01/) · **Next:** Week 3 — Collections, and Losing Everything at Midnight *(coming)*
