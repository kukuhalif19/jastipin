-- Migration: Add status_bayar to orders and enable updates
-- Jalankan di Supabase SQL Editor

-- 1. Tambah kolom status_bayar di orders jika belum ada
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'status_bayar'
  ) then
    alter table public.orders
      add column status_bayar text not null default 'belum_bayar'
      check (status_bayar in ('belum_bayar', 'sudah_bayar'));
  end if;
end $$;

-- 2. Index untuk status_bayar
create index if not exists idx_orders_status_bayar on public.orders (status_bayar);

-- 3. Policy update orders untuk anon
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders' and policyname = 'Allow anon update orders'
  ) then
    create policy "Allow anon update orders"
      on public.orders for update to anon using (true) with check (true);
  end if;
end $$;

-- 4. Policy update proposals untuk anon
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'proposals' and policyname = 'Allow anon update proposals'
  ) then
    create policy "Allow anon update proposals"
      on public.proposals for update to anon using (true) with check (true);
  end if;
end $$;
