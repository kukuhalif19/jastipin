import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PIN = process.env.ADMIN_PIN || ''

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { username, pin } = body

  if (username === ADMIN_USERNAME && pin === ADMIN_PIN && ADMIN_PIN) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('jastipin_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Username atau PIN salah' }, { status: 401 })
}
