# Week 5 Homework — Find One, or Find Nothing 🔎

**20 points · due before next class**

Your project has records and it can hold them. It cannot yet **do** anything to one, and it cannot **find** one.

This week it learns both — and the interesting half is the second one, because the honest answer to *"find me the one called that"* is sometimes **there isn't one**.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

> [!NOTE]
> **Nothing you wrote last week changes.** `Registry` gains two members and your record gains one; the six names from week 4 are spelled exactly as they were and always will be.

---

## Part 1 — Catch up, then branch

Your project repo, in **its own VS Code window** — not the coursework one.

> [!NOTE]
> **No project repo yet?** Then last week is the missing piece rather than this one — [week 4's homework Part 2](../week-04/homework.md#part-2--the-repo-before-any-code) makes it from scratch, in about ten minutes, and Parts 3 and 4 of it give you the `Registry` everything below adds to. Do that first; nothing here is lost.

```bash
git checkout main
```

```bash
git pull
```

That `pull` is the step everybody forgets: you merged last week's pull request on GitHub, and your laptop only found out if you asked.

Now the branch this week's work happens on:

```bash
git checkout -b find-and-remove
```

**Then bring in this week's checks.** They ship in the starters clone and **they are different every week** — last week's cannot see a single thing you write tonight. Pull the clone first:

```bash
git -C ../dotnet-db-starters pull
```

Then copy this week's over the top:

```bash
cp -r ../dotnet-db-starters/project/week-05/Project.Checks .
```

**Prove it landed:**

```bash
dotnet test Project.Checks
```

**1 / 5.** The one that's green is check 1 — week 4's work, still holding, and it stays green every week from here. **That is where tonight starts**, so every number below counts it.

> [!NOTE]
> **This one replaces my code and never yours.** `Project.Checks` is the checks project — you never edit it, so there is nothing of yours in there to lose. Your `Project/` folder isn't touched. *(It assumes `dotnet-db-starters` is a sibling of this repo, the same clone the lab pulls from.)*

> [!WARNING]
> **Skip this and every number below is wrong.** Last week's checks report **5 / 5** before you have written a line tonight — because they are testing last week's work, and passing. If `dotnet test` says 5 / 5 at the end of Task 1 instead of 2 / 5, you are running the wrong checks: come back and run the two commands above.

---

## Part 2 — The code

**Run both after every task, in this order** — the program tells you whether it's *alive*, the checks tell you whether it's *right*, and **the checks never look at `Program.cs`**, which is exactly where the "builds and runs" points live.

| # | Check | What to do |
|---|---|---|
| 1 | `LastWeeksDoorsStillHold` | **Nothing to write.** It re-checks week 4's work and is green before you start — every week from here. |
| 2 | `YourRecordDoesSomething` | Your record gets a verb of its own. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheRegistryCanFindOne` | `Find` hands back the record itself. **[Tasks 3 and 4 in full ↓](#tasks-3-and-4-in-full)** |
| 4 | `AndNothingWhenThereIsnt` | …and `null` when nobody matches — **same task, second half.** **[Tasks 3 and 4 in full ↓](#tasks-3-and-4-in-full)** |
| 5 | `AndCanTakeOneOffTheBooks` | `Remove` takes one off, and says whether it did. **[Task 5 in full ↓](#task-5-in-full)** |

⚠️ **The task numbers are check numbers**, so the number you finish is the number you see. **Check 1 is green before you start** — it re-checks week 4 — and Tasks 3 and 4 are one piece of work, because `Find`'s two jobs are one method. Your count runs **1 → 2 → 4 → 5**.

### Task 2 in full

**Your record does something.**

**Check:** `Check2_YourRecordDoesSomething`

Right now your record is a set of facts that other code sets. This week it gets a **verb** of its own.

You already have the sealed half from last week — a property with [no public setter](../week-04/lecture-notes.md#private-set--the-one-to-slow-down-on), `{ get; private set; }` or `{ get; }`. What you may not have is the thing that moves it.

**If you haven't got one at all**, add it now — it's one line, and it's the fact your record is the authority on: a count of something that happened, a condition only you update, a state only you change.

**Add a public method on your record that changes that property.** Call it whatever your topic calls it — `Visit`, `Play`, `Ride`, `Check`, `Sighted`, `Restored`. **I never look at the name**; the check tries every public method you have and watches what moves.

> [!TIP]
> **One verb is usually enough, and the opposite one usually isn't a verb at all.** If your record counts something, the count moves when the thing *happens* — there's rarely an un-happening to write. [The station's own version of this](lecture-notes.md#so-where-is-signin) is worth two minutes if you're wondering whether you need a second method.

```csharp
public int TimesVisited { get; private set; }

public void Visit()
{
    TimesVisited++;
}
```

> [!IMPORTANT]
> **A sealed property with nothing to move it is decoration.** It promises *"only I change this"* and then nothing ever does. The method is what makes the promise mean something — and it is the only door, which is the point.

> [!NOTE]
> **If you already wrote one of these last week, this part is already done and the check is already green.** That is the right kind of free: the notes recommended it, you did it, and it counts. Move on to Tasks 2 and 3.

**The other half of this check is `static`, and it costs nothing if you never wrote the word** — [which is not the same as saying the word is bad](lecture-notes.md#when-static-is-right). Calling your verb on one record must leave every *other* record alone. [If a fact about one of your things is `static`](lecture-notes.md#what-static-actually-says), there is one copy for the whole program and every record reports the same number — which is exactly what the switchboard did in the lab.

#### Make it run, then test it

**A method nothing calls has never actually run.** Paste this on the end of `Program.cs` and swap the two names for your own — your verb, and the property it moves:

```csharp
Console.WriteLine();

// Your verb, on two of your records — watch only one of them move.
List<Thing> both = registry.All();
Console.WriteLine($"before:  {both[0].TimesVisited}   {both[1].TimesVisited}");
both[0].Visit();
Console.WriteLine($"after:   {both[0].TimesVisited}   {both[1].TimesVisited}");
```

```bash
dotnet run --project Project
```

**`before:  0   0`** then **`after:   1   0`.** One moved and the other did not — call `Visit` twice and the first goes to 2 while the second stays put. **That is the half of this check `static` would take away:** put the word on that property and these four lines stop compiling altogether, with `CS0176`, because `both[0]` is a record and the property would belong to the class instead.

```bash
dotnet test Project.Checks
```

**2 / 5 — checks 1 and 2.** Scroll up the check output and you'll see both named. **Checks 3, 4 and 5 are still ahead of you**, which is what the next two sections are.

The second one is check 5 — last week's doors, still holding. It has been green since you opened the file, and it stays green every week from here.

> [!NOTE]
> **Already at 2 / 5 before you changed anything?** Then you wrote the verb last week and this part was done before you started. The run above is still worth thirty seconds — it is the first time that method has ever executed.

```bash
git add .
git commit -m "The record does something"
```

---

### Tasks 3 and 4 in full

**`Find`, and what it says when there isn't one.**

**Checks:** `Check3_TheRegistryCanFindOne` and `Check4_AndNothingWhenThereIsnt`

**One new member on `Registry`, and its shape is dictated** — the checks call it, so it is not up to you:

```csharp
public Thing? Find(string name)
```

⚠️ **All three parts of that line matter:**

- **`Find`**, spelled exactly that way, taking **exactly one `string`** — the same rule `NewItem` has, and for the same reason.
- **`Thing?`** — *your* record's type, with a **question mark**. Not `Thing`. The `?` is [you telling the compiler this method is allowed to come back empty-handed](lecture-notes.md#nothing-at-all), and without it your own `return null;` is a warning.
- It hands back **the record itself**, never a new one built from the same name. [A copy is a dead end](lecture-notes.md#two-names-one-object) — everything you do through it lands on an object nothing else is looking at.

[**The worked version is in the notes**](lecture-notes.md#finding-one-or-not-finding-one), and two things in it are the whole assignment:

- `Find` compares against **the same fact `NewItem` is handed**. `NewItem(string name)` puts that string somewhere on your record; `Find` has to look at that same property, whatever you called it.
- **`return null;` goes *after* the loop.** Inside, it gives up on the first record whose name doesn't match — which looks completely reasonable and finds exactly one thing.

> [!WARNING]
> **Never reach into the list for a record that isn't there.** `return _items[0];` looks like an answer and throws the moment the registry is empty — which, on a real registry, is the first run of the program. [`null` is the answer](lecture-notes.md#null-is-an-answer-not-a-failure), and it is not an embarrassing one.

#### Write it in two goes, so you can watch it fail

**1. Start with the shape only.** It compiles, and it is wrong on purpose:

```csharp
public Thing? Find(string name)
{
    return null;
}
```

**2. Give `Program.cs` something to ask.** Paste this on the end of the file — **the only thing to change is the two names in quotes.** The first should be a record you can see on your own list when the program runs; the second should be nonsense nobody has added:

```csharp
Console.WriteLine();

// One I know is on the registry.
Thing? known = registry.Find("a name you added above");
Console.WriteLine(known == null ? "Nothing on file by that name." : "Found it.");

// And one nobody has ever heard of.
Thing? missing = registry.Find("something I never added");
Console.WriteLine(missing == null ? "Nothing on file by that name." : "...found something that shouldn't be there.");
```

**3. Run it:**

```bash
dotnet run --project Project
```

**Both lines say nothing on file** — including the one your own program printed a few lines earlier, on its own list. **That contradiction is the whole of this task:** the registry is holding it and cannot find it.

**4. Now write the loop.** [The worked version is in the notes](lecture-notes.md#finding-one-or-not-finding-one) — mine is claw machines, yours is whatever your topic is made of. Then run the *same* thing again:

```bash
dotnet run --project Project
```

The first line finds it. **The second still says nothing on file, and that one is correct** — `Find`'s two jobs side by side, which is why it earns two checks.

**5. Then the checks:**

```bash
dotnet test Project.Checks
```

**4 / 5 — checks 1, 2, 3 and 4.** Only check 5 left.

```bash
git add .
git commit -m "The registry can find one, or say there isn't one"
```

---

### Task 5 in full

**`Remove`, which is where the `null` gets dealt with.**

**Check:** `Check5_AndCanTakeOneOffTheBooks`

**The second dictated member, same rules:**

```csharp
public bool Remove(string name)
```

- **`bool`, not `void`** — so the caller can tell *"done"* from *"there was nothing by that name"*. Saying so is the reason it returns anything at all.
- It is **built on `Find`**. One search, written once; two copies of the same loop is two places for it to be wrong.
- When `Find` hands back `null` there is simply nothing to do. Say so and stop.

[**The worked version is in the notes**](lecture-notes.md#taking-one-off-the-books) — eight lines, and the middle three are an `if` that asks before it uses.

> [!WARNING]
> **Take it off `_items`, not off `All()`.** `All()` hands you a copy of the list, so removing from it removes from the copy and the registry never notices. [A copy of the list is a copy of the list.](lecture-notes.md#a-copy-of-the-list-is-not-a-copy-of-what-is-in-it)

#### Same again — shape first, then the body

**1. The shape only**, wrong on purpose:

```csharp
public bool Remove(string name)
{
    return false;
}
```

**2. Give `Program.cs` something to take off.** On the end again — **use the same name you searched for in Tasks 2 and 3**, the one you know is there:

```csharp
Console.WriteLine();
Console.WriteLine(registry.Remove("the same name you searched for")
    ? "Removed."
    : "Nothing by that name.");
Console.WriteLine($"{registry.Count} on file.");
```

**3. Run it:**

```bash
dotnet run --project Project
```

**"Nothing by that name", and the count doesn't move** — for a record you proved `Find` can see two lines earlier. Same lie, one level up.

**4. Now write the body.** [The worked version is in the notes](lecture-notes.md#taking-one-off-the-books) — eight lines, and the middle three are an `if` that asks before it uses. Run it again:

```bash
dotnet run --project Project
```

**"Removed.", and the count drops by one.**

**5. Then the checks:**

```bash
dotnet test Project.Checks
```

**5 / 5.**

```bash
git add .
git commit -m "And can take one off the books"
```

---

## Part 3 — A `Program.cs` that shows it

You have been bolting scratch lines onto the end of `Program.cs` for three parts now, and they have done their job. **This replaces all of them with the tidy version**, and it adds three things your scratch lines don't have:

- **your verb runs on a record you looked up** — `Find` it, then move it, which is the two halves of this week meeting
- **the removal becomes a real question** rather than a hard-coded name — and *that* is what the two "builds and runs" points test, because the grader answers it with nothing but Enter
- **the list is printed again at the end**, so the removal is something you can see rather than a number going down

Select the whole of `Project/Program.cs` (`⌘A`), paste this over, then make it yours: your record's name, your own facts, your own wording.

```csharp
// Project/Program.cs — swap Thing for your record's name and Find/Visit for yours
var registry = new Registry();

registry.Add(registry.NewItem("the first one"));
registry.Add(registry.NewItem("the second one"));
registry.Add(registry.NewItem("the third one"));

Console.WriteLine(Registry.Topic);
Console.WriteLine($"{registry.Count} on file.");
Console.WriteLine();

// One I know something about.
Thing? known = registry.Find("the second one");
if (known == null)
{
    Console.WriteLine("Nothing on file by that name.");
}
else
{
    known.Visit();
    Console.WriteLine($"{known.Name} - visited {known.TimesVisited}x");
}

// And one nobody has ever heard of.
Thing? missing = registry.Find("something I never added");
Console.WriteLine(missing == null
    ? "Nothing on file by that name."
    : "...found something that shouldn't be there.");

Console.WriteLine();
Console.Write("Take one off the books (Enter to skip): ");
string? name = Console.ReadLine();
if (!string.IsNullOrWhiteSpace(name))
{
    Console.WriteLine(registry.Remove(name) ? "Removed." : "Nothing by that name.");
}

Console.WriteLine();
foreach (Thing item in registry.All())
{
    Console.WriteLine(item.Name);
}
Console.WriteLine($"{registry.Count} on file.");
```

> [!CAUTION]
> **Ask at most once, and never loop on input.** The grader runs your program with nothing but Enter on the keyboard. A `while` loop waiting for a menu choice hangs it, and a hung program scores zero for running.

**Run it once more, and read what it prints** — this is the part the checks can't see, and it's where the two points for *builds and runs* live:

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

> [!TIP]
> **While you're in here, press <kbd>F5</kbd> once.** Put a breakpoint in `Registry.Find` — click the gutter beside the `if` — and run it. Choose **`.NET 5+ and .NET Core`** if it asks which debugger, and **`Project`** if it asks which project.
>
> **Notice how short that was.** In class the project list runs to a screenful, because the coursework repo holds every project you have copied in since week 1. This one holds two — your program and my checks — so **pick `Project`** and you're in.
>
> A `.vscode` folder appears when you do — VS Code writing down what to debug. You didn't write it and you don't have to touch it. **Nothing here is graded; it's thirty seconds so that the first time you actually need it, you've already done it once.**

**Save it before you push.** This is a whole file's worth of change and `git push` only sends what has been committed:

```bash
git add .
git commit -m "A program that shows all of it"
```

> [!CAUTION]
> **Skip this one and Part 4 pushes the file you had before.** Everything you just pasted is still sitting on your laptop, uncommitted — the branch on GitHub would stop at Task 4, and it is your own work that goes missing, not mine.

---

## Part 4 — The pull request

```bash
git push -u origin find-and-remove
```

GitHub answers that push with a URL. Open it (or use the **Compare & pull request** banner), title it something that says what changed, and **read your own diff before you merge it** — scroll down to the changed files.

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

Four moments worth saving, and each one changes a file in `Project/` — they're written into Parts 2, 3, 4 and 5 above, at the point where each thing starts working. **The last one matters most**: `git push` sends commits, so anything you haven't committed simply doesn't travel. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | Week 4 still holds — no public fields, `All()` still copies, `Topic` still says something |
| 2 | A method of yours moves a fact nothing outside the class can write — and it moves it on **that** record only |
| 3 | `Registry.Find(name)` hands back the record itself, not a copy of it |
| 3 | `Find` hands back `null` for a name nobody has — no crash, and nothing changed |
| 2 | `Registry.Remove(name)` takes that one record off and says whether it did |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgement call)* |
| 2 | A second merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **Your count should climb 1 → 2 → 4 → 5**, one part at a time. If you're sitting at **3** after writing `Find` — finding red, not-finding green — read the check's message. The commonest cause is `return null;` inside the loop instead of after it, and it clears the *not*-finding check by accident: a name nobody has still comes back `null`, just for the wrong reason.

> [!WARNING]
> **A build failure zeroes all five checks at once.** One missing semicolon reads as "did nothing." Run `dotnet test Project.Checks` before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `CS8603: Possible null return` | Your `Find` returns `null` but its type has no `?`. It's `Thing?`, not `Thing`. [The question mark is the whole point.](lecture-notes.md#nothing-at-all) |
| `CS8602: Dereference of a possibly null reference` | You used the result of `Find` without asking whether there was one. [Ask, then use it.](lecture-notes.md#asking-before-you-use-it) |
| `CS8604: Possible null reference argument` | The same thing, one step further out — you handed something that might be nothing to a method or a constructor. [Ask, then use it.](lecture-notes.md#asking-before-you-use-it) |
| `NullReferenceException` when you run it | The same thing, at runtime. The warning was there at build time. |
| `CS0120: An object reference is required` | You named the class where you needed one record — `Thing.TimesVisited` instead of `item.TimesVisited`. It's asking **which one**. |
| `CS0200: ... cannot be assigned to -- it is read only` | The property your verb moves is `{ get; }` or `=> something`, so nothing can write to it — not even the class itself. It needs `{ get; private set; }`: sealed to the outside, movable by your own method. |
| Every record reports the same number | A `static` field behind the property. [One copy for the whole program](lecture-notes.md#what-static-actually-says) — take the word off. |
| `Registry.Find exists, but not with the parameters the homework asks for` | It takes **exactly one `string`**, like `NewItem`. If you need more to search by, write a second method with a different name. |
| `Find handed back a Thing — but not the one on the registry` | It's building a new record instead of returning the one it found. `return item;`, not `return new Thing(item.Name);` |
| `Find` always turns up the first record | `return null;` is inside the loop. It goes after it. |
| `Find` throws on an empty registry | It's reaching into the list (`_items[0]`) rather than walking it. |
| `Find` says nothing is there, but you can see it on the board | C# string comparison is **case-sensitive** — `"fenway"` and `"Fenway Park"` are two different strings, and so are `"Fenway park"` and `"Fenway Park"`. Type it exactly as you added it. **Week 10 has something to say about this.** |
| `Remove` said true and the count didn't move | It removed from `All()` — a copy — instead of from `_items`. |
| `Remove` said true for a name nobody has | It isn't checking `Find`'s answer for `null` before it acts. |
| Checks 2, 3 and 4 all red at once | Fix `Find` first — `Remove` is built on it, so one bug reads as three. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Two minutes with the debugger](lecture-notes.md#the-debugger-and-what-it-is-actually-for) beats twenty with `Console.WriteLine`. |
| Breakpoints never stop | Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. |
| <kbd>F5</kbd>'s project list is unreadable | Every entry is the project name plus its full path, so they look identical. **Type to filter it** — in your project repo it is two lines and you want `Project`; in your coursework repo type the week and pick `Lab`. |
| **5 / 5 before you've written anything**, or check names you don't recognise | You're running **last week's** checks. [Part 1](#part-1--catch-up-then-branch) copies this week's in — `Check2_YourRecordDoesSomething` is the first of tonight's; `Check1_YouPickedATopic` is last week's. |
| `Assembly.Load("Project")` failed / no tests ran | The console project isn't called `Project`, or it isn't beside `Project.Checks` at the top of your repo. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b find-and-remove`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 5 Lab — The Switchboard](lab/) · **Next:** [Week 6 — One Loop, Four Kinds of Thing](../week-06/)
