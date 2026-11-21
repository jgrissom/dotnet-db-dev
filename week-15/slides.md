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


# Week 15 — The Running Order

**Team git: two people, one file**

- when git puts two changes together by itself, and when it stops
- finishing a conflict by hand
- the whole room sends pull requests to one file
- **your lab:** the same cases, in a practice repo of your own

.NET Database Development · Week 15 of 16

---

<!-- _footer: '🖥️ Demo §3 · lines next to each other' -->

## Which changes git can put together

Two people change one file. Git compares each change with the version they both started from, **line by line**.

| The two changes | What git does |
|---|---|
| **An unchanged line between them** | puts both in, by itself |
| **On lines next to each other** | stops: a conflict |
| **On the same line** | stops: a conflict |

**Different lines is not enough.** There has to be an unchanged line between them.

---

<!-- _footer: '🖥️ Demo §3 · lines next to each other' -->

## Finishing a conflict by hand

```text
<<<<<<< HEAD
the lines on the branch you're on
=======
the lines on the branch coming in
>>>>>>> branch-coming-in
```

- **Delete the three marker lines.** Keep the lines you want, in the order you want
- Then `git add` the file, and `git commit`
- ⚠️ **Keep both** brings back what each side replaced

---

<!-- _footer: '🖥️ Demo §4 · GitHub against your laptop' -->

## When GitHub has a commit you don't

```text
 ! [rejected]        main -> main (fetch first)
```

1. Nothing is lost. GitHub has a commit you don't
2. `git pull --no-rebase` fetches it, and merges it
3. Finish any conflict by hand, `git add`, `git commit`
4. `git push` again

---

<!-- _footer: '🖥️ Demo §5 · the shared running order' -->

## The shared running order

**github.com/jgrissom/kdxr-tonight**

1. **Fork** it: a copy that belongs to you
2. On your fork, change **your slot's line**, and nothing else
3. **Commit changes…** → a new branch named for your slot, like `slot-07`
4. **Create pull request**, into `jgrissom/kdxr-tonight`

---

<!-- _footer: '🖥️ Demo §6 · practice for week 16' -->

## Practice for week 16

**Four parts:** it runs · you show it · one decision, and why · what's next

1. **Run it** start to finish, the way you'll show it
2. **Give it out loud** to the person next to you. They time it and ask one question. Swap
3. **Fix the one thing you noticed**, on a branch, and push it

---

<!-- _footer: '🖥️ Demo §7 · wrap' -->

## Tonight, in one picture

**One file, two people**

- an unchanged line between two changes: git merges both
- lines next to each other, or the same line: you finish it
- delete the three marker lines, and keep what you want
- a rejected push: `git pull --no-rebase`, then push again
