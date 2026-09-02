import type { Region } from '@/types'

// Voice: plain, warm, full sentences. Geography as the honest explanation for
// how a rug looks — altitude, isolation, trade, dye plants — not mysticism.
// Value-as-concept allowed where it teaches; no prices. No personification.

export const regions: Region[] = [
  {
    slug: 'high-atlas',
    name: 'High Atlas',
    overview: 'The high mountains across central Morocco. Cold, remote, and cut off for much of the year — and the weaving that came out of that isolation is tight, geometric, and disciplined.',
    visual_grammar: 'The High Atlas favours dense allover fields: interlocking diamonds and lozenge grids that cover the whole surface. The palette leans on undyed ivory and warm ochre, with indigo used sparingly as an accent. Borders do real work here, holding the field in rather than just framing it. Where a composition breaks its own symmetry, the break is deliberate.',
    technique_traditions: 'Mostly flatweave kilim and pile-knotted work. The wool is hand-spun from local flocks, and older pieces are natural-dyed. The weaving is precise and structural — a tradition passed down with little drift, and it shows in the control.',
  },
  {
    slug: 'haouz-plain',
    name: 'Haouz Plain',
    overview: 'The farmland around Marrakech. Being close to the city brought new materials and ideas within reach without erasing the local hand, so the weaving here sits between country and town.',
    visual_grammar: 'Softer and more curved than the mountain traditions, and warmer in colour. More vegetable dye — saffron, henna, pomegranate. Brocaded and mixed-technique pieces are common. You can see Marrakech leaking into some later pieces, but it rarely takes them over.',
    technique_traditions: 'Mixed techniques are normal: a flatweave foundation carrying pile or brocaded supplementary weft. Some of the most technically complex domestic textiles in Morocco were made on this plain, and that complexity is part of what a good Haouz piece is worth.',
  },
  {
    slug: 'anti-atlas',
    name: 'Anti-Atlas',
    overview: 'The dry, mineral-coloured range that runs southwest toward the Sahara. Little water, few dye plants, and a weaving tradition that turned that scarcity into a style: spare, structural, economical.',
    visual_grammar: 'Austere, and on purpose. Stripes and geometric bands with wide open space between them. Undyed wool dominates, and when a colour appears it is a single deliberate accent in an otherwise neutral field. The restraint is a choice, not a lack of means — and it is what makes the best Anti-Atlas pieces hard to mistake for anywhere else.',
    technique_traditions: 'Mostly flatweave, with warp-faced techniques common. The plainness of the materials follows the environment: the land is spare, and the weaving is spare with it.',
  },
  {
    slug: 'middle-atlas',
    name: 'Middle Atlas',
    overview: 'Beni Ourain country — the source of the ivory, deep-pile rugs that became one of the most recognised Moroccan textiles of the last century. The tradition on the ground is far more varied than that one famous look suggests.',
    visual_grammar: 'The ivory Beni Ourain rug — pale ground, sparse dark geometry, deep pile — is one register of Middle Atlas weaving, not all of it. The same region made dense polychrome pile pieces, flatweaves, and rugs that sit somewhere between the two. Reading past the reputation is how you understand what you are actually looking at.',
    technique_traditions: 'Deep-pile knotting is the signature. The wool is exceptional — the altitude and cold grow a dense, long-staple fleece, and that fleece is where the softness comes from. Undyed ivory is the usual ground, the colour of the wool itself.',
  },
  {
    slug: 'saharan',
    name: 'Saharan',
    overview: 'The pre-Saharan and Saharan south. The weaving here was shaped by moving — nomadic life, the old trans-Saharan trade routes, and the cultures that crossed the desert margins.',
    visual_grammar: 'Geometric and highly structured. The palette comes straight off the landscape: rust, ochre, deep indigo, charcoal. Many pieces are directional, built to be read from one end rather than as an allover field, which usually tells you they had a specific use and place.',
    technique_traditions: 'Flatweave dominates. A lot of what survives was functional — tent dividers, saddlebags, floor coverings — and it was built to match: durable, reversible, made to be packed up and carried.',
  },
]

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug)
}
