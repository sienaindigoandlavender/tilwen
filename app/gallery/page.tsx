import { getAllRugsSafe } from '@/lib/rug-source'
import GalleryFilters from '@/components/gallery/GalleryFilters'

export const revalidate = 600

export const metadata = {
  title: 'Gallery — Moroccan & Amazigh Rugs',
  description: 'Browse the Tilwen gallery of Moroccan and Amazigh rugs — vintage kilims, Beni Ourain, Azilal, Zanafi, and more. Each piece is one of a kind, fully documented.',
  alternates: { canonical: 'https://tilwen.com/gallery' },
  openGraph: { title: 'Gallery — Moroccan & Amazigh Rugs', description: 'One-of-a-kind Moroccan and Amazigh rugs, fully documented.', url: 'https://tilwen.com/gallery' },
}

export default async function GalleryPage() {
  const rugs = await getAllRugsSafe()
  const available = rugs.filter(r => r.availability_status !== 'sold')

  return (
    <>
      <style>{`
        /* Gallery sits on pure white so rug photos blend seamlessly —
           the rest of the site keeps its warm off-white. */
        .gal-page { background: #ffffff; min-height: 100vh; }
        .gal-top {
          padding: var(--sp-16) 0 var(--sp-10);
        }
        .gal-top__inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .gal-top__title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.01em;
          color: var(--black);
        }
        .gal-top__count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
        }
      `}</style>

      <div className="gal-page">
        <div className="gal-top">
          <div className="container">
            <div className="gal-top__inner">
              <span className="gal-top__title">Gallery</span>
              <span className="gal-top__count">{available.length} pieces</span>
            </div>
          </div>
        </div>

        {available.length > 0 ? (
          <GalleryFilters rugs={available} />
        ) : (
          <div className="container" style={{ padding: 'var(--sp-24) 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.0625rem', color: 'var(--grey-600)' }}>
            New pieces are being documented. The gallery reopens shortly.
          </p>
        </div>
        )}
      </div>
    </>
  )
}
