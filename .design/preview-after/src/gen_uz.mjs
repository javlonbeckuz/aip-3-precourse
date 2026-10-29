// Regenerates i18n_uz.json (key -> {uz, translate, note}) from I18N.uz in proto_i18n.js + the c.* content registered by proto_data.js. build.py runs it.
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const H = dirname(fileURLToPath(import.meta.url));
const src = ['proto_i18n.js', 'proto_data.js'].map(f => readFileSync(join(H, f), 'utf8')).join('\n') + '\nregisterContent();\nJSON.stringify(i18nExport(), null, 1)';
const ctx = vm.createContext({ location: { search: '' }, localStorage: { getItem: () => null, setItem() {} }, document: { body: { classList: { contains: () => true } } }, URLSearchParams, Intl, console });
const json = vm.runInContext(src, ctx);
writeFileSync(join(H, 'i18n_uz.json'), json);
const o = JSON.parse(json), ks = Object.keys(o);
console.log('i18n_uz.json:', ks.length, 'keys,', ks.filter(k => o[k].translate).length, 'translatable,', ks.filter(k => !o[k].translate).length, 'content');
