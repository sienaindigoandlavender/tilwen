# Tilwen — spec facts moved into buy column + Care accordion removed

## FILE (replace in repo)
  app/gallery/[slug]/page.tsx

## CHANGES
1. SPEC FACTS moved UP into the right-hand buy column, under the price:
   Size · Pile · Age · Material, in a tidy 2-column grid. All the buyer's
   decision facts (dimensions, pile, age, material, price) now sit together
   in the sticky column. The separate dimensions line under the title was
   removed (Size in the facts grid covers it).

2. "CARE & ACQUISITION" accordion REMOVED — it was the third place the same
   care/shipping/final-sale info appeared. The Care & Shipping and Returns
   links in the buy column (which go to the full pages) cover it.

## BELOW THE BUY COLUMN NOW
   Only the content accordions, each of which renders ONLY when you write it:
   Provenance · Symbolic Reading · How It Behaves in Space.
   Until you write content, the left area is empty and the page is just the
   image + the complete buy column (name, price, facts, cart, links). Clean.

## NOTE
   Dead CSS for removed blocks remains (harmless).
