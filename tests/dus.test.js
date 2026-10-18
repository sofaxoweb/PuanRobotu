'use strict';
/* DUS Puan Hesaplama — node testleri. Sayfadaki "Çalışılmış Örnek" ile
   buradaki örnek BİREBİR aynı sayıları kullanır. */
var assert = require('assert');
var M = require('../assets/js/dus-puan.js');

var gecti = 0;
function test(ad, fn) {
  fn();
  gecti++;
  console.log('  ✓ ' + ad);
}

console.log('DUS testleri:');

/* 1. Çalışılmış örnek (sayfadakiyle aynı): TBT 28D/8Y, KBT 55D/20Y */
test('çalışılmış örnek: ham 26 / 50 → K 57,47, T 57,20', function () {
  assert.strictEqual(M.hamHesapla(28, 8), 26);
  assert.strictEqual(M.hamHesapla(55, 20), 50);
  var s = M.hesapla([
    { dogru: 28, yanlis: 8 },
    { dogru: 55, yanlis: 20 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.hamTBT, 26);
  assert.strictEqual(s.hamKBT, 50);
  assert.strictEqual(s.K, 57.47);
  assert.strictEqual(s.T, 57.2);
  assert.strictEqual(s.barajK, true);
  assert.strictEqual(s.barajT, true);
});

/* 2. Sınır: iki test de 0 net → baraj altı */
test('sınır: 0 net → baraj altı', function () {
  var s = M.hesapla([
    { dogru: 0, yanlis: 0 },
    { dogru: 0, yanlis: 0 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.ok(s.K < 45, 'K=' + s.K);
  assert.strictEqual(s.barajK, false);
});

/* 3. Sınır: ful → 85 tavanı YOK, ~84,8 (DUS'ta dönüştürme yok) */
test('sınır: ful ham → K 84,8 (85’e dönüştürme yok)', function () {
  var s = M.hesapla([
    { dogru: 40, yanlis: 0 },
    { dogru: 80, yanlis: 0 }
  ]);
  assert.strictEqual(s.K, 84.8);
  assert.strictEqual(s.T, 83.2);
});

/* 4. Standart puan formülü */
test('SP: ham=ortalama → SP 50', function () {
  assert.strictEqual(M.spHesapla(22, 22, 6), 50);
  assert.strictEqual(M.spHesapla(42, 42, 10), 50);
});

/* 5. Negatif ham 0'a sabitlenir */
test('ham: 2D/20Y → ham 0 (negatif sabitlenir)', function () {
  assert.strictEqual(M.hamHesapla(2, 20), 0);
});

/* 6. Doğrulama: test soru sayıları aşılamaz */
test('doğrulama: TBT 40, KBT 80 soruyu geçemez', function () {
  var s = M.hesapla([
    { dogru: 30, yanlis: 15 },
    { dogru: 70, yanlis: 15 }
  ]);
  assert.strictEqual(s.ok, false);
});

/* 7. Ağırlık yönü: KBT güçlüyse K, TBT güçlüyse T önde */
test('ağırlık yönü: klinik güçlüyse K > T', function () {
  var p = M.puanHesapla(10, 70);
  assert.ok(p.K > p.T, JSON.stringify(p));
  var q = M.puanHesapla(35, 20);
  assert.ok(q.T > q.K, JSON.stringify(q));
});

console.log('\n' + gecti + ' test geçti.');
