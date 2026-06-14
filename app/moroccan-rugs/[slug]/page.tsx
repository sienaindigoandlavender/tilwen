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
    alternates: { canonical: `https://tilwen.com/moroccan-rugs/${rug.slug}` },
    openGraph: { title: `${rug.given_name} — ${rug.cultural_name}`, description: `${rug.cultural_name} from the ${rug.region}.`, url: `https://tilwen.com/moroccan-rugs/${rug.slug}`, images: rug.images[0] ? [{ url: rug.images[0], alt: `${rug.given_name} — ${rug.cultural_name}` }] : [] },
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
    { name: 'Gallery', url: 'https://tilwen.com/moroccan-rugs' },
    { name: `${rug.given_name} — ${rug.cultural_name}`, url: `https://tilwen.com/moroccan-rugs/${rug.slug}` },
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

        .rp-identity { padding-bottom: 0; border-bottom: none; margin-bottom: var(--sp-6); }
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
        .rp-sku {
          font-family: var(--font-ui); font-size: 0.5625rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--grey-400); margin-top: var(--sp-3);
        }
        /* Dimensions — right under the title */
        .rp-dims {
          font-family: var(--font-ui); font-size: 0.75rem; letter-spacing: 0.03em;
          color: var(--grey-600); margin-top: var(--sp-3);
        }
        /* Price — the anchor */
        .rp-price {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 2.6vw, 2.5rem);
          font-weight: 400; letter-spacing: -0.01em; color: var(--black);
          padding-bottom: var(--sp-6); border-bottom: var(--border);
          margin-bottom: var(--sp-6);
        }
        .rp-price--sold { color: var(--grey-400); }
        /* Per-rug paragraph — the selling point (filled by hand per rug) */
        .rp-blurb {
          font-family: var(--font-body); font-size: 1rem; line-height: 1.65;
          color: var(--grey-800); margin-bottom: var(--sp-6);
        }
        /* Quiet utility links — all three identical */
        .rp-links {
          display: flex; gap: var(--sp-4); flex-wrap: wrap;
          margin-top: var(--sp-6);
        }
        .rp-links__item {
          font-family: var(--font-ui); font-size: 0.625rem; letter-spacing: 0.06em;
          color: var(--grey-600); text-decoration: none;
          border-bottom: 1px solid var(--grey-200); padding: 0;
          background: none; cursor: pointer; transition: color var(--t);
        }
        .rp-links__item:hover { color: var(--black); }

        /* ── Below: the scholarship, one comfortable reading column ── */
        .rp-body {
          max-width: 72ch;
          padding: var(--sp-6) 0 var(--sp-12);
        }

        /* Spec facts — compact, in the buy column under the price */
        .rp-facts {
          display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4) var(--sp-6);
          padding: var(--sp-6) 0; margin-bottom: var(--sp-6);
          border-bottom: var(--border);
        }
        .rp-facts__item { display: flex; flex-direction: column; gap: 0.25rem; }
        .rp-facts dt {
          font-family: var(--font-ui); font-size: 0.5rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400);
        }
        .rp-facts dd {
          font-family: var(--font-body); font-size: 0.9375rem; color: var(--grey-800);
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
                    {rug.technique_slug ? <Link href={`/moroccan-rugs?technique=${rug.technique_slug}`} className="rp-motif-link">{rug.technique}</Link> : rug.technique}
                  </p>
                )}
                <h1 className="rp-given">{rug.given_name}</h1>
                {rug.cultural_name !== rug.given_name && (
                  <p className="rp-cultural">{rug.cultural_name}</p>
                )}
              </div>

              {/* Price — the visual anchor of the column */}
              <p className={`rp-price${rug.availability_status === 'sold' ? ' rp-price--sold' : ''}`}>
                {rug.availability_status === 'sold' ? 'Sold' : `€${rug.price.toLocaleString()}`}
              </p>

              {/* Spec facts — the buyer's decision facts, all in the buy column */}
              <dl className="rp-facts">
                {rug.length_cm > 0 && (
                  <div className="rp-facts__item">
                    <dt>Size</dt>
                    <dd>{rug.length_cm} × {rug.width_cm} cm · {(rug.length_cm / 30.48).toFixed(1)} × {(rug.width_cm / 30.48).toFixed(1)} ft</dd>
                  </div>
                )}
                {rug.pile_height && (
                  <div className="rp-facts__item">
                    <dt>Pile</dt>
                    <dd>{rug.pile_height}</dd>
                  </div>
                )}
                {rug.age_period && (
                  <div className="rp-facts__item">
                    <dt>Age</dt>
                    <dd>{rug.age_period}</dd>
                  </div>
                )}
                <div className="rp-facts__item">
                  <dt>Material</dt>
                  <dd>{rug.material_primary || '100% wool'}</dd>
                </div>
                {rug.reference && (
                  <div className="rp-facts__item">
                    <dt>Reference</dt>
                    <dd>{rug.reference}</dd>
                  </div>
                )}
              </dl>

              {/* Per-rug paragraph — the real selling point. Written by hand per rug.
                  Renders only when provenance_note is filled; nothing until then. */}
              {rug.provenance_note && (
                <p className="rp-blurb">{rug.provenance_note}</p>
              )}

              {/* Buy */}
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

              {/* Quiet utility links — all three identical small size */}
              <div className="rp-links">
                <Link href="/care" className="rp-links__item">Care &amp; Shipping</Link>
                <Link href="/returns" className="rp-links__item">Returns</Link>
                <ShareLink title={`${rug.given_name} — Tilwen`} className="rp-links__item" />
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

              {/* Symbolic reading — only when written (no Shopify-description fallback) */}
              {rug.symbolic_reading && (
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
              )}

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
              {/* Care & Acquisition accordion removed — redundant with the
                  Care & Shipping / Returns links in the buy column. */}
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
                <Link href="/moroccan-rugs" className="t-ui" style={{ color: 'var(--grey-600)' }}>View all →</Link>
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
