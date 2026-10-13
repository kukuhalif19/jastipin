# PROGRES Jastipin — Tracking Harian

**Project:** Jastipin (Katalog Jastip Bandung → Pekanbaru)  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase + Vercel  
**Desain:** Neo-Brutalist (No Emoji, SVG Only)  

---

## Wave 0: Setup & Infrastruktur ✓ SELESAI

**Status:** Completed 13 Oktober 2026 (Build time: ~2 jam)

### Apa yang dikerjakan:

1. **Repo & Build System**
   - ✓ Init Next.js 14 dengan TypeScript + Tailwind
   - ✓ Install `@supabase/supabase-js`
   - ✓ Setup global CSS (Neo-Brutalist design tokens)
   - ✓ Build passes TypeScript + Turbopack

2. **Data Layer**
   - ✓ Seed file `products.ts` — 8 toko, 50+ menu items (dari PDF katalog)
   - ✓ Fungsi helper: `hitungFee()`, `formatRupiah()`, `getRandomAdmin()`
   - ✓ Supabase client setup (`supabase.ts`)

3. **State Management**
   - ✓ Cart Context (React Context + useReducer)
   - ✓ LocalStorage persistence (keranjang tidak hilang saat refresh)

4. **Components (UI)**
   - ✓ Icons.tsx — 11 SVG icons (cart, arrow, plus, minus, trash, check, wa, mappin, user, info, alert, receipt)
   - ✓ Header.tsx — sticky header dengan logo + cart counter
   - ✓ AddToCartButton.tsx — tombol tambah ke keranjang

5. **Pages & Routes**
   - ✓ `/` (Katalog) — grid 8 toko, hero banner ketentuan PO
   - ✓ `/toko/[id]` — detail toko (1 hero image per toko + list menu + harga + fee)
   - ✓ `/cart` — daftar keranjang, qty stepper, subtotal + fee + total
   - ✓ `/checkout` — form input nama & alamat (validasi wajib)
   - ✓ `/review` — review pesanan, edit/hapus item, totalisasi, tombol Pesan

6. **Alur Lengkap**
   - ✓ Katalog → Pilih Toko → Pilih Menu (qty stepper) → Keranjang → Form Nama/Alamat → Review → Pesan
   - ✓ Tombol Pesan → Generate WA message terformat → Open `wa.me` link (admin random Nurul/Alif)
   - ✓ Simpan ke Supabase `orders` table (struktur: nama, alamat, items jsonb, total, wa_target, created_at)

7. **Design System**
   - ✓ Palette: #F5F0E8 (bg), #000 (border), accent mint/coral/yellow/purple
   - ✓ Komponenen Neo-Brutalist: `.nb-card`, `.nb-btn`, `.nb-badge`, `.nb-input`, `.nb-tag`
   - ✓ Hard shadow 4px 4px, no border radius, 2px borders

### Files Dibuat:

```
D:/Project/jastip/jastipin/
├── docs/
│   ├── PRD.md (v1.1.0 — updated dengan desain notes)
│   ├── WAVES.md (wave pengerjaan)
│   └── DATABASE.md (SQL schema Supabase)
├── src/
│   ├── app/
│   │   ├── globals.css (Neo-Brutalist design tokens + components)
│   │   ├── layout.tsx (root + CartProvider)
│   │   ├── page.tsx (katalog 8 toko)
│   │   ├── cart/page.tsx (keranjang)
│   │   ├── checkout/page.tsx (form data diri)
│   │   ├── review/page.tsx (review + pesan WA + simpan DB)
│   │   └── toko/[id]/page.tsx (detail toko + menu)
│   ├── lib/
│   │   ├── data/products.ts (seed data 8 toko)
│   │   ├── supabase.ts (client config)
│   │   └── cart-context.tsx (state management)
│   └── components/
│       ├── Icons.tsx (11 SVG icons)
│       ├── Header.tsx (sticky header)
│       └── AddToCartButton.tsx (tombol tambah keranjang)
├── .env.example (template env vars)
├── package.json (Next.js 14 + dependencies)
└── build/ ✓ (TypeScript passed, routes pre-rendered)
```

### Verifikasi Build:

```bash
✓ Compiled successfully (Turbopack)
✓ TypeScript passed
✓ Routes generated:
  - / (katalog)
  - /cart
  - /checkout
  - /review
  - /toko/1-8 (8 toko pre-rendered)
  - /_not-found (fallback)
```

---

## Wave 3: Pengajuan Menu Tidak Tersedia (Wave 3 Propose Menu) ✓ SELESAI

**Status:** Completed 13 Oktober 2026

### 4 Kebutuhan User Terpenuhi:
1. **Posisi tombol:** Di homepage (`src/app/page.tsx`), banner ungu Neo-Brutalist "Makanan yang kamu mau tidak ada di list? [Ajukan Menu]"
2. **Form setelah klik:** Halaman baru `/propose` (`src/app/propose/page.tsx`) dengan field:
   - Nama (wajib)
   - Alamat (wajib)
   - Toko (select dari 8 toko katalog)
   - Menu yang Diajukan (textarea)
3. **Flow WhatsApp:** Format exact: `Nama: X, Alamat: Y, Toko: Z, Menu yg diajukan: W` dikirim ke admin random (Nurul/Alif 50:50 via `getRandomAdmin()`)
4. **Penyimpanan:** Disimpan ke Supabase tabel `public.proposals` via `submitProposal()` di `src/lib/proposal.ts`, SQL migration di `supabase/migrations/20261013_create_proposals_table.sql`

---

## Wave 4: Admin Proposal dan Status Pembayaran ✓ IMPLEMENTASI SELESAI

**Status:** Implementasi selesai 13 Oktober 2026; migration Supabase masih perlu dijalankan manual.

### Alur yang tersedia
1. Pelanggan mengirim pengajuan menu melalui `/propose`.
2. Admin membuka `/admin/proposals`, lalu memilih ACC atau Tolak.
3. Saat ACC, admin wajib mengisi harga dan qty. Sistem menghitung fee: harga < Rp100.000 = Rp20.000; harga ≥ Rp100.000 = Rp30.000.
4. Proposal ACC membuat order dengan `status_bayar = belum_bayar`, lalu muncul di `/admin`.
5. Admin menekan **Tandai Sudah Bayar** di `/admin`; order berpindah ke `/admin/orderan`.
6. `/admin/orderan` menyediakan rekap belanja per toko, packing per pemesan, export CSV, dan aksi mengembalikan order ke belum bayar jika salah klik.

### File terkait
- `src/app/admin/proposals/page.tsx` — filter dan aksi ACC/Tolak proposal.
- `src/app/admin/page.tsx` — rekap order belum bayar dan perubahan status bayar.
- `src/app/admin/orderan/page.tsx` — rekap order sudah bayar.
- `supabase/migrations/20261013_add_status_bayar_and_updates.sql` — kolom, index, dan policy yang dibutuhkan.
- `docs/DATABASE.md` — referensi schema database terbaru.

---

## Verifikasi

- `npm run build` berhasil setelah seluruh perubahan admin dan pembayaran.
- Perubahan telah dipush ke GitHub: commit `ab2e082`.
- Vercel akan deploy otomatis dari branch `main`.

---

## Status Integrasi Supabase

- Migration `supabase/migrations/20261013_add_status_bayar_and_updates.sql` sudah dijalankan di Supabase SQL Editor (dikonfirmasi Kukuh, 13 Oktober 2026).
- Kolom `status_bayar`, index, serta policy UPDATE untuk order dan proposal kini seharusnya tersedia.
- Tes end-to-end aplikasi masih perlu dilakukan: proposal → ACC (isi harga dan qty) → `/admin` → Tandai Sudah Bayar → `/admin/orderan`.

> Dashboard saat ini memakai policy UPDATE anonim agar aksi admin client-side dapat berjalan. Jangan gunakan model akses ini untuk produksi publik jangka panjang; tambahkan autentikasi admin/PIN sebelum menangani data pelanggan secara luas.

---

## Command Penting

```bash
npm run dev
npm run build
git push origin main
```

---

**Last Updated:** 13 Oktober 2026
**Status:** Workflow proposal, order belum bayar, dan order sudah bayar siap digunakan; migration Supabase sudah diterapkan, menunggu tes end-to-end.
