import React from 'react'
import Link from 'next/link'
import { glossary } from '@/data/glossary'

/**
 * Auto-links glossary terms inside a block of plain text.
 *
 * Rules (deliberately conservative — over-linking reads as SEO spam):
 *  - Only the FIRST occurrence of each term is linked.
 *  - Whole-word matches only ("warp" never matches inside "warping").
 *  - Longest terms matched first ("Flatweave Care" before "Flatweave").
 *  - A term equal to `skipSlug` is not linked (avoid self-links — a Beni Ourain
 *    page shouldn't link the term "Beni Ourain" to the glossary).
 *  - Case-insensitive match, but the original casing in the text is preserved.
 *
 * Returns an array of React nodes safe to render inside a <p>.
 */

interface TermEntry { slug: string; term: string }

// Build the term list once, sorted longest-first so multi-word terms win.
const TERMS: TermEntry[] = (glossary as TermEntry[])
  .map(g => ({ slug: g.slug, term: g.term }))
  .filter(g => g.term && g.term.length >= 4) // skip very short/ambiguous terms
  .sort((a, b) => b.term.length - a.term.length)

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function linkGlossary(
  text: string | null | undefined,
  opts: { skipSlug?: string } = {}
): React.ReactNode[] {
  if (!text) return []
  const used = new Set<string>()
  if (opts.skipSlug) used.add(opts.skipSlug)

  // Candidate terms not yet used, longest-first.
  const remaining = () => TERMS.filter(t => !used.has(t.slug))

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let key = 0

  // Walk the string, repeatedly finding the earliest unused term match.
  while (cursor < text.length) {
    let best: { index: number; entry: TermEntry; matched: string } | null = null

    for (const entry of remaining()) {
      const re = new RegExp(`\\b${escapeRegExp(entry.term)}\\b`, 'i')
      const slice = text.slice(cursor)
      const m = re.exec(slice)
      if (m && (best === null || m.index < best.index)) {
        best = { index: cursor + m.index, entry, matched: m[0] }
        if (m.index === 0) break // can't do better than the very next char
      }
    }

    if (!best) {
      nodes.push(text.slice(cursor))
      break
    }

    if (best.index > cursor) nodes.push(text.slice(cursor, best.index))
    nodes.push(
      <Link key={`gl-${key++}`} href={`/glossary/${best.entry.slug}`} className="glossary-link">
        {best.matched}
      </Link>
    )
    used.add(best.entry.slug)
    cursor = best.index + best.matched.length
  }

  return nodes
}

/** Convenience component: <GlossaryText text={...} skipSlug="beni-ourain" /> */
export function GlossaryText({ text, skipSlug }: { text: string | null | undefined; skipSlug?: string }) {
  return <>{linkGlossary(text, { skipSlug })}</>
}
