# Week 12 Demo — One Caller, Many Requests 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk gets its second kind of table. You give each **caller** a table of requests, live, and the students give each **cart** a table of airings. After each of three segments you push your finished files, and they copy them in to read and run while they work.

> **The shape of the night:** a caller has many requests → the requests don't come back → the database answers. **Each demo segment is followed by the lab task that practices it.**

**Total: ~68 minutes of demo, in five short segments, and five lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-12-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-12-rehearsal
> ```
>
> Then **delete the `week-12` folder** from the Explorer. Switching to `main` removed the files you committed, but not `bin` or `obj`.
>
> **Then reset your database** with the three commands in the checklist below — a rehearsal leaves a `Requests` table in it, and §2 makes that table in front of the room.
>
> **Empty `demo/week-12/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-12
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 12 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-12/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] 💡 **Type your database name in the Database box at the top of the published page.** Every mention of it on the page changes, including what the Copy buttons hand you. It is saved on this device
- [ ] **Your secret needs nothing tonight.** You set it in week 11 by the starter's fixed id, and week 12's starter ships the same id
- [ ] ⚠️ **Reset your demo database to the first night**, so §2 starts from the three callers the room knows. Three commands, using **last week's** project, from the terminal of `dotnet-db-coursework`:

  ```bash
  dotnet ef database drop --force --project week-11/Lab
  ```

  ```bash
  dotnet ef database update --project week-11/Lab
  ```

  Then run last week's desk once: DJ name, then `q`. Nothing else.

  ```bash
  dotnet run --project week-11/Lab
  ```

  Afterwards the database has three callers and three carts, and no `Requests` table
- [ ] ⚠️ **A current `dotnet-ef`**, so no version warning prints on every command tonight:

  ```bash
  dotnet tool update --global dotnet-ef
  ```

- [ ] ⚠️ **The SQL Server view already knows your server**, connected
- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it three times. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room
- [ ] ⚠️ **`demo/week-12/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-12
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 12 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin
- [ ] ⚠️ **Delete `week-12/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-12/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · One caller, many requests

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is EF Core again, and a second kind of table. A caller gets a table of their requests, tied to them by their Id. Include brings the requests back with the caller. And we ask the database a question in LINQ, and watch it run as SQL. In your lab, a cart gets a table of its airings."*
- [ ] 🎯 **Say what's missing, plainly:** *"Right now every table at the desk stands alone. A caller is one row, and a cart is one row. Nothing in the database belongs to anything else."*
- [ ] 📖 **Then the deal for the night:** *"I work on the callers. You work on the carts. After each piece I push my files, and you copy them in."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 12 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of four. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-12/Lab.Checks
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 12: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · A caller has many requests *(slide 2)*

- [ ] 📖 *"Dorothy rings the desk most nights. Let's see what the desk remembers about what she asked for."*
- [ ] **Run the desk: DJ name, then `r`, caller `Dorothy`, song `1`, then `c`, then `q`.** `r` takes a request and `c` shows the switchboard

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  │ Dorothy │ 4     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] 📖 *"Four calls, and ASKED FOR says Nightjar."*
- [ ] **Run it again — the next night: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  │ Dorothy │ 4     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] 💥 **Ask, and wait:** *"Dorothy's four calls came back. What happened to her Nightjar?"*
- [ ] **Open `week-12/Lab/Caller.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // What they asked for last.
  ```

  Highlight `[NotMapped]` two lines under it
- [ ] 📖 *"A favorite is one whole song, and a song doesn't fit in one column. So Favorite is marked NotMapped, and it's never saved."*
- [ ] 📖 *"And one song isn't enough anyway. Dorothy has rung four times. She could ask for four different songs. A caller has many requests, so requests get a table of their own."*
- [ ] 🎞️ **GO TO SLIDE 2** — *One caller, many requests* · *"Every request is a row in the Requests table. CallerId holds the Id of the caller who made it, from the Callers table. Dorothy is Id 1, so both of her requests say 1."*
- [ ] **Back to the editor. In the Explorer, right-click `week-12/Lab` → New File → `Request.cs`, and paste this in**

  ```csharp
  // One request: a title, asked for by one caller, at one time.

  public class Request
  {
      // The database's own number for this request's row.
      public int Id { get; set; }

      // Which caller made it: the Id of that caller's row in Callers.
      public int CallerId { get; set; }

      public string Title { get; private set; }

      public DateTime At { get; private set; }

      public Request(string title, DateTime at)
      {
          Title = title;
          At = at;
      }
  }
  ```

- [ ] 📖 **Highlight `public int Id`:** *"A request has its own Id, like every row."*
- [ ] 📖 **Highlight `public int CallerId`:** *"CallerId holds the Id of the caller who made it. This column is what ties a request to a caller."*
- [ ] 📖 **Highlight `Title` and `At`:** *"Title is what they asked for, and At is when."*
- [ ] **Back in `week-12/Lab/Caller.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // What they asked for last.
  ```

- [ ] 📖 **Before you change it, say what it does now:** *"Right now a caller keeps one Favorite song, and Asks puts the song there. Nothing saves it. I need a caller to keep a list of requests, and Asks to add one to the list."*
- [ ] **Select from that comment line down to and including the `}` directly under `return Favorite?.Title ?? "-";`, and paste this over it**

  ```csharp
      // Every request this caller has made. One caller, many requests.
      public List<Request> Requests { get; private set; } = new List<Request>();

      // ⚠️ The call is NOT counted here. Switchboard.Take counted it when it
      // put them on the line.
      public void Asks(Song song)
      {
          Requests.Add(new Request(song.Title, DateTime.Now));
      }

      // The title of the newest request, for the switchboard's ASKED FOR column.
      public string LastAsked()
      {
          Request? newest = Requests.MaxBy(request => request.At);

          if (newest == null)
          {
              return "-";
          }

          return newest.Title;
      }
  ```

- [ ] 📖 **Highlight `public List<Request> Requests`:** *"A caller has many requests, so a caller holds a list of them."*
- [ ] 📖 **Highlight `Requests.Add(new Request(song.Title, DateTime.Now));`:** *"Every time she asks for a song, a new request goes on her list, with the title and the time."*
- [ ] 📖 **Highlight `Requests.MaxBy(request => request.At)`:** *"ASKED FOR shows the newest one. MaxBy picks the request with the latest time."*
- [ ] **Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit — and delete it, and the blank line under it:**

  ```text
  using System.ComponentModel.DataAnnotations.Schema;
  ```

- [ ] 📖 *"That using line was for NotMapped. NotMapped is gone, so the line goes too."*
- [ ] **Open `week-12/Lab/DeskContext.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public DbSet<Song> Songs { get; set; }
  ```

  **Click at the end of that line, press Enter twice, and paste this**

  ```csharp
      public DbSet<Request> Requests { get; set; }
  ```

- [ ] 📖 *"One more table for the desk, named Requests, the same way Callers and Songs are named."*
- [ ] 💡 **Leave the `// TODO — Task 1` comment under it alone.** It is the students' line
- [ ] **Make the migration**

  ```bash
  dotnet ef migrations add ACallerHasManyRequests --project week-12/Lab
  ```

  ```
  Build started...
  Build succeeded.
  Done. To undo this action, use 'ef migrations remove'
  ```

- [ ] **Open the new file in `week-12/Lab/Migrations`, the one whose name ends `_ACallerHasManyRequests.cs`.** Highlight `name: "Requests",`
- [ ] 📖 *"One new table, Requests."*
- [ ] 📖 **Highlight the `CallerId = table.Column<int>` line:** *"The Requests table has a CallerId column."*
- [ ] 📖 **Highlight the `table.ForeignKey(` block:** *"This is the foreign key. It says every CallerId must be the Id of a row in Callers. The database won't take a request from a caller who isn't there."*
- [ ] 📖 **Highlight `onDelete: ReferentialAction.Cascade`:** *"Cascade means that when a caller's row comes out, their requests come out with it."*
- [ ] 📖 *"Nothing in here makes Callers or Songs. Those tables are already in the database. The foreign key only points at Callers."*
- [ ] **Update the database**

  ```bash
  dotnet ef database update --project week-12/Lab
  ```

  ```
  Applying migration '20261024211755_ACallerHasManyRequests'.
  Done.
  ```

  *(Yours has its own date and time in the name.)*

- [ ] 📖 *"One migration applied: the new one. The database already had the one before it."*
- [ ] **SQL Server view: right-click your connection → Refresh, then open Databases → `DB_KDXR_156101411_JSG` → Tables.** `dbo.Callers`, `dbo.Requests` and `dbo.Songs`
- [ ] **Right-click `dbo.Callers` → Select Top 1000**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 4 |
  | 2 | Bex | 1 |
  | 3 | Teodoro | 1 |

- [ ] 📖 *"Dorothy's four calls are still here. A migration that adds a table leaves the rows in the other tables alone."*
- [ ] **Run the desk: DJ name, then `r`, caller `Dorothy`, song `1`, then `c`, then `q`**

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  │ Dorothy │ 5     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] **SQL Server view: right-click `dbo.Requests` → Select Top 1000**

  | Id | CallerId | Title | At |
  |---|---|---|---|
  | 1 | 1 | Nightjar | *the time she asked* |

- [ ] 📖 *"Her request has a row of its own. CallerId 1 is Dorothy's Id in Callers."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 12: a caller has many requests"
  ```

- [ ] **Push it to the starters repo — one block copies both files there, commits there, and pushes.** Silent; they watch. `main -> main` at the end means it reached GitHub

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-12 && cp week-12/Lab/Caller.cs ../dotnet-db-starters/demo/week-12/ && cp week-12/Lab/Request.cs ../dotnet-db-starters/demo/week-12/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 12 demo: a caller has many requests" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 📖 *"My Caller and my Request are in the starters repo now. You copy them in first, because your migration has to know about my table too."*

---

## Lab B · Task 1 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.** Its first step is pulling my files and copying them in
- [ ] 📖 *"Task 1: copy my two files in. Then a cart gets a list of its airings, the same way a caller got a list of requests. Two DbSet lines, one migration, a fresh database, and the desk once. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulate at the migration.** Theirs makes **two** tables, `Airings` and `Requests`. Ask somebody who has opened it why there are two. *(Because the copied `Caller.cs` has a list of requests, and `migrations add` compares the whole model with the last one.)*
- [ ] 🎯 **A migration with only `Airings` in it** means push #1 was copied after the migration. The desk then crashes on the first request with `Invalid object name 'Requests'`. The fix is a second `migrations add`, then `database update`

---

## ☕ Break

---

## 3 · The requests don't come back

- [ ] 📖 *"Dorothy's request is in its table. Next night."*
- [ ] **Run the desk: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  │ Dorothy │ 5     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] **SQL Server view: Select Top 1000 on `dbo.Requests` again.** The same row is still there: `1 | 1 | Nightjar`
- [ ] 💥 **Let it sit. Then ask, and wait:** *"Her request is in the table. Why does ASKED FOR say nothing?"*
- [ ] 📖 *"Load reads the Callers table. Nothing in Load mentions Requests, so the requests never come back. Every caller starts the night with an empty list."*
- [ ] 📖 *"Before I fix Load, I'll write down what it should do, as a test. A caller's request comes back the next night."*
- [ ] **In the Explorer, right-click `week-12/Lab.Tests` → New File → `RequestTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about a caller's requests, written before the fix.

  using Microsoft.EntityFrameworkCore;

  namespace Lab.Tests;

  public class RequestTests
  {
      [Fact]
      public void ACallersRequestsComeBack()
      {
          DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
              .UseInMemoryDatabase(Guid.NewGuid().ToString())
              .Options;

          Switchboard board = new Switchboard();
          Caller dorothy = board.Take("Dorothy");
          dorothy.Asks(new Song("Nightjar", "The Lamplighters", 227));
          board.Save(new DeskContext(options));

          Switchboard reopened = new Switchboard();
          reopened.Load(new DeskContext(options));

          Assert.Single(reopened.Find("Dorothy")!.Requests);
      }
  }
  ```

- [ ] 📖 **Highlight the `Take`, `Asks` and `board.Save` lines:** *"Dorothy rings, asks for Nightjar, and the switchboard is saved."*
- [ ] 📖 **Highlight the two `reopened` lines:** *"The next night. A new switchboard loads from the table."*
- [ ] 📖 **Highlight `Assert.Single(`:** *"Single says the list holds exactly one thing. Dorothy made one request, so her list should hold one request."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-12/Lab.Tests
  ```

  ```
    Failed Lab.Tests.RequestTests.ACallersRequestsComeBack
    Error Message:
     Assert.Single() Failure: The collection was empty
  ```

- [ ] 📖 *"Red. Her list came back empty, the same as on the desk."*
- [ ] **Open `week-12/Lab/Switchboard.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  List<Caller> loaded = db.Callers
  ```

- [ ] 📖 **Highlight that line, then say what it does now:** *"Right now this line reads every row of Callers, in Id order. I need it to bring each caller's requests along too."*
- [ ] **Select that one line and paste this over it**

  ```csharp
          List<Caller> loaded = db.Callers.Include(caller => caller.Requests).OrderBy(caller => caller.Id).ToList();
  ```

- [ ] 📖 **Highlight `Include(caller => caller.Requests)`:** *"Include tells EF Core to read each caller's requests at the same time, and put them in the caller's list."*
- [ ] **Include comes from EF Core, so this file needs EF Core's using line.** Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:

  ```text
  public class Switchboard
  ```

  **Click at the start of that line, and paste this, with a blank line under it**

  ```csharp
  using Microsoft.EntityFrameworkCore;
  ```

  ```bash
  dotnet test week-12/Lab.Tests
  ```

  ```
  Total tests: 12
       Passed: 12
  ```

- [ ] 📖 *"Twelve passed, my new one included."*
- [ ] **Run the desk: DJ name, then `c`, then `r`, caller `Bex`, song `1`, then `c` again, then `q`**

  ```bash
  dotnet run --project week-12/Lab
  ```

  The first `c`:

  ```
  │ Dorothy │ 5     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

  The second:

  ```
  │ Dorothy │ 5     │ Nightjar  │
  │ Bex     │ 2     │ Nightjar  │
  │ Teodoro │ 1     │ -         │
  3 on the switchboard.
  ```

- [ ] 📖 **At the first `c`:** *"Dorothy's Nightjar came back with her."*
- [ ] 📖 **At the second:** *"And Bex asked for Nightjar too. Hold on to that. Two people have asked for the same song."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 12: the requests come back"
  ```

- [ ] **Push it to the starters repo — one block, as in §2.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-12/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-12/ && cp week-12/Lab.Tests/RequestTests.cs ../dotnet-db-starters/demo/week-12/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 12 demo: the requests come back" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab C · Task 2 — 22 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.**
- [ ] 📖 *"Task 2: copy my two files in. Run the desk first and look at LAST ON AIR. Then your test, red, then Include in your Load, green. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** `CS1061` … *does not contain a definition for 'Include'* is the missing `using Microsoft.EntityFrameworkCore;` at the top of `Rotation.cs`
- [ ] 🎯 A student who writes the fix first and the test after has skipped the point. Ask *"what color was your test the first time you ran it?"*

---

## 4 · The database answers *(slide 3)*

- [ ] 📖 *"The f key finds a cart, and this week it also says who has asked for it. That part is mine to write. First I want to see everything the desk says to the database."*
- [ ] **Open `week-12/Lab/DeskContext.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  options.UseSqlServer(config["ConnectionStrings:Desk"]);
  ```

  **Click at the end of that line, press Enter twice, and paste this**

  ```csharp
          options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
  ```

- [ ] 📖 **Highlight the line you just pasted:** *"LogTo turns on EF Core's log. Every command the desk sends to the database is printed on the screen."*
- [ ] **It needs two using lines.** Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:

  ```text
  using Microsoft.Extensions.Configuration;
  ```

  **Click at the end of that line, press Enter, and paste this**

  ```csharp
  using Microsoft.EntityFrameworkCore.Diagnostics;
  using Microsoft.Extensions.Logging;
  ```

- [ ] **Run the desk: DJ name, then `f`, type `Nightjar`, then `q`.** Pause right after the DJ name: the log prints these two commands above the hour table

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  Executed DbCommand (7ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
  SELECT [s].[Id], [s].[Artist], [s].[PlaysTonight], [s].[Seconds], [s].[Title]
  FROM [Songs] AS [s]
  ORDER BY [s].[Id]
  Executed DbCommand (3ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
  SELECT [c].[Id], [c].[CallsTonight], [c].[Name], [r].[Id], [r].[At], [r].[CallerId], [r].[Title]
  FROM [Callers] AS [c]
  LEFT JOIN [Requests] AS [r] ON [c].[Id] = [r].[CallerId]
  ORDER BY [c].[Id]
  ```

  *(Your milliseconds will differ.)*

- [ ] 📖 **At the first `SELECT`:** *"That's the rotation's Load. One table, Songs."*
- [ ] 📖 **At the second:** *"That's the switchboard's Load. Include became a LEFT JOIN. The database put each caller together with their requests, and sent back one answer."*
- [ ] 📖 **At the `f` answer, `Asked for by: -`:** *"And no SQL at all when I pressed f. AskedFor doesn't ask the database anything yet."*
- [ ] 📖 *"When I quit, the log fills up again. That's Save, sending its updates."*
- [ ] **Open `week-12/Lab/Switchboard.cs`, and search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  // Your instructor's, written live in class. The f key calls it.
  ```

  Highlight `AskedFor` under it
- [ ] 📖 **Before you change it, say what it does now:** *"Right now AskedFor hands back an empty list, whatever it's asked. That empty list is the dash on the screen. I need it to ask the database which callers have a request with this title."*
- [ ] **Select from that comment line down to and including the `}` directly under `return new List<string>();`, and paste this over it**

  ```csharp
      // The names of the callers who have asked for this title, in order by
      // name. The database answers it: everything before ToList is sent as SQL.
      public List<string> AskedFor(DeskContext db, string title)
      {
          return db.Callers
              .Where(caller => caller.Requests.Any(request => request.Title == title))
              .OrderBy(caller => caller.Name)
              .Select(caller => caller.Name)
              .ToList();
      }
  ```

- [ ] 📖 **Highlight `db.Callers`:** *"AskedFor starts from the Callers table, not from the switchboard's list."*
- [ ] 📖 **Highlight the `Where` line:** *"Where keeps the callers who have any request with this title."*
- [ ] 📖 **Highlight `OrderBy` and `Select`:** *"OrderBy puts them in order by name, and Select keeps just the name."*
- [ ] 📖 **Highlight `ToList()`:** *"ToList is the moment the question is sent."*
- [ ] **Run the desk: DJ name, then `f`, type `Nightjar`, then `n`, then `q`.** `n` shows the night's numbers

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  Executed DbCommand (18ms) [Parameters=[@title='?' (Size = 4000)], CommandType='Text', CommandTimeout='30']
  SELECT [c].[Name]
  FROM [Callers] AS [c]
  WHERE EXISTS (
      SELECT 1
      FROM [Requests] AS [r]
      WHERE [c].[Id] = [r].[CallerId] AND [r].[Title] = @title)
  ORDER BY [c].[Name]
    Asked for by: Bex, Dorothy
  ```

- [ ] 📖 **Highlight nothing; point at the screen:** *"Where became WHERE. Any became EXISTS. OrderBy became ORDER BY. Select became the one column it sends back, Name. And Nightjar went as a parameter, @title."*
- [ ] 📖 *"The database looked through the Requests table, and sent back two names, in order. Bex, then Dorothy."*
- [ ] 📖 **At the `n` screen:** *"No SQL between these lines. Every number on this screen comes from the lists the desk is holding. The last line, been on air, is your Task 3."*
- [ ] 🎞️ **GO TO SLIDE 3** — *LINQ words, SQL words* · *"Each LINQ word has an SQL word. Everything before ToList goes to the database. Everything after ToList runs in the program."*
- [ ] **Back to the editor. In `week-12/Lab/Switchboard.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  return db.Callers
  ```

  **Click at the end of that line and type** `.ToList()`
- [ ] 📖 *"Now ToList comes first. The answer should be the same. Let's see what the log says."*
- [ ] **Run the desk: DJ name, then `f`, type `Nightjar`, then `q`**

  ```bash
  dotnet run --project week-12/Lab
  ```

  ```
  Executed DbCommand (2ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
  SELECT [c].[Id], [c].[CallsTonight], [c].[Name]
  FROM [Callers] AS [c]
    Asked for by: Bex, Dorothy
  ```

- [ ] 💥 **Let it sit. Then:** *"Same answer. Look at the log. No WHERE. Every caller came back, every column. Then my program did the asking."*
- [ ] 📖 *"With three callers, that costs nothing. A table with a million callers would send a million rows, to answer a question about two of them."*
- [ ] **Take `.ToList()` back out of that line.** It reads `return db.Callers` again
- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 12: the database answers"
  ```

- [ ] **Push it to the starters repo — one block, as in §2.** Silent. `main -> main` at the end means it reached GitHub

  ```bash
  cp week-12/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-12/ && git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 12 demo: the database answers" && git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 💡 **`DeskContext.cs` is not pushed.** Students add the same log line themselves in Task 3

---

## Lab D · Task 3 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: copy my Switchboard in. Turn the log on, the same line I wrote. Then write Aired, a question the database answers, and read the SQL it sends. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** *"been on air" shows `-`, and no SQL prints for it* means `Aired` still hands back the empty list, or asks `_songs` instead of `db.Songs`
- [ ] 🎯 **Ask somebody to read you their `WHERE`.** It should say `EXISTS` and name `Airings`

---

## ☕ Break

---

## Lab F · Finish, then start the homework — 55 minutes

- [ ] **Lids up. The lab README, wherever each person is.** Anyone not finished works on their next task
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It's tonight's lab again, on your own project, and it's three tasks. Push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. Don't ask for either
- [ ] ⚠️ **Stop at 3:38 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 5 · Wrap *(slide 4)*

- [ ] 🎞️ **GO TO SLIDE 4** — *Tonight, in one picture* · *"A list on a record becomes a second table, with the parent's Id in every row. Include brings the list back. LINQ before ToList runs in the database. And the log shows every command."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. Each one of your records gets many of something, and you pick what. Three tasks: the second table, Include, and a question the database answers. Your database carries on. You don't drop anything."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToElevenStillHold. If yours says FourToTen, you are running last week's."*
- [ ] 📖 **The due date** — *"This homework is due before our next class."*
