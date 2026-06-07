import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export const metadata = {
  title: 'Journal',
  description: 'A body of writing on Moroccan and Amazigh material culture, natural dye traditions, symbolic grammar, and the life of objects.',
}

export default function JournalPage() {
  const featured = essays[0]
  const rest = essays.slice(1)

  return (
    <>
      <style>{`
        /* ── Header ─────────────────────────────────────────── */
        .jl-header {
          padding: var(--sp-24) 0 var(--sp-16);
          border-bottom: var(--border);
        }
        .jl-header__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: end;
        }
        @media (max-width: 768px) { .jl-header__inner { grid-template-columns: 1fr; gap: var(--sp-8); } }
        .jl-header__statement {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 46ch;
        }
        .jl-header__count {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-top: var(--sp-8);
          display: block;
        }

        /* ── Featured essay ──────────────────────────────────── */
        .jl-featured {
          padding: var(--sp-16) 0;
          border-bottom: var(--border);
        }
        .jl-featured__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 520px;
        }
        @media (max-width: 900px) {
          .jl-featured__inner { grid-template-columns: 1fr; min-height: auto; }
        }
        .jl-featured__img {
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          min-height: 420px;
        }
        .jl-featured__img img {
          transition: transform 800ms var(--ease);
        }
        .jl-featured:hover .jl-featured__img img {
          transform: scale(1.025);
        }
        .jl-featured__content {
          padding: var(--sp-12) var(--sp-12) var(--sp-12) var(--sp-12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: var(--border);
        }
        @media (max-width: 900px) {
          .jl-featured__content {
            border-left: none;
            border-top: var(--border);
            padding: var(--sp-8) 0 0;
          }
        }
        .jl-featured__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-8);
          display: block;
        }
        .jl-featured__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 1.0;
          color: var(--black);
          margin-bottom: var(--sp-6);
        }
        .jl-featured__excerpt {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 44ch;
          flex: 1;
          margin-bottom: var(--sp-8);
        }
        .jl-featured__foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--sp-6);
          border-top: var(--border);
        }
        .jl-featured__tags {
          display: flex;
          gap: var(--sp-4);
        }
        .jl-featured__tag {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-600);
        }
        .jl-featured__read {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: 1px;
          transition: opacity var(--t);
        }
        .jl-featured:hover .jl-featured__read { opacity: 0.6; }

        /* ── Essay list ──────────────────────────────────────── */
        .jl-list {
          padding-bottom: var(--sp-32);
        }
        .jl-row {
          display: grid;
          grid-template-columns: 80px 1fr 1fr auto;
          gap: var(--sp-8);
          padding: var(--sp-8) 0;
          border-bottom: var(--border);
          align-items: start;
          transition: background var(--t);
          text-decoration: none;
          color: inherit;
        }
        .jl-row:hover { background: var(--grey-100); margin: 0 calc(-1 * var(--sp-8)); padding-left: var(--sp-8); padding-right: var(--sp-8); }
        @media (max-width: 900px) {
          .jl-row { grid-template-columns: 60px 1fr; }
          .jl-row__excerpt, .jl-row__meta { display: none; }
        }
        @media (max-width: 480px) {
          .jl-row { grid-template-columns: 1fr; }
          .jl-row__thumb { display: none; }
        }
        .jl-row__thumb {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          flex-shrink: 0;
        }
        .jl-row__title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: -0.015em;
          line-height: 1.2;
          color: var(--black);
          margin-bottom: var(--sp-2);
        }
        .jl-row__tags {
          display: flex;
          gap: var(--sp-3, 0.75rem);
          flex-wrap: wrap;
          margin-top: var(--sp-2);
        }
        .jl-row__tag {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
        .jl-row__excerpt {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--grey-600);
          padding-top: 0.125rem;
        }
        .jl-row__meta {
          text-align: right;
          padding-top: 0.125rem;
        }
        .jl-row__time {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          white-space: nowrap;
        }

        /* ── Themes aside ────────────────────────────────────── */
        .jl-themes {
          padding: var(--sp-12) 0;
          border-bottom: var(--border);
          display: flex;
          align-items: baseline;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .jl-themes__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-400);
          white-space: nowrap;
        }
        .jl-themes__tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-2);
        }
        .jl-theme-pill {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-600);
          border: var(--border);
          padding: 0.3rem 0.75rem;
          transition: all var(--t);
          display: inline-block;
        }
        .jl-theme-pill:hover { border-color: var(--black); color: var(--black); }
      `}</style>

      {/* Header */}
      <div className="jl-header">
        <div className="container">
          <div className="jl-header__inner">
            <div>
              <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-4)' }}>Writing</p>
              <h1 className="t-hero fade-up-1" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>Journal</h1>
            </div>
            <div className="fade-up-2">
              <p className="jl-header__statement">
                A body of writing on Moroccan and Amazigh material culture — natural dye traditions, symbolic grammar, the life of objects in space. Not topical. Not a feed. Each essay is permanent.
              </p>
              <span className="jl-header__count">{essays.length} essays</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured — first essay, full bleed treatment */}
      {featured && (
        <div className="jl-featured">
          <div className="container">
            <Link href={`/journal/${featured.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="jl-featured__inner">
                <div className="jl-featured__img">
                  {featured.cover_image && (
                    <Image
                      src={featured.cover_image}
                      alt={featured.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width:900px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
                <div className="jl-featured__content">
                  <div>
                    <span className="jl-featured__label">Featured Essay</span>
                    <h2 className="jl-featured__title">{featured.title}</h2>
                    <p className="jl-featured__excerpt">{featured.excerpt}</p>
                  </div>
                  <div className="jl-featured__foot">
                    <div className="jl-featured__tags">
                      {featured.theme_tags.slice(0, 2).map(t => (
                        <span key={t} className="jl-featured__tag">{t}</span>
                      ))}
                      <span className="jl-featured__tag">·</span>
                      <span className="jl-featured__tag">{featured.reading_time_minutes} min</span>
                    </div>
                    <span className="jl-featured__read">Read →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Theme pills */}
      {(() => {
        const allTags = Array.from(new Set(essays.flatMap(e => e.theme_tags)))
        return (
          <div className="jl-themes">
            <div className="container" style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-8)', flexWrap: 'wrap' }}>
              <span className="jl-themes__label">Themes</span>
              <div className="jl-themes__tags">
                {allTags.map(tag => (
                  <span key={tag} className="jl-theme-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )
      })()}

      {/* Rest of essays — tabular, Cereal-register list */}
      {rest.length > 0 && (
        <div className="container">
          <div className="jl-list">
            {rest.map(essay => (
              <Link key={essay.slug} href={`/journal/${essay.slug}`} className="jl-row">
                <div className="jl-row__thumb">
                  {essay.cover_image && (
                    <Image src={essay.cover_image} alt={essay.title} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  )}
                </div>
                <div>
                  <h2 className="jl-row__title">{essay.title}</h2>
                  <div className="jl-row__tags">
                    {essay.theme_tags.slice(0, 2).map(t => (
                      <span key={t} className="jl-row__tag">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="jl-row__excerpt">{essay.excerpt}</p>
                <div className="jl-row__meta">
                  <span className="jl-row__time">{essay.reading_time_minutes} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
