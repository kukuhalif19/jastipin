// lib/proposal.ts — Wave 3: Propose Menu
import { supabase } from './supabase'
import { getRandomAdmin } from './data/products'

export interface ProposalPayload {
  nama: string
  alamat: string
  tokoId: number | null
  tokoNama: string
  menuDiajukan: string
}

export interface ProposalResult {
  saved: boolean
  waLink: string
  waTarget: string
  error?: string
}

export async function submitProposal(payload: ProposalPayload): Promise<ProposalResult> {
  const { nama, alamat, tokoId, tokoNama, menuDiajukan } = payload
  const admin = getRandomAdmin()

  // Format WhatsApp (sesuai spesifikasi Wave 3)
  const message = `Nama: ${nama}, Alamat: ${alamat}, Toko: ${tokoNama}, Menu yg diajukan: ${menuDiajukan}`

  const waLink = `https://wa.me/${admin.wa}?text=${encodeURIComponent(message)}`

  // Simpan ke Supabase
  let saved = false
  let error: string | undefined

  if (supabase) {
    try {
      const { error: insertError } = await supabase.from('proposals').insert({
        nama,
        alamat,
        toko_id: tokoId,
        toko_nama: tokoNama,
        menu_diajukan: menuDiajukan,
        wa_target: admin.wa,
        status: 'pending',
      })

      if (insertError) {
        console.error('[submitProposal] Supabase insert failed:', insertError)
        error = insertError.message
        saved = false
      } else {
        saved = true
      }
    } catch (err) {
      console.error('[submitProposal] Exception:', err)
      error = err instanceof Error ? err.message : String(err)
      saved = false
    }
  } else {
    error = 'Supabase belum dikonfigurasi'
  }

  return {
    saved,
    waLink,
    waTarget: `${admin.nama} (${admin.wa})`,
    error,
  }
}
