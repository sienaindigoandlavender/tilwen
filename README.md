# Tilwen — Revival-style accordions + shipping line

## FILE (replace in repo)
  app/moroccan-rugs/[slug]/page.tsx

## CHANGES

1. "Ships from Marrakech in 3–5 business days" — small line under Add to Cart
   (Revival has the same reassurance at the decision point).

2. SIX accordions, ordered: per-rug content first, then static reassurance.
   Matches Revival's structure, fills it with genuineness-asserting content.

   PER-RUG (show only when you write them):
   - About This Piece   (provenance_note + selection_voice; opens by default)
   - Symbolic Reading   (symbolic_reading + motif links)
   - How It Behaves in Space (spatial fields)

   STATIC (always show — Revival's skeleton, your substance):
   - Provenance & Craft — THE anti-Revival accordion. Where Revival's
     "How It's Made" admits "fresh off the loom" (factory), this asserts:
     genuine vintage / hand-knotted, sourced in Morocco, never factory-woven,
     one of a kind. Text adapts to vintage vs contemporary via age_class.
   - Care & Cleaning — wool-care specifics + link to /care
   - Shipping & Returns — Marrakech, 3–5 days, final sale + link to /returns

3. The Care & Shipping / Returns links were REMOVED from the buy column (they're
   now inside the Shipping & Returns and Care accordions). Share link stays.

## WHY SIX, NOT FOUR
Revival has 4 because they have no real per-rug content. You have 3 content
slots (About / Symbolic / Spatial) that appear as you write them, PLUS the 3
static ones. Today, with no writing done, a buyer sees the 3 static accordions —
already more substance than Revival, all asserting genuineness.

## NOTE
Dead CSS for old removed blocks remains — harmless.
