"""Deck QA for this day: runs the shared deck-engine/qa_deck.py on this day's deck.

Run:  uv run --with playwright python3 day-1/_build/qa_deck.py [--slides 1,2,3]
Screenshots and report.json go to _build/qa/deck/. Paths resolve relative to this file.
"""
import pathlib
import runpy
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.argv = [sys.argv[0], str(HERE.parent)] + sys.argv[1:]
runpy.run_path(str(HERE.parent.parent / "deck-engine" / "qa_deck.py"), run_name="__main__")
