# Tilwen — insecure language removed from content

Swept all content data for claim-making / scarcity / overpromise. Fixed 4 files.
No apologetic "we're new / humble" language existed (good). The tell was scarcity
in the sell voice + lazy superlatives in the descriptions.

## data/rugs.ts
All 4 selection_voice fields rewritten. Cut "increasingly rare", "almost never
available", "seldom available", "the condition is exceptional", "this is why this
piece is here". Now they state the object plainly — no scarcity, no comparison,
no defending. Condition belongs in the grade, not the pitch.

## data/rug-types.ts
"some of the finest pile rugs" -> "dense, finely knotted pile rugs"
"exceptional geometric precision" -> "tight geometric precision"
"held to be among the finest in Morocco" -> "dense and complex, worked at a
fineness that takes real skill"

## data/regions.ts
"The wool is exceptional" -> the fact that earns it ("the altitude and cold grow
a dense, long-staple fleece").

## data/glossary.ts
Three "increasingly rare" scarcity lines + Zemmour "technical peak / exceptional
quality" rewritten to plain, factual authority.

## Kept (these are FACTS, not brags)
"one of the most isolated traditions" (geography), "one of the most recognised
Moroccan textiles" (history), "one of the most permanent natural dyes" (indigo),
"one of the most confidently interpreted, least verifiable motifs" (the honest
eye-form line). Authority about the subject stays; claims about rarity/superiority go.

## Note
data/rugs.ts is sample/seed data; the 120 live rugs come from Shopify. Whatever
writes selection_voice on real listings should follow the same rule: describe the
object, never sell its scarcity.

## Deploy
Text only. If any of these are seeded to Supabase, re-seed the changed rows.
