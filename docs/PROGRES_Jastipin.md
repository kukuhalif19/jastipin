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

## Wave 1: Seed Data & Deploy (PENDING)

**Yang perlu dilakukan:**
- [ ] Buat Supabase project (gratis tier)
- [ ] Copy DB credentials ke `.env.local`
- [ ] Run SQL schema (DATABASE.md) di Supabase SQL editor
- [ ] Generate 8 hero images (AI atau placeholder per toko)
- [ ] Deploy ke Vercel (connect GitHub repo)
- [ ] Test live: katalog → pesan → WhatsApp terima + DB insert

---

## Wave 2–5 (Belum Dimulai)

- Wave 2: Form data diri + halaman review (UI polish)
- Wave 3: Integrasi WhatsApp + simpan DB
- Wave 4: UI/UX finalisasi (menunggu mockup desain Kukuh)
- Wave 5: Testing + production deploy

---

## Notes & Blockers

### ✓ Selesai
- Alur lengkap dari katalog → pesan
- Kalkulasi fee per item (<100k = 20k, ≥100k = 30k)
- LocalStorage persistence untuk keranjang
- No emoji policy (semua ikon pakai SVG)
- Neo-Brutalist design system applied

### ⏳ Blocked / Awaiting
- **Supabase credentials:** Tunggu Kukuh setup project + copy URL & anon key ke `.env.local`
- **Hero images per toko:** Toko warna placeholder sementara, perlu AI-generated atau real photos
- **Production domain:** Domain custom (jika ada) bisa di-setup saat Wave 1 deploy

---

## Command Penting

```bash
# Development
npm run dev

# Build
npm run build

# Deploy (dari GitHub → Vercel otomatis)
git push origin main
```

---

## Aturan Kukuh Terpenuhi

✓ **Rule #9:** Dokumentasi lengkap (`PRD.md`, `WAVES.md`, `DATABASE.md`)
✓ **Rule #9.1:** Wave pengerjaan terstruktur dengan status per item
✓ **Ponytail Lite:** Solusi minimal, tidak over-engineer (hanya 6 pages, 3 components core)
✓ **No Emoji:** Semua ikon SVG inline
✓ **Neo-Brutalist:** Design system applied konsisten

---

## Next Steps

1. Kukuh setup Supabase project (gratis, 2 menit)
2. Masukkan credentials ke `.env.local`
3. Jalankan SQL schema dari `DATABASE.md` di Supabase SQL editor
4. Lanjut Wave 1 (seed data, generate images, deploy)

---

**Last Updated:** 13 Oktober 2026, 06:53 WIB  
**Author:** Hermes Agent + Kukuh  
**Status:** Wave 0 ✓ Complete, Ready for Wave 1
