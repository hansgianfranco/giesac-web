# GIESAC Website — Standards & Best Practices

## Overview
Static website (HTML/CSS/JS) hosted on Vercel. No build step, no framework, no npm dependencies.

## CSS

### Naming Convention — BEM
- **Blocks** (component roots): `.project-card`, `.service-detail`, `.footer-grid`
- **Elements** (parts of a block): `.feature-card__num`, `.feature-card__title`, `.feature-card__desc`
- **Modifiers** (variants): `.feature-card--dark`, `.btn.light`, `.project-grid.featured`
- **Section modifiers**: `.section--bg2`, `.section--nopt`, `.section--cta`
- **State**: `.dark-section`, `.fade.visible`, `.mobile-menu.open`

### Variables
All colors MUST use CSS custom properties defined in `:root`:
- `var(--bg1)` through `var(--bg5)` for section/card backgrounds (`--bg1` #F7F6F4, `--bg2` #EDECEA, `--bg3` #E4E4E4, `--bg4` #CACACA, `--bg5` #3A3238)
- `var(--ink)` with opacity variants: `--ink-92`, `--ink-80`, `--ink-60`, `--ink-40`, `--ink-20`, `--ink-10`, `--ink-06`
- `var(--white-*)` for light-on-dark text: `--white-90` through `--white-06`
- `var(--accent)`, `var(--whatsapp)`, `var(--whatsapp-glow)`
- NEVER hardcode `rgba(245,245,245,x)` or `rgba(59,49,53,x)` in properties

### Formatting
- CSS sections separated by `/* ==================== SECTION NAME ==================== */`
- Properties ordered: positioning → display → box-model → typography → visual → transitions
- All responsive overrides use `@media (max-width: Npx)` directly after the base rule

### Anti-patterns (detected by lint)
- NO inline `style="..."` attributes in HTML
- NO inline event handlers (`onclick`, `onmouseover`, etc.)
- NO `.style.*` assignments in JS (use `classList`)

## HTML

### Structure
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`
- Each page includes header, main content, and WhatsApp float (footer removed for now)
- The nav's `active` and `aria-current="page"` must reflect the current page

### Cotización / Contacto
- No form: la solicitud de cotización redirige al chat de WhatsApp (`https://wa.me/...`)

### Meta & SEO
Every page MUST include:
- `<meta name="description">`
- `<link rel="canonical">`
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="theme-color" content="#3B3135">`
- Structured data (`application/ld+json`): Organization, BreadcrumbList

### Images
- Hero/above-fold: `loading="eager" fetchpriority="high" decoding="async"`
- Below-fold: `loading="lazy" decoding="async"`
- All images: explicit `width` and `height`, meaningful `alt` text

### Accessibility
- Skip link: `.skip-link` at top of body
- Mobile toggle: `aria-expanded="true/false"` managed by JS
- Mobile menu: `aria-hidden="true/false"` managed by JS
- Focus visible styles on all interactive elements
- `prefers-reduced-motion` media query disables all animations
- `<html lang="es">` at document root

## JavaScript

### Strict Mode
ALL `.js` files MUST start with `'use strict';`

### Event Handling
- Use `addEventListener`, NEVER inline event handlers in HTML
- Scroll/resize listeners: throttle with `requestAnimationFrame`
- Add `{ passive: true }` to scroll and touch listeners

### DOM Manipulation
- Visual state changes: use `classList.add/remove/toggle`, NOT `.style.*`
- Dynamic HTML content: use `textContent` for text, or sanitize with `escapeHtml()` before `innerHTML`

### File Organization
- `js/main.js` — shared (header scroll, mobile menu, fade-in, carousels, intro slider, modal trigger)
- `js/proyectos-data.js` — data de los 20 proyectos
- `js/proyecto-modal.js` — modal de detalle de proyecto (carrusel de fotos)
- `js/proyectos.js` — página de proyectos (buscador, filtros, orden, grilla/listado)
- All files loaded at end of `<body>`

## Tooling

### Pre-commit Hook
`.githooks/pre-commit` runs `bin/lint.sh` — rejects commits with:
- Inline styles (`style="..."` in HTML)
- Inline event handlers (`onclick=`, `onmouseover=`, etc.)
- Programmatic style manipulation (`.style.*` in JS)

### Lint
```bash
./bin/lint.sh
```

### Editor Config
`.editorconfig` enforces: UTF-8, LF, 2-space indent, trailing whitespace trimmed

## Project Layout
```
giesac-website/
├── index.html
├── nosotros.html
├── proyectos.html
├── contacto.html
├── styles.css
├── .editorconfig
├── .githooks/
│   └── pre-commit
├── bin/
│   └── lint.sh
├── js/
│   ├── main.js
│   ├── proyectos-data.js
│   ├── proyecto-modal.js
│   └── proyectos.js
├── images/
│   ├── logo-negro.png
│   ├── logo-blanco.png
│   ├── equipo/
│   └── clientes/
└── robots.txt / sitemap.xml
```
