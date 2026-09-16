# Week 10 Demo — The Log Leaves the Building 🧊

**Haldane Station · duty console · day 275**

Tonight the watch log stops being a file on this laptop and becomes a table on a server five hundred kilometers away — and the last beat of the night is the station disagreeing with itself.

> **The shape of the night:** last week's file, read one more time → a table that is the same line with names on it → where a password is allowed to live → the migration → 💥 the log survives a restart, and the row is visible from a machine that isn't mine → 💥 and the desk and the database answer the same question differently.

**Total: ~140 minutes across the evening**, in the timing table's segments.

---

## 0 · Before class

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html) and confirm the top line says *day 275*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes, Copy buttons and the database box, nothing else
- [ ] 💡 **The Database box at the top of the published sheet.** Type your database name into it once and **every mention on this page changes, including what the Copy buttons hand you.** It is saved on that device. Nothing tonight asks you to retype it
- [ ] **[`dutyconsole.com`](https://dutyconsole.com) on the projector as they arrive.** Week 10's board is up. Say nothing about it
- [ ] ⚠️ **Put week 9's folder back to its finished state — §1 copies out of it**

  ```bash
  cd ~/Repos/dotnet-db-dev-course/instructor/dotnet-db-coursework \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-09/demo-starter/Haldane/*.cs week-09/Haldane/ \
    && cp ~/Repos/dotnet-db-dev-answer-keys/week-09/demo-starter/Haldane.Tests/WatchTests.cs week-09/Haldane.Tests/
  ```

  - 💡 **The answer key is the source of truth, not your own repo** — and those files are **class-ready**, so nothing you copy in can put a spoiler on the projector
- [ ] ⚠️ ⚠️ **NEW THIS WEEK, AND §1 CANNOT RUN WITHOUT IT: put this week's met book in place.** It is the same book as last week with one more week written in it — 51,309 lines, running to day 275. **The banner reads the day off its last line**, which is why nothing tonight types a date

  ```bash
  mkdir -p week-10 && cp ~/Repos/dotnet-db-dev-answer-keys/week-10/demo-starter/season.txt week-10/
  ```

- [ ] ⚠️ **Delete `week-10/Haldane` and `week-10/Haldane.Tests` if you've rehearsed** — `dotnet new` refuses to overwrite. ⚠️ **Not `season.txt`**, or §1 has no day

  ```bash
  rm -rf week-10/Haldane week-10/Haldane.Tests
  ```

- [ ] ⚠️ ⚠️ **AND DROP THE DATABASE IF YOU'VE REHEARSED.** §5's whole payoff is a row appearing in an empty table. A rehearsal leaves it full, and the beat lands on a board that already looks right. In the mssql extension: right-click the database → **Delete**, or run `DROP DATABASE DB_HALDANE_156101411_JSG;` against `master`
  - 💡 **§4 makes it again** — `dotnet ef database update` creates the database as well as the table

- [ ] ⚠️ ⚠️ **YOUR CONNECTION STRING HAS YOUR PASSWORD IN IT, AND THIS ROOM CAN READ THE PROJECTOR.** Put it in a file, once, outside every repo. §3 reads it from there and nothing sensitive is ever on screen

  ```bash
  echo 'Server=YOUR-SERVER;Database=DB_HALDANE_156101411_JSG;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True' > ~/haldane-connection.txt
  ```

  - ⚠️ **Check it afterwards** — `cat ~/haldane-connection.txt` — because a typo in here surfaces in §4 as a connection failure in front of the room
  - 💡 **`TrustServerCertificate=True` is not optional decoration.** Without it a connection to a server whose certificate the machine does not recognize is refused outright
- [ ] **Update the EF tool, once** — a stale one prints a version warning on every single command, all night

  ```bash
  dotnet tool update --global dotnet-ef
  ```

- [ ] ⚠️ **Install the mssql extension if this machine does not have it** — Extensions, `SQL Server (mssql)`, publisher Microsoft (`ms-mssql.mssql`). **Nothing before tonight has needed it**, so a fresh machine will not have it
- [ ] ⚠️ **The mssql extension should already be connected, or at least know your server.** §4 uses it in front of the room, and adding a connection for the first time means a dialog, a password prompt and a trust prompt. **Do that now**
- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`, exactly where week 9 left it
- [ ] ⚠️ **Run `dotnet run --project week-09/Haldane` once before class.** §1 opens by running it, so it has to build on the night
- [ ] 💡 **The times in this sheet's output blocks are MINE.** Every line the desk stamps tonight is station time, UTC, so the sign-out in §5 will carry your clock rather than `16:33`. Nothing else in the blocks moves
- [ ] **Lids down for the demo** — *"you'll write all of this yourself in the lab, on a station that is not this one"*

---

## 1 · Where we finished last week

- [ ] 🎯 **First, last week — running, before anything is made.** *"This is where we got to. The console keeps a log, the log survives the night, and there are five tests watching it."*

  ```bash
  dotnet run --project week-09/Haldane
  ```

- [ ] **Press `q` to close the desk**
- [ ] **Now open the log itself.** In the Explorer, `week-09/watch-log.txt`
- [ ] 📖 **Say what it is, and be precise about where it is** — *"That is everything this station knows about today. Six lines. It is a file, it is on this laptop, and it is in a folder called week nine."*
- [ ] 🎯 **Then the promise, and name the weeks it was made in** — *"In week three I had you type three records in and quit, and they were gone. I told you then it got a file in week eight and a database in week ten. Week eight happened. This is week ten."*
- [ ] ⚠️ **Close the file again.** It is opened once more in §2 and nothing else tonight needs it

- [ ] **Branch first, and say it as you type it** — *"a branch for tonight, same as every week. Nothing goes straight to `main`, and that goes for your project too"*

  ```bash
  git checkout -b the-log-leaves-the-building
  ```

- [ ] **Now make this week's folder.** No commentary — they have watched this nine times

  ```bash
  dotnet new console -o week-10/Haldane
  ```

  ```bash
  dotnet add week-10/Haldane package Spectre.Console --version 0.57.2
  ```

  ```bash
  cp week-09/Haldane/*.cs week-10/Haldane/
  ```

- [ ] **And the suite comes too**

  ```bash
  dotnet new xunit -o week-10/Haldane.Tests
  ```

  ```bash
  cp week-09/Haldane.Tests/WatchTests.cs week-09/Haldane.Tests/Haldane.Tests.csproj week-09/Haldane.Tests/Directory.Build.rsp week-10/Haldane.Tests/
  ```

  ```bash
  rm week-10/Haldane.Tests/UnitTest1.cs
  ```

- [ ] ⚠️ **Now reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**

  ```
  Developer: Reload Window
  ```

- [ ] **One edit, and it is the only path in the program.** Open `week-10/Haldane/Program.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`string metBook`** — one hit. Make that line read

  ```csharp
  string metBook = "week-10/season.txt";
  ```

- [ ] **Run it**

  ```bash
  dotnet run --project week-10/Haldane
  ```

  ```
  ========================================================
    HALDANE STATION - DUTY CONSOLE
    nearest neighbor: 512 km - winter crew - day 275
  ========================================================
  ```

- [ ] 🎯 **Point at the day, because last week bought this and tonight is the first time it pays** — *"Two seventy-five. I did not type that. Last week I took the day out of the source code. It reads the last line of the met book instead. And since then, somebody has kept writing in the book — seven more days of weather, and the console worked the date out on its own."*
- [ ] **Press `q`**

- [ ] **Prove the suite came across**

  ```bash
  dotnet test week-10/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 🎯 **Say the number and ask them to hold it** — *"Five. Hold on to that, because one of the five is about to stop compiling, and it will be my fault and it will be correct."*

- [ ] **And save the week before changing a line of it.** Silent — this is the commit the lab asks them for in its very first step

  ```bash
  git add . && git commit -m "week 10: the desk, carried forward"
  ```

---

## 2 · A table is the line you already had *(slides 2–4)*

- [ ] 🎞️ **GO TO SLIDE 2** — *A file, and a table*
- [ ] 📖 *"On the left is a line out of the watch log. On the right is the same line in a table. Nothing about what the station records is different. What changed is where it goes and who can reach it."*

- [ ] **Four packages first, because nothing below compiles without them**

  ```bash
  dotnet add week-10/Haldane package Microsoft.EntityFrameworkCore.SqlServer
  ```

  ```bash
  dotnet add week-10/Haldane package Microsoft.EntityFrameworkCore.Design
  ```

  ```bash
  dotnet add week-10/Haldane package Microsoft.Extensions.Configuration
  ```

  ```bash
  dotnet add week-10/Haldane package Microsoft.Extensions.Configuration.UserSecrets
  ```

- [ ] 📖 **Name them in pairs rather than one at a time** — *"The first two are the database: one knows how to talk to SQL Server, and one is the tooling that writes migrations. The other two are configuration, and they are here for one reason — a console program does not get handed any configuration at all. It has to go and build it. That is the next segment."*
- [ ] 💡 **Worth ten seconds, because week 3 sold it and this is the receipt** — *"Four packages, per project, restored rather than installed. Nothing on this machine changed outside this folder."*

- [ ] **New file `week-10/Haldane/LogRow.cs`**

  ```csharp
  // One line of the watch log, as the database keeps it.
  using System.ComponentModel.DataAnnotations.Schema;

  public class LogRow
  {
      // The database numbers its own rows, and this is where it writes the
      // number. Nothing at the station has one of these.
      public int Id { get; set; }

      // SIGNOUT, MET or FUEL — the word that used to come first on the line.
      public string Kind { get; set; } = "";

      public string Time { get; set; } = "";

      // A crew member's name. Empty on a fuel check, which is nobody's.
      public string Who { get; set; } = "";

      public string Reason { get; set; } = "";
      public string Expected { get; set; } = "";

      // A temperature, to one decimal place, which is how the station has
      // written them down since week 6.
      [Column(TypeName = "decimal(4,1)")]
      public double Celsius { get; set; }

      public int Liters { get; set; }
      public bool IsBack { get; set; }
  }
  ```

- [ ] 📖 **Read it against the file line, field by field** — *"Kind, time, who, reason, expected, back or not. That is the sign-out line. Celsius is the met line. Liters is the fuel line. Every field that used to have a pipe in front of it now has a name."*
- [ ] 🎯 **Then the one property that is not theirs, and say plainly what it is for** — *"`Id` is the only thing on here the station never asked for. The database gives every row a number so it can tell one row from another. Nobody at Haldane cares what it is."*
- [ ] 💡 **The `decimal` line, one sentence — only if asked, it is not a lesson** — *"Left alone that column would be a float, and a float cannot hold minus thirty-nine point eight exactly. It comes back out as minus thirty-nine point seven nine nine nine nine nine nine nine nine nine nine nine nine seven."*

- [ ] 🎞️ **GO TO SLIDE 3** — *One table, three kinds of lines*
- [ ] 📖 **Say the honest thing about it, because they can see it** — *"One table is holding three different kinds of lines, so a sign-out row carries a temperature that means nothing and a fuel row carries two empty names. The file had exactly the same problem and hid it better. Splitting them up is week twelve."*

- [ ] **New file `week-10/Haldane/StationContext.cs`**

  ```csharp
  // The station's database, as far as this program is concerned.
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;

  public class StationContext : DbContext
  {
      // One table. The name of this property is the name of the table.
      public DbSet<LogRow> Log { get; set; }

      // The program uses this one, and so does `dotnet ef`.
      public StationContext()
      {
      }

      // The tests use this one. They hand in somewhere else to keep the rows.
      public StationContext(DbContextOptions<StationContext> options)
          : base(options)
      {
      }

      protected override void OnConfiguring(DbContextOptionsBuilder options)
      {
          // Somebody has already said where the rows go. Do not argue with it.
          if (options.IsConfigured)
          {
              return;
          }

          IConfiguration config = new ConfigurationBuilder()
              .AddUserSecrets<StationContext>()
              .Build();

          options.UseSqlServer(config["ConnectionStrings:Haldane"]);
      }
  }
  ```

- [ ] 🎞️ **GO TO SLIDE 4** — *What a DbContext is*
- [ ] 📖 **Talk the class through in three parts, in this order** — *"`DbSet<LogRow> Log` is the list of tables this program knows about. There is one, and the name of that property is the name of the table. The two constructors are how it gets told where the database is: the empty one means go and find out, and the other one means somebody is telling you. And `OnConfiguring` is the going and finding out."*
- [ ] ⚠️ **Do not explain the second constructor yet.** It is §5's beat and it lands much harder there, when the test suite needs it
- [ ] 💡 **If somebody asks what `IsConfigured` is for** — *"It means somebody already said where the rows go. You will see who, in about forty minutes."*

- [ ] **Build it. Nothing to run yet**

  ```bash
  dotnet build week-10/Haldane
  ```

  ```
      0 Warning(s)
      0 Error(s)
  ```

- [ ] 💡 **Worth pointing out, because it is about to matter** — *"That compiled, and there is no database anywhere. Nothing has connected to anything."*

---

## ☕ Break

---

## 3 · Where a password is allowed to live *(slides 5–6)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Your connection string has your password in it*
- [ ] 🎯 **Collect week 2, by name and by pointing at the repo** — *"In week two I committed a password to this repo on purpose. Then we took it out. And I told you that taking it out of the file does not take it out of the history. I also told you the real answer was week ten's whole job. This is it."*
- [ ] 💡 **Say the shape of the problem before the tool** — *"The program needs a connection string. A connection string has a server, a database, a login and a password in it. It cannot go in the repo, and it cannot be typed in every time the program starts."*

- [ ] **Turn the secret store on**

  ```bash
  dotnet user-secrets init --project week-10/Haldane
  ```

- [ ] **Open `week-10/Haldane/Haldane.csproj` and point at the line that just appeared**

  ```xml
  <UserSecretsId>...</UserSecretsId>
  ```

- [ ] 📖 **Say exactly what that is, because it is the whole mechanism** — *"That is not a secret. It is a folder name. It says: this project's secrets live in a folder called that, somewhere else on this machine."*
- [ ] ⚠️ ⚠️ **AND THE THING THAT WILL COST THEM AN EVENING — say it now and say it flatly** — *"If you skip that command, nothing breaks and nothing complains. Your settings just read back as empty, quietly, and you find out much later when the program cannot connect."*

- [ ] 🎯 **Now the connection string, and do not type it** — *"I am not going to type mine, because all of you can read that screen. It is in a file, and this reads it out of the file."*

  ```bash
  dotnet user-secrets set "ConnectionStrings:Haldane" "$(cat ~/haldane-connection.txt)" --project week-10/Haldane
  ```

  ```
  Successfully saved ConnectionStrings:Haldane to the secret store.
  ```

- [ ] 💡 **That aside IS the lesson, so let it land** — *"Everything I just did to keep it off this projector is the same reason it does not go in the repo. A repo is a room with more people in it."*

- [ ] **Now show where it went — the folder, not the file**

  ```bash
  ls ~/.microsoft/usersecrets/
  ```

- [ ] 📖 **Point at the path** — *"Home directory. Not the repo, not the project, not anywhere git has ever looked. One folder per project, named after that id in the csproj."*
- [ ] ⚠️ **Do not `cat` the file.** Your password is in it
  - 💡 **Windows: `%APPDATA%\Microsoft\UserSecrets\`.** Say it out loud — some of the room is on Windows and the path is genuinely different

- [ ] **And the proof that matters**

  ```bash
  git status
  ```

- [ ] 🎯 **Read the answer out** — *"The csproj changed, because it has that id in it now. The connection string is nowhere. There is nothing to accidentally commit, because there is nothing here to commit."*

- [ ] 🎞️ **GO TO SLIDE 6** — *What user secrets are not*
- [ ] ⚠️ **This slide is the honest half and it must not be skipped** — *"This is not encryption. It is a plain text file in your home directory, and anybody sitting at your machine can read it. What it solves is exactly one problem: it is not in the repo. That is the problem you have."*
- [ ] 💡 **And the one about this room's machines** — *"The lab PCs wipe when they reboot. That folder goes with them. It is one command to put back, and the notes have it."*

---

## 4 · The migration *(slides 7–8)*

- [ ] 📖 **Set it up as a question they can answer** — *"There is a class, and there is a server. Nothing has made a table. Somebody has to write the SQL that creates it."*

- [ ] **Write the migration**

  ```bash
  dotnet ef migrations add TheLogMovesIn --project week-10/Haldane
  ```

- [ ] **Open the file it wrote** — `week-10/Haldane/Migrations/`, the one ending `_TheLogMovesIn.cs`
- [ ] 🎞️ **GO TO SLIDE 7** — *A migration is a class you did not write*
- [ ] 🎯 **Read the `Up` method against `LogRow.cs`, side by side** — *"That is my class. Every property, with the column type filled in. `string` became `nvarchar(max)`. `bool` became `bit`. `Id` became an int that the database fills in by itself. Nobody wrote any of this and nobody has to read it in anger."*
- [ ] 💡 **Then the `Down` method, which is the half that explains the name** — *"And it can undo itself. That is why it is called a migration rather than a script: it knows both directions."*

- [ ] ⚠️ **Now ask, and wait — this is the distinction the whole tool turns on** — *"Has anything happened to the server yet?"*
- [ ] 🎯 **Then answer it plainly** — *"No. That command never connected to anything. It compared my classes to what it wrote last time and wrote a file. Making the instructions and carrying them out are two different commands, and only one of them needs a network."*

- [ ] **Now carry them out**

  ```bash
  dotnet ef database update --project week-10/Haldane
  ```

- [ ] 💡 **Say what it just did, both halves** — *"That one connected. It made the database, because there wasn't one, and then it made the table."*

- [ ] 🎯 **And now look at it from somewhere that is not this program.** Activity bar → **SQL Server** (<kbd>⌘⌥D</kbd> / <kbd>Ctrl+Alt+D</kbd>) → your server under **Connections** → **Refresh** → Databases → **DB_HALDANE_156101411_JSG** → Tables
- [ ] 📖 *"There it is. `Log`, and a column for every field on that class."*
- [ ] **Right-click `dbo.Log` → **Select Top 1000**, and let it run**
- [ ] 💥 **Read the result out and stop** — *"Nothing. The table exists and it is empty, and the program has never once written to it."*

- [ ] 🎞️ **GO TO SLIDE 8** — *Two commands, one network*
- [ ] 📖 *"`migrations add` writes instructions and needs nothing. `database update` carries them out and needs the server. When you get this wrong at home, it is almost always that you wrote the migration and never ran it."*

- [ ] **Save it. Silent**

  ```bash
  git add . && git commit -m "week 10: a table, and the instructions that made it"
  ```

---

## ☕ Break

---

## 5 · 💥 The log leaves the building *(slides 9–10)*

- [ ] **Open `week-10/Haldane/Watch.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`// ── the book on disk`** — one hit
- [ ] 📖 **Before selecting anything, say what is about to change and what is not** — *"Everything in this class above this line is a rule about the watch: who may go out, when a time may be amended, what the last reading was. None of it is going to change tonight. What changes is the two methods underneath, and all they ever did was put the book somewhere."*
- [ ] ⚠️ **Select from that comment line down to and including the closing `}` of `Load`** — the last line before `    // Week 5's Find, one more time` — **and paste this over it**

  ```csharp
      // ── the book, in the database ──────────────────────────────────────────
      // The context is handed in and never made in here, for exactly the reason
      // the path was handed in last week.

      public void Save(StationContext db)
      {
          db.Log.RemoveRange(db.Log);

          foreach (ILogEntry entry in _entries)
          {
              if (entry is SignOut s)
              {
                  db.Log.Add(new LogRow
                  {
                      Kind = "SIGNOUT",
                      Time = s.Time,
                      Who = s.Who.Name,
                      Reason = s.Reason,
                      Expected = s.Expected,
                      IsBack = s.IsBack
                  });
              }
              else if (entry is Reading r)
              {
                  db.Log.Add(new LogRow
                  {
                      Kind = "MET",
                      Time = r.Time,
                      Who = r.TakenBy.Name,
                      Celsius = r.Celsius
                  });
              }
              else if (entry is FuelCheck f)
              {
                  db.Log.Add(new LogRow
                  {
                      Kind = "FUEL",
                      Time = f.Time,
                      Liters = f.Liters
                  });
              }
          }

          // Nothing above this line went anywhere.
          db.SaveChanges();
      }

      public void Load(StationContext db, List<CrewMember> crew)
      {
          _entries.Clear();

          foreach (LogRow row in db.Log.ToList())
          {
              if (row.Kind == "SIGNOUT")
              {
                  CrewMember? who = Lookup(crew, row.Who);

                  if (who != null)
                  {
                      SignOut s = new SignOut(row.Time, who, row.Reason, row.Expected);

                      if (row.IsBack)
                      {
                          s.Back();
                      }

                      Add(s);
                  }
              }
              else if (row.Kind == "MET")
              {
                  CrewMember? who = Lookup(crew, row.Who);

                  if (who != null)
                  {
                      Add(new Reading(row.Time, row.Celsius, who));
                  }
              }
              else if (row.Kind == "FUEL")
              {
                  Add(new FuelCheck(row.Time, row.Liters));
              }
          }
      }

  ```

- [ ] 📖 **Say what the shape is, in one sentence each** — *"Save walks the log and turns every entry into a row. Load walks the rows and turns every one back into an entry. Same two jobs they have had since week eight."*
- [ ] 🎯 **Then point at what is NOT there any more, because it is the best thing in the segment** — *"Look at what came out. Last week Save had to write a temperature into text, and it needed `InvariantCulture` to do it. A machine set to another language writes minus thirty-nine comma eight, and then it can never read it back. There is no `TryParse` in Load any more either. `Celsius` is a number in the table, and the database hands a number back. There is nothing to spell and nothing to parse."*
- [ ] 💡 **And the one line that does the work** — *"`Add` and `RemoveRange` do not touch the database. They write down what is intended. `SaveChanges` is the line that goes, and it takes the lot in one trip."*

- [ ] **Now `Program.cs`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`string logFile`** — one hit. **Select that line and the three comment lines above it** — from `// Where the book lives.` down to and including the `string logFile` line — **and paste this over them**

  ```csharp
  // Where the book lives, and as of tonight that is not a sentence about this
  // laptop at all.
  StationContext db = new StationContext();
  ```

- [ ] **Next.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`if (File.Exists(logFile))`** — one hit. Make that line read

  ```csharp
  if (db.Log.Any())
  ```

- [ ] **And the line inside it.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`watch.Load(logFile, crew);`** — one hit. Make it read

  ```csharp
      watch.Load(db, crew);
  ```

- [ ] **And the save at the end.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for **`watch.Save(logFile);`** — one hit. Make it read

  ```csharp
  watch.Save(db);
  ```

- [ ] 💥 **Now run the tests — NOT the program. Predict nothing, just run it**

  ```bash
  dotnet test week-10/Haldane.Tests
  ```

  ```
  error CS1503: Argument 1: cannot convert from 'string' to 'StationContext'
  error CS1503: Argument 1: cannot convert from 'string' to 'StationContext'
  ```

- [ ] 💥 **Let it sit, then say what it is** — *"Two errors, and they are both in the same test. I changed what Save and Load take, and the one test that calls them is now wrong about how to call them."*
- [ ] 🎯 **Then ask the question the segment exists for, and wait** — *"That test hands Save a path to a scratch file. What do I hand it now?"*
- [ ] ⚠️ **Let somebody say "the database" before you answer it.** The answer is the point: *"Not the station's database. A test that needs the college's server is a test I cannot run on a plane, and it is a test that fails when the network does."*

- [ ] **One package on the test project**

  ```bash
  dotnet add week-10/Haldane.Tests package Microsoft.EntityFrameworkCore.InMemory
  ```

- [ ] **Open `week-10/Haldane.Tests/WatchTests.cs`.** At the top, above `namespace Haldane.Tests;`, paste

  ```csharp
  using Microsoft.EntityFrameworkCore;

  ```

- [ ] **Then <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public void TheLogSurvivesARestart()`** — one hit. **Select from the line above it that reads `[Fact]` down to and including the closing `}` of that method** — the last line before `    // Week 8. The book is in time order` — **and paste this over it**

  ```csharp
      [Fact]
      public void TheLogSurvivesARestart()
      {
          // Somewhere of its own, named after this run, so two tests going at
          // the same time can never see each other's rows.
          DbContextOptions<StationContext> somewhereElse =
              new DbContextOptionsBuilder<StationContext>()
                  .UseInMemoryDatabase("haldane-" + Guid.NewGuid())
                  .Options;

          List<CrewMember> crew = new List<CrewMember>();
          CrewMember okonkwo = new CrewMember("Okonkwo");
          crew.Add(okonkwo);

          Watch watch = new Watch();
          watch.SignOut(okonkwo, "MET RUN", "15:00");

          using (StationContext db = new StationContext(somewhereElse))
          {
              watch.Save(db);
          }

          // A second watch, with nothing in it, and a second context.
          Watch reopened = new Watch();

          using (StationContext db = new StationContext(somewhereElse))
          {
              reopened.Load(db, crew);
          }

          Assert.Equal(1, reopened.Count);
          Assert.Equal("MET RUN", reopened.SignOuts()[0].Reason);

          // And it is the man himself, not a second Okonkwo wearing his name.
          Assert.Same(okonkwo, reopened.SignOuts()[0].Who);
      }
  ```

- [ ] 🎯 **Now the second constructor pays off, and this is §2's loose end being tied** — *"Two segments ago I wrote a constructor that takes options and I would not tell you what it was for. This is what it is for. The test is telling the context where to keep its rows, and where it says is a table that exists inside this test and nowhere else."*
- [ ] 📖 **Then the `IsConfigured` line, which now explains itself** — *"And that is why `OnConfiguring` asks whether somebody already said. When the test has said, the connection string is never looked at."*

  ```bash
  dotnet test week-10/Haldane.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 🎞️ **GO TO SLIDE 9** — *A test that needs no database*
- [ ] 🎯 **Land it, one idea per sentence** — *"Five again. That suite just proved the log survives a restart. It did it with no server, no password and no network, in milliseconds. The rules live in a class, and the class does not know where the database is — that is the only reason this is possible."*

- [ ] **Now run the desk, and sign somebody out**

  ```bash
  dotnet run --project week-10/Haldane
  ```

- [ ] **Press `o`. Name `Nakamura`, reason `DIG OUT`, back by `16:20`**

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 16:33 │ Nakamura  │ DIG OUT │ 16:20    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  ```

  - ⚠️ **His time will be yours, not `16:33`** — the desk stamps the station's clock
- [ ] **Press `q`.** That is the watch handed over, so the book gets written up

- [ ] 💥 **Run it again**

  ```bash
  dotnet run --project week-10/Haldane
  ```

  ```
  │ 09:05 │ Lindqvist │ FUEL    │ 10:30    │ OUT    │ 1     │
  │ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │ OUT    │ 1     │
  │ 14:20 │ Reyes     │ DIG OUT │ 14:45    │ OUT    │ 1     │
  │ 16:33 │ Nakamura  │ DIG OUT │ 16:20    │ OUT    │ 1     │
  └───────┴───────────┴─────────┴──────────┴────────┴───────┘
  4 people outside.
  ```

- [ ] 🎯 **Collect it by name — week three, second time** — *"There he is. Week eight, that came out of a file. Look in `week-10` — there is no file. There is a project and a met book, and that is all."*
- [ ] **Press `q`**

- [ ] 🎯 **Now the half a file could never do.** Back to the **SQL Server** view, right-click `dbo.Log` → **Select Top 1000**
- [ ] 💥 **Point at Nakamura's row and say where you are** — *"That is the sign-out I just typed. And I am not reading it out of my program — this is a query, against the server, and my program is closed."*
- [ ] 🎞️ **GO TO SLIDE 10** — *Round two*
- [ ] 🎯 **Make the claim exact, because it is the week's promise and the room has been waiting since week eight** — *"A file is still your file. It is on your laptop, in your folder, and nobody else can see it. This is on a machine none of us owns, and anybody with an account can read it. That is what changed tonight."*
- [ ] 💡 **If somebody asks why the Id column starts at a number and not at 1** — *"Because Save empties the table and writes the whole book back every time the desk closes, which is exactly what the file did. The database numbers every row it has ever been handed. Next week we stop doing that."*

- [ ] **Save it. Silent**

  ```bash
  git add . && git commit -m "week 10: the log moves into the database"
  ```

---

## 6 · 💥 The same question, two answers *(slide 11)*

- [ ] 📖 **Set the scene plainly, no build-up** — *"One more thing, and I only found it because I was tired and typed badly."*

  ```bash
  dotnet run --project week-10/Haldane
  ```

- [ ] **Press `b`. At `Who's back:` type `reyes` — lower case, deliberately, and do not comment on it**

  ```
    Who's back:   Nobody outside by that name.
  ```

- [ ] 💥 **Point at the board, which still has her on it** — *"Reyes is on that board. I can see her. The desk says there is nobody outside by that name."*
- [ ] **Press `q`**

- [ ] 🎯 **Now ask the same question somewhere else.** In the **SQL Server** view, **New Query**, and run it with <kbd>⇧⌘E</kbd> / <kbd>Ctrl⇧E</kbd>

  ```sql
  SELECT Kind, Time, Who, Reason, Expected, IsBack
  FROM Log
  WHERE Who = 'reyes';
  ```

  ```
  Kind     Time   Who    Reason   Expected  IsBack
  SIGNOUT  14:20  Reyes  DIG OUT  14:45     0
  ```

- [ ] 💥 **Stop here and let them look at it** — *"Same station. Same log. Same word, spelled the same way both times. My program says there is no such person and the database hands me her sign-out."*
- [ ] 🎞️ **GO TO SLIDE 11** — *The same question, two answers*
- [ ] 🎯 **Then the mechanism, and keep it to two sentences** — *"C# compares strings letter by letter, and a capital R is not a small r. This server does not care about case at all — that is a setting on the database, and almost every SQL Server you ever meet is set that way."*
- [ ] ⚠️ **And the consequence, in station terms** — *"So there are now two things that can answer a question about who is on the ice, and tonight they disagreed. Somebody sitting at that desk believes Reyes never signed out. She is outside."*
- [ ] 💡 **Then hand the rest to week twelve and stop** — *"Nothing I wrote tonight chose that. It came with the database. When we start writing the questions in C# and letting the database answer them, that is week twelve, and this is going to matter a great deal."*

- [ ] **Save it, and this is the one that pushes**

  ```bash
  git add . && git commit -m "week 10: what the database does not care about"
  ```

  - 💡 Then **Sync** in the Source Control view — one push, four commits

---

## 7 · Hand off *(slide 12)*

- [ ] 🎞️ **GO TO SLIDE 12** — *Lab: the carts leave the building*
- [ ] 📖 **Say what the lab is** — *"The same move, at the radio station. The rotation is three carts and what each one has played, and tonight it stops being a file."*
- [ ] ⚠️ **Then the one warning worth giving out loud, because it is where the room will stall** — *"You will make a database tonight, on the college's server, with your own account. Do that early — it is step three, not step nine. If anything is going to go wrong with it, you want it going wrong while I am standing here."*
- [ ] 💡 **And the thing that surprises people** — *"My checks do not touch the server at all. They will go green on a laptop with the wifi off. Running the desk is the only thing that tells you your connection string is right."*
- [ ] **Slide 12 stays up for the lab**

---

## Lab · 50 minutes

- [ ] **Circulate.** The three places to stand:
  - **Setup, step 3** — the first `dotnet ef database update` against the college's server. Everything that is going to go wrong tonight goes wrong here, and it goes wrong for a handful of people at once
  - **Task 2**, the `DbSet` line — a context with no `DbSet` compiles perfectly and check 2's message is the only thing that says so
  - **Task 4**, `Save` — the missing `SaveChanges()`. The check says *nothing arrived*, which is exactly right and reads like a bigger problem than it is

---

## 8 · Wrap *(slide 13)*

- [ ] 🎞️ **GO TO SLIDE 13** — *Tonight, in one picture*
- [ ] 📖 *"A class became a table. A migration made it. The password lives somewhere that is not the repo. And the log is on a machine that is not yours."*
- [ ] **Homework: the registry moves into a database** — say the checks-copy line, and that this week's `Project.Checks` holds **four** checks
- [ ] ⚠️ **Say the one thing about grading that changed, because they will notice it in the rubric** — *"From this week I cannot run your program. It needs your database and your password, and I have neither, and that is correct. The points that used to be for it running are for it compiling. My checks still run your code, the same as always."*
- [ ] ⚠️ **Say the due date normally** — *"Next class."*
- [ ] **Project repo URL in Canvas, and only that one**
- [ ] 💡 **And set up next week** — *"Tonight one person wrote to one table. Next week, everyone in this room is on the same one."*

---

**Prev:** [Week 9 Demo — Thirty Lines Become One](../../week-09/demo/) · **Next:** Week 11 Demo *(coming)*
