# Progres - Jastipin
Tanggal update: 2026-10-13

## Selesai
- Proteksi Autentikasi Admin (`/admin`, `/admin/orderan`, `/admin/proposals`) via modal PIN & username dengan server-side HttpOnly cookie session (`/api/admin/login`, `/api/admin/logout`, `/api/admin/check`).
- Kalkulasi Fee Dinamis Per Toko: threshold Rp50.000 (aturan baru: item ≤Rp50k dihitung per subtotal per toko; item >Rp50k dihitung per item). Modul terpusat di `src/lib/data/fee-calculator.ts`.
- Input Nomor WhatsApp Pembeli di form `/checkout` dengan validasi minimal 9 digit dan penyimpanan di `localStorage` & Supabase.
- Notifikasi Discord Webhook Otomatis:
  - Order Masuk (`/api/notify-order`): embed hijau rich format (data pembeli, breakdown barang, fee, total, admin WA, link WA).
  - Custom Order / Pengajuan Menu Baru (`/api/notify-proposal`): embed oranye rich format (nama, alamat, toko, menu diajukan, admin WA).
- Tombol "Chat Pembeli" (hijau Neo-Brutalist) di dashboard `/admin` & `/admin/orderan` untuk langsung hubungi nomor WA pemesan.
- Kolom WhatsApp ditambahkan ke fitur Export CSV admin.
- Migration SQL untuk kolom `whatsapp` di tabel `orders` (`docs/MIGRATION_ADD_WHATSAPP.sql`).
- Semua perubahan lolos `npm run build` (exit 0) dan sudah dipush ke GitHub `origin/main`.

## File Berubah
- `src/lib/data/fee-calculator.ts` (modul baru)
- `src/app/cart/page.tsx`, `src/app/review/page.tsx`
- `src/app/api/admin/login/route.ts`, `logout/route.ts`, `check/route.ts` (route baru)
- `src/components/AdminLogin.tsx`, `src/app/admin/layout.tsx`
- `src/components/Icons.tsx` (tambah IconPhone, IconWhatsApp)
- `src/app/checkout/page.tsx`
- `src/app/admin/page.tsx`, `src/app/admin/orderan/page.tsx`
- `src/app/api/notify-order/route.ts`, `src/app/api/notify-proposal/route.ts` (route baru)
- `src/lib/proposal.ts`
- `docs/DATABASE.md`, `docs/MIGRATION_ADD_WHATSAPP.sql`
- `.env.example`, `.env.local`

## Masalah / Catatan Tertunda
- Wajib jalankan SQL migration di Supabase SQL Editor:
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS whatsapp text;`
- Pastikan Environment Variable di Vercel sudah ada: `ADMIN_USERNAME`, `ADMIN_PIN`, `DISCORD_WEBHOOK_URL`.

## Langkah Berikutnya
- Test live order checkout dan ajukan proposal di domain Vercel untuk verifikasi notifikasi Discord masuk.
- Tes login modal admin di production.
