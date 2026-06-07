export const metadata = {
  title: 'Contact',
  description: 'Send us a note — questions about a piece, the gallery, or anything else.',
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-page { padding-bottom: var(--sp-32); }
        .contact-header { padding: var(--sp-16) 0 var(--sp-12); border-bottom: var(--border); }
        .contact-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-24);
          padding: var(--sp-16) 0;
          align-items: start;
        }
        @media (max-width: 768px) { .contact-body { grid-template-columns: 1fr; } }

        /* ── Underline form ───────────────────────────────────── */
        .cf { display: flex; flex-direction: column; gap: 0; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-8); }
        @media (max-width: 480px) { .cf-row { grid-template-columns: 1fr; } }
        .cf-field {
          display: flex;
          flex-direction: column;
          padding: var(--sp-8) 0 var(--sp-4);
          border-bottom: 1px solid var(--grey-200);
          transition: border-color var(--t);
          position: relative;
        }
        .cf-field:focus-within { border-bottom-color: var(--black); }
        .cf-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-3);
          transition: color var(--t);
        }
        .cf-field:focus-within .cf-label { color: var(--black); }
        .cf-input {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          color: var(--black);
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          width: 100%;
        }
        .cf-input::placeholder { color: var(--grey-200); }
        .cf-textarea {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          color: var(--black);
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          width: 100%;
          resize: none;
          min-height: 120px;
          line-height: 1.65;
        }
        .cf-textarea::placeholder { color: var(--grey-200); }
        .cf-submit {
          margin-top: var(--sp-12);
          align-self: flex-start;
        }

        /* ── Info side ───────────────────────────────────────── */
        .contact-info { display: flex; flex-direction: column; gap: var(--sp-8); padding-top: var(--sp-4); }
        .contact-info-block {}
        .contact-info-label {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-400);
          display: block;
          margin-bottom: var(--sp-3);
        }
        .contact-info-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--grey-800);
        }
        .contact-email {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--black);
          border-bottom: 1px solid var(--grey-200);
          transition: border-color var(--t);
        }
        .contact-email:hover { border-bottom-color: var(--black); }
      `}</style>

      <div className="contact-page">
        <div className="contact-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Get in touch</p>
            <h1 className="t-display fade-up-1">Send us a note</h1>
          </div>
        </div>

        <div className="container">
          <div className="contact-body">
            <form className="cf" action="/api/contact" method="POST">
              <div className="cf-row">
                <div className="cf-field">
                  <label className="cf-label" htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" className="cf-input" required placeholder="Your name" />
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" className="cf-input" required placeholder="your@email.com" />
                </div>
              </div>
              <div className="cf-field" style={{ marginTop: 'var(--sp-2)' }}>
                <label className="cf-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="cf-textarea" required placeholder="Write your message here." />
              </div>
              <div className="cf-submit">
                <button type="submit" className="btn btn--primary">Send</button>
              </div>
            </form>

            <div className="contact-info">
              <div className="contact-info-block">
                <span className="contact-info-label">Email</span>
                <a href="mailto:hello@tilwen.com" className="contact-email">hello@tilwen.com</a>
              </div>
              <div className="contact-info-block">
                <span className="contact-info-label">Response time</span>
                <p className="contact-info-text">We respond to all messages within 24 hours.</p>
              </div>
              <div className="contact-info-block">
                <span className="contact-info-label">Trade &amp; sourcing</span>
                <p className="contact-info-text">For trade enquiries, custom sourcing, or project work, the <a href="/inquire" style={{ borderBottom: '1px solid var(--grey-200)', transition: 'border-color var(--t)' }}>Inquire</a> page has a more detailed form.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
