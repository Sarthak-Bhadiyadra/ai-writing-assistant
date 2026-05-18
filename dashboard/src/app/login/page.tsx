'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { handleError, handleSuccess } from '@/lib/errorHandler'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, ArrowRight, Chrome } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModernButton } from '@/components/ui/ModernButton'

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      handleError(error, "Login failed");
      setError(error.message)
      setLoading(false)
    } else {
      handleSuccess("Welcome back!");
      router.push('/app')
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
    <div className="min-h-screen bg-surface relative overflow-hidden flex items-center justify-center px-4 py-20">
      {/* Premium Background Ambient Glowspots */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[140px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Logo & Headline */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-14 h-14 bg-gradient-to-tr from-brand-600 to-indigo-650 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-5 cursor-pointer"
          >
            <Sparkles size={28} className="animate-pulse" />
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-600">Writing Buddy</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-2">Elevate your writing with AI intelligence</p>
        </div>

        {/* Double-Frosted Auth Card */}
        <div className="glass-card-premium border-brand-500/15 p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] text-left relative overflow-hidden">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Sign In</h2>
            <p className="text-xs font-semibold text-slate-400">Enter your details to access your dashboard</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 mb-6 text-xs text-danger bg-danger/5 border border-danger/15 rounded-xl flex items-center gap-3 font-semibold"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-brand-600 hover:text-brand-700 transition">Forgot?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field border-slate-200 focus:border-brand-500 focus:bg-white bg-slate-50/40 text-slate-900 font-semibold text-xs transition duration-300"
                placeholder="••••••••••••"
                required
              />
            </div>

            <ModernButton 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 text-base font-bold shadow-md shadow-brand-500/10 mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </div>
              )}
            </ModernButton>
          </form>

          {/* Elegant divider with floating white-glass badge */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white/95 border border-slate-100/50 rounded-full shadow-sm">
                Or continue with
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
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
            Create an account
          </Link>
        </p>

        {/* Footer badges */}
        <div className="mt-10 flex justify-center gap-8 text-slate-400">
           <div className="flex items-center gap-2 text-xs font-bold hover:text-slate-600 transition duration-300 cursor-pointer">
             <Chrome size={14} />
             <span>Chrome Store</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-bold hover:text-slate-600 transition duration-300 cursor-pointer">
             <div className="w-2 h-2 rounded-full bg-success shadow-sm shadow-success/35" />
             <span>GDPR Compliant</span>
           </div>
        </div>
      </motion.div>
    </div>
  )
}

