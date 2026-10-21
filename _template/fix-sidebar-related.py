#!/usr/bin/env python3
"""Fix: Ehliyet sidebar standardisation + guide sidebar/related insertion.
Run once (2026-10-21 audit). Idempotent-ish: skips files already containing id="kenar-cubugu".
"""
import re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

GUIDES = {
    # slug: (category for sidebar, tool id for related section)
    'kpss-basvuru-nasil-yapilir':   ('kamu', 'kpss'),
    'kpss-nasil-calisilir':         ('kamu', 'kpss'),
    'lgs-basvuru-nasil-yapilir':    ('lgs', 'lgs-puan'),
    'lgs-nasil-calisilir':          ('lgs', 'lgs-puan'),
    'net-nedir':                    ('lgs', 'lgs-puan'),
    'obp-nedir':                    ('yks', 'yks-obp'),
    'standart-puan-nedir':          ('yks', 'yks-puan'),
    'taban-puani-nedir':            ('lgs', 'lgs-puan'),
    'tercih-listesi-nasil-hazirlanir': ('lgs', 'lgs-tercih'),
    'yks-basvuru-nasil-yapilir':    ('yks', 'yks-puan'),
    'yks-nasil-calisilir':          ('yks', 'yks-puan'),
    'yuzdelik-dilim-nedir':         ('lgs', 'lgs-puan'),
}

def aside_html(cat):
    return (f'<aside class="kenarcubugu" id="kenar-cubugu" data-kategori="{cat}" '
            f'aria-label="İlgili hesaplayıcılar"></aside>')

def related_html(tool):
    return (f'<section id="ilgili-araclar" data-arac="{tool}" '
            f'aria-label="İlgili hesaplayıcılar"></section>')

problems = []

# ---------- 1) Ehliyet pages ----------
for path, tid in [('ehliyet/puan-hesaplama/index.html', 'ehliyet-puan'),
                  ('ehliyet/deneme-sinavi/index.html', 'ehliyet-deneme')]:
    h = open(path, encoding='utf-8').read()
    if 'id="kenar-cubugu"' in h:
        print(f'skip (done): {path}'); continue
    new_aside = (f'<aside class="kenarcubugu" id="kenar-cubugu" data-arac="{tid}" '
                 f'aria-label="Aynı kategorideki araçlar"></aside>')
    h2, n = re.subn(r'<aside class="kenarcubugu" aria-label="Ehliyet araçları">.*?</aside>',
                    new_aside, h, flags=re.S)
    if n != 1:
        problems.append(f'{path}: aside replace count={n}'); continue
    h3, n2 = re.subn(r'(</div>\s*)</main>',
                     r'\1' + related_html(tid) + '\n</main>', h2)
    if n2 != 1:
        problems.append(f'{path}: related insert count={n2}'); continue
    open(path, 'w', encoding='utf-8').write(h3)
    print(f'ehliyet fixed: {path}')

# ---------- 2) Guides ----------
for slug, (cat, tool) in GUIDES.items():
    path = f'rehber/{slug}/index.html'
    h = open(path, encoding='utf-8').read()
    if 'id="kenar-cubugu"' in h:
        print(f'skip (done): {path}'); continue
    aside, related = aside_html(cat), related_html(tool)
    if '<section class="bolum">' in h:
        # Type A: bolum > div.wrap
        h2, n1 = re.subn(r'<section class="bolum">\s*<div class="wrap">',
                         '<div class="wrap sayfa-iki-sutun">\n  <section class="bolum">', h)
        h3, n2 = re.subn(r'</div>\s*</section>\s*</main>',
                         '</section>\n    ' + aside + '\n  </div>\n  ' + related + '\n</main>', h2)
        if n1 != 1 or n2 != 1:
            problems.append(f'{path}: typeA open={n1} close={n2}'); continue
        h = h3
    elif '<article class="content">' in h:
        # Type B: div.wrap > article.content
        h2, n1 = re.subn(r'<div class="wrap">\s*<article class="content">',
                         '<div class="wrap sayfa-iki-sutun">\n  <article class="content">', h)
        h3, n2 = re.subn(r'</article>\s*</div>\s*</main>',
                         '</article>\n    ' + aside + '\n  </div>\n  ' + related + '\n</main>', h2)
        if n1 != 1 or n2 != 1:
            problems.append(f'{path}: typeB open={n1} close={n2}'); continue
        h = h3
    else:
        problems.append(f'{path}: unknown layout'); continue
    open(path, 'w', encoding='utf-8').write(h)
    print(f'guide fixed: {path} (cat={cat}, tool={tool})')

print('\nPROBLEMS:', problems if problems else 'none')
sys.exit(1 if problems else 0)
