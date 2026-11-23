#!/usr/bin/env bash
# Render every Day 2 HTML page (except the deck) at 1440 and 390 px, offline; report overflow and blocked requests.
# Usage: bash qa_pages.sh     (screenshots in renders/pages/)
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"
pages=(
  ../handouts/promptlar.html ../handouts/lugat.html ../handouts/uy-vazifasi.html ../handouts/claude-code-shpargalka.html
  ../exercises/mashqlar.html ../company-folder-starter/kompaniya.qollanma.html ../company-folder-starter/yomon-namuna/nima-xato.html
  ../company-folder-starter/baraka-office/kompaniya/kit2-scoring/matrix.html
)
fail=0
for p in "${pages[@]}"; do
  n=$(basename "$p" .html)
  for w in 1440 390; do
    out=$(uv run --quiet --with playwright python3 render.py "$p" "renders/pages/$n-$w.png" --width $w --height 900 --full 2>&1 | tail -1)
    echo "$n $w: $out" | sed 's|wrote .*/||'
    echo "$out" | grep -q "horizontal_overflow=True\|blocked_requests=[1-9]" && fail=1
  done
done
exit $fail
