'use client'
import { useState } from 'react'

/**
 * Quiet share affordance for product pages.
 * Mobile (and Safari desktop): opens the native share sheet.
 * Elsewhere: copies the link, confirms inline. No icons, no networks.
 */
export default function ShareLink({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User dismissed the sheet — nothing to do
      }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  // When a className is supplied (e.g. rp-links__item) it controls all styling,
  // so the share link matches its sibling links exactly.
  if (className) {
    return (
      <button onClick={share} className={className} aria-live="polite" style={{ color: copied ? 'var(--black)' : undefined }}>
        {copied ? 'Link copied' : 'Share this piece'}
      </button>
    )
  }

  return (
    <button
      onClick={share}
      className="t-ui-xs"
      style={{
        background: 'none',
        border: 'none',
        borderBottom: '1px solid var(--grey-200)',
        padding: 0,
        cursor: 'pointer',
        color: copied ? 'var(--black)' : 'var(--grey-600)',
        transition: 'color 200ms ease',
      }}
      aria-live="polite"
    >
      {copied ? 'Link copied' : 'Share this piece'}
    </button>
  )
}
