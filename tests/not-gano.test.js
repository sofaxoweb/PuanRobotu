'use strict';
var assert = require('assert');
var G = require('../assets/js/not-gano.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) < (eps || 1e-9), 'beklenen ' + b + ', gelen ' + a);
}

/* 1. Çalışılmış örnek (sayfadakiyle birebir):
   4 kr BA (14,0) + 3 kr BB (9,0) + 2 kr FF (0) = 23,0 / 9 = 2,555… */
(function () {
  var r = G.ganoHesapla([
    { harf: 'BA', kredi: 4 },
    { harf: 'BB', kredi: 3 },
    { harf: 'FF', kredi: 2 }
  ]);
  yaklasik(r.gano, 23 / 9);
  assert.strictEqual(r.toplamKredi, 9);
  assert.strictEqual(r.dersSayisi, 3);
})();

/* 2. Sınır: hepsi FF → GANO 0 (krediler paydaya girer) */
(function () {
  var r = G.ganoHesapla([{ harf: 'FF', kredi: 3 }, { harf: 'FF', kredi: 2 }]);
  assert.strictEqual(r.gano, 0);
  assert.strictEqual(r.toplamKredi, 5);
})();

/* 3. Sınır: hiç geçerli ders yok → gano null */
(function () {
  var r = G.ganoHesapla([]);
  assert.strictEqual(r.gano, null);
  var r2 = G.ganoHesapla([{ harf: 'XX', kredi: 3 }, { harf: 'AA', kredi: 0 }]);
  assert.strictEqual(r2.gano, null);
  assert.strictEqual(r2.yoksayilan, 2);
})();

/* 4. Harf katsayı tablosu resmî değerlerle eşleşmeli */
(function () {
  assert.deepStrictEqual(G.HARF_DEGER, {
    AA: 4.0, BA: 3.5, BB: 3.0, CB: 2.5, CC: 2.0,
    DC: 1.5, DD: 1.0, FD: 0.5, FF: 0.0
  });
})();

/* 5. Tek ders: AA 5 kredi → 4,00 */
(function () {
  var r = G.ganoHesapla([{ harf: 'AA', kredi: 5 }]);
  assert.strictEqual(r.gano, 4.0);
})();

console.log('not-gano: 5 test geçti ✓');
