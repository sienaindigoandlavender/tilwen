# Tilwen — Type filter now works from the title (tag fallback)

## FILE (replace in repo)
  lib/rug-source.ts   (supersedes the title-parse version from last round)

## WHY THE TYPE FILTER WAS MISSING
The filter bar self-hides any group with fewer than 2 values. The Type filter
reads `type_slug`, which came ONLY from a Shopify tag in the format
`type:beni-ourain`. Your products don't currently have those prefixed tags
(evidence: Pile and Age filters show — those tags imported — but Type doesn't),
so every rug had an empty type_slug and the filter hid itself.

This is a DATA/tagging gap, not a code bug. But rather than depend on the tags,
the code now has a safety net.

## THE FIX
Added a reverse lookup: the product TITLE already starts with the type name
("Beni M'Guild circa 1980 — ..."), which we parse. When the `type:` tag is
absent, the type slug is derived from that parsed name:
   "Beni M'Guild" → beni-mguild   "Boujad" → boujad   etc.
Matches all 11 traditions (apostrophes handled); returns nothing for unknown
names so no junk entries appear.

Result: the Type filter populates from the title alone. The `type:` tag still
takes priority when present (it's the source of truth), but is no longer
required for the filter to work.

## OPTIONAL — still worth fixing the tags
For robustness (and so smart collections by type work in Shopify), it's still
worth having `type:slug` tags on products. But the site no longer breaks
without them.

## NOTE
No CSV re-import required. Display/derivation logic only.
