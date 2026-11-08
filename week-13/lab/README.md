# Week 13 Lab — The Delivery 📻

It's 4 AM at **KDXR 88.1, "The Owl,"** and the music director has left a file of new carts on the desk. The desk can read it. It can also be handed the wrong name, a file that died halfway through saving, or a cart that is minus 198 seconds long. The first two end the shift in a wall of error text. The third gets in without a word.

Your job: run each failure and watch it crash, then pick the right answer for it. There are four: **ask again, say no, throw, or stop.** Your instructor does the same to the switchboard, a piece at a time, just before you do it to the rotation.

**Time:** tonight's lab comes in short blocks, each one right after the part of the demo it practices. **Target tonight: all five checks green, and a desk you can't crash with a bad file.**

> [!IMPORTANT]
> **Setup starts the week with a fresh database.** It drops the one you have and makes it again. That is on purpose: everybody's desk starts from the same three carts tonight.

> [!NOTE]
> **Missed a week?** You're not behind. Every file ships finished except the ones the tasks name. If you missed week 11 or 12, Setup has a box for your connection string.

> [!NOTE]
> **Tonight your instructor works on the same desk.** In class you watch the **switchboard** learn each answer, then copy those finished files into your project. They're your worked example: the same moves you're about to make on the **rotation**. Working at home? The files are already in the starters repo, all of them finished, and the copy commands work the same.

## Setup

Six steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

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
cp -r ../dotnet-db-starters/week-13 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-13` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-13`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — three projects, and a folder of files this time:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ …
└─ week-13/                ← the folder you just copied in
   ├─ Lab/                 ← the desk — RotationDesk.cs is new, and most of tonight happens there
   ├─ Lab.Tests/           ← YOURS — thirteen facts ship written; you add one tonight
   ├─ Lab.Checks/          ← my checks — read-only
   └─ deliveries/          ← six files to read in: some good, some not
```

**4. Reload the window.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.

VS Code worked out what was in this folder **when you opened it**, and `week-13` wasn't there then — so until you reload, perfectly good code comes up with red squiggles under it.

> [!CAUTION]
> **`.NET: Restart Language Server` does not fix this. Only a window reload does.** If the squiggles are there but `dotnet test` runs, believe `dotnet test`.

**5. Run my checks** — from the terminal, naming the week. This also builds the desk, which the next step needs.

```bash
dotnet test week-13/Lab.Checks
```

**1 / 5 passing.** Check 1 is everything the desk already does, database included, and it stays green all night. **The four red ones are tonight's tasks** — read their names; they're the map.

**6. A fresh database.** **Drop it, then make it again from this week's migrations.** Two commands, in this order:

```bash
dotnet ef database drop --force --project week-13/Lab
```

```
Dropping database 'DB_KDXR_156101411_YOURINITIALS' on server 'YOUR-SERVER'.
Successfully dropped database 'DB_KDXR_156101411_YOURINITIALS'.
```

**`--force` means don't ask "are you sure?"** It is your lab database, and nothing in it is worth keeping. *Missed last week?* Then it may say `did not exist, no action was taken`, and that's fine.

```bash
dotnet ef database update --project week-13/Lab
```

```
Applying migration '20261023163353_TheDeskMovesIn'.
Applying migration '20261024195449_RequestsAndAirings'.
Done.
```

<details>
<summary><b>The <code>update</code> said <code>The ConnectionString property has not been initialized</code> or <code>Login failed</code>?</b> Your connection string isn't set for this week. It was set in week 11.</summary>

This week's `Lab.csproj` carries the same `UserSecretsId` as the last two weeks', so if you set your connection string in week 11 on this machine, it's already there. **Missed it, or on a lab PC that rebooted?** Set it once. Swap all four `YOUR-…` parts. The server name is in Canvas; the login and password are your college SQL account.

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "Server=YOUR-SERVER;Database=DB_KDXR_156101411_YOURINITIALS;User Id=YOUR-LOGIN;Password=YOUR-PASSWORD;TrustServerCertificate=True" --project week-13/Lab
```

Then run the `drop` and the `update` again.

</details>

> [!IMPORTANT]
> **Your homework lives in your project repo, in its own window** — [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it: tonight the rotation reads a delivery file, and the homework has your registry do the same with a file of names.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 13: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-13/Lab.Checks`, `dotnet test week-13/Lab.Tests` and `dotnet run --project week-13/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

> [!NOTE]
> **In class, stop here.** Task 1 comes after the next part of the demo. Working at home? Carry straight on.

## Where tonight's work happens

| Command | Whose | What it answers |
|---|---|---|
| `dotnet run --project week-13/Lab` | the desk | what any of it looks like, **and the only way to see a crash the way a person sees it** |
| `dotnet test week-13/Lab.Checks` | mine | *can the desk do it?* — 1, then 2 at Task 1, 3 at Task 2, 4 at Task 3, 5 at Task 4 |
| `dotnet test week-13/Lab.Tests` | **yours** | *did the rule I wrote down hold?* — 13 facts, 14 at Task 3, then 15 |

| File | What it is |
|---|---|
| `Lab/RotationDesk.cs` | **Yours.** The keys that talk to a person about the carts: `p` in Task 1, and `i` in Tasks 2 and 3 |
| `Lab/Rotation.cs` | **Yours.** `Import` in Task 3. It does the thinking, and it never prints a word |
| `Lab/Program.cs` | **Yours, in Task 4 only.** Two pieces at the top level |
| `Lab.Tests/DeskTests.cs` | **Yours.** You write one fact in it in Task 3 |
| `Lab/SwitchboardDesk.cs`, `Lab/Switchboard.cs` | **Your instructor's.** You copy the finished files in at each task and read them as you work. You never edit them |
| `Lab.Tests/DayListTests.cs` | **Your instructor's fact**, copied in at Task 3 |
| `Lab.Checks/DeskChecks.cs` | My five. **Read-only, as always.** |

> [!IMPORTANT]
> **My checks never touch the college's server.** They hand your `DeskContext` a table that lives inside the test run, so they pass with the wifi off. Checks 2 and 3 **type at your desk code for you**: they feed `RotationDesk` a few lines of input and look at the rotation afterward.

## The four answers

| The answer | When | Tonight |
|---|---|---|
| **Ask again** | the person at the keyboard can fix it | a title with a typo, a wrong path |
| **Say no** | the answer is simply no, and the program carries on | a damaged file, a title that's already in the rotation |
| **Throw** | a method can't do its job, and somebody else has to decide what happens | a cart with no length |
| **Stop** | the program can't carry on | a row that has gone, a database it can't reach |

## The tasks

**The rhythm is the same every time:** run the desk and *watch it go wrong* → write the code → run the desk again and *see the difference* → run my checks. **Commit at the end of every task** — each task hands you the message to paste.

Every task tells you exactly what to write and the syntax you need. **Putting it together is your job.** If you get stuck, each task has a **Stuck? Show me the shape** box underneath it — click it and the whole thing is there.

| # | Check | What to do |
|---|-------|------------|
| 1 | `AWrongTitleAsksAgain` | Ask again: a wrong title on `p` keeps asking, and Enter gives up. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `TheDeskCatchesABadFile` | `try` and `catch`: a wrong path asks again, and a damaged file says no. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `ABadFileAddsNothing` | A fact first, then `Import` throws, and a bad file adds nothing. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheDeskStopsInASentence` | A row gone or no database: the desk stops in a sentence. **[Task 4 in full ↓](#task-4-in-full)** |

---

### Task 1 in full

**Ask again: a wrong title on `p` keeps asking, and Enter gives up.**

**Check:** `Check2_AWrongTitleAsksAgain`

**First, bring in your instructor's code.** Pull the starters clone, then copy one file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-13/SwitchboardDesk.cs week-13/Lab/
```

Open `week-13/Lab/SwitchboardDesk.cs` and find **`TakeACallerOff`**: a `while (true)` around the prompt, with two ways out. **Your `p` key is about to get the same shape.**

**Now watch it. Run the desk: DJ name, then `p`, then `Slack Watr`, then `q`.** `p` pulls a cart off the rotation.

```bash
dotnet run --project week-13/Lab
```

```
  No cart called "Slack Watr" in the rotation.
```

**The desk said no, which is fine, and forgot the question, which isn't.** To fix one letter you'd press `p` and start over.

**Open `week-13/Lab/RotationDesk.cs`. Its `// TODO — Task 1` comment sits above `PullACart`** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 1:` finds it, one hit. Delete the comment. Then change the method so it does this, in this order:

- **`while (true)`** around all of it. A loop with no end of its own: the only ways out are the `return` lines inside it.
- **The prompt:** `"  Pull which cart? Title (Enter to give up): "`.
- **`string? typed = Console.ReadLine();`** — the `?` because `ReadLine` hands back `null` when the input ends.
- **`if (string.IsNullOrWhiteSpace(typed))`, then `return;`** — the first way out. Enter gives up.
- **`string title = typed.Trim();`**
- **`if (rotation.Remove(title))`**: what's there now, the save and the `Pulled:` line, and then **`return;`** — the second way out.
- **After that `if`, the `No cart called` line**, with no `else`. Nothing leaves the loop there, so it goes around and asks again.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Paste this inside `PullACart`, over everything between its `{` and its `}`:

```csharp
        while (true)
        {
            Console.Write("  Pull which cart? Title (Enter to give up): ");
            string? typed = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(typed))
            {
                return;
            }

            string title = typed.Trim();

            if (rotation.Remove(title))
            {
                rotation.Save(db);
                AnsiConsole.MarkupLine($"  [{Coral}]Pulled:[/] [{Violet}]{Markup.Escape(title)}[/] "
                    + $"[{Dim}]- {rotation.Count} {(rotation.Count == 1 ? "cart" : "carts")} left in the rotation.[/]");
                return;
            }

            AnsiConsole.MarkupLine($"  [{Dim}]No cart called[/] [{Fg}]\"{Markup.Escape(title)}\"[/] "
                + $"[{Dim}]in the rotation.[/]");
        }
```

</details>

**Run the desk: DJ name, then `p`, then `Slack Watr`, then press Enter to give up, then `q`.**

```bash
dotnet run --project week-13/Lab
```

```
  No cart called "Slack Watr" in the rotation.
  Pull which cart? Title (Enter to give up):
```

**It said no, and asked again.** Enter took you back to the menu, and Slack Water is still in the rotation.

**Then my checks:**

```bash
dotnet test week-13/Lab.Checks
```

**2 / 5 — checks 1 and 2.**

**Commit it:**

```
week 13 lab: a wrong title asks again
```

> [!NOTE]
> **In class, stop here.** Task 2 comes after the next part of the demo. Finished early? Run the desk and press `x`, then type a name nobody has: that's your instructor's copy of the same loop. Working at home? Carry straight on.

📖 *Further reading:* [four answers](../lecture-notes.md#four-answers) · [ask again](../lecture-notes.md#ask-again).

---

### Task 2 in full

**`try` and `catch`: a wrong path asks again, and a damaged file says no.**

**Check:** `Check3_TheDeskCatchesABadFile`

**First, bring in your instructor's code.** Pull, then copy one file in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-13/SwitchboardDesk.cs week-13/Lab/
```

Open `week-13/Lab/SwitchboardDesk.cs` and find **`TakeDayList`**: one `try`, two `catch` blocks, and only one of them has a `return` in it.

**Now crash it, twice.** `i` takes a delivery of carts. **Run the desk: DJ name, then `i`, then this path, with no dash in it:**

```bash
dotnet run --project week-13/Lab
```

```text
week-13/deliveries/newcarts.json
```

**The shift is over.** Scroll up to the line starting `Unhandled exception`. It names the exception: **`System.IO.FileNotFoundException`**.

**Again, with a file that is there but damaged:**

```bash
dotnet run --project week-13/Lab
```

```text
week-13/deliveries/damaged-carts.json
```

This time it's **`System.Text.Json.JsonException`**. **Open that file:** it stops halfway through a word.

**Two crashes, two answers.** A wrong path is a typing mistake, so the person can fix it: ask again. A damaged file won't be any better if you type its name twice: say no.

**Open `week-13/Lab/RotationDesk.cs`. The `// TODO — Task 2` comment sits above `TakeDelivery`** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 2:`, one hit. Delete the comment. Then change the method so it does this, in this order:

- **`while (true)`** around all of it, with the prompt `"  Delivery file (Enter to give up): "`, `string? typed`, and **Enter gives up**, the same as Task 1.
- **`string path = typed.Trim();`**
- **`try { … }`** around the three lines that are there now: the `Import`, the `Save` and the `Delivered:` line. Then **`return;`** as the last line inside the `try`.
- **`catch (IOException)`** directly under the `try`'s `}`. It prints a line saying there's no file at that path, and nothing else, so the loop asks again. `IOException` covers a missing file and a missing folder.
- **`catch (JsonException)`** under that. It prints `Refused:` and that nothing was added, then **`return;`** back to the menu.

**`JsonException` needs a using line.** Put **`using System.Text.Json;`** directly under `using Spectre.Console;` at the top of the file:

```csharp
using System.Text.Json;
```

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Paste this inside `TakeDelivery`, over everything between its `{` and its `}`:

```csharp
        while (true)
        {
            Console.Write("  Delivery file (Enter to give up): ");
            string? typed = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(typed))
            {
                return;
            }

            string path = typed.Trim();

            try
            {
                int added = rotation.Import(path);
                rotation.Save(db);

                AnsiConsole.MarkupLine($"  [{Coral}]Delivered:[/] [{Fg}]{added} new[/] "
                    + $"[{Dim}]- {rotation.Count} carts in the rotation.[/]");
                return;
            }
            catch (IOException)
            {
                AnsiConsole.MarkupLine($"  [{Dim}]No file at[/] [{Fg}]\"{Markup.Escape(path)}\"[/][{Dim}].[/]");
            }
            catch (JsonException)
            {
                AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]that file is damaged.[/] [{Dim}]Nothing was added.[/]");
                return;
            }
        }
```

</details>

**Run the desk: DJ name, then `i`, then the wrong path, then press Enter to give up. Then `i` again with the damaged file, then `q`.**

```bash
dotnet run --project week-13/Lab
```

```
  Refused: that file is damaged. Nothing was added.
```

**Your wording is yours;** what matters is that the desk is still alive after both. **Now the good file. Run the desk: DJ name, then `i`, then this path, then `t`, then `q`.** `t` shows the carts.

```bash
dotnet run --project week-13/Lab
```

```text
week-13/deliveries/new-carts.json
```

```
  Delivered: 2 new - 5 carts in the rotation.
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │ -           │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │ -           │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │ -           │
│ Harbor Lights  │ The Ferrymen     │ 4:04   │ 0      │ -           │
│ Night Freight  │ Marguerite Vance │ 3:18   │ 0      │ -           │
```

**Three carts in the file, two new.** Nightjar was already in the rotation, so `Import` left it out, and the count says so.

**Then mine:**

```bash
dotnet test week-13/Lab.Checks
```

**3 / 5 — checks 1, 2 and 3.**

**Commit it:**

```
week 13 lab: the desk catches a bad file
```

> [!NOTE]
> **In class, stop here.** Task 3 comes after the next part of the demo. Finished early? Open `week-13/Lab/Rotation.cs` and read `Import`: there isn't a `try` or a `Console` in it. Working at home? Carry straight on.

📖 *Further reading:* [try and catch](../lecture-notes.md#try-and-catch) · [catch by name](../lecture-notes.md#catch-by-name).

---

### Task 3 in full

**A fact first, then `Import` throws, and a bad file adds nothing.**

**Check:** `Check4_ABadFileAddsNothing`

**First, bring in your instructor's code.** Pull, then copy three files in:

```bash
git -C ../dotnet-db-starters pull
```

```bash
cp ../dotnet-db-starters/demo/week-13/SwitchboardDesk.cs week-13/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-13/Switchboard.cs week-13/Lab/
```

```bash
cp ../dotnet-db-starters/demo/week-13/DayListTests.cs week-13/Lab.Tests/
```

**Then rebuild everything, once.** On Windows a copied file keeps its old date, and `dotnet` can decide nothing has changed and skip it:

```bash
dotnet build week-13/Lab --no-incremental
```

Open `Switchboard.cs` and find **`Import`**: a `foreach` that only checks, then a second `foreach` that adds. `DayListTests.cs` is your instructor's fact about it.

```bash
dotnet test week-13/Lab.Tests
```

**14 passed** — your seven, and your instructor's seven.

**Now look at a file that lies.** `bad-carts.json` is good JSON. Its last cart is minus 198 seconds long. **Run the desk: DJ name, then `i`, then this path, then `t`, then `q`.**

```bash
dotnet run --project week-13/Lab
```

```text
week-13/deliveries/bad-carts.json
```

**The bad cart gets in, whatever else happens.** If you ran Task 2's good file, it's the only new one:

```
  Delivered: 1 new - 6 carts in the rotation.
```

```
│ Dead Air       │ Nobody At All    │ 0:00   │ 0      │ -           │
```

**No crash, and a cart with no length is on your rotation.** `Song.Seconds` refused the number quietly, so the cart came in at `0:00`. Quiet was right for a person at a prompt. A file has nobody to tell.

**Take it back out. Run the desk: DJ name, then `p`, then `Dead Air`, then `t`, then `q`.**

```bash
dotnet run --project week-13/Lab
```

```
  Pulled: Dead Air - 5 carts left in the rotation.
```

```
│ Nightjar       │ The Lamplighters │ 3:47   │ 0      │ -           │
│ Slack Water    │ Marguerite Vance │ 4:12   │ 0      │ -           │
│ Long Way Round │ The Ferrymen     │ 5:31   │ 0      │ -           │
│ Harbor Lights  │ The Ferrymen     │ 4:04   │ 0      │ -           │
│ Night Freight  │ Marguerite Vance │ 3:18   │ 0      │ -           │
```

**Dead Air is gone from the rotation, and from its table.**

#### First, the fact — before you touch `Import`

**Write it in `week-13/Lab.Tests/DeskTests.cs`, in place of its `// TODO — Task 3` comment** — <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3:`, one hit. It is your instructor's `ABadListAddsNobody`, with carts:

- **Set the scene.** A path in the temp folder: `Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json")`. Then `File.WriteAllText` puts a small bad file there: one good cart, one with a length below 1.
- **The file's text goes between three quotes** — `"""` — so the quotes inside it need no backslashes.
- **Do the thing and check the answer in one line:** **`Assert.Throws<InvalidDataException>(() => rotation.Import(path));`** runs the code in its brackets, and passes only if that exception comes out.
- **Check the other half:** the rotation still holds **0** carts.
- Name the fact after the rule it proves. Mine is `ABadDeliveryAddsNothing`; yours doesn't have to be.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
    [Fact]
    public void ABadDeliveryAddsNothing()
    {
        string path = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
        File.WriteAllText(path, """
            [
              { "Title": "Harbor Lights", "Artist": "The Ferrymen", "Seconds": 244 },
              { "Title": "Dead Air", "Artist": "Nobody At All", "Seconds": -198 }
            ]
            """);

        Rotation rotation = new Rotation();

        Assert.Throws<InvalidDataException>(() => rotation.Import(path));
        Assert.Equal(0, rotation.Count);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test week-13/Lab.Tests
```

```
  Failed Lab.Tests.DeskTests.ABadDeliveryAddsNothing
  Error Message:
   Assert.Throws() Failure: No exception was thrown
```

**Red, and it is the same thing you just saw on the desk.**

#### Now the fix

**In `week-13/Lab/Rotation.cs`, `Import` is the last method.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Task 3:`, one hit, finds the comment above it; delete that comment. Under the `List<Song> delivered` line, with a blank line above it, add **a `foreach` that only checks**:

- **`if (song.Seconds < 1)`**, a cart with no length.
- **`throw new InvalidDataException($"\"{song.Title}\" has no length.");`** — `throw` stops `Import` right there, and hands the problem back to the code that called it: your `TakeDelivery` in `RotationDesk`.

⚠️ **It has to be its own loop, above the one that adds.** Put the `throw` inside the adding loop and the good carts ahead of the bad one are already in by the time it fires, and my check says so.

<details>
<summary><b>Stuck? Show me the shape</b></summary>

```csharp
        // The whole file first: a bad cart throws before any cart is added.
        foreach (Song song in delivered)
        {
            if (song.Seconds < 1)
            {
                throw new InvalidDataException($"\"{song.Title}\" has no length.");
            }
        }
```

</details>

```bash
dotnet test week-13/Lab.Tests
```

**15 passed.** Now the desk, with the same file. **Run it: DJ name, then `i`, then this path.**

```bash
dotnet run --project week-13/Lab
```

```text
week-13/deliveries/bad-carts.json
```

**The fact is green, and the desk crashed**, with `System.IO.InvalidDataException`. **That is correct.** `Import` did its job and threw. Nobody has caught it yet.

**Back in `week-13/Lab/RotationDesk.cs`, add a third `catch`, directly under the `}` that closes `catch (JsonException)`.** Writing a name after the exception's type gives you the exception itself, and **`problem.Message`** is the sentence `Import` wrote:

```csharp
            catch (InvalidDataException problem)
            {
                AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]{Markup.Escape(problem.Message)}[/] [{Dim}]Nothing was added.[/]");
                return;
            }
```

**Run the desk: DJ name, then `i`, then the same path, then `t`, then `q`.**

```bash
dotnet run --project week-13/Lab
```

```
  Refused: "Dead Air" has no length. Nothing was added.
```

**Then mine:**

```bash
dotnet test week-13/Lab.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.**

**Commit it:**

```
week 13 lab: a bad file adds nothing
```

> [!NOTE]
> **In class, stop here.** Task 4 comes after the next part of the demo. Finished early? Press `l` and read `week-13/deliveries/bad-list.json` in: your copy of the instructor's `SwitchboardDesk.cs` refuses it too. Working at home? Carry straight on.

📖 *Further reading:* [throw](../lecture-notes.md#throw) · [check the whole file first](../lecture-notes.md#check-the-whole-file-first).

---

### Task 4 in full

**A row gone or no database: the desk stops in a sentence.**

**Check:** `Check5_TheDeskStopsInASentence`

**Nothing to copy this time.** `Program.cs` is yours for this task, so you write the same lines your instructor just did.

**First, crash it with two desks on one database.** In the terminal, **run the desk: DJ name, and leave it sitting at the menu.**

```bash
dotnet run --project week-13/Lab
```

**Click **+** at the top of the terminal panel for a second terminal.** **Run a second desk there: DJ name, then `p`, then `Slack Water`, then `q`.** `--no-build` skips the build, because the first desk just did it:

```bash
dotnet run --no-build --project week-13/Lab
```

**Click back to the first terminal and press `a`.** `a` puts the hour on air, and the rotation saves right after.

The first line after the `ON AIR` lines names it: **`Microsoft.EntityFrameworkCore.DbUpdateException`**. The first desk was still holding Slack Water in its list, so it tried to save an airing for a cart with no row. **Every airing must have a cart attached to it.** Asking again won't help, and every save from here would fail the same way, so **this answer is stop.**

**Open `week-13/Lab/Program.cs`. There are two `// TODO — Task 4` comments.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for this one, one hit:

```text
// TODO — Task 4: if a row is gone
```

**Replace that comment with these lines,** the top half of a `try` that wraps the whole shift:

```csharp
// A row the desk is holding can go from its table while the desk is open.
// Nothing can be saved after that, so the desk stops, in a sentence.
try
{
```

**Then <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `Keep it quiet out there`, one hit. On a new line directly under that line**, the `}` that closes the `try`, and the `catch`:

```csharp
}
catch (DbUpdateException)
{
    Console.WriteLine();
    Console.WriteLine("A row this desk was holding has gone from its table, so the desk can't save.");
    Console.WriteLine("Everything up to the last save is safe. Run the desk again to pick up from there.");
    return;
}
```

**`DbUpdateException` needs a using line.** Directly under `using Spectre.Console;` near the top of the file:

```csharp
using Microsoft.EntityFrameworkCore;
```

**Tidy the indenting with Format Document:** <kbd>⇧⌥F</kbd> / <kbd>Shift+Alt+F</kbd>.

**Two desks again.** First terminal: **run the desk, DJ name, and leave it at the menu.**

```bash
dotnet run --project week-13/Lab
```

Second terminal: **run a desk, DJ name, then `x`, then `Bex`, then `q`.**

```bash
dotnet run --no-build --project week-13/Lab
```

**Click back to the first terminal and press `q`.** `q` saves everything the desk is holding, and it's still holding Bex.

```
A row this desk was holding has gone from its table, so the desk can't save.
Everything up to the last save is safe. Run the desk again to pick up from there.
```

**Now the other way a desk has to stop.** <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for this, one hit:

```text
// TODO — Task 4: the desk should say so
```

**Replace that comment with these lines.** `CanConnect` tries the database and hands back `true` or `false`, with no exception to catch:

```csharp
// No database, no shift. Nothing the desk does works without it.
if (!db.Database.CanConnect())
{
    Console.WriteLine("The desk can't reach its database, so the shift can't start.");
    Console.WriteLine("Check your network and your connection string, then run it again.");
    return;
}
```

**Turn your wifi off and run the desk.** It waits about fifteen seconds:

```bash
dotnet run --project week-13/Lab
```

```
The desk can't reach its database, so the shift can't start.
Check your network and your connection string, then run it again.
```

**Turn your wifi back on.** Then run the desk once more, to prove it's back: DJ name, then `q`.

```bash
dotnet run --project week-13/Lab
```

> [!NOTE]
> **On a lab PC, or can't turn the network off?** Skip that run and read the block above. Your check doesn't need it.

**Then mine:**

```bash
dotnet test week-13/Lab.Checks
```

**5 / 5.**

**Commit the shift:**

```
week 13 lab: the desk stops in a sentence
```

**Four commits after the starter, five green checks, fifteen facts, and a desk that gives one of four answers instead of a wall of error text.**

> [!NOTE]
> **In class, stop here.** Finished early? Try [Now try to break it](#now-try-to-break-it), or help the person next to you. Working at home? Carry straight on to [the homework](../homework.md).

📖 *Further reading:* [stop](../lecture-notes.md#stop) · [what a save does when it fails](../lecture-notes.md#what-a-save-does-when-it-fails) · [why not save in finally](../lecture-notes.md#why-not-save-in-finally).

---

## Now try to break it

```bash
dotnet run --project week-13/Lab
```

- **Type a folder instead of a file:** `i`, then `week-13/deliveries`. The desk crashes with `UnauthorizedAccessException`. Your `catch` blocks only cover what you thought of. Add a fourth, and put it where you think it goes: is that ask again, or say no?
- **Move the `throw` into the adding loop**, below the `Add`. Your fact goes red at `Assert.Equal`, and my check 4 says the good carts got in. Put it back.
- **Take the `return;` out of `catch (JsonException)`.** The desk still works, and it asks again for a file that can't get better. Put it back.
- **Open a third desk.** Pull a cart in one and make a request in another. Which key crashes, and which one saves fine?

## ⭐ Done early?

None of these has a check.

1. ⭐ **Try saving in `finally`.** Add this under the `catch (DbUpdateException)` block in `Program.cs`, run the desk, and press <kbd>Ctrl+C</kbd> at the menu. Nothing prints: `finally` doesn't run on <kbd>Ctrl+C</kbd>. [The notes say why the desk doesn't save this way](../lecture-notes.md#why-not-save-in-finally). Take it back out.
   ```text
   finally
   {
       Console.WriteLine("finally ran");
   }
   ```
2. **Ask again on `f`.** `FindACart` in `Program.cs` asks once. Give it the same loop.
3. **Ask again on `r`.** Your `TakeRequest` in `Program.cs` falls back to *whatever's next* on a song number it can't read. Make it ask again, with Enter still meaning *whatever's next*.
4. **Read the exception's type off the screen.** Crash the desk any way you like, scroll up to `Unhandled exception`, and find the same name in [the notes' table](../lecture-notes.md#every-crash-so-far).

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `cp: … demo/week-13/…: No such file or directory` | Your instructor hasn't pushed that file yet, or your starters clone isn't pulled. Run `git -C ../dotnet-db-starters pull` and try again. |
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-13/Lab.Checks`. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that has never been built. Run `dotnet test week-13/Lab.Checks` once, then the `dotnet ef` command again. |
| `There is already an object named 'Airings' in the database.` | You ran `database update` without the `drop` first. Setup step 6's two commands, in order. |
| `The ConnectionString property has not been initialized.` | Your connection string isn't set for this week's id. The box under Setup step 6. |
| `Login failed for user` | Wrong login or password in the connection string. `dotnet user-secrets set` again; `set` replaces. |
| `CS8600` or `CS8602` on `typed` | `string typed` needs its `?`, because `ReadLine` can hand back `null`: `string? typed`. |
| `CS0246` … `'JsonException'` | `RotationDesk.cs` is missing `using System.Text.Json;` at the top. |
| `CS0246` … `'DbUpdateException'` | `Program.cs` is missing `using Microsoft.EntityFrameworkCore;` near the top. |
| `CS0103: The name 'title' does not exist` in `RotationDesk.cs` | A line that uses `title` sits above `string title = typed.Trim();`. |
| Check 2 red: *still going after ten seconds* | Your loop doesn't leave when the input ends. `if (string.IsNullOrWhiteSpace(typed))`, then `return;`, right after `ReadLine`. |
| Check 2 red: *stopped listening* | No `while (true)` yet, or a `return` after the `No cart called` line. |
| Check 3 red: *crashed with FileNotFoundException* | No `catch (IOException)` yet, or the `try` doesn't reach the `Import`. |
| Check 3 red: *a damaged file, then a good one* | `catch (JsonException)` has no `return;`, so it asked again. |
| Check 4 red: *threw nothing* | That is Task 3's fix: the checking `foreach`, and the `throw`. |
| Check 4 red: *The two good carts … got in* | Your `throw` is in the adding loop. One loop checks every cart; a second one adds. |
| Check 4 red: *crashed with InvalidDataException* | `Import` is right. `RotationDesk` needs `catch (InvalidDataException problem)`. |
| `ABadListAddsNobody` is red in your suite, and you haven't touched it | Your copy of `Switchboard.cs` wasn't compiled. Task 3's `dotnet build week-13/Lab --no-incremental`. |
| Check 5 red | Task 4 has two pieces, `CanConnect` and `catch (DbUpdateException)`. The message names the missing one. |
| Your fact says `Assert.Throws() Failure: No exception was thrown` | That is the red you want, before the fix. After the fix, check the `throw` is in `Import`. |
| The desk crashes with `InvalidDataException` while your fact is green | That is right, for one run. Your fact tests `Import`. The desk needs the third `catch`. |
| My checks pass and the desk can't connect | **That is exactly right.** My checks never touch the server. Only the desk tests your connection string. |
| Red squiggles, but `dotnet test` runs | **The editor, not your code.** Command Palette → **`Developer: Reload Window`**. ⚠️ `.NET: Restart Language Server` does **not** fix it. |
| An error that isn't in this table | [The notes' troubleshooting list](../lecture-notes.md#-troubleshooting) has more of them. |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 13 lab: the desk stops in a sentence"
> ```

**Prev:** [Week 12 Lab — Every Cart Has a Log](../../week-12/lab/) · **Next:** [Week 13 Homework — Four Answers of Your Own](../homework.md)
