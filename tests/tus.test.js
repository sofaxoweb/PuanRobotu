'use strict';
/* TUS Puan Hesaplama — node testleri. Sayfadaki "Çalışılmış Örnek" ile
   buradaki örnek BİREBİR aynı sayıları kullanır. */
var assert = require('assert');
var M = require('../assets/js/tus-puan.js');

var gecti = 0;
function test(ad, fn) {
  fn();
  gecti++;
  console.log('  ✓ ' + ad);
}

console.log('TUS testleri:');

/* 1. Çalışılmış örnek (sayfadakiyle aynı): TTBT 70D/20Y, KTBT 60D/30Y */
test('çalışılmış örnek: ham 65 / 52,5 → K 68,30, T 70,10', function () {
  assert.strictEqual(M.hamHesapla(70, 20), 65);
  assert.strictEqual(M.hamHesapla(60, 30), 52.5);
  var s = M.hesapla([
    { dogru: 70, yanlis: 20 },
    { dogru: 60, yanlis: 30 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.hamTTBT, 65);
  assert.strictEqual(s.hamKTBT, 52.5);
  assert.strictEqual(s.K, 68.3);
  assert.strictEqual(s.T, 70.1);
  assert.strictEqual(s.barajK, true);
  assert.strictEqual(s.barajT, true);
});

/* 2. Sınır: iki oturum da 0 net → taban puanlar, baraj altı */
test('sınır: 0 net → K 40,3 / T 41,8, baraj altı', function () {
  var s = M.hesapla([
    { dogru: 0, yanlis: 0 },
    { dogru: 0, yanlis: 0 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.K, 40.3);
  assert.strictEqual(s.T, 41.8);
  assert.strictEqual(s.barajK, false);
  assert.strictEqual(s.barajT, false);
});

/* 3. Sınır: ful → 85 tavanı (resmi en yüksek puan) */
test('sınır: 100/100 → 85 tavanına sabitlenir', function () {
  var s = M.hesapla([
    { dogru: 100, yanlis: 0 },
    { dogru: 100, yanlis: 0 }
  ]);
  assert.strictEqual(s.K, 85);
  assert.strictEqual(s.T, 85);
});

/* 4. Negatif ham 0'a sabitlenir */
test('ham: 10D/50Y → ham 0 (negatif sabitlenir)', function () {
  assert.strictEqual(M.hamHesapla(10, 50), 0);
});

/* 5. Baraj eşiği: 45 altı tercih dışı */
test('baraj: düşük net baraj altında kalır', function () {
  var p = M.puanHesapla(1, 15);
  /* K = 40,3 + 0,207 + 4,155 = 44,66 < 45 */
  assert.ok(p.K < 45, 'K=' + p.K);
  assert.ok(p.K > 44 && p.K < 45);
});

/* 6. Doğrulama: 100 soru aşılamaz */
test('doğrulama: doğru+yanlış 100’ü geçemez', function () {
  var s = M.hesapla([
    { dogru: 80, yanlis: 30 },
    { dogru: 60, yanlis: 10 }
  ]);
  assert.strictEqual(s.ok, false);
});

/* 7. Klinik ağırlık yönü: KTBT yüksekse K, TTBT yüksekse T önde */
test('ağırlık yönü: klinik güçlüyse K > T', function () {
  var p = M.puanHesapla(20, 80);
  assert.ok(p.K > p.T, JSON.stringify(p));
  var q = M.puanHesapla(80, 20);
  assert.ok(q.T > q.K, JSON.stringify(q));
});

console.log('\n' + gecti + ' test geçti.');
