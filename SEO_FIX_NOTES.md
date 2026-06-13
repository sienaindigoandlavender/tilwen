# Tilwen SEO Fixes — June 13, 2026 (corrected)

Your Vercel domains are already correct: www.tilwen.com is Primary, and
tilwen.com 308-redirects to it. So the non-www→www redirect is NOT needed in
code — it has been removed from vercel.json. Everything else stands.

## Files
1. **vercel.json** — 301 redirects for OLD Shopify ghost URLs only
   (/rugs, /products, /collections, /cart, /search, /policies/*,
   /intellectual-property, /account). Clears the 404 report and recovers link
   equity. (Host redirect removed — Vercel handles it.)
2. **app/robots.ts** — disallows the legacy paths; keeps + expands the
   AI-crawler allowlist; declares canonical host + sitemap.
3. **app/sitemap.ts** — adds /faq, /terms, /privacy; wraps the Shopify fetch in
   try/catch so a commerce outage can't drop the knowledge pages.
4. **lib/seo.ts** — removes the SearchAction (pointed at a non-existent search
   endpoint); adds priceValidUntil + final-sale return policy to Product offers.

## After deploying — Search Console (only remaining task)
1. Sitemaps → submit  https://www.tilwen.com/sitemap.xml
2. URL Inspection → https://www.tilwen.com/ → Request Indexing
3. Each Coverage 404 group → Validate Fix

The stale homepage-404 entries were from the Shopify-transition window
(pre-June 3); the domain resolves correctly now, so they clear on recrawl.

## Verify yourself
- /public/og-default.jpg exists (else social shares have no preview image).
