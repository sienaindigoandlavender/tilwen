export interface RugType {
  slug: string
  name: string
  short_definition: string
  origin: string           // Geographic or tribal origin
  technique: string        // Primary technique(s)
  palette: string          // Characteristic palette
  description: string      // Full description — 3-5 paragraphs
  buying_notes: string     // Honest buying intelligence
  commercial_warning?: string  // Where commercial dilution exists
  region_slugs: string[]
  glossary_term_slugs: string[]
  language_note?: string
}

export const rugTypes: RugType[] = [

  {
    slug: 'azilal',
    name: 'Azilal',
    short_definition: 'A High Atlas rug tradition characterised by abstract, improvisational geometric compositions and strong colour — named for the province in the central High Atlas southeast of Beni Mellal.',
    origin: 'Azilal province, central High Atlas, Morocco',
    technique: 'Pile-knotted on wool or cotton foundation; some flatweave examples exist',
    palette: 'Strong colour contrasts — synthetic oranges, pinks, yellows, and reds against ivory or cream grounds; natural dye examples are rare and earlier in date',
    description: `Azilal rugs come from the province of that name in the central High Atlas, a mountainous region southeast of Beni Mellal whose Amazigh communities developed a weaving tradition markedly distinct from the more formally structured High Atlas conventions to the west. Where the classic High Atlas kilim achieves authority through geometric precision and compositional discipline, Azilal work is characterised by what might be called compositional confidence — an improvisational freedom that produces asymmetric arrangements, bold colour decisions, and a willingness to depart from established repeat structures.

The compositions are not naive. They are the product of weavers who understand the geometric vocabulary of the Amazigh tradition and choose to work loosely within it rather than to its strictest conventions. The occasional figurative elements — simplified human forms, animals, objects — that appear in some Azilal pieces are not folk art intrusions; they belong to a tradition in which the weaver's personal symbolic vocabulary is legitimately part of the work.

Synthetic dyes are characteristic of Azilal work from the mid-twentieth century onward, and the bright palette associated with the style — the hot pinks, electric oranges, and acid yellows — is a product of commercial dye availability from the 1960s and 1970s. This is not a disqualification. The Azilal weaver's relationship to synthetic colour is not one of substitution — replacing a natural dye palette with a cheaper approximation — but one of appropriation, taking new materials and making them distinctively her own. The best Azilal pieces have a chromatic intensity that could not have been achieved with natural dyes, and they are all the more interesting for it.

Older Azilal pieces — pre-1960, with natural or early synthetic dyes — are a different matter entirely. The palette is quieter, the compositions often more formally structured, and the cultural continuity with the broader High Atlas tradition is more legible. These are rare and command significant premiums over the post-synthetic production that dominates the market.`,
    buying_notes: `The Azilal aesthetic has been heavily commercialised. A large portion of what is sold as "Azilal" in Marrakech souks and through export channels is not from Azilal province at all — it is Azilal-style work produced in workshops or cooperatives, often in Casablanca, Kenitra, or by individual weavers in regions that have adopted the looser, colourful Azilal aesthetic for its commercial appeal. Authentic Azilal pieces have a specific quality of improvisation that is difficult to reproduce on commission — the compositions feel generated rather than designed. Workshop copies tend toward a regularity that betrays their made-for-market origins. Provenance documentation matters considerably here.`,
    commercial_warning: `The "Azilal" label is applied generically to any colourful, loosely geometric Moroccan pile rug regardless of origin. Ask specifically where the piece was sourced and whether that provenance can be documented.`,
    region_slugs: ['high-atlas'],
    glossary_term_slugs: ['azilal', 'pile-knotted', 'synthetic-dye', 'tribal-attribution'],
  },

  {
    slug: 'beni-ourain',
    name: 'Beni Ourain',
    short_definition: 'The most internationally recognised Moroccan rug type — a deep-pile, ivory-ground piece with sparse geometric patterning from the Beni Ourain tribal confederation of the Middle Atlas.',
    origin: 'Beni Ourain tribal confederation, Middle Atlas, Morocco',
    technique: 'Pile-knotted, symmetrical (Ghiordes) knot; wool pile on wool warp and weft',
    palette: 'Natural undyed ivory ground with sparse geometric patterning in dark brown or near-black; occasionally with terracotta or ochre accents in older pieces',
    description: `The Beni Ourain are an Amazigh tribal confederation of the Middle Atlas whose pile-knotted rugs became one of the most widely recognised Moroccan textile types in the world — taken up by European modernist designers and architects in the mid-twentieth century, admired by Le Corbusier, and subsequently pervasive in the international interior design market. The name refers to a people, not a style. The Ait Ouarain confederation encompasses multiple communities across a substantial area of the Middle Atlas, and their weaving tradition, while coherent, is more varied than the single aesthetic now marketed under their name.

The authentic Beni Ourain rug has specific material characteristics that no imitation fully replicates. The wool comes from high-altitude Middle Atlas sheep whose fleece, grown in cold winters at elevation, produces a pile of exceptional depth and softness — a lanolin-rich, long-staple yarn with a particular way of taking and reflecting light. The natural ivory ground is not dyed: it is the natural colour of the undyed fleece. The dark brown or near-black patterning is either naturally dark fleece or, in some pieces, modestly dyed. The pile is deep — typically 15–25mm — and the knot structure is relatively coarse, which is appropriate to the bold geometric vocabulary of the compositions.

The compositions themselves are among the most spare in the Moroccan Amazigh tradition. A large ivory field occupied by a handful of lozenges, diamonds, or crossed lines, arranged with apparent casualness but actually with considerable compositional intelligence — the placement of each element in relation to the empty field is never accidental. This compositional restraint is what made Beni Ourain rugs legible to modernist interiors: they are, in formal terms, closer to abstract painting than to the dense all-over patterning of most traditional pile rugs.

Older pieces — pre-1960, before the commercial market for Beni Ourain rugs inflated production — often have more varied compositions, occasional colour beyond the ivory-and-dark binary, and a material character that the newer commercial production cannot approach. Some vintage Beni Ourain pieces include symbolic elements — lozenge forms, eye forms, broken borders — that situate them clearly within the protective motif tradition of Amazigh weaving, giving them a cultural depth that the purely aesthetic reading misses.`,
    buying_notes: `The Beni Ourain category is the most commercially diluted in Moroccan rug retail. Pieces made in Indian workshops, Chinese factories, and Moroccan urban cooperatives are sold as Beni Ourain at a fraction of the price of genuine Middle Atlas production. The markers of genuineness: the specific softness and depth of high-altitude Middle Atlas wool, the slight irregularity of hand-spun pile (uniform pile is almost always machine-processed), the natural variation of undyed fleece (a perfectly even ivory is usually bleached or washed), and the weight of the finished piece relative to its size. A genuine Beni Ourain rug is heavy — the deep pile and wool quality give it a substance that lightweight imitations lack. Ask specifically about wool source and processing.`,
    commercial_warning: `"Beni Ourain" is now a style descriptor applied to any ivory-ground pile rug with geometric patterning regardless of origin, material, or construction. It is the most abused term in Moroccan rug retail. At Tilwen, Beni Ourain attribution is only used for pieces with documented or credibly attributed Middle Atlas origin.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['beni-ourain', 'pile-knotted', 'lanolin', 'wool', 'hand-spun', 'tribal-attribution', 'vintage'],
    language_note: `Beni Ourain (most common English/French spelling), Beni Ouarain, Béni Ouarain, Ait Ouarain (Tamazight). The name refers to the tribal confederation of people, not a type of rug — though commercially it has been reduced entirely to the latter.`,
  },

  {
    slug: 'beni-mguild',
    name: "Beni M'Guild",
    short_definition: "A pile-knotted Middle Atlas rug tradition from the Beni M'Guild tribal confederation — characterised by deep jewel-tone palettes, dense geometric compositions, and exceptional wool quality.",
    origin: "Beni M'Guild tribal confederation, Middle Atlas (Khenifra region), Morocco",
    technique: 'Pile-knotted; deep pile on wool foundation',
    palette: "Rich jewel tones — deep red, burgundy, saffron, indigo, and dark brown against ivory or cream grounds; more chromatically ambitious than Beni Ourain",
    description: `The Beni M'Guild are an Amazigh tribal confederation of the Middle Atlas centred in the Khenifra region, whose pile-knotted rug tradition stands in instructive contrast to the better-known Beni Ourain work of the same mountain range. Where Beni Ourain rugs are defined by restraint — sparse patterning on ivory ground — Beni M'Guild work is characterised by chromatic richness and compositional density. The field is worked more fully, the palette draws on the full range of natural and (in later pieces) synthetic dyes available to Middle Atlas weavers, and the geometric vocabulary is deployed with a confidence that produces pieces of considerable formal complexity.

The characteristic Beni M'Guild palette is among the most distinctive in Moroccan Amazigh weaving: deep burgundy reds, warm saffron yellows, and dark indigo-adjacent tones are combined in compositions where the ivory ground plays a supporting role rather than dominating the visual field. In older pieces with natural dyes, these colours have an extraordinary depth — the madder reds in particular develop a quality with age that synthetic reds never achieve.

The pile quality is comparable to the best Beni Ourain work — the shared altitude and sheep breeds of the Middle Atlas mean that the raw material is similar. What differs is the use to which that material is put. A Beni M'Guild rug asks more of the eye than a Beni Ourain rug does; it rewards slower looking. The compositions are typically more structured than Azilal work — closer to the formal discipline of the High Atlas tradition — but warmer in palette and denser in composition than the spare Beni Ourain aesthetic.

Ceremonial textiles from the Beni M'Guild tradition — including wedding rugs and domestic hanging pieces — occasionally appear in the secondary market. These carry a biographical weight beyond their formal qualities: they are objects made for specific occasions within a specific community, not general-purpose floor textiles, and they read differently as a result.`,
    buying_notes: `Beni M'Guild pieces are less commercially replicated than Beni Ourain, partly because the name has lower international recognition and partly because the richer palette is harder to fake convincingly with cheap materials. This makes genuine attribution somewhat more reliable in this category. The markers of quality are the same as for any pile rug: wool depth and softness, natural colour variation (abrash), weight relative to size, and the slight irregularity of hand-spun pile.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'lanolin', 'tribal-attribution', 'abrash'],
    language_note: `Beni M'Guild (most common spelling), Beni Mguild, Aït M'Guild. The name refers to the tribal confederation. The apostrophe in M'Guild represents a glottal stop in the Tamazight pronunciation.`,
  },

  {
    slug: 'beni-mrirt',
    name: "Beni M'Rirt",
    short_definition: "A pile-knotted Middle Atlas rug tradition from the M'Rirt area of Khenifra province — technically sophisticated, with polychrome compositions and a palette that bridges the spare Beni Ourain aesthetic and the richer Beni M'Guild tradition.",
    origin: "M'Rirt community, Khenifra province, Middle Atlas, Morocco",
    technique: 'Pile-knotted; deep pile on wool warp and weft',
    palette: 'Polychrome — deep orange, terracotta, and ivory combinations are characteristic; also red, brown, and cream; natural dye palette in older pieces',
    description: `The M'Rirt weaving tradition comes from the Khenifra province of the Middle Atlas, and the pieces attributed to this community occupy a specific formal register within the broader Middle Atlas pile-knotted tradition: more chromatically varied than Beni Ourain, typically more formally structured than Azilal, and with a compositional density and quality that makes them among the most technically accomplished pile-knotted rugs in the Moroccan Amazigh tradition.

The characteristic M'Rirt composition features dense lozenge or diamond-grid arrangements worked across the full field, with a palette that typically combines deep orange, warm terracotta, and ivory — a colour combination that in well-preserved natural dye examples has a mineral warmth that the description does not do justice to. The orange tones come from combinations of henna, saffron, and madder, and the specific quality of aged natural orange in a M'Rirt piece — the way it has deepened and settled over decades — is one of the more compelling colour experiences in Moroccan textile collecting.

The wool quality is comparable to the best of the Middle Atlas tradition. The knotting is typically fine relative to other Moroccan pile work — enough to support detailed geometric patterning without sacrificing pile depth. The best M'Rirt pieces are structurally tight and materially dense in a way that gives them a presence on the floor that lighter, sparser pieces do not have.

M'Rirt pieces appear in the secondary market with some regularity but without the premium associated with Beni Ourain — which means that collectors who understand the tradition can acquire exceptional pieces at prices that do not fully reflect their quality. This situation may not persist as the distinction between Middle Atlas pile types becomes more widely understood.`,
    buying_notes: `M'Rirt attribution is more reliable than Beni Ourain attribution for the same reason Beni M'Guild attribution is more reliable — lower commercial incentive to misattribute. The composition and palette of a genuine M'Rirt piece are specific enough that fakes are identifiable to a trained eye. The dense orange-terracotta-ivory palette in natural dyes is genuinely difficult to replicate; synthetic imitations read differently in colour and texture.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['mrirt', 'pile-knotted', 'natural-dye', 'wool', 'tribal-attribution', 'abrash'],
    language_note: `Beni M'Rirt (full tribal name), M'Rirt (abbreviated), Mrirt, Mrit. The name refers to both the community and the town of M'Rirt in Khenifra province. Not to be confused with the broader Beni M'Guild confederation, though both come from the same province.`,
  },

  {
    slug: 'taznakht',
    name: 'Taznakht',
    short_definition: 'Flatweave rugs from the Taznakht region of the Draa valley — a production and trading hub south of Ouarzazate whose weekly market is one of the most active rug markets in southern Morocco.',
    origin: 'Taznakht, Draa valley, Ouarzazate province, southern Morocco',
    technique: 'Flatweave kilim; some supplementary weft examples',
    palette: 'Ochres, rusts, deep terracottas, saffron yellows, ivory, and occasional indigo; warm, mineral-toned palette reflecting the landscape of the southern Atlas foothills',
    description: `Taznakht is a small market town in the Draa valley, at approximately 1,500 metres altitude, at the junction of routes connecting Ouarzazate, the Anti-Atlas, and the High Atlas foothills. Its weekly market — the souk — has functioned for generations as the primary point where weavers from surrounding communities bring finished pieces for sale. Taznakht is most closely associated with Zanafi striped flatweaves, but the broader category of Taznakht-region flatweaves encompasses a range of compositional types and techniques produced by communities across the surrounding valleys and mountain flanks.

The production context is cooperative. The Taznakht cooperative network is one of the more organised in Morocco — multiple formal cooperatives operate in and around the town, providing weavers with access to wool, dyes, and market channels. This means that "Taznakht" as a provenance description is more legible than many Moroccan rug origins: the town and its cooperatives are real, traceable production nodes, and pieces acquired through the Taznakht market can often be attributed to a specific cooperative if not always to a specific weaver.

The landscape of the Taznakht region directly shapes the palette of its textiles. The ochres, rusts, and warm terracottas that characterise Taznakht-region flatweaves are both a natural dye tradition drawing on locally available pigment sources and an aesthetic response to the mineral-toned environment. The light of the Draa valley at altitude — intense, warm, and clear — is the light these textiles were made to be seen in, and they carry something of that quality even when removed to more temperate contexts.

The flatweave structures produced in the Taznakht region are technically accomplished — the wool is well-spun, the weft is evenly beaten, and the colour transitions are handled with the precision that comes from a weaving culture with generational depth. The best Taznakht pieces have an authority of surface that distinguishes them from the lighter, less carefully constructed flatweaves produced for the low end of the tourist market.`,
    buying_notes: `The Taznakht market is genuinely accessible as a primary market source — it is one of the few places in Morocco where a buyer with language skills and market knowledge can acquire pieces directly from the cooperative or from individual weavers who bring pieces to the weekly souk. Pieces acquired this way have the shortest possible provenance chain. The difference between a Taznakht piece acquired at the source and one that has passed through Marrakech export channels is often a factor of three or four in price, and the Marrakech version may have been washed or treated in ways the source version has not.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['taznakhte', 'zanafi', 'flatweave', 'kilim', 'cooperative', 'natural-dye', 'provenance'],
    language_note: `Taznakht (most common commercial spelling), Taznaght (closer to Tamazight pronunciation), Taznakhte. The town's name refers to the administrative centre; "Taznakht-region flatweaves" is a geographic descriptor, not a tribal one.`,
  },

  {
    slug: 'zanafi',
    name: 'Zanafi',
    short_definition: 'A boldly striped flatweave from the Draa valley and southern Atlas — the most compositionally direct of Moroccan flatweave types, organised entirely around horizontal stripe rhythm.',
    origin: 'Taznakht region, Draa valley, southern Morocco; also produced in surrounding Atlas communities',
    technique: 'Weft-faced flatweave; the stripe composition is the natural expression of horizontal weft colour changes on a vertical loom',
    palette: 'Strong horizontal bands of ochre, rust, deep terracotta, warm brown, ivory, and occasional indigo; the palette is warm and mineral, directly reflecting the dye tradition of the southern Atlas',
    description: `The Zanafi is the most structurally transparent of Moroccan flatweave types: horizontal stripes of varying width and colour run the full width of the textile, and the composition is entirely a function of the weaver's colour decisions as she changes weft thread at each new stripe. There is no complex interlocking geometry, no symbolic reading to decode — the aesthetic power of a Zanafi rug is purely chromatic and rhythmic, a matter of which colours appear in which order and at what width.

This apparent simplicity is deceptive. The most accomplished Zanafi weavers make compositional decisions of considerable sophistication — the proportional relationship between wide and narrow stripes, the placement of accent colours against ground tones, the way a sequence of stripes creates rhythm or tension or resolution — that produce objects whose beauty is immediately apparent but whose intelligence reveals itself slowly. The stripe composition that looks obvious on first viewing is, in the best pieces, exactly right in a way that becomes harder to explain the longer you look at it.

The weft-faced structure of the Zanafi means that the stripe composition is also the textile's structure — there is no additional pile or supplementary patterning above the ground weave. The flatness and reversibility of the construction give Zanafi rugs a particular spatial quality: they lie hard on the floor, read as two-dimensional graphic objects, and integrate into interior compositions in ways that more complex-patterned rugs do not. They are, in this sense, the most furniture-compatible of Moroccan flatweaves.

The natural dye palette of traditional Zanafi work — saffron yellows, madder and henna reds and oranges, walnut and pomegranate browns, indigo blues — has a material depth that synthetic approximations do not achieve. The best vintage Zanafi pieces, where natural dyes have mellowed and settled over decades, have a palette that feels as if it came from the landscape rather than from a dye pot — and in a meaningful sense, it did.`,
    buying_notes: `The Zanafi is one of the more honest categories in Moroccan rug retail — the stripe composition is simple enough that it is difficult to fake convincingly with cheap materials, and the production is clearly localised to the Taznakht region. Marks of quality: the evenness of the weft beating (uneven weft creates wobbly stripes), the weight and density of the finished textile (good Zanafi wool is substantial), the quality of the colour transitions (clean edges indicate careful work), and in vintage pieces, the mellowing quality of natural dyes.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['zanafi', 'taznakhte', 'flatweave', 'kilim', 'weft-faced', 'natural-dye'],
    language_note: `Zanafi (most common commercial spelling), Zennafi. The name is used in both Moroccan Arabic and French commercial contexts. Tamazight variants exist but are not standardised in written form.`,
  },

  {
    slug: 'boujad',
    name: 'Boujad',
    short_definition: 'A pile-knotted rug from the Boujad region of the Khouribga province — characterised by bold abstract compositions, strong saturated colour, and a visual energy that bridges the Amazigh weaving tradition and the creative freedom associated with Azilal work.',
    origin: 'Boujad, Khouribga province, central Morocco',
    technique: 'Pile-knotted; medium pile on wool foundation',
    palette: 'Bold, saturated colours — deep reds, warm oranges, saffron yellows, and occasional indigo against ivory or cream grounds; the palette has an intensity that distinguishes Boujad pieces from both the spare Beni Ourain aesthetic and the denser Middle Atlas traditions',
    description: `Boujad is a town in the Khouribga province of central Morocco, and the pile-knotted rugs associated with it represent one of the more distinctive regional traditions in Moroccan Amazigh weaving. Boujad pieces occupy a specific formal register: bolder and more compositionally free than the disciplined geometric conventions of the High Atlas, warmer and more chromatically saturated than the spare ivory-and-dark palette of Beni Ourain, and with a visual energy that places them alongside Azilal work in the category of Moroccan pile rugs that reward a contemporary interior sensibility.

The compositions are typically abstract in the sense that they are not built from the strict geometric repeat structures of the more formally disciplined traditions — but they are not random. Boujad weavers work within a vocabulary of forms — lozenges, stepped diagonals, irregular fields, occasional figurative elements — that they arrange with a confidence born of tradition. The best Boujad pieces have the quality of objects in which every formal decision was inevitable, even when the composition appears improvised.

The palette is one of the most immediately recognisable characteristics of Boujad work: a warmth and saturation that gives these rugs a presence in a room that more restrained pieces do not have. In vintage pieces with natural or early synthetic dyes, the reds and oranges have a material depth that current production cannot replicate. The transition to synthetic dyes in Boujad production — which occurred, as across Morocco, from the mid-twentieth century onward — changed the palette's character significantly: the synthetic reds are more uniform and more intense than the natural madder and henna reds they replaced, and the older natural dye examples are increasingly sought after precisely because they represent a palette that no longer exists in new production.

Boujad is less well known internationally than Azilal, Beni Ourain, or even Zanafi, which means that its pieces are less commercially replicated and more likely to be genuine when attributed. For collectors who understand the tradition, this creates real opportunity.`,
    buying_notes: `Boujad attribution is more reliable than Beni Ourain attribution for the familiar reason — lower commercial name recognition means less incentive to misattribute. The specific warmth and saturation of the Boujad palette, combined with the compositional confidence of authentic pieces, makes competent fakes difficult to produce. As always, the questions to ask are about wool quality, dye history (natural versus synthetic), and provenance chain.`,
    region_slugs: ['haouz-plain'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'synthetic-dye', 'tribal-attribution', 'vintage', 'abrash'],
    language_note: `Boujad refers to both the town and the rug type associated with it. The weaving tradition is sometimes described as part of the broader "Rehamna" regional tradition, referring to the Rehamna tribal area of the Khouribga–Settat region.`,
  },

  {
    slug: 'zemmour',
    name: 'Zemmour',
    short_definition: "A tribal confederation of the Middle Atlas-Plateau region whose woven pieces — dense red compositions, exceptional geometric precision, fine craftsmanship — are among the technically most sophisticated in the Amazigh tradition.",
    origin: 'Zemmour tribal confederation, Khemisset and Tiflet areas, Middle Atlas-Plateau region, Morocco',
    technique: 'Pile-knotted and flatweave; the Zemmour handira (wedding blanket) tradition is particularly significant',
    palette: 'Deep red dominates — madder and (in later pieces) synthetic red against ivory, dark brown, and occasional indigo accent; among the most colour-distinctive palettes in Moroccan Amazigh weaving',
    description: `The Zemmour are an Amazigh tribal confederation whose traditional territory spans the Khemisset and Tiflet areas of the Middle Atlas-Plateau region north of Rabat. Their weaving tradition is considered by specialists to be among the technically finest in Morocco — dense, complex geometric compositions worked with a precision that requires considerable skill, a palette anchored by the deep red that has become the identifying characteristic of Zemmour work, and a material quality that reflects the high standards maintained by a tradition with deep cultural roots.

Zemmour compositions are typically all-over geometric fields — interlocking lozenges, diamond grids, stepped forms, and borders of considerable complexity — worked at a fineness that allows detailed patterning without losing the bold visual impact that the deep red palette creates. The discipline of these compositions distinguishes Zemmour work from the more improvisational Azilal and Boujad traditions: these are rugs in which every formal decision is governed by a strict geometric logic, and the pleasure of them is the pleasure of watching precision achieve warmth.

The deep red palette is the most immediately recognisable characteristic of Zemmour work. In vintage pieces with natural dyes, the red comes from madder root — a dye source with a specific quality of warmth and depth that synthetic reds approximate but do not replicate. Well-preserved natural madder red in a Zemmour piece has a particular quality that ages toward garnet rather than toward brick — it deepens rather than dulls. This ageing behaviour is one of the diagnostic markers of natural dye in this tradition.

The Zemmour handira — the ceremonial wedding blanket — is one of the most significant Amazigh textile types. Made by the bride and her female relatives in preparation for the wedding, incorporating sequins (aluminium or silver-coloured metal discs) believed to have protective properties, and used both as a ceremonial wrap and as a domestic covering afterwards, the handira is a biographical object in a way that floor rugs are not. The finest vintage Zemmour handiras are increasingly sought after by serious collectors for precisely this reason: they are not decorative objects made for a market, but objects made for a specific life occasion within a specific community.`,
    buying_notes: `Zemmour attribution is among the more reliable in Moroccan rug retail. The combination of a very specific palette, a distinctive compositional character, and lower commercial name recognition than Beni Ourain means that genuine pieces are relatively easy to identify and fakes are relatively rare. The deep red and the compositional precision are both markers that are difficult to replicate without using appropriate materials and taking appropriate care. As always, the quality of the wool and the integrity of the natural dyes are the primary value determinants.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['zemmour', 'pile-knotted', 'handira', 'natural-dye', 'madder', 'tribal-attribution', 'protective-motif'],
    language_note: `Zemmour (French/English transliteration), Izemmour (Tamazight plural form). The name refers to the tribal confederation of people. The weaving tradition carries the same name.`,
  },

  {
    slug: 'boucherouitte',
    name: 'Boucherouitte',
    short_definition: "A Moroccan rug made from recycled fabric strips — torn clothing, cotton, synthetics — knotted into a pile foundation. A domestic recycling practice that produces textiles of striking chromatic individuality.",
    origin: 'Urban and peri-urban Morocco; associated with domestic production in Marrakech, Casablanca, and surrounding areas; also rural Atlas communities',
    technique: 'Pile-knotted using strips of recycled fabric rather than continuous wool yarn; fabric strips are tied around the warp using the same knot structure as wool pile rugs',
    palette: 'Entirely determined by available recycled materials — no intentional dye programme; produces unpredictable, often intense chromatic combinations that no designed palette would generate',
    description: `Boucherouitte is not a regional tradition, a tribal heritage, or a commercial style category. It is a practice — the practice of making a rug from whatever fabric is at hand. The word derives from Moroccan Arabic: bu chourit, roughly "from torn clothing." The textile that results from this practice is, in material terms, the most honest of all Moroccan rug types: it is literally made from what was there, by someone who needed a rug and had no wool to spare.

The practice almost certainly predates the twentieth century, but the boucherouitte as we know it — the object that has attracted international collector attention — is primarily a product of the mid-to-late twentieth century, when the urban and peri-urban expansion of Moroccan cities created populations of domestic workers with access to cast-off clothing and textiles from multiple sources: factory offcuts, secondhand European clothing, domestic textile waste. The chromatic diversity this created — European synthetic fabrics in colours that no Moroccan natural dye tradition would produce, combined with local cotton and wool in more traditional tones — is what gives boucherouitte its distinctive visual character.

The compositions range from purely geometric (the same lozenge, stripe, and diamond-grid vocabulary as wool pile rugs, executed in fabric strips) to genuinely abstract — pieces in which the weaver has worked with the colour constraints imposed by available materials and produced something whose visual logic is colour rather than form. The best boucherouitte pieces have a chromatic intelligence that feels designed even though it emerged from constraint: the combination of a pink nylon strip and a dark green cotton strip and a faded denim piece was not chosen from a palette — it happened because those were the fabrics available — and yet it works, often in ways that a designed palette would not.

The material structure of boucherouitte is different from wool pile. The fabric strips vary in weight, stretch, and opacity; the pile surface is uneven and textural in a way wool pile is not; and the piece has a different acoustic and tactile presence from a wool rug. It is also more vulnerable to UV degradation (synthetic fibres fade faster than wool under light exposure) and to moisture damage (cotton and synthetic fabrics hold moisture differently from wool). These are not flaws — they are material characteristics that need to be understood and planned for.`,
    buying_notes: `The boucherouitte category has been heavily commercialised since the 2010s, when the aesthetic attracted significant international design attention. A large proportion of what is now sold as boucherouitte is made specifically for export — pieces designed with an eye to international taste rather than produced within the domestic recycling practice that gives the authentic tradition its character. The difference is visible: export-made boucherouitte tends toward a curated chromatic coherence (the colours work together too well) and a compositional regularity (the patterns are too consistent) that betrays a designed rather than found palette. Authentic pieces made within a genuine domestic practice have a compositional and chromatic unpredictability that export production cannot fully replicate.`,
    commercial_warning: `A significant portion of the boucherouitte market is pieces made specifically for export with a curated palette. These are not the same thing as pieces produced within the domestic recycling practice. Ask about the production context and whether the palette was selected or found.`,
    region_slugs: ['haouz-plain'],
    glossary_term_slugs: ['boucherouitte', 'pile-knotted', 'recycled-textile', 'primary-market'],
    language_note: `Boucherouitte (French transliteration, most common internationally), boucherouite, boucheruite, bouchrouite. From Moroccan Arabic bu chourit (بو شريط), roughly "from torn cloth" or "from shredded fabric."`,
  },

  {
    slug: 'zayan',
    name: 'Zayan',
    short_definition: 'A pile-knotted rug tradition from the Zayan confederation of the western Middle Atlas — bold geometric compositions in warm ochres, deep reds, and dark wool, from a community that resisted colonial intervention longer than almost any other in Morocco.',
    origin: 'Zayan confederation, western Middle Atlas, Khénifra region, Morocco',
    technique: 'Pile-knotted; medium to high pile on wool foundation',
    palette: 'Warm ochres, deep reds, dark brown-black, and ivory — a palette with more warmth than the cooler Middle Atlas traditions, reflecting the lower altitude and different dye sources of the western Atlas',
    description: `The Zayan confederation occupies the western Middle Atlas around Khénifra — the same mountain range as the Beni M'Guild and Zemmour, but a distinct community with a distinct history and a distinct visual language. The Zayan were among the last Amazigh communities to resist French colonial control, holding out until 1921 under the leadership of Moha ou Hammou Zayani. That history is not decorative background. It is the context in which these rugs were made — by a community that maintained its own terms of existence against sustained external pressure, and whose material culture reflects that self-possession.

The compositions are bold and direct. Large-scale geometric fields — lozenges, stepped diamonds, chevron arrangements — worked in warm ochres, deep madder reds, and dark wool against ivory grounds. Less compositionally dense than Zemmour work, less chromatically varied than Beni M'Guild, the Zayan tradition has a graphic authority that comes from confidence rather than elaboration. These are not rugs that negotiate with the room. They establish their presence and hold it.

Protective symbolism runs through the Zayan tradition as it does through all Middle Atlas pile weaving. The lozenge is not a geometric choice — it is a mark with a function, placed where it needs to be placed, in the number it needs to appear. The compositions that look most spare are often the most intentional. The space around the symbol is part of the symbol.

Natural dyes dominate the older pieces — walnut and pomegranate for the warm brown-blacks, madder for the reds, saffron for the ochre accents. The transition to synthetic dyes occurred in the mid-twentieth century as it did throughout the region, and the quality differential between natural and synthetic dye examples in this tradition is significant.`,
    buying_notes: `Zayan attribution is more reliable than Beni Ourain attribution — lower name recognition means lower commercial incentive to misattribute. The specific palette and compositional vocabulary of genuine Zayan work is distinct enough that experienced eyes can identify it, and the Khénifra region provenance is traceable through the market channels that feed it. Ask about wool quality and dye history as with any Middle Atlas pile rug.`,
    region_slugs: ['middle-atlas'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'tribal-attribution', 'protective-motif'],
    language_note: `Zayan (French/English transliteration), Zaiane, Izayan (Tamazight). The confederation takes its name from the Zayan people, not from a geographic feature. The town of Khénifra is the administrative centre of their traditional territory.`,
  },

  {
    slug: 'taznakht',
    name: 'Taznakht',
    short_definition: 'Flatweave rugs from the Taznakht market town in the Draa valley — not a tribal attribution but a production and trading hub where weavers from across the southern Atlas have brought their work to the weekly souk for generations.',
    origin: 'Taznakht, Draa valley, Ouarzazate province, southern Morocco',
    technique: 'Weft-faced flatweave kilim; some supplementary weft examples; occasional mixed-technique pieces',
    palette: 'Ochre, rust, deep terracotta, warm brown, ivory, and occasional indigo — the palette of the southern Atlas foothills at altitude, drawn directly from the landscape and its natural dye sources',
    description: `Taznakht is not a tribe. It is a market — the weekly souk in a small town in the Draa valley, at the junction of routes connecting Ouarzazate, the Anti-Atlas, and the High Atlas foothills. For generations, weavers from the surrounding communities have brought their flatweaves here to sell. The town has become synonymous with the production it aggregates, which means a Taznakht rug is a geographic attribution rather than a tribal one — it tells you where the piece entered the market, not necessarily who made it or which specific community's visual vocabulary it carries.

This is more honest than many attributions in the Moroccan rug trade, not less. The Taznakht market is a real and traceable production node. Pieces acquired there have a shorter provenance chain than pieces that have passed through Marrakech export channels, and they arrive in their original, unprocessed state — unwashed, untrimmed, the wool and dyes as the weaver left them.

The flatweaves associated with Taznakht are predominantly Zanafi stripe compositions — horizontal bands of ochre, rust, terracotta, and ivory that are the natural output of the horizontal loom and the natural dye palette of the southern Atlas. But the broader Taznakht production encompasses mixed-technique flatweaves, transitional pieces, and work that draws on multiple regional influences. What unites them is the palette and the construction quality — well-spun wool, evenly beaten weft, clean colour transitions that reflect a weaving culture with depth and discipline.

The cooperative network around Taznakht is among the most organised in Morocco. Multiple formal cooperatives operate in and around the town, which means weavers have structured access to materials and markets. This is a meaningful economic context — different from the purely informal domestic production of some other Amazigh weaving traditions, and worth understanding when thinking about where the piece came from and who made it.`,
    buying_notes: `Taznakht is one of the few places in Morocco where primary market sourcing is genuinely accessible to a buyer with language skills and market knowledge. The weekly souk is the first point of sale for many pieces — before the Marrakech export markup, before the washing and trimming that export channels typically apply. Pieces acquired at the Taznakht souk are as close to source as the market allows.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['taznakhte', 'zanafi', 'flatweave', 'kilim', 'cooperative', 'natural-dye', 'provenance', 'primary-market'],
    language_note: `Taznakht (most common commercial spelling), Taznaght (closer to Tamazight pronunciation), Taznakhte. The name refers to the town and administrative centre. Not a tribal designation.`,
  },

  {
    slug: 'talsint',
    name: 'Talsint',
    short_definition: 'A pile-knotted rug tradition from the eastern High Atlas near the Algerian border — one of the most geographically isolated weaving traditions in Morocco, with a visual character shaped by that isolation.',
    origin: 'Talsint region, eastern High Atlas, Figuig province, Morocco',
    technique: 'Pile-knotted; medium pile on wool foundation',
    palette: 'Deep reds, dark browns, and ivory — a palette of strong contrast and limited range, reflecting the austerity of the eastern Atlas landscape and the distance from urban dye markets',
    description: `Talsint sits in the eastern High Atlas near the Algerian border, in one of the most geographically remote weaving regions in Morocco. The nearest large city is Figuig, itself a desert oasis town that functions more as a border crossing than a commercial centre. This distance from the main trade routes — from Marrakech, from Fes, from the export channels that shaped the Beni Ourain and Azilal markets — is the defining fact about the Talsint tradition. No outside eye shaped it. No export demand modified it. The weavers made what they made for themselves, within a community whose isolation preserved a visual vocabulary that development and commerce have eroded almost everywhere else.

The result is a pile-knotted tradition of striking graphic directness. Large-scale geometric compositions — bold lozenges, stepped diamond fields, strong horizontal banding — worked in deep reds, dark browns, and ivory with a confidence that comes from a tradition answering to no external standard. The scale of the motifs is larger than in the finer Middle Atlas traditions, the compositions less dense, the effect more immediate. These are rugs that announce themselves.

The protective symbolic content is present and serious. The lozenge forms that dominate Talsint compositions are not decorative choices — they are the same marks that appear across the Amazigh world wherever weavers have placed protective symbols in objects meant to inhabit domestic space. In Talsint work, their scale and placement carry a particular authority: large enough to be unambiguous, positioned with the deliberateness of a mark that is meant to work.

Natural dyes characterise the older pieces — the deep reds from madder, the dark browns from walnut and iron-mordanted tannins, the ivory from undyed local wool. The relative isolation of the region meant that synthetic dyes arrived later here than in more accessible weaving communities, and genuine pre-synthetic Talsint pieces are materially distinctive.`,
    buying_notes: `Talsint pieces are rare in the international market precisely because the geographic isolation that shaped the tradition also limits its export. What does circulate is more likely to be authentic than many better-known types — there is no commercial infrastructure for producing Talsint-style knockoffs because there is no significant commercial demand for Talsint specifically. This will not remain true indefinitely. Collectors who understand the tradition are beginning to pay attention.`,
    region_slugs: ['saharan'],
    glossary_term_slugs: ['pile-knotted', 'natural-dye', 'wool', 'tribal-attribution', 'protective-motif', 'vintage'],
    language_note: `Talsint (French/English transliteration). The name refers to the town and surrounding region in Figuig province. The weaving tradition is sometimes grouped under broader eastern High Atlas or eastern Morocco categories in commercial contexts.`,
  },


]

export function getRugTypeBySlug(slug: string): RugType | undefined {
  return rugTypes.find(t => t.slug === slug)
}
