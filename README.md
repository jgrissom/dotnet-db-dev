# .NET Database Development — 16-Week Course

Console applications in **C# on .NET 10**, from first program to a real database: the language, objects, collections, unit testing, file I/O, LINQ, and **Entity Framework Core** against **SQL Server** — with **git and GitHub** as a graded outcome, not plumbing.

**Format:** 16 weeks · 1 meeting/week · 3 hours 45 minutes per session
**Prerequisite:** an introductory programming course **in Python**

> [!NOTE]
> **You already know how to program. You do not know C#.** This course leans on that constantly: `list` → `List<T>`, `dict` → `Dictionary<K,V>`, comprehensions → LINQ, `__init__` → constructors, `None` → `null`, `pip` → NuGet, indentation → braces. Every new idea starts from the Python-shaped thing you already have — and names the place that intuition breaks.

## The spine

Everything in this course is one argument, felt rather than asserted:

**Data in memory dies with the process → data in files survives, but querying and safety hurt → data in a database is the payoff.**

You meet the problem in **week 3** — add three records, quit, run it again, they're gone — and it gets answered twice: once with a file in **week 8**, and properly with a database in **week 10**.

## Course Map

| Week | Topic | The payoff moment | Folder | Status |
|------|-------|-------------------|--------|--------|
| 1 | Toolchain: SDK, VS Code, `dotnet new console`, your first program; `git init` → first push to GitHub. The Python bridge opens. | The compiler refuses to run a program that Python would have happily crashed on at line 40 | [`week-⁠01/`](week-01/) | ✅&nbsp;Ready |
| 2 | Types and the compiler (static typing, felt not preached), methods, control flow. Git hygiene: `.gitignore`, commit messages, README | `git status` right after your first build: forty files you never wrote | `week-⁠02/` | 🚧&nbsp;Planned |
| 3 | Collections: `List<T>`, `foreach`, `Dictionary<K,V>` — and **Spectre.Console**, your first NuGet package | Your list becomes a real table in one line of code. Then you quit, run it again, and it's empty | `week-⁠03/` | 🚧&nbsp;Planned |
| 4 | OOP I: classes, properties, constructors. **Semester project starts** — your own topic. Branch → pull request → merge | Your own topic, and the first pull request you merge into your own `main` | `week-⁠04/` | 🚧&nbsp;Planned |
| 5 | OOP II: encapsulation, static vs. instance, composition — and **the debugger's earned slot** | Step into a constructor and watch an object get built, field by field | `week-⁠05/` | 🚧&nbsp;Planned |
| 6 | Interfaces and polymorphism — taught through something you use, not shapes-and-animals | One `foreach` plays a song, a station ID, an ad and a weather bed. Four types, one loop | `week-⁠06/` | 🚧&nbsp;Planned |
| 7 | **Unit testing with xUnit** — and the course's own checks stop being magic | You open the file that has been grading you since week 1, read it, and then write one | `week-⁠07/` | 🚧&nbsp;Planned |
| 8 | File I/O: text, CSV, JSON serialization — your list survives a restart for the first time | Open the save file in a text editor. Then corrupt it by hand and run the program | `week-⁠08/` | 🚧&nbsp;Planned |
| 9 | LINQ over collections — comprehensions, translated; and the honest limits of querying a file | Thirty lines become one. Then: "now do that over 50,000 rows," and the file loses | `week-⁠09/` | 🚧&nbsp;Planned |
| 10 | **EF Core I:** the list moves into a real database — `DbContext`, migrations, and wiring user secrets into a console app by hand | Restart and it's *still there* — round two. And the row is visible from a machine that isn't yours | `week-⁠10/` | 🚧&nbsp;Planned |
| 11 | **EF Core II:** full CRUD from a console app | 🔥 **Fifteen terminals, one shared table, live.** Type it here, watch it appear over there | `week-⁠11/` | 🚧&nbsp;Planned |
| 12 | EF Core III: a second related table, navigation properties, LINQ that runs *as SQL* | The query executes inside the database, not inside your program — and the log proves it | `week-⁠12/` | 🚧&nbsp;Planned |
| 13 | Exceptions and defensive code — the file is missing, the row is gone, the input lies | Every crash you've had since week 1, reproduced on purpose and handled | `week-⁠13/` | 🚧&nbsp;Planned |
| 14 | Schema evolution: additive migrations against live data. Polish and catch-up | Add a column to a table that already has rows, and keep every one of them | `week-⁠14/` | 🚧&nbsp;Planned |
| 15 | ⚡ **Flex week** — team git: branch, pull request, code review, merge conflict. In class, on a throwaway repo, **ungraded**. *In a 15-week semester, this is the week that gets dropped* | Two people, one file, one conflict — resolved in front of everybody | `week-⁠15/` | 🚧&nbsp;Planned |
| 16 | Final project presentations *(individual)* | Somebody's project is playable | `week-⁠16/` | 🚧&nbsp;Planned |

> [!IMPORTANT]
> **The semester project starts in week 4**, on a topic *you* choose, and every week after that extends *that same program*: it grows behavior (5), interfaces (6), tests (7), a save file (8), queries (9), a database (10), full CRUD (11), a second related table (12), and defenses (13). Week 16 presents it.
>
> **Choose a topic that can grow a second, related table by week 12** — reviews for albums, sightings for stations, matches for players. You'll be warned about this again in week 4, but the earlier you know it, the better your topic.
>
> **Every graded artifact in this course is individual**, including the final project. Team git is week 15's in-class lab, on a throwaway repo, where it costs nobody points and nobody's own project gets touched.

## The two worlds

The demo and the lab are deliberately **different programs**, so there is nothing to type along with while Jeff is at the front:

- 🧊 **Haldane Station** *(the demo)* — an Antarctic research base whose duty console is the only interface for five hundred kilometres. It tracks supplies, weather, and who is out on the ice and hasn't checked back in. Watched, not typed.
- 📻 **KDXR "The Owl"** *(the lab)* — the overnight desk at a small radio station: the request queue, the rotation, the caller log, and the dedications. This is the one you build.

Your semester project is neither — it's yours.

## How to use this repo

**Tap/click a week folder** (or the link in the course map above) — each one opens to its own index page with the documents in the order you use them.

**Students:** clone this repo once (`git clone https://github.com/jgrissom/dotnet-db-dev.git`), then `git pull` at the start of each week. Copy the week's `lab/starter/` folder out into your own projects folder and work on the copy — never inside the clone. Slides are also hosted at **https://jgrissom.github.io/dotnet-db-dev/**.

**Instructors** — the weekly rhythm:

1. **Prep (before class):** read `lesson-plan.md` for the timed agenda, then skim `lecture-notes.md` — the expanded, speakable version of the slides, with asides and a troubleshooting appendix.
2. **In class:** present the slides — `slides.md` in VS Code with the **Marp for VS Code** extension, the exported `slides.html` in any browser (`F` for fullscreen, arrow keys — works offline), or the hosted Pages site. Keep the demo cue sheet on a laptop or tablet.
3. **After class:** `homework.md` is the assignment. Lab answer keys, graders and comprehension questions live in the private [dotnet-db-dev-answer-keys](https://github.com/jgrissom/dotnet-db-dev-answer-keys) repo — never in this one.
4. **Short semester?** Week 15 is the designated flex week — drop it in a 15-week run and week 16's presentations become week 15. Nothing later depends on it, nothing graded lives in it, and no promise made in an earlier week is collected in it.

## Weekly Package

Each `week-NN/` folder contains:

- `README.md` — index for that week: what's here, in what order
- `lesson-plan.md` — timed instructor agenda for the 3h45m session *(instructor)*
- `slides.md` — slide deck in GitHub-flavored markdown, one slide per `##` section, Marp-enabled *(projected)*
- `slides.html` — standalone exported deck. Regenerated **automatically** by the `Export and publish slide decks` workflow whenever a `slides.md` is pushed
- `lecture-notes.md` — full lecture content with code examples; the at-home reference *(student-facing)*
- `demo/demo-script.md` — the instructor's cue sheet for the live demo, also published as a [clickable checklist](https://jgrissom.github.io/dotnet-db-dev/)
- `lab/` — in-class lab: `README.md` instructions and `starter/` code, including a read-only `*.Checks` project
- `homework.md` — assignment due before the next session *(student-facing)*
- `points.json` — what each homework check is worth. The grader reads this exact file

## How you're graded

> **`dotnet test` is your guide. Your repo is the grade — and I run the same tests you did.**

Every week ships two check projects, and the difference matters:

| Project | When you run it | Collected? | Worth |
|---|---|---|---|
| `*.Checks` | during the lab, turning red into green | never | **0 points** — it's a guide |
| `*.HomeworkChecks` | on your own homework, before you submit | yes, by me, against your clone | most of the week's points |

The homework checks you run are **byte-for-byte the ones I run**. Nothing about your score should ever be a surprise — if it's green on your machine and your work is pushed, it's green on mine.

Because there's no deployed URL here, **I have to run your code** — which is why homework always requires your logic to live in classes and methods a test can call directly, never only inside an input loop. That's good design anyway, and week 7 is where you find out it's also how the checks themselves work.

**Submitting:** URLs via Canvas.

- **Weeks 1–3:** one **private** coursework repo, a folder per week, with Jeff added as a collaborator. Same repo, same URL, all semester.
- **Weeks 4–16:** that repo *plus* your **public** semester-project repo — your own topic, your own name on it, something you can show someone afterwards.

## Toolchain

- .NET 10 SDK
- VS Code with the **C#** extension (projects are created and run with the `dotnet` CLI; no C# Dev Kit)
- VS Code **SQL Server (mssql)** extension — no local SQL Server install; you connect to the **school SQL Server**, which is reachable off campus and gives every student their own account
- Git + a GitHub account
- [Spectre.Console](https://spectreconsole.net/) from week 3 — your first NuGet package, and the reason the rest of the semester doesn't look like homework

> [!TIP]
> **On a lab PC that wipes itself when it reboots:** global tools and user secrets do not survive. Every week that needs them documents the restore drill, and it is always under a minute. Keep your connection string somewhere that isn't that machine.
