#!/usr/bin/env python3
"""Generate branded SVG diagrams (Turkish labels) for PuanRobotu pages."""
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'img', 'diyagram')
os.makedirs(OUT, exist_ok=True)

NAVY = '#16294d'
NAVY_D = '#0e1b36'
AMBER = '#e8930c'
AMBER_D = '#c97a06'
INK = '#1c2740'
MUTED = '#5a6b8c'
LINE = '#dfe6f2'
BG = '#f4f7fc'
GREEN = '#1e9e6a'
WHITE = '#ffffff'
FONT = "font-family='Segoe UI, system-ui, -apple-system, sans-serif'"

def wrap(inner, w=800, h=450, bg=WHITE, radius=16):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img">
<rect width="{w}" height="{h}" rx="{radius}" fill="{bg}"/>
{inner}
</svg>"""

def title(x, y, text, size=26, color=NAVY, anchor='middle', weight=800):
    return f"<text x='{x}' y='{y}' text-anchor='{anchor}' {FONT} font-size='{size}' font-weight='{weight}' fill='{color}'>{text}</text>"

def formula_card(name, top_label, formula_parts, bottom_note):
    """formula_parts: list of (text, color, size) centered horizontally"""
    inner = title(400, 70, top_label, 24)
    # formula box
    inner += f"<rect x='90' y='110' width='620' height='150' rx='14' fill='{BG}' stroke='{LINE}' stroke-width='2'/>"
    x = 400 - sum(len(p[0]) * p[2] * 0.32 for p in formula_parts) / 2
    for text, color, size in formula_parts:
        w = len(text) * size * 0.32
        inner += f"<text x='{x + w/2}' y='205' text-anchor='middle' {FONT} font-size='{size}' font-weight='800' fill='{color}'>{text}</text>"
        x += w
    inner += f"<text x='400' y='310' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>{bottom_note}</text>"
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(wrap(inner))

def scale(name, top_label, lo, hi, zones, note):
    """zones: list of (label, color) spread across scale"""
    inner = title(400, 70, top_label, 24)
    x0, x1, y = 90, 710, 200
    inner += f"<rect x='{x0}' y='{y-14}' width='{x1-x0}' height='28' rx='14' fill='{BG}' stroke='{LINE}' stroke-width='2'/>"
    n = len(zones)
    for i, (lab, col) in enumerate(zones):
        xa = x0 + (x1 - x0) * i / n
        xb = x0 + (x1 - x0) * (i + 1) / n
        inner += f"<rect x='{xa+2}' y='{y-12}' width='{xb-xa-4}' height='24' rx='12' fill='{col}' opacity='0.85'/>"
        inner += f"<text x='{(xa+xb)/2}' y='{y+48}' text-anchor='middle' {FONT} font-size='16' font-weight='700' fill='{INK}'>{lab}</text>"
    inner += f"<text x='{x0}' y='{y-32}' text-anchor='middle' {FONT} font-size='18' font-weight='700' fill='{MUTED}'>{lo}</text>"
    inner += f"<text x='{x1}' y='{y-32}' text-anchor='middle' {FONT} font-size='18' font-weight='700' fill='{MUTED}'>{hi}</text>"
    inner += f"<text x='400' y='330' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>{note}</text>"
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(wrap(inner))

def steps(name, top_label, steps_list, note):
    inner = title(400, 70, top_label, 24)
    n = len(steps_list)
    cw = 640 / n
    for i, (num, lab) in enumerate(steps_list):
        cx = 80 + cw * i + cw / 2
        inner += f"<circle cx='{cx}' cy='170' r='34' fill='{NAVY}'/>"
        inner += f"<text x='{cx}' y='182' text-anchor='middle' {FONT} font-size='30' font-weight='800' fill='{WHITE}'>{num}</text>"
        # wrap label into 2 lines if long
        words = lab.split()
        if len(lab) > 16:
            mid = len(words) // 2
            l1, l2 = ' '.join(words[:mid]), ' '.join(words[mid:])
            inner += f"<text x='{cx}' y='240' text-anchor='middle' {FONT} font-size='16' font-weight='700' fill='{INK}'>{l1}</text>"
            inner += f"<text x='{cx}' y='264' text-anchor='middle' {FONT} font-size='16' font-weight='700' fill='{INK}'>{l2}</text>"
        else:
            inner += f"<text x='{cx}' y='248' text-anchor='middle' {FONT} font-size='16' font-weight='700' fill='{INK}'>{lab}</text>"
        if i < n - 1:
            ax = 80 + cw * (i + 1)
            inner += f"<text x='{ax}' y='182' text-anchor='middle' {FONT} font-size='28' font-weight='800' fill='{AMBER}'>→</text>"
    inner += f"<text x='400' y='350' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>{note}</text>"
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(wrap(inner))

def bars(name, top_label, items, note):
    """items: list of (label, pct 0-100, color)"""
    inner = title(400, 60, top_label, 24)
    y = 110
    for lab, pct, col in items:
        inner += f"<text x='90' y='{y+22}' {FONT} font-size='17' font-weight='700' fill='{INK}'>{lab}</text>"
        inner += f"<rect x='280' y='{y}' width='340' height='30' rx='15' fill='{BG}' stroke='{LINE}' stroke-width='1.5'/>"
        inner += f"<rect x='280' y='{y}' width='{340*pct/100:.0f}' height='30' rx='15' fill='{col}'/>"
        inner += f"<text x='640' y='{y+22}' {FONT} font-size='17' font-weight='800' fill='{NAVY}'>%{pct:g}</text>"
        y += 58
    inner += f"<text x='400' y='{y+30}' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>{note}</text>"
    h = y + 80
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(wrap(inner, h=h))

def bell(name, top_label, note):
    inner = title(400, 60, top_label, 24)
    # bell curve path
    pts = []
    import math
    for px in range(100, 701, 10):
        x = (px - 400) / 130
        py = 300 - 190 * math.exp(-x * x / 2)
        pts.append(f"{px},{py:.0f}")
    inner += f"<polyline points='{' '.join(pts)}' fill='none' stroke='{NAVY}' stroke-width='4'/>"
    inner += f"<line x1='100' y1='300' x2='700' y2='300' stroke='{LINE}' stroke-width='2'/>"
    for lab, px, col in [('FF', 170, '#d64545'), ('CC', 300, AMBER), ('BB', 400, NAVY), ('BA', 500, '#1e9e6a'), ('AA', 630, '#1e9e6a')]:
        inner += f"<text x='{px}' y='335' text-anchor='middle' {FONT} font-size='17' font-weight='800' fill='{col}'>{lab}</text>"
    inner += f"<text x='400' y='390' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>{note}</text>"
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(wrap(inner))

# ---- Generate ----
formula_card('net-lgs.svg', 'LGS Net Formülü',
             [('Net', NAVY, 44), (' = ', MUTED, 40), ('Doğru', GREEN, 40), (' − ', MUTED, 40),
              ('Yanlış', '#d64545', 40), (' ÷ 3', NAVY, 44)],
             '3 yanlış, 1 doğruyu götürür · Her ders için ayrı hesaplanır')
formula_card('net-osym.svg', 'ÖSYM Net Formülü (YKS · KPSS · ALES · DGS)',
             [('Net', NAVY, 44), (' = ', MUTED, 40), ('Doğru', GREEN, 40), (' − ', MUTED, 40),
              ('Yanlış', '#d64545', 40), (' ÷ 4', NAVY, 44)],
             '4 yanlış, 1 doğruyu götürür · Boş sorular neti etkilemez')
formula_card('puan-yds.svg', 'YDS / YÖKDİL Puan Formülü',
             [('Puan', NAVY, 44), (' = ', MUTED, 40), ('Doğru Sayısı', GREEN, 40), (' × 1,25', NAVY, 44)],
             'Yanlış doğruyu götürmez · 80 doğru = 100 puan')
formula_card('obp.svg', 'OBP Formülü',
             [('OBP', NAVY, 44), (' = ', MUTED, 40), ('Diploma Notu', GREEN, 40), (' × 5', NAVY, 44)],
             'Katkı = OBP × 0,12 · Kırık OBP × 0,06')
formula_card('gano.svg', 'GANO Formülü',
             [('GANO', NAVY, 40), (' = ', MUTED, 36),
              ('Σ (Harf Katsayısı × Kredi)', GREEN, 34), (' ÷ ', MUTED, 36), ('Σ Kredi', NAVY, 36)],
             'Kredisi yüksek ders ortalamayı daha çok etkiler')
formula_card('vize-final.svg', 'Ders Geçme Notu',
             [('Ortalama', NAVY, 40), (' = ', MUTED, 36), ('Vize × %40', AMBER_D, 36),
              (' + ', MUTED, 36), ('Final × %60', GREEN, 36)],
             'Çoğu üniversitede finalden en az 50 şartı aranır')

scale('olcek-500.svg', 'LGS / YKS Puan Ölçeği', '100', '500',
      [('Düşük', '#d64545'), ('Orta', AMBER), ('İyi', '#1e9e6a'), ('Çok İyi', NAVY)],
      'Puanın bu ölçekte nerede olduğunu sonuç tablosunda gör')
scale('olcek-100.svg', 'KPSS Puan Ölçeği', '0', '100',
      [('60 altı', '#d64545'), ('60–70', AMBER), ('70–80', '#1e9e6a'), ('80+', NAVY)],
      'Atamalarda taban puanlar genellikle 70–85 bandındadır')
scale('olcek-not.svg', 'Harf Notu Ölçeği', '0', '100',
      [('FF', '#d64545'), ('CC', AMBER), ('BB', NAVY), ('AA', '#1e9e6a')],
      'Harf notu, ortalaman ve çan eğrisiyle belirlenir')

steps('adimlar-lgs.svg', 'LGS Puanı 4 Adımda Hesaplanır',
      [('1', 'Netleri Bul'), ('2', 'Ağırlıklı Topla'), ('3', 'Standart Puana Çevir'), ('4', '100–500 Ölçeği')],
      'İlk 2 adımı sen yaparsın; MEB sınav sonrası ölçekler')
steps('adimlar-osym.svg', 'ÖSYM Puanı Nasıl Oluşur?',
      [('1', 'Netleri Bul'), ('2', 'Standart Puan'), ('3', 'Ağırlıklar'), ('4', '100’lük Ölçek')],
      'Son 3 adımı ÖSYM sınav sonrası uygular')
steps('adimlar-tercih.svg', 'Tercih Listesi 3 Katmanda Kurulur',
      [('1', 'Hayal Okullar'), ('2', 'Hedef Okullar'), ('3', 'Garanti Okullar')],
      'Listeni taban puan + yüzdelik dilime göre dengeli kur')

bars('agirlik-lgs.svg', 'LGS Ders Katsayıları',
     [('Türkçe', 100, NAVY), ('Matematik', 100, NAVY), ('Fen Bilimleri', 100, NAVY),
      ('İnkılap Tarihi', 25, AMBER), ('Din Kültürü', 25, AMBER), ('İngilizce', 25, AMBER)],
     'Katsayısı 4 olan derste 1 net = katsayısı 1 olan derste 4 net')
bars('agirlik-kpss.svg', 'KPSS Puan Türü Ağırlıkları',
     [('P1: GY %70', 70, NAVY), ('P1: GK %30', 30, AMBER),
      ('P2: GY %60', 60, NAVY), ('P2: GK %40', 40, AMBER),
      ('P3: GY %50', 50, NAVY), ('P3: GK %50', 50, AMBER)],
     'Hangi kadro hangi puan türünü istiyor? İlanda yazar')
bars('agirlik-ales.svg', 'ALES Puan Türü Ağırlıkları',
     [('SAY: Sayısal %75', 75, NAVY), ('SAY: Sözel %25', 25, AMBER),
      ('SÖZ: Sözel %75', 75, NAVY), ('SÖZ: Sayısal %25', 25, AMBER),
      ('EA: %50 – %50', 50, GREEN)],
     'Hedefine göre ağırlığı yüksek bölüme odaklan')

bell('can-egrisi.svg', 'Çan Eğrisi Nasıl Çalışır?',
     'Notun, sınıf ortalamasına göre harfe dönüşür')

# taban puanı explainer for city pages
inner = title(400, 60, 'Taban Puanı Nedir?', 24)
inner += f"<rect x='90' y='100' width='620' height='110' rx='14' fill='{BG}' stroke='{LINE}' stroke-width='2'/>"
inner += f"<text x='400' y='150' text-anchor='middle' {FONT} font-size='20' font-weight='700' fill='{INK}'>En son yerleşen öğrencinin puanı</text>"
inner += f"<text x='400' y='185' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>= o okulun taban puanı</text>"
inner += f"<text x='400' y='270' text-anchor='middle' {FONT} font-size='18' fill='{INK}'>Puanın tabanın <tspan font-weight='800' fill='{GREEN}'>üstündeyse</tspan> şansın yüksek;</text>"
inner += f"<text x='400' y='305' text-anchor='middle' {FONT} font-size='18' fill='{INK}'><tspan font-weight='800' fill='#d64545'>altındaysa</tspan> riskli tercihtir.</text>"
inner += f"<text x='400' y='380' text-anchor='middle' {FONT} font-size='17' fill='{MUTED}'>Yüzdelik dilimle birlikte değerlendir</text>"
open(os.path.join(OUT, 'taban-nedir.svg'), 'w', encoding='utf-8').write(wrap(inner))

print("generated:", len(os.listdir(OUT)), "diagrams in", OUT)
