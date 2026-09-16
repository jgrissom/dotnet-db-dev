# Week 10 Lab — The Carts Leave the Building 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the rotation is a file. Three carts, and what each one has played tonight, sitting in `rotation.json` on whichever machine happens to be at the desk.

Tonight the carts move onto the college's SQL Server — **a machine that is not yours**, which is the half a file was never going to fix.

**Time:** ~50 minutes in class — **target tonight: all five checks green, and a rotation that remembers last night.**

> [!IMPORTANT]
> **You are going to make a real database tonight, on the college's server, with your own account.** **Setup step 5 proves your account works** and **Task 3 makes the database** — both deliberately early, so that if something is going to go wrong with your login or the network, it goes wrong while there is somebody in the room to ask.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the four blanks below, and nothing tonight depends on remembering last week's code.

## Setup

**Five steps**, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

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
   ├─ Lab/                 ← the desk — three of its files have work in them
   ├─ Lab.Tests/           ← YOURS, carried forward. One of its four is red tonight
   └─ Lab.Checks/          ← my checks — read-only
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-10` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

**5. Get the EF tool, and tell the desk where its database is.** This is the step that talks to the college's server, and it is here rather than later on purpose.

**5a. Install the tool** — once per machine, ever:

```bash
dotnet tool install --global dotnet-ef
```

> [!NOTE]
> **`tool 'dotnet-ef' is already installed`?** Good. Make it current instead: `dotnet tool update --global dotnet-ef`.

**5b. Turn on this project's secret store:**

```bash
dotnet user-secrets init --project week-10/Lab
```

That writes a `<UserSecretsId>` into `week-10/Lab/Lab.csproj`. [It is a folder name, not a secret](../lecture-notes.md#dotnet-user-secrets--the-four-commands) — it is meant to be committed.

> [!WARNING]
> **Skip this one and nothing complains.** Your connection string reads back as empty, silently — and you do not find out here. It surfaces at **Task 3**, as a connection error that looks like something else entirely.

**5c. Put your connection string in it.** **Swap all four `YOUR-…` parts for the real ones** — the server is on the board, the login and password are your college SQL account, and **the database name is yours to choose** and must not exist yet:

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-10/Lab
```

```
Successfully saved ConnectionStrings:Desk to the secret store.
```

> [!IMPORTANT]
> **`DB_KDXR_156101411_ABL` is the shape** — `DB_`, the app, the course number, your initials. [The `DB_` prefix is not decoration](../lecture-notes.md#naming-your-database): it is what stops your databases colliding with your own from another course.
>
> **`TrustServerCertificate=True` is not optional either.** Leave it off and the connection is refused outright. [Every field in that string is worth thirty seconds](../lecture-notes.md#the-connection-string-field-by-field) — you will be retyping it the first time a lab PC reboots.

**5d. Install the one database tool this course uses.** Extensions (<kbd>⇧⌘X</kbd> / <kbd>Ctrl⇧X</kbd>), search **`SQL Server (mssql)`** — publisher **Microsoft**, id `ms-mssql.mssql` — and **Install**.

> [!NOTE]
> **This is the first week anything in the course needs it**, so almost nobody will have it. It is the only database tool this course uses: no SSMS, no Azure Data Studio.

**5e. Prove your account actually works** — before you need it, and with somebody in the room.

Activity bar → **SQL Server** (<kbd>⌘⌥D</kbd> / <kbd>Ctrl+Alt+D</kbd>) → **Add Connection**. Give it the same server, login and password you just put in the connection string; leave the database blank. Say yes if it asks about trusting the certificate.

**You should get a server in the Connections list that you can expand.** There is no database of your own under it yet — Task 3 makes that.

> [!CAUTION]
> **This is the step to get help with if it fails**, and it is much better to find out now than at Task 3. [Every error it can give you is in the troubleshooting table](../lecture-notes.md#-troubleshooting); the commonest are a wrong server name, a wrong password, and a certificate prompt that got dismissed.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-10/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the desk already does, and its only job tonight is to still be green at the end.

**And your own suite, which does something new this week:**

```bash
dotnet test week-10/Lab.Tests
```

**3 passed, 1 failed.** That is not a mistake and it is not yours to be worried about. `ACartRemembersItsPlays` is the fact you wrote in week 8 — *a cart aired twice, saved and loaded, still says it aired twice* — and it has been rewritten to keep its rows somewhere other than a file. **Tasks 4 and 5 are what turn it green again.**

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 10: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-10/Lab.Checks` and `dotnet run --project week-10/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-10/Lab` | the desk | what any of it looks like on the air — **and the only thing that proves your database works** |
| `dotnet test week-10/Lab.Checks` | mine | *can the desk do it?* — climbs 1 → 5 as you build it |
| `dotnet test week-10/Lab.Tests` | **yours** | 3 of 4 now, 4 of 4 by the end |

| File | What it is |
|---|---|
| `Lab/Song.cs` | **Four `TODO — Task 2` marks.** A cart the database can keep |
| `Lab/DeskContext.cs` | **One `TODO — Task 2`.** The rest of it ships finished |
| `Lab/Rotation.cs` | **Two empty methods.** Tasks 4 and 5 |
| `Lab.Tests/DeskTests.cs` | **Yours.** One of its four facts is red until Task 5 |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always** |
| `Lab/Program.cs` | Shipped, finished, and **it already calls everything you are about to write** |

💡 **Tonight's whole vocabulary is [one page of notes](../lecture-notes.md#a-class-becomes-a-table)**, and the part people actually get stuck on is [what `SaveChanges()` is for](../lecture-notes.md#save--add-update-or-remove).

> [!IMPORTANT]
> **My checks never touch the college's server.** They will go green on a laptop with the wifi off, because [they hand the context a table that lives inside the test run](../lecture-notes.md#testing-database-code-without-a-database). **That is why every task below runs the desk as well** — green checks say your code is right; only the desk says your *database* is.

## The tasks

**The rhythm is the same all four times, and the order is the lesson:** run the desk and *look at the screen* → write the code → run the desk again and *see what changed* → run my checks (the count climbs). **Commit every time a check goes green** — each task hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green — and has to stay that way)* | **Nothing to write.** It is everything the desk did before tonight |
| 2 | `ACartIsShapedForATable` | A cart the database can keep. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `ThereIsAMigration` | The instructions that made your table. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheCartsGoIntoTheTable` | Write the rotation down. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `TheCartsComeBackOut` | And read it back. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 2 in full

**A cart the database can keep.**

**Check:** `Check2_ACartIsShapedForATable`

**First, look at what the desk has.** Start the shift, type a DJ name, and press `t`:

```bash
dotnet run --project week-10/Lab
```

```
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │
├────────────────┼──────────────────┼────────┼────────┤
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
╰────────────────┴──────────────────┴────────┴────────╯
3 carts loaded.
```

**Four columns on that screen, and only two of them are facts the cart KEEPS.** `LENGTH` is worked out from the seconds. Hold that thought for about a minute. Press `q`.

**1 — `Lab/Song.cs`, the Id.** The database needs one column that is different on every row. Add this at the top of the class, under the `TODO — Task 2` that asks for it:

```csharp
    public int Id { get; set; }
```

[Nothing at the station has one of these](../lecture-notes.md#id-and-why-the-database-wants-one) — you never set it, and the database fills it in.

**2 — `Lab/Song.cs`, the three that are not columns.** A table gets a column for everything the class can tell you, *including the things it works out*. Three of these are arithmetic rather than facts. Put `[NotMapped]` on each of `Length`, `Kind` and `Cue`:

```csharp
    [NotMapped]
    public string Length => Broadcast.Clock(Seconds);
```

and the same one line above `Kind` and above `Cue`. Then add the using at the top of the file:

```csharp
using System.ComponentModel.DataAnnotations.Schema;
```

⚠️ **The test is one question, and [the notes put it plainly](../lecture-notes.md#notmapped--the-things-a-class-works-out): is this something the cart KEEPS, or something it WORKS OUT?**

**3 — `Lab/Song.cs`, take `[JsonInclude]` off `PlaysTonight`.** Week 8 needed it, because the JSON serializer would write a `private set` property out and then refuse to read it back. **Find out whether EF Core needs telling.** (It does not — [it sets private setters the same way your class does](../lecture-notes.md#notmapped--the-things-a-class-works-out).) You can drop `using System.Text.Json.Serialization;` with it.

**4 — `Lab/DeskContext.cs`, one line.** The rest of the file ships finished; this is the line that turns a class into a table:

```csharp
    public DbSet<Song> Carts { get; set; }
```

[The name of the property is the name of the table](../lecture-notes.md#the-dbcontext), which is why it is `Carts`.

**Run the desk, DJ name, `t`, then `q`.** Nothing on screen should have changed at all:

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Right: identical.** You have described a table; nothing writes to one yet.

```bash
dotnet test week-10/Lab.Checks
```

**2 / 5 — checks 1 and 2.**

**Commit it:**

```
week 10 lab: a cart the database can keep
```

---

### Task 3 in full

**The instructions that made your table.**

**Check:** `Check3_ThereIsAMigration`

**You have described a table and there isn't one.** Nothing so far has written a single thing to the college's server.

**1 — Write the instructions:**

```bash
dotnet ef migrations add TheCartsMoveIn --project week-10/Lab
```

**2 — Read what it wrote.** Open `week-10/Lab/Migrations/`, the file ending `_TheCartsMoveIn.cs`, and find `Up()`. **This is the point of the task, not a formality:**

```csharp
    migrationBuilder.CreateTable(
        name: "Carts",
        columns: table => new
        {
            Id = table.Column<int>(type: "int", nullable: false)
                .Annotation("SqlServer:Identity", "1, 1"),
            Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
```

**That is your `Song` class with the column types filled in.** Count the columns. ⚠️ **There should be no `Length`, no `Kind` and no `Cue`** — if there are, Task 2's `[NotMapped]`s did not land, and [check 2 will say so](../lecture-notes.md#notmapped--the-things-a-class-works-out).

**3 — Now carry them out.** This is the command that talks to the server, and the first one tonight that does:

```bash
dotnet ef database update --project week-10/Lab
```

It **creates the database**, because you do not have one yet, and then it makes the table.

> [!TIP]
> **Look at it.** In the **SQL Server** view, right-click your connection → **Refresh** → Databases. Yours is there now, with a `Carts` table under it and nothing in it.

**Run the desk, DJ name, `t`, then `q`** — still identical, and it should be:

```bash
dotnet run --project week-10/Lab
```

```
3 carts loaded.
```

```bash
dotnet test week-10/Lab.Checks
```

**3 / 5 — checks 1, 2 and 3.**

💡 **[`migrations add` and `database update` are two different commands and only one of them touches the server](../lecture-notes.md#migrations--add-and-update).** You just ran both. Getting that pair mixed up is the commonest way this goes wrong at home.

**Commit it:**

```
week 10 lab: the instructions that made the table
```

---

### Task 4 in full

**Write the rotation down.**

**Check:** `Check4_TheCartsGoIntoTheTable`

**First, look at the table you made.** Activity bar → **SQL Server** (<kbd>⌘⌥D</kbd> / <kbd>Ctrl+Alt+D</kbd>) → your server → Databases → your database → Tables → right-click **`dbo.Carts`** → **Select Top 1000**.

**Nothing. The table exists and it is empty**, and it will stay empty however many shifts you work, because `Rotation.Save` does nothing at all.

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 4` comment.** The shape, and nothing else:

- **Every cart is one of two things, and its `Id` says which.** A cart that has never been in the table has `Id == 0` and is **new**. A cart that came out of the table is carrying its row number, and that row **changes** — which is how tonight's plays land on last night's cart.
- **The DbSet has a method for each of those**, and they are named exactly what they do.
- ⚠️ **And nothing happens until you say so.** [Those methods write down what is *intended*](../lecture-notes.md#save--add-update-or-remove); one more line sends the lot to the server in a single trip. **That line is the one everybody forgets**, and the check's message for it says *nothing arrived*.

> [!TIP]
> **Stuck on the shape?** [The notes work the whole method through](../lecture-notes.md#save--add-update-or-remove) — on a registry rather than a rotation, so the nouns differ and the three lines do not.

**Run the desk, DJ name, then `a` to air the hour, then `q`.** Nothing on screen changes — this task's whole effect is somewhere else:

```bash
dotnet run --project week-10/Lab
```

**Now go back to the SQL Server view, right-click `dbo.Carts` → Select Top 1000 again:**

```
Id   Title            Artist             Seconds   PlaysTonight
1    Nightjar         The Lamplighters   227       1
2    Slack Water      Marguerite Vance   252       1
3    Long Way Round   The Ferrymen       331       1
```

**Three rows, and they have your plays on them.** ⚠️ **If the table is still empty, it is the line you did not write** — read the check's message.

```bash
dotnet test week-10/Lab.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.**

**Commit it:**

```
week 10 lab: the carts go into the table
```

---

### Task 5 in full

**And read it back.**

**Check:** `Check5_TheCartsComeBackOut`

**First, see what is still wrong.** Run the desk, DJ name, `t`, `q`:

```bash
dotnet run --project week-10/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
```

**Zero plays — and you can see three rows in the table with a play each.** The carts are going in and nothing is coming back out, because `Rotation.Load` does nothing.

**Write it — in `Lab/Rotation.cs`, under the `TODO — Task 5` comment.** Two things it has to get right, and **week 8 had both**:

- **Loading is REPLACING, not adding.** `Program.cs` puts three carts in and *then* calls `Load`. Without a `Clear()` you end the night with six.
- ⚠️ ⚠️ **THE FIRST NIGHT, and this is the one that bites.** Week 8 asked `File.Exists` first, because a desk nobody has signed off has no file. **Your table is always there — the migration made it — but the first time, it is EMPTY.** A `Load` that clears before it looks throws away the three carts `Program.cs` just added, and the next line reaches for one and finds nothing. [The notes say what to do about it](../lecture-notes.md#load--and-the-first-night).

> [!TIP]
> **[`db.Carts` is a question, not an answer.](../lecture-notes.md#load--and-the-first-night)** Ask it once, work from what comes back.

**Now the run that is the point of the whole night. Work a shift, air the hour, and sign off:**

```bash
dotnet run --project week-10/Lab
```

Type a DJ name, press `a`, press `q`.

**Then start a completely new shift and press `t`:**

```bash
dotnet run --project week-10/Lab
```

```
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │
├────────────────┼──────────────────┼────────┼────────┤
│ Nightjar       │ The Lamplighters │ 3:47   │ 1      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 1      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 1      │
╰────────────────┴──────────────────┴────────┴────────╯
3 carts loaded.
```

**One play each, carried over from a shift that has already ended.** Press `q`.

⚠️ **Now look in `week-10/`. There is no `rotation.json`, and there never will be again.** That is not on your laptop — it is on a machine down the hall that you and everybody else in this room can reach.

**Then mine:**

```bash
dotnet test week-10/Lab.Checks
```

**5 / 5.**

**And yours, which has been red since Setup:**

```bash
dotnet test week-10/Lab.Tests
```

**4 passed.** `ACartRemembersItsPlays` is green again — the same fact you wrote in week 8, about the same behavior, in a different home.

**Then clock out — commit the shift:**

```
week 10 lab: the carts come back out
```

**Five commits, five green checks, four of your own facts, and a rotation that is not on your laptop.**

---

## Now try to break it

```bash
dotnet run --project week-10/Lab
```

- **Take `db.SaveChanges()` out of `Save`** and work a shift. The desk behaves perfectly and the table never changes. **Which of my checks catches it, and what does it say?**
- **Take the `Clear()` out of `Load`** and run two shifts in a row. Count the carts. Then read check 5's message.
- **Take the first-night guard out of `Load`**, drop your table's rows (`DELETE FROM Carts;` in a New Query) and run. **That is the crash a first-time user gets, and only a first-time user.**
- **Put `[NotMapped]` on `Seconds`**, then `dotnet ef migrations add Oops` and read the `Up()`. Then take it off again and delete that migration.
- **Turn your wifi off and run `dotnet test week-10/Lab.Checks`.** All five still pass. **Now run the desk.** That is the difference between what my checks prove and what they don't.
- **Change one cart's title in the table** with a `New Query` (`UPDATE Carts SET Title = 'Nightjar (live)' WHERE Id = 1;`) and start a shift. The desk is reading somebody else's edit.

## ⭐ Done early?

1. **A second fact of your own.** Your suite has one about plays surviving. Write one about the **first night** — a rotation holding three carts, loaded from a table nobody has saved to, still holding three. [The shape is in the notes.](../lecture-notes.md#testing-database-code-without-a-database)
2. **Ask the table a question the desk cannot.** `New Query`, and `SELECT Title, PlaysTonight FROM Carts ORDER BY PlaysTonight DESC;`. You wrote that in C# last week as `TopPlayed`. **Next week you stop choosing between the two.**
3. **Two shifts at once.** Open a second terminal and run `dotnet run --project week-10/Lab` in both. Air the hour in one, sign off, then sign off the other. **Look at the plays.** That is not a bug you can fix tonight — it is week 11's whole subject.
4. **Read `Down()`.** Every migration has one. Work out what `dotnet ef database update` would have to do to get back to before.
5. ⭐ **Find the case thing for yourself.** `SELECT * FROM Carts WHERE Title = 'nightjar';` — all lower case. Then ask your own `Rotation` for a cart by that name in C#. **They disagree, and [the demo's last beat is exactly this](../lecture-notes.md#case-and-what-the-database-does-not-care-about).**

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-10/Lab.Checks`. |
| `InvalidOperationException: The ConnectionString property has not been initialized.` | The secret read back as nothing. **`dotnet user-secrets list --project week-10/Lab` tells you which of the two causes it is** — [all three answers are in the notes](../lecture-notes.md#dotnet-user-secrets--the-four-commands). |
| `Could not find the global property 'UserSecretsId'` | Setup step 5b never ran. |
| `No secrets configured for this application.` | 5b ran, 5c didn't — or this is a lab PC that rebooted. [One command to restore.](../lecture-notes.md#where-secrets-actually-live-and-the-restore-drill) |
| `Login failed for user` | Wrong login or password in the connection string. Run 5c again — `set` replaces. |
| `A network-related or instance-specific error…` | Wrong `Server=`, or you're not on a network that reaches it. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing from the end of the connection string. |
| `Cannot open database "DB_…" requested by the login` | The database isn't made yet. That's Task 3, step 3. |
| `Invalid object name 'Carts'` | The database is there and the table isn't — you wrote the migration and never ran `dotnet ef database update --project week-10/Lab`. |
| `Cannot insert explicit value for identity column` | `Save` is `Add`ing a cart that came out of the table. [It's an `Update`, and `Id` is how you tell.](../lecture-notes.md#save--add-update-or-remove) |
| The table stays empty and nothing errors | **No `db.SaveChanges()`.** [`Add` only writes down what you intend.](../lecture-notes.md#save--add-update-or-remove) |
| The rotation has **six** carts | `Load` has no `Clear()`. Loading is replacing. |
| `ArgumentOutOfRangeException` on the very first run | [`Load` cleared the seeded carts and the table was empty.](../lecture-notes.md#load--and-the-first-night) |
| `PLAYED` is always 0 after a restart | Either `Save` isn't saving or `PlaysTonight` is `[NotMapped]`. Look at the table in the SQL Server view — that says which. |
| `dotnet ef` : *command not found* | Setup step 5a. |
| `Unable to create a 'DbContext' of type` | `dotnet ef` couldn't build your context. It needs the **empty** constructor — check it's still there. |
| `CS0246: 'NotMappedAttribute' could not be found` | `using System.ComponentModel.DataAnnotations.Schema;` at the top of `Song.cs`. |
| `CS0246: 'DbSet<>' could not be found` | `using Microsoft.EntityFrameworkCore;` at the top of `DeskContext.cs` — it ships there, so something got deleted. |
| Red squiggles under `DbSet` or `[Fact]`, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| The SQL Server view shows no databases | Right-click your connection → **Refresh**. It caches. |
| My checks pass and the desk still can't connect | **That is exactly right and worth understanding.** [My checks never touch your server.](../lecture-notes.md#testing-database-code-without-a-database) |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 10 lab: the carts go into the table"
> ```

**Prev:** [Week 9 Lab — The Night's Numbers](../../week-09/lab/) · **Next:** [Week 10 Homework — The Registry Moves In](../homework.md)
