export const metadata = { title: 'Terms of Use' }

export default function TermsPage() {
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
            <h1 className="t-display fade-up-1">Terms of Use</h1>
            <p className="legal-updated">Last updated: January 2025</p>
          </div>
        </div>

        <div className="container">
          <div className="legal-body" style={{ maxWidth: '760px' }}>
            <div className="legal-section">
              <p className="t-label legal-section-title">Use of This Website</p>
              <div className="prose">
                <p>This website is provided for informational and commercial purposes related to Tilwen. By using the site, you agree to these terms. If you do not agree, please do not use the site.</p>
                <p>You may browse and use the site for personal, non-commercial purposes. You may not reproduce, distribute, or republish any content from this site without our express written permission.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Intellectual Property</p>
              <div className="prose">
                <p>All content on this site, text, images, descriptions, curatorial writing, is the property of Tilwen unless otherwise stated. The ethnographic and cultural content is original research and editorial work. It may not be reproduced or used without permission.</p>
                <p>The rugs depicted are physical objects with their own cultural heritage. Photography and documentation of those objects belongs to Tilwen. Use of product images without permission is not permitted.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Accuracy of Information</p>
              <div className="prose">
                <p>We make every effort to ensure that descriptions, dimensions, condition notes, and pricing are accurate. Colour representations in photographs may vary depending on screen calibration. Dimensions are measured to the nearest centimetre. If precision is critical for your purpose, please confirm before purchasing.</p>
                <p>Cultural and historical attributions in our descriptions are based on available evidence and our best scholarly judgment. We note uncertainty where it exists. We do not guarantee the accuracy of attributions that go beyond available documentation.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Purchase Terms</p>
              <div className="prose">
                <p>The purchase process for all pieces is initiated via inquiry. A piece is not sold until a formal invoice has been issued, accepted, and paid. Listing a piece on the site does not constitute an offer to sell at a fixed price. Prices are as listed but availability must be confirmed.</p>
                <p>All sales are final subject to our returns policy. By proceeding with a purchase, you confirm that you have read the piece's full description and accept its condition as described.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Limitation of Liability</p>
              <div className="prose">
                <p>Tilwen is not liable for any loss or damage arising from the use of this website, errors or omissions in content, or the purchase of any piece beyond the value of that piece. Our liability in any transaction is limited to the purchase price paid.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Governing Law</p>
              <div className="prose">
                <p>These terms are governed by the laws of Morocco. Any disputes arising from use of this website or transactions conducted through it will be subject to the jurisdiction of the courts of Marrakech, Morocco, unless otherwise required by consumer protection law in the buyer's country of residence.</p>
              </div>
            </div>

            <div className="legal-section">
              <p className="t-label legal-section-title">Contact</p>
              <div className="prose">
                <p>For any questions about these terms, contact us at <a href="mailto:hello@tilwen.com">hello@tilwen.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
