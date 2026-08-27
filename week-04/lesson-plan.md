# Week 4 — Lesson Plan

**Topic:** OOP with a reason — `private`, properties, `private set` — and the semester project begins: their own topic, a public repo, and branch → pull request → merge.
**Session length:** 3h 45m

> The night convicts a class the room has been looking at since week 3. Four public fields, on the projector all term, never once questioned — and one typed correction at −39 is all it takes to lose a person's return time without a single warning. Every fix after that is a door closing. Then they get a repo of their own.

## 🎯 The payoff moment — the demo's

**A typo that becomes a compile error while they watch.** In §4 the instructor "fixes a misspelled name" — `outside[2].Name = "Okonkow";` — which compiles, runs, and quietly renames *the wrong person*, because index 2 is Lindqvist, not Okonkwo. Nobody in the room notices at first; that's the point.

Then `Name` becomes `{ get; }`, the build is run again, and the line that was fine ninety seconds ago is:

```
error CS0200: Property or indexer 'SignOut.Name' cannot be assigned to -- it is read only
```

**Deleting that line is the fix.** Not a code review, not somebody being careful — the program can no longer be built if it rewrites who was outside.

⚠️ **This is not "the compiler catches you", which this room has heard.** It's *you decide what the compiler is allowed to let through* — the same tool, pointed by them for the first time.

## 🎯 The payoff moment — the lab's

**They press `g` and watch their own rotation get vandalised.** At the end of Task 2 the board finally fills with three songs — and the 03:14 automation glitch reaches straight in:

```
  tried title -> ""   got in - now
  tried seconds -> -400   got in - now -400
```

Track 1 has no name any more. **Nothing crashed, nothing warned, and the board is now lying.**

Then Task 3 lands and one line flips to `refused - still Nightjar`. Task 4 flips the next. By Task 5 the glitch bounces off everything it tries.

⚠️ **Circulate at Task 2 and let the vandalism land before anybody fixes it.** The temptation is to rush them to Task 3; the whole lab is better if they sit with a board that just lied to them. **A student who never sees the attack succeed has no idea what they spent the hour defending against.**

## Learning objectives

By the end of this session, students can:

1. Say what a public field costs — that there is nowhere to put a rule — and point at a case where it silently destroyed data.
2. Write a property with a private backing field, and say what `value` is.
3. Write a setter that refuses a bad value, and explain why refusing is not the same as crashing.
4. Use an auto-property, and say what it buys over a public field on the day a rule is needed.
5. Use `{ get; }` for a fact that is set once, and `{ get; private set; }` for a fact only the class itself may change.
6. Write a computed property with no backing field, and say why storing it would be a bug.
7. Build a class that owns a private collection and hands out a **copy**, and say what returning the real list would undo.
8. Take a feature from branch → commit → push → pull request → merge, and say why the plain merge is the one that leaves a merge commit.

> [!NOTE]
> **Objectives 1 and 5 are the week.** Everything else is syntax they can look up. If the night runs short, protect §2's break and §5 — §6's project talk can be compressed to the slides, because the homework repeats all of it in writing.

## Materials

- `slides.md` / `slides.html` — the deck
- `lecture-notes.md` on your second screen
- **Demo cue sheet:** [`demo/demo-script.md`](demo/demo-script.md) ([clickable version](https://jgrissom.github.io/dotnet-db-dev/week-04/demo/script.html))
- **The instructor demo repo**, where week 3 left it — `week-01/` … `week-03/` in it, clean
- ⚠️ **A browser signed in to GitHub, on the demo repo.** §7 opens a real pull request in front of the room
- ⚠️ **Delete `week-04/` from the demo repo if you've rehearsed** — `dotnet new` refuses to overwrite

## Timed agenda

| Time | Duration | Segment |
|------|----------|---------|
| 0:00 | 12 min | **The class you already write** *(slide 2, demo §1)*. `SignOut` on screen — *"tell me what's wrong with it."* **Nothing is.** Then `week-04/Haldane` by command, **all three files carried forward** and one date edited — last week's desk running, with nothing written tonight. |
| 0:12 | 23 min | 💥 **A correction, at −39** *(slides 3–4, demo §2)*. The desk gains an `[a]mend` action — one line writing into a public field. Typed `15:15` works; **Enter-only wipes Reyes's return time and nothing complains.** The count still says three. Let it sit. |
| 0:35 | 10 min | **☕ Break** |
| 0:45 | 27 min | **A door instead of a hole** *(slides 5–7, demo §3)*. Private field, property, `value`, the `if`. 🎯 **Point at the unchanged caller** — `s.Expected = newTime;` inside `AmendABackBy`, character for character. Re-run with the same keystrokes: the blank never happens. |
| 1:12 | 22 min | 🎯 **Some things should never change** *(slide 8, demo §4)*. The "helpful typo" that renames Lindqvist. Then `{ get; }`, then `dotnet build` → **CS0200**, and deleting the line is the fix. |
| 1:34 | 21 min | **Only the station says you came back** *(slide 9, demo §5)*. `IsBack { get; private set; }` and `Back()`. STATUS column, and the count becomes *people not back* rather than *rows*. |
| 1:55 | 10 min | **☕ Break** |
| 2:05 | 18 min | **Your own topic** *(slides 10–12, demo §6)*. The private list and the copy. Then the project: their topic, their repo, public. 🎯 **"Each one of my ___ has many ___"**, out loud, with their own ideas. Sell the odd ones. |
| 2:23 | 15 min | **Branch, pull request, merge** *(slide 13, demo §7)*. Push the branch they didn't know he was on, open a real PR, **read the diff**, plain-merge it, `checkout main` + `pull`. |
| 2:38 | 5 min | **Lab launch** *(slide 14, demo §8)*. Done is defined on their machine: press `g` and nothing gets through. |
| 2:43 | 50 min | **Lab: the rotation that fights back** *(slide 14 stays up)*. **In-class target: 5 green, and the glitch bouncing.** Circulate hard at Task 2. |
| 3:33 | 12 min | **Wrap-up** *(slide 15, demo §9)*. Field · property · `private set`. Two URLs in Canvas. Week 5 tease: **`static`, and what it costs.** |

> [!NOTE]
> **The table sums to exactly 225 minutes.** If the night runs long, the two places to take it from are named in the objectives: §6 compresses to its slides, and §7 can drop the diff-reading beat. **Do not take it from the lab.**

## Instructor notes

- 🎯 **§1's question has to be asked without irony.** *"Tell me what's wrong with this class"* — and the honest answer is *nothing*. If somebody says *"the fields should be private"*, ask **why**, and let them try to finish it. Most rooms cannot, because it has always been a rule rather than a reason. **That failure to finish the sentence is the whole setup for the next twenty minutes.**
- ⚠️ **Do not fix the break in §2 the moment it lands.** The blank `EXPECTED` cell wants to sit on screen while you talk. The consequence is the line that matters: *"the board is perfectly happy, and it has thrown away the only fact that says Reyes is late."*
- ⚠️ **§4's typo must be typed as a helpful thing, not as a demo.** *"While I'm in here, I noticed a typo in Okonkwo's name."* The room has to believe you mean it. Then the reveal is double: it's misspelled **and** it's the wrong row.
- 🎯 **Slow down on `private set` in §5.** It is the one shape in the night that does something a field cannot do at all, and it is the sentence the wrap repeats. *"There is no line you can write, anywhere in this program, that claims somebody came back who didn't."*
- ⚠️ **"Shouldn't it throw?" will be asked in §3, and it is a good question.** The complete week-4 answer is *"sometimes, and choosing is a real design decision — it's week 13's whole subject."* Say it and move on; a five-minute detour into exceptions costs §4.
- ⚠️ **`static` will be asked about again and it is week 5's.** `Rotation` and `Registry` are both instance classes this week precisely so that next week has something to contrast with. Don't pre-empt it.
- **§6 is the only segment where the room talks more than you do.** Take two or three topics out loud and pressure-test each one against *"has many."* A topic that can't finish the sentence is cheaper to kill tonight than in week 12.
- ⚠️ **Sell the weird topics, and mean it.** The instinct in a vocational room is to pick something employer-shaped. Say plainly that the best project in the room will be the strangest one, and that nobody enjoys presenting a list of products in week 16.
- ⚠️ **§7 opens a real pull request on the projector.** Rehearse the GitHub half — the branch push URL, the Compare & pull request banner, the merge button. **The failure mode is fumbling in the browser**, which reads as the workflow being fiddly when it isn't.
- **Say the squash-merge trap exactly once**, in §7, and put it in the homework in writing. It costs 2 points for work they actually did, and it's the single most likely silent deduction of the week.
- **The lab's Task 2 is where the demo's break happens to them.** Circulate then, not at the end.

## What could go wrong

| If | Then |
|---|---|
| `dotnet new console -o week-04/Haldane` refuses | You rehearsed and left `week-04/` behind. Delete it; §0 says so. |
| The §2 break doesn't land because somebody types a time out of habit | Run it again and press Enter yourself, deliberately, narrating the gloves. **The Enter-only run is the beat** — don't leave it to chance a second time. |
| Somebody says "so just validate it in `Program.cs`" | The best objection of the night. *"You can — and then the next place that sets it has to remember too, and the one after that."* The rule belongs where the data lives, once. |
| Somebody asks why not make everything `{ get; }` | Then nothing can ever be corrected, including the return time Reyes actually radioed in. **The week is about choosing per fact**, not about locking everything. |
| A student asks whether properties are slower than fields | Not in any way they will ever measure, and the JIT inlines the trivial ones. Don't spend more than a sentence. |
| §7's PR flow stalls on GitHub | Have the repo's Pull requests tab already open in a second tab. If it's genuinely down, the branch and the `git log --graph` still tell the story; the homework instructions are written and don't depend on the demo working. |
| A student's project repo is private | They lose nothing this week — `repoReachable` is about it cloning — but week 15's optional code-review reading needs it public. Fix it in the moment; it's two clicks. |
| A student names the console project after their topic | The checks can't load it. `Assembly.Load("Project")` needs it called `Project` — the homework says so in a `[!CAUTION]`, and it's the most likely single point of failure this week. **Ask to see one during the lab.** |
| The lab finishes early | The *Done early?* list is real, and item 4 (a `TotalSeconds` on the rotation) is the one that gets collapsed to one line in week 9. |
| Somebody breaks their setter into infinite recursion | `set { Title = value; }` instead of `set { _title = value; }` — it hangs, then `StackOverflowException`. It's in the lab's 🆘 table and in the notes, and it is the single most common property bug there is. |
