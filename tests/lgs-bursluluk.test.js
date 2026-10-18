'use strict';
/* Bursluluk (İOKBS) puan hesaplama testleri — sayfadaki çalışılmış örnekle birebir. */
var assert = require('assert');
var PR = require('../assets/js/lgs-bursluluk.js');

var GEVSEK = 0.01;
function yaklasik(gercek, beklenen, mesaj) {
  assert.ok(Math.abs(gercek - beklenen) < GEVSEK, mesaj + ' (beklenen ' + beklenen + ', bulunan ' + gercek + ')');
}

/* 1) Net formülü: 3 yanlış 1 doğruyu götürür. */
yaklasik(PR.netHesapla(20, 5), 18.3333, 'Türkçe 20D/5Y neti 18,33 olmalı');
assert.strictEqual(PR.netHesapla(25, 0), 25, 'Hepsi doğru → 25 net');
assert.strictEqual(PR.netHesapla(0, 0), 0, 'Boş test → 0 net');

/* 2) Çalışılmış örnek (sayfadakiyle BİREBİR aynı sayılar):
   Türkçe 20D/5Y → 18,33 | Mat 15D/6Y → 13,00 | Fen 18D/3Y → 17,00 | Sosyal 16D/4Y → 14,67
   Ağırlıklı = (18,33+13,00+17,00+14,67) × 3 = 189,00
   Tahmini Puan = 100 + 400 × (189 ÷ 300) = 352 */
var ornek = PR.hesapla([[20, 5], [15, 6], [18, 3], [16, 4]]);
yaklasik(ornek.netler[0], 18.3333, 'Örnek: Türkçe neti');
yaklasik(ornek.netler[1], 13, 'Örnek: Matematik neti');
yaklasik(ornek.netler[2], 17, 'Örnek: Fen neti');
yaklasik(ornek.netler[3], 14.6667, 'Örnek: Sosyal neti');
yaklasik(ornek.agirlikli, 189, 'Örnek: ağırlıklı toplam 189 olmalı');
yaklasik(ornek.puan, 352, 'Örnek: tahmini puan 352 olmalı');

/* 3) Ağırlıklı toplam fonksiyonu doğrudan (tüm katsayılar 3). */
yaklasik(PR.agirlikliToplam([10, 10, 10, 10]), 120, 'Ağırlıklı toplam 40 net × 3 = 120 olmalı');
yaklasik(PR.agirlikliToplam([25, 25, 25, 25]), 300, 'Maksimum ağırlıklı toplam 300 olmalı');

/* 4) Sınır durumları: hepsi doğru → 500; hepsi yanlış → 100 (ölçek tabanı). */
var hepsiDogru = PR.hesapla([[25, 0], [25, 0], [25, 0], [25, 0]]);
assert.strictEqual(hepsiDogru.puan, 500, 'Hepsi doğru → 500 puan');
var hepsiYanlis = PR.hesapla([[0, 25], [0, 25], [0, 25], [0, 25]]);
assert.strictEqual(hepsiYanlis.puan, 100, 'Hepsi yanlış → 100 puan (ölçek tabanı)');

/* 5) Ölçek sınırları: puan asla 100–500 dışına çıkmaz. */
assert.ok(PR.tahminiPuan(300) === 500, 'Maks ağırlık → 500');
assert.ok(PR.tahminiPuan(0) === 100, 'Sıfır ağırlık → 100');
assert.ok(PR.tahminiPuan(-50) === 100, 'Negatif ağırlık → 100’e sabitlenir');
assert.ok(PR.tahminiPuan(9999) === 500, 'Aşırı ağırlık → 500’e sabitlenir');

/* 6) Girdi doğrulama. */
assert.strictEqual(PR.girdiyiDogrula(20, 5, 25, 'Türkçe').ok, true, 'Geçerli girdi kabul edilmeli');
assert.strictEqual(PR.girdiyiDogrula(20, 6, 25, 'Türkçe').ok, false, 'Doğru+yanlış 25’i geçemez');
assert.strictEqual(PR.girdiyiDogrula(-1, 0, 25, 'Türkçe').ok, false, 'Negatif değer reddedilmeli');

console.log('lgs-bursluluk: tüm testler geçti ✓');
