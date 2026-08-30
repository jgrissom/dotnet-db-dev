#!/usr/bin/env node
// check-americanisms.js — the course is written in plain American English, and
// this is the command that keeps it that way.
//
//   node scripts/check-americanisms.js [dir ...]     # default: .
//   node scripts/check-americanisms.js --selftest    # prove every pattern works
//
// WHY THIS EXISTS: the rule "plain American English, no British drift" was
// written down after "fortnight" and it still drifted — 54 files carried
// `neighbour`, `kinds of thing`, `behaviour`, `grey`, `recognise` and friends,
// including a week TITLE and the banner Haldane prints on the projector every
// single week. A rule with no command behind it is a rule nobody can run.
// (CLAUDE.md: every pass needs a NUMBER or a COMMAND, not just a question.)
//
// It is deliberately a CLOSED list, not a dictionary: it catches the families
// that actually leak (-our, -ise, -re, doubled-l past tense, -t past tense)
// plus the specific words that have already cost something. False positives
// are worse than a short list — see ALLOW below for the escape hatch.

const fs = require("fs");
const path = require("path");

// Files that are BUILT from something else in this repo. Fixing them here would
// be undone by the next generate; fix the source and regenerate.
const GENERATED = new Set(["slides.html", "build-sheet.html"]);
// This file necessarily contains every word it hunts for.
const SELF = path.basename(__filename);
const SKIP_DIRS = new Set(["bin", "obj", "node_modules", ".git", ".vs", ".vscode"]);
const EXTS = [".md", ".cs", ".html", ".json", ".yml", ".yaml", ".css", ".js"];

// Deliberate exceptions. Key = the exact matched text, value = why it stays.
// Empty on purpose: nothing in this course has needed one yet. A real proper
// noun ("Grey" as a surname) or a quoted external string goes here WITH ITS
// REASON, rather than the pattern being weakened for everybody.
const ALLOW = {
  // "Greyhound": "a proper noun in week N's seed data",
};

// [pattern, what to write instead]. Case-insensitive; \b on both ends unless
// the pattern says otherwise.
const RULES = [
  // ── the construction that started this: plural "kinds" + singular noun ────
  [/\b(kinds|sorts) of (thing|row|item|entry|record|class|caller|list|answer|value|question|person)\b/gi,
    'pluralize the noun — "kinds of thingS"'],

  // ── -our ─────────────────────────────────────────────────────────────────
  [/\bneighbour(s|ing|hood|hoods)?\b/gi, "neighbor"],
  [/\bbehaviour(s|al|ally)?\b/gi, "behavior"],
  [/\bcolour(s|ed|ing|ful)?\b/gi, "color"],
  [/\bhonour(s|ed|able|ing)?\b/gi, "honor"],
  [/\bfavour(s|ed|ite|ites|able|ing)?\b/gi, "favor"],
  [/\bflavour(s|ed|ing)?\b/gi, "flavor"],
  [/\blabour(s|ed|ing)?\b/gi, "labor"],
  [/\brumour(s|ed)?\b/gi, "rumor"],
  [/\bhumour(s|ed|ous)?\b/gi, "humor"],
  [/\bodour(s)?\b/gi, "odor"],
  [/\bendeavour(s|ed|ing)?\b/gi, "endeavor"],

  // ── -ise / -isation ──────────────────────────────────────────────────────
  [/\brecognise(s|d)?\b/gi, "recognize"],
  [/\bapologise(s|d)?\b/gi, "apologize"],
  [/\borganise(s|d)?\b/gi, "organize"],
  [/\borganisation(s)?\b/gi, "organization"],
  [/\brealise(s|d)?\b/gi, "realize"],
  [/\bemphasise(s|d)?\b/gi, "emphasize"],
  [/\bsummarise(s|d)?\b/gi, "summarize"],
  [/\bprioritise(s|d)?\b/gi, "prioritize"],
  [/\bspecialise(s|d)?\b/gi, "specialize"],
  [/\bminimise(s|d)?\b/gi, "minimize"],
  [/\bmaximise(s|d)?\b/gi, "maximize"],
  [/\bcriticise(s|d)?\b/gi, "criticize"],
  [/\bcategorise(s|d)?\b/gi, "categorize"],
  [/\bcustomise(s|d)?\b/gi, "customize"],
  [/\banalyse(s|d)?\b/gi, "analyze"],

  // ── -re ──────────────────────────────────────────────────────────────────
  [/\bcentre(s|d)?\b/gi, "center"],
  [/\bmetre(s)?\b/gi, "meter"],
  [/\blitre(s)?\b/gi, "liter"],
  [/\bfibre(s)?\b/gi, "fiber"],

  // ── -ce/-se and friends ──────────────────────────────────────────────────
  [/\bdefence\b/gi, "defense"],
  [/\boffence(s)?\b/gi, "offense"],
  [/\bpractise(s|d)?\b/gi, "practice (always -ce in American English)"],
  [/\bpretence\b/gi, "pretense"],
  [/\bsceptical(ly)?\b/gi, "skeptical"],
  [/\benquiry\b/gi, "inquiry"],
  [/\bspeciality\b/gi, "specialty"],
  [/\bjudgement(s)?\b/gi, "judgment"],
  [/\bageing\b/gi, "aging"],
  [/\bprogramme(s|d)?\b/gi, "program"],

  // ── doubled-l past tense ─────────────────────────────────────────────────
  [/\btravelled\b/gi, "traveled"],
  [/\bmodelled\b/gi, "modeled"],
  [/\blabelled\b/gi, "labeled"],
  [/\bsignalled\b/gi, "signaled"],
  [/\bfuelled\b/gi, "fueled"],
  [/\bmarvelled\b/gi, "marveled"],

  // ── -t past tense ────────────────────────────────────────────────────────
  [/\blearnt\b/gi, "learned"],
  [/\bspelt\b/gi, "spelled"],
  [/\bburnt\b/gi, "burned"],
  [/\bdreamt\b/gi, "dreamed"],
  [/\bknelt\b/gi, "kneeled"],

  // ── vocabulary and idiom ─────────────────────────────────────────────────
  [/\bgrey(s|ed|ing)?\b/gi, "gray"],
  [/\bwhilst\b/gi, "while"],
  [/\bamongst\b/gi, "among"],
  [/\btowards\b/gi, "toward"],
  [/\bmaths\b/gi, "math"],
  [/\bfortnight(ly)?\b/gi, "two weeks — this one is banned by name (Jeff, 2026)"],
  [/\bdifferent to\b/gi, 'different from'],
  [/\bstraight away\b/gi, "right away"],
];

// ── the walk ─────────────────────────────────────────────────────────────────

function* files(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else if (EXTS.includes(path.extname(e.name)) && !GENERATED.has(e.name) && e.name !== SELF) yield p;
  }
}

function scan(dirs) {
  const hits = [];
  let scanned = 0;

  for (const dir of dirs) {
    for (const file of files(dir)) {
      scanned++;
      const lines = fs.readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const [re, better] of RULES) {
          re.lastIndex = 0;
          let m;
          while ((m = re.exec(line)) !== null) {
            if (ALLOW[m[0]]) continue;
            hits.push({ file, line: i + 1, found: m[0], better, text: line.trim() });
          }
        }
      });
    }
  }
  return { hits, scanned };
}

// ── self-test: every pattern fires on a violator and stays quiet on clean text ─
//
// A violator fixture proves the pattern CAN fire. A known-good fixture proves it
// fires on the RIGHT thing — a regex that matches everything reads as a
// catastrophic finding and is really just broken. Both, per pattern.
function selftest() {
  const CLEAN = [
    "The nearest neighbor is 512 km away and the behavior is gray.",
    "Two kinds of things, four sorts of rows, one kind of thing.",
    "It recognizes the color, honors the practice, and centers the meter.",
    "They practice it. A judgment call. The program ran while I waited.",
    "Pick a different topic now — a different tone, toward the end.",
    "queue, unique, technique, Spectre.Console, initialize, serialize",
  ].join("\n");

  let bad = 0;
  for (const [re, better] of RULES) {
    const src = re.source;
    // build a violator straight out of the pattern's own first alternative
    const violator = src
      .replace(/\\b/g, "")
      .replace(/\((?:[^()]*)\)\?/g, "")          // drop optional groups
      .replace(/\(([^()|]*)\|[^()]*\)/g, "$1")   // first alternative of a group
      .replace(/\s+/g, " ")
      .trim();
    re.lastIndex = 0;
    if (!re.test(violator)) {
      console.log(`  ❌ pattern never fires on its own violator: /${src}/  →  "${violator}"`);
      bad++;
      continue;
    }
    re.lastIndex = 0;
    if (re.test(CLEAN)) {
      const m = CLEAN.match(re);
      console.log(`  ❌ pattern fires on CLEAN American text: /${src}/  matched "${m[0]}"`);
      bad++;
    }
  }

  console.log(
    bad === 0
      ? `\n✅ self-test: all ${RULES.length} patterns fire on a violator and stay quiet on clean text`
      : `\n❌ self-test: ${bad} of ${RULES.length} patterns are broken`
  );
  process.exit(bad === 0 ? 0 : 1);
}

// ── main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.includes("--selftest")) selftest();

const dirs = args.filter((a) => !a.startsWith("--"));
const { hits, scanned } = scan(dirs.length ? dirs : ["."]);

// A checker that passes vacuously is worse than no checker, because the ✅ gets
// quoted as evidence.
if (scanned === 0) {
  console.log(`⚠️  scanned ZERO files in ${(dirs.length ? dirs : ["."]).join(", ")} — nothing was checked.`);
  console.log("   This is NOT a pass. Point it at a directory that has course material in it.");
  process.exit(2);
}

if (hits.length === 0) {
  console.log(`✅ plain American English (${scanned} files scanned, ${RULES.length} patterns)`);
  process.exit(0);
}

console.log(`❌ ${hits.length} British spelling(s)/usage(s) in ${scanned} files scanned:\n`);
for (const h of hits) {
  console.log(`  ${h.file}:${h.line}`);
  console.log(`     found "${h.found}" — write ${h.better}`);
  console.log(`     ${h.text.slice(0, 110)}`);
}
console.log(
  "\nThe course is written in plain American English. If one of these is a real" +
  "\nproper noun or a quoted external string, add it to ALLOW in this file WITH" +
  "\nits reason — don't weaken the pattern for everybody."
);
process.exit(1);
