# Week 3 — Lecture Notes

Your at-home reference for the week. One subject tonight, arriving in three pieces: **a program that can hold more than one of something** (`List<T>`), **a program that can find one of them by name** (`Dictionary<K,V>`), and **a library that draws them** (Spectre.Console, your first NuGet package).

Then the fourth piece, which is the one the rest of this course is built on: **none of it is written down anywhere.**

**Rule for reading the code blocks:** every one of them either *is* a complete file, or its first line is a comment naming the file it goes inside — except where the prose says outright that it is quoting code you already have. Nothing here is a fragment you're expected to guess the home of.

---

## The question from last week's reading

You were asked to run your week 2 program three times, take three calls, and answer this: **where are the first two calls while the third one is happening?**

The answer is **nowhere**. They never existed at the same time. Each run of the program built a caller's name, printed a line, and ended — and when it ended, everything it knew went with it. The second run started from nothing, exactly like the first.

That isn't a flaw in what you wrote. It's the shape of every program you have written so far, and tonight is the first one that pushes back on it.

---

## A fixed size is a decision somebody made

You have written this:

```csharp
string[] names = new string[3];
```

...and probably never been asked the interesting question about it, which is: **who chose the 3?**

You did. Before you knew how many there would be. And the moment there's a fourth:

```csharp
names[3] = "Bhatt";
```

```
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
```

⚠️ **Making it `new string[100]` is not the fix.** It's the same decision with a bigger guess — and now `names.Length` reports **100 people outside** when four people are on the ice, because an array only ever knows the size you asked for, never how much of it you used. The real problem is that an array's size is fixed at the moment you create it, and the number of people outside a research station is not a thing anybody knows in advance.

---

## `List<T>` — the collection that grows

```csharp
// Inside Program.cs:
List<string> outside = new List<string>();

outside.Add("Okonkwo");
outside.Add("Reyes");
outside.Add("Lindqvist");
outside.Add("Bhatt");        // no crash. It just gets longer.

Console.WriteLine(outside.Count);   // 4
```

Three things to know and that's most of it:

| | |
|---|---|
| `.Add(item)` | puts one on the **end**. Never replaces anything |
| `.Count` | how many are in there **right now** — a property, no brackets |
| `list[0]` | the first one, by position, same as an array |

And the loop you already know works on it unchanged:

```csharp
// Inside Program.cs, after the list is built:
foreach (string name in outside)
{
    Console.WriteLine(name);
}
```

> **`Count` is not a variable you keep updated. It's the list answering a question about itself.** Anywhere you were about to write `int callsTaken = 0;` and `callsTaken++`, ask the collection instead — it already knows, and it can't get out of step with reality.

### Build it once, keep it, hand it back

The examples above put a value straight into the list — a name that already existed. More often the thing worth keeping is one you **just made**, and then it has two jobs: it goes in the list *and* it comes back out to whoever asked.

```csharp
// Inside a class that has:  public static List<string> Log = new List<string>();
public static string Record(string? who, string? what)
{
    string name = Desk.CleanName(who);          // one method owns the rule
    string entry = $"{name} - {what}";          // built ONCE

    Log.Add(entry);                             // the list keeps THAT string
    return entry;                               // and the caller gets the same one
}
```

⚠️ **The list keeps the finished line, not the raw ingredient.** `Log.Add(what)` compiles perfectly and stores the wrong thing — the list ends up holding the request instead of the entry, and nothing tells you until something reads it back.

**Name it, store it, return it.** The moment you write the line twice — once for the list and once for the return — you have two places that both know how an entry is spelled, and that is week 1's lesson wearing a third shirt. Give it a variable and use the variable twice.

### What the angle brackets are for

`List<string>` is a list **of strings**. The type in the brackets is what it's allowed to hold, and it can be a type *you* wrote:

**This is a whole file, `SignOut.cs`:**

```csharp
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

You've written a class like this before. What's new is the next line:

```csharp
// Inside Program.cs, replacing the List<string> above:
List<SignOut> outside = new List<SignOut>();
outside.Add(new SignOut("14:20", "Okonkwo", "MET RUN", "15:00"));
```

Now one entry carries four facts that belong together, and `foreach` hands you whole objects:

```csharp
// Inside Program.cs, after the list is built:
foreach (SignOut s in outside)
{
    Console.WriteLine($"{s.Name} is out on a {s.Reason}, back by {s.Expected}");
}
```

> [!NOTE]
> **Why the constructor?** Every project in this course has `<Nullable>enable</Nullable>`, and four bare `public string` fields with nothing assigning them produce four `CS8618` warnings — the compiler pointing out that a `SignOut` could exist with no name in it. Assigning them in the constructor is what keeps the build at **0 Warnings**, which [week 2 taught you to want](../week-02/lecture-notes.md#warnings-are-not-decoration).

---

## Printing a collection, the hard way first

Here's the sign-out board printed with the tools you had last week:

```csharp
// Inside Program.cs, after the list is built:
Console.WriteLine("TIME    NAME        REASON    EXPECTED");
Console.WriteLine("-------------------------------------------");
foreach (SignOut s in outside)
{
    Console.WriteLine($"{s.Time,-8}{s.Name,-12}{s.Reason,-10}{s.Expected}");
}
```

That `,-12` is an alignment instruction: *pad this out to 12 characters, left-aligned.* And it works:

```
TIME    NAME        REASON    EXPECTED
-------------------------------------------
14:20   Okonkwo     MET RUN   15:00
14:20   Reyes       DIG OUT   14:45
09:05   Lindqvist   FUEL      10:30
```

**That looks fine.** Which is the trap. Watch what a duty officer typing a slightly more specific reason does to it:

```
14:57   Achterberg  DIG OUT VENT 316:30
```

The reason ran past its 10 characters, so the expected time got shoved against it, and the board now says a person is due back at `316:30`.

⚠️ **You cannot fix this by picking bigger numbers, and the reason should sound familiar:**

> **Those widths are guesses you made about text that didn't exist yet.** It's [last week's sentence](../week-02/lecture-notes.md#parse-believes-tryparse-asks) wearing different clothes — the format string was written this afternoon, and `DIG OUT VENT 3` was typed at 14:57.

What you actually want is something that **measures** the values before deciding how wide the columns are. Writing that yourself is a genuinely annoying afternoon. So you don't.

---

## Your first NuGet package

```bash
dotnet add week-03/Homework package Spectre.Console --version 0.57.2
```

⚠️ **The project name goes *before* the word `package`** — read it as *"add, to this project, a package."* From the top of your repo a bare `dotnet add package ...` answers `Could not find any project in ...`, because there's no project up there to add it to. Same rule as every command this semester: **name the week.**

**Nothing was installed on your computer.** That command edited one file — your `.csproj`:

```xml
<ItemGroup>
  <PackageReference Include="Spectre.Console" Version="0.57.2" />
</ItemGroup>
```

That line is the whole thing, and it matters more than it looks:

- **The package belongs to the project, not the machine.** It's recorded in a file that lives in your repo.
- **`dotnet build` restores it.** Anyone who clones your repo — me, on grading night, on a different computer — gets exactly that version automatically, without being told to install anything.
- ⚠️ **Which is why a lab PC that wipes itself overnight doesn't matter here.** The project file remembers. You never re-install anything.

> **"Restore," not "install."** The distinction is the reason this course can use libraries at all on machines you don't control.

---

## A table that measures

```csharp
// Inside Program.cs — needs `using Spectre.Console;` at the top of the file.
var board = new Table();
board.AddColumn("TIME");
board.AddColumn("NAME");
board.AddColumn("REASON");
board.AddColumn("EXPECTED");

foreach (SignOut s in outside)
{
    board.AddRow(s.Time, s.Name, s.Reason, s.Expected);
}

AnsiConsole.Write(board);
```

**The `foreach` didn't change.** What went away is every alignment number, and the hand-counted header line, and the row of dashes. The columns are now as wide as their contents, worked out for you at the moment of printing:

```
┌───────┬────────────┬────────────────┬──────────┐
│ TIME  │ NAME       │ REASON         │ EXPECTED │
├───────┼────────────┼────────────────┼──────────┤
│ 14:20 │ Okonkwo    │ MET RUN        │ 15:00    │
│ 14:20 │ Reyes      │ DIG OUT        │ 14:45    │
│ 09:05 │ Lindqvist  │ FUEL           │ 10:30    │
│ 14:57 │ Achterberg │ DIG OUT VENT 3 │ 16:30    │
└───────┴────────────┴────────────────┴──────────┘
```

**The same three sign-outs as the hand-printed board, plus the one that sheared it.** `DIG OUT VENT 3` fits now, because the column was measured instead of guessed.

Color and borders come from the same object — `.Border(TableBorder.Rounded)`, `.BorderColor(...)`, and markup like `[#e8b04b]MET RUN[/]` inside a cell. **All of that is yours to play with and none of it is graded.** No check in this course looks at what your program prints.

> [!WARNING]
> **Spectre is for OUTPUT. `Console.ReadLine()` is still how you read input.**
>
> `AnsiConsole.Ask<string>(...)` and `AnsiConsole.Prompt(...)` exist and they look tempting. They read the keyboard directly, so the moment your program's input comes from anywhere else — a pipe, a test, **my grader** — they throw:
>
> ```
> System.InvalidOperationException: Failed to read input in non-interactive mode.
> ```
>
> This never happens when you test by hand and always happens when I run it. **Ask with `Console.ReadLine`, draw with `AnsiConsole`**, and the 2 points for "runs without crashing" stay yours.

> [!NOTE]
> **Square brackets are formatting instructions to Spectre**, so text a *user* typed goes through `Markup.Escape(...)` before it reaches a table cell — otherwise the night somebody asks for `[hold music]` takes the desk down. The lab's `Program.cs` already does this; it's here so the crash has a name if you meet it.

---

## `Dictionary<K,V>` — finding things by name

A list finds things by **position**. Often you want to find them by **name**:

```csharp
// Inside Program.cs:
Dictionary<string, string> roles = new Dictionary<string, string>();

roles["Okonkwo"] = "station leader";
roles["Lindqvist"] = "generator mech";
roles["Bhatt"] = "comms";

Console.WriteLine(roles["Bhatt"]);      // comms
Console.WriteLine(roles.Count);         // 3
```

`Dictionary<string, string>` is *string keys, string values*. The **key** is what you look things up by, and it's unique — assigning `roles["Bhatt"]` again replaces the value rather than adding a second Bhatt.

### The counting dictionary

The other everyday shape is `Dictionary<string, int>`, where the value is a tally:

```csharp
// Inside a method that just worked out `name`:
if (Regulars.ContainsKey(name))
{
    Regulars[name] = Regulars[name] + 1;
}
else
{
    Regulars[name] = 1;
}
```

The first time somebody calls there's no number to add to, so there are genuinely two cases. **Assigning a key that doesn't exist is fine — that's what creates it.**

### Reading a key that isn't there is a crash

This is the one to remember, because it's the one that will bite you tonight:

```csharp
// Inside Program.cs, with that same `roles` dictionary:
Console.WriteLine(roles["Halvorsen"]);
```

```
Unhandled exception. System.Collections.Generic.KeyNotFoundException:
The given key 'Halvorsen' was not present in the dictionary.
```

It does **not** return `null`, and it does **not** return `0`. It throws — and "a name that isn't on the list" is the most ordinary thing that will ever happen to a lookup.

> **Assigning a missing key creates it. *Reading* a missing key throws.** Those are different operations that look almost identical on the page.

The tool that asks first has a shape you already know:

```csharp
// Inside Program.cs, where `who` is a name somebody typed:
if (roles.TryGetValue(who, out string? role))
{
    Console.WriteLine($"{who} - {role}");
}
else
{
    Console.WriteLine($"No '{who}' on this station.");
}
```

**That is [last week's `TryParse`](../week-02/lecture-notes.md#parse-believes-tryparse-asks) on a different question.** Returns a `bool` — was it there? — and hands you the value through `out` when it was. Never throws.

For counting, the same idiom gives you a clean "zero for a stranger":

```csharp
// Inside your class, wherever Regulars lives:
public static int TimesCalled(string name)
{
    if (Regulars.TryGetValue(name, out int calls))
    {
        return calls;
    }
    return 0;
}
```

*(`ContainsKey` followed by `Regulars[name]` is also correct. It looks the key up twice, which nobody will ever notice at this size.)*

> ⚠️ **Look at that parameter: `string name`, already cleaned.** If yours takes the caller **raw** — straight off `Console.ReadLine`, spaces and all — then cleaning it is the first line of the method, exactly as it is wherever you *store* the count. Look up `"  Dorothy  "` in a dictionary whose key is `"Dorothy"` and you get a miss, which reads back as **`0` for somebody who has rung all night**. Store under one spelling, look up under another, and the two never meet.

### Walking a dictionary

```csharp
// Inside your class, wherever Regulars lives:
foreach (KeyValuePair<string, int> entry in Regulars)
{
    Console.WriteLine($"{entry.Key} rang {entry.Value} times");
}
```

Each item is a **pair**: `.Key` and `.Value`. That's how you answer questions the dictionary doesn't answer directly — like *who called most*:

```csharp
// Inside your class:
public static string TheRegular()
{
    string best = "nobody yet";
    int most = 0;

    foreach (KeyValuePair<string, int> entry in Regulars)
    {
        if (entry.Value > most)
        {
            most = entry.Value;
            best = entry.Key;
        }
    }

    return best;
}
```

⚠️ **`best` starts at `"nobody yet"` for a real reason: an empty dictionary means the loop never runs at all**, so whatever you set up beforehand is what comes back. That's the case you'll hit first, and it's the case you'll hit again at the end of the night.

*(In week 9 this whole loop becomes one line. It's worth writing by hand once first, so that line means something.)*

### List or dictionary?

| | `List<T>` | `Dictionary<K,V>` |
|---|---|---|
| Finds things by | position | **key** |
| Duplicates | kept — three calls from Dorothy are three items | **one entry per key** — Dorothy's third call makes her number bigger |
| Order | the order you added them | not something to rely on |
| Answers | *what happened, and in what order* | *how many / which one, for this name* |

**They're not rivals, and most real programs have both.** In tonight's lab your shift ends with three rows in one table and two in the other — three calls, two callers — and that's the whole distinction on one screen.

---

## And then it's gone

Run your program. Take four calls. Watch the board fill up. Quit.

Run it again.

```
── the night so far ─────────────────────────────────────
╭───┬────────┬────────╮
│ # │ CALLER │ ON AIR │
╰───┴────────┴────────╯
╭─────┬───────╮
│ WHO │ CALLS │
╰─────┴───────╯
most calls tonight: nobody yet

KDXR - Nobody called. Not one person.
Keep it quiet out there.
```

**Nothing is broken. You did nothing wrong.** Every program you have written in this course does this, and so does every program you wrote last year.

Here is precisely what happened. Your `List` and your `Dictionary` are objects held in your program's memory. **A program's memory exists for exactly as long as the program is running** — start to exit, no longer. When the process ends the operating system takes the memory back, and nothing that was in it was ever recorded anywhere else.

The give-away is the part that *did* come back. In the demo, three sign-outs reappeared on every run:

```csharp
outside.Add(new SignOut("14:20", "Okonkwo", "MET RUN", "15:00"));
```

Those aren't saved data. They're **lines of source code**, and they run again every time the program starts. The row somebody typed at the prompt had no line of code behind it, so there was nothing to run again.

> **A collection is a place to keep things while you work. It is not a place to keep things.**

⚠️ **There is nothing in this week that fixes it, and that's deliberate.** You cannot solve this with `List`, `Dictionary`, or Spectre — the tool you need is a way to put bytes somewhere that outlives the process.

- **Week 8** gives your list a file, and it survives the night for the first time.
- **Week 10** gives it a database, and it becomes visible from a machine that isn't yours.

The rest of this course is, more or less, that one problem being answered properly. **Being annoyed by it tonight is the assignment.**

---

## Appendix: troubleshooting

**`System.IndexOutOfRangeException: Index was outside the bounds of the array`** — an array ran out of room. [That's what `List<T>` is for.](#listt--the-collection-that-grows)

**`System.Collections.Generic.KeyNotFoundException: The given key '...' was not present`** — you *read* a dictionary key that isn't there. [`TryGetValue` asks first.](#reading-a-key-that-isnt-there-is-a-crash) Note the message names the exact key it couldn't find.

**`System.InvalidOperationException: Failed to read input in non-interactive mode`** — `AnsiConsole.Ask` or `AnsiConsole.Prompt` used for input. [Spectre draws; `Console.ReadLine` reads.](#a-table-that-measures) This one costs points silently, because it works perfectly when you test by hand.

**`error CS0246: The type or namespace name 'Spectre' could not be found`** — you wrote `using Spectre.Console;` without adding the package. `dotnet add week-03/Homework package Spectre.Console --version 0.57.2`, from your coursework folder (the project name goes before the word `package`), [and it edits your `.csproj`](#your-first-nuget-package). ⚠️ In the homework this zeroes every check at once, because nothing compiles.

**`error NU1101: Unable to find package Spectre.Console`** — no network, or a typo in the name. The package is per-project and restored on build, so this fixes itself once you're online; nothing is permanently broken.

**Your table crashes on something a user typed**, with a markup or `[` complaint — Spectre reads square brackets as instructions. Wrap typed values: `Markup.Escape(theirText)`.

**`error CS1061: 'List<Call>' does not contain a definition for 'Count()'`** — `Count` is a property on a collection, not a method. No brackets: `Tonight.Count`.

**Your count is always 1** — the `else` branch is running every time, which means `ContainsKey` is never true. Usually the name being counted was spelled differently each time (`"  Dorothy  "` vs `"Dorothy"`); clean it the same way in *both* methods.

**`TheRegular()` says `nobody yet` on a full log** — `most` is being reset inside the loop, or the comparison never updates `best`. Both variables are declared **before** the `foreach`.

**Your checks pass but your program shows nothing** — you're running the checks, not the program. Both, every time: `dotnet test week-03/Lab.Checks` and then `dotnet run --project week-03/Lab`.

**`MSB1003: Specify which project or solution file to use`** — the command is missing its week prefix. From your coursework window it is always `dotnet test week-03/Homework.Checks` — week first, then the project.

**Everything you typed is gone when you run it again** — [that's the week.](#and-then-its-gone) Nothing is broken.
