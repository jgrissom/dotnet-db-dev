# Week 5 Lab — The Switchboard 📻

It's 3 AM at **KDXR 88.1, "The Owl."** Last week the desk learned to protect a cart — one playable thing, one song or jingle or ad, short for the *cartridge* of looped tape it used to arrive on. Tonight it has to tell three **people** apart.

The switchboard is the panel the calls come in on — one line per person who has rung tonight, and how many times. Dorothy has rung four times, the way she does. Bex once, for the one artist she ever asks for. Teodoro once, at 03:20, for Junie.

The board says all three of them have called **six** times.

**Time:** ~50 minutes in class — **target tonight: all five green, and a switchboard that can count.**

> [!NOTE]
> **Missed a week?** You're not behind. `Broadcast.cs`, `Song.cs` and `Rotation.cs` all ship **already finished**, and everything tonight happens in two new files.

## Setup

Three steps, all from the **one VS Code window you keep all semester** — open on `dotnet-db-coursework`, the top of your repo.

**1. Confirm your coursework window is open.** If VS Code is already showing `dotnet-db-coursework` from last week — done, skip to step 2. Otherwise: **File → Open Folder → `dotnet-db-coursework` → Open.**

> [!NOTE]
> **No `dotnet-db-coursework` folder at all?** Then you're starting from scratch, which is fine — [week 1's setup guide](../../week-01/setup-guide.md) makes it and connects it to GitHub. Do that first; nothing tonight depends on having been here last week.

**2. Update your starters clone — from the terminal you already have.** `` Ctrl+` `` (it opens standing at the top of your repo), then:

```bash
cd ../dotnet-db-starters
git pull
cd ../dotnet-db-coursework
```

One hop sideways into the clone, pull, hop back.

> [!NOTE]
> **`cd: no such file or directory`?** You haven't cloned it. From the same terminal:
> ```bash
> cd ..
> git clone https://github.com/jgrissom/dotnet-db-starters.git
> cd dotnet-db-coursework
> ```
> Now the two folders sit side by side, and the pull above will work every week after.

**3. Copy this week in — one command, from the same terminal.**

You haven't moved: step 2 left you standing at the top of your repo, which is exactly where this runs.

```bash
cp -r ../dotnet-db-starters/week-05 .
```

The `.` on the end means **right here** — the top of your repo. Nothing to find, nothing to drag. Same line on Mac and Windows.

> [!CAUTION]
> **Run it once.** If a `week-05` folder is already there, this replaces what's inside it — **your own work included, without asking**.

<details>
<summary><b>Command didn't work, or you need a do-over?</b> Your file manager does the same job — and it asks first.</summary>

1. Open `dotnet-db-starters`. It holds nothing but week folders — find **`week-05`**.
2. **Copy** it (⌘C / Ctrl+C) — **not a drag**, which *moves* it out of the clone.
3. Open `dotnet-db-coursework` → **Paste**.

</details>

It appears in your VS Code Explorer immediately — the folder is there and you can open the files:

```
dotnet-db-coursework/      ← your VS Code window, all semester
├─ week-01/
├─ week-02/
├─ week-03/
├─ week-04/
└─ week-05/                ← the folder you just copied in
   ├─ Lab/                 ← the switchboard — tonight's work happens in here
   └─ Lab.Checks/          ← the lab's checks — read-only, never edit
```

> [!TIP]
> **Reload the window now, before you start.** Command Palette (<kbd>⇧⌘P</kbd> / <kbd>Ctrl⇧P</kbd>) → **`Developer: Reload Window`**.
>
> VS Code worked out which projects exist **when you opened the folder**, and `week-05` did not exist then. Reloading takes five seconds and saves you two things: red squiggles on perfectly good code, and — in Task 2 — a debugger that cannot find this week's project. **`.NET: Restart Language Server` looks like the right command and does not fix it.**

> [!IMPORTANT]
> **Two folders, not four — same as last week.** Your homework lives in your **project repo**, in its own window. [`homework.md`](../homework.md) picks up there, and this lab is the worked example for it.

**Then run the checks** — from the terminal, naming the week:

```bash
dotnet test week-05/Lab.Checks
```

**1 / 5 passing.** Check 1 is weeks 1–4, shipped finished and still on the air. The other four are tonight.

**Commit that before you change anything** — it's the week exactly as you were handed it, and it makes every later commit obviously *your* work. Source Control view: stage (**+**), paste, **✓ Commit**, **Sync**.

```
week 5: starter
```

> [!NOTE]
> **Nobody grades these commits.** The lab is never collected — this is practice with the safety on. [The homework counts its own](../homework.md#commit-as-you-go), separately.

> [!CAUTION]
> **Every command names its week.** Your terminal always stands at the top of your repo — so it's `dotnet test week-05/Lab.Checks` and `dotnet run --project week-05/Lab`, with the week in front. Forget the week and you'll get `MSB1003` — it just means the command couldn't see a project from the top; add the week and go again.

## Where tonight's work happens

Two files, and you should open both before you start.

| File | What it is |
|---|---|
| `Lab/Caller.cs` | **One person who rang.** It ships with the bug the demo spent twenty minutes on. Tasks 2 and 5 are in here. |
| `Lab/Switchboard.cs` | **Who has rung tonight.** Same shape as last week's `Rotation` — a class that owns a private list. The three members you wrote last week ship finished; Tasks 3 and 4 add the two new ones. |
| `Lab/Program.cs` | The shift. **You don't change this** — but you run it after every task, because it's where you find out what you actually did. |
| `Lab/Song.cs`, `Lab/Rotation.cs`, `Lab/Broadcast.cs` | Weeks 1–4, finished. Don't touch them; check 1 goes red if you do. |

## The tasks

**Commit every time a check goes green.** Three clicks in the Source Control view, and each task below hands you the message to paste.

| # | Check | What to do |
|---|-------|------------|
| 1 | *(check 1 is already green)* | Work a shift and look at the switchboard. No code. **[Task 1 in full ↓](#task-1-in-full)** |
| 2 | `EveryCallerKeepsTheirOwnCount` | Take the `static` off, and give every caller a count of their own. **[Task 2 in full ↓](#task-2-in-full)** |
| 3 | `TheSwitchboardFindsARegular` | `Find` hands back the caller — or **nothing**, when nobody has rung by that name. **[Task 3 in full ↓](#task-3-in-full)** |
| 4 | `TheDeskTakesACallFromAnybody` | `Take` copes with both: a regular, and somebody who has never rung. **[Task 4 in full ↓](#task-4-in-full)** |
| 5 | `AndRemembersWhatTheyAskedFor` | What they asked for — and `null` until they've asked for anything. **[Task 5 in full ↓](#task-5-in-full)** |

---

### Task 1 in full

Nothing to write. Work a shift and look at it.

```bash
dotnet run --project week-05/Lab
```

Type a DJ name, then press `c` to redraw the switchboard, then `q`.

```
╭─────────┬───────┬───────────╮
│ CALLER  │ CALLS │ ASKED FOR │
├─────────┼───────┼───────────┤
│ Dorothy │ 6     │ -         │
│ Bex     │ 6     │ -         │
│ Teodoro │ 6     │ -         │
╰─────────┴───────┴───────────╯
3 on the switchboard.
```

**Six each.** `Program.cs` seeds the night before the shift starts and you can read the calls for yourself: Dorothy four times, Bex once, Teodoro once. That's six calls between three people, and every row is reporting all of them.

Now open `Lab/Caller.cs` and read the top of it. The count is behind a `static` field — one number for the whole program, [exactly like the crew tally on the demo's board](../lecture-notes.md#the-word-you-have-been-typing-to-make-the-error-go-away).

---

### Task 2 in full

**Check:** `Check2_EveryCallerKeepsTheirOwnCount`

Open `Lab/Caller.cs`. Three lines ship there and all three come out:

```csharp
private static int _calls;

public int CallsTonight => _calls;

public void Calls()
{
    _calls++;
}
```

Replace them with [the shape you already wrote last week for `PlaysTonight`](../lecture-notes.md#what-static-actually-says) — a property anybody can read and nobody outside the class can write, and a method that is the only thing that moves it. **It's in your own `week-04/Lab/Song.cs` if you want to look at it.**

Two things the check is exact about, because they're what the shift reads by:

- the property is called **`CallsTonight`**, it's an `int`, and it has **no public setter**
- the method is called **`Calls()`**, and it **adds one** rather than setting one

> [!WARNING]
> **Delete the field.** An instance property already has a field of its own — one per object — so a `_calls` left behind is just the bug with a property in front of it. That's the whole lesson: [the word is the difference](../lecture-notes.md#what-static-actually-says), not the punctuation.

**Run the shift** — DJ name, then `c`, then `q`:

```bash
dotnet run --project week-05/Lab
```

```
╭─────────┬───────┬───────────╮
│ CALLER  │ CALLS │ ASKED FOR │
├─────────┼───────┼───────────┤
│ Dorothy │ 4     │ -         │
│ Bex     │ 1     │ -         │
│ Teodoro │ 1     │ -         │
╰─────────┴───────┴───────────╯
3 on the switchboard.
```

**Three people, three numbers.** Same six calls, same seed data, one word deleted.

**Then the checks:**

```bash
dotnet test week-05/Lab.Checks
```

**2 / 5.**

> [!TIP]
> **Two minutes with the debugger, and it's worth them.** Click the gutter beside `CallsTonight++` in `Calls()` — the narrow strip left of the line numbers — and press <kbd>F5</kbd>. Choose **C#** if it asks which debugger.
>
> ⚠️ **Then a project list appears, and it is genuinely hard to read — type `week-05` to filter it.** Every entry is the project name followed by its **full path**, which runs off the end of the box, and by now you have **eight** of them: a `Lab` in every week, and a `Homework` in weeks 1–3 as well. They look identical until you narrow them. **Typing `week-05` leaves exactly one.**
> *(No `week-05` in the list at all? You skipped the window reload in Setup — do that now and try again.)*
>
> Now expand `this` in the **Variables** pane each time it stops. `this` is a different caller every time, and the line moves that one's number and nobody else's. [The full drill is in the notes.](../lecture-notes.md#the-debugger-and-what-it-is-actually-for) Take the breakpoint off and <kbd>Shift</kbd>+<kbd>F5</kbd> when you're done.

**Green? Commit it:**

```
week 5 lab: every caller keeps their own count
```

---

### Task 3 in full

**Check:** `Check3_TheSwitchboardFindsARegular`

Open `Lab/Switchboard.cs`. `Add`, `Count` and `All` ship finished — they're last week's, unchanged. `Find` is yours:

```csharp
public Caller? Find(string name)
{
    foreach (Caller caller in _callers)
    {
        if (caller.Name == name)
        {
            return caller;
        }
    }

    return null;
}
```

[Two things in there are the week](../lecture-notes.md#nothing-at-all), and neither is the loop:

- **`Caller?`, with a question mark.** Every method you've written so far promises something comes back. This one is allowed to come back empty-handed, and the `?` is you saying so.
- **`return null;` goes *after* the loop.** Move it inside and the method gives up on the first caller whose name doesn't match — which looks perfectly reasonable and finds exactly one person.

It also hands back **the caller it found**, never a new one with the same name. [A copy is a dead end](../lecture-notes.md#two-names-one-object): every call taken through it lands on a record nobody is looking at.

> [!NOTE]
> **Don't bother running the shift after this one — nothing will look different.** You've written `Find`, and nothing calls it yet. That's Task 4's job, and writing a method and wiring it in are two separate acts.

**Just the checks this time:**

```bash
dotnet test week-05/Lab.Checks
```

**3 / 5.**

**Green? Commit it:**

```
week 5 lab: the switchboard finds a regular
```

---

### Task 4 in full

**Check:** `Check4_TheDeskTakesACallFromAnybody`

Still in `Lab/Switchboard.cs`. `Take` is the one door for *"somebody is on the line"*, and it has to work for both kinds of caller.

It ships as `return new Caller(name);` — a brand-new stranger every single time, which is why a request never lands on the board.

Write it so that:

- it **asks `Find` first**. A caller who comes back is the one to use — don't make a second Dorothy.
- when `Find` [hands back `null`](../lecture-notes.md#null-is-an-answer-not-a-failure) this really is somebody new: make a `Caller`, and **`Add` them to the board** — otherwise they vanish the moment the method returns.
- **the call gets counted either way.** Both roads end in the same place, so `Calls()` goes after the `if` rather than inside one branch of it.
- the caller comes back out, so the desk can take their request.

> [!TIP]
> **The whole method is a `Find`, an `if`, a `Calls()` and a `return`** — and [the worked version of that shape is in the notes](../lecture-notes.md#taking-one-off-the-books), doing the opposite job.

**Run the shift.** Press `r`, type `Dorothy`, then `r` again and type `Ray`, then `q`:

```bash
dotnet run --project week-05/Lab
```

```
╭─────────┬───────┬───────────╮
│ CALLER  │ CALLS │ ASKED FOR │
├─────────┼───────┼───────────┤
│ Dorothy │ 5     │ -         │
│ Bex     │ 1     │ -         │
│ Teodoro │ 1     │ -         │
│ Ray     │ 1     │ -         │
╰─────────┴───────┴───────────╯
4 on the switchboard.
```

**Dorothy went to 5 and Ray appeared on 1.** One method, two completely different nights, and the `if` is the only thing telling them apart.

**Then the checks:**

```bash
dotnet test week-05/Lab.Checks
```

**4 / 5.**

**Green? Commit it:**

```
week 5 lab: the desk takes a call from anybody
```

---

### Task 5 in full

**Check:** `Check5_AndRemembersWhatTheyAskedFor`

Back to `Lab/Caller.cs`, and the ASKED FOR column that has said `-` all night.

Two members, and they ship as `public Song? Favourite => null;` and an empty `Asks`:

- **`Favourite`** — a `Song?`, readable by anybody, writable by nobody outside the class. [A caller that holds a song](../lecture-notes.md#a-class-that-holds-another-class) is the same shape as a sign-out that holds a crew member. A caller who has just rung hasn't asked for anything, and [`null` is the honest answer](../lecture-notes.md#null-is-an-answer-not-a-failure) rather than a made-up song.
- **`Asks(Song song)`** — one line. Keep the song you were **handed**, not a new one built from it: the song you were handed is the actual cart in the rotation, so its play count is the real one.

> [!WARNING]
> **Do not count the call in `Asks`.** `Take` already counted it when it put them on the line — count it again here and every regular goes up by two for one phone call. The check asserts that it doesn't. **One rule, one place.**

**Run the shift.** `r` / `Dorothy`, then `r` / `Ray`, then `q`:

```bash
dotnet run --project week-05/Lab
```

```
╭─────────┬───────┬─────────────╮
│ CALLER  │ CALLS │ ASKED FOR   │
├─────────┼───────┼─────────────┤
│ Dorothy │ 5     │ Nightjar    │
│ Bex     │ 1     │ -           │
│ Teodoro │ 1     │ -           │
│ Ray     │ 1     │ Slack Water │
╰─────────┴───────┴─────────────╯
4 on the switchboard.
```

Bex and Teodoro still read `-`, and that's right — they rang before the shift started and nobody wrote down what they wanted. **The dash is a `null` you can see**, and `Program.cs` draws it with `caller.Favourite?.Title ?? "-"`, which is [both shorthands in one line](../lecture-notes.md#asking-before-you-use-it).

**Then the checks:**

```bash
dotnet test week-05/Lab.Checks
```

**5 / 5.**

**Then clock out — commit the shift**, the same way you did after Tasks 2, 3 and 4:

```
week 5 lab: and remembers what they asked for
```

**That's five commits, and you didn't set out to make any of them** — you saved every time you got somewhere solid.

---

## Now try to break it

The shift is yours. Spend the last few minutes actually attacking it:

```bash
dotnet run --project week-05/Lab
```


- Ring in as `Dorothy` five more times. Does the board grow a second Dorothy?
- Ring in as `dorothy`, lower case. What happens, and is that right? (There's no wrong answer — decide what a desk should do.)
- Press `r` and type **nothing** at the caller prompt.
- Ring in as `[hold music]` — square brackets and all.
- Press `p` a few times, then `r` from Bex, then look at what Bex asked for.

> [!TIP]
> **Found something odd?** That's the best possible outcome and it's worth a minute. Is it a `Find` that gives up early, a `Take` that counts in the wrong place, or a genuine design question about what a switchboard *should* do?

## ⭐ Done early?

1. **`Regular`.** Add a computed property — no field behind it, same shape as `Length` last week — that says whether a caller has rung three times or more, and put a ★ on their row.
2. **The desk stops making strangers.** `Take` currently signs up anybody. Make it refuse a blank name, so the "somebody who didn't say" rows stop landing on the board.
3. **Busiest of the night.** Give `Switchboard` a `Caller? Busiest()` — and think hard about what it hands back when nobody has rung at all. That question mark is doing real work.
4. ⭐ **The one that pays off later:** give `Switchboard` a `TotalCalls` that loops every caller adding up their count — [the same shape as the demo's day-total](../lecture-notes.md#where-the-days-total-actually-goes), and a fact about the *board* rather than about any one caller. In **week 9** that entire loop becomes one line.

## 🆘 Stuck?

| What you see | What it means |
|---|---|
| `MSB1003: Specify which project` | You're at the top of your repo and didn't name the week. `dotnet test week-05/Lab.Checks`. |
| `CS0176: ... cannot be accessed with an instance reference` | Something is still `static` and you're reading it off a caller. [The word is the whole difference.](../lecture-notes.md#what-static-actually-says) |
| Not sure whether `static` is just bad, then | It isn't — [there are two on your screen right now that are right](../lecture-notes.md#when-static-is-right), and the test that decides it is one sentence. |
| `CS0120: An object reference is required` | The opposite — you named the class where you needed one caller. It's asking **which one**. |
| Every caller shows the same number | The `static` field is still there behind `CallsTonight`. Delete it; an instance property brings its own. |
| `CS0103: The name '_calls' does not exist` | You deleted the field but something still reads it. `CallsTonight` and `Calls()` should both name the property now. |
| `CS8603: Possible null return` | Your `Find` returns `null` but its type has no `?`. It's `Caller?`, not `Caller`. |
| `CS8602: Dereference of a possibly null reference` | You used something that might be nothing without asking first. [Ask, then use it](../lecture-notes.md#asking-before-you-use-it) — and it is [a warning, not an error](../lecture-notes.md#the-warning-that-was-already-there), so it builds and still crashes. |
| `NullReferenceException` when you press `r` | `Take` handed back nothing. It returns `Caller`, not `Caller?` — there is always a caller by the time it's done, because it makes one when it has to. |
| `Find` only ever turns up the first caller | `return null;` is inside the loop. It goes after it. |
| The board grows a second Dorothy every time she rings | `Take` isn't asking `Find` first, or it's adding a caller and returning a different one. Make it once, `Add` that one, return that same one. |
| Dorothy goes up by two for one call | `Asks` is calling `Calls()` as well as `Take`. One rule, one place. |
| ASKED FOR stays `-` after a request | `Asks` isn't storing the song, or `Favourite` is still the shipped `=> null`. |
| Breakpoints never stop | Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd>. `.NET: Restart Language Server` does not fix it. |
| <kbd>F5</kbd>'s project list has no `week-05` in it | The editor learned which projects exist when you opened the folder, and this week's did not exist yet. **`Developer: Reload Window`.** |
| Red squiggles on code you just copied in | Same cause, same fix. The compiler is the witness — if `dotnet build week-05/Lab` is clean, the editor is just behind. |
| `dotnet test` passes but the board still looks wrong | Run the program, not just the checks. The checks never look at `Program.cs`, and half of tonight is only visible on the switchboard. |
| Not sure what `static` was even doing | [What `static` actually says](../lecture-notes.md#what-static-actually-says) — one copy for the whole program, and why that broke the board. |
| Not sure why `null` is allowed here at all | [Nothing at all](../lecture-notes.md#nothing-at-all) — the `?`, and the deal it makes with the compiler. |
| Not sure what the debugger is showing you | [The debugger, and what it is actually for](../lecture-notes.md#the-debugger-and-what-it-is-actually-for). |

> [!NOTE]
> **Source Control view empty, or Sync has nowhere to go?** Your repo setup from week 1's homework isn't done — [its Part 2](../../week-01/homework.md#part-2--put-it-under-git-before-you-write-anything-graded) sets the repo up. **The buttons are only a second view of the commands you already know**, so the terminal does the same job whenever they misbehave:
>
> ```bash
> git add .
> git commit -m "week 5 lab: every caller keeps their own count"
> ```

**Prev:** [Week 4 Lab — The Rotation That Fights Back](../../week-04/lab/) · **Next:** [Week 5 Homework — Find One, or Find Nothing](../homework.md)
