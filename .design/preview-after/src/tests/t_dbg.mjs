import { launch } from './cdp_fe.mjs';
const T = 'http://localhost:8765/comp/index.html';
const b = await launch(390, 844, true);
await b.goto(T + '?solo#/dastur'); await b.ev('localStorage.clear()'); await b.goto(T + '?solo#/dastur');
console.log(await b.ev('JSON.stringify([S.u4(), !!document.querySelector("[data-sheet]"), location.hash, document.body.dataset.view, document.querySelectorAll(".lessons li").length])'));
b.close();
