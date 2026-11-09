# Week 14 — Lecture Notes: The Old Carts

Further reading for the lab and the project work. **You never have to leave the lab README to find out what to do** — these notes say why.

## A table that already has rows

Every migration so far has made something new: a table on an empty database, or a second table beside the first. This week's are different. **They change a table that already has rows in it**, and those rows are real: callers who rang, carts that played, records you typed in yourself. Nobody can make them again.

A new column always takes three things:

1. **A property in the class.** That's the C# side, and it's what the rest of your code reads.
2. **A migration.** `dotnet ef migrations add` compares your classes with the last snapshot of them and writes down what the table needs. It writes a file; it doesn't touch the database.
3. **`dotnet ef database update`.** That runs the migration on your database.

Skip step 2 or 3 and the program crashes the first time it reads the table, with the column's name in the message:

```
Unhandled exception. Microsoft.Data.SqlClient.SqlException (0x80131904): Invalid column name 'Added'.
```

**Your class has a column your table doesn't.** EF Core asks the database for every column the class has, and the database has never heard of this one.

The one question that decides the rest: **what is the true value of the new column for the rows you already have?**

### A column nobody knows

**When was this cart added to the rotation?** For a cart added tonight, that's easy. For the carts that were already there, nobody wrote it down. **There is no true value to put in.**

So the column has to be able to hold nothing at all. In C#, that's the `?`. In `week-14/Lab/Song.cs`, inside the `Song` class:

```csharp
    public DateTime? Added { get; private set; }

    public string AddedOn()
    {
        if (Added == null)
        {
            return "-";
        }

        return Added.Value.ToString("yyyy-MM-dd");
    }
```

And the constructor stamps every new cart, as its last line:

```csharp
        Added = DateTime.Now;
```

`migrations add` writes this:

```text
            migrationBuilder.AddColumn<DateTime>(
                name: "Added",
                table: "Songs",
                type: "datetime2",
                nullable: true);
```

**`nullable: true` means every row already in the table gets `NULL`.** No row is changed in any other way, and none is lost.

**Why the old carts don't get stamped too:** a cart that comes out of the table is still made with the constructor, so for a moment it does get tonight's date. Then EF Core sets every mapped property from the row, and the row says `NULL`. **The row wins.** A dash on the screen is the truth, read straight from the table.

⚠️ **Every line that reads `Added` has to be ready for nothing.** That's why `AddedOn()` exists: one place that knows what to show for `null`, so the screen never has to ask.

### A column everybody knows

**How many stars does this cart have?** Every cart starts at three. That's as true of the carts already in the table as of a cart made tonight: nobody has ever given one stars. **There is a true value, and it's 3.**

So the column can't be empty, and the class says where it starts. Inside the `Song` class:

```csharp
    public int Stars { get; set; } = 3;
```

**Here's the trap.** `migrations add` writes this:

```text
            migrationBuilder.AddColumn<int>(
                name: "Stars",
                table: "Songs",
                type: "int",
                nullable: false,
                defaultValue: 0);
```

**`defaultValue: 0` is what every row already in the table gets.** Not 3. The `= 3` in the class runs when C# makes a new `Song` — and the rows already in the table aren't made by C#; they're filled in by the migration, in the database. `migrations add` doesn't read your `= 3`. It writes the zero of the column's type, **and it doesn't warn you**:

| The property | What `migrations add` gives the old rows |
|---|---|
| `int Stars { get; set; } = 3;` | `0` |
| `bool Welcome { get; set; } = true;` | `false` |
| `string Mood { get; set; } = "steady";` | `""` |
| `DateTime Arrived { get; set; } = DateTime.Now;` | the year 1 — `0001-01-01` |

**The fix is to edit the migration before you run it.** It's a file like any other, and nothing has used it yet. Change `defaultValue: 0` to `defaultValue: 3`, then `database update`, and every old cart has three stars.

### Read it before you run it

A migration is a plan for changing your database, written down so you can read it first. **Read every one before `database update`**, in the file ending with its name — not the `.Designer.cs` one, which is EF Core's own bookkeeping. Its `Up` method is what will happen:

| Ask | Good | Stop |
|---|---|---|
| What does it do? | `AddColumn` | `DropColumn`, `DropTable`, an `AlterColumn` or a `RenameColumn` you didn't ask for |
| Which table? | the one you meant | any other |
| What do the old rows get? | `nullable: true`, or the `defaultValue` you mean | a `defaultValue` that's wrong for them |
| What did `migrations add` print? | `Done.` | *An operation was scaffolded that may result in the loss of data* |

**That last line is EF Core telling you to stop and read.** It prints it when a change could lose something already in a table: a column taken out, or a column made smaller. Making a caller's name hold no more than 40 characters, for example:

```text
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Callers",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
```

The migration can't see the names in the table, so it can't tell whether any are longer than 40. It warns you instead.

### Taking a migration back

**Not run yet:** take back the newest migration, and nothing ever touched your database:

```bash
dotnet ef migrations remove --project week-14/Lab
```

```
Removing migration '20261109014148_ShorterNames'.
Reverting the model snapshot.
Done.
```

`remove` asks your database whether the migration has been run, so it needs your connection string and the network, even though it changes nothing there.

💡 **`remove` rewrites `DeskContextModelSnapshot.cs`**, and git will show it changed even though you're back where you were: it writes `ToTable("Songs", (string)null)` where the file said `ToTable("Songs")`. They mean the same thing. Commit it.

**Already run:** `remove` refuses:

```
The migration '20261109013359_CartsGetStars' has already been applied to the database. Revert it and try again.
```

**`database update` with the name of an earlier migration runs every later one backward**, through its `Down` method:

```bash
dotnet ef database update ACartHasAnAddedDate --project week-14/Lab
```

```
Reverting migration '20261109013359_CartsGetStars'.
Done.
```

`CartsGetStars`'s `Down` drops the `Stars` column. **The rows all stay; only what was in that column goes.** Then you can fix the migration, or `remove` it, and `database update` again.

To see where you are, list them. A migration nobody has run says `(Pending)` — this is the list between Task 1's `migrations add` and its `update`:

```bash
dotnet ef migrations list --project week-14/Lab
```

```
20261023163353_TheDeskMovesIn
20261024195449_RequestsAndAirings
20261109013347_ACartHasAnAddedDate (Pending)
```

### A test that reads a migration

A migration is a class, named after what you called it, in the `Lab.Migrations` namespace. A test can make one and read its plan, with no database at all. In `week-14/Lab.Tests/DeskTests.cs`, inside the `DeskTests` class:

```csharp
    [Fact]
    public void TheOldCartsGetThreeStars()
    {
        Migration migration = new CartsGetStars();

        AddColumnOperation stars = migration.UpOperations
            .OfType<AddColumnOperation>()
            .Single(op => op.Name == "Stars");

        Assert.Equal(3, stars.DefaultValue);
    }
```

with these at the top of the file, under `using Microsoft.EntityFrameworkCore;`:

```csharp
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Lab.Migrations;
```

- **`UpOperations`** is the list of everything `Up` would do, one object per step.
- **`OfType<AddColumnOperation>()`** keeps the steps that add a column.
- **`Single(...)`** picks the one that adds `Stars`, and throws `Sequence contains no matching element` if there isn't one.

**Written before the fix, it's red with the same `0` you read in the file**, and green once the migration says 3. It also guards the fix: if somebody removes the migration and adds it again, `migrations add` writes the `0` again, and this test goes red before anybody runs it.

### Renames

**A plain rename is safe.** Rename a property and EF Core writes a `RenameColumn`; rename a `DbSet` and it writes a `RenameTable`. The data moves with it. Two catches, both measured:

- **A constructor parameter has to be renamed too.** Rename `Artist` to `Performer` and leave `Song(string title, string artist, int seconds)` alone, and `migrations add` refuses: `Cannot bind 'artist' in 'Song(string title, string artist, int seconds)'`. EF Core matches a constructor's parameters to properties by name.
- **A rename and a change at the same moment is a drop and an add.** Rename `Stars` to `Rating` *and* make it a `double`, in one migration, and EF Core can't tell it's the same column: `DropColumn` on `Stars`, `AddColumn` on `Rating`, and the loss-of-data line. **Every value in that column would go.** Take it back, and do the rename on its own first, in a migration of its own: that one is a plain `RenameColumn`.

⚠️ **And renaming a class can unhook a link without a word.** Rename `Song` to `Cart` and leave `Airing.SongId` alone, and EF Core no longer sees `SongId` as the link to a cart: the migration drops that foreign key and adds a new, empty `CartId`. No warning prints. Every airing would come loose from its cart. **Read the migration.**

### The week 16 runway

Week 16 you present your project for 40 points, in four tens:

| Ten points | What it asks |
|---|---|
| **It runs** | from start to finish, from what's in your repo |
| **You show it** | what it does, by running it |
| **You explain one decision** | something you chose, and why |
| **You say what's next** | what you'd add or change, given another week |

**A clean clone** is the honest test of the first one: clone your own repo into a new folder and run it from there. It holds exactly what GitHub holds, so a file you never committed shows up as a build error tonight instead of in front of the room. It still finds your connection string, because the `UserSecretsId` in your `.csproj` came with it.

**Your README** is where the other three start. Three headings — *what it does*, *one decision, and why*, *what's next* — and a line or two under each.

## 🆘 Troubleshooting

| What you see | What it means |
|---|---|
| `Invalid column name '…'` | A property with no column yet. `migrations add`, read it, `database update`. |
| `Unable to retrieve project metadata` | `dotnet ef` on a project that has never been built. Build it, then run the command again. |
| `No project was found. Change the current working directory or use the --project option.` | The `--project` is missing from a `dotnet ef` command. |
| `The name '…' is used by an existing migration.` | You've already made one with that name. |
| `The migration '…' has already been applied to the database. Revert it and try again.` | `remove` only takes back a migration nobody has run. Run it backward with `database update` and an earlier name, first. |
| `Cannot bind '…' in '…(…)'` | A constructor parameter no longer matches a property's name. Rename the parameter too. |
| *An operation was scaffolded that may result in the loss of data* | Stop, open the migration, and read it. If it isn't what you meant, `migrations remove`. |
| The old rows show `0`, `no`, or nothing where they should show a value | The migration's `defaultValue` was the type's zero. Run it backward, fix the `defaultValue`, run it again. |
| `CS0102: The type '…' already contains a definition for '…'` | The class already has a member with that name. |
| `CS0246` … `'Migration'` or `'AddColumnOperation'` | The test file needs `using Microsoft.EntityFrameworkCore.Migrations;` and `using Microsoft.EntityFrameworkCore.Migrations.Operations;`. |
| `Sequence contains no matching element` | `Single(...)` found nothing. The column name in the test doesn't match the migration. |
| A file changed after `migrations remove`: `…ModelSnapshot.cs` | `(string)null` added to each `ToTable`. Same meaning. Commit it. |

**Prev:** [Week 13 — Exceptions](../week-13/lecture-notes.md) · **Next:** Week 15 *(coming)*
