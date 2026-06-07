import Link from 'next/link'
import Image from 'next/image'
import { rugs } from '@/data/rugs'
import { regions } from '@/data/regions'
import { essays } from '@/data/essays'
import RugCard from '@/components/gallery/RugCard'

export default function HomePage() {
  const featured = rugs.filter(r => r.availability_status !== 'sold').slice(0, 3)
  const featuredEssay = essays[0]

  return (
    <>
      <style>{`
        .home-hero {
          padding: var(--sp-24) 0 var(--sp-16);
          border-bottom: var(--border);
        }
        .home-hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: end;
        }
        @media (max-width: 768px) {
          .home-hero__inner { grid-template-columns: 1fr; }
        }
        .home-hero__thesis {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--grey-600);
          line-height: 1.7;
          max-width: 42ch;
          margin-top: var(--sp-8);
        }
        .home-hero__cta {
          display: flex; gap: var(--sp-4); flex-wrap: wrap;
          margin-top: var(--sp-8);
        }
        .home-featured { padding: var(--sp-24) 0; }
        .home-featured__header {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: var(--sp-8);
        }
        .home-featured__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6);
        }
        @media (max-width: 900px) {
          .home-featured__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .home-featured__grid { grid-template-columns: 1fr; }
        }
        .home-entries { padding: var(--sp-24) 0; border-top: var(--border); }
        .home-entries__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-left: var(--border);
        }
        @media (max-width: 900px) {
          .home-entries__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .home-entries__grid { grid-template-columns: 1fr 1fr; }
        }
        .home-entry {
          padding: var(--sp-8) var(--sp-6);
          border-right: var(--border);
          border-bottom: var(--border);
          display: block;
          transition: background var(--t);
        }
        .home-entry:hover { background: var(--grey-100); }
        .home-entry__label { display: block; margin-bottom: var(--sp-4); }
        .home-entry__title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: var(--sp-4);
        }
        .home-entry__desc {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.6;
        }
        .home-essay { padding: var(--sp-24) 0; border-top: var(--border); }
        .home-essay__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-16);
          align-items: center;
        }
        @media (max-width: 768px) { .home-essay__inner { grid-template-columns: 1fr; } }
        .home-essay__img {
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--grey-100);
          position: relative;
        }
        .home-essay__content { max-width: 44ch; }
        .home-essay__title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.75rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: var(--sp-4) 0;
        }
        .home-essay__excerpt {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--grey-600);
          line-height: 1.7;
          margin-bottom: var(--sp-6);
        }
        .home-regions { padding: var(--sp-24) 0; border-top: var(--border); }
        .home-regions__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-left: var(--border);
          margin-top: var(--sp-8);
        }
        @media (max-width: 900px) {
          .home-regions__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .home-regions__grid { grid-template-columns: repeat(2, 1fr); }
        }
        .home-region {
          padding: var(--sp-6) var(--sp-4);
          border-right: var(--border);
          border-bottom: var(--border);
          display: block;
          transition: background var(--t);
        }
        .home-region:hover { background: var(--grey-100); }
        .home-region__name {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 0.25rem;
        }
        .home-region__hint {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
      `}</style>

      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero__inner">
            <div>
              <p className="t-label fade-up">Shoppable Ethnographic Gallery</p>
              <h1 className="t-hero fade-up-1">House<br />of<br />Weaves</h1>
            </div>
            <div className="fade-up-2">
              <p className="home-hero__thesis">
                Moroccan and Amazigh rugs presented as cultural objects, knowledge nodes, and spatial actors — each fully documented, each irreplaceable.
              </p>
              <div className="home-hero__cta">
                <Link href="/gallery" className="btn btn--primary">Enter the Gallery</Link>
                <Link href="/about" className="btn btn--outline">Our Methodology</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured rugs */}
      <section className="home-featured">
        <div className="container">
          <div className="home-featured__header">
            <span className="t-label">Current Inventory</span>
            <Link href="/gallery" className="t-ui" style={{ color: 'var(--grey-600)', borderBottom: '1px solid var(--grey-200)' }}>
              View all →
            </Link>
          </div>
          <div className="home-featured__grid">
            {featured.map((rug, i) => (
              <div key={rug.slug} className={`fade-up-${i + 1}`}>
                <RugCard rug={rug} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entry paths */}
      <section className="home-entries">
        <div className="container">
          <span className="t-label">Explore by</span>
          <div className="home-entries__grid" style={{ marginTop: 'var(--sp-6)' }}>
            <Link href="/motifs" className="home-entry">
              <span className="t-label home-entry__label">Knowledge</span>
              <p className="home-entry__title">Motifs &amp; Symbols</p>
              <p className="home-entry__desc">The symbolic grammar of Amazigh weaving — what the forms mean and why they persist.</p>
            </Link>
            <Link href="/regions" className="home-entry">
              <span className="t-label home-entry__label">Origin</span>
              <p className="home-entry__title">Weaving Regions</p>
              <p className="home-entry__desc">Each region produces a distinct visual language. Understand the differences before you buy.</p>
            </Link>
            <Link href="/journal" className="home-entry">
              <span className="t-label home-entry__label">Essays</span>
              <p className="home-entry__title">The Journal</p>
              <p className="home-entry__desc">Long-form writing on material culture, natural dye traditions, and spatial intelligence.</p>
            </Link>
            <Link href="/gallery?filter=room" className="home-entry">
              <span className="t-label home-entry__label">Spatial</span>
              <p className="home-entry__title">Room Guide</p>
              <p className="home-entry__desc">How a rug behaves in a room — light, atmosphere, pile, and scale. Find the right piece for your space.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured essay */}
      {featuredEssay && (
        <section className="home-essay">
          <div className="container">
            <div className="home-essay__inner">
              <div className="home-essay__img">
                {featuredEssay.cover_image && (
                  <Image src={featuredEssay.cover_image} alt={featuredEssay.title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                )}
              </div>
              <div className="home-essay__content">
                <span className="t-label">From the Journal</span>
                <h2 className="home-essay__title">{featuredEssay.title}</h2>
                <p className="home-essay__excerpt">{featuredEssay.excerpt}</p>
                <Link href={`/journal/${featuredEssay.slug}`} className="btn btn--outline">
                  Read the essay
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regions quick nav */}
      <section className="home-regions">
        <div className="container">
          <span className="t-label">Browse by Region</span>
          <div className="home-regions__grid">
            {regions.map(r => (
              <Link key={r.slug} href={`/regions/${r.slug}`} className="home-region">
                <p className="home-region__name">{r.name}</p>
                <span className="home-region__hint">Browse rugs →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
