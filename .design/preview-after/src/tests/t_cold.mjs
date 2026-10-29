import { launch } from './cdp_fe.mjs';
const T = process.argv[2] || 'http://localhost:8765/comp/index.html';
const b = await launch(390, 844, true);
let n = 0;
for (const h of ['#/dars/1/amaliyot/03a', '#/dars/1/vazifa/promptlar', '#/dars/3/slayd/5', '#/fayl/prep-uz-pdf', '#/dastur']) {
  await b.goto(`${T}?solo&cold=${++n}${h}`); await b.wait(300);
  const hist = await b.ev('[location.hash, history.length, JSON.stringify(history.state)]'); await b.ev('history.back()'); await b.wait(300);
  console.log(h.padEnd(30), JSON.stringify(hist), '-> Back:', await b.ev('location.hash'));
}
b.close();
