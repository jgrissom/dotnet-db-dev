# Week 3 — Lesson Plan

**Topic:** Collections — `List<T>`, `foreach`, `Dictionary<K,V>` — and **Spectre.Console**, the first NuGet package. Then the thing the whole course is built on: everything above lives in memory, and memory is the length of one process.
**Session length:** 3h 45m

> The night has an arc rather than two halves: the station gets a memory, the memory gets a face, and then it gets taken away. Three deliberate breaks, one after another — an array that runs out, columns that shear, a dictionary key that isn't there — and each one earns the tool that follows it. The last beat isn't a break at all; it's a promise being collected, made twice already and never softened.

## 🎯 The payoff moment — the demo's

**The board on the projector becomes the program on the projector.** In §4 the hand-aligned `foreach` loses its padding numbers and gains one `AnsiConsole.Write(board)` — and what comes out is the sign-out panel from `dutyconsole.com`, the page they have been reading as they walk in since week 1. **"Your program now looks like the board."**

Then §6 takes it back. Nothing is typed: the program is simply run again, and the row the duty officer signed out has gone while the three written into the source come back. **`4 people outside` → `3 people outside`.**

The two halves are one beat — the high and the drop — and the order is the point. ⚠️ **The convergence only works because they've seen the board for three weeks and never been told to look at it.** Don't explain the resemblance; let somebody say it.

## 🎯 The payoff moment — the lab's

**The student writes the sentence that mocks them.** Task 5 asks for a sign-off line for a shift where nobody rang — an edge case, written in thirty seconds, and most of them will make it funny. Then the lab's last instruction is: quit, and run it again.

```
KDXR - Nobody called. Not one person.
```

Four callers they took by hand, the board they watched fill up, and the desk now says the night never happened — **in their own words, which is what makes it land.** It is the demo's beat with the data belonging to them, and it is the reason week 8 and week 10 will feel like answers instead of syntax.

⚠️ **Circulate for the re-run, and say nothing.** The instinct in the room will be *"I broke it"* — the lab README says plainly that they didn't, but a student who reaches that line with you nearby is the one who remembers it in November. **Do not fix anything.** There is nothing to fix, and that is the lesson.

## Learning objectives

By the end of this session, students can:

1. Say why a fixed-size array is a decision, and use `List<T>` — `Add`, `Count`, `foreach` — where the count isn't knowable in advance.
2. Hold a list of a type they wrote (`List<SignOut>`, `List<Call>`) and say what the angle brackets are for.
3. Use `Dictionary<K,V>` for lookup and for counting, and say what a *key* buys that a list position doesn't.
4. Explain that reading a missing key **throws**, that assigning one does not, and write the `TryGetValue` idiom — recognising it as last week's `TryParse` shape.
5. Walk a dictionary with `foreach` over `KeyValuePair`.
6. Add a NuGet package with `dotnet add package`, point at the `.csproj` line it wrote, and say why nothing was installed on the machine.
7. Render a collection with a Spectre `Table`, and say why a table that *measures* beats padding that *guesses*.
8. State plainly where data in a collection lives, and what happens to it when the process ends.

> [!NOTE]
> **Objectives 4 and 8 are the week.** The dictionary key is the one they'll get wrong confidently; the loss is the one the next thirteen weeks are built on. If the night runs short, protect §5's break and all of §6 — Spectre can be shown in ten minutes rather than twenty and lose nothing structural.

## Materials

- `slides.md` / `slides.html` — the deck (hosted at jgrissom.github.io/dotnet-db-dev)
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-03/demo/script.html))
- **The instructor demo repo**, sitting where week 2 left it — `week-01/` and `week-02/` in it, clean. §2 makes `week-03/` by command
- ⚠️ **A warm NuGet cache.** `dotnet add package` on a cold cache in front of the room is a silent thirty seconds. Build any project referencing Spectre once before class

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 15 min | **The three calls that never met** *(slides 2–3, demo §1)*. Collect last week's reading question out loud — *"where are the first two calls while the third one is happening?"* Nowhere. They never existed at the same time. Nothing is typed in this segment; it is the week's reason to exist, stated by the room. |
| 0:15 | 28 min | **The board has to hold people** *(slides 4–6, demo §2)*. `week-03/Haldane` by command, `Conditions.cs` carried forward. `SignOut.cs` in forty seconds — *"you've all written one of these."* 💥 **Break 1:** `new string[3]` and a fourth person → `IndexOutOfRangeException`. `List<SignOut>`, `Add`, `Count`, `foreach`. |
| 0:43 | 10 min | **☕ Break** |
| 0:53 | 27 min | **Counting spaces by hand** *(slides 7–8, demo §3)*. The board printed with `,-12` padding — and it looks **fine**. 💥 **Break 2:** somebody signs out as `DIG OUT VENT 3` and the columns shear into `DIG OUT VENT 316:30`. Then `dotnet add package Spectre.Console`, and the `.csproj` line that appears — restored, not installed. |
| 1:20 | 18 min | 🎯 **The table** *(slide 9, demo §4)*. Padding out, one `AnsiConsole.Write` in — and the output is the duty console. **The convergence beat.** |
| 1:38 | 27 min | **Names, not positions** *(slides 10–12, demo §5)*. `Dictionary<string, string>` of crew roles. 💥 **Break 3:** `roles["Halvorsen"]` → `KeyNotFoundException`. `TryGetValue`, named as last week's shape. Assigning a missing key is fine; only reading throws. |
| 2:05 | 10 min | **☕ Break** |
| 2:15 | 15 min | 🎯 **Run it again** *(slides 13–14, demo §6)*. Nothing typed. `4 people outside` → `3 people outside`. The promise from week 1, collected. Where it gets answered: week 8, week 10. |
| 2:30 | 5 min | **Lab launch** *(slide 15, demo §7)*. The frame, and "done" defined on **their** machines: after check 5, quit and run it again. |
| 2:35 | 60 min | **Lab: the night's log** *(slide 15 stays up)*. **In-class target: all five green, then lose the night.** Circulate for the Task 5 re-run. |
| 3:35 | 10 min | **Wrap-up** *(slide 16, demo §8)*. A list is every one · a dictionary is every key · and none of it was written down. Homework: the station's last night. Week 4 tease: **their own topic, and a repo they'll live in until December.** |

## Instructor notes

- 🎯 **§1 is worth the fifteen minutes and it is the segment a running-late instinct will cut.** It is the only place the room states the problem *before* being handed the tool, and the answer — *"nowhere, they never existed together"* — is the whole week in six words. Ask, wait, and let somebody who wrote it down read their answer out. ⚠️ **Do not open an editor during §1.**
- ⚠️ **Three breaks in one night is a lot, and they are not equals.** Break 1 (the array) is thirty seconds and cheap. Break 2 (the shear) is the one that earns the library and it needs the *"it looked fine a moment ago"* pause. Break 3 (the missing key) is the one they'll meet again in the lab within the hour. **If you drop one, drop the array** — the slide carries it.
- ⚠️ **Break 2 must not be pre-announced as ugliness.** The hand-aligned board genuinely looks tidy for the three seeded rows, and that is the setup: *"that's fine, isn't it?"* — then sign somebody out with a longer reason and let the room watch `DIG OUT VENT 316:30` appear. **A student who is told the output is ugly before seeing it break will not believe you, because it isn't.**
- 🎯 **The convergence line is one sentence and it is better asked than said.** With the table on screen: *"anybody recognise this?"* The board has been on the projector at the start of three sessions. **If nobody bites, say it plainly and move on** — it is a gift, not a hinge, and it is not worth a second try.
- ⚠️ **`static` will be asked about and it is week 5's.** *"One copy, alive as long as the program runs"* is the complete week-3 answer. Say it, promise week 5, and get out. The temptation is real because the fields are right there on screen.
- ⚠️ **Public fields are on screen all night and week 4 opens on what they cost.** Do not answer that tonight either. `SignOut` and `Call` are deliberately the naive shape.
- 🎯 **§6 is a collected promise, so lead with that.** *"I told you in week 1 this was coming."* The room being unsurprised is not the beat failing — the beat is watching it happen to a board they watched get built forty minutes ago. **Let the silence run** after `3 people outside`; the next sentence is theirs, not yours.
- ⚠️ **Do not answer "how do we fix it?" with a preview of week 8.** The honest answer is *"you can't, with anything you know tonight — and that's not a gap in your skills, it's the shape of memory."* Name where it gets answered (a file in week 8, a database in week 10) and stop. **A student who leaves tonight knowing how `File.WriteAllText` works has been robbed of week 8.**
- **The lab's Task 3 is where break 3 happens to them.** The starter comment warns about the indexer and the check message quotes their own line back. Circulate anyway — a `KeyNotFoundException` at 3am reads as *"my dictionary is broken."*
- ⚠️ **Spectre for OUTPUT only, and say it once in §3 where it's cheap.** `AnsiConsole.Ask` throws under redirected input, which never fails by hand and always fails under the grader. It is in the notes, the homework and the 🆘 section; one sentence out loud stops half the support.
- **Nothing in the lab or homework references `dutyconsole.com`.** The convergence is the demo's. KDXR's board is deliberately a different look — violet and coral, rounded — and if a student's output starts resembling Haldane's, that's fine and unremarked.

## What could go wrong

| If | Then |
|---|---|
| `dotnet add package` sits there on a cold cache | Say what it's doing — *"it's fetching it now; that's the last time any machine has to"* — and use the pause for the `.csproj`. A pre-warmed cache makes it instant, which is why §0 says to warm it. |
| The room's wifi makes fifteen simultaneous restores slow **in the lab** | The lab starter ships the `PackageReference`, so the restore happens at their first `dotnet test`. Stagger it: send half the room to read Task 1 while the rest run the checks. **It's a one-time cost per machine.** |
| A student's `dotnet test` fails with `error NU1101` (package not found) | No network. The package is per-project, so nothing is broken permanently — they can pair up for the lab and restore at home. Note it for the homework deadline. |
| Somebody asks why not `new string[100]` | The best question of the night. *"How many people are outside right now?"* Nobody knows — and a hundred empty slots is a board with ninety-six blank lines on it. Fixed size is the problem, not the number. |
| Somebody asks whether a dictionary is "just a faster list" | Different questions, not different speeds. The list keeps order and duplicates; the dictionary keeps one entry per key. **Point at their own screen at the end of the lab: three rows in one table, two in the other.** |
| Someone's `TheRegular()` returns `nobody yet` on a full log | The `foreach` is comparing against something that never updates, or `most` is being reset inside the loop. Check 4's message walks it. |
| **Somebody asks "so how do we save it?"** *(they will, in §6)* | ⚠️ Do not teach it. *"With what you know tonight — you can't. That's not you missing something."* Week 8 writes a file, week 10 puts it in a database. **Being annoyed is the assignment.** |
| A student says the loss means their program is broken | Say it out loud to the whole room, because more than one of them thinks it: **nothing is broken, nothing was done wrong, and every program any of you has ever written does this.** The lab README says so in writing at exactly that step. |
| The lab finishes early | The *Done early?* list is real work, and the ⭐ item (a second dictionary, keyed on the request) is the one that pays off in week 9. |
| A student's Spectre output crashes on a caller with `[` in the name | Markup. The shipped `Program.cs` escapes it; if they've edited the render, `Markup.Escape(...)` is the fix and it's in the notes' appendix. |
