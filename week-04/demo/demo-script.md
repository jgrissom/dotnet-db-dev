# Week 4 Demo — The Board That Defends Itself 🧊

**Haldane Station · duty console · day 233**

Tonight the class you have shown them since week 3 gets convicted. It has been on screen all term as four public fields, and nobody has said a word about it. One typed correction at −39 is all it takes.

> **The shape of the night:** a class you already write → a blank that gets in → a door instead of a hole → a fact nothing can rewrite → and a repo of their own.

**Total: ~95 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-04/demo/script.html) and confirm the top line says *day 233*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 4's board is up. Say nothing about it
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 3 left it, with `week-01/` through `week-03/` in it
- [ ] ⚠️ **Delete `week-04/` from the demo repo if you've rehearsed.** `dotnet new` refuses to overwrite, and §1 starts with it
- [ ] **A browser tab signed in to GitHub**, on the demo repo. §7 opens a real pull request in front of them
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station of your own"*

---

## 1 · The class you already write *(slide 2)*

- [ ] 🎞️ **GO TO SLIDE 2** — *You have written this class* · *"this has been on the board since week 3. Nobody has complained about it, including me. Have a look at it and tell me what's wrong with it"*
- [ ] **Let them look.** 🎯 **The honest answer is "nothing", and that is the answer you want.** If somebody says *"they should be private"* — *"why?"* — and let them try to finish the sentence. Most rooms cannot, because it has always been a rule rather than a reason
- [ ] *"Right. Nothing is wrong with it. It compiles, it runs, the board draws. Hold that thought for about four minutes"*

- [ ] **Make this week's folder.** *"Third time you've watched this — and this week you do it for real, in a repo of your own, before you go to bed"*

  ```bash
  dotnet new console -o week-04/Haldane
  ```

- [ ] **Carry both files forward.** Nothing is edited; last week's work just makes the trip

  ```bash
  cp week-03/Haldane/Conditions.cs week-03/Haldane/SignOut.cs week-04/Haldane/
  ```

- [ ] 📖 **Open `week-04/Haldane/SignOut.cs` and leave it on screen.** *"Four public fields and a constructor. That is the whole class, and it is exactly what you'd have written"*

- [ ] **Paste the banner and the readings line** — select the whole of `week-04/Haldane/Program.cs` (`⌘A`) and paste over it. The two lines `dotnet new` wrote are the SDK's, not ours

  ```csharp
  using Spectre.Console;

  const string Amber = "#e8b04b";
  const string Dim = "#6c7b78";
  const string Fg = "#c8d3cf";
  const string Cold = "#7fb2d4";

  AnsiConsole.MarkupLine($"[{Dim}]========================================================[/]");
  AnsiConsole.MarkupLine($"[{Amber} bold]  HALDANE STATION - DUTY CONSOLE[/]");
  AnsiConsole.MarkupLine($"[{Dim}]  nearest neighbour: 512 km - winter crew - day 233[/]");
  AnsiConsole.MarkupLine($"[{Dim}]========================================================[/]");
  AnsiConsole.WriteLine();

  AnsiConsole.MarkupLine($"[{Dim}]Outside:[/] [{Cold}]-39.0 C[/]   "
      + $"[{Dim}]Safe to go out:[/] [{Fg}]{Conditions.IsSafeToGoOut(-39.0, false)}[/]");
  AnsiConsole.WriteLine();
  ```

- [ ] **Add the package** — the board needs it, same as last week

  ```bash
  dotnet add week-04/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] **Run it.** Banner, one readings line, nothing else yet

  ```bash
  dotnet run --project week-04/Haldane
  ```

---

## 2 · A correction, and what it costs *(slides 3–4)*

- [ ] **Paste the board — three people out** — at the end of `Program.cs`, under the readings line

  ```csharp
  List<SignOut> outside = new List<SignOut>();
  outside.Add(new SignOut("09:05", "Lindqvist", "FUEL", "10:30"));
  outside.Add(new SignOut("14:20", "Reyes", "DIG OUT", "14:45"));
  outside.Add(new SignOut("14:20", "Okonkwo", "MET RUN", "15:00"));

  var board = new Table()
      .Border(TableBorder.Square)
      .BorderColor(Color.FromHex("#1e2529"))
      .AddColumn($"[{Dim}]TIME[/]")
      .AddColumn($"[{Dim}]NAME[/]")
      .AddColumn($"[{Dim}]REASON[/]")
      .AddColumn($"[{Dim}]EXPECTED[/]");

  foreach (SignOut s in outside)
  {
      board.AddRow(
          $"[{Dim}]{Markup.Escape(s.Time)}[/]",
          $"[{Fg}]{Markup.Escape(s.Name)}[/]",
          $"[{Amber}]{Markup.Escape(s.Reason)}[/]",
          $"[{Dim}]{Markup.Escape(s.Expected)}[/]");
  }

  AnsiConsole.Write(board);
  AnsiConsole.MarkupLine($"[{Dim}]{outside.Count} people outside.[/]");
  ```

- [ ] **Run it.** The board they know, three rows, `3 people outside.`

  ```bash
  dotnet run --project week-04/Haldane
  ```

- [ ] 🎞️ **GO TO SLIDE 3** — *A correction, at −39* · *"Reyes gets on the radio. The vent is worse than it looked, she'll be another half hour. The duty officer has to change her return time"*

- [ ] **Paste the correction** — directly above the `var board = new Table()` line, so it happens before the board is drawn

  ```csharp
  Console.Write("Correction - new back-by for Reyes: ");
  string newTime = Console.ReadLine() ?? "";

  outside[1].Expected = newTime;

  AnsiConsole.WriteLine();
  ```

- [ ] 📖 *"One line. Reach into the record and write the new time in. This is the line every one of you would write"*

- [ ] **Run it and type `15:15`** — the ordinary case, and it works

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 15:15    │
  ```

- [ ] 💥 **Now run it again — and this time press Enter without typing anything.** *"Gloves. Minus thirty-nine. You hit Enter a beat early"*

  ```bash
  dotnet run --project week-04/Haldane
  ```

- [ ] 🎞️ **GO TO SLIDE 4** — *Nothing happened* · 🎯 **ask, then shut up:** *"what went wrong?"* — and let it hang. **The answer is nothing. No exception, no warning, no squiggle**

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │
  │ 14:20 │ Reyes     │ DIG OUT │          │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │
  └───────┴───────────┴─────────┴──────────┘
  3 people outside.
  ```

- [ ] 🎯 **The consequence, in station terms, said slowly:** *"the board still says three people are outside. It is perfectly happy. And it has quietly thrown away the only fact that would have told anybody Reyes is late"*
- [ ] ⚠️ **Do not fix it yet.** Let it sit on screen while you start §3

- [ ] **Start the branch that fixes it.** Silent — no line, this is the habit arriving, not a lesson

  ```bash
  git checkout -b board-that-defends-itself
  ```

---

## 3 · A door instead of a hole *(slides 5–7)*

- [ ] 🎞️ **GO TO SLIDE 5** — *What a public field is* · *"a public field is a hole in the wall of your class. Anything, anywhere, any time, can write anything into it — and there is nowhere to put the rule"*
- [ ] 🎞️ **GO TO SLIDE 6** — *A property is a door* · *"so we put somebody at the door"*

- [ ] **In `SignOut.cs`, replace the `public string Expected;` line** with the field and the property

  ```csharp
      private string _expected = "unknown";

      public string Expected
      {
          get { return _expected; }
          set
          {
              if (!string.IsNullOrWhiteSpace(value))
              {
                  _expected = value.Trim();
              }
          }
      }
  ```

- [ ] 📖 **Three things, and name them in this order** — *"`_expected` is the private one; the underscore is just how people write it. `value` is a keyword — inside a `set` it's whatever was on the right of the equals, and you never declare it. And the `if` is the entire point: that is a method running on the way in"*

- [ ] 🎞️ **GO TO SLIDE 7** — *The caller never noticed* · 🎯 **point at the unchanged line in `Program.cs`:** *"look at what did **not** change. `outside[1].Expected = newTime;` — same line, character for character. It still reads like a field and it's still written like a field"*

- [ ] **Run it, Enter-only again.** The same keystrokes as the break, and now:

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │
  ```

- [ ] 🎯 *"The blank never happened. The old time is still there. Nothing crashed, nothing was announced — the bad value simply did not get in"*
- [ ] 💡 **If somebody asks "shouldn't it throw?"** — *"sometimes yes, and choosing between them is a real design decision. It's week 13's whole subject"*. Then move on

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "A door on Expected, instead of a hole"
  ```

---

## 4 · Some things should never change *(slide 8)*

- [ ] 🎯 **Set the trap first.** *"While I'm in here — I noticed a typo in Okonkwo's name last week. I'll just fix it"*

- [ ] **Paste the typo** — in `Program.cs`, directly under the `outside.Add(...)` block

  ```csharp
  outside[0].Name = "Okonkow";
  ```

- [ ] **Run it.** It compiles, it runs, and **the wrong person is now on the ice**

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  │ 09:05 │ Okonkow │ FUEL    │ 10:30    │
  ```

  > The NAME column gets narrower, because the table measures what's in it and `Okonkow` is shorter than `Lindqvist`. Don't mention it; it's last week's lesson still working.

- [ ] 🎯 **Two things wrong, and the room usually only sees one:** *"I've misspelled it. But look at the row — that's Lindqvist's sign-out. I've just renamed somebody else, and the board took it"*
- [ ] 🎞️ **GO TO SLIDE 8** — *Some facts are not editable* · *"a sign-out is a record of something that happened. You don't get to edit who it was"*

- [ ] **In `SignOut.cs`, replace the three remaining field lines** — `Time`, `Name` and `Reason`

  ```csharp
      public string Time { get; }
      public string Name { get; }
      public string Reason { get; }
  ```

- [ ] 📖 *"A `get` and no `set` at all. They can be assigned in the constructor and never again"*

- [ ] **Build it — and it fails, on purpose.** *"And now the typo I wrote ninety seconds ago is a compile error"*

  ```bash
  dotnet build week-04/Haldane
  ```

  ```
  error CS0200: Property or indexer 'SignOut.Name' cannot be assigned to -- it is read only
  ```

- [ ] 🎯 **Delete the `outside[0].Name = "Okonkow";` line.** *"That is the fix. Not a code review, not somebody noticing — the compiler simply will not build a program that rewrites who was outside"*

- [ ] **Run it.** Clean board, right names

  ```bash
  dotnet run --project week-04/Haldane
  ```

---

## 5 · Only the station says you came back *(slide 9)*

- [ ] *"Lindqvist is in. Somebody has to tell the board"*

- [ ] **In `SignOut.cs`, add the flag and the method** — under the `Expected` property, above the constructor

  ```csharp
      public bool IsBack { get; private set; }
  ```

- [ ] **And the only way it ever moves** — under the constructor

  ```csharp
      public void Back()
      {
          IsBack = true;
      }
  ```

- [ ] 🎞️ **GO TO SLIDE 9** — *`private set`* · 🎯 **the sentence of the night:** *"public on the property, private on the setter. Anybody can read it. **Nobody** outside this class can write it — so there is no line you can write, anywhere in this program, that claims somebody came back who didn't"*

- [ ] **Paste the sign-in and the status column.** Two edits: put this above `var board = new Table()`

  ```csharp
  outside[0].Back();
  ```

- [ ] **...and add the column** — one more `.AddColumn` on the end of the `board` chain, and one more argument on the end of `AddRow`

  ```csharp
      .AddColumn($"[{Dim}]STATUS[/]");
  ```

  ```csharp
          s.IsBack ? $"[{Dim}]back[/]" : $"[{Cold}]OUT[/]");
  ```

- [ ] **Replace the count line** — `outside.Count` is now the wrong question. At the bottom of `Program.cs`, in place of the `MarkupLine` with `outside.Count` in it

  ```csharp
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

- [ ] **Run it, Enter-only.** *"Two people outside. And the only reason that number is true is that nothing can lie about it"*

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ back   │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │
  └───────┴───────────┴─────────┴──────────┴────────┘
  2 people outside.
  ```

- [ ] 🎯 **Scroll `SignOut.cs` to the top and leave it there.** *"One private field. Everything else is a door, or it is locked. That class started tonight as four holes"*

- [ ] **Save it.** Silent

  ```bash
  git add . && git commit -m "Nothing outside can say somebody came back"
  ```

---

## 6 · Your own topic *(slides 10–12)*

- [ ] 🎞️ **GO TO SLIDE 10** — *The list is nobody's business* · *"same idea, one size up. The class holds the collection, the collection is private, and `All()` hands out a **copy**"*
- [ ] 🎯 **The line that earns the beat:** *"return the real list and the `private` never meant anything — whoever asked can empty it, and your `Count` will agree with them"*

- [ ] 🎞️ **GO TO SLIDE 11** — *Your project starts tonight* · *"tonight your homework stops being my station and starts being yours. A topic you pick, in a repo that's yours, public, with your name on it"*
- [ ] *"And every week from here extends that same program. Behaviour next week, then interfaces, tests, a save file, queries, a database. In week 16 you present it"*

- [ ] 🎞️ **GO TO SLIDE 12** — *Finish this sentence* · 🎯 **ask the room to do it out loud, with their own idea:** *"each one of my ___ has many ___"*
- [ ] **Take two or three answers.** Anything that can't finish the sentence gets sent back tonight, not in November
- [ ] ⚠️ **Sell the odd ones.** *"The best project in this room will be the strangest one. Nobody wants to present a list of products"*
- [ ] 💡 **The one fixed rule, and it is one class:** *"there's one class in your project whose shape I dictate — `Registry`, with six members. It's how the checks find your code without me knowing a thing about your topic. Everything else is yours"*

---

## 7 · Branch, pull request, merge *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Nothing goes straight to `main` again* · *"you've been committing straight onto main since week 1. From tonight, every feature arrives on a branch and comes in through a pull request"*
- [ ] 🎯 **Point at the terminal.** *"I've been on a branch all night, and you didn't notice. I made it right after the board lost Reyes's time"*

- [ ] **Push it**

  ```bash
  git push -u origin board-that-defends-itself
  ```

- [ ] 📖 **Read GitHub's answer out loud** — the push prints a URL for opening a pull request. *"It just told me what to do next"*
- [ ] **Open the pull request in the browser.** Title it *"The board defends itself"*
- [ ] 🎯 **Show the diff, not the button.** Scroll the Files changed tab. *"This is the part that actually earns its keep. Nobody else is reviewing this — I'm reading my own work before it's permanent, and that catches more than you'd think"*
- [ ] **Merge it with the plain `Merge pull request` button**
- [ ] ⚠️ **Say the trap once:** *"not Squash, not Rebase. They're both real and you'll use them at work — but only the plain one leaves a merge commit, and that's what I read out of your repo"*

- [ ] **Come back down**

  ```bash
  git checkout main
  ```

  ```bash
  git pull
  ```

- [ ] 🎯 *"That last one is the step everybody forgets. The merge happened on GitHub. My laptop had no idea until I asked"*

---

## 8 · Hand off *(slide 14)*

- [ ] 🎞️ **GO TO SLIDE 14** — *Lab: the rotation that fights back*. Leave it up for the whole lab
- [ ] *"KDXR. Two files, five checks, one of them green when you start"*
- [ ] 🎯 **Define done on their machine, not yours:** *"at 03:14 the automation glitches and starts writing nonsense into your rotation. Press `g` and watch it happen. You're done when you press `g` and nothing gets through"*
- [ ] ⚠️ **Say the homework out loud now, because it needs a topic:** *"the homework is your own project, and step one is picking it. If you've got an idea, tell me during the lab — I'd rather talk you out of a bad one tonight"*

---

## 9 · Wrap *(slide 15)*

- [ ] 🎞️ **GO TO SLIDE 15** — *Tonight, in one picture*
- [ ] **Three beats, and stop:** **a field** — anything can say anything · **a property** — somebody is at the door · **`private set`** — the record is the authority on itself
- [ ] *"Two URLs in Canvas this week. Your coursework repo, same as always — and your project repo, which is new, and public"*
- [ ] 💡 **Next week:** *"`static` — the word you've been adding to make the red squiggle go away. Next week you find out what it actually costs you"*
