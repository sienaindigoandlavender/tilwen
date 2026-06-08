'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

interface Props {
  variantId: string
  name: string
}

export default function AddToCartButton({ variantId, name }: Props) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    await addItem(variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="btn btn--primary"
      style={{ width: '100%' }}
      aria-label={`Add ${name} to cart`}
    >
      {isLoading ? 'Adding…' : added ? '✓ Added' : 'Add to cart'}
    </button>
  )
}
