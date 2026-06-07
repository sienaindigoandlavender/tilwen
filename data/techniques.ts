import type { Technique } from '@/types'

export const techniques: Technique[] = [
  {
    slug: 'flatweave-kilim',
    name: 'Flatweave — Kilim',
    description: 'A weft-faced flatweave structure in which coloured wefts completely cover the warp. The resulting textile is flat, reversible, and has no pile. Kilim is among the oldest weaving techniques in the region, producing textiles that are simultaneously floor covering, wall hanging, and carrier of symbolic content.',
    spatial_character: 'Flat and graphic in a room. Hard-wearing and easy to live with under furniture without pile compression. The pattern reads boldly from a distance and rewards close attention. Suits hard floors — stone, tile, bare wood. In a room with a lot of texture, the flatweave brings graphic relief.',
  },
  {
    slug: 'pile-knotted',
    name: 'Pile-Knotted',
    description: 'Hand-knotted pile in which individual knots of wool are tied around warp threads and clipped to create a surface texture. Pile height varies from low (close to the warp) to high. The density of knotting determines the fineness of the pattern and the weight of the textile.',
    spatial_character: 'Absorbs sound and adds warmth to a room in both thermal and visual senses. The pile creates a depth of texture that flatweave cannot — it changes under different light conditions, reading differently in morning and evening. Softens a room. More demanding under heavy furniture; high-pile pieces should not be permanently compressed by table or sofa legs.',
  },
  {
    slug: 'boucherouitte',
    name: 'Boucherouitte',
    description: 'A recycled textile rug made from torn strips of used fabric — cotton, nylon, synthetic blends — knotted into a pile foundation. Originated in urban and peri-urban Morocco in the twentieth century as a domestic recycling practice that became a recognised art form in its own right.',
    spatial_character: 'Graphic, colourful, and irregular. No two boucherouitte rugs are the same. The palette is determined by the available materials, which produces unexpected chromatic combinations that no dye-based tradition would choose intentionally. Works best in a room that can absorb visual energy — against plain walls, with plain furniture.',
  },
]

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniques.find(t => t.slug === slug)
}
