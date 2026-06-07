import type { Motif } from '@/types'

export const motifs: Motif[] = [
  {
    slug: 'lozenge',
    name: 'Lozenge',
    summary: 'The foundational geometric unit of Amazigh visual culture. Appears in weaving, jewellery, tattoo, and architecture across North Africa and the Sahara.',
    cultural_reading: 'The lozenge carries layered meanings across Amazigh communities: protection, fertility, the eye that deflects harm, the body of a woman. Its ubiquity is not decorative repetition but symbolic density — the same form holds multiple meanings simultaneously, activated by context and composition. A field of interlocking lozenges is not a pattern; it is a sustained invocation.\n\nThe nested lozenge — a smaller form inside a larger one — is among the most common compositions in High Atlas weaving. It is associated specifically with Ait Benhaddou and surrounding communities, and its particular proportions can be used to identify a rug\'s origin with some precision.',
    variant_forms: 'Nested lozenge, stepped lozenge, elongated lozenge, lozenge grid, open lozenge (outline only), lozenge with interior cross or diamond.',
    related_motif_slugs: ['broken-comb', 'stepped-cross'],
  },
  {
    slug: 'broken-comb',
    name: 'Broken Comb',
    summary: 'A border or field motif consisting of a comb or rake form interrupted at regular intervals. Common in High Atlas and Anti-Atlas flatweave.',
    cultural_reading: 'The comb motif is associated with domesticity and protection in Amazigh weaving: the comb was a domestic tool and a protective amulet simultaneously. The "broken" form — deliberately interrupted — is read by some scholars as a reference to incompleteness as protection against the evil eye. A perfect object invites envy; an interrupted one does not.\n\nThis logic of protective incompleteness runs through much of Amazigh material culture and is one reason why deliberate asymmetries and apparent "errors" in woven compositions should not be corrected or read as damage.',
    related_motif_slugs: ['lozenge'],
  },
  {
    slug: 'stepped-cross',
    name: 'Stepped Cross',
    summary: 'A cross form built from steps rather than diagonals, creating a staircase-like profile. Appears across North Africa and the pre-Islamic Mediterranean.',
    cultural_reading: 'The stepped cross appears across North Africa, sub-Saharan Africa, and pre-Islamic Mediterranean textiles. In Amazigh weaving, it carries cosmological resonance — the four directions, the cycle of seasons, the cardinal orientation of sacred space. It is among the oldest continuous motifs in the regional visual vocabulary, predating Islam and surviving in parallel with it.\n\nWhen it appears at the centre of a composition, it functions as an anchor. When it appears as a repeat field element, the reading shifts: the crosses become a grid, and the grid carries its own protective logic.',
    related_motif_slugs: ['lozenge'],
  },
  {
    slug: 'diamond-grid',
    name: 'Diamond Grid',
    summary: 'An allover repeat of diamond forms, each touching its neighbours at the corners to create a continuous field without ground. One of the most structurally complex Amazigh compositions.',
    cultural_reading: 'The diamond grid, unlike the lozenge field, leaves no ground: every part of the textile surface is covered by the pattern. This structural decision — no ground, no rest — is associated with maximum protective density. The entire surface is activated.\n\nIn High Atlas work, the diamond grid is often combined with interior elements: a cross, a smaller diamond, a dot. Each interior element adds a reading to the outer form. The complexity is intentional and cumulative.',
    related_motif_slugs: ['lozenge', 'stepped-cross'],
  },
  {
    slug: 'stripe-field',
    name: 'Stripe Field',
    summary: 'A composition organised by horizontal or vertical bands of colour and pattern. One of the oldest and most widespread weaving structures across the region.',
    cultural_reading: 'Stripe-field compositions are the default structure of many nomadic and semi-nomadic textiles in Morocco and across North Africa. The stripe is the natural unit of weft-faced flatweave: each band is a discrete section of work, and the composition grows incrementally as the weaver progresses.\n\nIn Amazigh traditions, stripe-field rugs are often more functional in origin than the dense geometric compositions — woven for daily use, floor covering, tent division. But some stripe-field pieces achieve formal heights that the more decorated compositions do not: the restraint itself becomes the content.',
    related_motif_slugs: [],
  },
]

export function getMotifBySlug(slug: string): Motif | undefined {
  return motifs.find(m => m.slug === slug)
}
