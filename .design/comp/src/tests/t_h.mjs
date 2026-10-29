import { launch, URL } from './cdp_fe.mjs';
for (const [W,H] of [[1440,900],[390,844],[320,700]]) {
  const b = await launch(W,H,W<600);
  await b.goto(URL+'?solo&view=gate&id=AIP-7KQ2XM'); await b.wait(2700);
  console.log(W,'after login', await b.ev('JSON.stringify({view:document.body.dataset.view,focus:document.activeElement.tagName+":"+document.activeElement.textContent.trim(),sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,popup:!document.getElementById("nl").hidden})'));
  await b.goto(URL+'?solo&view=dastur'); console.log(W,'h1 count/visible', await b.ev('JSON.stringify([...document.querySelectorAll("#s-dastur h1")].map(h=>[h.textContent,h.getBoundingClientRect().width]))'), 'sw', await b.ev('document.documentElement.scrollWidth'));
  b.close();
}
