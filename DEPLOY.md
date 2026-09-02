# Tilwen — TOAST structure, implemented in the codebase

The contemporary redesign, ported from the prototype into the real repo. Five files.
Image slots are placeholder grounds — tomorrow's MidJourney work drops straight in.

## Files
- app/globals.css            NEW tokens: --paper, --paper2, --ink, --ink2, --hair,
                             --oxblood. Old vars kept so nothing else breaks. The
                             terracotta accent is retired from the chrome.
- app/layout.tsx             Removed the 84px top padding (old nav was fixed; the
                             new nav is in-flow, so that padding was a dead gap).
- components/layout/Nav.tsx  TOAST nav: thin utility bar + sticky bar with a Rugs
                             MEGA-MENU (Browse / By tradition / two image tiles).
                             Cart, search, and mobile menu all preserved and wired.
- app/page.tsx               Homepage rebuilt to TOAST blocks: full-bleed hero →
                             feature tiles (2 + 3, mixed sizes) → mission band →
                             stories row (live from Supabase). Modular: delete a
                             <section> to remove a block.
- components/layout/Footer.tsx  Fat TOAST footer: 4 columns + newsletter signup
                             (posts to your existing /api/subscribe).

## Deploy
Just deploy — no SQL, no new deps, no route changes. Everything that worked
(cart, search, subscribe) still works.

## Deliberate changes to react to (not bugs)
- The header wordmark is now type ("Tilwen" in the display serif), TOAST-style.
  The Tanit logomark is no longer in the nav bar. If you want it back beside the
  wordmark, say so — one line.
- Nav now surfaces Traditions/Regions/Stories/About directly (TOAST-style),
  which changes the old "sell gate only" nav model on purpose.
- Feature-tile links point at regions/traditions/new — adjust targets freely.

## Tomorrow (MidJourney)
Every tile and the hero use a placeholder gradient. Replace each with a real
image: hero background, the region tile, the tradition tiles, story covers
(story covers already read cover_image from Supabase — fill those rows and they
appear automatically).
