import type { Motif } from '@/types'

// Voice: honest witness, not priest. Keep the documented structural facts —
// how a motif is built, where it appears, what it tells you about origin and
// use. Move the meaning-claims from asserted fact to reported-and-questioned:
// name who is doing the interpreting, and let the weaver's own "it's the shape
// my mother used" sit beside the collector's symbolism. No mysticism as fact.
// No price. No personification.

export const motifs: Motif[] = [
  {
    slug: 'lozenge',
    name: 'Lozenge',
    summary: 'The diamond. The most common shape in Amazigh (Berber) weaving, and the one you will hear the most stories about.',
    cultural_reading: `The lozenge is everywhere — in rugs, tattoos, silver, painted on walls — across North Africa. It is the base unit of the whole visual language, the shape everything else is built from or around.

You will be told it means protection, or fertility, or the eye that turns away harm, or a woman's body. You will be told this with great confidence, usually by someone selling the rug. Some of it may be true. The honest problem is that most of these fixed meanings cannot be traced back to the women who wove them. They were collected, and often assigned, by dealers and by European scholars in the last century, and then repeated until they hardened into fact. Ask an older weaver what a diamond means and she may tell you it protects. She may also shrug and say it is the shape her mother used, and her mother before that. Both answers are real. The mistake is printing only the first one.

What can be said plainly is structural, and it is more useful for reading a rug. A nested lozenge — one diamond inside another — is common in the High Atlas, and around Aït Benhaddou the proportions are specific enough to help place where a rug was made. An open lozenge, outline only, sits differently in the eye than a filled one. And a strict lozenge grid has no top or bottom — turn it any way and it reads the same — while a field of lozenges that shrink from one end was built to be seen from a particular direction, which tells you something about how it was meant to be used.

That is the part worth knowing. The rest is a story the market likes to tell, and you can enjoy it without mistaking it for a fact.`,
    variant_forms: 'Nested lozenge, stepped lozenge, elongated lozenge, lozenge grid, open lozenge (outline only), lozenge with interior cross, lozenge with interior diamond.',
    example_image: '',
    related_motif_slugs: ['broken-comb', 'stepped-cross', 'diamond-grid'],
  },
  {
    slug: 'broken-comb',
    name: 'Broken Comb',
    summary: 'A comb or rake form, deliberately interrupted. The clearest example of a real habit in Amazigh weaving — and a much-repeated theory about why.',
    cultural_reading: `The comb was a real tool, used to beat the weft down tight on the loom, and its shape turns up woven into borders as well as in tattoos and jewellery across the Maghreb. As a motif it is common and easy to recognise: a row of teeth, usually along a border rather than filling the field.

The interesting thing is that the comb is often woven broken — the teeth interrupted at one or more points. This is not sloppiness. The break is deliberate and repeated, and any weaver doing it is making a choice. The standard explanation is protective incompleteness: the idea that a perfect object attracts the evil eye, so the weaver leaves a flaw on purpose. You will read this everywhere as settled fact.

It is worth being honest about it. The habit of deliberate imperfection is real and well documented — weavers do leave breaks, open forms, skipped repeats. The tidy single reason — the evil eye, specifically — is an interpretation, and a popular one, but not something most weavers will state in those words if you ask. Some do hold it. Others simply learned to weave the comb that way. The safe thing to say is that the break is intentional; the meaning behind it is less fixed than the confident version suggests.

Where it helps to know this: the broken comb shows up most in High Atlas and Anti-Atlas flatweave, usually as a border. When you see the interruption, read it as a decision, not a mistake — and do not let anyone "restore" it out.`,
    variant_forms: 'Single-break comb, double-break comb, mirrored comb (break on both sides), comb with extended base, comb integrated into border stripe.',
    example_image: '',
    related_motif_slugs: ['lozenge', 'stripe-field'],
  },
  {
    slug: 'stepped-cross',
    name: 'Stepped Cross',
    summary: 'A cross built from steps rather than smooth lines — partly a choice, and partly what the loom will allow.',
    cultural_reading: `The stepped cross is old. Cross forms like it turn up across North Africa and the wider Mediterranean, and in Amazigh weaving the shape has been in continuous use for a very long time.

You will read that it stands for the four directions, or the seasons. Maybe. What is certain, and more useful, is that the stepped shape is partly the loom talking. In a flatweave you cannot make a clean diagonal — the structure forces you to climb in right-angled steps — so a cross woven in kilim comes out stepped whether or not the weaver means anything cosmic by it. The symbolic reading and the technical fact are not at war; the technique has its own logic, and the shape follows from it. That is worth remembering before you assign it too much intention.

How it is placed tells you more than what it "means." At the centre of a field, a stepped cross anchors the whole composition around one point. Repeated across a grid, it becomes texture rather than focus. In a lot of High Atlas work it hides inside a lozenge grid — from across the room the rug reads as diamonds, and only up close do you see a small cross sitting inside each one. That second layer, revealed on closer looking, is the real pleasure of the motif.`,
    variant_forms: 'Single stepped cross, stepped cross as repeat field element, stepped cross interior to lozenge, stepped cross with interior dot, bilateral stepped cross.',
    example_image: '',
    related_motif_slugs: ['lozenge', 'diamond-grid'],
  },
  {
    slug: 'diamond-grid',
    name: 'Diamond Grid',
    summary: 'An allover field of diamonds touching corner to corner, with no empty ground. As much a feat of tension control as a pattern.',
    cultural_reading: `A diamond grid leaves no rest. Where a lozenge field floats shapes on open ground, the grid covers the whole surface — every diamond shares its edges with its neighbours, edge to edge across the rug. You will hear this described as maximum protection, the idea being that a fully covered surface leaves no gap for harm. Take that as the market's reading, not the weaver's testimony.

What is not in doubt is that it is hard to weave. Because each diamond has to meet the next one exactly, the weft tension has to stay even across the full width of the rug. Let it wander and the joins go crooked, and you can see it. This is why the cleanest diamond-grid pieces are admired — the control is visible in the finished cloth. The skill is real and legible, which is a better reason to value the rug than any borrowed symbolism.

The grid often carries a second layer: a small cross, diamond, or dot set inside each unit. From a distance it reads as one uniform field; up close the interiors appear. Like the stepped cross hidden in a lozenge, it is a rug that keeps something back for the person who looks longer.`,
    variant_forms: 'Diamond grid (no interior), diamond grid with interior cross, diamond grid with interior diamond, diamond grid with interior dot, diamond grid with alternating interiors.',
    example_image: '',
    related_motif_slugs: ['lozenge', 'stepped-cross'],
  },
  {
    slug: 'stripe-field',
    name: 'Stripe Field',
    summary: 'A composition of horizontal bands — the plainest thing a flatweave can do, and one of the hardest to do well.',
    cultural_reading: `A stripe field is what a flatweave makes when the weaver simply changes colour at intervals. Each row of weft is a colour choice; change the choice at regular points and you get stripes. In that sense it is the most honest use of the technique — it works with the loom's grain instead of forcing a picture onto it.

The plainness is deceptive. The whole art is in the relationships: which colours, in what order, how wide each band, how a narrow stripe plays against a wide one, how much a single colour is allowed to vary within its band. A good stripe field works the way a piece of music does — the interest is in the intervals, not in any one note.

There is an old habit of filing stripe rugs as "just" everyday pieces — made fast, for the floor, for dividing a tent — as opposed to the dense ceremonial work. That is not wrong, but it is incomplete. Fast-and-functional does not mean lesser. Some stripe fields are composed with more care than some elaborate grids. The restraint is a decision, and when it is made well it becomes the whole point.

The Zanafi weavers of the Taznakht region make the best stripe fields in Morocco — bands of ochre, rust, ivory, and dark wool handled with a sense for colour that other Moroccan flatweave does not match.`,
    variant_forms: 'Uniform stripe field, graduated stripe field (widths vary), interrupted stripe field, stripe field with motif accents, banded stripe field.',
    example_image: '',
    related_motif_slugs: ['broken-comb'],
  },
  {
    slug: 'eye-form',
    name: 'Eye Form',
    summary: 'A concentric oval or pointed ellipse, usually read as an eye. One of the most confidently interpreted, and least verifiable, motifs.',
    cultural_reading: `The eye turns up across Amazigh material culture, and the story attached to it is consistent: it watches, and it turns a harmful gaze back on whoever sent it. In weaving it appears both plainly — a concentric oval with a dot at the centre — and folded into the interior of a lozenge or diamond.

This is the motif where the symbolism industry is loudest, so it is the one to read most carefully. The connection between the lozenge and the eye — the idea that a diamond is a stylised eye, a nested lozenge an eye with a pupil — is repeated everywhere as established. It may well be part of the tradition. It is also exactly the kind of neat, satisfying reading that collectors and writers favour, and it is very hard to confirm from the weavers themselves. Treat it as a plausible interpretation carried by the trade, not as a caption the maker wrote.

What you can observe without a theory: the explicit eye tends to sit in borders and at particular points — the ends of a border, the centre, the seam where field meets frame. Those are the places where two parts of the composition meet. Whether that placement is protective intent or simply where a small accent naturally goes, the pattern of placement is real and worth noticing.`,
    variant_forms: 'Concentric oval eye, pointed ellipse, eye integrated into lozenge interior, isolated eye as border accent.',
    example_image: '',
    related_motif_slugs: ['lozenge', 'broken-comb'],
  },
  {
    slug: 'asymmetry',
    name: 'Asymmetry',
    summary: 'A deliberate imbalance in an otherwise regular rug. Real, intentional, and routinely over-explained.',
    cultural_reading: `Look at enough Amazigh rugs and you find the breaks: one lozenge left open while the rest are filled, a border that stops short of closing, a repeat that skips a beat, a near-perfect mirror that fails at a single point. These are common enough, and consistent enough, that they are clearly not mistakes. A weaver who can hold an even diamond grid across a metre of cloth did not lose the thread on one lozenge by accident.

The usual explanation is protective humility: a perfect object invites envy, envy invites the evil eye, so the weaver spoils the perfection on purpose to stay safe. It is a good story and it may be true in places. But it is one explanation for a habit that probably has several — some weavers may mean exactly that, some may be following a form they were taught without naming a reason, some breaks may be improvisation. The deliberate part is well supported. The single tidy motive is the part to hold loosely.

The practical point matters more than the theory, and it is not in doubt: what looks like a flaw is often the most intentional thing in the rug, and "correcting" it in restoration — straightening the reversed lozenge, closing the open border — removes something real. If a piece has a deliberate break, leave it. Whatever it meant to the weaver, it was hers to put there.`,
    variant_forms: 'Single compositional break, isolated reversed element, incomplete border, uneven field balance, deliberate palette deviation.',
    example_image: '',
    related_motif_slugs: ['broken-comb', 'lozenge', 'eye-form'],
  },
  {
    slug: 'border',
    name: 'Border',
    summary: 'The frame at the edge of a rug. Often more than decoration, sometimes exactly decoration.',
    cultural_reading: `The border is the band that runs around the field. The common reading is that it is not decorative but protective — a woven boundary that closes the composition in and guards it, with the guarding motifs (combs, eyes, interlocking geometry) stationed at the edge because the edge is where a boundary is defended. It is a coherent idea, and it fits the way borders are built. Whether every weaver intends it that way, or some simply frame the field the way a picture gets a frame, is not something you can settle from the rug alone.

What you can read is the relationship between border and field, and it is one of the real decisions in a rug. Some pieces have no border at all — the field runs to the warp's end and the fringe is the only stop. Others carry several nested bands, each with its own motif. More borders is not automatically better; it is a choice about balance. A narrow, quiet border under a strong field says one thing; an elaborate border competing with the field says another. The rugs that hold up over time tend to be the ones where the two are in tension rather than one flattening the other.

So read the border for composition first. The protective story may be part of it. The balance is the part you can trust your own eye on.`,
    variant_forms: 'Single border, double border, triple nested border, guard stripe (narrow accent), comb-motif border, lozenge-chain border, stripe border.',
    example_image: '',
    related_motif_slugs: ['broken-comb', 'lozenge', 'stripe-field'],
  },
]

export function getMotifBySlug(slug: string): Motif | undefined {
  return motifs.find(m => m.slug === slug)
}
