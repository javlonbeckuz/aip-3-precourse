import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 1440, U = 'http://localhost:8765/comp/index.html?solo', SP = process.env.SHOT_DIR;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(U + '#/dastur'); await b.wait(1200); await b.ev('S.setU4(true); render()'); await b.wait(500);
for (const [r, n] of [['#/dastur', 'home'], ['#/dars/1', 'lesson']]) { await b.ev(`location.hash='${r}'`); await b.wait(800); await b.shot(`bgp-${W}-${n}`); }
for (const t of [0, 6000, 12000]) { await b.ev(`location.hash='#/dastur'`); await b.ev(`document.getAnimations().forEach(a=>{a.pause();a.currentTime=${t}})`); await b.wait(200); await b.shot(`bgp-${W}-strip-${t / 1000}s`); }
console.log(await b.ev("document.querySelectorAll('.bgp path').length+' paths, view='+document.body.dataset.view"), JSON.stringify(b.logs.filter(l => !/favicon/.test(l)))); b.close(); process.exit(0);
