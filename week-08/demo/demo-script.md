# Week 8 Demo — The Log Stops Being Gone 🧊

**Haldane Station · duty console · day 261**

Tonight the station's book survives the program that keeps it — and the room finds out that a file is a text file, which is the good news and the bad news.

> **The shape of the night:** the loss → a file of our own → it is still there, and one number is wrong → a test that catches it → a real clock → somebody edits the file by hand. **Each demo segment is followed by the lab task that practices it.**

**Total: ~128 minutes of demo, in seven short segments, and six lab blocks between them.** The lesson plan's timing table has the minutes.

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
- [ ] **Commit the restore before you start** — it always shows up as changes, and that is expected

  ```bash
  git add . && git commit -m "week 7 demo, restored from the answer key"
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 7 left it, with `week-01/` through `week-07/` in it
- [ ] ⚠️ **Run `dotnet run --project week-07/Haldane` once before class.** §1 opens by running it, so it has to build on the night
- [ ] ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed** — both projects **and `week-08/watch-log.txt`**. If that file survives a rehearsal, §2's loss never happens
- [ ] **A browser tab on the lab README** (`week-08/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] 💡 **The clock is real from §6 on, so the times in this sheet's output blocks are MINE, not yours.** Every log line you make after §6 is stamped with station time — UTC. Nothing else in the blocks moves
- [ ] **Lids down for the demo** — *"tonight comes in pieces again. Lids down while I'm working on the station, lids up for each lab block in between. You'll write all of this yourself in the lab, on a station that is not this one"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. The console keeps a log, it is tested, and two real bugs came off the board."*

  ```bash
  dotnet run --project week-07/Haldane
  ```

- [ ] **Press `m`, and have `Bhatt` phone in a reading of `-42.4`.** The log grows a line, the headline number changes
- [ ] **Press `q` to close the desk**

- [ ] 🎯 **Then the question the night runs on, and let it sit:** *"Everything you just watched me do is gone. It went when the program went. Every reading since week three, every sign-out — gone the moment I press q. Tonight that changes."*

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

- [ ] 📖 *"Eighth week, and this program has not been written from scratch since week three. The tests come with it — three facts that were true last week and are still true now."*

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] **Open `week-08/Haldane/Program.cs`, and move the date on.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`day 254`** — one hit. Make it read

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

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for at the end of Setup

  ```bash
  git add . && git commit -m "week 8: the desk, carried forward"
  ```

---

## Lab A · Setup — 5 minutes

- [ ] **Lids up. Swipe away from the deck and put the lab README up in the browser, at *Setup*.** It is the screen for every lab block tonight
- [ ] 📖 **The story, in one sentence:** *"KDXR has the same problem Haldane has. The desk forgets the whole night the moment the shift ends."*
- [ ] **Setup, steps 1 to 4, then run my checks and commit.** *"Stop when the terminal says one out of four passing, and you've committed. That's the whole job for these five minutes."*
- [ ] ⚠️ **Nobody starts Task 1 yet.** The README has an "In class, stop here" note at the end of Setup. Task 1 is the lab's version of §2, so it goes right after §2

---

## 2 · Gone

- [ ] **Run it, press `o`, and sign `Nakamura` out — `WALK`, back by `19:40`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
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
    14:57  SIGN OUT  Nakamura - WALK, due 19:40
  ```

- [ ] 📖 *"Nakamura is on the ice. Four people are out, and the log book at the bottom of the screen has seven lines in it."*
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

- [ ] 🎯 **Collect the promise, and name where it was made:** *"Week three, I had you type three records in and quit, and I said I wanted you to be annoyed by it. Week six I said it again about this log. Last week I said it a third time. Every one of those times I told you the week. It was this one."*
- [ ] 📖 **Then be precise about what is happening, because it is not a bug:** *"The list is in memory. Memory belongs to the program while it runs. The program ended, so the memory went with it. There is nothing to fix. Every program ever written does this."*
- [ ] 🎯 **The week-7 hook, one line:** *"Last week you learned to write a rule down so a machine checks it forever. Try to write this one: the log is still there after a restart. You can't — there is nothing to call. By the end of tonight you'll write it."*
- [ ] 📖 **And the tool, one line, no slide:** *"Everything tonight goes through a class called File. One line writes text to a file. One line reads it back."*

---

## Lab B · Task 1 — 7 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.**
- [ ] 📖 *"Your desk loses its night too. Task 1: air the hour, look at the carts, quit, and look again. No code. Stop at the 'In class, stop here' note at the end of Task 1."*
- [ ] 🎯 **Circulating:** ask *"how many times did Nightjar play tonight?"* The desk says 0, and they aired it a minute ago
- [ ] 📖 **Close the block:** *"Your desk lost its play counts the same way my station lost Nakamura. I'll fix my station first, then you fix your desk."*

---

## 3 · A file of our own *(slides 2–3)*

- [ ] 🎞️ **GO TO SLIDE 2** — *Where the file actually goes* · *"Before any code, the one thing you can't see on screen. A plain file name is worked out from the folder you were standing in when you started the program. `dotnet run` stands at the top of the repo. `dotnet test` stands inside the build folder. Same name, two different files. So nothing in this course types a file name inside a class. The path gets handed in."*

- [ ] **Back to the editor. Open `week-08/Haldane/Watch.cs`, go to the end of the file (<kbd>⌘↓</kbd> / <kbd>Ctrl+End</kbd>), select the last line — it is a single `}` — and paste this over it**

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

- [ ] 📖 *"One line per entry, built out of three things every entry can answer. `WriteAllLines` takes a list of strings and puts each one on its own line in the file."*

- [ ] **Now `Program.cs` decides where.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`Watch watch = new Watch();`** — one hit. **Select that one line and paste this over it**

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

- [ ] **And write it at the handover.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`EndOfWatch();`** — one hit. **Select that one line and paste this over it**

  ```csharp
  // The watch is handed over, so the book gets written up: load at the start,
  // save at the end. A program that only saves at the end is a program that
  // loses the whole night to one crash — which is among the things a database
  // does better, and that is week 10.
  watch.Save(logFile);

  EndOfWatch();
  ```

- [ ] 📖 **Put the cursor on `watch.Save(logFile);`:** *"The book gets written when the watch is handed over, at the end. There is no load yet, so this is half the trip."*

- [ ] **Run it, sign `Reyes` back in with `b`, then `q`**

  ```bash
  dotnet run --project week-08/Haldane
  ```

- [ ] 🎯 **Open `week-08/watch-log.txt` from the Explorer and put it on screen.** Let them look at it for a second before you say anything

  ```
  07:40  FUEL  day tank 4300 L
  09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
  12:00  MET  -39.8 C, taken by Moretti
  14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
  14:20  SIGN OUT  Reyes - DIG OUT, back
  14:35  MET  -41.5 C, taken by Bhatt
  ```

- [ ] 📖 *"There it is. The station's day, on disk, and it outlived the program. I can read every line of it."*
- [ ] 💥 **Then the turn, and ask it as a real question:** *"Now I need a method that reads this back in. Look at the second line. Where does the name stop and the reason start?"*
- [ ] 🎯 **Let somebody try, then land it:** *"`Lindqvist - FUEL, due 10:30` is a sentence. To get a sign-out back out of it, I'd have to hunt for a dash, then a comma, then the word 'due'. That wording is there for people to read. If I ever change how it reads, this file stops loading."*

- [ ] **So replace the save.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`// One line per entry, exactly as the log prints it.`** — one hit. **Select from that line down to and including `File.WriteAllLines(path, lines);` and paste this over it** — the `}` under it stays where it is

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

- [ ] 📖 **Three decisions, one line each — cursor on the `SIGNOUT|` line:** *"The kind word goes first, so reading a line tells me what it is before anything else. The fields are split by a pipe, not a comma, because commas turn up in real text. And `is` tells me which of the three kinds each entry really is."*
- [ ] **That needs one import.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`public class Watch`** — one hit. **Select that one line and paste this over it**

  ```csharp
  //
  // Week 8 adds three things: a clock, an order, and a file.
  using System.Globalization;

  public class Watch
  ```

- [ ] **Run it and quit — `q`, nothing else. Then open `week-08/watch-log.txt` and put it on screen**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  FUEL|07:40|4300
  SIGNOUT|09:05|Lindqvist|FUEL|10:30|out
  MET|12:00|-39.8|Moretti
  SIGNOUT|14:20|Okonkwo|MET RUN|15:00|out
  SIGNOUT|14:20|Reyes|DIG OUT|14:45|out
  MET|14:35|-41.5|Bhatt
  ```

- [ ] 📖 *"Still readable, and now every field is still a field."*
- [ ] ⚠️ **Then the thing that just happened quietly:** *"The sentences are gone. I overwrote them. The old file was in the old format, and this program doesn't know that format exists. Tonight I could afford to lose it. In week fourteen we do this to data you are not allowed to lose, and it has a name: a migration."*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The watch log is written down"
  ```

- [ ] 🎞️ **GO TO SLIDE 3** — *One list, one type* · *"I wrote the log's save by hand because the log holds three kinds of things. Your rotation holds one kind: songs. For one list of one type, a serializer does the whole job. Serialize turns the list into text. That's what you use in the lab."*

---

## Lab C · Task 2 — 12 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.**
- [ ] 📖 *"Task 2: write `Save`, and add the two lines in `Program.cs` that call it. The README gives you the syntax. Putting the lines in order is yours. If you're stuck, open the Stuck box under the task. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** the question to ask over a shoulder is *"which list are you handing the serializer?"* The answer is `_songs`
- [ ] ⚠️ **Watch for anyone who saves to `"rotation.json"` inside the method** instead of the `path` parameter. It works when they run it and fails my checks, and slide 2 is the reason

---

## ☕ Break

---

## 4 · It is still there

- [ ] 📖 *"Now the way back in. Load reads the file, splits each line on the pipe, and builds the entries back up."*

- [ ] **Go to the end of `Watch.cs` (<kbd>⌘↓</kbd> / <kbd>Ctrl+End</kbd>), select the last line — a single `}` — and paste this over it**

  ```csharp

      // Read the day back.
      public void Load(string path)
      {
          _entries.Clear();

          foreach (string line in File.ReadAllLines(path))
          {
              string[] field = line.Split('|');

              if (field[0] == "SIGNOUT" && field.Length == 6)
              {
                  // The file says a name, so make a crew member with that name.
                  CrewMember who = new CrewMember(field[2]);

                  SignOut s = new SignOut(field[1], who, field[3], field[4]);

                  if (field[5] == "back")
                  {
                      s.Back();
                  }

                  Add(s);
              }
              else if (field[0] == "MET" && field.Length == 4
                  && double.TryParse(field[2], NumberStyles.Float,
                      CultureInfo.InvariantCulture, out double celsius))
              {
                  Add(new Reading(field[1], celsius, new CrewMember(field[3])));
              }
              else if (field[0] == "FUEL" && field.Length == 3
                  && int.TryParse(field[2], out int liters))
              {
                  Add(new FuelCheck(field[1], liters));
              }
          }
      }
  }
  ```

- [ ] 📖 **Two things, cursor on each. First `line.Split('|')`:** *"`Split` hands back an array of the pieces. Square brackets, counted from zero, same as a list. Field zero is the kind word."*
- [ ] 📖 **Then `new CrewMember(field[2])`:** *"The file only has a name in it, so I make a crew member with that name."* **Say nothing more about this line.** §5 comes back to it

- [ ] **Now the loading half in `Program.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`watch.Add(new FuelCheck("07:40", 4300));`** — one hit. **Select from that line down to and including `watch.Add(new Reading("14:35", -41.5, bhatt));` and paste this over the lot**

  ```csharp
  if (File.Exists(logFile))
  {
      // There is a book. The day so far is read out of it.
      watch.Load(logFile);
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

- [ ] 🎯 **Point at the `else`:** *"No file means this is the first watch of the day. That's not an error. The six seed lines only run then."*

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

- [ ] 📖 *"Nakamura is on the last line. That's the last thing the program did before it stopped."*

- [ ] 🎯 **Now the moment. Run it again and say nothing until the board is up**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  0 trips logged today.
  ```

- [ ] 🎯 *"There he is. Same board, new program. Week three's promise, paid."*
- [ ] ⚠️ **Do not point at `0 trips logged today`.** If somebody spots it, say *"hold that thought — it's the next thing we do."* It is §5's whole segment
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The watch log comes back"
  ```

---

## Lab D · Task 3 — 13 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: write `Load`, and add the one line in `Program.cs` that calls it. Then prove it reads the file by changing a title in the file by hand. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating: look for a rotation with six carts.** That is a `Load` with no `Clear()` — the three carts `Program.cs` added are still there, and the three from the file go on top
- [ ] 🎯 **And for a `Load` that never moves the songs in.** `Deserialize` builds a new list. Ask *"where do the loaded songs end up?"*

---

## 5 · The number that came back wrong

- [ ] **Run it — nothing else — and look at the board**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  0 trips logged today.
  ```

- [ ] 💥 **Point at the TRIPS column, then at the last line:** *"Every row says one trip. The total says zero. They can't both be right."*
- [ ] 🎯 **Then the reason, one sentence at a time:** *"The total adds up the trips on the station's crew list. `Load` didn't use the crew list. It made a new Okonkwo out of the name in the file. So now there are two Okonkwos. The one on the board has the trip. The one on the crew list doesn't."*
- [ ] **Press `q`**

- [ ] 📖 *"Before I fix it, I write it down as a test. Same as last week: see it red first."*

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
          reopened.Load(path);

          Assert.Equal(1, reopened.Count);
          Assert.Equal("MET RUN", reopened.SignOuts()[0].Reason);

          // And it is the man himself, not a second Okonkwo wearing his name.
          Assert.Same(okonkwo, reopened.SignOuts()[0].Who);
      }
  ```

- [ ] 📖 **Cursor on the `path` line:** *"This test gets a file of its own, in the folder the system keeps for scratch files. It never touches the station's book. That only works because `Save` takes a path."*
- [ ] 📖 **Cursor on `Watch reopened = new Watch();`:** *"This is the restart. A second watch, holding nothing, reads the same file. Loading into the watch that just saved would prove nothing — it already has the record."*
- [ ] 📖 **Cursor on `Assert.Same`:** *"`Assert.Same` asks: is this the same object, not just one that looks the same. You used it last week on Dorothy."*

- [ ] 🎯 **Ask for the color before you run it, and wait for an answer.** *"Red or green?"*

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
    Assert.Same() Failure: Values are not the same instance
  Expected: CrewMember { Name = "Okonkwo", TripsToday = 1 }
  Actual:   CrewMember { Name = "Okonkwo", TripsToday = 1 }
  ```

- [ ] 🎯 **Point at the two lines:** *"Same name, same trip count, and they are two different objects. That's the two Okonkwos, caught by a test."*

- [ ] 📖 *"The fix: look each name up in the crew list and use the person who's already there. Week five's `Find`, one more time."*

- [ ] **First the lookup. Go to the end of `Watch.cs` (<kbd>⌘↓</kbd> / <kbd>Ctrl+End</kbd>), select the last line — a single `}` — and paste this over it**

  ```csharp

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

- [ ] **Then `Load` needs the crew list.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`// Read the day back.`** — one hit. **Select from that line down to and including `public void Load(string path)` and paste this over it**

  ```csharp
      // Read the day back. The crew list is here because a line says "Okonkwo"
      // and this log holds the man — the same object the board counts trips on,
      // never a second Okonkwo with the same name.
      public void Load(string path, List<CrewMember> crew)
  ```

- [ ] **And the two lines that made new people.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`if (field[0] == "SIGNOUT" && field.Length == 6)`** — one hit. **Select from that line down to and including the `}` directly above `else if (field[0] == "FUEL"`, and paste this over it**

  ```csharp
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
  ```

- [ ] 📖 **Cursor on `Lookup(crew, field[2])`:** *"Instead of making a new Okonkwo, look him up. If he's not on the crew list, skip the line."*

- [ ] **Run the tests**

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

- [ ] 📖 **It doesn't build, and that's the next step, not a problem.** Read the error off the screen: `Program.cs`, `CS7036`, *"no argument given that corresponds to the required parameter 'crew'"*. *"`Load` needs the crew list now, and `Program.cs` isn't passing it."*
- [ ] **In `Program.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `watch.Load(logFile);` — one hit. Make it read**

  ```csharp
      watch.Load(logFile, crew);
  ```

- [ ] **Run the tests again**

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

- [ ] 📖 **One more error, same code, now in `WatchTests.cs`.** *"The test calls `Load` too."*
- [ ] **In `WatchTests.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `reopened.Load(path);` — one hit. Make it read**

  ```csharp
          reopened.Load(path, crew);
  ```

- [ ] **And run them once more**

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
  Total tests: 4
       Passed: 4
  ```

- [ ] 🎯 *"Four tests, all green. Three of the four were true last week. The fourth one couldn't be written last week, and now it runs every time."*

- [ ] **Now the program — run it, nothing else**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  4 people outside.
  4 trips logged today.
  ```

- [ ] 🎯 *"Four trips. The rows and the total agree, because the log came back holding the same people the station has."*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The log comes back holding the same people"
  ```

- [ ] 📖 **Hand-off to the lab, one line:** *"Task 4 is the same shape. A number goes into the file and comes back wrong. Write the test first, see it red, then fix it."*

---

## Lab E · Task 4 — 23 minutes

- [ ] **Lids up. The lab README, at *Task 4 in full*.**
- [ ] 📖 *"Task 4: see the play count come back as zero, write the fact first, run it and see red, then read the README's reason and make the fix. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulate hard — this is the lab's payoff.** The wrong reflex to catch is going straight to `Song.cs`. The question to ask over a shoulder: *"what color is your test right now?"*
- [ ] 🎯 **And watch for a fact that loads into the same rotation it saved.** It passes without proving anything. Ask *"where's your second rotation?"*
- [ ] 💡 **Early finishers:** item 2 of *⭐ Done early?* in the README, or help a neighbor

---

## 6 · The station's own clock *(slide 4)*

- [ ] 🎞️ **GO TO SLIDE 4** — *What a serializer won't read back* · *"This is what you just hit in Task 4. A serializer writes every property it can read. It reads back only the ones it can write. A private setter is readable and not writable, so it goes into the file and never comes back. `[JsonInclude]` says: this one too."*

- [ ] **Back to the editor. Put the file back on screen and point at Nakamura's line:** *"One thing is wrong in this file, and it has been wrong since week three. Nakamura signed out at 14:57. So has everybody I've signed out on this program, every week. That time is typed into the code."*
- [ ] 📖 *"That typed-in time didn't matter while the log died with the program. Now the log keeps, and every sign-out goes into the book saying 14:57."*

- [ ] **In `Watch.cs`, give the station a clock.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`private readonly List<ILogEntry> _entries`** — one hit. **Select that one line and paste this over it**

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

- [ ] 📖 **Cursor on `UtcNow`:** *"`DateTime.Now` is this laptop's clock. `DateTime.UtcNow` is the world's. Haldane keeps UTC, like a lot of Antarctic stations, so the station has one clock whatever laptop is on the desk."*

- [ ] **Use it — and TWO things change on this line, not one.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`Add(new SignOut("14:57"`** — one hit. It currently reads `_entries.Add(new SignOut("14:57", who, reason, expected));`. The time becomes the clock, **and the `_entries.` on the front comes off** — so a sign-out goes through this class's own `Add` instead of straight at the list. **Select the whole line and make it read**

  ```csharp
          Add(new SignOut(Now(), who, reason, expected));
  ```

- [ ] 💡 **Instructor note, nothing to say yet: that second change does nothing right now.** `Add` still only appends. It is the line that lets the ordering two beats from now reach the desk

- [ ] **And the reading, in `Program.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`watch.Add(new Reading("15:02"`** — one hit. Make that line read

  ```csharp
      watch.Add(new Reading(Watch.Now(), celsius, who));
  ```

- [ ] 🎯 **Now the part that only shows up because the clock is real. Cursor on `Add` in `Watch.cs`:** *"The log prints in the order the entries sit in the list. All term that looked like time order, and it was luck: everything went in in order. A real clock can hand me a line that belongs earlier than the one before it."*

- [ ] **Still in `Watch.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`public void Add(ILogEntry entry)`** — one hit. **Select from that line down to and including `_entries.Add(entry);` and paste this over it** — the `}` under it stays where it is

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

- [ ] 📖 **Cursor on `Insert`:** *"`Insert` puts an item at a position instead of on the end. Same list you've had since week three."*
- [ ] 🎯 **Then the finding, slowly:** *"The book is in order now because something puts it in order. Before tonight it was in order because the lines happened to arrive that way. Only one of those can be tested."*

- [ ] **So test it.** In `WatchTests.cs`, paste this at the bottom of the class — above the last `}`

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

- [ ] 📖 **Walk it before you run it:** *"Two fuel checks, put in backwards on purpose — 14:35 first, then 07:40. If `Add` still just added to the end, position zero would be 14:35 and this would be red."*

  ```bash
  dotnet test week-08/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

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
    14:57  SIGN OUT  Nakamura - WALK, due 19:40
    19:26  MET       -43.6 C, taken by Moretti
  ```

- [ ] ⚠️ **Only the last line is yours — `19:26` is station time when I ran it.** Nakamura's `14:57` came back off the file and doesn't move
- [ ] 💡 **Your reading lands wherever its own time puts it, which may be in the MIDDLE of this list rather than at the bottom.** That depends on the hour you run it, and either way it is the ordered `Add` doing its job
- [ ] 💡 **One line, and it plants next week — point at the banner, not at the code** — *"The time on this console is real now. The DAY is not: `day 261` is typed into this program, and I change it by hand every week. Hold on to that."* **Ten seconds, then move on**

- [ ] **Save it, and push.** Silent

  ```bash
  git add . && git commit -m "The station stamps its own clock, in order"
  ```

  ```bash
  git push -u origin the-log-book
  ```

---

## ☕ Break

---

## 7 · A file is a text file

- [ ] 📖 *"One more thing, and it's the honest half of tonight."*

- [ ] **Open `week-08/watch-log.txt`, delete the `Reyes` line, and save the file.** Say what you are doing while you do it: *"I'm the duty officer. I have the station's log open in a text editor. I don't like this line."*
- [ ] **Now run the program**

  ```bash
  dotnet run --project week-08/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:57 │ Nakamura  │ WALK    │ 19:40    │ OUT    │ 1     │
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

- [ ] 🎯 **Flat, and do not rush it:** *"Reyes is outside. She's not on the board and she's not on the muster. Nothing crashed. Nothing warned. The station doesn't know she's out there."*
- [ ] 📖 **Then be exact about the lesson:** *"The program is fine. The file is fine. A file is a text file, and anybody who can open it can change what the station believes. Week ten, the log stops living on this laptop. Week thirteen, we deal with a file that's damaged rather than edited."*
- [ ] **Put the line back** — or delete the file and let the program start a fresh book; either is fine

- [ ] 🎯 **Hand off, and define done on their machine:** *"You're done when `dotnet test week-08/Lab.Checks` says four out of four. And when you quit the shift and start it again, `PLAYED` still says how many times each cart went out."*

---

## Lab F · Finish, or try to break it — 7 minutes

- [ ] **Lids up. The lab README.** Anyone not finished works on their next task. Anyone finished goes to *Now try to break it* — its fourth item is §7 done to their own file
- [ ] ⚠️ **Stop at 3:35 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 8 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"A file is a place to put text, and `File` does each direction in one line. The path is handed in. No file means a first run. When it's one list of one type, a serializer does the job. And a save file is a text file that anybody can edit."*
- [ ] 🎯 **The forward line:** *"Your data survives now, and it survives on your laptop. It's one file, on one machine. In week ten it moves somewhere the mainland can see — and in week eleven every terminal in this room writes to the same one."*
- [ ] **One question about tonight's format, before anyone packs up.** Anonymous, one tap: *the pace tonight felt too slow · about right · too fast · I got lost somewhere*. The lesson plan says where the question lives
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. Same four tasks, same order. If you finished the lab, you've done every step once."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 copies this week's checks in, same as always. This week there are FOUR of them. If `dotnet test Project.Checks` shows two, you're running last week's."*
- [ ] ⚠️ **And say the date, because this one is different** — *"There's no class next week. It's the term break. So this homework is due two weeks out, not one. It's not a bigger homework. It's the same size with a week off in the middle of it."*
