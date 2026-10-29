import { launch, SP } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const [w,h,m,lang,n] of [[1440,900,false,'uz','uz-1440'],[390,844,true,'uz','uz-390'],[390,844,true,'ru','ru-390']]) {
  const b = await launch(w,h,m);
  await b.goto(BASE+'?lang='+lang+'#/dars/0'); await b.wait(500);
  console.log(n, await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,ns:document.querySelectorAll('.ns').length,steps:document.querySelectorAll('.steps li').length,a:document.querySelectorAll('.s1-pdf').length})`), b.logs);
  await b.shot('prep-'+n, true); b.close();
}
