const BASE_URL = 'https://www.tilwen.com'
const SITE_NAME = 'Tilwen'
const DEFAULT_DESCRIPTION = 'Before Islam. Before everything that came after and tried to rename it. The lozenge on a High Atlas kilim is a protective mark — placed by a woman who understood that beauty and protection are the same gesture. Tilwen is where those objects are.'

export function canonical(path: string) {
  return `${BASE_URL}${path}`
}

export function baseOpenGraph(overrides: {
  title: string; description: string; url: string; image?: string
}) {
  return {
    title: overrides.title,
    description: overrides.description,
    url: overrides.url,
    siteName: SITE_NAME,
    type: 'website' as const,
    images: [{ url: overrides.image || `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: overrides.title }],
    locale: 'en_GB',
  }
}

export const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tilwen',
  url: BASE_URL,
  description: DEFAULT_DESCRIPTION,
  contactPoint: { '@type': 'ContactPoint', email: 'hello@tilwen.com', contactType: 'customer service' },
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tilwen',
  url: BASE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/gallery?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export function rugProductJsonLd(rug: {
  slug: string; given_name: string; cultural_name: string; price: number
  availability_status: string; region: string; images: string[]; technique: string; condition: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${rug.given_name} — ${rug.cultural_name}`,
    description: `${rug.cultural_name} from the ${rug.region}. ${rug.technique}.`,
    url: `${BASE_URL}/gallery/${rug.slug}`,
    image: rug.images,
    brand: { '@type': 'Brand', name: 'Tilwen' },
    category: 'Rugs & Carpets > Moroccan & Amazigh Rugs',
    offers: {
      '@type': 'Offer',
      price: rug.price,
      priceCurrency: 'EUR',
      availability: rug.availability_status === 'available'
        ? 'https://schema.org/InStock'
        : rug.availability_status === 'reserved'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/SoldOut',
      url: `${BASE_URL}/gallery/${rug.slug}`,
      seller: { '@type': 'Organization', name: 'Tilwen' },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Technique', value: rug.technique },
      { '@type': 'PropertyValue', name: 'Region', value: rug.region },
      { '@type': 'PropertyValue', name: 'Condition', value: rug.condition },
    ],
  }
}

export function essayArticleJsonLd(essay: {
  slug: string; title: string; excerpt: string; published_at: string; cover_image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.excerpt,
    url: `${BASE_URL}/journal/${essay.slug}`,
    publisher: { '@type': 'Organization', name: 'Tilwen', url: BASE_URL },
    datePublished: essay.published_at,
    image: essay.cover_image,
    articleSection: 'Moroccan & Amazigh Material Culture',
    inLanguage: 'en',
  }
}

export function glossaryTermJsonLd(entry: {
  slug: string; term: string; short_definition: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.short_definition,
    url: `${BASE_URL}/glossary/${entry.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Tilwen Glossary — Moroccan & Amazigh Rug Terminology',
      url: `${BASE_URL}/glossary`,
    },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: item.url,
    })),
  }
}

export { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION }
