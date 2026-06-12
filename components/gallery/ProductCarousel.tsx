'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

const FRAME_LABELS = ['flat', 'detail', 'reverse', 'scale reference']

export default function ProductCarousel({
  images,
  name,
  culturalName,
}: {
  images: string[]
  name: string
  culturalName: string
}) {
  const [active, setActive] = useState(0)
  const touchX = useRef<number | null>(null)
  const count = images.length

  const go = useCallback(
    (dir: 1 | -1) => setActive(a => (a + dir + count) % count),
    [count]
  )

  // Keyboard navigation when the carousel is on screen
  useEffect(() => {
    if (count < 2) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, count])

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const altFor = (i: number) =>
    `${name} — ${culturalName}${FRAME_LABELS[i] ? `, ${FRAME_LABELS[i]}` : ''}`

  return (
    <div className="pc">
      <style>{`
        .pc { user-select: none; }
        .pc__frame {
          position: relative;
          aspect-ratio: 4/5;
          background: var(--grey-100);
          overflow: hidden;
        }
        .pc__slide {
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 260ms ease;
          pointer-events: none;
        }
        .pc__slide--active { opacity: 1; pointer-events: auto; }
        .pc__slide img { object-fit: contain; }

        .pc__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 2;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: none; cursor: pointer;
          color: var(--grey-600);
          transition: color var(--t);
        }
        .pc__arrow:hover { color: var(--black); }
        .pc__arrow--prev { left: 4px; }
        .pc__arrow--next { right: 4px; }

        .pc__bar {
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--sp-4);
          margin-top: var(--sp-3);
        }
        .pc__thumbs { display: flex; gap: var(--sp-2); }
        .pc__thumb {
          position: relative;
          width: 56px; height: 56px;
          background: var(--grey-100);
          border: 1px solid transparent;
          padding: 0; cursor: pointer;
          opacity: 0.55;
          transition: opacity var(--t), border-color var(--t);
        }
        .pc__thumb:hover { opacity: 1; }
        .pc__thumb--active { opacity: 1; border-color: var(--grey-800); }
        .pc__thumb img { object-fit: cover; }
        .pc__count {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.1em;
          color: var(--grey-400);
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .pc__thumb { width: 44px; height: 44px; }
        }
      `}</style>

      <div className="pc__frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {images.map((src, i) => (
          <div key={i} className={`pc__slide${i === active ? ' pc__slide--active' : ''}`}>
            <Image
              src={src}
              alt={altFor(i)}
              fill
              priority={i === 0}
              sizes="(max-width:900px) 100vw, 55vw"
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button className="pc__arrow pc__arrow--prev" onClick={() => go(-1)} aria-label="Previous image">
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
                <path d="M8 1L1 8l7 7" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
            <button className="pc__arrow pc__arrow--next" onClick={() => go(1)} aria-label="Next image">
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
                <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="pc__bar">
          <div className="pc__thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`pc__thumb${i === active ? ' pc__thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1} of ${count}`}
                aria-current={i === active}
              >
                <Image src={src} alt="" fill sizes="56px" />
              </button>
            ))}
          </div>
          <span className="pc__count">{active + 1} / {count}</span>
        </div>
      )}
    </div>
  )
}
