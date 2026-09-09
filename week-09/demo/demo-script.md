# Week 9 Demo — Thirty Lines Become One 🧊

**Haldane Station · duty console · day 268**

Tonight seven loops the room has watched get written come out, the tests never move, and then the met book gets asked six questions it has never been asked.

> **The shape of the night:** a promise from week six, paid → six more of the same shape → 💥 a muster that loses a name → a season of weather, queried → and what that cost.

**Total: ~137 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html) and confirm the top line says *day 268*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 9's board is up. Say nothing about it
- [ ] ⚠️ **Put week 8's folder back to its finished state — §1 copies out of it**

  ```bash
  cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-08/demo-starter/Haldane/*.cs week-08/Haldane/ \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-08/demo-starter/Haldane.Tests/WatchTests.cs week-08/Haldane.Tests/
  ```

  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector
- [ ] ⚠️ **Delete `week-09/` if you've rehearsed** — both projects and `week-09/watch-log.txt`. `dotnet new` refuses to overwrite, and a leftover log file changes the board §2 opens on

  ```bash
  rm -rf week-09
  ```

- [ ] ⚠️ ⚠️ **NEW THIS WEEK, AND §5 CANNOT RUN WITHOUT IT: put the met book in place.** It is 50,000 lines and 1.1 MB, and the demo never types it — in the station's world it has been kept by hand since the season opened

  ```bash
  mkdir -p week-09 && cp ~/Repos/dotnet-db-dev-answer-keys/week-09/demo-starter/season.txt week-09/
  ```

- [ ] **Commit the restore before you start** — it always shows up as changes, and that is expected

  ```bash
  git add . && git commit -m "week 8 demo, restored from the answer key"
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 8 left it
- [ ] ⚠️ **Run `dotnet run --project week-08/Haldane` once before class.** §1 opens by running it, so it has to build on the night
- [ ] 💡 **The times in this sheet's output blocks are MINE.** Every log line the desk stamps tonight is station time — UTC — and the muster stamps one too. Nothing else in the blocks moves
- [ ] 💡 ⚠️ **§5 and §6 print three cost figures and TWO OF THEM WILL DIFFER ON YOUR MACHINE.** The read time and the query time move by a few milliseconds every single run. **Say what the screen says.** The memory figure — *11.8 MB from a 1.1 MB file* — was stable across every run and it is the one carrying the argument
- [ ] 💡 **No debugger tonight.** If a query is answering something you did not expect, week 5's offer stands quietly — but ⚠️ **a query in the Watch panel RUNS when the panel evaluates it**, which is the whole subject of §4 and will confuse you if you forget
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station that is not this one"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. The console keeps a log, the log survives the night, and there are five tests watching it."*

  ```bash
  dotnet run --project week-08/Haldane
  ```

- [ ] **Press `m`, and have `Bhatt` phone in a reading of `-42.4`.** A line goes on the log — that half always happens
- [ ] ⚠️ **Whether the HEADLINE temperature moves depends on the hour you are running this, and both ways are correct.** The book is kept in time order and the headline is the last reading *in the book* — so a reading stamped later than the seeded `14:35` becomes the headline, and one stamped earlier lands **above** it and the headline stays at `-41.5`. **Say the mechanism, never predict the number.** *(Measured both ways: at 20:49 it moves to `-42.4`; at 09:12 it stays at `-41.5` and the new line sits second in the log.)*
  - 💡 **One sentence to the room if the clock allows, and it is last week's lesson still paying** — *"The headline is the last reading in the book, and the book is kept in time order. So whether the one I just took becomes the headline depends on what time it is at the station."* **Skip it if §1 is running long; nothing later tonight depends on it**
- [ ] **Press `q` to close the desk**

- [ ] 🎯 **Then the promise, and name the weeks it was made in** — *"Several times since week three I have told you that a loop you were writing would become one line in week nine. Tonight is week nine."*

- [ ] **Branch first, and say it as you type it** — *"a branch for tonight, same as every week. Nothing goes straight to `main`, and that goes for your project too"*

  ```bash
  git checkout -b thirty-lines-become-one
  ```

- [ ] **Now make this week's folder.** No commentary — they have watched this eight times

  ```bash
  dotnet new console -o week-09/Haldane
  ```

  ```bash
  dotnet add week-09/Haldane package Spectre.Console --version 0.57.2
  ```

  ```bash
  cp week-08/Haldane/*.cs week-09/Haldane/
  ```

- [ ] **And the suite comes too.** Same two moves, one template along

  ```bash
  dotnet new xunit -o week-09/Haldane.Tests
  ```

  ```bash
  cp week-08/Haldane.Tests/WatchTests.cs week-08/Haldane.Tests/Haldane.Tests.csproj week-08/Haldane.Tests/Directory.Build.rsp week-09/Haldane.Tests/
  ```

  ```bash
  rm week-09/Haldane.Tests/UnitTest1.cs
  ```

- [ ] 📖 *"Ninth week, and this program has not been written from scratch since week three. The tests come with it."*

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] **Open `week-09/Haldane/Program.cs` and move the date on.** <kbd>⌘F</kbd> for **`day 261`** — one hit. Make that line read

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbor: 512 km - winter crew - day 268[/]");
  ```

- [ ] 💡 **Name it as you do it — this is the last time it happens** — *"I have typed that number in by hand every week since week three. The station has a clock. It has a log. It has a file of every reading anybody has ever taken. And the one thing it cannot tell you is what day it is, because that lives in the source code. Remember this line."*

- [ ] **And the log file's name.** <kbd>⌘F</kbd> for **`week-08/watch-log.txt`** — one hit. Make that line read

  ```csharp
  string logFile = "week-09/watch-log.txt";
  ```

- [ ] **Prove the suite came across**

  ```bash
  dotnet test week-09/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 🎯 **Say that number out loud and ask them to hold it** — *"Five. Five things about this program are written down as true. That number is the only reason anything I do in the next hour is safe."*

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step

  ```bash
  git add . && git commit -m "week 9: the desk, carried forward"
  ```

---

## 2 · The promise, collected *(slides 2–4)*

- [ ] **Open `week-09/Haldane/Watch.cs`.** <kbd>⌘F</kbd> for **`public double LatestCelsius()`** — one hit
- [ ] 🎯 **Read the method out loud — what it does, not its syntax** — *"Start at minus forty-one point five. Walk every entry on the log. If it turns out to be a reading, remember its temperature. Hand back whatever you were holding at the end. A whole method, to find the newest temperature on the board."*
- [ ] 💡 **Then the receipt** — *"I wrote this in front of you in week six, and I said then that in week nine you would write it in one line. so, I've had 3 weeks to get that right."*

- [ ] 🎞️ **GO TO SLIDE 2** — *A method, and a line*
- [ ] 📖 *"That is the same method twice. Nothing about what it does is different."*

- [ ] ⚠️ **Back in `Watch.cs`. Select from `double latest = -41.5;` down to and including `return latest;`** — both lines appear once in the file — **and paste this over it**

  ```csharp
          return _entries.OfType<Reading>().LastOrDefault()?.Celsius ?? -41.5;
  ```

- [ ] 📖 **Talk the line through, left to right** — *"Start with all of the entries. Keep only the ones that turned out to be a reading — that is `OfType<Reading>`, replaces the `is Reading` that used to be in the `if` statement. `LastOrDefault` returns the last one. Ask for its Celsius. And if there wasn't one, use minus forty-one point five instead."*
- [ ] 💡 **Name the question mark before the dot — it is the single most common way tonight's lab goes wrong** — *"`LastOrDefault` can come back with nothing at all. The question mark before the dot means don't ask a nothing for its Celsius."*
- [ ] 💡 **Point at what is still there** — *"The method is still shaped like a method. Braces, and a `return`. All that changed is what is between them."*

- [ ] **Run it. The board first, because the board is what the room can check**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
  ========================================================
    HALDANE STATION - DUTY CONSOLE
    nearest neighbor: 512 km - winter crew - day 268
  ========================================================

  Outside: -41.5 C   Safe to go out: True
  ```

- [ ] **Press `q`**
- [ ] 🎯 **Then the tests, and this is the beat** — *"Minus forty-one point five, same as it has been all term. Now the part that matters."*

  ```bash
  dotnet test week-09/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 🎯 **Land it plainly. One idea per sentence** — *"I deleted eleven lines of a working program. The board still reads minus forty-one point five. Five tests still pass. That is not proof that nothing broke — a suite only knows the things somebody wrote down. It is five things I did not have to go and check by hand, and before week seven I had none of them."*

- [ ] 🎯 **Now a second, smaller change — and it is a different KIND of change.** *"That is one statement in a method whose whole body is that statement. C# lets you simplify that even further."*
- [ ] **Select the whole method — the four lines from `public double LatestCelsius()` down to and including the `}` under the return — and paste this over them**

  ```csharp
      public double LatestCelsius() =>
          _entries.OfType<Reading>().LastOrDefault()?.Celsius ?? -41.5;
  ```

- [ ] ⚠️ ⚠️ **NAME THE ARROW, because tonight introduces a different one and they are spelled the same** — *"That arrow is not tonight's arrow. You have had this one since week four: `Kind` arrow `"MET"`. `Count` arrow `_entries.Count`. It means this member is one expression. The arrow you are about to meet lives inside the brackets and it means something else."*
- [ ] 📖 **Then the check that matters** — *"And nothing about the program changed. Nothing at all."*

  ```bash
  dotnet test week-09/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 💡 *"Same five. That is twice now."*

- [ ] 🎞️ **GO TO SLIDE 3** — *One shape, every time*
- [ ] 📖 *"Three parts. The list, the word, and the question. Every single thing tonight is that."*

- [ ] 🎞️ **GO TO SLIDE 4** — *Reading it out loud*
- [ ] 📖 *"The arrow reads as goes to. So this whole line is: add up the crew, and the thing to add up about each one is their trips today."*
- [ ] 💡 **The one thing worth saying about the name** — *"The `c` is a name I picked for one crew member at a time. I never write the type, because the compiler already knows what is in the list."*

- [ ] **Back in `Watch.cs`, and the next one is the same shape — this one goes straight to the arrow.** <kbd>⌘F</kbd> for **`public List<SignOut> SignOuts()`** — one hit. **Select the whole method — from that line down to and including the `}` under `return found;` — and paste this over it**

  ```csharp
      public List<SignOut> SignOuts() =>
          _entries.OfType<SignOut>().ToList();
  ```

- [ ] 💡 *"Same arrow as the last one. The whole method is one expression, so the braces go too."*
- [ ] 📖 **Name what came out, and what the `ToList` is for** — *"A new list, a loop, an `is`, an `Add` and a `return` — gone. And the `ToList` on the end is not decoration. Without it this hands back instructions for finding the sign-outs instead of a list of them. Hold on to that. It is the last thing we do before the break."*

- [ ] **One more, and it is a property rather than a method.** <kbd>⌘F</kbd> for **`public int OutsideCount`** — one hit. **Select from that line down to and including the `}` that closes the property — the second of the two `}` in a row under `return outside;`** — and paste this over it

  ```csharp
      public int OutsideCount => SignOuts().Count(s => !s.IsBack);
  ```

- [ ] 📖 *"A counter, a loop, an `if` and a plus-plus. Now it says what it counts: the sign-outs where the person is not back."*
- [ ] ⚠️ **Point at the line and count the arrows out loud — there are two and they are different** — *"The first one is the member: this property is one expression. The second one is inside the brackets, and that is the one from the slide. Same symbol, two jobs, and you will see them together all night."*
- [ ] **Run the tests. Nothing to look at on the board this time**

  ```bash
  dotnet test week-09/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 💡 **Ask for hands rather than asserting anything** — *"Who has changed something in a program, and then gone clicking through the rest of it to check nothing else broke?"* — then stop and let them answer

---

## ☕ Break

---

## 3 · Six more of the same shape *(slides 5–7)*

- [ ] 🎞️ **GO TO SLIDE 5** — *What each word hands back*
- [ ] 📖 **Read the right-hand column, not the left** — *"What matters is not the words, it is what each one hands back. A word that hands back a sequence can have another word after it. A word that hands back one number is the end of the line."*

- [ ] **Now four in a row, and stop explaining after the first.** <kbd>⌘F</kbd> for **`public bool SignOut(CrewMember`** — one hit. **Select from `foreach (SignOut s in SignOuts())` down to and including `Add(new SignOut(Now(), who, reason, expected));`, and paste this over it**

  ```csharp
          if (SignOuts().Any(s => s.Who == who && !s.IsBack))
          {
              return false;
          }

          Add(new SignOut(Now(), who, reason, expected));
  ```

- [ ] 📖 **Say what the loop was really for** — *"That loop existed to answer one yes-or-no question, and it answered it by returning out of the middle of itself. `Any` asks the question out loud instead."*

- [ ] **Next.** <kbd>⌘F</kbd> for **`public bool AmendBackBy`** — one hit. **Select from `foreach (SignOut s in SignOuts())` down to and including `return false;` — inside this method both appear once — and paste this over it**

  ```csharp
          SignOut? open = SignOuts().FirstOrDefault(s => s.Who.Name == name && !s.IsBack);

          if (open == null)
          {
              return false;
          }

          open.Expected = newTime;
          return true;
  ```

- [ ] 📖 **The interesting half is what stayed** — *"The searching is one line now. The `if` that is left was never searching for anything — it is what to do when there was nothing to find. Those were two jobs in one loop, and now they are two lines."*
- [ ] ⚠️ **And the word, because the lab will punish getting it wrong** — *"`FirstOrDefault`, not `First`. There is a `First`, and on an empty list it throws. This method's whole job includes finding nothing."*

- [ ] **Next, and this one is theirs to guess.** <kbd>⌘F</kbd> for **`public bool MarkBack`** — one hit. **Ask what goes here before you paste it.** Then select from `foreach (SignOut s in SignOuts())` down to and including `return false;` and paste

  ```csharp
          SignOut? open = SignOuts().FirstOrDefault(s => s.Who.Name == name && !s.IsBack);

          if (open == null)
          {
              return false;
          }

          open.Back();
          return true;
  ```

- [ ] ⚠️ **And the last one in this file — read the whole instruction before you select.** <kbd>⌘F</kbd> for **`Lookup(List<CrewMember>`** — one hit. **Select from that line down to and including the `}` that closes the method — the FIRST of the two `}` in a row under `return null;`. The second one closes the class and stays. Paste this over it**

  ```csharp
      private static CrewMember? Lookup(List<CrewMember> crew, string name) =>
          crew.FirstOrDefault(c => c.Name == name);
  ```

- [ ] **Run the tests**

  ```bash
  dotnet test week-09/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 💡 *"Five. Still five. Four more loops out of four methods, and I have not looked at the board once while doing it."*

- [ ] **Now `Program.cs`, and this is week five's, spoken out loud back then.** <kbd>⌘F</kbd> for **`int tripsToday = 0;`** — one hit. **Select from that line down to and including `AnsiConsole.MarkupLine($"[{Dim}]{tripsToday} trips logged today.[/]");`, and paste this over it**

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]{crew.Sum(c => c.TripsToday)} trips logged today.[/]");
  ```

- [ ] 🎯 **Collect it by name — this one was a spoken promise** — *"I wrote that loop in front of you in week five. What I said at the time was that it is a lot of typing to add up three numbers."*

- [ ] **And the search, one more time.** <kbd>⌘F</kbd> for **`CrewMember? Find(string wanted)`** — one hit. **Select from that line down to and including the `}` under `return null;` — a blank line follows it, so there is only one — and paste this over it**

  ```csharp
  CrewMember? Find(string wanted) =>
      crew.FirstOrDefault(c => c.Name == wanted);
  ```

- [ ] **Run the program, and look at the whole board this time**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
  Outside: -41.5 C   Safe to go out: True

  ┌───────┬───────────┬─────────┬──────────┬────────┬───────┐
  │ TIME  │ NAME      │ REASON  │ EXPECTED │ STATUS │ TRIPS │
  ├───────┼───────────┼─────────┼──────────┼────────┼───────┤
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  3 trips logged today.
  ```

- [ ] **Press `w` and look up `Reyes`, then `b` and mark her back, then `q`** — every action still works
- [ ] 🎯 **Then the count, and read it off the screen rather than claiming it** — *"Seven methods. Look at the diff - lines inserted compared to lines deleted."*

  ```bash
  git diff --stat
  ```

- [ ] 🎞️ **GO TO SLIDE 6** — *On an empty sequence*
- [ ] ⚠️ **This is the slide to slow down on, because it is the one they will hit tonight** — *"Almost everything here copes with an empty list by handing back something sensible. A few do not. `First` and `Last` and `Single` throw. So does `Average`. And `MaxBy` and `MinBy` hand back nothing at all, so asking the answer for its name throws."*
- [ ] 💡 **And why they never met it before** — *"Your loop could not do this. A loop that walks a list, finds nothing and falls out of the bottom to a `return null` has no way to crash. These do."*

- [ ] 🎞️ **GO TO SLIDE 7** — *What stays a loop*
- [ ] 📖 **The test, in one sentence** — *"A query asks. A loop can do. `Add` puts something in at a position it worked out. `Save` and `Load` make things. None of those is a question."*
- [ ] **Back to `Watch.cs` for the one worth arguing about — the deck is done for now.** <kbd>⌘F</kbd> for **`public void Save(string path)`** — one hit. **Nothing to change here.** Put the cursor on the `else if (entry is FuelCheck f)` line and leave it there
- [ ] 💡 **Say what the one-liner is, and that you wrote it** — *"There is a one-line spelling of this method. I wrote it. It is a `Select` with a `switch` inside it, and it compiles."*
- [ ] 🎯 **Then point at the thing that is not on the screen** — *"Look at the end of this chain. An `if`, two `else if`s, and then nothing. No `else`. An entry this method does not recognize gets skipped, and that is deliberate. A `switch` has to answer for every case, so the one-line version needs one more branch on the end that says: anything else, write an empty string. The day somebody adds a fourth kind of log entry, that version puts a blank line in the file and never mentions it."*
- [ ] 💡 **Land it in one sentence** — *"So the loop stays. A one-liner is not the goal."*
- [ ] 💡 **And where the argument continues, because it is their homework** — *"`Everything` in your own project is the same argument, and the notes have both one-line spellings of it written out."*

- [ ] **Save it. Silent — no push yet**

  ```bash
  git add . && git commit -m "week 9: seven loops, gone"
  ```

---

## 4 · 💥 The muster that lost a name *(slide 8)*

- [ ] 📖 **Set it up as a thing the station does, not as a feature** — *"A muster is a list of who is still outside, written down at the moment you asked. The desk cannot take one yet. It is going to take about eight lines."*

- [ ] **In `Program.cs`. <kbd>⌘F</kbd> for `// ── the desk ───`** — one hit — **and paste this directly under that comment block, above `DrawBoard();`**

  ```csharp
  // The muster the duty officer has written down, if they have taken one.
  var takenMuster = watch.SignOuts().Where(s => !s.IsBack);
  ```

- [ ] ⚠️ **Wait — do not paste that.** Read it to them first and then say why it will not do: *"That takes a muster the moment the program starts, and a duty officer takes one when they want one. It has to start empty."* **Paste this instead**

  ```csharp
  // The muster the duty officer has written down, if they have taken one.
  // Nothing until [u] is pressed.
  IEnumerable<SignOut>? takenMuster = null;
  ```

- [ ] **Now the key.** <kbd>⌘F</kbd> for **`Console.Write("[o]ut  [a]mend  [b]ack  [w]ho  [m]et  [q]uit: ");`** — one hit. Make that line read

  ```csharp
      Console.Write("[o]ut  [a]mend  [b]ack  [w]ho  [m]et  [u] muster  [q]uit: ");
  ```

- [ ] **And the case.** <kbd>⌘F</kbd> for **`            TakeAReading();`** — one hit. **Select from that line down to and including the `break;` under it, and paste this over it**

  ```csharp
              TakeAReading();
              break;

          case "u":
              TheMuster();
              break;
  ```

- [ ] **Then the method itself.** <kbd>⌘F</kbd> for **`void SignSomebodyOut()`** — one hit — **and paste this directly ABOVE that line**

  ```csharp
  // Take a muster, or read back the one already taken.
  void TheMuster()
  {
      if (takenMuster == null)
      {
          takenMuster = watch.SignOuts().Where(s => !s.IsBack);

          AnsiConsole.MarkupLine($"[{Amber}]  Muster taken at {Watch.Now()} - "
              + $"{takenMuster.Count()} unaccounted for.[/]");
          return;
      }

      AnsiConsole.MarkupLine($"[{Amber}]  The muster, as taken - "
          + $"{takenMuster.Count()} unaccounted for:[/]");

      foreach (SignOut s in takenMuster)
      {
          AnsiConsole.MarkupLine($"[{Fg}]    {Markup.Escape(s.Who.Name)}[/] "
              + $"[{Dim}]- {Markup.Escape(s.Reason)}, due {Markup.Escape(s.Expected)}[/]");
      }
  }

  ```

- [ ] 📖 **Read it through, and do not flag anything as wrong** — *"Press `u` once and it takes a muster. Press it again and it reads back the one it took. Everybody outside, not back, written down."*

- [ ] **Run it. Press `u`**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
    Muster taken at 22:47 - 3 unaccounted for.
  ```

- [ ] 🎯 **Three. Say the names off the board so the room is holding them** — *"Lindqvist, Okonkwo, Reyes. Three people on the ice, written down."*
- [ ] **Now press `b` and mark `Okonkwo` back.** The board redraws — two people outside
- [ ] 📖 **Ask before pressing anything, and wait** — *"Okonkwo is in. The muster I took two minutes ago has three names on it. What does it say now?"*
- [ ] 💥 **Press `u`**

  ```
    The muster, as taken - 2 unaccounted for:
      Lindqvist - FUEL, due 10:30
      Reyes - DIG OUT, due 14:45
  ```

- [ ] 💥 **Let it sit. Then be precise about what happened rather than about what is wrong** — *"Okonkwo is gone from a list I wrote down before he came back. Nothing touched that variable. I did not reassign it."*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 8** — *A query is a recipe*
- [ ] 🎯 **The explanation, and it is a mechanism rather than a principle** — *"`Where` did not hand me a list of people. It handed me the instruction walk that list and keep the ones who are not back. The instruction is what got stored, and it runs again every single time anybody looks at it. So when I asked it for a count the second time, it went and looked again — and by then Okonkwo was back."*
- [ ] 💡 **Then the consequence in station terms** — *"That is fine for most questions. It is not fine for a muster. A muster is a record of a moment, and a record that changes afterwards is not a record."*

- [ ] ⚠️ **The fix is two edits and neither is clever.** <kbd>⌘F</kbd> for **`IEnumerable<SignOut>? takenMuster = null;`** — one hit. Make that line read

  ```csharp
  List<SignOut>? takenMuster = null;
  ```

- [ ] **And the line that fills it.** <kbd>⌘F</kbd> for **`takenMuster = watch.SignOuts().Where(s => !s.IsBack);`** — one hit. Make that line read

  ```csharp
          takenMuster = watch.SignOuts().Where(s => !s.IsBack).ToList();
  ```

- [ ] ⚠️ **Two `Count()` calls now object, and that is the compiler being useful.** <kbd>⌘F</kbd> for **`takenMuster.Count()`** — two hits. Change both to **`takenMuster.Count`**, without the brackets
- [ ] 💡 **Say why it complained** — *"A list already knows how many things are in it, so it has a `Count` you read rather than a `Count` you call. The compiler just told us the type changed."*

- [ ] **Run it, and do exactly the same three things: `u`, then `b` and `Okonkwo`, then `u`**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
    Muster taken at 22:52 - 3 unaccounted for.
    The muster, as taken - 3 unaccounted for:
      Lindqvist - FUEL, due 10:30
      Okonkwo - MET RUN, due 15:00
      Reyes - DIG OUT, due 14:45
  ```

- [ ] 🎯 **Land it** — *"Three, and it stays three. `ToList` ran the instruction once, then and there, and kept the answer."*

- [ ] **And now the muster that has been in this file since week five.** <kbd>⌘F</kbd> for **`List<SignOut> muster = watch.SignOuts();`** — one hit. **Select from that line down to and including `AnsiConsole.MarkupLine($"[{Amber}]Muster - still to account for:[/]");`, and paste this over it**

  ```csharp
      List<SignOut> muster = watch.SignOuts().Where(s => !s.IsBack).ToList();

      AnsiConsole.WriteLine();
      AnsiConsole.MarkupLine($"[{Amber}]Muster - still to account for:[/]");
  ```

- [ ] 📖 **Say what came out, and that it is the same question** — *"A copy of the sign-outs, and a loop that crossed the returned ones off the copy. It is the same question the `[u]` key asks, so it is the same line — and it needs the same `ToList` for the same reason."*
- [ ] ⚠️ **And the part that connects it to week five, because it is the half nobody expects** — *"`SignOuts` was already handing back a copy of the list. The copy did not save me. A copied list holds the same records, and `IsBack` lives on the record."*
- [ ] **Press `q`**
- [ ] **Save it. Silent**

  ```bash
  git add . && git commit -m "week 9: the muster is a record"
  ```

---

## ☕ Break

---

## 5 · A season of weather *(slides 9–10)*

- [ ] 🎞️ **GO TO SLIDE 9** — *A season of weather*
- [ ] 📖 **Introduce the file as furniture, not as a feature** — *"Somebody walks out to the masts and reads the temperature off an instrument. That is a MET run, and it is most of why anybody leaves this building. Every one of those readings has been written down since the station opened."*

- [ ] **Open `week-09/season.txt` in the editor.** Let them look at it for a second
- [ ] 📖 **Say what it is and let the size do the work** — *"Same idea as the watch log — fields with a pipe between them. Day, time, temperature, and who went out for it. Every day the station has been open."*
- [ ] 💡 **Then read the count off the editor's own status bar rather than claiming a number** — *"Say what the editor says."*
- [ ] ⚠️ **Close it again.** A 50,000-line file open in an editor is a scrolling hazard for the rest of the night

- [ ] **Two files, and neither is tonight's lesson. New file `week-09/Haldane/SeasonReading.cs`**

  ```csharp
  // One line out of the station's met book.
  public class SeasonReading
  {
      public int Day { get; }
      public string Time { get; }
      public double Celsius { get; }

      // A NAME, not a CrewMember. The met book is paper.
      public string TakenBy { get; }

      public SeasonReading(int day, string time, double celsius, string takenBy)
      {
          Day = day;
          Time = time;
          Celsius = celsius;
          TakenBy = takenBy;
      }
  }
  ```

- [ ] 📖 **One sentence and move on** — *"Four facts and a constructor. It answers nothing about itself, because tonight every question comes from outside."*

- [ ] **New file `week-09/Haldane/Season.cs`**

  ```csharp
  // The met book, read off disk.
  //
  // Same shape as Watch.Load: one line per reading, fields kept apart by a
  // character that cannot appear in a field. Nothing new this week — which is
  // the point. The file was already something this program could read. What
  // week 9 adds is what you can ASK once it is in your hands.
  //
  // ⚠️ Read() STAYS A LOOP. It makes fifty thousand objects and puts them in a
  // list; that is doing, not asking. It is also the whole cost of the evening,
  // and §6 is where the room finds that out.
  using System.Globalization;

  public static class Season
  {
      // What day of the season it is: the day on the last line anybody wrote.
      //
      // ⚠️ The station does not keep the date in its head, and it is NOT typed
      // into this program. Until week 9 it was — a literal in the banner, edited
      // by hand every week — which is how the console came to be showing day 268
      // while its own met book stopped at 250. A number the program can work out
      // is a number the program should work out.
      //
      // ⚠️ And there is no cheap way to do this. Reading the LAST line of a text
      // file means walking the whole file, because nothing in it says where the
      // last line starts. Measured: 1.6-2.2 ms for the lazy read against 1.3 ms
      // for reading the whole thing. That is §6's argument, arriving early and
      // for free — even "what day is it" costs the entire book.
      public static int LatestDay(string path)
      {
          string? last = File.ReadLines(path).LastOrDefault();

          return last != null && int.TryParse(last.Split('|')[0], out int day)
              ? day
              : 1;
      }

      public static List<SeasonReading> Read(string path)
      {
          List<SeasonReading> book = new List<SeasonReading>();

          foreach (string line in File.ReadAllLines(path))
          {
              string[] field = line.Split('|');

              if (field.Length == 4
                  && int.TryParse(field[0], out int day)
                  && double.TryParse(field[2], NumberStyles.Float,
                      CultureInfo.InvariantCulture, out double celsius))
              {
                  book.Add(new SeasonReading(day, field[1], celsius, field[3]));
              }
          }

          return book;
      }
  }
  ```

- [ ] 📖 **Name it as last week's, and say it stays a loop** — *"This is week eight. Split the line, check the fields, make the thing, put it on the list. It stays a loop because it is making fifty thousand objects, and making is not asking."*

- [ ] **Now the questions. In `Program.cs`, <kbd>⌘F</kbd> for `string logFile` — one hit — and paste this directly under that line**

  ```csharp
  // The met book. It has been in this folder since the season started, and
  // nothing has ever asked it anything.
  string metBook = "week-09/season.txt";
  ```

- [ ] 🎯 **Now the line from §1.** <kbd>⌘F</kbd> for **`string metBook`** — one hit — **and paste this directly under it**

  ```csharp

  // What day of the season it is — read off the last line of the met book
  // rather than typed into this file. Every week until tonight, that number
  // was a literal in the banner and I changed it by hand.
  int day = Season.LatestDay(metBook);
  ```

- [ ] 🎯 **And now delete the literal.** <kbd>⌘F</kbd> for **`winter crew - day 268`** — one hit. Make that line read

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbor: 512 km - winter crew - day {day}[/]");
  ```

- [ ] 🎯 **Land it, and it is a small thing that is worth the thirty seconds** — *"That number is not in this program any more. It comes off the last line of the met book, which is the last thing anybody wrote down. If somebody goes out tomorrow and writes a line, the console knows what day it is without me touching it."*
- [ ] ⚠️ **Then the honest half, because they will ask** — *"And there is no cheap way to read the last line of a file. To find it, the program walked all fifty thousand lines. Nothing in a text file says where the last line starts. Hold on to that. It is the next segment."*

- [ ] **The key.** <kbd>⌘F</kbd> for **`[u] muster  [q]uit: ");`** — one hit. Make that line read

  ```csharp
      Console.Write("[o]ut  [a]mend  [b]ack  [w]ho  [m]et  [u] muster  [s]eason  [q]uit: ");
  ```

- [ ] **And the case.** <kbd>⌘F</kbd> for **`            TheMuster();`** — one hit. **Select from that line down to and including the `break;` under it, and paste this over it**

  ```csharp
              TheMuster();
              break;

          case "s":
              TheMetBook();
              break;
  ```

- [ ] **Then the report.** <kbd>⌘F</kbd> for **`void DrawBoard()`** — one hit — **and paste this directly ABOVE that line**

  ```csharp
  // Six questions about the whole season. Six lines.
  //
  // Then the last three lines of it, which are the honest half of the evening:
  // what it cost to be able to ask any of them.
  void TheMetBook()
  {

      List<SeasonReading> book = Season.Read(metBook);


      // Six questions. Every one of them is the same shape: the sequence, and
      // what to ask of each thing in it.
      int readings = book.Count;
      int days = book.Max(r => r.Day);
      double average = book.Average(r => r.Celsius);
      SeasonReading coldest = book.MinBy(r => r.Celsius)!;
      int belowTheLine = book.Count(r => r.Celsius < -50);
      int moretti = book.Count(r => r.TakenBy == "Moretti");
      List<SeasonReading> worst = book.Where(r => r.Celsius < -60)
          .OrderBy(r => r.Celsius)
          .Take(5)
          .ToList();


      AnsiConsole.WriteLine();
      AnsiConsole.MarkupLine($"[{Amber} bold]  MET BOOK - the season so far[/]");
      AnsiConsole.MarkupLine($"[{Dim}]  {readings:N0} readings over {days} days[/]");
      AnsiConsole.WriteLine();

      AnsiConsole.MarkupLine($"[{Dim}]  season average[/]        [{Cold}]{average:0.0} C[/]");
      AnsiConsole.MarkupLine($"[{Dim}]  coldest[/]               [{Cold}]{coldest.Celsius:0.0} C[/] "
          + $"[{Dim}]on day {coldest.Day} at {coldest.Time}, taken by {coldest.TakenBy}[/]");
      AnsiConsole.MarkupLine($"[{Dim}]  below -50[/]             [{Fg}]{belowTheLine:N0}[/] "
          + $"[{Dim}]readings[/]");
      AnsiConsole.MarkupLine($"[{Dim}]  Moretti took[/]          [{Fg}]{moretti:N0}[/] "
          + $"[{Dim}]of them[/]");
      AnsiConsole.WriteLine();

      AnsiConsole.MarkupLine($"[{Dim}]  the five coldest readings in the book:[/]");

      foreach (SeasonReading r in worst)
      {
          AnsiConsole.MarkupLine($"[{Dim}]    day {r.Day,-4} {r.Time}[/]  "
              + $"[{Cold}]{r.Celsius:0.0} C[/]  [{Fg}]{Markup.Escape(r.TakenBy)}[/]");
      }

  }
  ```

- [ ] **Run it and press `s`**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
    MET BOOK - the season so far
    50,000 readings over 268 days

    season average        -43.1 C
    coldest               -68.6 C on day 102 at 22:05, taken by Nakamura
    below -50             14,834 readings
    Moretti took          16,996 of them

    the five coldest readings in the book:
      day 102  22:05  -68.6 C  Nakamura
      day 137  23:32  -68.3 C  Moretti
      day 156  20:32  -68.1 C  Lindqvist
      day 117  05:45  -68.0 C  Okonkwo
      day 126  07:07  -67.7 C  Reyes
  ```

- [ ] 🎞️ **GO TO SLIDE 10** — *Six questions, six lines*
- [ ] 🎯 **Point at the count, not at the cleverness** — *"Six answers. Fifty thousand readings. Six lines of code."*
- [ ] 💡 **And the last one is the only one tonight with more than one word in it** — *"Below minus sixty, then in order, then stop at five. One line, and each step hands the next one a sequence to work on. That is the whole of what the middle column on that slide was for."*
- [ ] 💡 **Then the two the room should notice, and let them find the second** — *"Moretti is the met tech, so of course she took a third of them. And look who took the coldest reading of the season: the chef, at ten at night, in midwinter."*
- [ ] ⚠️ **Do not skip this one — it is the honest sell** — *"Nobody was going to write a loop to find out how many readings this season were below minus fifty. Not because it is hard. Because it was never worth the loop. So the question never got asked."*
- [ ] **Press `q`**

---

## 6 · 💥 What it cost *(slide 11)*

- [ ] 📖 **Ask before you measure anything, and let somebody guess** — *"That was fifty thousand rows. How long do you think it took?"*
- [ ] 💡 *"Nobody is going to be impressed by the answer, and that is the point of the segment."*

- [ ] **In `TheMetBook`, <kbd>⌘F</kbd> for `List<SeasonReading> book = Season.Read(metBook);`** — one hit. **Select that one line and paste this over it**

  ```csharp
      long beforeRead = GC.GetTotalMemory(true);
      System.Diagnostics.Stopwatch clock = System.Diagnostics.Stopwatch.StartNew();

      List<SeasonReading> book = Season.Read(metBook);

      long readMs = clock.ElapsedMilliseconds;
      long held = GC.GetTotalMemory(true) - beforeRead;
      clock.Restart();
  ```

- [ ] ⚠️ **Now stop the clock, and stop it in the right place** — the last question is the last thing it should be timing. <kbd>⌘F</kbd> for **`List<SeasonReading> worst = book.Where(r => r.Celsius < -60)`** — one hit. **Select from that line down to and including the `.ToList();` under it, and paste this over it**

  ```csharp
      List<SeasonReading> worst = book.Where(r => r.Celsius < -60)
          .OrderBy(r => r.Celsius)
          .Take(5)
          .ToList();

      double askMs = clock.Elapsed.TotalMilliseconds;
  ```

  - 💡 **Worth ten seconds** — *"The clock stops here, not at the bottom. Everything below this line is printing, and printing is not asking."*

- [ ] **And the bill goes on the end.** <kbd>⌘F</kbd> for **`{Markup.Escape(r.TakenBy)}[/]");`** — one hit. **Select from that line down to and including the `}` that closes `TheMetBook` — the one on its own at no indentation — and paste this over it**

  ```csharp
              + $"[{Cold}]{r.Celsius:0.0} C[/]  [{Fg}]{Markup.Escape(r.TakenBy)}[/]");
      }

      AnsiConsole.WriteLine();
      AnsiConsole.MarkupLine($"[{Amber}]  what that cost:[/]");
      AnsiConsole.MarkupLine($"[{Dim}]    reading the file[/]     [{Fg}]{readMs} ms[/] "
          + $"[{Dim}]for all {readings:N0} lines[/]");
      AnsiConsole.MarkupLine($"[{Dim}]    asking the questions[/] [{Fg}]{askMs:0.0} ms[/]");
      AnsiConsole.MarkupLine($"[{Dim}]    the book, in memory[/]  "
          + $"[{Fg}]{held / 1024.0 / 1024.0:0.0} MB[/] "
          + $"[{Dim}]from a {new FileInfo(metBook).Length / 1024.0 / 1024.0:0.0} MB file[/]");
  }
  ```

- [ ] 📖 **One sentence on the two unfamiliar calls** — *"A stopwatch, and a question to the runtime about how much memory is in use. Neither one is this week's lesson. They are how we get an honest number instead of a guess."*

- [ ] **Run it and press `s`**

  ```bash
  dotnet run --project week-09/Haldane
  ```

  ```
    what that cost:
      reading the file     9 ms for all 50,000 lines
      asking the questions 5.5 ms
      the book, in memory  11.8 MB from a 1.1 MB file
  ```

- [ ] ⚠️ **Read the two millisecond figures off YOUR screen, not off this sheet or the slide.** They move every run, which is why the slide carries only the memory line
- [ ] 🎯 **Then the three facts, one at a time, in this order**
  - 📖 *"Reading the file cost more than all six questions put together. The queries are not the expensive part. Getting the list is."*
  - 📖 *"It read all fifty thousand lines to answer every one of them. To find the single coldest reading in the season, it built fifty thousand objects."*
  - 💥 *"And a file that is one point one megabytes on disk is eleven point eight megabytes once it is in the program. Ten times bigger, held for as long as I want to keep asking questions."*

- [ ] 🎞️ **GO TO SLIDE 11** — *What it cost*
- [ ] 🎯 **Then hand them the arithmetic instead of doing it** — *"That is one season. Haldane has been open since nineteen ninety-four."* — and stop
- [ ] ⚠️ **Say the limit plainly, and make it about what a file IS** — *"This is not a speed problem and it does not get better on a faster laptop. A file cannot answer a question without being read all the way through, because a file does not know anything about what is in it. It is a row of characters. Every question costs the whole thing."*
- [ ] 🎯 **And make the promise, in as many words** — *"Querying a file is going to stop being good enough. Something that could answer that question where the data lives would read five readings and hand me five readings. That is week ten. And the query running inside it is week twelve."*
- [ ] **Press `q`**
- [ ] **Save it, and this is the one that pushes**

  ```bash
  git add . && git commit -m "week 9: the met book, and what it cost"
  ```

  - 💡 Then **Sync** in the Source Control view — one push, four commits

---

## 7 · Hand off *(slide 12)*

- [ ] 🎞️ **GO TO SLIDE 12** — *Lab: the night's numbers*
- [ ] 📖 **Say what is different about tonight's lab, because it is genuinely different** — *"Your first task is to delete seven working loops, and no check goes green when you do. The count stays where it started. Your own test suite is how you find out it worked."*
- [ ] 💡 **Then what the checks are for** — *"Then four questions the desk could not ask before tonight. Which cart is long enough to cover the news. What has not been out yet. What got worked hardest. And what is coming up, without putting any of it on the air."*
- [ ] ⚠️ **And the one warning worth giving out loud** — *"When you write a `MaxBy`, ask yourself what it does on an empty list. That is check one going red, and it will be the most common thing in the room tonight."*
- [ ] **Slide 12 stays up for the lab**

---

## Lab · 50 minutes

- [ ] **Circulate.** The two places to stand:
  - **Task 1**, `TheRegular` — a `MaxBy` with no `?.` and no `??`. It throws, check 1 goes red, and the message names it. **Let them read the message first**
  - **Task 4**, `TopPlayed` — `List.Sort` instead of `OrderByDescending`. It looks right and it has quietly reordered the rotation

---

## 8 · Wrap *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Tonight, in one picture*
- [ ] 📖 *"One shape, and a handful of words. Some of them throw when there is nothing there. A query asks — it never changes the thing it asked about. And `ToList` is what turns instructions into an answer."*
- [ ] **Homework: three questions on their own registry, and one fact of their own** — say the checks-copy line, and that this week's `Project.Checks` holds **four** checks
- [ ] ⚠️ **Say the due date normally** — *"Next class."* Last week was the two-week one; this week is not
- [ ] **Two URLs in Canvas, coursework first**
- [ ] 💡 **And the one sentence that sets up next week** — *"Next week the log moves somewhere that is not your laptop."*

---

**Prev:** [Week 8 Demo — The Log Stops Being Gone](../../week-08/demo/) · **Next:** Week 10 Demo *(coming)*
