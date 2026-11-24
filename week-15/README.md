# Week 15 — The Running Order

Team git, on a plain text file. **There is no C# this week, nothing is graded, and nothing is collected.** In a short term, this is the week that gets dropped: nothing later depends on it. The instructor shows three cases on a practice repo of their own, and students do each one on theirs: two changes with an unchanged line between them merge by themselves, two changes on lines next to each other conflict, and a change made on GitHub fights a change made on the laptop. Then the whole room forks one shared repo and sends pull requests to one file, and the instructor finishes its one conflict on the projector. The second half of the night is practice for the week 16 presentation.

## Use in this order

| When | Document | What it is |
|------|----------|------------|
| Prep | 🗓️&nbsp;[lesson-⁠plan.md](lesson-plan.md) | Timed 3h45 agenda + instructor notes |
| Prep&nbsp;/⁠&nbsp;in-⁠class&nbsp;script | 📖&nbsp;[lecture-⁠notes.md](lecture-notes.md) | Further reading: which changes git can put together, why lines next to each other conflict, reading the markers, finishing by hand, pull is fetch then merge, a pull request that conflicts, reviewing your own, forks, **troubleshooting appendix** |
| Projected&nbsp;in&nbsp;class | 🎞️&nbsp;[slides.md](slides.md) | The deck (GFM, one slide per `##`) — [**present it live**](https://jgrissom.github.io/dotnet-db-dev/week-15/) (arrow keys, `F` for fullscreen) |
| In&nbsp;class,&nbsp;live-⁠coding | 🎨&nbsp;[demo/⁠](demo/) | *The running order* — one file, two people, then the whole room, in seven short segments; [clickable cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-15/demo/script.html) |
| In&nbsp;class,&nbsp;between&nbsp;demo&nbsp;segments | 🧪&nbsp;[lab/⁠](lab/) | *The running order* — four tasks in a practice repo of your own, the shared running order in class, and practice for week 16. **Works alone, start to finish.** Not graded |

## What students walk out with

**The rule for when git merges by itself: an unchanged line between the two changes.** Different lines is not enough. Lines next to each other conflict, and so does the same line.

**And how to finish a conflict by hand.** Delete the three marker lines and keep the lines they want, in the order they want, knowing that "keep both" brings back what each side replaced. Plus the two moves around it: `git pull --no-rebase` after a rejected push, and fixing a pull request that conflicts.

> [!IMPORTANT]
> **The one thing a student must leave able to do alone is finish a conflict by hand and say why each line stayed or went.** VS Code's buttons are a shortcut for that edit, not a replacement for knowing it.

## 📋 Before class, don't forget

- ⚠️ **`jgrissom/kdxr-tonight` exists, is public, and has twenty open slots** — the cue sheet's §0 has the file to paste
- ⚠️ **Your own clone of `kdxr-tonight` beside your demo repo** — you open it in Lab E to finish the room's conflict
- ⚠️ **No `running-order` repo on your GitHub, and no `running-order` folder beside your demo repo** — you make both with the room
- ⚠️ **Signed in to GitHub in the browser you project**
- 💡 **Browser tabs on the lab README and on `kdxr-tonight`'s Pull requests tab**

**Prev:** [Week 14 — The Old Carts](../week-14/) · **Next:** Week 16 *(coming)*
