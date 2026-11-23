"""Business data the agent may use (Kit 3 B.3), behind one small interface.

The list of sources lives in `agent/sources.toml`. Built in:
- type = "file": a CSV or Excel (.xlsx) export, including 1C exports
  (Windows-1251 encoding, ";" separator, title rows above the header are all handled),
  or a .md / .txt document (price rules, FAQ, policies).
- type = "google_sheet": a Google Sheet read as CSV through its export link.

Adding a CRM or 1C API later (for example amoCRM, Bitrix24, a 1C HTTP service):
write a class with a `name` attribute and a `load()` method that returns a `Table`,
then register it in SOURCE_TYPES at the bottom of this file. Nothing else changes.

    class AmoCrmLeads:
        def __init__(self, spec, cfg):
            self.name = spec["name"]
            self.token_env = spec.get("token_env", "AMOCRM_TOKEN")   # key stays in .env
        def load(self) -> Table:
            rows = ...  # call the API with httpx, turn the JSON into a list of dicts
            return Table.from_rows(self.name, rows, origin="amoCRM API")

    SOURCE_TYPES["amocrm"] = AmoCrmLeads
"""

from __future__ import annotations

import csv
import io
import logging
import re
import tomllib
from dataclasses import dataclass, field
from datetime import date, datetime
from pathlib import Path
from typing import Callable, Protocol

import httpx

log = logging.getLogger(__name__)

# ------------------------------------------------------------------ text helpers

_APOSTROPHES = str.maketrans({c: "'" for c in "‘’ʻʼ`´"})
_CYR = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo", "ж": "j", "з": "z",
    "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
    "с": "s", "т": "t", "у": "u", "ф": "f", "х": "x", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh",
    "ъ": "", "ы": "i", "ь": "", "э": "e", "ю": "yu", "я": "ya", "ў": "o", "қ": "q", "ғ": "g", "ҳ": "h",
}


def normalize(text: str) -> str:
    """Lowercase, one kind of apostrophe, Cyrillic spelled in Latin (for matching only)."""
    text = text.lower().translate(_APOSTROPHES)
    return "".join(_CYR.get(ch, ch) for ch in text)


def _stems(text: str) -> set[str]:
    words = re.findall(r"[a-z0-9]+", normalize(text).replace("'", ""))
    return {w[:4] if len(w) >= 4 and not w.isdigit() else w for w in words if len(w) >= 2}


def _cell(value) -> str:
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    if isinstance(value, datetime):
        return value.date().isoformat() if value.time() == datetime.min.time() else value.isoformat(" ", "minutes")
    if isinstance(value, date):
        return value.isoformat()
    return str(value).strip()


# ------------------------------------------------------------------ the Table


@dataclass
class Table:
    """What every source returns: a table (columns + rows) or a text document."""

    name: str
    columns: list[str] = field(default_factory=list)
    rows: list[dict[str, str]] = field(default_factory=list)
    text: str = ""
    origin: str = ""
    loaded_at: datetime | None = None
    problem: str | None = None
    # Row-level errors (e.g. a price typo): the bad rows are left out, the owner and
    # `pilot check` see these lines, the model only sees the good rows.
    warnings: list[str] = field(default_factory=list)
    stale: str | None = None  # set when the file is older than max_age_hours (re-checked on every question)

    @property
    def is_document(self) -> bool:
        return bool(self.text) and not self.columns

    @classmethod
    def from_rows(cls, name: str, rows: list[dict], origin: str = "") -> "Table":
        columns: list[str] = []
        for row in rows:
            for key in row:
                if key not in columns:
                    columns.append(key)
        clean = [{c: _cell(r.get(c)) for c in columns} for r in rows]
        return cls(name=name, columns=columns, rows=clean, origin=origin, loaded_at=datetime.now())

    def keep_columns(self, wanted: list[str] | None) -> "Table":
        """Show the model only these columns (keeps internal fields out of the prompt)."""
        if not wanted or not self.columns:
            return self
        by_norm = {normalize(c): c for c in self.columns}
        keep, missing = [], []
        for w in wanted:
            real = by_norm.get(normalize(w))
            (keep if real else missing).append(real or w)
        if missing:
            self.problem = f"{self.name}: ustun topilmadi: {', '.join(missing)}. Bor ustunlar: {', '.join(self.columns)}"
        self.columns = keep
        self.rows = [{c: r.get(c, "") for c in keep} for r in self.rows]
        return self

    def row_line(self, row: dict[str, str]) -> str:
        return " | ".join(row.get(c, "") for c in self.columns)

    def full_text(self) -> str:
        if self.is_document:
            return self.text
        lines = [" | ".join(self.columns)] + [self.row_line(r) for r in self.rows]
        return "\n".join(lines)


def table_from_matrix(name: str, matrix: list[list[str]], origin: str) -> Table:
    """Find the header row (first row with 2+ filled cells), drop empty rows and columns."""
    matrix = [[_cell(c) for c in row] for row in matrix]
    header_at = next((i for i, row in enumerate(matrix) if sum(1 for c in row if c) >= 2), None)
    if header_at is None:
        return Table(name=name, origin=origin, loaded_at=datetime.now(), problem=f"{name}: fayl bo‘sh")
    header = matrix[header_at]
    used = [i for i, h in enumerate(header) if h]
    columns, seen = [], set()
    for i in used:
        col = header[i]
        while col in seen:
            col += "_"
        seen.add(col)
        columns.append(col)
    rows = []
    for raw in matrix[header_at + 1:]:
        if not any(raw):
            continue
        values = [raw[i] if i < len(raw) else "" for i in used]
        if any(values):
            rows.append(dict(zip(columns, values)))
    table = Table(name=name, columns=columns, rows=rows, origin=origin, loaded_at=datetime.now())
    if not rows:
        table.problem = f"{name}: jadvalda qatorlar yo‘q"
    return table


def decode_bytes(raw: bytes) -> str:
    """UTF-8 first (with or without BOM), then Windows-1251, which 1C often uses."""
    for enc in ("utf-8-sig", "cp1251"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def parse_csv_text(text: str) -> list[list[str]]:
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
        delimiter = dialect.delimiter
    except csv.Error:
        delimiter = ";" if sample.count(";") > sample.count(",") else ","
    return list(csv.reader(io.StringIO(text), delimiter=delimiter))


# ------------------------------------------------------------------ price check


def parse_price(raw: str) -> float | None:
    """'1 450 000', '1 450 000,00', '1450000.00', '1,450,000' -> 1450000.0; anything else -> None."""
    text = re.sub(r"[\s\u00a0\u202f]|so[‘’'`ʻ]?m|сум|UZS", "", raw or "", flags=re.I)
    if re.fullmatch(r"\d+([.,]\d{1,2})?", text):
        return float(text.replace(",", "."))
    if re.fullmatch(r"\d{1,3}(,\d{3})+(\.\d{1,2})?", text):
        return float(text.replace(",", ""))
    return None


def check_prices(table: Table, rule: dict) -> Table:
    """Validate a price list (the `[source.check]` block in sources.toml) and drop bad rows.

    price_columns       columns that must hold a price
    min, max            plausible range in so'm
    retail, wholesale   wholesale must not be above retail ...
    wholesale_min_share ... nor below this share of it (catches an extra or missing zero)
    """
    if not rule or not table.columns:
        return table
    by_norm = {normalize(c): c for c in table.columns}
    cols = []
    for name in rule.get("price_columns", []):
        real = by_norm.get(normalize(name))
        if real is None:
            table.warnings.append(f"{table.name}: narx ustuni topilmadi: {name}")
        else:
            cols.append(real)
    retail = by_norm.get(normalize(rule.get("retail", "")))
    wholesale = by_norm.get(normalize(rule.get("wholesale", "")))
    lo, hi = float(rule.get("min", 1)), float(rule.get("max", 1e12))
    share = float(rule.get("wholesale_min_share", 0))
    keep = []
    for row in table.rows:
        key = row.get(table.columns[0], "?")
        errors = []
        values = {}
        for col in cols:
            raw = row.get(col, "")
            value = parse_price(raw)
            if not raw.strip():
                errors.append(f"«{col}» bo‘sh")
            elif value is None:
                errors.append(f"«{col}» raqam emas: {raw}")
            elif value <= 0:
                errors.append(f"«{col}» nol")
            elif not lo <= value <= hi:
                errors.append(f"«{col}» ishonchsiz: {raw}")
            else:
                values[col] = value
        if retail in values and wholesale in values:
            r, w = values[retail], values[wholesale]
            if w > r:
                errors.append(f"ulgurji narx ({row[wholesale]}) chakanadan ({row[retail]}) katta")
            elif share and w < r * share:
                errors.append(f"ulgurji narx ({row[wholesale]}) chakananing {share:.0%} idan kam: xato nol?")
        if errors:
            table.warnings.append(f"{table.name}, {key}: " + "; ".join(errors) + " (qator ishlatilmaydi)")
        else:
            keep.append(row)
    table.rows = keep
    return table


# ------------------------------------------------------------------ sources


class Source(Protocol):
    name: str

    def load(self) -> Table: ...


class FileSource:
    """A CSV / Excel export or a text document on disk.

    A fresh export can reach the server without a deploy: the owner sends the file to the bot
    in Telegram, or runs `deploy.py data`. It lands in runtime/data/ (the "overlay"); whichever
    copy is newer, the overlay or the one in data/, is used.
    """

    def __init__(self, name: str, path: Path, columns: list[str] | None = None,
                 sheet: str | None = None, max_age_hours: float | None = None, check: dict | None = None):
        self.name = name
        self.release_path = path
        self.overlay: Path | None = None
        self.columns = columns
        self.sheet = sheet
        self.max_age_hours = max_age_hours
        self.check = check

    @property
    def path(self) -> Path:
        """The newer of the overlay copy (runtime/data/) and the deployed copy (data/)."""
        if self.overlay is not None and self.overlay.exists():
            try:
                if not self.release_path.exists() or self.overlay.stat().st_mtime >= self.release_path.stat().st_mtime:
                    return self.overlay
            except OSError:
                pass
        return self.release_path

    def version(self):
        try:
            return self.path.stat().st_mtime
        except OSError:
            return None

    def stale_problem(self, now: datetime | None = None) -> str | None:
        """Checked on every question (one file stat), not cached: an export that just went
        past max_age_hours is flagged at once, not up to an hour later."""
        if not self.max_age_hours:
            return None
        try:
            mtime = self.path.stat().st_mtime
        except OSError:
            return None  # a missing file is already a problem of its own
        age_h = ((now or datetime.now()).timestamp() - mtime) / 3600
        if age_h > self.max_age_hours:
            return f"{self.name}: fayl {age_h:.0f} soatdan beri yangilanmagan (chegara {self.max_age_hours:g} soat)"
        return None

    def load(self) -> Table:
        suffix = self.path.suffix.lower()
        origin = self.path.name
        if not self.path.exists():
            return Table(name=self.name, origin=origin, loaded_at=datetime.now(),
                         problem=f"{self.name}: fayl topilmadi ({self.path.name})")
        if suffix in (".md", ".txt"):
            text = decode_bytes(self.path.read_bytes()).strip()
            table = Table(name=self.name, text=text, origin=origin, loaded_at=datetime.now())
            if not text:
                table.problem = f"{self.name}: hujjat bo‘sh"
        elif suffix == ".csv":
            matrix = parse_csv_text(decode_bytes(self.path.read_bytes()))
            table = table_from_matrix(self.name, matrix, origin).keep_columns(self.columns)
        elif suffix in (".xlsx", ".xlsm"):
            table = table_from_matrix(self.name, self._read_xlsx(), origin).keep_columns(self.columns)
        elif suffix == ".xls":
            return Table(name=self.name, origin=origin, loaded_at=datetime.now(),
                         problem=f"{self.name}: eski .xls format. Faylni .xlsx yoki .csv qilib saqlang")
        else:
            return Table(name=self.name, origin=origin, loaded_at=datetime.now(),
                         problem=f"{self.name}: {suffix} fayl turi qo‘llanmaydi (csv, xlsx, md, txt)")
        check_prices(table, self.check)
        # "yangilangan" in the data block = when the export file was written, not when the bot read it.
        table.loaded_at = datetime.fromtimestamp(self.path.stat().st_mtime)
        return table

    def _read_xlsx(self) -> list[list]:
        from openpyxl import load_workbook

        wb = load_workbook(self.path, read_only=True, data_only=True)
        try:
            ws = wb[self.sheet] if self.sheet else wb.worksheets[0]
            return [list(row) for row in ws.iter_rows(values_only=True)]
        finally:
            wb.close()


def sheet_csv_url(url: str) -> str:
    """Turn a normal Google Sheets link into its CSV export link."""
    if "output=csv" in url or "format=csv" in url:
        return url
    m = re.search(r"/spreadsheets/d/([a-zA-Z0-9_-]+)", url)
    if not m:
        raise ValueError("Google Sheet havolasi tanilmadi")
    gid = re.search(r"[#&?]gid=(\d+)", url)
    return (f"https://docs.google.com/spreadsheets/d/{m.group(1)}/export?format=csv"
            + (f"&gid={gid.group(1)}" if gid else ""))


class GoogleSheetSource:
    """A Google Sheet shared as "Anyone with the link: Viewer", read as CSV.

    Privacy: anyone who has that link can read the sheet. Use it for price lists
    and stock, not for customer personal data (for that, add a service-account source).
    """

    def __init__(self, name: str, url: str, columns: list[str] | None = None,
                 refresh_minutes: float = 10, client: httpx.Client | None = None, check: dict | None = None):
        self.name = name
        self.url = sheet_csv_url(url)
        self.columns = columns
        self.check = check
        self.refresh_minutes = refresh_minutes
        self._client = client

    def version(self):
        # Re-read every `refresh_minutes`.
        return int(datetime.now().timestamp() // (self.refresh_minutes * 60))

    def load(self) -> Table:
        client = self._client or httpx.Client(timeout=20.0, follow_redirects=True)
        resp = client.get(self.url, follow_redirects=True)
        if resp.status_code != 200 or "text/html" in resp.headers.get("content-type", ""):
            raise RuntimeError(
                f"Google Sheet o‘qilmadi (HTTP {resp.status_code}). "
                "Jadval «Anyone with the link: Viewer» qilib ulashilganini tekshiring"
            )
        matrix = parse_csv_text(decode_bytes(resp.content))
        table = table_from_matrix(self.name, matrix, "Google Sheet").keep_columns(self.columns)
        return check_prices(table, self.check)


def _file_source(spec: dict, app_dir: Path) -> FileSource:
    path = Path(spec["path"])
    return FileSource(
        name=spec["name"],
        path=path if path.is_absolute() else app_dir / path,
        columns=spec.get("columns"),
        sheet=spec.get("sheet"),
        max_age_hours=spec.get("max_age_hours"),
        check=spec.get("check"),
    )


def _sheet_source(spec: dict, app_dir: Path) -> GoogleSheetSource:
    return GoogleSheetSource(
        name=spec["name"], url=spec["url"], columns=spec.get("columns"),
        refresh_minutes=spec.get("refresh_minutes", 10), check=spec.get("check"),
    )


SOURCE_TYPES: dict[str, Callable[[dict, Path], Source]] = {
    "file": _file_source,
    "google_sheet": _sheet_source,
}


def load_sources(app_dir: Path, runtime_dir: Path | None = None) -> list[Source]:
    path = app_dir / "agent" / "sources.toml"
    if not path.exists():
        return []
    spec = tomllib.loads(path.read_text(encoding="utf-8"))
    out = []
    for item in spec.get("source", []):
        kind = item.get("type", "file")
        if kind not in SOURCE_TYPES:
            raise ValueError(f"sources.toml: unknown type '{kind}' (known: {', '.join(SOURCE_TYPES)})")
        if "name" not in item:
            raise ValueError("sources.toml: every [[source]] needs a name")
        src = SOURCE_TYPES[kind](item, app_dir)
        if runtime_dir is not None and isinstance(src, FileSource):
            src.overlay = runtime_dir / "data" / src.release_path.name
        out.append(src)
    return out


def file_sources(sources: list[Source]) -> dict[str, FileSource]:
    """File name -> source, for files the owner may replace (Telegram upload, deploy.py data)."""
    return {s.release_path.name: s for s in sources if isinstance(s, FileSource)}


# ------------------------------------------------------------------ the store


class DataStore:
    """Holds the latest good copy of every source and builds the data block for the prompt."""

    def __init__(self, sources: list[Source], max_chars: int = 12000):
        self.sources = sources
        self.max_chars = max_chars
        self._tables: dict[str, Table] = {}
        self._versions: dict[str, object] = {}

    def refresh(self) -> list[Table]:
        for src in self.sources:
            version = getattr(src, "version", lambda: None)()
            if src.name in self._tables and version is not None and version == self._versions.get(src.name):
                continue
            try:
                table = src.load()
            except Exception as exc:  # keep the last good copy, but say so
                log.warning("source %s failed: %s", src.name, exc)
                self._versions[src.name] = version  # do not retry on every question
                old = self._tables.get(src.name)
                if old is not None:
                    old.problem = f"{src.name}: yangilab bo‘lmadi, eski nusxa ishlatilyapti ({exc})"
                else:
                    self._tables[src.name] = Table(name=src.name, loaded_at=datetime.now(),
                                                   problem=f"{src.name}: o‘qib bo‘lmadi ({exc})")
                continue
            self._tables[src.name] = table
            self._versions[src.name] = version
        for src in self.sources:  # freshness is re-checked every time, never cached
            table = self._tables.get(src.name)
            if table is not None and hasattr(src, "stale_problem"):
                table.stale = src.stale_problem()
        return [self._tables[s.name] for s in self.sources if s.name in self._tables]

    def problems(self) -> list[str]:
        out = []
        for t in self.refresh():
            out += [p for p in (t.problem, t.stale) if p] + t.warnings
        return out

    def context_for(self, question: str) -> tuple[str, list[str]]:
        """The data block for one question: everything if it fits, else the most relevant rows."""
        tables = self.refresh()
        if not tables:
            return "", []
        full = {t.name: t.full_text() for t in tables}
        total = sum(len(v) for v in full.values()) or 1
        q = _stems(question)
        blocks, used = [], []
        for t in tables:
            body = full[t.name]
            note = ""
            if total > self.max_chars:
                budget = max(300, int(self.max_chars * len(body) / total))
                body, note = _select(t, q, budget)
            stamp = t.loaded_at.strftime("%Y-%m-%d %H:%M") if t.loaded_at else "?"
            size = "hujjat" if t.is_document else f"{len(t.rows)} qator"
            header = f'<malumot nomi="{t.name}" manba="{t.origin}" yangilangan="{stamp}" hajmi="{size}">'
            for p in (t.problem, t.stale):
                if p:
                    header += f"\nDIQQAT: {p}"
            blocks.append(f"{header}\n{body}{note}\n</malumot>")
            used.append(t.name)
        return "\n\n".join(blocks), used


def _select(t: Table, q: set[str], budget: int) -> tuple[str, str]:
    if t.is_document:
        parts = [p for p in re.split(r"\n\s*\n", t.text) if p.strip()]
        ranked = sorted(parts, key=lambda p: -len(q & _stems(p)))
        out, size = [], 0
        for p in ranked:
            if size + len(p) > budget and out:
                break
            out.append(p)
            size += len(p)
        return "\n\n".join(p for p in parts if p in out), "\n(hujjatning savolga yaqin qismlari ko‘rsatildi)"
    scored = sorted(t.rows, key=lambda r: -len(q & _stems(t.row_line(r))))
    lines = [" | ".join(t.columns)]
    size = len(lines[0])
    shown = 0
    for r in scored:
        line = t.row_line(r)
        if size + len(line) > budget and shown:
            break
        lines.append(line)
        size += len(line) + 1
        shown += 1
    return "\n".join(lines), f"\n({len(t.rows)} qatordan savolga yaqin {shown} tasi ko‘rsatildi)"


# ------------------------------------------------------------------ extra adapters (optional)


def _load_adapters() -> None:
    """If a pilot/adapters package exists (e.g. from the course's integrations cookbook),
    let it add its source types. A missing package is fine; a broken one raises loudly."""
    try:
        from pilot.adapters import register as _register_adapters
    except ModuleNotFoundError as exc:
        if exc.name not in ("pilot.adapters", "pilot"):
            raise
        return
    _register_adapters(SOURCE_TYPES)


_load_adapters()
