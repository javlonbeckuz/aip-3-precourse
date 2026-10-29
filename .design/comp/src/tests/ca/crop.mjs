// crop.mjs in.png out.png y h  — crop with the browser (no deps)
import { launch } from './lib2.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const [i, o, y, h] = [process.argv[2], process.argv[3], +process.argv[4], +process.argv[5]];
const b = await launch(600, 600);
const data = readFileSync(i).toString('base64');
const out = await b.ev(`(async()=>{const im=new Image();im.src='data:image/png;base64,${data}';await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=Math.min(${h},im.height-${y});c.getContext('2d').drawImage(im,0,-${y});return c.toDataURL('image/png').split(',')[1]})()`);
writeFileSync(o, Buffer.from(out, 'base64')); b.close();
