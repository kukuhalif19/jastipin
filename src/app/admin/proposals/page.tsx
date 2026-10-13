'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { IconArrowLeft, IconReceipt } from '@/components/Icons'
import { supabase } from '@/lib/supabase'

type Proposal = {
  id: string
  nama: string
  alamat: string
  toko_id: number | null
  toko_nama: string
  menu_diajukan: string
  status: 'pending' | 'confirmed' | 'rejected'
  wa_target: string | null
  created_at: string
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

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all')

  const loadProposals = useCallback(async () => {
    setLoading(true)
    setError('')
    if (!supabase) {
      setError('Supabase belum dikonfigurasi.')
      setLoading(false)
      return
    }

    const { data, error: queryError } = await supabase
      .from('proposals')
      .select('id, nama, alamat, toko_id, toko_nama, menu_diajukan, status, wa_target, created_at')
      .order('created_at', { ascending: false })

    if (queryError) {
      setError(`Gagal memuat proposal: ${queryError.message}`)
      setProposals([])
    } else {
      setProposals(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { void loadProposals() }, [loadProposals])

  const filteredProposals = statusFilter === 'all'
    ? proposals
    : proposals.filter((p) => p.status === statusFilter)

  const pendingCount = proposals.filter((p) => p.status === 'pending').length
  const confirmedCount = proposals.filter((p) => p.status === 'confirmed').length
  const rejectedCount = proposals.filter((p) => p.status === 'rejected').length

  function exportCsv() {
    const rows = [['Tanggal', 'Nama', 'Alamat', 'Toko', 'Menu Diajukan', 'Status', 'Admin WA']]
    filteredProposals.forEach((p) => rows.push([
      formatDate(p.created_at),
      p.nama,
      p.alamat,
      p.toko_nama,
      p.menu_diajukan,
      p.status,
      p.wa_target || '-',
    ]))
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `rekap-proposals-${new Date().toISOString().slice(0, 10)}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Header />
      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap' }}>
          <div>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#111', textDecoration: 'none', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 14 }}>
              <IconArrowLeft size={15} /> Kembali ke Rekap Pesanan
            </Link>
            <h1 style={{ fontSize: 25, fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Pengajuan Menu Custom</h1>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => void loadProposals()} className="nb-btn nb-btn--secondary" style={{ fontSize: 13, padding: '10px 16px' }}>
              Refresh
            </button>
            <button onClick={exportCsv} className="nb-btn nb-btn--primary" style={{ fontSize: 13, padding: '10px 16px' }}>
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
          <div className="nb-card" style={{ padding: 16, border: '3px solid #111' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>Total Proposal</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>{proposals.length}</div>
          </div>
          <div className="nb-card" style={{ padding: 16, border: '3px solid #111' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>Pending</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b' }}>{pendingCount}</div>
          </div>
          <div className="nb-card" style={{ padding: 16, border: '3px solid #111' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>Confirmed</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#10b981' }}>{confirmedCount}</div>
          </div>
          <div className="nb-card" style={{ padding: 16, border: '3px solid #111' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>Rejected</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#ef4444' }}>{rejectedCount}</div>
          </div>
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'nb-btn nb-btn--primary' : 'nb-btn nb-btn--secondary'}
            style={{ fontSize: 12, padding: '8px 14px' }}
          >
            Semua ({proposals.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={statusFilter === 'pending' ? 'nb-btn nb-btn--primary' : 'nb-btn nb-btn--secondary'}
            style={{ fontSize: 12, padding: '8px 14px' }}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={statusFilter === 'confirmed' ? 'nb-btn nb-btn--primary' : 'nb-btn nb-btn--secondary'}
            style={{ fontSize: 12, padding: '8px 14px' }}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={statusFilter === 'rejected' ? 'nb-btn nb-btn--primary' : 'nb-btn nb-btn--secondary'}
            style={{ fontSize: 12, padding: '8px 14px' }}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>Memuat data...</div>
        )}

        {error && (
          <div className="nb-card" style={{ padding: 20, border: '3px solid #ef4444', backgroundColor: '#fee' }}>
            <strong style={{ color: '#ef4444' }}>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && filteredProposals.length === 0 && (
          <div className="nb-card" style={{ padding: 40, textAlign: 'center', color: '#666' }}>
            Belum ada proposal {statusFilter !== 'all' && `dengan status "${statusFilter}"`}.
          </div>
        )}

        {!loading && !error && filteredProposals.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="nb-card" style={{ padding: 16, border: '3px solid #111' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4 }}>{proposal.nama}</div>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{proposal.alamat}</div>
                    <div style={{ fontSize: 11, color: '#999' }}>{formatDate(proposal.created_at)}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      border: '2px solid #111',
                      backgroundColor: proposal.status === 'pending' ? '#fef3c7' : proposal.status === 'confirmed' ? '#d1fae5' : '#fee2e2',
                      color: '#111',
                    }}
                  >
                    {proposal.status}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', fontSize: 13 }}>
                  <strong>Toko:</strong>
                  <span>{proposal.toko_nama}{proposal.toko_id === null && ' (Custom)'}</span>
                  <strong>Menu:</strong>
                  <span>{proposal.menu_diajukan}</span>
                  {proposal.wa_target && (
                    <>
                      <strong>Admin WA:</strong>
                      <span>{proposal.wa_target}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
