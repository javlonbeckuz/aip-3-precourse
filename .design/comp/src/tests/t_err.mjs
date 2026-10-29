import { launch } from './cdp_fe.mjs';
const b = await launch(390, 844, true); await b.goto('http://localhost:8765/comp/index.html?solo#/dastur'); await b.wait(1000);
console.log(JSON.stringify(b.logs), await b.ev('typeof S'), await b.ev('document.body.dataset.view')); b.close(); process.exit(0);
