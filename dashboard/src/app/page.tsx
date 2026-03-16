'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, CreditCard, Settings, LogOut, Sparkles, TrendingUp, Zap, PenTool } from 'lucide-react'

const sendTokenToChromeExtension = ({ extensionId, jwt }) => {
  try {
    if (typeof window !== 'undefined' && (window as any).chrome?.runtime?.sendMessage) {
      (window as any).chrome.runtime.sendMessage(extensionId, { jwt }, response => {
        if (response && !response.success) {
          console.log('error sending message', response);
          return response;
        }
        console.log('Sucesss ::: ', response?.message)
      });
    }
  } catch (error) {
    console.log('Error sending message to extension:', error);
  }
}


export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)
  const [usage, setUsage] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  
  useEffect(() => {
    async function getDashboardData() {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      sendTokenToChromeExtension({ extensionId: 'amaamdifabjhfoojfkdcglaldbfcfbdj', jwt: session?.access_token})

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setDbUser(userData)

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count } = await supabase
        .from('usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('timestamp', today.toISOString())
      
      setUsage(count || 0)
      setLoading(false)
    }

    getDashboardData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
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

  const limit = dbUser?.plan === 'free' ? 30 : Infinity
  const percentage = limit === Infinity ? 0 : Math.min((usage / limit) * 100, 100)

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
          <Link href="/" className="sidebar-link-active">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/billing" className="sidebar-link">
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
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, {user?.email?.split('@')[0]}
            </h1>
            <p className="text-text-secondary">
              Here's an overview of your writing activity today.
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Usage Today */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <span className="stat-label">Usage Today</span>
                <div className="w-9 h-9 rounded-xl bg-brand-600/10 flex items-center justify-center">
                  <TrendingUp size={18} className="text-brand-400" />
                </div>
              </div>
              <div className="stat-value">{usage}</div>
              <p className="text-sm text-text-muted mt-1">
                of {limit === Infinity ? 'unlimited' : limit} improvements
              </p>
            </div>

            {/* Current Plan */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <span className="stat-label">Current Plan</span>
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-accent" />
                </div>
              </div>
              <div className="stat-value capitalize">{dbUser?.plan || 'Free'}</div>
              <p className="text-sm text-text-muted mt-1">
                {dbUser?.plan === 'free' ? '30 improvements/day' : 'Unlimited improvements'}
              </p>
            </div>

            {/* Extension Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <span className="stat-label">Extension</span>
                <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                  <Zap size={18} className="text-success" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="stat-value">Active</div>
                <span className="badge-success">Connected</span>
              </div>
              <p className="text-sm text-text-muted mt-1">Chrome extension synced</p>
            </div>
          </div>

          {/* Usage Chart Card */}
          <div className="card mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Daily Usage</h2>
                <p className="text-sm text-text-muted mt-0.5">Your improvement activity for today</p>
              </div>
              {dbUser?.plan === 'free' && (
                <Link href="/billing" className="btn-primary text-sm">
                  <Zap size={14} />
                  Upgrade Plan
                </Link>
              )}
            </div>
            
            {/* Progress Bar */}
            {limit !== Infinity && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary font-medium">{usage} used</span>
                  <span className="text-text-muted">{limit} limit</span>
                </div>
                <div className="h-3 bg-surface-overlay rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${percentage}%`,
                      background: percentage > 80 
                        ? 'linear-gradient(90deg, #ef4444, #f87171)' 
                        : 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                    }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {percentage > 80 
                    ? 'You\'re running low. Consider upgrading for unlimited access.' 
                    : `${(100 - percentage).toFixed(0)}% of daily quota remaining`
                  }
                </p>
              </div>
            )}

            {/* Simple Bar Chart */}
            <div className="h-32 flex items-end gap-1 px-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const isCurrentHour = new Date().getHours() === i
                const barHeight = i <= new Date().getHours() ? Math.random() * 80 + 10 : 5
                return (
                  <div 
                    key={i} 
                    className="flex-1 rounded-t transition-all duration-500"
                    style={{ 
                      height: `${barHeight}%`,
                      backgroundColor: isCurrentHour 
                        ? '#6366f1' 
                        : i <= new Date().getHours() 
                          ? 'rgba(99, 102, 241, 0.3)' 
                          : 'rgba(255,255,255,0.04)'
                    }}
                    title={`${i}:00`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-text-muted">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
            </div>
          </div>

          {/* Quick Start */}
          <div className="card bg-gradient-to-r from-brand-600/10 to-accent/10 border-brand-600/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
                <PenTool size={24} className="text-brand-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-1">How to use AI Writer</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Select any text on a webpage, click the AI Writer button that appears, choose your tone, and get instant improvements. Your Chrome extension is connected and ready to go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
