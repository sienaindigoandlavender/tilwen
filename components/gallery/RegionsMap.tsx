'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Region } from '@/types'

interface RegionPoint extends Region {
  lng: number
  lat: number
}

const REGION_POINTS: RegionPoint[] = [
  {
    slug: 'high-atlas',
    name: 'High Atlas',
    lat: 31.6,
    lng: -6.8,
    overview: 'Dense lozenge grids, undyed wool, compositions of protective precision. The altitude and isolation of these mountains produced a visual language unlike anywhere else in Morocco.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'middle-atlas',
    name: 'Middle Atlas',
    lat: 33.0,
    lng: -4.9,
    overview: 'Beni Ourain country — deep ivory pile, sparse geometric fields, and a wool quality shaped by altitude. The tradition is richer and more varied than its global reputation suggests.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'anti-atlas',
    name: 'Anti-Atlas',
    lat: 29.8,
    lng: -8.2,
    overview: 'Austere stripe-fields and structural compositions in near-monochrome. The mineral landscape of the Anti-Atlas shaped a formal restraint that produces objects of concentrated intelligence.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'haouz-plain',
    name: 'Haouz Plain',
    lat: 31.9,
    lng: -7.9,
    overview: 'The agricultural plain around Marrakech — mixed techniques, saffron and henna palettes, and compositions that bridge the mountain severity to the south with the urban influence of the city.',
    visual_grammar: '',
    technique_traditions: '',
  },
  {
    slug: 'saharan',
    name: 'Saharan',
    lat: 30.0,
    lng: -5.2,
    overview: 'Nomadic flatweaves shaped by desert life, trans-Saharan trade, and the visual cultures of communities who moved through the pre-Saharan margins. Directional compositions, deep indigo, mineral palette.',
    visual_grammar: '',
    technique_traditions: '',
  },
]

// Marker styles injected into document head — CSS variables don't resolve
// inside Mapbox marker DOM so we hardcode colours
const MARKER_STYLES = `
  .region-marker {
    position: relative;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .region-marker__dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #080808;
    border-radius: 50%;
    z-index: 3;
    transition: transform 180ms ease;
  }
  .region-marker__ring {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1.5px solid #080808;
    border-radius: 50%;
    z-index: 2;
    animation: markerPulse 2s ease-out infinite;
  }
  .region-marker__ring:nth-child(3) {
    animation-delay: 0.7s;
  }
  .region-marker:hover .region-marker__dot {
    transform: scale(1.7);
  }
  .region-marker.active .region-marker__dot {
    background: #080808;
    transform: scale(1.5);
  }
  .region-marker.active .region-marker__ring {
    border-color: #080808;
    animation-duration: 1.4s;
  }
  @keyframes markerPulse {
    0%   { transform: scale(1);   opacity: 0.7; }
    80%  { transform: scale(3.2); opacity: 0;   }
    100% { transform: scale(3.2); opacity: 0;   }
  }
`

const MAP_STYLE = 'mapbox://styles/mapbox/light-v11'

export default function RegionsMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const markerElsRef = useRef<Map<string, HTMLElement>>(new Map())
  const [active, setActive] = useState<RegionPoint | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Inject Mapbox CSS + marker styles into document head once
  useEffect(() => {
    // Mapbox GL CSS — must load before map initialises
    if (!document.getElementById('mapbox-gl-css')) {
      const link = document.createElement('link')
      link.id = 'mapbox-gl-css'
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css'
      document.head.appendChild(link)
    }
    // Marker styles
    if (document.getElementById('region-marker-styles')) return
    const style = document.createElement('style')
    style.id = 'region-marker-styles'
    style.textContent = MARKER_STYLES
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setError(true); return }

    let map: mapboxgl.Map
    let cancelled = false

    // Small delay ensures CSS is parsed before Mapbox measures container
    const timer = setTimeout(() => {
    import('mapbox-gl').then(({ default: mapboxgl }) => {
      if (cancelled || !containerRef.current) return
      mapboxgl.accessToken = token

      map = new mapboxgl.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        // Centred on Morocco, tight zoom
        center: [-6.0, 31.2],
        zoom: 5.6,
        minZoom: 5.0,
        maxZoom: 8,
        // Tight bounds — Morocco only, small buffer
        maxBounds: [[-14.0, 27.0], [0.5, 36.5]],
        attributionControl: false,
        logoPosition: 'bottom-right',
        dragRotate: false,
        touchPitch: false,
      })

      mapRef.current = map

      map.on('load', () => {
        if (cancelled) return

        // Dim country labels and reduce visual noise
        try {
          // Make country/region labels lighter
          map.setPaintProperty('country-label', 'text-color', '#aaa9a6')
          map.setPaintProperty('state-label', 'text-color', '#bbb')
          map.setPaintProperty('settlement-label', 'text-color', '#999')
          map.setPaintProperty('settlement-subdivision-label', 'text-color', '#bbb')
          // Lighten water
          map.setPaintProperty('water', 'fill-color', '#e8e6e1')
          // Lighten land fill
          map.setPaintProperty('land', 'background-color', '#f5f4f1')
        } catch (_) { /* layer names vary by style version */ }

        // Add markers
        REGION_POINTS.forEach(region => {
          const el = document.createElement('div')
          el.className = 'region-marker'
          el.setAttribute('data-slug', region.slug)
          // Two rings for staggered pulse
          el.innerHTML = `
            <div class="region-marker__ring"></div>
            <div class="region-marker__ring"></div>
            <div class="region-marker__dot"></div>
          `

          const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat([region.lng, region.lat])
            .addTo(map)

          markerElsRef.current.set(region.slug, el)
          markersRef.current.push(marker)

          el.addEventListener('click', (e) => {
            e.stopPropagation()
            setActive(prev => prev?.slug === region.slug ? null : region)
          })
        })

        map.on('click', () => setActive(null))
        setLoaded(true)
      })

      map.on('error', () => setError(true))
    }).catch(() => setError(true))
    }, 100)

    return () => {
      clearTimeout(timer)
      cancelled = true
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      markerElsRef.current.clear()
      map?.remove()
    }
  }, [])

  // Sync active class on marker elements
  useEffect(() => {
    markerElsRef.current.forEach((el, slug) => {
      el.classList.toggle('active', active?.slug === slug)
    })
  }, [active])

  // Fly to region
  useEffect(() => {
    if (!active || !mapRef.current) return
    mapRef.current.flyTo({
      center: [active.lng, active.lat],
      zoom: 6.8,
      duration: 800,
      offset: [100, 0],
    })
  }, [active])

  // Reset view when panel closes
  useEffect(() => {
    if (active || !mapRef.current || !loaded) return
    mapRef.current.flyTo({
      center: [-6.0, 31.2],
      zoom: 5.6,
      duration: 700,
    })
  }, [active, loaded])

  return (
    <>
      <style>{`
        .regions-map-wrap {
          position: relative;
          width: 100%;
          height: 580px;
          background: #eeecea;
          overflow: hidden;
          border-top: 1px solid var(--grey-200);
          border-bottom: 1px solid var(--grey-200);
        }
        @media (max-width: 768px) { .regions-map-wrap { height: 460px; } }

        .regions-map-canvas {
          position: absolute; inset: 0;
          filter: grayscale(1) contrast(0.82) brightness(1.1);
        }

        /* Info panel */
        .regions-map-panel {
          position: absolute;
          top: var(--sp-6); left: var(--sp-6);
          width: 270px;
          background: #f9f9f7;
          border: 1px solid #dedcd7;
          padding: var(--sp-6);
          z-index: 10;
          opacity: 1;
          transform: translateX(0);
          transition: opacity 280ms ease, transform 280ms ease;
          box-shadow: 0 2px 16px rgba(8,8,8,0.06);
        }
        .regions-map-panel--hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-10px);
        }
        @media (max-width: 600px) {
          .regions-map-panel {
            top: auto; bottom: var(--sp-4);
            left: var(--sp-4); right: var(--sp-4);
            width: auto;
          }
        }
        .regions-map-panel__close {
          position: absolute; top: 10px; right: 12px;
          font-family: var(--font-ui);
          font-size: 0.625rem;
          color: #6b6966;
          cursor: pointer; padding: 4px;
          transition: color 200ms ease;
          background: none; border: none;
          line-height: 1;
        }
        .regions-map-panel__close:hover { color: #080808; }
        .regions-map-panel__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6966;
          display: block;
          margin-bottom: 0.375rem;
        }
        .regions-map-panel__name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #080808;
          margin-bottom: var(--sp-4);
        }
        .regions-map-panel__overview {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.875rem;
          line-height: 1.65;
          color: #2e2d2b;
          margin-bottom: var(--sp-4);
        }
        .regions-map-panel__link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #080808;
          border: 1px solid #080808;
          height: 36px;
          transition: background 200ms ease, color 200ms ease;
          text-decoration: none;
        }
        .regions-map-panel__link:hover {
          background: #080808;
          color: #f9f9f7;
        }

        /* Hint */
        .regions-map-hint {
          position: absolute;
          bottom: var(--sp-4); right: var(--sp-4);
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b6966;
          background: rgba(249,249,247,0.9);
          padding: 0.375rem 0.75rem;
          pointer-events: none;
          transition: opacity 400ms ease;
          border: 1px solid rgba(222,220,215,0.6);
        }
        .regions-map-hint--hidden { opacity: 0; }

        /* Loading */
        .regions-map-loading {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: #eeecea;
          z-index: 5;
          transition: opacity 600ms ease;
        }
        .regions-map-loading--done { opacity: 0; pointer-events: none; }
        .regions-map-loading__text {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9b9890;
        }

        /* Mapbox overrides */
        .mapboxgl-ctrl-attrib { font-size: 9px !important; opacity: 0.4; }
        .mapboxgl-ctrl-logo { opacity: 0.25; transform: scale(0.75); transform-origin: bottom right; }
      `}</style>

      <div className="regions-map-wrap">
        <div ref={containerRef} className={`regions-map-canvas${loaded ? ' loaded' : ''}`} />

        {!error && (
          <div className={`regions-map-loading${loaded ? ' regions-map-loading--done' : ''}`}>
            <span className="regions-map-loading__text">Loading</span>
          </div>
        )}

        {error && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#eeecea' }}>
            <span className="regions-map-hint" style={{ position: 'static' }}>Browse by region</span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 1rem' }}>
              {REGION_POINTS.map(r => (
                <Link key={r.slug} href={`/regions/${r.slug}`} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid #dedcd7', padding: '0.5rem 1rem', color: '#080808', transition: 'all 200ms' }}>
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Region info panel */}
        <div className={`regions-map-panel${!active ? ' regions-map-panel--hidden' : ''}`}>
          {active && (
            <>
              <button className="regions-map-panel__close" onClick={() => setActive(null)} aria-label="Close">✕</button>
              <span className="regions-map-panel__label">Region</span>
              <h3 className="regions-map-panel__name">{active.name}</h3>
              <p className="regions-map-panel__overview">{active.overview}</p>
              <Link href={`/regions/${active.slug}`} className="regions-map-panel__link">
                Explore {active.name} →
              </Link>
            </>
          )}
        </div>

        <div className={`regions-map-hint${active ? ' regions-map-hint--hidden' : ''}`}>
          Click a marker
        </div>
      </div>
    </>
  )
}
