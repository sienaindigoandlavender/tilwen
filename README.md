# Tilwen — white commerce / magazine ground + no boxes

## THE SURFACE SYSTEM
- COMMERCE (gallery, product pages) → pure white #ffffff
- MAGAZINE (journal, regions, motifs, traditions, glossary) → warm ground
- Header & footer → pinned to pure white, independent of either

## ★ COMPARE THE TWO MAGAZINE GROUNDS (your "show me both")
Open app/globals.css, find `--magazine:` near the top. Two options:
    --magazine: #f9f9f7;   /* SUBTLE — barely-warm white (original) */
    --magazine: #f0eee8;   /* DISTINCT — clear warm grey  ← shipped active */
Change the one line, redeploy, see it live. Flip between them to decide.
Everything else keys off this one variable.

## NO MORE BOXES (Revival register)
Removed enclosing borders/rectangles from the product page:
- The acquisition block (price/cart) no longer sits in a bordered box —
  it floats on white, separated by space and hairline dividers only.
- Atmosphere tags: bordered pills → plain quiet text.
- Related-knowledge items: bordered boxes → text with hover fade.
KEPT: thin hairline DIVIDERS between stacked sections (Revival uses these too).
A divider line ≠ a box. The Add-to-Cart button stays solid — a button should
read as a button.

## FILES
globals.css (the system + variable), Nav.tsx (pinned white), the product page
(white + de-boxed), and the 9 magazine pages (each wrapped in .magazine-surface).

## NOTE
Body default is now pure white, so any NEW commerce-type page is correct by
default. New magazine/content pages: wrap the top element in className="magazine-surface".
