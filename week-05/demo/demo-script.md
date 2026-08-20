# Week 5 Demo — How Many Are There? 🧊

**Haldane Station · duty console · day 234**

Tonight the room finds out what a word they have all typed was actually doing. Then they watch an object get built, one field at a time, and find out that a copy of a list is not a copy of what is in it.

> **The shape of the night:** a number that belongs to nobody → the word, explained → the debugger, earned → two names for one thing → and a name for nothing at all.

**Total: ~100 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-05/demo/script.html) and confirm the top line says *day 234*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 5's board is up, with the crew's trip tally on it. Say nothing about it
- [ ] ⚠️ **Put week 4's folder back to its finished state — §1 copies out of it.** Whatever you did to it while rehearsing, this makes tonight's carry-forward correct:
  ```bash
  cp ~/Repos/dotnet-db-dev-answer-keys/week-04/demo-starter/Haldane/*.cs week-04/Haldane/
  ```
  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector. The instructor notes live beside them in `demo-starter/NOTES.md`
  - ⚠️ **No `week-04/Haldane` at all?** Make it first — `dotnet new console -o week-04/Haldane`, then `dotnet add week-04/Haldane package Spectre.Console --version 0.57.2` — then run the copy above
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 4 left it, with `week-01/` through `week-04/` in it
- [ ] ⚠️ **Run `dotnet run --project week-04/Haldane` once before class.** §1 now opens by running it as the refresher, so it has to build on the night — a cold NuGet cache restoring Spectre in front of the room is a slow first minute
- [ ] ⚠️ **Delete `week-05/` from the demo repo if you've rehearsed.** `dotnet new` refuses to overwrite, and §1 starts with it
- [ ] ⚠️ **Prove the debugger works before the room arrives, because §4 is the payoff and it is the only beat that needs the editor.** Put a breakpoint anywhere in last week's `week-04/Haldane/Program.cs`, press <kbd>F5</kbd>, answer whichever pickers appear, and confirm it stops. Then take the breakpoint off. **If it will not stop, run `Developer: Reload Window` from the Command Palette** — see *What could go wrong* in the lesson plan
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station of your own"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"Before we start: this is where we got to, and it was a week ago"*

  ```bash
  dotnet run --project week-04/Haldane
  ```

- [ ] **Press `a`, then `Reyes`, then Enter without typing a time.** The exact keystroke the room watched fail, and then watched stop failing

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │
  └───────┴───────────┴─────────┴──────────┴────────┘
  3 people outside.
  ```

- [ ] 📖 **Three things, fast — this is a refresher, not a re-teach:** *"the board. A desk you work at, four things it can do. And I just amended Reyes's return time to nothing at all — and she still says 14:45, because the property refused it"*
- [ ] 💡 **That is the whole of last week in about forty seconds**, and it is the state tonight starts from. **Don't linger** — if somebody wants the reasoning again it is in the notes
- [ ] **Press `q` to close the desk**

- [ ] **Now make this week's folder.** No commentary — they have watched this four times

  ```bash
  dotnet new console -o week-05/Haldane
  ```

- [ ] **Carry last week forward — all three files.** Nothing is edited yet; last week's work just makes the trip

  ```bash
  cp week-04/Haldane/Conditions.cs week-04/Haldane/SignOut.cs week-04/Haldane/Program.cs week-05/Haldane/
  ```

- [ ] **Add the package** — the board needs it, same as every week since three

  ```bash
  dotnet add week-05/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] 📖 **Say why — thirty seconds, and they need it because they hit the same thing in the lab.** *"VS Code worked out which projects live in this folder when I opened it. This week's folder did not exist then — I made it four minutes ago. So it does not know about it yet, and reloading is how it finds out"*
- [ ] 🎯 **Then the part that transfers:** *"you will do exactly this reload in the lab tonight, straight after you copy your week in. Anything that appears in a folder after VS Code opened it, VS Code learns about late"*
- [ ] 💡 **It also wakes IntelliSense on the new files** — the same staleness wearing a different hat. Worth a sentence if squiggles show up on good code later

- [ ] **Open `week-05/Haldane/Program.cs`.** *"Last week's desk, moved across whole. Two small changes and it is tonight's"* — **both have an exact place to look, so neither is a hunt**

- [ ] **1 of 2 — the new habit.** It goes on its own line directly under `using Spectre.Console;`, which is the **first line of the file**

  ```csharp
  AnsiConsole.Clear();
  ```

- [ ] 📖 *"New habit from tonight: the console clears itself down before it draws anything. A duty board that starts halfway down a build log is not a duty board"*

- [ ] **2 of 2 — the date.** <kbd>⌘F</kbd> for **`day 233`** — one hit, in the banner. Make it **`day 234`**
- [ ] 💡 *"A day has passed"* — and it matches the board they walked in to

- [ ] **Run it.** The desk they know, one day on

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │
  └───────┴───────────┴─────────┴──────────┴────────┘
  3 people outside.

  [o]ut  [a]mend  [b]ack  [w]ho  [q]uit:
  ```

- [ ] **Press `q`**, and say the premise while it is on screen: *"second week running that I have started by copying last week and changing a date. That is what a program that lives somewhere looks like, and it is what yours is doing too"*

- [ ] 🎯 **Start the branch, and say it as you type it** — *"before I touch anything: a branch for tonight's work. Same as week 4 — nothing goes straight to `main` any more, and that goes for your project too"*

  ```bash
  git checkout -b how-many-are-there
  ```

- [ ] ⚠️ **And one sentence they have not heard before, because it changed this week:** *"the commits I count on your homework are the ones on **this week's branch**. Commit straight to `main` and they do not count — and there is no pull request to merge either. Branch first, every week"*
- [ ] 💡 **Fifteen seconds, then stop.** Week 4 taught branch → pull request → merge and this is not a re-teach — the *only* new fact is what gets counted. If somebody asks how branches work, it is in week 4's notes

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step, so it happens here first

  ```bash
  git add . && git commit -m "week 5: the desk, carried forward"
  ```

---

## 2 · The tally that belongs to nobody *(slides 2–3)*

- [ ] *"The board knows who is outside. It does not know who has already been out twice today — and at minus thirty-nine that is the number the duty officer actually wants"*

- [ ] **New file, `week-05/Haldane/CrewMember.cs`.** Paste the whole class

  ```csharp
  public class CrewMember
  {
      public string Name { get; }

      public int TripsToday { get; private set; }

      public CrewMember(string name)
      {
          Name = name;
      }

      public void GoesOut()
      {
          TripsToday++;
      }
  }
  ```

- [ ] 📖 *"Nothing new in it. A name set once, a count only this class can move, and the one method that moves it — that is all of last week, applied to a person instead of a sign-out"*

- [ ] **Now `SignOut.cs`, and this is the interesting edit.** <kbd>⌘F</kbd> for **`public string Name { get; }`** — one hit. Replace that line with

  ```csharp
      public CrewMember Who { get; }
  ```

- [ ] 🎯 **Say why, because this is the beat and not the typing:** *"the board has been storing a person's name. A name is a string, and a string cannot carry a trip count. So the board stops holding a name and starts holding the person"*

- [ ] **And the constructor, in the same file.** <kbd>⌘F</kbd> for **`public SignOut(`** — one hit. Replace the whole constructor with this

  ```csharp
      public SignOut(string time, CrewMember who, string reason, string expected)
      {
          Time = time;
          Who = who;
          Reason = reason;
          Expected = expected;

          Who.GoesOut();
      }
  ```

- [ ] 📖 *"Last line. Signing somebody out **is** the trip — so there is no way to put a row on this board without the count moving, and no way to move the count without a row"*

- [ ] 💡 **Somebody will ask where `SignIn` is — the board now has a `GoesOut()` and a `Back()` and no symmetry between them. The answer is thirty seconds and it is tonight's subject:** *"`SignOut` is not a verb. It is a thing — one line on the board, a record that somebody went outside. You do not un-write a record. When they come back you do not make a second one; you finish the one that is already there, and that is `Back()`"*
- [ ] 💡 **If they push — why no `ComesBack()` on the crew member:** *"their trip was counted on the way out. Coming back does not change how many times they went. Two objects, two different facts: the person's tally moves when they leave, and the sign-out's status moves when they return"*

- [ ] ⚠️ **Now the build is broken, and the size of the list is the segment.** *"I changed one property on one class. Everything that ever put a name on that board has just stopped compiling — say what the count says"* — **run it and read the list**

  ```bash
  dotnet build week-05/Haldane
  ```

- [ ] 💡 **Don't dwell on the errors themselves** — there are only two complaints in there, each said several times: *cannot convert from `string` to `CrewMember`* where a row is made, and *`SignOut` does not contain a definition for `Name`* where one is read. **The point is the reach**, and that four edits will clear the lot

- [ ] **1 of 4 — the crew, and the three rows.** In `Program.cs`, <kbd>⌘F</kbd> for **`List<SignOut> outside`** — one hit. Select from there down to the last `outside.Add(...)` and paste this over the lot

  ```csharp
  List<CrewMember> crew = new List<CrewMember>();

  CrewMember okonkwo = new CrewMember("Okonkwo");
  CrewMember reyes = new CrewMember("Reyes");
  CrewMember lindqvist = new CrewMember("Lindqvist");

  crew.Add(okonkwo);
  crew.Add(reyes);
  crew.Add(lindqvist);
  crew.Add(new CrewMember("Moretti"));
  crew.Add(new CrewMember("Bhatt"));
  crew.Add(new CrewMember("Nakamura"));

  List<SignOut> outside = new List<SignOut>();
  outside.Add(new SignOut("14:20", okonkwo, "MET RUN", "15:00"));
  outside.Add(new SignOut("14:20", reyes, "DIG OUT", "14:45"));
  outside.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
  ```

- [ ] 📖 *"Six people on the winter crew, and three of them are already outside. The rows do not hold names any more — they hold three of those six"*

- [ ] **2 of 4 — the board's NAME cell.** <kbd>⌘F</kbd> for **`Markup.Escape(s.Name)`** — one hit, inside `DrawBoard`. Make it read

  ```csharp
              $"[{Fg}]{Markup.Escape(s.Who.Name)}[/]",
  ```

- [ ] 📖 *"The board goes through the person to get the name"*

- [ ] **3 of 4 and 4 of 4 — the two searches.** <kbd>⌘F</kbd> for **`s.Name == name`** — **two hits**, one in `AmendABackBy` and one in `MarkSomebodyBack`. Make both read `s.Who.Name == name`
- [ ] 💡 *"Same edit, twice. Every place that used to ask a sign-out its name now asks the person on it"*

- [ ] **Build again.** *"Four edits, and the list is down to one — and this last one is a different kind of problem"*

  ```bash
  dotnet build week-05/Haldane
  ```

  ```
  error CS1503: Argument 2: cannot convert from 'string' to 'CrewMember'
  ```

- [ ] 🎯 **This is `SignSomebodyOut`, and it is worth ten seconds because it is honest:** *"the duty officer types a name at the desk. A typed name is a string. The board wants a person — so somewhere, something has to turn one into the other"*

- [ ] **<kbd>⌘F</kbd> for `Still load-bearing`** — one hit, a comment in `SignSomebodyOut`. **Select from that comment down to the closing `}` of the `if` beneath it**, and paste this over the lot

  ```csharp
      foreach (CrewMember c in crew)
      {
          if (c.Name == name.Trim())
          {
              outside.Add(new SignOut("14:57", c, reason.Trim(), expected.Trim()));
              return;
          }
      }
  ```

- [ ] 📖 *"Walk the crew, find the one with that name, put them on the board. Six people, so at worst it looks at six"*
- [ ] 💡 **The blank-name guard went with it, and that is fine:** *"it was there to stop an empty name putting a blank row on the board. Nobody on this station is called nothing, so the search refuses it now"*

- [ ] **Now the TRIPS column.** <kbd>⌘F</kbd> for **`]STATUS[/]");`** — one hit, inside `DrawBoard`. Make it read

  ```csharp
          .AddColumn($"[{Dim}]STATUS[/]")
          .AddColumn($"[{Dim}]TRIPS[/]");
  ```

- [ ] **And the cell for it.** <kbd>⌘F</kbd> for **`$"[{Cold}]OUT[/]");`** — one hit. Make it read

  ```csharp
              s.IsBack ? $"[{Dim}]back[/]" : $"[{Cold}]OUT[/]",
              $"[{Fg}]{s.Who.TripsToday}[/]");
  ```

- [ ] **Run it.** Everybody on the board has been out once, and that is true

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  ```

- [ ] **Press `q`**

- [ ] 💥 **Now the last thing the duty officer asked for.** *"One number at the bottom: how many trips has the station logged today?"* <kbd>⌘F</kbd> for **`people outside.[/]");`** — one hit, inside `DrawBoard`. Paste this on the line below it

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]{CrewMember.TripsToday} trips logged today.[/]");
  ```

- [ ] **Build it**

  ```bash
  dotnet build week-05/Haldane
  ```

  ```
  error CS0120: An object reference is required for the non-static field,
  method, or property 'CrewMember.TripsToday'
  ```

- [ ] 🎞️ **GO TO SLIDE 2** — *An object reference is required*
- [ ] 🎯 **Ask for hands, and wait for them:** *"who has seen this error before?"* — then: *"and what did you do about it?"* **Let somebody say the word.** If nobody does: *"I have made this one go away about four hundred times, and every single time I did it the same way"*

- [ ] **Do what the room says. In `CrewMember.cs`, add one word** to the `TripsToday` line

  ```csharp
      public static int TripsToday { get; private set; }
  ```

- [ ] **Build again.** It moved, it did not go away

  ```bash
  dotnet build week-05/Haldane
  ```

  ```
  error CS0176: Member 'CrewMember.TripsToday' cannot be accessed with an
  instance reference; qualify it with a type name instead
  ```

- [ ] 📖 *"Now the board is complaining. And it is telling me exactly what to type"*

- [ ] **In `Program.cs`, do what it says.** <kbd>⌘F</kbd> for **`{s.Who.TripsToday}`** — one hit, the last line of `AddRow`. Make it read

  ```csharp
              $"[{Fg}]{CrewMember.TripsToday}[/]");
  ```

- [ ] 🎯 **Before you run it — ask, then shut up:** *"the board builds now. What is it going to say?"* Let it hang

- [ ] **Run it**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 3     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 3     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 3     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  3 trips logged today.
  ```

- [ ] 🎞️ **GO TO SLIDE 3** — *Three people. One number*
- [ ] 🎯 **The consequence, in station terms, said slowly:** *"Okonkwo has been outside once today. The board says three. And the bottom line — three trips logged today — is right, which is what makes this worse than a crash: one of those numbers is true and three of them are lies, and they all came from the same field"*
- [ ] 🎯 *"Zero errors. Zero warnings. Two compiler messages got me here and I did what both of them asked"*
- [ ] ⚠️ **Do not fix it yet.** Press `q`, leave it on screen, and go to §3

---

## 3 · What `static` actually says *(slides 4–5)*

- [ ] 🎞️ **GO TO SLIDE 4** — *What `static` actually says* · 📖 *"Static is not a fix. It is not a way to quiet the compiler down. It says one thing: this member belongs to the class, not to any one thing made from it. One copy, made once, alive as long as the program runs"*
- [ ] 🎞️ **GO TO SLIDE 5** — *One copy, or one each* · *"Three crew members. Without `static`, three counters. With `static`, one counter and three people taking turns adding to it"*

- [ ] **Take it off.** In `CrewMember.cs`, back to

  ```csharp
      public int TripsToday { get; private set; }
  ```

- [ ] **And put the board's cell back.** <kbd>⌘F</kbd> for **`{Fg}]{CrewMember.TripsToday}`** — one hit, the last line of `AddRow`. Back to

  ```csharp
              $"[{Fg}]{s.Who.TripsToday}[/]");
  ```

- [ ] 🎯 **Now the question the whole segment turns on:** *"so where does the day's total go? It is a real thing the duty officer wants. It just is not a fact about **a** crew member"*
- [ ] *"The day's total is a fact about the crew. So it gets worked out from the crew"*

- [ ] **Replace the `trips logged today` line** with the loop that earns it. <kbd>⌘F</kbd> for **`trips logged today`** — one hit, inside `DrawBoard`

  ```csharp
      int tripsToday = 0;
      foreach (CrewMember c in crew)
      {
          tripsToday += c.TripsToday;
      }

      AnsiConsole.MarkupLine($"[{Dim}]{tripsToday} trips logged today.[/]");
  ```

- [ ] 💡 **Nine lines to add up three numbers, and do not apologise for it — the tedium is the point.** *"Yes, this is a lot of typing to add up three numbers. Hold on to that feeling: in week 9 this entire loop becomes one line, and you will like that line considerably more for having written this one"*

- [ ] **Run it**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  3 trips logged today.
  ```

- [ ] **Press `q`**
- [ ] 🎯 **Point at the last line, because this is the part that lands:** *"three. The day's total said three before the break as well. That number was never wrong — it was the only true thing on the screen. What `static` broke was the three numbers that were supposed to be about people"*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "A trip count that belongs to somebody"
  ```

---

## 4 · Step into it *(slides 6–7)*

- [ ] *"Most of you have set a breakpoint before. Tonight it does a job some of us have never used it for — not finding a bug, just watching an object come into existence"*

- [ ] **Open `week-05/Haldane/CrewMember.cs` and click in the gutter** — the narrow strip left of the line numbers — **beside `Name = name;`.** A red dot appears
- [ ] **Press <kbd>F5</kbd>**, then **`.NET 5+ and .NET Core`** when it asks which debugger. ⚠️ **Not `C#`** — that entry exists in the extension but is not what this list offers you
- [ ] ⚠️ **The project list is the fiddly part, and there is a trick: TYPE `week-05` TO FILTER IT.** Every entry reads `Haldane (/Users/…/week-05/Haldane/Haldane.csproj)` — the name first, then the **full path**, which runs off the end of the box. **You have a `Haldane` in every week by now and they all look identical.** The path is part of the entry, so typing narrows it: **`week-05` leaves only this week's** — one entry, in the demo repo. If more than one survives, add the project name: `05/Hal`. Then <kbd>Enter</kbd>
- [ ] ⚠️ **If tonight's project is not in the list at all**, the reload in §1 did not happen or did not take — Command Palette → `Developer: Reload Window` and try again. **The list only ever holds projects the editor knew about when it last loaded**

- [ ] 🎯 **Point at the Explorer: a `.vscode` folder just appeared.** *"VS Code has written itself two files — that is it remembering how to run this. `launch.json` says what to debug, `tasks.json` says to build it first"*
- [ ] 🎯 **And the sentence that makes tonight transfer, because this is the bit they will meet again:** *"That file names **one** project. In an ordinary repo with one program in it, that is the right answer forever — you press F5 once, it writes this, and it never asks you again. It only had to ask me because this folder has ten programs in it, one for every week we have done"*
- [ ] 💡 **So say what their own repo does, out loud:** *"your project repo has exactly one program in it. You will press F5 there, pick the debugger once, and never see that list at all"*
- [ ] 💡 **And the repoint, in one line:** *"when that config is aimed at the wrong week, open `launch.json` and change the week in it — or delete the `.vscode` folder and press F5 again"*
- [ ] ⚠️ **If it stops nowhere**, the language server is asleep rather than the breakpoint being wrong — same fix, `Developer: Reload Window`, then <kbd>F5</kbd> again

- [ ] 🎞️ **GO TO SLIDE 6** — *Step into the constructor*
- [ ] 🎯 **It has stopped on the line, and the line has not run yet.** Point at the **Variables** pane at the top of the **Run and Debug** view, and expand `this`

  ```
  this.Name        null
  this.TripsToday  0
  ```

- [ ] 📖 *"That is a crew member with no name. The object exists — it has an address, it has fields — and not one of its facts is true yet. `new` made the box; the constructor is what fills it"*
- [ ] **Press <kbd>F10</kbd>** (Step Over). `Name` becomes `"Okonkwo"` in the pane
- [ ] 🎯 *"There. That is an object being built, one fact at a time. We have all written a lot of constructors, and most of us have never watched one run"*

- [ ] **Press <kbd>F5</kbd> to continue.** It stops in the same constructor again
- [ ] 🎯 **This is the one to slow down on:** *"same line, same file — and look at `this`. Name is null again. TripsToday is zero again. This is not the same object with its fields reset. It is a **different object**, and it has its own"*
- [ ] **<kbd>F5</kbd> once more** for Lindqvist. *"Six on the winter crew, so it will do this three more times"* — <kbd>F5</kbd> through the rest without narrating them

- [ ] **Now the second breakpoint.** Click the gutter beside `TripsToday++;` in `GoesOut()`
- [ ] **<kbd>F5</kbd>.** It stops there — expand `this` again

  ```
  this.Name        "Okonkwo"
  this.TripsToday  0
  ```

- [ ] 🎞️ **GO TO SLIDE 7** — *Which one is `this`?*
- [ ] **<kbd>F10</kbd>.** `TripsToday` goes to 1
- [ ] 🎯 *"One line of code, `TripsToday++`, and it just moved exactly one crew member's counter. Which one? The one `this` is pointing at"*
- [ ] **<kbd>F5</kbd>.** It stops again, and `this` is Reyes, on zero
- [ ] 🎯 **The line the whole segment is for:** *"six objects, six counters, and you can see which one moves. That is the difference the word `static` was hiding from you twenty minutes ago"*

- [ ] 💡 **If there is time, expand the Call Stack** below Variables: `GoesOut` was called from `SignOut`'s constructor, which was called from the program. *"One object reaching into another. That is the `Who` I put on `SignOut` in the first segment"*

- [ ] **Take both breakpoints off** (click the red dots) and **<kbd>Shift</kbd>+<kbd>F5</kbd>** to stop
- [ ] 💡 **Say the standing offer once:** *"from tonight, when a value is not what you think it is, this is faster than adding a `Console.WriteLine`. It is in the homework's Stuck section for exactly that"*

---

## 5 · When `static` is right *(slide 8)*

- [ ] *"So is `static` a mistake? No — and two of the things you have used all term are static, correctly"*

- [ ] **Open `week-05/Haldane/Conditions.cs`.** Week 1's file, unchanged since the first night
- [ ] 🎯 *"`public static class Conditions`. Static since week one, and it is right — because there is nothing to have one of. It has no facts. It is a rule. You have never written `new Conditions()` and you never will"*

- [ ] 🎞️ **GO TO SLIDE 8** — *When `static` is right*
- [ ] 🎯 **The bigger one, and it is on their screens every day:** *"`Console.WriteLine`. Several hundred times this term. Not one of you has ever written `new Console()` — because there is one console. That is the whole reason it is static"*
- [ ] *"Same for `int.TryParse` from week 2, and `Math.Round`. Rules, not things"*
- [ ] 🎯 **The test, and it is the sentence to take home:** *"is there exactly one of this thing, ever, in the whole program? Then static. Is it a fact about one particular thing? Then never"*
- [ ] ⚠️ **And the trap, in one line:** *"the compiler asking for `static` is not the compiler recommending it. `CS0120` means **which one did you mean**? Nearly always the answer is to name one — not to abolish the lot of them"*

---

## 6 · Two names, one object *(slides 9–10)*

- [ ] *"End of watch. The desk closes, and before the duty officer hands over they walk the board and account for everybody on it"*
- [ ] 📖 *"And they work off a copy — because last week we learned to hand out copies, and a copy is scratch paper. Nothing on the real board can get hurt"*

- [ ] **This goes after the desk closes.** In `Program.cs`, <kbd>⌘F</kbd> for **`void SignSomebodyOut`** — one hit. Paste this **directly above it**, so it runs the moment the loop lets go

  ```csharp
  // ── end of watch ───────────────────────────────────────────────────────────

  List<SignOut> muster = new List<SignOut>(outside);

  foreach (SignOut s in muster)
  {
      s.Back();
  }

  DrawBoard();

  ```

- [ ] 🎯 **Ask, then shut up:** *"that marks everybody back, on the copy. What does the real board say?"* Let it hang

- [ ] **Run it and press `q` straight away** — the watch ends with all three still outside

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ back   │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ back   │ 1     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  0 people outside.
  3 trips logged today.
  ```

- [ ] 🎞️ **GO TO SLIDE 9** — *Two names, one object*
- [ ] 🎯 **The consequence, and it is the worst one the station has:** *"nobody is outside. Reyes is on the ice. Okonkwo is on the ice. The board has just cleared them both, and the next person to read it has no reason to go looking"*

- [ ] 🎞️ **GO TO SLIDE 10** — *A copy of the list is not a copy of the records*
- [ ] 📖 *"`new List<SignOut>(outside)` is a copy. It is a real one — a second list, its own length, and emptying it would leave the board alone. What it copied is the **list**. What is in it is the same three sign-outs"*
- [ ] 🎯 *"`muster[1]` and `outside[1]` are two names for one record. Write through either name and there is only one thing there to write to"*
- [ ] 💡 **Collect last week honestly, because it was not wrong:** *"last week, `All()` handing back a copy is what stopped anybody emptying the board, and it still does. Tonight is the other half of the sentence — a copy of the list protects the list, and it protects nothing inside it"*

- [ ] **Fix it: the muster reads, it does not write.** <kbd>⌘F</kbd> for **`foreach (SignOut s in muster)`** — one hit. **Select from there down to and including the `DrawBoard();` below it**, and paste this over the lot — **the `List<SignOut> muster = ...` line above stays**

  ```csharp
  AnsiConsole.WriteLine();
  AnsiConsole.MarkupLine($"[{Amber}]Muster - still to account for:[/]");

  foreach (SignOut s in muster)
  {
      if (!s.IsBack)
      {
          AnsiConsole.MarkupLine($"[{Fg}]  {Markup.Escape(s.Who.Name)}[/] "
              + $"[{Dim}]- {Markup.Escape(s.Reason)}, due {Markup.Escape(s.Expected)}[/]");
      }
  }
  ```

- [ ] **Run it, press `q`**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  3 people outside.
  3 trips logged today.

  [o]ut  [a]mend  [b]ack  [w]ho  [q]uit:
  Muster - still to account for:
    Okonkwo - MET RUN, due 15:00
    Reyes - DIG OUT, due 14:45
    Lindqvist - FUEL, due 10:30
  ```

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The muster reads the board, it does not rewrite it"
  ```

---

## 7 · Nothing at all *(slides 11–12)*

- [ ] *"One more, and it is the one that has been sitting in this program since the first segment. Somebody else is heading out"*

- [ ] **Run it, and sign Bhatt out** — press `o`, then **Bhatt**, **COMMS**, back by **16:30**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:57 │ Bhatt     │ COMMS   │ 16:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.
  ```

- [ ] 📖 *"Bhatt is on the winter crew, the desk found him, and the day's total went up. That is the search from the first segment doing its job"*

- [ ] 💥 **Stay in the program. Press `o` again — and this time type `Reyez`.** *"Gloves. Minus thirty-nine. One letter"* — **COMMS**, back by **17:00**

  ```
  │ 14:57 │ Bhatt     │ COMMS   │ 16:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.
  ```

- [ ] 🎯 **Ask, then shut up:** *"what happened?"* — and let it hang. **The answer is nothing.** No row, no message, no error. The board is exactly as it was
- [ ] 🎯 **Say what that costs, in station terms:** *"somebody stood at this desk, said where they were going and when they would be back, and walked out the door. The board has no idea. That is worse than a crash — a crash would at least have told me"*
- [ ] 📖 **Then name the cause, and it is in the code they watched go in:** *"the search walks the crew looking for that name. It does not find it. And then the loop just… ends. Nobody ever asked it what it found"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 11** — *`CrewMember` and `CrewMember?`*

- [ ] **Make the search hand its answer back.** In `Program.cs`, <kbd>⌘F</kbd> for **`foreach (CrewMember c in crew)`** — **one hit, inside `SignSomebodyOut`**. Select from there down to its closing `}` and paste this over it

  ```csharp
      CrewMember? who = Find(name.Trim());

      outside.Add(new SignOut("14:57", who, reason.Trim(), expected.Trim()));
  ```

- [ ] **And the search itself, on the very last line of the file** — a local function, so it has to sit at the bottom

  ```csharp
  CrewMember? Find(string wanted)
  {
      foreach (CrewMember c in crew)
      {
          if (c.Name == wanted)
          {
              return c;
          }
      }

      return null;
  }
  ```

- [ ] 📖 **Name the return type, because it is the whole segment:** *"`CrewMember?`, with a question mark. Every other method we have written promises something comes back. This one walks the crew, and if nobody is called that, the honest answer is nothing at all"*

- [ ] **Build it — and read the output, not the editor**

  ```bash
  dotnet build week-05/Haldane
  ```

  ```
  warning CS8604: Possible null reference argument for parameter 'who' in
  'SignOut.SignOut(string time, CrewMember who, string reason, string expected)'.

      1 Warning(s)
      0 Error(s)
  ```

- [ ] 💡 **The warning prints twice** — once where it happened and once in the summary. The summary is the line to point at
- [ ] 🎯 *"One warning. Week 2 said the compiler talks to you long before it stops you — and this one is talking about something that has not happened yet"*
- [ ] ⚠️ **Do not fix it.** Run it first

- [ ] **Run it and sign `Reyes` out** — press `o`, then **Reyes**, **WALK**, back by **17:00**. It works perfectly

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 2     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:57 │ Reyes     │ WALK    │ 17:00    │ OUT    │ 2     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.
  ```

- [ ] 💡 **Worth one second, no more:** Reyes now has **two** rows and a trip count of **2**, on both of them. *"One person, one counter, two sign-outs pointing at her"* — the same sentence as §6, from the other side

- [ ] 💥 **Press `o` again and type `Reyez`.** *"Same typo as before. Watch what it does now"*

  ```
  Unhandled exception. System.NullReferenceException: Object reference not
  set to an instance of an object.
     at SignOut..ctor(String time, CrewMember who, String reason, String expected)
  ```

- [ ] 📖 *"`Find` looked, nobody on station is called Reyez, and it handed back nothing. Then the board took that nothing and asked it to go outside"*
- [ ] 🎯 *"`null` is not a failure and it is not a bug. It is an answer, and it is the true one. The bug is asking it a question"*
- [ ] 🎯 **And the honest comparison, because this is the beat:** *"ten minutes ago the same typo did nothing at all and I never found out. Now it takes the desk off the air in front of everybody. Which of those would you rather have at minus thirty-nine?"*
- [ ] 🎞️ **GO TO SLIDE 12** — *The warning that was already there* · *"and the compiler said so at build time, in the quietest possible voice, about a crash that had not happened yet"*

- [ ] **The fix.** <kbd>⌘F</kbd> for **`outside.Add(new SignOut("14:57"`** — one hit. Replace **that one line** with

  ```csharp
      if (who == null)
      {
          AnsiConsole.MarkupLine($"[{Amber}]  Nobody on station by that name. Nothing logged.[/]");
      }
      else
      {
          outside.Add(new SignOut("14:57", who, reason.Trim(), expected.Trim()));
      }
  ```

- [ ] **Build it.** The warning is gone, and it is gone for a reason

  ```bash
  dotnet build week-05/Haldane
  ```

  ```
      0 Warning(s)
      0 Error(s)
  ```

- [ ] 🎯 *"Inside that `else`, the compiler knows `who` cannot be null — because I asked. That is the whole deal it is offering: tell me it might be nothing, then check, and I will stop nagging you"*

- [ ] **Run it, press `o` and type `Reyez` one last time**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
    Nobody on station by that name. Nothing logged.
  ```

- [ ] 🎯 **Three behaviours, one typo, and say them in order:** *"silence. Then a crash. Then a sentence that tells the duty officer what happened. That last one is the only one you can work at"*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "Nobody by that name is an answer"
  ```

- [ ] **And push the branch.** Silent — one line, no commentary

  ```bash
  git push -u origin how-many-are-there
  ```

---

## 8 · Hand off *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Lab: the switchboard*. Leave it up for the whole lab
- [ ] *"KDXR. Two new files, five checks, one of them green when you start"*
- [ ] 🎯 **Define done on their machine, not yours:** *"Dorothy has rung four times tonight, Bex once, Teodoro once. Your switchboard says all three of them have called six times. You're done when it can tell three people apart, and when typing a name nobody has does not take the desk off the air"*
- [ ] ⚠️ **Say the homework out loud now:** *"your project gets a `Find` this week — and the interesting half is what it hands back when there isn't one"*

---

## 9 · Wrap *(slide 14)*

- [ ] 🎞️ **GO TO SLIDE 14** — *Tonight, in one picture*
- [ ] **Four beats, and stop:** **`static`** — one copy for the whole program · **instance** — one each, and `this` says which · **a reference** — a name for an object, and two names can point at one · **`null`** — a name for nothing at all
- [ ] 💡 **The one-line version, if only one thing survives the drive home:** *"every variable you have is a name. The question this week asked is what is on the other end of it — one thing, the same thing somebody else is holding, or nothing"*
- [ ] *"Two URLs in Canvas again. Coursework and project"*
- [ ] 💡 **Next week:** *"the switchboard you just built holds callers. Next week it holds a song, a station ident, an advert and a weather bed — in one list, in one loop, and none of them are the same kind of thing"*
