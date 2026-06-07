export const metadata = { title: 'Payments' }

export default function PaymentsPage() {
  return (
    <>
      <style>{`
        .info-page { padding-bottom: var(--sp-32); }
        .info-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .info-body { padding: var(--sp-12) 0; max-width: 800px; }
        .info-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .info-section-title { margin-bottom: var(--sp-6); }
        .payment-methods { display: flex; flex-direction: column; gap: 0; margin-top: var(--sp-4); }
        .payment-method {
          display: grid; grid-template-columns: 180px 1fr; gap: var(--sp-6);
          padding: var(--sp-4) 0; border-bottom: var(--border); align-items: start;
        }
        .payment-method:last-child { border-bottom: none; }
        .payment-method dt { font-family: var(--font-ui); font-size: 0.75rem; color: var(--grey-600); }
        .payment-method dd { font-family: var(--font-body); font-size: 0.9375rem; color: var(--grey-800); line-height: 1.6; }
      `}</style>

      <div className="info-page">
        <div className="info-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Information</p>
            <h1 className="t-display fade-up-1">Payments</h1>
          </div>
        </div>

        <div className="container">
          <div className="info-body">
            <div className="info-section">
              <p className="t-label info-section-title">Payment Methods</p>
              <div className="prose" style={{ marginBottom: 'var(--sp-6)' }}>
                <p>All transactions are confirmed by email with a formal invoice before payment is requested. We do not take payment until availability is confirmed and the piece is reserved for you.</p>
              </div>
              <dl className="payment-methods">
                <div className="payment-method">
                  <dt>Bank Transfer</dt>
                  <dd>International bank transfer (SWIFT/IBAN). Bank details provided on the invoice. No fees charged by us; your bank's transfer fees apply. Payment confirmed within 1–3 business days depending on originating bank.</dd>
                </div>
                <div className="payment-method">
                  <dt>Credit / Debit Card</dt>
                  <dd>Visa, Mastercard, and American Express accepted via secure payment link. A processing fee of 2.5% applies to card payments to cover transaction costs.</dd>
                </div>
                <div className="payment-method">
                  <dt>PayPal</dt>
                  <dd>PayPal is accepted for transactions up to €5,000. A processing fee of 3% applies. PayPal payments are processed via a secure payment request; we do not store card or account details.</dd>
                </div>
              </dl>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Invoice and Reservation</p>
              <div className="prose">
                <p>Once we confirm that a piece is available and you wish to proceed, we will send a formal invoice within 24 hours. The piece is reserved for you for 48 hours from the time the invoice is issued. If payment is not received within 48 hours, the reservation lapses and the piece is returned to public availability.</p>
                <p>For custom sourcing projects, a 30% deposit is required to confirm the sourcing brief. The balance is due on confirmation that the piece has been secured and meets the agreed description.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Currency</p>
              <div className="prose">
                <p>All prices are listed in Euros (EUR). We can invoice in GBP, USD, or CAD on request; the exchange rate applied will be the mid-market rate on the date of invoice.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Taxes and Duties</p>
              <div className="prose">
                <p>Prices listed on the site do not include import duties, customs fees, or local taxes, which are the buyer's responsibility and vary by destination country. We will provide all documentation required for customs clearance. For EU buyers, VAT may apply depending on the country of delivery; this will be stated on the invoice.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Security</p>
              <div className="prose">
                <p>We do not store payment details. All card transactions are processed via PCI-compliant third-party payment processors. Bank transfer details are sent only via encrypted email to the address used in the inquiry.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
