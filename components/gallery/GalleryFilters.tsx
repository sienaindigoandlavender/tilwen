'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Rug } from '@/types'
import RugCardHover from '@/components/gallery/RugCardHover'
import { PALETTE } from '@/lib/palette'

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
type FilterGroup = 'tradition' | 'technique' | 'region' | 'size' | 'palette' | 'dye' | 'age'

interface ActiveFilters {
  tradition: string[]
  technique: string[]
  region: string[]
  size: string[]
  palette: string[]
  dye: string[]
  age: string[]
}

const EMPTY_FILTERS: ActiveFilters = {
  tradition: [], technique: [], region: [], size: [], palette: [], dye: [], age: [],
}

const FILTER_PARAM_KEYS: FilterGroup[] = ['tradition', 'technique', 'region', 'size', 'palette', 'dye', 'age']

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
  const [newOnly, setNewOnly] = useState(false)
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false)

  // Read filters from the URL once on mount — powers the SHOP mega menu links
  // (/gallery?tradition=beni-ourain) and shareable filtered views.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next: ActiveFilters = { ...EMPTY_FILTERS }
    let any = false
    for (const key of FILTER_PARAM_KEYS) {
      const raw = params.get(key)
      if (raw) {
        next[key] = raw.split(',').map(v => v.trim()).filter(Boolean)
        any = true
      }
    }
    if (any) setFilters(next)
    if (params.get('new')) setNewOnly(true)
    setHydratedFromUrl(true)
  }, [])

  // Keep the URL in sync so filtered views are shareable
  useEffect(() => {
    if (!hydratedFromUrl) return
    const params = new URLSearchParams()
    for (const key of FILTER_PARAM_KEYS) {
      if (filters[key].length) params.set(key, filters[key].join(','))
    }
    if (newOnly) params.set('new', '1')
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [filters, newOnly, hydratedFromUrl])

  // Derive available palette colours from actual rug data
  const availablePalette = useMemo(() => {
    const used = new Set(rugs.flatMap(r => r.palette_tags || []))
    return Object.entries(PALETTE).filter(([key]) => used.has(key))
  }, [rugs])

  // Derive tradition options from live inventory
  const traditionOptions = useMemo(() => {
    const m = new Map<string, { label: string; count: number }>()
    for (const r of rugs) {
      if (!r.type_slug) continue
      const cur = m.get(r.type_slug)
      m.set(r.type_slug, { label: r.type_name || r.type_slug, count: (cur?.count || 0) + 1 })
    }
    return Array.from(m.entries())
      .map(([value, v]) => ({ value, label: v.label, count: v.count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
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

  const clearAll = useCallback(() => { setFilters(EMPTY_FILTERS); setNewOnly(false) }, [])

  const hasFilters = Object.values(filters).some(arr => arr.length > 0) || newOnly

  // Filter logic — rugs arrive newest-first from the data layer
  const filtered = useMemo(() => {
    const pool = newOnly ? rugs.slice(0, 12) : rugs
    return pool.filter(rug => {
      if (filters.tradition.length && !filters.tradition.includes(rug.type_slug || '')) return false
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
        let cls = rug.age_class as string | undefined
        if (cls === 'antique') cls = 'vintage'
        if (!cls) {
          const year = parseInt(rug.age_period?.replace(/\D/g, '').slice(0, 4) || '0')
          cls = year > 0 && year < 1985 ? 'vintage' : 'contemporary'
        }
        if (!filters.age.includes(cls)) return false
      }
      return true
    })
  }, [rugs, filters, newOnly])

  return (
    <>
      <style>{`
        /* ── Filter strip ─────────────────────────────────────── */
        .gf-strip {
          position: sticky;
          top: 84px;
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

            {/* New arrivals (set via SHOP menu) */}
            {newOnly && (
              <div className="gf-group">
                <button
                  className="gf-pill gf-pill--active"
                  onClick={() => setNewOnly(false)}
                  aria-pressed
                  title="Showing the most recent pieces — click to show all"
                >
                  New arrivals ×
                </button>
              </div>
            )}

            {/* Tradition */}
            {traditionOptions.length > 1 && (
              <div className="gf-group">
                <span className="gf-group-label">Tradition</span>
                {traditionOptions.map(opt => (
                  <button
                    key={opt.value}
                    className={`gf-pill${filters.tradition.includes(opt.value) ? ' gf-pill--active' : ''}`}
                    onClick={() => toggle('tradition', opt.value)}
                    aria-pressed={filters.tradition.includes(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

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
