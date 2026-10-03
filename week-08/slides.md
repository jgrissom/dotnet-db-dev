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


# Week 8 — The Night Stops Being Gone

.NET Database Development · Week 8 of 16

---

<!-- _footer: '🖥️ Demo §2 · gone' -->

## Objects ⇄ text

A file holds **text**. The switchboard is **objects** in memory.

| | |
|---|---|
| **serialize** | objects → JSON text → `File.WriteAllText` |
| **deserialize** | `File.ReadAllText` → JSON text → objects |

```json
{ "Name": "Dorothy", "CallsTonight": 4 }
```

**JSON**: plain text a person can read, and a program can turn back into objects.

---

<!-- _footer: '🖥️ Demo §3 · the switchboard, written down' -->

## Where the file actually goes

A plain name is worked out from **where you
were standing**, not from where the code is.

| typed at the top of your repo | runs in |
|---|---|
| `dotnet run --project week-08/Lab` | the top |
| `dotnet test week-08/Lab.Tests` | `bin/Debug/net10.0` |

Same name. **Two different files.**

So the path is **handed to the method**, always.

---

<!-- _footer: '🖥️ Demo §5 · the number that came back wrong' -->

## What a serializer won't read back

It **writes** every property it can **read**.
It **reads back** only the ones it can **write**.

```csharp
public int CallsTonight { get; private set; }
```

Goes into the file. **Never comes back.**

```csharp
[JsonInclude]
public int CallsTonight { get; private set; }
```

---

<!-- _footer: '🖥️ Demo §7 · wrap' -->

## Tonight, in one picture

**objects → text → file → and back**

- `File` does each direction in one line
- the serializer turns a list into text and back
- the **path is handed to the method**
- no file is a **first night**
- a private setter needs **`[JsonInclude]`**
- a save file is a text file **anybody can edit**

Week 10: somewhere other machines can reach.
