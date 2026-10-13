'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Header } from '@/components/Header'
import { IconArrowLeft, IconArrowRight, IconUser, IconMapPin, IconPhone } from '@/components/Icons'

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useCart()
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Load data tersimpan
    setNama(localStorage.getItem('jastipin_nama') || '')
    setAlamat(localStorage.getItem('jastipin_alamat') || '')
    setWhatsapp(localStorage.getItem('jastipin_whatsapp') || '')
  }, [])

  // Redirect jika keranjang kosong
  useEffect(() => {
    if (state.items.length === 0) {
      router.replace('/cart')
    }
  }, [state.items.length, router])

  function handleLanjut() {
    if (!nama.trim() || !alamat.trim() || !whatsapp.trim()) {
      setError('Nama, nomor WhatsApp, dan alamat wajib diisi.')
      return
    }
    const cleanWa = whatsapp.replace(/\D/g, '')
    if (cleanWa.length < 9) {
      setError('Nomor WhatsApp tidak valid (minimal 9 digit).')
      return
    }
    setError('')
    localStorage.setItem('jastipin_nama', nama.trim())
    localStorage.setItem('jastipin_alamat', alamat.trim())
    localStorage.setItem('jastipin_whatsapp', cleanWa)
    router.push('/review')
  }

  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 120 }}>
        <Link
          href="/cart"
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
          Keranjang
        </Link>

        {/* Progress indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {['Katalog', 'Keranjang', 'Data Diri', 'Review'].map((step, idx) => (
            <div key={step} style={{ flex: 1 }}>
              <div style={{ height: 4, background: idx <= 2 ? '#00E599' : '#ddd', border: '1px solid #000' }} />
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 0', color: idx <= 2 ? '#111' : '#999', letterSpacing: '0.03em' }}>
                {step}
              </p>
            </div>
          ))}
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 6px' }}>
          Data Diri
        </h1>
        <p style={{ fontSize: 13, color: '#555', fontWeight: 600, margin: '0 0 24px', lineHeight: 1.5 }}>
          Isi nama dan alamat sekali saja. Tidak perlu login.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label htmlFor="nama" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              <IconUser size={14} />
              Nama Lengkap
            </label>
            <input
              id="nama"
              type="text"
              className="nb-input"
              placeholder="Contoh: Kukuh Pratama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="whatsapp" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              <IconPhone size={14} />
              Nomor WhatsApp Pembeli
            </label>
            <input
              id="whatsapp"
              type="tel"
              className="nb-input"
              placeholder="Contoh: 081234567890"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <p style={{ fontSize: 11, color: '#666', fontWeight: 600, margin: '4px 0 0' }}>
              Digunakan admin untuk konfirmasi pesanan & bukti pembayaran
            </p>
          </div>

          <div>
            <label htmlFor="alamat" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              <IconMapPin size={14} />
              Alamat Lengkap
            </label>
            <textarea
              id="alamat"
              className="nb-input"
              placeholder="Contoh: Jl. Sudirman No. 12, Pekanbaru, Riau"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows={4}
              style={{ resize: 'vertical', minHeight: 100 }}
            />
          </div>

          {error && (
            <div style={{ border: '2px solid #000', background: '#FF5C5C', color: '#fff', padding: 12, fontSize: 13, fontWeight: 700 }}>
              {error}
            </div>
          )}
        </div>
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
            onClick={handleLanjut}
            className="nb-btn nb-btn--primary"
            style={{ width: '100%', padding: '16px', fontSize: 15 }}
          >
            Lanjut ke Review
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </>
  )
}
