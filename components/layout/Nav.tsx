'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import TanitMark from '@/components/TanitMark'
import { useCart } from '@/lib/cart-context'
import { PALETTE } from '@/lib/palette'
import type { ShopMenuData } from '@/lib/rug-source'

// Knowledge layer on the left; commerce (SHOP) on the right.
const links = [
  { href: '/motifs', label: 'Motifs' },
  { href: '/regions', label: 'Regions' },
  { href: '/traditions', label: 'Traditions' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]

function CartButton() {
  const { itemCount, openCart } = useCart()
  return (
    <button className="nav__cart" onClick={openCart} aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 2h1.5l2 7h5l1.5-4.5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="12.5" r="0.8" fill="currentColor"/>
        <circle cx="10.5" cy="12.5" r="0.8" fill="currentColor"/>
      </svg>
      {itemCount > 0 && <span className="nav__cart-count">{itemCount}</span>}
    </button>
  )
}

export default function Nav({ shopMenu }: { shopMenu?: ShopMenuData | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Hover intent — open on enter, close on a short delay so the cursor can travel
  const armClose = () => { closeTimer.current = setTimeout(() => setShopOpen(false), 180) }
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current) }

  return (
    <>
      <style>{`
        /* Announcement line — quiet, factual, Toast register */
        .nav-announce {
          position: fixed; top: 0; left: 0; right: 0; z-index: 201;
          height: 28px;
          background: var(--white);
          border-bottom: 1px solid var(--grey-100);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-600);
          padding: 0 var(--sp-4);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .nav {
          position: fixed; top: 28px; left: 0; right: 0; z-index: 200;
          height: 56px;
          background: var(--white);
          border-bottom: 1px solid transparent;
          transition: border-color 300ms ease;
          display: flex; align-items: center;
        }
        .nav--scrolled { border-bottom-color: var(--grey-200); }

        /* ── SHOP mega menu ───────────────────────────────────── */
        .shopmenu-wrap { position: relative; display: flex; align-items: center; }
        .shopmenu {
          position: fixed; top: 84px; left: 0; right: 0; z-index: 198;
          background: var(--white);
          border-bottom: var(--border);
          animation: shopFade 180ms ease both;
        }
        @keyframes shopFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .shopmenu__inner {
          max-width: var(--max-w); margin: 0 auto;
          padding: var(--sp-12) var(--sp-8) var(--sp-16);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.2fr;
          gap: var(--sp-12);
        }
        .shopmenu__col-label {
          font-family: var(--font-ui);
          font-size: 0.5rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--grey-400);
          display: block; margin-bottom: var(--sp-4);
          padding-bottom: var(--sp-2);
          border-bottom: 1px solid var(--grey-100);
        }
        .shopmenu__link {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: var(--sp-4);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--black);
          padding: 0.3rem 0;
          transition: color var(--t);
        }
        .shopmenu__link:hover { color: var(--grey-600); }
        .shopmenu__link--strong { font-family: var(--font-ui); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.45rem 0; }
        .shopmenu__count {
          font-family: var(--font-ui); font-size: 0.5rem;
          letter-spacing: 0.06em; color: var(--grey-400);
        }
        .shopmenu__swatches { display: flex; flex-wrap: wrap; gap: 8px; max-width: 160px; }
        .shopmenu__swatch {
          width: 18px; height: 18px; border-radius: 50%; display: block;
          transition: transform 200ms ease;
        }
        .shopmenu__swatch:hover { transform: scale(1.2); }
        .shopmenu__swatch--light { box-shadow: inset 0 0 0 1px var(--grey-200); }
        .shopmenu__featured { display: block; }
        .shopmenu__featured-img {
          display: block;
          position: relative; aspect-ratio: 4/3; overflow: hidden;
          background: var(--grey-100); margin-bottom: var(--sp-4);
        }
        .shopmenu__featured-img img { object-fit: cover; transition: transform 600ms var(--ease); }
        .shopmenu__featured:hover .shopmenu__featured-img img { transform: scale(1.04); }
        .shopmenu__featured-name {
          font-family: var(--font-display); font-size: 1.125rem; font-weight: 400; color: var(--black);
        }
        .shopmenu__featured-meta {
          font-family: var(--font-ui); font-size: 0.5625rem;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-400);
          margin-top: 0.2rem;
        }
        .shopmenu__overlay {
          position: fixed; left: 0; right: 0; bottom: 0; top: 84px;
          background: rgba(8,8,8,0.18); z-index: 197;
        }
        @media (max-width: 767px) { .shopmenu, .shopmenu__overlay { display: none; } }
        .nav__inner {
          width: 100%; max-width: var(--max-w); margin: 0 auto;
          padding: 0 var(--sp-8);
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav__left { display: flex; align-items: center; gap: var(--sp-8); }
        .nav__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--black);
          white-space: nowrap;
          text-decoration: none;
        }
        .nav__logo-wordmark {
          font-family: var(--font-ui);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--black);
        }
        .nav__tagline {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-style: italic;
          color: var(--grey-600);
          display: none;
        }
        @media (min-width: 900px) { .nav__tagline { display: block; } }
        .nav__links {
          display: none;
          align-items: center;
        }
        @media (min-width: 768px) { .nav__links { display: flex; } }
        .nav__link {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          height: 56px;
          padding: 0 var(--sp-4);
          display: flex; align-items: center;
          position: relative;
          transition: color var(--t);
        }
        .nav__link::after {
          content: '';
          position: absolute; bottom: 0; left: var(--sp-4); right: var(--sp-4);
          height: 1px; background: var(--black);
          transform: scaleX(0); transition: transform var(--t);
        }
        .nav__link:hover { color: var(--black); }
        .nav__link--active { color: var(--black); }
        .nav__link--active::after { transform: scaleX(1); }
        .nav__inquire {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          border: 1px solid var(--grey-800);
          height: 30px;
          padding: 0 var(--sp-4);
          display: flex; align-items: center;
          margin-left: var(--sp-4);
          transition: background var(--t), color var(--t);
        }
        .nav__inquire:hover { background: var(--black); color: var(--white); }
        .nav__burger {
          display: flex; flex-direction: column; gap: 5px;
          padding: 8px; margin-right: -8px;
        }
        @media (min-width: 768px) { .nav__burger { display: none; } }
        .nav__burger span {
          display: block; width: 22px; height: 1px; background: var(--black);
          transition: transform var(--t), opacity var(--t);
        }
        .nav__burger--open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav__burger--open span:nth-child(2) { opacity: 0; }
        .nav__burger--open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .nav__mobile {
          position: fixed; top: 84px; left: 0; right: 0; bottom: 0;
          background: var(--white); z-index: 199;
          padding: var(--sp-12) var(--sp-8);
          display: flex; flex-direction: column;
          border-top: var(--border);
          animation: fadeUp 0.25s ease both;
        }
        .nav__mobile-link {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          padding: var(--sp-4) 0;
          border-bottom: var(--border);
          display: block;
        }
        .nav__mobile-inquire {
          margin-top: var(--sp-8);
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--black); color: var(--white);
          height: 48px; padding: 0 var(--sp-8);
          width: 100%;
        }

        /* Cart icon */
        .nav__cart {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--black);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-left: var(--sp-2);
          transition: opacity var(--t);
          height: 26px;
        }
        .nav__cart:hover { opacity: 0.6; }
        .nav__cart-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: var(--black);
          color: var(--white);
          border-radius: 50%;
          font-size: 0.4375rem;
          font-weight: 600;
          letter-spacing: 0;
        }
      `}</style>

      <div className="nav-announce">Each piece is one of a kind · Ships worldwide from Marrakech</div>

      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <div className="nav__left">
            <Link href="/" className="nav__logo"><TanitMark size={22} color="currentColor" /><span className="nav__logo-wordmark">Tilwen</span></Link>
            <span className="nav__tagline">The magic is woven in.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="nav__links">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav__link${pathname.startsWith(href) ? ' nav__link--active' : ''}`}
                >
                  {label}
                </Link>
              ))}
              <div
                className="shopmenu-wrap"
                onMouseEnter={() => { cancelClose(); setShopOpen(true) }}
                onMouseLeave={armClose}
              >
                <button
                  className="nav__inquire"
                  onClick={() => setShopOpen(v => !v)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                >
                  Shop
                </button>
              </div>
            </div>
            {/* Cart */}
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

      {/* SHOP mega menu — desktop */}
      {shopOpen && (
        <>
          <div className="shopmenu__overlay" onClick={() => setShopOpen(false)} />
          <div
            className="shopmenu"
            onMouseEnter={cancelClose}
            onMouseLeave={armClose}
          >
            <div className="shopmenu__inner">

              <div>
                <span className="shopmenu__col-label">Shop</span>
                <Link href="/gallery?new=1" className="shopmenu__link shopmenu__link--strong">New Arrivals</Link>
                <Link href="/gallery" className="shopmenu__link shopmenu__link--strong">
                  All Pieces
                  {shopMenu && <span className="shopmenu__count">{shopMenu.totalCount}</span>}
                </Link>
                {shopMenu && shopMenu.palette.length > 0 && (
                  <div style={{ marginTop: 'var(--sp-8)' }}>
                    <span className="shopmenu__col-label">By Palette</span>
                    <div className="shopmenu__swatches">
                      {shopMenu.palette.map(key => {
                        const c = PALETTE[key]
                        if (!c) return null
                        const isLight = ['ivory', 'cream', 'sand'].includes(key)
                        return (
                          <Link
                            key={key}
                            href={`/gallery?palette=${key}`}
                            className={`shopmenu__swatch${isLight ? ' shopmenu__swatch--light' : ''}`}
                            style={{ background: c.hex }}
                            title={c.label}
                            aria-label={`Shop ${c.label} pieces`}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <span className="shopmenu__col-label">By Tradition</span>
                {(shopMenu?.traditions || []).map(t => (
                  <Link key={t.slug} href={`/gallery?tradition=${t.slug}`} className="shopmenu__link">
                    {t.name}
                    <span className="shopmenu__count">{t.count}</span>
                  </Link>
                ))}
                {(!shopMenu || shopMenu.traditions.length === 0) && (
                  <Link href="/gallery" className="shopmenu__link">All pieces</Link>
                )}
              </div>

              <div>
                <span className="shopmenu__col-label">By Region</span>
                {(shopMenu?.regions || []).map(r => (
                  <Link key={r.slug} href={`/gallery?region=${r.slug}`} className="shopmenu__link">
                    {r.name}
                    <span className="shopmenu__count">{r.count}</span>
                  </Link>
                ))}
                {(!shopMenu || shopMenu.regions.length === 0) && (
                  <Link href="/regions" className="shopmenu__link">Regional traditions</Link>
                )}
              </div>

              <div>
                {shopMenu?.featured && (
                  <Link href={`/gallery/${shopMenu.featured.slug}`} className="shopmenu__featured">
                    <span className="shopmenu__col-label">Just Arrived</span>
                    <span className="shopmenu__featured-img">
                      <Image
                        src={shopMenu.featured.image}
                        alt={`${shopMenu.featured.given_name} — ${shopMenu.featured.cultural_name}`}
                        fill
                        sizes="320px"
                      />
                    </span>
                    <span className="shopmenu__featured-name">{shopMenu.featured.given_name}</span>
                    <span className="shopmenu__featured-meta" style={{ display: 'block' }}>
                      {shopMenu.featured.cultural_name !== shopMenu.featured.given_name
                        ? `${shopMenu.featured.cultural_name} · `
                        : ''}€{shopMenu.featured.price.toLocaleString()}
                    </span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        </>
      )}

      {open && (
        <div className="nav__mobile">
          <Link href="/gallery" className="nav__mobile-link" style={{ fontWeight: 600 }}>Shop All Pieces</Link>
          <Link href="/gallery?new=1" className="nav__mobile-link">New Arrivals</Link>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="nav__mobile-link">{label}</Link>
          ))}
          <Link href="/inquire" className="nav__mobile-inquire">Inquire</Link>
        </div>
      )}
    </>
  )
}
