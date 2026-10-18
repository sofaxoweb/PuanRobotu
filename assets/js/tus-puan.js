'use strict';
/* =====================================================================
   PuanRobotu — TUS Puan Hesaplama motoru
   TTBT (100 soru, 135 dk) + KTBT (100 soru, 135 dk).
   Ham puan = Doğru − (Yanlış ÷ 4), her test için ayrı.
   Resmi ağırlıklar (2026 TUS kılavuzu): K = %40 TTBT + %60 KTBT;
   T = %60 TTBT + %40 KTBT. En yüksek puan 85, tercih barajı 45.
   Resmi son puan, sınav-sonrası istatistiklerle (ortalama, standart sapma,
   en yüksek ağırlıklı puan) hesaplanır. Bu motor, 2026 Mart TUS dönemine
   ait YAYINLANMIŞ ampirik katsayılarla şeffaf bir tahmin üretir:
   her dönem sınavın zorluğuna göre değişir. Tüm sonuçlar "tahmini"dir.
   ===================================================================== */

var TUS_TESTLER = [
  { id: 'ttbt', ad: 'Temel Tıp Bilimleri Testi', kisa: 'TTBT', soru: 100 },
  { id: 'ktbt', ad: 'Klinik Tıp Bilimleri Testi', kisa: 'KTBT', soru: 100 }
];

/* Ampirik dayanaklar — Kaynak: tuskocu.com'un 2026 Mart TUS analizi:
   "klinik puanı için temel bilimlerden bir net 0,207, klinik bilimlerden
   bir net 0,277 puan; temel puanı için temel bilimlerden bir net 0,294,
   klinik bilimlerden bir net 0,175 puan getirmiştir. 0 net yapan aday
   temelden 41,8, klinikten 40,3 puanı garanti alır."
   DÖNEME ÖZELDİR — her TUS'ta katsayılar değişir. */
var TUS_K_TABAN = 40.3, TUS_K_TTBT = 0.207, TUS_K_KTBT = 0.277;
var TUS_T_TABAN = 41.8, TUS_T_TTBT = 0.294, TUS_T_KTBT = 0.175;

var TUS_MAKS = 85;  /* Resmi en yüksek puan. */
var TUS_BARAJ = 45; /* Bu puanın altı tercih dışı kalır. */

function tusYuvarla(n) {
  return Math.round(n * 100) / 100;
}

/* Ham puan = Doğru − (Yanlış ÷ 4). Negatif ham 0'a sabitlenir. */
function hamHesapla(dogru, yanlis) {
  var ham = dogru - yanlis / 4;
  if (ham < 0) ham = 0;
  return tusYuvarla(ham);
}

function girdiyiDogrula(dogru, yanlis, test) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': lütfen sayı gir.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': tam sayı gir (örn. 60).' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: test.kisa + ': negatif değer giremezsin.' };
  }
  if (dogru + yanlis > test.soru) {
    return { ok: false, mesaj: test.kisa + ': doğru + yanlış, 100 soruyu geçemez.' };
  }
  return { ok: true };
}

/* Ampirik doğrusal modelle tahmini K/T puanları (0–85 aralığına sabitlenir). */
function puanHesapla(hamTTBT, hamKTBT) {
  var k = TUS_K_TABAN + TUS_K_TTBT * hamTTBT + TUS_K_KTBT * hamKTBT;
  var t = TUS_T_TABAN + TUS_T_TTBT * hamTTBT + TUS_T_KTBT * hamKTBT;
  if (k > TUS_MAKS) k = TUS_MAKS;
  if (t > TUS_MAKS) t = TUS_MAKS;
  if (k < 0) k = 0;
  if (t < 0) t = 0;
  return { K: tusYuvarla(k), T: tusYuvarla(t) };
}

function hesapla(girdiler) {
  var hamlar = [];
  for (var i = 0; i < TUS_TESTLER.length; i++) {
    var v = girdiyiDogrula(girdiler[i].dogru, girdiler[i].yanlis, TUS_TESTLER[i]);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, testIndex: i };
    hamlar.push(hamHesapla(girdiler[i].dogru, girdiler[i].yanlis));
  }
  var p = puanHesapla(hamlar[0], hamlar[1]);
  return {
    ok: true,
    hamTTBT: hamlar[0],
    hamKTBT: hamlar[1],
    K: p.K,
    T: p.T,
    barajK: p.K >= TUS_BARAJ,
    barajT: p.T >= TUS_BARAJ
  };
}

function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TUS_TESTLER: TUS_TESTLER,
    TUS_MAKS: TUS_MAKS,
    TUS_BARAJ: TUS_BARAJ,
    hamHesapla: hamHesapla,
    girdiyiDogrula: girdiyiDogrula,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_tus = {
    hamHesapla: hamHesapla,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var hataKutusu = document.getElementById('form-hata');
    var ids = ['ttbt-dogru', 'ttbt-yanlis', 'ktbt-dogru', 'ktbt-yanlis'];
    var alanlar = ids.map(function (id) { return document.getElementById(id); });

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      return v === '' ? 0 : Number(v);
    }

    function barajRozeti(gecer) {
      return gecer ? ' (45 baraj üstü ✓)' : ' (45 baraj altı ✗)';
    }

    function guncelle() {
      hataKutusu.hidden = true;
      var s = hesapla([
        { dogru: deger('ttbt-dogru'), yanlis: deger('ttbt-yanlis') },
        { dogru: deger('ktbt-dogru'), yanlis: deger('ktbt-yanlis') }
      ]);
      var kutu = document.getElementById('sonuc-tablo');
      if (!s.ok) {
        hataKutusu.textContent = s.mesaj;
        hataKutusu.hidden = false;
        kutu.innerHTML = '<p class="sonuc-alt">Değerleri düzeltip tekrar dene.</p>';
        return;
      }
      kutu.innerHTML =
        '<table class="sonuc-tablosu"><tbody>' +
        '<tr><th scope="row">TTBT Ham Puan</th><td>' + trSayi(s.hamTTBT, 2) + ' / 100</td></tr>' +
        '<tr><th scope="row">KTBT Ham Puan</th><td>' + trSayi(s.hamKTBT, 2) + ' / 100</td></tr>' +
        '<tr><th scope="row">Tahmini K Puanı</th><td><strong>' + trSayi(s.K, 2) + '</strong>' + barajRozeti(s.barajK) + '</td></tr>' +
        '<tr><th scope="row">Tahmini T Puanı</th><td><strong>' + trSayi(s.T, 2) + '</strong>' + barajRozeti(s.barajT) + '</td></tr>' +
        '</tbody></table>' +
        '<p class="sonuc-alt">En yüksek TUS puanı 85\u2019tir. 45\u2019in altındaki puanla tercih yapılamaz.</p>';
    }

    alanlar.forEach(function (el) {
      if (el) el.addEventListener('input', guncelle);
    });
    var btn = document.getElementById('btn-hesapla');
    if (btn) btn.addEventListener('click', guncelle);
    var temizle = document.getElementById('btn-temizle');
    if (temizle) temizle.addEventListener('click', function () {
      alanlar.forEach(function (el) { if (el) el.value = ''; });
      hataKutusu.hidden = true;
      document.getElementById('sonuc-tablo').innerHTML =
        '<p class="sonuc-alt">Her iki oturumun doğru–yanlışlarını gir.</p>';
    });
    guncelle();
  });
}
