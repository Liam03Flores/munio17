# MUNIO XVII — Architecture Guide
 
**Project:** MUNIO XVII Website  
**Institution:** Instituto Oriente, Puebla, Mexico  
**Architecture:** Feature-Based + Shared Components + Hybrid Assets  
**Stack:** HTML5, CSS3, Minimal JavaScript  
**Deployment:** GitHub Pages  
**Status:** Approved  
**Version:** 1.1  
**Last updated:** November 17, 2026
 
---
 
## 1. Architecture Overview
 
MUNIO XVII follows a Feature-Based architecture designed to keep the project organized, maintainable, and easy to debug.
 
The website is divided into five main responsibilities:
 
1. **Pages:** Independent website sections and their resources.
2. **Shared:** Reusable components and centralized JavaScript.
3. **Assets:** Shared visual resources.
4. **Styles:** Global visual foundations.
5. **Docs:** Technical documentation and design references.
The project prioritizes simplicity over unnecessary technical complexity.
 
It remains a static website built with HTML5, CSS3, and minimal JavaScript.
 
No frontend framework is required.
 
## 2. Current Directory Structure
 
The following represents the approved project organization.
 
```text
MUNIO_website/
│
├── .vscode/
│   └── launch.json
│
├── assets/
│   ├── elements/
│   ├── logos/
│   ├── 16-navbar.png
│   ├── Logo_IO.png
│   ├── logo_MUNIO.png
│   ├── logo-16.png
│   ├── logo-window.png
│   └── logo.png
│
├── docs/
│   ├── references/
│   ├── architecture.md
│   ├── design-system.md
│   └── notes.md
│
├── pages/
│   ├── about-us/
│   │   ├── images/
│   │   ├── about-us.css
│   │   └── about-us.html
│   │
│   ├── committees/
│   │   ├── docs/
│   │   ├── images/
│   │   ├── committees.css
│   │   └── committees.html
│   │
│   ├── gallery/
│   │   ├── images/
│   │   ├── gallery.css
│   │   └── gallery.html
│   │
│   ├── home/
│   │   ├── images/
│   │   └── home.css
│   │
│   ├── how-to-mun/
│   │   ├── docs/
│   │   ├── images/
│   │   ├── how-to-mun.css
│   │   └── how-to-mun.html
│   │
│   └── sign-in/
│       ├── sign-in.css
│       └── sign-in.html
│
├── shared/
│   ├── components/
│   │   ├── footer.html
│   │   └── header.html
│   │
│   ├── css/
│   │   ├── components.css
│   │   ├── footer.css
│   │   └── header.css
│   │
│   └── js/                  (JavaScript only; see section 13 for pending cleanup)
│
├── styles/
│   ├── global.css
│   ├── typography.css
│   └── variables.css
│
├── zz_ignore/               (local test files; never part of the website)
│   ├── zz.ignore
│   ├── zzall.photos/
│   ├── joker.html
│   └── nb_footer.css
│
├── .gitignore               (file, in the root)
├── index.html
└── README.md
```
 
**Note:** Some feature folders (`elements/`, `logos/`, `references/`, `docs/`, `images/`) are collapsed in the project explorer. Their internal contents are not specified here. This document does not assume that additional files already exist.
 
`.gitignore` is a file in the project root. `zz_ignore/` is a separate folder that holds local test files (`joker.html`, `nb_footer.css`, `zzall.photos/`, `zz.ignore`). It is not part of the website. Nothing in the website may reference a file inside `zz_ignore/`.
 
## 3. Directory Responsibilities
 
### 3.1 Root Directory
 
The root contains the website entry point and project configuration.
 
- `index.html`: Main website entry point and Home page.
- `README.md`: Project introduction and general instructions.
- `.gitignore`: Git exclusion rules, as a root-level file.
- `zz_ignore/`: Local test and scratch files. It must be listed in `.gitignore` if its contents should not be published.
- `.vscode/`: Local VS Code configuration.
Keep `index.html` in the root to maintain compatibility with GitHub Pages.
 
### 3.2 assets/
 
Contains shared visual resources used by multiple website sections.
 
- `logos/`: Official MUNIO and Instituto Oriente brand assets.
- `elements/`: Reusable visual elements.
- Root-level images: Existing shared image resources.
Asset classification follows the Hybrid Asset approach:
 
**Global assets:** Resources used by multiple features belong in `assets/`.
 
**Feature-specific assets:** Resources exclusively used by one feature belong in that feature's `images/` directory.
 
Do not duplicate identical image files across different directories.
 
### 3.3 pages/
 
Contains the website's independent features.
 
Each feature owns its HTML content, CSS presentation, and exclusive images. The exception is Home: its HTML is the root `index.html`, and its CSS and images live in `pages/home/`.
 
Current features:
 
- `home/`: Main landing page resources.
- `gallery/`: Event photographs and gallery content.
- `committees/`: Committee information and related content.
- `how-to-mun/`: Educational information about Model United Nations.
- `about-us/`: Organization, mission, and team information.
- `sign-in/`: User authentication interface.
The main Home HTML remains `index.html` in the root. Its supporting resources are located in `pages/home/`.
 
Each feature must remain independent and should not contain resources belonging exclusively to another feature.
 
**Hero video (open decision):** Home may add a hero video after the opening image. The architecture has no `videos/` folder yet. Either store the video in `pages/home/images/` or approve and document a `pages/home/videos/` folder (see section 13).
 
**JavaScript exception:** Feature-specific JavaScript must not be stored inside individual page folders. All necessary JavaScript is centralized in `shared/js/`.
 
### 3.4 shared/
 
Contains resources and components reused across multiple website sections.
 
This directory has three responsibilities:
 
**components/**
 
Contains reusable HTML components.
 
- `header.html`: Canonical website Header.
- `footer.html`: Canonical website Footer.
**css/**
 
Contains styles specific to shared components.
 
- `header.css`: Header presentation.
- `footer.css`: Footer presentation.
- Additional shared component styles when necessary.
**js/**
 
Contains all JavaScript used by the website.
 
Both global and feature-specific JavaScript functionality must be maintained here. Only `.js` files belong in this folder; HTML belongs in `shared/components/`.
 
Do not create additional JavaScript directories inside individual features.
 
Header and Footer must have a single canonical implementation to maintain consistency across the website.
 
Important: Static HTML does not automatically include another HTML file. The project must explicitly implement a component inclusion strategy (open decision, see section 13). Until one is approved, the header lives inline in `index.html` and `shared/components/header.html` is the copy to keep in sync.
 
A lightweight JavaScript partial loader may be used if necessary. However, its complexity and dependencies must remain minimal. A static-site generator can be considered later if production requirements justify it.
 
### 3.5 styles/
 
Contains global visual foundations.
 
- `global.css`: Global styles, resets, and common layout rules.
- `typography.css`: Font definitions and global typographic rules.
- `variables.css`: Brand colors, design tokens, and reusable visual values.
Global styles must not contain presentation rules that belong exclusively to a specific feature or shared component.
 
The design system must remain consistent across all pages.
 
### 3.6 docs/
 
Contains the project's technical and visual documentation.
 
- `architecture.md`: Official technical architecture and organizational rules.
- `design-system.md`: Official visual identity, colors, typography, and UI/UX guidelines.
- `notes.md`: Development notes and pending decisions.
- `references/`: Supporting documents and visual references.
Documentation must be updated when important architectural decisions change.
 
---
 
## 4. JavaScript Policy — Minimal JavaScript Approach
 
MUNIO XVII follows a **Minimal JavaScript** philosophy.
 
The primary objective is to reduce technical complexity, external dependencies, and debugging difficulties.
 
The project prioritizes native HTML5 and CSS3 functionality whenever possible.
 
### 4.1 Priority Order
 
When implementing a feature, follow this order:
 
1. Native HTML: Use built-in HTML elements and browser functionality.
2. CSS3: Use CSS for visual effects, layouts, transitions, and responsive behavior.
3. JavaScript: Introduce JavaScript only when HTML and CSS cannot reasonably achieve the required functionality.
### 4.2 JavaScript Organization
 
All JavaScript files must be centralized in:
 
`shared/js/`
 
This directory is responsible for both global and feature-specific JavaScript functionality.
 
Do not create:
 
- `pages/home/home.js`
- `pages/gallery/gallery.js`
- `pages/committees/committees.js`
- Other feature-specific JavaScript directories.
JavaScript must not be introduced without a clear functional requirement.
 
### 4.3 Development Restrictions
 
- Avoid unnecessary JavaScript libraries.
- Avoid unnecessary external dependencies.
- Prefer simple, readable implementations.
- Avoid complex abstractions and excessive code.
- Document the purpose of every JavaScript file.
- Identify which pages depend on each JavaScript implementation.
- Keep functionality easy to inspect and debug.
### 4.4 Main Objective
 
The website must remain maintainable by developers with limited JavaScript experience.
 
Code readability and predictability are more important than architectural sophistication.
 
**Core principle: If HTML or CSS can solve the problem effectively, do not introduce JavaScript.**
 
---
 
## 5. Header and Footer Architecture
 
Header and Footer are global website components.
 
Their canonical implementations belong in:
 
- `shared/components/header.html`
- `shared/components/footer.html`
Their styles belong in `shared/css/`.
 
Their JavaScript functionality, if required, belongs in `shared/js/`.
 
### Header responsibilities
 
The Header contains the global navigation and shared actions.
 
The approved navigation includes:
 
- Home
- Gallery
- How to MUN
- About Us
- Committees
- Search
- Sign In
Social media links must preserve their approved responsive behavior.
 
### Footer responsibilities
 
The Footer contains shared website information, contact details, and social media links.
 
### Home-specific elements
 
The Home Hero is not a global component.
 
It belongs exclusively to the Home feature and must not be included inside the shared Header implementation.
 
Changes to shared components must be checked across every affected page.
 
---
 
## 6. Asset Management Rules
 
The project uses a Hybrid Asset Architecture.
 
### Global resources
 
Store resources used by multiple features in `assets/`.
 
Examples:
 
- Official logos.
- Shared brand elements.
- General illustrations.
- Reusable backgrounds.
### Feature-specific resources
 
Store exclusive images inside the corresponding feature.
 
Examples:
 
- `pages/home/images/`
- `pages/about-us/images/`
### Asset rules
 
1. Do not duplicate identical images.
2. Do not move feature-specific images into global assets without justification.
3. Preserve original files during migration.
4. Use descriptive filenames.
5. Preserve appropriate image extensions.
6. Verify image references after moving resources.
---
 
## 7. CSS Architecture
 
CSS follows the same responsibility boundaries as the HTML architecture.
 
**Global CSS:**
 
Located in `styles/`.
 
Responsible for visual foundations shared throughout the website.
 
**Shared component CSS:**
 
Located in `shared/css/`.
 
Responsible for Header, Footer, and reusable component presentation.
 
**Feature CSS:**
 
Located inside the corresponding feature directory.
 
Responsible for the presentation of individual website sections.
 
Avoid unnecessary style duplication and conflicting selectors.
 
Global design tokens must be maintained in `styles/variables.css`. Header and Hero styles that are currently inline in `index.html` move to `shared/css/header.css` and `pages/home/home.css`, and their color and font values move to `variables.css`.
 
---
 
## 8. Naming Conventions
 
The project uses `kebab-case` (lowercase words separated by hyphens) for every directory and file name.
 
**Why not `snake_case`:** search engines treat a hyphen as a word separator in URLs but do not treat an underscore the same way, so `how-to-mun` reads as three words and `how_to_mun` as one. Hyphens are also the web convention for URLs, they avoid confusion with underscores hidden by link underlines, and they keep one style across HTML, CSS and image names. Underscores remain acceptable inside CSS class names or JavaScript variables where a project style requires it, but not in file or folder names.
 
Examples:
 
| Element | Convention |
|---|---|
| Directories | `about-us/` |
| HTML files | `about-us.html` |
| CSS files | `about-us.css` |
| JavaScript files | `site-navigation.js` |
| Image files | `munio-logo.png` |
 
Existing filenames should not be renamed automatically during unrelated maintenance tasks.
 
Any renaming must include a complete reference update.
 
Preserve the actual filename capitalization, especially when deploying to GitHub Pages, where file paths are case-sensitive. Use lowercase for new files.
 
Existing names that do not follow the convention (`Logo_IO.png`, `logo_MUNIO.png`, `zz_ignore/`) are renamed only in a dedicated task, with every reference updated.
 
---
 
## 9. Routing and GitHub Pages
 
MUNIO XVII is deployed as a static website through GitHub Pages.
 
Every internal link and resource reference must be compatible with the repository's deployment path.
 
The website must not assume that the domain root is the repository root.
 
When modifying the directory structure, review:
 
- HTML navigation links.
- CSS stylesheet references.
- CSS image references.
- JavaScript references.
- Favicon references.
- Header and Footer loading paths.
- Links from nested pages to root-level resources.
Relative paths must be evaluated from the location of the file that contains the reference.
 
The root `index.html` must remain the main entry point.
 
The site is published under a repository subpath (`https://liam03flores.github.io/munio17/`), so **paths that start with `/` must not be used**: they point to the domain root and break the site. Use relative paths, evaluated from the file that contains them:
 
| From | To | Path |
|---|---|---|
| `index.html` | Gallery | `pages/gallery/gallery.html` |
| `index.html` | Logo | `assets/logo-16.png` |
| `pages/gallery/gallery.html` | Home | `../../index.html` |
| `pages/gallery/gallery.html` | Logo | `../../assets/logo-16.png` |
| `pages/gallery/gallery.html` | Header CSS | `../../shared/css/header.css` |
 
Because the same Header is used at different depths, its links need a strategy that works from the root and from `pages/<feature>/` (see section 13).
 
All pages must be tested both locally and after deployment.
 
---
 
## 10. Development and Maintenance Rules
 
1. Consult this document before structural modifications.
2. Consult `design-system.md` before visual modifications.
3. Do not introduce unnecessary frameworks.
4. Do not introduce JavaScript without a clear requirement.
5. Keep all JavaScript inside `shared/js/`.
6. Maintain a single canonical Header and Footer.
7. Do not duplicate shared assets.
8. Do not move files without checking their references.
9. Do not delete files without confirming they are unused.
10. Do not modify visual design during architecture-only migrations.
11. Preserve existing functionality when reorganizing files.
12. Update documentation when architectural decisions change.
### AI Collaboration Rules
 
Any AI assistant working on MUNIO must:
 
- Inspect the existing directory structure before creating files.
- Follow the responsibilities established in this document.
- Avoid inventing new directories without justification.
- Avoid introducing unnecessary JavaScript.
- Preserve existing visual decisions.
- Identify affected file references before moving resources.
- Report modifications and potential problems.
- Never assume that a file exists without checking the actual project.
---
 
## 11. Future Architecture Changes
 
The current architecture is intentionally simple.
 
Additional tools or technologies may be introduced only when a concrete requirement justifies them.
 
Potential future considerations:
 
- Static-site generation for shared HTML components.
- Improved asset optimization.
- More structured documentation.
- Automated link validation.
- Additional features when the website requires them.
These are future possibilities, not current project requirements.
 
Any significant architectural change must be documented and approved before implementation.
 
---
 
## 12. Final Architecture Principles
 
MUNIO XVII is built around the following priorities:
 
1. **Simplicity:** Avoid unnecessary technical complexity.
2. **Maintainability:** Every file must have a clear responsibility.
3. **Independence:** Each feature must manage its own resources.
4. **Consistency:** Shared components and global styles must remain centralized.
5. **Minimal JavaScript:** Prefer native HTML and CSS.
6. **Predictability:** File locations and references must be easy to understand.
7. **Stability:** Structural changes must not unintentionally modify the website's appearance or functionality.
---
 
**Architecture status:** Approved.
 
**Technical source of truth:** `docs/architecture.md`
 
**Visual source of truth:** `docs/design-system.md`
 
**Primary rule:** Keep the architecture simple, organized, and understandable by every developer contributing to MUNIO XVII.
 
---
 
## 13. Open Decisions and Pending Cleanup
 
These items were found when reviewing version 1.0 and still need action in the project.
 
**Cleanup in the project (files that must be moved or renamed):**
 
2. Check `assets/` for duplicates between the root and `logos/`. A logo must exist once.
3. Rename `Logo_IO.png` and `logo_MUNIO.png` to `logo-io.png` and `logo-munio.png` in a dedicated task, updating all references. Mind capitalization on GitHub Pages.
4. Add `zz_ignore/` to `.gitignore` if it must not be published.
5. Create the pages that the Header already links to: `about-us.html`, `committees.html`, `gallery.html`, `how-to-mun.html`, `sign-in.html`.
**Decisions to approve:**
 
| Decision | Options | Recommendation |
|---|---|---|
| Header and Footer inclusion | Inline copies; a small JavaScript loader (`fetch`); a static-site generator | Start with inline copies (zero JavaScript) while there are few pages; adopt a loader or generator only if keeping copies in sync becomes a problem |
| Hero video location | `pages/home/images/`; new `pages/home/videos/` | A `videos/` folder, documented here, to keep image and video assets apart |
| Header and Hero CSS | Inline in `index.html`; split into `shared/css/header.css` and `pages/home/home.css` | Split once Home is finished, with tokens in `styles/variables.css` |
| Logo for MUNIO XVII | Keep provisional `logo-16.png`; add the 17th-edition logo to `assets/logos/` | Replace with the official vector logo when available |
 
 