// Build-time image lookup for rug types.
// Text lives in data/rug-types.ts (edited with intent, in voice).
// Images live in Supabase tilwen_rug_types.image_url (edited from the
// dashboard whenever a new MidJourney render is uploaded to Cloudinary).
// No redeploy needed to swap an image — the next build picks it up; and
// with revalidation on, even sooner.

import { createClient } from '@supabase/supabase-js'

type RugTypeImage = { image_url: string | null; image_alt: string | null }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// One fetch, cached for the whole render pass. Fails soft: if Supabase is
// unreachable or the vars are missing, pages still render (no image), never crash.
let cache: Record<string, RugTypeImage> | null = null

export async function getRugTypeImages(): Promise<Record<string, RugTypeImage>> {
  if (cache) return cache
  if (!url || !key) return (cache = {})
  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('tilwen_rug_types')
      .select('slug, image_url, image_alt')
    if (error || !data) return (cache = {})
    cache = Object.fromEntries(
      data.map((r: any) => [r.slug, { image_url: r.image_url, image_alt: r.image_alt }])
    )
    return cache
  } catch {
    return (cache = {})
  }
}

export async function getRugTypeImage(slug: string): Promise<RugTypeImage> {
  const all = await getRugTypeImages()
  return all[slug] ?? { image_url: null, image_alt: null }
}
