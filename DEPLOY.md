# Tilwen — religion & politics removed (site-wide)

No religion, no politics anywhere. Cut across 6 files.

## Cut
- lib/seo.ts        Site-wide DEFAULT_DESCRIPTION was "Before Islam..." → now a
                    plain factual description. (This fed EVERY page's meta.)
- app/about         Metadata + body "without the incense"→"plainly"; Tanit aside
                    reframed from "goddess" to "an old North African sign" (logo kept).
- app/page.tsx      Homepage hero "Before Islam..." → plain description of the rugs.
- data/rug-types    Zayan: removed "resisted French control until 1921 / keeping its
                    own terms against pressure" (both short_def and body).
- data/motifs       Stepped-cross: removed "pre-Islamic", "well before Islam",
                    "sacred space".
- data/glossary     amazigh/berber: kept factual etymology + official-language fact,
                    cut "suppression/incorporation" and "cultural politics" lines.
                    tanit/elibende: reframed from goddess/deity/divine → old
                    protective SIGN/figure. "colonial vocabulary" → "European usage".

## Tanit (your call: option a)
Logomark kept. Copy no longer calls her a goddess/deity — described as an old
North African protective sign that persists in Amazigh textile, jewellery, tattoo.

## Deploy
Text/data only. If glossary/motifs/rug-types are in Supabase, re-seed those rows;
if still in the file, just deploy. No SQL schema change.
