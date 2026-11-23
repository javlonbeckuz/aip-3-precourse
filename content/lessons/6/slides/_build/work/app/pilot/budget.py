"""Spending guard: stop calling the model when today's or this month's spend hits the cap.

Caps come from `.env` (DAILY_BUDGET_USD, MONTHLY_BUDGET_USD). Spend is the sum of
`cost_usd` in the journal, which OpenRouter reports for every answer.
This is the second fence: the first is the limit set on the OpenRouter key itself.
"""

from __future__ import annotations

from datetime import date, datetime

from .journal import Journal


class Budget:
    def __init__(self, journal: Journal, daily_cap: float, monthly_cap: float):
        self.journal = journal
        self.daily_cap = daily_cap
        self.monthly_cap = monthly_cap
        self._day: date | None = None
        self._today = 0.0
        self._month = 0.0

    def _sync(self, now: datetime) -> None:
        if self._day == now.date():
            return
        self._day = now.date()
        first = now.date().replace(day=1)
        self._today = self._month = 0.0
        for ev in self.journal.events(first, now.date()):
            cost = float(ev.get("cost_usd") or 0.0)
            self._month += cost
            if ev["ts"][:10] == now.date().isoformat():
                self._today += cost

    def spent(self, now: datetime) -> tuple[float, float]:
        self._sync(now)
        return self._today, self._month

    def add(self, cost: float, now: datetime) -> None:
        self._sync(now)
        self._today += cost
        self._month += cost

    def exceeded(self, now: datetime) -> str | None:
        """'daily' or 'monthly' when a cap is reached, else None. A cap of 0 means no cap."""
        today, month = self.spent(now)
        if self.monthly_cap and month >= self.monthly_cap:
            return "monthly"
        if self.daily_cap and today >= self.daily_cap:
            return "daily"
        return None

    def month_share(self, now: datetime) -> int:
        _, month = self.spent(now)
        return int(100 * month / self.monthly_cap) if self.monthly_cap else 0
