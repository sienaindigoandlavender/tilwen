'use client'
import { useState, useMemo, useCallback } from 'react'
import type { Rug } from '@/types'
import RugCardHover from '@/components/gallery/RugCardHover'

// ── Palette colour map ───────────────────────────────────────────────────────
const PALETTE: Record<string, { hex: string; label: string }> = {
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

// ── Size classifier ──────────────────────────────────────────────────────────
function getSize(rug: Rug): string {
  const area = (rug.length_cm * rug.width_cm) / 10000 // m²
  const ratio = rug.length_cm / rug.width_cm
  if (ratio > 2.5) return 'runner'
  if (area < 1.5)  return 'small'
  if (area < 4)    return 'medium'
  return 'large'
}

// ── Filter definitions ───────────────────────────────────────────────────────
type FilterGroup = 'technique' | 'region' | 'size' | 'palette' | 'dye' | 'age'

interface ActiveFilters {
  technique: string[]
  region: string[]
  size: string[]
  palette: string[]
  dye: string[]
  age: string[]
}

const EMPTY_FILTERS: ActiveFilters = {
  technique: [], region: [], size: [], palette: [], dye: [], age: [],
}

const TECHNIQUE_OPTIONS = [
  { value: 'flatweave-kilim', label: 'Flatweave' },
  { value: 'pile-knotted',    label: 'Pile-Knotted' },
  { value: 'boucherouitte',   label: 'Boucherouitte' },
]

const REGION_OPTIONS = [
  { value: 'high-atlas',   label: 'High Atlas' },
  { value: 'middle-atlas', label: 'Middle Atlas' },
  { value: 'anti-atlas',   label: 'Anti-Atlas' },
  { value: 'haouz-plain',  label: 'Haouz Plain' },
  { value: 'saharan',      label: 'Saharan' },
]

const SIZE_OPTIONS = [
  { value: 'small',   label: 'Small',   sub: 'under 1.5m²' },
  { value: 'medium',  label: 'Medium',  sub: '1.5–4m²' },
  { value: 'large',   label: 'Large',   sub: 'over 4m²' },
  { value: 'runner',  label: 'Runner',  sub: 'long format' },
]

const DYE_OPTIONS = [
  { value: 'natural',   label: 'Natural dye' },
  { value: 'synthetic', label: 'Synthetic dye' },
]

const AGE_OPTIONS = [
  { value: 'vintage',      label: 'Vintage' },
  { value: 'contemporary', label: 'Contemporary' },
]

// ── Main component ───────────────────────────────────────────────────────────
export default function GalleryFilters({ rugs }: { rugs: Rug[] }) {
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS)

  // Derive available palette colours from actual rug data
  const availablePalette = useMemo(() => {
    const used = new Set(rugs.flatMap(r => r.palette_tags || []))
    return Object.entries(PALETTE).filter(([key]) => used.has(key))
  }, [rugs])

  const toggle = useCallback((group: FilterGroup, value: string) => {
    setFilters(prev => {
      const current = prev[group]
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [group]: next }
    })
  }, [])

  const clearAll = useCallback(() => setFilters(EMPTY_FILTERS), [])

  const hasFilters = Object.values(filters).some(arr => arr.length > 0)

  // Filter logic
  const filtered = useMemo(() => {
    return rugs.filter(rug => {
      if (filters.technique.length && !filters.technique.includes(rug.technique_slug)) return false
      if (filters.region.length && !filters.region.includes(rug.region_slug)) return false
      if (filters.size.length && !filters.size.includes(getSize(rug))) return false
      if (filters.palette.length && !filters.palette.some(p => rug.palette_tags?.includes(p))) return false
      if (filters.dye.length) {
        const dye = rug.dye_type.toLowerCase()
        if (filters.dye.includes('natural') && !dye.includes('natural')) return false
        if (filters.dye.includes('synthetic') && dye.includes('natural')) return false
      }
      if (filters.age.length) {
        const year = parseInt(rug.age_period?.replace(/\D/g, '').slice(0, 4) || '0')
        const isVintage = year > 0 && year < 1985
        if (filters.age.includes('vintage') && !isVintage) return false
        if (filters.age.includes('contemporary') && isVintage) return false
      }
      return true
    })
  }, [rugs, filters])

  return (
    <>
      <style>{`
        /* ── Filter strip ─────────────────────────────────────── */
        .gf-strip {
          position: sticky;
          top: 56px;
          z-index: 50;
          background: var(--white);
          border-bottom: var(--border);
        }
        .gf-strip__inner {
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0;
          min-height: 48px;
        }
        .gf-strip__inner::-webkit-scrollbar { display: none; }

        /* Groups */
        .gf-group {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          padding: 0 var(--sp-4);
          border-right: var(--border);
          height: 48px;
          flex-shrink: 0;
        }
        .gf-group:first-child { padding-left: 0; }
        .gf-group-label {
          font-family: var(--font-ui);
          font-size: 0.4375rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-200);
          margin-right: var(--sp-2);
          white-space: nowrap;
        }

        /* Colour circles */
        .gf-swatch {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease;
          flex-shrink: 0;
          position: relative;
        }
        .gf-swatch:hover { transform: scale(1.2); }
        .gf-swatch--active {
          box-shadow: 0 0 0 2px var(--white), 0 0 0 3.5px var(--black);
        }
        /* Ivory needs a border to be visible on white bg */
        .gf-swatch--light { border-color: var(--grey-200) !important; }

        /* Pills */
        .gf-pill {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: var(--grey-600);
          background: transparent;
          border: none;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
          white-space: nowrap;
          line-height: 1;
        }
        .gf-pill:hover { background: var(--grey-100); color: var(--black); }
        .gf-pill--active {
          background: var(--black);
          color: var(--white);
        }
        .gf-pill--active:hover {
          background: var(--grey-800);
          color: var(--white);
        }

        /* Size pills with sub-label */
        .gf-size {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.06em;
          color: var(--grey-600);
          background: transparent;
          border: none;
          padding: 0.25rem 0.625rem;
          border-radius: 100px;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
          line-height: 1.2;
          white-space: nowrap;
        }
        .gf-size:hover { background: var(--grey-100); color: var(--black); }
        .gf-size--active { background: var(--black); color: var(--white); }
        .gf-size--active:hover { background: var(--grey-800); }
        .gf-size__sub {
          font-size: 0.375rem;
          letter-spacing: 0.04em;
          opacity: 0.65;
          margin-top: 1px;
        }

        /* Clear */
        .gf-clear {
          margin-left: auto;
          padding: 0 var(--sp-4);
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--t);
          white-space: nowrap;
          flex-shrink: 0;
          height: 48px;
        }
        .gf-clear:hover { color: var(--black); }

        /* Result count */
        .gf-count {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          color: var(--grey-400);
          padding: 0 var(--sp-4);
          white-space: nowrap;
          flex-shrink: 0;
          height: 48px;
          display: flex;
          align-items: center;
          border-left: var(--border);
        }

        /* ── Grid ─────────────────────────────────────────────── */
        .gf-grid {
          padding: var(--sp-8) 0 var(--sp-32);
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--sp-8) var(--sp-4);
        }
        @media (max-width: 1100px) { .gf-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .gf-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px)  { .gf-grid { grid-template-columns: repeat(2, 1fr); } }

        .gf-item { display: block; text-decoration: none; color: inherit; }
        .gf-item__img {
          position: relative; aspect-ratio: 1/1;
          overflow: hidden; background: var(--grey-100);
        }
        .gf-item__img img { transition: transform 600ms var(--ease); }
        .gf-item:hover .gf-item__img img { transform: scale(1.05); }

        .gf-item__avail {
          position: absolute; top: 6px; right: 6px;
          width: 6px; height: 6px; border-radius: 50%; z-index: 2;
        }
        .gf-item__avail--available { background: var(--black); }
        .gf-item__avail--reserved  { background: var(--grey-400); }
        .gf-item__avail--sold      { background: transparent; border: 1px solid var(--grey-400); }

        /* Colour swatches on card */
        .gf-item__swatches {
          display: flex; gap: 3px; margin-top: 4px; flex-wrap: wrap;
        }
        .gf-item__swatch {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .gf-item__swatch--light { box-shadow: inset 0 0 0 1px var(--grey-200); }

        .gf-item__body { padding: 0.5rem 0 0; }
        .gf-item__ref {
          font-family: var(--font-ui); font-size: 0.5rem;
          letter-spacing: 0.06em; color: var(--grey-400);
          display: block; margin-bottom: 0.15rem;
        }
        .gf-item__name {
          font-family: var(--font-ui); font-size: 0.6875rem;
          font-weight: 400; color: var(--black);
          display: block; letter-spacing: 0.005em; line-height: 1.3;
        }
        .gf-item__meta {
          margin-top: 0.15rem; font-family: var(--font-ui);
          font-size: 0.4375rem; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--grey-400);
        }

        .gf-empty {
          grid-column: 1/-1; padding: var(--sp-24) 0;
          text-align: center; font-family: var(--font-body);
          font-style: italic; color: var(--grey-400);
        }

        /* Fade animation on filter change */
        .gf-grid { animation: gfFadeIn 220ms ease; }
        @keyframes gfFadeIn { from { opacity: 0.6; } to { opacity: 1; } }
      `}</style>

      {/* ── Filter strip ── */}
      <div className="gf-strip">
        <div className="container">
          <div className="gf-strip__inner">

            {/* Colour swatches */}
            {availablePalette.length > 0 && (
              <div className="gf-group">
                <span className="gf-group-label">Colour</span>
                {availablePalette.map(([key, { hex, label }]) => {
                  const isLight = ['ivory', 'cream', 'sand'].includes(key)
                  const isActive = filters.palette.includes(key)
                  return (
                    <button
                      key={key}
                      className={`gf-swatch${isLight ? ' gf-swatch--light' : ''}${isActive ? ' gf-swatch--active' : ''}`}
                      style={{ background: hex }}
                      onClick={() => toggle('palette', key)}
                      title={label}
                      aria-label={`Filter by ${label}${isActive ? ' (active)' : ''}`}
                      aria-pressed={isActive}
                    />
                  )
                })}
              </div>
            )}

            {/* Technique */}
            <div className="gf-group">
              <span className="gf-group-label">Weave</span>
              {TECHNIQUE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`gf-pill${filters.technique.includes(opt.value) ? ' gf-pill--active' : ''}`}
                  onClick={() => toggle('technique', opt.value)}
                  aria-pressed={filters.technique.includes(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Region */}
            <div className="gf-group">
              <span className="gf-group-label">Region</span>
              {REGION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`gf-pill${filters.region.includes(opt.value) ? ' gf-pill--active' : ''}`}
                  onClick={() => toggle('region', opt.value)}
                  aria-pressed={filters.region.includes(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Size */}
            <div className="gf-group">
              <span className="gf-group-label">Size</span>
              {SIZE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`gf-size${filters.size.includes(opt.value) ? ' gf-size--active' : ''}`}
                  onClick={() => toggle('size', opt.value)}
                  aria-pressed={filters.size.includes(opt.value)}
                >
                  {opt.label}
                  <span className="gf-size__sub">{opt.sub}</span>
                </button>
              ))}
            </div>

            {/* Dye */}
            <div className="gf-group">
              <span className="gf-group-label">Dye</span>
              {DYE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`gf-pill${filters.dye.includes(opt.value) ? ' gf-pill--active' : ''}`}
                  onClick={() => toggle('dye', opt.value)}
                  aria-pressed={filters.dye.includes(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Age */}
            <div className="gf-group">
              <span className="gf-group-label">Age</span>
              {AGE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`gf-pill${filters.age.includes(opt.value) ? ' gf-pill--active' : ''}`}
                  onClick={() => toggle('age', opt.value)}
                  aria-pressed={filters.age.includes(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            <span className="gf-count">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </span>

            {/* Clear */}
            {hasFilters && (
              <button className="gf-clear" onClick={clearAll}>
                Clear
              </button>
            )}

          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container">
        <div className="gf-grid">
          {filtered.length === 0 && (
            <p className="gf-empty">No pieces match the current filters.</p>
          )}
          {filtered.map((rug, i) => (
            <RugCardHover key={rug.slug} rug={rug} index={i} />
          ))}
        </div>
      </div>
    </>
  )
}
