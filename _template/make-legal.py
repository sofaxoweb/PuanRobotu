#!/usr/bin/env python3
"""Generate 5 Turkish legal pages for PuanRobotu (AdSense-ready)."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = 'https://lgspuan-hesaplama.com'
MAIL = 'info@lgspuan-hesaplama.com'
DATE = '18 Ekim 2026'

NAV = '''<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="../" aria-label="PuanRobotu ana sayfa">
      <img src="../assets/img/logo.svg" alt="PuanRobotu logo" width="36" height="36">
      <span>PuanRobotu</span>
    </a>
    <button id="menu-dugme" aria-label="Menüyü aç" aria-expanded="false">☰</button>
    <nav aria-label="Ana gezinme" class="site-nav" id="site-nav">
      <a href="../lgs/">Ortaokul</a>
      <a href="../yks/">Üniversite Giriş</a>
      <a href="../universite-not/">Üniversite Notları</a>
      <a href="../lisansustu/">Lisansüstü</a>
      <a href="../kamu-sinavlari/">Kamu Sınavları</a>
    </nav>
  </div>
</header>'''

FOOTER = '''<footer class="site-footer">
  <div class="wrap footer-grid">
    <div><h3>PuanRobotu</h3><ul><li><a href="../">Ana Sayfa</a></li><li><a href="../lgs/">Ortaokul</a></li><li><a href="../yks/">Üniversite Giriş</a></li><li><a href="../universite-not/">Üniversite Notları</a></li><li><a href="../lisansustu/">Lisansüstü</a></li><li><a href="../kamu-sinavlari/">Kamu Sınavları</a></li></ul></div>
    <div><h3>Kurumsal</h3><ul><li><a href="../hakkimizda/">Hakkımızda</a></li><li><a href="../iletisim/">İletişim</a></li><li><a href="../gizlilik-politikasi/">Gizlilik Politikası</a></li><li><a href="../kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a></li><li><a href="../cerez-politikasi/">Çerez Politikası</a></li></ul></div>
  </div>
  <div class="footer-alt"><div class="wrap">© 2026 PuanRobotu — Tüm hesaplamalar bilgilendirme amaçlı tahmindir.</div></div>
</footer>
<script src="../assets/js/tools.js"></script>
<script src="../assets/js/site.js"></script>
</body>
</html>'''

def page(slug, title, meta, h1, kicker, lede, body):
    return f'''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{meta}">
<link rel="canonical" href="{DOMAIN}/{slug}/">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:title" content="{title}">
<meta property="og:url" content="{DOMAIN}/{slug}/">
<meta name="theme-color" content="#16294d">
<link rel="icon" type="image/svg+xml" href="../assets/img/logo.svg">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
{NAV}
<main>
  <div class="wrap"><p class="kirinti"><a href="../">Ana Sayfa</a> › {h1}</p></div>
  <section class="hero hero-kisa">
    <div class="wrap">
      <p class="kicker">{kicker}</p>
      <h1>{h1}</h1>
      <p class="lede">{lede}</p>
      <p class="yazar">Son güncelleme: {DATE} · Yazar: PuanRobotu Editör Ekibi</p>
    </div>
  </section>
  <section class="bolum">
    <div class="wrap sayfa-tek">
      <article>
{body}
      </article>
    </div>
  </section>
</main>
{FOOTER}'''

PAGES = {
'hakkimizda': (
    'Hakkımızda | PuanRobotu',
    'PuanRobotu nedir, kim hazırlar, hangi ilkelere göre çalışır? Sınav puan hesaplama araçlarımızın arkasındaki ekip ve dürüstlük ilkelerimiz.',
    'Hakkımızda', '📘 Kurumsal', 'PuanRobotu, Türkiye’deki sınav adayları için <strong>ücretsiz ve şeffaf</strong> puan hesaplama araçları sunar.',
    '''<h2>PuanRobotu nedir?</h2>
<p>PuanRobotu, LGS’den YKS’ye, KPSS’den ALES’e kadar Türkiye’deki başlıca sınavlar için puan hesaplama araçları sunan bağımsız bir eğitim sitesidir. Amacımız tek cümleyle şudur: <strong>adayın elindeki netleri, resmî formüllere uygun şekilde tahmini puana çevirmek</strong> — abartısız, gizli formülsüz, reklamsız vaatler olmadan.</p>
<h2>Nasıl çalışırız?</h2>
<p>Hesaplayıcılarımızın tamamı tarayıcınızda çalışır; girdiğiniz doğru–yanlış sayıları sunucularımıza gönderilmez. Formüller, ÖSYM ve MEB’in yayımladığı resmî kılavuzlardaki katsayı ve kurallara dayanır. Resmî puanın sınav sonrası ulusal istatistiklerle hesaplandığı her yerde sonuçlarımızı <strong>“tahmini”</strong> olarak etiketleriz.</p>
<h2>Dürüstlük ilkelerimiz</h2>
<ul>
<li><strong>Formül şeffaflığı:</strong> Her araç, kullandığı formülü ve çalışılmış bir örneği sayfasında açıklar.</li>
<li><strong>Hata düzeltme:</strong> İnternette yaygın yanlış bilgileri (hatalı katsayı tabloları, güncel olmayan kurallar) tespit edip sayfalarımızda düzeltiriz.</li>
<li><strong>Sınırlamaları söyleme:</strong> Her araç sayfasında “Sınırlamalar” bölümü bulunur; aracın neyi bilemeyeceğini açıkça yazarız.</li>
<li><strong>Reklamsız vaat yok:</strong> “Kesin puan” veya “garantili yerleşme” gibi ifadeler kullanmayız.</li>
</ul>
<h2>İçerik ekibi</h2>
<p>Sayfalarımız PuanRobotu Editör Ekibi tarafından hazırlanır ve sınav kılavuzlarındaki değişikliklere göre güncellenir. Resmî kurumlarla (ÖSYM, MEB, YÖK) bağlantımız yoktur; bağımsız bir kaynaktayız.</p>
<h2>Bize ulaşın</h2>
<p>Soru, düzeltme önerisi veya iş birliği için <a href="../iletisim/">iletişim sayfamızı</a> kullanabilirsiniz.</p>'''
),
'iletisim': (
    'İletişim | PuanRobotu',
    'PuanRobotu ile iletişime geçin: soru, hata bildirimi ve önerileriniz için e-posta adresimiz ve yanıt süremiz.',
    'İletişim', '✉️ Kurumsal', 'Soru, hata bildirimi veya önerileriniz için bize <strong>e-posta</strong> ile ulaşabilirsiniz.',
    f'''<h2>E-posta ile ulaşın</h2>
<p>Tüm soru, düzeltme önerisi ve geri bildirimleriniz için e-posta adresimiz:</p>
<p><strong><a href="mailto:{MAIL}">{MAIL}</a></strong></p>
<h2>Ne zaman yanıt alırsınız?</h2>
<p>E-postaları genellikle <strong>2 iş günü içinde</strong> yanıtlıyoruz. Sınav dönemlerindeki yoğunlukta bu süre uzayabilir.</p>
<h2>Hata bildirimi</h2>
<p>Bir hesaplayıcıda yanlış sonuç aldığınızı düşünüyorsanız, e-postanızda şunları belirtmeniz işimizi hızlandırır:</p>
<ul>
<li>Hangi araç (sayfanın bağlantısı),</li>
<li>Girdiğiniz değerler (doğru–yanlış sayıları),</li>
<li>Beklediğiniz sonuç ve neden farklı olması gerektiğini düşünüyorsunuz.</li>
</ul>
<h2>Resmî kurumlarla ilişkimiz</h2>
<p>PuanRobotu, ÖSYM, MEB veya YÖK ile bağlantılı değildir. Resmî başvuru ve sonuç işlemleri için ilgili kurumun kendi sitesini kullanınız.</p>'''
),
'gizlilik-politikasi': (
    'Gizlilik Politikası | PuanRobotu',
    'PuanRobotu gizlilik politikası: hangi verileri topluyoruz (toplamıyoruz), hesaplayıcı verileriniz nerede saklanır, haklarınız nelerdir?',
    'Gizlilik Politikası', '🔒 Kurumsal', 'Bu site <strong>hesap açmanızı istemez</strong> ve kişisel verilerinizi toplamaz. Ayrıntılar aşağıdadır.',
    f'''<h2>Özet</h2>
<p>PuanRobotu’nda hesap oluşturma, yorum yapma veya bülten kaydı yoktur. Hesaplayıcılara girdiğiniz doğru–yanlış sayıları <strong>yalnızca tarayıcınızda işlenir</strong>; sunucularımıza gönderilmez, kaydedilmez, üçüncü kişilerle paylaşılmaz.</p>
<h2>Topladığımız veriler</h2>
<p><strong>Kişisel veri toplamıyoruz.</strong> Ad, e-posta, telefon gibi bilgileri yalnızca siz bize <a href="../iletisim/">iletişim</a> e-postasıyla yazarsanız alırız; bu e-postalar yalnızca sorunuzu yanıtlamak için kullanılır.</p>
<h2>Tarayıcıda saklanan veriler</h2>
<p>Bazı araçlar, son girdiğiniz değerleri kolaylık için tarayıcınızın <strong>yerel depolamasında (localStorage)</strong> tutabilir. Bu veriler cihazınızdan çıkmaz; tarayıcı verilerini temizleyerek silebilirsiniz.</p>
<h2>Üçüncü taraf hizmetler</h2>
<p>Şu anda sitemizde reklam veya analiz amaçlı üçüncü taraf izleyici bulunmamaktadır. Gelecekte eklenecek olursa bu politika güncellenir ve <a href="../cerez-politikasi/">çerez politikamızda</a> açıklanır.</p>
<h2>Çocukların gizliliği</h2>
<p>Sitemiz her yaşa açıktır; ancak 18 yaşından küçük kullanıcılardan bilerek kişisel veri toplamıyoruz. Bir veli, çocuğuna ait bir verinin bize ulaştığını düşünürse <a href="mailto:{MAIL}">{MAIL}</a> adresinden bildirebilir.</p>
<h2>Veri güvenliği</h2>
<p>Sunucuya veri göndermediğimiz için sızdırılacak bir veri tabanımız yoktur. Yine de site, güncel güvenlik standartlarıyla (HTTPS) sunulur.</p>
<h2>Haklarınız (KVKK)</h2>
<p>6698 sayılı KVKK kapsamındaki haklarınızı (öğrenme, düzeltme, silme vb.) <a href="../kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a>’nde bulabilirsiniz.</p>
<h2>Değişiklikler</h2>
<p>Bu politika güncellenirse yeni sürüm bu sayfada yayımlanır ve üstteki “Son güncelleme” tarihi değişir.</p>
<h2>İletişim</h2>
<p>Gizlilikle ilgili sorularınız için: <a href="mailto:{MAIL}">{MAIL}</a></p>'''
),
'kvkk-aydinlatma-metni': (
    'KVKK Aydınlatma Metni | PuanRobotu',
    '6698 sayılı KVKK uyarınca aydınlatma metni: veri sorumlusu, işlenen veriler, amaçlar, aktarım ve ilgili kişi hakları.',
    'KVKK Aydınlatma Metni', '⚖️ Kurumsal', '6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca <strong>aydınlatma yükümlülüğümüzü</strong> yerine getiriyoruz.',
    f'''<h2>Veri sorumlusu</h2>
<p>Bu metin kapsamında veri sorumlusu: <strong>PuanRobotu</strong> — İletişim: <a href="mailto:{MAIL}">{MAIL}</a></p>
<h2>İşlenen kişisel veriler</h2>
<p>Sitemiz hesap açma veya form doldurma gerektirmez. Kişisel veri, <strong>yalnızca siz bize e-postayla yazarsanız</strong> (adınız, e-posta adresiniz ve iletinizin içeriği) işlenir. Hesaplayıcılara girilen doğru–yanlış sayıları kişisel veri değildir ve sunucuya iletilmez.</p>
<h2>İşleme amaçları ve hukuki sebepler</h2>
<ul>
<li><strong>Amaç:</strong> İletişim taleplerinizi yanıtlamak.</li>
<li><strong>Hukuki sebep:</strong> KVKK m.5/2-f — ilgili kişinin temel haklarına zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (iletişimi yürütme).</li>
</ul>
<h2>Verilerin aktarımı</h2>
<p>E-postayla paylaştığınız veriler <strong>üçüncü kişilere aktarılmaz</strong>, yurt dışına çıkarılmaz, pazarlama amacıyla kullanılmaz.</p>
<h2>Saklama süresi</h2>
<p>İletişim e-postaları, talebiniz sonuçlandıktan sonra en fazla <strong>2 yıl</strong> saklanır; ardından silinir.</p>
<h2>İlgili kişi olarak haklarınız (KVKK m.11)</h2>
<ul>
<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
<li>İşlenmişse buna ilişkin bilgi talep etme,</li>
<li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
<li>Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme,</li>
<li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
<li>KVKK m.7’deki şartlar çerçevesinde silinmesini/yok edilmesini isteme,</li>
<li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
<li>Münhasıran otomatik sistemlerle analiz sonucu aleyhinize çıkan sonuca itiraz etme,</li>
<li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
</ul>
<h2>Başvuru yöntemi</h2>
<p>Haklarınızı kullanmak için <a href="mailto:{MAIL}">{MAIL}</a> adresine e-postayla başvurabilirsiniz. Başvurunuza en geç <strong>30 gün içinde</strong> yanıt verilir.</p>
<h2>Şikâyet hakkı</h2>
<p>KVKK Kurulu’na şikâyet hakkınız saklıdır: <a href="https://www.kvkk.gov.tr" rel="noopener">kvkk.gov.tr</a></p>'''
),
'cerez-politikasi': (
    'Çerez Politikası | PuanRobotu',
    'PuanRobotu çerez politikası: çerez ve yerel depolama kullanımı, hangi amaçla, nasıl kontrol edilir?',
    'Çerez Politikası', '🍪 Kurumsal', 'Sitemiz şu anda <strong>izleme çerezi kullanmaz</strong>. Teknik depolama hakkında ayrıntılar aşağıdadır.',
    '''<h2>Çerez nedir?</h2>
<p>Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Sitemiz, hesaplayıcı kolaylığı için çerez yerine tarayıcınızın <strong>yerel depolamasını (localStorage)</strong> kullanabilir.</p>
<h2>Kullandığımız depolama türleri</h2>
<ul>
<li><strong>Zorunlu teknik depolama:</strong> Bazı araçlar son girdiğiniz değerleri (ör. doğru–yanlış sayıları) cihazınızda saklar; böylece sayfayı yenilediğinizde değerler kaybolmaz. Bu veriler sunucuya gönderilmez.</li>
<li><strong>Analiz/izleme çerezleri:</strong> Şu anda kullanılmamaktadır.</li>
<li><strong>Reklam çerezleri:</strong> Şu anda kullanılmamaktadır.</li>
</ul>
<h2>Üçüncü taraf çerezleri</h2>
<p>Şu anda sitemizde üçüncü taraf çerez veya izleyici (reklam, analiz) bulunmamaktadır. Gelecekte eklenecek olursa bu politika güncellenir.</p>
<h2>Çerezleri nasıl kontrol edersiniz?</h2>
<p>Tarayıcınızın ayarlarından çerezleri engelleyebilir veya silebilirsiniz. Yerel depolamayı temizlemek için tarayıcınızın “site verilerini temizle” seçeneğini kullanın. Teknik depolamayı kapatmanız, hesaplayıcıların değerleri hatırlama özelliğini devre dışı bırakır; hesaplama yapmaya engel değildir.</p>
<h2>Değişiklikler</h2>
<p>Bu politika güncellenirse yeni sürüm bu sayfada yayımlanır.</p>'''
),
}

for slug, (title, meta, h1, kicker, lede, body) in PAGES.items():
    d = os.path.join(ROOT, slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(
        page(slug, title, meta, h1, kicker, lede, body))
    print("wrote", slug, "| title:", len(title), "chars | meta:", len(meta), "chars")
