"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  LogOut, 
  PenTool,
  User,
  Zap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLink = ({ href, icon: Icon, children, active }: any) => (
  <Link
    href={href}
    className={cn(
      "group relative flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors duration-300",
      active 
        ? "text-brand-600" 
        : "text-slate-500 hover:text-slate-900"
    )}
  >
    {active && (
      <motion.div
        layoutId="active-sidebar-pill"
        className="absolute inset-0 bg-brand-500/10 border border-brand-500/15 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    )}
    <Icon size={16} className={cn("relative z-10 transition-colors duration-300", active ? "text-brand-600 animate-pulse" : "text-slate-400 group-hover:text-slate-700")} />
    <span className="relative z-10">{children}</span>
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-surface bg-dot-grid">
      {/* Sidebar Container - Floating and frosted */}
      <aside className="w-76 p-4 h-screen sticky top-0 flex flex-col z-20">
        <div className="flex-1 flex flex-col bg-white/70 border border-slate-200/50 backdrop-blur-2xl rounded-[2.2rem] p-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.04)]">
          
          {/* Logo */}
          <div className="py-4 mb-6 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-accent rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:rotate-6 transition-transform duration-300">
                <PenTool className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-black text-base tracking-tight block bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-900 to-brand-600">Writing Buddy</span>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mt-0.5">Workspace</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1.5">
            <SidebarLink href="/app" icon={LayoutDashboard} active={pathname === "/app"}>
              Overview
            </SidebarLink>
            <SidebarLink href="/app/activity" icon={Clock} active={pathname === "/app/activity"}>
              Recent Activity
            </SidebarLink>
            <SidebarLink href="/app/billing" icon={CreditCard} active={pathname === "/app/billing"}>
              Plans & Billing
            </SidebarLink>
            <SidebarLink href="/app/settings" icon={Settings} active={pathname === "/app/settings"}>
              Settings
            </SidebarLink>
          </nav>

          {/* Bottom Info Panels */}
          <div className="space-y-4 mt-auto">
            {/* Shimmering upgrade module */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-500/15 bg-gradient-to-br from-brand-500/5 to-accent/5 p-4.5 group shadow-sm">
              {/* Animated shifting shimmer */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600 border border-brand-500/10 shadow-inner">
                  <Zap size={16} className="animate-pulse text-brand-600" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold text-xs text-slate-900">Free Plan</p>
                  <p className="text-[10px] font-semibold text-slate-400">30 improvements left</p>
                </div>
              </div>
              <Link 
                href="/app/billing" 
                className="relative block text-center py-2 bg-gradient-to-r from-brand-600 to-accent text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-[0_4px_12px_rgba(79,102,241,0.2)]"
              >
                Upgrade to Pro
              </Link>
            </div>
            
            {/* User Profile Card */}
            <div className="p-3 bg-slate-50/50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3 truncate text-left">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/50 flex items-center justify-center flex-shrink-0 shadow-sm relative group overflow-hidden">
                  <User size={16} className="text-slate-500" />
                  <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-black text-slate-800 truncate">{user.email?.split('@')[0]}</p>
                  <p className="text-[9px] text-slate-400 font-semibold truncate">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-danger hover:bg-danger/10 border border-transparent hover:border-danger/10 rounded-lg transition-all flex-shrink-0"
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-10 py-12 relative min-h-screen">
          {/* Global Ambient Glowspots for depth background */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}


