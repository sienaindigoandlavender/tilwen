'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Rug } from '@/types'

const PALETTE: Record<string, { hex: string; label: string }> = {
  ivory:      { hex: '#F5F1E8', label: 'Ivory' },
  cream:      { hex: '#EDE8D8', label: 'Cream' },
  ochre:      { hex: '#C8932A', label: 'Ochre' },
  saffron:    { hex: '#E8A020', label: 'Saffron' },
  terracotta: { hex: '#C4522A', label: 'Terracotta' },
  rust:       { hex: '#A83420', label: 'Rust' },
  red:        { hex: '#9B1C1C', label: 'Red' },
  orange:     { hex: '#D4621A', label: 'Orange' },
  brown:      { hex: '#6B3D1E', label: 'Brown' },
  walnut:     { hex: '#4A2C0A', label: 'Walnut' },
  indigo:     { hex: '#2A3A6B', label: 'Indigo' },
  blue:       { hex: '#3A5A8A', label: 'Blue' },
  charcoal:   { hex: '#3A3832', label: 'Charcoal' },
  black:      { hex: '#1A1816', label: 'Black' },
  grey:       { hex: '#8A8680', label: 'Grey' },
  sage:       { hex: '#6B7A5A', label: 'Sage' },
  green:      { hex: '#3A5A2A', label: 'Green' },
  sand:       { hex: '#C8B890', label: 'Sand' },
  pink:       { hex: '#D4708A', label: 'Pink' },
  undyed:     { hex: '#E8E2D4', label: 'Undyed' },
}

const LIGHT_COLOURS = new Set(['ivory', 'cream', 'sand', 'undyed'])

interface Props {
  rug: Rug
  index: number
}

export default function RugCardHover({ rug, index }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const images = rug.images.length > 0 ? rug.images : []
  const ref = `(${String(index).padStart(3, '0')})`
  const swatches = (rug.palette_tags || []).slice(0, 5).map(t => PALETTE[t]).filter(Boolean)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length <= 1) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    const segment = width / images.length
    const idx = Math.min(Math.floor(x / segment), images.length - 1)
    setActiveImg(idx)
  }, [images.length])

  const handleMouseLeave = useCallback(() => setActiveImg(0), [])

  return (
    <>
      <style>{`
        .rhc { display: block; text-decoration: none; color: inherit; }

        /* Image container */
        .rhc__img {
          position: relative;
          aspect-ratio: 1/1;
          overflow: hidden;
          background: var(--grey-100);
        }

        /* All images stacked, only active one visible */
        .rhc__slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 180ms ease;
          will-change: opacity;
        }
        .rhc__slide--active { opacity: 1; }

        /* Hover zones — invisible segments that trigger image change */
        .rhc__zones {
          position: absolute;
          inset: 0;
          display: flex;
          z-index: 3;
        }
        .rhc__zone { flex: 1; height: 100%; }

        /* Image index dots */
        .rhc__dots {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          z-index: 4;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .rhc__img:hover .rhc__dots { opacity: 1; }
        .rhc__dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(249,249,247,0.5);
          transition: background 160ms ease, transform 160ms ease;
        }
        .rhc__dot--active {
          background: rgba(249,249,247,0.95);
          transform: scale(1.3);
        }

        /* Availability dot */
        .rhc__avail {
          position: absolute;
          top: 8px; right: 8px;
          width: 6px; height: 6px;
          border-radius: 50%;
          z-index: 4;
        }
        .rhc__avail--available { background: var(--black); }
        .rhc__avail--reserved  { background: var(--grey-400); }
        .rhc__avail--sold      { background: transparent; border: 1px solid var(--grey-400); }

        /* Subtle zoom on hover */
        .rhc__slide img {
          transition: transform 600ms var(--ease);
        }
        .rhc__img:hover .rhc__slide--active img {
          transform: scale(1.04);
        }

        /* Body */
        .rhc__body { padding: 0.5rem 0 0; }
        .rhc__ref {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.1rem;
        }
        .rhc__name {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 400;
          color: var(--black);
          display: block;
          letter-spacing: 0.005em;
          line-height: 1.3;
        }
        .rhc__meta {
          margin-top: 0.125rem;
          font-family: var(--font-ui);
          font-size: 0.4375rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-400);
          line-height: 1.4;
        }

        /* Colour swatches */
        .rhc__swatches {
          display: flex;
          gap: 3px;
          margin-top: 5px;
          align-items: center;
        }
        .rhc__swatch {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .rhc__swatch--light { box-shadow: inset 0 0 0 1px var(--grey-200); }
      `}</style>

      <Link href={`/gallery/${rug.slug}`} className="rhc">
        <div
          className="rhc__img"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Stacked images */}
          {images.map((src, i) => (
            <div
              key={src}
              className={`rhc__slide${i === activeImg ? ' rhc__slide--active' : ''}`}
            >
              <Image
                src={src}
                alt={i === 0 ? `${rug.given_name} — ${rug.cultural_name}` : `${rug.given_name} view ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:480px) 50vw, (max-width:768px) 33vw, (max-width:1100px) 25vw, 17vw"
                priority={index < 6 && i === 0}
              />
            </div>
          ))}

          {/* Invisible hover zones */}
          {images.length > 1 && (
            <div className="rhc__zones">
              {images.map((_, i) => (
                <div
                  key={i}
                  className="rhc__zone"
                  onMouseEnter={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="rhc__dots">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`rhc__dot${i === activeImg ? ' rhc__dot--active' : ''}`}
                />
              ))}
            </div>
          )}

          {/* Availability */}
          <span className={`rhc__avail rhc__avail--${rug.availability_status}`} />
        </div>

        <div className="rhc__body">
          <span className="rhc__ref">{ref}</span>
          <span className="rhc__name">{rug.given_name}</span>
          <p className="rhc__meta">
            {rug.length_cm} × {rug.width_cm} cm · €{rug.price.toLocaleString()}
          </p>
          {swatches.length > 0 && (
            <div className="rhc__swatches">
              {swatches.map(({ hex, label }) => (
                <span
                  key={label}
                  className={`rhc__swatch${LIGHT_COLOURS.has(label.toLowerCase()) ? ' rhc__swatch--light' : ''}`}
                  style={{ background: hex }}
                  title={label}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </>
  )
}
