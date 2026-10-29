import { launch } from './cdp_fe.mjs';
const b = await launch(1440, 900, false);
await b.goto('file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html?review&lang=ru#/dastur'); await b.wait(400);
console.log('export ?review&lang=ru markers:', await b.ev('document.querySelectorAll("#s-app .i18n-miss").length'), '| comp bar visible:', await b.ev('getComputedStyle(document.querySelector(".comp-bar")).display'));
await b.goto('file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html?lang=en#/dastur'); await b.wait(400);
console.log('export default (real mode) markers:', await b.ev('document.querySelectorAll(".i18n-miss").length'), '| comp bar:', await b.ev('getComputedStyle(document.querySelector(".comp-bar")).display'), '| html lang:', await b.ev('document.documentElement.lang'));
await b.goto('file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html?solo&view=ex&selftest'); await b.wait(900); console.log('export selftest:', (await b.ev('document.body.dataset.test')).slice(0,120));
b.close();
