# Tilwen — Technical SEO Audit (Code-Level)
*Conducted June 16, 2026 · against the codebase, pre-deploy*
*Live-crawl portion deferred until after this batch + content deploy*

---

## Verdict

The technical SEO foundation is **strong** — well above typical commerce sites.
Sitemap, robots, structured data, metadata, canonicals, and heading discipline
are all properly built. This is a solid base for the "become the reference"
ambition. Two real issues found, one fixed in this drop, one needs an asset
from you. A short list of post-deploy and content-stage items follows.

---

## What's already excellent (no action needed)

**Sitemap (`app/sitemap.ts`)** — Comprehensive and priority-weighted. Covers
every page type (rugs, motifs, regions, traditions, glossary, essays, statics).
Smartly resilient: a Shopify outage at build time can't strip the knowledge
pages out. Priorities are sensible (home 1.0, rugs/gallery 0.9, knowledge 0.75).

**Robots (`app/robots.ts`)** — Clean. Disallows the legacy Shopify ghost paths
(/cart, /products/, /collections/, etc.) which stops Google re-crawling 404s
and keeps Coverage clean. Explicitly welcomes AI crawlers (GPTBot, ClaudeBot,
PerplexityBot, OAI-SearchBot, Google-Extended) — exactly right for a site built
to be *cited* as the reference. Sitemap + host declared.

**Structured data (`lib/seo.ts`)** — Broad and correct:
- Organization + WebSite (site identity, search action)
- Product — with proper availability mapping (InStock/PreOrder/SoldOut),
  priceValidUntil handled thoughtfully for one-of-a-kind stock, and an honest
  MerchantReturnPolicy (final-sale stated so rich results don't warn)
- Article (essays), DefinedTerm (glossary), FAQPage, BreadcrumbList
This is better structured data than most e-commerce sites ship.

**Metadata** — Every page type has generateMetadata/metadata. metadataBase is
set (relative OG image URLs resolve). Homepage metadata correctly lives in
layout.tsx. No accidental `noindex` anywhere (checked — none).

**Heading discipline** — Exactly one H1 per page type. Correct.

**Image alt text** — Product and card images carry descriptive alt; decorative
thumbnails correctly use empty alt.

**Canonicals** — Present across the deep page types.

---

## Issues found

### 1. FIXED in this drop — FAQ page had no FAQPage schema
`app/faq/page.tsx` is a client component that had neither metadata nor
FAQPage JSON-LD — despite 21 genuinely expert Q&As that are prime "People Also
Ask" / FAQ-rich-result material. Added FAQPage JSON-LD (built from the FAQS
array). This is a real SEO win: those questions can now surface directly in
Google results. **File included in this drop.**

### 2. ACTION NEEDED FROM YOU — `og-default.jpg` is missing
`/public/og-default.jpg` is referenced as the default social-share image in
layout.tsx and lib/seo.ts, but the file does not exist in /public (only
favicon.svg and apple-touch-icon.svg are there). Every page without a specific
image (homepage, glossary, regions, motifs, traditions, journal index) shares
with a broken/blank preview on social and messaging apps.
**Fix:** create a branded 1200×630 JPG (the Tanit mark + "Tilwen — the magic is
woven in" on your palette) and drop it at `/public/og-default.jpg`. No code
change needed once the file exists. This is the single highest-impact quick win
for how the site *looks* when shared.

---

## Post-deploy checks (the live-crawl half, for the next session)

These need the deployed site and can't be verified from code alone:
- Confirm sitemap.xml renders at tilwen.com/sitemap.xml with the /moroccan-rugs
  URLs (post-rename) and no /gallery URLs.
- Confirm the /gallery → /moroccan-rugs 301s fire (vercel.json).
- Core Web Vitals on real pages (LCP on the gallery grid, CLS on product pages).
  The custom image-loader and static cards should help; verify with PageSpeed.
- Validate Product + FAQ + Article rich results in Google's Rich Results Test
  on a few live URLs.
- Re-submit sitemap in Search Console; Request Indexing on /moroccan-rugs,
  /glossary, and a couple of tradition pages.

---

## Content-stage SEO (as you write the 10/day)

These compound the technical base into authority — the "reference" play:
- **Internal-link depth.** Extend the glossary auto-linker (lib/glossary-link)
  into traditions, regions, and essay bodies — not just product pages — so the
  whole site is one connected graph.
- **Completeness over inventory.** Build the full taxonomy of pages (every type,
  region, motif, technique) even for things you don't stock. A reference
  documents the field, not just the shelf. Empty-but-honest pages still rank and
  signal authority.
- **The Level 2/3 story + essay content** (slots already built) is itself an SEO
  surface — unique, deep, per-rug text that Revival/Salam Hello can't match.
- **Thin-page audit.** Once content exists, find and fill any page that's a stub.
  Thin pages dilute topical authority.

---

## Summary table

| Area | Status |
|------|--------|
| Sitemap | ✓ Excellent |
| Robots / crawl control | ✓ Excellent |
| AI-crawler access (GEO) | ✓ Excellent |
| Product structured data | ✓ Excellent |
| Article / Glossary / Breadcrumb schema | ✓ Good |
| FAQ schema (page) | ✓ Fixed in this drop |
| Metadata coverage | ✓ Complete |
| Canonicals | ✓ Present |
| H1 discipline | ✓ Correct |
| Image alt text | ✓ Good |
| noindex safety | ✓ Clean |
| OG default image | ✗ Missing file — needs asset |
| Core Web Vitals | — Verify post-deploy |
| Rich-result validation | — Verify post-deploy |

*Code-level audit complete. Live-crawl audit to follow once this batch and the
content are deployed.*
