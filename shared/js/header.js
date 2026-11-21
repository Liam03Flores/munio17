/* shared/js/header.js
   Funciones del header global. Cargado por: todas las páginas (con defer).
   1) Polyfill del popover: se descarga SOLO si el navegador no lo soporta
      (el menú móvil y el panel de búsqueda usan el atributo nativo `popover`).
   2) Buscador: filtra la lista de páginas mientras se escribe.
   Depende de: shared/js/include.js (el header se inserta después de cargar la página;
   por eso el buscador se inicia con el evento `components:loaded`) y de
   shared/components/header.html (ids #site-search y #site-menu). */

// 1) Polyfill del popover (no depende del header)
if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
  import('https://unpkg.com/@oddbird/popover-polyfill@0.7.3/dist/popover.min.js');
}

// 2) Búsqueda: se inicia cuando include.js ya insertó el header
document.addEventListener('components:loaded', () => {
  const search = document.getElementById('site-search');
  if (!search) return;

  const form = search.querySelector('form');
  const input = search.querySelector('input');
  const items = [...search.querySelectorAll('.search__item')];
  const empty = search.querySelector('.search__empty');
  const status = document.getElementById('site-search-status');
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const filter = () => {
    const q = normalize(input.value);
    let visible = 0;
    for (const li of items) {
      const match = !q || normalize(`${li.textContent} ${li.dataset.keywords ?? ''}`).includes(q);
      li.hidden = !match;
      if (match) visible++;
    }
    empty.hidden = visible > 0;
    status.textContent = q ? `${visible} result${visible === 1 ? '' : 's'}` : '';
  };

  input.addEventListener('input', filter);

  // Enter abre el primer resultado visible
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    const first = items.find((li) => !li.hidden);
    if (first) location.href = first.querySelector('a').href;
  });

  // Al cerrar el panel, limpia la búsqueda
  search.addEventListener('toggle', (e) => {
    if (e.newState === 'closed') { input.value = ''; filter(); }
  });
});