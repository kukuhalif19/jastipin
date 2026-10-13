import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('jastipin_admin_session')
  return NextResponse.json({ authenticated: session?.value === 'authenticated' })
}
