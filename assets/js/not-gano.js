'use strict';
/* =====================================================================
   PuanRobotu — GANO / AGNO hesaplama motoru
   GANO = Σ(harf katsayısı × kredi) / Σ(kredi)
   Harf katsayıları (Nevşehir/Erciyes resmî): AA 4,00 … FF 0,00.
   FF dersleri paya 0 ekler ama kredisi paydaya girer.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

var HARF_DEGER = {
  AA: 4.0, BA: 3.5, BB: 3.0, CB: 2.5, CC: 2.0,
  DC: 1.5, DD: 1.0, FD: 0.5, FF: 0.0
};
var HARFLER = Object.keys(HARF_DEGER);

/* dersler: [{ harf: 'BA', kredi: 4 }, ...]
   Döner: { gano, toplamKredi, dersSayisi, yoksayilan } */
function ganoHesapla(dersler) {
  var pay = 0, payda = 0, yoksayilan = 0, sayi = 0;
  (dersler || []).forEach(function (d) {
    var katsayi = HARF_DEGER[d && d.harf];
    var kredi = Number(d && d.kredi);
    if (katsayi === undefined || !Number.isFinite(kredi) || kredi <= 0) {
      yoksayilan++;
      return;
    }
    pay += katsayi * kredi;
    payda += kredi;
    sayi++;
  });
  if (payda === 0) {
    return { gano: null, toplamKredi: 0, dersSayisi: 0, yoksayilan: yoksayilan };
  }
  return { gano: pay / payda, toplamKredi: payda, dersSayisi: sayi, yoksayilan: yoksayilan };
}

var API = {
  HARF_DEGER: HARF_DEGER,
  HARFLER: HARFLER,
  ganoHesapla: ganoHesapla
};

if (typeof window !== 'undefined') { window.PR_gano = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var liste = document.getElementById('ders-listesi');
    var sonucEl = document.getElementById('sonuc-deger');
    var altEl = document.getElementById('sonuc-alt');

    function tr(n) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function satirEkle(harf, kredi) {
      var satir = document.createElement('div');
      satir.className = 'form-satir ders-satir';
      var secim = '<select aria-label="Harf notu">' +
        HARFLER.map(function (h) {
          return '<option value="' + h + '"' + (h === harf ? ' selected' : '') + '>' + h + ' (' + HARF_DEGER[h].toFixed(1).replace('.', ',') + ')</option>';
        }).join('') + '</select>';
      satir.innerHTML =
        '<div class="form-alan"><label>Harf Notu</label>' + secim + '</div>' +
        '<div class="form-alan"><label>Kredi</label><input type="number" min="0.5" max="30" step="0.5" value="' + kredi + '" aria-label="Ders kredisi"></div>' +
        '<div class="form-alan form-alan-dar"><label>&nbsp;</label><button type="button" class="btn btn-ghost btn-kaldir" aria-label="Dersi sil">✕</button></div>';
      liste.appendChild(satir);
      satir.querySelector('select').addEventListener('change', hesapla);
      satir.querySelector('input').addEventListener('input', hesapla);
      satir.querySelector('.btn-kaldir').addEventListener('click', function () {
        if (liste.children.length > 1) { satir.remove(); hesapla(); }
      });
    }

    function hesapla() {
      var dersler = [];
      Array.prototype.forEach.call(liste.children, function (satir) {
        dersler.push({
          harf: satir.querySelector('select').value,
          kredi: satir.querySelector('input').value
        });
      });
      var r = ganoHesapla(dersler);
      if (r.gano === null) {
        sonucEl.textContent = '—';
        altEl.textContent = 'Hesaplamak için en az bir geçerli ders gir.';
        return;
      }
      sonucEl.textContent = tr(r.gano);
      altEl.textContent = r.dersSayisi + ' ders, ' +
        r.toplamKredi.toLocaleString('tr-TR') + ' kredi üzerinden hesaplandı.' +
        (r.yoksayilan > 0 ? ' (' + r.yoksayilan + ' satır yoksayıldı.)' : '');
    }

    document.getElementById('ders-ekle').addEventListener('click', function () {
      satirEkle('CC', 3);
    });

    satirEkle('BA', 4);
    satirEkle('BB', 3);
    satirEkle('FF', 2);
    hesapla();
  });
}
