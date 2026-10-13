import Link from 'next/link'
import { TOKO_LIST, PRODUCTS, formatRupiah } from '@/lib/data/products'
import { Header } from '@/components/Header'
import { IconInfo, IconArrowRight, IconEdit } from '@/components/Icons'

export default function Home() {
  return (
    <>
      <Header />

      <main className="container-nb" style={{ paddingTop: 24, paddingBottom: 64 }}>
        {/* Hero / Banner Ketentuan */}
        <section style={{ marginBottom: 32 }}>
          <div
            style={{
              border: '2px solid #000',
              background: '#FFE600',
              padding: 20,
              boxShadow: '6px 6px 0px #000',
              marginBottom: 20,
            }}
          >
            <span className="nb-badge" style={{ background: '#000', color: '#FFE600', marginBottom: 10, display: 'inline-block' }}>
              PRE-ORDER 13–25 OKTOBER
            </span>
            <h2 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.1, margin: '8px 0', letterSpacing: '-0.02em' }}>
              Titip Jajan Bandung,
              <br />
              Dibawa ke Pekanbaru.
            </h2>
            <p style={{ fontSize: 14, fontWeight: 500, margin: '8px 0 0', lineHeight: 1.5 }}>
              Pilih dari 8 toko legendaris Bandung. Isi data, review pesanan, kirim ke WhatsApp. Selesai.
            </p>
          </div>

          {/* Info pengambilan */}
          <div
            style={{
              border: '2px solid #000',
              background: '#fff',
              padding: 14,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <IconInfo size={18} />
            <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>
              <strong>PENGAMBILAN PEKANBARU:</strong> Jumat malam.
              <br />
              <strong>LUAR PEKANBARU:</strong> Sabtu + ongkir tambahan (hubungi admin).
            </div>
          </div>

          {/* CTA: Ajukan Menu — Wave 3 */}
          <div
            style={{
              border: '2px solid #000',
              background: '#E2D9FF',
              padding: 18,
              marginTop: 16,
              textAlign: 'center',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.5 }}>
              Makanan yang kamu mau tidak ada di list?
            </p>
            <Link href="/propose" className="nb-btn nb-btn--primary" style={{ padding: '12px 20px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <IconEdit size={16} />
              Ajukan Menu
            </Link>
          </div>
        </section>

        {/* Grid Toko */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              Pilih Toko
            </h3>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#555' }}>8 TOKO</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {TOKO_LIST.map((toko) => {
              const produkToko = PRODUCTS.filter((p) => p.tokoId === toko.id)
              const hargaMin = Math.min(...produkToko.map((p) => p.harga))
              const jumlahProduk = produkToko.length

              return (
                <Link key={toko.id} href={`/toko/${toko.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="nb-card" style={{ overflow: 'hidden' }}>
                    {/* Hero image 1 toko = 1 foto */}
                    <div
                      style={{
                        height: 180,
                        borderBottom: '2px solid #000',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#eee',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={toko.image}
                        alt={toko.nama}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {toko.badge && (
                        <span className="nb-badge" style={{ background: '#fff', position: 'absolute', bottom: 12, left: 12 }}>
                          {toko.badge}
                        </span>
                      )}
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontSize: 40,
                          fontWeight: 900,
                          color: 'rgba(255,255,255,0.85)',
                          lineHeight: 1,
                          textShadow: '2px 2px 0 #000',
                        }}
                      >
                        {String(toko.id).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Info toko */}
                    <div style={{ padding: 16 }}>
                      <h4 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                        {toko.nama}
                      </h4>
                      <p style={{ fontSize: 12, color: '#555', margin: '0 0 12px', lineHeight: 1.4, fontWeight: 500 }}>
                        {toko.tagline}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#555', margin: 0, letterSpacing: '0.05em' }}>
                            Mulai dari
                          </p>
                          <p style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                            {formatRupiah(hargaMin)}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className="nb-tag">{jumlahProduk} menu</span>
                          <IconArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ marginTop: 48, paddingTop: 24, borderTop: '2px solid #000', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            Jastipin — Bandung ke Pekanbaru
          </p>
          <p style={{ fontSize: 11, color: '#555', margin: '6px 0 0' }}>
            Admin: Nurul & Alif
          </p>
        </footer>
      </main>
    </>
  )
}
