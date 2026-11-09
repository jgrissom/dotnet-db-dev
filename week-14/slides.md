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


# Week 14 — The Old Carts

**Schema changes: a new column in a table that already has rows**

- two new columns on the switchboard, and every caller kept
- read the migration before you run it, and take one back
- then your own project, and the week 16 runway
- **your lab:** the same two columns, on the carts

.NET Database Development · Week 14 of 16

---

<!-- _footer: '🖥️ Demo §2 · a column nobody knows' -->

## Two rules for a new column

**What is the true value for the rows you already have?**

| The answer | The column | The old rows get |
|---|---|---|
| **Nobody knows** | can be empty: `DateTime?` | `NULL`, and a dash on the screen |
| **Everybody knows** | can't be empty | **what the migration says** |

`migrations add` writes the type's zero: `0`, `false`, `""`.
Your class's `= 3` is not in it.

---

<!-- _footer: '🖥️ Demo §4 · the warning, and taking it back' -->

## Read it before you run it

- **Adds, or drops?** `AddColumn` is fine. `DropColumn`, `DropTable`, `AlterColumn`: stop
- **What do the old rows get?** `nullable: true`, or the `defaultValue` you mean
- ***may result in the loss of data*** means stop and read

| | Take it back with |
|---|---|
| **not run yet** | `dotnet ef migrations remove` |
| **already run** | `dotnet ef database update` *an earlier name* |

---

<!-- _footer: '🖥️ Demo §5 · the week 16 runway' -->

## Week sixteen: four tens

| Ten points | |
|---|---|
| **It runs** | start to finish, from what's in your repo |
| **You show it** | what it does |
| **You explain one decision** | what you chose, and why |
| **You say what's next** | given another week |

**Tonight:** a clean clone, and three notes in your README

---

<!-- _footer: '🖥️ Demo §6 · wrap' -->

## Tonight, in one picture

**A new column, and every row kept**

- nobody knows the old value: the column can be empty
- everybody knows it: the migration says it
- read every migration before you run it
- `remove` takes one back, until it has been run
