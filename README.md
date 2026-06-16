# Tilwen — three-tier product page (structure only, content later)

## FILES (replace in repo)
  types/index.ts                      (new story fields on Rug)
  lib/rug-source.ts                   (wires story fields through the merge)
  app/moroccan-rugs/[slug]/page.tsx   (Level 2 + Level 3 sections)

## THE THREE TIERS (top → bottom of the page)
  LEVEL 1 — transactional (already built): photo, price, specs, buy block,
            accordions. For the fast buyer.
  LEVEL 2 — poetic story (NEW slot): poetic_title + poem + weavers_tale.
            Intimate, centred, italic. For the slow-burn buyer. Sits BELOW the
            product data so it never slows a fast buyer.
  LEVEL 3 — Kinfolk essay (NEW slot): essay_title + essay_body. Magazine
            register, generous measure, drop-cap. Deepest layer + SEO surface.

## IMPORTANT: STRUCTURE ONLY — NO CONTENT YET
Both new sections render ONLY when their fields are filled. They are empty
now, so the live page is unchanged until content is written. This is the
"build the vessel, fill it later" approach you chose.

## NEW Rug FIELDS (types/index.ts)
  poetic_title, poem, weavers_tale     (Level 2)
  essay_title, essay_body              (Level 3)
Sourced from metafields or the local overlay in lib/rug-source.ts. The
dedicated content pass will populate these (and re-key your rug_stories.xlsx
to the CURRENT handles — note the file's handles end in "-copy" and predate
the CSV cleanup, so they need remapping before import).

## CONTENT NOTES (for the later writing pass)
- poem: newlines become line breaks. weavers_tale & essay_body: blank lines
  separate paragraphs.
- essay_body first paragraph gets a terracotta drop-cap automatically.

## NOTE
Build verified clean. Nothing renders until content exists.
