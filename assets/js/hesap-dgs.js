/* PuanRobotu — DGS puan hesaplama (pure fonksiyonlar)
   Resmi formüller (ÖSYM DGS kılavuzu, Tablo-A):
   - Net (bölüm başına): Doğru − Yanlış/4
   - ÖBP = diploma ortalaması × 0,8 (50'nin altı 50 sayılır → ÖBP 40–80)
   - DGS-SAY = 3×SayısalSP + 0,6×SözelSP + k×ÖBP
   - DGS-SÖZ = 0,6×SayısalSP + 3×SözelSP + k×ÖBP
   - DGS-EA  = 1,8×SayısalSP + 1,8×SözelSP + k×ÖBP
     (k = 0,6 normal; geçen yıl yerleşenlerde 0,45 "kırık ÖBP")
   Standart puanlar (SP) ÖSYM'nin o yıla ait istatistikleriyle bulunur;
   aşağıdaki spTahmin() bunları ŞEFFAF bir doğrusal modelle tahmin eder:
     SP(net) = 50 + 2×(net − 25), [20, 90] bandında kırpılır.
   Dayanaklar (sayfada da belgelenir):
   1) Arif Hoca'nın DGS hukuk analizi: 75–76 toplam net ≈ 315–316 EA puanı
      (ÖBP≈70). Model: 37,75+37,75 net, ÖBP 70 → EA 313,8. Tutarlı.
   2) 2026 DGS taban puanları: örn. Bilgisayar Müh. SAY 316,69 ≈ 76 net bandı.
   Çıktılar TAHMİNİDİR. */
(function () {
  "use strict";

  function yuvarla(x) { return Math.round(x * 100) / 100; }

  function sayiKisla(v, min, max) {
    var n = Number(v);
    if (isNaN(n)) n = 0;
    return Math.max(min, Math.min(max, n));
  }

  // Bölüm neti: Doğru − Yanlış/4 (yanlışlar yalnızca kendi bölümünü etkiler)
  function netHesapla(dogru, yanlis) {
    var d = sayiKisla(dogru, 0, 50);
    var y = sayiKisla(yanlis, 0, 50);
    return yuvarla(Math.max(0, d - y / 4));
  }

  // ÖBP = diploma × 0,8 ; 50'nin altı 50 sayılır → aralık 40–80
  function obpHesapla(diploma) {
    var o = Number(diploma);
    if (isNaN(o)) o = 50;
    o = Math.max(50, Math.min(100, o));
    return yuvarla(Math.max(40, Math.min(80, o * 0.8)));
  }

  // Şeffaf SP tahmin modeli (yukarıdaki dayanaklara bakın)
  function spTahmin(net) {
    return yuvarla(Math.max(20, Math.min(90, 50 + 2 * (net - 25))));
  }

  // g: {sayDogru, sayYanlis, sozDogru, sozYanlis, diploma, kirik}
  // Her iki testte de en az 1 net yoksa resmi kural gereği null döner.
  function puanHesapla(g) {
    var netS = netHesapla(g.sayDogru, g.sayYanlis);
    var netW = netHesapla(g.sozDogru, g.sozYanlis);
    if (netS < 1 || netW < 1) return null;
    var obp = obpHesapla(g.diploma);
    var k = g.kirik ? 0.45 : 0.6;
    var spS = spTahmin(netS);
    var spW = spTahmin(netW);
    return {
      netSayisal: netS,
      netSozel: netW,
      obp: obp,
      say: yuvarla(3 * spS + 0.6 * spW + k * obp),
      soz: yuvarla(0.6 * spS + 3 * spW + k * obp),
      ea: yuvarla(1.8 * spS + 1.8 * spW + k * obp)
    };
  }

  var api = {
    netHesapla: netHesapla,
    obpHesapla: obpHesapla,
    spTahmin: spTahmin,
    puanHesapla: puanHesapla
  };
  if (typeof window !== "undefined") { window.PR_dgs = api; }
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})();
