# Tilwen — SEO + GEO fix for the Stories layer

The stories index and rank on strong content already. This closes one live bug
and adds the AI-citation (GEO) layer Tilwen was missing (ksour/darija have it).

## The bug (fixed)
Article JSON-LD was imported into the stories page but never rendered — so no
rich results. Now both Article and Breadcrumb JSON-LD are injected server-side.

## Files
- lib/seo.ts                     Article JSON-LD upgraded: now carries the full
                                 articleBody AND the story's Sources as schema.org
                                 `citation` — Tilwen's authority moat (real, named
                                 sources; most rug sites have none). Added author,
                                 mainEntityOfPage, dateModified.
- lib/stories.ts                 `sources` added to the Story type + Supabase read.
- app/stories/[slug]/page.tsx    Injects Article + Breadcrumb JSON-LD (fed body +
                                 sources).
- app/stories/page.tsx           Listing now shows each story's excerpt under its
                                 title (internal-link context for crawlers + humans).
- app/llms.txt/route.ts          NEW. Concise AI-facing site map: what Tilwen is +
                                 a linked index of all stories + reference pages.
- app/llms-full.txt/route.ts     NEW. Full text of every story WITH its sources,
                                 for direct AI citation.

## Why GEO matters here
robots.txt already welcomes GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot.
The stories are forensically sourced and answer exact questions — ideal for an
LLM to cite. llms.txt / llms-full.txt hand crawlers that content on a plate
instead of making them reconstruct it from HTML.

## Deploy
Just deploy — no SQL (the `sources` column already exists from the stories drop).
No new deps. After deploy, verify:
  - /llms.txt and /llms-full.txt return plain text listing the stories
  - view-source on any /stories/[slug] shows two <script type="application/ld+json">
    blocks, the Article one containing articleBody + citation
  - test a story URL in Google's Rich Results Test

## Depends on
The 20 stories being seeded (run the stories package first). llms-full.txt is
only as full as the rows in tilwen_stories.
