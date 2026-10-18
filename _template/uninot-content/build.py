#!/usr/bin/env python3
"""Universite Notlari content upgrade (2026-10-18): surgical replacement of guide
+ lede + head meta + FAQ details + FAQPage JSON-LD.
FAQ <details> and FAQPage JSON-LD are generated from ONE source -> byte parity.
Run: python3 build.py  (from _template/uninot-content/)
Verifies: title<=60, meta 150-160 chars, FAQ parity, single H1, no root-abs links added.
"""
import os, re, json, html as ihtml, sys

DST = os.path.expanduser("~/workspace/puanrobotu")
HERE = os.path.dirname(os.path.abspath(__file__))

GUIDE_START = '      <!-- ============ REHBER \u0130\u00c7ER\u0130K ============ -->\n'
GUIDE_END = '      <!-- ============ SSS ============ -->'
FAQ_H2 = '        <h2 id="sss-baslik">S\u0131k Sorulan Sorular</h2>\n'
BYLINE = '<p class="guncelleme">Son g\u00fcncelleme: 18 Ekim 2026 \u00b7 Yazan: PuanRobotu Edit\u00f6r Ekibi</p>'

PAGES = {}

def details_html(faqs):
    return "\n".join(f'        <details><summary>{q}</summary><p>{a}</p></details>' for q, a in faqs)

def faq_jsonld(faqs):
    ents = []
    for q, a in faqs:
        qtxt = ihtml.unescape(re.sub(r'<[^>]+>', '', q))
        atxt = ihtml.unescape(re.sub(r'<[^>]+>', '', a))
        ents.append({"@type": "Question", "name": qtxt,
                     "acceptedAnswer": {"@type": "Answer", "text": atxt}})
    data = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": ents}
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n</script>'

def apply_page(rel, spec):
    p = os.path.join(DST, rel, "index.html")
    s = open(p, encoding="utf-8").read()

    # 1. head: title + meta + og:description
    if "title" in spec:
        assert len(spec["title"]) <= 60, f"title too long ({len(spec['title'])}): {rel}"
        s = re.sub(r'<title>.*?</title>', '<title>' + spec["title"] + '</title>', s, count=1)
    if "meta" in spec:
        assert 150 <= len(spec["meta"]) <= 160, f"meta {len(spec['meta'])} chars: {rel}"
        s = re.sub(r'<meta name="description" content=".*?">',
                   '<meta name="description" content="' + spec["meta"] + '">', s, count=1)
    if "ogdesc" in spec:
        s = re.sub(r'<meta property="og:description" content=".*?">',
                   '<meta property="og:description" content="' + spec["ogdesc"] + '">', s, count=1)
    # 2. lede
    if "lede" in spec:
        s2, n = re.subn(r'(<p class="lede">).*?(</p>)',
                        lambda m: m.group(1) + spec["lede"] + m.group(2), s, count=1, flags=re.S)
        assert n == 1, f"lede not found: {rel}"
        s = s2
    # 3. byline after lede
    if 'class="guncelleme"' not in s:
        s2, n = re.subn(r'(<p class="lede">.*?</p>)', lambda m: m.group(1) + "\n      " + BYLINE,
                        s, count=1, flags=re.S)
        assert n == 1, f"lede for byline: {rel}"
        s = s2
    # 4. guide
    if "guide" in spec:
        i = s.index(GUIDE_START) + len(GUIDE_START)
        j = s.index(GUIDE_END)
        # no root-absolute links may be introduced (relative only)
        assert 'href="/' not in spec["guide"] and 'src="/' not in spec["guide"], f"root-abs in guide: {rel}"
        s = s[:i] + spec["guide"] + "\n" + s[j:]
    # 5. faqs -> details + JSON-LD
    if "faqs" in spec:
        faqs = spec["faqs"]
        assert 8 <= len(faqs) <= 12, f"faq count {len(faqs)}: {rel}"
        i = s.index(FAQ_H2) + len(FAQ_H2)
        j = s.index("      </section>", i)
        s = s[:i] + details_html(faqs) + "\n" + s[j:]
        pat = re.compile(r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*"@type": "FAQPage",.*?\n</script>', re.S)
        s, n = pat.subn(lambda m: faq_jsonld(faqs), s, count=1)
        assert n == 1, f"FAQPage JSON-LD missing: {rel}"
    # 6. sanity: single H1, no root-abs href/src introduced
    assert len(re.findall(r'<h1[ >]', s)) == 1, f"H1 count: {rel}"
    open(p, "w", encoding="utf-8").write(s)
    return True

def verify_faq_parity(rel):
    p = os.path.join(DST, rel, "index.html")
    s = open(p, encoding="utf-8").read()
    details = re.findall(r'<details><summary>(.*?)</summary><p>(.*?)</p></details>', s, re.S)
    ld = None
    for m in re.finditer(r'<script type="application/ld\+json">', s):
        inner = s[m.end():].lstrip()
        if not inner.startswith('{'):
            continue
        try:
            obj, _ = json.JSONDecoder().raw_decode(inner)
        except Exception:
            continue
        if isinstance(obj, dict) and obj.get("@type") == "FAQPage":
            ld = obj
            break
    assert ld is not None, f"no FAQPage JSON-LD: {rel}"
    ents = ld["mainEntity"]
    assert len(ents) == len(details), f"count {len(ents)} vs {len(details)}: {rel}"
    for (q, a), e in zip(details, ents):
        qtxt = ihtml.unescape(re.sub(r'<[^>]+>', '', q))
        atxt = ihtml.unescape(re.sub(r'<[^>]+>', '', a))
        assert e["name"] == qtxt, f"Q mismatch {rel}: {qtxt[:40]}"
        assert e["acceptedAnswer"]["text"] == atxt, f"A mismatch {rel}: {qtxt[:40]}"
    return len(details)

# ==================== PAGE 1: VIZE-FINAL ====================
PAGES["universite-not/vize-final-hesaplama"] = {
"title": "Vize\u2013Final Hesaplama | PuanRobotu",
"meta": "Vize notundan finalden ka\u00e7 alman gerekti\u011fini hesapla: \u00e7ift y\u00f6nl\u00fc ara\u00e7, ayarlanabilir a\u011f\u0131rl\u0131klar, b\u00fct\u00fcnleme kurallar\u0131 ve hedef kontrol\u00fc. \u00dccretsiz, an\u0131nda sonu\u00e7.",
"ogdesc": "Vize notundan finalden ka\u00e7 alman gerekti\u011fini hesapla: ayarlanabilir a\u011f\u0131rl\u0131klar, b\u00fct\u00fcnleme ve baraj kurallar\u0131yla \u00fccretsiz ara\u00e7.",
"lede": "Vize\u2013final hesaplamas\u0131, dersten ge\u00e7mek i\u00e7in <strong>finalden ka\u00e7 alman gerekti\u011fini</strong> bulur: Gerekli Final = (Hedef \u2212 Vize \u00d7 vize a\u011f\u0131rl\u0131\u011f\u0131) \u00f7 final a\u011f\u0131rl\u0131\u011f\u0131. Vizeni ve hedefini yaz, sonucu saniyeler i\u00e7inde g\u00f6r; a\u011f\u0131rl\u0131klar okuluna g\u00f6re ayarlanabilir.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>Gerekli final = (Hedef \u2212 Vize \u00d7 vize a\u011f\u0131rl\u0131\u011f\u0131) \u00f7 final a\u011f\u0131rl\u0131\u011f\u0131.</strong> Bu sayfa hem ortalaman\u0131 hem de hedefe ula\u015fmak i\u00e7in finalden ka\u00e7 alman gerekti\u011fini hesaplar.</li>
<li>Varsay\u0131lan a\u011f\u0131rl\u0131k <strong>%40 vize / %60 final</strong>; okulunun oranlar\u0131 farkl\u0131ysa kutulardan de\u011fi\u015ftir.</li>
<li>Gereken final <strong>100'\u00fc a\u015f\u0131yorsa</strong> hedef bu a\u011f\u0131rl\u0131klarla ula\u015f\u0131lamaz \u2014 ara\u00e7 bunu a\u00e7\u0131k\u00e7a s\u00f6yler.</li>
<li>Bile\u015fenler 100'\u00fc tutmuyorsa (%40+%20+%60 gibi) ara\u00e7 a\u011f\u0131rl\u0131klar\u0131 otomatik normalize eder.</li>
<li>B\u00fct\u00fcnleme genelde finalin yerine ge\u00e7er; ama giri\u015f ko\u015fullar\u0131 ve harf tavan\u0131 okuldan okula de\u011fi\u015fir.</li>
</ul>
</div>

<h2>Vize\u2013Final Sistemi Nedir?</h2>
<p><strong>Vize\u2013final sistemi, ders ba\u015far\u0131 notunun ara s\u0131nav (vize) ve d\u00f6nem sonu s\u0131nav\u0131 (final) notlar\u0131n\u0131n a\u011f\u0131rl\u0131kl\u0131 ortalamas\u0131yla belirlendi\u011fi de\u011ferlendirme modelidir.</strong> T\u00fcrkiye'deki \u00fcniversitelerin \u00e7o\u011funda ders ge\u00e7me, bu iki s\u0131nav\u0131n belirlenen oranlarla birle\u015ftirilmesine dayan\u0131r.</p>
<p>En yayg\u0131n da\u011f\u0131l\u0131m <strong>%40 vize + %60 final</strong> \u015feklindedir. Bu oran bir gelenek de\u011fil, her \u00fcniversitenin senatosunun ald\u0131\u011f\u0131 bir karard\u0131r: %30/%70 ve %50/%50 uygulayan okullar da vard\u0131r. Baz\u0131 derslerde \u00f6dev, proje veya laboratuvar notu \u00fc\u00e7\u00fcnc\u00fc bir bile\u015fen olarak eklenir.</p>
<p>Ge\u00e7me notu \u00e7o\u011fu okulda <strong>50</strong>, baz\u0131lar\u0131nda <strong>60</strong>'t\u0131r. Bu e\u015fi\u011fin alt\u0131nda kalan a\u011f\u0131rl\u0131kl\u0131 ortalama, harf notu ne olursa olsun dersi tekrarlat\u0131r.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Bu hesaplay\u0131c\u0131 iki y\u00f6nl\u00fc \u00e7al\u0131\u015f\u0131r: ortalaman\u0131 hesaplar ve hedefledi\u011fin ortalamaya ula\u015fmak i\u00e7in finalden ka\u00e7 alman gerekti\u011fini bulur.</strong> Her iki y\u00f6n de ayn\u0131 form\u00fcl\u00fcn iki farkl\u0131 \u00e7\u00f6z\u00fcm\u00fcd\u00fcr.</p>
<p>Temel form\u00fcl: <strong>Ba\u015far\u0131 Notu = Vize \u00d7 vize a\u011f\u0131rl\u0131\u011f\u0131 + Final \u00d7 final a\u011f\u0131rl\u0131\u011f\u0131</strong>. A\u011f\u0131rl\u0131klar ondal\u0131k yaz\u0131l\u0131r: %40 \u2192 0,40.</p>
<p>Ters y\u00f6n ("finalden ka\u00e7 almal\u0131y\u0131m") i\u00e7in form\u00fcl finale g\u00f6re \u00e7\u00f6z\u00fcl\u00fcr: <strong>Gerekli Final = (Hedef \u2212 Vize \u00d7 vize a\u011f\u0131rl\u0131\u011f\u0131) \u00f7 final a\u011f\u0131rl\u0131\u011f\u0131</strong>.</p>
<p>A\u011f\u0131rl\u0131klar\u0131n toplam\u0131 100 de\u011filse ara\u00e7 \u00f6nce <strong>normalizasyon</strong> yapar: her a\u011f\u0131rl\u0131k toplam a\u011f\u0131rl\u0131\u011fa b\u00f6l\u00fcn\u00fcr. \u00d6rne\u011fin vize %40 + \u00f6dev %20 + final %60 = %120 ise vize a\u011f\u0131rl\u0131\u011f\u0131 40/120 = 0,333 olur. Rakip sayfalar\u0131n neredeyse hi\u00e7biri bu ad\u0131m\u0131 a\u00e7\u0131klamaz.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>Vizen 50, hedefin 50 ortalama, a\u011f\u0131rl\u0131klar %40/%60 ise finalden 50 alman gerekir.</strong> Hesap ad\u0131mlar\u0131:</p>
<ul>
<li>Vizenin katk\u0131s\u0131: 50 \u00d7 0,40 = <strong>20</strong></li>
<li>Kalan: 50 \u2212 20 = <strong>30</strong></li>
<li>Gerekli final: 30 \u00f7 0,60 = <strong>50</strong></li>
</ul>
<p>Bu \u00f6rne\u011fi yukar\u0131daki araca girerek ayn\u0131 sonucu ald\u0131\u011f\u0131n\u0131 do\u011frulayabilirsin. Form\u00fcl\u00fcn d\u00fcz y\u00f6n\u00fcn\u00fc de test edebilirsin: vize 50 + final 50 \u2192 50 \u00d7 0,40 + 50 \u00d7 0,60 = 20 + 30 = <strong>50</strong>.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Vizeni yaz.</strong> Birden fazla ara s\u0131nav\u0131n varsa \u00f6nce ortalamas\u0131n\u0131 al (\u00e7o\u011fu okulda bu\u00e7uklu ortalama tam say\u0131ya yuvarlan\u0131r).</li>
<li><strong>Hedef ortalaman\u0131 yaz.</strong> Ge\u00e7me notun (50 veya 60) ya da istedi\u011fin harfin alt s\u0131n\u0131r\u0131 (BB i\u00e7in 80).</li>
<li><strong>A\u011f\u0131rl\u0131klar\u0131 kontrol et.</strong> Ders izlencendeki oranlar\u0131 kutulara yaz; %40/%60 varsay\u0131land\u0131r.</li>
<li><strong>Sonucu oku.</strong> "Gerekli final" kutusu, hedefe ula\u015fmak i\u00e7in finalden alman gereken en d\u00fc\u015f\u00fck notu g\u00f6sterir.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>Sonu\u00e7 \u00fc\u00e7 banttan birine d\u00fc\u015fer; her band\u0131n anlam\u0131 farkl\u0131d\u0131r.</strong></p>
<table class="bilgi-tablosu">
<caption>Gerekli final sonucunun anlam\u0131</caption>
<thead><tr><th>Sonu\u00e7</th><th>Anlam\u0131</th><th>S\u0131radaki ad\u0131m</th></tr></thead>
<tbody>
<tr><td>0\u2013100 aras\u0131 bir not</td><td>Hedefe ula\u015fmak m\u00fcmk\u00fcn</td><td>Finale bu notu hedefleyerek \u00e7al\u0131\u015f</td></tr>
<tr><td>100'den b\u00fcy\u00fck</td><td>Hedef bu a\u011f\u0131rl\u0131klarla <strong>ula\u015f\u0131lamaz</strong></td><td>Hedefi d\u00fc\u015f\u00fcr ya da b\u00fct\u00fcnleme/yaz okulu planla</td></tr>
<tr><td>0 veya alt\u0131nda</td><td>Hedef zaten tutmu\u015f</td><td>Finale girmen yeterli (baraj varsa baraj\u0131 ge\u00e7)</td></tr>
</tbody>
</table>
<p>\u00d6rnek: vizen 30, hedefin 50, a\u011f\u0131rl\u0131klar %40/%60 ise gereken final (50 \u2212 12) \u00f7 0,60 = <strong>63,3</strong> olur. Vizen 20 olsayd\u0131 gereken final (50 \u2212 8) \u00f7 0,60 = <strong>70</strong> olurdu.</p>

<h2>A\u011f\u0131rl\u0131klar 100'\u00fc Tutmuyorsa: Normalizasyon</h2>
<p><strong>Bile\u015fen a\u011f\u0131rl\u0131klar\u0131 100'\u00fc tutmuyorsa her a\u011f\u0131rl\u0131k toplama b\u00f6l\u00fcnerek normalize edilir.</strong> \u00d6rnek: vize %40 + \u00f6dev %20 + final %60 = %120.</p>
<p>Normalize a\u011f\u0131rl\u0131klar: vize 40/120 = <strong>0,333</strong>, \u00f6dev 20/120 = <strong>0,167</strong>, final 60/120 = <strong>0,500</strong>. Ba\u015far\u0131 notu = Vize \u00d7 0,333 + \u00d6dev \u00d7 0,167 + Final \u00d7 0,500.</p>
<p>Bu ad\u0131m\u0131 atlayan hesaplamalar 120 \u00fczerinden sonu\u00e7 \u00fcretir ve yanl\u0131\u015f olur. Hi\u00e7bir rakip sayfa bu normalizasyonu a\u00e7\u0131klamaz.</p>
<p>\u0130ki ara s\u0131nav\u0131n varsa \u00f6nce vize ortalaman\u0131 bul: (Ara1 + Ara2) \u00f7 2. \u00c7o\u011fu y\u00f6netmelikte bu\u00e7uklu ortalama tam say\u0131ya yuvarlan\u0131r.</p>

<h2>Gereken Final 100'\u00fc A\u015f\u0131yorsa Ne Yapmal\u0131s\u0131n?</h2>
<p><strong>Gereken final 100'\u00fc a\u015f\u0131yorsa hedefe bu d\u00f6nem ula\u015famazs\u0131n; plan\u0131 de\u011fi\u015ftirmen gerekir.</strong> \u00dc\u00e7 se\u00e7ene\u011fin var:</p>
<ol>
<li><strong>Hedefi d\u00fc\u015f\u00fcr.</strong> BB (80) yerine CC (70) hedefle; gereken finali yeniden hesapla.</li>
<li><strong>B\u00fct\u00fcnlemeye haz\u0131rlan.</strong> B\u00fct\u00fcnleme finalin yerine ge\u00e7er; a\u015fa\u011f\u0131daki b\u00fct kurallar\u0131n\u0131 oku.</li>
<li><strong>Yaz okulunda tekrar al.</strong> Yaz okulu notu genelde GANO'ya yeni harfle i\u015flenir.</li>
</ol>
<p>\u00d6rnek: vizen 10, hedefin 50, %40/%60 a\u011f\u0131rl\u0131kta gereken final (50 \u2212 4) \u00f7 0,60 = <strong>76,7</strong> \u2014 ula\u015f\u0131labilir. Ama hedefin 90 olsayd\u0131 (90 \u2212 4) \u00f7 0,60 = <strong>143,3</strong> \u2014 imk\u00e2ns\u0131z. Ara\u00e7 bu ikinci durumda "ula\u015f\u0131lamaz" der.</p>

<h2>B\u00fct\u00fcnleme: Kimler Girebilir, Kurallar Neler?</h2>
<p><strong>B\u00fct\u00fcnleme (b\u00fct) genelde finalin yerine ge\u00e7er ve ayn\u0131 a\u011f\u0131rl\u0131kla hesaplan\u0131r; ama giri\u015f ko\u015fullar\u0131 okuldan okula de\u011fi\u015fir.</strong></p>
<p>\u00dc\u00e7 kritik kural\u0131 ders izlencenden teyit et:</p>
<ul>
<li><strong>Giri\u015f hakk\u0131:</strong> \u00c7o\u011fu okul finalden kalan herkese b\u00fct hakk\u0131 tan\u0131r; baz\u0131lar\u0131 vizeye girmeyene veya devams\u0131zl\u0131k s\u0131n\u0131r\u0131n\u0131 a\u015fana tan\u0131maz.</li>
<li><strong>Harf tavan\u0131:</strong> Baz\u0131 \u00fcniversiteler b\u00fctle al\u0131nan notun harfini s\u0131n\u0131rlar (\u00f6rn. en fazla CC). Bu kural varsa b\u00fctle BB hedefleyemezsin.</li>
<li><strong>Notun yerine ge\u00e7mesi:</strong> Standart uygulama, b\u00fct notunun final notunun yerine ge\u00e7mesidir; finalle ortalamas\u0131 al\u0131nmaz.</li>
</ul>
<p>Bu sayfadaki hesaplay\u0131c\u0131y\u0131 b\u00fct\u00fcnleme i\u00e7in de kullanabilirsin: "final" kutusuna b\u00fct hedefini yazman yeterli \u2014 matematik ayn\u0131d\u0131r.</p>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7 ham ba\u015far\u0131 notunu hesaplar; harf notunu ve ge\u00e7me karar\u0131n\u0131 okulunun kurallar\u0131 belirler.</strong></p>
<ul>
<li><strong>Final baraj\u0131:</strong> Baz\u0131 okullar, ortalaman tutsa bile finalden belirli bir not (ör. 50) alman\u0131 \u015fart ko\u015far. Baraj\u0131 ge\u00e7emezsen ortalama tek ba\u015f\u0131na kurtarmaz.</li>
<li><strong>Yuvarlama:</strong> 43,5 \u2192 44 gibi bu\u00e7uklu yuvarlama kurallar\u0131 okuldan okula de\u011fi\u015fir; ara\u00e7 ham de\u011feri verir.</li>
<li><strong>Devams\u0131zl\u0131k:</strong> Devams\u0131zl\u0131k s\u0131n\u0131r\u0131n\u0131 a\u015fan \u00f6\u011frenci final s\u0131nav\u0131na giremez; bu durumda hesaplama anlams\u0131zla\u015f\u0131r.</li>
<li><strong>\u00c7an e\u011frisi:</strong> Dersin ba\u011f\u0131l de\u011ferlendirme ile notland\u0131r\u0131l\u0131yorsa ham notun harfe d\u00f6n\u00fc\u015f\u00fcm\u00fc s\u0131n\u0131f da\u011f\u0131l\u0131m\u0131na g\u00f6re yap\u0131l\u0131r \u2014 form\u00fcl\u00fc <a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a> sayfas\u0131nda bulursun.</li>
<li><strong>A\u00d6F:</strong> A\u00e7\u0131k\u00f6\u011fretimde a\u011f\u0131rl\u0131klar %30/%70'tir ve 35 baraj\u0131 vard\u0131r; bu sayfadaki %40/%60 varsay\u0131m\u0131 A\u00d6F'ye uymaz \u2014 <a href="../aof-not-hesaplama/">A\u00d6F Not Hesaplama</a> sayfas\u0131n\u0131 kullan.</li>
</ul>

<h2>Vize\u2013Final, \u00c7an E\u011frisi ve A\u00d6F: Hangisi Sana Uygun?</h2>
<p><strong>Do\u011fru hesaplay\u0131c\u0131y\u0131 se\u00e7mek, do\u011fru sistemi bilmekle ba\u015flar.</strong></p>
<table class="bilgi-tablosu">
<caption>\u00dc\u00e7 not sisteminin kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th>Sistem</th><th>A\u011f\u0131rl\u0131klar</th><th>Harf nas\u0131l belirlenir?</th><th>Do\u011fru ara\u00e7</th></tr></thead>
<tbody>
<tr><td>Standart (mutlak)</td><td>%40 vize / %60 final (de\u011fi\u015fir)</td><td>Ham not \u2192 sabit aral\u0131k tablosu</td><td>Bu sayfa + <a href="../harf-notu-hesaplama/">Harf Notu Hesaplama</a></td></tr>
<tr><td>\u00c7an e\u011frisi (ba\u011f\u0131l)</td><td>Ayn\u0131 a\u011f\u0131rl\u0131klar</td><td>Ham not \u2192 s\u0131n\u0131f da\u011f\u0131l\u0131m\u0131na g\u00f6re (z/T)</td><td><a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a></td></tr>
<tr><td>A\u00d6F</td><td>%30 ara / %70 d\u00f6nem sonu</td><td>35 baraj + ba\u011f\u0131l harf</td><td><a href="../aof-not-hesaplama/">A\u00d6F Not Hesaplama</a></td></tr>
</tbody>
</table>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>A\u011f\u0131rl\u0131klar\u0131 ders izlencesinden teyit et; varsay\u0131lan %40/%60 her okulda ge\u00e7erli de\u011fildir.</li>
<li>Hedefini ge\u00e7me notu olarak de\u011fil, istedi\u011fin harfin alt s\u0131n\u0131r\u0131 olarak koy (BB i\u00e7in 80).</li>
<li>Final baraj\u0131 olan okullarda \u00f6nce baraj\u0131 garantile, sonra ortalamaya oyna.</li>
<li>Vizen d\u00fc\u015f\u00fckse final \u00f6ncesi konular\u0131 soru a\u011f\u0131rl\u0131\u011f\u0131na g\u00f6re \u00f6nceliklendir.</li>
<li>D\u00f6nem sonu genel ortalaman i\u00e7in <a href="../gano-hesaplama/">GANO Hesaplama</a> arac\u0131n\u0131 kullan.</li>
</ul>
""",
"faqs": [
("Finalden ka\u00e7 almam gerekiyor?", "Vize notunu, hedefledi\u011fin ortalamay\u0131 ve okulunun vize-final a\u011f\u0131rl\u0131klar\u0131n\u0131 gir; ara\u00e7 gereken final notunu hesaplar: Gerekli Final = (Hedef \u2212 Vize \u00d7 vize a\u011f\u0131rl\u0131\u011f\u0131) \u00f7 final a\u011f\u0131rl\u0131\u011f\u0131. Sonu\u00e7 100'\u00fc a\u015f\u0131yorsa hedef bu a\u011f\u0131rl\u0131klarla ula\u015f\u0131lamaz."),
("Vize %40, final %60 a\u011f\u0131rl\u0131\u011f\u0131 her \u00fcniversitede ayn\u0131 m\u0131?", "Hay\u0131r. En yayg\u0131n da\u011f\u0131l\u0131m %40/%60't\u0131r ama oranlar\u0131 her \u00fcniversitenin senatosu belirler; %30/%70 ve %50/%50 kullanan okullar da var. Bu ara\u00e7ta a\u011f\u0131rl\u0131klar\u0131 kendi okuluna g\u00f6re ayarlayabilirsin."),
("B\u00fct\u00fcnleme (b\u00fct) s\u0131nav\u0131 finalin yerine ge\u00e7er mi?", "Genelde evet: b\u00fct\u00fcnleme finalin yerine ge\u00e7er ve ayn\u0131 a\u011f\u0131rl\u0131kla hesaplan\u0131r. Ancak giri\u015f ko\u015fullar\u0131 (devams\u0131zl\u0131k, vizeye girme \u015fart\u0131) ve harf tavan\u0131 uygulamalar\u0131 okuldan okula de\u011fi\u015fir; ders izlenceni kontrol et."),
("Vizem 0 olursa ne olur?", "Vize 0 ise t\u00fcm y\u00fck finale biner: %40/%60 a\u011f\u0131rl\u0131kta 50 ortalama i\u00e7in finalden (50 \u2212 0) \u00f7 0,60 = 83,3 alman gerekir. Hedefin 70 ise gereken final 116,7 olur \u2014 imk\u00e2ns\u0131z; hedefi d\u00fc\u015f\u00fcr ya da b\u00fct\u00fcnlemeye haz\u0131rlan."),
("Gereken final 100'den b\u00fcy\u00fck \u00e7\u0131karsa ne yapmal\u0131y\u0131m?", "Hedefe bu a\u011f\u0131rl\u0131klarla ula\u015famazs\u0131n. \u00dc\u00e7 se\u00e7ene\u011fin var: hedefi d\u00fc\u015f\u00fcr (\u00f6rn. 80 yerine 70), b\u00fct\u00fcnlemeye haz\u0131rlan ya da yaz okulunda dersi tekrar al."),
("A\u011f\u0131rl\u0131klar\u0131m %40/%60 de\u011filse ne olur?", "Kutulardaki a\u011f\u0131rl\u0131klar\u0131 de\u011fi\u015ftirmen yeterli. Toplam 100 de\u011filse ara\u00e7 otomatik normalize eder: her a\u011f\u0131rl\u0131k toplama b\u00f6l\u00fcn\u00fcr, sonu\u00e7 yine 100 \u00fczerinden \u00e7\u0131kar."),
("\u0130ki ara s\u0131nav\u0131m varsa vize notum nas\u0131l bulunur?", "\u00d6nce ara s\u0131navlar\u0131n\u0131n ortalamas\u0131 al\u0131n\u0131r; \u00e7o\u011fu y\u00f6netmelikte bu\u00e7uklu sonu\u00e7 tam say\u0131ya yuvarlan\u0131r. Buldu\u011fun de\u011feri vize kutusuna yazman yeterli."),
("Final baraj\u0131 nedir?", "Baz\u0131 \u00fcniversiteler, ortalaman ne olursa olsun finalden belirli bir not alman\u0131 \u015fart ko\u015far. Bu baraj okuldan okula de\u011fi\u015fir; kesin bilgi i\u00e7in \u00f6\u011frenci i\u015fleri y\u00f6netmeli\u011fine bak."),
("Devams\u0131zl\u0131ktan kal\u0131rsam bu hesaplama ge\u00e7erli mi?", "Hay\u0131r. Devams\u0131zl\u0131k s\u0131n\u0131r\u0131n\u0131 a\u015fan \u00f6\u011frenci final s\u0131nav\u0131na giremez; \u00f6nce devam ko\u015fulunu sa\u011flaman gerekir."),
("Girdi\u011fim notlar bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notlar\u0131n hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 2: GANO ====================
PAGES["universite-not/gano-hesaplama"] = {
"title": "GANO / AGNO Hesaplama | PuanRobotu",
"meta": "Harf notlar\u0131n ve kredilerinle GANO ortalaman\u0131 hesapla: AA\u2013FF katsay\u0131 tablosu, YANO ayr\u0131m\u0131, ders tekrar\u0131 ve mezuniyet senaryolar\u0131. \u00dccretsiz, an\u0131nda sonu\u00e7.",
"ogdesc": "Harf notlar\u0131n ve kredilerinle GANO ortalaman\u0131 hesapla: do\u011fru katsay\u0131 tablosu ve YANO/AGNO ayr\u0131m\u0131yla \u00fccretsiz ara\u00e7.",
"lede": "GANO (Genel A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131), <strong>t\u00fcm derslerinin harf notu de\u011ferlerinin kredileriyle a\u011f\u0131rl\u0131kland\u0131r\u0131lm\u0131\u015f ortalamas\u0131d\u0131r</strong>: GANO = \u03a3(harf katsay\u0131s\u0131 \u00d7 kredi) \u00f7 \u03a3(kredi). Derslerini ekle, 4,00 \u00fczerinden ortalaman\u0131 an\u0131nda g\u00f6r.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>GANO = \u03a3(harf katsay\u0131s\u0131 \u00d7 ders kredisi) \u00f7 \u03a3(kredi).</strong> Kredi y\u00fckseldik\u00e7e dersin etkisi b\u00fcy\u00fcr.</li>
<li><strong>FF'nin katsay\u0131s\u0131 0'd\u0131r ama kredisi paydaya girer</strong> \u2014 kald\u0131\u011f\u0131n her ders ortalaman\u0131 a\u015fa\u011f\u0131 \u00e7eker.</li>
<li>Do\u011fru katsay\u0131 dizisi: <strong>AA=4,00 · BA=3,50 · BB=3,00 · CB=2,50 · CC=2,00 · DC=1,50 · DD=1,00 · FD=0,50 · FF=0,00</strong>.</li>
<li>GANO t\u00fcm program\u0131 kapsar; YANO yaln\u0131zca bir y\u0131l\u0131 kapsar \u2014 kar\u0131\u015ft\u0131rma.</li>
<li><strong>2,00 kritik e\u015fiktir:</strong> alt\u0131nda \u015fartl\u0131 ge\u00e7me dersleri kalmaya d\u00f6ner, burs ve mezuniyet riske girer.</li>
</ul>
</div>

<h2>GANO Nedir?</h2>
<p><strong>GANO (Genel A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131), \u00f6\u011frencinin t\u00fcm program boyunca ald\u0131\u011f\u0131 derslerin harf notu de\u011ferlerinin, ders kredileriyle a\u011f\u0131rl\u0131kland\u0131r\u0131lm\u0131\u015f ortalamas\u0131d\u0131r.</strong> 4,00 \u00fczerinden ifade edilir ve transkriptin en \u00f6nemli say\u0131s\u0131d\u0131r.</p>
<p>Ad\u0131ndaki "A\u011f\u0131rl\u0131kl\u0131" kelimesi kritiktir: her ders e\u015fit say\u0131lmaz. 6 kredilik bir dersin harfi, 2 kredilik dersten <strong>3 kat</strong> etkilidir. Bu y\u00fczden "ortalamam\u0131 y\u00fckseltmek istiyorum" diyen \u00f6\u011frencinin ilk bakaca\u011f\u0131 yer, kredisi y\u00fcksek derslerdir.</p>
<p>Yayg\u0131n bir yanl\u0131\u015f: GANO'nun a\u00e7\u0131l\u0131m\u0131 "Genel Akademik Not Ortalamas\u0131" de\u011fildir; do\u011frusu <strong>"Genel A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131"</strong>d\u0131r. Baz\u0131 rakip sayfalar bu a\u00e7\u0131l\u0131m\u0131 hatal\u0131 yazar.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Her ders i\u00e7in harf notunun katsay\u0131s\u0131n\u0131 kredisiyle \u00e7arpar, toplam\u0131 toplam krediye b\u00f6ler.</strong> Form\u00fcl: <strong>GANO = \u03a3(harf katsay\u0131s\u0131 \u00d7 kredi) \u00f7 \u03a3(kredi)</strong>.</p>
<p>Katsay\u0131 tablosu (resmi y\u00f6netmeliklerde do\u011frulanm\u0131\u015ft\u0131r):</p>
<table class="bilgi-tablosu">
<caption>Harf notu katsay\u0131lar\u0131</caption>
<thead><tr><th>Harf</th><th>AA</th><th>BA</th><th>BB</th><th>CB</th><th>CC</th><th>DC</th><th>DD</th><th>FD</th><th>FF</th></tr></thead>
<tbody><tr><td><strong>Katsay\u0131</strong></td><td>4,00</td><td>3,50</td><td>3,00</td><td>2,50</td><td>2,00</td><td>1,50</td><td>1,00</td><td>0,50</td><td>0,00</td></tr></tbody>
</table>
<p>Bu tablo rakiplerin \u00e7o\u011fundan tamd\u0131r: d\u00f6rt rakip sayfadan d\u00f6rd\u00fc FD=0,50 sat\u0131r\u0131n\u0131 atlar, biri Amerikan A=4/B=3 \u00f6l\u00e7e\u011fini kullan\u0131r. Yanl\u0131\u015f katsay\u0131yla hesaplanan GANO, ba\u015fvurularda seni yan\u0131lt\u0131r.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>4 kredilik dersten BA, 3 kredilik dersten BB, 2 kredilik dersten FF alan \u00f6\u011frencinin GANO'su 2,56'd\u0131r.</strong> Hesap:</p>
<ul>
<li>BA: 3,50 \u00d7 4 = <strong>14,0</strong></li>
<li>BB: 3,00 \u00d7 3 = <strong>9,0</strong></li>
<li>FF: 0,00 \u00d7 2 = <strong>0,0</strong> (kredi paydaya girer!)</li>
<li>GANO = 23,0 \u00f7 9 = <strong>2,56</strong></li>
</ul>
<p>Bu \u00f6rne\u011fi yukar\u0131daki araca girerek ayn\u0131 sonucu ald\u0131\u011f\u0131n\u0131 do\u011frulayabilirsin. FF'li dersin 2 kredisi payday\u0131 b\u00fcy\u00fctt\u00fc\u011f\u00fc i\u00e7in ortalama 2,56'da kald\u0131; o ders hi\u00e7 al\u0131nmam\u0131\u015f olsayd\u0131 ortalama 23,0 \u00f7 7 = 3,29 olurdu.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Ders sat\u0131r\u0131 ekle.</strong> "+ Ders Ekle" d\u00fc\u011fmesiyle ihtiyac\u0131n kadar sat\u0131r a\u00e7.</li>
<li><strong>Her dersin harfini se\u00e7.</strong> Listeden AA'dan FF'ye do\u011fru harfi i\u015faretle.</li>
<li><strong>Kredisini yaz.</strong> Dersin AKTS ya da yerel kredisini gir (okulunun hangisini kulland\u0131\u011f\u0131n\u0131 a\u015fa\u011f\u0131daki s\u0131n\u0131rlamalarda a\u00e7\u0131klad\u0131k).</li>
<li><strong>Sonucu oku.</strong> GANO an\u0131nda g\u00fcncellenir; toplam kredi ve ders say\u0131s\u0131n\u0131 da g\u00f6r\u00fcrs\u00fcn.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>GANO de\u011ferin, akademik durumunu belirleyen e\u015fiklere g\u00f6re okunur.</strong></p>
<table class="bilgi-tablosu">
<caption>GANO aral\u0131klar\u0131n\u0131n anlam\u0131</caption>
<thead><tr><th>GANO</th><th>Durum</th><th>Ne yapmal\u0131s\u0131n?</th></tr></thead>
<tbody>
<tr><td>3,50 \u2013 4,00</td><td><strong>Y\u00fcksek onur</strong> band\u0131</td><td>Belgeni takip et; burs ve lisans\u00fcst\u00fc ba\u015fvurular\u0131nda g\u00fc\u00e7l\u00fc konumdas\u0131n</td></tr>
<tr><td>3,00 \u2013 3,49</td><td><strong>Onur</strong> band\u0131</td><td>Onur belgesi \u015fartlar\u0131n\u0131 \u00f6\u011fren; \u00e7o\u011fu i\u015f ilan\u0131 3,00 e\u015fi\u011fi ister</td></tr>
<tr><td>2,00 \u2013 2,99</td><td>G\u00fcvenli b\u00f6lge</td><td>Mezuniyet i\u00e7in yeterli; \u015fartl\u0131 derslerin ge\u00e7er say\u0131l\u0131r</td></tr>
<tr><td>0 \u2013 1,99</td><td><strong>Risk b\u00f6lgesi</strong></td><td>DC/DD derslerin kalmaya d\u00f6ner; FF'leri tekrar al, bursunu kontrol et</td></tr>
</tbody>
</table>
<p>2,00 e\u015fi\u011fi \u00fc\u00e7 sonucu birden do\u011furur: \u015fartl\u0131 ge\u00e7me derslerinin ak\u0131beti, \u00e7o\u011fu bursun devam \u015fart\u0131 ve mezuniyet baraj\u0131. Bu y\u00fczden GANO'su 2,00'nin alt\u0131na d\u00fc\u015fen \u00f6\u011frencinin ilk hedefi 2,00'yi geri kazanmakt\u0131r.</p>

<h2>YANO, GANO, AGNO, GNO: Hangisi Hangisi?</h2>
<p><strong>Bu d\u00f6rt k\u0131saltma farkl\u0131 kapsamlar\u0131 ifade eder; birbirinin yerine kullan\u0131lmaz.</strong></p>
<table class="bilgi-tablosu">
<caption>Ortalama t\u00fcrlerinin ayr\u0131m\u0131</caption>
<thead><tr><th>K\u0131saltma</th><th>A\u00e7\u0131l\u0131m\u0131</th><th>Kapsam\u0131</th></tr></thead>
<tbody>
<tr><td><strong>YANO</strong></td><td>Y\u0131lsonu A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131</td><td>Tek akademik y\u0131l\u0131n dersleri</td></tr>
<tr><td><strong>GANO</strong></td><td>Genel A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131</td><td>Programa kay\u0131tl\u0131 olunan t\u00fcm d\u00f6nemler (k\u00fcm\u00fclatif)</td></tr>
<tr><td><strong>AGNO</strong></td><td>A\u011f\u0131rl\u0131kl\u0131 Genel Not Ortalamas\u0131</td><td>GANO ile ayn\u0131 form\u00fcl; baz\u0131 okullar\u0131n adland\u0131rmas\u0131</td></tr>
<tr><td><strong>GNO</strong></td><td>Genel Not Ortalamas\u0131</td><td>K\u0131sa ad\u0131; ba\u011flama g\u00f6re GANO anlam\u0131nda kullan\u0131l\u0131r</td></tr>
</tbody>
</table>
<p>Hi\u00e7bir rakip sayfa bu ayr\u0131m\u0131 tablo h\u00e2linde vermez; en g\u00fc\u00e7l\u00fc rakip \u00fc\u00e7 terimi e\u015fanlaml\u0131 gibi kullan\u0131r. Pratik kural: burs, mezuniyet ve ba\u015fvuru formlar\u0131nda istenen de\u011fer neredeyse her zaman <strong>GANO</strong>'dur.</p>

<h2>Ders Tekrar\u0131 ve Hesaba Kat\u0131lmayan Notlar</h2>
<p><strong>Tekrar al\u0131nan derste \u00e7o\u011fu okul son notu esas al\u0131r; ama bu kural senatoya g\u00f6re de\u011fi\u015fir.</strong> \u00dc\u00e7 uygulama vard\u0131r: yaln\u0131zca son not say\u0131l\u0131r (yayg\u0131n), en y\u00fcksek not say\u0131l\u0131r (nadir), her iki not da paydaya girer (baz\u0131 eski y\u00f6netmelikler). Kay\u0131t dondurmadan \u00f6nce \u00f6\u011frenci i\u015flerine sor.</p>
<p>GANO'ya <strong>kat\u0131lmayan</strong> notlar\u0131 bilmek de kritiktir:</p>
<ul>
<li><strong>MU (Muaf):</strong> Muaf olunan ders; kredisi de notu da hesaba girmez.</li>
<li><strong>G (Ge\u00e7er):</strong> Kredisiz/ge\u00e7er not; ortalamay\u0131 etkilemez.</li>
<li><strong>\u0130Z (\u0130zinli) / DS (Devams\u0131z):</strong> Not verilmedi\u011fi i\u00e7in paydaya girmez; ama DS dersi tekrarlat\u0131r.</li>
</ul>
<p>Hi\u00e7bir rakip sayfa bu listeyi vermez. Bu notlar\u0131 araca girmen gerekmez \u2014 girersen ortalaman yanl\u0131\u015f \u00e7\u0131kar.</p>

<h2>Bir Harf Y\u00fckseltmek GANO'yu Ne Kadar Oynat\u0131r?</h2>
<p><strong>Tek dersteki bir harf y\u00fckseltmenin GANO'ya etkisi = katsay\u0131 fark\u0131 \u00d7 ders kredisi \u00f7 toplam kredi.</strong> Bu form\u00fcl, "hangi derse \u00e7al\u0131\u015fmal\u0131y\u0131m" sorusunun matematiksel cevab\u0131d\u0131r.</p>
<p>\u00d6rnek: toplam 90 kredin var. 6 kredilik derste BB (3,00) yerine BA (3,50) al\u0131rsan fark = 0,50 \u00d7 6 \u00f7 90 = <strong>+0,033</strong>. Ayn\u0131 y\u00fckseltmeyi 2 kredilik derste yapsayd\u0131n etki +0,011 olurdu \u2014 \u00fc\u00e7te biri.</p>
<p>Stratejik sonu\u00e7: kredisi y\u00fcksek ve harfi d\u00fc\u015f\u00fck dersler, GANO toparlamada en verimli hedeflerdir. FF ile kal\u0131nan y\u00fcksek kredili bir dersi tekrar al\u0131p ge\u00e7mek, birka\u00e7 k\u00fc\u00e7\u00fck dersi y\u00fckseltmekten daha etkilidir.</p>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7 standart katsay\u0131larla matematiksel olarak do\u011fru sonu\u00e7 \u00fcretir; ama \u00fc\u00e7 okul fark\u0131n\u0131 bilmen gerekir.</strong></p>
<ul>
<li><strong>AKTS vs yerel kredi:</strong> Baz\u0131 \u00fcniversiteler GANO'yu AKTS kredisiyle, baz\u0131lar\u0131 ders saatiyle hesaplar. Hangisini girece\u011fini transkriptindeki s\u00fctundan anlars\u0131n.</li>
<li><strong>\u015eartl\u0131 ge\u00e7me:</strong> DC/DD notlar\u0131n\u0131n ge\u00e7er say\u0131lmas\u0131 GANO'nun 2,00 ve \u00fczeri olmas\u0131na ba\u011fl\u0131d\u0131r; e\u015fik ve uygulama okula g\u00f6re de\u011fi\u015fir.</li>
<li><strong>Harf aral\u0131klar\u0131:</strong> 100'l\u00fck notunun hangi harfe denk geldi\u011fi senato karar\u0131d\u0131r \u2014 kar\u015f\u0131l\u0131\u011f\u0131 <a href="../harf-notu-hesaplama/">Harf Notu Hesaplama</a> sayfas\u0131nda okuluna g\u00f6re bulursun.</li>
<li><strong>100'l\u00fck kar\u015f\u0131l\u0131k:</strong> GANO'nu KPSS/ALES ba\u015fvurusu i\u00e7in 100'l\u00fck sisteme \u00e7evirmen gerekiyorsa <a href="../not-donusumu/">4,00 \u2013 100 Not D\u00f6n\u00fc\u015f\u00fcm\u00fc</a> sayfas\u0131ndaki Y\u00d6K tablosunu kullan.</li>
</ul>

<h2>GANO mu, 100'l\u00fck Ortalama m\u0131?</h2>
<p><strong>Transkriptinde GANO yazar; ba\u015fvuru formlar\u0131nda 100'l\u00fck kar\u015f\u0131l\u0131k istenir.</strong> \u0130kisi farkl\u0131 \u00f6l\u00e7eklerdir ve d\u00f6n\u00fc\u015f\u00fcm Y\u00d6K tablosuyla yap\u0131l\u0131r \u2014 do\u011frudan "\u00d725" \u00e7arp\u0131m\u0131 yanl\u0131\u015ft\u0131r.</p>
<table class="bilgi-tablosu">
<caption>\u0130ki \u00f6l\u00e7e\u011fin kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th>\u00d6l\u00e7ek</th><th>Aral\u0131k</th><th>Nerede kullan\u0131l\u0131r?</th></tr></thead>
<tbody>
<tr><td>4,00'l\u00fck (GANO)</td><td>0,00 \u2013 4,00</td><td>Transkript, burs, yatay ge\u00e7i\u015f, mezuniyet</td></tr>
<tr><td>100'l\u00fck</td><td>0 \u2013 100</td><td>KPSS, ALES, baz\u0131 i\u015f ba\u015fvurular\u0131</td></tr>
</tbody>
</table>
<p>D\u00f6n\u00fc\u015f\u00fcm i\u00e7in <a href="../not-donusumu/">4,00 \u2013 100 Not D\u00f6n\u00fc\u015f\u00fcm\u00fc</a> arac\u0131n\u0131 kullan; Y\u00d6K'ün resmi tablosunu ve ara de\u011ferler i\u00e7in enterpolasyonu uygular.</p>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>Kredisi y\u00fcksek derslere \u00f6ncelik ver: 6 kredilik dersteki bir harf, 2 kredilikten 3 kat etkilidir.</li>
<li>FF ile kald\u0131\u011f\u0131n dersleri tekrar al\u0131p y\u00fckseltmek, GANO'yu toparlaman\u0131n en h\u0131zl\u0131 yoludur.</li>
<li>DC/DD notlar\u0131n varsa GANO'nu 2,00'nin \u00fcst\u00fcnde tut; alt\u0131na d\u00fc\u015fersen bu dersler kalmaya d\u00f6nebilir.</li>
<li>Burs, yatay ge\u00e7i\u015f ve y\u00fcksek lisans e\u015fiklerini d\u00f6nem ba\u015f\u0131nda \u00f6\u011fren.</li>
</ul>
""",
"faqs": [
("GANO nas\u0131l hesaplan\u0131r?", "Her dersin harf notu katsay\u0131s\u0131 (AA=4,00 \u2026 FF=0,00) kredisiyle \u00e7arp\u0131l\u0131r, toplam krediye b\u00f6l\u00fcn\u00fcr: GANO = \u03a3(katsay\u0131 \u00d7 kredi) \u00f7 \u03a3(kredi). Kredi y\u00fckseldik\u00e7e dersin etkisi b\u00fcy\u00fcr."),
("GANO ile AGNO ayn\u0131 \u015fey mi?", "Form\u00fcl ayn\u0131d\u0131r; fark adland\u0131rmadad\u0131r. AGNO, baz\u0131 \u00fcniversitelerin GANO yerine kulland\u0131\u011f\u0131 isimdir. YANO ise yaln\u0131zca bir akademik y\u0131l\u0131 kapsar; GANO t\u00fcm program\u0131 kapsar."),
("FF ald\u0131\u011f\u0131m ders ortalamay\u0131 nas\u0131l etkiler?", "FF'nin katsay\u0131s\u0131 0'd\u0131r ama kredisi paydaya girer; yani ortalaman\u0131 d\u00fc\u015f\u00fcr\u00fcr. Dersi tekrar al\u0131p y\u00fckseltmek, GANO'yu toparlaman\u0131n en etkili yoludur."),
("YANO nedir, GANO'dan fark\u0131 ne?", "YANO (Y\u0131lsonu A\u011f\u0131rl\u0131kl\u0131 Not Ortalamas\u0131) tek bir akademik y\u0131l\u0131n derslerini kapsar; GANO programa kay\u0131tl\u0131 olunan t\u00fcm d\u00f6nemlerin k\u00fcm\u00fclatif ortalamas\u0131d\u0131r. Burs ve mezuniyet kararlar\u0131nda GANO esas al\u0131n\u0131r."),
("Tekrar ald\u0131\u011f\u0131m ders GANO'ya nas\u0131l i\u015flenir?", "\u00c7o\u011fu okulda son al\u0131nan not esas al\u0131n\u0131r; baz\u0131lar\u0131nda en y\u00fcksek not, baz\u0131 eski y\u00f6netmeliklerde her iki not da hesaba kat\u0131l\u0131r. Kay\u0131t yapt\u0131rmadan \u00f6nce \u00f6\u011frenci i\u015flerine sor."),
("Hangi notlar GANO'ya kat\u0131lmaz?", "MU (muaf), G (ge\u00e7er), \u0130Z (izinli) ve DS (devams\u0131z) notlar\u0131 paydaya girmez. Bu notlar\u0131 araca girmen gerekmez; girersen ortalaman yanl\u0131\u015f \u00e7\u0131kar."),
("DC ve DD ile ders ge\u00e7ilir mi?", "\u00dcniversiteye g\u00f6re de\u011fi\u015fir: baz\u0131 okullarda DC/DD \u015fartl\u0131 ge\u00e7me say\u0131l\u0131r ve GANO 2,00 ve \u00fczeriyse ge\u00e7er kabul edilir; baz\u0131lar\u0131nda kalma anlam\u0131na gelir. Kesin kural okulunun y\u00f6netmeli\u011findedir."),
("3,00 ortalama ne i\u015fe yarar?", "3,00 onur belgesi e\u015fi\u011fidir; \u00e7o\u011fu i\u015f ilan\u0131 ve burs da 3,00 ister. 3,50 y\u00fcksek onur e\u015fi\u011fidir. Bu de\u011ferler okula g\u00f6re k\u00fc\u00e7\u00fck farklar g\u00f6sterebilir."),
("Harf katsay\u0131lar\u0131 her \u00fcniversitede ayn\u0131 m\u0131?", "AA=4,00 \u2026 FF=0,00 dizilimi yayg\u0131nd\u0131r ve resmi y\u00f6netmeliklerde do\u011frulanm\u0131\u015ft\u0131r; ancak baz\u0131 okullar FD, DC, DD gibi harfleri kullanmaz. Bu ara\u00e7taki liste en yayg\u0131n tam settir."),
("Girdi\u011fim notlar bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notlar\u0131n hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 3: HARF NOTU ====================
PAGES["universite-not/harf-notu-hesaplama"] = {
"title": "Harf Notu Hesaplama | PuanRobotu",
"meta": "100'l\u00fck notunun harf kar\u015f\u0131l\u0131\u011f\u0131n\u0131 bul: \u00fcniversite bant presetleri, kar\u015f\u0131la\u015ft\u0131rma tablosu, \u00f6zel harfler ve ko\u015fullu ge\u00e7me kurallar\u0131. \u00dccretsiz, an\u0131nda sonu\u00e7.",
"ogdesc": "100'l\u00fck notunun harf kar\u015f\u0131l\u0131\u011f\u0131n\u0131 bul: \u00fcniversite bant presetleri ve kar\u015f\u0131la\u015ft\u0131rma tablosuyla \u00fccretsiz ara\u00e7.",
"lede": "Harf notu, <strong>100'l\u00fck ham notunun \u00fcniversitenin belirledi\u011fi aral\u0131k tablosundaki kar\u015f\u0131l\u0131\u011f\u0131d\u0131r</strong>: yayg\u0131n aral\u0131kta 84 puan BB, 92 puan AA olur. Notunu yaz, okulunun bantlar\u0131na g\u00f6re harfini an\u0131nda \u00f6\u011fren.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>Harf notu = 100'l\u00fck notunun, \u00fcniversitenin aral\u0131k tablosundaki kar\u015f\u0131l\u0131\u011f\u0131d\u0131r.</strong> Ulusal tek tablo yoktur; aral\u0131klar\u0131 her \u00fcniversitenin senatosu belirler.</li>
<li>Neredeyse t\u00fcm okullarda ortak \u00e7ekirdek: <strong>AA=90+, BA=85\u201389, BB=80\u201384</strong>. Farkl\u0131l\u0131k alt harflerde ba\u015flar.</li>
<li>62 puan bir \u00fcniversitede CC, ba\u015fkas\u0131nda DD olur \u2014 bu sayfadaki 5 ger\u00e7ek \u00fcniversite presetini kar\u015f\u0131la\u015ft\u0131r.</li>
<li><strong>84,9 ile 85,0 aras\u0131ndaki 0,1 puan</strong> harfi de\u011fi\u015ftirir; yuvarlama politikas\u0131n\u0131 hocana sor.</li>
<li>\u00c7an e\u011frisi uygulanan derste harf, ham notun de\u011fil s\u0131n\u0131f i\u00e7indeki konumunun kar\u015f\u0131l\u0131\u011f\u0131d\u0131r.</li>
</ul>
</div>

<h2>Harf Notu Nedir?</h2>
<p><strong>Harf notu, 100'l\u00fck ham ba\u015far\u0131 notunun AA'dan FF'ye uzanan sembolik \u00f6l\u00e7e\u011fe \u00e7evrilmi\u015f h\u00e2lidir.</strong> Her harfin 4,00'l\u00fck sistemde bir katsay\u0131 kar\u015f\u0131l\u0131\u011f\u0131 vard\u0131r (AA=4,00 \u2026 FF=0,00) ve GANO bu katsay\u0131larla hesaplan\u0131r.</p>
<p>Harf notu iki i\u015flev g\u00f6r\u00fcr: dersi ge\u00e7ip ge\u00e7medi\u011fini g\u00f6sterir ve not ortalamana katsay\u0131 olarak girer. Bu y\u00fczden 84 ile 85 aras\u0131ndaki 1 puanl\u0131k fark, BB (3,00) ile BA (3,50) aras\u0131ndaki <strong>0,50 katsay\u0131 fark\u0131</strong> demektir.</p>
<p>Kritik nokta: harf aralıkları ulusal değildir. Aynı 100'lük not, iki üniversitede iki farklı harf verebilir — aşağıdaki karşılaştırma tablosu bunu sayıyla gösterir.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Notunu se\u00e7ili aral\u0131k tablosundaki alt s\u0131n\u0131rlarla kar\u015f\u0131la\u015ft\u0131r\u0131r; notunun sa\u011flad\u0131\u011f\u0131 en y\u00fcksek aral\u0131\u011f\u0131n harfini verir.</strong> Mant\u0131k: 84 i\u00e7in "84 \u2265 90 m\u0131? Hay\u0131r. 84 \u2265 85 mi? Hay\u0131r. 84 \u2265 80 mi? Evet \u2192 BB."</p>
<p>Be\u015f haz\u0131r preset vard\u0131r: <strong>Yayg\u0131n \u00d6rnek, Kent \u00dcniversitesi, GT\u00dc, \u0130stanbul Ayd\u0131n \u00dcniversitesi, Sakarya \u00dcniversitesi</strong>. Hepsi ger\u00e7ek \u00fcniversite aral\u0131klar\u0131d\u0131r. Okulun listede yoksa alt s\u0131n\u0131rlar\u0131 elle d\u00fczenleyebilirsin.</p>
<p>Bu ara\u00e7 <strong>mutlak de\u011ferlendirme</strong> ile \u00e7al\u0131\u015f\u0131r: harf yaln\u0131zca notuna ba\u011fl\u0131d\u0131r, s\u0131n\u0131f\u0131n durumuna de\u011fil. \u00c7an e\u011frisi uygulanan derslerde harf s\u0131n\u0131f da\u011f\u0131l\u0131m\u0131na g\u00f6re belirlenir \u2014 onun i\u00e7in <a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a> sayfas\u0131n\u0131 kullan.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>Yayg\u0131n aral\u0131k se\u00e7iliyken 84 puan BB, 92 puan AA olur.</strong> Ad\u0131m ad\u0131m:</p>
<ul>
<li>84 \u2265 90? Hay\u0131r \u2192 AA de\u011fil.</li>
<li>84 \u2265 85? Hay\u0131r \u2192 BA de\u011fil.</li>
<li>84 \u2265 80? Evet \u2192 harf notun <strong>BB</strong>.</li>
<li>92 \u2265 90? Evet \u2192 harf notun <strong>AA</strong>.</li>
</ul>
<p>Tamamlanm\u0131\u015f bir ba\u015fka \u00f6rnek: <strong>72 puan</strong>, yayg\u0131n aral\u0131kta CC olur (70\u201374); Kent \u00dcniversitesi aral\u0131\u011f\u0131nda CB olur (70\u201379). Ayn\u0131 puan, iki okulda iki harf \u2014 i\u015fte bu y\u00fczden preset se\u00e7imi kritiktir. Bu \u00f6rnekleri yukar\u0131daki araca girerek do\u011frulayabilirsin.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Notunu yaz.</strong> 0\u2013100 aras\u0131 ham ba\u015far\u0131 notunu gir (ondal\u0131k girebilirsin).</li>
<li><strong>Aral\u0131k presetini se\u00e7.</strong> Okuluna en yak\u0131n \u00fcniversite \u00f6rne\u011fini se\u00e7; listede yoksa "Yayg\u0131n \u00d6rnek" ile ba\u015fla.</li>
<li><strong>Gerekirse alt s\u0131n\u0131rlar\u0131 d\u00fczenle.</strong> Her harfin alt s\u0131n\u0131r\u0131n\u0131 okulunun senato karar\u0131ndaki de\u011fere g\u00f6re de\u011fi\u015ftirebilirsin.</li>
<li><strong>Harfi oku.</strong> Sonu\u00e7 kutusu harfi ve hangi aral\u0131\u011fa denk geldi\u011fini g\u00f6sterir.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>Harfin, se\u00e7ili aral\u0131\u011fa g\u00f6re 100'l\u00fck kar\u015f\u0131l\u0131\u011f\u0131n\u0131 ve GANO katsay\u0131n\u0131 a\u015fa\u011f\u0131daki \u00fc\u00e7l\u00fc tablodan okursun.</strong> (Yayg\u0131n \u00f6rnek aral\u0131k.)</p>
<table class="bilgi-tablosu">
<caption>100'l\u00fck \u2194 harf \u2194 katsay\u0131 (\u00fc\u00e7l\u00fc tablo, yayg\u0131n \u00f6rnek)</caption>
<thead><tr><th>100'l\u00fck Aral\u0131k</th><th>Harf</th><th>Katsay\u0131</th><th>Durum</th></tr></thead>
<tbody>
<tr><td>90 \u2013 100</td><td><strong>AA</strong></td><td>4,00</td><td>Ge\u00e7ti</td></tr>
<tr><td>85 \u2013 89</td><td><strong>BA</strong></td><td>3,50</td><td>Ge\u00e7ti</td></tr>
<tr><td>80 \u2013 84</td><td><strong>BB</strong></td><td>3,00</td><td>Ge\u00e7ti</td></tr>
<tr><td>75 \u2013 79</td><td><strong>CB</strong></td><td>2,50</td><td>Ge\u00e7ti</td></tr>
<tr><td>70 \u2013 74</td><td><strong>CC</strong></td><td>2,00</td><td>Ge\u00e7ti</td></tr>
<tr><td>65 \u2013 69</td><td><strong>DC</strong></td><td>1,50</td><td>\u015eartl\u0131*</td></tr>
<tr><td>60 \u2013 64</td><td><strong>DD</strong></td><td>1,00</td><td>\u015eartl\u0131*</td></tr>
<tr><td>50 \u2013 59</td><td><strong>FD</strong></td><td>0,50</td><td>Kald\u0131</td></tr>
<tr><td>0 \u2013 49</td><td><strong>FF</strong></td><td>0,00</td><td>Kald\u0131</td></tr>
</tbody>
</table>
<p>*\u015eartl\u0131: DC/DD, GANO 2,00 ve \u00fczeriyse ge\u00e7er say\u0131l\u0131r; alt\u0131ndaysa kalmaya d\u00f6ner (okula g\u00f6re de\u011fi\u015fir).</p>

<h2>Hangi \u00dcniversite Hangi Bantlar\u0131 Kullan\u0131yor?</h2>
<p><strong>Alt harf bantlar\u0131 \u00fcniversiteden \u00fcniversiteye de\u011fi\u015fir; \u00fcst \u00fc\u00e7 harf (AA/BA/BB) neredeyse her yerde ayn\u0131d\u0131r.</strong> Bu sayfadaki be\u015f ger\u00e7ek preset yan yana:</p>
<table class="bilgi-tablosu">
<caption>\u00dcniversite bant kar\u015f\u0131la\u015ft\u0131rmas\u0131 (alt s\u0131n\u0131rlar)</caption>
<thead><tr><th>Harf</th><th>Yayg\u0131n</th><th>Kent \u00dcni.</th><th>GT\u00dc</th><th>\u0130st. Ayd\u0131n</th><th>Sakarya</th></tr></thead>
<tbody>
<tr><td>AA</td><td>90</td><td>90</td><td>90</td><td>90</td><td>90</td></tr>
<tr><td>BA</td><td>85</td><td>85</td><td>85</td><td>85</td><td>85</td></tr>
<tr><td>BB</td><td>80</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
<tr><td>CB</td><td>75</td><td>70</td><td>75</td><td>75</td><td>75</td></tr>
<tr><td>CC</td><td>70</td><td>60</td><td>70</td><td>70</td><td>65</td></tr>
<tr><td>DC</td><td>65</td><td>55</td><td>65</td><td>60</td><td>58</td></tr>
<tr><td>DD</td><td>60</td><td>50</td><td>60</td><td>50</td><td>50</td></tr>
<tr><td>FD</td><td>50</td><td>\u2014</td><td>50</td><td>40</td><td>\u2014</td></tr>
</tbody>
</table>
<p>Tabloyu oku: <strong>62 puan</strong> Yayg\u0131n/GT\u00dc'de DD, Kent'te CC, \u0130stanbul Ayd\u0131n'da DC olur. Hi\u00e7bir rakip sayfa bu kar\u015f\u0131la\u015ft\u0131rmay\u0131 yapmaz; \u00e7o\u011fu tek tabloyu evrenselmi\u015f gibi sunar (biri CC'yi 60\u201365 yazar \u2014 yanl\u0131\u015f).</p>

<h2>S\u0131n\u0131r De\u011ferler: 84,9 ile 85,0 Aras\u0131ndaki 0,1 Puan</h2>
<p><strong>S\u0131n\u0131rda 0,1 puan bile harfi de\u011fi\u015ftirir: 84,9 BB'dir, 85,0 BA'dir.</strong> Bu 0,50 katsay\u0131 fark\u0131 demektir.</p>
<p>\u00dc\u00e7 pratik sonu\u00e7 \u00e7\u0131kar:</p>
<ul>
<li><strong>Yuvarlama politikas\u0131n\u0131 \u00f6\u011fren.</strong> Baz\u0131 hocalar 84,5'i 85'e yuvarlar, baz\u0131lar\u0131 yuvarlamaz. Kural ders izlencesinde yazar.</li>
<li><strong>84\u201386 band\u0131ndaysan 1 puan i\u00e7in itiraz etmeye de\u011fer.</strong> S\u0131nav k\u00e2\u011f\u0131d\u0131ndaki 1 puanl\u0131k hata, BA ile BB aras\u0131ndaki farkt\u0131r.</li>
<li><strong>Hedefini s\u0131n\u0131r\u0131n 1\u20132 puan \u00fcst\u00fcne koy.</strong> BA istiyorsan 85'i de\u011fil 87'yi hedefle; g\u00fcven pay\u0131 b\u0131rak.</li>
</ul>

<h2>\u00d6zel Harfler ve Ko\u015fullu Ge\u00e7me</h2>
<p><strong>AA\u2013FF d\u0131\u015f\u0131ndaki harfler dersin durumunu anlat\u0131r; \u00e7o\u011fu GANO'ya girmez.</strong></p>
<ul>
<li><strong>FD:</strong> Ba\u015far\u0131s\u0131z ama FF'ten hafif; katsay\u0131s\u0131 0,50'dir. Baz\u0131 okullarda b\u00fct\u00fcnleme hakk\u0131 tan\u0131r.</li>
<li><strong>G (Ge\u00e7er) / K (Kal\u0131r):</strong> Kredisiz derslerde kullan\u0131l\u0131r; GANO'yu etkilemez.</li>
<li><strong>W (\u00c7ekilme):</strong> Dersten \u00e7ekilme; transkriptte g\u00f6r\u00fcn\u00fcr, ortalamaya girmez.</li>
<li><strong>I (Eksik) / MZ (Mazeret):</strong> Tamamlanmam\u0131\u015f de\u011ferlendirme; s\u00fcre dolunca harfe d\u00f6n\u00fc\u015f\u00fcr.</li>
</ul>
<p><strong>Ko\u015fullu ge\u00e7me:</strong> DC/DD notlar\u0131, GANO 2,00 ve \u00fczeriyse "ge\u00e7ti" say\u0131l\u0131r; 2,00'nin alt\u0131ndaysa bu dersler kalmaya d\u00f6ner ve tekrarlanmal\u0131d\u0131r. Transkriptte harf ayn\u0131 kal\u0131r, durumu GANO belirler.</p>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7 se\u00e7ili aral\u0131\u011fa g\u00f6re matematiksel olarak do\u011fru harfi verir; ama \u00fc\u00e7 \u00f6nemli s\u0131n\u0131r\u0131 vard\u0131r.</strong></p>
<ul>
<li><strong>Aral\u0131k senato karar\u0131d\u0131r.</strong> Okulunun g\u00fcncel bantlar\u0131n\u0131 \u00f6\u011frenci i\u015flerinden teyit et; bu sayfadaki presetler \u00f6rnektir.</li>
<li><strong>\u00c7an e\u011frisi derslerinde ge\u00e7ersizdir.</strong> Ba\u011f\u0131l de\u011ferlendirmede harf, s\u0131n\u0131f da\u011f\u0131l\u0131m\u0131na g\u00f6re belirlenir \u2014 <a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a> sayfas\u0131n\u0131 kullan.</li>
<li><strong>A\u00d6F'de ge\u00e7ersizdir.</strong> A\u00e7\u0131k\u00f6\u011fretimde harf, 35 baraj\u0131 sonras\u0131 ba\u011f\u0131l de\u011ferlendirmeyle belirlenir \u2014 <a href="../aof-not-hesaplama/">A\u00d6F Not Hesaplama</a> sayfas\u0131na bak.</li>
</ul>

<h2>Mutlak De\u011ferlendirme vs \u00c7an E\u011frisi</h2>
<p><strong>\u0130ki sistemin fark\u0131, harfin neye g\u00f6re belirlendi\u011fidir: sabit tabloya m\u0131, s\u0131n\u0131fa m\u0131?</strong></p>
<table class="bilgi-tablosu">
<caption>De\u011ferlendirme sistemleri kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th></th><th>Mutlak</th><th>Ba\u011f\u0131l (\u00c7an E\u011frisi)</th></tr></thead>
<tbody>
<tr><td>Harf neye g\u00f6re?</td><td>Sabit aral\u0131k tablosu</td><td>S\u0131n\u0131f ortalamas\u0131 ve da\u011f\u0131l\u0131m\u0131 (z/T)</td></tr>
<tr><td>84 puan</td><td>Her zaman BB (yayg\u0131n)</td><td>S\u0131n\u0131fa g\u00f6re AA da olur CC de</td></tr>
<tr><td>\u00d6ng\u00f6r\u00fclebilirlik</td><td>Y\u00fcksek: hedefi ba\u015ftan bilirsin</td><td>D\u00fc\u015f\u00fck: s\u0131n\u0131f\u0131 beklemen gerekir</td></tr>
<tr><td>Do\u011fru ara\u00e7</td><td>Bu sayfa</td><td><a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a></td></tr>
</tbody>
</table>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>Okulunun ger\u00e7ek harf aral\u0131klar\u0131n\u0131 d\u00f6nem ba\u015f\u0131nda \u00f6\u011frenci i\u015flerinden ya da ders izlencesinden \u00f6\u011fren.</li>
<li>Hedef harfini erken belirle: BB istiyorsan 80 baraj\u0131n\u0131, BA istiyorsan 85 baraj\u0131n\u0131 kovala.</li>
<li>\u00c7an e\u011frisi olan derste mutlak nota de\u011fil, s\u0131n\u0131f i\u00e7indeki konumuna odaklan.</li>
<li>T\u00fcm derslerinin harfleriyle genel ortalaman i\u00e7in <a href="../gano-hesaplama/">GANO Hesaplama</a> arac\u0131n\u0131 kullan.</li>
</ul>
""",
"faqs": [
("100'l\u00fck not harf notuna nas\u0131l \u00e7evrilir?", "Notun, \u00fcniversitenin belirledi\u011fi aral\u0131klara g\u00f6re harfe denk gelir. AA=90+, BA=85\u201389, BB=80\u201384 \u00e7ekirde\u011fi neredeyse her okulda ayn\u0131d\u0131r; alt harflerde aral\u0131klar de\u011fi\u015fir. Bu ara\u00e7ta 5 ger\u00e7ek \u00fcniversite preseti haz\u0131rd\u0131r."),
("Harf aral\u0131klar\u0131 neden \u00fcniversiteden \u00fcniversiteye de\u011fi\u015fiyor?", "\u00c7\u00fcnk\u00fc aral\u0131klar\u0131 her \u00fcniversitenin senatosu belirler; ulusal tek bir tablo yoktur. \u00d6rne\u011fin 62 puan Yayg\u0131n aral\u0131kta DD, Kent \u00dcniversitesi'nde CC olur. Okulunun g\u00fcncel aral\u0131klar\u0131n\u0131 \u00f6\u011frenci i\u015flerinden teyit et."),
("Hangi \u00fcniversite hangi bantlar\u0131 kullan\u0131yor?", "Tek tip yok: bu sayfadaki kar\u015f\u0131la\u015ft\u0131rma tablosunda Yayg\u0131n, Kent, GT\u00dc, \u0130stanbul Ayd\u0131n ve Sakarya presetleri yan yana. \u00dcst \u00fc\u00e7 harf (AA/BA/BB) her yerde ayn\u0131d\u0131r; fark alt harflerdedir."),
("84,5 notum BA m\u0131 BB mi olur?", "Se\u00e7ili aral\u0131\u011fa ba\u011fl\u0131: yayg\u0131n \u00f6rnekte 85 alt\u0131 BB'dir, yani 84,5 BB olur. Baz\u0131 okullar bu\u00e7u\u011fu yukar\u0131 yuvarlar; kesin bilgi i\u00e7in hocana ya da \u00f6\u011frenci i\u015flerine sor."),
("76 puan hangi harfe denk gelir?", "Aral\u0131\u011fa g\u00f6re de\u011fi\u015fir: yayg\u0131n aral\u0131kta 76 puan CB'dir (75\u201379); Kent \u00dcniversitesi aral\u0131\u011f\u0131nda da CB'dir (70\u201379). Ama 72 puan yayg\u0131nda CC, Kent'te CB olur \u2014 preset se\u00e7imi bu y\u00fczden kritiktir."),
("FD ile FF aras\u0131ndaki fark nedir?", "\u0130kisi de ba\u015far\u0131s\u0131z say\u0131l\u0131r; ancak FD'nin katsay\u0131s\u0131 0,50'dir ve baz\u0131 okullarda b\u00fct\u00fcnleme hakk\u0131 tan\u0131r ya da ortalamay\u0131 FF kadar d\u00fc\u015f\u00fcrmez. Okulunun y\u00f6netmeli\u011findeki kar\u015f\u0131l\u0131\u011f\u0131na bak."),
("DC ve DD ile ders ge\u00e7ilir mi?", "Ko\u015fullu ge\u00e7me: GANO'n 2,00 ve \u00fczeriyse DC/DD ge\u00e7er say\u0131l\u0131r; 2,00'nin alt\u0131ndaysa bu dersler kalmaya d\u00f6ner ve tekrarlanmal\u0131d\u0131r. Uygulama okula g\u00f6re de\u011fi\u015fir."),
("W (\u00e7ekilme) notu ortalamay\u0131 etkiler mi?", "Hay\u0131r. W, dersten \u00e7ekildi\u011fini g\u00f6sterir; transkriptte g\u00f6r\u00fcn\u00fcr ama GANO paydayas\u0131na girmez. Ayn\u0131 \u015fekilde MU, G ve \u0130Z notlar\u0131 da ortalamay\u0131 etkilemez."),
("\u00c7an e\u011frisi uygulanan derste bu ara\u00e7 i\u015fe yarar m\u0131?", "Ham 100'l\u00fck notunu harfe \u00e7evirmek i\u00e7in evet; ama \u00e7an e\u011frisinde harf, s\u0131n\u0131f\u0131n da\u011f\u0131l\u0131m\u0131na g\u00f6re belirlenir. Onun i\u00e7in \u00c7an E\u011frisi Hesaplama arac\u0131n\u0131 kullan."),
("Girdi\u011fim not bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notun hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 4: CAN EGRISI ====================
PAGES["universite-not/can-egrisi-hesaplama"] = {
"title": "\u00c7an E\u011frisi Hesaplama | PuanRobotu",
"meta": "Z ve T puan\u0131nla \u00e7an e\u011frisinde harfini tahmin et: \u00e7al\u0131\u015f\u0131lm\u0131\u015f s\u0131n\u0131f \u00f6rne\u011fi, 7-d\u00fczey da\u011f\u0131l\u0131m tablosu, alt limit ve s\u0131n\u0131f mevcudu kurallar\u0131. \u00dccretsiz, an\u0131nda sonu\u00e7.",
"ogdesc": "Z ve T puan\u0131nla \u00e7an e\u011frisinde harfini tahmin et: s\u0131n\u0131f ortalamas\u0131 ve standart sapmayla \u00fccretsiz ara\u00e7.",
"lede": "\u00c7an e\u011frisi (ba\u011f\u0131l de\u011ferlendirme), <strong>harf notunun ham puana de\u011fil s\u0131n\u0131f i\u00e7indeki konumuna g\u00f6re belirlendi\u011fi sistemdir</strong>: z = (Notun \u2212 Ortalama) \u00f7 Standart Sapma, T = 10 \u00d7 z + 50. Notunu, s\u0131n\u0131f ortalamas\u0131n\u0131 ve sapmay\u0131 yaz; z/T puan\u0131n\u0131 ve tahmini harfini g\u00f6r.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>z = (Notun \u2212 S\u0131n\u0131f Ortalamas\u0131) \u00f7 Standart Sapma; T = 10 \u00d7 z + 50.</strong> z, ortalamadan ka\u00e7 sapma uzakta oldu\u011funu g\u00f6sterir.</li>
<li><strong>Ayn\u0131 70 puan, ortalamas\u0131 55 olan s\u0131n\u0131fta AA getirir; ortalamas\u0131 75 olan s\u0131n\u0131fta CC getirir.</strong> \u00c7an e\u011frisinde mutlak nota de\u011fil konuma bak\u0131l\u0131r.</li>
<li>T\u2192harf aral\u0131klar\u0131n\u0131 her \u00fcniversitenin senatosu belirler; bu sayfadaki AA\u226565, BB\u226555, CC\u226545, DD\u226535 aral\u0131klar\u0131 yayg\u0131n bir \u00f6rnektir.</li>
<li>S\u0131n\u0131f mevcudu k\u00fc\u00e7\u00fckse (genelde 30'un alt\u0131) \u00e7an uygulanmaz; mutlak sisteme d\u00f6n\u00fcl\u00fcr.</li>
<li>z ve T matematiksel olarak kesindir; harf tahmini, \u00f6rnek aral\u0131\u011fa g\u00f6re yap\u0131l\u0131r.</li>
</ul>
</div>

<h2>\u00c7an E\u011frisi (Ba\u011f\u0131l De\u011ferlendirme) Nedir?</h2>
<p><strong>\u00c7an e\u011frisi, harf notunun \u00f6\u011frencinin ham puan\u0131na de\u011fil, s\u0131n\u0131f\u0131n not da\u011f\u0131l\u0131m\u0131 i\u00e7indeki g\u00f6reli konumuna g\u00f6re belirlendi\u011fi de\u011ferlendirme sistemidir.</strong> S\u0131nav zorduysa s\u0131n\u0131f ortalamas\u0131 d\u00fc\u015fer ve d\u00fc\u015f\u00fck ham puanlar bile y\u00fcksek harf getirebilir; s\u0131nav kolaysa tersi olur.</p>
<p>Sistemin mant\u0131\u011f\u0131: her not \u00f6nce standart bir puana (\u00f6nce z, sonra T) d\u00f6n\u00fc\u015ft\u00fcr\u00fcl\u00fcr; harfler bu standart puan\u0131n aral\u0131klar\u0131na g\u00f6re da\u011f\u0131t\u0131l\u0131r. B\u00f6ylece farkl\u0131 zorluktaki s\u0131navlar\u0131n notlar\u0131 kar\u015f\u0131la\u015ft\u0131r\u0131labilir h\u00e2le gelir.</p>
<p>\u00c7an e\u011frisi bir "puan y\u00fckseltme" de\u011fildir: s\u0131n\u0131f\u0131n yar\u0131s\u0131 her zaman ortalaman\u0131n alt\u0131nda kal\u0131r. Kolay s\u0131navda y\u00fcksek ham puan, e\u011fride vasat bir konuma denk gelebilir.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Notunu, s\u0131n\u0131f ortalamas\u0131n\u0131 ve standart sapmay\u0131 al\u0131r; z ve T puan\u0131n\u0131 hesaplar, \u00f6rnek harf aral\u0131\u011f\u0131na g\u00f6re tahmini harfi g\u00f6sterir.</strong></p>
<p><strong>z = (Notun \u2212 S\u0131n\u0131f Ortalamas\u0131) \u00f7 Standart Sapma.</strong> z=1,5 demek "ortalaman\u0131n 1,5 sapma \u00fcst\u00fcndesin" demektir. z=0 tam ortalamad\u0131r; negatif z ortalaman\u0131n alt\u0131ndad\u0131r.</p>
<p><strong>T = 10 \u00d7 z + 50.</strong> T, z'yi herkesin anlayaca\u011f\u0131 bir \u00f6l\u00e7e\u011fe ta\u015f\u0131r: s\u0131n\u0131f ortalamas\u0131 her zaman T=50 olur, 1 sapma \u00fcst\u00fc T=60't\u0131r. Farkl\u0131 derslerin notlar\u0131 bu \u00f6l\u00e7ekte k\u0131yaslanabilir.</p>
<p>Harf ad\u0131m\u0131: T puanın, sayfadaki \u00f6rnek aral\u0131k tablosundaki (AA\u226565, BB\u226555, CC\u226545, DD\u226535) yerine g\u00f6re harfe \u00e7evrilir. Bu aral\u0131klar\u0131 kendi okuluna g\u00f6re d\u00fczenleyebilirsin.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>Notun 70, s\u0131n\u0131f ortalamas\u0131 55, standart sapma 10 ise z=1,5, T=65 olur ve \u00f6rnek aral\u0131kta AA getirir.</strong></p>
<ul>
<li>z = (70 \u2212 55) \u00f7 10 = <strong>1,5</strong></li>
<li>T = 10 \u00d7 1,5 + 50 = <strong>65</strong></li>
<li>\u00d6rnek aral\u0131kta T \u2265 65 \u2192 tahmini harf <strong>AA</strong>; s\u0131n\u0131f\u0131n en \u00fcst dilimindesin.</li>
</ul>
<p>Bu \u00f6rne\u011fi yukar\u0131daki araca girerek do\u011frulayabilirsin. \u015eimdi g\u00f6relili\u011fin g\u00fcc\u00fcne dikkat: ayn\u0131 70 puan, s\u0131n\u0131f ortalamas\u0131 75 olsayd\u0131 z = (70\u221275)\u00f710 = <strong>\u22120,5</strong> ve T = <strong>45</strong> olurdu \u2014 yani ayn\u0131 not, kolay bir s\u0131n\u0131fta ortalaman\u0131n alt\u0131nda kal\u0131rd\u0131 ve CC getirirdi.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Notunu yaz.</strong> Ham ba\u015far\u0131 notunu (vize+final a\u011f\u0131rl\u0131kl\u0131) gir.</li>
<li><strong>S\u0131n\u0131f ortalamas\u0131n\u0131 yaz.</strong> Hocan\u0131n a\u00e7\u0131klad\u0131\u011f\u0131 ya da \u00f6\u011frenci sistemindeki s\u0131n\u0131f ortalamas\u0131.</li>
<li><strong>Standart sapmay\u0131 yaz.</strong> Bilmiyorsan tipik de\u011fer 8\u201312 aral\u0131\u011f\u0131ndad\u0131r; ama ger\u00e7ek de\u011feri hocandan \u00f6\u011fren.</li>
<li><strong>z, T ve harfi oku.</strong> T\u2192harf aral\u0131klar\u0131n\u0131 okuluna g\u00f6re d\u00fczenleyebilirsin.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>z, konumunu; T, \u00f6l\u00e7e\u011fi; harf, tahmini sonucu g\u00f6sterir.</strong></p>
<table class="bilgi-tablosu">
<caption>z/T puan\u0131n\u0131n anlam\u0131 (\u00f6rnek harf aral\u0131\u011f\u0131yla)</caption>
<thead><tr><th>z Aral\u0131\u011f\u0131</th><th>T Aral\u0131\u011f\u0131</th><th>Konumun</th><th>\u00d6rnek Harf</th></tr></thead>
<tbody>
<tr><td>z \u2265 1,5</td><td>T \u2265 65</td><td>En \u00fcst dilim</td><td><strong>AA</strong></td></tr>
<tr><td>0,5 \u2264 z &lt; 1,5</td><td>55 \u2013 64</td><td>Ortalaman\u0131n belirgin \u00fcst\u00fc</td><td><strong>BB</strong></td></tr>
<tr><td>\u22120,5 \u2264 z &lt; 0,5</td><td>45 \u2013 54</td><td>Ortalama \u00e7evresi</td><td><strong>CC</strong></td></tr>
<tr><td>\u22121,5 \u2264 z &lt; \u22120,5</td><td>35 \u2013 44</td><td>Ortalaman\u0131n alt\u0131</td><td><strong>DD</strong></td></tr>
<tr><td>z &lt; \u22121,5</td><td>T &lt; 35</td><td>En alt dilim</td><td><strong>FF</strong></td></tr>
</tbody>
</table>
<p>Tabloyu oku: z=0 (tam ortalama) her zaman T=50 verir ve \u00f6rnek aral\u0131kta CC'ye denk gelir. z'nin i\u015fareti, ortalaman\u0131n \u00fcst\u00fcnde mi alt\u0131nda m\u0131 oldu\u011funun en h\u0131zl\u0131 g\u00f6stergesidir.</p>

<h2>Ayn\u0131 70 Puan, \u0130ki S\u0131n\u0131f, \u0130ki Harf</h2>
<p><strong>\u00c7an e\u011frisinde notun de\u011fil, s\u0131n\u0131f\u0131n belirler.</strong> \u00dc\u00e7 senaryoyu yan yana koy:</p>
<table class="bilgi-tablosu">
<caption>Ayn\u0131 70 puan\u0131n \u00fc\u00e7 s\u0131n\u0131ftaki kar\u015f\u0131l\u0131\u011f\u0131 (\u03c3=10)</caption>
<thead><tr><th>Senaryo</th><th>S\u0131n\u0131f Ort.</th><th>z</th><th>T</th><th>\u00d6rnek Harf</th></tr></thead>
<tbody>
<tr><td>Zor s\u0131nav</td><td>55</td><td>1,5</td><td>65</td><td><strong>AA</strong></td></tr>
<tr><td>Normal s\u0131nav</td><td>65</td><td>0,5</td><td>55</td><td><strong>BB</strong></td></tr>
<tr><td>Kolay s\u0131nav</td><td>75</td><td>\u22120,5</td><td>45</td><td><strong>CC</strong></td></tr>
</tbody>
</table>
<p>Hi\u00e7bir rakip sayfa bu kar\u015f\u0131la\u015ft\u0131rmay\u0131 say\u0131yla yapmaz. Pratik sonu\u00e7: \u00e7an e\u011frisi olan derste hedefin "y\u00fcksek not" de\u011fil, "ortalaman\u0131n \u00fczerinde konum" olmal\u0131d\u0131r. Ortalaman\u0131n 1 sapma \u00fcst\u00fc (z\u22651) genelde \u00fcst harfleri getirir.</p>

<h2>S\u0131n\u0131f Ortalamas\u0131na G\u00f6re Harf Da\u011f\u0131l\u0131m\u0131: 7-D\u00fczey Tablosu</h2>
<p><strong>Resmi y\u00f6nergeler, s\u0131n\u0131f ortalamas\u0131na g\u00f6re harflerin y\u00fczdesel da\u011f\u0131l\u0131m\u0131n\u0131 \u00f6nceden belirler.</strong> \u00d6rnek olarak OM\u00dc ba\u011f\u0131l de\u011ferlendirme y\u00f6nergesindeki 7 d\u00fczeyden biri:</p>
<table class="bilgi-tablosu">
<caption>\u00d6rnek da\u011f\u0131l\u0131m: s\u0131n\u0131f ortalamas\u0131 70\u201379,99 ("Pekiyi" d\u00fczeyi)</caption>
<thead><tr><th>Harf</th><th>AA</th><th>BA</th><th>BB</th><th>CB</th><th>CC</th><th>DC</th><th>DD</th><th>FF</th></tr></thead>
<tbody><tr><td><strong>S\u0131n\u0131f y\u00fczdesi</strong></td><td>%24</td><td>%15,2</td><td>%22,8</td><td>%11,6</td><td>%17,4</td><td>%4,8</td><td>%3,2</td><td>%1</td></tr></tbody>
</table>
<p>Tabloyu oku: ortalamas\u0131 70\u201379,99 olan bir s\u0131n\u0131fta \u00f6\u011frencilerin %24'\u00fc AA al\u0131r. S\u0131n\u0131f ortalamas\u0131 d\u00fc\u015ft\u00fck\u00e7e y\u00fczdeler de\u011fi\u015fir; her \u00fcniversitenin kendi y\u00f6nergesinde kendi tablosu vard\u0131r. Bu y\u00fczdeler \u00fcniversiteden \u00fcniversiteye de\u011fi\u015fir \u2014 okulunun y\u00f6nergesindeki tabloya bak.</p>

<h2>Alt Limit, S\u0131n\u0131f Mevcudu ve Final Baraj\u0131</h2>
<p><strong>\u00c7an e\u011frisinin \u00fc\u00e7 kritik kural\u0131 vard\u0131r; hi\u00e7bir rakip sayfa \u00fc\u00e7\u00fcn\u00fc bir arada anlatmaz.</strong></p>
<ul>
<li><strong>Alt limit:</strong> Baz\u0131 y\u00f6nergelerde ba\u011f\u0131l de\u011ferlendirme ortalamas\u0131 belirli bir de\u011ferin (yayg\u0131n \u00f6rnek: 30) alt\u0131ndaysa e\u011fri uygulanmaz; d\u00fc\u015f\u00fck notlar do\u011frudan FF olur.</li>
<li><strong>S\u0131n\u0131f mevcudu:</strong> Ba\u011f\u0131l de\u011ferlendirme istatistiksel anlaml\u0131l\u0131k i\u00e7in yeterli mevcuda ihtiya\u00e7 duyar; yayg\u0131n kural 30 ki\u015finin alt\u0131ndaki s\u0131n\u0131flarda e\u011fri uygulanmamas\u0131, mutlak sisteme d\u00f6n\u00fclmesidir. 15\u201329 aral\u0131\u011f\u0131nda \u00f6zel h\u00fck\u00fcmler uygulanabilir.</li>
<li><strong>Final baraj\u0131 × e\u011fri:</strong> Okulun final baraj\u0131 varsa (\u00f6rn. finalden en az 50), e\u011fri bu baraj\u0131 kald\u0131rmaz: baraj\u0131n alt\u0131ndaki not e\u011friye girmeden FF olur. Uygulama y\u00f6nergeye g\u00f6re de\u011fi\u015fir.</li>
</ul>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>z ve T puanlar\u0131 matematiksel olarak kesindir; ama harf ad\u0131m\u0131nda \u00fc\u00e7 s\u0131n\u0131r vard\u0131r.</strong></p>
<ul>
<li><strong>T\u2192harf aral\u0131klar\u0131 \u00f6rnektir.</strong> Ger\u00e7ek aral\u0131klar\u0131 her \u00fcniversitenin senatosu belirler; ulusal tek tablo yoktur. Okulunun aral\u0131klar\u0131n\u0131 kutulardan d\u00fczenle.</li>
<li><strong>Standart sapma kritiktir.</strong> Sapma k\u00fc\u00e7\u00fckse (herkes birbirine yak\u0131nsa) 1\u20132 puanl\u0131k fark bile harfi de\u011fi\u015ftirir. Tahmini sapmayla karar verme.</li>
<li><strong>A\u00d6F'de ge\u00e7ersizdir.</strong> A\u00e7\u0131k\u00f6\u011fretimde ba\u011f\u0131l de\u011ferlendirme kald\u0131r\u0131lm\u0131\u015ft\u0131r; harf 35 baraj\u0131 sonras\u0131 kendi sistemine g\u00f6re belirlenir \u2014 <a href="../aof-not-hesaplama/">A\u00d6F Not Hesaplama</a> sayfas\u0131na bak.</li>
</ul>

<h2>Ba\u011f\u0131l vs Mutlak De\u011ferlendirme</h2>
<p><strong>Fark, harfin sabit tabloya m\u0131 s\u0131n\u0131fa m\u0131 g\u00f6re belirlendi\u011fidir.</strong></p>
<table class="bilgi-tablosu">
<caption>De\u011ferlendirme sistemleri kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th></th><th>Mutlak</th><th>Ba\u011f\u0131l (\u00c7an E\u011frisi)</th></tr></thead>
<tbody>
<tr><td>Harf neye g\u00f6re?</td><td>Sabit aral\u0131k tablosu</td><td>S\u0131n\u0131f ortalamas\u0131 ve da\u011f\u0131l\u0131m\u0131 (z/T)</td></tr>
<tr><td>70 puan</td><td>Her zaman CC (yayg\u0131n)</td><td>S\u0131n\u0131fa g\u00f6re AA da olur CC de</td></tr>
<tr><td>Strateji</td><td>Hedef nota odaklan</td><td>S\u0131n\u0131f i\u00e7indeki konumuna odaklan</td></tr>
<tr><td>Do\u011fru ara\u00e7</td><td><a href="../harf-notu-hesaplama/">Harf Notu Hesaplama</a></td><td>Bu sayfa</td></tr>
</tbody>
</table>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>Dersin \u00e7an e\u011frisiyle mi yoksa mutlak sistemle mi de\u011ferlendirildi\u011fini d\u00f6nem ba\u015f\u0131nda ders izlencesinden \u00f6\u011fren.</li>
<li>E\u011fri varsa mutlak nota de\u011fil konuma odaklan: ortalaman\u0131n 1 sapma \u00fcst\u00fc genelde \u00fcst harfleri getirir.</li>
<li>S\u0131n\u0131f ortalamas\u0131n\u0131 ve sapmay\u0131 \u00f6\u011frenmeden harf tahmini yapma.</li>
<li>T\u2192harf aral\u0131klar\u0131n\u0131 okulunun senato karar\u0131ndan teyit et; bu sayfadaki aral\u0131klar \u00f6rnektir.</li>
</ul>
""",
"faqs": [
("\u00c7an e\u011frisi nedir?", "Ba\u011f\u0131l de\u011ferlendirmedir: harf notun, ham puan\u0131n\u0131n s\u0131n\u0131f\u0131n ortalamas\u0131na ve da\u011f\u0131l\u0131m\u0131na g\u00f6re belirlenir. Form\u00fcl: z = (Notun \u2212 Ortalama) \u00f7 Standart Sapma; T = 10 \u00d7 z + 50."),
("z puan\u0131 nas\u0131l hesaplan\u0131r?", "z = (Notun \u2212 S\u0131n\u0131f Ortalamas\u0131) \u00f7 Standart Sapma. \u00d6rne\u011fin notun 70, ortalama 55, sapma 10 ise z = 1,5 olur; yani ortalaman\u0131n 1,5 sapma \u00fcst\u00fcndesin."),
("T puan\u0131 ne anlama gelir?", "T = 10 \u00d7 z + 50; z'yi 50 ortalamal\u0131 bir \u00f6l\u00e7e\u011fe ta\u015f\u0131r. S\u0131n\u0131f ortalamas\u0131 her zaman T=50'dir; T=65, ortalaman\u0131n 1,5 sapma \u00fcst\u00fc demektir. Farkl\u0131 dersler bu \u00f6l\u00e7ekte k\u0131yaslan\u0131r."),
("Ayn\u0131 not farkl\u0131 derste farkl\u0131 harf getirir mi?", "Evet, \u00e7an e\u011frisinde bu normaldir. 70 puan, ortalamas\u0131 55 olan s\u0131n\u0131fta AA getirirken ortalamas\u0131 75 olan s\u0131n\u0131fta CC getirir. Harf s\u0131n\u0131fa g\u00f6re belirlenir, ham puana g\u00f6re de\u011fil."),
("S\u0131n\u0131f ortalamas\u0131 \u00e7ok y\u00fcksekse ne olur?", "Y\u00fcksek ortalama, e\u011friyi yukar\u0131 ta\u015f\u0131r: iyi ham puanlar bile vasat harf getirebilir. \u00d6rne\u011fin ortalama 75, sapma 10 iken 70 puan z=\u22120,5 ve T=45 olur; \u00f6rnek aral\u0131kta CC demektir."),
("Dersimde \u00e7an e\u011frisi var m\u0131, nas\u0131l \u00f6\u011frenirim?", "Ders izlencesine bak; de\u011ferlendirme b\u00f6l\u00fcm\u00fcnde 'ba\u011f\u0131l de\u011ferlendirme' yaz\u0131yorsa \u00e7an uygulan\u0131r. Yazm\u0131yorsa hocana ya da \u00f6\u011frenci i\u015flerine sor."),
("S\u0131n\u0131f mevcudu azsa \u00e7an uygulan\u0131r m\u0131?", "Genelde hay\u0131r. Ba\u011f\u0131l de\u011ferlendirme istatistiksel anlaml\u0131l\u0131k i\u00e7in yeterli mevcuda ihtiya\u00e7 duyar; yayg\u0131n kural 30 ki\u015finin alt\u0131ndaki s\u0131n\u0131flarda mutlak sisteme d\u00f6n\u00fclmesidir."),
("Final baraj\u0131 \u00e7an e\u011frisini ezer mi?", "Okulun final baraj\u0131 varsa e\u011fri onu kald\u0131rmaz: baraj\u0131n alt\u0131ndaki not e\u011friye girmeden FF olur. Uygulama y\u00f6nergeye g\u00f6re de\u011fi\u015fir; kesin kural\u0131 \u00f6\u011frenci i\u015flerinden \u00f6\u011fren."),
("z puan\u0131m negatifse ne olur?", "Notunun ortalaman\u0131n alt\u0131nda oldu\u011fu anlam\u0131na gelir. z = \u22121, ortalaman\u0131n 1 standart sapma alt\u0131 demektir; T puanın 40 olur."),
("Girdi\u011fim notlar bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notlar\u0131n hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 5: AOF ====================
PAGES["universite-not/aof-not-hesaplama"] = {
"title": "A\u00d6F Not Hesaplama | PuanRobotu",
"meta": "A\u00d6F ba\u015far\u0131 notunu resmi form\u00fclle hesapla: Ara %30 + D\u00f6nem Sonu %70, 35 baraj kontrol\u00fc, 4-yanl\u0131\u015f cezas\u0131 ve Anadolu/ATA/AUZEF kar\u015f\u0131la\u015ft\u0131rmas\u0131. \u00dccretsiz ara\u00e7.",
"ogdesc": "A\u00d6F ba\u015far\u0131 notunu resmi form\u00fclle hesapla: %30/%70 a\u011f\u0131rl\u0131k, 35 baraj kontrol\u00fc ve harf tahminiyle \u00fccretsiz ara\u00e7.",
"lede": "A\u00d6F ba\u015far\u0131 notu, <strong>Ara S\u0131nav \u00d7 0,30 + D\u00f6nem Sonu \u00d7 0,70 form\u00fcl\u00fcyle hesaplan\u0131r</strong>; 35'in alt\u0131ndaki not otomatik FF olur. Notlar\u0131n\u0131 yaz, baraj durumunu ve tahmini harfini an\u0131nda g\u00f6r.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>Ba\u015far\u0131 Notu = Ara S\u0131nav \u00d7 0,30 + D\u00f6nem Sonu \u00d7 0,70.</strong> Bu oran Anadolu A\u00d6F'nin resmi form\u00fcl\u00fcd\u00fcr.</li>
<li><strong>35 baraj\u0131:</strong> Ba\u015far\u0131 notun 35'in alt\u0131nda kal\u0131rsa harf notun otomatik <strong>FF</strong> olur \u2014 e\u011fri bile kurtarmaz.</li>
<li><strong>4 yanl\u0131\u015f 1 do\u011fruyu g\u00f6t\u00fcr\u00fcr:</strong> Net = Do\u011fru \u2212 (Yanl\u0131\u015f \u00f7 4). Bo\u015f b\u0131rakmak, yanl\u0131\u015f i\u015faretlemekten iyidir.</li>
<li>35 ve \u00fczeri puanlarda harf notu dersin <strong>ba\u011f\u0131l de\u011ferlendirmesine</strong> g\u00f6re belirlenir.</li>
<li>Anadolu, ATA ve AUZEF'nin a\u011f\u0131rl\u0131klar\u0131 farkl\u0131d\u0131r \u2014 a\u015fa\u011f\u0131daki kar\u015f\u0131la\u015ft\u0131rma tablosuna bak.</li>
</ul>
</div>

<h2>A\u00d6F Not Sistemi Nedir?</h2>
<p><strong>A\u00d6F not sistemi, a\u00e7\u0131k\u00f6\u011fretimde ders ba\u015far\u0131 notunun ara s\u0131nav ve d\u00f6nem sonu s\u0131nav\u0131n\u0131n a\u011f\u0131rl\u0131kl\u0131 ortalamas\u0131yla belirlendi\u011fi, 35 barajl\u0131 de\u011ferlendirme modelidir.</strong> Anadolu \u00dcniversitesi Senato kararlar\u0131na g\u00f6re a\u011f\u0131rl\u0131klar %30 ara + %70 d\u00f6nem sonudur.</p>
<p>Sistemi \u00f6rg\u00fcn \u00fcniversitelerden ay\u0131ran iki \u00f6zellik vard\u0131r: <strong>35 baraj\u0131</strong> (ba\u015far\u0131 notu 35'in alt\u0131ndaysa otomatik FF) ve <strong>4-yanl\u0131\u015f-1-do\u011fru cezas\u0131</strong> (her 4 yanl\u0131\u015f 1 do\u011fruyu siler). Bu iki kural, A\u00d6F \u00f6\u011frencisinin s\u0131nav stratejisini do\u011frudan belirler.</p>
<p>Harf notu ise 35 baraj\u0131 ge\u00e7ildikten sonra dersin ba\u011f\u0131l de\u011ferlendirmesine g\u00f6re belirlenir; yani ayn\u0131 puan farkl\u0131 derste farkl\u0131 harf getirebilir.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Ara s\u0131nav ve d\u00f6nem sonu notlar\u0131n\u0131 resmi %30/%70 a\u011f\u0131rl\u0131klarla birle\u015ftirir, 35 baraj\u0131n\u0131 kontrol eder ve harf aral\u0131\u011f\u0131n\u0131 tahmin eder.</strong></p>
<p>Form\u00fcl: <strong>Ba\u015far\u0131 Notu = Ara S\u0131nav \u00d7 0,30 + D\u00f6nem Sonu \u00d7 0,70</strong>.</p>
<p>Baraj kontrol\u00fc: sonu\u00e7 35'in alt\u0131ndaysa harf <strong>FF</strong> yaz\u0131l\u0131r. 35 ve \u00fczerindeyse harf, dersin e\u011frisine g\u00f6re tahmin edilir \u2014 bu tahmin kabaca fikir verir, kesin harf \u00f6\u011frenci bilgi sisteminde a\u00e7\u0131klan\u0131r.</p>
<p>\u0130stisna dersler: \u0130ngilizce \u00f6\u011fretmenli\u011fi program\u0131n\u0131n \u0130ngilizce derslerinde %40/%60; \u00f6devli derslerde %30 ara + %20 \u00f6dev + %50 d\u00f6nem sonu uygulan\u0131r. Bu ara\u00e7 standart %30/%70 modelini kullan\u0131r.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>Ara s\u0131nav\u0131n 60, d\u00f6nem sonu notun 80 ise ba\u015far\u0131 notun 74 olur.</strong></p>
<ul>
<li>Ara katk\u0131: 60 \u00d7 0,30 = <strong>18</strong></li>
<li>D\u00f6nem sonu katk\u0131: 80 \u00d7 0,70 = <strong>56</strong></li>
<li>Ba\u015far\u0131 notu: 18 + 56 = <strong>74</strong> (35 baraj\u0131n\u0131n \u00fcst\u00fcnde \u2713)</li>
</ul>
<p>74 puanla harf notun dersin e\u011frisine g\u00f6re belirlenir; kaba tahmin BB\u2013CB band\u0131 civar\u0131d\u0131r. Bu \u00f6rne\u011fi yukar\u0131daki araca girerek do\u011frulayabilirsin.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Ara s\u0131nav notunu yaz.</strong> 0\u2013100 aras\u0131 ham notunu gir.</li>
<li><strong>D\u00f6nem sonu notunu yaz.</strong> Final yerine ge\u00e7en d\u00f6nem sonu s\u0131nav\u0131n\u0131n notu.</li>
<li><strong>Sonucu oku.</strong> Ba\u015far\u0131 notun, baraj durumun ve tahmini harf aral\u0131\u011f\u0131n g\u00f6r\u00fcn\u00fcr.</li>
<li><strong>Tersini dene.</strong> "Finalden ka\u00e7 almal\u0131y\u0131m?" sorusu i\u00e7in arana hedefledi\u011fin ba\u015far\u0131 notunu verecek d\u00f6nem sonu de\u011ferini farkl\u0131 girdilerle test et.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>Sonu\u00e7 \u00f6nce 35 baraj\u0131na g\u00f6re, sonra harf band\u0131na g\u00f6re okunur.</strong></p>
<table class="bilgi-tablosu">
<caption>A\u00d6F ba\u015far\u0131 notu bantlar\u0131</caption>
<thead><tr><th>Ba\u015far\u0131 Notu</th><th>Durum</th><th>Ne olur?</th></tr></thead>
<tbody>
<tr><td>0 \u2013 34,99</td><td><strong>Baraj alt\u0131</strong></td><td>Otomatik <strong>FF</strong>; e\u011fri uygulanmaz</td></tr>
<tr><td>35 \u2013 100</td><td><strong>Baraj \u00fcst\u00fc</strong></td><td>Harf, dersin ba\u011f\u0131l de\u011ferlendirmesine g\u00f6re belirlenir</td></tr>
</tbody>
</table>
<p>Baraj\u0131 ge\u00e7en notlarda harf tahmini kaba bir aral\u0131kt\u0131r: 70\u201380 band\u0131 genelde BB\u2013CB civar\u0131na denk gelir, ama dersin e\u011frisi dar veya geni\u015fse harf kayar. Kesin harfi \u00f6\u011frenci bilgi sisteminden \u00f6\u011frenirsin.</p>

<h2>35 Baraj Tuza\u011f\u0131: Y\u00fcksek Vize Yetmez</h2>
<p><strong>Ba\u015far\u0131 notun 35'in alt\u0131ndaysa vize notun ka\u00e7 olursa olsun kal\u0131rs\u0131n.</strong> Klasik tuzak senaryosu:</p>
<ul>
<li>Ara s\u0131nav: <strong>85</strong> (m\u00fckemmel)</li>
<li>D\u00f6nem sonu: <strong>30</strong></li>
<li>Ba\u015far\u0131 notu: 85 \u00d7 0,30 + 30 \u00d7 0,70 = 25,5 + 21 = <strong>46,5</strong></li>
<li>46,5 normal bir ge\u00e7me notunun \u00fcst\u00fcnde \u2014 ama d\u00f6nem sonu 35'in alt\u0131nda oldu\u011fu i\u00e7in sonu\u00e7: <strong>FF</strong>.</li>
</ul>
<p>Hi\u00e7bir rakip sayfa bu tuza\u011f\u0131 say\u0131yla g\u00f6stermez; biri kendi i\u00e7inde \u00e7eli\u015fir (35 alt\u0131 FF der, sonra 30 \u00fcst\u00fc e\u011friye girer der). Stratejik sonu\u00e7: \u00f6nce d\u00f6nem sonu baraj\u0131n\u0131 garantile, sonra y\u00fcksek harf kovala.</p>
<p>Ters senaryo da m\u00fcmk\u00fcnd\u00fcr: ara 20 + d\u00f6nem sonu 45 \u2192 6 + 31,5 = <strong>37,5</strong> \u2014 baraj\u0131n \u00fcst\u00fcnde, harf e\u011friye girer.</p>

<h2>4 Yanl\u0131\u015f 1 Do\u011fruyu G\u00f6t\u00fcr\u00fcr: Puan\u0131n Ger\u00e7ek Matemati\u011fi</h2>
<p><strong>A\u00d6F s\u0131navlar\u0131nda her 4 yanl\u0131\u015f cevap 1 do\u011fru cevab\u0131 siler.</strong> Form\u00fcl: <strong>Net = Do\u011fru \u2212 (Yanl\u0131\u015f \u00f7 4)</strong>; puan = Net \u00f7 Soru Say\u0131s\u0131 \u00d7 100.</p>
<p>\u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00f6rnek (20 soruluk s\u0131nav):</p>
<ul>
<li>12 do\u011fru, 8 yanl\u0131\u015f \u2192 Net = 12 \u2212 8\u00f74 = 12 \u2212 2 = <strong>10</strong></li>
<li>Puan = 10 \u00f7 20 \u00d7 100 = <strong>50</strong></li>
<li>Bu 50, ara s\u0131nav\u0131nsa katk\u0131s\u0131 50 \u00d7 0,30 = <strong>15</strong>; d\u00f6nem sonuysa 50 \u00d7 0,70 = <strong>35</strong> olur.</li>
</ul>
<p>Stratejik sonu\u00e7: emin olmad\u0131\u011f\u0131n soruyu bo\u015f b\u0131rakmak, rastgele i\u015faretlemekten iyidir. 4 bo\u015f = 0 kay\u0131p; 4 yanl\u0131\u015f = 1 do\u011fru kayb\u0131. Rakipler bu kural\u0131 s\u00f6yler ama hi\u00e7biri say\u0131ya d\u00f6kmez.</p>

<h2>Ko\u015fullu Ge\u00e7me (CD/DC/DD) ve GNO 2,00 Kural\u0131</h2>
<p><strong>A\u00d6F'de CD, DC ve DD notlar\u0131 ko\u015fullu ge\u00e7er: GNO'n 2,00 ve \u00fczeriyse bu dersler ge\u00e7mi\u015f say\u0131l\u0131r.</strong></p>
<p>Senaryo: \u00fc\u00e7 dersten DD ald\u0131n.</p>
<ul>
<li>GNO'n <strong>1,95</strong> ise \u2192 bu \u00fc\u00e7 ders <strong>kalm\u0131\u015f</strong> say\u0131l\u0131r; mezuniyet i\u00e7in tekrarlanmal\u0131d\u0131r.</li>
<li>GNO'n <strong>2,05</strong> ise \u2192 bu \u00fc\u00e7 ders <strong>ge\u00e7mi\u015f</strong> say\u0131l\u0131r; ek i\u015flem gerekmez.</li>
</ul>
<p>Transkriptte harf ayn\u0131 g\u00f6r\u00fcn\u00fcr; durumu GNO belirler. Bu kural\u0131 hi\u00e7bir rakip sayfa senaryoyla anlatmaz. T\u00fcm derslerinin ortalamas\u0131 i\u00e7in <a href="../gano-hesaplama/">GANO Hesaplama</a> arac\u0131n\u0131 kullan.</p>

<h2>Anadolu vs ATA vs AUZEF: A\u011f\u0131rl\u0131k Kar\u015f\u0131la\u015ft\u0131rmas\u0131</h2>
<p><strong>"A\u00d6F" tek sistem de\u011fildir; \u00fc\u00e7 b\u00fcy\u00fck a\u00e7\u0131k\u00f6\u011fretim kurumunun a\u011f\u0131rl\u0131klar\u0131 farkl\u0131d\u0131r.</strong> Hi\u00e7bir rakip sayfa bu \u00fc\u00e7\u00fcn\u00fc yan yana koymaz.</p>
<table class="bilgi-tablosu">
<caption>A\u00e7\u0131k\u00f6\u011fretim a\u011f\u0131rl\u0131k kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th>Kurum</th><th>Ara S\u0131nav</th><th>D\u00f6nem Sonu</th><th>Not</th></tr></thead>
<tbody>
<tr><td><strong>Anadolu A\u00d6F</strong></td><td>%30</td><td>%70</td><td>35 baraj\u0131; bu sayfan\u0131n form\u00fcl\u00fc</td></tr>
<tr><td><strong>ATA A\u00d6F</strong></td><td>%30 (y\u00fcz y\u00fcze) / %20 (\u00e7evrimi\u00e7i)</td><td>%70 / %80</td><td>S\u0131nav t\u00fcr\u00fcne g\u00f6re de\u011fi\u015fir</td></tr>
<tr><td><strong>\u0130stanbul AUZEF</strong></td><td colspan="2">G\u00fcncel duyuruyu kontrol et</td><td>Oranlar d\u00f6nemsel g\u00fcncellenir</td></tr>
</tbody>
</table>
<p>ATA \u00f6\u011frencisiysen s\u0131nav\u0131n\u0131n t\u00fcr\u00fcne g\u00f6re do\u011fru a\u011f\u0131rl\u0131\u011f\u0131 se\u00e7; yanl\u0131\u015f a\u011f\u0131rl\u0131kla hesaplanan baraj seni yan\u0131lt\u0131r.</p>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7 Anadolu A\u00d6F'nin standart %30/%70 form\u00fcl\u00fcyle matematiksel olarak do\u011fru sonu\u00e7 \u00fcretir; ama \u00fc\u00e7 s\u0131n\u0131r\u0131 vard\u0131r.</strong></p>
<ul>
<li><strong>Harf tahmini kabaca fikir verir.</strong> 35 \u00fczeri puanlarda harf, dersin ba\u011f\u0131l de\u011ferlendirmesine g\u00f6re belirlenir; ayn\u0131 puan farkl\u0131 derste farkl\u0131 harf getirir. Kesin harf \u00f6\u011frenci bilgi sisteminde a\u00e7\u0131klan\u0131r.</li>
<li><strong>\u0130stisna dersler:</strong> \u0130ngilizce \u00f6\u011fretmenli\u011fi \u0130ngilizce dersleri (%40/%60) ve \u00f6devli dersler (%30+%20+%50) farkl\u0131 a\u011f\u0131rl\u0131k kullan\u0131r.</li>
<li><strong>Kurum fark\u0131:</strong> ATA ve AUZEF \u00f6\u011frencileri yukar\u0131daki kar\u015f\u0131la\u015ft\u0131rma tablosundaki kendi a\u011f\u0131rl\u0131klar\u0131n\u0131 kullanmal\u0131d\u0131r.</li>
</ul>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>D\u00f6nem sonunun a\u011f\u0131rl\u0131\u011f\u0131 %70: ara s\u0131nav\u0131n iyi olsa bile d\u00f6nem sonuna girmemek neredeyse kesin FF demektir.</li>
<li>\u00d6nce 35 baraj\u0131n\u0131 garantile; harf hedefini sonra kovalamaya ba\u015fla.</li>
<li>Emin olmad\u0131\u011f\u0131n sorular\u0131 bo\u015f b\u0131rak: 4 yanl\u0131\u015f 1 do\u011fruyu siler.</li>
<li>Dersin ge\u00e7mi\u015f d\u00f6nem harf da\u011f\u0131l\u0131m\u0131n\u0131 \u00f6\u011fren \u2014 ayn\u0131 puan\u0131n hangi harfe denk geldi\u011fini g\u00f6sterir.</li>
<li>\u00c7an e\u011frisinin harfini nas\u0131l belirledi\u011fini merak ediyorsan <a href="../can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a> sayfas\u0131nda z/T form\u00fcl\u00fcn\u00fc incele.</li>
</ul>
""",
"faqs": [
("A\u00d6F ba\u015far\u0131 notu nas\u0131l hesaplan\u0131r?", "Resm\u00ee form\u00fcl: Ba\u015far\u0131 Notu = Ara S\u0131nav \u00d7 0,30 + D\u00f6nem Sonu \u00d7 0,70 (Anadolu \u00dcniversitesi Senato kararlar\u0131). Sonu\u00e7 35'in alt\u0131ndaysa harf otomatik FF olur."),
("35 baraj\u0131 nedir?", "Ba\u015far\u0131 notun 35'in alt\u0131nda kal\u0131rsa harf notun otomatik FF olur; \u00e7an e\u011frisi bile kurtarmaz. Baraj, d\u00f6nem sonu notuna de\u011fil a\u011f\u0131rl\u0131kl\u0131 ba\u015far\u0131 notuna uygulan\u0131r."),
("Vizem y\u00fcksek ama finalim 35'in alt\u0131nda, ge\u00e7er miyim?", "Ba\u015far\u0131 notun 35'in alt\u0131na d\u00fc\u015ferse hay\u0131r. \u00d6rne\u011fin ara 85 + d\u00f6nem sonu 30 \u2192 46,5 puan olmas\u0131na ra\u011fmen FF al\u0131rs\u0131n. \u00d6nce baraj\u0131 garantile."),
("4 yanl\u0131\u015f 1 do\u011fruyu nas\u0131l etkiler?", "Net = Do\u011fru \u2212 (Yanl\u0131\u015f \u00f7 4). \u00d6rne\u011fin 20 soruda 12 do\u011fru + 8 yanl\u0131\u015f \u2192 net 10 \u2192 puan 50. Emin olmad\u0131\u011f\u0131n soruyu bo\u015f b\u0131rakmak, rastgele i\u015faretlemekten iyidir."),
("Harf notum neden hemen belli olmuyor?", "35 ve \u00fczeri puanlarda harf, dersin ba\u011f\u0131l de\u011ferlendirmesine g\u00f6re belirlenir; ayn\u0131 puan farkl\u0131 derste farkl\u0131 harf getirebilir. Kesin harf \u00f6\u011frenci bilgi sisteminde a\u00e7\u0131klan\u0131r."),
("CD, DC, DD ile ge\u00e7ilir mi?", "Ko\u015fullu ge\u00e7me: GNO'n 2,00 ve \u00fczeriyse bu harfler ge\u00e7er say\u0131l\u0131r; 2,00'nin alt\u0131ndaysa dersler kalmaya d\u00f6ner ve tekrarlanmal\u0131d\u0131r."),
("ATA A\u00d6F ile Anadolu A\u00d6F'nin fark\u0131 ne?", "A\u011f\u0131rl\u0131klar farkl\u0131d\u0131r: Anadolu'da %30/%70 sabittir; ATA'da y\u00fcz y\u00fcze s\u0131navda %30/%70, \u00e7evrimi\u00e7i s\u0131navda %20/%80 uygulan\u0131r. Yanl\u0131\u015f a\u011f\u0131rl\u0131kla hesap yapma."),
("Ara s\u0131nav\u0131m iyi ama finale girmedim, ge\u00e7er miyim?", "Genellikle hay\u0131r. D\u00f6nem sonunun a\u011f\u0131rl\u0131\u011f\u0131 %70 oldu\u011fu i\u00e7in \u00f6rne\u011fin ara 80 + final 0 \u2192 ba\u015far\u0131 notu 24 olur ve FF al\u0131rs\u0131n."),
("\u0130stisna dersler var m\u0131?", "Evet: \u0130ngilizce \u00f6\u011fretmenli\u011fi program\u0131n\u0131n \u0130ngilizce derslerinde %40/%60, \u00f6devli derslerde %30+%20+%50 uygulan\u0131r. Bu ara\u00e7 standart %30/%70 modelini kullan\u0131r."),
("Girdi\u011fim notlar bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notlar\u0131n hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 6: NOT DONUSUMU ====================
PAGES["universite-not/not-donusumu"] = {
"title": "4,00 \u2013 100 Not D\u00f6n\u00fc\u015f\u00fcm\u00fc | PuanRobotu",
"meta": "Y\u00d6K tablosuyla 4,00'l\u00fck notunu 100'l\u00fck sisteme \u00e7evir: \u00e7ift y\u00f6nl\u00fc d\u00f6n\u00fc\u015ft\u00fcr\u00fcc\u00fc, hangi tablo kime uygun, yanl\u0131\u015f form\u00fcl uyar\u0131s\u0131. \u00dccretsiz, an\u0131nda ve do\u011fru sonu\u00e7.",
"ogdesc": "Y\u00d6K tablosuyla 4,00'l\u00fck notunu 100'l\u00fck sisteme \u00e7evir: \u00e7ift y\u00f6nl\u00fc, enterpolasyonlu \u00fccretsiz ara\u00e7.",
"lede": "Not d\u00f6n\u00fc\u015f\u00fcm\u00fc, <strong>4,00'l\u00fck notunun Y\u00d6K'\u00fcn resmi tablosundaki 100'l\u00fck kar\u015f\u0131l\u0131\u011f\u0131n\u0131 bulmakt\u0131r</strong>: \u00f6rne\u011fin 3,50 \u2192 88,33. Notunu yaz, \u00e7ift y\u00f6nl\u00fc sonucu an\u0131nda g\u00f6r.",
"guide": """<div class="ozet-kutu">
<h2>\u00d6ne \u00c7\u0131kanlar</h2>
<ul>
<li><strong>3,50 (4,00'l\u00fck) = 88,33 (100'l\u00fck).</strong> D\u00f6n\u00fc\u015f\u00fcm Y\u00d6K'ün resmi tablosuyla yap\u0131l\u0131r; "\u00d725" \u00e7arp\u0131m\u0131 yanl\u0131\u015ft\u0131r.</li>
<li>Tabloda yazmayan ara de\u011ferler (3,55 gibi) iki kom\u015fu sat\u0131r aras\u0131nda <strong>do\u011frusal enterpolasyonla</strong> bulunur.</li>
<li><strong>(Not\u22122)\u00d720+60 form\u00fcl\u00fc yanl\u0131\u015ft\u0131r:</strong> 2,00'da 6,67 puan sapt\u0131r\u0131r \u2014 a\u015fa\u011f\u0131daki hata tablosuna bak.</li>
<li>\u00d6SYM/KPSS ba\u015fvurular\u0131nda Y\u00d6K tablosu; okul i\u00e7i i\u015flerde \u00fcniversitenin kendi tablosu ge\u00e7erlidir.</li>
<li>Tablo 1,00 (30,00) ile 4,00 (100,00) aral\u0131\u011f\u0131n\u0131 kapsar; d\u0131\u015f\u0131ndaki de\u011ferler \u00e7evrilmez.</li>
</ul>
</div>

<h2>Not D\u00f6n\u00fc\u015f\u00fcm\u00fc Nedir?</h2>
<p><strong>Not d\u00f6n\u00fc\u015f\u00fcm\u00fc, 4,00'l\u00fck sistemdeki bir notun 100'l\u00fck sistemdeki resmi kar\u015f\u0131l\u0131\u011f\u0131n\u0131 (veya tersini) Y\u00d6K'ün yay\u0131mlad\u0131\u011f\u0131 tabloya g\u00f6re bulma i\u015flemidir.</strong> T\u00fcrkiye'de transkriptler 4,00'l\u00fck sistemle tutulur; ama KPSS, ALES ve bir\u00e7ok i\u015f ba\u015fvurusu 100'l\u00fck de\u011fer ister.</p>
<p>D\u00f6n\u00fc\u015f\u00fcm do\u011frusal de\u011fildir: 4,00 \u2192 100 iken 2,00 \u2192 53,33't\u00fcr ("\u00d725" \u00e7arp\u0131m\u0131 50 verirdi \u2014 yanl\u0131\u015f). Bu y\u00fczden ezber form\u00fcller de\u011fil, resmi tablo kullan\u0131l\u0131r.</p>
<p>Kilit sat\u0131rlar: 4,00 \u2192 100,00 · 3,50 \u2192 88,33 · 3,00 \u2192 76,66 · 2,50 \u2192 65,00 · 2,00 \u2192 53,33 · 1,00 \u2192 30,00.</p>

<h2>Bu Hesaplay\u0131c\u0131 Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>Notunu Y\u00d6K tablosundaki sat\u0131rlarla e\u015fle\u015ftirir; birebir kar\u015f\u0131l\u0131k yoksa iki kom\u015fu sat\u0131r aras\u0131nda do\u011frusal enterpolasyon yapar.</strong> Her iki y\u00f6n de desteklenir: 4,00 \u2192 100 ve 100 \u2192 4,00.</p>
<p>Enterpolasyonun mant\u0131\u011f\u0131: tablo sat\u0131rlar\u0131 aras\u0131ndaki art\u0131\u015f neredeyse sabittir (0,01 ba\u015f\u0131na \u2248 0,23). \u00d6rne\u011fin 3,55, 3,50 (88,33) ile 3,60 (90,66) sat\u0131rlar\u0131n\u0131n tam ortas\u0131d\u0131r \u2192 <strong>89,50</strong>.</p>
<p>Tablo 1,00 (30,00) ile 4,00 (100,00) aral\u0131\u011f\u0131n\u0131 kapsar. Bu aral\u0131\u011f\u0131n d\u0131\u015f\u0131ndaki de\u011ferler i\u00e7in ara\u00e7 sonu\u00e7 \u00fcretmez; uydurma de\u011fer vermek yerine tablo d\u0131\u015f\u0131n\u0131 a\u00e7\u0131k\u00e7a belirtir.</p>

<h2>Form\u00fcl ve \u00c7al\u0131\u015f\u0131lm\u0131\u015f \u00d6rnek</h2>
<p><strong>GANO'n 3,50 ise KPSS ba\u015fvurusu i\u00e7in 100'l\u00fck kar\u015f\u0131l\u0131\u011f\u0131 88,33't\u00fcr.</strong></p>
<ul>
<li>Tabloda 3,50 sat\u0131r\u0131: <strong>88,33</strong> \u2192 birebir kar\u015f\u0131l\u0131k.</li>
<li>Tersi de \u00e7al\u0131\u015f\u0131r: 88,33 yaz \u2192 <strong>3,50</strong> bulunur.</li>
<li>Ara de\u011fer: 3,55, 3,50 (88,33) ile 3,60 (90,66) sat\u0131rlar\u0131n\u0131n tam ortas\u0131d\u0131r \u2192 <strong>89,50</strong>.</li>
</ul>
<p>Bu \u00f6rne\u011fi yukar\u0131daki araca girerek do\u011frulayabilirsin. "3,50 \u00d7 25 = 87,5" hesab\u0131n\u0131n 0,83 puan sapt\u0131\u011f\u0131na dikkat et \u2014 k\u00fc\u00e7\u00fck farklar s\u0131ralamada b\u00fcy\u00fck fark yarat\u0131r.</p>

<h2>Hesaplay\u0131c\u0131 Nas\u0131l Kullan\u0131l\u0131r?</h2>
<ol>
<li><strong>Y\u00f6n\u00fc se\u00e7.</strong> 4,00 \u2192 100 veya 100 \u2192 4,00 d\u00f6n\u00fc\u015f\u00fcm y\u00f6n\u00fcn\u00fc belirle.</li>
<li><strong>Notunu yaz.</strong> Ondal\u0131k de\u011fer girebilirsin (3,55 gibi).</li>
<li><strong>Sonucu oku.</strong> Birebir kar\u015f\u0131l\u0131k veya enterpolasyon sonucu g\u00f6r\u00fcn\u00fcr; hangi y\u00f6ntemin kullan\u0131ld\u0131\u011f\u0131 belirtilir.</li>
<li><strong>Tablo d\u0131\u015f\u0131 uyar\u0131s\u0131na dikkat et.</strong> 1,00'\u0131n alt\u0131 veya 4,00'\u0131n \u00fcst\u00fc de\u011ferlerde ara\u00e7 sonu\u00e7 \u00fcretmez.</li>
</ol>

<h2>Sonucunu Nas\u0131l Okursun?</h2>
<p><strong>Sonu\u00e7, Y\u00d6K tablosundaki resmi kar\u015f\u0131l\u0131kt\u0131r; ba\u015fvuru formuna oldu\u011fu gibi yaz\u0131l\u0131r.</strong> \u00dc\u00e7 kritik nokta:</p>
<ul>
<li><strong>Yuvarlama:</strong> 88,33 ile 88,5 ayn\u0131 \u015fey de\u011fildir. Formda tablodaki de\u011feri aynen kullan; kendi yuvarlaman\u0131 yapma.</li>
<li><strong>Transkript de\u011feri:</strong> Baz\u0131 okullar transkripte d\u00f6n\u00fc\u015f\u00fcm\u00fc kendisi yazar; \u00f6yleyse formdaki de\u011ferle \u00e7ak\u0131\u015fmal\u0131d\u0131r.</li>
<li><strong>Ara de\u011fer i\u015fareti:</strong> Enterpolasyonla bulunan sonu\u00e7lar tablonun mant\u0131\u011f\u0131yla tutarl\u0131d\u0131r; ama resmiyette "hesaplanm\u0131\u015f de\u011fer" oldu\u011funu bil.</li>
</ul>

<h2>Hangi Tablo Sana Uygun? Y\u00d6K vs \u00dcniversite Tablolar\u0131</h2>
<p><strong>Tek "do\u011fru" tablo yoktur; do\u011fru tablo ba\u015fvurdu\u011fun kuruma g\u00f6re de\u011fi\u015fir.</strong> Hi\u00e7bir rakip sayfa bu ayr\u0131m\u0131 yapmaz.</p>
<table class="bilgi-tablosu">
<caption>Hangi durumda hangi tablo?</caption>
<thead><tr><th>Durum</th><th>Kullan\u0131lacak tablo</th></tr></thead>
<tbody>
<tr><td>KPSS, ALES, \u00d6SYM ba\u015fvurular\u0131</td><td><strong>Y\u00d6K tablosu</strong> (bu sayfadaki)</td></tr>
<tr><td>Y\u00fcksek lisans ba\u015fvurusu (d\u0131\u015f \u00fcniversite)</td><td><strong>Y\u00d6K tablosu</strong> (ilan ba\u015fka demedik\u00e7e)</td></tr>
<tr><td>Kendi \u00fcniversitenin i\u00e7 i\u015flemleri</td><td><strong>\u00dcniversitenin senato tablosu</strong></td></tr>
</tbody>
</table>
<p>Fark\u0131n b\u00fcy\u00fckl\u00fc\u011f\u00fcne dikkat: <strong>2,00</strong> Y\u00d6K tablosunda <strong>53,33</strong>; baz\u0131 \u00fcniversite tablolar\u0131nda <strong>62,50</strong> kar\u015f\u0131l\u0131\u011f\u0131ndad\u0131r. Yanl\u0131\u015f tabloyla beyan edilen 9 puanl\u0131k fark, ba\u015fvurunu etkiler. \u0130lan metninde "Y\u00d6K d\u00f6n\u00fc\u015f\u00fcm tablosu" yaz\u0131yorsa bu sayfadaki tabloyu kullan.</p>

<h2>Yanl\u0131\u015f Form\u00fcl Uyar\u0131s\u0131: (Not\u22122)\u00d720+60</h2>
<p><strong>\u0130nternette dola\u015fan "(4'l\u00fck not \u2212 2,00) \u00d7 20 + 60" form\u00fcl\u00fc yanl\u0131\u015ft\u0131r.</strong> Y\u00d6K tablosuyla kar\u015f\u0131la\u015ft\u0131r:</p>
<table class="bilgi-tablosu">
<caption>Yanl\u0131\u015f form\u00fcl\u00fcn hata tablosu</caption>
<thead><tr><th>4,00'l\u00fck</th><th>Form\u00fcl sonucu</th><th>Y\u00d6K tablosu</th><th>Hata</th></tr></thead>
<tbody>
<tr><td>2,00</td><td>60,00</td><td><strong>53,33</strong></td><td>+6,67</td></tr>
<tr><td>2,50</td><td>70,00</td><td><strong>65,00</strong></td><td>+5,00</td></tr>
<tr><td>3,00</td><td>80,00</td><td><strong>76,66</strong></td><td>+3,34</td></tr>
<tr><td>3,50</td><td>90,00</td><td><strong>88,33</strong></td><td>+1,67</td></tr>
<tr><td>4,00</td><td>100,00</td><td><strong>100,00</strong></td><td>0</td></tr>
</tbody>
</table>
<p>Form\u00fcl yaln\u0131zca 4,00'da do\u011fru sonu\u00e7 verir; 2,00\u20133,00 band\u0131nda 3\u20137 puan <strong>y\u00fcksek</strong> g\u00f6sterir. Bu form\u00fcl\u00fc \u00f6neren sayfalar\u0131 g\u00f6r\u00fcrsen tabloyla kar\u015f\u0131la\u015ft\u0131r. Hi\u00e7bir rakip bu hatay\u0131 i\u015faretlemez.</p>

<h2>Ba\u015fvuru Senaryolar\u0131</h2>
<p><strong>D\u00f6n\u00fc\u015f\u00fcm\u00fcn ger\u00e7ek hayattaki \u00fc\u00e7 kullan\u0131m\u0131:</strong></p>
<ul>
<li><strong>KPSS ba\u015fvurusu:</strong> Diploma notun 4,00'l\u00fckse \u00d6SYM, Y\u00d6K tablosundaki kar\u015f\u0131l\u0131\u011f\u0131 ister. GANO 3,20 \u2192 yakla\u015f\u0131k 80,66 (enterpolasyonla).</li>
<li><strong>Y\u00fcksek lisans:</strong> \u0130lan "lisans mezuniyet notu (100'l\u00fck)" istiyorsa d\u00f6n\u00fc\u015f\u00fcm\u00fc bu tabloyla yap; ilan "4,00 \u00fczerinden" istiyorsa d\u00f6n\u00fc\u015ft\u00fcrme.</li>
<li><strong>\u0130\u015f ba\u015fvurusu:</strong> Form "100 \u00fczerinden not ortalamas\u0131" soruyorsa Y\u00d6K kar\u015f\u0131l\u0131\u011f\u0131n\u0131 yaz; yan\u0131na parantezle 4,00'l\u00fck de\u011feri eklemek \u015feffafl\u0131k sa\u011flar.</li>
</ul>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7 Y\u00d6K'ün resmi tablosunu kullan\u0131r; ama \u00fc\u00e7 s\u0131n\u0131r\u0131 vard\u0131r.</strong></p>
<ul>
<li><strong>Tablo d\u0131\u015f\u0131:</strong> 1,00'\u0131n alt\u0131 ve 4,00'\u0131n \u00fcst\u00fc de\u011ferler \u00e7evrilmez; ara\u00e7 uydurma de\u011fer \u00fcretmez.</li>
<li><strong>\u00dcniversite fark\u0131:</strong> Baz\u0131 \u00fcniversiteler kendi d\u00f6n\u00fc\u015f\u00fcm tablolar\u0131n\u0131 yay\u0131mlar (farkl\u0131 kar\u015f\u0131l\u0131klar verebilir). Ba\u015fvuru yapaca\u011f\u0131n kurumun hangi tabloyu istedi\u011fini teyit et.</li>
<li><strong>Transkript \u00f6nceli\u011fi:</strong> Okulun transkripte d\u00f6n\u00fc\u015f\u00fcm\u00fc kendisi yazd\u0131ysa o de\u011fer esast\u0131r.</li>
</ul>

<h2>Y\u00d6K Tablosu vs \u00dcniversite Tablolar\u0131</h2>
<p><strong>Tablolar birbirini tutmaz; bu y\u00fczden "hangi tablo" sorusu "ka\u00e7 olur" sorusundan \u00f6nce gelir.</strong></p>
<table class="bilgi-tablosu">
<caption>Ayn\u0131 notun farkl\u0131 tablolardaki kar\u015f\u0131l\u0131\u011f\u0131 (\u00f6rnek)</caption>
<thead><tr><th>4,00'l\u00fck</th><th>Y\u00d6K tablosu</th><th>\u00d6rnek \u00fcniversite tablosu</th></tr></thead>
<tbody>
<tr><td>4,00</td><td>100,00</td><td>100,00</td></tr>
<tr><td>3,00</td><td>76,66</td><td>76,66</td></tr>
<tr><td>2,00</td><td><strong>53,33</strong></td><td><strong>62,50</strong></td></tr>
</tbody>
</table>
<p>\u00dcst bantlarda tablolar yak\u0131nsar; fark 2,00 civar\u0131nda b\u00fcy\u00fcr. \u0130lan "Y\u00d6K d\u00f6n\u00fc\u015f\u00fcm tablosu" diyorsa bu sayfadaki de\u011feri kullan.</p>

<h2>\u0130pu\u00e7lar\u0131</h2>
<ul>
<li>Ba\u015fvuruda istenen tabloyu teyit et: Y\u00d6K tablosu ile \u00fcniversitenin kendi tablosu farkl\u0131 sonu\u00e7 verebilir.</li>
<li>Yuvarlama farklar\u0131na dikkat: 88,33 ile 88,5 ayn\u0131 \u015fey de\u011fildir; tablodaki resmi de\u011feri kullan.</li>
<li>Hen\u00fcz GANO'nu hesaplamad\u0131ysan <a href="../gano-hesaplama/">GANO Hesaplama</a> arac\u0131yla 4,00'l\u00fck ortalaman\u0131 bul, sonra buraya yaz.</li>
<li>100'l\u00fck notlar\u0131n\u0131n harf kar\u015f\u0131l\u0131klar\u0131 i\u00e7in <a href="../harf-notu-hesaplama/">Harf Notu Hesaplama</a> arac\u0131na bak.</li>
</ul>
""",
"faqs": [
("4,00'l\u00fck not 100'l\u00fck sisteme nas\u0131l \u00e7evrilir?", "Y\u00d6K'\u00fcn resmi d\u00f6n\u00fc\u015f\u00fcm tablosuna g\u00f6re birebir kar\u015f\u0131l\u0131k bulunur; tabloda olmayan ara de\u011ferler do\u011frusal enterpolasyonla hesaplan\u0131r. \u00d6rne\u011fin 3,50 \u2192 88,33."),
("Bu tabloyu kim haz\u0131rlad\u0131?", "Y\u00d6K'\u00fcn yay\u0131mlad\u0131\u011f\u0131 resmi not d\u00f6n\u00fc\u015f\u00fcm tablosudur. Baz\u0131 \u00fcniversiteler kendi tablolar\u0131n\u0131 kullan\u0131r; ba\u015fvuru yapaca\u011f\u0131n kurumun istedi\u011fi tabloyu teyit et."),
("3,55 gibi ara de\u011ferler nas\u0131l hesaplan\u0131yor?", "Tablonun iki kom\u015fu sat\u0131r\u0131 aras\u0131nda do\u011frusal enterpolasyon yap\u0131l\u0131r: 3,55, 3,50 (88,33) ile 3,60 (90,66) sat\u0131rlar\u0131n\u0131n tam ortas\u0131d\u0131r ve 89,50 bulunur."),
("2,00 ka\u00e7 puan olur?", "Y\u00d6K tablosuna g\u00f6re 2,00 \u2192 53,33. Dikkat: baz\u0131 \u00fcniversite tablolar\u0131nda 2,00 \u2192 62,50'dir; ba\u015fvurunun hangi tabloyu istedi\u011fini kontrol et."),
("(Not\u22122)\u00d720+60 form\u00fcl\u00fc do\u011fru mu?", "Hay\u0131r. Bu form\u00fcl yaln\u0131zca 4,00'da do\u011fru sonu\u00e7 verir; 2,00'da 60 g\u00f6sterirken resmi kar\u015f\u0131l\u0131k 53,33't\u00fcr. 2,00\u20133,00 band\u0131nda 3\u20137 puan y\u00fcksek g\u00f6sterir; tabloyu kullan."),
("Hangi ba\u015fvuruda hangi tablo kullan\u0131l\u0131r?", "KPSS, ALES ve \u00d6SYM ba\u015fvurular\u0131nda Y\u00d6K tablosu; kendi \u00fcniversitenin i\u00e7 i\u015flemlerinde \u00fcniversitenin senato tablosu ge\u00e7erlidir. \u0130lan metni 'Y\u00d6K d\u00f6n\u00fc\u015f\u00fcm tablosu' diyorsa bu sayfadaki tabloyu kullan."),
("100'l\u00fck notu 4,00'e \u00e7evirmek neden gerekli?", "KPSS, ALES, y\u00fcksek lisans ve baz\u0131 i\u015f ba\u015fvurular\u0131 100'l\u00fck sistem ister; diploma notun 4,00'l\u00fckse bu ara\u00e7la resmi kar\u015f\u0131l\u0131\u011f\u0131n\u0131 bulursun."),
("1,00'\u0131n alt\u0131 neden \u00e7evrilmiyor?", "Y\u00d6K tablosu 1,00 (30,00) ile 4,00 (100,00) aral\u0131\u011f\u0131n\u0131 kapsar; bu aral\u0131\u011f\u0131n d\u0131\u015f\u0131 tablo d\u0131\u015f\u0131d\u0131r ve ara\u00e7 uydurma de\u011fer \u00fcretmez."),
("Yuvarlama nas\u0131l yap\u0131l\u0131r?", "Tablodaki de\u011feri aynen kullan; kendi yuvarlaman\u0131 yapma. 88,33 ile 88,5 ayn\u0131 \u015fey de\u011fildir ve ba\u015fvuru formunda resmi de\u011fer esast\u0131r."),
("Girdi\u011fim not bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. T\u00fcm hesaplama taray\u0131c\u0131nda yap\u0131l\u0131r; notun hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== PAGE 7: HUB ====================
HUB = {
"title": "\u00dcniversite Not Ara\u00e7lar\u0131 \u2014 Vize, GANO, Harf Notu | PuanRobotu",
"meta": "6 \u00fccretsiz \u00fcniversite not arac\u0131: vize-final hesaplay\u0131c\u0131, GANO/AGNO, harf notu, \u00e7an e\u011frisi, A\u00d6F ve 4,00\u2013100 d\u00f6n\u00fc\u015f\u00fcm\u00fc. Hangi ara\u00e7 ne i\u00e7in? An\u0131nda sonu\u00e7.",
"ogdesc": "6 \u00fccretsiz \u00fcniversite not arac\u0131: vize-final, GANO, harf notu, \u00e7an e\u011frisi, A\u00d6F ve not d\u00f6n\u00fc\u015f\u00fcm\u00fc. Hangi ara\u00e7 ne i\u00e7in?",
"lede": "<strong>Bu kategori, \u00fcniversitede notla ilgili 6 \u00fccretsiz hesaplay\u0131c\u0131y\u0131 toplar:</strong> vize-final, GANO, harf notu, \u00e7an e\u011frisi, A\u00d6F ve 4,00\u2013100 d\u00f6n\u00fc\u015f\u00fcm\u00fc. A\u015fa\u011f\u0131daki tablodan sorununa uyan arac\u0131 se\u00e7; t\u00fcm hesaplamalar taray\u0131c\u0131nda yap\u0131l\u0131r, kay\u0131t gerekmez.",
"guide": """<h2>\u00dcniversitede Not Sistemi Nas\u0131l \u00c7al\u0131\u015f\u0131r?</h2>
<p><strong>T\u00fcrkiye'de ders ge\u00e7me notu genelde vize (%40) + final (%60) a\u011f\u0131rl\u0131\u011f\u0131yla bulunur; 100'l\u00fck not harfe, harf 4,00'l\u00fck de\u011fere, t\u00fcm derslerin a\u011f\u0131rl\u0131kl\u0131 ortalamas\u0131 da GANO'ya d\u00f6n\u00fc\u015f\u00fcr.</strong> Zincir \u015f\u00f6yle i\u015fler:</p>
<ol>
<li><strong>Vize + Final \u2192 Ba\u015far\u0131 Notu (100'l\u00fck):</strong> V \u00d7 0,40 + F \u00d7 0,60. Dersin gerektirdi\u011fi harf \u00f6nce bu puandan ge\u00e7er.</li>
<li><strong>Ba\u015far\u0131 Notu \u2192 Harf:</strong> Mutlak sistemde sabit tabloya, \u00e7an e\u011frisinde s\u0131n\u0131f\u0131n z/T puan\u0131na g\u00f6re (AA, BA, BB, CB, CC, DC, DD, FF).</li>
<li><strong>Harf \u2192 4,00'l\u00fck De\u011fer:</strong> AA=4,00 \u00b7 BA=3,50 \u00b7 BB=3,00 \u00b7 CB=2,50 \u00b7 CC=2,00 \u00b7 DC=1,50 \u00b7 DD=1,00 \u00b7 FF=0,00 (yayg\u0131n).</li>
<li><strong>T\u00fcm Dersler \u2192 GANO:</strong> Her dersin de\u011feri kredisiyle \u00e7arp\u0131l\u0131r, toplam krediye b\u00f6l\u00fcn\u00fcr. Mezuniyette GANO 2,00 \u00fcst\u00fc ko\u015fulu yayg\u0131nd\u0131r.</li>
</ol>
<p>Bu zincirin her halkas\u0131 i\u00e7in a\u015fa\u011f\u0131da bir ara\u00e7 var: zinciri k\u0131rmadan hesapla.</p>

<h2>Hangi Ara\u00e7 Ne \u0130\u00e7in? 6 Arac\u0131n H\u0131zl\u0131 Rehberi</h2>
<p><strong>Sorunu bul, kar\u015f\u0131s\u0131ndaki arac\u0131 a\u00e7:</strong></p>
<table class="bilgi-tablosu">
<caption>\u00dcniversite not ara\u00e7lar\u0131 kar\u015f\u0131la\u015ft\u0131rma tablosu</caption>
<thead><tr><th>Sorun</th><th>Ara\u00e7</th><th>Girdi</th><th>\u00c7\u0131kt\u0131</th></tr></thead>
<tbody>
<tr><td>"Finalden ka\u00e7 almal\u0131y\u0131m?"</td><td><a href="vize-final-hesaplama/">Vize\u2013Final Hesaplama</a></td><td>Vize, hedef harf</td><td>Gereken final notu</td></tr>
<tr><td>"Ortalamam ka\u00e7?"</td><td><a href="gano-hesaplama/">GANO Hesaplama</a></td><td>Ders + kredi + harf</td><td>D\u00f6nem ortalamas\u0131 ve GANO</td></tr>
<tr><td>"Bu puan hangi harf?"</td><td><a href="harf-notu-hesaplama/">Harf Notu Hesaplama</a></td><td>100'l\u00fck not</td><td>Harf (5 haz\u0131r tablo)</td></tr>
<tr><td>"E\u011fride harfim ne olur?"</td><td><a href="can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a></td><td>Not, ortalama, sapma</td><td>z/T ve tahmini harf</td></tr>
<tr><td>"A\u00d6F'den ge\u00e7er miyim?"</td><td><a href="aof-not-hesaplama/">A\u00d6F Not Hesaplama</a></td><td>Ara, d\u00f6nem sonu</td><td>Ba\u015far\u0131 notu + baraj kontrol\u00fc</td></tr>
<tr><td>"4,00'l\u00fck notum 100'l\u00fck ka\u00e7?"</td><td><a href="not-donusumu/">Not D\u00f6n\u00fc\u015f\u00fcm\u00fc</a></td><td>4,00 veya 100'l\u00fck not</td><td>Y\u00d6K tablosu kar\u015f\u0131l\u0131\u011f\u0131</td></tr>
</tbody>
</table>
<p>Yayg\u0131n ak\u0131\u015f: d\u00f6nem i\u00e7i <a href="vize-final-hesaplama/">Vize\u2013Final Hesaplama</a> ile hedef finali bul, d\u00f6nem sonu <a href="gano-hesaplama/">GANO Hesaplama</a> ile ortalaman\u0131 \u00e7\u0131kar, KPSS/ALES ba\u015fvurusu \u00f6ncesi <a href="not-donusumu/">Not D\u00f6n\u00fc\u015f\u00fcm\u00fc</a> ile 100'l\u00fck kar\u015f\u0131l\u0131\u011f\u0131 al.</p>

<h2>Mutlak, \u00c7an E\u011frisi, A\u00d6F: Hangi Sistem Sana Uygun?</h2>
<p><strong>Sistemi okulun ve program\u0131n belirler; ara\u00e7 se\u00e7imini ona g\u00f6re yap.</strong></p>
<table class="bilgi-tablosu">
<caption>\u00dc\u00e7 not sistemi kar\u015f\u0131la\u015ft\u0131rmas\u0131</caption>
<thead><tr><th></th><th>Mutlak</th><th>\u00c7an E\u011frisi</th><th>A\u00d6F</th></tr></thead>
<tbody>
<tr><td>Harf neye g\u00f6re?</td><td>Sabit aral\u0131k tablosu</td><td>S\u0131n\u0131f ortalamas\u0131 ve da\u011f\u0131l\u0131m\u0131 (z/T)</td><td>35 baraj\u0131 + ba\u011f\u0131l e\u011fri</td></tr>
<tr><td>Do\u011fru ara\u00e7</td><td><a href="harf-notu-hesaplama/">Harf Notu Hesaplama</a></td><td><a href="can-egrisi-hesaplama/">\u00c7an E\u011frisi Hesaplama</a></td><td><a href="aof-not-hesaplama/">A\u00d6F Not Hesaplama</a></td></tr>
<tr><td>Kilit kural</td><td>Tablo sabit</td><td>Konum her \u015fey</td><td>Baraj \u00f6nce, e\u011fri sonra</td></tr>
</tbody>
</table>
<p>Hangi sistemin sana uyguland\u0131\u011f\u0131n\u0131 ders izlencesinden \u00f6\u011fren: "ba\u011f\u0131l de\u011ferlendirme" yaz\u0131yorsa \u00e7an, yazm\u0131yorsa mutlak uygulan\u0131r. A\u00d6F \u00f6\u011frencisiysen do\u011frudan A\u00d6F arac\u0131n\u0131 kullan.</p>

<h2>S\u0131n\u0131rlamalar</h2>
<p><strong>Bu ara\u00e7lar matematiksel olarak do\u011fru hesap yapar; ama okulunun kurallar\u0131 esast\u0131r.</strong></p>
<ul>
<li>Vize/final a\u011f\u0131rl\u0131klar\u0131, harf aral\u0131klar\u0131 ve barajlar okuldan okula de\u011fi\u015fir; sayfalardaki varsay\u0131lan de\u011ferler en yayg\u0131n olanlard\u0131r.</li>
<li>\u00c7an e\u011frisi ve A\u00d6F sayfalar\u0131ndaki harf tahminleri e\u011friye dayal\u0131 tahmindir; kesin harf \u00f6\u011frenci bilgi sisteminde a\u00e7\u0131klan\u0131r.</li>
<li>Not d\u00f6n\u00fc\u015f\u00fcm\u00fc Y\u00d6K tablosunu kullan\u0131r; baz\u0131 kurumlar kendi tablolar\u0131n\u0131 ister.</li>
</ul>
""",
"faqs": [
("Finalden ka\u00e7 almal\u0131y\u0131m?", "Hedefledi\u011fin harf, vizen ve okulunun vize/final a\u011f\u0131rl\u0131klar\u0131na ba\u011fl\u0131d\u0131r. <a href=\"vize-final-hesaplama/\">Vize\u2013Final Hesaplama</a> arac\u0131na vizeni ve hedefini yaz; gereken final notunu ters hesaplamayla an\u0131nda g\u00f6r."),
("GANO nas\u0131l hesaplan\u0131r?", "Her dersin harf notu de\u011feri (AA=4,00 \u00b7 BA=3,50 \u00b7 BB=3,00 \u00b7 CB=2,50 \u00b7 CC=2,00 \u00b7 DC=1,50 \u00b7 DD=1,00 \u00b7 FF=0,00) kredisiyle \u00e7arp\u0131l\u0131r, toplam krediye b\u00f6l\u00fcn\u00fcr. 4 dersin i\u00e7in <a href=\"gano-hesaplama/\">GANO Hesaplama</a> arac\u0131n\u0131 kullan."),
("\u00c7an e\u011frisi nedir?", "Ba\u011f\u0131l de\u011ferlendirme: harf notun ham puan\u0131na de\u011fil, s\u0131n\u0131f\u0131n ortalamas\u0131na ve da\u011f\u0131l\u0131m\u0131na g\u00f6re belirlenir (z/T puan\u0131yla). S\u0131n\u0131f ortalamas\u0131 y\u00fcksekse ayn\u0131 puan daha d\u00fc\u015f\u00fck harf getirir. z/T matemati\u011fi i\u00e7in <a href=\"can-egrisi-hesaplama/\">\u00c7an E\u011frisi Hesaplama</a> sayfas\u0131na bak."),
("Hangi not sistemi bana uygulan\u0131r, nas\u0131l \u00f6\u011frenirim?", "Ders izlencesinin de\u011ferlendirme b\u00f6l\u00fcm\u00fcne bak: 'ba\u011f\u0131l de\u011ferlendirme' yaz\u0131yorsa \u00e7an e\u011frisi, yazm\u0131yorsa mutlak sistem uygulan\u0131r. A\u00d6F \u00f6\u011frencisiysen A\u00d6F'n\u00fcn kendi sistemi ge\u00e7erlidir."),
("A\u00d6F ile \u00f6rg\u00fcn sistemin fark\u0131 nedir?", "A\u00d6F'de a\u011f\u0131rl\u0131klar %30 ara + %70 d\u00f6nem sonu, 35 baraj\u0131 ve 4-yanl\u0131\u015f-1-do\u011fru cezas\u0131 vard\u0131r; \u00f6rg\u00fcn sistemde genelde %40 vize + %60 final ve ceza yoktur. A\u00d6F form\u00fcl\u00fc i\u00e7in <a href=\"aof-not-hesaplama/\">A\u00d6F Not Hesaplama</a> arac\u0131n\u0131 kullan."),
("Girdi\u011fim notlar bir yere g\u00f6nderiliyor mu?", "Hay\u0131r. Bu kategorideki t\u00fcm ara\u00e7lar taray\u0131c\u0131nda \u00e7al\u0131\u015f\u0131r; notlar\u0131n hi\u00e7bir sunucuya g\u00f6nderilmez ve saklanmaz."),
],
}

# ==================== RUNNER ====================
def words(html):
    return len(re.sub(r'<[^>]+>', ' ', html).split())

def apply_hub():
    p = os.path.join(DST, "universite-not", "index.html")
    s = open(p, encoding="utf-8").read()
    # head
    assert len(HUB["title"]) <= 60, f"hub title {len(HUB['title'])}"
    s = re.sub(r'<title>.*?</title>', '<title>' + HUB["title"] + '</title>', s, count=1)
    assert 150 <= len(HUB["meta"]) <= 160, f"hub meta {len(HUB['meta'])}"
    s = re.sub(r'<meta name="description" content=".*?">',
               '<meta name="description" content="' + HUB["meta"] + '">', s, count=1)
    s = re.sub(r'<meta property="og:description" content=".*?">',
               '<meta property="og:description" content="' + HUB["ogdesc"] + '">', s, count=1)
    # lede
    s2, n = re.subn(r'(<p class="lede">).*?(</p>)',
                    lambda m: m.group(1) + HUB["lede"] + m.group(2), s, count=1, flags=re.S)
    assert n == 1, "hub lede not found"
    s = s2
    # byline after lede
    if 'class="guncelleme"' not in s:
        s2, n = re.subn(r'(<p class="lede">.*?</p>)',
                        lambda m: m.group(1) + "\n      " + BYLINE, s, count=1, flags=re.S)
        assert n == 1, "hub lede for byline"
        s = s2
    # guide section (keep tool cards section untouched)
    m = re.search(r'<section class="bolum bolum-soluk">\s*<div class="wrap">.*?</div>\s*</section>', s, re.S)
    assert m, "hub guide section not found"
    assert 'href="/' not in HUB["guide"] and 'src="/' not in HUB["guide"], "root-abs in hub guide"
    s = s.replace(m.group(0),
                  '<section class="bolum bolum-soluk">\n    <div class="wrap">\n' + HUB["guide"] + '\n    </div>\n  </section>', 1)
    # faq section (insert JSON-LD; hub had none)
    m = re.search(r'<section class="bolum sss">\s*<div class="wrap">.*?</div>\s*</section>', s, re.S)
    assert m, "hub faq section not found"
    faqs = HUB["faqs"]
    assert 5 <= len(faqs) <= 12, f"hub faq count {len(faqs)}"
    s = s.replace(m.group(0),
                  '<section class="bolum sss">\n    <div class="wrap">\n      <h2>Sık Sorulan Sorular</h2>\n'
                  + details_html(faqs) + '\n' + faq_jsonld(faqs) + '\n    </div>\n  </section>', 1)
    # sanity
    assert len(re.findall(r'<h1[ >]', s)) == 1, "hub H1 count"
    assert 'href="/' not in s.replace('href="https://puanrobotu.com', 'href="OK'), "root-abs link on hub"
    open(p, "w", encoding="utf-8").write(s)
    return True

def main():
    for slug in PAGES:
        apply_page(slug, PAGES[slug])
        print("OK", slug, "| guide words:", words(PAGES[slug]["guide"]),
              "| faqs:", len(PAGES[slug]["faqs"]),
              "| title:", len(PAGES[slug]["title"]), "ch | meta:", len(PAGES[slug]["meta"]), "ch")
    apply_hub()
    print("OK hub | guide words:", words(HUB["guide"]), "| faqs:", len(HUB["faqs"]),
          "| title:", len(HUB["title"]), "ch | meta:", len(HUB["meta"]), "ch")
    for slug in list(PAGES.keys()) + ["universite-not"]:
        n = verify_faq_parity(slug)
        print("FAQ parity OK:", slug, n, "Q&A")

if __name__ == "__main__":
    main()
