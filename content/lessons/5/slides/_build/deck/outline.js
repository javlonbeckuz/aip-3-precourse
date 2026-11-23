// Prints a short outline of the day 4 slide data. Run: node day-4/_build/deck/outline.js
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', '..', 'deck', 'assets', 'slides_data.js'));
window.SLIDES_DATA.forEach((s, i) => {
  const keys = Object.keys(s).filter(k => !['notes', 'seg', 'mod', 'layout', 'title'].includes(k));
  const heads = a => (a || []).map(c => (c.h || c.t || c.k || '') + (c.art ? '{' + c.art + '}' : '') + (c.tone ? '(' + c.tone + ')' : '')).join(' | ');
  console.log(`${i + 1} [${s.layout}]${s.do === true ? ' DO' : ''} ${s.title || s.big || s.instr || ''} :: ${keys.join(',')}` +
    (s.cards ? `\n    cards: ${heads(s.cards)}` : '') + (s.side ? `\n    side: ${heads(s.side)}` : '') + (s.nodes ? `\n    nodes: ${heads(s.nodes)}` : '') +
    (s.art ? `\n    art: ${s.art}` : '') + (s.arts ? `\n    arts: ${s.arts}` : ''));
});
