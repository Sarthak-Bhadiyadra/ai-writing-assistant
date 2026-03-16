'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Sparkles, CheckCircle, ArrowRight, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModernButton } from '@/components/ui/ModernButton'

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
const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden flex items-center justify-center px-4 py-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 text-center border-brand-500/20"
            >
              <div className="w-20 h-20 bg-success/20 text-success rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-success/20">
                <CheckCircle size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-4">Verification Sent</h1>
              <p className="text-text-secondary leading-relaxed mb-10">
                We've sent a magic link to <span className="font-bold text-white">{email}</span>. Click it to activate your account.
              </p>
              <Link href="/login" className="block">
                <ModernButton variant="secondary" className="w-full py-4">
                  Back to Login
                </ModernButton>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form">
              {/* Brand Logo */}
              <div className="flex flex-col items-center mb-12">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-500/30 mb-6"
                >
                  <Sparkles size={32} />
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tight">Create <span className="text-gradient">Account</span></h1>
                <p className="text-text-secondary mt-2">Join thousands of professional writers</p>
              </div>

              {/* Auth Card */}
              <div className="glass-card p-8 md:p-10 border-white/5 shadow-2xl shadow-black/50">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-1">Get Started</h2>
                  <p className="text-sm text-text-muted">Start your free trial today</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 mb-6 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="field bg-white/[0.02]"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Secure Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="field bg-white/[0.02]"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 px-1 py-1">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-500" required />
                    <span className="text-xs text-text-muted">
                      I agree to the <Link href="/terms" className="text-brand-400 hover:text-brand-300">Terms</Link> and <Link href="/privacy" className="text-brand-400 hover:text-brand-300">Privacy Policy</Link>
                    </span>
                  </div>

                  <ModernButton 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 text-base font-bold shadow-lg shadow-brand-500/25 mt-2"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Create Account</span>
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </ModernButton>
                </form>

                <div className="relative my-8 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <span className="relative px-4 text-[10px] font-bold uppercase tracking-widest text-text-muted bg-[#0d0f1a]">Or Join with</span>
                </div>

                <div className="grid">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 py-3 px-4 glass rounded-xl border-white/5 hover:bg-white/5 transition-all text-sm font-medium cursor-pointer"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
              <span>Google</span>
            </button>
          </div>
              </div>

              <p className="mt-10 text-center text-text-secondary text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
