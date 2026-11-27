# MUNIO XVII — Architecture Guide

**Project:** MUNIO XVII Website  
**Institution:** Instituto Oriente, Puebla, Mexico  
**Architecture:** Feature-Based + Shared Components + Hybrid Assets  
**Stack:** HTML5, CSS3, Minimal JavaScript  
**Deployment:** GitHub Pages (`https://liam03flores.github.io/munio17/`)  
**Repository:** `https://github.com/Liam03Flores/munio17`  
**Status:** Approved  
**Version:** 1.2  
**Last updated:** November 21, 2026

---

## 1. Architecture Overview

MUNIO XVII follows a Feature-Based architecture designed to keep the project organized, maintainable, and easy to debug.

The website is divided into five responsibilities:

1. **Pages:** Independent website sections and their resources.
2. **Shared:** Reusable components, their CSS, and all JavaScript.
3. **Assets:** Shared visual resources.
4. **Styles:** Global visual foundations (design tokens).
5. **Docs:** Technical documentation and design references.

It is a static website: HTML5, CSS3, and minimal JavaScript. No frontend framework, no build step.

## 2. Current Directory Structure

```text
MUNIO_website/
│
├── .vscode/
│   └── launch.json
│
├── assets/                      (shared logos and images; optimized, see section 6)
│   ├── elements/
│   ├── logos/
│   └── logo-16.png ...          (provisional logos)
│
├── docs/
│   ├── references/              (light references only; heavy files stay in zz_moodboard/)
│   ├── architecture.md
│   ├── design-system.md         (this project's M_17_Design.md)
│   └── notes.md
│
├── pages/
│   ├── error-404/
│   │   └── error-404.css        (no HTML: the page is the root 404.html)
│   ├── maintenance/
│   │   ├── images/flags/        (20 SVG flags + LICENSE-flag-icons.txt)
│   │   ├── maintenance.css
│   │   └── maintenance.html
│   ├── home/
│   │   ├── images/
│   │   └── home.css             (its HTML is the root index.html)
│   ├── gallery/                 (planned: gallery.html, gallery.css, images/)
│   ├── how-to-mun/              (planned)
│   ├── about-us/                (planned)
│   ├── committees/              (planned)
│   ├── register/                (planned: register.html)
│   └── sign-in/                 (planned)
│
├── shared/
│   ├── components/
│   │   ├── header.html
│   │   └── footer.html
│   ├── css/
│   │   ├── components.css       (shared UI pieces: .btn-primary, --radius-btn)
│   │   ├── header.css
│   │   └── footer.css
│   └── js/
│       ├── include.js           (loads header/footer into the page)
│       ├── header.js            (popover polyfill + search)
│       └── hero-video.js        (inactive; hero video is commented out)
│
├── styles/
│   ├── variables.css            (design tokens; linked by every page)
│   ├── global.css               (empty, not linked yet)
│   └── typography.css           (empty, not linked yet)
│
├── zz_moodboard/                (IGNORED by git: references, originals, PDFs)
├── zz_munio16/                  (IGNORED by git: previous edition's code)
├── zz_sandbox/                  (IGNORED by git: tests and scratch files)
│
├── .gitignore
├── 404.html                     (root; required by GitHub Pages)
├── index.html                   (Home)
└── README.md
```

**Rules for this tree**

- Folders marked *planned* do not exist until their page is built. Do not create empty folders.
- `zz_*` folders are local only. Nothing in the website may reference a file inside them. They have **no backup in GitHub**: keep an external copy.
- `docs/` can hold lightweight Markdown; heavy references (PDFs, large images) live in `zz_moodboard/`.

## 3. Directory Responsibilities

### 3.1 Root

- `index.html`: Home page and main entry point.
- `404.html`: Error page. It must be in the root: GitHub Pages serves it automatically for any missing URL. See section 9.
- `README.md`: Project introduction and run/deploy instructions.
- `.gitignore`: lists `zz_moodboard/`, `zz_munio16/`, `zz_sandbox/`.

### 3.2 assets/

Shared visual resources used by several sections (logos, brand elements). Feature-only images go in that feature's `images/`. Do not duplicate identical files.

### 3.3 pages/

Each feature owns its HTML, its CSS and its exclusive images. Exceptions: Home (HTML is root `index.html`) and Error 404 (HTML is root `404.html`). Features must not contain resources that belong to another feature.

**JavaScript exception:** no JS inside page folders; all JS is in `shared/js/`.

### 3.4 shared/

- `components/`: `header.html`, `footer.html` (single canonical copy each).
- `css/`: `header.css`, `footer.css`, `components.css`.
- `js/`: only `.js` files, each documented with purpose and dependent pages.

### 3.5 styles/

- `variables.css`: design tokens (colors, fonts, spacing). Loaded first on every page.
- `global.css`, `typography.css`: reserved; currently empty and not linked. Link them only when they hold real rules.

### 3.6 docs/

Technical documentation. Update it when an architectural decision changes.

---

## 4. JavaScript Policy — Minimal JavaScript

Priority order: **1) native HTML, 2) CSS, 3) JavaScript**. If HTML or CSS can solve it, do not add JavaScript.

All JS lives in `shared/js/`. Do not create `pages/<feature>/<feature>.js`. Avoid libraries and dependencies; the only external script is the popover polyfill (pinned version, section 5.3).

Current JS and what depends on it:

| File | Purpose | Pages |
|---|---|---|
| `include.js` | Loads header and footer into the slots | Every page |
| `header.js` | Popover polyfill for old browsers + page search | Every page (after `components:loaded`) |
| `hero-video.js` | Hero image → video (inactive) | Home (commented out) |

The website must stay maintainable by developers with limited JavaScript experience.

---

## 5. Header, Footer and Component Loading

### 5.1 Canonical components

- `shared/components/header.html` and `footer.html`: one copy each.
- Styles in `shared/css/`. Behavior in `shared/js/`.
- The Home Hero is **not** a shared component; it belongs to Home.

### 5.2 How a page includes them (adopted: loader, option A)

Every page has two empty slots and a `data-root` attribute on `<html>`:

```html
<html lang="en" data-root="./">          <!-- root pages -->
<html lang="en" data-root="../../">      <!-- pages/<feature>/ pages -->
...
<div data-include="header"></div>
...
<div data-include="footer"></div>
<script src="shared/js/include.js" defer></script>
```

`include.js`:

1. Reads `data-root` from `<html>`.
2. `fetch`es `shared/components/header.html` and `footer.html`.
3. Replaces every `{{root}}` in the fetched HTML with the `data-root` value, so the same links work from any depth.
4. Replaces each slot with the component (`outerHTML`), marks the current page with `aria-current="page"`, and dispatches `components:loaded`.

Consequences:

- **It needs a server.** Opening a page with `file://` fails (fetch is blocked). Use VS Code Live Preview or `python -m http.server`.
- Components are inserted by JavaScript, so any script that touches them (`header.js`) waits for `components:loaded`.
- All links inside components must be written as `{{root}}path/to/page.html`, never `/path` and never `../`.

### 5.3 Header behavior

- Sticky. Logo (Home) left · Gallery · How to MUN · About Us · Committees centered, separated by dots · search + Sign In right.
- Mobile menu and search use the native `popover` attribute. `header.js` loads `@oddbird/popover-polyfill@0.7.3` (pinned) for older browsers.
- Instagram and TikTok are inside the mobile menu and in the footer, not in the desktop header.

### 5.4 Footer

Two halves (MUNIO | Instituto Oriente), each with its logo, social links and privacy notice, on a navy background. The MUNIO privacy notice is temporarily commented out and replaced by a "404 page (temporary)" link.

---

## 6. Asset Management Rules

Hybrid assets: shared in `assets/`, exclusive in `pages/<feature>/images/`.

1. Do not duplicate identical images.
2. Use descriptive kebab-case names.
3. Verify references after moving files.
4. **Size limit:** compress before adding to the repo. WebP or JPG, about 1600 px on the long side, 100–300 KB. Prefer SVG for logos and icons.
5. **Never commit** originals, PSD/AI, videos or PDFs. They stay in `zz_moodboard/` or an external drive.
6. Every `<img>` has `alt`, `width`, `height`, and `loading="lazy"` unless it is above the fold.

Why: the first push was 402 MiB because originals were tracked. After moving them to ignored folders and resetting history, the repository weighs under 200 KiB. Keep it that way.

---

## 7. CSS Architecture

| Layer | Location | Responsibility |
|---|---|---|
| Tokens | `styles/variables.css` | Colors, fonts, gutter, max width, header height |
| Shared components | `shared/css/` | Header, footer, buttons and other reusable UI |
| Feature | `pages/<feature>/<feature>.css` | Only that page |

Load order in every page `<head>`: `variables.css` → `header.css` → `footer.css` → `components.css` → page CSS.

Rules:

- Use tokens (`var(--munio-navy)`), never repeated hex values.
- Do not define the same component in two files (a duplicate `.btn-primary` once caused a conflict).
- BEM-like class names: `block__element--modifier` (`faq__item`, `site-nav__item`).
- Mobile first; breakpoints with `min-width` in `rem` (`56rem` is the desktop switch).
- Respect `prefers-reduced-motion` for every animation.

Current tokens:

```css
--munio-navy:  #151B4F;               /* ink and accent */
--munio-paper: #FDFCF9;               /* page background */
--munio-muted: #4B5078;               /* secondary text */
--munio-line:  rgb(21 27 79 / 0.32);  /* thin rules */
--font-serif:  "Libre Caslon Text", Georgia, serif;
--font-sans:   "Inter", system-ui, sans-serif;
--gutter:      clamp(1rem, 4vw, 2rem);
--max-w:       75rem;
--header-h:    4.25rem;  /* 4.75rem from 56rem up */
--radius-btn:  0.25rem;  /* in components.css */
```

---

## 8. Naming Conventions

`kebab-case` for every folder and file (`about-us.html`, `site-navigation.js`, `munio-logo.svg`). Hyphens are the URL convention and are read as word separators.

- GitHub Pages is **case-sensitive**: `Logo_IO.png` ≠ `logo_io.png`. Use lowercase for new files.
- Renaming existing files is done in a dedicated task with every reference updated. Pending: `Logo_IO.png`, `logo_MUNIO.png`.
- CSS classes: lowercase, hyphen and BEM underscores (`block__element`).

---

## 9. Routing, GitHub Pages and the 404 page

### 9.1 Subpath rule

The site lives under `/munio17/`, not at the domain root. **Never use paths starting with `/`** in components or pages; use relative paths evaluated from the file that contains them.

| From | To | Path |
|---|---|---|
| `index.html` | Gallery | `pages/gallery/gallery.html` |
| `pages/gallery/gallery.html` | Home | `../../index.html` |
| `pages/gallery/gallery.html` | Header CSS | `../../shared/css/header.css` |
| `header.html` (any page) | Gallery | `{{root}}pages/gallery/gallery.html` |

### 9.2 Route table

| Route | File | Status | Notes |
|---|---|---|---|
| `/` | `index.html` | Built | Home |
| any missing URL | `404.html` | Built | Served by GitHub Pages |
| `/pages/maintenance/maintenance.html` | `pages/maintenance/maintenance.html` | Built | "Under construction" page |
| `/pages/gallery/gallery.html` | — | Planned | Points to maintenance for now |
| `/pages/how-to-mun/how-to-mun.html` | — | Planned | Points to maintenance for now |
| `/pages/about-us/about-us.html` | — | Planned | Points to maintenance for now |
| `/pages/committees/committees.html` | — | Planned | Points to maintenance for now |
| `/pages/register/register.html` | — | Planned | Points to maintenance for now |
| `/pages/sign-in/sign-in.html` | — | Planned | Points to maintenance for now |
| Privacy notice | external | Temporary | MUNIO notice commented out; school notice: `https://ioriente.edu.mx/es/privacy` |

**Temporary redirection:** the links of unfinished pages (in `header.html`, `footer.html`, `index.html`) point to `pages/maintenance/maintenance.html`. When a page is built, change **only** its link (find/replace the old target). Do not create a redirect mechanism.

### 9.3 How `404.html` works

GitHub Pages serves `404.html` from the repository root for any URL that does not exist. The browser keeps the wrong URL (for example `/munio17/foo/bar`), so relative paths would resolve from the wrong depth. Therefore `404.html`:

- has `<base href="/munio17/">` so every relative path resolves from the project root;
- has `data-root="./"` for the include loader;
- keeps its CSS in `pages/error-404/error-404.css`.

Caveats:

- Locally (Live Preview) `<base href="/munio17/">` breaks the page unless the server also serves under `/munio17/`. Comment it out for local tests, or test with the subpath trick (a symlink named `munio17` pointing to the project and `python -m http.server`).
- With a custom domain at the root, change the base to `/`.
- The `<base>` tag affects **every** relative URL in that file, including `#anchors`. Do not add anchor links to `404.html`.

### 9.4 Testing checklist

Local (server) → push → open the live URL → type a wrong URL (404) → test on a phone.

---

## 10. Git, Deploy and Maintenance Rules

### 10.1 Publishing

```text
git status
git add .
git commit -m "feat(home): ..."
git push
```

GitHub Pages rebuilds in about a minute. No more `--force`: history was reset once and is now stable.

### 10.2 Size guard

- `git count-objects -vH` before pushing. The repository should stay in the KiB–low MiB range.
- `git check-ignore` does not report files that are already tracked; use `git check-ignore --no-index -v <path>`. To untrack: `git rm -r --cached .` and add again.
- If PowerShell shows octal names for accented files: `git config core.quotepath false`.

### 10.3 Rules

1. Read this document before structural changes; read `design-system.md` before visual changes.
2. No frameworks. No JavaScript without a clear need.
3. One canonical header and footer.
4. Do not move or delete files without checking references.
5. Architecture-only migrations do not change visuals.
6. Update documentation when decisions change.

### 10.4 AI collaboration rules

Any AI assistant working on MUNIO must: inspect the real tree before creating files; follow the responsibilities above; not invent folders; not add JavaScript without need; preserve existing visual decisions; report affected references; and never assume a file exists without checking.

---

## 11. Building a New Page (checklist)

1. Create `pages/<name>/<name>.html` and `pages/<name>/<name>.css`.
2. In `<html>` set `lang="en"` and `data-root="../../"`.
3. In `<head>`: Google Fonts link (Inter + Libre Caslon Text, one request), then `variables.css`, `header.css`, `footer.css`, `components.css`, page CSS (relative paths with `../../`).
4. `<body>`: `<div data-include="header"></div>`, `<main id="main">`, `<div data-include="footer"></div>`, then `<script src="../../shared/js/include.js" defer></script>` and `header.js`.
5. Add a skip link and a single `<h1>`.
6. Replace the page's link in header, footer and Home (from maintenance to the real file).
7. Add the route to the table in section 9.2.
8. Test in a server, on a phone width (360 px) and in the live URL.

---

## 12. Future Architecture Changes

Possible, only with a concrete need: static-site generation for shared HTML, image optimization pipeline, automated link validation, Open Graph tags for link previews, a custom domain. Any significant change is documented and approved first.

Principles: **simplicity, maintainability, independence, consistency, minimal JavaScript, predictability, stability.**

---

## 13. Open Decisions and Pending Items

**Resolved since v1.1:** component inclusion (loader adopted); header/hero CSS split (done); `zz_ignore/` replaced by three ignored `zz_*` folders; `shared/js/` cleaned (JS only); 404 and maintenance pages built.

**Pending:**

| Item | Note |
|---|---|
| Hero video location | Create `pages/home/videos/` only when a video exists and is compressed |
| Logo for MUNIO XVII | `logo-16.png` is provisional; request the vector logo (SVG) |
| Rename `Logo_IO.png`, `logo_MUNIO.png` | Dedicated task, update references, mind case |
| Pages not built | gallery, how-to-mun, about-us, committees, register, sign-in |
| `typography.css`, `global.css` | Empty; fill or delete |
| Sponsors marquee | No pause control (WCAG 2.2.2); pauses only on hover/focus |
| Open Graph tags | Link previews for WhatsApp/Instagram |
| Backup of `zz_*` folders | Not in GitHub; keep an external copy |
| Placeholders | `mun@example.com`, `[##]` speakers, "XXX MXN", "More than 400 delegates", sponsor logos, hero and 404 images, "16 years" in the Vision text |

---

**Technical source of truth:** `docs/architecture.md` · **Visual source of truth:** `docs/design-system.md`

**Primary rule:** Keep the architecture simple, organized, and understandable by every developer contributing to MUNIO XVII.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.2 | 2026-11-21 | New tree (no `zz_ignore`; three ignored `zz_*` folders); routes table; loader adopted and documented; `404.html` and `<base>` strategy; maintenance page; asset size rules; git and deploy procedure; new-page checklist; open decisions refreshed |
| 1.1 | 2026-11-17 | Subpath rule, kebab-case rationale, open decisions section |
| 1.0 | 2026-11-14 | Initial approved architecture |