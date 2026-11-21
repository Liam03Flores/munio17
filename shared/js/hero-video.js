/* shared/js/hero-video.js  (INACTIVO: aún no hay video)
   Hero de Home: la imagen se ve 3 s y luego arranca el video encima.
   Para activarlo:
     1) Descomentar el <video> dentro de <figure class="hero__media"> en index.html.
     2) Descomentar el CSS ".hero__video" en pages/home/home.css.
     3) Agregar en index.html, antes de </body>:
        <script src="shared/js/hero-video.js" defer></script>
   Requisitos: el video debe ir muted + playsinline para que el autoplay funcione.
   Accesibilidad (WCAG 2.2.2): si dura más de 5 s, añadir un botón de pausa.
   Depende de: index.html (solo Home). */

(() => {
  const media = document.querySelector('.hero__media');
  const video = media?.querySelector('.hero__video');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!video || reduceMotion) return;

  setTimeout(() => {
    video.play().then(() => media.classList.add('is-playing')).catch(() => {});
  }, 3000);

  video.addEventListener('ended', () => media.classList.remove('is-playing'));
})();
