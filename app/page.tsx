import Link from 'next/link'
import Image from 'next/image'
import { rugs } from '@/data/rugs'
import { essays } from '@/data/essays'
import { motifs } from '@/data/motifs'
import dynamic from 'next/dynamic'
import RugCardHover from '@/components/gallery/RugCardHover'

const RegionsMap = dynamic(() => import('@/components/gallery/RegionsMap'), { ssr: false })

export default function HomePage() {
  const featured = rugs.filter(r => r.availability_status !== 'sold').slice(0, 4)
  const featuredEssay = essays[0]
  const featuredMotifs = motifs.slice(0, 3)

  return (
    <>
      <style>{`
        /* ── Opening statement ───────────────────────────────── */
        .hp-threshold {
          padding: var(--sp-24) 0 var(--sp-16);
          border-bottom: var(--border);
          min-height: 60vh;
          display: flex;
          align-items: flex-end;
        }
        .hp-threshold__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-24);
          align-items: end;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hp-threshold { min-height: auto; padding: var(--sp-16) 0; }
          .hp-threshold__inner { grid-template-columns: 1fr; gap: var(--sp-8); }
        }
        .hp-threshold__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 7rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--black);
        }
        .hp-threshold__title em {
          font-style: italic;
          color: var(--grey-400);
        }
        .hp-threshold__right {
          display: flex;
          flex-direction: column;
          gap: var(--sp-8);
          padding-bottom: 0.5rem;
        }
        .hp-threshold__text {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--grey-600);
          max-width: 46ch;
        }
        .hp-threshold__links {
          display: flex;
          flex-direction: column;
          gap: var(--sp-3);
        }
        .hp-threshold__link {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          transition: gap var(--t);
        }
        .hp-threshold__link:hover { gap: var(--sp-4); }
        .hp-threshold__link::after {
          content: '→';
          font-size: 0.75rem;
        }

        /* ── Motif band ──────────────────────────────────────── */
        .hp-motifs {
          border-bottom: var(--border);
          overflow: hidden;
        }
        .hp-motifs__inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 640px) { .hp-motifs__inner { grid-template-columns: 1fr; } }
        .hp-motif {
          display: block;
          text-decoration: none;
          color: inherit;
          border-right: var(--border);
          padding: var(--sp-8);
          transition: background var(--t);
          position: relative;
          overflow: hidden;
        }
        .hp-motif:last-child { border-right: none; }
        .hp-motif:hover { background: var(--grey-100); }
        .hp-motif__img {
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          margin-bottom: var(--sp-4);
        }
        .hp-motif__img img { transition: transform 700ms var(--ease); }
        .hp-motif:hover .hp-motif__img img { transform: scale(1.04); }
        .hp-motif__label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-2);
        }
        .hp-motif__name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: var(--black);
          display: block;
          margin-bottom: var(--sp-2);
        }
        .hp-motif__summary {
          font-family: var(--font-body);
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--grey-600);
          font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Essay feature ───────────────────────────────────── */
        .hp-essay {
          border-bottom: var(--border);
        }
        .hp-essay__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
        }
        @media (max-width: 900px) {
          .hp-essay__inner { grid-template-columns: 1fr; min-height: auto; }
        }
        .hp-essay__content {
          padding: var(--sp-12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: var(--border);
        }
        @media (max-width: 900px) {
          .hp-essay__content { border-right: none; border-bottom: var(--border); padding: var(--sp-8) 0; }
        }
        .hp-essay__label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-6);
        }
        .hp-essay__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: var(--black);
          margin-bottom: var(--sp-6);
        }
        .hp-essay__excerpt {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.75;
          color: var(--grey-600);
          flex: 1;
          margin-bottom: var(--sp-8);
          max-width: 44ch;
        }
        .hp-essay__read {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: 1px;
          align-self: flex-start;
          transition: opacity var(--t);
        }
        .hp-essay:hover .hp-essay__read { opacity: 0.5; }
        .hp-essay__img {
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
          min-height: 360px;
        }
        .hp-essay__img img { transition: transform 800ms var(--ease); }
        .hp-essay:hover .hp-essay__img img { transform: scale(1.025); }

        /* ── Objects section ─────────────────────────────────── */
        .hp-objects { padding: var(--sp-16) 0 var(--sp-24); }
        .hp-objects__header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: var(--sp-8);
          padding-bottom: var(--sp-6);
          border-bottom: var(--border);
        }
        .hp-objects__title {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--black);
        }
        .hp-objects__all {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-400);
          border-bottom: 1px solid var(--grey-200);
          padding-bottom: 1px;
          transition: all var(--t);
        }
        .hp-objects__all:hover { color: var(--black); border-bottom-color: var(--black); }
        .hp-objects__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-8) var(--sp-4);
        }
        @media (max-width: 900px) { .hp-objects__grid { grid-template-columns: repeat(2, 1fr); } }

        /* ── Map section ─────────────────────────────────────── */
        .hp-map { border-top: var(--border); }
        .hp-map__header {
          padding: var(--sp-8) 0 var(--sp-4);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .hp-map__hint {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-style: italic;
          color: var(--grey-400);
        }
        @media (max-width: 600px) { .hp-map__hint { display: none; } }

        /* ── Fire line ───────────────────────────────────────── */
        .hp-fire {
          padding: var(--sp-24) 0;
          border-top: var(--border);
          text-align: center;
        }
        .hp-fire__text {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--black);
          max-width: 32ch;
          margin: 0 auto var(--sp-8);
        }
        .hp-fire__text em {
          font-style: italic;
          color: var(--grey-400);
        }
        .hp-fire__links {
          display: flex;
          justify-content: center;
          gap: var(--sp-8);
          flex-wrap: wrap;
        }
        .hp-fire__link {
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
        .hp-fire__link:hover { opacity: 0.5; }
      `}</style>

      {/* ── Opening statement — the threshold ── */}
      <div className="hp-threshold">
        <div className="container">
          <div className="hp-threshold__inner">
            <h1 className="hp-threshold__title">
              The magic<br />
              <em>is woven</em><br />
              in.
            </h1>
            <div className="hp-threshold__right">
              <p className="hp-threshold__text">
                Before Islam. Before everything that came after and tried to rename it. The lozenge on a High Atlas kilim is a protective mark — placed by a woman who understood that beauty and protection are the same gesture.
              </p>
              <div className="hp-threshold__links">
                <Link href="/gallery" className="hp-threshold__link">Enter the gallery</Link>
                <Link href="/motifs" className="hp-threshold__link">Read the symbols</Link>
                <Link href="/journal" className="hp-threshold__link">Sit by the fire</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Three motifs — the knowledge entry ── */}
      <div className="hp-motifs">
        <div className="hp-motifs__inner">
          {featuredMotifs.map(motif => (
            <Link key={motif.slug} href={`/motifs/${motif.slug}`} className="hp-motif">
              <div className="hp-motif__img">
                {motif.example_image && (
                  <Image src={motif.example_image} alt={motif.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:640px) 100vw, 33vw" />
                )}
              </div>
              <span className="hp-motif__label">Symbol</span>
              <span className="hp-motif__name">{motif.name}</span>
              <p className="hp-motif__summary">{motif.summary}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Essay feature — the fire ── */}
      {featuredEssay && (
        <div className="hp-essay">
          <div className="container">
            <Link href={`/journal/${featuredEssay.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="hp-essay__inner">
                <div className="hp-essay__content">
                  <div>
                    <span className="hp-essay__label">From the Journal</span>
                    <h2 className="hp-essay__title">{featuredEssay.title}</h2>
                    <p className="hp-essay__excerpt">{featuredEssay.excerpt}</p>
                  </div>
                  <span className="hp-essay__read">Read the essay →</span>
                </div>
                <div className="hp-essay__img">
                  {featuredEssay.cover_image && (
                    <Image src={featuredEssay.cover_image} alt={featuredEssay.title} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} sizes="(max-width:900px) 100vw, 50vw" />
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ── The objects ── */}
      <div className="container">
        <div className="hp-objects">
          <div className="hp-objects__header">
            <span className="hp-objects__title">In the gallery now</span>
            <Link href="/gallery" className="hp-objects__all">See all pieces →</Link>
          </div>
          <div className="hp-objects__grid">
            {featured.map((rug, i) => (
              <RugCardHover key={rug.slug} rug={rug} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Regions map ── */}
      <div className="hp-map">
        <div className="container">
          <div className="hp-map__header">
            <span className="t-label">The weaving regions</span>
            <span className="hp-map__hint">Each region is a distinct visual language</span>
          </div>
        </div>
        <RegionsMap />
      </div>

      {/* ── Fire line — the invitation ── */}
      <div className="container">
        <div className="hp-fire">
          <p className="hp-fire__text">
            Long before you decide to own one, <em>you come for the story.</em>
          </p>
          <div className="hp-fire__links">
            <Link href="/traditions" className="hp-fire__link">The traditions</Link>
            <Link href="/glossary" className="hp-fire__link">The glossary</Link>
            <Link href="/motifs" className="hp-fire__link">The symbols</Link>
            <Link href="/journal" className="hp-fire__link">The journal</Link>
          </div>
        </div>
      </div>

    </>
  )
}
