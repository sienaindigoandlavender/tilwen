import Link from 'next/link'
import { rugTypes } from '@/data/rug-types'

export const metadata = {
  title: 'Traditions',
  description: 'The rug types of Morocco — Azilal, Beni Ourain, Beni M\'Guild, Beni M\'Rirt, Taznakht, Zanafi, Boujad, Zemmour, Boucherouitte.',
}

export default function TraditionsPage() {
  return (
    <>
      <style>{`
        .tr-top { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .tr-top__inner { display: flex; align-items: baseline; justify-content: space-between; gap: var(--sp-8); flex-wrap: wrap; }
        .tr-top__title { font-family: var(--font-ui); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--black); }
        .tr-top__count { font-family: var(--font-ui); font-size: 0.6875rem; letter-spacing: 0.06em; color: var(--grey-400); }
        .tr-statement { padding: var(--sp-6) 0; border-bottom: var(--border); }
        .tr-statement__text { font-family: var(--font-body); font-size: 0.9375rem; font-style: italic; color: var(--grey-600); max-width: 72ch; }

        /* 6-col grid */
        .tr-grid { padding: var(--sp-8) 0 var(--sp-32); display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--sp-8) var(--sp-4); }
        @media (max-width: 1100px) { .tr-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .tr-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px)  { .tr-grid { grid-template-columns: repeat(2, 1fr); } }

        .tr-item { display: block; text-decoration: none; color: inherit; }
        .tr-item__img {
          position: relative; aspect-ratio: 1/1; overflow: hidden; background: var(--grey-100);
          display: flex; align-items: center; justify-content: center;
        }
        .tr-item__placeholder {
          font-family: var(--font-display); font-size: 2rem; font-weight: 300;
          letter-spacing: -0.03em; color: var(--grey-200);
        }
        .tr-item:hover .tr-item__placeholder { color: var(--grey-400); }
        .tr-item__body { padding: 0.5rem 0 0; }
        .tr-item__ref { font-family: var(--font-ui); font-size: 0.5rem; letter-spacing: 0.06em; color: var(--grey-400); display: block; margin-bottom: 0.15rem; }
        .tr-item__name { font-family: var(--font-ui); font-size: 0.6875rem; font-weight: 400; color: var(--black); display: block; letter-spacing: 0.005em; line-height: 1.3; }
        .tr-item__origin { margin-top: 0.15rem; font-family: var(--font-ui); font-size: 0.4375rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--grey-400); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="tr-top">
        <div className="container">
          <div className="tr-top__inner">
            <span className="tr-top__title">Rug Traditions</span>
            <span className="tr-top__count">{rugTypes.length} types</span>
          </div>
        </div>
      </div>

      <div className="tr-statement">
        <div className="container">
          <p className="tr-statement__text">
            Each tradition is a distinct response to a specific landscape, community, and material culture. Understanding the type is the starting point for understanding the piece.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="tr-grid">
          {rugTypes.map((type, i) => (
            <Link key={type.slug} href={`/traditions/${type.slug}`} className="tr-item">
              <div className="tr-item__img">
                <span className="tr-item__placeholder">{type.name[0]}</span>
              </div>
              <div className="tr-item__body">
                <span className="tr-item__ref">({String(i).padStart(3, '0')})</span>
                <span className="tr-item__name">{type.name}</span>
                <p className="tr-item__origin">{type.origin}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
