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

---

## Part 2 — Your record does something

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
> **If you already wrote one of these last week, this part is already done and the check is already green.** That is the right kind of free: the notes recommended it, you did it, and it counts. Move on to Part 3.

**The other half of this check is `static`, and it costs nothing if you never wrote the word** — [which is not the same as saying the word is bad](lecture-notes.md#when-static-is-right). Calling your verb on one record must leave every *other* record alone. [If a fact about one of your things is `static`](lecture-notes.md#what-static-actually-says), there is one copy for the whole program and every record reports the same number — which is exactly what the switchboard did in the lab.

### Run it, then test it

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

**2 / 5.** The program tells you whether it's *alive*; the checks tell you whether it's *right*.

The second one is check 5 — last week's doors, still holding. It has been green since you opened the file, and it stays green every week from here.

```bash
git add .
git commit -m "The record does something"
```

---

## Part 3 — `Find`, and what it says when there isn't one

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

### Run it, then test it

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

**4 / 5** — `Find` earns two checks, one for finding and one for not finding.

```bash
git add .
git commit -m "The registry can find one, or say there isn't one"
```

---

## Part 4 — `Remove`, which is where the `null` gets dealt with

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

### Run it, then test it

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

**5 / 5.**

```bash
git add .
git commit -m "And can take one off the books"
```

---

## Part 5 — A `Program.cs` that shows it

Select the whole of `Project/Program.cs` (`⌘A`) and paste this over it, then make it yours — your record's name, your own facts, your own wording:

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

---

## Part 6 — The pull request

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

Three moments worth saving, and each one changes a file in `Project/` — they're written into Parts 2, 3 and 4 above, at the point where each thing starts working. **The commits I count are the ones on this week's branch**, so committing straight to `main` costs you twice.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. your project repo

---

## Grading — 20 points

| Points | What |
|---|---|
| 2 | A method of yours moves a fact nothing outside the class can write — and it moves it on **that** record only |
| 3 | `Registry.Find(name)` hands back the record itself, not a copy of it |
| 3 | `Find` hands back `null` for a name nobody has — no crash, and nothing changed |
| 2 | `Registry.Remove(name)` takes that one record off and says whether it did |
| 2 | Week 4 still holds — no public fields, `All()` still copies, `Topic` still says something |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
| 2 | 3+ commits on **this week's branch** 👀 *(meaningful messages are a judgement call)* |
| 2 | A second merge commit on `main` — this week's branch → pull request → merge |

> [!NOTE]
> **Your count should climb 2 → 4 → 5**, one part at a time. If you're sitting at 2 after writing `Find`, read the check's message — it names the file and the shape, and the commonest cause is `return null;` inside the loop instead of after it.

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
| `CS0120: An object reference is required` | You named the class where you needed one record — `Thing.TimesVisited` instead of `phone.TimesVisited`. It's asking **which one**. |
| Every record reports the same number | A `static` field behind the property. [One copy for the whole program](lecture-notes.md#what-static-actually-says) — take the word off. |
| `Registry.Find exists, but not with the parameters the homework asks for` | It takes **exactly one `string`**, like `NewItem`. If you need more to search by, write a second method with a different name. |
| `Find handed back a Thing — but not the one on the registry` | It's building a new record instead of returning the one it found. `return item;`, not `return new Thing(item.Name);` |
| `Find` always turns up the first record | `return null;` is inside the loop. It goes after it. |
| `Find` throws on an empty registry | It's reaching into the list (`_items[0]`) rather than walking it. |
| `Remove` said true and the count didn't move | It removed from `All()` — a copy — instead of from `_items`. |
| `Remove` said true for a name nobody has | It isn't checking `Find`'s answer for `null` before it acts. |
| Checks 2, 3 and 4 all red at once | Fix `Find` first — `Remove` is built on it, so one bug reads as three. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Two minutes with the debugger](lecture-notes.md#the-debugger-and-what-it-is-actually-for) beats twenty with `Console.WriteLine`. |
| Breakpoints never stop | Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. |
| <kbd>F5</kbd>'s project list is unreadable | Every entry is the project name plus its full path, so they look identical. **Type to filter it** — in your project repo there is only one, but in your coursework repo type the week. |
| `Assembly.Load("Project")` failed / no tests ran | The console project isn't called `Project`, or it isn't beside `Project.Checks` at the top of your repo. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b find-and-remove`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 5 Lab — The Switchboard](lab/) · **Next:** Week 6 — Interfaces, and one loop that plays four different things *(coming)*
