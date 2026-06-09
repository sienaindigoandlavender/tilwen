import Link from 'next/link'
import Image from 'next/image'
import { motifs } from '@/data/motifs'

export const metadata = {
  title: 'Motifs & Symbols — Amazigh Weaving',
  description: 'The symbolic grammar of Amazigh weaving — lozenge, broken comb, diamond grid, and more. Cultural readings, variant forms, and the rugs that carry them.',
  alternates: { canonical: 'https://www.tilwen.com/motifs' },
  openGraph: { title: 'Motifs & Symbols — Amazigh Weaving', description: 'The symbolic grammar of Amazigh weaving.', url: 'https://www.tilwen.com/motifs' },
}

export default function MotifsPage() {
  return (
    <>
      <style>{`
        .mo-top {
          padding: var(--sp-16) 0 var(--sp-8);
          border-bottom: var(--border);
        }
        .mo-top__inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .mo-top__title {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--black);
        }
        .mo-top__count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
        }

        /* Statement bar */
        .mo-statement {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-12);
          flex-wrap: wrap;
        }
        .mo-statement__text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          color: var(--grey-600);
          max-width: 72ch;
        }
        .mo-statement__note {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
          white-space: nowrap;
        }

        /* 6-col grid */
        .mo-grid {
          padding: var(--sp-8) 0 var(--sp-32);
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--sp-8) var(--sp-4);
        }
        @media (max-width: 1100px) { .mo-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .mo-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px)  { .mo-grid { grid-template-columns: repeat(2, 1fr); } }

        .mo-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .mo-item__img {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--grey-100);
        }
        /* Placeholder SVG pattern when no image */
        .mo-item__placeholder {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--grey-100);
        }
        .mo-item__img img { transition: transform 600ms var(--ease); }
        .mo-item:hover .mo-item__img img { transform: scale(1.05); }

        .mo-item__body { padding: 0.5rem 0 0; }
        .mo-item__ref {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.15rem;
        }
        .mo-item__name {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 400;
          color: var(--black);
          display: block;
          letter-spacing: 0.005em;
          line-height: 1.3;
        }
        .mo-item__summary {
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
      <div className="mo-top">
        <div className="container">
          <div className="mo-top__inner">
            <span className="mo-top__title">Motifs &amp; Symbols</span>
            <span className="mo-top__count">{motifs.length} entries</span>
          </div>
        </div>
      </div>

      {/* Statement */}
      <div className="mo-statement">
        <div className="container" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-12)', flexWrap: 'wrap' }}>
          <p className="mo-statement__text">
            The marks were not decorative. A lozenge placed in the border of a domestic textile was a protective act. The broken comb was deliberate incompleteness — because perfection invites envy, and the women who wove these objects understood that envy has weight.
          </p>
          <span className="mo-statement__note">Readings are grounded in scholarship. Contested meanings are noted.</span>
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="mo-grid">
          {motifs.map((motif, i) => {
            const ref = `(${String(i).padStart(3, '0')})`
            return (
              <Link key={motif.slug} href={`/motifs/${motif.slug}`} className="mo-item">
                <div className="mo-item__img">
                  {motif.example_image ? (
                    <Image src={motif.example_image} alt={motif.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:480px) 50vw, (max-width:768px) 33vw, 17vw" />
                  ) : (
                    <div className="mo-item__placeholder">
                      {/* Tanit-mark SVG placeholder */}
                      <svg width="40" height="48" viewBox="0 0 100 120" fill="none" opacity="0.15">
                        <polygon points="50,4 64,18 50,32 36,18" stroke="#080808" strokeWidth="3.5" fill="none"/>
                        <line x1="50" y1="32" x2="50" y2="46" stroke="#080808" strokeWidth="3.5"/>
                        <line x1="8" y1="46" x2="92" y2="46" stroke="#080808" strokeWidth="3.5"/>
                        <line x1="8" y1="46" x2="8" y2="32" stroke="#080808" strokeWidth="3.5"/>
                        <line x1="8" y1="32" x2="20" y2="32" stroke="#080808" strokeWidth="3.5"/>
                        <line x1="92" y1="46" x2="92" y2="32" stroke="#080808" strokeWidth="3.5"/>
                        <line x1="80" y1="32" x2="92" y2="32" stroke="#080808" strokeWidth="3.5"/>
                        <polyline points="50,46 36,46 36,60 22,60 22,74 14,74 14,88 8,96" stroke="#080808" strokeWidth="3.5" fill="none"/>
                        <polyline points="50,46 64,46 64,60 78,60 78,74 86,74 86,88 92,96" stroke="#080808" strokeWidth="3.5" fill="none"/>
                        <line x1="8" y1="96" x2="92" y2="96" stroke="#080808" strokeWidth="3.5"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mo-item__body">
                  <span className="mo-item__ref">{ref}</span>
                  <span className="mo-item__name">{motif.name}</span>
                  <p className="mo-item__summary">{motif.summary}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
