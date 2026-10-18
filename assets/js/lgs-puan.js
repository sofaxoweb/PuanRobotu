'use strict';
/* =====================================================================
   PuanRobotu — LGS Puan Hesaplama motoru
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   Saf matematik fonksiyonları en üstte ve test edilebilirdir.
   ===================================================================== */

/* ---------- Sabitler ---------- */
var DERSLER = [
  { id: 'turkce',   ad: 'Türkçe',                              kisa: 'Türkçe',    soru: 20, katsayi: 4 },
  { id: 'matematik', ad: 'Matematik',                           kisa: 'Matematik', soru: 20, katsayi: 4 },
  { id: 'fen',      ad: 'Fen Bilimleri',                       kisa: 'Fen',       soru: 20, katsayi: 4 },
  { id: 'inkilap',  ad: 'T.C. İnkılap Tarihi ve Atatürkçülük',  kisa: 'İnkılap',   soru: 10, katsayi: 1 },
  { id: 'din',      ad: 'Din Kültürü ve Ahlak Bilgisi',        kisa: 'Din',       soru: 10, katsayi: 1 },
  { id: 'yabanci',  ad: 'Yabancı Dil (İngilizce)',             kisa: 'İngilizce', soru: 10, katsayi: 1 }
];

var MAKS_AGIRLIKLI = 270; /* (20+20+20)*4 + (10+10+10)*1 */

/* Geçmiş yıl puan-dilim tablolarından türetilmiş dayanak noktaları.
   [puan, yüzdelik dilim]. TÜMÜ TAHMİNİDİR. */
var DILIM_DAYANAKLARI = [
  [500, 0.05], [486, 0.5], [478, 1], [466, 2], [456, 3], [447, 4],
  [439, 5], [424, 7], [404, 10], [375, 15], [349, 20], [320, 30],
  [300, 40], [280, 50], [255, 60], [230, 70], [200, 80],
  [170, 88], [140, 94], [100, 100]
];

/* ---------- Saf fonksiyonlar ---------- */

/* Net = Doğru − (Yanlış ÷ 3). Negatif netler 0'a sabitlenir. */
function netHesapla(dogru, yanlis) {
  var net = dogru - yanlis / 3;
  return net < 0 ? 0 : net;
}

/* Girdi doğrulama. Hata mesajı Türkçe döner. */
function girdiyiDogrula(dogru, yanlis, soruSayisi, dersAd) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: dersAd + ': lütfen sayı girin.' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: dersAd + ': negatif değer giremezsin.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: dersAd + ': tam sayı gir (örn. 15).' };
  }
  if (dogru + yanlis > soruSayisi) {
    return { ok: false, mesaj: dersAd + ': doğru + yanlış, ' + soruSayisi + ' soruyu geçemez.' };
  }
  return { ok: true };
}

/* Ağırlıklı toplam: Σ (net × katsayı). En fazla 270. */
function agirlikliToplam(netler) {
  var toplam = 0;
  for (var i = 0; i < DERSLER.length; i++) {
    toplam += netler[i] * DERSLER[i].katsayi;
  }
  return toplam;
}

/* Tahmini puan: 100 + 400 × (ağırlıklı ÷ 270). MEB'in 100–500 ölçeğine
   ve geçmiş yıl net-puan tablolarına kalibre edilmiştir. */
function tahminiPuan(agirlikli) {
  var p = 100 + 400 * (agirlikli / MAKS_AGIRLIKLI);
  if (p > 500) p = 500;
  if (p < 100) p = 100;
  return Math.round(p);
}

/* Dayanak noktaları arasında doğrusal içdeğerleme ile dilim tahmini. */
function dilimEnterpole(puan) {
  var d = DILIM_DAYANAKLARI;
  if (puan >= d[0][0]) return d[0][1];
  for (var i = 0; i < d.length - 1; i++) {
    var p1 = d[i][0], v1 = d[i][1], p2 = d[i + 1][0], v2 = d[i + 1][1];
    if (puan <= p1 && puan >= p2) {
      var oran = (p1 - puan) / (p1 - p2);
      return v1 + oran * (v2 - v1);
    }
  }
  return d[d.length - 1][1];
}

/* Puan ± bant ile dilim aralığı. */
function dilimAraligi(puan) {
  var alt = dilimEnterpole(Math.min(500, puan + 10));
  var ust = dilimEnterpole(Math.max(100, puan - 10));
  return { alt: alt, ust: ust };
}

/* Kaba okul türü hedefi. İl ve okula göre değişir — yol göstericidir. */
function kabaHedef(puan) {
  if (puan >= 475) return 'Fen Lisesi (en seçici okullar)';
  if (puan >= 450) return 'Fen Lisesi / Sosyal Bilimler Lisesi';
  if (puan >= 420) return 'Nitelikli Anadolu Lisesi';
  if (puan >= 380) return 'Anadolu Lisesi (üst düzey)';
  if (puan >= 340) return 'Anadolu Lisesi';
  if (puan >= 300) return 'Anadolu Lisesi / Anadolu İmam Hatip';
  if (puan >= 250) return 'Mesleki ve Teknik Anadolu Lisesi';
  return 'Adrese dayalı yerleştirme seçenekleri';
}

/* Ana hesaplama: {dogru, yanlis} dizisinden tam sonuç. */
function hesapla(girdiler) {
  var netler = [], boslar = [], toplamNet = 0;
  for (var i = 0; i < DERSLER.length; i++) {
    var v = girdiyiDogrula(girdiler[i].dogru, girdiler[i].yanlis, DERSLER[i].soru, DERSLER[i].kisa);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, dersIndex: i };
    var net = netHesapla(girdiler[i].dogru, girdiler[i].yanlis);
    netler.push(net);
    boslar.push(DERSLER[i].soru - girdiler[i].dogru - girdiler[i].yanlis);
    toplamNet += net;
  }
  var agirlikli = agirlikliToplam(netler);
  var puan = tahminiPuan(agirlikli);
  var dilim = dilimAraligi(puan);
  return {
    ok: true,
    netler: netler,
    boslar: boslar,
    toplamNet: toplamNet,
    agirlikli: agirlikli,
    puan: puan,
    dilimAlt: dilim.alt,
    dilimUst: dilim.ust,
    hedef: kabaHedef(puan)
  };
}

/* Türkçe sayı biçimi: 15,33 */
function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

/* Node.js testi için dışa aktarım (tarayıcıda etkisizdir). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DERSLER: DERSLER,
    netHesapla: netHesapla,
    girdiyiDogrula: girdiyiDogrula,
    agirlikliToplam: agirlikliToplam,
    tahminiPuan: tahminiPuan,
    dilimEnterpole: dilimEnterpole,
    dilimAraligi: dilimAraligi,
    kabaHedef: kabaHedef,
    hesapla: hesapla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var tbody = document.getElementById('ders-satirlari');
    var hataKutusu = document.getElementById('form-hata');

    /* Satırları üret */
    DERSLER.forEach(function (ders) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="ders-ad">' + ders.kisa +
        '<small>' + ders.soru + ' soru · ×' + ders.katsayi + '</small></span></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + ders.soru + '" step="1" ' +
        'id="dogru-' + ders.id + '" aria-label="' + ders.ad + ' doğru sayısı" placeholder="0"></td>' +
        '<td><input type="number" inputmode="numeric" min="0" max="' + ders.soru + '" step="1" ' +
        'id="yanlis-' + ders.id + '" aria-label="' + ders.ad + ' yanlış sayısı" placeholder="0"></td>' +
        '<td><span class="hesaplanan" id="bos-' + ders.id + '">–</span></td>' +
        '<td><span class="hesaplanan" id="net-' + ders.id + '">–</span></td>';
      tbody.appendChild(tr);
    });

    var girdiler = Array.prototype.slice.call(
      tbody.querySelectorAll('input')
    );

    function deger(id) {
      var el = document.getElementById(id);
      var v = el.value.trim();
      if (v === '') return 0;
      return Number(v);
    }

    function oku() {
      return DERSLER.map(function (ders) {
        return {
          dogru: deger('dogru-' + ders.id),
          yanlis: deger('yanlis-' + ders.id)
        };
      });
    }

    function hatayiGoster(mesaj, dersIndex) {
      hataKutusu.textContent = mesaj;
      hataKutusu.hidden = false;
      girdiler.forEach(function (g) { g.classList.remove('input-hata'); });
      if (typeof dersIndex === 'number') {
        var ders = DERSLER[dersIndex];
        document.getElementById('dogru-' + ders.id).classList.add('input-hata');
        document.getElementById('yanlis-' + ders.id).classList.add('input-hata');
        document.getElementById('dogru-' + ders.id).focus();
      }
    }

    function hatayiTemizle() {
      hataKutusu.hidden = true;
      hataKutusu.textContent = '';
      girdiler.forEach(function (g) { g.classList.remove('input-hata'); });
    }

    function guncelle() {
      hatayiTemizle();
      var sonuc = hesapla(oku());
      if (!sonuc.ok) {
        hatayiGoster(sonuc.mesaj, sonuc.dersIndex);
        document.getElementById('sonuc-bos').hidden = false;
        document.getElementById('sonuc-dolu').hidden = true;
        DERSLER.forEach(function (ders) {
          document.getElementById('bos-' + ders.id).textContent = '–';
          document.getElementById('net-' + ders.id).textContent = '–';
        });
        return null;
      }
      DERSLER.forEach(function (ders, i) {
        document.getElementById('bos-' + ders.id).textContent = sonuc.boslar[i];
        document.getElementById('net-' + ders.id).textContent = trSayi(sonuc.netler[i], 2);
      });
      document.getElementById('s-net').textContent = trSayi(sonuc.toplamNet, 2);
      document.getElementById('s-puan').textContent = sonuc.puan;
      document.getElementById('s-dilim').textContent =
        '%' + trSayi(sonuc.dilimAlt, 1) + ' – %' + trSayi(sonuc.dilimUst, 1);
      document.getElementById('s-okul').textContent = sonuc.hedef;
      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;
      return sonuc;
    }

    var sonHesap = null;
    function hesaplaTikla() {
      sonHesap = guncelle();
      if (sonHesap) {
        document.querySelector('.sonuc-paneli').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    girdiler.forEach(function (g) {
      g.addEventListener('input', function () { sonHesap = guncelle(); });
    });
    document.getElementById('btn-hesapla').addEventListener('click', hesaplaTikla);
    document.getElementById('btn-temizle').addEventListener('click', function () {
      girdiler.forEach(function (g) { g.value = ''; });
      sonHesap = null;
      hatayiTemizle();
      DERSLER.forEach(function (ders) {
        document.getElementById('bos-' + ders.id).textContent = '–';
        document.getElementById('net-' + ders.id).textContent = '–';
      });
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });

    function sonucMetni(s) {
      return 'LGS Tahminim: Net ' + trSayi(s.toplamNet, 2) +
        ' | Puan ' + s.puan +
        ' | Dilim %' + trSayi(s.dilimAlt, 1) + '–%' + trSayi(s.dilimUst, 1) +
        ' (PuanRobotu)';
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
