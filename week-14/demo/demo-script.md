# Week 14 Demo — The Old Carts 📻

**KDXR 88.1 · the overnight desk · two new columns, and every row kept**

Tonight the tables get new columns, and nothing that's already in them is lost. You work on the **callers**, live, and the students work on the **carts**. Each new column is a property in the class, then a migration, then a run that shows the rows are all still there. Then the room spends the second half of the night on their own projects.

> **The shape of the night:** a column nobody knows → a column everybody knows → the warning, and taking a migration back → their own project → the week 16 runway. **Each of the first two demo segments is followed by the lab task that practices it.**

**Total: ~53 minutes of demo, in six short segments, then two lab blocks and two project blocks.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-14-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-14-rehearsal
> ```
>
> Then **delete the `week-14` folder** from the Explorer. Switching to `main` removed the files you committed, but not `bin` or `obj`.
>
> **Empty `demo/week-14/` in the starters repo**, because your rehearsal pushes reached the real one students read:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-14
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 14 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> **Then run the database reset below again.** A rehearsal leaves your database with the new columns in it.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-14/demo/script.html) and confirm the top line says *two new columns, and every row kept*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] 💡 **Type your database name in the Database box at the top of the published page.** Every mention of it on the page changes, including what the Copy buttons hand you. It is saved on this device
- [ ] ⚠️ **Check your secret before class, off the projector.** Week 14's starter uses the same fixed `UserSecretsId` as weeks 11 to 13. In a terminal tab nobody can see, ask the store what it holds. The password prints as `****`, and the server and login do not:

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

- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it twice. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room
- [ ] ⚠️ **`demo/week-14/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-14
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 14 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] ⚠️ **Reset your desk's database to the first night, off the projector.** This is the only drop of the night, and it happens before class, so every table on this sheet matches your screen: three callers and three carts. It runs on the starters clone's copy of week 14, because yours isn't copied in until Lab A. **Build it first**, or `dotnet ef` says `Unable to retrieve project metadata`:

  ```bash
  dotnet build ../dotnet-db-starters/week-14/Lab
  ```

  ```bash
  dotnet ef database drop --force --project ../dotnet-db-starters/week-14/Lab
  ```

  ```bash
  dotnet ef database update --project ../dotnet-db-starters/week-14/Lab
  ```

  **Then run the desk once and quit**, so the first night's callers and carts are saved: DJ name, then `q`.

  ```bash
  dotnet run --project ../dotnet-db-starters/week-14/Lab
  ```

  `Keep it quiet out there.` is the last line you want
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin. **In the terminal**, drag across the words
- [ ] ⚠️ **Delete `week-14/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-14/lab/README.md` on GitHub). It is the projector screen for both lab blocks tonight
- [ ] **A second browser tab on the project work** (`week-14/homework.md` on GitHub), for the two project blocks
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · Two new columns

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is about changing a table that already has rows in it. We'll add two columns to the switchboard and keep every caller. You'll add two to the carts and keep every cart. Then we take a migration back, before it ever runs. The second half of the night is yours, on your own project."*
- [ ] 🎯 **Ask for hands, and wait:** *"Who has records in their project's database right now that they typed in themselves?"*
- [ ] 📖 *"Those are the rows we're keeping tonight. Adding a column is easy. Keeping every row while you do it is the part that needs care."*

---

## Lab A · Setup, together — 11 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do every step on your own machine at the same time as the room, in your demo repo's terminal. You copy week 14 in, exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of three. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-14/Lab.Checks
  ```

- [ ] **Bring the database up to date, the same command as the README**

  ```bash
  dotnet ef database update --project week-14/Lab
  ```

  ```
  No migrations were applied. The database is already up to date.
  Done.
  ```

- [ ] 📖 *"Nothing to do. My database already has everything this week starts with, and so does yours if you did last week's lab here."*
- [ ] **Run the desk: DJ name, then `t`, then `c`. Stop there, at the menu.** `t` shows the carts, and `c` shows the switchboard

  ```bash
  dotnet run --project week-14/Lab
  ```

  ```
  3 carts loaded.
  ```

  ```
  3 on the switchboard.
  ```

- [ ] 📖 **In the terminal, highlight `3 on the switchboard.`:** *"Three callers on my switchboard: Dorothy, Bex and Teodoro. Count your own carts. Whatever your number is, every one of those carts has to still be there at the end of the night."*
- [ ] **Press `q`.** Silent
- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 14: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · A column nobody knows *(slide 2)*

- [ ] 📖 *"First column. I want the switchboard to show when each caller first rang the desk."*
- [ ] **Open `week-14/Lab/Caller.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public string Name { get; private set; }
  ```

- [ ] 📖 **Before you change it, say what it is for:** *"A caller is somebody who rang the desk. I want the desk to remember the day each caller first rang. Dorothy, Bex and Teodoro rang before anybody wrote that down. Nobody knows their date, so the switchboard should show a dash for them. Anyone who rings from tonight on gets the day they rang."*
- [ ] **Click at the end of that line, press Enter twice, and paste this**

  ```csharp
      // When this caller first rang the desk. Nobody wrote it down for the
      // callers already in the table, so for them it is nothing at all.
      public DateTime? FirstCalled { get; private set; }

      // The same date, for the switchboard's FIRST CALLED column: a dash when
      // there is nothing to show.
      public string FirstCall()
      {
          if (FirstCalled == null)
          {
              return "-";
          }

          return FirstCalled.Value.ToString("yyyy-MM-dd");
      }
  ```

- [ ] 📖 **Highlight the `?` in `DateTime?`:** *"The question mark means this can hold nothing at all. That's the true answer for the three callers I already have."*
- [ ] 📖 **Highlight `return "-";`:** *"And when there's nothing, the screen shows a dash."*
- [ ] **Search for this line in the same file, one hit — it's in the constructor:**

  ```text
  Name = name;
  ```

  **Click at the end of it, press Enter, and paste this**

  ```csharp
          FirstCalled = DateTime.Now;
  ```

- [ ] 📖 *"Every caller made from now on gets today's date the moment they're made. The three I have don't come through here again. They come out of the table."*
- [ ] **Now the switchboard screen. Open `week-14/Lab/Program.cs`, and search for this line — one hit:**

  ```text
  .AddColumn($"[{Dim}]ASKED FOR[/]");
  ```

  **Select that line and paste this over it.** The `;` moves down to the new last line

  ```csharp
          .AddColumn($"[{Dim}]ASKED FOR[/]")
          .AddColumn($"[{Dim}]FIRST CALLED[/]");
  ```

- [ ] **Search for this line — one hit:**

  ```text
  $"[{Dim}]{Markup.Escape(caller.LastAsked())}[/]");
  ```

  **Select that line and paste this over it**

  ```csharp
              $"[{Dim}]{Markup.Escape(caller.LastAsked())}[/]",
              $"[{Dim}]{caller.FirstCall()}[/]");
  ```

- [ ] 📖 *"The class has a new property, and the table doesn't have a column for it yet. A migration adds it."*
- [ ] **Write the migration**

  ```bash
  dotnet ef migrations add ACallerHasAFirstCall --project week-14/Lab
  ```

  ```
  Done. To undo this action, use 'ef migrations remove'
  ```

- [ ] **In the Explorer, open `week-14/Lab/Migrations/` and the file ending `_ACallerHasAFirstCall.cs` — not the `.Designer.cs` one. Highlight the whole `AddColumn` inside `Up`**

  ```text
              migrationBuilder.AddColumn<DateTime>(
                  name: "FirstCalled",
                  table: "Callers",
                  type: "datetime2",
                  nullable: true);
  ```

- [ ] 📖 *"Before I run a migration, I read it. Up is what it will do to my database. It adds one column, called FirstCalled, to the Callers table."*
- [ ] 📖 **Highlight `nullable: true`:** *"And the column can be empty. So Dorothy, Bex and Teodoro each get nothing in it. Nothing is dropped, so every row stays."*
- [ ] **Run it**

  ```bash
  dotnet ef database update --project week-14/Lab
  ```

  ```
  Applying migration '20261109014104_ACallerHasAFirstCall'.
  Done.
  ```

- [ ] **Run the desk: DJ name, then `c`. Stop there, at the menu**

  ```bash
  dotnet run --project week-14/Lab
  ```

  ```
  │ CALLER  │ CALLS │ ASKED FOR │ FIRST CALLED │
  │ Dorothy │ 3     │ -         │ -            │
  │ Bex     │ 1     │ -         │ -            │
  │ Teodoro │ 1     │ -         │ -            │
  3 on the switchboard.
  ```

- [ ] 📖 **In the terminal, highlight `3 on the switchboard.`, then the three dashes:** *"Three callers before the migration, and the same three after it, with the same calls. Each one has a dash, because nobody knows when they first rang."*
- [ ] **Press `r` to take a request: `Ray` as the caller, then Enter for whatever's next. Then `c`. Stop at the menu again.** Ray has never rung this desk before

  ```
  │ Ray     │ 1     │ Nightjar  │ 2026-11-24   │
  4 on the switchboard.
  ```

- [ ] 📖 **In the terminal, highlight Ray's date:** *"Ray rang just now, so Ray has today's date. The three old callers still have their dashes."*
- [ ] **Press `q`.** Silent
- [ ] 🎞️ **GO TO SLIDE 2** — *Two rules for a new column* · *"When you add a column, ask what the true value is for the rows you already have. If nobody knows, the column can be empty, and the old rows get nothing. That's what we just did. If everybody knows the value, the migration has to say what it is. That's next."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 14: a column nobody knows"
  ```

- [ ] **Push it to the starters repo, for them to read on GitHub — one block copies the class and the migration there, commits there, and pushes.** Silent; they watch. `main -> main` at the end means it reached GitHub

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-14 && cp week-14/Lab/Caller.cs week-14/Lab/Migrations/*_ACallerHasAFirstCall.cs ../dotnet-db-starters/demo/week-14/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 14 demo: a column nobody knows" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab B · Task 1 — 18 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.**
- [ ] 📖 *"Task 1: the same thing on your carts. When each cart was added, with a dash for the old ones. Nothing to copy from me this week. My files are on GitHub to read, and the README says why. Run the desk before your migration, and watch it crash. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** `Invalid column name 'Added'` is the crash the README asks for. It means the migration hasn't been made and run yet
- [ ] 🎯 `CS1513` or `CS1002` in `Program.cs` is a `;` that didn't move down in the column chain or the cells
- [ ] 🎯 **Ask somebody to show you their migration's `Up` before they run `update`.** *(It should say `AddColumn`, `Songs`, and `nullable: true`.)*

---

## 3 · A column everybody knows

- [ ] 📖 *"Second column. One day the desk may need to stop taking somebody's calls. So each caller gets a yes or a no: is this caller welcome?"*
- [ ] **In `week-14/Lab/Caller.cs`, search for this line again — one hit:**

  ```text
  public string Name { get; private set; }
  ```

- [ ] 📖 **Before you change it, say what it is for:** *"Every caller starts out welcome. That's true of the callers I already have, too. Nobody has ever been turned away from this desk. So every caller on the switchboard should say yes."*
- [ ] **Click at the end of that line, press Enter twice, and paste this**

  ```csharp
      // Whether the desk takes this caller's calls. Every caller starts out
      // welcome, and nobody has ever been turned away.
      public bool Welcome { get; set; } = true;
  ```

- [ ] 📖 **Highlight `= true`:** *"No question mark this time, because every caller has an answer. And the answer starts as true."*
- [ ] **In `week-14/Lab/Program.cs`, search for this line — one hit:**

  ```text
  .AddColumn($"[{Dim}]FIRST CALLED[/]");
  ```

  **Select that line and paste this over it**

  ```csharp
          .AddColumn($"[{Dim}]FIRST CALLED[/]")
          .AddColumn($"[{Dim}]WELCOME[/]");
  ```

- [ ] **Search for this line — one hit:**

  ```text
  $"[{Dim}]{caller.FirstCall()}[/]");
  ```

  **Select that line and paste this over it**

  ```csharp
              $"[{Dim}]{caller.FirstCall()}[/]",
              $"[{Fg}]{(caller.Welcome ? "yes" : "no")}[/]");
  ```

- [ ] **Write the migration**

  ```bash
  dotnet ef migrations add CallersAreWelcome --project week-14/Lab
  ```

- [ ] 📖 *"For the first column, I read the migration before I ran it. This is the step people skip, so this time I'll skip it too, and you'll see what it costs."*
- [ ] **Run it, without opening it**

  ```bash
  dotnet ef database update --project week-14/Lab
  ```

  ```
  Applying migration '20261109014137_CallersAreWelcome'.
  Done.
  ```

- [ ] **Run the desk: DJ name, then `c`. Stop there, at the menu**

  ```bash
  dotnet run --project week-14/Lab
  ```

  ```
  │ CALLER  │ CALLS │ ASKED FOR │ FIRST CALLED │ WELCOME │
  │ Dorothy │ 3     │ -         │ -            │ no      │
  │ Bex     │ 1     │ -         │ -            │ no      │
  │ Teodoro │ 1     │ -         │ -            │ no      │
  │ Ray     │ 1     │ Nightjar  │ 2026-11-24   │ no      │
  4 on the switchboard.
  ```

- [ ] 💥 **In the terminal, highlight the four `no`s, and wait.** *"Four callers, and every one of them is not welcome. Dorothy has rung this desk most nights for years. The class says every caller starts out welcome."*
- [ ] **Now open the migration I skipped: the file ending `_CallersAreWelcome.cs`. Highlight `defaultValue: false`**

  ```text
              migrationBuilder.AddColumn<bool>(
                  name: "Welcome",
                  table: "Callers",
                  type: "bit",
                  nullable: false,
                  defaultValue: false);
  ```

- [ ] 📖 *"Here's why. The = true in my class only reaches callers made from now on. The callers already in the table get whatever the migration says. And migrations add wrote false, because false is where a bool starts. It didn't warn me."*
- [ ] 📖 **In the terminal, highlight `4 on the switchboard.`:** *"Every row is still there. What's wrong is the value in them."*
- [ ] **Press `q`.** Silent
- [ ] 📖 *"So I take the migration back. Database update with the name of an earlier migration runs the later ones backward."*
- [ ] **Take it back, to the first migration of tonight**

  ```bash
  dotnet ef database update ACallerHasAFirstCall --project week-14/Lab
  ```

  ```
  Reverting migration '20261109014137_CallersAreWelcome'.
  Done.
  ```

- [ ] 📖 *"Running it backward drops the Welcome column again. The rows themselves aren't touched. Before I fix the migration, I'll write down what it should do, as a test."*
- [ ] **In the Explorer, right-click `week-14/Lab.Tests` → New File → `WelcomeTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about the Welcome column, written before the fix.

  using Microsoft.EntityFrameworkCore.Migrations;
  using Microsoft.EntityFrameworkCore.Migrations.Operations;
  using Lab.Migrations;

  namespace Lab.Tests;

  public class WelcomeTests
  {
      [Fact]
      public void TheOldCallersAreWelcome()
      {
          Migration migration = new CallersAreWelcome();

          AddColumnOperation welcome = migration.UpOperations
              .OfType<AddColumnOperation>()
              .Single(op => op.Name == "Welcome");

          Assert.Equal(true, welcome.DefaultValue);
      }
  }
  ```

- [ ] 📖 **Highlight `new CallersAreWelcome()`:** *"A migration is a class, with the name I gave it. The test makes one, and never touches a database."*
- [ ] 📖 **Highlight `UpOperations`:** *"UpOperations is the list of everything Up would do. This line picks out the step that adds the Welcome column."*
- [ ] 📖 **Highlight `Assert.Equal(true, welcome.DefaultValue)`:** *"And this says the callers already in the table get true."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-14/Lab.Tests
  ```

  ```
    Failed Lab.Tests.WelcomeTests.TheOldCallersAreWelcome
    Error Message:
     Assert.Equal() Failure: Values differ
  Expected: True
  Actual:   False
  ```

- [ ] 📖 *"Red. The test got false, the same false that gave the switchboard its four no's."*
- [ ] **In the `_CallersAreWelcome.cs` migration, search for this — one hit — and change `false` to `true`**

  ```text
  defaultValue: false
  ```

  It reads:

  ```text
                  defaultValue: true);
  ```

- [ ] 📖 *"A migration is a file I can edit. Nothing has run it now, so this is the moment to make it say what's true."*
- [ ] **Run the tests again**

  ```bash
  dotnet test week-14/Lab.Tests
  ```

  ```
  Total tests: 16
       Passed: 16
  ```

- [ ] **Run the migration again**

  ```bash
  dotnet ef database update --project week-14/Lab
  ```

- [ ] **Run the desk: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-14/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │ -            │ yes     │
  │ Bex     │ 1     │ -         │ -            │ yes     │
  │ Teodoro │ 1     │ -         │ -            │ yes     │
  │ Ray     │ 1     │ Nightjar  │ 2026-11-24   │ yes     │
  4 on the switchboard.
  ```

- [ ] 📖 *"Four callers, the same four, and every one of them is welcome."*
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 14: a column everybody knows"
  ```

- [ ] **Push it to the starters repo — one block, as in §2.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-14/Lab/Caller.cs week-14/Lab/Migrations/*_CallersAreWelcome.cs week-14/Lab.Tests/WelcomeTests.cs ../dotnet-db-starters/demo/week-14/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 14 demo: a column everybody knows" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab C · Task 2 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.**
- [ ] 📖 *"Task 2: three stars for every cart, the old ones too. This time you read the migration first, and you don't run it. Write the test, see it red, fix the migration, see it green. Then run it. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student who already ran `update` with the `0` has old carts with 0 stars. The README's last box in Task 2 takes it back
- [ ] 🎯 `CS0246` on `Migration` or `AddColumnOperation` is the three using lines missing from `DeskTests.cs`
- [ ] 🎯 **Ask somebody why the `= 3` in `Song.cs` didn't reach the old carts.** *(The class only makes carts from now on. The migration fills in the rows already there.)*

---

## ☕ Break

---

## 4 · The warning, and taking it back *(slide 3)*

- [ ] 📖 *"One more change, and this one I won't run at all. A caller's name should never need more than forty characters."*
- [ ] **In `week-14/Lab/Caller.cs`, search for this line — one hit:**

  ```text
  public class Caller
  ```

  **Select that line and paste this over it**

  ```csharp
  using System.ComponentModel.DataAnnotations;

  public class Caller
  ```

- [ ] **Search for this line — one hit — select it, and paste this over it**

  ```text
  public string Name { get; private set; }
  ```

  ```csharp
      [MaxLength(40)]
      public string Name { get; private set; }
  ```

- [ ] **Write the migration**

  ```bash
  dotnet ef migrations add ShorterNames --project week-14/Lab
  ```

  ```
  An operation was scaffolded that may result in the loss of data. Please review the migration for accuracy.
  Done. To undo this action, use 'ef migrations remove'
  ```

- [ ] 📖 **In the terminal, highlight `may result in the loss of data`:** *"This line is EF Core telling me to stop and read the migration before I run it."*
- [ ] **Open the file ending `_ShorterNames.cs`, and highlight `nvarchar(40)`**

  ```text
              migrationBuilder.AlterColumn<string>(
                  name: "Name",
                  table: "Callers",
                  type: "nvarchar(40)",
                  maxLength: 40,
                  nullable: false,
                  oldClrType: typeof(string),
                  oldType: "nvarchar(max)");
  ```

- [ ] 📖 *"It changes the Name column so it can only hold forty characters. Any name already in the table that's longer than that is a problem. The migration can't see the names, so it warns me instead."*
- [ ] 📖 *"I haven't run it, so taking it back is one command."*
- [ ] **Take it back**

  ```bash
  dotnet ef migrations remove --project week-14/Lab
  ```

  ```
  Removing migration '20261109014148_ShorterNames'.
  Reverting the model snapshot.
  Done.
  ```

- [ ] 📖 **In the Explorer, highlight `week-14/Lab/Migrations/`:** *"The ShorterNames files are gone. Remove only works on a migration that hasn't been run. Once it's run, you take it back with database update and an earlier name, the way we did with Welcome."*
- [ ] **Undo the two edits in `Caller.cs`: select the `[MaxLength(40)]` line and delete it, then select the `using System.ComponentModel.DataAnnotations;` line and the blank line under it, and delete them.** Silent
- [ ] 🎞️ **GO TO SLIDE 3** — *Read it before you run it* · *"Three things to read in every migration before you run it. Does it add, or does it drop? What do the rows already there get? And did migrations add print that loss-of-data line? If it looks wrong and you haven't run it, migrations remove takes it back. If you have run it, database update with the earlier name does."*

---

## Lab D · Your own project — 45 minutes

- [ ] **Lids up. The project work in the browser, at *Part 1*.** Everyone switches to their project repo's window
- [ ] 📖 *"Now your own project. Nothing tonight is graded, and nothing goes in Canvas. It's the same two columns, on your own records. And this is the database with your real records in it, so you're doing it here, with me in the room."*
- [ ] 📖 *"Before anything else, count your rows. Part 1 says how. That's the number you check after each migration."*
- [ ] 🎯 **Circulating: ask each person to show you their migration's `Up` before they run `update`.** That is the one moment this block exists for
- [ ] 🎯 **A migration with `DropColumn`, `DropTable` or `AlterColumn` in it**, or the loss-of-data line: stop them, and `migrations remove`
- [ ] 🎯 **Anyone whose week 13 checks aren't 5 / 5 in Part 1:** that's unfinished week 13 work, and its message names what's missing. Finish that before the two columns, if there's time

---

## ☕ Break

---

## 5 · The week 16 runway *(slide 4)*

- [ ] 🎞️ **GO TO SLIDE 4** — *Week sixteen: four tens* · *"Week sixteen you present your project, for forty points, in four tens. It runs from start to finish. You show what it does. You explain one decision you made, and why. And you say what you'd do next. The next hour is for the first and the third."*
- [ ] 📖 *"First, a clean clone. You clone your own project into a new folder and run it from there, exactly as it is on GitHub. If it runs there, it runs in week sixteen."*
- [ ] 📖 *"Then three short notes in your README. What it does, one decision and why, and what's next. That's half of your presentation written down tonight."*

---

## Lab E · The week 16 runway — 53 minutes

- [ ] **Lids up. The project work, at *Part 3*.**
- [ ] 🎯 **Circulating:** a clean clone that won't build is the best thing to find tonight. Usually it's a file that was never committed
- [ ] 🎯 **Anyone behind on an earlier week:** a check that's still red is worth fixing now. Week sixteen runs the whole program
- [ ] ⚠️ **Stop at 3:40 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 6 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"Ask what the true value is for the rows you already have. Nobody knows: the column can be empty. Everybody knows: the migration says it. Read every migration before you run it. And remove takes one back, until it's been run."*
- [ ] 📖 **Say what's left** — *"Nothing tonight is graded. If you didn't finish your two columns, finish them at home: your database has your real records in it, so read each migration before you run it. Week sixteen you present."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your project work goes on a branch, same as every week, and you merge it with the plain merge button. Nothing goes straight to main."*
