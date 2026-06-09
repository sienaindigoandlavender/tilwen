export const metadata = {
  title: 'Care & Shipping',
  description: 'How to care for a Moroccan or Amazigh rug. How we ship.',
}

export default function CarePage() {
  return (
    <>
      <style>{`
        .care-page { padding-bottom: var(--sp-32); }
        .care-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .care-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-24);
          padding: var(--sp-12) 0;
          align-items: start;
        }
        @media (max-width: 768px) { .care-body { grid-template-columns: 1fr; } }
        .care-section h2 { font-family: var(--font-display); font-size: 1.375rem; font-weight: 400; letter-spacing: -0.015em; margin: 0 0 var(--sp-6); color: var(--black); }
        .care-section p { font-family: var(--font-body); font-size: 1rem; line-height: 1.75; color: var(--grey-600); margin-bottom: var(--sp-4); }
        .care-section p:last-child { margin-bottom: 0; }
        .care-section h3 { font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--black); margin: var(--sp-8) 0 var(--sp-3); }
        .care-section h3:first-of-type { margin-top: 0; }
      `}</style>

      <div className="care-page">
        <div className="care-header">
          <div className="container">
            <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Care & Shipping</p>
            <h1 className="t-display fade-up-1">Looking after it</h1>
          </div>
        </div>

        <div className="container">
          <div className="care-body">
            <div className="care-section">
              <h2>Flatweave kilims</h2>

              <h3>Daily</h3>
              <p>Vacuum on low suction, suction side only. No beater bar. In the direction of the weft — lengthways. Shake outdoors occasionally. These are tough textiles made to be lived on.</p>

              <h3>Spills</h3>
              <p>Blot immediately with a clean cloth, working from the outside edge toward the centre. Never rub — rubbing spreads the stain and works it into the weave. Cold water for most spills. No harsh detergent.</p>

              <h3>Deep cleaning</h3>
              <p>Take it to a specialist with experience in natural-dye flatweaves. Not a standard carpet cleaner — their processes are calibrated for synthetic pile, not Amazigh wool. Do not wet-clean at home.</p>

              <h3>Storage</h3>
              <p>Roll lengthways, never fold. Folding creates permanent creases in vintage textiles. Store in a cool, dry space. Check periodically for moths — natural wool in dark, undisturbed conditions is vulnerable.</p>

              <h3>Underfoot</h3>
              <p>A thin rubber mesh gripper on hard floors. It prevents migration, protects the floor, and extends the rug's working life. Natural rubber is preferable to PVC.</p>
            </div>

            <div className="care-section">
              <h2>Pile rugs</h2>

              <h3>Daily</h3>
              <p>Vacuum in the direction of the pile — with the nap, not against it. Rotate 180° every six to twelve months to distribute wear and sun exposure. New pile rugs shed for the first few months. This is normal and stops.</p>

              <h3>Sunlight</h3>
              <p>Keep out of sustained direct sunlight. Natural dyes — madder, indigo, saffron — are relatively stable, but prolonged UV exposure shifts any dye over time. Rotate to even exposure rather than leaving one side in permanent light.</p>

              <h3>Deep cleaning</h3>
              <p>Specialist hand-wash only. Not machine wash. Not steam clean. The chemicals and mechanical action of commercial cleaning processes strip lanolin, flatten pile, and alter the character of the piece. Once lanolin is gone, it does not come back.</p>

              <h3>Storage</h3>
              <p>Same as flatweave: roll, never fold. Wrap in breathable cloth — not plastic. Check for moths. Pheromone moth traps in storage areas are worthwhile insurance.</p>

              <h3>Underfoot</h3>
              <p>A felt-and-rubber combination pad. The felt cushions the pile and protects the floor; the rubber anchors it. Do not use a pad that is larger than the rug — the exposed edges catch and curl.</p>

              <h2 style={{ marginTop: 'var(--sp-12)' }}>Shipping</h2>
              <p>Every piece ships from Marrakech, rolled and wrapped in acid-free tissue, packed in rigid tubes or custom boxes depending on size. Professionally packed and insured for the full declared value.</p>
              <p>Flatweaves and lighter pile rugs ship via DHL or FedEx Express. Larger or more fragile pieces go through specialist art and textile freight. We confirm the method and cost before shipping.</p>
              <p>We provide tracking for every shipment and notify you when the piece leaves Marrakech. Typical transit times: 5–10 business days to Europe, 7–14 to North America.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
