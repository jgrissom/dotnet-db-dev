# Week 8 Homework — It Survives the Night 💾

**20 points · due before next class — and this week that is TWO weeks out**

> [!IMPORTANT]
> **There is no class next week; it's the term break.** This homework is set today and due before the class after next. **It is not a bigger homework** — it is the same size with a week off in the middle of it. Do it this week anyway, while tonight is still in your hands.

Your registry has been perfect and temporary since week 4. Tonight it gets a file, and [the record you have been building all term stops dying with the process](lecture-notes.md#the-log-stops-being-gone).

**This homework is the lab again, on your own project.** Same four tasks, same order, same steps. Where the lab said `Rotation`, `Song` and `_songs`, you use your `Registry`, your record type, and the list inside your `Registry`. If you finished the lab, you have already done every step once.

Two new members, and their signatures are part of the deal the way every dictated name has been: **`public void Save(string path)`** and **`public void Load(string path)`**. Both take the path. Neither one knows a file name — the lab showed you why: your program and your tests run from different folders.

> [!TIP]
> **Keep the [lab](lab/README.md) open in a second tab.** Each task below is the lab task with the same number. Every task also has a **Stuck? Show me the shape** box, written with placeholder names like `YourRecord` — swap in your own names before it will build.

---

## Part 1 — Catch up, branch, and bring in this week's checks

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then week 4 is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, and weeks [5](../week-05/homework.md), [6](../week-06/homework.md) and [7](../week-07/homework.md) add what this week's check 1 re-verifies. Do those first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b the-log-book
```

**Then bring in this week's checks.** They ship in the starters clone and **they are different every week.** Pull the clone first:

```bash
git -C ../dotnet-db-starters pull
```

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-08/Project.Checks .
```

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** This week's `Project.Checks` holds **four** checks. If `dotnet test Project.Checks` lists **two**, you are running **week 7's** — come back and run the two commands above.

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 4.** The green one is check 1 — weeks 4 through 7, still holding, and it stays green every week from here. The other three are tonight's, and they are all red because your registry cannot yet write anything down.

**Commit it** — the week as you started it, the same commit the lab's Setup made:

```bash
git add .
git commit -m "week 8: this week's checks"
```

---

## Part 2 — The tasks

**Two suites this week, so two counts** — the same two the lab had:

- **Mine:** `dotnet test Project.Checks` — climbs **1 → 2 → 3 → 4** as you build it.
- **Yours:** `dotnet test Project.Tests` — the suite you made last week. It has **4 facts** in it now and gains one more at Task 4.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToSevenStillHold` | mine | Run your program twice, and see what doesn't survive. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `Check2_TheRegistryWritesItselfDown` | mine | Write `Save`, and call it. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_TheRegistrySurvivesARestart` | mine | Write `Load`, and call it. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_ARecordKeepsItsOwnFacts` | mine | The number that comes back wrong. **[Task 4 in full ↓](#task-4-in-full)** |
| 4 | `Week8_TheRegistrySurvivesARestart` | **yours** | …and your own fact about it, written first. **[Task 4 in full ↓](#task-4-in-full)** |

⚠️ **Your fact's name is dictated exactly as spelled**, the way `Registry` and its members have been since week 4 — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

### Task 1 in full

Nothing to write. Find out what your program loses every time it ends — the lab's Task 1, on your own project.

**Run your program twice:**

```bash
dotnet run --project Project
```

```bash
dotnet run --project Project
```

**Both runs start from exactly the same place: your seed records.** Anything the first run did — a record added, a record removed, a verb called, a count moved — is gone by the second. If your program asks you to take one off the books, try it: name a record on the first run, and it's back on the second. If your `Program.cs` calls the verb week 5 had you write (a visit, a play, a sighting), the count it prints is the same on every run, however many times you run it.

---

### Task 2 in full

**The registry writes itself down.**

**Check:** `Check2_TheRegistryWritesItselfDown` — *mine*

**First, look for a file.** You just ran your program twice. Look at the top of your repo in the Explorer: there is no file with your records in it. Two whole runs, and nothing was written down.

**Write `Save` — in `Project/Registry.cs`.** The signature is dictated:

```csharp
public void Save(string path)
```

It does what the lab's `Save` did: turn the list into text, then put that text in the file at `path`.

- **`JsonSerializer.Serialize(list, options)`** hands back one `string` holding the whole list as JSON. The list is the one inside your `Registry` — the private field that holds your records. For the options, use `new JsonSerializerOptions { WriteIndented = true }`.
- **`File.WriteAllText(path, text)`** writes that string to the file.
- It needs **`using System.Text.Json;`** at the very top of `Registry.cs`.

⚠️ **Use the `path` that `Save` was handed**, never a file name typed inside the method.

| In the lab | In yours |
|---|---|
| `Rotation` | `Registry` |
| `_songs` | the list inside your `Registry` — written `_yourList` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `_yourList` for the name of the list inside your `Registry`, or it will not build.

```csharp
    public void Save(string path)
    {
        string json = JsonSerializer.Serialize(_yourList,
            new JsonSerializerOptions { WriteIndented = true });

        File.WriteAllText(path, json);
    }
```

</details>

**Now call it — in `Project/Program.cs`.** Two lines, the same two the lab added:

1. Right under the line that makes your registry — `var registry = new Registry();`, or however yours is written — add the path:

   ```csharp
   string registryFile = "registry.json";
   ```

2. At the very end of the file, after everything else, add the save:

   ```csharp
   registry.Save(registryFile);
   Console.WriteLine($"{registry.Count} on file, saved to {registryFile}.");
   ```

   The second line is there so you can see that it happened.

**Run it:**

```bash
dotnet run --project Project
```

The last line says how many records went into the file. **Now look at the top of your repo** — `registry.json` is there. Open it. That is your registry, on disk, and it outlived the program. Every property the serializer could read went into it — including your **sealed** property: the one with a `private set`, which only your verb can change.

> [!NOTE]
> **Committing `registry.json` is fine and so is not committing it** — it is data your program made, not code you wrote. Nothing is graded either way. *(Don't add it to `.gitignore`; [that file has been four lines since week 1 and it stays four lines](../week-01/lecture-notes.md).)*

**Then mine:**

```bash
dotnet test Project.Checks
```

**2 / 4.**

```bash
git add .
git commit -m "The registry writes itself down"
```

---

### Task 3 in full

**And reads itself back.**

**Check:** `Check3_TheRegistrySurvivesARestart` — *mine*

**First, watch the file get ignored.** Open `registry.json`, change the **name** of one of your records to something else, and save the file. Then run:

```bash
dotnet run --project Project
```

**The listing shows the old name.** Nothing reads the file. Now open `registry.json` again: your edit is gone. **The save at the end of the run wrote the seeds over it.** A program that saves without ever loading throws away whatever the file held — exactly what the lab's Task 3 showed.

**Write `Load` — in `Project/Registry.cs`**, signature dictated:

```csharp
public void Load(string path)
```

It is the lab's `Load` with your names in it:

- **`File.Exists(path)`** — when it's `false`, `return`. No file is a first run, not a failure.
- **`File.ReadAllText(path)`** hands back the whole file as one `string`.
- **`JsonSerializer.Deserialize<List<YourRecord>>(text)`** turns it back into a list of your records. It hands back a nullable list, so check for `null` and `return` if it is.
- **Clear the list inside your `Registry`** before you fill it. ⚠️ Your `Program.cs` adds its seeds *before* it calls `Load`, so without this you get every record twice.
- **A `foreach` over the loaded list**, adding each record to your list. `Deserialize` builds a new list; moving the records in is your code.

| In the lab | In yours |
|---|---|
| `List<Song>` | a list of your record type — written `List<YourRecord>` below |
| `_songs` | the list inside your `Registry` — written `_yourList` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap `YourRecord` for your record type and `_yourList` for the list inside your `Registry`, or it will not build.

```csharp
    public void Load(string path)
    {
        if (!File.Exists(path))
        {
            return;
        }

        List<YourRecord>? loaded =
            JsonSerializer.Deserialize<List<YourRecord>>(File.ReadAllText(path));

        if (loaded == null)
        {
            return;
        }

        _yourList.Clear();

        foreach (YourRecord item in loaded)
        {
            _yourList.Add(item);
        }
    }
```

</details>

**First, take out week 7's register-twice lines** — the ones that add a record with the same name a second time and print *"…twice - N on file"*. Delete the comment, the `Add` and the `Console.WriteLine`. Your week 7 test already proves the guard, so the lines have done their job, and from tonight they would get in the way: they add a record **after** `Load`, so a record you removed last run would come straight back.

**Now call it — one line in `Project/Program.cs`**, right after the last line that adds a seed record, and before your verb or the take-one-off prompt:

```csharp
registry.Load(registryFile);
```

Your seeds go in first, and then — if there is a file — what's in the file replaces them. That is the same order the lab's desk uses. ⚠️ **Below your verb is too late:** `Load` replaces the record the verb just changed, and the change is lost.

**Now prove it reads the file.** Open `registry.json` again, change a record's name, and save. Then run:

```bash
dotnet run --project Project
```

**The listing shows your new name.** That name exists nowhere in your code. Put it back or leave it — it's your data.

**Then mine:**

```bash
dotnet test Project.Checks
```

**3 / 4.**

```bash
git add .
git commit -m "And reads itself back"
```

---

### Task 4 in full

**The number that comes back wrong — and your own fact about it.**

**Checks:** `Check4_ARecordKeepsItsOwnFacts` — *mine* · `Week8_TheRegistrySurvivesARestart` — *yours*

**First, see it.** Run mine and read check 4's message — it names the exact property on *your* record that lost its value:

```bash
dotnet test Project.Checks
```

**Then open the file the check wrote** — its message ends with the full path. The value is in there. Nothing failed to write, and nothing failed to read the file. The number is on disk, in plain sight, and the record came back without it — the lab's Task 4, on your project.

**Write the fact first — in `Project.Tests/RegistryTests.cs`, under the four you already have.** The name is dictated: `Week8_TheRegistrySurvivesARestart`. The three moves are the lab's:

- **A scratch path:**

  ```csharp
  string path = Path.Combine(Path.GetTempPath(), "something-yours.json");
  File.Delete(path);
  ```

  ⚠️ **Never your program's real file.** `registry.json` belongs to your program; the test gets a file of its own.
- **Set the scene.** A `Registry`, and one record from `NewItem("a name of yours")`. Give that record a value for one property that has a public `set` — on the notes' lighthouse, `item.Condition = "lit";` — so the test can check that an everyday property comes back too, not only the sealed one. Then add the record to the registry. Then call your verb, the method that changes your sealed property. On the lighthouse that's `item.Visit(...)`, which moves `Visits` from 0 to 1.
- **Do the thing.** `Save(path)`, then a **second, empty `Registry`** called `reopened`, then `Load(path)` on *that* one. Use that name: the next lines use it.
- **Check the answer.** `Assert.Equal(1, reopened.Count)`. Then `Find` the record by its name, and assert on that property **and** the sealed one. The sealed one is the assert that goes red. For each expected value, write the value itself — the number your verb should have left, like `1` — rather than `item.YourSealedProperty`. Both go red now, but only the literal can't agree with a broken verb.

| In the lab | In yours |
|---|---|
| `Song` | your record type — written `YourRecord` below |
| `nightjar.Play()` | your verb, with whatever arguments yours takes — written `YourVerb()` below |
| `PlaysTonight` | your sealed property — written `YourSealedProperty` below |
| *(none)* | one property with a public `set`, like the lighthouse's `Condition` — written `YourProperty` below |

<details>
<summary><b>Stuck? Show me the shape</b></summary>

Swap every `Your…` name for one of yours, and put your own values where the `?` marks are, or it will not build.

```csharp
    [Fact]
    public void Week8_TheRegistrySurvivesARestart()
    {
        string path = Path.Combine(Path.GetTempPath(), "something-yours.json");
        File.Delete(path);

        Registry registry = new Registry();
        YourRecord item = registry.NewItem("a name of yours");
        item.YourProperty = ?;
        registry.Add(item);
        item.YourVerb();

        registry.Save(path);

        Registry reopened = new Registry();
        reopened.Load(path);

        Assert.Equal(1, reopened.Count);

        YourRecord? back = reopened.Find("a name of yours");

        Assert.NotNull(back);
        Assert.Equal(?, back!.YourProperty);
        Assert.Equal(?, back.YourSealedProperty);
    }
```

</details>

**Run yours, and expect red:**

```bash
dotnet test Project.Tests
```

It fails on the sealed property: **Expected** is the value your verb moved it to, and **Actual** is where it started. **Red, for the right reason.**

**The reason, and it is one sentence:** a serializer writes every property it can **read**, and reads back only the ones it can **write**. The property week 5 had you seal — `{ get; private set; }` — has no public setter, so it goes out and never comes home.

**The fix is one line above the property.** It's the lab's fix:

```csharp
using System.Text.Json.Serialization;   // at the very top of the file

[JsonInclude]
public int Visits { get; private set; }
```

`Visits` is the lighthouse's — put `[JsonInclude]` on **your** sealed property.

⚠️ **Do not make the setter public.** That would undo weeks 4 and 5. The attribute changes what the serializer is allowed to do, and nothing else.

💡 **If your record has more than one sealed property, they all need it.** The lighthouse has two, `Visits` and `LastVisit`. Check 4 names every one that lost its value.

**Run yours, green:**

```bash
dotnet test Project.Tests
```

**5 passed** — four from last week, and this one.

**Then mine:**

```bash
dotnet test Project.Checks
```

**4 / 4.**

**And run your program twice.** If it calls your verb, the count it prints now climbs by one every run — the whole week in one number:

```bash
dotnet run --project Project
```

```bash
dotnet run --project Project
```

```bash
git add .
git commit -m "A record keeps its own facts, and my fact proves it"
```

> [!NOTE]
> **Why your fact's name has the week in it and last week's had numbers.** Last week's four were named for last week's *checks*. Your suite is permanent — it grows every week from here — and check numbers restart every week, so a second week of them would have put two facts called `Check5_something` in one file. From now on a dictated fact carries the week it was written in. The four from last week stay exactly as they are.

---

## Part 3 — The pull request

```bash
git push -u origin the-log-book
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it**.

Then merge it with the plain **"Merge pull request"** button.

> [!CAUTION]
> **Not "Squash and merge", not "Rebase and merge".** Only the plain merge leaves a **merge commit**, and that's what I read out of your repo to see you did the round trip. It costs 2 points for work you actually did.

```bash
git checkout main
```

```bash
git pull
```

---

## Commit as you go

Four moments worth saving, written into the parts above at the point where each thing starts working — the checks copied in, the save, the load, and the fact with its fix. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**One URL in Canvas: your project repo.**

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Weeks 4-7 still hold — Topic, no public fields, All() copies, Find and Remove behave, IListed kept by record and registry, Everything() intact, and Add still refuses a duplicate |
| 2 | Save(string path) writes a file at the path it was handed, with the records in it |
| 3 | Load(string path) fills a fresh registry back up — count and Find both — and a missing file is a first run, not a crash |
| 3 | A record's own sealed facts survive the round trip — the private-set trap, closed |
| 2 | Your test: the registry is still there after a restart — written by you, green in your own suite |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked **nowhere** in the project repo — the `.gitignore` holding |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgment call)* |
| 2 | A merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **The grader runs both suites**: `Project.Checks` replaced wholesale as always, and `Project.Tests` **exactly as you wrote it** — then reads your fact by name. It also lists every fact it found, so a fact with the right name and nothing inside it is not a shortcut; it's a conversation.

> [!WARNING]
> **A build failure zeroes everything at once** — either project failing to compile takes both suites down. Run both `dotnet test` commands before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| **Two checks listed**, not four | You're running **week 7's** checks. [Part 1](#part-1--catch-up-branch-and-bring-in-this-weeks-checks) copies this week's in — this week lists four, starting `Check1_WeeksFourToSevenStillHold` and `Check2_TheRegistryWritesItselfDown`. |
| `CS0246: The type or namespace name 'YourRecord' could not be found` | You pasted a **Stuck?** shape without swapping the placeholder. `YourRecord` is your record type's name — the class `NewItem` hands back. |
| `CS0103: The name '_yourList' does not exist in the current context` | Same thing: `_yourList` is the name of the list field inside your `Registry`. Open `Registry.cs` and use the name you gave it. |
| `CS1525: Invalid expression term '?'` | The fact's shape still has a `?` in it. Each `?` is a value of yours: what you set `YourProperty` to (like `"lit"`), and what the sealed one should say after your verb. |
| `CS1061` naming `YourProperty`, `YourVerb` or `YourSealedProperty` | The fact's shape still has a placeholder in it. Swap each one for a real member of your record. |
| `CS0103: The name 'JsonSerializer' does not exist` | `using System.Text.Json;` at the top of `Registry.cs`. |
| `CS0246: 'JsonInclude' could not be found` | A different using, and it catches everybody: `using System.Text.Json.Serialization;` — the `.Serialization` on the end is the whole difference. |
| Check 2 red: *no file appeared* | `Save` is writing to a name of its own instead of the `path` it was handed, or it isn't writing at all. [Why the path is always handed in.](lecture-notes.md#so-hand-the-path-in) |
| Check 3 red: *loading gave 0* | Either no `Deserialize`, or the records were built and never put in your list. That's the `foreach` at the end of `Load`. |
| Check 3 red: *the registry held records after loading a missing file* | No `File.Exists` guard — [a missing file is a first run](lecture-notes.md#a-missing-file-is-not-an-error). |
| Check 3 red: *Find can't see one of them* | The name didn't survive. The property `NewItem` puts the name into has no public setter — same fix as Task 4, `[JsonInclude]`. |
| Check 4 red, and it names a property | Exactly the trap: `{ get; private set; }` [goes out and never comes home](lecture-notes.md#what-the-serializer-will-not-read-back). One attribute, above that property. |
| Check 4 red: *no method that moves something sealed* | Week 5's job is missing — your record needs a verb that moves a property the outside world cannot write. [Week 5's homework](../week-05/homework.md) is where that was built. |
| Every record comes back blank | Your record has no public parameterless constructor **and** no constructor whose parameter names match its properties. The serializer needs one road in — [more of these in the notes](lecture-notes.md#-troubleshooting). |
| Your records show up twice | No `Clear()` before filling — your seeds went in first, and `Load` added on top of them. |
| My hand edit to `registry.json` disappeared | The program saves at the end of every run. Edit the file when the program isn't running, and if `Load` isn't written yet, the run will write your seeds over it — that's Task 3's "before". |
| `JsonException: The JSON value could not be converted` | The file was written by an older shape of your class. Delete `registry.json` and let the program write a new one. |
| Your fact's name doesn't match the table | The grader reads it **exactly** — `Week8_TheRegistrySurvivesARestart`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| Your fact is green before the fix | It's loading into the registry that already holds the records, reading a file an earlier run left behind, or not asserting on the sealed property. **A second, empty registry, `File.Delete(path)` first, and an assert on the sealed one.** |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |
| A value isn't what you think it is | **Set a breakpoint and look** — [week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for), and a `path` variable is exactly the kind of thing to put in the Variables pane. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-log-book`, push that. |

📖 *Further reading, all of it optional:* [where a file actually goes](lecture-notes.md#where-the-file-actually-goes) · [the serializer, both directions](lecture-notes.md#jsonserializer-both-directions) · [what it will not read back](lecture-notes.md#what-the-serializer-will-not-read-back) · [testing something that touches a file](lecture-notes.md#testing-something-that-touches-a-file).

**Prev:** [Week 8 Lab — The Log Book](lab/) · **Next:** [Week 9 — Three Questions](../week-09/homework.md)
