# Empire — Cinematic Luxury Digital Menu (PRD)

## Problem Statement (verbatim summary)
Design and develop a world-class cinematic luxury digital restaurant menu that redefines what a QR menu can be. Not a website, not a delivery app, not an ordering platform. Instead: a handcrafted experience that feels like opening an elegant leather-bound menu in a five-star restaurant.

## User Choices (locked)
- **Restaurant name:** Empire (premium multi-cuisine fine-dining).
- **Scope:** Frontend only. No backend, no DB, no auth, no ordering, no cart, no admin, no PWA, no analytics.
- **Menu:** Fully curated fictional menu across 17 categories (Chef's Welcome, Today's Special, Seasonal Specials, Festival Specials, Starters, Soups, Salads, Main Course, Pizza, Pasta, Burgers, Sandwiches, Desserts, Coffee, Tea, Cold Beverages, Signature Drinks). Each dish: name, price (₹), story, description, ingredients, veg/non-veg, spice, prep time, optional Signature/Chef's Recommendation badge.
- **Photography:** Premium editorial (Unsplash / Pexels) — warm cinematic lighting, dark linen, luxury plating.

## Architecture
- **Stack:** React 19 + Tailwind CSS + Framer Motion + Lucide Icons. No TypeScript.
- **Structure:**
  - `App.js` — 2-stage orchestrator: `entrance` → `book`.
  - `components/AmbientBackground.jsx` — warm ivory paper, floating dust particles, vignette, paper grain.
  - `components/Entrance.jsx` — 4-phase cinematic entry (particles → brand reveal → book rise → Open Menu CTA).
  - `components/EmpireMark.jsx` — typographic Empire logo (replaceable).
  - `components/BookCover.jsx` — leather-bound cover with gold foil "Empire" title.
  - `components/MenuBook.jsx` — book with 2-page spread on desktop, single page on mobile; page-flip animation.
  - `components/MenuPage.jsx` — category page renderer (list / hero / chef narrative variants).
  - `components/FoodDetailModal.jsx` — premium floating detail card.
  - `components/SearchOverlay.jsx` — elegant expandable blur-backdrop search.
  - `components/CategoryNav.jsx` — book-inspired table of contents drawer.
  - `components/FilterBar.jsx` — All / Veg / Non-Veg toggle.
  - `components/DishBits.jsx` — VegBadge / TypePill / SpiceLevel / PrepTime / DishBadge / Ornament.
  - `data/menu.js` — 17 categories with 60+ curated dishes.

## Design System
- **Palette:** Warm ivory `#F6F2EA`, sand `#EDE4D8`, gold `#C6A664` accent, ink `#2A2624` text. No pure white/black.
- **Typography:** Cormorant Garamond (serif headings) + Manrope (sans body). Uppercase tracking-luxe labels.
- **Motion:** Framer Motion springs for page flip (rotateY), soft zoom + spring for modals, particles float on CSS.
- **Accessibility:** aria-labels on all controls, keyboard nav (←/→/`/`/Esc), `prefers-reduced-motion` disables animations.

## What's Implemented (v1 — 2026-12-02)
- Cinematic 4-phase entrance sequence.
- Leather-bound book cover with gold foil, corner ornaments, spine shadow.
- 3D perspective book with 2-page spread on desktop, single page on mobile.
- Page-flip animation with rotateY + spring easing.
- All 17 category pages rendered with printed-menu look (name · dotted leader · price).
- Chef's Welcome narrative page with signature.
- Today's Special hero card variant.
- Food detail modal with photo, story, description, ingredient pills, veg/spice/prep, price.
- Elegant expandable search across dishes/ingredients/categories.
- Book-style Table of Contents drawer.
- All / Veg / Non-Veg filter.
- Next/Prev nav + keyboard shortcuts (ArrowLeft/Right, `/`, Esc).
- Fully responsive mobile / tablet / desktop.
- Ambient background: warm gradients, dust particles, vignette, paper grain.
- 60 FPS motion via GPU-accelerated transforms; reduced-motion support.

## Backlog (deferred to future versions)
- **P1:**
  - Multi-language support (EN / HI / regional).
  - Optional ambient sound (book open, page turn).
  - Actual 3D page-turn library (e.g., turn.js / react-pageflip) with corner-drag physics.
  - Restaurant-controlled CMS to edit menu items without redeploy.
- **P2:**
  - PWA + offline caching.
  - QR code generator + short URL per table.
  - Reservations & waitlist.
  - Analytics (view heatmap, most-tapped dishes).
  - Chef video vignettes on the welcome page.
- **P3:**
  - Server-rendered SEO route for search engines.
  - Themed seasonal skins (spring / monsoon / winter).

## Testing
- Iteration 1 (2026-12-02): 100% frontend pass. All 13 test areas verified.
- No backend tests (no backend).

## Deployment / Ops
- Environment respects `REACT_APP_BACKEND_URL` even though unused.
- No env keys, no secrets, no LLM.
