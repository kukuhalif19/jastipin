# PRD — Jastipin

**Versi:** 1.0.0
**Tanggal:** 13 Oktober 2026
**Author:** Kukuh + Hermes Agent
**Status:** Draft — Menunggu approval desain UI/UX sebelum eksekusi

---

## 1. Ringkasan Project

Aplikasi web katalog jastip sederhana pengganti Google Form.
User memilih item dari katalog, mengisi data diri, mereview pesanan,
lalu mengirim ke WhatsApp admin + tersimpan otomatis di database.

Tidak ada login. Tidak ada checkout ribet. Simple dan cepat.

- **Nama:** Jastipin
- **Domain target:** jastipin.vercel.app (atau custom domain nanti)
- **Stack:** Next.js + Tailwind CSS → Vercel, Supabase (PostgreSQL)

---

## 2. Toko & Menu (Dari PDF)

8 toko, diekstrak dari `KATALOG_JASTIP_BANDUNG_PEKANBARU.pdf`.

| # | Nama Toko | Rentang Harga |
|---|---|---|
| 01 | Bolen Tjihapit | Rp52.000 – Rp78.000 |
| 02 | Bolu Pisang Tjilaki 9 | Rp75.000 – Rp140.000 |
| 03 | RO-CHI Mochi Bandung | Rp15.000 – Rp23.000 |
| 04 | Mochi Aifa Caringin | Rp40.000 – Rp45.000 |
| 05 | Tiramisusu by Chocomory | Rp17.500 – Rp126.500 |
| 06 | Makmur Jaya Coffee Roaster | Rp125.000 – Rp145.000 |
| 07 | Kopi Tuku | Rp130.000 |
| 08 | Bandung Cheesecuit | Rp18.000 – Rp60.000 |

### Detail Menu Lengkap

#### 01 Bolen Tjihapit
Bolen Legendaris Khas Bandung — Per Box Isi 8 Pcs

| Produk | Harga |
|---|---|
| Bolen Cokelat Kacang | Rp52.000 / box |
| Bolen Krim Keju | Rp52.000 / box |
| Bolen Pisang Keju Cokelat | Rp53.000 / box |
| Bolen Smoked Beef (Asin) | Rp58.000 / box |
| Bolen Daging Sapi Cincang (Asin) | Rp58.000 / box |
| Cheese Roll (Varian Baru) | Rp55.000 / box |
| Choco Roll (Varian Baru) | Rp60.000 / box |
| Add-on: Honey Brown Butter | +Rp18.000 |
| Add-on: Creamy Garlic Butter | +Rp18.000 |

#### 02 Bolu Pisang Tjilaki 9
Bolu Pisang Premium Jl. Cilaki No.9 Bandung

| Produk | Harga |
|---|---|
| Bolu Pisang Kacang | Rp140.000 / box |
| Bolu Pisang Stroberi | Rp140.000 / box |
| Bolu Pisang Cokelat | Rp140.000 / box |
| Bolu Pisang Keju | Rp140.000 / box |
| Kue Ngeprul — Roombutter | Rp75.000 / box |
| Kue Ngeprul — Cashew Nut | Rp75.000 / box |
| Kue Ngeprul — Cookies & Cream | Rp75.000 / box |

#### 03 RO-CHI Mochi Bandung
Choux Pastry Isi Lembut Khas Bandung

| Produk | Harga |
|---|---|
| Peanut | Rp15.000 / pcs |
| Red Bean | Rp15.000 / pcs |
| Spicy Mayo Nugget Kanzler | Rp23.000 / pcs |
| Callebaut Chocolate | Rp23.000 / pcs |
| Cranberry Creamcheese | Rp22.000 / pcs |
| Savory Beef | Rp21.000 / pcs |

#### 04 Mochi Aifa Caringin
Mochi Lembut Aneka Rasa — Box Isi 8, 9, 10, & 28 Butir

| Produk | Harga |
|---|---|
| Mochi Aneka Rasa (isi 10) | Rp42.000 / box |
| Mochi Coklat / Keju / Susu Coklat Kacang (isi 9) | Rp43.000 / box |
| Mochi Kombinasi (isi 28 butir kecil) | Rp45.000 / box |
| Mochi Durian Asli / Cookie Crumble / Matcha Crumble / ... | Rp45.000 / box |
| Lempok Durian | Rp40.000 / box |
| Pia Crispy isi 9 (Kacang / Keju / Coklat) | Rp40.000 / box |

#### 05 Tiramisusu by Chocomory
Dessert Viral Bandung — Jl. Anggrek No.48

| Produk | Harga |
|---|---|
| Tiramisusu Original | Rp112.500 |
| Tiramisusu Cookies & Cream | Rp112.500 |
| Tiramisusu Matcha | Rp125.000 |
| Dubai Pistachio Kunafe | Rp120.000 |
| Moo Moo Roll Double Chocolate | Rp112.500 |
| Crispy Brownie Almond | Rp100.000 |
| Chocomory Pie (Choco / Cookies & Cream / Berry) isi 20 | Rp112.500 |
| Chocomory Pie isi 5 | Rp37.500 |
| Chocomory Pie Black Rose | Rp125.000 |
| Krispiii / Krispiii Coffee | Rp50.000 |
| Choco Bag (Almond / Matcha / Wafer) | Rp59.000 |
| Mini Choco Bar (Almond / Cashew / Matcha) | Rp17.500 – 22.500 |
| Paket 99 | Rp126.500 |
| Chocomory Popcorn | Rp75.000 |
| Chocomory Abon Chips | Rp87.500 |
| Chocomory Cotton Candy | Rp50.000 |

#### 06 Makmur Jaya Coffee Roaster
Kopi Susu Signature Botol 1 Liter — Khusus Area Pekanbaru

| Produk | Harga | Catatan |
|---|---|---|
| Es Kopi Susu 1 Liter (Gula Aren) | Rp125.000 / botol | Tidak bisa no sugar / kurangi gula |
| Es Kopi Susu Plantbased 1 Liter (Oatmilk) | Rp145.000 / botol | Tidak bisa no sugar /kurangi gula |

#### 07 Kopi Tuku
TUKUCUR 1 Liter Botol — Pelopor Kopi Susu Tetangga

| Produk | Harga |
|---|---|
| TUKUCUR Kopi Susu Tetangga 1 Liter | Rp130.000 / botol |

#### 08 Bandung Cheesecuit
Olahan Biskuit & Keju Lumer Khas Bandung

| Produk | Harga |
|---|---|
| Cheesecuit Reguler (Mochi Filling, Pink Berry, Sale Pisang, Dodol, Campolay) | Rp42.000 / box |
| Bogel (Ukuran Mini — Varian Sama) | Rp18.000 / box |
| Pudding Lasagna (Mixfruit, Marshmallow, Choco Berry, Black Crumble) | Rp23.000 / cup |
| Brownies Longsor | Rp60.000 / box |
| Bongsor Red Velvet | Rp60.000 / box |

---

## 3. User Stories

| ID | Sebagai | Saya ingin | Supaya |
|---|---|---|---|
| US-01 | User | Melihat semua toko & menu | Bisa memilih barang yang mau dipesan |
| US-02 | User | Menambah & menghapus item dari keranjang | Bisa atur pesanan sebelum lanjut |
| US-03 | User | Mengisi nama & alamat sekali | Tidak perlu login |
| US-04 | User | Mereview pesanan + total harga sebelum pesan | Tidak salah pesan |
| US-05 | User | Edit/hapus item di halaman review | Bisa ubah pesanan sebelum kirim |
| US-06 | User | Menekan tombol Pesan → terbuka WhatsApp dengan pesan terformat | Langsung terhubung ke admin |
| US-07 | Admin | Setiap pesanan tersimpan di database | Bisa tracking pesanan masuk |

---

## 4. Alur Lengkap

```
[Halaman Katalog]
  → User pilih toko/menu, klik "Tambah ke Keranjang"
  → Ikon keranjang menampilkan jumlah item

[Halaman Form Data Diri]
  → Isi: Nama, Alamat (wajib diisi)
  → Tombol "Lanjut ke Review"

[Halaman Review Pesanan]
  → Tampil: daftar pesanan, nama, alamat
  → Perhitungan otomatis: harga barang + fee per item
  → Tombol Edit (balik ke katalog) & Hapus (per item)
  → Tombol "Pesan Sekarang" → generate WA link + simpan ke DB

[WhatsApp terbuka dengan format:]
  Halo Admin, saya ingin memesan:
  Nama   : {nama}
  Alamat : {alamat}
  Pesanan:
  - {item} x{qty} = Rp{harga} + fee Rp{fee}
  Total  : Rp{grand_total}
```

---

## 5. Logika Fee

Perhitungan **per item**, bukan per total belanja:

```
harga < Rp100.000  → fee = Rp20.000
harga >= Rp100.000 → fee = Rp30.000

Total = Σ (harga_item × qty) + Σ (fee_per_item × qty)
```

Contoh:
- Beli 2x Bolen Cokelat (Rp52.000) → 2 × (52.000 + 20.000) = Rp144.000
- Beli 1x Bolu Pisang (Rp140.000) → 1 × (140.000 + 30.000) = Rp170.000

---

## 6. Ketentuan Khusus (Tampilkan di UI)

- Kopi 1 liter (Makmur Jaya & Kopi Tuku) **hanya melayani area Pekanbaru**.
- Makmur Jaya tidak bisa custom gula.
- Pengambilan Pekanbaru: **Jumat malam**.
- Luar Pekanbaru: **Sabtu + ongkir tambahan** (dihubungi admin).
- Pre-Order: **13–25 Oktober**.

---

## 7. Database Schema (Supabase)

### Tabel `orders`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key, default gen_random_uuid() |
| nama | text | Nama pemesan |
| alamat | text | Alamat pemesan |
| items | jsonb | Array pesanan [{nama, harga, qty, fee}] |
| total | integer | Grand total dalam rupiah |
| wa_target | text | Nomor WA yang dituju (Nurul atau Alif) |
| created_at | timestamptz | Waktu pesanan masuk, default now() |

### Tabel `products`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary key, default gen_random_uuid() |
| toko_id | integer | Nomor urut toko (1–8) |
| toko_nama | text | Nama toko |
| nama | text | Nama produk |
| harga | integer | Harga dalam rupiah |
| satuan | text | Satuan (box/pcs/botol/cup) |
| catatan | text | Catatan khusus (opsional) |
| sort_order | integer | Urutan tampilan |

---

## 8. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js 14 + Tailwind CSS | Deploy langsung di Vercel, routing mudah |
| Database | Supabase (PostgreSQL) | Gratis, realtime, mudah dikelola |
| Hosting | Vercel | Free tier cukup, CI/CD otomatis dari Git |
| WhatsApp | wa.me link | Tanpa API berbayar, paling simple |
| State | React Context / Zustand | Keranjang state management |

---

## 9. Routing WhatsApp

Dua nomor admin:

- **Nurul:** 085691188111
- **Alif:** 087763652013

Saat tombol "Pesan Sekarang" diklik, sistem memilih **random 50:50**
antara Nurul dan Alif sebagai tujuan WA.

Format URL: `https://wa.me/{nomor}?text={pesan_terformat}`

---

## 10. Scope MVP (Wave-by-Wave)

| Wave | Isi | Status |
|---|---|---|
| Wave 0 | Setup project (Next.js + Supabase + Vercel) + seed data menu dari PDF | Pending |
| Wave 1 | Halaman Katalog (list toko & produk, tambah ke keranjang) | Pending |
| Wave 2 | Halaman Form Data Diri + Halaman Review Pesanan (edit, hapus, hitung total+fee) | Pending |
| Wave 3 | Tombol Pesan → WA link terformat + simpan ke Supabase | Pending |
| Wave 4 | Polish UI (sesuai desain yang akan dikirim user), mobile-first, deploy | Pending |

---

## 11. Acceptance Criteria

- [ ] User bisa browse semua 8 toko dan semua menu tanpa login
- [ ] User bisa tambah/hapus item di keranjang
- [ ] User mengisi nama + alamat sebelum review
- [ ] Halaman review menampilkan daftar pesanan, subtotal, fee per item, grand total
- [ ] Tombol edit balik ke katalog, tombol hapus per item
- [ ] Tombol "Pesan Sekarang" membuka WA dengan format benar
- [ ] Pesanan tersimpan di tabel `orders` di Supabase
- [ ] Mobile-first responsive
- [ ] No emoji di UI (gunakan SVG/icon)
- [ ] Ponytail lite: solusi minimal, mudah dibaca, mudah dirawat

---

## 12. Catatan Desain

- **Struktur Katalog:** 1 Toko = 1 Foto AI Hero Banner (gaya dark cinematic konsisten).
- **Tampilan Toko:** Banner hero besar di atas + list menu & harga di bawahnya.
- **Iconography:** Wajib SVG inline (No Emoji di seluruh UI).
- **Palette & Gaya:** 3-color palette terbatas, dark cinematic, negative space dramatis, minimal animation (fade, transform only).
- **Status Mockup:** Menunggu detail visual tambahan dari Kukuh sebelum Wave 4 dieksekusi.

---

## 13. Riwayat Revisi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0.0 | 13 Okt 2026 | Initial draft — PRD lengkap |
| 1.1.0 | 13 Okt 2026 | Penyesuaian 1 toko = 1 foto hero banner AI + list menu, Kanban board jastipin diinisialisasi |
