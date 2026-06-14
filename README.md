# Tilwen — five small fixes

## FILES (replace in repo)
  app/moroccan-rugs/[slug]/page.tsx   (SKU in spec section)
  components/gallery/RugCardHover.tsx (remove hover marker)
  components/layout/Nav.tsx           (grey header)
  components/layout/Footer.tsx        (grey footer + spacing)

## CHANGES
1. PILE — no change needed. The spec already shows each rug's real pile
   (Flat/Low/Medium/High). This rug is genuinely Medium; low/high rugs show
   Low/High correctly. If a specific rug shows the wrong value, that's its
   Shopify tag, not the code.

2. "ONE OF A KIND" hover marker on cards — REMOVED.

3. SKU — now shown as "Reference" in the spec section (Size/Pile/Age/Material/
   Reference), and removed from under the title (was duplicated). It appears
   only when the rug's title carries a "· SKU" suffix; if you don't see it on a
   rug, that rug's Shopify title has no reference code.

4. FOOTER — copyright line had too little breathing room. Added a clear top
   border + more space (margin-top + padding-top) above "© Tilwen".

5. HEADER + FOOTER — now warm grey (var(--grey-100) #eeede9) instead of white,
   so they frame the white commerce pages. Search box stays white for crisp
   input. (The fixed nav sits consistently over both white commerce and grey
   magazine pages.)

## NOTE
Dead CSS for the removed hover marker (.rhc__ooak) left in place — harmless.
