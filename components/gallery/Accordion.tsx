'use client'
import { useState } from 'react'

export default function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`acc${open ? ' acc--open' : ''}`}>
      <style>{`
        .acc { border-bottom: var(--border); }
        .acc__head {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--sp-4);
          padding: var(--sp-6) 0;
          text-align: left;
          font-family: var(--font-ui);
          font-size: 0.6875rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--black);
          transition: color var(--t);
        }
        .acc__head:hover { color: var(--grey-600); }
        .acc__sign {
          position: relative; width: 11px; height: 11px; flex-shrink: 0;
        }
        .acc__sign::before, .acc__sign::after {
          content: ''; position: absolute; background: currentColor;
          transition: transform 240ms ease, opacity 240ms ease;
        }
        .acc__sign::before { top: 5px; left: 0; width: 11px; height: 1px; }
        .acc__sign::after  { left: 5px; top: 0; width: 1px; height: 11px; }
        .acc--open .acc__sign::after { transform: scaleY(0); opacity: 0; }

        .acc__panel {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 280ms ease;
        }
        .acc--open .acc__panel { grid-template-rows: 1fr; }
        .acc__inner { overflow: hidden; }
        .acc__body { padding-bottom: var(--sp-8); }
      `}</style>

      <button
        className="acc__head"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {title}
        <span className="acc__sign" aria-hidden="true" />
      </button>

      <div className="acc__panel">
        <div className="acc__inner">
          <div className="acc__body">{children}</div>
        </div>
      </div>
    </div>
  )
}
