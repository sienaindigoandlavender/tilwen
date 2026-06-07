import type { Essay } from '@/types'

export const essays: Essay[] = [
  {
    slug: 'geometry-and-cosmology',
    title: 'Geometry and Cosmology',
    excerpt: 'The lozenge is not a shape. It is a system of belief rendered in wool. This essay traces the symbolic grammar of geometric weaving in the Amazigh tradition.',
    body: `## Geometry and Cosmology

The lozenge appears first. Before colour, before scale, before any other formal decision, the weaver commits to the lozenge: its angle, its proportion, its relationship to the field. In Amazigh weaving, the lozenge is not chosen because it is beautiful. It is chosen because it means something.

### A Vocabulary of Protection

The Amazigh visual tradition has no single authoritative text — no illuminated manuscript in which the meaning of each motif is recorded and fixed. What survives is the objects themselves, and the testimony of weavers, and the comparative work of scholars who have traced similar forms across North Africa, the Sahara, and the eastern Mediterranean.

What that scholarship establishes is a symbolic grammar, not a dictionary. The lozenge does not mean one thing. It holds a cluster of meanings — protection, fertility, the deflection of the evil eye, the female body — that are activated differently in different compositions and different communities. A field of dense interlocking lozenges reads differently from a single lozenge placed at the centre of an otherwise empty field. Both use the same form; both mean something; they do not mean the same thing.

### The Broken Form

Among the most significant formal decisions in Amazigh weaving is the deliberate introduction of asymmetry or incompleteness. A border that does not close. A repeat that skips a beat. A lozenge left open.

This is not error. In a tradition where the same compositions have been woven across generations, the weaver who introduces an asymmetry knows what she is doing. The most widely held interpretation: a perfect object attracts the evil eye. An imperfect one does not. The break is protection.

This formal logic — that incompleteness is intentional and meaningful — is one of the reasons Amazigh textiles resist purely aesthetic readings. The flaw is the content.

### On Reading a Rug

To look at a High Atlas kilim with the attention it deserves requires suspending the assumption that decoration is decoration. The forms on the surface are not embellishment. They are statements — about the world, about the body, about the household, about what threatens it and what protects it.

This does not mean every rug is a sacred object. Many were domestic tools, woven quickly for daily use, with compositional choices that were habitual rather than deliberate. But the vocabulary was learned from weavers who understood what the forms meant, and that meaning travels in the object even when the weaver did not consciously intend it.`,
    theme_tags: ['motifs', 'symbolism', 'geometry'],
    region_slugs: ['high-atlas', 'anti-atlas'],
    motif_slugs: ['lozenge', 'broken-comb', 'stepped-cross'],
    featured_rug_slugs: ['lucid'],
    reading_time_minutes: 8,
    published_at: '2024-03-15',
    cover_image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=1400&q=80',
  },
  {
    slug: 'natural-dye-traditions',
    title: 'The Colour of the Land',
    excerpt: 'Natural dyes in Moroccan weaving are not a romantic attachment to the past. They are the product of a specific ecology and a specific knowledge system that survived industrialisation in isolated mountain communities.',
    body: `## The Colour of the Land

Natural dyes in Moroccan weaving are not a romantic attachment to the past. They are the product of a specific ecology and a specific knowledge system — what plants grow where, what mordants fix what colours, how long to boil, when to add the wool — that survived industrialisation in isolated mountain communities because synthetic dyes were unavailable or prohibitively expensive, and because the knowledge was passed directly from mother to daughter without interruption.

### What the Colours Are

Saffron produces the golden yellows and warm ochres that characterise Haouz plain weaving. Henna gives the warm reds and terracottas of many Middle Atlas pieces. Walnut husk produces deep warm browns that mellow with age rather than fading. Indigo — imported across the Sahara for centuries — gives the deep blues and blue-blacks that appear across all regions.

Undyed wool is not an absence of colour. It is a choice. The natural ivory, grey, and dark brown of Moroccan sheep breeds are used as deliberate palette elements, particularly in the High Atlas and Beni Ourain traditions where the undyed wool is the ground against which everything else is set.

### Age and Colour

A natural dye ages differently from a synthetic one. Synthetic dyes fade uniformly — the colour weakens but the relationship between colours remains constant. Natural dyes age selectively: some deepen, some fade, some shift in hue. An old saffron yellow may become amber. An old indigo may acquire a sheen it did not have when new.

This means that a vintage piece has a colour that could not be reproduced — not because the dye plants are unavailable, but because fifty years of light, air, and use have produced a surface that is not the original surface. The colour you see in a well-preserved vintage piece is the product of the dye, the wool, the time, and the life the object has had. It cannot be faked.`,
    theme_tags: ['materials', 'craft', 'natural-dyes'],
    region_slugs: ['high-atlas', 'haouz-plain', 'middle-atlas'],
    motif_slugs: [],
    featured_rug_slugs: ['taut', 'grave'],
    reading_time_minutes: 6,
    published_at: '2024-04-22',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
  },
]

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find(e => e.slug === slug)
}
