# Week 2 — Lesson Plan

**Topic:** The mistakes the compiler *can't* catch — input that lies, `null`, and reading a warning you'd have ignored. Git: what the four lines *can't* do (the slip, and the eviction drill), the Source Control panel's promised slot, and a README.
**Session length:** 3h 45m

> Two halves, and the order is a kept promise: week 1 ended with *"next week: what those four lines can't do."* So the night opens on git — the slip manufactured live, the eviction drill taught while it's cheap — and then turns to the compiler's limit, part two: last week it was silent about a wrong answer; this week it *warns* and gets ignored, and then something no compiler could ever catch takes the console down. **Input happens after compiling is over.**

## 🎯 The payoff moment — the demo's

**A program that ran perfectly all week goes down over a unit of measurement.** The watch officer types `-41.5 C` — the way a human writes a log entry — and the console dies mid-handover with a `FormatException` the compiler never had a chance to see: the input didn't exist until compiling was long over. *"Compiled clean. Ran fine every rehearsal. Dead at 3 AM over two characters."*

It only lands if the break is **unannounced** (say the reading aloud as you type it) and slide 12 comes **after** the crash. The `??` warning beat earlier is the setup: the compiler warned about the one thing it *could* see, and said nothing about this — because it couldn't.

## 🎯 The payoff moment — the lab's

**The same sentence that crashed the desk twenty minutes ago now gets a civil answer — typed by the same student.** Task 1 has them crash `WhereIsRay` with their own words (*"somewhere past the truck stop"*); Task 4 has them rebuild it on `TryParse` and **re-run the exact crash**. The lab README stages the re-run explicitly, and the handoff demo models it (the answer key fed garbage, staying up).

It's the week's sentence made physical: the compiler never saw the crash coming and never could — *their program* is what stands between a typing human and dead air. **Circulate for the Task 1 crash** — the moment someone's own typing kills the desk is worth being nearby for, and the Task 4 re-run is theirs to feel, not yours to announce.

## Learning objectives

By the end of this session, students can:

1. Say what `bin/` and `obj/` contain, and why a repo holds only what a human wrote.
2. Write a root `.gitignore` — and explain precisely why it doesn't untrack already-committed files. Given a bad commit, ask **"have I pushed it?"** and pick the right repair: `git reset HEAD~1` if not, `git rm -r --cached .` if so (and say what `--cached` spares) — plus why a *pushed secret* must be changed either way.
3. Read the Source Control panel as the four git verbs they already know, and commit from it.
4. Read a compiler **warning** as the edge of the compiler's promise — different from an error, and not decoration.
5. Handle `null` and blank input with `??`, `IsNullOrWhiteSpace` and `Trim`, in a method that never crashes.
6. Say why `Parse` throws on bad input and `TryParse` doesn't, and write the `TryParse(...) && range` idiom.
7. Explain why "ask once, answer gracefully" beats a re-asking loop for any program a grader (or test) has to run.

> [!NOTE]
> **Objectives 2, 4 and 6 are the week.** The panel and the README are quick payoffs on week 1's setup; protect the eviction drill and both halves of §4 if the night runs short.

## Materials

- `slides.md` / `slides.html` — the deck (hosted at jgrissom.github.io/dotnet-db-dev)
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-02/demo/script.html))
- ⚠️ **The instructor demo repo from week 1, CLEAN** — four-line `.gitignore` at its root, zero tracked machinery. §0 of the cue sheet has the verification command and a rebuild block. §1 manufactures its own mess, live, one file
- A mental list of who struggled in week 1 — the **loose-ends slot** exists for them

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 22 min | **The four lines, revisited** *(slides 2–5, demo §1)*. Thirty-second recap of what the `.gitignore` has been doing, the lab-PC drill, then **`secrets.txt` committed live, on purpose — twice.** Case 1, unpushed: `git reset HEAD~1`, and it never happened. Case 2, pushed: adding it to the `.gitignore` changes nothing (*ignored is not untracked*), the eviction drill clears the repo, **and the password is still readable in the commit history on GitHub** — so the only real fix is to change it. The one git skill everyone eventually needs, taught while it's cheap. |
| 0:22 | 13 min | **Loose ends** *(no slides)*. Circulate: failed week-1 pushes, missing collaborator invites, broken toolchains, anyone who couldn't finish the homework. The room that leaves this slot healthy stays healthy all term. Early finishers: re-run their week-1 shift or read this week's lab intro. |
| 0:35 | 15 min | **The panel, and a README** *(slides 6–7, demo §2)*. The promised Source Control slot: every region mapped to a verb they know. README typed and committed **with the buttons**. |
| 0:50 | 10 min | **☕ Break** |
| 1:00 | 30 min | **The console takes a reading** *(slides 8–11, demo §3)*. `week-02/Haldane` created by command, `Conditions.cs` carried forward in one `cp` (the homework's move, modeled). `ReadLine`, **the squiggle read properly and ignored knowingly**, `?? ""`, `double.Parse`, happy-path run. |
| 1:30 | 35 min | **Input that lies** *(slides 12–14, demo §4)*. 💥 The unannounced break: `-41.5 C` → `FormatException` 🎯. Read the crash's anatomy. Why the compiler warned about `null` but *couldn't* warn about this. `TryParse`, both paths run, the console stays up. The save-point and closing commits. The week's sentence. |
| 2:05 | 10 min | **☕ Break** |
| 2:15 | 5 min | **Lab launch** *(slide 15, demo §5)*. The frame — *"one method ships already written and already wrong — crash it"* — and "done" defined on **their** machines: after check 4, re-feed the sentence that crashed it and watch the desk survive. |
| 2:20 | 75 min | **Lab: the caller line** *(slide 15 stays up)*. **In-class target: all five green, then fail to crash your own desk.** Circulate for Task 1's crash and Task 4's re-run. The generous clock is deliberate — this is the room's first real building session, and the *Done early?* list is real work. |
| 3:35 | 10 min | **Wrap-up** *(slide 16, demo §6)*. Repo holds what you wrote · warnings mark the promise's edge · Parse believes, TryParse asks. Homework: the switchboard + README, graded. Week 3 tease: the list, and losing it at midnight. |

## Instructor notes

- ⚠️ **The slip has to be framed as inevitable, not hypothetical.** *"One day you'll do this by accident"* is the sentence that makes §1 land — a tired `git add .` at the end of a session is all it takes, and everyone has done one. The room watched the four lines work last week; tonight they learn the lines have an edge, which is this course's favorite shape of lesson (week 1: the compiler's edge; tonight: the gitignore's).
- ⚠️ **Ignored-is-not-untracked is still the hill to die on.** The sequence is: slip in → *ask them for the fix* and let somebody say "add it to the gitignore" → do exactly that → show `git ls-files` still finding it → *then* evict. If you evict before letting the powerlessness register, the lesson evaporates.
- ⚠️ **The two cases are one question, not two demos.** *"Have you pushed it?"* is the thing to repeat; the commands are its two answers. If it lands as "here are two more git commands," the segment has cost seven minutes for nothing.
- ⚠️ **Do not let case 2 end on the eviction.** The last beat is the commit history on GitHub with the password still in it, and the sentence *"a pushed secret is burned — you change it."* That is the beat the whole redesign exists for, and it is the one a running-late instinct will cut.
- 💡 **Adding `secrets.txt` is a fifth line in a file week 1 promised you'd never reopen.** Say why out loud — the four lines are the *machinery* rule and still settled; a secret is a different category. Unaddressed, it reads as the promise breaking.
- 🎯 **The loose-ends slot is load-bearing, not slack.** Week 1 always leaves two or three students quietly broken — a rejected push, a missing invite, a machine that fought the install. Twenty minutes in week 2 is the cheapest possible repair window; the same problems discovered on grading night cost points and confidence. Say what the slot is for out loud so nobody feels singled out.
- ⚠️ **Do not oversell the panel.** It gets fifteen minutes and it's a *translation*, not a tour — every button named as its verb, one README committed with it, done. The CLI stays the taught path; the graders read repos, not editors.
- 🎯 **The warning beat lives or dies on the pause.** Hover the squiggle, read `CS8600` aloud, ask who read their warnings last semester — and then **build and run anyway.** Ignoring it *knowingly* is the setup; the crash in §4 is what the ignoring costs. If you fix the warning the moment it appears, §4 loses its teeth.
- ⚠️ **§4's break is unannounced, as always.** Type `-41.5 C` while saying the reading out loud like a log entry — the room should realize what's about to happen about half a second before it does. If nobody reacts to the crash, read the exception type aloud and ask *"is that a compile error?"* — the distinction is the segment.
- 🎯 **Take the loop-until-valid question seriously when it comes** (it will, and it's a good instinct): the grader answers with silence, a loop that insists spins forever, ask once and answer gracefully. It's testable-shape thinking applied to input — and promise week 13 honestly for the full retry/exception story.
- ⚠️ **The handoff shows no answer key — deliberately** *(decided at rehearsal, 2026-08-04: it was the one beat that needed a third folder, for ninety seconds of value the lab now delivers itself)*. The reframe from "make checks pass" to "make the desk unkillable" is carried by the target line instead: **done is their own program surviving the sentence that crashed it.** Say it like you mean it; it's the lab's payoff being scheduled.
- **The two exact strings in the lab** (`"some night owl"`, `"dealer's choice"`) are checked exactly, and the lab says so. A student burned by capitalization is having a normal week 2; point at the Rules block.
- **No color, no Spectre, nothing pretty.** Week 3 earns the library; two weeks of hand-aligned console output is the ache that pays for it. If the output looks sad tonight, good.

## What could go wrong

| If | Then |
|---|---|
| The demo repo isn't in its clean week-1 end state | §0's rebuild block, two minutes — it builds the state with the `.gitignore` in place, as week 1's demo now leaves it. |
| A student announces their repo *does* have junk in it (skipped the gitignore, or committed before writing it) | A gift — that's a real slip, live. Offer the eviction drill on their machine during loose ends, out loud if they're game: §1 just taught exactly this repair. |
| `git rm -r --cached .` output floods the terminal | Fine — say *"every line is a file leaving"* and scroll to the end. |
| Someone's panel is empty during §2 | They have a *week folder* open instead of the top. File → Open Folder → `dotnet-db-coursework`, panel comes alive. It's in the notes' appendix; fix one machine on screen and the room self-serves. |
| The loose-ends slot finds nothing broken | Wonderful — release it into the lab (start the launch early) rather than filling it. Its job is insurance, not content. |
| Someone asks why not commit `bin/` "so it always runs" | A real question — answer it straight: the clone can't run your build output anyway (different machine, different paths), but it can always rebuild from source. Repos ship recipes, not casseroles. |
| The `-41.5 C` break doesn't crash because you typed `-41.5` | You dodged your own break — laugh, say *"that's the point, it works when you're careful,"* and type it again with the unit. |
| Someone asks about `try`/`catch` | *"Exactly the right instinct, and it's week 13's whole subject. Tonight's tool is better here anyway: TryParse never throws, so there's nothing to catch."* |
| The lab finishes early | The *Done early?* list is real work — the ⭐ item (resurrect the warning on the day shift's line) closes the night's loop and takes five minutes. |
| A student's `IsWinner` loops asking for input | That's the loop-until-valid instinct landing in homework — point at the notes' *Ask once, answer gracefully* and say why the grader can't run it. |
