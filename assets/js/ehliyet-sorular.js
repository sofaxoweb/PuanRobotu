'use strict';
/* =====================================================================
   PuanRobotu — Ehliyet pratik soru bankası (200 soru)
   DİKKAT: Bu sorular MEB müfredatına uygun hazırlanmış ÖZGÜN pratik
   sorularıdır; gerçek MEB e-Sınav soruları değildir. MEB gerçek sınav
   sorularını yayınlamaz.
   Ders dağılımı: trafik 50, ilkyardim 50, aracteknik 50, adab 50.
   Format: {d: ders, s: soru, o: [4 şık], c: doğru indeks (0-3), a: açıklama}
   ===================================================================== */

var EHLIYET_SORULAR = [
 {
  "d": "trafik",
  "s": "Tali yoldan ana yola çıkmak üzere olan bir sürücü, kavşak girişinde sekizgen biçimindeki kırmızı levhayı görüyor. Bu durumda ne yapmalıdır?",
  "o": [
   "Yavaşlayarak ana yoldaki araçlara yol vermelidir",
   "Durmadan kavşağa girip sağdan geleni beklemelidir",
   "Durup ana yoldaki araçlara yol verdikten sonra geçmelidir",
   "Kornaya basarak geçiş üstünlüğünü kullanmalıdır"
  ],
  "c": 2,
  "a": "Sekizgen kırmızı levha 'Dur' anlamındadır; sürücü durup ana yoldaki araçlara yol verdikten sonra geçiş yapmalıdır."
 },
 {
  "d": "trafik",
  "s": "Ters üçgen biçimindeki trafik levhası sürücüye neyi bildirir?",
  "o": [
   "Duraklama yasağını",
   "Hız sınırını",
   "Giriş yasağını",
   "Yol verme zorunluluğunu"
  ],
  "c": 3,
  "a": "Ters üçgen levha 'Yol Ver' anlamındadır; kavşakta geçiş hakkı bulunan araçlara yol verilir."
 },
 {
  "d": "trafik",
  "s": "Kırmızı çerçeveli yuvarlak levhanın içinde '30' yazmaktadır. Bu levha ne anlama gelir?",
  "o": [
   "Asgari hızın 30 km/s olduğunu",
   "Azami hızın 30 km/s olduğunu",
   "30 metrede durma yasağını",
   "30 dakika park iznini"
  ],
  "c": 1,
  "a": "Kırmızı çerçeveli yuvarlak levhalar yasaklama bildirir; içindeki sayı o kesimdeki azami hız sınırıdır."
 },
 {
  "d": "trafik",
  "s": "Üzerinde iki otomobil simgesi bulunan, kırmızı çerçeveli yuvarlak levha neyi yasaklar?",
  "o": [
   "Sollama yapmayı",
   "Park etmeyi",
   "Korna çalmayı",
   "U dönüşü yapmayı"
  ],
  "c": 0,
  "a": "Bu levha 'öndeki taşıtı geçme (sollama) yasağı' anlamındadır."
 },
 {
  "d": "trafik",
  "s": "Kırmızı çerçeveli üçgen levhada kayan bir otomobil simgesi görülüyor. Bu levha sürücüyü neye karşı uyarır?",
  "o": [
   "Keskin viraja",
   "Buzlanma ve kaygan zemine",
   "Yol çalışmasına",
   "Okul geçidine"
  ],
  "c": 1,
  "a": "Bu levha 'kaygan yol' uyarısıdır; hız azaltılmalı ve takip mesafesi artırılmalıdır."
 },
 {
  "d": "trafik",
  "s": "Mavi zemin üzerinde beyaz 'P' harfi bulunan kare levha neyi gösterir?",
  "o": [
   "Polis kontrol noktasını",
   "Petrol istasyonunu",
   "Yaya geçidini",
   "Park yerini"
  ],
  "c": 3,
  "a": "Mavi zeminli kare levhalar bilgilendirme amaçlıdır; 'P' harfi park edilebilecek alanı gösterir."
 },
 {
  "d": "trafik",
  "s": "Mavi zeminli yuvarlak levhada kırmızı çapraz (X) çizgi varsa bu ne anlama gelir?",
  "o": [
   "Park etmenin yasak olduğunu",
   "Duraklamanın ve park etmenin yasak olduğunu",
   "Yalnızca durmanın yasak olduğunu",
   "Hız sınırını"
  ],
  "c": 1,
  "a": "Tek eğik çizgi park yasağı, çapraz (X) çizgi ise duraklama ve park etme yasağı anlamındadır."
 },
 {
  "d": "trafik",
  "s": "Üzerinde tren simgesi bulunan üçgen levhayı gören sürücü ne anlamalıdır?",
  "o": [
   "Kontrollü demiryolu geçidine yaklaşıldığını",
   "Tramvay durağına gelindiğini",
   "Hızlı tren hattının altından geçileceğini",
   "Yük treni park alanına girildiğini"
  ],
  "c": 0,
  "a": "Bu tehlike levhası ileride hemzemin (demiryolu) geçit bulunduğunu bildirir; hız azaltılmalıdır."
 },
 {
  "d": "trafik",
  "s": "Otomobil ile otoyolda seyreden bir sürücünün uyması gereken azami hız sınırı kaç km/s'tir?",
  "o": [
   "100",
   "110",
   "130",
   "120"
  ],
  "c": 3,
  "a": "MEB müfredatına göre otomobilin otoyoldaki azami hız sınırı 120 km/s'tir."
 },
 {
  "d": "trafik",
  "s": "Bölünmüş yolda kamyon kullanan bir sürücü en fazla kaç km/s hızla gidebilir?",
  "o": [
   "80",
   "90",
   "85",
   "100"
  ],
  "c": 2,
  "a": "Kamyon ve kamyonetlerin bölünmüş yollardaki azami hız sınırı 85 km/s'tir."
 },
 {
  "d": "trafik",
  "s": "Yerleşim yeri içinde motosiklet kullanan sürücünün azami hızı kaç km/s'tir?",
  "o": [
   "50",
   "30",
   "40",
   "60"
  ],
  "c": 0,
  "a": "Yerleşim yeri içinde tüm motorlu taşıtlar için azami hız 50 km/s'tir."
 },
 {
  "d": "trafik",
  "s": "Otobüs sürücüsünün otoyolda uyması gereken azami hız sınırı kaç km/s'tir?",
  "o": [
   "90",
   "100",
   "110",
   "120"
  ],
  "c": 1,
  "a": "Otobüs ve minibüslerin otoyoldaki azami hız sınırı 100 km/s'tir."
 },
 {
  "d": "trafik",
  "s": "Hız sınırı levhası bulunmayan, yerleşim yeri dışındaki iki yönlü bir yolda otomobilin azami hızı kaç km/s'tir?",
  "o": [
   "70",
   "80",
   "90",
   "110"
  ],
  "c": 2,
  "a": "Otomobilin yerleşim yeri dışındaki iki yönlü yollardaki azami hız sınırı 90 km/s'tir."
 },
 {
  "d": "trafik",
  "s": "Şiddetli yağmurda kayganlaşan yolda seyreden sürücü hız konusunda nasıl davranmalıdır?",
  "o": [
   "Yasal hız sınırına kadar hızlanmalıdır",
   "Su birikintilerinden hızla geçmelidir",
   "Dörtlüleri yakıp hızını sabit tutmalıdır",
   "Yasal sınırın da altında, şartlara uygun hızla gitmelidir"
  ],
  "c": 3,
  "a": "Yasal sınır en elverişli şartlar içindir; yağışlı ve kaygan zeminde hız, yol şartlarına göre daha da düşürülmelidir."
 },
 {
  "d": "trafik",
  "s": "90 km/s hızla giden bir otomobil sürücüsünün, normal hava ve yol şartlarında öndeki araçla arasında bırakması gereken en az takip mesafesi kaç metredir?",
  "o": [
   "25",
   "45",
   "30",
   "90"
  ],
  "c": 1,
  "a": "Takip mesafesi, km/s cinsinden hızın en az yarısı kadar metredir; 90 km/s için 45 metredir."
 },
 {
  "d": "trafik",
  "s": "Dönel kavşağa girmek üzere olan sürücü nasıl davranmalıdır?",
  "o": [
   "Hızlanarak kavşağa önce girmelidir",
   "Kornaya basarak öncelik istemelidir",
   "Kavşak içindeki araçlara yol vererek giriş yapmalıdır",
   "Sağdan geleni beklemeden düz devam etmelidir"
  ],
  "c": 2,
  "a": "Dönel kavşaklarda geçiş hakkı kavşak içindeki araçlarındır; kavşağa giren sürücü onlara yol verir."
 },
 {
  "d": "trafik",
  "s": "Tali yoldan ana yola çıkmak isteyen sürücü kime yol vermek zorundadır?",
  "o": [
   "Ana yolda seyreden tüm araçlara",
   "Yalnızca sağdan gelen araçlara",
   "Yalnızca yayalara",
   "Hiç kimseye, önce davranma hakkı onundur"
  ],
  "c": 0,
  "a": "Tali yoldaki sürücü, ana yolda seyreden bütün araçlara yol vermek zorundadır."
 },
 {
  "d": "trafik",
  "s": "Işıksız ve işaretsiz eşdeğer kavşakta aynı anda gelen araçlardan hangisi önce geçer?",
  "o": [
   "Soldan gelen araç",
   "Hızı yüksek olan araç",
   "Dönüş yapacak olan araç",
   "Sağdan gelen araç"
  ],
  "c": 3,
  "a": "Eşdeğer (öncelik sıralaması belirtilmemiş) kavşaklarda sağdan gelen araç geçiş önceliğine sahiptir."
 },
 {
  "d": "trafik",
  "s": "Tepe lambası ve sirenini birlikte çalıştırarak görev hâlinde ilerleyen ambulansa diğer sürücüler nasıl davranmalıdır?",
  "o": [
   "Hızlanarak ambulansın önünden uzaklaşmalıdır",
   "Ambulansı takip ederek arkasından gitmelidir",
   "Yol verip gerektiğinde durarak geçişini kolaylaştırmalıdır",
   "Şerit değiştirmeden yoluna devam etmelidir"
  ],
  "c": 2,
  "a": "Geçiş üstünlüğü bulunan araçlara, görev hâlindeyken ışıklı ve sesli uyarıyı birlikte kullandıklarında yol verilmesi zorunludur."
 },
 {
  "d": "trafik",
  "s": "Kavşakta düz gitmek isteyen araç ile sola dönmek isteyen araç karşılaşırsa hangisi önce geçer?",
  "o": [
   "Düz gidecek araç",
   "Sola dönecek araç",
   "Önce sinyal veren araç",
   "Büyük olan araç"
  ],
  "c": 0,
  "a": "Düz giden araçlar, dönüş yapan araçlara göre kavşaklarda geçiş önceliğine sahiptir."
 },
 {
  "d": "trafik",
  "s": "Kavşakta tramvay ile karşılaşan sürücü ne yapmalıdır?",
  "o": [
   "Tramvayın önüne geçerek yoluna devam etmelidir",
   "Tramvaya yol vermelidir",
   "Kornaya basarak tramvayı durdurmalıdır",
   "Tramvayı sollayarak geçmelidir"
  ],
  "c": 1,
  "a": "Bütün sürücüler, doğru geçmekte olan tramvaylara yol vermek zorundadır."
 },
 {
  "d": "trafik",
  "s": "Kavşakta trafik polisi 'dur' işareti verirken trafik ışığı yeşil yanıyorsa sürücü ne yapmalıdır?",
  "o": [
   "Yeşil ışık yandığı için geçmelidir",
   "Yavaşlayıp dikkatle geçmelidir",
   "Işığın değişmesini beklemelidir",
   "Polisin işaretine uyarak durmalıdır"
  ],
  "c": 3,
  "a": "Trafik işaretlerine uyma önceliği sırası: görevli (trafik polisi), ışıklı işaretler, trafik levhaları ve yer işaretlemeleridir."
 },
 {
  "d": "trafik",
  "s": "Yanıp sönen sarı ışıkla karşılaşan sürücü ne anlamalıdır?",
  "o": [
   "Durup beklemesi gerektiğini",
   "Hızlanıp kavşaktan çıkması gerektiğini",
   "Yavaşlayıp dikkatli geçmesi, yol vermesi gerektiğini",
   "Işığın arızalı olduğunu ve durması gerektiğini"
  ],
  "c": 2,
  "a": "Yanıp sönen sarı ışık 'yol ver' anlamındadır; durma zorunluluğu yoktur ancak dikkatli geçilmelidir."
 },
 {
  "d": "trafik",
  "s": "Bir sürücü yangın musluğunun hemen yanına park ediyor. Bu davranış neden hatalıdır?",
  "o": [
   "Musluğun rengine zarar verdiği için",
   "Yangın musluğuna 5 metreden yakın park etmek yasaktır",
   "Sadece gece park edilebileceği için",
   "Belediye izni gerektiği için"
  ],
  "c": 1,
  "a": "Yangın musluklarına 5 metreden daha yakın mesafeye park etmek yasaktır."
 },
 {
  "d": "trafik",
  "s": "Aşağıdakilerden hangisinde park etmek yasaktır?",
  "o": [
   "Kavşak içinde ve kavşağa 5 metre mesafede",
   "Park levhası bulunan alanda",
   "Otoparkta",
   "Park cebi bulunan yolda"
  ],
  "c": 0,
  "a": "Kavşak içlerine ve kavşaklara 5 metreden yakın yerlere park etmek yasaktır."
 },
 {
  "d": "trafik",
  "s": "Yolcuyu indirip bindirmek amacıyla 5 dakikayı aşmamak üzere taşıtın durdurulmasına ne ad verilir?",
  "o": [
   "Durma",
   "Park etme",
   "Bekleme",
   "Duraklama"
  ],
  "c": 3,
  "a": "Duraklama; yolcu indirip bindirmek veya yük yükleyip boşaltmak için en çok 5 dakika süreyle durmadır."
 },
 {
  "d": "trafik",
  "s": "Eğimli bir yola park eden sürücü, taşıtın kaymasını önlemek için aşağıdakilerden hangisini yapmalıdır?",
  "o": [
   "Tekerlekleri yolun ortasına doğru çevirmelidir",
   "El frenini çekip vitesi boşa almalıdır",
   "El frenini çekip ön tekerlekleri kaldırıma doğru çevirmelidir",
   "Camları açık bırakmalıdır"
  ],
  "c": 2,
  "a": "Eğimli yolda el freni çekilir, vites yokuşa uygun konuma alınır ve ön tekerlekler kaldırıma doğru çevrilir."
 },
 {
  "d": "trafik",
  "s": "Taşıt yolunun sağına ikinci sıra hâlinde (çift sıra) park eden sürücünün davranışı için ne söylenebilir?",
  "o": [
   "Trafiği engellediği için yasaktır",
   "Kısa süreliyse serbesttir",
   "Sadece gündüz serbesttir",
   "Dörtlüleri yakarsa serbesttir"
  ],
  "c": 0,
  "a": "İkinci sıra park etmek yasaktır; trafik akışını engeller ve kazaya davetiye çıkarır."
 },
 {
  "d": "trafik",
  "s": "Belediye otobüsü durağını gösteren levhanın bulunduğu yere özel otomobilini park eden sürücü için hangisi doğrudur?",
  "o": [
   "Duraklarda kısa süreli park serbesttir",
   "Hafta sonları park edilebilir",
   "Duraklara park etmek yasaktır, ceza uygulanır",
   "Yolcu bekliyorsa park edilebilir"
  ],
  "c": 2,
  "a": "Otobüs, tramvay ve taksi duraklarına park etmek yasaktır."
 },
 {
  "d": "trafik",
  "s": "Tepe üstü ve dönemeç gibi görüşün yeterli olmadığı yerlerde sollama yapmak neden yasaktır?",
  "o": [
   "Yakıt tüketimini artırdığı için",
   "Hız sınırını aştığı için",
   "Şerit çizgilerinin silik olması nedeniyle",
   "Karşı yönden geleni görememe riski taşıdığı için"
  ],
  "c": 3,
  "a": "Görüşün kapalı olduğu yerlerde sollama, karşı yönden gelen taşıtın görülememesi nedeniyle yasaktır."
 },
 {
  "d": "trafik",
  "s": "Yaya geçidine yaklaşan bir sürücünün sollama yapması ile ilgili hangisi doğrudur?",
  "o": [
   "Yaya yoksa sollama yapılabilir",
   "Yaya ve okul geçitlerinde sollama yasaktır",
   "Hız düşükse sollama yapılabilir",
   "Gece sollama yapılabilir"
  ],
  "c": 1,
  "a": "Yaya geçitleri ile okul geçitlerinde öndeki taşıtı geçmek (sollama) yasaktır."
 },
 {
  "d": "trafik",
  "s": "Şerit değiştirmek isteyen sürücü öncelikle ne yapmalıdır?",
  "o": [
   "Sinyal verip ayna ve kör noktayı kontrol etmelidir",
   "Hızını artırıp şeride girmelidir",
   "Kornaya basmalıdır",
   "Dörtlüleri yakmalıdır"
  ],
  "c": 0,
  "a": "Şerit değiştirmeden önce sinyal verilir, aynalar ve kör nokta kontrol edilir; güvenli aralık beklenir."
 },
 {
  "d": "trafik",
  "s": "Bölünmüş yolda en sol şeridin sürekli olarak işgal edilmesi neden hatalıdır?",
  "o": [
   "Yakıt tüketimini artırdığı için",
   "Hız sınırını düşürdüğü için",
   "Sol şeridin geçiş ve sollama amacıyla kullanılması gerektiği için",
   "Lastikleri yıprattığı için"
  ],
  "c": 2,
  "a": "Çok şeritli yollarda en sol şerit, öndeki taşıtları geçmek içindir; işi biten sürücü sağ şeride dönmelidir."
 },
 {
  "d": "trafik",
  "s": "'DUR' levhasını açmış şekilde yolcu indirip bindiren okul taşıtının yanından geçen sürücü nasıl davranmalıdır?",
  "o": [
   "Hızlanarak yanından geçmelidir",
   "Kornaya basarak uyarmalıdır",
   "Karşı şeride geçerek sollamalıdır",
   "Durmuş okul taşıtını geçmemeli ve sollamamalıdır"
  ],
  "c": 3,
  "a": "Dur işareti açmış okul taşıtları geçilemez; öğrencilerin güvenliği için beklenir."
 },
 {
  "d": "trafik",
  "s": "Kavşaklara yaklaşırken sollama yapılması ile ilgili hangisi doğrudur?",
  "o": [
   "Hız düşükse kavşakta sollama serbesttir",
   "Kavşak içinde ve kavşağa yaklaşırken sollama yasaktır",
   "Sinyal verilirse kavşakta sollama yapılabilir",
   "Gece kavşaklarda sollama serbesttir"
  ],
  "c": 1,
  "a": "Kavşaklar ile kavşaklara yaklaşılan kesimlerde öndeki taşıtı geçmek yasaktır."
 },
 {
  "d": "trafik",
  "s": "Yolda devamlı (kesiksiz) çizgi bulunan kesimde sürücü ne yapamaz?",
  "o": [
   "Hızını artıramaz",
   "Sinyal veremez",
   "Şerit değiştiremez ve sollama yapamaz",
   "Duraklama yapamaz"
  ],
  "c": 2,
  "a": "Devamlı çizgi, şerit değiştirme ve sollama yasağı anlamındadır; çizgi üzerinden geçilemez."
 },
 {
  "d": "trafik",
  "s": "Bir yıl içinde 100 ceza puanını dolduran sürücünün sürücü belgesine ne olur?",
  "o": [
   "2 ay süreyle geri alınır",
   "1 ay süreyle geri alınır",
   "Süresiz iptal edilir",
   "Hiçbir işlem yapılmaz"
  ],
  "c": 0,
  "a": "Bir yıl içinde 100 ceza puanına ulaşan sürücünün sürücü belgesi 2 ay süreyle geri alınır."
 },
 {
  "d": "trafik",
  "s": "Hususi otomobil sürücüleri için yasal alkol sınırı kaç promildir?",
  "o": [
   "0,20",
   "0,80",
   "1,00",
   "0,50"
  ],
  "c": 3,
  "a": "Hususi otomobil sürücülerinde yasal sınır 0,50 promildir; ticari araç sürücülerinde ise 0,20 promildir."
 },
 {
  "d": "trafik",
  "s": "Alkollü araç kullandığı ilk kez tespit edilen sürücünün belgesi ne kadar süreyle geri alınır?",
  "o": [
   "3 ay",
   "6 ay",
   "1 yıl",
   "2 yıl"
  ],
  "c": 1,
  "a": "Alkollü yakalanan sürücünün belgesi ilk seferde 6 ay, tekrarında 2 yıl süreyle geri alınır."
 },
 {
  "d": "trafik",
  "s": "Kırmızı ışıkta geçerek trafik güvenliğini tehlikeye atan sürücüye ne uygulanır?",
  "o": [
   "Yalnızca sözlü uyarı yapılır",
   "Aracı bir hafta bağlanır",
   "İdari para cezası ve 20 ceza puanı uygulanır",
   "Sürücü belgesi süresiz iptal edilir"
  ],
  "c": 2,
  "a": "Kırmızı ışık ihlali, idari para cezası ile birlikte 20 ceza puanı gerektirir."
 },
 {
  "d": "trafik",
  "s": "Seyir hâlinde emniyet kemeri takmayan sürücü için hangisi doğrudur?",
  "o": [
   "Ceza uygulanmaz, yalnızca uyarılır",
   "Aracı trafikten men edilir",
   "Sürücü belgesine el konulur",
   "İdari para cezası ve 15 ceza puanı uygulanır"
  ],
  "c": 3,
  "a": "Emniyet kemeri takmamak, idari para cezası ve 15 ceza puanı ile cezalandırılır."
 },
 {
  "d": "trafik",
  "s": "Seyir hâlinde cep telefonu ile konuşan sürücüye hangi yaptırım uygulanır?",
  "o": [
   "10 ceza puanı ve idari para cezası",
   "Sürücü belgesinin iptali",
   "Aracın bağlanması",
   "Yalnızca uyarı"
  ],
  "c": 0,
  "a": "Seyir hâlinde cep telefonu kullanmak 10 ceza puanı ve idari para cezası gerektirir."
 },
 {
  "d": "trafik",
  "s": "Periyodik muayenesi yapılmamış bir araçla trafiğe çıkan sürücüye ne uygulanır?",
  "o": [
   "Hiçbir yaptırım uygulanmaz",
   "İdari para cezası uygulanır ve araç trafikten men edilir",
   "Sürücü belgesi iptal edilir",
   "Araç hurdaya ayrılır"
  ],
  "c": 1,
  "a": "Muayenesiz araçla trafiğe çıkmak yasaktır; idari para cezası uygulanır ve araç trafikten men edilir."
 },
 {
  "d": "trafik",
  "s": "Egzoz gazı emisyon ölçümünü zamanında yaptırmayan bir araç için hangisi doğrudur?",
  "o": [
   "Yalnızca yakıt tüketimi artar",
   "Hiçbir yaptırımı yoktur",
   "Zorunlu ölçümdür; yaptırmayan araca ceza uygulanır",
   "Sadece şehir dışına çıkamaz"
  ],
  "c": 2,
  "a": "Egzoz emisyon ölçümü hava kirliliğini önlemek için zorunludur; süresinde yaptırmayan araca idari para cezası uygulanır."
 },
 {
  "d": "trafik",
  "s": "Yerleşim yeri içinde gereksiz yere korna çalan sürücünün davranışı nasıl değerlendirilir?",
  "o": [
   "Gürültü kirliliğine neden olduğu için yasaktır",
   "Trafiği hızlandırdığı için faydalıdır",
   "Serbesttir, ceza uygulanmaz",
   "Yalnızca gece yasaktır"
  ],
  "c": 0,
  "a": "Yerleşim yerlerinde gereksiz korna çalmak gürültü kirliliği sayılır ve yasaktır."
 },
 {
  "d": "trafik",
  "s": "Uzun süre bekleyecek olan sürücünün motoru rölantide çalıştırmaya devam etmesi neden sakıncalıdır?",
  "o": [
   "Motorun soğumasına neden olduğu için",
   "Aküyü şarj ettiği için",
   "Lastikleri yıprattığı için",
   "Yakıt israfı ve hava kirliliğine yol açtığı için"
  ],
  "c": 3,
  "a": "Motoru gereksiz yere çalışır durumda bırakmak hem yakıt israfıdır hem de egzoz gazlarıyla hava kirliliğine yol açar."
 },
 {
  "d": "trafik",
  "s": "Yakıt tasarrufu sağlamak isteyen bir sürücü aşağıdakilerden hangisini yapmalıdır?",
  "o": [
   "Motoru yüksek devirde kullanmalıdır",
   "Ani hızlanma ve sert frenlerden kaçınmalıdır",
   "Camları sürekli açık tutmalıdır",
   "Gereksiz yükü bagajda taşımalıdır"
  ],
  "c": 1,
  "a": "Sakin ve öngörülü sürüş; ani hızlanma ile sert frenlemeden kaçınmak yakıt tüketimini belirgin şekilde azaltır."
 },
 {
  "d": "trafik",
  "s": "Lastik hava basınçlarının normalden düşük olması aşağıdakilerden hangisine yol açar?",
  "o": [
   "Yakıt tüketiminin artmasına",
   "Fren mesafesinin kısalmasına",
   "Motor gücünün artmasına",
   "Direksiyonun hafiflemesine"
  ],
  "c": 0,
  "a": "Düşük hava basıncı yuvarlanma direncini artırır; bu da yakıt tüketimini yükseltir."
 },
 {
  "d": "trafik",
  "s": "Değiştirilen motor yağı ve yağ filtresinin çevreye atılması ile ilgili hangisi doğrudur?",
  "o": [
   "Toprağı ve suyu kirlettiği için atık toplama noktalarına verilmelidir",
   "Çöpe atılabilir",
   "Yola dökülebilir",
   "Yakılabilir"
  ],
  "c": 0,
  "a": "Atık yağlar tehlikeli atıktır; toprağa ve suya karışması çevre kirliliğine yol açar, lisanslı toplama noktalarına verilmelidir."
 },
 {
  "d": "trafik",
  "s": "Çevreye duyarlı bir sürücü, sık dur-kalk gerektiren şehir içi sürüşlerde neye dikkat etmelidir?",
  "o": [
   "Sürekli yüksek devirde kullanmaya",
   "Mümkün olduğunca sabit hızla, vitesine uygun devirde gitmeye",
   "Klimayı en yüksekte çalıştırmaya",
   "Farları gündüz de uzun hüzmede yakmaya"
  ],
  "c": 1,
  "a": "Uygun vites ve olabildiğince sabit hızla sürüş, şehir içi trafikte hem yakıt tasarrufu hem de daha az emisyon sağlar."
 },
 {
  "d": "ilkyardim",
  "s": "Trafik kazası geçirmiş, hareketsiz yatan bir sürücüyle karşılaştınız. Yapmanız gereken İLK işlem aşağıdakilerden hangisidir?",
  "o": [
   "Omzuna hafifçe dokunup seslenerek bilinç durumunu kontrol etmek",
   "Hemen 112'yi arayarak ambulans çağırmak",
   "Sürücüyü araçtan çıkarıp yol kenarına taşımak",
   "Sürücüye su içirerek kendine gelmesini sağlamak"
  ],
  "c": 0,
  "a": "Müdahaleden önce bilincin açık mı kapalı mı olduğu omza dokunarak ve seslenerek kontrol edilir; yapılacak tüm işlemler bu değerlendirmeye göre planlanır."
 },
 {
  "d": "ilkyardim",
  "s": "Kaza yerinde solunumu olmayan bir yaralı buldunuz ve çevrede sizden başka kimse yok. Doğru davranış sırası hangisidir?",
  "o": [
   "Yaralıyı kendi aracınızla en yakın hastaneye götürmek",
   "Önce 112'yi arayıp yardım istedikten sonra temel yaşam desteğine başlamak",
   "Önce temel yaşam desteğine başlayıp sonra 112'yi aramak",
   "Yaralının kimliğini belirleyip yakınlarına haber vermek"
  ],
  "c": 1,
  "a": "Yalnız kurtarıcı önce 112'yi arar; profesyonel yardım ne kadar erken istenirse yaralının yaşama şansı o kadar artar, ardından temel yaşam desteğine başlanır."
 },
 {
  "d": "ilkyardim",
  "s": "112 acil çağrı merkezini aradığınızda aşağıdaki bilgilerden hangisini vermeniz gerekmez?",
  "o": [
   "Olay yerinin açık adresini ve yol tarifini",
   "Geri dönüş için kendi telefon numaranızı",
   "Yaralının kan grubunu ve kullandığı ilaçları",
   "Olayın ne olduğunu ve yaklaşık yaralı sayısını"
  ],
  "c": 2,
  "a": "112 görevlisi olayın niteliğini, adresi ve iletişim numarasını ister; yaralının kan grubu ve ilaçları acil çağrı sırasında verilmesi gereken bilgilerden değildir."
 },
 {
  "d": "ilkyardim",
  "s": "Bilinci kapalı ancak düzenli solunumu olan bir kazazedeye nasıl pozisyon verilmelidir?",
  "o": [
   "Yüzüstü yatırılıp başı yana çevrilir",
   "Sırtüstü yatırılıp bacakları yukarı kaldırılır",
   "Oturur pozisyona getirilip başı öne eğilir",
   "Yan yatırılarak koma (derlenme) pozisyonu verilir ve 112 beklenir"
  ],
  "c": 3,
  "a": "Bilinci kapalı fakat solunumu olan kazazede koma pozisyonunda tutulur; bu pozisyon dilin geriye kaymasını ve kusmuğun solunum yolunu tıkamasını engeller."
 },
 {
  "d": "ilkyardim",
  "s": "İlk yardımda ABC değerlendirmesinin 'A' basamağında ne kontrol edilir?",
  "o": [
   "Havayolunun açık olup olmadığı",
   "Atardamardan kanama olup olmadığı",
   "Vücut ısısının normal aralıkta olup olmadığı",
   "Yaralının çevreyi algılayıp algılamadığı"
  ],
  "c": 0,
  "a": "ABC'nin A basamağı 'Airway' yani havayoludur; önce havayolunun açık olduğu kontrol edilir, ardından solunum (B) ve dolaşım (C) değerlendirilir."
 },
 {
  "d": "ilkyardim",
  "s": "Solunumu durmuş bir kazazedenin havayolunu açmak için uygulanması gereken doğru teknik hangisidir?",
  "o": [
   "Ağzı parmakla karıştırıp dili dışarı çekmek",
   "Başı geriye yatırıp çeneyi yukarı kaldırmak",
   "Başı öne eğip çeneyi göğse doğru bastırmak",
   "Kazazedeyi yüzüstü çevirip sırtına vurmak"
  ],
  "c": 1,
  "a": "Baş geriye-çene yukarı manevrası, geriye kayan dili kaldırarak havayolunu açar; solunumun değerlendirilmesinden önce mutlaka uygulanır."
 },
 {
  "d": "ilkyardim",
  "s": "Bir kazazedede solunumun varlığı nasıl ve ne kadar süreyle kontrol edilir?",
  "o": [
   "Nabız bir tam dakika sayılarak",
   "Ağza ayna tutulup buğulanma gözlenerek",
   "Bak-dinle-hisset yöntemiyle en fazla 10 saniye",
   "Göğüs hareketine 5 saniye boyunca bakılarak"
  ],
  "c": 2,
  "a": "Bak (göğüs hareketi), dinle (solunum sesi), hisset (yanakta hava akımı) yöntemi en fazla 10 saniye uygulanır; daha uzun süre beklemek müdahaleyi geciktirir."
 },
 {
  "d": "ilkyardim",
  "s": "Olay yerinde birden fazla yaralı var ve yalnızsınız. İlk yardımda öncelik kuralı nedir?",
  "o": [
   "En çok bağıran yaralıya önce müdahale edilir",
   "Olay yerine en yakın yaralıya önce bakılır",
   "Yaşlı yaralılara gençlerden önce müdahale edilir",
   "Önce kendi güvenliğiniz sağlanır, sonra durumu en ağır olan yaralıya müdahale edilir"
  ],
  "c": 3,
  "a": "Kurtarıcı önce kendi güvenliğini sağlamalıdır; ardından yaşamı en çok tehdit altında olan yaralıya öncelik verilir, bu uygulamaya triyaj denir."
 },
 {
  "d": "ilkyardim",
  "s": "Yetişkin bir kazazedeye kalp masajı uygulanırken eller göğsün neresine yerleştirilir?",
  "o": [
   "Göğüs kemiğinin alt yarısının ortasına",
   "Sol göğüs üzerine kalp hizasına",
   "Göğüs kemiğinin en üst noktasına",
   "Karın boşluğunun orta kısmına"
  ],
  "c": 0,
  "a": "Kalp masajında bir elin topuğu göğüs kemiğinin alt yarısının ortasına yerleştirilir; bu nokta kalbe en etkili basıncı iletir."
 },
 {
  "d": "ilkyardim",
  "s": "Yetişkin bir kazazedeye tek kurtarıcı temel yaşam desteği uygularken kalp masajı ve suni solunum oranı ne olmalıdır?",
  "o": [
   "60 kalp masajı - 4 suni solunum",
   "30 kalp masajı - 2 suni solunum",
   "15 kalp masajı - 1 suni solunum",
   "5 kalp masajı - 1 suni solunum"
  ],
  "c": 1,
  "a": "Tek kurtarıcı yetişkinde 30 bası ve 2 solunum döngüsünü kesintisiz sürdürür; bu oran kalbe ve beyne yeterli kan akımını sağlar."
 },
 {
  "d": "ilkyardim",
  "s": "Yetişkinde kalp masajı uygulanırken bası hızı dakikada kaç olmalıdır?",
  "o": [
   "Dakikada 60-80 bası",
   "Dakikada 160-180 bası",
   "Dakikada 100-120 bası",
   "Dakikada 40-50 bası"
  ],
  "c": 2,
  "a": "Kalp masajı dakikada 100-120 bası hızıyla uygulanır; daha yavaş bası yeterli kan akımı sağlamaz, daha hızlı bası ise göğsün yeterince gevşemesine izin vermez."
 },
 {
  "d": "ilkyardim",
  "s": "Yetişkin bir kazazedeye kalp masajı uygulanırken göğüs kemiği ne kadar çöktürülmelidir?",
  "o": [
   "2-3 cm çöktürülür",
   "3-4 cm çöktürülür",
   "Göğüs hiç çöktürülmeden yüzeysel bası yapılır",
   "En az 5 cm çöktürülecek derinlikte bası yapılır"
  ],
  "c": 3,
  "a": "Yetişkinde kalp masajı göğsü en az 5 cm çöktürecek derinlikte uygulanır; yetersiz derinlik kalbin etkili şekilde kan pompalamasını engeller."
 },
 {
  "d": "ilkyardim",
  "s": "Koldaki açık yaradan yoğun kanama olan bir kazazedeye yapılacak İLK müdahale nedir?",
  "o": [
   "Yaraya temiz bir bezle doğrudan basınç uygulamak",
   "Yarayı suyla yıkayıp üzerini açık bırakmak",
   "Kanayan kolu kalp seviyesinin altına indirmek",
   "Yaraya tentürdiyot döküp sarmak"
  ],
  "c": 0,
  "a": "Dış kanamada ilk ve en etkili müdahale, yaraya temiz bir bezle doğrudan basınç uygulamaktır; bu basınç damarların büzüşmesine ve pıhtılaşmaya yardımcı olur."
 },
 {
  "d": "ilkyardim",
  "s": "Bacağındaki kanama basınçla durdurulamayan bir yaralıda turnike (boğucu sargı) uygulanmasına ne zaman karar verilir?",
  "o": [
   "Yaralı bayılmadan hemen önce",
   "Basınçla durdurulamayan yoğun kanamalarda ve uzuv kopmalarında",
   "Her kanamada ilk seçenek olarak",
   "Yara küçük olsa bile önlem amacıyla"
  ],
  "c": 1,
  "a": "Turnike yalnızca doğrudan basınçla durdurulamayan şiddetli kanamalarda ve kopmalarda son çare olarak uygulanır; gereksiz turnike doku hasarına yol açar."
 },
 {
  "d": "ilkyardim",
  "s": "Turnike uygulamasıyla ilgili doğru bilgi hangisidir?",
  "o": [
   "Turnike yaralı hastaneye varana kadar sık sık gevşetilir",
   "Turnike uygulanan saatin not edilmesine gerek yoktur",
   "Turnike, kanayan yer ile kalp arasında kalan tek kemikli bölgeye geniş bir sargıyla uygulanır",
   "Turnike ince bir ip veya tel ile sıkıca bağlanır"
  ],
  "c": 2,
  "a": "Turnike geniş bir sargı beziyle, yara ile kalp arasındaki tek kemikli bölgeye uygulanır ve uygulama saati mutlaka not edilir; ince malzeme dokuyu keser."
 },
 {
  "d": "ilkyardim",
  "s": "İç kanama geçiren bir kazazedede aşağıdaki belirtilerden hangisi görülür?",
  "o": [
   "Cildin sıcak ve kızarık olması",
   "Nabzın yavaş ve güçlü atması",
   "Bilincin tamamen açık ve rahat olması",
   "Cildin soluk, soğuk ve nemli olması"
  ],
  "c": 3,
  "a": "İç kanamada kan kaybına bağlı olarak cilt soluk, soğuk ve terli olur, nabız hızlı ve zayıf atar; bu belirtiler şokun habercisidir."
 },
 {
  "d": "ilkyardim",
  "s": "Burun kanaması olan bir kazazedeye nasıl müdahale edilmelidir?",
  "o": [
   "Başı hafifçe öne eğilip burun kanatlarına basınç uygulanır",
   "Başı geriye yatırılıp burun delikleri pamukla tıkanır",
   "Kazazede sırtüstü yatırılıp buz yutturulur",
   "Kanama durana kadar burun sürekli sümkürtülür"
  ],
  "c": 0,
  "a": "Burun kanamasında baş hafifçe öne eğilir ve burun kanatlarına basınç uygulanır; başın geriye yatırılması kanın yutulmasına ve mide bulantısına yol açar."
 },
 {
  "d": "ilkyardim",
  "s": "Kopan bir parmağın sağlık kuruluşuna taşınmasında doğru yöntem hangisidir?",
  "o": [
   "Kopan parçanın taşınmasına gerek yoktur, yara kapatılır",
   "Kopan parça temiz beze sarılıp su geçirmez poşette, buz üzerine konularak taşınır",
   "Kopan parça doğrudan buzun içine gömülerek taşınır",
   "Kopan parça alkolle yıkanıp açıkta taşınır"
  ],
  "c": 1,
  "a": "Kopan uzuv parçası temiz beze sarılıp su geçirmez bir poşete konur, poşet buz üzerine yerleştirilir; parçanın doğrudan buzla teması dokuya zarar verir."
 },
 {
  "d": "ilkyardim",
  "s": "Kolunda kırık şüphesi olan bir kazazedenin kolu nasıl sabitlenir?",
  "o": [
   "Kırık kol kalp seviyesinin altında sarkıtılır",
   "Kırık bölgeye sıcak uygulama yapılıp sarılır",
   "Kırık bölgenin altındaki ve üstündeki eklemleri de içine alacak şekilde bulunduğu gibi sabitlenir",
   "Kırık kemik elle düzeltilip sonra sarılır"
  ],
  "c": 2,
  "a": "Kırık, bulunduğu pozisyonda ve alt-üst eklemleri de kapsayacak şekilde sabitlenir; kemiği düzeltmeye çalışmak damar ve sinir hasarına yol açar."
 },
 {
  "d": "ilkyardim",
  "s": "Omzu çıkan (çıkık oluşan) bir kazazedeye yapılması yanlış olan davranış hangisidir?",
  "o": [
   "Çıkan bölgeyi hareket ettirmeden sabitlemek",
   "Şişliği azaltmak için soğuk uygulamak",
   "Kazazedeyi sağlık kuruluşuna götürmek",
   "Çıkan eklemi yerine oturtmaya çalışmak"
  ],
  "c": 3,
  "a": "Çıkık asla elle yerine oturtulmaya çalışılmaz; yanlış müdahale damar, sinir ve eklem hasarını artırır, sabitleme yapılıp sağlık kuruluşuna götürülür."
 },
 {
  "d": "ilkyardim",
  "s": "Ayak bileği burkulan bir kazazedeye olay yerinde yapılacak doğru ilk müdahale nedir?",
  "o": [
   "Burkulmuş bölgeye soğuk uygulayıp yukarı kaldırarak dinlendirmek",
   "Burkulmuş eklemi zorlayarak hareket ettirmek",
   "Burkulmuş bölgeye sıcak havlu koyup ovmak",
   "Kazazedeyi hemen yürütmeye çalışmak"
  ],
  "c": 0,
  "a": "Burkulmada şişliği azaltmak için soğuk uygulanır, bölge yukarı kaldırılır ve dinlendirilir; sıcak uygulama ve ovma şişliği artırır."
 },
 {
  "d": "ilkyardim",
  "s": "Bacağında kırık şüphesi olan bir kazazedenin taşınmasıyla ilgili doğru davranış hangisidir?",
  "o": [
   "Kırık bacak diğer bacağa sıkıca bağlanıp koşturulur",
   "Kırık bölge atel ile sabitlenmeden kazazede hareket ettirilmez",
   "Kazazede kucaklanarak hemen araca taşınır",
   "Kazazede ayağa kaldırılıp yürütülerek hastaneye götürülür"
  ],
  "c": 1,
  "a": "Kırık şüphesinde bölge uygun şekilde sabitlenmeden kazazede hareket ettirilmez; sabitleme yapılmamış taşıma kırığı açık kırığa çevirebilir."
 },
 {
  "d": "ilkyardim",
  "s": "Elinde 1. derece yanık oluşan bir kazazedede hangi belirti görülür?",
  "o": [
   "Derinin kömürleşip hissizleşmesi",
   "Derinin beyazlaşıp mumya görünümü alması",
   "Deride kızarıklık, ağrı ve hafif şişlik olması",
   "Deride içi su dolu kabarcıklar oluşması"
  ],
  "c": 2,
  "a": "1. derece yanıkta yalnızca derinin üst tabakası etkilenir; kızarıklık, ağrı ve hafif şişlik görülür, su toplaması olmaz."
 },
 {
  "d": "ilkyardim",
  "s": "Kaynar suyla yanan bir kazazedenin koluna yapılacak İLK müdahale nedir?",
  "o": [
   "Yanan bölgeye diş macunu sürmek",
   "Su toplayan kabarcıkları patlatmak",
   "Yanan bölgeyi battaniyeyle sıkıca sarmak",
   "Yanan bölgeyi akan soğuk su altında soğutmak"
  ],
  "c": 3,
  "a": "Yanıkta ilk müdahale, yanan bölgeyi akan soğuk suyla soğutmaktır; bu, yanığın derinleşmesini önler ve ağrıyı azaltır."
 },
 {
  "d": "ilkyardim",
  "s": "Yanık yarasına aşağıdaki uygulamalardan hangisi kesinlikle yapılmamalıdır?",
  "o": [
   "Yoğurt, diş macunu veya yağ gibi maddeler sürmek",
   "Yanan bölgeyi temiz bir bezle kapatmak",
   "Yanan bölgeyi soğuk suyla soğutmak",
   "Kazazedenin takılarını çıkarmak"
  ],
  "c": 0,
  "a": "Yanık yarasına yoğurt, diş macunu, yağ gibi maddeler sürülmez; bunlar enfeksiyon riskini artırır ve sağlık kuruluşundaki değerlendirmeyi zorlaştırır."
 },
 {
  "d": "ilkyardim",
  "s": "Soğukta uzun süre kalmış, parmaklarında donma başlayan bir kazazedeye nasıl müdahale edilir?",
  "o": [
   "Donan bölge sertçe masaj yapılarak canlandırılır",
   "Kazazede ılık bir ortama alınıp donan bölge yavaşça ısıtılır",
   "Donan bölge karla ovuşturularak ısıtılır",
   "Donan bölge ateşe tutulup hızla ısıtılır"
  ],
  "c": 1,
  "a": "Donmada kazazede ılık ortama alınır ve donan bölge yavaşça ısıtılır; karla ovma ve ani ısıtma doku hasarını artırır."
 },
 {
  "d": "ilkyardim",
  "s": "Kapalı garajda çalışan aracın egzoz gazından zehirlenen bir kişiye yapılacak İLK müdahale nedir?",
  "o": [
   "Kişiyi kusturmaya çalışmak",
   "Kişinin üzerine battaniye örtüp uyutmak",
   "Kişiyi temiz havaya çıkarıp 112'yi aramak",
   "Kişiye hemen süt içirmek"
  ],
  "c": 2,
  "a": "Solunum yoluyla zehirlenmede zehirli ortamdan uzaklaştırma esastır; kişi temiz havaya çıkarılır ve hemen 112 aranır."
 },
 {
  "d": "ilkyardim",
  "s": "Yanlışlıkla çamaşır suyu içen bir çocuğa ilk yardım olarak ne yapılmalıdır?",
  "o": [
   "Çocuk parmakla kusturulur",
   "Çocuğa bol su içirilip kusturulur",
   "Çocuğa süt içirilip beklenir",
   "Çocuk kusturulmaz, ürünün ambalajıyla birlikte 112 aranır"
  ],
  "c": 3,
  "a": "Yakıcı-kostik madde içen kişi asla kusturulmaz; kusma maddenin yemek borusunu ikinci kez yakmasına neden olur, ambalajla birlikte sağlık kuruluşuna başvurulur."
 },
 {
  "d": "ilkyardim",
  "s": "Zehirlenme şüphesiyle 112 arandığında sağlık ekibine yardımcı olacak en önemli bilgi nedir?",
  "o": [
   "Zehirlenmeye neden olan maddenin ambalajını saklayıp göstermek",
   "Zehirlenen kişinin boyunu ve kilosunu tahmin etmek",
   "Olayın hangi saatte olduğunu dakikası dakikasına söylemek",
   "Zehirlenen kişinin kan grubunu bildirmek"
  ],
  "c": 0,
  "a": "Zehirlenmeye yol açan maddenin ambalajı, içeriğindeki etken maddeyi gösterdiği için doğru tedavinin seçilmesini sağlar."
 },
 {
  "d": "ilkyardim",
  "s": "Kaza yapmış bir araçta sıkışan, bilinci kapalı yaralıyı tek başınıza çıkarmanız gerekti. Hangi durumda Rentek manevrası uygulanır?",
  "o": [
   "Sıkışan her yaralıda rutin olarak",
   "Araçta yangın veya patlama tehlikesi varsa",
   "Yaralının nefes almadığı her durumda",
   "Yaralı yardım istediğinde"
  ],
  "c": 1,
  "a": "Rentek manevrası, araç içinde sıkışan yaralının yangın-patlama gibi acil bir tehlike nedeniyle hızla çıkarılması gerektiğinde uygulanan tek kurtarıcılı taşıma tekniğidir."
 },
 {
  "d": "ilkyardim",
  "s": "Boyun omurgası kırığından şüphelenilen bir kazazedenin taşınmasında temel ilke nedir?",
  "o": [
   "Yaralı kucakta taşınarak sarsıntı önlenir",
   "Boyun elle esnetilerek rahatlatılır",
   "Baş-boyun-gövde aynı hizada tutularak hareket ettirilmez",
   "Yaralı oturtularak taşınır"
  ],
  "c": 2,
  "a": "Omurga yaralanması şüphesinde baş, boyun ve gövde aynı eksende tutulur ve yaralı kesinlikle hareket ettirilmez; yanlış hareket felce yol açabilir."
 },
 {
  "d": "ilkyardim",
  "s": "Sedye ile yaralı taşınırken dikkat edilmesi gereken doğru uygulama hangisidir?",
  "o": [
   "Yaralı sedyeye doğru fırlatılarak yerleştirilir",
   "Sedye yaralının üzerine kapatılır",
   "Yaralı sedyede oturtularak taşınır",
   "Sedye yaralının yanına getirilip yaralı en az hareketle sedyeye alınır"
  ],
  "c": 3,
  "a": "Taşımada sedye yaralının yanına getirilir ve yaralı en az hareketle sedyeye alınır; yaralıyı sedyeye sürüklemek omurga ve kırık hasarını artırır."
 },
 {
  "d": "ilkyardim",
  "s": "Yoğun kan kaybı sonrası şoka giren bir kazazedeye verilecek pozisyon nedir?",
  "o": [
   "Ayakları yaklaşık 30 cm yukarı kaldırılmış sırtüstü pozisyon",
   "Baş dik, oturur pozisyon",
   "Yüzüstü, baş yana çevrilmiş pozisyon",
   "Dizler karna çekilmiş yan pozisyon"
  ],
  "c": 0,
  "a": "Şok pozisyonunda ayaklar yaklaşık 30 cm yukarı kaldırılır; bu, yaşamsal organlara kan akımını artırır ve şokun ilerlemesini yavaşlatır."
 },
 {
  "d": "ilkyardim",
  "s": "Bayılan bir kişiye yapılacak doğru ilk müdahale hangisidir?",
  "o": [
   "Kişiye kolonya koklatılıp ayağa kaldırılır",
   "Kişi sırtüstü yatırılıp ayakları yukarı kaldırılır, sıkı giysiler gevşetilir",
   "Kişi hemen oturtulup su içirilir",
   "Kişinin yüzüne tokat atılarak uyandırılır"
  ],
  "c": 1,
  "a": "Bayılmada kişi sırtüstü yatırılır, ayakları yükseltilerek beyne kan akımı artırılır ve nefes almasını kolaylaştırmak için sıkı giysiler gevşetilir."
 },
 {
  "d": "ilkyardim",
  "s": "Epilepsi (sara) nöbeti geçiren bir kişiye müdahale ederken yapılmaması gereken nedir?",
  "o": [
   "Nöbetin süresini gözlemlemek",
   "Nöbet sonrası dinlenmesine izin vermek",
   "Ağzını açmaya çalışıp arasına bir cisim sokmak",
   "Çevredeki tehlikeli cisimleri uzaklaştırmak"
  ],
  "c": 2,
  "a": "Nöbet sırasında ağza kesinlikle bir şey sokulmaz ve çene açılmaya çalışılmaz; bu, diş kırıklarına ve solunum yolu tıkanmasına yol açabilir."
 },
 {
  "d": "ilkyardim",
  "s": "Boğazına yemek kaçan ve nefes alamayan yetişkin bir kişiye Heimlich manevrası uygulanırken eller nereye yerleştirilir?",
  "o": [
   "Göğüs kemiğinin üzerine",
   "Boynun iki yanına",
   "Sırtın ortasına",
   "Göbek deliğinin biraz üstüne, karın boşluğuna"
  ],
  "c": 3,
  "a": "Heimlich manevrasında yumruk göbek deliğinin üstüne, karın boşluğuna yerleştirilir; içe ve yukarı doğru ani basınçla yabancı cisim dışarı atılmaya çalışılır."
 },
 {
  "d": "ilkyardim",
  "s": "Yemek yerken boğazına bir şey kaçan, öksürebilen ve konuşabilen bir kişiye nasıl davranılmalıdır?",
  "o": [
   "Öksürmeye teşvik edilir, sırtına vurulmaz",
   "Hemen Heimlich manevrası uygulanır",
   "Kişi baş aşağı çevrilip sarsılır",
   "Kişiye su içirilip lokmanın inmesi sağlanır"
  ],
  "c": 0,
  "a": "Kısmi tıkanmada kişi öksürebiliyorsa öksürmeye teşvik edilir; bu aşamada sırtına vurmak veya Heimlich uygulamak cismi tam tıkanıklığa çevirebilir."
 },
 {
  "d": "ilkyardim",
  "s": "Birincil değerlendirmede (ilk muayenede) kontrol edilenler hangi sırayla yapılır?",
  "o": [
   "Göz bebekleri, cilt rengi, terleme",
   "Bilinç, solunum, dolaşım (nabız)",
   "Kanama, kırık, yanık",
   "Ateş, tansiyon, şeker"
  ],
  "c": 1,
  "a": "Birincil değerlendirmede önce bilinç, sonra solunum, ardından dolaşım kontrol edilir; yaşamı tehdit eden durumlar bu sırayla hızla saptanır."
 },
 {
  "d": "ilkyardim",
  "s": "İkincil değerlendirmede ilk yardımcının yapması gereken nedir?",
  "o": [
   "Yaralıyı soyup buzlu suya yatırmak",
   "Yaralıya ağrı kesici vermek",
   "Yaralıyı baştan ayağa sistemli şekilde muayene etmek",
   "Hemen kalp masajına başlamak"
  ],
  "c": 2,
  "a": "İkincil değerlendirmede yaralı baştan ayağa sistemli olarak gözlenir; birincil değerlendirmede atlanabilecek diğer yaralanmalar bu aşamada bulunur."
 },
 {
  "d": "ilkyardim",
  "s": "Bilinci kapalı yetişkin bir kazazedede nabız en güvenilir şekilde nereden kontrol edilir?",
  "o": [
   "Bilekteki atardamardan",
   "Şakaktaki damardan",
   "Dirsek içindeki damardan",
   "Boyundaki şah damarından"
  ],
  "c": 3,
  "a": "Yetişkinde nabız kontrolü boyundaki şah damarından (karotis) yapılır; burası kalbe en yakın ve en kolay hissedilen nabız noktasıdır."
 },
 {
  "d": "ilkyardim",
  "s": "Sudan çıkarılan ve nefes almayan bir kazazedeye yapılacak doğru müdahale nedir?",
  "o": [
   "Hemen temel yaşam desteğine (kalp masajı ve suni solunum) başlanır",
   "Yutulan suyu çıkarmak için karna basınç uygulanır",
   "Kazazede güneşte kurutulup beklenir",
   "Kazazedeye su içirilerek kendine gelmesi sağlanır"
  ],
  "c": 0,
  "a": "Boğulmada zaman su çıkarmakla kaybedilmez; solunumu olmayan kazazedeye derhal temel yaşam desteğine başlanır ve 112 aranır."
 },
 {
  "d": "ilkyardim",
  "s": "Turnike uygulanan bir yaralıda turnike ile ilgili doğru davranış hangisidir?",
  "o": [
   "Turnike kanama durur durmaz çözülüp atılır",
   "Turnike üzerine uygulama saati yazılır ve gevşetilmeden sağlık kuruluşuna ulaştırılır",
   "Turnike 15 dakikada bir gevşetilip tekrar sıkılır",
   "Turnike ince bir sicimle bağlanıp üzeri kapatılır"
  ],
  "c": 1,
  "a": "Turnike uygulandıktan sonra saati not edilir ve sağlık görevlisine teslim edilene kadar gevşetilmez; erken gevşetme pıhtının atılmasına ve kanamanın yeniden başlamasına yol açar."
 },
 {
  "d": "ilkyardim",
  "s": "Göze kimyasal madde (kireç, deterjan) kaçan bir kazazedeye ilk müdahale nasıl yapılır?",
  "o": [
   "Göze pamukla basınç uygulanır",
   "Göz kapatılıp beklenir",
   "Göz, iç köşeden dış köşeye doğru bol suyla yıkanır",
   "Göz ovuşturularak maddenin çıkması sağlanır"
  ],
  "c": 2,
  "a": "Kimyasal madde kaçan göz, iç köşeden dış köşeye doğru bol suyla yıkanır; ovuşturmak maddeyi göz dokusuna daha çok yayar."
 },
 {
  "d": "ilkyardim",
  "s": "Elektrik akımına kapılmış bir kazazedeye müdahale ederken İLK yapılması gereken nedir?",
  "o": [
   "Kazazedeyi hemen kucaklayıp akımdan uzaklaştırmak",
   "Kazazedeye su içirip sakinleştirmek",
   "Kazazedenin nabzını ölçmek",
   "Akım kaynağı kapatılmadan kazazedeye çıplak elle dokunmamak"
  ],
  "c": 3,
  "a": "Elektrik çarpmalarında önce akım kesilir veya yalıtkan bir cisimle temas sonlandırılır; akım devam ederken dokunan kişi de çarpılır."
 },
 {
  "d": "ilkyardim",
  "s": "Köpek ısırığına uğrayan bir kazazedenin yarasına olay yerinde nasıl müdahale edilir?",
  "o": [
   "Yara bol sabunlu suyla yıkanıp sağlık kuruluşuna başvurulur",
   "Yara dağlanarak mikrop öldürülür",
   "Isırılan bölge sıkıca sarılıp beklenir",
   "Yaraya tükürük sürülerek iyileşme hızlandırılır"
  ],
  "c": 0,
  "a": "Hayvan ısırığında yara bol sabunlu suyla yıkanır ve kuduz riski nedeniyle en kısa sürede sağlık kuruluşuna başvurulur."
 },
 {
  "d": "ilkyardim",
  "s": "Arı sokan bir kişide iğne deride kalmışsa doğru müdahale nedir?",
  "o": [
   "Sokulan yer iğneyle delinip zehir akıtılır",
   "İğne tırnak veya kartla kazıyarak çıkarılır",
   "İğne cımbızla sıkılarak çekilir",
   "İğne yerinde bırakılıp üzerine basılır"
  ],
  "c": 1,
  "a": "Arı iğnesi, zehir kesesini sıkıştırmamak için cımbızla sıkmak yerine tırnak ya da kartla kazıyarak çıkarılır."
 },
 {
  "d": "ilkyardim",
  "s": "Solunumu olmayan bir kazazedeye suni solunum uygulanırken dikkat edilmesi gereken nedir?",
  "o": [
   "Her üflemede ciğerler sonuna kadar doldurulur",
   "Üfleme sırasında kazazedenin başı öne eğik tutulur",
   "Baş geriye yatırılıp burun kapatılarak göğsün yükseldiği görülene kadar üflenir",
   "Kazazedenin burnu açık bırakılıp ağızdan hızlıca üflenir"
  ],
  "c": 2,
  "a": "Suni solunumda baş geriye yatırılır, burun kapatılır ve verilen her nefeste göğsün yükseldiği gözlenir; göğüs yükselmesi havanın akciğerlere ulaştığını gösterir."
 },
 {
  "d": "ilkyardim",
  "s": "Açık kırıkta (kemiğin deriyi deldiği durumda) kanama da varsa öncelik sırası nasıl olmalıdır?",
  "o": [
   "Önce kemik yerine itilir, sonra kanama durdurulur",
   "Önce yara suyla yıkanır, sonra sarılır",
   "Önce kazazede yürütülür, sonra hastaneye gidilir",
   "Önce kanama basınçla kontrol altına alınır, kırık sabitlenir"
  ],
  "c": 3,
  "a": "Açık kırıkta dışarı çıkan kemik asla içeri itilmez; önce kanama basınçla durdurulur, ardından bölge sabitlenerek sağlık kuruluşuna götürülür."
 },
 {
  "d": "ilkyardim",
  "s": "Kaza yerinde yaralıya müdahale etmeden önce ilk yardımcının yapması gereken nedir?",
  "o": [
   "Olay yerinin güvenliğini sağlayıp kendisini korumak",
   "Yaralının cebindeki telefonu alıp yakınını aramak",
   "Aracın kontağı açıkken yaralıyı çıkarmak",
   "Trafiği durdurup yolu tamamen kapatmak"
  ],
  "c": 0,
  "a": "İlk yardımda ilk kural kurtarıcının kendi güvenliğidir; güvenli olmayan olay yerinde ikinci bir kazazede daha oluşabilir."
 },
 {
  "d": "ilkyardim",
  "s": "İlk yardımın temel amacı aşağıdakilerden hangisidir?",
  "o": [
   "Yaralının kimliğini tespit edip kayıt tutmak",
   "Yaşamsal fonksiyonların sürdürülmesini sağlayıp sağlık ekibi gelene kadar durumu kötüleşmekten korumak",
   "Yaralıyı tamamen tedavi edip iyileştirmek",
   "Yaralının hastanedeki tedavisini üstlenmek"
  ],
  "c": 1,
  "a": "İlk yardım, sağlık ekibi gelene kadar yaşamsal fonksiyonları sürdürmeyi ve yaralının durumunun kötüleşmesini önlemeyi amaçlar; tedavi sağlık profesyonellerinin işidir."
 },
 {
  "a": "Marş motoru, kontak çevrildiğinde krank milini döndürerek motora ilk hareketi verir; motor çalıştıktan sonra devreden çıkar.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Motoru ilk hareketi vererek çalıştırmak",
   "Aküyü şarj etmek",
   "Yakıtı silindirlere püskürtmek",
   "Soğutma suyunu devirdaim ettirmek"
  ],
  "s": "Marş motorunun görevi nedir?"
 },
 {
  "a": "Buji, sıkıştırma zamanının sonunda karışımı ateşleyen elektrik kıvılcımını oluşturur; bu kıvılcım yanmayı başlatır.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Yakıtı depodan motora taşımak",
   "Sıkıştırılmış hava-yakıt karışımını kıvılcımla ateşlemek",
   "Egzoz gazlarını dışarı atmak",
   "Motor yağını filtrelemek"
  ],
  "s": "Benzinli bir motorda bujinin görevi nedir?"
 },
 {
  "a": "Piston, silindir içinde yukarı-aşağı hareket eder ve yanma basıncını biyel kolu üzerinden krank miline aktarır.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Supapları açıp kapatmak",
   "Elektrik üretmek",
   "Yanma sonucu oluşan basıncı biyel kolu aracılığıyla krank miline iletmek",
   "Soğutma suyunu radyatöre göndermek"
  ],
  "s": "Pistonun motor içindeki görevi nedir?"
 },
 {
  "a": "Emme supabı temiz karışımın girişine, egzoz supabı yanmış gazların çıkışına izin verir; ikisi de eksantrik milinin zamanlamasıyla çalışır.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Motor yağını soğutmak",
   "Aküyü şarj etmek",
   "Fren hidroliğini basınçlandırmak",
   "Hava-yakıt karışımının silindire girişini ve egzoz gazlarının çıkışını zamanında açılıp kapanarak düzenlemek"
  ],
  "s": "Supapların (emme ve egzoz) görevi nedir?"
 },
 {
  "a": "Alternatör, motordan aldığı hareketle elektrik üretir; hem aracın elektrik ihtiyacını karşılar hem de aküyü şarj eder.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Motor çalışırken elektrik üretip aküyü şarj etmek",
   "Marş anında motora ilk hareketi vermek",
   "Yakıtı yüksek basınçla püskürtmek",
   "Direksiyonu hidrolikle desteklemek"
  ],
  "s": "Alternatörün görevi nedir?"
 },
 {
  "a": "Krank mili, biyel kollarından gelen itme hareketini dönme hareketine çevirerek gücü şanzımana iletir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Soğutma suyunu devirdaim etmek",
   "Pistonların doğrusal hareketini dairesel harekete çevirmek",
   "Supap zamanlamasını ayarlamak",
   "Egzoz gazlarını temizlemek"
  ],
  "s": "Krank milinin görevi nedir?"
 },
 {
  "a": "Eksantrik mili üzerindeki kamlar, supapları doğru zamanda açıp kapatarak emme-sıkıştırma-ateşleme-egzoz sırasını düzenler.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Aküyü şarj etmek",
   "Fren balatalarını sıkıştırmak",
   "Supapların açılıp kapanma zamanlamasını sağlamak",
   "Yakıt pompasını çalıştırmak"
  ],
  "s": "Eksantrik (kam) milinin görevi nedir?"
 },
 {
  "a": "Dizel motorda ateşleme sıkıştırma ısısıyla olur; kızdırma bujisi soğukta yanma odasını önceden ısıtarak çalıştırmayı kolaylaştırır.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Enjektör",
   "Distribütör",
   "Karbüratör",
   "Kızdırma (ön ısıtma) bujisi"
  ],
  "s": "Dizel motorlarda, soğuk havada ilk çalıştırmayı kolaylaştıran ve benzinli motorlardaki bujinin yerini tutan parça hangisidir?"
 },
 {
  "a": "Termostat, motor ideal çalışma sıcaklığına ulaşana kadar suyu küçük devrede tutar; ısınınca açılır ve su radyatörde soğutulur.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Motor soğukken kapalı kalıp motorun çabuk ısınmasını sağlamak, ısınınca açılarak suyun radyatöre geçmesine izin vermek",
   "Radyatör suyunu sürekli soğutmak",
   "Fanı devamlı çalıştırmak",
   "Antifrizi suya karıştırmak"
  ],
  "s": "Termostatın soğutma sistemindeki görevi nedir?"
 },
 {
  "a": "Aşırı ısınan motorla sürüşe devam etmek ciddi hasara yol açar; araç durdurulup motor soğuyana kadar beklenmelidir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Hızlanarak rüzgârla motoru soğutmaya çalışmak",
   "Aracı güvenli bir yerde durdurup motoru stop etmek, soğuyana kadar radyatör kapağını açmamak",
   "Hemen soğuk su ekleyip yola devam etmek",
   "Kaloriferi kapatıp yüksek devirde sürmeye devam etmek"
  ],
  "s": "Sürüş sırasında hararet göstergesi kırmızı bölgeye yükseldi. Ne yapmalısınız?"
 },
 {
  "a": "Sıcak soğutma sistemi basınç altındadır; kapak erken açılırsa kaynar su ve buhar aniden dışarı fışkırır.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Antifrizin özelliği bozulur",
   "Termostat zarar görür",
   "Sistem basınçlı olduğundan sıcak su ve buhar fışkırarak ciddi yanıklara yol açabilir",
   "Fan aniden çalışmaya başlar"
  ],
  "s": "Motor sıcakken radyatör kapağı neden açılmamalıdır?"
 },
 {
  "a": "Antifriz soğutma suyuna eklenir; motor yağının akışkanlığıyla ilgisi yoktur.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Suyun donma noktasını düşürmek",
   "Suyun kaynama noktasını yükseltmek",
   "Korozyonu ve kireçlenmeyi önlemek",
   "Motor yağının viskozitesini artırmak"
  ],
  "s": "Antifrizin görevleri arasında hangisi YOKTUR?"
 },
 {
  "a": "V kayışı su pompasını ve alternatörü çalıştırır; kopması hem soğutmayı hem de şarjı durdurur.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Su pompası ve alternatör çalışmaz; motor hararet yapar ve akü şarj olmaz",
   "Frenler tamamen tutmaz",
   "Direksiyon kilitlenir",
   "Yakıt pompası durur"
  ],
  "s": "V kayışı koptuğunda aşağıdakilerden hangisi meydana gelir?"
 },
 {
  "a": "Doğru ölçüm için araç düz zeminde olmalı ve yağın kartere süzülmesi için motor stop edildikten sonra birkaç dakika beklenmelidir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Radyatör kapağından bakılarak",
   "Düz zeminde, motor bir süre dinlendirildikten sonra yağ çubuğu çekilip silinerek tekrar daldırılıp iki çizgi arasına bakılarak",
   "Yağ filtresi sökülerek",
   "Egzoz dumanının rengine bakılarak"
  ],
  "s": "Motor yağı seviyesi nasıl kontrol edilir?"
 },
 {
  "a": "Yanan yağ lambası yağ basıncının düştüğünü gösterir; sürüşe devam edilirse motor yatakları zarar görür.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Yağ değişim zamanı gelmiştir, en yakın bakımda değiştirilir",
   "Yağ filtresi tıkanmıştır, yüksek devirde sürülür",
   "Yağ basıncı düşmüştür; araç hemen güvenli bir yerde durdurulup motor stop edilmeli, yağ seviyesi kontrol edilmelidir",
   "Yağ fazla konulmuştur, bir miktar boşaltılır"
  ],
  "s": "Sürüş sırasında yağ uyarı lambası yandı. Bu ne anlama gelir ve ne yapılmalıdır?"
 },
 {
  "a": "Motor yağı yağlama, soğutma ve temizlik sağlar; yanma işlemi silindir içindeki karışımla ilgilidir.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Parçalar arasındaki sürtünmeyi azaltmak",
   "Motorun soğumasına yardımcı olmak",
   "Parçaları temiz tutmak",
   "Yakıtın yanmasını hızlandırmak"
  ],
  "s": "Motor yağının görevleri arasında hangisi YOKTUR?"
 },
 {
  "a": "Seviye alt çizginin altındaysa yağ eksiktir; uygun yağdan eklenerek iki çizgi arasına getirilmelidir.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Yağ seviyesinin düşük olduğunu ve tamamlanması gerektiğini",
   "Yağın kirli olduğunu",
   "Yağ pompasının arızalı olduğunu",
   "Yağ lambasının bozuk olduğunu"
  ],
  "s": "Yağ çubuğundaki seviyenin alt çizginin altında olması neyi gösterir?"
 },
 {
  "a": "ABS, tekerlekler kilitlenmeden fren basıncını ayarlar; böylece sürücü fren yaparken direksiyonla yönlendirmeye devam edebilir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Fren mesafesini her zeminde kısaltmak",
   "Ani ve sert frenlemede tekerleklerin kilitlenmesini önleyerek direksiyon hâkimiyetini korumak",
   "El freninin yerini almak",
   "Fren hidroliğini soğutmak"
  ],
  "s": "ABS'nin (kilitlenmeyi önleyici fren sistemi) temel görevi nedir?"
 },
 {
  "a": "Hidrolik kaçak ya da sistemdeki hava, pedalın basınç oluşturmadan dibe inmesine yol açar; frenler güvenli çalışmaz.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Balataların yeni olmasına",
   "Lastik basıncının düşük olmasına",
   "Fren hidroliğinde kaçak veya sistemde hava olmasına",
   "ABS'nin devrede olmasına"
  ],
  "s": "Fren pedalının sünger gibi yumuşak olması ve dibe kadar inmesi neye işaret edebilir?"
 },
 {
  "a": "El freni hidrolikten bağımsız mekanik bir sistemdir ve park halindeki aracın kaymasını önler.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Acil durumlarda ana frenin yerine geçmek",
   "Yokuş aşağı inerken hızı ayarlamak",
   "ABS'yi devre dışı bırakmak",
   "Park halinde aracın mekanik olarak sabit kalmasını sağlamak"
  ],
  "s": "El freninin görevi nedir?"
 },
 {
  "a": "Islak zeminde lastik-yol tutunması azalır; bu yüzden fren mesafesi uzar ve takip mesafesi artırılmalıdır.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Islak ve kaygan zemin",
   "Kuru asfalt",
   "Yeni fren balataları",
   "Doğru lastik basıncı"
  ],
  "s": "Aşağıdakilerden hangisi fren mesafesini UZATIR?"
 },
 {
  "a": "Servofren, motorun ürettiği vakumla pedala uygulanan kuvveti artırır; motor durunca bu destek kesilir ve pedal sertleşir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Fren hidroliğinin bitmesi",
   "Vakum destekli fren sisteminin (servofren) motor çalışmadan destek sağlayamaması",
   "Balataların aşınması",
   "El freninin çekili olması"
  ],
  "s": "Motor çalışmazken fren pedalının sertleşmesinin nedeni nedir?"
 },
 {
  "a": "Fren hidroliği kapalı devrede eksilmemelidir; seviye düşüklüğü kaçak belirtisidir ve fren güvenliğini doğrudan etkiler.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Hidrolik biterse farlar yanmaz",
   "Hidrolik seviyesi motor yağını etkiler",
   "Seviye düşükse sistemde kaçak olabilir ve frenler tutmayabilir",
   "Hidrolik antifriz görevi görür"
  ],
  "s": "Fren hidroliği seviyesi neden düzenli kontrol edilmelidir?"
 },
 {
  "a": "Düşük viteste motor freni, fren balatalarının aşırı ısınıp tutmaz hale gelmesini (fren körleşmesi) önler.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Sürekli frene basılarak inilmelidir",
   "Vites boşa alınıp sadece frenle inilmelidir",
   "El freni hafifçe çekili tutulmalıdır",
   "Düşük viteste motor freninden yararlanılmalıdır"
  ],
  "s": "Yokuş aşağı uzun inişlerde frenlerin aşırı ısınmasını önlemek için ne yapılmalıdır?"
 },
 {
  "a": "Havası inik lastik daha fazla yuvarlanma direnci oluşturur; bu hem yakıtı artırır hem de lastiği dengesiz aşındırır.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Yakıt tüketiminin artması, lastik kenarlarının aşınması ve yol tutuşun bozulması",
   "Fren mesafesinin kısalması",
   "Motor gücünün artması",
   "Direksiyonun hafiflemesi"
  ],
  "s": "Lastik hava basıncının düşük olması aşağıdakilerden hangisine yol açar?"
 },
 {
  "a": "Diş derinliği 1,6 mm'nin altına inen lastik yasal sınırı aşmıştır; özellikle ıslak zeminde su tahliyesi yetersiz kalır.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "0,8 mm",
   "1,6 mm",
   "3,2 mm",
   "4,0 mm"
  ],
  "s": "Binek araç lastiklerinde yasal minimum diş derinliği kaç mm'dir?"
 },
 {
  "a": "Balans bozukluğu, tekerlekteki ağırlık dengesizliği nedeniyle özellikle belli hızlarda direksiyonda titremeye yol açar.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Far ayarı",
   "Rot ayarı",
   "Balans (tekerlek dengesi) ayarı",
   "Debriyaj ayarı"
  ],
  "s": "Sürüş sırasında direksiyonda titreme hissediliyorsa ilk akla gelen ayar hangisidir?"
 },
 {
  "a": "Stepne gerektiğinde hemen kullanıma hazır olmalıdır; havası inik bir stepne acil durumda işe yaramaz.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Hiç kullanılmadığı için basıncı kontrol edilmez",
   "Sadece yaz aylarında kullanılır",
   "Patlayan lastiğin yerine takılınca uzun süre yüksek hız yapılır",
   "Hava basıncı da diğer lastikler gibi düzenli olarak kontrol edilmelidir"
  ],
  "s": "Stepne (yedek lastik) ile ilgili doğru davranış hangisidir?"
 },
 {
  "a": "Basınç farkı ya da bozuk rot ayarı, tekerleklerin farklı direnç göstermesine ve aracın bir yana çekmesine neden olur.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Lastiklerin hava basınçlarının eşit olmaması veya rot ayarının bozuk olması",
   "Akünün zayıf olması",
   "Bujilerin eskimesi",
   "Radyatör suyunun eksik olması"
  ],
  "s": "Aracın sürekli bir tarafa çekmesinin olası nedenlerinden biri hangisidir?"
 },
 {
  "a": "Kış lastiğinin hamuru soğukta sertleşmez; bu sayede düşük sıcaklıklarda tutuş ve fren performansı yaz lastiğinden üstündür.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Kış lastiği sadece karda işe yarar, soğuk asfaltta fark yaratmaz",
   "Soğuk havada (+7°C altında) yaz lastiğine göre daha iyi yol tutuş sağlar",
   "Kış lastiği takılınca zincir taşımaya gerek kalmaz",
   "Kış lastikleri yazın da sorunsuz kullanılır, aşınmaz"
  ],
  "s": "Kış lastiği ile ilgili doğru bilgi hangisidir?"
 },
 {
  "a": "Akü, ilk çalıştırma için gerekli elektriği depolar; motor çalışınca alternatör hem tüketimi karşılar hem aküyü doldurur.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Motor çalışırken farları tek başına yakmak",
   "Soğutma fanını çalıştırmak",
   "Marş anında ve motor çalışmazken elektrik ihtiyacını karşılamak; motor çalışırken alternatör tarafından şarj edilmek",
   "Yakıt pompasına basınç sağlamak"
  ],
  "s": "Akünün temel görevi nedir?"
 },
 {
  "a": "Oksitlenme temas direncini artırıp marşı zorlaştırır; temizlik ve sıkı bağlantı elektrik iletimini düzeltir.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Kutup başları yağla kaplanıp öylece bırakılır",
   "Akü hemen değiştirilir",
   "Oksitli kutup başıyla sürüşe devam edilir",
   "Kutup başları temizlenip sıkıca bağlanır, koruyucu olarak ince vazelin sürülür"
  ],
  "s": "Akü kutup başlarında oksitlenme (beyaz tozlanma) görülürse ne yapılmalıdır?"
 },
 {
  "a": "Alternatör arızalanırsa araç aküdeki elektriği tüketir; klima ve far gibi yükler kapatılarak servise ulaşılmalıdır.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Şarj sisteminde arıza olduğunu, alternatörün aküyü şarj edemediğini gösterir; en yakın servise gidilmeli, gereksiz elektrikli donanımlar kapatılmalıdır",
   "Akünün tamamen dolduğunu",
   "Marş motorunun çalıştığını",
   "Farların açık unutulduğunu"
  ],
  "s": "Sürüş sırasında akü (şarj) uyarı lambası yandı. Bu ne anlama gelir?"
 },
 {
  "a": "Sigorta, devreden geçen akım güvenli sınırı aşınca atarak yangına yol açabilecek kablo ısınmasını engeller.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Aküyü şarj etmek",
   "Elektrik devresini aşırı akıma karşı koruyarak kablo ve donanımların zarar görmesini önlemek",
   "Farların parlaklığını artırmak",
   "Marş motorunun hızını ayarlamak"
  ],
  "s": "Sigortaların elektrik sistemindeki görevi nedir?"
 },
 {
  "a": "Yüksek amperli sigorta veya tel sarma, devreyi korumasız bırakır ve kablo yanmasına yol açabilir.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Daha yüksek amperli sigorta takılır",
   "Tel sarılarak tamir edilir",
   "Aynı amper değerinde yeni bir sigorta ile değiştirilir",
   "Sigorta iptal edilip kablo doğrudan bağlanır"
  ],
  "s": "Atan bir sigorta nasıl değiştirilmelidir?"
 },
 {
  "a": "Bu lamba önce el freninin inik olup olmadığını düşündürür; el freni inikse hidrolik seviyesi ve kaçak kontrol edilmelidir.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Sadece balataların bitmesi",
   "ABS'nin normal çalışması",
   "Hız sınırının aşılması",
   "El freninin çekili olması veya fren hidroliği seviyesinin düşük olması"
  ],
  "s": "Fren uyarı lambasının (ünlem işaretli) yanmasının olası nedenleri nelerdir?"
 },
 {
  "a": "Hararet lambası motorun aşırı ısındığını gösterir; sürüşe devam etmek conta yanması gibi ağır hasarlara yol açar.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Araç güvenli bir yerde durdurulup motor stop edilmeli, soğuması beklenmelidir",
   "Klimayı açıp sürüşe devam edilmelidir",
   "Hız artırılarak rüzgârla soğutma sağlanmalıdır",
   "Lambanın sönmesi için kontak kapatılıp hemen tekrar açılmalıdır"
  ],
  "s": "Hararet uyarı lambası yandığında ne yapılmalıdır?"
 },
 {
  "a": "Bu lamba motor kontrol sisteminde bir sorun tespit edildiğini gösterir; erken teşhis daha büyük arızaları önler.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Lambayı görmezden gelip sürüşe devam etmek",
   "En kısa sürede servise giderek arızanın tespit edilmesini sağlamak",
   "Akü kutup başını söküp takmak",
   "Yüksek devirde kullanarak lambayı söndürmeye çalışmak"
  ],
  "s": "Motor arıza lambası (check engine) yandığında doğru davranış nedir?"
 },
 {
  "a": "İki kritik uyarının birlikte yanması motorun ciddi tehlike altında olduğunu gösterir; sürüşe devam edilmemelidir.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Farların arızalı olduğunu",
   "Lastik basıncının düşük olduğunu",
   "Motorun ciddi şekilde ısınmış ve yağlama sorunu yaşıyor olabileceğini; aracın hemen durdurulması gerektiğini",
   "Yakıtın bitmek üzere olduğunu"
  ],
  "s": "Yağ uyarı lambası ile hararet uyarı lambasının aynı anda yanması neyi düşündürür?"
 },
 {
  "a": "Marşın hiç tepki vermemesi genellikle akünün bitmesi veya kutup başlarının gevşek/oksitli olmasındandır.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Buji kabloları",
   "Yakıt filtresi",
   "Hava filtresi",
   "Akü şarj durumu ve kutup başı bağlantıları"
  ],
  "s": "Kontak çevrildiğinde marş motoru hiç dönmüyorsa (tık sesi bile gelmiyorsa) ilk kontrol edilmesi gereken nedir?"
 },
 {
  "a": "Marş dönüyorsa akü görevini yapıyordur; sorun yakıt ulaşmaması veya kıvılcım oluşmaması gibi çalışma koşullarındadır.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Yakıtın bitmiş olması veya ateşleme sisteminde arıza olması",
   "Akünün tamamen bitmesi",
   "El freninin çekili olması",
   "Farların açık olması"
  ],
  "s": "Marş motoru normal şekilde dönüyor ancak motor çalışmıyorsa olası neden hangisidir?"
 },
 {
  "a": "Yanma odasına sızan motor yağı mavi duman oluşturur; bu durum yağ eksiltme ve aşınma belirtisidir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Soğutma suyunun eksik olduğuna",
   "Motorun yağ yaktığına (segman veya supap lastiği aşınması gibi)",
   "Yakıtın kaliteli olduğuna",
   "Katalitik konvertörün sağlıklı çalıştığına"
  ],
  "s": "Egzozdan çıkan mavi renkli duman neye işaret eder?"
 },
 {
  "a": "Yetersiz hava alan motor yakıtı tam yakamaz; yanmamış yakıt siyah duman olarak egzozdan çıkar.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Motorun soğuk olması",
   "Yağ seviyesinin düşük olması",
   "Hava filtresinin tıkanması veya yakıt-hava karışımının zengin (yakıtça fazla) olması",
   "Antifriz kaçağı"
  ],
  "s": "Egzozdan çıkan siyah dumanın olası nedeni hangisidir?"
 },
 {
  "a": "Yüksek devir ve ani hızlanmalar yakıtı artırır; akıcı sürüş ve zamanında vites büyütme tüketimi düşürür.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Her vites değişiminde motoru en yüksek devire çıkarmak",
   "Kavşaklara hızlı yaklaşıp sert fren yapmak",
   "Gereksiz yere uzun süre rölantide beklemek",
   "Uygun viteste düşük-orta devirde sakin ve akıcı sürmek"
  ],
  "s": "Yakıt tasarrufu için doğru sürüş davranışı hangisidir?"
 },
 {
  "a": "Havası inik lastik yuvarlanma direncini artırır; motor aynı hız için daha fazla güç harcar ve yakıt tüketimi yükselir.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Lastik hava basıncının düşük olması",
   "Uygun viteste sürmek",
   "Ani hızlanmalardan kaçınmak",
   "Gereksiz yük taşımamak"
  ],
  "s": "Aşağıdakilerden hangisi yakıt tüketimini artırır?"
 },
 {
  "a": "Rölantide çalışan motor yol almadan yakıt harcar; bir dakikadan uzun beklemelerde motoru stop etmek daha ekonomiktir.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Yakıt tasarrufu sağlar",
   "Gereksiz yakıt tüketimine ve egzoz emisyonuna yol açar",
   "Motorun ömrünü uzatır",
   "Aküyü daha hızlı şarj eder"
  ],
  "s": "Uzun süreli beklemelerde motoru rölantide çalıştırmanın etkisi nedir?"
 },
 {
  "a": "Periyodik bakım, aracın güvenli ve sağlıklı çalışmasını etkileyen sistemleri kapsar; döşeme rengi bakımla ilgili değildir.",
  "c": 2,
  "d": "aracteknik",
  "o": [
   "Motor yağı ve filtreler",
   "Fren hidroliği ve balatalar",
   "Koltuk döşemelerinin rengi",
   "Soğutma suyu ve kayışlar"
  ],
  "s": "Periyodik bakımda kontrol edilenler arasında hangisi YOKTUR?"
 },
 {
  "a": "Yağ zamanla özelliğini yitirir; üreticinin belirttiği periyot (km veya süre, hangisi önce dolarsa) aşılmamalıdır.",
  "c": 3,
  "d": "aracteknik",
  "o": [
   "Yağ uyarı lambası yandığında",
   "Motor sesi değiştiğinde",
   "Sadece araç muayenesi öncesinde",
   "Aracın üreticisinin önerdiği kilometre veya süre dolduğunda"
  ],
  "s": "Motor yağı ve yağ filtresi ne zaman değiştirilmelidir?"
 },
 {
  "a": "Dizel motorda ateşleme sıkıştırma ısısıyla olur; kızdırma bujileri arızalıysa soğukta yanma odası yeterince ısınamaz.",
  "c": 0,
  "d": "aracteknik",
  "o": [
   "Kızdırma (ön ısıtma) bujileri",
   "Radyatör fanı",
   "El freni teli",
   "Silecek motoru"
  ],
  "s": "Soğuk havada dizel aracın zor çalışması durumunda ilk akla gelen parça hangisidir?"
 },
 {
  "a": "Kontak açıldığında lambaların yanıp sönmesi sistem kontrolüdür; motor çalıştıktan sonra yanık kalan lamba gerçek bir uyarıdır.",
  "c": 1,
  "d": "aracteknik",
  "o": [
   "Bir arıza olduğunu gösterir",
   "Sistemlerin kendini test ettiğini gösterir; motor çalıştıktan sonra sönmeleri normaldir",
   "Akünün bittiğini gösterir",
   "Lambaların değiştirilmesi gerektiğini gösterir"
  ],
  "s": "Kontak açıldığında gösterge panelindeki uyarı lambalarının kısa süre yanıp sönmesi ne anlama gelir?"
 },
 {
  "a": "Sakin kalmak hem sizin hem çevrenizdekilerin güvenliğini korur; korna ve selektör durumu çözmez, gerilimi artırır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Sürekli korna çalarak öndeki sürücüyü uyarmak",
   "Selektör yapıp acele etmesini sağlamak",
   "Sakin kalıp güvenli takip mesafesini koruyarak beklemek",
   "Yan şeride geçip öndeki aracı sıkıştırmak"
  ],
  "s": "Yoğun trafikte dakikalarca yerinizde bekliyorsunuz ve önünüzdeki araç bir türlü hareket etmiyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Gece yerleşim bölgesinde korna çalmak çevreyi rahatsız eder; telefonla haberleşmek hem sessiz hem etkilidir.",
  "c": 0,
  "d": "adab",
  "o": [
   "Korna çalmadan telefonla haber vermek",
   "Uzun uzun korna çalarak dikkat çekmek",
   "Selektör yaparak camdan işaret etmek",
   "Motoru yüksek devirde çalıştırıp ses çıkarmak"
  ],
  "s": "Gece saat 02.00'de bir apartmanın önünde arkadaşınızı bekliyorsunuz ve inmesini istiyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Acemi sürücülere baskı yapmak hata riskini artırır; sabır ve mesafe hem güvenli hem insancıldır.",
  "c": 3,
  "d": "adab",
  "o": [
   "Tamponuna yapışıp baskı kurmak",
   "Korna çalarak hızlanmasını sağlamak",
   "Yanından geçerken sözlü tepki göstermek",
   "Sabırlı davranıp güvenli takip mesafesini korumak"
  ],
  "s": "Önünüzdeki araçta acemi sürücü işareti var ve trafik akışından yavaş ilerliyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Makas atanlara katılmak zincirleme kazaya davetiye çıkarır; şeridinizde sakin kalmak en güvenli seçenektir.",
  "c": 1,
  "d": "adab",
  "o": [
   "Onlara katılıp makas atarak ilerlemek",
   "Sakin kalıp kendi şeridinizde beklemek",
   "Korna çalıp yol istemek",
   "Emniyet şeridine geçip ilerlemek"
  ],
  "s": "Köprü girişinde trafik durma noktasında ve yan şeritteki bazı araçlar makas atarak ilerliyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Kaldırımda bekleyen yaya geçmek istiyor olabilir; yavaşlayıp durmak hem kural hem nezaket gereğidir.",
  "c": 2,
  "d": "adab",
  "o": [
   "Geçidi boş görüp hızla geçmek",
   "Korna çalıp yayayı uyarmak",
   "Hızınızı azaltıp yayaya yol vermek için durmak",
   "Şerit değiştirip geçidin üzerinden atlamak"
  ],
  "s": "Yaya geçidine yaklaşırken bir yayanın kaldırımda beklediğini görüyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Yağmurlu havada su sıçratmak yayayı zor durumda bırakır; yavaşlamak küçük bir nezaket, büyük bir fark yaratır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Hızınızı azaltıp su sıçratmamaya özen göstermek",
   "Hızlı geçip bir an önce kurtulmak",
   "Korna çalıp kenara çekilmesini istemek",
   "Selektör yaparak uyarmak"
  ],
  "s": "Yağmurlu havada kaldırımda yürüyen yaşlı birinin yanından geçmek üzeresiniz, yolda su birikintileri var. Doğru davranışınız nedir?"
 },
 {
  "a": "Bisikletliyi sıkıştırmak ölümcül olabilir; karşı yol boşalana kadar beklemek sabrın ve saygının gereğidir.",
  "c": 3,
  "d": "adab",
  "o": [
   "Bisikletliyi sıkıştırıp yanından geçmek",
   "Korna çalıp kenara çekilmesini sağlamak",
   "Karşı şeride taşarak tehlikeli sollama yapmak",
   "Karşı yol boşalana kadar güvenli mesafede beklemek"
  ],
  "s": "Dar bir yolda önünüzde bisikletli ilerliyor, karşı şeritten de araç geliyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Motosikletliler trafikte en savunmasız gruplardandır; şeridi paylaşmak can güvenliğine katkı sağlar.",
  "c": 1,
  "d": "adab",
  "o": [
   "Onu görmezden gelip şeridi kapatmak",
   "Şeridinizi paylaşarak onun için de alan bırakmak",
   "Önüne kırıp kalkışını engellemek",
   "Gaz verip egzoz sesiyle korkutmak"
  ],
  "s": "Kırmızı ışıkta beklerken yanınıza bir motosikletli yanaştı. Doğru davranışınız nedir?"
 },
 {
  "a": "Tekerlekli sandalyedeki bireyin geçişi zaman alabilir; durup izin vermek hem hakka saygı hem insanlık görevidir.",
  "c": 2,
  "d": "adab",
  "o": [
   "Hızlanıp ondan önce geçmek",
   "Yan şeritten dolanıp geçmek",
   "Durup güvenli şekilde karşıya geçmesine izin vermek",
   "Korna çalıp beklemesini söylemek"
  ],
  "s": "Tekerlekli sandalyedeki bir kişinin karşıya geçmeye çalıştığını görüyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Okul çevrelerinde çocuklar öngörülemez hareket eder; hızı düşürmek olası bir faciayı önler.",
  "c": 0,
  "d": "adab",
  "o": [
   "Hızınızı okul bölgesi sınırının da altına düşürüp dikkatli geçmek",
   "Korna çalıp çocukları yoldan uzaklaştırmak",
   "Hızlı geçip bölgeden bir an önce uzaklaşmak",
   "Emniyet şeridini kullanıp geçmek"
  ],
  "s": "Okul çıkış saatinde çocuklar kaldırımda oynuyor, bazıları zaman zaman yola taşıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Trafikte kışkırtmalara yanıt vermek tartışmayı ve kazayı büyütür; görmezden gelip yolunuza devam etmek en olgun tepkidir.",
  "c": 3,
  "d": "adab",
  "o": [
   "Camı açıp sözlü karşılık vermek",
   "Takip edip hesap sormak",
   "Kasıtlı frene basıp onu cezalandırmak",
   "Tepki vermeden yolunuza devam etmek"
  ],
  "s": "Trafikte başka bir sürücü size el kol hareketi yapıyor ve bağırıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Agresif sürücüye aynı şekilde karşılık vermek durumu tehlikeli hale getirir; yol vermek gerginliği bitirir.",
  "c": 1,
  "d": "adab",
  "o": [
   "Sert frene basıp onu korkutmak",
   "Sakinliğinizi koruyup müsait ilk yerde yol vermek",
   "Aynı agresiflikle karşılık vermek",
   "Hızlanıp ondan kaçmaya çalışmak"
  ],
  "s": "Arkanızdaki araç sürekli selektör yapıyor ve tamponunuza yapışmış durumda. Doğru davranışınız nedir?"
 },
 {
  "a": "Park yeri tartışması büyürse can güvenliğiniz riske girer; geri adım atıp uzaklaşmak cesaret değil akıllılıktır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Araçtan inip üste çıkmaya çalışmak",
   "Bağırarak haklılığınızı ispatlamaya çalışmak",
   "Sakin kalıp tartışmayı uzatmadan ortamdan uzaklaşmak",
   "Sinirle diğer aracın aynasını kırmak"
  ],
  "s": "Bir park yeri yüzünden başka bir sürücüyle tartışma çıktı ve tansiyon yükseliyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Kavgaya karışmak sizi de tehlikeye atar; güvenli mesafeden 112'yi aramak hem yardımcı hem güvenli davranıştır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Aracınızı güvenli bir yere çekip 112'yi aramak",
   "Taraflardan birinin yanında kavgaya dahil olmak",
   "Korna çalıp yolu açmalarını istemek",
   "Videoya çekip sosyal medyada paylaşmak"
  ],
  "s": "İki sürücünün yol ortasında kavga ettiğini görüyorsunuz ve trafik kilitlenmek üzere. Doğru davranışınız nedir?"
 },
 {
  "a": "Empati, trafik adabının özüdür; kendinizi onun yerine koymak sabrı ve anlayışı beraberinde getirir.",
  "c": 3,
  "d": "adab",
  "o": [
   "Korna çalıp acele etmesini sağlamak",
   "Tehlikeli bir şekilde sollayıp geçmek",
   "Selektörle baskı kurmak",
   "Onun yerinde siz olabileceğinizi düşünüp güvenli mesafeyle takip etmek"
  ],
  "s": "Önünüzdeki araç aniden yavaşladı ve sürücünün yaşlı olduğunu fark ettiniz. Doğru davranışınız nedir?"
 },
 {
  "a": "Yabancı plakalı sürücü yolu bilmiyor olabilir; anlayış gösterip yol vermek trafikte empati demektir.",
  "c": 1,
  "d": "adab",
  "o": [
   "Korna çalıp baskı yapmak",
   "Yolu bilmediğini varsayıp anlayışla yol vermek",
   "Önüne kırıp geçmek",
   "Uzun far yakıp korkutmak"
  ],
  "s": "Yabancı plakalı bir araç kavşakta kararsız kaldı, hangi yöne gideceğini bilemiyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Acemi sürücü zaten streslidir; korna ve laf atmak hatayı artırır, sabır ise herkesin işini kolaylaştırır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Korna çalıp acele etmesini sağlamak",
   "Camdan laf atarak tepki göstermek",
   "Sabırla beklemek, gerekirse parkına yardımcı olmak",
   "Üzerine sürerek korkutmak"
  ],
  "s": "Acemi bir sürücü park etmeye çalışırken trafiği yavaşlatıyor ve birkaç denemede park edemedi. Doğru davranışınız nedir?"
 },
 {
  "a": "Yolda kalmış birine yardım etmek trafik dayanışmasının temelidir; güvenli duruşla sorulan bir soru kimseye zarar vermez.",
  "c": 0,
  "d": "adab",
  "o": [
   "Güvenli bir noktada durup yardıma ihtiyacı olup olmadığını sormak",
   "Hızlanıp yanından geçmek",
   "Camı açmadan bakıp yolunuza devam etmek",
   "Korna çalıp çekici çağırmasını işaret etmek"
  ],
  "s": "Gece ıssız bir yolda lastiği patlamış bir sürücü size el kaldırıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Meraklı izleyiciler trafiği kilitler ve yardım ekiplerini engeller; akışı bozmadan geçmek herkese yardımcı olur.",
  "c": 3,
  "d": "adab",
  "o": [
   "Durup merakla kazayı izlemek",
   "Telefonla çekim yapmak için yavaşlamak",
   "Yavaşlayıp geçişi engellemeden yolunuza devam etmek",
   "Karşı şeride geçip daha iyi bakmak"
  ],
  "s": "Önünüzde maddi hasarlı bir kaza olmuş, meraklı sürücüler yüzünden trafik iyice yavaşlıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Arızada ilk kural diğer sürücüleri uyarmaktır; dörtlü ve reflektör zincirleme kazayı önler.",
  "c": 1,
  "d": "adab",
  "o": [
   "Kapıları kilitleyip araç içinde beklemek",
   "Dörtlüleri yakıp reflektörü uygun mesafeye koyarak diğer sürücüleri uyarmak",
   "Aracı yolun ortasında bırakıp uzaklaşmak",
   "Telefonla konuşarak yol ortasında beklemek"
  ],
  "s": "Aracınız arızalandı ve orta şeritte kaldınız, trafik akıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Gereksiz yere çalışır durumda bekleyen motor hem gürültü hem egzoz kirliliği yaratır; stop etmek çevreye saygıdır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Motoru çalıştırmaya devam etmek",
   "Beklerken yüksek sesli müzik açmak",
   "Gereksiz yere motoru çalıştırmayıp stop etmek",
   "Ara sıra gaza basıp ses çıkarmak"
  ],
  "s": "Gece apartmanların arasında birini bekliyorsunuz ve uzun süre araçta oturacaksınız. Doğru davranışınız nedir?"
 },
 {
  "a": "İzmarit hem yangın riski hem çevre kirliliğidir; çöpleri araçta biriktirmek en basit çevre sorumluluğudur.",
  "c": 0,
  "d": "adab",
  "o": [
   "Çöpleri araç içinde biriktirip uygun yere atmak",
   "Sigara izmaritini camdan dışarı atmak",
   "Pet şişeyi yol kenarına bırakmak",
   "Küllüğü yola boşaltmak"
  ],
  "s": "Seyir halindeyken bir sürücünün camdan sigara izmariti attığını gördünüz. Çevreye saygılı doğru davranış nedir?"
 },
 {
  "a": "Gece yüksek sesli müzik uyuyan insanları rahatsız eder; ses düzeyini kısmak komşuluk ve trafik adabının gereğidir.",
  "c": 3,
  "d": "adab",
  "o": [
   "Sesi sonuna kadar açıp geçmek",
   "Egzozu patlatarak ses çıkarmak",
   "Basları yükseltip camları açmak",
   "Ses düzeyini çevreye rahatsızlık vermeyecek seviyede tutmak"
  ],
  "s": "Gece yarısı yerleşim bölgesinden geçiyorsunuz ve müzik dinliyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Yeşil yanar yanmaz korna çalmak sabırsızlıktır; kışkırtmaya kapılmadan güvenli kalkış yapmak olgun sürücülüktür.",
  "c": 1,
  "d": "adab",
  "o": [
   "Siz de korna çalarak karşılık vermek",
   "Sakin kalıp güvenli şekilde hareket etmek",
   "Araçtan inip tartışmak",
   "Kasıtlı olarak bekleyip onu kızdırmak"
  ],
  "s": "Işık yeşile döner dönmez arkanızdaki araç korna çalmaya başladı. Doğru tepkiniz nedir?"
 },
 {
  "a": "Kırmızı ışıkta geçmek hem kural ihlali hem saygısızlıktır; kimsenin olmadığı düşüncesi bu gerçeği değiştirmez.",
  "c": 2,
  "d": "adab",
  "o": [
   "Etrafta kimse yoksa geçmek",
   "Sağa sola bakıp hızlıca geçmek",
   "Kuralın herkes için geçerli olduğunu bilip durarak yeşili beklemek",
   "Yavaşça süzülerek geçmek"
  ],
  "s": "Acele bir işiniz var, kavşakta kırmızı yandı ve etrafta kimse görünmüyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Geçidin üstüne çıkmak yayaların yolunu kapatır; geride beklemek hem kurala hem nezakete uygun davranıştır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Geçit boşalmadan geçide girmeyip geride beklemek",
   "Siz de geçidin üstüne çıkıp durmak",
   "Kaldırıma çıkarak geçidi atlamak",
   "Korna çalıp öndekileri ilerletmeye çalışmak"
  ],
  "s": "Trafik sıkışık ve önünüzdeki araçlar yaya geçidinin üstünde durmuş durumda. Doğru davranışınız nedir?"
 },
 {
  "a": "Engelli park yeri bir ayrıcalık değil ihtiyaçtır; beş dakika bile olsa işgal etmek hak gaspıdır.",
  "c": 3,
  "d": "adab",
  "o": [
   "Nasıl olsa boş, hemen park etmek",
   "Dörtlüleri yakıp kısa süreli park etmek",
   "Kimse görmez diye park etmek",
   "Kısa süreli de olsa işgal etmeyip normal bir yere park etmek"
  ],
  "s": "AVM otoparkında engelli park yeri boş, siz de sadece beş dakikalığına duracaksınız. Doğru davranışınız nedir?"
 },
 {
  "a": "Kaldırım yayalarındır; araç parkı yüzünden yaya yola iniyorsa bu açık bir hak ihlalidir.",
  "c": 1,
  "d": "adab",
  "o": [
   "Pratik ve kabul edilebilir bir çözüm",
   "Yayaların hakkını ihlal eden saygısız bir davranış",
   "Trafik akışını rahatlatan akıllıca bir davranış",
   "Kimseye zararı olmayan masum bir durum"
  ],
  "s": "Kaldırıma park etmiş araçlar yüzünden yayalar, bebek arabalı anneler yola inmek zorunda kalıyor. Bu davranışı nasıl değerlendirirsiniz?"
 },
 {
  "a": "Emniyet şeridi ambulans, itfaiye ve arızalı araçlar içindir; orayı kullanmak hem yasak hem vicdansızlıktır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Onlara katılıp emniyet şeridinden ilerlemek",
   "Şeridi ortalayarak başkalarının geçişini engellemek",
   "Ambulans ve arıza araçlarına ayrıldığını bilip kendi şeridinizde beklemek",
   "Arkalarından takip edip ilerlemek"
  ],
  "s": "Trafik kilitlendi ve bazı araçlar emniyet şeridinden ilerlemeye başladı. Doğru davranışınız nedir?"
 },
 {
  "a": "Alkollü sürücüyü engellemek bir can kurtarabilir; arkadaşlık, onun direksiyona geçmesine izin vermek değil engel olmaktır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Onu engelleyip alternatif ulaşım ayarlamasına yardımcı olmak",
   "Az içtiyse sorun olmaz demek",
   "Yanına oturup ona eşlik etmek",
   "Karışmayıp kendi işinize bakmak"
  ],
  "s": "Bir arkadaşınız içkili halde direksiyona geçmek istiyor ve ısrar ediyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Kemer hayat kurtarır ve herkes için zorunludur; kemersiz hareket etmemek hem kural hem sorumluluktur.",
  "c": 3,
  "d": "adab",
  "o": [
   "Umursamayıp yola devam etmek",
   "Kemerin sadece ön koltukta zorunlu olduğunu söylemek",
   "Kısa mesafede gerek olmadığını söylemek",
   "Herkes kemerini takmadan hareket etmemek"
  ],
  "s": "Arka koltuktaki yolcunuz emniyet kemeri takmak istemiyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Telefona bakmak için en güvenli an durduğunuz andır; seyir halinde bir saniyelik dalgınlık bile kazaya yol açar.",
  "c": 1,
  "d": "adab",
  "o": [
   "Hızlıca bakıp cevaplamak",
   "Güvenli bir yere çekip durduktan sonra bakmak",
   "Telefonu diz üstünde tutup yazmak",
   "Kulaklıkla konuşurken mesaj yazmak"
  ],
  "s": "Trafikte seyrederken telefonunuza önemli bir mesaj geldi. Doğru davranışınız nedir?"
 },
 {
  "a": "Uykulu sürüş alkollü sürüş kadar tehlikelidir; mola verip dinlenmek hem sizin hem başkalarının hayatını korur.",
  "c": 2,
  "d": "adab",
  "o": [
   "Camı açıp serin havayla devam etmek",
   "Kahve içip uykuyu zorlamak",
   "Güvenli bir tesiste mola verip dinlenmek",
   "Müziği açıp uyanık kalmaya çalışmak"
  ],
  "s": "Uzun yolda gözleriniz kapanmaya başladı, konsantrasyonunuz dağılıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Hız sınırı yol boşken de geçerlidir; kurala uymak trafikte herkese karşı sorumluluğunuzdur.",
  "c": 0,
  "d": "adab",
  "o": [
   "Sınırlara uymak, yol boş olsa da kuralın herkes için olduğunu bilmek",
   "Kimse yoksa gaza basmak",
   "Radar yoksa sorun olmadığını düşünmek",
   "Geceyse serbest olduğunu varsaymak"
  ],
  "s": "Boş ve düzgün bir yolda hız sınırının üstüne çıkma isteği duyuyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Servis dur tabelası açmışsa çocuklar her an yola fırlayabilir; durup beklemek tartışmasız bir zorunluluktur.",
  "c": 3,
  "d": "adab",
  "o": [
   "Servisi sollayıp geçmek",
   "Korna çalıp acele etmesini sağlamak",
   "Yanından yavaşça süzülerek geçmek",
   "Durup çocuklar güvenle uzaklaşana kadar beklemek"
  ],
  "s": "Önünüzdeki okul servisi durdu, DUR levhasını açtı ve çocuklar inmeye başladı. Doğru davranışınız nedir?"
 },
 {
  "a": "Otobüs durağa yanaşırken yolcuların güvenliği önceliklidir; yol vermek toplu taşımaya saygının göstergesidir.",
  "c": 1,
  "d": "adab",
  "o": [
   "Otobüsün önüne kırıp geçmek",
   "Otobüse yol verip yolcuların güvenle inip binmesini beklemek",
   "Korna çalıp şoföre tepki göstermek",
   "Kaldırıma çıkarak geçmek"
  ],
  "s": "Otobüs durağa yanaşırken şeridinde ilerliyor ve siz yanındasınız. Doğru davranışınız nedir?"
 },
 {
  "a": "Duraktan çıkan otobüse yol vermek trafikte dayanışmadır; önünü kesmek hem tehlikeli hem saygısızlıktır.",
  "c": 2,
  "d": "adab",
  "o": [
   "Hızlanıp otobüsün önünü kesmek",
   "Korna çalarak uyarmak",
   "Yavaşlayıp otobüsün duraktan çıkışına izin vermek",
   "Sağından sıkıştırarak geçmek"
  ],
  "s": "Duraktan çıkmaya çalışan bir otobüs sinyal verdi. Doğru davranışınız nedir?"
 },
 {
  "a": "Başkalarının çalışma alanını işgal ettiğinizi fark edip düzeltmek trafikte özür ve saygı kültürünün parçasıdır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Özür dileyip aracınızı çekmek",
   "Şoförle tartışmaya girmek",
   "Umursamayıp beklemeye devam etmek",
   "Daha da yaklaşarak tepki göstermek"
  ],
  "s": "Taksi durağı önünde bekleyen taksilerin önüne park ettiniz ve şoför tepki gösterdi. Doğru davranışınız nedir?"
 },
 {
  "a": "Uzun farla karşılık vermek iki tarafı da kör eder; kısa selektörle uyarıp bakışı sağ çizgiye yöneltmek güvenli çözümdür.",
  "c": 3,
  "d": "adab",
  "o": [
   "Siz de uzunları yakıp karşılık vermek",
   "Kornaya basarak tepki göstermek",
   "Şeridinizden çıkıp üzerine sürmek",
   "Kısa selektörle uyarıp bakışınızı yolun sağ çizgisine yöneltmek"
  ],
  "s": "Karşıdan gelen araç sürekli uzun farla geliyor ve gözünüz kamaşıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Şehir içi aydınlatmada uzun far karşıdan geleni ve öndeki sürücüyü kör eder; kısa far hem yeterli hem saygılıdır.",
  "c": 1,
  "d": "adab",
  "o": [
   "Görüş iyi olsun diye uzun farla devam etmek",
   "Karşıdan gelenleri ve öndekileri rahatsız etmemek için kısa fara geçmek",
   "Selektör yaparak ilerlemek",
   "Sis farlarını da yakarak ilerlemek"
  ],
  "s": "Şehir içinde aydınlatmalı bir yolda uzun farla seyrettiğinizi fark ettiniz. Doğru davranışınız nedir?"
 },
 {
  "a": "Çift sıra park başkalarının geçiş hakkını gasp eder; kısa süreli bile olsa bencil bir tercihtir.",
  "c": 2,
  "d": "adab",
  "o": [
   "Kabul edilebilir bir pratiklik",
   "Herkes yaptığı için normal bir durum",
   "Diğer sürücülerin hakkını gasp eden bencil bir davranış",
   "Trafiği hızlandıran akıllıca bir çözüm"
  ],
  "s": "Dar bir sokakta çift sıra park etmiş araçlar yüzünden geçiş imkansız hale gelmiş. Bu davranışı trafik adabı açısından nasıl değerlendirirsiniz?"
 },
 {
  "a": "Sinyal vermek niyetinizi belli eder ve kazayı önler; siz kurala uyarak hem güvenli hem örnek olursunuz.",
  "c": 0,
  "d": "adab",
  "o": [
   "Siz her zaman sinyal vererek örnek olmak",
   "Siz de sinyal vermekten vazgeçmek",
   "Korna çalıp ona ders vermek",
   "Önüne kırıp misilleme yapmak"
  ],
  "s": "Trafikte birçok sürücünün şerit değiştirirken sinyal vermediğini görüyorsunuz. Doğru tutumunuz nedir?"
 },
 {
  "a": "Fermuar sistemine uymak trafiği hızlandırır; bir araçlık boşluk bırakmak bencilliğin değil akıllı sürücülüğün göstergesidir.",
  "c": 3,
  "d": "adab",
  "o": [
   "Araya girmeye çalışanı sıkıştırarak engellemek",
   "Korna çalıp yol vermemek",
   "Camdan bağırarak tepki göstermek",
   "Sırayla geçiş kuralına uyup bir araçlık boşluk bırakmak"
  ],
  "s": "Sıkışık bir kavşakta fermuar düzenine uymayan bir sürücü önünüze girmeye çalışıyor. Doğru davranışınız nedir?"
 },
 {
  "a": "Dönel kavşakta içerideki aracın önceliği vardır; saygı göstermek hem kural hem akışı rahatlatan davranıştır.",
  "c": 1,
  "d": "adab",
  "o": [
   "İçerideki araca öncelik tanımak",
   "Hızlanıp kavşağa önce girmek",
   "Korna çalıp içeridekini durdurmaya çalışmak",
   "Kavşağı ortalayarak ilerlemek"
  ],
  "s": "Dönel kavşağa girmek üzeresiniz, içeride seyreden bir araç var. Doğru davranışınız nedir?"
 },
 {
  "a": "Ambulansa koridor açmak hayat kurtarır; fermuar sistemiyle sağa yanaşmak en hızlı ve düzenli yoldur.",
  "c": 2,
  "d": "adab",
  "o": [
   "Ambulansın arkasına takılıp onunla ilerlemek",
   "Olduğunuz yerde kalıp beklemek",
   "Sağa yanaşıp fermuar sistemiyle geçiş koridoru açmak",
   "Hızlanıp ambulansın önünden kaçmak"
  ],
  "s": "Arkadan siren sesiyle bir ambulans yaklaşıyor, trafik sıkışık. Doğru davranışınız nedir?"
 },
 {
  "a": "Trafikte güçsüz olanı korumak adabın özüdür; araçlı olmak yayaya karşı üstünlük değil sorumluluk verir.",
  "c": 0,
  "d": "adab",
  "o": [
   "Trafikte herkesin hakkı eşittir; güçsüz olanı korumak nezaketin gereğidir",
   "Haklı, yayalar her zaman beklemeli",
   "Araç her durumda önceliklidir",
   "Kimin acelesi varsa o önce geçer"
  ],
  "s": "Bir tanıdığınız 'Yayalar zaten yavaş yürüyor, beklesinler' diyor. Trafik adabı açısından doğru cevap nedir?"
 },
 {
  "a": "Motosikletliyi sıkıştırmak ölümle sonuçlanabilir; tanık olarak bile olsa alan tanımak doğru davranıştır.",
  "c": 3,
  "d": "adab",
  "o": [
   "Karışmadan izlemek",
   "Telefonla video çekmek",
   "Sıkıştırmaya katılmak",
   "Güvenli mesafe bırakıp motosikletlinin geçişine alan tanımak"
  ],
  "s": "İki aracın aralarında bir motosikletliyi sıkıştırdığını görüyorsunuz. Doğru davranışınız nedir?"
 },
 {
  "a": "Herkes yaşlanır; bugünün genç sürücüsü yarının yavaşlayan sürücüsüdür, bunu hatırlatmak empati kurdurur.",
  "c": 1,
  "d": "adab",
  "o": [
   "Devam et, haklısın demek",
   "Bir gün senin de reflekslerin yavaşlayacak; sabır trafik adabının temelidir demek",
   "Onu sollayıp gitmesini söylemek",
   "Umursamayıp konuyu kapatmak"
  ],
  "s": "Yavaş giden yaşlı bir sürücüye korna çalan genç bir sürücüye ne söylersiniz?"
 },
 {
  "a": "112'yi arayıp bilinçli ilk yardım uygulamak hayat kurtarır; yaralıyı bilinçsizce taşımak ise felce yol açabilir.",
  "c": 2,
  "d": "adab",
  "o": [
   "Durmayıp yolunuza devam etmek",
   "Kalabalığa katılıp izlemek",
   "Güvenli şekilde durup 112'yi arayarak ilk yardım bilgisiyle müdahalede bulunmak",
   "Yaralıyı hemen araca taşıyıp hastaneye götürmek"
  ],
  "s": "Yaralanmalı bir trafik kazasına denk geldiniz ve temel ilk yardım bilginiz var. Doğru davranışınız nedir?"
 },
 {
  "a": "Trafik adabı; kurallara uymakla birlikte başkalarının hakkına saygı, sabır ve hoşgörüyle davranmaktır.",
  "c": 0,
  "d": "adab",
  "o": [
   "Başkalarının haklarına saygı göstererek güvenli ve hoşgörülü davranmak",
   "Her zaman en hızlı şekilde ilerlemek",
   "Kendi hakkını sonuna kadar savunmak",
   "Kurallara sadece denetim varken uymak"
  ],
  "s": "Trafik adabının temel ilkesi aşağıdakilerden hangisidir?"
 }
];
