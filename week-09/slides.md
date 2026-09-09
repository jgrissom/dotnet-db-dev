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


# Week 9 — Thirty Lines Become One

.NET Database Development · Week 9 of 16

---

<!-- _footer: '🖥️ Demo §2 · the promise, collected' -->

## A method, and a line

```csharp
double latest = -41.5;
foreach (ILogEntry entry in _entries)
    if (entry is Reading r) latest = r.Celsius;
return latest;
```

```csharp
return _entries.OfType<Reading>()
    .LastOrDefault()?.Celsius ?? -41.5;
```

**Week 6 wrote the top one. Week 6 promised the bottom one.**

---

<!-- _footer: '🖥️ Demo §2 · the promise, collected' -->

## One shape, every time

```
the sequence . the verb ( what to ask of each one )
```

```csharp
crew.Sum(c => c.TripsToday)
```

- `crew` — the list
- `Sum` — what to do with it
- `c => c.TripsToday` — the question

**Everything tonight is those three parts.**

---

<!-- _footer: '🖥️ Demo §2 · the promise, collected' -->

## Reading it out loud

```csharp
c => c.TripsToday
```

- `c` — one thing out of the list. **You name it.**
- `=>` — *"goes to"*
- `c.TripsToday` — the answer, for that one

> add up the crew, and the thing to add up
> about each one is their trips today

You never write the type. The list already knows it.

---

<!-- _footer: '🖥️ Demo §3 · six more of the same shape' -->

## What each word hands back

| Word | Hands back |
|---|---|
| `Where` · `Select` · `OrderBy` · `Take` · `OfType<T>` | a **sequence** |
| `Sum` · `Count` · `Average` | one **number** |
| `Any` · `All` | **true** or **false** |
| `FirstOrDefault` · `LastOrDefault` · `MaxBy` · `MinBy` | one **thing**, or nothing |

**The right-hand column is the one that matters.**
A word that hands back a sequence can have another
word after it. One that hands back a number cannot.

---

<!-- _footer: '🖥️ Demo §3 · six more of the same shape' -->

## On an empty sequence

| | |
|---|---|
| `First()` `Last()` `Single()` | 💥 **throws** |
| `Average()` | 💥 **throws** |
| `FirstOrDefault()` `LastOrDefault()` | `null` |
| `MaxBy()` `MinBy()` | `null` — so `.Name` 💥 |
| `Sum()` `Count()` | `0` |

**Your loop could not do this.**

---

<!-- _footer: '🖥️ Demo §3 · six more of the same shape' -->

## What stays a loop

**A query asks. A loop can do.**

- `Watch.Add` — **inserts** at a worked-out position
- `Watch.Save` / `Load` — **makes** things
- `Hour.Run` — **airs** the hour on the way past
- `Registry.Everything()` — there *is* a one-liner,
  and it reads worse

**A one-liner is not the goal.**

---

<!-- _footer: '🖥️ Demo §4 · the muster that lost a name' -->

## A query is a recipe

```csharp
var muster = watch.SignOuts().Where(s => !s.IsBack);
// 3 unaccounted for

watch.MarkBack("Okonkwo");
// the muster, as taken - 2 unaccounted for
```

`Where` handed back **instructions**, not a list.
Instructions run again every time you look.

**A muster is a record of a moment.** `.ToList()`

---

<!-- _footer: '🖥️ Demo §5 · a season of weather' -->

## A season of weather

```
95|22:05|-68.6|Nakamura
96|07:41|-61.2|Moretti
```

**50,000 readings. 250 days. One text file.**

Somebody walked out to the masts and read a
number off an instrument. Every time.

Nothing has ever asked it anything.

---

<!-- _footer: '🖥️ Demo §5 · a season of weather' -->

## Six questions, six lines

```csharp
book.Max(r => r.Day)
book.Average(r => r.Celsius)
book.MinBy(r => r.Celsius)
book.Count(r => r.Celsius < -50)
```

**Nobody was going to write a loop** to find out
how many readings this season were below −50.

Not because it is hard. Because it was never
worth the loop — so the question never got asked.

---

<!-- _footer: '🖥️ Demo §6 · what it cost' -->

## What it cost

```
the book, in memory    11.8 MB from a 1.1 MB file
```

- getting the list cost **more than every question**
- it read **all** 50,000 to answer any one
- **ten times the file**, held, to ask six questions

That is *one* season. Haldane opened in 1994.

---

<!-- _footer: '🖥️ Demo §7 · hand off' -->

## Lab: the night's numbers

**Task 1 turns nothing green.** You delete seven
working loops and the count stays where it was.
Your own suite is how you know it worked.

- a cart long enough to cover the news
- what has not been out tonight
- what got worked hardest
- what is coming, without airing it

**⏱️ 50 minutes · target tonight: 5 green.**

---

<!-- _footer: '🖥️ Demo §8 · wrap' -->

## Tonight, in one picture

**sequence · verb · question**

- one shape, and a handful of words
- **some of them throw** on nothing
- a query **asks** — it changes nothing
- `.ToList()` turns instructions into an answer
- a file answers nothing without reading all of it

Week 10: somewhere that isn't your laptop.
