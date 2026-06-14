# Tilwen — footer spacing + nav announcement separation

## FILES (replace in repo)
  components/layout/Nav.tsx
  components/layout/Footer.tsx

## 1. FOOTER — column headers (Gallery/About/Information) were cramped on the
   top line. Added breathing room (footer top padding sp-16 → sp-24) and bumped
   the header size 0.5625 → 0.625rem for readability.

## 2. NAV — the announcement bar and the navigation row were both grey and blended
   into one block. Now SEPARATED:
   - Announcement ("EACH PIECE IS ONE OF A KIND · SHIPS WORLDWIDE...") → almost
     black (--grey-800), heavier weight, with a clear bottom border. It now reads
     as a distinct, important line.
   - The navigation itself (tagline, search, links) stays grey — unchanged.
   Height kept at 28px so sticky offsets below it are untouched.
