import { launch } from './cdp_fe.mjs';
const OLD = 'file:///C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad/old_export.html?solo', NEW = 'http://localhost:8765/comp/index.html?solo';
const routes = ['#/kirish', '#/dastur', '#/dars/0', '#/dars/1', '#/dars/3', '#/dars/1/amaliyot/01', '#/dars/1/vazifa', '#/dars/2/vazifa', '#/dars/4/amaliyot/07', '#/dars/1/slayd/14', '#/dars/2/amaliyot'];
for (const W of [1440, 390]) for (const [tag, url] of [['old', OLD], ['new', NEW]]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(url + '#/dastur'); await b.ev('localStorage.clear()'); await b.goto(url + '#/dastur'); await b.ev('S.setU4(true);render()');
  for (const r of routes) { await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(r === '#/kirish' ? 500 : 350); await b.ev('document.activeElement&&document.activeElement.blur&&document.activeElement.blur()'); await b.shot(`cmp_${tag}_${r.replace(/[#\/]/g, '_')}_${W}`, true); }
  b.close();
}
