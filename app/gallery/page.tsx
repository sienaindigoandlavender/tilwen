import Link from 'next/link'
import Image from 'next/image'
import { rugs } from '@/data/rugs'
import type { Rug } from '@/types'

export const metadata = { title: 'Gallery' }

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'Flatweave', value: 'flatweave-kilim' },
  { label: 'Pile-Knotted', value: 'pile-knotted' },
  { label: 'High Atlas', value: 'high-atlas' },
  { label: 'Anti-Atlas', value: 'anti-atlas' },
  { label: 'Middle Atlas', value: 'middle-atlas' },
  { label: 'Haouz Plain', value: 'haouz-plain' },
  { label: 'Available', value: 'available' },
]

export default function GalleryPage() {
  const available = rugs.filter(r => r.availability_status !== 'sold')

  return (
    <>
      <style>{`
        .gal-top {
          padding: var(--sp-16) 0 var(--sp-8);
          border-bottom: var(--border);
        }
        .gal-top__inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .gal-top__title {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--black);
        }
        .gal-top__count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
        }

        /* Filter bar */
        .gal-filters {
          padding: var(--sp-4) 0;
          border-bottom: var(--border);
          display: flex;
          gap: var(--sp-4);
          flex-wrap: wrap;
          align-items: center;
        }
        .gal-filter {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          color: var(--grey-600);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: color var(--t);
        }
        .gal-filter:hover { color: var(--black); }
        .gal-filter--active {
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: 1px;
        }
        .gal-filter-sep {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          color: var(--grey-200);
        }

        /* 6-col grid */
        .gal-grid {
          padding: var(--sp-8) 0 var(--sp-32);
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--sp-8) var(--sp-4);
        }
        @media (max-width: 1100px) { .gal-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .gal-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px)  { .gal-grid { grid-template-columns: repeat(2, 1fr); } }

        .gal-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .gal-item__img {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--grey-100);
        }
        .gal-item__img img { transition: transform 600ms var(--ease); }
        .gal-item:hover .gal-item__img img { transform: scale(1.05); }

        /* Availability dot on image */
        .gal-item__avail {
          position: absolute;
          top: 6px; right: 6px;
          width: 6px; height: 6px;
          border-radius: 50%;
          z-index: 2;
        }
        .gal-item__avail--available { background: var(--black); }
        .gal-item__avail--reserved  { background: var(--grey-400); }
        .gal-item__avail--sold      { background: transparent; border: 1px solid var(--grey-400); }

        .gal-item__body { padding: 0.5rem 0 0; }
        .gal-item__ref {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.15rem;
        }
        .gal-item__name {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 400;
          color: var(--black);
          display: block;
          letter-spacing: 0.005em;
          line-height: 1.3;
        }
        .gal-item__meta {
          margin-top: 0.15rem;
          font-family: var(--font-ui);
          font-size: 0.4375rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-400);
        }

        .gal-empty {
          grid-column: 1 / -1;
          padding: var(--sp-24) 0;
          text-align: center;
          font-family: var(--font-body);
          font-style: italic;
          color: var(--grey-400);
        }
      `}</style>

      {/* Top bar */}
      <div className="gal-top">
        <div className="container">
          <div className="gal-top__inner">
            <span className="gal-top__title">Gallery</span>
            <span className="gal-top__count">{available.length} pieces available</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="gal-filters">
        <div className="container" style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          {FILTERS.map((f, i) => (
            <>
              {i > 0 && <span key={`sep-${i}`} className="gal-filter-sep">·</span>}
              <button key={f.value} className={`gal-filter${f.value === '' ? ' gal-filter--active' : ''}`}>
                {f.label}
              </button>
            </>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="gal-grid">
          {available.length === 0 && (
            <p className="gal-empty">No pieces currently available.</p>
          )}
          {available.map((rug, i) => {
            const hero = rug.images[0]
            const ref = `(${String(i).padStart(3, '0')})`
            return (
              <Link key={rug.slug} href={`/gallery/${rug.slug}`} className="gal-item">
                <div className="gal-item__img">
                  {hero && (
                    <Image src={hero} alt={`${rug.given_name} — ${rug.cultural_name}`} fill style={{ objectFit: 'cover' }} sizes="(max-width:480px) 50vw, (max-width:768px) 33vw, (max-width:1100px) 25vw, 17vw" />
                  )}
                  <span className={`gal-item__avail gal-item__avail--${rug.availability_status}`} />
                </div>
                <div className="gal-item__body">
                  <span className="gal-item__ref">{ref}</span>
                  <span className="gal-item__name">{rug.given_name}</span>
                  <p className="gal-item__meta">{rug.region} · {rug.length_cm} × {rug.width_cm} cm · €{rug.price.toLocaleString()}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
