# Week 8 Homework — It Survives the Night 💾

**20 points · due before next class — and this week that is TWO weeks out**

> [!IMPORTANT]
> **There is no class next week; it's fall break.** This homework is set today and due before the class after next. **It is not a bigger homework** — it is the same size with a week off in the middle of it. Do it this week anyway, while tonight is still in your hands.

Your registry has been perfect and temporary since week 4. Tonight it gets a file, and [the record you have been building all term stops dying with the process](lecture-notes.md#the-log-stops-being-gone).

Two new members, and their signatures are part of the deal the way every dictated name has been: [**`public void Save(string path)`** and **`public void Load(string path)`**](lecture-notes.md#so-hand-the-path-in). Both take the path. Neither one knows a file name — and that is not a formality, it is the difference between a class that works when you run it and one that works when a test runs it too.

Then one fact of your own, in the suite you started last week, making the claim that suite could not make: **it's still there after a restart.**

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

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

---

## Part 2 — The code

**Two suites this week, so two counts** — keep them straight the way the lab did:

- **Mine:** `dotnet test Project.Checks` — climbs **1 → 2 → 3 → 4** as you build it.
- **Yours:** `dotnet test Project.Tests` — the suite you made last week. It has **4 facts** in it now and gains one more at Task 5.

| # | Check | Whose | What to do |
|---|---|---|---|
| 1 | `Check1_WeeksFourToSevenStillHold` | mine | **Nothing to write.** Green before you start — every week from here. |
| 2 | `Check2_TheRegistryWritesItselfDown` | mine | Write `Save`. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `Check3_TheRegistrySurvivesARestart` | mine | Write `Load` — and a missing file is a first run. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `Check4_ARecordKeepsItsOwnFacts` | mine | The number that comes back wrong. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `Week8_TheRegistrySurvivesARestart` | **yours** | One fact, in your own suite. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **Row 5's name is dictated exactly as spelled**, the way `Registry` and its members have been since week 4 — it is what the grader reads out of *your* test run. `public void`, takes nothing, `[Fact]` on top. **Everything inside the braces is yours.**

> [!NOTE]
> **Why that name has the week in it and last week's had numbers.** Last week's four were named for last week's *checks*. Your suite is permanent — it grows every week from here — and check numbers restart every week, so a second week of them would have put two facts called `Check5_something` in one file. From now on a dictated fact carries the week it was written in. [The four from last week stay exactly as they are.](lecture-notes.md#testing-something-that-touches-a-file)

### Task 2 in full

**The registry writes itself down.**

**Check:** `Check2_TheRegistryWritesItselfDown` — *mine*

**1. Add the member.** In `Project/Registry.cs`, and the signature is dictated:

```csharp
public void Save(string path)
```

**2. Two moves inside it**, and [the notes work the whole thing through](lecture-notes.md#jsonserializer-both-directions):

- Turn the list into text — `JsonSerializer.Serialize(_items, ...)`. Hand it [the list itself](lecture-notes.md#one-list-one-type-the-serializer), not a count of it and [not lines you built out of it](lecture-notes.md#readable-and-useless).
- Put the text in the file — `File.WriteAllText(path, json)`.

It needs `using System.Text.Json;` at the top of `Registry.cs`.

⚠️ **The path is the one `Save` was handed.** A file name written inside the method means one thing when your program runs and something else entirely when a test runs, [because they do not stand in the same folder](lecture-notes.md#where-the-file-actually-goes).

**3. Run mine:**

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

**1. Add the member**, dictated the same way:

```csharp
public void Load(string path)
```

**2. Three things inside it**, and the third is the one people miss:

- **Ask `File.Exists(path)` first and `return` when it's false.** The very first time anybody runs your program there is no file, and [that is a first run rather than a failure](lecture-notes.md#a-missing-file-is-not-an-error).
- **`File.ReadAllText(path)` gives the text back**; `JsonSerializer.Deserialize<List<YourType>>(...)` turns it into records. What comes back is nullable — check it.
- ⚠️ **Empty `_items` before you fill it.** [Loading is replacing, not adding](lecture-notes.md#jsonserializer-both-directions).

**3. Run mine:**

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

**The number that comes back wrong.**

**Check:** `Check4_ARecordKeepsItsOwnFacts` — *mine*

Check 3 went green, so the records survive. **Now look at what came back inside them**, because one thing did not.

**1. See it first.** Run mine and read check 4's message — it names the exact property on *your* record that lost its value, and what it was before the save:

```bash
dotnet test Project.Checks
```

**2. Then go and look at the file.** Whatever your program saved to — open it. **The value is in there.** That is the part worth sitting with for a second: nothing failed to write, and nothing failed to read the file. The number is on disk, in plain sight, and the object came back without it.

**3. The reason, and it is one sentence:** [a serializer writes every property it can READ, and reads back only the ones it can WRITE](lecture-notes.md#what-the-serializer-will-not-read-back). The property week 5 had you seal — `{ get; private set; }`, the count or the state your record is the authority on — has no public setter, so it goes out and never comes home.

**4. The fix is one line above the property**, and it is a decision rather than a repair — you are saying *this* one should survive:

```csharp
using System.Text.Json.Serialization;   // at the top of the file

[JsonInclude]
public int TimesVisited { get; private set; }
```

⚠️ **Do not make the setter public.** That would undo weeks 4 and 5 — the whole point of `private set` is that nothing outside the class can claim something that never happened. The attribute changes what the serializer may do, and nothing else.

💡 **If your record has more than one sealed property, they all need it.** Check 4 names every one that lost its value.

**5. Run mine:**

```bash
dotnet test Project.Checks
```

**4 / 4.**

```bash
git add .
git commit -m "A record keeps its own facts"
```

---

### Task 5 in full

**Your own fact, and it is the one your suite could not hold.**

**Check:** `Week8_TheRegistrySurvivesARestart` — *yours*

Last week you built a suite and it could ask your registry anything except one thing. Ask it now.

**In `Project.Tests/RegistryTests.cs`, under the four you already have.** [The three moves are the ones you know](lecture-notes.md#testing-something-that-touches-a-file); two lines in it are new:

- **A path of its own.** `Path.Combine(Path.GetTempPath(), "something-yours.json")`, then `File.Delete(path)` — [a file left behind by the last run would let this pass without saving anything](lecture-notes.md#so-hand-the-path-in). ⚠️ **Never your program's real file.**
- **Set the scene.** A registry, one record, added. Then **move the sealed property** — call the verb week 5 had you write — and set one ordinary property too, so there is more than a name to lose.
- **Do the thing.** `Save(path)`, then a **second, empty `Registry`**, then `Load(path)` on that one. ⚠️ **The second registry is the whole point**: loading into the one that just saved proves nothing, because it already holds the records.
- **Check the answer.** `Count`. Then `Find` the record by name and assert on **both** an ordinary property and the sealed one — the sealed one is the assert that would have caught Task 4.

**Run yours:**

```bash
dotnet test Project.Tests
```

**5 passed** — four from last week, and this one.

**Then [make it fail once](../week-07/lecture-notes.md#make-it-fail-once):** comment out the `Save` call, run it, watch it object, put it back. Thirty seconds, and now the green is evidence.

```bash
git add .
git commit -m "The registry survives a restart: my own fact"
```

---

## Part 3 — Show it in the program

The checks never look at `Program.cs`, and this week the *program* is where the payoff is: run it twice and the second run is different from the first.

Open `Project/Program.cs`. **Load at the top, save at the bottom**, and make the seeds conditional so they only run when there is no file yet:

```csharp
var registry = new Registry();

// A relative path is worked out from where you were STANDING when you ran
// the program — the top of this repo — not from where the program is.
string registryFile = "registry.json";

registry.Load(registryFile);

if (registry.Count == 0)
{
    // First run on this machine: nothing on file, so the registry seeds itself.
    // After tonight this is the rare case, not the normal one.
    registry.Add(registry.NewItem("your first one"));
    // ...the rest of your seeds, exactly as they were
}
```

and at the very end of the file, after your listing loop:

```csharp
registry.Save(registryFile);

Console.WriteLine();
Console.WriteLine($"{registry.Count} on file, saved to {registryFile}.");
```

**Run it twice** and read the last line both times:

```bash
dotnet run --project Project
```

```bash
dotnet run --project Project
```

The second run loaded what the first one saved. **If your program calls the verb on a record** — a visit, a play, a sighting — that count is higher on the second run than the first, and it will keep climbing every time you run it. That is the whole week in one number.

> [!NOTE]
> **A `registry.json` will appear at the top of your repo.** Committing it is fine and so is not committing it — it is data your program made, not code you wrote. Nothing is graded either way. *(Don't add it to `.gitignore`; [that file has been four lines since week 1 and it stays four lines](../week-01/lecture-notes.md).)*

```bash
git add .
git commit -m "The registry loads at the start and saves at the end"
```

---

## Part 4 — The pull request

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

Five moments worth saving, written into the parts above at the point where each thing starts working — the save, the load, the attribute, your own fact, and the program. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

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
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
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
| `CS0103: The name 'JsonSerializer' does not exist` | `using System.Text.Json;` at the top of `Registry.cs`. [Both directions need it.](lecture-notes.md#jsonserializer-both-directions) |
| `CS0246: 'JsonInclude' could not be found` | A different using, and it catches everybody: `using System.Text.Json.Serialization;` — the `.Serialization` on the end is the whole difference. [What the attribute is for.](lecture-notes.md#what-the-serializer-will-not-read-back) |
| Check 2 red: *no file appeared* | `Save` is writing to a name of its own instead of the `path` it was handed, or it isn't writing at all. [The path is a parameter for a measurable reason.](lecture-notes.md#where-the-file-actually-goes) |
| Check 3 red: *loading gave 0* | Either no `Deserialize`, or the records were built and never put in `_items`. [Both halves are worked through in the notes.](lecture-notes.md#jsonserializer-both-directions) |
| Check 3 red: *the registry held records after loading a missing file* | No `File.Exists` guard — [a missing file is a first run](lecture-notes.md#a-missing-file-is-not-an-error). |
| Check 3 red: *Find can't see one of them* | The name didn't survive. The property `NewItem` puts the name into has no public setter — same fix as Task 4, `[JsonInclude]`. |
| Check 4 red, and it names a property | Exactly the trap: `{ get; private set; }` [goes out and never comes home](lecture-notes.md#what-the-serializer-will-not-read-back). One attribute, above that property. |
| Check 4 red: *no method that moves something sealed* | Week 5's job is missing — your record needs a verb that moves a property the outside world cannot write. [Week 5's homework](../week-05/homework.md) is where that was built. |
| Every record comes back blank | Your record has no public parameterless constructor **and** no constructor whose parameter names match its properties. The serializer needs one road in — [more of these in the notes](lecture-notes.md#-troubleshooting). |
| `Load` doubles the records every run | No `Clear()` before filling — [loading is replacing](lecture-notes.md#jsonserializer-both-directions). |
| `JsonException: The JSON value could not be converted` | The file was written by an older shape of your class. Delete `registry.json` and let the program write a new one. [Handling damage properly is week 13's.](lecture-notes.md#a-missing-file-is-not-an-error) |
| Your fact name doesn't match the table | The grader reads it **exactly** — `Week8_TheRegistrySurvivesARestart`, on a `public void` method taking nothing. The body is yours; the name isn't. |
| Your fact passes without saving anything | It's loading into the registry that already holds the records, or reading a file an earlier run left behind. [A **second, empty** registry, and `File.Delete(path)` first.](lecture-notes.md#testing-something-that-touches-a-file) |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. [Which folder a command runs in matters this week more than most.](lecture-notes.md#where-the-file-actually-goes) |
| A value isn't what you think it is | **Set a breakpoint and look** — [week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for), and a `path` variable is exactly the kind of thing to put in the Variables pane. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-log-book`, push that. |

**Prev:** [Week 8 Lab — The Log Book](lab/) · **Next:** Week 9 — LINQ, and thirty lines become one *(coming)*
