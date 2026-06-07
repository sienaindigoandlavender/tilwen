export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .legal-page { padding-bottom: var(--sp-32); }
        .legal-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .legal-body { padding: var(--sp-12) 0; }
        .legal-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .legal-section-title { margin-bottom: var(--sp-6); }
        .legal-updated {
          font-family: var(--font-ui); font-size: 0.6875rem;
          color: var(--grey-400); letter-spacing: 0.04em; margin-top: var(--sp-2);
        }
      `}</style>

      <div className="legal-page">
        <div className="legal-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Legal</p>
            <h1 className="t-display fade-up-1">Privacy Policy</h1>
            <p className="legal-updated">Last updated: January 2025</p>
          </div>
        </div>

        <div className="container">
          <div className="legal-body" style={{ maxWidth: '760px' }}>
            <div className="legal-section">
              <p className="t-label legal-section-title">Who We Are</p>
              <div className="prose">
                <p>House of Weaves is an independent gallery. When you use this website or contact us, you are dealing directly with the gallery. We can be reached at <a href="mailto:hello@houseofweaves.com">hello@houseofweaves.com</a>.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">What Data We Collect</p>
              <div className="prose">
                <p>We collect personal data only when you provide it to us directly — through the inquiry form, by email, or in the course of a transaction. This data may include your name, email address, business name, delivery address, and the content of your inquiry or correspondence.</p>
                <p>We do not use cookies for tracking or advertising. We do not use analytics tools that collect individual user data. We do not run retargeting or behavioural advertising campaigns.</p>
                <p>Basic server logs are retained for security and performance purposes. These logs include IP addresses and page request information. They are not used to identify individuals and are deleted automatically after 30 days.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">How We Use Your Data</p>
              <div className="prose">
                <p>Data you provide is used solely to respond to your inquiry, process a transaction, or communicate about an existing relationship. We do not sell, share, or disclose your personal data to third parties except as required by law or as necessary to complete a transaction (for example, providing a delivery address to a shipping company).</p>
                <p>We do not send marketing emails unless you have explicitly requested to be on a notification list for new inventory. If you have done so, you can unsubscribe at any time by replying to any email or contacting us directly.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Data Retention</p>
              <div className="prose">
                <p>Inquiry and transaction records are retained for as long as necessary to support the relationship and to meet legal obligations (typically 7 years for financial records). If you would like your data deleted, contact us and we will do so subject to any legal retention requirements.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Your Rights</p>
              <div className="prose">
                <p>You have the right to request access to the personal data we hold about you, to correct inaccurate data, to request deletion, and to object to processing. To exercise any of these rights, contact us at <a href="mailto:hello@houseofweaves.com">hello@houseofweaves.com</a>. We will respond within 30 days.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Third-Party Services</p>
              <div className="prose">
                <p>This website is hosted on Vercel. Our email is processed via standard email providers. Payment processing, when applicable, is handled by PCI-compliant third-party processors. These services have their own privacy policies governing data they handle.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Changes to This Policy</p>
              <div className="prose">
                <p>We may update this policy from time to time. Material changes will be noted with an updated date at the top of this page. Continued use of the site after changes are posted constitutes acceptance of the revised policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
