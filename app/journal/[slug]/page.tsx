import { notFound } from 'next/navigation'
import { essayArticleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { essays, getEssayBySlug } from '@/data/essays'
import { rugs } from '@/data/rugs'
import { glossary } from '@/data/glossary'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return essays.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.excerpt,
    alternates: { canonical: `https://www.tilwen.com/journal/${essay.slug}` },
    openGraph: { title: essay.title, description: essay.excerpt, type: 'article', url: `https://www.tilwen.com/journal/${essay.slug}`, images: essay.cover_image ? [{ url: essay.cover_image, alt: essay.title }] : [] },
  }
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)
  if (!essay) notFound()

  const featuredRugs = essay.featured_rug_slugs
    .map(s => rugs.find(r => r.slug === s))
    .filter(Boolean) as typeof rugs

  const relatedEssays = essays
    .filter(e => e.slug !== essay.slug)
    .filter(e => e.theme_tags.some(t => essay.theme_tags.includes(t)))
    .slice(0, 2)

  // Render essay body — markdown-lite
  const renderBody = (body: string) => {
    return body.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            lineHeight: 1.2,
            margin: '2.5em 0 0.75em',
            color: 'var(--black)',
          }}>
            {block.replace('## ', '')}
          </h2>
        )
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            margin: '2em 0 0.5em',
            color: 'var(--black)',
          }}>
            {block.replace('### ', '')}
          </h3>
        )
      }
      return (
        <p key={i} style={{ marginBottom: '1.4em' }}>{block}</p>
      )
    })
  }

  return (
    <>
      <style>{`
        .ep { padding-bottom: var(--sp-32); }

        /* ── Hero image ─────────────────────────────────────── */
        .ep-hero {
          width: 100%;
          aspect-ratio: 21/9;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
        }
        @media (max-width: 768px) { .ep-hero { aspect-ratio: 3/2; } }

        /* ── Nav bar above title ─────────────────────────────── */
        .ep-nav {
          padding: var(--sp-8) 0 var(--sp-6);
          border-bottom: var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ep-back {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          transition: color var(--t);
          border-bottom: 1px solid transparent;
        }
        .ep-back:hover { color: var(--black); border-bottom-color: var(--black); }
        .ep-nav-tags { display: flex; gap: var(--sp-4); align-items: center; }
        .ep-nav-tag {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
        }

        /* ── Title block ─────────────────────────────────────── */
        .ep-title-block {
          padding: var(--sp-16) 0 var(--sp-12);
          border-bottom: var(--border);
          max-width: 820px;
        }
        .ep-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: var(--black);
          margin-bottom: var(--sp-8);
        }
        .ep-standfirst {
          font-family: var(--font-body);
          font-size: 1.1875rem;
          line-height: 1.7;
          color: var(--grey-600);
          font-style: italic;
          max-width: 56ch;
        }

        /* ── Reading layout ──────────────────────────────────── */
        .ep-body-wrap {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: var(--sp-16);
          padding: var(--sp-12) 0;
          align-items: start;
        }
        @media (max-width: 960px) { .ep-body-wrap { grid-template-columns: 1fr; } }

        /* ── Essay text ──────────────────────────────────────── */
        .ep-text {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.85;
          color: var(--black);
          max-width: 64ch;
        }
        .ep-text p { margin-bottom: 1.4em; }
        .ep-text p:last-child { margin-bottom: 0; }

        /* Pull quote */
        .ep-pullquote {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2vw, 1.75rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--black);
          border-left: 3px solid var(--black);
          padding: var(--sp-4) 0 var(--sp-4) var(--sp-8);
          margin: var(--sp-12) 0;
        }

        /* ── Sidebar ─────────────────────────────────────────── */
        .ep-sidebar {
          position: sticky;
          top: 76px;
          display: flex;
          flex-direction: column;
          gap: var(--sp-6);
        }
        .ep-sidebar-block {
          border: var(--border);
          padding: var(--sp-6);
        }
        .ep-sidebar-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: block;
        }
        .ep-sidebar-rug {
          display: block;
          margin-bottom: var(--sp-4);
        }
        .ep-sidebar-rug:last-child { margin-bottom: 0; }

        /* ── Rule divider ────────────────────────────────────── */
        .ep-rule {
          border: none;
          border-top: var(--border);
          margin: var(--sp-16) 0;
        }

        /* ── Related essays ──────────────────────────────────── */
        .ep-related { padding: var(--sp-12) 0; border-top: var(--border); }
        .ep-related-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-8);
          margin-top: var(--sp-8);
        }
        @media (max-width: 640px) { .ep-related-grid { grid-template-columns: 1fr; } }
        .ep-related-item {
          display: block;
          padding: var(--sp-6);
          border: var(--border);
          transition: background var(--t);
          color: inherit;
          text-decoration: none;
        }
        .ep-related-item:hover { background: var(--grey-100); }
        .ep-related-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: var(--sp-2);
          color: var(--black);
        }
        .ep-related-excerpt {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.55;
        }

        /* ── Rugs grid at bottom ─────────────────────────────── */
        .ep-rugs { padding: var(--sp-12) 0; border-top: var(--border); }
        .ep-rugs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6);
          margin-top: var(--sp-8);
        }
        @media (max-width: 768px) { .ep-rugs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ep-rugs-grid { grid-template-columns: 1fr; } }
      `}</style>

      <article className="ep">

        {/* Full-bleed hero */}
        {essay.cover_image && (
          <div className="ep-hero">
            <Image
              src={essay.cover_image}
              alt={essay.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="container">
          {/* Nav */}
          <div className="ep-nav">
            <Link href="/journal" className="ep-back">← Journal</Link>
            <div className="ep-nav-tags">
              {essay.theme_tags.slice(0, 2).map(t => (
                <span key={t} className="ep-nav-tag">{t}</span>
              ))}
              <span className="ep-nav-tag">·</span>
              <span className="ep-nav-tag">{essay.reading_time_minutes} min read</span>
            </div>
          </div>

          {/* Title */}
          <div className="ep-title-block">
            <h1 className="ep-title">{essay.title}</h1>
            <p className="ep-standfirst">{essay.excerpt}</p>
          </div>

          {/* Body + sidebar */}
          <div className="ep-body-wrap">
            <div className="ep-text">
              {renderBody(essay.body)}
            </div>

            {/* Sidebar */}
            <aside className="ep-sidebar">
              {featuredRugs.length > 0 && (
                <div className="ep-sidebar-block">
                  <span className="ep-sidebar-label">Pieces in the Gallery</span>
                  {featuredRugs.map(r => (
                    <Link key={r.slug} href={`/gallery/${r.slug}`} className="ep-sidebar-rug">
                      <RugCard rug={r} />
                    </Link>
                  ))}
                </div>
              )}

              {/* Glossary terms from this essay's themes */}
              {(() => {
                const relevant = glossary
                  .filter(g => essay.motif_slugs.includes(g.slug) || essay.theme_tags.some(t => g.category === 'cultural' && t === 'symbolism') || g.related_essay_slugs.includes(essay.slug))
                  .slice(0, 4)
                return relevant.length > 0 ? (
                  <div className="ep-sidebar-block">
                    <span className="ep-sidebar-label">Glossary</span>
                    {relevant.map(g => (
                      <Link key={g.slug} href={`/glossary/${g.slug}`} style={{ display: 'block', padding: 'var(--sp-2) 0', borderBottom: 'var(--border)', textDecoration: 'none' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 400, color: 'var(--black)', display: 'block' }}>{g.term}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--grey-600)', lineHeight: 1.4, display: 'block', marginTop: '0.125rem' }}>{g.short_definition}</span>
                      </Link>
                    ))}
                  </div>
                ) : null
              })()}

              <Link href="/gallery" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-400)', borderBottom: '1px solid var(--grey-200)', paddingBottom: '1px', alignSelf: 'flex-start', transition: 'all var(--t)' }}>
                Browse the Gallery →
              </Link>
            </aside>
          </div>

          {/* Related essays */}
          {relatedEssays.length > 0 && (
            <div className="ep-related">
              <span className="t-label">Further Reading</span>
              <div className="ep-related-grid">
                {relatedEssays.map(e => (
                  <Link key={e.slug} href={`/journal/${e.slug}`} className="ep-related-item">
                    <p className="ep-related-title">{e.title}</p>
                    <p className="ep-related-excerpt">{e.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Rugs at bottom if not in sidebar */}
          {featuredRugs.length > 1 && (
            <div className="ep-rugs">
              <span className="t-label">Pieces in the Gallery</span>
              <div className="ep-rugs-grid">
                {featuredRugs.map(r => <RugCard key={r.slug} rug={r} />)}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
