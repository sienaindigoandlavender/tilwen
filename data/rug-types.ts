// Tilwen — rug type essays.
// Voice: plain, warm, full sentences. No price. No mysticism. No personification.
// "Amazigh (Berber)" on first mention, "Amazigh" after. The women are named.
// Images are served separately from Supabase (see lib/rug-type-images.ts);
// this file holds the text only.

export interface RugType {
  slug: string
  name: string
  short_definition: string
  origin: string
  technique: string
  palette: string
  description: string          // the essay
  buying_notes: string         // honest identification, no price
  commercial_warning?: string  // where the market dilutes the name
  region_slugs: string[]
  glossary_term_slugs: string[]
  language_note?: string
}

export const rugTypes: RugType[] = [

  {
    slug: 'beni-ourain',
    name: 'Beni Ourain',
    short_definition: 'The women of the Beni Ourain, an Amazigh (Berber) confederation in the Middle Atlas, weave the pale, deep-piled rug that carries their name — the one the modernists fell for.',
    origin: 'Beni Ourain (Aït Ouarain) confederation, Middle Atlas, Morocco',
    technique: 'Pile-knotted, symmetrical knot; wool pile on wool warp and weft',
    palette: 'Undyed ivory ground with sparse geometry in dark brown or near-black; older pieces sometimes carry a little ochre or terracotta',
    description: `The Beni Ourain are a group of Amazigh (Berber) communities spread across a wide stretch of the Middle Atlas. The name belongs to the people, not to a look — though the market has spent decades reducing it to one. Their sheep live high and cold, and the fleece that grows in that cold is long, soft, and heavy with lanolin. It takes light in a particular way. The ivory of a real Beni Ourain is not dyed. It is the colour the wool already was.

The pattern is spare. A wide pale field, then a handful of dark marks — lozenges, diamonds, a few crossed lines — set down with what looks like ease and is not. The placing is the whole art. Move one diamond and the rug goes slack. That restraint is why European architects took to these rugs in the middle of the last century; on a floor of steel and glass, a Beni Ourain reads almost like an abstract painting, and it softens the room without fighting it.

Older pieces, woven before the market swelled in the 1960s, are the ones to hold out for. The wool is better, the compositions freer, and some carry small protective marks — an eye, a broken border — that place them squarely in the older weaving world rather than the export one.`,
    buying_notes: `Real Beni Ourain wool is deep and soft, and the rug is heavy for its size — the weight is the tell. Hand-spun pile is never perfectly even; perfectly even pile came off a machine. Undyed ivory varies a little across the field. A flat, uniform white has usually been bleached or washed.`,
    commercial_warning: `No name in Moroccan weaving is copied more. A great deal of what sells as "Beni Ourain" is Beni Ourain-style work made for export, often in thinner wool with tidier, machine-regular geometry. Ask where the piece was sourced and whether it is vintage or new.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['beni-ourain', 'pile-knotted', 'lanolin', 'wool', 'hand-spun', 'vintage'],
    language_note: 'Beni Ourain, Beni Ouarain, Aït Ouarain (Tamazight). The name is a people, not a pattern. The trade has flattened it to the second thing.',
  },

  {
    slug: 'beni-mguild',
    name: "Beni M'Guild",
    short_definition: "The women of the Beni M'Guild, an Amazigh (Berber) confederation near Khenifra, weave a dense, deep-coloured pile rug that carries the same name as their tribe.",
    origin: "Beni M'Guild confederation, Middle Atlas (Khenifra), Morocco",
    technique: 'Pile-knotted; deep pile on wool foundation',
    palette: 'Burgundy, madder red, saffron, and a blue close to indigo, worked over ivory',
    description: `The Beni M'Guild live near Khenifra, high in the Middle Atlas. Their wool is the same thick mountain fleece the Beni Ourain use — soft, heavy, full of lanolin. The women weave it into rugs that fill the whole field with colour: reds, saffron, a blue close to indigo, with the ivory left to sit quietly behind it all.

The reds are what hold the rug together. The best of them come from madder root, which deepens as it ages and turns toward garnet over the decades. Synthetic red fades, or stays flat where it started, so an old madder red that has settled into the wool is the thing worth looking for.

The pattern is dense and closely ordered, and it takes a while to read — you have to sit with it before it opens up. Some of these rugs were never meant for the floor at all. They were woven for a wedding, and once you know that, they carry it.`,
    buying_notes: `The wool should feel soft and heavy in your hand, and the colour should run a little uneven, because hand-dyed wool always does. Pile that comes out perfectly even was made by a machine.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'lanolin', 'abrash', 'madder'],
    language_note: "Beni M'Guild, Beni Mguild, Aït M'Guild. The apostrophe stands for a glottal stop in the Tamazight name.",
  },

  {
    slug: 'beni-mrirt',
    name: "Beni M'Rirt",
    short_definition: "The weavers of M'Rirt, in Khenifra province, make some of the finest pile rugs in the Middle Atlas — dense fields of orange, terracotta, and ivory.",
    origin: "M'Rirt, Khenifra province, Middle Atlas, Morocco",
    technique: 'Pile-knotted; deep pile on wool warp and weft',
    palette: 'Deep orange, warm terracotta, and ivory; also red, brown, and cream in older natural-dye pieces',
    description: `M'Rirt is a town and a weaving tradition in the Khenifra province of the Middle Atlas. The rugs from here sit between two neighbours: more colourful than a Beni Ourain, more ordered than an Azilal. They are among the most finely knotted pile rugs in the Amazigh (Berber) world, tight enough to carry detailed pattern without giving up depth of pile.

The signature is the colour. A dense diamond field in deep orange and terracotta over ivory, the orange built from henna, saffron, and madder. In an old natural-dye piece that orange has had decades to settle, and it reaches a warmth that is hard to describe and harder to fake. It is one of the better colour experiences in Moroccan weaving.

The wool matches the best of the Middle Atlas, and the knotting is close. A good M'Rirt is tight and dense, and it sits on the floor with a real presence — it does not skate around like a thin, loosely woven piece.`,
    buying_notes: `The dense orange-terracotta-ivory field in natural dye is genuinely hard to copy; synthetic versions read colder and thinner. Look for close, even knotting on the back, deep wool, and colour that shifts slightly across the field.`,
    commercial_warning: `Not to be confused with the wider Beni M'Guild confederation, though both are Khenifra. Less exported than the famous names, so a piece attributed to M'Rirt is fairly likely to be what it says.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['mrirt', 'pile-knotted', 'natural-dye', 'wool', 'abrash'],
    language_note: "Beni M'Rirt (full name), M'Rirt, Mrirt. Both the town and the weaving.",
  },

  {
    slug: 'azilal',
    name: 'Azilal',
    short_definition: 'In the Azilal province of the High Atlas, Amazigh (Berber) women weave loose, bright, improvised rugs — the freest hand in Moroccan weaving.',
    origin: 'Azilal province, central High Atlas, Morocco',
    technique: 'Pile-knotted on wool or cotton foundation; some flatweave',
    palette: 'Bright pinks, oranges, yellows and reds over ivory; rare early pieces are quieter and natural-dyed',
    description: `Azilal is a province in the central High Atlas, southeast of Beni Mellal, and its weaving runs the opposite way from the disciplined High Atlas rugs to the west. Where those are precise, Azilal is loose. The women know the old geometric vocabulary and choose to work freely inside it, so the rugs come out asymmetric, improvised, and full of colour decisions no workshop would plan.

This is not naive work. The figures that turn up in some Azilal rugs — a simplified person, an animal, an object — belong to the weaver's own vocabulary, not to folk-art accident. The looseness is a choice made by someone who could have woven it tight.

The bright palette — hot pink, electric orange, acid yellow — came with synthetic dyes from the 1960s and 70s. That is not a mark against it. The Azilal weaver took the new colours and made them her own, and the best pieces have a chromatic intensity natural dye could never reach. Older, pre-synthetic Azilal is a quieter, rarer thing, closer to the wider High Atlas tradition it grew out of.`,
    buying_notes: `A real Azilal feels improvised — the composition looks generated rather than designed. Workshop copies fall into a regularity that gives them away. Ask where the piece was sourced, because a great deal of "Azilal" is Azilal-style work made elsewhere for the market.`,
    commercial_warning: `Azilal names the province, not a tribe. The label is now applied loosely to almost any colourful, loosely geometric Moroccan pile rug, much of it made for export rather than in Azilal.`,
    region_slugs: ['high-atlas'],
    glossary_term_slugs: ['azilal', 'pile-knotted', 'synthetic-dye'],
    language_note: 'Azilal names the province, not a tribe. The label is now applied loosely to almost any colourful, loosely geometric Moroccan pile rug.',
  },

  {
    slug: 'boujad',
    name: 'Boujad',
    short_definition: 'Around the town of Boujad in central Morocco, Amazigh (Berber) women weave bold, warm rugs in saturated reds and oranges — less copied than most, because fewer people know the name.',
    origin: 'Boujad, Khouribga province, central Morocco',
    technique: 'Pile-knotted; medium pile on wool foundation',
    palette: 'Saturated reds, warm oranges, saffron, and the odd indigo, over ivory',
    description: `Boujad is a town in the Khouribga province, and the rugs that carry its name have their own register: bolder than the strict geometry of the High Atlas, warmer than the pale Beni Ourain, with a visual energy that puts them near Azilal in feel. The women work from a vocabulary of forms — lozenges, stepped diagonals, open fields, the occasional figure — and arrange them with the confidence of a tradition, so even an improvised-looking piece feels settled.

The colour is the first thing you notice. A Boujad has warmth and saturation that give it presence in a room. In older pieces the reds and oranges came from madder and henna and have a depth current work cannot match; synthetic dye, which arrived mid-century, made the reds more uniform and more intense.

Boujad is less known abroad than Azilal or Beni Ourain, so it is copied less, and a piece attributed to it is more likely to be what it says it is.`,
    buying_notes: `The warmth and saturation of a real Boujad, plus its loose confidence, are hard to fake with cheap materials. Ask about wool quality, whether the dye is natural or synthetic, and about the provenance chain.`,
    region_slugs: ['haouz-plain'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'synthetic-dye', 'vintage', 'abrash'],
    language_note: 'Boujad names both the town and the rug. The tradition is sometimes filed under the wider Rehamna regional weaving of the Khouribga–Settat area.',
  },

  {
    slug: 'zemmour',
    name: 'Zemmour',
    short_definition: 'The women of the Zemmour, an Amazigh (Berber) confederation near Khemisset, weave dense, madder-red rugs of exceptional geometric precision — and the sequinned handira wedding blanket comes from here.',
    origin: 'Zemmour confederation, Khemisset and Tiflet, Middle Atlas plateau, Morocco',
    technique: 'Pile-knotted and flatweave; the handira (wedding blanket) tradition is central',
    palette: 'Deep madder red over ivory and dark brown, with occasional indigo',
    description: `The Zemmour are an Amazigh (Berber) confederation whose land spreads across the Khemisset and Tiflet areas north of Rabat. Their weaving is held to be among the finest in Morocco: dense, complex, and worked with a precision that takes real skill, all anchored by the deep red that has become the mark of Zemmour work.

The compositions run edge to edge — interlocking lozenges, diamond grids, stepped forms and elaborate borders — worked fine enough to hold detail without losing the punch of that red. The pleasure of a Zemmour is watching strict geometry come out warm.

The red is the signature. In old pieces it is madder root, and well-kept madder ages toward garnet rather than dulling to brick — it deepens instead of fading, which is one way to read natural dye in this tradition. The Zemmour handira is the other famous thing: the ceremonial wedding blanket, made by the bride and her female relatives, sewn with small metal discs meant to protect, worn at the wedding and used in the house afterward. A handira is a record of one occasion in one life, not a floor covering, and it reads that way.`,
    buying_notes: `Zemmour is easier to attribute than most — the specific red and the precision are hard to fake. In an old piece, look for madder red that has aged toward garnet, close even knotting, and deep wool.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['zemmour', 'pile-knotted', 'handira', 'natural-dye', 'madder', 'protective-motif'],
    language_note: 'Zemmour (French/English), Izemmour (Tamazight plural). The name is the people; the weaving carries it.',
  },

  {
    slug: 'zayan',
    name: 'Zayan',
    short_definition: 'The women of the Zayan, an Amazigh (Berber) confederation near Khenifra, weave bold rugs in warm ochre and deep red — from a people who held out against the French until 1921.',
    origin: 'Zayan confederation, western Middle Atlas, Khenifra region, Morocco',
    technique: 'Pile-knotted; medium to high pile on wool foundation',
    palette: 'Warm ochre, deep red, dark brown-black, and ivory',
    description: `The Zayan hold the western Middle Atlas around Khenifra — the same mountains as the Beni M'Guild and Zemmour, but their own people with their own history. They were among the last Amazigh (Berber) communities to resist French control, holding out until 1921 under Moha ou Hammou Zayani. That is not background colour. These rugs were woven by a community keeping its own terms against steady pressure, and the work has that self-possession in it.

The compositions are large and direct — lozenges, stepped diamonds, chevrons — in warm ochre, deep madder red, and dark wool over ivory. Less crowded than a Zemmour, less varied than a Beni M'Guild, a Zayan gets its authority from confidence rather than elaboration.

The protective marks are here too. A lozenge is not just a shape; it is placed where it is meant to be placed, in the number it is meant to appear. Old pieces are natural-dyed — walnut and pomegranate for the dark browns, madder for the red, saffron for the ochre — and the gap between a natural and a synthetic Zayan is wide.`,
    buying_notes: `Lower name recognition means less incentive to fake, so attribution is fairly reliable. Look for the specific ochre-and-red palette, large confident geometry, deep wool, and natural dye in older pieces.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'protective-motif'],
    language_note: 'Zayan (French/English), Zaiane, Izayan (Tamazight). Named for the people. Khenifra is the centre of their land.',
  },

  {
    slug: 'talsint',
    name: 'Talsint',
    short_definition: 'In the eastern High Atlas near the Algerian border, Amazigh (Berber) women weave bold, graphic rugs in deep red and brown — one of the most isolated weaving traditions in Morocco, which no export market ever reshaped.',
    origin: 'Talsint region, eastern High Atlas, Figuig province, Morocco',
    technique: 'Pile-knotted; medium pile on wool foundation',
    palette: 'Deep red, dark brown, and ivory — strong contrast, narrow range',
    description: `Talsint sits in the eastern High Atlas near the Algerian border, in one of the remotest weaving regions in Morocco. The nearest town of any size is Figuig, an oasis on the border that works more as a crossing than a market. That distance — from Marrakech, from Fes, from the export channels that reshaped the Beni Ourain and Azilal trades — is the defining fact about Talsint weaving. No outside eye shaped it. No export demand bent it. The women wove for themselves, in a community whose isolation kept a visual language that commerce has worn away almost everywhere else.

The result is direct and graphic. Large lozenges, stepped diamond fields, strong horizontal bands, in deep red and dark brown over ivory, at a scale bigger than the finer Middle Atlas work. These are rugs that announce themselves.

The protective marks are serious here. The lozenges are large and deliberately placed, unmistakable, meant to work. Old pieces are natural-dyed — madder for the red, walnut and iron for the browns, undyed local wool for the ivory — and because synthetic dye reached this region late, genuine pre-synthetic Talsint is materially distinct.`,
    buying_notes: `Talsint is rare abroad, and what circulates is more likely genuine than most — there is little market for faking a name few people ask for. Look for large deliberate geometry, deep natural-dyed red and brown, and undyed ivory wool.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'protective-motif', 'vintage'],
    language_note: 'Talsint (French/English), naming the town and region in Figuig province. Sometimes filed under broader eastern High Atlas or eastern Morocco headings.',
  },

  {
    slug: 'taznakht',
    name: 'Taznakht',
    short_definition: 'Taznakht is not a tribe but a market — a weekly souk in the Draa valley where the flatweaves of the southern Atlas meet commerce, in warm ochres and rusts.',
    origin: 'Taznakht, Draa valley, Ouarzazate province, southern Morocco',
    technique: 'Weft-faced flatweave kilim; some supplementary-weft and mixed-technique pieces',
    palette: 'Ochre, rust, deep terracotta, warm brown, ivory, and the occasional indigo',
    description: `Taznakht is a market, not a tribe — a weekly souk in a small Draa-valley town where routes from Ouarzazate, the Anti-Atlas, and the High Atlas foothills meet. For generations the women of the surrounding communities have brought their flatweaves here to sell, and the town has become the name for the work it gathers. So a Taznakht rug is a place, not a people. It tells you where the piece entered the market, not always who wove it.

That is more honest than many labels, not less. The Taznakht souk is a real, traceable point of sale. A piece bought there has a shorter chain than one that has passed through Marrakech export channels, and it arrives as the weaver left it — unwashed, untrimmed.

Most Taznakht flatweaves are Zanafi stripe compositions: bands of ochre, rust, terracotta, and ivory, the natural output of a horizontal loom and a southern-Atlas dye palette. But the wider production takes in mixed-technique and transitional pieces too. What holds them together is the palette and the build: well-spun wool, evenly beaten weft, clean colour changes.`,
    buying_notes: `Taznakht is one of the few places where buying near the source is genuinely possible. A souk piece is close to the weaver, before the washing and trimming export channels apply. Look for even weft, substantial wool, and clean stripe edges.`,
    commercial_warning: `A place name, not a tribe. "Taznakht" tells you where a piece was sold, not necessarily who wove it — which is worth knowing rather than a mark against it.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['taznakhte', 'zanafi', 'flatweave', 'kilim', 'cooperative', 'natural-dye', 'provenance'],
    language_note: 'Taznakht (common spelling), Taznaght (closer to the Tamazight), Taznakhte. A place name and administrative centre, not a tribe.',
  },

  {
    slug: 'zanafi',
    name: 'Zanafi',
    short_definition: 'A striped flatweave from the Draa valley where every row is a colour decision — the plainest construction in Moroccan weaving, and one of the most honest.',
    origin: 'Taznakht region, Draa valley, southern Morocco, and surrounding Atlas communities',
    technique: 'Weft-faced flatweave; the stripes are the natural result of changing weft colour on a vertical loom',
    palette: 'Horizontal bands of ochre, rust, terracotta, warm brown, ivory, and the occasional indigo',
    description: `The Zanafi is the most transparent of the Moroccan flatweaves: horizontal stripes of varying width and colour run the full width of the cloth, and the whole composition is just the weaver's colour choices as she changes weft at each new band. No hidden geometry, no symbolic reading to decode. The power of a Zanafi is colour and rhythm — which colours, in what order, at what width.

That plainness is deceptive. The best Zanafi weavers make fine judgements: the ratio of wide band to narrow, an accent set against a ground, a run of stripes that builds tension and then resolves it. A Zanafi that looks obvious at a glance turns out, the longer you look, to be exactly right in a way that is hard to explain.

Because the stripes are the structure, a Zanafi lies hard and flat and reads as a graphic object. It sits under furniture without a pile to crush, and it goes into a room the way a plain, strong pattern does. In old natural-dyed pieces — saffron, madder, henna, walnut, pomegranate, indigo — the colour looks as though it came out of the landscape. In a sense it did.`,
    buying_notes: `A Zanafi is hard to fake cheaply. Look for even weft (uneven beating makes the stripes wobble), a substantial, dense cloth, clean edges where the colours change, and, in old pieces, the soft settled quality of natural dye.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['zanafi', 'taznakhte', 'flatweave', 'kilim', 'weft-faced', 'natural-dye'],
    language_note: 'Zanafi (common spelling), Zennafi. Used in both Moroccan Arabic and French trade contexts.',
  },

  {
    slug: 'boucherouitte',
    name: 'Boucherouitte',
    short_definition: 'A rug made from torn clothing — cotton, nylon, whatever was in the house. The palette was not chosen. It happened.',
    origin: 'Urban and peri-urban Morocco — Marrakech, Casablanca and around — and some rural Atlas communities',
    technique: 'Pile-knotted with strips of recycled fabric instead of wool yarn, tied with the same knot as a wool pile rug',
    palette: 'Whatever the available scraps were — unpredictable, often intense combinations no dye plan would produce',
    description: `Boucherouitte is not a region or a tribe. It is a practice: making a rug from whatever cloth is at hand. The word comes from Moroccan Arabic, bu chourit, roughly "from torn clothing." The result is, in plain material terms, the most honest rug in Morocco — literally made from what was there, by someone who needed a rug and had no wool to spare.

The practice is old, but the boucherouitte that draws collectors now is mostly mid-to-late twentieth century, when growing cities put cast-off clothing within reach of women who wove — factory offcuts, secondhand European clothes, household scraps. That is where the wild colour comes from: European synthetics in shades no Moroccan dye tradition would make, thrown in with local cotton and wool.

The compositions run from familiar geometry in fabric strips to something genuinely abstract, where the weaver worked with the colours she happened to have. A pink nylon strip, a dark green cotton, a piece of faded denim — no one chose that from a palette. It happened, and often it works in ways a chosen palette would not. The material behaves differently from wool: uneven surface, more give, and it fades faster in the sun, so keep it out of hard light.`,
    buying_notes: `Much of what sells as boucherouitte now is made for export with a curated palette — the colours agree too well, the pattern is too tidy. A piece from a real domestic practice has an unpredictability the export version cannot fake. Ask whether the palette was chosen or found.`,
    commercial_warning: `A practice, not a place. Widely reproduced for export with deliberately pleasing colour schemes; the genuine article looks found, not designed.`,
    region_slugs: ['haouz-plain'],
    glossary_term_slugs: ['boucherouitte', 'pile-knotted', 'recycled-textile'],
    language_note: 'Boucherouitte (most common), boucherouite, bouchrouite. From Moroccan Arabic bu chourit — "from torn cloth."',
  },

]

export function getRugTypeBySlug(slug: string): RugType | undefined {
  return rugTypes.find(t => t.slug === slug)
}
