# Week 8 Demo — The Night Stops Being Gone 📻

**KDXR 88.1 · the overnight desk · the same station they work on**

Tonight the desk's night survives the program that keeps it. From this week on, the demo works on the same station as the lab: you build the **switchboard** live, and the students do the same thing to the **rotation**. After each of your segments you push your finished file, and they copy it in to read and run while they work.

> **The shape of the night:** the loss → the switchboard written down → read back, with one number wrong → a test that catches it, and the fix → a file is a text file. **Each demo segment is followed by the lab task that practices it.**

**Total: ~86 minutes of demo, in six short segments, and six lab blocks between them.** The lesson plan's timing table has the minutes.

---

## 0 · Before class

> [!NOTE]
> **Rehearsing on your class machine? Do it on a throwaway branch, so the class repo is exactly as it was afterwards.** Every command below runs from the VS Code terminal of the class repo, `dotnet-db-coursework`.
>
> **Before the walk:**
>
> ```bash
> git checkout -b week-08-rehearsal
> ```
>
> **After the walk** — back to `main`, and the rehearsal branch is gone with every commit you made on it:
>
> ```bash
> git checkout main
> ```
>
> ```bash
> git branch -D week-08-rehearsal
> ```
>
> Then **delete the `week-08` folder** from the Explorer. Switching to `main` removed the files you committed, but not what the program wrote — `switchboard.json`, `rotation.json`, `bin` and `obj`.
>
> **And empty `demo/week-08/` in the starters repo**, because your rehearsal pushes reached the real one students pull from:
>
> ```bash
> git -C ../dotnet-db-starters rm -r --quiet demo/week-08
> ```
>
> `did not match any files` means it is already empty — skip the next line.
>
> ```bash
> git -C ../dotnet-db-starters commit -m "week 8 demo: reset for class" && git -C ../dotnet-db-starters push
> ```
>
> The student side of a rehearsal needs nothing; that folder is only yours.

- [ ] **Check the published sheet is current.** Open [the hosted cue sheet](https://jgrissom.github.io/dotnet-db-dev/week-08/demo/script.html) and confirm the top line says *the same station they work on*. If it doesn't, the Pages deploy is behind — **the markdown is the truth**; you lose checkboxes and Copy buttons, nothing else
- [ ] ⚠️ **A starters clone you can PUSH to, next to your demo repo.** Tonight you push three files to it. Open `dotnet-db-coursework` in VS Code and use its terminal, which stands at the top of the demo repo. Once per machine:

  ```bash
  git clone https://github.com/jgrissom/dotnet-db-starters.git ../dotnet-db-starters
  ```

  The `../` puts the clone **next to** the demo repo, not inside it. `already exists` means this machine already has one there — skip to the push test. Then prove you can push from it before anybody is watching, from the same terminal:

  ```bash
  git -C ../dotnet-db-starters pull
  ```

  ```bash
  git -C ../dotnet-db-starters push
  ```

  `Everything up-to-date` is the answer you want. A sign-in prompt now is a sign-in prompt you won't get in front of the room
- [ ] ⚠️ **`demo/week-08/` in the starters repo must be empty or missing.** It fills up tonight. If it already has files in it from rehearsing:

  ```bash
  git -C ../dotnet-db-starters rm -r --quiet demo/week-08
  ```

  `did not match any files` means it is already empty — skip the next line.

  ```bash
  git -C ../dotnet-db-starters commit -m "week 8 demo: reset for class" && git -C ../dotnet-db-starters push
  ```

- [ ] **VS Code open on the demo repo's top** — `dotnet-db-coursework`
- [ ] ⚠️ **Delete `week-08/` from the demo repo if you've rehearsed.** Tonight you copy it in fresh, along with everybody else
- [ ] **A browser tab on the lab README** (`week-08/lab/README.md` on GitHub). It is the projector screen for every lab block tonight
- [ ] **Lids down for the demo** — *"Tonight comes in pieces. Lids down while I work, lids up for each lab block in between."*

---

## 1 · The same station

- [ ] 🎯 **Say what changed, plainly:** *"From tonight, I work on the same station you do. KDXR. I'll build one part of it up here. Then you build the matching part, with my code sitting in your project to look at."*
- [ ] 📖 **Then the deal for the night:** *"I build the switchboard. You build the rotation. After each piece I push my file, and you copy it in. You'll see the command."*

---

## Lab A · Setup, together — 10 minutes

- [ ] **Lids up. Put the lab README up in the browser, at *Setup*.** Do steps 1 to 4 on your own machine at the same time as the room, in your demo repo's terminal. You copy week 8 in exactly as they do
- [ ] **Run the checks, and say the number:** *"One out of four. Check 1 is everything the desk already does."*

  ```bash
  dotnet test week-08/Lab.Checks
  ```

- [ ] **Commit the starter, the same commit the README asks of them**

  ```bash
  git add . && git commit -m "week 8: starter"
  ```

- [ ] ⚠️ **Stop at the README's stop note at the end of Setup.** Task 1 comes after §2

---

## 2 · Gone

- [ ] **Run the desk, type a DJ name, then take a request: `r`, caller `Dorothy`, song `1`. Then `c` to look at the switchboard**

  ```bash
  dotnet run --project week-08/Lab
  ```

  ```
  │ CALLER  │ CALLS │ ASKED FOR │
  ├─────────┼───────┼───────────┤
  │ Dorothy │ 4     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  ```

- [ ] 📖 *"Dorothy called. That's her fourth call tonight, and she asked for Nightjar."*
- [ ] **Press `q`. Run it again — DJ name, then `c`**

  ```bash
  dotnet run --project week-08/Lab
  ```

  ```
  │ Dorothy │ 3     │ -         │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  ```

- [ ] 💥 **Do not explain it. Ask, and wait:** *"Where did Dorothy's call go?"*
- [ ] **Press `q`**
- [ ] 📖 **Then be precise, because it is not a bug:** *"The switchboard is in memory. Memory belongs to the program while it runs. The program ended, so the memory went with it. Every program ever written does this."*
- [ ] 📖 **And the tool, one line, no slide:** *"Everything tonight goes through a class called File. One line writes text to a file. One line reads it back."*

---

## Lab B · Task 1 — 8 minutes

- [ ] **Lids up. The lab README, at *Task 1 in full*.**
- [ ] 📖 *"Your desk loses its carts the same way. Task 1: look at the carts, air the hour, and look again. Then quit, start it again, and look one more time. No code. Stop at the stop note at the end of Task 1."*
- [ ] 🎯 **Circulating:** ask *"how many times did Nightjar play tonight?"* The desk says 0, and they aired it a minute ago

---

## 3 · The switchboard, written down *(slide 2)*

- [ ] 🎞️ **GO TO SLIDE 2** — *Where the file actually goes* · *"Before any code, the one thing you can't see on screen. A plain file name is worked out from the folder you were standing in when you started the program. `dotnet run` stands at the top of the repo. `dotnet test` stands inside the build folder. Same name, two different files. So nothing in this course types a file name inside a class. The path gets handed in."*

- [ ] **Back to the editor. Open `week-08/Lab/Program.cs` and <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `switchboard.Save` — one hit.** Put the cursor on it and leave it there
- [ ] 📖 *"Program.cs already calls Save when the shift ends. It passes Save the name of the file to write, switchboardFile. But Save is empty, so nothing gets written."*

- [ ] **Open `week-08/Lab/Switchboard.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public void Save(string path)` — one hit. Select from that line down to and including the `}` directly under its `{`, and paste this over it**

  ```csharp
      public void Save(string path)
      {
          string json = JsonSerializer.Serialize(_callers,
              new JsonSerializerOptions { WriteIndented = true });

          File.WriteAllText(path, json);
      }
  ```

- [ ] 📖 **Two lines, one at a time. Cursor on `Serialize`:** *"The serializer turns the whole list of callers into text. The format is called JSON. WriteIndented puts each property on its own line, so I can read the file."*
- [ ] 📖 **Cursor on `WriteAllText`:** *"WriteAllText puts that text in the file at the path I was handed. If the file isn't there, it makes it."*

- [ ] **Run it: DJ name, `r`, caller `Dorothy`, song `1`, then `q`**

  ```bash
  dotnet run --project week-08/Lab
  ```

- [ ] 🎯 **Open `week-08/switchboard.json` from the Explorer and put it on screen.** Let them look before you say anything

  ```json
  [
    {
      "Name": "Dorothy",
      "CallsTonight": 4,
      "Favorite": {
        "Title": "Nightjar",
  ```

- [ ] 📖 *"There it is. The switchboard, on disk, and it outlived the program. Dorothy, four calls, and the song she asked for. Every property the serializer could read went in."*

- [ ] **Push it — the file, then the commit, then the push.** Silent; they watch

  ```bash
  mkdir -p ../dotnet-db-starters/demo/week-08 && cp week-08/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-08/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 8 demo: the switchboard saves"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

- [ ] 📖 *"My switchboard is in the starters repo now. You copy it into your project, so it's sitting there while you write the rotation's Save."*

---

## Lab C · Task 2 — 20 minutes

- [ ] **Lids up. The lab README, at *Task 2 in full*.** Its first step is pulling your file and copying it in
- [ ] 📖 *"Task 2: first copy my switchboard in, so you can read it. Then write Save for the rotation, and add the two lines in Program.cs that call it. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating:** the question to ask over a shoulder is *"which list are you handing the serializer?"* The answer is `_songs`
- [ ] ⚠️ **If your push is still going when the block starts,** they start Task 2 without your file. Their task doesn't need it; the copy can wait a minute

---

## ☕ Break

---

## 4 · Read back

- [ ] 📖 *"Now the way back in. Load reads the file and turns it back into callers."*

- [ ] **In `Switchboard.cs`, <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public void Load(string path)` — one hit. Select from that line down to and including the `}` directly under its `{`, and paste this over it**

  ```csharp
      public void Load(string path)
      {
          if (!File.Exists(path))
          {
              return;
          }

          List<Caller>? loaded = JsonSerializer.Deserialize<List<Caller>>(File.ReadAllText(path));

          if (loaded == null)
          {
              return;
          }

          _callers.Clear();

          foreach (Caller caller in loaded)
          {
              _callers.Add(caller);
          }
      }
  ```

- [ ] 📖 **Cursor on `File.Exists`:** *"No file means nobody has signed off on this desk yet. That's a first night, not an error. So it just returns."*
- [ ] 📖 **Cursor on `Deserialize<List<Caller>>`:** *"Deserialize builds a brand new list from the text. The type in the angle brackets tells it what to build."*
- [ ] 📖 **Cursor on `_callers.Clear()`:** *"Program.cs adds three callers before it loads. So I empty the switchboard first, then move the loaded callers in."*

- [ ] **Run it: DJ name, then `c`**

  ```bash
  dotnet run --project week-08/Lab
  ```

  ```
  │ Dorothy │ 0     │ -         │
  │ Bex     │ 0     │ -         │
  │ Teodoro │ 0     │ -         │
  ```

- [ ] 💥 **Point at Dorothy's row, then at the file:** *"The file says four calls and Nightjar. The switchboard says zero and nothing."* **Then leave it.** *"Hold on to that zero. It's the next thing we fix."*
- [ ] **Press `q`.** Then open the file again
- [ ] 📖 *"And quitting just wrote the zeros back over the file. Load got the calls wrong, and Save wrote the wrong number to disk."*

- [ ] **Push it.** Silent

  ```bash
  cp week-08/Lab/Switchboard.cs ../dotnet-db-starters/demo/week-08/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 8 demo: the switchboard loads"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab D · Task 3 — 22 minutes

- [ ] **Lids up. The lab README, at *Task 3 in full*.**
- [ ] 📖 *"Task 3: copy my switchboard in again, so you have the Load. Then write Load for the rotation, add the one line in Program.cs that calls it, and prove it reads the file by changing a title by hand. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulating: look for a rotation with six carts.** That is a `Load` with no `Clear()`
- [ ] 🎯 **And for a `Load` that never moves the songs in.** Ask *"where do the loaded songs end up?"*

---

## 5 · The number that came back wrong *(slide 3)*

- [ ] 📖 *"Before I fix the zero, I write it down as a test, and I see it red first."*

- [ ] **In the Explorer, right-click `week-08/Lab.Tests` → New File → `SwitchboardTests.cs`, and paste this in**

  ```csharp
  // Your instructor's fact, written in class before the fix — red first.

  namespace Lab.Tests;

  public class SwitchboardTests
  {
      [Fact]
      public void ACallerRemembersTheirCalls()
      {
          string path = Path.Combine(Path.GetTempPath(), "kdxr-demo-switchboard.json");
          File.Delete(path);

          Caller dorothy = new Caller("Dorothy");
          dorothy.Calls();
          dorothy.Calls();
          dorothy.Calls();
          dorothy.Calls();

          Switchboard board = new Switchboard();
          board.Add(dorothy);
          board.Save(path);

          Switchboard reopened = new Switchboard();
          reopened.Load(path);

          Assert.Equal(1, reopened.Count);
          Assert.Equal(4, reopened.Find("Dorothy")!.CallsTonight);
      }
  }
  ```

- [ ] 📖 **Cursor on the `path` line:** *"The test gets a file of its own, in the folder the system keeps for scratch files. It never touches the desk's real file. That only works because Save takes a path."*
- [ ] 📖 **Cursor on `Switchboard reopened = new Switchboard();`:** *"This is the restart. A second switchboard, holding nothing, reads the same file. Loading into the one that just saved would prove nothing."*
- [ ] 🎯 **Ask for the color before you run it, and wait for an answer.** *"Red or green?"*

  ```bash
  dotnet test week-08/Lab.Tests
  ```

  ```
    Assert.Equal() Failure: Values differ
  Expected: 4
  Actual:   0
  ```

- [ ] 📖 *"Red. Four calls went into the file, and zero came back."*

- [ ] 🎞️ **GO TO SLIDE 3** — *What a serializer won't read back* · *"Here's why. A serializer writes every property it can read. It reads back only the ones it can write. CallsTonight has a private setter, so nothing outside the class can change it. That includes the serializer."*

- [ ] **Back to `Caller.cs`. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public int CallsTonight` — one hit. Select that one line and paste this over it**

  ```csharp
      [JsonInclude]
      public int CallsTonight { get; private set; }
  ```

- [ ] 📖 *"JsonInclude tells the serializer it may set CallsTonight when it reads the file. The setter stays private. Nothing else in the program can change it."*
- [ ] **And the request, which has the same problem. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public Song? Favorite` — one hit. Select that one line and paste this over it**

  ```csharp
      [JsonInclude]
      public Song? Favorite { get; private set; }
  ```

- [ ] 📖 *"Favorite has a private setter too. Every sealed property you want back needs the attribute."*
- [ ] **Last, the using. <kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd> for `public class Caller` — one hit. Select that one line and paste this over it**

  ```csharp
  using System.Text.Json.Serialization;

  public class Caller
  ```

- [ ] **Run the tests again**

  ```bash
  dotnet test week-08/Lab.Tests
  ```

  ```
  Total tests: 3
       Passed: 3
  ```

- [ ] 📖 *"Green. From now on, every run of the suite checks that a caller's calls survive a restart."*

- [ ] **Now the desk. Throw the file away, so it starts from a clean night**

  ```bash
  rm week-08/switchboard.json
  ```

- [ ] **Run it: DJ name, `r`, caller `Dorothy`, song `1`, then `q`**

  ```bash
  dotnet run --project week-08/Lab
  ```

- [ ] **Run it again: DJ name, then `c`**

  ```bash
  dotnet run --project week-08/Lab
  ```

  ```
  │ Dorothy │ 4     │ Nightjar  │
  │ Bex     │ 1     │ -         │
  │ Teodoro │ 1     │ -         │
  ```

- [ ] 🎯 *"Four calls and Nightjar, after a restart. The switchboard remembers the night."*
- [ ] **Press `q`**

- [ ] **Push both files.** Silent

  ```bash
  cp week-08/Lab/Caller.cs week-08/Lab.Tests/SwitchboardTests.cs ../dotnet-db-starters/demo/week-08/
  ```

  ```bash
  git -C ../dotnet-db-starters add demo && git -C ../dotnet-db-starters commit -m "week 8 demo: callers keep their calls, and the fact that proves it"
  ```

  ```bash
  git -C ../dotnet-db-starters pull --rebase && git -C ../dotnet-db-starters push
  ```

---

## Lab E · Task 4 — 30 minutes

- [ ] **Lids up. The lab README, at *Task 4 in full*.**
- [ ] 📖 *"Task 4 is what I just did, on the rotation. Copy my two files in first. Then see the play count come back as zero, write your fact first, see it red, then fix it. Stop at the stop note after the commit."*
- [ ] 🎯 **Circulate hard — this is the lab's payoff.** The wrong reflex to catch is going straight to `Song.cs`. Ask *"what color is your test right now?"*
- [ ] 🎯 **And watch for a fact that loads into the same rotation it saved.** Ask *"where's your second rotation?"*

---

## ☕ Break

---

## 6 · A file is a text file

- [ ] 📖 *"One more thing, and it's the honest half of tonight."*
- [ ] **Open `week-08/switchboard.json`, change Dorothy's `"CallsTonight"` to `500`, and save the file.** Say what you're doing while you do it: *"I'm the overnight DJ. I have the switchboard file open in a text editor. I'd like Dorothy to look busier."*
- [ ] **Run it: DJ name, then `c`**

  ```bash
  dotnet run --project week-08/Lab
  ```

  ```
  │ Dorothy │ 500   │ Nightjar  │
  ```

- [ ] 🎯 **Flat, and do not rush it:** *"Five hundred calls. Nothing crashed. Nothing warned. The desk believes the file."*
- [ ] 📖 **Then the forward line:** *"A file is a text file, and anybody who can open it can change what the program believes. Week ten, the data stops living on this laptop. Week thirteen, we deal with a file that's damaged rather than edited."*
- [ ] **Press `q`**
- [ ] 🎯 **Define done on their machine:** *"You're done when `dotnet test week-08/Lab.Checks` says four out of four. And when you quit the shift and start it again, `PLAYED` still says how many times each cart went out."*

---

## Lab F · Finish, or try to break it — 19 minutes

- [ ] **Lids up. The lab README.** Anyone not finished works on their next task. Anyone finished goes to *Now try to break it* — one item there is §6 done to their own file — then *⭐ Done early?*
- [ ] ⚠️ **Stop at 3:35 on the timing table, wherever the room is.** Whatever is left finishes at home

---

## 7 · Wrap *(slide 4)*

- [ ] 🎞️ **GO TO SLIDE 4** — *Tonight, in one picture* · *"A file is a place to put text, and File does each direction in one line. The serializer turns a list into text and back. The path is handed in. No file means a first night. A private setter needs JsonInclude to come back. And a save file is a text file that anybody can edit."*
- [ ] 🎯 **The forward line:** *"Your data survives now, and it survives on your laptop. It's one file, on one machine. In week ten it moves somewhere other machines can reach."*
- [ ] **One question about tonight's format, before anyone packs up.** Anonymous, one tap: *the pace tonight felt too slow · about right · too fast · I got lost somewhere*. The lesson plan says where the question lives
- [ ] **Homework: your project repo URL in Canvas, and only that one**
- [ ] 📖 **Say what the homework is** — *"The homework is tonight's lab again, on your own project. Same four tasks, same order. If you finished the lab, you've done every step once."*
- [ ] ⚠️ **Say the branch line out loud** — *"Your homework goes on a branch, same as every week. Nothing goes straight to main."*
- [ ] ⚠️ **Say the checks line out loud** — *"Part 1 copies this week's checks in, same as always. This week there are FOUR of them. If `dotnet test Project.Checks` shows two, you're running last week's."*
- [ ] ⚠️ **And say the date, because this one is different** — *"There's no class next week. It's the term break. So this homework is due two weeks out, not one. It's not a bigger homework. It's the same size with a week off in the middle of it."*
