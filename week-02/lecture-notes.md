# Week 2 — Lecture Notes

Your at-home reference for the week. Two subjects tonight, and they meet at the same idea: **git hygiene** (what your first push swept up, and how to clean it for good) and **input** (the mistakes the compiler can't catch, because they happen after compiling is over).

**Rule for reading the code blocks:** every one of them either *is* a complete file, or the line above it says which file it goes inside. Nothing here is a fragment you're expected to guess the home of.

---

## What bin/ and obj/ actually are

Last week's push included dozens of files you never wrote. Here's what they are:

| | |
|---|---|
| `obj/` | the compiler's working files — scratch paper it uses while building |
| `bin/` | the build output — the actual runnable program |

Both are **regenerated from your source code on every build.** Delete them and nothing of value is lost; the next `dotnet run` remakes them. That's the whole argument for keeping them out of a repo:

> **A repo holds what you wrote. Everything generated can be regenerated — by anyone, from your source, any time.**

Committing them isn't just untidy. They change on every build, so they bury your real changes in noise — and they're different on every machine, so they make two people's repos disagree about files neither person wrote.

---

## .gitignore, and the part everyone gets wrong

`.gitignore` is a plain text file of filename patterns, one per line, sitting at the **top** of the repo — where it covers every folder below it, including the fourteen week folders that don't exist yet.

**This is the whole file, `.gitignore`, at the root of `dotnet-db-coursework`:**

```
bin/
obj/
*.user
.DS_Store
```

Anything that matches, git stops *seeing*: it won't list it as untracked, won't stage it with `git add .`, won't nag you about it. The last two lines cover things you didn't write and may never meet: `*.user` is per-machine editor settings, and `.DS_Store` is macOS's Finder leaving notes to itself in every folder it opens — Windows users never see one, and the line costs nothing.

⚠️ **Now the part everyone gets wrong, everywhere, always:**

> **`.gitignore` only affects files git hasn't started tracking yet. Files that are already committed stay tracked — ignoring does not reach back.**

Your `bin/` and `obj/` are already committed, from week 1. Adding the `.gitignore` changes nothing about them — GitHub will keep showing them, and every build will keep generating "changes" to commit. They need to be **untracked**, once, by hand. That's the next section.

---

## Cleaning a repo that already committed the mess

⚠️ **Run these from `dotnet-db-coursework`** — the top folder, where every git command runs — **and add the `.gitignore` first**, or step two will sweep the mess straight back in.

```bash
git rm -r --cached .
git add .
git commit -m "Week 2: take out the trash"
git push
```

What each piece does, because this is a command worth understanding rather than pasting:

- **`git rm -r --cached .`** — *remove, recursively, from the repo only, everything.* **`--cached` is the load-bearing word: nothing is deleted from your disk.** Git just forgets it was tracking any of it.
- **`git add .`** — re-stage everything… except that now the `.gitignore` is standing at the door, so `bin/` and `obj/` don't come back. What's re-added is exactly what you wrote.
- The commit shows up as a pile of **deletions** — every one a generated file leaving the repo. Your source files survive untouched.

Afterwards, `bin/` and `obj/` are still on your disk (grayed out in VS Code's Explorer — that's what "ignored" looks like), your program still runs, and GitHub shows only files a human wrote.

> [!IMPORTANT]
> **The homework asks you to clean your whole repo, and the grader checks the whole repo** — `week-01` included, because week 1 is where the mess is. The commands above do the whole repo in one pass. If GitHub still shows a `bin/` folder anywhere after your push, the untrack step didn't happen — re-read this section, don't re-type the `.gitignore` harder.

---

## The Source Control panel, translated

Last week you learned four git commands and were told to leave the sidebar panel alone. That order was the point — the panel is those commands with buttons, and now you can read it:

| In the panel | Is the command |
|---|---|
| the **Changes** list | `git status` |
| **+** on a file (or on the Changes header) | `git add` |
| the message box + **✓ Commit** | `git commit -m "..."` |
| the **Sync** button (circling arrows) | `git push` (and pull) |

Use whichever you like from here on — panel, terminal, or both. **When the panel confuses you, the terminal is how you find out what's actually going on.** `git status` never lies.

> [!NOTE]
> **If your panel shows nothing at all**, the usual cause is having a *week folder* open instead of your coursework folder — the panel watches the folder VS Code has open, and the repo lives at the top. **File → Open Folder → `dotnet-db-coursework`** and it comes alive. (One more reason the top is the window you keep.)

---

## A README for your repo

A repo's `README.md` renders on its front page — it's the first thing anyone sees, including the person grading fifteen of these a week. Yours needs to exist, sit at the **root** of the repo, and say something: who you are, what this is, a line per week.

**This is a whole file, `README.md`, at the root of `dotnet-db-coursework` — yours will have your name in it:**

```markdown
# dotnet-db-coursework

Ada Lovelace · .NET Database Development, one folder per week.

- week-01 — toolchain, first program, my own station
- week-02 — input that lies, .gitignore, the request line
```

That's genuinely enough. Growing the list by a line each week is a nice habit and takes ten seconds.

---

## ReadLine and null

```csharp
Console.Write("Caller's name: ");
string? typed = Console.ReadLine();
```

You've called `Console.ReadLine()` before — probably into a plain `string`, without the `?`. What your last course didn't dwell on is what it hands back when there's nothing to read: **`null`, which is not an empty string. It's no string at all.**

When does that actually happen? When the input *ends* — and for your homework that's not hypothetical: **the grader runs your program and answers every prompt by pressing Enter, and when its patience runs out, `ReadLine` returns `null`.** A program that falls over on `null` falls over on grading night.

Two spellings for dealing with it this week:

```csharp
// Inside any method or Program.cs — "or use this instead":
string raw = Console.ReadLine() ?? "";
```

`??` takes the left side unless it's `null`, in which case it takes the right. And when what you really want to know is *"did I get anything usable at all?"*, one question covers `null`, `""` and `"   "` together:

```csharp
// Inside a method that took `string? typed`:
if (string.IsNullOrWhiteSpace(typed))
{
    return "some night owl";   // whatever your no-answer answer is
}
return typed.Trim();
```

`.Trim()` takes the spare whitespace off both ends of a string and leaves the middle alone — a caller named `"  Dorothy  "` becomes `"Dorothy"`.

⚠️ **Order matters:** `typed.Trim()` on a `null` is itself a crash (`NullReferenceException` — you asked nothing to trim itself). Test for nothing *first*, then trim. The `IsNullOrWhiteSpace` check does exactly that, which is why the compiler stops warning about the `.Trim()` after it — it can see `null` can't reach that line.

**Why is C# so careful about `null`?** That's a real question with a good answer, and it's **week 5's**. This week, `??` and `IsNullOrWhiteSpace` are the spellings.

---

## Warnings are not decoration

Write `string raw = Console.ReadLine();` — no `??` — and the editor puts a squiggle under it, and every build prints:

```
warning CS8600: Converting null literal or possible null value to non-nullable type.
```

**The program still builds and still runs.** That's what makes it a warning and not an error — and it's also what makes it dangerous, because you've been scrolling past these for a semester.

Here's the precise difference, and it's worth having exactly:

> **An error means the compiler can't keep its promise, so it refuses to build. A warning means it will build — but it's showing you the part of your program its promise doesn't cover.**

Last week you learned the compiler checks your types, not your program. A warning is the compiler *drawing the edge* of what it checked: "this value might be `null`, and I can't prove it isn't." Ignore the warning and the thing it warned about doesn't go away — it just waits for a night when the input runs out.

Warnings have codes like errors do (`CS8600`, `CS8604`) and they're just as searchable. **A build that prints `0 Warnings` is a build where the compiler had nothing to tell you. Want that.**

---

## Parse believes, TryParse asks

Everything `ReadLine` gives you is **text**. `"-41.5"` — quotes on, a string. Arithmetic needs the number, and there are two ways to get it:

**`Parse` believes the input:**

```csharp
double reading = double.Parse(raw);   // works — until raw is "-41.5 C"
```

Hand `Parse` anything that isn't exactly a number and it **throws a `FormatException` and the program dies right there.** Not a compile error, not a warning — the build was clean. A *runtime* crash, caused by input that didn't exist until someone typed it. **No compiler in any language can check a value that arrives after compiling is over.** This is the week's whole point:

> **The compiler cannot check your users. Your program has to.**

**`TryParse` asks first:**

```csharp
if (int.TryParse(typed, out int marker))
{
    // it parsed — the number is in `marker`
}
else
{
    // it didn't — and nothing crashed. You decide what happens instead.
}
```

`TryParse` returns a `bool`: did that work? When it's `true`, the parsed value is sitting in the variable declared right there in the brackets — that's what `out` does. When the input is words, blank, or even `null`: **`false`, never a crash.** (`null` needs no special handling at all — TryParse just says no.)

Two idioms built on it that this week's lab uses:

```csharp
// Inside CallerLine.cs — parse AND range-check in one expression:
return int.TryParse(typed, out int marker) && marker >= 1 && marker <= 400;
```

The `&&` only evaluates its right side when the left side was `true` — so `marker` is only ever looked at after `TryParse` filled it in. **Parsing and believing are still two different steps:** `"9000"` parses beautifully and is still nowhere on a 400-mile stretch. After the parse succeeds, check that the *value* makes sense.

```csharp
// Inside CallerLine.cs — the same guard, choosing between two answers:
if (int.TryParse(typed, out int marker) && marker >= 1 && marker <= 400)
{
    return $"Ray at mile {marker} - {400 - marker} to go on his stretch.";
}
return "Ray's out there somewhere. He'll call back.";
```

💡 **What about `bool`?** `bool.Parse` exists and wants the literal word `True` — which no human types. For yes/no questions, ask for `y` and compare: `(Console.ReadLine() ?? "") == "y"`. Parsing is for numbers.

---

## Ask once, answer gracefully

The obvious "fix" for bad input is a loop — keep re-asking until they type it right. **Don't, and the reason is real:**

Your program isn't only run by patient humans. The grader feeds it a few blank lines and then nothing, forever — so a loop that won't proceed until the input is valid **never proceeds**, spins on `null`, and gets killed at the timeout. Two of this week's points are "runs cleanly when fed nothing but Enter," and a re-ask loop forfeits them.

The shape this course uses instead, everywhere:

> **Ask once. If the answer is unusable, return something graceful and move on.** A caller who won't give a name is "some night owl". A marker that isn't a number is "he'll call back". A reading that won't parse is a console that *says so* and stays up.

That's not a workaround — it's the same *testable shape* rule from week 1 applied to input: a method that takes a `string?` and **returns a value no matter what** can be called, tested, and graded. A method that argues with the user can only be operated. (Retrying, exceptions, and when a program *should* refuse to continue get their real treatment in **week 13**.)

---

## Carrying a class forward

Your week 1 `Station` class was right last week and it's still right this week — so it moves, it doesn't get rewritten:

```bash
# from your coursework window — the Homework project ships in the starter:
cp week-01/Homework/Station.cs week-02/Homework/
```

(Or copy-paste the file in VS Code's Explorer — same result.) The file lands **inside** the project folder, next to `Program.cs`, and compiles as part of this week's project without a word changed.

This is the first taste of a rhythm the whole course runs on: **from week 4, your semester project is one program that every later week extends.** Code that was right stays; new weeks add.

---

## Appendix: troubleshooting

**`Unhandled exception. System.FormatException: The input string '...' was not in a correct format.`** — `Parse` met input that isn't a number. The message names the exact input. [Switch to `TryParse`](#parse-believes-tryparse-asks) — or, if it's the lab, that's Task 4 working as intended: now fix it.

**`Unhandled exception. System.NullReferenceException`** on a line with `.Trim()` (or any method call on input) — the input was `null` and you asked nothing to trim itself. [Test with `IsNullOrWhiteSpace` first.](#readline-and-null)

**`warning CS8600: Converting null literal or possible null value...`** — you're putting `ReadLine()` (which might be `null`) into a plain `string`. Either declare it `string?` or use [`?? ""`](#readline-and-null).

**`warning CS8604: Possible null reference argument...`** — you're handing something that might be `null` (usually `ReadLine()`) to a method that wants a real string. Same two fixes as above — and note `TryParse` takes a `string?` happily, no warning.

**GitHub still shows `bin/` after you added `.gitignore`** — [ignoring is not untracking](#gitignore-and-the-part-everyone-gets-wrong). You need the one-time [cleanup](#cleaning-a-repo-that-already-committed-the-mess).

**`git rm -r --cached .` says `fatal: pathspec '.' did not match any files`** — you're in an empty folder or not in the repo. Run it from `dotnet-db-coursework`.

**Everything came back after the cleanup commit** — the `.gitignore` wasn't in place (or has a typo) when you ran `git add .`. Check the file is at the repo **root**, spelled exactly `.gitignore`, then redo the two commands.

**The Source Control panel is empty but `git status` works in some terminal** — VS Code is open on a week folder instead of the top. File → Open Folder → `dotnet-db-coursework`, and the panel comes alive.

**The checks say they can't find `Switchboard`** — it needs to be `public`, spelled `Switchboard`, in its own file **inside** the `Homework` folder. Same rules as `Station` last week, [same fix if the file's in the wrong place](../week-01/lecture-notes.md#appendix-troubleshooting).

**Check 4 says your contest and your lucky number disagree** — `IsWinner` has a number typed into it instead of asking `LuckyCallerNumber()`. One of them is wrong; make one ask the other.

**`error CS8936` or `'out' variable` complaints** — the `out int marker` declaration needs to be inside the `TryParse(...)` call's brackets, exactly as [shown above](#parse-believes-tryparse-asks).

**`MSB1003: Specify which project or solution file to use`** — the command is missing its week prefix. From your coursework window it is always `dotnet test week-02/Homework.Checks` — week first, then the project.

**The program hangs when you test it with redirected input** — you have a loop that re-asks until input is valid. [Ask once, answer gracefully.](#ask-once-answer-gracefully)
