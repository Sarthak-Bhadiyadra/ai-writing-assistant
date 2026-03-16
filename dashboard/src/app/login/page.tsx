'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PenTool } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log("datadatadatadata", data?.session?.access_token)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
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
          <h1 className="text-2xl font-bold text-text-primary mb-1">Welcome back</h1>
          <p className="text-sm text-text-secondary mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="p-3 mb-6 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-surface-raised text-text-muted">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn-secondary w-full justify-center py-3 text-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
