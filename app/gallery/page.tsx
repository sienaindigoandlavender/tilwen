import { getAllRugsSafe } from '@/lib/rug-source'
import GalleryFilters from '@/components/gallery/GalleryFilters'

export const revalidate = 600

export const metadata = {
  title: 'Moroccan Berber Rugs — Genuine Handwoven Vintage & One-of-a-Kind',
  description: 'Genuine handwoven Moroccan Berber rugs — vintage Beni Ourain, Boujad, Azilal, and more. Each one knotted by a single weaver, never reproduced. One of a kind.',
  alternates: { canonical: 'https://www.tilwen.com/gallery' },
  openGraph: { title: 'Moroccan Berber Rugs', description: 'Genuine handwoven Moroccan Berber rugs — one of a kind, never reproduced.', url: 'https://www.tilwen.com/gallery' },
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
          flex-direction: column;
          gap: var(--sp-4);
          max-width: 62ch;
        }
        .gal-top__title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: -0.01em;
          color: var(--black);
        }
        .gal-top__blurb {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.6;
          color: var(--grey-600);
        }
      `}</style>

      <div className="gal-page">
        <div className="gal-top">
          <div className="container">
            <div className="gal-top__inner">
              <h1 className="gal-top__title">Moroccan Berber Rugs</h1>
              <p className="gal-top__blurb">Genuine handwoven Berber rugs from the mountains and high plains of Morocco — each one knotted by a single weaver, never reproduced. Vintage pieces carry the marks of the family that lived with them. Every rug is one of a kind, and when it is gone, it is gone.</p>
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
