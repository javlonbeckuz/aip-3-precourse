#!/usr/bin/env bash
# Day 2: prepare the instructor's demo user the day before class.
# Run it ON THE SEPARATE "Praktikum Demo" macOS USER, never on a personal account:
# it puts 40 demo files on the Desktop.
#
#   bash setup-demo-machine.sh                 # real run, into $HOME
#   bash setup-demo-machine.sh --target /tmp/x # dry run into another folder (for testing)
#
# Creates:
#   <target>/Desktop/                     40 messy demo files (Demo 2), plus xato-skrinshot.png (Demo 3b)
#   <target>/Praktikum/baraka/kompaniya/  Baraka example WITHOUT Kit 2 results, prd, tasks, skills (Demos 1, 4, 5, 6, 7 run here)
#   <target>/Praktikum/baraka-tayyor/kompaniya/  the full worked example (fallback for every demo)
#   <target>/Praktikum/baraka-chatsiz/kompaniya/ same folder WITHOUT CLAUDE.md (Demo 4, first half)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
DAY2="$(cd "$HERE/../.." && pwd)"
BARAKA="$DAY2/company-folder-starter/baraka-office/kompaniya"
STARTER="$DAY2/company-folder-starter/kompaniya"
TARGET="$HOME"
if [[ "${1:-}" == "--target" ]]; then TARGET="$2"; fi
mkdir -p "$TARGET/Desktop" "$TARGET/Praktikum"

# 1. Messy Desktop (all files are tiny placeholders with a line of text)
cd "$TARGET/Desktop"
files=(
  "KP_Paynet_Tech_v3.docx" "KP_Najot_Talim_final.docx" "KP_Najot_Talim_final (1).docx" "shartnoma-namuna.pdf"
  "prays-list-2026-oktabr.pdf" "katalog-2026.pdf" "akt-sverka-noyabr.pdf" "ishonchnoma-Otabek.pdf"
  "ichki-tartib.docx" "taqdimot-Agrobank.pptx" "3D_ofis_Chilonzor.png" "3D_ofis_Yunusobod.png"
  "3D_Biznes20_variant2.png" "IMG_4471.jpg" "IMG_4472.jpg" "IMG_4480.jpg" "Screenshot 2026-11-20 at 10.12.44.png"
  "Screenshot 2026-11-21 at 18.03.10.png" "logo-baraka.svg" "showroom-foto.jpeg" "savdo-oktabr.xlsx"
  "savdo-sentabr.xlsx" "ombor-qoldiq.csv" "kpi-noyabr.xlsx" "chegirmalar-ruxsat.xlsx" "lidlar-instagram.csv"
  "byudjet-2027.numbers" "katalog-2025.zip" "3D-loyihalar-arxiv.zip" "eski-saytdan.zip"
  "AmoCRM-setup.dmg" "Zoom-installer.pkg" "ovozli-xabar.ogg" "video-montaj.mp4" "reels-oldin-keyin.mov"
  "eslatma.txt" "parollar-EMAS.txt" "telefonlar.vcf" "yangi-papka-eslatma.md" "uchrashuv-qaydlari.md"
)
for f in "${files[@]}"; do printf 'Praktikum 2-dars demo fayli: %s\n' "$f" > "$f"; done
cp "$HERE/xato-skrinshot.png" "$TARGET/Desktop/xato-skrinshot.png"

# 2. Baraka folders
copy_baraka() {  # $1 = destination kompaniya folder
  rm -rf "$1"; mkdir -p "$(dirname "$1")"
  cp -R "$BARAKA" "$1"
}
copy_baraka "$TARGET/Praktikum/baraka-tayyor/kompaniya"
copy_baraka "$TARGET/Praktikum/baraka/kompaniya"
# live-demo folder: remove the results the demos create live
D="$TARGET/Praktikum/baraka/kompaniya"
rm -rf "$D/prd.md" "$D/tasks.md" "$D/.claude"
cp "$STARTER/kit2-scoring/form-a-scoring.md" "$STARTER/kit2-scoring/form-b-matrix.md" "$D/kit2-scoring/"
rm -f "$D/kit2-scoring/matrix.html"
cp "$HERE/otabek-transcript.md" "$D/kit1-interviews/otabek-transcript.md"
# Demo 4 first half: the same folder without CLAUDE.md
copy_baraka "$TARGET/Praktikum/baraka-chatsiz/kompaniya"
rm -f "$TARGET/Praktikum/baraka-chatsiz/kompaniya/CLAUDE.md"
rm -rf "$TARGET/Praktikum/baraka-chatsiz/kompaniya/.claude"

echo "Desktop: $(ls "$TARGET/Desktop" | wc -l | tr -d ' ') files"
echo "Ready: $TARGET/Praktikum/{baraka,baraka-tayyor,baraka-chatsiz}/kompaniya"
echo "Next: open Warp, rehearse each demo, then /clear and close Warp."
