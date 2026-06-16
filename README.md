# Tilwen — era falls back to the age_period field

## FILE (replace in repo)
  lib/rug-source.ts   (supersedes the SKU-round version)

## WHY SOME CARDS LACKED THE YEAR
The heading era ("c.1980") was parsed ONLY from the title. Titles like
"Beni Ourain circa 1980 — …" showed the year; titles like "Beni Ourain — …"
(no year) showed none. Inconsistent source titles → inconsistent headings.

## THE FIX (Option A)
The era now falls back to the `age_period` metafield (how.age_period) and the
local overlay when the title has no year:
   title era  →  age_period era  →  (nothing)
Handles "Circa 1980", "1980s", "1960–1975", "Vintage circa 1960–1975", etc.
Returns nothing when the value has no year (e.g. just "Vintage").

## IMPORTANT — depends on your data
This fills the gap ONLY when age_period actually contains a year for that
product. If a rug's title has no year AND its age_period is empty or just says
"Vintage" (no number), the heading correctly stays "Beni Ourain" — there's no
year anywhere to show. To get the year on those, fill how.age_period in Shopify
(e.g. "Circa 1980") or add the year to the title.

## NOTE
This whole era/heading behaviour is a FALLBACK for the no-given-name state.
Once you write a given name, it replaces the heading entirely. No re-import needed.
