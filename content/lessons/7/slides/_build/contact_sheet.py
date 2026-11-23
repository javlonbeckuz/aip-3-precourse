"""Day 6 deck contact sheets: thin wrapper around the shared builder in deck-engine/.
Run: uv run --with pillow python3 day-6/_build/contact_sheet.py   (after qa_deck.py)
Output: day-6/_build/qa/sheets/sheet-N.png
"""
import runpy
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.argv = [sys.argv[0], HERE.parent.name] + sys.argv[1:]
runpy.run_path(str(HERE.parent.parent / "deck-engine" / "contact_sheet.py"), run_name="__main__")
