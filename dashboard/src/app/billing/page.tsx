'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, CreditCard, Settings, LogOut, Check, Zap, PenTool } from 'lucide-react'

export default function BillingPage() {
  const [user, setUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setDbUser(userData)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSubscribe = async (plan: string) => {
      alert(`Connecting to Stripe for ${plan} plan...`)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <span className="text-sm text-text-muted">Loading...</span>
        </div>
      </div>
    )
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for casual writing improvements.',
      features: ['30 improvements per day', 'Standard AI model', 'Email support'],
      buttonText: 'Current Plan',
      isCurrent: dbUser?.plan === 'free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$7',
      period: '/month',
      description: 'Ideal for power users and professionals.',
      features: ['Unlimited improvements', 'Grok-2 Premium AI', 'Priority support', 'All tones included'],
      buttonText: dbUser?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      isCurrent: dbUser?.plan === 'pro',
      popular: true
    },
    {
      name: 'Team',
      price: '$25',
      period: '/month',
      description: 'Collaborate with your team seamlessly.',
      features: ['Up to 5 users', 'Shared analytics', 'Centralized billing', 'Team presets'],
      buttonText: dbUser?.plan === 'team' ? 'Current Plan' : 'Get Team Plan',
      isCurrent: dbUser?.plan === 'team',
      popular: false
    }
  ]

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col bg-surface-raised">
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white">
            <PenTool size={18} />
          </div>
          <span className="font-bold text-lg text-text-primary">AI Writer</span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          <Link href="/" className="sidebar-link">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/billing" className="sidebar-link-active">
            <CreditCard size={18} />
            Billing
          </Link>
          <Link href="/settings" className="sidebar-link">
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-text-primary truncate">{user?.email}</p>
            <p className="text-xs text-text-muted capitalize">{dbUser?.plan || 'Free'} Plan</p>
          </div>
          <button 
            onClick={handleLogout}
            className="sidebar-link w-full hover:text-danger"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Plans & Billing</h1>
            <p className="text-text-secondary">Choose the right plan for your writing needs.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`card relative flex flex-col transition-all duration-300 ${
                  plan.popular 
                    ? 'border-brand-500/50 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/20' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge text-[11px]">Most Popular</span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary mb-1">{plan.name}</h3>
                  <p className="text-sm text-text-muted">{plan.description}</p>
                  <div className="mt-5 flex items-baseline">
                    <span className="text-4xl font-extrabold text-text-primary tracking-tight">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-base font-medium text-text-muted">{plan.period}</span>}
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-brand-600/15 text-brand-400 rounded-md flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={plan.isCurrent}
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.isCurrent 
                    ? 'bg-surface-overlay text-text-muted cursor-not-allowed border border-border' 
                    : plan.popular 
                      ? 'btn-primary justify-center' 
                      : 'btn-secondary justify-center'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Enterprise CTA */}
          <div className="card bg-gradient-to-r from-brand-600/10 to-accent/10 border-brand-600/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-brand-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-1">Need a custom plan?</h3>
                <p className="text-sm text-text-secondary">
                  We offer enterprise plans with SSO, advanced security, and dedicated support for your organization.
                </p>
              </div>
              <button className="btn-secondary flex-shrink-0 whitespace-nowrap">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
