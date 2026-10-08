# Week 9 — Lecture Notes

**These notes are further reading.** The [lab](lab/README.md) and the [homework](homework.md) each tell you what to write and give you the syntax. Come here when you want to know **why** a line is written the way it is.

The examples are the lab's, on KDXR's `Rotation`, `Switchboard` and `Hour`. Where a section is about the homework, the example is a registry of lighthouses.

## Thirty lines become one

The desk has lists: carts in the rotation, callers on the switchboard, items in the hour. Until tonight, every question about a list was a loop somebody had to write. *Find the cart called Nightjar* was five lines. *Add up the hour* was six.

**LINQ is a set of methods that ask a list a question in one line.** It ships with .NET, and every project in this course can already use it. There is nothing to install and no `using` to add.

This loop, from `Rotation.cs`:

```csharp
foreach (Song song in _songs)
{
    if (song.Title == title)
    {
        return song;
    }
}

return null;
```

does the same job as this line:

```csharp
return _songs.FirstOrDefault(song => song.Title == title);
```

Both fragments go inside `Find`, in `Rotation.cs`. The second is shorter. The more useful thing about it is that it **says what it is for**: the first song whose title matches, or nothing.

## One shape, and it does not change

Every line this week has three parts:

```
the list . a word ( a question )
```

```csharp
_songs.Where(song => song.Seconds > 240)
```

- **`_songs`** is the list being asked.
- **`Where`** is the word. It says what to do with the list: keep some of it.
- **`song => song.Seconds > 240`** is the question. It is asked of one item at a time.

Change the word and you get a different kind of answer. Change the question and you get a different answer of the same kind. The shape stays put.

### Reading a lambda out loud

The part in the brackets is called a **lambda**. It is a small method with no name, written right where it is used.

```csharp
song => song.Seconds > 240
```

- **`song`** is one item out of the list. **You pick the name.** `s` or `cart` would work as well. Pick a name that says what one item is.
- **`=>`** reads as *"goes to"*.
- **`song.Seconds > 240`** is the answer for that one item.

Read the whole thing as: *"song goes to: is this song longer than 240 seconds?"*

You never write the item's type. `_songs` is a `List<Song>`, so the compiler already knows `song` is a `Song`.

⚠️ **`=>` has a second job you have already met.** In `public int Count => _songs.Count;` it means *this member is one expression*. That one sits after a member's name. The lambda's arrow sits inside brackets, after a name you picked. They look the same and do different things.

**A question can answer with different kinds of things**, and the word decides which kind it wants:

| The question answers with | Example | Words that want it |
|---|---|---|
| yes or no | `song => song.Seconds > 240` | `Where`, `FirstOrDefault`, `Any` |
| one value from the item | `song => song.Title` | `Select`, `OrderBy`, `Sum`, `MaxBy` |

## The words you need tonight

Sort them by **what each one hands back**. That is what decides what you can do next.

| Word | Hands back |
|---|---|
| `Where` · `Select` · `OrderBy` · `OrderByDescending` · `Take` | **several things** — you can put another word after it |
| `Sum` · `Count` | one **number** |
| `Any` | **true** or **false** |
| `FirstOrDefault` · `MaxBy` | **one thing**, or nothing |

After `Where` you can keep going: `Where(...).OrderBy(...).ToList()`. After `Sum` you have a number, and you are finished.

### FirstOrDefault — the one, or nothing at all

```csharp
// in Rotation.cs
public Song? Find(string title)
{
    return _songs.FirstOrDefault(song => song.Title == title);
}
```

`FirstOrDefault` walks the list and hands back the **first** item the question is true for. If the question is true for none of them, it hands back `null`.

That matches what the loop did. The loop fell out of the bottom and hit `return null;`.

**There is a shorter word, `First`, and it is not the same.** `First` hands back the first match too. When there is no match, it **throws**:

```
System.InvalidOperationException: Sequence contains no matching element
```

A hand-written search loop cannot crash on a missing item. `First` can. So for a method whose job includes answering *"nothing here"*, the word is `FirstOrDefault`.

The return type says the same thing. `Song?` has a `?` on it because the answer can be `null`.

### Where — keeping some of them

```csharp
// in Rotation.cs
public List<Song> LongerThan(int seconds)
{
    return _songs.Where(song => song.Seconds > seconds).ToList();
}
```

`Where` keeps every item the question is true for and drops the rest.

- **It keeps them in the order it found them.** `Where` never reorders anything.
- **It hands back the items themselves, not copies.** The songs in the answer are the same objects the rotation holds.
- **True for none of them means an empty answer.** It is not `null` and it is not an error.
- **It does not change the list it was asked about.** `_songs` holds exactly what it held before.

The question can use anything that answers yes or no. A search by name uses `Contains`:

```csharp
// in a registry of lighthouses, inside Registry.cs
public List<Lighthouse> Matching(string term)
{
    return _items.Where(item => item.Name.Contains(term)).ToList();
}
```

`"Sable Point Light".Contains("Point")` is true, because *Point* is somewhere inside it. `StartsWith` would be false: it only looks at the front.

### Select — turning each one into something else

```csharp
// in Rotation.cs
public List<string> Titles()
{
    return _songs.Select(song => song.Title).ToList();
}
```

`Where` keeps **some** of the items. `Select` keeps **all** of them and changes what each one is. Here a list of songs goes in and a list of strings comes out, one string per song, in the same order.

The question can build something rather than just read a property. The hour's running order builds a line of text from each item:

```csharp
// in Hour.cs
public List<string> RunningOrder()
{
    return _items.Select(item => $"{item.Kind} - {item.Cue}").ToList();
}
```

⚠️ **The question must only read.** It must not change the item. See [what should stay a loop](#what-should-stay-a-loop).

### OrderBy — and it leaves the thing you asked alone

```csharp
// in Rotation.cs
public List<Song> ByTitle()
{
    return _songs.OrderBy(song => song.Title).ToList();
}
```

`OrderBy` hands back the items in order, smallest first. For text that is A to Z. The question answers with the thing to put them in order by. `OrderByDescending` is the same with the biggest first.

**`OrderBy` builds a new list. It does not touch the list it was asked about.** After `ByTitle()` runs, `_songs` is in exactly the order it was in before.

**`List` has its own method called `Sort`, and it is different.** `_songs.Sort(...)` rearranges `_songs` itself. Use it inside a question and three things happen that nobody asked for:

1. The rotation is now in a different order than the carts were loaded in.
2. Everything else that reads the rotation sees the new order.
3. `Save` writes the file in the new order, so the change outlives the program.

Asking *"what would these look like in order?"* should not rewrite a file. That is why the lab's check 4 and the homework's check 4 both look at the list's own order after asking.

### Sum, Count and Average — one number out of many

```csharp
// in Hour.cs
public int TotalSeconds
{
    get
    {
        return _items.Sum(item => item.Seconds);
    }
}
```

`Sum` adds up one number from each item. The question says which number.

`Count` says how many items there are. Give it a question and it counts only the ones the question is true for: `_songs.Count(song => song.Seconds > 240)`.

`Average` works out the mean of one number from each item. ⚠️ **`Average` throws on an empty list**, because the average of no numbers is not zero. `Sum` and `Count` both answer `0`.

### MaxBy — the item with the biggest something

```csharp
// in Switchboard.cs
public string TheRegular()
{
    return _callers.MaxBy(caller => caller.CallsTonight)?.Name ?? "nobody yet";
}
```

`MaxBy` hands back the **one item** with the biggest answer to the question. Here that is the caller with the most calls. `MinBy` hands back the one with the smallest.

**On an empty list there is no item to hand back, so `MaxBy` hands back `null`.** The two operators on the end deal with that:

- **`?.Name`** means *ask for the Name only if there is a caller*. Without it, an empty switchboard gives a `NullReferenceException`.
- **`?? "nobody yet"`** means *if there was nothing, answer with this text instead*.

A loop that did this job started with `string best = "nobody yet";`. The `??` on the end does the same thing.

### Take — stop after n

```csharp
// in Switchboard.cs
public List<Caller> Busiest(int n)
{
    return _callers.OrderByDescending(caller => caller.CallsTonight).Take(n).ToList();
}
```

`Take(n)` keeps the first `n` items and stops. Read the line left to right: put them in order, biggest first; keep the first `n`; hand back a list.

Asking `Take` for more items than there are is not an error. It hands back everything and stops.

### Any — a yes or a no

```csharp
// could go in Rotation.cs
public bool AnythingAired()
{
    return _songs.Any(song => song.PlaysTonight > 0);
}
```

`Any` answers `true` if the question is true for at least one item. It stops at the first one it finds.

You could write `_songs.Where(...).Count() > 0`, and it would give the same answer. `Any` says what you mean in one word.

### OfType — the ones that turned out to be a certain kind

The hour holds four kinds of items behind one interface. `OfType<T>()` keeps only the items of one kind:

```csharp
// in a fact, inside Lab.Tests/DeskTests.cs
int songs = hour.All().OfType<Song>().Count();
```

It takes no question. The type in the angle brackets is the whole instruction.

## On an empty sequence

Every word behaves in some way when there is nothing to work on. A loop over an empty list just doesn't run. These words differ:

| On an empty list | What you get |
|---|---|
| `Where` · `Select` · `OrderBy` · `Take` | an empty answer |
| `Sum` · `Count` | `0` |
| `Any` | `false` |
| `FirstOrDefault` · `MaxBy` · `MinBy` | `null` |
| `First` · `Last` · `Single` · `Average` | 💥 an exception |

**Before you use a word, ask what it does when nothing matches.** If the answer is *throws* and nothing matching is a normal thing to happen, pick a different word.

### Writing a fact about nothing being there

A fact about a search needs two asserts. The second one is the one people leave out.

```csharp
// in a registry of lighthouses, inside Project.Tests/RegistryTests.cs
[Fact]
public void Week9_FindComesBackEmptyHanded()
{
    Registry registry = new Registry();
    Lighthouse sable = registry.NewItem("Sable Point Light");
    registry.Add(sable);

    Assert.Same(sable, registry.Find("Sable Point Light"));
    Assert.Null(registry.Find("Cape Disappointment"));
}
```

- **`Assert.Same(expected, actual)`** passes only when both are the **same object**. `Find` hands back the record the registry is holding, not a copy.
- **`Assert.Null(value)`** passes when the value is `null`. That is `Find` being asked for a name nobody has.

**This fact is green the moment you write it**, because `Find` already works. That is fine. Its job is to let you change `Find` and know the answer did not move.

**So make it fail once on purpose.** Change `FirstOrDefault` to `First` in `Find` and run the suite. The second assert goes red with `Sequence contains no matching element`. Put it back. Now you have seen this fact catch something.

## A loop that fills a list is not a question

```csharp
// the bottom of Load, in Rotation.cs — before
_songs.Clear();

foreach (Song song in loaded)
{
    _songs.Add(song);
}
```

This loop does not ask anything. It **does** something: it puts every loaded song into the rotation. So it is not a job for `Where` or `Select`.

The list already has a method for it:

```csharp
// the bottom of Load, in Rotation.cs — after
_songs.Clear();

_songs.AddRange(loaded);
```

`AddRange` adds every item of another list in one call. It is a method on `List`, not part of LINQ.

⚠️ **The `Clear()` stays.** Loading replaces what the list holds. Without it, the loaded items go in on top of the ones already there, and you have every record twice.

## ToList, and why every query here ends with it

`Where`, `Select` and `OrderBy` do not hand back a `List`. Leave `.ToList()` off the end of a method that returns `List<Song>` and it does not build:

```
error CS0266: Cannot implicitly convert type 'System.Collections.Generic.IEnumerable<Song>' to 'System.Collections.Generic.List<Song>'.
```

`IEnumerable<Song>` is what `Where` hands back. `ToList()` turns it into a list.

### A query is a question, not an answer

**What `Where` hands back is the question itself, not yet asked.** Nothing has been looked at. The question is asked later, when something reads the result. If something reads it twice, it is asked twice.

This fact shows it. It goes in a file of its own, `Lab.Tests/BusyCallerTests.cs`:

```csharp
namespace Lab.Tests;

public class BusyCallerTests
{
    [Fact]
    public void AnAnswerDoesNotChangeAfterItIsGiven()
    {
        Switchboard board = new Switchboard();
        board.Take("Dorothy");
        board.Take("Dorothy");
        board.Take("Bex");

        IEnumerable<Caller> busy = board.All().Where(caller => caller.CallsTonight > 1);

        board.Take("Bex");

        Assert.Single(busy);
    }
}
```

Dorothy has rung twice and Bex once. The `Where` line asks who has rung more than once. Then Bex rings again. Then the fact checks that the answer holds one caller.

**It fails:**

```
Assert.Single() Failure: The collection contained 2 items
```

The `Where` line did not look at any caller. It handed back the question. `Assert.Single` was the first thing to read it, and by then Bex had two calls.

Put `.ToList()` on the end of the `Where` line and the fact passes. **`ToList()` asks the question right there, once, and keeps the answer.** Bex's second call comes after that, so it changes nothing.

That is the reason every method in this course that hands back several things ends with `ToList()`. The caller gets an answer that will not change behind their back.

**This matters more from week 10.** When the data is in a database, the question is sent to the database at the moment it is read. `ToList()` is the moment it is sent.

## What should stay a loop

**A query asks. A loop can do.**

`Hour.Run` is a loop, and it should stay one:

```csharp
// in Hour.cs
foreach (IScheduleItem item in _items)
{
    item.Play();
    aired.Add($"{item.Kind} - {item.Cue}");
}
```

It calls `Play()` on every item. That puts the item on air and changes it: a song's play count goes up, and an ad uses up one of its airings.

`RunningOrder` builds the same lines **without** playing anything, and that is the whole reason it is a separate method. If the `Select` inside it called `Play()`, then reading the running order would use up the ad's airings. Somebody looking at a screen would be changing the station.

**The rule: the question inside the brackets only reads.** If a line has to change each item, write a `foreach`.

### Everything, and the one-liner that reads worse

Your registry has an `Everything()` that builds a list out of two different kinds of things: the registry itself, then every record. It is a short loop:

```csharp
// in a registry of lighthouses, inside Registry.cs
public List<IListed> Everything()
{
    List<IListed> all = new List<IListed>();
    all.Add(this);

    foreach (Lighthouse item in _items)
    {
        all.Add(item);
    }

    return all;
}
```

There is a one-line way to write it. It uses two more words you have not met, and it is harder to read than the loop. **Leave it as a loop.** One line is not the goal. A line that says what it means is.

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS0266: Cannot implicitly convert type 'IEnumerable<…>' to 'List<…>'` | The `.ToList()` on the end is missing. |
| `CS0103: The name 'song' does not exist in the current context` | The question is missing its front half: `Where(song.Seconds > 240)` has to be `Where(song => song.Seconds > 240)`. |
| `CS0029: Cannot implicitly convert type 'string' to 'bool'` | One `=` where `==` belongs, inside a yes-or-no question. |
| `CS0029: Cannot implicitly convert type 'void' to 'List<…>'` | `return _songs.Sort(...)`. `Sort` hands nothing back, because it changes the list itself. `OrderBy` is the word. |
| `CS0029: … 'List<Song>' to 'List<string>'` | A `Select` whose question hands back the whole item, not the one property you wanted. |
| `InvalidOperationException: Sequence contains no matching element` | `First` found nothing. `FirstOrDefault` hands back `null` instead. |
| `InvalidOperationException: Sequence contains no elements` | `First`, `Last`, `Single` or `Average` on an empty list. |
| `NullReferenceException` right after `MaxBy` or `FirstOrDefault` | The answer was `null` and the next thing asked it for a property. `?.` in front, `??` behind. |
| A list comes back in a different order than it went in | `Sort` was used somewhere a question was meant. If the list is saved to a file, the wrong order is in the file too — delete it. |
| Every record shows up twice after loading | `Load` lost its `Clear()`. |
| An answer changed after you took it | It was a question without `ToList()`, and it was read after the list changed. |
| A search can't find something you can see | The comparison is exact, capital letters included. That is the same as the loop it replaced. |
| Red squiggles under `Where`, and `dotnet build` is fine | The editor, not your code. Command Palette → **`Developer: Reload Window`**. |

**Prev:** [Week 8 — Lecture Notes](../week-08/lecture-notes.md) · **Next:** [Week 10 — Lecture Notes](../week-10/lecture-notes.md)
