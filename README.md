# Tilwen — product page restructured (the buy column)

## FILES (replace in repo)
  app/gallery/[slug]/page.tsx
  components/gallery/ShareLink.tsx

## NEW ORDER of the right-hand column (top → bottom)
  1. Type · Region  (small label)
  2. Name
  3. Cultural name + reference
  4. DIMENSIONS  (cm + ft) — now directly under the title
  5. PRICE — large, the visual anchor (was small, lost in the middle)
  6. [per-rug paragraph]  — renders ONLY when provenance_note is written;
     nothing shows until you write each one. This is the real selling point.
  7. Add to Cart
  8. Care & Shipping · Returns · Share this piece  — all three now identical small size

## REMOVED (your calls)
  - "AVAILABLE" badge — clutter; sold state shows on the price/button instead
  - "One of a kind. When it is gone, it is gone" — rug-dealer slogan, cut
  - The italic authenticity paragraph (redundant)
  - The four trust lines (redundant)
  - The 3 icons — removed for now; you'll replace with Midjourney/purchase icons later

## FIXED
  - "Share this piece" was rendering big in the serif body font (it inherited
    `font: inherit`). ShareLink now takes a className and matches its siblings
    exactly — all three utility links are identical.

## WHEN YOU WRITE THE PARAGRAPHS
  The slot reads `rug.provenance_note`. Fill that field (Shopify metafield
  how.provenance_note, or data/rugs.ts) per rug and the paragraph appears under
  the price. Until then the column is clean: name → dims → price → buy.

## NOTE
  Dead CSS for the removed blocks (.rp-auth, .rp-glance, .rp-trust, etc.) is
  left in the <style> block — harmless, can be swept later.
