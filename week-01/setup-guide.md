# Week 1 — Setup Guide

**Most of this is probably already on your machine from your C# course.** So this is a *verification* guide first and an install guide second: run the four checks below, and only read the section for anything that fails.

## Start here — the four checks

Open a terminal (**PowerShell** on Windows, **Terminal** on macOS) and run these:

```bash
dotnet --version
git --version
git config --global user.name
```

You want, in order: a version starting with **`10.`**, any git version, and **your own name**. Then open **VS Code** and confirm the **C#** extension by Microsoft is installed.

| Result | Go to |
|---|---|
| `dotnet` missing, or a version below `10.` | [1. The .NET 10 SDK](#1-the-net-10-sdk) |
| VS Code not installed | [2. Visual Studio Code](#2-visual-studio-code) |
| No **C#** extension | [3. The C# extension](#3-the-c-extension) |
| `git` missing, or `user.name` prints nothing | [4. Git, and telling it who you are](#4-git-and-telling-it-who-you-are) |
| **All four passed** | Skip straight to [5. GitHub](#5-github-an-account-your-coursework-repo-and-the-course-repo) — **nobody gets to skip that one** |

> [!IMPORTANT]
> **Section 5 is not an install and it is the one that gets skipped.** Everybody does it, including the people who passed all four checks above: a private repo, me added as a collaborator, **a `dotnet-db-coursework` folder on your machine**, and a clone of the course repo. Tonight's lab *begins* by copying a folder out of that clone into that folder — so skipping either one leaves you stuck at 2:50.

> [!TIP]
> **On a lab PC that resets when it reboots:** sections 1–3 are usually already there and survive. Your **git identity** and your **GitHub login** may not. Nothing here takes more than a minute to redo, and week 2 shows you the drill.

---

## 1. The .NET 10 SDK

The SDK is the compiler, the runtime, and the `dotnet` command in one download. **SDK, not "Runtime"** — the runtime only *runs* programs, and you're here to write them.

**Download:** [dotnet.microsoft.com/download/dotnet/10.0](https://dotnet.microsoft.com/download/dotnet/10.0) → **SDK 10.0.x** → the installer for your machine.

- **Windows:** `x64` unless you know your machine is ARM.
- **macOS:** `Arm64` for M1/M2/M3/M4, `x64` for an older Intel Mac.

**✓ Check.** Open a **new** terminal and run:

```bash
dotnet --version
```

You want something starting with `10.`:

```
10.0.102
```

> [!NOTE]
> **Already have .NET 8 or 9 from your last course?** Install 10 anyway — SDKs sit side by side and nothing you wrote before breaks. If `dotnet --version` still reports the old one afterwards, restart the machine.

> [!WARNING]
> **`command not found` / `'dotnet' is not recognized`?** Nine times in ten the terminal was already open when you installed, and it's still using the old list of programs. **Close it completely and open a new one.** If it still fails after that, restart before trying anything cleverer.

---

## 2. Visual Studio Code

**Download:** [code.visualstudio.com](https://code.visualstudio.com/)

⚠️ **Visual Studio Code is not Visual Studio.** Different programs, same company, nearly the same name. We use **Code** — the small, fast one. If your last course used full Visual Studio, this will feel lighter and you drive it from the terminal.

- **Windows:** during install, tick **"Add to PATH"**. It's on by default; don't untick it.
- **macOS:** drag it to Applications, then open it once so macOS stops asking whether you're sure.

**✓ Check.** VS Code opens and you can see the Explorer panel down the left side.

---

## 3. The C# extension

Open VS Code → the **Extensions** icon in the left bar (four squares) → search **C#** → install the one published by **Microsoft**.

> [!NOTE]
> **You want `C#`, not `C# Dev Kit`.** The Dev Kit is a separate, licence-encumbered thing we don't use and don't need — everything in this course is done with the `dotnet` command. If it got installed alongside, that's fine, just don't rely on it.

**✓ Check.** The extension page says **Installed**, and no error notification appeared in the bottom-right corner.

---

## 4. Git, and telling it who you are

**This is the one most people are missing**, and it's the tool you'll use every week for the rest of the course.

**Windows:** [git-scm.com/download/win](https://git-scm.com/download/win) — accept every default.
**macOS:** you may already have it. Try the check below first; if macOS offers to install "command line developer tools", say yes.

**✓ Check:**

```bash
git --version
```

```
git version 2.51.0
```

**Then tell git your name and email.** Every commit you ever make gets stamped with these, so use the email attached to your GitHub account:

```bash
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"
git config --global init.defaultBranch main
```

**The third line matters more than it looks.** Depending on how git was installed, a brand-new repo's first branch is called either `main` or `master`. GitHub expects `main`, and every command in this course says `main` — so setting it once now saves you a confusing `src refspec main does not match any` when you push.

**✓ Check:**

```bash
git config --global user.name
```

It prints your name back. If it prints nothing, it didn't take — check for a typo in `--global`.

> [!TIP]
> **This is one of the two things a frozen lab PC forgets.** Two commands, ten seconds. Keep them somewhere you can copy from.

---

## 5. GitHub: an account, your coursework repo, and the course repo

**Everybody does this section**, however many of the checks above you passed.

**Sign up (or sign in):** [github.com](https://github.com/)

> [!TIP]
> **Pick a username you'd be happy showing an employer.** From week 4 your semester project lives in a *public* repo under this name, and people do look.

**Make the repo that holds your work for the whole term:**

1. GitHub → **+** (top right) → **New repository**
2. **Repository name:** `dotnet-db-coursework`
3. Visibility: **Private** ← this one matters. Weeks 1–3 are the same exercises for everybody, and a public repo is a copy-sharing surface.
4. **Don't** tick "Add a README" — you'll be pushing an existing folder into it.
5. **Create repository**, and leave the page open. The commands on it are the ones you'll want in a moment.

**Then add me as a collaborator** — this is how I read your work, and if you skip it your homework looks identical to no homework at all:

**Settings** → **Collaborators** → **Add people** → `jgrissom` → **Add**.

**✓ Check.** Settings → Collaborators lists `jgrissom` as **Pending Invite** or **Collaborator**. Either is fine — pending just means I haven't clicked accept yet.

### Then make the folder that repo will hold

The repo you just made is **empty and on GitHub**. Your actual work happens in a folder on your own machine, and you push it up later tonight. Make that folder now, with the same name:

**VS Code → File → Open Folder → *New Folder* → name it `dotnet-db-coursework` → Open.**

⚠️ **Put it somewhere sensible and permanent** — your home folder, or wherever you keep projects. **Not on the Desktop, not in Downloads, and not inside any other folder from this course.** You will add a folder to it every week for the rest of the semester.

**✓ Check.** VS Code's title bar says `dotnet-db-coursework` and the Explorer panel on the left is empty. That empty panel is correct — you'll fill it in tonight's lab.

> [!NOTE]
> **You don't run any `git` commands on it yet.** Connecting this folder to the repo on GitHub is the last thing we do in class tonight, and it's four commands. For now it's just a folder.

### Then clone the course repo

That was *your* repo. This is **mine** — everything I hand you all term arrives in it: tonight's lab, the checks that grade your homework, the notes. You clone it once, now, and `git pull` it at the start of every week.

Do this somewhere sensible that is **not** inside your `dotnet-db-coursework` folder — your home folder is fine:

```bash
git clone https://github.com/jgrissom/dotnet-db-dev.git
```

⚠️ **You never edit anything in this folder and you never work inside it.** Each week you copy that week's starter *out* of it and work on the copy. Work inside the clone and next week's `git pull` fights your own edits.

**✓ Check:**

```bash
cd dotnet-db-dev
ls
```

You should see `week-01`, `README.md` and a `scripts` folder.

---

## You're done

You should now have **two folders** on your machine, side by side, and they do opposite jobs:

```
dotnet-db-coursework/    ← YOURS. Empty for now. Everything you write goes here.
dotnet-db-dev/           ← MINE. You only ever copy things OUT of it.
```

Plus a compiler, an editor that understands C#, and a private repo on GitHub waiting for that first folder.

**Nothing here is graded.** The homework is, and it starts by using every one of these.

## 🆘 If something wouldn't install

- **`dotnet --version` prints an 8.x or 9.x number** — an older SDK from a previous course is being found first. Install 10 anyway; both can coexist. If it still reports the old one, restart.
- **VS Code says "The .NET Core SDK cannot be located"** — VS Code was open during the SDK install. Quit it entirely (not just the window) and reopen.
- **The C# extension sits on "Downloading"** forever — usually campus wifi. Try again on a different network, or come find me before class.
- **`git config --global user.name` prints nothing after you set it** — the `--global` flag was mistyped, or you set it in a terminal that has since closed without the command actually running. Run it again and re-check.
- **You can't install anything** because the machine is locked down — tell me. Everything in this course runs on the lab machines, and there's a plan for that; you just need to not spend an evening fighting it alone.
