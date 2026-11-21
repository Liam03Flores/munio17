# MUNIO XVII

Sitio web oficial del **Modelo de Naciones Unidas del Instituto Oriente (MUNIO XVII)**, Puebla, México.

**Sitio:** https://liam03flores.github.io/munio17/

## Estado
En construcción. Disponibles: Home, página de mantenimiento y página 404. El resto de las secciones
(Gallery, How to MUN, About Us, Committees, Sign In, Register) llevan temporalmente a `pages/maintenance/`.

## Tecnologías
HTML5, CSS3 y JavaScript mínimo, sin frameworks ni paso de compilación. Se publica en GitHub Pages.

## Cómo verlo en local
El header y el footer se cargan con `fetch`, así que **no funciona abriendo el archivo con doble clic**
(`file://`). Usa una de estas opciones desde la raíz del proyecto:

- Extensión **Live Server** o **Live Preview** de VS Code.
- `python -m http.server 3000` y abre http://localhost:3000

Para probar `404.html` en local, cambia temporalmente `<base href="/munio17/">` a `<base href="/">`
y devuélvelo antes de hacer commit.

## Estructura

404.html Página de error (debe estar en la raíz para GitHub Pages)
index.html Home
assets/ Logos e imágenes globales
pages/<feature>/ Cada página con su .html, .css e images/
shared/components/ header.html y footer.html (se insertan con include.js)
shared/css/ Estilos del header, footer y componentes reutilizables
shared/js/ Todo el JavaScript del sitio
styles/ Variables (tokens de diseño) y estilos globales
docs/ Documentación del proyecto

Convenciones: nombres en `kebab-case`, rutas relativas, JavaScript solo en `shared/js/`.

## Documentación
- [`docs/design-system.md`](docs/design-system.md): identidad visual y tokens.
- [`docs/architecture.md`](docs/architecture.md): estructura y decisiones técnicas.

## Créditos
- Banderas: [flag-icons](https://github.com/lipis/flag-icons), licencia MIT
(ver `pages/maintenance/images/flags/LICENSE-flag-icons.txt`).
- Fuentes: Inter y Libre Caslon Text (Google Fonts).
- Fotografías y logos: © equipo organizador de MUNIO / Instituto Oriente.

## Contacto
Redes: [@munio.official](https://www.instagram.com/munio.official/) en Instagram y TikTok.