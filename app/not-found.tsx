import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        .not-found {
          min-height: 60vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; gap: var(--sp-6);
          padding: var(--sp-32) var(--sp-8);
        }
        .not-found__code {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
        .not-found__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          color: var(--black);
        }
        .not-found__text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--grey-600);
          max-width: 40ch;
          line-height: 1.6;
        }
        .not-found__links { display: flex; gap: var(--sp-4); flex-wrap: wrap; justify-content: center; margin-top: var(--sp-4); }
      `}</style>

      <div className="not-found">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__text">
          This piece may have sold, or this page may no longer exist.
        </p>
        <div className="not-found__links">
          <Link href="/gallery" className="btn btn--primary">Browse the Gallery</Link>
          <Link href="/" className="btn btn--outline">Return Home</Link>
        </div>
      </div>
    </>
  )
}
