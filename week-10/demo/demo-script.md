# Week 10 Demo — The Carts Move In 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk moves its night out of two files and into a database on the college's SQL Server. You move the **switchboard**, live, and the students do the same thing to the **rotation**. After each of your segments you push your finished files, and they copy them in to read and run while they work.

> **The shape of the night:** packages and a password → a class becomes a table → the switchboard saves to the database and loads from it → the second night → the same name, twice. **Each demo segment is followed by the lab task that practices it.**

**Total: ~93 minutes of demo, in seven short segments, and six lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-10-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-10-rehearsal
> ```
>
> Then **delete the `week-10` folder** from the Explorer. Switching to `main` removed the files you committed, but not `bin`, `obj`, or the `.json` files the desk wrote.
>
> **Then drop the demo database.** §3 makes it, and §4's first run needs its tables empty. In the SQL Server view, right-click your server → **New Query**, and run:
>
> ```sql
> DROP DATABASE DB_KDXR_156101411_JSG;
> ```
>
> **And empty `demo/week-10/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-10
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 10 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-10/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] 💡 **Type your database name in the Database box at the top of the published page.** Every mention of it on the page changes, including what the Copy buttons hand you. It is saved on this device
- [ ] ⚠️ **Your whole `set` command ready to paste, on your own screen and not the projector** — not just the connection string, so nothing gets edited at the prompt. You run it at the start of Lab B:

  ```text
  dotnet user-secrets set "ConnectionStrings:Desk" "Server=…;Database=DB_KDXR_156101411_JSG;User Id=…;Password=…;TrustServerCertificate=True" --project week-10/Lab
  ```

- [ ] ⚠️ **Know whether your laptop mirrors the projector or extends it.** If it mirrors, the terminal is on the wall the moment you switch to VS Code. Freeze or blank the projector for the minute you set your secret in Lab B
- [ ] ⚠️ **A current `dotnet-ef`**, so no version warning prints on every command tonight:

  ```bash
  dotnet tool update --global dotnet-ef
  ```

- [ ] ⚠️ **The SQL Server view already knows your server.** Click the SQL Server icon in the activity bar → **Add Connection**, with your server, **SQL Login**, your login and password, and the database left blank. A first connection asks about the certificate; get that prompt over with now
- [ ] ⚠️ **No `DB_KDXR_156101411_JSG` on the server.** If you rehearsed, the note above drops it. §3 makes it in front of the room
- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it three times. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room. *No clone there yet?* `git clone https://github.com/jgrissom/dotnet-db-starters.git ../dotnet-db-starters`, then the two lines above
- [ ] ⚠️ **`demo/week-10/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-10
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 10 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin
- [ ] ⚠️ **Delete `week-10/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-10/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · Where the night is kept

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is EF Core, which is how a C# program keeps its data in a database. We'll keep a password somewhere outside the repo. We'll turn a class into a table, and make the table on the college's server. We'll save and load from it, with a test that needs no database at all. And in your lab, the rotation moves into a database of your own."*
- [ ] 🎯 **Say what tonight is, plainly:** *"Right now the desk keeps the night in two files, on this laptop. One holds the callers and one holds the carts. Tonight both move into a database, on a server none of us owns."*
- [ ] 📖 **Then the deal for the night:** *"I move the switchboard. You move the rotation. After each piece I push my files, and you copy them in."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 10 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of five. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-10/Lab.Checks
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 10: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · The packages, and somewhere for a password *(slide 2)*

- [ ] 📖 *"Before the desk can talk to a database, it needs two things. It needs the packages that do the talking. And it needs a password, kept somewhere that is not this repo."*

- [ ] **Add the first package: one the SQL Server package needs**

  ```bash
  dotnet add week-10/Lab package System.Security.Cryptography.Pkcs --version 10.0.13
  ```

- [ ] 📖 *"The SQL Server package needs this one, so it goes in first."*
- [ ] **Then the SQL Server part of EF Core**

  ```bash
  dotnet add week-10/Lab package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.13
  ```

- [ ] 📖 *"EF Core is Entity Framework Core. It is how a C# program reads and writes a database without writing the database's own language by hand. This package is the part of it that speaks to SQL Server."*
- [ ] **Then the other three packages, without stopping between them**

  ```bash
  dotnet add week-10/Lab package Microsoft.EntityFrameworkCore.Design --version 10.0.13
  ```

  ```bash
  dotnet add week-10/Lab package Microsoft.Extensions.Configuration --version 10.0.13
  ```

  ```bash
  dotnet add week-10/Lab package Microsoft.Extensions.Configuration.UserSecrets --version 10.0.13
  ```

- [ ] 📖 *"Design is the part of EF Core that the dotnet ef tool needs, to make the tables. The other two read a password from where I'm about to put it."*
- [ ] **Open `week-10/Lab/Lab.csproj` and highlight the `<ItemGroup>`**
- [ ] 📖 *"Every dotnet add wrote a line here, so this is where I check they all landed. Six packages. Five are the ones I just added, all version 10.0.13. Spectre was already here. They're in alphabetical order, not the order I typed them."*

- [ ] 📖 *"To reach the database, the desk needs a connection string. It is one line of text: which server, which database, my login, and my password. My password does not go in this repo. A repo is something other people read."*
- [ ] **Ask the project what secrets it has**

  ```bash
  dotnet user-secrets list --project week-10/Lab
  ```

  ```
  Could not find the global property 'UserSecretsId' in MSBuild project
  ```

- [ ] 📖 *"This project has no secret store yet. User secrets keep values like a password in a file in my home folder, outside every repo on this laptop. Turning it on is one command."*

  ```bash
  dotnet user-secrets init --project week-10/Lab
  ```

- [ ] **Open `week-10/Lab/Lab.csproj` and highlight the `<UserSecretsId>` line**
- [ ] 📖 *"The UserSecretsId is the name of a folder in my home folder. It is not a secret, and it gets committed. The secret goes in the folder it names."*
- [ ] **Ask again**

  ```bash
  dotnet user-secrets list --project week-10/Lab
  ```

  ```
  No secrets configured for this application.
  ```

- [ ] 📖 *"Now there is a store, and it is empty. Those two answers are worth remembering. When the desk can't find its database, list tells you which of the two is the problem."*
- [ ] **Don't run this one.** Show it on screen as the command students will run, and talk it through

  ```text
  dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-10/Lab
  ```

- [ ] 📖 *"This command is set. It puts the connection string in the store. The connection string is one line: which server, which database, your login, and your password."*
- [ ] 🎯 *"I'm not running it here, because mine has my password in it and this screen is the projector. I'll set mine at the start of the lab, on my own screen, while you set yours."*

- [ ] 🎞️ **GO TO SLIDE 2** — *Where a password lives* · *"User secrets keep the password out of the repo, and that is the one problem they solve. The file is not encrypted. It is not shared with anyone. And it is only on this machine, so a lab PC that reboots loses it. Putting it back is the same set command."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 10: the packages, and somewhere for the password"
  ```

---

## Lab B · Task 1 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.**
- [ ] 📖 *"Task 1 is what I just did, on your desk. The tool, the five packages, and your own secret store. Then your own connection string, which I'm setting on mine right now. Then connect to the server in the SQL Server view, to prove your login works. Your check count stays at one out of five. Stop at the stop note after the commit."*
- [ ] ⚠️ **Set your own secret now, while the projector shows the README** — frozen or blanked if your laptop mirrors it. §3's `database update` is the first command that needs it
- [ ] **Open a NEW terminal tab** (the **+** at the top right of the terminal panel), paste the whole `set` command you prepared in §0, and run it

  ```
  Successfully saved ConnectionStrings:Desk to the secret store.
  ```

- [ ] ⚠️ **Close that tab with its trash-can icon.** Your password is in its scrollback, and §3 runs in front of the room. Back in the original terminal, **don't press the Up arrow tonight**: the shell remembers the command
- [ ] ⚠️ **Do not run `dotnet user-secrets list` on the projector, now or later tonight, and do not open the secrets file.** Both print the password
- [ ] 🎯 **Circulate at step 1d.** A login or network problem is far cheaper to fix now than at Task 3. The commonest are a wrong server name and a dismissed certificate prompt
- [ ] 🎯 **And look for a connection string still saying `YOUR-…`.** `list` shows it

---

## 3 · A class becomes a table *(slide 3)*

- [ ] 📖 *"The database needs to know what tables to make. EF Core works that out from a class, and the class is called the DbContext."*

- [ ] **In the Explorer, right-click `week-10/Lab` → New File → `DeskContext.cs`, and paste this in**

  ```csharp
  // The desk's database: which tables it keeps, and where to find them.

  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;

  public class DeskContext : DbContext
  {
      public DbSet<Caller> Callers { get; set; }

      public DeskContext()
      {
      }

      public DeskContext(DbContextOptions<DeskContext> options)
          : base(options)
      {
      }

      protected override void OnConfiguring(DbContextOptionsBuilder options)
      {
          if (options.IsConfigured)
          {
              return;
          }

          IConfiguration config = new ConfigurationBuilder()
              .AddUserSecrets<DeskContext>()
              .Build();

          options.UseSqlServer(config["ConnectionStrings:Desk"]);
      }
  }
  ```

- [ ] 📖 **Highlight `public DbSet<Caller> Callers`:** *"One DbSet is one table. This one holds callers, and the table will be called Callers, after the property."*
- [ ] 📖 **Nothing to highlight:** *"The rest of the class says how to connect, using the connection string in my secret store. We'll come back to it when the tests need it."*

- [ ] 📖 *"Now I ask the dotnet ef tool to read this class and write the instructions for making the table. Those instructions are called a migration."*

  ```bash
  dotnet ef migrations add TheCallersMoveIn --project week-10/Lab
  ```

  ```
  Build started...
  Build succeeded.
  Unable to create a 'DbContext' of type 'DeskContext'. The exception 'No suitable constructor was found for the type 'Caller'. The following constructors had parameters that could not be bound to properties of the type: 
      Cannot bind 'name' in 'Caller(string name)'
  Note that only mapped properties can be bound to constructor parameters. Navigations to related entities, including references to owned types, cannot be bound.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
  ```

- [ ] **It's a long message. In the terminal, highlight the indented line in the middle of it: `Cannot bind 'name' in 'Caller(string name)'`**

- [ ] 📖 *"The tool can't make a table for callers yet. Let me read the line that matters: Cannot bind name. When EF Core reads a caller back out of the table, it builds a Caller with the Caller constructor, and it has to hand that constructor a name."*
- [ ] **Open `week-10/Lab/Caller.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public string Name { get; }` — one hit.** Highlight that line
- [ ] 📖 *"Name has only a get. A property with only a get is left out of the table, so there's no name to hand back. The database needs to be able to set it."*
- [ ] **Select that one line and paste this over it**

  ```csharp
      public string Name { get; private set; }
  ```

- [ ] 📖 *"A private set. The database can fill the name in when it reads a caller back, and nothing outside this class can change it."*
- [ ] **Ask again**

  ```bash
  dotnet ef migrations add TheCallersMoveIn --project week-10/Lab
  ```

  ```
  Build started...
  Build succeeded.
  Unable to create a 'DbContext' of type 'DeskContext'. The exception 'The entity type 'Caller' requires a primary key to be defined. If you intended to use a keyless entity type, call 'HasNoKey' in 'OnModelCreating'. For more information on keyless entity types, see https://go.microsoft.com/fwlink/?linkid=2141943.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
  ```

- [ ] **In the terminal, highlight `The entity type 'Caller' requires a primary key to be defined`**

- [ ] 📖 *"The next message is about a primary key. A table needs one column that is different on every row. Two callers could both be called Dorothy, so the name won't do. EF Core looks for a property called Id."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public class Caller` — one hit. Click at the end of the `{` on the line under it, press Enter, and paste this**

  ```csharp
      // The database's own number for this caller's row.
      public int Id { get; set; }

  ```

- [ ] 📖 *"I never set it. A caller that has never been saved has Id zero, and the database fills in the real number when it saves the row."*
- [ ] **Ask again**

  ```bash
  dotnet ef migrations add TheCallersMoveIn --project week-10/Lab
  ```

  ```
  Build started...
  Build succeeded.
  Unable to create a 'DbContext' of type 'DeskContext'. The exception 'The entity type 'Song' requires a primary key to be defined. If you intended to use a keyless entity type, call 'HasNoKey' in 'OnModelCreating'. For more information on keyless entity types, see https://go.microsoft.com/fwlink/?linkid=2141943.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
  ```

- [ ] **In the terminal, highlight `The entity type 'Song' requires a primary key to be defined`**

- [ ] 💥 **Don't explain it yet. Ask, and wait:** *"My context only mentions callers. Why is it asking about Song?"*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public Song? Favorite` — one hit.** Highlight that line
- [ ] 📖 *"A caller has a Favorite, and a favorite is a whole Song. So EF Core decided songs need a table too. Tonight a caller's favorite is not saved. I tell EF Core to leave it out with NotMapped."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `using System.Text.Json.Serialization;` — one hit, at the top of the file. Select that line and paste this over it**

  ```csharp
  using System.ComponentModel.DataAnnotations.Schema;
  using System.Text.Json.Serialization;
  ```

- [ ] **Back to `public Song? Favorite`. Select the `[JsonInclude]` line directly above it and paste this over it**

  ```csharp
      [NotMapped]
      [JsonInclude]
  ```

- [ ] **Ask one more time**

  ```bash
  dotnet ef migrations add TheCallersMoveIn --project week-10/Lab
  ```

  ```
  Build started...
  Build succeeded.
  Done. To undo this action, use 'ef migrations remove'
  ```

- [ ] 📖 *"The migration is written. Three changes to Caller: a private set on the name, an Id, and NotMapped on the favorite. Each one came from a message."*
- [ ] **Open `week-10/Lab/Migrations/` and the file whose name ends `_TheCallersMoveIn.cs`. Highlight the `CreateTable` block in `Up()`**

  ```
                migrationBuilder.CreateTable(
                    name: "Callers",
                    columns: table => new
                    {
                        Id = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"),
                        Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                        CallsTonight = table.Column<int>(type: "int", nullable: false)
                    },
  ```

- [ ] 📖 *"This is the Caller class as a table. Three columns: Id, Name and CallsTonight. Identity on the Id means the database numbers the rows itself."*
- [ ] 🎯 **Ask, and wait for an answer:** *"Has anything happened on the server yet?"*
- [ ] 📖 *"No. migrations add read my classes and wrote a file. It didn't connect to anything. The next command is the one that talks to the server."*

- [ ] 🎞️ **GO TO SLIDE 3** — *Two commands, one network* · *"migrations add writes the instructions, into your project, and needs no network. database update carries them out, on the server. If you only run the first one, the table never exists."*
- [ ] **Back to the terminal, and run the second one**

  ```bash
  dotnet ef database update --project week-10/Lab
  ```

  ```
  Applying migration
  Done.
  ```

- [ ] 📖 *"database update made the database, because I didn't have one, and then the Callers table."*
- [ ] **In the SQL Server view, right-click your connection → Refresh. Open Databases → `DB_KDXR_156101411_JSG` → Tables, then right-click `dbo.Callers` → Select Top 1000**
- [ ] 📖 *"The Callers table is on the college's server now. It has three columns and no rows. Nothing has written to it yet."*
- [ ] **Run the desk: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-10/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  ```

- [ ] 📖 *"The desk looks the same, and it should. The switchboard still saves to its file. Moving that is the next part."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 10: a caller the database can keep"
  ```

- [ ] **Push it to the starters repo — copy the file there, commit there, then push.** Silent; they watch

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-10 && cp week-10/Lab/Caller.cs ../dotnet-db-starters/demo/week-10/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 10 demo: a caller the database can keep"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 📖 *"My Caller is in the starters repo now. You copy it in first, because your context has a callers table too."*

---

## Lab C · Tasks 2 and 3 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.** Its first step is pulling my file and copying it in
- [ ] 📖 *"Task 2: copy my Caller in, give Song an Id, and write your DeskContext. Yours has two tables: my Callers, and your Carts. Task 3: the migration, then database update, then look at your tables. Stop at the stop note after Task 3's commit."*
- [ ] 🎯 **Circulating:** *"Song requires a primary key"* means the `Id` line is missing. *"Cannot bind 'name'"* means they skipped copying `Caller.cs`
- [ ] 🎯 **And ask anybody who has finished Task 3 to show you their tables in the SQL Server view.** Check 3 can't see `database update`; only the view can

---

## ☕ Break

---

## 4 · The switchboard moves in *(slide 4)*

- [ ] 📖 **Before you change Save and Load, say what they do now:** *"Right now the switchboard's Save writes every caller into a file, and Load reads them back. I need Save to put the callers into the Callers table, and Load to read them out of it."*
- [ ] **Open `week-10/Lab/Switchboard.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public void Save(string path)` — one hit. Select from that line down to and including the `}` directly under `_callers.AddRange(loaded);`, and paste this over it**

  ```csharp
      public void Save(DeskContext db)
      {
          foreach (Caller caller in _callers)
          {
              db.Callers.Add(caller);
          }

          db.SaveChanges();
      }

      public void Load(DeskContext db)
      {
          List<Caller> loaded = db.Callers.OrderBy(caller => caller.Id).ToList();

          if (loaded.Count == 0)
          {
              return;
          }

          _callers.Clear();

          _callers.AddRange(loaded);
      }
  ```

- [ ] 📖 **Highlight `DeskContext db` in Save:** *"Save is handed the database now, instead of a file name."*
- [ ] 📖 **Highlight `db.Callers.Add(caller);`:** *"Add marks each caller to go into the table."*
- [ ] 📖 **Highlight `db.SaveChanges();`:** *"SaveChanges sends everything that was marked to the server, in one go. Without it, nothing reaches the table, and nothing tells you."*
- [ ] 📖 **Highlight `db.Callers.OrderBy(caller => caller.Id).ToList()`:** *"Load reads the whole table into a list. A table has no order of its own, so OrderBy on the Id hands them back in the order they first went in."*
- [ ] 📖 **Highlight `if (loaded.Count == 0)`:** *"The old Load returned early when there was no file. The table is always there now, but the first time, it's empty. An empty table means keep the callers the desk already has."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `using System.Text.Json;` — one hit, at the top of the file. Delete that line.** Nothing in this file reads JSON now
- [ ] **Build**

  ```bash
  dotnet build week-10/Lab
  ```

  ```
  Program.cs(100,18): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
  Program.cs(170,18): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
  ```

- [ ] 📖 *"Two errors, both in Program.cs. Save and Load want a DeskContext now, and Program.cs still hands them a file name."*
- [ ] **Open `week-10/Lab/Program.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `string switchboardFile = "week-10/switchboard.json";` — one hit. Select that line and paste this over it**

  ```csharp
  DeskContext db = new DeskContext();
  ```

- [ ] 📖 *"That line makes one DeskContext, and the whole shift uses it. It doesn't connect to anything yet. Load is the first thing that asks the server a question."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `switchboard.Load(switchboardFile);` — one hit. Make that line read**

  ```csharp
  switchboard.Load(db);
  ```

- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `switchboard.Save(switchboardFile);` — one hit. Make that line read**

  ```csharp
  switchboard.Save(db);
  ```

  ```bash
  dotnet build week-10/Lab
  ```

  ```
      0 Error(s)
  ```

- [ ] **Now the tests**

  ```bash
  dotnet test week-10/Lab.Tests
  ```

  ```
  SwitchboardTests.cs(21,20): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
  SwitchboardTests.cs(24,23): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
  ```

- [ ] 📖 *"Two more errors, both in one test. ACallerRemembersTheirCalls saves a switchboard to a scratch file and reads it back. Save doesn't take a file any more."*
- [ ] 🎯 **Ask, and wait:** *"So should this test use the college's server?"*
- [ ] 📖 *"Then it fails whenever the network does, and it needs my password. A test needs somewhere to keep rows that isn't a server. EF Core has one: a table that lives inside the test run. It's one more package, on the test project."*

  ```bash
  dotnet add week-10/Lab.Tests package Microsoft.EntityFrameworkCore.InMemory --version 10.0.13
  ```

- [ ] **Open `week-10/Lab.Tests/SwitchboardTests.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `namespace Lab.Tests;` — one hit. Select that line and paste this over it**

  ```csharp
  using Microsoft.EntityFrameworkCore;

  namespace Lab.Tests;
  ```

- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `string path = Path.Combine(Path.GetTempPath(), "kdxr-demo-switchboard.json");` — one hit. Select from that line down to and including `File.Delete(path);`, and paste this over it**

  ```csharp
          DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
              .UseInMemoryDatabase(Guid.NewGuid().ToString())
              .Options;
  ```

- [ ] 📖 *"These three lines describe a table that lives inside the test, with a new name every time. No server, no password, no network."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `board.Save(path);` — one hit. Make that line read**

  ```csharp
          board.Save(new DeskContext(options));
  ```

- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `reopened.Load(path);` — one hit. Make that line read**

  ```csharp
          reopened.Load(new DeskContext(options));
  ```

- [ ] 📖 **Highlight `new DeskContext(options)`:** *"DeskContext has two constructors. The desk uses the one that takes nothing, and it connects to the server. This one takes options, so the test can hand the context somewhere else to keep its rows."*
- [ ] 🎞️ **GO TO SLIDE 4** — *A table that lives inside the test* · *"The desk makes a DeskContext with nothing, and it goes to the secret store and the server. A test makes one with options, and the rows stay inside the test run. Same Save, same Load, two places to keep the rows."*
- [ ] **Run the suite**

  ```bash
  dotnet test week-10/Lab.Tests
  ```

  ```
  Total tests: 7
       Passed: 7
  ```

- [ ] 📖 *"Seven passed. The test saves Dorothy into one context and reads her back through another. So if Save forgot SaveChanges, this test would go red. It can't see everything, though. A Load that forgot to Clear would still pass it. Only the desk shows that one."*

- [ ] 📖 *"One tidy-up. Nothing reads JSON now, so the JsonInclude attributes on Caller have nothing to do."*
- [ ] **In `Caller.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public int CallsTonight { get; private set; }` — one hit. Delete the `[JsonInclude]` line directly above it**
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public Song? Favorite { get; private set; }` — one hit. Delete the `[JsonInclude]` line directly above it.** `[NotMapped]` stays
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `using System.Text.Json.Serialization;` — one hit. Delete that line**

  ```bash
  dotnet build week-10/Lab
  ```

  ```
      0 Warning(s)
      0 Error(s)
  ```

- [ ] **In the Explorer, delete `week-10/switchboard.json`.** It's from §3's run, and nothing reads it now
- [ ] **Run the desk: DJ name, then `c`, then `q`**

  ```bash
  dotnet run --project week-10/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  ```

- [ ] 📖 *"The usual three callers. The table was empty, so Load kept them. Then I quit, and Save put them in the table."*
- [ ] **Look in `week-10/` in the Explorer**
- [ ] 📖 *"No switchboard.json. The rotation.json is still here, because the rotation is your job tonight."*
- [ ] **SQL Server view: right-click `dbo.Callers` → Select Top 1000**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 3 |
  | 2 | Bex | 1 |
  | 3 | Teodoro | 1 |

- [ ] 🎯 *"Dorothy, Bex and Teodoro are in the table, with an Id each, filled in by the database. And I am not reading these rows out of my program. The desk is shut. That is a query against a server that I don't own."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 10: the switchboard moves into the database"
  ```

- [ ] **Push it to the starters repo.** Silent

  ```bash
  cp week-10/Lab/Switchboard.cs week-10/Lab/Caller.cs ../dotnet-db-starters/demo/week-10/ && cp week-10/Lab.Tests/SwitchboardTests.cs ../dotnet-db-starters/demo/week-10/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 10 demo: the switchboard moves into the database"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab D · Task 4 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 4 in full*.**
- [ ] 📖 *"Task 4: copy my three files in. Your build breaks in two places, the same two errors I just fixed. Then Save and Load for the rotation, the same as mine. Then your two tests that used a file. Then run the desk twice. The second run crashes on the way out, and that is the next part of the demo. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulate hard — this is the lab's payoff.** Ask anybody who has run the desk to show you `dbo.Carts` in the SQL Server view, and the week folder with no `.json` file in it
- [ ] 🎯 **A table that stays empty, with nothing complaining,** is a `Save` with no `db.SaveChanges()`. Check 4 says so

---

## ☕ Break

---

## 5 · The second night

- [ ] 📖 *"The callers are in the table. Let's start the next shift and see if they come back."*
- [ ] **Run the desk: DJ name, then `c`**

  ```bash
  dotnet run --project week-10/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  ```

- [ ] 📖 *"Dorothy, Bex and Teodoro, out of the database, with their calls. There is no file."*
- [ ] **Without quitting: `r`, caller `Dorothy`, song `1`. Then `c`**

  ```
  │ Dorothy │ 4     │ Nightjar  │
  ```

- [ ] 📖 *"Dorothy rang again, so she has four calls."*
- [ ] **Press `q`**

  ```
  Cannot insert explicit value for identity column in table 'Callers' when IDENTITY_INSERT is set to OFF.
  ```

- [ ] 💥 **Let it sit. Then ask, and wait:** *"The desk crashed on the way out. Saving worked the first time. What's different about this shift?"*
- [ ] 📖 *"The first time, every caller was new, with Id zero. This time every caller came out of the table, carrying the number of its row. Save tried to Add each one again. Adding a row that already has a number is the thing the database refused."*
- [ ] **SQL Server view: Select Top 1000 on `dbo.Callers` again**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 3 |

- [ ] 📖 *"Dorothy still has three. Her fourth call never arrived."*

- [ ] 📖 *"Before I fix Save, I'll write down what it should do, as a test. A caller who comes out of the table and rings again is still one row, and the row has the new call on it."*
- [ ] **In the Explorer, right-click `week-10/Lab.Tests` → New File → `SecondSaveTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about the second night, written before the fix.

  using Microsoft.EntityFrameworkCore;

  namespace Lab.Tests;

  public class SecondSaveTests
  {
      [Fact]
      public void ACallerWhoRingsAgainIsStillOneRow()
      {
          DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
              .UseInMemoryDatabase(Guid.NewGuid().ToString())
              .Options;

          Switchboard board = new Switchboard();
          board.Take("Dorothy");
          board.Save(new DeskContext(options));

          DeskContext db = new DeskContext(options);
          Switchboard nextNight = new Switchboard();
          nextNight.Load(db);
          nextNight.Take("Dorothy");
          nextNight.Save(db);

          Switchboard reopened = new Switchboard();
          reopened.Load(new DeskContext(options));

          Assert.Equal(1, reopened.Count);
          Assert.Equal(2, reopened.Find("Dorothy")!.CallsTonight);
      }
  }
  ```

- [ ] 📖 **Highlight the first `board.Save`:** *"The first night. Dorothy rings once, and she's saved."*
- [ ] 📖 **Highlight the three `nextNight` lines:** *"The next night. One DeskContext for the whole night, the way the desk does it. Dorothy is loaded, rings again, and is saved."*
- [ ] 📖 **Highlight the two asserts:** *"Then a third switchboard reads the table. It should hold one Dorothy, with two calls."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-10/Lab.Tests
  ```

  ```
    Failed Lab.Tests.SecondSaveTests.ACallerWhoRingsAgainIsStillOneRow
    Error Message:
     System.ArgumentException : An item with the same key has already been added. Key: 1
  ```

- [ ] 📖 *"Red. The table in the test words it differently: an item with the same key. Key one is Dorothy's Id. It's the same mistake as the crash."*

- [ ] 📖 **Before you change Save, say what it does now:** *"Right now Save adds every caller. I need it to add only the callers with Id zero, and update the rest."*
- [ ] **In `Switchboard.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `db.Callers.Add(caller);` — one hit. Select that one line and paste this over it**

  ```csharp
              if (caller.Id == 0)
              {
                  db.Callers.Add(caller);
              }
              else
              {
                  db.Callers.Update(caller);
              }
  ```

- [ ] 📖 **Highlight `caller.Id == 0`:** *"Id zero has never been saved, so Add puts in a new row."*
- [ ] 📖 **Highlight `db.Callers.Update(caller);`:** *"Any other Id is a row the table already has. Update changes that row."*

  ```bash
  dotnet test week-10/Lab.Tests
  ```

  ```
  Total tests: 8
       Passed: 8
  ```

- [ ] 📖 *"Eight passed. Now the desk."*
- [ ] **Run the desk: DJ name, then `r`, caller `Dorothy`, song `1`, then `c`, then `q`**

  ```bash
  dotnet run --project week-10/Lab
  ```

  ```
  │ Dorothy │ 4     │ Nightjar  │
  ```

- [ ] 📖 *"Four calls, and no crash on the way out."*
- [ ] **SQL Server view: Select Top 1000 on `dbo.Callers`**

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 4 |

- [ ] 📖 *"Still one Dorothy, and her row has four calls."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 10: the second night"
  ```

- [ ] **Push it to the starters repo.** Silent

  ```bash
  cp week-10/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-10/ && cp week-10/Lab.Tests/SecondSaveTests.cs ../dotnet-db-starters/demo/week-10/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 10 demo: the second night"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab E · Task 5 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 5 in full*.**
- [ ] 📖 *"Task 5: copy my two files in, and run the desk. It gets further than before, and then your rotation crashes, on Carts this time. Write your test first, see it red, then the if and else. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student who writes the fix first and the test after has skipped the point. Ask *"what color was your test the first time you ran it?"*

---

## 6 · The same name, twice

- [ ] **Run the desk: DJ name, then `r`, caller `dorothy`, all lower case, then press Enter at the song prompt (Enter picks the next song in the rotation, and the first request in a run gets Nightjar). Then `c`, then `q`**

  ```bash
  dotnet run --project week-10/Lab
  ```

  ```
  │ Dorothy │ 4     │ -         │
  │ dorothy │ 1     │ Nightjar  │
  ```

- [ ] 📖 *"Two callers. The desk asked Find for dorothy, with a small d. Find compares every letter exactly, so it didn't find Dorothy, and the desk made a new caller."*
- [ ] **SQL Server view: right-click `DB_KDXR_156101411_JSG` → New Query. Run this**

  ```sql
  SELECT * FROM Callers WHERE Name = 'dorothy';
  ```

  | Id | Name | CallsTonight |
  |---|---|---|
  | 1 | Dorothy | 4 |
  | 4 | dorothy | 1 |

- [ ] 💥 **Let it sit. Then ask:** *"I asked the database for dorothy with a small d. How many rows came back?"*
- [ ] 📖 *"Two. C# says these are two different callers. The database says both of them are dorothy. This server compares text without caring about capital letters, and C# cares about every one."*
- [ ] 📖 *"Right now the desk asks its own list, in C#. When the desk starts asking the database instead, the answer to that question changes."*

---

## Lab F · Finish, then start the homework — 22 minutes

- [ ] **Lids up. The lab README, wherever each person is.** Anyone not finished works on their next task
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It's tonight's lab again, on your own project, and the first part needs your login. Do Part 1 and Task 1 and push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. The first item of *Done early* is the case question from §6, on the carts. Don't ask for either
- [ ] ⚠️ **Stop at 3:38 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 7 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"The password lives in user secrets, outside the repo. A DbContext says which tables there are. migrations add writes the instructions, and database update carries them out on the server. Save adds the new rows and updates the old ones, then SaveChanges sends it all. An empty table is the first night, so Load leaves the desk's own data alone. And a test hands the context a table of its own."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. Five tasks, in the same order. If you finished the lab, you have done every step once."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToNineStillHold. If yours says FourToEight, you are running last week's."*
- [ ] ⚠️ **Say the grading change, because they'll see it in the rubric** — *"From this week I can't run your program. It needs your connection string, and that is correctly not in your repo. So the two points for running it are two points for building it. My checks and your own tests still run your code."*
- [ ] ⚠️ **And say what a removed record does now** — *"One thing the homework says plainly. Save puts records in and changes them. It doesn't take a removed record out of the table yet, so a record you remove comes back the next time you run."*
- [ ] 📖 **The due date** — *"This homework is due before our next class."*
