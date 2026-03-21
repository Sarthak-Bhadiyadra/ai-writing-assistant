'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { handleError, handleSuccess } from '@/lib/errorHandler'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, ArrowRight, Github, Chrome } from 'lucide-react'
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
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-500/30 mb-6"
          >
            <Sparkles size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to <span className="text-gradient">Writing Buddy</span></h1>
          <p className="text-text-secondary mt-2">Elevate your writing with AI intelligence</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 md:p-10 border-white/5 shadow-2xl shadow-black/50">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Sign In</h2>
            <p className="text-sm text-text-muted">Enter your details to access your dashboard</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 mb-6 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Password</label>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-brand-400 hover:text-brand-300">Forgot?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field bg-white/[0.02]"
                placeholder="••••••••••••"
                required
              />
            </div>

            <ModernButton 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 text-base font-bold shadow-lg shadow-brand-500/25 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </div>
              )}
            </ModernButton>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              <span className="px-4 bg-[#0d0f1a]">Or continue with</span>
            </div>
          </div>

          <div className="grid ">
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
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">
            Create an account
          </Link>
        </p>

        {/* Floating Badges */}
        <div className="mt-12 flex justify-center gap-8 text-text-muted opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 text-xs font-medium">
             <Chrome size={14} />
             <span>Chrome Store</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-medium">
             <div className="w-2 h-2 rounded-full bg-success" />
             <span>GDPR Compliant</span>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
