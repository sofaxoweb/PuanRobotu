'use strict';
/* =====================================================================
   PuanRobotu — Ehliyet Sınav Puanı Hesaplama motoru
   MEB e-Sınav formatı: 50 soru, her soru 2 puan, toplam 100 puan.
   YANLIŞ DOĞRUYU GÖTÜRMEZ — puan yalnızca doğru sayısına bağlıdır.
   Geçme barajı: 70 puan (35 doğru).
   Ders dağılımı: Trafik ve Çevre 23, İlk Yardım 12, Araç Tekniği 9,
   Trafik Adabı 6.
   ===================================================================== */

var EHLIYET_DERSLER = [
  { id: 'trafik',     ad: 'Trafik ve Çevre', kisa: 'Trafik',       soru: 23 },
  { id: 'ilkyardim',  ad: 'İlk Yardım',      kisa: 'İlk Yardım',    soru: 12 },
  { id: 'aracteknik', ad: 'Araç Tekniği',    kisa: 'Araç Tekniği',  soru: 9 },
  { id: 'adab',       ad: 'Trafik Adabı',    kisa: 'Trafik Adabı',  soru: 6 }
];
var EHLIYET_BARAJ = 70;      /* geçme puanı */
var EHLIYET_SORU_PUAN = 2;   /* her soru 2 puan */

function ehliyetYuvarla(n) {
  return Math.round(n * 10) / 10;
}

/* Girdi doğrulama: tam sayı, 0 ile dersin soru sayısı aralığında. */
function girdiyiDogrula(dogru, ders) {
  if (!Number.isFinite(dogru)) {
    return { ok: false, mesaj: ders.kisa + ': lütfen sayı gir.' };
  }
  if (!Number.isInteger(dogru)) {
    return { ok: false, mesaj: ders.kisa + ': tam sayı gir (örn. 18).' };
  }
  if (dogru < 0 || dogru > ders.soru) {
    return { ok: false, mesaj: ders.kisa + ': 0–' + ders.soru + ' aralığında bir değer gir.' };
  }
  return { ok: true };
}

/* Ana hesaplama: {trafik: n, ilkyardim: n, aracteknik: n, adab: n} → tam sonuç. */
function hesapla(girdiler) {
  var dersSonuc = [];
  var toplam = 0;
  for (var i = 0; i < EHLIYET_DERSLER.length; i++) {
    var ders = EHLIYET_DERSLER[i];
    var v = girdiyiDogrula(girdiler[ders.id], ders);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, dersIndex: i };
    var dogru = girdiler[ders.id];
    toplam += dogru;
    dersSonuc.push({
      ad: ders.ad,
      kisa: ders.kisa,
      dogru: dogru,
      soru: ders.soru,
      puan: dogru * EHLIYET_SORU_PUAN,
      yuzde: ehliyetYuvarla(dogru / ders.soru * 100)
    });
  }
  var puan = toplam * EHLIYET_SORU_PUAN;
  return {
    ok: true,
    toplamDogru: toplam,
    puan: puan,
    gecti: puan >= EHLIYET_BARAJ,
    eksikPuan: puan >= EHLIYET_BARAJ ? 0 : EHLIYET_BARAJ - puan,
    dersler: dersSonuc
  };
}

function trSayi(n) {
  return n.toLocaleString('tr-TR');
}

/* Dışa aktarım: testler (node) + sayfa betiği (tarayıcı). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EHLIYET_DERSLER: EHLIYET_DERSLER,
    EHLIYET_BARAJ: EHLIYET_BARAJ,
    EHLIYET_SORU_PUAN: EHLIYET_SORU_PUAN,
    girdiyiDogrula: girdiyiDogrula,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_ehliyetPuan = {
    EHLIYET_DERSLER: EHLIYET_DERSLER,
    EHLIYET_BARAJ: EHLIYET_BARAJ,
    EHLIYET_SORU_PUAN: EHLIYET_SORU_PUAN,
    girdiyiDogrula: girdiyiDogrula,
    hesapla: hesapla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var ids = ['trafik-dogru', 'ilkyardim-dogru', 'aracteknik-dogru', 'adab-dogru'];
    var hataKutusu = document.getElementById('form-hata');
    var kutu = document.getElementById('sonuc-tablo');

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      return v === '' ? 0 : Number(v);
    }

    function guncelle() {
      hataKutusu.hidden = true;
      var s = hesapla({
        trafik: deger('trafik-dogru'),
        ilkyardim: deger('ilkyardim-dogru'),
        aracteknik: deger('aracteknik-dogru'),
        adab: deger('adab-dogru')
      });
      if (!s.ok) {
        hataKutusu.textContent = s.mesaj;
        hataKutusu.hidden = false;
        kutu.innerHTML = '<p class="sonuc-alt">Değerleri düzeltip tekrar dene.</p>';
        return;
      }
      var rozet = s.gecti
        ? '<span class="rozet rozet-guvenli">GEÇTİ</span>'
        : '<span class="rozet rozet-zorlu">KALDI</span>';
      var html =
        '<table class="sonuc-tablosu"><tbody>' +
        '<tr><th scope="row">Toplam Doğru</th><td>' + trSayi(s.toplamDogru) + ' / 50</td></tr>' +
        '<tr><th scope="row">Sınav Puanı</th><td><strong>' + trSayi(s.puan) + ' / 100</strong></td></tr>' +
        '<tr><th scope="row">Sonuç</th><td>' + rozet + '</td></tr>' +
        '</tbody></table>' +
        '<table class="sonuc-tablosu"><thead><tr><th scope="col">Ders</th><th scope="col">Doğru</th><th scope="col">Başarı</th><th scope="col">Puana Katkı</th></tr></thead><tbody>';
      for (var i = 0; i < s.dersler.length; i++) {
        var d = s.dersler[i];
        html += '<tr><td>' + d.ad + '</td><td>' + d.dogru + ' / ' + d.soru + '</td><td>%' +
          trSayi(d.yuzde) + '</td><td>' + d.puan + ' puan</td></tr>';
      }
      html += '</tbody></table>';
      if (s.gecti) {
        html += '<p class="sonuc-alt">Baraj 70 puandır (35 doğru). Bu sonuçla teorik sınavı geçersin.</p>';
      } else {
        html += '<p class="sonuc-alt">Baraj 70 puandır (35 doğru). Geçmen için ' +
          (EHLIYET_BARAJ - s.puan) / EHLIYET_SORU_PUAN + ' doğru daha yapman gerekir.</p>';
      }
      kutu.innerHTML = html;
    }

    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', guncelle);
    });
    var btn = document.getElementById('btn-hesapla');
    if (btn) btn.addEventListener('click', guncelle);
    var temizle = document.getElementById('btn-temizle');
    if (temizle) temizle.addEventListener('click', function () {
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
      hataKutusu.hidden = true;
      kutu.innerHTML = '<p class="sonuc-alt">Değerleri gir, puanın burada görünsün.</p>';
    });
    guncelle();
  });
}
