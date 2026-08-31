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

# Week 7 — The Checks Stop Being Magic

.NET Database Development · Week 7 of 16

---

<!-- _footer: '🖥️ Demo §2 · two bugs on the board' -->

## Three people on the ice

```
│ 14:20 │ Okonkwo   │ MET RUN │ 15:00 │ OUT │ 2 │
│ 14:57 │ Okonkwo   │ DIG OUT │ 15:30 │ OUT │ 2 │

4 people outside.
```

One man. Two open trips.

No error. No warning. The compiler has
no opinion about **wrong**.

---

<!-- _footer: '🖥️ Demo §2 · two bugs on the board' -->

## How long does a fix stay fixed?

Checking by hand: run it, type it, read the board.

- two minutes
- at a keyboard
- by a person
- **every run, every week, every rule**

A fix you checked tonight has been checked once.

---

<!-- _footer: '🖥️ Demo §2 · two bugs on the board' -->

## Nothing can call Program.cs

The rule *you can't go out twice* lives in
a local function in `Program.cs`.

Week 1, night one:

> Code there can't be called, tested,
> or graded by anyone.

A check is just a **caller**.
There is nothing here for it to call.

---

<!-- _footer: '🖥️ Demo §3 · the move' -->

## Move it. Don't fix it.

Two acts, kept apart on purpose:

- **move** — same behavior, somewhere a test can call it
- **fix** — new behavior, proven by a test

Do both at once and you never learn
which one worked.

The bugs ride along. That's the plan.

---

<!-- _footer: '🖥️ Demo §3 · the move' -->

## Now something can call them

```csharp
public class Watch
{
    private readonly List<ILogEntry> _entries;

    public void SignOut(...)
    public bool AmendBackBy(...)
    public bool MarkBack(...)
    public int  OutsideCount
}
```

`Program.cs` keeps the prompts and the paint.
The rules are **public methods on a class** now —
the only shape another project can call.

---

<!-- _footer: '🖥️ Demo §4 · a project that asks questions' -->

## A check is a Fact

```csharp
[Fact]
public void MinusFiftyIsTheLine()
{
    Assert.True(Conditions.IsSafeToGoOut(-49.9, false));
    Assert.False(Conditions.IsSafeToGoOut(-50.0, false));
}
```

Set the scene. Do the thing. Check the answer.

The runner calls every `[Fact]`, every time.

---

<!-- _footer: '🖥️ Demo §4 · a project that asks questions' -->

## You've been reading tests all semester

Every `*.Checks` project since week 1:

a class · methods marked `[Fact]` · `Assert`s

The industry word is **unit test**.

There is no line of that file
you cannot read now.

---

<!-- _footer: '🖥️ Demo §4 · a project that asks questions' -->

## Make it fail once

A test that has never failed
proves less than you think.

Make it lie, on purpose. Watch it object:

```
Failed  MinusFiftyIsTheLine
Expected: True
Actual:   False
```

Then put the truth back.

---

<!-- _footer: '🖥️ Demo §5 · red, then green' -->

## Red, then green

**Test first.** Against the real bug.

```
Assert.Equal() Failure: Values differ
Expected: 1
Actual:   2
```

Red proves the test can see the bug.
Green proves the fix.

Fix first, and you never learn what red would have told you.

---

<!-- _footer: '🖥️ Demo §6 · the other bug' -->

## Test the rule, not the line

The scene is her afternoon:

out → back → out again → *the phone call*

```csharp
Assert.Equal("16:00", watch.SignOuts()[1].Expected);
Assert.Equal("14:45", watch.SignOuts()[0].Expected);
```

The open trip moves.
The closed one is **history** — untouched.

---

<!-- _footer: '🖥️ Demo §7 · hand off' -->

## Lab: the update

KDXR's scheduler took an update overnight.
It "improved" four things.

For each one:

**your test → red → the fix → green**

`Lab.Tests` is yours — the first **test project**
in this course that belongs to you.

**⏱️ 50 minutes · target tonight: 5 green, and 5 of your own.**

---

<!-- _footer: '🖥️ Demo §8 · wrap' -->

## Tonight, in one picture

| | |
|---|---|
| `[Fact]` | a method the runner always calls |
| a check | a test, wearing this course's name |
| red first | proof the test can see the bug |
| green after | proof the fix — checked forever |

The log still dies at `q`. **Week 8.**
