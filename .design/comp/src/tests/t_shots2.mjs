import { launch } from './cdp_fe.mjs';
const T = 'http://localhost:8765/comp/index.html?solo';
for (const W of [390, 1440]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(T + '#/dars/2/amaliyot'); await b.wait(400);
  await b.ev('document.querySelector("#L03 .acc").click();scrollTo(0, document.querySelector("#lib-list li:nth-child(2)").getBoundingClientRect().top + scrollY - 60)'); await b.wait(300);
  await b.shot('s2_lib_' + W);
  await b.goto(T + '#/dars/1/amaliyot/06'); await b.wait(300); await b.shot('s2_ex06_' + W, true);
  await b.ev('location.hash="#/dars/1/slayd/78"'); await b.wait(300); await b.shot('s2_slide_' + W);
  b.close();
}
