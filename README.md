# Tilwen — product page: remove the messy spec table + "The Piece"

## FILE (replace in repo)
  app/gallery/[slug]/page.tsx

## WHAT CHANGED
1. REMOVED the big "Specifications" accordion — it was mostly "Not determined"
   (Region, Community, Technique, Dyes), which looked broken and undermined the
   genuineness pitch. (Also fixed the "Age: Vintage → VINTAGE" double-print bug
   that lived in it.)

2. REMOVED "The Piece" accordion — it was the raw Shopify description and
   repeated the SAME facts (dimensions, pile, age) already shown elsewhere.
   Pure redundancy. The Shopify-description fallback is gone.

3. KEPT a tiny clean spec line instead — just the 4 facts we reliably have:
   Size · Pile · Age · Material. Quiet inline definition list, no blanks.
   (Any fact that's missing simply doesn't render.)

## WHAT NOW SHOWS BELOW THE BUY COLUMN
  - The tiny spec line (Size/Pile/Age/Material)
  - Provenance        — only if written
  - Symbolic Reading  — only if written (no Shopify fallback now)
  - How It Behaves    — only if written
  - Care & Acquisition (static)
So today it's just the spec line + Care — clean and honest, no half-empty
table, no duplicated description. The richer accordions appear as you write
content per rug.

## NOTE
Dead CSS for the old .rp-specs table is left in place — harmless.
