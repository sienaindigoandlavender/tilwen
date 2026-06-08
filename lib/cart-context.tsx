'use client'
/**
 * Cart context — wraps the app and manages Shopify cart state
 *
 * Cart ID is persisted in localStorage so it survives page refreshes.
 * On mount, the stored cart ID is validated against Shopify — if expired
 * or not found, a new cart is created.
 *
 * Usage:
 *   const { cart, addItem, removeItem, isOpen, openCart, closeCart } = useCart()
 */

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import {
  ShopifyCart,
  CartLine,
  createCart,
  addToCart,
  removeFromCart,
  getCart,
  formatPrice,
} from './shopify'

// ── Types ────────────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: ShopifyCart | null
  isLoading: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  itemCount: number
  formattedTotal: string
}

// ── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null)

const CART_ID_KEY = 'tilwen_cart_id'

// ── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // On mount — restore or create cart
  useEffect(() => {
    const init = async () => {
      const storedId = typeof window !== 'undefined'
        ? localStorage.getItem(CART_ID_KEY)
        : null

      if (storedId) {
        try {
          const existing = await getCart(storedId)
          if (existing) {
            setCart(existing)
            return
          }
        } catch {
          // Cart expired or invalid — fall through to create new
        }
      }

      // No valid cart — create one silently (no loading state on init)
      try {
        const fresh = await createCart()
        localStorage.setItem(CART_ID_KEY, fresh.id)
        setCart(fresh)
      } catch {
        // Shopify not connected yet — silently fail
        // Cart will be created on first addItem
      }
    }
    init()
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      let cartId = cart?.id
      if (!cartId) {
        const fresh = await createCart()
        cartId = fresh.id
        localStorage.setItem(CART_ID_KEY, cartId)
      }
      const updated = await addToCart(cartId, [{ merchandiseId: variantId, quantity }])
      setCart(updated)
      setIsOpen(true) // open drawer on add
    } catch (err) {
      console.error('Add to cart failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return
    setIsLoading(true)
    try {
      const updated = await removeFromCart(cart.id, [lineId])
      setCart(updated)
    } catch (err) {
      console.error('Remove from cart failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const itemCount = cart?.totalQuantity ?? 0
  const formattedTotal = cart
    ? formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)
    : '€0'

  return (
    <CartContext.Provider value={{
      cart, isLoading, isOpen, openCart, closeCart,
      addItem, removeItem, itemCount, formattedTotal,
    }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

// ── Cart Drawer ───────────────────────────────────────────────────────────────

function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, isLoading, formattedTotal } = useCart()
  const lines: CartLine[] = cart?.lines.edges.map(e => e.node) ?? []

  return (
    <>
      <style>{`
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(8,8,8,0.4);
          z-index: 200; opacity: 0; pointer-events: none;
          transition: opacity 300ms ease;
        }
        .cart-overlay--open { opacity: 1; pointer-events: all; }

        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 420px; max-width: 100vw;
          background: var(--white);
          z-index: 201;
          transform: translateX(100%);
          transition: transform 340ms cubic-bezier(0.32,0,0.15,1);
          display: flex; flex-direction: column;
          border-left: var(--border);
        }
        .cart-drawer--open { transform: translateX(0); }

        .cart-drawer__head {
          padding: var(--sp-6) var(--sp-8);
          border-bottom: var(--border);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        .cart-drawer__title {
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--black);
        }
        .cart-drawer__close {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          color: var(--grey-400);
          background: none; border: none; cursor: pointer;
          padding: 4px; transition: color var(--t);
        }
        .cart-drawer__close:hover { color: var(--black); }

        .cart-drawer__body {
          flex: 1; overflow-y: auto; padding: var(--sp-6) var(--sp-8);
        }

        .cart-empty {
          height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: var(--sp-4); text-align: center;
          padding: var(--sp-16);
        }
        .cart-empty__text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-style: italic;
          color: var(--grey-400);
        }
        .cart-empty__link {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: 1px;
          text-decoration: none;
        }

        .cart-line {
          display: grid;
          grid-template-columns: 72px 1fr auto;
          gap: var(--sp-4);
          padding: var(--sp-4) 0;
          border-bottom: var(--border);
          align-items: start;
        }
        .cart-line__img {
          aspect-ratio: 1; overflow: hidden; background: var(--grey-100);
          position: relative;
        }
        .cart-line__img img { width: 100%; height: 100%; object-fit: cover; }
        .cart-line__name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--black);
          letter-spacing: -0.01em;
          display: block;
          margin-bottom: 0.25rem;
        }
        .cart-line__meta {
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
        }
        .cart-line__price {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          color: var(--black);
          white-space: nowrap;
        }
        .cart-line__remove {
          display: block;
          font-family: var(--font-ui);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-400);
          background: none; border: none; cursor: pointer;
          padding: 0; margin-top: var(--sp-2);
          transition: color var(--t); text-align: left;
        }
        .cart-line__remove:hover { color: var(--black); }

        .cart-drawer__foot {
          padding: var(--sp-6) var(--sp-8);
          border-top: var(--border);
          flex-shrink: 0;
        }
        .cart-total-row {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: var(--sp-6);
        }
        .cart-total-label {
          font-family: var(--font-ui);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-600);
        }
        .cart-total-amount {
          font-family: var(--font-ui);
          font-size: 1rem;
          font-weight: 500;
          color: var(--black);
        }
        .cart-checkout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 52px;
          background: var(--black);
          color: var(--white);
          font-family: var(--font-ui);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity var(--t);
        }
        .cart-checkout-btn:hover { opacity: 0.85; }
        .cart-checkout-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .cart-note {
          margin-top: var(--sp-3);
          font-family: var(--font-ui);
          font-size: 0.4375rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-400);
          text-align: center;
          display: block;
        }
      `}</style>

      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? ' cart-overlay--open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="cart-drawer__head">
          <span className="cart-drawer__title">
            Your Selection{lines.length > 0 ? ` (${lines.length})` : ''}
          </span>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            Close ✕
          </button>
        </div>

        <div className="cart-drawer__body">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty__text">Your selection is empty.</p>
              <a href="/gallery" className="cart-empty__link" onClick={closeCart}>
                Browse the Gallery →
              </a>
            </div>
          ) : (
            lines.map(line => {
              const img = line.merchandise.product.images.edges[0]?.node
              const price = formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)
              return (
                <div key={line.id} className="cart-line">
                  <div className="cart-line__img">
                    {img && <img src={img.url} alt={img.altText || line.merchandise.product.title} />}
                  </div>
                  <div>
                    <span className="cart-line__name">{line.merchandise.product.title}</span>
                    <span className="cart-line__meta">One of a kind · Qty {line.quantity}</span>
                    <button
                      className="cart-line__remove"
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  </div>
                  <span className="cart-line__price">{price}</span>
                </div>
              )
            })
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-amount">{formattedTotal}</span>
            </div>
            <a
              href={cart?.checkoutUrl || '#'}
              className="cart-checkout-btn"
              onClick={isLoading ? e => e.preventDefault() : undefined}
            >
              {isLoading ? 'Updating…' : 'Proceed to Checkout →'}
            </a>
            <span className="cart-note">Secure checkout via PayPal</span>
          </div>
        )}
      </div>
    </>
  )
}
