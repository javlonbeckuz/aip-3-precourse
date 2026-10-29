import { launch, URL } from './cdp.mjs';
const b = await launch(390, 844, true); await b.goto(URL + '?solo&view=gate');
console.log(await b.ev(`(()=>{const g=document.getElementById('gid');g.focus();g.value='aip-7k';g.dispatchEvent(new InputEvent('input',{isComposing:true,bubbles:true}));const mid=g.value;g.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true}));const after=g.value;
g.value='7K Q2';g.setSelectionRange(3,3);g.dispatchEvent(new InputEvent('input',{bubbles:true}));return JSON.stringify({mid,after,caretVal:g.value,caret:g.selectionStart})})()`));
b.close();
