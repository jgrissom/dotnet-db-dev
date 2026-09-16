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


# Week 10 — The Log Leaves the Building

.NET Database Development · Week 10 of 16

---

<!-- _footer: '🖥️ Demo §2 · a table is the line you already had' -->

## A file, and a table

```
SIGNOUT|14:20|Reyes|DIG OUT|14:45|out
```

| Kind | Time | Who | Reason | Expected | IsBack |
|---|---|---|---|---|---|
| SIGNOUT | 14:20 | Reyes | DIG OUT | 14:45 | 0 |

**Same line. The pipes got names.**

---

<!-- _footer: '🖥️ Demo §2 · a table is the line you already had' -->

## One table, three kinds of lines

| Kind | Who | Reason | Celsius | Liters |
|---|---|---|---|---|
| SIGNOUT | Reyes | DIG OUT | — | — |
| MET | Bhatt | — | -41.5 | — |
| FUEL | — | — | — | 4300 |

The file had this problem too, and hid it better.

**Splitting them up is week 12.**

---

<!-- _footer: '🖥️ Demo §2 · a table is the line you already had' -->

## What a DbContext is

```csharp
public DbSet<LogRow> Log { get; set; }
```

**The tables this program knows about.** One property, one table — and the property's name is the table's name.

Plus: how to reach them.

---

<!-- _footer: '🖥️ Demo §3 · where a password is allowed to live' -->

## Your connection string has your password in it

```
Server=…;Database=…;User Id=…;Password=…
```

It cannot go in the repo.
It cannot be typed in every time the program starts.

**Week 2 committed one on purpose. This is the answer I owed you.**

---

<!-- _footer: '🖥️ Demo §3 · where a password is allowed to live' -->

## What user secrets are not

- **Not encrypted.** A plain file in your home directory
- **Not shared.** Per machine, per project — and the lab PCs wipe
- **Not deployment.** A real server gets its own answer

What they *are*: **not in the repo.**

That is the one problem you have.

---

<!-- _footer: '🖥️ Demo §4 · the migration' -->

## A migration is a class you did not write

```csharp
migrationBuilder.CreateTable(
    name: "Log",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", …)
            .Annotation("SqlServer:Identity", "1, 1"),
        Who = table.Column<string>(type: "nvarchar(max)", …)
    });
```

**Your class, with the column types filled in.** And it can undo itself.

---

<!-- _footer: '🖥️ Demo §4 · the migration' -->

## Two commands, one network

```bash
dotnet ef migrations add TheLogMovesIn
```
Compares your classes to last time. **Writes a file. Touches nothing.**

```bash
dotnet ef database update
```
**Connects.** Makes the database if there isn't one, then the table.

When it goes wrong at home: you wrote it and never ran it.

---

<!-- _footer: '🖥️ Demo §5 · the log leaves the building' -->

## A test that needs no database

```csharp
new DbContextOptionsBuilder<StationContext>()
    .UseInMemoryDatabase("haldane-" + Guid.NewGuid())
```

No server. No password. No network. Milliseconds.

**The rules live in a class, and the class does not know where the database is.** That is the only reason this works.

---

<!-- _footer: '🖥️ Demo §5 · the log leaves the building' -->

## Round two

Week 3 — you typed three records in and quit. Gone.

Week 8 — a file. **It came back.**

Tonight — a table. It came back, **and I read it from a query, with the program closed.**

A file is still your file. This is not.

---

<!-- _footer: '🖥️ Demo §6 · the same question, two answers' -->

## The same question, two answers

```
b → reyes      Nobody outside by that name.
```

```sql
WHERE Who = 'reyes'   →   SIGNOUT  Reyes  DIG OUT
```

**C# compares letters. This server does not care about case.**

Nothing you wrote chose that. It came with the database.

---

<!-- _footer: '🖥️ Demo §7 · hand off' -->

## Lab: the carts leave the building

The rotation — three carts and every play on them — stops being a file.

1. A cart the database can keep
2. A migration, and a database of your own
3. `Save` — and `SaveChanges()`
4. `Load` — and the first night

**⏱️ 50 minutes · target tonight: 5 green.**

---

<!-- _footer: '🖥️ Demo §8 · wrap' -->

## Tonight, in one picture

**A class became a table.** A migration made it.

**The password lives somewhere that is not the repo.**

**The log is on a machine that is not yours** — and next week, everyone in this room is on the same one.
