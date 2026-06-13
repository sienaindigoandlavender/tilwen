'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import TanitMark from '@/components/TanitMark'
import { useCart } from '@/lib/cart-context'

// Two-gate model: the nav is the SELL gate. Learning pages (Motifs, Regions,
// Traditions, Journal) live in the footer and are reached from search engines,
// not from the primary nav.
function CartButton() {
  const { itemCount, openCart } = useCart()
  return (
    <button className="nav__cart" onClick={openCart} aria-label={`Bag — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}>
      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2.5 5.5h12v10.5a0.5 0.5 0 0 1-0.5 0.5H3a0.5 0.5 0 0 1-0.5-0.5V5.5Z" stroke="currentColor" strokeWidth="1"/>
        <path d="M5.5 5.5V4.25a3 3 0 0 1 6 0V5.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
      {itemCount > 0 && <span className="nav__cart-count">{itemCount}</span>}
    </button>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [shopOpen, setShopOpen] = useState(false)
  const shopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Types currently in inventory (from the catalogue). Links into the gallery's
  // ?tradition= filter. Update this list if new traditions are stocked.
  const SHOP_TYPES: { slug: string; label: string }[] = [
    { slug: 'beni-ourain', label: 'Beni Ourain' },
    { slug: 'beni-mguild', label: "Beni M'Guild" },
    { slug: 'boujad', label: 'Boujad' },
    { slug: 'azilal', label: 'Azilal' },
    { slug: 'zayan', label: 'Zayan' },
    { slug: 'taznakht', label: 'Taznakht' },
    { slug: 'talsint', label: 'Talsint' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false); setShopOpen(false) }, [pathname])

  useEffect(() => {
    if (!shopOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShopOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shopOpen])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    // Search routes into the gallery; the gallery wires up ?q= next round.
    router.push(q ? `/gallery?q=${encodeURIComponent(q)}` : '/gallery')
    setOpen(false)
  }

  return (
    <>
      <style>{`
        .nav-announce {
          position: fixed; top: 0; left: 0; right: 0; z-index: 201;
          height: 28px; background: #ffffff;
          border-bottom: 1px solid var(--grey-100);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-ui); font-size: 0.5625rem;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey-600);
          padding: 0 var(--sp-4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .nav {
          position: fixed; top: 28px; left: 0; right: 0; z-index: 200;
          height: 56px; background: #ffffff;
          border-bottom: 1px solid transparent;
          transition: border-color 300ms ease;
          display: flex; align-items: center;
        }
        .nav--scrolled { border-bottom-color: var(--grey-200); }

        .nav__inner {
          width: 100%; max-width: var(--max-w); margin: 0 auto;
          padding: 0 var(--sp-8);
          display: flex; align-items: center; justify-content: space-between; gap: var(--sp-8);
        }
        .nav__left { display: flex; align-items: center; gap: var(--sp-8); flex-shrink: 0; }
        .nav__logo { display: flex; align-items: center; gap: 0.5rem; color: var(--black); white-space: nowrap; text-decoration: none; }
        .nav__logo-wordmark {
          font-family: var(--font-ui); font-size: 0.6875rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--black);
        }
        .nav__tagline {
          font-family: var(--font-body); font-size: 0.75rem; font-style: italic;
          color: var(--grey-600); display: none;
        }
        @media (min-width: 1000px) { .nav__tagline { display: block; } }

        .nav__right { display: flex; align-items: center; gap: var(--sp-4); }

        /* Search box — desktop */
        .nav__search { display: none; }
        @media (min-width: 768px) {
          .nav__search {
            display: flex; align-items: center; gap: 0.5rem;
            height: 32px; padding: 0 0.75rem;
            border: 1px solid var(--grey-200);
            background: #ffffff;
            transition: border-color var(--t);
            width: 200px;
          }
          .nav__search:focus-within { border-color: var(--grey-800); }
        }
        .nav__search svg { color: var(--grey-400); flex-shrink: 0; }
        .nav__search input {
          border: none; outline: none; background: none; width: 100%;
          font-family: var(--font-ui); font-size: 0.6875rem; letter-spacing: 0.04em;
          color: var(--black);
        }
        .nav__search input::placeholder { color: var(--grey-400); letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.625rem; }

        /* Shop — the primary commerce action */
        .nav__shop {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--white);
          background: var(--black); border: 1px solid var(--black);
          height: 32px; padding: 0 var(--sp-6);
          display: flex; align-items: center; text-decoration: none;
          transition: background var(--t), color var(--t);
        }
        .nav__shop:hover { background: var(--white); color: var(--black); }
        .nav__shop--active { background: var(--grey-800); border-color: var(--grey-800); }

        /* Shop dropdown */
        .nav__shopwrap { position: relative; }
        .nav__shopmenu {
          position: absolute; top: calc(100% + 6px); right: 0; z-index: 210;
          min-width: 200px; background: #ffffff;
          border: 1px solid var(--grey-200);
          box-shadow: 0 8px 28px rgba(8,8,8,0.08);
          padding: var(--sp-4); display: flex; flex-direction: column;
          animation: navShop 160ms ease;
        }
        @keyframes navShop { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .nav__shopmenu-strong {
          font-family: var(--font-ui); font-size: 0.625rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--black);
          padding: 0.5rem 0.3rem; text-decoration: none; transition: opacity var(--t);
        }
        .nav__shopmenu-strong:hover { opacity: 0.55; }
        .nav__shopmenu-label {
          font-family: var(--font-ui); font-size: 0.5rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400);
          margin: var(--sp-4) 0.3rem var(--sp-2); padding-top: var(--sp-2);
          border-top: 1px solid var(--grey-100);
        }
        .nav__shopmenu-link {
          font-family: var(--font-body); font-size: 0.9375rem; color: var(--grey-800);
          padding: 0.35rem 0.3rem; text-decoration: none; transition: color var(--t);
        }
        .nav__shopmenu-link:hover { color: var(--black); }

        .nav__cart {
          display: flex; align-items: center; gap: 0.3rem;
          color: var(--black); background: none; border: none; cursor: pointer;
          padding: 0; transition: opacity var(--t); height: 26px; position: relative;
        }
        .nav__cart:hover { opacity: 0.6; }
        .nav__cart-count {
          position: absolute; top: -4px; right: -8px;
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 14px; height: 14px; padding: 0 3px;
          background: var(--black); color: var(--white); border-radius: 100px;
          font-family: var(--font-ui); font-size: 0.4375rem; font-weight: 600;
        }

        .nav__burger { display: flex; flex-direction: column; gap: 5px; padding: 8px; margin-right: -8px; background: none; border: none; cursor: pointer; }
        @media (min-width: 768px) { .nav__burger { display: none; } }
        .nav__burger span { display: block; width: 22px; height: 1px; background: var(--black); transition: transform var(--t), opacity var(--t); }
        .nav__burger--open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav__burger--open span:nth-child(2) { opacity: 0; }
        .nav__burger--open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .nav__mobile {
          position: fixed; top: 84px; left: 0; right: 0; bottom: 0;
          background: #ffffff; z-index: 199;
          padding: var(--sp-8); display: flex; flex-direction: column;
          border-top: var(--border); animation: fadeUp 0.25s ease both; overflow-y: auto;
        }
        .nav__mobile-search {
          display: flex; align-items: center; gap: 0.5rem;
          height: 44px; padding: 0 0.875rem; margin-bottom: var(--sp-6);
          border: 1px solid var(--grey-200);
        }
        .nav__mobile-search svg { color: var(--grey-400); flex-shrink: 0; }
        .nav__mobile-search input {
          border: none; outline: none; background: none; width: 100%;
          font-family: var(--font-ui); font-size: 0.875rem; color: var(--black);
        }
        .nav__mobile-link {
          font-family: var(--font-ui); font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--black);
          padding: var(--sp-4) 0; border-bottom: var(--border); display: block;
        }
        .nav__mobile-shop {
          margin-bottom: var(--sp-6);
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-ui); font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: var(--black); color: var(--white);
          height: 48px; width: 100%; text-decoration: none;
        }
        .nav__mobile-section {
          font-family: var(--font-ui); font-size: 0.5rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--grey-400);
          margin: var(--sp-8) 0 var(--sp-2);
        }
      `}</style>

      <div className="nav-announce">Each piece is one of a kind · Ships worldwide from Marrakech</div>

      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <div className="nav__left">
            <Link href="/" className="nav__logo"><TanitMark size={22} color="currentColor" /><span className="nav__logo-wordmark">Tilwen</span></Link>
            <span className="nav__tagline">The magic is woven in.</span>
          </div>

          <div className="nav__right">
            {/* Search — routes into the gallery (?q= wired next round) */}
            <form className="nav__search" onSubmit={submitSearch} role="search">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                <path d="M8.5 8.5L12 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search the gallery"
              />
            </form>

            <div
              className={`nav__shopwrap${shopOpen ? ' nav__shopwrap--open' : ''}`}
              onMouseEnter={() => { if (shopCloseTimer.current) clearTimeout(shopCloseTimer.current); setShopOpen(true) }}
              onMouseLeave={() => { shopCloseTimer.current = setTimeout(() => setShopOpen(false), 160) }}
            >
              <Link
                href="/gallery"
                className={`nav__shop${pathname.startsWith('/gallery') ? ' nav__shop--active' : ''}`}
                onClick={() => setShopOpen(false)}
              >
                Shop
              </Link>
              {shopOpen && (
                <div className="nav__shopmenu">
                  <Link href="/gallery" className="nav__shopmenu-strong" onClick={() => setShopOpen(false)}>All Rugs</Link>
                  <Link href="/gallery?new=1" className="nav__shopmenu-strong" onClick={() => setShopOpen(false)}>New Arrivals</Link>
                  <span className="nav__shopmenu-label">Shop by Type</span>
                  {SHOP_TYPES.map(t => (
                    <Link key={t.slug} href={`/gallery?tradition=${t.slug}`} className="nav__shopmenu-link" onClick={() => setShopOpen(false)}>
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <CartButton />

            <button
              className={`nav__burger${open ? ' nav__burger--open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="nav__mobile">
          <form className="nav__mobile-search" onSubmit={submitSearch} role="search">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
              <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search the gallery"
              aria-label="Search the gallery"
            />
          </form>

          <Link href="/gallery" className="nav__mobile-shop">Shop All Pieces</Link>
          <Link href="/gallery?new=1" className="nav__mobile-link">New Arrivals</Link>

          <p className="nav__mobile-section">Shop by Type</p>
          {SHOP_TYPES.map(t => (
            <Link key={t.slug} href={`/gallery?tradition=${t.slug}`} className="nav__mobile-link">{t.label}</Link>
          ))}

          {/* Learning — secondary gate */}
          <p className="nav__mobile-section">Explore</p>
          <Link href="/traditions" className="nav__mobile-link">Traditions</Link>
          <Link href="/regions" className="nav__mobile-link">Regions</Link>
          <Link href="/motifs" className="nav__mobile-link">Motifs</Link>
          <Link href="/journal" className="nav__mobile-link">Journal</Link>
          <Link href="/about" className="nav__mobile-link">About</Link>
        </div>
      )}
    </>
  )
}
