"""Day 2 deck contact sheets: thin wrapper around the shared builder in deck-engine/.
Run: uv run --with pillow python3 day-2/_build/deck/contact_sheet.py   (after qa_deck.py)
Output: day-2/_build/qa/sheets/sheet-N.png
"""
import runpy
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY = HERE.parent.parent
sys.argv = [sys.argv[0], DAY.name] + sys.argv[1:]
runpy.run_path(str(DAY.parent / "deck-engine" / "contact_sheet.py"), run_name="__main__")
