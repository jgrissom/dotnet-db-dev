# Week 1 — Lecture Notes

Your at-home reference for the week. **You've written C# before, so a lot of this is a page to check yourself against rather than a page to learn from.** The parts that are genuinely new are marked — read those properly.

**Rule for reading the code blocks:** every one of them either *is* a complete file, or the line above it says which file it goes inside. Nothing here is a fragment you're expected to guess the home of.

---

## What this course is actually about

One idea, and it takes sixteen weeks to land properly:

> **Data in memory dies when the program stops. Data in a file survives, but asking questions of it hurts. Data in a database is the answer to both.**

You'll *feel* the first part in week 3 — you'll type three records into a program, quit it, start it again, and they'll be gone. That problem gets answered twice: with a file in week 8, and properly with a database in week 10.

---

## What you already have, and what tonight adds

You finished a C# course. You can declare a variable, write an `if`, write a loop, write a method, and write a class. **None of that is being re-taught**, here or in any later week.

What tonight actually adds is three things:

| New tonight | Why it matters |
|---|---|
| **git and GitHub** | Every week's work is submitted as a repo, and git hygiene is graded from week 2. Assume you're starting from zero here, because most people are. |
| **`dotnet test`** | A machine that tells you when you're done. You've never had one. From week 7 you'll write them yourself. |
| ⭐ **Where your code has to live** | Logic inside `Program.cs` cannot be called by anything — not by a test, not by me, not by you. [This is the one that changes how you write everything from now on.](#where-your-code-has-to-live) |

And one thing that isn't new but is worth twenty minutes anyway: **the compiler has a limit**, and [you have almost certainly been bitten by it without noticing](#whole-numbers-and-real-numbers).

---

## The project, not the file

Python runs a file: `python thing.py`. C# runs a **project** — a folder with a `.csproj` in it that says what to build.

**The way it's done in the demo**, and the way to do it when you're starting something new:

1. **VS Code → File → Open Folder**, then *New Folder* — call it `Haldane` — and open it.
2. Open the integrated terminal (`` Ctrl+` ``). It's already sitting in that folder.
3. Run:

```bash
dotnet new console
```

**You never say what to call the project — it takes the name from the folder you're in.** That's why you end up with `Haldane.csproj` and not something generic, and it's the clearest way to see that *the folder is the project*.

That leaves you with:

| | |
|---|---|
| `Program.cs` | your code |
| `Haldane.csproj` | the project file: what version of .NET, what packages |
| `obj/`, `bin/` | build machinery and the compiled program. **You never edit these**, and from week 2 you'll stop committing them |

Run it from inside that folder:

```bash
dotnet run
```

### When the project has to go *inside* a folder you already have

⚠️ **The homework needs this form, and the demo doesn't show it.** Your coursework repo has a `week-01` folder, and the project has to sit *inside* it as `Week01` — so you can't just open `week-01` and run `dotnet new console`, or the project would be called `week-01`.

`-o` ("output") makes the folder for you and names the project after it:

```bash
dotnet new console -o Week01
```

Run from inside `week-01`, that gives you `week-01/Week01/Week01.csproj` — which is exactly the layout the homework asks for.

**Two forms, one rule:** the project is named after the folder it ends up in. `dotnet new console` uses the folder you're standing in; `-o Name` makes a new one first.

Once a project sits next to another project — which is the case all term, because your work sits beside a checks project — run it by pointing at it:

```bash
dotnet run --project Haldane
```

> [!NOTE]
> **If your last course used full Visual Studio**, this is the same thing without the IDE doing it for you. `dotnet new` is *File → New Project*, `dotnet run` is the green triangle, and the `.csproj` is the thing the Solution Explorer was showing you. There's no `.sln` in this course and you won't miss it.

---

## The recap, at speed

Nothing in this section should be new. Skim it, and if any line surprises you, that's the one to slow down on.

```csharp
Console.WriteLine("on the air");   // prints, then moves to the next line
Console.Write("no newline. ");     // prints, stays put
Console.WriteLine();               // a blank line
```

The four types you need this week:

| Type | Holds | Example |
|---|---|---|
| `int` | a whole number | `12`, `-40`, `0` |
| `double` | a number with a decimal part | `-41.5`, `3.0`, `0.25` |
| `string` | text | `"Haldane"` |
| `bool` | true or false | `true`, `false` |

```csharp
int personnelOnStation = 12;
personnelOnStation = "twelve";   // does not compile. Not "crashes" — does not compile.
```

**Naming:** `camelCase` for variables, `PascalCase` for methods and classes. `var` means "work the type out from what I'm assigning" — the variable still has exactly one type forever, you just didn't type it out.

> [!NOTE]
> **Where's `static void Main`?** A file called `Program.cs` can just have statements in it and they run in order — that's *top-level statements*. If your last course had you writing `static void Main(string[] args)`, that's the older spelling and both still work. The starters here use the short form.

---

## Putting values into text

```csharp
Console.WriteLine($"On station: {personnelOnStation}");
```

**The `$` goes before the opening quote**, and anything in `{ }` gets evaluated and dropped in. You can put a whole expression in there, including a method call:

```csharp
Console.WriteLine($"That's {Conditions.Fahrenheit(temperatureC)} F.");
```

Forget the `$` and you get the literal text `On station: {personnelOnStation}` — which is a good first thing to check when your output looks like your source code.

---

## What the compiler guarantees

You've seen the build fail. What's worth being precise about is **what that guarantee actually covers**, because the edge of it is the reason this course has tests in it.

The compiler reads the whole file before anything runs. If the types don't line up, **nothing runs at all**:

```
Program.cs(13,26): error CS0029: Cannot implicitly convert type 'string' to 'int'

The build failed. Fix the build errors and run again.
```

Read that as three facts: **which file**, **line 13, character 26**, and **what's wrong**.

**`error CS0029` is a code you can search**, and every C# error has one. Searching the code plus the message is a genuinely good habit — it's how the language is documented, and it's faster than guessing.

### The guarantee, stated exactly

> **The compiler checks that your types line up. It does not check that your program is right.**

Those are very different promises, and the gap between them is enormous. `int / int` is a perfectly legal thing to write, so the compiler has nothing to say about it — even when it's the reason your answer is wrong. The next section is that gap, in the smallest possible example.

**That gap is exactly the shape of the hole that tests fill**, and it's why week 7 exists.

---

## Whole numbers and real numbers

⚠️ **This is the one habit that will silently give you a wrong answer this week**, and it is worth reading even though you've divided numbers in C# before — most people meet this once, fix it by trial and error, and never get told what actually happened.

```csharp
int fuelLitres = 4300;
int burnPerHour = 800;

double hoursOfFuel = fuelLitres / burnPerHour;
Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
```

That prints **5**. The right answer is **5.375**. There is no error, no warning, and no squiggle in the editor.

In Python 3, `/` always gives you a real number and you have to *ask* for the whole-number version with `//`. **In C# it's the other way round: whole ÷ whole = whole**, and the remainder is thrown away immediately with no announcement:

```csharp
int minutes = 330;

double hours = minutes / 60;      // 5    ← the division happened FIRST, as ints
double better = minutes / 60.0;   // 5.5  ← one side is a double, so it's real division
```

Look carefully at why the first one fails. `minutes / 60` is worked out *before* anything gets assigned: two `int`s, so C# does whole-number division and gets `5`. Only then does that `5` become a `double`, as `5.0`. **The decimal point was gone before `double` ever entered the picture.**

⚠️ **Which is why casting the result doesn't save you.** `(double)(minutes / 60)` is still `5.0` — you converted an answer that was already wrong. The fix has to happen *before* the division:

```csharp
minutes / 60.0            // make the literal a double  ← simplest
minutes / (double)60      // cast one operand, not the result
double perHour = 60;      // make the VARIABLE a double, then divide
minutes / perHour
```

The lab's check 4 is this exact trap. So is the generator fuel above.

---

## Methods, and what the words in front of them mean

Recap, but read the table — the two words most people never had explained are in it.

```csharp
public static string SignOn(string djName)
{
    return $"KDXR - you're on with {djName}.";
}
```

| Piece | Means |
|---|---|
| `public` | code outside this file is allowed to call it — **including the checks** |
| `static` | you can call it without making an object first. If you've been typing this because the compiler asked for it, [week 5 is where it stops being a magic word](#what-tonight-does-not-explain) |
| `string` | **the type of what comes back** |
| `SignOn` | the name. `PascalCase` for methods |
| `(string djName)` | the type of what goes in, then its name |

A method that returns nothing says `void`.

**A method can call another method, and should.** If two places both know the station's name, one of them will eventually be wrong:

```csharp
public static string CallSign()
{
    return "KDXR";
}

public static string SignOn(string djName)
{
    return $"{CallSign()} - you're on with {djName}.";   // asks, rather than repeating
}
```

That's not style. The homework's check 4 fails a program whose countdown disagrees with its own stated sign-off hour, and the only reliable way to keep them agreeing is to have one of them ask the other.

---

## Where your code has to live

⭐ **This is the new idea this week, and everything in this course rests on it.**

Here's the shape. **This is the whole file, `Broadcast.cs`:**

```csharp
public static class Broadcast
{
    public static string CallSign()
    {
        return "KDXR";
    }

    public static string SignOn(string djName)
    {
        return $"{CallSign()} - you're on with {djName}.";
    }
}
```

And **this is the whole file, `Program.cs`**, calling into it — the class name, a dot, the method:

```csharp
Console.WriteLine(Broadcast.SignOn("Marisol"));
```

You've written a class before. What you probably haven't been told is **why the split matters**:

> **`Program.cs` is what a human sees. The class is what has to be right.**

The checks in tonight's lab call `Broadcast.SignOn("Marisol")` **directly** and look at what comes back. They never look at your output. They never look at `Program.cs`. They can't — nothing can.

⚠️ **A method written at the bottom of `Program.cs` is invisible from outside**, even if you mark it `public`. It has to be in a class, in its own file. If the checks say they can't find your method and you're sure you wrote it, this is why.

**If your habit is to put everything in `Main`** — and for most people coming out of an intro course, it is — this is the habit to break tonight. It's not tidiness:

- **This week** it's the difference between a check finding your work and reporting zero.
- **In week 7** it's the difference between code you can test and code you can only squint at.
- **From week 10** it's the difference between logic you can point at a database and logic welded to a `Console.ReadLine`.

### What tonight does not explain

Two words in `public static class` are doing real work, and you're owed a proper account of both:

- **`public` and `private`** — why a class hides anything at all, and what you gain by it. **That's week 4.**
- **`static`** — what it actually means, and why the objects you build from week 4 onward mostly won't want it. **That's week 5.**

Tonight, `public static class` is the shape you type. Not because it's too hard, but because both deserve a session rather than a footnote — and you'll be asked to explain them properly when they land.

---

## Reading input

```csharp
Console.Write("DJ on duty: ");
string djName = Console.ReadLine() ?? "somebody";
```

`Console.ReadLine()` is `input()`. The `?? "somebody"` is the part worth knowing: **`ReadLine` can hand back nothing at all** — if the input has ended, there's no line to read — and `??` means "or use this instead".

That "nothing at all" is `null`, and C# is unusually careful about it. **Week 5 is where that care gets explained.** For now, `?? "something"` is the spelling.

⚠️ **Don't put the interesting parts of your program inside an input loop.** Read the input in `Program.cs`, then hand the values to a method that does the work. That's [the split from the section above](#where-your-code-has-to-live), and it's what makes your program testable — and gradeable.

---

## Getting your work onto GitHub

**Assume this is new.** An intro programming course usually doesn't cover git, and from week 2 your repo hygiene is worth points every single week.

Four commands, and you'll type them every week until they're muscle memory. From inside your project folder:

```bash
git init
git add .
git commit -m "Week 1: station sign-on"
```

- **`git init`** — start tracking this folder. Once, ever, per repo.
- **`git add .`** — stage everything that changed. The `.` means "this folder and everything under it".
- **`git commit -m "..."`** — save a snapshot, with a message saying what you did.

**Commit more than once, and make the messages mean something.** `week 1 setup`, `station class`, `countdown working` tells a story. `a`, `b`, `asdf` doesn't, and it's worth points.

Then connect it to the repo you made on GitHub and push. **GitHub shows you these two lines on the new-repo page** — use the ones it gives you, since they contain your username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/dotnet-db-coursework.git
git push -u origin main
```

After the first push, every later one is just:

```bash
git add .
git commit -m "what I did"
git push
```

> [!NOTE]
> **Your first push will include `bin/` and `obj/`** — folders full of files you didn't write. That's normal, it's what everybody's first repo looks like, and **week 2 is where we clean it up** and make sure it never happens again. Don't go hunting for a fix now.

---

## Appendix: troubleshooting

**`error CS1002: ; expected`** — a missing semicolon, on the line *above* the one it names about half the time.

**`error CS0029: Cannot implicitly convert type 'string' to 'int'`** — you put text where a number goes, or the reverse. Check the variable's declared type.

**`error CS0103: The name 'x' does not exist in the current context`** — a typo in a name, or you're using a variable before you declare it, or it's declared inside a different set of braces.

**`error CS0117` / "does not contain a definition for"** — the method name doesn't match. Capitals count: `signOn` and `SignOn` are different names.

**`error CS0161: not all code paths return a value`** — a method that promises a type has a route through it that returns nothing. Usually a `return` inside an `if` with nothing after it.

**`error CS8618` or a warning about null** — something that could be nothing. This week the answer is `?? "something"`.

**`MSB1003: Specify which project or solution file to use`** — you're in a folder with no `.csproj` in it. Either `cd` into the project folder, or use `dotnet run --project TheFolder`.

**The program prints `{djName}` instead of a name** — missing `$` before the opening quote.

**`dotnet: command not found`** — the terminal was open when you installed the SDK. Close it and open a new one.

**Your answer is a whole number when it shouldn't be** — [whole ÷ whole = whole](#whole-numbers-and-real-numbers). Put a `.0` on one side, *before* the division.

**The checks can't find your class** — it has to be `public`, in its own file, spelled exactly as the assignment says. [A method at the bottom of `Program.cs` is invisible to them.](#where-your-code-has-to-live)

**`fatal: not a git repository`** — you're not in the folder you ran `git init` in.

**`error: remote origin already exists`** — you ran `git remote add origin` twice. Harmless: `git remote set-url origin <url>` fixes it.
