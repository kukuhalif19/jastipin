// Helper untuk kalkulasi fee dengan aturan baru dan lama
// Aturan baru: item harga <= Rp50.000 dihitung per toko
// Aturan lama: item harga >= Rp50.001 dihitung per item

export interface CartItem {
  id: string
  tokoId: number
  tokoNama: string
  nama: string
  harga: number
  qty: number
}

// Aturan lama (per item)
export function hitungFee(harga: number): number {
  return harga < 100000 ? 20000 : 30000
}

// Aturan baru (per toko, untuk item <= Rp50.000)
export function hitungFeeKelompokMurah(subtotalMurah: number): number {
  if (subtotalMurah < 100000) return 20000
  if (subtotalMurah <= 200000) return 30000
  if (subtotalMurah <= 300000) return 40000
  return 50000
}

// Hitung total fee dengan aturan baru + lama
export function hitungTotalFee(items: CartItem[]): number {
  const grouped = new Map<number, CartItem[]>()

  // Kelompokkan per toko
  items.forEach((item) => {
    if (!grouped.has(item.tokoId)) {
      grouped.set(item.tokoId, [])
    }
    grouped.get(item.tokoId)!.push(item)
  })

  let totalFee = 0

  // Proses setiap toko
  grouped.forEach((tokoItems) => {
    // Pisahkan item murah (<= Rp50k) dan mahal (> Rp50k)
    const itemMurah = tokoItems.filter((item) => item.harga <= 50000)
    const itemMahal = tokoItems.filter((item) => item.harga > 50000)

    // Fee kelompok item murah per toko
    if (itemMurah.length > 0) {
      const subtotalMurah = itemMurah.reduce((sum, item) => sum + item.harga * item.qty, 0)
      const feeKelompok = hitungFeeKelompokMurah(subtotalMurah)
      totalFee += feeKelompok
    }

    // Fee item mahal per item (aturan lama)
    itemMahal.forEach((item) => {
      const fee = hitungFee(item.harga)
      totalFee += fee * item.qty
    })
  })

  return totalFee
}

// Detail fee per item (untuk ditampilkan di UI)
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
    const itemMurah = tokoItems.filter((item) => item.harga <= 50000)
    const itemMahal = tokoItems.filter((item) => item.harga > 50000)

    if (itemMurah.length > 0) {
      const subtotalMurah = itemMurah.reduce((sum, item) => sum + item.harga * item.qty, 0)
      const feeKelompok = hitungFeeKelompokMurah(subtotalMurah)
      itemMurah.forEach((item) => {
        result.set(item.id, feeKelompok)
      })
    }

    itemMahal.forEach((item) => {
      const fee = hitungFee(item.harga)
      result.set(item.id, fee)
    })
  })

  return result
}

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
