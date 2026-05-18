'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { handleError, handleSuccess } from '@/lib/errorHandler'
import Link from 'next/link'
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
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
      handleError(error, "Registration failed");
      setError(error.message)
      setLoading(false)
    } else {
      handleSuccess("Verification email sent!");
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
      {/* Premium Background Ambient Glowspots */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[140px] rounded-full" />
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
              className="glass-card-premium border-brand-500/15 p-10 text-center shadow-[0_20px_50px_rgba(15,23,42,0.04)]"
            >
              <div className="w-20 h-20 bg-success/10 text-success border border-success/25 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-success/10">
                <CheckCircle size={38} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Verification Sent</h1>
              <p className="text-slate-650 leading-relaxed text-sm font-semibold mb-10">
                We've sent a magic link to <span className="font-black text-brand-600">{email}</span>. Click it to activate your account.
              </p>
              <Link href="/login" className="block">
                <ModernButton variant="secondary" className="w-full py-4 !rounded-xl">
                  Back to Login
                </ModernButton>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form">
              {/* Brand Logo & Headline */}
              <div className="flex flex-col items-center mb-10">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="w-14 h-14 bg-gradient-to-tr from-brand-600 to-indigo-650 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-5 cursor-pointer"
                >
                  <Sparkles size={28} className="animate-pulse" />
                </motion.div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-650">Account</span>
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-2">Join thousands of professional writers</p>
              </div>

              {/* Double-Frosted Auth Card */}
              <div className="glass-card-premium border-brand-500/15 p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] text-left relative overflow-hidden">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Get Started</h2>
                  <p className="text-xs font-semibold text-slate-400">Start your free trial today</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 mb-6 text-xs text-danger bg-danger/5 border border-danger/15 rounded-xl font-semibold"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="field border-slate-200 focus:border-brand-500 focus:bg-white bg-slate-50/40 text-slate-900 font-semibold text-xs transition duration-300"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="field border-slate-200 focus:border-brand-500 focus:bg-white bg-slate-50/40 text-slate-900 font-semibold text-xs transition duration-300"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2.5 px-1 py-1">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-brand-655 focus:ring-brand-500 cursor-pointer" required />
                    <span className="text-xs text-slate-500 font-semibold">
                      I agree to the <Link href="/terms" className="text-brand-600 font-black hover:text-brand-700 transition">Terms</Link> and <Link href="/privacy" className="text-brand-600 font-black hover:text-brand-700 transition">Privacy Policy</Link>
                    </span>
                  </div>

                  <ModernButton 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 text-base font-bold shadow-md shadow-brand-500/10 mt-2"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Create Account</span>
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </ModernButton>
                </form>

                {/* Divider badge separator */}
                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white/95 border border-slate-100/50 rounded-full shadow-sm">
                      Or join with
                    </span>
                  </div>
                </div>

                {/* Premium Google Auth Button */}
                <div className="grid">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 transition-all text-xs font-black uppercase tracking-wider rounded-xl shadow-sm cursor-pointer text-slate-700"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4.5 h-4.5" alt="Google" />
                    <span>Google Account</span>
                  </motion.button>
                </div>
              </div>

              <p className="mt-8 text-center text-slate-500 font-semibold text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
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

