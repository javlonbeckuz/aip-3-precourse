// Prints the lesson-0 setup guide PDFs (content/prep/prep-{uz,ru,en}.pdf) from the real data:
//   text  = content/lessons/0/lesson.{lang}.json -> prep.intro + prep.items (not prep.more)
//   art   = PREP_ART in .design/comp/src/proto_data.js (same order as the cards)
//   fonts = public/aip/fonts (local, no network)
// Run: node .design/prep-pdf/build.mjs   -> writes prep-xx.html here, prints with headless Chrome, writes the PDFs to
// content/prep/ and copies them to .design/comp/files/ (gen_prep_pdf.py reads the latter). Then: python .design/comp/src/gen_prep_pdf.py
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const H = dirname(fileURLToPath(import.meta.url)), ROOT = resolve(H, '..', '..');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const UI = {
  uz: { lang: 'uz-Latn', meta: '0-dars · tayyorgarlik', title: 'Birinchi darsgacha', all30: 'Hammasi 30 daqiqa', date: '21-noyabr (shanba guruhi) yoki 22-noyabr (yakshanba guruhi)' },
  ru: { lang: 'ru', meta: 'Урок 0 · подготовка', title: 'До первого урока', all30: 'Всё займёт около 30 минут', date: '21 ноября (группа субботы) или 22 ноября (группа воскресенья)' },
  en: { lang: 'en', meta: 'Lesson 0 · preparation', title: 'Before the first lesson', all30: 'About 30 minutes in all', date: '21 November (Saturday group) or 22 November (Sunday group)' },
};
const data = readFileSync(join(ROOT, '.design/comp/src/proto_data.js'), 'utf8');
const ART = JSON.parse(data.match(/\/\*ART:begin\*\/ const PREP_ART = (\[.*?\]); \/\*ART:end\*\//s)[1]);
const fonts = readFileSync(join(ROOT, '.design/comp/src/fonts.css'), 'utf8').replaceAll('url(fonts/', 'url(../../public/aip/fonts/');
const CSS = readFileSync(join(H, 'deck.css'), 'utf8');
const X = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const pad = n => String(n).padStart(2, '0');
const host = s => s.replace(/^https?:\/\//, '').replace(/\/$/, '');

for (const L of Object.keys(UI)) {
  const u = UI[L], { intro, items } = JSON.parse(readFileSync(join(ROOT, `content/lessons/0/lesson.${L}.json`), 'utf8')).prep;
  if (items.length !== ART.length) throw new Error(`${L}: ${items.length} cards but ${ART.length} pictures`);
  const total = items.length + 2;
  const hd = n => `<div class="top"><span class="wm">AI Praktikum 3.0</span><span class="mt">${X(u.meta)}<b>${pad(n)} / ${pad(total)}</b></span></div>`;
  let h = `<section class="slide">${hd(1)}<div class="cover"><div class="l"><h1 class="disp">${X(u.title)}</h1><p class="lede">${X(intro.replace('{sana}', u.date))}</p></div><div class="r card">${ART.join('')}</div></div></section>`;
  h += `<section class="slide">${hd(2)}<h2 class="ov-h disp">${X(u.all30)}</h2><div class="ov">${items.map((it, i) => `<div class="card"><span class="no">${pad(i + 1)}</span><h3 class="t disp">${X(it.title)}</h3>${ART[i]}<p class="n">${X(it.note)}</p></div>`).join('')}</div></section>`;
  items.forEach((it, i) => {
    h += `<section class="slide">${hd(i + 3)}<div class="item"><div class="card"><span class="no">${pad(i + 1)}</span>${ART[i]}<span></span></div><div class="rt"><h2 class="disp">${X(it.title)}</h2><p class="note">${X(it.note)}</p>`
      + `<ol class="steps">${it.steps.map((s, j) => `<li><i>${j + 1}</i><span>${X(s)}</span></li>`).join('')}</ol>`
      + (it.actions?.length ? `<div class="acts">${it.actions.map((a, j) => `<a class="act${j ? '' : ' p'}" href="${a.url}"><b>${X(a.label)}</b><span>${host(a.url)}</span></a>`).join('')}</div>` : '')
      + (it.footnote ? `<p class="foot">${X(it.footnote)}</p>` : '') + `</div></div></section>`;
  });
  const html = `<!doctype html>\n<html lang="${u.lang}"><head><meta charset="utf-8"><title>${X(u.title)} · AI Praktikum 3.0</title>\n<style>\n${fonts}\n${CSS}</style></head>\n<body>${h}</body></html>\n`;
  const page = join(H, `prep-${L}.html`), pdf = join(ROOT, 'content/prep', `prep-${L}.pdf`);
  writeFileSync(page, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=10000', `--print-to-pdf=${pdf}`, pathToFileURL(page).href], { stdio: 'ignore' });
  copyFileSync(pdf, join(ROOT, '.design/comp/files', `prep-${L}.pdf`));
  console.log(L, total, 'pages,', Math.round(readFileSync(pdf).length / 1024), 'KB');
}
