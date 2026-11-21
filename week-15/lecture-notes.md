# Week 15 — Lecture Notes: The Running Order

Further reading for the lab. **Nothing here is graded, and the lab works without it.** The lab says *what* to do; these notes say *why* git does what it does. Every output below was copied from a real run, and every commit code in it (`ba3db3e`, …) will be different on your machine.

> [!NOTE]
> **The basics, if you want them again:** your instructor's [Git Tutorial](https://github.com/jgrissom/GitTutorial) covers `init`, `status`, `add`, `commit`, branches, push, `.gitignore`, clone and pull, on one small text file.

## Why one song per line

Git stores whole files, but it **compares** them line by line. When it shows you a change, merges two branches, or reports a conflict, the unit is a line. A file with one item per line, like `running-order.txt`, lets you see exactly what git is comparing. Your C# files work the same way: one statement per line is why a change to one method rarely gets in the way of a change to another.

## Which changes git can put together

A merge starts from three versions of the file: the one both branches started from, and each branch's version. Git works out what each branch changed compared with the starting version, then tries to apply both.

| The two changes | What git does |
|---|---|
| At least one unchanged line between them | applies both, by itself |
| On lines next to each other | stops: a conflict |
| On the same line | stops: a conflict |

**Lines 1 and 3 merge cleanly.** Line 2 is unchanged in both branches, so it separates the two changes:

```
Auto-merging running-order.txt
Merge made by the 'ort' strategy.
```

## Why lines next to each other conflict

**Lines 5 and 6 conflict, even though they're different lines.** Git groups changed lines with any changed lines touching them into one region. Line 5 changed on one branch and line 6 on the other, nothing unchanged sits between them, so to git they are one region that both branches changed. It can't know whether the second change was meant to sit beside the first one, so it asks you:

```
Auto-merging running-order.txt
CONFLICT (content): Merge conflict in running-order.txt
Automatic merge failed; fix conflicts and then commit the result.
```

So **"different lines merge cleanly" is not the rule.** The rule is: *an unchanged line between them*. One is enough.

This is also why a running order with a station ID after every song works for a whole room at once: every song line has an unchanged line under it, so any two people's songs can be merged with each other.

## Reading the conflict markers

Git leaves both versions of the region in the file, between three marker lines:

```
<<<<<<< HEAD
Harbor Lights - Marguerite Vance
Night Ferry - The Ferrymen
=======
Low Tide Waltz - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
>>>>>>> pham
```

- **`<<<<<<< HEAD`** starts the version on the branch you're standing on. `HEAD` always means *where you are*, so when you merge into `main`, it's `main`'s version.
- **`=======`** separates the two versions.
- **`>>>>>>> pham`** ends the version coming in, and names it. After a `git pull` it names a commit instead of a branch, with a long code like `4299b3251600530981f26e1f007fec8d34d0c73a`.

**Each side holds the whole region, not just its own change.** Above, `HEAD`'s two lines are Bex's new line 5 and the old line 6; `pham`'s are the old line 5 and Pham's new line 6.

## Finishing a conflict by hand

**Delete the three marker lines, and keep the lines you want, in the order you want.** Then:

```bash
git add running-order.txt
git commit -m "bex and pham, both"
```

`git add` marks the conflict as finished, and the commit completes the merge. Until you commit, `git merge --abort` puts everything back the way it was before the merge.

⚠️ **"Keep both" is usually wrong when both sides changed something.** Keeping all four lines above gives this, and two of the songs in it were replaced on purpose:

```text
Harbor Lights - Marguerite Vance
Night Ferry - The Ferrymen
Low Tide Waltz - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
```

The right answer takes the **new** line from each side:

```text
Harbor Lights - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
```

When both sides changed the **same** line, keeping both puts two songs where one goes. Pick one.

**VS Code's buttons do the same edits.** Above each conflict it shows **Accept Current Change** (keep `HEAD`'s lines), **Accept Incoming Change** (keep the other side's), **Accept Both Changes** (keep all of them) and **Compare Changes**. None of the first three gives the right answer above: it needs one line from each side, which is an edit only you can make.

⚠️ **Git doesn't check that the markers are gone.** Commit a file with `<<<<<<<` still in it and that's what the commit holds. Read the file before you `git add` it.

## The merge message, and `--no-edit`

A merge that has to make a merge commit needs a message for it. Run in a terminal, `git merge` opens an editor to ask for one, and waits:

```text
hint: Waiting for your editor to close the file...
```

Nothing in this course sets which editor that is, so on many machines it's a terminal editor, a screen of `~` lines that `:q` and <kbd>Enter</kbd> closes. **`git merge --no-edit <branch>` uses git's own message** (`Merge branch 'nurse'`) and opens nothing. A merge that conflicts doesn't ask until you commit, and `git commit -m` gives it the message.

## Pull is fetch, then merge

`git pull` is two commands: **fetch** GitHub's new commits, then **merge** them into the branch you're on. When only GitHub has new commits, the merge is a fast-forward and nothing can go wrong. When you **both** have new commits, the branches have *diverged*, and plain `git pull` may refuse:

```
fatal: Need to specify how to reconcile divergent branches.
```

It's asking whether to merge or to *rebase* (copy your commits on top of GitHub's). This course merges. **`git pull --no-rebase`** says so, and works whatever your machine's settings are.

A rejected push is the same situation seen from the other side:

```
 ! [rejected]        main -> main (fetch first)
```

GitHub has a commit you don't, and a push that replaced it would throw it away. Pull, finish any conflict, push again.

## A pull request that conflicts

GitHub tries the merge for every pull request, the way `git merge` would. Two states matter:

- **Behind, but it still merges.** Other pull requests went in after this one was opened, and none of them changed its lines or the lines next to them. GitHub merges it as it is. Nobody has to update anything.
- **It conflicts.** Something already merged changed the same lines, or the lines next to them. GitHub won't merge it until the branch is fixed.

There are two ways to fix one, and both are the conflict you already know how to finish:

**The pull request's author** merges `main` into the branch, finishes the conflict, and pushes the branch. The pull request updates itself and can be merged:

```bash
git pull --no-rebase origin main
```

**The person merging** fetches the pull request's commits by its number, merges them into `main` locally, finishes the conflict, and pushes `main`. GitHub sees the pull request's commits in `main` and marks it **Merged** by itself:

```bash
git fetch origin pull/2/head:closer-two
```

```bash
git merge --no-edit closer-two
```

GitHub keeps every pull request's commits at `pull/<number>/head`, even when they come from someone's fork. That's why the second way works on a pull request from a fork: the person merging can't push to the fork, but they can fetch its commits by the number.

## Reviewing your own pull request

**GitHub won't let you approve your own pull request.** On a repo you work on alone, a review is comments: open **Files changed**, click the **+** beside a line, and write what you'd ask a teammate. Then answer each comment with a commit on the same branch. The pull request shows the new commit under the comment, and that is the record of the review.

## Forks

A **fork** is a copy of someone else's repo that belongs to you. You can push to your fork and not to theirs, so a change goes on a branch of your fork, and a pull request from that branch asks the owner to take it. When the owner merges other people's pull requests, your fork doesn't see them until you bring them in: GitHub's **Sync fork** button on your fork's page does that.

## Troubleshooting appendix

| What you see | Why |
|---|---|
| `fatal: Need to specify how to reconcile divergent branches.` | Plain `git pull` on diverged branches. Use `git pull --no-rebase`. |
| `! [rejected] main -> main (fetch first)` | GitHub has a commit you don't. Pull, then push. |
| `CONFLICT (content): Merge conflict in running-order.txt` | Both branches changed one region. Finish it by hand. |
| `error: you need to resolve your current index first` | A conflict is still open. Finish it, or `git merge --abort`. |
| `hint: Waiting for your editor to close the file...` | The merge wants a message. Close the editor, and use `--no-edit` next time. |
| `fatal: not a git repository` | The terminal isn't inside the repo. |
| A repo inside another repo | You ran `git clone` or `git init` inside a folder that was already a repo. Delete the inner folder and clone beside it instead. |

**Prev:** [Week 14 notes](../week-14/lecture-notes.md)
