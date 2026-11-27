/* shared/js/about-us.js
   Dos comportamientos de About Us que HTML/CSS no resuelven solos:
   1) High Commands: la portada pasa a video al pulsar play; en pantallas táctiles, un toque muestra la información de cada foto.
   2) Carrusel de Sub-High Commands: botones anterior/siguiente (el deslizamiento y el "snap" son CSS nativo).
   No hay animaciones ligadas al scroll. Cargado por: pages/about-us/about-us.html (con defer). */

(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. High Commands ---------- */
  const leaders = document.querySelector('[data-leaders]');
  if (leaders) {
    // Portada: al pulsar play se reemplaza por el video (ruta en data-video del .hcover) o por un aviso si aún no hay video
    const cover = leaders.querySelector('.hcover');
    cover.querySelector('.hcover__play').addEventListener('click', (e) => {
      const src = cover.dataset.video;            // Cuando haya video: data-video="../../assets/video/high-command.mp4"
      if (!src) { cover.querySelector('.hcover__note').hidden = false; return; }
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      cover.querySelector('.hcover__img').remove();
      e.currentTarget.remove();
      cover.append(video);
    });

    // Táctil: un toque muestra/oculta la información de cada foto (en escritorio basta hover o foco)
    if (matchMedia('(hover: none)').matches) {
      leaders.querySelectorAll('.hcard').forEach((card) => {
        card.addEventListener('click', () => card.classList.toggle('is-open'));
      });
    }
  }

  /* ---------- 2. Carrusel ---------- */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.subhc__track');
    const slides = [...track.children];
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    const step = () => slides[1].offsetLeft - slides[0].offsetLeft;
    const update = () => {
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    };
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: calm.matches ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();