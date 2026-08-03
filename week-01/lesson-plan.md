# Week 1 — Lesson Plan

**Topic:** Toolchain check, what the project actually is, **where logic has to live so a test can reach it**, and work on GitHub
**Session length:** 3h 45m

> Setup night — but for this intake, setup is a *verification*, not an installation. Most of the room has the SDK, VS Code and the C# extension already. What's genuinely new tonight is **git**, **`dotnet test`**, and the one idea the rest of the course is built on: **code inside `Program.cs` can't be called by anything, so it can't be tested and it can't be graded.**
>
> One moment carries the evening: **§5's second break** — two whole numbers divided, a wrong answer, and *no error and no warning of any kind*. That's the sentence the whole course hangs off. They have lived under a compiler for a semester; nobody has ever shown them its limit.

## 🎯 The payoff moment

**`4300 / 800` prints `5`, and the terminal says nothing about it.** Not a crash, not a warning, not a squiggle — a clean build and a wrong answer. *"Twenty-two minutes of heat at forty below, and the compiler had no opinion at all."*

It only lands if the break is **unannounced** and the slide comes **after** the terminal. Slide 14 is cued after the reveal for exactly this reason.

> [!IMPORTANT]
> **This room has seen a build error before, so §5's *first* break is no longer a revelation and must not be played as one.** Assigning a `string` to an `int` is a 3-minute warm-up whose job is to get everyone reading an error properly — file, line, character, code — and to set up the contrast. **The weight is all on break 2.** Playing break 1 as the big moment is the single easiest way to lose the room tonight.

## Learning objectives

By the end of this session, students can:

1. Verify a working toolchain — `dotnet --version`, VS Code with the C# extension, git with an identity — and install whatever was missing.
2. Say what `dotnet new console` actually produced, and what `bin/` and `obj/` are for.
3. Explain why `4300 / 800` is `5`, state that **no error and no warning was issued**, and say what that implies about what a compiler can and cannot guarantee.
4. **Say which of their files a test can call, and why logic left in `Program.cs` can be neither tested nor graded.**
5. Move logic out of `Program.cs` into a `public static` class and call back into it.
6. Run `dotnet test` against a checks project and read a failure message as instructions rather than as a verdict.
7. `git init`, stage, commit with a message that means something, and push to a private GitHub repo with a collaborator added.

> [!NOTE]
> **Objectives 4, 6 and 7 are the week.** Everything else is verification or recap — real, but fast. If the night runs short, protect those three.

## Materials

- `slides.md` / `slides.html` — the deck (hosted at jgrissom.github.io/dotnet-db-dev)
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-01/demo/script.html))
- [`setup-guide.md`](setup-guide.md) — self-serve, on a spare screen. §2 is now mostly ✓-checks, with the full install path kept for whoever needs it
- ⚠️ **An empty scratch folder**, and any rehearsal `Haldane` folder deleted. The finished state lives in the private repo as `week-01/demo-starter/Haldane` — **rehearse against it, don't open it in class**
- Your finished lab answer key with `dotnet test Lab.Checks` printing **5/5**, ready for the lab launch
- The school SQL Server handout is **not** needed until week 10 — don't hand it out tonight

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 10 min | **Welcome** *(slides 2–4, demo §1)*. The one idea — memory → file → database — and the week-3 promise made out loud and specific: *"you'll type in three records, quit, restart, and they'll be gone."* Then the frame that runs all term: *"you already write C#. I'm not teaching you C# — I'm teaching you what your last course didn't have room for."* |
| 0:10 | 30 min | **Toolchain check** *(slide 5, demo §2)*. Five ✓ commands, each printing something. Most of the room is done in ten minutes; **circulate and install for whoever isn't.** ⚠️ **The item that gets skipped is the last one — cloning the course repo** — and tonight's lab begins by copying out of it. |
| 0:40 | 10 min | **☕ Break** *(anyone still installing keeps going)* |
| 0:50 | 15 min | **What the project actually is** *(slides 6–8, demo §3)*. `dotnet new console` in an empty folder, the file tour, first `dotnet run`. Fast — they've run one. The new part is **the `.csproj` and the folder-not-a-file model**. Set the Haldane fiction here — 15 seconds, once. ⚠️ **Plant `bin/` and `obj/` and do not explain them**; week 2 opens on them. |
| 1:05 | 15 min | **The status board** *(slides 9–11, demo §4)*. Recap at pace — four declarations and `$"..."`, no more. The one line worth saying slowly: **a declared type is a promise the compiler will hold you to.** |
| 1:20 | 10 min | **☕ Break** |
| 1:30 | 25 min | **What the compiler cannot catch** *(slides 12–14, demo §5)*. **Load-bearing — this is the week.** Break 1 is a fast warm-up on *reading* an error (3–4 min). Then break 2: `4300 / 800` prints **5**, with nothing in the terminal to explain it. Predict, sit in the silence, ask "why?", fix live — one word, `int` → `double`. |
| 1:55 | 25 min | **The part that has to be right** *(slides 15–17, demo §6)*. Methods and the class shape are recap — move. ⚠️ **Spend the segment on the split:** `Program.cs` is what a human sees, the class is what has to be right, and **only the second one can be called by a test.** This is the sleeper concept and the one thing tonight they have genuinely never been told. |
| 2:20 | 25 min | **Onto GitHub** *(slides 18–19, demo §7)*. `init` / `add` / `commit` / `push`, the private repo made live on screen, collaborator added. **Assume zero prior git** and give it the full time. ⚠️ **Don't fix what `git add .` swept up.** |
| 2:45 | 5 min | **Lab launch** *(slide 20, demo §8)*. ~60 seconds of *what done looks like*: the key running locally, `dotnet test` printing **5/5**. Then setup, the folder split, and the target. |
| 2:50 | 50 min | **Lab: KDXR signs on** *(slide 20 stays up)*. **In-class target: all 5 green.** The C# is well within them; the lab is really about the `dotnet test` loop and the folder split. |
| 3:40 | 5 min | **Wrap-up** *(slide 21, demo §9)*. The compiler's limit · the two-file split · your work is on GitHub. Homework: their own station. Week 2 tease: the forty files. |

## Instructor notes

- ⚠️ **The room's failure mode tonight is boredom, not confusion.** Every familiar beat has to move. If you find yourself explaining what a `string` is, you have already lost eight minutes you needed for git. **Recap at pace, then go one level deeper** — that second half is what they're paying for.
- 🎯 **Say the frame in §1 and mean it:** *"you already write C#. This course is the part your last one didn't have room for — code a machine can test, git, collections, and a database."* It buys you permission to move fast through the recap, and it stops the strong students from deciding in the first twenty minutes that this is a repeat.
- 🎯 **§5's two breaks are the evening, and the weighting has changed.** Break 1 (string → int) is a **warm-up**: run it, read the error apart — file, line, character, code — and move on inside four minutes. **Break 2 is the payoff.** Give it the remaining twenty.
- ⚠️ **Break 2 is silent, which is the point — don't rescue it too fast.** `5 hours remaining` looks fine. Let somebody notice it's wrong rather than announcing it. If nobody does within twenty seconds, ask *"is that right?"* rather than *"that's wrong."*
- **Ask "why?" before explaining the integer division.** Someone in the room usually gets there, and it lands ten times harder from them than from you. Some will have been bitten by it before — **let that person explain it.**
- 🎯 **§6's split is the one genuinely new idea tonight, and it will look like tidiness.** It isn't. It's why the checks can grade them at all, why week 7 is possible, and why their semester project survives contact with a database. Ask the room where they put their methods last semester; the honest answer is usually "in `Main`." **That's the gap, and naming it out loud is the lesson.**
- **Bounding the magic in §6 has changed shape.** They've written classes, so don't say *"you're not expected to understand `class`"* — that's now condescending and false. Say the true version: *"you've all written one of these. What nobody told you is why `public` and `private` exist — that's week 4 — and what `static` is actually doing, which is week 5."* **The promise is in the ledger; weeks 4 and 5 have to collect it by going deeper, not by re-teaching.**
- ⚠️ **Setup is no longer the segment that eats the night — but don't cancel it.** Somebody will be on a fresh laptop or a locked-down machine. The guide is self-serve so you can circulate. If the room is verified by 0:25, take the break early and give the extra minutes to §7.
- ⚠️ **Do not clean up `bin/` and `obj/` tonight, even if a student objects** — and someone might, having been told about `.gitignore` before. Give them the credit out loud and hold the line: week 2's opening beat is `git status` on their own mess.
- **Git gets 25 minutes and needs them.** An intro programming course rarely teaches it, and it's graded every single week from here. This is the segment where going slowly is correct.
- **No debugger tonight.** It gets a real slot in **week 5**, where stepping *into* a constructor pays for itself. Some of the room has set a breakpoint before; week 5 is pitched at what an intro course never reaches. **Don't mention it tonight.**
- **The reading is deliberately not a reading.** It's "go look at what you pushed and count the folders you didn't write." Week 2 opens by collecting that number, so it has to be assigned properly, not mumbled at 3:44.
- **First-night pastoral note:** somebody will not get an install working. Say early and plainly that this happens every term, that it's not a signal about them, and that it gets fixed.

## What could go wrong

| If | Then |
|---|---|
| Someone says *"we did all this last semester"* | Agree, out loud and without defensiveness — *"you did, and we're not doing it again. Stay for the division one, and for the last twenty minutes."* Then make sure §5 and §6 earn it. |
| The room is verified and bored by 0:25 | Take the break early, start §3 at 0:35, and **bank the time in §7 and the lab.** Don't pad the recap. |
| `dotnet --version` says "command not found" | The terminal was open during install. Close it **completely** and reopen. Nine in ten. |
| Someone has .NET 8 or 9 from their last course | Install 10 alongside; they coexist. If `dotnet --version` still reports the old one, restart the machine. |
| A machine is locked down and won't install | Pair them with a neighbour for tonight; everything in §3–§6 is watchable. Sort the machine before week 2. |
| The C# extension won't download on class wifi | They can still do the whole lab from the terminal. `dotnet` is the tool; the extension is comfort. |
| Nobody notices the `5` in break 2 | Ask *"is that right?"* — never *"that's wrong."* If it's still silent, put the real number up: *"4300 over 800. What is that actually?"* |
| The lab is finished by 3:15 | Point at the *Done early?* list — it's real work, not busywork, and the "break something deliberately" item is the one worth doing. |
| Someone's `git push` asks for a password | GitHub stopped accepting passwords. `gh auth login`, or a personal access token. Have the GitHub CLI link ready. |
