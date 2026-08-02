# Week 1 — Setup Guide

Five installs. Each one ends with a **✓ Check** that either prints something or doesn't — do the check before moving on, because install problems are much cheaper to find one at a time.

> [!IMPORTANT]
> **On a lab PC that resets when it reboots:** installs 1–3 are usually already there and survive. Installs 4 and 5 (your git identity, your GitHub login) may not. Nothing here takes more than a minute to redo, and week 2 shows you the drill.

---

## 1. The .NET 10 SDK

The SDK is the compiler, the runtime, and the `dotnet` command all in one download. **SDK, not "Runtime"** — the runtime only *runs* programs, and you're here to write them.

**Download:** [dotnet.microsoft.com/download/dotnet/10.0](https://dotnet.microsoft.com/download/dotnet/10.0) → **SDK 10.0.x** → the installer for your machine.

- **Windows:** `x64` unless you know your machine is ARM.
- **macOS:** `Arm64` for M1/M2/M3/M4, `x64` for an older Intel Mac.

**✓ Check.** Open a **new** terminal — PowerShell on Windows, Terminal on macOS — and run:

```bash
dotnet --version
```

You want something starting with `10.`:

```
10.0.102
```

> [!WARNING]
> **`command not found` / `'dotnet' is not recognized`?** Nine times in ten the terminal was already open when you installed, and it's still using the old list of programs. **Close it completely and open a new one.** If it still fails after that, restart the machine before trying anything cleverer.

---

## 2. Visual Studio Code

**Download:** [code.visualstudio.com](https://code.visualstudio.com/)

⚠️ **Visual Studio Code is not Visual Studio.** They're different programs from the same company with nearly the same name. We use **Code** — the small, fast one.

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
```

**✓ Check:**

```bash
git config --global user.name
```

It prints your name back. If it prints nothing, it didn't take — check for a typo in `--global`.

> [!TIP]
> **This is one of the two things a frozen lab PC forgets.** Two commands, ten seconds. Keep them somewhere you can copy from.

---

## 5. GitHub: an account, your coursework repo, and the course repo

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

Five green checks and you have a working toolchain: a compiler, an editor that understands C#, somewhere to put your work — and the course repo, which is where everything I give you shows up.

**Nothing here is graded.** The homework is, and it starts by using every one of these.

## 🆘 If something wouldn't install

- **`dotnet --version` prints a 8.x or 9.x number** — an older SDK is installed and it's being found first. Install 10 anyway; both can coexist. If it still reports the old one, restart.
- **VS Code says "The .NET Core SDK cannot be located"** — VS Code was open during the SDK install. Quit it entirely (not just the window) and reopen.
- **The C# extension sits on "Downloading"** forever — usually campus wifi. Try again on a different network, or come find me before class.
- **You can't install anything** because the machine is locked down — tell me. Everything in this course runs on the lab machines, and there's a plan for that; you just need to not spend an evening fighting it alone.
