import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TOKO_LIST, PRODUCTS, formatRupiah } from '@/lib/data/products'
import { hitungFeePerToko } from '@/lib/data/fee-calculator'
import { Header } from '@/components/Header'
import { AddToCartButton } from '@/components/AddToCartButton'
import { IconArrowLeft, IconAlert } from '@/components/Icons'

export function generateStaticParams() {
  return TOKO_LIST.map((t) => ({ id: String(t.id) }))
}

export default async function TokoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const toko = TOKO_LIST.find((t) => t.id === Number(id))
  if (!toko) notFound()

  const produkToko = PRODUCTS.filter((p) => p.tokoId === toko.id)

  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 16, paddingBottom: 96 }}>
        {/* Back */}
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
          Semua Toko
        </Link>

        {/* Hero Banner — 1 toko = 1 foto */}
        <div
          style={{
            border: '2px solid #000',
            boxShadow: '6px 6px 0px #000',
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={toko.image}
            alt={toko.nama}
            style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay text */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 20,
            }}
          >
            {toko.badge && (
              <span className="nb-badge" style={{ background: '#fff', marginBottom: 8, display: 'inline-block' }}>
                {toko.badge}
              </span>
            )}
            <h1 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#fff' }}>
              {toko.nama}
            </h1>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.5, maxWidth: '90%', color: 'rgba(255,255,255,0.9)' }}>
              {toko.tagline}
            </p>
          </div>
        </div>

        {/* Ketentuan khusus toko ini */}
        {toko.khususPekanbaru && (
          <div
            style={{
              border: '2px solid #000',
              background: '#FFE600',
              padding: 14,
              marginBottom: 24,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <IconAlert size={18} />
            <p style={{ fontSize: 12, fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
              KHUSUS AREA PEKANBARU KOTA. Tidak bisa custom gula untuk produk kopi 1 liter.
            </p>
          </div>
        )}

        {/* List Menu */}
        <h2 style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
          Menu ({produkToko.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {produkToko.map((produk) => {
            // Fee dihitung per toko berdasarkan subtotal, tapi di page ini cukup tampilkan estimasi
            const feeEstimasi = hitungFeePerToko(produk.harga)
            return (
              <article key={produk.id} className="nb-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                        {produk.nama}
                      </h3>
                      {produk.badge && <span className="nb-tag" style={{ fontSize: 10 }}>{produk.badge}</span>}
                    </div>

                    <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>
                      {formatRupiah(produk.harga)}
                      <span style={{ fontWeight: 500, color: '#555' }}> / {produk.satuan}</span>
                    </p>
                    <p style={{ fontSize: 11, color: '#555', margin: 0, fontWeight: 600 }}>
                      + Fee jastip estimasi {formatRupiah(feeEstimasi)} (tergantung total toko)
                    </p>

                    {produk.catatan && (
                      <p style={{ fontSize: 11, color: '#777', margin: '6px 0 0', lineHeight: 1.4, fontStyle: 'italic' }}>
                        {produk.catatan}
                      </p>
                    )}
                  </div>

                  <AddToCartButton produk={produk} />
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
