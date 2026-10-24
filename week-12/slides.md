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


# Week 12 — One Caller, Many Requests

**EF Core: a second table, and questions the database answers**

- a caller gets a table of requests, tied to them by their `Id`
- `Include` brings the requests back with the caller
- a LINQ question that runs as SQL, inside the database — and the log shows it
- **your lab:** a cart gets a table of airings

.NET Database Development · Week 12 of 16

---

<!-- _footer: '🖥️ Demo §2 · a caller has many requests' -->

## One caller, many requests

**Requests**

| Id | CallerId | Title |
|---|---|---|
| 1 | 1 | Nightjar |
| 2 | 1 | Slack Water |
| 3 | 2 | Nightjar |

`CallerId` holds the `Id` of a row in **Callers**.
Dorothy is `1`, so both of her requests say `1`.

---

<!-- _footer: '🖥️ Demo §4 · the database answers' -->

## LINQ words, SQL words

| You write | The database runs |
|---|---|
| `db.Callers` | `FROM [Callers]` |
| `.Where(…)` | `WHERE …` |
| `.Any(…)` | `EXISTS (…)` |
| `.OrderBy(…)` | `ORDER BY …` |
| `.Select(…)` | the columns after `SELECT` |
| `.ToList()` | **sent** — anything after it runs in your program |

---

<!-- _footer: '🖥️ Demo §5 · wrap' -->

## Tonight, in one picture

**EF Core: two tables, one relationship**

- a list on the record → a second table, with the parent's `Id` in every row
- `Include` → the list comes back with its record
- LINQ before `ToList()` → SQL, answered by the database
- the log shows every command the program sends
