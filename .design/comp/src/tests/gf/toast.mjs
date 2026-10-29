import { launch } from './lib.mjs';
const b = await launch(390, 844); await b.size(390, 844, true);
await b.goto('http://localhost:8765/comp/design-glass.html?solo&view=ex', 2500);
await b.ev(`navigator.clipboard.writeText = async () => {}; document.querySelectorAll('.s1 .cp')[1].scrollIntoView({block:'center'}); document.querySelectorAll('.s1 .cp')[1].click()`); await b.wait(900); await b.shot('O_toast_390'); b.close();
