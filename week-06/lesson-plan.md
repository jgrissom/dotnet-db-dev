# Week 6 — Lesson Plan

**Topic:** Interfaces and polymorphism — one list holding four kinds of things, one loop asking all of them the same questions, and the honest limit of that idea.
**Session length:** 3h 45m

> Students have written a list of one type every week since week 3, and it has never cost them anything. Tonight it does, twice: a duty log that cannot be read down because it is really two lists, and then a single list that holds everything and can tell them nothing. The answer is a kind of type they have never written — one with no bodies in it and nothing to make.

## 🎯 The payoff moment — the demo's

**A whole new kind of thing arrives on the watch log, and the code that prints it does not change.** In §4 a `FuelCheck` class is written from scratch, one line puts an instance on the log, and it prints:

```
07:40  FUEL      day tank 4300 L
09:05  SIGN OUT  Lindqvist - FUEL, due 10:30
12:00  MET       -39.8 C, taken by Moretti
```

Then the cursor goes into `DrawLog` and stays there: *"nothing. I wrote a new class, I put one on the list, and this loop printed it. I have not touched this loop since the promise landed, and it has never heard of a fuel check."*

⚠️ **The set-up is what makes it land, so protect §3.** Twenty minutes earlier the same loop printed `SignOut / Reading / SignOut` — five class names, zero errors, zero warnings. The room has to have seen `object` fail before the promise means anything.

## 🎯 The payoff moment — the lab's

**One `foreach`, and six things go out over the air.** Task 5's `Run()` is five lines, and pressing `a` at the desk produces this:

```
  ON AIR  IDENT - KDXR 88.1, The Owl
  ON AIR  SONG - Nightjar - The Lamplighters
  ON AIR  AD - Pham's Bakery - "open at five" (2 left)
  ON AIR  SONG - Slack Water - Marguerite Vance
  ON AIR  WEATHER - clear, four below, wind out of the northwest (read)
  ON AIR  SONG - Long Way Round - The Ferrymen
```

**Four classes they wrote or read tonight, four different `Play()` bodies** — one counts up, one counts down and stops at zero, one sets a flag, one is week 4's song — **and the loop that ran them all cannot name a single one.**

⚠️ **The ad is the row to point at while circulating.** It went in saying `3 left` and it comes out saying `2 left`, in the same line the loop printed, because `Run()` plays the item before it reads the cue. Nothing else on screen makes *"the same method, four different jobs"* visible.

## Learning objectives

By the end of this session, students can:

1. Say why a `List<SignOut>` and a `List<Reading>` cannot be read as one log, and why sorting is not the fix.
2. Say what `List<object>` buys and what it costs.
3. Declare an interface, and say what each part of the declaration means — `interface`, no bodies, nothing to `new`.
4. Make an existing class keep an interface, and read `CS0535` as a to-do list.
5. Recognize a promise a class already keeps, and satisfy it by pointing at a fact it already has.
6. Write one loop over `List<IThing>` that calls the same member on several different classes.
7. Say why `SignOut : ILogEntry` is not the same claim as *is a kind of*, and why a class gets one parent and any number of promises.
8. Use `is` to get back to one specific type, and say when that is the right thing and when it is a smell.

> [!NOTE]
> **Objectives 3, 6 and 7 are the week.** 7 is the depth one — it is the difference between a room that can type `: IThing` and a room that knows what it just said. If the night runs short, protect §3's `object` break and §5, and let §6 lose the `LatestCelsius` beat.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-06/demo/script.html))
- **The instructor demo repo**, where week 5 left it — `week-01/` … `week-05/` in it, clean, and `main` up to date after last week's merge
- ⚠️ **Week 5's project has to RUN**, not just exist — §1 opens by running it. One `dotnet run --project week-05/Haldane` before class warms the restore
- ⚠️ **Delete `week-06/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 13 min | **Where we finished last week** *(demo §1)*. Run week 5, press `b` / `Reyes`, forty seconds of refresher. 🎯 **Then the question the night runs on:** *what does this console actually know?* Branch, `week-06/Haldane`, all four files carried forward, one edit — the date. |
| 0:13 | 30 min | 💥 **The log that isn't a log** *(slides 2–3, demo §2)*. A `Reading` class, a second list, a second loop. It builds clean and the log reads 14:20, 14:20, 09:05, 12:00. Then sign somebody out live and watch it land **in the middle**. 🎯 **The line that matters:** *you cannot sort your way out — there is nothing to sort.* |
| 0:43 | 10 min | **☕ Break** |
| 0:53 | 30 min | 💥 **One list, and it can tell you nothing** *(slides 4–6, demo §3)*. `List<object>` — one list, in order, zero warnings, and the log prints `SignOut / Reading / SignOut`. Then `ILogEntry`, `: ILogEntry`, and 🎯 **the build before a single member is written**: two `CS0535`s, and `Time` is not one of them. One word changes `object` to the promise. |
| 1:23 | 20 min | 🎯 **The third kind** *(slide 7, demo §4)*. `FuelCheck`, one seed line, run — **and `DrawLog` is untouched.** Ask *"what do I have to change to make this print?"* before running it. Then `[m]et`, and a reading typed in live. |
| 1:43 | 10 min | **☕ Break** |
| 1:53 | 20 min | **A promise is not a parent** *(slides 8–10, demo §5)*. **No code.** Two files already on screen. One parent, as many promises as you like — and the test to leave them with: *don't ask what they are, ask what somebody needs them to do.* Then **the four words**, as a retrospective: they have built encapsulation, abstraction and polymorphism already, and **inheritance is the one they have not used in six weeks** — which is a choice, not a gap. 🎯 **Ask for hands** on inheritance first. |
| 2:13 | 27 min | 💥 **The board is a question you ask the log** *(slides 11–12, demo §6)*. Sign somebody out: the board says four, the log has never heard of her. 🎯 **Ask the room to count the log's sign-outs before you say anything.** Then `is`, one Replace All, the board list deleted, and the headline temperature starts coming off the log — `-52.4` flips `Safe to go out` to `False`. |
| 2:40 | 5 min | **Lab launch** *(slide 13, demo §7)*. Done is defined on their machine: press `a` and six things go out in a row. |
| 2:45 | 50 min | **Lab: the hour** *(slide 13 stays up)*. **In-class target: 5 green.** Circulate hard at Task 2 and Task 5. |
| 3:35 | 10 min | **Wrap-up** *(slide 14, demo §8)*. Class · interface · one list · `is`. Two URLs in Canvas, and **say the checks-copy line out loud**. Week 8 tease: the log stops being gone. |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, **§5's four-word map is shortened, not dropped** — skip the hands question and the abstraction aside and read the four lines straight off slide 10 — then §5 loses its `abstract class` aside and §6 loses the `LatestCelsius` beat. **Do not take it from the lab**, and do not take it from §3 — the `object` break is what makes the rest of the night mean anything.

## Instructor notes

- 🎯 **§2's break is quiet and §3's is loud, and they are answering different questions.** §2 says *you need one list*. §3 says *one list is not enough — it has to be a list of something that promises*. A room that has only seen one of those will think an interface is about tidiness.
- ⚠️ **Do not fix §2's ordering before the coffee.** The jumbled log wants to sit there, and the sentence to leave hanging is the one about the third kind of thing: *another list, another loop, another place to forget.*
- 🎯 **§3's `List<object>` is not a straw man and it should not be introduced as one.** It is the thing a student genuinely reaches for, it compiles, and it runs. Say *"this is the obvious move and I want you to watch it fail"* rather than *"here's a wrong way".*
- 🎯 **The best twenty seconds of the night is the build in §3 with no members written.** Two `CS0535`s, and `Time` is missing from the list because `SignOut` has had one since week 3. **Point at what is not there** — that is the whole concept in one build.
- ⚠️ **`Reading.cs` in §2 is written WITHOUT the interface, deliberately.** It is a plain class for a whole segment, and it joins the promise in §3 along with `SignOut`. Adding `: ILogEntry` to it in §2 would spend the break before it happens.
- ⚠️ **Between §3 and §6 there is a live bug in the program, and it is deliberate.** `SignSomebodyOut` writes to `outside` and not to `log`, so a sign-out typed at the desk does not reach the log. **§6 opens by finding it.** If you press `o` during §4 or §5 you will meet it early — the beat still works, it just arrives without the set-up.
- 🎯 **In §6, make them count.** *"The board says four people are outside. How many sign-outs are on the log?"* and then wait. A room that finds the discrepancy itself takes the fix seriously; a room that is shown it takes notes.
- ⚠️ **Rule out the cheap fix out loud in §6**, because somebody will offer it: adding the missing `log.Add` works, and next week there is a third place and a fourth. The point is that two lists holding the same things is the bug, not the symptom.
- **§6's Replace All is one action and the editor says how many.** Five. Don't count them out loud from the sheet — read the number off the screen.
- 🎯 **§6's last beat is a week-1 callback and it is worth slowing down for.** `IsSafeToGoOut` was the first thing this console ever computed, and it has been fed a number typed into the program for five weeks. Type `-52.4` at the `m` prompt and it says `False` — off a measurement, for the first time.
- **§5 has no code and should not acquire any.** It is a re-reading of two files already open. If somebody asks about `abstract class`, thirty seconds and no editor: *a bigger promise, and you only get one.*
- ⚠️ **Do not let §5 turn into an inheritance lesson.** This room has not written a base class and does not need one. The claim is about what `: ILogEntry` **does not** say, and it is made by pointing at `SignOut.cs` — everything above the two new members is untouched.
- **The demo commits four times, silently**, and the first is immediately after the branch, before a line of the week is changed — the same thing the lab's Setup asks of them. Then the log keeping a promise (§3), the third kind (§4), and the board becoming a question (§6). **One push, at the end of §6.**
- **The branch is spoken, briefly.** Five seconds — *nothing goes straight to `main`, and that goes for your project too*. ⚠️ **Shorter than week 5's**, deliberately: week 5 carried a genuinely new fact *(the commits counted are the ones on the branch)* and this week carries none, so narrating it further would be re-teaching a habit they already have.
- ⚠️ **Say the checks-copy line at the wrap and mean it.** Week 5 shipped without a checks-copy step and a student doing the whole homework against last week's checks sees **5 / 5 at every checkpoint**. Week 6's Part 1 fixes it, and the line to say is *"skip that step and last week's checks will happily tell you you're done."*
- **The lab's Task 2 is where the demo's idea happens to them** — a class they finished two weeks ago keeping a promise it had never heard of. Circulate then, and again at Task 5, which is the only task with two loops in it.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-06/Haldane` refuses | You rehearsed and left `week-06/` behind. Delete it; §0 says so. |
| ⚠️ **This week's project is not in <kbd>F5</kbd>'s list** | Not a fault, and not needed tonight — there is no debugger segment this week. **§1 still reloads the window**, because students hit it in the lab the moment they copy their week in. |
| The `CS0535` build in §3 shows more than two errors | You added `: ILogEntry` to `Reading` as well. Take it off — §3 does `SignOut` first on purpose, so the room sees the checklist for one class. |
| §6's Replace All says something other than 5 | An earlier edit didn't take. `in outside)` should appear in `EndOfWatch`, `AmendABackBy`, `MarkSomebodyBack`, and twice in `DrawBoard`. |
| Somebody asks "why not just sort the log?" | **The best question in §2**, and the answer is the segment: there is nothing to sort, because they are not in one place. Take it. |
| Somebody asks "why not just add the missing line?" in §6 | Also a good question, also answered out loud in the sheet. The rule: two lists holding the same objects is a bug you have to keep remembering not to make. |
| Somebody asks about abstract classes | Thirty seconds, no editor, and move. It is a real tool, it is a bigger promise, and you get one. |
| Somebody asks whether `is` is "cheating" | No — it is the honest limit. A long chain of them is the smell; one is a design decision. Notes cover it. |
| A student's `Run()` prints the ad's count before it aired | The commonest bug in Task 5, and it looks right. `Play()` then read `Cue`. It's in the lab's 🆘 table. |
| A student's `Ad` goes to `-1 left` | `Play()` is spending a run it doesn't have. Ask before you spend — check 4 catches it. |
| A student can't get past Task 2 | They are rewriting `Song` rather than adding to it. Two members at the bottom; everything above is week 4's and stays. |
| The lab finishes early | The *Done early?* list is real, and item 1 (a `Jingle`) takes about two minutes and proves the week's whole claim. |
