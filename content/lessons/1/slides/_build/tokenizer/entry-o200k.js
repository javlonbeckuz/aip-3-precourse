// Bundled by build.mjs into demos/tokenizer/vendor/o200k.js (classic script, works on file://).
import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';
window.TOK_O200K = new Tiktoken(o200k_base);
