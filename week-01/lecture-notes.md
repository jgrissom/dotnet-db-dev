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

C# doesn't run a file — it runs a **project**: a folder with a `.csproj` in it that says what to build. (Your last course may have kept this behind an IDE; here it's on the table.)

**One way of working, used in the demo, the lab and the homework alike — and it's one window, all semester:**

1. **VS Code → File → Open Folder → `dotnet-db-coursework`** — the top of your repo. **You open this folder once, and it's the only folder you ever open, all sixteen weeks.**
2. Open the integrated terminal (`` Ctrl+` ``). It stands at the top of your repo — which is where every command in this course runs, `git` included.
3. Make projects with `-o` ("output"), naming the week and the project in one path — it creates both folders as needed:

```bash
dotnet new console -o week-01/Haldane
```

That leaves you with `week-01/Haldane/`, containing:

| | |
|---|---|
| `Program.cs` | your code |
| `Haldane.csproj` | the project file: what version of .NET, what packages |
| `obj/`, `bin/` | build machinery and the compiled program. **You never edit these**, and [your `.gitignore` keeps them out of your repo](#the-gitignore-written-before-your-first-commit) from the very first commit |

And you run it **without moving** — same terminal, naming the week-qualified project:

```bash
dotnet run --project week-01/Haldane
```

⚠️ **Stay at the top, and put the week in front of every project name.** That one habit removes the most common error of the whole course — and it means any command from any week works from the one place your terminal always is.

### A folder is either a project or a container — never both

⚠️ **This one rule explains every folder layout you'll see this term**, including the one that trips people up in the lab.

A project folder owns **every `.cs` file underneath it**. So you can't put one project inside another — the outer project tries to compile the inner one's files, and *your* program stops building with errors pointing at code you didn't write.

Which means a folder holding two projects **can't be a project itself**. It's just a container:

By the end of tonight your `week-01` holds four of them:

```
week-01/               ← container. Not a project. Nothing builds here.
├─ Lab/                ← project — tonight's lab
├─ Lab.Checks/         ← project — its checks, referencing ../Lab
├─ Homework/           ← project — your own station
└─ Homework.Checks/    ← project — its checks, referencing ../Homework
```

**Your terminal stays at the top.** Every command names the week, then the project it means:

```bash
dotnet test week-01/Lab.Checks
dotnet run  --project week-01/Lab

dotnet test week-01/Homework.Checks
dotnet run  --project week-01/Homework
```

Forgetting the week prefix is the single most common way to get `MSB1003: Specify which project or solution file to use` — the command couldn't see a project from where it ran. Put the week in front and go again.

⚠️ **The checks folder goes *beside* the project it tests, never inside it** — `Lab.Checks` next to `Lab`, not within it. Put one inside the other and *your* program stops compiling, complaining about files you never wrote.

> [!NOTE]
> **The lab and the homework are independent.** A half-finished lab can't affect your homework result and vice versa — they're separate projects, and `dotnet test Homework.Checks` only ever builds `Homework`.

> [!NOTE]
> **There's no `.sln` anywhere in this course, and you don't need one.** A solution file is a list of projects; it wouldn't change any of the above. You point `dotnet` at the project you mean, which is one less thing to keep in sync.

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
> **`Program.cs` holds bare statements, and they run in order** — no class around them. That's *top-level statements*, and it's what `dotnet new console` has produced since .NET 6, so it's probably all you've ever written. **If you have seen `static void Main(string[] args)`** — in an older course, a tutorial, or full Visual Studio — that's the longer spelling of the same thing. Both still work; everything here uses the short form.

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
int fuelLiters = 4300;
int burnPerHour = 800;

double hoursOfFuel = fuelLiters / burnPerHour;
Console.WriteLine($"Generator fuel: {hoursOfFuel} hours remaining.");
```

That prints **5**. The right answer is **5.375**. There is no error, no warning, and no squiggle in the editor.

**In C#, whole ÷ whole = whole** — the remainder is thrown away immediately, with no announcement:

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

**If your programs so far have been one file, top to bottom** — and for most people coming out of an intro course, they have been — this is the habit to break tonight. It's not tidiness:

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

**And here's the payoff of the one-window design: your terminal is already standing where git lives.** One repo holds your whole semester, its top is the folder you always have open, and `git` and `dotnet` finally agree about where you should be:

```
dotnet-db-coursework/     ← your VS Code window. git lives HERE. So does your terminal.
└─ week-01/               ← named in dotnet commands: --project week-01/Lab
   ├─ Lab/
   ├─ Lab.Checks/
   ├─ Homework/
   └─ Homework.Checks/
```

### The gitignore, written before your first commit

Run `git init`, then `git status`, and you get one line: `week-01/`. That is git being tidy — **it summarizes an untracked folder rather than listing what is inside it** — and it is hiding the problem. Ask for all of it:

```bash
git status -u
```

Now you see everything git can see: your three source files, and screen after screen of `bin/` and `obj/`. *(`git status` on its own is the one you'll type every day; `-u` is for when a folder is hiding its contents from you.)* That machinery is regenerated from your source on every build; nothing in it is yours, and none of it belongs in a repo:

> **A repo holds what you wrote. Everything generated can be regenerated — by anyone, from your source, any time.**

The fix is one file, written **before your first commit**. **This is the whole file, `.gitignore`, at the root of `dotnet-db-coursework`:**

```
bin/
obj/
*.user
.DS_Store
```

One filename pattern per line; anything that matches, git stops *seeing* — it vanishes from `git status`, and `git add .` won't touch it. Type the lines with the Source Control badge in view and you can watch the number collapse. The last two lines cover things you may never meet: `*.user` is per-machine editor settings, and `.DS_Store` is macOS's Finder leaving notes to itself in every folder it opens — Windows users never see one, and the line costs nothing.

Because the file sits at the **top** of the repo, it covers every week folder — including the fifteen that don't exist yet. You write it once, tonight, and never think about it again. *(What happens if a generated file gets committed anyway — and someday, somewhere, one will — is week 2's opening lesson: ignoring is not untracking, and there's a three-command repair.)*

### The four commands

Four commands, and you'll type them every week until they're muscle memory:

```bash
git init
git add .
git commit -m "Week 1: station sign-on"
```

- **`git init`** — start tracking this folder. **Once, ever** — at `dotnet-db-coursework`, never again. Run it from a fresh `` Ctrl+` `` terminal (which always starts at the top) and you can't get it wrong.
- **`git add .`** — stage everything that changed. The `.` means "this folder and everything under it".
- **`git commit -m "..."`** — save a snapshot, with a message saying what you did.

**Commit more than once, and make the messages mean something.** `week 1 setup`, `station class`, `countdown working` tells a story. `a`, `b`, `asdf` doesn't, and it's worth points.

Then connect it to the repo you made on GitHub and push.

> [!IMPORTANT]
> **The repo has to exist on GitHub first — `git push` cannot create it.** If you haven't made it, it's two minutes: [`setup-guide.md` §5](setup-guide.md#5-github-an-account-your-coursework-repo-and-the-course-repo). Name it `dotnet-db-coursework`, set it **Private**, **don't** add a README, and add `jgrissom` as a collaborator. A push to a repo that isn't there fails with `Repository not found`.

**GitHub shows you these two lines on the new-repo page** — use the ones it gives you, since they contain your username:

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

**`error CS0103: The name 'x' does not exist in the current context`** — a typo in a name, or you're using a variable before you declare it, or it's declared inside a different set of braces. ⚠️ **If `x` is one of your own classes and the spelling is right, check where the file is.** A `.cs` file has to sit **inside the project folder** — `Homework/Station.cs`, not `Station.cs` next to it. A file one level up belongs to no project, so nothing compiles it and the class genuinely doesn't exist.

**`error CS0117` / "does not contain a definition for"** — the method name doesn't match. Capitals count: `signOn` and `SignOn` are different names.

**`error CS0161: not all code paths return a value`** — a method that promises a type has a route through it that returns nothing. Usually a `return` inside an `if` with nothing after it.

**`error CS8618` or a warning about null** — something that could be nothing. This week the answer is `?? "something"`.

**`MSB1003: Specify which project or solution file to use`** — the command couldn't see a project from where it ran. From your coursework window it's always week first, then project: `dotnet run --project week-01/Lab`.

**The program prints `{djName}` instead of a name** — missing `$` before the opening quote.

**`dotnet: command not found`** — the terminal was open when you installed the SDK. Close it and open a new one.

**Your answer is a whole number when it shouldn't be** — [whole ÷ whole = whole](#whole-numbers-and-real-numbers). Put a `.0` on one side, *before* the division.

**The checks can't find your class** — it has to be `public`, in its own file, spelled exactly as the assignment says. [A method at the bottom of `Program.cs` is invisible to them.](#where-your-code-has-to-live)

**`fatal: not a git repository`** — you're not in the folder you ran `git init` in.

**`error: remote origin already exists`** — you ran `git remote add origin` twice. Harmless: `git remote set-url origin <url>` fixes it.
