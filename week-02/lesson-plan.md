# Week 2 — Lesson Plan

**Topic:** The mistakes the compiler *can't* catch — input that lies, `null`, and reading a warning you'd have ignored. Git hygiene: `.gitignore`, commit messages, README — and the Source Control panel's promised slot.
**Session length:** 3h 45m

> Two halves, and the order is a kept promise: week 1 ended with *"next week starts by looking at what `git add .` swept up tonight."* So the night opens on the mess — counted, explained, and cleaned for good — and then turns to the compiler's limit, part two: last week it was silent about a wrong answer; this week it *warns* and gets ignored, and then something no compiler could ever catch takes the console down. **Input happens after compiling is over.**

## 🎯 The payoff moment — the demo's

**`git status` right after the first build: forty files you never wrote** — collected exactly as promised, with the room's own counted numbers from the reading, and then the Source Control panel scrolling the entire mess as staged deletions at the moment of `git rm -r --cached .` **That scroll is the beat**: the mess they made in week 1, leaving, forty entries long. The published course-map payoff is the `git status` moment; the panel scroll is how it lands hardest.

It only works because the mess is *theirs* — week 1 shipped no `.gitignore` on purpose, and the reading had them count their own junk. Don't apologize for the mess; it was the plan.

## 🎯 The payoff moment — the lab's

**The same sentence that crashed the desk twenty minutes ago now gets a civil answer — typed by the same student.** Task 1 has them crash `WhereIsRay` with their own words (*"somewhere past the truck stop"*); Task 4 has them rebuild it on `TryParse` and **re-run the exact crash**. The lab README stages the re-run explicitly, and the handoff demo models it (the answer key fed garbage, staying up).

It's the week's sentence made physical: the compiler never saw the crash coming and never could — *their program* is what stands between a typing human and dead air. **Circulate for the Task 1 crash** — the moment someone's own typing kills the desk is worth being nearby for, and the Task 4 re-run is theirs to feel, not yours to announce.

## Learning objectives

By the end of this session, students can:

1. Say what `bin/` and `obj/` contain, and why a repo holds only what a human wrote.
2. Write a root `.gitignore` — and explain precisely why it doesn't untrack already-committed files, and what `git rm -r --cached .` does about it (and what `--cached` spares).
3. Read the Source Control panel as the four git verbs they already know, and commit from it.
4. Read a compiler **warning** as the edge of the compiler's promise — different from an error, and not decoration.
5. Handle `null` and blank input with `??`, `IsNullOrWhiteSpace` and `Trim`, in a method that never crashes.
6. Say why `Parse` throws on bad input and `TryParse` doesn't, and write the `TryParse(...) && range` idiom.
7. Explain why "ask once, answer gracefully" beats a re-asking loop for any program a grader (or test) has to run.

> [!NOTE]
> **Objectives 2, 4 and 6 are the week.** The panel and the README are quick payoffs on week 1's setup; protect the cleanup beat and both halves of §5 if the night runs short.

## Materials

- `slides.md` / `slides.html` — the deck (hosted at jgrissom.github.io/dotnet-db-dev)
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-02/demo/script.html))
- ⚠️ **The scratch `dotnet-db-coursework` repo from week 1, mess intact** — §0 of the cue sheet has the verification command and a rebuild block. **Know your file count before class**; it's "the files you never wrote" all night
- The week-1 demo repo **on GitHub** still showing `bin/` and `obj/` — §1 tours it live

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 25 min | **The forty files** *(slides 2–3, demo §1)*. Open cold on the reading: *"who's got a number?"* GitHub tour of the junk, then `git ls-files` counts on your own repo. What `bin/` and `obj/` are. Ends with the 60-second lab-PC drill the setup guide promised. |
| 0:25 | 30 min | **The cleanup** *(slides 4–5, demo §2)*. `.gitignore` typed at the root — then **proved useless against what's already tracked**, which is the misconception to kill. `git rm -r --cached .`, the panel scrolling forty staged deletions 🎯, commit, push, GitHub clean. |
| 0:55 | 15 min | **The panel, and a README** *(slides 6–7, demo §3)*. The promised Source Control slot: every region mapped to a verb they know. README typed and committed **with the buttons**. |
| 1:10 | 10 min | **☕ Break** |
| 1:20 | 30 min | **The console takes a reading** *(slides 8–11, demo §4)*. New `week-02` folder, `Conditions.cs` carried forward in one `cp` (the homework's move, modeled). `ReadLine`, **the squiggle read properly and ignored knowingly**, `?? ""`, `double.Parse`, happy-path run. |
| 1:50 | 30 min | **Input that lies** *(slides 12–14, demo §5)*. 💥 The unannounced break: `-41.5 C` → `FormatException`. Read the crash's anatomy. Why the compiler warned about `null` but *couldn't* warn about this. `TryParse`, both paths run, the console stays up. The week's sentence. |
| 2:20 | 10 min | **☕ Break** |
| 2:30 | 5 min | **Lab launch** *(slide 15, demo §6)*. The frame — *"one method ships already written and already wrong — crash it"* — and "done" defined on **their** machines: after check 4, re-feed the sentence that crashed it and watch the desk survive. |
| 2:35 | 60 min | **Lab: the caller line** *(slide 15 stays up)*. **In-class target: all five green, then fail to crash your own desk.** Circulate for Task 1's crash and Task 4's re-run. |
| 3:35 | 10 min | **Wrap-up** *(slide 16, demo §7)*. Repo holds what you wrote · warnings mark the promise's edge · Parse believes, TryParse asks. Homework: the switchboard + the cleanup, both graded. Week 3 tease: the list, and losing it at midnight. |

## Instructor notes

- 🎯 **Open on their numbers, not yours.** The reading asked them to count; someone did. Two or three answers from the room make the whole first segment *theirs* — and a student who says "like two hundred?" is not wrong, counts vary by how they counted. Yours is the precise one because `git ls-files` did the counting.
- ⚠️ **The `.gitignore`-doesn't-untrack beat is the hill to die on in §2.** Half the room will meet this exact confusion in real life within a year. The sequence is: add the file → **show the count unchanged** → *then* evict. If you evict first, the lesson evaporates.
- 🎯 **Let the panel scroll do its own talking.** Forty staged deletions is the week's promised image. Scroll slowly, don't click anything, and resist narrating over it for the first few seconds.
- ⚠️ **Someone cleaned their repo already** — this room was told about `.gitignore` by a friend, or found it themselves. Same handling as week 1: credit out loud (*"good instinct, and now you know what the second command was for"*), and their homework hygiene points are already earned. The beat still works; the mess on screen is yours.
- ⚠️ **Do not oversell the panel.** It gets fifteen minutes and it's a *translation*, not a tour — every button named as its verb, one README committed with it, done. The CLI stays the taught path; the graders read repos, not editors.
- 🎯 **The warning beat lives or dies on the pause.** Hover the squiggle, read `CS8600` aloud, ask who read their warnings last semester — and then **build and run anyway.** Ignoring it *knowingly* is the setup; the crash in §5 is what the ignoring costs. If you fix the warning the moment it appears, §5 loses its teeth.
- ⚠️ **§5's break is unannounced, as always.** Type `-41.5 C` while saying the reading out loud like a log entry — the room should realize what's about to happen about half a second before it does. If nobody reacts to the crash, read the exception type aloud and ask *"is that a compile error?"* — the distinction is the segment.
- 🎯 **Take the loop-until-valid question seriously when it comes** (it will, and it's a good instinct): the grader answers with silence, a loop that insists spins forever, ask once and answer gracefully. It's testable-shape thinking applied to input — and promise week 13 honestly for the full retry/exception story.
- ⚠️ **The handoff shows no answer key — deliberately** *(decided at rehearsal, 2026-08-04: it was the one beat that needed a third folder, for ninety seconds of value the lab now delivers itself)*. The reframe from "make checks pass" to "make the desk unkillable" is carried by the target line instead: **done is their own program surviving the sentence that crashed it.** Say it like you mean it; it's the lab's payoff being scheduled.
- **The two exact strings in the lab** (`"some night owl"`, `"dealer's choice"`) are checked exactly, and the lab says so. A student burned by capitalization is having a normal week 2; point at the Rules block.
- **No color, no Spectre, nothing pretty.** Week 3 earns the library; two weeks of hand-aligned console output is the ache that pays for it. If the output looks sad tonight, good.

## What could go wrong

| If | Then |
|---|---|
| Nobody did the reading, nobody has a number | Count live — §1's `git ls-files` count on your own repo is the beat anyway; theirs was a warm-up, not a dependency. |
| The scratch repo lost its mess (rebuilt machine, overzealous cleanup) | §0's rebuild block, two minutes. If discovered mid-class: a student's repo on GitHub shows the same mess — tour theirs (ask first). |
| `git rm -r --cached .` output floods the terminal | Fine — say *"every line is a file leaving"* and scroll to the end. The panel shows the same thing tidier. |
| Someone's panel is empty during §3 | The week-1 `Never` click. Settings → `openRepositoryInParentFolders` → `always` → reload. It's in the notes' appendix; fix one machine on screen and the room self-serves. |
| Someone asks why not commit `bin/` "so it always runs" | A real question — answer it straight: the clone can't run your build output anyway (different machine, different paths), but it can always rebuild from source. Repos ship recipes, not casseroles. |
| The `-41.5 C` break doesn't crash because you typed `-41.5` | You dodged your own break — laugh, say *"that's the point, it works when you're careful,"* and type it again with the unit. |
| Someone asks about `try`/`catch` | *"Exactly the right instinct, and it's week 13's whole subject. Tonight's tool is better here anyway: TryParse never throws, so there's nothing to catch."* |
| The lab finishes early | The *Done early?* list is real work — the ⭐ item (resurrect the warning on the day shift's line) closes the night's loop and takes five minutes. |
| A student's `IsWinner` loops asking for input | That's the loop-until-valid instinct landing in homework — point at the notes' *Ask once, answer gracefully* and say why the grader can't run it. |
