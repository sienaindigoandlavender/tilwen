# Tilwen — UX round: sort, density, type, hairline, genuineness

## FILES (replace in repo)
  components/gallery/GalleryFilters.tsx
  components/gallery/RugCardHover.tsx
  app/gallery/[slug]/page.tsx

## CHANGES

1. SORT BY  (the real functional gap)
   New "Sort ▾" dropdown on the right of the filter bar:
   Newest first · Price low→high · Price high→low.

2. DENSITY TOGGLE  (3 / 4 per row)
   Two grid icons on the right, like Revival. Lets the buyer choose larger
   images (3) or more at once (4). Keyboard-operable + aria-labelled (real
   accessibility, not just visual). Hidden on mobile, which stays responsive
   (3 cols ≤1100px, 2 cols ≤768px).

3. "TRADITION" → "TYPE"
   The filter that already covered Boujad / Beni Ourain / Azilal is relabelled
   "Type" — clearer to a buyer. (Data key unchanged; no second filter added,
   since Type already IS the rug-type filter.)

4. TOP HAIRLINE on the filter bar
   The bar now sits between two hairlines (top + bottom), the detail that makes
   Revival's bar look contained and resolved.

5. GENUINENESS SIGNAL  (the real differentiator vs Revival)
   Revival sells "Moroccan-style" rugs likely factory-woven (Pakistan/India),
   without true provenance. Tilwen's are genuine. Now made LEGIBLE at the point
   of decision — keyed only to data we actually have (age_class), so it's never
   a false claim:
   - CARD: a quiet line above the name — "Vintage · Morocco" or "Handwoven ·
     Morocco".
   - PRODUCT PAGE: an italic statement under the title — genuine vintage /
     genuinely handwoven, not a reproduction, one of a kind, when gone it can't
     be remade.

## NOTE
The genuineness copy is deliberately conservative (no invented provenance).
When you write real provenance_note values per rug ("sourced from a family in
the Middle Atlas..."), those will deepen it further on the product page.
