'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Rug } from '@/types'
import RugCardHover from '@/components/gallery/RugCardHover'
import { PALETTE } from '@/lib/palette'

// ── Shape ────────────────────────────────────────────────────────────────────
// Moroccan rugs are one-of-a-kind objects, not woven to standard market sizes
// like Persian/Turkish rugs. So we DON'T bucket by size band. Shape, however,
// is a real discrete property a buyer chooses on.
function getShape(rug: Rug): string {
  if (!rug.length_cm || !rug.width_cm) return 'rectangle'
  const ratio = rug.length_cm / rug.width_cm
  if (ratio >= 2.4) return 'runner'
  if (ratio <= 1.25) return 'square'
  return 'rectangle'
}

const SHAPE_LABELS: Record<string, string> = {
  rectangle: 'Rectangle', runner: 'Runner', square: 'Square',
}

// Display labels for slugs that come off the rug data
const TECHNIQUE_LABELS: Record<string, string> = {
  'flatweave-kilim': 'Flatweave',
  'pile-knotted': 'Pile-Knotted',
  'boucherouitte': 'Boucherouitte',
  'mixed': 'Mixed',
}

const PILE_LABELS: Record<string, string> = {
  Flat: 'Flat', Low: 'Low', Medium: 'Medium', High: 'High',
}

// ── Filter groups ────────────────────────────────────────────────────────────
type FilterGroup = 'tradition' | 'palette' | 'shape' | 'pile' | 'technique' | 'dye' | 'age'

interface ActiveFilters {
  tradition: string[]
  palette: string[]
  shape: string[]
  pile: string[]
  technique: string[]
  dye: string[]
  age: string[]
}

const EMPTY_FILTERS: ActiveFilters = {
  tradition: [], palette: [], shape: [], pile: [], technique: [], dye: [], age: [],
}

const FILTER_PARAM_KEYS: FilterGroup[] = ['tradition', 'palette', 'shape', 'pile', 'technique', 'dye', 'age']

// Primary filters sit inline; the rest live behind the "More filters" panel.
// Region is intentionally NOT a filter — it asks the buyer to know Moroccan
// geography. It lives as a knowledge link on product pages and the mega menu.
// Tradition already carries region implicitly (Beni Ourain => Middle Atlas).
const PRIMARY: FilterGroup[] = ['tradition', 'palette', 'shape']
const SECONDARY: FilterGroup[] = ['pile', 'technique', 'dye', 'age']

const LIGHT_SWATCHES = new Set(['ivory', 'cream', 'sand', 'undyed'])

// ── Component ────────────────────────────────────────────────────────────────
export default function GalleryFilters({ rugs }: { rugs: Rug[] }) {
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS)
  const [newOnly, setNewOnly] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false)

  // Read filters from the URL on mount — powers the SHOP mega menu deep-links
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
    // If a secondary filter arrived via URL, open the panel so it's visible
    if (SECONDARY.some(k => next[k].length)) setPanelOpen(true)
    setHydratedFromUrl(true)
  }, [])

  // Keep the URL in sync so any filtered view is shareable
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

  // ── Inventory-derived options ──────────────────────────────────────────────
  // Every group derives its options from live stock and self-hides when a
  // dimension has nothing to offer. No dead options that return zero results.
  const opts = useMemo(() => {
    const count = <K extends string>(pick: (r: Rug) => K | K[] | null | undefined) => {
      const m = new Map<string, number>()
      for (const r of rugs) {
        const v = pick(r)
        if (v == null) continue
        const arr = Array.isArray(v) ? v : [v]
        for (const x of arr) if (x) m.set(x, (m.get(x) || 0) + 1)
      }
      return m
    }

    const tradition = count(r => r.type_slug)
    const palette = count(r => r.palette_tags)
    const shape = count(r => getShape(r))
    const pile = count(r => r.pile_height || null)
    const technique = count(r => r.technique_slug)
    const dye = count(r => {
      const d = (r.dye_type || '').toLowerCase()
      if (!d) return null
      return d.includes('synthet') ? 'synthetic' : 'natural'
    })
    const age = count(r => {
      let cls = r.age_class as string | undefined
      if (cls === 'antique') cls = 'vintage'
      return cls || null
    })

    const sortedTraditions = Array.from(tradition.entries())
      .map(([value, c]) => ({
        value,
        label: rugs.find(r => r.type_slug === value)?.type_name || value,
        count: c,
      }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))

    return { tradition: sortedTraditions, palette, shape, pile, technique, dye, age }
  }, [rugs])

  // ── Mutation ───────────────────────────────────────────────────────────────
  const toggle = useCallback((group: FilterGroup, value: string) => {
    setFilters(prev => {
      const cur = prev[group]
      return {
        ...prev,
        [group]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value],
      }
    })
  }, [])

  const clearAll = useCallback(() => { setFilters(EMPTY_FILTERS); setNewOnly(false) }, [])

  const activeCount =
    Object.values(filters).reduce((n, arr) => n + arr.length, 0) + (newOnly ? 1 : 0)
  const secondaryActive = SECONDARY.reduce((n, k) => n + filters[k].length, 0)

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const pool = newOnly ? rugs.slice(0, 12) : rugs
    return pool.filter(rug => {
      if (filters.tradition.length && !filters.tradition.includes(rug.type_slug || '')) return false
      if (filters.palette.length && !filters.palette.some(p => rug.palette_tags?.includes(p))) return false
      if (filters.shape.length && !filters.shape.includes(getShape(rug))) return false
      if (filters.pile.length && !filters.pile.includes(rug.pile_height)) return false
      if (filters.technique.length && !filters.technique.includes(rug.technique_slug)) return false
      if (filters.dye.length) {
        const d = (rug.dye_type || '').toLowerCase()
        const cls = d.includes('synthet') ? 'synthetic' : 'natural'
        if (!filters.dye.includes(cls)) return false
      }
      if (filters.age.length) {
        let cls = rug.age_class as string | undefined
        if (cls === 'antique') cls = 'vintage'
        if (!cls || !filters.age.includes(cls)) return false
      }
      return true
    })
  }, [rugs, filters, newOnly])

  // ── Reusable pill renderers ────────────────────────────────────────────────
  const Pill = ({ group, value, label, count }: { group: FilterGroup; value: string; label: string; count?: number }) => {
    const active = filters[group].includes(value)
    return (
      <button
        className={`gf-pill${active ? ' gf-pill--active' : ''}`}
        onClick={() => toggle(group, value)}
        aria-pressed={active}
      >
        {label}{typeof count === 'number' ? <span className="gf-pill__n">{count}</span> : null}
      </button>
    )
  }

  const renderGroup = (group: FilterGroup, label: string) => {
    if (group === 'palette') {
      const entries = Object.entries(PALETTE).filter(([k]) => opts.palette.has(k))
      if (!entries.length) return null
      return (
        <div className="gf-group" key={group}>
          <span className="gf-group-label">{label}</span>
          {entries.map(([key, { hex, label: cname }]) => {
            const active = filters.palette.includes(key)
            return (
              <button
                key={key}
                className={`gf-swatch${LIGHT_SWATCHES.has(key) ? ' gf-swatch--light' : ''}${active ? ' gf-swatch--active' : ''}`}
                style={{ background: hex }}
                onClick={() => toggle('palette', key)}
                title={cname}
                aria-label={`${cname}${active ? ' (active)' : ''}`}
                aria-pressed={active}
              />
            )
          })}
        </div>
      )
    }

    if (group === 'tradition') {
      if (opts.tradition.length < 2) return null
      return (
        <div className="gf-group" key={group}>
          <span className="gf-group-label">{label}</span>
          {opts.tradition.map(o => <Pill key={o.value} group="tradition" value={o.value} label={o.label} count={o.count} />)}
        </div>
      )
    }

    // Generic count-map groups
    const maps: Record<string, Map<string, number>> = {
      shape: opts.shape, pile: opts.pile, technique: opts.technique, dye: opts.dye, age: opts.age,
    }
    const labels: Record<string, Record<string, string>> = {
      shape: SHAPE_LABELS, pile: PILE_LABELS, technique: TECHNIQUE_LABELS,
      dye: { natural: 'Natural dye', synthetic: 'Synthetic dye' },
      age: { vintage: 'Vintage', contemporary: 'Contemporary' },
    }
    const map = maps[group]
    if (!map || map.size < 2) return null
    const order = group === 'pile'
      ? ['Flat', 'Low', 'Medium', 'High']
      : group === 'shape'
      ? ['rectangle', 'runner', 'square']
      : Array.from(map.keys())
    const items = order.filter(k => map.has(k))
    return (
      <div className="gf-group" key={group}>
        <span className="gf-group-label">{label}</span>
        {items.map(v => (
          <Pill key={v} group={group} value={v} label={labels[group]?.[v] || v} count={map.get(v)} />
        ))}
      </div>
    )
  }

  const LABELS: Record<FilterGroup, string> = {
    tradition: 'Tradition', palette: 'Colour', shape: 'Shape',
    pile: 'Pile', technique: 'Weave', dye: 'Dye', age: 'Age',
  }

  return (
    <>
      <style>{`
        .gf-strip {
          position: sticky; top: 84px; z-index: 50;
          background: #ffffff; border-bottom: var(--border);
        }
        .gf-strip__inner {
          display: flex; align-items: center; gap: 0;
          overflow-x: auto; scrollbar-width: none; min-height: 48px;
        }
        .gf-strip__inner::-webkit-scrollbar { display: none; }

        .gf-group {
          display: flex; align-items: center; gap: var(--sp-2);
          padding: 0 var(--sp-4); border-right: var(--border);
          height: 48px; flex-shrink: 0;
        }
        .gf-group:first-child { padding-left: 0; }
        .gf-group-label {
          font-family: var(--font-ui); font-size: 0.4375rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--grey-400); margin-right: var(--sp-2); white-space: nowrap;
        }

        .gf-swatch {
          width: 18px; height: 18px; border-radius: 50%;
          border: 1.5px solid transparent; cursor: pointer;
          transition: transform 200ms ease; flex-shrink: 0;
        }
        .gf-swatch:hover { transform: scale(1.2); }
        .gf-swatch--active { box-shadow: 0 0 0 2px var(--white), 0 0 0 3.5px var(--black); }
        .gf-swatch--light { border-color: var(--grey-200) !important; }

        .gf-pill {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 400;
          letter-spacing: 0.06em; color: var(--grey-600); background: transparent;
          border: none; padding: 0.3rem 0.75rem; border-radius: 100px;
          cursor: pointer; transition: background 160ms ease, color 160ms ease;
          white-space: nowrap; line-height: 1; display: inline-flex; align-items: center; gap: 0.3em;
        }
        .gf-pill:hover { background: var(--grey-100); color: var(--black); }
        .gf-pill--active { background: var(--black); color: var(--white); }
        .gf-pill--active:hover { background: var(--grey-800); color: var(--white); }
        .gf-pill__n { font-size: 0.875em; opacity: 0.5; }
        .gf-pill--active .gf-pill__n { opacity: 0.6; }

        /* "More filters" trigger */
        .gf-more {
          display: inline-flex; align-items: center; gap: 0.4em;
          font-family: var(--font-ui); font-size: 0.5rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--grey-600);
          background: none; border: none; cursor: pointer;
          padding: 0 var(--sp-4); height: 48px; flex-shrink: 0;
          border-left: var(--border);
          transition: color var(--t);
        }
        .gf-more:hover { color: var(--black); }
        .gf-more__n {
          font-size: 0.9em; min-width: 1.1em; height: 1.1em; padding: 0 0.3em;
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--black); color: var(--white); border-radius: 100px;
          letter-spacing: 0;
        }
        .gf-more__chev { transition: transform 200ms ease; }
        .gf-more__chev--open { transform: rotate(180deg); }

        /* Secondary panel */
        .gf-panel {
          border-bottom: var(--border); background: #ffffff;
          animation: gfPanel 200ms ease;
        }
        @keyframes gfPanel { from { opacity: 0; } to { opacity: 1; } }
        .gf-panel__inner {
          display: flex; flex-wrap: wrap; align-items: center;
          gap: var(--sp-2) var(--sp-8);
          padding: var(--sp-4) 0;
        }
        .gf-panel .gf-group { border-right: none; padding: 0; height: auto; flex-wrap: wrap; }

        .gf-count {
          font-family: var(--font-ui); font-size: 0.5rem; letter-spacing: 0.08em;
          color: var(--grey-400); padding: 0 var(--sp-4); white-space: nowrap;
          flex-shrink: 0; height: 48px; display: flex; align-items: center;
          border-left: var(--border); margin-left: auto;
        }
        .gf-clear {
          padding: 0 var(--sp-4); font-family: var(--font-ui); font-size: 0.5rem;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-400);
          background: none; border: none; cursor: pointer; transition: color var(--t);
          white-space: nowrap; flex-shrink: 0; height: 48px; border-left: var(--border);
        }
        .gf-clear:hover { color: var(--black); }

        .gf-grid {
          padding: var(--sp-16) 0 var(--sp-32);
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-12) var(--sp-8);
          animation: gfFadeIn 220ms ease;
        }
        @keyframes gfFadeIn { from { opacity: 0.6; } to { opacity: 1; } }
        @media (max-width: 1100px) { .gf-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .gf-grid { grid-template-columns: repeat(2, 1fr); gap: var(--sp-8) var(--sp-4); } }
        @media (max-width: 480px)  { .gf-grid { grid-template-columns: repeat(2, 1fr); } }

        .gf-empty {
          grid-column: 1/-1; padding: var(--sp-24) 0; text-align: center;
          font-family: var(--font-body); font-style: italic; color: var(--grey-400);
        }
      `}</style>

      {/* ── Primary strip ── */}
      <div className="gf-strip">
        <div className="container">
          <div className="gf-strip__inner">

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

            {PRIMARY.map(g => renderGroup(g, LABELS[g]))}

            {/* More filters */}
            {SECONDARY.some(g => {
              const map = opts[g as 'pile' | 'technique' | 'dye' | 'age']
              return map && map.size >= 2
            }) && (
              <button
                className="gf-more"
                onClick={() => setPanelOpen(o => !o)}
                aria-expanded={panelOpen}
              >
                {secondaryActive > 0 && <span className="gf-more__n">{secondaryActive}</span>}
                More filters
                <svg className={`gf-more__chev${panelOpen ? ' gf-more__chev--open' : ''}`} width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                  <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            )}

            <span className="gf-count">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </span>

            {activeCount > 0 && (
              <button className="gf-clear" onClick={clearAll}>Clear</button>
            )}

          </div>
        </div>
      </div>

      {/* ── Secondary panel ── */}
      {panelOpen && (
        <div className="gf-panel">
          <div className="container">
            <div className="gf-panel__inner">
              {SECONDARY.map(g => renderGroup(g, LABELS[g]))}
            </div>
          </div>
        </div>
      )}

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
