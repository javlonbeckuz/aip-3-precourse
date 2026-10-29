import {spawn} from 'node:child_process';
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--remote-debugging-port=9333','--user-data-dir='+'C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad/cdp-prof','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,2500));
const tabs = await (await fetch('http://127.0.0.1:9333/json')).json();
const ws = new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0; const pend={}; const logs=[];
ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend[m.id]){pend[m.id](m.result);delete pend[m.id]} else if(m.method==='Runtime.consoleAPICalled'||m.method==='Runtime.exceptionThrown') logs.push(JSON.stringify(m.params).slice(0,300))};
const send=(method,params={})=>new Promise(r=>{pend[++id]=r;ws.send(JSON.stringify({id,method,params}))});
const ev=async expr=>(await send('Runtime.evaluate',{expression:expr,awaitPromise:true,returnByValue:true})).result.value;
await send('Runtime.enable'); await send('Page.enable');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

const sleep2=ms=>new Promise(r=>setTimeout(r,ms));
for (const w of [320,360,390,900,1100,1440]) {
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:w<500});
  for (const t of [0,1,2,3]) {
    await send('Page.navigate',{url:'http://localhost:8765/comp/index.html?solo&view=dars&tabtest='+t}); await sleep2(2200);
    const r=await ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,gt:document.getElementById('dg').offsetHeight,tab:document.getElementById('dg-t0').getBoundingClientRect().height,vis:[...document.querySelectorAll('#dg .gt-pane:not([hidden])')].map(p=>({sh:p.scrollHeight,ch:p.clientHeight})),links:[...document.querySelectorAll('#dg .gt-pane:not([hidden]) a')].map(a=>Math.round(a.getBoundingClientRect().height))})`);
    console.log(w,t,r);
  }
  const shot=await send('Page.captureScreenshot',{format:'png'});
}
console.log('logs',logs);
chrome.kill(); process.exit(0);
