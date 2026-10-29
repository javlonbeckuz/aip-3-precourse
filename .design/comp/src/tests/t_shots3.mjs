import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const b = await launch(1440, 900, false);
await b.goto(BASE + '?lang=ru#/dars/2/amaliyot'); await b.wait(500); await b.ev('document.querySelector(".lib-rules").open=true'); await b.wait(200);
await b.ev('scrollTo(0, document.querySelector(".lib-rules").getBoundingClientRect().top + scrollY - 100)'); await b.wait(200); await b.shot('rules_open_ru_1440');
b.close();
