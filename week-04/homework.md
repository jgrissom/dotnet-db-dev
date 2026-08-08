# Week 4 Homework — Your Own Topic 🚀

**20 points · due before next class**

Last week you were asked to bring two or three ideas for something you'd want to keep a list of. Tonight one of them becomes a program you'll still be working on in December.

This is the hinge week. From here, every homework extends **this same program**: behaviour (5), interfaces (6), tests (7), a save file (8), queries (9), a database (10), full CRUD (11), a second related thing (12), defenses (13). In week 16 you present it.

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open in a second tab.** Every requirement below links to the section that shows it done, and the [troubleshooting section](lecture-notes.md#-troubleshooting) names this week's actual errors.

---

## Part 1 — Pick your topic

Take the ideas you brought and [pick one](lecture-notes.md#picking-a-topic). **Pick the odd one.** A registry of every payphone still standing in your county is a better project than a registry of products, it is much more fun to present in week 16, and nobody else in the room will have it.

> [!IMPORTANT]
> **One hard constraint, and it comes due in week 12.** Your topic has to be able to grow a **second, related thing** — not another list, but something that *belongs to* one of your records.
>
> Finish this sentence out loud before you commit to a topic:
>
> > **"Each one of my ___ has many ___."**
>
> | Topic | Each one has many… |
> |---|---|
> | Lighthouses | **visits** — the date, what the light was doing |
> | Payphones | **checks** — when you found it, whether the handset was attached |
> | Albums | **tracks** |
> | Trails | **hikes** — the date, the weather, how long it took |
> | Arcade cabinets | **high scores** — who, when, how many |
>
> If you can't finish that sentence, **pick a different topic now**. Finding out in November is a bad night.

You'll need a few facts about each record. Three or more — what it's called, and at least two others that make it worth looking up.

---

## Part 2 — The repo, before any code

This is your **second** repo, and unlike your coursework repo it is **public** — it's the one you can show people.

> [!NOTE]
> **Push before you write anything.** If your git identity or GitHub login has a problem, you meet it now with nothing on the line, rather than at 11pm holding finished work you can't submit.

**1. Make it on GitHub.** New repository → name it after your topic (`payphones`, `lighthouse-log`, whatever) → **Public** → **don't** add a README, .gitignore or licence. You want it empty.

**2. Make the folder and the project.** In a terminal, from wherever you keep your repos — *beside* `dotnet-db-coursework`, not inside it:

```bash
mkdir payphones
cd payphones
dotnet new console -o Project
```

> [!CAUTION]
> **The project must be called `Project`, exactly.** That's not a suggestion — the checks load your program by that name, and the folder has to sit at the top of your repo. Name your *repo* whatever you like; the project inside it is `Project`.

**3. The `.gitignore`.** [Same four lines you wrote in week 1](../week-01/lecture-notes.md#the-gitignore-written-before-your-first-commit), and this repo gets them before its first commit too:

```bash
printf 'bin/\nobj/\n*.user\n.DS_Store\n' > .gitignore
```

**4. Bring in the checks.** They ship in the starters clone, and they have to sit *beside* `Project`:

```bash
cp -r ../dotnet-db-starters/project/week-04/Project.Checks .
```

> [!NOTE]
> **This assumes `dotnet-db-starters` is a sibling folder** — the same clone the lab pulls from, sitting beside this repo and beside `dotnet-db-coursework`. If `cd ../dotnet-db-starters` doesn't exist, clone it: `git clone https://github.com/jgrissom/dotnet-db-starters.git` from one folder up.
>
> Unlike the lab's copy, **this one is safe to re-run** — it only ever replaces my code, never yours.

Your repo now looks like this, and it's the shape it keeps all semester:

```
payphones/              ← the top of your project repo
├─ Project/             ← your program
├─ Project.Checks/      ← my checks — read-only, never edit
└─ .gitignore
```

**5. First commit and push.** Use the two lines GitHub showed you on the empty-repo page for the remote:

```bash
git init
git add .
git commit -m "The project, empty"
```

```bash
git remote add origin https://github.com/YOU/payphones.git
git push -u origin main
```

**6. Open it in a second VS Code window.** **File → New Window → Open Folder → `payphones`.**

> [!NOTE]
> **Two windows, not one.** Your coursework repo stays open in its own window with the lab in it; this repo gets its own. Each window's terminal then stands in exactly one place, which is what stops `MSB1003`.

---

## Part 3 — A branch, because that's how features arrive now

From tonight, **nothing goes straight onto `main` again**. Every feature is [a branch and a pull request](lecture-notes.md#branch-pull-request-merge) — the workflow every job you'll have uses.

```bash
git checkout -b the-registry
```

You're on the branch. Everything in Part 4 happens here.

---

## Part 4 — The code

Two files, both in `Project/`.

### Your record

Here is the shape, with the parts that are yours left open. **Paste this and you have 0 of 5 checks green** — it compiles, it runs, and it earns nothing. The blanks are where your topic shows up.

```csharp
// Project/Thing.cs — rename the file AND the class to whatever your topic is made of
public class Thing
{
    public string Name;      // ← yours: these are holes. Anything can write anything here.
    public string Note;
    public int Number;

    public Thing(string name)
    {
        Name = name;
        Note = "";
    }
}
```

That is *exactly* the shape you shipped `Call` in last week. Your job is to close it:

- **[Every public field becomes a property](lecture-notes.md#a-property-is-a-field-with-a-doorman)** with a private field behind it. No public fields left at all.
- **[At least one property refuses a bad value](lecture-notes.md#a-property-is-a-field-with-a-doorman)** — a name that won't go blank, a count that won't go negative, a year that has to be a year. Refusing means the old value stays; nothing crashes.
- **[At least one property the outside world can read and cannot write](lecture-notes.md#private-set--the-one-to-slow-down-on)** — `{ get; private set; }`, moved only by a method of yours, or [`{ get; }` set once in the constructor](lecture-notes.md#and-when-it-should-never-change-at-all). Pick the fact your record is the authority on.

### The registry

**[This one class has a fixed shape](lecture-notes.md#the-one-class-whose-shape-isnt-up-to-you)**, because it's how the checks find your code without knowing one word about your topic:

```csharp
// Project/Registry.cs
public class Registry
{
    private readonly List<Thing> _items = new List<Thing>();

    public static string Topic => "your topic here";     // ← yours, in words

    public Thing NewItem(string name) => new Thing(name);

    public void Add(Thing item)
    {
        _items.Add(item);
    }

    public int Count => _items.Count;

    public List<Thing> All()
    {
        return _items;                                   // ← yours: this should be a COPY
    }
}
```

The only line in there that isn't boilerplate is `All()` — [it has to hand back a **copy**](lecture-notes.md#the-class-that-holds-the-collection), never `_items` itself.

> [!IMPORTANT]
> **The six names — `Registry`, `Topic`, `NewItem`, `Add`, `Count`, `All` — are spelled exactly that way, every week, all semester.** Everything else is yours: the class name, the file names, the fields, what your program prints.
>
> `NewItem` exists because I have never seen your code. The checks know the one name `Registry`, and they learn what your record is called from **what `NewItem` hands back**. It's the door. Without it, checking your work would mean guessing your class names, and guessing doesn't work.

### And a `Program.cs` that runs

Replace the whole of `Project/Program.cs` (`⌘A`, paste over it — the two lines `dotnet new` wrote are the SDK's, not yours). Make it seed two or three records, print them, and print `Registry.Topic` somewhere.

> [!CAUTION]
> **Ask at most once, and never loop on input.** The grader runs your program with nothing but Enter on the keyboard. A `while` loop waiting for a menu choice hangs it, and a hung program scores zero for running.

### Run it, then test it

**After every one of the three bullets above**, both of these — in this order:

```bash
dotnet run --project Project
```

```bash
dotnet test Project.Checks
```

The program tells you whether it's *alive*; the checks tell you whether it's *right*. They answer different questions, and **the checks never look at `Program.cs`** — which is exactly where the "builds and runs" points live.

Your count should climb one at a time, in this order:

> **0** (pasted as-is) → **1** topic → **2** fields closed → **3** something refuses → **4** something sealed → **5** `All()` copies

If you're sitting at 2 after doing three of them, something isn't what you think it is — read the check's message, it names the file and the shape.

### Commit as you go

Three moments worth saving, and each one changes a file in `Project/`:

```bash
git add .
git commit -m "The registry, and a topic"
```

```bash
git add .
git commit -m "Nothing writes into the record any more"
```

```bash
git add .
git commit -m "The count is the record's own business"
```

---

## Part 5 — The pull request

```bash
git push -u origin the-registry
```

GitHub answers that push with a URL. Open it (or go to your repo — there'll be a **Compare & pull request** banner), give it a title that says what changed, and open it.

**Read your own diff before you merge it.** Nobody else is going to, and it catches more than you'd expect.

Then merge it with the plain **"Merge pull request"** button.

> [!CAUTION]
> **Not "Squash and merge", not "Rebase and merge".** All three are real and you'll meet the others at work — but only the plain merge leaves a **merge commit**, and that's what I read out of your repo to see you did the round trip. Squash-merging costs you 2 points for work you actually did.

Finally, bring your laptop back in line:

```bash
git checkout main
git pull
```

That last one is the step everybody forgets. The merge happened on GitHub; your machine doesn't know until you ask.

---

## Submitting

**Two URLs in Canvas, on two lines, in this order:**

1. your coursework repo *(same as every week — the lab lives there)*
2. **your new project repo**

---

## Grading — 20 points

| Points | What |
|---|---|
| 1 | `Registry.Topic` says what your project is about — in words, and not the example |
| 3 | Your record has no public fields and at least 3 properties — week 3's shape, closed |
| 3 | At least one property turns away a nonsense value instead of storing it |
| 2 | At least one property the outside world can read and cannot write |
| 3 | `Registry` keeps records — `Count` asks the list, and `All()` hands back a copy |
| 1 | Public project repo exists at the URL you submitted, and clones |
| 2 | The program builds and runs without crashing — even when fed nothing but Enter |
| 1 | `bin/` and `obj/` tracked in **neither** repo — the `.gitignore` holding, in both places |
| 2 | 3+ commits in the project repo 👀 *(meaningful messages are a judgement call)* |
| 2 | A merge commit on `main` — the branch → pull request → merge round trip, done once |

> [!WARNING]
> **A build failure zeroes all five checks at once.** One missing semicolon reads as "did nothing." Run `dotnet test Project.Checks` before you push, every time.

---

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `CS0272: ... the set accessor is inaccessible` | You're assigning to a `private set` property from outside the class. That's it working — call your own method instead. |
| `CS0200: Property ... cannot be assigned to — it is read only` | The property has no `set` at all. Fine if it's meant to be constructor-only; otherwise you wanted `private set`. |
| Program hangs, or `StackOverflowException` | A setter assigning to itself: `set { Name = value; }`. It must assign to the backing field: `set { _name = value; }`. |
| `CS0102: ... already contains a definition for 'Name'` | The old `public string Name;` field is still there under the new property. Delete the field. |
| Check 2 passes but 3 and 4 say **blocked** | They can't run until your record has properties. Same problem as check 2, not a new one. |
| Check 3: "every settable property stored a nonsense value" | Your setters are rubber stamps. At least one needs an `if` in it — a property with an empty setter *is* a field, just longer to type. |
| Check 5: "the Registry went from 2 records to 0" | `All()` is handing out `_items` itself. `return new List<Thing>(_items);` |
| `Assembly.Load("Project")` failed / no tests ran | The console project isn't called `Project`, or it isn't beside `Project.Checks` at the top of your repo. |
| `git push` → `src refspec ... does not match any` | You're on a branch with no commits on it. Commit first, then push. |
| No **Compare & pull request** banner on GitHub | You pushed to `main` instead of a branch. `git checkout -b the-registry`, push that. |
| `MSB1003: Specify which project` | You're in the wrong window. This homework runs from your **project** repo's window; the lab runs from the coursework one. |

**Prev:** [Week 4 Lab — The Rotation That Fights Back](lab/) · **Next:** Week 5 — Behaviour, `static`, and the debugger *(coming)*
