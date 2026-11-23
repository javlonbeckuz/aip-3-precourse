"""Poster POS (joinposter.com) reports through its API, read only, as a table.

.env:
    POSTER_TOKEN=123456:abcdef...   # "Доступ > Интеграции" > personal integration token

sources.toml:

    [[source]]
    name = "Poster: oxirgi 7 kun sotuvi"
    type = "poster"
    report = "sales"       # "sales" (dash.getProductsSales), "stock" (storage.getStorageLeftovers)
                           # or "menu" (menu.getProducts)
    days = 7               # sales only: today and the 6 days before
    # include_profit = false   # sales only: profit is internal; default: hidden
    # money_divisor = 100      # API money is in minor units; check one known price
    # refresh_minutes = 15

Poster answers errors with HTTP 200 and an "error" object, so the body is always checked.
Docs: dev.joinposter.com (checked 2026-11-03).
"""

from __future__ import annotations

from datetime import datetime, timedelta
from pathlib import Path

from ._common import TZ, TimedRefresh, finish, http_error, make_client, money, need_secret

API = "https://joinposter.com/api/"
METHODS = {"sales": "dash.getProductsSales", "stock": "storage.getStorageLeftovers", "menu": "menu.getProducts"}
UNITS = {"kg": "kg", "p": "dona", "l": "l"}


def _menu_price(product: dict) -> str | None:
    spots = product.get("spots") or []
    if spots and spots[0].get("price") not in (None, ""):
        return spots[0]["price"]
    price = product.get("price")
    if isinstance(price, dict) and price:
        return next(iter(price.values()))
    return price


class PosterSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None, today=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        self.token_env = spec.get("token_env", "POSTER_TOKEN")
        self.report = spec.get("report", "sales")
        if self.report not in METHODS:
            raise ValueError(f"sources.toml: poster report = {self.report}? Bor: {', '.join(METHODS)}")
        self.days = int(spec.get("days", 7))
        self.include_profit = bool(spec.get("include_profit", False))
        self.divisor = float(spec.get("money_divisor", 100))
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 15))
        self._client = client
        self._today = today

    def load(self):
        token = need_secret(self.token_env, self.app_dir, "Poster tokeni")
        params = {"token": token, "format": "json"}
        if self.report == "sales":
            today = self._today or datetime.now(TZ).date()
            params["date_from"] = (today - timedelta(days=self.days - 1)).strftime("%Y%m%d")
            params["date_to"] = today.strftime("%Y%m%d")
        client = self._client or make_client()
        try:
            resp = client.get(API + METHODS[self.report], params=params)
        finally:
            if self._client is None:
                client.close()
        if resp.status_code != 200:
            raise http_error("Poster", resp)
        data = resp.json()
        if "error" in data:
            err = data["error"]
            raise RuntimeError(f"Poster: xato {err.get('code', '?')}: {err.get('message', '')}")
        items = data.get("response") or []
        d = self.divisor
        if self.report == "sales":
            rows = []
            for p in items:
                row = {"Mahsulot": p.get("product_name", ""),
                       "Variant": p.get("modification_name") or p.get("modificator_name") or "",
                       "Sotildi": money(p.get("count")),
                       "Tushum (so‘m)": money(p.get("payed_sum"), d)}
                if self.include_profit:
                    row["Foyda (so‘m)"] = money(p.get("product_profit"), d)
                rows.append(row)
            period = f"{params['date_from']}-{params['date_to']}"
            return finish(self.name, rows, f"Poster API ({period})", self.columns, self.check,
                          "tanlangan kunlarda sotuv yo‘q")
        if self.report == "stock":
            rows = [{"Nomi": p.get("ingredient_name", ""), "Qoldiq": money(p.get("ingredient_left")),
                     "Birlik": UNITS.get(p.get("ingredient_unit", ""), p.get("ingredient_unit", "")),
                     "Minimal qoldiq": money(p.get("limit_value"))}
                    for p in items if str(p.get("hidden", "0")) != "1"]
            return finish(self.name, rows, "Poster API", self.columns, self.check, "ombor qoldig‘i bo‘sh")
        rows = [{"Taom": p.get("product_name", ""), "Turkum": p.get("category_name", ""),
                 "Narx (so‘m)": money(_menu_price(p), d)} for p in items]
        return finish(self.name, rows, "Poster API", self.columns, self.check, "menyu bo‘sh")


def make(spec: dict, app_dir: Path) -> PosterSource:
    return PosterSource(spec, app_dir)
