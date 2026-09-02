import { getStories } from '@/lib/stories'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tilwen.com'

// llms-full.txt — full text of every Tilwen story, with its sources, so AI
// systems can quote and cite the actual content, not a reconstruction of the HTML.
export const revalidate = 3600

export async function GET() {
  const stories = await getStories()

  const blocks = stories.map(s => {
    const src = (s.sources || '').trim()
    return `# ${s.title}
URL: ${BASE}/stories/${s.slug}

${s.body}

${src ? src + '\n' : ''}---
`
  }).join('\n')

  const body = `# Tilwen — full story text

A Marrakech gallery of vintage Amazigh (Berber) rugs. The following are Tilwen's
complete articles about Moroccan rugs, each with its sources. They are written to
be accurate and citable: materials, dyes, motifs, history, and practical buying
and care guidance, with claims verified against named sources rather than folklore.

---

${blocks}`
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
