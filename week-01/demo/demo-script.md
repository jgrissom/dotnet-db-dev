# Week 1 Demo Script — Haldane Station Boots Up 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. **Paste the code from here** — every block has a Copy button, and the room can't read code that appears character by character anyway. **Talk each block through once it's on screen** — that's the beat the typing used to provide. ⚠️ **Say what it *does*, never what it says:** `Console.WriteLine($"Station: {stationName}")` is *"print the label, then drop the station's name in"* — not *"dollar sign, quote, curly brace."* **Name syntax only when the syntax is the lesson** (the `$`, the `.0`, the `out`).

**Type whatever you feel like typing** — this is a default, not a rule. **The one that would cost you if you didn't: §5's fix.** The generator block arrives already broken (`int burnPerHour`) and should look unremarkable — but the *repair* is one word changed in front of the room, `int` → `double`, and the answer changing as they watch is the whole payoff. Two seconds of typing, and they're the two that matter.

> [!TIP]
> **Clickable version:** [the hosted script](https://jgrissom.github.io/dotnet-db-dev/week-01/demo/script.html) — checkboxes survive refreshes; Reset button for next run.

> [!TIP]
> **This sheet is the running order. The deck is a prop it tells you to pick up.**
>
> The projector has two states and you swipe between them: **the slides**, or **VS Code and the terminal side by side**. This sheet stays private on your laptop or tablet.
>
> **🎞️ means swipe to the slides.** Every 🎞️ line says the same thing: *put that slide up, talk to it.* There are no exceptions and no cue that means "not yet" — if a slide would give away a punchline, its cue is further down, at the moment it's due. Everything that isn't a 🎞️ line happens in the other state, so **you don't need a cue to come back**.
>
> Lost your place? **The nearest 🎞️ above you is the slide that should be showing** — and every slide's footer names the section and beat of this sheet it belongs to.

> [!IMPORTANT]
> **This room has already taken a C# course, and the whole night is paced against that.**
>
> **Familiar beats move fast.** §3 and §4 are recap — if you find yourself explaining what a `string` is, you have taken eight minutes from git.
>
> **Two beats carry the evening, and both are new to them.** §5's *second* break divides two whole numbers, gets a wrong answer, and shows **no error and no warning at all** — that's the payoff and it gets twenty minutes. Then §6's split: **logic inside `Program.cs` cannot be called, tested or graded by anyone.** Most of the room has spent a semester writing programs that live entirely in `Program.cs`.
>
> ⚠️ **§5's first break is a warm-up, not a reveal.** They have seen a build fail. Play it as "now read it properly", inside four minutes, and move on.

## 0 · Before class

**The set, at curtain — check this before anything else:**

```
instructor/                    ← the container on your machine
├─ dotnet-db-coursework/       ← OPEN IN VS CODE, and completely EMPTY
└─ dotnet-db-dev/              ← a plain clone beside it — never opened
```

VS Code shows `dotnet-db-coursework` in the title bar and an **empty Explorer**. That emptiness is the first beat of the night — §3 turns nothing into a program on screen. By §9 the same window holds `.gitignore` + `week-01/Haldane/`, committed and pushed clean — which is also **week 2's opening state**, untouched.

- [ ] **Copy `week-01/demo-starter/Haldane` out of the private repo** somewhere you can look at it — that's the **finished** state. ⚠️ **Do not open it in class.** Tonight's first beat is an empty folder becoming a program, and having it pre-made throws that away
- [ ] ⚠️ **Reset to exactly what the room will have after §2** — an empty `dotnet-db-coursework` and nothing else. §3 *creates* `week-01` inside it on screen, and a leftover folder kills that beat:
  ```bash
  rm -rf ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework && mkdir -p ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework
  ```
- [ ] 🎯 **This is deliberate: your folders match theirs exactly, all night.** They make `dotnet-db-coursework` in §2, you already have it; §3 puts `week-01` inside it; §7 does `git init` at the top. **Nothing you do on screen is a "demo shortcut" they have to mentally translate**
- [ ] **Have VS Code's Open Folder dialog land somewhere sane** — open `~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework` once beforehand so the picker starts there and you aren't navigating your home directory on the projector
- [ ] **Rehearse the whole thing once (≈20 min)** — it also warms the NuGet cache, so the first `dotnet new` in front of the room is instant rather than a thirty-second stare
- [ ] ⚠️ **Pre-position two terminals for §8** — **separate windows, not VS Code's integrated one.** One in the answer key's `week-01/lab/solution`, one in a throwaway copy of `starter/week-01`. *(Navigating live puts the answer-key path on the wall, and fumbles the one moment the room needs a clean number.)*
- [ ] ⚠️ **Bump the font in those windows too.** *Terminal sized for the back row* above is about VS Code's integrated terminal — a separate app window has its own setting and defaults small
- [ ] **Position and warm the solution window — the answer key is already on your machine, in the private repo's clone.** Nothing to fetch. ⚠️ **This line assumes the two course repos are cloned side by side under `~/Repos`** — if yours live somewhere else, change the path. **It is the only machine-specific command in this sheet:**
  ```bash
  cd ~/Repos/dotnet-db-dev-answer-keys/week-01/lab/solution
  dotnet test Lab.Checks
  ```
- [ ] **Do the same in the starter window**, then leave both open. **The first run in each restores and builds — warm it's about a second, cold it's half a minute of scrolling build output** at the exact moment you want one clean number on screen
- [ ] Terminal sized for the back row. **Editor font up too** — tonight is the night people are checking whether they can read the screen at all
- [ ] Teaching profile in VS Code; close every other folder and tab
- [ ] Have the [setup guide](../setup-guide.md) open on a projector-adjacent tab, or printed. **It is self-serve by design** — your job in §2 is to circulate, not to present
- [ ] ⚠️ **Check your own `git config --global user.name`** is the teaching identity and not something you'd rather not project
- [ ] **`instructor/` mirrors a student machine** — the demo coursework folder sits beside its own plain clone, so the two-folder layout on screen is the one the room builds, and any student step is demonstrable from your chair. If the clone is missing:
  ```bash
  cd ~/Repos/dotnet-db-dev-course-trial/instructor && git clone https://github.com/jgrissom/dotnet-db-dev.git
  ```
- [ ] **Put [`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive**, and leave it there while the room settles. **Costs no class time** — it is read by whoever is early, and it makes the banner you type in §3 land as *that thing that was on screen when I walked in.* ⚠️ **Close it before slide 1**, and don't introduce it, explain it or refer to it. It is the station's own board; it explains itself or it isn't working
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."*** Tonight especially, because the temptation to follow along is highest when the material is familiar

## 1 · Welcome *(slides 2–4)*

### The one idea

- [ ] 🎞️ **GO TO SLIDE 2** — *Sixteen weeks, one idea* · don't rush it. *"Everything in this course is one argument. Data in memory dies when the program stops. Data in a file survives, but asking it questions hurts. A database fixes both — and it's most of the second half"*
- [ ] 🎯 **Make the promise out loud and make it specific:** *"in week 3 you'll type three records into a program, quit it, start it again, and they'll be gone. I want you to be annoyed by that. Being annoyed by it is the point"*

### Tonight

- [ ] 🎞️ **GO TO SLIDE 3** — *Tonight*. Four things, and be honest about the shape: *"fifteen minutes of paperwork, a toolchain check most of you pass in five, and then we get to the part that's actually new"*

### The paperwork

- [ ] **Slide 3 stays up; swipe to the browser for Canvas.** Fifteen minutes, once, and never again: the syllabus (top to bottom, fast — dates, the drop-lowest rules if any, contact and office hours), then **the Canvas tour**: where assignments appear, where the repo URL gets submitted, where announcements land
- [ ] 🎯 **How grading works in this course, said plainly, because it's unusual:** *every week is 20 points. Most of them are checked by a program — the same checks you run yourself before submitting, so your score should never be a surprise. The rest is your repo: commits that tell a story, work that's pushed. There is no midterm and no final exam; there is a project, from week 4, on a topic you pick*
- [ ] ⚠️ **Due rhythm, once:** homework is due before the next class, submitted as a repo URL on Canvas — *the URL never changes after tonight, so submitting is thirty seconds*
- [ ] 💡 Questions about grading policy get answered now or parked to office hours — **do not let the paperwork eat the toolchain slot**

### You already write C#

- [ ] 🎞️ **GO TO SLIDE 4** — *You already write C#* · 🎯 **the frame for the whole term, and it buys you permission to move fast:** *"you have all written C#. I am not going to teach you what a loop is, or a method, or a class. This course is the part your last one didn't have room for — code that a machine can test, git, collections, and a real database underneath it"*
- [ ] 💡 Be straight about the overlap rather than hiding it: *"some of tonight you'll have seen. I'll go fast through those bits. Two things you almost certainly haven't seen, and they're both after the second break"*

## 2 · Toolchain check *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Toolchain check*. Leave it up; it's the checklist for the whole segment
- [ ] Point people at [`setup-guide.md`](../setup-guide.md) and say the rule: **run the four checks at the top, and only read a section if its check failed**
  ```bash
  dotnet --version
  git --version
  git config --global user.name
  ```
- [ ] ⚠️ **Name the two name-collisions before they cost anyone ten minutes:** VS **Code** is not Visual **Studio**; the **C#** extension is not **C# Dev Kit**. Anyone who came through full Visual Studio last term needs both said out loud
- [ ] **Circulate. Do not present during this segment** — the room is at a dozen different stages and a demo strands whoever is behind
- [ ] 🎯 **The two failures worth calling out once, loudly:** *if the terminal says 'command not found', it was open while you installed — close it completely and open a new one. And if `dotnet --version` says 8 or 9, that's last term's SDK. Install 10 anyway; they live side by side*
- [ ] ⚠️ **`git config --global user.name` is the check most of them fail**, because an intro course rarely sets it up. That's expected and it's not a problem — it's two commands
- [ ] ⚠️ **§5 of the guide is the part that gets skipped, because it isn't an install and the fast finishers stop reading.** It has **two** endings and the lab needs both — **a `dotnet-db-coursework` folder of their own** (empty, made with Open Folder → New Folder) **and** a clone of the course repo:
  ```bash
  git clone https://github.com/jgrissom/dotnet-db-dev.git
  ```
- [ ] 🎯 **Say why there are two folders, once, clearly** — it prevents the commonest confusion of the night: *`dotnet-db-coursework` is yours and starts empty. `dotnet-db-dev` is mine and you only ever copy things **out** of it. Never work inside mine*
- [ ] **✓ CHECKPOINT:** every machine prints a `10.` from `dotnet --version`, prints a name from `git config`, **and has both folders** — `dotnet-db-coursework` (theirs, empty) beside `dotnet-db-dev` (the clone) — before the break. ⚠️ **A missing coursework folder does not hurt until 2:50 and then costs ten minutes**
- [ ] 💡 **Verified and idle by 0:25?** Take the break early and give the minutes to §7. **Do not pad the recap segments** — that's the one way to lose this room

## 3 · What the project actually is *(slides 6–8)*

### Two commands

- [ ] 🎞️ **GO TO SLIDE 6** — *Two commands* · then swipe away and actually do it, **on screen, in this order**:
- [ ] **VS Code → File → Open Folder → `dotnet-db-coursework`** *(the empty folder they made in §2)* **→ Open.** An empty explorer pane, and say so: *"nothing. That's the starting point — and this is the **only folder any of us opens, all semester**. Sixteen weeks from now, this same window"*
- [ ] Then the **VS Code integrated terminal** (`` Ctrl+` ``), standing at the top — where it lives all term:
  ```bash
  dotnet new console -o week-01/Haldane
  ```
  ```bash
  dotnet run --project week-01/Haldane
  ```
- [ ] 🎯 **This is the beat that pays off all term, so say it deliberately:** *"look at the path in that command. `-o` made the week folder AND the project inside it, in one go — and when I run it, I name the whole path: week, then project. **The folder you open holds weeks; weeks hold projects; commands say which.** I never move, I never open anything else, and neither will you. Next week the command says `week-02` and everything else about it is identical"*
- [ ] Name the difference while it's concrete — **this is the new part of the beat, not `Hello, World!`**: *"C# doesn't run a file — it runs a **project**, a folder that knows how to build itself. If your last course was full Visual Studio, this is File → New Project with the wizard taken away"*
- [ ] 💡 **If someone asks why not just `cd` in:** *"because from this one spot, everything works — this week's projects, last week's, the checks, and git. The moment you wander, some command stops working and you have to remember where you are. Stay put, name the path"* 🔗 **forgetting the week prefix is the error they will hit in the lab, and `MSB1003` names it**

### What it made

- [ ] 🎞️ **GO TO SLIDE 7** — *What dotnet new made*. Then open the folder in VS Code and tour it — briskly:
- [ ] `Haldane.csproj` — **open it**, because most of them have never looked inside one: *"eight lines of XML that say which .NET and which packages. You'll add a line to this in week 3, and it's the whole reason there's no `.sln` in this course"*
- [ ] `bin/` and `obj/` — 🎯 *"you didn't write any of this and you never edit it. Remember these two names — they come back tonight, the moment git meets this folder"* ⚠️ **plant it, don't explain it** — §7's wall-and-collapse beat is where they get their moment

### The whole file

- [ ] 🎞️ **GO TO SLIDE 8** — *Program.cs is the whole file* · **twenty seconds, don't teach it:** *"one file, statements top to bottom, no class around them. This is where your program starts"* 🔗 **that second half plants §6** — `Conditions.cs` is a file the program does NOT start in
- [ ] **Ask, don't assume:** *"has anyone written `static void Main` before?"* — hands up, one sentence (*"older spelling, both still work"*); no hands, move on. ⚠️ **Never frame the slide as "where did Main go?"** — most of this room has never had one
- [ ] In `week-01/Haldane/Program.cs`, delete the template line and paste the banner. 📖 **Say what it does** — it's the station introducing itself:
  ```csharp
  Console.WriteLine("========================================");
  Console.WriteLine("  HALDANE STATION - DUTY CONSOLE");
  Console.WriteLine("  nearest neighbour: 512 km");
  Console.WriteLine("========================================");
  Console.WriteLine();
  ```
- [ ] `dotnet run --project week-01/Haldane`. **Set the fiction here** — this is the only world-building beat, and it takes about twenty seconds: *"Haldane is a research station in Antarctica. Twelve people, five hundred kilometres from anybody, and one console. **Everything the station knows about itself is on this screen** — the fuel, the weather, the log, all of it. There's no browser, no phone, no app, and no second opinion: if it's wrong here, it's just wrong, and nobody finds out from somewhere else. Tonight it answers two of those questions — does the generator last the night, and is it safe to go outside. Get one of those wrong and somebody's out in it at forty below"*
- [ ] ⚠️ **Say "Antarctica" out loud — it is the only place all night the room is told where they are.** Everything else is inference from `-41.5`, `Blizzard: True` and `512 km`, and most of them will get there, but one word is cheaper than an evening of mild uncertainty
- [ ] ⚠️ **Resist improvising extra features into it** — no roster of who's out on the ice, no incident log, no sign-out board. Each one is a promise with a due date, and tonight builds none of them; week 3 makes the log real

## 4 · The status board *(slides 9–11)*

> **This whole section is recap and it has fifteen minutes. Type, run, land one sentence per slide, move.**

### A declared type

- [ ] Paste the four declarations. 📖 **Name all four as promises, in one breath** — *"a string called stationName, an int called personnelOnStation, a double called temperatureC, a bool called blizzardWarning"* — no commentary yet; 🔗 **slide 10 is that same list, so this is the room hearing it before they see it**:
  ```csharp
  string stationName = "Haldane";
  int personnelOnStation = 12;
  double temperatureC = -41.5;
  bool blizzardWarning = true;
  ```
- [ ] 🎞️ **GO TO SLIDE 9** — *Variables have types* · 🎯 **one sentence, and it's the only one worth slowing down for:** *"you have all typed this. What that word at the front actually is, is a promise — and the compiler is going to hold you to it for the whole life of the variable. Hold that thought for twenty minutes, because tonight is about exactly how far that promise goes"*

### The four types

- [ ] 🎞️ **GO TO SLIDE 10** — *The four types* · quick tour, no more than twenty seconds. **Do not teach these**
- [ ] 💡 If anyone asks about `var`: *"it means 'work it out from the value'. The variable still has one type forever, you just didn't type it. Week 3, when the type names get long"*

### Putting values into text

- [ ] Paste the status board. 📖 **Talk one line through** — *"a label, then a value dropped in"* — and let the pattern carry the rest:
  ```csharp
  Console.WriteLine($"Station:     {stationName}");
  Console.WriteLine($"On station:  {personnelOnStation}");
  Console.WriteLine($"Outside:     {temperatureC} C");
  Console.WriteLine($"Blizzard:    {blizzardWarning}");
  Console.WriteLine();
  ```
- [ ] 🎞️ **GO TO SLIDE 11** — *Putting values into text* · one useful line beyond the recap: *"anything in the braces gets **evaluated** — that can be a whole expression, including a method call. You'll want that in about ten minutes"*
- [ ] Run it and the board fills in:
  ```bash
  dotnet run --project week-01/Haldane
  ```

## 5 · What the compiler cannot catch *(slides 12–14)*

### The warm-up

> ⚠️ **Four minutes, and do not oversell it.** They have all seen a build fail. The job here is to make them *read* the message, and to set up the contrast with what follows.

- [ ] Change the personnel line, without ceremony:
  ```csharp
  int personnelOnStation = "twelve";
  ```
- [ ] `dotnet run --project week-01/Haldane`. 🎞️ **GO TO SLIDE 12** — *The build failed* · nobody is surprised. Fine. But be precise about what just happened: *"it didn't print the banner, it didn't print the station name — the program **did not run**. Not 'ran and crashed'"*

### Reading an error

- [ ] 🎞️ **GO TO SLIDE 13** — *Reading an error*. Back to the terminal and take the message apart on screen: **file · line and character · what's wrong**
- [ ] 🎯 *"`CS0029`. Every C# error has a code and it's searchable. Paste the code and the message into a search box and you get the actual documentation. Most of you have been reading the squiggle and guessing. Read the code instead"*
- [ ] Fix it back to `12`, `dotnet run --project week-01/Haldane`, banner returns

### The limit

- [ ] Paste the generator block. ⚠️ **The bug is already in it — `int burnPerHour` — and that is exactly the point: nothing here looks wrong.** 📖 **Talk it through as if it were fine** — *"the fuel, divided by the burn rate, into a double"* — and say nothing about the types:
  ```csharp
  int fuelLitres = 4300;
  int burnPerHour = 800;

  double hoursOfFuel = fuelLitres / burnPerHour;
  Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
  Console.WriteLine();
  ```
- [ ] **Predict, hands up:** *"4300 litres, 800 an hour. What prints?"* — the room will say five point something
- [ ] ⚠️ **Break 2 — the payoff. Do not announce it.** `dotnet run --project week-01/Haldane` → **`5 hours remaining`**. 🎯 Let it sit. *"Five. The real answer is 5.375 — that's twenty-two minutes of heat, at forty below. And look at the terminal: no error. No warning. **Nothing.** Look at the editor: no squiggle. The compiler had no opinion about this at all"*
- [ ] ⚠️ **Don't rescue it too fast.** If nobody speaks within twenty seconds, ask *"is that right?"* — never *that's wrong*
- [ ] **Ask before explaining:** *"why?"* — someone usually gets there, and a few will have been bitten by it before. **Let that person say it.** Then: *"both sides are whole numbers, so C# did whole-number division and threw the remainder away. Then it stored `5` in a double, as 5.0. **The decimal point was gone before `double` ever got involved**"*
- [ ] 💡 **The follow-up that separates knowing-the-fix from understanding it:** *"so would casting the answer to double save you?"* — no. `(double)(4300 / 800)` is 5.0. *"The fix has to happen before the division, not after"*
- [ ] 🎞️ **GO TO SLIDE 14** — *What the compiler cannot catch* · **fix it live, and type this one by hand** — `int` becomes `double` on the `burnPerHour` line. ⚠️ **This is the typing that matters tonight:** one word, changed in front of them, and the answer changes:
  ```csharp
  double burnPerHour = 800;
  ```
- [ ] `dotnet run --project week-01/Haldane` → **5.375**. 🎯 **The sentence the course hangs off:** *"here is the promise that word at the front actually makes. **The compiler checks that your types line up. It does not check that your program is right.** Those are wildly different promises, and everything that lives in the gap is yours to catch. That gap is why week 7 exists, and why every lab you do has a file full of checks in it"*
- [ ] 🔗 *"You will meet this exact bug in the lab tonight, in check 4. Now you know what it looks like"*
- [ ] **✓ CHECKPOINT:** somebody can say why `4300 / 800` gave 5, **and** why casting the result doesn't fix it

## 6 · The part that has to be right *(slides 15–17)*

### A method

- [ ] 🎞️ **GO TO SLIDE 15** — *The words in front of a method* · **three words, already annotated on the slide — say them and stop:** *"`public` — the checks can reach it. `static` — no object needed first. `string` — what comes back."* **Sixty seconds; it's recap.** ⚠️ **Don't explain `static` past that** — slide 16 owes it to week 5, and spending it here is how this segment eats §6's real beat
- [ ] Make a **new file — `week-01/Haldane/Conditions.cs`**, beside `Program.cs` *(right-click the `Haldane` folder in the Explorer, not the toolbar button — that one lands at the top of the repo)*, and paste it. 📖 **Say the signature as a sentence** — *"takes a double, gives back a double, called Fahrenheit"*:
  ```csharp
  public static class Conditions
  {
      public static double Fahrenheit(double celsius)
      {
          return celsius * 9 / 5 + 32;
      }
  }
  ```
- [ ] 💡 Someone may ask why `* 9 / 5` doesn't lose its remainder like the fuel did — **good question, and it's the checkpoint from §5 being applied**: *"because `celsius` is already a double, so the whole line is double arithmetic. The trap needs **both** sides to be whole numbers"*

### Two words owed

- [ ] 🎞️ **GO TO SLIDE 16** — *What nobody told you yet* · ⚠️ **do not say "you're not expected to understand this" — they've written classes and it would be condescending.** Say the true version: *"you have all typed `public static class`. What I'd bet nobody told you is **why** — why a class hides anything at all, which is week 4, and what `static` is actually doing, which is week 5. If you've been adding `static` because the red squiggle asked you to, week 5 is the week that stops"*
- [ ] Add the second method — **two things in, one `bool` out**, which is worth one line out loud: *"the answer to a yes/no question has a type too, and it's called `bool`"*
  ```csharp
      public static bool IsSafeToGoOut(double celsius, bool blizzard)
      {
          return celsius > -50 && !blizzard;
      }
  ```
- [ ] In `Program.cs`, call them — the class name, a dot, the method:
  ```csharp
  Console.WriteLine($"That's {Conditions.Fahrenheit(temperatureC)} F.");
  Console.WriteLine($"Safe to go out: {Conditions.IsSafeToGoOut(temperatureC, blizzardWarning)}");
  ```
- [ ] `dotnet run --project week-01/Haldane` → `-42.7 F` and `Safe to go out: False`

### Two files, two jobs

- [ ] 🎞️ **GO TO SLIDE 17** — *Two files, two jobs* · 🎯 **this is the second of tonight's two real beats. Give it its full three minutes and do not let it sound like tidiness:** *"`Program.cs` is what a human sees. `Conditions.cs` is what has to be **right**. In an hour you'll open a lab with a `Broadcast.cs` in it, and its checks call `Broadcast.SignOn` directly and ask what came back — same shape, different station. They cannot call anything inside `Program.cs`. **Nothing can.** Not the checks, not me, not you"*
- [ ] 🎯 **Ask it here, where it pays off:** *"last semester, when you wrote a program — where did the actual work live?"* Most will say `Program.cs`, top to bottom. Then: *"that worked, and it will never work again — not because I say so, but because a thing nobody can call is a thing nobody can test and nobody can grade"*
- [ ] 💡 **Prove it rather than asserting it, if the clock allows (30 seconds):** move `Fahrenheit` to the bottom of `Program.cs`, mark it `public`, and show the call failing to resolve. *"Public doesn't help. It has to be in a class, in its own file"*
- [ ] 🔗 **Plant week 7 without spending it:** *"there's a file in tonight's lab that grades you. In week 7 you find out it isn't magic, and you write one"*
- [ ] **✓ CHECKPOINT:** the room can say which file the checks can see, and why

## 7 · Onto GitHub *(slides 18–19)*

> **Thirty minutes, and it needs them. Assume nobody has used git.** It's graded every week from here — and the `.gitignore` collapse in the middle is one of tonight's best beats; don't rush it.

- [ ] 🎞️ **GO TO SLIDE 18** — *Four commands*. 🎯 **Open with the payoff of the one-window design:** *"notice what we don't have to do: move. Every `dotnet` command tonight named its week from this exact spot — and git wants to run at the top of the repo, which is **exactly where this terminal has been standing all night.** One window, one place, both tools"*
- [ ] ⚠️ **Quick confirm before `git init`** — the prompt reads `dotnet-db-coursework` (it will, unless a stray `cd` happened; if in doubt, close the terminal and `` Ctrl+` `` a fresh one — it always starts at the top)
- [ ] The first command, then **stop and look**:
  ```bash
  git init
  ```
- [ ] 🎯 **Before running anything else, let them notice** — *"anything different in the IDE?"* The Source Control icon just grew a badge with a number on it. **The window IS the repo, so VS Code saw it instantly — no dialog, nothing to configure.** Then ask the terminal the same question, with the command they will actually type every day:
  ```bash
  git status
  ```
- [ ] 🎯 **Sit on the oddity — this is a notice-then-explain beat, so don't answer it yourself:** *"one line. For a folder with dozens of files in it. And the badge over there says something completely different. Anything strike you as odd?"* Let it hang, then explain: **git summarises an untracked folder as a single line rather than listing what is inside it.** To see the lot:
  ```bash
  git status -u
  ```
  *"`-u` — untracked files, all of them. Now we are looking at what git is actually looking at."* 💡 **They will use plain `git status` for the rest of their lives; `-u` is for tonight, and for any time a folder is hiding its contents from you.**
- [ ] 🎯 **The wall.** Screens of red — every file git can see. **Scroll it, then ask the room:** *"how much of this did I write?"* — let them find it: `Program.cs`, `Conditions.cs`, a `.csproj`… and screen after screen of `bin/` and `obj/`. *"Three files are mine. The rest is the compiler's machinery — scratch paper and build output, remade from my source every single build. A repo holds what you **wrote**. Nobody wants this"*
- [ ] 🎯 **The collapse — one of tonight's best twenty seconds.** In the Explorer, **click the empty space below the file list** (so it lands at the root), **New File → `.gitignore`**, and type it **with the Source Control badge in view** — watch the number fall as lines land:
  ```
  bin/
  obj/
  *.user
  .DS_Store
  ```
  *"Watch the badge. `bin/` — falling. `obj/` — there. Four lines, and git now sees exactly what I made"* 💡 **The last two, one sentence each:** `*.user` is per-machine editor settings; `.DS_Store` is macOS's Finder leaving notes to itself — Windows people never see one, the line costs nothing
- [ ] `git status -u` again — **short now, and readable:** the three files, the `.gitignore` itself, nothing else. *"That file sits at the top, so it covers `week-01`, `week-02`, and the fourteen folders that don't exist yet. Write it before your first commit, and git never starts tracking any of it"*
- [ ] Then the rest, **one line at a time; the `git status` between each is a beat, not filler:**
  ```bash
  git add .
  ```
  ```bash
  git status
  ```
  ```bash
  git commit -m "Week 1: Haldane duty console"
  ```
  ```bash
  git status
  ```
- [ ] 💡 **`git status` after `git add .` is the beat that sells the top:** it lists `week-01/Haldane/...` with the folder in front. *"That's why git is up here. It can see the whole term from this one spot"*
- [ ] ⚠️ **Name the Source Control panel before anybody clicks it** — ten seconds, and it turns a distraction into a plant: *"you've been watching the sidebar icon count along with us. That's VS Code's git panel, and it does all of this with buttons. Leave it alone tonight — you're learning what the commands **do**, and next week we'll use the panel once you know what it's doing for you"* 🔗 **Week 2's §2 collects this**
- [ ] **Commit messages, said once and meant:** *"three commits minimum, and they should tell a story. `week 1 setup`, `station class`, `countdown working`. Not `a`, `b`, `asdf`. I read these and they're worth points"*
- [ ] 🎞️ **GO TO SLIDE 19** — *Your repo for the whole term*
- [ ] **Make the repo now, live on screen → [github.com/new](https://github.com/new).** Name it `dotnet-db-coursework` · **Private** · **don't** tick *Add a README* — you're pushing an existing folder into it. **Leave the page up**; the two lines it prints are the next beat but one
- [ ] ⚠️ **Say the private part twice, with the reason:** *"weeks 1 through 3 are the same exercises for all of you. A public repo is a copy-sharing surface, and I'd rather not have to care"*
- [ ] **Show where the setting lives — Settings → Collaborators → Add people — and stop there.** ⚠️ **You cannot complete this one: you are the person they add, so on your own repo there is nobody to invite.** Leave the page up and say the username: 🎯 *"`jgrissom`. Three points, and it's how I read your work at all — skip it and your homework is indistinguishable from no homework"*
- [ ] 🎯 **Then turn it into a check, because they were told to do it in [`setup-guide.md`](../setup-guide.md) §5 during setup** — hands up for anyone who *hasn't* got `jgrissom` on their collaborator list, and **sort them now rather than at 10pm on Sunday.** *"`Pending Invite` is fine — it just means I haven't clicked accept yet"*
- [ ] **Push — and copy the lines off GitHub's own page rather than typing them**, because that's the habit the room needs: *"it hands you these; you don't invent them."* (Same two lines below, already carrying your username, if the page has scrolled away.)
  ```bash
  git remote add origin https://github.com/jgrissom/dotnet-db-coursework.git
  git push -u origin main
  ```
- [ ] Reload the GitHub page — the files are there. 🔗 *"Week 4 you make a **second** repo, public, with your own project in it. That one has your name on it and you'll want it to look good"*
- [ ] **✓ CHECKPOINT:** ask whether anyone's `push` was rejected or asked for a password — sort those now, not at 10pm on Sunday

## 8 · Hand off to the lab *(slide 20)*

- [ ] 🎞️ **GO TO SLIDE 20** — *Lab: KDXR signs on*. Leave it up for the whole lab; it's the task list and it carries the clock
- [ ] Show **what done looks like** — the answer key **running on your machine**: `week-01/lab/solution`, then `dotnet test Lab.Checks` printing **5 / 5**, and `dotnet run --project Lab` showing the sign-on. ~60 seconds, a target not a walkthrough. *"Nothing in this course gets deployed — no URL to visit, no server to start. Every program you write runs on your own machine"* ⚠️ **stop there; don't add "and always will"** — from week 10 the *data* lives on the school's server
- [ ] ⚠️ **Run it from the pre-positioned terminal window. VS Code stays exactly as it is** — this is not *"no VS Code"*, it is **don't open the *solution folder* in it**. Its Explorer would list `Broadcast.cs`, somebody will ask you to open it, and that file is the answers to what they're about to spend fifty minutes on. **A bare terminal shows the result without showing the work**
- [ ] In that window, both commands, ~60 seconds total — **`Passed! - Failed: 0, Passed: 5`**, then the sign-on. **The `cd` is only needed if you lost the window §0 set up** *(and it assumes `~/Repos`)*:
  ```bash
  cd ~/Repos/dotnet-db-dev-answer-keys/week-01/lab/solution
  dotnet test Lab.Checks
  dotnet run --project Lab
  ```
- [ ] 💡 **Scroll to the summary line instead of reading the build output aloud** — `Passed! - Failed: 0, Passed: 5` is the entire point, and `dotnet test` prints a screen of noise above it. **One number, then move**
- [ ] 🎯 **That `5 / 5` is the answer to §5. Say so, and give it ten seconds of quiet** — ⚠️ **the room has been carrying an unanswered question since the generator break, and this is where it lands. Do not let it play as logistics:** *"an hour ago I divided 4300 by 800, got 5, and the compiler said nothing at all. No error, no warning, no squiggle. It had no opinion about whether my program was right, and it never will. So something else has to. That's this — five of five"*
- [ ] 🎯 **Then the part that is new to every single person in the room, including whoever found tonight easy:** *"you have all written plenty of code. I don't think any of you has ever had a machine tell you that you were finished. That's what you're about to go and do"* ⚠️ **One sentence, then let them start** — overselling is how this beat dies
- [ ] 🎯 **Frame it honestly, because the C# is well within them:** *"the code tonight is not hard for you. What's new is the loop — run the checks, read what they say, fix one thing, run again. That loop is the whole course"*
- [ ] Setup on screen, said once: **drag the one `week-01` folder out of the clone's `starter` into their `dotnet-db-coursework` → `dotnet test week-01/Lab.Checks`** → **1 / 5**. *"Your window is already the right window — the same one from tonight. One folder in, one command, and the week is live"*
- [ ] 🎯 **Tie it back to the shape they watched all night:** *"same window you watched me work in — the top of your repo, the only folder you ever open. The drag puts `week-01` in it, and every command names the week: `dotnet test week-01/Lab.Checks`. Everything the week needs is already beside everything else"*
- [ ] ⚠️ **The one error worth pre-empting:** *"forget the week prefix and you get `MSB1003` — it just means the command couldn't see a project from the top. Week first, then project, and it always works"*
- [ ] ⚠️ **"Copy it OUT of the clone, into your own repo."** Working inside the clone means next week's `git pull` fights their edits — and their lab belongs in their `week-01` with everything else from tonight
- [ ] Say the target and mean it: **all five green tonight.** *"Check 1 is green before you touch anything — that's the station you were handed"*
- [ ] 🎯 **Point them at the failure messages:** *"these are not 'assertion failed'. They tell you what's wrong and what to do about it. Read them — especially check 4's, which is the bug you watched me make forty minutes ago"*
- [ ] 💡 **Finished early?** The *Done early?* list in the lab README is real work. Point at the "break something deliberately" item

## 9 · Wrap-up, after the lab *(slide 21)*

- [ ] 🎞️ **GO TO SLIDE 21** — *Tonight, in one picture*. Three beats: **the compiler checks types, not programs** · **your logic lives where a test can reach it** · **your work is on GitHub**
- [ ] Homework: **their own radio station** — call sign, city, sign-off hour, five methods in a `Station` class, pushed to the private repo they made tonight. *"Same shape as the lab. Different station, and the station is yours"*
- [ ] ⚠️ Repeat the two that cost points silently: **add me as a collaborator**, and **the class goes in its own file, marked `public`**
- [ ] 🔗 **Week 2:** *"those four lines you wrote tonight have been guarding your repo since your first commit. Next week: the one thing they can't do — and the first crash no compiler could have caught"*
