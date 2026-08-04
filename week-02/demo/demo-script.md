# Week 2 Demo Script — The Mess and the Lies 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. Type the *first* instance of every pattern; paste the rest from here.

> [!TIP]
> **Clickable version:** [the hosted script](https://jgrissom.github.io/dotnet-db-dev/week-02/demo/script.html) — checkboxes survive refreshes; Reset button for next run.

> [!TIP]
> **This sheet is the running order. The deck is a prop it tells you to pick up.**
>
> **🎞️ means swipe to the slides.** Every 🎞️ line says the same thing: *put that slide up, talk to it.* There are no exceptions and no cue that means "not yet" — if a slide would give away a punchline, its cue is further down, at the moment it's due. Everything that isn't a 🎞️ line happens in VS Code or the terminal, so **you don't need a cue to come back**.
>
> Lost your place? **The nearest 🎞️ above you is the slide that should be showing.**

> [!IMPORTANT]
> **Tonight has two halves and they trade places at the first break.**
>
> **The git half (§1–§3) collects last week's promise:** the forty files, on screen, counted — then cleaned up for good, and the Source Control panel introduced now that the verbs are known. It runs first because the room was *told* it runs first — "next week starts by looking at what `git add .` swept up."
>
> **The C# half (§4–§5) is the compiler's limit, part two.** Last week: a clean build, a wrong answer, and silence. This week: a clean build, a **warning nobody reads**, and then a crash the compiler could never have caught — because the input didn't exist until someone typed it. The break in §5 is unannounced, as always.

## 0 · Before class

- [ ] ⚠️ **The scratch coursework repo from week 1 is tonight's set.** Verify it's intact — the whole §1 beat is that its mess is still committed:
  ```bash
  cd ~/scratch/dotnet-db-coursework && git ls-files | grep -cE '(^|/)(bin|obj)/'
  ```
  A number in the dozens = ready. **Write that number down — it's "the forty files" all night, and yours is the real count.**
- [ ] ⚠️ **If the scratch repo is gone**, rebuild the week-1 end state (~2 min) — and note the force-push replaces the demo repo on GitHub, which is fine, it's the same teaching artifact:
  ```bash
  rm -rf ~/scratch/dotnet-db-coursework && mkdir -p ~/scratch/dotnet-db-coursework/week-01
  cd ~/scratch/dotnet-db-coursework/week-01
  dotnet new console -o Haldane
  cp ~/Repos/dotnet-db-dev-answer-keys/week-01/demo-starter/Haldane/*.cs Haldane/
  dotnet build Haldane
  cd .. && git init && git add . && git commit -m "Week 1: Haldane duty console"
  git remote add origin https://github.com/jgrissom/dotnet-db-coursework.git
  git push -f -u origin main
  ```
- [ ] ⚠️ **The GitHub page must show the mess too** — §1 opens on `github.com/jgrissom/dotnet-db-coursework`, clicking into `week-01/Haldane/obj/`. If the week-1 class push didn't happen, the rebuild above fixes it
- [ ] **Rehearse the whole thing once (≈20 min).** The §4 `dotnet new` wants a warm NuGet cache, and the §2 cleanup is a beat you want in your hands, not your head
- [ ] ⚠️ **Pre-position a separate terminal window for §6** — standing in the answer key's `week-02/lab/solution`, font bumped for the back row, warmed:
  ```bash
  cd ~/Repos/dotnet-db-dev-answer-keys/week-02/lab/solution
  dotnet test Lab.Checks
  ```
- [ ] **Teaching profile in VS Code; close every other folder and tab.** Have VS Code open on **`week-01`** — exactly where last week left it; §1 moves it to the top folder on screen
- [ ] ⚠️ **Check `git.openRepositoryInParentFolders` is still `always`** on the teaching profile — §1–§3 die without the repo showing in the panel. **How:** with the teaching profile active, **`Cmd+,`** (Settings) → type `openRepositoryInParentFolders` in the search box → the dropdown should read **`always`**. If it doesn't: set it to `always`, then **`Cmd+Shift+P` → *Developer: Reload Window*** so the repository scan re-runs. Thirty seconds now; a dead panel live
- [ ] **Put [`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** The board gained a generator panel this week — say nothing about it; it explains itself or it isn't working. **Close it before slide 1**
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."***

## 1 · The forty files *(slides 2–3)*

### The number

- [ ] **Open with the homework reading, cold:** *"you were asked to count the folders you didn't write. Who's got a number?"* Take two or three answers — they'll vary, and that's fine
- [ ] 🎞️ **GO TO SLIDE 2** — *Forty files you never wrote* · *"whatever your number was, here's the thing about it: `git add .` doesn't mean 'add my work'. It means add **everything** — and last week, everything included a pile of machinery"*
- [ ] Swipe to the browser — **[github.com/jgrissom/dotnet-db-coursework](https://github.com/jgrissom/dotnet-db-coursework)**, click into `week-01/Haldane/obj/`, open one of the `.json` files: *"I pushed this. I have no idea what it does. Neither does anyone — it's the compiler talking to itself"*
- [ ] **Now count mine properly.** VS Code — **File → Open Folder → `dotnet-db-coursework`** — ⚠️ **the top folder this time, not `week-01`, and say why:** *"tonight starts with git, and git lives at the top. When we get back to writing C#, we'll open a week folder like always"*
- [ ] Integrated terminal (`` Ctrl+` ``), standing at the top — where every git command tonight runs:
  ```bash
  git ls-files | wc -l
  git ls-files | grep -E '(^|/)(bin|obj)/' | wc -l
  ```
- [ ] 🎯 *"`ls-files` is everything git is carrying. The second number is how much of it is machinery. I wrote five of these files. Five."*

### What they are

- [ ] 🎞️ **GO TO SLIDE 3** — *What bin/ and obj/ are* · *"`obj` is the compiler's scratch paper. `bin` is the built program — the thing that actually runs. Both are **regenerated from your source every single build**. Delete them and nothing of value is lost; commit them and every build turns your repo into a construction site"*
- [ ] 💡 If someone asks why git doesn't just know: *"git tracks files. It has no idea what a compiler is — that's exactly why it needs to be told, and telling it is the next ten minutes"*
- [ ] ⚠️ **The lab-PC drill, 60 seconds, promised in the setup guide:** *"if you're ever on a machine that wiped overnight, git forgot who you are. Two commands, from your notes, ten seconds"* —
  ```bash
  git config --global user.name "Ada Lovelace"
  git config --global user.email "ada@example.com"
  ```
  *"That's the whole drill. Every per-machine thing this course adds gets one of these, always under a minute"*

## 2 · The cleanup *(slides 4–5)*

### Three lines

- [ ] In the VS Code Explorer, **click the empty space below the file list first** — so the new file lands at the **root**, not inside `week-01` — then **New File → `.gitignore`**, and type it:
  ```
  bin/
  obj/
  *.user
  ```
- [ ] 🎞️ **GO TO SLIDE 4** — *.gitignore* · *"a filename pattern per line. Anything that matches, git stops seeing — won't list it, won't stage it, won't nag about it. The dot at the front just means it's configuration; the file is plain text"*
- [ ] 🎯 *"It sits at the **top** because it covers everything below it — `week-01`, `week-02`, and the fourteen folders that don't exist yet. You write this once, tonight, and it works all semester"*

### The part everyone gets wrong

- [ ] **Prove it didn't fix anything.** Same two commands as before:
  ```bash
  git status
  git ls-files | grep -E '(^|/)(bin|obj)/' | wc -l
  ```
  `status` shows one new untracked file — the `.gitignore` itself. The count is **unchanged**
- [ ] 🎞️ **GO TO SLIDE 5** — *Ignored is not untracked* · 🎯 **this is the misconception half the internet has, so kill it precisely:** *"`.gitignore` is a bouncer. It stops new files at the door. The ones already inside? Already inside. Nothing about ignoring reaches back into the repo"*
- [ ] **The eviction, read aloud as you type it:** *"`rm` remove, `-r` and everything under it, `--cached` — **repo only, hands off my disk** — everything:"*
  ```bash
  git rm -r --cached .
  git add .
  ```
- [ ] 🎯 **Now look at the Source Control icon — there's the number.** Open the panel and **scroll it, slowly, without clicking anything:** *"every one of these is a staged deletion. That's the mess, leaving. The `git add .` after it re-staged everything that survived the bouncer — which is to say, everything I actually wrote"* 🔗 **This is the panel's first appearance; §3 comes back and drives it**
- [ ] Commit and push — from the terminal, the way they know:
  ```bash
  git commit -m "Week 2: take out the trash"
  git push
  ```
- [ ] **Reload the GitHub page** → `week-01/Haldane/` now shows source and a `.csproj` and nothing else. *"That's what a repo is supposed to look like: things a human wrote"*
- [ ] ⚠️ **Say what did NOT happen:** *"nothing was deleted from my machine — `bin` and `obj` are still right there in the Explorer, grayed out. `--cached` means the repo forgot them; my disk never will, because the compiler remakes them every build"*
- [ ] **✓ CHECKPOINT:** somebody can say why the `.gitignore` alone changed nothing, and what `--cached` spared

## 3 · The panel, and a README *(slides 6–7)*

### The buttons do the verbs

- [ ] 🎞️ **GO TO SLIDE 6** — *The panel: same verbs, buttons* · *"last week I made you type four commands and told you to leave this panel alone. Here's why that order: every region of this thing is one of those commands, and now you can read it"*
- [ ] **Tour the open panel, mapping as you go:** the file list is `git status` · the **+** on a file is `git add` · the message box and **✓ Commit** are `git commit -m` · the **Sync** arrows are `git push` (and pull). *"Nothing new. A second view of what you already understand"*
- [ ] 🎯 *"Use whichever you like from here on. When the panel confuses you — and some week it will — the terminal is how you find out what it actually did. `git status` never lies"*

### A README, committed with the buttons

- [ ] 🎞️ **GO TO SLIDE 7** — *A README* · *"one more piece of hygiene, and then we write code. A repo with no README is a box with no label — and I open fifteen of these boxes every week"*
- [ ] New file at the root — `README.md` — and type it (yours will name you, theirs names them):
  ```markdown
  # dotnet-db-coursework

  Jeff Grissom · .NET Database Development, one folder per week.

  - week-01 — toolchain, first program, KDXR signs on
  - week-02 — input that lies, .gitignore, the caller line
  ```
- [ ] **Commit it with the panel, narrating each button as its verb:** the file under *Changes* → **+** *("git add")* → message `Week 2: readme` → **✓ Commit** → **Sync** *("git push")*. Reload GitHub — the README renders on the repo's front page
- [ ] 🔗 *"Your homework does these exact three moves to your repo — gitignore, cleanup, README — and this week they're worth points. The grader checks all three"*

## 4 · The console takes a reading *(slides 8–11)*

### A new week, the same move

- [ ] **File → Open Folder → `dotnet-db-coursework` → *New Folder* → `week-02` → Open.** *"Back to C#, so back into a week folder — same move as last week, and it's the move every Monday starts with from here"*
- [ ] In the integrated terminal (standing in `week-02`):
  ```bash
  dotnet new console -o Haldane
  cp ../week-01/Haldane/Conditions.cs Haldane/
  ```
- [ ] 🎯 **The `cp` is a beat, not plumbing:** *"that's last week's logic — Fahrenheit, safe-to-go-out — carried forward in one move. I didn't rewrite it; it was already right. **Your homework asks you for exactly this move** with your own `Station.cs`"*
- [ ] In `Program.cs`, delete the template line and type the banner and the prompt:
  ```csharp
  Console.WriteLine("========================================");
  Console.WriteLine("  HALDANE STATION - DUTY CONSOLE");
  Console.WriteLine("  watch handover - readings typed by hand");
  Console.WriteLine("========================================");
  Console.WriteLine();

  Console.Write("Outside temperature (C): ");
  string raw = Console.ReadLine();
  ```
- [ ] 🎞️ **GO TO SLIDE 8** — *Input arrives* · *"last week every value on the board was typed into the source. Tonight the duty officer types it into the running program — which is how the real board works; it says right on it that it's kept by hand. `ReadLine` is Python's `input()` — almost. The almost is that squiggle"*

### The warning, read properly

- [ ] **Point at the squiggle under `Console.ReadLine()`. Do not fix it yet.** Hover it, and read the whole thing out loud
- [ ] 🎞️ **GO TO SLIDE 9** — *The warning you'd have ignored* · 🎯 *"`CS8600`, and it's a **warning**, not an error — the build succeeds, the program runs. Hands up: who read the warnings in their build output last semester?"* — expect near-zero, and give it the beat it deserves
- [ ] 🎯 **The sentence that reframes warnings for good:** *"an error is the compiler saying 'I can't build this.' A warning is the compiler saying **'I can build it, but this is the part I can't promise.'** Last week you learned the compiler's promise has an edge. A warning is the compiler drawing you a map of that edge — and everyone scrolls past it"*
- [ ] Prove it builds anyway — `dotnet run --project Haldane`, and point at the warning line scrolling by in the build output before the banner prints: *"there it is again, in writing, every build. `0 Warnings` is a sentence worth wanting"*

### What it was warning about

- [ ] 🎞️ **GO TO SLIDE 10** — *?? — or use this instead* · *"what it's warning about: `ReadLine` can hand back **nothing at all** — not an empty string, genuinely nothing. `null`. It happens when the input runs out, and 'the input runs out' is not hypothetical: my grader runs your homework and answers every question by pressing Enter"*
- [ ] Fix the line — one edit, squiggle gone:
  ```csharp
  string raw = Console.ReadLine() ?? "";
  ```
- [ ] ⚠️ **Bound it, because the room met `??` last week:** *"`??` means 'or use this instead' — same as the lab's `?? "somebody"`. That's the whole spelling for now. **Why C# is this careful about null is a week-5 conversation**, and it's a good one"*

### Text becomes a number

- [ ] Type the rest — the parse and the board:
  ```csharp
  double reading = double.Parse(raw);

  Console.Write("Blizzard warning (y/n): ");
  bool blizzard = (Console.ReadLine() ?? "") == "y";

  Console.WriteLine();
  Console.WriteLine($"Outside:         {reading} C  ({Conditions.Fahrenheit(reading)} F)");
  Console.WriteLine($"Blizzard:        {blizzard}");
  Console.WriteLine($"Safe to go out:  {Conditions.IsSafeToGoOut(reading, blizzard)}");
  ```
- [ ] 🎞️ **GO TO SLIDE 11** — *Text becomes a number* · *"everything `ReadLine` gives you is **text**. `\"-41.5\"` with quotes on it. The board does arithmetic, so it needs the number, and `double.Parse` is the converter — Python's `float(input())`, same move"*
- [ ] 💡 **The `bool` line is worth ten seconds, not more:** *"why `== \"y\"` instead of parsing a bool? Because `bool.Parse` wants the literal word `True`, and no human on a radio at 3 AM says `True`. Ask a y/n question, compare the answer. Parsing is for numbers"*
- [ ] Run it and type carefully — `dotnet run --project Haldane`, answer **`-41.5`** and **`y`**. The board fills in: `-42.7 F`, `Safe to go out: False`. *"Works. Last week's methods, this week's input"*
- [ ] **✓ CHECKPOINT:** the room can say what `??` did and what `Parse` did, and that both happened to *text*

## 5 · Input that lies *(slides 12–14)*

### The break

- [ ] ⚠️ **Unannounced, as always.** Run it again, and this time answer the way a watch officer writes a log entry — say it as you type: *"minus forty-one point five, **degrees C**"*:
  ```
  -41.5 C
  ```
- [ ] 💥 **`Unhandled exception. System.FormatException: The input string '-41.5 C' was not in a correct format.`** — let it sit. Then, deliberately: *"the build was clean. No error, no warning — the `??` fix took care of the only thing it was worried about. It ran perfectly every time I rehearsed. And it just went down, at 3 AM, over a **unit of measurement**"*
- [ ] **Read the crash like week 1 read the build error:** the exception **type** (`FormatException` — searchable, like an error code) · the message (*"was not in a correct format"* — it names the input) · the line number. *"A runtime crash has an anatomy too, and it tells you where it died"*
- [ ] 🎯 **Ask before explaining:** *"the compiler warned me about null. Why didn't it warn me about this?"* — someone will get there: *because the input didn't exist yet.* *"Right. Compiling happened this afternoon. `-41.5 C` happened just now. **No compiler, in any language, can check a value that arrives after compiling is over.** Last week's gap was arithmetic it considered fine; this week's gap is everything your users will ever type"*
- [ ] 🎞️ **GO TO SLIDE 12** — *Input that lies* · *"and input lies constantly. Not maliciously — helpfully. A unit. A comma. The word 'about'. `Parse` takes the string's word for it, and the string was wrong"*

### The tool that asks first

- [ ] **Fix it live.** The `Parse` line becomes a question, and the board moves inside the answer:
  ```csharp
  if (double.TryParse(raw, out double reading))
  {
      Console.Write("Blizzard warning (y/n): ");
      bool blizzard = (Console.ReadLine() ?? "") == "y";

      Console.WriteLine();
      Console.WriteLine($"Outside:         {reading} C  ({Conditions.Fahrenheit(reading)} F)");
      Console.WriteLine($"Blizzard:        {blizzard}");
      Console.WriteLine($"Safe to go out:  {Conditions.IsSafeToGoOut(reading, blizzard)}");
  }
  else
  {
      Console.WriteLine();
      Console.WriteLine($"'{raw}' is not a reading. Digits and a minus sign - the log doesn't take units.");
      Console.WriteLine("Console stays up. Take it again, or log it by hand this watch.");
  }
  ```
- [ ] 🎞️ **GO TO SLIDE 13** — *TryParse asks first* · *"`TryParse` returns a `bool` — did that work? — and when it's `true`, the parsed number is sitting in `reading`, declared right there in the brackets. For words, for blanks, even for `null`: **`false`, never a crash.** The program decides what happens next, and what happens next is the console **stays up**"*
- [ ] Run both paths on screen: `-41.5` + `y` → the board · then again with `-41.5 C` → the civil answer, and the program **exits cleanly**. 🎯 *"same lie, no body. At a station where this console is the only interface for five hundred kilometres, those two runs are different worlds"*
- [ ] 💡 **Someone will ask why not loop until they type it right. Take it seriously — it's a good instinct with a bad failure mode:** *"because sometimes nobody's typing. My grader feeds your program blank lines — a loop that won't take no for an answer spins forever and gets killed at the timeout. **Ask once, answer gracefully.** The re-ask loop has its week, and it's week 13"*
- [ ] 🎞️ **GO TO SLIDE 14** — *What no compiler can check* · 🎯 **the week's sentence, said slow:** *"the compiler checks your program. **It cannot check your users.** So your program has to — and now you've seen what that checking looks like: it's an `if`, on a question, instead of faith"*
- [ ] **✓ CHECKPOINT:** somebody can say why the warning and the crash were different failures — one flagged at compile time, one impossible to flag — **and** what `TryParse` returns for `null`

## 6 · Hand off to the lab *(slide 15)*

- [ ] 🎞️ **GO TO SLIDE 15** — *Lab: the caller line*. Leave it up for the whole lab
- [ ] **Show what done looks like — from the pre-positioned terminal window**, answer key, ~90 seconds:
  ```bash
  dotnet test Lab.Checks
  dotnet run --project Lab
  ```
  `Passed! - Failed: 0, Passed: 5` — then **run the program and feed it garbage, out loud:** DJ name fine, caller name with a fistful of spaces, request left blank, and when it asks where Ray is: *"somewhere past the truck stop"*. **Every prompt gets a civil answer and the desk stays on the air.** 🎯 *"that's the target: not five green checks — a program I just tried to crash, and couldn't"*
- [ ] 🎯 **The frame:** *"the desk you finished last week is in the starter, done — you're not behind if you missed it. Tonight the desk answers the phone, and the phone is where programs die. One of tonight's methods ships **already written and already wrong** — the day shift wrote it, it works every time Ray answers with a number, and Task 1 is crashing it with your own typing. The crash is on purpose. Cause it"*
- [ ] Setup on screen, said once: **`git pull` in the clone → copy the two folders in `week-02/lab/starter` into a new `week-02` folder in your own repo → open `week-02` in VS Code → `dotnet test Lab.Checks`** → **1 / 5**
- [ ] ⚠️ **The folder split, every week until it sticks:** both commands run from **`week-02`** — the folder holding both project folders. Never from inside either. Never `cd`
- [ ] Say the target and mean it: **all five green, and then try to crash your own desk and fail.** *"Read the failure messages — check 3's and 4's tell you the tool, and check 4's names the crash you just watched me cause"*

## 7 · Wrap-up, after the lab *(slide 16)*

- [ ] 🎞️ **GO TO SLIDE 16** — *Tonight, in one picture*. Three beats: **your repo holds what you wrote** · **a warning marks the edge of the compiler's promise** · **Parse believes, TryParse asks**
- [ ] Homework, in two sentences: *"your own station grows a request line — greeting, a name for callers who won't give one, and a caller-number contest that survives any answer a human gives. And your repo gets tonight's cleanup: gitignore, untrack the old mess, README — all three are points now, and they stay points all semester"*
- [ ] ⚠️ Repeat the two that cost points silently: **the cleanup covers the WHOLE repo, week-01 included** — the grader looks everywhere — and **your program has to survive being run with nobody typing**
- [ ] 🔗 **Week 3:** *"next week the station starts keeping a list — callers, requests, all of it. You'll type three records in, quit, run it again, and they'll be gone. I want you to be annoyed by that. Being annoyed by it is the point"*
