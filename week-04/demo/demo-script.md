# Week 4 Demo — The Board That Defends Itself 🧊

**Haldane Station · duty console · day 233**

Tonight the class you have shown them since week 3 gets convicted. It has been on screen all term as four public fields, and nobody has said a word about it. One typed correction at −39 is all it takes.

> **The shape of the night:** a class nobody complained about → a blank that gets in → a door instead of a hole → a fact nothing can rewrite → and a repo of their own.

**Total: ~95 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-04/demo/script.html) and confirm the top line says *day 233*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 4's board is up. Say nothing about it
- [ ] ⚠️ **Put week 3's folder back to its finished state — §1 copies out of it.** Whatever you did to it while rehearsing, this makes tonight's carry-forward correct:
  ```bash
  cp ~/Repos/dotnet-db-dev-answer-keys/week-03/demo-starter/Haldane/*.cs week-03/Haldane/
  ```
  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector. The instructor notes live beside them in `demo-starter/NOTES.md`
  - ⚠️ **No `week-03/Haldane` at all?** Make it first — `dotnet new console -o week-03/Haldane`, then `dotnet add week-03/Haldane package Spectre.Console --version 0.57.2` — then run the copy above
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 3 left it, with `week-01/` through `week-03/` in it
- [ ] ⚠️ **Delete `week-04/` from the demo repo if you've rehearsed.** `dotnet new` refuses to overwrite, and §1 starts with it
- [ ] **A browser tab signed in to GitHub**, on the demo repo. §7 opens a real pull request in front of them
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station of your own"*

---

## 1 · The class nobody complained about *(slide 2)*

- [ ] 🎞️ **GO TO SLIDE 2** — *What's wrong with this class?* · *"this has been on the board since week 3. Nobody has complained about it, including me. Have a look at it and tell me what's wrong with it"*
- [ ] **Let them look.** 🎯 **The honest answer is "nothing", and that is the answer you want.** If somebody says *"they should be private"* — *"why?"* — and let them try to finish the sentence. Most rooms cannot, because it has always been a rule rather than a reason
- [ ] *"Right. Nothing is wrong with it. It compiles, it runs, the board draws. Hold that thought for about four minutes"*

- [ ] **Make this week's folder.** *"Third time you've watched this — and this week you do it for real, in a repo of your own, before you go to bed"*

  ```bash
  dotnet new console -o week-04/Haldane
  ```

- [ ] **Carry last week forward — all three files.** *"Everything the desk was last time, moved across in one line"*

  ```bash
  cp week-03/Haldane/Conditions.cs week-03/Haldane/SignOut.cs week-03/Haldane/Program.cs week-04/Haldane/
  ```

- [ ] **Add the package** — the board needs it, same as last week

  ```bash
  dotnet add week-04/Haldane package Spectre.Console --version 0.57.2
  ```

- [ ] ⚠️ **Reload the window.** Command Palette (<kbd>⇧⌘P</kbd>) → **`Developer: Reload Window`** — VS Code learned this folder's projects when it opened, and `week-04` did not exist then

  ```
  Developer: Reload Window
  ```

- [ ] **One edit, in `week-04/Haldane/Program.cs`.** <kbd>⌘F</kbd> for **`day 226`** — one hit, in the banner. Make it **`day 233`**
- [ ] 💡 *"A week has passed on the ice"*

- [ ] **Run it.** The desk they built last time, working

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  ┌───────┬───────────┬─────────┬──────────┐
  │ TIME  │ NAME      │ REASON  │ EXPECTED │
  ├───────┼───────────┼─────────┼──────────┤
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │
  └───────┴───────────┴─────────┴──────────┘
  3 people outside.

  [o]ut  [w]ho  [q]uit:
  ```

- [ ] 🎯 **Press `q` and say what just happened, because it is the week's premise:** *"that is last week's program. I have not written a line tonight — I copied three files and changed a date. From here on, this is one program that grows, which is exactly what your own project is about to be"*
- [ ] 📖 **Then open `week-04/Haldane/SignOut.cs` and leave it on screen.** *"Four public fields and a constructor. That is the whole class, and it has been on that board since last week"*

- [ ] **Start the branch.** Silent — the habit, not a lesson

  ```bash
  git checkout -b board-that-defends-itself
  ```

- [ ] **And save the week before changing a line of it.** Silent

  ```bash
  git add . && git commit -m "week 4: the desk, carried forward"
  ```

---

## 2 · A correction, and what it costs *(slides 3–4)*

- [ ] 🎞️ **GO TO SLIDE 3** — *A correction, at −39* · *"Reyes gets on the radio. The vent is worse than it looked, she'll be another half hour. The duty officer has to change her return time — and right now the desk has no button for that"*

- [ ] **Add the action.** In `week-04/Haldane/Program.cs`, <kbd>⌘F</kbd> for **`void LookSomebodyUp`** — one hit. Paste this **directly above it**

  ```csharp
  void AmendABackBy()
  {
      Console.Write("  Whose back-by is changing: ");
      string name = Console.ReadLine() ?? "";
      Console.Write("  New back-by: ");
      string newTime = Console.ReadLine() ?? "";

      foreach (SignOut s in outside)
      {
          if (s.Name == name)
          {
              s.Expected = newTime;
              return;
          }
      }

      AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");
  }

  ```

- [ ] 📖 *"Find her row, write the new time in. This is the line some of us would write"* — and point at it: `s.Expected = newTime;`

- [ ] **Then wire it to a key.** <kbd>⌘F</kbd> for **`case "w":`** — one hit. Paste this directly above it

  ```csharp
          case "a":
              AmendABackBy();
              break;

  ```

- [ ] **And put it on the desk.** <kbd>⌘F</kbd> for **`[o]ut  [w]ho`** — one hit. Make that line read

  ```csharp
      Console.Write("[o]ut  [a]mend  [w]ho  [q]uit: ");
  ```

- [ ] **Run it.** Press `a`, amend **Reyes** to **15:15** — the ordinary case, and it works

  ```bash
  dotnet run --project week-04/Haldane
  ```

  ```
  │ 14:20 │ Reyes     │ DIG OUT │ 15:15    │
  ```

- [ ] 💥 **Stay in the program — press `a` again, `Reyes` again, and this time press Enter without typing a time.** *"Gloves. Minus thirty-nine. You hit Enter a beat early"*

  ```
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │
  │ 14:20 │ Reyes     │ DIG OUT │          │
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │
  └───────┴───────────┴─────────┴──────────┘
  3 people outside.
  ```

- [ ] 🎞️ **GO TO SLIDE 4** — *Nothing happened* · 🎯 **ask, then shut up:** *"what went wrong?"* — and let it hang. The answer is nothing. *"No exception, no warning, no squiggle"*
- [ ] 🎯 **The consequence, in station terms, said slowly:** *"the board still says three people are outside. It is perfectly happy. And it has quietly thrown away the only fact that would have told anybody Reyes is late"*
- [ ] ⚠️ **Do not fix it yet, and do not quit the program.** The desk is still sitting there with a blank in it — leave it on screen while you start §3

---

## 3 · A door instead of a hole *(slides 5–7)*

- [ ] 🎞️ **GO TO SLIDE 5** — *What a public field is* · *"a public field is a hole in the wall of your class. Anything, anywhere, any time, can write anything into it — and there is nowhere to put rules"*
- [ ] 🎞️ **GO TO SLIDE 6** — *A property is a door* · *"so we put somebody at the door to enforce the rules"*

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

- [ ] 📖 **Three things, and name them in this order** — *"`_expected` is the private one; the underscore is just how people write it. `value` is a keyword — inside a `set` it's whatever was on the right of the equals, and you never declare it. And the `if` is the entire point: that `set` is a method, and the `if` runs inside it on the way in"*

- [ ] 🎞️ **GO TO SLIDE 7** — *The caller never noticed* · 🎯 **point at the unchanged line inside `AmendABackBy`:** *"look at what did **not** change. `s.Expected = newTime;` — the same line it was before I edited `SignOut.cs`, character for character. It still reads like a field and it's still written like a field"*

- [ ] **Run it, and do exactly what broke it.** Press `a`, `Reyes`, then Enter without typing a time

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

- [ ] **Paste the typo.** <kbd>⌘F</kbd> for **`"Lindqvist", "FUEL"`** — one hit, the last of the three seeded rows. Paste this on the line below it

  ```csharp
  outside[2].Name = "Okonkow";
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

- [ ] 🎯 **Delete the `outside[2].Name = "Okonkow";` line.** *"The compile error is the fix. Not a code review, not somebody noticing — the compiler simply will not build a program that rewrites who was outside"*

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

- [ ] **Now the action it exists for.** <kbd>⌘F</kbd> for **`void LookSomebodyUp`** — one hit. Paste this directly above it

  ```csharp
  void MarkSomebodyBack()
  {
      Console.Write("  Who's back: ");
      string name = Console.ReadLine() ?? "";

      foreach (SignOut s in outside)
      {
          if (s.Name == name && !s.IsBack)
          {
              s.Back();
              return;
          }
      }

      AnsiConsole.MarkupLine($"[{Amber}]  Nobody outside by that name.[/]");
  }

  ```

- [ ] **Wire it to a key.** <kbd>⌘F</kbd> for **`case "w":`** — one hit. Paste this directly above it

  ```csharp
          case "b":
              MarkSomebodyBack();
              break;

  ```

- [ ] **And on the desk.** <kbd>⌘F</kbd> for **`[o]ut  [a]mend`** — one hit. Make that line read

  ```csharp
      Console.Write("[o]ut  [a]mend  [b]ack  [w]ho  [q]uit: ");
  ```

- [ ] 🎯 **Say what just became impossible:** *"there is now exactly one way anybody comes back — somebody at this desk presses `b`. No line anywhere else in the program can claim it"*

- [ ] **A STATUS column, so the board shows it.** <kbd>⌘F</kbd> for **`]EXPECTED[/]");`** — one hit. Make it read

  ```csharp
          .AddColumn($"[{Dim}]EXPECTED[/]")
          .AddColumn($"[{Dim}]STATUS[/]");
  ```

- [ ] **And a cell to fill it.** <kbd>⌘F</kbd> for **`Escape(s.Expected)}[/]");`** — one hit. Make it read

  ```csharp
              $"[{Dim}]{Markup.Escape(s.Expected)}[/]",
              s.IsBack ? $"[{Dim}]back[/]" : $"[{Cold}]OUT[/]");
  ```

- [ ] **Replace the count** — `outside.Count` is now the wrong question. <kbd>⌘F</kbd> for **`{outside.Count} people outside`** — one hit. Replace **that whole line** with

  ```csharp
      int stillOut = 0;
      foreach (SignOut s in outside)
      {
          if (!s.IsBack) { stillOut++; }
      }

      AnsiConsole.MarkupLine($"[{Dim}]{stillOut} people outside.[/]");
  ```

- [ ] **Run it. Press `b` and bring Lindqvist in.** *"Two people outside. And the only reason that number is true is that nothing can lie about it"*

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

- [ ] 🎞️ **GO TO SLIDE 10** — *The list is nobody's business* · *"same idea, one field to a whole list. The class holds the collection, the collection is private, and `All()` hands out a **copy**"*
- [ ] 🎯 **The line that earns the beat:** *"return the real list and the `private` never meant anything — whoever asked can empty it, and your `Count` will agree with them"*
- [ ] 💡 **`Lighthouse` is an example topic, not a third world** — the same one `lecture-notes.md` uses. It is on the slide because §6 is about *their* project, not the station and not the lab. Answer it if asked; don't introduce it otherwise

- [ ] 🎞️ **GO TO SLIDE 11** — *Your project starts tonight* · *"tonight your homework stops being something I asked you to make and starts being something you decided to make. A topic you pick, in a repo that's yours, public, with your name on it"*
- [ ] *"And every week from here extends that same program. Behaviour next week, then interfaces, tests, a save file, queries, a database. In week 16 you present it"*

- [ ] 🎞️ **GO TO SLIDE 12** — *Finish this sentence* · 🎯 **ask the room to do it out loud, with their own idea:** *"each one of my ___ has many ___"*
- [ ] **Take two or three answers.** Anything that can't finish the sentence gets sent back tonight, not in November
- [ ] ⚠️ **Sell the odd ones.** *"the strangest project in this room is the one I want to see most. I've read enough lists of products"*
- [ ] 💡 **The one fixed rule, and it is one class:** *"there's one class in your project whose shape I dictate — `Registry`, with five members. It's how the checks find your code without me knowing a thing about your topic. Everything else is yours"*

---

## 7 · Branch, pull request, merge *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Nothing goes straight to `main` again* · *"we have been committing straight onto main since week 1. From tonight, every feature arrives on a branch and comes in through a pull request"*
- [ ] 🎯 **Point at the terminal.** *"I've been on a branch all night, and you may not have even noticed. I made it right after the board lost Reyes's time"*

- [ ] **Push it**

  ```bash
  git push -u origin board-that-defends-itself
  ```

- [ ] 📖 **Read GitHub's answer out loud** — the push prints a URL for opening a pull request. *"It just told me what to do next"*
- [ ] **Open the pull request page in the browser** — the URL the push just printed. Title it *"The board defends itself"*
- [ ] 🎯 **Scroll down, past the description box, to the changed files — that is the diff.** *"Every line this branch added or took away, against `main`. This is the part that actually earns its keep. Nobody else is reviewing this — I'm reading my own work before it's permanent, and that catches more than you'd think"*
- [ ] **Then click `Create pull request`**
- [ ] **Merge it with the plain `Merge pull request` button**

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
- [ ] **Three beats, and stop:** **a field** — anything can say anything · **a property** — somebody at the door decides what gets in · **`private set`** — the record is the authority on itself
- [ ] *"Two URLs in Canvas this week. Your coursework repo, same as always — and your project repo, which is new, and public"*
- [ ] 💡 **Next week:** *"`static` — the word some of us add to make the red squiggle go away. Next week you find out what it actually costs you"*
