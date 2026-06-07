import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motifs, getMotifBySlug } from '@/data/motifs'
import { rugs } from '@/data/rugs'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return motifs.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const motif = getMotifBySlug(params.slug)
  if (!motif) return {}
  return { title: `${motif.name} — Motif` }
}

export default function MotifPage({ params }: { params: { slug: string } }) {
  const motif = getMotifBySlug(params.slug)
  if (!motif) notFound()

  const motifRugs = rugs.filter(r => r.motif_slugs.includes(motif.slug))
  const relatedMotifs = motif.related_motif_slugs.map(s => motifs.find(m => m.slug === s)).filter(Boolean)

  return (
    <>
      <style>{`
        .motif-page { padding-bottom: var(--sp-32); }
        .motif-page-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .motif-page-body {
          display: grid; grid-template-columns: 1fr 360px; gap: var(--sp-16);
          padding: var(--sp-12) 0; align-items: start;
        }
        @media (max-width: 900px) { .motif-page-body { grid-template-columns: 1fr; } }
        .motif-rugs { padding: var(--sp-12) 0 0; border-top: var(--border); }
        .motif-rugs__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-6); margin-top: var(--sp-8); }
        @media (max-width: 768px) { .motif-rugs__grid { grid-template-columns: repeat(2, 1fr); } }
        .motif-related { padding: var(--sp-8); border: var(--border); }
        .motif-related__title { margin-bottom: var(--sp-4); }
        .motif-related__list { display: flex; flex-direction: column; gap: var(--sp-4); }
        .motif-related__item { display: block; transition: all var(--t); padding: var(--sp-4); border: var(--border); }
        .motif-related__item:hover { background: var(--grey-100); }
        .motif-related__name { font-family: var(--font-display); font-size: 1.125rem; font-weight: 400; }
        .motif-related__sum { font-family: var(--font-body); font-size: 0.8125rem; color: var(--grey-600); margin-top: 0.25rem; }
      `}</style>

      <div className="motif-page">
        <div className="motif-page-header">
          <div className="container">
            <p className="t-label fade-up"><Link href="/motifs" style={{ color: 'var(--grey-600)' }}>Motifs</Link> /</p>
            <h1 className="t-display fade-up-1" style={{ marginTop: 'var(--sp-2)' }}>{motif.name}</h1>
            <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-4)', maxWidth: '60ch', color: 'var(--grey-600)' }}>
              {motif.summary}
            </p>
          </div>
        </div>

        <div className="container">
          <div className="motif-page-body">
            <div>
              <div style={{ paddingBottom: 'var(--sp-8)', borderBottom: 'var(--border)' }}>
                <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Cultural Reading</p>
                <div className="prose">
                  {motif.cultural_reading.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              {motif.variant_forms && (
                <div style={{ paddingTop: 'var(--sp-8)' }}>
                  <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Variant Forms</p>
                  <p className="t-body" style={{ color: 'var(--grey-600)' }}>{motif.variant_forms}</p>
                </div>
              )}
            </div>

            <div>
              {relatedMotifs.length > 0 && (
                <div className="motif-related">
                  <p className="t-label motif-related__title">Related Motifs</p>
                  <div className="motif-related__list">
                    {relatedMotifs.map(m => m && (
                      <Link key={m.slug} href={`/motifs/${m.slug}`} className="motif-related__item">
                        <p className="motif-related__name">{m.name}</p>
                        <p className="motif-related__sum">{m.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rugs carrying this motif */}
          <div className="motif-rugs">
            <span className="t-label">
              {motifRugs.length > 0 ? `${motifRugs.length} Piece${motifRugs.length > 1 ? 's' : ''} in the Gallery` : 'No pieces currently in the gallery'}
            </span>
            {motifRugs.length === 0 && (
              <p className="t-body" style={{ color: 'var(--grey-600)', fontStyle: 'italic', marginTop: 'var(--sp-4)' }}>
                We do not currently have a piece carrying this motif. <Link href="/inquire" style={{ borderBottom: '1px solid var(--grey-200)' }}>Contact us</Link> if you are looking for one specifically.
              </p>
            )}
            {motifRugs.length > 0 && (
              <div className="motif-rugs__grid">
                {motifRugs.map(r => <RugCard key={r.slug} rug={r} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
