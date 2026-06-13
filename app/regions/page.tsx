import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { regions } from '@/data/regions'
import { rugs } from '@/data/rugs'

const RegionsMap = dynamic(() => import('@/components/gallery/RegionsMap'), { ssr: false })

export const metadata = {
  title: 'Weaving Regions — Morocco',
  description: 'The weaving regions of Morocco — High Atlas, Middle Atlas, Anti-Atlas, Haouz Plain, and Saharan. Each region produces a distinct visual language.',
  alternates: { canonical: 'https://tilwen.com/regions' },
  openGraph: { title: 'Weaving Regions — Morocco', description: 'Each region of Morocco produces a distinct visual language.', url: 'https://tilwen.com/regions' },
}

export default function RegionsPage() {
  return (
    <div className="magazine-surface">
      <style>{`
        .rg-top {
          padding: var(--sp-16) 0 var(--sp-8);
          border-bottom: var(--border);
        }
        .rg-top__inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .rg-top__title {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--black);
        }
        .rg-top__count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
        }

        /* Statement */
        .rg-statement {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
        }
        .rg-statement__text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          color: var(--grey-600);
          max-width: 72ch;
        }

        /* Map label */
        .rg-map-bar {
          padding: var(--sp-6) 0 var(--sp-3);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .rg-map-hint {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-style: italic;
          color: var(--grey-400);
        }
        @media (max-width: 600px) { .rg-map-hint { display: none; } }

        /* 6-col grid — uses wide sizing since only 5 regions */
        .rg-grid {
          padding: var(--sp-8) 0 var(--sp-32);
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--sp-8) var(--sp-4);
        }
        @media (max-width: 900px)  { .rg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px)  { .rg-grid { grid-template-columns: repeat(2, 1fr); } }

        .rg-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .rg-item__img {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--grey-100);
        }
        .rg-item__img img { transition: transform 600ms var(--ease); }
        .rg-item:hover .rg-item__img img { transform: scale(1.05); }

        .rg-item__body { padding: 0.5rem 0 0; }
        .rg-item__ref {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.15rem;
        }
        .rg-item__name {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 400;
          color: var(--black);
          display: block;
          letter-spacing: 0.005em;
          line-height: 1.3;
        }
        .rg-item__overview {
          margin-top: 0.15rem;
          font-family: var(--font-ui);
          font-size: 0.4375rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-400);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Top bar */}
      <div className="rg-top">
        <div className="container">
          <div className="rg-top__inner">
            <span className="rg-top__title">Weaving Regions</span>
            <span className="rg-top__count">{regions.length} regions</span>
          </div>
        </div>
      </div>

      {/* Statement */}
      <div className="rg-statement">
        <div className="container">
          <p className="rg-statement__text">
            Each region of Morocco produces a distinct visual language shaped by its climate, communities, and material culture. Understanding where a rug comes from is the starting point for understanding what it means.
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="container">
        <div className="rg-map-bar">
          <span className="t-label">Select a region</span>
          <span className="rg-map-hint">Click a marker to explore a weaving tradition</span>
        </div>
      </div>
      <RegionsMap />

      {/* Grid */}
      <div className="container">
        <div className="rg-grid">
          {regions.map((region, i) => {
            // Use the first available rug image from this region as the card image
            const regionRug = rugs.find(r => r.region_slug === region.slug && r.images.length > 0)
            const img = region.hero_image || regionRug?.images[0] || null
            const ref = `(${String(i).padStart(3, '0')})`
            return (
              <Link key={region.slug} href={`/regions/${region.slug}`} className="rg-item">
                <div className="rg-item__img">
                  {img ? (
                    <Image src={img} alt={region.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:480px) 50vw, (max-width:900px) 33vw, 20vw" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--grey-100)' }} />
                  )}
                </div>
                <div className="rg-item__body">
                  <span className="rg-item__ref">{ref}</span>
                  <span className="rg-item__name">{region.name}</span>
                  <p className="rg-item__overview">{region.overview}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
