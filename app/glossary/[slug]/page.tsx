import { notFound } from 'next/navigation'
import { glossaryTermJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import Link from 'next/link'
import { glossary, getGlossaryBySlug, CATEGORY_LABELS } from '@/data/glossary'
import { rugs } from '@/data/rugs'
import { motifs } from '@/data/motifs'
import { regions } from '@/data/regions'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return glossary.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = getGlossaryBySlug(params.slug)
  if (!entry) return {}
  return {
    title: `${entry.term} — Moroccan Rug Glossary`,
    description: `${entry.short_definition} Definition, cultural context, and buying relevance from the Tilwen glossary of Moroccan and Amazigh rug terminology.`,
    alternates: { canonical: `https://www.tilwen.com/glossary/${entry.slug}` },
    openGraph: { title: `${entry.term} — Definition`, description: entry.short_definition, url: `https://www.tilwen.com/glossary/${entry.slug}` },
  }
}

export default function GlossaryEntryPage({ params }: { params: { slug: string } }) {
  const entry = getGlossaryBySlug(params.slug)
  if (!entry) notFound()

  const relatedTerms = entry.related_term_slugs
    .map(s => glossary.find(e => e.slug === s))
    .filter(Boolean)

  const relatedMotifItems = entry.related_motif_slugs
    .map(s => motifs.find(m => m.slug === s))
    .filter(Boolean)

  const relatedRegionItems = entry.related_region_slugs
    .map(s => regions.find(r => r.slug === s))
    .filter(Boolean)

  const relatedRugItems = entry.related_rug_slugs
    .map(s => rugs.find(r => r.slug === s))
    .filter(Boolean)

  // Also find any rugs matching by technique or category
  const categoryRugs = entry.category === 'technique'
    ? rugs.filter(r =>
        r.technique_slug === entry.slug ||
        (entry.slug === 'kilim' && r.technique_slug === 'flatweave-kilim') ||
        (entry.slug === 'flatweave' && r.technique_slug === 'flatweave-kilim') ||
        (entry.slug === 'pile-knotted' && r.technique_slug === 'pile-knotted') ||
        (entry.slug === 'boucherouitte' && r.technique_slug === 'boucherouitte')
      ).filter(r => !entry.related_rug_slugs.includes(r.slug))
    : []

  const allRugs = [...relatedRugItems.filter(Boolean) as typeof rugs, ...categoryRugs]

  // Render explanation — bold **text** → <strong>
  const renderExplanation = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.includes(':**')) {
        // Heading-style paragraph
        const colonIdx = para.indexOf(':**')
        const heading = para.slice(2, colonIdx)
        const body = para.slice(colonIdx + 3).trim()
        return (
          <p key={i} style={{ marginBottom: '1.1em' }}>
            <strong style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35em', color: 'var(--black)' }}>
              {heading}
            </strong>
            {body}
          </p>
        )
      }
      return <p key={i} style={{ marginBottom: '1.25em' }}>{para}</p>
    })
  }

  const termLd = glossaryTermJsonLd(entry)
  const faqLd = faqJsonLd([
    { question: `What is ${entry.term}?`, answer: `${entry.short_definition} ${entry.why_it_matters}` },
    { question: `Why does ${entry.term} matter when buying a Moroccan rug?`, answer: entry.why_it_matters },
  ])
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Glossary', url: 'https://www.tilwen.com/glossary' },
    { name: entry.term, url: `https://www.tilwen.com/glossary/${entry.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <style>{`
        .ge-page { padding-bottom: var(--sp-32); }

        /* Header */
        .ge-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .ge-breadcrumb {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ge-breadcrumb a { color: var(--grey-400); transition: color var(--t); }
        .ge-breadcrumb a:hover { color: var(--black); }
        .ge-cat-pill {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: var(--border);
          padding: 0.25rem 0.65rem;
          color: var(--grey-600);
          display: inline-block;
          margin-left: var(--sp-2);
        }
        .ge-short-def {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--grey-600);
          font-style: italic;
          margin-top: var(--sp-4);
          max-width: 60ch;
        }

        /* Language note */
        .ge-lang-note {
          font-family: var(--font-body);
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--grey-600);
          font-style: italic;
          padding: var(--sp-4) var(--sp-6);
          border-left: 2px solid var(--grey-200);
          margin: var(--sp-6) 0;
        }

        /* Body layout */
        .ge-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: var(--sp-16);
          padding: var(--sp-12) 0;
          align-items: start;
        }
        @media (max-width: 900px) { .ge-body { grid-template-columns: 1fr; } }

        /* Section */
        .ge-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .ge-section:first-child { border-top: none; padding-top: 0; }
        .ge-section-label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-6);
          display: block;
        }
        .ge-explanation {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--black);
        }
        .ge-why {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          padding: var(--sp-6);
          background: var(--grey-100);
          border-left: 3px solid var(--grey-800);
        }

        /* Sidebar */
        .ge-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: var(--sp-6); }
        .ge-sidebar-block { border: var(--border); padding: var(--sp-6); }
        .ge-sidebar-block-title {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: block;
        }

        /* Related terms */
        .ge-term-list { display: flex; flex-direction: column; gap: 0; }
        .ge-term-item {
          display: block;
          padding: var(--sp-2) 0;
          border-bottom: var(--border);
          transition: all var(--t);
        }
        .ge-term-item:last-child { border-bottom: none; }
        .ge-term-item:hover { padding-left: var(--sp-2); }
        .ge-term-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--black);
          display: block;
        }
        .ge-term-def {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--grey-600);
          line-height: 1.4;
          display: block;
          margin-top: 0.125rem;
        }

        /* Knowledge links */
        .ge-knowledge-item {
          display: block;
          padding: var(--sp-3, 0.75rem) 0;
          border-bottom: var(--border);
          transition: all var(--t);
        }
        .ge-knowledge-item:last-child { border-bottom: none; }
        .ge-knowledge-item:hover { padding-left: var(--sp-2); }
        .ge-knowledge-type {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.125rem;
        }
        .ge-knowledge-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--black);
        }

        /* Rugs section */
        .ge-rugs { padding: var(--sp-12) 0 0; border-top: var(--border); }
        .ge-rugs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6);
          margin-top: var(--sp-8);
        }
        @media (max-width: 768px) { .ge-rugs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ge-rugs-grid { grid-template-columns: 1fr; } }
        .ge-rugs-empty {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          color: var(--grey-400);
          margin-top: var(--sp-4);
        }

        /* Nav arrows */
        .ge-nav {
          padding: var(--sp-8) 0;
          border-top: var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--sp-4);
          margin-top: var(--sp-8);
        }
        .ge-nav a {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-600);
          border-bottom: 1px solid var(--grey-200);
          transition: all var(--t);
        }
        .ge-nav a:hover { color: var(--black); border-bottom-color: var(--black); }
      `}</style>

      <div className="ge-page magazine-surface">
        {/* Header */}
        <div className="ge-header">
          <div className="container">
            <div className="ge-breadcrumb">
              <Link href="/glossary">Glossary</Link>
              <span>/</span>
              <span style={{ color: 'var(--black)' }}>{entry.term}</span>
              <span className="ge-cat-pill">{CATEGORY_LABELS[entry.category]}</span>
            </div>
            <h1 className="t-display fade-up" style={{ marginTop: 'var(--sp-2)' }}>{entry.term}</h1>
            <p className="ge-short-def fade-up-1">{entry.short_definition}</p>
          </div>
        </div>

        <div className="container">
          <div className="ge-body">
            {/* Left: main content */}
            <div>
              {/* Language note */}
              {entry.language_note && (
                <div className="ge-lang-note">{entry.language_note}</div>
              )}

              {/* Explanation */}
              <div className="ge-section">
                <span className="ge-section-label">Definition</span>
                <div className="ge-explanation">
                  {renderExplanation(entry.explanation)}
                </div>
              </div>

              {/* Why it matters */}
              <div className="ge-section">
                <span className="ge-section-label">Why it matters for buying</span>
                <div className="ge-why">
                  {entry.why_it_matters}
                </div>
              </div>
            </div>

            {/* Right: sidebar */}
            <div className="ge-sidebar">
              {/* Related terms */}
              {relatedTerms.length > 0 && (
                <div className="ge-sidebar-block">
                  <span className="ge-sidebar-block-title">Related Terms</span>
                  <div className="ge-term-list">
                    {relatedTerms.map(t => t && (
                      <Link key={t.slug} href={`/glossary/${t.slug}`} className="ge-term-item">
                        <span className="ge-term-name">{t.term}</span>
                        <span className="ge-term-def">{t.short_definition}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related knowledge: motifs + regions */}
              {(relatedMotifItems.length > 0 || relatedRegionItems.length > 0) && (
                <div className="ge-sidebar-block">
                  <span className="ge-sidebar-block-title">Related Knowledge</span>
                  {relatedMotifItems.map(m => m && (
                    <Link key={m.slug} href={`/motifs/${m.slug}`} className="ge-knowledge-item">
                      <span className="ge-knowledge-type">Motif</span>
                      <span className="ge-knowledge-name">{m.name}</span>
                    </Link>
                  ))}
                  {relatedRegionItems.map(r => r && (
                    <Link key={r.slug} href={`/regions/${r.slug}`} className="ge-knowledge-item">
                      <span className="ge-knowledge-type">Region</span>
                      <span className="ge-knowledge-name">{r.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Back to glossary */}
              <Link
                href="/glossary"
                className="t-ui"
                style={{ color: 'var(--grey-400)', borderBottom: '1px solid var(--grey-200)', alignSelf: 'flex-start', paddingBottom: '1px' }}
              >
                ← All terms
              </Link>
            </div>
          </div>

          {/* Rugs in gallery */}
          <div className="ge-rugs">
            <span className="t-label">
              {allRugs.length > 0
                ? `${allRugs.length} Piece${allRugs.length > 1 ? 's' : ''} in the Gallery`
                : 'No pieces currently in the gallery'}
            </span>
            {allRugs.length === 0 && (
              <p className="ge-rugs-empty">
                We do not currently have a piece relevant to this term.{' '}
                <Link href="/inquire" style={{ borderBottom: '1px solid var(--grey-200)' }}>Contact us</Link>{' '}
                if you are looking for something specific.
              </p>
            )}
            {allRugs.length > 0 && (
              <div className="ge-rugs-grid">
                {allRugs.map(r => <RugCard key={r.slug} rug={r} />)}
              </div>
            )}
          </div>

          {/* Bottom nav */}
          <div className="ge-nav">
            <Link href="/glossary">← Back to Glossary</Link>
            <Link href="/moroccan-rugs">Browse all rugs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
