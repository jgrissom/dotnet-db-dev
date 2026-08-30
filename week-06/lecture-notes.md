# Week 6 — Lecture Notes

## One list holds one type, and that is the problem

Every list you have written since week 3 has held exactly one kind of thing. `List<Song>`. `List<Caller>`. `List<SignOut>`. That has been fine, because everything you wanted on those lists was the same sort of thing.

Tonight it stops being fine, and it stops in the same way in all three worlds:

- Haldane's duty console keeps a **watch log** — and a watch is not only people going outside. Somebody dips the fuel tank. Somebody reads the masts. Those are not sign-outs and a `List<SignOut>` will not hold them.
- KDXR's overnight desk has to fill **an hour**. An hour of radio is a song, then the station ID you are legally required to run, then an ad somebody paid for, then the forecast. A `List<Song>` holds one of those four.
- Your own project prints **a listing**. Right now every row on it is one of your records. Nothing else can ever go on it.

The obvious fix is a second list, and a second loop to print it. It compiles, it runs, and it is wrong for a reason that only shows up on screen:

```
14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
14:20  SIGN OUT  Reyes - DIG OUT, due 14:45
09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
12:00  MET       -39.8 C, taken by Moretti
14:35  MET       -41.5 C, taken by Bhatt
```

Every line on there is true. It is still not a log, because a log is a thing you read down, and these are in two lists — the second one cannot start until the first has finished. You cannot sort your way out of it either: **there is nothing to sort.** They are not in one place.

And the cost grows. A third kind of thing is a third list, a third loop, and a third place to forget.

---

## `object` holds anything and promises nothing

There is a way to get them onto one list with what you already know. Every type in C# is an `object` — that is the top of the whole type system, and it is where `ToString()`, `Equals()` and `GetType()` come from.

```csharp
// Haldane/Program.cs
List<object> log = new List<object>();

log.Add(new SignOut("09:05", lindqvist, "FUEL", "10:30"));
log.Add(new Reading("12:00", -39.8, moretti));
```

It compiles. Everything goes in, in the order it happened. And then you try to print it:

```csharp
// still Haldane/Program.cs, inside the method that draws the log
foreach (object entry in log)
{
    Console.WriteLine(entry);
}
```

```
SignOut
Reading
SignOut
```

Zero errors, zero warnings, and that is the duty log.

The list is not hiding anything. **You told it that the only thing those entries have in common is that they are objects, so an object is all it will ever hand you back.** There is nothing to ask a sign-out about, because as far as that loop is concerned there are no sign-outs in there.

> [!NOTE]
> **`Console.WriteLine(entry)` printing the class name is `ToString()`.** Every object has one, and unless a class says otherwise it returns the type's name. That is the most any object can promise — and it is exactly as useful as it looks.

---

## An interface is a promise

What the list actually needs is a type that is *not* a class: something that says what a thing must be able to **answer**, and nothing at all about what that thing **is**.

```csharp
// Haldane/ILogEntry.cs
public interface ILogEntry
{
    string Time { get; }
    string Kind { get; }
    string Line();
}
```

Read it out loud: *anything that can tell me when it happened, what kind of thing it is, and how it reads on one line, can go on the watch log.*

Four things to notice, and they are all of the syntax:

- **`interface`, not `class`.** That word is the whole declaration.
- **There are no bodies.** `string Line();` ends in a semicolon — it is the shape of a method, not a method.
- **There is nothing to make.** You will never write `new ILogEntry(...)`. It is not a thing; it is a list of questions.
- **The `I` on the front is a convention**, not a rule. C# programmers put it there so you can tell at a glance. The compiler does not care.

A property in an interface is written the way you would write an auto-property, minus the value: `string Time { get; }` means *readable*. It says nothing about whether the class stores it in a field, computes it, or has had it since week 3.

---

## Keeping a promise

One phrase, after the class name:

```csharp
// Haldane/SignOut.cs — the first line of the class, and the only one that moves
public class SignOut : ILogEntry
```

**Build it before you write anything else.** This is the most useful thing the compiler does all week:

```
error CS0535: 'SignOut' does not implement interface member 'ILogEntry.Kind'
error CS0535: 'SignOut' does not implement interface member 'ILogEntry.Line()'
```

Three things were promised and it is asking for two. **`Time` is not on the list** — `SignOut` has had a `Time` property since week 3, the promise looked, found one, and moved on.

That is the idea in one build. A promise is about what you can answer; a class that could already answer one of the questions owes you nothing for it.

Pay the other two, at the bottom of the class:

```csharp
// inside SignOut, below Back()
public string Kind => "SIGN OUT";

public string Line()
{
    string state = IsBack ? "back" : $"due {Expected}";
    return $"{Who.Name} - {Reason}, {state}";
}
```

**Nothing above those two lines changed.** The private field, the validating `Expected` setter, `IsBack`'s private setter, the constructor that calls `Who.GoesOut()` — all of it is exactly what it was before, and it will still be exactly that after. Keeping a promise is additive.

`Line()` is the interesting half: a sign-out knows something no other entry knows, which is whether the person came back, and its line reads differently because of it. **Nothing outside the class has to know that**, which is the point of letting each kind write its own.

### A promise you already keep

Some of what an interface asks for is already sitting in the class. When it is, say so and move on:

```csharp
// Lab/StationId.cs
public string Cue => Words;
```

`Words` is what the ident says. `Cue` is what the DJ reads off the screen. They are the same fact under two names, and the property is one line pointing at the other.

The same thing happens with `Song`. `IScheduleItem` asks for four members and `Song` has had two of them since week 4 — `Seconds`, and a `Play()` that takes nothing and returns nothing. **It keeps half the promise without a single line being written.** That is not luck; it is what happens when an interface is written for the job rather than for one class.

---

## One list, one loop

Now the list can be `List<ILogEntry>`, and the loop can ask:

```csharp
// Haldane/Program.cs, inside the method that draws the log
foreach (ILogEntry entry in log)
{
    Console.WriteLine($"{entry.Time}  {entry.Kind,-8}  {entry.Line()}");
}
```

```
07:40  FUEL      day tank 4300 L
09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
12:00  MET       -39.8 C, taken by Moretti
14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00
```

**Three different classes went past that loop and it cannot name one of them.** It asks all of them the same three questions, and each one answers in its own way. That is polymorphism, and it is not a big word for a big idea — it is this loop.

### A class that holds a list of a promise

The collection classes you have written since week 4 barely change. `Hour` in tonight's lab is `Rotation` and `Switchboard` again, with one difference:

```csharp
// Lab/Hour.cs
public class Hour
{
    private readonly List<IScheduleItem> _items = new List<IScheduleItem>();

    public void Add(IScheduleItem item)
    {
        _items.Add(item);
    }

    public int Count => _items.Count;

    public List<IScheduleItem> All()
    {
        return new List<IScheduleItem>(_items);
    }
}
```

Every rule from week 4 still holds — the list is private, `Count` asks the list, `All()` hands back a copy. **The only thing that changed is the type in the angle brackets, and it is not a class.**

Loops over it read exactly the way you would expect:

```csharp
// inside Hour
public int TotalSeconds
{
    get
    {
        int total = 0;

        foreach (IScheduleItem item in _items)
        {
            total += item.Seconds;
        }

        return total;
    }
}
```

Nothing in there knows what a song is.

### Making a list to hand back

A loop that builds something to hand back reads the same way, with one extra
move at the front: **make the list before you walk, not in the `return`.**

```csharp
// inside Hour
public List<string> Cues()
{
    List<string> cues = new List<string>();

    foreach (IScheduleItem item in _items)
    {
        cues.Add(item.Cue);
    }

    return cues;
}
```

Three steps, and they are always in this order: make the list, fill it in the
loop, hand it back. A method that ends `return new List<string>();` has skipped
the first one — there is nowhere to put anything.

---

## A promise is not a parent

`SignOut : ILogEntry` looks like it says *a sign-out is a kind of log entry*. It does not, and the difference is worth a minute.

A sign-out is a record of a person walking out of a door at forty below. It was that in week 3, before any of this existed, and it still is. What changed is that it can now answer three questions.

Compare it with the registry in your own project, which this week keeps a promise too:

```csharp
// Project/Registry.cs — the first line of the class you already have
public class Registry : IListed
```

A registry is **not** a kind of record. It is not a lighthouse, a payphone or a claw machine, and it never will be — one of them holds the things and the other one *is* one of the things. They go on the same listing anyway, because the listing only ever asks two questions and both classes can answer them.

> [!IMPORTANT]
> When you are looking at two classes wondering whether they belong together, **do not ask what they are. Ask what somebody needs them to do** — and if the answer is the same sentence for both, that sentence is your interface.

### One parent, as many promises as you like

C# lets a class have exactly one base class, and any number of interfaces. That limit is the language saying something: **what a thing *is* is one answer, and what it can *do* is a list.**

There is a way to say *is a kind of* in C# — `abstract class` and inheritance — and it is a real tool with real uses. It is also a much bigger promise: you take on somebody else's fields and behavior along with the shape, and you only get one. Interfaces are the small promise. Most of the time the small promise is the one you want, and it is the only one this course needs.

---

## A new kind costs one class

Once the loop asks questions instead of naming types, a whole new kind of thing costs one file:

```csharp
// Haldane/FuelCheck.cs
public class FuelCheck : ILogEntry
{
    public string Time { get; }
    public int Liters { get; }

    public string Kind => "FUEL";

    public FuelCheck(string time, int liters)
    {
        Time = time;
        Liters = liters;
    }

    public string Line()
    {
        return $"day tank {Liters} L";
    }
}
```

Write it, put one on the log, run it. **The printing loop is not touched.** It has never heard of a fuel check and it never needs to.

That is the only reason any of this is worth doing. The first kind is not cheaper this way. The third one is, and the tenth one is free.

### The same method, four different jobs

`Play()` on tonight's lab is the sharpest version of this. Four classes, one method name, four completely different things:

| | what `Play()` does |
|---|---|
| `Song` | `PlaysTonight++` — counts **up** |
| `StationId` | counts up too, its own number |
| `Ad` | `Remaining--` — counts **down**, and stops at zero |
| `WeatherBed` | sets a flag. There is nothing to count |

The loop that calls it does not know which is which, and does not need to. **An interface never asks how you keep the promise.**

> [!NOTE]
> **`WeatherBed.Play()` doing almost nothing is a legitimate answer.** The promise says the method has to exist and be callable. It does not say it has to be interesting.

---

## When one kind is different

One loop treating everything the same is the whole trick — right up to the moment you need the one kind that *is* different.

Haldane's board only shows sign-outs. The log holds three kinds. So:

```csharp
// Haldane/Program.cs, at the bottom, beside the other little helpers
List<SignOut> SignOuts()
{
    List<SignOut> found = new List<SignOut>();

    foreach (ILogEntry entry in log)
    {
        if (entry is SignOut s)
        {
            found.Add(s);
        }
    }

    return found;
}
```

`entry is SignOut s` asks the entry what it actually turned out to be. If the answer is yes, it hands it over under a name you can use — **`s` is a `SignOut` from that point on**, so you can ask it about `IsBack`, which the promise never mentioned.

Two things worth being clear about:

- **This is the honest limit of the idea, not a workaround.** Sometimes one kind really is different and there is nothing dishonest about asking.
- **If you find yourself writing a long chain of them** — `is this`, else `is that`, else `is the other` — that is usually a sign that the thing you are checking for should have been a question on the interface instead.

---

## Everything the registry has to show

Your own project's listing has two kinds of row on it: the records, and the heading. The registry is the one object in the program that knows what to put in the heading, so it writes its own line:

```csharp
// Project/Registry.cs — the two members that keep the promise
public string Kind => "REGISTRY";

public string Line()
{
    return $"{Topic} - {Count} on file";
}
```

And one method hands back the lot:

```csharp
// inside the same Registry class
public List<IListed> Everything()
{
    List<IListed> listing = new List<IListed>();

    listing.Add(this);

    foreach (Lighthouse item in _items)
    {
        listing.Add(item);
    }

    return listing;
}
```

`Lighthouse` is my example — yours is whatever your topic is made of.

**`this` is the object the method is running on.** You have seen it before: it is the word that was sitting at the top of the Variables pane last week when the debugger stopped inside a constructor. In an instance method it means *the one of me that somebody called this on*, which here is the registry itself.

Then `Program.cs` prints the listing with a loop that knows about exactly one thing — the promise:

```csharp
// Project/Program.cs
foreach (IListed thing in registry.Everything())
{
    Console.WriteLine($"{thing.Kind,-10}{thing.Line()}");
}
```

```
REGISTRY  Lighthouses of the Outer Banks - 3 on file
LIGHTHOUSE  Bodie Island - 156ft - visited 1x
LIGHTHOUSE  Cape Hatteras - 210ft - visited 0x
LIGHTHOUSE  Currituck Beach - 162ft - visited 0x
```

Two classes, one list, one loop, and the loop cannot name either of them.

---

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS0535: '...' does not implement interface member '...'` | You wrote `: ISomething` and have not written that member yet. **This is the good one** — it is a to-do list, and there is one line per thing you still owe. |
| `CS0246: The type or namespace name 'IListed' could not be found` | The file isn't there, or the interface isn't `public`, or the name is spelled differently from the one you are using. |
| `CS0525: Interfaces cannot contain instance fields` | You wrote `string Kind;` instead of `string Kind { get; }`. An interface holds no data — only the shape of things you can ask. |
| `CS0501: '...' must declare a body because it is not marked abstract` | You put a `;` after a method **in a class** instead of in the interface. Bodies belong in the class; the semicolon version belongs in the interface. |
| `CS1503: cannot convert from 'Ad' to 'IScheduleItem'` | That class does not keep the promise yet. Add `: IScheduleItem` after its name and build — the compiler will tell you what is left. |
| `CS0144: Cannot create an instance of the abstract type or interface` | You wrote `new IScheduleItem(...)`. There is nothing there to make. Make one of the classes that keeps it. |
| `CS0029: cannot implicitly convert type 'object' to 'SignOut'` | Something is still a `List<object>`. Change the type in the angle brackets, not the loop. |
| `CS0161: not all code paths return a value` | A method that promises a `string` has a road through it that returns nothing. Usually a `return` inside an `if` and none after it. |
| The loop prints class names | The list is `List<object>`, or the loop variable is `object`. `object` promises nothing, so `ToString()` is all there is. |
| Everything on the listing says the same thing | `Line()` is built out of something fixed rather than out of the object it is running on. Read the properties of the thing you are inside. |
| One kind of item is missing from the list | It never went in — usually a `.Add(...)` that is still commented out, or a class that does not keep the promise so the line would not compile. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Last week's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) still applies, and it is still faster than a `Console.WriteLine`. |
