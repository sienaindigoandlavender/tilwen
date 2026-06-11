/**
 * Rug data source — the hybrid model, wired.
 *
 * Shopify owns:        price, availability, images, variant ID, title, tags,
 *                      museum description (descriptionHtml), how.* metafields
 * data/rugs.ts owns:   editorial scholarship — symbolic reading, spatial notes,
 *                      provenance, selection voice, given name, motif links
 *
 * Merge key: an entry in data/rugs.ts is treated as an editorial overlay for a
 * Shopify product when its shopify_product_id or shopify_variant_id matches,
 * or its slug equals the Shopify handle.
 *
 * Behaviour:
 *  - Shopify env vars set  → the gallery is the live Shopify catalogue.
 *    Local entries that match a product enrich it. Local entries that match
 *    nothing are ignored (they are placeholders).
 *  - Shopify env vars absent (local dev) → falls back to data/rugs.ts.
 *  - Shopify errors at request time → the error propagates; with ISR, Next.js
 *    keeps serving the last good page rather than an empty gallery.
 */

import type { Rug, PileHeight, ConditionGrade, AvailabilityStatus } from '@/types'
import {
  fetchAllShopifyProducts,
  type ShopifyProduct,
} from '@/lib/shopify'
import { rugs as localRugs } from '@/data/rugs'
import { regions } from '@/data/regions'
import { techniques } from '@/data/techniques'
import { rugTypes } from '@/data/rug-types'

export const REVALIDATE_SECONDS = 600

// ── Tag parsing ──────────────────────────────────────────────────────────────

const PALETTE_KEYS = [
  'ivory', 'cream', 'ochre', 'saffron', 'terracotta', 'rust', 'red', 'orange',
  'brown', 'walnut', 'indigo', 'blue', 'charcoal', 'black', 'grey', 'sage',
  'green', 'sand', 'pink',
]

// Shopify tag value → site technique slug (data/techniques.ts)
const TECHNIQUE_TAG_TO_SLUG: Record<string, string> = {
  'flatweave': 'flatweave-kilim',
  'flatweave-kilim': 'flatweave-kilim',
  'pile-knotted': 'pile-knotted',
  'boucherouitte': 'boucherouitte',
  'mixed': 'pile-knotted',
}

const PILE_TAG_TO_DISPLAY: Record<string, PileHeight> = {
  flat: 'Flat', low: 'Low', medium: 'Medium', high: 'High',
}

const CONDITION_TAG_TO_DISPLAY: Record<string, ConditionGrade> = {
  'excellent': 'Excellent', 'very-good': 'Very Good', 'good': 'Good', 'fair': 'Fair',
}

const DYE_TAG_TO_DISPLAY: Record<string, string> = {
  natural: 'Natural', synthetic: 'Synthetic',
  mixed: 'Natural and synthetic', chrome: 'Chrome',
}

interface ParsedTags {
  typeSlug: string | null
  regionSlug: string | null
  techniqueSlug: string | null
  dye: string | null
  pile: PileHeight | null
  condition: ConditionGrade | null
  ageClass: 'vintage' | 'contemporary' | 'antique' | null
  palette: string[]
}

function parseTags(tags: string[]): ParsedTags {
  const out: ParsedTags = {
    typeSlug: null, regionSlug: null, techniqueSlug: null,
    dye: null, pile: null, condition: null, ageClass: null, palette: [],
  }
  for (const raw of tags) {
    const tag = raw.trim().toLowerCase()
    if (tag.startsWith('type:'))      { out.typeSlug = tag.slice(5); continue }
    if (tag.startsWith('region:'))    { out.regionSlug = tag.slice(7); continue }
    if (tag.startsWith('technique:')) {
      out.techniqueSlug = TECHNIQUE_TAG_TO_SLUG[tag.slice(10)] || tag.slice(10)
      continue
    }
    if (tag.startsWith('dye:'))       { out.dye = DYE_TAG_TO_DISPLAY[tag.slice(4)] || null; continue }
    if (tag.startsWith('pile:'))      { out.pile = PILE_TAG_TO_DISPLAY[tag.slice(5)] || null; continue }
    if (tag.startsWith('condition:')) { out.condition = CONDITION_TAG_TO_DISPLAY[tag.slice(10)] || null; continue }
    if (tag === 'vintage' || tag === 'contemporary' || tag === 'antique') { out.ageClass = tag; continue }
    if (PALETTE_KEYS.includes(tag))   { out.palette.push(tag); continue }
  }
  return out
}

// ── Title parsing ────────────────────────────────────────────────────────────
// Title format: "Beni Ourain — 238 × 146 cm · GLB-102660"

function parseTitle(title: string): {
  typeName: string
  lengthCm: number
  widthCm: number
  reference: string
} {
  const dims = title.match(/(\d+)\s*[×x]\s*(\d+)/)
  const ref = title.match(/·\s*([A-Za-z0-9-]+)\s*$/)
  const typeName = title.split(/\s+[—–-]\s+/)[0].trim()
  return {
    typeName: typeName || title.trim(),
    lengthCm: dims ? parseInt(dims[1], 10) : 0,
    widthCm: dims ? parseInt(dims[2], 10) : 0,
    reference: ref ? ref[1] : '',
  }
}

// ── Lookups ──────────────────────────────────────────────────────────────────

function regionName(slug: string | null): string {
  if (!slug) return ''
  return regions.find(r => r.slug === slug)?.name || prettify(slug)
}

function techniqueName(slug: string | null): string {
  if (!slug) return ''
  return techniques.find(t => t.slug === slug)?.name || prettify(slug)
}

function typeName(slug: string | null): string {
  if (!slug) return ''
  return rugTypes.find(t => t.slug === slug)?.name || prettify(slug)
}

function prettify(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function idsMatch(gid: string | null | undefined, candidate: string | null | undefined): boolean {
  if (!gid || !candidate) return false
  if (gid === candidate) return true
  // Tolerate numeric-only IDs pasted from the admin URL
  const a = gid.split('/').pop()
  const b = candidate.split('/').pop()
  return !!a && !!b && a === b
}

function findOverlay(p: ShopifyProduct): Rug | undefined {
  return localRugs.find(r =>
    idsMatch(p.id, r.shopify_product_id) ||
    idsMatch(p.variantId, r.shopify_variant_id) ||
    r.slug === p.handle
  )
}

// ── The merge ────────────────────────────────────────────────────────────────

function shopifyToRug(p: ShopifyProduct): Rug {
  const o = findOverlay(p)
  const mf = p.metafields
  const tags = parseTags(p.tags)
  const t = parseTitle(p.title)

  const rSlug = tags.regionSlug || o?.region_slug || ''
  const tSlug = tags.techniqueSlug || o?.technique_slug || ''
  const ageClass = tags.ageClass || o?.age_class
  const tName = typeName(tags.typeSlug) || t.typeName

  const availability: AvailabilityStatus =
    p.availableForSale && p.variantAvailable
      ? (o?.availability_status === 'reserved' ? 'reserved' : 'available')
      : 'sold'

  const culturalFallback = [tName, regionName(rSlug)].filter(Boolean).join(', ')

  return {
    id: p.id,
    slug: o?.slug || p.handle,
    given_name: mf.given_name || o?.given_name || tName,
    cultural_name: mf.cultural_name || o?.cultural_name || culturalFallback || p.title,
    atmosphere_summary: o?.atmosphere_summary || '',
    provenance_note: mf.provenance_note || o?.provenance_note || '',
    selection_voice: mf.selection_voice || o?.selection_voice || '',
    region: mf.region || regionName(rSlug),
    region_slug: rSlug,
    technique: mf.technique || techniqueName(tSlug),
    technique_slug: tSlug,
    community_tribe: o?.community_tribe || null,
    material_primary: o?.material_primary || '',
    age_period: mf.age_period || o?.age_period || (ageClass ? prettify(ageClass) : ''),
    length_cm: t.lengthCm || o?.length_cm || 0,
    width_cm: t.widthCm || o?.width_cm || 0,
    pile_height: (mf.pile_height as PileHeight) || tags.pile || o?.pile_height
      || (tSlug === 'flatweave-kilim' ? 'Flat' : 'Medium'),
    condition: (mf.condition as ConditionGrade) || tags.condition || o?.condition || 'Very Good',
    condition_notes: mf.condition_notes || o?.condition_notes || '',
    dye_type: mf.dye_type || tags.dye || o?.dye_type || '',
    motifs: o?.motifs || [],
    motif_slugs: o?.motif_slugs || [],
    symbolic_reading: mf.symbolic_reading || o?.symbolic_reading || '',
    spatial_atmosphere: mf.spatial_atmosphere || o?.spatial_atmosphere || '',
    spatial_room_affinities: o?.spatial_room_affinities || '',
    spatial_requirements: o?.spatial_requirements || '',
    spatial_doesnt_suit: o?.spatial_doesnt_suit || '',
    interior_archetypes: o?.interior_archetypes,
    room_suitability: o?.room_suitability || [],
    palette_tags: tags.palette.length ? tags.palette : (o?.palette_tags || []),
    atmosphere_tags: o?.atmosphere_tags || [],
    price: p.price || o?.price || 0,
    currency: p.currencyCode || 'EUR',
    availability_status: availability,
    acquisition_note: o?.acquisition_note ||
      'This is a one-of-a-kind piece. Once sold, it cannot be replicated. All sales are final. We ship worldwide from Marrakech; costs are confirmed at checkout or inquiry.',
    related_rug_slugs: o?.related_rug_slugs || [],
    related_rug_labels: o?.related_rug_labels || [],
    images: p.images.length ? p.images.map(i => i.url) : (o?.images || []),
    shopify_product_id: p.id,
    shopify_variant_id: p.variantId || undefined,
    description_html: p.descriptionHtml || undefined,
    reference: t.reference || undefined,
    age_class: ageClass || undefined,
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

const SHOPIFY_CONFIGURED =
  !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
  !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

export async function getAllRugs(): Promise<Rug[]> {
  if (!SHOPIFY_CONFIGURED) {
    // Local development without credentials — placeholder data
    return localRugs
  }
  const products = await fetchAllShopifyProducts()
  return products.map(shopifyToRug)
}

/** Build-safe variant: never throws. Used by generateStaticParams and sitemap. */
export async function getAllRugsSafe(): Promise<Rug[]> {
  try {
    return await getAllRugs()
  } catch (e) {
    console.error('[tilwen] Shopify fetch failed:', e)
    return SHOPIFY_CONFIGURED ? [] : localRugs
  }
}

export async function getRugBySlugLive(slug: string): Promise<Rug | undefined> {
  const all = await getAllRugs()
  return all.find(r => r.slug === slug)
}

export function getRelatedRugsFrom(rug: Rug, all: Rug[]): { rug: Rug; label: string }[] {
  // Editorial relationships first
  const editorial = rug.related_rug_slugs
    .map((slug, i) => {
      const found = all.find(r => r.slug === slug)
      if (!found) return null
      return { rug: found, label: rug.related_rug_labels[i] || '' }
    })
    .filter(Boolean) as { rug: Rug; label: string }[]

  if (editorial.length) return editorial.slice(0, 3)

  // Fall back to curatorial-adjacent pieces: same region, then same technique
  const sameRegion = all.filter(r =>
    r.slug !== rug.slug && r.region_slug && r.region_slug === rug.region_slug &&
    r.availability_status !== 'sold'
  ).map(r => ({ rug: r, label: 'From the same region' }))

  const sameTechnique = all.filter(r =>
    r.slug !== rug.slug && r.technique_slug && r.technique_slug === rug.technique_slug &&
    r.region_slug !== rug.region_slug && r.availability_status !== 'sold'
  ).map(r => ({ rug: r, label: 'Same technique, different register' }))

  return [...sameRegion, ...sameTechnique].slice(0, 3)
}
