export const metadata = {
  title: 'Payments',
  description: 'How payment works at Tilwen.',
}

export default function PaymentsPage() {
  return (
    <>
      <style>{`
        .pay-page { padding-bottom: var(--sp-32); }
        .pay-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .pay-body { padding: var(--sp-12) 0; max-width: 560px; }
        .pay-body h2 { font-family: var(--font-display); font-size: 1.375rem; font-weight: 400; letter-spacing: -0.015em; margin: var(--sp-8) 0 var(--sp-4); color: var(--black); }
        .pay-body h2:first-child { margin-top: 0; }
        .pay-body p { font-family: var(--font-body); font-size: 1rem; line-height: 1.75; color: var(--grey-600); margin-bottom: var(--sp-4); }
        .pay-body p strong { color: var(--black); font-weight: 500; }
      `}</style>

      <div className="pay-page">
        <div className="pay-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Payments</p>
            <h1 className="t-display fade-up-1">How payment works</h1>
          </div>
        </div>

        <div className="container">
          <div className="pay-body">
            <h2>Currency</h2>
            <p>All prices are in EUR. PayPal handles currency conversion for buyers paying from non-EUR accounts. You pay in your local currency; we receive in EUR.</p>

            <h2>Methods</h2>
            <p><strong>PayPal</strong>: available at checkout. You do not need a PayPal account to pay by card through PayPal's secure gateway.</p>
            <p><strong>Major credit cards</strong>: Visa, Mastercard, American Express, through the secure checkout.</p>

            <h2>Security</h2>
            <p>Payment is processed through Shopify's secure checkout and PayPal. Tilwen does not store card details. All transactions are encrypted.</p>

            <h2>Questions</h2>
            <p>If something went wrong with a payment, or if you need to arrange payment outside the standard checkout for any reason, <a href="/contact" style={{ borderBottom: '1px solid var(--grey-200)' }}>contact us</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
