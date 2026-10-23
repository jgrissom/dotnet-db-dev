# Week 11 — Lecture Notes

**EF Core II: taking a row out.** Last week the desk learned to put rows into a table and change them. This week it takes one out, and the table ends up holding exactly what the list holds.

These notes are further reading. The [lab](lab/README.md) and the [homework](homework.md) carry everything you need to do the work; this is the *why* behind it.

---

## A fresh database for the week

Lab Task 1 drops last week's database and makes it again:

```bash
dotnet ef database drop --force --project week-11/Lab
```

```bash
dotnet ef database update --project week-11/Lab
```

**Why not keep it?** A database remembers which migrations it has had, in a table called `__EFMigrationsHistory`. Yours remembers the migration **you** wrote last week, with the date and time you wrote it in its name. This week's starter ships a migration of its own, with a different date in its name. To `database update`, that's a migration your database has never had, so it tries to make `Callers` again:

```
There is already an object named 'Callers' in the database.
```

**Dropping the database puts the two back in step,** and it means everybody's desk starts tonight from the same three carts. It's a lab database, and nothing in it is worth keeping. `--force` skips the "are you sure?" question.

⚠️ **Your project's database is different.** Its migrations live in your project repo, which is the same repo every week, so they never fall out of step. The homework doesn't drop anything.

### The same secret store every week

A project finds its secret store by the `<UserSecretsId>` in its `.csproj`. It's the name of a folder in your home folder, and it isn't secret.

Last week you made one with `dotnet user-secrets init`, so last week's id is yours and nobody else's. **This week's `Lab.csproj` ships with an id already in it**, and the starters for every later week carry the same one:

```xml
<UserSecretsId>3a11a2aa-0cab-4805-8552-f1f5a5099f53</UserSecretsId>
```

So the connection string you set in Task 1 is the one every later week finds, and you don't set it again — **unless you're on a lab PC that rebooted**, which loses the whole store. Putting it back is the same `set` command.

**Everybody in the class has that same id**, and that's fine. It names a folder on *your* machine. Nobody else's machine has your folder.

---

## Taking a record off — `Remove`

`Remove` asks `Find` for the record, and `Find` already knows how to come back empty-handed. This is the rotation's, in `Lab/Rotation.cs`:

```csharp
    public bool Remove(string title)
    {
        Song? found = Find(title);

        if (found == null)
        {
            return false;
        }

        _songs.Remove(found);
        return true;
    }
```

- **`bool` says whether it worked.** The desk prints `Pulled:` for `true` and `No cart called …` for `false`. Neither is a crash.
- **`_songs.Remove(found)` takes out that one object** — the same cart `Find` handed back. It's `List<T>`'s own `Remove`, which is a different method from the one you're writing, with the same name.

## A removed record comes back

Pull a cart, quit, and run the desk again: it's back. **Nothing is broken.** Every line of `Save` did exactly what it says. This is week 10's, in `Lab/Rotation.cs`:

```csharp
    public void Save(DeskContext db)
    {
        foreach (Song song in _songs)
        {
            if (song.Id == 0)
            {
                db.Songs.Add(song);
            }
            else
            {
                db.Songs.Update(song);
            }
        }

        db.SaveChanges();
    }
```

The loop walks **the list**. A pulled cart isn't in the list, so the loop never reaches it, nothing marks its row, and `SaveChanges()` has nothing to send about it. The row stays in the table, and the next night's `Load` reads it back.

**The table only changes when something tells it to.** Removing a cart from a list in memory tells the table nothing.

## `Save`'s third job: rows the list no longer holds

Week 10's `Save` had two jobs: new rows in, changed rows updated. The third is **rows the list doesn't hold any more, out**. It goes in `Save`, after the first loop and before `db.SaveChanges();`:

```csharp
        foreach (Song row in db.Songs.ToList())
        {
            if (!_songs.Any(song => song.Id == row.Id))
            {
                db.Songs.Remove(row);
            }
        }
```

- **`db.Songs.ToList()`** reads every row in the table into a list, the same way `Load` does.
- **`_songs.Any(song => song.Id == row.Id)`** asks: does any cart in my list have this row's `Id`? `Any` hands back `true` or `false`.
- **The `!` turns it round.** No cart in the list has this `Id`, so the cart was pulled.
- **`db.Songs.Remove(row)`** marks the row to come out. Like `Add` and `Update`, it sends nothing on its own. `SaveChanges()` sends all three kinds of change at once.

After that, **the table holds exactly what the list holds.**

### Why the `Id`, and not the name

The `Id` is the database's own number for a row, and no two rows share one. A name isn't safe the same way: [the same name can be one row to SQL Server and two to C#](../week-10/lecture-notes.md#the-same-name-twice). Asking about the `Id` is asking the question the table itself uses.

⚠️ **Don't empty the table and put everything back.** It looks the same when you run the desk, and every cart gets a new row with a new `Id`. Check 3 compares the `Id`s for that reason.

⚠️ **And watch the `!`.** Without it, `Save` takes out every row the list **does** hold. Run the desk, pull nothing, quit, and the table is empty.

## Testing a removal

The fact acts out two nights and checks what a third one finds. Your instructor's, in `Lab.Tests/RemovedCallerTests.cs`, is a whole file:

```csharp
// Your instructor's fact about taking a caller off, written before the fix.

using Microsoft.EntityFrameworkCore;

namespace Lab.Tests;

public class RemovedCallerTests
{
    [Fact]
    public void ACallerTakenOffStaysOff()
    {
        DbContextOptions<DeskContext> options = new DbContextOptionsBuilder<DeskContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        Switchboard board = new Switchboard();
        board.Take("Dorothy");
        board.Take("Bex");
        board.Save(new DeskContext(options));

        DeskContext db = new DeskContext(options);
        Switchboard nextNight = new Switchboard();
        nextNight.Load(db);
        nextNight.Remove("Bex");
        nextNight.Save(db);

        Switchboard reopened = new Switchboard();
        reopened.Load(new DeskContext(options));

        Assert.Equal(1, reopened.Count);
        Assert.Null(reopened.Find("Bex"));
    }
}
```

- **Two callers, not one.** With only Bex, a `Save` that took out *every* row would pass too. Dorothy is there to prove the rows that should stay, stay.
- **`nextNight` loads and saves through one context**, the way the desk does a whole shift.
- **`reopened` is the next night.** It only knows what's in the table. Assert on it, never on the switchboard that saved.

Before the fix it's red, `Expected: 1` and `Actual: 2`: the night after Bex was taken off, the table still held two callers.

## Saving as it happens

The desk saves once, when you press `q`. **A shift that ends any other way loses everything since the last save.** Stop the desk with <kbd>Ctrl+C</kbd> (the same key on Mac and Windows) and the night's changes are gone.

The fix is to save at the moment a change happens, not only at the end. In `Lab/Program.cs`, for the rotation, two lines:

- **In `AirTheHour`**, after the `foreach` that puts the hour on air: `rotation.Save(db);`
- **In `PullACart`**, as the first line inside `if (rotation.Remove(title))`: `rotation.Save(db);`

`Save` is safe to call as often as you like: the new carts go in, the old ones are updated, and the pulled ones come out. Your instructor does the same for the switchboard in the demo.

⚠️ **One context sends everything.** The desk makes one `DeskContext` for the whole shift, and `SaveChanges()` sends every change it's holding. So the switchboard's save also sends the rotation's changes.

## The request line: one table, many logins

At the end of the night the whole room writes to one table, in your instructor's database, with a program your instructor wrote: `RequestLine`. You run it; you don't edit it.

**It connects as you.** It reads the connection string you set in Task 1, keeps your server, login and password, and swaps in your instructor's database name. So the database knows which login sent every row.

**Your instructor's database lets every login on the server do exactly two things to that one table:**

| Every login can | No login but the owner can |
|---|---|
| read the requests | change a request |
| add a request | delete a request |
| | touch any other table |

Those rules live in the database, not in the program. A student who wrote their own program, or typed SQL in the SQL Server view, would get the same answer: `The DELETE permission was denied`.

**Every row carries the login that added it.** A trigger in the database writes it onto each new row, whatever the program sends. So nobody can add a request under somebody else's name.

The program **asks the table again** after every request you send, and when you press Enter. The projector runs the same program with `--board`, which asks every three seconds and has no prompt at all. Nobody is told a request arrived; the board just asks again.

---

## 🔧 Troubleshooting

| Symptom | Likely cause |
|---|---|
| `There is already an object named 'Callers' in the database.` | `database update` on last week's database. [Drop it first](#a-fresh-database-for-the-week). |
| `No secrets configured for this application.` | This week's store is empty. [Set it once](#the-same-secret-store-every-week). |
| A pulled cart is back the next night | `Save` has no [second loop](#saves-third-job-rows-the-list-no-longer-holds), or the loop is after `SaveChanges()`. |
| The table is empty after a run where nothing was pulled | The `!` is missing from `!_songs.Any(...)`. |
| Every cart has a new `Id` | `Save` empties the table and adds everything back. Take out only the rows the list doesn't hold. |
| You pulled every cart and the next night they're all back | An empty table is the first night, so the desk starts from its three carts. That's `Load`'s first-night rule. |
| The plays are gone after <kbd>Ctrl+C</kbd> | The desk saves at `q`. [Save as it happens](#saving-as-it-happens). |
| `Nobody answered.` on the request line | The line isn't open, or the initials aren't your instructor's. |
| `Your login failed.` on the request line | Your connection string. The desk can't connect either. |

**Prev:** [Week 10 — Lecture Notes](../week-10/lecture-notes.md) · **Next:** Week 12 *(coming)*
