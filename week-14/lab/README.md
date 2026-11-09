# Week 14 Lab — The Old Carts 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the music director wants two new things on the carts screen: **when each cart was added**, and **how many stars it has**. The carts are already in a table, and some of them have been playing for weeks. Nobody can make them again.

Your job: add both as new columns, in a table that already has rows, **and keep every one of them.** A new column means a new property in the class and a migration that adds it to the table. The migration decides what the carts already there get.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all three checks green, and every cart you start with still there at the end.**

> [!IMPORTANT]
> **Tonight nothing is dropped.** Your lab database carries on from last week, with whatever is in it. The point of the night is that every row survives.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the ones the tasks name. If you missed week 11, 12 or 13, Setup step 6 has a box for you.

> [!NOTE]
> **Tonight your instructor works on the same desk.** You watch the **switchboard** get two new columns, then you do the same to the **carts**. **Nothing to copy in this week.** A class or a migration copied from another project would change your next migration, so your instructor's files are on GitHub to read: [`demo/week-14` in the starters repo](https://github.com/jgrissom/dotnet-db-starters/tree/main/demo/week-14). They appear there during class.

## Setup

Seven steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

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
cp -r ../dotnet-db-starters/week-14 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-14` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-14`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-14/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — Song.cs and the carts screen change tonight
   ├─ Lab.Tests/           ← YOURS — fifteen facts ship written; you add one tonight
   ├─ Lab.Checks/          ← my checks — read-only
   └─ deliveries/          ← one file of new carts
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-14` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

**5. Run my checks** — from the terminal, naming the week. This also builds the desk, which the next step needs.

```bash
dotnet test week-14/Lab.Checks
```

**1 / 3 passing.** Check 1 is everything the desk already does, and it stays green all night. **The two red ones are tonight's tasks** — read their names; they're the map.

**6. Bring your database up to date.** One command:

```bash
dotnet ef database update --project week-14/Lab
```

If you did last week's lab on this machine, your database already has everything this week's starter has, so there's nothing to do:

```
Acquiring an exclusive lock for migration application. See https://aka.ms/efcore-docs-migrations-lock for more information if this takes too long.
No migrations were applied. The database is already up to date.
Done.
```

The first line prints before every `update`: EF Core makes sure nobody else is changing the database at the same moment.

<details>
<summary><b>It said something else?</b> Find the line it printed.</summary>

- **`Applying migration '20261023163353_TheDeskMovesIn'.`** and the next one, then `Done.` — you had no lab database on this server, and now you have one. That's fine.
- **`There is already an object named 'Airings' in the database.`** — you missed last week's Setup, so your database remembers migrations under names of your own. **This once**, drop it and make it again. It's your lab database, and nothing in it is worth keeping:

  ```bash
  dotnet ef database drop --force --project week-14/Lab
  ```

  ```bash
  dotnet ef database update --project week-14/Lab
  ```

- **`The ConnectionString property has not been initialized`** or **`Login failed`** — your connection string isn't set for this week. This week's `Lab.csproj` carries the same `UserSecretsId` as weeks 11 to 13, so if you set it in week 11 on this machine, it's already there. **Missed it, or on a lab PC that rebooted?** Set it once. Swap all four `YOUR-…` parts. The server name is in Canvas; the login and password are your college SQL account. Then run the `update` again.

  ```bash
  dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-14/Lab
  ```

</details>

**7. Look at the rows you're keeping.** **Run the desk: DJ name, then `t`, then `q`.** `t` shows the carts.

```bash
dotnet run --project week-14/Lab
```

```
3 carts loaded.
```

**Count the carts on your screen.** A fresh database shows the three above. If last week's delivery got in, you'll see more. **Whatever your number is, every one of those carts has to still be there at the end of the night.**

> [!IMPORTANT]
> **The project work lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight the carts get two columns, and the project work gives your own records the same two.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 14: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-14/Lab.Checks`, `dotnet ef database update --project week-14/Lab` and `dotnet run --project week-14/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-14/Lab` | the desk | what any of it looks like, and **whether the rows survived** |
| `dotnet ef migrations add` | EF Core | writes a migration: what the table needs, to match your classes |
| `dotnet ef database update` | EF Core | runs it, on your database |
| `dotnet test week-14/Lab.Checks` | mine | *can the desk do it?* — 1, then 2 at Task 1, 3 at Task 2 |
| `dotnet test week-14/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 15 facts, then 16 at Task 2 |

| File | What it is |
|---|---|
| `Lab/Song.cs` | **Yours.** One new property in Task 1, and one in Task 2 |
| `Lab/Program.cs` | **Yours.** The carts screen, `DrawCarts`, gets one column in each task |
| `Lab/Migrations/` | **Yours.** `migrations add` writes a new file in here in each task, and you read it before you run it |
| `Lab.Tests/DeskTests.cs` | **Yours.** You write one fact in it in Task 2 |
| `Lab.Checks/DeskChecks.cs` | My three. **Read-only, as always.** |

> [!IMPORTANT]
> **My checks never touch the college's server.** They read your classes, and the migrations you made, straight out of the project. So they can't tell whether you ran `database update`. **Running the desk is the only thing that tells you that.**

## Two rules for a new column

**Ask what the true value is for the rows you already have.**

| The answer | The column | What the old rows get |
|---|---|---|
| **Nobody knows** | can be empty: `DateTime?`, with the `?` | `NULL`, and the screen shows a dash |
| **Everybody knows** | can't be empty, and **the migration says the value** | whatever the migration says. `migrations add` writes the type's zero: `0`, `false`, `""`. **Your class's `= 3` is not in it** |

## The tasks

**The rhythm is the same every time:** change the class → run the desk and *watch what happens* → `migrations add` → **read the migration** → `database update` → run the desk and *count the rows* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole thing is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | `ACartHasAnAddedDate` | A column nobody knows: when each cart was added. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheOldCartsGetThreeStars` | A column everybody knows: three stars, for the old carts too. A fact first. **[Task 2 in full ↓](#task-2-in-full)** |

---

### Task 1 in full

**A column nobody knows: when each cart was added.**

**Check:** `Check2_ACartHasAnAddedDate`

**Open `week-14/Lab/Song.cs`. Its `// TODO — Task 1` comment sits under `Seconds`** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 1:` finds it, one hit. Replace the comment's two lines with these two members:

- **`public DateTime? Added { get; private set; }`** — the `?` lets it hold nothing. That is the true answer for every cart already in your table: nobody wrote it down.
- **`public string AddedOn()`**, the same shape as `LastAired()` further down the file: if `Added == null`, `return "-";`, and otherwise **`return Added.Value.ToString("yyyy-MM-dd");`**

**Then, in the constructor at the bottom, one line under `Seconds = seconds;`:**

```csharp
        Added = DateTime.Now;
```

Every cart made from tonight on gets a date the moment it is made. The old ones never pass through here again, because they come out of the table.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

In place of the `// TODO — Task 1` comment:

```csharp
    public DateTime? Added { get; private set; }

    public string AddedOn()
    {
        if (Added == null)
        {
            return "-";
        }

        return Added.Value.ToString("yyyy-MM-dd");
    }
```

</details>

**Now the carts screen.** Open `week-14/Lab/Program.cs` and <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 1:`, one hit, and delete that one comment line. Two edits under it, both shown here because they are the same for any column:

- **The column.** Search for this line, one hit, select it, and paste the two lines below over it. ⚠️ The `;` moves down to the new last line:

  ```text
          .AddColumn($"[{Dim}]LAST ON AIR[/]");
  ```

  ```csharp
          .AddColumn($"[{Dim}]LAST ON AIR[/]")
          .AddColumn($"[{Dim}]ADDED[/]");
  ```

- **Its cell.** Search for this line, one hit, select it, and paste the two lines below over it. The `);` moves down the same way:

  ```text
              $"[{Dim}]{song.LastAired()}[/]");
  ```

  ```csharp
              $"[{Dim}]{song.LastAired()}[/]",
              $"[{Dim}]{song.AddedOn()}[/]");
  ```

**Now watch what happens. Run the desk, and type a DJ name.**

```bash
dotnet run --project week-14/Lab
```

**It asks for the DJ, then the shift is over.** Scroll up to the line starting `Unhandled exception`:

```
Unhandled exception. Microsoft.Data.SqlClient.SqlException (0x80131904): Invalid column name 'Added'.
```

**Your class has a column your table doesn't.** The desk asked the database for every cart's `Added`, and the `Songs` table has never heard of it. That is what a migration is for.

**Write the migration:**

```bash
dotnet ef migrations add ACartHasAnAddedDate --project week-14/Lab
```

```
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
```

**Read it before you run it.** In the Explorer, open `week-14/Lab/Migrations/` and the file ending **`_ACartHasAnAddedDate.cs`** — not the one ending `.Designer.cs`. Its `Up` method is what `database update` will do:

```text
            migrationBuilder.AddColumn<DateTime>(
                name: "Added",
                table: "Songs",
                type: "datetime2",
                nullable: true);
```

**Three things to see:** it **adds** a column, it's on **`Songs`**, and it says **`nullable: true`**, so every cart already there gets `NULL`. Nothing is dropped. **Now run it:**

```bash
dotnet ef database update --project week-14/Lab
```

```
Applying migration '20261109013347_ACartHasAnAddedDate'.
Done.
```

*(Your migration's number is the date and time you made it, so it won't match mine.)*

**Run the desk: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-14/Lab
```

```
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │ LAST ON AIR │ ADDED │
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │ -           │ -     │
```

**Every cart that was already in your table shows a dash in ADDED.** **Count them:** the same number as Setup step 7. The column is new, and every row is still there.

**Now a new cart. Run the desk: DJ name, then `i`, then this path, then `t`, then `q`.** `i` takes a delivery of carts. **Two new carts come in, with tonight's date.** On a fresh database that makes five:

```bash
dotnet run --project week-14/Lab
```

```text
week-14/deliveries/late-carts.json
```

```
  Delivered: 2 new - 5 carts in the rotation.
```

```
│ Lantern Hours  │ The Lamplighters │ 3:34   │ 0      │ -           │ 2026-11-24 │
│ Low Tide Waltz │ Marguerite Vance │ 4:23   │ 0      │ -           │ 2026-11-24 │
```

**Every old cart still has its dash.** Your count is your Setup number plus two. *(Ran this delivery already? Then it says `0 new`, because `Import` leaves out a title the rotation already has.)*

**Then my checks:**

```bash
dotnet test week-14/Lab.Checks
```

**2 / 3 — checks 1 and 2.**

**Commit it:**

```
week 14 lab: a column nobody knows
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? In the **SQL Server** view, right-click `dbo.Songs` → **Select Top 1000**: the old rows say `NULL` in `Added`, and the two new ones have a date and a time. Working at home? Carry straight on.

📖 *Further reading:* [a table that already has rows](../lecture-notes.md#a-table-that-already-has-rows) · [a column nobody knows](../lecture-notes.md#a-column-nobody-knows) · [read it before you run it](../lecture-notes.md#read-it-before-you-run-it).

---

### Task 2 in full

**A column everybody knows: three stars, for the old carts too. A fact first.**

**Check:** `Check3_TheOldCartsGetThreeStars`

**In `week-14/Lab/Song.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:`, one hit, and replace that comment with one property:**

```csharp
    public int Stars { get; set; } = 3;
```

**Every cart starts at three.** That's true of the carts already in the table, too: nobody has ever given a cart stars, so they all start where a new one does.

**Now the carts screen.** In `week-14/Lab/Program.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:`, one hit, and delete that comment line. Then the same two edits as Task 1, one column further along:

- **The column.** Search for this line, one hit, select it, and paste the two lines below over it:

  ```text
          .AddColumn($"[{Dim}]ADDED[/]");
  ```

  ```csharp
          .AddColumn($"[{Dim}]ADDED[/]")
          .AddColumn($"[{Dim}]STARS[/]");
  ```

- **Its cell.** Search for this line, one hit, select it, and paste the two lines below over it:

  ```text
              $"[{Dim}]{song.AddedOn()}[/]");
  ```

  ```csharp
              $"[{Dim}]{song.AddedOn()}[/]",
              $"[{Coral}]{song.Stars}[/]");
  ```

**Write the migration:**

```bash
dotnet ef migrations add CartsGetStars --project week-14/Lab
```

**Read it before you run it.** Open the file ending **`_CartsGetStars.cs`** in `week-14/Lab/Migrations/`:

```text
            migrationBuilder.AddColumn<int>(
                name: "Stars",
                table: "Songs",
                type: "int",
                nullable: false,
                defaultValue: 0);
```

**Look at the last line.** `nullable: false` is right, because every cart has stars. **`defaultValue: 0` is what every cart already in your table would get.** Your `= 3` is in the class, and the class only makes carts from now on. `migrations add` wrote the zero of an `int`, and it didn't warn you.

⚠️ **Don't run `database update` yet.**

#### First, the fact — before you touch the migration

**Write it in `week-14/Lab.Tests/DeskTests.cs`, in place of its `// TODO — Task 2` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:`, one hit. A migration is a class, and a test can make one and read what it would do, with no database at all:

- **Set the scene:** `Migration migration = new CartsGetStars();` — your migration's class name is the name you gave `migrations add`.
- **Do the thing:** `migration.UpOperations` is the list of everything `Up` would do. Pick out the one that adds `Stars`:
  `.OfType<AddColumnOperation>().Single(op => op.Name == "Stars")`
- **Check the answer:** `Assert.Equal(3, stars.DefaultValue);`
- Name the fact after the rule it proves. Mine is `TheOldCartsGetThreeStars`.

**It needs three using lines, at the top of `DeskTests.cs`, directly under `using Microsoft.EntityFrameworkCore;`:**

```csharp
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Lab.Migrations;
```

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void TheOldCartsGetThreeStars()
    {
        Migration migration = new CartsGetStars();

        AddColumnOperation stars = migration.UpOperations
            .OfType<AddColumnOperation>()
            .Single(op => op.Name == "Stars");

        Assert.Equal(3, stars.DefaultValue);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test week-14/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.TheOldCartsGetThreeStars
  Error Message:
   Assert.Equal() Failure: Values differ
Expected: 3
Actual:   0
```

**Red, and it's the same `0` you just read in the migration.**

#### Now the fix

**In the `_CartsGetStars.cs` migration, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for this, one hit, and change the `0` to a `3`:**

```text
defaultValue: 0
```

It reads:

```text
                defaultValue: 3);
```

**A migration is a file you can edit.** Nothing has run it yet, so this is the moment to make it say what's true.

```bash
dotnet test week-14/Lab.Tests
```

**16 passed.** Now run it:

```bash
dotnet ef database update --project week-14/Lab
```

```
Applying migration '20261109013359_CartsGetStars'.
Done.
```

**Run the desk: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-14/Lab
```

```
│ TITLE          │ ARTIST           │ LENGTH │ PLAYED │ LAST ON AIR │ ADDED      │ STARS │
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │ -           │ -          │ 3     │
│ Lantern Hours  │ The Lamplighters │ 3:34   │ 0      │ -           │ 2026-11-24 │ 3     │
```

**Every cart has three stars, and every one of them came from the migration**, because every cart was already in the table when it ran. A cart delivered from now on gets its three from the class. **Count them:** the same number as at the end of Task 1.

**Then mine:**

```bash
dotnet test week-14/Lab.Checks
```

**3 / 3.**

**Commit it:**

```
week 14 lab: a column everybody knows
```

<details>
<summary><b>Already ran <code>database update</code> with the <code>0</code> in it?</b> Every old cart has 0 stars. Take the migration back, then fix it.</summary>

`database update` with the name of an **earlier** migration runs the later ones backward. This takes the `Stars` column off again, and every row stays:

```bash
dotnet ef database update ACartHasAnAddedDate --project week-14/Lab
```

```
Reverting migration '20261109013359_CartsGetStars'.
Done.
```

Then change the `0` to `3` in the migration, and run `dotnet ef database update --project week-14/Lab` again.

</details>

**Two commits after the starter, three green checks, sixteen facts, and every cart you started the night with.**

> [!NOTE]
> **In class, stop here.** Finished early? Try [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? Carry straight on to [the project work](../homework.md).

📖 *Further reading:* [a column everybody knows](../lecture-notes.md#a-column-everybody-knows) · [a test that reads a migration](../lecture-notes.md#a-test-that-reads-a-migration) · [taking a migration back](../lecture-notes.md#taking-a-migration-back).

---

## Now try to break it

[Renames, in the notes](../lecture-notes.md#renames), say what each of these does and why. Each one makes a migration you **read and then take back** — none of them ever reaches your database. `migrations remove` takes back the newest migration, as long as it hasn't been run:

```bash
dotnet ef migrations remove --project week-14/Lab
```

- **Take `Stars` out of `Song.cs`**, and its column and cell out of the carts screen, and run `migrations add`. It says *An operation was scaffolded that may result in the loss of data*, and the migration is a `DropColumn`: every cart's stars would go. Take it back, and put the three lines back.
- **Rename `Stars` to `Rating`** (the property and both places it's used) and run `migrations add`. It's a `RenameColumn`: the numbers move across. Take it back.
- **Rename `Stars` to `Rating` and make it a `double`, both at once.** `migrations add` says *An operation was scaffolded that may result in the loss of data*, and the migration drops the column and adds a new one. Take it back.

## ⭐ Done early?

None of these has a check.

1. ⭐ **Give an old cart a date by hand.** SQL Server view → New Query: `UPDATE Songs SET Added = '2026-09-01' WHERE Title = 'Nightjar'`. Run the desk and press `t`.
2. **List your migrations:** `dotnet ef migrations list --project week-14/Lab`. Make one, run the list again, and look for `(Pending)` on the end: that's a migration nobody has run yet.
3. **Read the switchboard's migrations on GitHub**, in [`demo/week-14`](https://github.com/jgrissom/dotnet-db-starters/tree/main/demo/week-14). Find the `defaultValue` your instructor changed.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-14/Lab.Checks`. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that has never been built. Run `dotnet test week-14/Lab.Checks` once, then the `dotnet ef` command again. |
| `Invalid column name 'Added'` (or `'Stars'`) | Your class has a column your table doesn't. Run `migrations add`, read it, then `database update`. |
| `There is already an object named 'Airings' in the database.` | You missed last week's Setup. Setup step 6's box: drop, then update, this once. |
| `The ConnectionString property has not been initialized.` | Your connection string isn't set for this week's id. Setup step 6's box. |
| `Login failed for user` | Wrong login or password in the connection string. `dotnet user-secrets set` again; `set` replaces. |
| `No project was found. Change the current working directory or use the --project option.` | The `--project week-14/Lab` is missing from the end of a `dotnet ef` command. |
| `The name 'ACartHasAnAddedDate' is used by an existing migration.` | You've already made it. Look in `week-14/Lab/Migrations/`. |
| `migrations remove` says `The ConnectionString property has not been initialized` | `remove` asks your database whether the migration has been run, so it needs your connection string and the network. Setup step 6's box. |
| `CS1513: } expected`, or `CS1002: ; expected`, in `Program.cs` | A `;` didn't move down. Only the **last** `.AddColumn` ends in `;`, and only the last cell ends in `);`. |
| `CS0246` … `'Migration'` or `'AddColumnOperation'` | `DeskTests.cs` is missing the three using lines. |
| `CS0246` … `'CartsGetStars'` | `using Lab.Migrations;` is missing, or your migration has a different name. The class name is the name you gave `migrations add`. |
| `Sequence contains no matching element` in your fact | Nothing in that migration adds a column called `Stars`. Check the spelling in `Single(op => op.Name == "Stars")`. |
| Check 2 red: *no property called Added* | Task 1, in `Song.cs`. |
| Check 2 red: *should be DateTime? with the ?* | Put the `?` on, then `migrations remove` and `migrations add` again. |
| Check 2 red: *No migration … adds an Added column* | Task 1's `migrations add`. |
| Check 3 red: *gives every cart already in the table 0 stars* | The migration still says `defaultValue: 0`. Change it to `3`. |
| Check 3 red: *Your classes have changed since your last migration* | Something in a class isn't in a migration yet. `migrations add`. |
| The old carts show **0** stars on the desk | You ran `database update` before you fixed the migration. Task 2's last box takes it back. |
| `DeskContextModelSnapshot.cs` shows as changed after `migrations remove` | It rewrites that file, and writes `ToTable("Songs", (string)null)` where it said `ToTable("Songs")`. They mean the same thing. Commit it. |
| The carts table wraps onto two lines per cart | Your terminal panel is narrow. Drag its edge to make it wider, or close the Explorer. |
| My checks pass and the desk crashes | **That is exactly right, until you run `database update`.** My checks read your migrations; only the desk uses your database. |
| Red squiggles, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 14 lab: a column everybody knows"
> ```

**Prev:** [Week 13 Lab — The Delivery](../../week-13/lab/) · **Next:** [Week 14 Project Work — Two Columns of Your Own](../homework.md)
