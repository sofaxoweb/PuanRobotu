'use strict';
var assert = require('assert');
var V = require('../assets/js/not-vizefinal.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) < (eps || 1e-9), 'beklenen ' + b + ', gelen ' + a);
}

/* 1. Çalışılmış örnek (sayfadakiyle birebir): vize 50, hedef 50, %40/%60 → final 50 */
(function () {
  var r = V.gerekliFinal(50, 50, 40, 60);
  assert.strictEqual(r.durum, 'gerekli');
  yaklasik(r.gerekli, 50);
})();

/* 2. Sınır: vize tek başına hedefi karşılıyor → final 0 yeterli */
(function () {
  var r = V.gerekliFinal(100, 40, 40, 60);
  assert.strictEqual(r.durum, 'gecti');
  assert.strictEqual(r.gerekli, 0);
})();

/* 3. Sınır: hedefe ulaşmak imkânsız (>100 gerekli) */
(function () {
  var r = V.gerekliFinal(20, 90, 40, 60);
  assert.strictEqual(r.durum, 'imkansiz');
  assert.ok(r.gerekli > 100, 'gerekli 100\'ü aşmalı, gelen: ' + r.gerekli);
})();

/* 4. Farklı ağırlıklar (%30/%70): vize 50, hedef 50 → (50−15)/0,7 = 50 */
(function () {
  var r = V.gerekliFinal(50, 50, 30, 70);
  assert.strictEqual(r.durum, 'gerekli');
  yaklasik(r.gerekli, 50);
})();

/* 5. Ağırlıklı ortalama tutarlılığı: 50 vize (%40) + 50 final (%60) = 50 */
(function () {
  yaklasik(V.agirlikliOrtalama(50, 50, 40, 60), 50);
  yaklasik(V.agirlikliOrtalama(80, 60, 40, 60), 68);
})();

/* 6. Hata durumları: geçersiz girdi ve geçersiz ağırlık */
(function () {
  assert.strictEqual(V.gerekliFinal('abc', 50, 40, 60).durum, 'hata');
  assert.strictEqual(V.gerekliFinal(50, 50, 0, 0).durum, 'hata');
  assert.strictEqual(V.gerekliFinal(150, 50, 40, 60).durum, 'hata');
})();

console.log('not-vizefinal: 6 test geçti ✓');
