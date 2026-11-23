/* Praktikum 3.0 deck engine, modular tile design (2026-11-10 v3, shared since 2026-11-20).
   SOURCE OF TRUTH: praktikum-3/deck-engine/deck.js. The copy in day-N/deck/assets/ is written by deck-engine/sync.py:
   edit the source, run sync.py, never edit a day's copy (sync.py --check fails on drift). Layouts and fields: deck-engine/README.md.
   index.html (generated from day-N/deck/deck.json) sets window.DECK = { day, sessionMin, ... } and loads slides_data.js before this file;
   talk_data.js (window.TALK_DATA, the Uzbek talking track per slide) is optional.
   Keys: arrows / space = move, P = notes, G = slide list, F = fullscreen, T = timer. Nothing presenter-only is drawn on the slide.
   Slide data: layout, title, notes {do, say}, seg; do: true marks a slide where the room works on laptops.
   Inline markup: **bold**, [[accent]], {{placeholder}}; in rows, "main||small" adds a second line.
   deck.json options read here: copy (copy button on prompt slides), chrome (slim footer line: label, mod, seg; off by default), logo, label, sessionMin.
   Motion: every slide builds in (tiles, then rows, dots and numbers). ?noanim=1 turns it off (QA uses it). */
(function () {
  var slides = window.SLIDES_DATA || [];
  var DECK = window.DECK || { day: 1 };
  var ANIM = !/[?&]noanim=1/.test(window.location.search);
  var SESSION_MIN = DECK.sessionMin || 180;
  var currentIndex = 0, notesOpen = false, gridOpen = false, timerHandle = null;
  var ARROW = '<svg viewBox="0 0 28 14" aria-hidden="true"><path d="M0 7h25M19 1.5 25 7l-6 5.5" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>';
  var LOGO = '<svg class="logo" viewBox="0 0 112.9145 45.7984" fill="currentColor" role="img" aria-label="Head"><g><g><path d="M17.52,7.3263v14.24H4.65V7.3263H0v32.86h4.65v-14.35h12.87v14.35h4.66V7.3263h-4.66Z"></path><path d="M51.75,11.5463v-4.22h-22.17v32.86h22.17v-4.27h-17.57l.05-10.02,12.87-.06v-4.21h-12.92l.05-10.08h17.52Z"></path><polygon points="75.8945 8.8764 73.4945 18.4063 76.0045 28.1363 71.0445 28.1363 69.9745 32.3563 76.9845 32.3563 79.0145 40.1864 83.7745 40.1864 75.8945 8.8764"></polygon><polygon points="70.0607 11.2475 72.89 0 68.1721 0 56.7156 45.7984 61.3637 45.7984 64.1094 34.8854 65.4746 29.0037 65.4753 29.0037 70.0607 11.2475"></polygon><path d="M101.6345,7.3263h-11.45v32.86h11.45c6.73,0,11.28-5.42,11.28-13.53v-5.8c0-8.05-4.55-13.53-11.28-13.53ZM108.0445,26.6563c0,5.37-2.58,8.99-6.36,8.99h-6.84V11.8163h6.84c3.78,0,6.36,3.67,6.36,9.04v5.8Z"></path></g></g></svg>';

  function esc(str) {
    if (str === undefined || str === null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fmt(str) {
    var s = esc(str);
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\[\[(.*?)\]\]/g, '<span class="acc">$1</span>');
    s = s.replace(/\{\{(.*?)\}\}/g, '<span class="ph">[$1]</span>');
    return s;
  }
  function plain(str) { return String(str || '').replace(/\*\*|\[\[|\]\]/g, ''); }
  function size(str, a, b) { var n = plain(str).length; return n <= a ? '' : (n <= b ? ' m' : ' s'); }
  function colsStyle(n) { return 'grid-template-columns: repeat(' + n + ', minmax(0, 1fr));'; }
  function tile(cls, inner, i, extra) { return '<div class="tile ' + cls + '" style="--i:' + (i || 0) + (extra ? ';' + extra : '') + '">' + inner + '</div>'; }
  function tiles(inner, style, cls) { return '<div class="tiles ' + (cls || '') + '" style="' + (style || '') + '">' + inner + '</div>'; }
  // Clay objects (2026-11-20). Optional data fields: art: 'name' on a card, node, layer, rung, box, num or hero slide;
  // arts: ['name', ...] on a points / steps / lessons slide. File: assets/img/art-<name>.webp. No field, no change.
  function artSrc(n) { return 'assets/img/art-' + esc(n) + '.webp'; }
  function artBox(n, cls) { return n ? '<div class="artbox ' + (cls || '') + '"><img src="' + artSrc(n) + '" alt=""></div>' : ''; }
  function artAbs(n, cls) { return n ? '<img class="art-abs ' + cls + '" src="' + artSrc(n) + '" alt="">' : ''; }
  // tones: ok = green, warn = peach (in catch3 the value is also struck through), peach = peach colour only (a caution or a stop that is not an error)
  function toneBg(t) { return t === 'ok' ? 'g-ok' : (t === 'warn' || t === 'peach' ? 'g-warn' : ''); }
  function items(list) {
    return '<ul class="items">' + (list || []).map(function (t, j) { return '<li style="--d:' + (j * 110) + '">' + fmt(t) + '</li>'; }).join('') + '</ul>';
  }
  var MONO_RE = /^(\/|~\/|\.\/|[A-Za-z0-9_.-]+\/)\S*$/;
  function sizeN(str) { var n = String(str || '').length; return n <= 3 ? '' : (n <= 5 ? ' l5' : (n <= 7 ? ' l7' : ' l9')); }
  function cardTile(c, i) {
    var head = c.h ? '<div class="tt"><span class="dot"></span>' + fmt(c.h) + '</div>' : '';
    var body = c.body ? items(c.body) : (c.text ? '<div class="body" style="margin-top:22px">' + fmt(c.text) + '</div>' : '');
    return tile(toneBg(c.tone) + ' ' + (c.tone || ''), head + body + artBox(c.art), i);
  }
  function sideStack(s, from) { return '<div class="stack">' + (s.side || []).map(function (c, j) { return cardTile(c, (from || 0) + j); }).join('') + '</div>'; }
  function tail(s, skipNote) {
    return (s.note && !skipNote ? '<div class="note ' + (s.noteTone || '') + '"><span>' + fmt(s.note) + '</span></div>' : '') +
      (s.foot ? '<div class="takeaway">' + fmt(s.foot) + '</div>' : '') +
      (s.source ? '<div class="source">' + esc(s.source) + '</div>' : '');
  }
  function dots(n, on, step) {
    var h = '';
    for (var i = 0; i < n; i++) h += '<i' + (i < on ? ' class="on"' : '') + ' style="--d:' + (i * (step || 10)) + '"></i>';
    return h;
  }
  // Dot spiral with a coloured arc: how far along we are (day of six on the title, minute of the session on a divider).
  function spiral(frac, label) {
    var h = '<svg class="spiral" viewBox="0 0 600 600" aria-hidden="true">', i, a, r, x, y;
    for (i = 1; i <= 520; i++) {
      r = 11.2 * Math.sqrt(i); a = i * 2.39996;
      h += '<circle class="bg" cx="' + (300 + r * Math.cos(a)).toFixed(1) + '" cy="' + (300 + r * Math.sin(a)).toFixed(1) + '" r="2.6" style="--d:' + (i * 2) + '"/>';
    }
    var N = 30, on = Math.max(1, Math.round(frac * N));
    for (i = 0; i < N; i++) {
      a = -Math.PI / 2 + (i / N) * Math.PI * 2; x = 300 + 150 * Math.cos(a); y = 300 + 150 * Math.sin(a);
      var fill = i < on ? ' style="fill:hsl(' + Math.round(128 - (i / Math.max(on - 1, 1)) * 104) + ' 62% 46%);--d:' + (900 + i * 45) + '"' : ' class="ring" style="--d:' + (900 + i * 45) + '"';
      h += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="8.5"' + fill + '/>';
    }
    if (label) {
      a = -Math.PI / 2 + ((on - 1) / N) * Math.PI * 2; x = 300 + 212 * Math.cos(a); y = 300 + 212 * Math.sin(a);
      var w = 34 + String(label).length * 14;
      h += '<g style="--d:' + (1000 + on * 45) + '"><rect class="mark" x="' + (x - w / 2).toFixed(1) + '" y="' + (y - 21).toFixed(1) + '" width="' + w + '" height="42" rx="21"/>' +
        '<text x="' + x.toFixed(1) + '" y="' + (y + 8.5).toFixed(1) + '" text-anchor="middle">' + esc(label) + '</text></g>';
    }
    return h + '</svg>';
  }
  function minutes(t) { var m = String(t || '').match(/(\d+):(\d+)/); return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : 0; }
  var DO_PILL = '<span class="pill"><span class="d"></span>Noutbukda</span>';

  var R = {
    title: function (s) {
      return '<div class="tile hero g-sec">' + (DECK.logo === false ? '' : LOGO) + spiral(DECK.day / 6, DECK.day + ' / 6') + '<h1 class="' + size(s.big, 22, 40).trim() + '">' + fmt(s.big) + '</h1>' +
        (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') + (s.kicker ? '<div class="meta">' + fmt(s.kicker) + '</div>' : '') + '</div>';
    },
    divider: function (s) {
      var start = String(s.time || '').split('-')[0];
      return '<div class="tile hero ' + (s.do ? 'g-do' : 'g-sec') + '"><div class="toplab">' + (s.time ? '<span class="pill soft"><span class="d"></span>' + esc(s.time) + '</span>' : '') + '</div>' +
        spiral(minutes(start) / SESSION_MIN, start) + '<h1 class="' + size(s.big, 20, 30).trim() + '">' + fmt(s.big) + '</h1>' + (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') + '</div>';
    },
    statement: function (s) {
      return '<div class="tile hero center wide ' + (s.ground === 'cobalt' ? 'dark' : '') + (s.tone === 'bad' ? ' t-bad' : '') + (s.art ? ' has-art' : '') + '">' + artAbs(s.art, 'hero-r') + '<div class="big' + size(s.big, 52, 90) + '">' + fmt(s.big) + '</div>' +
        (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') + (s.foot ? '<div class="inline-note">' + fmt(s.foot) + '</div>' : '') + '</div>' +
        (s.source ? '<div class="source">' + esc(s.source) + '</div>' : '');
    },
    // live: one instruction. Without side it is a full hero tile (day 1). With side cards (days 2-6) the instruction tile
    // sits left and the cards stack right; label = small pill ("Jonli"), path = file or address in mono.
    live: function (s) {
      if (s.side && s.side.length) {
        var lab = '<div class="toplab"><span class="pill ' + (s.do ? '' : 'soft') + '"><span class="d"></span>' + esc(s.label || 'Jonli') + '</span></div>';
        var main = '<div class="tile hero center live-main ' + (s.do ? 'g-do' : 'g-sec') + '">' + (s.title ? lab : '') + artAbs(s.art, 'live-art') + '<div class="big' + size(s.instr, 34, 64) + '">' + fmt(s.instr) + '</div>' +
          (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') + (s.path ? '<div class="path">' + esc(s.path) + '</div>' : '') + '</div>';
        return tiles(main + sideStack(s, 1), 'grid-template-columns: 1.55fr 1fr;') + tail(s);
      }
      return '<div class="tile hero center wide ' + (s.do ? 'g-do' : '') + (s.art ? ' has-art' : '') + '">' + artAbs(s.art, 'hero-r') + (s.title ? '<div class="toplab lab">' + fmt(s.title) + '</div>' : '') + '<div class="big' + size(s.instr, 46, 80) + '">' + fmt(s.instr) + '</div>' +
        (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') + (s.path ? '<div class="path">' + esc(s.path) + '</div>' : '') + (s.note ? '<div class="inline-note">' + fmt(s.note) + '</div>' : '') + (s.foot ? '<div class="inline-note">' + fmt(s.foot) + '</div>' : '') + '</div>';
    },
    timer: function (s) {
      return '<div class="tile hero center wide g-sec">' + (s.title ? '<div class="toplab lab">' + fmt(s.title) + '</div>' : '') +
        '<div class="clock" id="clock" data-min="' + s.minutes + '">' + String(s.minutes).padStart(2, '0') + ':00</div>' + (s.sub ? '<div class="sub">' + fmt(s.sub) + '</div>' : '') +
        '<div class="dotrow" id="dotrow">' + dots(s.minutes * 6, 0, 8) + '</div></div>';
    },
    bignum: function (s) {
      var pct = s.nums.every(function (n) { return /^\d+%$/.test(n.n); });
      var bg = function (n) { return n.tone === 'acc' ? 'g-sec' : toneBg(n.tone); };
      var inner = s.nums.map(function (n, i) {
        if (pct) {
          var v = parseInt(n.n, 10);
          return tile('stat ' + bg(n), '<div class="l"><div class="lab">' + fmt(n.label) + '</div><div class="num push" data-count="' + v + '" data-suffix="%">' + esc(n.n) + '</div></div><div class="dotgrid">' + dots(100, v, 9) + '</div>', i);
        }
        var lead = plain(n.label).charAt(0), nf = s.numFirst !== undefined ? !!s.numFirst : (s.nums.length > 2 && lead !== lead.toUpperCase());
        if (nf) return tile(bg(n) + ' num-first', artBox(n.art, 'stat-art') + '<div class="num" style="font-size:' + [170, 170, 170, 170, 150, 128, 112, 98, 88, 80][Math.min(String(n.n).length, 9)] + 'px">' + esc(n.n) + '</div><div class="body" style="max-width:1300px">' + fmt(n.label) + '</div>', i);
        var fs = s.nums.length === 1 ? 250 : (s.nums.length === 2 ? 170 : [170, 170, 170, 170, 150, 128, 112, 98, 88, 80][Math.min(String(n.n).length, 9)]);
        return tile(bg(n), (s.nums.length > 2 ? '' : artAbs(n.art, 'top-r')) + '<div class="body" style="max-width:1300px">' + fmt(n.label) + '</div>' + (s.nums.length > 2 ? artBox(n.art, 'stat-art') : '') + '<div class="num push ' + (s.nums.length === 1 ? 'giant' : '') + '" style="font-size:' + fs + 'px">' + esc(n.n) + '</div>', i);
      }).join('');
      return tiles(inner, colsStyle(s.nums.length), 'n' + s.nums.length) + tail(s);
    },
    cards: function (s) {
      var n = s.cols || s.cards.length;
      return tiles(s.cards.map(cardTile).join(''), colsStyle(n), 'c' + n) + tail(s);
    },
    points: function (s) {
      return tiles(s.points.map(function (p, i) { return tile('cell point', '<div class="tick" style="--d:' + (i * 150 + 300) + '"></div>' + artBox((s.arts || [])[i]) + '<div class="t push">' + fmt(p) + '</div>', i); }).join(''), colsStyle(s.points.length)) + tail(s);
    },
    steps: function (s) {
      if (s.side && s.side.length) {
        var rows = s.steps.map(function (t, i) {
          var parts = String(t).split('||');
          return '<div class="srow" style="--d:' + (i * 100) + '"><div class="num">' + (i + 1) + '</div><div class="t">' + fmt(parts[0]) + (parts[1] ? '<small>' + fmt(parts[1]) + '</small>' : '') + '</div></div>';
        }).join('');
        return tiles(tile('steplist n' + s.steps.length, rows, 0) + sideStack(s, 1), 'grid-template-columns: 1.5fr 1fr;') + tail(s);
      }
      var n = s.steps.length, few = n <= 3, cols = few ? n : (n === 4 ? 2 : (n > 6 ? 4 : 3));
      var noteTile = !few && s.note && n === 5;
      var inner = s.steps.map(function (t, i) {
        var parts = String(t).split('||');
        var span = (!few && n === 5 && !noteTile && i === 4) ? 'grid-column: span 2' : '';
        return tile('cell' + (few ? ' big' : ''), '<div class="num">' + (i + 1) + '</div>' + (few ? artBox((s.arts || [])[i]) : artAbs((s.arts || [])[i], 'corner')) + '<div class="t push">' + fmt(parts[0]) + (parts[1] ? '<small>' + fmt(parts[1]) + '</small>' : '') + '</div>', i, span);
      }).join('');
      if (noteTile) inner += tile(toneBg(s.noteTone) + ' ' + (s.noteTone || ''), '<div class="tt"><span class="dot"></span></div><div class="body push">' + fmt(s.note) + '</div>', n);
      return tiles(inner, colsStyle(cols)) + tail(s, noteTile);
    },
    agenda: function (s) {
      if (s.now !== undefined) {
        return tiles(s.items.map(function (it, i) {
          var parts = String(it[1]).split('||');
          return tile('cell' + (s.now === i ? ' dark' : ''), '<div class="num">' + esc(String(it[0]).replace(/\D+/g, '') || it[0]) + '</div>' + artAbs((s.arts || [])[i], 'corner') + '<div class="t push">' + fmt(parts[0]) + '</div>', i);
        }).join(''), colsStyle(3)) + tail(s);
      }
      var ag = tile('agenda' + (s.side ? ' with-side' : ''), s.items.map(function (it, i) {
        var parts = String(it[1]).split('||');
        return '<div class="row' + (it[2] ? ' brk' : '') + '" style="--d:' + (i * 90) + '"><i></i><div class="k">' + esc(it[0]) + '</div><div>' + fmt(parts[0]) + (parts[1] ? '<small>' + fmt(parts[1]) + '</small>' : '') + '</div></div>';
      }).join(''));
      if (s.side && s.side.length) return tiles(ag + sideStack(s, 1), 'grid-template-columns: 1.7fr 1fr;') + tail(s);
      return tiles(ag) + tail(s);
    },
    layers: function (s) {
      return tiles(s.layers.map(function (l, i) {
        return tile('layer', '<div class="num">' + esc(l.k) + '</div><div class="mid"><div class="lt">' + fmt(l.t) + '</div><div class="ld">' + fmt(l.d) + '</div></div>' + (l.art ? '<img class="layer-art" src="' + artSrc(l.art) + '" alt="">' : '') + '<div class="lq">' + fmt(l.q) + '</div>', s.layers.length - i);
      }).join('')) + tail(s);
    },
    chain: function (s) {
      var n = s.nodes.length;
      return tiles(s.nodes.map(function (nd, i) {
        return '<div class="node-wrap">' + tile('node' + (i === n - 1 ? ' g-ok' : ''), '<div class="lab">' + esc(nd.k) + '</div><div class="nt">' + fmt(nd.t) + '</div>' + artBox(nd.art) + '<div class="nd push">' + fmt(nd.d) + '</div>', i * 2) +
          (i < n - 1 ? '<div class="chip" style="--d:' + (i * 260 + 500) + '">' + ARROW + '</div>' : '') + '</div>';
      }).join(''), colsStyle(n), 'n' + n) + tail(s);
    },
    routes: function (s) {
      return tiles(s.routes.map(function (r, i) {
        var k = 0, hops = r.hops.map(function (h, j) {
          var link = j ? '<span class="link">' + [0, 1, 2, 3].map(function () { return '<i style="--d:' + ((k++) * 130) + '"></i>'; }).join('') + '</span>' : '';
          return link + '<span class="hop" style="--d:' + (j * 320 + i * 200) + '">' + esc(/^[!+]/.test(h) ? h.slice(1) : h) + '</span>';
        }).join('');
        return tile('route ' + (r.tone || ''), '<div class="top"><div class="rt">' + fmt(r.t) + '</div><div class="verdict" style="--d:' + (r.hops.length * 320 + i * 200 + 200) + '">' + fmt(r.v) + '</div></div><div class="hops">' + hops + '</div>', i);
      }).join('')) + tail(s);
    },
    predict: function (s) {
      var bars = s.bars.map(function (b, i) {
        var on = Math.round(b[1] / 5), h = '';
        for (var d = 0; d < 20; d++) h += '<i' + (d < on ? ' class="on"' : '') + ' style="--d:' + (i * 250 + d * 28) + '"></i>';
        return '<div class="dbar' + (i === 0 ? ' top' : '') + '"><div>' + esc(b[0]) + '</div><div class="dots">' + h + '</div><div class="p" data-count="' + b[1] + '" data-suffix="%">' + b[1] + '%</div></div>';
      }).join('');
      return tiles(tile('', '<div class="quote">' + fmt(s.prompt) + '</div>' + bars + (s.barNote ? '<div class="source push" style="padding-left:0">' + esc(s.barNote) + '</div>' : ''), 0) + sideStack(s, 1), 'grid-template-columns: 1.35fr 1fr;') + tail(s);
    },
    dastarxon: function (s) {
      var n = s.segs.length, greens = ['#2F8F45', '#55AA5A', '#86C47A', '#B7DA98', '#DDEBB8'];
      var segs = s.segs.map(function (g, i) {
        var c = greens[Math.min(i, greens.length - 1)];
        return '<div class="seg" style="width:' + g.w + '%;background:' + c + ';color:' + (i < 2 ? '#fff' : '#0B0B0D') + ';--d:' + (i * 140) + '">' + esc(g.t || '') + '</div>';
      }).join('');
      var fallen = s.fallen.map(function (f, i) { return '<span class="f" style="--d:' + (i * 160) + '">' + esc(f) + '</span>'; }).join('');
      var cols = (s.side || []).length || 1;
      return tiles(tile('', '<div class="caps"><span class="lab">' + esc(s.capL) + '</span><span class="lab">' + esc(s.capR) + '</span></div><div class="meter">' + segs + '</div><div class="fallen"><span class="lab">' + esc(s.fallenLabel) + '</span>' + fallen + '</div>', 0, 'grid-column: 1 / -1') +
        (s.side || []).map(function (c, j) { return cardTile(c, j + 1); }).join(''), colsStyle(cols) + 'grid-template-rows: auto 1fr;') + tail(s);
    },
    ladder: function (s) {
      return tiles(s.rungs.map(function (r, i) {
        return tile('rung r' + (i + 1) + (i === 2 ? ' g-sec' : ''), artBox(r.art, 'low') + '<div class="lab">' + esc(r.k) + '</div><div class="rt">' + fmt(r.t) + '</div><div class="rf">' + esc(r.f) + '</div><div class="rd">' + fmt(r.d) + '</div>', i * 2);
      }).join(''), colsStyle(3), 'ladder') + tail(s);
    },
    catch3: function (s) {
      return tiles(s.boxes.map(function (b, i) {
        return tile('catch ' + toneBg(b.tone) + ' ' + (b.tone || ''), '<div class="lab">' + esc(b.k) + '</div><div class="cv">' + fmt(b.v) + '</div>' + artBox(b.art) + '<div class="cd push">' + fmt(b.d) + '</div>', i * 3);
      }).join(''), colsStyle(3)) + tail(s);
    },
    // tree: a folder tree, "name   # what it is" per line. When no line has a # comment the block is a file shown as it is
    // (for example a SKILL.md): one mono column, lines kept whole, sized to fit.
    tree: function (s) {
      if (String(s.code).indexOf('#') < 0) {
        var code = String(s.code).split('\n').map(function (line, i) { return '<div class="cl" style="--d:' + (i * 60) + '">' + (esc(line) || '&nbsp;') + '</div>'; }).join('');
        return tiles(sideStack(s, 0) + tile('tree codefile', '<div class="codefile-body" data-fit="26" data-from="40">' + code + '</div>', 2), 'grid-template-columns: 1fr 1.35fr;') + tail(s);
      }
      var rows = String(s.code).split('\n').map(function (line, i) {
        var m = line.match(/^(\s*)(\S+)\s*(?:#\s*(.*))?$/) || [null, '', line, ''];
        return '<div class="tr' + (m[1] ? '' : ' root') + '" style="--d:' + (i * 80) + '"><b>' + esc(m[2]) + '</b><span>' + esc(m[3] || '') + '</span></div>';
      }).join('');
      return tiles(sideStack(s, 0) + tile('tree', rows, 2), 'grid-template-columns: 1fr 1.35fr;') + tail(s);
    },
    script: function (s) {
      var lines = s.lines.map(function (l, i) { return '<p' + (i === s.lines.length - 1 ? ' class="hl"' : '') + ' style="--d:' + (i * 120) + '">' + fmt(l) + '</p>'; }).join('');
      return tiles(tile('script', lines)) + tail(s);
    },
    image: function (s) {
      var lines = (s.lines || []).map(function (l) { return '<div class="body">' + fmt(l) + '</div>'; }).join('');
      if (s.side && s.side.length) return tiles(tile('shot-tile g-sec', '<img src="' + esc(s.img) + '" alt="' + esc(s.alt || '') + '">', 0) + sideStack(s, 1), 'grid-template-columns: 1.5fr 1fr;') + tail(s);
      return tiles(tile('shot-tile g-sec', '<img src="' + esc(s.img) + '" alt="' + esc(s.alt || '') + '">', 0) + tile('lines', '<div class="push"></div>' + lines, 1), 'grid-template-columns: 1.5fr 1fr;') + tail(s);
    },
    // prompt: the text starts large and shrinks until it fits its tile (never under 30 px), so a short prompt does not leave
    // the tile half empty. A one-line command (up to 44 characters) is drawn large, in mono, centred.
    // promptSize: N pins the starting size (it still shrinks if it must); promptBig: true is the fixed 50 px of day 1.
    prompt: function (s) {
      var raw = String(s.prompt), pl = plain(raw).length, pn = raw.split('\n').length;
      var cmd = !s.promptBig && !s.promptSize && pn === 1 && pl <= 44;
      var fit = s.promptBig ? '' : ' data-fit="30" data-from="' + (s.promptSize || (cmd ? 120 : (pl <= 200 ? 66 : 58))) + '"';
      var box = tile('prompt-tile', '<div class="lab prompt-lab"><span>' + esc(s.termTitle || 'Prompt') + '</span>' + (DECK.copy && !s.noCopy ? '<button class="copy-btn" onclick="DECKAPI.copyPrompt(this)">Nusxa olish</button>' : '') + '</div><div class="prompt-text' + (s.promptBig ? ' big' : '') + (cmd ? ' cmd' : '') + '" id="prompt-code-text"' + fit + '>' + (cmd ? '<span>' + fmt(s.prompt) + '</span>' : fmt(s.prompt)) + '</div>', 0);
      if (!(s.side && s.side.length)) return tiles(box) + tail(s);
      return tiles(box + sideStack(s, 1), 'grid-template-columns: 1.6fr 1fr;') + tail(s);
    },

    /* ---------- layouts added 2026-11-20 for days 2-6 (see deck-engine/README.md) ---------- */
    // term: a terminal window. lines: "> " typed by the user, "~" dim, "+" green, "!" red, "|a|b|" table rows (first row = head;
    // a leading "!" or "+" tones the row), "" blank line. termTitle = window title, termNote = small note on the right.
    term: function (s) {
      var lines = '', tbl = [], k = 0, nl = (s.lines || []).length;
      function flush() {
        if (!tbl.length) return;
        var n = tbl[0].replace(/^[!+]/, '').replace(/^\|/, '').replace(/\|$/, '').split('|').length;
        lines += '<div class="tl-table" style="grid-template-columns: repeat(' + n + ', auto);--d:' + ((k++) * 90) + '">' + tbl.map(function (r, ri) {
          var tone = '', t = r;
          if (t.charAt(0) === '!') { tone = ' warn'; t = t.slice(1); }
          if (t.charAt(0) === '+') { tone = ' ok'; t = t.slice(1); }
          return t.replace(/^\|/, '').replace(/\|$/, '').split('|').map(function (c) { return '<div class="tc' + (ri === 0 ? ' th' : '') + tone + '">' + fmt(c.trim()) + '</div>'; }).join('');
        }).join('') + '</div>';
        tbl = [];
      }
      (s.lines || []).forEach(function (l) {
        var bare = l.replace(/^[!+]/, '');
        if (bare.charAt(0) === '|') { tbl.push(l); return; }
        flush();
        var cls = 'out', t = l;
        if (t.charAt(0) === '>') { cls = 'in'; t = t.replace(/^>\s?/, ''); }
        else if (t.charAt(0) === '~') { cls = 'dim'; t = t.slice(1); }
        else if (t.charAt(0) === '+') { cls = 'ok'; t = t.slice(1); }
        else if (t.charAt(0) === '!') { cls = 'warn'; t = t.slice(1); }
        lines += '<div class="tl ' + cls + '" style="--d:' + ((k++) * 90) + '">' + (cls === 'in' ? '<span class="pr">❯</span>' : '') + '<span>' + (fmt(t) || '&nbsp;') + '</span></div>';
      });
      flush();
      var win = tile('term dark', '<div class="term-bar"><span class="lights"><i></i><i></i><i></i></span><span class="term-title">' + esc(s.termTitle || 'Claude Code') + '</span>' +
        (s.termNote ? '<span class="term-note">' + esc(s.termNote) + '</span>' : '') + '</div><div class="term-body" data-fit="' + (s.dense ? 24 : 26) + '"' + (nl <= 7 ? ' data-from="42"' : (nl <= 10 ? ' data-from="37"' : '')) + '>' + lines + '</div>', 0);
      if (!(s.side && s.side.length)) return tiles(win) + tail(s);
      return tiles(win + sideStack(s, 1), 'grid-template-columns: ' + (s.wide ? '2.2fr' : '1.75fr') + ' 1fr;') + tail(s);
    },
    // table: head (or columns) + rows of cells. Optional: lead (sentence above), keyCol (index of the bold column, default 0),
    // mutedCols [idx], highlight [row idx], colw [fr per column], cls: 'plain' | 'plain cols2' (good / bad) | 'plain mono-rest',
    // side cards. Rows share the height, so 3 to 7 rows fill the tile.
    table: function (s) {
      var head = s.columns || s.head || [], rows = s.rows || [], n = head.length || (rows[0] || []).length;
      var cls = String(s.cls || ''), keyCol = s.keyCol === undefined ? 0 : s.keyCol;
      var w = s.colw;
      if (!w) {
        w = [];
        for (var c = 0; c < n; c++) {
          var m = plain(head[c]).length;
          rows.forEach(function (r) { m = Math.max(m, plain(r[c]).length); });
          w.push((Math.pow(Math.max(3, Math.min(70, m)), 0.85) * (c === keyCol && m > 3 ? 1.3 : 1)).toFixed(2));
        }
      }
      var h = head.length ? head.map(function (x) { return '<div class="th">' + esc(x) + '</div>'; }).join('') : '';
      var body = rows.map(function (r, i) {
        var H = s.highlight || [], hl = H.indexOf(i) >= 0;
        var hc = hl ? ' hl' + (H.indexOf(i - 1) < 0 ? ' hl-top' : '') + (H.indexOf(i + 1) < 0 ? ' hl-bot' : '') : (H.indexOf(i - 1) >= 0 ? ' after-hl' : '');
        return r.map(function (c, j) {
          var k = 'td' + (j === keyCol ? ' k' : '') + ((s.mutedCols || []).indexOf(j) >= 0 ? ' mut' : '') + hc + (j === 0 ? ' first' : '') + (j === r.length - 1 ? ' last' : '') + (i === 0 ? ' r0' : '');
          return '<div class="' + k + '" style="--d:' + (i * 90) + '"><span>' + fmt(c) + '</span></div>';
        }).join('');
      }).join('');
      var grid = '<div class="dt ' + cls + ' rows' + rows.length + '" data-fit="30" style="grid-template-columns:' + w.map(function (x) { return 'minmax(0,' + x + 'fr)'; }).join(' ') + ';grid-template-rows:' + (h ? 'auto ' : '') + 'repeat(' + rows.length + ', minmax(0, 1fr));">' + h + body + '</div>';
      var t = tile('table-tile', (s.lead ? '<div class="lead">' + fmt(s.lead) + '</div>' : '') + grid, 0);
      if (s.side && s.side.length) return tiles(t + sideStack(s, 1), 'grid-template-columns: 2fr 1fr;') + tail(s);
      return tiles(t) + tail(s);
    },
    // qa: numbered questions with a good answer (green) and a risk sign (orange). rows: [n, question, good, risk]; hq / hg / hr = heads.
    qa: function (s) {
      var h = ['#', s.hq || 'Savol', s.hg || 'Yaxshi javob', s.hr || 'Xavf belgisi'].map(function (x, j) { return '<div class="th' + (j === 2 ? ' g' : (j === 3 ? ' r' : '')) + '">' + esc(x) + '</div>'; }).join('');
      var body = s.rows.map(function (r, i) {
        return '<div class="td n' + (i === 0 ? ' r0' : '') + '" style="--d:' + (i * 90) + '"><span class="num">' + esc(r[0]) + '</span></div><div class="td k' + (i === 0 ? ' r0' : '') + '"><span>' + fmt(r[1]) + '</span></div><div class="td g' + (i === 0 ? ' r0' : '') + '"><span>' + fmt(r[2]) + '</span></div><div class="td r' + (i === 0 ? ' r0' : '') + '"><span>' + fmt(r[3]) + '</span></div>';
      }).join('');
      return tiles(tile('table-tile', '<div class="dt qa" data-fit="30" style="grid-template-columns: 90px minmax(0,1.25fr) minmax(0,1fr) minmax(0,1fr);grid-template-rows: auto repeat(' + s.rows.length + ', minmax(0, 1fr));">' + h + body + '</div>', 0)) + tail(s);
    },
    // keys: keyboard keys or commands with their meaning. keys: [[key, 'meaning||small'], ...], side cards.
    keys: function (s) {
      var rows = s.keys.map(function (k, i) {
        var parts = String(k[1]).split('||');
        return '<div class="keyrow" style="--d:' + (i * 90) + '"><span class="keycap">' + esc(k[0]) + '</span><div class="km">' + fmt(parts[0]) + (parts[1] ? '<small>' + fmt(parts[1]) + '</small>' : '') + '</div></div>';
      }).join('');
      var t = tile('keys', rows, 0);
      if (!(s.side && s.side.length)) return tiles(t) + tail(s);
      return tiles(t + sideStack(s, 1), 'grid-template-columns: 1.5fr 1fr;') + tail(s);
    },
    // formula: rows {name, code, terms: ['label|range', ...], range, rangeLabel, tone}; example: [..], exampleLabel.
    formula: function (s) {
      var rows = s.rows.map(function (r, i) {
        var terms = r.terms.map(function (t) { var p = String(t).split('|'); return '<span class="fterm"><b>' + esc(p[0]) + '</b>' + (p[1] ? '<small>' + esc(p[1]) + '</small>' : '') + '</span>'; }).join('<span class="plus">+</span>');
        return tile('frow ' + toneBg(r.tone) + ' ' + (r.tone || ''), '<div class="fn"><div class="tt">' + esc(r.name) + '</div><div class="lab">' + esc(r.code || '') + '</div></div><div class="feq">=</div><div class="fterms">' + terms + '</div>' +
          '<div class="frange"><div class="num">' + esc(r.range) + '</div><div class="lab">' + esc(r.rangeLabel || '') + '</div></div>', i);
      }).join('');
      var ex = s.example ? '<div class="note fex"><span><b>' + esc(s.exampleLabel || 'Misol') + '</b>' + s.example.map(function (e) { return '<span class="fexv">' + fmt(e) + '</span>'; }).join('') + '</span></div>' : '';
      return tiles(rows) + ex + tail(s);
    },
    // matrix: value / ease scatter. dots: [{n, name, value, ease}], chosen: n, threshold, xLabel, yLabel, quads {tl, tr, bl, br}.
    matrix: function (s) {
      var W = 900, H = 660, x0 = 124, x1 = 880, y0 = 70, y1 = 560, lo = 3, hi = 15, pad = 0.6, th = s.threshold || 9;
      function X(v) { return x0 + (v - lo + pad) * (x1 - x0) / (hi - lo + 2 * pad); }
      function Y(v) { return y1 - (v - lo + pad) * (y1 - y0) / (hi - lo + 2 * pad); }
      var g = '', q = s.quads || {}, t;
      g += '<rect x="' + x0 + '" y="' + y0 + '" width="' + (x1 - x0) + '" height="' + (y1 - y0) + '" rx="26" fill="#F2F2F5"/>';
      g += '<rect x="' + X(th) + '" y="' + y0 + '" width="' + (x1 - X(th)) + '" height="' + (Y(th) - y0) + '" rx="26" fill="#D3EBC2"/>';
      for (t = lo; t <= hi; t += 3) {
        g += '<text x="' + X(t) + '" y="' + (y1 + 40) + '" fill="#7C7C84" font-size="30" text-anchor="middle">' + t + '</text>';
        g += '<text x="' + (x0 - 16) + '" y="' + (Y(t) + 10) + '" fill="#7C7C84" font-size="30" text-anchor="end">' + t + '</text>';
      }
      g += '<line x1="' + X(th) + '" y1="' + y0 + '" x2="' + X(th) + '" y2="' + y1 + '" stroke="#0B0B0D" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round"/>';
      g += '<line x1="' + x0 + '" y1="' + Y(th) + '" x2="' + x1 + '" y2="' + Y(th) + '" stroke="#0B0B0D" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round"/>';
      g += '<text x="' + (x1 - 4) + '" y="' + (y0 - 18) + '" fill="#1F7A36" font-size="30" font-weight="650" text-anchor="end">' + esc(q.tr || '') + '</text>';
      g += '<text x="' + (x0 + 4) + '" y="' + (y0 - 18) + '" fill="#7C7C84" font-size="30" text-anchor="start">' + esc(q.tl || '') + '</text>';
      g += '<text x="' + (x1 - 20) + '" y="' + (y1 - 20) + '" fill="#7C7C84" font-size="30" text-anchor="end">' + esc(q.br || '') + '</text>';
      g += '<text x="' + (x0 + 20) + '" y="' + (y1 - 20) + '" fill="#7C7C84" font-size="30" text-anchor="start">' + esc(q.bl || '') + '</text>';
      g += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" fill="#0B0B0D" font-size="30" font-weight="600" text-anchor="middle">' + esc(s.xLabel || 'Osonlik') + '</text>';
      g += '<text transform="translate(34,' + ((y0 + y1) / 2) + ') rotate(-90)" fill="#0B0B0D" font-size="30" font-weight="600" text-anchor="middle">' + esc(s.yLabel || 'Qiymat') + '</text>';
      s.dots.forEach(function (d, i) {
        var c = d.n === s.chosen;
        g += '<g class="mdot" style="--d:' + (i * 120) + '"><circle cx="' + X(d.ease) + '" cy="' + Y(d.value) + '" r="' + (c ? 34 : 29) + '" fill="' + (c ? '#1F7A36' : '#0B0B0D') + '"/>' +
          '<text x="' + X(d.ease) + '" y="' + (Y(d.value) + 10) + '" fill="#fff" font-size="30" font-weight="650" text-anchor="middle">' + d.n + '</text></g>';
      });
      var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' + g + '</svg>';
      var list = '<div class="mx-row head"><div></div><div class="lab">' + esc(s.listLabel || 'Jarayon') + '</div><div class="lab mv">' + esc(s.yLabel || 'Qiymat') + ' · ' + esc(s.xLabel || 'Osonlik') + '</div></div>' + s.dots.map(function (d, i) {
        return '<div class="mx-row' + (d.n === s.chosen ? ' chosen' : '') + '" style="--d:' + (i * 90) + '"><div class="mn">' + d.n + '</div><div class="mt">' + fmt(d.name) + '</div><div class="mv">' + d.value + ' · ' + d.ease + '</div></div>';
      }).join('');
      return tiles(tile('mx-box', svg, 0) + tile('mx-list', list, 1), 'grid-template-columns: 1.15fr 1fr;') + tail(s);
    },
    // phone: a phone screenshot in a frame + side cards. img, alt, side.
    phone: function (s) {
      return tiles(tile('phone-tile g-sec', '<div class="phone-frame"><img src="' + esc(s.img) + '" alt="' + esc(s.alt || '') + '"></div>', 0) + sideStack(s, 1), 'grid-template-columns: 1fr 1.25fr;') + tail(s);
    },
    // diagram: an inline SVG kept in its own script (window[s.svg], listed in deck.json "scripts"). ground: 'dark' for a dark tile.
    diagram: function (s) {
      return tiles(tile('diagram-tile' + (s.ground === 'dark' ? ' dark' : ''), window[s.svg] || '<div class="body">diagram yuklanmadi</div>', 0)) + tail(s);
    },
    // vs: two (or three) columns compared. cols: [{k, n, t, d, body, tone, art}].
    vs: function (s) {
      return tiles(s.cols.map(function (c, i) {
        return tile('vs ' + toneBg(c.tone) + ' ' + (c.tone || ''), artAbs(c.art, 'corner lg') + '<div class="lab">' + esc(c.k) + '</div>' + (c.n ? '<div class="num vn' + sizeN(c.n) + '">' + esc(c.n) + '</div>' : '') +
          (c.t ? '<div class="tt vt">' + fmt(c.t) + '</div>' : '') + (c.d ? '<div class="body vd">' + fmt(c.d) + '</div>' : '') + (c.body ? items(c.body) : ''), i);
      }).join(''), colsStyle(s.cols.length), 'c' + s.cols.length) + tail(s);
    },
    // bridge: from one number to another, one bar per item. items: [{l, s, v, t, tone}] (l label, s small, v value for the bar length, t text shown).
    bridge: function (s) {
      var max = Math.max.apply(null, s.items.map(function (i) { return Math.abs(i.v); }));
      return tiles(tile('bridge', s.items.map(function (it, i) {
        var on = Math.max(1, Math.round(Math.abs(it.v) / max * 40)), h = '';
        for (var d = 0; d < 40; d++) h += '<i' + (d < on ? ' class="on"' : '') + ' style="--d:' + (i * 200 + d * 16) + '"></i>';
        return '<div class="bri ' + (it.tone || '') + '"><div class="bl">' + fmt(it.l) + (it.s ? '<small>' + fmt(it.s) + '</small>' : '') + '</div><div class="bt">' + h + '</div><div class="bv">' + esc(it.t) + '</div></div>';
      }).join(''), 0)) + tail(s);
    }
  };
  R.flow = R.chain;
  var HERO = { title: 1, divider: 1, statement: 1, live: 1, timer: 1 };

  function kind(s) { return s.do ? 'do' : ((s.layout === 'title' || s.layout === 'divider' || s.layout === 'timer') ? 'sec' : ''); }

  function countUp() {
    var els = document.querySelectorAll('#slide-content [data-count]');
    if (!els.length || !ANIM) return;
    var t0 = null, dur = 1200;
    function frame(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      for (var i = 0; i < els.length; i++) {
        if (!els[i].isConnected) return;
        els[i].textContent = Math.round(parseFloat(els[i].getAttribute('data-count')) * e) + (els[i].getAttribute('data-suffix') || '');
      }
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Auto-fit: an element with data-fit="N" shrinks its font size (never below N px) until its tile stops overflowing.
  // A side stack splits its height equally; if one card needs more, share the height by what each card needs.
  function fitStacks() {
    var st = document.querySelectorAll('#slide-content .stack');
    for (var i = 0; i < st.length; i++) {
      var k = st[i].children, over = false, j;
      var arts = st[i].querySelectorAll('.artbox'), a;
      for (j = 0; j < k.length; j++) { k[j].style.flex = ''; }
      for (a = 0; a < arts.length; a++) arts[a].style.flex = '';
      // art in a stacked card has no height of its own: when it would be drawn under 190 px, give it what the stack has
      // left once every card has its text (up to 190 px each) and let the cards share the height by need. Under 150 px
      // of room the floor is dropped again and QA reports the art.
      var small = [], h;
      for (a = 0; a < arts.length; a++) if (arts[a].clientHeight < 190) small.push(arts[a]);
      if (small.length) {
        for (a = 0; a < small.length; a++) small[a].style.flex = '0 0 0px';
        var nat = [], sum = (k.length - 1) * 16;
        for (j = 0; j < k.length; j++) k[j].style.flex = '0 0 auto';
        for (j = 0; j < k.length; j++) sum += k[j].offsetHeight;
        var floor = Math.min(190, Math.floor((st[i].clientHeight - sum) / small.length));
        if (floor >= 150) {
          for (a = 0; a < small.length; a++) small[a].style.flex = '1 0 ' + floor + 'px';
          for (j = 0; j < k.length; j++) nat.push(k[j].offsetHeight);
          for (j = 0; j < k.length; j++) k[j].style.flex = nat[j] + ' 1 0px';
          continue;
        }
        for (j = 0; j < k.length; j++) k[j].style.flex = '';
        for (a = 0; a < small.length; a++) small[a].style.flex = '';
      }
      for (j = 0; j < k.length; j++) if (k[j].scrollHeight > k[j].clientHeight + 1) over = true;
      if (!over) continue;
      var need = [];
      for (j = 0; j < k.length; j++) need.push(k[j].scrollHeight);
      for (j = 0; j < k.length; j++) k[j].style.flex = need[j] + ' 1 0px';
      for (j = 0; j < k.length; j++) {
        var li = k[j].querySelectorAll('ul.items li'), f = li.length ? parseFloat(getComputedStyle(li[0]).fontSize) : 0, g = 0;
        while (li.length && k[j].scrollHeight > k[j].clientHeight + 1 && f > 30 && g++ < 14) { f -= 1; for (var m = 0; m < li.length; m++) li[m].style.fontSize = f + 'px'; }
      }
    }
  }
  function fitAll() {
    fitStacks();
    var els = document.querySelectorAll('#slide-content [data-fit]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], min = parseFloat(el.getAttribute('data-fit')) || 30, box = el.closest('.tile') || el;
      el.style.fontSize = el.getAttribute('data-from') ? el.getAttribute('data-from') + 'px' : '';
      var f = parseFloat(getComputedStyle(el).fontSize), guard = 0;
      while ((box.scrollHeight > box.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) && f > min && guard++ < 60) { f -= 1; el.style.fontSize = f + 'px'; }
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitAll(); });

  function renderSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentIndex = index;
    stopTimer();
    var s = slides[index];
    var body = (R[s.layout] || R.statement)(s);
    var liveSide = s.layout === 'live' && s.side && s.side.length;
    var hero = !liveSide && (HERO[s.layout] || !s.title);
    var right = (s.do && s.layout !== 'divider' ? DO_PILL : '') + (s.layout === 'title' ? '' : '<span class="pg">' + (index + 1) + '</span>');
    var head = hero ? '<div class="floating" style="right:60px;top:54px">' + right + '</div>'
      : (liveSide && !s.title ? '<div class="head pill-head"><span class="pill ' + (s.do ? '' : 'soft') + '"><span class="d"></span>' + esc(s.label || 'Jonli') + '</span><div class="head-r">' + (s.layout === 'title' ? '' : '<span class="pg">' + (index + 1) + '</span>') + '</div></div>'
      : '<div class="head"><h1 class="slide-head' + (plain(s.title).length > 44 ? ' long' : '') + '">' + fmt(s.title) + '</h1><div class="head-r">' + right + '</div></div>');
    document.getElementById('slide-content').innerHTML = '<div class="slide-main" style="position:relative">' + head + '<div class="content-stage">' + body + '</div></div>';
    countUp();
    fitAll();
    var n = s.notes || {};
    document.getElementById('notes-title').textContent = (index + 1) + ' / ' + slides.length + '   ' + (s.seg || '') + '   ' + (s.mod || '');
    var talk = (window.TALK_DATA || {})[index + 1] || s.talk || '';
    var drawer = document.getElementById('notes-drawer'), talkEl = document.getElementById('notes-talk');
    if (talkEl) { talkEl.textContent = talk; talkEl.parentNode.scrollTop = 0; drawer.classList.toggle('no-talk', !talk); }
    document.getElementById('notes-do').textContent = n.do || '';
    document.getElementById('notes-say').textContent = n.say || '';
    var thumbs = document.querySelectorAll('.grid-thumb');
    for (var t = 0; t < thumbs.length; t++) thumbs[t].classList.toggle('active', t === index);
    // optional slim footer (deck.json "chrome": true, off by default): lesson label and module left, run-of-show time right
    if (DECK.chrome) {
      var bar = document.getElementById('chrome-bar');
      if (!bar) { bar = document.createElement('div'); bar.id = 'chrome-bar'; document.getElementById('stage').appendChild(bar); }
      bar.innerHTML = '<span>' + esc(DECK.label || ('Praktikum 3.0 · ' + DECK.day + '-dars')) + (s.mod ? ' · ' + esc(s.mod) : '') + '</span><span>' + esc(s.seg || '') + '</span>';
      bar.style.display = s.layout === 'title' ? 'none' : '';
    }
    try { history.replaceState(null, '', '?slide=' + (index + 1) + (ANIM ? '' : '&noanim=1')); } catch (e) {}
  }

  function startStopTimer() {
    var el = document.getElementById('clock');
    if (!el) return;
    if (timerHandle) { stopTimer(); return; }
    var total = parseInt(el.getAttribute('data-min'), 10) * 60, end = Date.now() + total * 1000;
    var row = document.querySelectorAll('#dotrow i');
    timerHandle = setInterval(function () {
      var left = Math.max(0, Math.round((end - Date.now()) / 1000));
      el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
      var gone = Math.floor((1 - left / total) * row.length);
      for (var i = 0; i < row.length; i++) row[i].classList.toggle('off', i < gone);
      if (left === 0) stopTimer();
    }, 250);
  }
  function stopTimer() { if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }
  function nextSlide() { if (currentIndex < slides.length - 1) renderSlide(currentIndex + 1); }
  function prevSlide() { if (currentIndex > 0) renderSlide(currentIndex - 1); }
  function jumpToSlide(i) { renderSlide(i); if (gridOpen) toggleGrid(); }
  function toggleNotes() { notesOpen = !notesOpen; document.getElementById('notes-drawer').classList.toggle('open', notesOpen); }
  function toggleGrid() { gridOpen = !gridOpen; document.getElementById('grid-modal').classList.toggle('open', gridOpen); }
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
    else document.exitFullscreen().catch(function () {});
  }
  function buildGrid() {
    document.getElementById('grid-title').textContent = (DECK.label || ('Praktikum 3.0, ' + DECK.day + '-dars')) + ': ' + slides.length + ' ta slayd';
    document.getElementById('grid-cards-container').innerHTML = slides.map(function (s, i) {
      var k = kind(s);
      return '<div class="grid-thumb ' + k + '" onclick="jumpToSlide(' + i + ')"><div class="thumb-num">' + (i + 1) + '   ' + esc(s.seg) + '</div><div class="thumb-title">' + esc(plain(s.title || s.big || '')) + '</div></div>';
    }).join('');
  }
  function handleResize() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    document.getElementById('stage').style.transform = 'scale(' + scale + ')';
  }
  window.renderSlide = renderSlide; window.jumpToSlide = jumpToSlide; window.toggleNotes = toggleNotes; window.toggleGrid = toggleGrid;
  window.nextSlide = nextSlide; window.prevSlide = prevSlide; window.toggleFullscreen = toggleFullscreen;

  window.addEventListener('resize', handleResize);
  // Copy the prompt of the current slide (button when deck.json has "copy": true, key C always; a slide with noCopy is skipped).
  function copyPrompt(btn) {
    var el = document.getElementById('prompt-code-text'), s = slides[currentIndex];
    if (!el || (s && s.noCopy)) return;
    var done = function () { if (!btn) return; var o = btn.textContent; btn.textContent = 'Nusxa olindi'; setTimeout(function () { btn.textContent = o; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(el.innerText).then(done, done); else done();
  }
  window.DECKAPI = { copyPrompt: copyPrompt };
  window.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'c' || k === 'C') { if (!e.metaKey && !e.ctrlKey) copyPrompt(document.querySelector('#slide-content .copy-btn')); return; }
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') { e.preventDefault(); nextSlide(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prevSlide(); }
    else if (k === 'f' || k === 'F') toggleFullscreen();
    else if (k === 'p' || k === 'P' || k === 'n' || k === 'N') toggleNotes();
    else if (k === 'g' || k === 'G') toggleGrid();
    else if (k === 't' || k === 'T') startStopTimer();
    else if (k === 'Escape') { if (gridOpen) toggleGrid(); if (notesOpen) toggleNotes(); }
    else if (k === 'Home') jumpToSlide(0);
    else if (k === 'End') jumpToSlide(slides.length - 1);
  });

  if (ANIM) document.getElementById('stage').classList.add('anim');
  if (slides.length) {
    var p = parseInt(new URLSearchParams(window.location.search).get('slide'), 10) || 1;
    buildGrid();
    handleResize();
    renderSlide(p - 1);
  } else {
    document.getElementById('slide-content').textContent = 'slides_data.js yuklanmadi.';
  }
})();
