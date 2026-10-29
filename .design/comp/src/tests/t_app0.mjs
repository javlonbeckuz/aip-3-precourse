import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3055';
const b = await launch(390,844,true);
await b.goto(B+'/aip/'); await b.wait(1200);
console.log('url', await b.ev('location.href'), 'view', await b.ev('document.body.dataset.view'), 'booting', await b.ev(`document.body.hasAttribute('data-booting')`));
console.log('logs', b.logs);
await b.shot('app-gate'); b.close();
