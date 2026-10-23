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


# Week 11 — A Cart Comes Off

**EF Core: taking a row out of a table**

- a fresh database for the week
- a record comes off — and comes back, until `Save` takes its row out
- saving as things happen, not only at the end
- one table that everybody in the room writes to
- **your lab:** a cart comes off the rotation and stays off

.NET Database Development · Week 11 of 16

---

<!-- _footer: '🖥️ Demo §4 · out of the table too' -->

## Three jobs for Save

| The record | Save |
|---|---|
| `Id` is 0 — never saved | **`Add`** — a new row |
| came out of the table | **`Update`** — the same row, changed |
| removed from the list | **`Remove`** — its row comes out |

Then **`SaveChanges()`** sends all three.

The table holds **exactly what the list holds**.

---

<!-- _footer: '🖥️ Demo §6 · the request line' -->

## One table, every login

| Every login can | Nobody but the owner can |
|---|---|
| read the requests | change a request |
| add a request | delete a request |
| | touch any other table |

The rules live **in the database**, not in the program.

Every row records **the login that added it**.

---

<!-- _footer: '🖥️ Demo §7 · wrap' -->

## Tonight, in one picture

**EF Core: the table matches the list**

- `Remove` takes a record out of the **list**
- `Save`: **`Add`** the new · **`Update`** the old · **`Remove`** the rows nobody holds
- then **`SaveChanges()`**
- save **when something changes**, and an early stop loses nothing
- one table, **every login in the room**
