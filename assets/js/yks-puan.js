'use strict';
/* =====================================================================
   PuanRobotu — YKS Puan Hesaplama motoru (TYT + AYT + YDT)
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   Formüller: _template/research/r_yks.md (MEB katsayı tabloları).
   ÖSYM gerçek puanı sınav-sonrası istatistikle hesapladığı için
   TÜM çıktılar TAHMİNİDİR.
   Saf matematik fonksiyonları en üstte ve test edilebilirdir.
   ===================================================================== */

/* ---------- Test tanımları ---------- */
var TYT_TESTLER = [
  { id: 'tr',   ad: 'Türkçe',           kisa: 'Türkçe',    soru: 40 },
  { id: 'sos',  ad: 'Sosyal Bilimler',  kisa: 'Sosyal',    soru: 20 },
  { id: 'tmat', ad: 'Temel Matematik',  kisa: 'Tem. Mat.', soru: 40 },
  { id: 'fen',  ad: 'Fen Bilimleri',    kisa: 'Fen',       soru: 20 }
];

var AYT_TESTLER = [
  { id: 'amat', ad: 'Matematik',                 kisa: 'Matematik',  soru: 40 },
  { id: 'fiz',  ad: 'Fizik',                     kisa: 'Fizik',      soru: 14 },
  { id: 'kim',  ad: 'Kimya',                     kisa: 'Kimya',      soru: 13 },
  { id: 'biy',  ad: 'Biyoloji',                  kisa: 'Biyoloji',   soru: 13 },
  { id: 'ede',  ad: 'Türk Dili ve Edebiyatı',    kisa: 'Edebiyat',   soru: 24 },
  { id: 'tar1', ad: 'Tarih-1',                   kisa: 'Tarih-1',    soru: 10 },
  { id: 'cog1', ad: 'Coğrafya-1',                kisa: 'Coğrafya-1', soru: 6 },
  { id: 'tar2', ad: 'Tarih-2',                   kisa: 'Tarih-2',    soru: 11 },
  { id: 'cog2', ad: 'Coğrafya-2',                kisa: 'Coğrafya-2', soru: 11 },
  { id: 'fel',  ad: 'Felsefe Grubu',             kisa: 'Felsefe',    soru: 12 },
  { id: 'din',  ad: 'Din Kültürü ve Ahlak Bilgisi', kisa: 'Din',     soru: 6 }
];

var YDT_TEST = { id: 'ydt', ad: 'YDT (Yabancı Dil)', kisa: 'YDT', soru: 80 };

var TUM_TESTLER = TYT_TESTLER.concat(AYT_TESTLER, [YDT_TEST]);

/* ---------- Saf fonksiyonlar ---------- */

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
    return { ok: false, mesaj: testAd + ': tam sayı gir (örn. 30).' };
  }
  if (dogru + yanlis > soruSayisi) {
    return { ok: false, mesaj: testAd + ': doğru + yanlış, ' + soruSayisi + ' soruyu geçemez.' };
  }
  return { ok: true };
}

/* TYT'nin tüm puan türlerindeki ortak parçası (Tablo-1A katsayıları). */
function tytParca(net) {
  return net.tr * 1.32 + net.sos * 1.36 + net.tmat * 1.32 + net.fen * 1.36;
}

/* TYT ham (sınav) puanı tahmini: 100 + TR×3.3 + SOS×3.4 + TMat×3.3 + Fen×3.4 */
function tytHam(net) {
  return 100 + net.tr * 3.3 + net.sos * 3.4 + net.tmat * 3.3 + net.fen * 3.4;
}

/* SAY ham tahmini: 100 + TYT parçası + Mat×3 + Fiz×2.85 + Kim×3.07 + Biy×3.07 */
function sayHam(net) {
  return 100 + tytParca(net) + net.amat * 3 + net.fiz * 2.85 + net.kim * 3.07 + net.biy * 3.07;
}

/* EA ham tahmini: 100 + TYT parçası + Mat×3 + Ede×3 + Tar1×2.8 + Coğ1×3.33 */
function eaHam(net) {
  return 100 + tytParca(net) + net.amat * 3 + net.ede * 3 + net.tar1 * 2.8 + net.cog1 * 3.33;
}

/* SÖZ ham tahmini: 100 + TYT parçası + Ede×3 + Tar1×2.8 + Coğ1×3.33
   + Tar2×2.91 + Coğ2×2.91 + Fel×3 + Din×3.33 */
function sozHam(net) {
  return 100 + tytParca(net) + net.ede * 3 + net.tar1 * 2.8 + net.cog1 * 3.33 +
         net.tar2 * 2.91 + net.cog2 * 2.91 + net.fel * 3 + net.din * 3.33;
}

/* DİL ham tahmini: 100 + TYT parçası + YDT×3 */
function dilHam(net) {
  return 100 + tytParca(net) + net.ydt * 3;
}

/* Yerleştirme puanı: ham + OBP×0.12 (kırık OBP'de ×0.06). */
function yerlestirmePuan(ham, obp, kirik) {
  return ham + obp * (kirik ? 0.06 : 0.12);
}

/* TYT geçerlilik kuralı: Türkçe VEYA Temel Matematik'ten ≥ 0,5 ham puan. */
function tytGecerliMi(net) {
  return net.tr >= 0.5 || net.tmat >= 0.5;
}

/* Ana hesaplama.
   Girdi: { nets: {tr, sos, tmat, fen, amat, fiz, kim, biy, ede, tar1, cog1,
                    tar2, cog2, fel, din, ydt}, obp (0-500), kirik (bool) }
   Döndürür: her puan türü için {ham, yer} + tytGecerli bayrağı. */
function hesapla(girdi) {
  var net = girdi.nets || {};
  var obp = Number(girdi.obp) || 0;
  var kirik = !!girdi.kirik;
  for (var i = 0; i < TUM_TESTLER.length; i++) {
    var t = TUM_TESTLER[i];
    var n = net[t.id];
    if (!Number.isFinite(n) || n < 0) {
      return { ok: false, mesaj: t.kisa + ': net değeri geçersiz.' };
    }
    if (n > t.soru) {
      return { ok: false, mesaj: t.kisa + ': net, soru sayısını (' + t.soru + ') geçemez.' };
    }
  }
  if (obp < 0 || obp > 500) {
    return { ok: false, mesaj: 'OBP 0–500 aralığında olmalı.' };
  }
  var gecerli = tytGecerliMi(net);
  function paket(hamFn) {
    var ham = hamFn(net);
    return { ham: ham, yer: yerlestirmePuan(ham, obp, kirik) };
  }
  return {
    ok: true,
    tytGecerli: gecerli,
    tytParca: tytParca(net),
    tyt: paket(tytHam),
    say: paket(sayHam),
    ea: paket(eaHam),
    soz: paket(sozHam),
    dil: paket(dilHam),
    obp: obp,
    kirik: kirik
  };
}

/* Türkçe sayı biçimi: 105,20 */
function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

/* Dışa aktarım: tarayıcıda window.PR_ykspuan, node testinde module.exports */
var DISA_AKTAR = {
  TYT_TESTLER: TYT_TESTLER,
  AYT_TESTLER: AYT_TESTLER,
  YDT_TEST: YDT_TEST,
  netHesapla: netHesapla,
  girdiyiDogrula: girdiyiDogrula,
  tytParca: tytParca,
  tytHam: tytHam,
  sayHam: sayHam,
  eaHam: eaHam,
  sozHam: sozHam,
  dilHam: dilHam,
  yerlestirmePuan: yerlestirmePuan,
  tytGecerliMi: tytGecerliMi,
  hesapla: hesapla,
  trSayi: trSayi
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DISA_AKTAR;
} else if (typeof window !== 'undefined') {
  window.PR_ykspuan = DISA_AKTAR;
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var tbody = document.getElementById('test-satirlari');
    var hataKutusu = document.getElementById('form-hata');

    function grupSatiri(baslik) {
      var tr = document.createElement('tr');
      tr.className = 'grup-satiri';
      var td = document.createElement('td');
      td.colSpan = 5;
      td.textContent = baslik;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    function testSatiri(test) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="ders-ad">' + test.kisa +
        '<small>' + test.soru + ' soru</small></span></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + test.soru + '" step="1" ' +
        'id="dogru-' + test.id + '" aria-label="' + test.ad + ' doğru sayısı" placeholder="0"></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + test.soru + '" step="1" ' +
        'id="yanlis-' + test.id + '" aria-label="' + test.ad + ' yanlış sayısı" placeholder="0"></td>' +
        '<td><span class="hesaplanan" id="bos-' + test.id + '">–</span></td>' +
        '<td><span class="hesaplanan" id="net-' + test.id + '">–</span></td>';
      tbody.appendChild(tr);
    }

    grupSatiri('TYT — Temel Yeterlilik Testi');
    TYT_TESTLER.forEach(testSatiri);
    grupSatiri('AYT — Alan Yeterlilik Testleri');
    AYT_TESTLER.forEach(testSatiri);
    grupSatiri('YDT — Yabancı Dil Testi');
    testSatiri(YDT_TEST);

    var girdiler = Array.prototype.slice.call(tbody.querySelectorAll('input'));

    function deger(id) {
      var el = document.getElementById(id);
      var v = el.value.trim();
      if (v === '') return 0;
      return Number(v);
    }

    function okuDY() {
      return TUM_TESTLER.map(function (t) {
        return { id: t.id, dogru: deger('dogru-' + t.id), yanlis: deger('yanlis-' + t.id) };
      });
    }

    function hatayiGoster(mesaj) {
      hataKutusu.textContent = mesaj;
      hataKutusu.hidden = false;
    }
    function hatayiTemizle() {
      hataKutusu.hidden = true;
      hataKutusu.textContent = '';
    }

    function guncelle() {
      hatayiTemizle();
      var dy = okuDY();
      var nets = {};
      for (var i = 0; i < TUM_TESTLER.length; i++) {
        var t = TUM_TESTLER[i];
        var v = girdiyiDogrula(dy[i].dogru, dy[i].yanlis, t.soru, t.kisa);
        if (!v.ok) {
          hatayiGoster(v.mesaj);
          return null;
        }
        nets[t.id] = netHesapla(dy[i].dogru, dy[i].yanlis);
        document.getElementById('bos-' + t.id).textContent = t.soru - dy[i].dogru - dy[i].yanlis;
        document.getElementById('net-' + t.id).textContent = trSayi(nets[t.id], 2);
      }
      var diploma = deger('diploma-notu');
      var obp = 0;
      if (diploma > 0) {
        if (diploma < 50 || diploma > 100) {
          hatayiGoster('Diploma notu 50–100 aralığında olmalı.');
          return null;
        }
        obp = diploma * 5;
      }
      var kirik = document.getElementById('kirik-obp').checked;
      var s = hesapla({ nets: nets, obp: obp, kirik: kirik });
      if (!s.ok) { hatayiGoster(s.mesaj); return null; }

      function satir(ham, yer) {
        return '<strong>' + trSayi(ham, 2) + '</strong><span>Yerleştirme: ' + trSayi(yer, 1) + '</span>';
      }
      document.getElementById('r-tyt').innerHTML = satir(s.tyt.ham, s.tyt.yer);
      document.getElementById('r-say').innerHTML = satir(s.say.ham, s.say.yer);
      document.getElementById('r-ea').innerHTML = satir(s.ea.ham, s.ea.yer);
      document.getElementById('r-soz').innerHTML = satir(s.soz.ham, s.soz.yer);
      document.getElementById('r-dil').innerHTML = satir(s.dil.ham, s.dil.yer);
      document.getElementById('r-obp').textContent = obp > 0
        ? trSayi(obp, 1) + ' (katkı: +' + trSayi(obp * (kirik ? 0.06 : 0.12), 1) + ')'
        : '— (diploma notu girilmedi)';
      document.getElementById('gecerlilik-uyari').hidden = s.tytGecerli;
      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;
      return s;
    }

    var sonHesap = null;
    girdiler.forEach(function (g) {
      g.addEventListener('input', function () { sonHesap = guncelle(); });
    });
    document.getElementById('diploma-notu').addEventListener('input', function () { sonHesap = guncelle(); });
    document.getElementById('kirik-obp').addEventListener('change', function () { sonHesap = guncelle(); });
    document.getElementById('btn-hesapla').addEventListener('click', function () {
      sonHesap = guncelle();
      if (sonHesap) {
        document.querySelector('.sonuc-paneli').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    document.getElementById('btn-temizle').addEventListener('click', function () {
      girdiler.forEach(function (g) { g.value = ''; });
      document.getElementById('diploma-notu').value = '';
      document.getElementById('kirik-obp').checked = false;
      sonHesap = null;
      hatayiTemizle();
      TUM_TESTLER.forEach(function (t) {
        document.getElementById('bos-' + t.id).textContent = '–';
        document.getElementById('net-' + t.id).textContent = '–';
      });
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });
  });
}
