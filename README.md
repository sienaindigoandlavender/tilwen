# Tilwen — Berber title/blurb + Shop dropdown

## FILES (replace in repo)
  app/gallery/page.tsx
  components/layout/Nav.tsx

## 1. GALLERY TITLE + BLURB (Revival pattern, your positioning)
H1: "Moroccan Berber Rugs"  (the high-traffic search term, NOT "Amazigh" which
has almost no search volume — Amazigh stays for the deeper learning pages).
Blurb below it asserts what Revival's "Moroccan-STYLE" can't: genuine,
handwoven, one-of-a-kind, never reproduced.
SEO metadata (title/description/OG) updated to match — important for ranking.

## 2. SHOP DROPDOWN (desktop + mobile)
"Shop" is now a dropdown (opens on hover, closes on leave/Escape/route change):
  - All Rugs
  - New Arrivals
  - Shop by Type → Beni Ourain, Beni M'Guild, Boujad, Azilal, Zayan,
    Taznakht, Talsint  (links into /gallery?tradition=SLUG)
Clicking "Shop" itself still goes straight to /gallery.
Mobile menu gets the same "Shop by Type" list.
Learning links stay in the FOOTER only (your two-gate decision) — not added to
the top nav.

## NOTE
SHOP_TYPES is a static list near the top of Nav.tsx — edit it if you stock new
traditions. (Kept static so the nav needs no server data fetch.)
