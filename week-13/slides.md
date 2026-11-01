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


# Week 13 — Four Answers

**Exceptions: what a program does when something goes wrong**

- the input lies, the file is missing or damaged, the file lies, and the row is gone
- each time we run it, watch it crash, and pick an answer
- `try`, `catch` and `throw`, and where each one goes
- **your lab:** the same four, on the carts

.NET Database Development · Week 13 of 16

---

<!-- _footer: '🖥️ Demo §2 · the input lies' -->

## Four answers

| The answer | When |
|---|---|
| **Ask again** | the person at the keyboard can fix it |
| **Say no** | the answer is simply no, and the program carries on |
| **Throw** | a method can't do its job, and somebody else has to decide |
| **Stop** | the program can't carry on |

---

<!-- _footer: '🖥️ Demo §3 · the file is missing, or damaged' -->

## Throw there, catch here

| `Switchboard` | `SwitchboardDesk` |
|---|---|
| does the thinking | talks to the person |
| never prints a word | holds the `try` and the `catch` |
| **throws** when it can't do its job | **catches**, and picks the answer |

A check can call `Switchboard` with no keyboard and no screen.

---

<!-- _footer: '🖥️ Demo §5 · the row is gone' -->

## Every crash so far

**Fixed by asking first:** `TryParse`, `TryGetValue`, `FirstOrDefault`

**Can't be asked first:**

| Crash | The answer |
|---|---|
| `IOException` | ask again |
| `JsonException` | say no |
| `InvalidDataException` | throw, then say no |
| `DbUpdateException`, no database | stop |

---

<!-- _footer: '🖥️ Demo §6 · wrap' -->

## Tonight, in one picture

**Exceptions: four answers**

- ask again, when the person can fix it
- say no, when the answer is simply no
- throw, when a method can't do its job
- stop, when the program can't carry on
- the thinking class throws; the class that talks to people catches
