import { launch } from './lib.mjs';
const U = 'http://localhost:8765/comp/design-glass.html?solo';
// popup + menu desktop
{ const b = await launch(1440, 900);
  await b.goto(U + '&view=dastur&newlesson', 3000); await b.wait(800); await b.shot('O_popup_1440');
  await b.ev(`document.querySelector('.nav-name').click()`); await b.wait(500); await b.shot('O_menu_1440'); b.close(); }
for (const w of [390, 320]) {
  const b = await launch(w, 844); await b.size(w, 844, true);
  await b.goto(U + '&view=dastur&newlesson', 3000); await b.wait(600); await b.shot(`O_popup_${w}`);
  await b.ev(`document.querySelector('.nl-x').click()`);
  // locked sheet
  await b.ev(`document.querySelector('.menu-btn').click()`); await b.wait(500); await b.shot(`O_menu_${w}`); await b.ev(`document.querySelector('.menu-btn').click()`);
  await b.ev(`__gl.folders[4].set(true)`); await b.wait(1600);
  await b.ev(`document.querySelector('#gls4 .gl-more').click()`); await b.wait(500); await b.shot(`O_sheet_${w}`);
  b.close();
}
{ const b = await launch(390, 844); await b.size(390, 844, true);
  await b.goto(U + '&view=ex', 2500);
  await b.ev(`document.querySelectorAll('.s1 .cp')[1].scrollIntoView({block:'center'}); document.querySelectorAll('.s1 .cp')[1].click()`); await b.wait(800); await b.shot('O_toast_390'); b.close(); }
for (const w of [390, 320]) {
  const b = await launch(w, 900); await b.size(w, 900, true);
  await b.goto(U + '&view=dars&tabtest=1', 3000); await b.wait(800); 
  await b.ev(`document.querySelector('#dg').scrollIntoView({block:'start'})`); await b.wait(400); await b.shot(`D_tab1_${w}`);
  await b.ev(`document.querySelectorAll('#dg [role=tab]')[2].click()`); await b.wait(800); await b.shot(`D_tab2_${w}`);
  b.close();
}
{ const b = await launch(320, 900); await b.size(320, 900, true);
  await b.goto(U + '&view=dastur&open=0', 3500); await b.wait(1500); await b.shot('G_home_320_0_open'); console.log('sw', await b.ev('document.documentElement.scrollWidth')); b.close(); }
