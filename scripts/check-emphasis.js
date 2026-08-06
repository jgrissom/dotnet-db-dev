#!/usr/bin/env node
//
// check-emphasis.js — catches markdown emphasis that silently fails to render.
//
//   node scripts/check-emphasis.js <dir>
//
// ── Why this exists ─────────────────────────────────────────────────────────
//
// The cue sheets write spoken lines as *"…"* and the published page styles
// them amber with a 🗣 marker by finding <em> runs that start with a quote.
//
// A **bold** run whose content ENDS IN PUNCTUATION, nested inside one of those
// spoken runs, breaks the outer emphasis entirely:
//
//   *"one question decides this. **Have I pushed it?**"*     ← renders literally
//   *"one question decides this. **Have I pushed it**?"*     ← correct
//
// Verified against marked. The trigger needs BOTH halves:
//
//   1. the bold's content ends in `.`, `?` or `!`, and
//   2. the closing `**` is followed immediately by a NON-SPACE character
//      (the closing quote, or a comma — anything but whitespace).
//
// That makes the closing `**` both left- and right-flanking, and the outer `*`
// never finds its partner. Ordinary text after the bold saves it:
//
//   *"say this **loudly.** and then stop"*     ← fine, a space follows
//   *"say this **loudly.**"*                   ← broken, the quote follows
//
// The line then renders with visible asterisks AND loses its speech styling,
// because the <em> the CSS keys off was never created.
//
// It looks correct in the source and it looks correct in GitHub's preview,
// which renders it fine. Only the published page shows it. Nothing else catches
// this — check-cues.js validates slide numbers and footers, not emphasis.
//
// The fix is always the same: move the punctuation OUTSIDE the bold.

const fs = require("fs");
const path = require("path");

const root = process.argv[2] || ".";

// Inside a spoken run *"…"*: a bold ending in . ? or ! whose closing ** is
// followed by a non-space character. Both halves are required — see above.
const BROKEN = /\*"[^"\n]*\*\*[^*\n]*[?!.]\*\*(?=\S)/;
const HIT = /\*\*[^*\n]*[?!.]\*\*(?=\S)/;

function markdownFiles(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    if (entry.name === "bin" || entry.name === "obj") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) markdownFiles(full, found);
    else if (entry.name.endsWith(".md")) found.push(full);
  }
  return found;
}

let bad = 0;

for (const file of markdownFiles(root)) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let inFence = false;

  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;

    // Code spans may legitimately hold asterisks (`*.user`, a glob).
    const bare = line.replace(/`[^`\n]*`/g, "");
    if (!BROKEN.test(bare)) return;

    bad++;
    const hit = bare.match(HIT)[0];
    console.log(`\n${path.relative(root, file) || file}:${i + 1}`);
    console.log(`  ${hit}  → move the punctuation outside: ${hit.replace(/([?!.])\*\*$/, "**$1")}`);
  });
}

if (bad) {
  console.log(`\n❌ ${bad} emphasis run(s) will render as literal asterisks on the published page`);
  process.exit(1);
}
console.log("✅ no emphasis that fails to render");
