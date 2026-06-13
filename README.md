# Tilwen — Revival-style filter dropdowns + page title

## FILES (replace in repo)
  components/gallery/GalleryFilters.tsx
  app/gallery/page.tsx

## WHAT CHANGED
1. FILTERS ARE NOW DROPDOWNS (Revival's pattern). The bar is a calm row of
   labelled words, each with a caret: Tradition ▾ · Colour ▾ · Shape ▾ ·
   Pile ▾ · Weave ▾ · Dye ▾ · Age ▾. Options HIDE until you click the label.
   - Opens on click, closes on outside-click or Escape.
   - Active filters show a small count badge on the label.
   - Each menu has "Clear [group]"; the bar has "Clear all".
   - Colour opens a swatch grid INSIDE its dropdown (dots no longer clutter
     the bar). Every group still inventory-derived, hides when <2 options,
     shows per-option counts.
   - "More filters" panel is gone — all filters are equal dropdowns now.

2. TITLE: "Gallery" → "Moroccan & Amazigh Rugs", now an <h1> (was a span).
   This is the buyer's / Google's word, not our internal label — and a proper
   H1 is an SEO win. The redundant "124 pieces" header is removed (the filter
   bar already shows the live count).

All filtering logic, URL sync, and deep-links preserved.
