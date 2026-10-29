p='proto_i18n.js'; s=open(p,encoding='utf-8').read()
s=s.replace("const I18N_KEY_NOTES = { // key-specific context (checked before the prefix rules)\n","const I18N_KEY_NOTES = { // key-specific context (checked before the prefix rules)\n  'nav.label': 'aria-label of the top navigation', 'nav.home': 'top-left nav link and the back link back to the home screen, ≤ 12 chars', 'row.mark': 'mark at the right of an exercise row: \"2/4 prompt\" (12px mono, ≤ 12 chars)',\n",1)
open(p,'w',encoding='utf-8').write(s)
