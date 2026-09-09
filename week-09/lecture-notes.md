# Week 9 — Lecture Notes

## Thirty lines become one

Since week 3 you have been told the same thing six times: *in week 9 this whole loop becomes one line.*

Here is the receipt. Every one of these was written by hand on purpose, and tonight every one of them collapses:

| You wrote | In | It becomes |
|---|---|---|
| `TheRegular()` — who called most | week 3 | `_callers.MaxBy(c => c.CallsTonight)?.Name ?? "nobody yet"` |
| `Rotation.TotalSeconds` | week 4 | `_songs.Sum(song => song.Seconds)` |
| `Switchboard.TotalCalls` | week 5 | `_callers.Sum(caller => caller.CallsTonight)` |
| `Hour.LongestItem()` | week 6 | `_items.MaxBy(item => item.Seconds)` |
| `Hour.TotalSeconds` | week 7 | `_items.Sum(item => item.Seconds)` |
| `Rotation.Load`'s fill loop | week 8 | `_songs.AddRange(loaded)` |
| `Broadcast.LastShift`'s indexing | week 8 | `File.ReadAllLines(path).LastOrDefault() ?? ""` |

**The point was never the typing.** Writing them by hand is what makes it obvious that all seven were the *same* loop wearing different nouns — and a language that lets you say a thing once is worth more than a language that lets you say it shorter.

⚠️ **And the last row of that table is not LINQ at all.** `AddRange` is a `List<T>` method. Not every one-liner is a query, and reaching for LINQ when the list already has the method is showing off rather than writing.

## One shape, and it does not change

Everything tonight is this:

```
the sequence  .  the verb  (  what to ask of each one  )
```

Here is one real line in that shape — it is inside `DrawBoard()`, in Haldane's `Program.cs`:

```csharp
crew.Sum(c => c.TripsToday)
```

Three parts. `crew` is a `List<CrewMember>`. `Sum` is what to do with them. And `c => c.TripsToday` is the part that is new.

### Reading a lambda out loud

`c => c.TripsToday` is a **lambda**: a small piece of code you hand to a method the way you hand it a number.

- **`c`** — a name for one thing out of the sequence. You pick it. `c`, `crew`, `member`, `x` — the compiler works out its type from the list, which is why you never write `CrewMember c`.
- **`=>`** — read it as **"goes to"** or **"hands back"**.
- **`c.TripsToday`** — the answer, for that one thing.

So the whole line reads: **"add up the crew, and the thing to add up about each one is their `TripsToday`."**

Once you can read that, you can read all of them, because they are all the same three parts. That is the entire syntax load of tonight.

⚠️ **There is a SECOND `=>` in C# and it means something else entirely.** You have had it since week 4:

```csharp
public string Kind => "MET";                 // the member is one expression
public int Count => _entries.Count;
```

That one says *this member's whole body is the expression after the arrow*. It has nothing to do with lambdas. **The two turn up on one line all the time**, and once you have seen it named it stops being confusing:

```csharp
public int TotalSeconds => _items.Sum(item => item.Seconds);
//                     ↑                   ↑
//              the member                 the question asked of each item
```

> [!NOTE]
> **You have written a lambda before and it wasn't called that.** Week 5's debugger slot had you type expressions into the Watch panel; week 8's `JsonSerializerOptions { WriteIndented = true }` was an object built inline. This is the same instinct — code in an argument position — with a name.

## The words you need tonight

The right-hand column is the one to learn, because it decides what can come after:

| Word | Hands back | Job |
|---|---|---|
| `Where` | a sequence | keep **some** of them |
| `Select` | a sequence | turn **each** one into something else |
| `OrderBy` / `OrderByDescending` | a sequence | put them in order |
| `Take` | a sequence | stop after n |
| `OfType<T>` | a sequence | keep the ones that turned out to be a `T` |
| `Sum` / `Count` / `Average` | one number | one number out of many |
| `Any` / `All` | `true` or `false` | a yes or a no |
| `FirstOrDefault` / `LastOrDefault` | **one thing**, or nothing | the one you were looking for |
| `MaxBy` / `MinBy` | **one thing**, or nothing | the one with the biggest something |

⚠️ **The right-hand column is the one that matters.** A word that hands back a *sequence* can have another word after it; a word that hands back *one number* or *one thing* is the end of the line.

### Where — keeping some of them

The lambda answers a yes/no question, and `Where` keeps the ones it said yes to.

Inside `Rotation.cs`, KDXR's rotation of songs:

```csharp
    public List<Song> LongerThan(int seconds)
    {
        return _songs.Where(song => song.Seconds > seconds).ToList();
    }
```

Two things to notice, and both come up tonight:

- **`Where` does not reorder anything.** What is left comes back in the order it was found.
- **A question that is true of nothing hands back an empty list** — never `null`, and never an error.

### Select — turning each one into something else

`Where` keeps some of the things. `Select` keeps **all** of them and changes what each one *is*.

Also inside `Rotation.cs`:

```csharp
    public List<string> Titles()
    {
        return _songs.Select(song => song.Title).ToList();
    }
```

A `List<Song>` went in and a `List<string>` came out. **That is the whole idea** — look at what changed between the two type names.

It does not have to be one property. Anything the lambda can build — still inside `Rotation.cs`:

```csharp
    public List<string> RunningSheet()
    {
        return _songs.Select(song => $"{song.Title} - {song.Length}").ToList();
    }
```

⚠️ **`Select` is for ASKING, and this is the one place tonight where that is a rule rather than a description.** A lambda that *changes* something on the way past turns a question into an action, and nobody reading the call site can tell. If the loop you are replacing calls a method on each item — `Play()`, `Visit()`, `Back()` — it is doing work, and it stays a loop. See [What should stay a loop](#what-should-stay-a-loop).

### OrderBy — and it leaves the thing you asked alone

```csharp
    public List<Song> ByTitle()
    {
        return _songs.OrderBy(song => song.Title).ToList();
    }
```

`OrderByDescending` is the same word backwards.

⚠️ **This is the most important sentence in these notes: `OrderBy` sorts a COPY.** `_songs` is in exactly the order it was in before, and something else in your program is entitled to rely on that — your `Save` writes the file in that order, and week 8's `Load` reads it back in that order.

There *is* a method that sorts the list itself — `List<T>.Sort` — and if you reach for it here, you have quietly rewritten your save file as a side effect of asking a question.

> [!IMPORTANT]
> **Every query in this course answers a question and leaves the thing alone.** Once you have that, `.ToList()` on the end of every one of them stops looking like ceremony: it is what makes the answer a *separate* thing from the list it came out of.

### Sum, Count and Average — one number out of many

```csharp
int seconds = _songs.Sum(song => song.Seconds);
int played  = _songs.Count(song => song.PlaysTonight > 0);
double mean = _songs.Average(song => song.Seconds);
```

- `Sum` and `Count` over an **empty** sequence give `0`. You do not have to guard for it.
- `Count` with no lambda counts everything — but a `List<T>` already has a `Count` property, so use that.
- ⚠️ **`Average` over an empty sequence THROWS.** It is the odd one out, and the reason is honest: the average of no numbers is not zero, it is nothing.

### Any — a yes or a no

When a loop existed only to answer *"is there one of these?"*, this is what it was. The whole method, from Haldane's `Watch.cs`:

```csharp
    public bool SignOut(CrewMember who, string reason, string expected)
    {
        if (SignOuts().Any(s => s.Who == who && !s.IsBack))
        {
            return false;
        }

        Add(new SignOut(Now(), who, reason, expected));
        return true;
    }
```

That whole `if` was a `foreach` with a `return false` in the middle of it. `Any` says the question out loud instead of leaving the reader to work it out from the shape of the loop.

`All` is the same thing the other way round, and `Any()` with no lambda just asks *"is there anything in here at all?"*

### FirstOrDefault — the one, or nothing at all

This is the shape of every search you have written since week 5 — the whole method, from Haldane's `Program.cs`:

```csharp
CrewMember? Find(string wanted) =>
    crew.FirstOrDefault(c => c.Name == wanted);
```

Six lines to one. And the `?` on the return type is not new — it was there before, because the method could always come back empty-handed.

⚠️ **`FirstOrDefault`, never `First`.** See [what an empty sequence does](#on-an-empty-sequence). This is the single most common way a rewrite goes wrong.

`LastOrDefault` is the same from the other end, and it is what turns week 8's array indexing into a line:

```csharp
    public static string LastShift(string path)
    {
        if (!File.Exists(path))
        {
            return "";
        }

        return File.ReadAllLines(path).LastOrDefault() ?? "";
    }
```

Two of the three things that method used to do are gone: reaching the last index by hand, and checking whether the array was empty first. **The `File.Exists` guard stays** — `ReadAllLines` throws on a file that isn't there, and LINQ never gets a chance to be asked anything.

### MaxBy — the item with the biggest something

There are two words here and confusing them costs you an hour:

```csharp
int longest = _items.Max(item => item.Seconds);           // the NUMBER
IScheduleItem? it = _items.MaxBy(item => item.Seconds);   // the THING
```

`Max` hands back the number, so you cannot then ask it its name. `MaxBy` hands back the item, which is almost always what the loop was building.

`MinBy` is the same downwards.

⚠️ **Both hand back `null` for an empty sequence**, which is why `LongestItem()` is declared `IScheduleItem?`.

### OfType — the ones that turned out to be a certain kind

Week 6 gave you a list that holds four different classes, and `is` was how you asked one what it turned out to be. Here is that loop from Haldane's `Watch.cs`, with the loop taken out of it:

```csharp
    public List<SignOut> SignOuts() =>
        _entries.OfType<SignOut>().ToList();
```

Twelve lines — a new list, a `foreach`, an `if (entry is SignOut s)`, an `Add` and a `return` — replaced by the type in the angle brackets. It keeps them **in the order it found them**, which is what makes `SignOuts()[0]` still mean the row it meant last week.

### Take — stop after n

Inside `Rotation.cs` again:

```csharp
    public List<Song> TopPlayed(int n)
    {
        return _songs.OrderByDescending(song => song.PlaysTonight).Take(n).ToList();
    }
```

Read it left to right: put them in order, stop after n, hand back a list. **Asking `Take` for more than there are is not an error** — it gives you everything it has and stops.

## On an empty sequence

Nearly everything tonight copes with an empty sequence by handing back something sensible. **Two things do not**, and both of them are one keystroke away from something that does:

| This | On an empty sequence |
|---|---|
| `First()`, `Last()`, `Single()` | **throws `InvalidOperationException`** — *"Sequence contains no elements"* |
| `FirstOrDefault()`, `LastOrDefault()` | hands back `null` |
| `MaxBy()`, `MinBy()` | hands back `null` — so `.Name` straight off it **throws `NullReferenceException`** |
| `Average()` | **throws `InvalidOperationException`** |
| `Sum()`, `Count()` | `0` |

⚠️ **This is what your hand-written loop was already doing for you and you never noticed.** A `foreach` that walks a list, finds nothing, and falls out of the bottom to a `return null;` cannot crash. `First()` can. So:

```csharp
// the loop's behavior, kept:
return _callers.MaxBy(caller => caller.CallsTonight)?.Name ?? "nobody yet";
```

Those two operators are doing exactly what the loop's setup line did:

- **`?.`** — don't ask a nothing for its `Name`.
- **`??`** — and when there *is* nothing, say this instead.

That is what `string best = "nobody yet";` above the loop was for. Delete the loop and the sentence still has to be said somewhere.

## ToList, and why every query here ends with it

### A query is a recipe, not an answer

This is the surprise of the week, and it is worth meeting on purpose:

```csharp
// Inside Program.cs, at the end of the watch.
List<SignOut> outside = watch.SignOuts();
var muster = outside.Where(s => !s.IsBack);      // ← no ToList()

Console.WriteLine(muster.Count());               // 2
watch.MarkBack("Okonkwo");
Console.WriteLine(muster.Count());               // 1
```

**Nothing touched `muster` and it answered differently.** Because `muster` is not a list of people — it is *the instruction "walk that list and keep the ones who aren't back"*, and it carries out that instruction every single time anybody looks at it.

That is called **deferred execution**, and it is the honest reading of `Where`: it hands back a *plan*, and the plan runs when somebody asks.

Most of the time that costs nothing. **Here it is a real bug**, because a muster is supposed to be a record of who was unaccounted for at the moment the desk closed. A record that changes afterwards is not a record.

The same line, in the same place, with nine characters on the end:

```csharp
// Program.cs, in EndOfWatch.
List<SignOut> muster = watch.SignOuts().Where(s => !s.IsBack).ToList();
```

`ToList()` runs the plan **once**, now, and keeps the answer. The type in front of it tells you it worked: `List<SignOut>`, not `var`.

> [!IMPORTANT]
> **The rule for this course: a method that hands a query to somebody else ends it with `ToList()`.** Inside one method, where you build a query and use it immediately, leaving it off is fine and saves a copy. Handing a recipe across a method boundary is how you ship a bug that only appears when the underlying list changes.

⚠️ **This is week 5's lesson at a higher altitude.** `watch.SignOuts()` already hands back a *copy of the list* — but the records in it are the same records, so `MarkBack` reaches them. A copied list does not protect you from a query that re-reads it.

## What should stay a loop

**A query asks. A loop can do.** That is the whole test, and three methods in tonight's demo fail it on purpose:

| Stays a loop | Because |
|---|---|
| `Watch.Add` | it **inserts** at a position it worked out. A query answers a question; it does not rearrange the thing it was asked about. |
| `Watch.Save` | it walks three different kinds of things and writes a different line for each — an `if`/`else` chain wherever you put it, and [the one-line version is worse in a way you can point at](#the-one-liner-that-writes-a-blank-line). |
| `Watch.Load` | every line through it **makes** something and puts it on the log. |
| `Hour.Run` | it **airs** the hour on the way past. A `Select` could build the same strings, and it would have to call `Play()` inside the lambda to do it — so the station would go out over the transmitter as a side effect of somebody asking a question. |

### The one-liner that writes a blank line

`Watch.Save` walks the log and writes a different line for each kind of entry. There **is** a one-line spelling, and it compiles:

```csharp
File.WriteAllLines(path, _entries.Select(e => e switch
{
    SignOut s => $"SIGNOUT|{s.Time}|{s.Who.Name}|{s.Reason}|{s.Expected}|"
        + (s.IsBack ? "back" : "out"),
    Reading r => $"MET|{r.Time}|"
        + r.Celsius.ToString("0.0", CultureInfo.InvariantCulture)
        + $"|{r.TakenBy.Name}",
    FuelCheck f => $"FUEL|{f.Time}|{f.Liters}",
    _ => ""
}));
```

**Read the last arm.** The `if`/`else if` chain in `Save` has no `else`, so an entry it does not recognize is skipped and nothing is written. A `switch` expression is not allowed to do that — it has to answer for every case — so the one-line version is forced to invent an answer, and `_ => ""` puts a **blank line** in the file. The day something new implements `ILogEntry`, the loop stays quiet and the one-liner corrupts the log.

That is not a matter of taste. **The two versions do different things**, and the shorter one does the worse thing silently.

### Everything, and the one-liner that reads worse

`Registry.Everything()` hands back the registry's own line, then one line per record. It stays a loop — and it is the most interesting of the five, because unlike the others there really is a one-line spelling. Two of them. This is what ships:

```csharp
public List<IListed> Everything()
{
    List<IListed> listing = new List<IListed>();
    listing.Add(this);

    foreach (var item in _items)      // your own record type
    {
        listing.Add(item);
    }

    return listing;
}
```

And these both do the same job in one line:

```csharp
// Prepend — but every record has to change type before this will compile
public List<IListed> Everything() =>
    _items.Cast<IListed>().Prepend(this).ToList();

// Concat — build a list holding one thing, so as not to build a list
public List<IListed> Everything() =>
    new List<IListed> { this }.Concat(_items).ToList();
```

All three hand back the same things in the same order, and the registry is first in all three. The loop is the one you can still read a year from now. **A one-liner is not the goal. Saying the thing plainly is.**

## Querying a file, and what it costs

Haldane's met book holds every temperature anybody has written down since the station opened: **50,000 readings over 268 days**, in a text file, one line each.

Reading it is nothing new — same shape as week 8's `Watch.Load`:

```csharp
// Season.cs, complete.
using System.Globalization;

public static class Season
{
    public static List<SeasonReading> Read(string path)
    {
        List<SeasonReading> book = new List<SeasonReading>();

        foreach (string line in File.ReadAllLines(path))
        {
            string[] field = line.Split('|');

            if (field.Length == 4
                && int.TryParse(field[0], out int day)
                && double.TryParse(field[2], NumberStyles.Float,
                    CultureInfo.InvariantCulture, out double celsius))
            {
                book.Add(new SeasonReading(day, field[1], celsius, field[3]));
            }
        }

        return book;
    }
}
```

**What is new is what you can ask once it is in your hands.** Six questions, six lines, over fifty thousand rows — these all sit inside one method in `Program.cs`, with `book` already read. The first line is not one of the six: `book.Count` is the list's own property, the same one you have used since week 3, and it asks nothing.

```csharp
int readings = book.Count;
int days = book.Max(r => r.Day);
double average = book.Average(r => r.Celsius);
SeasonReading coldest = book.MinBy(r => r.Celsius)!;
int belowTheLine = book.Count(r => r.Celsius < -50);
int moretti = book.Count(r => r.TakenBy == "Moretti");
List<SeasonReading> worst = book.Where(r => r.Celsius < -60)
    .OrderBy(r => r.Celsius)
    .Take(5)
    .ToList();
```

Not one of those is a loop you would have enjoyed writing, and one of them — *how many readings below fifty below* — is a question nobody would have asked at all last week. Not because it is hard. Because it was never worth the loop.

### And then the bill

Here is the part that is worth more than the six lines. Ask the program what it cost:

```
  what that cost:
    reading the file     8 ms for all 50,000 lines
    asking the questions 5.0 ms
    the book, in memory  11.8 MB from a 1.1 MB file
```

Three facts, and the last one is the one to sit with:

1. **Reading the file cost more than every question put together.** The queries are not the expensive part. *Getting the list* is.
2. **It read all fifty thousand lines to answer any of them.** To find the single coldest reading in the season, it built fifty thousand objects.
3. **A 1.1 MB file became 11.8 MB of program.** Ten times bigger, held for as long as you want to keep asking questions.

⚠️ **The numbers on your own machine will differ, and the shape will not.** That ratio is the point, not the milliseconds.

And that is *one season*. Haldane has been open since 1994.

> [!IMPORTANT]
> **This is the honest limit of a file, and it is not a speed problem.** A file cannot answer a question without being read in full, because a file does not know anything about what is in it — it is a row of characters. Every question you ask costs the whole thing.
>
> **Something that could answer the question where the data lives** would read the five coldest readings and hand you five readings. That is week 10, and the query running *inside* it is week 12.

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS1061: 'List<Song>' does not contain a definition for 'Where'` | `using System.Linq;` is missing. It ships in every project in this course via implicit usings, so this means somebody turned `ImplicitUsings` off, or you are in a file with an explicit using list. |
| `InvalidOperationException: Sequence contains no elements` | `First()`, `Last()`, `Single()` or `Average()` on an empty sequence. [The `...OrDefault` versions hand back null instead.](#on-an-empty-sequence) |
| `InvalidOperationException: Sequence contains no matching element` | `First(lambda)` found nothing. Same fix: `FirstOrDefault`. |
| `NullReferenceException` right after a `MaxBy` or `MinBy` | It handed back `null` for an empty sequence and something asked it for a property. [`?.` in front, `??` behind.](#on-an-empty-sequence) |
| `InvalidOperationException: Sequence contains more than one matching element` | `Single()`, which insists there is exactly one. You almost certainly wanted `First`/`FirstOrDefault`. |
| `CS0029: cannot implicitly convert 'IEnumerable<Song>' to 'List<Song>'` | The `.ToList()` on the end is missing. [That is what turns a recipe into an answer.](#a-query-is-a-recipe-not-an-answer) |
| `CS1503: cannot convert from 'method group'` | You wrote `Sum(song.Seconds)` instead of `Sum(song => song.Seconds)`. The `=>` is not optional. |
| `CS0854: expression tree may not contain a call` | You are in week 12's world already. Not this week. |
| The answer is right but the list came back in a different order | `OrderBy` handed you a sorted copy and you kept it; or something used `List.Sort`, [which reorders the list itself](#orderby--and-it-leaves-the-thing-you-asked-alone). |
| A count that was right yesterday is wrong today | A query without `ToList()`, being read twice. [It re-runs every time.](#a-query-is-a-recipe-not-an-answer) |
| `Sum` gives 0 and there is definitely data | The lambda is adding up the wrong thing, or a `Where` before it filtered everything out. Print the `.Count()` of the sequence before the `Sum`. |
| A search finds nothing and you can see the record | Compare exactly what you typed with exactly what is stored. String comparison is exact — **and if you are wondering whether it should be, hold that thought; it is a database-week conversation.** |
| It compiles, it runs, and you cannot see why the answer is wrong | Set a breakpoint on the line and put the query in the Watch panel — [week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for). ⚠️ A query in the Watch panel **runs** when the panel evaluates it, which is worth knowing before it confuses you. |
