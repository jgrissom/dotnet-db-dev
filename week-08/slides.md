---
marp: true
theme: gaia
class: invert
paginate: true
style: |
  section pre {
    background: #151b23;
    border-radius: 8px;
  }
  section pre code {
    background: transparent;
    color: #e6edf3;
  }
  section pre .hljs-keyword { color: #ff7b72; }
  section pre .hljs-string { color: #a5d6ff; }
  section pre .hljs-title, section pre .hljs-title.function_ { color: #d2a8ff; }
  section pre .hljs-comment { color: #9198a1; font-style: italic; }
  section pre .hljs-attr, section pre .hljs-attribute { color: #79c0ff; }
  section pre .hljs-number, section pre .hljs-literal { color: #79c0ff; }
  section pre .hljs-built_in { color: #ffa657; }
  section pre .hljs-name { color: #7ee787; }
  section footer { color: #9fb2c1; font-size: 0.6em; opacity: 0.85; }
---

<!-- _paginate: false -->


# Week 8 — The Log Stops Being Gone

.NET Database Development · Week 8 of 16

---

<!-- _footer: '🖥️ Demo §2 · gone' -->

## Gone

```
Watch log:
  07:40  FUEL      day tank 4300 L
  09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
  ...
```

Nakamura signed out. Then I pressed `q`.

The list was in memory. Memory belongs
to the process. **The process ended.**

Nothing is broken. Week 3 said so.

---

<!-- _footer: '🖥️ Demo §2 · the test you cannot write' -->

## The test you cannot write

```csharp
[Fact]
public void ItIsStillThereAfterARestart()
{
    // ...and then what?
}
```

Last week you learned to write a rule down
so a machine re-asks it forever.

**There is nothing to call.**

---

<!-- _footer: '🖥️ Demo §2 · a file is a place to put text' -->

## A file is a place to put text

```csharp
File.WriteAllText(path, text);   // makes it, or REPLACES it
string s = File.ReadAllText(path);

File.WriteAllLines(path, list);  // one line each
string[] l = File.ReadAllLines(path);

File.AppendAllText(path, line);  // ADDS to the end
bool there = File.Exists(path);
```

`WriteAllText` is a **save file**.
`AppendAllText` is a **log**.

---

<!-- _footer: '🖥️ Demo §3 · where the file actually goes' -->

## Where the file actually goes

A plain name is worked out from **where you
were standing**, not from where the code is.

| typed at the top of your repo | runs in |
|---|---|
| `dotnet run --project week-08/Lab` | the top |
| `dotnet test week-08/Lab.Checks` | `bin/Debug/net10.0` |

Same name. **Two different files.**

So the path is **handed in**, always.

---

<!-- _footer: '🖥️ Demo §3 · readable, and useless' -->

## Readable, and useless

```
09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
```

Perfect. A person can read it.

Now read it back **in.** Where does the
name stop and the reason start?

That line is a sentence `Line()` wrote
for a human — and it may reword it
next week.

---

<!-- _footer: '🖥️ Demo §4 · the kind word comes first' -->

## The kind word comes first

```
SIGNOUT|09:05|Lindqvist|FUEL|10:30|out
MET|12:00|-39.8|Moretti
FUEL|07:40|4300
```

- the **kind** first — you know what
  the line is before you read it
- a separator that **cannot appear
  in a field** (a `|`, not a comma)
- nothing that can be **worked out**

---

<!-- _footer: '🖥️ Demo §4 · one list, one type' -->

## One list, one type

Twelve lines by hand, for a log with
three kinds of things on it.

Most lists are **one list of one type** —
and for those it is two lines:

```csharp
string json = JsonSerializer.Serialize(_songs);
List<Song>? back =
    JsonSerializer.Deserialize<List<Song>>(json);
```

You use this one in the lab.

---

<!-- _footer: '🖥️ Demo §5 · still there' -->

## Still there

```
│ 14:57 │ Nakamura │ WALK │ 19:40 │ OUT │ 1 │

4 people outside.
4 trips logged today.
```

Same board. **New process.**

That last line is a count each crew member
keeps. Nothing in the file says `4`.

---

<!-- _footer: '🖥️ Demo §6 · the station’s own clock' -->

## The station's own clock

```csharp
DateTime.UtcNow.ToString("HH:mm")
```

`Now` is this machine. `UtcNow` is the world.

And a real clock breaks an assumption:
the log looked time-ordered because
**everything happened to arrive in order.**

Now `Add` puts each line where its
time says it goes.

---

<!-- _footer: '🖥️ Demo §7 · the fact you could not write' -->

## The fact you could not write

```csharp
watch.Save(path);

Watch reopened = new Watch();
reopened.Load(path, crew);

Assert.Equal(1, reopened.Count);
```

A **second** watch, holding nothing.

That is quitting and starting again,
without quitting.

---

<!-- _footer: '🖥️ Demo §8 · a file is a text file' -->

## A file is a text file

I opened the log and deleted one line.

```
3 people outside.

Muster - still to account for:
  Lindqvist, Okonkwo, Nakamura
```

**Reyes is outside.**

No crash. No warning. One file, one
laptop, one person who can open it.

---

<!-- _footer: '🖥️ Demo §9 · lab: the log book' -->

## Lab: the log book

KDXR forgets the night too — which carts
played, and who had the desk before you.

- the rotation, saved as **JSON**
- the air log, **appended** to
- one number that will not come back

**⏱️ 50 minutes · target tonight: 5 green.**

---

<!-- _footer: '🖥️ Demo §10 · tonight, in one picture' -->

## Tonight, in one picture

**text → fields → objects → and back**

- `File` does each trip in one line
- the **kind** word first
- a serializer, when it is one type
- the **path is handed in**
- no file is a **first run**

Week 10: somewhere that isn't your laptop.
