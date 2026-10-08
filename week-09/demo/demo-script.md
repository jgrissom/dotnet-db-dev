# Week 9 Demo — Thirty Lines Become One 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk learns to answer questions. You work on the **switchboard** and the **hour**, live, and the students do the same thing to the **rotation**. After each of your segments you push your finished file, and they copy it in to read and run while they work.

> **The shape of the night:** a fact first, then a loop becomes one line → a number, and some of them → the hour read without airing it → in order, with the list left alone → a question, and an answer. **Each demo segment is followed by the lab task that practices it.**

**Total: ~93 minutes of demo, in seven short segments, and six lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-09-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-09-rehearsal
> ```
>
> Then **delete the `week-09` folder** from the Explorer. Switching to `main` removed the files you committed, but not what the program wrote — `switchboard.json`, `rotation.json`, `bin` and `obj`.
>
> **And empty `demo/week-09/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-09
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 9 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-09/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push to it five times. From the terminal of `dotnet-db-coursework`:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room. *No clone there yet?* `git clone https://github.com/jgrissom/dotnet-db-starters.git ../dotnet-db-starters`, then the two lines above
- [ ] ⚠️ **`demo/week-09/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-09
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 9 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] ⚠️ **Delete `week-09/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] ⚠️ **Rehearse §6's debugger steps once before class.** They are the one part of tonight that no script can check: a breakpoint, **Debug Test**, one Step Over and two Continues. If the breakpoint does not stop inside the question, the note at the end of §6 has the fallback
- [ ] **A browser tab on the lab README** (`week-09/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces again. Lids down while I work, lids up for each lab block in between."*

---

## 1 · Questions the desk can't answer

- [ ] 🎯 **Say what tonight is, plainly:** *"The desk holds the carts, the hour, and every caller. Tonight it learns to answer questions about them. Each answer is one line of code."*
- [ ] 📖 **Then the deal for the night:** *"I work on the switchboard and the hour. You work on the rotation. After each piece I push my file, and you copy it in."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 9 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of four. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-09/Lab.Checks
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 9: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · A fact first, then one line *(slide 2)*

- [ ] **Run the desk: DJ name, then `n`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
  ── the night's numbers ──────────────────────────
    the switchboard      0 calls from 3 people
    rang more than once  -
    busiest two          -
    the regular          -

    over four minutes    -
    the titles           -
    in order by title    -

    the running order:
  ```

- [ ] 📖 *"This screen is new. Every line asks the desk one question. The top four lines are about the switchboard, and those are mine. The next three are about the rotation, and those are yours."*
- [ ] 📖 **Point at the first line:** *"Zero calls from three people. Dorothy alone has rung three times tonight. The desk has the callers and can't add up their calls."*
- [ ] **Press `q`**
- [ ] 📖 *"Before I add anything, I'm going to change a method that already works. That method is Find, on the switchboard."*

- [ ] **Open `week-09/Lab/Switchboard.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public Caller? Find(string name)` — one hit.** Put the cursor on it and leave it there
- [ ] 📖 **Read the loop out, a line at a time:** *"Find walks the callers. If a caller's name matches the name it was handed, it hands that caller back. If it reaches the end without a match, it hands back null."*
- [ ] 📖 *"This loop works. I'm going to replace it with one line. First I write down what Find does, as a test. Then I can tell whether my one line changed it."*

- [ ] **Run the suite before anything changes**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 4
       Passed: 4
  ```

- [ ] 📖 *"Four tests pass. Remember four."*

- [ ] **Open `week-09/Lab.Tests/SwitchboardTests.cs` and go to the end of it (<kbd>⌘↓</kbd> / <kbd>Ctrl+End</kbd>). Select the last two lines of the file — the two `}` — and paste this over them**

  ```csharp
      }

      [Fact]
      public void FindHandsBackTheCallerOrNothing()
      {
          Switchboard board = new Switchboard();
          Caller dorothy = board.Take("Dorothy");

          Assert.Same(dorothy, board.Find("Dorothy"));
          Assert.Null(board.Find("Ray"));
      }
  }
  ```

- [ ] 📖 **Cursor on `Assert.Same`:** *"Dorothy is on the board. Find Dorothy has to hand back that same caller, not a copy of her."*
- [ ] 📖 **Cursor on `Assert.Null`:** *"Nobody called Ray has rung. Find Ray has to hand back null."*
- [ ] 🎯 **Ask for the color before you run it, and wait for an answer.** *"Red or green?"*

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Green, the first time. That is not a mistake. Find already works, so a test about Find passes. This test is not here to catch a bug. It is here so I can change Find and know I did not break it."*

- [ ] 🎞️ **GO TO SLIDE 2** — *One shape* · *"Every line tonight has three parts. First the list. Then a word that says what to do with the list. Then, in the brackets, a question that is asked of one item at a time."*
- [ ] 📖 **Point at the bottom half of the slide:** *"The question has three parts too. `caller` is one item out of the list, and I pick that name. The arrow reads as 'goes to'. After the arrow is the answer for that one caller."*

- [ ] **Back to `Switchboard.cs`, in `Find`. Select from `foreach (Caller caller in _callers)` down to and including `return null;`, and paste this over it**

  ```csharp
          return _callers.FirstOrDefault(caller => caller.Name == name);
  ```

- [ ] 📖 **Cursor on `_callers`:** *"The list of callers."*
- [ ] 📖 **Cursor on `FirstOrDefault`:** *"FirstOrDefault hands back the first caller the question is true for."*
- [ ] 📖 **Cursor on `caller => caller.Name == name`:** *"This is the question. It is asked of one caller at a time. Is this caller's name the name I was handed?"*
- [ ] 📖 **Then the last part of the word:** *"OrDefault covers the case where the question is true for no caller. Then it hands back null. That is what `return null` at the bottom of the loop did."*

- [ ] **Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Five passed. The loop is gone, and both asserts about Find still hold."*

- [ ] 💥 **Now the wrong word. In that line, delete `OrDefault`, so it reads `_callers.First(`.** Type it; don't paste
- [ ] 📖 *"There is a shorter word, First. Some of us would pick it. Here is what First does."*
- [ ] 🎯 **Ask for the color, and wait.** *"Red or green?"*

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
    Failed Lab.Tests.SwitchboardTests.FindHandsBackTheCallerOrNothing
    Error Message:
     System.InvalidOperationException : Sequence contains no matching element
  ```

- [ ] 📖 *"Red. First looked for a caller named Ray and found none. First does not hand back null. It throws an exception."*
- [ ] **Run the desk: DJ name, then `r`, caller `Ray`, song `1`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
  Unhandled exception. System.InvalidOperationException: Sequence contains no matching element
  ```

- [ ] 📖 *"A new caller rang and the desk crashed. Taking a call asks Find first, to see if the caller is already on the board. Ray is not on the board, so First threw."*
- [ ] **Type `OrDefault` back, so the line reads `_callers.FirstOrDefault(` again. Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Five passed again. The loop could never crash on a missing name. First can. FirstOrDefault is the word that matches what the loop did."*

- [ ] **One more loop, in `Load`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `foreach (Caller caller in loaded)` — one hit. Select from that line down to and including the `}` directly under `_callers.Add(caller);`, and paste this over it**

  ```csharp
          _callers.AddRange(loaded);
  ```

- [ ] 📖 *"This loop put every loaded caller on the board, one at a time. That is not a question, so it is not a query. The list has a method that adds a whole list at once, called AddRange."*
- [ ] 📖 **Cursor on `_callers.Clear();`:** *"The Clear above it stays. Loading replaces what is on the board."*
- [ ] **Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Five passed. One of those five saves a switchboard and loads it into a second one, so it would fail if Load were broken."*

- [ ] **Push it — the files, then the commit, then the push.** Silent; they watch

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-09 && cp week-09/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-09/ && cp week-09/Lab.Tests/SwitchboardTests.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: Find and Load, one line each, and the fact"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 📖 *"My switchboard and my test are in the starters repo now. You copy both in before you start."*

---

## Lab B · Task 1 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.** Its first step is pulling your files and copying them in
- [ ] 📖 *"Task 1 is what I just did, on the rotation. Copy my two files in. Write your fact about the rotation's Find first. Then change Find and the loop in Load. Your check count stays at one out of four the whole time. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** the wrong reflex is rewriting `Find` before the fact exists. Ask *"how many tests did you have before you started, and how many now?"*
- [ ] 🎯 **And look for a `Load` that lost its `Clear()`.** The desk says `6 carts loaded` on the second run
- [ ] ⚠️ **If your push is still going when the block starts,** they start Task 1 without your files. Their task doesn't need them; the copy can wait a minute

---

## 3 · A number, and some of them *(slide 3)*

- [ ] 📖 *"Find answered with one caller. The next two questions answer with a number, and with several callers."*

- [ ] **Open `week-09/Lab/Hour.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public int TotalSeconds` — one hit.** Put the cursor on it
- [ ] 📖 **Read the loop out:** *"TotalSeconds starts a total at zero. It adds each item's seconds to the total. Then it hands the total back."*
- [ ] **Select from `int total = 0;` down to and including `return total;`, and paste this over it**

  ```csharp
              return _items.Sum(item => item.Seconds);
  ```

- [ ] 📖 **Cursor on `Sum`:** *"Sum adds up one number from each item in the list."*
- [ ] 📖 **Cursor on `item => item.Seconds`:** *"The question says which number. For this item, the answer is its Seconds. This question does not answer yes or no. It answers with a number."*
- [ ] **Run the desk: DJ name, then `q`.** The hour is drawn as soon as the shift starts

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
  6 items - 14:57 on the clock.
  ```

- [ ] 📖 *"Six items, fourteen minutes fifty-seven. That clock comes from TotalSeconds, and it is what the desk said before I changed it."*
- [ ] **And the checks**

  ```bash
  dotnet test week-09/Lab.Checks
  ```

  ```
  Total tests: 4
       Passed: 1
       Failed: 3
  ```

- [ ] 📖 *"One out of four, the same as at the start. Check 1 builds a small hour of its own and expects it to add up to 257 seconds. It is still green."*

- [ ] **Now a question the desk could not answer. In `Switchboard.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `get { return 0; }` — one hit. Select that one line and paste this over it**

  ```csharp
          get { return _callers.Sum(caller => caller.CallsTonight); }
  ```

- [ ] 📖 *"The same word on a different list. Add up the callers, and the number to add for each caller is CallsTonight."*
- [ ] 🎯 **Say the number before it prints:** *"Dorothy has three calls, Bex has one, Teodoro has one. That is five."*
- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      5 calls from 3 people
  ```

- [ ] 📖 *"Five calls from three people."*

- [ ] **Next line of the screen. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public List<Caller> CalledMoreThan(int calls)` — one hit. Two lines under it is `return new List<Caller>();`. Select that one line and paste this over it**

  ```csharp
          return _callers.Where(caller => caller.CallsTonight > calls).ToList();
  ```

- [ ] 📖 **Cursor on `Where`:** *"Where keeps the callers the question is true for, and drops the rest."*
- [ ] 📖 **Cursor on the question:** *"The question is: has this caller rung more than `calls` times?"*
- [ ] 📖 **Cursor on `ToList`:** *"Where does not hand back a list. ToList on the end makes one. At the end of tonight I'll show you what Where hands back on its own."*
- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      5 calls from 3 people
    rang more than once  Dorothy
  ```

- [ ] 📖 *"The desk asks for callers who rang more than one time. That is Dorothy, and only Dorothy."*

- [ ] 🎞️ **GO TO SLIDE 3** — *What each word hands back* · *"Here are tonight's words, sorted by what each one hands back. Where, Select, OrderBy and Take hand back several things. Sum and Count hand back one number. FirstOrDefault and MaxBy hand back one thing, or nothing."*
- [ ] 📖 **Point at the right-hand column:** *"What a word hands back decides what you can do next. After Where you can keep going. After Sum you have a number, and you are finished."*

- [ ] **Push it.** Silent

  ```bash
  cp week-09/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-09/ && cp week-09/Lab/Hour.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: Sum and Where"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab C · Task 2 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.**
- [ ] 📖 *"Task 2: copy my two files in, and press n. Two of my lines have answers now. Then write LongerThan on the rotation. It is one Where. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student with all three carts on the line has the comparison backwards. A student with `CS0266` left `ToList()` off the end

---

## ☕ Break

---

## 4 · Read the hour without airing it

- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the running order:
  ```

- [ ] 📖 *"The last part of the screen is the running order. The DJ wants to read what is coming up before the hour goes out. Nothing is listed under it yet."*

- [ ] **Open `week-09/Lab/Hour.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public List<string> Run()` — one hit.** Put the cursor on it
- [ ] 📖 *"Run already builds those lines. It makes one line of text for each item: the kind, a dash, then the cue."*
- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `return new List<string>();` — one hit. Select that one line and paste this over it**

  ```csharp
          return Run();
  ```

- [ ] 📖 *"So the quick way is to hand back what Run hands back."*
- [ ] **Run the desk: DJ name, then `n`, then `n` again**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
      AD - Pham's Bakery - "open at five" (2 left)
      WEATHER - clear, four below, wind out of the northwest (read)
  ```

  ```
      AD - Pham's Bakery - "open at five" (1 left)
  ```

- [ ] 💥 **Do not explain it. Ask, and wait:** *"Look at the bakery ad in the first list and in the second list. What changed?"*
- [ ] 📖 *"Two left, then one left. Pham's Bakery paid for three airings. I pressed n twice, and two of them are used up. Nothing went out on air. I only looked."*
- [ ] **Press `q`.** Then put the cursor on `item.Play();` inside `Run`
- [ ] 📖 *"Here is why. Run does not only build the lines. It plays each item first. Calling Run puts the hour on air."*

- [ ] **<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `return Run();` — one hit. Select that one line and paste this over it**

  ```csharp
          return _items.Select(item => $"{item.Kind} - {item.Cue}").ToList();
  ```

- [ ] 📖 **Cursor on `Select`:** *"Select keeps every item, and turns each one into something else."*
- [ ] 📖 **Cursor on the question:** *"Here each item becomes a line of text: its Kind, a dash, and its Cue. There is no Play in this line. It reads two things from each item and changes nothing."*
- [ ] **Run the desk: DJ name, then `n`, then `n` again**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
      AD - Pham's Bakery - "open at five" (3 left)
      WEATHER - clear, four below, wind out of the northwest
  ```

- [ ] 📖 *"Three left, both times. The weather has not been read. Looking at the running order no longer changes the hour."*
- [ ] **Without quitting, press `a`, then `n`**

  ```
      AD - Pham's Bakery - "open at five" (2 left)
      WEATHER - clear, four below, wind out of the northwest (read)
  ```

- [ ] 📖 *"I pressed a, and the hour went out. Now the ad has two left and the weather has been read. Airing the hour changed those. Reading the running order did not."*
- [ ] **Press `q`**
- [ ] 🎯 *"Run stays a loop. It does something to every item. A line like tonight's should only ask."*

- [ ] **Push it.** Silent

  ```bash
  cp week-09/Lab/Hour.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: the running order, read without airing it"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab D · Task 3 — 15 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: copy my hour in, and press n to see the running order on your own desk. Then write Titles on the rotation. It is one Select. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student whose titles come out in alphabetical order has done Task 4's job in Task 3. Check 3 says so

---

## 5 · In order, and the list left alone

- [ ] 📖 *"Two questions left on my half of the screen. Who are the two busiest callers? And who is the regular?"*

- [ ] **In `Switchboard.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public List<Caller> Busiest(int n)` — one hit. Two lines under it is `return new List<Caller>();`. Select that one line and paste this over it**

  ```csharp
          _callers.Sort((a, b) => b.CallsTonight.CompareTo(a.CallsTonight));
          return _callers.Take(n).ToList();
  ```

- [ ] 📖 **Cursor on `Sort`:** *"The list has its own method called Sort. I hand it a rule for two callers, a and b: the one with more calls goes first."*
- [ ] 📖 **Cursor on `Take`:** *"Then Take keeps the first n callers and stops."*
- [ ] **Run the desk: DJ name. Then `r`, caller `Teodoro`, and press Enter for the song. Then `c`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 2     │ Nightjar  │
  ```

- [ ] 📖 *"Teodoro rang again, so he has two calls. The board lists the callers in the order they first rang: Dorothy, Bex, Teodoro."*
- [ ] **Press `n`**

  ```
    busiest two          Dorothy (3), Teodoro (2)
  ```

- [ ] 📖 *"Dorothy with three, then Teodoro with two. That is the right answer."*
- [ ] **Press `c` again**

  ```
  │ Dorothy │ 3     │ -         │
  │ Teodoro │ 2     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  ```

- [ ] 💥 **Do not explain it. Ask, and wait:** *"Look at the board. Where is Bex now?"*
- [ ] 📖 *"Bex was second on the board and now she is third. I asked the desk a question, and the switchboard changed. Sort rearranged the switchboard's own list."*
- [ ] **Press `q`. Open `week-09/switchboard.json` from the Explorer and put it on screen**

  ```json
      "Name": "Dorothy",
      "Name": "Teodoro",
      "Name": "Bex",
  ```

- [ ] 📖 *"Quitting saved the board in the new order. Asking who was busiest rewrote the file."*

- [ ] **Back to `Switchboard.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `_callers.Sort(` — one hit. Select from that line down to and including `return _callers.Take(n).ToList();`, and paste this over it**

  ```csharp
          return _callers.OrderByDescending(caller => caller.CallsTonight).Take(n).ToList();
  ```

- [ ] 📖 **Read it left to right. Cursor on `OrderByDescending`:** *"OrderByDescending puts the callers in order by CallsTonight, biggest first."*
- [ ] 📖 **Cursor on `Take`:** *"Take keeps the first n."*
- [ ] 📖 **Cursor on `ToList`:** *"ToList hands back a list."*
- [ ] 📖 **Then the difference:** *"OrderByDescending builds a new list in sorted order. It does not touch _callers."*
- [ ] **Throw the file away, because the wrong order is saved in it**

  ```bash
  rm week-09/switchboard.json
  ```

- [ ] **Run the desk: DJ name. Then `r`, caller `Teodoro`, Enter for the song. Then `n`, then `c`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    busiest two          Dorothy (3), Teodoro (2)
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 2     │ Nightjar  │
  ```

- [ ] 📖 *"The same answer: Dorothy, then Teodoro. And the board is still Dorothy, Bex, Teodoro. The answer is in order. The switchboard was left alone."*
- [ ] **Press `q`, and open `week-09/switchboard.json` again**

  ```json
      "Name": "Dorothy",
      "Name": "Bex",
      "Name": "Teodoro",
  ```

- [ ] 📖 *"The file is in the order the callers rang. Task 4 is this, on your rotation, and my check looks for exactly this."*

- [ ] **Last one. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `return "";` — one hit. Select that one line and paste this over it**

  ```csharp
          return _callers.MaxBy(caller => caller.CallsTonight)?.Name ?? "nobody yet";
  ```

- [ ] 📖 **Cursor on `MaxBy`:** *"MaxBy hands back the one caller with the biggest CallsTonight."*
- [ ] 📖 **Cursor on `?.Name`:** *"On a switchboard nobody has rung, there is no caller to hand back, so MaxBy hands back null. The question mark and the dot mean: ask for the Name only if there is a caller."*
- [ ] 📖 **Cursor on `?? "nobody yet"`:** *"The two question marks mean: if there was no caller, answer with this text."*
- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      6 calls from 3 people
    rang more than once  Dorothy, Teodoro
    busiest two          Dorothy (3), Teodoro (2)
    the regular          Dorothy
  ```

- [ ] 📖 *"All four of my lines answer now. Six calls from three people. Dorothy and Teodoro rang more than once. Dorothy is the regular."*

- [ ] **Push it.** Silent

  ```bash
  cp week-09/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: the busiest two, and the regular"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab E · Task 4 — 25 minutes

- [ ] **Lids up. The lab README, at *Task 4 in full*.**
- [ ] 📖 *"Task 4: copy my switchboard in. Then write ByTitle on the rotation. The carts come back in order by title, and the rotation's own order stays the way it was. Then open your rotation file and check. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulate hard — this is the lab's payoff.** Ask *"what order are your carts in when you press t?"* It should still be Nightjar, Slack Water, Long Way Round
- [ ] 🎯 **A student with `List.Sort` in `ByTitle`** has a red check 4 and a `rotation.json` in the wrong order. They fix the line, then delete the file

---

## ☕ Break

---

## 6 · A question, and an answer *(slide 4)*

- [ ] 📖 *"Every list tonight had ToList on the end. Here is what happens without it."*

- [ ] **In the Explorer, right-click `week-09/Lab.Tests` → New File → `BusyCallerTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact about WHEN a question gets asked.

  namespace Lab.Tests;

  public class BusyCallerTests
  {
      [Fact]
      public void AnAnswerDoesNotChangeAfterItIsGiven()
      {
          Switchboard board = new Switchboard();
          board.Take("Dorothy");
          board.Take("Dorothy");
          board.Take("Bex");

          IEnumerable<Caller> busy = board.All().Where(caller => caller.CallsTonight > 1);

          board.Take("Bex");

          Assert.Single(busy);
      }
  }
  ```

- [ ] 📖 **Cursor on the three `Take` lines:** *"Dorothy rings twice. Bex rings once."*
- [ ] 📖 **Cursor on the `IEnumerable<Caller> busy` line:** *"This line asks which callers have rung more than once. Right now that is Dorothy, and only Dorothy. There is no ToList on the end."*
- [ ] 📖 **Cursor on the second `board.Take("Bex");`:** *"Then Bex rings a second time."*
- [ ] 📖 **Cursor on `Assert.Single(busy);`:** *"Then I check the answer I already took. Assert.Single passes if the answer holds exactly one caller."*
- [ ] 🎯 **Ask for the color before you run it, and wait for an answer.** *"Red or green?"*

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
    Failed Lab.Tests.BusyCallerTests.AnAnswerDoesNotChangeAfterItIsGiven
    Error Message:
     Assert.Single() Failure: The collection contained 2 items
  ```

- [ ] 📖 *"Red. The answer holds two callers. Bex is in an answer I took before her second call."*

- [ ] **Now watch it happen. Click in the margin left of the `IEnumerable<Caller> busy` line, so a red dot appears. Then click `Debug Test`, just above `public void AnAnswerDoesNotChangeAfterItIsGiven()`**
- [ ] 📖 **It stops on the line with the red dot:** *"The debugger has stopped on the Where line. That line has not run yet."*
- [ ] **Press Step Over (<kbd>F10</kbd>)**
- [ ] 📖 **The yellow arrow is now on the second `board.Take("Bex");`:** *"The Where line has finished. The debugger never went inside the question. So nobody has been asked anything yet."*
- [ ] **Press Continue (<kbd>F5</kbd>)**
- [ ] 📖 **It stops on the Where line again, and the Variables pane shows `caller`:** *"Now it is inside the question, and the caller is Dorothy. Look at the Call Stack. The line that brought us here is Assert.Single. The question is being asked now, when the answer is read."*
- [ ] **Press Continue (<kbd>F5</kbd>)**
- [ ] 📖 **It stops there once more:** *"The caller is Bex this time, and she has two calls. Her second call came in before anybody read the answer, so she counts."*
- [ ] **Press Continue (<kbd>F5</kbd>) to let the test finish, then click the red dot to remove it**
- [ ] 📖 *"Where did not hand back the callers. It handed back the question. The question was asked later, when Assert.Single read it."*

- [ ] **Make the `IEnumerable<Caller> busy` line read as below. One change: `.ToList()` goes on the end, before the semicolon**

  ```csharp
          IEnumerable<Caller> busy = board.All().Where(caller => caller.CallsTonight > 1).ToList();
  ```

- [ ] **Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 6
       Passed: 6
  ```

- [ ] 📖 *"Green. ToList asked the question on that line, one time, and kept the answer. Bex's second call came after that, so it does not change the answer."*

- [ ] 🎞️ **GO TO SLIDE 4** — *A question, and an answer* · *"Where, Select and OrderBy hand back a question that has not been asked yet. ToList asks it, once, and hands back the answer as a list. That is why every method tonight ends with ToList."*
- [ ] 🎯 **The forward line:** *"In week ten the callers and the carts move into a database. Then a question like this one is sent to the database, and ToList is the moment it is sent."*

- [ ] **Push it.** Silent

  ```bash
  cp week-09/Lab.Tests/BusyCallerTests.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: a question, and an answer"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 🎯 **Define done on their machine:** *"You are done when `dotnet test week-09/Lab.Checks` says four out of four. And when you press n, all three of your lines have an answer."*

> [!NOTE]
> **If the breakpoint never stops inside the question** — two Continues and the test just ends — the debugger on this machine binds the red dot to the statement only. Write the question on lines of its own, and put the red dot on the `return` line:
>
> ```csharp
>         IEnumerable<Caller> busy = board.All().Where(caller =>
>         {
>             return caller.CallsTonight > 1;
>         });
> ```
>
> Everything said at each stop is the same. Put the line back to its one-line form before you push.

---

## Lab F · Finish the lab, or start the homework — 22 minutes

- [ ] **Lids up. The lab README.** Anyone not finished works on their next task
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It is tonight's lab again, on your own project. Do Part 1 and Task 1, and push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. Don't ask for either
- [ ] ⚠️ **Stop at 3:35 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 7 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"Every line tonight was a list, a word and a question. FirstOrDefault hands back one thing or null, and First throws. Where keeps some. Select turns each one into something else. OrderBy hands back a new list and leaves yours alone. ToList is what turns a question into an answer."*
- [ ] 🎯 **The forward line:** *"Every question tonight was asked of a list that is already in memory. In week ten the data moves into a database. In week twelve the database answers the question."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. The same four tasks, in the same order. If you finished the lab, you have done every step once."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToEightStillHold. If yours says FourToSeven, you are running last week's."*
- [ ] ⚠️ **And say the date, because the last one was different** — *"This homework is due before our next class. One week, the normal amount."*
