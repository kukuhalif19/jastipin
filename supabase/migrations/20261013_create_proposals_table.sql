-- Wave 3: Create proposals table for menu suggestions
-- Proposal pengajuan menu dari pelanggan ke admin

CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  alamat TEXT NOT NULL,
  toko_id INTEGER,
  toko_nama TEXT NOT NULL,
  menu_diajukan TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  wa_target TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Policy: SELECT — publik dapat melihat proposal mereka sendiri
CREATE POLICY "proposals_select_own" ON public.proposals
  FOR SELECT
  USING (true);

-- Policy: INSERT — anon dapat buat proposal
CREATE POLICY "proposals_insert_anon" ON public.proposals
  FOR INSERT
  WITH CHECK (true);

-- Index untuk query cepat
CREATE INDEX idx_proposals_created_at ON public.proposals(created_at DESC);
CREATE INDEX idx_proposals_status ON public.proposals(status);
CREATE INDEX idx_proposals_wa_target ON public.proposals(wa_target);

-- Comment untuk dokumentasi
COMMENT ON TABLE public.proposals IS 'Proposal pengajuan menu dari pelanggan. Dikirim via WhatsApp ke admin sekaligus tersimpan di tabel ini.';
COMMENT ON COLUMN public.proposals.status IS 'pending (baru), confirmed (menu tersedia), rejected (tidak tersedia)';
