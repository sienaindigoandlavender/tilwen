import { MetadataRoute } from 'next'
import { rugs } from '@/data/rugs'
import { motifs } from '@/data/motifs'
import { regions } from '@/data/regions'
import { essays } from '@/data/essays'
import { glossary } from '@/data/glossary'
import { rugTypes } from '@/data/rug-types'

const BASE = 'https://www.tilwen.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const statics: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/gallery`,       lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/motifs`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/regions`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/traditions`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/journal`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/glossary`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/inquire`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/care`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/returns`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/payments`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const rugPages = rugs.map(r => ({
    url: `${BASE}/gallery/${r.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const motifPages = motifs.map(m => ({
    url: `${BASE}/motifs/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const regionPages = regions.map(r => ({
    url: `${BASE}/regions/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const essayPages = essays.map(e => ({
    url: `${BASE}/journal/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const glossaryPages = glossary.map(g => ({
    url: `${BASE}/glossary/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const traditionPages = rugTypes.map(t => ({
    url: `${BASE}/traditions/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...statics, ...rugPages, ...motifPages, ...regionPages, ...essayPages, ...glossaryPages, ...traditionPages]
}
