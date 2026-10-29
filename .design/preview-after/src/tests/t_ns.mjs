import { launch, URL } from './cdp.mjs';
for (const [W,H] of [[1440,900],[390,844]]) { const b = await launch(W,H,W<600); await b.goto(URL+'?view=dastur&newlesson'); await b.shot('ns_popup_'+W); await b.goto(URL+'?view=dars&tabtest=1'); await b.shot('ns_dars_'+W); b.close(); }
