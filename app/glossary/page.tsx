import Link from 'next/link'
import { glossary, CATEGORY_LABELS } from '@/data/glossary'
import type { GlossaryCategory } from '@/types'

export const metadata = {
  title: 'Glossary — Moroccan & Amazigh Rug Terminology',
  description: 'Definitions of kilim, flatweave, pile-knotted, Beni Ourain, Amazigh, abrash, lanolin, natural dye, overdyeing, and more. A reference guide to Moroccan and Amazigh rug terminology.',
  alternates: { canonical: 'https://www.tilwen.com/glossary' },
  keywords: ['kilim definition', 'Beni Ourain meaning', 'Amazigh rug glossary', 'flatweave rug terminology', 'natural dye rug', 'moroccan rug terms'],
  openGraph: { title: 'Glossary — Moroccan & Amazigh Rug Terminology', description: 'A reference guide to Moroccan and Amazigh rug terminology.', url: 'https://www.tilwen.com/glossary' },
}

const CATEGORIES: GlossaryCategory[] = ['technique', 'material', 'cultural', 'condition', 'provenance', 'spatial']

export default function GlossaryPage() {
  // Group entries by first letter, sorted alphabetically
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term))
  const byLetter = sorted.reduce<Record<string, typeof glossary>>((acc, entry) => {
    const letter = entry.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(entry)
    return acc
  }, {})
  const letters = Object.keys(byLetter).sort()

  return (
    <>
      <style>{`
        .gl-header {
          padding: var(--sp-16) 0 var(--sp-12);
          border-bottom: var(--border);
        }
        .gl-header__intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          margin-top: var(--sp-8);
          align-items: start;
        }
        @media (max-width: 768px) { .gl-header__intro { grid-template-columns: 1fr; } }
        .gl-header__desc {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 52ch;
        }

        /* Category pills */
        .gl-cats {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-2);
          align-items: flex-start;
          padding-top: 0.25rem;
        }
        .gl-cat-pill {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border: var(--border);
          color: var(--grey-600);
          transition: all var(--t);
          display: inline-block;
        }
        .gl-cat-pill:hover { border-color: var(--black); color: var(--black); }

        /* Alphabet jump nav */
        .gl-alphajump {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
          position: sticky;
          top: 56px;
          background: var(--white);
          z-index: 10;
        }
        .gl-alphajump a {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--black);
          padding: 0.25rem 0.5rem;
          transition: background var(--t);
          border-radius: 0;
        }
        .gl-alphajump a:hover { background: var(--grey-100); }
        .gl-alphajump span {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          color: var(--grey-200);
          padding: 0.25rem 0.35rem;
        }

        /* Main content */
        .gl-body { padding: var(--sp-12) 0 var(--sp-32); }

        /* Letter group */
        .gl-group { margin-bottom: var(--sp-12); }
        .gl-group-letter {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: var(--grey-200);
          line-height: 1;
          margin-bottom: var(--sp-4);
          padding-bottom: var(--sp-4);
          border-bottom: var(--border);
        }

        /* Entry rows */
        .gl-entries { display: flex; flex-direction: column; }
        .gl-entry {
          display: grid;
          grid-template-columns: 220px 1fr auto;
          gap: var(--sp-8);
          padding: var(--sp-4) 0;
          border-bottom: var(--border);
          align-items: baseline;
          transition: background var(--t);
          text-decoration: none;
          color: inherit;
        }
        .gl-entry:hover { background: var(--grey-100); margin: 0 calc(-1 * var(--sp-8)); padding-left: var(--sp-8); padding-right: var(--sp-8); }
        @media (max-width: 768px) {
          .gl-entry { grid-template-columns: 1fr; gap: var(--sp-2); }
        }
        .gl-entry__term {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--black);
        }
        .gl-entry__def {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-600);
          line-height: 1.5;
        }
        .gl-entry__cat {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          white-space: nowrap;
        }
        @media (max-width: 768px) { .gl-entry__cat { display: none; } }

        /* Count badge */
        .gl-count {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          color: var(--grey-400);
          margin-top: var(--sp-2);
        }
      `}</style>

      {/* Header */}
      <div className="gl-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Reference</p>
          <h1 className="t-display fade-up-1">Glossary</h1>
          <div className="gl-header__intro">
            <p className="gl-header__desc fade-up-2">
              The carpet merchant uses these words to sell. We use them to explain. The difference is in what gets said when the sale is not the point.
              Technique, material, cultural context, condition, and provenance — defined with precision and connected to the pieces in the gallery.
            </p>
            <div className="fade-up-3">
              <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Browse by category</p>
              <div className="gl-cats">
                {CATEGORIES.map(cat => (
                  <Link key={cat} href={`/glossary?category=${cat}`} className="gl-cat-pill">
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alphabet jump */}
      <div className="gl-alphajump">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
            byLetter[l]
              ? <a key={l} href={`#letter-${l}`}>{l}</a>
              : <span key={l}>{l}</span>
          ))}
          <span style={{ marginLeft: 'auto', color: 'var(--grey-400)', fontFamily: 'var(--font-ui)', fontSize: '0.5625rem', letterSpacing: '0.08em', alignSelf: 'center' }}>
            {glossary.length} terms
          </span>
        </div>
      </div>

      {/* Entries */}
      <div className="gl-body">
        <div className="container">
          {letters.map(letter => (
            <div key={letter} className="gl-group" id={`letter-${letter}`}>
              <div className="gl-group-letter">{letter}</div>
              <div className="gl-entries">
                {byLetter[letter].map(entry => (
                  <Link key={entry.slug} href={`/glossary/${entry.slug}`} className="gl-entry">
                    <span className="gl-entry__term">{entry.term}</span>
                    <span className="gl-entry__def">{entry.short_definition}</span>
                    <span className="gl-entry__cat">{CATEGORY_LABELS[entry.category]}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
