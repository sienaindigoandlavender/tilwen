import Link from 'next/link'
import Image from 'next/image'
import { motifs } from '@/data/motifs'

export const metadata = {
  title: 'Motifs & Symbols',
  description: 'The symbolic grammar of Amazigh weaving — what the forms mean, why they persist, and how to read them.',
}

export default function MotifsPage() {
  const featured = motifs[0]
  const rest = motifs.slice(1)

  return (
    <>
      <style>{`
        /* ── Header ─────────────────────────────────────────── */
        .mo-header {
          padding: var(--sp-24) 0 var(--sp-16);
          border-bottom: var(--border);
        }
        .mo-header__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: end;
        }
        @media (max-width: 768px) { .mo-header__inner { grid-template-columns: 1fr; gap: var(--sp-8); } }
        .mo-header__body {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 46ch;
          margin-top: var(--sp-6);
        }
        .mo-header__note {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--grey-400);
          margin-top: var(--sp-6);
          padding-top: var(--sp-6);
          border-top: var(--border);
          max-width: 44ch;
        }

        /* ── Featured motif — full-width editorial ───────────── */
        .mo-featured {
          border-bottom: var(--border);
        }
        .mo-featured__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
        }
        @media (max-width: 900px) {
          .mo-featured__inner { grid-template-columns: 1fr; min-height: auto; }
        }
        .mo-featured__img {
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          min-height: 360px;
        }
        .mo-featured__img img { transition: transform 900ms var(--ease); }
        .mo-featured:hover .mo-featured__img img { transform: scale(1.03); }

        .mo-featured__content {
          padding: var(--sp-12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: var(--border);
        }
        @media (max-width: 900px) {
          .mo-featured__content { border-left: none; border-top: var(--border); padding: var(--sp-8) 0; }
        }
        .mo-featured__label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-6);
        }
        .mo-featured__name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: var(--black);
          margin-bottom: var(--sp-6);
        }
        .mo-featured__summary {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 44ch;
          flex: 1;
          margin-bottom: var(--sp-8);
        }
        .mo-featured__reading-preview {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--grey-800);
          font-style: italic;
          border-left: 2px solid var(--grey-200);
          padding-left: var(--sp-6);
          margin-bottom: var(--sp-8);
          max-width: 44ch;
        }
        .mo-featured__foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--sp-6);
          border-top: var(--border);
        }
        .mo-featured__variants {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
        .mo-featured__cta {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: 1px;
          transition: opacity var(--t);
          white-space: nowrap;
        }
        .mo-featured:hover .mo-featured__cta { opacity: 0.6; }

        /* ── Motif list ──────────────────────────────────────── */
        .mo-list { padding-bottom: var(--sp-32); }

        .mo-row {
          display: grid;
          grid-template-columns: 100px 1fr 1fr auto;
          gap: var(--sp-8);
          padding: var(--sp-8) 0;
          border-bottom: var(--border);
          align-items: start;
          text-decoration: none;
          color: inherit;
          transition: background var(--t);
        }
        .mo-row:hover { background: var(--grey-100); margin: 0 calc(-1 * var(--sp-8)); padding-left: var(--sp-8); padding-right: var(--sp-8); }
        @media (max-width: 900px) { .mo-row { grid-template-columns: 72px 1fr; } }
        @media (max-width: 480px) { .mo-row { grid-template-columns: 1fr; } }

        .mo-row__img {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          flex-shrink: 0;
        }
        .mo-row__img img { transition: transform 600ms ease; }
        .mo-row:hover .mo-row__img img { transform: scale(1.06); }

        .mo-row__name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--black);
          margin-bottom: var(--sp-2);
        }
        .mo-row__summary {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.55;
          margin-top: var(--sp-2);
          max-width: 48ch;
        }
        .mo-row__reading {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-800);
          line-height: 1.65;
          font-style: italic;
        }
        @media (max-width: 900px) { .mo-row__reading { display: none; } }
        .mo-row__arrow {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          white-space: nowrap;
          padding-top: 0.25rem;
          transition: color var(--t);
        }
        .mo-row:hover .mo-row__arrow { color: var(--black); }
        @media (max-width: 900px) { .mo-row__arrow { display: none; } }

        /* ── Editorial note at bottom ────────────────────────── */
        .mo-note {
          padding: var(--sp-12) 0;
          border-top: var(--border);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
        }
        @media (max-width: 768px) { .mo-note { grid-template-columns: 1fr; } }
        .mo-note__text {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.75;
          color: var(--grey-600);
          max-width: 52ch;
        }
        .mo-note__links {
          display: flex;
          flex-direction: column;
          gap: var(--sp-3, 0.75rem);
          padding-top: 0.125rem;
        }
        .mo-note__link {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--sp-4) 0;
          border-bottom: var(--border);
          text-decoration: none;
          color: inherit;
          transition: background var(--t);
        }
        .mo-note__link:hover { padding-left: var(--sp-2); }
        .mo-note__link-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--black);
        }
        .mo-note__link-hint {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
      `}</style>

      {/* Header */}
      <div className="mo-header">
        <div className="container">
          <div className="mo-header__inner">
            <div>
              <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-4)' }}>Knowledge</p>
              <h1 className="t-hero fade-up-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}>Motifs &amp;<br />Symbols</h1>
            </div>
            <div className="fade-up-2">
              <p className="mo-header__body">
                Amazigh weaving is not decoration applied to a functional object. It is a symbolic system in which every compositional decision — the form chosen, its placement, its completeness or deliberate interruption — carries meaning.
              </p>
              <p className="mo-header__note">
                The readings presented here are grounded in comparative material culture scholarship. Where meanings are contested or uncertain, they are described as such. No reading is presented as definitive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured motif */}
      {featured && (
        <div className="mo-featured">
          <div className="container">
            <Link href={`/motifs/${featured.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="mo-featured__inner">
                <div className="mo-featured__img">
                  {featured.example_image && (
                    <Image src={featured.example_image} alt={featured.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 50vw" priority />
                  )}
                </div>
                <div className="mo-featured__content">
                  <div>
                    <span className="mo-featured__label">In Depth</span>
                    <h2 className="mo-featured__name">{featured.name}</h2>
                    <p className="mo-featured__summary">{featured.summary}</p>
                    <p className="mo-featured__reading-preview">
                      {featured.cultural_reading.split('\n\n')[0]}
                    </p>
                  </div>
                  <div className="mo-featured__foot">
                    <span className="mo-featured__variants">
                      {featured.variant_forms?.split(',').length ?? 0} variant forms documented
                    </span>
                    <span className="mo-featured__cta">Full reading →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Rest of motifs */}
      <div className="container">
        <div className="mo-list" style={{ paddingTop: 'var(--sp-4)' }}>
          {rest.map(m => (
            <Link key={m.slug} href={`/motifs/${m.slug}`} className="mo-row">
              <div className="mo-row__img">
                {m.example_image ? (
                  <Image src={m.example_image} alt={m.name} fill style={{ objectFit: 'cover' }} sizes="100px" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--grey-100)' }} />
                )}
              </div>
              <div>
                <h2 className="mo-row__name">{m.name}</h2>
                <p className="mo-row__summary">{m.summary}</p>
              </div>
              <p className="mo-row__reading">
                {m.cultural_reading.split('\n\n')[0]}
              </p>
              <span className="mo-row__arrow">Read →</span>
            </Link>
          ))}
        </div>

        {/* Editorial note */}
        <div className="mo-note">
          <p className="mo-note__text">
            Each motif in the Amazigh tradition exists within a symbolic network — lozenges relate to eye forms, broken combs relate to asymmetry, borders relate to the domestic interior they protect. Reading one motif fully means understanding its relationship to the others. These cross-links are built into every entry.
          </p>
          <div className="mo-note__links">
            <Link href="/journal/geometry-and-cosmology" className="mo-note__link">
              <span className="mo-note__link-name">Geometry and Cosmology</span>
              <span className="mo-note__link-hint">Essay</span>
            </Link>
            <Link href="/glossary/protective-motif" className="mo-note__link">
              <span className="mo-note__link-name">Protective Motif</span>
              <span className="mo-note__link-hint">Glossary</span>
            </Link>
            <Link href="/glossary/tifinagh" className="mo-note__link">
              <span className="mo-note__link-name">Tifinagh</span>
              <span className="mo-note__link-hint">Glossary</span>
            </Link>
            <Link href="/glossary/evil-eye" className="mo-note__link">
              <span className="mo-note__link-name">Evil Eye</span>
              <span className="mo-note__link-hint">Glossary</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
