#!/usr/bin/env python3
"""PuanRobotu: lgs-site -> yeni hub yapısına migrasyon."""
import os, re, shutil

SRC = os.path.expanduser("~/workspace/lgs-site")
DST = os.path.expanduser("~/workspace/puanrobotu")
os.makedirs(DST, exist_ok=True)

YENI_HEADER = """<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="PuanRobotu ana sayfa">
      <img src="/assets/img/logo.svg" alt="PuanRobotu logo" width="36" height="36">
      <span>PuanRobotu</span>
    </a>
    <button id="menu-dugme" aria-label="Menüyü aç" aria-expanded="false">☰</button>
    <nav aria-label="Ana gezinme" class="site-nav" id="site-nav">
      <a href="/lgs/" aria-current="page">Ortaokul</a>
      <a href="/yks/">Üniversite Giriş</a>
      <a href="/universite-not/">Üniversite Notları</a>
      <a href="/lisansustu/">Lisansüstü</a>
      <a href="/kamu-sinavlari/">Kamu Sınavları</a>
    </nav>
  </div>
</header>"""

YENI_FOOTER = """<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <h3>PuanRobotu</h3>
      <ul>
        <li><a href="/">Ana Sayfa</a></li>
        <li><a href="/lgs/">Ortaokul</a></li>
        <li><a href="/yks/">Üniversite Giriş</a></li>
        <li><a href="/universite-not/">Üniversite Notları</a></li>
        <li><a href="/lisansustu/">Lisansüstü</a></li>
        <li><a href="/kamu-sinavlari/">Kamu Sınavları</a></li>
      </ul>
    </div>
    <div>
      <h3>Ortaokul Araçları</h3>
      <ul>
        <li><a href="/lgs/puan-hesaplama/">LGS Puan Hesaplama</a></li>
        <li><a href="/lgs/tercih-robotu/">LGS Tercih Robotu</a></li>
        <li><a href="/lgs/taban-puanlari/">LGS Taban Puanları</a></li>
        <li><a href="/lgs/bursluluk-puan-hesaplama/">Bursluluk Puan Hesaplama</a></li>
        <li><a href="/lgs/takdir-tesekkur-hesaplama/">Takdir–Teşekkür Hesaplama</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-alt">
    <div class="wrap">© 2026 PuanRobotu — Tüm hesaplamalar bilgilendirme amaçlı tahmindir.</div>
  </div>
</footer>"""

def header_footer_degistir(html):
    html = re.sub(r'<header class="site-header">.*?</header>', YENI_HEADER, html, flags=re.S)
    html = re.sub(r'<footer class="site-footer">.*?</footer>', YENI_FOOTER, html, flags=re.S)
    return html

def asset_yollari(html, derinlik):
    # derinlik: eski göreli yol derinliği ("", "../")
    html = html.replace(f'href="{derinlik}styles.css"', 'href="/assets/css/style.css"')
    html = html.replace(f'href="{derinlik}assets/logo.svg"', 'href="/assets/img/logo.svg"')
    html = html.replace(f'src="{derinlik}assets/logo.svg"', 'src="/assets/img/logo.svg"')
    html = html.replace(f'src="{derinlik}assets/formul.svg"', 'src="/assets/img/formul.svg"')
    return html

def scriptler(html, sayfa_js, arac_id):
    # eski sayfa scriptini yenisiyle değiştir, registry + site.js ekle
    html = re.sub(r'<script src="[^"]*(?:script|robotu|sehir)\.js"></script>',
                  f'<script src="/assets/js/tools.js"></script>\n<script src="/assets/js/site.js"></script>\n<script src="/assets/js/{sayfa_js}"></script>',
                  html)
    return html

def kirinti_ekle(html, kirinti_html):
    return html.replace("<main>", "<main>\n  " + kirinti_html, 1)

def ilgili_ekle(html, arac_id):
    return html.replace("</main>",
        f'  <section id="ilgili-araclar" data-arac="{arac_id}" aria-label="İlgili hesaplayıcılar"></section>\n</main>', 1)

# ---------- 1. JS dosyaları ----------
shutil.copy(f"{SRC}/script.js", f"{DST}/assets/js/lgs-puan.js")
shutil.copy(f"{SRC}/robotu.js", f"{DST}/assets/js/lgs-tercih.js")
shutil.copy(f"{SRC}/sehir.js", f"{DST}/assets/js/lgs-sehir.js")
shutil.copy(f"{SRC}/assets/formul.svg", f"{DST}/assets/img/formul.svg")
# robotu.js veri yolunu mutlak yap
p = f"{DST}/assets/js/lgs-tercih.js"
s = open(p).read().replace("'data/' + slug", "'/lgs/data/' + slug")
open(p, "w").write(s)
# data klasörü
shutil.copytree(f"{SRC}/data", f"{DST}/lgs/data", dirs_exist_ok=True)

# ---------- 2. Amiral sayfa ----------
os.makedirs(f"{DST}/lgs/puan-hesaplama", exist_ok=True)
html = open(f"{SRC}/index.html").read()
html = asset_yollari(html, "")
html = html.replace("https://puanrobotu.com/lgs-puan-hesaplama/", "https://puanrobotu.com/lgs/puan-hesaplama/")
html = header_footer_degistir(html)
html = scriptler(html, "lgs-puan.js", "lgs-puan")
html = kirinti_ekle(html, '<div class="wrap"><p class="kirinti"><a href="/">Ana Sayfa</a> › <a href="/lgs/">Ortaokul</a> › LGS Puan Hesaplama</p></div>')
# hero'dan sonrasını iki sütuna al
html = html.replace('  <section id="arac" class="tool-section" aria-labelledby="arac-baslik">',
    '  <div class="wrap sayfa-iki-sutun">\n  <article>\n  <section id="arac" class="tool-section" aria-labelledby="arac-baslik">', 1)
# "Sonraki Adımlar" bölümündeki eski linkleri güncelle
html = html.replace('href="tercih-robotu.html"', 'href="/lgs/tercih-robotu/"')
html = html.replace('href="taban-puanlari/"', 'href="/lgs/taban-puanlari/"')
html = ilgili_ekle(html, "lgs-puan")
# article/aside kapat: ilgili_ekle'den önce article'ı kapatıp aside ekle
html = html.replace('  <section id="ilgili-araclar" data-arac="lgs-puan"',
    '  </article>\n  <aside class="kenarcubugu" id="kenar-cubugu" data-arac="lgs-puan" aria-label="Aynı kategorideki araçlar"></aside>\n  </div>\n  <section id="ilgili-araclar" data-arac="lgs-puan"', 1)
open(f"{DST}/lgs/puan-hesaplama/index.html", "w").write(html)

# ---------- 3. Tercih robotu ----------
os.makedirs(f"{DST}/lgs/tercih-robotu", exist_ok=True)
html = open(f"{SRC}/tercih-robotu.html").read()
html = asset_yollari(html, "")
html = html.replace("https://puanrobotu.com/lgs-tercih-robotu.html", "https://puanrobotu.com/lgs/tercih-robotu/")
html = header_footer_degistir(html)
html = scriptler(html, "lgs-tercih.js", "lgs-tercih")
html = kirinti_ekle(html, '<div class="wrap"><p class="kirinti"><a href="/">Ana Sayfa</a> › <a href="/lgs/">Ortaokul</a> › LGS Tercih Robotu</p></div>')
html = html.replace('  <section class="tool-section" aria-labelledby="robot-baslik">',
    '  <div class="wrap sayfa-iki-sutun">\n  <article>\n  <section class="tool-section" aria-labelledby="robot-baslik">', 1)
html = ilgili_ekle(html, "lgs-tercih")
html = html.replace('  <section id="ilgili-araclar" data-arac="lgs-tercih"',
    '  </article>\n  <aside class="kenarcubugu" id="kenar-cubugu" data-arac="lgs-tercih" aria-label="Aynı kategorideki araçlar"></aside>\n  </div>\n  <section id="ilgili-araclar" data-arac="lgs-tercih"', 1)
open(f"{DST}/lgs/tercih-robotu/index.html", "w").write(html)

# ---------- 4. Taban puanları hub + 81 il ----------
os.makedirs(f"{DST}/lgs/taban-puanlari", exist_ok=True)
for fname in os.listdir(f"{SRC}/taban-puanlari"):
    if not fname.endswith(".html"):
        continue
    html = open(f"{SRC}/taban-puanlari/{fname}").read()
    html = asset_yollari(html, "../")
    html = re.sub(r'<script src="\.\./sehir\.js"></script>',
                  '<script src="/assets/js/tools.js"></script>\n<script src="/assets/js/site.js"></script>\n<script src="/assets/js/lgs-sehir.js"></script>', html)
    # canonical: /taban-puanlari/X.html -> /lgs/taban-puanlari/X/
    slug = fname[:-5]
    html = html.replace(f"https://puanrobotu.com/taban-puanlari/{fname}",
                        f"https://puanrobotu.com/lgs/taban-puanlari/{slug}/")
    html = header_footer_degistir(html)
    html = kirinti_ekle(html, '<div class="wrap"><p class="kirinti"><a href="/">Ana Sayfa</a> › <a href="/lgs/">Ortaokul</a> › <a href="/lgs/taban-puanlari/">Taban Puanları</a></p></div>')
    html = ilgili_ekle(html, "lgs-taban")
    # şehir içi linkler: istanbul.html -> istanbul/
    html = re.sub(r'href="\./([a-z-]+)\.html"', r'href="/lgs/taban-puanlari/\1/"', html)
    open(f"{DST}/lgs/taban-puanlari/{fname}", "w").write(html)

print("Migrasyon tamam.")
print("Dosya sayısı:", sum(len(f) for _, _, f in os.walk(DST)))
