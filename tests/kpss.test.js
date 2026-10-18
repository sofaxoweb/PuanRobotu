'use strict';
/* KPSS Puan Hesaplama — node testleri. Sayfadaki "Çalışılmış Örnek" ile
   buradaki örnek BİREBİR aynı sayıları kullanır. */
var assert = require('assert');
var M = require('../assets/js/kpss-puan.js');

var gecti = 0;
function test(ad, fn) {
  fn();
  gecti++;
  console.log('  ✓ ' + ad);
}

console.log('KPSS testleri:');

/* 1. Çalışılmış örnek (sayfadakiyle aynı): GY 42D/13Y, GK 35D/18Y */
test('çalışılmış örnek: GY 38,75 / GK 30,50 → P1 82,13, P2 81,51, P3 80,88', function () {
  assert.strictEqual(M.netHesapla(42, 13), 38.75);
  assert.strictEqual(M.netHesapla(35, 18), 30.5);
  var s = M.hesapla([
    { dogru: 42, yanlis: 13 },
    { dogru: 35, yanlis: 18 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.netGY, 38.75);
  assert.strictEqual(s.netGK, 30.5);
  assert.strictEqual(s.toplamNet, 69.25);
  assert.strictEqual(s.P1, 82.13);
  assert.strictEqual(s.P2, 81.51);
  assert.strictEqual(s.P3, 80.88);
});

/* 2. Sınır: iki test de boş → ÖSYM geçerlilik koşulu hatası */
test('sınır: boş test → en az 1 işaretleme hatası', function () {
  var s = M.hesapla([
    { dogru: 0, yanlis: 0 },
    { dogru: 0, yanlis: 0 }
  ]);
  assert.strictEqual(s.ok, false);
  assert.ok(/en az 1 işaretleme/.test(s.mesaj));
});

/* 3. Sınır: ful çekme → 100 tavanı */
test('sınır: 60/60 + 60/60 → tüm puan türleri 99,99 (tavan)', function () {
  var s = M.hesapla([
    { dogru: 60, yanlis: 0 },
    { dogru: 60, yanlis: 0 }
  ]);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.P1, 99.99);
  assert.strictEqual(s.P2, 99.99);
  assert.strictEqual(s.P3, 99.99);
});

/* 4. Negatif net 0'a sabitlenir */
test('net: yanlışlar doğrudan fazlaysa net 0 olur', function () {
  assert.strictEqual(M.netHesapla(2, 20), 0);
});

/* 5. Dayanak noktaları birebir okunur */
test('enterpolasyon: dayanak noktaları tam isabet', function () {
  assert.strictEqual(M.p3Enterpole(40), 69.87);
  assert.strictEqual(M.p3Enterpole(60), 77.4);
  assert.strictEqual(M.p3Enterpole(80), 84.93);
});

/* 6. Dengeli adayda üç puan türü de P3 eğrisiyle aynı */
test('eşdeğer net: GY=GK ise P1=P2=P3', function () {
  var p = M.puanHesapla(30, 30);
  assert.strictEqual(p.P1, p.P3);
  assert.strictEqual(p.P2, p.P3);
});

/* 7. GY ağırlıklı adayda P1 > P2 > P3 sıralaması */
test('ağırlık yönü: GY güçlüyse P1 en yüksek', function () {
  var p = M.puanHesapla(50, 10);
  assert.ok(p.P1 > p.P2 && p.P2 > p.P3, JSON.stringify(p));
});

/* 8. Geçersiz girdi: soru sayısını aşma */
test('doğrulama: doğru+yanlış 60’ı geçemez', function () {
  var s = M.hesapla([
    { dogru: 40, yanlis: 25 },
    { dogru: 30, yanlis: 10 }
  ]);
  assert.strictEqual(s.ok, false);
});

console.log('\n' + gecti + ' test geçti.');
