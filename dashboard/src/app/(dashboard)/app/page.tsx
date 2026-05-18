"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { TrendingUp, Sparkles, Zap, PenTool, ArrowUpRight, Trash2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const StatCard = ({ label, value, subtext, icon: Icon, colorClass, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card glass-card-hover flex flex-col justify-between h-full group relative overflow-hidden shadow-[0_15px_30px_rgba(15,23,42,0.02)] border-slate-200/50"
  >
    <div className="absolute -top-10 -left-10 w-28 h-28 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors" />
    <div className="flex items-center justify-between mb-6">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-sm", colorClass)}>
        <Icon size={18} />
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">{value}</h2>
      <p className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold leading-relaxed">
        {subtext}
      </p>
    </div>
  </motion.div>
);

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
      .limit(4);
    
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
    } catch (error) {
      handleError(error, "Failed to delete activity");
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
        <div className="relative w-10 h-10">
          <div className="w-10 h-10 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
          <div className="absolute inset-0 m-auto w-3 h-3 bg-brand-400 rounded-full animate-ping" />
        </div>
     </div>
  );

  const limit = dbUser?.plan === "free" ? 30 : 999999;
  const percentage = Math.min((usage / (limit === 999999 ? 100 : limit)) * 100, 100);

  // Tone color mapper to style activity badges based on tone selected - Light High Contrast
  const getToneBadgeStyle = (tone: string) => {
    const tones: Record<string, string> = {
      "Improve Clarity": "bg-cyan-50 border-cyan-100 text-cyan-700",
      "Make Concise": "bg-teal-50 border-teal-100 text-teal-700",
      "Fix Grammar": "bg-emerald-50 border-emerald-100 text-emerald-700",
      "Expand": "bg-indigo-50 border-indigo-100 text-indigo-700",
      "Professional & Formal": "bg-purple-50 border-purple-100 text-purple-700",
      "Casual & Conversational": "bg-amber-50 border-amber-100 text-amber-700",
      "Friendly & Warm": "bg-rose-50 border-rose-100 text-rose-700",
      "Urgent & Direct": "bg-red-50 border-red-100 text-red-700",
      "Persuasive & Confident": "bg-orange-50 border-orange-100 text-orange-700",
      "Academic & Scientific": "bg-blue-50 border-blue-100 text-blue-700",
    };
    return tones[tone] || "bg-brand-50 border-brand-100 text-brand-700";
  };

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between text-left">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">Overview</h1>
          <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping" />
            Track your writing improvements and Writing Buddy status.
          </p>
        </div>
      </header>

      {/* Top row Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Usage Today"
          value={`${usage} attempts`}
          subtext={limit === 999999 ? "Unlimited access enabled" : `${limit - usage} remaining for today`}
          icon={TrendingUp}
          colorClass="bg-brand-50 border-brand-100 text-brand-600 group-hover:shadow-[0_0_15px_rgba(79,102,241,0.15)]"
          delay={0}
        />
        <StatCard 
          label="Current Tier"
          value={dbUser?.plan === "pro" ? "Pro Member" : "Free Tier"}
          subtext={dbUser?.plan === "free" ? "Upgrade for unlimited rewrites" : "Premium models active"}
          icon={Sparkles}
          colorClass="bg-purple-5 border-purple-100 text-accent group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          delay={0.1}
        />
        
        {/* Animated Connected Extension Radar widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card glass-card-hover flex flex-col justify-between h-full group relative overflow-hidden border-slate-200/50 shadow-[0_15px_30px_rgba(15,23,42,0.02)] hover:border-success/20 hover:bg-success/[0.02]"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-success/5 rounded-full blur-2xl group-hover:bg-success/10 transition-colors" />
          <div className="flex items-center justify-between mb-6">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-success/80">Extension Status</span>
            
            {/* Concentric live radar ping */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span className="absolute w-5 h-5 rounded-full bg-success/20 animate-pulse-radar" />
              <span className="absolute w-7 h-7 rounded-full bg-success/10 animate-pulse-radar [animation-delay:0.8s]" />
              <span className="relative w-3.5 h-3.5 rounded-full bg-success border-2 border-white shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-baseline gap-2 mb-1">
              <h2 className="text-3xl font-black tracking-tight text-success flex items-center gap-1.5">
                Active
              </h2>
              <span className="text-[9px] font-black uppercase tracking-wider bg-success/10 border border-success/15 text-success px-2 py-0.5 rounded-md">Live</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Writing Buddy bridge is connected and ready.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Quota and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
         {/* Circular Radial Quota Meter Card */}
         <div className="glass-card lg:col-span-2 flex flex-col justify-between border-slate-200/50 text-left">
            <div>
               <h3 className="font-extrabold text-lg tracking-tight mb-1 text-slate-900">Daily Quota</h3>
               <p className="text-xs font-semibold text-slate-400 mb-8">Refreshes every 24 hours.</p>
            </div>
            
            {/* SVG Progress Circle Ring */}
            <div className="relative w-40 h-40 flex items-center justify-center mx-auto my-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" className="stroke-slate-100" strokeWidth="7" fill="transparent" />
                {/* Animated Glowing Gradient Circular Ring */}
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  className="stroke-brand-500" 
                  strokeWidth="7" 
                  fill="transparent"
                  strokeDasharray={238.76}
                  initial={{ strokeDashoffset: 238.76 }}
                  animate={{ strokeDashoffset: 238.76 - (238.76 * percentage) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(79, 102, 241, 0.25))"
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black tracking-tight text-slate-900">{usage}</span>
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest mt-0.5">
                  {limit === 999999 ? "Unlimited" : `/ ${limit}`}
                </span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 leading-relaxed text-center">
                 {dbUser?.plan === "free" 
                   ? "Upgrade to Pro to unlock unlimited improvements, access to state-of-the-art Llama models, and faster generation."
                   : "You have unlimited improvements. Enjoy writing at scale!"
                 }
              </p>
            </div>
         </div>

         {/* Overview Recent Activity list */}
         <div className="glass-card lg:col-span-3 flex flex-col justify-between border-slate-200/50 text-left">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-lg tracking-tight text-slate-900">Recent Attempts</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-150 text-[9px] font-black uppercase text-slate-400 tracking-wider">
                     {recentActivity.length} logs
                  </span>
               </div>
               <Link 
                 href="/app/activity"
                 className="text-[9px] uppercase tracking-widest font-black text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1 group"
               >
                  Full History 
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
               </Link>
            </div>
            
            <div className="flex-1 space-y-4">
               {recentActivity.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                     <PenTool size={28} className="text-slate-200 mb-3 animate-float" />
                     <p className="text-sm font-black text-slate-800">No recent activity found</p>
                     <p className="text-[10px] text-slate-400 mt-1 font-semibold">Start using the extension to see logs here.</p>
                  </div>
               ) : (
                  <AnimatePresence>
                    {recentActivity.map((log) => (
                       <motion.div 
                         key={log.id} 
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 10 }}
                         className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-slate-200/20 hover:border-slate-200/60 shadow-[inset_0_1px_0_white] transition-all duration-300 group"
                       >
                          <div className="flex items-center gap-4 text-left overflow-hidden min-w-0 flex-1">
                             <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600 flex-shrink-0 border border-brand-500/10 shadow-sm">
                                <PenTool size={16} />
                             </div>
                             <div className="overflow-hidden pr-4">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                   <span className={cn("text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border", getToneBadgeStyle(log.tone))}>
                                      {log.tone || 'General'}
                                   </span>
                                   <span className="text-[10px] text-slate-400 font-bold">• {formatRelativeTime(log.timestamp)}</span>
                                </div>
                                {log.improved_text && (
                                   <p className="text-xs text-slate-600 font-semibold italic truncate">
                                      "{log.improved_text}"
                                   </p>
                                )}
                             </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                             <button 
                               onClick={() => handleDeleteActivity(log.id)}
                               className="w-8 h-8 rounded-lg bg-white text-slate-400 hover:text-danger hover:bg-danger/10 border border-slate-200/50 hover:border-danger/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                               title="Delete Log"
                             >
                                <Trash2 size={13} />
                             </button>
                          </div>
                       </motion.div>
                    ))}
                  </AnimatePresence>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

