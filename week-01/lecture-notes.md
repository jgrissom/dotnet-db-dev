# Week 1 — Lecture Notes

Your at-home reference for the week. Everything the lab and the homework need is in here, with the Python you already know sitting next to it.

**Rule for reading the code blocks:** every one of them either *is* a complete file, or the line above it says which file it goes inside. Nothing here is a fragment you're expected to guess the home of.

---

## What this course is actually about

One idea, and it takes sixteen weeks to land properly:

> **Data in memory dies when the program stops. Data in a file survives, but asking questions of it hurts. Data in a database is the answer to both.**

You'll *feel* the first part in week 3 — you'll type three records into a program, quit it, start it again, and they'll be gone. That problem gets answered twice: with a file in week 8, and properly with a database in week 10.

Tonight is the toolchain and the language's first hour.

---

## A program is a file that runs top to bottom

Here is a complete Python program:

```python
print("Haldane Station")
print("nearest neighbour: 512 km")
```

And here is the complete C# program that does the same thing. **This is the whole file, and it's called `Program.cs`:**

```csharp
Console.WriteLine("Haldane Station");
Console.WriteLine("nearest neighbour: 512 km");
```

Three differences, and only one of them is interesting:

| | Python | C# |
|---|---|---|
| printing | `print(...)` | `Console.WriteLine(...)` |
| end of a statement | the end of the line | a **semicolon** |
| grouping | indentation | **braces** `{ }` |

The semicolon is the one that will annoy you for about two days and then disappear from your awareness entirely. **Indentation means nothing to C#** — it's for humans only. You should still indent, for the same reason you'd still write in paragraphs.

> [!NOTE]
> **Where's `def main()`?** C# used to make you write a wrapper around every program. It doesn't any more — a file called `Program.cs` can just have statements in it, and they run in order. This is called *top-level statements*. If you find an example online buried inside `static void Main(string[] args)`, it's the old spelling of the same thing.

### The project, not the file

Python runs a file: `python thing.py`. C# runs a **project** — a folder with a `.csproj` file in it that says what to build.

```bash
dotnet new console -o Haldane
```

That makes a folder called `Haldane` containing:

| | |
|---|---|
| `Program.cs` | your code |
| `Haldane.csproj` | the project file: what version of .NET, what packages |
| `obj/`, `bin/` | build machinery and the compiled program. **You never edit these**, and from week 2 you'll stop committing them |

Run it from inside that folder:

```bash
dotnet run
```

Or from outside, which is what you'll do all term because your project sits next to a checks project:

```bash
dotnet run --project Haldane
```

---

## Printing

```csharp
Console.WriteLine("on the air");   // prints, then moves to the next line
Console.Write("no newline. ");     // prints, stays put
```

`Console.WriteLine()` with nothing in the brackets prints a blank line.

---

## Variables have types

This is the real difference, and everything else this term follows from it.

In Python, a name can hold anything, and change its mind:

```python
personnel = 12
personnel = "twelve"     # Python: fine
```

In C#, **you say what kind of thing a variable holds, and that's what it holds forever**:

```csharp
int personnelOnStation = 12;
personnelOnStation = "twelve";   // does not compile. Not "crashes" — does not compile.
```

The four types you need this week:

| Type | Holds | Example |
|---|---|---|
| `int` | a whole number | `12`, `-40`, `0` |
| `double` | a number with a decimal part | `-41.5`, `3.0`, `0.25` |
| `string` | text | `"Haldane"` |
| `bool` | true or false | `true`, `false` |

⚠️ **`true` and `false` are lowercase in C#** (Python capitalises them). You'll get this wrong once.

**Naming:** C# uses `camelCase` for variables — `personnelOnStation`, not `personnel_on_station`. Nothing breaks if you use underscores; you'll just look like a tourist.

> [!TIP]
> **`var` exists**, and it means "work the type out from what I'm assigning" — `var personnel = 12;` makes an `int`. It is **not** Python's dynamic typing: the variable still has exactly one type forever, you just didn't type it out. Use the explicit type this week; you'll appreciate `var` around week 3 when the type names get long.

---

## Putting values into text

Python's f-string:

```python
print(f"On station: {personnel}")
```

C#'s version is the same idea with the letter moved:

```csharp
Console.WriteLine($"On station: {personnelOnStation}");
```

**The `$` goes before the opening quote**, and anything in `{ }` gets evaluated and dropped in. You can put a whole expression in there, including a method call:

```csharp
Console.WriteLine($"That's {Conditions.Fahrenheit(temperatureC)} F.");
```

Forget the `$` and you get the literal text `On station: {personnelOnStation}` — which is a good first thing to check when your output looks like your source code.

---

## The compiler is a new character

Python finds out your program is wrong **by running it and falling over**. If the mistake is on line 40, you get thirty-nine lines of output first.

C# has a step in between called **compiling**, and it happens every time you `dotnet run`. The compiler reads the whole file before anything runs, and if it doesn't make sense, **nothing runs at all**:

```
Program.cs(13,26): error CS0029: Cannot implicitly convert type 'string' to 'int'

The build failed. Fix the build errors and run again.
```

Read that as three facts: **which file**, **line 13, character 26**, and **what's wrong**.

> This is the single biggest adjustment coming from Python, and it's worth being clear about what changed: **you now find out about a whole category of mistake before your program has done anything at all.** No half-written file, no forty lines of output followed by a crash. The compiler is not being difficult. It's the first person to read your code, and it's reading it very carefully.

**`error CS0029` is a code you can search**, and every C# error has one. Searching the code plus the message is a genuinely good habit — it's how the language is documented.

### What the compiler can't catch

Here's the other half, and it's why week 7 exists.

```csharp
int fuelLitres = 4300;
int burnPerHour = 800;

double hoursOfFuel = fuelLitres / burnPerHour;
Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
```

That prints **5**. The right answer is **5.375**. There is no error and no warning — the compiler has no opinion, because nothing is wrong with the *types*. See the next section for why.

**The compiler catches what it can, and it cannot catch everything.** That gap is exactly the shape of the hole that tests fill, and you'll meet those properly in week 7.

---

## Whole numbers and real numbers

⚠️ **This is the one Python habit that will silently give you a wrong answer this week.**

In Python 3, dividing gives you a real number, always:

```python
330 / 60      # 5.5
330 // 60     # 5   — you have to ASK for the whole-number version
```

In C#, **whole ÷ whole = whole.** The remainder is thrown away, immediately, with no announcement:

```csharp
int minutes = 330;

double hours = minutes / 60;      // 5    ← the division happened FIRST, as ints
double better = minutes / 60.0;   // 5.5  ← one side is a double, so it's real division
```

Look carefully at why the first one fails. `minutes / 60` is worked out *before* anything gets assigned: two `int`s, so C# does whole-number division and gets `5`. Only then does that `5` become a `double`, as `5.0`. **The decimal point was gone before `double` ever entered the picture.**

Three ways to fix it, all fine:

```csharp
minutes / 60.0            // make the literal a double  ← simplest
minutes / (double)60      // "treat this as a double"
double perHour = 60;      // make the VARIABLE a double, then divide
minutes / perHour
```

The lab's check 4 is this exact trap. So is the generator fuel above.

---

## A method is a `def` with the types written down

Python:

```python
def sign_on(dj_name):
    return f"KDXR - you're on with {dj_name}."
```

C#:

```csharp
public static string SignOn(string djName)
{
    return $"KDXR - you're on with {djName}.";
}
```

Read it left to right:

| Piece | Means |
|---|---|
| `public` | code outside this file is allowed to call it |
| `static` | you can call it without making an object first — objects arrive in week 4 |
| `string` | **the type of what comes back** |
| `SignOn` | the name. `PascalCase` for methods — capital first letter |
| `(string djName)` | the type of what goes in, then its name |

**The type in front of the name is the return type.** A method that returns nothing says `void`, which is C#'s way of writing "this one just does something":

```csharp
public static void PrintBanner()
{
    Console.WriteLine("KDXR 88.1");
}
```

A method can call another method, and should. If two places both know the station's name, one of them will eventually be wrong:

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

---

## The class is a box to put methods in

C# has nowhere to put a method except inside a class, so every method you write this term lives in one. **This is the whole file, `Broadcast.cs`:**

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

> [!IMPORTANT]
> **Tonight, treat `public static class` as the shape you type.** You are not expected to understand `class` or `static` yet — classes are week 4 and `static` is week 5, and both get taught properly rather than assumed. What matters this week is the *split*:
>
> **`Program.cs` is what a human sees. The class is what has to be right.**
>
> That split is not decoration. It's why the checks can test your work at all: they call `Broadcast.SignOn("Marisol")` directly and look at what comes back. Code buried inside `Program.cs` can't be called by anything, so it can't be checked — and from week 7, can't be tested by *you* either.

⚠️ **A method written at the bottom of `Program.cs` is invisible from outside**, even if you mark it `public`. It has to be in a class in its own file. If the checks say they can't find your method and you're sure you wrote it, this is why.

---

## Reading input

```csharp
Console.Write("DJ on duty: ");
string djName = Console.ReadLine() ?? "somebody";
```

`Console.ReadLine()` is `input()`. The `?? "somebody"` is the new part: **`ReadLine` can hand back nothing at all** — if the input has ended, there's no line to read — and `??` means "or use this instead".

That "nothing at all" is C#'s `null`, which is Python's `None`. C# is unusually careful about it, and **week 5 is where that care gets explained**. For now, `?? "something"` is the spelling.

⚠️ **Don't put the interesting parts of your program inside an input loop.** Read the input in `Program.cs`, then hand the values to a method that does the work. That's the split from the section above, and it's what makes your program testable — and gradeable.

---

## Getting your work onto GitHub

Four commands, and you'll type them every week until they're muscle memory. From inside your project folder:

```bash
git init
git add .
git commit -m "Week 1: station sign-on"
```

- **`git init`** — start tracking this folder. Once, ever, per repo.
- **`git add .`** — stage everything that changed. The `.` means "this folder and everything under it".
- **`git commit -m "..."`** — save a snapshot, with a message saying what you did.

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

**`error CS8618` or a warning about null** — something that could be nothing. This week the answer is `?? "something"`.

**`MSB1003: Specify which project or solution file to use`** — you're in a folder with no `.csproj` in it. Either `cd` into the project folder, or use `dotnet run --project TheFolder`.

**The program prints `{djName}` instead of a name** — missing `$` before the opening quote.

**`dotnet: command not found`** — the terminal was open when you installed the SDK. Close it and open a new one.

**Your answer is a whole number when it shouldn't be** — [whole ÷ whole = whole](#whole-numbers-and-real-numbers). Put a `.0` on one side.

**The checks can't find your class** — it has to be `public`, in its own file, spelled exactly as the assignment says. A method at the bottom of `Program.cs` is invisible to them.

**`fatal: not a git repository`** — you're not in the folder you ran `git init` in.

**`error: remote origin already exists`** — you ran `git remote add origin` twice. Harmless: `git remote set-url origin <url>` fixes it.
