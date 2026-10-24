# Week 11 Demo — A Cart Comes Off 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk learns to take a row out of its database. You take a **caller** off the switchboard, live, and the students do the same thing to a **cart** in the rotation. After two of your segments you push your finished files, and they copy them in to read and run while they work.

> **The shape of the night:** a fresh database → a caller comes off, and comes back → out of the table too → saved as it happens. **Each demo segment is followed by the lab task that practices it.**

**Total: ~71 minutes of demo, in six short segments, and five lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-11-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-11-rehearsal
> ```
>
> Then **delete the `week-11` folder** from the Explorer. Switching to `main` removed the files you committed, but not `bin` or `obj`.
>
> **Your database needs nothing.** §2 drops it and makes it again in front of the room, so a rehearsal leaves nothing behind that matters.
>
> **Empty `demo/week-11/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-11
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 11 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-11/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] 💡 **Type your database name in the Database box at the top of the published page.** Every mention of it on the page changes, including what the Copy buttons hand you. It is saved on this device
- [ ] ⚠️ **Set this week's secret now, before class, off the projector.** This week's starter ships with a fixed `UserSecretsId`, so you can set it by that id before the folder even exists. Prepare the whole command with your real connection string, run it in a terminal tab nobody can see, and close the tab:

  ```text
  dotnet user-secrets set "ConnectionStrings:Desk" "Server=…;Database=DB_KDXR_156101411_JSG;User Id=…;Password=…;TrustServerCertificate=True" --id 3a11a2aa-0cab-4805-8552-f1f5a5099f53
  ```

  `Successfully saved` is the answer you want. **The same id ships in weeks 12 and 13**, so this is the last time you set it on this machine
- [ ] ⚠️ **A current `dotnet-ef`**, so no version warning prints on every command tonight:

  ```bash
  dotnet tool update --global dotnet-ef
  ```

- [ ] ⚠️ **The SQL Server view already knows your server**, connected, with the database left blank
- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it twice. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room
- [ ] ⚠️ **`demo/week-11/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-11
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 11 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin
- [ ] ⚠️ **Delete `week-11/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-11/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · What comes off

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is EF Core again, and the part we haven't done: taking a row out of a table. We start the week with a fresh database. A caller comes off the switchboard, comes back the next night, and then stays off. We save as things happen, not only at the end. And in your lab, a cart comes off the rotation and stays off."*
- [ ] 🎯 **Say what's missing, plainly:** *"Last week the desk learned to put rows in a table and change them. It still can't take a row out."*
- [ ] 📖 **Then the deal for the night:** *"I take a caller off the switchboard. You pull a cart off the rotation. After each piece I push my file, and you copy it in."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 11 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of three. Check 1 is everything the desk already does, the database included."*

  ```bash
  dotnet test week-11/Lab.Checks
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 11: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · A fresh database for the week

- [ ] 📖 *"Two things didn't come with the copy: my password, and my database."*
- [ ] **Open `week-11/Lab/Lab.csproj` and highlight the `<UserSecretsId>` line**
- [ ] 📖 *"This line is the UserSecretsId. Last week each of you made one with init. This week it ships in the starter, and it's the same in every week from now on. So you put your connection string in it once, tonight, and every later week finds it."*
- [ ] 📖 *"I've put mine in already, before class, because it has my password in it. You do yours in a minute, on your own screen."*
- [ ] 📖 *"Now the database. Mine remembers the migration I wrote last week. This week's starter brings its own migration. So I start the week with a fresh database."*
- [ ] **Drop it**

  ```bash
  dotnet ef database drop --force --project week-11/Lab
  ```

  ```
  Dropping database 'DB_KDXR_156101411_JSG' on server 'localhost,14333'.
  Successfully dropped database 'DB_KDXR_156101411_JSG'.
  ```

  *(Yours names your server.)*

- [ ] 📖 *"The force on the end of that command means don't ask me whether I'm sure. It's a lab database, and nothing in it is worth keeping."*
- [ ] **In the SQL Server view, right-click your connection → Refresh, and open Databases.** There is no `DB_KDXR_156101411_JSG`
- [ ] 📖 *"My database is gone. Now I make it again, from the migration in this week's starter."*

  ```bash
  dotnet ef database update --project week-11/Lab
  ```

  ```
  Applying migration '20261023163353_TheDeskMovesIn'.
  Done.
  ```

- [ ] **SQL Server view: Refresh, open Databases → `DB_KDXR_156101411_JSG` → Tables.** `dbo.Callers` and `dbo.Songs`, both empty
- [ ] **Run the desk: DJ name, then `c`, then `t`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  ```

  ```
  │ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
  │ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
  │ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
  3 carts loaded.
  ```

- [ ] 📖 *"The tables were empty, so the desk kept its three callers and its three carts. When I quit, it saved them."*
- [ ] **SQL Server view: right-click `dbo.Callers` → Select Top 1000**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 3 |
  | 2 | Bex | 1 |
  | 3 | Teodoro | 1 |

- [ ] 💡 **No commit here.** No file in the repo changed: the secret is in your home folder, and the drop and the update happened on the server

---

## Lab B · Task 1 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.**
- [ ] 📖 *"Task 1: the tool, then your connection string copied from last week's project into this week's. Then the drop and the update, and the desk once. Your check count stays at one out of three. Stop at the stop note after the commit."*
- [ ] ⚠️ **Do not run `dotnet user-secrets list` on the projector tonight.** It prints your password
- [ ] 🎯 **Circulate at 1b.** The commonest slip is pasting the whole line `list` printed, key and all. The desk then says `Keyword not supported: 'connectionstrings:desk'`. The fix is the `set` again, with only what comes after the `=`
- [ ] 🎯 **And at 1c:** `There is already an object named 'Callers'` means they ran `update` before `drop`

---

## 3 · A caller comes off, and comes back

- [ ] 📖 *"The desk has a new key this week. x takes a caller off the switchboard. Let's try it."*
- [ ] **Run the desk: DJ name, then `x`, type `Teodoro`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
    Take which caller off the board? Name:   Nobody called "Teodoro" on the switchboard.
  ```

- [ ] 📖 *"Teodoro is on the board, and the desk says he isn't."*
- [ ] **Open `week-11/Lab/Switchboard.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // Your instructor's, written live in class. The x key calls it.
  ```

  Highlight it and the four lines under it
- [ ] 📖 **Before you change Remove, say what it does now:** *"Right now Remove hands back false, whatever it's asked. That false is the 'Nobody called Teodoro' on the screen. I need it to find the caller, take them out of the list, and hand back true."*
- [ ] **Select from that comment line down to and including the `}` directly under `return false;`, and paste this over it**

  ```csharp
      public bool Remove(string name)
      {
          Caller? found = Find(name);

          if (found == null)
          {
              return false;
          }

          _callers.Remove(found);
          return true;
      }
  ```

- [ ] 📖 **Highlight `Caller? found = Find(name);`:** *"Find already hands back the caller with that name, or null when there isn't one."*
- [ ] 📖 **Highlight the `if` and its `return false;`:** *"No caller by that name is an answer. Remove says false, and nothing crashes."*
- [ ] 📖 **Highlight `_callers.Remove(found);`:** *"This Remove belongs to the list. It takes out that one caller. Then Remove says true."*
- [ ] **Run the desk: DJ name, then `x`, type `Teodoro`, then `c`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
    Take which caller off the board? Name:   Off the board: Teodoro - 2 left on the switchboard.
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  2 on the switchboard.
  ```

- [ ] 📖 *"Teodoro is off. Two callers on the switchboard. When I quit, the desk saves the switchboard."*
- [ ] **Run it again — the next night: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] 💥 **Let it sit. Then ask, and wait:** *"I took Teodoro off, and the desk saved. Why is he back?"*
- [ ] **SQL Server view: Select Top 1000 on `dbo.Callers` again**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 3 |
  | 2 | Bex | 1 |
  | 3 | Teodoro | 1 |

- [ ] 📖 *"His row never left the table. Save adds the new callers and updates the rest. Teodoro wasn't in the list any more, so Save never mentioned him. His row stayed, and Load read it straight back."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 11: a caller can come off"
  ```

- [ ] **Push it to the starters repo — one block copies the file there, commits there, and pushes.** Silent; they watch. `main -> main` at the end means it reached GitHub

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-11 && cp week-11/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-11/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 11 demo: a caller can come off" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 📖 *"My Switchboard is in the starters repo now. You copy it in first, and read its Remove before you write yours."*

---

## Lab C · Task 2 — 22 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.** Its first step is pulling my file and copying it in
- [ ] 📖 *"Task 2: copy my Switchboard in, then write Remove for the rotation. It's the same as mine, with carts. Then pull Long Way Round, quit, and run the desk again. It comes back, the way Teodoro did. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** *"Remove said true, and the rotation still holds…"* means `_songs.Remove(found);` is missing

---

## ☕ Break

---

## 4 · Out of the table too *(slide 2)*

- [ ] 📖 *"Before I fix Save, I'll write down what it should do, as a test. A caller taken off on one night is gone the next night. And the callers who weren't taken off are still there."*
- [ ] **In the Explorer, right-click `week-11/Lab.Tests` → New File → `RemovedCallerTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about taking a caller off, written before the fix.

  using Microsoft.EntityFrameworkCore;

  namespace Lab.Tests;

  public class RemovedCallerTests
  {
      [Fact]
      public void ACallerTakenOffStaysOff()
      {
          DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
              .UseInMemoryDatabase(Guid.NewGuid().ToString())
              .Options;

          Switchboard board = new Switchboard();
          board.Take("Dorothy");
          board.Take("Bex");
          board.Save(new DeskContext(options));

          DeskContext db = new DeskContext(options);
          Switchboard nextNight = new Switchboard();
          nextNight.Load(db);
          nextNight.Remove("Bex");
          nextNight.Save(db);

          Switchboard reopened = new Switchboard();
          reopened.Load(new DeskContext(options));

          Assert.Equal(1, reopened.Count);
          Assert.Null(reopened.Find("Bex"));
      }
  }
  ```

- [ ] 📖 **Nothing to highlight yet:** *"This test acts out two nights at the desk, then checks what the table holds."*
- [ ] 📖 **Highlight the two `Take` lines and the `board.Save` under them:** *"Night one. Dorothy and Bex ring, and the switchboard is saved."*
- [ ] 📖 **Highlight the four `nextNight` lines:** *"Night two. A new switchboard loads them back from the table, Bex comes off, and it's saved."*
- [ ] 📖 **Highlight the two `reopened` lines:** *"reopened is a third switchboard, loading from the table. It's the desk the night after. It only knows what's in the table."*
- [ ] 📖 **Highlight the two asserts:** *"Bex came off, so the table should hold one caller, and Find should find no Bex."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-11/Lab.Tests
  ```

  ```
    Failed Lab.Tests.RemovedCallerTests.ACallerTakenOffStaysOff
    Error Message:
     Assert.Equal() Failure: Values differ
  Expected: 1
  Actual:   2
  ```

- [ ] 📖 *"Red. The night after Bex came off, the table still held two callers. Teodoro came back on the desk the same way."*

- [ ] 📖 **Before you change Save, say what it does now:** *"Right now Save goes through the list. New callers go in, and the rest are updated. Then SaveChanges sends it all. Before it sends, I need it to take out every row that no caller in the list has."*
- [ ] **In `Switchboard.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  db.SaveChanges();
  ```

  **Select that one line and paste this over it**

  ```csharp
          foreach (Caller row in db.Callers.ToList())
          {
              if (!_callers.Any(caller => caller.Id == row.Id))
              {
                  db.Callers.Remove(row);
              }
          }

          db.SaveChanges();
  ```

- [ ] 📖 *"The last line I pasted is the same SaveChanges that was already there. The new loop goes in front of it."*
- [ ] 📖 **Highlight `db.Callers.ToList()`:** *"This reads every row in the table into a list."*
- [ ] 📖 **Highlight `_callers.Any(caller => caller.Id == row.Id)`:** *"Any asks a question: does any caller in my list have this row's Id?"*
- [ ] 📖 **Highlight the `!` in front of it:** *"The exclamation mark turns it round. No caller in the list has this Id, so that caller was taken off."*
- [ ] 📖 **Highlight `db.Callers.Remove(row);`:** *"This Remove marks the row to come out. It sends nothing on its own. SaveChanges sends it, along with the adds and the updates."*

  ```bash
  dotnet test week-11/Lab.Tests
  ```

  ```
  Total tests: 10
       Passed: 10
  ```

- [ ] 📖 *"Ten tests passed, my new one included."*
- [ ] 🎞️ **GO TO SLIDE 2** — *Three jobs for Save* · *"Save now does three things. A new caller, with Id zero, goes in. A caller that came out of the table is updated. And a row that no caller in the list has comes out. Then the table holds exactly what the list holds."*
- [ ] **Back to the editor. Run the desk: DJ name, then `x`, type `Teodoro`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
    Take which caller off the board? Name:   Off the board: Teodoro - 2 left on the switchboard.
  ```

- [ ] **Run it again — the next night: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  2 on the switchboard.
  ```

- [ ] 📖 *"Two callers on the switchboard. Teodoro stayed off."*
- [ ] **SQL Server view: Select Top 1000 on `dbo.Callers`**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 3 |
  | 2 | Bex | 1 |

- [ ] 📖 *"Dorothy and Bex, still Id 1 and Id 2. Only Teodoro's row came out."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 11: a caller stays off"
  ```

- [ ] **Push it to the starters repo — one block, as in §3.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-11/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-11/ && cp week-11/Lab.Tests/RemovedCallerTests.cs ../dotnet-db-starters/demo/week-11/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 11 demo: a caller stays off" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab D · Task 3 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: copy my two files in. Write your test first and see it red. Then add the loop to your Save. Then pull Long Way Round, quit, and check it stays pulled. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student who writes the fix first and the test after has skipped the point. Ask *"what color was your test the first time you ran it?"*
- [ ] 🎯 **An empty `dbo.Songs` after a run where nothing was pulled** is the `!` missing from `!_songs.Any(...)`

---

## ☕ Break

---

## 5 · Saved as it happens

- [ ] 📖 *"The desk saves when I press q. Let's see what happens to a shift that ends some other way."*
- [ ] **Run the desk: DJ name, then `r`, caller `Dorothy`, song `1`, then `c`. Don't quit**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 4     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  2 on the switchboard.
  ```

- [ ] 📖 *"Dorothy rang again. She has four calls."*
- [ ] **Press <kbd>Ctrl+C</kbd>**
- [ ] 📖 *"Ctrl+C stops a program on the spot. It's the same key on Mac and Windows. A crash, or a closed window, stops the desk the same way."*
- [ ] **Run the desk: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  ```

- [ ] 💥 **Ask, and wait:** *"Dorothy had four calls a minute ago. How many calls does she have now?"*
- [ ] 📖 *"Three. The fourth call only existed while the desk was running. The desk never got to q, so it never saved it."*
- [ ] 📖 *"So I'll save at the moment something changes, not only at the end."*
- [ ] **Open `week-11/Lab/Program.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  Caller caller = switchboard.Take(who);
  ```

  **Click at the end of that line, press Enter, and type** `switchboard.Save(db);`
- [ ] 📖 *"Every time a call comes in, the switchboard is saved right away."*
- [ ] **Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  if (switchboard.Remove(name))
  ```

  **Click at the end of the `{` on the line under it, press Enter, and type** `switchboard.Save(db);`
- [ ] 📖 *"And every time a caller comes off."*
- [ ] **Run the desk: DJ name, then `r`, caller `Dorothy`, song `1`, then `c`. Then <kbd>Ctrl+C</kbd>**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 4     │ Nightjar  │
  ```

- [ ] **Run it again: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-11/Lab
  ```

  ```
  │ Dorothy │ 4     │ -         │
  │ Bex     │ 1     │ -         │
  ```

- [ ] 📖 *"Dorothy has four calls. The desk saved the moment she rang, so stopping it early lost nothing."*
- [ ] **SQL Server view: Select Top 1000 on `dbo.Callers`**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 4 |
  | 2 | Bex | 1 |

- [ ] 📖 *"Save is safe to call as often as I like. New rows go in, old rows are updated, and rows nobody holds come out."*
- [ ] 💡 **No push.** `Program.cs` is theirs too. The first item of *Done early* in the lab is this, for the rotation
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 11: saved as it happens"
  ```

---

## Lab F · Finish, then start the homework — 62 minutes

- [ ] **Lids up. The lab README, wherever each person is.** Anyone not finished works on their next task
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It's tonight's lab again, on your own project, and it's two tasks. Push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. Don't ask for either
- [ ] ⚠️ **Stop at 3:38 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 6 · Wrap *(slide 3)*

- [ ] 🎞️ **GO TO SLIDE 3** — *Tonight, in one picture* · *"Remove takes a record out of the list. Save puts new rows in, updates the old ones, and takes out the rows the list doesn't hold. So the table matches the list. Saving when something changes means a crash loses nothing."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. It's two tasks: watch a removed record come back, then write the test and fix Save. Your database carries on from last week. You don't drop anything."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToTenStillHold. If yours says FourToNine, you are running last week's."*
- [ ] 📖 **The due date** — *"This homework is due before our next class."*
