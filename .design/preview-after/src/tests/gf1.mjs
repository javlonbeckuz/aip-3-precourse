import { launch, SP } from './cdp.mjs';
const w = +process.argv[2] || 1440, h = +process.argv[3] || 900;
const b = await launch(w, h);
await b.goto('http://localhost:8765/comp/glass-options.html');
await b.wait(2500);
// make the viewport as tall as the page so every IntersectionObserver fires, then settle
const H = await b.ev('document.documentElement.scrollHeight');
await b.send('Emulation.setDeviceMetricsOverride', { width: w, height: H, deviceScaleFactor: 1, mobile: false });
await b.wait(5000);
await b.shot(`gf_full_${w}`, true);
console.log(H, JSON.stringify(b.logs.slice(0,10)));
b.close();
