# Week 15 Lab — The Running Order 📻

It's 3 AM at **KDXR 88.1, "The Owl,"** and the night's songs live in one plain text file, `running-order.txt`, **one song per line**. Callers phone in requests, and two people at the desk take the calls, the DJ and the producer, on two phone lines. Each one fits a request in by replacing a song. The callers never see the file. Tonight you play both people at the desk, and the two of them change that file at the same time, over and over, and you find out when git can put their two changes together by itself, when it can't, and how you finish the job by hand.

There is no C# tonight. The file is plain text on purpose: git compares files **line by line**, and a file with one song per line lets you see exactly what it is comparing. ([Why one song per line](../lecture-notes.md#why-one-song-per-line).)

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices.

> [!IMPORTANT]
> **Nothing tonight is graded, and nothing is collected.** In a short term, this is the week that gets dropped. Everything below works **on your own, start to finish**: you need a GitHub account and VS Code, and nobody else.

> [!NOTE]
> **Shaky on the git basics?** Your instructor's [Git Tutorial](https://github.com/jgrissom/GitTutorial) walks through the commands, branches, pushing, cloning and pulling on one small text file. Tonight starts where it stops.

> [!NOTE]
> **In class, the whole room also works on one shared running order**, in [*In class: the shared running order*](#in-class-the-shared-running-order). Working alone? [Task 4](#task-4-in-full) does the same thing in your own repo.

## Setup

Five steps. Tonight's practice repo is a **new repo of its own**, and it sits **beside** your coursework repo, never inside it. A repo made inside another repo is a repo inside a repo, and git gets confused about which one a command is for.

**1. Make the practice repo on GitHub.** In your browser, on [github.com](https://github.com):

- Click **+** (top right) → **New repository**
- **Repository name:** `running-order`
- Choose **Private**
- Tick **Add a README file**
- Click **Create repository**

The README gives the repo a first commit, so there is a `main` branch to clone.

**2. Clone it beside your coursework repo.** In VS Code, open the window you keep on `dotnet-db-coursework` and open its terminal with `` Ctrl+` `` (the same key on Mac and Windows). It opens standing at the top of your coursework repo. Step out of it, into the folder that holds it:

```bash
cd ..
```

Then clone the practice repo there. Swap `YOUR-NAME` for your GitHub username, or copy the whole address from the green **Code** button on your repo's page:

```bash
git clone https://github.com/YOUR-NAME/running-order.git
```

```
Cloning into 'running-order'...
```

`running-order` now sits next to `dotnet-db-coursework`, in the same folder as `dotnet-db-starters`.

**3. Open it in a window of its own.** In VS Code: **File → New Window**, then in the new window **File → Open Folder…**, go to the folder that holds `dotnet-db-coursework`, choose **`running-order`** and click **Open**. One window per repo, the same as your project. Open this window's terminal with `` Ctrl+` ``: it opens standing in `running-order`, and **every command from here on runs in this terminal.** You can close the `dotnet-db-coursework` window now: nothing else tonight uses it.

**4. Make the file.** In VS Code's Explorer (the file list on the left of this window), click the **New File** icon next to `RUNNING-ORDER`, type `running-order.txt`, and press <kbd>Enter</kbd>. Paste these eight lines into it, then save with <kbd>⌘S</kbd> / <kbd>Ctrl+S</kbd>:

```text
Nightjar - The Lamplighters
Slack Water - Marguerite Vance
Long Way Round - The Ferrymen
Lantern Hours - The Lamplighters
Low Tide Waltz - Marguerite Vance
Night Ferry - The Ferrymen
Quiet Road - The Hollis Strings
Last Call - The Lamplighters
```

**5. Commit it and push it.** Stage the file and save it as a commit:

```bash
git add running-order.txt
git commit -m "tonight's running order"
```

```
[main ba3db3e] tonight's running order
 1 file changed, 8 insertions(+)
 create mode 100644 running-order.txt
```

Then send it to GitHub:

```bash
git push
```

The last lines say where it went:

```
To https://github.com/YOUR-NAME/running-order.git
   6815106..ba3db3e  main -> main
```

Then look at the history, one line per commit:

```bash
git log --oneline
```

```
ba3db3e tonight's running order
6815106 Initial commit
```

**Your seven-character codes are different.** Every commit gets its own; the messages and the shape are what to look at.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Finished early? Open your repo on GitHub and click `running-order.txt`: the eight songs are there. Working at home? Carry straight on.

## Where tonight's work happens

```text
the folder that holds your repos
├─ dotnet-db-coursework/   ← untouched tonight
├─ dotnet-db-starters/     ← untouched tonight
└─ running-order/          ← tonight's practice repo, in its own VS Code window
   ├─ README.md            ← made by GitHub
   └─ running-order.txt    ← the eight songs
```

## Which changes git can put together

Two people change the same file. Git compares each change with the version they both started from, **line by line**:

| The two changes | What git does |
|---|---|
| **At least one unchanged line between them** | puts both in, by itself |
| **On lines next to each other** | stops: a **conflict** |
| **On the same line** | stops: a **conflict** |

⚠️ **"Different lines merge cleanly" is not the rule.** Two changes on lines next to each other are different lines, and git still stops. Task 1 shows the clean case, and Task 2 shows the other one. [The notes say why.](../lecture-notes.md#which-changes-git-can-put-together)

## How to finish a conflict by hand

When git stops, it leaves both versions in the file, between three marker lines:

```text
<<<<<<< HEAD
the lines as they are on the branch you're on
=======
the lines as they are on the branch coming in
>>>>>>> the branch coming in
```

**The one rule: delete the three marker lines, and keep the lines you want, in the order you want.** Then save, `git add` the file, and commit. ([The notes take it slower.](../lecture-notes.md#finishing-a-conflict-by-hand))

⚠️ **The trap is "keep both".** When both sides changed something, keeping both brings back the lines each side replaced. Task 2 shows exactly what that does to the running order.

VS Code puts four buttons above each conflict: **Accept Current Change**, **Accept Incoming Change**, **Accept Both Changes** and **Compare Changes**. They are a shortcut for the same edit. Do it by hand first, so you know what each button does to the lines.

## The tasks

There are no checks tonight. **The evidence is the file and `git log --graph --oneline`**, which draws the history with its branches.

| Task | What you do | What you should see |
|---|---|---|
| 1 | Two branches, on lines with one unchanged line between them. Merge both | Both songs in the file, and no conflict. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | Two branches, on lines next to each other. Merge both | A conflict, finished by hand. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | The same line, changed on GitHub and on your laptop | A rejected push, a pull, and a conflict. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | Two pull requests on one line, and a review | A pull request that conflicts, then merges. **[Task 4 in full ↓](#task-4-in-full)** |

### Task 1 in full

**Two requests, on lines 1 and 3. Line 2 sits between them, and nobody touches it.** Teodoro calls to dedicate a song to Junie, so line 1 gets his dedication. On the other phone line, the nurse on the 2 AM break at St. Agnes asks for something quiet, and it goes on line 3.

**1. Teodoro's request, on a branch of its own:**

```bash
git checkout -b teodoro
```

**How to replace a line, every time tonight:** copy the new line, click at the **end** of the line you're changing, press <kbd>⇧⌘←</kbd> / <kbd>Shift+Home</kbd> to select back to its start, and paste. Don't click the line number to select it: that selects the line break too, and the paste joins two songs into one line. **The file always has eight songs**, so after each change, check that line 8 is still the last song.

Replace **line 1**, `Nightjar - The Lamplighters`, with this, and save:

```text
Nightjar - The Lamplighters (for Junie)
```

Before you commit, look at what you changed. [`git diff`](../lecture-notes.md#seeing-a-change-before-and-after-you-commit) compares the file with your last commit, line by line:

```bash
git diff
```

```
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..72733ba 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,4 +1,4 @@
-Nightjar - The Lamplighters
+Nightjar - The Lamplighters (for Junie)
 Slack Water - Marguerite Vance
 Long Way Round - The Ferrymen
 Lantern Hours - The Lamplighters
```

The red line, starting with `-`, is line 1 as it was in your last commit. The green line, starting with `+`, is line 1 as it is now. The lines with no color didn't change: git shows a few of them so you can see where the change is. **One red line and one green line is one line replaced.** If you see more, a paste joined or split a line: fix the file before you commit.

Commit it:

```bash
git add running-order.txt
git commit -m "teodoro's request"
```

Now look at the commit you just made. `git show` shows a commit and the change inside it:

```bash
git show --oneline
```

```
2fdbeef teodoro's request
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..72733ba 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,4 +1,4 @@
-Nightjar - The Lamplighters
+Nightjar - The Lamplighters (for Junie)
 Slack Water - Marguerite Vance
 Long Way Round - The Ferrymen
 Lantern Hours - The Lamplighters
```

Your commit's code and message, then the same change. `git diff` shows changes you haven't committed yet. Once a change is committed, `git show` is how you see it. (Your code is different from `2fdbeef`.)

**2. Back to `main`, and the nurse's request on a second branch.** Going back first means the second branch starts from the same file the first one did, the way two people would:

```bash
git checkout main
```

Look at line 1: it's `Nightjar - The Lamplighters` again. Teodoro's change is on the `teodoro` branch, not on `main`.

```bash
git checkout -b nurse
```

Replace **line 3**, `Long Way Round - The Ferrymen`, with this, and save:

```text
Quiet Ward - The Hollis Strings
```

The same three steps as Teodoro's: look at the change, commit it, look at the commit.

```bash
git diff
```

```
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..5646ee8 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,6 +1,6 @@
 Nightjar - The Lamplighters
 Slack Water - Marguerite Vance
-Long Way Round - The Ferrymen
+Quiet Ward - The Hollis Strings
 Lantern Hours - The Lamplighters
 Low Tide Waltz - Marguerite Vance
 Night Ferry - The Ferrymen
```

Line 1 has no color here, because this branch started from `main`, before Teodoro's change.

```bash
git add running-order.txt
git commit -m "the 2 AM break"
```

```bash
git show --oneline
```

```
50222f8 the 2 AM break
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..5646ee8 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,6 +1,6 @@
 Nightjar - The Lamplighters
 Slack Water - Marguerite Vance
-Long Way Round - The Ferrymen
+Quiet Ward - The Hollis Strings
 Lantern Hours - The Lamplighters
 Low Tide Waltz - Marguerite Vance
 Night Ferry - The Ferrymen
```

**3. Merge both into `main`.** Back to `main` first:

```bash
git checkout main
```

Merge Teodoro's branch. `--no-edit` tells git to use its own message for the merge, instead of opening an editor to ask you for one:

```bash
git merge --no-edit teodoro
```

```
Updating ba3db3e..2fdbeef
Fast-forward
 running-order.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

*Fast-forward* means `main` hadn't changed since the branch started, so git just moved `main` up to it. Compare `main` with GitHub's copy, which is still the file you pushed in Setup:

```bash
git diff origin/main
```

```
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..72733ba 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,4 +1,4 @@
-Nightjar - The Lamplighters
+Nightjar - The Lamplighters (for Junie)
 Slack Water - Marguerite Vance
 Long Way Round - The Ferrymen
 Lantern Hours - The Lamplighters
```

One change so far, Teodoro's. Line 3 is still `Long Way Round`, with no color: the nurse's branch isn't merged yet. Now the nurse's branch:

```bash
git merge --no-edit nurse
```

```
Auto-merging running-order.txt
Merge made by the 'ort' strategy.
 running-order.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

This time `main` *had* changed (it has Teodoro's line now), so git compared both changes with the file they started from, found an unchanged line between them, and made a merge commit holding both. Look at the file:

```
Nightjar - The Lamplighters (for Junie)
Slack Water - Marguerite Vance
Quiet Ward - The Hollis Strings
Lantern Hours - The Lamplighters
Low Tide Waltz - Marguerite Vance
Night Ferry - The Ferrymen
Quiet Road - The Hollis Strings
Last Call - The Lamplighters
```

**4. Look at the history:**

```bash
git log --graph --oneline
```

```
*   190e5b4 Merge branch 'nurse'
|\  
| * 50222f8 the 2 AM break
* | 2fdbeef teodoro's request
|/  
* ba3db3e tonight's running order
* 6815106 Initial commit
```

Read it from the bottom up. The two lines split after `tonight's running order` (one per branch) and join again at the merge.

**5. Check what you're about to push.** The same [`git diff origin/main`](../lecture-notes.md#checking-what-youre-about-to-push) as after Teodoro's merge. GitHub still has the file you pushed in Setup, so this shows everything you're about to send:

```bash
git diff origin/main
```

```
diff --git a/running-order.txt b/running-order.txt
index ec5bfbd..ce97fc1 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -1,6 +1,6 @@
-Nightjar - The Lamplighters
+Nightjar - The Lamplighters (for Junie)
 Slack Water - Marguerite Vance
-Long Way Round - The Ferrymen
+Quiet Ward - The Hollis Strings
 Lantern Hours - The Lamplighters
 Low Tide Waltz - Marguerite Vance
 Night Ferry - The Ferrymen
```

A red line, starting with `-`, is the line as GitHub has it. A green line, starting with `+`, is the line as you have it. Two lines changed, line 1 and line 3, and line 2 between them didn't. Both requests are in.

**6. Push it:**

```bash
git push
```

```
To https://github.com/YOUR-NAME/running-order.git
   ba3db3e..190e5b4  main -> main
```

> [!NOTE]
> **Did an editor open, with a message about a merge?** You merged without `--no-edit`. The editor is asking for the merge's message, and git waits until it closes. In VS Code, close the tab. In a terminal editor (a screen full of `~` lines), type `:q` and press <kbd>Enter</kbd>. ([More on the merge message](../lecture-notes.md#the-merge-message-and---no-edit).)

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Open your repo on GitHub and click **Commits**: the two requests and the merge are there. Don't merge anything else into `main` yet: Task 2 needs the file exactly as it is now. Working at home? Carry straight on.

### Task 2 in full

**Two requests, on lines 5 and 6. They are next to each other.** Bex calls (she only ever asks for Marguerite Vance), and her request goes on line 5. On the other line, Pham's Bakery wants something loud, and it goes on line 6.

**1. Bex's request:**

```bash
git checkout -b bex
```

Replace **line 5**, `Low Tide Waltz - Marguerite Vance`, with this, and save:

```text
Harbor Lights - Marguerite Vance
```

```bash
git add running-order.txt
git commit -m "bex's request"
```

**2. Pham's request, from `main`:**

```bash
git checkout main
```

```bash
git checkout -b pham
```

Replace **line 6**, `Night Ferry - The Ferrymen`, with this, and save:

```text
Two Hundred Rolls - The Ovenbirds
```

```bash
git add running-order.txt
git commit -m "pham's request"
```

**3. Merge both into `main`:**

```bash
git checkout main
```

```bash
git merge --no-edit bex
```

```
Fast-forward
```

```bash
git merge --no-edit pham
```

```
Auto-merging running-order.txt
CONFLICT (content): Merge conflict in running-order.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Two different lines, and git stopped anyway, because they are next to each other. To git, lines 5 and 6 are one region of the file, and both branches changed it.

**4. Look at what git left in the file.** Open `running-order.txt`. This is the file exactly as git leaves it:

```
Nightjar - The Lamplighters (for Junie)
Slack Water - Marguerite Vance
Quiet Ward - The Hollis Strings
Lantern Hours - The Lamplighters
<<<<<<< HEAD
Harbor Lights - Marguerite Vance
Night Ferry - The Ferrymen
=======
Low Tide Waltz - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
>>>>>>> pham
Quiet Road - The Hollis Strings
Last Call - The Lamplighters
```

- **`HEAD`** is the branch you're standing on, `main`. Its two lines are Bex's song on line 5, and line 6 as it was.
- **`pham`** is the branch coming in. Its two lines are line 5 as it was, and Pham's song on line 6.

Each side shows **both** lines of the region, the one it changed and the one it didn't. That is what makes "keep both" wrong here. ([Reading the conflict markers](../lecture-notes.md#reading-the-conflict-markers).)

**5. Ask git where things stand:**

```bash
git status
```

```
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   running-order.txt
```

**6. Finish it by hand.** You want Bex's song on line 5 and Pham's on line 6. So, in the file:

- delete the three marker lines: `<<<<<<< HEAD`, `=======` and `>>>>>>> pham`
- delete `Night Ferry - The Ferrymen` (line 6 as it was, replaced by Pham's song)
- delete `Low Tide Waltz - Marguerite Vance` (line 5 as it was, replaced by Bex's song)

Save it. The file should end up exactly like this:

```
Nightjar - The Lamplighters (for Junie)
Slack Water - Marguerite Vance
Quiet Ward - The Hollis Strings
Lantern Hours - The Lamplighters
Harbor Lights - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
Quiet Road - The Hollis Strings
Last Call - The Lamplighters
```

⚠️ **What "keep both" would have done.** **Accept Both Changes** deletes only the three marker lines and keeps all four lines between them:

```text
Lantern Hours - The Lamplighters
Harbor Lights - Marguerite Vance
Night Ferry - The Ferrymen
Low Tide Waltz - Marguerite Vance
Two Hundred Rolls - The Ovenbirds
Quiet Road - The Hollis Strings
```

Ten songs instead of eight. `Low Tide Waltz` is back, and it was taken out to make room for Bex's request. `Night Ferry` is back, and it was taken out for Pham's.

**7. Commit the finished file.** `git add` tells git the conflict is finished, and the commit completes the merge:

```bash
git add running-order.txt
git commit -m "bex and pham, both"
```

```bash
git log --graph --oneline
```

```
*   3ee4f4d bex and pham, both
|\  
| * cba69f8 pham's request
* | 1b70979 bex's request
|/  
*   190e5b4 Merge branch 'nurse'
```

The merge commit is the one you just made, with your message on it.

**8. Check what you're about to push.** GitHub has the file as Task 1 left it, so only Bex's line and Pham's line should be different:

```bash
git diff origin/main
```

```
diff --git a/running-order.txt b/running-order.txt
index ce97fc1..fdb3232 100644
--- a/running-order.txt
+++ b/running-order.txt
@@ -2,7 +2,7 @@ Nightjar - The Lamplighters (for Junie)
 Slack Water - Marguerite Vance
 Quiet Ward - The Hollis Strings
 Lantern Hours - The Lamplighters
-Low Tide Waltz - Marguerite Vance
-Night Ferry - The Ferrymen
+Harbor Lights - Marguerite Vance
+Two Hundred Rolls - The Ovenbirds
 Quiet Road - The Hollis Strings
 Last Call - The Lamplighters
```

Two songs out and two songs in, and nothing else. If you see more green lines than red ones, a song you meant to delete is still in the file: delete it, save, then `git add` the file and commit again before you push.

**9. Push it:**

```bash
git push
```

> [!NOTE]
> **Want to stop and start the merge again?** Before you commit, `git merge --abort` puts the file back the way it was before `git merge --no-edit pham`.

> [!NOTE]
> **In class, stop here.** Task 3 comes after the break and the next part of the demo. Finished early? Read *Which changes git can put together* again, and predict: would changes to line 2 and line 4 conflict? Keep the prediction; [*Now try to break it*](#now-try-to-break-it) tests it after Task 4. Working at home? Carry straight on.

### Task 3 in full

**One line, changed in two places.** The music director edits the running order on GitHub, from the office. You edit the same line on your laptop, without pulling first. Then you push.

**1. The edit on GitHub.** In your browser, on your `running-order` repo:

- click `running-order.txt`, then the **pencil** (*Edit this file*)
- replace **line 8**, `Last Call - The Lamplighters`, with this:

```text
Last Call - The Lamplighters (radio edit)
```

- click **Commit changes…**, leave **Commit directly to the `main` branch** chosen, and click **Commit changes**

GitHub's `main` now has a commit your laptop doesn't.

**2. The edit on your laptop.** Back in VS Code, on `main`. Replace **line 8**, `Last Call - The Lamplighters`, with Ray's request instead, and save:

```text
Mile 240 - The Ferrymen
```

```bash
git add running-order.txt
git commit -m "ray's request"
```

**3. Push it, and read the answer:**

```bash
git push
```

```
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/YOUR-NAME/running-order.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
```

Nothing is lost. GitHub has a commit you don't have, and git won't let your push throw it away.

**4. Pull GitHub's commit in, and merge it.** The hint says `git pull`. On many machines plain `git pull` refuses here, with `fatal: Need to specify how to reconcile divergent branches.` Tell it to merge:

```bash
git pull --no-rebase
```

```
Auto-merging running-order.txt
CONFLICT (content): Merge conflict in running-order.txt
Automatic merge failed; fix conflicts and then commit the result.
```

A pull is two steps: fetch GitHub's commits, then merge them into your branch. The merge is where it stopped.

**5. Look at what git left in the file:**

```
Quiet Road - The Hollis Strings
<<<<<<< HEAD
Mile 240 - The Ferrymen
=======
Last Call - The Lamplighters (radio edit)
>>>>>>> 4299b3251600530981f26e1f007fec8d34d0c73a
```

The long code after `>>>>>>>` is GitHub's commit (yours is different). It names the side coming in, the way `pham` did in Task 2.

**6. Finish it by hand.** One line, one song. Keeping both would put two songs where one goes. Here Ray's request wins: delete the three marker lines and `Last Call - The Lamplighters (radio edit)`, and save. The last line of the file is:

```text
Mile 240 - The Ferrymen
```

```bash
git add running-order.txt
git commit -m "ray keeps the last slot"
```

**7. Push again. This time it goes:**

```bash
git push
```

```
To https://github.com/YOUR-NAME/running-order.git
   4299b32..f968122  main -> main
```

```bash
git log --graph --oneline
```

```
*   f968122 ray keeps the last slot
|\  
| * 4299b32 Update running-order.txt
* | 035f021 ray's request
|/  
```

`Update running-order.txt` is the commit you made on GitHub. That's GitHub's message when you don't write one.

> [!NOTE]
> **In class, stop here.** Next is the shared running order, with the whole room: [*In class: the shared running order*](#in-class-the-shared-running-order). Finished early? On GitHub, click **Commits** on your repo and find `Update running-order.txt`, the commit you made in the browser. Working at home? Skip that section and go straight to [Task 4](#task-4-in-full).

## In class: the shared running order

Your instructor's public repo, [`jgrissom/kdxr-tonight`](https://github.com/jgrissom/kdxr-tonight), holds one `running-order.txt` with twenty numbered slots. **Your instructor gives you a slot number.** Each slot is a line of its own, with an unchanged `-- station ID --` line under it, so every slot can be merged with every other one.

You can't push to your instructor's repo, so you **fork** it: GitHub makes a copy of it that belongs to you. Your change goes on a branch of your fork, and a pull request asks your instructor to take it. ([Forks](../lecture-notes.md#forks).)

<!-- UNVERIFIED (needs a second GitHub account): steps 1–4 and 6 are the student side of a fork, written from GitHub's current pages but not walked from a non-owner account. -->

**1. Fork it.** Open [`jgrissom/kdxr-tonight`](https://github.com/jgrissom/kdxr-tonight), click **Fork** (top right), then **Create fork**. You land on `YOUR-NAME/kdxr-tonight`.

**2. Change your slot, on GitHub.** On your fork, click `running-order.txt`, then the **pencil**. Find your slot's line, for example `07  (open)`, and replace `(open)` with a song. Keep the number and the two spaces. **Change nothing else**, and leave every `-- station ID --` line alone:

```text
07  Interstate Blue - The Ferrymen
```

**3. Commit it to a new branch.** Click **Commit changes…**, choose **Create a new branch for this commit and start a pull request**, name the branch `slot-07` (your number), and click **Propose changes**.

**4. Open the pull request.** Check the line at the top: **base repository: `jgrissom/kdxr-tonight`**, **base: `main`**, and on the right your fork and `slot-07`. Click **Create pull request**.

**5. Watch the projector.** Your instructor merges the pull requests in the order they arrive. Most of them are *behind* by the time they're merged, because others went in first, and they merge anyway: the slots have unchanged lines between them. **The two that both changed slot 20 don't.**

**6. Get everyone's songs into your fork.** After the merges, on your fork's page, click **Sync fork**, then **Update branch**. Open `running-order.txt`: the whole room's running order.

> [!NOTE]
> **In class, stop here.** After the break, the rest of the night is practice for week 16: [*In class: practice for week 16*](#in-class-practice-for-week-16). Finished early? Start [Task 4](#task-4-in-full) in your own repo, which is the same session on your own. Working at home? Task 4 is next.

### Task 4 in full

**Two pull requests on the same line, in your own repo, and a review before you merge.** This is the shared running order on your own: two branches change line 2, one pull request merges, and the other conflicts.

**1. The first branch. The producer gives line 2 to Pham's Bakery, who want something loud:**

```bash
git checkout -b loud
```

Replace **line 2**, `Slack Water - Marguerite Vance`, with this, and save:

```text
Ovens On - The Ovenbirds
```

```bash
git add running-order.txt
git commit -m "something loud for the bakery"
```

Push the branch to GitHub. `-u origin loud` makes a `loud` branch on GitHub too:

```bash
git push -u origin loud
```

```
remote: Create a pull request for 'loud' on GitHub by visiting:        
remote:      https://github.com/YOUR-NAME/running-order/pull/new/loud        
remote: 
To https://github.com/YOUR-NAME/running-order.git
 * [new branch]      loud -> loud
branch 'loud' set up to track 'origin/loud'.
```

**2. The second branch, from `main`. Meanwhile the DJ gives the same line to the ward, who want something quiet:**

```bash
git checkout main
```

```bash
git checkout -b quiet
```

Replace **line 2**, `Slack Water - Marguerite Vance`, with this, and save:

```text
Slack Water - Marguerite Vance (acoustic)
```

```bash
git add running-order.txt
git commit -m "something quiet for the ward"
```

```bash
git push -u origin quiet
```

**3. Open both pull requests.** On GitHub, on your repo: **Pull requests → New pull request**, **base: `main`**, **compare: `loud`**, **Create pull request**, and **Create pull request** again on the next page. Then the same for **`quiet`**. Neither one conflicts yet: each branch, on its own, changes only line 2 of the file it started from.

**4. Merge `loud`.** Open its pull request and click **Merge pull request**, then **Confirm merge**, the way you've merged your project's every week.

**5. Look at `quiet`'s pull request again.** It conflicts now. `main` has Pham's line 2, and `quiet` changes the same line from the file before it. GitHub can't merge it, and won't until the branch is fixed. ([A pull request that conflicts](../lecture-notes.md#a-pull-request-that-conflicts).)

**6. Review it before you fix it.** GitHub doesn't let you approve your own pull request, so a review of your own is comments, and you answer each one with a commit ([the notes say more](../lecture-notes.md#reviewing-your-own-pull-request)). On `quiet`'s pull request, click **Files changed**, hover over line 2, click the blue **+**, write:

```text
Loud just went in on this line. Which one plays at 2 AM?
```

and click **Add single comment**.

**7. Answer it with a commit.** In VS Code you're still on `quiet`. Merge GitHub's `main` into it:

```bash
git pull --no-rebase origin main
```

```
Auto-merging running-order.txt
CONFLICT (content): Merge conflict in running-order.txt
Automatic merge failed; fix conflicts and then commit the result.
```

The file, as git leaves it:

```
Nightjar - The Lamplighters (for Junie)
<<<<<<< HEAD
Slack Water - Marguerite Vance (acoustic)
=======
Ovens On - The Ovenbirds
>>>>>>> f23eceb15e6a8e29b9c2f5703e6bbbb08cdc99bf
Quiet Ward - The Hollis Strings
```

`HEAD` is `quiet` this time, because that's the branch you're on, and the side coming in is `main`. The ward is on its break at 2 AM, so the quiet one plays: delete the three marker lines and `Ovens On - The Ovenbirds`, save, and line 2 is:

```text
Slack Water - Marguerite Vance (acoustic)
```

```bash
git add running-order.txt
git commit -m "the ward gets the quiet one"
```

```bash
git push
```

**8. Merge it.** Back on GitHub, `quiet`'s pull request no longer conflicts. Under your comment, reply *"The ward is on break at 2 AM. Quiet wins."*, then **Merge pull request** and **Confirm merge**.

**9. Bring your laptop's `main` up to date:**

```bash
git checkout main
```

```bash
git pull --no-rebase
```

```
Fast-forward
```

Line 2 of your file is now `Slack Water - Marguerite Vance (acoustic)`, and both pull requests show **Merged** on GitHub.

## In class: practice for week 16

The rest of the night is for your semester project. Week 16 you present it, in four parts: **it runs** from start to finish, **you show** what it does, **you explain one decision** you made and why, and **you say what's next**. Switch to your project repo's VS Code window.

1. **Run it start to finish, the way you'll show it.** Write down anything that goes wrong, and fix it first.
2. **Give the whole thing out loud, to the person next to you.** All four parts. They time it, and ask you one question at the end. Then swap.
3. **Fix the one thing you noticed**, and push it. Your project goes on a branch and merges with a pull request, the same as every week.

Working alone? Do all three, and give it out loud to your screen.

## Now try to break it

Do these after Task 4. Each one changes `main`, and the tasks need the file exactly as each one leaves it.

- Make two branches that change **line 2 and line 4**, and predict before you merge: is one unchanged line between them enough? Then try **line 3 and line 4**.
- Start a merge that conflicts, then `git merge --abort`. Run `git status`: the conflict is gone, and so is the merge.
- Finish a conflict with **Accept Both Changes**, look at the file, and count the songs. Then undo it with <kbd>⌘Z</kbd> / <kbd>Ctrl+Z</kbd> and do it by hand.

## ⭐ Done early?

- **Read the conflict in VS Code's Source Control view.** Start a conflicting merge and open the Source Control view: the file is listed under **Merge Changes**, and clicking it opens the same markers.
- **Make the same conflict twice, from opposite sides.** Merge `bex` into `pham` instead of `pham` into `main`. Which side is `HEAD` now?
- **Read the [notes on why lines next to each other conflict](../lecture-notes.md#why-lines-next-to-each-other-conflict).**

## 🆘 Stuck?

The notes' [troubleshooting appendix](../lecture-notes.md#troubleshooting-appendix) has the same messages, with why.

| What you see | What it means, and what to do |
|---|---|
| `fatal: Need to specify how to reconcile divergent branches.` | Plain `git pull` won't choose between merging and rebasing for you. Use `git pull --no-rebase`. [The notes say more.](../lecture-notes.md#pull-is-fetch-then-merge) |
| `! [rejected] main -> main (fetch first)` | GitHub has a commit you don't. `git pull --no-rebase`, finish any conflict, then `git push` again. |
| An editor opened after `git merge` or `git pull` | Git is asking for the merge commit's message. Close the VS Code tab, or type `:q` and <kbd>Enter</kbd> in a terminal editor. Next time add `--no-edit` to the merge. |
| `error: you need to resolve your current index first` | A conflict is still open. Finish it (delete the markers, save, `git add`, `git commit`), or `git merge --abort`. |
| `CONFLICT` on lines you're sure are different | Are they next to each other? To git that's one region. [The notes show it.](../lecture-notes.md#why-lines-next-to-each-other-conflict) |
| You committed a file with `<<<<<<<` still in it | You didn't delete them, or you didn't save before `git add`. Delete the marker lines, save, `git add`, and commit again. Git doesn't check for markers. |
| `fatal: destination path 'running-order' already exists` | You've cloned it before. Open the folder you have, or delete it and clone again. |
| `fatal: not a git repository` | Your terminal isn't in `running-order`. Open the terminal of the `running-order` window, the one from Setup step 3. |
| `git clone` put `running-order` inside `dotnet-db-coursework` | You skipped `cd ..`. Delete the inner `running-order` folder in VS Code's Explorer, then do Setup step 2 again. |

**Prev:** [Week 14 lab](../../week-14/lab/README.md)
