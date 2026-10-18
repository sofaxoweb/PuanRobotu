/* PuanRobotu — merkezi araç kayıt defteri (single source of truth)
   Anasayfa arama, kategori hub'ları, kenar çubuğu (sidebar) ve
   "ilgili hesaplayıcılar" bölümleri bu listeden beslenir.
   Yeni araç eklerken: bu listeye ekle + sayfasını oluştur. Başka bir şey gerekmez. */
window.PR_CATS = [
  { id: "lgs",          ad: "Ortaokul",               slug: "lgs",              aciklama: "LGS ve ortaokul düzeyi hesaplama araçları", ikon: "🎒" },
  { id: "yks",          ad: "Üniversite Giriş",       slug: "yks",              aciklama: "YKS, OBP ve üniversiteye giriş araçları",   ikon: "🎓" },
  { id: "uninot",       ad: "Üniversite Notları",     slug: "universite-not",   aciklama: "Vize-final, GANO ve not sistemi araçları",  ikon: "📝" },
  { id: "lisansustu",   ad: "Lisansüstü & Akademik",  slug: "lisansustu",       aciklama: "ALES, DGS, YDS ve akademik sınav araçları",  ikon: "📚" },
  { id: "kamu",         ad: "Kamu & Mesleki Sınavlar", slug: "kamu-sinavlari",   aciklama: "KPSS, TUS, DUS ve meslek sınavı araçları",  ikon: "🏛️" }
];

window.PR_TOOLS = [
  /* ---- Ortaokul (LGS) ---- */
  { id: "lgs-puan",    cat: "lgs", ad: "LGS Puan Hesaplama",          url: "/lgs/puan-hesaplama/",
    kw: ["lgs puan hesaplama", "lgs net hesaplama", "lgs tahmini puan"],
    aciklama: "Doğru-yanlıştan LGS neti, tahmini puanı (100–500) ve yüzdelik dilimi hesapla." },
  { id: "lgs-tercih",  cat: "lgs", ad: "LGS Tercih Robotu",           url: "/lgs/tercih-robotu/",
    kw: ["lgs tercih robotu", "lise tercih", "hangi liseye girebilirim"],
    aciklama: "Puanına ve yüzdelik dilimine göre sana uygun liseleri listele." },
  { id: "lgs-taban",   cat: "lgs", ad: "LGS Taban Puanları",           url: "/lgs/taban-puanlari/",
    kw: ["lgs taban puanları", "lise taban puanları", "okul taban puanı"],
    aciklama: "81 ilde liselerin güncel taban puanları ve yüzdelik dilimleri." },
  { id: "lgs-bursluluk", cat: "lgs", ad: "Bursluluk (İOKBS) Puan Hesaplama", url: "/lgs/bursluluk-puan-hesaplama/",
    kw: ["bursluluk puan hesaplama", "iokbs puan hesaplama", "pybs puan"],
    aciklama: "İOKBS doğru-yanlışından tahmini bursluluk puanını hesapla." },
  { id: "lgs-takdir",  cat: "lgs", ad: "Takdir–Teşekkür Hesaplama",    url: "/lgs/takdir-tesekkur-hesaplama/",
    kw: ["takdir teşekkür hesaplama", "takdir hesapla", "teşekkür hesapla"],
    aciklama: "Dönem ortalamana göre takdir mi teşekkür mü alacağını öğren." },

  /* ---- Üniversite Giriş (YKS) ---- */
  { id: "yks-puan",    cat: "yks", ad: "YKS Puan Hesaplama",          url: "/yks/puan-hesaplama/",
    kw: ["yks puan hesaplama", "tyt puan hesaplama", "ayt puan hesaplama", "tyt net hesaplama"],
    aciklama: "TYT, AYT ve YDT netlerinden tahmini YKS puanlarını (TYT, SAY, SÖZ, EA, DİL) hesapla." },
  { id: "yks-obp",     cat: "yks", ad: "OBP Hesaplama",               url: "/yks/obp-hesaplama/",
    kw: ["obp hesaplama", "ortaöğretim başarı puanı", "diploma notu obp"],
    aciklama: "Diploma notundan Ortaöğretim Başarı Puanını (250–500) hesapla." },
  { id: "yks-tercih",  cat: "yks", ad: "YKS Tercih Robotu",           url: "/yks/tercih-robotu/",
    kw: ["yks tercih robotu", "üniversite tercih", "hangi üniversiteye girebilirim"],
    aciklama: "Puanına ve sıralamana göre hedefleyebileceğin üniversiteleri gör." },
  { id: "yks-taban",   cat: "yks", ad: "Üniversite Taban Puanları",   url: "/yks/taban-puanlari/",
    kw: ["üniversite taban puanları", "yks taban puanları", "bölüm taban puanları"],
    aciklama: "Üniversite ve bölümlerin güncel taban puanları ve başarı sıralamaları." },
  { id: "yks-msu",     cat: "yks", ad: "MSÜ Puan Hesaplama",          url: "/yks/msu-puan-hesaplama/",
    kw: ["msü puan hesaplama", "askeri öğrenci puan hesaplama"],
    aciklama: "MSÜ doğru-yanlışından tahmini MSÜ puanını hesapla." },

  /* ---- Üniversite Notları ---- */
  { id: "not-vizefinal", cat: "uninot", ad: "Vize–Final Hesaplama",    url: "/universite-not/vize-final-hesaplama/",
    kw: ["vize final hesaplama", "finalden kaç almalıyım", "geçme notu hesaplama"],
    aciklama: "Vize notundan dersten geçmek için finalden kaç alman gerektiğini bul." },
  { id: "not-gano",    cat: "uninot", ad: "GANO / AGNO Hesaplama",    url: "/universite-not/gano-hesaplama/",
    kw: ["gano hesaplama", "agno hesaplama", "üniversite ortalama hesaplama"],
    aciklama: "Harf notları ve kredilerle genel not ortalamanı (4,00 üzerinden) hesapla." },
  { id: "not-harf",    cat: "uninot", ad: "Harf Notu Hesaplama",      url: "/universite-not/harf-notu-hesaplama/",
    kw: ["harf notu hesaplama", "aa ba bb not", "100lük not harf karşılığı"],
    aciklama: "100'lük notunun harf karşılığını (AA, BA, BB…) öğren." },
  { id: "not-canegrisi", cat: "uninot", ad: "Çan Eğrisi Hesaplama",   url: "/universite-not/can-egrisi-hesaplama/",
    kw: ["çan eğrisi hesaplama", "bağıl değerlendirme", "çan eğrisi not"],
    aciklama: "Sınıf ortalaması ve standart sapmayla çan eğrisine göre harf notunu tahmin et." },
  { id: "not-aof",     cat: "uninot", ad: "AÖF Not Hesaplama",        url: "/universite-not/aof-not-hesaplama/",
    kw: ["aöf not hesaplama", "açıköğretim not hesaplama", "auzeF not"],
    aciklama: "Açıköğretim ara sınav ve dönem sonu notundan harf notunu hesapla." },
  { id: "not-donusum", cat: "uninot", ad: "4,00 – 100 Not Dönüşümü",  url: "/universite-not/not-donusumu/",
    kw: ["4lük 100lük not dönüşümü", "yök not dönüşüm tablosu", "gano 100lük karşılık"],
    aciklama: "YÖK tablosuna göre 4,00'lük notu 100'lük sisteme (ve tersini) çevir." },

  /* ---- Lisansüstü & Akademik ---- */
  { id: "ales",        cat: "lisansustu", ad: "ALES Puan Hesaplama",   url: "/lisansustu/ales-puan-hesaplama/",
    kw: ["ales puan hesaplama", "ales net hesaplama", "ales sayısal sözel"],
    aciklama: "Sayısal ve sözel netlerinden tahmini ALES puanını hesapla." },
  { id: "dgs",         cat: "lisansustu", ad: "DGS Puan Hesaplama",    url: "/lisansustu/dgs-puan-hesaplama/",
    kw: ["dgs puan hesaplama", "dgs net hesaplama", "dikey geçiş puan"],
    aciklama: "Sayısal-sözel netlerinden DGS SAY, SÖZ ve EA puanlarını hesapla." },
  { id: "yds",         cat: "lisansustu", ad: "YDS Puan Hesaplama",    url: "/lisansustu/yds-puan-hesaplama/",
    kw: ["yds puan hesaplama", "yds kaç doğru kaç puan"],
    aciklama: "Doğru sayından YDS puanını (0–100) anında hesapla." },
  { id: "yokdil",      cat: "lisansustu", ad: "YÖKDİL Puan Hesaplama", url: "/lisansustu/yokdil-puan-hesaplama/",
    kw: ["yökdil puan hesaplama", "yökdil kaç doğru kaç puan"],
    aciklama: "Doğru sayından YÖKDİL puanını (0–100) anında hesapla." },

  /* ---- Kamu & Mesleki Sınavlar ---- */
  { id: "kpss",        cat: "kamu", ad: "KPSS Puan Hesaplama",         url: "/kamu-sinavlari/kpss-puan-hesaplama/",
    kw: ["kpss puan hesaplama", "kpss net hesaplama", "kpss p3 hesaplama"],
    aciklama: "GY-GK netlerinden tahmini KPSS P1, P2, P3 puanlarını hesapla." },
  { id: "kpss-onlisans", cat: "kamu", ad: "KPSS Önlisans (P93) Puan Hesaplama", url: "/kamu-sinavlari/kpss-onlisans-puan-hesaplama/",
    kw: ["kpss önlisans puan hesaplama", "kpss p93 hesaplama", "önlisans kpss net"],
    aciklama: "GY-GK netlerinden tahmini KPSS P93 (önlisans) puanını hesapla." },
  { id: "kpss-ortaogretim", cat: "kamu", ad: "KPSS Ortaöğretim (P94) Puan Hesaplama", url: "/kamu-sinavlari/kpss-ortaogretim-puan-hesaplama/",
    kw: ["kpss ortaöğretim puan hesaplama", "kpss p94 hesaplama", "lise kpss net"],
    aciklama: "GY-GK netlerinden tahmini KPSS P94 (ortaöğretim) puanını hesapla." },
  { id: "oabt",        cat: "kamu", ad: "ÖABT Puan Hesaplama",         url: "/kamu-sinavlari/oabt-puan-hesaplama/",
    kw: ["öabt puan hesaplama", "kpss p121 hesaplama", "öabt net"],
    aciklama: "ÖABT netlerinden tahmini P121 (öğretmenlik) puanını hesapla." },
  { id: "tus",         cat: "kamu", ad: "TUS Puan Hesaplama",          url: "/kamu-sinavlari/tus-puan-hesaplama/",
    kw: ["tus puan hesaplama", "tus net hesaplama", "tıpta uzmanlık puan"],
    aciklama: "Temel ve Klinik netlerinden tahmini TUS puanını hesapla." },
  { id: "dus",         cat: "kamu", ad: "DUS Puan Hesaplama",          url: "/kamu-sinavlari/dus-puan-hesaplama/",
    kw: ["dus puan hesaplama", "diş hekimliği uzmanlık puan"],
    aciklama: "DUS netlerinden tahmini uzmanlık puanını hesapla." }
];

/* Kategori → araç listesi (sidebar ve hub'lar için) */
window.PR_toolsByCat = function (catId) {
  return window.PR_TOOLS.filter(function (t) { return t.cat === catId; });
};
window.PR_catById = function (catId) {
  return window.PR_CATS.find(function (c) { return c.id === catId; });
};
window.PR_toolById = function (toolId) {
  return window.PR_TOOLS.find(function (t) { return t.id === toolId; });
};
