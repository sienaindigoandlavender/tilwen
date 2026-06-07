import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export const metadata = {
  title: 'Journal',
  description: 'A body of writing on Moroccan and Amazigh material culture, natural dye traditions, symbolic grammar, and the life of objects.',
}

export default function JournalPage() {
  return (
    <>
      <style>{`
        /* ── Cereal-register header ─────────────────────────── */
        .jl {
          padding-bottom: var(--sp-32);
        }
        .jl-top {
          padding: var(--sp-16) 0 var(--sp-8);
          border-bottom: var(--border);
        }
        .jl-top__inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .jl-top__title {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--black);
        }
        .jl-top__count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
        }

        /* ── Filter bar ─────────────────────────────────────── */
        .jl-filters {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
          display: flex;
          align-items: baseline;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .jl-filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--sp-2);
        }
        .jl-filter-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: 0.25rem;
        }
        .jl-filter-tags {
          display: flex;
          gap: var(--sp-2);
          flex-wrap: wrap;
        }
        .jl-filter-tag {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.04em;
          color: var(--grey-600);
          cursor: default;
        }
        .jl-filter-tag + .jl-filter-tag::before {
          content: '·';
          margin-right: var(--sp-2);
          color: var(--grey-200);
        }

        /* ── Grid — Cereal masonry register ─────────────────── */
        .jl-grid {
          padding-top: var(--sp-8);
          columns: 3;
          column-gap: var(--sp-6);
        }
        @media (max-width: 900px) { .jl-grid { columns: 2; } }
        @media (max-width: 480px) { .jl-grid { columns: 1; } }

        .jl-item {
          break-inside: avoid;
          display: block;
          margin-bottom: var(--sp-8);
          text-decoration: none;
          color: inherit;
        }
        .jl-item__img {
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          display: block;
        }
        /* Alternate aspect ratios for visual rhythm — like Cereal */
        .jl-item:nth-child(3n+1) .jl-item__img { aspect-ratio: 4/5; }
        .jl-item:nth-child(3n+2) .jl-item__img { aspect-ratio: 3/4; }
        .jl-item:nth-child(3n)   .jl-item__img { aspect-ratio: 1/1; }
        .jl-item__img img {
          transition: transform 700ms var(--ease);
        }
        .jl-item:hover .jl-item__img img { transform: scale(1.04); }

        .jl-item__body {
          padding: var(--sp-3, 0.75rem) 0 0;
        }
        .jl-item__ref {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          display: block;
          margin-bottom: 0.25rem;
        }
        .jl-item__title {
          font-family: var(--font-ui);
          font-size: 0.8125rem;
          font-weight: 400;
          color: var(--black);
          display: block;
          letter-spacing: 0.01em;
        }
        .jl-item__tags {
          margin-top: 0.25rem;
          display: flex;
          gap: var(--sp-3, 0.75rem);
        }
        .jl-item__tag {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
        }

        /* ── Statement at bottom ────────────────────────────── */
        .jl-statement {
          padding: var(--sp-16) 0;
          border-top: var(--border);
          margin-top: var(--sp-8);
          max-width: 64ch;
        }
        .jl-statement__text {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--grey-600);
          font-style: italic;
        }
      `}</style>

      <div className="jl">
        {/* Top bar — Cereal style */}
        <div className="jl-top">
          <div className="container">
            <div className="jl-top__inner">
              <span className="jl-top__title">Journal</span>
              <span className="jl-top__count">
                {essays.length} {essays.length === 1 ? 'essay' : 'essays'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter / taxonomy bar */}
        <div className="jl-filters">
          <div className="container" style={{ display: 'flex', gap: 'var(--sp-12)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div className="jl-filter-group">
              <span className="jl-filter-label">Themes</span>
              <div className="jl-filter-tags">
                {Array.from(new Set(essays.flatMap(e => e.theme_tags))).map(tag => (
                  <span key={tag} className="jl-filter-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="jl-filter-group">
              <span className="jl-filter-label">Regions</span>
              <div className="jl-filter-tags">
                {Array.from(new Set(essays.flatMap(e => e.region_slugs))).map(r => (
                  <span key={r} className="jl-filter-tag">{r.replace(/-/g, ' ')}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="container">
          <div className="jl-grid">
            {essays.map((essay, i) => {
              // Cereal-style reference code: zero-padded index + year
              const year = new Date(essay.published_at).getFullYear()
              const code = `(${String(i).padStart(3,'0')}-${String(year).slice(2)})`
              return (
                <Link key={essay.slug} href={`/journal/${essay.slug}`} className="jl-item">
                  <div className="jl-item__img">
                    {essay.cover_image ? (
                      <Image
                        src={essay.cover_image}
                        alt={essay.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width:480px) 100vw, (max-width:900px) 50vw, 33vw"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: '240px', background: 'var(--grey-100)' }} />
                    )}
                  </div>
                  <div className="jl-item__body">
                    <span className="jl-item__ref">{code}</span>
                    <span className="jl-item__title">{essay.title}</span>
                    <div className="jl-item__tags">
                      {essay.theme_tags.slice(0, 2).map(t => (
                        <span key={t} className="jl-item__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="jl-statement">
            <p className="jl-statement__text">
              Not a feed. Each essay is a permanent object — written to be read once carefully, not scanned for updates. The archive accumulates; it does not flow.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
