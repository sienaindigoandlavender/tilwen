'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import type { Rug } from '@/types'
import RugCardHover from '@/components/gallery/RugCardHover'
import { PALETTE } from '@/lib/palette'

// ── Shape ────────────────────────────────────────────────────────────────────
function getShape(rug: Rug): string {
  if (!rug.length_cm || !rug.width_cm) return 'rectangle'
  const ratio = rug.length_cm / rug.width_cm
  if (ratio >= 2.4) return 'runner'
  if (ratio <= 1.25) return 'square'
  return 'rectangle'
}

const SHAPE_LABELS: Record<string, string> = { rectangle: 'Rectangle', runner: 'Runner', square: 'Square' }
const TECHNIQUE_LABELS: Record<string, string> = {
  'flatweave-kilim': 'Flatweave', 'pile-knotted': 'Pile-knotted', 'boucherouitte': 'Boucherouitte', 'mixed': 'Mixed',
}
const PILE_LABELS: Record<string, string> = { Flat: 'Flat', Low: 'Low', Medium: 'Medium', High: 'High' }
const DYE_LABELS: Record<string, string> = { natural: 'Natural dye', synthetic: 'Synthetic dye' }
const AGE_LABELS: Record<string, string> = { vintage: 'Vintage', contemporary: 'Contemporary' }

type FilterGroup = 'tradition' | 'palette' | 'shape' | 'pile' | 'technique' | 'dye' | 'age'

interface ActiveFilters {
  tradition: string[]; palette: string[]; shape: string[]; pile: string[]
  technique: string[]; dye: string[]; age: string[]
}
const EMPTY_FILTERS: ActiveFilters = { tradition: [], palette: [], shape: [], pile: [], technique: [], dye: [], age: [] }
const FILTER_PARAM_KEYS: FilterGroup[] = ['tradition', 'palette', 'shape', 'pile', 'technique', 'dye', 'age']

// Order of the dropdowns across the bar (Revival-style: one labelled menu each)
const BAR_ORDER: FilterGroup[] = ['tradition', 'palette', 'shape', 'pile', 'technique', 'dye', 'age']
const GROUP_LABEL: Record<FilterGroup, string> = {
  tradition: 'Type', palette: 'Colour', shape: 'Shape', pile: 'Pile',
  technique: 'Weave', dye: 'Dye', age: 'Age',
}
const LIGHT_SWATCHES = new Set(['ivory', 'cream', 'sand', 'undyed'])

export default function GalleryFilters({ rugs }: { rugs: Rug[] }) {
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS)
  const [newOnly, setNewOnly] = useState(false)
  const [openMenu, setOpenMenu] = useState<FilterGroup | null>(null)
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false)
  const [cols, setCols] = useState<3 | 4>(4)
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'name-asc'>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  // URL → state on mount (powers deep links like /gallery?tradition=beni-ourain)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next: ActiveFilters = { ...EMPTY_FILTERS }
    let any = false
    for (const key of FILTER_PARAM_KEYS) {
      const raw = params.get(key)
      if (raw) { next[key] = raw.split(',').map(v => v.trim()).filter(Boolean); any = true }
    }
    if (any) setFilters(next)
    if (params.get('new')) setNewOnly(true)
    setHydratedFromUrl(true)
  }, [])

  // state → URL (shareable filtered views)
  useEffect(() => {
    if (!hydratedFromUrl) return
    const params = new URLSearchParams()
    for (const key of FILTER_PARAM_KEYS) if (filters[key].length) params.set(key, filters[key].join(','))
    if (newOnly) params.set('new', '1')
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [filters, newOnly, hydratedFromUrl])

  // Close any open dropdown on outside-click or Escape
  useEffect(() => {
    if (!openMenu && !sortOpen) return
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) { setOpenMenu(null); setSortOpen(false) }
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenMenu(null); setSortOpen(false) } }
    document.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onClick); window.removeEventListener('keydown', onKey) }
  }, [openMenu, sortOpen])

  // Inventory-derived options (counts per value); groups self-hide when empty
  const opts = useMemo(() => {
    const count = (pick: (r: Rug) => string | string[] | null | undefined) => {
      const m = new Map<string, number>()
      for (const r of rugs) {
        const v = pick(r); if (v == null) continue
        for (const x of (Array.isArray(v) ? v : [v])) if (x) m.set(x, (m.get(x) || 0) + 1)
      }
      return m
    }
    const tradition = count(r => r.type_slug)
    const palette = count(r => r.palette_tags)
    const shape = count(r => getShape(r))
    const pile = count(r => r.pile_height || null)
    const technique = count(r => r.technique_slug)
    const dye = count(r => { const d = (r.dye_type || '').toLowerCase(); return d ? (d.includes('synthet') ? 'synthetic' : 'natural') : null })
    const age = count(r => { let c = r.age_class as string | undefined; if (c === 'antique') c = 'vintage'; return c || null })
    return { tradition, palette, shape, pile, technique, dye, age }
  }, [rugs])

  const traditionName = useCallback((slug: string) =>
    rugs.find(r => r.type_slug === slug)?.type_name || slug, [rugs])

  const toggle = useCallback((group: FilterGroup, value: string) => {
    setFilters(prev => {
      const cur = prev[group]
      return { ...prev, [group]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] }
    })
  }, [])
  const clearGroup = useCallback((group: FilterGroup) => setFilters(prev => ({ ...prev, [group]: [] })), [])
  const clearAll = useCallback(() => { setFilters(EMPTY_FILTERS); setNewOnly(false) }, [])

  const activeCount = Object.values(filters).reduce((n, a) => n + a.length, 0) + (newOnly ? 1 : 0)

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
        if (!filters.dye.includes(d.includes('synthet') ? 'synthetic' : 'natural')) return false
      }
      if (filters.age.length) {
        let c = rug.age_class as string | undefined; if (c === 'antique') c = 'vintage'
        if (!c || !filters.age.includes(c)) return false
      }
      return true
    })
  }, [rugs, filters, newOnly])

  const sorted = useMemo(() => {
    if (sort === 'newest') return filtered
    const arr = [...filtered]
    if (sort === 'name-asc') {
      arr.sort((a, b) => a.given_name.localeCompare(b.given_name))
    } else {
      arr.sort((a, b) => sort === 'price-asc' ? a.price - b.price : b.price - a.price)
    }
    return arr
  }, [filtered, sort])

  // Which groups actually have ≥2 options to show
  const visibleGroups = BAR_ORDER.filter(g => {
    if (g === 'tradition') return opts.tradition.size >= 2
    return (opts[g] as Map<string, number>).size >= 2
  })

  const labelMap = (g: FilterGroup): Record<string, string> => ({
    tradition: Object.fromEntries(Array.from(opts.tradition.keys()).map(s => [s, traditionName(s)])),
    palette: {}, shape: SHAPE_LABELS, pile: PILE_LABELS, technique: TECHNIQUE_LABELS, dye: DYE_LABELS, age: AGE_LABELS,
  }[g] || {})

  const orderFor = (g: FilterGroup): string[] => {
    if (g === 'pile') return ['Flat', 'Low', 'Medium', 'High'].filter(k => opts.pile.has(k))
    if (g === 'shape') return ['rectangle', 'runner', 'square'].filter(k => opts.shape.has(k))
    if (g === 'tradition') return Array.from(opts.tradition.entries()).sort((a, b) => b[1] - a[1]).map(e => e[0])
    return Array.from((opts[g] as Map<string, number>).keys())
  }

  return (
    <>
      <style>{`
        .gf-bar {
          position: sticky; top: 84px; z-index: 50;
          background: #ffffff;
          border-top: var(--border);
          border-bottom: var(--border);
        }
        .gf-bar__inner {
          display: flex; align-items: center; gap: var(--sp-2);
          min-height: 52px; flex-wrap: wrap;
        }

        /* Dropdown trigger — a calm labelled word + caret */
        .gf-drop { position: relative; }
        .gf-trigger {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-ui); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.08em; color: var(--black);
          padding: 0.5rem var(--sp-4); height: 52px;
          transition: opacity var(--t);
        }
        .gf-trigger:hover { opacity: 0.55; }
        .gf-trigger__n {
          font-size: 0.875em; color: var(--white);
          background: var(--black); border-radius: 100px;
          min-width: 1.3em; height: 1.3em; padding: 0 0.35em;
          display: inline-flex; align-items: center; justify-content: center; letter-spacing: 0;
        }
        .gf-caret { transition: transform 200ms ease; color: var(--grey-400); }
        .gf-drop--open .gf-caret { transform: rotate(180deg); }

        /* Dropdown panel */
        .gf-menu {
          position: absolute; top: 100%; left: var(--sp-2); z-index: 60;
          min-width: 180px; max-width: 280px;
          background: #ffffff; border: 1px solid var(--grey-200);
          box-shadow: 0 8px 28px rgba(8,8,8,0.08);
          padding: var(--sp-4);
          animation: gfMenu 160ms ease;
        }
        @keyframes gfMenu { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .gf-opt {
          display: flex; align-items: center; gap: 0.6rem; width: 100%;
          background: none; border: none; cursor: pointer; text-align: left;
          font-family: var(--font-ui); font-size: 0.6875rem; letter-spacing: 0.04em;
          color: var(--grey-800); padding: 0.45rem 0.3rem;
          transition: color var(--t);
        }
        .gf-opt:hover { color: var(--black); }
        .gf-opt__box {
          width: 12px; height: 12px; flex-shrink: 0;
          border: 1px solid var(--grey-400); position: relative;
        }
        .gf-opt--on .gf-opt__box { background: var(--black); border-color: var(--black); }
        .gf-opt--on .gf-opt__box::after {
          content: ''; position: absolute; left: 3.5px; top: 1px;
          width: 3px; height: 6px; border: solid #fff; border-width: 0 1px 1px 0;
          transform: rotate(45deg);
        }
        .gf-opt__n { margin-left: auto; font-size: 0.85em; color: var(--grey-400); }
        .gf-menu__clear {
          margin-top: var(--sp-2); padding-top: var(--sp-2); border-top: 1px solid var(--grey-100);
          width: 100%; text-align: left; background: none; border: none; cursor: pointer;
          font-family: var(--font-ui); font-size: 0.5625rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--grey-400); padding-left: 0.3rem;
          transition: color var(--t);
        }
        .gf-menu__clear:hover { color: var(--black); }

        /* Colour swatch grid inside the Colour dropdown */
        .gf-swatchgrid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
        .gf-swatch {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1.5px solid transparent; cursor: pointer;
          transition: transform 150ms ease; position: relative;
        }
        .gf-swatch:hover { transform: scale(1.12); }
        .gf-swatch--light { border-color: var(--grey-200); }
        .gf-swatch--on { box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px var(--black); }

        .gf-clearall {
          margin-left: auto; padding: 0 var(--sp-4); height: 52px;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-ui); font-size: 0.5625rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--grey-400); transition: color var(--t);
          white-space: nowrap;
        }
        .gf-clearall:hover { color: var(--black); }
        .gf-count {
          font-family: var(--font-ui); font-size: 0.5625rem; letter-spacing: 0.08em;
          color: var(--grey-400); padding: 0 var(--sp-4); white-space: nowrap;
        }

        /* Right-side controls: sort + density */
        .gf-right { margin-left: auto; display: flex; align-items: center; gap: var(--sp-2); }
        .gf-density { display: flex; align-items: center; gap: 2px; padding: 0 var(--sp-2); }
        .gf-density__btn {
          width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: var(--grey-400);
          transition: color var(--t);
        }
        .gf-density__btn:hover { color: var(--black); }
        .gf-density__btn--on { color: var(--black); }
        @media (max-width: 768px) { .gf-density { display: none; } }

        .gf-grid {
          padding: var(--sp-16) 0 var(--sp-32);
          display: grid; grid-template-columns: repeat(var(--gf-cols, 4), 1fr); gap: var(--sp-12) var(--sp-8);
          animation: gfFade 220ms ease;
        }
        @keyframes gfFade { from { opacity: 0.6; } to { opacity: 1; } }
        @media (max-width: 1100px) { .gf-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px)  { .gf-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--sp-8) var(--sp-4); } }

        .gf-empty {
          grid-column: 1/-1; padding: var(--sp-24) 0; text-align: center;
          font-family: var(--font-body); font-style: italic; color: var(--grey-400);
        }
      `}</style>

      <div className="gf-bar">
        <div className="container">
          <div className="gf-bar__inner" ref={barRef}>

            {newOnly && (
              <button className="gf-trigger" onClick={() => setNewOnly(false)} title="Showing newest — click to show all">
                New arrivals ×
              </button>
            )}

            {visibleGroups.map(g => {
              const active = filters[g]
              const isOpen = openMenu === g
              const map = g === 'tradition' ? opts.tradition : (opts[g] as Map<string, number>)
              return (
                <div key={g} className={`gf-drop${isOpen ? ' gf-drop--open' : ''}`}>
                  <button
                    className="gf-trigger"
                    onClick={() => setOpenMenu(isOpen ? null : g)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {GROUP_LABEL[g]}
                    {active.length > 0 && <span className="gf-trigger__n">{active.length}</span>}
                    <svg className="gf-caret" width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="gf-menu">
                      {g === 'palette' ? (
                        <div className="gf-swatchgrid">
                          {Object.entries(PALETTE).filter(([k]) => opts.palette.has(k)).map(([key, { hex, label }]) => {
                            const on = active.includes(key)
                            return (
                              <button
                                key={key}
                                className={`gf-swatch${LIGHT_SWATCHES.has(key) ? ' gf-swatch--light' : ''}${on ? ' gf-swatch--on' : ''}`}
                                style={{ background: hex }}
                                onClick={() => toggle('palette', key)}
                                title={label}
                                aria-label={`${label}${on ? ' (selected)' : ''}`}
                                aria-pressed={on}
                              />
                            )
                          })}
                        </div>
                      ) : (
                        orderFor(g).map(value => {
                          const on = active.includes(value)
                          const lbl = labelMap(g)[value] || value
                          return (
                            <button key={value} className={`gf-opt${on ? ' gf-opt--on' : ''}`} onClick={() => toggle(g, value)}>
                              <span className="gf-opt__box" />
                              {lbl}
                              <span className="gf-opt__n">{map.get(value)}</span>
                            </button>
                          )
                        })
                      )}
                      {active.length > 0 && (
                        <button className="gf-menu__clear" onClick={() => clearGroup(g)}>Clear {GROUP_LABEL[g]}</button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            <span className="gf-count">{sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}</span>
            {activeCount > 0 && <button className="gf-clearall" onClick={clearAll}>Clear all</button>}

            <div className="gf-right">
              {/* Sort */}
              <div className={`gf-drop${sortOpen ? ' gf-drop--open' : ''}`}>
                <button
                  className="gf-trigger"
                  onClick={() => { setSortOpen(o => !o); setOpenMenu(null) }}
                  aria-expanded={sortOpen}
                  aria-haspopup="true"
                >
                  Sort
                  <svg className="gf-caret" width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="gf-menu" style={{ left: 'auto', right: 0, minWidth: 160 }}>
                    {([
                      ['newest', 'Newest first'],
                      ['name-asc', 'Name: A to Z'],
                      ['price-asc', 'Price: low to high'],
                      ['price-desc', 'Price: high to low'],
                    ] as const).map(([val, lbl]) => (
                      <button
                        key={val}
                        className={`gf-opt${sort === val ? ' gf-opt--on' : ''}`}
                        onClick={() => { setSort(val); setSortOpen(false) }}
                      >
                        <span className="gf-opt__box" />
                        {lbl}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Density toggle — 3 or 4 per row */}
              <div className="gf-density" role="group" aria-label="Grid density">
                <button
                  className={`gf-density__btn${cols === 3 ? ' gf-density__btn--on' : ''}`}
                  onClick={() => setCols(3)}
                  aria-label="Larger images, three per row"
                  aria-pressed={cols === 3}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="5.5" height="13" stroke="currentColor" strokeWidth="1" />
                    <rect x="8.5" y="1" width="5.5" height="13" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
                <button
                  className={`gf-density__btn${cols === 4 ? ' gf-density__btn--on' : ''}`}
                  onClick={() => setCols(4)}
                  aria-label="More images, four per row"
                  aria-pressed={cols === 4}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="2.6" height="13" stroke="currentColor" strokeWidth="1" />
                    <rect x="4.8" y="1" width="2.6" height="13" stroke="currentColor" strokeWidth="1" />
                    <rect x="8.6" y="1" width="2.6" height="13" stroke="currentColor" strokeWidth="1" />
                    <rect x="12.4" y="1" width="1.6" height="13" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="gf-grid" style={{ ['--gf-cols' as string]: cols }}>
          {sorted.length === 0 && <p className="gf-empty">No pieces match the current filters.</p>}
          {sorted.map((rug, i) => <RugCardHover key={rug.slug} rug={rug} index={i} />)}
        </div>
      </div>
    </>
  )
}
