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

# Week 4 — OOP With a Reason

.NET Database Development · Week 4 of 16

---

<!-- _footer: '🖥️ Demo §1 · the class you already write' -->

## What's wrong with this class?

```csharp
public class SignOut
{
    public string Time;
    public string Name;
    public string Reason;
    public string Expected;
}
```

It has been on that board all term.

---

<!-- _footer: '🖥️ Demo §2 · the correction' -->

## A correction, at −39

Reyes radios in. She'll be another half hour.

```csharp
outside[1].Expected = newTime;
```

The duty officer is wearing gloves.

They hit Enter a beat early.

---

<!-- _footer: '🖥️ Demo §2 · what it costs' -->

## Nothing happened

```
│ 14:20 │ Reyes     │ DIG OUT │          │
└───────┴───────────┴─────────┴──────────┘
3 people outside.
```

No exception. No warning. No squiggle.

**The board has lost the one fact that says she's late.**

---

<!-- _footer: '🖥️ Demo §3 · a hole in the wall' -->

## What a public field is

A hole in the wall of your class.

Anything, anywhere, at any time, can write

anything at all into it —

and there is **nowhere to put the rule**.

---

<!-- _footer: '🖥️ Demo §3 · a door with somebody at it' -->

## A property is a door

```csharp
private string _expected = "unknown";

public string Expected
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
```

---

<!-- _footer: '🖥️ Demo §3 · the line outside did not change' -->

## The caller never noticed

```csharp
outside[1].Expected = newTime;
```

**The same line as before.**

Reads like a field. Written like a field.

Now a method runs on the way in.

---

<!-- _footer: '🖥️ Demo §4 · some things never change' -->

## Some facts are not editable

```csharp
public string Name { get; }
```

No setter at all. Set once, in the constructor.

A sign-out is a record of something that happened.

**You do not get to edit who it was.**

---

<!-- _footer: '🖥️ Demo §5 · the record is the authority' -->

## `private set`

```csharp
public bool IsBack { get; private set; }

public void Back()
{
    IsBack = true;
}
```

Read it anywhere. Write it **nowhere else**.

There is no line you can write that claims

somebody came back who didn't.

---

<!-- _footer: '🖥️ Demo §6 · the class that holds the list' -->

## The list is nobody's business

```csharp
private readonly List<Song> _songs
    = new List<Song>();

public int Count => _songs.Count;

public List<Song> All()
{
    return new List<Song>(_songs);   // a COPY
}
```

Return `_songs` and the `private` meant nothing.

---

<!-- _footer: '🖥️ Demo §6 · your own topic' -->

## Your project starts tonight

Your topic. Your records. Your repo — **public**.

Every week from here extends **this same program**:

behaviour · interfaces · tests · a file

queries · a database · CRUD · a second table

**Week 16 you present it.**

---

<!-- _footer: '🖥️ Demo §6 · the sentence that picks your topic' -->

## Finish this sentence

> ### "Each one of my ___ has many ___."

Lighthouses have many **visits**.

Albums have many **tracks**.

Payphones have many **checks**.

⚠️ **Can't finish it? Pick another topic — tonight.**

---

<!-- _footer: '🖥️ Demo §7 · branch, pull request, merge' -->

## Nothing goes straight to `main` again

```bash
git checkout -b the-registry
git push -u origin the-registry
```

Then: open the pull request, read your own diff,

and press **Merge pull request**.

⚠️ Not *Squash*. Not *Rebase*. The plain one.

---

<!-- _footer: '🖥️ Demo §8 · hand off' -->

## Lab: the rotation that fights back

Two files. Five checks. **1 / 5 out of the box.**

At 03:14 the automation glitches and starts

writing nonsense into your rotation.

Every task you finish, one more attack bounces.

**⏱️ 50 minutes · target tonight: 1–5 green.**

---

<!-- _footer: '🖥️ Demo §9 · one picture' -->

## Tonight, in one picture

**A field** — anything can say anything.

**A property** — somebody is standing at the door.

**`private set`** — the record is the authority on itself.

And a repo of your own, with your name on it.
