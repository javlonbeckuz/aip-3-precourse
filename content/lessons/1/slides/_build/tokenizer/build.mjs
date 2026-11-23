// Builds the offline tokenizer vendor files for day-1/demos/tokenizer. Paths resolve relative to this file.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const vendor = join(here, '..', '..', 'demos', 'tokenizer', 'vendor');
mkdirSync(vendor, { recursive: true });

await build({
  entryPoints: [join(here, 'entry-o200k.js')],
  bundle: true, format: 'iife', minify: true, target: 'es2019',
  outfile: join(vendor, 'o200k.js'),
  banner: { js: '/* js-tiktoken 1.0.21 (MIT) with OpenAI o200k_base ranks (MIT). Built by day-1/_build/tokenizer/build.mjs. */' },
});

const tj = JSON.parse(readFileSync(join(here, 'cache', 'deepseek-ai_DeepSeek-V4-Pro-0813', 'tokenizer.json'), 'utf8'));
const pre = tj.pre_tokenizer;
const splits = (pre.type === 'Sequence' ? pre.pretokenizers : [pre])
  .filter(p => p.type === 'Split')
  .map(p => { if (p.behavior !== 'Isolated' || p.invert) throw new Error('unsupported split'); return p.pattern.Regex; });
const norm = tj.normalizer && tj.normalizer.type === 'NFC' ? 'NFC' : null;
const merges = tj.model.merges.map(m => (typeof m === 'string' ? m : m[0] + ' ' + m[1]));
const data = { name: 'DeepSeek V4 Pro', repo: 'deepseek-ai/DeepSeek-V4-Pro-0813', license: 'MIT', normalizer: norm, splits, merges };
writeFileSync(join(vendor, 'deepseek-v4.js'),
  '/* DeepSeek V4 Pro tokenizer data (MIT, deepseek-ai/DeepSeek-V4-Pro-0813 tokenizer.json): pre-tokenizer splits and BPE merges. Built by day-1/_build/tokenizer/build.mjs. */\nwindow.TOK_DATA_DEEPSEEK=' + JSON.stringify(data) + ';\n');
copyFileSync(join(here, 'hfbpe.js'), join(vendor, 'hfbpe.js'));
console.log('built vendor files, merges:', merges.length, 'splits:', splits.length);
