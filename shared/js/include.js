/* shared/js/include.js
   Cargador de componentes HTML (header, footer...).
   Cómo funciona: cada página tiene huecos como
       <div data-include="shared/components/header.html"></div>
   y este script descarga ese archivo, reemplaza {{root}} por la ruta a la raíz del sitio
   y sustituye el hueco por el contenido. Al terminar, avisa con el evento `components:loaded`.
   Cada página debe declarar su profundidad en <html data-root="...">:
       index.html -> "./"        pages/<feature>/<pagina>.html -> "../../"
   Importante: fetch NO funciona con file:// (abrir el archivo directo). Usa Live Server o
   el launch.json de VS Code. En GitHub Pages funciona normal.
   Cargado por: todas las páginas (con defer). */

(async () => {
  if (location.protocol === 'file:') {
    console.warn('include.js: abriste con file://; el header no cargará. Usa Live Server o python -m http.server.');
  }
  const root = document.documentElement.dataset.root ?? './';
  const slots = document.querySelectorAll('[data-include]');

  await Promise.all([...slots].map(async (slot) => {
    const url = root + slot.dataset.include;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = (await res.text()).replaceAll('{{root}}', root);
      slot.outerHTML = html;           // outerHTML: el header queda directo en <body> (necesario para position: sticky)
    } catch (err) {
      console.error(`include.js: no se pudo cargar ${url}`, err);
    }
  }));

  // Marca la página actual en el menú (aria-current="page")
  const clean = (path) => path.replace(/index\.html$/, '').replace(/\/$/, '');
  const here = clean(location.pathname);
  for (const link of document.querySelectorAll('.site-nav__link')) {
    if (clean(new URL(link.href).pathname) === here) link.setAttribute('aria-current', 'page');
  }

  document.dispatchEvent(new Event('components:loaded'));
})();
