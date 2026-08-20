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

# Week 5 — How Many Are There?

.NET Database Development · Week 5 of 16

---

<!-- _footer: '🖥️ Demo §2 · the error everybody has met' -->

## An object reference is required

```
error CS0120: An object reference is required
for the non-static field, method, or property
'CrewMember.TripsToday'
```

Who has made this one go away by typing `static`?

---

<!-- _footer: '🖥️ Demo §2 · what that cost' -->

## Three people. One number.

```
│ Lindqvist │ back │ 3 │
│ Reyes     │ OUT  │ 3 │
│ Okonkwo   │ OUT  │ 3 │
```

Each of them went out **once**.

Nothing crashed. Nothing warned. It builds clean.

---

<!-- _footer: '🖥️ Demo §3 · one word, one meaning' -->

## What `static` actually says

**This member belongs to the class,**

**not to any one thing.**

One copy. Made once.

Alive as long as the program runs.

---

<!-- _footer: '🖥️ Demo §3 · one each, or one between them' -->

## One copy, or one each

```csharp
public int TripsToday { get; private set; }
//  one per crew member — three objects, three counters

public static int TripsToday { get; private set; }
//  one per PROGRAM — three objects, one counter
```

The word is the whole difference.

---

<!-- _footer: '🖥️ Demo §4 · watch one get built' -->

## Step into the constructor

Breakpoint on `Name = name;` · **F5**

Before the line runs:

```
this.Name        null
this.TripsToday  0
```

**The object exists before any of its facts do.**

---

<!-- _footer: '🖥️ Demo §4 · which one moved' -->

## Which one is `this`?

`TripsToday++` inside `GoesOut()`.

Stop there three times and `this` is a

different crew member every time.

**That is what the word `static` was hiding.**

---

<!-- _footer: '🖥️ Demo §5 · where it is right' -->

## When `static` is right

`Conditions.IsSafeToGoOut(-39.0, false)`

`Console.WriteLine(...)` · `int.TryParse(...)`

You have never written `new Console()`.

> **Is there exactly one of these, ever? → `static`.**
> **Is it a fact about one thing? → never.**

---

<!-- _footer: '🖥️ Demo §6 · the copy that was not one' -->

## Two names, one object

```csharp
List<SignOut> muster = new List<SignOut>(outside);

foreach (SignOut s in muster) { s.Back(); }
```

```
0 people outside.
```

**Two of them are still out there.**

---

<!-- _footer: '🖥️ Demo §6 · what a copy copies' -->

## A copy of the list is not a copy of the records

A new list. **The same records in it.**

`muster[1]` and `outside[1]` are two names

for one sign-out.

Last week that protected the board.

Tonight it is the thing to watch for.

---

<!-- _footer: '🖥️ Demo §7 · a name for nothing' -->

## `CrewMember` and `CrewMember?`

```csharp
CrewMember  who    // there is one
CrewMember? who    // there might not be
```

`Find` looked, and nobody was called that.

**`null` is the honest answer, not a failure.**

---

<!-- _footer: '🖥️ Demo §7 · it told you first' -->

## The warning that was already there

```
warning CS8604: Possible null reference
argument for parameter 'who'.
```

It said so at **build** time.

The crash came later, at −39, in gloves.

---

<!-- _footer: '🖥️ Demo §8 · hand off' -->

## Lab: the switchboard

Two files. Five checks. **1 / 5 out of the box.**

Dorothy, Bex and Teodoro have rung tonight.

The board says they have called **6** times each.

Between them, they have called six times.

**⏱️ 50 minutes · target tonight: 1–5 green.**

---

<!-- _footer: '🖥️ Demo §9 · one picture' -->

## Tonight, in one picture

**`static`** — one copy, for the whole program.

**Instance** — one each, and `this` says which.

**A reference** — a name for an object, and two

names can be for the same one.

**`null`** — a name for nothing at all.
