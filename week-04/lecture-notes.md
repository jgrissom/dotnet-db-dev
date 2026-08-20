# Week 4 — Lecture Notes

## OOP with a reason, and a repo of your own

Three weeks ago you wrote a class in about forty seconds and nobody made a fuss about it. You've been writing them since your first C# course. Tonight is not about what a class *is*.

Tonight is about a decision you have been making without being told it was a decision.

---

## The thing nobody told you

Here is `SignOut` from week 3. It has been on the projector all term:

```csharp
// Haldane/SignOut.cs — week 3's version
public class SignOut
{
    public string Time;
    public string Name;
    public string Reason;
    public string Expected;

    public SignOut(string time, string name, string reason, string expected)
    {
        Time = time;
        Name = name;
        Reason = reason;
        Expected = expected;
    }
}
```

Nothing is wrong with it. It compiles, it runs, the board draws.

Now: the station has a correction to make. Reyes radioed in — the vent is worse than it looked, she'll be another half hour. The duty officer types the new time in, and the program stores it:

```csharp
// inside Program.cs, in the AmendABackBy() the desk calls when you press `a`
Console.Write("  Whose back-by is changing: ");
string name = Console.ReadLine() ?? "";
Console.Write("  New back-by: ");
string newTime = Console.ReadLine() ?? "";

foreach (SignOut s in outside)
{
    if (s.Name == name)
    {
        s.Expected = newTime;
        return;
    }
}
```

The duty officer, wearing gloves, at −39, hits Enter a beat early. `newTime` is `""`.

```
┌───────┬───────────┬─────────┬──────────┐
│ TIME  │ NAME      │ REASON  │ EXPECTED │
├───────┼───────────┼─────────┼──────────┤
│ 09:05 │ Lindqvist │ FUEL    │ 10:30    │
│ 14:20 │ Reyes     │ DIG OUT │          │
│ 14:20 │ Okonkwo   │ MET RUN │ 15:00    │
└───────┴───────────┴─────────┴──────────┘
3 people outside.
```

No exception. No warning. No red squiggle. The board still cheerfully reports three people outside — and it has quietly lost the one fact that would have told anybody Reyes is late.

**That is what a public field is.** It is a hole in the wall of your class. Anything, anywhere in your program, at any time, can write anything at all into it, and there is no place to stand between the outside world and your data.

> [!IMPORTANT]
> This is the promise from week 1 being collected. You were told that week 4 is where `public` and `private` get a reason. **The reason is not "encapsulation is good practice."** The reason is that a field gives you nowhere to put rules.

---

## A property is a field with a doorman

A property looks like a field from the outside and is a pair of methods on the inside.

```csharp
public class SignOut
{
    private string _expected = "unknown";      // the field. Private. Nobody's business.

    public string Expected                     // the property. Public. The only way in.
    {
        get { return _expected; }
        set
        {
            if (!string.IsNullOrWhiteSpace(value))
            {
                _expected = value.Trim();
            }
        }
    }
}
```

Three things to notice, and the third is the one that matters:

1. **`_expected` is the *backing field*.** The underscore isn't syntax — it's just the usual way C# programmers write "this is the private one behind a property." The compiler doesn't care.
2. **`value` is a keyword.** Inside a `set`, `value` is whatever was on the right of the `=`. You never declare it; it's just there.
3. **Nothing outside changed.** `s.Expected = newTime;` is the *exact same line* it was before. It reads like a field, it's written like a field — and now a method runs on the way in.

Run the same blank correction against that version:

```
│ 14:20 │ Reyes     │ DIG OUT │ 14:45    │
```

The blank never happened. The old value is still there. Nothing crashed, nothing was announced, and the board still knows when Reyes is due.

> [!NOTE]
> **Refusing is not the same as crashing.** The setter above quietly keeps the old value. That's a design decision, and it's the right one for a duty board — the alternative is a console that throws an exception at the person holding the radio. Throwing *is* sometimes right, and choosing between them is **week 13's** whole subject.

### The short form, for when there's no rule

Most properties don't need a rule. Writing eight lines for those would be miserable, so C# has a shorthand:

```csharp
public string Condition { get; set; } = "unknown";
```

That's an **auto-property**. The compiler writes the backing field for you — you never see it and can't name it. It behaves exactly like a public field *today*, and the difference is that on the day you need a rule, you write the rule and **nothing else in your program has to change**. With a field, that day is a day of edits.

---

## `private set` — the one to slow down on

Here's the shape that does something a field simply cannot — both of these go **inside your class**, alongside its other members:

```csharp
public bool IsBack { get; private set; }

public void Back()
{
    IsBack = true;
}
```

`public` on the property, `private` on the setter. Read it from anywhere; write it from **nowhere except inside this class**.

So the only way anybody comes back from the ice is `Back()`. There is no line you can write, anywhere else in the program, that claims Reyes is safely indoors. Try it and the compiler stops you:

```
error CS0272: The property or indexer 'SignOut.IsBack' cannot be used in this
context because the set accessor is inaccessible
```

Same shape, counting instead of flagging — this pair lives inside `Song`, in the lab:

```csharp
public int PlaysTonight { get; private set; }

public void Play()
{
    PlaysTonight++;
}
```

The play count can now only move by a song actually being played. It cannot say something that didn't happen.

> [!IMPORTANT]
> **This is the sentence to take home.** A public field means *anything can say anything about this record*. `private set` means **the record is the authority on itself**, and everybody else has to ask it to do something rather than reaching in and rewriting history.

### And when it should never change at all

One member, inside the class, in place of the `public string Name;` field it replaces:

```csharp
public string Name { get; }
```

No setter of any kind. It can only be assigned in the constructor, and after that it is fixed for the life of the object. A sign-out is a record of something that happened — you don't get to edit *who it was* afterwards.

---

## A property that isn't stored anywhere

Properties don't have to have a field behind them. This one goes inside `Song`, next to `Seconds`, and is worked out fresh every time somebody asks:

```csharp
public string Length => $"{Seconds / 60}:{Seconds % 60:00}";
```

227 seconds comes out as `3:47`.

- `Seconds / 60` is **whole ÷ whole = whole** — week 1's trap, finally being useful on purpose. 227 / 60 is 3.
- `Seconds % 60` is the remainder, 47.
- `:00` pads to two digits, so 187 seconds is `3:07` and not `3:7`.
- `=>` is just a short way of writing `get { return ...; }`. There is no `set`, because there is nothing to set — ask for `Length` twice after changing `Seconds` and you get two different answers, both correct.

**Storing it would be a bug waiting to happen**: you'd have two facts that have to agree, and one day they wouldn't.

---

## The class that holds the collection

Last week's log was this:

```csharp
public static class RequestLog
{
    public static List<Call> Tonight = new List<Call>();
}
```

One copy, shared by the whole program, and anybody could reach in and empty it. This week it becomes an object that owns its list:

```csharp
public class Rotation
{
    private readonly List<Song> _songs = new List<Song>();

    public void Add(Song song)
    {
        _songs.Add(song);
    }

    public int Count => _songs.Count;

    public List<Song> All()
    {
        return new List<Song>(_songs);      // ← a COPY
    }
}
```

You make one with `new Rotation()`, and the list inside it is nobody else's business.

> [!WARNING]
> **`All()` returning a copy is the whole point, and it's the easiest line in the week to get wrong.** Write `return _songs;` and you have handed out the real list. Whoever asked can now empty your rotation, and your `Count` will agree with them — so the `private` on `_songs` was never doing anything at all.
>
> One `new` is the difference between a registry and a pile of things anybody can kick over.

`readonly` on the field means *this variable will always point at this same list*. It does **not** mean the list can't change — you can still `Add` to it. It's a promise about the arrow, not about the box.

> [!NOTE]
> **`Count` asks the list.** Never keep a separate `int` counter alongside a collection. That's two facts that have to agree, and the day they don't, one of them is lying and you can't tell which.

---

## Your project starts tonight

From this week the homework is **your own program, on a topic you choose**, and every week from here extends that same program: behaviour (5), interfaces (6), tests (7), a save file (8), queries (9), a database (10), full CRUD (11), a second related table (12), defenses (13). You present it in week 16.

### Picking a topic

Pick something you'd actually want to look at a list of. The oddest topics are the best ones — they're more fun to build, much more fun to present, and nobody else has one.

> [!IMPORTANT]
> **One hard constraint, and it lands in week 12: your topic must be able to grow a *second, related* thing.** Not another list — a thing that *belongs to* one of your records.
>
> | Your topic | The second thing, in week 12 |
> |---|---|
> | Lighthouses | a **visit** — when you went, what the light was doing |
> | Every payphone still standing | a **check** — the date, whether the handset was attached |
> | Albums | a **track** |
> | Trails | a **hike** — the date, the weather, how long it took |
>
> If you can't finish the sentence *"each one of my things has many ___"*, pick a different topic now rather than in November.

### The one class whose shape isn't up to you

Everything about your project is yours — what it's about, what your records are called, what it prints. **One class is fixed**, because it's how the checks find your code without knowing anything about your topic:

```csharp
// Project/Registry.cs
public class Registry
{
    private readonly List<Lighthouse> _items = new List<Lighthouse>();

    public static string Topic => "Lighthouses of the Outer Banks";

    public Lighthouse NewItem(string name) => new Lighthouse(name);

    public void Add(Lighthouse item) { _items.Add(item); }

    public int Count => _items.Count;

    public List<Lighthouse> All() { return new List<Lighthouse>(_items); }
}
```

`Lighthouse` is my example — yours is whatever your topic is made of, called whatever you want to call it. **`Registry`, `Topic`, `NewItem`, `Add`, `Count` and `All` are the six names that have to be spelled exactly that way.**

Why `NewItem` exists, since your program barely uses it: I have never seen your code. The checks know one name — `Registry` — and everything else they learn from what `NewItem` hands back. It's the door. Without it there is no way to check your work without me guessing what you called things, and guessing doesn't work.

⚠️ **`NewItem` takes one `string` and nothing else** — always, however many facts your record carries. That is a rule about the *shape*, not just the spelling. If your record needs three things to be built, give the extras defaults and let `NewItem` pass only the name. Widen it and the checks can't find the door at all.

### And here is the record it hands back

The `Registry` above is the fixed half. This is the other half — the class the whole project is *about* — with every shape this week taught, and a note on why each one is the shape it is:

```csharp
// Project/Lighthouse.cs — my example. Yours is whatever your topic is made of.
public class Lighthouse
{
    // A RULE, so the field is written by hand: a light with no name is a blank row.
    private string _name = "(unnamed)";
    public string Name
    {
        get { return _name; }
        set { if (!string.IsNullOrWhiteSpace(value)) { _name = value.Trim(); } }
    }

    // NO rule, so the short form. One line, and it can grow a rule later.
    public string Condition { get; set; } = "unknown";

    // A rule again. Nothing is nought feet tall, so 0 means "haven't measured".
    private int _heightFeet;
    public int HeightFeet
    {
        get { return _heightFeet; }
        set { if (value > 0) { _heightFeet = value; } }
    }

    // The lighthouse's OWN business. Anyone may read; only Visit may move them,
    // and they move together — which no outside caller could keep straight.
    public int Visits { get; private set; }
    public DateOnly? LastVisit { get; private set; }

    public void Visit(DateOnly when)
    {
        Visits++;
        LastVisit = when;
    }

    public Lighthouse(string name, string condition = "unknown", int heightFeet = 0)
    {
        Name = name;
        Condition = condition;
        HeightFeet = heightFeet;
    }
}
```

**Read it as four decisions, because that's the week's actual question — *which shape, and why*:**

| Member | Shape | Because |
|---|---|---|
| `Name`, `HeightFeet` | private field + a setter that refuses | there is a rule, and a rule needs somewhere to live |
| `Condition` | [the short form](#the-short-form-for-when-theres-no-rule) | there is no rule. Don't write eight lines for nothing |
| `Visits`, `LastVisit` | [`{ get; private set; }`](#private-set--the-one-to-slow-down-on) | the record's own bookkeeping — nobody outside gets to claim a visit that didn't happen |
| `Visit(...)` | a method | **this is what makes `private set` honest.** A sealed property with nothing to move it is decoration — it promises "only I change this" and then nothing ever does |

⚠️ **Notice what isn't here: `{ get; }`.** [It's a real shape](#and-when-it-should-never-change-at-all) and it's the right one for a fact that never changes — but it can only ever be filled **in the constructor**, and `NewItem(string)` has nothing to fill it *with* except a name. Choose it for the height of a lighthouse and every record the registry makes is stuck at `0` forever, with `CS0200` waiting for you when you try to fix it. Save `{ get; }` for something derived from the name itself, or a constant.

**`Visits` and `LastVisit` are also a down payment on week 12.** Right now they're two summary values on the record. When your topic grows its second, related thing — *each lighthouse has many visits* — those become real rows in a second table, and the count stops being something you maintain at all.

---

## Branch, pull request, merge

Until now you've committed straight to `main`. From tonight, **every feature arrives on a branch and goes through a pull request** — the workflow every job you'll have uses, and the one that makes it possible to change your mind before it's permanent.

The whole round trip:

```bash
git checkout -b sealed-play-count
```

Make your changes, commit as you go, then:

```bash
git push -u origin sealed-play-count
```

GitHub answers that push with a URL for opening a pull request. Open it, give it a title that says what changed, and **scroll down to the changed files before you do anything else — that is the diff:** every line this branch added or took away, measured against `main`. Read it. Then **merge it with the plain "Merge pull request" button**.

```bash
git checkout main
git pull
```

That last `pull` is the one people forget. The merge happened on GitHub; your laptop doesn't know about it until you ask.

> [!WARNING]
> **Use "Merge pull request", not "Squash and merge" or "Rebase and merge".** All three are legitimate and you'll meet the others at work — but only the plain merge leaves a **merge commit**, which is what the grader reads out of your repo to see that you did the round trip.

> [!NOTE]
> **A pull request on your own repo, with nobody to review it, is not theatre.** It's a place to read your own diff before it's permanent — which catches more than you'd think — and in week 15 it's where code review happens.

---

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS0272: ... cannot be used in this context because the set accessor is inaccessible` | You're assigning to a `private set` property from outside the class. That's the property doing its job — call the method that changes it (`Back()`, `Play()`, `Visit()`) instead. |
| `CS0200: Property or indexer '...' cannot be assigned to — it is read only` | The property has a `get` and no `set` at all. Either it's meant to be set only in the constructor, or you meant to give it a `private set`. |
| Your setter runs forever, then `StackOverflowException` | The classic: `set { Expected = value; }` — the setter assigning to *itself*. It must assign to the **backing field**: `set { _expected = value; }`. |
| `CS0103: The name '_expected' does not exist` | You wrote the property but not the private field above it, or spelled one of them differently. |
| A value you set "doesn't stick" | Your setter is refusing it, which may be exactly right. Check the rule — `if (value >= 1)` turns away 0 as well as negatives. |
| `CS1717: Assignment made to same variable` | Inside a constructor, `Name = Name;` instead of `Name = name;`. Capital letters matter. |
| Your `Count` disagrees with what's on screen | Something is keeping a separate counter, or `All()` handed out the real list and somebody changed it. |
| `dotnet test Project.Checks` says `Assembly.Load("Project")` failed | The console project must be called **`Project`** and sit beside `Project.Checks` at the top of your project repo. |
| `error NU1101` / restore failures on the project repo | You made the project with `dotnet new console -o Project` and it needs one restore. It has no packages this week, so this is almost always a network blip. |
| `git push` says `src refspec ... does not match any` | You're on a branch you never committed on. Commit first, then `git push -u origin <branch>`. |
| GitHub shows no "Compare & pull request" banner | You pushed to `main` instead of a branch. Make the branch, push that, and the banner appears. |
