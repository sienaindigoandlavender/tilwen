import Link from 'next/link'

export default function Footer() {
  const year = 2026
  return (
    <footer className="tf">
      <style>{`
        .tf { background: var(--ink); color: var(--paper); padding: 80px 0 46px; margin-top: 0; }
        .tf__in { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--sp-8); }
        @media(max-width:640px){ .tf__in { padding: 0 var(--sp-4); } }
        .tf__cols { display:grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 40px; }
        @media(max-width:820px){ .tf__cols { grid-template-columns: 1fr 1fr; gap: 34px; } }
        .tf__mark { font-family: var(--font-display); font-weight:300; font-size:1.9rem; }
        .tf__blurb { font-family: var(--font-body); font-size:1rem; opacity:.9; margin-top:14px; max-width:28ch; line-height:1.55; }
        .tf__col h4 { font-family: var(--font-body); font-style:italic; font-weight:400; font-size:0.9375rem; opacity:.8; margin-bottom:15px; }
        .tf__col a { display:block; font-family: var(--font-body); font-size:1rem; opacity:1; margin-bottom:10px; }
        .tf__col a:hover { opacity: .6; }
        .tf__sign p { font-family: var(--font-body); font-size:1rem; opacity:.95; margin-bottom:14px; }
        .tf__sign form { display:flex; border-bottom:1px solid rgba(255,255,255,.4); }
        .tf__sign input { flex:1; background:none; border:none; color:var(--paper); padding:8px 0; font-family:var(--font-body); font-size:0.95rem; outline:none; }
        .tf__sign input::placeholder { color: rgba(255,255,255,.5); }
        .tf__sign button { background:none; border:none; color:var(--paper); font-family:var(--font-body); font-style:italic; font-size:0.95rem; cursor:pointer; padding-left:12px; }
        .tf__rule { height:2px; width:60px; background: var(--oxblood); margin: 64px 0 22px; }
        .tf__fine { font-family: var(--font-body); font-size:0.875rem; opacity:.7; font-style:italic; display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .tf__fine a { opacity:.7; }
      `}</style>
      <div className="tf__in">
        <div className="tf__cols">
          <div>
            <div className="tf__mark">Tilwen</div>
            <p className="tf__blurb">A Marrakech gallery of vintage Amazigh (Berber) rugs, documented honestly.</p>
          </div>
          <div className="tf__col">
            <h4>Rugs</h4>
            <Link href="/moroccan-rugs">The gallery</Link>
            <Link href="/traditions">Traditions</Link>
            <Link href="/regions">Regions</Link>
            <Link href="/motifs">Motifs</Link>
          </div>
          <div className="tf__col">
            <h4>Read</h4>
            <Link href="/stories">Stories</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/about">About</Link>
            <Link href="/care">Care</Link>
          </div>
          <div className="tf__col tf__sign">
            <h4>Newsletter</h4>
            <p>New pieces and the occasional story. No noise.</p>
            <form action="/api/subscribe" method="post">
              <input type="email" name="email" placeholder="Your email" aria-label="Email address" />
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
        <div className="tf__rule" />
        <div className="tf__fine">
          <span>© {year} Tilwen · Vintage Amazigh rugs · Marrakech, Morocco</span>
          <span><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link></span>
        </div>
      </div>
    </footer>
  )
}
