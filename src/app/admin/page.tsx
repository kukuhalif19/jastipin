'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { IconArrowLeft, IconReceipt, IconPhone, IconWhatsApp } from '@/components/Icons'
import { formatRupiah } from '@/lib/data/products'
import { supabase } from '@/lib/supabase'

type OrderItem = {
  nama?: string
  toko?: string
  harga?: number
  qty?: number
  fee?: number
}

type Order = {
  id: string
  nama: string
  alamat: string
  whatsapp?: string
  items: OrderItem[]
  total: number
  wa_target: string
  status_bayar: 'belum_bayar' | 'sudah_bayar'
  created_at: string
}

type StoreSummary = {
  toko: string
  items: Map<string, { qty: number; orders: number }>
}

function parseItems(value: unknown): OrderItem[] {
  return Array.isArray(value) ? value as OrderItem[] : []
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'shopping' | 'customers'>('shopping')

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    if (!supabase) {
      setError('Supabase belum dikonfigurasi.')
      setLoading(false)
      return
    }

    const { data, error: queryError } = await supabase
      .from('orders')
      .select('id, nama, alamat, whatsapp, items, total, wa_target, status_bayar, created_at')
      .eq('status_bayar', 'belum_bayar')
      .order('created_at', { ascending: false })

    if (queryError) {
      setError(`Gagal memuat pesanan: ${queryError.message}`)
      setOrders([])
    } else {
      setOrders((data || []).map((order) => ({ ...order, items: parseItems(order.items) })))
    }
    setLoading(false)
  }, [])

  useEffect(() => { void loadOrders() }, [loadOrders])

  const summaries = useMemo<StoreSummary[]>(() => {
    const grouped = new Map<string, Map<string, { qty: number; orders: number }>>()
    orders.forEach((order) => order.items.forEach((item) => {
      const toko = item.toko || 'Toko belum diisi'
      const menu = item.nama || 'Menu tidak bernama'
      if (!grouped.has(toko)) grouped.set(toko, new Map())
      const store = grouped.get(toko)!
      const current = store.get(menu) || { qty: 0, orders: 0 }
      current.qty += Number(item.qty) || 0
      current.orders += 1
      store.set(menu, current)
    }))
    return [...grouped.entries()].map(([toko, items]) => ({ toko, items }))
  }, [orders])

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
  const totalUnits = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (Number(item.qty) || 0), 0), 0)

  async function markAsPaid(orderId: string) {
    if (!supabase || !confirm('Tandai order ini sudah bayar?')) return
    const { error: updateError } = await supabase.from('orders').update({ status_bayar: 'sudah_bayar' }).eq('id', orderId)
    if (updateError) setError(`Gagal memperbarui status bayar: ${updateError.message}`)
    else void loadOrders()
  }

  function exportCsv() {
    const rows = [['Tanggal', 'Nama', 'WhatsApp', 'Alamat', 'Toko', 'Menu', 'Qty', 'Total', 'Status Bayar', 'Admin WA']]
    orders.forEach((order) => order.items.forEach((item) => rows.push([
      formatDate(order.created_at), order.nama, order.whatsapp || '-', order.alamat, item.toko || '', item.nama || '', String(item.qty || 0), String(order.total), order.status_bayar, order.wa_target,
    ])))
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `rekap-pesanan-${new Date().toISOString().slice(0, 10)}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Header />
      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap' }}>
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#111', textDecoration: 'none', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 14 }}>
              <IconArrowLeft size={15} /> Kembali ke katalog
            </Link>
            <h1 style={{ fontSize: 25, fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Rekap Pesanan</h1>
            <p style={{ fontSize: 13, color: '#555', fontWeight: 600, margin: '6px 0 0' }}>Daftar belanja per toko dan daftar packing per pemesan.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/admin/orderan" className="nb-btn nb-btn--primary">Orderan (Sudah Bayar)</Link>
            <Link href="/admin/proposals" className="nb-btn nb-btn--secondary">Pengajuan Menu</Link>
            <button type="button" className="nb-btn" onClick={() => void loadOrders()} disabled={loading}>Refresh</button>
            <button type="button" className="nb-btn" onClick={exportCsv} disabled={orders.length === 0}>Export CSV</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          <div className="nb-card" style={{ padding: 14, background: '#E2D9FF' }}><small>Pesanan</small><strong style={{ display: 'block', fontSize: 26 }}>{orders.length}</strong></div>
          <div className="nb-card" style={{ padding: 14, background: '#FFE600' }}><small>Total item</small><strong style={{ display: 'block', fontSize: 26 }}>{totalUnits}</strong></div>
          <div className="nb-card" style={{ padding: 14, background: '#00E599' }}><small>Nilai pesanan</small><strong style={{ display: 'block', fontSize: 18 }}>{formatRupiah(totalRevenue)}</strong></div>
        </div>

        {error && <div style={{ border: '2px solid #000', background: '#FF5C5C', padding: 14, marginBottom: 18, fontWeight: 700, fontSize: 13 }}>{error}</div>}
        {loading && <p style={{ fontWeight: 700 }}>Memuat pesanan...</p>}
        {!loading && !error && orders.length === 0 && <div className="nb-card" style={{ padding: 24, textAlign: 'center' }}><IconReceipt size={30} /><p style={{ fontWeight: 700 }}>Belum ada pesanan masuk.</p></div>}

        {!loading && orders.length > 0 && <>
          <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #000', marginBottom: 16 }}>
            <button type="button" className="nb-btn" onClick={() => setActiveTab('shopping')} style={{ marginBottom: -2, background: activeTab === 'shopping' ? '#000' : '#fff', color: activeTab === 'shopping' ? '#fff' : '#111' }}>Belanja per Toko</button>
            <button type="button" className="nb-btn" onClick={() => setActiveTab('customers')} style={{ marginBottom: -2, background: activeTab === 'customers' ? '#000' : '#fff', color: activeTab === 'customers' ? '#fff' : '#111' }}>Packing per Pemesan</button>
          </div>

          {activeTab === 'shopping' ? summaries.map((store) => (
            <section key={store.toko} className="nb-card" style={{ padding: 16, marginBottom: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: '0 0 10px', textTransform: 'uppercase' }}>{store.toko}</h2>
              {[...store.items.entries()].map(([menu, detail]) => <div key={menu} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid #bbb', padding: '9px 0', fontSize: 13, fontWeight: 700 }}><span>{menu}</span><span>{detail.qty} unit</span></div>)}
            </section>
          )) : orders.map((order) => {
            let waClean = (order.whatsapp || '').replace(/\D/g, '')
            if (waClean.startsWith('0')) waClean = '62' + waClean.slice(1)
            const waChatUrl = waClean ? `https://wa.me/${waClean}?text=${encodeURIComponent(`Halo Kak ${order.nama}, pesanan jastip Kakak sudah tercatat di sistem kami ya. Ada yang bisa kami bantu?`)}` : null

            return (
              <section key={order.id} className="nb-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                  <div>
                    <strong>{order.nama}</strong>
                    {order.whatsapp && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#0066cc', fontWeight: 700, marginTop: 2 }}>
                        <IconPhone size={13} />
                        <span>{order.whatsapp}</span>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#555' }}>{formatDate(order.created_at)}</span>
                </div>
                <p style={{ fontSize: 12, margin: '0 0 8px', lineHeight: 1.5 }}>{order.alamat}</p>
                {order.items.map((item, index) => <div key={`${order.id}-${index}`} style={{ fontSize: 13, fontWeight: 700, borderTop: '1px solid #bbb', padding: '8px 0' }}>{item.nama} — {item.toko} × {item.qty}</div>)}
                <strong style={{ display: 'block', marginTop: 6 }}>Total: {formatRupiah(order.total)}</strong>
                
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="nb-btn nb-btn--primary"
                    onClick={() => void markAsPaid(order.id)}
                    style={{ fontSize: 12 }}
                  >
                    Tandai Sudah Bayar
                  </button>

                  {waChatUrl && (
                    <a
                      href={waChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nb-btn"
                      style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', background: '#25D366', color: '#fff', border: '2px solid #000' }}
                    >
                      <IconWhatsApp size={14} />
                      Chat Pembeli
                    </a>
                  )}
                </div>
              </section>
            )
          })}
        </>}
      </main>
    </>
  )
}
