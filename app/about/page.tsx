import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'Tilwen is a Marrakech gallery of vintage Amazigh (Berber) rugs, documented honestly — no incense, no invented history.',
  alternates: { canonical: 'https://tilwen.com/about' },
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-page { padding-bottom: var(--sp-32); }
        .about-header { padding: var(--sp-16) 0 var(--sp-12); border-bottom: var(--border); }
        .about-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-24);
          padding: var(--sp-16) 0;
          align-items: start;
        }
        @media (max-width: 900px) { .about-body { grid-template-columns: 1fr; gap: var(--sp-12); } }
        .about-text {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.85;
          color: var(--black);
        }
        .about-text p { margin-bottom: 1.5em; }
        .about-text p:last-child { margin-bottom: 0; }
        .about-aside {
          padding-top: 0.25rem;
        }
        .about-aside-block {
          padding: var(--sp-6) 0;
          border-bottom: var(--border);
        }
        .about-aside-block:first-child { padding-top: 0; }
        .about-aside-block:last-child { border-bottom: none; }
        .about-aside-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-3);
        }
        .about-aside-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--grey-600);
        }
        .about-aside-link {
          display: inline-block;
          margin-top: var(--sp-3);
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          border-bottom: 1px solid var(--grey-200);
          padding-bottom: 1px;
          transition: border-color var(--t);
        }
        .about-aside-link:hover { border-bottom-color: var(--black); }

        /* Standards */
        .about-standards {
          padding: var(--sp-16) 0;
          border-top: var(--border);
        }
        .about-standards__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-8);
          margin-top: var(--sp-8);
        }
        @media (max-width: 768px) { .about-standards__grid { grid-template-columns: 1fr; } }
        .about-standard {
          padding: var(--sp-6) 0;
          border-top: var(--border);
        }
        .about-standard__num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: var(--grey-200);
          line-height: 1;
          margin-bottom: var(--sp-3);
        }
        .about-standard__title {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          margin-bottom: var(--sp-3);
          display: block;
        }
        .about-standard__text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--grey-600);
        }
      `}</style>

      <div className="about-page">
        <div className="about-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>The Gallery</p>
            <h1 className="t-hero fade-up-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>About Tilwen</h1>
          </div>
        </div>

        <div className="container">
          <div className="about-body">
            <div className="about-text">
              <p>Almost everything sold as a "Berber rug" comes wrapped in a story: ancient, sacred, every diamond a secret meaning. Some of it is true. A lot of it was invented — by dealers, by collectors, by mid-century writers who needed the rugs to mean something specific — and then repeated until it hardened into fact. Tilwen starts from a plainer place: these are handwoven wool rugs made by Amazigh (Berber) women across Morocco, and they are worth understanding for what they actually are, plainly.</p>

              <p>What can be said with confidence is real enough. The wool, the dye, the loom, the region, the age. How a motif is built and where it appears. Which meanings are documented and which are guesses laid on afterward. A weaver asked what a diamond means might tell you it protects; she might also shrug and say it is the shape her mother used. Both answers are true, and we would rather print both than pretend the first one is the whole story.</p>

              <p>So Tilwen documents each piece the way a good dealer talks when they respect you: what it is, where it is from as far as the evidence reaches, its condition described without flattery, and its meaning reported honestly — the accepted reading, and the caution that comes with it. Not ethnic textiles. Not investment pieces. Not interior-design solutions. Wool, woven by named traditions, described straight.</p>

              <p>Every piece in the gallery is documented to the standard that understanding requires: the symbolic reading specific to this piece, the spatial character, the provenance as far as the evidence reaches, the condition described without flattery. The five-criteria publishing standard is not a marketing claim. A piece that cannot meet it does not appear here.</p>

              <p>The gallery is based in Marrakech. The pieces come from the communities that made them: the High Atlas, the Middle Atlas, the Anti-Atlas, the Saharan south. Sourcing is direct where possible and honest about what direct means where it isn't.</p>
            </div>

            <aside className="about-aside">
              <div className="about-aside-block">
                <span className="about-aside-label">The Name</span>
                <p className="about-aside-text">Tilwen is a short, Amazigh-sounding name chosen for the gallery. We will not dress it up with an etymology we cannot stand behind — the honesty starts with the name itself.</p>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">Berber or Amazigh?</span>
                <p className="about-aside-text">You will see these called Berber rugs almost everywhere, and that is the name most people know. It is not quite the right one. "Berber" descends from the Roman word for barbarian — the outsider who did not speak Latin — applied from outside and stuck for two thousand years. The people it describes call themselves Amazigh, plural Imazighen, roughly "the free people." We use both here: Berber so you can find us, Amazigh because it is their name.</p>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">The Standard</span>
                <p className="about-aside-text">Every piece published meets five criteria: complete specifications, a symbolic reading specific to this piece, a spatial behaviour section written for this object, minimum four images, and at least two motif cross-links. A piece that cannot meet all five does not appear.</p>
                <Link href="/glossary" className="about-aside-link">Explore the Glossary →</Link>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">The Mark</span>
                <p className="about-aside-text">The Tilwen logomark is Tanit, an old North African sign that appears across the region on stone, and that persists in Amazigh jewellery, tattoo, and textile borders. The squared body nods to the diagonal logic of kilim weaving. An old mark, chosen with care, rather than a drawn-up logo.</p>
                <Link href="/glossary/tanit" className="about-aside-link">Tanit in the Glossary →</Link>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">Contact</span>
                <p className="about-aside-text">hello@tilwen.com<br />Marrakech, Morocco</p>
                <Link href="/contact" className="about-aside-link">Send a note →</Link>
              </div>
            </aside>
          </div>

          {/* Publishing standards */}
          <div className="about-standards">
            <span className="t-label">The Five Criteria</span>
            <p className="t-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--grey-600)', maxWidth: '56ch' }}>
              Every piece that appears in the gallery has met all five. Not four. Not four and a half. A piece that cannot meet all five is not ready.
            </p>
            <div className="about-standards__grid">
              {[
                { n: '01', title: 'Complete Specifications', text: 'No blank fields. Not determined where genuinely unknown. Transparency on gaps builds trust; omitting fields implies concealment.' },
                { n: '02', title: 'Symbolic Reading', text: 'Specific to this piece. Not a generic paragraph about Amazigh culture that could appear on any page. What these motifs mean, in this composition, from this community.' },
                { n: '03', title: 'Spatial Behaviour', text: 'How this specific rug behaves in a room. Its atmosphere, its room affinities, what it requires to succeed, and what it does not suit.' },
                { n: '04', title: 'Four Images', text: 'Hero, detail, reverse, scale reference. The scale reference is unambiguous. Not an aspirational interior shot, but a clear sense of proportion.' },
                { n: '05', title: 'Cross-Links', text: 'At least two motif cross-links and one region cross-link. Every piece is a node in the knowledge system, not an isolated product page.' },
              ].map(s => (
                <div key={s.n} className="about-standard">
                  <div className="about-standard__num">{s.n}</div>
                  <span className="about-standard__title">{s.title}</span>
                  <p className="about-standard__text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
