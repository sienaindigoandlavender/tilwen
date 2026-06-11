/**
 * Palette colour map — single source of truth.
 * Used by the gallery filter strip and the SHOP mega menu.
 * Keys match the standalone colour tags applied in Shopify.
 */
export const PALETTE: Record<string, { hex: string; label: string }> = {
  ivory:       { hex: '#F5F1E8', label: 'Ivory' },
  cream:       { hex: '#EDE8D8', label: 'Cream' },
  ochre:       { hex: '#C8932A', label: 'Ochre' },
  saffron:     { hex: '#E8A020', label: 'Saffron' },
  terracotta:  { hex: '#C4522A', label: 'Terracotta' },
  rust:        { hex: '#A83420', label: 'Rust' },
  red:         { hex: '#9B1C1C', label: 'Red' },
  orange:      { hex: '#D4621A', label: 'Orange' },
  brown:       { hex: '#6B3D1E', label: 'Brown' },
  walnut:      { hex: '#4A2C0A', label: 'Walnut' },
  indigo:      { hex: '#2A3A6B', label: 'Indigo' },
  blue:        { hex: '#3A5A8A', label: 'Blue' },
  charcoal:    { hex: '#3A3832', label: 'Charcoal' },
  black:       { hex: '#1A1816', label: 'Black' },
  grey:        { hex: '#8A8680', label: 'Grey' },
  sage:        { hex: '#6B7A5A', label: 'Sage' },
  green:       { hex: '#3A5A2A', label: 'Green' },
  sand:        { hex: '#C8B890', label: 'Sand' },
  pink:        { hex: '#D4708A', label: 'Pink' },
}

export const PALETTE_KEYS = Object.keys(PALETTE)
