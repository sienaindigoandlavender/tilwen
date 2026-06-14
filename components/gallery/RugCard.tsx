import Link from 'next/link'
import Image from 'next/image'
import type { Rug } from '@/types'

interface Props {
  rug: Rug
  label?: string
}

export default function RugCard({ rug, label }: Props) {
  const hero = rug.images[0] || 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'
  const dim = `${rug.length_cm} × ${rug.width_cm} cm`
  const price = `€${rug.price.toLocaleString('en-EU')}`

  return (
    <>
      <style>{`
        .rug-card { display: block; }
        .rug-card__img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--grey-100);
        }
        .rug-card__img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 600ms var(--ease);
        }
        .rug-card:hover .rug-card__img-wrap img { transform: scale(1.03); }
        .rug-card__avail {
          position: absolute; top: 12px; right: 12px;
        }
        .rug-card__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: 0.375rem;
        }
        .rug-card__body { padding: var(--sp-4) 0 0; }
        .rug-card__name-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--sp-4);
        }
        .rug-card__given {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--black);
        }
        .rug-card__price {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          color: var(--black);
          white-space: nowrap;
        }
        .rug-card__cultural {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--grey-800);
          font-style: italic;
          margin-top: 0.125rem;
          line-height: 1.3;
        }
        .rug-card__meta {
          display: flex;
          gap: var(--sp-4);
          margin-top: 0.5rem;
        }
        .rug-card__tag {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-600);
        }
        .rug-card__atmo {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--black);
        }
      `}</style>

      <Link href={`/moroccan-rugs/${rug.slug}`} className="rug-card">
        {label && <p className="rug-card__label">{label}</p>}
        <div className="rug-card__img-wrap">
          <Image src={hero} alt={`${rug.given_name} — ${rug.cultural_name}`} fill sizes="(max-width:768px) 100vw, 33vw" />
          <span className={`rug-card__avail avail avail--${rug.availability_status}`}>
            {rug.availability_status === 'available' ? 'Available' : rug.availability_status === 'reserved' ? 'Reserved' : 'Sold'}
          </span>
        </div>
        <div className="rug-card__body">
          <div className="rug-card__name-row">
            <span className="rug-card__given">{rug.given_name}</span>
            <span className="rug-card__price">{price}</span>
          </div>
          <p className="rug-card__cultural">{rug.cultural_name}</p>
          <div className="rug-card__meta">
            <span className="rug-card__tag">{rug.region}</span>
            <span className="rug-card__tag">·</span>
            <span className="rug-card__tag">{dim}</span>
            <span className="rug-card__tag">·</span>
            <span className="rug-card__atmo">{rug.atmosphere_summary}</span>
          </div>
        </div>
      </Link>
    </>
  )
}
