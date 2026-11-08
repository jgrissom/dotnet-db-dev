# Week 13 Demo — Four Answers 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk stops crashing. You work on the **callers**, live, and the students work on the **carts**. Each time something goes wrong, you run it and let it crash, then pick one of four answers: ask again, say no, throw, or stop. After three of the segments you push your finished files, and they copy them in to read while they work.

> **The shape of the night:** the input lies → the file is missing or damaged → the file lies → the row is gone. **Each demo segment is followed by the lab task that practices it.**

**Total: ~76 minutes of demo, in six short segments, and six lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-13-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-13-rehearsal
> ```
>
> Then **delete the `week-13` folder** from the Explorer. Switching to `main` removed the files you committed, but not `bin` or `obj`.
>
> **Empty `demo/week-13/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-13
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 13 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-13/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] 💡 **Type your database name in the Database box at the top of the published page.** Every mention of it on the page changes, including what the Copy buttons hand you. It is saved on this device
- [ ] ⚠️ **Check your secret before class, off the projector.** Week 13's starter uses the same fixed `UserSecretsId` as weeks 11 and 12. In a terminal tab nobody can see, ask the store what it holds. The password prints as `****`, and the server and login do not:

  ```bash
  dotnet user-secrets list --id 3a11a2aa-0cab-4805-8552-f1f5a5099f53 | sed 's/Password=[^;]*/Password=****/'
  ```

  On Windows PowerShell:

  ```powershell
  (dotnet user-secrets list --id 3a11a2aa-0cab-4805-8552-f1f5a5099f53) -replace 'Password=[^;]*','Password=****'
  ```

  `ConnectionStrings:Desk = …` with the right `Database=` means you are done: close the tab and skip the next step. `No secrets configured for this application.` means the store is empty, and a wrong `Database=` means it holds a different one
- [ ] ⚠️ **If that check said empty or wrong, set it now, in a new terminal tab that you close afterwards.** Prepare the whole command with your real connection string, run it, and close the tab:

  ```text
  dotnet user-secrets set "ConnectionStrings:Desk" "Server=…;Database=DB_KDXR_156101411_JSG;User Id=…;Password=…;TrustServerCertificate=True" --id 3a11a2aa-0cab-4805-8552-f1f5a5099f53
  ```

  `Successfully saved` is the answer you want. ⚠️ **Rehearsal and class share this one store, and the last `set` wins**, so make this the last one you run before class
- [ ] ⚠️ **A current `dotnet-ef`**, so no version warning prints on every command tonight:

  ```bash
  dotnet tool update --global dotnet-ef
  ```

- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it three times. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room
- [ ] ⚠️ **`demo/week-13/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-13
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 13 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] ⚠️ **Know how you'll cut the network for §5.** The Wi-Fi switch on your laptop, or the cable if you're wired. Find it now. §5 turns it off for two runs, and back on before anything else
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin
- [ ] ⚠️ **Delete `week-13/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-13/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · Four answers

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is exceptions: what a program does when something goes wrong. We'll break the desk four ways. The input lies, the file is missing or damaged, the file lies, and the row is gone. Each time we run it, watch it crash, and pick an answer. In your lab, you do the same to the carts."*
- [ ] 🎯 **Ask for hands, and wait:** *"Who has had a program die on them with a wall of error text?"*
- [ ] 📖 *"Tonight we decide what happens instead. There isn't one right answer. There are four, and most of the work is picking which."*

---

## Lab A · Setup, together — 12 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do every step on your own machine at the same time as the room, in your demo repo's terminal. You copy week 13 in, and drop and remake your database, exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of five. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-13/Lab.Checks
  ```

- [ ] **Drop the database, then make it again from this week's migrations, the same two commands as the README**

  ```bash
  dotnet ef database drop --force --project week-13/Lab
  ```

  ```bash
  dotnet ef database update --project week-13/Lab
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 13: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · The input lies *(slide 2)*

- [ ] 📖 *"First, a small one. The x key takes a caller off the switchboard. Watch what it does when I get a name wrong."*
- [ ] **Run the desk: DJ name, then `c`, then `x`, then `Bexx` with two x's, then `q`.** `c` shows the switchboard

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

  Then, at `x`:

  ```
    Nobody called "Bexx" on the switchboard.
  ```

- [ ] 📖 *"No crash. Remove looked, found nobody, and said no. Nothing is wrong with that answer: nobody by that name is a normal thing to find out."*
- [ ] 📖 *"But I had to press x and start over, to fix one letter. A person is sitting right here who can fix it. So the desk should ask again."*
- [ ] 🎞️ **GO TO SLIDE 2** — *Four answers* · *"Four things a program can do when something goes wrong. Ask again, when the person at the keyboard can fix it. Say no, when the answer is simply no. Throw, when a method can't do its job and somebody else has to decide. Stop, when the program can't carry on. We just saw say no. Ask again is next."*
- [ ] **Back to the editor. Open `week-13/Lab/SwitchboardDesk.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  Console.Write("  Take which caller off the board? Name: ");
  ```

- [ ] 📖 **Before you change it, say what it does now:** *"Right now this method asks once. It reads one line, tries it, and goes back to the menu either way. I need it to keep asking until a caller comes off, or until I press Enter to give up."*
- [ ] **Select from that line down to and including the closing `}` of the `else` under it, and paste this over it**

  ```csharp
          while (true)
          {
              Console.Write("  Take which caller off the board? Name (Enter to give up): ");
              string? typed = Console.ReadLine();

              if (string.IsNullOrWhiteSpace(typed))
              {
                  return;
              }

              string name = typed.Trim();

              if (switchboard.Remove(name))
              {
                  switchboard.Save(db);
                  AnsiConsole.MarkupLine($"  [{Coral}]Off the board:[/] [{Fg}]{Markup.Escape(name)}[/] "
                      + $"[{Dim}]- {switchboard.Count} left on the switchboard.[/]");
                  return;
              }

              AnsiConsole.MarkupLine($"  [{Dim}]Nobody called[/] [{Fg}]\"{Markup.Escape(name)}\"[/] "
                  + $"[{Dim}]on the switchboard.[/]");
          }
  ```

- [ ] 📖 **Highlight `while (true)`:** *"This loop has no end of its own. The only ways out are the two return lines."*
- [ ] 📖 **Highlight the `string.IsNullOrWhiteSpace(typed)` line:** *"The first way out is Enter. That's how a person gives up. It also covers the input ending, when ReadLine hands back null. Without this line, Enter couldn't get me out."*
- [ ] 📖 **Highlight the `return;` inside `if (switchboard.Remove(name))`:** *"The second way out is a caller coming off."*
- [ ] 📖 **Highlight the last `AnsiConsole.MarkupLine`:** *"If neither happened, we say no, and the loop goes around and asks again."*
- [ ] **Run the desk: DJ name, then `x`, then `Bexx`, then `Bex`, then `c`, then `q`.** This time `x` keeps asking

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```
    Off the board: Bex - 2 left on the switchboard.
  ```

- [ ] 📖 *"It said no to Bexx, asked again, and took Bex off. One key press, and the typing mistake cost nothing."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 13: a wrong name asks again"
  ```

- [ ] **Push it to the starters repo — one block copies the file there, commits there, and pushes.** Silent; they watch. `main -> main` at the end means it reached GitHub

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-13 && cp week-13/Lab/SwitchboardDesk.cs ../dotnet-db-starters/demo/week-13/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 13 demo: a wrong name asks again" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab B · Task 1 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.** Its first step is pulling my file and copying it in
- [ ] 📖 *"Task 1: copy my file in. Then do to the p key what I did to the x key. A wrong title asks again, and Enter gives up. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a loop that never ends when the check runs means no way out on `null`. `string.IsNullOrWhiteSpace(typed)` covers it
- [ ] 🎯 `CS8600` or `CS8602` on `typed` means `string typed` needs its `?`, because `ReadLine` can hand back null

---

## 3 · The file is missing, or damaged *(slide 3)*

- [ ] 📖 *"The day shift leaves a list of people who have been asking for the overnight desk. It's a file. The l key reads it in. I'll get the name of the file wrong."*
- [ ] **Run the desk: DJ name, then `l`, then this file name, with no dash in it**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/daylist.json
  ```

- [ ] 💥 **Let the wall of text sit.** The first line reads `Unhandled exception. System.IO.FileNotFoundException: Could not find file`
- [ ] 📖 *"There's the wall of text. One wrong letter, and the whole shift is gone."*
- [ ] 📖 *"A wrong file name is the same kind of mistake as Bexx with 2 x's. The person can fix it, so the right answer is ask again. But that's not what happened, instead the method crashed."*
- [ ] **Scroll up to `Unhandled exception`, and highlight `FileNotFoundException` on the screen.** *"This is the exception's name. Every crash has one, and the name is how we say which crash we're ready for."*
- [ ] 📖 *"Second file, a damaged one. The day shift's computer died halfway through saving it."*
- [ ] **Run the desk: DJ name, then `l`, then this file name**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/damaged-list.json
  ```

- [ ] 💥 **Point at the first line.** It reads `Unhandled exception. System.Text.Json.JsonException:`
- [ ] 📖 *"A different exception name. This file is there, but it isn't finished. Typing its name again won't fix it, so asking again is the wrong answer. The right answer is to say why the file cannot be parsed - not crash the program."*
- [ ] **Open `week-13/Lab/SwitchboardDesk.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  Console.Write("  Day list file: ");
  ```

- [ ] 📖 **Before you change it, say what it does now:** *"This method asks for the name of a file, reads the list of callers in it, and adds the new ones to the switchboard. Right now, if anything goes wrong while it reads the file, the whole program stops. I want it to handle the two problems we just saw. A wrong file name should let me type it again. A damaged file should tell me it's damaged, and take me back to the menu."*
- [ ] **Select from that line down to and including the line ending `on the switchboard.[/]");`, and paste this over it**

  ```csharp
          while (true)
          {
              Console.Write("  Day list file (Enter to give up): ");
              string? typed = Console.ReadLine();

              if (string.IsNullOrWhiteSpace(typed))
              {
                  return;
              }

              string path = typed.Trim();

              try
              {
                  int added = switchboard.Import(path);
                  switchboard.Save(db);

                  AnsiConsole.MarkupLine($"  [{Coral}]Day list:[/] [{Fg}]{added} new[/] "
                      + $"[{Dim}]- {switchboard.Count} on the switchboard.[/]");
                  return;
              }
              catch (IOException)
              {
                  AnsiConsole.MarkupLine($"  [{Dim}]No file at[/] [{Fg}]\"{Markup.Escape(path)}\"[/][{Dim}].[/]");
              }
              catch (JsonException)
              {
                  AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]that file is damaged.[/] [{Dim}]Nothing was added.[/]");
                  return;
              }
          }
  ```

- [ ] 📖 **Highlight the `try` block:** *"Try means: run these lines, and if one of them throws, jump out of here."*
- [ ] 📖 **Highlight `catch (IOException)`:** *"Catch says which exceptions we're ready for. IOException covers FileNotFoundException, and a missing folder as well. We print a line and do nothing else, so the loop goes around and asks again."*
- [ ] 📖 **Highlight `catch (JsonException)`, then its `return;`:** *"The same try, a different answer. A damaged file says no, and the return goes back to the menu without asking again."*
- [ ] **`JsonException` needs one using line.** Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:

  ```text
  using Spectre.Console;
  ```

  **Click at the end of that line, press Enter, and paste this**

  ```csharp
  using System.Text.Json;
  ```

- [ ] 📖 *"The same wrong name and the same damaged file, one more time."*
- [ ] **Run the desk: DJ name, then `l`, then the wrong name, then press Enter to give up. Then `l` again, with the damaged file, then `q`**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/daylist.json
  ```

  ```text
  week-13/deliveries/damaged-list.json
  ```

  ```
    Refused: that file is damaged. Nothing was added.
  ```

- [ ] 📖 **At the wrong name:** *"It said there's no file, and asked again. The desk is still alive."*
- [ ] 📖 **At the damaged file:** *"It said no, and we're back at the menu."*
- [ ] 📖 *"And now the right file. It has three names in it, and Dorothy is one of them."*
- [ ] **Run the desk: DJ name, then `l`, then this file name, then `c`, then `q`**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/day-list.json
  ```

  ```
    Day list: 2 new - 4 on the switchboard.
  ```

  ```
  │ CALLER        │ CALLS │ ASKED FOR │
  │ Dorothy       │ 3     │ -         │
  │ Teodoro       │ 1     │ -         │
  │ Ray           │ 0     │ -         │
  │ Pham's Bakery │ 0     │ -         │
  4 on the switchboard.
  ```

- [ ] 📖 **Highlight nothing; point at `2 new`:** *"Three names in the file, two new. Dorothy was already here, so she was left out, and the count says so. That's a quiet no."*
- [ ] 🎞️ **GO TO SLIDE 3** — *Throw there, catch here* · *"Two kinds of classes. Switchboard does the thinking and never prints a word. So when it can't do its job, all it can do is throw. SwitchboardDesk talks to the person, so that's where the catch goes. A check can call Switchboard with no keyboard and no screen."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 13: the desk catches a bad file"
  ```

- [ ] **Push it to the starters repo — one block, as in §2.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-13/Lab/SwitchboardDesk.cs ../dotnet-db-starters/demo/week-13/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 13 demo: the desk catches a bad file" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab C · Task 2 — 20 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.**
- [ ] 📖 *"Task 2: copy my file in. The i key takes a delivery of new carts. Crash it twice, then write the loop and the two catches. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** `CS0246` on `JsonException` is the missing `using System.Text.Json;` at the top of `RotationDesk.cs`
- [ ] 🎯 **Ask somebody which of their two catches has a `return` in it, and why.** *(The damaged one: typing it again can't fix it.)*

---

## ☕ Break

---

## 4 · The file lies

- [ ] 📖 *"A file that's missing is easy to spot. A damaged one is too. This one reads perfectly. It just isn't true: the last name on the list is blank."*
- [ ] **Run the desk: DJ name, then `l`, then this file name, then `c`, then `q`**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/bad-list.json
  ```

  ```
  │ CALLER        │ CALLS │ ASKED FOR │
  │ Dorothy       │ 3     │ -         │
  │ Teodoro       │ 1     │ -         │
  │ Ray           │ 0     │ -         │
  │ Pham's Bakery │ 0     │ -         │
  │               │ 0     │ -         │
  5 on the switchboard.
  ```

- [ ] 💥 **Point at the blank row, and wait.** *"No crash, and no complaint. There's a caller with no name on my switchboard, and it's already in the database."*
- [ ] **SQL Server view: right-click `dbo.Callers` → Select Top 1000.** The last row has an empty `Name`
- [ ] 📖 *"Nobody typed this, so there's nobody to ask. And Import can't print anything, because Import does the thinking. So when a file lies, Import throws."*
- [ ] **Take that row out. SQL Server view: right-click your database → New Query, paste this, and run it**

  ```sql
  DELETE FROM Callers WHERE Name = ''
  ```

- [ ] 📖 *"Before I fix Import, I'll write down what it should do, as a test. A bad list throws, and it adds nobody at all."*
- [ ] **In the Explorer, right-click `week-13/Lab.Tests` → New File → `DayListTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about a bad day list, written before the fix.

  namespace Lab.Tests;

  public class DayListTests
  {
      [Fact]
      public void ABadListAddsNobody()
      {
          string path = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
          File.WriteAllText(path, """[ "Ray", "" ]""");

          Switchboard board = new Switchboard();

          Assert.Throws<InvalidDataException>(() => board.Import(path));
          Assert.Equal(0, board.Count);
      }
  }
  ```

- [ ] 📖 **Highlight the two lines starting `string path` and `File.WriteAllText`:** *"The test writes its own small file, in the computer's temp folder. Ray, and a blank. The three quotes let me put quotes inside a string without a backslash on each one."*
- [ ] 📖 **Highlight `Assert.Throws`:** *"Assert.Throws runs the code in its brackets, and it passes only if that exception comes out."*
- [ ] 📖 **Highlight `Assert.Equal(0, board.Count)`:** *"And then the part that matters. Ray is a good name, and it comes first in the file. It still must not get in. A bad list adds nobody."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-13/Lab.Tests
  ```

  ```
    Failed Lab.Tests.DayListTests.ABadListAddsNobody
    Error Message:
     Assert.Throws() Failure: No exception was thrown
  ```

- [ ] 📖 *"Red. No exception was thrown, the same as on the desk."*
- [ ] **Open `week-13/Lab/Switchboard.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  List<string> names = JsonSerializer
  ```

- [ ] 📖 **Highlight the whole line, then the `foreach` under it, and say what it does now:** *"Import reads the day list and adds each new name to the switchboard. Right now it adds each name as it comes to it, even a blank one. I want it to look at every name first, and refuse the whole file if one is blank. If it stopped halfway through adding, the good names ahead of the blank one would already be in."*
- [ ] **Click at the end of that `List<string> names` line, press Enter twice, and paste this**

  ```csharp
          // The whole list first: a blank name throws before anybody is added.
          foreach (string name in names)
          {
              if (string.IsNullOrWhiteSpace(name))
              {
                  throw new InvalidDataException("The list has a blank name on it.");
              }
          }
  ```

- [ ] 📖 **Highlight the `throw new` line:** *"Throw makes an exception and sends it up. This method stops right here. The next lines never run, so nobody gets added."*
- [ ] **Run the tests again**

  ```bash
  dotnet test week-13/Lab.Tests
  ```

  ```
  Total tests: 14
       Passed: 14
  ```

- [ ] 📖 *"Fourteen passed, my new one included. Now the desk, with the same bad list."*
- [ ] **Run the desk: DJ name, then `l`, then the same file**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/bad-list.json
  ```

- [ ] 💥 **Point at the first line.** It reads `Unhandled exception. System.IO.InvalidDataException: The list has a blank name on it.`
- [ ] 📖 *"The test is green, and the desk crashed. That's correct. Import did its job and threw. Nobody caught it yet. Green here only means Import throws."*
- [ ] **Open `week-13/Lab/SwitchboardDesk.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  catch (JsonException)
  ```

- [ ] **Click at the end of the closing `}` of that catch, press Enter, and paste this**

  ```csharp
              catch (InvalidDataException problem)
              {
                  AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]{Markup.Escape(problem.Message)}[/] [{Dim}]Nothing was added.[/]");
                  return;
              }
  ```

- [ ] 📖 **Highlight `problem`, then `problem.Message`:** *"This time the catch gives the exception a name, so it can read the message Import wrote. The class that knows what went wrong writes the words, and the class that talks to the person prints them."*
- [ ] **Run the desk: DJ name, then `l`, then the same file, then `c`, then `q`**

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```text
  week-13/deliveries/bad-list.json
  ```

  ```
    Refused: The list has a blank name on it. Nothing was added.
  ```

  ```
  │ Dorothy       │ 3     │ -         │
  │ Teodoro       │ 1     │ -         │
  │ Ray           │ 0     │ -         │
  │ Pham's Bakery │ 0     │ -         │
  4 on the switchboard.
  ```

- [ ] 📖 *"Refused, in one sentence, and four on the switchboard."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 13: a bad list adds nobody"
  ```

- [ ] **Push it to the starters repo — one block, as in §2.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-13/Lab/SwitchboardDesk.cs ../dotnet-db-starters/demo/week-13/ && cp week-13/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-13/ && cp week-13/Lab.Tests/DayListTests.cs ../dotnet-db-starters/demo/week-13/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 13 demo: a bad list adds nobody" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab D · Task 3 — 22 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: copy my three files in. Your bad file has a cart that's minus 198 seconds long. See it get in, then your test, red. Then check the whole file first, and throw. Then the catch. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student whose throw sits in the same loop as the `Add` gets check 4's message about the good carts getting in. That's the lesson: one loop checks, a second loop adds
- [ ] 🎯 **Ask somebody why the `Seconds` property didn't stop it.** *(It refuses quietly, so the cart came in with no length at all. Quiet is right for a person at a prompt. A file has nobody to tell.)*

---

## 5 · The row is gone *(slide 4)*

- [ ] 📖 *"Last one, and the desk can't fix this one at all. Two desks are open on one database. On the first one, I sign in and leave it sitting at the menu."*
- [ ] **In the terminal, run the desk: DJ name, then stop at the menu**

  ```bash
  dotnet run --project week-13/Lab
  ```

- [ ] **Click **+** at the top of the terminal panel for a second terminal. Run a second desk there: DJ name, then `p`, which pulls a cart, then `Slack Water`, then `q`.** `--no-build` skips the build, because the first desk just did it

  ```bash
  dotnet run --no-build --project week-13/Lab
  ```

  ```
    Pulled: Slack Water - 2 carts left in the rotation.
  ```

- [ ] 📖 *"The second desk pulled Slack Water, and its row has gone from the table. The first desk doesn't know. When the program starts, we load the data into memory, so the first desk is still holding Slack Water in its list."*
- [ ] **Click back to the first terminal. Press `a`.** `a` puts the hour on air, and the rotation saves right after

  ```
    ON AIR  SONG - Long Way Round - The Ferrymen
  ```

- [ ] 💥 **Point at the first line under it.** It reads `Unhandled exception. Microsoft.EntityFrameworkCore.DbUpdateException: An error occurred while saving the entity changes.`
- [ ] 📖 *"Every cart went out on air, the desk tried to save an airing for a cart with no row, and the database refused. Every airing must have a cart attached to it."*
- [ ] 📖 *"Asking again won't help, and neither will saying no and carrying on. Every save from here will fail the same way. This is the fourth answer. Stop, in a sentence."*
- [ ] 📖 *"Nothing is lost that was saved. SaveChanges sends everything or nothing, and the desk has been saving after every change."*
- [ ] **Open `week-13/Lab/Program.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // TODO — Task 4: if a row is gone
  ```

- [ ] 📖 **Before you change it, say what it does now:** *"This is where the whole shift runs. It takes one key after another until I press q, and most keys save something. Right now, if a save fails because a row is gone, the whole program stops with that wall of text. I want the desk to stop with two sentences instead: what happened, and what to do next."*
- [ ] **Select that one comment line and paste this over it**

  ```csharp
  // A row the desk is holding can go from its table while the desk is open.
  // Nothing can be saved after that, so the desk stops, in a sentence.
  try
  {
  ```

- [ ] **Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  AnsiConsole.MarkupLine($"[{Dim}]Keep it quiet out there.[/]");
  ```

  **Click at the end of that line, press Enter, and paste this**

  ```csharp
  }
  catch (DbUpdateException)
  {
      Console.WriteLine();
      Console.WriteLine("A row this desk was holding has gone from its table, so the desk can't save.");
      Console.WriteLine("Everything up to the last save is safe. Run the desk again to pick up from there.");
      return;
  }
  ```

- [ ] 📖 **Highlight `catch (DbUpdateException)`:** *"This try wraps the whole shift, from the first key to the last save. The catches in SwitchboardDesk are around one key, and the desk carries on. This one is around everything, and the desk stops."*
- [ ] 📖 **Highlight `return;`:** *"Return at the top of a program ends the program."*
- [ ] **`DbUpdateException` comes from EF Core.** Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:

  ```text
  using Spectre.Console;
  ```

  **Click at the end of that line, press Enter, and paste this**

  ```csharp
  using Microsoft.EntityFrameworkCore;
  ```

- [ ] **Tidy the indenting: Format Document, <kbd>⇧⌥F</kbd> / <kbd>Shift+Alt+F</kbd>.** Silent
- [ ] 📖 *"Two desks again. This time the second desk takes Ray off the switchboard."*
- [ ] **In the first terminal, run the desk: DJ name, then stop at the menu**

  ```bash
  dotnet run --project week-13/Lab
  ```

- [ ] **In the second terminal, run a desk: DJ name, then `x`, then `Ray`, then `q`**

  ```bash
  dotnet run --no-build --project week-13/Lab
  ```

- [ ] **Click back to the first terminal. Press `q`.** `q` saves everything the desk is holding, and it's still holding Ray

  ```
  A row this desk was holding has gone from its table, so the desk can't save.
  Everything up to the last save is safe. Run the desk again to pick up from there.
  ```

- [ ] 📖 *"The same kind of failure, and now the person gets two sentences and knows what to do."*
- [ ] 📖 *"One more way to stop. Every desk needs its database. So what happens when the database isn't there?"*
- [ ] ⚠️ **Turn your Wi-Fi off now, or pull the cable.**
- [ ] **Run the desk.** It waits about fifteen seconds, then crashes, before it asks for a DJ

  ```bash
  dotnet run --project week-13/Lab
  ```

- [ ] 💥 **Point at the first lines.** Find `SqlException`. It may be on the first line, or on the next one, inside an `InvalidOperationException`
- [ ] 📖 *"That's what the network going away looks like. Different failures come back under different names, and sometimes one exception is wrapped inside another. I don't want to guess at names here. EF Core has a method that asks the question directly."*
- [ ] **In `week-13/Lab/Program.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // TODO — Task 4: the desk should say so
  ```

- [ ] 📖 **Before you change it, say what happens there now:** *"This is where the desk sets up its connection to the database, before anything else happens. Right now it never checks that the database is there, so with no network the first thing I see is that crash. I want it to check first. If it can't reach the database, it should say so in a sentence and stop."*
- [ ] **Select that one comment line and paste this over it**

  ```csharp
  // No database, no shift. Nothing the desk does works without it.
  if (!db.Database.CanConnect())
  {
      Console.WriteLine("The desk can't reach its database, so the shift can't start.");
      Console.WriteLine("Check your network and your connection string, then run it again.");
      return;
  }
  ```

- [ ] 📖 **Highlight `db.Database.CanConnect()`:** *"CanConnect tries the database and hands back true or false. No exception to catch. It's a say-no answer, and the program uses it to stop."*
- [ ] **Run the desk.** Same wait, about fifteen seconds

  ```bash
  dotnet run --project week-13/Lab
  ```

  ```
  The desk can't reach its database, so the shift can't start.
  Check your network and your connection string, then run it again.
  ```

- [ ] ⚠️ **Turn your Wi-Fi back on, or plug the cable in. Wait for it to connect.**
- [ ] **Run the desk, to prove it's back: DJ name, then `q`**

  ```bash
  dotnet run --project week-13/Lab
  ```

- [ ] 🎞️ **GO TO SLIDE 4** — *Every crash so far* · *"Most of the crashes you've had, you already fixed by asking first: TryParse instead of Parse, FirstOrDefault instead of First, a check for null. Tonight's can't be asked about ahead of time, because the world outside the program changed. So each one gets one of the four answers."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 13: the desk stops in a sentence"
  ```

- [ ] 💡 **No push this time.** `Program.cs` is theirs in Task 4, so they write the same lines themselves

---

## Lab E · Task 4 — 20 minutes

- [ ] **Lids up. The lab README, at *Task 4 in full*.**
- [ ] 📖 *"Task 4: two desks, the same as I just did. See it crash, then the catch around the shift, and CanConnect at the top. Nothing to copy from me this time. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** `CS0246` on `DbUpdateException` is the missing `using Microsoft.EntityFrameworkCore;` at the top of `Program.cs`
- [ ] 🎯 **Students on a lab machine can't easily turn the network off.** The README tells them to skip that run and read the block. The check doesn't need it

---

## ☕ Break

---

## Lab F · Finish, then start the homework — 40 minutes

- [ ] **Lids up. The lab README, wherever each person is.** Anyone not finished works on their next task
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It's tonight's lab again, on your own project, and it's four tasks. Push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. Don't ask for either
- [ ] ⚠️ **Stop at 3:38 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 6 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"Ask again, when the person can fix it. Say no, when the answer is simply no. Throw, when a method can't do its job. Stop, when the program can't carry on. The thinking class throws, and the class that talks to people catches."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. Your registry reads a file of names, and your program asks again, refuses a bad file, and stops in a sentence. Four tasks. Your database carries on. You don't drop anything."*
- [ ] ⚠️ **Say the last-homework line out loud** — *"This is the last homework of the semester. Nothing is collected in the next two weeks. Week sixteen you present."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToTwelveStillHold. If yours says FourToEleven, you are running last week's."*
- [ ] 📖 **The due date** — *"This homework is due before our next class."*
