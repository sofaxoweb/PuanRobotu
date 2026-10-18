'use strict';
/* =====================================================================
   PuanRobotu — İOKBS (Bursluluk) Puan Hesaplama motoru
   Resmi kaynak: MEB İOKBS 2026 Başvuru ve Uygulama Kılavuzu.
   Net_test = Doğru − (Yanlış ÷ 3); 4 testin ağırlık katsayısı 3.
   Tahmini Puan = 100 + 400 × (Ağırlıklı ÷ 300) → 100–500 ölçeği.
   Gerçek puan standart puanlarla (TASP) hesaplandığı için sonuç TAHMİNİDİR.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

var TESTLER = [
  { id: 'turkce',   ad: 'Türkçe',         kisa: 'Türkçe',   soru: 25, katsayi: 3 },
  { id: 'matematik', ad: 'Matematik',      kisa: 'Matematik', soru: 25, katsayi: 3 },
  { id: 'fen',      ad: 'Fen Bilimleri',   kisa: 'Fen',      soru: 25, katsayi: 3 },
  { id: 'sosyal',   ad: 'Sosyal Bilimler', kisa: 'Sosyal',   soru: 25, katsayi: 3 }
];

var MAKS_AGIRLIKLI = 300; /* 4 test × 25 net × 3 katsayı */

/* ---------- Saf fonksiyonlar ---------- */

/* Net = Doğru − (Yanlış ÷ 3). İOKBS'de 3 yanlış, 1 doğruyu götürür. */
function netHesapla(dogru, yanlis) {
  return dogru - yanlis / 3;
}

/* Girdi doğrulama. Hata mesajı Türkçe döner. */
function girdiyiDogrula(dogru, yanlis, soruSayisi, testAd) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: testAd + ': lütfen sayı girin.' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: testAd + ': negatif değer giremezsin.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: testAd + ': tam sayı gir (örn. 15).' };
  }
  if (dogru + yanlis > soruSayisi) {
    return { ok: false, mesaj: testAd + ': doğru + yanlış, ' + soruSayisi + ' soruyu geçemez.' };
  }
  return { ok: true };
}

/* Ağırlıklı toplam: Σ (net × katsayı). En fazla 300. */
function agirlikliToplam(netler) {
  var toplam = 0;
  for (var i = 0; i < TESTLER.length; i++) {
    toplam += netler[i] * TESTLER[i].katsayi;
  }
  return toplam;
}

/* Tahmini Puan = 100 + 400 × (Ağırlıklı ÷ 300). Ölçek 100–500 ile sınırlı. */
function tahminiPuan(agirlikli) {
  var puan = 100 + 400 * (agirlikli / MAKS_AGIRLIKLI);
  if (puan < 100) return 100;
  if (puan > 500) return 500;
  return puan;
}

/* Toplu hesaplama. girdiler: [[dogru, yanlis], ...] (TESTLER sırasıyla). */
function hesapla(girdiler) {
  var netler = [];
  for (var i = 0; i < TESTLER.length; i++) {
    netler.push(netHesapla(girdiler[i][0], girdiler[i][1]));
  }
  var agirlikli = agirlikliToplam(netler);
  return { netler: netler, agirlikli: agirlikli, puan: tahminiPuan(agirlikli) };
}

/* Türkçe sayı biçimi: 18,33 */
function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

/* Dışa aktarım: tarayıcıda window.PR_bursluluk, Node testinde module.exports. */
var PR_BURSLULUK_API = {
  TESTLER: TESTLER,
  MAKS_AGIRLIKLI: MAKS_AGIRLIKLI,
  netHesapla: netHesapla,
  girdiyiDogrula: girdiyiDogrula,
  agirlikliToplam: agirlikliToplam,
  tahminiPuan: tahminiPuan,
  hesapla: hesapla,
  trSayi: trSayi
};

if (typeof window !== 'undefined') {
  window.PR_bursluluk = PR_BURSLULUK_API;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PR_BURSLULUK_API;
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var tbody = document.getElementById('ders-satirlari');
    if (!tbody) return;
    var hataKutusu = document.getElementById('form-hata');

    /* Satırları üret */
    TESTLER.forEach(function (test) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="ders-ad">' + test.kisa +
        '<small>' + test.soru + ' soru · ×' + test.katsayi + '</small></span></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + test.soru + '" step="1" ' +
        'id="dogru-' + test.id + '" aria-label="' + test.ad + ' doğru sayısı" placeholder="0"></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + test.soru + '" step="1" ' +
        'id="yanlis-' + test.id + '" aria-label="' + test.ad + ' yanlış sayısı" placeholder="0"></td>' +
        '<td><span class="hesaplanan" id="bos-' + test.id + '">–</span></td>' +
        '<td><span class="hesaplanan" id="net-' + test.id + '">–</span></td>';
      tbody.appendChild(tr);
    });

    var sonHesap = null;

    function oku() {
      var girdiler = [];
      var hata = null;
      for (var i = 0; i < TESTLER.length; i++) {
        var t = TESTLER[i];
        var d = parseInt(document.getElementById('dogru-' + t.id).value, 10);
        var y = parseInt(document.getElementById('yanlis-' + t.id).value, 10);
        if (isNaN(d)) d = 0;
        if (isNaN(y)) y = 0;
        var kontrol = girdiyiDogrula(d, y, t.soru, t.ad);
        if (!kontrol.ok && !hata) hata = kontrol.mesaj;
        girdiler.push([d, y]);
        document.getElementById('bos-' + t.id).textContent = (t.soru - d - y) >= 0 ? (t.soru - d - y) : '–';
      }
      return { girdiler: girdiler, hata: hata };
    }

    function guncelle() {
      var okunan = oku();
      if (okunan.hata) {
        hataKutusu.textContent = okunan.hata;
        hataKutusu.hidden = false;
        return;
      }
      hataKutusu.hidden = true;
      var s = hesapla(okunan.girdiler);
      sonHesap = s;
      for (var i = 0; i < TESTLER.length; i++) {
        document.getElementById('net-' + TESTLER[i].id).textContent = trSayi(s.netler[i], 2);
      }
      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;
      document.getElementById('s-net').textContent = trSayi(
        s.netler.reduce(function (a, b) { return a + b; }, 0), 2);
      document.getElementById('s-agirlikli').textContent = trSayi(s.agirlikli, 2);
      document.getElementById('s-puan').textContent = trSayi(s.puan, 2);
    }

    tbody.addEventListener('input', guncelle);

    document.getElementById('btn-hesapla').addEventListener('click', guncelle);

    document.getElementById('btn-temizle').addEventListener('click', function () {
      TESTLER.forEach(function (test) {
        document.getElementById('dogru-' + test.id).value = '';
        document.getElementById('yanlis-' + test.id).value = '';
        document.getElementById('bos-' + test.id).textContent = '–';
        document.getElementById('net-' + test.id).textContent = '–';
      });
      hataKutusu.hidden = true;
      sonHesap = null;
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });

    function sonucMetni(s) {
      return 'Bursluluk (İOKBS) Tahminim: Net ' + trSayi(
        s.netler.reduce(function (a, b) { return a + b; }, 0), 2) +
        ' | Tahmini Puan ' + trSayi(s.puan, 2) + ' (PuanRobotu)';
    }

    document.getElementById('btn-kopyala').addEventListener('click', function () {
      if (!sonHesap) return;
      var metin = sonucMetni(sonHesap);
      var btn = this;
      function geriBildirim() {
        btn.textContent = 'Kopyalandı ✓';
        setTimeout(function () { btn.textContent = 'Sonucu Kopyala'; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(metin).then(geriBildirim, geriBildirim);
      } else {
        var ta = document.createElement('textarea');
        ta.value = metin;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        geriBildirim();
      }
    });

    document.getElementById('btn-whatsapp').addEventListener('click', function () {
      if (!sonHesap) return;
      var url = 'https://wa.me/?text=' + encodeURIComponent(sonucMetni(sonHesap));
      window.open(url, '_blank', 'noopener');
    });
  });
}
