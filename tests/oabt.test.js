'use strict';
/* ÖABT / MEB-AGS-P2 — node testleri. Sayfadaki "Çalışılmış Örnek" ile
   buradaki örnek BİREBİR aynı sayıları kullanır. */
var assert = require('assert');
var M = require('../assets/js/oabt-puan.js');

var gecti = 0;
function test(ad, fn) {
  fn();
  gecti++;
  console.log('  ✓ ' + ad);
}

console.log('ÖABT testleri:');

/* 1. Çalışılmış örnek (sayfadakiyle aynı): AGS 78,5 + ÖABT 40D/5Y */
test('çalışılmış örnek: net 38,75 → ÖABT puanı 82 → P2 80,25', function () {
  assert.strictEqual(M.netHesapla(40, 5), 38.75);
  assert.strictEqual(M.oabtPuanTahmini(38.75), 82);
  var s = M.hesapla(78.5, 40, 5);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.oabtNet, 38.75);
  assert.strictEqual(s.oabtPuan, 82);
  assert.strictEqual(s.p2, 80.25);
});

/* 2. Sınır: ÖABT boş → net 0 → puan 20 (doğrusal model tabanı) */
test('sınır: ÖABT boş → net 0, puan 20', function () {
  var s = M.hesapla(70, 0, 0);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.oabtNet, 0);
  assert.strictEqual(s.oabtPuan, 20);
  assert.strictEqual(s.p2, 45); /* 0,5×70 + 0,5×20 */
});

/* 3. Sınır: ful ÖABT → 50 net → 100 puan */
test('sınır: 50 doğru → 100 puan, P2 tavanı', function () {
  var s = M.hesapla(100, 50, 0);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.oabtNet, 50);
  assert.strictEqual(s.oabtPuan, 100);
  assert.strictEqual(s.p2, 100);
});

/* 4. Doğrulama: AGS 100'ü geçemez */
test('doğrulama: AGS > 100 reddedilir', function () {
  var s = M.hesapla(101, 30, 5);
  assert.strictEqual(s.ok, false);
});

/* 5. Doğrulama: ÖABT 50 soruyu geçemez */
test('doğrulama: doğru+yanlış 50’yi geçemez', function () {
  var s = M.hesapla(80, 40, 15);
  assert.strictEqual(s.ok, false);
});

/* 6. Negatif net 0'a sabitlenir */
test('net: 5D/30Y → net 0 (negatif sabitlenir)', function () {
  assert.strictEqual(M.netHesapla(5, 30), 0);
});

/* 7. P2 formülü: AGS ve ÖABT eşit ağırlık */
test('formül: P2 = AGS×0,5 + ÖABT×0,5', function () {
  var r = M.p2Hesapla(60, 25); /* net 25 → puan 60 */
  assert.strictEqual(r.oabtPuan, 60);
  assert.strictEqual(r.p2, 60);
});

console.log('\n' + gecti + ' test geçti.');
