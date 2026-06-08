'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import TanitMark from '@/components/TanitMark'
import { useCart } from '@/lib/cart-context'

const links = [
  { href: '/gallery', label: 'Gallery' },
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

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 56px;
          background: var(--white);
          border-bottom: 1px solid transparent;
          transition: border-color 300ms ease;
          display: flex; align-items: center;
        }
        .nav--scrolled { border-bottom-color: var(--grey-200); }
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
          position: fixed; top: 56px; left: 0; right: 0; bottom: 0;
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

      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <div className="nav__left">
            <Link href="/" className="nav__logo"><TanitMark size={22} color="currentColor" /><span className="nav__logo-wordmark">Tilwen</span></Link>
            <span className="nav__tagline">Each piece is one of a kind. When it is gone, it is gone.</span>
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
              <button className="nav__inquire" onClick={() => {/* mega menu — coming */}}>Shop</button>
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

      {open && (
        <div className="nav__mobile">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="nav__mobile-link">{label}</Link>
          ))}
          <Link href="/gallery" className="nav__mobile-inquire">Shop</Link>
        </div>
      )}
    </>
  )
}
