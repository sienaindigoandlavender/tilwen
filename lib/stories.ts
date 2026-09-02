// Stories — text + image from Supabase tilwen_stories. Build-time, read-only.
// Fail-soft: no env vars / no network / no rows = empty, pages still render.
import { createClient } from '@supabase/supabase-js'

export type Story = {
  slug: string
  title: string
  excerpt: string
  body: string
  theme_tags: string[]
  region_slugs: string[]
  motif_slugs: string[]
  featured_rug_slugs: string[]
  reading_time_minutes: number | null
  cover_image: string | null
  image_alt: string | null
  published_at: string | null
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let cache: Story[] | null = null

function normalise(r: any): Story {
  return {
    slug: r.slug,
    title: r.title ?? '',
    excerpt: r.excerpt ?? '',
    body: r.body ?? '',
    theme_tags: r.theme_tags ?? [],
    region_slugs: r.region_slugs ?? [],
    motif_slugs: r.motif_slugs ?? [],
    featured_rug_slugs: r.featured_rug_slugs ?? [],
    reading_time_minutes: r.reading_time_minutes ?? null,
    cover_image: r.cover_image ?? null,
    image_alt: r.image_alt ?? null,
    published_at: r.published_at ?? null,
  }
}

export async function getStories(): Promise<Story[]> {
  if (cache) return cache
  if (!url || !key) return (cache = [])
  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('tilwen_stories')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error || !data) return (cache = [])
    const list = data.map(normalise)
    cache = list
    return list
  } catch {
    return (cache = [])
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const all = await getStories()
  return all.find(s => s.slug === slug)
}
