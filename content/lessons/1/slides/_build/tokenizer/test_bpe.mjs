// Checks the browser tokenizers against the Python reference (expected.json from measure.py).
// Run: node test_bpe.mjs   (paths resolve relative to this file). Exit 1 on any mismatch.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const HFBPE = require(join(here, 'hfbpe.js'));
const vendor = join(here, '..', '..', 'demos', 'tokenizer', 'vendor');
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(vendor, 'deepseek-v4.js'), 'utf8'), sandbox);
const ds = HFBPE.create(sandbox.window.TOK_DATA_DEEPSEEK);
const o200k = new Tiktoken(o200k_base);
// the bundled browser file must also load and agree
const sb2 = { window: {}, TextEncoder, TextDecoder };
vm.runInNewContext(readFileSync(join(vendor, 'o200k.js'), 'utf8'), sb2);
const o200kBundled = sb2.window.TOK_O200K;

const fixtures = JSON.parse(readFileSync(join(here, 'expected.json'), 'utf8'));
let fail = 0;
for (const f of fixtures) {
  const a = o200k.encode(f.text);
  const b = o200kBundled.encode(f.text);
  const okO = JSON.stringify(a) === JSON.stringify(f.o200k) && JSON.stringify(b) === JSON.stringify(f.o200k);
  const d = ds.encode(f.text);
  const okD = JSON.stringify(d) === JSON.stringify(f.deepseek);
  if (!okO || !okD) {
    fail++;
    console.log('MISMATCH', JSON.stringify(f.text).slice(0, 60));
    if (!okO) console.log('  o200k js', a.length, b.length, 'py', f.o200k.length);
    if (!okD) console.log('  deepseek js', d.length, JSON.stringify(d), '\n  py', f.deepseek.length, JSON.stringify(f.deepseek));
  }
}
console.log(`${fixtures.length - fail}/${fixtures.length} texts match (o200k + DeepSeek V4 Pro)`);
process.exit(fail ? 1 : 0);
