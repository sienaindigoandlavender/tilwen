export const metadata = {
  title: 'Returns',
  description: 'All sales at Tilwen are final. Every piece is one of a kind.',
}

export default function ReturnsPage() {
  return (
    <>
      <style>{`
        .returns-page { padding-bottom: var(--sp-32); }
        .returns-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .returns-body { padding: var(--sp-12) 0; max-width: 640px; }
        .returns-body h2 { font-family: var(--font-display); font-size: 1.375rem; font-weight: 400; letter-spacing: -0.015em; margin: var(--sp-8) 0 var(--sp-4); color: var(--black); }
        .returns-body h2:first-child { margin-top: 0; }
        .returns-body p { font-family: var(--font-body); font-size: 1rem; line-height: 1.75; color: var(--grey-600); margin-bottom: var(--sp-4); }
        .returns-body p strong { color: var(--black); font-weight: 500; }
        .returns-body a { border-bottom: 1px solid var(--grey-200); transition: border-color var(--t); }
        .returns-body a:hover { border-bottom-color: var(--black); }
        .returns-note { padding: var(--sp-6); border-left: 3px solid var(--black); background: var(--grey-100); margin: var(--sp-8) 0; }
        .returns-note p { margin-bottom: 0; color: var(--black); }
      `}</style>

      <div className="returns-page">
        <div className="returns-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Policy</p>
            <h1 className="t-display fade-up-1">Returns</h1>
          </div>
        </div>

        <div className="container">
          <div className="returns-body">
            <div className="returns-note">
              <p><strong>All sales are final.</strong> Every piece exists once. There is no other one.</p>
            </div>

            <h2>Why</h2>
            <p>A returned piece cannot be resold as new. It has passed through an additional set of hands, lived in another room, accumulated another chapter of history. That changes what it is. We do not accept that trade.</p>
            <p>The descriptions and photographs exist so that you know what you are acquiring before you acquire it. The symbolic reading, the spatial notes, the condition grade, the specific condition notes, the four photographs — these are not marketing. They are the information you need to make the decision. Use them.</p>

            <h2>Before you buy</h2>
            <p>If you have questions about condition, dimensions, palette under specific light, or anything visible in the photographs — <a href="/contact">contact us</a> before you buy. We respond within 24 hours. That conversation costs nothing and exists to prevent regret.</p>

            <h2>Transit damage</h2>
            <p>If a piece arrives damaged as a direct result of transit — not a condition issue that was present and documented before shipping, but damage caused by the shipping process — contact us within 48 hours of receipt with photographs. We will address it. This is the only exception.</p>

            <h2>Shipping</h2>
            <p>Every piece leaves Marrakech professionally packed, rolled not folded, and insured for transit. We treat each piece as what it is.</p>
          </div>
        </div>
      </div>
    </>
  )
}
