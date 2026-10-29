import { launch, SP } from './cdp_fe.mjs';
const OLD = 'file:///' + SP + '/base/final-2038.html?lang=uz', NEW = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html?lang=uz';
const routes = ['#/kirish', '#/dastur', '#/dars/0', '#/dars/1', '#/dars/3', '#/dars/1/amaliyot', '#/dars/1/amaliyot/01', '#/dars/1/amaliyot/06', '#/dars/1/vazifa', '#/dars/2/vazifa', '#/dars/2/amaliyot', '#/dars/4/amaliyot/07', '#/dars/4/kitob', '#/dars/1/slayd/14'];
for (const W of [1440, 390]) for (const [tag, url] of [['old', OLD], ['new', NEW]]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(url + '#/dastur'); await b.ev('localStorage.clear()'); await b.goto(url + '#/dastur'); await b.ev('S.setU4(true);render()');
  for (const r of routes) { await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(r === '#/kirish' ? 700 : 400); await b.ev('document.activeElement&&document.activeElement.blur&&document.activeElement.blur()'); await b.shot(`pc/${tag}_${r.replace(/[#\/]/g, '_')}_${W}`, true); }
  b.close();
}
