// Helper untuk kalkulasi fee Jastipin
// Aturan terbaru (efektif 2026-02): FEE PERTOKO berdasarkan SUBTOTAL TOTAL per toko
// - Subtotal toko < Rp100.000  → fee Rp20.000
// - Subtotal toko Rp101.000 – Rp200.000 → fee Rp30.000
// - Subtotal toko Rp201.000 – Rp300.000 → fee Rp40.000
// - Subtotal toko > Rp300.000 → fee Rp50.000

export interface CartItem {
  id: string
  tokoId: number
  tokoNama: string
  nama: string
  harga: number
  qty: number
}

// ── ATURAN LAMA (DI-comment, tidak dipakai lagi) ──────────────────────────
//
// // Aturan lama (per item)
// export function hitungFee(harga: number): number {
//   return harga < 100000 ? 20000 : 30000
// }
//
// // Aturan lama (per toko, untuk item <= Rp50.000)
// export function hitungFeeKelompokMurah(subtotalMurah: number): number {
//   if (subtotalMurah < 100000) return 20000
//   if (subtotalMurah <= 200000) return 30000
//   if (subtotalMurah <= 300000) return 40000
//   return 50000
// }
//
// ── END ATURAN LAMA ────────────────────────────────────────────────────────

// ── ATURAN BARU: Fee Pertoko Berdasarkan Subtotal Total ───────────────────

/**
 * Hitung fee untuk satu toko berdasarkan subtotal SEMUA item di toko tersebut.
 *
 * Tier:
 *   < 100.000  → 20.000
 *   101–200.000 → 30.000
 *   201–300.000 → 40.000
 *   > 300.000  → 50.000
 */
export function hitungFeePerToko(subtotalToko: number): number {
  if (subtotalToko < 100000) return 20000
  if (subtotalToko <= 200000) return 30000
  if (subtotalToko <= 300000) return 40000
  return 50000
}

/**
 * Hitung total fee seluruh keranjang.
 * Kelompokkan item per toko → jumlahkan subtotal → terapkan tier fee per toko.
 */
export function hitungTotalFee(items: CartItem[]): number {
  const grouped = new Map<number, CartItem[]>()

  items.forEach((item) => {
    if (!grouped.has(item.tokoId)) {
      grouped.set(item.tokoId, [])
    }
    grouped.get(item.tokoId)!.push(item)
  })

  let totalFee = 0

  grouped.forEach((tokoItems) => {
    const subtotalToko = tokoItems.reduce((sum, item) => sum + item.harga * item.qty, 0)
    totalFee += hitungFeePerToko(subtotalToko)
  })

  return totalFee
}

/**
 * Detail fee per item (untuk ditampilkan di UI cart/review).
 * Setiap item di toko yang sama mendapat nilai fee yang sama (fee toko).
 */
export function hitungFeeDetail(items: CartItem[]): Map<string, number> {
  const result = new Map<string, number>()
  const grouped = new Map<number, CartItem[]>()

  items.forEach((item) => {
    if (!grouped.has(item.tokoId)) {
      grouped.set(item.tokoId, [])
    }
    grouped.get(item.tokoId)!.push(item)
  })

  grouped.forEach((tokoItems) => {
    const subtotalToko = tokoItems.reduce((sum, item) => sum + item.harga * item.qty, 0)
    const feeToko = hitungFeePerToko(subtotalToko)

    tokoItems.forEach((item) => {
      result.set(item.id, feeToko)
    })
  })

  return result
}
// ── END ATURAN BARU ────────────────────────────────────────────────────────

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
