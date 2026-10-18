'use strict';
/* =====================================================================
   PuanRobotu — OBP Hesaplama motoru
   OBP = Diploma Notu (50–100) × 5  →  250–500
   Yerleştirme katkısı: ×0.12 (normal) veya ×0.06 (kırık OBP)
   Kaynak: _template/research/r_yks.md
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

/* OBP = diploma notu × 5. Diploma 50–100 aralığında olmalı. */
function obpHesapla(diploma) {
  return diploma * 5;
}

/* Yerleştirme katkısı. Kırık OBP'de katsayı yarıya iner (0.06). */
function katkiHesapla(obp, kirik) {
  return obp * (kirik ? 0.06 : 0.12);
}

/* Ana hesaplama: diploma + kırık bayrağından tam sonuç. */
function hesapla(diploma, kirik) {
  if (!Number.isFinite(diploma)) {
    return { ok: false, mesaj: 'Lütfen diploma notunu sayı olarak girin.' };
  }
  if (diploma < 50 || diploma > 100) {
    return { ok: false, mesaj: 'Diploma notu 50–100 aralığında olmalı.' };
  }
  var obp = obpHesapla(diploma);
  return {
    ok: true,
    diploma: diploma,
    obp: obp,
    kirik: !!kirik,
    katki: katkiHesapla(obp, !!kirik)
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
  obpHesapla: obpHesapla,
  katkiHesapla: katkiHesapla,
  hesapla: hesapla,
  trSayi: trSayi
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DISA_AKTAR;
} else if (typeof window !== 'undefined') {
  window.PR_obp = DISA_AKTAR;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var diplomaEl = document.getElementById('diploma-notu');
    var kirikEl = document.getElementById('kirik-obp');
    var hataKutusu = document.getElementById('form-hata');

    function guncelle() {
      hataKutusu.hidden = true;
      hataKutusu.textContent = '';
      var v = diplomaEl.value.trim();
      if (v === '') {
        document.getElementById('sonuc-bos').hidden = false;
        document.getElementById('sonuc-dolu').hidden = true;
        return null;
      }
      var s = hesapla(Number(v), kirikEl.checked);
      if (!s.ok) {
        hataKutusu.textContent = s.mesaj;
        hataKutusu.hidden = false;
        document.getElementById('sonuc-bos').hidden = false;
        document.getElementById('sonuc-dolu').hidden = true;
        return null;
      }
      document.getElementById('r-obp').textContent = trSayi(s.obp, 1);
      document.getElementById('r-katki').textContent = '+' + trSayi(s.katki, 1) + ' puan';
      document.getElementById('r-durum').textContent = s.kirik
        ? 'Kırık OBP (×0,06) — geçen yıl bir programa yerleştiğin için katsayı yarıya indi.'
        : 'Normal OBP (×0,12)';
      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;
      return s;
    }

    diplomaEl.addEventListener('input', guncelle);
    kirikEl.addEventListener('change', guncelle);
    document.getElementById('btn-hesapla').addEventListener('click', function () {
      if (guncelle()) {
        document.querySelector('.sonuc-paneli').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    document.getElementById('btn-temizle').addEventListener('click', function () {
      diplomaEl.value = '';
      kirikEl.checked = false;
      hataKutusu.hidden = true;
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });
  });
}
