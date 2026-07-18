import { notFound } from 'next/navigation'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import Link from 'next/link'
import { rugTypes, getRugTypeBySlug } from '@/data/rug-types'
import { glossary } from '@/data/glossary'
import { regions } from '@/data/regions'
import { motifs } from '@/data/motifs'

export async function generateStaticParams() {
  return rugTypes.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const type = getRugTypeBySlug(params.slug)
  if (!type) return {}
  return {
    title: `${type.name} Rugs — Moroccan Amazigh Rug Tradition`,
    description: `${type.short_definition} Origin, technique, palette, buying intelligence, and cultural context.`,
    alternates: { canonical: `https://tilwen.com/traditions/${type.slug}` },
    openGraph: { title: `${type.name} Rugs`, description: type.short_definition, url: `https://tilwen.com/traditions/${type.slug}` },
  }
}

export default function TraditionPage({ params }: { params: { slug: string } }) {
  const type = getRugTypeBySlug(params.slug)
  if (!type) notFound()

  const relatedGlossary = type.glossary_term_slugs
    .map(s => glossary.find(g => g.slug === s))
    .filter(Boolean)

  const relatedRegions = type.region_slugs
    .map(s => regions.find(r => r.slug === s))
    .filter(Boolean)

  // Motifs commonly associated with this rug type
  const TRADITION_MOTIFS: Record<string, string[]> = {
    'beni-ourain':  ['lozenge', 'diamond-grid'],
    'beni-mguild':  ['lozenge', 'diamond-grid'],
    'beni-mrirt':   ['lozenge', 'diamond-grid'],
    'azilal':       ['lozenge', 'asymmetry'],
    'zemmour':      ['lozenge', 'diamond-grid', 'stripe-field'],
    'boujad':       ['lozenge', 'asymmetry'],
    'zanafi':       ['stripe-field'],
    'taznakht':     ['stripe-field'],
    'boucherouitte':[],
  }
  const relatedMotifs = (TRADITION_MOTIFS[type.slug] || [])
    .map(s => motifs.find(m => m.slug === s))
    .filter(Boolean)

  const renderBody = (text: string) =>
    text.split('\n\n').map((p, i) => <p key={i} style={{ marginBottom: '1.4em' }}>{p}</p>)

  const faqLd = faqJsonLd([
    { question: `What is a ${type.name} rug?`, answer: `${type.short_definition} ${type.buying_notes}` },
    { question: `Where do ${type.name} rugs come from?`, answer: type.origin },
    { question: `What technique is used in ${type.name} rugs?`, answer: type.technique },
    ...(type.commercial_warning ? [{ question: `How do I identify an authentic ${type.name} rug?`, answer: type.commercial_warning }] : []),
  ])
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Traditions', url: 'https://tilwen.com/traditions' },
    { name: type.name, url: `https://tilwen.com/traditions/${type.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <style>{`
        .tp { padding-bottom: var(--sp-32); }
        .tp-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .tp-back { font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey-400); border-bottom: 1px solid transparent; transition: all var(--t); }
        .tp-back:hover { color: var(--black); border-bottom-color: var(--black); }
        .tp-short-def { font-family: var(--font-body); font-size: 1.125rem; line-height: 1.7; color: var(--grey-600); font-style: italic; margin-top: var(--sp-6); max-width: 60ch; }

        /* Meta table */
        .tp-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: var(--border); border-bottom: var(--border); margin: var(--sp-8) 0; }
        @media (max-width: 768px) { .tp-meta { grid-template-columns: 1fr; } }
        .tp-meta-cell { padding: var(--sp-6) var(--sp-6) var(--sp-6) 0; border-right: var(--border); }
        .tp-meta-cell:last-child { border-right: none; }
        @media (max-width: 768px) { .tp-meta-cell { border-right: none; border-bottom: var(--border); } .tp-meta-cell:last-child { border-bottom: none; } }
        .tp-meta-label { font-family: var(--font-ui); font-size: 0.5rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400); display: block; margin-bottom: var(--sp-2); }
        .tp-meta-value { font-family: var(--font-body); font-size: 0.9375rem; color: var(--black); line-height: 1.5; }

        /* Body */
        .tp-body { display: grid; grid-template-columns: 1fr 280px; gap: var(--sp-16); padding: var(--sp-8) 0; align-items: start; }
        @media (max-width: 960px) { .tp-body { grid-template-columns: 1fr; } }
        .tp-text { font-family: var(--font-body); font-size: 1.125rem; line-height: 1.85; color: var(--black); max-width: 64ch; }

        /* Buying notes */
        .tp-buying { padding: var(--sp-6); background: var(--grey-100); border-left: 3px solid var(--grey-800); margin-top: var(--sp-8); font-family: var(--font-body); font-size: 1rem; line-height: 1.75; color: var(--grey-600); }
        .tp-buying-label { font-family: var(--font-ui); font-size: 0.5rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--black); display: block; margin-bottom: var(--sp-3); }

        /* Warning */
        .tp-warning { padding: var(--sp-4) var(--sp-6); border: 1px solid var(--grey-200); margin-top: var(--sp-4); font-family: var(--font-body); font-size: 0.875rem; line-height: 1.65; color: var(--grey-600); }
        .tp-warning-label { font-family: var(--font-ui); font-size: 0.5rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400); display: block; margin-bottom: var(--sp-2); }

        /* Sidebar */
        .tp-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: var(--sp-6); }
        .tp-sidebar-block { border: var(--border); padding: var(--sp-6); }
        .tp-sidebar-label { font-family: var(--font-ui); font-size: 0.5rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400); margin-bottom: var(--sp-4); display: block; }
        .tp-link-item { display: flex; justify-content: space-between; align-items: center; padding: var(--sp-2) 0; border-bottom: var(--border); text-decoration: none; color: inherit; transition: padding var(--t); }
        .tp-link-item:last-child { border-bottom: none; }
        .tp-link-item:hover { padding-left: var(--sp-2); }
        .tp-link-name { font-family: var(--font-body); font-size: 0.9375rem; color: var(--black); }
        .tp-link-type { font-family: var(--font-ui); font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-400); }

        /* Language note */
        .tp-lang { font-family: var(--font-body); font-size: 0.875rem; font-style: italic; color: var(--grey-600); border-left: 2px solid var(--grey-200); padding: var(--sp-3) var(--sp-6); margin-top: var(--sp-8); }

        /* Bottom nav */
        .tp-bottom-nav { padding: var(--sp-8) 0; border-top: var(--border); margin-top: var(--sp-8); display: flex; justify-content: space-between; }
        .tp-bottom-nav a { font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-600); border-bottom: 1px solid var(--grey-200); transition: all var(--t); }
        .tp-bottom-nav a:hover { color: var(--black); border-bottom-color: var(--black); }
      `}</style>

      <div className="tp magazine-surface">
        <div className="tp-header">
          <div className="container">
            <Link href="/traditions" className="tp-back">← Rug Traditions</Link>
            <h1 className="t-display fade-up" style={{ marginTop: 'var(--sp-4)' }}>{type.name}</h1>
            <p className="tp-short-def">{type.short_definition}</p>
          </div>
        </div>

        <div className="container">
          {/* Meta */}
          <div className="tp-meta">
            <div className="tp-meta-cell">
              <span className="tp-meta-label">Origin</span>
              <span className="tp-meta-value">{type.origin}</span>
            </div>
            <div className="tp-meta-cell" style={{ padding: 'var(--sp-6)' }}>
              <span className="tp-meta-label">Technique</span>
              <span className="tp-meta-value">{type.technique}</span>
            </div>
            <div className="tp-meta-cell" style={{ padding: 'var(--sp-6)' }}>
              <span className="tp-meta-label">Palette</span>
              <span className="tp-meta-value">{type.palette}</span>
            </div>
          </div>

          {/* Body + sidebar */}
          <div className="tp-body">
            <div>
              <div className="tp-text">{renderBody(type.description)}</div>

              {type.language_note && <div className="tp-lang">{type.language_note}</div>}

              <div className="tp-buying">
                <span className="tp-buying-label">Buying Intelligence</span>
                {type.buying_notes}
              </div>

              {type.commercial_warning && (
                <div className="tp-warning">
                  <span className="tp-warning-label">Commercial note</span>
                  {type.commercial_warning}
                </div>
              )}
            </div>

            <aside className="tp-sidebar">
              {relatedGlossary.length > 0 && (
                <div className="tp-sidebar-block">
                  <span className="tp-sidebar-label">Glossary</span>
                  {relatedGlossary.map(g => g && (
                    <Link key={g.slug} href={`/glossary/${g.slug}`} className="tp-link-item">
                      <span className="tp-link-name">{g.term}</span>
                      <span className="tp-link-type">Definition</span>
                    </Link>
                  ))}
                </div>
              )}
              {relatedRegions.length > 0 && (
                <div className="tp-sidebar-block">
                  <span className="tp-sidebar-label">Region</span>
                  {relatedRegions.map(r => r && (
                    <Link key={r.slug} href={`/regions/${r.slug}`} className="tp-link-item">
                      <span className="tp-link-name">{r.name}</span>
                      <span className="tp-link-type">Region</span>
                    </Link>
                  ))}
                </div>
              )}
              {relatedMotifs.length > 0 && (
                <div className="tp-sidebar-block">
                  <span className="tp-sidebar-label">Motifs</span>
                  {relatedMotifs.map(m => m && (
                    <Link key={m.slug} href={`/motifs/${m.slug}`} className="tp-link-item">
                      <span className="tp-link-name">{m.name}</span>
                      <span className="tp-link-type">Motif</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/moroccan-rugs" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-400)', borderBottom: '1px solid var(--grey-200)', paddingBottom: '1px', alignSelf: 'flex-start' }}>
                Browse the Gallery →
              </Link>
            </aside>
          </div>

          <div className="tp-bottom-nav">
            <Link href="/traditions">← All Traditions</Link>
            <Link href="/moroccan-rugs">Browse the Gallery →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
