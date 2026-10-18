'use strict';
/* Takdir–Teşekkür hesaplama testleri — MEB Madde 160 koşulları + sınır durumları. */
var assert = require('assert');
var PR = require('../assets/js/lgs-takdir.js');

function kosul(sonuc, id) {
  return sonuc.kosullar.filter(function (k) { return k.id === id; })[0];
}

/* 1) Çalışılmış örnek (sayfadakiyle birebir): 88,2 ort, zayıf yok, 3 gün, ceza yok → Takdir. */
var ornek = PR.degerlendir(88.2, false, 3, 'yok');
assert.strictEqual(ornek.belge, 'takdir', 'Örnek: 88,2 ortalama → Takdir olmalı');
assert.ok(ornek.kosullar.every(function (k) { return k.tamam; }), 'Örnek: tüm koşullar sağlanmalı');

/* 2) Sınır: 84,95 → Teşekkür (85,00 altı keskin sınır). */
var sinirTesekkur = PR.degerlendir(84.95, false, 2, 'yok');
assert.strictEqual(sinirTesekkur.belge, 'tesekkur', '84,95 → Teşekkür olmalı');

/* 3) Sınır: tam 85,00 → Takdir. */
var sinirTakdir = PR.degerlendir(85, false, 0, 'yok');
assert.strictEqual(sinirTakdir.belge, 'takdir', '85,00 → Takdir olmalı');

/* 4) Sınır: tam 70,00 → Teşekkür; 69,99 → belge yok. */
assert.strictEqual(PR.degerlendir(70, false, 0, 'yok').belge, 'tesekkur', '70,00 → Teşekkür olmalı');
assert.strictEqual(PR.degerlendir(69.99, false, 0, 'yok').belge, 'yok', '69,99 → belge yok');

/* 5) Sınır: devamsızlık 6 gün → belge yok (5 gün üst sınır). */
var devamsiz = PR.degerlendir(95, false, 6, 'yok');
assert.strictEqual(devamsiz.belge, 'yok', '6 gün devamsızlık → belge yok');
assert.strictEqual(kosul(devamsiz, 'devamsizlik').tamam, false, 'Devamsızlık koşulu başarısız işaretlenmeli');
assert.strictEqual(PR.degerlendir(95, false, 5, 'yok').belge, 'takdir', '5 gün devamsızlık kabul edilir');

/* 6) Zayıf ders → belge yok (ortalama 100 olsa bile). */
var zayif = PR.degerlendir(100, true, 0, 'yok');
assert.strictEqual(zayif.belge, 'yok', 'Zayıf ders varsa belge yok');
assert.strictEqual(kosul(zayif, 'zayif').tamam, false, 'Zayıf koşulu başarısız işaretlenmeli');

/* 7) Disiplin cezası → belge yok (davranış puanı 100 olmalı). */
var kinama = PR.degerlendir(95, false, 0, 'kinama');
assert.strictEqual(kinama.belge, 'yok', 'Kınama cezası → belge yok');
assert.strictEqual(kosul(kinama, 'disiplin').tamam, false, 'Disiplin koşulu başarısız işaretlenmeli');
var uzaklastirma = PR.degerlendir(95, false, 0, 'uzaklastirma');
assert.strictEqual(uzaklastirma.belge, 'yok', 'Uzaklaştırma cezası → belge yok');

/* 8) Hangi koşulun başarısız olduğu raporda görünür. */
var coklu = PR.degerlendir(90, true, 7, 'kinama');
assert.strictEqual(coklu.belge, 'yok', 'Birden çok koşul başarısızsa belge yok');
var basarisizlar = coklu.kosullar.filter(function (k) { return !k.tamam; }).map(function (k) { return k.id; });
assert.deepStrictEqual(basarisizlar, ['zayif', 'devamsizlik', 'disiplin'], 'Başarısız koşullar tek tek listelenmeli');

/* 9) Belge adları eşlemesi. */
assert.strictEqual(PR.BELGE_ADLARI.takdir, 'Takdir Belgesi');
assert.strictEqual(PR.BELGE_ADLARI.tesekkur, 'Teşekkür Belgesi');
assert.strictEqual(PR.BELGE_ADLARI.yok, 'Belge Yok');

console.log('lgs-takdir: tüm testler geçti ✓');
