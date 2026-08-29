# Week 6 Demo — One Loop, Four Kinds of Thing 🧊

**Haldane Station · duty console · day 247**

Tonight the console stops being a board and starts being a **log** — and the room finds out what it costs to put four different kinds of thing on one list, and what it costs not to.

> **The shape of the night:** a log that isn't in time order → one list that can tell you nothing → a promise → a third kind of thing that costs one class → and a board that turns out to be a question.

**Total: ~110 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-06/demo/script.html) and confirm the top line says *day 247*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 6's board is up, and it has the watch log on it for the first time. Say nothing about it
- [ ] ⚠️ **Put week 5's folder back to its finished state — §1 copies out of it.** Whatever you did to it while rehearsing, this makes tonight's carry-forward correct:

  ```bash
  cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-05/demo-starter/Haldane/*.cs week-05/Haldane/
  ```

  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector. The instructor notes live beside them in `demo-starter/NOTES.md`
  - ⚠️ **No `week-05/Haldane` at all?** Make it first, from the same place:

    ```bash
    cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
      && dotnet new console -o week-05/Haldane \
      && dotnet add week-05/Haldane package Spectre.Console --version 0.57.2
    ```

    Then run the copy above.
- [ ] **Commit the restore before you start** — it always shows up as changes, and that is expected. Commit it on `main` so tonight's first commit is tonight's work and nothing else

  ```bash
  git add . && git commit -m "week 5 demo, restored from the answer key"
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 5 left it, with `week-01/` through `week-05/` in it
- [ ] ⚠️ **Run `dotnet run --project week-05/Haldane` once before class.** §1 opens by running it, so it has to build on the night — a cold NuGet cache restoring Spectre in front of the room is a slow first minute
- [ ] ⚠️ **Delete `week-06/` from the demo repo if you've rehearsed.** `dotnet new` refuses to overwrite, and §1 starts with it
- [ ] 💡 **No debugger tonight.** Week 5's segment was the earned one and this week doesn't need it — if a value surprises you, §7's wrap points them back at it
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station that is not this one"*
  - ⚠️ **Reworded from weeks 4 and 5, and only here.** Those say *"on a station of your own"*, which stopped being true when the lab started shipping its own files and the student's own thing became the project. **Weeks 4 and 5 still carry the old wording** — it is a one-line sweep whenever you want it, not something week 6 changed under them

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. It has been a week on the ice"*

  ```bash
  dotnet run --project week-05/Haldane
  ```

- [ ] **Press `b`, then `Reyes`.** She comes back; the row flips

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ back   │ 1     │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  2 people outside.
  3 trips logged today.
  ```

- [ ] 📖 **Fast — this is a refresher, not a re-teach:** *"a board, a desk with four things it can do, and a trip count that belongs to a person"*
- [ ] 🎯 **Then the question the night runs on, and let it sit for a second:** *"so what does this console actually know? It knows who is outside. That is it. Somebody dipped the fuel tank this morning, somebody walked out to the masts and read the temperature at noon, somebody dug a vent out — and this console has never heard of any of it. Everything that happens at this station that isn't a person walking out of a door falls straight on the floor"*
- [ ] **Press `q` to close the desk**

- [ ] **Branch first, and say it as you type it** — *"a branch for tonight, same as every week. Nothing goes straight to `main`, and that goes for your project too"*

  ```bash
  git checkout -b the-promise
  ```

- [ ] 💡 **Five seconds, then stop.** Week 5 already said the new part out loud *(the commits counted are the ones on this week's branch)* and this is not a re-teach — it is a habit being modelled

- [ ] **Now make this week's folder.** No commentary — they have watched this five times

  ```bash
  dotnet new console -o week-06/Haldane
  ```

- [ ] **Carry last week forward — all four files this time, the whole program**

  ```bash
  cp week-05/Haldane/*.cs week-06/Haldane/
  ```

- [ ] 📖 *"Sixth week, and this program has not been written from scratch since week three. It gets copied forward and it gets changed. That is what yours is doing too"*

- [ ] **Add the package**

  ```bash
  dotnet add week-06/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] 💡 **Same reason as last week and worth ten seconds, because they hit it again in the lab tonight** — VS Code learned what was in this folder when it opened, and `week-06` did not exist then

- [ ] **Open `week-06/Haldane/Program.cs`, and move the date on.** <kbd>⌘F</kbd> for **`day 240`** — one hit. Make it read

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbour: 512 km - winter crew - day 247[/]");
  ```

- [ ] **Run it** — the desk they know, one week on

  ```bash
  dotnet run --project week-06/Haldane
  ```

- [ ] **Press `q`**

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step

  ```bash
  git add . && git commit -m "week 6: the desk, carried forward"
  ```

---

## 2 · The log that isn't a log *(slides 2–3)*

- [ ] 📖 *"Sign-outs are the only thing this console writes down. So let's write down the rest — somebody reads the masts twice a day, and that reading is a fact about this station the program keeps nowhere"*

- [ ] **New file, `week-06/Haldane/Reading.cs`.** Paste the whole class

  ```csharp
  public class Reading
  {
      public string Time { get; }
      public double Celsius { get; }
      public CrewMember TakenBy { get; }

      public Reading(string time, double celsius, CrewMember takenBy)
      {
          Time = time;
          Celsius = celsius;
          TakenBy = takenBy;
      }
  }
  ```

- [ ] 📖 **Nothing new in it, and say so** — *"a time, a number, and the person who took it. It holds a crew member rather than a name, which is exactly what a sign-out has done since last week: a reading is taken by somebody"*
- [ ] 💡 **That is week 12's second table arriving as furniture** — *a reading, taken by a person, at a time*. **Don't say that out loud**; it is a shape they will meet again, not a promise to make now

- [ ] **Back in `Program.cs`, two of the crew need names of their own.** <kbd>⌘F</kbd> for **`// ── the board itself`** — one hit. Select from that line down to and including `crew.Add(new CrewMember("Nakamura"));` and paste this over the lot

  ```csharp
  // ── the crew ───────────────────────────────────────────────────────────────
  // The winter crew. Each one is a person the station keeps a count for.

  List<CrewMember> crew = new List<CrewMember>();

  CrewMember okonkwo = new CrewMember("Okonkwo");
  CrewMember reyes = new CrewMember("Reyes");
  CrewMember lindqvist = new CrewMember("Lindqvist");
  CrewMember moretti = new CrewMember("Moretti");
  CrewMember bhatt = new CrewMember("Bhatt");

  crew.Add(okonkwo);
  crew.Add(reyes);
  crew.Add(lindqvist);
  crew.Add(moretti);
  crew.Add(bhatt);
  crew.Add(new CrewMember("Nakamura"));
  ```

- [ ] 💡 *"Moretti does the weather and Bhatt does comms. They need variables now, because the readings underneath have to point at those exact people"*

- [ ] **And the readings themselves.** <kbd>⌘F</kbd> for **`outside.Add(new SignOut("09:05"`** — one hit, the last of the three seeded rows. Paste this **underneath** it

  ```csharp

  // The other things that happen on a watch. Somebody walks out to the masts,
  // reads the instruments and writes the number down.
  List<Reading> readings = new List<Reading>();
  readings.Add(new Reading("12:00", -39.8, moretti));
  readings.Add(new Reading("14:35", -41.5, bhatt));
  ```

- [ ] **Now print them.** Go to the very end of `Program.cs` (<kbd>⌘↓</kbd>) and paste this on the bottom

  ```csharp

  // The watch log: everything that happened, in the order it happened.
  void DrawLog()
  {
      AnsiConsole.MarkupLine($"[{Dim}]Watch log:[/]");

      foreach (SignOut s in outside)
      {
          AnsiConsole.MarkupLine($"[{Dim}]  {Markup.Escape(s.Time)}[/]  "
              + $"[{Amber}]SIGN OUT[/]  "
              + $"[{Fg}]{Markup.Escape(s.Who.Name)} - {Markup.Escape(s.Reason)}, "
              + $"due {Markup.Escape(s.Expected)}[/]");
      }

      foreach (Reading r in readings)
      {
          AnsiConsole.MarkupLine($"[{Dim}]  {Markup.Escape(r.Time)}[/]  "
              + $"[{Amber}]MET     [/]  "
              + $"[{Fg}]{r.Celsius:0.0} C, taken by {Markup.Escape(r.TakenBy.Name)}[/]");
      }

      AnsiConsole.WriteLine();
  }
  ```

- [ ] 📖 **Say what it is before it runs** — *"Two lists, so two loops. The first is holding sign-outs, so it can reach for a reason and a due time. The second is holding readings, so it can reach for a temperature and who took it. Each loop was told what is in it — which is why each line comes out right"*

- [ ] **And call it from the board.** <kbd>⌘F</kbd> for **`trips logged today`** — one hit, near the bottom of `DrawBoard`. **Select that line and the `AnsiConsole.WriteLine();` directly under it**, and paste this over them

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]{tripsToday} trips logged today.[/]");
      AnsiConsole.WriteLine();

      DrawLog();
  ```

- [ ] 🎯 **Predict before it runs, and ask for an answer:** *"the log is going to have five lines on it — three sign-outs and two meteorological readings. Do we have any idea what order they will be in?"* — **and wait**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Watch log:
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 💥 **Let it sit, then be precise about what is wrong with it** — *"nothing crashed, nothing warned me, and every single line on there is true. It is still not a log. Twenty past two, twenty past two, five past nine, midday. A log is a thing you read down"*

- [ ] 🎞️ **GO TO SLIDE 2** — *Two lists, two loops*

- [ ] 📖 **Say the thing the slide cannot:** *"Two loops, and both of them are correct. Nothing is broken, nothing is misspelled — and that is what makes it hard. There is no bug on this slide to find"*

- [ ] 🎞️ **GO TO SLIDE 3** — *You cannot sort your way out*

- [ ] 📖 **Plant the sorting idea — it gets collected at the terminal in a minute:** *"And you cannot sort your way out of it. Not because sorting is hard, but because there is nothing to sort — two lists, one after the other, and the second does not start until the first has finished"*

- [ ] **Back to the terminal, and make it worse — with something real.** Run it, press `o`, and sign **Moretti** out for a `WALK`, back by `15:30`

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Watch log:
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    14:57  SIGN OUT  Moretti - WALK, due 15:30
    12:00  MET       -39.8 C, taken by Moretti
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 🎯 **This is the beat. Point at the fourth line:** *"that is the thing I did five seconds ago, and it is in the middle of the page. The line directly under it happened at midday — three hours earlier"*
- [ ] 🎯 **Set the night up, then hand them the question — and wait:** *"Every new kind of thing that ever happens on this station is another list, another loop, and another place to forget. How can we solve this sorting problem with multiple lists?"*
- [ ] **Press `q`**

---

## 3 · One list, and it can tell you nothing *(slides 4–6)*

- [ ] 📖 *"One list, then. It is the only thing that gets me time order, so let's see what it costs"*

- [ ] **In `Program.cs`.** <kbd>⌘F</kbd> for **`List<SignOut> outside`** — one hit. **Select from that line down to and including `readings.Add(new Reading("14:35", -41.5, bhatt));`** and paste this over the lot

  ```csharp
  SignOut fuelRun = new SignOut("09:05", lindqvist, "FUEL", "10:30");
  SignOut metRun = new SignOut("14:20", okonkwo, "MET RUN", "15:00");
  SignOut digOut = new SignOut("14:20", reyes, "DIG OUT", "14:45");

  // The board: who is outside right now. Same three as last week.
  List<SignOut> outside = new List<SignOut>();
  outside.Add(fuelRun);
  outside.Add(metRun);
  outside.Add(digOut);

  // The log: everything that has happened on this watch, in the order it
  // happened. The same three sign-outs are on it — one object, two lists.
  List<object> log = new List<object>();

  log.Add(fuelRun);
  log.Add(new Reading("12:00", -39.8, moretti));
  log.Add(metRun);
  log.Add(digOut);
  log.Add(new Reading("14:35", -41.5, bhatt));
  ```

- [ ] 📖 **Two things to say, and the second one is a callback** — *"`List<object>`, because `object` is the only thing in C# that a sign-out and a reading both are"*
- [ ] 📖 *"And notice what is on both lists. The same three sign-outs — not copies of them, the same objects. `fuelRun` up there and `fuelRun` on the log are two names for one thing, which is last week's lesson doing us a favor for once"*

- [ ] **Now one loop.** <kbd>⌘F</kbd> for **`void DrawLog()`** — one hit. **Select from that line down to the end of the file** (<kbd>⇧⌘↓</kbd>) and paste this over it

  ```csharp
  // The watch log. One list, one loop.
  void DrawLog()
  {
      AnsiConsole.MarkupLine($"[{Dim}]Watch log:[/]");

      foreach (object entry in log)
      {
          AnsiConsole.MarkupLine($"[{Fg}]  {entry}[/]");
      }

      AnsiConsole.WriteLine();
  }
  ```

- [ ] 💡 **Say the honest reason the body is that short** — *"`object` is the top of the whole type system, and there are about four things you can ask one. Printing it is the only one that looks like it might work"*

- [ ] **Run it**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Watch log:
    SignOut
    Reading
    SignOut
    SignOut
    Reading
  ```

- [ ] 💥 **The second break of the night, and it is the better one. Let it hang:** *"one list. In time order. It builds with nothing to say about it at all — and that is my duty log"*
- [ ] 📖 *"The list did exactly what I asked. I told it the only thing those five have in common is that they are objects, so an object is all it will ever hand me back. It is not hiding what they are. It was never told"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 4** — *`object` promises nothing*

- [ ] 📖 **Name the trade:** *"So I got the one thing I asked for. The log is in time order. And it cost me everything I knew about what was on it"*

- [ ] 🎞️ **GO TO SLIDE 5** — *An interface is a promise*

- [ ] 📖 **Frame it and hand off — the explanation lands at the editor:** *"So here is the idea, and it is one idea. Not a list of things that are the same — a list of things that promise the same. Let's go and write it"*

- [ ] **Back to the editor. New file, `week-06/Haldane/ILogEntry.cs`.** Paste the whole thing

  ```csharp
  // What it takes to go on the watch log.
  //
  // Not a class. Nothing is ever `new ILogEntry(...)` — there is nothing here
  // to make. It is a promise: anything that can answer these three can go on
  // the log, and the log does not care what else it is.
  public interface ILogEntry
  {
      // When it happened. Everything on a log has one of these.
      string Time { get; }

      // One word for the KIND column: SIGN OUT, MET, FUEL.
      string Kind { get; }

      // The rest of the line, and this is the part each kind writes for itself.
      string Line();
  }
  ```

- [ ] 📖 **The definition, and it is the sentence of the night:** *"`interface`, not `class`. There are no bodies in there and there is nothing to make one of. It is a list of what a thing has to be able to answer — and it says nothing whatsoever about what that thing is"*
- [ ] 💡 **The `I` is a convention, not a rule** — *"the `I` on the front is just something C# programmers do so you can tell at a glance. The compiler could not care less"*
- [ ] 📖 **Then walk the three, because so far they have only heard the syntax:** *"three things, and that is the whole promise. `Time` — when it happened. `Kind` — one word for what sort of thing it was: MET, SIGN OUT, FUEL. And `Line()` — the rest of the line, handed back as a string. Not printed. Returned — the loop does the printing"*

- [ ] **Now `SignOut.cs`, and this is one phrase.** <kbd>⌘F</kbd> for **`public class SignOut`** — one hit. Make the line read

  ```csharp
  public class SignOut : ILogEntry
  ```

- [ ] 🎯 **Build it before writing a single member — this is the beat, not the typing**

  ```bash
  dotnet build week-06/Haldane
  ```

  ```
  SignOut.cs(1,24): error CS0535: 'SignOut' does not implement interface member 'ILogEntry.Kind'
  SignOut.cs(1,24): error CS0535: 'SignOut' does not implement interface member 'ILogEntry.Line()'

  Build FAILED.
      0 Warning(s)
      2 Error(s)
  ```

- [ ] 🎞️ **GO TO SLIDE 6** — *The compiler writes the to-do list*

- [ ] 🎯 **Point at what is NOT in that list:** *"I promised three things and it is only asking me for two. `Time` is not on there — this class has had a `Time` on it since week three, and the promise looked, found one, and moved on. That is the whole idea: a promise is about what you can answer, and this class could already answer one of them"*
- [ ] 💡 *"And read the other two again — that is a to-do list the compiler wrote for me. It is going to keep failing the build until I have done both"*

- [ ] **Pay it.** Still in `SignOut.cs` — go to the end of the file (<kbd>⌘↓</kbd>) and paste this **inside the class**, above its closing `}`

  ```csharp

      // ── the promise the watch log asks for ─────────────────────────────────
      // Time was already here. These two are everything this class had to add
      // to go on the log, and nothing above this line changed to make room.

      public string Kind => "SIGN OUT";

      public string Line()
      {
          string state = IsBack ? "back" : $"due {Expected}";
          return $"{Who.Name} - {Reason}, {state}";
      }
  ```

- [ ] 📖 *"And `Line` is the interesting one, because a sign-out knows something nothing else does — whether they came back. Its line reads differently depending, and nothing outside this class has to know that"*

- [ ] **Same two moves in `Reading.cs`.** <kbd>⌘F</kbd> for **`public class Reading`** — one hit. Make the line read

  ```csharp
  public class Reading : ILogEntry
  ```

- [ ] **Then paste these two inside the class, above its closing `}`**

  ```csharp

      public string Kind => "MET";

      public string Line()
      {
          return $"{Celsius:0.0} C, taken by {TakenBy.Name}";
      }
  ```

- [ ] 💡 **Don't narrate that one** — it is the same move, and the room should feel it is the same move

- [ ] **Now the one-word change.** Back in `Program.cs`, <kbd>⌘F</kbd> for **`List<object> log`** — one hit. Make the line read

  ```csharp
  List<ILogEntry> log = new List<ILogEntry>();
  ```

- [ ] 🎯 **Say it while it is on screen:** *"one word. That list has just gone from holding anything and promising nothing, to holding anything that promises three things"*

- [ ] **And the loop can finally ask.** <kbd>⌘F</kbd> for **`foreach (object entry in log)`** — one hit. **Select from that line down to and including the `}` that closes it**, and paste this over

  ```csharp
      foreach (ILogEntry entry in log)
      {
          AnsiConsole.MarkupLine($"[{Dim}]  {Markup.Escape(entry.Time)}[/]  "
              + $"[{Amber}]{Markup.Escape(entry.Kind),-8}[/]  "
              + $"[{Fg}]{Markup.Escape(entry.Line())}[/]");
      }
  ```

- [ ] **Run it**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Watch log:
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 🎯 **Point at the loop, then at the screen:** *"one `MarkupLine`. Two completely different classes went through it — one of them holds a person and a return time, the other holds a temperature — and that loop cannot name either of them"*
- [ ] 💡 **Give it its name here, where it is a good thing — not in §6, where it runs out:** *"that has a name, and the name is the least interesting part of it. Polymorphism. One loop, different kinds of things, it never asks which is which — and every one of them answered differently. That is the point: it doesn't matter how each one answers, as long as the promise is kept"*

- [ ] **One more before you close it — the desk is still running. Press `b`, then `Reyes`, and look at the LOG, not the board**

  ```
  Watch log:
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, back
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 🎯 **Then the distinction, and keep it clear of the one you just made:** *"that is not a fourth kind of thing, and it is not the loop being clever. That is the same sign-out, answering the same question, differently — because something happened to it. `due 14:45` became `back`, and `DrawLog` has no idea any of that took place"*
- [ ] 💡 **This collects the `Line()` claim from a few minutes ago** — the sheet said a sign-out knows something nothing else does. **Now they have watched it happen** instead of being told
- [ ] 💡 **If somebody asks why a line stamped `14:20` says `back`, that is a good question and the answer plants §6** — *"the log records the trip. The board records what is true now. Hold on to that"*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The log takes anything that keeps a promise"
  ```

---

## 4 · The third kind *(slide 7)*

- [ ] 📖 *"Right. Somebody dips the generator's day tank every morning and writes the number on a clipboard. That is not a sign-out and it is not a weather reading"*

- [ ] **New file, `week-06/Haldane/FuelCheck.cs`.** Paste the whole class

  ```csharp
  // The generator day tank, dipped and written down.
  //
  // Two properties and a sentence. That is the entire cost of a new kind of
  // thing on this log.
  public class FuelCheck : ILogEntry
  {
      public string Time { get; }
      public int Liters { get; }

      public string Kind => "FUEL";

      public FuelCheck(string time, int liters)
      {
          Time = time;
          Liters = liters;
      }

      public string Line()
      {
          return $"day tank {Liters} L";
      }
  }
  ```

- [ ] **And put one on the log.** <kbd>⌘F</kbd> for **`log.Add(fuelRun);`** — one hit. **Select that line** and paste these two over it

  ```csharp
  log.Add(new FuelCheck("07:40", 4300));
  log.Add(fuelRun);
  ```

- [ ] 🎯 **Before you run it — ask, and wait:** *"what do I have to change in `DrawLog` to make this print?"*

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Watch log:
    07:40  FUEL      day tank 4300 L
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 🎯 **The payoff, and it is the whole reason this thing exists. Scroll to `DrawLog` and put the cursor in it:** *"nothing. I wrote a new class, I put one on the list, and this loop printed it. I have not touched this loop since the promise landed, and it has never heard of a fuel check"*
- [ ] 💡 **The number is a callback and it costs one sentence** — *"four thousand three hundred liters, which some of you may remember dividing by eight hundred in week one"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 7** — *A new kind costs one class*

- [ ] 📖 **Name what it cost:** *"A whole new kind of thing on the log. One new class, one line to put it on there, and nothing that already worked had to change"*

- [ ] **One more, and this time the log grows while they watch.** In `Program.cs`, <kbd>⌘F</kbd> for **`void AmendABackBy()`** — one hit. Paste this **above** it

  ```csharp
  void TakeAReading()
  {
      Console.Write("  Who took it: ");
      string name = Console.ReadLine() ?? "";
      Console.Write("  Reading (C): ");
      string typed = Console.ReadLine() ?? "";

      CrewMember? who = Find(name.Trim());

      if (who == null)
      {
          AnsiConsole.MarkupLine($"[{Amber}]  Nobody on station by that name. Nothing logged.[/]");
          return;
      }

      // Week 2's guard, still earning its keep: a reading that isn't a number
      // is not a reading, and the log is not the place to find that out.
      if (!double.TryParse(typed.Trim(), out double celsius))
      {
          AnsiConsole.MarkupLine($"[{Amber}]  That isn't a temperature. Nothing logged.[/]");
          return;
      }

      log.Add(new Reading("15:02", celsius, who));
      DrawBoard();
  }

  ```

- [ ] **Wire it to a key.** <kbd>⌘F</kbd> for **`case "w":`** — one hit. **Select from that line down to and including the `break;` under it**, and paste this over them

  ```csharp
          case "w":
              LookSomebodyUp();
              break;

          case "m":
              TakeAReading();
              break;
  ```

- [ ] **And the menu.** <kbd>⌘F</kbd> for **`[w]ho  [q]uit`** — one hit. Make the line read

  ```csharp
      Console.Write("[o]ut  [a]mend  [b]ack  [w]ho  [m]et  [q]uit: ");
  ```

- [ ] **Run it, press `m`, and put `Nakamura` out on the masts with a reading of `-44`**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
    14:35  MET       -41.5 C, taken by Bhatt
    15:02  MET       -44.0 C, taken by Nakamura
  ```

- [ ] 📖 *"Seven entries now, three different classes, one loop, and the console is finally writing down the things that actually happen here"*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "A fuel check is a log entry too"
  ```

---

## 5 · A promise is not a parent *(slides 8–10)*

**No code in this segment. Two files already on screen do all the work.**

- [ ] 🎞️ **GO TO SLIDE 8** — *A promise is not a parent*

- [ ] 📖 **The question somebody is holding, asked out loud so it gets answered:** *"three classes now say `: ILogEntry` after their name, and that looks an awful lot like saying one thing is a kind of another. It is not, and the difference matters"*
- [ ] 📖 *"A sign-out is not a kind of log entry. It is a record of a person leaving a building at forty below, and it was that in week three before any of this existed. What changed tonight is that it can now answer three questions. Nothing about what it IS changed at all — look at the file: everything above those two members is exactly what it was this morning"*

- [ ] 🎞️ **GO TO SLIDE 9** — *One parent. As many promises as you like*

- [ ] 📖 **The rule, said plainly and then left alone:** *"C# lets a class have one parent and as many promises as it likes. That is not an arbitrary limit — it is the language saying what a thing IS is one answer, and what it can DO is a list"*
- [ ] 💡 **If somebody asks about `abstract class` — thirty seconds, and do not open an editor:** *"there is a way to say 'is a kind of' in C#, and it is a real tool with real uses. It is also a much bigger promise: you inherit somebody else's fields and behavior along with it, and you only get one. Interfaces are the small promise, and the small promise is the one you want most of the time"*
- [ ] 🎯 **The test, and this is the thing to leave them with:** *"when you are staring at two classes wondering whether they belong together, do not ask what they are. Ask what somebody needs them to DO — and if the answer is the same sentence for both, that sentence is your interface"*

- [ ] 🎞️ **GO TO SLIDE 10** — *Four words, three of them yours*

- [ ] 🎯 **Ask for hands first and pitch from what comes back — do not assume either way:** *"who wrote a class last semester that inherited from another one?"* — **and wait**
- [ ] 📖 **Then the map. This is a retrospective, not a lecture** — *"there are four words people use about this kind of code, and you have built three of them already without anybody saying them out loud"*
- [ ] 📖 **One beat per line on the slide, and keep them moving** — *"Encapsulation — week four. `Expected` has a setter that refuses a blank, so nothing outside the class can put rubbish in it. You wrote that three weeks ago"* · *"Abstraction — tonight. That loop knows three questions and nothing whatsoever about what it is holding"* · *"Polymorphism — also tonight, and we have already named it. `Line()` doing three different jobs while the loop cannot tell them apart"*
- [ ] 🎯 **The fourth one is the point, so slow down for it:** *"and inheritance is the one you have not used, in six weeks. That is not an accident. It is a real tool — but you reach for the small promise first, and for a parent only when you have shared behaviour to hand down. That is the whole judgment call, and now you have the four words for it"*
- [ ] 💡 **If somebody asks how abstraction differs from encapsulation, answer it operationally and move on** — *"encapsulation is about what gets IN. Abstraction is about what the caller has to KNOW"* · ⚠️ **do not let this one run**, it is a genuinely muddy distinction and it will eat the segment
- [ ] ⚠️ **Running long? This is the beat to shorten** — drop the hands question and the abstraction aside and say the four lines straight off the slide. **Nothing later in the night depends on it**

---

## 6 · The board is a question you ask the log *(slides 11–12)*

- [ ] 📖 *"One thing left, and it has been sitting in this program since the log existed"*

- [ ] **Run it, press `o`, and sign `Moretti` out for a `WALK`, back by `15:30`**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Moretti   │ WALK    │ 15:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.

  Watch log:
    07:40  FUEL      day tank 4300 L
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 💥 **Do not point at it yet. Ask:** *"the board says four people are outside. How many sign-outs are on the log?"* — **and wait for somebody to count them**
- [ ] 🎯 **Then say what happened, and stay flat about it:** *"Moretti is outside. The station's own record of this watch has never heard of her. No error, no warning, and the board looks perfect"*
- [ ] 📖 **The cause, in one sentence:** *"there are two lists in this program holding the same things, and when I sign somebody out I only remember to tell one of them. I wrote that method three weeks ago and it has been quietly wrong since the moment the log existed"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 11** — *Two lists. One of them forgot*

- [ ] 📖 **And rule out the cheap fix out loud, because somebody is about to suggest it:** *"I could add the missing line. Then next week there is a third place, and a fourth. The board and the log hold the same sign-outs — one of them has to go, and it is not going to be the log"*

- [ ] **So: ask the log.** Go to the end of `Program.cs` (<kbd>⌘↓</kbd>) and paste this on the bottom

  ```csharp

  // Every sign-out on the log, and nothing else. `is` asks an entry what it
  // actually turned out to be, and hands it over under that name.
  List<SignOut> SignOuts()
  {
      List<SignOut> found = new List<SignOut>();

      foreach (ILogEntry entry in log)
      {
          if (entry is SignOut s)
          {
              found.Add(s);
          }
      }

      return found;
  }
  ```

- [ ] 📖 **The one new piece of syntax tonight, and it is worth thirty seconds:** *"`entry is SignOut s`. It asks the entry what it actually turned out to be, and if the answer is yes it hands it to me under a name I can use — `s` is a `SignOut` from there on, so I can ask it about `IsBack` and the promise never mentioned that"*
- [ ] 🎯 **And the honest limit, which is the point of the segment:** *"this is what polymorphism cannot do for you. One loop treating everything the same is the whole trick — right up to the moment you need the one kind that is different, and then you have to ask"*
- [ ] 💡 **Nothing to run yet, and say so** — *"I have written it, and not one line in this program calls it. Watch what it costs to change that"*

- [ ] **Now point the board at it.** <kbd>⌘F</kbd> for **`in outside)`** — the editor says **5**. Open Replace (<kbd>⌥⌘F</kbd>), put **`in SignOuts())`** in the replace box, and **Replace All**
- [ ] 💡 *"Five places asked the board a question. All five of them now ask the log"*
- [ ] 💡 **Still nothing new on screen, and that is worth naming** — *"the board asks the log now. But the desk still writes a new sign-out to the old list, so nothing has actually moved yet. One more edit"*

- [ ] **The muster's copy, and the comment above it, which has just stopped being true.** <kbd>⌘F</kbd> for **`A copy, because the next loop`** — one hit. **Select from that line down to and including `List<SignOut> muster = new List<SignOut>(outside);`** and paste this over the three

  ```csharp
      // SignOuts() builds a fresh list every time it is asked, so crossing
      // names off this one cannot reach the log.
      List<SignOut> muster = SignOuts();
  ```

- [ ] 💡 *"That was last week's copy, and it is free now — `SignOuts` builds a fresh list every time you ask, so there is nothing left to protect"*
- [ ] 💡 **And the other half, because it is what makes `[b]ack` work at all** — *"the list is new every time. The records inside it are not — they are the same objects that are sitting on the log. Crossing a name off this list cannot touch the log. Calling `Back()` on one of these records absolutely does, and that is week five, still true"*

- [ ] **And the one that caused all this.** <kbd>⌘F</kbd> for **`outside.Add(new SignOut("14:57"`** — one hit, inside `SignSomebodyOut`. Make it read

  ```csharp
          log.Add(new SignOut("14:57", who, reason.Trim(), expected.Trim()));
  ```

- [ ] **Run it, press `o`, sign `Moretti` out for a `WALK` back by `15:30` again**

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  │ 14:57 │ Moretti   │ WALK    │ 15:30    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.

  Watch log:
    07:40  FUEL      day tank 4300 L
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    14:35  MET       -41.5 C, taken by Bhatt
    14:57  SIGN OUT  Moretti - WALK, due 15:30
  ```

- [ ] 🎯 **Point at both:** *"the board and the log cannot disagree any more — and not because I remembered to update both. There is nothing to remember. There is one list, and the board is just the log, filtered"*
- [ ] **Press `q`**

- [ ] **Then take the board out.** <kbd>⌘F</kbd> for **`SignOut fuelRun`** — one hit. **Select from that line down to and including `log.Add(new Reading("14:35", -41.5, bhatt));`** and paste this over the lot

  ```csharp
  // ── the watch log ──────────────────────────────────────────────────────────
  // One book. Everything that has happened since the watch started, in the
  // order it happened — and going outside is only one of the things that
  // happen here.
  //
  // Three different classes are in this list. It holds them because every one
  // of them keeps ILogEntry's promise, and for no other reason.

  List<ILogEntry> log = new List<ILogEntry>();

  log.Add(new FuelCheck("07:40", 4300));
  log.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
  log.Add(new Reading("12:00", -39.8, moretti));
  log.Add(new SignOut("14:20", okonkwo, "MET RUN", "15:00"));
  log.Add(new SignOut("14:20", reyes, "DIG OUT", "14:45"));
  log.Add(new Reading("14:35", -41.5, bhatt));
  ```

- [ ] 📖 *"The board is not gone — it is drawn from the log now. What is gone is the second list: not hidden, not renamed, there is no list of who is outside in this program any more"*

- [ ] **Run it once more, and do exactly the same thing** — `o`, `Moretti`, `WALK`, back by `15:30`

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  4 people outside.
  4 trips logged today.
  ```

- [ ] 🎯 **The same board, the same log, the same numbers — and that is the point:** *"I deleted a list and nothing changed. That is not luck. That is how you find out a thing was dead: you stop reading it, you prove nothing moved, and only then do you take it out"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 12** — *Ask, when one kind is different*

- [ ] 📖 **Point at the slide and say what it is doing:** *"this is how you tell one kind from another when you have to — and here we have to, because the board needs a list of just the sign-outs"*
- [ ] 💡 **Then the one thing nothing else says — and cut this first if §6 is running long:** *"One of those `if`s is fine. A chain of them — is this one a sign-out, else is it a reading, else is it a fuel check — is the code telling you something: the thing you keep asking about should have been a question on the interface instead"*

- [ ] 📖 **Before you paste, point at the top of the board:** *"look at that temperature. `Outside: -41.5`. I typed that into the program in week one and it has been sitting there ever since — nobody measured it, and it has never once changed. Watch where it comes from now"*
- [ ] **One more, and it is the closing beat.** <kbd>⌘F</kbd> for **`Safe to go out`** — one hit, in `DrawBoard`. **Select from the `AnsiConsole.MarkupLine($"[{Dim}]Outside:[/]…` line down to and including the `[/]");` under it**, and paste this over them

  ```csharp
      // The headline temperature is not typed into this program any more. It is
      // the last reading anybody actually took, read straight off the log.
      double latest = LatestCelsius();

      AnsiConsole.MarkupLine($"[{Dim}]Outside:[/] [{Cold}]{latest:0.0} C[/]   "
          + $"[{Dim}]Safe to go out:[/] [{Fg}]{Conditions.IsSafeToGoOut(latest, false)}[/]");
  ```

- [ ] 💡 **Two lines, and say what each one does** — *"ask the log for the most recent reading, then hand that number to the same week-one method that has been answering this question all along. `IsSafeToGoOut` does not change at all — it just stops being fed a constant"*
- [ ] 📖 **Say what it does as it goes in:** *"walk the log, and every time you find a reading, remember it. You finish holding the LAST one, because each reading overwrites the one before. And it starts at minus forty-one point five, so the board still has a number to show if nobody has taken a reading yet"*
- [ ] **And the method it needs.** End of the file (<kbd>⌘↓</kbd>), paste on the bottom

  ```csharp

  // The last temperature anybody wrote down. Same question, different type.
  double LatestCelsius()
  {
      double latest = -41.5;

      foreach (ILogEntry entry in log)
      {
          if (entry is Reading r)
          {
              latest = r.Celsius;
          }
      }

      return latest;
  }
  ```

- [ ] 💡 *"Same shape, one word different. `is Reading r` instead of `is SignOut s`"*

- [ ] 🎯 **Run it, press `m`, and have `Moretti` come back with a reading of `-52.4`.** Predict first — *"what is going to change on this board?"*

  ```bash
  dotnet run --project week-06/Haldane
  ```

  ```
  Outside: -52.4 C   Safe to go out: False
  ```

- [ ] 🎯 **This is the last thing they see tonight, so land it:** *"that line was the first thing this console ever computed. Week one, `IsSafeToGoOut`, and for five weeks it has been reading a number I typed into the program. It has just started reading a number somebody went outside and measured"*
- [ ] **Press `q`**

- [ ] **Save it, and push.** Silent — two lines, no commentary

  ```bash
  git add . && git commit -m "The board is a question, not a list"
  ```

  ```bash
  git push -u origin the-promise
  ```

---

## 7 · Hand off *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Lab: the hour*

- [ ] 📖 *"Your turn, and it is the same idea in a place where it matters more. An hour of radio is not songs. It is songs, and the station ID you are legally required to run, and the ads somebody paid for, and the forecast. Four different kinds of thing, one hour, one loop"*
- [ ] 🎯 **Define done on their machine:** *"you are done when you press `a` at the desk and six things go out over the air in a row — and one of them counts up, one counts down, and the loop that ran them cannot tell you which is which"*
- [ ] 💡 **Point at Setup step 3 and the window reload** — same as last week, and it is the reason <kbd>F5</kbd> will find this week's project

---

## 8 · Wrap *(slide 14)*

- [ ] 🎞️ **GO TO SLIDE 14** — *Tonight, in one picture*

- [ ] 📖 **Four sentences, and then stop** — *"a class says what a thing is. An interface says what it can answer. One list holds anything that answers, and one loop is all it takes. And when you need the one kind that is different, you ask"*
- [ ] 🎯 **The forward line, and it is a real promise:** *"the log is one list, in order, and it is the record of this watch. Next time you shut the program down it is gone — and in week eight it stops being gone"*
- [ ] **Homework: two URLs in Canvas, coursework repo first, project repo second**
- [ ] ⚠️ **Say the checks line out loud, because it cost people last week** — *"your project's checks are different every week. Part 1 copies this week's in. Skip it and last week's will happily tell you five out of five before you have written anything"*
