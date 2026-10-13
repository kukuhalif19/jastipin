'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLogin } from '@/components/AdminLogin'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(Boolean(data.authenticated))
        setChecking(false)
      })
      .catch(() => {
        setAuthenticated(false)
        setChecking(false)
      })
  }, [])

  function handleLoginSuccess() {
    setAuthenticated(true)
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    setAuthenticated(false)
    router.push('/')
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontWeight: 700 }}>Memeriksa autentikasi...</p>
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />
  }

  return (
    <>
      {children}
      <button
        type="button"
        className="nb-btn"
        onClick={handleLogout}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          fontSize: 11,
          padding: '8px 14px',
        }}
      >
        Logout
      </button>
    </>
  )
}
