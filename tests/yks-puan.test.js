'use strict';
/* YKS Puan Hesaplama motoru testleri — node tests/yks-puan.test.js */
var assert = require('assert');
var PR = require('../assets/js/yks-puan.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= (eps || 0.01), 'beklenen ' + b + ', bulunan ' + a);
}

/* Çalışılmış örnek (sayfadaki örnekle BİREBİR aynı sayılar):
   TYT netleri TR30/SOS13/TMat26/Fen10; AYT netleri Mat28/Fiz9/Kim8/Biy9; OBP 425 */
var ORNEK = {
  tr: 30, sos: 13, tmat: 26, fen: 10,
  amat: 28, fiz: 9, kim: 8, biy: 9,
  ede: 0, tar1: 0, cog1: 0, tar2: 0, cog2: 0, fel: 0, din: 0, ydt: 0
};

var s = PR.hesapla({ nets: ORNEK, obp: 425, kirik: false });
assert.strictEqual(s.ok, true);
yaklasik(s.tytParca, 105.2);
yaklasik(s.tyt.ham, 363.0);
yaklasik(s.tyt.yer, 414.0);
yaklasik(s.say.ham, 367.04);
yaklasik(s.say.yer, 418.04);
assert.strictEqual(s.tytGecerli, true);
console.log('1. çalışılmış örnek (TYT parçası 105,2; SAY ham 367,04; yerleşme 418,04): OK');

/* Sınır durumu: hepsi boş */
var SIFIR = {
  tr: 0, sos: 0, tmat: 0, fen: 0,
  amat: 0, fiz: 0, kim: 0, biy: 0,
  ede: 0, tar1: 0, cog1: 0, tar2: 0, cog2: 0, fel: 0, din: 0, ydt: 0
};
var z = PR.hesapla({ nets: SIFIR, obp: 0, kirik: false });
assert.strictEqual(z.ok, true);
yaklasik(z.tyt.ham, 100);
yaklasik(z.say.ham, 100);
yaklasik(z.say.yer, 100);
assert.strictEqual(z.tytGecerli, false); /* TR veya TMat'tan ≥0,5 net yok */
console.log('2. sınır durumu (hepsi boş → 100, geçersiz TYT): OK');

/* Sınır durumu: hepsi tam doğru */
var TAM = {
  tr: 40, sos: 20, tmat: 40, fen: 20,
  amat: 40, fiz: 14, kim: 13, biy: 13,
  ede: 24, tar1: 10, cog1: 6, tar2: 11, cog2: 11, fel: 12, din: 6, ydt: 80
};
var f = PR.hesapla({ nets: TAM, obp: 500, kirik: false });
assert.strictEqual(f.ok, true);
yaklasik(f.tyt.ham, 500);
yaklasik(f.say.ham, 499.72);
yaklasik(f.ea.ham, 499.98);
yaklasik(f.soz.ham, 499.98);
yaklasik(f.dil.ham, 500);
yaklasik(f.say.yer, 499.72 + 60);
console.log('3. sınır durumu (hepsi tam → TYT 500, SAY 499,72): OK');

/* Kırık OBP: katsayı 0,06 */
var k = PR.hesapla({ nets: ORNEK, obp: 425, kirik: true });
yaklasik(k.say.yer, 367.04 + 425 * 0.06);
console.log('4. kırık OBP (367,04 + 25,5 = 392,54): OK');

/* Net formülü: D − Y/4 ve D/Y doğrulaması */
assert.strictEqual(PR.netHesapla(32, 8), 30);
assert.strictEqual(PR.netHesapla(10, 4), 9);
assert.strictEqual(PR.netHesapla(0, 40), 0); /* negatif net 0'a sabitlenir */
var v = PR.girdiyiDogrula(30, 11, 40, 'Matematik');
assert.strictEqual(v.ok, false); /* 30+11 > 40 */
console.log('5. net formülü ve doğrulama: OK');

/* EA ve SÖZ çalışılmış örnekleri (araştırma raporundan) */
var EA_ORNEK = {
  tr: 30, sos: 13, tmat: 26, fen: 10,
  amat: 28, fiz: 0, kim: 0, biy: 0,
  ede: 19, tar1: 7, cog1: 4, tar2: 0, cog2: 0, fel: 0, din: 0, ydt: 0
};
var ea = PR.hesapla({ nets: EA_ORNEK, obp: 425, kirik: false });
yaklasik(ea.ea.ham, 379.12);
yaklasik(ea.ea.yer, 430.12);
var DIL_ORNEK = {
  tr: 30, sos: 13, tmat: 26, fen: 10,
  amat: 0, fiz: 0, kim: 0, biy: 0,
  ede: 0, tar1: 0, cog1: 0, tar2: 0, cog2: 0, fel: 0, din: 0, ydt: 58
};
var d = PR.hesapla({ nets: DIL_ORNEK, obp: 425, kirik: false });
yaklasik(d.dil.ham, 379.2);
yaklasik(d.dil.yer, 430.2);
console.log('6. EA (379,12) ve DİL (379,2) örnekleri: OK');

console.log('\nyks-puan: tüm testler geçti.');
