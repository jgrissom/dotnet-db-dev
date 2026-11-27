# Week 15 Demo — The Running Order 📻

**KDXR 88.1 · the overnight desk · one file, two people, and the room**

Tonight there is no C#. The running order is a plain text file, one song per line, and two people at the desk change it at once: the DJ and the producer, each taking calls on a phone line of their own. Callers ask for songs; the desk decides where they go. You show three cases on your own practice repo, and the students do each one on theirs: changes with a line between them merge by themselves, changes on lines next to each other conflict, and a change on GitHub fights a change on your laptop. Then the whole room sends pull requests to one shared file, and you finish its conflict on the projector. The second half of the night is practice for week 16.

> **The shape of the night:** lines apart → lines next to each other → GitHub against your laptop → the shared running order → practice for week 16. **Each demo segment is followed by the lab block that practices it.**
>
> **Two repos tonight, both yours:** your own practice repo **`running-order`** (`jgrissom/running-order`, made with the room in Lab A) for §2 to §4, and the shared **`kdxr-tonight`** (`jgrissom/kdxr-tonight`, made in §0) for §5 and Lab E. Each has its own VS Code window. Your demo repo, `dotnet-db-coursework`, is only where Lab A's clone starts.

**Total: ~53 minutes of demo, in seven short segments.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing?** Afterwards, put everything back so class starts clean:
>
> - **Delete your rehearsal `running-order` repo on GitHub:** its page → **Settings** → at the bottom, **Delete this repository**. Then delete the `running-order` folder beside your demo repo
> - **Put `kdxr-tonight` back to twenty open slots:** on GitHub, open `running-order.txt`, click the pencil, select everything, paste the block from the step below over it, and **Commit changes** to `main`. Close any rehearsal pull requests on its **Pull requests** tab
> - **Then pull your local clone of it** — the step below says how

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-15/demo/script.html) and confirm the top line says *one file, two people, and the room*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] ⚠️ **The shared repo `jgrissom/kdxr-tonight` exists, is public, and has twenty open slots.** If it doesn't exist yet: on GitHub, **+** → **New repository**, name `kdxr-tonight`, **Public**, tick **Add a README file**, **Create repository**. Then **Add file → Create new file**, name it `running-order.txt`, paste this, and **Commit changes** to `main`:

  ```text
  KDXR 88.1 - The Owl - the overnight running order

  01  (open)
      -- station ID --
  02  (open)
      -- station ID --
  03  (open)
      -- station ID --
  04  (open)
      -- station ID --
  05  (open)
      -- station ID --
  06  (open)
      -- station ID --
  07  (open)
      -- station ID --
  08  (open)
      -- station ID --
  09  (open)
      -- station ID --
  10  (open)
      -- station ID --
  11  (open)
      -- station ID --
  12  (open)
      -- station ID --
  13  (open)
      -- station ID --
  14  (open)
      -- station ID --
  15  (open)
      -- station ID --
  16  (open)
      -- station ID --
  17  (open)
      -- station ID --
  18  (open)
      -- station ID --
  19  (open)
      -- station ID --
  20  (open)
      -- sign-off --
  ```

  Every slot has an unchanged line under it. That's what lets any two students' slots merge with each other
- [ ] ⚠️ **A clone of `kdxr-tonight` beside your demo repo.** You finish the room's conflict in it in Lab E, and nothing before that uses it. From the terminal of `dotnet-db-coursework`, step out:

  ```bash
  cd ..
  ```

  ```bash
  git clone https://github.com/jgrissom/kdxr-tonight.git
  ```

  Already cloned it? From its own terminal, bring it up to date instead:

  ```bash
  git pull --no-rebase
  ```

  No window needed for it until Lab E
- [ ] ⚠️ **No `running-order` repo on your GitHub, and no `running-order` folder beside your demo repo.** You make both with the room in Lab A
- [ ] **Signed in to GitHub in the browser you project**, so making a repo and merging pull requests needs no sign-in in front of the room
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select what you are talking about, so the back row can see which part you mean. A word: double-click it. A whole line: click its line number in the left margin. **In the terminal**, drag across the words
- [ ] 💡 **How to replace a line tonight:** click at the end of the line, press <kbd>⇧⌘←</kbd> / <kbd>Shift+Home</kbd> to select back to its start, and paste the new line over it. Clicking the line number would select the line break too, and the paste would join two lines
- [ ] **A browser tab on the lab README** (`week-15/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **A second browser tab on `jgrissom/kdxr-tonight`'s Pull requests tab**, for Lab E
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · One file, two people

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the line below
- [ ] 📖 **Read the slide:** *"Tonight is about two people changing the same file. Git puts their two changes together by itself most of the time. Tonight we find out when it can't, and how you finish the job by hand. Then the whole room sends changes to one file of mine, and the second half of the night is practice for week sixteen."*
- [ ] 📖 *"There's no C# tonight. The file is KDXR's running order, one song per line, and it's plain text so you can see exactly what git compares."*

---

## Lab A · Setup, together — 12 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do every step on your own machine at the same time as the room: make your own `running-order` repo on GitHub, clone it beside your demo repo, open it in a new window, make the file, commit, push
- [ ] 📖 **At step 2, before `cd ..`:** *"This repo goes next to your coursework repo, not inside it. cd dot dot steps out of the coursework repo, into the folder that holds it."*
- [ ] **Run `git log --oneline` with the room, and say the shape:** *"Two commits. GitHub made the first one, with the README. The running order is the second."*

  ```bash
  git log --oneline
  ```

- [ ] ⚠️ **Every command from here on runs in the `running-order` window's terminal.** Say so once: *"From now on, everything happens in the new window. You can close the coursework window. Nothing else tonight uses it."*

---

## 2 · Lines apart

- [ ] 📂 **Repo: your own `running-order`, in its VS Code window.** The one you made with the room in Lab A, not a student's and not `kdxr-tonight`. §2 to §4 all happen here
- [ ] 📖 *"I'm working in my own running-order repo, the one I made with you in setup. Yours has the same eight songs."*
- [ ] 📖 **Open `running-order.txt` and highlight line 2** (click its line number): *"Two calls come in at once, on the desk's two phone lines. I take Dorothy's. She requests a standard, so I will put it on line 2, in place of Slack Water."*
- [ ] 📖 **Highlight line 4:** *"The producer takes Ray's call on the other line, and decides to put Ray's requested song on line 4. That's two people changing one file at the same time. Somebody has to get both changes into one running order. I'll play both of us, with a branch each."*
- [ ] **Dorothy's branch:**

  ```bash
  git checkout -b dorothy
  ```

- [ ] **Replace line 2, `Slack Water - Marguerite Vance`, with this**, and save:

  ```text
  Evening in Velvet - The Hollis Strings
  ```

- [ ] 📖 **Before you commit:** *"Before I commit, I want to see exactly what I changed. git diff compares the file with my last commit, line by line."*

  ```bash
  git diff
  ```

  ```
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..e7f39fa 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,5 +1,5 @@
   Nightjar - The Lamplighters
  -Slack Water - Marguerite Vance
  +Evening in Velvet - The Hollis Strings
   Long Way Round - The Ferrymen
   Lantern Hours - The Lamplighters
   Low Tide Waltz - Marguerite Vance
  ```

- [ ] 📖 **In the terminal, highlight the red line:** *"Red is a line as it was in my last commit. That's Slack Water, the song I took out."*
- [ ] 📖 **Highlight the green line:** *"Green is a line as it is now. That's Dorothy's song. The lines with no color didn't change. Git shows a few of them around the change so I can see where it is."*
- [ ] **Commit it.** Silent

  ```bash
  git add running-order.txt
  git commit -m "dorothy's request"
  ```

- [ ] 📖 **After the commit:** *"Now the change is saved in a commit. git show shows the commit I just made, and the change inside it."*

  ```bash
  git show --oneline
  ```

  ```
  7b6c35e dorothy's request
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..e7f39fa 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,5 +1,5 @@
   Nightjar - The Lamplighters
  -Slack Water - Marguerite Vance
  +Evening in Velvet - The Hollis Strings
   Long Way Round - The Ferrymen
   Lantern Hours - The Lamplighters
   Low Tide Waltz - Marguerite Vance
  ```

- [ ] 📖 **In the terminal, highlight `dorothy's request`:** *"That's my commit message."*
- [ ] 📖 **Highlight the red and green lines:** *"And that's the same change git diff showed me. git diff shows changes I haven't committed yet. Once a change is committed, git show is how I see it."*
- [ ] **Back to `main` - Pay attention to line 2!**

  ```bash
  git checkout main
  ```

- [ ] 📖 **Highlight line 2:** *"Line 2 is Slack Water again. Dorothy's change is on her branch, not on main. Ray's branch starts from here, from the same file Dorothy started from."*
- [ ] **Ray's branch:**

  ```bash
  git checkout -b ray
  ```

- [ ] **Replace line 4, `Lantern Hours - The Lamplighters`, with this**, and save:

  ```text
  Interstate Blue - The Ferrymen
  ```

- [ ] **The same three steps as Dorothy's: look at the change, commit it, look at the commit.** Silent. Let the red and green sit on screen for a second each time

  ```bash
  git diff
  ```

  ```
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..e4f1f24 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,7 +1,7 @@
   Nightjar - The Lamplighters
   Slack Water - Marguerite Vance
   Long Way Round - The Ferrymen
  -Lantern Hours - The Lamplighters
  +Interstate Blue - The Ferrymen
   Low Tide Waltz - Marguerite Vance
   Night Ferry - The Ferrymen
   Quiet Road - The Hollis Strings
  ```

  ```bash
  git add running-order.txt
  git commit -m "ray's request"
  ```

  ```bash
  git show --oneline
  ```

  ```
  0ccc7fa ray's request
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..e4f1f24 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,7 +1,7 @@
   Nightjar - The Lamplighters
   Slack Water - Marguerite Vance
   Long Way Round - The Ferrymen
  -Lantern Hours - The Lamplighters
  +Interstate Blue - The Ferrymen
   Low Tide Waltz - Marguerite Vance
   Night Ferry - The Ferrymen
   Quiet Road - The Hollis Strings
  ```

- [ ] **Back to `main`**

  ```bash
  git checkout main
  ```

- [ ] 📖 **Before you merge, say what `--no-edit` is for:** *"A merge that makes a new commit needs a message for it. Without no-edit, git opens an editor and waits for me to type one. No-edit tells git to write the message itself."*
- [ ] **Merge Dorothy's branch**

  ```bash
  git merge --no-edit dorothy
  ```

  ```
  Updating fed63db..7b6c35e
  Fast-forward
  ```

- [ ] 📖 **In the terminal, highlight `Fast-forward`:** *"Main hadn't changed since Dorothy's branch started, so git just moved main up to her commit. Main now has Dorothy's change, and nothing else. No new commit this time, so there was no message to write."*
- [ ] 📖 **Before the next merge:** *"Here's what main has now that GitHub doesn't. GitHub still has the running order I started with, and git diff origin main compares my main with GitHub's copy."*

  ```bash
  git diff origin/main
  ```

  ```
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..e7f39fa 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,5 +1,5 @@
   Nightjar - The Lamplighters
  -Slack Water - Marguerite Vance
  +Evening in Velvet - The Hollis Strings
   Long Way Round - The Ferrymen
   Lantern Hours - The Lamplighters
   Low Tide Waltz - Marguerite Vance
  ```

- [ ] 📖 **In the terminal, highlight the red and green lines:** *"One change so far, Dorothy's song on line 2."*
- [ ] 📖 **Highlight `Lantern Hours - The Lamplighters`:** *"Line 4 is still Lantern Hours, with no color. Ray's branch isn't merged yet."*
- [ ] **Now Ray's**

  ```bash
  git merge --no-edit ray
  ```

  ```
  Auto-merging running-order.txt
  Merge made by the 'ort' strategy.
  ```

- [ ] 📖 **After the merge:** *"Same check again. What does main have now that GitHub doesn't?"*

  ```bash
  git diff origin/main
  ```

  ```
  diff --git a/running-order.txt b/running-order.txt
  index ec5bfbd..0d60004 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -1,7 +1,7 @@
   Nightjar - The Lamplighters
  -Slack Water - Marguerite Vance
  +Evening in Velvet - The Hollis Strings
   Long Way Round - The Ferrymen
  -Lantern Hours - The Lamplighters
  +Interstate Blue - The Ferrymen
   Low Tide Waltz - Marguerite Vance
   Night Ferry - The Ferrymen
   Quiet Road - The Hollis Strings
  ```

- [ ] 📖 **In the terminal, highlight the two red lines:** *"Two songs out now, Slack Water and Lantern Hours."*
- [ ] 📖 **Highlight the two green lines:** *"And two songs in, Dorothy's and Ray's. This time main had changed, because Dorothy's line was on it. Git compared both changes with the file they started from."*
- [ ] 📖 **Highlight `Long Way Round - The Ferrymen`, between them:** *"Line 3 sits between the two changes, and nobody touched it, so git put both in by itself. I don't have to remember what the file said before. The diff remembers for me."*
- [ ] **Show the history**

  ```bash
  git log --graph --oneline
  ```

  ```
  *   d8ab0c1 Merge branch 'ray'
  |\  
  | * 0ccc7fa ray's request
  * | 7b6c35e dorothy's request
  |/  
  * fed63db tonight's running order
  * 91d23a6 Initial commit
  ```

- [ ] 📖 **In the terminal, highlight `Merge branch 'ray'`:** *"This time git did make a new commit, the merge commit. Merge branch ray is the message no-edit wrote for it."*
- [ ] 📖 **In the terminal, drag from `Merge branch 'ray'` down to the `|/` under it:** *"Read it from the bottom. After the running order, the history splits in two, one line for each branch. The merge joins them again."*
- [ ] **Push it.** Silent

  ```bash
  git push
  ```

---

## Lab B · Task 1 — 12 minutes

- [ ] **Lids up. The lab README, *Task 1 in full*.** Theirs is lines 1 and 3, with line 2 between them
- [ ] 🎯 **Circulating:** anyone whose second branch has the first branch's change in it went to the second branch without `git checkout main` first. That's step 2 of the task

---

## 3 · Lines next to each other *(slides 2–3)*

- [ ] 📂 **Repo: still your own `running-order`, in its VS Code window**, on `main`
- [ ] 📖 **Highlight lines 7 and 8** (click line number 7 and drag down to 8): *"Two more calls. Pham's Bakery wants something loud, and it goes on line 7. The nurse on her 2 AM break wants something quiet, and it goes on line 8. Same as before, a branch each."*
- [ ] **Pham's branch.** Silent from here to the merge: it's the same moves as §2

  ```bash
  git checkout -b pham
  ```

- [ ] **Replace line 7, `Quiet Road - The Hollis Strings`, with this**, save, commit, and go back to `main`:

  ```text
  Morning Bread - The Ovenbirds
  ```

  ```bash
  git add running-order.txt
  git commit -m "pham's request"
  ```

  ```bash
  git checkout main
  ```

- [ ] **The nurse's branch**

  ```bash
  git checkout -b nurse
  ```

- [ ] **Replace line 8, `Last Call - The Lamplighters`, with this**, save, commit, and go back to `main`:

  ```text
  Still Awake - The St. Agnes Choir
  ```

  ```bash
  git add running-order.txt
  git commit -m "the 2 AM break"
  ```

  ```bash
  git checkout main
  ```

- [ ] **Merge Pham's.** It fast-forwards, the same as Dorothy's did

  ```bash
  git merge --no-edit pham
  ```

- [ ] 🎯 **Ask, and wait for answers:** *"Line 7 and line 8. Two different lines. Dorothy and Ray changed two different lines too. Will git merge the nurse's branch by itself?"*
- [ ] 💥 **Merge the nurse's**

  ```bash
  git merge --no-edit nurse
  ```

  ```
  Auto-merging running-order.txt
  CONFLICT (content): Merge conflict in running-order.txt
  Automatic merge failed; fix conflicts and then commit the result.
  ```

- [ ] 📖 **In the terminal, highlight `CONFLICT`:** *"It stopped. Two different lines, and git stopped anyway. Dorothy and Ray had line 3 between them. Lines 7 and 8 are next to each other, so to git they're one piece of the file, and both branches changed it."*
- [ ] 🎞️ **GO TO SLIDE 2** — *Which changes git can put together* · *"An unchanged line between the two changes, and git puts both in. On lines next to each other, or on the same line, it stops and asks you. So different lines is not enough. There has to be an unchanged line between them."*
- [ ] **Back to VS Code. Show `running-order.txt`** as git leaves it

  ```
  <<<<<<< HEAD
  Morning Bread - The Ovenbirds
  Last Call - The Lamplighters
  =======
  Quiet Road - The Hollis Strings
  Still Awake - The St. Agnes Choir
  >>>>>>> nurse
  ```

- [ ] 📖 **Highlight `<<<<<<< HEAD` down to `=======`:** *"Git left both versions in the file. This top part is main, the branch I'm on. HEAD always means where I'm standing. Its two lines are Pham's new line 7, and line 8 as it was."*
- [ ] 📖 **Highlight `=======` down to `>>>>>>> nurse`:** *"This bottom part is the nurse's branch, coming in. It's line 7 as it was, and her new line 8. Each side shows both lines of that piece, the one it changed and the one it didn't."*
- [ ] 📖 **Move the mouse slowly along the four buttons above the conflict** (they can't be highlighted; they aren't text): *"VS Code offers four buttons here. Accept Both Changes sounds right, because I want both requests. Watch what it does."*
- [ ] **Click *Accept Both Changes*.** Then highlight `Last Call - The Lamplighters` and `Quiet Road - The Hollis Strings`: they're now next to each other, so one drag covers both
- [ ] 📖 *"Ten songs instead of eight. Last Call and Quiet Road are back, and those are the two songs we took out to make room for Pham's and the nurse's requests. Accept Both kept the old lines as well as the new ones."*
- [ ] **Undo it: <kbd>⌘Z</kbd> / <kbd>Ctrl+Z</kbd>.** The markers come back
- [ ] 📖 **Before you edit:** *"This is the running order. I want Pham's song on line 7 and the nurse's on line 8, and nothing else changed. So I'll do it by hand. I delete the three marker lines, and I keep the lines I want."*
- [ ] **Delete the three marker lines, `Last Call - The Lamplighters`, and `Quiet Road - The Hollis Strings`.** Save. The last two lines are:

  ```text
  Morning Bread - The Ovenbirds
  Still Awake - The St. Agnes Choir
  ```

- [ ] 🎞️ **GO TO SLIDE 3** — *Finishing a conflict by hand* · *"Delete the three marker lines, and keep the lines you want, in the order you want. Then git add and commit. When both sides changed something, keep both usually brings back what each side replaced, so read what you're keeping. The buttons make the same edits. Use them once you know which edit you want."*
- [ ] **Back to VS Code. Commit it.** `git add` tells git the conflict is finished, and the commit completes the merge

  ```bash
  git add running-order.txt
  git commit -m "pham and the nurse, both"
  ```

  ```bash
  git log --graph --oneline
  ```

  ```
  *   38d4adf pham and the nurse, both
  |\  
  | * 96a6056 the 2 AM break
  * | ebe1875 pham's request
  |/  
  ```

- [ ] 📖 **Highlight `pham and the nurse, both`:** *"The merge commit is the one I made by hand, with my message on it."*
- [ ] 📖 **Before you push:** *"Same check as last time, before I push. GitHub has Dorothy's and Ray's songs now, because I pushed them. So the only lines that should be different are 7 and 8."*

  ```bash
  git diff origin/main
  ```

  ```
  diff --git a/running-order.txt b/running-order.txt
  index 0d60004..cfbe9c9 100644
  --- a/running-order.txt
  +++ b/running-order.txt
  @@ -4,5 +4,5 @@ Long Way Round - The Ferrymen
   Interstate Blue - The Ferrymen
   Low Tide Waltz - Marguerite Vance
   Night Ferry - The Ferrymen
  -Quiet Road - The Hollis Strings
  -Last Call - The Lamplighters
  +Morning Bread - The Ovenbirds
  +Still Awake - The St. Agnes Choir
  ```

- [ ] 📖 **In the terminal, highlight the two red lines and the two green lines:** *"Two songs out, Quiet Road and Last Call. Two songs in, Pham's and the nurse's. That's the conflict finished the way I wanted, and nothing else changed. If I had kept Accept Both, the file would have ten songs, and the diff would show more green lines than red ones."*
- [ ] **Push it.** Silent

  ```bash
  git push
  ```

---

## Lab C · Task 2 — 18 minutes

- [ ] **Lids up. The lab README, *Task 2 in full*.** Theirs is lines 5 and 6
- [ ] 🎯 **Circulating: ask to see the file before they `git add` it.** A `<<<<<<<` left in, or ten songs instead of eight, is what this block is for
- [ ] 🎯 **An editor full of `~` lines** means a merge ran without `--no-edit`. `:q` and <kbd>Enter</kbd>

---

## ☕ Break

---

## 4 · GitHub against your laptop *(slide 4)*

- [ ] 📂 **Repo: still your own `running-order`** — its VS Code window for the laptop side, and its GitHub page, `jgrissom/running-order`, for the browser side. Not `kdxr-tonight`
- [ ] 📖 *"Now the other person isn't a branch on my laptop. The music director edits the running order on GitHub, from the office, and I edit the same line here without pulling first."*
- [ ] **In the browser, on `jgrissom/running-order`: `running-order.txt` → pencil.** Replace **line 3**, `Long Way Round - The Ferrymen`, with this, then **Commit changes…** → leave **Commit directly to the `main` branch** → **Commit changes**:

  ```text
  Long Way Round - The Ferrymen (radio edit)
  ```

- [ ] **Back to VS Code, on `main`. Replace line 3, `Long Way Round - The Ferrymen`, with Dorothy's second request**, save, and commit:

  ```text
  Dorothy's Waltz - The Hollis Strings
  ```

  ```bash
  git add running-order.txt
  git commit -m "dorothy calls back"
  ```

- [ ] 💥 **Push**

  ```bash
  git push
  ```

  ```
   ! [rejected]        main -> main (fetch first)
  error: failed to push some refs to 'https://github.com/jgrissom/running-order.git'
  hint: Updates were rejected because the remote contains work that you do not
  hint: have locally.
  ```

- [ ] 📖 **In the terminal, highlight `rejected`:** *"Rejected."*
- [ ] 📖 **Highlight from `the remote contains work` to `have locally`** (it runs onto the next line, so drag across both): *"GitHub has a commit I don't have, the radio edit. If my push went through, it would throw that commit away, so git won't send it."*
- [ ] 📖 *"The hint says pull. I'm telling pull to merge, with no-rebase. Without that, pull can stop and ask whether to merge or rebase."*

  ```bash
  git pull --no-rebase
  ```

  ```
  CONFLICT (content): Merge conflict in running-order.txt
  ```

- [ ] 📖 **Show the file, and highlight the long code after `>>>>>>>`:** *"Pull fetched GitHub's commit, then merged it, and the merge stopped. Same line on both sides this time. The long code is the commit from GitHub."*

  ```
  <<<<<<< HEAD
  Dorothy's Waltz - The Hollis Strings
  =======
  Long Way Round - The Ferrymen (radio edit)
  >>>>>>> 7b6529f03fc59f05cabb3fcd902607a888799fa8
  ```

- [ ] 📖 *"One line, one song. Keeping both would put two songs in one slot. The radio edit stays, so Dorothy's line and the three markers go."*
- [ ] **Delete the three marker lines and `Dorothy's Waltz - The Hollis Strings`.** Save, then commit and push

  ```bash
  git add running-order.txt
  git commit -m "the radio edit stays"
  ```

  ```bash
  git push
  ```

  ```
     7b6529f..beed75f  main -> main
  ```

- [ ] 🎞️ **GO TO SLIDE 4** — *When GitHub has a commit you don't* · *"A rejected push means GitHub has a commit you don't. Nothing is lost. Pull with no-rebase, finish any conflict by hand, commit, and push again."*

---

## Lab D · Task 3 — 15 minutes

- [ ] **Lids up. The lab README, *Task 3 in full*.** Theirs is line 8
- [ ] 🎯 **`fatal: Need to specify how to reconcile divergent branches.`** is plain `git pull`. `git pull --no-rebase`, the README's step 4

---

## 5 · The shared running order *(slide 5)*

- [ ] 📂 **Repo: now the shared `kdxr-tonight`** — its GitHub page, `jgrissom/kdxr-tonight`. You're done with `running-order` for the night
- [ ] **Show `jgrissom/kdxr-tonight` in the browser, and open `running-order.txt`**
- [ ] 📖 **Highlight `01  (open)` and the `-- station ID --` line under it** (one drag; they're next to each other): *"This is my repo, and it's public. Twenty slots, and every slot has a station ID line under it that nobody changes. That unchanged line is why any two of your slots can merge."*
- [ ] 🎞️ **GO TO SLIDE 5** — *The shared running order* · *"You can't push to my repo, so you fork it. A fork is a copy that belongs to you. You change your slot on a branch of your fork, and a pull request asks me to take it. I merge every one of them up here, on the projector."*
- [ ] **Give out the slots.** Count off around the room, from 01. Say each number to its person
- [ ] 🎯 **Ask for two volunteers, and give them both slot 20:** *"You two both write the last song of the night."* Say nothing about why
- [ ] 📖 *"Everyone else: change your own slot and nothing else. Keep the number and the two spaces."*

---

## Lab E · The shared running order — 30 minutes

- [ ] ⏳ **Not yet walked from a second GitHub account:** the student side of this block (the fork, the pencil on a fork, the pull request from it, an author's answering commit, *Sync fork*). If a button's name differs on the night, say what you see
- [ ] **Lids up. The lab README, *In class: the shared running order*.** Then switch the projector to the **Pull requests** tab of `kdxr-tonight`, and refresh as they arrive
- [ ] ⚠️ **Merge the first slot-20 pull request as soon as it arrives. Leave the second slot-20 one until last.** Merge every other one in the order it arrived: **Merge pull request → Confirm merge**
- [ ] 📖 **After three or four merges, open one that arrived early:** *"Other pull requests went in after this one was opened, so it's behind. It still merges. Its slot has unchanged lines around it."*
- [ ] **A review, on one pull request before you merge it:** **Files changed** → hover over its line → blue **+** → write *"Is this the radio edit?"* → **Add single comment**. Ask its author to answer with a commit: on their fork, their branch, the pencil, change the line, **Commit directly to** their branch
- [ ] 📖 **When the author's commit shows up under your comment:** *"That's a review. I asked about a line, and the answer is a commit on the same branch. That commit is part of the pull request now."* Then merge it
- [ ] 💥 **Last: open the second slot-20 pull request.** GitHub says it has conflicts and won't merge it
- [ ] 🎯 **Ask, and wait:** *"Every other pull request merged. Why not this one?"* (Both volunteers changed slot 20, and the first one is already in.)
- [ ] **Finish it on the projector: open `kdxr-tonight` in a VS Code window of its own** — **File → New Window**, then **File → Open Folder…** → `kdxr-tonight`, the clone from §0. Not `running-order`. Open its terminal with `` Ctrl+` `` and bring your clone up to date with every merge:

  ```bash
  git pull --no-rebase
  ```

- [ ] **Fetch the pull request's commits by its number.** It's the number after `#` on its page. The command below uses `2`, so **change it to yours** before you run it:

  ```bash
  git fetch origin pull/2/head:closer-two
  ```

  ```
   * [new ref]         refs/pull/2/head -> closer-two
  ```

- [ ] 📖 *"Every pull request's commits live on GitHub under its number, even when they come from somebody's fork. I've just copied them into a branch of mine called closer-two."*
- [ ] **Merge it into `main`**. If you changed the number, the branch name is still `closer-two`

  ```bash
  git merge --no-edit closer-two
  ```

  ```
  CONFLICT (content): Merge conflict in running-order.txt
  ```

- [ ] **Show the bottom of `running-order.txt`.** Your two songs are whatever the volunteers wrote:

  ```
  <<<<<<< HEAD
  20  Last Call - The Lamplighters (for Junie)
  =======
  20  Goodnight, Dorothy - The Hollis Strings
  >>>>>>> closer-two
      -- sign-off --
  ```

- [ ] 🎯 **Ask the room:** *"One slot, one song. Keep both would give the night two last songs. Which one closes the night?"* Take the vote
- [ ] **Delete the three marker lines and the song that lost.** Save, commit and push

  ```bash
  git add running-order.txt
  git commit -m "the room picked the last song"
  ```

  ```bash
  git push
  ```

- [ ] 📖 **Refresh the pull request in the browser:** *"It says merged, and I never pressed its merge button. Its commits are in main now, so GitHub counts it as merged."*
- [ ] 📖 *"Now everybody: on your fork, Sync fork, then Update branch. Open the file, and that's the whole room's running order."*
- [ ] ⚠️ **If GitHub or the network is slow:** whoever can't fork does Task 3 again, or Task 4 in their own repo. Show the conflict the same way on your own `running-order`: two branches, line 1 on both, merged into `main`

---

## ☕ Break

---

## 6 · Practice for week 16 *(slide 6)*

- [ ] 🎞️ **GO TO SLIDE 6** — *Practice for week 16* · *"Week sixteen you present your project, in four parts. It runs from start to finish, you show what it does, you explain one decision and why, and you say what's next. The rest of tonight is for practicing exactly that, out loud."*
- [ ] 📖 *"Three steps, on the slide. Run it the way you'll show it. Give it out loud to the person next to you, who times you and asks one question. Then fix the one thing you noticed."*

---

## Lab F · Practice for week 16 — 65 minutes

- [ ] **Lids up. The lab README, *In class: practice for week 16*.** Everyone switches to their project repo's window
- [ ] 🎯 **Circulating: sit in on a pair, and ask the question yourself.** *"What's one thing you decided, and why?"* is the part of week 16 nobody else can write for them
- [ ] 🎯 **Anything that crashes in step 1** gets fixed before step 2. Week sixteen runs the whole program
- [ ] ⚠️ **Stop at the wrap on the timing table, wherever the room is**

---

## 7 · Wrap *(slide 7)*

- [ ] 🎞️ **GO TO SLIDE 7** — *Tonight, in one picture* · *"An unchanged line between two changes, and git merges both. Lines next to each other, or the same line, and you finish it by hand. Delete the three marker lines and keep what you want. A rejected push means pull with no-rebase first."*
- [ ] 📖 **Say what's left** — *"Nothing tonight is graded. If you didn't get to Task 4, it's the shared running order in your own repo, and you can do it at home. Week sixteen you present."*
- [ ] ⚠️ **Say the branch line out loud** — *"Anything you fix in your project tonight goes on a branch, same as every week, and you merge it with the plain merge button. Nothing goes straight to main."*
