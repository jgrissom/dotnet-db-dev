# Week 13 — Lecture Notes

**Exceptions and defensive code.** Every program you have written has crashed on something. This week is about what a program should do instead, and the answer is a choice between four things. `try`, `catch` and `throw` are the syntax. Picking between the four answers is the skill.

These notes are further reading. The [lab](lab/README.md) and the [homework](homework.md) carry everything you need to do the work; this is the *why* behind it.

---

## Four answers

| The answer | When | On the desk |
|---|---|---|
| **Ask again** | the person at the keyboard can fix it | a title with a typo, a wrong path |
| **Say no** | the answer is simply no, and the program carries on | a name nobody has, a damaged file |
| **Throw** | a method can't do its job, and somebody else has to decide what happens | a cart with no length |
| **Stop** | the program can't carry on | a row that has gone, no database |

The question that picks one is **who can fix this?**

- **The person, right now:** ask again.
- **Nobody, and it doesn't matter:** say no and carry on.
- **Not this method, but something above it:** throw, and let that something catch.
- **Nobody, and everything after this will fail too:** stop.

Week 2's rule was *ask once, answer gracefully*. That was right for a program that runs once with nobody watching it, and it still is. Asking again needs a person sitting there, so it belongs in the code that talks to one.

## Ask again

A prompt that repeats is a `while (true)` with `return` lines as its only ways out. This is your instructor's, the body of `TakeACallerOff` in `Lab/SwitchboardDesk.cs`:

```csharp
        while (true)
        {
            Console.Write("  Take which caller off the board? Name (Enter to give up): ");
            string? typed = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(typed))
            {
                return;
            }

            string name = typed.Trim();

            if (switchboard.Remove(name))
            {
                switchboard.Save(db);
                AnsiConsole.MarkupLine($"  [{Coral}]Off the board:[/] [{Fg}]{Markup.Escape(name)}[/] "
                    + $"[{Dim}]- {switchboard.Count} left on the switchboard.[/]");
                return;
            }

            AnsiConsole.MarkupLine($"  [{Dim}]Nobody called[/] [{Fg}]\"{Markup.Escape(name)}\"[/] "
                + $"[{Dim}]on the switchboard.[/]");
        }
```

⚠️ **Every loop that asks needs a way out that isn't the right answer.** Enter is one. The input ending is the other: `Console.ReadLine()` hands back `null` then, and a loop that doesn't check spins forever. `string.IsNullOrWhiteSpace` covers both.

`Remove` hands back `bool`, so it can say no without anything crashing. *No such name* isn't a failure, and that is why this loop has no `try` in it.

## try and catch

`try` runs a block. If a line in it throws, the rest of the block is skipped, and C# looks at the `catch` blocks under it for one that matches. This is the shape, in `TakeDayList` in `Lab/SwitchboardDesk.cs`:

```csharp
            try
            {
                int added = switchboard.Import(path);
                switchboard.Save(db);

                AnsiConsole.MarkupLine($"  [{Coral}]Day list:[/] [{Fg}]{added} new[/] "
                    + $"[{Dim}]- {switchboard.Count} on the switchboard.[/]");
                return;
            }
            catch (IOException)
            {
                AnsiConsole.MarkupLine($"  [{Dim}]No file at[/] [{Fg}]\"{Markup.Escape(path)}\"[/][{Dim}].[/]");
            }
            catch (JsonException)
            {
                AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]that file is damaged.[/] [{Dim}]Nothing was added.[/]");
                return;
            }
```

If `Import` throws, the `Save`, the message and the `return` under it never run. The first `catch` has no `return`, so the `while` around all of this goes around again. The second one has a `return`, so it doesn't.

## Catch by name

A `catch` names the exceptions it's ready for, and anything else goes straight past it. **Read the name off the crash:** the line starting `Unhandled exception` has it.

`IOException` is a parent: it covers `FileNotFoundException` and `DirectoryNotFoundException`, so one `catch` handles a mistyped file and a mistyped folder. `catch (FileNotFoundException)` is also fine, and it misses the folder.

⚠️ **`catch (Exception)` catches everything, including the bugs you want to hear about.** A typo in your own code then prints *"that file is damaged"*, and you go looking in the wrong place. Catch what you can answer.

**You only catch what you've thought of.** Type a folder's name at the delivery prompt and `File.ReadAllText` throws `UnauthorizedAccessException`, which is neither of those two. A crash you haven't seen yet is how you find out what to catch next.

## Throw

`throw` makes an exception and sends it up. The method stops at that line, and the exception travels to whichever caller has a matching `catch`. This goes in `Switchboard.Import`:

```csharp
                throw new InvalidDataException("The list has a blank name on it.");
```

**Throw when the method can't do its job and has nobody to ask.** `Import` has no keyboard and no screen, so it can't ask again and can't print a thing. The class that talks to the person catches it:

```csharp
            catch (InvalidDataException problem)
            {
                AnsiConsole.MarkupLine($"  [{Coral}]Refused:[/] [{Fg}]{Markup.Escape(problem.Message)}[/] [{Dim}]Nothing was added.[/]");
                return;
            }
```

`problem` is the exception, and `problem.Message` is the sentence the `throw` wrote. The class that knows what went wrong writes the words, and the class that talks to the person prints them.

**Why the catch isn't in `Import`:** a check can call `Import` with no keyboard and no screen, and ask `Assert.Throws` whether it refused. If `Import` printed something and carried on, nothing could test it, and every caller would get the same printed line whether it wanted one or not.

**Quiet and loud are both right, in different places.** `Song.Seconds` refuses a bad number quietly, and it has since week 4: the property keeps its old value and nothing happens. That suits a person at a prompt, who sees the screen. `Import` builds a new cart from a file, so the quiet refusal leaves it at `0:00` with nobody looking. `Registry.Add` is `void` and refuses a duplicate quietly, and `Import` shows that refusal in its count.

## Check the whole file first

```csharp
        // The whole list first: a blank name throws before anybody is added.
        foreach (string name in names)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new InvalidDataException("The list has a blank name on it.");
            }
        }
```

That loop goes in `Switchboard.Import`, above the loop that adds. Put the `throw` inside the adding loop and the good names ahead of the bad one are already in by the time it fires, and half a file has been added. **A bad file adds nothing.**

## Stop

Some failures have no answer but stopping. Two are on the desk.

**A row has gone from its table.** Two desks are open, and one pulls a cart. The other is still holding that cart in its list, so its next save fails, and so will every save after that. A `try` around the whole shift catches it, in `Lab/Program.cs`:

```csharp
catch (DbUpdateException)
{
    Console.WriteLine();
    Console.WriteLine("A row this desk was holding has gone from its table, so the desk can't save.");
    Console.WriteLine("Everything up to the last save is safe. Run the desk again to pick up from there.");
    return;
}
```

`DbUpdateConcurrencyException` is a kind of `DbUpdateException`, so this one covers *the row I tried to update isn't there* and *the database refused this row*. `return` at the top level of a program ends the program.

**The catches around one key let the desk carry on. This one is around everything, so the desk stops.**

**The database isn't there.** This failure comes back in more than one shape:

| What's wrong | What comes back |
|---|---|
| wrong password | `SqlException` |
| nothing listening at that address | `SqlException` |
| wrong database name | `InvalidOperationException`, holding a `SqlException` |
| a server name that can't be found, which is what wifi off can look like | `InvalidOperationException`, holding a `SqlException` |
| no connection string | `InvalidOperationException` |

⚠️ **So `catch (SqlException)` alone can miss it.** `CanConnect` asks the question directly and hands back `true` or `false` for all five. It goes at the top of `Lab/Program.cs`, right after the `DeskContext` is made:

```csharp
// No database, no shift. Nothing the desk does works without it.
if (!db.Database.CanConnect())
{
    Console.WriteLine("The desk can't reach its database, so the shift can't start.");
    Console.WriteLine("Check your network and your connection string, then run it again.");
    return;
}
```

It takes about fifteen seconds to give up on a network it can't reach, and about a minute on a wrong password, because it tries a login again before it answers.

The exception's own message mentions `EnableRetryOnFailure`, EF Core's setting for trying a command again by itself. This course doesn't use it. A desk that can't reach its database should say so.

## What a save does when it fails

`SaveChanges` is **all or nothing.** The changes it sends go in one transaction, so if one row fails, none of them stay. When the first desk tried to save an airing for a cart with no row, every other airing in that same save was thrown away too, and every cart's `PlaysTonight` stayed where it was.

That is why the desk's sentence says *everything up to the last save is safe.*

## Why not save in finally

`finally` is a block that goes after `try` and `catch`, and it runs whether or not anything was thrown. It looks like the obvious place to save on the way out. **The desk doesn't, and here is what was measured.** A bug was thrown in the middle of a shift, right after a change the desk hadn't saved:

| What happened | With `finally` saving |
|---|---|
| An exception, with a `catch` around it | `finally` runs, and saves the half-finished change |
| An exception, with no `catch` | it ran on a Mac, but C# doesn't promise it, so don't count on it |
| <kbd>Ctrl+C</kbd> | **it doesn't run at all**: the process is killed by the signal |
| The crash *is* the save, because a row has gone | the save in `finally` throws again, and that second exception replaces the first |

And it has almost nothing to do, because **the desk saves the moment something changes.** A request made before <kbd>Ctrl+C</kbd> is already in the table. The only thing a crash loses is the change that crashed.

**So the desk's answer to a crash is not a last-second save. It's saving as it goes, and stopping in a sentence.** `finally` is a good tool for letting go of something, such as closing a file.

## Every crash so far

Most of the crashes you've had were fixed by **asking first**. The ones this week can't be, because the world outside the program changed.

| Crash | Where you met it | The answer |
|---|---|---|
| `FormatException` | `int.Parse` on a word | `int.TryParse` |
| `KeyNotFoundException` | a dictionary key that isn't there | `TryGetValue` |
| `NullReferenceException` | using something that came back `null` | check for `null`, or `?.` |
| `InvalidOperationException` | `First` on nothing | `FirstOrDefault` |
| `ArgumentOutOfRangeException` | a list index past the end | check `Count` |
| `FileNotFoundException`, `DirectoryNotFoundException` | a path that's wrong | ask again |
| `JsonException` | a damaged file | say no |
| `InvalidDataException` | a file that lies | throw, then say no |
| `DbUpdateException` | a row that has gone | stop |
| `SqlException` | no database | `CanConnect`, then stop |

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| A loop that never ends | Nothing in it leaves on `null`. `string.IsNullOrWhiteSpace(typed)`, then `return;` |
| `CS8600` on `string typed = Console.ReadLine();` | `ReadLine` can hand back `null`, so it's `string? typed` |
| `CS0246` on `JsonException` | `using System.Text.Json;` |
| `CS0246` on `DbUpdateException` | `using Microsoft.EntityFrameworkCore;` |
| Your fact is green, and the desk crashes | The fact tests the method that throws. The desk still needs its `catch` |
| `Assert.Throws() Failure: No exception was thrown` | The method didn't throw. Before the fix, that's the red you want |
| `Assert.Equal` fails after `Assert.Throws` passed | It threw, but it had already added something. Check first, in a loop of its own |
| A `catch` that never runs | The name doesn't match what's thrown. Read the name off the `Unhandled exception` line |

**Prev:** [Week 12 — EF Core III](../week-12/lecture-notes.md) · **Next:** Week 14 *(coming)*
