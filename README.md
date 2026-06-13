# Tilwen — sell-first nav + reassurance icons

## FILES (replace in repo)
  components/layout/Nav.tsx
  app/layout.tsx
  app/gallery/[slug]/page.tsx

## CHANGES
1. MEGA MENU REMOVED. Shop is now a plain, prominent black button → /gallery.
   (getShopMenuData stays in rug-source.ts, unused — revivable later.)
   layout.tsx no longer fetches/passes shopMenu.

2. SEARCH BOX ADDED (top right, desktop + mobile). Submits to /gallery?q=...
   The gallery currently ignores ?q= safely (no crash). WIRE THE ACTUAL SEARCH
   NEXT ROUND — this is the box only, as agreed.

3. TWO-GATE NAV. Primary nav = SELL gate: Search · Shop · Cart.
   Learning pages (Traditions/Regions/Motifs/Journal) removed from top nav —
   they remain in the FOOTER (already there) and in the mobile menu under
   "Explore". They stay fully indexed; learners arrive via Google, not the nav.

4. REASSURANCE ICONS on the product page at-a-glance strip:
   One of a kind · [material] · Ships from Marrakech — drawn as thin-line,
   single-weight SVGs in Tilwen's palette (NOT Revival's filled clip-art),
   per your no-decorative-icons design rule.

## NEXT ROUND (noted, not built)
- Wire /gallery?q= to actually filter (client-side over name/tradition/colour).
- Essay/story block between product detail and footer (SEO + learner gate).
- Wishlist deferred until the magic-link client portal exists.
