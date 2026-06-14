import Link from 'next/link'
import TanitMark from '@/components/TanitMark'

export default function Footer() {
  // Static year — a Date() in render bakes a time-dependent value into the
  // (ISR-cached) server HTML that can mismatch the client and trip a hydration
  // error. A copyright year doesn't need to be live; bump it each January.
  const year = 2026
  return (
    <>
      <style>{`
        .footer {
          border-top: var(--border);
          padding: var(--sp-16) 0 var(--sp-8);
          margin-top: var(--sp-32);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--sp-8);
          padding-bottom: var(--sp-12);
          border-bottom: var(--border);
        }
        @media (max-width: 900px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .footer__grid { grid-template-columns: 1fr; } }
        .footer__col-brand p {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--grey-800);
          line-height: 1.6;
          max-width: 32ch;
          margin-top: var(--sp-4);
        }
        .footer__wordmark {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .footer__wordmark-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.01em;
        }
        .footer__col-title {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--grey-600);
          margin-bottom: var(--sp-4);
          display: block;
        }
        .footer__links { display: flex; flex-direction: column; gap: 0.625rem; }
        .footer__link {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          color: var(--black);
          transition: color var(--t);
        }
        .footer__link:hover { color: var(--black); }
        .footer__bottom {
          padding-top: var(--sp-8);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--sp-4);
          flex-wrap: wrap;
        }
        .footer__legal {
          display: flex; gap: var(--sp-6); flex-wrap: wrap;
        }
        .footer__legal-link {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          letter-spacing: 0.04em;
          color: var(--grey-600);
          transition: color var(--t);
        }
        .footer__legal-link:hover { color: var(--black); }
        .footer__copy {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          color: var(--grey-600);
          letter-spacing: 0.04em;
        }

        /* ── First sight — early access block ───────────────── */
        .footer__firstsight {
          padding: var(--sp-12) 0;
          border-bottom: var(--border);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: center;
        }
        @media (max-width: 768px) { .footer__firstsight { grid-template-columns: 1fr; gap: var(--sp-6); } }
        .footer__firstsight-text {}
        .footer__firstsight-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: var(--black);
          margin-bottom: var(--sp-2);
        }
        .footer__firstsight-body {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--grey-600);
          max-width: 44ch;
        }
        .footer__firstsight-form {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--grey-800);
          align-items: center;
        }
        .footer__firstsight-input {
          flex: 1;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--black);
          background: transparent;
          border: none;
          outline: none;
          padding: var(--sp-4) 0;
        }
        .footer__firstsight-input::placeholder { color: var(--grey-200); }
        .footer__firstsight-btn {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--sp-4) 0 var(--sp-4) var(--sp-6);
          transition: opacity var(--t);
          white-space: nowrap;
        }
        .footer__firstsight-btn:hover { opacity: 0.5; }
        .footer__firstsight-note {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          color: var(--grey-400);
          margin-top: var(--sp-4);
          display: block;
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          {/* First sight — early access */}
          <div className="footer__firstsight">
            <div className="footer__firstsight-text">
              <p className="footer__firstsight-title">First sight</p>
              <p className="footer__firstsight-body">New pieces arrive without announcement. Some go the same week. The list is the only way to be there when they do.</p>
            </div>
            <div>
              <form className="footer__firstsight-form" action="/api/subscribe" method="POST">
                <input type="email" name="email" className="footer__firstsight-input" placeholder="your@email.com" required />
                <button type="submit" className="footer__firstsight-btn">Join →</button>
              </form>
              <span className="footer__firstsight-note">No newsletter. Only new arrivals, before they're listed.</span>
            </div>
          </div>

          <div className="footer__grid">
            <div className="footer__col-brand">
              <div className="footer__wordmark"><TanitMark size={28} color="currentColor" /><span className="footer__wordmark-text">Tilwen</span></div>
              <p>A shoppable ethnographic gallery for Moroccan and Amazigh rugs. Each piece is one of a kind, fully documented, and irreplaceable.</p>
            </div>

            <div>
              <span className="footer__col-title">Gallery</span>
              <div className="footer__links">
                <Link href="/moroccan-rugs" className="footer__link">All Rugs</Link>
                <Link href="/traditions" className="footer__link">Traditions</Link>
                <Link href="/motifs" className="footer__link">Motifs</Link>
                <Link href="/regions" className="footer__link">Regions</Link>
                <Link href="/journal" className="footer__link">Journal</Link>
              </div>
            </div>

            <div>
              <span className="footer__col-title">About</span>
              <div className="footer__links">
                <Link href="/about" className="footer__link">Methodology</Link>
                <Link href="/contact" className="footer__link">Send us a note</Link>
                <Link href="/faq" className="footer__link">FAQ</Link>
                <Link href="/inquire" className="footer__link">Inquire</Link>
                <Link href="/inquire#trade" className="footer__link">Trade Programme</Link>
              </div>
            </div>

            <div>
              <span className="footer__col-title">Information</span>
              <div className="footer__links">
                <Link href="/glossary" className="footer__link">Glossary</Link>
                <Link href="/care" className="footer__link">Care & Shipping</Link>
                <Link href="/returns" className="footer__link">Returns</Link>
                <Link href="/payments" className="footer__link">Payments</Link>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__copy">© {year} Tilwen. All rights reserved.</span>
            <div className="footer__legal">
              <Link href="/terms" className="footer__legal-link">Terms</Link>
              <Link href="/privacy" className="footer__legal-link">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
