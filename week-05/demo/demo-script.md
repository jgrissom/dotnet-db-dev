# Week 5 Demo — How Many Are There? 🧊

**Haldane Station · duty console · day 234**

Tonight the room finds out what a word they have all typed was actually doing. Then they watch an object get built, one field at a time, and find out that a copy of a list is not a copy of what is in it.

> **The shape of the night:** a number that belongs to nobody → the word, explained → the debugger, earned → two names for one thing → and a name for nothing at all.

**Total: ~100 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-05/demo/script.html) and confirm the top line says *day 234*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 5's board is up, with the crew's trip tally on it. Say nothing about it
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

- [ ] **Press Enter without typing anything.** The same keystroke the room watched last week

  ```
  Correction - new back-by for Reyes:
  ┌───────┬───────────┬─────────┬──────────┬────────┐
  │ TIME  │ NAME      │ REASON  │ EXPECTED │ STATUS │
  ├───────┼───────────┼─────────┼──────────┼────────┤
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │
  └───────┴───────────┴─────────┴──────────┴────────┘
  2 people outside.
  ```

- [ ] 📖 **Three things, fast — this is a refresher, not a re-teach:** *"the board. The duty officer correcting a return time. And I just hit Enter on that prompt with nothing typed — and Reyes still says 14:45, because the property refused it"*
- [ ] 💡 **That is the whole of last week in about forty seconds**, and it is the state tonight starts from. **Don't linger** — if somebody wants the reasoning again it is in the notes

- [ ] **Now make this week's folder.** No commentary — they have watched this four times

  ```bash
  dotnet new console -o week-05/Haldane
  ```

- [ ] **Carry last week's two classes forward.** Nothing is edited; they just make the trip

  ```bash
  cp week-04/Haldane/Conditions.cs week-04/Haldane/SignOut.cs week-05/Haldane/
  ```

- [ ] **Now the board itself.** Select the whole of `week-05/Haldane/Program.cs` (`⌘A`) and paste this over it

  ```csharp
  using Spectre.Console;

  AnsiConsole.Clear();

  const string Amber = "#e8b04b";
  const string Dim = "#6c7b78";
  const string Fg = "#c8d3cf";
  const string Cold = "#7fb2d4";

  AnsiConsole.MarkupLine($"[{Dim}]========================================================[/]");
  AnsiConsole.MarkupLine($"[{Amber} bold]  HALDANE STATION - DUTY CONSOLE[/]");
  AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbour: 512 km - winter crew - day 234[/]");
  AnsiConsole.MarkupLine($"[{Dim}]========================================================[/]");
  AnsiConsole.WriteLine();

  AnsiConsole.MarkupLine($"[{Dim}]Outside:[/] [{Cold}]-39.0 C[/]   "
      + $"[{Dim}]Safe to go out:[/] [{Fg}]{Conditions.IsSafeToGoOut(-39.0, false)}[/]");
  AnsiConsole.WriteLine();

  // ── the board ──────────────────────────────────────────────────────────────

  List<SignOut> outside = new List<SignOut>();
  outside.Add(new SignOut("09:05", "Lindqvist", "FUEL", "10:30"));
  outside.Add(new SignOut("14:20", "Reyes", "DIG OUT", "14:45"));
  outside.Add(new SignOut("14:20", "Okonkwo", "MET RUN", "15:00"));

  // Lindqvist is in from the fuel line.

  outside[0].Back();

  // ── the board, rendered ────────────────────────────────────────────────────

  var board = new Table()
      .Border(TableBorder.Square)
      .BorderColor(Color.FromHex("#1e2529"))
      .AddColumn($"[{Dim}]TIME[/]")
      .AddColumn($"[{Dim}]NAME[/]")
      .AddColumn($"[{Dim}]REASON[/]")
      .AddColumn($"[{Dim}]EXPECTED[/]")
      .AddColumn($"[{Dim}]STATUS[/]");

  foreach (SignOut s in outside)
  {
      board.AddRow(
          $"[{Dim}]{Markup.Escape(s.Time)}[/]",
          $"[{Fg}]{Markup.Escape(s.Name)}[/]",
          $"[{Amber}]{Markup.Escape(s.Reason)}[/]",
          $"[{Dim}]{Markup.Escape(s.Expected)}[/]",
          s.IsBack ? $"[{Dim}]back[/]" : $"[{Cold}]OUT[/]");
  }

  AnsiConsole.Write(board);

  int stillOut = 0;
  foreach (SignOut s in outside)
  {
      if (!s.IsBack)
      {
          stillOut++;
      }
  }

  AnsiConsole.MarkupLine($"[{Dim}]{stillOut} people outside.[/]");
  ```

- [ ] 📖 **Nothing in it is new — say so.** *"That is the board exactly as we left it last time. Two things are different, and neither is code you have not seen: the date, and the first line"*
- [ ] 📖 **Point at `AnsiConsole.Clear()`.** *"New habit from tonight: the console clears itself down before it draws anything. A duty board that starts halfway down a build log is not a duty board"*
- [ ] 💡 **And what is NOT in it — the prompt you just used.** *"The correction has gone. It did its job, and if I left it in, every single run tonight would stop and wait for me to type a time"* ⚠️ **Say the next part, because it is the bit that matters:** *"the door that correction went through is still there — the property that refused the blank. That is in `SignOut.cs`, it stays all term, and all I have taken away is the thing that was asking"*

- [ ] **Add the package** — the board needs it, same as every week since three

  ```bash
  dotnet add week-05/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] **Run it.** The board they know, minus the prompt

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │
  └───────┴───────────┴─────────┴──────────┴────────┘
  2 people outside.
  ```

- [ ] 🎯 **Start the branch, and say it as you type it** — *"before I touch anything: a branch for tonight's work. Same as week 4 — nothing goes straight to `main` any more, and that goes for your project too"*

  ```bash
  git checkout -b how-many-are-there
  ```

- [ ] ⚠️ **And one sentence they have not heard before, because it changed this week:** *"the commits I count on your homework are the ones on **this week's branch**. Commit straight to `main` and they do not count — and there is no pull request to merge either. Branch first, every week"*
- [ ] 💡 **Fifteen seconds, then stop.** Week 4 taught branch → pull request → merge and this is not a re-teach — the *only* new fact is what gets counted. If somebody asks how branches work, it is in week 4's notes

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step, so it happens here first

  ```bash
  git add . && git commit -m "week 5: the board, carried forward"
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

- [ ] **Now `SignOut.cs`, and this is the interesting edit.** Replace the `public string Name { get; }` line with

  ```csharp
      public CrewMember Who { get; }
  ```

- [ ] 🎯 **Say why, because this is the beat and not the typing:** *"the board has been storing a person's name. A name is a string, and a string cannot carry a trip count. So the board stops holding a name and starts holding the person"*

- [ ] **And the constructor, in the same file** — replace the whole existing constructor with this

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

- [ ] **Back in `Program.cs`.** Under the `// ── the board` banner, select the **four lines** from `List<SignOut> outside` down to the last `outside.Add(...)`, and paste this over them

  ```csharp
  List<CrewMember> crew = new List<CrewMember>();
  CrewMember lindqvist = new CrewMember("Lindqvist");
  CrewMember reyes = new CrewMember("Reyes");
  CrewMember okonkwo = new CrewMember("Okonkwo");
  crew.Add(lindqvist);
  crew.Add(reyes);
  crew.Add(okonkwo);

  List<SignOut> outside = new List<SignOut>();
  outside.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
  outside.Add(new SignOut("14:20", reyes, "DIG OUT", "14:45"));
  outside.Add(new SignOut("14:20", okonkwo, "MET RUN", "15:00"));
  ```

- [ ] **Now the table, in one go.** Under the `// ── the board, rendered` banner, select everything from `var board = new Table()` down to the closing `}` of the `foreach` under it, and paste this over the lot

  ```csharp
  var board = new Table()
      .Border(TableBorder.Square)
      .BorderColor(Color.FromHex("#1e2529"))
      .AddColumn($"[{Dim}]TIME[/]")
      .AddColumn($"[{Dim}]NAME[/]")
      .AddColumn($"[{Dim}]REASON[/]")
      .AddColumn($"[{Dim}]EXPECTED[/]")
      .AddColumn($"[{Dim}]STATUS[/]")
      .AddColumn($"[{Dim}]TRIPS[/]");

  foreach (SignOut s in outside)
  {
      board.AddRow(
          $"[{Dim}]{Markup.Escape(s.Time)}[/]",
          $"[{Fg}]{Markup.Escape(s.Who.Name)}[/]",
          $"[{Amber}]{Markup.Escape(s.Reason)}[/]",
          $"[{Dim}]{Markup.Escape(s.Expected)}[/]",
          s.IsBack ? $"[{Dim}]back[/]" : $"[{Cold}]OUT[/]",
          $"[{Fg}]{s.Who.TripsToday}[/]");
  }
  ```

- [ ] 📖 **Two things changed in that block and both are worth naming** — *"a TRIPS column on the end, and the NAME cell now reads `s.Who.Name` instead of `s.Name`. The board goes through the person to get the name"*

- [ ] **Run it.** Everybody has been out once, and that is true

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  ```

- [ ] 💥 **Now the last thing the duty officer asked for.** *"One number at the bottom: how many trips has the station logged today?"* Paste it in `Program.cs` directly under the `people outside.` line

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

- [ ] **In `Program.cs`, do what it says.** It is the **last line of `AddRow`** — the one that currently reads `$"[{Fg}]{s.Who.TripsToday}[/]");`. Replace that one line with

  ```csharp
          $"[{Fg}]{CrewMember.TripsToday}[/]");
  ```

- [ ] 🎯 **Before you run it — ask, then shut up:** *"the board builds now. What is it going to say?"* Let it hang

- [ ] **Run it**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │ 3     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 3     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 3     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  2 people outside.
  3 trips logged today.
  ```

- [ ] 🎞️ **GO TO SLIDE 3** — *Three people. One number*
- [ ] 🎯 **The consequence, in station terms, said slowly:** *"Okonkwo has been outside once today. The board says three. And the bottom line — three trips logged today — is right, which is what makes this worse than a crash: one of those numbers is true and three of them are lies, and they all came from the same field"*
- [ ] 🎯 *"Zero errors. Zero warnings. Two compiler messages got me here and I did what both of them asked"*
- [ ] ⚠️ **Do not fix it yet.** Leave it on screen and go to §3

---

## 3 · What `static` actually says *(slides 4–5)*

- [ ] 🎞️ **GO TO SLIDE 4** — *What `static` actually says* · 📖 *"Static is not a fix. It is not a way to quiet the compiler down. It says one thing: this member belongs to the class, not to any one thing made from it. One copy, made once, alive as long as the program runs"*
- [ ] 🎞️ **GO TO SLIDE 5** — *One copy, or one each* · *"Three crew members. Without `static`, three counters. With `static`, one counter and three people taking turns adding to it"*

- [ ] **Take it off.** In `CrewMember.cs`, back to

  ```csharp
      public int TripsToday { get; private set; }
  ```

- [ ] **And put the board's cell back.** Same line as before — the **last line of `AddRow`**, now reading `$"[{Fg}]{CrewMember.TripsToday}[/]");`. Back to

  ```csharp
          $"[{Fg}]{s.Who.TripsToday}[/]");
  ```

- [ ] 🎯 **Now the question the whole segment turns on:** *"so where does the day's total go? It is a real thing the duty officer wants. It just is not a fact about **a** crew member"*
- [ ] *"The day's total is a fact about the crew. So it gets worked out from the crew"*

- [ ] **Replace the `trips logged today` line** in `Program.cs` with the loop that earns it

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
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  2 people outside.
  3 trips logged today.
  ```

- [ ] 🎯 **Point at the last line, because this is the part that lands:** *"three. The day's total said three before the break as well. That number was never wrong — it was the only true thing on the screen. What `static` broke was the three numbers that were supposed to be about people"*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "A trip count that belongs to somebody"
  ```

---

## 4 · Step into it *(slides 6–7)*

- [ ] *"Most of you have set a breakpoint before. Tonight it does a job some of us have never used it for — not finding a bug, just watching an object come into existence"*

- [ ] **Open `week-05/Haldane/CrewMember.cs` and click in the gutter** — the narrow strip left of the line numbers — **beside `Name = name;`.** A red dot appears
- [ ] **Press <kbd>F5</kbd>**, then **C#** when it asks which debugger
- [ ] ⚠️ **The project list is the fiddly part, and there is a trick: TYPE `week-05` TO FILTER IT.** Every entry reads `Haldane (/Users/…/week-05/Haldane/Haldane.csproj)` — the name first, then the **full path**, which runs off the end of the box. **You have a `Haldane` in every week by now and they all look identical.** The path is part of the entry, so typing narrows it: `week-05` leaves this week's two, and `05/Hal` leaves exactly one. Then <kbd>Enter</kbd>
- [ ] 💡 **Say nothing about this to the room** — it is a picker, not a lesson. But **do not fumble it**, because it is the first ten seconds of the payoff segment
- [ ] ⚠️ **If nothing stops**, the language server is asleep rather than the breakpoint being wrong — Command Palette → `Developer: Reload Window`, then <kbd>F5</kbd> again

- [ ] 🎞️ **GO TO SLIDE 6** — *Step into the constructor*
- [ ] 🎯 **It has stopped on the line, and the line has not run yet.** Point at the **Variables** pane at the top of the **Run and Debug** view, and expand `this`

  ```
  this.Name        null
  this.TripsToday  0
  ```

- [ ] 📖 *"That is a crew member with no name. The object exists — it has an address, it has fields — and not one of its facts is true yet. `new` made the box; the constructor is what fills it"*
- [ ] **Press <kbd>F10</kbd>** (Step Over). `Name` becomes `"Lindqvist"` in the pane
- [ ] 🎯 *"There. That is an object being built, one fact at a time. We have all written a lot of constructors, and most of us have never watched one run"*

- [ ] **Press <kbd>F5</kbd> to continue.** It stops in the same constructor again
- [ ] 🎯 **This is the one to slow down on:** *"same line, same file — and look at `this`. Name is null again. TripsToday is zero again. This is not the same object with its fields reset. It is a **different object**, and it has its own"*
- [ ] **<kbd>F5</kbd> once more** for Okonkwo, then leave it running

- [ ] **Now the second breakpoint.** Click the gutter beside `TripsToday++;` in `GoesOut()`
- [ ] **<kbd>F5</kbd>.** It stops there — expand `this` again

  ```
  this.Name        "Lindqvist"
  this.TripsToday  0
  ```

- [ ] 🎞️ **GO TO SLIDE 7** — *Which one is `this`?*
- [ ] **<kbd>F10</kbd>.** `TripsToday` goes to 1
- [ ] 🎯 *"One line of code, `TripsToday++`, and it just moved exactly one crew member's counter. Which one? The one `this` is pointing at"*
- [ ] **<kbd>F5</kbd>.** It stops again, and `this` is Reyes, on zero
- [ ] 🎯 **The line the whole segment is for:** *"three objects, three counters, and you can see which one moves. That is the difference the word `static` was hiding from you twenty minutes ago"*

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

- [ ] *"End of watch. Before the duty officer hands over, they walk the board and account for everybody on it"*
- [ ] 📖 *"And they work off a copy — because last week we learned to hand out copies, and a copy is scratch paper. Nothing on the real board can get hurt"*

- [ ] **Paste the muster** in `Program.cs`, directly above the `// ── the board, rendered` comment

  ```csharp
  List<SignOut> muster = new List<SignOut>(outside);

  foreach (SignOut s in muster)
  {
      s.Back();
  }
  ```

- [ ] 🎯 **Ask, then shut up:** *"that marks everybody back, on the copy. What does the real board say?"*

- [ ] **Run it**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ back   │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ back   │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  0 people outside.
  ```

- [ ] 🎞️ **GO TO SLIDE 9** — *Two names, one object*
- [ ] 🎯 **The consequence, and it is the worst one the station has:** *"nobody is outside. Reyes is on the ice. Okonkwo is on the ice. The board has just cleared them both, and the next person to read it has no reason to go looking"*

- [ ] 🎞️ **GO TO SLIDE 10** — *A copy of the list is not a copy of the records*
- [ ] 📖 *"`new List<SignOut>(outside)` is a copy. It is a real one — a second list, its own length, and emptying it would leave the board alone. What it copied is the **list**. What is in it is the same three sign-outs"*
- [ ] 🎯 *"`muster[1]` and `outside[1]` are two names for one record. Write through either name and there is only one thing there to write to"*
- [ ] 💡 **Collect last week honestly, because it was not wrong:** *"last week, `All()` handing back a copy is what stopped anybody emptying the board, and it still does. Tonight is the other half of the sentence — a copy of the list protects the list, and it protects nothing inside it"*

- [ ] **Fix it: the muster reads, it does not write.** Select the five lines from `foreach (SignOut s in muster)` down to its closing `}` and delete them — the `List<SignOut> muster = ...` line above stays
- [ ] **Then paste this at the very bottom of `Program.cs`**

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

- [ ] **Run it**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  2 people outside.
  3 trips logged today.

  Muster - still to account for:
    Reyes - DIG OUT, due 14:45
    Okonkwo - MET RUN, due 15:00
  ```

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The muster reads the board, it does not rewrite it"
  ```

---

## 7 · Nothing at all *(slides 11–12)*

- [ ] *"One more. Somebody else is heading out, and the duty officer types their name"*

- [ ] **Paste this at the bottom of `Program.cs`** — the prompt and the lookup

  ```csharp
  AnsiConsole.WriteLine();
  Console.Write("Who's heading out? ");
  string name = Console.ReadLine() ?? "";

  CrewMember? who = Find(name);
  who.GoesOut();

  AnsiConsole.MarkupLine($"[{Fg}]{Markup.Escape(who.Name)}[/] "
      + $"[{Dim}]- that's trip {who.TripsToday} today.[/]");
  ```

- [ ] **And the search, on the very last line of the file** — a local function, so it has to sit at the bottom

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
  warning CS8602: Dereference of a possibly null reference.

      1 Warning(s)
      0 Error(s)
  ```

- [ ] 💡 **The warning prints twice** — once where it happened and once in the summary. The summary is the line to point at
- [ ] 🎯 *"One warning. Week 2 said the compiler talks to you long before it stops you — and this one is talking about something that has not happened yet"*
- [ ] ⚠️ **Do not fix it.** Run it first

- [ ] **Run it and type `Reyes`.** It works perfectly

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  Who's heading out? Reyes - that's trip 2 today.
  ```

- [ ] 💥 **Run it again — and this time type `Reyez`.** *"Gloves. Minus thirty-nine. One letter"*

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  Who's heading out? Unhandled exception. System.NullReferenceException:
  Object reference not set to an instance of an object.
  ```

- [ ] 🎞️ **GO TO SLIDE 11** — *`CrewMember` and `CrewMember?`*
- [ ] 📖 *"`Find` looked, nobody on station is called Reyez, and it handed back nothing. Then the next line asked that nothing to go outside"*
- [ ] 🎯 *"`null` is not a failure and it is not a bug. It is an answer, and it is the true one. The bug is asking it a question"*
- [ ] 🎞️ **GO TO SLIDE 12** — *The warning that was already there* · *"and the compiler said so at build time, in the quietest possible voice, about a crash that had not happened yet"*

- [ ] **The fix.** Replace the `who.GoesOut();` line and the `MarkupLine` under it with this

  ```csharp
  if (who == null)
  {
      AnsiConsole.MarkupLine($"[{Amber}]Nobody on station by that name. Nothing logged.[/]");
  }
  else
  {
      who.GoesOut();

      AnsiConsole.MarkupLine($"[{Fg}]{Markup.Escape(who.Name)}[/] "
          + $"[{Dim}]- that's trip {who.TripsToday} today.[/]");
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

- [ ] **Run it and type `Reyez` again**

  ```bash
  dotnet run --project week-05/Haldane
  ```

  ```
  Who's heading out? Nobody on station by that name. Nothing logged.
  ```

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
