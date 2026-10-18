#!/usr/bin/env python3
"""Fix skipped diagram insertions with page-specific anchors."""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = 'assets/img/diyagram'

IMGS = {
    'net-lgs':      ('net-lgs.svg', 'LGS net formülü: Net eşittir Doğru eksi Yanlış bölü 3',
                     'LGS’de net, doğru sayısından yanlışların üçte biri çıkarılarak bulunur.'),
    'net-osym':     ('net-osym.svg', 'ÖSYM net formülü: Net eşittir Doğru eksi Yanlış bölü 4',
                     'ÖSYM sınavlarında 4 yanlış, 1 doğruyu götürür; boş sorular neti etkilemez.'),
    'puan-yds':     ('puan-yds.svg', 'YDS puan formülü: Puan eşittir Doğru sayısı çarpı 1,25',
                     'YDS ve YÖKDİL’de yanlış doğruyu götürmez; 80 doğru 100 puan demektir.'),
    'obp':          ('obp.svg', 'OBP formülü: OBP eşittir Diploma Notu çarpı 5',
                     'OBP, diploma notunun 5 katıdır; yerleştirme puanına katkısı OBP × 0,12’dir.'),
    'gano':         ('gano.svg', 'GANO formülü: harf katsayısı çarpı kredi toplamı bölü toplam kredi',
                     'GANO’da kredisi yüksek dersin ağırlığı daha fazladır.'),
    'vize-final':   ('vize-final.svg', 'Ders geçme notu: Vize yüzde 40 artı Final yüzde 60',
                     'Dönem sonu ortalamanın %40’ı vizeden, %60’ı finalden gelir.'),
    'olcek-500':    ('olcek-500.svg', '100 ile 500 arası puan ölçeği: düşük, orta, iyi ve çok iyi bantları',
                     'Puanın bu ölçekte nerede olduğunu sonuç bölümündeki tabloyla karşılaştır.'),
    'olcek-100':    ('olcek-100.svg', '0 ile 100 arası puan ölçeği ve başarı bantları',
                     'Yerleştirme ve atamalarda taban puanlar genellikle 70–85 bandındadır.'),
    'olcek-not':    ('olcek-not.svg', 'Harf notu ölçeği: FF’den AA’ya not bantları',
                     'Harf notun, not ortalaman ve sınıfın dağılımına göre belirlenir.'),
    'adimlar-lgs':  ('adimlar-lgs.svg', 'LGS puanının 4 adımda hesaplanışı: netler, ağırlıklı toplam, standart puan, ölçek',
                     'İlk iki adımı sen yaparsın; MEB sınav sonrası ulusal verilerle ölçekler.'),
    'adimlar-osym': ('adimlar-osym.svg', 'ÖSYM puanının oluşumu: netler, standart puan, ağırlıklar, 100’lük ölçek',
                     'Son üç adımı ÖSYM, sınav sonrası tüm adayların verisiyle uygular.'),
    'adimlar-tercih': ('adimlar-tercih.svg', 'Tercih listesi: hayal, hedef ve garanti okullar',
                     'Listeni taban puan ve yüzdelik dilime göre üç katmanda dengeli kur.'),
    'agirlik-lgs':  ('agirlik-lgs.svg', 'LGS ders katsayıları: Türkçe, Matematik ve Fen 4 kat ağırlıkta',
                     'Katsayısı 4 olan derste 1 net, katsayısı 1 olan derste 4 nete bedeldir.'),
    'agirlik-kpss': ('agirlik-kpss.svg', 'KPSS P1, P2 ve P3 puan türlerinin test ağırlıkları',
                     'Hangi kadronun hangi puan türünü istediği, kurumun ilanında yazar.'),
    'agirlik-ales': ('agirlik-ales.svg', 'ALES SAY, SÖZ ve EA puan türlerinin bölüm ağırlıkları',
                     'Hedef puan türünde ağırlığı yüksek bölüme çalışma zamanını ayır.'),
    'can-egrisi':   ('can-egrisi.svg', 'Çan eğrisi: sınıf ortalamasına göre harf notu dağılımı',
                     'Notun mutlak puana değil, sınıfın ortalamasına göre harfe dönüşür.'),
    'taban-nedir':  ('taban-nedir.svg', 'Taban puanı açıklaması: en son yerleşen öğrencinin puanı',
                     'Puanın tabanın üstündeyse şansın yüksek; altındaysa riskli tercihtir.'),
}

def rel_prefix(page):
    return '../' * page.count('/')

def figure(page, key):
    fname, alt, cap = IMGS[key]
    src = rel_prefix(page) + D + '/' + fname
    return (f'\n<figure class="diyagram">\n'
            f'  <img src="{src}" alt="{alt}" loading="lazy" width="800" height="450">\n'
            f'  <figcaption>{cap}</figcaption>\n</figure>\n')

# page -> [(key, anchor_h2_keyword)]
FIXES = {
    'index.html': [('net-lgs', 'Neden PuanRobotu'), ('olcek-500', 'En Çok Kullanılan'), ('adimlar-lgs', 'Neden PuanRobotu')],
    'lgs/index.html': [('net-lgs', 'Doğru Bilinen 3 Yanlış'), ('taban-nedir', 'Yol Haritası'), ('olcek-500', 'Tahmin Dürüstlüğü')],
    'lgs/puan-hesaplama/index.html': [('agirlik-lgs', 'Katsayı'), ('adimlar-lgs', 'Hesaplanır')],
    'lgs/tercih-robotu/index.html': [('taban-nedir', 'Taban'), ('olcek-500', 'Dilim')],
    'lgs/taban-puanlari/index.html': [('olcek-500', 'Yüzdelik Dilim'), ('adimlar-tercih', 'Nasıl Kullanmalısın')],
    'lgs/bursluluk-puan-hesaplama/index.html': [('olcek-500', 'Okumalısın'), ('adimlar-lgs', 'Hesaplanır')],
    'lgs/takdir-tesekkur-hesaplama/index.html': [('olcek-not', 'Okumalısın'), ('vize-final', 'Hesaplanır')],
    'yks/index.html': [('net-osym', 'Öne Çıkanlar'), ('obp', 'Öne Çıkanlar'), ('olcek-500', 'Öne Çıkanlar')],
    'yks/tercih-robotu/index.html': [('taban-nedir', 'Taban'), ('olcek-500', 'Sıralama')],
    'universite-not/index.html': [('gano', 'Öne Çıkanlar'), ('vize-final', 'Öne Çıkanlar'), ('olcek-not', 'Öne Çıkanlar')],
    'lisansustu/index.html': [('net-osym', 'Öne Çıkanlar'), ('puan-yds', 'Öne Çıkanlar'), ('agirlik-ales', 'Öne Çıkanlar')],
    'kamu-sinavlari/index.html': [('net-osym', 'Öne Çıkanlar'), ('agirlik-kpss', 'Öne Çıkanlar'), ('olcek-100', 'Öne Çıkanlar')],
}

def insert_after_h2(html, page, key, anchor_kw):
    fig = figure(page, key)
    if fig.strip() in html:
        return html, True
    m = re.search(r'<h2[^>]*>[^<]*' + re.escape(anchor_kw) + r'[^<]*</h2>', html)
    if not m:
        return html, False
    rest = html[m.end():]
    pm = re.search(r'</p>', rest)
    pos = m.end() + pm.end() if pm else m.end()
    return html[:pos] + fig + html[pos:], True

def main():
    skipped = []
    for page, items in FIXES.items():
        p = os.path.join(ROOT, page)
        html = open(p, encoding='utf-8').read()
        for key, kw in items:
            html, ok = insert_after_h2(html, page, key, kw)
            if not ok:
                skipped.append((page, key, kw))
        open(p, 'w', encoding='utf-8').write(html)
    # city pages: olcek-500 after the taban-nedir figure
    city_dir = os.path.join(ROOT, 'lgs', 'taban-puanlari')
    n = 0
    for fn in sorted(os.listdir(city_dir)):
        if not fn.endswith('.html') or fn == 'index.html':
            continue
        page = f'lgs/taban-puanlari/{fn}'
        p = os.path.join(ROOT, page)
        html = open(p, encoding='utf-8').read()
        fig = figure(page, 'olcek-500')
        if fig.strip() not in html:
            m = re.search(r'</figure>', html)
            if m:
                html = html[:m.end()] + fig + html[m.end():]
                n += 1
            else:
                skipped.append((page, 'olcek-500', 'no figure'))
        open(p, 'w', encoding='utf-8').write(html)
    print(f"city fixed: {n}, still skipped: {skipped}")

if __name__ == '__main__':
    main()
