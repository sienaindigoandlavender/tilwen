# Tilwen — readability pass + terracotta + tighter title/price

## FILES (replace in repo)
  app/globals.css                       ← the big one (tokens)
  app/moroccan-rugs/page.tsx
  app/moroccan-rugs/[slug]/page.tsx
  components/gallery/RugCardHover.tsx
  components/gallery/Accordion.tsx

## 1. TITLE → PRICE GAP tightened on the product page (sp-6 → sp-3).

## 2. TERRACOTTA accent (#b5532e), not red:
   - The price is now terracotta (your version of Revival's coloured price).
   - Utility links hover to terracotta; link underlines use it.
   - New token --terracotta in globals.css — use it anywhere you want the accent.

## 3. READABILITY (global) — the main work:
   DARKENED THE GREY TOKENS at the source, so everything inherits:
     --grey-400  #6b6966 → #4a4843   (was the main offender — labels/secondary)
     --grey-600  #2e2d2b → #232220   (toward near-black)
     --grey-800  #1a1917 → #141312
   BUMPED TINY FONT SIZES (the 0.4375–0.5625rem labels were below comfortable
   reading size):
     - spec labels 0.5 → 0.625rem, values 0.9375 → 1rem
     - card: name 1.0625→1.1875rem, dims 0.5625→0.6875rem, price 0.625→0.8125rem
       (price now weight 500), origin tag 0.4375→0.5625rem
     - gallery blurb 1→1.125rem, colour grey-600→grey-800
     - accordion titles 0.625→0.6875rem, weight 600
     - global .t-label 0.625→0.6875rem, weight 600
   Hierarchy preserved (big/small, dark/lighter) — just raised the legibility
   floor so the light end is no longer too faint.

## NOTE
Because the grey TOKENS changed, EVERY page gets more readable, not just these
files — that's intentional and the safest way to do a global pass.
