# Week 7 — Lesson Plan

**Topic:** Unit testing — testable shape collecting its debt, xUnit, red-then-green, and the reveal that the course's checks were tests all along.
**Session length:** 3h 45m

> Students have been graded by test projects since week 1 and have never seen inside one. Tonight the duty board gets caught keeping two wrong records, the room discovers a rule in `Program.cs` cannot be tested by anything, and the fix — move it, then prove it — ends with them reading the file that has been grading them all semester and recognizing every line.

## 🎯 The payoff moment — the demo's

**The reveal, §4.** The first test of the night runs — one green line, named — and the question goes to the room: *"where have you seen it before?"* Then the browser comes up with week 6's `HourChecks.cs` beside the editor: a class, `[Fact]`s, `Assert`s, the same csproj settings. The line to land:

> *"I have been calling them checks since week one because that is what they are to you, and the word the rest of the world uses is unit tests. There is no line of this file you cannot read now."*

⚠️ **The set-up is what makes it land, so protect the order:** the room has to have *written* a fact and *run* it before the file is opened. Recognition only works from the inside. And the file's own header has been promising this night for a week — read its last line out loud: *"That is what an interface is, and it is what a check is. Week 7."*

## 🎯 The payoff moment — the lab's

**Their own red, against a bug they could only see by being lucky.** Task 2's clock bug hides on the shift as loaded — every length happens to land on two-digit seconds. The lab has them surface it by taking one request: song **2** pushes the hour to 1149 seconds and the clock reads `19:9`. ⚠️ **Song 1 or 3 and it looks perfect** — which is the whole point, and it is why their fact feeds the clock `605` rather than hoping. It objects instantly:

```
Assert.Equal() Failure: Strings differ
Expected: "10:05"
Actual:   "10:5"
```

**A test asks the same question every time; the screen only shows what you happened to do** — that is the moment the lab exists for, and it is theirs, at their own keyboard, before any fix. The commonest wrong reflex to catch while circulating: fixing the line first and never seeing the red.

## Learning objectives

By the end of this session, students can:

1. Say why logic in `Program.cs` cannot be tested, and what "testable shape" has been buying them since week 1.
2. Move behavior into a class without changing it, and say why moving and fixing are kept separate.
3. Create an xUnit test project with `dotnet new xunit`, reference the code under test, and run it with `dotnet test`.
4. Write a fact: set the scene, do the thing, check the answer — `Assert.Equal`, `Assert.True`/`False`, `Assert.Same`, `Assert.Contains`.
5. Read a failure: the name, expected-versus-actual, the line.
6. Practice red-then-green: write the test against the bug, watch it fail for the right reason, then fix.
7. Falsify a born-green test on purpose, and say what a test that has never failed does and does not prove.
8. Say what a check is — and read any `*.Checks` file in the course.

> [!NOTE]
> **Objectives 6 and 8 are the week.** 8 is the reveal and 6 is the discipline that makes it worth having. If the night runs short, protect §4's reveal and §5's red — and let §6 lose the desk demonstration at its end (the suite's green already proves it).

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-07/demo/script.html))
- **The instructor demo repo**, where week 6 left it — `week-01/` … `week-06/` in it, clean, `main` up to date after last week's merge
- ⚠️ **Week 6's project has to RUN** — §1 opens by running it. One `dotnet run --project week-06/Haldane` before class warms the restore
- ⚠️ **Delete `week-07/` from the demo repo if you've rehearsed** — both `Haldane` and `Haldane.Tests`; `dotnet new` refuses to overwrite either
- **A browser tab on the starters repo** at `week-06/Lab.Checks/HourChecks.cs`, ready for §4's reveal

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 15 min | **Where we finished last week** *(demo §1)*. Run week 6, take a reading, forty seconds of refresher. 🎯 **Then the question the night runs on:** *how do I know what this console says is TRUE?* Branch, `week-07/Haldane`, all seven files carried forward, the date. |
| 0:15 | 30 min | 💥 **Two bugs on the board** *(slides 2–4, demo §2)*. Okonkwo signs out twice: `4 people outside.`, three on the ice. Reyes's amend lands on a closed trip. 🎯 **Then the wall:** a check is just a caller, and the rules live in `Program.cs` where nothing can call them — week 1's rule, arriving with a bill. |
| 0:45 | 10 min | **☕ Break** |
| 0:55 | 26 min | **The move** *(slides 5–6, demo §3)*. `Watch.cs` pasted whole — bugs riding along, said out loud. `Program.cs` worked down the compiler's own error list. 🎯 **Closes on the §2 break replayed: same wrong board, byte for byte.** Move ≠ fix. |
| 1:21 | 25 min | 🎯 **A project that asks questions** *(slides 7–9, demo §4)*. `dotnet new xunit`, the reference, the trimmed csproj. First fact: `MinusFiftyIsTheLine`, week 1's method. **The reveal** — `HourChecks.cs` in the browser beside it. Then falsify-and-restore. |
| 1:46 | 10 min | **☕ Break** |
| 1:56 | 24 min | 💥 **Red, then green** *(slide 10, demo §5)*. The double sign-out test, written against the live bug. 🎯 **Ask for the color before the run.** Red — expected 1, actual 2 — then the guard, then green, then the desk says *"already outside"* out loud. |
| 2:20 | 20 min | **The other bug** *(slide 11, demo §6)*. Same discipline, richer scene: out, back, out again, the phone call. MarkBack had the guard for three weeks; Amend gets it now. Whole suite green. Desk proven once, by hand, for the last time. |
| 2:40 | 5 min | **Lab launch** *(slide 12, demo §7)*. The scheduler update broke four rules; the checks caught all four. Done is: 5 green of mine, a fact per bug of yours. |
| 2:45 | 50 min | **Lab: the update** *(slide 12 stays up)*. **In-class target: 5 green.** Circulate hard at Task 2 (the first fact) and Task 4 (`Assert.Same`). |
| 3:35 | 10 min | **Wrap-up** *(slide 13, demo §8)*. Fact · check · red · green. Two URLs in Canvas, **the checks-copy line with this week's twist: two checks, not five.** Week 8 tease: the log stops being gone. |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, §6 is the segment to shorten — drop its closing desk run and let the suite's green carry it, then trim §2's second bug walk to one run. **Do not take it from §4 or §5** — the reveal and the first red are the week, and do not take it from the lab.

## Instructor notes

- 🎯 **§2's two bugs are found at the desk, not in the code.** Nothing is opened in the editor until §3. The room should hold *"the board lies"* before it ever sees why — and the count question (*"count the people"*) goes to them, with a wait.
- ⚠️ **Do not fix anything in §2, and do not fix anything during the move in §3.** The whole architecture of the night is that the first fix lands *after* a test is red against it. A room that watches move-and-fix in one act learns neither.
- 🎯 **§3's broken build is deliberate and worth naming as a technique** — replace the seeds, build, and the error list *is* the moving checklist. Read it off the screen; don't count it out loud from the sheet.
- ⚠️ **The Replace All in §3 runs ONCE.** `SignOuts()` → `watch.SignOuts()` — run twice it manufactures `watch.watch.`, and the sheet says so. Read the hit count off the editor.
- 🎯 **In §4, the reveal must come after their first green run, not before.** The order is: write the fact, run it, one named green line, *"where have you seen this before?"* — and only then the browser. Recognition beats explanation.
- ⚠️ **§4's falsify beat is not optional filler.** *Make it fail once* is the discipline the homework leans on (its Task 2 repeats it verbatim), and it is the answer to the room's fair question "how do I know my test tests anything?"
- 🎯 **In §5, ask for the predicted color out loud and wait for an answer.** Half the room will say green out of habit. The red that follows does the teaching.
- 💡 **The refused sign-out never reaching the log (`watch.Count` staying 1) is the quiet star of §5's grown test** — a silent refusal is only visible to a test, which is the week's thesis in one assert.
- ⚠️ **§6's fix is one condition, and the beat before it matters more than the fix:** the cursor goes to `MarkBack` first — the guard has existed for three weeks, one method up. The lesson is *test the rule, not the line*; the humbling half is that the rule was already written down once.
- **The demo commits four times, silently**, and the first is immediately after the branch — the same commit the lab's Setup asks of them. Then the move (§3), the test project (§4), the first red-then-green (§5), and the amend fix with the push (§6).
- **The branch is spoken, briefly** — five seconds, nothing new this week.
- ⚠️ **Say the checks-copy line at the wrap with this week's twist.** This week's `Project.Checks` holds **two** checks, not five. A student on last week's checks sees five names and 5/5 — the homework's Part 1 warning names the symptom, and the wrap should too.
- **The lab's Task 2 is where the demo's discipline happens to them** — circulate then, and watch for students fixing the line before writing the fact. The right question to ask over a shoulder: *"what color is your test right now?"*
- 💡 **`Lab.Tests` fact names are theirs.** The lab suggests naming a fact after the rule it proves and dictates nothing — if someone asks whether the name matters, the answer is: to the runner, no; to whoever reads the failure at 4 AM, entirely.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-07/Haldane` refuses | You rehearsed and left `week-07/` behind. Delete both folders; §0 says so. |
| `dotnet new xunit` refuses in §4 | Same cause — `week-07/Haldane.Tests` survived a rehearsal. Delete it. |
| §3's first build shows errors you don't recognize | Work the list top to bottom anyway — every line is a place still calling the old names. The sheet's edits cover exactly that list; if one remains after, it is a missed edit and the message names the line. |
| The Replace All count looks wrong | An earlier edit didn't take, or it ran twice (`watch.watch.`). Undo once and re-run it; the sheet's step order makes the count stable. |
| §5's test comes up green on the first run | The guard is already in `Watch.SignOut` — you pasted the §5 version during §3. Take the guard back out (the §3 block in the sheet is the faithful one); the red is the beat. |
| A wrong slide is showing during a reveal | The reveal's screen is the browser + editor, not the deck — slide 8 goes up *after* the file has been scrolled. |
| Somebody asks "do professionals really write the test first?" | Honestly: for a bug, almost always — the red is the proof the bug is caught. For new code, it varies, and week 8 onward this course writes tests after the fact too. Both need the falsify discipline. |
| Somebody asks why `Assert.Equal(1, ...)` and not `== 1` with `Assert.True` | Both work; `Assert.Equal` *reports* better — expected and actual, named. Show the two failure messages if there's a minute; the notes cover it. |
| Somebody asks about `[Theory]` | Thirty seconds, no editor: a fact with parameters, so one method runs as many tests. Real, useful, not tonight's. The notes name it as the first thing to learn next. |
| A student's lab test is green against the bug | It asserts the wrong thing — usually `Clock(893)`, the value that was never broken. Check 2's message and the lab's Task 2 both steer to `605`. |
| A student fixed the bug before writing the test | It happens; don't unwind them. Have them falsify the fixed line instead (change `:00` to `:0`, watch their test go red, put it back) — same proof, recovered. |
