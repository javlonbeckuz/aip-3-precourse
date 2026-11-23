"""Deck QA for this day: runs the shared deck-engine/qa_deck.py on this day's deck.

Run:  uv run --with playwright python3 day-5/_build/deck/qa_deck.py [--slides 1,2,3]
Screenshots and report.json go to day-5/_build/qa/deck/. Paths resolve relative to this file.
The old dark-deck version of this script and its screenshots are archived (01_MD archive, praktikum-3, 2026-11-20_day-5-deck).
"""
import pathlib
import runpy
import sys

HERE = pathlib.Path(__file__).resolve().parent
DAY = HERE.parent.parent
sys.argv = [sys.argv[0], str(DAY)] + sys.argv[1:]
runpy.run_path(str(DAY.parent / "deck-engine" / "qa_deck.py"), run_name="__main__")
