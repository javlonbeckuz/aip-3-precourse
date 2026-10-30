// Puts the approved Kit material into content/: kit-short-<n>.json -> lesson.uz.json "kit", every listed file copied to
// content/lessons/<n>/files/<slug><ext> with its real size, the [shakl matni] fixes applied, and kompaniya.zip on 02-dars Amaliyot "02 Kompaniya papkasi".
// Re-runnable. Usage: node .design/drafts/3.0-materials/integrate.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const D = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(D, '../../..'), C = path.join(ROOT, 'content', 'lessons');
const readJ = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJ = (f, j) => fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
// where a file of lesson n comes from: the PDFs, else that lesson's draft folder, else any lesson's folder (Kit 5 B is shared)
function source(n, name){
  for (const p of [path.join(D, 'pdf', name), path.join(D, 'files', String(n), name), ...['1', '3', '4', '5', '6', '7'].map(k => path.join(D, 'files', k, name))])
    if (fs.existsSync(p)) return p;
  throw new Error(`lesson ${n}: no source for ${name}`);
}
function place(n, f, src){
  const dir = path.join(C, String(n), 'files'); fs.mkdirSync(dir, {recursive: true});
  const out = path.join(dir, f.slug + path.extname(f.name).toLowerCase());
  fs.copyFileSync(src, out); f.size = fs.statSync(out).size;
}
for (const n of [1, 3, 4, 5, 6, 7]) {
  const kit = readJ(path.join(D, `kit-short-${n}.json`)).kit, lf = path.join(C, String(n), 'lesson.uz.json'), L = readJ(lf);
  for (const g of kit.groups) { g.files ??= []; for (const f of g.files) place(n, f, source(n, f.name)); }
  const out = {}; for (const [k, v] of Object.entries(L)) { if (k === 'kit') continue; out[k] = v; if (k === 'amaliyot') out.kit = kit; }   // kit sits between amaliyot and vazifa
  if (!out.kit) out.kit = kit;
  writeJ(lf, out);
  console.log(`lesson ${n}: ${kit.groups.length} groups, ${kit.groups.reduce((a, g) => a + g.files.length, 0)} files`);
}
// the [shakl matni] stand-ins
for (const x of readJ(path.join(D, 'fixes.json'))) {
  const lf = path.join(C, String(x.n), 'lesson.uz.json'), L = readJ(lf);
  const p = L[x.part].groups.flatMap(g => g.prompts || []).find(q => q.id === x.promptId);
  if (!p) throw new Error(`fix: no prompt ${x.promptId} in lesson ${x.n} ${x.part}`);
  p.text = x.newText; writeJ(lf, L); console.log(`fixed ${x.n} ${x.part} ${x.promptId}`);
}
// the company folder starter as a zip (folder kompaniya/ inside), on 02-dars Amaliyot "02 Kompaniya papkasi"
const zip = path.join(D, 'pdf', 'kompaniya.zip');
execFileSync('python', ['-c', `import zipfile,os,sys
src=sys.argv[1]; z=zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED)
for r,ds,fs in os.walk(src):
  rel=os.path.relpath(r,os.path.dirname(src)).replace(os.sep,'/')
  z.writestr(rel+'/','') if not fs and r!=src else None
  for f in fs: z.write(os.path.join(r,f),(rel+'/'+f))
z.close()`, path.join(D, 'files', '3', 'kompaniya'), zip]);
{
  const lf = path.join(C, '3', 'lesson.uz.json'), L = readJ(lf), g = L.amaliyot.groups.find(x => /Kompaniya papkasi/.test(x.title));
  if (!g) throw new Error('02-dars: no "Kompaniya papkasi" group');
  const f = {slug: 'kompaniya-zip', name: 'kompaniya.zip', size: 0}; place(3, f, zip);
  g.files = [...(g.files || []).filter(x => x.slug !== f.slug), f]; writeJ(lf, L); console.log('kompaniya.zip', f.size, 'bytes');
}
