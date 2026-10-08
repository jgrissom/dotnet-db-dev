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

<!-- _footer: '🖥️ Demo §2 · a fact first, then one line' -->

## One shape

```
the list . a word ( a question )
```

```csharp
_callers.FirstOrDefault(caller => caller.Name == name)
```

- `caller` — one item from the list. **You pick the name.**
- `=>` — *"goes to"*
- `caller.Name == name` — the answer, for that one

---

<!-- _footer: '🖥️ Demo §3 · a number, and some of them' -->

## What each word hands back

| Word | Hands back |
|---|---|
| `Where` · `Select` · `OrderBy` · `Take` | **several things** |
| `Sum` · `Count` | one **number** |
| `FirstOrDefault` · `MaxBy` | **one thing**, or nothing |

After **several things**, you can keep going.

After a **number**, you are finished.

---

<!-- _footer: '🖥️ Demo §6 · a question, and an answer' -->

## A question, and an answer

```csharp
board.All().Where(caller => caller.CallsTonight > 1)
```

A **question**. Nobody has been asked yet.

```csharp
board.All().Where(caller => caller.CallsTonight > 1).ToList()
```

An **answer**. Asked once, right here, and kept.

---

<!-- _footer: '🖥️ Demo §7 · wrap' -->

## Tonight, in one picture

**a list · a word · a question**

- `FirstOrDefault` hands back one, or `null` — **`First` throws**
- `Where` keeps some · `Select` changes each one
- `OrderBy` hands back a **new** list — yours is left alone
- a question **only reads**
- `ToList()` turns a question into an answer

Week 10: the data moves into a database.
