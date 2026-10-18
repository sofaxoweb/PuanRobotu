'use strict';
/* =====================================================================
   PuanRobotu — KPSS Ortaöğretim (P94) Puan Hesaplama motoru
   GY (60 soru) + GK (60 soru). Net = Doğru − (Yanlış ÷ 4).
   P94 ağırlığı: %50 GY + %50 GK (ÖSYM KPSS kılavuzu, resmi).
   DÜRÜSTLÜK NOTU: P94, ortaöğretim aday havuzunda AYRI standartlanır. Eldeki
   yayınlanmış dayanak P3 (lisans) havuzunundur; P94 tahmini bu dayanağın
   şeffaf uyarlamasıdır. 2018 ÖSYM istatistikli P94 tablosuyla P3 tablosu
   arasındaki fark 0,4 puanın altındadır; yine de havuz farkından sapma
   olabilir. Tüm sonuçlar "tahmini"dir.
   ===================================================================== */

var P94_TESTLER = [
  { id: 'gy', ad: 'Genel Yetenek', kisa: 'GY', soru: 60 },
  { id: 'gk', ad: 'Genel Kültür',  kisa: 'GK', soru: 60 }
];

/* P94 ağırlığı — ÖSYM KPSS kılavuzu (resmi): %50 GY + %50 GK.
   Ağırlıklar eşit olduğundan eşdeğer toplam net = GY net + GK net. */
var P94_AGIRLIK = { gy: 0.50, gk: 0.50 };

/* Dayanak: yayınlanmış P3 net–puan noktaları [toplam net, puan].
   Kaynak: rehberpanda.com 2026 KPSS sayfalarındaki net–puan tablosu
   (2025 KPSS istatistikleriyle hazırlanmış): 40 net → 69,87;
   60 net → 77,40; 80 net → 84,93; "80 puan için ≈ 66,9 net".
   P94 havuzu için ayrı yayımlanmış güncel tablo bulunmadığından bu
   dayanak şeffaf yaklaşımla kullanılır (bkz. dürüstlük notu). */
var P94_DAYANAK = [
  [40,   69.87],
  [60,   77.40],
  [66.9, 80.00],
  [80,   84.93]
];
var P94_EGIM_ALT = (77.40 - 69.87) / (60 - 40); /* 0,3765 */
var P94_EGIM_UST = (84.93 - 77.40) / (80 - 60); /* 0,3765 */

function p94Yuvarla(n) {
  return Math.round(n * 100) / 100;
}

/* Net = Doğru − (Yanlış ÷ 4). Negatif net 0'a sabitlenir. */
function netHesapla(dogru, yanlis) {
  var net = dogru - yanlis / 4;
  if (net < 0) net = 0;
  return p94Yuvarla(net);
}

/* Girdi doğrulama. ÖSYM geçerlilik koşulu: her testte en az 1 işaretleme. */
function girdiyiDogrula(dogru, yanlis, test) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': lütfen sayı gir.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': tam sayı gir (örn. 35).' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: test.kisa + ': negatif değer giremezsin.' };
  }
  if (dogru + yanlis > test.soru) {
    return { ok: false, mesaj: test.kisa + ': doğru + yanlış, ' + test.soru + ' soruyu geçemez.' };
  }
  if (dogru + yanlis === 0) {
    return { ok: false, mesaj: test.kisa + ': ÖSYM, her testte en az 1 işaretleme ister. Bu test boş bırakılamaz.' };
  }
  return { ok: true };
}

/* Dayanak noktaları arasında doğrusal içdeğerleme; uçlarda doğrusal dışdeğerleme. */
function p94Enterpole(toplamNet) {
  var d = P94_DAYANAK;
  var p;
  if (toplamNet <= d[0][0]) {
    p = d[0][1] - (d[0][0] - toplamNet) * P94_EGIM_ALT;
  } else if (toplamNet >= d[d.length - 1][0]) {
    var s = d[d.length - 1];
    p = s[1] + (toplamNet - s[0]) * P94_EGIM_UST;
  } else {
    for (var i = 0; i < d.length - 1; i++) {
      if (toplamNet >= d[i][0] && toplamNet <= d[i + 1][0]) {
        var oran = (toplamNet - d[i][0]) / (d[i + 1][0] - d[i][0]);
        p = d[i][1] + oran * (d[i + 1][1] - d[i][1]);
        break;
      }
    }
  }
  if (p > 100) p = 100;
  if (p < 0) p = 0;
  return p94Yuvarla(p);
}

/* P94 tahmini: ağırlıklar eşit olduğundan toplam net doğrudan okunur. */
function puanHesapla(netGY, netGK) {
  return { P94: p94Enterpole(netGY + netGK) };
}

/* Ana hesaplama: [{dogru, yanlis}, {dogru, yanlis}] → tam sonuç. */
function hesapla(girdiler) {
  var netler = [];
  for (var i = 0; i < P94_TESTLER.length; i++) {
    var v = girdiyiDogrula(girdiler[i].dogru, girdiler[i].yanlis, P94_TESTLER[i]);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, testIndex: i };
    netler.push(netHesapla(girdiler[i].dogru, girdiler[i].yanlis));
  }
  var puanlar = puanHesapla(netler[0], netler[1]);
  return {
    ok: true,
    netGY: netler[0],
    netGK: netler[1],
    toplamNet: p94Yuvarla(netler[0] + netler[1]),
    P94: puanlar.P94
  };
}

function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

/* Dışa aktarım: testler (node) + sayfa betiği (tarayıcı). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    P94_TESTLER: P94_TESTLER,
    P94_AGIRLIK: P94_AGIRLIK,
    P94_DAYANAK: P94_DAYANAK,
    netHesapla: netHesapla,
    girdiyiDogrula: girdiyiDogrula,
    p94Enterpole: p94Enterpole,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_kpssOrtaogretim = {
    netHesapla: netHesapla,
    p94Enterpole: p94Enterpole,
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
    var alanlar = ['gy-dogru', 'gy-yanlis', 'gk-dogru', 'gk-yanlis'].map(function (id) {
      return document.getElementById(id);
    });

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      return v === '' ? 0 : Number(v);
    }

    function guncelle() {
      hataKutusu.hidden = true;
      var s = hesapla([
        { dogru: deger('gy-dogru'), yanlis: deger('gy-yanlis') },
        { dogru: deger('gk-dogru'), yanlis: deger('gk-yanlis') }
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
        '<tr><th scope="row">GY Net</th><td>' + trSayi(s.netGY, 2) + '</td></tr>' +
        '<tr><th scope="row">GK Net</th><td>' + trSayi(s.netGK, 2) + '</td></tr>' +
        '<tr><th scope="row">Toplam Net</th><td>' + trSayi(s.toplamNet, 2) + '</td></tr>' +
        '<tr><th scope="row">Tahmini P94</th><td><strong>' + trSayi(s.P94, 2) + '</strong></td></tr>' +
        '</tbody></table>' +
        '<p class="sonuc-alt">P94, ortaöğretim havuzunda ayrı standartlanır; bu tahmin P3 dayanaklı şeffaf yaklaşımdır, havuz farkından sapma olabilir.</p>';
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
        '<p class="sonuc-alt">Değerleri gir, tahmini P94 puanın burada görünsün.</p>';
    });
    guncelle();
  });
}
