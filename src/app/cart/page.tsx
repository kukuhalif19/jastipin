'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatRupiah } from '@/lib/data/products'
import { hitungTotalFee, hitungFeeDetail } from '@/lib/data/fee-calculator'
import { Header } from '@/components/Header'
import { IconArrowLeft, IconArrowRight, IconPlus, IconMinus, IconTrash, IconCart } from '@/components/Icons'

export default function CartPage() {
  const { state, dispatch } = useCart()
  const items = state.items

  const cartItems = items.map((i) => ({
    id: i.product.id,
    tokoId: i.product.tokoId,
    tokoNama: i.product.tokoNama,
    nama: i.product.nama,
    harga: i.product.harga,
    qty: i.qty,
  }))

  const subtotal = items.reduce((sum, i) => sum + i.product.harga * i.qty, 0)
  const totalFee = hitungTotalFee(cartItems)
  const feeDetail = hitungFeeDetail(cartItems)
  const grandTotal = subtotal + totalFee

  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 120 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            color: '#111',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 16,
          }}
        >
          <IconArrowLeft size={16} />
          Lanjut Belanja
        </Link>

        <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 20px' }}>
          Keranjang ({items.length})
        </h1>

        {items.length === 0 ? (
          <div
            style={{
              border: '2px solid #000',
              background: '#fff',
              padding: 40,
              textAlign: 'center',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <IconCart size={40} className="" />
            <p style={{ fontSize: 15, fontWeight: 700, margin: '16px 0 8px' }}>Keranjang masih kosong</p>
            <p style={{ fontSize: 13, color: '#555', margin: '0 0 20px' }}>
              Pilih jajan favoritmu dari 8 toko Bandung.
            </p>
            <Link href="/" className="nb-btn nb-btn--primary">
              Mulai Pilih
              <IconArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {items.map((item) => {
                const lineTotal = item.product.harga * item.qty
                return (
                  <article key={item.product.id} className="nb-card" style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 2px', lineHeight: 1.3 }}>
                          {item.product.nama}
                        </h3>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#555', margin: 0 }}>
                          {item.product.tokoNama}
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })}
                        className="nb-btn nb-btn--danger"
                        style={{ padding: '6px 10px', flexShrink: 0 }}
                        aria-label="Hapus item"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Qty stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #000' }}>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.product.id, qty: item.qty - 1 } })}
                          className="nb-btn"
                          style={{ padding: '6px 10px', border: 'none', boxShadow: 'none' }}
                          aria-label="Kurangi"
                        >
                          <IconMinus size={14} />
                        </button>
                        <span style={{ padding: '0 14px', fontWeight: 900, fontSize: 15, borderLeft: '2px solid #000', borderRight: '2px solid #000', lineHeight: '30px' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.product.id, qty: item.qty + 1 } })}
                          className="nb-btn"
                          style={{ padding: '6px 10px', border: 'none', boxShadow: 'none' }}
                          aria-label="Tambah"
                        >
                          <IconPlus size={14} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 10, color: '#555', margin: 0, fontWeight: 700 }}>
                          {formatRupiah(item.product.harga)} × {item.qty}
                        </p>
                        <p style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                          {formatRupiah(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Ringkasan */}
            <div style={{ border: '2px solid #000', background: '#fff', padding: 16, boxShadow: '4px 4px 0px #000', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                <span>Subtotal barang</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 10, paddingBottom: 10, borderBottom: '2px solid #000' }}>
                <span>Total fee jastip</span>
                <span>{formatRupiah(totalFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 900 }}>
                <span>TOTAL</span>
                <span>{formatRupiah(grandTotal)}</span>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Sticky CTA */}
      {items.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderTop: '2px solid #000',
            padding: 16,
            zIndex: 40,
          }}
        >
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <Link
              href="/checkout"
              className="nb-btn nb-btn--primary"
              style={{ width: '100%', padding: '16px', fontSize: 15 }}
            >
              Lanjut Isi Data Diri
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
