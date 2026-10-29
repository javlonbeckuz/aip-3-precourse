"""Audit 2026-10-19 (motion #2): every :hover rule only applies where a real pointer hovers. Touch browsers keep :hover after a tap, so the
card would stay highlighted. Rewrites a stylesheet in place: a rule with hover selectors is split into the plain part and a
@media (hover:hover) and (pointer:fine){...} part right behind it (cascade order is kept). Comments are dropped."""
import re

HOVER = '@media (hover:hover) and (pointer:fine)'

def _blocks(css):
    """yield (prelude, body) pairs of top-level blocks; body is the text between the matching braces"""
    i, n, out = 0, len(css), []
    while i < n:
        j = css.find('{', i)
        if j < 0:
            out.append((css[i:].strip(), None)); break
        d, k = 1, j + 1
        while d and k < n:
            c = css[k]
            if c == '{': d += 1
            elif c == '}': d -= 1
            k += 1
        out.append((css[i:j].strip(), css[j + 1:k - 1])); i = k
    return out

def _split_sel(sel):
    parts, d, cur = [], 0, ''
    for c in sel:
        if c in '([': d += 1
        elif c in ')]': d -= 1
        if c == ',' and d == 0: parts.append(cur.strip()); cur = ''
        else: cur += c
    parts.append(cur.strip()); return parts

def hoverize(css, inside=False):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out = []
    for pre, body in _blocks(css):
        if body is None:
            if pre: out.append(pre)
            continue
        if pre.startswith('@'):
            if re.match(r'@(media|supports|container|layer)\b', pre): out.append(pre + '{' + hoverize(body, inside or 'hover:hover' in pre) + '}')
            else: out.append(pre + '{' + body + '}')
            continue
        sels = _split_sel(pre)
        hov = [s for s in sels if ':hover' in s]
        if not hov or inside: out.append(pre + '{' + body + '}'); continue
        plain = [s for s in sels if ':hover' not in s]
        if plain: out.append(','.join(plain) + '{' + body + '}')
        out.append(HOVER + '{' + ','.join(hov) + '{' + body + '}}')
    return '\n'.join(out)
