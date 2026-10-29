import { launch, URL } from './cdp_fe.mjs';
const W = +process.argv[2] || 390, H = W > 600 ? 900 : 844;
const b = await launch(W, H, W < 600);
const small = `(()=>{const out=[];document.querySelectorAll('.screen.is-on a,.screen.is-on button,.nl a,.nl button,.toast button,.nmenu a').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.height&&(r.height<44||r.width<44)&&!e.closest('.comp-bar')){out.push((e.className||e.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' '+e.textContent.trim().slice(0,24))}});return out})()`;
const overflow = `({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`;
async function page(name, q, fn) {
  await b.goto(URL + '?solo&' + q);
  if (fn) await fn();
  await b.wait(1200);
  console.log(name, JSON.stringify(await b.ev(overflow)), 'small:', JSON.stringify(await b.ev(small)));
  await b.shot(`${name}_${W}`, true);
}
await page('u_dastur', 'view=dastur');
await page('u_dastur_popup', 'view=dastur&newlesson');
await page('u_dastur_menu', 'view=dastur&newlesson', async () => { await b.click(W > 600 ? '.nav-name' : '.menu-btn'); });
await page('u_dastur_sheet', 'view=dastur', async () => { await b.click('[data-sheet]'); });
await page('u_dars_t1', 'view=dars&tabtest=1');
await page('u_dars_t2', 'view=dars&tabtest=2');
await page('u_ex_copy', 'view=ex', async () => {
  await b.ev(`navigator.clipboard.writeText=async()=>{}`);
  await b.click('.s1 li[data-i="1"] .cp'); await b.wait(300);
});
await page('u_ex_selftest', 'view=ex&selftest');
console.log('selftest:', await b.ev(`document.body.dataset.test`));
console.log('logs', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
