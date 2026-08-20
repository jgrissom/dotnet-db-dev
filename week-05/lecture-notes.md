# Week 5 — Lecture Notes

## How many are there, and what is on the other end?

Every variable you have written is a **name**. Tonight is about what is on the other end of it — and there are only three answers:

- **one thing, yours**
- **one thing, and somebody else is holding it too**
- **nothing at all**

Your intro course gave you the syntax for all three and never once made you look at the difference. It costs a wrong number on a board, a person marked safe who isn't, and a crash at three in the morning — and none of the three is a compiler error.

---

## The word you have been typing to make the error go away

Here is a class. Every member of it is last week's work, applied to a person instead of a sign-out:

```csharp
// Haldane/CrewMember.cs
public class CrewMember
{
    public string Name { get; }

    public int TripsToday { get; private set; }

    public CrewMember(string name)
    {
        Name = name;
    }

    public void GoesOut()
    {
        TripsToday++;
    }
}
```

Three of the six go out once each, and the board is right:

```
│ Okonkwo   │ OUT  │ 1 │
│ Reyes     │ OUT  │ 1 │
│ Lindqvist │ OUT  │ 1 │
```

Now the duty officer asks for one more number: how many trips has the station logged today? The line that reads best is this one, in `Program.cs`:

```csharp
AnsiConsole.MarkupLine($"[{Dim}]{CrewMember.TripsToday} trips logged today.[/]");
```

And it does not compile:

```
error CS0120: An object reference is required for the non-static field,
method, or property 'CrewMember.TripsToday'
```

**Most of us have met this error, and the fix is always the same one.** Put `static` on the thing it is complaining about:

```csharp
// inside CrewMember, replacing the line above
public static int TripsToday { get; private set; }
```

Which produces a second error, on the board's own column:

```
error CS0176: Member 'CrewMember.TripsToday' cannot be accessed with an
instance reference; qualify it with a type name instead
```

So you do what *that* one says too — the column reads `CrewMember.TripsToday` instead of `s.Who.TripsToday` — and it builds. **Zero errors. Zero warnings.**

```
│ Okonkwo   │ OUT  │ 3 │
│ Reyes     │ OUT  │ 3 │
│ Lindqvist │ OUT  │ 3 │
3 people outside.
3 trips logged today.
```

Every one of them went out **once**.

The bottom line is right — three trips were logged today. The three above it are lies, and they came out of the same field. Two compiler messages walked you here and you did exactly what both of them asked.

---

## What `static` actually says

`static` is not a fix, and it is not a way to quiet the compiler down. It says one thing:

> **This member belongs to the class, not to any one thing made from it.**
> One copy. Made once. Alive as long as the program runs.

```csharp
public int TripsToday { get; private set; }
//  one per crew member. Three CrewMembers, three counters.

public static int TripsToday { get; private set; }
//  one per PROGRAM. Three CrewMembers, one counter between them.
```

That is the whole difference, and it is the whole bug. With the word on, `GoesOut()` still runs on one crew member — but the number it moves is the one everybody is reading.

> [!IMPORTANT]
> **`CS0120` is not the compiler recommending `static`. It is the compiler asking *which one did you mean*?**
>
> `CrewMember.TripsToday` names the class. There are six crew members and the class does not know which of them you had in mind — so it asks. **Nearly always the answer is to name one**, not to abolish the lot of them.

### Where the day's total actually goes

The duty officer's question was a real one. It just is not a fact about **a** crew member — it is a fact about the **crew**. So it gets worked out from the crew:

```csharp
// in Program.cs, where the board is drawn
int tripsToday = 0;
foreach (CrewMember c in crew)
{
    tripsToday += c.TripsToday;
}
```

`3` — the same three it said before. That number was never wrong. What `static` broke was the three that were supposed to be about people.

> [!NOTE]
> That loop is nine lines of doing-it-by-hand, and in **week 9** it becomes `crew.Sum(c => c.TripsToday)` — one line. Write the loop now; you will appreciate the one line more for having written it.

---

## When `static` is right

Two things you have used all term are `static`, and both are correct.

**`Conditions`, from week 1:**

```csharp
// Haldane/Conditions.cs — unchanged since week 1
public static class Conditions
{
    public static bool IsSafeToGoOut(double celsius, bool blizzard)
    {
        return celsius > -50 && !blizzard;
    }
}
```

There is nothing to have one of. `Conditions` holds no facts — it is a **rule**. You have never written `new Conditions()` and you never will.

**And `Console`, which is on your screen every single day:**

```csharp
Console.WriteLine("...");
int.TryParse(typed, out int n);
Math.Round(4.55, 1);
```

Several hundred `Console.WriteLine` calls this term, and not one `new Console()`. **There is one console.** That is the entire reason it is static, and it is why you call it by the type's name.

> [!IMPORTANT]
> **The test, and it is the sentence to take home:**
>
> **Is there exactly one of these, ever, in the whole program? → `static`.**
> **Is it a fact about one particular thing? → never.**

A count of how many trips *Reyes* has made is a fact about Reyes. A rule for whether it is safe to go outside is not about anybody.

---

## A class that holds another class

The board used to store a person's **name**:

```csharp
public string Name { get; }
```

A name is a `string`, and a string cannot carry a trip count. So the board stops holding a name and starts holding the person:

```csharp
// Haldane/SignOut.cs
public class SignOut
{
    public string Time { get; }
    public CrewMember Who { get; }        // ← a whole object, not a word
    public string Reason { get; }

    // ...Expected and IsBack, unchanged from last week...

    public SignOut(string time, CrewMember who, string reason, string expected)
    {
        Time = time;
        Who = who;
        Reason = reason;
        Expected = expected;

        Who.GoesOut();
    }
}
```

That is **composition** — an object made partly of another object — and the board now reads through it: `s.Who.Name`, `s.Who.TripsToday`.

The last line of the constructor is the interesting one. **Signing somebody out *is* the trip**, so there is no way to put a row on the board without the count moving, and no way to move the count without a row. That is last week's `private set` doing real work instead of decoration.

> [!NOTE]
> Hold on to this shape. In **week 12** *"a sign-out belongs to a crew member"* stops being a field on an object and becomes a relationship between two tables — and it is the same sentence either way.

### So where is `SignIn`?

There isn't one, and the reason is this week's subject rather than an oversight.

**`SignOut` is not a verb — it is a thing.** One line on the board: a record that somebody went outside, at a time, for a reason. You do not un-write a record. When they come back you do not make a second one; you **finish** the one that is already there, which is what `Back()` does:

```csharp
// inside SignOut
public bool IsBack { get; private set; }

public void Back()
{
    IsBack = true;
}
```

And `CrewMember` needs no `ComesBack()` either. Their trip was counted **on the way out**, and coming back does not change how many times they went.

> [!IMPORTANT]
> **Two objects, two different facts, and each owns the one it can answer for.** The crew member's tally moves when they *leave*; the sign-out's status moves when they *return*. Neither can move the other's — which is `private set` from last week doing the work, one week on and across two classes.

---

## Two names, one object

End of watch. The duty officer takes a copy of the board and walks it, marking people off as they are accounted for. It is a copy, so nothing on the real board can get hurt:

```csharp
// in Program.cs, before the board is drawn
List<SignOut> muster = new List<SignOut>(outside);

foreach (SignOut s in muster)
{
    s.Back();
}
```

```
│ Okonkwo   │ back │
│ Reyes     │ back │
│ Lindqvist │ back │
0 people outside.
```

Okonkwo is on the ice. Reyes is on the ice. Lindqvist is on the ice. The board has just cleared all three, and the next person to read it has no reason to go looking.

### A copy of the list is not a copy of what is in it

`new List<SignOut>(outside)` **is** a real copy. A second list, its own length — empty it and the board is untouched. That is exactly what it was for last week.

What it copied is the **list**. What is *in* it is the same three sign-outs.

```
outside  ──►  [ • , • , • ]
                │   │   │
                ▼   ▼   ▼
              the three SignOut objects
                ▲   ▲   ▲
                │   │   │
muster   ──►  [ • , • , • ]
```

`muster[1]` and `outside[1]` are two names for one record. Write through either name and there is only one thing there to write to.

> [!IMPORTANT]
> **A variable of a class type does not hold the object. It holds a way to reach it.** Assigning one to another — or copying a list of them — copies the *way to reach it*, not the thing at the end.
>
> This is why `All()` returning a copy protected the registry last week and protects nothing inside it tonight. **Both are true at once**, and neither is a bug: a copy of the list is a copy of the list.

The muster's job was to *read*. So it reads:

```csharp
// in Program.cs, under the board — it reads, it never writes
AnsiConsole.MarkupLine($"[{Amber}]Muster - still to account for:[/]");
foreach (SignOut s in muster)
{
    if (!s.IsBack)
    {
        AnsiConsole.MarkupLine($"[{Fg}]  {s.Who.Name}[/] "
            + $"[{Dim}]- {s.Reason}, due {s.Expected}[/]");
    }
}
```

> [!TIP]
> **The rule that comes out of this, and it is worth more than the syntax: don't change what you were handed.** If a method gives you a list of things, reading them is always safe and writing to them is somebody else's data.

---

## Nothing at all

Somebody is heading out and the duty officer types their name. The station has to find them first:

```csharp
// a local function, at the very bottom of Program.cs
CrewMember? Find(string wanted)
{
    foreach (CrewMember c in crew)
    {
        if (c.Name == wanted)
        {
            return c;
        }
    }

    return null;        // ← AFTER the loop
}
```

Two things to notice, and they are the section.

**`CrewMember?`, with a question mark.** Every method you have written so far promises that something comes back. This one walks the crew, and if nobody is called that, the honest answer is *nothing at all*. The `?` is you telling the compiler so.

**`return null;` goes after the loop, not inside it.** Inside, the method gives up on the first crew member whose name doesn't match. That is the single most common bug in this shape and it looks completely reasonable on the page.

### `null` is an answer, not a failure

```csharp
// inside SignSomebodyOut(), the desk action behind `o`
CrewMember? who = Find(name.Trim());

outside.Add(new SignOut("14:57", who, reason.Trim(), expected.Trim()));
```

Type `Reyes` and it works. Type `Reyez` — gloves, minus thirty-nine, one letter — and:

```
Unhandled exception. System.NullReferenceException: Object reference not set
to an instance of an object.
   at SignOut..ctor(String time, CrewMember who, String reason, String expected)
```

`Find` did nothing wrong. It looked, nobody on station is called Reyez, and it said so. **The bug is handing that nothing to the board** — which puts it on a row and then asks it to go outside, because that is what `SignOut`'s constructor does.

### The warning that was already there

That program built. It built with **one warning**:

```
warning CS8604: Possible null reference argument for parameter 'who' in
'SignOut.SignOut(string time, CrewMember who, string reason, string expected)'.

    1 Warning(s)
    0 Error(s)
```

Week 2 said the compiler talks to you long before it stops you. This is the same thing again, and this time it is talking about a crash that has not happened yet — at build time, in the quietest voice it has.

> [!IMPORTANT]
> **This is what the `?` is for, and it is a deal.** Write `CrewMember?` and you have told the compiler *this might be nothing*. From then on it warns you every time you use it without checking. Write `CrewMember` with no question mark and you have promised there is always one — and it will warn you if you ever try to put `null` in it.
>
> **You have been reading `string?` since week 2** on `Console.ReadLine()`, for exactly this reason: reading a line that isn't there gives you nothing, and the `?` has been saying so all along.

### Asking before you use it

```csharp
// inside SignSomebodyOut(), where the bare version was
CrewMember? who = Find(name.Trim());

if (who == null)
{
    AnsiConsole.MarkupLine("Nobody on station by that name. Nothing logged.");
}
else
{
    outside.Add(new SignOut("14:57", who, reason.Trim(), expected.Trim()));
}
```

```
    0 Warning(s)
    0 Error(s)
```

Inside that `else`, the compiler *knows* `who` cannot be null — because you asked. That is the whole deal: say it might be nothing, check, and the nagging stops.

Two shorthands you have already met, now that you know what they are for:

```csharp
string name = Console.ReadLine() ?? "";       // week 1: "or use this instead"
string title = caller.Favourite?.Title ?? "-";
```

- **`??`** — *if the left side is null, use the right side instead.*
- **`?.`** — *if the left side is null, stop here and the whole thing is null.* `caller.Favourite?.Title` asks for the title only if there is a song to ask.

> [!WARNING]
> **`?.` is not a fix; it is a decision.** It says *"nothing here is fine, carry on"*. Where nothing is **not** fine — a missing person, a record that has to exist — an `if` that says so out loud is the better answer, and a `?.` there just moves the problem somewhere harder to find.
>
> Whether some of these should **throw** instead is a real design decision, and it is **week 13's** whole subject.

---

## Finding one, or not finding one

The same shape, in the registry your own project has:

```csharp
// Project/Registry.cs
public ClawMachine? Find(string spot)
{
    foreach (ClawMachine machine in _items)
    {
        if (machine.Spot == spot)
        {
            return machine;
        }
    }

    return null;
}
```

`ClawMachine` is my example — yours is whatever your topic is made of. **What matters is that it hands back the record itself, not a new one built from the same name.** A copy is a dead end: everything you do through it lands on an object nothing else is looking at, and the one in the registry never moves.

> [!NOTE]
> **`Find` compares against the same fact `NewItem` is handed.** `NewItem(string name)` takes a name and puts it somewhere on your record; `Find` has to look at that same property, whatever you called it.

## Taking one off the books

And once you can find one, you can take it off — which is where the `null` has to be dealt with rather than dodged:

```csharp
// inside the same Registry class, under Find
public bool Remove(string spot)
{
    ClawMachine? found = Find(spot);

    if (found == null)
    {
        return false;
    }

    _items.Remove(found);
    return true;
}
```

Three things worth saying about eight lines:

- **It is built on `Find`.** One search, written once. Two copies of the same loop is two places for it to be wrong.
- **It returns `bool` rather than nothing**, so the caller can tell the difference between *"done"* and *"there was nothing by that name"*. Saying so is the whole reason it isn't `void`.
- **`_items.Remove(found)` takes off that one object** — which only works because `Find` handed back the record the list is actually holding. This is *two names, one object* being useful instead of dangerous.

---

## The debugger, and what it is actually for

Most of you have set a breakpoint before. Tonight it does a job some of us have never used it for: not finding a bug — **watching an object come into existence.**

**The drill:**

1. Click the **gutter** — the narrow strip left of the line numbers — beside a line. A red dot appears.
2. Press <kbd>F5</kbd>. If it asks which debugger, choose **`.NET 5+ and .NET Core`**.
3. **A project list appears — type the week to filter it.** Every entry is the project name followed by its **full path**, and you have a `Lab` in every week, so they look the same until you narrow them: type `week-05` and only this week's are left.
   - ⚠️ **Not there at all?** VS Code learned what was in this folder when you opened it, and that week arrived later. Command Palette → **`Developer: Reload Window`**.
4. It stops **on** the line, and that line **has not run yet**.
5. Expand `this` in the **Variables** pane, top of the **Run and Debug** view.
6. <kbd>F10</kbd> steps over one line · <kbd>F5</kbd> continues · <kbd>Shift</kbd>+<kbd>F5</kbd> stops.

Put the breakpoint on `Name = name;` inside `CrewMember`'s constructor and you get this:

```
this.Name        null
this.TripsToday  0
```

**A crew member with no name.** The object exists — it has fields, it has an address — and not one of its facts is true yet. `new` made the box; the constructor fills it. Step once and `Name` becomes `"Lindqvist"`.

Continue, and it stops on the same line again — with `Name` back to `null`. That is not the same object reset. It is a **different object**, with its own fields.

Then move the breakpoint to `TripsToday++` inside `GoesOut()` and continue three times. Every time, `this` is a different crew member, and the line moves that one's counter and nobody else's.

> [!IMPORTANT]
> **That is `static` versus instance, visible.** One line of code, `TripsToday++`, and which number it moves depends entirely on which object `this` is pointing at. Put `static` back on and there is only ever one number to move.

> [!NOTE]
> **Two things happen the first time you do this, and both are worth understanding rather than clicking past.**
>
> **VS Code writes you a `.vscode` folder** — `launch.json` (what to debug) and `tasks.json` (build it first). You didn't write those and you should keep them; it's how the editor remembers.
>
> **And it asked you which project**, because this folder holds a whole semester — eight programs by now. ⭐ **Your own project repo holds exactly one**, so there you press <kbd>F5</kbd>, pick the debugger once, and never see that list again. **The list is the price of keeping sixteen weeks in one folder, not something the debugger normally does.**
>
> When the config ends up aimed at the wrong week, open `.vscode/launch.json` and change the week in it — or delete the folder and press <kbd>F5</kbd> again to have it rewritten.

> [!TIP]
> **From now on, when a value is not what you think it is, this is faster than adding a `Console.WriteLine`** — and unlike a print, it shows you everything on the object rather than the one thing you thought to ask for. Weeks 10 and 11 assume you have it.

---

## 🔧 Troubleshooting

| What you see | What it means |
|---|---|
| `CS0120: An object reference is required for the non-static field...` | You named the class where you needed a thing — `CrewMember.TripsToday` instead of `reyes.TripsToday`. It is asking **which one**. Answer it by naming one; adding `static` answers a different question. |
| `CS0176: ... cannot be accessed with an instance reference` | The opposite: the member is `static`, so it belongs to the class and there is no "which one". If it is a fact about one thing, the `static` is what's wrong, not the line reading it. |
| Every object reports the same number | A `static` field behind an instance property. One copy for the whole program — take the word off and give each object its own. |
| `NullReferenceException: Object reference not set to an instance of an object` | You used something that turned out to be nothing. Look for the last thing that could have handed you a `null` — usually a `Find`-shaped method — and check it before you use it. |
| `CS8602: Dereference of a possibly null reference` | The same crash, before it happens. Something is declared with a `?` and you used it without asking. This is a warning and not an error, so it will build and it will still crash. |
| `CS8604: Possible null reference argument` | The same thing, one step further out — you handed something that might be nothing to a method or a constructor, which is what the demo's board did. |
| `CS8600: Converting null literal or possible null value to non-nullable type` | You put a possibly-null value into a variable that promised not to be null. Either add the `?` to the variable's type, or deal with the null with `??`. |
| `CS8603: Possible null return` | Your method's return type has no `?` but one path returns `null`. If nothing-at-all is a legitimate answer, the type wants the question mark: `CrewMember?`. |
| `Find` always hands back the first record, or crashes on an empty list | `return null;` is inside the loop instead of after it, or the method reaches into the list (`_items[0]`) rather than walking it. |
| A change made through a "copy" shows up on the original | It copied the list, not the things in the list. Both names point at the same objects — read them, don't rewrite them. |
| <kbd>F5</kbd>'s project list does not contain the week you are working in | The editor worked out which projects exist **when you opened the folder**, and that week's project did not exist yet — a `dotnet new`, or a folder you copied in since. Command Palette → **`Developer: Reload Window`**. |
| Breakpoints are grey / hollow and never stop | The language server is asleep rather than the breakpoint being wrong. Command Palette → **`Developer: Reload Window`**, then <kbd>F5</kbd> again. `.NET: Restart Language Server` does **not** fix this. |
| <kbd>F5</kbd> asks a question you did not expect | With several projects in one folder it asks which one to launch. That is normal — pick the week you are working in. |
