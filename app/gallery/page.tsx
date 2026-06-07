import { rugs } from '@/data/rugs'
import RugCard from '@/components/gallery/RugCard'

export const metadata = { title: 'Gallery' }

export default function GalleryPage() {
  const available = rugs.filter(r => r.availability_status !== 'sold')

  return (
    <>
      <style>{`
        .gallery-header {
          padding: var(--sp-16) 0 var(--sp-8);
          border-bottom: var(--border);
        }
        .gallery-header__inner {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: var(--sp-8);
        }
        .gallery-meta {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          color: var(--grey-600);
          letter-spacing: 0.04em;
        }
        .gallery-filters {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
          display: flex; gap: var(--sp-4); flex-wrap: wrap; align-items: center;
        }
        .gallery-filter-label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-right: var(--sp-2);
        }
        .gallery-filter-tag {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          letter-spacing: 0.06em;
          color: var(--black);
          border: var(--border);
          padding: 0.25rem 0.75rem;
          transition: all var(--t);
          cursor: pointer;
          background: transparent;
        }
        .gallery-filter-tag:hover,
        .gallery-filter-tag--active {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-8) var(--sp-6);
          padding: var(--sp-12) 0 var(--sp-16);
        }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
        .gallery-empty {
          padding: var(--sp-24) 0;
          text-align: center;
          color: var(--grey-400);
          font-family: var(--font-body);
          font-style: italic;
        }
      `}</style>

      <div className="gallery-header">
        <div className="container">
          <div className="gallery-header__inner">
            <div>
              <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Gallery</p>
              <h1 className="t-display fade-up-1">All Rugs</h1>
            </div>
            <p className="gallery-meta">{available.length} pieces available</p>
          </div>
        </div>
      </div>

      <div className="gallery-filters">
        <div className="container" style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="gallery-filter-label">Filter:</span>
          <button className="gallery-filter-tag gallery-filter-tag--active">All</button>
          <button className="gallery-filter-tag">Flatweave</button>
          <button className="gallery-filter-tag">Pile-Knotted</button>
          <button className="gallery-filter-tag">High Atlas</button>
          <button className="gallery-filter-tag">Anti-Atlas</button>
          <button className="gallery-filter-tag">Middle Atlas</button>
          <button className="gallery-filter-tag">Haouz Plain</button>
          <button className="gallery-filter-tag">Available Only</button>
        </div>
      </div>

      <div className="container">
        {available.length > 0 ? (
          <div className="gallery-grid">
            {available.map(rug => (
              <RugCard key={rug.slug} rug={rug} />
            ))}
          </div>
        ) : (
          <p className="gallery-empty">No pieces currently available. Please check back soon.</p>
        )}
      </div>
    </>
  )
}
