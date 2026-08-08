#!/usr/bin/env node
//
//  check-inventory.js <root>   — <root> CONTAINS the week-NN folders (usually `.`)
//
//  STEP 0 of the closing checklist. It exists because six defects to date were
//  ONE bug: an element present in week N-1, countable, silently going to zero in
//  week N.  Notes links (15 -> 0).  Lab notes links (10 -> 0).  Lab commit
//  prompts (6 -> 1).  Demo commit milestones (3 -> 1).  The CLI-fallback block
//  (present -> absent).  TODO order (ordered -> 3,4,5,4,5).  Every one a human
//  found was found by Jeff, in a walkthrough or at a podium.
//
//  Two rules this script exists to obey, both paid for on 2026-08-08:
//
//    1. A pattern that guesses an author's phrasing yields FALSE ZEROS.  A grep
//       for "commit it|three clicks" said week 4 had 0 commit prompts; it had 1,
//       worded "Commit that before you change anything."  A count built on
//       `^week NN lab:` with NN zero-padded said 0 for ALL FOUR weeks, because
//       the docs say `week 2 lab:`, never `week 02 lab:`.
//       => Count ARTIFACTS (a pasted message block), not PROSE.
//
//    2. A checker that passes vacuously is worse than no checker, because it is
//       reported as evidence.  `check-cues.js week-03` printed green while
//       scanning zero files for a dozen runs.
//       => No weeks found is a FAILURE here, never a pass.
//
'use strict'
const fs = require('fs')
const path = require('path')

const root = process.argv[2]
if (!root) {
  console.error('usage: check-inventory.js <root>   (the folder CONTAINING week-NN/)')
  process.exit(2)
}

// The starters repo holds the lab projects, so the TODO-order row needs it.
// Same resolution the graders use: a sibling, overridable.
const starters = process.env.DB_STARTERS ||
  path.join(root, '..', 'dotnet-db-starters')

// ── deliberate zeros ───────────────────────────────────────────────────────
// "A drop is a defect until the handover states it was deliberate."  This is
// where the handover states it.  Anything not listed here is flagged.
const DELIBERATE = {
  '01': {
    'commit messages (lab)': "week 1's lab commits nothing — git init is in its homework",
    'CLI fallback (lab)':    "no commits in week 1's lab, so nothing to fall back from",
  },
}

const read = f => { try { return fs.readFileSync(f, 'utf8') } catch { return null } }
const count = (s, re) => s ? (s.match(re) || []).length : 0

// ── the rows ───────────────────────────────────────────────────────────────
// kind: 'floor'  — must be >= min, always
//       'drop'   — compare with the previous week; a fall is suspect
//       'rise'   — compare with the previous week; a RISE is suspect
//       'hard'   — pass/fail on its own, no comparison
const ROWS = [
  { name: 'notes links (homework)', kind: 'drop',
    get: w => count(w.homework, /lecture-notes\.md#/g) },

  { name: 'notes links (lab)', kind: 'drop',
    get: w => count(w.lab, /lecture-notes\.md#/g) },

  { name: 'links inside 🆘', kind: 'drop',
    get: w => count(w.stuck, /lecture-notes\.md#/g) },

  // Counts the PASTED MESSAGE BLOCK, not the sentence introducing it — the
  // sentence is worded differently every week and is what produced the false
  // zero.  Not zero-padded: docs say `week 4 lab:`, never `week 04 lab:`.
  { name: 'commit messages (lab)', kind: 'drop',
    get: w => count(w.lab, /^week \d+( lab)?:/gm) },

  { name: 'CLI fallback (lab)', kind: 'floor', min: 1,
    get: w => count(w.lab, /git commit -m/g) },

  { name: 'bold in-full links', kind: 'drop',
    get: w => count(w.lab, /\*\*\[Task \d+ in full/g) },

  { name: '**Check:** lines', kind: 'drop',
    get: w => count(w.lab, /^\*\*Check:\*\*/gm) },

  // A RISE means the lab started handing over whole worked methods again.
  // The floor is "at least half a lab's code tasks withheld" (CLAUDE.md).
  // ⚠️ NEEDS EYES: week 4's blocks are fragments, not whole methods, so the
  // raw number is not comparable across weeks.  Flag, never fail.
  { name: 'csharp fences (lab) ⚠️eyes', kind: 'rise',
    get: w => count(w.lab, /^[> ]*```csharp/gm) },

  { name: 'dotnet run (lab)', kind: 'drop',
    get: w => count(w.lab, /dotnet run/g) },

  { name: 'dotnet test (lab)', kind: 'drop',
    get: w => count(w.lab, /dotnet test/g) },
]

// ── whole-week checks that aren't a single number ──────────────────────────
function todoOrder (week) {
  const dir = path.join(starters, `week-${week}`)
  if (!fs.existsSync(dir)) return { skipped: true }
  const bad = []
  let scanned = 0
  const walk = d => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'bin' && e.name !== 'obj') walk(p)
      } else if (e.name.endsWith('.cs')) {
        scanned++
        const nums = [...read(p).matchAll(/TODO — Task (\d+)/g)].map(m => +m[1])
        for (let i = 1; i < nums.length; i++) {
          if (nums[i] < nums[i - 1]) {
            bad.push(`${path.relative(starters, p)}: ${nums.join(', ')}`)
            break
          }
        }
      }
    }
  }
  walk(dir)
  return { scanned, bad }
}

function timing (week, dir) {
  const s = read(path.join(dir, `week-${week}`, 'lesson-plan.md'))
  if (!s) return { missing: true }
  const rows = []
  for (const m of s.matchAll(/^\|\s*(\d+):(\d+)\s*\|\s*(\d+) min\s*\|/gm)) {
    rows.push([+m[1] * 60 + +m[2], +m[3]])
  }
  if (!rows.length) return { missing: true }
  const total = rows.reduce((a, [, d]) => a + d, 0)
  let drift = 0
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] !== rows[i - 1][0] + rows[i - 1][1]) drift++
  }
  return { total, drift, rows: rows.length }
}

// ── gather ─────────────────────────────────────────────────────────────────
const weeks = fs.readdirSync(root)
  .filter(f => /^week-\d+$/.test(f))
  .sort()
  .map(f => f.slice(5))

if (!weeks.length) {
  console.error(`❌ NO week-NN folders found in ${path.resolve(root)}`)
  console.error('   This is a FAILURE, not a pass. Hand me the root that CONTAINS')
  console.error('   the week folders — e.g. `check-inventory.js .` from the repo top.')
  process.exit(2)
}

const data = weeks.map(w => {
  const lab = read(path.join(root, `week-${w}`, 'lab', 'README.md'))
  const i = lab ? lab.indexOf('🆘') : -1
  return {
    week: w,
    homework: read(path.join(root, `week-${w}`, 'homework.md')),
    lab,
    stuck: i >= 0 ? lab.slice(i) : null,
  }
})

// ── report ─────────────────────────────────────────────────────────────────
let failures = 0
let warnings = 0
const W = 30
const pad = s => String(s).padStart(6)

console.log(`\nweek inventory — ${weeks.length} week(s) in ${path.resolve(root)}\n`)
console.log(' '.repeat(W) + weeks.map(w => pad(w)).join(''))
console.log('-'.repeat(W + 6 * weeks.length))

for (const row of ROWS) {
  const vals = data.map(w => row.get(w))
  const notes = []
  let line = row.name.padEnd(W) + vals.map(pad).join('')

  vals.forEach((v, i) => {
    const wk = weeks[i]
    const excused = DELIBERATE[wk] && DELIBERATE[wk][row.name]
    if (excused) { notes.push(`${wk}: ${v} — deliberate (${excused})`); return }

    if (row.kind === 'floor' && v < row.min) {
      notes.push(`❌ ${wk}: ${v} — must be at least ${row.min}`); failures++
    }
    if (row.kind === 'drop' && i > 0) {
      const prev = vals[i - 1]
      if (v === 0 && prev > 0) {
        notes.push(`❌ ${wk}: fell to ZERO from ${prev}`); failures++
      } else if (v < prev) {
        notes.push(`⚠️  ${wk}: ${prev} → ${v}`); warnings++
      }
    }
    if (row.kind === 'rise' && i > 0 && v > vals[i - 1]) {
      notes.push(`⚠️  ${wk}: ${vals[i - 1]} → ${v} — is the lab giving answers again?`)
      warnings++
    }
  })

  console.log(line)
  for (const n of notes) console.log(' '.repeat(4) + n)
}

// TODO order
console.log('')
for (const w of weeks) {
  const r = todoOrder(w)
  if (r.skipped) {
    console.log(`⚠️  week-${w}: TODO order NOT CHECKED — no ${path.join(starters, `week-${w}`)}`)
    warnings++
  } else if (r.bad.length) {
    console.log(`❌ week-${w}: TODO — Task N out of order in ${r.bad.length} file(s):`)
    for (const b of r.bad) console.log('      ' + b)
    failures++
  } else {
    console.log(`✅ week-${w}: TODO order fine (${r.scanned} .cs scanned)`)
  }
}

// timing
console.log('')
for (const w of weeks) {
  const t = timing(w, root)
  if (t.missing) {
    console.log(`⚠️  week-${w}: no timing table found`); warnings++
  } else if (t.total !== 225 || t.drift) {
    console.log(`❌ week-${w}: timing ${t.total} min (want 225), ${t.drift} clock drift`)
    failures++
  } else {
    console.log(`✅ week-${w}: timing 225 min, no clock drift (${t.rows} rows)`)
  }
}

// ── rows a script must not pretend to judge ────────────────────────────────
console.log(`
NEEDS EYES — not automatable, do these by hand:
  • demo commit milestones must equal what the week's rubric asks students for
  • the homework grading table must match points.json exactly
  • csharp fences: fragments vs whole methods — the number above can't tell them apart
`)

console.log(failures
  ? `❌ ${failures} failure(s), ${warnings} warning(s)`
  : `✅ no failures, ${warnings} warning(s)`)
process.exit(failures ? 1 : 0)
