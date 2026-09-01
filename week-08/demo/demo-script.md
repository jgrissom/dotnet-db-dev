# Week 8 Demo — The Log Stops Being Gone 🧊

**Haldane Station · duty console · day 261**

Tonight the station's book survives the program that keeps it — and the room finds out that a file is a text file, which is the good news and the bad news.

> **The shape of the night:** the loss, collected → a save file a human can read and the program cannot → a format both can read → it is still there → a real clock → the fact week 7 could not write → and then somebody edits the file by hand.

**Total: ~140 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html) and confirm the top line says *day 261*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 8's board is up. Say nothing about it
- [ ] ⚠️ **Put week 7's folder back to its finished state — §1 copies out of it.** Whatever you did to it while rehearsing, this makes tonight's carry-forward correct:

  ```bash
  cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-07/demo-starter/Haldane/*.cs week-07/Haldane/ \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-07/demo-starter/Haldane.Tests/WatchTests.cs week-07/Haldane.Tests/
  ```

  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector. The instructor notes live beside them in `demo-starter/NOTES.md`
- [ ] ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — `week-08/Haldane`, `week-08/Haldane.Tests` **and `week-08/watch-log.txt`**. `dotnet new` refuses to overwrite the first two, and a leftover log file skips §5's whole payoff by making the save file already exist

  ```bash
  rm -rf week-08
  ```

- [ ] **Commit the restore before you start** — it always shows up as changes, and that is expected

  ```bash
  git add . && git commit -m "week 7 demo, restored from the answer key"
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 7 left it, with `week-01/` through `week-07/` in it
- [ ] ⚠️ **Run `dotnet run --project week-07/Haldane` once before class.** §1 opens by running it, so it has to build on the night
- [ ] 💡 **The clock is real from §6 on, so the times in this sheet's output blocks are MINE, not yours.** Every log line you make tonight is stamped with station time — UTC — and the sheet says so at each one. Nothing else in the blocks moves
- [ ] 💡 **No debugger tonight.** If a path is not what you think it is, the week-5 offer still stands quietly — a breakpoint on the line that builds it beats guessing
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station that is not this one"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. The console keeps a log, it is tested, and two real bugs came off the board."*

  ```bash
  dotnet run --project week-07/Haldane
  ```

- [ ] **Press `m`, and have `Bhatt` phone in a reading of `-42.4`.** The log grows a line, the headline number changes
- [ ] **Press `q` to close the desk**

- [ ] 🎯 **Then the question the night runs on, and let it sit:** *"Everything you just watched me do is gone. It went when the program went. Every reading since week three, every sign-out, every night — gone at the moment I press q. Tonight is the week I told you about in week three."*

- [ ] **Branch first, and say it as you type it** — *"a branch for tonight, same as every week. Nothing goes straight to `main`, and that goes for your project too"*

  ```bash
  git checkout -b the-log-book
  ```

- [ ] **Now make this week's folder.** No commentary — they have watched this seven times

  ```bash
  dotnet new console -o week-08/Haldane
  ```

  ```bash
  dotnet add week-08/Haldane package Spectre.Console --version 0.57.2
  ```

  ```bash
  cp week-07/Haldane/*.cs week-08/Haldane/
  ```

- [ ] **And the suite comes too.** Same two moves, one template along

  ```bash
  dotnet new xunit -o week-08/Haldane.Tests
  ```

  ```bash
  cp week-07/Haldane.Tests/WatchTests.cs week-07/Haldane.Tests/Haldane.Tests.csproj week-07/Haldane.Tests/Directory.Build.rsp week-08/Haldane.Tests/
  ```

  ```bash
  rm week-08/Haldane.Tests/UnitTest1.cs
  ```

- [ ] 📖 *"Eighth week, and this program has not been written from scratch since week three. The tests come with it — three facts that were true last Tuesday and are still true now."*

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] **Open `week-08/Haldane/Program.cs`, and move the date on.** <kbd>⌘F</kbd> for **`day 254`** — one hit. Make it read

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbor: 512 km - winter crew - day 261[/]");
  ```

- [ ] **Prove the suite came across**

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
  Total tests: 3
       Passed: 3
  ```

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step

  ```bash
  git add . && git commit -m "week 8: the desk, carried forward"
  ```

---

## 2 · Gone *(slides 2–4)*

- [ ] **Run it, press `o`, and sign `Nakamura` out — `WALK`, back by `19:40`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  ```

- [ ] 📖 *"Nakamura is on the ice. Four people out, and the book has seven lines in it."*
- [ ] **Press `q`, and run it again — nothing else**

  ```bash
  dotnet run --project week-08/Haldane
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

- [ ] 💥 **Do not explain it. Ask, and wait:** *"Where is Nakamura?"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 2** — *Gone*

- [ ] 🎯 **Collect the promise, and name where it was made:** *"Week three, I had you type three records in and quit, and I said I wanted you to be annoyed by it. Week six I said it again about this log. Last week I said it a third time. Every one of those times I told you the week: it was this one."*
- [ ] 📖 **Then be precise about what is happening, because it is not a bug:** *"The list is in memory. Memory belongs to the process. The process ended. There is no defect here and there is nothing to fix — every program ever written does this."*

- [ ] 🎞️ **GO TO SLIDE 3** — *The test you cannot write*

- [ ] 🎯 **The week-7 hook, and this is the one that lands with this room:** *"Last week you learned to write down a rule so a machine re-asks it forever. Try to write this one: the log is still there after a restart. You cannot. There is nothing to call. The suite can ask my program anything it likes, and the one question it cannot ask is whether anything survives the program."*
- [ ] 💡 *"Hold that. It is the last thing we do tonight."*

- [ ] 🎞️ **GO TO SLIDE 4** — *A file is a place to put text*

- [ ] 📖 **Read the six off the slide, fast — no editor:** *"Six methods, all on `File`, all one line. Nothing to open, nothing to close, nothing to remember to shut. Write the whole thing, read the whole thing. Write a list of lines, read a list of lines. Add to the end. And ask whether it is there at all."*
- [ ] 🎯 **Then the one distinction that costs people a night, and say it slowly:** *"`WriteAllText` starts the file over. Everything that was in it is gone. `AppendAllText` adds to the end and keeps what was there. One of those is a save file and the other is a log, and picking the wrong one does not crash — it just quietly forgets, or quietly never stops."*

---

## 3 · Readable, and useless *(slides 5–6)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Where the file actually goes*

- [ ] 📖 **Before any code, because it decides how everything else is written:** *"A relative path — a plain name — is worked out from the folder you were standing in when you started the program. Not from where the program lives. We always run from the top of the repo, so a name with the week in front of it lands next to the week's projects."*
- [ ] 🎯 **Then the measured half, off the slide:** *"`dotnet test` does not stand where `dotnet run` stands. It runs from inside the test project's build folder. So the same plain name means two different files depending on which command you typed. That is why nothing in this course writes a file name inside a class. The path gets handed in."*

- [ ] **Now the first save. Open `week-08/Haldane/Watch.cs`, go to the end of the file (<kbd>⌘↓</kbd>), select the last line — it is a single `}` — and paste this over it**

  ```csharp

      // ── the book on disk ───────────────────────────────────────────────────

      // One line per entry, exactly as the log prints it.
      public void Save(string path)
      {
          List<string> lines = new List<string>();

          foreach (ILogEntry entry in _entries)
          {
              lines.Add($"{entry.Time}  {entry.Kind}  {entry.Line()}");
          }

          File.WriteAllLines(path, lines);
      }
  }
  ```

- [ ] 📖 *"One line per entry, built out of the three things every entry can answer. `WriteAllLines` takes a list of strings and puts each one on its own line."*

- [ ] **Now `Program.cs` decides where.** <kbd>⌘F</kbd> for **`Watch watch = new Watch();`** — one hit. **Select that one line and paste this over it**

  ```csharp
  Watch watch = new Watch();

  // Where the book lives. A relative path is worked out from where you were
  // STANDING when you ran the program, not from where the program is — and every
  // command in this course runs from the top of the repo, so this lands in the
  // week folder, next to the project.
  //
  // Nothing inside Watch knows this name. The path is handed in, which is the
  // only reason a test can hand it a scratch file instead of the station's book.
  string logFile = "week-08/watch-log.txt";
  ```

- [ ] **And write it at the handover.** <kbd>⌘F</kbd> for **`EndOfWatch();`** — one hit. **Select that one line and paste this over it**

  ```csharp
  // The watch is handed over, so the book gets written up: load at the start,
  // save at the end. A program that only saves at the end is a program that
  // loses the whole night to one crash — which is among the things a database
  // does better, and that is week 10.
  watch.Save(logFile);

  EndOfWatch();
  ```

- [ ] 📖 **Point at the two lines:** *"Load at the start, save at the end. Right now there is no load, so this is half a trip — and the end of the watch is when a duty officer writes the book up anyway."*

- [ ] **Run it, sign `Reyes` back in with `b`, then `q`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

- [ ] 🎞️ **GO TO SLIDE 6** — *Readable, and useless*

- [ ] 🎯 **Open `week-08/watch-log.txt` from the Explorer and put it on screen.** Let them look at it for a second before you say anything

  ```
  07:40  FUEL  day tank 4300 L
  09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
  12:00  MET  -39.8 C, taken by Moretti
  14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
  14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
  14:35  MET       -41.5 C, taken by Bhatt
  ```

- [ ] 📖 *"There it is. The station's day, on disk, and it outlived the program. I can read every line of that."*
- [ ] 💥 **Then the turn, and ask it as a real question:** *"Now write me the method that reads it back in. Look at the second line. Where does the name stop and the reason start?"*
- [ ] 🎯 **Let somebody try, then land it:** *"`Lindqvist - FUEL, due 10:30` is a sentence. To get a sign-out back out of that, I have to hunt for a dash. Then a comma. Then the word 'due'. Every one of those is a decision `Line()` made about how to talk to a person. It is allowed to change that wording next week. Then this file stops loading."*
- [ ] 📖 **The finding, in one line:** *"A file a human can read and a program cannot is half a save file. I need one where the pieces are still pieces."*

---

## 4 · A format both sides can read *(slides 7–8)*

- [ ] 🎞️ **GO TO SLIDE 7** — *The kind word comes first*

- [ ] 📖 **Off the slide, before the paste:** *"Three decisions. The kind word goes first, so reading a line tells me what it is before I look at any of it. The fields get separated by something that cannot turn up inside a field — a pipe, not a comma, because commas are everywhere in real text. And nothing that can be worked out gets written down."*

- [ ] **In `Watch.cs`, replace the save you just wrote.** <kbd>⌘F</kbd> for **`// One line per entry, exactly as the log prints it.`** — one hit. **Select from that line down to and including `File.WriteAllLines(path, lines);` and paste this over it** — the `}` under it stays where it is

  ```csharp
      // The path is handed in and never written down in here. Where the file
      // goes is a decision about the machine the program is running on, and this
      // class does not know anything about that machine. It is also what lets a
      // test hand in a scratch file instead of the station's real log.

      // One line per entry, and the KIND word comes first so that reading it
      // back knows what it is looking at before it looks at anything else.
      public void Save(string path)
      {
          List<string> lines = new List<string>();

          foreach (ILogEntry entry in _entries)
          {
              if (entry is SignOut s)
              {
                  lines.Add($"SIGNOUT|{s.Time}|{s.Who.Name}|{s.Reason}|{s.Expected}|"
                      + (s.IsBack ? "back" : "out"));
              }
              else if (entry is Reading r)
              {
                  // The same number on every machine, whatever its language is
                  // set to. Left alone, a temperature can go into the file as
                  // -39,8 and come back out as nothing at all.
                  lines.Add($"MET|{r.Time}|"
                      + r.Celsius.ToString("0.0", CultureInfo.InvariantCulture)
                      + $"|{r.TakenBy.Name}");
              }
              else if (entry is FuelCheck f)
              {
                  lines.Add($"FUEL|{f.Time}|{f.Liters}");
              }
          }

          File.WriteAllLines(path, lines);
  ```

- [ ] 📖 *"`is` again — week six, asking each entry what it actually turned out to be. Three kinds, three shapes of line."*
- [ ] **That needs one import.** <kbd>⌘F</kbd> for **`public class Watch`** — one hit. **Select that one line and paste this over it**

  ```csharp
  //
  // Week 8 adds three things: a clock, an order, and a file.
  using System.Globalization;

  public class Watch
  ```

- [ ] **Now the way back in. Go to the end of `Watch.cs` (<kbd>⌘↓</kbd>), select the last line — a single `}` — and paste this over it**

  ```csharp

      // Read the day back. The crew list is here because a line says "Okonkwo"
      // and this log holds the man — the same object the board counts trips on,
      // never a second Okonkwo with the same name.
      public void Load(string path, List<CrewMember> crew)
      {
          _entries.Clear();

          foreach (string line in File.ReadAllLines(path))
          {
              string[] field = line.Split('|');

              if (field[0] == "SIGNOUT" && field.Length == 6)
              {
                  CrewMember? who = Lookup(crew, field[2]);

                  if (who != null)
                  {
                      // Making the record is what counts the trip — it always
                      // was — so the crew's trip counts come back for free.
                      SignOut s = new SignOut(field[1], who, field[3], field[4]);

                      if (field[5] == "back")
                      {
                          s.Back();
                      }

                      Add(s);
                  }
              }
              else if (field[0] == "MET" && field.Length == 4)
              {
                  CrewMember? who = Lookup(crew, field[3]);

                  if (who != null
                      && double.TryParse(field[2], NumberStyles.Float,
                          CultureInfo.InvariantCulture, out double celsius))
                  {
                      Add(new Reading(field[1], celsius, who));
                  }
              }
              else if (field[0] == "FUEL" && field.Length == 3
                  && int.TryParse(field[2], out int liters))
              {
                  Add(new FuelCheck(field[1], liters));
              }
          }
      }

      // Week 5's Find, one more time: the person, or nothing at all.
      private static CrewMember? Lookup(List<CrewMember> crew, string name)
      {
          foreach (CrewMember c in crew)
          {
              if (c.Name == name)
              {
                  return c;
              }
          }

          return null;
      }
  }
  ```

- [ ] 📖 **Walk three things and nothing else. Put the cursor on `line.Split('|')`:** *"`Split` hands back an array. Same square brackets you have used on a list since week three, indexed from zero — field zero is the kind word."*
- [ ] 🎯 **Then the cursor on `Lookup(crew, field[2])`:** *"The file says the word Okonkwo. The log has to hold the man. Build a fresh crew member out of that name instead and there are two Okonkwos. The station can only see one of them. Every trip the real one made lands on the other. That is week five, and it is the same question `Assert.Same` asks."*
- [ ] 💡 **And the free one — cursor on the `new SignOut(...)` line:** *"Since week five, making a sign-out IS the trip: the constructor calls `GoesOut()`. So loading the file puts every trip count back without a line of code that mentions counting."*

- [ ] 🎞️ **GO TO SLIDE 8** — *One list, one type*

- [ ] 📖 **Thirty seconds, no editor:** *"That is twelve lines of honest work, and it is the right amount for a log with three different kinds of things on it. Most lists are not like that. Most lists are one list of one type — and for those, a library does the whole trip in two lines. It is called a serializer, and you will use one in the lab tonight. I did it by hand first so you know what it is doing for you."*

- [ ] **Now the loading half in `Program.cs`.** <kbd>⌘F</kbd> for **`watch.Add(new FuelCheck("07:40", 4300));`** — one hit. **Select from that line down to and including `watch.Add(new Reading("14:35", -41.5, bhatt));` and paste this over the lot**

  ```csharp
  if (File.Exists(logFile))
  {
      // There is a book. The day so far is read out of it.
      watch.Load(logFile, crew);
  }
  else
  {
      // There is no book, so this is the first watch of the day and the desk
      // starts one. After tonight this branch is the rare case, not the normal one.
      watch.Add(new FuelCheck("07:40", 4300));
      watch.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
      watch.Add(new Reading("12:00", -39.8, moretti));
      watch.Add(new SignOut("14:20", okonkwo, "MET RUN", "15:00"));
      watch.Add(new SignOut("14:20", reyes, "DIG OUT", "14:45"));
      watch.Add(new Reading("14:35", -41.5, bhatt));
  }
  ```

- [ ] 🎯 **Point at the `else`:** *"Those six lines have been the top of this program since week six, and from tonight they almost never run. They are what the station does on a day it has no book — which is one day, ever."*

- [ ] ⚠️ **One thing before it runs, and say why out loud:** *"I changed the format ten minutes ago. The file on disk is in the old one, and this code cannot read a word of it. That is a real thing that happens, and tonight the answer is: throw it away and let the program write a new one. In week fourteen we do it properly, on data you are not allowed to throw away."*

  ```bash
  rm week-08/watch-log.txt
  ```

---

## 5 · It is still there *(slide 9)*

- [ ] **Run it, sign `Nakamura` out — `WALK`, back by `19:40` — then `q`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

- [ ] **Open `week-08/watch-log.txt` and put it on screen**

  ```
  FUEL|07:40|4300
  SIGNOUT|09:05|Lindqvist|FUEL|10:30|out
  MET|12:00|-39.8|Moretti
  SIGNOUT|14:20|Okonkwo|MET RUN|15:00|out
  SIGNOUT|14:20|Reyes|DIG OUT|14:45|out
  MET|14:35|-41.5|Bhatt
  SIGNOUT|14:57|Nakamura|WALK|19:40|out
  ```

- [ ] 📖 *"Still readable. Every field is still a field."*

- [ ] 🎞️ **GO TO SLIDE 9** — *Still there*

- [ ] 🎯 **Now the moment. Run it again and say nothing until the board is up**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  4 trips logged today.
  ```

- [ ] 🎯 *"There he is. Same board, new process. Week three's promise, paid."*
- [ ] 💡 **Then point at the last line, because it proves something the board above it does not:** *"Four trips logged today. That number is the sum of a count each crew member keeps. Nothing in the file says four. If `Load` had built a fresh Okonkwo out of the name in that line, the board would look identical and this line would say zero — I checked. It says four because the log came back holding the same people the station is holding."*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The watch log survives the program"
  ```

---

## 6 · The station's own clock *(slide 10)*

- [ ] 🎞️ **GO TO SLIDE 10** — *The station's own clock*

- [ ] 🎯 **Put the file back on screen and point at the last line:** *"One thing is wrong in that file and it has been wrong since week three. Nakamura signed out at 14:57. So did everybody I have signed out on this program, every week, all term. It is typed into the code."*
- [ ] 📖 *"That was survivable while nothing could read the log back. It is not survivable in a book."*

- [ ] **In `Watch.cs`, give the station a clock.** <kbd>⌘F</kbd> for **`private readonly List<ILogEntry> _entries`** — one hit. **Select that one line and paste this over it**

  ```csharp
      private readonly List<ILogEntry> _entries = new List<ILogEntry>();

      // What the station says the time is, right now.
      //
      // Haldane keeps UTC, which a lot of Antarctic stations do: down there every
      // meridian is a few hundred meters away, so a local time zone is a choice
      // rather than a fact. The station runs on one clock, and it is not the
      // clock of whichever laptop is sitting on the desk tonight — which is the
      // whole difference between DateTime.Now and DateTime.UtcNow.
      public static string Now()
      {
          return DateTime.UtcNow.ToString("HH:mm", CultureInfo.InvariantCulture);
      }
  ```

- [ ] **Use it.** <kbd>⌘F</kbd> for **`Add(new SignOut("14:57"`** — one hit. Make that line read

  ```csharp
          Add(new SignOut(Now(), who, reason, expected));
  ```

- [ ] **And the reading, in `Program.cs`.** <kbd>⌘F</kbd> for **`watch.Add(new Reading("15:02"`** — one hit. Make that line read

  ```csharp
      watch.Add(new Reading(Watch.Now(), celsius, who));
  ```

- [ ] 🎯 **Now the part that only shows up because the clock is real. Put the cursor on `Add` in `Watch.cs`:** *"The log prints in the order the entries sit in the list. That has looked like time order all term, and it was luck: everything went in in order. A real clock can hand me a line that belongs earlier than the one before it."*

- [ ] **Still in `Watch.cs`.** <kbd>⌘F</kbd> for **`public void Add(ILogEntry entry)`** — one hit. **Select from that line down to and including `_entries.Add(entry);` and paste this over it** — the `}` under it stays where it is

  ```csharp
      // The book is kept in time order. A new line almost always belongs at the
      // end — but "almost always" is not a rule, and once the desk stamps a real
      // clock, a line can arrive with a time earlier than the one before it.
      // This puts every line where its own time says it goes.
      //
      // Comparing the text gives the same answer as comparing the clock, because
      // the times are written HH:mm — which is what the leading zero is for.
      public void Add(ILogEntry entry)
      {
          int at = _entries.Count;

          for (int i = 0; i < _entries.Count; i++)
          {
              if (string.CompareOrdinal(_entries[i].Time, entry.Time) > 0)
              {
                  at = i;
                  break;
              }
          }

          _entries.Insert(at, entry);
  ```

- [ ] 📖 **Two things, and the second one is the point.** *"`Insert` puts an item at a position instead of on the end. Same list you have had since week three."*
- [ ] 🎯 *"And comparing the text works because the times are written `HH:mm`. `09:05` sorts before `14:20` because zero sorts before one. Take the leading zero out and `9:05` sorts after `14:20` — which is the padding your own lab put back into the clock last week."*
- [ ] 🎯 **Then the finding, and it is the one to say slowly:** *"The book is in order now because something puts it in order. Before tonight it was in order because the lines happened to arrive that way. One of those two can be tested."*

- [ ] **Run it and take a reading — `m`, `Moretti`, `-43.6` — then `q`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  Watch log:
    07:40  FUEL      day tank 4300 L
    09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
    12:00  MET       -39.8 C, taken by Moretti
    14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
    14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
    14:35  MET       -41.5 C, taken by Bhatt
    19:12  SIGN OUT  Nakamura - WALK, due 19:40
    19:26  MET       -43.6 C, taken by Moretti
  ```

- [ ] ⚠️ **Those last two times are station time when I ran it — yours will be whatever the clock says.** Nothing else in that block moves
- [ ] 📖 *"Real times. And the headline temperature at the top came off the reading I just took, which came off the file."*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The station stamps its own clock"
  ```

---

## 7 · The fact week seven could not write *(slide 11)*

- [ ] 🎞️ **GO TO SLIDE 11** — *The fact you could not write*

- [ ] 📖 *"An hour ago I said there was one thing the suite could not ask. Let's ask it."*

- [ ] **In `week-08/Haldane.Tests/WatchTests.cs`, paste this at the bottom of the class — above the last `}`**

  ```csharp

      // Week 8. The fact the suite could not hold last week, because there was
      // nothing to call: a log that is still there after the program is gone.
      [Fact]
      public void TheLogSurvivesARestart()
      {
          string path = Path.Combine(Path.GetTempPath(), "haldane-test-log.txt");

          List<CrewMember> crew = new List<CrewMember>();
          CrewMember okonkwo = new CrewMember("Okonkwo");
          crew.Add(okonkwo);

          Watch watch = new Watch();
          watch.SignOut(okonkwo, "MET RUN", "15:00");
          watch.Save(path);

          // A second watch, with nothing in it, reading the same book.
          Watch reopened = new Watch();
          reopened.Load(path, crew);

          Assert.Equal(1, reopened.Count);
          Assert.Equal("MET RUN", reopened.SignOuts()[0].Reason);

          // And it is the man himself, not a second Okonkwo wearing his name.
          Assert.Same(okonkwo, reopened.SignOuts()[0].Who);
      }
  ```

- [ ] 📖 **Three moves, and one of them is new — put the cursor on the `path` line:** *"Set the scene, do the thing, check the answer, same as every fact you have written. What is new is the first line. This test gets a file of its own, in the folder the system keeps for scratch files. It never goes near the station's book — and it can do that only because `Save` takes a path instead of knowing one."*
- [ ] 🎯 **Then the cursor on `Watch reopened = new Watch();`:** *"And there is the restart. Loading into the watch that just saved would prove nothing — it already holds the record. A second one, holding nothing, is quitting and starting again without quitting."*

- [ ] **Run it**

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
  Total tests: 4
       Passed: 4
  ```

- [ ] 🎯 *"Four. Three of those were true last week and one of them could not be written last week. It is on the suite now, and it runs every time anybody runs it."*

- [ ] **One more, and it is the one that makes the order a rule.** In `WatchTests.cs`, paste this at the bottom of the class — above the last `}`

  ```csharp

      // Week 8. The book is in time order because something puts it in time
      // order, not because the lines happened to arrive that way.
      [Fact]
      public void TheBookStaysInTimeOrder()
      {
          Watch watch = new Watch();

          watch.Add(new FuelCheck("14:35", 4300));
          watch.Add(new FuelCheck("07:40", 4200));

          Assert.Equal("07:40", watch.All()[0].Time);
          Assert.Equal("14:35", watch.All()[1].Time);
      }
  ```

- [ ] 📖 *"Two entries, added late one first. If the order were still an accident, this comes back the way it went in."*

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] **Save it, and push.** Silent — two lines, no commentary

  ```bash
  git add . && git commit -m "Two facts the suite could not hold last week"
  ```

  ```bash
  git push -u origin the-log-book
  ```

---

## 8 · A record you can edit by hand *(slide 12)*

- [ ] 🎞️ **GO TO SLIDE 12** — *A file is a text file*

- [ ] 📖 *"One more thing before you go, and it is the honest half of tonight."*

- [ ] **Open `week-08/watch-log.txt`, delete the `Reyes` line, and save the file.** Say what you are doing while you do it: *"I am the duty officer. I have the station's log open in a text editor. I do not like this line."*
- [ ] **Now run the program**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 19:12 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  ```

- [ ] 💥 **Let it sit, then press `q` and let the muster print**

  ```
  Muster - still to account for:
    Lindqvist - FUEL, due 10:30
    Okonkwo - MET RUN, due 15:00
    Nakamura - WALK, due 19:40
  ```

- [ ] 🎯 **Flat, and do not rush it:** *"Reyes is outside. She is not on the board and she is not on the muster. Nothing crashed. Nothing warned. The station simply does not know she is out there."*
- [ ] 📖 **Then be exact about what is and is not the lesson:** *"The program is fine. The file is fine. A file is a text file, and anybody who can open it can change what the station believes — and there is no version of it anywhere else. Two things fix that, and they are the next two things we do. Week ten the log stops living on this laptop. Week thirteen we deal with a file that is damaged rather than edited."*
- [ ] **Put the line back** — or delete the file and let the program start a fresh book; either is fine

---

## 9 · Hand off *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Lab: the log book*

- [ ] 📖 *"Your turn, and at KDXR nothing survives the night either. The desk forgets which carts it played and it has never heard of the DJ who was on before you. You will fix both — and for the rotation you get the tool I did by hand, because a rotation is one list of one type."*
- [ ] 🎯 **Define done on their machine:** *"You are done when `dotnet test week-08/Lab.Checks` says five out of five, and when you quit the shift, start it again, and the desk tells you who had it last."*
- [ ] 💡 **Name the one that surprises everybody** — *"there is a number in that file that will not come back, and the file will be sitting there with the right value in it. Task four is about why."*

---

## 10 · Wrap *(slide 14)*

- [ ] 🎞️ **GO TO SLIDE 14** — *Tonight, in one picture*

- [ ] 📖 **Six short sentences, then stop** — *"A file is a place to put text, and `File` does the whole job in one line each way. Turning your objects into text and back is your job, and the KIND word goes first. A serializer does it for you when the list is all one type. The path gets handed in, because where a file goes is a fact about the machine. A missing file is a first run, not a failure. And a save file is a text file that anybody can edit."*
- [ ] 🎯 **The forward line:** *"Your data survives now, and it survives on your laptop. It is one file, on one machine, that one person can open. In week ten it moves somewhere the mainland can see — and in week eleven every terminal in this room writes to the same one."*
- [ ] **Homework: two URLs in Canvas, coursework repo first, project repo second**
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 copies this week's checks in, same as always. This week there are FOUR of them. If `dotnet test Project.Checks` shows two, you are running last week's"*
- [ ] ⚠️ **And say the date, because this one is different** — *"there is no class next week. It is fall break. So this homework is due two weeks out, not one. It is not a bigger homework. It is the same size with a week off in the middle of it."*
