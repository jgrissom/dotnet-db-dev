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


# Week 10 — The Carts Move In

**EF Core: keeping the data in a database**

- a password that stays outside the repo
- a class becomes a table, made on the college's server
- save and load — and a test that needs no database
- **your lab:** the rotation moves into a database of your own

.NET Database Development · Week 10 of 16

---

<!-- _footer: '🖥️ Demo §2 · the packages, and somewhere for a password' -->

## Where a password lives

```bash
dotnet user-secrets set "ConnectionStrings:Desk" "…" --project week-10/Lab
```

A file in **your home folder**, outside every repo.

| User secrets are | User secrets are not |
|---|---|
| out of the repo | encrypted |
| one command to put back | shared with anyone |
| | on any other machine |

---

<!-- _footer: '🖥️ Demo §3 · a class becomes a table' -->

## Two commands, one network

| | Writes | Touches the server? |
|---|---|---|
| `dotnet ef migrations add` | a migration, in your project | **no** |
| `dotnet ef database update` | the database and its tables | **yes** |

Run only the first, and the table never exists.

---

<!-- _footer: '🖥️ Demo §4 · the switchboard moves in' -->

## A table that lives inside the test

```csharp
new DeskContext()
```

the desk → user secrets → **the college's server**

```csharp
new DeskContext(options)
```

a test → **a table inside the test run** — no server, no password

Same `Save`, same `Load`.

---

<!-- _footer: '🖥️ Demo §7 · wrap' -->

## Tonight, in one picture

**EF Core: a class · a context · a migration · a table**

- the password lives in **user secrets**
- `migrations add` writes · `database update` **makes**
- `Add` the new · `Update` the old · then **`SaveChanges()`**
- an empty table is the **first night**
- a test hands the context **a table of its own**
