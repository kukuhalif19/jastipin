'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { hitungFee, formatRupiah, getRandomAdmin } from '@/lib/data/products'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/Header'
import {
  IconArrowLeft, IconTrash, IconUser, IconMapPin,
  IconWhatsApp, IconCheck, IconReceipt,
} from '@/components/Icons'

export default function ReviewPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [notif, setNotif] = useState('')

  const items = state.items
  const subtotal = items.reduce((sum, i) => sum + i.product.harga * i.qty, 0)
  const totalFee = items.reduce((sum, i) => sum + hitungFee(i.product.harga) * i.qty, 0)
  const grandTotal = subtotal + totalFee

  useEffect(() => {
    const n = localStorage.getItem('jastipin_nama') || ''
    const a = localStorage.getItem('jastipin_alamat') || ''
    setNama(n)
    setAlamat(a)
    if (items.length === 0) router.replace('/cart')
    if (!n || !a) router.replace('/checkout')
  }, [items.length, router])

  function buildWaMessage() {
    const lines: string[] = []
    lines.push('Halo Admin Jastipin, saya ingin memesan:')
    lines.push('')
    lines.push(`Nama   : ${nama}`)
    lines.push(`Alamat : ${alamat}`)
    lines.push('')
    lines.push('Pesanan:')
    items.forEach((i) => {
      const fee = hitungFee(i.product.harga)
      lines.push(`- ${i.product.nama} (${i.product.tokoNama}) x${i.qty}`)
      lines.push(`  ${formatRupiah(i.product.harga)} + fee ${formatRupiah(fee)} = ${formatRupiah((i.product.harga + fee) * i.qty)}`)
    })
    lines.push('')
    lines.push(`Subtotal : ${formatRupiah(subtotal)}`)
    lines.push(`Fee      : ${formatRupiah(totalFee)}`)
    lines.push(`TOTAL    : ${formatRupiah(grandTotal)}`)
    return lines.join('\n')
  }

  async function handlePesan() {
    setSending(true)
    setNotif('')

    const admin = getRandomAdmin()
    const pesan = buildWaMessage()

    // Simpan ke Supabase (jika terkonfigurasi)
    if (supabase) {
      try {
        const { error } = await supabase.from('orders').insert({
          nama,
          alamat,
          items: items.map((i) => ({
            nama: i.product.nama,
            toko: i.product.tokoNama,
            harga: i.product.harga,
            qty: i.qty,
            fee: hitungFee(i.product.harga),
          })),
          total: grandTotal,
          wa_target: admin.nama,
        })
        if (error) {
          setNotif('Pesanan gagal disimpan ke database, tapi WhatsApp tetap dibuka.')
        }
      } catch {
        setNotif('Pesanan gagal disimpan ke database, tapi WhatsApp tetap dibuka.')
      }
    } else {
      setNotif('Database belum dikonfigurasi. Pesanan dikirim via WhatsApp saja.')
    }

    // Buka WhatsApp
    const waUrl = `https://wa.me/${admin.wa}?text=${encodeURIComponent(pesan)}`
    window.open(waUrl, '_blank')

    // Bersihkan keranjang
    dispatch({ type: 'CLEAR_CART' })
    localStorage.removeItem('jastipin_nama')
    localStorage.removeItem('jastipin_alamat')
    setSent(true)
    setSending(false)
  }

  if (sent) {
    return (
      <>
        <Header />
        <main className="container-nb" style={{ paddingTop: 48, paddingBottom: 64, textAlign: 'center' }}>
          <div
            style={{
              border: '2px solid #000',
              background: '#00E599',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <IconCheck size={40} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Pesanan Terkirim!
          </h1>
          <p style={{ fontSize: 14, color: '#555', fontWeight: 600, margin: '0 0 32px', lineHeight: 1.6 }}>
            WhatsApp sudah terbuka dengan detail pesananmu.
            Tekan kirim di WhatsApp untuk konfirmasi ke admin.
          </p>
          {notif && (
            <p style={{ fontSize: 12, color: '#777', margin: '0 0 24px', fontStyle: 'italic' }}>{notif}</p>
          )}
          <Link href="/" className="nb-btn nb-btn--primary" style={{ padding: '16px 32px' }}>
            Kembali ke Katalog
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 140 }}>
        <Link
          href="/checkout"
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
          Edit Data Diri
        </Link>

        <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 20px' }}>
          Review Pesanan
        </h1>

        {/* Identitas */}
        <div style={{ border: '2px solid #000', background: '#E2D9FF', padding: 16, marginBottom: 20, boxShadow: '4px 4px 0px #000' }}>
          <h2 style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
            Identitas Pemesan
          </h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
            <IconUser size={14} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>{nama}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ marginTop: 2, flexShrink: 0, display: 'inline-flex' }}>
              <IconMapPin size={14} />
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{alamat}</span>
          </div>
        </div>

        {/* Daftar item dengan edit/hapus */}
        <h2 style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconReceipt size={14} />
          Detail Pesanan ({items.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {items.map((item) => {
            const fee = hitungFee(item.product.harga)
            return (
              <div key={item.product.id} className="nb-card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 2px', lineHeight: 1.3 }}>
                      {item.product.nama}
                    </h3>
                    <p style={{ fontSize: 11, color: '#555', fontWeight: 700, margin: '0 0 6px' }}>
                      {item.product.tokoNama}
                    </p>
                    <p style={{ fontSize: 11, color: '#555', margin: 0, fontWeight: 600 }}>
                      {formatRupiah(item.product.harga)} + fee {formatRupiah(fee)} × {item.qty}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 900, margin: '0 0 8px' }}>
                      {formatRupiah((item.product.harga + fee) * item.qty)}
                    </p>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <Link href={`/toko/${item.product.tokoId}`} className="nb-btn" style={{ padding: '5px 10px', fontSize: 11 }}>
                        Edit
                      </Link>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })}
                        className="nb-btn nb-btn--danger"
                        style={{ padding: '5px 10px' }}
                        aria-label="Hapus"
                      >
                        <IconTrash size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total */}
        <div style={{ border: '2px solid #000', background: '#fff', padding: 16, boxShadow: '4px 4px 0px #000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <span>Subtotal barang</span>
            <span>{formatRupiah(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 10, paddingBottom: 10, borderBottom: '2px solid #000' }}>
            <span>Total fee jastip</span>
            <span>{formatRupiah(totalFee)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900 }}>
            <span>TOTAL BAYAR</span>
            <span>{formatRupiah(grandTotal)}</span>
          </div>
        </div>

        <p style={{ fontSize: 11, color: '#777', margin: '12px 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
          Dengan menekan Pesan, pesanan disimpan & WhatsApp admin terbuka otomatis dengan format lengkap.
        </p>
      </main>

      {/* Sticky CTA */}
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
          <button
            onClick={handlePesan}
            disabled={sending || items.length === 0}
            className="nb-btn nb-btn--primary"
            style={{ width: '100%', padding: '16px', fontSize: 15, background: '#00E599' }}
          >
            <IconWhatsApp size={18} />
            {sending ? 'Memproses...' : 'Pesan via WhatsApp'}
          </button>
        </div>
      </div>
    </>
  )
}
