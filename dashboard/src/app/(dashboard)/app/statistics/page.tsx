"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Zap, History, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const StatBox = ({ label, value, trend, icon: Icon }: any) => (
  <div className="glass-card p-6 flex flex-col gap-4">
    <div className="flex justify-between items-center text-text-muted">
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      <Icon size={18} />
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-extrabold">{value}</h3>
      <span className="text-xs font-bold text-success flex items-center gap-1 bg-success/10 px-2 py-1 rounded-lg">
        <TrendingUp size={12} /> {trend}
      </span>
    </div>
  </div>
);

export default function StatisticsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Statistics</h1>
        <p className="text-text-secondary">A detailed look at your writing impact and usage history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Total Improvements" value="1,284" trend="12%" icon={Zap} />
        <StatBox label="Time Saved" value="4.2h" trend="8%" icon={Clock} />
        <StatBox label="Words Refined" value="42,500" trend="15%" icon={FileText} />
      </div>

      {/* Chart Section */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="font-bold text-lg">Usage Volume</h3>
            <p className="text-sm text-text-muted">Improvements per day over the last 30 days</p>
          </div>
          <div className="flex gap-2">
             <button className="px-3 py-1 bg-white/5 text-[11px] font-bold rounded-lg border border-white/5 hover:border-white/10">7D</button>
             <button className="px-3 py-1 bg-brand-500/20 text-brand-400 text-[11px] font-bold rounded-lg border border-brand-500/30">30D</button>
          </div>
        </div>

        <div className="h-64 flex items-end gap-2 px-2">
           {Array.from({ length: 30 }).map((_, i) => {
              const height = (Math.sin(i / 3) * 30) + 50 + (Math.random() * 20);
              return (
                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className={cn(
                        "w-full rounded-t-lg transition-all duration-300",
                        i === 28 ? "bg-brand-500 shadow-[0_0_15px_rgba(79,102,241,0.5)]" : "bg-white/10 hover:bg-white/20"
                      )}
                    />
                    {i % 5 === 0 && <span className="text-[10px] text-text-muted">Mar {i + 1}</span>}
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-surface px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                       {Math.floor(height)} improvements
                    </div>
                 </div>
              )
           })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-card">
            <h3 className="font-bold mb-6">Tone Distribution</h3>
            <div className="space-y-6">
               {[
                  { label: "Professional", value: 65, color: "bg-brand-500" },
                  { label: "Friendly", value: 20, color: "bg-accent" },
                  { label: "Urgent", value: 10, color: "bg-yellow-500" },
                  { label: "Scientific", value: 5, color: "bg-success" }
               ].map((tone) => (
                  <div key={tone.label} className="space-y-2">
                     <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">{tone.label}</span>
                        <span className="font-bold text-text-primary">{tone.value}%</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${tone.value}%` }}
                          className={cn("h-full rounded-full", tone.color)}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="glass-card">
            <h3 className="font-bold mb-6">platform Insights</h3>
            <div className="space-y-6">
               {[
                  { label: "Gmail", count: "452", icon: <Mail size={16} /> },
                  { label: "LinkedIn", count: "321", icon: <Linkedin size={16} /> },
                  { label: "Other Sites", count: "511", icon: <Globe size={16} /> }
               ].map((platform) => (
                  <div key={platform.label} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                     <div className="flex items-center gap-3">
                        <div className="text-brand-400">{platform.icon}</div>
                        <span className="font-medium">{platform.label}</span>
                     </div>
                     <span className="font-bold">{platform.count}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

import { Mail, Linkedin, Globe } from "lucide-react";
