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

# Week 3 — Collections, and Losing Everything at Midnight

.NET Database Development · Week 3 of 16

---

<!-- _footer: '🖥️ Demo §1 · the question' -->

## Three calls, three runs

Your homework asked you to take three calls,

one program run at a time.

<br>

**Where are the first two calls**

**while the third one is happening?**

---

<!-- _footer: '🖥️ Demo §1 · nowhere' -->

## Nowhere

They never existed at the same time.

<br>

Each run built one call, printed it, and ended.

<br>

**Tonight: a program that can hold more than one thing.**

---

<!-- _footer: '🖥️ Demo §2 · who chose the 3' -->

## Who chose the 3?

```csharp
string[] names = new string[3];
names[3] = "Bhatt";
```

```
System.IndexOutOfRangeException
```

<br>

**You did. Before you knew how many there'd be.**

---

<!-- _footer: '🖥️ Demo §2 · the list' -->

## The one that grows

```csharp
List<string> outside = new List<string>();
outside.Add("Okonkwo");
outside.Add("Bhatt");     // no crash. It gets longer.

Console.WriteLine(outside.Count);   // 2
```

`Add` puts one on the end · `Count` is the list answering

<br>

**`Count` is never a variable you keep updated.**

---

<!-- _footer: '🖥️ Demo §2 · a list of your own type' -->

## What the brackets are for

```csharp
List<SignOut> outside = new List<SignOut>();
outside.Add(new SignOut("14:20", "Okonkwo",
                        "MET RUN", "15:00"));
```

<br>

A list **of** something — and that something can be

a class you wrote this morning.

---

<!-- _footer: '🖥️ Demo §3 · counting spaces' -->

## Counting spaces by hand

```csharp
Console.WriteLine($"{s.Time,-8}{s.Name,-12}{s.Reason,-10}{s.Expected}");
```

```
14:20   Okonkwo     MET RUN   15:00
14:57   Achterberg  DIG OUT VENT 316:30
```

**Those widths are guesses about text that didn't exist yet.**

Week 2's sentence, in new clothes.

---

<!-- _footer: '🖥️ Demo §3 · your first package' -->

## Your first NuGet package

```bash
dotnet add week-03/Haldane package Spectre.Console --version 0.57.2
```

It edited **one file** — your `.csproj`:

```xml
<PackageReference Include="Spectre.Console" Version="0.57.2" />
```

**Nothing was installed on your machine.**

Restored, not installed — so a wiped lab PC doesn't care.

---

<!-- _footer: '🖥️ Demo §4 · the table' -->

## One line does the drawing

```csharp
foreach (SignOut s in outside)
{
    board.AddRow(s.Time, s.Name, s.Reason, s.Expected);
}

AnsiConsole.Write(board);
```

The loop didn't change. **The counting of spaces went away.**

Padding guesses. A table **measures**.

---

<!-- _footer: '🖥️ Demo §5 · names not positions' -->

## Names, not positions

```csharp
Dictionary<string, string> roles = new();

roles["Bhatt"] = "comms";
Console.WriteLine(roles["Bhatt"]);   // comms
```

A list finds things by **position**.

<br>

A dictionary finds them by **key** — and a key is unique.

---

<!-- _footer: '🖥️ Demo §5 · the key that is not there' -->

## The key that isn't there

```
System.Collections.Generic.KeyNotFoundException:
The given key 'Halvorsen' was not present
in the dictionary.
```

Not `null`. Not `0`. **It throws.**

<br>

Assigning a missing key **creates** it. *Reading* one throws.

---

<!-- _footer: '🖥️ Demo §5 · tryGetValue asks first' -->

## TryGetValue asks first

```csharp
if (roles.TryGetValue(who, out string? role))
{
    // it was there, and role is filled in
}
```

<br>

**You have seen this exact shape before.**

Last week it was called `int.TryParse`.

---

<!-- _footer: '🖥️ Demo §6 · run it again' -->

## Run it again

```
4 people outside.
```

```
3 people outside.
```

<br>

Nothing was typed. Nothing is broken.

**The three that came back are lines of source code.**

---

<!-- _footer: '🖥️ Demo §6 · where this gets answered' -->

## A place to keep things *while you work*

A collection is not a place to keep things.

<br>

**Week 8** — your list gets a file, and survives the night.

**Week 10** — it gets a database, and leaves the building.

<br>

*Being annoyed by this is the assignment.*

---

<!-- _footer: '🖥️ Demo §7 · hand off' -->

## Lab: the night's log

**KDXR 88.1 "The Owl"** — the desk that forgot everything.

Tonight it remembers: a `List` of calls,

a `Dictionary` of who keeps ringing.

```bash
dotnet test week-03/Lab.Checks
```

**1 / 5 green** out of the box.

**⏱️ 60 minutes · target tonight: 1–5 green, then lose it.**

---

<!-- _footer: '🖥️ Demo §8 · one picture' -->

## Tonight, in one picture

**A list** is every one of them, in order.

**A dictionary** is one entry per key.

**Neither was ever written down.**

<br>

Week 4: your own topic — and a repo you keep until December.
