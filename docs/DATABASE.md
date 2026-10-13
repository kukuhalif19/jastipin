-- Schema Database Jastipin (Supabase PostgreSQL)
-- Run di Supabase SQL Editor

-- 1. Tabel Orders (Pesanan Masuk)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  alamat text not null,
  items jsonb not null default '[]'::jsonb,
  total integer not null default 0,
  wa_target text not null,
  created_at timestamptz not null default now()
);

-- RLS (Row Level Security)
alter table public.orders enable row level security;

-- Policy: Publik boleh INSERT order baru (tanpa login)
create policy "Allow public insert to orders"
  on public.orders
  for insert
  to anon
  with check (true);

-- Policy: Admin boleh baca semua order (opsional, via service role key atau dashboard)
create policy "Allow anon read orders"
  on public.orders
  for select
  to anon
  using (true);

-- Index untuk performa
create index if not exists idx_orders_created_at on public.orders (created_at desc);

-- 2. Tabel Proposals (Pengajuan Menu dari Pelanggan)
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  alamat text not null,
  toko_id integer,
  toko_nama text not null,
  menu_diajukan text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected')),
  wa_target text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.proposals enable row level security;

create policy "proposals_select_own"
  on public.proposals for select using (true);

create policy "proposals_insert_anon"
  on public.proposals for insert with check (true);

create index if not exists idx_proposals_created_at on public.proposals (created_at desc);
create index if not exists idx_proposals_status on public.proposals (status);
create index if not exists idx_proposals_wa_target on public.proposals (wa_target);
