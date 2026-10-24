# Week 12 — Lecture Notes

**EF Core III: a second related table.** Until now every table at the desk stood alone: a caller was one row and a cart was one row. This week a caller has many requests and a cart has many airings, each in a table of its own, tied to its parent by the parent's `Id`. Then a question goes to the database in LINQ, and EF Core's log shows the SQL it turns into.

These notes are further reading. The [lab](lab/README.md) and the [homework](homework.md) carry everything you need to do the work; this is the *why* behind it.

---

## One record, many of something

A caller rings many times and asks for many songs. One column can't hold many songs, so **requests get a table of their own**, and each request says whose it is. This is your instructor's, in `Lab/Request.cs`:

```csharp
// One request: a title, asked for by one caller, at one time.

public class Request
{
    // The database's own number for this request's row.
    public int Id { get; set; }

    // Which caller made it: the Id of that caller's row in Callers.
    public int CallerId { get; set; }

    public string Title { get; private set; }

    public DateTime At { get; private set; }

    public Request(string title, DateTime at)
    {
        Title = title;
        At = at;
    }
}
```

And this is the line that makes it *many*, inside `Caller` in `Lab/Caller.cs`:

```csharp
    public List<Request> Requests { get; private set; } = new List<Request>();
```

Three pieces, and EF Core reads all three:

- **The list on the parent** — `Caller.Requests`. EF Core sees a list of another class and knows the relationship is *one caller, many requests*.
- **The child's own `Id`** — every row needs one, as always.
- **The parent's `Id` on the child** — `CallerId`. EF Core finds it by its name: the parent's class name and `Id`. This column is what ties a request to its caller. It's called a **foreign key**: a column that holds the key of a row in *another* table.

**You never set `CallerId` yourself.** When a caller is saved with new requests in its list, EF Core fills in every request's `CallerId` from the caller's `Id`.

⚠️ **Give the child table a `DbSet` too.** `public DbSet<Request> Requests { get; set; }` in the context. Without it the table still gets made, because EF Core finds `Request` through the list, but it's named after the class: `Request`, not `Requests`.

⚠️ **Don't name the child class after a method the parent already has.** The lab's child is `Airing`, not `Play`, because `Song` has a `Play()` method, and inside `Song` the name `Play` means the method. A class called `Play` doesn't compile.

## Reading a migration that adds a table

`dotnet ef migrations add` compares the desk as it is now with the last migration, and writes down the difference. Adding requests makes this, in `Lab/Migrations/…_ACallerHasManyRequests.cs`:

```csharp
            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CallerId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    At = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Requests_Callers_CallerId",
                        column: x => x.CallerId,
                        principalTable: "Callers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
```

- **`ForeignKey`** says every `CallerId` must be the `Id` of a row in `Callers`. The database refuses a request from a caller who isn't there.
- **`onDelete: ReferentialAction.Cascade`** says that when a caller's row comes out, their requests come out with it. Week 11's `Save` takes a caller's row out when they're taken off the switchboard, so their requests go too.
- **There is nothing about `Callers` or `Songs` in it.** They're already in the database. `database update` applies this one migration, and **the rows in the other tables are left alone**.

⚠️ **A migration makes a table for every class the context now knows about**, not just the one you were thinking of. The lab's migration makes `Airings` and `Requests`, because the copied `Caller.cs` has a list of requests in it.

## Why the airings don't come back on their own

Save a cart with an airing, run the desk again, and the cart's list is empty. The airing's row is in `Airings`. **`Load` never asked for it.** This is week 10's line in `Rotation.Load`:

```csharp
        List<Song> loaded = db.Songs.OrderBy(song => song.Id).ToList();
```

It reads the `Songs` table, and only the `Songs` table. **EF Core does not read a second table unless something tells it to.** `Include` tells it to:

```csharp
        List<Song> loaded = db.Songs.Include(song => song.Airings).OrderBy(song => song.Id).ToList();
```

`Include` comes from EF Core, so the file needs `using Microsoft.EntityFrameworkCore;` at the top. Without it: `CS1061: 'DbSet<Song>' does not contain a definition for 'Include'`.

With the log on, `Include` shows up as a **`LEFT JOIN`**: one query that brings each cart back with its airings.

```
SELECT [s].[Id], [s].[Artist], [s].[PlaysTonight], [s].[Seconds], [s].[Title], [a].[Id], [a].[At], [a].[SongId]
FROM [Songs] AS [s]
LEFT JOIN [Airings] AS [a] ON [s].[Id] = [a].[SongId]
ORDER BY [s].[Id]
```

⚠️ **The `ORDER BY` orders the carts, not their airings.** The airings in each cart's list come back in no promised order. That's why `LastAired` picks the newest with `MaxBy(airing => airing.At)` rather than taking the last one in the list.

## LINQ that runs as SQL

Every LINQ question since week 9 has been asked of a list in memory. A `DbSet` is different: **a LINQ question asked of `db.Songs` is turned into SQL and sent to the database**, and only the answer comes back. This is the lab's, in `Lab/Rotation.cs`:

```csharp
    public List<string> Aired(DeskContext db)
    {
        return db.Songs
            .Where(song => song.Airings.Any())
            .OrderBy(song => song.Title)
            .Select(song => song.Title)
            .ToList();
    }
```

And this is what it sends:

```
SELECT [s].[Title]
FROM [Songs] AS [s]
WHERE EXISTS (
    SELECT 1
    FROM [Airings] AS [a]
    WHERE [s].[Id] = [a].[SongId])
ORDER BY [s].[Title]
```

| LINQ | SQL |
|---|---|
| `db.Songs` | `FROM [Songs]` |
| `.Where(song => …)` | `WHERE …` |
| `song.Airings.Any()` | `EXISTS (SELECT 1 FROM [Airings] …)` |
| `.OrderBy(song => song.Title)` | `ORDER BY [s].[Title]` |
| `.Select(song => song.Title)` | `SELECT [s].[Title]` — one column, not the whole row |

**The database looks through both tables and sends back three titles.** It never sends a cart the question doesn't want, and it never sends an airing at all.

⚠️ **It starts from `db.Songs`, not `_songs`.** `Aired` asks the table. My check 4 proves it by asking a rotation that holds nothing: only the table can answer.

⚠️ **The database only knows what has been saved.** A play made a moment ago is in the cart's list, and it reaches the table when `Save` runs. This week's desk saves the moment something changes, so the two agree.

## ToList is the moment the question is sent

Everything **before** `ToList()` is the question. `ToList()` sends it. Everything **after** `ToList()` runs in your program, on whatever came back.

Your instructor's `AskedFor` showed it by moving one word. Written the right way, the log shows a `WHERE EXISTS`. With `.ToList()` typed straight after `db.Callers`:

```csharp
        return db.Callers.ToList()
            .Where(caller => caller.Requests.Any(request => request.Title == title))
            .OrderBy(caller => caller.Name)
            .Select(caller => caller.Name)
            .ToList();
```

the log shows this, and nothing else:

```
SELECT [c].[Id], [c].[CallsTonight], [c].[Name]
FROM [Callers] AS [c]
```

**The same answer comes out on the screen.** But every caller came back, every column, and the program did the asking. With three callers it costs nothing. With a million, it sends a million rows to answer a question about two of them.

⚠️ **It only got the right answer because `Load` had already brought the requests in.** The first `ToList()` sends no `Include`, so a caller the desk hadn't loaded would come back with an empty list.

## The log

One line in `OnConfiguring` turns on EF Core's log. In `Lab/DeskContext.cs`, after `UseSqlServer`:

```csharp
        options.LogTo(Console.WriteLine, LogLevel.Information, DbContextLoggerOptions.None);
```

It needs two using lines at the top of the file:

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
```

- **`Console.WriteLine`** is where each message goes: the screen.
- **`LogLevel.Information`** is how much: one message per command sent to the database.
- **`DbContextLoggerOptions.None`** leaves off the date, time and category EF Core puts on the front of each message.

**What prints, and when:**

- **At the start of a run** — `Load`'s queries, one per table it reads.
- **At a question** — `AskedFor` or `Aired`, one query each.
- **At a save** — a `SELECT` for `Save`'s third loop, then the `INSERT`s, `UPDATE`s and `DELETE`s. There are a lot of `UPDATE`s: `Save` calls `Update` on every record that came out of the table, changed or not.
- **Nothing at all** for the `n` screen's other lines. They ask the lists the desk is holding.

⚠️ **It sits after the `IsConfigured` return**, so the tests, which hand the context their own options, never log.

⚠️ **`dotnet ef` uses your context too.** With the log on, `database update` prints every command it sends, some of them twice. It still works. That's why the lab turns the log on last.

## 🔧 Troubleshooting

| Symptom | Likely cause |
|---|---|
| `CS1061: … does not contain a definition for 'Include'` | `using Microsoft.EntityFrameworkCore;` is missing from the top of the file. |
| A pile of errors naming `Play` | The child class is called `Play`, and `Song` has a `Play()` method. [Call it something else](#one-record-many-of-something). |
| `Invalid object name 'Airings'` (or `'Requests'`) | No migration made that table, or `database update` hasn't run since. `migrations add`, then `database update`. |
| The table is called `Airing`, not `Airings` | No `DbSet<Airing>` in the context. |
| The list is empty after a restart, and the rows are in the table | No `Include` in `Load`. [Why](#why-the-airings-dont-come-back-on-their-own). |
| A question hands back nothing | It asks the list (`_songs`) instead of the table (`db.Songs`), or the rows haven't been saved yet. |
| The log shows a `SELECT` with no `WHERE` | `ToList()` comes before the `Where`. [Move it to the end](#tolist-is-the-moment-the-question-is-sent). |
| `database update` prints SQL, some of it twice | The log is on. [It's harmless](#the-log). |

**Prev:** [Week 11 — Lecture Notes](../week-11/lecture-notes.md) · **Next:** Week 13 *(coming)*
