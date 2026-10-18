'use strict';
/* =====================================================================
   PuanRobotu — DUS Puan Hesaplama motoru
   Tek oturum, 150 dakika, 120 soru: TBT (40) + KBT (80).
   Ham puan = Doğru − (Yanlış ÷ 4), her test için ayrı.
   Resmi ağırlıklar (2026 DUS kılavuzu): K = %40 TBT + %60 KBT;
   T = %60 TBT + %40 KBT. Oral Patoloji T puanını, diğer branşlar K
   puanını kullanır. Tercih barajı 45.
   DOĞRULANMIŞ FARK: DUS'ta TUS'taki gibi 85'e dönüştürme YOKTUR
   (kılavuzda dönüşüm formülü bulunmuyor); DUS puanı ağırlıklı
   standart puanın kendisidir.
   Resmi son puan sınav-sonrası istatistiklere bağlıdır; bu motor
   ham puanı, ŞEFFAF varsayımsal dönem istatistikleriyle standart
   puana çevirir. Tüm sonuçlar "tahmini"dir.
   ===================================================================== */

var DUS_TESTLER = [
  { id: 'tbt', ad: 'Temel Bilimler Testi', kisa: 'TBT', soru: 40 },
  { id: 'kbt', ad: 'Klinik Bilimler Testi', kisa: 'KBT', soru: 80 }
];

/* Varsayımsal dönem istatistikleri (şeffaf varsayım — gerçek değerler
   ÖSYM'in sınav-sonrası açıkladığı oturum verileridir):
   TBT: ortalama 22, standart sapma 6 (40 soru üzerinden);
   KBT: ortalama 42, standart sapma 10 (80 soru üzerinden). */
var DUS_TBT_ORT = 22, DUS_TBT_SS = 6;
var DUS_KBT_ORT = 42, DUS_KBT_SS = 10;

var DUS_BARAJ = 45;

function dusYuvarla(n) {
  return Math.round(n * 100) / 100;
}

/* Ham puan = Doğru − (Yanlış ÷ 4). Negatif ham 0'a sabitlenir. */
function hamHesapla(dogru, yanlis) {
  var ham = dogru - yanlis / 4;
  if (ham < 0) ham = 0;
  return dusYuvarla(ham);
}

/* Standart puan: SP = 50 + 10 × (ham − ortalama) / standart sapma. */
function spHesapla(ham, ortalama, ss) {
  return 50 + 10 * (ham - ortalama) / ss;
}

function girdiyiDogrula(dogru, yanlis, test) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': lütfen sayı gir.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': tam sayı gir (örn. 30).' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: test.kisa + ': negatif değer giremezsin.' };
  }
  if (dogru + yanlis > test.soru) {
    return { ok: false, mesaj: test.kisa + ': doğru + yanlış, ' + test.soru + ' soruyu geçemez.' };
  }
  return { ok: true };
}

/* Ağırlıklı puanlar. DUS'ta 85'e dönüştürme yoktur. */
function puanHesapla(hamTBT, hamKBT) {
  var spTBT = spHesapla(hamTBT, DUS_TBT_ORT, DUS_TBT_SS);
  var spKBT = spHesapla(hamKBT, DUS_KBT_ORT, DUS_KBT_SS);
  var k = 0.4 * spTBT + 0.6 * spKBT;
  var t = 0.6 * spTBT + 0.4 * spKBT;
  if (k > 100) k = 100;
  if (t > 100) t = 100;
  if (k < 0) k = 0;
  if (t < 0) t = 0;
  return {
    K: dusYuvarla(k),
    T: dusYuvarla(t),
    spTBT: dusYuvarla(spTBT),
    spKBT: dusYuvarla(spKBT)
  };
}

function hesapla(girdiler) {
  var hamlar = [];
  for (var i = 0; i < DUS_TESTLER.length; i++) {
    var v = girdiyiDogrula(girdiler[i].dogru, girdiler[i].yanlis, DUS_TESTLER[i]);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, testIndex: i };
    hamlar.push(hamHesapla(girdiler[i].dogru, girdiler[i].yanlis));
  }
  var p = puanHesapla(hamlar[0], hamlar[1]);
  return {
    ok: true,
    hamTBT: hamlar[0],
    hamKBT: hamlar[1],
    K: p.K,
    T: p.T,
    spTBT: p.spTBT,
    spKBT: p.spKBT,
    barajK: p.K >= DUS_BARAJ,
    barajT: p.T >= DUS_BARAJ
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
    DUS_TESTLER: DUS_TESTLER,
    DUS_BARAJ: DUS_BARAJ,
    hamHesapla: hamHesapla,
    spHesapla: spHesapla,
    girdiyiDogrula: girdiyiDogrula,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_dus = {
    hamHesapla: hamHesapla,
    spHesapla: spHesapla,
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
    var ids = ['tbt-dogru', 'tbt-yanlis', 'kbt-dogru', 'kbt-yanlis'];
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
        { dogru: deger('tbt-dogru'), yanlis: deger('tbt-yanlis') },
        { dogru: deger('kbt-dogru'), yanlis: deger('kbt-yanlis') }
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
        '<tr><th scope="row">TBT Ham Puan</th><td>' + trSayi(s.hamTBT, 2) + ' / 40</td></tr>' +
        '<tr><th scope="row">KBT Ham Puan</th><td>' + trSayi(s.hamKBT, 2) + ' / 80</td></tr>' +
        '<tr><th scope="row">Tahmini K Puanı</th><td><strong>' + trSayi(s.K, 2) + '</strong>' + barajRozeti(s.barajK) + '</td></tr>' +
        '<tr><th scope="row">Tahmini T Puanı</th><td><strong>' + trSayi(s.T, 2) + '</strong>' + barajRozeti(s.barajT) + '</td></tr>' +
        '</tbody></table>' +
        '<p class="sonuc-alt">Oral Patoloji T puanını kullanır; diğer tüm branşlar K puanıyla tercih yapar. 45\u2019in altı tercih dışı kalır.</p>';
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
        '<p class="sonuc-alt">TBT ve KBT doğru–yanlışlarını gir.</p>';
    });
    guncelle();
  });
}
