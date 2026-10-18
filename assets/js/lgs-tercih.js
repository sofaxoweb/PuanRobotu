'use strict';
/* =====================================================================
   PuanRobotu — LGS Tercih Robotu
   Puan/dilim + il → uygun lise listesi. Veri: data/{slug}.json
   ===================================================================== */

var SEHIRLER = [
  ['adana','Adana'],['adiyaman','Adıyaman'],['afyonkarahisar','Afyonkarahisar'],
  ['agri','Ağrı'],['aksaray','Aksaray'],['amasya','Amasya'],['ankara','Ankara'],
  ['antalya','Antalya'],['ardahan','Ardahan'],['artvin','Artvin'],['aydin','Aydın'],
  ['balikesir','Balıkesir'],['bartin','Bartın'],['batman','Batman'],['bayburt','Bayburt'],
  ['bilecik','Bilecik'],['bingol','Bingöl'],['bitlis','Bitlis'],['bolu','Bolu'],
  ['burdur','Burdur'],['bursa','Bursa'],['canakkale','Çanakkale'],['cankiri','Çankırı'],
  ['corum','Çorum'],['denizli','Denizli'],['diyarbakir','Diyarbakır'],['duzce','Düzce'],
  ['edirne','Edirne'],['elazig','Elazığ'],['erzincan','Erzincan'],['erzurum','Erzurum'],
  ['eskisehir','Eskişehir'],['gaziantep','Gaziantep'],['giresun','Giresun'],
  ['gumushane','Gümüşhane'],['hakkari','Hakkari'],['hatay','Hatay'],['igdir','Iğdır'],
  ['isparta','Isparta'],['istanbul','İstanbul'],['izmir','İzmir'],
  ['kahramanmaras','Kahramanmaraş'],['karabuk','Karabük'],['karaman','Karaman'],
  ['kars','Kars'],['kastamonu','Kastamonu'],['kayseri','Kayseri'],
  ['kirikkale','Kırıkkale'],['kirklareli','Kırklareli'],['kirsehir','Kırşehir'],
  ['kilis','Kilis'],['kocaeli','Kocaeli'],['konya','Konya'],['kutahya','Kütahya'],
  ['malatya','Malatya'],['manisa','Manisa'],['mardin','Mardin'],['mersin','Mersin'],
  ['mugla','Muğla'],['mus','Muş'],['nevsehir','Nevşehir'],['nigde','Niğde'],
  ['ordu','Ordu'],['osmaniye','Osmaniye'],['rize','Rize'],['sakarya','Sakarya'],
  ['samsun','Samsun'],['sanliurfa','Şanlıurfa'],['siirt','Siirt'],['sinop','Sinop'],
  ['sivas','Sivas'],['sirnak','Şırnak'],['tekirdag','Tekirdağ'],['tokat','Tokat'],
  ['trabzon','Trabzon'],['tunceli','Tunceli'],['usak','Uşak'],['van','Van'],
  ['yalova','Yalova'],['yozgat','Yozgat'],['zonguldak','Zonguldak']
];

/* Puan → dilim dayanak noktaları (script.js ile aynı, tahminidir) */
var DILIM_DAYANAKLARI = [
  [500, 0.05], [486, 0.5], [478, 1], [466, 2], [456, 3], [447, 4],
  [439, 5], [424, 7], [404, 10], [375, 15], [349, 20], [320, 30],
  [300, 40], [280, 50], [255, 60], [230, 70], [200, 80],
  [170, 88], [140, 94], [100, 100]
];

function dilimEnterpole(puan) {
  var d = DILIM_DAYANAKLARI;
  if (puan >= d[0][0]) return d[0][1];
  for (var i = 0; i < d.length - 1; i++) {
    var p1 = d[i][0], v1 = d[i][1], p2 = d[i + 1][0], v2 = d[i + 1][1];
    if (puan <= p1 && puan >= p2) {
      return v1 + ((p1 - puan) / (p1 - p2)) * (v2 - v1);
    }
  }
  return d[d.length - 1][1];
}

/* Kullanıcı dilimine göre arama bandı: alt = ulaşılabilir üst okullar,
   üst = güvenli alt okullar */
function aramaBand(dilim) {
  var alt = Math.max(0.05, dilim - Math.max(5, dilim * 0.6));
  var ust = Math.min(100, dilim + Math.max(8, dilim * 0.6));
  return { alt: alt, ust: ust };
}

/* Okul türünü 6 kategoriye indirger */
function turKategori(tur) {
  var t = (tur || '').toLocaleLowerCase('tr');
  if (t.indexOf('fen lisesi') !== -1) return 'Fen Lisesi';
  if (t.indexOf('sosyal bilimler') !== -1) return 'Sosyal Bilimler Lisesi';
  if (t.indexOf('imam hatip') !== -1) return 'Anadolu İmam Hatip Lisesi';
  if (t.indexOf('meslek') !== -1 || t.indexOf('teknik') !== -1) return 'Mesleki ve Teknik Anadolu Lisesi';
  if (t.indexOf('anadolu lisesi') !== -1) return 'Anadolu Lisesi';
  return 'Diğer';
}

/* Rozet: düşük dilim % = daha seçici okul.
   Okulun taban dilimi kullanıcının diliminden küçükse okul daha seçicidir. */
function rozetSinif(okulDilim, kullaniciDilim) {
  if (okulDilim >= kullaniciDilim) return 'guvenli';
  if (okulDilim >= kullaniciDilim * 0.75) return 'hedef';
  return 'zorlu';
}
var ROZET_METIN = { guvenli: 'Şansın yüksek', hedef: 'Hedef', zorlu: 'Zorlu' };

/* Ana filtreleme: band + tür + taban puana göre sıralama */
function okulFiltrele(okullar, dilim, turFiltre) {
  var band = aramaBand(dilim);
  var sonuc = [];
  for (var i = 0; i < okullar.length; i++) {
    var o = okullar[i];
    if (o.dilim == null || o.taban == null) continue;
    if (o.dilim < band.alt || o.dilim > band.ust) continue;
    if (turFiltre && turKategori(o.tur) !== turFiltre) continue;
    sonuc.push({
      okul: o.okul, ilce: o.ilce, tur: o.tur, alan: o.alan,
      taban: o.taban, dilim: o.dilim, kontenjan: o.kontenjan,
      rozet: rozetSinif(o.dilim, dilim)
    });
  }
  sonuc.sort(function (a, b) { return b.taban - a.taban; });
  return { okullar: sonuc, band: band };
}

function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak, maximumFractionDigits: basamak
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SEHIRLER: SEHIRLER,
    dilimEnterpole: dilimEnterpole,
    aramaBand: aramaBand,
    turKategori: turKategori,
    rozetSinif: rozetSinif,
    okulFiltrele: okulFiltrele
  };
}

/* ================= DOM ================= */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var ilSec = document.getElementById('girdi-il');
    SEHIRLER.forEach(function (s) {
      var op = document.createElement('option');
      op.value = s[0]; op.textContent = s[1];
      ilSec.appendChild(op);
    });

    var degerGirdi = document.getElementById('girdi-deger');
    var turGirdi = document.getElementById('girdi-okultur');
    var hataKutusu = document.getElementById('robot-hata');
    var sonucDiv = document.getElementById('robot-sonuc');
    var ozet = document.getElementById('ozet-metin');
    var liste = document.getElementById('okul-listesi');
    var veriOnbellek = {};
    var sonListe = null, sonDilim = null, sonIl = '';

    function puanTuru() {
      var secs = document.getElementsByName('tur');
      for (var i = 0; i < secs.length; i++) if (secs[i].checked) return secs[i].value;
      return 'puan';
    }

    var radyolar = document.getElementsByName('tur');
    for (var ri = 0; ri < radyolar.length; ri++) {
      radyolar[ri].addEventListener('change', function () {
        var tur = puanTuru();
        document.querySelector('label[for="girdi-deger"]').textContent =
          tur === 'puan' ? 'Puanın' : 'Yüzdelik dilimin';
        degerGirdi.placeholder = tur === 'puan' ? 'örn. 420' : 'örn. 8,5';
        degerGirdi.min = tur === 'puan' ? 100 : 0;
        degerGirdi.max = tur === 'puan' ? 500 : 100;
      });
    }

    function hata(mesaj) {
      hataKutusu.textContent = mesaj;
      hataKutusu.hidden = false;
    }
    function hataTemizle() {
      hataKutusu.hidden = true; hataKutusu.textContent = '';
    }

    function veriYukle(slug, cb) {
      if (veriOnbellek[slug]) { cb(veriOnbellek[slug]); return; }
      var xhr = new XMLHttpRequest();
      var U = window.PR_U || function (p) { return p; };
      xhr.open('GET', U('/lgs/data/') + slug + '.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
          try {
            var v = JSON.parse(xhr.responseText);
            veriOnbellek[slug] = v;
            cb(v);
          } catch (e) { hata('Veri okunamadı, lütfen tekrar dene.'); }
        } else {
          hata('İl verisi yüklenemedi, lütfen tekrar dene.');
        }
      };
      xhr.send();
    }

    document.getElementById('btn-listele').addEventListener('click', function () {
      hataTemizle();
      var tur = puanTuru();
      var val = parseFloat(String(degerGirdi.value).replace(',', '.'));
      var slug = ilSec.value;
      if (!slug) { hata('Lütfen bir il seç.'); ilSec.focus(); return; }
      var dilim;
      if (tur === 'puan') {
        if (!isFinite(val) || val < 100 || val > 500) {
          hata('Lütfen 100–500 arasında bir puan gir.'); degerGirdi.focus(); return;
        }
        dilim = dilimEnterpole(val);
      } else {
        if (!isFinite(val) || val <= 0 || val > 100) {
          hata('Lütfen 0–100 arasında bir yüzdelik dilim gir (örn. 8,5).'); degerGirdi.focus(); return;
        }
        dilim = val;
      }
      var turFiltre = turGirdi.value || null;
      veriYukle(slug, function (veri) {
        var f = okulFiltrele(veri.okullar, dilim, turFiltre);
        sonListe = f.okullar; sonDilim = dilim;
        sonIl = ilSec.options[ilSec.selectedIndex].text;
        liste.innerHTML = '';
        if (!f.okullar.length) {
          ozet.textContent = sonIl + ' için bu aralıkta okul bulunamadı. Aralığı genişletmek için farklı bir değer dene.';
        } else {
          var goster = f.okullar.slice(0, 60);
          ozet.textContent = sonIl + ': %' + trSayi(dilim, 1) +
            ' dilimine uygun ' + f.okullar.length + ' okul bulundu' +
            (f.okullar.length > 60 ? ' (ilk 60 gösteriliyor)' : '') + '.';
          goster.forEach(function (o) {
            var li = document.createElement('li');
            li.className = 'okul-kart rozet-' + o.rozet;
            var kontenjan = o.kontenjan != null ? o.kontenjan : '–';
            li.innerHTML =
              '<div class="okul-baslik"><strong></strong>' +
              '<span class="rozet"></span></div>' +
              '<div class="okul-detay"></div>';
            li.querySelector('strong').textContent = o.okul;
            li.querySelector('.rozet').textContent = ROZET_METIN[o.rozet];
            li.querySelector('.okul-detay').textContent =
              o.ilce + ' · ' + o.tur + ' · Taban: ' + trSayi(o.taban, 2) +
              ' · Dilim: %' + trSayi(o.dilim, 2) + ' · Kontenjan: ' + kontenjan;
            liste.appendChild(li);
          });
        }
        sonucDiv.hidden = false;
        sonucDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.getElementById('btn-yazdir').addEventListener('click', function () {
      window.print();
    });

    document.getElementById('btn-wp').addEventListener('click', function () {
      if (!sonListe || !sonListe.length) return;
      var satirlar = sonListe.slice(0, 10).map(function (o, i) {
        return (i + 1) + '. ' + o.okul + ' (' + trSayi(o.taban, 0) + ' puan, %' + trSayi(o.dilim, 1) + ')';
      });
      var metin = 'LGS Tercih Listem (' + sonIl + ', dilim %' + trSayi(sonDilim, 1) + '):\n' + satirlar.join('\n');
      window.open('https://wa.me/?text=' + encodeURIComponent(metin), '_blank', 'noopener');
    });
  });
}
