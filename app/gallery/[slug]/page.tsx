import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { rugs, getRugBySlug, getRelatedRugs } from '@/data/rugs'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return rugs.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const rug = getRugBySlug(params.slug)
  if (!rug) return {}
  return { title: `${rug.given_name} — ${rug.cultural_name}` }
}

export default function RugPage({ params }: { params: { slug: string } }) {
  const rug = getRugBySlug(params.slug)
  if (!rug) notFound()

  const related = getRelatedRugs(rug)
  const hero = rug.images[0] || 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=1400&q=80'

  return (
    <>
      <style>{`
        .rp { padding-bottom: var(--sp-32); }

        /* Images */
        .rp-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--grey-200);
          margin-bottom: 0;
        }
        @media (max-width: 600px) { .rp-images { grid-template-columns: 1fr; } }
        .rp-images__hero {
          aspect-ratio: 3/4;
          position: relative;
          overflow: hidden;
          background: var(--grey-100);
        }
        .rp-images__hero--full { grid-column: 1 / -1; aspect-ratio: 16/9; }
        .rp-images__secondary { aspect-ratio: 3/4; position: relative; overflow: hidden; background: var(--grey-100); }

        /* Identity */
        .rp-identity { padding: var(--sp-12) 0 var(--sp-8); border-bottom: var(--border); }
        .rp-identity__inner {
          display: grid; grid-template-columns: 1fr auto; gap: var(--sp-8); align-items: start;
        }
        .rp-given {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 300; letter-spacing: -0.025em; line-height: 0.95;
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
          border: var(--border); padding: 0.3rem 0.7rem; color: var(--grey-600);
          transition: all var(--t);
        }
        .rp-tag:hover { border-color: var(--black); color: var(--black); }
        .rp-price-col { text-align: right; }
        .rp-price {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 300; letter-spacing: -0.02em;
        }

        /* Two-column layout */
        .rp-body {
          display: grid; grid-template-columns: 1fr 380px; gap: var(--sp-16);
          padding: var(--sp-12) 0; align-items: start;
        }
        @media (max-width: 960px) { .rp-body { grid-template-columns: 1fr; } }

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
        .rp-sidebar { position: sticky; top: 76px; }
        .rp-acq {
          border: var(--border); padding: var(--sp-6);
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
          padding: var(--sp-6); border: var(--border); display: block; transition: background var(--t);
        }
        .rp-knowledge-item:hover { background: var(--grey-100); }
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
        {/* Image gallery */}
        <div className="rp-images">
          <div className={`rp-images__hero${rug.images.length === 1 ? ' rp-images__hero--full' : ''}`}>
            <Image src={hero} alt={`${rug.given_name} — ${rug.cultural_name}`} fill style={{ objectFit: 'cover' }} priority sizes="(max-width:600px) 100vw, 50vw" />
          </div>
          {rug.images[1] && (
            <div className="rp-images__secondary">
              <Image src={rug.images[1]} alt={`${rug.given_name} detail`} fill style={{ objectFit: 'cover' }} sizes="50vw" />
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="rp-identity">
          <div className="container">
            <div className="rp-identity__inner">
              <div>
                <p className="t-label">
                  <Link href={`/regions/${rug.region_slug}`} className="rp-motif-link">{rug.region}</Link>
                  {' · '}
                  <Link href={`/gallery?technique=${rug.technique_slug}`} className="rp-motif-link">{rug.technique}</Link>
                </p>
                <h1 className="rp-given" style={{ marginTop: 'var(--sp-2)' }}>{rug.given_name}</h1>
                <p className="rp-cultural">{rug.cultural_name}</p>
                <div className="rp-tags">
                  {rug.atmosphere_tags.map(t => (
                    <span key={t} className="rp-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rp-price-col">
                <p className="t-label">Price</p>
                <p className="rp-price">€{rug.price.toLocaleString()}</p>
                <span className={`avail avail--${rug.availability_status}`} style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  {rug.availability_status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body — two columns */}
        <div className="container">
          <div className="rp-body">
            {/* Left: content */}
            <div>
              {/* Provenance */}
              <div className="rp-section">
                <p className="rp-section-title">Provenance</p>
                <p className="t-body">{rug.provenance_note}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontStyle: 'italic', color: 'var(--grey-600)', marginTop: 'var(--sp-4)', lineHeight: 1.6 }}>
                  {rug.selection_voice}
                </p>
              </div>

              {/* Specifications */}
              <div className="rp-section">
                <p className="rp-section-title">Specifications</p>
                <table className="rp-specs">
                  <tbody>
                    <tr><td>Region</td><td><Link href={`/regions/${rug.region_slug}`} className="rp-motif-link">{rug.region}</Link></td></tr>
                    <tr><td>Community</td><td>{rug.community_tribe || 'Not determined'}</td></tr>
                    <tr><td>Material</td><td>{rug.material_primary}</td></tr>
                    <tr><td>Technique</td><td>{rug.technique}</td></tr>
                    <tr><td>Age</td><td>{rug.age_period}</td></tr>
                    <tr><td>Dimensions</td><td>{rug.length_cm} × {rug.width_cm} cm</td></tr>
                    <tr><td>Pile</td><td>{rug.pile_height}</td></tr>
                    <tr><td>Condition</td><td>{rug.condition} — {rug.condition_notes}</td></tr>
                    <tr><td>Dyes</td><td>{rug.dye_type}</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Symbolic reading */}
              <div className="rp-section">
                <p className="rp-section-title">Symbolic Reading</p>
                <div className="prose">
                  {rug.symbolic_reading.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="rp-motifs">
                  {rug.motifs.map((m, i) => (
                    <Link key={i} href={`/motifs/${rug.motif_slugs[i]}`} className="rp-motif-link">
                      {m} →
                    </Link>
                  ))}
                </div>
              </div>

              {/* Spatial */}
              <div className="rp-section">
                <p className="rp-section-title">How It Behaves in Space</p>
                <div className="rp-spatial-grid">
                  <div className="rp-spatial-item rp-spatial-item--full">
                    <span className="rp-spatial-item-label">Atmosphere</span>
                    <p>{rug.spatial_atmosphere}</p>
                  </div>
                  <div className="rp-spatial-item">
                    <span className="rp-spatial-item-label">Room Affinities</span>
                    <p>{rug.spatial_room_affinities}</p>
                  </div>
                  <div className="rp-spatial-item">
                    <span className="rp-spatial-item-label">Requirements</span>
                    <p>{rug.spatial_requirements}</p>
                  </div>
                  <div className="rp-spatial-item rp-spatial-item--full rp-spatial-item--doesnt">
                    <span className="rp-spatial-item-label">Doesn't Suit</span>
                    <p>{rug.spatial_doesnt_suit}</p>
                  </div>
                  {rug.interior_archetypes && (
                    <div className="rp-spatial-item rp-spatial-item--full">
                      <span className="rp-spatial-item-label">Interior Archetypes</span>
                      <p>{rug.interior_archetypes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: acquisition */}
            <div className="rp-sidebar">
              <div className="rp-acq">
                <div className="rp-acq__status">
                  <span className={`avail avail--${rug.availability_status}`}>
                    {rug.availability_status === 'available' ? 'Available' : rug.availability_status === 'reserved' ? 'Reserved' : 'Sold'}
                  </span>
                </div>
                <div className="rp-acq__price-row">
                  <span className="rp-acq__price-main">€{rug.price.toLocaleString()}</span>
                  <span className="rp-acq__dims">{rug.length_cm} × {rug.width_cm} cm</span>
                </div>
                <p className="rp-acq__note">{rug.acquisition_note}</p>
                {rug.availability_status === 'available' && (
                  <div className="rp-acq__cta">
                    <Link href={`/inquire?piece=${rug.slug}&name=${encodeURIComponent(rug.given_name)}`} className="btn btn--primary" style={{ width: '100%' }}>
                      Inquire about this piece
                    </Link>
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
                  <span className="rp-trust-text">Fully documented against our five-criteria publishing standard</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">Ships worldwide. Costs confirmed at inquiry</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">Returns accepted within 14 days of delivery</span>
                </div>
                <div className="rp-trust-row">
                  <span className="rp-trust-icon">—</span>
                  <span className="rp-trust-text">Condition guaranteed as described</span>
                </div>
                <div style={{ marginTop: 'var(--sp-4)', display: 'flex', gap: 'var(--sp-4)' }}>
                  <Link href="/care" className="t-ui-xs" style={{ color: 'var(--grey-600)', borderBottom: '1px solid var(--grey-200)' }}>Care & Shipping</Link>
                  <Link href="/returns" className="t-ui-xs" style={{ color: 'var(--grey-600)', borderBottom: '1px solid var(--grey-200)' }}>Returns</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related knowledge */}
        <div className="container">
          <div className="rp-knowledge">
            <span className="t-label">Related Knowledge</span>
            <div className="rp-knowledge__grid">
              <Link href={`/regions/${rug.region_slug}`} className="rp-knowledge-item">
                <span className="t-label rp-knowledge-item__type">Region</span>
                <p className="rp-knowledge-item__name">{rug.region}</p>
                <p className="rp-knowledge-item__hint">Visual grammar, technique traditions, historical context →</p>
              </Link>
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
