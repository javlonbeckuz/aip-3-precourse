import { launch } from './cdp_fe.mjs';
const T = process.argv[2] || 'http://localhost:8765/comp/index.html', W = +process.argv[3] || 1440;
const b = await launch(W, 900, W < 600);
const R = (k, v) => console.log(k.padEnd(46), typeof v === 'string' ? v : JSON.stringify(v));
await b.goto(T + '?solo#/dastur'); await b.ev('localStorage.clear()'); await b.goto(T + '?solo#/dastur');
R('uz: html lang / aria-current (menu)', await b.ev('[document.documentElement.lang,[...document.querySelectorAll(".nm-lang [data-lang]")].map(x=>x.dataset.lang+":"+x.hasAttribute("aria-current")).join(",")]'));
// every route: uz -> ru (empty) -> en (empty) -> uz must give the same text
await b.ev('S.setU4(true);render()'); const routes = await b.ev('ROUTES()'); const diffs = [];
for (const r of routes) { if (r === '#/kirish' || r === '#/shrift') continue; await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(100);
  const txt = () => b.ev('document.querySelector("#s-app").innerText + "|" + document.documentElement.lang');
  const u1 = (await txt()).split('|')[0]; await b.ev('setLang("ru")'); await b.wait(60); const ru = await txt(); await b.ev('setLang("en")'); await b.wait(60); const en = await txt(); await b.ev('setLang("uz")'); await b.wait(60); const u2 = (await txt());
  if (ru.split('|')[0] !== u1 || en.split('|')[0] !== u1 || u2.split('|')[0] !== u1 || ru.split('|')[1] !== 'ru' || en.split('|')[1] !== 'en' || u2.split('|')[1] !== 'uz-Latn') diffs.push(r); }
R('routes: uz->ru->en->uz identical text (dict empty)', {routes: routes.length - 2, differing: diffs});
await b.goto(T + '?solo#/kirish'); await b.click('.gate-lang [data-lang="ru"]'); await b.wait(150);
R('gate RU button -> lang/current/stored', await b.ev('[document.documentElement.lang,[...document.querySelectorAll(".gate-lang [data-lang]")].map(x=>x.dataset.lang+":"+x.hasAttribute("aria-current")).join(","),localStorage.getItem("aip3.lang")]'));
await b.goto(T + '?solo#/kirish'); R('reload keeps the language', await b.ev('document.documentElement.lang'));
await b.goto(T + '?solo&lang=en#/dastur'); R('?lang=en', await b.ev('[document.documentElement.lang,localStorage.getItem("aip3.lang")]'));
// injected translations: text, \n, params, plural, dates
await b.goto(T + '?solo&lang=ru#/dastur');
const ruDict = {'home.title': 'Программа', 'gate.title': 'Личный\nкабинет', 'date.fmt': '{d} {m}', 'note.open': 'Открыт · {d}/{t}', 'note.done': 'Пройден · {d}/{t} шагов', 'note.done#many': 'Пройден · {d}/{t} шагов', 'note.done#few': 'Пройден · {d}/{t} шага', 'note.done#one': 'Пройден · {d}/{t} шаг', 'lesson.label': 'Урок {n} · {date}', 'hero.k': 'Идёт сейчас'};
await b.ev(`Object.assign(I18N.ru,${JSON.stringify(ruDict)});setLang('ru')`); await b.wait(250);
R('ru title / sr h1 / blue card label', await b.ev('[document.title, document.querySelector("#s-app .sr-only").textContent, document.querySelector(".now-card .f-label").innerText.split("\\n").join(" | ")]'));
R('ru plural: 6 many, 3 few, 1 one', await b.ev('[t("note.done",{d:6,t:6,pl:6}),t("note.done",{d:3,t:3,pl:3}),t("note.done",{d:1,t:1,pl:1})]'));
R('ru dates (table + pattern)', await b.ev('[fmtDate(12,9),fmtDate(3,10)]'));
await b.ev('location.hash="#/kirish"'); await b.wait(150); R('gate title (newline -> br)', await b.ev('document.querySelector(".mx h1").innerHTML'));
await b.ev(`Object.assign(I18N.en,{'date.fmt':'{d} {m}'});setLang('en')`); R('en date', await b.ev('fmtDate(12,9)'));
await b.goto(T + '?lang=ru#/dastur'); await b.wait(300); R('?review ru: dotted fallback spans on home', await b.ev('document.querySelectorAll("#s-app .i18n-miss").length'));
await b.goto(T + '?lang=uz#/dastur'); await b.wait(300); R('?review uz: no markers', await b.ev('document.querySelectorAll(".i18n-miss").length'));
await b.goto(T + '?solo&lang=ru#/dastur'); await b.wait(300); R('solo ru: no markers', await b.ev('document.querySelectorAll(".i18n-miss").length'));
await b.goto(T + '?solo#/dastur'); await b.ev('localStorage.clear()');
R('console', b.logs.filter(l => !/favicon/.test(l)));
b.close();
