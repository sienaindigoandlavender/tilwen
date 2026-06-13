# Tilwen — hydration error fix (React #423)

## FILE (replace in repo)
  components/layout/Footer.tsx

## THE PROBLEM
Console showed React error #423: "There was an error while hydrating but React
was able to recover by instead client rendering the entire root."

When hydration fails, React throws away the server-rendered HTML and re-renders
the WHOLE page on the client. That full re-render is what blocked the UI and
tripped the INP warning (256ms). So this is the ROOT cause — fixing it should
clear the INP warning too. (The earlier card-hover fix was real but secondary.)

## THE CAUSE
Footer.tsx rendered `new Date().getFullYear()` directly into the markup. The
footer is on every page, and the page HTML is ISR-cached. A time-derived value
baked into cached server HTML can mismatch what the client computes at load —
which is exactly what React's hydration check forbids. Site-wide footer →
site-wide hydration error.

## THE FIX
Hardcoded `const year = 2026`. A copyright year doesn't need to be live.
Bump it each January (or, later, render it inside a useEffect if you want it
auto-updating without the hydration risk).

## VERIFIED
- No other `new Date()` / `Date.now()` rendered into markup anywhere.
- TanitMark SVG uses no random/unstable IDs (a common SVG hydration cause) — clean.
- GalleryFilters reads the URL only inside useEffect (post-hydration) — safe.
- localStorage in cart-context is guarded with `typeof window` — safe.

## EXPECTED RESULT
The red console errors clear, and the INP warning should resolve with them,
since the page no longer client-rerenders the entire root on load.
