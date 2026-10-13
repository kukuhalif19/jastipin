import { NextResponse } from 'next/server'

interface NotifyProposalPayload {
  nama: string
  alamat: string
  tokoNama: string
  menuDiajukan: string
  waTarget?: string
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

    const body: NotifyProposalPayload = await request.json()
    const { nama, alamat, tokoNama, menuDiajukan, waTarget } = body

    const embed = {
      title: '📝 PENGAJUAN MENU BARU!',
      color: 0xff9500, // Warna oranye untuk proposal (beda dari order biasa)
      fields: [
        {
          name: '👤 Data Pelanggan',
          value: `**Nama:** ${nama}\n**Alamat:** ${alamat}`,
          inline: false,
        },
        {
          name: '🏪 Toko yang Diajukan',
          value: tokoNama,
          inline: true,
        },
        {
          name: '🍽️ Menu yang Diminta',
          value: menuDiajukan,
          inline: true,
        },
        {
          name: '📱 Admin Ditugaskan',
          value: waTarget ? `+${waTarget}` : '-',
          inline: false,
        },
        {
          name: '✅ Status',
          value: '**PENDING** — Menunggu konfirmasi admin',
          inline: false,
        },
      ],
      footer: {
        text: 'Jastipin System • Proposal Menu',
      },
      timestamp: new Date().toISOString(),
    }

    const discordPayload = {
      username: 'Jastipin Bot',
      avatar_url: 'https://raw.githubusercontent.com/kukuhalif19/jastipin/main/public/favicon.ico',
      content: `🔔 **Pengajuan menu baru dari ${nama}!** Tolong dicek dan direspons ya.`,
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
    console.error('Notify proposal failed:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
