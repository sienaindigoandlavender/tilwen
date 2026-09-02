# Tilwen — files to replace (complete, current)

Everything from today's front-end work, final state. Replace these five, deploy.
No SQL, no new deps, no route changes. Cart / search / subscribe all still wired.

  app/globals.css                 palette tokens (paper/ink/hair/oxblood); terracotta retired from chrome
  app/layout.tsx                  removed the dead 84px top gap (nav is in-flow now)
  app/page.tsx                    TOAST homepage · hero = "Handwoven in the Atlas Mountains." ·
                                  readable body text (full ink, ≥1rem) · stories row live from Supabase
  components/layout/Nav.tsx        TOAST nav + Rugs mega-menu · cart/search/mobile preserved
  components/layout/Footer.tsx     fat TOAST footer + newsletter · readable, no invisible greys

## Baked in (today's fixes)
- Hero copy: no uniqueness claim, no hedge — states the subject, nothing to prove.
- Type: reading text is --ink at full strength, ≥1rem. Greys only on hovers,
  placeholder, and kickers over dark photos.

## Still placeholder (tomorrow's images)
Hero + tiles use gradient grounds. Story covers already read cover_image from
Supabase — fill those rows and they appear on their own.
