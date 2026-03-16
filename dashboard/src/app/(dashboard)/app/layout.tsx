"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  LogOut, 
  BarChart3, 
  PenTool,
  User,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

const SidebarLink = ({ href, icon: Icon, children, active }: any) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200",
      active 
        ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-sm" 
        : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
    )}
  >
    <Icon size={18} />
    {children}
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
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border flex flex-col bg-surface-raised sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <PenTool className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Writing Buddy</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2">
          <SidebarLink href="/app" icon={LayoutDashboard} active={pathname === "/app"}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/app/statistics" icon={BarChart3} active={pathname === "/app/statistics"}>
            Usage Stats
          </SidebarLink>
          <SidebarLink href="/app/billing" icon={CreditCard} active={pathname === "/app/billing"}>
            Billing & Plans
          </SidebarLink>
          <SidebarLink href="/app/settings" icon={Settings} active={pathname === "/app/settings"}>
            Settings
          </SidebarLink>
        </nav>

        <div className="p-6 mt-auto">
           <div className="glass-card p-4 mb-4 border-brand-500/20 bg-brand-500/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                    <Zap size={16} />
                 </div>
                 <div className="text-xs">
                    <p className="font-bold text-text-primary">Free Plan</p>
                    <p className="text-text-muted">30 improvements left</p>
                 </div>
              </div>
              <Link href="/app/billing" className="block text-center py-2 bg-brand-500 text-white text-[11px] font-bold rounded-lg hover:bg-brand-600 transition-colors">
                 Upgrade to Pro
              </Link>
           </div>
           
           <div className="flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-3 truncate">
                 <div className="w-9 h-9 rounded-full bg-surface-overlay border border-border flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-text-secondary" />
                 </div>
                 <div className="truncate text-left">
                    <p className="text-xs font-bold text-text-primary truncate">{user.email?.split('@')[0]}</p>
                    <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                 </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                title="Sign Out"
              >
                 <LogOut size={16} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-10 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
