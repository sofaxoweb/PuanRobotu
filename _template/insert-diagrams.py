#!/usr/bin/env python3
"""Insert 2-3 contextual SVG diagrams per page with figure/figcaption + Turkish alt."""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = 'assets/img/diyagram'

# (file, alt, caption, anchor_h2_keyword)
IMGS = {
    'net-lgs':      ('net-lgs.svg', 'LGS net formülü: Net eşittir Doğru eksi Yanlış bölü 3',
                     'LGS’de net, doğru sayısından yanlışların üçte biri çıkarılarak bulunur.', 'Formül'),
    'net-osym':     ('net-osym.svg', 'ÖSYM net formülü: Net eşittir Doğru eksi Yanlış bölü 4',
                     'ÖSYM sınavlarında 4 yanlış, 1 doğruyu götürür; boş sorular neti etkilemez.', 'Formül'),
    'puan-yds':     ('puan-yds.svg', 'YDS puan formülü: Puan eşittir Doğru sayısı çarpı 1,25',
                     'YDS ve YÖKDİL’de yanlış doğruyu götürmez; 80 doğru 100 puan demektir.', 'Formül'),
    'obp':          ('obp.svg', 'OBP formülü: OBP eşittir Diploma Notu çarpı 5',
                     'OBP, diploma notunun 5 katıdır; yerleştirme puanına katkısı OBP × 0,12’dir.', 'Formül'),
    'gano':         ('gano.svg', 'GANO formülü: harf katsayısı çarpı kredi toplamı bölü toplam kredi',
                     'GANO’da kredisi yüksek dersin ağırlığı daha fazladır.', 'Formül'),
    'vize-final':   ('vize-final.svg', 'Ders geçme notu: Vize yüzde 40 artı Final yüzde 60',
                     'Dönem sonu ortalamanın %40’ı vizeden, %60’ı finalden gelir.', 'Formül'),
    'olcek-500':    ('olcek-500.svg', '100 ile 500 arası puan ölçeği: düşük, orta, iyi ve çok iyi bantları',
                     'Puanın bu ölçekte nerede olduğunu sonuç bölümündeki tabloyla karşılaştır.', 'Okumalısın'),
    'olcek-100':    ('olcek-100.svg', '0 ile 100 arası puan ölçeği ve başarı bantları',
                     'Yerleştirme ve atamalarda taban puanlar genellikle 70–85 bandındadır.', 'Okumalısın'),
    'olcek-not':    ('olcek-not.svg', 'Harf notu ölçeği: FF’den AA’ya not bantları',
                     'Harf notun, not ortalaman ve sınıfın dağılımına göre belirlenir.', 'Okumalısın'),
    'adimlar-lgs':  ('adimlar-lgs.svg', 'LGS puanının 4 adımda hesaplanışı: netler, ağırlıklı toplam, standart puan, ölçek',
                     'İlk iki adımı sen yaparsın; MEB sınav sonrası ulusal verilerle ölçekler.', 'Hesaplanır'),
    'adimlar-osym': ('adimlar-osym.svg', 'ÖSYM puanının oluşumu: netler, standart puan, ağırlıklar, 100’lük ölçek',
                     'Son üç adımı ÖSYM, sınav sonrası tüm adayların verisiyle uygular.', 'Çalışır'),
    'adimlar-tercih': ('adimlar-tercih.svg', 'Tercih listesi: hayal, hedef ve garanti okullar',
                     'Listeni taban puan ve yüzdelik dilime göre üç katmanda dengeli kur.', 'Tercih'),
    'agirlik-lgs':  ('agirlik-lgs.svg', 'LGS ders katsayıları: Türkçe, Matematik ve Fen 4 kat ağırlıkta',
                     'Katsayısı 4 olan derste 1 net, katsayısı 1 olan derste 4 nete bedeldir.', 'Hesaplanır'),
    'agirlik-kpss': ('agirlik-kpss.svg', 'KPSS P1, P2 ve P3 puan türlerinin test ağırlıkları',
                     'Hangi kadronun hangi puan türünü istediği, kurumun ilanında yazar.', 'Hesaplanır'),
    'agirlik-ales': ('agirlik-ales.svg', 'ALES SAY, SÖZ ve EA puan türlerinin bölüm ağırlıkları',
                     'Hedef puan türünde ağırlığı yüksek bölüme çalışma zamanını ayır.', 'Hesaplanır'),
    'can-egrisi':   ('can-egrisi.svg', 'Çan eğrisi: sınıf ortalamasına göre harf notu dağılımı',
                     'Notun mutlak puana değil, sınıfın ortalamasına göre harfe dönüşür.', 'Çalışır'),
    'taban-nedir':  ('taban-nedir.svg', 'Taban puanı açıklaması: en son yerleşen öğrencinin puanı',
                     'Puanın tabanın üstündeyse şansın yüksek; altındaysa riskli tercihtir.', 'Taban'),
}

# page -> [img keys]  (keys of IMGS)
PAGE_IMGS = {
    'index.html': ['net-lgs', 'olcek-500', 'adimlar-lgs'],
    'lgs/index.html': ['net-lgs', 'taban-nedir', 'olcek-500'],
    'lgs/puan-hesaplama/index.html': ['net-lgs', 'agirlik-lgs', 'adimlar-lgs'],
    'lgs/tercih-robotu/index.html': ['adimlar-tercih', 'taban-nedir', 'olcek-500'],
    'lgs/taban-puanlari/index.html': ['taban-nedir', 'olcek-500', 'adimlar-tercih'],
    'lgs/bursluluk-puan-hesaplama/index.html': ['net-lgs', 'olcek-500', 'adimlar-lgs'],
    'lgs/takdir-tesekkur-hesaplama/index.html': ['olcek-not', 'vize-final'],
    'yks/index.html': ['net-osym', 'obp', 'olcek-500'],
    'yks/puan-hesaplama/index.html': ['net-osym', 'olcek-500', 'adimlar-osym'],
    'yks/obp-hesaplama/index.html': ['obp', 'olcek-500', 'adimlar-osym'],
    'yks/msu-puan-hesaplama/index.html': ['net-osym', 'olcek-500', 'adimlar-osym'],
    'yks/tercih-robotu/index.html': ['adimlar-tercih', 'taban-nedir', 'olcek-500'],
    'universite-not/index.html': ['gano', 'vize-final', 'olcek-not'],
    'universite-not/vize-final-hesaplama/index.html': ['vize-final', 'olcek-not', 'olcek-100'],
    'universite-not/gano-hesaplama/index.html': ['gano', 'olcek-not', 'can-egrisi'],
    'universite-not/harf-notu-hesaplama/index.html': ['olcek-not', 'can-egrisi', 'gano'],
    'universite-not/can-egrisi-hesaplama/index.html': ['can-egrisi', 'olcek-not', 'gano'],
    'universite-not/aof-not-hesaplama/index.html': ['vize-final', 'olcek-not', 'olcek-100'],
    'universite-not/not-donusumu/index.html': ['olcek-not', 'olcek-100', 'gano'],
    'lisansustu/index.html': ['net-osym', 'puan-yds', 'agirlik-ales'],
    'lisansustu/ales-puan-hesaplama/index.html': ['net-osym', 'agirlik-ales', 'olcek-100'],
    'lisansustu/dgs-puan-hesaplama/index.html': ['net-osym', 'olcek-100', 'adimlar-osym'],
    'lisansustu/yds-puan-hesaplama/index.html': ['puan-yds', 'olcek-100', 'net-osym'],
    'lisansustu/yokdil-puan-hesaplama/index.html': ['puan-yds', 'olcek-100', 'net-osym'],
    'kamu-sinavlari/index.html': ['net-osym', 'agirlik-kpss', 'olcek-100'],
    'kamu-sinavlari/kpss-puan-hesaplama/index.html': ['net-osym', 'agirlik-kpss', 'olcek-100'],
    'kamu-sinavlari/oabt-puan-hesaplama/index.html': ['net-osym', 'olcek-100', 'adimlar-osym'],
    'kamu-sinavlari/tus-puan-hesaplama/index.html': ['net-osym', 'olcek-100', 'adimlar-osym'],
    'kamu-sinavlari/dus-puan-hesaplama/index.html': ['net-osym', 'olcek-100', 'adimlar-osym'],
}

def rel_prefix(page):
    depth = page.count('/')
    return '../' * depth

def insert_figure(html, page, key):
    fname, alt, cap, anchor_kw = IMGS[key]
    src = rel_prefix(page) + D + '/' + fname
    fig = (f'\n<figure class="diyagram">\n'
           f'  <img src="{src}" alt="{alt}" loading="lazy" width="800" height="450">\n'
           f'  <figcaption>{cap}</figcaption>\n</figure>\n')
    # find H2 containing anchor keyword, insert after first </p> following it
    m = re.search(r'<h2[^>]*>[^<]*' + re.escape(anchor_kw) + r'[^<]*</h2>', html)
    if not m:
        # fallback: before FAQ section
        m2 = re.search(r'<section class="sss"', html)
        if m2:
            return html[:m2.start()] + fig + html[m2.start():], True
        return html, False
    rest = html[m.end():]
    pm = re.search(r'</p>', rest)
    if pm:
        pos = m.end() + pm.end()
    else:
        pos = m.end()
    # avoid double-insert
    if fig.strip() in html:
        return html, True
    return html[:pos] + fig + html[pos:], True

def main():
    done, skipped = 0, []
    # tool + hub pages
    for page, keys in PAGE_IMGS.items():
        p = os.path.join(ROOT, page)
        html = open(p, encoding='utf-8').read()
        for k in keys:
            html, ok = insert_figure(html, page, k)
            if not ok:
                skipped.append((page, k))
        open(p, 'w', encoding='utf-8').write(html)
        done += 1
    # city pages: 2 diagrams each
    city_dir = os.path.join(ROOT, 'lgs', 'taban-puanlari')
    ncity = 0
    for fn in sorted(os.listdir(city_dir)):
        if not fn.endswith('.html') or fn == 'index.html':
            continue
        page = f'lgs/taban-puanlari/{fn}'
        p = os.path.join(ROOT, page)
        html = open(p, encoding='utf-8').read()
        for k in ['taban-nedir', 'olcek-500']:
            html, ok = insert_figure(html, page, k)
            if not ok:
                skipped.append((page, k))
        open(p, 'w', encoding='utf-8').write(html)
        ncity += 1
    print(f"pages: {done}, city pages: {ncity}, skipped: {skipped}")

if __name__ == '__main__':
    main()
