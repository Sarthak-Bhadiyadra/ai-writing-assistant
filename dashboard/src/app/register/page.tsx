'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { PenTool, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface px-4">
        <div className="w-full max-w-sm">
          <div className="card p-8 text-center">
            <div className="w-14 h-14 bg-success/15 text-success rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} />
            </div>
            <h1 className="text-xl font-bold text-text-primary mb-2">Check your email</h1>
            <p className="text-sm text-text-secondary mb-6">
              We've sent a confirmation link to <span className="font-semibold text-text-primary">{email}</span>
            </p>
            <Link href="/login" className="text-brand-400 font-semibold text-sm hover:text-brand-300 transition-colors">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
            <PenTool size={20} />
          </div>
          <span className="font-bold text-xl text-text-primary">AI Writer</span>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Create an account</h1>
          <p className="text-sm text-text-secondary mb-8">Start improving your writing with AI</p>

          {error && (
            <div className="p-3 mb-6 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
