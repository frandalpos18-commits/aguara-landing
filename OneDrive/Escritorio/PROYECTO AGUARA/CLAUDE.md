# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Landing page for **Aguará** — an Argentine company that sells caldo mixers for agricultural drones and sprayers. Product line: **Speed Blend** in 170L / 300L / 600L / 1200L (simple = 220V pump, duplo = electric rotor + pump).

The entire site is a **single `index.html` file** with all CSS and JS inline. No components, no separate stylesheet, no bundled JS modules. Vite is used only for the dev server and production minification.

---

## Commands

```bash
npm run dev      # Dev server at localhost:3000 (auto-opens browser)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run format   # Prettier format on index.html
```

---

## Architecture

**`index.html`** is the entire codebase. It is structured in this order — the section order is fixed and must not change:

1. **Hero** — agricultural field background (opacity 0.75) + black gradient overlay, logo + tagline centered
2. **Nav divisor** — black bar with orange buttons (Productos / Testimonios / Nosotros / FAQ / Consultar precio)
3. **Productos** — 3-column grid, 6 Speed Blend cards with image placeholders
4. **Testimonios** — black background, auto-carousel every 7s with dots and arrows
5. **¿Por qué Aguará?** — light orange background (oklch 68%), 4 benefits with visible white borders
6. **FAQ** — accordion using `grid-template-rows` trick (no height animation)
7. **Contacto** — black background, "CONSULTE / PRECIO Y FINANCIACIÓN", WA + IG + FB buttons
8. **Footer** — black

**Inside `<head>`:**

- SVG filter `#rm-white` — removes white background from JFIF logos via `feColorMatrix` on the blue channel
- All CSS as one `<style>` block (CSS custom properties, animations, layout)
- Google Fonts: Bebas Neue, Oswald (400–700), Barlow (400–700 + italic)

**JS (inline at bottom of body):**

- Custom smooth scroll: `easeInOutQuart` 900ms — intercepts all `a[href^="#"]`. Do NOT use CSS `scroll-behavior`.
- `IntersectionObserver` for scroll animations via `data-anim` / `data-delay` attributes — only animates `opacity + transform`
- Testimonial carousel with auto-advance and manual controls

---

## Design Rules (Non-Negotiable)

**Colors:** Only black, orange, white — no other colors ever.

```css
--negro:   oklch(8%  0    0)
--naranja: oklch(58% 0.19 42)
--blanco:  oklch(99% 0    0)
```

**Typography:**

- `Bebas Neue` — only the "AGUARÁ" name in the hero
- `Oswald` — all titles, nav, product card names
- `Barlow` — body text, specs, descriptions

**Logo in hero:** `LOGO AGUARA SIN FONDO.png` (PNG con transparencia). El glow naranja se aplica con `filter: drop-shadow(...)` directamente — no se necesita `mix-blend-mode` ni filtro SVG.

**Glow:** Max 2 `drop-shadow` layers for decorative glow. Keep diffusion 8–14px, opacity ≤ 0.7.

**Text stroke (when needed):** 1px simulated with 4 `text-shadow` in cardinal directions only. Never 2px or 8-direction.

**Section titles:** `text-shadow: 0 2px 8px rgba(0,0,0,0.12)` on all `.section-title`.

**Hero background image opacity:** between 0.60 and 0.85 (currently 0.75).

**Nav buttons:** All solid orange, no dividers between them.

**Spacing:** 4pt system via `--s1` (4px) through `--s10` (128px).

---

## Pending Items (Real Data Still Needed)

- Product photos (extract from PDF catalog or provide separately)
- Real WhatsApp number (replace `54XXXXXXXXXX` in the WA links)
- Real Facebook link (replace `href="#"` in the FB floating button)
- ~~Logo PNG~~ — ya resuelto con `LOGO AGUARA SIN FONDO.png`

---

## WAT Framework

This project follows the **WAT** (Workflows, Agents, Tools) architecture. Currently, no `tools/` or `workflows/` directories exist because all work is concentrated in `index.html`. If new automation tasks appear (data scraping, PDF extraction, API integrations), they should follow the WAT pattern below.

**Layer 1: Workflows (`workflows/`)** — Markdown SOPs defining objectives, required inputs, tools to use, expected outputs, and edge cases. Don't create or overwrite workflow files without being asked.

**Layer 2: Agent (this role)** — Read the relevant workflow, run tools in sequence, handle failures, and ask clarifying questions. Don't attempt direct execution when a tool exists.

**Layer 3: Tools (`tools/`)** — Python scripts for deterministic execution. API keys and credentials live in `.env` only. Before writing a new tool, check `tools/` for existing ones.

**Self-improvement loop:** When a tool fails → read the error → fix the script → verify → update the workflow to prevent recurrence. If a fix involves paid API calls or credits, check before re-running.

**File destinations:** Final deliverables go to cloud services (Google Sheets, Slides, etc.). Local `.tmp/` is disposable intermediates only.
