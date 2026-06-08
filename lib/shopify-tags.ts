/**
 * Shopify product tagging schema for Tilwen
 *
 * Every product must be tagged with one value from each dimension.
 * Smart collections pull from these tags automatically.
 * Manual collections (rug types) are curated by hand.
 *
 * Tag format: namespace:value (no spaces, lowercase, hyphens)
 *
 * Usage when creating a product in Shopify Admin:
 * Add all applicable tags to the Tags field, comma-separated.
 * Example: region:middle-atlas, technique:pile-knotted, dye:natural, vintage, type:beni-ourain
 */

// ── Tag namespaces ─────────────────────────────────────────────────────────

export const REGION_TAGS = {
  'high-atlas':   'region:high-atlas',
  'middle-atlas': 'region:middle-atlas',
  'anti-atlas':   'region:anti-atlas',
  'haouz-plain':  'region:haouz-plain',
  'saharan':      'region:saharan',
} as const

export const TECHNIQUE_TAGS = {
  'flatweave-kilim': 'technique:flatweave',
  'pile-knotted':    'technique:pile-knotted',
  'boucherouitte':   'technique:boucherouitte',
  'mixed':           'technique:mixed',
} as const

export const DYE_TAGS = {
  natural:   'dye:natural',
  synthetic: 'dye:synthetic',
  mixed:     'dye:mixed',
  chrome:    'dye:chrome',
} as const

export const PILE_TAGS = {
  Flat:   'pile:flat',
  Low:    'pile:low',
  Medium: 'pile:medium',
  High:   'pile:high',
} as const

export const CONDITION_TAGS = {
  'Excellent':  'condition:excellent',
  'Very Good':  'condition:very-good',
  'Good':       'condition:good',
  'Fair':       'condition:fair',
} as const

// Age — add 'vintage' tag if piece is pre-1980
export const AGE_TAGS = {
  vintage:      'vintage',
  antique:      'antique',
  contemporary: 'contemporary',
} as const

// Rug type — used for manual collections
export const TYPE_TAGS = {
  'beni-ourain':  'type:beni-ourain',
  'beni-mguild':  'type:beni-mguild',
  'beni-mrirt':   'type:beni-mrirt',
  'zayan':        'type:zayan',
  'zemmour':      'type:zemmour',
  'azilal':       'type:azilal',
  'boujad':       'type:boujad',
  'zanafi':       'type:zanafi',
  'taznakht':     'type:taznakht',
  'talsint':      'type:talsint',
  'boucherouitte':'type:boucherouitte',
} as const

// Special attributes
export const SPECIAL_TAGS = {
  'natural-dye':      'dye:natural',    // alias
  'handira':          'handira',
  'ceremonial':       'ceremonial',
  'symbolic-reading': 'documented-symbols',
} as const

// ── Smart collection conditions ────────────────────────────────────────────
// Reference for setting up smart collections in Shopify Admin

export const SMART_COLLECTIONS = [

  // By technique
  { name: 'Flatweave & Kilim',  condition: 'tag equals technique:flatweave' },
  { name: 'Pile-Knotted',       condition: 'tag equals technique:pile-knotted' },
  { name: 'Boucherouitte',      condition: 'tag equals technique:boucherouitte' },

  // By region
  { name: 'High Atlas',         condition: 'tag equals region:high-atlas' },
  { name: 'Middle Atlas',       condition: 'tag equals region:middle-atlas' },
  { name: 'Anti-Atlas',         condition: 'tag equals region:anti-atlas' },
  { name: 'Haouz Plain',        condition: 'tag equals region:haouz-plain' },
  { name: 'Saharan',            condition: 'tag equals region:saharan' },

  // By dye
  { name: 'Natural Dye',        condition: 'tag equals dye:natural' },

  // By age
  { name: 'Vintage',            condition: 'tag equals vintage' },
  { name: 'Antique',            condition: 'tag equals antique' },

  // By condition
  { name: 'Excellent Condition', condition: 'tag equals condition:excellent' },

  // Available only — use inventory stock condition
  { name: 'Available',           condition: 'variant inventory quantity is greater than 0' },

] as const

// ── Manual collections (rug types — curated by hand) ──────────────────────
export const MANUAL_COLLECTIONS = [
  'Beni Ourain',
  'Beni M\'Guild',
  'Beni M\'Rirt',
  'Zayan',
  'Zemmour',
  'Azilal',
  'Boujad',
  'Zanafi',
  'Taznakht',
  'Talsint',
  'Boucherouitte',
] as const

// ── Tag builder helper ─────────────────────────────────────────────────────
// Call this when creating a product to generate the full tag list

export function buildProductTags(rug: {
  region_slug: string
  technique_slug: string
  dye_type: string
  pile_height: string
  condition: string
  age_period: string
  rug_type_slug?: string
}): string[] {
  const tags: string[] = []

  // Region
  const regionTag = REGION_TAGS[rug.region_slug as keyof typeof REGION_TAGS]
  if (regionTag) tags.push(regionTag)

  // Technique
  const techniqueTag = TECHNIQUE_TAGS[rug.technique_slug as keyof typeof TECHNIQUE_TAGS]
  if (techniqueTag) tags.push(techniqueTag)

  // Dye
  if (rug.dye_type.toLowerCase().includes('natural')) tags.push('dye:natural')
  else if (rug.dye_type.toLowerCase().includes('synthetic')) tags.push('dye:synthetic')
  else if (rug.dye_type.toLowerCase().includes('chrome')) tags.push('dye:chrome')
  else tags.push('dye:mixed')

  // Pile
  const pileTag = PILE_TAGS[rug.pile_height as keyof typeof PILE_TAGS]
  if (pileTag) tags.push(pileTag)

  // Condition
  const conditionTag = CONDITION_TAGS[rug.condition as keyof typeof CONDITION_TAGS]
  if (conditionTag) tags.push(conditionTag)

  // Age
  const year = parseInt(rug.age_period.replace(/\D/g, '').slice(0, 4))
  if (!isNaN(year)) {
    if (year < 1930) tags.push('antique')
    else if (year < 1985) tags.push('vintage')
    else tags.push('contemporary')
  }

  // Rug type (for manual collection membership reference)
  if (rug.rug_type_slug) {
    const typeTag = TYPE_TAGS[rug.rug_type_slug as keyof typeof TYPE_TAGS]
    if (typeTag) tags.push(typeTag)
  }

  return tags
}
