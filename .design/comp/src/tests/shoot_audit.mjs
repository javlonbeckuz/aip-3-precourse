// screenshots of the audit-2026-10-19 screens: node shoot_audit.mjs <width> <lang> <tag> [route ...]   (SHOT_DIR = output folder)
import { launch } from './cdp_fe.mjs';
const [W, LANG, TAG, ...R] = [+process.argv[2] || 390, process.argv[3] || 'uz', process.argv[4] || 'x', ...process.argv.slice(5)];
const routes = R.length ? R.map(x => '#/' + x) : ['#/dastur', '#/dars/1', '#/dars/1/amaliyot/01', '#/dars/4/amaliyot', '#/dars/4/amaliyot/10', '#/dars/4/amaliyot/04', '#/dars/2', '#/dars/4', '#/dars/0'];
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
const U = 'http://localhost:8765/comp/index.html?solo';
await b.goto(U + '#/dastur'); await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(U + '#/dastur');
await b.ev('S.setU4(true); render()'); if (LANG !== 'uz') await b.ev(`setLang('${LANG}')`); await b.wait(500);
for (const r of routes) { await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(900); await b.shot(`${TAG}-${W}-${LANG}-${r.replace(/[#\/?=]+/g, '_')}`, true); }
console.log('console:', JSON.stringify(b.logs)); b.close(); process.exit(0);
