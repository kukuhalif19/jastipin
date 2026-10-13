'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { IconCart } from './Icons'

export function Header() {
  const { state } = useCart()
  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header
      style={{
        borderBottom: '2px solid #000',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="container-nb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#111' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
            JASTIPIN<span style={{ color: '#00E599' }}>.</span>
          </h1>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '2px 0 0', color: '#555' }}>
            Bandung — Pekanbaru
          </p>
        </Link>

        <Link href="/cart" style={{ textDecoration: 'none', color: '#111', position: 'relative' }}>
          <button className="nb-btn" style={{ padding: '10px 14px' }}>
            <IconCart size={18} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: '#FF5C5C',
                  color: '#fff',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  border: '2px solid #000',
                }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  )
}
