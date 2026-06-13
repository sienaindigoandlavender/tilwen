# Tilwen — cleaner gallery (Revival audit, full pass)

## WHERE THE FILES GO
Place both inside your repo, replacing the existing files:

  components/gallery/GalleryFilters.tsx
  components/gallery/RugCardHover.tsx

(The folder structure in this zip already mirrors the repo — just drop the
`components` folder over yours, or copy the two files to that path.)

## WHAT CHANGED (everything from this session, combined)

Grid & card cleanliness (the "messy" fix):
- Gallery grid is now 4 columns (was 6) with generous gaps — bigger images,
  more air. Single biggest visual improvement.
- Cards stripped to three calm lines: Name · Dimensions · Price.
  Removed: the (000) reference code and the row of colour dots (noise).
- Whole rug shown on white (object-fit: contain) instead of square-cropping,
  so the grid reads as one consistent set, not a patchwork of crops.
- Dimensions shown in cm AND ft (for US designers).
- Quiet "One of a kind" marker on hover — Tilwen's answer to Revival's
  "Only One Made" badge. Toggle off with showOneOfAKind={false} if unwanted.

Filters:
- Added PILE (Flat / Low / Medium / High) — concrete, physical, buyer-actionable.
  Lives in the "More filters" panel. Inventory-derived.
- Removed REGION as a filter — it asks the buyer to know Moroccan geography.
  Tradition already implies region (Beni Ourain => Middle Atlas). Region stays
  as a knowledge link on product pages and the mega menu, not a shopping gate.
- Size BANDS already removed earlier (Moroccan rugs are one-of-a-kind, not
  woven to market sizes); Shape (Rectangle/Runner/Square) is the discrete axis.
- Primary inline: Tradition · Colour · Shape
  Secondary panel: Pile · Weave · Dye · Age
- Every group derives from live inventory and hides when <2 options.

## DEPENDS ON
The corrected tags being live in Shopify (type:/pile:/etc. prefixes). Pile
filter reads the pile: tag. If the import didn't fully take, Pile/Tradition/
Colour will look sparse — that's the data, not this code.

## MATERIAL (later)
Add a Material filter the moment inventory is more than wool. The data hook is
ready; just add `material` to the count map and SECONDARY array.
