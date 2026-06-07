import Link from 'next/link'
import { regions } from '@/data/regions'

export const metadata = { title: 'Regions' }

export default function RegionsPage() {
  return (
    <>
      <style>{`
        .regions-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .regions-list { padding: var(--sp-12) 0 var(--sp-32); }
        .region-item {
          display: grid;
          grid-template-columns: 200px 1fr 1fr;
          gap: var(--sp-8);
          padding: var(--sp-8) 0;
          border-bottom: var(--border);
          align-items: start;
          transition: background var(--t);
        }
        @media (max-width: 768px) { .region-item { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .region-item { grid-template-columns: 1fr; } }
        .region-item__name {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .region-item__overview {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-600);
          line-height: 1.65;
        }
        .region-item__grammar {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-600);
          line-height: 1.65;
          font-style: italic;
        }
        @media (max-width: 768px) { .region-item__grammar { display: none; } }
        .region-item__link {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: inline-block;
          margin-top: var(--sp-4);
          border-bottom: 1px solid var(--grey-200);
          padding-bottom: 1px;
          transition: all var(--t);
        }
        .region-item__link:hover { color: var(--black); border-bottom-color: var(--black); }
      `}</style>

      <div className="regions-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Origin</p>
          <h1 className="t-display fade-up-1">Weaving Regions</h1>
          <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-6)', maxWidth: '60ch', color: 'var(--grey-600)' }}>
            Each region of Morocco produces a distinct visual language. Understanding where a rug comes from — its climate, communities, and material culture — is the starting point for understanding what it means.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="regions-list">
          {regions.map(r => (
            <div key={r.slug} className="region-item">
              <div>
                <Link href={`/regions/${r.slug}`}>
                  <h2 className="region-item__name">{r.name}</h2>
                  <span className="region-item__link">Browse rugs →</span>
                </Link>
              </div>
              <p className="region-item__overview">{r.overview}</p>
              <p className="region-item__grammar">{r.visual_grammar}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
