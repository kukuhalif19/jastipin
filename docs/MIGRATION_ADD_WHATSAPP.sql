-- Migration: Menambahkan kolom whatsapp ke tabel orders
-- Tanggal: 2026-10-13
-- Deskripsi: Field untuk menyimpan nomor WhatsApp pembeli agar admin bisa contact langsung

-- Tambahkan kolom whatsapp (nullable, karena order lama tidak punya data ini)
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS whatsapp text;

-- Opsional: Buat index untuk performa pencarian berdasarkan nomor WA
CREATE INDEX IF NOT EXISTS idx_orders_whatsapp ON public.orders (whatsapp);

-- Verifikasi: Cek struktur tabel setelah migration
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'orders' AND table_schema = 'public'
-- ORDER BY ordinal_position;
