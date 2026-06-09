'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    category: 'The Pieces',
    questions: [
      {
        q: 'Are all pieces genuinely one of a kind?',
        a: `Yes. Each piece is a unique vintage or antique object. There is no production run. There is no reorder. When it sells, it is gone — and the woman who made it, wherever she is now, made only this one.`,
      },
      {
        q: 'How do you source your pieces?',
        a: `Directly, where possible. Some come from families in weaving communities selling pieces that lived in their homes for generations. Others come through trusted contacts in the southern and central Moroccan market who understand what we are looking for. We do not buy through Marrakech tourist channels or wholesale export operations. We are honest about what "direct" means and what it doesn't — the provenance on each piece states what is known and stops there.`,
      },
      {
        q: 'How do you know where a rug is from?',
        a: `Sometimes exactly — a direct acquisition from the household that made it, with a clear account of its history. More often, it is a combination of visual analysis and market knowledge: the compositional vocabulary, the palette, the construction technique, where the piece was sourced and through whom. We say "acquired from a family in Ait Benhaddou" when that is what happened. We say "attributed to the High Atlas based on compositional characteristics" when that is what we mean. Both appear on this site, labelled for what they are.`,
      },
      {
        q: 'What does your condition grading mean?',
        a: `Four grades. Excellent: no damage, no wear, no restoration — rare in genuine vintage pieces. Very Good: minor wear consistent with careful use, unrestored. Good: moderate wear, possibly minor historical restoration, some colour change. Fair: significant wear or restoration — the piece appears here because something in it outweighs its physical condition. Every grade comes with specific condition notes saying exactly what is there and where. We do not grade optimistically.`,
      },
      {
        q: 'Have the pieces been washed or chemically treated?',
        a: `No. We do not wash, chemically treat, overdye, or restore pieces before sale. Almost everything sold through Marrakech export channels has been through an industrial washing process that strips lanolin, evens colour, and makes rugs photograph better. The pieces here arrive in the condition they were in when we acquired them — which is the condition described in the listing.`,
      },
      {
        q: 'What is the difference between natural and synthetic dye?',
        a: `Natural dyes — madder, saffron, henna, walnut, indigo — age toward depth. Madder deepens toward garnet. Indigo shifts toward teal. The colours mellow rather than flatten. Synthetic dyes, which arrived in Morocco in the late nineteenth century and became dominant by the mid-twentieth, tend to fade uniformly over time. Both are honest materials. The distinction matters to the long-term character of the piece.`,
      },
    ],
  },
  {
    category: 'Buying',
    questions: [
      {
        q: 'Can I return a piece?',
        a: `No. Every piece is described and photographed with enough specificity to make an informed decision. If you have questions before purchasing — about condition, dimensions, palette in different light — contact us. We respond within 24 hours. The one exception is transit damage: if a piece arrives damaged as a direct result of shipping, contact us within 48 hours with photographs.`,
      },
      {
        q: 'How do I know the piece will suit my space?',
        a: `Every description includes a spatial character section specific to that piece — how it reads in a room, what it requires to succeed, what it doesn't suit. These are not copied from a template. If you are still uncertain, contact us before you buy. We will talk through your space, your light, your furniture, and the piece in question.`,
      },
      {
        q: 'What payment methods do you accept?',
        a: `PayPal and major credit cards through secure checkout. All prices in EUR. PayPal handles currency conversion for buyers paying in other currencies.`,
      },
      {
        q: 'Can I reserve a piece?',
        a: `Contact us. If you need a short window to confirm dimensions, consult with someone, or arrange payment, we can discuss a brief hold. We do not hold pieces indefinitely.`,
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        q: 'Do you ship worldwide?',
        a: `Yes. Every piece ships from Marrakech, professionally packed and insured. Shipping costs are calculated at checkout. We use specialist textile shipping for larger or fragile pieces.`,
      },
      {
        q: 'How long does shipping take?',
        a: `Typically 5–10 business days to Europe, 7–14 to North America, 10–21 elsewhere. Customs clearance can add time. We provide tracking for every shipment.`,
      },
      {
        q: 'Are there import duties?',
        a: `Possibly, depending on your country. Import duties and customs fees are the buyer's responsibility and not included in shipping costs. European buyers: Moroccan goods may be subject to EU import VAT. Check your country's customs thresholds for textile goods before purchasing.`,
      },
      {
        q: 'How are the pieces packed?',
        a: `Rolled — never folded. Wrapped in acid-free tissue, covered, packed in rigid tubes or custom boxes. Folding creates permanent creases in vintage textiles. We treat each piece as what it is: an irreplaceable object.`,
      },
    ],
  },
  {
    category: 'Care',
    questions: [
      {
        q: 'How do I clean a flatweave kilim?',
        a: `Vacuum on low suction, suction side only, no beater bar, in the direction of the weft. Shake outdoors occasionally. Deep cleaning: take to a specialist with experience in natural-dye flatweaves — not a standard carpet cleaner. Do not wet-clean at home. Spills: blot immediately with a clean cloth, outside-in. Never rub.`,
      },
      {
        q: 'How do I care for a pile rug?',
        a: `Vacuum in the direction of the pile. Rotate 180° every 6–12 months to distribute wear and sun exposure. Keep out of sustained direct sunlight. Deep cleaning: specialist hand-wash only. New pile rugs shed for the first few months. This is normal and stops.`,
      },
      {
        q: 'Do I need a rug pad?',
        a: `Yes, on hard floors. Thin rubber mesh gripper for flatweaves; felt-and-rubber combination for pile rugs. Natural rubber is preferable to PVC — some synthetic rubber pads bond to certain floor finishes over time. A pad prevents migration and extends the rug's life.`,
      },
      {
        q: 'How do I store a rug?',
        a: `Roll lengthways, never fold. Store in a cool, dry place — not a damp basement, not a hot attic. Check periodically for moths, particularly in the first year. Natural wool in dark, undisturbed conditions is vulnerable. Movement and light are the best deterrents.`,
      },
    ],
  },
  {
    category: 'Trade & Designers',
    questions: [
      {
        q: 'Do you work with interior designers?',
        a: `Yes. Project-based sourcing, spatial character consultation, high-resolution photography for client presentations. Contact us with your brief.`,
      },
      {
        q: 'Do you offer trade pricing?',
        a: `Contact us. We evaluate trade relationships individually based on project type and context. We do not have a standard discount programme.`,
      },
      {
        q: 'Can you source a specific type of piece?',
        a: `Sometimes. If you are looking for a specific tradition, size, palette, or condition standard not currently in the gallery, contact us with the brief. We acquire pieces continuously and will reach out when something matching your criteria comes in. We do not promise availability on commission — we are not a made-to-order operation.`,
      },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)
  const toggle = (key: string) => setOpen(prev => prev === key ? null : key)

  return (
    <>
      <style>{`
        .faq-page { padding-bottom: var(--sp-32); }
        .faq-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .faq-header__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-16); align-items: end; }
        @media (max-width: 768px) { .faq-header__inner { grid-template-columns: 1fr; } }
        .faq-header__desc { font-family: var(--font-body); font-size: 1.0625rem; line-height: 1.75; color: var(--grey-600); max-width: 44ch; }
        .faq-body { padding: var(--sp-12) 0; }
        .faq-category { margin-bottom: var(--sp-12); }
        .faq-category__title { font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--grey-400); margin-bottom: var(--sp-4); padding-bottom: var(--sp-4); border-bottom: var(--border); }
        .faq-item { border-bottom: var(--border); }
        .faq-item__trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: var(--sp-8); padding: 1.25rem 0; background: none; border: none; cursor: pointer; text-align: left; }
        .faq-item__q { font-family: var(--font-display); font-size: 1.125rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.3; color: var(--grey-800); transition: color var(--t); }
        .faq-item__trigger:hover .faq-item__q,
        .faq-item__trigger--open .faq-item__q { color: var(--black); }
        .faq-item__icon { flex-shrink: 0; width: 20px; height: 20px; position: relative; color: var(--grey-400); transition: color var(--t); }
        .faq-item__trigger:hover .faq-item__icon { color: var(--black); }
        .faq-item__icon::before, .faq-item__icon::after { content: ''; position: absolute; background: currentColor; border-radius: 1px; transition: transform 280ms cubic-bezier(0.22,0.68,0,1.2), opacity 200ms ease; }
        .faq-item__icon::before { width: 12px; height: 1.5px; top: 9px; left: 4px; }
        .faq-item__icon::after  { width: 1.5px; height: 12px; top: 4px; left: 9px; }
        .faq-item__trigger--open .faq-item__icon::after { transform: rotate(90deg); opacity: 0; }
        .faq-item__panel { overflow: hidden; max-height: 0; transition: max-height 340ms cubic-bezier(0.22,0.68,0,1.2); }
        .faq-item__panel--open { max-height: 600px; }
        .faq-item__answer { padding: 0 var(--sp-8) var(--sp-6) 0; font-family: var(--font-body); font-size: 1rem; line-height: 1.8; color: var(--grey-600); max-width: 64ch; }
      `}</style>

      <div className="faq-page">
        <div className="faq-header">
          <div className="container">
            <div className="faq-header__inner">
              <div>
                <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Questions</p>
                <h1 className="t-display fade-up-1">FAQ</h1>
              </div>
              <p className="faq-header__desc fade-up-2">
                If what you need is not here, <Link href="/contact" style={{ borderBottom: '1px solid var(--grey-200)' }}>send us a note</Link>. We respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="faq-body">
            {FAQS.map(category => (
              <div key={category.category} className="faq-category">
                <p className="faq-category__title">{category.category}</p>
                {category.questions.map(item => {
                  const key = `${category.category}:${item.q}`
                  const isOpen = open === key
                  return (
                    <div key={key} className="faq-item">
                      <button
                        className={`faq-item__trigger${isOpen ? ' faq-item__trigger--open' : ''}`}
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-item__q">{item.q}</span>
                        <span className="faq-item__icon" aria-hidden="true" />
                      </button>
                      <div className={`faq-item__panel${isOpen ? ' faq-item__panel--open' : ''}`}>
                        <p className="faq-item__answer">{item.a}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
