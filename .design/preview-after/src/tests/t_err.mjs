import { launch } from './cdp_fe.mjs';
const b = await launch(1440, 900, false);
await b.goto(process.argv[2] || 'http://localhost:8765/comp/index.html?solo#/dastur');
console.log(JSON.stringify(b.logs, null, 1).slice(0, 1500));
b.close();
