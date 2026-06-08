'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    category: 'The Pieces',
    questions: [
      {
        q: 'Are all pieces genuinely one of a kind?',
        a: `Yes. Every piece in the gallery is a unique vintage or antique object. There is no production run, no reorder, no replica. When a piece sells, it is gone. This is not a marketing claim — it is the material reality of what vintage Amazigh weaving is.`,
      },
      {
        q: 'How do you source your pieces?',
        a: `Directly, where possible. Some pieces come from families in weaving communities who are selling pieces that have been in domestic use for generations. Others come from trusted contacts in the southern and central Moroccan market who understand what we are looking for. We do not buy from Marrakech tourist channels or from wholesale export operations. Every piece is acquired with its provenance documented to the extent the evidence allows.`,
      },
      {
        q: 'How do you know where a rug is from?',
        a: `Sometimes we know exactly — a direct acquisition from the household that made it, with a clear account of its history. More often, attribution is a combination of visual analysis (compositional vocabulary, palette, construction technique) and market knowledge (where the piece was sourced, from whom, through which channel). We are specific about the certainty of each attribution. "Acquired from a family in Ait Benhaddou" means something different from "attributed to the High Atlas based on compositional characteristics." Both appear in our piece descriptions, labelled honestly.`,
      },
      {
        q: 'What does your condition grading mean in practice?',
        a: `Four grades: Excellent (no damage, no wear, no restoration — rare in genuine vintage pieces), Very Good (minor wear consistent with careful domestic use, no restoration), Good (moderate wear, possibly minor historical restoration, dyes may show some fading), Fair (significant wear or restoration — exceptional in patterning or rarity despite condition). The grade is always accompanied by specific condition notes describing exactly what is present and where. We do not grade optimistically.`,
      },
      {
        q: 'Have the pieces been washed or chemically treated?',
        a: `No. We do not wash, chemically treat, overdye, or restore pieces before sale. If a piece has been treated at any point in its history — something we assess at acquisition — that is documented in the condition notes. The standard in commercial rug retail is to wash everything before sale. We do not follow that standard.`,
      },
      {
        q: 'What is the difference between a natural dye and a synthetic dye piece?',
        a: `Natural dyes — saffron, madder, henna, walnut, indigo — age differently from synthetic dyes. They mellow rather than fade uniformly, developing a depth over decades that synthetic dyes cannot replicate. A natural dye piece from the 1950s looks materially different from a synthetic dye piece from the same period. Both are documented in our specifications. The distinction matters to value, longevity, and the character of what you are acquiring.`,
      },
    ],
  },
  {
    category: 'Buying',
    questions: [
      {
        q: 'Can I return a piece?',
        a: `No. All sales are final. Every piece is described and photographed with the specificity that allows you to make an informed decision before purchasing. If you have questions about condition, dimensions, or anything visible in the photographs, contact us before you buy. The one exception is transit damage — if a piece arrives damaged as a direct result of shipping, contact us within 48 hours with photographs.`,
      },
      {
        q: 'How do I know the piece will suit my space?',
        a: `Every piece description includes a spatial character section: how the rug reads in a room, what conditions it requires to succeed, what it doesn't suit. These are written specifically for each piece, not copied from a template. If you are still uncertain — about light conditions, furniture scale, palette relationships — contact us. We will discuss your space and the piece in detail before you commit.`,
      },
      {
        q: 'What payment methods do you accept?',
        a: `We accept PayPal and major credit cards through our secure checkout. All prices are in EUR. PayPal handles currency conversion for buyers paying in other currencies.`,
      },
      {
        q: 'Can I reserve a piece?',
        a: `Contact us. If a piece is available and you need a short window to decide — a few days to confirm dimensions, consult with a designer, or arrange payment — we can discuss a short hold. We do not hold pieces indefinitely or without communication.`,
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        q: 'Do you ship worldwide?',
        a: `Yes. Every piece ships from Marrakech, professionally packed and insured for transit. Shipping costs are calculated at checkout based on destination and piece dimensions. We use specialist art and textile shipping where appropriate for larger or more fragile pieces.`,
      },
      {
        q: 'How long does shipping take?',
        a: `Typically 5–10 business days to Europe, 7–14 to North America, and 10–21 to the rest of the world. Customs clearance can add time in some destinations. We provide tracking for every shipment and notify you when the piece leaves Marrakech.`,
      },
      {
        q: 'Are there import duties or customs fees?',
        a: `Possibly, depending on your country. Import duties and customs fees are the buyer's responsibility and are not included in the shipping cost. European buyers: Moroccan goods may be subject to EU import VAT. We recommend checking your country's customs thresholds for textile goods before purchasing.`,
      },
      {
        q: 'How are the pieces packed?',
        a: `Rugs are rolled (never folded), wrapped in acid-free tissue, covered in protective material, and packed in rigid tubes or custom boxes depending on size. Fragile vintage pieces with structural considerations are assessed individually and packed accordingly. We treat every piece as what it is — an irreplaceable object.`,
      },
    ],
  },
  {
    category: 'Care',
    questions: [
      {
        q: 'How do I clean a flatweave kilim?',
        a: `Regular maintenance: vacuum on low suction, suction side only, no beater bar, in the direction of the weft. Shake outdoors occasionally. For deeper cleaning, take to a specialist with experience in natural-dye flatweaves — not a standard carpet cleaner. Do not wet-clean at home. For spills: blot immediately with a clean cloth, working from the outside in. Never rub.`,
      },
      {
        q: 'How do I care for a pile-knotted rug?',
        a: `Vacuum in the direction of the pile, not against it. Rotate the rug 180° every 6–12 months to distribute wear and sun exposure evenly. Keep out of direct sustained sunlight. For deep cleaning, specialist hand-wash only — not machine wash, not steam clean. New pile rugs may shed for the first few months; this is normal and diminishes with use.`,
      },
      {
        q: 'Do I need a rug pad?',
        a: `Yes, on hard floors. A thin rubber mesh gripper for flatweaves; a felt-and-rubber combination pad for pile rugs. Natural rubber is preferable to PVC — some synthetic rubber pads can bond to certain floor finishes over time. A pad prevents migration, protects the floor, and extends the rug's working life.`,
      },
      {
        q: 'How do I store a rug?',
        a: `Roll lengthways, never fold. Folding creates permanent creases in vintage textiles. Store in a cool, dry environment — not a damp basement, not a hot attic. Check periodically for moths, particularly in the first year of storage. Natural wool in dark, undisturbed conditions is vulnerable; movement and light are the best deterrents.`,
      },
    ],
  },
  {
    category: 'Trade & Designers',
    questions: [
      {
        q: 'Do you work with interior designers and architects?',
        a: `Yes. We work with designers and architects on a project basis — sourcing specific pieces for specific spaces, discussing spatial character and palette requirements, and providing accurate dimensions and high-resolution photography for client presentations. Contact us with your project brief.`,
      },
      {
        q: 'Do you offer trade pricing?',
        a: `Contact us to discuss. Trade relationships are evaluated individually based on project type and volume. We do not have a standard discount programme — we prefer to have a specific conversation about what you need.`,
      },
      {
        q: 'Can you source a specific type of piece?',
        a: `Sometimes. If you are looking for a specific tradition, size, palette, or condition standard that is not currently in the gallery, contact us with the brief. We acquire pieces continuously and can communicate when something matching your criteria comes in. We do not guarantee availability on commission — we are not a made-to-order operation — but targeted sourcing for serious buyers is something we do.`,
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
        .faq-header__inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: var(--sp-16); align-items: end;
        }
        @media (max-width: 768px) { .faq-header__inner { grid-template-columns: 1fr; } }
        .faq-header__desc {
          font-family: var(--font-body); font-size: 1.0625rem;
          line-height: 1.75; color: var(--grey-600); max-width: 44ch;
        }

        /* Body */
        .faq-body { padding: var(--sp-12) 0; }
        .faq-category { margin-bottom: var(--sp-12); }
        .faq-category__title {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--grey-400);
          margin-bottom: var(--sp-4);
          padding-bottom: var(--sp-4);
          border-bottom: var(--border);
        }

        /* Accordion item */
        .faq-item { border-bottom: var(--border); }
        .faq-item__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-8);
          padding: var(--sp-5, 1.25rem) 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: color var(--t);
        }
        .faq-item__trigger:hover .faq-item__q { color: var(--black); }
        .faq-item__q {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: var(--grey-800);
          transition: color var(--t);
        }
        .faq-item__trigger--open .faq-item__q { color: var(--black); }
        .faq-item__icon {
          flex-shrink: 0;
          width: 20px; height: 20px;
          position: relative;
          color: var(--grey-400);
          transition: color var(--t);
        }
        .faq-item__trigger:hover .faq-item__icon { color: var(--black); }
        .faq-item__icon::before,
        .faq-item__icon::after {
          content: '';
          position: absolute;
          background: currentColor;
          border-radius: 1px;
          transition: transform 280ms cubic-bezier(0.22,0.68,0,1.2), opacity 200ms ease;
        }
        .faq-item__icon::before { width: 12px; height: 1.5px; top: 9px; left: 4px; }
        .faq-item__icon::after  { width: 1.5px; height: 12px; top: 4px; left: 9px; }
        .faq-item__trigger--open .faq-item__icon::after { transform: rotate(90deg); opacity: 0; }

        /* Answer panel */
        .faq-item__panel {
          overflow: hidden;
          max-height: 0;
          transition: max-height 340ms cubic-bezier(0.22,0.68,0,1.2);
        }
        .faq-item__panel--open { max-height: 600px; }
        .faq-item__answer {
          padding: 0 var(--sp-8) var(--sp-6) 0;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.8;
          color: var(--grey-600);
          max-width: 64ch;
        }
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
                If the answer you need is not here, <Link href="/contact" style={{ borderBottom: '1px solid var(--grey-200)' }}>contact us</Link>. We respond within 24 hours.
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
