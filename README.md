# Tilwen — announcement bar inverted + footer taller

## FILES (replace in repo)
  components/layout/Nav.tsx
  components/layout/Footer.tsx

## 1. ANNOUNCEMENT BAR — inverted to white text on almost-black background
   (--black bg, --white text), like Revival's dark top bar. Was dark-on-grey.
   Height kept 28px so sticky offsets below are untouched.

## 2. FOOTER taller — top/bottom padding increased (sp-24→sp-32 top,
   sp-8→sp-16 bottom; grid bottom sp-12→sp-16). Less cramped.

## 3. COLUMN HEADERS no longer on the line — added padding-top (sp-8) to the
   footer grid so Gallery/About/Information sit clearly below the top divider.
