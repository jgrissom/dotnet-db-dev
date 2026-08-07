# Week 3 Homework

**Due:** before the start of Week 4's class.
**Submit via Canvas:** the URL of your **private** `dotnet-db-coursework` repo — same URL as always.

> [!NOTE]
> **This is your station's last night.** You invented it in week 1, gave it a request line in week 2, and tonight it finally remembers something. **Next week you pick your own topic** — a public repo, a project you extend every week until December. Give this one a decent send-off.

## Part 1 — Finish the lab (nobody collects this)

All five checks green, and the night lost at least once:

```bash
dotnet test week-03/Lab.Checks
```

```
Passed!  - Failed: 0, Passed: 5 ...
```

> [!IMPORTANT]
> **You should have got all five in class.** If not, finish them first — the lab's Tasks 2–5 are the guided version of exactly what Part 2 asks you to do alone. Same tools, your station.

## Part 2 — Your station keeps the night (graded)

Last week your station could take **one** call and had nowhere to put it. Tonight it keeps the whole night: **a list of everything that went out on air, and a count of who won't stop ringing.**

> [!TIP]
> **Keep [`lecture-notes.md`](lecture-notes.md) open while you work.** Every requirement links to the section that shows it done, and the [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) names this week's actual crashes.

### Set it up

The `week-03` folder you copied in for the lab **already contains your homework's starting point**: a `Homework` project waiting for tonight's work, and `Homework.Checks` beside it.

**1. Get back to your coursework window.** Still open on `dotnet-db-coursework` from the lab? You're there. Otherwise: **VS Code → File → Open Folder → `dotnet-db-coursework` → Open**, then the terminal with **`` Ctrl+` ``** — it opens standing at the top, where every command below runs.

> [!NOTE]
> **No `week-03` folder inside it?** The lab's setup didn't happen — [do that first](lab/README.md#setup). It's one copy out of `dotnet-db-starters` and it brings the whole week in.

**2. Carry both of your classes forward** — [the same one-move copy as every week](lecture-notes.md#and-then-its-gone), except this time there are two of them:

```bash
cp week-02/Homework/Station.cs week-03/Homework/
```

```bash
cp week-02/Homework/Switchboard.cs week-03/Homework/
```

**`Switchboard` is not optional this week** — tonight's code calls `Switchboard.CallerName` to clean up caller names, so it has to make the trip.

**Commit that before you write anything new:**

```bash
git add .
```

```bash
git commit -m "week 3: station carried forward"
```

> [!NOTE]
> **Missing one of them?** Type the minimum and move on — **all four of these, or tonight's `Program.cs` won't compile:**
> - `Station.CallSign()` → four capitals starting K or W
> - `Station.SignOn()` → a line containing your call sign and your city
> - `Switchboard.CallerName(string? typed)` → trims a real name, returns *something non-blank* for `null`, `""` or `"   "`
> - `Switchboard.Greeting()` → how your station answers the phone, containing your call sign
>
> [Week 1's homework](../week-01/homework.md) has the `Station` pair in full and [week 2's](../week-02/homework.md) has the `Switchboard` pair.

**3. Add the package — your first one, and it's one command.** From the same terminal:

```bash
dotnet add week-03/Homework package Spectre.Console --version 0.57.2
```

> [!CAUTION]
> **The word order is odd, and it catches everybody once.** The project comes **before** the word `package` — read it as *"add, to this project, a package."* Leave the week out and you get `Could not find any project in ...`, because you're standing at the top of your repo where there isn't one. Same habit as every other command this semester: **name the week.**

Now **open `week-03/Homework/Homework.csproj`** and look at what appeared:

```xml
<PackageReference Include="Spectre.Console" Version="0.57.2" />
```

That's the whole thing. [Nothing was installed on your machine](lecture-notes.md#your-first-nuget-package) — the package belongs to this project, it's recorded in a file in your repo, and anyone who clones it gets the same version automatically. **1 of tonight's points is for that line existing**, because it's the only proof you ran the command.

### Write it

**4. A `Playlist` class in its own file** — `week-03/Homework/Playlist.cs`, `public`, two collections and three methods. This is the whole file, shapes included — **and the three blanks fail on purpose.** Pasting it as-is leaves you exactly where you already were, at **1 of 4**; the blanks are where your station shows up:

```csharp
public static class Playlist
{
    // Every call, in order.
    public static List<string> Tonight = new List<string>();

    // Every caller, once, with a count beside them.
    public static Dictionary<string, int> Regulars = new Dictionary<string, int>();

    public static string Take(string? caller, string? request)
    {
        return "";   // ← yours. Build the on-air line, KEEP it, count the caller.
                     //   Blank fails the check, on purpose.
    }

    public static int TimesCalled(string? caller)
    {
        return 0;   // ← yours. A stranger has called 0 times — without crashing.
    }

    public static string SignOff()
    {
        return "";   // ← yours. What the station says at the end of the night.
    }
}
```

What each one has to do:

| Method | Returns | Rules |
|---|---|---|
| `Take(string? caller, string? request)` | `string` | the line your station puts on air. It must **contain the caller's name and the request**, the name must come [through `Switchboard.CallerName`](../week-02/lecture-notes.md#readline-and-null) (not re-trimmed here), and the line must go **on the end of `Tonight`**. It also [counts the caller in `Regulars`](lecture-notes.md#the-counting-dictionary). Wording is yours; a `null` caller must not crash it |
| `TimesCalled(string? caller)` | `int` | how many times that person has rung tonight — and **`0` for somebody who never has**, [without throwing](lecture-notes.md#reading-a-key-that-isnt-there-is-a-crash). Same name-cleaning as `Take`, or the same person counts twice |
| `SignOff()` | `string` | the station's last line of the night. **Two shapes:** something non-blank when nobody called at all, and something *different* when they did — containing how many calls came in, [asked of the list](lecture-notes.md#listt--the-collection-that-grows) rather than counted by hand |

> [!WARNING]
> **`Regulars` has to be a `Dictionary<string, int>`, and the check enforces the type.** Counting callers with a second list and a loop is a perfectly reasonable instinct and it will not pass — the dictionary *is* this week's outcome. `Tonight` is likewise a `List<string>`.

**The sign-off line is a writing assignment as much as a code one.** You're going to read the quiet one more often than you expect tonight.

**Every command below runs from your terminal in `dotnet-db-coursework`, naming the week.** Two of them, and you'll use both after every method.

See what the checks say:

```bash
dotnet test week-03/Homework.Checks
```

Then watch your program do it:

```bash
dotnet run --project week-03/Homework
```

**Do that after every method** — write `Take()`, test, run. Then `TimesCalled()`, test, run. **Three methods, three rounds: 1 → 2 → 3 → 4**, one per round. A check that goes red right after you wrote something tells you exactly where to look.

**Green? Commit it:**

```bash
git add .
```

```bash
git commit -m "week 3: the night is kept"
```

**5. `week-03/Homework/Program.cs` opens the line.** Replace the whole file with this. Small on purpose; every decision lives in `Playlist.cs`:

```csharp
using Spectre.Console;

Console.WriteLine(Station.SignOn());
Console.WriteLine(Switchboard.Greeting());
Console.WriteLine();

// Earlier in the night, before you sat down.
Playlist.Take("Dorothy", "something with strings");
Playlist.Take("Dorothy", "the slow one");

Console.Write("Who's calling? ");
string? caller = Console.ReadLine();

Console.Write("And what do they want to hear? ");
string? request = Console.ReadLine();

Console.WriteLine();
Console.WriteLine(Playlist.Take(caller, request));

int calls = Playlist.TimesCalled(caller);
if (calls > 1)
{
    Console.WriteLine($"(that's call number {calls} tonight.)");
}

Console.WriteLine();

var night = new Table();
night.AddColumn("#");
night.AddColumn("ON AIR");

int number = 1;
foreach (string line in Playlist.Tonight)
{
    night.AddRow(number.ToString(), Markup.Escape(line));
    number++;
}
AnsiConsole.Write(night);

Console.WriteLine($"{Station.CallSign()} - {Playlist.SignOff()}");
```

**Make it yours.** Borders, colours, a second table for `Regulars` — [none of it is graded](lecture-notes.md#a-table-that-measures), because no check in this course looks at what your program prints.

> [!WARNING]
> **`Console.ReadLine` reads. `AnsiConsole` draws. Don't swap them.**
>
> Spectre's own prompts — `AnsiConsole.Ask<string>(...)`, `AnsiConsole.Prompt(...)` — read the keyboard directly and **throw the moment input comes from anywhere else:**
> ```
> System.InvalidOperationException: Failed to read input in non-interactive mode.
> ```
> **I run your program by pressing Enter at every prompt and then typing nothing.** This crash never happens when you test by hand and always happens when I run it, and it costs the 2 points for "runs without crashing." [Ask once, answer gracefully](../week-02/lecture-notes.md#ask-once-answer-gracefully) — and no loops that re-ask until the input is valid.

Same two commands again. The checks:

```bash
dotnet test week-03/Homework.Checks
```

And the program, which is the half the checks never look at:

```bash
dotnet run --project week-03/Homework
```

**Take these four runs, one at a time** — the answers are yours, so I can only tell you what should *happen*:

| At *Who's calling?* | At *what do they want to hear* | What should happen |
|---|---|---|
| `Dorothy` | anything | **`(that's call number 3 tonight.)`** — she rang twice before you sat down |
| `  spaces round it  ` | anything | the name comes back **trimmed** in the table |
| **press Enter, type nothing** | **press Enter, type nothing** | **your** no-name default from week 2, and **no crash** |
| any new name | anything | three rows in the table, and a sign-off that names the count |

⚠️ **Row three is the one worth two points.** Read on:

> [!IMPORTANT]
> **Now run it the way I will run it: press Enter at every prompt and type nothing else.** That is exactly what the grader does. **If your program crashes on that, it scores 0 for "builds and runs" no matter how green your checks are.**

**Commit again once it survives everything you threw at it:**

```bash
git add .
```

```bash
git commit -m "week 3: the request line renders"
```

### 🌙 6. Then lose it

**Run it one more time**, and answer with a **different** caller than last time.

```bash
dotnet run --project week-03/Homework
```

**Three rows again — but read who's in them.** Rows 1 and 2 are Dorothy, exactly as they were. Row 3 is the call you *just* made. **The caller from your last run is nowhere on this board**, and there is no way to get them back.

Dorothy came back because those two calls are **lines of code** in `Program.cs`, and lines of code run again every time. Your caller was only ever in memory. [The whole explanation is in the notes](lecture-notes.md#and-then-its-gone), and nothing you learned this week can fix it:

- **Week 8** — your list gets a file, and survives the night for the first time.
- **Week 10** — it gets a database, and stops being only yours.

**Nothing is broken. Being annoyed by this is the assignment.**

## Part 3 — Repo hygiene (graded)

⚠️ **Not optional: 5 of tonight's 20 points live in this part**, and it's about five minutes.

**Hygiene is scored every week** — and because your `.gitignore` has been guarding the door since your first commit, most of it is already true.

**1. Glance at your repo's hygiene** — thirty seconds, two questions.

What's changed but not saved:

```bash
git status
```

And what's tracked that never should have been:

```bash
git ls-files | grep -E '(^|/)(bin|obj)/'
```

`status` should be quiet, and the second command should print **nothing**. If something *did* slip in, [the eviction drill](../week-02/lecture-notes.md#the-eviction-when-its-already-pushed) fixes it in three commands.

> [!NOTE]
> ⚠️ **New this week and worth checking once:** building with a package creates more files under `obj/` than before. Your four-line `.gitignore` already covers all of them — that command printing nothing is the proof, and it's why the file was written at the top of the repo rather than inside a week folder.

**2. A `README.md` at the repo root**, saying whose repo this is. You made one in week 2 — adding a `week-03` line to it takes ten seconds and is a good habit.

**3. Three or more commits touching `week-03/Homework/`**, with messages that mean something. ⚠️ **Only commits that change your homework project count** — the ones you made while working through the lab's `RequestLog.cs` don't touch it. **If you followed the steps above you already have three:** station carried forward, the night is kept, the request line renders. I read these.

```bash
git push
```

## Part 4 — Check it before you submit ✅

**These are the same checks I run.** Same terminal, same place it's been all night:

```bash
dotnet test week-03/Homework.Checks
```

```
Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

**And one last run**, because two points ride on it and no check will tell you:

```bash
dotnet run --project week-03/Homework
```

Then look at your repo **on GitHub** the way I will: no `bin/` or `obj/` anywhere, a README on the front page, and a commit history that says what happened.

## 🆘 Stuck?

- **The checks can't find `Playlist`** — it needs to be `public`, spelled `Playlist`, in its own file **inside** `week-03/Homework/`.
- **The checks can't find `Switchboard`** — `Switchboard.cs` didn't make the trip from week-02. Both classes come forward this week.
- **`error CS0246: The type or namespace name 'Spectre' could not be found`** — `using Spectre.Console;` without the package. Run the `dotnet add` command from step 3 — project name before the word `package`. ⚠️ **This zeroes all four checks at once**, because nothing compiles.
- **`System.InvalidOperationException: Failed to read input in non-interactive mode`** — `AnsiConsole.Ask`/`Prompt` used for input. [Spectre draws; `Console.ReadLine` reads.](lecture-notes.md#a-table-that-measures)
- **`KeyNotFoundException` in `TimesCalled`** — you *read* a missing key. [`TryGetValue` asks first.](lecture-notes.md#reading-a-key-that-isnt-there-is-a-crash) Note that *assigning* `Regulars[name] = 1` is fine.
- **Check 3 says the count is always 1** — the `else` branch runs every time, so the name being counted is spelled differently each call. Clean it the same way in **both** methods.
- **Check 3 says `Regulars` is the wrong type** — it has to be a `Dictionary<string, int>`. A list of names won't do.
- **Check 4 says your sign-off says the same thing either way** — it isn't asking `Tonight.Count`; it's returning one fixed string.
- **`NullReferenceException` in `Take`** — something ran `.Trim()` before checking for nothing. [Test first.](../week-02/lecture-notes.md#readline-and-null)
- **A generated file shows up tracked on GitHub** — [the eviction drill](../week-02/lecture-notes.md#the-eviction-when-its-already-pushed) clears it in three commands.
- **`fatal: not a git repository`** — your terminal wandered out of the repo (a leftover `cd`?). Close it and open a fresh one (`` Ctrl+` ``).
- The [troubleshooting appendix](lecture-notes.md#appendix-troubleshooting) covers the rest.

## 📊 Grading (20 pts)

| Item | Points | Checked by |
|------|--------|------------|
| `Station` and `Switchboard` both came forward and still work | 2 | `dotnet test` |
| `Take()` builds the on-air line and the list **keeps** it — trimmed, `null` survives | 4 | `dotnet test` |
| `TimesCalled()` counts by caller — a stranger is `0`, not a crash | 3 | `dotnet test` |
| `SignOff()` reads the collections — a quiet night and a busy one differ | 2 | `dotnet test` |
| Private coursework repo still reachable (same URL as week 1) | 1 | your repo |
| The program builds and runs without crashing — even when fed nothing but Enter | 2 | your repo |
| `Spectre.Console` in `Homework.csproj` — you added the package | 1 | your repo |
| `bin/` and `obj/` tracked **nowhere** in the repo | 2 | your repo |
| 3+ commits touching `week-03/Homework/` 👀 | 2 | your repo |
| `README.md` at the repo root that says whose repo this is 👀 | 1 | your repo |

*The explain-it standard applies — I ask a couple of people in person each week. This week's likely questions: "what does your dictionary do when I ask it about somebody who's never called, and where in your code is that decided?", "your table has three rows and your regulars list has two — why?", and "which file changed when you ran `dotnet add package`, and what does that mean for a lab PC that wipes overnight?"*

## 📖 Reading for next week (~10 min)

**Week 4 is the big one: you pick your own topic**, make a second repo — public, this time — and start the program you'll extend every week until December.

- **Come with two or three ideas.** Anything you find interesting: a tea collection, a climbing log, ghost sightings, a fantasy league, the contents of your fridge. The weirder the better — I'd rather grade fifteen odd projects than fifteen libraries.
- ⚠️ **One rule, and it's the one that bites in week 12:** your topic must be able to grow **a second, related thing.** Albums *and reviews*. Trails *and the times you walked them*. Stations *and the calls they took*. If your idea is only ever one list of one kind of thing, it runs out of road — bring a different one.
- **Then, in tonight's program:** you kept `Tonight` as a `List<string>`. If you wanted to know **what time each call came in**, what would have to change about that list? Write down your answer and bring it. *(You built the answer in the lab without being told that's what it was.)*
