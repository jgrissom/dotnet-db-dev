# Week 1 — Lesson Plan

**Topic:** Toolchain, first contact with C#, the compiler as a new character, and work on GitHub
**Session length:** 3h 45m

> Setup night, which is the least interesting evening of the term and the one that makes the other fifteen possible. Two moments carry it: **§5's refusal** (a string assigned to an `int`, and the program does not run *at all* — the payoff), and **§5's second break** (two whole numbers divided, a wrong answer, and *no error and no warning of any kind*). Those two together are the sentence the whole course hangs off: the compiler catches what it can, and it cannot catch everything. That gap is why week 7 exists.

## 🎯 The payoff moment

**`dotnet run` prints an error instead of the program.** Not a crash after four lines of output — nothing. *"Python would have given you the banner, the station name, the temperature, and then fallen over. C# read the whole file first and refused."*

It only lands if the break is **unannounced** and the slide comes **after** the terminal. Slide 12 is cued after the reveal for exactly this reason.

## Learning objectives

By the end of this session, students can:

1. Verify a working toolchain: `dotnet --version`, VS Code with the C# extension, git with an identity.
2. Create and run a console project with `dotnet new console` and `dotnet run`, and say why C# runs a *project* rather than a file.
3. Declare `int`, `double`, `string` and `bool` variables, and say what a declared type promises.
4. Put values into text with `$"..."`, and map it to Python's f-string.
5. Read a C# compiler error: file, line, code, message — and say what "the build failed" means about what ran.
6. Explain why `4300 / 800` is `5` in C# and `5.375` in Python, and fix it.
7. Write a `public static` method with parameters and a return type, and call it from `Program.cs`.
8. Say which of their files a test can call, and why that shapes where code goes.
9. `git init`, commit, and push to a private GitHub repo with a collaborator added.

## Materials

- `slides.md` / `slides.html` — the deck (hosted at jgrissom.github.io/dotnet-db-dev)
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-01/demo/script.html))
- [`setup-guide.md`](setup-guide.md) — printed or on a spare screen; §2 is fourteen people at fourteen different stages
- ⚠️ **An empty scratch folder**, and any rehearsal `Haldane` folder deleted. The finished state lives in the private repo as `week-01/demo-starter/Haldane` — **rehearse against it, don't open it in class**
- Your finished lab answer key with `dotnet test KDXR.Checks` printing **5/5**, ready for the lab launch
- The school SQL Server handout is **not** needed until week 10 — don't hand it out tonight

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 10 min | **Welcome** *(slides 2–4, demo §1)*. The one idea — memory → file → database — and the week-3 promise made out loud and specific: *"you'll type in three records, quit, restart, and they'll be gone."* Then the frame that runs all term: *"I will never teach you what a loop is."* |
| 0:10 | 50 min | **Setup** *(slide 5, demo §2)*. Five installs, each ending in a ✓ that prints something. **Circulate; demo nothing** — the room is at fourteen different stages and a demo strands whoever's behind. Name the two collisions early: VS Code ≠ Visual Studio, C# ≠ C# Dev Kit. |
| 1:00 | 10 min | **☕ Break** *(setup stragglers keep going)* |
| 1:10 | 20 min | **A folder becomes a program** *(slides 6–8, demo §3)*. `dotnet new console` in an empty folder, the file tour, first `dotnet run`. Set the Haldane fiction here — 15 seconds, once. ⚠️ **Plant `bin/` and `obj/` and do not explain them**; week 2 opens on them. |
| 1:30 | 20 min | **The status board** *(slides 9–11, demo §4)*. Four variables, four types, `$"..."`. The declared type as *a promise the compiler will hold you to*. |
| 1:50 | 10 min | **☕ Break** |
| 2:00 | 25 min | **The compiler refuses** *(slides 12–14, demo §5)*. **Load-bearing — this is the week.** Break 1 unannounced, predict-then-run, sit in the silence, *then* slide 12. Read the error apart. Then break 2: `4300 / 800` prints **5**, with nothing in the terminal to explain it. Fix live — one word, `int` → `double`. |
| 2:25 | 20 min | **The part that has to be right** *(slides 15–17, demo §6)*. A method as a `def` with types; a class as the box it lives in. ⚠️ **Bound the magic out loud** — `class` is week 4, `static` is week 5, and say so. Land the split: `Program.cs` is what a human sees, the class is what has to be right, and only the second one can be called by a test. |
| 2:45 | 10 min | **Onto GitHub** *(slides 18–19, demo §7)*. `init` / `add` / `commit` / `push`, the private repo made live on screen, collaborator added. ⚠️ **Don't fix what `git add .` swept up.** |
| 2:55 | 5 min | **Lab launch** *(slide 20, demo §8)*. ~60 seconds of *what done looks like*: the key on localhost, `dotnet test` printing **5/5**. Then setup, the folder split, and the target. |
| 3:00 | 40 min | **Lab: KDXR signs on** *(slide 20 stays up)*. **In-class target: checks 1–4.** Check 5 rolls into the homework without apology. |
| 3:40 | 5 min | **Wrap-up** *(slide 21, demo §9)*. Types · a compiler that reads it all first · and it still can't catch everything. Homework: their own station. Week 2 tease: the forty files. |

## Instructor notes

- **Students watch the demo; they don't type along.** Say it at the start. The temptation is highest tonight precisely *because* the material is easy — and fourteen people mid-`dotnet new` during a break is a support queue, not a lesson.
- ⚠️ **Setup is the segment that eats the night, and 50 minutes is optimistic.** The contingency, in order: let stragglers continue through the first break; if you're still bleeding at 1:15, **compress §4 (the status board) to the four declarations and the `$`** — slides 9–11 carry the rest and the notes cover it. **Do not compress §5.** It's the week.
- 🎯 **The two breaks in §5 are the whole evening, and their order matters.** Break 1 shows the compiler being a friend. Break 2 shows its limit. Run them in that order, and say the sentence at the end of the second one: *"it catches what it can, and it cannot catch everything."* Everything from week 7's testing slot to the course's whole checks-based grading design is a receipt for that sentence.
- ⚠️ **Break 2 is silent, which is the point — don't rescue it too fast.** `5 hours remaining` looks fine. Let somebody notice it's wrong rather than announcing it. If nobody does within twenty seconds, ask *"is that right?"* rather than *"that's wrong."*
- **Ask "why?" before explaining the integer division.** Someone in the room usually gets there, and it lands ten times harder from them than from you.
- 🎯 **Bounding the magic in §6 is not a throwaway.** These students have never seen a compiler; `public static class` is four unexplained words in a row. Saying *"class is week 4, static is week 5, I'm not pretending I explained them"* buys enormous goodwill and stops the confident ones from inventing a wrong model to fill the gap. **The promise is in the ledger — weeks 4 and 5 have to actually collect it.**
- **The `Program.cs` vs class split is the sleeper concept of the night.** It looks like tidiness. It's actually the thing that makes the checks possible, makes week 7 possible, and makes every homework gradeable. Spend the full thirty seconds on slide 17.
- ⚠️ **Do not clean up `bin/` and `obj/` tonight, even if a student objects.** Give them the credit out loud and hold the line — week 2's opening beat is `git status` on their own mess. A rule you hand down is worth a fraction of a mess they made.
- **No debugger tonight.** It gets a real slot in **week 5**, where stepping into a constructor pays for itself. A breakpoint-and-F5 tour tonight would claim more than it delivers, and the web course learned that the expensive way — an oversold week-1 breakpoint that left the instructor remembering a class that had never really seen a debugger. **Don't mention it.**
- **The reading is deliberately not a reading.** It's "go look at what you pushed and count the folders you didn't write." Week 2 opens by collecting that number, so it has to be assigned properly, not mumbled at 3:44.
- **First-night pastoral note:** somebody will not get an install working. Say early and plainly that this happens every term, that it's not a signal about them, and that it gets fixed — not doing so costs you a student in week 2.

## What could go wrong

| If | Then |
|---|---|
| `dotnet --version` says "command not found" | The terminal was open during install. Close it **completely** and reopen. Nine in ten. |
| A machine is locked down and won't install | Pair them with a neighbour for tonight; everything in §3–§6 is watchable. Sort the machine before week 2. |
| The C# extension won't download on class wifi | They can still do the whole lab from the terminal. `dotnet` is the tool; the extension is comfort. |
| Setup runs to 65+ minutes | Compress §4 as above. Protect §5 and the lab. |
| `dotnet new console` is slow first time | It's populating the NuGet cache. Your rehearsal already warmed yours — mention that theirs is a one-time cost. |
| Someone's `git push` asks for a password | GitHub stopped accepting passwords. `gh auth login`, or a personal access token. Have the GitHub CLI link ready. |
| The room is way ahead | §7's *Done early?* list in the lab README is real work, not busywork. Point at the "break something deliberately" item. |
