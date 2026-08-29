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

# Week 6 — One Loop, Four Kinds of Thing

.NET Database Development · Week 6 of 16

---

<!-- _footer: '🖥️ Demo §2 · the log that isn’t a log' -->

## Two lists, two loops

```csharp
foreach (SignOut s in outside)  { ... }
foreach (Reading r in readings) { ... }
```

```
14:20  SIGN OUT  Okonkwo
14:20  SIGN OUT  Reyes
09:05  SIGN OUT  Lindqvist
12:00  MET       -39.8 C
```

Every line is true. It is still not a log.

---

<!-- _footer: '🖥️ Demo §2 · the log that isn’t a log' -->

## You cannot sort your way out

There is nothing to sort.

They are in **two different lists**, and the second one
does not start until the first has finished.

Every new kind of thing is:

- another list
- another loop
- another place to forget

---

<!-- _footer: '🖥️ Demo §3 · one list, and it can tell you nothing' -->

## `object` promises nothing

```csharp
List<object> log = new List<object>();

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

It holds anything. You can ask it nothing.

---

<!-- _footer: '🖥️ Demo §3 · one list, and it can tell you nothing' -->

## An interface is a promise

```csharp
public interface ILogEntry
{
    string Time { get; }
    string Kind { get; }
    string Line();
}
```

No bodies. Nothing to `new`.

A list of what a thing must be able to **answer** —
and nothing about what it **is**.

---

<!-- _footer: '🖥️ Demo §3 · one list, and it can tell you nothing' -->

## The compiler writes the to-do list

```
error CS0535: 'SignOut' does not implement
  interface member 'ILogEntry.Kind'

error CS0535: 'SignOut' does not implement
  interface member 'ILogEntry.Line()'
```

Three were promised. It asks for **two**.

`Time` was already there.

---

<!-- _footer: '🖥️ Demo §4 · the third kind' -->

## A new kind costs one class

```csharp
public class FuelCheck : ILogEntry
```

```
07:40  FUEL      day tank 4300 L
09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
12:00  MET       -39.8 C, taken by Moretti
```

The loop that printed that has not been touched
since the promise landed.

---

<!-- _footer: '🖥️ Demo §5 · a promise is not a parent' -->

## A promise is not a parent

`SignOut : ILogEntry` does **not** say
*a sign-out is a kind of log entry*.

It says *a sign-out can answer these three questions*.

Everything above those two new members is
exactly what it was this morning.

---

<!-- _footer: '🖥️ Demo §5 · a promise is not a parent' -->

## One parent. As many promises as you like.

C# gives a class **one** base class
and **any number** of interfaces.

That is the language saying:

- what a thing **is** — one answer
- what it can **do** — a list

---

<!-- _footer: '🖥️ Demo §5 · a promise is not a parent' -->

## Four words, three of them yours

**Encapsulation** — week 4. `Expected` refuses a blank.

**Abstraction** — tonight. The loop knows three questions.

**Polymorphism** — tonight. `Line()`, three different jobs.

**Inheritance** — the one you have not used.

---

<!-- _footer: '🖥️ Demo §6 · the board is a question' -->

## Two lists. One of them forgot.

```
4 people outside.

Watch log:
  ...
  14:35  MET  -41.5 C, taken by Bhatt
```

Moretti is outside.
The station's record of the watch has never heard of her.

No error. No warning. The board looks perfect.

---

<!-- _footer: '🖥️ Demo §6 · the board is a question' -->

## Ask, when one kind is different

```csharp
foreach (ILogEntry entry in log)
{
    if (entry is SignOut s)
    {
        found.Add(s);
    }
}
```

One loop treating everything the same is the trick —
right up to the kind that isn't.

---

<!-- _footer: '🖥️ Demo §7 · hand off' -->

## Lab: the hour

An hour of radio is not songs.

It is a **song**, a **station ID**, an **ad** somebody paid for,
and the **forecast** — four classes, one list, one loop.

`Song` already keeps half the promise.
The other three are yours.

**⏱️ 50 minutes · target tonight: 5 green.**

---

<!-- _footer: '🖥️ Demo §8 · one picture' -->

## Tonight, in one picture

| | says |
|---|---|
| a **class** | what a thing is |
| an **interface** | what it can answer |
| `List<IThing>` | anything that answers |
| `is` | …and when one is different |

The log is the whole record of this watch.

Shut the program down and it is gone. **Week 8.**
