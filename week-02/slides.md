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

# Week 2 — The Mistakes the Compiler Can't Catch

.NET Database Development · Week 2 of 16

---

<!-- _footer: '🖥️ Demo §1 · the number' -->

## The files you never wrote

`git add .` swept up **everything**.

<br>

**How many files did you push last week?**

<br>

Somebody wrote every one of them. It wasn't you.

---

<!-- _footer: '🖥️ Demo §1 · what they are' -->

## What bin/ and obj/ are

| | |
|---|---|
| `obj/` | the compiler's scratch paper |
| `bin/` | the built program |

Regenerated on **every build**. Deleting them costs nothing.

<br>

A repo holds what you **wrote**. The rest rebuilds.

---

<!-- _footer: '🖥️ Demo §2 · four lines' -->

## .gitignore

One file, at the **top** of the repo:

```
bin/
obj/
*.user
.DS_Store
```

<br>

git stops **seeing** whatever matches.

---

<!-- _footer: '🖥️ Demo §2 · ignored is not untracked' -->

## Ignored is not untracked

`.gitignore` only covers files git hasn't met yet.

What's already committed **stays tracked**. So, once:

```bash
git rm -r --cached .
git add .
git commit -m "Week 2: take out the trash"
```

Nothing leaves your disk. It leaves the **repo**.

---

<!-- _footer: '🖥️ Demo §3 · the panel' -->

## The panel reads the tree

**An empty *Changes* list is `git status` saying: clean.**

| Region | Verb |
|---|---|
| *Changes* list | `git status` |
| **+** | `git add` |
| message + **✓ Commit** | `git commit -m` |
| **Sync** | `git push` (and pull) |

Verbs first, buttons second. **Watch one file make the trip.**

---

<!-- _footer: '🖥️ Demo §3 · a readme' -->

## A README

The first thing anyone sees on your repo — including me.

<br>

Who you are, what this is, one line per week.

<br>

**Tonight: 1 point for it existing and saying something.**

---

<!-- _footer: '🖥️ Demo §4 · input arrives' -->

## Input arrives

```csharp
Console.Write("Outside temperature (C): ");
string raw = Console.ReadLine();
```

<br>

You've called `ReadLine` a hundred times.

<br>

**That squiggle is not decoration.**

---

<!-- _footer: '🖥️ Demo §4 · the warning' -->

## The warning you'd have ignored

```
warning CS8600: Converting null literal or
possible null value to non-nullable type.
```

**Warning ≠ error.** It built. It ran.

<br>

A warning is the compiler saying:

**"this is the part I can't promise."**

---

<!-- _footer: '🖥️ Demo §4 · or use this instead' -->

## ?? — or use this instead

```csharp
string raw = Console.ReadLine() ?? "";
```

<br>

`ReadLine` can hand back **nothing at all** — that's `null`,

and `??` means *"or use this instead."*

<br>

The full story of `null` is **week 5**.

---

<!-- _footer: '🖥️ Demo §4 · text becomes a number' -->

## Text becomes a number

```csharp
double reading = double.Parse(raw);
```

<br>

`"-41.5"` is **text**. The board needs a **number**.

<br>

`Parse` is the converter — and it takes the string's word for it.

---

<!-- _footer: '🖥️ Demo §5 · the lie' -->

## Input that lies

```
Unhandled exception. System.FormatException:
The input string '-41.5 C' was not
in a correct format.
```

<br>

Compiled clean. Ran fine every rehearsal.

Went down over a **unit of measurement**, at 3 AM.

---

<!-- _footer: '🖥️ Demo §5 · tryparse asks' -->

## TryParse asks first

```csharp
if (double.TryParse(raw, out double reading))
{
    // a real reading — use it
}
else
{
    // the console STAYS UP
}
```

**false**, never a crash — for words, blanks, even `null`.

---

<!-- _footer: '🖥️ Demo §5 · the sentence' -->

## What no compiler can check

Week 1: it checks your **types** — not your program.

<br>

Week 2: input happens **after compiling is over**.

<br>

**The compiler cannot check your users.**

Your program has to.

---

<!-- _footer: '🖥️ Demo §6 · hand off' -->

## Lab: the caller line

**KDXR 88.1 "The Owl"** — the 2 AM call sweep.

Last week's desk answers the phone tonight —

and the phone can **crash it**. You'll fix that.

```bash
dotnet test Lab.Checks
```

**1 / 5 green** out of the box.

**⏱️ 60 minutes · target tonight: 1–5 green.**

---

<!-- _footer: '🖥️ Demo §7 · one picture' -->

## Tonight, in one picture

**Your repo** holds what you wrote — nothing generated.

**A warning** marks the edge of the compiler's promise.

**Parse believes. TryParse asks.** The desk stays up.

<br>

Week 3: the station gets a memory — and loses it at midnight.
