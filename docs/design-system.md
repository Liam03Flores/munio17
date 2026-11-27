# MUNIO 17 - Design System & Brand Guidelines

> **Proyecto:** Sitio web de MUNIO 17 (Modelo de las Naciones Unidas del Instituto Oriente, Puebla, 17ª edición)
> **Cliente:** Estudiantes organizadores del modelo
> **Propósito de este documento:** Fuente de verdad (design system y contexto maestro) para alimentar a otras IAs y desarrolladores en fases futuras. Leído junto con `architecture.md`, debe bastar para construir una subpágina nueva con la misma identidad.
> **Estado:** Home, Header, Footer, página de mantenimiento y error 404 publicados. Faltan Gallery, How to MUN, About Us, Committees, Register y Sign In.
> **Última actualización:** 21 de noviembre de 2026
> **Versión:** 1.4
> **Nota sobre colores:** Los HEX del logo son estimaciones visuales sobre imágenes aplanadas. Verificar con el archivo vectorial original antes de producción.

---

## 0. Resumen en 60 segundos (para quien construya una página nueva)

- **Idea:** un periódico diplomático, pero **sobrio y moderno**: fondo casi blanco, tinta azul marino, filetes finos, mucho aire. Lo "periódico" vive en la tipografía serif, los filetes y la jerarquía, **no** en texturas ni en adornos.
- **Colores:** `#FDFCF9` (fondo), `#151B4F` (tinta/acento), `#4B5078` (texto secundario), filete `rgb(21 27 79 / .32)`. Sin rojo, sin degradados, sin sombras pesadas.
- **Tipografía:** Libre Caslon Text (titulares y cuerpo) + Inter (menú, botones, etiquetas, enlaces, footer). Máximo 3 familias; blackletter solo opcional en mastheads.
- **Forma:** esquinas casi rectas (`0.25rem`), filetes de 1 px, fotos con esquinas apenas redondeadas, nada de píldoras.
- **Copy del sitio:** en inglés.
- **No hacer:** etiquetas pequeñas en mayúsculas sobre los títulos ("eyebrow/kicker"), texturas de papel, recolorear el logo, más de 3 familias, centrar todo (se alinea a la izquierda).
- **Técnica:** HTML → CSS → JS mínimo; solo `shared/js/`; rutas relativas; `data-root` correcto; ver `architecture.md` sección 11.

---

## 1. Concepto y Temática Central

### 1.1 Contexto del evento
- **Evento:** MUNIO 17, Modelo de las Naciones Unidas del Instituto Oriente (preparatoria, Puebla, México), 17ª edición.
- **Contexto del copy:** regresa tras cinco años; fechas en el hero: "Puebla, Mexico · Feb 8th, 9th & 10th" (2027, a confirmar con el cliente).
- **Audiencia:** estudiantes de preparatoria de distintas instituciones.
- **Idioma:** el sitio se escribe en **inglés**. Los pósters de referencia mezclan español e inglés.

### 1.2 Concepto central
**"Edición de prensa diplomática"**: el evento se comunica como un periódico ("Munio News", "Breaking News", "Special Edition") con titulares, columnas, filetes y fichas de corresponsales. Une el mundo ONU (diplomacia y prensa) con una identidad editorial, solemne y reconocible. En el sitio esa idea se traduce a un lenguaje **limpio y contemporáneo** (sección 2), no a una imitación literal de papel impreso.

### 1.3 Lema y valores
- **Lema oficial:** "Together for a stronger tomorrow"
- **Valores (banda de About Us):** Leadership · Diplomacy · Teamwork · Change
- **Mensaje de fondo:** la juventud se une para analizar, proponer y transformar el mundo.
- **Eslóganes secundarios:** "Prepárate para vivir una experiencia única"; "Enjoy the moment. This day only happens once a year."
- **Temática oficial de la edición:** _[pendiente]_

### 1.4 Tono y voz
- Formal pero cercano, inspiracional, en segunda persona.
- Vocabulario: debate, diplomacia, trabajo en equipo, desafíos globales, voz de la juventud.
- Biografías de delegados en primera persona, breves y positivas.
- Frases cortas; titulares que dicen algo ("Confidently move forward with smart answers" es el tipo de tono del wireframe de FAQ).

### 1.5 Pilares de marca
1. Diplomacia y debate
2. Juventud con voz propia
3. Aprendizaje y trabajo en equipo
4. Tradición editorial (prensa) como lenguaje visual

---

## 2. Dirección de Arte y Estética Visual

### 2.1 Jerarquía de referencias
1. **El logo "MUNIO XVII" y sus colores** (indicación del cliente): es lo más importante de la identidad.
2. **Reporter y The New Yorker** (referencias web): definen la **capa visual del sitio** (limpieza, tipografía, header, hero, filetes).
3. **Los pósters en blanco y negro (Imágenes 1 y 2)** y **las fichas de About Us y Committees**: aportan **espíritu editorial, estructura y lenguaje de periódico**, no color ni textura en el sitio web.
4. **MUNIO 16th**: solo contenido y código; **nunca** estilo.

### 2.2 Paleta (implementada en `styles/variables.css`)

| Token | HEX | Uso |
|-------|-----|-----|
| `--munio-navy` | `#151B4F` | Tinta: texto, filetes oscuros, botones, footer (fondo), acentos |
| `--munio-paper` | `#FDFCF9` | Fondo de todas las páginas (casi blanco cálido, sin textura) |
| `--munio-muted` | `#4B5078` | Texto secundario, bajadas, metadatos |
| `--munio-line` | `rgb(21 27 79 / 0.32)` | Filetes finos (1 px) |
| Placeholder | `#DDE1F0` / `#E6E8F2` | Fondos de imágenes provisionales (SVG integrados) |
| Texto invertido | `#FFFFFF` | Sobre el footer azul marino y botones rellenos |

- Los colores vivos de las fotos (naranja, amarillo, rojo) vienen del entorno fotografiado, **no** son paleta de marca.
- **No** hay acento rojo (el de Reporter y The New Yorker no se toma). El énfasis se logra con peso, tamaño y espacio.
- **Contraste:** azul marino sobre `#FDFCF9` supera AA con holgura; `--munio-muted` solo para texto no esencial y de tamaño legible (≥ 1rem).
- **Colores de las fichas originales (pergamino `#E6D9C6`, plata `#DAD6D3`, crema `#F4ECDD`, carbón `#3B332B`)**: se conservan como **referencia** para cuando el cliente pida una página con tratamiento de ficha. No están en tokens y **no** se usan por defecto.

```css
:root {
  --munio-navy:  #151B4F;
  --munio-paper: #FDFCF9;
  --munio-muted: #4B5078;
  --munio-line:  rgb(21 27 79 / 0.32);
  --font-serif:  "Libre Caslon Text", Georgia, "Times New Roman", serif;
  --font-sans:   "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --gutter:      clamp(1rem, 4vw, 2rem);
  --max-w:       75rem;
  --header-h:    4.25rem;           /* 4.75rem desde 56rem */
  --header-offset: calc(var(--header-h) + 1px);
  --radius-btn:  0.25rem;           /* en shared/css/components.css */
}
```

### 2.3 Tipografía

**Restricción del cliente: máximo 3 familias.** Decisión vigente:

| Rol | Familia | Se usa en |
|-----|---------|-----------|
| Titulares y cuerpo | **Libre Caslon Text** (regular y cursiva) | `h1`–`h3`, párrafos, bajadas, citas, preguntas del FAQ, títulos de sección |
| Interfaz | **Inter** (400–600) | Menú, botones, enlaces del header y footer, metadatos, fechas |
| Masthead (opcional) | Blackletter (UnifrakturCook o similar) | **Solo** cabeceras tipo periódico, si el cliente lo pide. No usar en texto largo |

- La sans condensada de los pósters (Anton/League Gothic/Bebas) se **pospone**: no está en el sitio.
- Carga: un solo `<link>` a Google Fonts con `Inter:wght@400..600` y `Libre+Caslon+Text:ital,wght@0,400;1,400` y `display=swap`.
- Escala fluida con `clamp()`; el h1 del hero es el elemento más grande de la página.
- **Patrones de la serif:** titulares en mayúsculas o frase normal según el bloque; cursiva para bajadas y eslóganes; versalitas/mayúsculas con tracking amplio solo en bandas decorativas (valores, idioma), **nunca** como etiqueta sobre un título.

### 2.4 Estilo gráfico (lenguaje visual implementado)

- **Filetes finos** de 1 px (`--munio-line`) para separar bloques; el header lleva un filete inferior. Es el recurso "periódico" más importante.
- **Alineación a la izquierda** en títulos y textos (se descartó centrar títulos de sección).
- **Aire:** secciones con mucho padding vertical; contenido en `max-width: 75rem` con `--gutter`.
- **Fotos:** a color, esquinas casi rectas, sin marcos ni sombras; proporciones fijas (3:2, 4:3, 4:5, 3:4) con `aspect-ratio` y `object-fit: cover`.
- **Botones:** rectángulo casi recto (`--radius-btn: 0.25rem`). Primario relleno azul marino; el secundario con contorno todavía está en píldora (999px) y **debe actualizarse** a `--radius-btn`.
- **Sin sombras, sin degradados, sin texturas, sin iconografía decorativa.** Iconos solo funcionales (redes sociales, lupa, "+").
- **Movimiento:** discreto y siempre con `prefers-reduced-motion`. Existen: acordeón del FAQ y marquesinas (sponsors, banderas).
- **Sin "eyebrow":** el cliente no quiere etiquetas pequeñas en mayúsculas sobre los títulos. Quedan algunas heredadas en Home (`card__meta`) que pueden retirarse.

### 2.5 Logo y emblemas
- **Logo principal "MUNIO XVII":** letras altas y condensadas con cortes internos (art déco), arco de globo con meridianos, rayos de sol, corona de laurel y "XVII" en serif. Azul marino. Posible acento en la U ("MÚNIO"): **verificar con el original**.
- **Emblema compacto** con laurel (playeras, Imagen 2). **Emblema por comité**: circular, laurel y globo + imagen + "[COMITÉ] MUNIO" (p. ej. "UNICEF MUNIO").
- En el sitio hoy: `logo-16.png` provisional en el header; versión blanca en el footer (fondo azul marino).
- **Reglas:** nunca recolorear (salvo la versión blanca oficial sobre azul marino); respetar espacio libre; usar SVG cuando exista; el logo del header lleva al Home.

### 2.6 Estilo fotográfico
- **Sitio (nuevo):** fotografía a color, natural, de eventos y delegados; recortes uniformes por sección. Sin tratamiento blanco y negro (queda como recurso de los pósters).
- **Committees (Imagen 4):** grupo a color con traje formal, enmarcado en blanco amplio en la ficha original.
- **About Us (Imagen 3):** retrato vertical, fondo neutro, marco crema en la ficha original.
- **Peso:** WebP/JPG ~1600 px, 100–300 KB. Placeholders SVG mientras no haya fotos reales.

### 2.7 Header, Hero y secciones de Home (implementado)

**Header (sticky):** logo (Home) a la izquierda · Gallery · How to MUN · About Us · Committees al centro, **separados por puntos "·"** · lupa + botón Sign In a la derecha · filete fino inferior. Sans (Inter) pequeña. Menú móvil con `popover` nativo; en el menú móvil van también Instagram y TikTok (icono + `@munio.official`). La página actual se marca con `aria-current` (subrayado discreto); en la página de mantenimiento ninguna se subraya.

**Hero:** imagen a la izquierda (3:2, hoy placeholder) y bloque de texto a la derecha centrado verticalmente: titular serif, byline con lugar y fechas, bajada breve; filete inferior. Inspirado en The New Yorker. Hay una banda de redes sociales (Follow us) grande en laptop.

**Secciones de Home, en orden:**
1. Hero.
2. Franja de redes (Instagram y TikTok).
3. **More about our model:** título a la izquierda, grilla editorial de tarjetas (en laptop mezcla tamaños; en teléfono 1-2-2). Inspirada en la maqueta de revista polaca y en "Top News" de Reporter.
4. **Register CTA:** texto + botón centrado, sin foto.
5. **Mission / Vision:** dos columnas, 3 oraciones cada una.
6. **FAQs:** título y texto a la izquierda, acordeón a la derecha con "+" que gira a "×", animación suave en CSS.
7. **Our sponsors:** título grande y marquesina de logos.
8. Footer.

**Footer:** fondo azul marino, partido en dos mitades (MUNIO: logo blanco, Instagram, TikTok, aviso de privacidad | Instituto Oriente: logo, Instagram, Facebook, aviso de privacidad); iconos sin círculo; menos alto en laptop; en teléfono, más ancho y menos alto. Misma tipografía sans del sitio.

**Maintenance:** header y footer normales; fila de 20 banderas que se desplaza a la derecha, texto centrado con redes y botón "Motion to continue browsing", segunda fila de banderas que se desplaza a la izquierda; el footer queda debajo del primer pantallazo.

**Error 404:** texto a la izquierda y ilustración/foto a la derecha (en teléfono: texto primero, imagen al 85 %); mismo botón; sin "ERROR 404" en etiqueta.

---

## 3. Catálogo de componentes (reutilizables)

| Componente | Clases clave | Cuándo reutilizarlo |
|------------|--------------|---------------------|
| Botón primario | `.btn-primary` (`components.css`) | Cualquier acción principal |
| Botón contorno | `.btn-outline` (pendiente pasar a `--radius-btn`) | Acción secundaria (Sign In) |
| Filete | `border-top: 1px solid var(--munio-line)` | Separar bloques |
| Título de sección | `h2` serif a la izquierda, sin etiqueta encima | Cada sección |
| Tarjeta con foto | foto con `aspect-ratio` + título serif + texto muted | Listas de contenido |
| Acordeón | `<details>` + `<summary>` con "+" y `::details-content` | FAQ y contenido plegable |
| Marquesina | lista duplicada con segunda copia `aria-hidden`, pausa en hover/focus | Logos, banderas |
| Banda de redes | iconos Instagram/TikTok con enlace externo (`rel="noopener"`) | Cierre de secciones o páginas |

Reglas de accesibilidad comunes: un `h1` por página, enlace "skip to content", `alt` en imágenes, foco visible, `prefers-reduced-motion`, contraste AA, área táctil ≥ 44 px.

---

## 4. Comprensión de las imágenes de referencia

Cada referencia se explica con **qué es**, **qué entendimos** y **cómo se aplica**.

### 4.1 Pósters en blanco y negro (Home)

**Imagen 1 — "Munio News" (vertical 3:4, B/N).** Cabecera con "MUNIO 17" y "2027"; masthead blackletter con "MUNIO" en script; filete; dos columnas separadas por regla vertical: izquierda con etiqueta negra "NOTICIA EXCLUSIVA", titular condensado "GRAN EVENTO", eslogan en cursiva y foto enmarcada de banderas; derecha con tres párrafos justificados en español invitando a la 17ª edición tras cinco años.
- **Entendimos:** la identidad es de **periódico**: masthead, etiqueta, titular, columnas con regla vertical.
- **Se aplica:** estructura de columnas con filetes, jerarquía titular → bajada → cuerpo, banderas como motivo (maintenance usa banderas). **No** se toman: blackletter por defecto, etiqueta negra, justificado.

**Imagen 2 — "Breaking News / Special Edition · ORIENTE" (B/N).** Header preferido por el cliente: "Special Edition" en cursiva a la izquierda y "ORIENTE" a la derecha entre filetes; masthead blackletter; doble filete; fila 1: dos fotos apiladas y titular condensado "THE BEST MUNIO EVER SEEN"; fila 2: texto a la izquierda y foto a la derecha (playeras con logo de laurel); barra negra de ancho completo en el pie con frase en cursiva.
- **Entendimos:** al cliente le gusta la **alternancia imagen/texto** y el **pie** con frase de cierre.
- **Se aplica:** alternar lado de la foto entre bloques consecutivos; cerrar con una franja de color sólido (el footer azul marino cumple ese papel). El header de Reporter sustituyó al de esta imagen.

### 4.2 Fichas del logo (colores y espíritu)

**Imagen 3 — Ficha de integrante (About Us).** Papel pergamino, banda superior "LEADERSHIP · DIPLOMACY · TEAMWORK · CHANGE" entre filetes, nombre en negrita cursiva, biografía en primera persona, logo "MUNIO XVII", retrato vertical con marco crema tipo polaroid y lema "TOGETHER FOR A STRONGER TOMORROW".
- **Entendimos:** de aquí salen **los colores y la forma del logo**; la ficha es una **tarjeta con banda superior, texto a la izquierda, foto a la derecha y lema al pie**.
- **Se aplica:** About Us puede usar esta composición **sobre fondo `--munio-paper`** (sin textura): banda de valores con filetes, nombre en serif cursiva, foto vertical, lema. Los colores del logo ya son los del sitio.

**Imagen 4 — Ficha de comité UNICEF (Committees).** Papel plata arrugado, banda "FRANÇAIS · FRANÇAIS ·" (idioma de trabajo, estilo teletipo), título con filetes, foto grupal a color en marco blanco, dos emblemas (MUNIO XVII y UNICEF MUNIO) y lema.
- **Entendimos:** todos los comités comparten **un formato idéntico**; la banda indica el idioma.
- **Se aplica:** una tarjeta por comité con la misma estructura (banda de idioma, título, foto, emblemas). El fondo es el del sitio, no plata.

### 4.3 Referencias web

**Imagen 5 — The New Yorker.** Foto grande a la izquierda y texto serif display a la derecha, centrado verticalmente, con filetes finos.
- **Se aplica:** composición del **hero** y de bloques "imagen + texto"; filetes finos. **No** se toma el header, el banner ni el rojo.

**Imagen 6 — Reporter (plantilla web).** Header con logo a la izquierda, navegación pequeña al centro, botón con contorno, lupa y menú; fondo casi blanco cálido; grilla "Top News" con una nota grande y cuatro pequeñas, con fecha y titular debajo de cada foto.
- **Se aplica:** **header**, tono sutil y tipografía sans de interfaz, color de fondo, y la idea de **1 elemento grande + elementos pequeños** para la grilla. **No** se toma la etiqueta roja.

**Imagen 7 — MUNIO 16th (sitio anterior).** Franjas azules degradadas, logo centrado, hero con formas geométricas azules y titular "WE ARE WAITING FOR YOU…".
- **Se aplica:** solo **contenido y código** (textos, estructura de enlaces). **No** es referencia de estilo: es justo lo que se quiere dejar atrás.

### 4.4 Maquetas y bocetos del desarrollador

- **Revista polaca (maqueta "Kalendarium Designu"):** una foto alta con texto bajo ella, un título con mapa, y debajo tres tarjetas con foto, título y texto corto, separadas por filetes finos verticales/horizontales. → inspira la **grilla de "More about our model"**: dos tarjetas medianas y tres pequeñas, con filetes.
- **Boceto "Free tool or resource":** tarjeta con título, dos líneas de texto, botón "DOWNLOAD +" con contorno y una imagen a la derecha (recuadro con X). → patrón de **tarjeta de acción**: texto a la izquierda, imagen a la derecha, botón con "+" (Register CTA y futuras descargas, p. ej. guías de How to MUN).
- **Maqueta FAQ:** título a la izquierda con dos líneas, acordeón de preguntas con "+" a la derecha y un bloque con titular y texto breve. → **FAQ implementado**: título y texto a la izquierda, acordeón a la derecha.
- **Boceto de footer:** partido en dos mitades (MUNIO | colegio), cada una con logo, redes y aviso de privacidad. → **footer implementado**.
- **Boceto de mantenimiento:** fila de banderas hacia la derecha, texto centrado con redes y botón, fila de banderas hacia la izquierda, footer bajo el primer pantallazo. → **maintenance implementado**.
- **Boceto de 404:** imagen a la izquierda y texto alineado a la izquierda a la derecha, mismo botón. → implementado con la imagen a la derecha (decisión posterior del cliente).

---

## 5. Cómo construir una subpágina nueva (guía para IA y desarrolladores)

Objetivo: una página que **se sienta del mismo sitio** sin repetir la estructura de Home.

**Hacer**
1. Seguir `architecture.md` sección 11 (archivos, `data-root`, slots de header/footer, orden de CSS).
2. Abrir con un `h1` serif grande a la izquierda, bajada en `--munio-muted` y un filete. Sin etiqueta encima.
3. Usar el ritmo: secciones separadas por filetes y padding amplio; contenido dentro de `--max-w`.
4. **Variar la composición** según el contenido: lista editorial, ficha, línea de tiempo, mosaico, columnas con filete vertical. No clonar el hero imagen+texto en cada página.
5. Elegir **un** elemento protagonista por pantalla (una foto grande, un titular, una tabla) y dejar aire alrededor.
6. Reutilizar `.btn-primary`, acordeón, tarjeta con foto y banda de redes antes de crear algo nuevo.
7. Probar a 360 px, 768 px y 1280 px; con teclado; con `prefers-reduced-motion`.

**No hacer**
- Etiquetas pequeñas en mayúsculas sobre títulos.
- Texturas de papel, sombras, degradados, píldoras, rojo.
- Más de 3 familias tipográficas; usar sans para titulares o serif para el menú.
- Centrar bloques de texto largos (títulos de sección van a la izquierda).
- Copiar el estilo de MUNIO 16th.
- Añadir JavaScript si HTML/CSS lo resuelve, o poner JS fuera de `shared/js/`.
- Rutas que empiezan con `/`.

**Ideas de composición por página (sin romper la identidad)**
| Página | Idea |
|--------|------|
| About Us | Fichas de equipo (Imagen 3) sobre fondo del sitio, banda de valores con filetes |
| Committees | Tarjetas idénticas por comité (Imagen 4): idioma, nombre, foto, emblema |
| Gallery | Mosaico de fotos con proporciones fijas y pies de foto en serif cursiva |
| How to MUN | Artículo editorial por secciones con filetes, glosario plegable (acordeón) y tarjetas de descarga |
| Register | Pasos numerados, precio, botón primario y FAQ breve |
| Sign In | Formulario simple, campos con contorno de 1 px, botón primario |

---

## 6. Restricción de arquitectura por menú (vigente)

> El cliente pidió **no modificar la arquitectura de secciones ni el UI/UX de cada menú** definidos; las referencias son capa estética. Si algo implica un cambio estructural, se consulta antes.

| Menú | Estado | Referencia estética |
|------|--------|---------------------|
| Home | ✅ Publicado | Secciones 2.7 y 4 |
| Committees | ⏳ Pendiente (mantenimiento) | Imagen 4 |
| About Us | ⏳ Pendiente (mantenimiento) | Imagen 3 |
| Gallery | ⏳ Pendiente (mantenimiento) | Tokens y fotos globales |
| How to MUN | ⏳ Pendiente (mantenimiento) | Tokens y tipografías globales |
| Register / Sign In | ⏳ Pendiente (mantenimiento) | Tokens, botones y formularios sobrios |

---

## 7. Guías de activos y procesamiento visual

### 7.1 Registro de lotes recibidos
| Lote | Fecha | Activos | Estado |
|------|-------|---------|--------|
| 1 | 2026-11-14 | Pósters 1 y 2, fichas 3 y 4 | ✅ |
| 2 | 2026-11-17 | The New Yorker, Reporter, MUNIO 16th | ✅ |
| 3 | 2026-11-17/18 | Maquetas y bocetos (Home, FAQ, tarjeta de acción, footer, maintenance, 404) | ✅ |

### 7.2 Reglas de uso de activos
- **Formatos:** pedir logo en SVG/AI/PDF, logos de comités, fotos originales sin IA.
- **Peso:** WebP/JPG ~1600 px, 100–300 KB, antes de subir al repositorio. Originales en `zz_moodboard/` (ignorada por git).
- **Nomenclatura:** kebab-case en minúsculas.
- **Accesibilidad:** `alt` en todas las imágenes; contraste AA; evitar blackletter en textos largos.
- **Privacidad:** las fichas muestran estudiantes reales (posibles menores): confirmar permiso de imagen y datos con ellos y sus tutores antes de publicar.
- **Licencias:** banderas de `flag-icons` (licencia incluida en `pages/maintenance/images/flags/`).

### 7.3 Preguntas abiertas y pendientes con el cliente
1. Confirmar año real y fechas (2027, Feb 8–10).
2. Acento en "MÚNIO" del logo y logo vectorial del 17.
3. ¿La banda superior del comité es el idioma de trabajo?
4. Textos y datos reales: número de delegados, ponentes, costo de registro, correo de contacto, "16 years" en Vision (¿17?), logos de patrocinadores.
5. Fotos reales de hero, secciones, 404 y comités.
6. Aviso de privacidad de MUNIO.
7. Referencias para Gallery, How to MUN y Sign In.
8. ¿Se mantiene el blackletter como masthead opcional?
9. Control de pausa en marquesina de sponsors (WCAG 2.2.2).

---

## Registro de cambios
| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.4 | 2026-11-21 | Reescritura tras publicar el sitio: paleta y tipografía reales (`#FDFCF9`, serif + sans, blackletter opcional), lenguaje visual implementado, catálogo de componentes, regla "sin eyebrow", botones casi rectos, comprensión de cada imagen de referencia y de los bocetos, guía para construir subpáginas, estado por menú, pendientes del cliente |
| 1.3 | 2026-11-17 | Home visible en el menú de escritorio; secciones de Home; hero con byline y video comentado; filetes más oscuros |
| 1.2 | 2026-11-17 | Decisiones de Header y Hero confirmadas; entrega en un solo archivo |
| 1.1 | 2026-11-17 | Activos 5 a 7 (New Yorker, Reporter, MUNIO 16th); sección Header y Hero |
| 1.0 | 2026-11-14 | Activos 2, 3 y 4; paleta desde el logo; tokens; mapa de referencias; preguntas abiertas |
| 0.2 | 2026-11-14 | Activo 1 (póster "Munio News") |
| 0.1 | 2026-11-14 | Estructura base creada |