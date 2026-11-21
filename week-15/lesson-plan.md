# Week 15 — Lesson Plan

**Topic:** Team git on a plain text file. When git merges two changes by itself (an unchanged line between them) and when it stops (lines next to each other, or the same line). Finishing a conflict by hand. A rejected push and `git pull --no-rebase`. Pull requests from forks, one that conflicts, and a review. Then practice for the week 16 presentation.
**Session length:** 3h 45m

> **There is no C# tonight, and nothing is graded or collected.** The file is KDXR's `running-order.txt`, one song per line. The instructor works on a practice repo of their own, `running-order`, made with the room in Lab A; students make theirs the same way, **beside** their coursework repo. **The starters repo ships nothing this week.** In class the room also works on one shared public repo, `jgrissom/kdxr-tonight`, by forks. **This is the droppable week: week 16 must not depend on anything here.**

## 🎯 The payoff moment — the demo's

**Lab E's last pull request.** Every pull request in the room has merged, most of them *behind* and every one clean, because every slot has an unchanged station ID line under it. Then the second slot-20 pull request won't merge. The room says why (both volunteers changed slot 20). The instructor fetches it by its number, finishes the conflict on the projector with the room voting on the last song of the night, pushes, refreshes, and GitHub says **Merged** without its merge button ever being pressed. The line to land:

> *"Its commits are in main now, so GitHub counts it as merged."*

## 🎯 The payoff moment — the lab's

**Task 2's conflict on two different lines.** Students have just watched lines 1 and 3 merge by themselves in Task 1. Lines 5 and 6 are different lines too, and git stops. Then the file shows each side holding **both** lines of the region, and "keep both" turns eight songs into ten. **That is the moment the rule stops being "different lines merge" and becomes "an unchanged line between them".**

⚠️ **The one to protect is §3's prediction.** Ask *"will git merge the nurse's branch by itself?"* and wait for answers before running the merge. Most of the room will say yes, because §2 just did.

## Learning objectives

By the end of this session, students can:

1. Predict whether two changes to one file will merge by themselves, from where the changed lines are.
2. Read a conflict: which part is `HEAD`, which part is coming in, and what each part holds.
3. Finish a conflict by hand, and say why "keep both" is usually wrong when both sides changed something.
4. Recover from a rejected push with `git pull --no-rebase`, a hand-finished conflict, and a second push.
5. Fork a repo, change it on a branch, and open a pull request into the original.
6. Fix a pull request that conflicts, by merging `main` into its branch.
7. Review a pull request of their own with comments, and answer each comment with a commit.

## Materials

- `slides.md` / `slides.html` — the deck, seven slides
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-15/demo/script.html))
- **The instructor demo repo**, `dotnet-db-coursework` — only as the place the terminal starts. Nothing is copied into it tonight
- ⚠️ **`jgrissom/kdxr-tonight`, public, with twenty open slots** — §0 has the file
- ⚠️ **A clone of `kdxr-tonight` beside the demo repo, open in a VS Code window of its own**
- **Signed in to GitHub in the projected browser**
- **Browser tabs on the lab README** (`week-15/lab/README.md` on GitHub) **and on `kdxr-tonight`'s Pull requests tab**

## The night: chunked, then the shared repo, then practice

The first two hours are chunked like weeks 8 to 14: each demo segment is followed by the lab task that practices it. **The instructor shows each case on their own `running-order` with one pair of callers; students do it on theirs with a different pair and different lines**, so the lab is the same move rather than a copy.

- **Lab E is the shared running order.** Students fork `kdxr-tonight` and open a pull request from their fork; the instructor merges on the projector, reviews one line of one pull request, and finishes the one conflict. **Task 4 in the lab is the same session in a student's own repo**, for anyone working alone.
- **Lab F is practice for week 16**, on the students' own projects, with the three steps on slide 6.
- **Every lab block ends at an "In class, stop here" note** in the README.

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 3 min | **One file, two people** *(slide 1, demo §1)*. Read the slide. |
| 0:03 | 12 min | **Lab A: setup, together** *(the lab README in the browser)*. Everyone, you included, makes a `running-order` repo on GitHub, clones it beside their coursework repo, makes the file, commits and pushes. |
| 0:15 | 10 min | **Lines apart** *(demo §2)*. Dorothy on line 2, Ray on line 4, merged by themselves. |
| 0:25 | 12 min | **Lab B: Task 1** — lines 1 and 3. |
| 0:37 | 14 min | 💥 **Lines next to each other** *(slides 2–3, demo §3)*. Pham on line 7, the nurse on line 8. The prediction, the conflict, *Accept Both* and its ten songs, then by hand. |
| 0:51 | 18 min | 🎯 **Lab C: Task 2** — lines 5 and 6. |
| 1:09 | 10 min | **☕ Break** |
| 1:19 | 10 min | **GitHub against your laptop** *(slide 4, demo §4)*. Line 3 on GitHub and on the laptop, a rejected push, `git pull --no-rebase`, by hand, push. |
| 1:29 | 15 min | **Lab D: Task 3** — line 8. |
| 1:44 | 8 min | **The shared running order** *(slide 5, demo §5)*. `kdxr-tonight`, forks, slots counted off, two volunteers on slot 20. |
| 1:52 | 30 min | 🎯 **Lab E: the shared running order.** Forks and pull requests; every merge on the projector; one review; the slot-20 conflict finished in front of everybody. |
| 2:22 | 10 min | **☕ Break** |
| 2:32 | 3 min | **Practice for week 16** *(slide 6, demo §6)*. |
| 2:35 | 65 min | **Lab F: practice for week 16** — run it, give it out loud to a partner, fix the one thing. |
| 3:40 | 5 min | **Wrap-up** *(slide 7, demo §7)*. Nothing graded, Task 4 for home, the branch line, week 16. |

> [!NOTE]
> **The table sums to exactly 225 minutes: 53 of demo in seven segments, 87 of lab in five blocks (Lab E with the instructor merging on the projector), 65 of practice, and two breaks.** If the night runs long, take it from Lab F. **Do not take it from Lab E**: it's the one thing a student can't do alone at home.

## Instructor notes

- ⚠️ **Every merge in the sheet is `git merge --no-edit`, and every pull is `git pull --no-rebase`.** Without `--no-edit`, a merge run in a terminal opens an editor for its message and waits. Without `--no-rebase`, `git pull` on diverged branches refuses on any machine with no pull setting, and a stock Mac has none.
- ⚠️ **§3's *Accept Both Changes* is on purpose, and it is undone right away** with <kbd>⌘Z</kbd> / <kbd>Ctrl+Z</kbd>. Look at the ten songs before you undo.
- ⚠️ **Lab E: leave the second slot-20 pull request until last.** Merge the first one as soon as it arrives. If two other students pick the same slot by mistake, that's a second conflict, and it's the same fix.
- **Lab E's review beat needs one student to answer from their fork.** Pick someone whose pull request arrived early, so the answer has time to arrive.
- **The instructor's local fix for the slot-20 conflict works because GitHub keeps every pull request's commits at `pull/<number>/head`.** The number in the sheet is an example; read yours off the pull request.
- **The students' practice repos are theirs to keep or delete.** Nothing is submitted.
- **There is no debugger tonight, and no checks.** The evidence is the file and `git log --graph --oneline`.

## What could go wrong

| If | Then |
|---|---|
| A student's `git clone` lands inside `dotnet-db-coursework` | They skipped `cd ..`. Delete the inner folder in VS Code's Explorer, then Setup step 2 again. 🆘 has it |
| An editor full of `~` lines opens after a merge | A merge without `--no-edit`. `:q` and <kbd>Enter</kbd> |
| `fatal: Need to specify how to reconcile divergent branches.` | Plain `git pull`. `git pull --no-rebase` |
| Someone commits a file with `<<<<<<<` still in it | Git doesn't check. Delete the markers, save, `git add`, commit again |
| A shared pull request changes a station ID line, or several slots | Comment on it, ask for a fixing commit, or close it and ask for a new one. Merging it can make the next ones conflict |
| GitHub or the network is slow | Anyone who can't fork does Task 3 again or Task 4. Show the conflict on your own `running-order`: two branches, line 1 on both. Branches, merges and conflicts need no network; only clone, push and pull do |
| Fewer than two volunteers for slot 20 | Make the second slot-20 change yourself: in `kdxr-tonight` on GitHub, the pencil on `running-order.txt`, change slot 20, **Create a new branch for this commit and start a pull request**, **Propose changes**, **Create pull request**. Merge the volunteer's first and yours last |
