import Link from 'next/link'
import { motifs } from '@/data/motifs'

export const metadata = { title: 'Motifs' }

export default function MotifsPage() {
  return (
    <>
      <style>{`
        .motifs-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .motifs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-left: var(--border);
          margin-top: var(--sp-12);
        }
        @media (max-width: 768px) { .motifs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .motifs-grid { grid-template-columns: 1fr; } }
        .motif-item {
          padding: var(--sp-8) var(--sp-6);
          border-right: var(--border);
          border-bottom: var(--border);
          display: block;
          transition: background var(--t);
        }
        .motif-item:hover { background: var(--grey-100); }
        .motif-item__name {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: var(--sp-4);
        }
        .motif-item__summary {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-600);
          line-height: 1.6;
          max-width: 36ch;
        }
        .motif-item__arrow {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          letter-spacing: 0.08em;
          color: var(--grey-400);
          margin-top: var(--sp-4);
          display: block;
        }
      `}</style>

      <div className="motifs-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Knowledge</p>
          <h1 className="t-display fade-up-1">Motifs &amp; Symbols</h1>
          <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-6)', maxWidth: '56ch', color: 'var(--grey-600)' }}>
            The symbolic grammar of Amazigh weaving. Each motif is a knowledge node — linked to the rugs that carry it, the regions where it appears, and the essays that interpret it.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'var(--sp-32)' }}>
        <div className="motifs-grid">
          {motifs.map(m => (
            <Link key={m.slug} href={`/motifs/${m.slug}`} className="motif-item">
              <h2 className="motif-item__name">{m.name}</h2>
              <p className="motif-item__summary">{m.summary}</p>
              <span className="motif-item__arrow">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
