import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'Our methodology, sourcing standards, and the five-criteria publishing gate.',
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .about-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-16);
          padding: var(--sp-12) 0;
        }
        @media (max-width: 768px) { .about-body { grid-template-columns: 1fr; } }
        .about-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .about-section-title { margin-bottom: var(--sp-6); }
        .about-criteria {
          margin-top: var(--sp-6); display: flex; flex-direction: column; gap: 0;
        }
        .about-criterion {
          display: grid; grid-template-columns: 32px 1fr;
          padding: var(--sp-4) 0; border-bottom: var(--border); gap: var(--sp-4);
          align-items: start;
        }
        .about-criterion:last-child { border-bottom: none; }
        .about-criterion__num {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.1em; color: var(--grey-400); padding-top: 0.25rem;
        }
        .about-criterion__text {
          font-family: var(--font-body); font-size: 0.9375rem; line-height: 1.6;
          color: var(--grey-800);
        }
        .about-statement {
          font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2.25rem);
          font-weight: 300; letter-spacing: -0.02em; line-height: 1.2;
          color: var(--grey-800); padding: var(--sp-16) 0; border-top: var(--border);
          max-width: 60ch;
        }
      `}</style>

      <div className="about-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>About</p>
          <h1 className="t-display fade-up-1">Methodology</h1>
          <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-6)', maxWidth: '60ch', color: 'var(--grey-600)' }}>
            House of Weaves is a shoppable ethnographic gallery. Every rug that appears here has been documented against a five-criteria standard before it goes live.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="about-body">
          <div>
            <div className="about-section">
              <p className="t-label about-section-title">What This Is</p>
              <div className="prose">
                <p>House of Weaves is not a marketplace, a craft tourism site, or a digitised museum. It is a gallery with a point of view, a scholar's rigour, a merchant's clarity, and a curator's warmth.</p>
                <p>Each rug is treated as having three distinct existences. As an <em>object</em>, it has provenance, material, age, maker-community, and symbolic grammar. As a <em>knowledge node</em>, it connects outward to motifs, regions, techniques, and cultural histories. As a <em>spatial actor</em>, it has presence, scale, palette behaviour, and atmosphere in a room.</p>
                <p>The commercial proposition is inseparable from the cultural intelligence. You cannot buy well here without first understanding what you are buying.</p>
              </div>
            </div>

            <div className="about-section">
              <p className="t-label about-section-title">The Publishing Gate</p>
              <p className="t-body-sm" style={{ color: 'var(--grey-600)', marginBottom: 'var(--sp-4)' }}>
                Every rug that goes live must meet all five criteria. A piece with four of five is not 80% ready — it is not ready.
              </p>
              <div className="about-criteria">
                {[
                  'Complete specifications — no blank fields; "Not determined" where genuinely unknown rather than omitted',
                  'A symbolic reading specific to this rug — not copy-pasted from a type description, written for the specific composition in front of us',
                  'A spatial behaviour section — atmosphere, room affinities, requirements, and what it doesn\'t suit — written for this specific piece',
                  'Minimum four images — hero, detail, reverse, and scale reference',
                  'At least two motif cross-links and one region cross-link',
                ].map((c, i) => (
                  <div key={i} className="about-criterion">
                    <span className="about-criterion__num">0{i + 1}</span>
                    <p className="about-criterion__text">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="about-section">
              <p className="t-label about-section-title">Sourcing</p>
              <div className="prose">
                <p>All pieces are sourced directly — from families, from markets, from collectors, from the primary and secondary trade in Morocco. We do not work with intermediaries who cannot tell us where a piece came from.</p>
                <p>We do not restore, overdye, or chemically wash pieces to optimise them for current aesthetics. The condition you read in the specification is the condition the piece arrives in. Imperfections are documented, not concealed.</p>
              </div>
            </div>

            <div className="about-section">
              <p className="t-label about-section-title">The Inventory</p>
              <div className="prose">
                <p>The gallery is intentionally small. We would rather have twenty fully documented pieces than two hundred pieces with thin documentation. The curation is not just of the objects — it is of the knowledge attached to them.</p>
                <p>Each piece is one of a kind. When it is sold, it cannot be replicated or restocked. If you are interested in a specific piece, inquire promptly.</p>
              </div>
            </div>

            <div className="about-section">
              <p className="t-label about-section-title">Navigation</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginTop: 'var(--sp-2)' }}>
                {[
                  { href: '/gallery', label: 'Browse the Gallery' },
                  { href: '/motifs', label: 'Explore Motifs & Symbols' },
                  { href: '/regions', label: 'Browse by Region' },
                  { href: '/journal', label: 'Read the Journal' },
                  { href: '/inquire', label: 'Make an Inquiry' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="btn btn--ghost" style={{ justifyContent: 'flex-start', gap: 'var(--sp-4)' }}>
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="about-statement">
          "The rugs are not decoration. They are objects with their own intelligence — cultural, spatial, material — and buying one well requires understanding what you are acquiring."
        </p>
      </div>
    </>
  )
}
