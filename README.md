# Tilwen — /gallery → /moroccan-rugs + SKU + static cards

## ⚠ IMPORTANT: this RENAMES A FOLDER in your repo
In GitHub you must RENAME the route folder:
   app/gallery   →   app/moroccan-rugs
The component folder `components/gallery/` STAYS as-is (do NOT rename it).
Easiest: delete app/gallery, then upload the app/moroccan-rugs folder from this zip.
Then upload the other changed files over their existing versions.

## CHANGES

1. URL: /gallery → /moroccan-rugs  (puts the keyword in the URL — SEO win)
   - Route folder renamed app/gallery → app/moroccan-rugs (page + [slug]).
   - Every internal link, canonical, OG url, and sitemap entry updated.
   - Component IMPORTS (@/components/gallery/...) deliberately unchanged.
   - REDIRECTS added in vercel.json so Google keeps the indexing it just
     gained: /gallery → /moroccan-rugs and /gallery/:slug → /moroccan-rugs/:slug
     (301 permanent). Old Shopify-ghost redirects repointed to the new path too.

2. SKU under the title on the product page — its own quiet line (was appended
   to the cultural name). Uses rug.reference; hidden if absent.

3. Cards are STATIC now — no hover image-cycling. The 2nd image (back/detail)
   is currently weaker than the hero, so cycling to it hurt. Shows image[0]
   only. (Also a small perf win.) Re-enable when staged/lifestyle shots exist.

## AFTER DEPLOY
- In Search Console, URL-Inspect https://tilwen.com/moroccan-rugs and Request
  Indexing. The old /gallery URLs will 301 across automatically.
- Update the sitemap submission if you pinned a specific URL (the sitemap file
  now lists /moroccan-rugs automatically).

## NOTE
Dead CSS for the removed card hover (.rhc__zone/.rhc__dot) left in place — harmless.
