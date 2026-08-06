# Week 2 Demo Script — The Mess and the Lies 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. **Paste the code from here** — every block has a Copy button, and the room can't read code that appears character by character anyway. **Talk each block through once it's on screen** — that's the beat the typing used to provide. ⚠️ **Say what it *does*, never what it says:** `Console.WriteLine($"Station: {stationName}")` is *print the label, then drop the station's name in* — not *dollar sign, quote, curly brace.* **Name syntax only when the syntax is the lesson** (the `$`, the `.0`, the `out`).

**Type whatever you feel like typing** — this is a default, not a rule. **The two that would cost you if you didn't:** the `.gitignore`'s four lines in §1 (the badge has to fall *as each line lands* — that's the whole beat), and the **answers you give the running program** in §3–§4, especially `-41.5 C`. Those aren't code; they're the room watching a human make a human's mistake.

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
> **The git half (§1–§2) collects last week's promise:** *what those four lines can't do.* The slip is manufactured on screen, the eviction drill teaches the one git skill everyone eventually needs, and the Source Control panel gets its slot now that the verbs are known.
>
> **The C# half (§3–§4) is the compiler's limit, part two.** Last week: a clean build, a wrong answer, and silence. This week: a clean build, a **warning nobody reads**, and then a crash the compiler could never have caught — because the input didn't exist until someone typed it. The break in §4 is unannounced, as always.

## 0 · Before class

**The set, at curtain — check this before anything else:**

```
instructor/                    ← the container on your machine
├─ dotnet-db-coursework/       ← OPEN IN VS CODE — week 1's end state, untouched:
│  ├─ .gitignore               ←   the four lines, written in week 1's §7
│  └─ week-01/
│     └─ Haldane/              ←   source + csproj committed; bin/ obj/ on disk, ignored
└─ dotnet-db-dev/              ← the clone beside it — never opened
```

VS Code shows `dotnet-db-coursework`, Explorer shows `.gitignore` + `week-01`, Source Control is quiet. Tonight adds `week-02/Haldane` beside `week-01` — by command, nothing reopened — and §1 manufactures one slipped file on purpose, then evicts it.

- [ ] ⚠️ **The instructor demo repo from week 1 is tonight's set — and it should be CLEAN.** Week 1 ended with the `.gitignore` written before the first commit, so verify: repo exists, four-line `.gitignore` at the root, and
  ```bash
  cd ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework && git ls-files | grep -cE '(^|/)(bin|obj)/'
  ```
  **`0` = ready.** §1 manufactures its own mess live — one file, on purpose, evicted the same segment.
- [ ] ⚠️ **If the demo repo is gone**, rebuild the week-1 end state (~2 min) — the force-push replaces the demo repo on GitHub, which is fine, it's the same teaching artifact:
  ```bash
  rm -rf ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework && mkdir -p ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework
  cd ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework
  printf 'bin/\nobj/\n*.user\n.DS_Store\n' > .gitignore
  dotnet new console -o week-01/Haldane
  cp ~/Repos/dotnet-db-dev-answer-keys/week-01/demo-starter/Haldane/*.cs week-01/Haldane/
  dotnet build week-01/Haldane
  git init && git add . && git commit -m "Week 1: Haldane duty console"
  git remote add origin https://github.com/jgrissom/dotnet-db-coursework.git
  git push -f -u origin main
  ```
- [ ] **Rehearse the whole thing once (≈20 min).** The §4 `dotnet new` wants a warm NuGet cache, and the §2 cleanup is a beat you want in your hands, not your head
- [ ] **Teaching profile in VS Code; close every other folder and tab.** Have VS Code open on **`~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework`** — the top, exactly where week 1's class left it, and the only folder that ever gets opened
- [ ] **Put [`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** The board gained a generator panel this week — say nothing about it; it explains itself or it isn't working. **Close it before slide 1**
  - ⚠️ **Wrong week showing?** The bare URL routes by date, so on class night it lands on week 2 by itself — but **when rehearsing ahead of the calendar it will show an earlier board, correctly.** Force it: **[`dutyconsole.com/?week=2`](https://dutyconsole.com/?week=2)** (works on any date), or go straight to [`dutyconsole.com/week-02.html`](https://dutyconsole.com/week-02.html). The `?week=` override is the supported way to look ahead — never edit `index.html`'s anchor to preview
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."***

## 1 · The four lines, revisited *(slides 2–5)*

### Four lines recapped

- [ ] 🎞️ **GO TO SLIDE 2** — *Four lines, working since day one* · *"you wrote these four lines last week, before your first commit, and watched the wall of untracked machinery collapse. Because of them, no repo in this room has ever held a file its owner didn't write. Thirty seconds of why, and then the thing they **can't** do"*
- [ ] The thirty seconds: *"`obj` is the compiler's scratch paper, `bin` is the built program — both regenerated from your source on every build. A repo holds what you wrote; the rest rebuilds. That's the whole argument"*
- [ ] ⚠️ **The lab-PC drill, 60 seconds, promised in the setup guide.** Lead with the contrast — it is what makes the drill land as a *category* rather than a chore: *"say your machine wiped overnight. You clone your repo, and those four lines are right there — the `.gitignore` lives in the repo, so it travels. Your name doesn't. That one lives on the machine, and git has forgotten who you are"*
- [ ] *"Two commands, from your notes, ten seconds"* —
  ```bash
  git config --global user.name "Ada Lovelace"
  git config --global user.email "ada@example.com"
  ```
  *"That's the whole drill. Every per-machine thing this course adds gets one of these, always under a minute"* 💡 **That's a promise you're making** — week 10's user secrets are the next one to collect it

### The slip

- [ ] 🎞️ **GO TO SLIDE 3** — *The slip* · *"here's what those four lines cannot do — and I'll show you by making the mistake on purpose, because one day you'll make it by accident: a rename, a new machine, a commit before the ignore file existed"*
- [ ] Swipe to VS Code — exactly where last week left it, the top, the only window — and **manufacture the slip live.** Say what `-f` is for as you go: *"force. I'm telling git to add this even though the ignore file says not to — which is exactly what a rename or a bad commit does to you by accident"*
  ```bash
  git add -f week-01/Haldane/bin/Debug/net10.0/Haldane.dll
  ```
- [ ] ⚠️ **Stop before committing and look** — this is the beat, and it needs the `.gitignore` open in the editor beside the terminal:
  ```bash
  git status
  ```
  *"`bin/` is line one of that file, right there on screen. And here's a file out of `bin/`, staged, ready to go in. The ignore file isn't a lock — it's a default, and `-f` walks straight past it"* 💡 **Don't dress this up as a puzzle** — they watched you type `-f`, so nothing here is a surprise; it's evidence being laid down for the slide that follows
- [ ] Now let it happen:
  ```bash
  git commit -m "a build artifact, committed by accident"
  ```
- [ ] Prove it's really in: `git ls-files | grep bin` → one tracked build artifact. *"There's a compiled binary in my repo now. And the `.gitignore` hasn't changed a character — completely powerless, because that file is already inside"*

### Ignored is not untracked

- [ ] 🎞️ **GO TO SLIDE 4** — *Ignored is not untracked* · 🎯 **this is the misconception half the internet has, so kill it precisely:** *"`.gitignore` is a bouncer. It stops new files at the door. The ones already inside? Already inside. Nothing about ignoring reaches back into the repo — which is why 'just add it to the gitignore' fixes nothing once the file is tracked"*

### The eviction

- [ ] 🎞️ **GO TO SLIDE 5** — *The eviction* · **read it aloud as you type it:** *"`rm` remove, `-r` and everything under it, `--cached` — **repo only, hands off my disk** — everything. Then re-add, and the bouncer filters what comes back:"*
  ```bash
  git rm -r --cached .
  git add .
  git commit -m "Week 2: take out the trash"
  ```
- [ ] `git ls-files | grep bin` → **nothing.** And in the Explorer: the `.dll` is still on disk, grayed out. *"`--cached` means the repo forgot it; my disk never will, because the compiler remakes it every build"*
- [ ] `git push`, and say the drill's name: 🎯 *"that's the whole eviction — three commands, and it works whether one file slipped in or four hundred. Someday, on some repo, you will need this. Now you have it"*
- [ ] **✓ CHECKPOINT:** somebody can say why the `.gitignore` alone couldn't fix it, and what `--cached` spared

## 2 · The panel, and a README *(slides 6–7)*

### The panel reads a clean tree

- [ ] 🎞️ **GO TO SLIDE 6** — *The panel reads the tree* · *"last week I made you type four commands and told you to leave this panel alone. Here's why that order: every region of this thing is one of those commands, and now you can read it — starting with what it says right now, which is nothing"*
- [ ] **Open the panel — it's empty, and that's the first lesson, not a problem:** *"an empty Changes list is `git status` saying 'working tree clean'. We committed everything a minute ago, and the panel agrees. Before it's buttons, it's a status readout"* — then name the regions in one pass: Changes = `status` · **+** = `add` · message box + **✓** = `commit` · **Sync** = `push` and pull. *"Easier to believe with something moving through it — so let's make a change worth committing"*

### A README, committed with the buttons

- [ ] 🎞️ **GO TO SLIDE 7** — *A README* · *"one more piece of hygiene, and then we write code. A repo with no README is a box with no label — and I open fifteen of these boxes every week"*
- [ ] New file at the root — `README.md` — and type it (yours will name you, theirs names them):
  ```markdown
  # dotnet-db-coursework

  Jeff Grissom · .NET Database Development, one folder per week.

  - week-01 — toolchain, first program, KDXR signs on
  - week-02 — input that lies, .gitignore, the caller line
  ```
- [ ] **Now the tour happens for real — watch the file move through the verbs, narrating each region as you click it:** it appears under *Changes* (`status` sees it) → **+** (`git add` — watch it jump to *Staged Changes*) → message `Week 2: readme` → **✓ Commit** → **Sync** (`git push`). Reload GitHub — the README renders on the repo's front page
- [ ] 🎯 *"Use whichever you like from here on. When the panel confuses you — and some week it will — the terminal is how you find out what it actually did. `git status` never lies"*
- [ ] 🔗 *"Your homework adds one of these to your own repo — a README — and from this week your repo hygiene is worth points every single week"*

## 3 · The console takes a reading *(slides 8–11)*

### A new week, the same move

- [ ] *"Back to C# — and notice what we don't do: open anything. A new week isn't a new window; it's a new name in the command."* In the same terminal, same spot:
  ```bash
  dotnet new console -o week-02/Haldane
  cp week-01/Haldane/Conditions.cs week-02/Haldane/
  ```
  🎯 *"`-o` made the week folder and the project in one go — there's `week-02` in the Explorer, right under `week-01`. That's every Monday for the rest of the term"*
- [ ] 🎯 **The `cp` is a beat, not plumbing:** *"that's last week's logic — Fahrenheit, safe-to-go-out — carried forward in one move. I didn't rewrite it; it was already right. **Your homework asks you for exactly this move** with your own `Station.cs`"*
- [ ] **Run it before touching it:**
  ```bash
  dotnet run --project week-02/Haldane
  ```
  `Hello, World!` — *"the fresh project runs, and `Conditions.cs` came along for the build. The carry-forward is already legal C# here, before I've typed a thing"*
- [ ] **First commit of the new week — in the panel:** stage, message `Week 2: new week, Conditions carried forward`, **✓ Commit**, **Sync**. 🎯 *"a commit is a save point. Make one whenever you're somewhere solid, and the interesting work becomes safe to botch — which is exactly what we're about to do"*
- [ ] In `week-02/Haldane/Program.cs`, delete the template line and paste the banner and the prompt. 📖 **Talk the `ReadLine` line through** — *"whatever they type, into a string"* — it's the one with the squiggle you're about to ignore on purpose:
  ```csharp
  Console.WriteLine("========================================");
  Console.WriteLine("  HALDANE STATION - DUTY CONSOLE");
  Console.WriteLine("  watch handover - readings typed by hand");
  Console.WriteLine("========================================");
  Console.WriteLine();

  Console.Write("Outside temperature (C): ");
  string raw = Console.ReadLine();
  ```
- [ ] 🎞️ **GO TO SLIDE 8** — *Input arrives* · *"last week every value on the board was typed into the source. Tonight the duty officer types it into the running program — which is how the real board works; it says right on it that it's kept by hand. You've all called `ReadLine` before. What you haven't done is read that squiggle"*

### The warning, read properly

- [ ] **Point at the squiggle under `Console.ReadLine()`. Do not fix it yet.** Hover it, and read the whole thing out loud
- [ ] 🎞️ **GO TO SLIDE 9** — *The warning you'd have ignored* · 🎯 *"`CS8600`, and it's a **warning**, not an error — the build succeeds, the program runs. Hands up: who read the warnings in their build output last semester?"* — expect near-zero, and give it the beat it deserves
- [ ] 🎯 **The sentence that reframes warnings for good:** *"an error is the compiler saying 'I can't build this.' A warning is the compiler saying **'I can build it, but this is the part I can't promise.'** Last week you learned the compiler's promise has an edge. A warning is the compiler drawing you a map of that edge — and everyone scrolls past it"*
- [ ] Prove it builds anyway — `dotnet run --project week-02/Haldane`, and point at the warning line scrolling by in the build output before the banner prints: *"there it is again, in writing, every build. `0 Warnings` is a sentence worth wanting"*

### What it was warning about

- [ ] 🎞️ **GO TO SLIDE 10** — *?? — or use this instead* · *"what it's warning about: `ReadLine` can hand back **nothing at all** — not an empty string, genuinely nothing. `null`. It happens when the input runs out, and 'the input runs out' is not hypothetical: my grader runs your homework and answers every question by pressing Enter"*
- [ ] Fix the line — one edit, squiggle gone:
  ```csharp
  string raw = Console.ReadLine() ?? "";
  ```
- [ ] ⚠️ **Bound it, because the room met `??` last week:** *"`??` means 'or use this instead' — same as the lab's `?? "somebody"`. That's the whole spelling for now. **Why C# is this careful about null is a week-5 conversation**, and it's a good one"*

### Text becomes a number

- [ ] Paste the rest — the parse and the board. 📖 **Talk the `Parse` line through** — *"turn that text into a number"* — it's the one that breaks in a minute:
  ```csharp
  double reading = double.Parse(raw);

  Console.Write("Blizzard warning (y/n): ");
  bool blizzard = (Console.ReadLine() ?? "") == "y";

  Console.WriteLine();
  Console.WriteLine($"Outside:         {reading} C  ({Conditions.Fahrenheit(reading)} F)");
  Console.WriteLine($"Blizzard:        {blizzard}");
  Console.WriteLine($"Safe to go out:  {Conditions.IsSafeToGoOut(reading, blizzard)}");
  ```
- [ ] 🎞️ **GO TO SLIDE 11** — *Text becomes a number* · *"everything `ReadLine` gives you is **text**. `\"-41.5\"` with quotes on it. The board does arithmetic, so it needs the number, and `double.Parse` is the converter — note the verb: it takes the string's word for it"*
- [ ] 💡 **The `bool` line is worth ten seconds, not more:** *"why `== \"y\"` instead of parsing a bool? Because `bool.Parse` wants the literal word `True`, and no human on a radio at 3 AM says `True`. Ask a y/n question, compare the answer. Parsing is for numbers"*
- [ ] Run it and type carefully — `dotnet run --project week-02/Haldane`, answer **`-41.5`** and **`y`**. The board fills in: `-42.7 F`, `Safe to go out: False`. *"Works. Last week's methods, this week's input"*
- [ ] **✓ CHECKPOINT:** the room can say what `??` did and what `Parse` did, and that both happened to *text*

## 4 · Input that lies *(slides 12–14)*

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

- [ ] **Fix it live** — paste the rewrite over the old block. 📖 **Say the `if` line as a question** — *"did that text turn into a number? then use it"* — the board has moved inside the answer:
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
- [ ] **Close the watch: commit tonight's code, with the panel** — Source Control shows the `week-02/Haldane` sources. ⚠️ **Point at what it does NOT show first: no `bin/`, no `obj/`.** 🎯 *"the four lines we wrote an hour ago are already covering a folder that didn't exist yet. That's why the file lives at the top of the repo"* — then stage, message `Week 2: the console takes readings without believing them`, **✓ Commit**, **Sync**
- [ ] 🔗 *"Commit as you go — it's graded from this week: three or more touching your week-02. Mine says what happened. Yours should too"*
- [ ] **✓ CHECKPOINT:** somebody can say why the warning and the crash were different failures — one flagged at compile time, one impossible to flag — **and** what `TryParse` returns for `null`

## 5 · Hand off to the lab *(slide 15)*

- [ ] 🎞️ **GO TO SLIDE 15** — *Lab: the caller line*. Leave it up for the whole lab
- [ ] 🎯 **The frame:** *"the desk you finished last week is in the starter, done — you're not behind if you missed it. Tonight the desk answers the phone, and the phone is where programs die. One of tonight's methods ships **already written and already wrong** — the day shift wrote it, it works every time Ray answers with a number, and Task 1 is crashing it with your own typing. The crash is on purpose. Cause it"*
- [ ] Setup on screen, said once: **pull the clone → drag the one `week-02` folder out of `starter` into your repo → `dotnet test week-02/Lab.Checks`** → **1 / 5**. *"Nothing to open — your window is already the right window. One folder in, one command, and the week is live"*
- [ ] ⚠️ **The one error worth pre-empting, every week until it sticks:** the week goes *in front* — `dotnet test week-02/Lab.Checks`. Forget it and `MSB1003` says so
- [ ] 🎯 **Say the target, and put "done" on their machines, not yours:** *"all five green is not the finish line — it's the checkpoint before it. **When check 4 goes green, run your program again and answer Ray with the exact sentence that crashed it in Task 1.** A desk you can't crash — that's what done looks like tonight, and every one of you gets to watch your own program do it"*
- [ ] *"Read the failure messages — check 3's and 4's tell you the tool, and check 4's names the crash you just watched me cause"*

## 6 · Wrap-up, after the lab *(slide 16)*

- [ ] 🎞️ **GO TO SLIDE 16** — *Tonight, in one picture*. Three beats: **your repo holds what you wrote** · **a warning marks the edge of the compiler's promise** · **Parse believes, TryParse asks**
- [ ] Homework, in two sentences: *"your own station grows a request line — greeting, a name for callers who won't give one, and a caller-number contest that survives any answer a human gives. And your repo gets tonight's cleanup: gitignore, untrack the old mess, README — all three are points now, and they stay points all semester"*
- [ ] ⚠️ Repeat the two that cost points silently: **a README at the top of your repo**, and **your program has to survive being run with nobody typing**
- [ ] 🔗 **Week 3:** *"next week the station starts keeping a list — callers, requests, all of it. You'll type three records in, quit, run it again, and they'll be gone. I want you to be annoyed by that. Being annoyed by it is the point"*
