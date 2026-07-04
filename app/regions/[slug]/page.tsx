import { notFound } from 'next/navigation'
import Link from 'next/link'
import { regions, getRegionBySlug } from '@/data/regions'
import { rugs } from '@/data/rugs'
import { rugTypes } from '@/data/rug-types'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return regions.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug)
  if (!region) return {}
  return {
    title: `${region.name} — Moroccan Weaving Region`,
    description: `${region.overview.slice(0, 155)}...`,
    alternates: { canonical: `https://www.tilwen.com/regions/${region.slug}` },
    openGraph: { title: `${region.name} — Moroccan Weaving Region`, description: region.overview.slice(0, 155), url: `https://www.tilwen.com/regions/${region.slug}` },
  }
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug)
  if (!region) notFound()

  const regionRugs = rugs.filter(r => r.region_slug === region.slug)

  // Rug traditions associated with this region
  const REGION_TRADITIONS: Record<string, string[]> = {
    'high-atlas':   ['azilal'],
    'middle-atlas': ['beni-ourain', 'beni-mguild', 'beni-mrirt', 'zemmour'],
    'anti-atlas':   ['taznakht', 'zanafi'],
    'haouz-plain':  ['boujad', 'boucherouitte'],
    'saharan':      ['zanafi', 'taznakht'],
  }
  const regionTraditions = (REGION_TRADITIONS[region.slug] || [])
    .map(s => rugTypes.find(t => t.slug === s))
    .filter(Boolean)

  return (
    <>
      <style>{`
        .region-page { padding-bottom: var(--sp-32); }
        .region-page-header { padding: var(--sp-16) 0; border-bottom: var(--border); }
        .region-page-body {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 0; padding: var(--sp-12) 0; border-bottom: var(--border);
        }
        @media (max-width: 768px) { .region-page-body { grid-template-columns: 1fr; } }
        .region-section {
          padding: var(--sp-6); border-right: var(--border);
        }
        .region-section:last-child { border-right: none; }
        @media (max-width: 768px) { .region-section { border-right: none; border-bottom: var(--border); padding: var(--sp-6) 0; } }
        .region-rugs { padding: var(--sp-12) 0 0; }
        .region-rugs__grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6); margin-top: var(--sp-8);
        }
        @media (max-width: 768px) { .region-rugs__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .region-rugs__grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="region-page magazine-surface">
        <div className="region-page-header">
          <div className="container">
            <p className="t-label fade-up"><Link href="/regions" style={{ color: 'var(--grey-600)' }}>Regions</Link> /</p>
            <h1 className="t-display fade-up-1" style={{ marginTop: 'var(--sp-2)' }}>{region.name}</h1>
          </div>
        </div>

        <div className="container">
          <div className="region-page-body">
            <div className="region-section">
              <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Overview</p>
              <p className="t-body-sm" style={{ color: 'var(--grey-700)' }}>{region.overview}</p>
            </div>
            <div className="region-section">
              <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Visual Grammar</p>
              <p className="t-body-sm" style={{ color: 'var(--grey-700)', fontStyle: 'italic' }}>{region.visual_grammar}</p>
            </div>
            <div className="region-section">
              <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Technique Traditions</p>
              <p className="t-body-sm" style={{ color: 'var(--grey-700)' }}>{region.technique_traditions}</p>
            </div>
          </div>

          <div className="region-rugs">
            <span className="t-label">
              {regionRugs.length > 0 ? `${regionRugs.length} Piece${regionRugs.length > 1 ? 's' : ''} from this Region` : 'No pieces currently available from this region'}
            </span>
            {regionRugs.length === 0 && (
              <p className="t-body" style={{ color: 'var(--grey-600)', fontStyle: 'italic', marginTop: 'var(--sp-4)' }}>
                We do not currently have a piece from this region. <Link href="/inquire" style={{ borderBottom: '1px solid var(--grey-200)' }}>Contact us</Link> if you are looking for one.
              </p>
            )}
            {regionRugs.length > 0 && (
              <div className="region-rugs__grid">
                {regionRugs.map(r => <RugCard key={r.slug} rug={r} />)}
              </div>
            )}
          </div>

          {/* Traditions from this region */}
          {regionTraditions.length > 0 && (
            <div style={{ padding: 'var(--sp-12) 0', borderTop: 'var(--border)', marginTop: 'var(--sp-8)' }}>
              <span className="t-label" style={{ display: 'block', marginBottom: 'var(--sp-6)' }}>Rug Traditions from this Region</span>
              <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
                {regionTraditions.map(t => t && (
                  <Link key={t.slug} href={`/traditions/${t.slug}`} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'var(--border)', padding: '0.4rem 0.875rem', color: 'var(--black)', transition: 'all var(--t)', textDecoration: 'none', display: 'inline-block' }}>
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
