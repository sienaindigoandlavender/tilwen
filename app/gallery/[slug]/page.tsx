import { notFound } from 'next/navigation'
import { rugProductJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import AddToCartButton from '@/components/gallery/AddToCartButton'
import ProductCarousel from '@/components/gallery/ProductCarousel'
import ShareLink from '@/components/gallery/ShareLink'
import Accordion from '@/components/gallery/Accordion'
import Link from 'next/link'
import { getAllRugsSafe, getRugBySlugLive, getRelatedRugsFrom } from '@/lib/rug-source'
import RugCard from '@/components/gallery/RugCard'

export const revalidate = 600
export const dynamicParams = true

export async function generateStaticParams() {
  const rugs = await getAllRugsSafe()
  return rugs.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const rug = await getRugBySlugLive(params.slug).catch(() => undefined)
  if (!rug) return {}
  return {
    title: `${rug.given_name} — ${rug.cultural_name}`,
    description: `${rug.cultural_name} from the ${rug.region}. ${rug.technique}. One of a kind, fully documented. Available from Tilwen.`,
    alternates: { canonical: `https://tilwen.com/gallery/${rug.slug}` },
    openGraph: { title: `${rug.given_name} — ${rug.cultural_name}`, description: `${rug.cultural_name} from the ${rug.region}.`, url: `https://tilwen.com/gallery/${rug.slug}`, images: rug.images[0] ? [{ url: rug.images[0], alt: `${rug.given_name} — ${rug.cultural_name}` }] : [] },
  }
}

export default async function RugPage({ params }: { params: { slug: string } }) {
  const all = await getAllRugsSafe()
  const rug = all.find(r => r.slug === params.slug)
  if (!rug) notFound()

  const related = getRelatedRugsFrom(rug, all)
  const hero = rug.images[0] || 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=1400&q=80'

  const productLd = rugProductJsonLd(rug)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Gallery', url: 'https://tilwen.com/gallery' },
    { name: `${rug.given_name} — ${rug.cultural_name}`, url: `https://tilwen.com/gallery/${rug.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <style>{`
        .rp { padding-bottom: var(--sp-32); background: #ffffff; min-height: 100vh; }

        /* ── Top: image stack left, sticky identity + acquisition right ── */
        .rp-top {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
          gap: var(--sp-12);
          padding-top: var(--sp-8);
          align-items: start;
        }
        @media (max-width: 900px) { .rp-top { grid-template-columns: 1fr; gap: var(--sp-8); } }

        .rp-info { position: sticky; top: 104px; }
        @media (max-width: 900px) { .rp-info { position: static; } }

        .rp-identity { padding-bottom: var(--sp-6); border-bottom: var(--border); margin-bottom: var(--sp-6); }
        .rp-auth {
          margin-top: var(--sp-4);
          font-family: var(--font-body); font-size: 0.9375rem; font-style: italic;
          line-height: 1.6; color: var(--grey-600);
        }
        .rp-given {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 3.25rem);
          font-weight: 300; letter-spacing: -0.02em; line-height: 1.02;
          margin-top: var(--sp-2);
        }
        .rp-cultural {
          font-family: var(--font-body);
          font-size: 1.0625rem; font-style: italic;
          color: var(--grey-600); margin-top: var(--sp-2);
        }
        .rp-tags { display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-top: var(--sp-4); }
        .rp-tag {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.3rem 0; color: var(--grey-600);
          transition: all var(--t);
        }
        .rp-tag:hover { border-color: var(--black); color: var(--black); }

        /* ── Below: the scholarship, one comfortable reading column ── */
        .rp-body {
          max-width: 72ch;
          padding: var(--sp-6) 0 var(--sp-12);
        }

        /* Left column sections */
        .rp-section { padding: var(--sp-8) 0; border-bottom: var(--border); }
        .rp-section:last-child { border-bottom: none; }
        .rp-section-title {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400);
          margin-bottom: var(--sp-4);
        }

        /* Specifications table */
        .rp-specs { width: 100%; border-collapse: collapse; }
        .rp-specs tr { border-bottom: var(--border); }
        .rp-specs tr:last-child { border-bottom: none; }
        .rp-specs td {
          padding: 0.625rem 0; vertical-align: top;
          font-family: var(--font-ui); font-size: 0.8125rem;
        }
        .rp-specs td:first-child {
          color: var(--grey-600); width: 140px; letter-spacing: 0.02em;
          padding-right: var(--sp-4); font-size: 0.75rem;
        }
        .rp-specs td:last-child { color: var(--black); }

        /* Spatial sub-sections */
        .rp-spatial-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-6);
        }
        @media (max-width: 600px) { .rp-spatial-grid { grid-template-columns: 1fr; } }
        .rp-spatial-item {}
        .rp-spatial-item-label {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey-400);
          margin-bottom: var(--sp-2); display: block;
        }
        .rp-spatial-item p {
          font-family: var(--font-body); font-size: 0.9375rem;
          line-height: 1.65; color: var(--black);
        }
        .rp-spatial-item--full { grid-column: 1 / -1; }
        .rp-spatial-item--doesnt p { color: var(--grey-800); font-style: italic; }

        /* Motif links */
        .rp-motifs { display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-top: var(--sp-4); }
        .rp-motif-link {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          border-bottom: 1px solid var(--grey-200);
          padding-bottom: 1px; color: var(--black); transition: all var(--t);
        }
        .rp-motif-link:hover { color: var(--black); border-bottom-color: var(--black); }

        /* Right column — acquisition */
        .rp-acq {
          /* No enclosing box — sits on white, separated by space (Revival register) */
        }
        .rp-acq__status { margin-bottom: var(--sp-4); }
        .rp-acq__price-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: var(--sp-4); border-bottom: var(--border); margin-bottom: var(--sp-4);
        }
        .rp-acq__price-main {
          font-family: var(--font-display); font-size: 2.25rem; font-weight: 300; letter-spacing: -0.02em;
        }
        .rp-acq__dims { font-family: var(--font-ui); font-size: 0.75rem; color: var(--grey-800); }
        .rp-glance {
          display: flex; flex-wrap: wrap; align-items: flex-start;
          gap: var(--sp-6) var(--sp-8);
          margin-top: var(--sp-6); padding-top: var(--sp-6);
          border-top: var(--border);
        }
        .rp-glance__item {
          display: flex; flex-direction: column; align-items: flex-start; gap: 0.4rem;
          font-family: var(--font-ui); font-size: 0.5625rem;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-800);
          max-width: 5.5rem; line-height: 1.4;
        }
        .rp-glance__icon { width: 22px; height: 22px; color: var(--grey-600); }
        .rp-acq__note {
          font-family: var(--font-body); font-size: 0.875rem; line-height: 1.6;
          color: var(--grey-800); font-style: italic; margin: var(--sp-4) 0;
        }
        .rp-acq__cta { width: 100%; display: flex; justify-content: center; }
        .rp-trust {
          margin-top: var(--sp-6); padding-top: var(--sp-6); border-top: var(--border);
        }
        .rp-trust-row {
          display: flex; gap: var(--sp-4); padding: var(--sp-2) 0;
        }
        .rp-trust-icon { color: var(--grey-600); font-size: 0.75rem; min-width: 12px; }
        .rp-trust-text { font-family: var(--font-ui); font-size: 0.6875rem; color: var(--grey-800); line-height: 1.4; }

        /* Related */
        .rp-related { padding: var(--sp-16) 0 0; border-top: var(--border); }
        .rp-related__header {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: var(--sp-8);
        }
        .rp-related__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-6); }
        @media (max-width: 768px) { .rp-related__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .rp-related__grid { grid-template-columns: 1fr; } }

        /* Knowledge */
        .rp-knowledge { padding: var(--sp-12) 0; border-top: var(--border); }
        .rp-knowledge__grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-6); margin-top: var(--sp-6); }
        @media (max-width: 768px) { .rp-knowledge__grid { grid-template-columns: 1fr; } }
        .rp-knowledge-item {
          padding: var(--sp-6) var(--sp-6) var(--sp-6) 0; display: block; transition: opacity var(--t);
        }
        .rp-knowledge-item:hover { opacity: 0.6; }
        .rp-knowledge-item__type { display: block; margin-bottom: var(--sp-2); }
        .rp-knowledge-item__name {
          font-family: var(--font-display); font-size: 1.125rem; font-weight: 400;
        }
        .rp-knowledge-item__hint {
          font-family: var(--font-body); font-size: 0.8125rem;
          color: var(--grey-800); margin-top: 0.25rem; font-style: italic;
        }
      `}</style>

      <div className="rp">
        {/* ── Top: images left, sticky identity + acquisition right ── */}
        <div className="container">
          <div className="rp-top">

            {/* Image carousel — full rug always visible, no cropping */}
            <ProductCarousel
              images={rug.images.length ? rug.images : [hero]}
              name={rug.given_name}
              culturalName={rug.cultural_name}
            />

            {/* Sticky info column */}
            <div className="rp-info">
              <div className="rp-identity">
                {(rug.region || rug.technique) && (
                  <p className="t-label">
                    {rug.region_slug ? <Link href={`/regions/${rug.region_slug}`} className="rp-motif-link">{rug.region}</Link> : rug.region}
                    {rug.region && rug.technique ? ' · ' : ''}
                    {rug.technique_slug ? <Link href={`/gallery?technique=${rug.technique_slug}`} className="rp-motif-link">{rug.technique}</Link> : rug.technique}
                  </p>
                )}
                <h1 className="rp-given">{rug.given_name}</h1>
                {rug.cultural_name !== rug.given_name && (
                  <p className="rp-cultural">{rug.cultural_name}{rug.reference ? ` · ${rug.reference}` : ''}</p>
                )}
                <p className="rp-auth">
                  {rug.age_class === 'vintage' || rug.age_class === 'antique'
                    ? 'A genuine vintage piece, sourced in Morocco. Not a reproduction, not factory-woven — one of a kind, and once it is gone it cannot be remade.'
                    : 'Genuinely handwoven in Morocco on a traditional loom. One of a kind — not factory-produced, and once it is gone it cannot be remade.'}
                </p>
                {rug.atmosphere_tags.length > 0 && (
                  <div className="rp-tags">
                    {rug.atmosphere_tags.map(t => (
                      <span key={t} className="rp-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="rp-acq">
                <div className="rp-acq__status">
                  <span className={`avail avail--${rug.availability_status}`}>
                    {rug.availability_status === 'available' ? 'Available' : rug.availability_status === 'reserved' ? 'Reserved' : 'Sold'}
                  </span>
                </div>
                <div className="rp-acq__price-row">
                  <span className="rp-acq__price-main">€{rug.price.toLocaleString()}</span>
                  {rug.length_cm > 0 && <span className="rp-acq__dims">{rug.length_cm} × {rug.width_cm} cm{rug.length_cm > 0 ? ` · ${(rug.length_cm / 30.48).toFixed(1)} × ${(rug.width_cm / 30.48).toFixed(1)} ft` : ''}</span>}
                </div>
                {/* At-a-glance reassurance — thin-line icons, Tilwen's visual language */}
                <div className="rp-glance">
                  <span className="rp-glance__item">
                    <svg className="rp-glance__icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M3 8.5l8-4 8 4-8 4-8-4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                      <path d="M3 8.5v5l8 4 8-4v-5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                      <path d="M11 12.5v5" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                    One of a kind
                  </span>
                  <span className="rp-glance__item">
                    <svg className="rp-glance__icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M11 4c-2.5 0-3.5 1.8-3.5 3.5 0 1.2-1 1.5-1.5 2.5-.6 1.2 0 2.6 1 3.2.5.3.5 1 .3 1.7-.3.9.3 1.9 1.4 2 .9.1 1.3.7 1.8 1.4.5-.7.9-1.3 1.8-1.4 1.1-.1 1.7-1.1 1.4-2-.2-.7-.2-1.4.3-1.7 1-.6 1.6-2 1-3.2-.5-1-1.5-1.3-1.5-2.5C14.5 5.8 13.5 4 11 4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                    {rug.material_primary || '100% wool'}
                  </span>
                  <span className="rp-glance__item">
                    <svg className="rp-glance__icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M2 9h9v6H3.5L2 13.5V9Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                      <path d="M11 7h4.5l3.5 3.5V15H11V7Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                      <circle cx="6" cy="15.5" r="1.6" stroke="currentColor" strokeWidth="1"/>
                      <circle cx="15" cy="15.5" r="1.6" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                    Ships from Marrakech
                  </span>
                </div>
                <p className="rp-acq__note">{rug.acquisition_note}</p>
                {rug.availability_status === 'available' && (
                  <div className="rp-acq__cta">
                    {rug.shopify_variant_id ? (
                      <AddToCartButton variantId={rug.shopify_variant_id} name={rug.given_name} />
                    ) : (
                      <Link href={`/inquire?piece=${rug.slug}&name=${encodeURIComponent(rug.given_name)}`} className="btn btn--primary" style={{ width: '100%' }}>
                        Inquire about this piece
                      </Link>
                    )}
                  </div>
                )}
                {rug.availability_status === 'reserved' && (
                  <div className="rp-acq__cta">
                    <Link href="/inquire" className="btn btn--ghost" style={{ width: '100%' }}>
                      Join waitlist
                    </Link>
                  </div>
                )}
              </div>
              <div className="rp-trust">
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">One of a kind. When it is gone, it is gone</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">Ships worldwide from Marrakech</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">All sales are final. Transit damage covered within 48 hours of receipt</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">Condition guaranteed as described</span>
                </div>
                <div style={{ marginTop: 'var(--sp-4)', display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
                  <Link href="/care" className="t-ui-xs" style={{ color: 'var(--grey-600)', borderBottom: '1px solid var(--grey-200)' }}>Care & Shipping</Link>
                  <Link href="/returns" className="t-ui-xs" style={{ color: 'var(--grey-600)', borderBottom: '1px solid var(--grey-200)' }}>Returns</Link>
                  <ShareLink title={`${rug.given_name} — Tilwen`} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Below: the scholarship ── */}
        <div className="container">
          <div className="rp-body">
            <div>
              {/* Provenance */}
              {(rug.provenance_note || rug.selection_voice) && (
                <Accordion title="Provenance">
                  {rug.provenance_note && <p className="t-body">{rug.provenance_note}</p>}
                  {rug.selection_voice && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontStyle: 'italic', color: 'var(--grey-600)', marginTop: 'var(--sp-4)', lineHeight: 1.6 }}>
                      {rug.selection_voice}
                    </p>
                  )}
                </Accordion>
              )}

              {/* Specifications */}
              <Accordion title="Specifications" defaultOpen>
                <table className="rp-specs">
                  <tbody>
                    <tr><td>Region</td><td>{rug.region_slug ? <Link href={`/regions/${rug.region_slug}`} className="rp-motif-link">{rug.region}</Link> : (rug.region || 'Not determined')}</td></tr>
                    <tr><td>Community</td><td>{rug.community_tribe || 'Not determined'}</td></tr>
                    <tr><td>Material</td><td>{rug.material_primary || 'Wool — see description'}</td></tr>
                    <tr><td>Technique</td><td>{rug.technique_slug ? <Link href={`/glossary/${rug.technique_slug === 'flatweave-kilim' ? 'kilim' : rug.technique_slug}`} className="rp-motif-link">{rug.technique}</Link> : (rug.technique || 'Not determined')}</td></tr>
                    <tr><td>Age</td><td>{rug.age_period || 'Not determined'}{rug.age_class === 'vintage' && <Link href="/glossary/vintage" className="rp-motif-link" style={{fontSize:'0.625rem',marginLeft:'0.5rem'}}>→ vintage</Link>}</td></tr>
                    <tr><td>Dimensions</td><td>{rug.length_cm > 0 ? `${rug.length_cm} × ${rug.width_cm} cm · ${(rug.length_cm / 30.48).toFixed(1)} × ${(rug.width_cm / 30.48).toFixed(1)} ft` : 'See description'}</td></tr>
                    <tr><td>Pile</td><td><Link href="/glossary/pile-height" className="rp-motif-link">{rug.pile_height}</Link></td></tr>
                    <tr><td>Condition</td><td><Link href="/glossary/condition-grades" className="rp-motif-link">{rug.condition}</Link>{rug.condition_notes ? `. ${rug.condition_notes}` : ''}</td></tr>
                    <tr><td>Dyes</td><td>{rug.dye_type ? <Link href={`/glossary/${rug.dye_type.toLowerCase().startsWith('natural') ? 'natural-dye' : 'synthetic-dye'}`} className="rp-motif-link">{rug.dye_type}</Link> : 'Not determined'}</td></tr>
                  </tbody>
                </table>
              </Accordion>

              {/* Symbolic reading — falls back to the museum description from Shopify */}
              {rug.symbolic_reading ? (
                <Accordion title="Symbolic Reading" defaultOpen={!rug.provenance_note}>
                  <div className="prose">
                    {rug.symbolic_reading.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  {rug.motifs.length > 0 && (
                    <div className="rp-motifs">
                      {rug.motifs.map((m, i) => (
                        <Link key={i} href={`/motifs/${rug.motif_slugs[i]}`} className="rp-motif-link">
                          {m} →
                        </Link>
                      ))}
                    </div>
                  )}
                </Accordion>
              ) : rug.description_html ? (
                <Accordion title="The Piece" defaultOpen>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: rug.description_html }} />
                </Accordion>
              ) : null}

              {/* Spatial — only when written */}
              {(rug.spatial_atmosphere || rug.spatial_room_affinities || rug.spatial_requirements || rug.spatial_doesnt_suit) && (
              <Accordion title="How It Behaves in Space">
                <div className="rp-spatial-grid">
                  {rug.spatial_atmosphere && (
                  <div className="rp-spatial-item rp-spatial-item--full">
                    <span className="rp-spatial-item-label">Atmosphere</span>
                    <p>{rug.spatial_atmosphere}</p>
                  </div>
                  )}
                  {rug.spatial_room_affinities && (
                  <div className="rp-spatial-item">
                    <span className="rp-spatial-item-label">Room Affinities</span>
                    <p>{rug.spatial_room_affinities}</p>
                  </div>
                  )}
                  {rug.spatial_requirements && (
                  <div className="rp-spatial-item">
                    <span className="rp-spatial-item-label">Requirements</span>
                    <p>{rug.spatial_requirements}</p>
                  </div>
                  )}
                  {rug.spatial_doesnt_suit && (
                  <div className="rp-spatial-item rp-spatial-item--full rp-spatial-item--doesnt">
                    <span className="rp-spatial-item-label">Doesn't Suit</span>
                    <p>{rug.spatial_doesnt_suit}</p>
                  </div>
                  )}
                  {rug.interior_archetypes && (
                    <div className="rp-spatial-item rp-spatial-item--full">
                      <span className="rp-spatial-item-label">Interior Archetypes</span>
                      <p>{rug.interior_archetypes}</p>
                    </div>
                  )}
                </div>
              </Accordion>
              )}

              {/* Care — static, applies to all natural-wool pieces */}
              <Accordion title="Care & Acquisition">
                <div className="prose">
                  <p>Vacuum gently and without a beater bar. Rotate periodically for even wear. Address spills immediately by blotting, never rubbing. Professional cleaning only — these are natural-dye wool pieces and should never be machine washed. A natural wool rug ages into its character; minor shedding in the first months is normal.</p>
                  <p>This is a one-of-a-kind piece. Once sold, it cannot be replicated. All sales are final; transit damage is covered within 48 hours of receipt. We ship worldwide from Marrakech, with costs confirmed at checkout or inquiry.</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
                  <Link href="/care" className="rp-motif-link">Full care &amp; shipping →</Link>
                  <Link href="/returns" className="rp-motif-link">Returns →</Link>
                </div>
              </Accordion>
            </div>

          </div>
        </div>

        {/* Related knowledge */}
        {(rug.region_slug || rug.motifs.length > 0) && (
        <div className="container">
          <div className="rp-knowledge">
            <span className="t-label">Related Knowledge</span>
            <div className="rp-knowledge__grid">
              {rug.region_slug && (
              <Link href={`/regions/${rug.region_slug}`} className="rp-knowledge-item">
                <span className="t-label rp-knowledge-item__type">Region</span>
                <p className="rp-knowledge-item__name">{rug.region}</p>
                <p className="rp-knowledge-item__hint">Visual grammar, technique traditions, historical context →</p>
              </Link>
              )}
              {rug.motifs.slice(0, 2).map((m, i) => (
                <Link key={i} href={`/motifs/${rug.motif_slugs[i]}`} className="rp-knowledge-item">
                  <span className="t-label rp-knowledge-item__type">Motif</span>
                  <p className="rp-knowledge-item__name">{m}</p>
                  <p className="rp-knowledge-item__hint">Symbolic reading and cultural grammar →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Related rugs */}
        {related.length > 0 && (
          <div className="container">
            <div className="rp-related">
              <div className="rp-related__header">
                <span className="t-label">Related Pieces</span>
                <Link href="/gallery" className="t-ui" style={{ color: 'var(--grey-600)' }}>View all →</Link>
              </div>
              <div className="rp-related__grid">
                {related.map(({ rug: r, label }) => (
                  <RugCard key={r.slug} rug={r} label={label} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
