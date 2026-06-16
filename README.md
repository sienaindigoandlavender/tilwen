# Tilwen — clean title parsing (type + era)

## FILE (replace in repo)
  lib/rug-source.ts

## THE SITUATION
Your CSV import worked. The page heading wasn't stale — it was showing the
NEW title's first segment. The heading is `given_name`, which (since you
haven't written given names yet) falls back to the type parsed from the
Shopify title. Your titles are "Type circa YYYY — L × W cm · SKU", so the
fallback was the whole "Beni M'Guild circa 1980" mash.

## THE FIX
parseTitle() now splits the era out of the type:
  "Beni M'Guild circa 1980 — 315 × 152 cm · GLB-102660"
    → type "Beni M'Guild", era "1980"
    → heading "Beni M'Guild, c.1980"

Handles every title format:
  - "circa 1980" / "c. 1980" / "1980"  → "c.1980"
  - "1960-1975" (range)                → "c.1960–1975"
  - "1980s" (decade)                   → "1980s"
  - no era                             → just the type

Subtitle (cultural_name fallback) now leads with REGION + era
("Middle Atlas · c.1980") instead of repeating the type.

The gallery cards use the same clean heading automatically.

## WHEN YOU WRITE GIVEN NAMES
Assigning a real given_name (Shopify metafield how.given_name, or data/rugs.ts)
overrides this fallback entirely — the heading becomes the given name and the
cultural line carries "Type, region, era". This parsing only governs the
no-given-name state.

## NOTE
No CSV re-import needed. This is display logic only.
