import Link from 'next/link'

export const metadata = { title: 'Care & Shipping' }

export default function CarePage() {
  return (
    <>
      <style>{`
        .info-page { padding-bottom: var(--sp-32); }
        .info-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .info-body { padding: var(--sp-12) 0; }
        .info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-16);
        }
        @media (max-width: 768px) { .info-grid { grid-template-columns: 1fr; } }
        .info-section { padding: var(--sp-8) 0; border-top: var(--border); }
        .info-section-title { margin-bottom: var(--sp-6); }
        .info-section .prose p { max-width: none; }
        .info-list { margin-top: var(--sp-4); display: flex; flex-direction: column; gap: var(--sp-2); }
        .info-list-item {
          display: grid; grid-template-columns: 160px 1fr; gap: var(--sp-4);
          padding: var(--sp-2) 0; border-bottom: var(--border);
        }
        .info-list-item:last-child { border-bottom: none; }
        .info-list-item dt { font-family: var(--font-ui); font-size: 0.75rem; color: var(--grey-400); }
        .info-list-item dd { font-family: var(--font-body); font-size: 0.9375rem; color: var(--grey-800); }
      `}</style>

      <div className="info-page">
        <div className="info-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Information</p>
            <h1 className="t-display fade-up-1">Care &amp; Shipping</h1>
          </div>
        </div>

        <div className="container">
          <div className="info-body">
            <div className="info-grid">
              <div>
                <div className="info-section">
                  <p className="t-label info-section-title">Shipping</p>
                  <div className="prose">
                    <p>We ship worldwide. All pieces are professionally packed by a specialist textile shipper, with full photographic documentation before dispatch.</p>
                    <p>Shipping costs are confirmed at inquiry — they depend on destination, rug size and weight, and the carrier appropriate for the value of the piece. We do not add a margin to shipping costs; you pay what we pay.</p>
                    <p>Insurance is included in all shipments at the full declared value of the piece. All customs and import duties are the responsibility of the buyer and are not included in the piece price.</p>
                  </div>
                  <dl className="info-list" style={{ marginTop: 'var(--sp-6)' }}>
                    <div className="info-list-item">
                      <dt>Europe</dt>
                      <dd>3–7 business days</dd>
                    </div>
                    <div className="info-list-item">
                      <dt>United Kingdom</dt>
                      <dd>3–5 business days</dd>
                    </div>
                    <div className="info-list-item">
                      <dt>North America</dt>
                      <dd>5–10 business days</dd>
                    </div>
                    <div className="info-list-item">
                      <dt>Rest of world</dt>
                      <dd>7–14 business days</dd>
                    </div>
                    <div className="info-list-item">
                      <dt>Carrier</dt>
                      <dd>DHL, FedEx, or specialist art shipper depending on piece</dd>
                    </div>
                  </dl>
                </div>

                <div className="info-section">
                  <p className="t-label info-section-title">Packaging</p>
                  <div className="prose">
                    <p>All rugs are rolled on an acid-free tube, wrapped in acid-free tissue, and then in a protective outer wrap. They are shipped in a rigid tube or crate depending on size. All packaging materials are conservation-grade.</p>
                    <p>We photograph the rug before packing and send these images to the buyer before dispatch. If the piece arrives damaged, these pre-dispatch photographs form the basis of any insurance claim.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="info-section">
                  <p className="t-label info-section-title">Care — Flatweave Kilim</p>
                  <div className="prose">
                    <p>Flatweave kilims do not have pile and are generally more forgiving than pile rugs in daily use. Regular rotation (every 6–12 months) distributes wear evenly. Do not fold — always roll for storage.</p>
                    <p>For cleaning: vacuum gently with suction only, no beater bar, no rotary brush. For larger spills, blot immediately with a clean white cloth — do not rub. Professional cleaning every 3–5 years is recommended; always use a specialist with experience in natural-dye textiles. Do not steam clean or wet-wash at home.</p>
                    <p>Natural dyes in vintage pieces can be sensitive to sunlight. Avoid direct prolonged exposure to strong south or west light, particularly for pieces with indigo.</p>
                  </div>
                </div>

                <div className="info-section">
                  <p className="t-label info-section-title">Care — Pile-Knotted</p>
                  <div className="prose">
                    <p>Pile rugs require more attention than flatweaves. Use a rug pad underneath to prevent slipping and protect the foundation. Rotate every 6–12 months. Do not permanently compress the pile under heavy furniture — use furniture cups or pads.</p>
                    <p>Vacuum regularly on the pile side with low suction — never against the pile direction. Beat gently outdoors rather than machine-beating. For vintage pile rugs with natural dyes, consult a specialist before any cleaning.</p>
                    <p>If the pile sheds initially — common in undyed wool pieces — this will diminish with use and is not a defect.</p>
                  </div>
                </div>

                <div className="info-section">
                  <p className="t-label info-section-title">Storage</p>
                  <div className="prose">
                    <p>Always roll, never fold. Store in a cool, dry, well-ventilated space away from direct light. Protect from moths with natural repellents (cedar, lavender) rather than chemical treatments, which can damage natural fibres. Check periodically.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
