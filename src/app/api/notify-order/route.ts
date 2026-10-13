import { NextResponse } from 'next/server'

interface NotifyOrderPayload {
  orderId?: string
  nama: string
  alamat: string
  whatsapp: string
  items: Array<{
    nama: string
    tokoNama?: string
    qty: number
    harga: number
    fee: number
  }>
  total: number
  totalFee: number
  subtotal: number
  waTarget?: string
}

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num)
}

function formatWaLink(phone: string): string {
  let clean = phone.replace(/\D/g, '')
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1)
  }
  return `https://wa.me/${clean}`
}

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      console.warn('DISCORD_WEBHOOK_URL belum diset.')
      return NextResponse.json({ ok: false, message: 'DISCORD_WEBHOOK_URL tidak dikonfigurasi' }, { status: 200 })
    }

    const body: NotifyOrderPayload = await request.json()
    const { nama, alamat, whatsapp, items, total, totalFee, subtotal, waTarget } = body

    // Susun ringkasan barang (maks 15 item agar tidak melebihi limit embed Discord)
    const itemsText = (items || [])
      .slice(0, 12)
      .map((item, idx) => {
        const toko = item.tokoNama ? `[${item.tokoNama}] ` : ''
        return `${idx + 1}. **${toko}${item.nama}** x${item.qty} — ${formatRupiah(item.harga * item.qty)}`
      })
      .join('\n')

    const waLink = whatsapp ? formatWaLink(whatsapp) : ''

    const embed = {
      title: '🚨 ORDERAN JASTIP BARU MASUK!',
      color: 0x00e599, // Warna neo-brutalist green
      fields: [
        {
          name: '👤 Data Pembeli',
          value: `**Nama:** ${nama}\n**WhatsApp:** [${whatsapp || '-'}](${waLink})\n**Alamat:** ${alamat}`,
          inline: false,
        },
        {
          name: '📦 Daftar Barang',
          value: itemsText || 'Tidak ada detail barang',
          inline: false,
        },
        {
          name: '💰 Rincian Total Biaya',
          value: `Subtotal Barang: **${formatRupiah(subtotal)}**\nTotal Jastip Fee: **${formatRupiah(totalFee)}**\nGrand Total: **${formatRupiah(total)}**`,
          inline: true,
        },
        {
          name: '📱 Target Admin WA',
          value: waTarget ? `+${waTarget}` : '-',
          inline: true,
        },
      ],
      footer: {
        text: 'Jastipin System • Notifikasi Otomatis',
      },
      timestamp: new Date().toISOString(),
    }

    const discordPayload = {
      username: 'Jastipin Bot',
      avatar_url: 'https://raw.githubusercontent.com/kukuhalif19/jastipin/main/public/favicon.ico',
      content: `🔔 **Order baru dari ${nama}!** Segera cek detail pesanan di bawah ini.`,
      embeds: [embed],
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Discord webhook error:', res.status, errText)
      return NextResponse.json({ ok: false, error: errText }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Notify order failed:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
