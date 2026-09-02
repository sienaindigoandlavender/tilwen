import Link from 'next/link'
import { regions } from '@/data/regions'
import { getStories } from '@/lib/stories'

export const metadata = {
  title: 'Tilwen — Vintage Amazigh rugs from Morocco',
  description: 'A Marrakech gallery of vintage Amazigh (Berber) rugs, documented honestly — what each piece is, where it is from, and how to read it.',
}

// Image slots are placeholders (neutral grounds) until the MidJourney heroes and
// region/story art land. Each tile is built to drop a real image behind its text.
export default async function HomePage() {
  const stories = (await getStories()).slice(0, 3)

  return (
    <>
      <style>{`
        .hp { background: var(--paper); color: var(--ink); }
        .hp a { color: inherit; }
        .hp-wrap { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--sp-8); }
        @media(max-width:640px){ .hp-wrap { padding: 0 var(--sp-4); } }

        /* hero */
        .hp-hero { height: 86vh; min-height: 520px; position: relative; display:flex; align-items:flex-end;
          color: var(--paper);
          background: linear-gradient(180deg,rgba(20,19,16,0) 45%,rgba(20,19,16,.52)),
            radial-gradient(120% 90% at 65% 25%,#a99e8c,#6d6153 48%,#37312a); }
        .hp-hero__cap { padding: 0 var(--sp-8) 54px; }
        @media(max-width:640px){ .hp-hero__cap { padding: 0 var(--sp-4) 36px; } }
        .hp-hero__k { font-family: var(--font-body); font-style: italic; font-size: 1.0625rem; opacity: 1; }
        .hp-hero__h { font-family: var(--font-display); font-weight: 300; font-size: clamp(38px,5.4vw,74px); line-height: 1; margin-top: 12px; max-width: 16ch; }
        .hp-hero__p { margin-top: 16px; font-family: var(--font-body); font-size: 1.125rem; max-width: 46ch; opacity: 1; }

        /* feature tiles */
        .hp-feat { display:grid; grid-template-columns:1fr 1fr; gap:26px; padding: 70px 0 0; }
        .hp-feat--3 { grid-template-columns:1fr 1fr 1fr; padding-top:26px; padding-bottom:70px; }
        .hp-tile { position:relative; overflow:hidden; display:flex; align-items:flex-end; min-height:440px; color:var(--paper); padding:30px; }
        .hp-tile--tall { min-height:600px; }
        .hp-tile__in { position:relative; z-index:2; }
        .hp-tile__k { font-family: var(--font-body); font-style:italic; font-size:0.9375rem; opacity:1; }
        .hp-tile__h { font-family: var(--font-display); font-weight:400; font-size:1.9rem; margin-top:6px; }
        .hp-tile__l { font-family: var(--font-body); font-size:0.9rem; font-style:italic; border-bottom:1px solid rgba(255,255,255,.6); display:inline-block; margin-top:12px; padding-bottom:2px; }
        .hp-g1{background:radial-gradient(120% 100% at 40% 25%,#8f8577,#4a443a)}
        .hp-g2{background:radial-gradient(120% 100% at 40% 25%,#79463c,#341f1a)}
        .hp-g3{background:radial-gradient(120% 100% at 40% 25%,#9a9384,#565045)}
        .hp-g4{background:radial-gradient(120% 100% at 40% 25%,#6f6a5c,#302c25)}
        @media(max-width:820px){ .hp-feat,.hp-feat--3{grid-template-columns:1fr} .hp-tile,.hp-tile--tall{min-height:380px} }

        /* mission */
        .hp-mission { background: var(--paper2); padding: 100px 0; text-align:center; }
        .hp-mission__in { max-width: 720px; margin:0 auto; }
        .hp-mission__k { font-family: var(--font-body); font-style:italic; color: var(--ink); }
        .hp-mission__h { font-family: var(--font-display); font-weight:300; font-size:clamp(26px,3.4vw,44px); line-height:1.14; margin:14px 0 22px; }
        .hp-mission__l { font-family: var(--font-body); font-style:italic; border-bottom:1px solid var(--ink); padding-bottom:2px; }

        /* stories */
        .hp-mag { padding: 90px 0; }
        .hp-mag__head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:40px; }
        .hp-mag__head h2 { font-family: var(--font-display); font-weight:400; font-size:1.75rem; }
        .hp-mag__head a { font-family: var(--font-body); font-style:italic; font-size:0.95rem; }
        .hp-mag__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        .hp-art__img { aspect-ratio:4/3; background:var(--paper2); margin-bottom:16px; overflow:hidden; }
        .hp-art__img img { width:100%; height:100%; object-fit:cover; }
        .hp-art h3 { font-family: var(--font-display); font-size:1.4rem; font-weight:400; }
        .hp-art p { font-family: var(--font-body); font-size:1.0625rem; color:var(--ink); margin-top:7px; max-width:42ch; line-height:1.55; }
        .hp-art__m { font-family: var(--font-body); font-size:0.9375rem; font-style:italic; color:var(--ink); opacity:.75; margin-top:11px; }
        @media(max-width:820px){ .hp-mag__grid{grid-template-columns:1fr} }
      `}</style>

      <div className="hp">
        {/* hero */}
        <header className="hp-hero">
          <div className="hp-hero__cap">
            <span className="hp-hero__k">Vintage Amazigh rugs from Morocco</span>
            <h1 className="hp-hero__h">Handwoven in the Atlas Mountains.</h1>
            <p className="hp-hero__p">From the mountains and the south — the wool, the dye, and the hand of the loom.</p>
          </div>
        </header>

        <div className="hp-wrap">
          {/* feature tiles */}
          <div className="hp-feat">
            <Link href={`/regions/${regions[3]?.slug || 'middle-atlas'}`} className="hp-tile hp-tile--tall hp-g1">
              <div className="hp-tile__in">
                <span className="hp-tile__k">In the hands of weavers</span>
                <div className="hp-tile__h">The Middle Atlas</div>
                <span className="hp-tile__l">Discover the region</span>
              </div>
            </Link>
            <Link href="/moroccan-rugs?new=1" className="hp-tile hp-g2">
              <div className="hp-tile__in">
                <span className="hp-tile__k">New this month</span>
                <div className="hp-tile__h">Fresh from the Atlas</div>
                <span className="hp-tile__l">See what's new</span>
              </div>
            </Link>
          </div>

          <div className="hp-feat hp-feat--3">
            <Link href="/traditions/beni-ourain" className="hp-tile hp-g3"><div className="hp-tile__in"><div className="hp-tile__h">Beni Ourain</div><span className="hp-tile__l">The tradition</span></div></Link>
            <Link href="/traditions/zanafi" className="hp-tile hp-g4"><div className="hp-tile__in"><div className="hp-tile__h">Flatweaves</div><span className="hp-tile__l">Zanafi &amp; Taznakht</span></div></Link>
            <Link href="/traditions/boucherouitte" className="hp-tile hp-g2"><div className="hp-tile__in"><div className="hp-tile__h">Boucherouitte</div><span className="hp-tile__l">Made from what was there</span></div></Link>
          </div>
        </div>

        {/* mission */}
        <section className="hp-mission">
          <div className="hp-wrap"><div className="hp-mission__in">
            <span className="hp-mission__k">Why Tilwen</span>
            <h2 className="hp-mission__h">Every rug online arrives wrapped in a story. We tell you what&apos;s true, and where the story ends.</h2>
            <Link href="/about" className="hp-mission__l">Read our approach</Link>
          </div></div>
        </section>

        {/* stories */}
        {stories.length > 0 && (
          <section className="hp-wrap hp-mag">
            <div className="hp-mag__head"><h2>Stories</h2><Link href="/stories">All stories</Link></div>
            <div className="hp-mag__grid">
              {stories.map(s => (
                <Link key={s.slug} href={`/stories/${s.slug}`} className="hp-art">
                  <div className="hp-art__img">{s.cover_image && <img src={s.cover_image} alt={s.image_alt || s.title} />}</div>
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  {s.theme_tags?.[0] && <div className="hp-art__m">{s.theme_tags[0]}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
