# Tilwen — accordions moved into the buy column (right, under Add to Cart)

## FILE (replace in repo)
  app/moroccan-rugs/[slug]/page.tsx

## CHANGE
All six accordions now sit in the RIGHT buy column, directly under
Add to Cart / Ships line / Share — exactly like Revival's product page.
Previously they were in a wide section on the left below the fold.

Order (per-rug content first, then static):
  About This Piece · Symbolic Reading · How It Behaves in Space
  Provenance & Craft · Care & Cleaning · Shipping & Returns

The spatial grid stacks single-column now that it's in the narrow column.
The wide left "rp-body" section is removed (it's empty now).
Related Knowledge (region/motif links) still sits full-width below.

## NOTE
Dead CSS (.rp-body etc.) left in place — harmless.
