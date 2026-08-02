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
> **Tonight has two deliberate breaks and neither gets announced.** §5 assigns a string to an `int` and the program **refuses to run at all** — that's the week's payoff, and slide 12 comes *after* the terminal shows it, not before. Then §5's second break divides two whole numbers and gets a wrong answer with **no error and no warning at all**, which is the sentence the whole course hangs off: the compiler catches what it can, and it cannot catch everything.

## 0 · Before class

- [ ] **Copy `week-01/demo-starter/Haldane` out of the private repo** somewhere you can look at it — that's the **finished** state. ⚠️ **Do not open it in class.** Tonight's first beat is an empty folder becoming a program, and having it pre-made throws that away
- [ ] Make a scratch folder to build in, and **delete any `Haldane` folder left over from rehearsal**:
  ```bash
  cd ~/scratch && rm -rf Haldane
  ```
- [ ] **Rehearse the whole thing once (≈25 min)** — it also warms the NuGet cache, so the first `dotnet new` in front of the room is instant rather than a thirty-second stare
- [ ] Terminal sized for the back row. **Editor font up too** — tonight is the night people are checking whether they can read the screen at all
- [ ] Teaching profile in VS Code; close every other folder and tab
- [ ] Have the [setup guide](../setup-guide.md) open on the projector-adjacent tab, or printed — §2 is fourteen people at different stages
- [ ] ⚠️ **Check your own `git config --global user.name`** is the teaching identity and not something you'd rather not project
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."*** Tonight especially, because the temptation to follow along is highest when the material is easy

## 1 · Welcome *(slides 2–4)*

### The one idea

- [ ] 🎞️ **GO TO SLIDE 2** — *Sixteen weeks, one idea* · don't rush it. *"Everything in this course is one argument. Data in memory dies when the program stops. Data in a file survives, but asking it questions hurts. A database fixes both — and it's most of the second half"*
- [ ] 🎯 **Make the promise out loud and make it specific:** *"in week 3 you'll type three records into a program, quit it, start it again, and they'll be gone. I want you to be annoyed by that. Being annoyed by it is the point"*

### Tonight

- [ ] 🎞️ **GO TO SLIDE 3** — *Tonight*. Four things, and be honest that the first is the boring one: *"about an hour of installing. It's the least interesting night of the term and the one that makes the other fifteen possible"*

### You already know this

- [ ] 🎞️ **GO TO SLIDE 4** — *You already know how to program* · 🎯 *"I am never going to teach you what a loop is. You know. What you don't know is what C# does differently, and that's the whole course. Every single week I'm going to say 'you know this from Python' and then tell you where that stops being true"*
- [ ] Ask for hands: *"who's written Python in the last six months?"* — sets the room's expectation that the bridge is real and used constantly

## 2 · Setup *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Five installs*. Leave it up; it's the checklist for the whole segment
- [ ] Point people at [`setup-guide.md`](../setup-guide.md) and say the rule: **each install ends with a ✓ that prints something, and you do the ✓ before moving on**
- [ ] ⚠️ **Name the two name-collisions before they cost anyone ten minutes:** VS **Code** is not Visual **Studio**; the **C#** extension is not **C# Dev Kit**
- [ ] Circulate. **Do not demo anything during this segment** — the room is at fourteen different stages and a demo strands whoever is behind
- [ ] 🎯 **The `dotnet --version` fix, said loudly once so you say it once:** *"if the terminal says 'command not found', it was open while you installed. Close it completely and open a new one. That's nine out of ten of them"*
- [ ] Watch for the slow one: the C# extension download on class wifi. Anyone stuck there can still do everything in §3–§6 from the terminal
- [ ] ⚠️ **The last item in §5 of the guide is the one that gets skipped, because it isn't an install and it isn't on the slide — everybody clones the course repo.** Tonight's lab and this week's homework both *begin* by copying something out of it, so a room that skipped it loses ten minutes at 3:00:
  ```bash
  git clone https://github.com/jgrissom/dotnet-db-dev.git
  ```
- [ ] **✓ CHECKPOINT:** every machine prints a `10.` from `dotnet --version` **and** has a `dotnet-db-dev` folder, before the break

## 3 · A folder becomes a program *(slides 6–8)*

### Two commands

- [ ] 🎞️ **GO TO SLIDE 6** — *Two commands* · then swipe away and actually do it, in an **empty folder**, so they watch the folder appear:
  ```bash
  dotnet new console -o Haldane
  cd Haldane
  dotnet run
  ```
- [ ] 🎯 **Let `Hello, World!` land.** *"That's a compiler, a runtime and a project system, and it took four seconds. Nothing you install for the rest of this course is as big as what you just installed"*
- [ ] Name the difference while it's concrete: *"Python runs a file. C# runs a **project** — a folder that knows how to build itself. That's why there's a folder here and not just a .cs"*

### What it made

- [ ] 🎞️ **GO TO SLIDE 7** — *What dotnet new made*. Then open the folder in VS Code and tour it, slowly, because this is the first time most of them have seen it:
- [ ] `Program.cs` — *"one line of actual code"* · `Haldane.csproj` — open it, *"eight lines of XML that say which .NET and which packages. You'll add to this in week 3"*
- [ ] `bin/` and `obj/` — 🎯 *"you didn't write any of this and you never edit it. Remember these two names. Next week they cause the first real mess of the term"* ⚠️ **plant it, don't explain it** — week 2's opening beat is `git status` showing forty files

### Printing

- [ ] 🎞️ **GO TO SLIDE 8** — *Printing*. Then in `Program.cs`, delete the template line and **type** the banner — first instance, so type it, don't paste:
  ```csharp
  Console.WriteLine("========================================");
  Console.WriteLine("  HALDANE STATION - DUTY CONSOLE");
  Console.WriteLine("  nearest neighbour: 512 km");
  Console.WriteLine("========================================");
  Console.WriteLine();
  ```
- [ ] `dotnet run`. **Set the fiction here** — this is the only world-building beat and it takes fifteen seconds: *"Haldane is a research station. Twelve people, five hundred kilometres from anybody, and one console. There is no browser out here. This terminal is the entire interface to the building — and if it's wrong about who's outside, somebody is outside"*
- [ ] 💡 **Deliberately forget one semicolon** while typing, let the squiggle appear, fix it. *"That's the editor being the compiler's early-warning system. We'll meet the compiler properly in about twenty minutes"*

## 4 · The status board *(slides 9–11)*

### Variables have types

- [ ] **Type these four lines** — they're the heart of the night:
  ```csharp
  string stationName = "Haldane";
  int personnelOnStation = 12;
  double temperatureC = -41.5;
  bool blizzardWarning = true;
  ```
- [ ] 🎞️ **GO TO SLIDE 9** — *Variables have types* · 🎯 the sentence that matters: *"in Python a name holds whatever you last put in it. In C# you say what kind of thing it holds, up front, and that is what it holds forever. That word at the front is not decoration — it's a promise you're making to the compiler, and it's going to hold you to it"*

### The four types

- [ ] 🎞️ **GO TO SLIDE 10** — *The four types* · quick tour. ⚠️ **`true` and `false` are lowercase** — Python capitalises them, and everyone gets this wrong exactly once
- [ ] 💡 If anyone asks about `var`: *"it means 'work it out from the value'. It is **not** Python — the variable still has one type forever, you just didn't type it. Week 3, when the type names get long"*

### Putting values into text

- [ ] **Type the status board** — and the `$` is the beat:
  ```csharp
  Console.WriteLine($"Station:     {stationName}");
  Console.WriteLine($"On station:  {personnelOnStation}");
  Console.WriteLine($"Outside:     {temperatureC} C");
  Console.WriteLine($"Blizzard:    {blizzardWarning}");
  ```
- [ ] 🎞️ **GO TO SLIDE 11** — *Putting values into text* · *"Python's f-string. Same idea, the letter moved to a dollar sign. That's the entire difference"*
- [ ] `dotnet run` — the board fills in
- [ ] 💡 **Deliberately drop the `$` on one line first** if the room is quick — they see `{stationName}` print literally and diagnose it themselves in about two seconds. Worth it: it's the most common typo of week 1

## 5 · The compiler refuses *(slides 12–14)*

### The break

- [ ] ⚠️ **Break 1 — do not announce it, and do not go to a slide first.** Change the personnel line so it says what a Python programmer might reasonably type:
  ```csharp
  int personnelOnStation = "twelve";
  ```
- [ ] **Predict first, hands up:** *"in Python this runs fine and I find out later. What does C# do?"* Take answers — most rooms guess "it crashes"
- [ ] `dotnet run`. 🎯 **Sit in the output.** Read it aloud, then the line: *"look at what did **not** happen. It didn't print the banner. It didn't print the station name. Your program **did not run** — not 'ran and then crashed', **didn't run**. Python would have given you four lines of output and then fallen over"*
- [ ] 🎞️ **GO TO SLIDE 12** — *The build failed* · now the slide, after the reveal. *"There is a step between writing it and running it, and it just refused"*

### Reading an error

- [ ] 🎞️ **GO TO SLIDE 13** — *Reading an error*. Back to the terminal and take the message apart on screen: **file · line and character · what's wrong**
- [ ] 🎯 *"`CS0029`. Every C# error has a code, and it's searchable. Paste the code and the message into a search box and you get the actual documentation. That's not a workaround — that's how this language is documented"*
- [ ] Fix it back to `12`, `dotnet run`, banner returns. *"The compiler is the first person to read your code, and it reads it very carefully"*

### What it cannot catch

- [ ] **Type the generator block** — and type `int` on the second line, on purpose:
  ```csharp
  int fuelLitres = 4300;
  int burnPerHour = 800;

  double hoursOfFuel = fuelLitres / burnPerHour;
  Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
  ```
- [ ] **Predict:** *"4300 litres, 800 an hour. What prints?"* — the room will say five point something
- [ ] ⚠️ **Break 2.** `dotnet run` → **`5 hours remaining`**. 🎯 Let it sit. *"Five. The real answer is 5.375 — that's twenty-two minutes of heat, at forty below. And look at the terminal: no error. No warning. **Nothing.** The compiler had no opinion about this at all"*
- [ ] **Ask before explaining:** *"why?"* — someone usually gets there. Then: *"both sides are whole numbers, so C# did whole-number division and threw the remainder away. Then it stored `5` in a double, as 5.0. **The decimal point was gone before `double` ever got involved**"*
- [ ] 🎞️ **GO TO SLIDE 14** — *What the compiler cannot catch* · **fix it live, and it's one word** — `int` becomes `double` on the `burnPerHour` line:
  ```csharp
  double burnPerHour = 800;
  ```
- [ ] `dotnet run` → **5.375**. 🎯 **The sentence the course hangs off:** *"the compiler catches what it can, and it cannot catch everything. That gap right there is why week 7 exists, and why every lab you do has a file full of checks in it"*
- [ ] 🔗 *"You will meet this exact bug in the lab tonight, in check 4. Now you know what it looks like"*
- [ ] **✓ CHECKPOINT:** somebody can say why `4300 / 800` gave 5

## 6 · The part that has to be right *(slides 15–17)*

### A method

- [ ] 🎞️ **GO TO SLIDE 15** — *A method is a def with types* · read the Python and the C# side by side off the slide
- [ ] Make a **new file**, `Conditions.cs`, and type it — narrating the four words in order (`public`, `static`, return type, name):
  ```csharp
  public static class Conditions
  {
      public static double Fahrenheit(double celsius)
      {
          return celsius * 9 / 5 + 32;
      }
  }
  ```
- [ ] 🎯 **Point at the return type:** *"the word in front of the name is what comes **out**. The words in the brackets are what goes **in**. A def, with the types written down"*
- [ ] 💡 Someone may ask why `* 9 / 5` doesn't lose its remainder like the fuel did — good question, answer it: *"because `celsius` is already a double, so the whole line is double arithmetic. The trap needs **both** sides to be whole numbers"*

### The class

- [ ] 🎞️ **GO TO SLIDE 16** — *The class is a box to put methods in* · ⚠️ **bound the magic explicitly, don't hand-wave it:** *"`class` is week 4. `static` is week 5. Both get taught properly — I'm not going to pretend I explained them tonight. What you need this week is that C# has nowhere to put a method except inside one of these, so this is the shape you type"*
- [ ] Add the second method, and let them see one method call another:
  ```csharp
      public static bool IsSafeToGoOut(double celsius, bool blizzard)
      {
          return celsius > -50 && !blizzard;
      }
  ```
- [ ] In `Program.cs`, call them — **the class name, a dot, the method**:
  ```csharp
  Console.WriteLine($"That's {Conditions.Fahrenheit(temperatureC)} F.");
  Console.WriteLine($"Safe to go out: {Conditions.IsSafeToGoOut(temperatureC, blizzardWarning)}");
  ```
- [ ] `dotnet run` → `-42.7 F` and `Safe to go out: False`. 🎯 *"and there's a `bool` coming back out of a method. The answer to a yes-or-no question has a type too"*

### Two files, two jobs

- [ ] 🎞️ **GO TO SLIDE 17** — *Two files, two jobs* · 🎯 **this is the beat that makes the rest of the course possible, so give it its thirty seconds:** *"`Program.cs` is what a human sees. `Conditions.cs` is what has to be **right**. That split is not tidiness — the checks in your lab tonight can call `Conditions.Fahrenheit` directly and ask what came back. They cannot call anything buried in `Program.cs`. Nothing can"*
- [ ] 🔗 **Plant week 7 without spending it:** *"there's a file in tonight's lab that grades you. In week 7 you find out it isn't magic, and you write one"*
- [ ] **✓ CHECKPOINT:** the room can say which file the checks can see

## 7 · Onto GitHub *(slides 18–19)*

- [ ] 🎞️ **GO TO SLIDE 18** — *Four commands*. Then run the first three on Haldane, reading each one as you go:
  ```bash
  git init
  git add .
  git commit -m "Week 1: Haldane duty console"
  ```
- [ ] ⚠️ **Do not fix what `git add .` just swept up.** `bin/` and `obj/` are now staged and that is *correct for tonight*. If someone spots it and objects, give them the credit and hold the line: *"good eye. That's next week's first ten minutes, and it's better as a mess you made than a rule I gave you"*
- [ ] 🎞️ **GO TO SLIDE 19** — *Your repo for the whole term* · make the repo on GitHub **live, on screen**: private, no README, name it `dotnet-db-coursework`
- [ ] ⚠️ **Say the private part twice, with the reason:** *"weeks 1 through 3 are the same exercises for all of you. A public repo is a copy-sharing surface, and I'd rather not have to care"*
- [ ] **Add a collaborator on screen** — Settings → Collaborators → Add people. 🎯 *"this is worth three points and it's how I read your work. Skip it and your homework is indistinguishable from no homework"*
- [ ] Push, using the lines GitHub itself prints:
  ```bash
  git remote add origin https://github.com/YOUR-USERNAME/dotnet-db-coursework.git
  git push -u origin main
  ```
- [ ] Reload the GitHub page — the files are there. 🔗 *"Week 4 you make a **second** repo, public, with your own project in it. That one has your name on it and you'll want it to look good"*

## 8 · Hand off to the lab *(slide 20)*

- [ ] 🎞️ **GO TO SLIDE 20** — *Lab: KDXR signs on*. Leave it up for the whole lab; it's the task list and it carries the clock
- [ ] Show **what done looks like** — the answer key **running on your machine**: `week-01/lab/solution`, then `dotnet test KDXR.Checks` printing **5 / 5**, and `dotnet run --project KDXR` showing the sign-on. ~60 seconds, a target not a walkthrough. **Nothing is deployed in this course — this is just localhost, and it always will be**
- [ ] Setup on screen, said once: **`git pull` → copy `week-01/lab/starter` out of the clone and rename it → open the folder holding *both* project folders → `dotnet test KDXR.Checks`** → **1 / 5**
- [ ] ⚠️ **The folder split, because it trips everybody all term:** `dotnet test KDXR.Checks` runs from the folder holding **both** projects; `dotnet run --project KDXR` from the same place. Never from inside `KDXR.Checks`
- [ ] ⚠️ **"Copy it OUT of the clone."** Working inside the clone means next week's `git pull` fights their edits
- [ ] Say the target and mean it: **checks 1–4 in class; check 5 is fine as homework.** *"Check 1 is green before you touch anything — that's the station you were handed"*
- [ ] 🎯 **Point them at the failure messages:** *"these are not 'assertion failed'. They tell you what's wrong and what to do about it. Read them — especially check 4's, which is the bug you watched me make twenty minutes ago"*

## 9 · Wrap-up, after the lab *(slide 21)*

- [ ] 🎞️ **GO TO SLIDE 21** — *Tonight, in one picture*. Three beats: **types** · **a compiler that reads it all first** · **and it still can't catch everything**
- [ ] Homework: **their own radio station** — call sign, city, sign-off hour, four methods in a `Station` class, pushed to the private repo they made tonight. *"Same shape as the lab. Different station, and the station is yours"*
- [ ] ⚠️ Repeat the two that cost points silently: **add me as a collaborator**, and **the class goes in its own file, marked `public`**
- [ ] 🔗 **Week 2:** *"we start by looking at what `git add .` swept up tonight, and it's about forty files none of you wrote"*
