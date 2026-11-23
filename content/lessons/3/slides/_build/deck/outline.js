// Prints a one-line outline per slide. Run: node day-2/_build/deck/outline.js
const fs = require('fs'), path = require('path');
global.window = {};
eval(fs.readFileSync(path.join(__dirname, '..', '..', 'deck', 'assets', 'slides_data.js'), 'utf8'));
window.SLIDES_DATA.forEach((s, i) => {
  const c = (s.cards || []).map(x => (x.h || '') + (x.art ? '<' + x.art + '>' : '') + '[' + (x.tone || '') + ']').join(' | ');
  const sd = (s.side || []).map(x => (x.h || '') + (x.art ? '<' + x.art + '>' : '')).join(' | ');
  console.log(String(i + 1).padStart(2), s.layout.padEnd(9), (s.do ? 'DO ' : ''), (s.title || s.big || s.instr || '').slice(0, 50), c ? ' C: ' + c : '', sd ? ' S: ' + sd : '', s.art ? ' ART:' + s.art : '', s.arts ? ' ARTS:' + s.arts : '', s.flow ? ' flow' : '', s.steps ? ' steps' + s.steps.length : '', s.nodes ? ' nodes' + s.nodes.length : '');
});
