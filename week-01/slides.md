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

1. A working toolchain — five installs
2. A folder becomes a running program
3. **Variables have types**, and a compiler that means it
4. Your work, on GitHub

---

<!-- _footer: '🖥️ Demo §1 · you already know this' -->

## You already know how to program

This course never teaches you what a loop is.

<br>

It teaches you **what C# does differently** — and why.

<br>

Python is the bridge. We use it constantly.

---

<!-- _footer: '🖥️ Demo §2 · five installs' -->

## Five installs

1. **.NET 10 SDK** — the compiler
2. **VS Code** — the editor *(not Visual Studio)*
3. **C# extension** — by Microsoft *(not Dev Kit)*
4. **Git**, and your name in it
5. **GitHub**, and a **private** repo

<br>

Each one ends with a ✓ that prints something.

---

<!-- _footer: '🖥️ Demo §3 · two commands' -->

## Two commands

```bash
dotnet new console -o Haldane
dotnet run
```

<br>

Python runs a **file**. C# runs a **project** —

a folder that knows how to build itself.

---

<!-- _footer: '🖥️ Demo §3 · what it made' -->

## What dotnet new made

| | |
|---|---|
| `Program.cs` | your code |
| `Haldane.csproj` | what to build |
| `bin/` `obj/` | machinery — never edit |

<br>

**Week 2:** you stop committing those last two.

---

<!-- _footer: '🖥️ Demo §3 · printing' -->

## Printing

```python
print("Haldane Station")
```

```csharp
Console.WriteLine("Haldane Station");
```

<br>

A **semicolon** ends a statement. Indentation means **nothing**.

---

<!-- _footer: '🖥️ Demo §4 · the status board' -->

## Variables have types

```python
personnel = 12
personnel = "twelve"      # Python: fine
```

```csharp
int personnelOnStation = 12;
personnelOnStation = "twelve";   // not today
```

<br>

You say what it holds. That's what it holds.

---

<!-- _footer: '🖥️ Demo §4 · the four types' -->

## The four types

| | |
|---|---|
| `int` | a whole number — `12` |
| `double` | has a decimal part — `-41.5` |
| `string` | text — `"Haldane"` |
| `bool` | `true` / `false` — **lowercase** |

---

<!-- _footer: '🖥️ Demo §4 · f-strings, moved' -->

## Putting values into text

```python
print(f"On station: {personnel}")
```

```csharp
Console.WriteLine($"On station: {personnelOnStation}");
```

<br>

Same idea. **The letter moved.**

---

<!-- _footer: '🖥️ Demo §5 · the refusal' -->

## The build failed

```
error CS0029: Cannot implicitly
convert type 'string' to 'int'

The build failed.
```

<br>

Your program didn't run.

Not *ran and crashed* — **didn't run.**

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

<!-- _footer: '🖥️ Demo §5 · the compiler’s limit' -->

## What the compiler cannot catch

```csharp
int fuelLitres = 4300;
int burnPerHour = 800;

double hours = fuelLitres / burnPerHour;   // 5
```

<br>

The answer is **5.375**. No error. No warning.

**whole ÷ whole = whole**

---

<!-- _footer: '🖥️ Demo §6 · a method' -->

## A method is a def with types

```python
def sign_on(dj_name):
    return f"KDXR - {dj_name}"
```

```csharp
public static string SignOn(string djName)
{
    return $"KDXR - {djName}";
}
```

---

<!-- _footer: '🖥️ Demo §6 · the class' -->

## The class is a box to put methods in

```csharp
public static class Broadcast
{
    public static string CallSign()
    {
        return "KDXR";
    }
}
```

<br>

`class` is **week 4**. `static` is **week 5**. Tonight: the shape.

---

<!-- _footer: '🖥️ Demo §6 · two files, two jobs' -->

## Two files, two jobs

**`Program.cs`** — what a human sees.

**The class** — what has to be **right**.

<br>

The checks can only call the second one.

<br>

So can you, in **week 7**, when you write your own.

---

<!-- _footer: '🖥️ Demo §7 · four commands' -->

## Four commands

```bash
git init
git add .
git commit -m "Week 1: station sign-on"
git push
```

<br>

Every week, until your fingers know them.

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
dotnet test KDXR.Checks
```

**1 / 5 green** out of the box.

**⏱️ 40 minutes · target tonight: 1–4 green.**

---

<!-- _footer: '🖥️ Demo §9 · one picture' -->

## Tonight, in one picture

**Types** — you say what a thing is.

**The compiler** — reads it all before any of it runs.

**And it still can't catch everything.**

<br>

Week 3: you type in three records, quit, and start again.
