# Week 10 Lab — The Carts Move In 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the whole night is in two files. `switchboard.json` holds the callers and `rotation.json` holds the carts, and both sit in the week folder on whichever laptop is at the desk.

Tonight both move into a **database** on the college's SQL Server, a machine that is not yours. The tool that does it is called **Entity Framework Core**, EF Core for short. It turns a class into a table, and a list of objects into rows.

Your job: give the desk somewhere to keep a password, give a cart an `Id`, make the tables, and then have the rotation save to the database and load from it. Your instructor does the same to the switchboard, a piece at a time, just before you do it to the rotation.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all five checks green, a rotation that comes back from the database, and no `rotation.json` anywhere.**

> [!IMPORTANT]
> **You make a real database tonight, on the college's server, with your own account.** Task 1 proves your account works, and it is the first thing you do, so that a problem with your login or the network turns up while your instructor is in the room.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the ones the tasks name, and nothing tonight depends on remembering last week's code.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch the **switchboard** move into the database, then copy those finished files into your project. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, all of them finished, and the copy commands work the same.

## Setup

Four steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

**1. Confirm your coursework window is open.** If VS Code is already showing `dotnet-db-coursework` from last week — done, skip to step 2. Otherwise: **File → Open Folder → `dotnet-db-coursework` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder at all?** Then you're starting from scratch, which is fine — [week 1's setup guide](../../week-01/setup-guide.md) makes it and connects it to GitHub. Do that first; nothing tonight depends on having been here last week.

**2. Update your starters clone — from the terminal you already have.** `` Ctrl+` `` (it opens standing at the top of your repo), then:

```bash
cd ../dotnet-db-starters
git pull
cd ../dotnet-db-coursework
```

One hop sideways into the clone, pull, hop back.

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it. From the same terminal:
> ```bash
> cd ..
> git clone https://github.com/jgrissom/dotnet-db-starters.git
> cd dotnet-db-coursework
> ```
> Now the two folders sit side by side, and the pull above will work every week after.

**3. Copy this week in — one command, from the same terminal.**

You haven't moved: step 2 left you standing at the top of your repo, which is exactly where this runs.

```bash
cp -r ../dotnet-db-starters/week-10 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-10` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-10`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — three projects again, same as last week:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-10/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — Rotation.cs and Song.cs have tonight's work in them
   ├─ Lab.Tests/           ← YOURS — four facts ship written; two of them move tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-10` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight the rotation moves into a database, and the homework moves your own registry the same way.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-10/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the desk already does, and it stays green all night. **The four red ones are tonight's tasks** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 10: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-10/Lab.Checks`, `dotnet test week-10/Lab.Tests` and `dotnet run --project week-10/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

**Two suites, a desk, and now a database:**

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-10/Lab` | the desk | what any of it looks like on the air — **and the only thing that proves your database works** |
| `dotnet test week-10/Lab.Checks` | mine | *can the desk do it?* — 1 through Task 1, then 2, 3, 4, 5 |
| `dotnet test week-10/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 7 facts most of the night, 9 by the end |

| File | What it is |
|---|---|
| `Lab/Song.cs` | **Yours for one line**, in Task 2, and a tidy-up in Task 4 |
| `Lab/DeskContext.cs` | **Yours, and it doesn't exist yet.** You make it in Task 2 |
| `Lab/Rotation.cs` | **Yours.** `Save` and `Load` change in Tasks 4 and 5 |
| `Lab/Program.cs` | Ships finished, and **six lines of it change in Task 4**: one makes the `DeskContext`, one comes out, and two pairs hand the context to `Load` and `Save` |
| `Lab.Tests/DeskTests.cs` | **Yours.** Two of its facts move in Task 4, and you write one more in Task 5 |
| `Lab/Caller.cs`, `Lab/Switchboard.cs` | **Your instructor's.** You copy the finished files in at Tasks 2, 4 and 5, and read them as you work. You never edit them |
| `Lab.Tests/SwitchboardTests.cs`, `Lab.Tests/SecondSaveTests.cs` | **Your instructor's facts**, copied in at Tasks 4 and 5 |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always.** |

> [!IMPORTANT]
> **My checks never touch the college's server.** They hand your `DeskContext` [a table that lives inside the test run](../lecture-notes.md#testing-without-a-database), so they pass with the wifi off. **That is why every task runs the desk as well.** Green checks say your code is right. Only the desk says your *database* is.

## The tasks

**The rhythm is the same every time:** run the desk and *look* → write the code → run the desk again and *see the difference* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole thing is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green — and has to stay that way)* | The packages, and somewhere for a password. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `ACartIsShapedForATable` | A cart with an `Id`, and a `DeskContext`. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `ThereIsAMigration` | The instructions that make the tables, and then the tables. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheCartsSurviveARestart` | The rotation saves to the database and loads from it. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `ASecondSaveUpdatesTheRows` | A fact first, then a cart that is already in the table gets changed, not added again. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

**The packages, and somewhere for a password.**

**Check:** `Check1_TheDeskStillAnswers` — **already green, and it stays that way.** Nothing in this task turns a check green. It is the setup every later task stands on, and the part that talks to the college's server for the first time.

**First, look at the carts.** Start the desk, type a DJ name, press `t`, then `q`:

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
```

**When you pressed `q`, the desk wrote two files into `week-10/`: `switchboard.json` and `rotation.json`.** By Task 4 neither one is used.

#### 1a — the EF tool

```bash
dotnet tool update --global dotnet-ef
```

**This one command installs `dotnet-ef` if you don't have it, and updates it if you do.** It is the tool that writes migrations and makes tables, in Task 3. You run it once per machine.

#### 1b — five packages on the desk

Each package is one `dotnet add`. **The first is one the SQL Server package needs, so it goes in first:**

```bash
dotnet add week-10/Lab package System.Security.Cryptography.Pkcs --version 10.0.13
```

**Then the SQL Server part of EF Core:**

```bash
dotnet add week-10/Lab package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.13
```

**Then the other three.** The first is the part of EF Core that `dotnet-ef` needs to write migrations. The other two read the password from where you're about to keep it.

```bash
dotnet add week-10/Lab package Microsoft.EntityFrameworkCore.Design --version 10.0.13
```

```bash
dotnet add week-10/Lab package Microsoft.Extensions.Configuration --version 10.0.13
```

```bash
dotnet add week-10/Lab package Microsoft.Extensions.Configuration.UserSecrets --version 10.0.13
```

📖 *Why the `--version`:* every package in the course is pinned, so your desk and my checks use the same EF Core.

**Check they all landed.** Open `week-10/Lab/Lab.csproj`. Its `<ItemGroup>` should list **six** packages: the five you just added, each at `10.0.13`, and `Spectre.Console`, which was already there.

```xml
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.13">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Configuration" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Configuration.UserSecrets" Version="10.0.13" />
    <PackageReference Include="Spectre.Console" Version="0.57.2" />
    <PackageReference Include="System.Security.Cryptography.Pkcs" Version="10.0.13" />
  </ItemGroup>
```

- **They're in alphabetical order**, not the order you typed them. `dotnet add` sorts them.
- **`Design` has two extra lines inside it.** `dotnet add` writes those itself; leave them.
- **A package missing?** Run its `dotnet add` again.

#### 1c — somewhere for the password

The desk needs a **connection string**: one line that says which server, which database, and who you are, **including your password**. A password does not go in your repo, ever. [User secrets](../lecture-notes.md#user-secrets--a-password-outside-the-repo) keep it in a file in your home folder instead, outside every repo you have.

**Ask what is in this project's secret store:**

```bash
dotnet user-secrets list --project week-10/Lab
```

```
Could not find the global property 'UserSecretsId' in MSBuild project
```

**That means this project has no secret store yet.** Turn it on:

```bash
dotnet user-secrets init --project week-10/Lab
```

That writes a `<UserSecretsId>` line into `week-10/Lab/Lab.csproj`. **It is the name of a folder, not a secret**, and it is meant to be committed. Ask again:

```bash
dotnet user-secrets list --project week-10/Lab
```

```
No secrets configured for this application.
```

**The store exists, and it is empty.** Those two answers are worth remembering: they are the two different things that are wrong when the desk can't find its database.

**Now put your connection string in it.** Swap all four `YOUR-…` parts before you run it. Your instructor gives you the server name in class, and it is in Canvas too. The login and password are your college SQL account. **The database name is yours to choose**, in this shape, and it doesn't exist yet:

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-10/Lab
```

```
Successfully saved ConnectionStrings:Desk to the secret store.
```

> [!IMPORTANT]
> **`DB_KDXR_156101411_ABL` is the shape:** `DB_`, the app, the course number, your initials. [The `DB_` on the front](../lecture-notes.md#naming-your-database) stops your databases colliding with ones you make in another course. **`TrustServerCertificate=True` is not optional either.** Without it the server refuses the connection.

**Check it took:**

```bash
dotnet user-secrets list --project week-10/Lab
```

```
ConnectionStrings:Desk = Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True
```

Yours shows your real values. **That command prints your password**, so it is for your own screen only.

> [!CAUTION]
> **Keep a copy of that connection string somewhere that is not this repo.** Lab PCs wipe when they reboot, and the secret store goes with them. [Putting it back is one command](../lecture-notes.md#a-lab-pc-that-rebooted), and it is the `set` above.

#### 1d — prove your account works

**Install the one database tool this course uses.** Extensions (<kbd>⇧⌘X</kbd> / <kbd>Ctrl⇧X</kbd>), search **`SQL Server (mssql)`**, publisher **Microsoft**, and **Install**.

Then click the new **SQL Server** icon in the activity bar on the left → **Add Connection**. Give it the same server, login and password you put in the connection string, with **SQL Login** as the authentication type, and leave the database blank. Say yes if it asks about trusting the server's certificate.

**You should get your server in the Connections list, and you can expand it.** There is no database of yours under it yet. Task 3 makes it.

> [!CAUTION]
> **If this step fails, get help now.** It is much better to find out here than at Task 3. The commonest causes are a wrong server name, a wrong password, and a certificate prompt that got dismissed.

**Run my checks:**

```bash
dotnet test week-10/Lab.Checks
```

**1 / 5 — still.** Nothing the checks look at has changed yet.

**Commit it:**

```
week 10 lab: the packages, and somewhere for the password
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Read [what user secrets are not](../lecture-notes.md#what-user-secrets-are-not), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [user secrets, and a password outside the repo](../lecture-notes.md#user-secrets--a-password-outside-the-repo).

---

### Task 2 in full

**A cart with an `Id`, and a `DeskContext`.**

**Check:** `Check2_ACartIsShapedForATable`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-10/Caller.cs week-10/Lab/
```

Open `week-10/Lab/Caller.cs` and find the three things your instructor just changed so the database can keep a caller:

- **`public int Id { get; set; }`** at the top. A table needs one column that is unique, and EF Core looks for a property called `Id`.
- **`Name { get; private set; }`**. It was `{ get; }`. A property with only a `get` is left out of the table, and then the database has no name to hand back.
- **`[NotMapped]` on `Favorite`**. A favorite is a whole `Song`, and without `[NotMapped]` EF Core tries to make a table of songs too.

**Your `Song` needs only the first of those three.** Its properties already have setters, and nothing on it holds another class.

#### The `Id`

**Open `week-10/Lab/Song.cs`. Its `// TODO — Task 2` comment is near the top, inside the class** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:` finds it, one hit. **Add this line under it:**

```csharp
    public int Id { get; set; }
```

**You never set it.** A cart that has never been saved has `Id` 0, and the database fills in the real number when it saves the row.

#### The `DeskContext`

**A `DeskContext` is the desk's database in one class.** It says which tables the desk keeps, and where to find them. **Make a new file, `week-10/Lab/DeskContext.cs`.** Right-click `week-10/Lab` in the Explorer → **New File** → `DeskContext.cs`.

**Paste this in.** It is the same as your instructor's `DeskContext`, with one table so far:

```csharp
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

**Then add the one line that's yours: a second `DbSet`, for your songs.** Put it under the `Callers` line, with a blank line between. **The property's name is the table's name**, and the usual name is the class's, made plural: `DbSet<Song> Songs`.

- **`Callers` is your instructor's,** and it has to stay spelled exactly that way: `Switchboard.cs` reaches the table by that name.
- **The rest of the file says how to connect.** The two constructors are for the desk and for tests, and `OnConfiguring` reads your connection string out of the secret store. [The notes walk through each part](../lecture-notes.md#the-dbcontext).

<details>
<summary><b>Stuck? Show me the line</b></summary>

```csharp
    public DbSet<Song> Songs { get; set; }
```

</details>

**Run the desk: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Nothing on screen changed, and that is right.** The desk still uses the two files. You have described two tables; nothing has made them yet.

**Then mine:**

```bash
dotnet test week-10/Lab.Checks
```

**2 / 5 — checks 1 and 2.**

**Commit it:**

```
week 10 lab: a cart with an Id, and a DeskContext
```

📖 *Further reading:* [a class becomes a table](../lecture-notes.md#a-class-becomes-a-table) · [the `DbContext`](../lecture-notes.md#the-dbcontext).

---

### Task 3 in full

**The instructions that make the tables, and then the tables.**

**Check:** `Check3_ThereIsAMigration`

**A migration is a C# file that `dotnet-ef` writes for you.** It holds the instructions for making your tables, worked out from your `DeskContext`.

**1 — Write it:**

```bash
dotnet ef migrations add TheDeskMovesIn --project week-10/Lab
```

```
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
```

**2 — Read it.** Open `week-10/Lab/Migrations/` and the file whose name ends `_TheDeskMovesIn.cs` (not the `.Designer.cs` one). Find `Up()`. **It makes two tables, `Callers` and `Songs`,** and under `Songs` is your `Song` class with the column types filled in:

```csharp
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Artist = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seconds = table.Column<int>(type: "int", nullable: false),
                    PlaysTonight = table.Column<int>(type: "int", nullable: false)
```

**Five columns, and no `Length`, `Kind` or `Cue`.** Those three are worked out from the others and have only a `get`, so EF Core leaves them out without being told. `Identity` on `Id` is the database numbering the rows itself.

> [!IMPORTANT]
> **Nothing has touched the server yet.** `migrations add` connects to nothing. It reads your classes and writes a file. **The next command is the one that talks to the server.**

**3 — Carry it out:**

```bash
dotnet ef database update --project week-10/Lab
```

```
Build started...
Build succeeded.
Acquiring an exclusive lock for migration application. See https://aka.ms/efcore-docs-migrations-lock for more information if this takes too long.
Applying migration '20261023163353_TheDeskMovesIn'.
Done.
```

The number on the front of yours is the date and time you wrote it. **It creates your database, because you don't have one yet, and then the two tables.**

**4 — Look at them.** In the **SQL Server** view, right-click your connection → **Refresh**, then open **Databases** → yours → **Tables**:

```
dbo.__EFMigrationsHistory
dbo.Callers
dbo.Songs
```

`__EFMigrationsHistory` is EF Core's own list of which migrations this database has had. Right-click **`dbo.Songs`** → **Select Top 1000**. **Empty.** The table exists, and nothing has written to it.

**Then mine:**

```bash
dotnet test week-10/Lab.Checks
```

**3 / 5 — checks 1, 2 and 3.**

> [!WARNING]
> **My check 3 can't see whether you ran `database update`.** It looks for the migration in your project, and that is all. Only the SQL Server view, or the desk in Task 4, can tell you the tables exist.

**Commit it:**

```
week 10 lab: the migration, and the tables
```

> [!NOTE]
> **In class, stop here.** Task 4 comes after the next part of the demo. Finished early? Read `Down()` in the same migration file and say what it would undo, or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [migrations — `add`, then `update`](../lecture-notes.md#migrations--add-then-update).

---

### Task 4 in full

**The rotation saves to the database and loads from it.**

**Check:** `Check4_TheCartsSurviveARestart`

**First, bring in your instructor's code.** Pull, then copy three files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-10/Switchboard.cs week-10/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-10/Caller.cs week-10/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-10/SwitchboardTests.cs week-10/Lab.Tests/
```

**Now build:**

```bash
dotnet build week-10/Lab
```

```
week-10/Lab/Program.cs(100,18): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
week-10/Lab/Program.cs(170,18): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
```

**Two errors, and both are the switchboard's.** Your instructor's `Save` and `Load` take a `DeskContext` now, and `Program.cs` still hands them a file name. **Make the same three edits your instructor just made, in `Lab/Program.cs`:**

- Find `string switchboardFile = "week-10/switchboard.json";` and make that line read `DeskContext db = new DeskContext();`. **That is the one `DeskContext` the whole shift uses.** Making it connects to nothing; `Load` is the first thing that asks the server a question.
- Find `switchboard.Load(switchboardFile);` and make it read `switchboard.Load(db);`.
- Find `switchboard.Save(switchboardFile);` and make it read `switchboard.Save(db);`.

```bash
dotnet build week-10/Lab
```

**0 errors.** The switchboard is in the database now, and the rotation is still in its file.

#### `Save` and `Load`, for the rotation

**Open `week-10/Lab/Rotation.cs` and find its `// TODO — Task 4` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 4:`, one hit. Replace `Save(string path)` and `Load(string path)` with two that take the database. **Select from `public void Save(string path)` down to and including the `}` that closes `Load`**, and write the two new ones there. Read your instructor's in `Switchboard.cs` first; yours are the same, with carts.

- **`public void Save(DeskContext db)`**: for each song, **`db.Songs.Add(song)`** marks it to go into the table. After the loop, **`db.SaveChanges()`** sends everything to the server in one go. Without `SaveChanges()`, nothing arrives and nothing complains.
- **`public void Load(DeskContext db)`**: read the table into a list with **`db.Songs.OrderBy(song => song.Id).ToList()`**. A table keeps no order of its own, so `OrderBy` on `Id` hands the carts back in the order they first went in.
- ⚠️ **Then the first night.** The old `Load` returned early when there was no file. The table is always there now, but the first time it is **empty**. So if the list has no carts in it, `return` before you touch anything. Otherwise `_songs.Clear()`, then `_songs.AddRange(loaded)`.
- **Delete `using System.Text.Json;`** at the top of the file. Nothing in `Rotation.cs` uses it now.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public void Save(DeskContext db)
    {
        foreach (Song song in _songs)
        {
            db.Songs.Add(song);
        }

        db.SaveChanges();
    }

    public void Load(DeskContext db)
    {
        List<Song> loaded = db.Songs.OrderBy(song => song.Id).ToList();

        if (loaded.Count == 0)
        {
            return;
        }

        _songs.Clear();

        _songs.AddRange(loaded);
    }
```

</details>

```bash
dotnet build week-10/Lab
```

```
week-10/Lab/Program.cs(73,15): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
week-10/Lab/Program.cs(172,15): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
```

**The same two errors, on the rotation's two lines.** In `Lab/Program.cs`:

- Find `string rotationFile = "week-10/rotation.json";` and **delete that line**. The `db` directly above it is for the rotation too.
- Find `rotation.Load(rotationFile);` and make it read `rotation.Load(db);`.
- Find `rotation.Save(rotationFile);` and make it read `rotation.Save(db);`.

**And one tidy-up in `Lab/Song.cs`.** There is no file to read back from any more, so `[JsonInclude]` has nothing to do. Delete the `[JsonInclude]` line above `PlaysTonight`, the comment line above that, and `using System.Text.Json.Serialization;` at the top. **EF Core fills in a property with a `private set` without being told.**

```bash
dotnet build week-10/Lab
```

**0 errors, 0 warnings.**

#### Your two facts that used a file

**Run your suite:**

```bash
dotnet test week-10/Lab.Tests
```

```
week-10/Lab.Tests/DeskTests.cs(38,23): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
week-10/Lab.Tests/DeskTests.cs(58,23): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
week-10/Lab.Tests/DeskTests.cs(63,23): error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'
week-10/Lab.Tests/SwitchboardTests.cs(13,14): error CS1061: 'DbContextOptionsBuilder<DeskContext>' does not contain a definition for 'UseInMemoryDatabase'
```

**Three errors are yours and one is your instructor's.** `AFirstNightKeepsItsCarts` and `ACartRemembersItsPlays` still hand `Load` and `Save` a file path. The `CS1061` means your test project hasn't got the package that keeps rows inside a test run. Add it:

```bash
dotnet add week-10/Lab.Tests package Microsoft.EntityFrameworkCore.InMemory --version 10.0.13
```

**Then move your two facts off the file, in `Lab.Tests/DeskTests.cs`.** Your instructor's `ACallerRemembersTheirCalls` in `SwitchboardTests.cs` is already done; copy its moves:

- **At the top of the file**, `using Microsoft.EntityFrameworkCore;` above `namespace Lab.Tests;`.
- **In each fact, the two lines that make a scratch file** (`string path = …` and `File.Delete(path);`) **become the three lines below.** They make a table with a new name every time, so no fact can see another fact's rows.
- **Wherever a fact hands over `path`**, hand over `new DeskContext(options)` instead: `rotation.Load(new DeskContext(options));`, `rotation.Save(new DeskContext(options));`, `reopened.Load(new DeskContext(options));`.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

The three lines that replace the two `path` lines, in both facts:

```csharp
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
```

</details>

```bash
dotnet test week-10/Lab.Tests
```

**7 passed.** `ACartRemembersItsPlays` saves a cart that aired twice into one context and reads it back through another, so it goes red if `Save` forgets `SaveChanges()`. **It can't catch everything:** a `Load` that forgets `Clear()` still passes it. Only the desk shows that one, as six carts — the second item of [Now try to break it](#now-try-to-break-it).

#### Now run the desk, twice

**If `week-10/rotation.json` and `week-10/switchboard.json` are there, delete them** from the Explorer. Nothing reads them now.

**Run it: DJ name, then `a` to air the hour, then `q`.**

```bash
dotnet run --project week-10/Lab
```

```
KDXR - that's the shift. 3 on the switchboard, 6 in the hour.
```

**Look in `week-10/`.** Three folders, `Lab`, `Lab.Checks` and `Lab.Tests`, and **no `.json` file at all**. Now the SQL Server view: right-click **`dbo.Songs`** → **Select Top 1000**:

```
Id|Title|Artist|Seconds|PlaysTonight
1|Nightjar|The Lamplighters|227|1
2|Slack Water|Marguerite Vance|252|1
3|Long Way Round|The Ferrymen|331|1
```

**Three rows, one play each, and the `Id` filled in by the database.** You are reading that from the server, with the desk shut.

**Run it again: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │
```

**The plays came back out of the database.** Then you pressed `q`:

```
Unhandled exception. Microsoft.EntityFrameworkCore.DbUpdateException: An error occurred while saving the entity changes. See the inner exception for details.
 ---> Microsoft.Data.SqlClient.SqlException (0x80131904): Cannot insert explicit value for identity column in table 'Callers' when IDENTITY_INSERT is set to OFF.
```

**That is the switchboard, crashing on the way out.** Its callers came out of the table carrying their `Id`, and its `Save` tried to `Add` them a second time. **Your rotation's `Save` has the same problem.** Your instructor fixes the switchboard in the next part of the demo, and Task 5 is the same fix on yours.

**Then mine:**

```bash
dotnet test week-10/Lab.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.** Check 5 is that same crash, waiting in your rotation.

**Commit it:**

```
week 10 lab: the rotation moves into the database
```

> [!NOTE]
> **In class, stop here.** Task 5 comes after the next part of the demo. Finished early? Try the first item of [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [`Save` — `Add`, then `SaveChanges`](../lecture-notes.md#save--add-then-savechanges) · [`Load`, and the first night](../lecture-notes.md#load-and-the-first-night) · [testing without a database](../lecture-notes.md#testing-without-a-database).

---

### Task 5 in full

**A fact first, then a cart that is already in the table gets changed, not added again.**

**Check:** `Check5_ASecondSaveUpdatesTheRows`

**First, bring in your instructor's code.** Pull, then copy two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-10/Switchboard.cs week-10/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-10/SecondSaveTests.cs week-10/Lab.Tests/
```

Open `Switchboard.cs` and look at `Save`: a caller with `Id` 0 is added, and any other caller is **updated**. `SecondSaveTests.cs` is your instructor's fact about it.

```bash
dotnet test week-10/Lab.Tests
```

**8 passed** — your four, and your instructor's four.

**Now see your rotation's problem.** Run the desk: DJ name, then `t`, then `a`, then `q`.

```bash
dotnet run --project week-10/Lab
```

```
 ---> Microsoft.Data.SqlClient.SqlException (0x80131904): Cannot insert explicit value for identity column in table 'Songs' when IDENTITY_INSERT is set to OFF.
```

**It got further this time.** The switchboard saved, and then your rotation crashed, on table `Songs`. **Every cart came out of the table carrying its `Id`, and `Save` tried to `Add` each one a second time.**

#### First, the fact — before you touch `Save`

**Write it in `week-10/Lab.Tests/DeskTests.cs`, under its `// TODO — Task 5` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 5:`, one hit. It is your instructor's `ACallerWhoRingsAgainIsStillOneRow`, with a cart. The same three moves as every fact:

- **Set the scene.** The three `options` lines from Task 4. A `Rotation` with one `Song` in it, saved with `rotation.Save(new DeskContext(options))`.
- **Do the thing: the next night.** One `DeskContext db = new DeskContext(options);`, used for both halves the way the desk uses one for a whole shift. A second rotation, `nextNight`, loads from `db`, plays its cart once (`nextNight.All()[0].Play();`), and saves back to `db`.
- **Check the answer** in a third rotation, `reopened`, loaded from a fresh `new DeskContext(options)`: `Assert.Equal(1, reopened.Count)`, and the cart's `PlaysTonight` is 1. **Assert on `reopened`, never on the rotation that saved.**
- Name the fact after the rule it proves. Mine is `ACartAiredAgainIsStillOneRow`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void ACartAiredAgainIsStillOneRow()
    {
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Rotation rotation = new Rotation();
        rotation.Add(new Song("Nightjar", "The Lamplighters", 227));
        rotation.Save(new DeskContext(options));

        DeskContext db = new DeskContext(options);
        Rotation nextNight = new Rotation();
        nextNight.Load(db);
        nextNight.All()[0].Play();
        nextNight.Save(db);

        Rotation reopened = new Rotation();
        reopened.Load(new DeskContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Equal(1, reopened.All()[0].PlaysTonight);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test week-10/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.ACartAiredAgainIsStillOneRow
  Error Message:
   System.ArgumentException : An item with the same key has already been added. Key: 1
```

**Red, and it is the same mistake as the crash.** The table inside the test words it differently: *the same key* means the same `Id`, twice.

#### Now the fix

**In `Lab/Rotation.cs`, in `Save`.** Replace the one line `db.Songs.Add(song);` with an `if`/`else`:

- **`if (song.Id == 0)`**: the cart has never been saved, so **`db.Songs.Add(song)`**.
- **`else`**: the table already has its row, so **`db.Songs.Update(song)`** changes that row.
- `db.SaveChanges()` stays where it is, after the loop.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
            if (song.Id == 0)
            {
                db.Songs.Add(song);
            }
            else
            {
                db.Songs.Update(song);
            }
```

</details>

```bash
dotnet test week-10/Lab.Tests
```

**9 passed.** Then run the desk: DJ name, `a`, `q`.

```bash
dotnet run --project week-10/Lab
```

```
KDXR - that's the shift. 3 on the switchboard, 6 in the hour.
```

**No crash.** Run it once more: DJ name, `t`, `q`.

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 3      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 3      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 3      │
```

**Three plays each.** One from Task 4, one from the run that crashed, and one from this one. *(The crashed run still kept its play: the switchboard's `SaveChanges()` went first, and it sent everything the desk's database was holding, carts included. If you've pressed `a` a different number of times, your number is different. What matters is that it went up and nothing crashed.)*

**Then mine:**

```bash
dotnet test week-10/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift:**

```
week 10 lab: a second save changes the rows
```

**Five commits after the starter, five green checks, nine facts, and a rotation that lives on a machine that isn't yours.**

> [!NOTE]
> **In class, stop here.** If your lab is done, [start the homework](../homework.md#part-1--catch-up-branch-and-bring-in-this-weeks-checks): it's this lab again, on your own project. Do Part 1 and Task 1 and push your branch before you leave, while your instructor is in the room to help with your login. [Now try to break it](#now-try-to-break-it) and [⭐ Done early?](#-done-early) are there if you want more. Working at home? Carry straight on.

📖 *Further reading:* [the second save — `Add` or `Update`](../lecture-notes.md#the-second-save--add-or-update).

---

## Now try to break it

```bash
dotnet run --project week-10/Lab
```

- **Take `db.SaveChanges();` out of `Rotation.Save`.** Air the hour, quit, and look at `dbo.Songs`: **the plays still went up.** The switchboard saves first, and its `SaveChanges()` sends every change the desk's database is holding, carts included. Now run my checks. Check 4 is red: *"Three carts were saved and the table holds 0."* A cart that had never been saved would never reach the table. Put it back.
- **Take `_songs.Clear();` out of `Load`**, run the desk, and press `t`: `6 carts loaded.` Then quit. ⚠️ **Six rows are now saved.** Put the `Clear()` back, then empty the table: in the SQL Server view, right-click your database → **New Query**, type `DELETE FROM Songs;` and run it.
- **Take the `if (loaded.Count == 0)` block out of `Load`**, empty the table the same way, and run the desk:

  ```
  Unhandled exception. System.ArgumentOutOfRangeException: Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')
  ```

  That is the first night. `Load` threw away the three carts `Program.cs` had just added, and the hour reached for a cart that wasn't there. **Only a first-time user ever sees it.** Put the block back and run the desk: the carts are back, and in `dbo.Songs` their `Id`s don't start at 1 again. The database never reuses a number.
- **Turn your wifi off and run `dotnet test week-10/Lab.Checks`.** All five pass. **Now run the desk.** That is the difference between what my checks prove and what they don't.
- **Type `nightjar` at the `f` prompt**, with a small n. `No cart called "nightjar" in the rotation.` Now ask the database the same question: **New Query**, `SELECT Title FROM Songs WHERE Title = 'nightjar';`. [Hold that thought](#-done-early).

## ⭐ Done early?

None of these has a check.

1. ⭐ **The same question, two answers.** C# says no cart is called `nightjar`. Run `SELECT Title FROM Songs WHERE Title = 'nightjar';` in a New Query:

   ```
   Title
   -----
   Nightjar
   ```

   **The database found it.** `==` in C# compares every letter exactly, capitals included. This server's comparison ignores capitals. [The notes say why](../lecture-notes.md#the-same-name-twice), and the demo's last beat shows the same thing with a caller.
2. **Ask the table something the desk can't.** New Query: `SELECT Title, PlaysTonight FROM Songs ORDER BY PlaysTonight DESC;` That is week 9's `OrderByDescending`, written in SQL.
3. **Read `Down()`.** It is in the same migration file as `Up()`. Say what it would do to your database if it ran.
4. **Change a row behind the desk's back.** New Query: `UPDATE Songs SET Title = 'Nightjar (live)' WHERE Id = 1;` Then run the desk and press `t`. The desk is reading what somebody else wrote. *(Change it back the same way.)*

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-10/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-10/Lab.Checks`. |
| `warning NU1902` / `warning NU1903` on `System.Security.Cryptography.Pkcs` | Task 1b's first package isn't in. Run its `dotnet add`, the `System.Security.Cryptography.Pkcs` one. |
| `dotnet ef` : command not found | Task 1a. If it's installed and still not found, close and reopen the terminal. |
| `The Entity Framework tools version '10.0.12' is older than that of the runtime '10.0.13'` | Your `dotnet-ef` is older than the packages. `dotnet tool update --global dotnet-ef`. |
| `Could not find the global property 'UserSecretsId'` | Task 1c's `init` never ran on this project. |
| `No secrets configured for this application.` | `init` ran and `set` didn't — or this is a lab PC that rebooted. [Run the `set` again.](../lecture-notes.md#a-lab-pc-that-rebooted) |
| `The ConnectionString property has not been initialized.` | The desk found no connection string. **`dotnet user-secrets list --project week-10/Lab` says which of the two rows above it is.** |
| `An exception has been raised that is likely due to a transient failure` … `Cannot open database "DB_…" requested by the login` | The database isn't made yet. Task 3's `dotnet ef database update`. If you've run it, check the database name in your connection string is the one you made. |
| `Login failed for user` | Wrong login or password in the connection string. Run Task 1c's `set` again; `set` replaces. |
| `A network-related or instance-specific error…` | Wrong `Server=`, or you're on a network that can't reach the college's server. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing from the end of the connection string. |
| Your password has a `$` in it and the connection string goes wrong | The shell is reading the `$`. Put the connection string in **single** quotes instead of double. |
| `Invalid object name 'Songs'` | The database is there and the table isn't. You wrote the migration and never ran `dotnet ef database update`. |
| `Unable to create a 'DbContext' of type 'DeskContext'` … `Cannot bind 'name' in 'Caller(string name)'` | You're on the starter's `Caller.cs`. Task 2 starts by copying your instructor's in. |
| `Unable to create a 'DbContext'` … `The entity type 'Song' requires a primary key` | `Song` has no `Id`. Task 2's one line. |
| `Unable to create a 'DbContext' of type 'DeskContext'` with nothing about a type | `dotnet ef` couldn't make your context. It needs the constructor that takes **nothing** — check it's still there. |
| Check 3 red: *Your migration makes no Songs table* | You wrote the migration before `DeskContext` had `Songs` in it. `dotnet ef migrations add TheSongsMoveIn --project week-10/Lab`, then `database update`. |
| `error CS1503: Argument 1: cannot convert from 'string' to 'DeskContext'` | Something still hands `Save` or `Load` a file name. The error's line number says where. |
| `error CS1061` … `UseInMemoryDatabase` | `Lab.Tests` hasn't got the InMemory package. Task 4's `dotnet add`. |
| `Cannot insert explicit value for identity column in table 'Songs'` | `Save` adds a cart that came out of the table. That's Task 5. |
| `Cannot insert explicit value for identity column in table 'Callers'` | Your `Switchboard.cs` is the Task 4 one. Copy Task 5's in. |
| `ArgumentException : An item with the same key has already been added` | The same mistake as the row above, in a test. `Add` where `Update` belongs. |
| Check 4 red: *Three carts were saved and the table holds 0* | No `db.SaveChanges()` at the end of `Save`. |
| The rotation has **six** carts | `Load` lost its `Clear()`. Fix it, then `DELETE FROM Songs;` — six rows got saved. |
| `ArgumentOutOfRangeException` the first time you run the desk | `Load` cleared the carts and the table was empty. The `if (loaded.Count == 0)` block. |
| The SQL Server view shows no databases, or no tables | Right-click your connection → **Refresh**. It doesn't refresh on its own. |
| My checks pass and the desk can't connect | **That is exactly right.** My checks never touch the server. Only the desk tests your connection string. |
| Red squiggles under `DbSet` or `[Fact]`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 10 lab: the rotation moves into the database"
> ```

**Prev:** [Week 9 Lab — The Night's Numbers](../../week-09/lab/) · **Next:** [Week 10 Homework — The Registry Moves In](../homework.md)
