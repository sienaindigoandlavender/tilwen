export const metadata = {
  title: 'Returns & Final Sale Policy',
  description: 'All pieces at Tilwen are one of a kind. All sales are final.',
}

export default function ReturnsPage() {
  return (
    <>
      <style>{`
        .returns-page { padding-bottom: var(--sp-32); }
        .returns-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .returns-body { padding: var(--sp-12) 0; max-width: 640px; }
        .returns-body h2 {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 400;
          letter-spacing: -0.015em;
          margin: var(--sp-8) 0 var(--sp-4);
          color: var(--black);
        }
        .returns-body h2:first-child { margin-top: 0; }
        .returns-body p {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.75;
          color: var(--grey-600);
          margin-bottom: var(--sp-4);
        }
        .returns-body p strong { color: var(--black); font-weight: 500; }
        .returns-note {
          padding: var(--sp-6);
          border-left: 3px solid var(--black);
          background: var(--grey-100);
          margin: var(--sp-8) 0;
        }
        .returns-note p { margin-bottom: 0; color: var(--black); }
      `}</style>

      <div className="returns-page">
        <div className="returns-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Policy</p>
            <h1 className="t-display fade-up-1">Returns & Final Sale</h1>
          </div>
        </div>

        <div className="container">
          <div className="returns-body">
            <div className="returns-note">
              <p><strong>All sales at Tilwen are final.</strong> Every piece is one of a kind. When it leaves, it is gone — and it cannot be returned to the gallery.</p>
            </div>

            <h2>Why we do not accept returns</h2>
            <p>Each piece in the gallery is a unique vintage or one-of-a-kind object, fully documented and described with the specificity that allows you to make an informed decision before purchasing. The symbolic reading, the spatial notes, the condition description, the photographs — these exist so that you know exactly what you are acquiring. We do not sell objects you need to hold in your hands to understand.</p>
            <p>One-of-a-kind means that a returned piece cannot be resold as new. It re-enters a market where its provenance has now included an additional transfer, which changes what it is. We do not accept that trade.</p>

            <h2>What this means for you</h2>
            <p>Read the piece description in full before purchasing. If you have questions about condition, dimensions, specific details visible in the photographs, or anything else — <a href="/contact" style={{ borderBottom: '1px solid var(--grey-200)' }}>contact us</a> before you buy. We respond within 24 hours.</p>
            <p>If you are uncertain whether a piece suits your space, we are happy to discuss its spatial character, palette behaviour, and room requirements in detail. That conversation costs nothing and exists to prevent regret.</p>

            <h2>Damaged in transit</h2>
            <p>If a piece arrives damaged as a result of transit — not a condition issue that was present and documented before shipping, but damage caused by the shipping process — contact us within 48 hours of receipt with photographs. We will assess and resolve the situation. This is the one exception to the final sale policy, and it applies only to transit damage, not to condition as described.</p>

            <h2>Before you purchase</h2>
            <p>We ship worldwide. Shipping costs are confirmed at the time of inquiry or purchase. Pieces are professionally packed and insured for transit. Every piece leaves Marrakech in the condition described in its listing.</p>
          </div>
        </div>
      </div>
    </>
  )
}
