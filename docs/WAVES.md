# Wave Pengerjaan - Jastipin

## Wave 0: Setup & Infrastruktur
- [ ] Init repo Next.js + TypeScript + Tailwind CSS
- [ ] Setup Supabase project (DB, Auth anon key)
- [ ] Buat tabel `products`, `orders`, `order_items` di Supabase
- [ ] Konfigurasi environment variables (.env.local)
- [ ] Deploy dummy ke Vercel (verify build)

## Wave 1: Data Menu & Katalog
- [ ] Parse PDF katalog jadi JSON terstruktur
- [ ] Script seed data produk ke Supabase
- [ ] Halaman katalog utama (grid/list produk per toko)
- [ ] Filter/search sederhana (opsional)
- [ ] Verifikasi: semua produk tampil sesuai PDF

## Wave 2: Keranjang & Form Pemesanan
- [ ] State management keranjang (local storage / context)
- [ ] Logika fee jastip per item (<100k = +20k, ≥100k = +30k)
- [ ] Form input nama & alamat (validasi wajib isi)
- [ ] Halaman review pesanan (edit/hapus item)
- [ ] Kalkulasi total pembayaran real-time

## Wave 3: Integrasi WhatsApp & Database
- [ ] Generate link wa.me dengan format pesan terstruktur
- [ ] Simpan order ke Supabase sebelum redirect WA
- [ ] Error handling jika save gagal
- [ ] Verifikasi: klik pesan → WA terbuka + data tersimpan

## Wave 4: UI/UX Finalisasi (Menunggu Desain Kukuh)
- [ ] Implementasi desain dark cinematic dari mockup
- [ ] Responsive mobile-first
- [ ] Animasi minimal (fade, transform only)
- [ ] No emoji policy (ganti SVG inline)
- [ ] Accessibility check dasar

## Wave 5: Testing & Deploy Production
- [ ] End-to-end test manual (katalog → pesan → WA → DB)
- [ ] Fix bug kritis
- [ ] Domain custom (jika ada)
- [ ] Production deploy Vercel
- [ ] Dokumentasi cara update menu via Supabase dashboard

## Catatan Penting
- **Fee logic**: Per item, bukan per total pesanan
- **Kopi 1L**: Hanya untuk area Pekanbaru (validasi manual oleh admin)
- **Periode PO**: 13-25 Oktober (hardcoded atau configurable?)
- **Admin contact**: Nurul (085691188111), Alif (087763652013)
- **Desain**: Menunggu mockup dari Kukuh sebelum Wave 4 dimulai

</content>