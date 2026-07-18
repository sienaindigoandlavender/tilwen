import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'Before Islam. Before everything that came after and tried to rename it. Tilwen is where those objects are.',
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
              <p>Before Islam. Before everything that came after and tried to rename it. The lozenge on a High Atlas kilim is a protective mark, placed by a woman who understood that beauty and protection are the same gesture. The broken comb on a border is a deliberate incompleteness, because perfection invites envy, and envy has weight. The eye form is not a decoration. It looks back.</p>

              <p>These objects were made to do something. Not to cover floors, though they do that too. They were made to hold the line between the interior of a life and whatever pressed against it from outside. The Amazigh symbolic vocabulary that runs through this weaving tradition is pre-Islamic, pre-Christian, pre-everything that arrived later and tried to absorb or explain or suppress it. It persisted in wool because wool goes everywhere a family goes, and because the women who made it understood that the marks had to travel with the people they protected.</p>

              <p>Tilwen exists because these objects deserve to be understood for what they are. Not as ethnic textiles. Not as investment pieces. Not as interior design solutions. As objects that carried meaning before any of us arrived and will carry it after.</p>

              <p>Every piece in the gallery is documented to the standard that understanding requires: the symbolic reading specific to this piece, the spatial character, the provenance as far as the evidence reaches, the condition described without flattery. The five-criteria publishing standard is not a marketing claim. A piece that cannot meet it does not appear here.</p>

              <p>The gallery is based in Marrakech. The pieces come from the communities that made them: the High Atlas, the Middle Atlas, the Anti-Atlas, the Saharan south. Sourcing is direct where possible and honest about what direct means where it isn't.</p>
            </div>

            <aside className="about-aside">
              <div className="about-aside-block">
                <span className="about-aside-label">The Name</span>
                <p className="about-aside-text">Tilwen is a Tamazight word for the colours that appear in the sky between sunset and full dark. The brief, plural light before night. It is the hour when the High Atlas turns amber. It is also the hour when the marks on a kilim, seen in that light, stop being decorative.</p>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">The Standard</span>
                <p className="about-aside-text">Every piece published meets five criteria: complete specifications, a symbolic reading specific to this piece, a spatial behaviour section written for this object, minimum four images, and at least two motif cross-links. A piece that cannot meet all five does not appear.</p>
                <Link href="/glossary" className="about-aside-link">Explore the Glossary →</Link>
              </div>

              <div className="about-aside-block">
                <span className="about-aside-label">The Mark</span>
                <p className="about-aside-text">The Tilwen logomark is Tanit, the Phoenician-Amazigh goddess whose symbol appears on thousands of Punic votive stelae across North Africa. Her form persists in Amazigh jewellery, tattoo, and textile borders. The squared body references the diagonal logic of kilim weaving. She is not a logo. She is the oldest protective mark in this tradition.</p>
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
