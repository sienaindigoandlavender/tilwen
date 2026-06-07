export const metadata = {
  title: 'Inquire',
  description: 'Contact Tilwen to inquire about a piece, the trade programme, or a custom sourcing request.',
}

export default function InquirePage() {
  return (
    <>
      <style>{`
        .inquire-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .inquire-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-16); padding: var(--sp-12) 0;
        }
        @media (max-width: 768px) { .inquire-body { grid-template-columns: 1fr; } }
        .inquire-form { display: flex; flex-direction: column; gap: var(--sp-4); }
        .form-field { display: flex; flex-direction: column; gap: var(--sp-2); }
        .form-label {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey-600);
        }
        .form-input {
          height: 44px; padding: 0 var(--sp-4); border: var(--border);
          font-family: var(--font-body); font-size: 1rem;
          transition: border-color var(--t); width: 100%;
          background: transparent; outline: none;
        }
        .form-input:focus { border-color: var(--black); }
        .form-textarea {
          padding: var(--sp-4); border: var(--border);
          font-family: var(--font-body); font-size: 1rem; resize: vertical;
          min-height: 140px; transition: border-color var(--t); width: 100%;
          background: transparent; outline: none; line-height: 1.6;
        }
        .form-textarea:focus { border-color: var(--black); }
        .form-select {
          height: 44px; padding: 0 var(--sp-4); border: var(--border);
          font-family: var(--font-body); font-size: 1rem;
          background: transparent; outline: none; cursor: pointer; width: 100%;
          transition: border-color var(--t);
        }
        .form-select:focus { border-color: var(--black); }
        .inquire-info { display: flex; flex-direction: column; gap: var(--sp-8); }
        .inquire-section {}
        .inquire-section-title { margin-bottom: var(--sp-4); }
        .inquire-section p {
          font-family: var(--font-body); font-size: 0.9375rem;
          color: var(--grey-600); line-height: 1.65;
        }
        .trade-anchor { padding-top: var(--sp-24); border-top: var(--border); margin-top: var(--sp-16); }
      `}</style>

      <div className="inquire-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Contact</p>
          <h1 className="t-display fade-up-1">Inquire</h1>
          <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-6)', maxWidth: '56ch', color: 'var(--grey-600)' }}>
            To inquire about a specific piece, the trade programme, or a custom sourcing request. We respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="inquire-body">
          <form className="inquire-form" action="/api/inquire" method="POST">
            <div className="form-field">
              <label className="form-label" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="form-input" required placeholder="Your full name" />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="form-input" required placeholder="your@email.com" />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="company">Company or Studio (optional)</label>
              <input id="company" name="company" type="text" className="form-input" placeholder="For trade inquiries" />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="inquiry_type">Nature of Inquiry</label>
              <select id="inquiry_type" name="inquiry_type" className="form-select" required>
                <option value="">Select —</option>
                <option value="purchase">Inquiry about a specific piece</option>
                <option value="trade">Trade programme</option>
                <option value="sourcing">Custom sourcing request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="rug_reference">Piece Reference (optional)</label>
              <input id="rug_reference" name="rug_reference" type="text" className="form-input" placeholder="e.g. Lucid — or leave blank" />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea" required placeholder="Tell us what you are looking for, or ask any question." />
            </div>
            <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
              Send Inquiry
            </button>
          </form>

          <div className="inquire-info">
            <div className="inquire-section">
              <p className="t-label inquire-section-title">Response Time</p>
              <p>We respond to all inquiries within 24 hours. For trade inquiries requiring sourcing or custom work, initial responses may take up to 48 hours.</p>
            </div>
            <div className="inquire-section">
              <p className="t-label inquire-section-title">What Happens Next</p>
              <p>For purchase inquiries: we confirm availability, provide full shipping options and costs, and send a formal invoice. Payment is by bank transfer or card.</p>
              <p style={{ marginTop: 'var(--sp-4)' }}>For sourcing requests: we discuss your requirements, timeline, and budget before confirming whether we can help.</p>
            </div>
            <div className="inquire-section">
              <p className="t-label inquire-section-title">Contact Directly</p>
              <p>
                <a href="mailto:hello@tilwen.com" style={{ borderBottom: '1px solid var(--grey-200)', transition: 'border-color var(--t)', fontFamily: 'var(--font-ui)', fontSize: '0.875rem' }}>
                  hello@tilwen.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Trade section */}
        <div id="trade" className="trade-anchor">
          <p className="t-label" style={{ marginBottom: 'var(--sp-4)' }}>Trade Programme</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-16)', paddingBottom: 'var(--sp-16)' }}>
            <div>
              <h2 className="t-display-sm" style={{ marginBottom: 'var(--sp-6)' }}>For Interior Designers and Architects</h2>
              <div className="prose">
                <p>We work with interior designers, architects, and set designers who need access to specific pieces, clear specifications, and reliable shipping on a project timeline.</p>
                <p>What the trade programme offers: early access to new pieces before public listing, direct account contact, trade pricing on qualified projects, and the ability to hold a piece for up to 7 days for client presentation.</p>
                <p>To open a trade account, use the inquiry form above and select Trade Programme. We will ask for your practice details and a brief description of your typical project type.</p>
              </div>
            </div>
            <div>
              <h2 className="t-display-sm" style={{ marginBottom: 'var(--sp-6)' }}>Custom Sourcing</h2>
              <div className="prose">
                <p>If you are looking for a piece that is not currently in the gallery — a specific region, technique, scale, or palette — we can source it.</p>
                <p>Custom sourcing operates on a 4–12 week timeline depending on specificity. We will provide a brief before beginning, a clear pricing structure, and the same documentation standard as pieces in the gallery.</p>
                <p>Use the inquiry form above and select Custom Sourcing Request. Include as much detail as you can about the piece you are looking for.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
