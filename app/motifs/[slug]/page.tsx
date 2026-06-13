import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motifs, getMotifBySlug } from '@/data/motifs'
import { rugs } from '@/data/rugs'
import { glossary } from '@/data/glossary'
import { essays } from '@/data/essays'
import { rugTypes } from '@/data/rug-types'
import { regions } from '@/data/regions'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return motifs.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const motif = getMotifBySlug(params.slug)
  if (!motif) return {}
  return {
    title: `${motif.name} — Amazigh Weaving Motif`,
    description: `${motif.summary} Learn the symbolic reading, regional variants, and cultural context of the ${motif.name} motif in Amazigh textile tradition.`,
    alternates: { canonical: `https://tilwen.com/motifs/${motif.slug}` },
    openGraph: { title: `${motif.name} — Amazigh Weaving Motif`, description: motif.summary, url: `https://tilwen.com/motifs/${motif.slug}` },
  }
}

export default function MotifPage({ params }: { params: { slug: string } }) {
  const motif = getMotifBySlug(params.slug)
  if (!motif) notFound()

  const motifRugs = rugs.filter(r => r.motif_slugs.includes(motif.slug))
  const relatedMotifs = motif.related_motif_slugs
    .map(s => motifs.find(m => m.slug === s))
    .filter(Boolean)

  // Glossary terms connected to this motif
  const relatedGlossary = glossary.filter(g =>
    g.related_motif_slugs.includes(motif.slug) ||
    motif.slug === 'lozenge' && ['protective-motif', 'evil-eye', 'tifinagh'].includes(g.slug) ||
    motif.slug === 'broken-comb' && ['protective-motif', 'evil-eye', 'amazigh'].includes(g.slug) ||
    motif.slug === 'asymmetry' && ['protective-motif', 'evil-eye'].includes(g.slug)
  ).slice(0, 4)

  // Essays referencing this motif
  const relatedEssays = essays.filter(e => e.motif_slugs.includes(motif.slug))

  // Regions where this motif appears (from rugs that carry it)
  const regionSlugs = Array.from(new Set(motifRugs.map(r => r.region_slug)))
  const relatedRegions = regionSlugs
    .map(s => regions.find(r => r.slug === s))
    .filter(Boolean)

  // Rug traditions associated with this motif
  const MOTIF_TRADITIONS: Record<string, string[]> = {
    'lozenge':      ['beni-ourain', 'beni-mguild', 'beni-mrirt', 'azilal', 'zemmour', 'boujad'],
    'diamond-grid': ['beni-ourain', 'beni-mguild', 'beni-mrirt', 'zemmour'],
    'stripe-field': ['zanafi', 'taznakht'],
    'broken-comb':  ['azilal', 'boujad'],
    'asymmetry':    ['azilal', 'boucherouitte'],
  }
  const relatedTraditions = (MOTIF_TRADITIONS[motif.slug] || [])
    .map(s => rugTypes.find(t => t.slug === s))
    .filter(Boolean)

  const renderReading = (text: string) =>
    text.split('\n\n').map((para, i) => <p key={i} style={{ marginBottom: '1.4em' }}>{para}</p>)

  return (
    <>
      <style>{`
        .mp { padding-bottom: var(--sp-32); }

        /* ── Hero ────────────────────────────────────────────── */
        .mp-hero {
          width: 100%;
          aspect-ratio: 21/8;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
        }
        @media (max-width: 768px) { .mp-hero { aspect-ratio: 3/2; } }
        .mp-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(8,8,8,0.35) 0%, transparent 60%);
          z-index: 1;
        }
        .mp-hero__title {
          position: absolute;
          bottom: var(--sp-12);
          left: var(--sp-8);
          z-index: 2;
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: var(--white);
        }
        @media (max-width: 600px) { .mp-hero__title { font-size: 2.5rem; bottom: var(--sp-6); left: var(--sp-4); } }

        /* ── Nav ─────────────────────────────────────────────── */
        .mp-nav {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-8);
        }
        .mp-back {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          border-bottom: 1px solid transparent;
          transition: all var(--t);
        }
        .mp-back:hover { color: var(--black); border-bottom-color: var(--black); }

        /* ── Summary block ───────────────────────────────────── */
        .mp-summary {
          padding: var(--sp-12) 0;
          border-bottom: var(--border);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: start;
        }
        @media (max-width: 900px) { .mp-summary { grid-template-columns: 1fr; gap: var(--sp-8); } }
        .mp-summary__text {
          font-family: var(--font-body);
          font-size: 1.1875rem;
          line-height: 1.75;
          color: var(--grey-600);
          font-style: italic;
          max-width: 52ch;
        }
        .mp-summary__meta { display: flex; flex-direction: column; gap: var(--sp-4); }
        .mp-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--sp-3, 0.75rem) 0;
          border-bottom: var(--border);
        }
        .mp-meta-row:last-child { border-bottom: none; }
        .mp-meta-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
        .mp-meta-value {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--black);
          text-align: right;
          max-width: 28ch;
        }

        /* ── Body layout ─────────────────────────────────────── */
        .mp-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--sp-16);
          padding: var(--sp-12) 0;
          align-items: start;
        }
        @media (max-width: 960px) { .mp-body { grid-template-columns: 1fr; } }

        /* ── Reading ─────────────────────────────────────────── */
        .mp-reading-label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-8);
          display: block;
        }
        .mp-reading {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.85;
          color: var(--black);
          max-width: 64ch;
        }
        .mp-reading p:last-child { margin-bottom: 0; }

        /* ── Variant forms ───────────────────────────────────── */
        .mp-variants {
          padding: var(--sp-8) 0 0;
          border-top: var(--border);
          margin-top: var(--sp-8);
        }
        .mp-variants__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: block;
        }
        .mp-variants__list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-2);
        }
        .mp-variant-tag {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-style: italic;
          color: var(--grey-600);
          border: var(--border);
          padding: 0.25rem 0.75rem;
        }

        /* ── Sidebar ─────────────────────────────────────────── */
        .mp-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: var(--sp-6); }
        .mp-sidebar-block { border: var(--border); padding: var(--sp-6); }
        .mp-sidebar-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: block;
        }

        /* Related motifs */
        .mp-rel-motif {
          display: block;
          padding: var(--sp-3, 0.75rem) 0;
          border-bottom: var(--border);
          text-decoration: none;
          color: inherit;
          transition: padding var(--t);
        }
        .mp-rel-motif:last-child { border-bottom: none; }
        .mp-rel-motif:hover { padding-left: var(--sp-2); }
        .mp-rel-motif__name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--black);
          display: block;
        }
        .mp-rel-motif__sum {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--grey-600);
          line-height: 1.4;
          display: block;
          margin-top: 0.125rem;
        }

        /* Glossary / region links */
        .mp-link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--sp-2) 0;
          border-bottom: var(--border);
          text-decoration: none;
          color: inherit;
          transition: padding var(--t);
        }
        .mp-link-item:last-child { border-bottom: none; }
        .mp-link-item:hover { padding-left: var(--sp-2); }
        .mp-link-name {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--black);
        }
        .mp-link-type {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
        }

        /* ── Rugs section ────────────────────────────────────── */
        .mp-rugs { padding: var(--sp-12) 0; border-top: var(--border); }
        .mp-rugs__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6);
          margin-top: var(--sp-8);
        }
        @media (max-width: 768px) { .mp-rugs__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .mp-rugs__grid { grid-template-columns: 1fr; } }
        .mp-rugs__empty {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          color: var(--grey-400);
          margin-top: var(--sp-4);
        }

        /* ── Bottom nav ──────────────────────────────────────── */
        .mp-bottom-nav {
          padding: var(--sp-8) 0;
          border-top: var(--border);
          margin-top: var(--sp-8);
          display: flex;
          justify-content: space-between;
        }
        .mp-bottom-nav a {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-600);
          border-bottom: 1px solid var(--grey-200);
          transition: all var(--t);
        }
        .mp-bottom-nav a:hover { color: var(--black); border-bottom-color: var(--black); }
      `}</style>

      <div className="mp magazine-surface">

        {/* Hero — image with title overlay */}
        {motif.example_image ? (
          <div className="mp-hero">
            <Image src={motif.example_image} alt={motif.name} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
            <div className="mp-hero__overlay" />
            <h1 className="mp-hero__title">{motif.name}</h1>
          </div>
        ) : (
          <div className="mp-hero" style={{ background: 'var(--grey-100)' }}>
            <div className="mp-hero__overlay" />
            <h1 className="mp-hero__title">{motif.name}</h1>
          </div>
        )}

        <div className="container">

          {/* Nav */}
          <div className="mp-nav">
            <Link href="/motifs" className="mp-back">← Motifs &amp; Symbols</Link>
            <span className="t-label">{motifRugs.length > 0 ? `${motifRugs.length} piece${motifRugs.length > 1 ? 's' : ''} in the gallery` : 'No pieces currently in the gallery'}</span>
          </div>

          {/* Summary + meta */}
          <div className="mp-summary">
            <p className="mp-summary__text">{motif.summary}</p>
            <div className="mp-summary__meta">
              <div className="mp-meta-row">
                <span className="mp-meta-label">Tradition</span>
                <span className="mp-meta-value">Moroccan Amazigh weaving</span>
              </div>
              {relatedRegions.length > 0 && (
                <div className="mp-meta-row">
                  <span className="mp-meta-label">Regions</span>
                  <span className="mp-meta-value">{relatedRegions.map(r => r?.name).join(', ')}</span>
                </div>
              )}
              {motif.variant_forms && (
                <div className="mp-meta-row">
                  <span className="mp-meta-label">Documented variants</span>
                  <span className="mp-meta-value">{motif.variant_forms.split(',').length}</span>
                </div>
              )}
              <div className="mp-meta-row">
                <span className="mp-meta-label">Related motifs</span>
                <span className="mp-meta-value">{relatedMotifs.length}</span>
              </div>
            </div>
          </div>

          {/* Body + sidebar */}
          <div className="mp-body">
            <div>
              {/* Cultural reading */}
              <span className="mp-reading-label">Cultural Reading</span>
              <div className="mp-reading">
                {renderReading(motif.cultural_reading)}
              </div>

              {/* Variant forms */}
              {motif.variant_forms && (
                <div className="mp-variants">
                  <span className="mp-variants__label">Variant Forms</span>
                  <div className="mp-variants__list">
                    {motif.variant_forms.split(',').map((v, i) => (
                      <span key={i} className="mp-variant-tag">{v.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="mp-sidebar">
              {/* Related motifs */}
              {relatedMotifs.length > 0 && (
                <div className="mp-sidebar-block">
                  <span className="mp-sidebar-label">Related Motifs</span>
                  {relatedMotifs.map(m => m && (
                    <Link key={m.slug} href={`/motifs/${m.slug}`} className="mp-rel-motif">
                      <span className="mp-rel-motif__name">{m.name}</span>
                      <span className="mp-rel-motif__sum">{m.summary}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Glossary connections */}
              {relatedGlossary.length > 0 && (
                <div className="mp-sidebar-block">
                  <span className="mp-sidebar-label">Glossary</span>
                  {relatedGlossary.map(g => (
                    <Link key={g.slug} href={`/glossary/${g.slug}`} className="mp-link-item">
                      <span className="mp-link-name">{g.term}</span>
                      <span className="mp-link-type">Definition</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Essays */}
              {relatedEssays.length > 0 && (
                <div className="mp-sidebar-block">
                  <span className="mp-sidebar-label">Essays</span>
                  {relatedEssays.map(e => (
                    <Link key={e.slug} href={`/journal/${e.slug}`} className="mp-link-item">
                      <span className="mp-link-name">{e.title}</span>
                      <span className="mp-link-type">Essay</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Traditions */}
              {relatedTraditions.length > 0 && (
                <div className="mp-sidebar-block">
                  <span className="mp-sidebar-label">Rug Traditions</span>
                  {relatedTraditions.map(t => t && (
                    <Link key={t.slug} href={`/traditions/${t.slug}`} className="mp-link-item">
                      <span className="mp-link-name">{t.name}</span>
                      <span className="mp-link-type">Tradition</span>
                    </Link>
                  ))}
                </div>
              )}
              {/* Regions */}
              {relatedRegions.length > 0 && (
                <div className="mp-sidebar-block">
                  <span className="mp-sidebar-label">Where it appears</span>
                  {relatedRegions.map(r => r && (
                    <Link key={r.slug} href={`/regions/${r.slug}`} className="mp-link-item">
                      <span className="mp-link-name">{r.name}</span>
                      <span className="mp-link-type">Region</span>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>

          {/* Rugs carrying this motif */}
          <div className="mp-rugs">
            <span className="t-label">
              {motifRugs.length > 0
                ? `${motifRugs.length} Piece${motifRugs.length > 1 ? 's' : ''} Carrying This Motif`
                : 'No pieces currently in the gallery'}
            </span>
            {motifRugs.length === 0 && (
              <p className="mp-rugs__empty">
                We do not currently have a piece carrying this motif.{' '}
                <Link href="/inquire" style={{ borderBottom: '1px solid var(--grey-200)' }}>Contact us</Link>{' '}
                if you are looking for one specifically.
              </p>
            )}
            {motifRugs.length > 0 && (
              <div className="mp-rugs__grid">
                {motifRugs.map(r => <RugCard key={r.slug} rug={r} />)}
              </div>
            )}
          </div>

          <div className="mp-bottom-nav">
            <Link href="/motifs">← All Motifs</Link>
            <Link href="/gallery">Browse the Gallery →</Link>
          </div>

        </div>
      </div>
    </>
  )
}
