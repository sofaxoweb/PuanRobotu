/* PuanRobotu — ALES puan hesaplama (pure fonksiyonlar)
   Resmi formüller (ÖSYM ALES kılavuzu):
   - Net (test başına): Doğru − Yanlış/4
   - Her testin neti ortalaması 50, SS 10 olan standart puana (SP) çevrilir
   - AP-SAY = 0,75×SayısalSP + 0,25×SözelSP
   - AP-SÖZ = 0,25×SayısalSP + 0,75×SözelSP
   - AP-EA  = 0,50×SayısalSP + 0,50×SözelSP
   - ALES Puanı = 70 + 30×[2(AP−X)−S] / [2(B−X)−S]  (maksimum 100)
   SP'ler ÖSYM'nin o yıla ait istatistikleriyle bulunur; aşağıdaki model
   bunları ÖSYM'nin yayımlanmış İKİ GERÇEK sonuç belgesine dayalı
   doğrusal enterpolasyonla tahmin eder (çapalar sayfada belgelenir):
     Çapa 1 — ALES 20.11.2022: Sayısal 17D/5Y (net 15,75), Sözel 24D/17Y
       (net 19,75) → SAY 62,81835 / SÖZ 65,64572 / EA 65,16304
     Çapa 2 — ALES 28.07.2024: Sayısal 36D/14Y (net 32,50), Sözel 41D/9Y
       (net 38,75) → SAY 85,22163 / SÖZ 89,23376 / EA 87,51036
   Çapa SP değerleri, resmi 70+30 formülünün X=50, S=10, B=80 varsayımıyla
   (Puan = 1,2×AP + 4) tersine çevrilmesiyle elde edilmiştir:
     Sayısal: (15,75 → 47,84), (32,50 → 66,01)
     Sözel:   (19,75 → 52,55), (38,75 → 72,70)
   Aynı varsayım final dönüşümünde de kullanılır. Çıktılar TAHMİNİDİR.
   NOT: Bazı kaynaklarda SAY/SÖZ ağırlıkları 70/30 olarak da geçer; bu araç
   güncel kılavuz ve hesaplayıcılarda yaygın kullanılan 75/25 oranını esas alır. */
(function () {
  "use strict";

  function yuvarla(x) { return Math.round(x * 100) / 100; }

  function sayiKisla(v, min, max) {
    var n = Number(v);
    if (isNaN(n)) n = 0;
    return Math.max(min, Math.min(max, n));
  }

  // Test neti: Doğru − Yanlış/4
  function netHesapla(dogru, yanlis) {
    var d = sayiKisla(dogru, 0, 50);
    var y = sayiKisla(yanlis, 0, 50);
    return yuvarla(Math.max(0, d - y / 4));
  }

  // İki çapa arası doğrusal enterpolasyon, [20, 90] bandında kırpılır
  function enterpole(net, n1, sp1, n2, sp2) {
    var sp = sp1 + ((sp2 - sp1) / (n2 - n1)) * (net - n1);
    return yuvarla(Math.max(20, Math.min(90, sp)));
  }

  function spSayisal(net) {
    return enterpole(net, 15.75, 47.837221, 32.5, 66.012971);
  }

  function spSozel(net) {
    return enterpole(net, 19.75, 52.549504, 38.75, 72.699854);
  }

  // g: {sayDogru, sayYanlis, sozDogru, sozYanlis}
  function puanHesapla(g) {
    var netS = netHesapla(g.sayDogru, g.sayYanlis);
    var netW = netHesapla(g.sozDogru, g.sozYanlis);
    var spS = spSayisal(netS);
    var spW = spSozel(netW);
    function donustur(ap) {
      return yuvarla(Math.max(0, Math.min(100, 1.2 * ap + 4)));
    }
    return {
      netSayisal: netS,
      netSozel: netW,
      say: donustur(0.75 * spS + 0.25 * spW),
      soz: donustur(0.25 * spS + 0.75 * spW),
      ea: donustur(0.50 * spS + 0.50 * spW)
    };
  }

  var api = {
    netHesapla: netHesapla,
    spSayisal: spSayisal,
    spSozel: spSozel,
    puanHesapla: puanHesapla
  };
  if (typeof window !== "undefined") { window.PR_ales = api; }
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})();
