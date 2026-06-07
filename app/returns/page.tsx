import Link from 'next/link'

export const metadata = { title: 'Returns' }

export default function ReturnsPage() {
  return (
    <>
      <style>{`
        .info-page { padding-bottom: var(--sp-32); }
        .info-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .info-body { padding: var(--sp-12) 0; max-width: 800px; }
        .info-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .info-section-title { margin-bottom: var(--sp-6); }
      `}</style>

      <div className="info-page">
        <div className="info-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Information</p>
            <h1 className="t-display fade-up-1">Returns</h1>
          </div>
        </div>

        <div className="container">
          <div className="info-body">
            <div className="info-section">
              <p className="t-label info-section-title">Return Policy</p>
              <div className="prose">
                <p>Returns are accepted within 14 days of confirmed delivery. The piece must be returned in the same condition as received — unaltered, undamaged, rolled as shipped. Return shipping costs are the responsibility of the buyer, and the piece must be insured at its full value for transit.</p>
                <p>To initiate a return, contact us at <a href="mailto:hello@houseofweaves.com">hello@houseofweaves.com</a> within 14 days of delivery with your order reference and the reason for return. We will confirm return instructions within 24 hours.</p>
                <p>Refunds are issued within 5 business days of confirmed receipt of the returned piece in its original condition. Refunds are to the original payment method only.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Condition on Arrival</p>
              <div className="prose">
                <p>Every piece is photographed before packing and those images are sent to the buyer before dispatch. If a piece arrives damaged in transit, contact us immediately with photographs of the damage and the packaging. We will initiate an insurance claim on your behalf and, where possible, arrange a replacement or full refund.</p>
                <p>Condition is described in full on every piece page. If a piece arrives materially different from its description, contact us and we will arrange a full refund including return shipping at our cost. This situation is rare; we take our condition descriptions seriously.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Non-Returnable Circumstances</p>
              <div className="prose">
                <p>Pieces that have been altered, cut, cleaned, or damaged after delivery are not eligible for return. Custom sourcing projects — pieces sourced specifically for a buyer against a brief — are non-returnable unless they arrive materially different from the agreed description.</p>
              </div>
            </div>

            <div className="info-section">
              <p className="t-label info-section-title">Questions</p>
              <div className="prose">
                <p>If you have any questions about the return process before purchasing, please <Link href="/inquire">contact us</Link>. We prefer that buyers feel fully confident before committing to a purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
