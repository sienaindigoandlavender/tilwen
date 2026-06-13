# Tilwen — product page: spec strip + accordions

## FILES GO HERE (replace / add in your repo)
  app/gallery/[slug]/page.tsx        (replace)
  components/gallery/Accordion.tsx   (new)

## WHAT CHANGED (Revival audit — the two ideas worth borrowing)

1. AT-A-GLANCE SPEC STRIP
   A quiet one-line row under the price in the sticky column:
   "One of a kind · 100% wool · Ships from Marrakech"
   Answers the instant questions before any scrolling. No clip-art icons
   (your design rules) — clean text with hairline separators.
   Also: price row + specs now show dimensions in cm AND ft.

2. ACCORDIONS (the real lesson from Revival's PDP)
   The detail sections are now collapsible, keeping the page calm while
   offering depth on demand — but filled with YOUR ethnographic content,
   not Revival's generic marketing:
     - Provenance
     - Specifications        (open by default)
     - Symbolic Reading / The Piece
     - How It Behaves in Space
     - Care & Acquisition    (new — static, natural-wool care + terms)

   Specifications opens by default so the concrete facts are always visible;
   the rest reveal on click. Smooth grid-rows animation, +/- toggle sign.

## DELIBERATELY NOT TAKEN FROM REVIVAL
   - "View in Your Room" AR (Phase 4 at most)
   - Customer reviews (premature for a gallery; a 1-of-1 can't accrue them)
   - "Buy 2 Get 20% Off" banners (manufactured urgency — wrong for Tilwen)
   - Lifestyle video block (sells a lifestyle, not the object)

## NOTE
The old .rp-section CSS is now unused but left in place (harmless). The
"Care & Acquisition" copy is generic-but-true for natural wool; edit freely.
