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


# Week 8 — The Log Stops Being Gone

.NET Database Development · Week 8 of 16

---

<!-- _footer: '🖥️ Demo §3 · a file of our own' -->

## Where the file actually goes

A plain name is worked out from **where you
were standing**, not from where the code is.

| typed at the top of your repo | runs in |
|---|---|
| `dotnet run --project week-08/Haldane` | the top |
| `dotnet test week-08/Haldane.Tests` | `bin/Debug/net10.0` |

Same name. **Two different files.**

So the path is **handed in**, always.

---

<!-- _footer: '🖥️ Demo §3 · a file of our own' -->

## One list, one type

The log holds **three kinds** of things,
so it is written by hand.

A rotation is **one list of one type** —
and for that, a serializer does the job:

```csharp
string json = JsonSerializer.Serialize(_songs);
List<Song>? back =
    JsonSerializer.Deserialize<List<Song>>(json);
```

You use this one in the lab.

---

<!-- _footer: '🖥️ Demo §6 · the station’s own clock' -->

## What a serializer won't read back

It **writes** every property it can **read**.
It **reads back** only the ones it can **write**.

```csharp
public int PlaysTonight { get; private set; }
```

Goes into the file. **Never comes back.**

```csharp
[JsonInclude]
public int PlaysTonight { get; private set; }
```

---

<!-- _footer: '🖥️ Demo §8 · wrap' -->

## Tonight, in one picture

**text → fields → objects → and back**

- `File` does each direction in one line
- the **path is handed in**
- no file is a **first run**
- a serializer, when it is **one list of one type**
- a save file is a text file **anybody can edit**

Week 10: somewhere that isn't your laptop.
