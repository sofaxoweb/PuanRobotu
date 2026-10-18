'use strict';
/* =====================================================================
   PuanRobotu — MSÜ Puan Hesaplama motoru
   Millî Savunma Üniversitesi Askeri Öğrenci Aday Belirleme Sınavı
   120 soru: Türkçe 40, Temel Matematik 40, Fen 20, Sosyal 20.
   Net = D − Y/4. OBP eklenmez. Ölçek 100–500 (tahmini).
   Ağırlıklar: MEB Baykan dokümanı (resmi tablo). GN ağırlıklarında
   kaynak çelişkisi var (37/37/13/13 kullanıldı) — sayfada dipnot var.
   Kaynak: _template/research/r_yks.md
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

var TESTLER = [
  { id: 'tr',  ad: 'Türkçe',          kisa: 'Türkçe',  soru: 40 },
  { id: 'mat', ad: 'Temel Matematik',  kisa: 'Tem. Mat.', soru: 40 },
  { id: 'fen', ad: 'Fen Bilimleri',    kisa: 'Fen',     soru: 20 },
  { id: 'sos', ad: 'Sosyal Bilimler',  kisa: 'Sosyal',  soru: 20 }
];

/* Net = Doğru − (Yanlış ÷ 4). Negatif netler 0'a sabitlenir. */
function netHesapla(dogru, yanlis) {
  var net = dogru - yanlis / 4;
  return net < 0 ? 0 : net;
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
    return { ok: false, mesaj: testAd + ': tam sayı gir (örn. 28).' };
  }
  if (dogru + yanlis > soruSayisi) {
    return { ok: false, mesaj: testAd + ': doğru + yanlış, ' + soruSayisi + ' soruyu geçemez.' };
  }
  return { ok: true };
}

/* Puan türü tahminleri (katsayı = 400 × ağırlık% ÷ soru sayısı) */
function saHam(net)  { return 100 + net.tr * 2.5 + net.mat * 3.5 + net.fen * 6.0 + net.sos * 2.0; }
function eaHam(net)  { return 100 + net.tr * 3.5 + net.mat * 3.5 + net.fen * 2.0 + net.sos * 4.0; }
function sozHam(net) { return 100 + net.tr * 3.5 + net.mat * 2.0 + net.fen * 2.0 + net.sos * 7.0; }
function gnHam(net)  { return 100 + net.tr * 3.7 + net.mat * 3.7 + net.fen * 2.6 + net.sos * 2.6; }

/* Geçerlilik: Temel Matematik VEYA Türkçe'den ≥ 0,5 ham puan. */
function gecerliMi(net) {
  return net.tr >= 0.5 || net.mat >= 0.5;
}

/* Ana hesaplama. Girdi: {nets: {tr, mat, fen, sos}}. */
function hesapla(girdi) {
  var net = girdi.nets || {};
  for (var i = 0; i < TESTLER.length; i++) {
    var t = TESTLER[i];
    var n = net[t.id];
    if (!Number.isFinite(n) || n < 0) {
      return { ok: false, mesaj: t.kisa + ': net değeri geçersiz.' };
    }
    if (n > t.soru) {
      return { ok: false, mesaj: t.kisa + ': net, soru sayısını (' + t.soru + ') geçemez.' };
    }
  }
  return {
    ok: true,
    gecerli: gecerliMi(net),
    sa: saHam(net),
    ea: eaHam(net),
    soz: sozHam(net),
    gn: gnHam(net)
  };
}

/* Türkçe sayı biçimi */
function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

var DISA_AKTAR = {
  TESTLER: TESTLER,
  netHesapla: netHesapla,
  girdiyiDogrula: girdiyiDogrula,
  saHam: saHam,
  eaHam: eaHam,
  sozHam: sozHam,
  gnHam: gnHam,
  gecerliMi: gecerliMi,
  hesapla: hesapla,
  trSayi: trSayi
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DISA_AKTAR;
} else if (typeof window !== 'undefined') {
  window.PR_msu = DISA_AKTAR;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var tbody = document.getElementById('test-satirlari');
    var hataKutusu = document.getElementById('form-hata');

    TESTLER.forEach(function (t) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="ders-ad">' + t.kisa +
        '<small>' + t.soru + ' soru</small></span></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + t.soru + '" step="1" ' +
        'id="dogru-' + t.id + '" aria-label="' + t.ad + ' doğru sayısı" placeholder="0"></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + t.soru + '" step="1" ' +
        'id="yanlis-' + t.id + '" aria-label="' + t.ad + ' yanlış sayısı" placeholder="0"></td>' +
        '<td><span class="hesaplanan" id="bos-' + t.id + '">–</span></td>' +
        '<td><span class="hesaplanan" id="net-' + t.id + '">–</span></td>';
      tbody.appendChild(tr);
    });

    var girdiler = Array.prototype.slice.call(tbody.querySelectorAll('input'));

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      if (v === '') return 0;
      return Number(v);
    }

    function guncelle() {
      hataKutusu.hidden = true;
      hataKutusu.textContent = '';
      var nets = {};
      for (var i = 0; i < TESTLER.length; i++) {
        var t = TESTLER[i];
        var d = deger('dogru-' + t.id), y = deger('yanlis-' + t.id);
        var v = girdiyiDogrula(d, y, t.soru, t.kisa);
        if (!v.ok) {
          hataKutusu.textContent = v.mesaj;
          hataKutusu.hidden = false;
          return null;
        }
        nets[t.id] = netHesapla(d, y);
        document.getElementById('bos-' + t.id).textContent = t.soru - d - y;
        document.getElementById('net-' + t.id).textContent = trSayi(nets[t.id], 2);
      }
      var s = hesapla({ nets: nets });
      document.getElementById('r-sa').textContent = trSayi(s.sa, 1);
      document.getElementById('r-ea').textContent = trSayi(s.ea, 1);
      document.getElementById('r-soz').textContent = trSayi(s.soz, 1);
      document.getElementById('r-gn').textContent = trSayi(s.gn, 1);
      document.getElementById('gecerlilik-uyari').hidden = s.gecerli;
      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;
      return s;
    }

    girdiler.forEach(function (g) {
      g.addEventListener('input', guncelle);
    });
    document.getElementById('btn-hesapla').addEventListener('click', function () {
      if (guncelle()) {
        document.querySelector('.sonuc-paneli').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    document.getElementById('btn-temizle').addEventListener('click', function () {
      girdiler.forEach(function (g) { g.value = ''; });
      hataKutusu.hidden = true;
      TESTLER.forEach(function (t) {
        document.getElementById('bos-' + t.id).textContent = '–';
        document.getElementById('net-' + t.id).textContent = '–';
      });
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });
  });
}
