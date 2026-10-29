import { launch } from './lib2.mjs';
const [file, w, views] = [process.argv[2], +process.argv[3], process.argv[4].split(',')];
const mobile = w < 700;
const b = await launch(w, 900, ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']);
for (const v of views) {
  const [view, extra = ''] = v.split('+');
  await b.size(w, 900, mobile);
  await b.goto(`http://localhost:8765/comp/${file}.html?solo&view=${view}${extra ? '&' + extra : ''}`, 3000);
  const H = await b.ev('document.documentElement.scrollHeight'); await b.size(w, Math.min(H, 6000), mobile); await b.wait(4000);
  await b.fullshot(`../ca/${file.replace('design-', '')}_${view}${extra.replace(/[^a-z0-9]/gi, '')}_${w}`);
  console.log(file, view, extra, w, 'H', H);
}
console.log(JSON.stringify(b.logs.filter(l => !l.includes('favicon'))));
b.close();
