# Week 7 Demo — The Checks Stop Being Magic 🧊

**Haldane Station · duty console · day 254**

Tonight the console gets caught keeping two wrong records — and the room finds out that the thing that has been grading them all semester is a thing they can write.

> **The shape of the night:** two bugs on the board → a check you cannot write, because the rules live in `Program.cs` → the move → a test project of our own → red, then green — twice.

**Total: ~140 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-07/demo/script.html) and confirm the top line says *day 254*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 7's board is up. Say nothing about it
- [ ] ⚠️ **Put week 6's folder back to its finished state — §1 copies out of it.** Whatever you did to it while rehearsing, this makes tonight's carry-forward correct:

  ```bash
  cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-06/demo-starter/Haldane/*.cs week-06/Haldane/
  ```

  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector. The instructor notes live beside them in `demo-starter/NOTES.md`
  - ⚠️ **No `week-06/Haldane` at all?** Make it first, from the same place:

    ```bash
    cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
      && dotnet new console -o week-06/Haldane \
      && dotnet add week-06/Haldane package Spectre.Console --version 0.57.2
    ```

    Then run the copy above.
- [ ] **Commit the restore before you start** — it always shows up as changes, and that is expected. Commit it on `main` so tonight's first commit is tonight's work and nothing else

  ```bash
  git add . && git commit -m "week 6 demo, restored from the answer key"
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 6 left it, with `week-01/` through `week-06/` in it
- [ ] ⚠️ **Run `dotnet run --project week-06/Haldane` once before class.** §1 opens by running it, so it has to build on the night — a cold NuGet cache in front of the room is a slow first minute
- [ ] ⚠️ **Delete `week-07/` from the demo repo if you've rehearsed** — both `week-07/Haldane` *and* `week-07/Haldane.Tests`. `dotnet new` refuses to overwrite either, and tonight creates both
- [ ] **The starters repo open in a browser tab, ready but not showing** — `github.com/jgrissom/dotnet-db-starters`, at `week-06/Lab.Checks/HourChecks.cs`. §4's reveal points at it
- [ ] 💡 **No debugger tonight.** The new instrument is the test — if a value surprises you mid-demo, the week-5 offer still stands, quietly
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station that is not this one"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. The console finally writes everything down — sign-outs, readings, the fuel dip, one log, in order"*

  ```bash
  dotnet run --project week-06/Haldane
  ```

- [ ] **Press `m`, and have `Nakamura` phone in a reading of `-43.1`.** The log grows by a line, the headline number changes

  ```
  Outside: -43.1 C   Safe to go out: True
  ```

- [ ] 📖 **Fast — this is a refresher, not a re-teach:** *"a log that takes three different kinds of things, a board that is just the log filtered, and a headline temperature that comes off the last reading anybody took"*
- [ ] 🎯 **Then the question the night runs on, and let it sit:** *"here is what I want to know tonight. This console keeps the record a search party would use. How do I know what it says is TRUE? Not 'it compiles' — week one killed that idea. Not 'it looks right on the projector' — you're about to see what that's worth. How do I KNOW?"*
- [ ] **Press `q` to close the desk**

- [ ] **Branch first, and say it as you type it** — *"a branch for tonight, same as every week. Nothing goes straight to `main`, and that goes for your project too"*

  ```bash
  git checkout -b red-then-green
  ```

- [ ] **Now make this week's folder.** No commentary — they have watched this six times

  ```bash
  dotnet new console -o week-07/Haldane
  ```

- [ ] **Carry last week forward — seven files now, the whole program**

  ```bash
  cp week-06/Haldane/*.cs week-07/Haldane/
  ```

- [ ] 📖 *"Seventh week, and this program has not been written from scratch since week three. Neither has yours"*

- [ ] **Add the package**

  ```bash
  dotnet add week-07/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] **Open `week-07/Haldane/Program.cs`, and move the date on.** <kbd>⌘F</kbd> for **`day 247`** — one hit. Make it read

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbor: 512 km - winter crew - day 254[/]");
  ```

- [ ] **Run it** — the desk they know, one week on

  ```bash
  dotnet run --project week-07/Haldane
  ```

- [ ] **Press `q`**

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step

  ```bash
  git add . && git commit -m "week 7: the desk, carried forward"
  ```

---

## 2 · Two bugs on the board *(slides 2–4)*

- [ ] 📖 *"So. The station's whole reason for keeping this board is one number: how many people are on the ice. Watch me break it without touching the code"*

- [ ] **Run it, press `o`, and sign `Okonkwo` out — `DIG OUT`, back by `15:30`.** He is already on the board, out on a MET RUN

  ```bash
  dotnet run --project week-07/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 2     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 14:57 │ Okonkwo   │ DIG OUT │ 15:30    │ OUT    │ 2     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  ```

- [ ] 💥 **Do not point at it. Ask, and wait:** *"the board says four people are outside. Count the people"*
- [ ] 🎯 **Then say it flat:** *"Three. Okonkwo is on that board twice — one man, two open trips, and he can't be on both of them. On the night somebody doesn't come back, this board is what the search party reads, and it just told them to look for a fourth person who does not exist"*
- [ ] 💡 **If somebody spots the TRIPS column jumped to 2 on both his rows — take it, it's right:** *"the count belongs to the person, not the row. Both rows read the same man, so both rows moved. That's week five, testifying against us"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 2** — *Three people on the ice*

- [ ] 📖 **Name what kind of failure this is:** *"no exception, no warning, nothing red anywhere. The program did exactly what I typed into it. It is just wrong — and the compiler has no opinion about wrong. That is week one's lesson, and tonight it finally costs us something"*

- [ ] **Second one. Run it again — `b`, `Reyes` comes back. Then `o`, sign her out again — `WALK`, back by `15:30`. Then `a`, amend `Reyes` to `16:00`**

  ```bash
  dotnet run --project week-07/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 16:00    │ back   │ 2     │
  │ 14:57 │ Reyes     │ WALK    │ 15:30    │ OUT    │ 2     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  3 people outside.
  ```

- [ ] 💥 **Point at the third row:** *"Reyes radioed in a new return time for her walk, and the desk wrote it on her LAST trip — the dig-out she already came back from. A closed record got rewritten, and her real trip still says she's due at 15:30. She isn't"*
- [ ] 📖 **The cause, in one sentence each:** *"two bugs. Sign-out never asks whether you're already outside. Amend takes the first row with your name on it, finished or not. Both have been in this program for weeks"*
- [ ] 💡 **If anybody found either of these on their own machine in the last few weeks — collect it:** *"some of you may have hit one of these playing with the desk. This is the week I meant when I said we'd deal with it"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 3** — *How long does a fix stay fixed?*

- [ ] 📖 *"Now — I can fix both of these tonight, and I will. Here is the question I actually care about: how do I know they're still fixed in week ten? This program changes every single week. You watched me rewrite half of it last week. If the only check is me trying it by hand tonight, then tonight is the last time anybody checks"*
- [ ] 🎯 **Let the room propose it, then price it:** *"run the program and try it? Sure. That's what we just did — sign him out twice, mark her back, amend, read the board. Two minutes, at the keyboard, by a person. Every run. Every week. For every rule this program has. Nobody does that, and I have eleven weeks of evidence"* — **and stop there. Do not say what the evidence is yet**
- [ ] 📖 **The idea, plainly:** *"what I want is a program whose job is to check MY program — asks the same questions every time, in under a second, and complains when an answer changes. That exists. You have been graded by one since week one"*

- [ ] 🎞️ **GO TO SLIDE 4** — *Nothing can call Program.cs*

- [ ] 🎯 **The wall, and it is week 1's rule arriving with a bill:** *"so let's write one. First problem: the rule 'you can't go out twice' lives inside `SignSomebodyOut`, which is a local function in `Program.cs`. Week one, first night, I told you: code in `Program.cs` cannot be called, tested, or graded by anyone. Four weeks of homework have banned logic in your `Program.cs` for exactly this moment. A check is just a caller — and there is nothing here for it to call"*
- [ ] 📖 **Set up the segment after the break:** *"so before we can test anything, these rules have to become methods on a class. That's first"*

---

## 3 · The move *(slides 5–6)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Move it. Don't fix it.*

- [ ] 📖 **The discipline, before any code:** *"we are about to move the log and every rule about it out of `Program.cs` and into a class. And we are NOT going to fix the bugs while we do it. Two reasons. If I move and fix in one go and something changes, I don't know which act did it. And I want you to watch a test fail against a real bug before anything gets fixed tonight"*

- [ ] **New file, `week-07/Haldane/Watch.cs`.** Paste the whole thing

  ```csharp
  // The watch: the log, and every rule the desk enforces about it.
  //
  // Every method in here used to be a local function in Program.cs — a real
  // rule, really enforced, and completely out of reach: nothing outside that
  // file could call one. Moving them here changed nothing about what they do.
  // It made them public methods on a class, which is the only shape another
  // project can call.
  //
  // That is why tonight's tests can exist. A test is just one more caller.
  public class Watch
  {
      private readonly List<ILogEntry> _entries = new List<ILogEntry>();

      public void Add(ILogEntry entry)
      {
          _entries.Add(entry);
      }

      public int Count => _entries.Count;

      // A copy, for the same reason as every week since four.
      public List<ILogEntry> All()
      {
          return new List<ILogEntry>(_entries);
      }

      // Every sign-out on the log, and nothing else. `is` asks an entry what
      // it actually turned out to be, and hands it over under that name.
      public List<SignOut> SignOuts()
      {
          List<SignOut> found = new List<SignOut>();

          foreach (ILogEntry entry in _entries)
          {
              if (entry is SignOut s)
              {
                  found.Add(s);
              }
          }

          return found;
      }

      // How many people are on the ice right now. The number this whole
      // station exists to keep right.
      public int OutsideCount
      {
          get
          {
              int outside = 0;

              foreach (SignOut s in SignOuts())
              {
                  if (!s.IsBack)
                  {
                      outside++;
                  }
              }

              return outside;
          }
      }

      // Sign somebody out: a new record, straight onto the log.
      public void SignOut(CrewMember who, string reason, string expected)
      {
          _entries.Add(new SignOut("14:57", who, reason, expected));
      }

      // A new return time, radioed in.
      public bool AmendBackBy(string name, string newTime)
      {
          foreach (SignOut s in SignOuts())
          {
              if (s.Who.Name == name)
              {
                  s.Expected = newTime;
                  return true;
              }
          }

          return false;
      }

      public bool MarkBack(string name)
      {
          foreach (SignOut s in SignOuts())
          {
              if (s.Who.Name == name && !s.IsBack)
              {
                  s.Back();
                  return true;
              }
          }

          return false;
      }

      // The last temperature anybody wrote down. Same filter, different type.
      public double LatestCelsius()
      {
          double latest = -41.5;

          foreach (ILogEntry entry in _entries)
          {
              if (entry is Reading r)
              {
                  latest = r.Celsius;
              }
          }

          return latest;
      }
  }
  ```

- [ ] 📖 **Walk it top to bottom, fast — it is all furniture they know:** *"a private list, `Add`, `Count`, a copy — the same shape as `Hour` last week and the same shape as your own `Registry` since week four. Then every helper the desk had: the sign-out filter, the outside count off the bottom of the board, sign somebody out, amend, mark back, the latest temperature. Nothing new was written. It moved"*
- [ ] 🎯 **And point at the two bugs riding along — <kbd>⌘F</kbd> for `radioed in`, put the cursor on the `if` below it:** *"both bugs came with us. Sign-out still doesn't ask. Amend still takes any row with your name on it — look, no question about whether the trip is over. Moved, not fixed"*
- [ ] 💡 **Your own project got this shape for free** — *"notice what you did NOT have to do this week: your `Registry` was born a class a check can call, in week four. Haldane is the one catching up"*

- [ ] **Now point `Program.cs` at it. First the seeds.** In `week-07/Haldane/Program.cs`, <kbd>⌘F</kbd> for **`// ── the watch log`** — one hit. **Select from that line down to and including `log.Add(new Reading("14:35", -41.5, bhatt));`** and paste this over the lot

  ```csharp
  // ── the watch ──────────────────────────────────────────────────────────────
  // The log lives in Watch.cs now, along with every rule about what goes on
  // it. This file is down to what it should have been all along: prompts,
  // paint, and a loop. The rules are methods on a class now, so something
  // other than this file can call them.

  Watch watch = new Watch();

  watch.Add(new FuelCheck("07:40", 4300));
  watch.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
  watch.Add(new Reading("12:00", -39.8, moretti));
  watch.Add(new SignOut("14:20", okonkwo, "MET RUN", "15:00"));
  watch.Add(new SignOut("14:20", reyes, "DIG OUT", "14:45"));
  watch.Add(new Reading("14:35", -41.5, bhatt));
  ```

- [ ] 🎯 **Build it broken, on purpose**

  ```bash
  dotnet build week-07/Haldane
  ```

- [ ] 📖 **Read the error list off the screen — don't count it, point at it:** *"every one of those lines is a place in `Program.cs` still calling the old names. The compiler just wrote the moving checklist for me. We work down it"*

- [ ] 🎯 **First, read the old shape while it is still on screen.** <kbd>⌘F</kbd> for **`void AmendABackBy()`** — one hit. Put the cursor on `DrawBoard();` inside the loop, then on the amber `Nobody outside by that name` line under it: *"Two things can happen in this method. We find her, we write the new time, we redraw the board — that is this line, in here. Or the loop runs out and nobody by that name is outside — that is this line, down here. Watch where those two end up"*

- [ ] **Now the edit — and the prompts are staying put, so don't select them.** Still in `AmendABackBy`. **Leave the four lines under it alone.** Select from **`foreach (SignOut s in SignOuts())`** down to and including **`AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");`** — and paste this over them

  ```csharp
      if (watch.AmendBackBy(name, newTime))
      {
          DrawBoard();
      }
      else
      {
          AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");
      }
  ```

- [ ] 📖 **Point at the `if`, then at the `else`:** *"Those two endings were both already in this method. Redrawing the board was buried in the middle of the search — three lines ago it sat inside the loop. Saying nobody is outside was stranded underneath it, and the only way to reach it was for the loop to run out. Taking the search away is what let them come and sit next to each other, which is what they always were: the two things that can happen"*

- [ ] 🎯 **Then the `bool`, and this is the part to slow down for. Put the cursor on `watch.AmendBackBy(name, newTime)`:** *"And now look at why that method hands back true or false. In the old version, `return` was doing two jobs at once — it stopped the looking, and it meant we found her. Both, in one word. The moment the loop moves into `Watch`, `return` can only do the first job: it stops the loop in there. So the news has to travel back some other way, and the way it travels is a yes or a no."*

- [ ] 📖 **Last, the half that did not move — cursor at the top of the method, on the prompts:** *"And notice what I did not select. The two prompts and the two `ReadLine`s are untouched, because asking a human a question is this file's job and always will be"*

- [ ] *"Same again for mark-back — same two lines, same restraint."* <kbd>⌘F</kbd> for **`void MarkSomebodyBack()`** — one hit. **The prompt above stays.** Select from **`foreach (SignOut s in SignOuts())`** down to and including **`AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");`** and paste this over them

  ```csharp
      if (watch.MarkBack(name))
      {
          DrawBoard();
      }
      else
      {
          AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");
      }
  ```

- [ ] **The sign-out itself.** <kbd>⌘F</kbd> for **`log.Add(new SignOut("14:57"`** — one hit. Make that line read

  ```csharp
          watch.SignOut(who, reason.Trim(), expected.Trim());
  ```

- [ ] **The reading.** <kbd>⌘F</kbd> for **`log.Add(new Reading("15:02"`** — one hit. Make that line read

  ```csharp
      watch.Add(new Reading("15:02", celsius, who));
  ```

- [ ] **Now delete the two helpers that moved.** <kbd>⌘F</kbd> for **`// Every sign-out on the log`** — one hit, near the bottom. **Select from that line to the end of the file** (<kbd>⇧⌘↓</kbd>) and delete it — `SignOuts()` and `LatestCelsius()` both live in `Watch.cs` now

- [ ] **The log loop.** <kbd>⌘F</kbd> for **`entry in log`** — one hit, in `DrawLog`. Make that line read

  ```csharp
      foreach (ILogEntry entry in watch.All())
  ```

- [ ] **Five calls still use the old names.** Open Replace (<kbd>⌥⌘F</kbd>), put **`SignOuts()`** in the find box and **`watch.SignOuts()`** in the replace box — the editor says how many it found; read it off the screen — and **Replace All**
- [ ] ⚠️ **Once.** Run it twice and every call reads `watch.watch.` — undo and do it again if the count looked wrong

- [ ] **And the last one.** <kbd>⌘F</kbd> for **`LatestCelsius()`** — one hit left, in `DrawBoard`. Make that line read

  ```csharp
      double latest = watch.LatestCelsius();
  ```

- [ ] **One more, because the move earned it — the board's headline count.** <kbd>⌘F</kbd> for **`int stillOut = 0;`** — one hit, in `DrawBoard`. **Select from that line down to and including `AnsiConsole.MarkupLine($"[{Dim}]{stillOut} people outside.[/]");`** and paste this over the lot

  ```csharp
      AnsiConsole.MarkupLine($"[{Dim}]{watch.OutsideCount} people outside.[/]");
  ```

- [ ] 💡 *"the number this whole station exists to keep right was a counting loop at the bottom of a paint method. Now it is a question the watch answers — hold on to `OutsideCount`, because a test asks it that same question within the hour"*

- [ ] **Build it again**

  ```bash
  dotnet build week-07/Haldane
  ```

  ```
  Build succeeded.
      0 Warning(s)
      0 Error(s)
  ```

- [ ] 🎯 **Run it, and prove the move changed nothing — do §2's break again: `o`, `Okonkwo`, `DIG OUT`, `15:30`**

  ```bash
  dotnet run --project week-07/Haldane
  ```

  ```
  4 people outside.
  ```

- [ ] 📖 **Flat:** *"Same desk, same board, same wrong answer. That is what I wanted. A move should not change how the program behaves, and this one did not — the bugs are still here too. The rules live somewhere else now. They are public methods on a class, and any other project can call them by name. That is the only reason we moved them"*
- [ ] **Press `q`**

- [ ] 🎞️ **GO TO SLIDE 6** — *Now something can call them*

- [ ] 📖 **Collecting six weeks, and say it slowly:** *"Week one I told you to put your logic in a class, so that a check can call it. You have done that in every homework since. Tonight you saw why. The rule about signing somebody out was sitting in `Program.cs`, and no test could reach it there. We moved it into a class, and the program still does exactly what it did before. Moving it cost us nothing"*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The rules move into Watch, bugs and all"
  ```

---

## 4 · A project that asks questions *(slides 7–9)*

- [ ] 📖 *"Now the thing that calls them. It is a project — a whole separate program, whose only job is to ask mine questions"*

- [ ] **Make it, from the terminal.** A new template — not `console`, and say so as you type it

  ```bash
  dotnet new xunit -o week-07/Haldane.Tests
  ```

- [ ] 📖 *"`xunit` is a template like `console` is a template. xUnit is the library it wires up — the most ordinary test library in .NET. This is not course equipment. It is what the industry runs"*

- [ ] **Point it at the desk**

  ```bash
  dotnet add week-07/Haldane.Tests reference week-07/Haldane
  ```

- [ ] 📖 *"one line: the test project can see the desk's classes. The same wiring has been in every lab folder you've ever copied"*

- [ ] ⚠️ **Reload the window** — new folder, same reason as every week. Command Palette (<kbd>⇧⌘P</kbd>) →

  ```
  Developer: Reload Window
  ```

- [ ] **Trim the template. Open `week-07/Haldane.Tests/Haldane.Tests.csproj`**, select the whole file (<kbd>⌘A</kbd>), and paste this over it

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
      <TargetFramework>net10.0</TargetFramework>
      <ImplicitUsings>enable</ImplicitUsings>
      <Nullable>enable</Nullable>
      <IsPackable>false</IsPackable>
      <!-- List every test, passed and failed, not just the failures. -->
      <VSTestLogger>console%3Bverbosity=normal</VSTestLogger>
    </PropertyGroup>

    <ItemGroup>
      <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.14.1" />
      <PackageReference Include="xunit" Version="2.9.3" />
      <PackageReference Include="xunit.runner.visualstudio" Version="3.1.4" />
    </ItemGroup>

    <ItemGroup>
      <Using Include="Xunit" />
    </ItemGroup>

    <ItemGroup>
      <ProjectReference Include="..\Haldane\Haldane.csproj" />
    </ItemGroup>

  </Project>
  ```

- [ ] 💡 **Ten seconds, not a lecture:** *"Same versions the template gave us. I took out a coverage tool we do not need this term, and I added one setting: it lists every test by name, passed and failed. You have been reading that setting's output since week one"*

- [ ] **One more small file. New file, `week-07/Haldane.Tests/Directory.Build.rsp`** — paste the whole thing

  ```
  # MSBuild reads this automatically. -tl:off turns off the terminal logger, which
  # otherwise prints every failure a second time as "error TESTERROR" and then
  # reports "Build failed" for a build that succeeded and a test that didn't.
  -tl:off
  ```

- [ ] 💡 *"housekeeping — it stops the build tool double-reporting failures. Your lab checks carry the identical file. Go look sometime"*

- [ ] **Delete `week-07/Haldane.Tests/UnitTest1.cs`** — right-click it in the Explorer → **Delete**. The template's empty page; ours gets a real name

- [ ] 🎞️ **GO TO SLIDE 7** — *A check is a Fact*

- [ ] 📖 **The anatomy, off the slide, before any of ours exists:** *"a test is a method with `[Fact]` over it. The runner finds every method wearing that attribute and calls all of them, every time. Inside: three moves, always the same three — set the scene, do the thing, check the answer. `Assert` is the checking part: hand it what you expected and what you got, and it stays quiet or it objects"*

- [ ] **New file, `week-07/Haldane.Tests/WatchTests.cs`.** Paste the whole thing

  ```csharp
  // Haldane's own tests. Written tonight, run forever.
  //
  // Same species as every *.Checks project you have run since week 1 —
  // a class, some facts, and a runner that asks all of them every time.
  namespace Haldane.Tests;

  public class WatchTests
  {
      // The first thing this console ever computed, pinned down at last.
      // The line is minus fifty, and until tonight it was written down nowhere.
      [Fact]
      public void MinusFiftyIsTheLine()
      {
          Assert.True(Conditions.IsSafeToGoOut(celsius: -49.9, blizzard: false));
          Assert.False(Conditions.IsSafeToGoOut(celsius: -50.0, blizzard: false));
          Assert.False(Conditions.IsSafeToGoOut(celsius: -10.0, blizzard: true));
      }
  }
  ```

- [ ] 📖 **Read it as three sentences, not as syntax:** *"I put the parameter names in front of both arguments, so you can read each line without going and looking the method up. Now the three claims. At minus forty-nine point nine, you can go out. At exactly minus fifty, you cannot. In a blizzard, you cannot, whatever the number says. `IsSafeToGoOut` is the first method this console ever had — week one, night one — and until this moment, the minus-fifty line existed in exactly one place: inside the method. Now the rule is written down where a machine re-asks it"*

- [ ] **Run it**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
    Passed Haldane.Tests.WatchTests.MinusFiftyIsTheLine [2 ms]

  Test Run Successful.
  Total tests: 1
       Passed: 1
  ```

- [ ] 🎯 **Let the shape of that output land, then ask, and wait:** *"one test, one green line, named. Look at that output for a second. Where have you seen it before?"*

- [ ] 🎞️ **GO TO SLIDE 8** — *You've been reading tests all semester*

- [ ] 🎯 **The reveal. Bring up the browser tab — `dotnet-db-starters`, week 6's `HourChecks.cs` — beside the editor, and scroll it slowly:** *"this is the file that graded your lab last week. A class. Methods with `[Fact]` over them. `Assert` after `Assert`. It is this same kind of project, down to the csproj settings. I have called them checks since week one, because that is what they are to you. The rest of the world calls them unit tests. There is no magic in this file. As of tonight, there is not a line of it you cannot read"*
- [ ] 📖 **Collect the promise by quoting it:** *"Week one, first night, I told you this. There is a file in tonight's lab that grades you. In week seven you find out it is not magic, and you write one. It is week seven"*
- [ ] 💡 **And the header of that very file has been saying so for a week** — point at it: *"read the last line of the comment at the top. 'That is what an interface is, and it is what a check is. Week 7.' It was posted"*

- [ ] 🎞️ **GO TO SLIDE 9** — *Make it fail once*

- [ ] 📖 **The discipline, and it is the room's first instinct to skip it:** *"one thing before we trust our green line. A test that has never failed proves less than you think — maybe it checks nothing. So you make it lie, once, on purpose, and watch it object"*

- [ ] **In `WatchTests.cs`, change the first assert's `-49.9` to `-50.1`** — a claim that is genuinely false — and run it again

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
    Failed Haldane.Tests.WatchTests.MinusFiftyIsTheLine [1 ms]
    Error Message:
     Assert.True() Failure
  Expected: True
  Actual:   False
    Stack Trace:
       at Haldane.Tests.WatchTests.MinusFiftyIsTheLine() in
       …/week-07/Haldane.Tests/WatchTests.cs:line 14
  ```

- [ ] 📖 **Read the failure like a sentence, and point at each part as you name it:** *"Three things, and they are always these three. The name at the top says which rule broke. Expected and actual say how — I claimed true, it came back false. And the last line says where: `WatchTests.cs`, line 14. That is the assert I just made lie. You have been reading failures shaped exactly like this since your first red check in week one. Now you know who writes them"*
- [ ] 💡 **The path in front of `:line 14` is your machine's, so it will be long** — the part that matters is the file name and the number on the end
- [ ] **Put the `-49.9` back, run it once more, and see it green before moving on**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "The station gets a test project of its own"
  ```

---

## 5 · Red, then green *(slide 10)*

- [ ] 🎞️ **GO TO SLIDE 10** — *Red, then green*

- [ ] 📖 **The order, stated before it happens:** *"now the double sign-out. And the order matters: the test gets written FIRST, against the bug, and I want to see it fail before I fix anything. A red test is proof the test can see the bug. Fix first and you never find out whether your test would have caught it"*

- [ ] **In `WatchTests.cs`, paste this at the bottom of the class — above the last `}`**

  ```csharp

      [Fact]
      public void NobodyGoesOutTwice()
      {
          Watch watch = new Watch();
          CrewMember okonkwo = new CrewMember("Okonkwo");

          watch.SignOut(okonkwo, "MET RUN", "15:00");
          watch.SignOut(okonkwo, "DIG OUT", "15:30");

          Assert.Equal(1, watch.OutsideCount);
      }
  ```

- [ ] 📖 **The three moves, named while it is on screen:** *"set the scene — a fresh watch, one crew member, no console, no prompts, no Spectre. Do the thing — sign him out twice, which is exactly what I did at the desk an hour ago. Check the answer — one person outside, because there is one person. `Assert.Equal`: expected first, actual second"*
- [ ] 💡 *"notice how cheap the scene is. No station, no seeds, no board — a watch and one man. That is what testable shape buys: you can stand up exactly the part of the world you're asking about"*

- [ ] 🎯 **Predict, then run — ask for the color out loud first**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
    Failed Haldane.Tests.WatchTests.NobodyGoesOutTwice [3 ms]
    Error Message:
     Assert.Equal() Failure: Values differ
  Expected: 1
  Actual:   2
  ```

- [ ] 🎯 **This is the beat of the night. Let it sit, then:** *"red — and red is the good outcome here. Expected one, got two: my test just watched Okonkwo go out twice, on its own, in four milliseconds, without a keyboard, without a board, without me. The bug that took a projector and a room to see is now caught by a machine — and it will be caught every time anybody runs this suite, forever"*

- [ ] **Now the fix — in `Watch.cs`.** <kbd>⌘F</kbd> for **`// Sign somebody out: a new record`** — one hit. **Select from that line down to and including the `}` directly above `// A new return time, radioed in.`** and paste this over it

  ```csharp
      // Sign somebody out — unless they are already out there. Says whether
      // it did, because a desk that can refuse has to say so. Week 2's
      // TryParse made the same deal.
      //
      // The guard compares the PERSON, not the spelling: `s.Who == who` asks
      // whether two references are the same crew member, which is week 5
      // still earning its keep.
      public bool SignOut(CrewMember who, string reason, string expected)
      {
          foreach (SignOut s in SignOuts())
          {
              if (s.Who == who && !s.IsBack)
              {
                  return false;
              }
          }

          _entries.Add(new SignOut("14:57", who, reason, expected));
          return true;
      }
  ```

- [ ] 📖 **Two things while it is on screen:** *"the guard walks the open sign-outs asking one question — is this the same person? Not the same spelling: the same object, week five's `==`. And the method now answers `bool`, because a desk that can refuse has to be able to say no out loud"*

- [ ] **Run the tests, not the program**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
  Total tests: 2
       Passed: 2
  ```

- [ ] 🎯 *"green. Same test, same questions, and now the answer is one. Red, then green — the red proved the test works, the green proves the fix does. From here that test never comes off the suite: if this bug ever creeps back, in week ten, in week fifteen, it gets caught in milliseconds"*

- [ ] **And the test can pin the refusal itself now — four lines, and the scene above them does not move.** In `WatchTests.cs`, <kbd>⌘F</kbd> for **`watch.SignOut(okonkwo, "MET RUN", "15:00");`** — one hit. Select from that line down to and including **`Assert.Equal(1, watch.OutsideCount);`** and paste this over them

  ```csharp
          bool first = watch.SignOut(okonkwo, "MET RUN", "15:00");
          bool second = watch.SignOut(okonkwo, "DIG OUT", "15:30");

          Assert.True(first);
          Assert.False(second);
          Assert.Equal(1, watch.OutsideCount);
          Assert.Equal(1, watch.Count);
  ```

- [ ] 📖 *"The scene did not change. Same watch, same man. What changed is what I am checking. Four claims now: the first sign-out is accepted, the second is refused, one person is outside, and the refused one never reached the log at all. A test grows the same way a program does"*
- [ ] **Run it once more — still green**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

- [ ] **The desk should say no out loud too — and again, the prompts stay.** In `Program.cs`, <kbd>⌘F</kbd> for **`void SignSomebodyOut()`** — one hit. **Leave everything down to the `Find` alone.** Select from **`if (who == null)`** down to and including the **`}` that closes the method** — a two-branch decision becomes a three-branch one — and paste this over it

  ```csharp
      if (who == null)
      {
          AnsiConsole.MarkupLine($"[{Amber}]  Nobody on station by that name. Nothing logged.[/]");
      }
      else if (watch.SignOut(who, reason.Trim(), expected.Trim()))
      {
          // Redraw ONLY where the board actually changed. An action that just
          // reports — a lookup, a refusal — leaves its answer on screen instead.
          DrawBoard();
      }
      else
      {
          AnsiConsole.MarkupLine($"[{Amber}]  {Markup.Escape(who.Name)} is already outside. "
              + "One trip at a time.[/]");
      }
  }
  ```

- [ ] **Run the desk and try the break — `o`, `Okonkwo`, `DIG OUT`, `15:30`**

  ```bash
  dotnet run --project week-07/Haldane
  ```

  ```
    Okonkwo is already outside. One trip at a time.
  ```

- [ ] 🎯 *"the board stays at three, and a duty officer typing a duplicate finds out. Same rule, two voices: the test guards it, the desk explains it"*
- [ ] **Press `q`**

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "Nobody goes out twice: red, then green"
  ```

---

## 6 · The other bug *(slide 11)*

- [ ] 🎞️ **GO TO SLIDE 11** — *Test the rule, not the line*

- [ ] 📖 **Same discipline, less narration — the room knows the drill now:** *"Reyes's amend. Test first, red first. And this scene takes more setting up. The bug only shows when somebody has a finished trip and an open one at the same time. So the test has to build that little history first: out, back, out again"*

- [ ] **In `WatchTests.cs`, paste this at the bottom of the class — above the last `}`**

  ```csharp

      [Fact]
      public void AnAmendedTimeLandsOnTheOpenTrip()
      {
          Watch watch = new Watch();
          CrewMember reyes = new CrewMember("Reyes");

          watch.SignOut(reyes, "DIG OUT", "14:45");
          watch.MarkBack("Reyes");
          watch.SignOut(reyes, "WALK", "15:30");

          watch.AmendBackBy("Reyes", "16:00");

          Assert.Equal("16:00", watch.SignOuts()[1].Expected);
          Assert.Equal("14:45", watch.SignOuts()[0].Expected);
      }
  ```

- [ ] 📖 *"the scene is her afternoon: dug out, came back, went for a walk. Then the phone call. Two claims: the new time lands on the open trip — row one — and the closed trip keeps the record of what actually happened — row zero, untouched. A closed record is history, and you don't edit history"*
- [ ] 💡 **Second sign-out works in the scene now for a reason worth five seconds** — *"notice the guard we just wrote lets her go out again — she's back. If it didn't, this test couldn't even set its scene. Fixes lean on fixes"*

- [ ] 🎯 **Predict, then run**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
    Failed Haldane.Tests.WatchTests.AnAmendedTimeLandsOnTheOpenTrip [4 ms]
    Error Message:
     Assert.Equal() Failure: Strings differ
  Expected: "16:00"
  Actual:   "15:30"
  ```

- [ ] 📖 *"red, for the right reason: the open trip still says 15:30, because the amend went to the closed one. Now the fix — and this one is humbling"*

- [ ] **Nothing to change yet — look first.** In `Watch.cs`, <kbd>⌘F</kbd> for `s.Back();` — one hit, in `MarkBack` — and put the cursor on the `if` above it. 📖 *"mark-back has asked the right question for three weeks — name matches AND not already back. The guard existed. Amend just never got it"*
- [ ] **The fix.** <kbd>⌘F</kbd> for **`// A new return time, radioed in.`** — one hit. **Select from that line down to and including `if (s.Who.Name == name)`** and paste this over it

  ```csharp
      // A new return time lands on the OPEN sign-out — never on a closed one.
      // A closed record is a record of something that already happened.
      public bool AmendBackBy(string name, string newTime)
      {
          foreach (SignOut s in SignOuts())
          {
              if (s.Who.Name == name && !s.IsBack)
  ```

- [ ] **Run the whole suite**

  ```bash
  dotnet test week-07/Haldane.Tests
  ```

  ```
    Passed Haldane.Tests.WatchTests.NobodyGoesOutTwice [3 ms]
    Passed Haldane.Tests.WatchTests.MinusFiftyIsTheLine [< 1 ms]
    Passed Haldane.Tests.WatchTests.AnAmendedTimeLandsOnTheOpenTrip [< 1 ms]

  Total tests: 3
       Passed: 3
  ```

- [ ] 🎯 **Point at the three lines:** *"three rules of this station, written down where a machine re-asks them on every run. That took us one evening, and most of the evening was the first one"*

- [ ] **Prove it at the desk once — run it, `b` `Reyes`, `o` `Reyes` `WALK` `15:30`, `a` `Reyes` `16:00`**

  ```bash
  dotnet run --project week-07/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ back   │ 2     │
  │ 14:57 │ Reyes     │ WALK    │ 16:00    │ OUT    │ 2     │
  ```

- [ ] 📖 *"the walk says 16:00, the dig-out keeps its history. And I checked that by hand exactly once — from here the suite does it"*
- [ ] **Press `q`**

- [ ] **Save it, and push.** Silent — two lines, no commentary

  ```bash
  git add . && git commit -m "The amend lands on the open trip"
  ```

  ```bash
  git push -u origin red-then-green
  ```

---

## 7 · Hand off *(slide 12)*

- [ ] 🎞️ **GO TO SLIDE 12** — *Lab: the update*

- [ ] 📖 *"Your turn — and at KDXR it's worse than two bugs. The station's scheduler software took an update overnight, and the update 'improved' four things. The checks caught all four before the morning show did. Your job is the same as mine was tonight. For each one: write your own test, watch it go red against the real bug, then fix the line and watch both go green"*
- [ ] 🎯 **Define done on their machine:** *"you are done when `dotnet test week-07/Lab.Checks` says five out of five, your own `Lab.Tests` file has a fact per bug, and the desk behaves when you work a shift"*
- [ ] 💡 **Name the new folder out loud** — *"the week's folder has three projects in it now: the desk, my checks, and `Lab.Tests` — which is yours. The first test project in this course that belongs to you"*

---

## 8 · Wrap *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Tonight, in one picture*

- [ ] 📖 **Six short sentences, then stop** — *"A test is a method with `[Fact]` over it, and a check is a test. It calls your class the same way anything else calls it, and that is why we put logic in classes. Write the test first and watch it fail — that proves the test can see the bug. Then fix the code and watch it pass — that proves the fix works. Then keep the test. It runs every time from now on, so the bug cannot come back quietly"*
- [ ] 🎯 **The forward line:** *"one thing the suite cannot save us from yet: press `q` and the whole log is still gone. Every reading, every sign-out, every night — gone at quit, since week three. Next week it stops being gone"*
- [ ] **Homework: two URLs in Canvas, coursework repo first, project repo second**
- [ ] ⚠️ **Say the checks line out loud, with this week's twist** — *"Part 1 copies this week's checks in, same as always — and this week's checks are TWO, not five. If `dotnet test Project.Checks` shows five checks, you are running last week's. The other three points moved somewhere better: into tests you write yourself"*
