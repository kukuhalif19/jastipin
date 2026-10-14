// Seed data produk dari KATALOG_JASTIP_BANDUNG_PEKANBARU.pdf
// 1 toko = 1 foto (placeholder AI-generated image URL per toko)

export interface Product {
  id: string
  tokoId: number
  tokoNama: string
  nama: string
  harga: number
  satuan: string
  catatan?: string
  badge?: string
}

export interface Toko {
  id: number
  nama: string
  tagline: string
  badge?: string
  khususPekanbaru?: boolean
  image: string // path ke /toko/{id}.ext di public/
}

export const TOKO_LIST: Toko[] = [
  {
    id: 1,
    nama: 'Bolen Tjihapit',
    tagline: 'Bolen Legendaris Khas Bandung — Per Box Isi 8 Pcs',
    badge: 'LEGENDARIS BANDUNG',
    image: '/toko/1.png',
  },
  {
    id: 2,
    nama: 'Bolu Pisang Tjilaki 9',
    tagline: 'Bolu Pisang Premium Jl. Cilaki No.9 Bandung',
    badge: 'RESEP SEJAK 1980',
    image: '/toko/2.jpg',
  },
  {
    id: 3,
    nama: 'RO-CHI Mochi Bandung',
    tagline: 'Choux Pastry Isi Lembut Khas Bandung — Aneka Varian',
    badge: 'CHOUX PASTRY VIRAL',
    image: '/toko/3.webp',
  },
  {
    id: 4,
    nama: 'Mochi Aifa Caringin',
    tagline: 'Mochi Lembut Aneka Rasa — Box Isi 8, 9, 10 & 28 Butir',
    badge: 'MOCHI FAVORIT',
    image: '/toko/4.jpg',
  },
  {
    id: 5,
    nama: 'Tiramisusu by Chocomory',
    tagline: 'Dessert Viral Bandung — Jl. Anggrek No.48',
    badge: 'BEST SELLER BANDUNG',
    image: '/toko/5.jpg',
  },
  {
    id: 6,
    nama: 'Makmur Jaya Coffee Roaster',
    tagline: 'Kopi Susu Signature Botol 1 Liter',
    badge: 'KHUSUS PEKANBARU KOTA',
    khususPekanbaru: true,
    image: '/toko/6.webp',
  },
  {
    id: 7,
    nama: 'Kopi Tuku',
    tagline: 'TUKUCUR 1 Liter Botol — Pelopor Kopi Susu Tetangga',
    badge: 'KHUSUS PEKANBARU KOTA',
    khususPekanbaru: true,
    image: '/toko/7.jpg',
  },
  {
    id: 8,
    nama: 'Bandung Cheesecuit',
    tagline: 'Olahan Biskuit & Keju Lumer Khas Bandung',
    badge: 'KEJU LUMER VIRAL',
    image: '/toko/8.png',
  },
]

export const PRODUCTS: Product[] = [
  // ─── TOKO 1: BOLEN TJIHAPIT ────────────────────────────────────────────────
  { id: 't1-p1', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Bolen Cokelat Kacang', harga: 62000, satuan: 'box', badge: 'FAVORIT #1' },
  { id: 't1-p2', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Bolen Krim Keju', harga: 62000, satuan: 'box', badge: 'GURIH CREAMY' },
  { id: 't1-p3', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Bolen Pisang Keju Cokelat', harga: 64000, satuan: 'box' },
  { id: 't1-p4', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Bolen Smoked Beef (Asin)', harga: 70000, satuan: 'box' },
  { id: 't1-p5', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Bolen Daging Sapi Cincang (Asin)', harga: 70000, satuan: 'box' },
  { id: 't1-p6', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Cheese Roll', harga: 66000, satuan: 'box', badge: 'VARIAN BARU' },
  { id: 't1-p7', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Choco Roll', harga: 72000, satuan: 'box', badge: 'VARIAN BARU' },
  { id: 't1-p8', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Add-on: Honey Brown Butter', harga: 22000, satuan: 'pcs', catatan: 'Add-on untuk bolen' },
  { id: 't1-p9', tokoId: 1, tokoNama: 'Bolen Tjihapit', nama: 'Add-on: Creamy Garlic Butter', harga: 22000, satuan: 'pcs', catatan: 'Add-on untuk bolen' },

  // ─── TOKO 2: BOLU PISANG TJILAKI 9 ────────────────────────────────────────
  { id: 't2-p1', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Bolu Pisang Kacang', harga: 168000, satuan: 'box', badge: 'LEGENDARIS TJILAKI' },
  { id: 't2-p2', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Bolu Pisang Stroberi', harga: 168000, satuan: 'box' },
  { id: 't2-p3', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Bolu Pisang Cokelat', harga: 168000, satuan: 'box' },
  { id: 't2-p4', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Bolu Pisang Keju', harga: 168000, satuan: 'box' },
  { id: 't2-p5', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Kue Ngeprul — Roombutter', harga: 90000, satuan: 'box' },
  { id: 't2-p6', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Kue Ngeprul — Cashew Nut', harga: 90000, satuan: 'box' },
  { id: 't2-p7', tokoId: 2, tokoNama: 'Bolu Pisang Tjilaki 9', nama: 'Kue Ngeprul — Cookies & Cream', harga: 90000, satuan: 'box' },

  // ─── TOKO 3: RO-CHI MOCHI BANDUNG ─────────────────────────────────────────
  { id: 't3-p1', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Peanut', harga: 18000, satuan: 'pcs' },
  { id: 't3-p2', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Red Bean', harga: 18000, satuan: 'pcs' },
  { id: 't3-p3', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Spicy Mayo Nugget Kanzler', harga: 28000, satuan: 'pcs' },
  { id: 't3-p4', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Callebaut Chocolate', harga: 28000, satuan: 'pcs' },
  { id: 't3-p5', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Cranberry Creamcheese', harga: 26000, satuan: 'pcs' },
  { id: 't3-p6', tokoId: 3, tokoNama: 'RO-CHI Mochi Bandung', nama: 'Savory Beef', harga: 25000, satuan: 'pcs' },

  // ─── TOKO 4: MOCHI AIFA CARINGIN ──────────────────────────────────────────
  { id: 't4-p1', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Mochi Aneka Rasa (isi 10)', harga: 50000, satuan: 'box', catatan: 'Vanilla, Pandan, Durian, Mangga, Greentea, Strawberry, Coklat, Keju, dll' },
  { id: 't4-p2', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Mochi Coklat / Keju / Susu Coklat Kacang (isi 9)', harga: 52000, satuan: 'box' },
  { id: 't4-p3', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Mochi Kombinasi (isi 28 butir kecil)', harga: 54000, satuan: 'box' },
  { id: 't4-p4', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Mochi Durian Asli / Cookie Crumble / Matcha Crumble', harga: 54000, satuan: 'box' },
  { id: 't4-p5', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Lempok Durian', harga: 48000, satuan: 'box' },
  { id: 't4-p6', tokoId: 4, tokoNama: 'Mochi Aifa Caringin', nama: 'Pia Crispy isi 9 (Kacang / Keju / Coklat)', harga: 48000, satuan: 'box' },

  // ─── TOKO 5: TIRAMISUSU BY CHOCOMORY ──────────────────────────────────────
  { id: 't5-p1', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Tiramisusu Original', harga: 135000, satuan: 'box', badge: 'BEST SELLER' },
  { id: 't5-p2', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Tiramisusu Cookies & Cream', harga: 135000, satuan: 'box' },
  { id: 't5-p3', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Tiramisusu Matcha', harga: 150000, satuan: 'box' },
  { id: 't5-p4', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Dubai Pistachio Kunafe', harga: 144000, satuan: 'box' },
  { id: 't5-p5', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Moo Moo Roll Double Chocolate', harga: 135000, satuan: 'box' },
  { id: 't5-p6', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Crispy Brownie Almond', harga: 120000, satuan: 'box' },
  { id: 't5-p7', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Pie isi 20 (Choco / C&C / Berry)', harga: 135000, satuan: 'box' },
  { id: 't5-p8', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Pie isi 5', harga: 45000, satuan: 'box' },
  { id: 't5-p9', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Pie Black Rose', harga: 150000, satuan: 'box' },
  { id: 't5-p10', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Krispiii / Krispiii Coffee', harga: 60000, satuan: 'box' },
  { id: 't5-p11', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Choco Bag (Almond / Matcha / Wafer)', harga: 71000, satuan: 'box' },
  { id: 't5-p12', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Mini Choco Bar (Almond / Cashew / Matcha)', harga: 24000, satuan: 'pcs', catatan: 'Harga Rp21.000–27.000 tergantung varian' },
  { id: 't5-p13', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Paket 99', harga: 152000, satuan: 'paket' },
  { id: 't5-p14', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Popcorn', harga: 90000, satuan: 'box' },
  { id: 't5-p15', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Abon Chips', harga: 105000, satuan: 'box' },
  { id: 't5-p16', tokoId: 5, tokoNama: 'Tiramisusu by Chocomory', nama: 'Chocomory Cotton Candy', harga: 60000, satuan: 'box' },

  // ─── TOKO 6: MAKMUR JAYA COFFEE ───────────────────────────────────────────
  { id: 't6-p1', tokoId: 6, tokoNama: 'Makmur Jaya Coffee Roaster', nama: 'Es Kopi Susu 1 Liter (Gula Aren)', harga: 150000, satuan: 'botol', catatan: 'Tidak bisa no sugar / kurangi gula. Khusus Pekanbaru Kota.', badge: '1 LITER BOTOL' },
  { id: 't6-p2', tokoId: 6, tokoNama: 'Makmur Jaya Coffee Roaster', nama: 'Es Kopi Susu Plantbased 1 Liter (Oatmilk)', harga: 174000, satuan: 'botol', catatan: 'Tidak bisa no sugar / kurangi gula. Khusus Pekanbaru Kota.' },

  // ─── TOKO 7: KOPI TUKU ────────────────────────────────────────────────────
  { id: 't7-p1', tokoId: 7, tokoNama: 'Kopi Tuku', nama: 'TUKUCUR Kopi Susu Tetangga 1 Liter', harga: 156000, satuan: 'botol', catatan: 'Khusus Pekanbaru Kota.', badge: 'TUKUCUR 1L' },

  // ─── TOKO 8: BANDUNG CHEESECUIT ───────────────────────────────────────────
  { id: 't8-p1', tokoId: 8, tokoNama: 'Bandung Cheesecuit', nama: 'Cheesecuit Reguler', harga: 50000, satuan: 'box', catatan: 'Varian: Mochi Filling, Pink Berry, Sale Pisang, Dodol, Campolay' },
  { id: 't8-p2', tokoId: 8, tokoNama: 'Bandung Cheesecuit', nama: 'Bogel (Ukuran Mini — Varian Sama)', harga: 22000, satuan: 'box' },
  { id: 't8-p3', tokoId: 8, tokoNama: 'Bandung Cheesecuit', nama: 'Pudding Lasagna', harga: 28000, satuan: 'cup', catatan: 'Varian: Mixfruit, Marshmallow, Choco Berry, Black Crumble' },
  { id: 't8-p4', tokoId: 8, tokoNama: 'Bandung Cheesecuit', nama: 'Brownies Longsor', harga: 72000, satuan: 'box' },
  { id: 't8-p5', tokoId: 8, tokoNama: 'Bandung Cheesecuit', nama: 'Bongsor Red Velvet', harga: 72000, satuan: 'box' },
]

// ─── HITUNG FEE (DI-COMMENT / DEPRECATED) ──────────────────────────────────
// Gunakan helper terpusat di `@/lib/data/fee-calculator`: `hitungFeePerToko`, `hitungTotalFee`
//
// export function hitungFee(harga: number): number {
//   return harga < 100000 ? 20000 : 30000
// }

export function formatRupiah(num: number): string {
  return 'Rp ' + num.toLocaleString('id-ID')
}

// Admin WA (random 50:50)
export const ADMIN_LIST = [
  { nama: 'Nurul', wa: '6285691188111' },
  { nama: 'Alif', wa: '6287763652013' },
]

export function getRandomAdmin() {
  return ADMIN_LIST[Math.floor(Math.random() * ADMIN_LIST.length)]
}
