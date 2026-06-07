export type AvailabilityStatus = 'available' | 'reserved' | 'sold'
export type PileHeight = 'Flat' | 'Low' | 'Medium' | 'High'
export type ConditionGrade = 'Excellent' | 'Very Good' | 'Good' | 'Fair'

export interface Rug {
  id: string
  slug: string
  given_name: string
  cultural_name: string
  atmosphere_summary: string
  provenance_note: string
  selection_voice: string
  region: string
  region_slug: string
  technique: string
  technique_slug: string
  community_tribe: string | null
  material_primary: string
  age_period: string
  length_cm: number
  width_cm: number
  pile_height: PileHeight
  condition: ConditionGrade
  condition_notes: string
  dye_type: string
  motifs: string[]
  motif_slugs: string[]
  symbolic_reading: string
  spatial_atmosphere: string
  spatial_room_affinities: string
  spatial_requirements: string
  spatial_doesnt_suit: string
  interior_archetypes?: string
  room_suitability: string[]
  palette_tags: string[]
  atmosphere_tags: string[]
  price: number
  currency: string
  availability_status: AvailabilityStatus
  acquisition_note: string
  related_rug_slugs: string[]
  related_rug_labels: string[]
  images: string[]
}

export interface Region {
  slug: string
  name: string
  overview: string
  visual_grammar: string
  technique_traditions: string
  hero_image?: string
}

export interface Motif {
  slug: string
  name: string
  summary: string
  cultural_reading: string
  variant_forms?: string
  example_image?: string
  related_motif_slugs: string[]
}

export interface Technique {
  slug: string
  name: string
  description: string
  spatial_character: string
}

export interface Essay {
  slug: string
  title: string
  excerpt: string
  body: string
  theme_tags: string[]
  region_slugs: string[]
  motif_slugs: string[]
  featured_rug_slugs: string[]
  reading_time_minutes: number
  published_at: string
  cover_image?: string
}
