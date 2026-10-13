'use client'

import { useState, FormEvent } from 'react'
import { IconUser, IconAlert } from './Icons'

type AdminLoginProps = {
  onSuccess: () => void
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validasi client-side
    if (!username || !pin) {
      setError('Username dan PIN wajib diisi.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, pin }),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Username atau PIN salah.')
      }
    } catch {
      setError('Gagal menghubungi server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 16,
      }}
    >
      <div
        className="nb-card"
        style={{
          width: '100%',
          maxWidth: 380,
          padding: 24,
          background: '#F5F0E8',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <IconUser size={36} />
          <h2 style={{ fontSize: 20, fontWeight: 900, margin: '12px 0 4px', textTransform: 'uppercase' }}>
            Login Admin
          </h2>
          <p style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>
            Masukkan username dan PIN untuk melanjutkan.
          </p>
        </div>

        {error && (
          <div
            style={{
              border: '2px solid #000',
              background: '#FF5C5C',
              padding: 12,
              marginBottom: 16,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <IconAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 700, fontSize: 12, marginBottom: 6, textTransform: 'uppercase' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              className="nb-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="pin" style={{ display: 'block', fontWeight: 700, fontSize: 12, marginBottom: 6, textTransform: 'uppercase' }}>
              PIN
            </label>
            <input
              id="pin"
              type="password"
              className="nb-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="nb-btn nb-btn--primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
