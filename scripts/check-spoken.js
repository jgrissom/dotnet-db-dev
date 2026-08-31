#!/usr/bin/env node
// check-spoken.js — make the prose audit's pass 2 executable.
//
//   node scripts/check-spoken.js week-07          # one week
//   node scripts/check-spoken.js week-07 --all    # print every run, not just flags
//   node scripts/check-spoken.js .                # numbers for every week
//
// WHAT THIS IS FOR. Jeff, 2026-08-30, after three separate corrections to
// week 7's spoken lines in one sitting:
//
//   "It's almost like a riddle. I like to be direct when I explain things. I
//    don't want students to have to decode the words I am saying when I am
//    describing something they already do not understand."
//   "Can you update your notes so future lessons will adhere to this policy
//    without me having to sift through riddles?"
//
// He should not be the one who finds these. But "read every spoken run alone,
// out of order, and ask whether it is plain" has never had a command behind
// it, so it could be reported as run while never being run — the exact failure
// CLAUDE.md names ("every pass needs a NUMBER or a COMMAND").
//
// ⚠️ WHAT THIS DELIBERATELY DOES NOT DO: decide whether a line is a riddle.
// That was tried and abandoned the same hour. Phrase patterns for the four
// shapes (abstract subject, buried appositive, antithesis, aphorism) were
// measured across all seven weeks and matched PLAIN SPEECH almost every time
// — "the board is the only thing that knows", "let's see what it costs".
// 5 of 6 hits were false positives. A checker that misreports is worse than
// the hole it closes, so this one reports NUMBERS and hands over the TEXT.
// The judgment stays human; what is automated is that the reading happens.

const fs = require("fs");
const path = require("path");

const LONG = 30;   // words in one spoken sentence — p90 across weeks 1-7 is 18-25

function weeks(root) {
  return fs.readdirSync(root)
    .filter((d) => /^week-\d+$/.test(d))
    .filter((d) => fs.existsSync(path.join(root, d, "demo/demo-script.md")))
    .sort();
}

// Every *"..."* run, with the line it sits on.
function runsIn(file) {
  const out = [];
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\*"(.+?)"\*/g)) out.push({ line: i + 1, text: m[1] });
  });
  return out;
}

const sentences = (t) => t.split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter(Boolean);
const words = (s) => s.split(/\s+/).filter(Boolean).length;

function report(root, week, showAll) {
  const file = path.join(root, week, "demo/demo-script.md");
  const runs = runsIn(file);
  const all = runs.flatMap((r) => sentences(r.text).map((s) => ({ ...r, s })));
  const lens = all.map((x) => words(x.s)).sort((a, b) => a - b);
  const median = lens.length ? lens[Math.floor(lens.length / 2)] : 0;

  const long = all.filter((x) => words(x.s) > LONG);
  // A semicolon is a mark of WRITTEN prose. Nobody speaks one — it is the most
  // reliable single tell that a line was composed rather than said.
  const semis = runs.filter((r) => r.text.includes(";"));

  console.log(`\n━━ ${week}  ·  ${runs.length} spoken runs, ${all.length} sentences, median ${median} words`);

  if (long.length) {
    console.log(`\n  📏 ${long.length} sentence(s) over ${LONG} words — read each one aloud:`);
    for (const x of long.sort((a, b) => words(b.s) - words(a.s))) {
      console.log(`     ${week}/demo/demo-script.md:${x.line}  (${words(x.s)} words)`);
      console.log(`       ${x.s.slice(0, 150)}`);
    }
  }
  if (semis.length) {
    console.log(`\n  🔤 ${semis.length} run(s) containing a semicolon — nobody speaks a semicolon:`);
    for (const r of semis) console.log(`     :${r.line}  ${r.text.slice(0, 120)}`);
  }
  if (showAll) {
    // Shuffled, because CLAUDE.md's pass 2 says out of order: in sequence the
    // author supplies the missing referent from memory and every line reads fine.
    console.log(`\n  🗣  every run, shuffled — does each one stand alone, and is it PLAIN?`);
    const shuffled = [...runs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    for (const r of shuffled) console.log(`     :${r.line}  ${r.text}`);
  }
  if (!long.length && !semis.length && !showAll) console.log("  ✅ nothing flagged");
  return { runs: runs.length, sentences: all.length, median, long: long.length, semis: semis.length };
}

const args = process.argv.slice(2);
const showAll = args.includes("--all");
const targets = args.filter((a) => !a.startsWith("--"));
const root = process.cwd();
const list = targets.length && targets[0] !== "." ? targets : weeks(root);

if (!list.length) {
  console.log("⚠️  no week-NN/demo/demo-script.md found — NOTHING WAS CHECKED. This is not a pass.");
  process.exit(2);
}

const totals = list.map((w) => report(root, w, showAll));

console.log("\n" + "─".repeat(60));
console.log(
  `${list.length} week(s) · ${totals.reduce((a, t) => a + t.runs, 0)} spoken runs · ` +
  `${totals.reduce((a, t) => a + t.long, 0)} long sentence(s) · ` +
  `${totals.reduce((a, t) => a + t.semis, 0)} semicolon run(s)`
);
console.log(
  "⚠️  These are CANDIDATES, not defects — the judgment is yours. Read each one\n" +
  "   aloud. If a listener would have to decode it, rewrite it as short\n" +
  "   declaratives: one idea per sentence, concrete subject, nothing held over.\n" +
  "   Put the number in the handover so the pass cannot be claimed without it."
);
// Always exits 0: this is a review surface, not a gate. A judgment check that
// fails the build gets silenced, and then nobody reads anything.
