import { launch } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const b = await launch(1440, 900, false);
await b.goto('http://localhost:8765/comp/index.html?solo#/dastur');
const json = await b.ev('JSON.stringify(i18nExport(), null, 1)');
writeFileSync('C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad/i18n_uz.json', json);
const o = JSON.parse(json); const ks = Object.keys(o);
console.log('keys', ks.length, 'translatable', ks.filter(k => o[k].translate).length, 'content', ks.filter(k => !o[k].translate).length);
b.close();
