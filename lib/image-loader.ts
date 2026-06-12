/**
 * Custom next/image loader.
 *
 * Bypasses Vercel's image optimizer (which has a monthly source-image quota
 * that a catalogue of this size exceeds) and delegates resizing to the CDNs
 * that already do it natively and free:
 *
 *  - Shopify CDN:    ?width= & ?quality= params, auto WebP/AVIF
 *  - Cloudinary:     chained w_,q_auto,f_auto transformation
 *  - Unsplash:       ?w= & ?q= params
 *  - anything else:  passed through untouched
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  try {
    if (src.includes('cdn.shopify.com')) {
      const url = new URL(src)
      url.searchParams.set('width', String(width))
      url.searchParams.set('quality', String(quality || 75))
      return url.toString()
    }

    if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
      return src.replace(
        '/upload/',
        `/upload/w_${width},c_limit,q_auto,f_auto/`
      )
    }

    if (src.includes('images.unsplash.com')) {
      const url = new URL(src)
      url.searchParams.set('w', String(width))
      url.searchParams.set('q', String(quality || 75))
      return url.toString()
    }
  } catch {
    // Malformed URL — fall through and let the browser try the raw src
  }
  return src
}
