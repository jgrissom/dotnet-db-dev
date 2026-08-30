#!/usr/bin/env node
// Markdown -> HTML for the published cue sheets, with syntax highlighting
// applied AT BUILD TIME.
//
//   node scripts/render-cue-html.js < demo-script.md > body.html
//
// Why build-time and not a <script> tag: the sheet is read live, at the
// projector, in a room whose wifi is a known risk. Highlighting here bakes
// <span class="hljs-…"> straight into the published HTML, so the page needs
// no CDN, no runtime JS and no second origin that can fail on its own. The
// colors are plain CSS in export-slides.yml, matching the deck's.
//
// Fences with no language stay untouched on purpose — the sheets use bare
// fences for EXPECTED OUTPUT (terminal text, commit messages), and coloring
// those as if they were source would be a lie about what they are.
const { Marked } = require("marked");
const { markedHighlight } = require("marked-highlight");
const hljs = require("highlight.js");

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "nohighlight",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (!lang) return code; // expected-output block — leave it alone
      if (!hljs.getLanguage(lang)) return code;
      return hljs.highlight(code, { language: lang }).value;
    },
  })
);
marked.setOptions({ gfm: true });

let md = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (md += c));
process.stdin.on("end", () => process.stdout.write(marked.parse(md)));
