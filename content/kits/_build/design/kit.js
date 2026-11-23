// Page script for the worksheet kits. Inlined by _build/build_kits.py.
// 1. Cover titles shrink until they fit in three lines.
// 2. Write-in table rows share the free height of their wrapper, so every form fills its page.
// 3. Field blocks share the free height by their number of lines.
// 4. Overflow report for the build script (JSON in <title>, read via --dump-dom).
// 5. Writing lines drawn as real borders (see the end of layout()).
(function () {
  var MM = 96 / 25.4;
  function layout() {

  document.querySelectorAll('.cover h1').forEach(function (h) {
    var size = parseFloat(getComputedStyle(h).fontSize);
    var lh = function () { return parseFloat(getComputedStyle(h).lineHeight); };
    var guard = 0;
    while ((h.scrollWidth > h.clientWidth + 1 || h.getBoundingClientRect().height > lh() * (h.closest('.allcover') ? 2.2 : 3.2)) && guard++ < 40) {
      size -= 1; h.style.fontSize = size + 'px';
    }
  });

  // cover body: shrink purpose, steps and boxes together until the author line is inside the frame
  document.querySelectorAll('.cover .frame').forEach(function (fr) {
    var parts = fr.querySelectorAll('.purpose, .steps p, .box .bt, .how .bt, .tl');
    var base = []; parts.forEach(function (el) { base.push(parseFloat(getComputedStyle(el).fontSize)); });
    var author = fr.querySelector('.author');
    var k = 1, guard = 0;
    while (author.getBoundingClientRect().bottom > fr.getBoundingClientRect().bottom + 0.5 && k > 0.7 && guard++ < 40) {
      k -= 0.02;
      parts.forEach(function (el, i) { el.style.fontSize = (base[i] * k) + 'px'; });
    }
  });

  document.querySelectorAll('.tw').forEach(function (w) {
    var t = w.querySelector('table'); if (!t) return;
    var rows = t.querySelectorAll('tbody tr');
    var head = t.querySelector('thead') ? t.querySelector('thead').getBoundingClientRect().height : 0;
    var avail = w.getBoundingClientRect().height - head - 1;
    var minRow = parseFloat(w.dataset.minrow || '10') * MM;
    var h = Math.max(minRow, Math.floor(avail / rows.length));
    rows.forEach(function (r) { r.style.height = h + 'px'; });
    t.style.height = 'auto';
  });

  document.querySelectorAll('.fs').forEach(function (fs) {
    var fields = fs.querySelectorAll('.f');
    var lines = 0; fields.forEach(function (f) { lines += +f.dataset.lines; });
    var labels = 0; fields.forEach(function (f) { labels += f.querySelector('.fl').getBoundingClientRect().height + 2 * MM; });
    var avail = fs.getBoundingClientRect().height - labels;
    fields.forEach(function (f) {
      var r = f.querySelector('.ruled');
      var h = avail * (+f.dataset.lines) / lines;
      var step = 8 * MM;
      h = Math.max(step, Math.floor(h / step) * step);
      r.style.flex = '1 1 ' + h + 'px';   // grow into any leftover height so the lines run to the next field
      f.style.flex = '1 1 auto';
    });
  });

  // 5. Writing lines: real 0.25 mm borders, one per full 8 mm row. A repeating CSS gradient was used before,
  //    but Chrome rasterises it into the PDF unevenly (lines missing, a hairline under each label).
  document.querySelectorAll('.ruled').forEach(function (r) {
    r.innerHTML = '';
    var n = Math.floor((r.getBoundingClientRect().height + 0.5) / (8 * MM));
    for (var k = 0; k < n; k++) { var d = document.createElement('div'); d.className = 'rl'; r.appendChild(d); }
  });

  }
  function report() {
    var report = [];
    document.querySelectorAll('.page').forEach(function (p) {
      var pr = p.getBoundingClientRect();
      var fr = p.querySelector('.frame'); var frr = fr ? fr.getBoundingClientRect() : pr;
      p.querySelectorAll('.frame *').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        if (r.bottom > frr.bottom + 0.5 || r.right > frr.right + 0.5 || r.left < frr.left - 0.5) {
          report.push(p.id + ':' + el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '') +
            ' bottom=' + Math.round(r.bottom - frr.top) + 'px of ' + Math.round(frr.height));
        }
      });
    });
    document.title = JSON.stringify(report.length ? report.slice(0, 12) : ['ok: nothing leaves its page']);
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { layout(); report(); });
})();
