import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export const metadata = { title: 'Journal' }

export default function JournalPage() {
  return (
    <>
      <style>{`
        .journal-header { padding: var(--sp-16) 0 var(--sp-8); border-bottom: var(--border); }
        .journal-list { padding: var(--sp-12) 0 var(--sp-32); }
        .journal-item {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: var(--sp-12); padding: var(--sp-10) 0;
          border-bottom: var(--border); align-items: center;
        }
        @media (max-width: 768px) { .journal-item { grid-template-columns: 1fr; } }
        .journal-item__img { aspect-ratio: 3/2; overflow: hidden; position: relative; background: var(--grey-100); }
        .journal-item__img img { transition: transform 600ms var(--ease); }
        .journal-item:hover .journal-item__img img { transform: scale(1.03); }
        .journal-item__meta { display: flex; gap: var(--sp-4); margin-bottom: var(--sp-4); flex-wrap: wrap; }
        .journal-item__tag {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-600);
        }
        .journal-item__title {
          font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2.25rem);
          font-weight: 300; letter-spacing: -0.02em; line-height: 1.1;
          margin-bottom: var(--sp-4);
        }
        .journal-item__excerpt {
          font-family: var(--font-body); font-size: 1rem;
          color: var(--grey-800); line-height: 1.7; margin-bottom: var(--sp-6);
        }
        .journal-item__read {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-600);
        }
      `}</style>

      <div className="journal-header">
        <div className="container">
          <p className="t-label fade-up" style={{ marginBottom: 'var(--sp-2)' }}>Writing</p>
          <h1 className="t-display fade-up-1">The Journal</h1>
          <p className="t-body fade-up-2" style={{ marginTop: 'var(--sp-6)', maxWidth: '60ch', color: 'var(--grey-600)' }}>
            Long-form essays on material culture, symbolic grammar, natural dye traditions, and spatial intelligence. Not a blog — a considered body of writing that illuminates the objects.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="journal-list">
          {essays.map(essay => (
            <Link key={essay.slug} href={`/journal/${essay.slug}`} style={{ display: 'block' }}>
              <article className="journal-item">
                <div className="journal-item__img">
                  {essay.cover_image && (
                    <Image src={essay.cover_image} alt={essay.title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                  )}
                </div>
                <div>
                  <div className="journal-item__meta">
                    {essay.theme_tags.slice(0, 2).map(t => (
                      <span key={t} className="journal-item__tag">{t}</span>
                    ))}
                    <span className="journal-item__tag">·</span>
                    <span className="journal-item__tag">{essay.reading_time_minutes} min read</span>
                  </div>
                  <h2 className="journal-item__title">{essay.title}</h2>
                  <p className="journal-item__excerpt">{essay.excerpt}</p>
                  <span className="journal-item__read">Read essay →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
