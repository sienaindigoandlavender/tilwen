import { MetadataRoute } from 'next'

const BASE = 'https://www.tilwen.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: everything crawlable except internals and the legacy
        // Shopify paths that 404. Disallowing them stops Google re-crawling
        // ghost URLs and keeps the coverage report clean.
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/cart',
          '/cart/',
          '/checkout',
          '/account/',
          '/policies/',
          '/collections/',
          '/products/',
          '/rugs/',
          '/search',
        ],
      },
      // AI crawlers — explicitly welcomed for GEO. Tilwen's knowledge layer is
      // built to be cited; these get the full site with no path restrictions.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
