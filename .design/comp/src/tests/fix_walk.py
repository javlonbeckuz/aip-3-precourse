p='proto_i18n.js'; s=open(p,encoding='utf-8').read()
old="const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), hits = [];"
assert old in s
s=s.replace(old,"const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT}), hits = [];")
open(p,'w',encoding='utf-8').write(s)
a=open('assemble.py',encoding='utf-8').read()
old2="  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);\n  for (let n; (n = w.nextNode());) if (/[ʻʼ]/.test(n.nodeValue)) n.nodeValue = map(n.nodeValue);"
assert old2 in a
a=a.replace(old2,"  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});\n  for (let n; (n = w.nextNode());) if (/[ʻʼ]/.test(n.nodeValue)) n.nodeValue = map(n.nodeValue);")
open('assemble.py','w',encoding='utf-8').write(a)
