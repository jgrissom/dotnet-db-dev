# Week 5 — Lesson Plan

**Topic:** `static` vs. instance — what that word was actually doing — composition, reference vs. value, `null` and nullable reference types, and the debugger's earned slot.
**Session length:** 3h 45m

> The night is one question with three answers. Every variable is a **name**; on the other end of it is an object nothing else is holding, the *same* object something else is holding too, or **nothing at all**. Students have written all three since their first C# course and have never once been made to look at the difference — and tonight each one costs a wrong number on the duty board.

## 🎯 The payoff moment — the demo's

**Stepping into a constructor and watching an object get built, one field at a time.** In §4 a breakpoint on `Name = name;` stops *before* the line runs, and `this` in the Variables pane is a crew member with no name:

```
this.Name        null
this.TripsToday  0
```

`new` made the box; the constructor fills it. One <kbd>F10</kbd> and `Name` becomes `"Okonkwo"`. Continue, and it stops on the same line again with `Name` back to `null` — **not the same object reset, a different object with its own fields.**

Then the breakpoint moves to `TripsToday++` and stops once for each of the three already outside, with `this` a different crew member each time.

⚠️ **That last part is the whole point and it is why the debugger belongs in this week rather than any other:** twenty minutes earlier the room watched `static` make three people share one number. Now they can *see* which number a line moves, and why.

## 🎯 The payoff moment — the lab's

**Three names finally have three numbers.** The switchboard ships saying Dorothy, Bex and Teodoro have each called **6** times — six calls between three people, all showing on every row. Task 2 deletes one word, and:

```
│ Dorothy │ 4 │
│ Bex     │ 1 │
│ Teodoro │ 1 │
```

Same seed data, same six calls, one `static` removed. **Nothing else in the lab produces a change that big for a change that small**, and it is the demo's break happening in their own hands.

⚠️ **Circulate at Task 1 and make sure they actually press `c` before they start typing.** A student who goes straight to Task 2 fixes a bug they never saw, and Task 2 becomes a copy-out instead of a repair.

## Learning objectives

By the end of this session, students can:

1. Say what `static` means — one copy belonging to the class, not one per object — and name the cost of putting it on a fact about one thing.
2. Read `CS0120` as *"which one did you mean?"* rather than as a request for `static`.
3. Name a case where `static` is correct, and give the test that decides it.
4. Build a class that holds another class, and reach through it.
5. Say why two variables can be two names for one object, and what that means when a "copy" is handed around.
6. Write a method that returns `T?`, and say what the question mark tells the compiler.
7. Check a possibly-null value before using it, and say what `??` and `?.` each decide.
8. Set a breakpoint, step, and read an object's fields in the Variables pane — including which object `this` is.

> [!NOTE]
> **Objectives 1 and 5 are the week.** 6 and 7 are the promise from weeks 1 and 2 coming due. If the night runs short, protect §2's break, §4, and §6's break — **§5 compresses to its slide** and the notes cover it in full.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-05/demo/script.html))
- **The instructor demo repo**, where week 4 left it — `week-01/` … `week-04/` in it, clean, and `main` up to date after last week's merge
- ⚠️ **Week 4's project has to RUN**, not just exist — §1 opens by running it as the refresher. One `dotnet run --project week-04/Haldane` before class warms the restore
- ⚠️ **Delete `week-05/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite
- ⚠️ **A debugger you have watched stop, tonight, before the room arrives.** §0 has the drill; it is the only beat in the week that depends on the editor rather than the terminal

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 10 min | **Where we finished last week** *(demo §1)*. 🎯 **Open by RUNNING week 4** — press `a`, `Reyes`, Enter on an empty time, and she still says 14:45. Forty seconds, and it is a refresher rather than a re-teach. Then `week-05/Haldane` by command, **all three files carried forward** and two small edits — `AnsiConsole.Clear()` and the date. Run — the desk they know, one day on. |
| 0:10 | 24 min | 💥 **The tally that belongs to nobody** *(slides 2–3, demo §2)*. `CrewMember`, then `SignOut` holds a person instead of a name — which breaks the build everywhere a name ever went on that board, and four edits clear it. TRIPS column: 1, 1, 1 — correct. Then the day's total → **CS0120** → 🎯 **ask for hands** → `static` → **CS0176** → do what it says → **3, 3, 3, zero warnings**. Let it sit. |
| 0:34 | 10 min | **☕ Break** |
| 0:44 | 18 min | **What `static` actually says** *(slides 4–5, demo §3)*. One copy, belonging to the class. Take it off. The day's total is a fact about the *crew*, so a `foreach` earns it. 🎯 **The total was always 3** — it was the per-person numbers that lied. 💡 **The loop is deliberately tedious** — nine lines for three numbers, and week 9 collapses it. |
| 1:02 | 25 min | 🎯 **Step into it** *(slides 6–7, demo §4)*. Breakpoint in the constructor, <kbd>F5</kbd>, Variables, `this`. Six objects, six sets of fields — narrate the first three and <kbd>F5</kbd> through the rest. Then `GoesOut()` and which one moves. 💡 **Plus ~1 min on the `.vscode` VS Code writes** — and why their own project repo never shows the project list. |
| 1:27 | 15 min | **When `static` is right** *(slide 8, demo §5)*. `Conditions` since week 1; `Console.WriteLine` several hundred times and never a `new Console()`. The test, said out loud. **No code.** |
| 1:42 | 10 min | **☕ Break** |
| 1:52 | 25 min | 💥 **Two names, one object** *(slides 9–10, demo §6)*. The muster, on a copy, marks everybody in — and the real board reads `0 people outside.` with two people on the ice. Then what a copy actually copies, and the muster made read-only. |
| 2:17 | 20 min | **Nothing at all** *(slides 11–12, demo §7)*. 💥 **Opens on a silent failure** — signing out `Reyez` does nothing at all, and nobody is told. Then `Find` returns `CrewMember?`. Build → **CS8604**, one warning. Run with `Reyes` → fine. Run with `Reyez` → **NullReferenceException**. The `if`, and back to 0 warnings. 🎯 **Silence, then a crash, then a sentence.** |
| 2:37 | 5 min | **Lab launch** *(slide 13, demo §8)*. Done is defined on their machine: a switchboard that can tell three people apart. |
| 2:42 | 50 min | **Lab: the switchboard** *(slide 13 stays up)*. **In-class target: 5 green.** Circulate hard at Task 1 and Task 4. |
| 3:32 | 13 min | **Wrap-up** *(slide 14, demo §9)*. `static` · instance · a reference · `null`. Two URLs in Canvas. Week 6 tease: **one list, one loop, four different kinds of thing.** |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, §5 compresses to its slide and §4's Call Stack aside drops. **Do not take it from the lab**, and do not take it from §2 — the break is the week.

## Instructor notes

- 🎯 **§2's "ask for hands" is the beat, not the error.** *"Who has seen this error before?"* then *"and what did you do about it?"* — and **wait**. The word has to come from the room; a room that supplies its own bad habit spends the next twenty minutes interested in why it was bad. If nobody speaks, own it yourself: *"I have made this one go away about four hundred times, and every single time I did it the same way."*
- ⚠️ **Do not fix §2's break before the coffee.** The 3/3/3 board wants to sit there. The consequence is the line that matters: *"Okonkwo has been outside once today and the board says three — and if you are the one deciding whether he goes out again, that is the number you are reading."*
- 🎯 **§2's real teeth are that the compiler walked them into it.** Say the count out loud: **two compiler messages, both obeyed, zero errors, zero warnings.** This is week 1's thesis — *here is what the compiler cannot catch* — collected with interest.
- 🎯 **§3's payoff is the number that did NOT change.** The day's total says 3 before the fix and 3 after it. It was the only true thing on the screen the whole time. Point at it.
- ⚠️ **§4 is the one segment that needs the editor, so prove it works before class.** §0 has the drill. If breakpoints are grey and never stop, **`Developer: Reload Window`** is the fix — `.NET: Restart Language Server` is the plausible-looking command that does nothing.
- ⭐ ⚠️ **The debugger's rough edges are TAUGHT this week, not apologised for — and the reason is transfer.** Two things happen that do not happen in an ordinary project, and both get a sentence: **the project list** (this folder holds a whole semester — eight programs; theirs holds one) and **the `.vscode` folder VS Code writes itself** (`launch.json` + `tasks.json`, naming one project). **Say plainly that their own project repo never shows the list**, because there is exactly one program in it. ⚠️ **Without that sentence the room learns a workflow they cannot reuse** — which was the objection that put it here.
- ⚠️ **The window reload in §1 is explained, not performed silently** — VS Code learned the folder's contents when it opened, and this week arrived after. They hit the same thing in the lab the moment they copy their week in, so it is thirty seconds that pays for itself.
- 🎯 **Slow down at the second stop in §4.** *"Same line, same file — and `Name` is null again. This is not the same object with its fields reset. It is a different object."* That sentence is the objective; everything else in the segment is scaffolding for it.
- **§5 has no code and should not acquire any.** It is a re-reading of two files already on screen. The `Console.WriteLine` line does most of the work — several hundred calls this term and not one `new Console()`.
- ⚠️ **§6's muster must be believable before it is wrong.** *"They work off a copy, because a copy is scratch paper"* — that is a reasonable thing to do and last week taught them to do it. The failure has to land as a surprise, not as a set-up.
- 🎯 **Collect week 4 honestly in §6.** The copy was not a mistake and still isn't: it protects the list. Tonight is the other half of the sentence. A room that hears *"last week was wrong"* stops trusting the material.
- ⚠️ **§7 reads the warning from `dotnet build`, not from the editor.** The program clears the screen now, so a `dotnet run` scrolls its own build output away — and squiggles are unreliable in this course anyway. The terminal is the witness.
- **"Shouldn't it throw?" will be asked in §7** — same answer as last week, and say it in one sentence: *"sometimes, and choosing is a real design decision. Week 13."* Then move.
- ⚠️ **Do not teach `?.` as the fix in §7.** It is a decision, not a repair — *"nothing here is fine, carry on"* — and a missing person is not fine. The `if` is the answer; `?.` gets one sentence and a pointer to the notes.
- **The demo commits four times, silently.** The first is the one to notice: **immediately after the branch in §1, before a line of the week is changed** — because that is the *first thing the lab asks students to do* (*"commit that before you change anything"*), and until now no demo has ever modelled it. Then the trip count fixed (§3), the muster made read-only (§6), the null handled (§7). **One push, at the end of §7. The commits themselves are silent** — git is habit from week 3 on, not content.
- 🎯 ⚠️ **The BRANCH is the exception, and it gets spoken.** Name it as you type it — *"a branch for tonight's work; nothing goes straight to `main` any more, and that goes for your project too"* — and then **the one genuinely new fact: the commits counted on their homework are the ones on this week's branch.** That changed this week (week 4 counted the whole repo, because the repo was one week old), and getting it wrong costs them **4 of 20** — the commits *and* the merged pull request. ⚠️ **Fifteen seconds, and it is not a re-teach** — week 4 taught the round trip. If somebody asks how branches work, point at week 4's notes and move.
- **The lab's Task 1 is where the demo's break happens to them.** Circulate then, and again at Task 4, which is the only task with real branching in it.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-05/Haldane` refuses | You rehearsed and left `week-05/` behind. Delete it; §0 says so. |
| Breakpoints are hollow/grey and never stop | The language server is asleep. Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. ⚠️ `.NET: Restart Language Server` does **not** fix this and sends you down a dead end. |
| ⚠️ **This week's project is not in <kbd>F5</kbd>'s list at all** | **The commonest one, and it is not a fault.** The editor learned which projects exist when the window opened, and `week-05/Haldane` was created by `dotnet new` an hour later — so the list holds weeks 1–4 and not this one. **§1 now reloads the window immediately after creating the project**, which is why the beat works; if it was skipped, Command Palette → `Developer: Reload Window`. **Students hit the same thing** — they copy `week-05` in mid-session — so the lab's Setup reloads too. |
| <kbd>F5</kbd> asks which debugger, or which project | Normal with several projects in one folder — **`.NET 5+ and .NET Core`** (not `C#`), then the project. ⚠️ **The project list is genuinely hard to read and gets worse every week:** each entry is the name plus the **full path**, which runs off the end of the box, and there is a `Haldane` in every week by now. **Type `week-05` to filter it** — the path is part of the entry, so it narrows immediately. Don't narrate it; just don't fumble it. |
| ⚠️ Your F5 flow doesn't look like the students' | **You have C# Dev Kit installed and the course excludes it.** Dev Kit changes what the pickers offer. Demonstrate what you have, but **describe the choice rather than the exact wording**, and don't promise them a dialog you can't see. |
| The debugger simply will not co-operate in the room | §4 survives on the answer key and the notes: put `CrewMember.cs` on screen and talk through the two stops. **Say you'll pick it up next week rather than burning ten minutes** — weeks 10 and 11 assume it, so it cannot be silently skipped. |
| Somebody asks "so is `static` bad?" | The best question of the night, and §5 is the answer. *"`Console.WriteLine`. You've called it hundreds of times."* Don't pre-empt it if it comes early — say *"hold that, it's the segment after next"* and mean it. |
| Somebody says "just don't use the copy then" | Push back gently: the copy is what stopped anybody emptying the board last week and it still does. The rule is **don't change what you were handed**, not *don't take copies*. |
| Somebody asks whether `??` would fix §7 | It compiles and it is the wrong tool — `who ?? somebodyElse` would log the trip against the wrong person. Worth thirty seconds, because it is the sharpest way to say that `null` handling is a *decision*. |
| A student's `Find` gives up after the first record | The single most common bug in the shape, and it looks correct. `return null;` inside the loop instead of after it. It's in the lab's 🆘 table and in the notes. |
| The lab finishes early | The *Done early?* list is real, and item 4 (a `TotalCalls` on the switchboard) is the one that collapses to one line in week 9. |
| Somebody's checks pass but their board still shows one number | They left the `static` field and put an instance property in front of it. The check catches it behaviourally; the fix is deleting the field. |
