# Week 12 Lab — Every Cart Has a Log 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the whole night lives in a database on the college's SQL Server: the callers in one table, the carts in another.

Every cart knows **how many times** it has been on air. **It can't say when.** Tonight each cart gets a log of its own — a row for every time it goes out — in a second table that belongs to the first.

Your job: give a cart a list of its airings, make the table that holds them, bring them back with their cart, and then ask the database a question about them and read the SQL it sends. Your instructor does the same to the switchboard, a piece at a time, just before you do it to the rotation.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all four checks green, and a `LAST ON AIR` time on every cart.**

> [!IMPORTANT]
> **Task 1 starts the week with a fresh database.** It drops the one you have and makes it again, with your new table in it. That is on purpose: everybody's desk starts from the same three carts tonight.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the ones the tasks name. If you missed last week, Task 1 has a box for your connection string.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch each **caller** get a table of requests, then copy those finished files into your project. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, all of them finished, and the copy commands work the same.

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
cp -r ../dotnet-db-starters/week-12 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-12` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-12`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — three projects again, same as last week:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-12/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — Song.cs and Rotation.cs have tonight's work in them
   ├─ Lab.Tests/           ← YOURS — eleven facts ship written; you add one tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-12` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight each cart gets many airings, and the homework gives each of your records many of something of your own.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-12/Lab.Checks
```

**1 / 4 passing.** Check 1 is everything the desk already does, database included, and it stays green all night. **The three red ones are tonight's tasks** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 12: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-12/Lab.Checks`, `dotnet test week-12/Lab.Tests` and `dotnet run --project week-12/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-12/Lab` | the desk | what any of it looks like on the air — **and the only thing that proves your airings are in your database** |
| `dotnet test week-12/Lab.Checks` | mine | *can the desk do it?* — 1, then 2 at Task 1, 3 at Task 2, 4 at Task 3 |
| `dotnet test week-12/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 11 facts, 12 at Task 2, then 13 |

| File | What it is |
|---|---|
| `Lab/Airing.cs` | **Yours, new tonight.** One time a cart went out on air. Task 1 |
| `Lab/Song.cs` | **Yours.** A list of airings, and `Play()` adds to it, in Task 1 |
| `Lab/DeskContext.cs` | **Yours.** Two tables in Task 1, and the log in Task 3 |
| `Lab/Rotation.cs` | **Yours.** `Load` in Task 2, and `Aired` in Task 3 |
| `Lab.Tests/DeskTests.cs` | **Yours.** You write one fact in it in Task 2 |
| `Lab/Program.cs` | Ships finished. **Nothing in it changes tonight.** It saves the moment something changes, and once more when you quit |
| `Lab/Caller.cs`, `Lab/Request.cs`, `Lab/Switchboard.cs` | **Your instructor's.** You copy the finished files in at each task and read them as you work. You never edit them |
| `Lab.Tests/RequestTests.cs` | **Your instructor's fact**, copied in at Task 2 |
| `Lab.Checks/DeskChecks.cs` | My four. **Read-only, as always.** |

> [!IMPORTANT]
> **My checks never touch the college's server.** They hand your `DeskContext` a table that lives inside the test run, so they pass with the wifi off. **That is why every task runs the desk as well.** Green checks say your code is right. Only the desk says what's in your *database*.

## The tasks

**The rhythm is the same every time:** run the desk and *look* → write the code → run the desk again and *see the difference* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole thing is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | `ACartHasManyAirings` | An `Airing` class, a list of them on `Song`, and the table that holds them. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheAiringsComeBack` | A fact first, then `Load` brings each cart's airings back with it. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheDatabaseAnswers` | The log on, then `Aired`, a question the database answers. **[Task 3 in full ↓](#task-3-in-full)** |

---

### Task 1 in full

**An `Airing` class, a list of them on `Song`, and the table that holds them.**

**Check:** `Check2_ACartHasManyAirings`

**First, bring in your instructor's code.** Pull the starters clone, then copy two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-12/Caller.cs week-12/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-12/Request.cs week-12/Lab/
```

Open `week-12/Lab/Request.cs`: an `Id`, a **`CallerId`** that holds the `Id` of the caller who made it, a `Title` and an `At`. Then `week-12/Lab/Caller.cs`: a caller holds **`List<Request> Requests`**, and `Asks` adds one to it. **A cart is about to get the same shape.**

> [!IMPORTANT]
> **Copy those two files before you make your migration in 1d.** Your migration makes a table for every class your desk now knows about, and `Request` is one of them.

#### 1a — the `Airing` class

**In the Explorer, right-click `week-12/Lab` → New File → `Airing.cs`.** One airing is one time a cart went out on air. It needs:

- **`public int Id { get; set; }`** — its own row's number, like every table.
- **`public int SongId { get; set; }`** — the `Id` of the cart it belongs to. This column is what ties an airing to its cart.
- **`public DateTime At { get; private set; }`** — when it went out.
- A constructor **`public Airing(DateTime at)`** that sets `At`.

⚠️ **Not `Play`.** `Song` already has a method called `Play()`, and inside `Song` that name means the method, not a class.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
// One time a cart went out on air.

public class Airing
{
    // The database's own number for this airing's row.
    public int Id { get; set; }

    // Which cart it was: the Id of that cart's row in Songs.
    public int SongId { get; set; }

    public DateTime At { get; private set; }

    public Airing(DateTime at)
    {
        At = at;
    }
}
```

</details>

#### 1b — a cart has many airings

**Open `week-12/Lab/Song.cs`. Its `// TODO — Task 1` comment sits where the list goes** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 1:` finds it, one hit. Replace the comment with the list, and give `Play()` one more line:

- **`public List<Airing> Airings { get; private set; } = new List<Airing>();`** — the cart's airings, starting empty. Your instructor's `Requests` has the same shape.
- In **`Play()`**, after `PlaysTonight++;`: **`Airings.Add(new Airing(DateTime.Now));`** — every time the cart goes out, a new airing goes on its list.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public List<Airing> Airings { get; private set; } = new List<Airing>();

    public void Play()
    {
        PlaysTonight++;
        Airings.Add(new Airing(DateTime.Now));
    }
```

</details>

**Then the carts screen.** `LastAired()`, just under `Play()`, is what the `t` key shows in its new **LAST ON AIR** column. It's screen code, so here it is whole. Paste it over the `LastAired` method that's there:

```csharp
    public string LastAired()
    {
        Airing? newest = Airings.MaxBy(airing => airing.At);

        if (newest == null)
        {
            return "-";
        }

        return newest.At.ToString("HH:mm");
    }
```

`MaxBy` picks the airing with the latest time, and `"HH:mm"` writes it as hours and minutes.

#### 1c — two tables

**Open `week-12/Lab/DeskContext.cs`. Its `// TODO — Task 1` comment sits under the `Songs` line** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 1:`, one hit. Replace the comment with two lines: one for your instructor's requests, and one for your airings.

```csharp
    public DbSet<Request> Requests { get; set; }

    public DbSet<Airing> Airings { get; set; }
```

**Every table at the desk is named after its `DbSet`.** Leave one out and the table still gets made, but it's called `Request` or `Airing`.

#### 1d — the migration

```bash
dotnet ef migrations add RequestsAndAirings --project week-12/Lab
```

```
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
```

**Open the new file in `week-12/Lab/Migrations`, the one whose name ends `_RequestsAndAirings.cs`.** It makes **two** tables:

- **`Airings`**, with a `SongId` column and a `ForeignKey` that says every `SongId` must be the `Id` of a row in `Songs`.
- **`Requests`**, with a `CallerId` column, the same way. Your instructor's `Caller.cs` asked for it, and `migrations add` compares the **whole** desk with the last migration, not one file.

`onDelete: ReferentialAction.Cascade` on each means: **when a cart's row comes out, its airings come out with it.**

#### 1e — a fresh database

**Drop the database, then make it again from this week's migrations.** Two commands, in this order:

```bash
dotnet ef database drop --force --project week-12/Lab
```

```
Dropping database 'DB_KDXR_156101411_YOURINITIALS' on server 'YOUR-SERVER'.
Successfully dropped database 'DB_KDXR_156101411_YOURINITIALS'.
```

**`--force` means don't ask "are you sure?"** It is your lab database, and nothing in it is worth keeping. *Missed last week?* Then it may say `did not exist, no action was taken`, and that's fine.

```bash
dotnet ef database update --project week-12/Lab
```

```
Applying migration '20261023163353_TheDeskMovesIn'.
Applying migration '20261024211804_RequestsAndAirings'.
Done.
```

*(Your second migration has its own date and time in its name.)* **Two migrations, in order:** the one that ships in the starter makes `Callers` and `Songs`, and yours adds `Airings` and `Requests`.

<details>
<summary><b>The <code>update</code> said <code>The ConnectionString property has not been initialized</code> or <code>Login failed</code>?</b> Your connection string isn't set for this week. It was set in week 11.</summary>

This week's `Lab.csproj` carries the same `UserSecretsId` as last week's, so if you set your connection string in week 11 on this machine, it's already there. **Missed last week, or on a lab PC that rebooted?** Set it once. Swap all four `YOUR-…` parts. The server name is in Canvas; the login and password are your college SQL account.

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-12/Lab
```

Then run the `drop` and the `update` again.

</details>

#### 1f — the first night

**Run the desk: DJ name, then `a`, then `t`, then `q`.** `a` puts the hour on air, and `t` shows the carts.

```bash
dotnet run --project week-12/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │ 04:18       │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │ 04:18       │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │ 04:18       │
3 carts loaded.
```

**Every cart went out once, and LAST ON AIR says when.** Your times are your own clock's. In the **SQL Server** view, right-click your connection → **Refresh** → Databases → yours → Tables: `dbo.Airings` is there. Right-click it → **Select Top 1000**: three rows, with `SongId` 1, 2 and 3. **Each row says which cart it belongs to.**

**Run my checks:**

```bash
dotnet test week-12/Lab.Checks
```

**2 / 4 — checks 1 and 2.**

**Commit it:**

```
week 12 lab: a cart has many airings
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Look at `dbo.Requests` in the SQL Server view — it's empty, because nobody has rung yet — then run the desk, press `r` and make a request, and look again. Working at home? Carry straight on.

📖 *Further reading:* [one record, many of something](../lecture-notes.md#one-record-many-of-something) · [reading a migration that adds a table](../lecture-notes.md#reading-a-migration-that-adds-a-table).

---

### Task 2 in full

**A fact first, then `Load` brings each cart's airings back with it.**

**Check:** `Check3_TheAiringsComeBack`

**First, bring in your instructor's code.** Pull, then copy two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-12/Switchboard.cs week-12/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-12/RequestTests.cs week-12/Lab.Tests/
```

Open `Switchboard.cs` and find **`Load`**: its first line reads the callers **`.Include(caller => caller.Requests)`**. `RequestTests.cs` is your instructor's fact about it.

```bash
dotnet test week-12/Lab.Tests
```

**12 passed** — your six, and your instructor's six.

**Now look at the desk.** Run it: DJ name, then `t`, then `q`.

```bash
dotnet run --project week-12/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │ -           │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │ -           │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │ -           │
3 carts loaded.
```

**PLAYED says 1, and LAST ON AIR says nothing.** The airings are in `dbo.Airings` — you looked at them in Task 1. **`Load` reads the `Songs` table and nothing else**, so every cart starts the night with an empty list.

#### First, the fact — before you touch `Load`

**Write it in `week-12/Lab.Tests/DeskTests.cs`, under its `// TODO — Task 2` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:`, one hit. It is your instructor's `ACallersRequestsComeBack`, with a cart:

- **Set the scene.** The three `options` lines every fact in this file starts with. A `Song` called Nightjar, played once with **`nightjar.Play()`**, in a `Rotation` saved with `rotation.Save(new DeskContext(options))`.
- **Do the thing:** a second rotation, `reopened`, loads from a fresh `new DeskContext(options)`.
- **Check the answer:** **`Assert.Single(reopened.Find("Nightjar")!.Airings)`** — `Single` says the list holds exactly one thing. **Assert on `reopened`, never on the rotation that saved.**
- Name the fact after the rule it proves. Mine is `ACartsAiringsComeBack`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void ACartsAiringsComeBack()
    {
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Song nightjar = new Song("Nightjar", "The Lamplighters", 227);
        nightjar.Play();

        Rotation rotation = new Rotation();
        rotation.Add(nightjar);
        rotation.Save(new DeskContext(options));

        Rotation reopened = new Rotation();
        reopened.Load(new DeskContext(options));

        Assert.Single(reopened.Find("Nightjar")!.Airings);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test week-12/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.ACartsAiringsComeBack
  Error Message:
   Assert.Single() Failure: The collection was empty
```

**Red, and it is the same thing you saw on the desk.** Nightjar went out once, and the next night its list is empty.

#### Now the fix

**In `week-12/Lab/Rotation.cs`, in `Load`.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:` finds the comment above `Load`, one hit. The first line inside `Load` reads the `Songs` table. Two edits:

- **Add `.Include(song => song.Airings)` right after `db.Songs`** in that line. `Include` tells EF Core to read each cart's airings at the same time and put them in the cart's list.
- **`Include` comes from EF Core**, so the file needs **`using Microsoft.EntityFrameworkCore;`** — put it on its own line, with a blank line under it, directly above `public class Rotation`.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
        List<Song> loaded = db.Songs.Include(song => song.Airings).OrderBy(song => song.Id).ToList();
```

</details>

```bash
dotnet test week-12/Lab.Tests
```

**13 passed.** Now the desk. Run it: DJ name, then `t`, then `q`.

```bash
dotnet run --project week-12/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │ 04:18       │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │ 04:18       │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │ 04:18       │
3 carts loaded.
```

**The times are back** — the same times Task 1 showed, because they're the same rows.

**Then mine:**

```bash
dotnet test week-12/Lab.Checks
```

**3 / 4 — checks 1, 2 and 3.**

**Commit it:**

```
week 12 lab: the airings come back
```

> [!NOTE]
> **In class, stop here.** Task 3 comes after the next part of the demo. Finished early? Press `a` again and then `t`: every LAST ON AIR moves to now, and PLAYED says 2. Working at home? Carry straight on.

📖 *Further reading:* [why the airings don't come back on their own](../lecture-notes.md#why-the-airings-dont-come-back-on-their-own).

---

### Task 3 in full

**The log on, then `Aired`, a question the database answers.**

**Check:** `Check4_TheDatabaseAnswers`

**First, bring in your instructor's code.** Pull, then copy one file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-12/Switchboard.cs week-12/Lab/
```

Open `Switchboard.cs` and find **`AskedFor`**: it starts from `db.Callers`, not from the switchboard's list, and ends in `ToList()`.

#### First, the log

**Open `week-12/Lab/DeskContext.cs`. Its `// TODO — Task 3` comment is the last thing in `OnConfiguring`** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3:`, one hit. Replace the comment with the line your instructor wrote:

```csharp
        options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
```

**It needs two using lines.** Put them directly under `using Microsoft.Extensions.Configuration;` at the top of the file:

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
```

**Run the desk: DJ name, then `n`, then `q`.** `n` shows the night's numbers.

```bash
dotnet run --project week-12/Lab
```

Before the hour table, the log prints two commands — your rotation's `Load`, and your instructor's:

```
SELECT [s].[Id], [s].[Artist], [s].[PlaysTonight], [s].[Seconds], [s].[Title], [a].[Id], [a].[At], [a].[SongId]
FROM [Songs] AS [s]
LEFT JOIN [Airings] AS [a] ON [s].[Id] = [a].[SongId]
ORDER BY [s].[Id]
```

**Your `Include` became a `LEFT JOIN`.** The database put each cart together with its airings and sent back one answer. On the `n` screen, the last line reads `been on air -`, and **no SQL prints for it**: `Aired` doesn't ask anything yet. When you quit, the log fills up again with `Save`'s updates.

#### Then the question

**In `week-12/Lab/Rotation.cs`, `Aired` sits under its `// TODO — Task 3` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3:`, one hit. It hands back an empty list. Make it hand back **the titles of the carts that have been on air, in order by title, asked of the database** — your instructor's `AskedFor` is the same shape:

- Start from **`db.Songs`** — the table, not `_songs`.
- **`.Where(song => song.Airings.Any())`** — keep the carts that have at least one airing.
- **`.OrderBy(song => song.Title)`**, then **`.Select(song => song.Title)`** — in order by title, and just the title.
- **`.ToList()`** on the end. **That is the moment the question is sent.**

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public List<string> Aired(DeskContext db)
    {
        return db.Songs
            .Where(song => song.Airings.Any())
            .OrderBy(song => song.Title)
            .Select(song => song.Title)
            .ToList();
    }
```

</details>

**Run the desk: DJ name, then `n`, then `q`.**

```bash
dotnet run --project week-12/Lab
```

```
SELECT [s].[Title]
FROM [Songs] AS [s]
WHERE EXISTS (
    SELECT 1
    FROM [Airings] AS [a]
    WHERE [s].[Id] = [a].[SongId])
ORDER BY [s].[Title]
  been on air          Long Way Round, Nightjar, Slack Water
```

**Read it against your LINQ:** `Where` became `WHERE`, `Any` became `EXISTS`, `OrderBy` became `ORDER BY`, and `Select` became the one column it sends back. **The database did the asking**, and sent back three titles.

**Then mine:**

```bash
dotnet test week-12/Lab.Checks
```

**4 / 4.**

**Commit the shift:**

```
week 12 lab: the database answers
```

**Three commits after the starter, four green checks, thirteen facts, and a desk whose carts each have a log of their own.**

> [!NOTE]
> **In class, stop here.** Finished early? Try [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? Carry straight on to [the homework](../homework.md).

📖 *Further reading:* [LINQ that runs as SQL](../lecture-notes.md#linq-that-runs-as-sql) · [ToList is the moment the question is sent](../lecture-notes.md#tolist-is-the-moment-the-question-is-sent) · [the log](../lecture-notes.md#the-log).

---

## Now try to break it

```bash
dotnet run --project week-12/Lab
```

- **Move `.ToList()` to the front:** `return db.Songs.ToList()` and the rest after it. Run the desk and press `n`. **The same three titles**, and the log shows a `SELECT` with no `WHERE` and no `Airings` in it: every cart came back, and your program did the asking. ⚠️ Then put it back: with `ToList()` first, `Aired` only works because `Load` already brought the airings in.
- **Take the `Include` back out of `Load`.** Check 3 goes red, and LAST ON AIR shows `-` again. Put it back.
- **Pull a cart that has been on air:** `p`, then `Slack Water`. The log shows a `DELETE FROM [Airings]` before the `DELETE FROM [Songs]`. Look at `dbo.Airings` in the SQL Server view: Slack Water's airings are gone with it. That's the `Cascade` in your migration.
- **Turn your wifi off and run `dotnet test week-12/Lab.Checks`.** All four pass. **Now run the desk.** That is the difference between what my checks prove and what they don't.

## ⭐ Done early?

None of these has a check.

1. ⭐ **Use your instructor's `f`.** `f`, then `Nightjar`: the desk says who has asked for it, and the log shows the question. Make a request first with `r` if nobody has.
2. **A second question for the database.** Write `NeverAired(DeskContext db)`: the titles of the carts with **no** airings. It is `Aired` with one `!`. Call it from the `n` screen in `Program.cs`, beside `been on air`, and read its SQL: `NOT EXISTS`.
3. **Count in the database.** `db.Airings.Count()` asks SQL Server to count the rows and send back one number. Print it on the `n` screen and read the log: `SELECT COUNT(*)`.
4. **Read the log at `q`.** Every `UPDATE` there is `Save`, sending a row back. [The notes say why there are so many](../lecture-notes.md#the-log).

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-12/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-12/Lab.Checks`. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that has never been built. Run `dotnet test week-12/Lab.Checks` once, then the `dotnet ef` command again. |
| `CS0246: The type or namespace name 'Request' could not be found` | You haven't copied your instructor's `Request.cs` in. Task 1's copy commands. |
| `CS0246` … `'Airing'` | `Airing.cs` isn't there yet, or the class inside it is spelled differently. Task 1a. |
| `CS0118` or a pile of errors naming `Play` | You called your class `Play`. Inside `Song` that name means the `Play()` method. Call it `Airing`. |
| `CS1061: 'DbSet<Song>' does not contain a definition for 'Include'` | `Rotation.cs` is missing `using Microsoft.EntityFrameworkCore;` at the top. |
| `Invalid object name 'Requests'` or `'Airings'` | Your database has no table by that name. Your migration was made before you copied the files in, or before you added the `DbSet`. Run `migrations add` again with a new name, then `database update`. |
| Your migration makes only one table | You copied your instructor's files after making it. Run `migrations add` again with a new name; it adds the other table. |
| `There is already an object named 'Callers' in the database.` | You ran `database update` without the `drop` first. Task 1e's two commands, in order. |
| `The ConnectionString property has not been initialized.` | Your connection string isn't set for this week's id. The box under Task 1e. |
| `Login failed for user` | Wrong login or password in the connection string. `dotnet user-secrets set` again; `set` replaces. |
| LAST ON AIR shows `-` after a restart | `Load` has no `Include` yet. That is Task 2. |
| `been on air` shows `-`, and no SQL prints for it | `Aired` still hands back the empty list, or asks `_songs` instead of `db.Songs`. |
| Check 2 red, naming a `DbSet` | `DeskContext` needs `public DbSet<Airing> Airings { get; set; }`. Task 1c. |
| Check 2 red: *No migration … knows about airings* | `migrations add` hasn't run since `Airing` existed. Task 1d. |
| Check 3 red: *🚧 blocked* | Check 2 first. |
| Check 4 red: *Aired handed back nothing* | `Aired` asks `_songs`. My check asks an EMPTY rotation, so only the table can answer. Start from `db.Songs`. |
| `Assert.Single() Failure: The collection was empty` in your fact | That is the red you want, before the fix. After the fix, check `Include` is in `Load`. |
| The screen fills with SQL every time you quit | That's the log, and it's right: `Save` sending its updates. |
| `dotnet ef database update` prints its SQL, some lines twice | The log is on, and `dotnet ef` uses your `DeskContext` too. It still works. |
| The SQL Server view doesn't show the new table | Right-click the connection → **Refresh**. The view doesn't refresh on its own. |
| My checks pass and the desk can't connect | **That is exactly right.** My checks never touch the server. Only the desk tests your connection string. |
| Red squiggles, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 12 lab: the database answers"
> ```

**Prev:** [Week 11 Lab — A Cart Comes Off](../../week-11/lab/) · **Next:** [Week 12 Homework — Each One Has Many](../homework.md)
