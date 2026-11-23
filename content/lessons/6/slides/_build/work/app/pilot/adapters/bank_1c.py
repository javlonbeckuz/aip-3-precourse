"""Bank statement in the 1C client-bank text format (first line "1CClientBankExchange").

Some banks offer "export to 1C" next to Excel and PDF. That file is plain text, Windows-1251
or DOS encoding, with key=value lines:

    1CClientBankExchange
    РасчСчет=20208000905411223344
    СекцияДокумент=Платежное поручение
    Номер=4102
    Дата=03.08.2026
    Сумма=28718200.00
    ПлательщикСчет=...
    Плательщик1=...
    ПлательщикИНН=...
    ПолучательСчет=20208000905411223344
    НазначениеПлатежа=...
    КонецДокумента

The format is the Russian 1C standard (v8.1c.ru, checked 2026-11-03); which Uzbek banks export
exactly this layout is not confirmed, so unknown keys are tolerated and only the common ones
are used. If your bank gives Excel, use type = "excel" instead.

sources.toml:

    [[source]]
    name = "Bank ko‘chirmasi"
    type = "bank_1c"
    path = "data/bank-kochirma.txt"
    # account = "20208000905411223344"   # your account; default: РасчСчет from the file header

Columns: Sana, Hujjat №, Kontragent, Kontragent STIR, Kirim, Chiqim, To‘lov maqsadi.
"""

from __future__ import annotations

from datetime import datetime
from pathlib import Path

from pilot.sources import FileSource, Table, check_prices

from ._common import money


def decode(raw: bytes) -> str:
    head = raw[:600]
    if b"=DOS" in head:
        return raw.decode("cp866", errors="replace")
    for enc in ("utf-8-sig", "cp1251"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("cp1251", errors="replace")


def parse(text: str) -> tuple[dict, list[dict]]:
    header: dict[str, str] = {}
    docs: list[dict] = []
    current: dict | None = None
    for line in text.splitlines():
        line = line.strip()
        if not line or "=" not in line:
            if line == "КонецДокумента" and current is not None:
                docs.append(current)
                current = None
            continue
        key, value = line.split("=", 1)
        if key == "СекцияДокумент":
            current = {"Вид": value}
        elif current is not None:
            current[key] = value
        else:
            header.setdefault(key, value)
    return header, docs


def _amount(raw: str) -> str:
    return money((raw or "").replace(" ", ""), 1)


class Bank1CSource(FileSource):
    def __init__(self, name: str, path: Path, columns=None, max_age_hours=None, check=None, *, account=None):
        super().__init__(name, path, columns=columns, max_age_hours=max_age_hours, check=check)
        self.account = (account or "").replace(" ", "")

    def load(self) -> Table:
        path = self.path
        if not path.exists():
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: fayl topilmadi ({path.name})")
        text = decode(path.read_bytes())
        if not text.lstrip().startswith("1CClientBankExchange"):
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: bu 1C formatidagi ko‘chirma emas (birinchi qator 1CClientBankExchange "
                                 "bo‘lishi kerak). Bank Excel bersa, type = \"excel\" ishlating")
        header, docs = parse(text)
        ours = self.account or header.get("РасчСчет", "").replace(" ", "")
        rows = []
        for d in docs:
            payer = d.get("ПлательщикСчет", d.get("ПлательщикРасчСчет", "")).replace(" ", "")
            outgoing = bool(ours) and payer == ours
            amount = _amount(d.get("Сумма", ""))
            if outgoing:
                party = d.get("Получатель1") or d.get("Получатель", "")
                tin = d.get("ПолучательИНН", "")
            else:
                party = d.get("Плательщик1") or d.get("Плательщик", "")
                tin = d.get("ПлательщикИНН", "")
            rows.append({
                "Sana": d.get("ДатаСписано") or d.get("ДатаПоступило") or d.get("Дата", ""),
                "Hujjat №": d.get("Номер", ""),
                "Kontragent": party,
                "Kontragent STIR": tin,
                "Kirim": "" if outgoing else amount,
                "Chiqim": amount if outgoing else "",
                "To‘lov maqsadi": d.get("НазначениеПлатежа", ""),
            })
        table = Table.from_rows(self.name, rows, origin=path.name)
        if not rows:
            table.problem = f"{self.name}: faylda to‘lov hujjati yo‘q"
            return table
        table.keep_columns(self.columns)
        return check_prices(table, self.check or {})


def make(spec: dict, app_dir: Path) -> Bank1CSource:
    path = Path(spec["path"])
    return Bank1CSource(
        spec["name"], path if path.is_absolute() else app_dir / path,
        columns=spec.get("columns"), max_age_hours=spec.get("max_age_hours"), check=spec.get("check"),
        account=spec.get("account"),
    )
