'use client'
import { useState } from 'react'
import Link from 'next/link'

interface RegionPoint {
  slug: string
  name: string
  overview: string
  cx: number  // SVG x coordinate
  cy: number  // SVG y coordinate
}

// Morocco SVG viewBox is 0 0 800 700
// Coordinates hand-mapped to approximate geographic positions
const REGION_POINTS: RegionPoint[] = [
  {
    slug: 'high-atlas',
    name: 'High Atlas',
    cx: 380,
    cy: 340,
    overview: 'Dense lozenge grids, undyed wool, compositions of protective precision. The altitude and isolation of these mountains produced a visual language unlike anywhere else in Morocco.',
  },
  {
    slug: 'middle-atlas',
    name: 'Middle Atlas',
    cx: 430,
    cy: 220,
    overview: 'Beni Ourain country — deep ivory pile, sparse geometric fields, and a wool quality shaped by altitude. The tradition is richer and more varied than its global reputation suggests.',
  },
  {
    slug: 'anti-atlas',
    name: 'Anti-Atlas',
    cx: 270,
    cy: 440,
    overview: 'Austere stripe-fields and structural compositions in near-monochrome. The mineral landscape of the Anti-Atlas shaped a formal restraint that produces objects of concentrated intelligence.',
  },
  {
    slug: 'haouz-plain',
    name: 'Haouz Plain',
    cx: 310,
    cy: 330,
    overview: 'The agricultural plain around Marrakech — mixed techniques, saffron and henna palettes, and compositions that bridge the mountain severity to the south with the urban influence of the city.',
  },
  {
    slug: 'saharan',
    name: 'Saharan',
    cx: 470,
    cy: 480,
    overview: 'Nomadic flatweaves shaped by desert life, trans-Saharan trade, and the visual cultures of communities who moved through the pre-Saharan margins. Directional compositions, deep indigo, mineral palette.',
  },
]

// Simplified Morocco outline path — hand-traced SVG polygon
// viewBox 0 0 800 700
const MOROCCO_PATH = `
  M 195,60 L 220,55 L 255,48 L 290,44 L 320,42 L 355,40 L 390,42
  L 420,46 L 450,52 L 480,58 L 505,68 L 525,82 L 538,96 L 545,112
  L 548,128 L 545,144 L 538,158 L 528,170 L 515,178 L 505,190
  L 498,205 L 495,222 L 498,238 L 505,252 L 515,262 L 525,272
  L 532,285 L 535,300 L 532,315 L 525,328 L 515,338 L 505,348
  L 498,360 L 495,375 L 498,390 L 505,405 L 515,418 L 522,432
  L 525,448 L 522,464 L 515,478 L 505,490 L 495,502 L 482,512
  L 468,520 L 452,526 L 435,530 L 418,532 L 400,532 L 382,530
  L 364,526 L 346,520 L 328,512 L 310,502 L 292,490 L 275,478
  L 260,465 L 248,452 L 238,438 L 230,424 L 224,410 L 218,395
  L 212,380 L 205,365 L 196,352 L 185,340 L 172,330 L 158,322
  L 144,316 L 130,312 L 116,310 L 102,310 L 90,312 L 80,318
  L 72,326 L 66,336 L 62,348 L 60,360 L 60,375 L 62,390
  L 66,404 L 72,416 L 80,425 L 72,432 L 62,438 L 54,442
  L 48,444 L 44,442 L 42,436 L 42,426 L 44,414 L 42,400
  L 38,388 L 34,378 L 32,366 L 32,352 L 34,338 L 38,324
  L 44,310 L 52,298 L 62,288 L 74,280 L 88,274 L 104,270
  L 120,268 L 132,262 L 140,252 L 144,240 L 144,228 L 140,216
  L 132,206 L 120,198 L 108,192 L 96,188 L 86,182 L 78,174
  L 72,164 L 68,152 L 66,138 L 66,122 L 68,106 L 72,90
  L 78,75 L 86,62 L 96,52 L 108,44 L 122,38 L 138,34
  L 155,32 L 172,33 L 188,38 L 200,46 L 205,55 Z
`

export default function RegionsMap() {
  const [active, setActive] = useState<RegionPoint | null>(null)

  return (
    <>
      <style>{`
        .rm-wrap {
          width: 100%;
          border-top: var(--border);
          border-bottom: var(--border);
          background: #f5f4f1;
          position: relative;
          overflow: hidden;
        }
        .rm-inner {
          display: grid;
          grid-template-columns: 1fr 320px;
          min-height: 480px;
        }
        @media (max-width: 900px) {
          .rm-inner { grid-template-columns: 1fr; }
        }

        /* SVG map */
        .rm-svg-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sp-8);
        }
        .rm-svg {
          width: 100%;
          max-width: 560px;
          height: auto;
        }
        .rm-country {
          fill: #e8e4dc;
          stroke: #c8c2b8;
          stroke-width: 1.5;
        }
        .rm-ocean { fill: #f5f4f1; }

        /* Markers */
        .rm-marker { cursor: pointer; }
        .rm-marker__ring {
          fill: none;
          stroke: #080808;
          stroke-width: 1;
          transform-origin: center;
          animation: rmPulse 2.2s ease-out infinite;
        }
        .rm-marker:nth-child(2) .rm-marker__ring { animation-delay: 0.4s; }
        .rm-marker:nth-child(3) .rm-marker__ring { animation-delay: 0.8s; }
        .rm-marker:nth-child(4) .rm-marker__ring { animation-delay: 1.2s; }
        .rm-marker:nth-child(5) .rm-marker__ring { animation-delay: 1.6s; }
        .rm-marker__dot {
          fill: #080808;
          transition: r 200ms ease;
        }
        .rm-marker:hover .rm-marker__dot,
        .rm-marker--active .rm-marker__dot { r: 6; }
        .rm-marker__label {
          font-family: var(--font-ui);
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.08em;
          fill: #080808;
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
        }
        @keyframes rmPulse {
          0%   { r: 5;  opacity: 0.6; }
          80%  { r: 18; opacity: 0;   }
          100% { r: 18; opacity: 0;   }
        }

        /* Info panel */
        .rm-panel {
          border-left: var(--border);
          padding: var(--sp-12) var(--sp-8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 480px;
          background: #f9f9f7;
        }
        @media (max-width: 900px) {
          .rm-panel {
            border-left: none;
            border-top: var(--border);
            min-height: auto;
            padding: var(--sp-6) 0;
          }
        }
        .rm-panel__empty {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-style: italic;
          color: var(--grey-400);
        }
        .rm-panel__label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-4);
        }
        .rm-panel__name {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--black);
          margin-bottom: var(--sp-6);
        }
        .rm-panel__overview {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--grey-600);
          margin-bottom: var(--sp-8);
          flex: 1;
        }
        .rm-panel__link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          border: var(--border);
          height: 36px;
          padding: 0 var(--sp-6);
          transition: background var(--t), color var(--t);
          text-decoration: none;
          align-self: flex-start;
        }
        .rm-panel__link:hover { background: var(--black); color: var(--white); }

        /* Hint */
        .rm-hint {
          position: absolute;
          bottom: var(--sp-4);
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 300ms ease;
        }
        .rm-hint--hidden { opacity: 0; }
      `}</style>

      <div className="rm-wrap">
        <div className="container">
          <div className="rm-inner">
            {/* SVG map */}
            <div className="rm-svg-wrap">
              <svg
                className="rm-svg"
                viewBox="0 0 600 580"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Map of Morocco weaving regions"
              >
                {/* Ocean background */}
                <rect width="600" height="580" className="rm-ocean" />

                {/* Morocco outline — simplified shape */}
                <g transform="translate(-30, -20) scale(0.78)">
                  {/* Main Morocco body */}
                  <path className="rm-country" d={`
                    M 185,45 L 215,38 L 250,33 L 290,30 L 330,28 L 370,28
                    L 405,32 L 435,38 L 460,46 L 480,56 L 495,68 L 505,82
                    L 510,98 L 508,116 L 502,132 L 492,146 L 480,158
                    L 468,170 L 458,184 L 452,200 L 450,218 L 452,236
                    L 458,252 L 468,266 L 478,280 L 485,296 L 486,314
                    L 482,330 L 474,344 L 462,356 L 448,366 L 432,374
                    L 415,380 L 396,384 L 376,386 L 356,386 L 336,384
                    L 316,380 L 297,374 L 278,366 L 260,356 L 244,344
                    L 230,330 L 218,316 L 208,300 L 198,284 L 188,268
                    L 175,254 L 160,242 L 143,232 L 126,226 L 110,222
                    L 96,222 L 84,224 L 74,230 L 66,240 L 62,252
                    L 60,266 L 62,280 L 68,293 L 76,304 L 72,312
                    L 62,316 L 54,318 L 48,316 L 44,310 L 44,300
                    L 46,288 L 44,274 L 40,262 L 38,248 L 38,233
                    L 40,218 L 46,203 L 55,190 L 66,179 L 80,170
                    L 96,164 L 113,160 L 126,154 L 133,143 L 135,130
                    L 133,117 L 126,105 L 115,95 L 102,88 L 90,82
                    L 80,74 L 73,63 L 70,50 L 70,36 L 74,22 L 82,12
                    L 94,5 L 110,1 L 128,0 L 146,2 L 163,8 L 176,18
                    L 185,30 Z
                  `} />
                  {/* Western Sahara extension */}
                  <path className="rm-country" d={`
                    M 60,316 L 54,318 L 44,320 L 34,326 L 26,336 L 20,348
                    L 16,362 L 14,378 L 14,394 L 16,410 L 20,424 L 28,436
                    L 38,445 L 48,452 L 54,455 L 52,462 L 44,468 L 36,472
                    L 28,474 L 20,472 L 12,468 L 6,461 L 2,452 L 0,440
                    L 0,426 L 2,411 L 4,396 L 2,381 L 0,365 L 0,349
                    L 2,334 L 8,320 L 16,308 L 26,298 L 38,292 L 50,290
                    L 62,292 L 72,298 L 78,306 L 76,312 L 68,314 Z
                  `} />
                </g>

                {/* Region markers */}
                {REGION_POINTS.map(region => (
                  <g
                    key={region.slug}
                    className={`rm-marker${active?.slug === region.slug ? ' rm-marker--active' : ''}`}
                    onClick={() => setActive(prev => prev?.slug === region.slug ? null : region)}
                    role="button"
                    aria-label={region.name}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setActive(prev => prev?.slug === region.slug ? null : region)}
                  >
                    <circle
                      className="rm-marker__ring"
                      cx={region.cx}
                      cy={region.cy}
                      r={5}
                    />
                    <circle
                      className="rm-marker__dot"
                      cx={region.cx}
                      cy={region.cy}
                      r={active?.slug === region.slug ? 6 : 4}
                    />
                    <text
                      className="rm-marker__label"
                      x={region.cx + 10}
                      y={region.cy + 3}
                    >
                      {region.name}
                    </text>
                  </g>
                ))}
              </svg>

              <span className={`rm-hint${active ? ' rm-hint--hidden' : ''}`}>
                Select a marker
              </span>
            </div>

            {/* Info panel */}
            <div className="rm-panel">
              {!active ? (
                <p className="rm-panel__empty">
                  Select a region on the map to explore its weaving tradition.
                </p>
              ) : (
                <>
                  <span className="rm-panel__label">Region</span>
                  <h3 className="rm-panel__name">{active.name}</h3>
                  <p className="rm-panel__overview">{active.overview}</p>
                  <Link href={`/regions/${active.slug}`} className="rm-panel__link">
                    Explore {active.name} →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
