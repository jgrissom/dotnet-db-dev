# Week 11 Lab — A Cart Comes Off 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the whole night lives in a database on the college's SQL Server. The desk reads the callers and the carts out of it at the start of a shift and writes them back at the end.

It can put a row in and change a row. **It can't take one out.** Tonight a cart comes off the rotation, and the job is to make it stay off.

Your job: pull a cart off the rotation, watch it come back the next night, write a test that says it shouldn't, and then make `Save` take its row out of the table. Your instructor does the same to the switchboard, a piece at a time, just before you do it to the rotation.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all three checks green, a pulled cart that stays pulled, and one request of yours on the request line.**

> [!IMPORTANT]
> **Task 1 starts the week with a fresh database.** It drops the one you made last week and makes it again, empty. That is on purpose: everybody's desk starts from the same three carts tonight.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the ones the tasks name. Task 1 has a box for anybody who doesn't have last week's connection string.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch a **caller** come off the switchboard, then copy those finished files into your project. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, all of them finished, and the copy commands work the same.

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
cp -r ../dotnet-db-starters/week-11 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-11` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-11`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — **four** projects this time:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-11/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — Rotation.cs has tonight's work in it
   ├─ Lab.Tests/           ← YOURS — nine facts ship written; you add one tonight
   ├─ Lab.Checks/          ← my checks — read-only
   └─ RequestLine/         ← your instructor's program, for the end of the night — you only run it
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-11` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight a pulled cart stays pulled, and the homework does the same for a record removed from your own registry.

**Then run my checks** — from the terminal, naming the week:

```bash
dotnet test week-11/Lab.Checks
```

**1 / 3 passing.** Check 1 is everything the desk already does, database included, and it stays green all night. **The two red ones are tonight's tasks** — read their names; they're the map.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 11: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-11/Lab.Checks`, `dotnet test week-11/Lab.Tests` and `dotnet run --project week-11/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-11/Lab` | the desk | what any of it looks like on the air — **and the only thing that proves a pulled cart stays out of your database** |
| `dotnet test week-11/Lab.Checks` | mine | *can the desk do it?* — 1 through Task 1, then 2, then 3 |
| `dotnet test week-11/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 9 facts, 10 at Task 3, then 11 |

| File | What it is |
|---|---|
| `Lab/Rotation.cs` | **Yours.** `Remove` in Task 2, and one loop in `Save` in Task 3 |
| `Lab.Tests/DeskTests.cs` | **Yours.** You write one fact in it in Task 3 |
| `Lab/Program.cs` | Ships finished. **Nothing in it changes tonight.** The `p` key pulls a cart and the `x` key takes a caller off the switchboard |
| `Lab/Switchboard.cs` | **Your instructor's.** You copy the finished file in at Tasks 2 and 3 and read it as you work. You never edit it |
| `Lab.Tests/RemovedCallerTests.cs` | **Your instructor's fact**, copied in at Task 3 |
| `RequestLine/` | **Your instructor's program.** You run it at the end of the night, and you never edit it |
| `Lab.Checks/DeskChecks.cs` | My three. **Read-only, as always.** |

> [!IMPORTANT]
> **My checks never touch the college's server.** They hand your `DeskContext` a table that lives inside the test run, so they pass with the wifi off. **That is why every task runs the desk as well.** Green checks say your code is right. Only the desk says what's in your *database*.

## The tasks

**The rhythm is the same every time:** run the desk and *look* → write the code → run the desk again and *see the difference* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole thing is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green — and has to stay that way)* | Your connection string, and a fresh database. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `ACartCanBePulled` | `Remove` takes a cart off the rotation — and the next night, it's back. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `APulledCartStaysPulled` | A fact first, then `Save` takes a pulled cart's row out of the table. **[Task 3 in full ↓](#task-3-in-full)** |

---

### Task 1 in full

**Your connection string, and a fresh database.**

**Check:** `Check1_TheDeskStillAnswers` — **already green, and it stays that way.** Nothing in this task turns a check green. It is the setup the other two stand on.

#### 1a — the EF tool

```bash
dotnet tool update --global dotnet-ef
```

**This installs `dotnet-ef` if you don't have it, and updates it if you do.** On your own laptop it's already there from last week. A lab PC that rebooted has lost it.

#### 1b — your connection string, carried across

**Your connection string didn't come with the copy.** It lives in a secret store in your home folder, and a project finds its store by the `<UserSecretsId>` in its `.csproj`. Last week you made that id yourself with `init`. **This week's `Lab.csproj` ships with one already in it, and it is the same in every week from here on.** So you put your connection string in it once, tonight, and every later week finds it.

**Ask last week's project for yours:**

```bash
dotnet user-secrets list --project week-10/Lab
```

```
ConnectionStrings:Desk = Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True
```

Yours shows your real values, **password included**, so this is for your own screen only. **Copy everything after `ConnectionStrings:Desk = `.**

**Ask this week's project what it has:**

```bash
dotnet user-secrets list --project week-11/Lab
```

```
No secrets configured for this application.
```

**Then put yours in.** Paste your connection string between the second pair of quotes:

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "PASTE-YOURS-HERE" --project week-11/Lab
```

```
Successfully saved ConnectionStrings:Desk to the secret store.
```

**Check it took** — the same `list` again should now show your connection string:

```bash
dotnet user-secrets list --project week-11/Lab
```

<details>
<summary><b>No week 10 folder, or the first <code>list</code> said "No secrets configured"?</b> Type the whole connection string instead.</summary>

That happens if you missed last week, or this is a lab PC that rebooted. Swap all four `YOUR-…` parts. The server name is in Canvas; the login and password are your college SQL account.

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-11/Lab
```

The database name is `DB_`, the app, the course number and your initials. [The notes say why the `DB_` is there](../../week-10/lecture-notes.md#naming-your-database).

</details>

📖 *Why the same id every week:* [the same secret store every week](../lecture-notes.md#the-same-secret-store-every-week).

#### 1c — a fresh database

**Drop last week's database, then make it again from this week's starter.** Two commands, in this order:

```bash
dotnet ef database drop --force --project week-11/Lab
```

```
Dropping database 'DB_KDXR_156101411_YOURINITIALS' on server 'YOUR-SERVER'.
Successfully dropped database 'DB_KDXR_156101411_YOURINITIALS'.
```

**`--force` means don't ask "are you sure?"** It is your lab database, and nothing in it is worth keeping. *Missed last week?* Then it says `did not exist, no action was taken`, and that's fine.

```bash
dotnet ef database update --project week-11/Lab
```

```
Applying migration '20261023163353_TheDeskMovesIn'.
Done.
```

**That makes the database and its two tables, empty, from the migration that ships in this week's `Lab/Migrations/`.** In the **SQL Server** view, right-click your connection → **Refresh** → Databases → yours → Tables: `dbo.Callers` and `dbo.Songs`.

📖 *Why drop it at all:* [a fresh database for the week](../lecture-notes.md#a-fresh-database-for-the-week).

#### 1d — the first night

**Run the desk: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-11/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
3 carts loaded.
```

**The table was empty, so the desk kept the three carts `Program.cs` starts with, and `q` saved them.** In the SQL Server view, right-click **`dbo.Songs`** → **Select Top 1000**: three rows, `Id` 1, 2 and 3.

**Run my checks:**

```bash
dotnet test week-11/Lab.Checks
```

**1 / 3 — still.**

**Commit it:**

```
week 11 lab: a fresh database
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Help the person next to you with their connection string. Working at home? Carry straight on.

---

### Task 2 in full

**`Remove` takes a cart off the rotation — and the next night, it's back.**

**Check:** `Check2_ACartCanBePulled`

**First, bring in your instructor's code.** Pull the starters clone, then copy the file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-11/Switchboard.cs week-11/Lab/
```

Open `week-11/Lab/Switchboard.cs` and find **`Remove`**. It asks `Find` for the caller. No caller by that name, and it hands back `false`. Otherwise it takes that caller out of the list and hands back `true`.

**Now look at the rotation's.** Run the desk: DJ name, then `p`, type `Long Way Round`, then `q`.

```bash
dotnet run --project week-11/Lab
```

```
  Pull which cart? Title:   No cart called "Long Way Round" in the rotation.
```

**There is a Long Way Round, and the desk says there isn't.** `Rotation.Remove` ships handing back `false`, whatever it's asked.

**Open `week-11/Lab/Rotation.cs`. Its `// TODO — Task 2` comment sits right above `Remove`** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:` finds it, one hit. Replace the method with one that works like your instructor's, with carts:

- **`Song? found = Find(title);`** — `Find` already hands back the cart with that title, or `null`.
- **`if (found == null)`**, **`return false;`** — no cart by that title is an answer, not a crash.
- Otherwise **`_songs.Remove(found);`** takes that one cart out of the list, then **`return true;`**.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    public bool Remove(string title)
    {
        Song? found = Find(title);

        if (found == null)
        {
            return false;
        }

        _songs.Remove(found);
        return true;
    }
```

</details>

**Run the desk: DJ name, then `p`, type `Long Way Round`, then `t`, then `q`.**

```bash
dotnet run --project week-11/Lab
```

```
  Pull which cart? Title:   Pulled: Long Way Round - 2 carts left in the rotation.
```

```
│ Nightjar    │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water │ Marguerite Vance │ 4:12   │ 0      │
2 carts loaded.
```

**Two carts, and `q` saved the rotation.** Now run it again — **the next night**: DJ name, then `t`, then `q`.

```bash
dotnet run --project week-11/Lab
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │
3 carts loaded.
```

**Long Way Round is back.** Look at `dbo.Songs` in the SQL Server view: it never left. `Save` adds the carts that are new and updates the ones that aren't. **A pulled cart isn't in the list any more, so `Save` never mentions it**, its row stays in the table, and `Load` reads it straight back. That's Task 3.

**Then mine:**

```bash
dotnet test week-11/Lab.Checks
```

**2 / 3 — checks 1 and 2.**

**Commit it:**

```
week 11 lab: a cart can be pulled
```

> [!NOTE]
> **In class, stop here.** Task 3 comes after the next part of the demo. Finished early? Pull a cart that isn't there — `p`, then `Owl Hours` — and read what the desk says, or help the person next to you. Working at home? Carry straight on.

📖 *Further reading:* [taking a record off — `Remove`](../lecture-notes.md#taking-a-record-off--remove) · [a removed record comes back](../lecture-notes.md#a-removed-record-comes-back).

---

### Task 3 in full

**A fact first, then `Save` takes a pulled cart's row out of the table.**

**Check:** `Check3_APulledCartStaysPulled`

**First, bring in your instructor's code.** Pull, then copy two files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-11/Switchboard.cs week-11/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-11/RemovedCallerTests.cs week-11/Lab.Tests/
```

Open `Switchboard.cs` and look at `Save`: after the loop that adds and updates, a **second loop** reads the table and takes out every row no caller in the list has the `Id` of. `RemovedCallerTests.cs` is your instructor's fact about it.

```bash
dotnet test week-11/Lab.Tests
```

**10 passed** — your five, and your instructor's five.

#### First, the fact — before you touch `Save`

**Write it in `week-11/Lab.Tests/DeskTests.cs`, under its `// TODO — Task 3` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3:`, one hit. It is your instructor's `ACallerTakenOffStaysOff`, with carts. The same three moves as every fact:

- **Set the scene.** The three `options` lines every fact in this file starts with. A `Rotation` with **two** songs in it, Nightjar and Slack Water, saved with `rotation.Save(new DeskContext(options))`.
- **Do the thing: the next night.** One `DeskContext db = new DeskContext(options);`, used for both halves, the way the desk uses one for a whole shift. A second rotation, `nextNight`, loads from `db`, pulls Nightjar with **`nextNight.Remove("Nightjar")`**, and saves back to `db`.
- **Check the answer** in a third rotation, `reopened`, loaded from a fresh `new DeskContext(options)`: `Assert.Equal(1, reopened.Count)`, and **`Assert.Null(reopened.Find("Nightjar"))`**. **Assert on `reopened`, never on the rotation that saved.**
- Name the fact after the rule it proves. Mine is `APulledCartStaysPulled`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void APulledCartStaysPulled()
    {
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Rotation rotation = new Rotation();
        rotation.Add(new Song("Nightjar", "The Lamplighters", 227));
        rotation.Add(new Song("Slack Water", "Marguerite Vance", 252));
        rotation.Save(new DeskContext(options));

        DeskContext db = new DeskContext(options);
        Rotation nextNight = new Rotation();
        nextNight.Load(db);
        nextNight.Remove("Nightjar");
        nextNight.Save(db);

        Rotation reopened = new Rotation();
        reopened.Load(new DeskContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Null(reopened.Find("Nightjar"));
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test week-11/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.APulledCartStaysPulled
  Error Message:
   Assert.Equal() Failure: Values differ
Expected: 1
Actual:   2
```

**Red, and it is the same thing you saw on the desk.** Nightjar was pulled, and the next night's rotation still holds two carts.

#### Now the fix

**In `Lab/Rotation.cs`, in `Save`.** After the loop that adds and updates, and **before `db.SaveChanges();`**, add a second loop that takes out every row the list doesn't hold:

- **`foreach (Song row in db.Songs.ToList())`** — read every row in the table into a list, and walk it.
- **`if (!_songs.Any(song => song.Id == row.Id))`** — `Any` asks whether any cart in your list has that row's `Id`. The `!` turns it round: **no cart in the list has it**, so the cart was pulled.
- **`db.Songs.Remove(row);`** — marks that row to come out. `db.SaveChanges()` underneath sends it, along with everything else.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
        foreach (Song row in db.Songs.ToList())
        {
            if (!_songs.Any(song => song.Id == row.Id))
            {
                db.Songs.Remove(row);
            }
        }
```

</details>

```bash
dotnet test week-11/Lab.Tests
```

**11 passed.** Now the desk. Run it: DJ name, then `p`, type `Long Way Round`, then `q`.

```bash
dotnet run --project week-11/Lab
```

```
  Pull which cart? Title:   Pulled: Long Way Round - 2 carts left in the rotation.
```

**Then the next night: DJ name, then `t`, then `q`.**

```bash
dotnet run --project week-11/Lab
```

```
│ Nightjar    │ The Lamplighters │ 3:47   │ 0      │
│ Slack Water │ Marguerite Vance │ 4:12   │ 0      │
2 carts loaded.
```

**It stayed pulled.** Scroll up to the hour at the top of that run: `5 items`, because the hour is built from the carts the rotation has. And `dbo.Songs` in the SQL Server view holds two rows, `Id` 1 and 2. **The table holds exactly what the list holds.**

**Then mine:**

```bash
dotnet test week-11/Lab.Checks
```

**3 / 3.**

**Commit the shift:**

```
week 11 lab: a pulled cart stays pulled
```

**Three commits after the starter, three green checks, eleven facts, and a rotation whose table always matches its list.**

> [!NOTE]
> **In class, stop here.** The last part of the demo is the request line, and the whole room is in it. Finished early? Try [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? The request line only works while your instructor has it open — read [the section below](#the-request-line--in-class-when-your-instructor-says) and move on to [the homework](../homework.md).

📖 *Further reading:* [`Save`'s third job](../lecture-notes.md#saves-third-job-rows-the-list-no-longer-holds) · [why the `Id`, and not the name](../lecture-notes.md#why-the-id-and-not-the-name) · [testing a removal](../lecture-notes.md#testing-a-removal).

---

## The request line — in class, when your instructor says

**One table, in your instructor's database, and everybody in the room writes to it.** It runs on the connection string you set in Task 1, so you connect as yourself, with your own login.

```bash
dotnet run --project week-11/RequestLine
```

- **`Your instructor's initials:`** — the ones your instructor gives you. They pick out your instructor's database, `DB_KDXR_156101411_` and the initials.
- **`Your name, as the DJ should say it`** — whatever you'd like read out. Press **Enter** with nothing typed to see everybody else's requests; `q` hangs up.
- **`What would you like to hear?`** — a song, or a dedication.

**You can read the requests and add one. You can't change or delete anybody's, your own included,** and the database writes your login on every row you add. [The notes say how](../lecture-notes.md#the-request-line-one-table-many-logins).

| What you see | What it means |
|---|---|
| `Nobody answered.` | The line isn't open yet, or the initials are wrong. |
| `Your login failed.` | Your Task 1 connection string. The desk can't connect either. |
| `No connection string.` | Task 1b. |

## Now try to break it

```bash
dotnet run --project week-11/Lab
```

- **Take the `!` out of `!_songs.Any(...)`**, so `Save` takes out the rows the list **does** hold. Run my checks: check 3 is red. Now run the desk, pull nothing, and quit. ⚠️ **Look at `dbo.Songs`: empty.** `Save` took out every cart you kept. Put the `!` back and run the desk once more. The table was empty, so the desk started from its three carts again, with new `Id`s.
- **Pull all three carts**, then quit. `dbo.Songs` is empty. Run the desk again: **the three carts are back**, with new `Id`s. An empty table is what the first night looks like, so `Load` keeps the carts `Program.cs` starts with. Since tonight, an empty table can also mean somebody pulled every cart, and the desk can't tell the two apart.
- **Turn your wifi off and run `dotnet test week-11/Lab.Checks`.** All three pass. **Now run the desk.** That is the difference between what my checks prove and what they don't.

## ⭐ Done early?

None of these has a check.

1. ⭐ **Save as it happens.** Right now the rotation is only saved when you press `q`. Air the hour with `a`, then stop the desk with <kbd>Ctrl+C</kbd> (the same key on Mac and Windows) instead of `q`, and run it again: the plays are gone. [The notes show the two lines that fix it](../lecture-notes.md#saving-as-it-happens), in `Program.cs`. Add them, and try the same thing again.
2. **Take a row out behind the desk's back.** In the SQL Server view, right-click your database → **New Query**, and run `DELETE FROM Songs WHERE Title = 'Slack Water';`. Then run the desk and press `t`: two carts. The desk reads whatever the table holds.
3. **Use your instructor's `x`.** Take Teodoro off the switchboard, quit, and run the desk again. Your copy of `Switchboard.cs` has the same second loop as your `Rotation`, so Teodoro stays off.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-11/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-11/Lab.Checks`. |
| `dotnet ef` : command not found | Task 1a. If it's installed and still not found, close and reopen the terminal. |
| `No secrets configured for this application.` | Week 11's store is empty. Task 1b's `set`. |
| `The ConnectionString property has not been initialized.` | The desk found no connection string. **`dotnet user-secrets list --project week-11/Lab`** says what's in the store. |
| `Keyword not supported: 'connectionstrings:desk'.` | You pasted the whole line `list` printed, key included. Run Task 1b's `set` again with only what comes after `ConnectionStrings:Desk = `. |
| `There is already an object named 'Callers' in the database.` | You ran `database update` without the `drop` first. Run Task 1c's two commands, in order. |
| `An exception has been raised that is likely due to a transient failure` … `Cannot open database "DB_…"` | The database isn't made yet. Task 1c's `dotnet ef database update`. |
| `Login failed for user` | Wrong login or password in the connection string. Run Task 1b's `set` again; `set` replaces. |
| `The certificate chain was issued by an authority that is not trusted` | `TrustServerCertificate=True` is missing from the end of the connection string. |
| Your password has a `$` in it and the connection string goes wrong | The shell is reading the `$`. Put the connection string in **single** quotes instead of double. |
| `No cart called "Long Way Round"` after Task 2 | Your `Remove` still hands back `false`, or compares the wrong thing. It is `Find(title)`, then `_songs.Remove(found)`. |
| Check 2 red: *Remove said true, and the rotation still holds* | `Remove` hands back `true` without `_songs.Remove(found);`. |
| Check 3 red: *🚧 blocked* | Check 2 first. |
| Check 3 red: *the table still has its row* | No second loop in `Save` yet, or it is after `db.SaveChanges()`. It goes before. |
| `dbo.Songs` is empty after a run where you pulled nothing | The `!` is missing from `!_songs.Any(...)`. [Now try to break it](#now-try-to-break-it), first item. |
| `CS0103: The name 'row' does not exist` | `row` is the loop's own name for each row. It goes in the `foreach`: `foreach (Song row in db.Songs.ToList())`. |
| `Assert.Equal() Failure` … `Expected: 1` `Actual: 2` in your fact | That is the red you want, before the fix. After the fix, check the second loop is in `Save`. |
| The SQL Server view still shows a pulled cart | Right-click the table → **Select Top 1000** again. The view doesn't refresh on its own. |
| My checks pass and the desk can't connect | **That is exactly right.** My checks never touch the server. Only the desk tests your connection string. |
| Red squiggles, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 11 lab: a pulled cart stays pulled"
> ```

**Prev:** [Week 10 Lab — The Carts Move In](../../week-10/lab/) · **Next:** [Week 11 Homework — A Record Comes Off](../homework.md)
