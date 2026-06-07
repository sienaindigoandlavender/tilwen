'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Region } from '@/types'

interface RegionPoint extends Region {
  lng: number
  lat: number
  rug_count?: number
}

const REGION_POINTS: RegionPoint[] = [
  {
    slug: 'high-atlas',
    name: 'High Atlas',
    lat: 31.5,
    lng: -7.0,
    overview: 'Dense lozenge grids, undyed wool, compositions of protective precision. The altitude and isolation of these mountains produced a visual language unlike anywhere else in Morocco.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'middle-atlas',
    name: 'Middle Atlas',
    lat: 33.2,
    lng: -5.1,
    overview: 'Beni Ourain country — deep ivory pile, sparse geometric fields, and a wool quality shaped by altitude. The tradition is richer and more varied than its global reputation suggests.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'anti-atlas',
    name: 'Anti-Atlas',
    lat: 29.6,
    lng: -8.5,
    overview: 'Austere stripe-fields and structural compositions in near-monochrome. The mineral landscape of the Anti-Atlas shaped a formal restraint that produces objects of concentrated intelligence.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'haouz-plain',
    name: 'Haouz Plain',
    lat: 31.65,
    lng: -8.05,
    overview: 'The agricultural plain around Marrakech — mixed techniques, saffron and henna palettes, and compositions that bridge the mountain severity to the south with the urban influence of the city.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'saharan',
    name: 'Saharan',
    lat: 30.1,
    lng: -5.4,
    overview: 'Nomadic flatweaves shaped by desert life, trans-Saharan trade, and the visual cultures of communities who moved through the pre-Saharan margins. Directional compositions, deep indigo, mineral palette.',
    visual_grammar: '',
    technique_traditions: '',
  },
]

// Monochrome Mapbox style — we use a custom light style that strips colour
const MAP_STYLE = 'mapbox://styles/mapbox/light-v11'

export default function RegionsMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [active, setActive] = useState<RegionPoint | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setError(true); return }

    let map: mapboxgl.Map
    let cancelled = false

    import('mapbox-gl').then(({ default: mapboxgl }) => {
      if (cancelled || !containerRef.current) return

      mapboxgl.accessToken = token

      map = new mapboxgl.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: [-6.5, 31.5],
        zoom: 4.8,
        minZoom: 4,
        maxZoom: 9,
        maxBounds: [[-18, 25], [5, 38]], // Morocco + margin
        attributionControl: false,
        logoPosition: 'bottom-right',
      })

      mapRef.current = map

      map.on('load', () => {
        if (cancelled) return

        // Apply greyscale paint overrides to make it match the monochrome design
        // Remove roads, labels we don't need, desaturate land
        const desaturateLayers = [
          'land', 'landuse', 'national-park', 'water',
          'hillshade', 'building', 'aeroway', 'background'
        ]

        // Add custom markers for each region
        REGION_POINTS.forEach(region => {
          // Create marker element
          const el = document.createElement('div')
          el.className = 'region-marker'
          el.setAttribute('data-slug', region.slug)
          el.innerHTML = `
            <div class="region-marker__dot"></div>
            <div class="region-marker__pulse"></div>
          `

          const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat([region.lng, region.lat])
            .addTo(map)

          el.addEventListener('mouseenter', () => setActive(region))
          el.addEventListener('click', () => setActive(r => r?.slug === region.slug ? r : region))

          markersRef.current.push(marker)
        })

        map.on('click', (e) => {
          // Click on map (not marker) — close panel
          const target = e.originalEvent.target as HTMLElement
          if (!target.closest('.region-marker')) {
            setActive(null)
          }
        })

        setLoaded(true)
      })

      map.on('error', () => setError(true))
    }).catch(() => setError(true))

    return () => {
      cancelled = true
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      map?.remove()
    }
  }, [])

  // Fly to region when active changes
  useEffect(() => {
    if (!active || !mapRef.current) return
    mapRef.current.flyTo({
      center: [active.lng, active.lat],
      zoom: 6.2,
      duration: 900,
      offset: [120, 0], // offset right to account for the panel on left
    })
  }, [active])

  return (
    <>
      <style>{`
        .regions-map-wrap {
          position: relative;
          width: 100%;
          height: 560px;
          background: var(--grey-100);
          overflow: hidden;
        }
        @media (max-width: 768px) { .regions-map-wrap { height: 420px; } }

        .regions-map-canvas {
          position: absolute;
          inset: 0;
          filter: grayscale(1) contrast(0.9) brightness(1.05);
          transition: filter 500ms ease;
        }
        .regions-map-canvas.loaded { filter: grayscale(1) contrast(0.88) brightness(1.08); }

        /* Custom marker */
        .region-marker {
          position: relative;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .region-marker__dot {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 7px; height: 7px;
          background: var(--black);
          border-radius: 0;
          transition: transform 200ms ease, background 200ms ease;
          z-index: 2;
        }
        .region-marker__pulse {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 18px; height: 18px;
          border: 1px solid var(--black);
          border-radius: 0;
          opacity: 0;
          animation: markerPulse 2.4s ease-out infinite;
        }
        .region-marker:hover .region-marker__dot {
          transform: translate(-50%, -50%) scale(1.6);
          background: var(--black);
        }
        @keyframes markerPulse {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }

        /* Info panel */
        .regions-map-panel {
          position: absolute;
          top: var(--sp-6);
          left: var(--sp-6);
          width: 280px;
          background: var(--white);
          border: var(--border);
          padding: var(--sp-6);
          z-index: 10;
          transform: translateX(0);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .regions-map-panel--hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-12px);
        }
        @media (max-width: 600px) {
          .regions-map-panel {
            top: auto;
            bottom: var(--sp-4);
            left: var(--sp-4);
            right: var(--sp-4);
            width: auto;
          }
        }
        .regions-map-panel__label { display: block; margin-bottom: var(--sp-2); }
        .regions-map-panel__name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: var(--sp-4);
        }
        .regions-map-panel__overview {
          font-family: var(--font-body);
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--grey-600);
          margin-bottom: var(--sp-4);
        }
        .regions-map-panel__close {
          position: absolute;
          top: var(--sp-4);
          right: var(--sp-4);
          font-family: var(--font-ui);
          font-size: 0.625rem;
          color: var(--grey-400);
          cursor: pointer;
          padding: 4px;
          transition: color var(--t);
        }
        .regions-map-panel__close:hover { color: var(--black); }

        /* Instruction hint */
        .regions-map-hint {
          position: absolute;
          bottom: var(--sp-4);
          right: var(--sp-4);
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
          background: rgba(249,249,247,0.85);
          padding: 0.35rem 0.65rem;
          pointer-events: none;
          transition: opacity 500ms ease;
        }
        .regions-map-hint--hidden { opacity: 0; }

        /* Loading skeleton */
        .regions-map-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--grey-100);
          transition: opacity 600ms ease;
          z-index: 5;
        }
        .regions-map-loading--done { opacity: 0; pointer-events: none; }
        .regions-map-loading__text {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
        }

        /* Error state */
        .regions-map-error {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--sp-4);
          background: var(--grey-100);
        }

        /* Mapbox attribution — minimal */
        .mapboxgl-ctrl-attrib { font-size: 9px !important; opacity: 0.5; }
        .mapboxgl-ctrl-logo { opacity: 0.3; transform: scale(0.8); }
      `}</style>

      <div className="regions-map-wrap">
        {/* Map canvas */}
        <div
          ref={containerRef}
          className={`regions-map-canvas${loaded ? ' loaded' : ''}`}
        />

        {/* Loading state */}
        {!error && (
          <div className={`regions-map-loading${loaded ? ' regions-map-loading--done' : ''}`}>
            <span className="regions-map-loading__text">Loading map</span>
          </div>
        )}

        {/* Error state — fallback to region list */}
        {error && (
          <div className="regions-map-error">
            <span className="t-label">Browse by Region</span>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              {REGION_POINTS.map(r => (
                <Link key={r.slug} href={`/regions/${r.slug}`} className="btn btn--ghost">
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Info panel */}
        <div className={`regions-map-panel${!active ? ' regions-map-panel--hidden' : ''}`}>
          {active && (
            <>
              <button
                className="regions-map-panel__close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <span className="t-label regions-map-panel__label">Region</span>
              <h3 className="regions-map-panel__name">{active.name}</h3>
              <p className="regions-map-panel__overview">{active.overview}</p>
              <Link href={`/regions/${active.slug}`} className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                Explore {active.name} →
              </Link>
            </>
          )}
        </div>

        {/* Hint */}
        <div className={`regions-map-hint${active ? ' regions-map-hint--hidden' : ''}`}>
          Select a region
        </div>
      </div>
    </>
  )
}
