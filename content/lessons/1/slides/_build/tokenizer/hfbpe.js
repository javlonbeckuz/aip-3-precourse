/* Minimal Hugging Face byte-level BPE tokenizer for the browser (offline, no WASM, no modules).
   Supports what the DeepSeek V4 tokenizer.json uses: optional NFC normalizer, a Sequence of
   Split pre-tokenizers with behavior "Isolated", then ByteLevel (no regex), then BPE merges.
   Usage: var tok = HFBPE.create(data); tok.encode(text) -> array of token strings (byte-level form);
          tok.count(text) -> number; HFBPE.toText(tokenString) -> readable text for display.
   data = { normalizer: 'NFC' | null, splits: [regex source strings], merges: ["a b", ...] }
   Tested against the Python `tokenizers` library by _build/tokenizer/test_bpe.mjs. */
(function (root) {
  'use strict';

  // GPT-2 bytes_to_unicode table
  var BYTE2CHAR = (function () {
    var bs = [], i;
    for (i = 33; i <= 126; i++) bs.push(i);
    for (i = 161; i <= 172; i++) bs.push(i);
    for (i = 174; i <= 255; i++) bs.push(i);
    var cs = bs.slice(), n = 0;
    for (i = 0; i < 256; i++) {
      if (bs.indexOf(i) === -1) { bs.push(i); cs.push(256 + n); n++; }
    }
    var map = new Array(256);
    for (i = 0; i < bs.length; i++) map[bs[i]] = String.fromCharCode(cs[i]);
    return map;
  })();
  var CHAR2BYTE = {};
  BYTE2CHAR.forEach(function (c, b) { CHAR2BYTE[c] = b; });

  var enc = new TextEncoder();
  var dec = new TextDecoder('utf-8', { fatal: false });

  function splitIsolated(pieces, re) {
    var out = [];
    pieces.forEach(function (p) {
      re.lastIndex = 0;
      var last = 0, m;
      while ((m = re.exec(p)) !== null) {
        if (m[0].length === 0) { re.lastIndex++; continue; }
        if (m.index > last) out.push(p.slice(last, m.index));
        out.push(m[0]);
        last = m.index + m[0].length;
      }
      if (last < p.length) out.push(p.slice(last));
    });
    return out;
  }

  function byteLevel(piece) {
    var bytes = enc.encode(piece), s = '';
    for (var i = 0; i < bytes.length; i++) s += BYTE2CHAR[bytes[i]];
    return s;
  }

  function create(data) {
    var ranks = new Map();
    for (var i = 0; i < data.merges.length; i++) {
      var m = data.merges[i];
      ranks.set(typeof m === 'string' ? m : m[0] + ' ' + m[1], i);
    }
    var regexes = data.splits.map(function (src) { return new RegExp(src, 'gu'); });
    var cache = new Map();

    function bpe(word) {
      if (cache.has(word)) return cache.get(word);
      var parts = Array.from(word);
      if (parts.length > 1) {
        while (true) {
          var best = Infinity, bestPair = null;
          for (var j = 0; j < parts.length - 1; j++) {
            var r = ranks.get(parts[j] + ' ' + parts[j + 1]);
            if (r !== undefined && r < best) { best = r; bestPair = j; }
          }
          if (bestPair === null) break;
          var a = parts[bestPair], b = parts[bestPair + 1], merged = [];
          for (var k = 0; k < parts.length;) {
            if (k < parts.length - 1 && parts[k] === a && parts[k + 1] === b) { merged.push(a + b); k += 2; }
            else { merged.push(parts[k]); k += 1; }
          }
          parts = merged;
          if (parts.length === 1) break;
        }
      }
      if (cache.size > 20000) cache.clear();
      cache.set(word, parts);
      return parts;
    }

    function encode(text) {
      if (data.normalizer === 'NFC') text = text.normalize('NFC');
      var pieces = [text];
      regexes.forEach(function (re) { pieces = splitIsolated(pieces, re); });
      var out = [];
      pieces.forEach(function (p) { if (p) out.push.apply(out, bpe(byteLevel(p))); });
      return out;
    }

    return { encode: encode, count: function (t) { return encode(t).length; } };
  }

  function toText(tokenString) {
    var bytes = [];
    Array.from(tokenString).forEach(function (c) { if (CHAR2BYTE[c] !== undefined) bytes.push(CHAR2BYTE[c]); });
    return dec.decode(new Uint8Array(bytes));
  }

  var api = { create: create, toText: toText, BYTE2CHAR: BYTE2CHAR };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HFBPE = api;
})(typeof window !== 'undefined' ? window : this);
