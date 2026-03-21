"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { TrendingUp, Sparkles, Zap, PenTool, ArrowUpRight, Clock, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card flex flex-col gap-5 border-white/5 hover:border-white/10 transition-all duration-300 group"
  >
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted/60">{label}</span>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300", colorClass)}>
        <Icon size={20} />
      </div>
    </div>
    <div>
      <h2 className="text-4xl font-extrabold tracking-tight">{value}</h2>
      <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
        {subtext}
      </p>
    </div>
  </motion.div>
);

import { cn } from "@/lib/utils";

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [usage, setUsage] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function getRecentActivity(userId: string) {
    const { data, error } = await supabase
      .from("usage_logs")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .limit(5);
    
    if (error) throw error;
    setRecentActivity(data || []);
  }

  async function handleDeleteActivity(id: number) {
    try {
      const { error } = await supabase
        .from("usage_logs")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      setRecentActivity(prev => prev.filter(a => a.id !== id));
      // Also update usage count if it's from today
      // (Optional, maybe keep usage count as total historical attempts?)
    } catch (error) {
      handleError(error, "Failed to delete activity");
    }
  }

  async function handleClearAll() {
    if (!user || !confirm("Are you sure you want to clear all your recent activity? This cannot be undone.")) return;
    
    try {
      const { error } = await supabase
        .from("usage_logs")
        .delete()
        .eq("user_id", user.id);
      
      if (error) throw error;
      setRecentActivity([]);
    } catch (error) {
      handleError(error, "Failed to clear all activity");
    }
  }

  useEffect(() => {
    async function getDashboardData() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;
        setUser(authUser);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        
        if (userError) throw userError;
        setDbUser(userData);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count, error: usageError } = await supabase
          .from("usage_logs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", authUser.id)
          .gte("timestamp", today.toISOString());
        
        if (usageError) throw usageError;
        setUsage(count || 0);

        await getRecentActivity(authUser.id);
      } catch (error) {
        handleError(error, "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    getDashboardData();
  }, []);

  if (loading) return (
     <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
     </div>
  );

  const limit = dbUser?.plan === "free" ? 30 : 999999;
  const percentage = Math.min((usage / (limit === 999999 ? 100 : limit)) * 100, 100);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Overview</h1>
        <p className="text-text-secondary">Track your writing performance and Writing Buddy activity.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Usage Today"
          value={usage}
          subtext={limit === 999999 ? "Unlimited access" : `${limit - usage} remaining today`}
          icon={TrendingUp}
          colorClass="bg-brand-500/10 text-brand-400"
        />
        <StatCard 
          label="Current Plan"
          value={dbUser?.plan || "Free"}
          subtext={dbUser?.plan === "free" ? "Upgrade for more limits" : "Premium features active"}
          icon={Sparkles}
          colorClass="bg-accent/10 text-accent"
        />
          <div className="glass-card flex flex-col h-full bg-success/5 border-success/10 group hover:bg-success/10 transition-colors duration-300">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-success/60">Extension</span>
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                   <Zap size={20} />
                </div>
             </div>
             <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-1 text-success">Active</h2>
                <p className="text-xs text-success/60 flex items-center gap-1.5 line-clamp-1">
                   WritingBuddy is connected and ready
                </p>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Usage Bar Card */}
         <div className="glass-card">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold">Daily Quota</h3>
               <span className="text-xs font-bold text-text-muted">{usage} / {limit === 999999 ? '∞' : limit}</span>
            </div>
            
            <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-6">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${percentage}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-brand-500 to-accent rounded-full"
               />
            </div>
            
            <p className="text-sm text-text-secondary leading-relaxed">
               {dbUser?.plan === "free" 
                 ? "You are currently on the free plan. Upgrade to Pro to get unlimited improvements and access to premium models."
                 : "You have unlimited improvements. Write away!"
               }
            </p>
         </div>

         {/* Usage History Mockup */}
          <div className="glass-card">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                   <h3 className="text-sm font-bold tracking-tight">Recent Activity</h3>
                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-text-muted">
                      {recentActivity.length}
                   </div>
                </div>
                <Link 
                  href="/app/activity"
                  className="text-[10px] uppercase tracking-widest font-bold text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1.5"
                >
                   View Full History <ArrowUpRight size={12} />
                </Link>
             </div>
            
            <div className="space-y-6">
               {recentActivity.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-sm">
                     No recent activity found.
                  </div>
               ) : (
                  recentActivity.map((log) => (
                     <div key={log.id} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0 group">
                        <div className="flex items-center gap-4 text-left overflow-hidden">
                           <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary flex-shrink-0">
                              <PenTool size={18} />
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-sm font-bold truncate">{log.tone || 'General'} Improvement</p>
                              <p className="text-[11px] text-text-muted truncate">
                                 {log.source || 'Webpage'} • {formatRelativeTime(log.timestamp)}
                              </p>
                              {log.improved_text && (
                                 <p className="text-[11px] text-text-muted mt-1 italic truncate opacity-60 group-hover:opacity-100 transition-opacity">
                                    "{log.improved_text}"
                                 </p>
                              )}
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="text-right hidden sm:block">
                              <p className="text-[10px] font-bold text-success uppercase tracking-wider">+1 improvement</p>
                           </div>
                           <button 
                             onClick={() => handleDeleteActivity(log.id)}
                             className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger/20"
                             title="Delete Activity"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
