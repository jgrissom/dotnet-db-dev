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

# Week 1 — Setup and First Contact

.NET Database Development · Week 1 of 16

---

<!-- _footer: '🖥️ Demo §1 · the one idea' -->

## Sixteen weeks, one idea

**In memory** — it dies when the program stops.

**In a file** — it survives. Asking questions of it hurts.

**In a database** — both problems, solved.

<br>

You'll feel the first one in **week 3**.

---

<!-- _footer: '🖥️ Demo §1 · tonight' -->

## Tonight

0. The paperwork — syllabus, Canvas, how grading works
1. Toolchain check — four commands
2. What `dotnet new console` actually made
3. **Where your code has to live**
4. Your work, on GitHub

---

<!-- _footer: '🖥️ Demo §1 · you already write C#' -->

## You already write C#

So this is **not** a second tour of the syntax.

<br>

It's the part your last course didn't have room for:

code a **machine can test**, git, collections, a database.

---

<!-- _footer: '🖥️ Demo §2 · toolchain check' -->

## Toolchain check

```bash
dotnet --version     # want 10.x
git --version
git config --global user.name
```

Plus the **C#** extension in VS Code.

<br>

Missing one? We install it now. **Everyone** does GitHub.

---

<!-- _footer: '🖥️ Demo §3 · two commands' -->

## Two commands

**Open Folder** → `dotnet-db-coursework` — **once, all semester:**

```bash
dotnet new console -o week-01/Haldane
dotnet run --project week-01/Haldane
```

<br>

Your terminal never leaves that folder.

**Name the week, then the project.**

---

<!-- _footer: '🖥️ Demo §3 · what it made' -->

## What dotnet new made

| | |
|---|---|
| `Program.cs` | your code |
| `Haldane.csproj` | what to build |
| `bin/` `obj/` | machinery — never edit |

<br>

A `.gitignore` keeps those last two out — **before your first commit.**

---

<!-- _footer: '🖥️ Demo §3 · the whole file' -->

## Program.cs is the whole file

```csharp
Console.WriteLine("Haldane Station");
```

<br>

No class, no `Main` — statements run top to bottom.

**This file is where the program starts.** Remember that in an hour.

<br>

Seen `static void Main`? Still works. This is the short spelling.

---

<!-- _footer: '🖥️ Demo §4 · a declared type' -->

## Variables have types

```csharp
int personnelOnStation = 12;

personnelOnStation = "twelve";   // not today
```

<br>

That word at the front isn't decoration.

It's a **promise the compiler will hold you to.**

---

<!-- _footer: '🖥️ Demo §4 · the four types' -->

## The four types

| | |
|---|---|
| `int` | a whole number — `12` |
| `double` | has a decimal part — `-41.5` |
| `string` | text — `"Haldane"` |
| `bool` | `true` / `false` |

---

<!-- _footer: '🖥️ Demo §4 · putting values into text' -->

## Putting values into text

```csharp
Console.WriteLine($"On station: {personnelOnStation}");
```

<br>

Anything in `{ }` gets evaluated — including a method call.

<br>

Lose the `$` and your output looks like your source.

---

<!-- _footer: '🖥️ Demo §5 · the warm-up' -->

## The build failed

```
Program.cs(13,26): error CS0029:
Cannot implicitly convert 'string' to 'int'
```

<br>

You've seen this. **Now read it properly.**

---

<!-- _footer: '🖥️ Demo §5 · reading an error' -->

## Reading an error

```
Program.cs(13,26): error CS0029: ...
```

<br>

**Which file** · **line 13, character 26** · **what's wrong**

<br>

`CS0029` is searchable. Every C# error has a code.

---

<!-- _footer: '🖥️ Demo §5 · the limit' -->

## What the compiler cannot catch

```csharp
int fuelLiters = 4300;
int burnPerHour = 800;

double hours = fuelLiters / burnPerHour;   // 5
```

<br>

The answer is **5.375**. No error. No warning. Nothing.

**It checks your types. Not your program.**

---

<!-- _footer: '🖥️ Demo §6 · a method' -->

## The words in front of a method

```csharp
public static string SignOn(string djName)
```

<br>

`public` — the checks can reach it

`static` — no object needed first

`string` — **what comes back**

---

<!-- _footer: '🖥️ Demo §6 · two words owed' -->

## What nobody told you yet

**`public` / `private`** — why a class hides anything.

→ **week 4**

<br>

**`static`** — what it is actually doing.

→ **week 5**

<br>

Tonight: it's the shape you type.

---

<!-- _footer: '🖥️ Demo §6 · two files, two jobs' -->

## Two files, two jobs

**`Program.cs`** — what a human sees.

**The class** — what has to be **right**.

<br>

Nothing can call into `Program.cs`. Not the checks. Not you.

<br>

If your logic lives in `Program.cs` — that's tonight.

---

<!-- _footer: '🖥️ Demo §7 · four commands' -->

## Four commands

```bash
git init
git add .
git commit -m "Week 1: station sign-on"
git push
```

**Plus four lines of `.gitignore`, before the `add`** —

so the repo only ever holds what you wrote.

Your terminal already stands where git lives: `dotnet-db-coursework`.

---

<!-- _footer: '🖥️ Demo §7 · your repo' -->

## Your repo for the whole term

**`dotnet-db-coursework`** · **private** · one folder per week

<br>

Add **jgrissom** as a collaborator —

that's how I read it, and it's **3 points**.

<br>

Week 4 adds a second, **public** repo. That one's yours.

---

<!-- _footer: '🖥️ Demo §8 · hand off' -->

## Lab: KDXR signs on

**KDXR 88.1 "The Owl"** — the overnight desk.

Four methods in `Broadcast.cs`.

```bash
dotnet test week-01/Lab.Checks
```

**1 / 5 green** out of the box.

**⏱️ 45 minutes · target tonight: 1–5 green.**

---

<!-- _footer: '🖥️ Demo §9 · one picture' -->

## Tonight, in one picture

**The compiler** checks your types — **not your program.**

**Your logic** lives where a test can reach it.

**Your work** is on GitHub.

<br>

Week 3: you type in three records, quit, and start again.
