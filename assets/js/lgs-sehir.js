'use strict';
/* Şehir taban puan tablosu: başlığa tıklayınca sırala */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var tablo = document.getElementById('sehir-tablo');
    if (!tablo) return;
    var govde = tablo.querySelector('tbody');
    var yon = {};

    tablo.querySelectorAll('th.sirala').forEach(function (th) {
      th.addEventListener('click', function () {
        var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
        var tip = th.getAttribute('data-tip') || 'yazi';
        yon[idx] = yon[idx] === 'artan' ? 'azalan' : 'artan';
        var satirlar = Array.prototype.slice.call(govde.rows);
        satirlar.sort(function (a, b) {
          var va = a.cells[idx].getAttribute('data-deger') || a.cells[idx].textContent;
          var vb = b.cells[idx].getAttribute('data-deger') || b.cells[idx].textContent;
          var fark;
          if (tip === 'sayi') {
            fark = parseFloat(va) - parseFloat(vb);
          } else {
            fark = va.toLocaleCompare(vb, 'tr');
          }
          return yon[idx] === 'artan' ? fark : -fark;
        });
        satirlar.forEach(function (s) { govde.appendChild(s); });
        tablo.querySelectorAll('th.sirala').forEach(function (h) {
          h.textContent = h.textContent.replace(/ [▲▼]$/, '');
        });
        th.textContent += yon[idx] === 'artan' ? ' ▲' : ' ▼';
      });
    });
  });
}
