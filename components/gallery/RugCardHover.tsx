'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Rug } from '@/types'

interface Props {
  rug: Rug
  index: number
  /** Show the small "One of a kind" marker. Default on. */
  showOneOfAKind?: boolean
}

export default function RugCardHover({ rug, index, showOneOfAKind = true }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const images = rug.images.length > 0 ? rug.images : []

  // Image cycling is handled by the invisible .rhc__zone overlays below
  // (onMouseEnter per zone) — cheap, no layout reads. The old onMouseMove +
  // getBoundingClientRect ran on every pixel of movement and forced synchronous
  // layout, which tripped an INP warning on dense grids. Removed.
  const handleMouseLeave = useCallback(() => setActiveImg(0), [])

  const ft = rug.length_cm > 0
    ? `${(rug.length_cm / 30.48).toFixed(1)} × ${(rug.width_cm / 30.48).toFixed(1)} ft`
    : ''

  // Genuineness signal — truthful, keyed to data we actually have.
  const origin = rug.age_class === 'vintage' || rug.age_class === 'antique'
    ? 'Vintage · Morocco'
    : 'Handwoven · Morocco'

  return (
    <>
      <style>{`
        .rhc { display: block; text-decoration: none; color: inherit; }

        /* Image frame — whole rug on white, no cropping, consistent across grid */
        .rhc__img {
          position: relative;
          aspect-ratio: 1/1;
          overflow: hidden;
          background: #ffffff;
        }
        .rhc__slide {
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 200ms ease;
          will-change: opacity;
        }
        .rhc__slide--active { opacity: 1; }
        .rhc__slide img { transition: transform 600ms var(--ease); }
        .rhc__img:hover .rhc__slide--active img { transform: scale(1.03); }

        .rhc__zones { position: absolute; inset: 0; display: flex; z-index: 3; }
        .rhc__zone { flex: 1; height: 100%; }

        /* One-of-a-kind marker — Tilwen's quiet answer to Revival's badge */
        .rhc__ooak {
          position: absolute; left: 10px; bottom: 10px; z-index: 4;
          font-family: var(--font-ui);
          font-size: 0.4375rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--grey-600);
          opacity: 0; transition: opacity 220ms ease;
        }
        .rhc__img:hover .rhc__ooak { opacity: 1; }

        /* Index dots */
        .rhc__dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 4px; z-index: 4;
          opacity: 0; transition: opacity 200ms ease;
        }
        .rhc__img:hover .rhc__dots { opacity: 1; }
        .rhc__dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(8,8,8,0.25);
          transition: background 160ms ease, transform 160ms ease;
        }
        .rhc__dot--active { background: rgba(8,8,8,0.7); transform: scale(1.3); }

        /* Availability */
        .rhc__avail {
          position: absolute; top: 10px; right: 10px;
          width: 6px; height: 6px; border-radius: 50%; z-index: 4;
        }
        .rhc__avail--available { background: var(--black); }
        .rhc__avail--reserved  { background: var(--grey-400); }
        .rhc__avail--sold      { background: transparent; border: 1px solid var(--grey-400); }

        /* Body — three calm lines: name, dimensions, price */
        .rhc__body { padding: var(--sp-3) 0 0; }
        .rhc__origin {
          display: block; margin-bottom: 0.3rem;
          font-family: var(--font-ui); font-size: 0.4375rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--grey-400);
        }
        .rhc__name {
          font-family: var(--font-display);
          font-size: 1.0625rem; font-weight: 400;
          color: var(--black); line-height: 1.25;
          display: block;
        }
        .rhc__dims {
          margin-top: 0.25rem;
          font-family: var(--font-ui);
          font-size: 0.5625rem; letter-spacing: 0.04em;
          color: var(--grey-600); display: block;
        }
        .rhc__price {
          margin-top: 0.2rem;
          font-family: var(--font-ui);
          font-size: 0.625rem; letter-spacing: 0.03em;
          color: var(--black); display: block;
        }
        .rhc__price--sold { color: var(--grey-400); }
      `}</style>

      <Link href={`/gallery/${rug.slug}`} className="rhc">
        <div className="rhc__img" onMouseLeave={handleMouseLeave}>
          {images.map((src, i) => (
            <div key={src} className={`rhc__slide${i === activeImg ? ' rhc__slide--active' : ''}`}>
              <Image
                src={src}
                alt={i === 0 ? `${rug.given_name} — ${rug.cultural_name}` : `${rug.given_name} view ${i + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width:480px) 50vw, (max-width:768px) 50vw, (max-width:1100px) 33vw, 25vw"
                priority={index < 4 && i === 0}
              />
            </div>
          ))}

          {images.length > 1 && (
            <div className="rhc__zones">
              {images.map((_, i) => (
                <div key={i} className="rhc__zone" onMouseEnter={() => setActiveImg(i)} />
              ))}
            </div>
          )}

          {showOneOfAKind && rug.availability_status !== 'sold' && (
            <span className="rhc__ooak">One of a kind</span>
          )}

          {images.length > 1 && (
            <div className="rhc__dots">
              {images.map((_, i) => (
                <div key={i} className={`rhc__dot${i === activeImg ? ' rhc__dot--active' : ''}`} />
              ))}
            </div>
          )}

          <span className={`rhc__avail rhc__avail--${rug.availability_status}`} />
        </div>

        <div className="rhc__body">
          <span className="rhc__origin">{origin}</span>
          <span className="rhc__name">{rug.given_name}</span>
          {rug.length_cm > 0 && (
            <span className="rhc__dims">{rug.length_cm} × {rug.width_cm} cm · {ft}</span>
          )}
          <span className={`rhc__price${rug.availability_status === 'sold' ? ' rhc__price--sold' : ''}`}>
            {rug.availability_status === 'sold' ? 'Sold' : `€${rug.price.toLocaleString()}`}
          </span>
        </div>
      </Link>
    </>
  )
}
