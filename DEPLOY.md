# Tilwen — new rug-type essays LIVE + images from Supabase (complete)

Nothing left for a later session. Both the new text and the image wiring ship here.

## What changed
- data/rug-types.ts        REWRITTEN. All 11 essays in the locked voice — plain,
                           warm, full sentences, women named, "Amazigh (Berber)"
                           first mention, no price, no mysticism, no personification.
                           Same field names the pages already read, so the whole
                           site (pages, sitemap, rug-source.ts, motifs, regions)
                           renders the new words with zero template changes.
                           Taznakht de-duplicated (was twice); M'Rirt broken
                           sentence fixed.
- lib/rug-type-images.ts   NEW. Build-time, read-only image lookup from Supabase.
                           Fails soft — no vars / no network / no row = letter
                           placeholder, never a crash.
- app/traditions/page.tsx        Listing: async, real image or letter fallback.
- app/traditions/[slug]/page.tsx Detail: async, hero image under the header.
- package.json             Added @supabase/supabase-js ^2.45.4.
- tilwen_rug_types.sql     Table + 11 rows (image_url/image_alt empty for you).

## Deploy
1. Run tilwen_rug_types.sql in Supabase (Slow Morocco project) — builds the table.
2. `npm install` (picks up @supabase/supabase-js).
3. Deploy. Env vars already in Vercel.
   -> New essays are live immediately (they come from the file).
   -> Images appear per rug type as you fill image_url.

## Ongoing image loop (no code, no redeploy of content)
Generate mj_prompt in MidJourney v8.2 -> upload to Cloudinary ->
  UPDATE tilwen_rug_types SET image_url='...', image_alt='...' WHERE slug='...';
Next build shows it. If a render is too punchy, swap --v 8.2 for --v 8.1.

## Ongoing text loop
Edit essays in data/rug-types.ts with Jacqueline, in voice. Deploy. Done.

That's the whole rug-type layer — text and image — finished in one drop.
