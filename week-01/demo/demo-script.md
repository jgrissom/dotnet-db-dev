# Week 1 Demo Script — Haldane Station Boots Up 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. Type the *first* instance of every pattern; paste the rest from here.

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
> **Two beats carry the evening, and both are new to them.** §5's *second* break divides two whole numbers, gets a wrong answer, and shows **no error and no warning at all** — that's the payoff and it gets twenty minutes. Then §6's split: **logic inside `Program.cs` cannot be called, tested or graded by anyone.** Most of the room has spent a semester putting everything in `Main`.
>
> ⚠️ **§5's first break is a warm-up, not a reveal.** They have seen a build fail. Play it as "now read it properly", inside four minutes, and move on.

## 0 · Before class

- [ ] **Copy `week-01/demo-starter/Haldane` out of the private repo** somewhere you can look at it — that's the **finished** state. ⚠️ **Do not open it in class.** Tonight's first beat is an empty folder becoming a program, and having it pre-made throws that away
- [ ] ⚠️ **Reset to exactly what the room will have after §2** — an empty `dotnet-db-coursework` and nothing else. §3 *creates* `week-01` inside it on screen, and a leftover folder kills that beat:
  ```bash
  rm -rf ~/scratch/dotnet-db-coursework && mkdir -p ~/scratch/dotnet-db-coursework
  ```
- [ ] 🎯 **This is deliberate: your folders match theirs exactly, all night.** They make `dotnet-db-coursework` in §2, you already have it; §3 puts `week-01` inside it; §7 does `git init` at the top. **Nothing you do on screen is a "demo shortcut" they have to mentally translate**
- [ ] **Have VS Code's Open Folder dialog land somewhere sane** — open `~/scratch/dotnet-db-coursework` once beforehand so the picker starts there and you aren't navigating your home directory on the projector
- [ ] **Rehearse the whole thing once (≈20 min)** — it also warms the NuGet cache, so the first `dotnet new` in front of the room is instant rather than a thirty-second stare
- [ ] Terminal sized for the back row. **Editor font up too** — tonight is the night people are checking whether they can read the screen at all
- [ ] Teaching profile in VS Code; close every other folder and tab
- [ ] Have the [setup guide](../setup-guide.md) open on a projector-adjacent tab, or printed. **It is self-serve by design** — your job in §2 is to circulate, not to present
- [ ] ⚠️ **Check your own `git config --global user.name`** is the teaching identity and not something you'd rather not project
- [ ] **Put [`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive**, and leave it there while the room settles. **Costs no class time** — it is read by whoever is early, and it makes the banner you type in §3 land as *"that thing that was on screen when I walked in."* ⚠️ **Close it before slide 1**, and don't introduce it, explain it or refer to it. It is the station's own board; it explains itself or it isn't working
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."*** Tonight especially, because the temptation to follow along is highest when the material is familiar

## 1 · Welcome *(slides 2–4)*

### The one idea

- [ ] 🎞️ **GO TO SLIDE 2** — *Sixteen weeks, one idea* · don't rush it. *"Everything in this course is one argument. Data in memory dies when the program stops. Data in a file survives, but asking it questions hurts. A database fixes both — and it's most of the second half"*
- [ ] 🎯 **Make the promise out loud and make it specific:** *"in week 3 you'll type three records into a program, quit it, start it again, and they'll be gone. I want you to be annoyed by that. Being annoyed by it is the point"*

### Tonight

- [ ] 🎞️ **GO TO SLIDE 3** — *Tonight*. Four things, and be honest about the shape: *"the first twenty minutes are a toolchain check, most of you will pass it in five, and then we get to the part that's actually new"*

### You already write C#

- [ ] 🎞️ **GO TO SLIDE 4** — *You already write C#* · 🎯 **the frame for the whole term, and it buys you permission to move fast:** *"you have all written C#. I am not going to teach you what a loop is, or a method, or a class. This course is the part your last one didn't have room for — code that a machine can test, git, collections, and a real database underneath it"*
- [ ] Ask for hands: *"who put every single method inside `Main` last semester?"* — expect most of the room, and expect laughter. 🔗 **That's §6, and naming it now makes the later beat land**
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
- [ ] 🎯 **The two failures worth calling out once, loudly:** *"if the terminal says 'command not found', it was open while you installed — close it completely and open a new one. And if `dotnet --version` says 8 or 9, that's last term's SDK. Install 10 anyway; they live side by side"*
- [ ] ⚠️ **`git config --global user.name` is the check most of them fail**, because an intro course rarely sets it up. That's expected and it's not a problem — it's two commands
- [ ] ⚠️ **§5 of the guide is the part that gets skipped, because it isn't an install and the fast finishers stop reading.** It has **two** endings and the lab needs both — **a `dotnet-db-coursework` folder of their own** (empty, made with Open Folder → New Folder) **and** a clone of the course repo:
  ```bash
  git clone https://github.com/jgrissom/dotnet-db-dev.git
  ```
- [ ] 🎯 **Say why there are two folders, once, clearly** — it prevents the commonest confusion of the night: *"`dotnet-db-coursework` is yours and starts empty. `dotnet-db-dev` is mine and you only ever copy things **out** of it. Never work inside mine"*
- [ ] **✓ CHECKPOINT:** every machine prints a `10.` from `dotnet --version`, prints a name from `git config`, **and has both folders** — `dotnet-db-coursework` (theirs, empty) beside `dotnet-db-dev` (the clone) — before the break. ⚠️ **A missing coursework folder does not hurt until 2:50 and then costs ten minutes**
- [ ] 💡 **Verified and idle by 0:25?** Take the break early and give the minutes to §7. **Do not pad the recap segments** — that's the one way to lose this room

## 3 · What the project actually is *(slides 6–8)*

### Two commands

- [ ] 🎞️ **GO TO SLIDE 6** — *Two commands* · then swipe away and actually do it, **on screen, in this order**:
- [ ] **VS Code → File → Open Folder → `dotnet-db-coursework`** *(the empty folder they made in §2)* **→ *New Folder* → name it `week-01` → Open.** An empty explorer pane, and say so: *"nothing. That's the starting point"*
- [ ] 🎯 **Say what you just did, because it is exactly their lab setup in an hour:** *"one folder per week, inside the one repo folder that holds your whole semester. Next week there's a `week-02` next to it"*
- [ ] Then the **VS Code integrated terminal** (`` Ctrl+` ``), which is already standing in `week-01` — **no `cd` for anything `dotnet`**, and point that out:
  ```bash
  dotnet new console -o Haldane
  dotnet run --project Haldane
  ```
- [ ] 🎯 **This is the beat that pays off all term, so say it deliberately:** *"look at where I'm standing. I opened `week-01` and I never left it. `-o` made the project folder, and I name the project when I run it. **The folder you open holds projects — it isn't one.** That exact shape is your lab in an hour and your homework tonight"*
- [ ] Name the difference while it's concrete — **this is the new part of the beat, not `Hello, World!`**: *"Python runs a file. C# runs a **project** — a folder that knows how to build itself. If your last course was full Visual Studio, this is File → New Project with the wizard taken away"*
- [ ] 💡 **If someone asks why not just `cd` in:** *"because in an hour your checks project sits next to your code, and `dotnet test` has to run from the folder holding both. Learn the habit now while there's only one project in here"* 🔗 **it is the error they will hit in the lab**

### What it made

- [ ] 🎞️ **GO TO SLIDE 7** — *What dotnet new made*. Then open the folder in VS Code and tour it — briskly:
- [ ] `Haldane.csproj` — **open it**, because most of them have never looked inside one: *"eight lines of XML that say which .NET and which packages. You'll add a line to this in week 3, and it's the whole reason there's no `.sln` in this course"*
- [ ] `bin/` and `obj/` — 🎯 *"you didn't write any of this and you never edit it. Remember these two names. Next week they cause the first real mess of the term"* ⚠️ **plant it, don't explain it** — week 2's opening beat is `git status` showing forty files

### Where Main went

- [ ] 🎞️ **GO TO SLIDE 8** — *Where did Main go?* · worth a real thirty seconds if their course used `static void Main`: *"a file called `Program.cs` can just have statements in it. Both spellings still work — this one is shorter and it's what the starters use"*
- [ ] Then in `Program.cs`, delete the template line and **type** the banner — first instance, so type it, don't paste:
  ```csharp
  Console.WriteLine("========================================");
  Console.WriteLine("  HALDANE STATION - DUTY CONSOLE");
  Console.WriteLine("  nearest neighbour: 512 km");
  Console.WriteLine("========================================");
  Console.WriteLine();
  ```
- [ ] `dotnet run --project Haldane`. **Set the fiction here** — this is the only world-building beat and it takes fifteen seconds: *"Haldane is a research station in Antarctica. Twelve people, five hundred kilometres from anybody, and one console — no browser, no phone, no app. This terminal is how you find out whether the generator lasts the night and whether it's safe to go outside. Get that wrong and somebody's out there in a blizzard"*
- [ ] ⚠️ **Say "Antarctica" out loud — it is the only place all night the room is told where they are.** Everything else is inference from `-41.5`, `Blizzard: True` and `512 km`, and most of them will get there, but one word is cheaper than an evening of mild uncertainty. ⚠️ **And every claim in that sentence is something they watch you type in the next hour** — the generator countdown is §5, `Safe to go out` is §6. **Don't promise a roster of who's out on the ice; nothing tonight builds one.** That idea is week 3's, where a `List<T>` makes it real and *"restart and it's gone"* means losing track of a person

## 4 · The status board *(slides 9–11)*

> **This whole section is recap and it has fifteen minutes. Type, run, land one sentence per slide, move.**

### A declared type

- [ ] **Type these four lines** — fast, no commentary while typing:
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

- [ ] **Type the status board:**
  ```csharp
  Console.WriteLine($"Station:     {stationName}");
  Console.WriteLine($"On station:  {personnelOnStation}");
  Console.WriteLine($"Outside:     {temperatureC} C");
  Console.WriteLine($"Blizzard:    {blizzardWarning}");
  ```
- [ ] 🎞️ **GO TO SLIDE 11** — *Putting values into text* · one useful line beyond the recap: *"anything in the braces gets **evaluated** — that can be a whole expression, including a method call. You'll want that in about ten minutes"*
- [ ] Run it and the board fills in:
  ```bash
  dotnet run --project Haldane
  ```

## 5 · What the compiler cannot catch *(slides 12–14)*

### The warm-up

> ⚠️ **Four minutes, and do not oversell it.** They have all seen a build fail. The job here is to make them *read* the message, and to set up the contrast with what follows.

- [ ] Change the personnel line, without ceremony:
  ```csharp
  int personnelOnStation = "twelve";
  ```
- [ ] `dotnet run --project Haldane`. 🎞️ **GO TO SLIDE 12** — *The build failed* · *"nobody is surprised. Fine. But be precise about what just happened: it didn't print the banner, it didn't print the station name — the program **did not run**. Not 'ran and crashed'"*

### Reading an error

- [ ] 🎞️ **GO TO SLIDE 13** — *Reading an error*. Back to the terminal and take the message apart on screen: **file · line and character · what's wrong**
- [ ] 🎯 *"`CS0029`. Every C# error has a code and it's searchable. Paste the code and the message into a search box and you get the actual documentation. Most of you have been reading the squiggle and guessing. Read the code instead"*
- [ ] Fix it back to `12`, `dotnet run --project Haldane`, banner returns

### The limit

- [ ] **Type the generator block** — and type `int` on the second line, on purpose:
  ```csharp
  int fuelLitres = 4300;
  int burnPerHour = 800;

  double hoursOfFuel = fuelLitres / burnPerHour;
  Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
  ```
- [ ] **Predict, hands up:** *"4300 litres, 800 an hour. What prints?"* — the room will say five point something
- [ ] ⚠️ **Break 2 — the payoff. Do not announce it.** `dotnet run --project Haldane` → **`5 hours remaining`**. 🎯 Let it sit. *"Five. The real answer is 5.375 — that's twenty-two minutes of heat, at forty below. And look at the terminal: no error. No warning. **Nothing.** Look at the editor: no squiggle. The compiler had no opinion about this at all"*
- [ ] ⚠️ **Don't rescue it too fast.** If nobody speaks within twenty seconds, ask *"is that right?"* — never *"that's wrong"*
- [ ] **Ask before explaining:** *"why?"* — someone usually gets there, and a few will have been bitten by it before. **Let that person say it.** Then: *"both sides are whole numbers, so C# did whole-number division and threw the remainder away. Then it stored `5` in a double, as 5.0. **The decimal point was gone before `double` ever got involved**"*
- [ ] 💡 **The follow-up that separates knowing-the-fix from understanding it:** *"so would casting the answer to double save you?"* — no. `(double)(4300 / 800)` is 5.0. **The fix has to happen before the division, not after**
- [ ] 🎞️ **GO TO SLIDE 14** — *What the compiler cannot catch* · **fix it live, and it's one word** — `int` becomes `double` on the `burnPerHour` line:
  ```csharp
  double burnPerHour = 800;
  ```
- [ ] `dotnet run --project Haldane` → **5.375**. 🎯 **The sentence the course hangs off:** *"here is the promise that word at the front actually makes. **The compiler checks that your types line up. It does not check that your program is right.** Those are wildly different promises, and everything that lives in the gap is yours to catch. That gap is why week 7 exists, and why every lab you do has a file full of checks in it"*
- [ ] 🔗 *"You will meet this exact bug in the lab tonight, in check 4. Now you know what it looks like"*
- [ ] **✓ CHECKPOINT:** somebody can say why `4300 / 800` gave 5, **and** why casting the result doesn't fix it

## 6 · The part that has to be right *(slides 15–17)*

### A method

- [ ] 🎞️ **GO TO SLIDE 15** — *The words in front of a method* · read it off the slide. **Recap — sixty seconds**
- [ ] Make a **new file — `Haldane/Conditions.cs`**, beside `Program.cs` *(right-click the `Haldane` folder, not the toolbar button — that one lands in `week-01`)*, and type it:
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
- [ ] `dotnet run --project Haldane` → `-42.7 F` and `Safe to go out: False`

### Two files, two jobs

- [ ] 🎞️ **GO TO SLIDE 17** — *Two files, two jobs* · 🎯 **this is the second of tonight's two real beats. Give it its full three minutes and do not let it sound like tidiness:** *"`Program.cs` is what a human sees. `Conditions.cs` is what has to be **right**. In an hour you'll open a lab with a `Broadcast.cs` in it, and its checks call `Broadcast.SignOn` directly and ask what came back — same shape, different station. They cannot call anything inside `Program.cs`. **Nothing can.** Not the checks, not me, not you"*
- [ ] 🎯 **Collect the show of hands from §1 and make it the lesson:** *"most of you put everything in `Main` last semester. That worked, and it will never work again — not because I say so, but because a thing nobody can call is a thing nobody can test and nobody can grade"*
- [ ] 💡 **Prove it rather than asserting it, if the clock allows (30 seconds):** move `Fahrenheit` to the bottom of `Program.cs`, mark it `public`, and show the call failing to resolve. *"Public doesn't help. It has to be in a class, in its own file"*
- [ ] 🔗 **Plant week 7 without spending it:** *"there's a file in tonight's lab that grades you. In week 7 you find out it isn't magic, and you write one"*
- [ ] **✓ CHECKPOINT:** the room can say which file the checks can see, and why

## 7 · Onto GitHub *(slides 18–19)*

> **Twenty-five minutes, and it needs them. Assume nobody has used git.** It's graded every week from here.

- [ ] 🎞️ **GO TO SLIDE 18** — *Four commands*. ⚠️ **First, `cd ..` — out loud and on screen.** You are standing in **`week-01`**, where every `dotnet` command tonight ran; this moves you up to **`dotnet-db-coursework`**, the folder you made in §2. It is the one place tonight the folder changes and it is worth ten deliberate seconds:
  ```bash
  cd ..
  ```
- [ ] ⚠️ **Check the prompt reads `dotnet-db-coursework` before you type `git init`** — `pwd` if it isn't obvious. A `git init` run one folder low makes the repo inside `week-01`, and then `week-02` next week is outside it. **If it happens, delete the `.git` folder it just made, `cd ..`, and start this beat again**
- [ ] 🎯 **Say why, because it is the rule they will get wrong:** *"every `dotnet` command tonight ran from `week-01`. **Every `git` command runs from the folder above it.** One repo holds your whole semester — `week-01`, then `week-02`, then fourteen more — so git goes at the top, once, and never again"*
- [ ] Then the first three, **reading each one aloud as you go** — what it does rather than what it is. ⚠️ **One line at a time; the `git status` between each is a beat, not filler:**
  ```bash
  git init
  git status
  git add .
  git status
  git commit -m "Week 1: Haldane duty console"
  git status
  ```
- [ ] 🎯 **Actually look at each `git status`, out loud:** *"this is the command you'll run more than any other, and it always tells you what git thinks is going on"*
- [ ] 💡 **`git status` after `git add .` is the beat that sells it** — it lists `week-01/Haldane/...` with the folder in front. *"That's why git is up here. It can see the whole term from this one spot"*
- [ ] ⚠️ **Do not fix what `git add .` just swept up.** `bin/` and `obj/` are now staged and that is *correct for tonight*. If someone spots it — and in this room someone might, having heard of `.gitignore` — give them the credit and hold the line: *"good eye. That's next week's first ten minutes, and it's better as a mess you made than a rule I gave you"*
- [ ] ⚠️ **Glance at the Source Control icon before you say anything about it — the badge is not guaranteed to be there.** The repo is at `dotnet-db-coursework` while VS Code has `week-01` open, so it sits *above* the workspace, and VS Code does not adopt a parent repo silently. **Two things can happen and you want either one handled in five seconds:**
  - **A notification appears** — *"A git repository was found in the parent folders of the workspace… Would you like to open the repository?"* → **click `Always`**, and tell the room to. ⚠️ **`Never` is sticky and it is the wrong button** — it leaves them with a dead Source Control panel in week 2, which is the week that teaches it
  - **Nothing appears and no badge shows** — VS Code scans for repositories when a folder or an editor opens, **not** when a `.git` shows up above the workspace, so a `git init` typed in the terminal can go unnoticed. **`Cmd/Ctrl+Shift+P` → *Developer: Reload Window*** re-runs the scan; the notification or the badge arrives then
- [ ] ⚠️ **Name the Source Control panel before anybody clicks it** — once the badge is showing, that number is enormous, because there's no `.gitignore` tonight. **Ten seconds, and it turns a distraction into a plant:** *"you'll have noticed the sidebar icon with a number on it. That's VS Code's git panel and it does all of this with buttons. Leave it alone tonight — you're learning what the commands **do**, and next week we'll use the panel once you know what it's doing for you. That number, by the way, is next week's first ten minutes"* 🔗 **The badge sits there showing week 2's punchline for the rest of the evening**
- [ ] **Commit messages, said once and meant:** *"three commits minimum, and they should tell a story. `week 1 setup`, `station class`, `countdown working`. Not `a`, `b`, `asdf`. I read these and they're worth points"*
- [ ] 🎞️ **GO TO SLIDE 19** — *Your repo for the whole term* · make the repo on GitHub **live, on screen**: private, no README, name it `dotnet-db-coursework`
- [ ] ⚠️ **Say the private part twice, with the reason:** *"weeks 1 through 3 are the same exercises for all of you. A public repo is a copy-sharing surface, and I'd rather not have to care"*
- [ ] **Add a collaborator on screen** — Settings → Collaborators → Add people. 🎯 *"this is worth three points and it's how I read your work. Skip it and your homework is indistinguishable from no homework"*
- [ ] Push, using the lines GitHub itself prints:
  ```bash
  git remote add origin https://github.com/YOUR-USERNAME/dotnet-db-coursework.git
  git push -u origin main
  ```
- [ ] Reload the GitHub page — the files are there. 🔗 *"Week 4 you make a **second** repo, public, with your own project in it. That one has your name on it and you'll want it to look good"*
- [ ] **✓ CHECKPOINT:** ask whether anyone's `push` was rejected or asked for a password — sort those now, not at 10pm on Sunday

## 8 · Hand off to the lab *(slide 20)*

- [ ] 🎞️ **GO TO SLIDE 20** — *Lab: KDXR signs on*. Leave it up for the whole lab; it's the task list and it carries the clock
- [ ] Show **what done looks like** — the answer key **running on your machine**: `week-01/lab/solution`, then `dotnet test Lab.Checks` printing **5 / 5**, and `dotnet run --project Lab` showing the sign-on. ~60 seconds, a target not a walkthrough. **Nothing is deployed in this course — this is just localhost, and it always will be**
- [ ] 🎯 **That `5 / 5` is the answer to §5. Say so, and give it ten seconds of quiet** — ⚠️ **the room has been carrying an unanswered question since the generator break, and this is where it lands. Do not let it play as logistics:** *"an hour ago I divided 4300 by 800, got 5, and the compiler said nothing at all. No error, no warning, no squiggle. It had no opinion about whether my program was right, and it never will. So something else has to. That's this — five of five"*
- [ ] 🎯 **Then the part that is new to every single person in the room, including whoever found tonight easy:** *"you have all written plenty of code. I don't think any of you has ever had a machine tell you that you were finished. That's what you're about to go and do"* ⚠️ **One sentence, then let them start.** Overselling it is how the debugger got oversold in the web course 🧾
- [ ] 🎯 **Frame it honestly, because the C# is well within them:** *"the code tonight is not hard for you. What's new is the loop — run the checks, read what they say, fix one thing, run again. That loop is the whole course"*
- [ ] Setup on screen, said once: **`git pull` → copy the two folders in `week-01/lab/starter` into their own `week-01` → open `week-01` in VS Code → `dotnet test Lab.Checks`** → **1 / 5**
- [ ] 🎯 **Tie it back to the shape they watched an hour ago:** *"same folder you just saw me build Haldane in. You open `week-01`, you stay there, and you name the project. `Lab` and `Lab.Checks` go in beside each other — and tonight's homework adds `Homework` and `Homework.Checks` to the same folder"*
- [ ] ⚠️ **The folder split, because it trips everybody all term:** `dotnet test Lab.Checks` and `dotnet run --project Lab` both run from **`week-01`**. Never from inside `Lab` or `Lab.Checks`, and **never `cd`**
- [ ] ⚠️ **"Copy it OUT of the clone, into your own repo."** Working inside the clone means next week's `git pull` fights their edits — and their lab belongs in their `week-01` with everything else from tonight
- [ ] Say the target and mean it: **all five green tonight.** *"Check 1 is green before you touch anything — that's the station you were handed"*
- [ ] 🎯 **Point them at the failure messages:** *"these are not 'assertion failed'. They tell you what's wrong and what to do about it. Read them — especially check 4's, which is the bug you watched me make forty minutes ago"*
- [ ] 💡 **Finished early?** The *Done early?* list in the lab README is real work. Point at the "break something deliberately" item

## 9 · Wrap-up, after the lab *(slide 21)*

- [ ] 🎞️ **GO TO SLIDE 21** — *Tonight, in one picture*. Three beats: **the compiler checks types, not programs** · **your logic lives where a test can reach it** · **your work is on GitHub**
- [ ] Homework: **their own radio station** — call sign, city, sign-off hour, five methods in a `Station` class, pushed to the private repo they made tonight. *"Same shape as the lab. Different station, and the station is yours"*
- [ ] ⚠️ Repeat the two that cost points silently: **add me as a collaborator**, and **the class goes in its own file, marked `public`**
- [ ] 🔗 **Week 2:** *"we start by looking at what `git add .` swept up tonight, and it's about forty files none of you wrote"*
