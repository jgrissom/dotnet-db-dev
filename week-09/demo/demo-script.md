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
- [ ] 💡 **What *Highlight* means in this sheet:** select the code you are talking about, so the back row can see which part you mean. A word: double-click it. A phrase: drag across it. A whole line: click its line number in the left margin
- [ ] ⚠️ **Delete `week-09/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-09/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · Questions the desk can't answer

- [ ] **Slide 1 is already up as the room settles.** It names tonight's theme. Read it to them in one go, then the two lines below
- [ ] 📖 **Read the slide:** *"Tonight is LINQ, which is about asking a list a question. We'll turn a loop into one line, and write a test first to prove nothing changed. We'll use a few LINQ words: one finds a single item, one keeps some, one changes each item, one puts them in order. We'll see the one thing a question must never do to the list it asks. And in your lab, you'll give the rotation four questions it can answer."*
- [ ] 🎯 **Say what tonight is, plainly:** *"The desk holds the carts, the hour, and every caller. Tonight it learns to answer questions about them. Each answer is one line of code. The C# feature that does it is called LINQ. It is a set of methods that every list already has."*
- [ ] 📖 **Then the deal for the night:** *"I work on the switchboard and the hour. You work on the rotation. After each piece I push my file, and you copy it in."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 9 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of five. Check 1 is everything the desk already does."*

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

- [ ] 📖 *"This screen is new. Every line asks the desk one question. The top four lines and the running order at the bottom are mine. The three in the middle are about the rotation, and those are yours."*
- [ ] 📖 **Then one line each, top to bottom — point at each as you say it:**
  - **`the switchboard`** — *"How many calls the desk has taken tonight, and from how many people."*
  - **`rang more than once`** — *"Which callers have rung more than one time tonight."*
  - **`busiest two`** — *"The two callers who have rung the most, busiest first, with their number of calls."*
  - **`the regular`** — *"The one caller who has rung the most."*
  - **`over four minutes`** — *"Which carts run longer than four minutes. The news at the top of the hour runs four minutes, so these are the carts that can cover it."*
  - **`the titles`** — *"Just the title of every cart, in the order the rotation holds them."*
  - **`in order by title`** — *"Every cart again, this time in order by title, A to Z."*
  - **`the running order`** — *"Everything in the hour, as the DJ would read it before it goes on air."*
- [ ] 📖 **Point at the first line:** *"Zero calls from three people. Dorothy alone has rung three times tonight. The desk has the callers and can't add up their calls."*
- [ ] **Press `q`**
- [ ] 📖 *"Before I add anything, I'm going to change a method that already works. That method is Find, on the switchboard."*

- [ ] **Open `week-09/Lab/Switchboard.cs`. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public Caller? Find(string name)
  ```

  Highlight that line by clicking its line number, and leave it highlighted
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

- [ ] 📖 **Highlight `Assert.Same`:** *"Dorothy is on the board. Find Dorothy has to hand back that same caller, not a copy of her."*
- [ ] 📖 **Highlight `Assert.Null`:** *"Nobody called Ray has rung. Find Ray has to hand back null."*
- [ ] 🎯 **Ask for the color before you run it, and wait for an answer.** *"Red or green?"*

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Green, the first time. That is not a mistake. Find already works, so a test about Find passes. This test is not here to catch a bug. It is here so I can change Find and know I did not break it."*

- [ ] 🎞️ **GO TO SLIDE 2** — *One shape* · *"LINQ stands for Language Integrated Query. A query is just a question. Every LINQ line tonight has three parts. First the list. Then a word that says what to do with the list. Then, in the brackets, a question that is asked of one item at a time."*
- [ ] 📖 **Point at the bottom half of the slide:** *"The question has three parts too. `caller` is one item out of the list, and I pick that name. The arrow reads as 'goes to'. After the arrow is the answer for that one caller."*

- [ ] **Back to `Switchboard.cs`, in `Find`. Select from `foreach (Caller caller in _callers)` down to and including `return null;`, and paste this over it**

  ```csharp
          return _callers.FirstOrDefault(caller => caller.Name == name);
  ```

- [ ] 📖 **Highlight `_callers`:** *"The list of callers."*
- [ ] 📖 **Highlight `FirstOrDefault`:** *"FirstOrDefault hands back the first caller the question is true for."*
- [ ] 📖 **Highlight `caller => caller.Name == name`:** *"The part inside the brackets is the question. It is asked of one caller at a time: is this caller's name the name Find was handed?"*
- [ ] 📖 **Then the last part of the word:** *"OrDefault covers the case where the question is true for no caller. Then it hands back null. Handing back null is what `return null` at the bottom of the loop did."*

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

- [ ] 📖 *"Five passed again. The loop could never crash on a missing name. First can crash on one. FirstOrDefault is the word that matches what the loop did."*

- [ ] **One more loop, in `Load`. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  foreach (Caller caller in loaded)
  ```

  **Select from that line down to and including the `}` directly under `_callers.Add(caller);`, and paste this over it**

  ```csharp
          _callers.AddRange(loaded);
  ```

- [ ] 📖 *"This is the end of Load. The callers in `loaded` were just read from switchboard.json, the file the desk saved at the end of the last shift. This loop puts them on the board one at a time. Putting callers on the board is not a question, so it is not a query. The list has a method that adds a whole list at once, called AddRange."*
- [ ] 📖 **Highlight `_callers.Clear();`:** *"The Clear above it stays. Loading replaces what is on the board."*
- [ ] **Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 5
       Passed: 5
  ```

- [ ] 📖 *"Five passed. One of those five saves a switchboard and loads it into a second one, so it would fail if Load were broken."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 9: Find and Load, one line each"
  ```

- [ ] **Push it to the starters repo — copy the files there, commit there, then push.** Silent; they watch

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
- [ ] 📖 *"Task 1 is what I just did, on the rotation. Copy my two files in. Write your fact about the rotation's Find first. Then change Find and the loop in Load. Your check count stays at one out of five the whole time. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** the wrong reflex is rewriting `Find` before the fact exists. Ask *"how many tests did you have before you started, and how many now?"*
- [ ] 🎯 **And look for a `Load` that lost its `Clear()`.** The desk says `6 carts loaded` on the second run
- [ ] ⚠️ **If your push is still going when the block starts,** they start Task 1 without your files. Their task doesn't need them; the copy can wait a minute

---

## 3 · A number, and some of them *(slide 3)*

- [ ] 📖 *"Find answered with one caller. The next two questions answer with a number, and with several callers."*

- [ ] **Open `week-09/Lab/Hour.cs`. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public int TotalSeconds
  ```

  Highlight that line by clicking its line number, and leave it highlighted
- [ ] 📖 **Read the loop out:** *"TotalSeconds starts a total at zero. It adds each item's seconds to the total. Then it hands the total back."*
- [ ] **Select from `int total = 0;` down to and including `return total;`, and paste this over it**

  ```csharp
              return _items.Sum(item => item.Seconds);
  ```

- [ ] 📖 **Highlight `Sum`:** *"Sum adds up one number from each item in the list."*
- [ ] 📖 **Highlight `item => item.Seconds`:** *"The part in the brackets says which number to total: each item's Seconds. This question does not answer yes or no. It answers with a number."*
- [ ] **Run the desk: DJ name, then `q`.** The hour is drawn as soon as the shift starts

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
  6 items - 14:57 on the clock.
  ```

- [ ] 📖 *"Six items, fourteen minutes fifty-seven. The fourteen fifty-seven comes from TotalSeconds, and it is the same number the desk showed before I changed TotalSeconds."*
- [ ] **And the checks**

  ```bash
  dotnet test week-09/Lab.Checks
  ```

  ```
  Total tests: 5
       Passed: 1
       Failed: 4
  ```

- [ ] 📖 *"One out of five, the same as at the start. Check 1 builds a small hour of its own and expects it to add up to 257 seconds. Check 1 is still green."*

- [ ] 📖 **Before you change TotalCalls, say what it does now:** *"Right now TotalCalls hands back zero, whatever is on the board. That zero is the zero calls on the screen. I need it to add up every caller's CallsTonight."*
- [ ] **Now a question the desk could not answer. In `Switchboard.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  get { return 0; }
  ```

  **Select that one line and paste this over it**

  ```csharp
          get { return _callers.Sum(caller => caller.CallsTonight); }
  ```

- [ ] 📖 *"This is Sum again, the word I just used on the hour. This time it's on the list of callers. The number it totals from each caller is CallsTonight."*
- [ ] 🎯 **Say the number before it prints:** *"Dorothy has three calls, Bex has one, Teodoro has one. That is five."*
- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      5 calls from 3 people
  ```

- [ ] 📖 *"Five calls from three people."*

- [ ] 📖 **Before you change CalledMoreThan, say what it does now:** *"Right now CalledMoreThan hands back an empty list, so the screen shows a dash. I need it to hand back the callers who have rung more than the number I give it."*
- [ ] **Next line of the screen. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public List<Caller> CalledMoreThan(int calls)
  ```

  **Two lines under it is `return new List<Caller>();`. Select that one line and paste this over it**

  ```csharp
          return _callers.Where(caller => caller.CallsTonight > calls).ToList();
  ```

- [ ] 📖 **Highlight `Where`:** *"Where keeps the callers the question is true for, and drops the rest."*
- [ ] 📖 **Highlight the question:** *"The question is: has this caller rung more than `calls` times?"*
- [ ] 📖 **Highlight `ToList`:** *"Where does not hand back a list. ToList on the end makes one. At the end of tonight I'll show you what Where hands back on its own."*
- [ ] **Run the desk: DJ name, then `n`. Don't quit yet**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      5 calls from 3 people
    rang more than once  Dorothy
  ```

- [ ] 📖 *"The desk asks for callers who rang more than one time. That is Dorothy, and only Dorothy."*
- [ ] **Without quitting, press `c` to see where the switchboard stands**

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  ```

- [ ] 📖 *"Dorothy has three calls. Bex and Teodoro have one each. So only Dorothy has rung more than once."*
- [ ] 🎯 **Make Bex ring again. Still without quitting, press `r`, caller `Bex`, then press Enter at the song prompt (Enter picks the next song in the rotation, and the first request in a run gets Nightjar). Then `n`**

  ```
    the switchboard      6 calls from 3 people
    rang more than once  Dorothy, Bex
  ```

- [ ] 📖 *"Bex just rang a second time. I asked the same question, and now the answer is Dorothy and Bex. Where asks the list again every time the screen is drawn, so the answer follows the calls."*
- [ ] **Press `q`.** Then throw away the file the desk just saved

  ```bash
  rm week-09/switchboard.json
  ```

- [ ] 📖 *"Quitting saved Bex's second call to the file. I deleted the file so the rest of tonight starts from the usual three callers."*

- [ ] 🎞️ **GO TO SLIDE 3** — *What each word hands back* · *"Here are tonight's words, sorted by what each one hands back. Where, Select, OrderBy and Take hand back several things. Sum and Count hand back one number. FirstOrDefault and MaxBy hand back one thing, or nothing."*
- [ ] 📖 **Point at the right-hand column:** *"What a word hands back decides what you can do next. After Where you can keep going. After Sum you have a number, and you are finished."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 9: Sum and Where"
  ```

- [ ] **Push it to the starters repo.** Silent

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
- [ ] 📖 *"Task 2: copy my two files in, and press n. Two of my lines have answers now. Then write LongerThan on the rotation. LongerThan is one line, using Where. Stop at the stop note after the commit."*
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

- [ ] **Open `week-09/Lab/Hour.cs`. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public List<string> Run()
  ```

  Highlight that line by clicking its line number, and leave it highlighted
- [ ] 📖 *"Run already builds the lines the running order needs. Run makes one line of text for each item: the kind, a dash, then the cue."*
- [ ] 📖 **Before you change RunningOrder, say what it does now:** *"Right now RunningOrder hands back an empty list, so nothing shows under the running order. I need it to hand back one line of text for each item in the hour, the same lines Run builds."*
- [ ] **Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  return new List<string>();
  ```

  **Select that one line and paste this over it**

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
- [ ] **Press `q`.** Then highlight `item.Play();` inside `Run`
- [ ] 📖 *"Here is why the ad count dropped. Run does not only build the lines. It plays each item first. Calling Run puts the hour on air. We don't want to air the hour. We just want to see it."*

- [ ] **Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  return Run();
  ```

  **Select that one line and paste this over it**

  ```csharp
          return _items.Select(item => $"{item.Kind} - {item.Cue}").ToList();
  ```

- [ ] 📖 **Highlight `Select`:** *"Select keeps every item, and turns each one into something else."*
- [ ] 📖 **Highlight the question:** *"Here each item becomes a line of text: its Kind, a dash, and its Cue. There is no Play in this line. This line reads two things from each item and changes nothing."*
- [ ] **Run the desk: DJ name, then `n`, then `n` again**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
      AD - Pham's Bakery - "open at five" (3 left)
      WEATHER - clear, four below, wind out of the northwest
  ```

- [ ] 📖 *"Three left, both times. The weather has not been read. The hour has not been aired. Looking at the running order no longer changes the hour."*
- [ ] **Without quitting, press `a`, then `n`**

  ```
      AD - Pham's Bakery - "open at five" (2 left)
      WEATHER - clear, four below, wind out of the northwest (read)
  ```

- [ ] 📖 *"I pressed a, and the hour went out. Now the ad has two left and the weather has been read. Airing the hour changed the ad and the weather. Reading the running order did not."*
- [ ] **Press `q`**
- [ ] 🎯 *"Run stays a loop. It does something to every item. A line like tonight's should only ask."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 9: the running order, read without airing it"
  ```

- [ ] **Push it to the starters repo.** Silent

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
- [ ] 📖 *"Task 3: copy my hour in, and press n to see the running order on your own desk. Then write Titles on the rotation. Titles is one line, using Select. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** a student whose titles come out in alphabetical order has done Task 4's job in Task 3. Check 3 says so

---

## 5 · In order, and the list left alone

- [ ] **Run the desk: DJ name, then `n`, then `q`**

  ```bash
  dotnet run --project week-09/Lab
  ```

  ```
    the switchboard      5 calls from 3 people
    rang more than once  Dorothy
    busiest two          -
    the regular          -
  ```

- [ ] 📖 **Highlight the `busiest two` and `the regular` lines on screen:** *"Two questions left on my half of the screen, and both show a dash. Who are the two busiest callers? And who is the regular?"*

- [ ] 📖 **Before you change Busiest, say what it does now:** *"Right now Busiest hands back an empty list, so the screen shows a dash for the busiest two. I need it to hand back the n callers with the most calls, the most first."*
- [ ] **In `Switchboard.cs`, search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  public List<Caller> Busiest(int n)
  ```

  **Two lines under it is `return new List<Caller>();`. Select that one line and paste this over it**

  ```csharp
          _callers.Sort((a, b) => b.CallsTonight.CompareTo(a.CallsTonight));
          return _callers.Take(n).ToList();
  ```

- [ ] 📖 **Highlight `Sort`:** *"The list has its own method called Sort. I hand it a rule for two callers, a and b: the one with more calls goes first."*
- [ ] 📖 **Highlight `Take`:** *"Then Take keeps the first n callers and stops."*
- [ ] **Run the desk: DJ name. Then `r`, caller `Teodoro`, then press Enter at the song prompt (Enter picks the next song in the rotation, and the first request in a run gets Nightjar). Then `c`**

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
- [ ] 📖 *"The switchboard keeps the callers in the order they first rang, and I want to keep that order. So I should not sort the list itself. I need another way to get the busiest callers that leaves the list alone."*

- [ ] **Back to `Switchboard.cs`. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  _callers.Sort(
  ```

  **Select from that line down to and including `return _callers.Take(n).ToList();`, and paste this over it**

  ```csharp
          return _callers.OrderByDescending(caller => caller.CallsTonight).Take(n).ToList();
  ```

- [ ] 📖 **Read it left to right. Highlight `OrderByDescending`:** *"OrderByDescending puts the callers in order by their number of calls, the most calls first."*
- [ ] 📖 **Highlight `Take`:** *"Take keeps the first n."*
- [ ] 📖 **Highlight `ToList`:** *"ToList hands back a list."*
- [ ] 📖 **Then the difference:** *"OrderByDescending builds a new list in sorted order. It does not reorder our original list of callers."*
- [ ] **Throw the file away, because the wrong order is saved in it**

  ```bash
  rm week-09/switchboard.json
  ```

- [ ] **Run the desk: DJ name. Then `r`, caller `Teodoro`, then press Enter at the song prompt (Enter picks the next song in the rotation, and the first request in a run gets Nightjar). Then `n`, then `c`**

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

- [ ] 📖 *"Busiest two is still Dorothy, then Teodoro. And the board is still Dorothy, Bex, Teodoro. The answer is in order. The switchboard was left alone."*
- [ ] **Press `q`, and open `week-09/switchboard.json` again**

  ```json
      "Name": "Dorothy",
      "Name": "Bex",
      "Name": "Teodoro",
  ```

- [ ] 📖 *"The file is in the order the callers rang. Task 4 is this, on your rotation, and my check looks for exactly this."*

- [ ] 📖 **Before you change TheRegular, say what it does now:** *"Right now TheRegular hands back empty text, so the screen shows a dash for the regular. I need it to hand back the name of the caller with the most calls."*
- [ ] **Last one. Search for this line with <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> — one hit:**

  ```text
  return "";
  ```

  **Select that one line and paste this over it**

  ```csharp
          return _callers.MaxBy(caller => caller.CallsTonight)?.Name ?? "nobody yet";
  ```

- [ ] 📖 **Highlight `MaxBy`:** *"MaxBy hands back the one caller with the most calls tonight."*
- [ ] 📖 **Highlight `?.Name`:** *"On a switchboard nobody has rung, there is no caller to hand back, so MaxBy hands back null. The question mark and the dot mean: ask for the Name only if there is a caller."*
- [ ] 📖 **Highlight `?? "nobody yet"`:** *"The two question marks mean: if there was no caller, answer with this text."*
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

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 9: the busiest two, and the regular"
  ```

- [ ] **Push it to the starters repo.** Silent

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

          Assert.Single(busy);
      }
  }
  ```

- [ ] 📖 **Highlight the three `Take` lines:** *"Dorothy rings twice. Bex rings once."*
- [ ] 📖 **Highlight `board.All()`:** *"board.All() hands back the list of callers on the switchboard."*
- [ ] 📖 **Highlight `.Where(caller => caller.CallsTonight > 1)`:** *"Where keeps the callers who have rung more than once. It is the same question CalledMoreThan asks."*
- [ ] 📖 **Highlight `IEnumerable<Caller> busy`:** *"The result goes into a variable called busy. Notice there is no ToList on the end, so busy is not a List."*
- [ ] 📖 **Highlight `Assert.Single(busy);`:** *"Assert.Single checks that busy holds exactly one caller. There are two callers on the board, Dorothy and Bex. But busy is not the whole board. Where kept only the callers who have rung more than once. Dorothy has rung twice and Bex once, so busy should hold one caller: Dorothy."*
- [ ] **Run the suite**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
  Total tests: 6
       Passed: 6
  ```

- [ ] 📖 *"Green. Two callers on the board, but only one of them has rung more than once. So busy holds one caller, Dorothy."*

- [ ] **Now one more call. Click at the end of the `IEnumerable<Caller> busy` line, press Enter twice, and type `board.Take("Bex");`** Type it; it is one line
- [ ] 📖 **Highlight the line you just typed:** *"Bex rings a second time. This call comes after the Where line. I have not changed the Where line or the Assert."*
- [ ] **Run the suite again**

  ```bash
  dotnet test week-09/Lab.Tests
  ```

  ```
    Failed Lab.Tests.BusyCallerTests.AnAnswerDoesNotChangeAfterItIsGiven
    Error Message:
     Assert.Single() Failure: The collection contained 2 items
  ```

- [ ] 📖 *"Red. busy holds two callers now, Dorothy and Bex."*
- [ ] 📖 *"Without ToList, busy stores the query, not the result. The query runs when something reads busy, and here that is Assert.Single, after Bex's second call. ToList would run the query right away and save a snapshot of the result."*

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

- [ ] 📖 *"Green. ToList ran the query on the Where line, one time, and saved a snapshot of the result. Bex's second call came after the snapshot, so it does not change it."*

- [ ] 🎞️ **GO TO SLIDE 4** — *A question, and an answer* · *"Without ToList, Where, Select and OrderBy hand back the query. The query runs every time something reads it. ToList runs the query once and saves a snapshot of the result as a list. So every method tonight ends with ToList."*
- [ ] 🎯 **The forward line:** *"In week ten the callers and the carts move into a database. Then a LINQ question like this Where is sent to the database, and ToList is the moment it is sent."*

- [ ] **Commit it in the demo repo.** Silent

  ```bash
  git add . && git commit -m "week 9: a question, and an answer"
  ```

- [ ] **Push it to the starters repo.** Silent

  ```bash
  cp week-09/Lab.Tests/BusyCallerTests.cs ../dotnet-db-starters/demo/week-09/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 9 demo: a question, and an answer"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 🎯 **Define done on their machine:** *"You are done when `dotnet test week-09/Lab.Checks` says five out of five. When you press n, all three of your lines have an answer. And when you press f and type Water, the desk finds Slack Water."*

---

## Lab F · Task 5, then start the homework — 22 minutes

- [ ] **Lids up. The lab README, at *Task 5 in full*.** Anyone not finished works on their next task
- [ ] 📖 *"Task 5 is one more question for the rotation. Which carts have this bit of text somewhere in their title? Contains is the word for that. Your homework's Task 2 is the same search, on your own project."*
- [ ] 🎯 **Circulating:** a student whose `Water` search finds nothing has `==` or `StartsWith` where `Contains` belongs. Check 5 says so
- [ ] 📖 **For anyone who's finished:** *"If your lab is done, open this week's homework and start it now, while I'm here. It is tonight's lab again, on your own project. Do Part 1 and Task 1, and push your branch before you leave."*
- [ ] 💡 *Now try to break it* and *⭐ Done early?* stay on the lab page for anyone who wants them. Don't ask for either
- [ ] ⚠️ **Stop at 3:35 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 7 · Wrap *(slide 5)*

- [ ] 🎞️ **GO TO SLIDE 5** — *Tonight, in one picture* · *"Every LINQ line tonight was a list, a word and a question. FirstOrDefault hands back one thing or null, and First throws. Where keeps some. Select turns each one into something else. OrderBy hands back a new list and leaves yours alone. ToList is what turns a question into an answer."*
- [ ] 🎯 **The forward line:** *"Every question tonight was asked of a list that is already in memory. In week ten the data moves into a database. In week twelve the database answers the question."*
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. It has four tasks. Its search is the one you wrote in Task 5. If you finished the lab, you have done every step once."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 removes last week's checks and copies this week's in. Run both commands. This week's first check is called WeeksFourToEightStillHold. If yours says FourToSeven, you are running last week's."*
- [ ] ⚠️ **And say the date, because the last one was different** — *"This homework is due before our next class. One week, the normal amount."*
