#!/usr/bin/env python3
"""Generate 5 Turkish legal pages for PuanRobotu (AdSense-ready).

NOTE 2026-10-23: PAGES content below is synced from the live HTML (incl. the
Oct-21 title/meta fixes and the Oct-23 content expansion). The NAV/FOOTER
strings in this file predate the build-partials system - compare against a
live page before regenerating, or regeneration will revert header/footer.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = 'https://lgspuan-hesaplama.com'
MAIL = 'info@lgspuan-hesaplama.com'
DATE = '23 Ekim 2026'

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
<meta property="og:description" content="{meta}">
<meta property="og:url" content="{DOMAIN}/{slug}/">
<meta property="og:image" content="{DOMAIN}/assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{meta}">
<meta name="twitter:image" content="{DOMAIN}/assets/img/og-image.png">
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
    'Hakkımızda: PuanRobotu Nedir? | PuanRobotu',
    'PuanRobotu nedir, kim hazırlar, hangi ilkelere göre çalışır? Sınav puan hesaplama araçlarımızın arkasındaki ekip ve dürüstlük ilkelerimiz.',
    'Hakkımızda', '📘 Kurumsal', 'PuanRobotu, Türkiye’deki sınav adayları için <strong>ücretsiz ve şeffaf</strong> puan hesaplama araçları sunar.',
    '<h2>PuanRobotu nedir?</h2>\n<p>PuanRobotu, LGS’den YKS’ye, KPSS’den ALES’e kadar Türkiye’deki başlıca sınavlar için puan hesaplama araçları sunan bağımsız bir eğitim sitesidir. Amacımız tek cümleyle şudur: <strong>adayın elindeki netleri, resmî formüllere uygun şekilde tahmini puana çevirmek</strong> — abartısız, gizli formülsüz, reklamsız vaatler olmadan.</p>\n<h2>Hangi sınavları kapsıyoruz?</h2>\n<p>Sitemizde altı kategoride <strong>28 hesaplama aracı</strong>, sınav kavramlarını açıklayan <strong>12 rehber</strong> ve güncel bir sınav takvimi bulunur:</p>\n<ul>\n<li><strong>LGS (Ortaokul):</strong> Puan hesaplama, tercih robotu, 81 il için taban puanları, bursluluk (İOKBS) ve takdir–teşekkür hesaplama.</li>\n<li><strong>YKS (Üniversite Giriş):</strong> TYT–AYT–YDT puan hesaplama, OBP hesaplama, tercih robotu, üniversite taban puanları ve MSÜ puan hesaplama.</li>\n<li><strong>Üniversite Notları:</strong> Vize–final, GANO, harf notu, çan eğrisi, AÖF not ve not dönüşümü hesaplama.</li>\n<li><strong>Lisansüstü:</strong> ALES, DGS, YDS ve YÖKDİL puan hesaplama.</li>\n<li><strong>Kamu Sınavları:</strong> KPSS (Lisans, Önlisans/P93, Ortaöğretim/P94), ÖABT, TUS ve DUS puan hesaplama.</li>\n<li><strong>Ehliyet:</strong> Sınav puanı hesaplama ve 50 soruluk süreli deneme sınavı.</li>\n</ul>\n<p>Taban puanı sayfalarımızda ayrıca geçmiş yerleştirme verilerini sunuyoruz; örneğin LGS bölümünde <strong>81 ilin tamamında yaklaşık 3.900 okul satırı</strong>, resmî yerleştirme sonuçları esas alınarak listelenir.</p>\n<h2>Nasıl çalışırız?</h2>\n<p>Hesaplayıcılarımızın tamamı tarayıcınızda çalışır; girdiğiniz doğru–yanlış sayıları sunucularımıza gönderilmez. Formüller, ÖSYM ve MEB’in yayımladığı resmî kılavuzlardaki katsayı ve kurallara dayanır. Resmî puanın sınav sonrası ulusal istatistiklerle hesaplandığı her yerde sonuçlarımızı <strong>“tahmini”</strong> olarak etiketleriz.</p>\n<h2>Verileri nasıl doğruluyoruz?</h2>\n<p>Her araç yayınlanmadan önce üç aşamadan geçer: (1) formül, ilgili sınavın güncel kılavuzundaki katsayı ve kurallarla karşılaştırılır; (2) araç, elle hesaplanmış örnek değerlerle test edilir; (3) sonuçların beklenen aralıkta olduğu ve uç durumların (örneğin tüm soruların boş bırakılması) hatasız çalıştığı kontrol edilir. Veri tabloları derlenirken resmî yerleştirme sonuçları kullanılır ve satır toplamları bağımsız kaynaklarla çapraz kontrol edilir. Buna rağmen bir hata fark ederseniz <a href="../iletisim/">iletişim sayfasından</a> bildirmeniz, düzeltmemiz için en hızlı yoldur.</p>\n<h2>“Tahmini sonuç” ne anlama gelir?</h2>\n<p>Bazı sınavlarda (örneğin YKS ve KPSS) resmî puan; sınavdan sonra tüm adayların dağılımıyla hesaplanan standart puanlara dayanır. Bu dağılım sınavdan önce bilinemeyeceği için hiçbir site size kesin puanınızı önceden veremez. Biz, kılavuzdaki formülü ve geçmiş yılların istatistiklerini kullanarak <strong>gerçeğe en yakın tahmini</strong> sunarız ve bunu her sayfada açıkça belirtiriz. Resmî sonuç için tek yetkili kaynak, sınavı düzenleyen kurumdur.</p>\n<h2>Dürüstlük ilkelerimiz</h2>\n<ul>\n<li><strong>Formül şeffaflığı:</strong> Her araç, kullandığı formülü ve çalışılmış bir örneği sayfasında açıklar.</li>\n<li><strong>Hata düzeltme:</strong> İnternette yaygın yanlış bilgileri (hatalı katsayı tabloları, güncel olmayan kurallar) tespit edip sayfalarımızda düzeltiriz.</li>\n<li><strong>Sınırlamaları söyleme:</strong> Her araç sayfasında “Sınırlamalar” bölümü bulunur; aracın neyi bilemeyeceğini açıkça yazarız.</li>\n<li><strong>Reklamsız vaat yok:</strong> “Kesin puan” veya “garantili yerleşme” gibi ifadeler kullanmayız.</li>\n</ul>\n<h2>Güncelleme politikası</h2>\n<p>Sınav kılavuzları, katsayılar veya sınav takvimi değiştiğinde ilgili sayfalar güncellenir; her sayfanın üstünde “Son güncelleme” tarihi yer alır. Örneğin öğretmenlik sınavlarındaki MEB-AGS değişikliği gibi yapısal yenilikler, kılavuz yayımlanır yayımlanmaz araçlarımıza işlenir.</p>\n<h2>İçerik ekibi</h2>\n<p>Sayfalarımız PuanRobotu Editör Ekibi tarafından hazırlanır ve sınav kılavuzlarındaki değişikliklere göre güncellenir. Resmî kurumlarla (ÖSYM, MEB, YÖK) bağlantımız yoktur; bağımsız bir kaynaktayız.</p>\n<h2>Bize ulaşın</h2>\n<p>Soru, düzeltme önerisi veya iş birliği için <a href="../iletisim/">iletişim sayfamızı</a> kullanabilirsiniz.</p>'
),
'iletisim': (
    'İletişim: Bize Ulaşın | PuanRobotu',
    'PuanRobotu ile iletişime geçin: soru, hata bildirimi ve önerileriniz için info@lgspuan-hesaplama.com adresine yazın.',
    'İletişim', '✉️ Kurumsal', 'Soru, hata bildirimi veya önerileriniz için bize <strong>e-posta</strong> ile ulaşabilirsiniz.',
    '<h2>E-posta ile ulaşın</h2>\n<p>Tüm soru, düzeltme önerisi ve geri bildirimleriniz için e-posta adresimiz:</p>\n<p><strong><a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a></strong></p>\n<h2>Hangi konularda yazabilirsiniz?</h2>\n<ul>\n<li><strong>Hesap hatası bildirimi:</strong> Bir aracın yanlış sonuç ürettiğini düşünüyorsanız,</li>\n<li><strong>Veri düzeltmesi:</strong> Taban puanı veya kontenjan bilgilerinde hata fark ettiyseniz,</li>\n<li><strong>Yeni araç önerisi:</strong> Sitede görmek istediğiniz bir hesaplama aracı varsa,</li>\n<li><strong>Rehber konusu önerisi:</strong> Açıklanmasını istediğiniz bir sınav kavramı varsa,</li>\n<li><strong>İş birliği:</strong> Eğitim içerikleriyle ilgili ortak çalışma düşünüyorsanız.</li>\n</ul>\n<h2>Ne zaman yanıt alırsınız?</h2>\n<p>E-postaları genellikle <strong>2 iş günü içinde</strong> yanıtlıyoruz. Sınav dönemlerindeki yoğunlukta bu süre uzayabilir. Hata bildirimleri, doğrulama gerektirdiği için genel sorulardan daha uzun sürebilir; bildiriminiz bize ulaştıysa sıraya alınmış demektir, tekrar göndermeniz gerekmez.</p>\n<h2>Hata bildirimi</h2>\n<p>Bir hesaplayıcıda yanlış sonuç aldığınızı düşünüyorsanız, e-postanızda şunları belirtmeniz işimizi hızlandırır:</p>\n<ul>\n<li>Hangi araç (sayfanın bağlantısı),</li>\n<li>Girdiğiniz değerler (doğru–yanlış sayıları),</li>\n<li>Beklediğiniz sonuç ve neden farklı olması gerektiğini düşünüyorsunuz.</li>\n</ul>\n<p>Doğruladığımız hataları düzeltiyor ve sayfanın “Son güncelleme” tarihini yeniliyoruz. Şu ana kadarki pek çok düzeltmemiz, dikkatli adayların bildirimleri sayesinde yapıldı.</p>\n<h2>Sık karşılaşılan durumlar</h2>\n<p><strong>Sonucum resmî sonuçtan farklı çıktı.</strong> Araçlarımızın çoğu, sınav sonrası oluşan ulusal dağılım önceden bilinemediği için <em>tahmini</em> puan üretir; küçük farklar beklenen durumdur. Ayrıntı için <a href="../hakkimizda/">hakkımızda sayfasındaki</a> “Tahmini sonuç” bölümüne bakabilirsiniz.</p>\n<p><strong>Telefonla ulaşabilir miyim?</strong> Şu anda iletişim yalnızca e-posta ile yürütülüyor. Hesap düzeltmelerinde yazılı kayıt, hangi değerlerle hangi sonucun üretildiğini birlikte inceleyebilmemiz için daha sağlıklıdır.</p>\n<p><strong>Bana özel tercih listesi hazırlar mısınız?</strong> Kişiye özel danışmanlık vermiyoruz; ancak tercih robotlarımız ve rehberlerimiz kendi listenizi hazırlamanız için tasarlandı. Takıldığınız noktayı e-postayla sorabilirsiniz.</p>\n<h2>Öneriler nasıl değerlendirilir?</h2>\n<p>Gelen her öneri ekibimizce okunur. Yeni araç önerilerinde; sınavın aday sayısı, resmî kılavuzda net bir formülün bulunup bulunmadığı ve mevcut araçlarla çakışıp çakışmadığına bakarız. Uygun bulunan öneriler yapım sırasına alınır. Her öneriye tek tek olumlu yanıt veremesek de yinelenen istekler öncelik kazanır; bu yüzden aradığınız aracı bulamadıysanız yazmanız gerçekten fark yaratır.</p>\n<h2>Göndermemeniz gerekenler</h2>\n<p>E-postalarınıza <strong>T.C. kimlik numarası, aday şifresi veya sonuç belgenizin görüntüsü</strong> gibi hassas bilgileri eklemeyin. Hesap kontrolleri için doğru–yanlış sayılarınız yeterlidir; bu bilgileri hiçbir zaman istemeyiz.</p>\n<h2>Resmî kurumlarla ilişkimiz</h2>\n<p>PuanRobotu, ÖSYM, MEB veya YÖK ile bağlantılı değildir. Resmî başvuru ve sonuç işlemleri için ilgili kurumun kendi sitesini kullanınız. Bize yazdığınız konularda elimizden gelen yönlendirmeyi yaparız; ancak resmî işlemleri sizin adınıza gerçekleştiremeyiz.</p>'
),
'gizlilik-politikasi': (
    'Gizlilik Politikası | PuanRobotu',
    'PuanRobotu gizlilik politikası: hangi verileri topluyoruz (toplamıyoruz), hesaplayıcı verileriniz nerede saklanır, haklarınız nelerdir?',
    'Gizlilik Politikası', '🔒 Kurumsal', 'Bu site <strong>hesap açmanızı istemez</strong> ve kişisel verilerinizi toplamaz. Ayrıntılar aşağıdadır.',
    '<h2>Özet</h2>\n<p>PuanRobotu’nda hesap oluşturma, yorum yapma veya bülten kaydı yoktur. Hesaplayıcılara girdiğiniz doğru–yanlış sayıları <strong>yalnızca tarayıcınızda işlenir</strong>; sunucularımıza gönderilmez, kaydedilmez, üçüncü kişilerle paylaşılmaz. Bu sayfa, gizliliğe yaklaşımımızı ayrıntılı olarak açıklar.</p>\n<h2>Hesaplamalar nasıl çalışır?</h2>\n<p>Sitedeki tüm araçlar tarayıcınızda çalışan komut dosyalarıyla çalışır. Bir hesaplayıcıya sayı girdiğinizde sonuç, cihazınızın içinde hesaplanır ve size gösterilir. Bu değerler sayfayı yenileseniz bile sunucumuza ulaşmaz; bizim girdiğiniz netleri veya hesapladığınız puanları görmemiz teknik olarak mümkün değildir.</p>\n<h2>Topladığımız veriler</h2>\n<p><strong>Kişisel veri toplamıyoruz.</strong> Ad, e-posta, telefon gibi bilgileri yalnızca siz bize <a href="../iletisim/">iletişim</a> e-postasıyla yazarsanız alırız; bu e-postalar yalnızca sorunuzu yanıtlamak için kullanılır, pazarlama listelerine eklenmez, satılmaz veya kiralanmaz.</p>\n<h2>Sunucu ve barındırma kayıtları</h2>\n<p>Her web sitesinde olduğu gibi, sitemizi sunan barındırma ve içerik dağıtım altyapısı; güvenlik, hata giderme ve hizmet sürekliliği için standart erişim kayıtları tutabilir. Bu kayıtlar genellikle IP adresi, tarih-saat, istenen sayfa ve tarayıcı bilgisini içerir. Bu kayıtlar profil çıkarmak veya pazarlama yapmak için kullanılmaz ve hesaplayıcılara girdiğiniz değerleri içermez; çünkü bu değerler sunucuya hiç ulaşmaz.</p>\n<h2>Tarayıcıda saklanan veriler</h2>\n<p>Bazı araçlar, son girdiğiniz değerleri kolaylık için tarayıcınızın <strong>yerel depolamasında (localStorage)</strong> tutabilir. Bu veriler cihazınızdan çıkmaz; tarayıcı verilerini temizleyerek silebilirsiniz. Ayrıntılar için <a href="../cerez-politikasi/">çerez politikamıza</a> bakınız.</p>\n<h2>Üçüncü taraf hizmetler</h2>\n<p>Şu anda sitemizde reklam veya analiz amaçlı üçüncü taraf izleyici bulunmamaktadır. Gelecekte eklenecek olursa bu politika güncellenir ve <a href="../cerez-politikasi/">çerez politikamızda</a> açıklanır.</p>\n<h2>Dış bağlantılar</h2>\n<p>Sayfalarımızda ÖSYM, MEB ve YÖK gibi resmî kurumların sitelerine bağlantılar bulunabilir. Bu bağlantılarla sitemizden ayrıldığınızda, gittiğiniz sitenin kendi gizlilik politikası geçerlidir; o sitelerde paylaştığınız verilerden ilgili kurum sorumludur.</p>\n<h2>Çocukların gizliliği</h2>\n<p>Sitemiz her yaşa açıktır; ancak 18 yaşından küçük kullanıcılardan bilerek kişisel veri toplamıyoruz. Bir veli, çocuğuna ait bir verinin bize ulaştığını düşünürse <a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a> adresinden bildirebilir.</p>\n<h2>Veri güvenliği</h2>\n<p>Sunucuya hesap verisi göndermediğimiz için sızdırılacak bir kullanıcı veri tabanımız yoktur. Yine de site, güncel güvenlik standartlarıyla (HTTPS) sunulur ve iletişim e-postalarına erişim sınırlı tutulur.</p>\n<h2>Haklarınız (KVKK)</h2>\n<p>6698 sayılı KVKK kapsamındaki haklarınızı (öğrenme, düzeltme, silme vb.) <a href="../kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a>’nde bulabilirsiniz.</p>\n<h2>Değişiklikler</h2>\n<p>Bu politika güncellenirse yeni sürüm bu sayfada yayımlanır ve üstteki “Son güncelleme” tarihi değişir.</p>\n<h2>İletişim</h2>\n<p>Gizlilikle ilgili sorularınız için: <a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a></p>'
),
'kvkk-aydinlatma-metni': (
    'KVKK Aydınlatma Metni | PuanRobotu',
    'KVKK aydınlatma metni: PuanRobotu kişisel verileri nasıl işler, 6698 sayılı Kanun m.10-11 kapsamındaki haklarınız ve başvuru yöntemleri.',
    'KVKK Aydınlatma Metni', '⚖️ Kurumsal', '6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca <strong>aydınlatma yükümlülüğümüzü</strong> yerine getiriyoruz.',
    '<h2>Veri sorumlusu</h2>\n<p>Bu metin kapsamında veri sorumlusu: <strong>PuanRobotu</strong> — İletişim: <a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a></p>\n<h2>Veri işleme ilkelerimiz</h2>\n<p>Kişisel veriler, KVKK’nın 4. maddesindeki ilkelere uygun işlenir: hukuka ve dürüstlük kurallarına uygunluk, doğru ve güncel olma, belirli ve meşru amaçlarla işleme, amaçla sınırlı ve ölçülü olma, ilgili mevzuatta öngörülen veya işleme amacı için gerekli süre kadar saklama. Sitemizin çalışma biçimi bu ilkeleri kolaylaştırır; çünkü hesaplayıcı girdileri kişisel veri oluşturmadan, yalnızca ziyaretçinin tarayıcısında işlenir.</p>\n<h2>İşlenen kişisel veriler</h2>\n<p>Sitemiz hesap açma veya form doldurma gerektirmez. Kişisel veri, <strong>yalnızca siz bize e-postayla yazarsanız</strong> (adınız, e-posta adresiniz ve iletinizin içeriği) işlenir. Hesaplayıcılara girilen doğru–yanlış sayıları kişisel veri değildir ve sunucuya iletilmez. Ayrıca sitenin sunulduğu teknik altyapı, güvenlik amacıyla IP adresi gibi bağlantı bilgilerini içeren standart erişim kayıtları oluşturabilir; bu kayıtlar pazarlama amacıyla kullanılmaz.</p>\n<h2>İşleme amaçları ve hukuki sebepler</h2>\n<ul>\n<li><strong>Amaç:</strong> İletişim taleplerinizi yanıtlamak.</li>\n<li><strong>Hukuki sebep:</strong> KVKK m.5/2-f — ilgili kişinin temel haklarına zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (iletişimi yürütme).</li>\n<li><strong>Amaç:</strong> Site güvenliğini sağlamak ve teknik sorunları gidermek (sunucu erişim kayıtları).</li>\n<li><strong>Hukuki sebep:</strong> KVKK m.5/2-f — meşru menfaat (hizmet güvenliği ve sürekliliği).</li>\n</ul>\n<h2>Verilerin aktarımı</h2>\n<p>E-postayla paylaştığınız veriler <strong>üçüncü kişilere aktarılmaz</strong>, yurt dışına çıkarılmaz, pazarlama amacıyla kullanılmaz. Yasal bir yükümlülük doğarsa (örneğin yetkili makam kararı), yalnızca zorunlu kapsamda ve mevzuata uygun şekilde hareket edilir.</p>\n<h2>Saklama süresi</h2>\n<p>İletişim e-postaları, talebiniz sonuçlandıktan sonra en fazla <strong>2 yıl</strong> saklanır; ardından silinir. Teknik erişim kayıtları ise altyapı sağlayıcısının varsayılan düzeni içinde, güvenlik ihtiyacı için gerekli süreyle sınırlı tutulur.</p>\n<h2>Veri güvenliği tedbirleri</h2>\n<p>Site HTTPS ile sunulur; iletişim e-postalarının tutulduğu hesaba erişim sınırlı ve parola korumalıdır. Kişisel veri içeren sistemler düzenli gözden geçirilir; olası bir ihlalde KVKK’nın öngördüğü bildirim yükümlülüklerine uyulur.</p>\n<h2>İlgili kişi olarak haklarınız (KVKK m.11)</h2>\n<ul>\n<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>\n<li>İşlenmişse buna ilişkin bilgi talep etme,</li>\n<li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>\n<li>Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme,</li>\n<li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>\n<li>KVKK m.7’deki şartlar çerçevesinde silinmesini/yok edilmesini isteme,</li>\n<li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>\n<li>Münhasıran otomatik sistemlerle analiz sonucu aleyhinize çıkan sonuca itiraz etme,</li>\n<li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>\n</ul>\n<h2>Başvuru yöntemi</h2>\n<p>Haklarınızı kullanmak için <a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a> adresine e-postayla başvurabilirsiniz. Başvuruyu, bize daha önce yazdığınız e-posta adresinden göndermeniz kimliğinizi doğrulamamızı kolaylaştırır. Başvurunuza en geç <strong>30 gün içinde</strong> yanıt verilir; başvurular kural olarak ücretsizdir.</p>\n<h2>Şikâyet hakkı</h2>\n<p>KVKK Kurulu’na şikâyet hakkınız saklıdır: <a href="https://www.kvkk.gov.tr" rel="noopener">kvkk.gov.tr</a></p>'
),
'cerez-politikasi': (
    'Çerez Politikası 2026 | PuanRobotu',
    'PuanRobotu çerez politikası: hangi çerezleri ve yerel depolamayı kullanıyoruz, neden gerekli, nasıl kontrol edersiniz? Detaylı bilgi.',
    'Çerez Politikası', '🍪 Kurumsal', 'Sitemiz şu anda <strong>izleme çerezi kullanmaz</strong>. Teknik depolama hakkında ayrıntılar aşağıdadır.',
    '<h2>Çerez nedir?</h2>\n<p>Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Sitemiz, hesaplayıcı kolaylığı için çerez yerine tarayıcınızın <strong>yerel depolamasını (localStorage)</strong> kullanabilir. Şu anda sitemizde izleme veya reklam amaçlı çerez <strong>bulunmamaktadır</strong>.</p>\n<h2>Çerez ile yerel depolama arasındaki fark</h2>\n<ul>\n<li><strong>Çerez:</strong> Tarayıcınız tarafından saklanır ve ilgili siteye yaptığınız her ziyarette sunucuya otomatik olarak geri gönderilir.</li>\n<li><strong>Yerel depolama (localStorage):</strong> Yalnızca cihazınızda kalır; siteye otomatik olarak iletilmez. Sitemizdeki araçlar hesaplamayı tamamen tarayıcınızda yaptığı için sunucuya veri gönderme ihtiyacı da yoktur.</li>\n</ul>\n<h2>Kullandığımız depolama türleri</h2>\n<ul>\n<li><strong>Zorunlu teknik depolama:</strong> Bazı araçlar son girdiğiniz değerleri (ör. doğru–yanlış sayıları) cihazınızda saklayabilir; böylece sayfayı yenilediğinizde değerler kaybolmaz. Bu veriler sunucuya gönderilmez.</li>\n<li><strong>Analiz/izleme çerezleri:</strong> Şu anda kullanılmamaktadır.</li>\n<li><strong>Reklam çerezleri:</strong> Şu anda kullanılmamaktadır.</li>\n</ul>\n<h2>Üçüncü taraf çerezleri</h2>\n<p>Şu anda sitemizde üçüncü taraf çerez veya izleyici (reklam, analiz) bulunmamaktadır. Gelecekte eklenecek olursa bu politika güncellenir ve hangi hizmetin hangi amaçla kullanıldığı burada açıkça listelenir.</p>\n<h2>Çerezleri nasıl kontrol edersiniz?</h2>\n<p>Tarayıcınızın ayarlarından çerezleri engelleyebilir veya silebilirsiniz. Yaygın tarayıcılarda izlenecek yol şöyledir:</p>\n<ul>\n<li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri; site verilerini temizlemek için “Tüm site verilerini ve izinleri gör” bölümünü kullanın.</li>\n<li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri → “Verileri temizle” veya “Verileri yönet”.</li>\n<li><strong>Safari:</strong> Tercihler/Ayarlar → Gizlilik → “Web sitesi verilerini yönet”.</li>\n<li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri → “Çerezleri ve site verilerini yönet ve sil”.</li>\n</ul>\n<p>Yerel depolamayı temizlemek için aynı bölümlerdeki “site verilerini temizle” seçeneğini kullanmanız yeterlidir.</p>\n<h2>Depolama süreleri</h2>\n<p>Yerel depolamada tutulan değerler, siz tarayıcı verilerinizi temizleyene kadar cihazınızda kalır; belirli bir süre sonunda kendiliğinden silinmez. İstediğiniz an aşağıdaki adımlarla kaldırabilirsiniz. Sitemize farklı bir tarayıcı veya cihazdan girerseniz bu değerler orada bulunmaz; çünkü veriler sunucuda değil, yalnızca ilk kullandığınız cihazda saklanır.</p>\n<h2>Depolamayı kapatırsanız ne olur?</h2>\n<p>Teknik depolamayı kapatmanız hesaplayıcıların çalışmasını engellemez; tüm hesaplamalar yine yapılır. Yalnızca son değerleri hatırlama gibi kolaylık özellikleri devre dışı kalabilir. Çerezleri tamamen engellemeniz de sitemizi kullanmanıza engel değildir; sitemiz çerez onayı gerektiren bir izleme yapmadığı için bir “çerez banneri” göstermeyiz.</p>\n<h2>Değişiklikler</h2>\n<p>Bu politika güncellenirse yeni sürüm bu sayfada yayımlanır ve üstteki “Son güncelleme” tarihi değişir.</p>\n<h2>İletişim</h2>\n<p>Çerez ve depolama uygulamalarımızla ilgili sorularınız için: <a href="mailto:info@lgspuan-hesaplama.com">info@lgspuan-hesaplama.com</a></p>'
),
}

for slug, (title, meta, h1, kicker, lede, body) in PAGES.items():
    d = os.path.join(ROOT, slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(
        page(slug, title, meta, h1, kicker, lede, body))
    print("wrote", slug, "| title:", len(title), "chars | meta:", len(meta), "chars")
