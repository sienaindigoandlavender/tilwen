'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'

// TOAST-structure nav: thin utility bar + sticky horizontal nav with a Rugs
// mega-menu. Keeps cart, search, and mobile menu wired exactly as before.
function CartButton() {
  const { itemCount, openCart } = useCart()
  return (
    <button className="tn__icon" onClick={openCart} aria-label={`Bag — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}>
      Bag{itemCount > 0 && <span className="tn__count"> ({itemCount})</span>}
    </button>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/moroccan-rugs?q=${encodeURIComponent(q)}` : '/moroccan-rugs')
    setOpen(false); setSearchOpen(false)
  }

  return (
    <>
      <style>{`
        .tn-util {
          background: var(--ink, #141310); color: var(--paper, #FBFBF9);
          font-family: var(--font-body); font-size: 0.75rem; letter-spacing: 0.01em;
          display: flex; align-items: center; justify-content: center; gap: 1.6rem;
          height: 34px; padding: 0 var(--sp-8); position: relative;
        }
        .tn-util__region { position: absolute; right: var(--sp-8); opacity: 0.65; font-style: italic; }
        @media (max-width: 640px){ .tn-util { font-size: 0.6875rem; } .tn-util__region { display: none; } }

        .tn { position: sticky; top: 0; z-index: 200; background: var(--paper, #FBFBF9); border-bottom: 1px solid var(--hair, #E2E1DB); }
        .tn__row { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--sp-8);
          display: flex; align-items: center; justify-content: space-between; height: 74px; }
        @media (max-width: 640px){ .tn__row { padding: 0 var(--sp-4); height: 62px; } }

        .tn__mark { font-family: var(--font-display); font-weight: 300; font-size: 1.75rem; letter-spacing: 0.02em; color: var(--ink); }

        .tn__links { display: flex; gap: 1.9rem; }
        @media (max-width: 900px){ .tn__links { display: none; } }
        .tn__link { font-family: var(--font-body); font-size: 1rem; color: var(--ink); padding: 26px 0; position: relative; }
        .tn__link:hover { color: var(--ink2, #403E39); }
        .tn__link--active::after { content:''; position:absolute; left:0; right:0; bottom:20px; height:1px; background: var(--ink); }

        .tn__util { display: flex; align-items: center; gap: 1.1rem; }
        .tn__icon { font-family: var(--font-body); font-size: 0.9375rem; color: var(--ink); background:none; border:none; cursor:pointer; }
        .tn__icon:hover { opacity: 0.6; }
        .tn__count { }

        /* mega-menu */
        .tn__mega-wrap { position: static; }
        .tn__mega {
          position: absolute; left: 0; right: 0; top: 100%;
          background: var(--paper); border-bottom: 1px solid var(--hair);
          display: none; padding: 44px var(--sp-8) 50px;
          box-shadow: 0 26px 40px -32px rgba(0,0,0,.22);
        }
        .tn__mega-wrap:hover .tn__mega { display: block; }
        .tn__mega-in { max-width: var(--max-w); margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 44px; }
        .tn__mega h5 { font-family: var(--font-body); font-style: italic; font-size: 0.9375rem; color: var(--ink); opacity:.75; margin-bottom: 16px; font-weight: 400; }
        .tn__mega a { display: block; font-family: var(--font-body); font-size: 1rem; color: var(--ink); margin-bottom: 10px; padding: 0; }
        .tn__mega a:hover { color: var(--ink2); }
        .tn__mega-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .tn__tile { aspect-ratio: 4/5; background: var(--paper2, #F1F0EC); position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 16px; }
        .tn__tile span { font-family: var(--font-display); font-size: 1.25rem; color: var(--ink); position: relative; z-index: 2; }
        .tn__tile img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }

        /* search overlay */
        .tn__search { display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid var(--ink); padding-bottom:3px; }
        .tn__search input { border:none; outline:none; background:none; font-family: var(--font-body); font-size:0.95rem; color:var(--ink); width:150px; }
        .tn__search input::placeholder { color: var(--ink2); }

        .tn__burger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:6px; }
        @media (max-width: 900px){ .tn__burger { display:flex; } }
        .tn__burger span { width:22px; height:1px; background:var(--ink); transition: transform var(--t), opacity var(--t); }
        .tn__burger--open span:nth-child(1){ transform: translateY(6px) rotate(45deg); }
        .tn__burger--open span:nth-child(2){ opacity:0; }
        .tn__burger--open span:nth-child(3){ transform: translateY(-6px) rotate(-45deg); }

        .tn__mobile { position: fixed; inset: 96px 0 0 0; background: var(--paper); z-index:199; padding: var(--sp-8); overflow-y:auto; border-top:1px solid var(--hair); }
        .tn__mobile-search { display:flex; gap:.6rem; align-items:center; border:1px solid var(--hair); height:46px; padding:0 14px; margin-bottom: var(--sp-6); }
        .tn__mobile-search input { border:none; outline:none; background:none; width:100%; font-family:var(--font-body); font-size:1rem; }
        .tn__mobile a { display:block; font-family: var(--font-display); font-size: 1.4rem; color:var(--ink); padding: 14px 0; border-bottom:1px solid var(--hair); }
        .tn__mobile-shop { color: var(--paper) !important; background: var(--ink); text-align:center; border:none !important; margin-top: var(--sp-6); font-family: var(--font-body) !important; font-size: 1rem !important; letter-spacing:0.02em; }
      `}</style>

      <div className="tn-util">
        Complimentary shipping worldwide over €400 · Each piece is one of a kind
        <span className="tn-util__region">Morocco (EUR)</span>
      </div>

      <nav className="tn">
        <div className="tn__row">
          <Link href="/" className="tn__mark">Tilwen</Link>

          <div className="tn__links">
            <div className="tn__mega-wrap">
              <Link href="/moroccan-rugs" className={`tn__link${pathname.startsWith('/moroccan-rugs') ? ' tn__link--active' : ''}`}>Rugs</Link>
              <div className="tn__mega">
                <div className="tn__mega-in">
                  <div>
                    <h5>Browse</h5>
                    <Link href="/moroccan-rugs">All rugs</Link>
                    <Link href="/moroccan-rugs?new=1">New this month</Link>
                    <Link href="/moroccan-rugs?type=flatweave">Flatweave</Link>
                    <Link href="/moroccan-rugs?size=runner">Runners</Link>
                  </div>
                  <div>
                    <h5>By tradition</h5>
                    <Link href="/traditions/beni-ourain">Beni Ourain</Link>
                    <Link href="/traditions/azilal">Azilal</Link>
                    <Link href="/traditions/boujad">Boujad</Link>
                    <Link href="/traditions/zemmour">Zemmour</Link>
                    <Link href="/traditions">All traditions</Link>
                  </div>
                  <div className="tn__mega-tiles">
                    <Link href="/moroccan-rugs?new=1" className="tn__tile"><span>New this month</span></Link>
                    <Link href="/traditions/boucherouitte" className="tn__tile"><span>Boucherouitte</span></Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/traditions" className={`tn__link${pathname.startsWith('/traditions') ? ' tn__link--active' : ''}`}>Traditions</Link>
            <Link href="/regions" className={`tn__link${pathname.startsWith('/regions') ? ' tn__link--active' : ''}`}>Regions</Link>
            <Link href="/stories" className={`tn__link${pathname.startsWith('/stories') ? ' tn__link--active' : ''}`}>Stories</Link>
            <Link href="/about" className={`tn__link${pathname.startsWith('/about') ? ' tn__link--active' : ''}`}>About</Link>
          </div>

          <div className="tn__util">
            {searchOpen ? (
              <form className="tn__search" onSubmit={submitSearch} role="search">
                <input autoFocus type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search rugs" aria-label="Search the gallery" onBlur={() => !query && setSearchOpen(false)} />
              </form>
            ) : (
              <button className="tn__icon" onClick={() => setSearchOpen(true)}>Search</button>
            )}
            <CartButton />
            <button className={`tn__burger${open ? ' tn__burger--open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="tn__mobile">
          <form className="tn__mobile-search" onSubmit={submitSearch} role="search">
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the gallery" aria-label="Search the gallery" />
          </form>
          <Link href="/moroccan-rugs">Rugs</Link>
          <Link href="/traditions">Traditions</Link>
          <Link href="/regions">Regions</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/about">About</Link>
          <Link href="/moroccan-rugs" className="tn__mobile-shop">Shop all pieces</Link>
        </div>
      )}
    </>
  )
}
