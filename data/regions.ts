import type { Region } from '@/types'

export const regions: Region[] = [
  {
    slug: 'high-atlas',
    name: 'High Atlas',
    overview: 'The High Atlas mountains span central Morocco. The altitude, isolation, and seasonal extremes shaped a visual language that is geometric, precise, and spare.',
    visual_grammar: 'Compositions favour dense allover fields with interlocking diamond and lozenge grids. The palette tends toward undyed ivory and warm ochres, with indigo accents used sparingly. Borders are active rather than passive — they contain the field rather than merely frame it. Asymmetries are deliberate, not accidental.',
    technique_traditions: 'Primarily flatweave kilim and pile-knotted work. Wool is hand-spun from local flocks; natural dyes predominate in older pieces. The weaving is structural and precise, reflecting the discipline of a tradition passed through generations with minimal variation.',
  },
  {
    slug: 'haouz-plain',
    name: 'Haouz Plain',
    overview: 'The agricultural plain surrounding Marrakech. Proximity to the city brought new materials and influences without fully dissolving the local visual grammar.',
    visual_grammar: 'Softer and more curvilinear than the Atlas traditions. Warmer palette. More use of vegetable dyes including saffron, henna, and pomegranate. Brocaded and mixed-technique pieces are common. The influence of urban Marrakech is visible in some later pieces without dominating them.',
    technique_traditions: 'Mixed techniques are the norm: flatweave foundations with pile or brocaded supplementary weft. The Haouz plain produced some of the most technically complex domestic textiles in the region.',
  },
  {
    slug: 'anti-atlas',
    name: 'Anti-Atlas',
    overview: 'The arid, mineral-toned Anti-Atlas range running southwest toward the Sahara. Minimal palette, structural compositions, economy of means.',
    visual_grammar: 'Austere. Stripes and geometric registers with wide negative space. Undyed wool dominates. When colour appears, it is deliberate — a single accent in a composition that is otherwise completely neutral. The restraint is not poverty of means; it is a formal choice.',
    technique_traditions: 'Predominantly flatweave. Warp-faced techniques are common. The austerity of the material reflects the environment, and the best pieces have the quality of objects that could not have been made anywhere else.',
  },
  {
    slug: 'middle-atlas',
    name: 'Middle Atlas',
    overview: 'Beni Ourain country. The source of the ivory pile-knotted rugs that became one of the most recognised Moroccan textile types in the twentieth century. The reality of the tradition is considerably more varied than its global reputation.',
    visual_grammar: 'The iconic Beni Ourain rug — ivory ground, sparse dark geometric pattern, deep pile — is one register of Middle Atlas weaving, not the whole of it. The region also produced dense pile pieces with polychrome compositions, flatweaves, and transitional pieces that sit between the two.',
    technique_traditions: 'Deep-pile knotted work is the signature technique. Wool quality here is exceptional — the altitude and cold produce a dense, long-staple fleece that gives the pile its particular softness. Natural undyed ivory is the dominant ground.',
  },
  {
    slug: 'saharan',
    name: 'Saharan',
    overview: 'The pre-Saharan and Saharan south. Textiles shaped by nomadic life, trans-Saharan trade routes, and the visual cultures of communities who moved through the desert margins.',
    visual_grammar: 'Geometric, highly structured, and often deeply symbolic. The palette draws on the mineral colours of the landscape: rust, ochre, deep indigo, charcoal. Compositions are frequently directional — designed to be read from one end, not as an allover field.',
    technique_traditions: 'Flatweave is dominant. Many pieces were functional objects — tent dividers, saddle bags, floor coverings — and the construction reflects that: durable, reversible, built to travel.',
  },
]

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug)
}
