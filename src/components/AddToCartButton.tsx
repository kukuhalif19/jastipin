'use client'

import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/data/products'
import { IconPlus } from './Icons'

export function AddToCartButton({ produk }: { produk: Product }) {
  const { dispatch, state } = useCart()
  const item = state.items.find((i) => i.product.id === produk.id)
  const qty = item?.qty || 0

  return (
    <button
      className="nb-btn nb-btn--primary"
      style={{ padding: '10px 16px', whiteSpace: 'nowrap', flexShrink: 0 }}
      onClick={() =>
        dispatch({ type: 'ADD_ITEM', payload: produk })
      }
    >
      <IconPlus size={14} />
      {qty > 0 ? `${qty} di keranjang` : 'Tambah'}
    </button>
  )
}
