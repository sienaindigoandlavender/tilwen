import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
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
          color: var(--grey-600);
          line-height: 1.6;
          max-width: 32ch;
          margin-top: var(--sp-4);
        }
        .footer__wordmark {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.01em;
          display: block;
        }
        .footer__col-title {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          display: block;
        }
        .footer__links { display: flex; flex-direction: column; gap: 0.625rem; }
        .footer__link {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          color: var(--grey-600);
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
          color: var(--grey-400);
          transition: color var(--t);
        }
        .footer__legal-link:hover { color: var(--grey-600); }
        .footer__copy {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          color: var(--grey-400);
          letter-spacing: 0.04em;
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__col-brand">
              <span className="footer__wordmark">Tilwen</span>
              <p>A shoppable ethnographic gallery for Moroccan and Amazigh rugs. Each piece is one of a kind, fully documented, and irreplaceable.</p>
            </div>

            <div>
              <span className="footer__col-title">Gallery</span>
              <div className="footer__links">
                <Link href="/gallery" className="footer__link">All Rugs</Link>
                <Link href="/motifs" className="footer__link">Motifs</Link>
                <Link href="/regions" className="footer__link">Regions</Link>
                <Link href="/journal" className="footer__link">Journal</Link>
              </div>
            </div>

            <div>
              <span className="footer__col-title">About</span>
              <div className="footer__links">
                <Link href="/about" className="footer__link">Methodology</Link>
                <Link href="/inquire" className="footer__link">Inquire</Link>
                <Link href="/inquire#trade" className="footer__link">Trade Programme</Link>
              </div>
            </div>

            <div>
              <span className="footer__col-title">Information</span>
              <div className="footer__links">
                <Link href="/care" className="footer__link">Care & Shipping</Link>
                <Link href="/returns" className="footer__link">Returns</Link>
                <Link href="/payments" className="footer__link">Payments</Link>
                <Link href="/privacy" className="footer__link">Privacy Policy</Link>
                <Link href="/terms" className="footer__link">Terms of Use</Link>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__copy">© {year} Tilwen. All rights reserved.</span>
            <div className="footer__legal">
              <Link href="/terms" className="footer__legal-link">Terms</Link>
              <Link href="/privacy" className="footer__legal-link">Privacy</Link>
              <Link href="/care" className="footer__legal-link">Shipping</Link>
              <Link href="/returns" className="footer__legal-link">Returns</Link>
              <Link href="/payments" className="footer__legal-link">Payments</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
