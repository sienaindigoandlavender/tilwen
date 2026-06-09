import type { Motif } from '@/types'

export const motifs: Motif[] = [
  {
    slug: 'lozenge',
    name: 'Lozenge',
    summary: 'A diamond form that carries layered meanings across weaving, jewellery, tattoo, and architecture throughout North Africa. The foundational unit of Amazigh visual culture.',
    cultural_reading: `The lozenge carries layered meanings across Amazigh communities: protection, fertility, the eye that deflects harm, the body of a woman. Its ubiquity is not decorative repetition but symbolic density. The same form holds multiple meanings simultaneously, activated by context and composition. A field of interlocking lozenges is not a pattern. A sustained invocation.

The nested lozenge — a smaller form inside a larger one — is among the most common compositions in High Atlas weaving. It is associated specifically with Ait Benhaddou and surrounding communities, and its particular proportions can be used to identify a rug's origin with some precision. Where a standard lozenge grid is distributed evenly across many Amazigh traditions, the nested form with these exact proportions is a regional signature.

The open lozenge — outline only, no fill — carries different weight from the filled form. The open centre is sometimes read as an eye: the outline defines the gaze but does not occupy it, leaving the interior as a space of potential rather than a statement of protection. The filled lozenge asserts; the open lozenge watches.

Lozenge compositions can be directional or non-directional. A rug with a strict lozenge grid has no single correct orientation — any rotation reads the same. A rug with elongated lozenges that diminish in scale from one end has been designed to be read from a specific direction, which implies a specific use and placement.`,
    variant_forms: 'Nested lozenge, stepped lozenge, elongated lozenge, lozenge grid, open lozenge (outline only), lozenge with interior cross, lozenge with interior diamond, elongated lozenge field, asymmetric lozenge (protective incompleteness variant).',
    example_image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    related_motif_slugs: ['broken-comb', 'stepped-cross', 'diamond-grid'],
  },
  {
    slug: 'broken-comb',
    name: 'Broken Comb',
    summary: 'A comb or rake form deliberately interrupted. One of the clearest expressions of the Amazigh principle that incompleteness protects.',
    cultural_reading: `The comb motif is associated with domesticity and protection in Amazigh weaving: the comb was a domestic tool and a protective amulet simultaneously. It appears in woven borders, jewellery, and tattoo traditions across the Maghreb. Its presence in a textile marks the domestic space as protected.

The "broken" form — deliberately interrupted at one or more points — is read by scholars as an expression of protective incompleteness: the principle that a perfect object invites the evil eye, while an interrupted one does not. The break is not an error. It is a formal decision made by the weaver within a tradition that understands incompleteness as a protective strategy.

This logic runs through much of Amazigh material culture. Deliberate asymmetries and apparent "errors" in woven compositions — a single lozenge left open, a border that does not close, a repeat that skips a beat — are not accidents to be corrected or dismissed as the product of limited skill. They are the content of the object, not its failure. A weaver working in this tradition knows what she is doing when she stops a border short.

The broken comb appears most frequently in High Atlas and Anti-Atlas flatweave, typically as a border element rather than a field composition. When it appears in the field, it tends to be combined with lozenge or stripe elements — rarely as the sole compositional logic.`,
    variant_forms: 'Single-break comb, double-break comb, mirrored comb (break on both sides), comb with extended base, comb integrated into border stripe.',
    example_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    related_motif_slugs: ['lozenge', 'stripe-field'],
  },
  {
    slug: 'stepped-cross',
    name: 'Stepped Cross',
    summary: 'A cross form built from steps rather than curves. Among the oldest continuous motifs in North African material culture.',
    cultural_reading: `The stepped cross appears across North Africa, sub-Saharan Africa, and pre-Islamic Mediterranean textiles. In Amazigh weaving, it carries cosmological resonance — the four directions, the cycle of seasons, the cardinal orientation of sacred space. It is among the oldest continuous motifs in the regional visual vocabulary, predating Islam and surviving alongside it for over a millennium.

The stepped form — built from right-angle increments rather than diagonal lines — is the natural expression of the cross within a weft-faced flatweave structure. You cannot weave a true diagonal in a kilim without creating a stepped approximation of it; the stepped cross is therefore both a symbolic choice and a formal consequence of the technique. The two things are not in conflict. The technique has its own logic, and that logic aligns with a compositional decision that carries meaning.

When the stepped cross appears at the centre of a composition, it functions as an anchor — the entire field organised around a single cosmological axis point. When it appears as a repeat element in an allover grid, the reading shifts: the crosses become a distributed protective field rather than a single cosmological centre.

In High Atlas compositions, the stepped cross often appears as a secondary element within a lozenge grid — positioned at the interior of each lozenge, giving the composition a second layer of meaning that only becomes legible on close examination. At distance, the rug reads as a lozenge field; at close range, the crosses appear inside each lozenge.`,
    variant_forms: 'Single stepped cross, stepped cross as repeat field element, stepped cross interior to lozenge, stepped cross with interior dot, bilateral stepped cross (reads in two directions).',
    example_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    related_motif_slugs: ['lozenge', 'diamond-grid'],
  },
  {
    slug: 'diamond-grid',
    name: 'Diamond Grid',
    summary: 'An allover field of diamond forms touching at every corner. No ground. The entire surface activated.',
    cultural_reading: `The diamond grid, unlike the lozenge field, leaves no ground: every part of the textile surface is covered by the pattern. This structural decision — no ground, no rest — is associated with maximum protective density. The entire surface is activated. There is no neutral space.

In High Atlas work, the diamond grid is often combined with interior elements: a cross, a smaller diamond, a dot. Each interior element adds a reading to the outer form. The complexity is intentional and cumulative — each compositional decision layers meaning onto the previous one. The diamond grid alone is protective; the diamond grid with stepped-cross interiors is protective at two scales simultaneously.

The diamond grid is among the most technically demanding Amazigh flatweave compositions. Because each diamond must share its edges exactly with its neighbours, the weft tensions must be consistent across the full width of the textile. Variations in tension produce visible irregularities at the joins — which is one reason why the most accomplished diamond-grid pieces are among the most highly valued. The technical discipline required to execute the composition correctly is itself a form of meaning: the weaver's control of the structure is legible in the finished object.

At a distance, the diamond grid reads as a uniform pattern. Close up, the interior elements become visible. The composition rewards sustained attention — which is one reason why pieces that carry it tend to remain interesting in a room over time.`,
    variant_forms: 'Diamond grid (no interior), diamond grid with interior cross, diamond grid with interior diamond, diamond grid with interior dot, diamond grid with alternating interior elements.',
    example_image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
    related_motif_slugs: ['lozenge', 'stepped-cross'],
  },
  {
    slug: 'stripe-field',
    name: 'Stripe Field',
    summary: 'A composition organised by horizontal bands of colour. The natural unit of weft-faced flatweave. In its most accomplished forms, restraint becomes the content.',
    cultural_reading: `Stripe-field compositions are the structural default of weft-faced flatweave: each row of weft is a colour decision, and if those decisions change at regular intervals, the result is stripes. In this sense, the stripe field is the most honest possible expression of the kilim technique — it uses the structure's natural logic rather than imposing a pictorial programme onto it.

This apparent simplicity conceals considerable complexity. The question for a stripe-field weaver is not whether to make stripes but how to manage the relationships between them: the sequence of colours, the width of each band, the variation within a single colour area, and the relationships between narrow and wide stripes. The best stripe-field pieces have the quality of pieces of music — the interest comes from the relationships between elements, not from the complexity of any single element.

Stripe-field compositions are often associated with functional domestic production — the pieces made quickly for daily use, for floor covering, for tent division — as opposed to the ceremonial or display pieces with dense geometric compositions. This association is not wrong, but it is incomplete. The distinction between functional and ceremonial, between fast and slow production, does not map cleanly onto aesthetic quality. Some stripe-field pieces are more carefully composed than some lozenge-grid pieces. The restraint is a choice, and when executed with intention, it becomes the content.

The Zanafi tradition of the Taznakhte region produces the most accomplished stripe-field compositions in Moroccan weaving — horizontal bands of ochre, rust, ivory, and dark wool managed with a palette sensitivity that has no parallel in other Moroccan flatweave traditions.`,
    variant_forms: 'Uniform stripe field, graduated stripe field (widths vary), interrupted stripe field, stripe field with motif accents, banded stripe field (groups of stripes separated by narrow dividers).',
    example_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    related_motif_slugs: ['broken-comb'],
  },
  {
    slug: 'eye-form',
    name: 'Eye Form',
    summary: 'A concentric oval or pointed ellipse. One of the most direct expressions of the protective gaze in Amazigh textile symbolism.',
    cultural_reading: `The eye form appears across Amazigh material culture as one of the primary protective symbols: the eye that watches, deflects harm, and returns the evil gaze to its source. In textile compositions, it appears both as an explicit form — a concentric oval with a central point or dot — and as an implied form within the interior of a lozenge or diamond.

The relationship between the lozenge and the eye is intentional and consistent. In Amazigh symbolic vocabulary, the lozenge is frequently read as a stylised eye, and the two forms are compositionally interchangeable in some contexts. The pointed ellipse of a lozenge can be read as an eye viewed from the front; the nested lozenge can be read as an eye with a pupil.

The explicit eye form — without the geometric scaffolding of the lozenge — tends to appear in border compositions and as isolated protective elements rather than as the primary field motif. Its placement is typically in positions of structural importance: at the ends of a border, at the centre of a composition, or at the junction between field and border. These are the points of structural vulnerability — where two compositional elements meet or where the textile transitions from one register to another.

Understanding the eye form alongside the lozenge reveals that many Amazigh woven compositions carry layers of symbolic redundancy: the lozenge grid is also an eye field; the protective incompleteness of the broken-comb border addresses the evil eye from a different formal direction. The composition doesn't choose between symbolic strategies — it deploys all of them simultaneously.`,
    variant_forms: 'Concentric oval eye, pointed ellipse, eye with radiating lashes (rare), eye integrated into lozenge interior, isolated eye as border accent.',
    related_motif_slugs: ['lozenge', 'broken-comb'],
  },
  {
    slug: 'asymmetry',
    name: 'Asymmetry',
    summary: 'The deliberate introduction of imbalance into an otherwise regular composition. The most misunderstood formal decision in Amazigh weaving.',
    cultural_reading: `Asymmetry in Amazigh weaving is not error. It is a formal decision made within a tradition that understands incompleteness as a protective strategy. The same logic that produces the broken-comb and the open lozenge.

The most common forms of deliberate asymmetry: a lozenge left open while all others are filled; a border that terminates before completing its full cycle; a repeat that skips one beat; a composition that mirrors almost perfectly except at one point. Each of these is a controlled deviation from a regular order, inserted by a weaver who knows exactly what she is doing.

The cultural logic: a perfect object is envied. An envied object attracts the evil eye. The deliberate flaw creates an imperfection that protects the maker and owner from the consequences of producing something too beautiful. It is protective humility rendered in woven form.

This has practical consequences for how we read vintage pieces. What looks like a mistake — a single reversed lozenge, an interrupted border, a composition that appears to have "gone wrong" at one point — may be the most intentional decision in the entire object. The flaw is not where the maker lost control. It is where she exercised it most precisely.

This also means that restoration of these "errors" — straightening the reversed lozenge, completing the interrupted border — destroys the meaning of the object. Well-meaning restoration that removes asymmetry is worse than no restoration, because it eliminates the cultural content along with the apparent imperfection.`,
    variant_forms: 'Single compositional break, isolated reversed element, incomplete border, uneven field balance, deliberate palette deviation.',
    related_motif_slugs: ['broken-comb', 'lozenge', 'eye-form'],
  },
  {
    slug: 'border',
    name: 'Border',
    summary: 'The framing element at the edge of a woven composition. Not decorative in origin. It defines the boundary between the domestic interior and what lies outside it.',
    cultural_reading: `The border in Amazigh textile tradition is not decoration applied to a finished composition. It is a structural element with a protective function: it defines the boundary of the domestic space represented by the textile, and it contains the field composition within a protected perimeter.

The logic is spatial and symbolic simultaneously. A rug placed in a domestic interior defines a portion of that space as distinct — elevated, protected, significant. The border reinforces this: it is the line between the interior of the composition and the exterior world. The motifs placed in the border — comb forms, eye forms, geometric interlocking patterns — are specifically protective in their register, stationed at the boundary precisely because that is where protection is most needed.

Border complexity varies significantly. Some Amazigh pieces have no border at all — the field composition runs to the edge of the warp, and the fringe is the only termination. Others have multiple nested borders, each with a distinct motif register, creating a layered protective perimeter. The number of borders and the complexity of their motifs is not always proportional to quality — it is a compositional choice that reflects the tradition and intention of the specific piece.

The relationship between field and border is one of the primary compositional decisions in Amazigh weaving. A narrow, simple border subordinated to a powerful field is a different statement from an elaborate border that competes with the field for attention. The pieces that achieve the most powerful compositional balance — where field and border are in productive tension rather than either dominating — are the ones that sustain attention over time.`,
    variant_forms: 'Single border, double border, triple nested border, guard stripe (narrow accent border), comb-motif border, lozenge-chain border, stripe border.',
    related_motif_slugs: ['broken-comb', 'lozenge', 'stripe-field'],
  },
]

export function getMotifBySlug(slug: string): Motif | undefined {
  return motifs.find(m => m.slug === slug)
}
