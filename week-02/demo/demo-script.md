# Week 2 Demo Script — The Mess and the Lies 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. **Paste the code from here** — every block has a Copy button, and the room can't read code that appears character by character anyway. **Talk each block through once it's on screen** — that's the beat the typing used to provide. ⚠️ **Say what it *does*, never what it says:** `Console.WriteLine($"Station: {stationName}")` is *print the label, then drop the station's name in* — not *dollar sign, quote, curly brace.* **Name syntax only when the syntax is the lesson** (the `$`, the `.0`, the `out`).

**Type whatever you feel like typing** — this is a default, not a rule. **The one that would cost you if you didn't:** the **answers you give the running program** in §3–§4, especially `-41.5 C`. That isn't code; it's the room watching a human make a human's mistake, and pasting it throws the beat away. *(§1's `secrets.txt` is the opposite case — make the file in the Explorer where they can see it, then paste the contents, because that password gets read back off GitHub later and a typo makes the reveal fiddly.)*

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
> **The git half (§1–§2) collects last week's promise:** *what those four lines can't do.* The slip is manufactured on screen, the eviction drill teaches the one git skill everyone eventually needs, and the Source Control view gets its slot now that the verbs are known.
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
- [ ] ⚠️ **Rehearsed §1 already? Reset it, or the slip cannot happen.** The segment ends with `secrets.txt` **in** the `.gitignore` — so on a second run `git add .` skips it silently and there is nothing to commit. Put the repo back to week 1's end state:
  ```bash
  cd ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework && git reset --hard 2877f33 && git push -f && rm -f secrets.txt
  ```
  💡 **Check it took:** the `.gitignore` is back to **four** lines and `secrets.txt` is gone from disk. *(This is the one place `--hard` is wanted — it's the throwaway rehearsal repo, and §1 teaches students never to use it.)*
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

- [ ] 🎞️ **GO TO SLIDE 3** — *The slip* · *"the four lines cover machinery, and they've never let you down. But they only cover what you told them to cover — and one day you'll commit something you very much wish you hadn't. I'm going to do it on purpose. Twice"*
- [ ] Swipe to VS Code — the top, the only window. **New File at the root → `secrets.txt`** — making the file in the Explorer is what the room needs to see; the contents are just paste:
  ```
  # Haldane - mainland uplink
  UPLINK_USER=haldane_duty
  UPLINK_PASSWORD=southerly-1957
  ```
  *"Every real project has a file like this. Database password, API key, the thing that gets you in"*
- [ ] Commit it the way you'd commit anything — **innocently, without looking:**
  ```bash
  git add .
  ```
  ```bash
  git commit -m "Week 2: uplink config"
  ```
- [ ] 🎯 **Now the realisation. Say it flatly, no theatre:** *"…that file has the station's password in it. And I just put it in the repo"*
- [ ] 💡 **Name the habit that would have stopped it — one sentence, no command:** *"`git status` before a commit would have shown me exactly what I was about to add. It's ten seconds and I didn't do it, and neither will you, which is why the rest of this matters"* ⚠️ **Don't run it here** — the commit is made, so the tree is clean and it proves nothing; and running it *before* the commit hands the room the answer and kills the beat

#### Case 1 — it never left your machine

- [ ] 🎯 **The question the whole segment turns on. Ask it, and let them answer:** *"before anything else — one question decides what happens next. **Have I pushed it**?"* — you haven't. *"Then this is the good case, and it's the one you'll usually be in, because you notice within about ten seconds"*
- [ ] Undo the commit:
  ```bash
  git reset HEAD~1
  ```
- [ ] Show what that did — the commit is gone, the file is still on disk and simply unstaged again:
  ```bash
  git log --oneline
  ```
  *"The commit never happened. `secrets.txt` is still sitting there in my Explorer — `reset` moved the branch back a step, it didn't touch my files"*
- [ ] ⚠️ **The one warning that has to be said out loud, because they will find it:** *"there is a `--hard` version of that command, and it **throws your work away**. You will not need it this semester. Plain `git reset HEAD~1` undoes the commit and keeps everything you wrote"*
- [ ] 🎯 *"That's the best outcome in git: the mistake never left the building. Nobody else ever saw it, so it's genuinely as if it didn't happen"*

#### Case 2 — this time you weren't that lucky

- [ ] *"Same mistake. But tonight I'm tired, and I do the thing everybody does at the end of a session"* — commit **and push**:
  ```bash
  git add .
  ```
  ```bash
  git commit -m "Week 2: uplink config"
  ```
  ```bash
  git push
  ```
- [ ] **Refresh the repo on GitHub with the room watching.** There it is — `secrets.txt`, in the file list. Click it: the password, on a web page. *"That took four seconds and it is now somewhere I don't control"*

### Ignored is not untracked

- [ ] 🎯 **Ask for the fix before you give it** — this one is a real prediction, because it is what everybody tries first: *"what do I do?"* Somebody will say *add it to the `.gitignore`*. **Do exactly that, in front of them** — open the file and add a fifth line:
  ```
  secrets.txt
  ```
- [ ] ⚠️ **Name the exception as you type it, or you contradict week 1:** *"four lines, written once, never touched again — that was machinery, and that promise holds. A secret is a different category, and it's the one good reason to open this file again"*
- [ ] Now show it didn't work:
  ```bash
  git ls-files | grep secrets
  ```
  **Still there.** *"I've told git to ignore it. Git does not care"*
- [ ] 🎞️ **GO TO SLIDE 4** — *Ignored is not untracked* · 🎯 **this is the misconception half the internet has, so kill it precisely:** *"`.gitignore` is a bouncer. It stops new files at the door. The ones already inside? Already inside. Nothing about ignoring reaches back into the repo — which is why 'just add it to the gitignore' fixes nothing once the file is tracked"*

### The eviction

- [ ] 🎞️ **GO TO SLIDE 5** — *The eviction* · **talk it through as it goes up:** *"`rm` remove, `-r` and everything under it, `--cached` — **repo only, hands off my disk** — everything. Then re-add, and the bouncer filters what comes back. The ignore line had to exist first, which is why we wrote it"*
  ```bash
  git rm -r --cached .
  ```
  ```bash
  git add .
  ```
  ```bash
  git commit -m "Week 2: take out the trash"
  ```
- [ ] It's out of the repo, and still on your disk:
  ```bash
  git ls-files | grep secrets
  ```
  **Nothing.** And in the Explorer `secrets.txt` is still there, grayed out. *"`--cached` means the repo forgot it. My disk never will — and I still need that file to do my job"*
- [ ] Push it:
  ```bash
  git push
  ```
- [ ] **In the browser, on the repo's front page — refresh.** `secrets.txt` is **gone from the file list.** *"Fixed, as far as anyone can see"* — leave that hanging, it is the wrong conclusion and they are about to watch it break
- [ ] ⚠️ 🎯 **The beat this whole redesign exists for. Do not skip it, and do not soften it.** ⚠️ **Say which history, because there are two and only one of them proves anything:**
  - **In the browser, not the terminal.** `git log` on your machine shows commit *messages*; this beat needs the commit *contents*, on GitHub, where other people are.
  - **Not the file browser.** That is the view you just refreshed, and it only ever shows the **current** state — which is exactly why it looked fixed.
  - **The link is `Commits`**, above the file list on the repo's front page (the clock-with-arrow icon, *"N Commits"*). Click it, then click the **`Week 2: uplink config`** commit.
  - **The diff opens with `secrets.txt` in it and the password readable on screen.** Zoom in if the room is far back.
- [ ] 🎯 *"The file is out of my repo. The password is still on GitHub, in a commit anybody with access can read, and it is not coming back out. `--cached` untracked it going forward; it cannot un-happen the past"*
- [ ] 🎯 **So say the only real fix out loud:** *"once a secret is pushed, it is burned. You change the password. That is the entire remedy, and it's why the answer is never to let it happen — which is week 10's whole job, when your database password needs somewhere to live that isn't your repo"*
- [ ] 💡 **Then hand back the good news, because the drill is still worth having:** *"the eviction works identically for one file or four hundred, and most of what slips in is junk, not secrets. Someday, on some repo, you'll need it. Now you have it"*
- [ ] **✓ CHECKPOINT:** somebody can say what decides between the two fixes (*have you pushed?*), why the `.gitignore` alone couldn't fix case 2, and what `--cached` spared

## 2 · The view, and a README *(slides 6–7)*

### The view reads a clean tree

- [ ] 🎞️ **GO TO SLIDE 6** — *The view reads the tree* · *"last week I made you type four commands and told you to leave this view alone. Here's why that order: every region of this thing is one of those commands, and now you can read it — starting with what it says right now, which is nothing"*
- [ ] **Open the Source Control view — it's empty, and that's the first lesson, not a problem:** *"an empty Changes list is this thing telling you the working tree is clean. Before it's buttons, it's a status readout"*
- [ ] 🎯 **Then prove it, with the view still on screen** — don't ask them to take it on faith:
  ```bash
  git status
  ```
  *"Nothing to commit, working tree clean. Same answer, two places — the view isn't doing anything mysterious, it's running this"*
- [ ] 💡 **Worth naming the callback out loud:** *"last week these two disagreed — the badge said dozens, `git status` said one line, and that's how we met `-u`. Tonight they agree, because there's nothing to argue about"*
- [ ] Then name the regions in one pass: Changes = `status` · **+** = `add` · message box + **✓** = `commit` · **Sync** = `push` and pull. *"Easier to believe with something moving through it — so let's make a change worth committing"*

### A README, committed with the buttons

- [ ] 🎞️ **GO TO SLIDE 7** — *A README* · *"one more piece of hygiene, and then we write code. A repo with no README is a box with no label — and I open fifteen of these boxes every week"*
- [ ] New file at the root — `README.md` — and type it (yours will name you, theirs names them):
  ```markdown
  # dotnet-db-coursework

  Jeff Grissom · .NET Database Development, one folder per week.

  - week-01 — toolchain, first program, KDXR signs on
  - week-02 — input that lies, .gitignore, the caller line
  ```
- [ ] **Now the tour happens for real — watch the file move through the verbs, narrating each region as you click it:**
  - It appears under *Changes* — *"`git status` just saw it"*
  - **+** — *"that's `git add`"* — watch it jump to *Staged Changes*
  - The message box — paste:
    ```
    Week 2: readme
    ```
  - **✓ Commit**, then **Sync** — *"that's `git push`"*
- [ ] Reload GitHub — **the README renders on the repo's front page**
- [ ] 🎯 *"Use whichever you like from here on. When the view confuses you — and some week it will — the terminal is how you find out what it actually did. `git status` never lies"*
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
- [ ] 🎯 **It prints `Hello, World!` — and that is worth fifteen seconds, because the interesting question isn't why it said that.** Ask, then wait: *"I just copied a whole file of working code in here — Fahrenheit, safe-to-go-out, all of it. So why did none of it happen?"*
  - **The answer, once somebody offers it:** nothing called it. `Program.cs` is still the template's one line, and `Conditions.cs` is sitting there compiled, reachable, and completely idle. 💡 **That's week 1's rule seen from the other side** — logic in `Program.cs` can't be called by anything; a class nobody calls doesn't run. They're the same lesson, and this is the cheapest place to say so
  - *"What it does prove: the carry-forward is already legal C# in here, before I've typed a thing"*
- [ ] **First commit of the new week — in the Source Control view:** stage, paste the message, **✓ Commit**, **Sync**:
  ```
  Week 2: new week, Conditions carried forward
  ```
- [ ] 🎯 *"a commit is a save point. Make one whenever you're somewhere solid, and the interesting work becomes safe to botch — which is exactly what we're about to do"*
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
- [ ] 🎞️ **GO TO SLIDE 8** — *Input arrives* · *"last week every value on the board was typed into the source. Tonight the duty officer types it into the running program — which is how the real board works; it says right on it that it's kept by hand. You've all called `ReadLine` before. What you probably haven't done is read what the editor says about it"*

### The warning, read properly

- [ ] **Swipe back to VS Code** — the deck is fullscreen, so the editor has been hidden behind it. **Run it, without fixing anything:**
  ```bash
  dotnet run --project week-02/Haldane
  ```
- [ ] ⚠️ **This is the evidence, and it is the one that never fails.** **Scroll up to the build output above the banner and point at it:**
  ```
  warning CS8600: Converting null literal or possible null value to non-nullable type.
  ```
  *"The program ran. It printed the banner, it asked me for a reading. And on the way past, the compiler said that — every build, in writing"*
- [ ] 🎞️ **GO TO SLIDE 9** — *The warning you'd have ignored* · 🎯 *"`CS8600`, and it's a **warning**, not an error — the build succeeded, the program ran. Hands up: who read the warnings in their build output last semester?"* — expect near-zero, and give it the beat it deserves
- [ ] 🎯 **The sentence that reframes warnings for good:** *"an error is the compiler saying 'I can't build this.' A warning is the compiler saying **'I can build it, but this is the part I can't promise.'** Last week you learned the compiler's promise has an edge. A warning is the compiler drawing you a map of that edge — and everyone scrolls past it"*
- [ ] 💡 **Bonus, only if it's there: the squiggle.** Back in `Program.cs`, `Console.ReadLine()` may be underlined — hover it and it says the same thing. *"And your editor has been telling you this the entire time"* ⚠️ **Do not build the beat on it and do not go hunting for it.** The language server is genuinely unreliable in the minutes after `dotnet new` — verified silent across three sessions on the author's own machine, with `dotnet build` reporting `CS8600` perfectly throughout, and **`.NET: Restart Language Server` does not fix it; only `Developer: Reload Window` does** (2026-08-06). **If the Problems view is empty, move on — the terminal already made the point**

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
- [ ] Run it and type carefully:
  ```bash
  dotnet run --project week-02/Haldane
  ```
- [ ] Answer **`-41.5`** and **`y`**. The board fills in: `-42.7 F`, `Safe to go out: False`. *"Works. Last week's methods, this week's input"*
- [ ] **✓ CHECKPOINT:** the room can say what `??` did and what `Parse` did, and that both happened to *text*

## 4 · Input that lies *(slides 12–14)*

### The break

- [ ] ⚠️ **Unannounced, as always.** Run it again, and this time answer the way a watch officer writes a log entry — say it as you type: *"minus forty-one point five, **degrees C**"*:
  ```
  -41.5 C
  ```
- [ ] 💥 **`Unhandled exception. System.FormatException: The input string '-41.5 C' was not in a correct format.`** — let it sit. Then, deliberately: *"the build was clean. No error, no warning — the `??` fix took care of the only thing it was worried about. It ran perfectly every time I rehearsed. And it just went down, at 3 AM, over a **unit of measurement**"*
- [ ] **Read the crash like week 1 read the build error:** the exception **type** (`FormatException` — searchable, like an error code) · the message (*was not in a correct format* — it names the input) · the line number. *"A runtime crash has an anatomy too, and it tells you where it died"*
- [ ] 🎯 **Ask before explaining:** *"the compiler warned me about null. Why didn't it warn me about this?"* — someone will get there: *because the input didn't exist yet.* *"Right. Compiling happened this afternoon. `-41.5 C` happened just now. **No compiler, in any language, can check a value that arrives after compiling is over.** Last week's gap was arithmetic it considered fine; this week's gap is everything your users will ever type"*
- [ ] 🎞️ **GO TO SLIDE 12** — *Input that lies* · *"and input lies constantly. A unit. A comma. The word 'about'. `Parse` takes the string's word for it, and the string was wrong"*

### The tool that asks first

- [ ] **Fix it live.** In `week-02/Haldane/Program.cs`, **select from `double reading = double.Parse(raw);` down to the last line of the file** — that's everything below `string raw = ...`, the parse and the whole board — and paste this over the top of it. 📖 **Say the `if` line as a question** — *"did that text turn into a number? then use it"* — the board has moved inside the answer:
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
- [ ] **Close the watch: commit tonight's code, with the view** — Source Control shows the `week-02/Haldane` sources. ⚠️ **Point at what it does NOT show first: no `bin/`, no `obj/`.** 🎯 *"the four lines we wrote an hour ago are already covering a folder that didn't exist yet. That's why the gitignore file lives at the top of the repo"* — then stage, paste the message, **✓ Commit**, **Sync**:
  ```
  Week 2: the console takes readings without believing them
  ```
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
