"""Deck QA for day 4: runs the shared deck-engine/qa_deck.py on this day's deck.

Run:  uv run --with playwright python3 day-4/_build/deck/qa_deck.py [--slides 1,2,3]
Screenshots and report.json go to day-4/_build/qa/deck/. Paths resolve relative to this file.
The old stand-alone QA script (dark deck) is archived with that deck: 90_archive, praktikum-3, 2026-11-20_day-4-deck.
"""
import pathlib
import runpy
import sys

HERE = pathlib.Path(__file__).resolve().parent
DAY = HERE.parent.parent
sys.argv = [sys.argv[0], str(DAY)] + sys.argv[1:]
runpy.run_path(str(DAY.parent / "deck-engine" / "qa_deck.py"), run_name="__main__")
