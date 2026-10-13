'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TOKO_LIST } from '@/lib/data/products'
import { submitProposal } from '@/lib/proposal'
import { Header } from '@/components/Header'
import { IconAlert, IconArrowLeft, IconCheck, IconEdit } from '@/components/Icons'

export default function ProposePage() {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [tokoId, setTokoId] = useState('')
  const [customToko, setCustomToko] = useState('')
  const [menu, setMenu] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ saved: boolean; waTarget: string; error?: string } | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}

    if (!nama.trim()) nextErrors.nama = 'Nama harus diisi'
    if (!alamat.trim()) nextErrors.alamat = 'Alamat harus diisi'
    if (!menu.trim()) nextErrors.menu = 'Menu yang diajukan harus diisi'

    // Validasi toko: wajib pilih katalog atau isi nama toko pada opsi Lainnya
    if (!tokoId) {
      nextErrors.toko = 'Pilih nama toko'
    } else if (tokoId === 'other' && !customToko.trim()) {
      nextErrors.customToko = 'Nama toko harus diisi'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    // Tentukan nama toko akhir
    let finalTokoId: number | null = null
    let finalTokoNama = ''

    if (tokoId === 'other') {
      // Pilihan "Lainnya"
      finalTokoId = null
      finalTokoNama = customToko.trim()
    } else if (tokoId) {
      // Pilihan dari katalog
      const toko = TOKO_LIST.find((item) => item.id === Number(tokoId))
      if (!toko) {
        setErrors({ toko: 'Toko tidak ditemukan. Silakan pilih lagi.' })
        return
      }
      finalTokoId = toko.id
      finalTokoNama = toko.nama
    }

    setIsSubmitting(true)
    const submission = await submitProposal({
      nama: nama.trim(),
      alamat: alamat.trim(),
      tokoId: finalTokoId,
      tokoNama: finalTokoNama,
      menuDiajukan: menu.trim(),
    })
    setResult({ saved: submission.saved, waTarget: submission.waTarget, error: submission.error })
    setIsSubmitting(false)

    // Buka WhatsApp
    window.open(submission.waLink, '_blank')
  }

  if (result) {
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
            Pengajuan Terkirim!
          </h1>
          <p style={{ fontSize: 14, color: '#555', fontWeight: 600, margin: '0 0 32px', lineHeight: 1.6 }}>
            WhatsApp admin <strong>{result.waTarget}</strong> sudah terbuka.
            <br />
            Tekan kirim di WhatsApp untuk mengajukan menu kamu.
          </p>
          {!result.saved && (
            <div
              style={{
                border: '2px solid #000',
                background: '#FFE600',
                padding: 14,
                marginBottom: 24,
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <IconAlert size={16} />
                Pengajuan belum tersimpan di database
              </span>
              {result.error ? `: ${result.error}` : '.'}
              <br />
              Pesan WhatsApp tetap bisa dikirim.
            </div>
          )}
          <Link href="/" className="nb-btn nb-btn--primary" style={{ padding: '14px 28px' }}>
            Kembali ke Katalog
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 64 }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            background: 'transparent',
            border: 'none',
            color: '#111',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 16,
            cursor: 'pointer',
          }}
        >
          <IconArrowLeft size={16} />
          Kembali
        </button>

        <div style={{ marginBottom: 24 }}>
          <span className="nb-badge" style={{ marginBottom: 8, display: 'inline-block' }}>
            MENU BELUM TERSEDIA?
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>
            Ajukan Menu
          </h1>
          <p style={{ fontSize: 13, color: '#555', margin: '8px 0 0', lineHeight: 1.5, fontWeight: 500 }}>
            Isi detail di bawah. Admin Jastipin akan menerima pesan WhatsApp kamu untuk cek ketersediaan menu dari toko pilihan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="nb-card" style={{ padding: 20 }}>
          {/* Nama */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="nama" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
              Nama <span style={{ color: '#FF3B30' }}>*</span>
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama lengkap"
              autoComplete="name"
              style={{
                width: '100%',
                border: '2px solid #000',
                background: '#fff',
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 600,
              }}
            />
            {errors.nama && <p style={{ fontSize: 11, color: '#FF3B30', margin: '6px 0 0', fontWeight: 700 }}>{errors.nama}</p>}
          </div>

          {/* Alamat */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="alamat" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
              Alamat <span style={{ color: '#FF3B30' }}>*</span>
            </label>
            <textarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Alamat lengkap pengiriman"
              rows={3}
              autoComplete="street-address"
              style={{
                width: '100%',
                border: '2px solid #000',
                background: '#fff',
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 600,
                resize: 'none',
              }}
            />
            {errors.alamat && <p style={{ fontSize: 11, color: '#FF3B30', margin: '6px 0 0', fontWeight: 700 }}>{errors.alamat}</p>}
          </div>

          {/* Toko */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="toko" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
              Nama Toko <span style={{ color: '#FF3B30' }}>*</span>
            </label>
            <select
              id="toko"
              value={tokoId}
              onChange={(e) => setTokoId(e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #000',
                background: '#fff',
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <option value="">Pilih toko dari katalog</option>
              {TOKO_LIST.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.nama}
                </option>
              ))}
              <option value="other">Lainnya — isi nama toko</option>
            </select>
            {errors.toko && <p style={{ fontSize: 11, color: '#FF3B30', margin: '6px 0 0', fontWeight: 700 }}>{errors.toko}</p>}
          </div>

          {tokoId === 'other' && (
            <div style={{ marginTop: -4, marginBottom: 16, padding: 14, border: '2px solid #000', background: '#FFE600' }}>
              <label htmlFor="custom-toko" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
                Nama Toko Lainnya <span style={{ color: '#FF3B30' }}>*</span>
              </label>
              <input
                id="custom-toko"
                type="text"
                value={customToko}
                onChange={(e) => setCustomToko(e.target.value)}
                placeholder="Contoh: Toko Kue Bandung"
                autoComplete="organization"
                style={{ width: '100%', border: '2px solid #000', background: '#fff', padding: '10px 14px', fontSize: 14, fontWeight: 600 }}
              />
              {errors.customToko && <p style={{ fontSize: 11, color: '#FF3B30', margin: '6px 0 0', fontWeight: 700 }}>{errors.customToko}</p>}
            </div>
          )}

          {/* Menu */}
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="menu" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
              Menu yang Diajukan <span style={{ color: '#FF3B30' }}>*</span>
            </label>
            <textarea
              id="menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              placeholder="Contoh: Bolen rasa durian ukuran besar"
              rows={4}
              style={{
                width: '100%',
                border: '2px solid #000',
                background: '#fff',
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 600,
                resize: 'none',
              }}
            />
            {errors.menu && <p style={{ fontSize: 11, color: '#FF3B30', margin: '6px 0 0', fontWeight: 700 }}>{errors.menu}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="nb-btn nb-btn--primary"
            style={{ width: '100%', padding: '14px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <IconEdit size={18} />
            {isSubmitting ? 'Memproses...' : 'Ajukan via WhatsApp'}
          </button>

          <p style={{ fontSize: 11, color: '#777', margin: '12px 0 0', textAlign: 'center', lineHeight: 1.5, fontStyle: 'italic' }}>
            Dengan menekan tombol ini, pengajuan disimpan ke Jastipin dan WhatsApp admin dibuka dengan detail lengkap.
          </p>
        </form>
      </main>
    </>
  )
}
