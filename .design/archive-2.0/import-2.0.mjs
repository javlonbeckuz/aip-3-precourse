// One-off importer: 2.0 API dumps (.design/ref-2.0-api) -> content/ files.
// Run: node scripts/import-2.0.mjs   (safe to re-run; never overwrites a real file, only regenerates *.placeholder)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, '.design/ref-2.0-api');
const out = path.join(root, 'content');
const LANGS = ['uz', 'ru', 'en'];
const dump = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(src, `lessons_${l}.json`), 'utf8')).lessons]));

// Platform text that is translated. Everything else (prompt texts and titles, exercise titles/notes,
// homework, group titles) stays Uzbek in every language, like the prototype.
const pick = (o, keys) => Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));
function localize(uz, tr) {
  const l = structuredClone(uz);
  Object.assign(l, pick(tr, ['title', 'subtitle', 'summary', 'topics', 'bookNote']));
  l.bookVariants = uz.bookVariants.map((v, i) => ({ ...v, label: tr.bookVariants[i]?.label ?? v.label }));
  l.prep = tr.prep;
  l.materials.forEach((m, i) => {
    Object.assign(m, pick(tr.materials[i], ['title', 'note', 'cta', 'count', 'footnote']));
    if (m.bundle) m.bundle.label = tr.materials[i].bundle.label;
  });
  if (l.prompts) Object.assign(l.prompts, pick(tr.prompts, ['title', 'subtitle', 'lede', 'rules', 'footnote']));
  if (l.praktikum) Object.assign(l.praktikum, pick(tr.praktikum, ['title', 'lead', 'rules', 'exercisesTitle', 'exercisesNote', 'promptsNote']));
  return l;
}

// no server paths, no pre-rendered 2.0 HTML, no state that the schedule now decides
function clean(l) {
  delete l.materialsHtml; delete l.published; delete l.date;
  if (l.prep) delete l.prep.html;
  (function walk(o) {
    if (Array.isArray(o)) return o.forEach(walk);
    if (o && typeof o === 'object') { delete o.file; Object.values(o).forEach(walk); }
  })(l);
  return l;
}

const asciiName = (s) => s.replace(/[^\x20-\x7e]/g, '?');
function pdf(lines) {
  const esc = (s) => asciiName(s).replace(/([()\\])/g, '\\$1');
  const stream = 'BT /F1 16 Tf 50 780 Td 22 TL ' + lines.map((t) => `(${esc(t)}) Tj T*`).join(' ') + ' ET';
  const objs = ['<</Type/Catalog/Pages 2 0 R>>', '<</Type/Pages/Kids[3 0 R]/Count 1>>',
    '<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>',
    `<</Length ${stream.length}>>\nstream\n${stream}\nendstream`, '<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>'];
  let o = '%PDF-1.4\n'; const offs = [];
  objs.forEach((b, i) => { offs.push(o.length); o += `${i + 1} 0 obj\n${b}\nendobj\n`; });
  const x = o.length;
  o += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map((f) => String(f).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${x}\n%%EOF\n`;
  return Buffer.from(o, 'latin1');
}
function placeholder(name, rel) {
  const msg = ['PLACEHOLDER - not the real file', name, `Replace by dropping the real file at ${rel.replace(/\.placeholder$/, '')}`];
  const ext = path.extname(name).toLowerCase();
  if (ext === '.pdf') return pdf(msg);
  if (ext === '.zip') return Buffer.from('504b0506' + '00'.repeat(18), 'hex'); // valid empty zip
  return Buffer.from(msg.join('\n') + '\n');
}

const write = (rel, buf) => { const p = path.join(out, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, buf); };
const wj = (rel, o) => write(rel, JSON.stringify(o, null, 2) + '\n');
const placeholders = [];
const addPlaceholder = (rel, name) => {
  if (fs.existsSync(path.join(out, rel.replace(/\.placeholder$/, '')))) return; // real file present
  write(rel, placeholder(name, rel)); placeholders.push(rel);
};

for (const uz of dump.uz) {
  const n = uz.n;
  for (const lang of LANGS) {
    const tr = dump[lang][n];
    wj(`lessons/${n}/lesson.${lang}.json`, clean(lang === 'uz' ? structuredClone(uz) : localize(uz, tr)));
  }
  // every downloadable file: files/<slug><ext>.placeholder
  const seen = new Set();
  (function walk(o) {
    if (Array.isArray(o)) return o.forEach(walk);
    if (!o || typeof o !== 'object') return;
    if (o.slug && o.name) {
      if (seen.has(o.slug)) throw new Error(`duplicate slug ${o.slug} in lesson ${n}`);
      seen.add(o.slug);
      addPlaceholder(`lessons/${n}/files/${o.slug}${path.extname(o.name).toLowerCase()}.placeholder`, o.name);
    }
    Object.values(o).forEach(walk);
  })([uz.materials, uz.praktikum]);
  if (uz.hasBook) {
    addPlaceholder(`lessons/${n}/book.pdf.placeholder`, 'book.pdf');
    for (const v of uz.bookVariants) addPlaceholder(`lessons/${n}/book.${v.v}.pdf.placeholder`, `book.${v.v}.pdf`);
  }
}

fs.mkdirSync(path.join(out, 'prep'), { recursive: true });
for (const l of LANGS) fs.copyFileSync(path.join(root, `.design/comp/files/prep-${l}.pdf`), path.join(out, `prep/prep-${l}.pdf`));
console.log(`placeholders written: ${placeholders.length}`);
placeholders.forEach((p) => console.log('  content/' + p));
