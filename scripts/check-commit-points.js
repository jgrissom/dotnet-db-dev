#!/usr/bin/env node
//
// check-commit-points.js — every homework must scaffold its own commits.
//
//   node scripts/check-commit-points.js <dir>
//
// ── Why this exists ─────────────────────────────────────────────────────────
//
// The grader counts commits with `git rev-list --count HEAD -- week-NN`, which
// includes commits made during the LAB — same repo, same week folder. That is
// intended: the habit is what's graded.
//
// But the lab is optional and never collected, so the bar has to be clearable
// by the homework ALONE. Week 2 failed that until 2026-08-06: it only said
// "commit as you go, three or more", so a student who skipped the lab had no
// named moments to follow.
//
// This counts the commit points a homework actually spells out, and compares
// them against `minimum` in that week's points.json — the same number the
// grader enforces, so the doc and the rubric cannot drift apart.
//
// ── What counts as a commit point ───────────────────────────────────────────
//
//   1. a `git commit -m "..."` line in a fenced block
//   2. a bare fenced block holding just a commit message (`week 2: readme`) —
//      the form used when committing from VS Code's Source Control view
//
// ⚠️ TWO blind spots, both of which only ever INFLATE the count — so this is a
// lower-bound alarm, not a proof:
//
//   • It counts occurrences, not intent. An *example* commit message in prose
//     would be counted.
//   • It cannot tell which commits will actually touch `week-NN/Homework/`,
//     which is what the grader counts. Week 2 lists four commit points and only
//     three of them count — the README lives at the repo ROOT, so committing it
//     changes nothing inside the homework project.
//
// Both are why the messages are printed: read them, and ask of each one
// "does this change a file inside week-NN/Homework/?" 

const fs = require("fs");
const path = require("path");

const root = process.argv[2] || ".";
let bad = 0, checked = 0;

for (const entry of fs.readdirSync(root, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
  if (!entry.isDirectory() || !/^week-\d\d$/.test(entry.name)) continue;

  const hw = path.join(root, entry.name, "homework.md");
  const pts = path.join(root, entry.name, "points.json");
  if (!fs.existsSync(hw) || !fs.existsSync(pts)) continue;

  const minimum = JSON.parse(fs.readFileSync(pts, "utf8"))?.repo?.commits?.minimum;
  if (typeof minimum !== "number") continue;

  const md = fs.readFileSync(hw, "utf8");
  const messages = [
    ...[...md.matchAll(/git commit -m ["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...md.matchAll(/\n```\n([^\n`]+)\n```/g)]
      .map((m) => m[1].trim())
      .filter((s) => /^week ?\d+\s*[:.]/i.test(s)),
  ];

  checked++;
  const ok = messages.length >= minimum;
  console.log(`${ok ? "✅" : "❌"} ${entry.name}: ${messages.length} commit point(s), rubric wants ${minimum}`);
  for (const m of messages) console.log(`     · ${m}`);
  if (!ok) {
    bad++;
    console.log(`     ↳ the lab is optional, so the homework must reach ${minimum} on its own.`);
  }
}

if (!checked) { console.log("⚠️  no week-NN homework.md + points.json pairs found"); process.exit(0); }
if (bad) { console.log(`\n❌ ${bad} homework(s) don't scaffold enough commits`); process.exit(1); }
console.log("\n✅ every homework scaffolds its own commits");
