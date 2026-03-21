"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { TrendingUp, Sparkles, Zap, PenTool, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card flex flex-col gap-4 border-white/5"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{label}</span>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorClass)}>
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

export default function DashboardPage() {
  const [dbUser, setDbUser] = useState<any>(null);
  const [usage, setUsage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getDashboardData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (userError) throw userError;
        setDbUser(userData);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count, error: usageError } = await supabase
          .from("usage_logs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("timestamp", today.toISOString());
        
        if (usageError) throw usageError;
        setUsage(count || 0);
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
        <StatCard 
          label="Extension"
          value="Active"
          subtext="Connected correctly"
          icon={Zap}
          colorClass="bg-success/10 text-success"
        />
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
               <h3 className="font-bold">Recent Activity</h3>
               <Clock size={16} className="text-text-muted" />
            </div>
            
            <div className="space-y-6">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary">
                           <PenTool size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-bold">Scientific Tone Rewrite</p>
                           <p className="text-xs text-text-muted">LinkedIn • 2 hours ago</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-bold text-success">+1 Improvement</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
