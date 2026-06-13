# Tilwen — INP performance fix (card hover)

## FILE (replace in repo)
  components/gallery/RugCardHover.tsx

## THE PROBLEM
Browser flagged "INP Issue — event handlers blocked UI updates for 288ms" on
an SVG element. INP (Interaction to Next Paint) measures UI responsiveness and
is a Google ranking signal; >200ms feels laggy.

## THE CAUSE
The rug card ran onMouseMove on EVERY pixel of mouse movement, and inside it
called getBoundingClientRect() — which forces a synchronous layout recalc each
time. Across a dense grid of cards, sweeping the mouse fired this continuously,
blocking the browser from painting.

## THE FIX
Removed the onMouseMove handler entirely. Image cycling on hover was ALREADY
handled redundantly by the invisible .rhc__zone overlays (onMouseEnter per
zone) — those are cheap and do no layout reads. So the fix removes work and
keeps identical behaviour: hover left/right over a card still cycles its images.

No visual or behavioural change. Just faster, and the INP warning clears.

## ALSO CHECKED (no changes needed)
- ProductCarousel: no per-pixel handlers.
- Nav scroll listener: already { passive: true }, reads only scrollY (cheap).
- No other getBoundingClientRect in any hot path.
