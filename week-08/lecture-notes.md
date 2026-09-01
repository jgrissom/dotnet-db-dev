# Week 8 — Lecture Notes

## The log stops being gone

In week 3 you typed three records into a program, quit it, ran it again, and they were gone. Nothing was broken. You did nothing wrong. A `List<T>` lives in memory, memory belongs to the process, and when the process ends the memory goes back to the machine — every time, for every program ever written.

You were told then that it gets answered twice: once in week 8 with a file, and once in week 10 with a database. This is week 8.

Week 7 got as close as it is possible to get without one. You can now write down a rule and have a machine re-ask it forever — but there is one claim no fact in your suite could make, because there was nothing to call:

```csharp
// The test you could not write last week.
[Fact]
public void ItIsStillThereAfterARestart()
{
    // ...and then what? There is nowhere for it to still be.
}
```

Tonight there is somewhere.

---

## A file is a place to put text

Everything this week rests on six methods, all of them on `File`, all of them one line. There is no ceremony: no opening, no closing, no stream to remember to shut.

```csharp
// inside any method, anywhere
File.WriteAllText(path, "one string, however long");   // makes it, or replaces it
string text = File.ReadAllText(path);                  // the whole thing, as one string

File.WriteAllLines(path, listOfStrings);               // one line per entry
string[] lines = File.ReadAllLines(path);              // back again, one per line

File.AppendAllText(path, "one more line\n");           // adds to the end; makes it if absent
bool there = File.Exists(path);                        // does it exist at all?
```

Two of those are worth pausing on, because the difference between them is the difference between a snapshot and a log:

- **`WriteAllText` starts the file over.** Whatever was in it is gone. That is what you want for a thing whose current state is the truth — a rotation, a registry, a save file.
- **`AppendAllText` adds to the end** and keeps everything already there. That is what you want for a record of things that happened — a log, an audit trail, a night's sign-offs.

Picking the wrong one is not a compile error and not a crash. It is a file that quietly forgets, or one that quietly never stops growing.

---

## Where the file actually goes

This is the part that catches everyone, and it is worth reading twice.

**A relative path — a plain name like `"registry.json"` — is worked out from the folder you were STANDING IN when you started the program.** Not from where the program lives. Not from where its `.cs` files are. From your terminal's current folder.

This course has one habit and it makes that easy: **every command runs from the top of your repo.** So:

```bash
dotnet run --project week-08/Lab      # you are at the top → the file lands at the top
```

And a path that names the week lands beside the week's projects, where you are already looking:

```csharp
const string RotationFile = "week-08/rotation.json";
```

⚠️ **Here is the part that is genuinely surprising, and it is measurable rather than a rule of thumb.** `dotnet test` does **not** stand where `dotnet run` stands. It runs your tests from inside the test project's build folder:

| Command, typed at the top of your repo | The folder the code runs in |
|---|---|
| `dotnet run --project week-08/Lab` | the top of your repo |
| `dotnet test week-08/Lab.Checks` | `week-08/Lab.Checks/bin/Debug/net10.0` |

So `"rotation.json"` means **two different files** depending on which command you typed. A class that writes to a file name it decided for itself is a class that works when you run it and lies when you test it.

### So: hand the path in

Every method in this course that touches a file takes the path as a parameter:

```csharp
public void Save(string path)      // not: public void Save()
public void Load(string path)
```

`Program.cs` decides where the real file lives, because that is a decision about the machine. A test hands in a scratch file, because that is a decision about the test:

```csharp
// inside a fact, in Project.Tests
string path = Path.Combine(Path.GetTempPath(), "my-scratch-file.json");
File.Delete(path);
```

`Path.GetTempPath()` is the folder your operating system keeps for exactly this. `Path.Combine` joins the pieces with whatever separator this machine uses, so the same line works on a Mac and on Windows.

> [!NOTE]
> **One more place the working directory differs, and it will surprise you once.** Pressing <kbd>F5</kbd> runs your program with the working directory set to the **project folder**, not the top of the repo — because that is what the `.vscode/launch.json` VS Code wrote for you says. So a file you saved from the terminal is not the file <kbd>F5</kbd> reads. It is not broken; it is two different folders, and now you know which.

---

## Readable, and useless

The obvious first attempt at saving a list is to write down what it already knows how to say:

```csharp
// inside Watch — the version that does NOT work
public void Save(string path)
{
    List<string> lines = new List<string>();

    foreach (ILogEntry entry in _entries)
    {
        lines.Add($"{entry.Time}  {entry.Kind}  {entry.Line()}");
    }

    File.WriteAllLines(path, lines);
}
```

Open that file and it is perfect. A human can read every line of it.

Now write the method that reads it back and you find out what is wrong: `14:20  SIGN OUT  Okonkwo - MET RUN, due 15:00` is a **sentence**. To turn it back into a `SignOut` you would have to find the name inside it, find the reason after a dash, find the time after the word "due" — and all three of those are decisions the `Line()` method made about how to talk to a person, which it is free to change next week.

**A file that a human can read and a program cannot is half a save file.** What you want is a file where the pieces are still pieces.

---

## Turning objects into text, and back

### Saving by hand: one line per record, fields kept apart

```csharp
// inside Watch — the version that does work
public void Save(string path)
{
    List<string> lines = new List<string>();

    foreach (ILogEntry entry in _entries)
    {
        if (entry is SignOut s)
        {
            lines.Add($"SIGNOUT|{s.Time}|{s.Who.Name}|{s.Reason}|{s.Expected}|"
                + (s.IsBack ? "back" : "out"));
        }
        else if (entry is FuelCheck f)
        {
            lines.Add($"FUEL|{f.Time}|{f.Liters}");
        }
        // ...and one more branch for Reading, the same shape again.
    }

    File.WriteAllLines(path, lines);
}
```

Three things are deliberate here:

- **The KIND word comes first.** Reading the file back, that word tells you what the rest of the line is before you look at any of it.
- **The fields are separated by something that cannot appear inside a field.** A `|` was chosen over a comma because a comma turns up in real text constantly — a caller called `Ray, Mile 240` would split one field into two and every field after it would be off by one. Nothing here contains a `|`.
- **Nothing computed is written down.** `Line()` is worked out from the other fields, so storing it would be storing the same fact twice — and two copies of one fact is one fact and one bug waiting.

### Loading by hand: the kind word first

```csharp
// inside Watch
public void Load(string path, List<CrewMember> crew)
{
    _entries.Clear();

    foreach (string line in File.ReadAllLines(path))
    {
        string[] field = line.Split('|');

        if (field[0] == "SIGNOUT" && field.Length == 6)
        {
            CrewMember? who = Lookup(crew, field[2]);

            if (who != null)
            {
                SignOut s = new SignOut(field[1], who, field[3], field[4]);
                if (field[5] == "back") { s.Back(); }
                Add(s);
            }
        }
        // ...and an `else if` for "MET" and one for "FUEL", each reading the
        // fields that kind of line has. Three branches, one per kind.
    }
}
```

`Split('|')` hands back a `string[]` — an array, indexed from zero, the same square brackets you have used on a `List<T>` since week 3. `field[0]` is the kind, `field[1]` is the time, and so on.

⚠️ **`field.Length == 6` is not defensive decoration.** A file is a text file: anybody can open it and change it, and a half-deleted line has fewer pieces than the code expects. Reaching for `field[5]` on a line with three pieces is a crash. (What *should* happen when a file is damaged is a real design question, and it is week 13's.)

⚠️ **`Lookup` is why `Load` needs the crew list.** The file says `Okonkwo`; the log has to hold **the** Okonkwo — the same object the board counts trips on. Build a fresh `CrewMember` from the name instead and you have two men with one name, and half the station's numbers land on the one nobody can see. That is week 5's lesson and week 7's `Assert.Same`, arriving in a place you would not have expected them.

💡 **And one thing you get for free, which is worth noticing:** `new SignOut(...)` calls `Who.GoesOut()` in its constructor, because since week 5 making a sign-out *is* the trip. So loading the file rebuilds every crew member's trip count without a line of code that mentions counting.

---

## One list, one type: the serializer

Doing it by hand is honest work, and it is exactly the right amount of work for a log with three different kinds of things on it. But most lists are not like that. Most lists are **one list of one type**, and for those, the whole trip is two lines.

**Serializing** means turning an object into text. **Deserializing** means turning the text back into an object. The library is `System.Text.Json`, it ships with .NET, and the format it writes is JSON.

### JsonSerializer, both directions

```csharp
// inside Rotation — the whole of saving
public void Save(string path)
{
    string json = JsonSerializer.Serialize(_songs,
        new JsonSerializerOptions { WriteIndented = true });

    File.WriteAllText(path, json);
}
```

```csharp
// inside Rotation — the whole of loading
public void Load(string path)
{
    if (!File.Exists(path))
    {
        return;
    }

    List<Song>? loaded = JsonSerializer.Deserialize<List<Song>>(File.ReadAllText(path));

    if (loaded == null)
    {
        return;
    }

    _songs.Clear();

    foreach (Song song in loaded)
    {
        _songs.Add(song);
    }
}
```

Both files need `using System.Text.Json;` at the top.

Four things worth naming:

- **`Serialize` takes the list itself.** Not a count of it, not lines you built out of it. Hand it the objects.
- **`WriteIndented = true` is for you, not for the program.** It puts the JSON on separate lines with indentation so a person can read it. Leave it out and you get the same data on one enormous line.
- **`Deserialize<List<Song>>` needs the type in angle brackets.** That is how it knows what to build. It hands back `List<Song>?` — nullable, because a file holding the text `null` is a thing that can happen.
- ⚠️ **Clear the list before you fill it.** A `Load` on top of a rotation that already holds three carts *adds* three more otherwise. The point of loading is to replace what is there.

💡 **The serializer also solves a problem you did not know you had.** A `double` written out by hand can go into a file as `-39.8` on your machine and `-39,8` on a machine set to a different language, and then it will not read back. JSON has one number format everywhere. This is not the reason to use it, but it is a reason.

### What the serializer will not read back

Here is the one that costs people an evening.

**A serializer writes every public property it can READ, and reads back only the ones it can WRITE.**

Since week 4 you have been sealing properties the record is the authority on — `{ get; private set; }`, moved by one verb and nothing else. That is still right. But `private set` means the serializer cannot put the value back, so:

```
"TimesVisited": 3      ← the number is right there in the file
```

…and the object comes back with `TimesVisited` at `0`. Nothing crashes. Nothing warns. You just quietly lose the count every restart.

The fix is one line, and it is a **decision**, not a repair — you are saying this is one that should survive:

```csharp
// inside your record class
using System.Text.Json.Serialization;   // at the top of the file

[JsonInclude]
public int TimesVisited { get; private set; }
```

`[JsonInclude]` means *yes, this one too* — use the private setter.

⚠️ **Do not "fix" it by making the setter public.** That would undo weeks 4 and 5: the whole point of `private set` is that nothing outside the class can claim a visit that did not happen. The attribute changes what the serializer may do, and nothing else.

### The mirror: what it writes that you did not want

The other direction happens too. A property that is *worked out* from the others — a `Length` computed from `Seconds`, a `Cue` built out of a title and an artist — has a public getter, so it goes into the file, where it is redundant at best and a stale second copy at worst.

```csharp
[JsonIgnore]
public string Length => Broadcast.Clock(Seconds);
```

Between them, `[JsonInclude]` and `[JsonIgnore]` are the same idea twice: **the serializer's default is a guess about your class, and you are allowed to correct it in either direction.**

---

## A missing file is not an error

The very first time anybody runs your program, there is no save file. That is not a failure, and it must not read like one:

```csharp
// inside Load, before anything else
if (!File.Exists(path))
{
    return;
}
```

Ask first, and simply return. The registry stays empty, the program carries on, and the next `Save` creates the file.

This is the one file-I/O failure that is *guaranteed* to happen, to every user, exactly once — so it is the one to handle, and handling it costs three lines. The other ones (the file is there but damaged; the disk is full; another program has it open) are real, and they are week 13's.

---

## Appending: a log that keeps every line

Some things are not a current state to be overwritten. A shift's sign-off, a night's readings, an audit trail: each one is an event, and the file is the record of all of them.

```csharp
// inside Broadcast
public static void LogShift(string path, string line)
{
    File.AppendAllText(path, line + "\n");
}

public static string LastShift(string path)
{
    if (!File.Exists(path))
    {
        return "";
    }

    string[] lines = File.ReadAllLines(path);

    if (lines.Length == 0)
    {
        return "";
    }

    return lines[lines.Length - 1];
}
```

- **`AppendAllText` makes the file if it is not there**, which is why an append-only log needs no setting-up step at all.
- **`"\n"` rather than `Environment.NewLine`.** `Environment.NewLine` is two characters on Windows and one everywhere else, so a file written on one machine and read on another can grow blank lines. `File.ReadAllLines` copes with either, so writing the simple one keeps the file identical everywhere.
- **`lines[lines.Length - 1]` is the last entry.** An array's last index is one less than its length, always.

---

## The station's own clock

Haldane stamps every entry with the time it happened, and until this week that time was the string `"14:57"`, typed into the code. That was fine while nothing could read the log back. It is not fine in a file: a book with the same time on every line is not a book.

```csharp
// inside Watch
public static string Now()
{
    return DateTime.UtcNow.ToString("HH:mm", CultureInfo.InvariantCulture);
}
```

- **`DateTime.Now` is this machine's clock. `DateTime.UtcNow` is the world's.** Haldane keeps UTC — a lot of Antarctic stations do, because at the bottom of the world every meridian is a few hundred meters away and a local time zone is a choice rather than a fact. The station runs on one clock and it is not the clock of whatever laptop is on the desk.
- **`"HH:mm"` is 24-hour with a leading zero** — `09:05`, never `9:05`. Capital `HH` is 24-hour; lowercase `hh` is 12-hour and would give you two `09:05`s a day.
- **`CultureInfo.InvariantCulture`** (from `using System.Globalization;`) pins the separator, so it is a colon on every machine.

### Keeping the book in order

A real clock brings a real problem with it. The log is displayed in the order the entries sit in the list, and that only *looked* like time order because everything was added in order.

```csharp
// inside Watch — Add, now that the times are real
public void Add(ILogEntry entry)
{
    int at = _entries.Count;

    for (int i = 0; i < _entries.Count; i++)
    {
        if (string.CompareOrdinal(_entries[i].Time, entry.Time) > 0)
        {
            at = i;
            break;
        }
    }

    _entries.Insert(at, entry);
}
```

Walk until you find the first entry that is *later* than the new one, and put the new one in front of it; if there isn't one, it goes on the end. `List<T>.Insert(index, item)` is the same list you have had since week 3, with a method you have not needed until now.

💡 **Why comparing the text works.** `string.CompareOrdinal` compares character by character — and for times written `HH:mm`, that gives exactly the same answer as comparing the clock. `"09:05"` sorts before `"14:20"` because `0` sorts before `1`. **That only holds because of the leading zero**, which is the same padding week 7's lab put back into `Broadcast.Clock`. Drop it and `"9:05"` sorts *after* `"14:20"`, because `9` is bigger than `1`.

The real point is not the sorting. It is that the log is in order **because something puts it in order**, rather than because the lines happened to arrive that way. That is the difference between a property and a coincidence, and only one of the two can be tested.

---

## Testing something that touches a file

Nothing new about the fact — the same three moves as week 7. What is new is the scene: it needs a file, and it must not be *your* file.

```csharp
// Project.Tests/RegistryTests.cs — mine is payphones
[Fact]
public void Week8_TheRegistrySurvivesARestart()
{
    string path = Path.Combine(Path.GetTempPath(), "payphones-test.json");
    File.Delete(path);

    Registry registry = new Registry();
    Payphone depot = registry.NewItem("Bus depot, west wall");
    depot.Coins = 50;
    registry.Add(depot);
    depot.Visit(handsetStillThere: false);

    registry.Save(path);

    // A second registry, holding nothing, reading the same file.
    Registry reopened = new Registry();
    reopened.Load(path);

    Assert.Equal(1, reopened.Count);

    Payphone? back = reopened.Find("Bus depot, west wall");

    Assert.NotNull(back);
    Assert.Equal(50, back!.Coins);
    Assert.Equal(1, back.TimesVisited);
    Assert.False(back.HasHandset);
}
```

- **`File.Delete(path)` first.** A file left behind by the last run would let this pass without saving anything. `File.Delete` on a file that is not there does nothing and throws nothing.
- **The second `Registry` is the whole point.** Loading into the registry that just saved proves nothing — it already holds the records. A fresh one, holding nothing, is "quit it and start it again" without quitting.
- **`Assert.NotNull(back)` before `back!.Coins`.** `Find` can come back empty, and the compiler knows it. Asserting first is both the check and the answer to the warning.
- **The last two asserts are the ones that would have caught the private-set trap.** `Count` and the name survive on their own. `TimesVisited` and `HasHandset` do not, until you say so.

---

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `FileNotFoundException` / `DirectoryNotFoundException` on a `Load` | No `File.Exists(path)` guard, or the folder in your path doesn't exist. `File.WriteAllText` makes the *file*; it does not make *folders*. |
| The file saves but the program still starts empty | Two possibilities, and they look identical: `Load` is never called, or it is called and the path it gets is not the path `Save` got. Print the path at both ends once. |
| The file is there and `File.Exists` says false | Almost always the working directory. `dotnet run` stands at the top of your repo, <kbd>F5</kbd> stands in the project folder, and `dotnet test` stands in `bin/Debug/net10.0`. Print `Path.GetFullPath(path)` and look at what comes out. |
| A count or a flag comes back at 0 / false, and the file clearly holds the right value | `{ get; private set; }` — the serializer wrote it and cannot write it back. `[JsonInclude]` above the property, and `using System.Text.Json.Serialization;` at the top of the file. |
| `JsonException: The JSON value could not be converted` | The file was written by an older version of your class, or edited by hand into something that no longer matches. Delete it and let the program make a new one. |
| Every record comes back with default values | Your record has no public parameterless constructor *and* no constructor whose parameters match the property names. The serializer needs one road in. |
| `Load` doubles the records every run | No `Clear()` before filling. Loading is replacing, not adding. |
| `IndexOutOfRangeException` after a `Split` | A line has fewer pieces than the code reaches for. Check `field.Length` before you index. |
| The lines come back in a different order than you wrote them | You are reading a `Dictionary`, not a list, somewhere in the chain. A `List<T>` and a file both keep their order. |
| `dotnet test` passes and the program is wrong | The checks never look at `Program.cs`. Run the program too — half of this week is only visible on screen. |
| A value isn't what you think it is | **Set a breakpoint and look.** [Week 5's drill](../week-05/lecture-notes.md#the-debugger-and-what-it-is-actually-for) is still faster than twenty minutes of guessing, and a `path` variable is exactly the kind of thing to put in the Variables pane. |
