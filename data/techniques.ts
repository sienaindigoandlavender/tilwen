import type { Technique } from '@/types'

// Voice: plain, warm, useful. How the technique behaves and what it means for
// living with the rug. No mysticism, no personification, no price.

export const techniques: Technique[] = [
  {
    slug: 'flatweave-kilim',
    name: 'Flatweave — Kilim',
    description: 'A weft-faced flatweave: coloured weft threads pass over and under the warp until they cover it completely, and that is what makes the pattern. No pile, no knots. The result is flat, thin, and the same on both faces, so it is reversible. It is one of the oldest weaving techniques in the region, and a kilim has served as floor covering, wall hanging, and blanket all at once.',
    spatial_character: 'Flat and graphic in a room. It wears hard, sits well under furniture without a pile to crush, and reads boldly from across the room while still holding up close. It suits hard floors — stone, tile, bare wood. In a space that is already busy with texture, a flatweave gives the eye somewhere plain to rest.',
  },
  {
    slug: 'pile-knotted',
    name: 'Pile-Knotted',
    description: 'Individual knots of wool tied around the warp threads, row by row, then clipped to make a raised surface. The pile runs from low, close to the foundation, to high and deep. How densely the knots are tied sets how fine the pattern can be and how heavy the rug is.',
    spatial_character: 'Warm underfoot and quieter in a room — the pile takes the edge off sound the way a flatweave cannot, and it adds a depth of texture a flat rug does not have. It softens a space. It asks for a little more care under heavy furniture: a deep pile should not be permanently flattened by table or sofa legs.',
  },
  {
    slug: 'boucherouitte',
    name: 'Boucherouitte',
    description: 'A rug knotted from torn strips of used fabric — cotton, nylon, whatever was to hand — tied into a pile on a warp foundation, using the same knot as a wool pile rug. It grew up in and around Moroccan cities in the twentieth century as a way of making a rug from what a household already had.',
    spatial_character: 'Graphic, colourful, and irregular — no two are alike, because the palette is whatever fabric was available rather than anything a weaver chose from a range. It works best where a room can take the visual energy: plain walls, plain furniture, and let the rug do the talking. The fabric behaves differently from wool — it fades faster in strong light, so keep it out of direct sun.',
  },
]

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniques.find(t => t.slug === slug)
}
