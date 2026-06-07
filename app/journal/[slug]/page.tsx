import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { essays, getEssayBySlug } from '@/data/essays'
import { rugs } from '@/data/rugs'
import RugCard from '@/components/gallery/RugCard'

export async function generateStaticParams() {
  return essays.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)
  if (!essay) return {}
  return { title: essay.title, description: essay.excerpt }
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)
  if (!essay) notFound()

  const featuredRugs = essay.featured_rug_slugs.map(s => rugs.find(r => r.slug === s)).filter(Boolean)

  const renderBody = (body: string) => {
    return body.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i}>{block.replace('## ', '')}</h2>
      }
      if (block.startsWith('### ')) {
        return <h3 key={i}>{block.replace('### ', '')}</h3>
      }
      return <p key={i}>{block}</p>
    })
  }

  return (
    <>
      <style>{`
        .essay-page { padding-bottom: var(--sp-32); }
        .essay-hero { aspect-ratio: 16/7; position: relative; overflow: hidden; background: var(--grey-100); }
        .essay-header { padding: var(--sp-12) 0 var(--sp-8); border-bottom: var(--border); }
        .essay-header__meta { display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-6); }
        .essay-header__tag {
          font-family: var(--font-ui); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-400);
        }
        .essay-body {
          display: grid; grid-template-columns: 1fr 320px; gap: var(--sp-16);
          padding: var(--sp-12) 0; align-items: start;
        }
        @media (max-width: 900px) { .essay-body { grid-template-columns: 1fr; } }
        .essay-sidebar { position: sticky; top: 76px; }
        .essay-rugs-title { margin-bottom: var(--sp-6); }
        .essay-rugs-list { display: flex; flex-direction: column; gap: var(--sp-6); }
        .essay-back {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-400);
          display: inline-block; margin-bottom: var(--sp-6);
          border-bottom: 1px solid var(--grey-200); transition: all var(--t);
        }
        .essay-back:hover { color: var(--black); border-bottom-color: var(--black); }
      `}</style>

      <div className="essay-page">
        {essay.cover_image && (
          <div className="essay-hero">
            <Image src={essay.cover_image} alt={essay.title} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          </div>
        )}

        <div className="essay-header">
          <div className="container">
            <Link href="/journal" className="essay-back">← Journal</Link>
            <div className="essay-header__meta">
              {essay.theme_tags.map(t => (
                <span key={t} className="essay-header__tag">{t}</span>
              ))}
              <span className="essay-header__tag">·</span>
              <span className="essay-header__tag">{essay.reading_time_minutes} min read</span>
            </div>
            <h1 className="t-display fade-up">{essay.title}</h1>
            <p className="t-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--grey-600)', maxWidth: '60ch', fontStyle: 'italic' }}>
              {essay.excerpt}
            </p>
          </div>
        </div>

        <div className="container">
          <div className="essay-body">
            <article className="prose">{renderBody(essay.body)}</article>

            {featuredRugs.length > 0 && (
              <aside className="essay-sidebar">
                <p className="t-label essay-rugs-title">Pieces in the Gallery</p>
                <div className="essay-rugs-list">
                  {featuredRugs.map(r => r && (
                    <RugCard key={r.slug} rug={r} />
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
