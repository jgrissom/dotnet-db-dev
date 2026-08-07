# Week 3 Demo Script — The Station Gets a Memory 🧊

Terminal + VS Code cue sheet, in lecture order, keyed to the slides. **Paste the code from here** — every block has a Copy button, and the room can't read code that appears character by character anyway. **Talk each block through once it's on screen** — that's the beat the typing used to provide. ⚠️ **Say what it *does*, never what it says:** `outside.Add(new SignOut(...))` is *put one more person on the end of the board* — not *dot Add, open bracket, new.* **Name syntax only when the syntax is the lesson** (the `<T>` in the brackets, the `out`, the `,-12`).

**Type whatever you feel like typing** — this is a default, not a rule. **The two that would cost you if you didn't:** `names[3] = "Bhatt";` in §2, because the room has to watch a fourth thing be added to a space for three — and **the answers you give the running program** in §3 and §6, especially `DIG OUT VENT 3`. That isn't code; it's a human typing something slightly too long, which is the entire argument for the library.

> [!TIP]
> **Clickable version:** [the hosted script](https://jgrissom.github.io/dotnet-db-dev/week-03/demo/script.html) — checkboxes survive refreshes; Reset button for next run.

> [!TIP]
> **This sheet is the running order. The deck is a prop it tells you to pick up.**
>
> **🎞️ means swipe to the slides.** Every 🎞️ line says the same thing: *put that slide up, talk to it.* There are no exceptions and no cue that means "not yet" — if a slide would give away a punchline, its cue is further down, at the moment it's due. Everything that isn't a 🎞️ line happens in VS Code or the terminal, so **you don't need a cue to come back**.
>
> Lost your place? **The nearest 🎞️ above you is the slide that should be showing.**

> [!IMPORTANT]
> **Tonight is one arc with three breaks in it, and they are not equals.**
>
> **Break 1 (§2, the array)** is thirty seconds and cheap — it earns `List<T>` and gets out. **Break 2 (§3, the shear)** is the one that earns the library, and it needs its pause: the hand-aligned board looks *perfectly tidy* until somebody types a longer reason. **Break 3 (§5, the missing key)** is the one that happens to them in the lab within the hour.
>
> ⚠️ **If the night runs long, cut break 1** — slide 4 carries it on its own. Never cut §6.
>
> **§6 is not a break at all.** It's a promise being collected — made out loud in week 1 and again at week 2's wrap. The room already knows it's coming, and that is fine: the beat is watching it happen to a board they watched get built forty minutes ago.

## 0 · Before class

**The set, at curtain:**

```
instructor/
└─ dotnet-db-coursework/       ← OPEN IN VS CODE — where week 2 left it
   ├─ .gitignore               ←   the four lines, still four lines
   ├─ week-01/
   └─ week-02/                 ←   last week's Haldane
```

Tonight adds `week-03/Haldane` beside them — by command, nothing reopened.

- [ ] ⚠️ **Warm the NuGet cache, or §3 has a silent thirty seconds in it.** Any project that already references Spectre will do; this is the fastest:
  ```bash
  cd ~/Repos/dotnet-db-dev-answer-keys/week-03/demo-starter && dotnet build Haldane
  ```
  💡 **Check it took:** run it a second time and it finishes in about a second, with no `Restored` line about Spectre.
- [ ] ⚠️ **Rehearsed already? Delete the week-03 folder**, or §2 starts with a project that already exists and `dotnet new` refuses:
  ```bash
  rm -rf ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework/week-03
  ```
- [ ] ⚠️ **Check week 2's Haldane is actually there — §2 copies a file out of it.** This should print `Conditions.cs`:
  ```bash
  ls ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework/week-02/Haldane/Conditions.cs
  ```
  **Missing?** Rebuild just enough for tonight's `cp` to work (~30 seconds) — the demo never looks inside week-02 again:
  ```bash
  cd ~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework && dotnet new console -o week-02/Haldane && cp ~/Repos/dotnet-db-dev-answer-keys/week-02/demo-starter/Haldane/Conditions.cs week-02/Haldane/
  ```
- [ ] **Open the hosted cue sheet and check it matches the markdown.** The published page is a *build* — it lags a push by a couple of minutes and can fail outright, leaving the previous version up with no warning at all. **Stale or won't load? Read `demo-script.md` from the clone instead** — the markdown is always right, and all you lose is the checkboxes and the Copy buttons
- [ ] **Rehearse the whole thing once (≈25 min).** §3's shear and §6's re-run are the two beats you want in your hands rather than your head
- [ ] **Teaching profile in VS Code; close every other folder and tab.** VS Code open on **`~/Repos/dotnet-db-dev-course-trial/instructor/dotnet-db-coursework`** — the top, exactly where week 2's class left it
- [ ] **Put [`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** ⚠️ **This week it matters more than usual and you still say nothing about it.** The board gained a sign-out panel, a log and the winter crew — and in §4 the program is going to start looking exactly like it. **Leave it up long enough to be looked at**, then close it before slide 1
  - ⚠️ **Wrong week showing?** The bare URL routes by date, so on class night it lands on week 3 by itself — but **when rehearsing ahead of the calendar it will show an earlier board, correctly.** Force it: **[`dutyconsole.com/?week=3`](https://dutyconsole.com/?week=3)** (works on any date). The `?week=` override is the supported way to look ahead — never edit `index.html`'s anchor to preview
- [ ] **Say it before you start: *"lids down for the demo — you'll type all of this yourself in the lab."***

## 1 · The three calls that never met *(slides 2–3)*

### The question

- [ ] 🎞️ **GO TO SLIDE 2** — *Three calls, three runs* · *"last week's reading asked you to do something slightly odd: run your program three times and take three calls. And then answer a question about it"*
- [ ] 🎯 **Ask it, and then stop talking.** *"Where are the first two calls while the third one is happening?"*
  - ⚠️ **This is the whole segment, so let it be uncomfortable.** Somebody wrote an answer down; ask who did and have them read it. **Wrong answers are the good ones here** — *"in the terminal"*, *"in the variable"*, *"scrolled up"* — because each one is a place that sounds plausible and isn't
- [ ] 💡 **Take "they're in the terminal" seriously if it comes**, because it's the sharpest wrong answer: *"the text is on the screen, true. But your program can't read the screen. Can the third run tell me who called first?"*

### Nowhere

- [ ] 🎞️ **GO TO SLIDE 3** — *Nowhere* · 🎯 **the week in six words, said flatly:** *"they never existed at the same time. Each run built one call, printed it, and ended"*
- [ ] *"So tonight is the first program in this course that can hold more than one of something. And by the end of tonight you'll find out exactly what that's worth"* — ⚠️ **don't wink.** The §6 promise is already made; don't make it twice
- [ ] **✓ CHECKPOINT:** the room can say why the third run knows nothing about the first two

## 2 · The board has to hold people *(slides 4–6)*

### A new week, the same move

- [ ] *"Back to Haldane, and notice what we still don't do: open anything. Third week, same one window — and every command still names its week."* In the same terminal, same spot:
  ```bash
  dotnet new console -o week-03/Haldane
  ```
  ```bash
  cp week-02/Haldane/Conditions.cs week-03/Haldane/
  ```
  - 🎯 **The `cp` is the half that's theirs — scope it out loud, the way week 2 did:** *"last week's logic, carried forward in one move. I didn't rewrite it; it was already right. **Your homework asks you for this twice tonight** — `Station.cs` and `Switchboard.cs`, both making the trip into `week-03`"*
  - ⚠️ **`dotnet new` is NOT theirs, and must not be sold as a shared rhythm.** They have not typed it since week 1 and will not until week 4 — their week arrives as a **dragged folder**, not a command. **What they actually share is the window and the week-prefix**, which is what the line above claims and the whole of what it claims
- [ ] **The station's problem tonight, said once:** *"everything on that duty console so far has been one of a thing — one temperature, one blizzard flag. Tonight it has to hold **the people who are outside**, and that number changes all day"*

### Who chose the 3?

- [ ] In `week-03/Haldane/Program.cs`, **select the whole file (`⌘A`) and paste over it.** ⚠️ **The template is TWO lines** — a `// See https://aka.ms/new-console-template` comment *and* the `Hello, World!` — so replacing "the line" strands the comment at the top, which is exactly where §4's `using Spectre.Console;` is about to land. 📖 **Talk it through** — *"three people are out on the ice, so a space for three"*:
  ```csharp
  string[] names = new string[3];
  names[0] = "Okonkwo";
  names[1] = "Reyes";
  names[2] = "Lindqvist";
  ```
- [ ] 💥 **Now somebody else signs out. Type this one** — the room needs to watch a fourth thing go into a space for three:
  ```csharp
  names[3] = "Bhatt";
  ```
- [ ] Run it:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 💥 **`Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.`** — let it sit for a second
- [ ] 🎞️ **GO TO SLIDE 4** — *Who chose the 3?* · 🎯 **ask before explaining:** nobody's surprised. But *"answer me this — who chose the 3?"*
  - **The answer, once somebody says it:** *"I did. This afternoon. Before I knew how many people would be outside"*
- [ ] ⚠️ **The follow-up is the actual lesson, and somebody will offer it:** *"why not make it a hundred?"* — ⚠️ **don't answer it in words. Do it**, back in `Program.cs`. Change the `3`, and have the board say how many people are outside:
  ```csharp
  string[] names = new string[100];
  ```
  ```csharp
  Console.WriteLine($"{names.Length} people outside.");
  ```
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 💥 **`100 people outside.`** — and the crash is gone, which is the point being made *against* them. **Let it sit.** 🎯 Then, flatly: *"there are four. The board says a hundred — and the board is the only thing that knows"*
- [ ] 🎯 **Then land it:** *"the number isn't the problem. **Having to pick one** is the problem"* 🔗 **This plants `Count` exactly** — two beats on, **the same sentence** prints `4 people outside.` The array could only ever report **the size I guessed**; the list reports **how many there are**

### The one that grows

- [ ] **Select all of it — the array, the four names *and* the `Length` line — and paste over it.** ⚠️ **`⌘A` is the safe move; a stray `Console.WriteLine(names.Length);` left behind is a `CS0103` on a name that no longer exists:**
  ```csharp
  List<string> outside = new List<string>();
  outside.Add("Okonkwo");
  outside.Add("Reyes");
  outside.Add("Lindqvist");
  outside.Add("Bhatt");

  Console.WriteLine($"{outside.Count} people outside.");
  ```
- [ ] Run it:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] It prints **`4 people outside.`** 🎯 **Collect the pair before you move — it's the same sentence they read two minutes ago:** *"a hundred, and now four. Same sentence — and this time it's true"*
- [ ] 🎞️ **GO TO SLIDE 5** — *The one that grows* · *"`Add` puts one on the end and it never runs out. `Count` is the list answering a question about itself"*
- [ ] 🎯 **The line worth saying slowly**, because it kills a habit they all have: *"`Count` is not a variable you keep updated. Last week your desk had an `int callsTaken` that you had to remember to increment."*

### What the brackets are for

- [ ] *"But a person on that board is more than a name. It's a name, a reason, a time they went out and a time they're due back — four facts that belong together"*
- [ ] **New file, `week-03/Haldane/SignOut.cs`.** 📖 **Forty seconds, and say so:** *"you have all written a class. I'm not going to explain it"*:
  ```csharp
  public class SignOut
  {
      public string Time;
      public string Name;
      public string Reason;
      public string Expected;

      public SignOut(string time, string name, string reason, string expected)
      {
          Time = time;
          Name = name;
          Reason = reason;
          Expected = expected;
      }
  }
  ```
  - 💡 **If anyone asks why the constructor:** the four fields would otherwise be four `CS8618` warnings, and week 2 taught them to want `0 Warnings`. One sentence, then move
  - ⚠️ **Do not discuss `public` fields.** Week 4 opens on what they cost. If it's raised: *hold that thought for exactly one week*
- [ ] Back in `Program.cs`, replace the list block. 📖 **The brackets are the lesson — name them:** *"a list **of SignOut**. Not of strings — of the thing I wrote thirty seconds ago"*:
  ```csharp
  List<SignOut> outside = new List<SignOut>();
  outside.Add(new SignOut("14:20", "Okonkwo", "MET RUN", "15:00"));
  outside.Add(new SignOut("14:20", "Reyes", "DIG OUT", "14:45"));
  outside.Add(new SignOut("09:05", "Lindqvist", "FUEL", "10:30"));
  ```
- [ ] 🎞️ **GO TO SLIDE 6** — *What the brackets are for* · *"that's what the angle brackets are for. A list is a list **of** something, and the something is defined by what's inside the brackets"*
- [ ] 💡 **The reasons are worth five seconds and no more:** *"MET RUN, DIG OUT, FUEL. People go outside at a place like this for about six reasons, and every one of them ends with somebody due back at a time"* ⚠️ **Do not explain the station.** The rows do it
- [ ] **Commit it — Source Control view: stage, paste, ✓ Commit.** ⚠️ **No narration, and no Sync.** Git stopped being content after week 2; from here it is a habit they watch you have. Say nothing about it at all:
  ```
  Week 3: the board holds people
  ```
- [ ] **✓ CHECKPOINT:** somebody can say what `<SignOut>` is doing, and why `Count` beats a counter

## 3 · Counting spaces by hand *(slides 7–8)*

### The board, printed the hard way

- [ ] *"Now we are going to display the duty console and make it easier to read"* — paste under the list. 📖 **Name the `,-12` when you hit it:** *"each column is defined by a fixed number of characters - 8 for Time, 12 for Name, 10 for Reason. Expected does need to be defined (last column). The negative sign indicates a left-aligned column."*:
  ```csharp
  Console.WriteLine("TIME    NAME        REASON    EXPECTED");
  Console.WriteLine("-------------------------------------------");
  foreach (SignOut s in outside)
  {
      Console.WriteLine($"{s.Time,-8}{s.Name,-12}{s.Reason,-10}{s.Expected}");
  }
  ```
- [ ] Run it:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 🎯 **It looks good. Say so, and mean it** — this is the setup and it only works if you don't sneer at it: *"…and that's fine, isn't it. Three columns, all lined up. That header row I counted the spaces in by hand, but it's done now"*

### The break

- [ ] ⚠️ **Unannounced, as always.** *"Then at 14:57 somebody signs out to dig out a vent."* Add one more line to the list — **type this one**, saying the reason out loud as you write it:
  ```csharp
  outside.Add(new SignOut("14:57", "Achterberg", "DIG OUT VENT 3", "16:30"));
  ```
- [ ] Run it:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 💥 **`14:57   Achterberg  DIG OUT VENT 316:30`** — let it sit. Then, deliberately: *"Achterberg is due back at three-sixteen-thirty. At forty below"*
- [ ] 🎞️ **GO TO SLIDE 7** — *Counting spaces by hand* · 🎯 **ask before explaining:** *"I could go and change the 10 to a 16. What happens the next time somebody types a longer one?"*
- [ ] 🎯 **Then land it, and point back a week:** *"those widths are guesses I made about text that didn't exist yet. **I wrote the format string this afternoon and Achterberg typed that at 14:57.** That's last week's sentence wearing different clothes"*
- [ ] 💡 *"What I actually want is something that looks at the values first and then decides how wide the columns are. That's a genuinely annoying afternoon to write. So we won't"*

### Your first NuGet package

- [ ] Add it — **this is the first package in the course, so let the command be its own beat:**
  ```bash
  dotnet add week-03/Haldane package Spectre.Console --version 0.57.2
  ```
  - ⚠️ **The word order is genuinely odd and it is worth ten seconds**, because they will type it wrong tonight: the **project comes before the word `package`**. It's `dotnet add <project> package <name>`. Say it as *"add, to this project, a package"*
  - 💡 **And it's the week-prefix habit again:** from the top of the repo there's no project to guess at, so a bare `dotnet add package` answers `Could not find any project in ...`
- [ ] 🎞️ **GO TO SLIDE 8** — *Your first NuGet package* · 🎯 **the sentence that matters more than it looks:** *"nothing was installed on your machine. That command edited one file"*
- [ ] **Open `week-03/Haldane/Haldane.csproj`** and point at the line that appeared:
  ```xml
  <PackageReference Include="Spectre.Console" Version="0.57.2" />
  ```
- [ ] 🎯 *"The package belongs to the **project**, not the computer. That line is in my repo. When I clone this onto another machine, `dotnet build` fetches it — **restored**, not installed"*
- [ ] ⚠️ **Then collect it against the thing they actually worry about:** *"which is why the lab PCs wiping themselves overnight doesn't matter here. Your project file remembers. You will never re-install this"*
- [ ] ⚠️ **One sentence about input, now, while it's cheap** — it costs points later otherwise: *"Spectre draws things. It does not read the keyboard. `Console.ReadLine` still does that, all semester"*
- [ ] **✓ CHECKPOINT:** somebody can say which file changed, and what "restored" means

## 4 · One line does the drawing *(slide 9)*

- [ ] At the very top of `Program.cs`:
  ```csharp
  using Spectre.Console;
  ```
- [ ] **Select the three hand-printing lines and the `foreach`** — the header, the dashes, and the padded loop — and paste this over the top of them. 📖 **Talk it through:** *"four columns by name, then the same loop I already had, then one line that draws it"*:
  ```csharp
  var board = new Table();
  board.AddColumn("TIME");
  board.AddColumn("NAME");
  board.AddColumn("REASON");
  board.AddColumn("EXPECTED");

  foreach (SignOut s in outside)
  {
      board.AddRow(s.Time, s.Name, s.Reason, s.Expected);
  }

  AnsiConsole.Write(board);
  Console.WriteLine($"{outside.Count} people outside.");
  ```
- [ ] Run it:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 🎞️ **GO TO SLIDE 9** — *One line does the drawing* · 🎯 **point at what did *not* change:** *"the loop is the same loop. What went away is every number I was counting by hand — and `DIG OUT VENT 3` fits, because the table measured it instead of guessing"*
- [ ] 🎯 **The convergence. Ask it; don't announce it:** *"anybody recognise this?"*
  - ⚠️ **Wait.** The board has been on the projector at the start of three sessions and somebody will get there. **If nobody bites within a few seconds, say it plainly and move on** — it's a gift, not a hinge: *"that's the duty console. The thing that's been up on the screen when you walk in"*
  - 💡 **The honest version of the line, if you want it:** *"the page was built to look like this program. Not the other way round"*
- [ ] 💡 **Colour, thirty seconds, no more** — borders and hex colours in markup. *"All of this is yours to play with in the lab, and **none of it is graded**. No check in this course has ever looked at what your program prints, and that's on purpose"*
- [ ] **Commit it — stage, paste, ✓ Commit.** Still silent, still no Sync:
  ```
  Week 3: the table measures instead of guessing
  ```
- [ ] **✓ CHECKPOINT:** the room can say what a `Table` does that `,-12` couldn't

## 5 · Names, not positions *(slides 10–12)*

### A dictionary is a lookup

- [ ] *"One more thing the board needs. Somebody radios in and I've got a name — I want to know who that is"*
- [ ] Paste under the list block:
  ```csharp
  Dictionary<string, string> roles = new Dictionary<string, string>();
  roles["Okonkwo"] = "station leader";
  roles["Reyes"] = "general technician";
  roles["Lindqvist"] = "generator mech";
  roles["Moretti"] = "meteorology";
  roles["Bhatt"] = "comms";
  roles["Nakamura"] = "chef";
  ```
- [ ] 🎞️ **GO TO SLIDE 10** — *Names, not positions* · *"a list finds things by **position** — item zero, item one. A dictionary finds them by **key**, and here the key is a person's name"*
- [ ] Now use it — paste at the end of the file:
  ```csharp
  Console.Write("Look somebody up: ");
  string who = (Console.ReadLine() ?? "").Trim();
  Console.WriteLine(roles[who]);
  ```
- [ ] Run it and answer **`Bhatt`**:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] It prints **`comms`**. *"Instant. It didn't look through six people to find him"*

### The key that isn't there

- [ ] ⚠️ **Unannounced.** Run it again, and this time answer **`Halvorsen`** — say it like you're remembering someone: *"…Halvorsen, was it?"*
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 💥 **`Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'Halvorsen' was not present in the dictionary.`**
- [ ] 🎞️ **GO TO SLIDE 11** — *The key that isn't there* · 🎯 **kill the two wrong beliefs by name, because the room holds both:** *"it did not give me back `null`. It did not give me back nothing. **It threw.** And 'a name that isn't on the list' is the most ordinary thing that will ever happen to a lookup"*
- [ ] ⚠️ 🎯 **The distinction that will cost them an hour if you skip it. Scroll up and point at the lines that made the dictionary:** *"look at these. `roles["Bhatt"] = "comms";` — Bhatt wasn't in there either, and that line worked fine. **Assigning a key that doesn't exist creates it. Reading one throws.** Two operations that look almost identical on the page"*

### TryGetValue asks first

- [ ] Select the `Console.WriteLine(roles[who]);` line and paste over it. 📖 **Say the `if` as a question** — *"was that name in there? then use it"*:
  ```csharp
  if (roles.TryGetValue(who, out string? role))
  {
      Console.WriteLine($"{who} - {role}");
  }
  else
  {
      Console.WriteLine($"No '{who}' on this station. {roles.Count} people on the crew list.");
  }
  ```
- [ ] 🎞️ **GO TO SLIDE 12** — *TryGetValue asks first* · 🎯 **let them name it — this is the best question of the segment:** *"where have you seen this exact shape before?"*
  - **Wait for it.** `int.TryParse`, last week. *"Same shape, different question. Returns a bool — did that work — and hands you the answer through `out` when it did. Never throws"*
- [ ] Run it twice — `Bhatt`, then `Halvorsen`:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 🎯 *"Same missing name. No body on the floor"*
- [ ] **✓ CHECKPOINT:** somebody can say what `roles["nobody"]` does, and what `roles["nobody"] = "x"` does

## 6 · Run it again *(slides 13–14)*

### Sign somebody out

- [ ] *"One last thing, and then we're done with the board. Right now every person on it is typed into my source code. That's not a duty console — that's a poster"*
- [ ] Paste **above** the `var board = new Table();` line. 📖 **Talk it through** — *"ask three questions, put the answers on the board"*:
  ```csharp
  Console.Write("Sign out - name: ");
  string name = Console.ReadLine() ?? "";
  Console.Write("Reason (MET RUN / DIG OUT / FUEL / FIELD / COMMS / WALK): ");
  string reason = Console.ReadLine() ?? "";
  Console.Write("Back by: ");
  string expected = Console.ReadLine() ?? "";

  if (!string.IsNullOrWhiteSpace(name))
  {
      outside.Add(new SignOut("14:57", name.Trim(), reason.Trim(), expected.Trim()));
  }
  ```
  - 💡 **The `if` is week 2, in one sentence:** *"somebody who typed nothing didn't sign out"*
- [ ] Run it, and sign **Bhatt** out on a **COMMS** run, back by **16:30**:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] **There he is on the board, at 14:57.** And the count says **`4 people outside.`** 🎯 *"That's a working duty console. Somebody went outside, and the board knows"*

### The drop

- [ ] ⚠️ 🎯 **This is the beat the week exists for. Do not rush it, and do not type anything.**
- [ ] **Say what you're about to do, because it's a promise being kept:** *"I told you about this in week 1. I'll do it now"*
- [ ] Run the same program again — **press Enter at all three prompts**, then type any name to look up:
  ```bash
  dotnet run --project week-03/Haldane
  ```
- [ ] 💥 **The board comes up with three rows. `3 people outside.`**
- [ ] 🎯 **Let the silence run.** Then, flatly: *"Bhatt is gone. I didn't delete him. I ran the same program"*
- [ ] 🎞️ **GO TO SLIDE 13** — *Run it again* · 🎯 **the distinction that makes it a lesson instead of a disappointment:** *"and look at what **did** come back. Okonkwo, Reyes, Lindqvist — three for three. Why them?"*
  - **Wait.** Somebody will get it: they're written in the source. *"Right. Those three aren't saved data, they're **lines of code**, and lines of code run again every time. Bhatt had no line of code behind him. He only ever existed in memory, and memory is the length of one program"*
- [ ] ⚠️ **Somebody will ask how to fix it. Take it seriously and refuse it:** *"with everything you know tonight — you can't. That is not a gap in your skills. There is no arrangement of `List` and `Dictionary` that survives the program ending"*
- [ ] 🎞️ **GO TO SLIDE 14** — *A place to keep things while you work* · *"a collection is a place to keep things **while you work**. It is not a place to keep things"*
- [ ] 🔗 **Name where it gets answered, and then stop:** *"week 8, your list gets a file, and it survives the night for the first time. Week 10 it gets a database and it stops being only yours. Most of the rest of this course is this one problem, answered properly"*
- [ ] 🎯 *"Until then — be annoyed by it. That's genuinely the assignment"*
- [ ] **Commit the week's work — in the Source Control view:** stage, paste the message, **✓ Commit**, then **Sync**:
  ```
  Week 3: the board holds people, and forgets them
  ```
  - 💡 **Instructor-facing, worth knowing and not worth saying:** that's the **third** commit tonight and the **only** Sync — three saves, one push, which is the shape §8 is about to ask them for. It also quietly does §6's job for you: the room has now watched these lines of code get saved three times, so *"those three aren't data, they're lines of code"* is something they have seen rather than something you told them
- [ ] **✓ CHECKPOINT:** somebody can say why three rows came back and one didn't

## 7 · Hand off to the lab *(slide 15)*

- [ ] 🎞️ **GO TO SLIDE 15** — *Lab: the night's log*. Leave it up for the whole lab
- [ ] 🎯 **The frame:** *"last week your desk took calls and forgot every one of them — it counted them and could tell you nothing else. You watched it say so at the end of your shift. Tonight it remembers: a list of the night, and a dictionary of who won't stop ringing"*
- [ ] Setup on screen, said once: **pull `dotnet-db-starters` → copy the one `week-03` folder into your repo → `dotnet test week-03/Lab.Checks`** → **1 / 5**
- [ ] 💡 **Warn them about the pause, so it doesn't read as broken:** *"your first `dotnet test` will sit there a moment fetching Spectre. That's the restore we just watched. It happens once per machine, and then never again"*
- [ ] 🎯 **Say the target, and put "done" on their machines, not yours:** *"five green is the checkpoint, not the finish. **When check 5 goes green, run your shift, take four or five calls, watch the board fill up — and then quit and run it again.** What you see is tonight's actual lesson, and I want you to see it on your own screen rather than mine"*
- [ ] ⚠️ **Pre-empt the thing that will otherwise cost you twenty minutes of support:** *"and when it comes up empty — **nothing is broken and you haven't done anything wrong**. That's the assignment"*

## 8 · Wrap-up, after the lab *(slide 16)*

- [ ] 🎞️ **GO TO SLIDE 16** — *Tonight, in one picture*. Three beats: **a list is every one of them, in order** · **a dictionary is one entry per key** · **neither was ever written down**
- [ ] 💡 **If the lab went well, collect it from their own screens:** *"your board had three rows in one table and two in the other. Three calls, two callers. That's the whole difference between a list and a dictionary, and you already have it"*
- [ ] Homework, in two sentences: *"your station gets a memory — the request queue, and a count of who keeps calling. You add the package yourself this time, which is one command"*
- [ ] ⚠️ Repeat the two that cost points silently: **`Console.ReadLine` reads and `AnsiConsole` draws** — Spectre's own prompts crash under the grader — and **three commits touching your `week-03/Homework` folder**
- [ ] 🔗 **Week 4, and this one is worth selling:** *"that station you invented in week 1 — this is its last week. Next week you pick your own topic, you make a second repo, it's public, and you keep it until December. Everything after next week is you extending one program that's yours"*
- [ ] 💡 **The one warning worth planting now:** *"start thinking about it tonight. The only rule is that it has to be able to grow a **second, related** thing by week 12 — reviews for albums, sightings for stations. I'll say it again next week"*
