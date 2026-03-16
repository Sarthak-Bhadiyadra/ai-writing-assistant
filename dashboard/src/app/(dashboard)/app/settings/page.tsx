"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { User, Shield, Bell, Key, Trash2, Camera } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) return (
     <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
     </div>
  );

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your profile, security, and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Navigation tabs */}
         <div className="lg:col-span-1 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-xl font-bold text-sm text-left">
               <User size={18} /> Profile
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-white/5 hover:text-text-primary rounded-xl font-medium text-sm text-left transition-all">
               <Shield size={18} /> Security
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-white/5 hover:text-text-primary rounded-xl font-medium text-sm text-left transition-all">
               <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-white/5 hover:text-text-primary rounded-xl font-medium text-sm text-left transition-all">
               <Key size={18} /> API Keys
            </button>
         </div>

         {/* Content area */}
         <div className="lg:col-span-3 space-y-10">
            {/* Profile Section */}
            <section className="glass-card">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold">Public Profile</h3>
                  <ModernButton size="sm">Save Changes</ModernButton>
               </div>
               
               <div className="flex items-center gap-8 mb-10 pb-10 border-b border-white/5">
                  <div className="relative group">
                     <div className="w-24 h-24 rounded-3xl bg-surface-overlay border-2 border-border flex items-center justify-center text-text-muted group-hover:border-brand-500 transition-all overflow-hidden">
                        <User size={40} />
                     </div>
                     <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-500 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-surface group-hover:scale-110 transition-all">
                        <Camera size={14} />
                     </button>
                  </div>
                  <div>
                     <h4 className="font-bold mb-1">Profile Photo</h4>
                     <p className="text-xs text-text-muted max-w-[240px]">Recommend image size 256x256px. PNG, JPG or GIF allowed.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                     <input type="text" placeholder="Your name" className="field" defaultValue={user?.email?.split('@')[0]} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                     <input type="email" placeholder="email@example.com" className="field bg-white/[0.02] cursor-not-allowed" disabled value={user?.email || ""} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Bio</label>
                     <textarea rows={3} placeholder="Tell us a little about yourself" className="field resize-none" />
                  </div>
               </div>
            </section>

            {/* Danger Zone */}
            <section className="glass-card border-danger/30 bg-danger/5">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-danger/10 rounded-xl flex items-center justify-center text-danger">
                        <Trash2 size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-danger">Danger Zone</h3>
                        <p className="text-sm text-text-secondary">Permanently delete your account and all associated data.</p>
                    </div>
                </div>
                <div className="p-6 bg-surface-raised/50 rounded-xl border border-danger/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                        <p className="font-bold text-sm text-text-primary">Delete THIS Account</p>
                        <p className="text-xs text-text-muted">This action is irreversible. All your data will be cleared.</p>
                    </div>
                    <ModernButton className="bg-danger hover:bg-danger/80 shadow-danger/20">Delete Account</ModernButton>
                </div>
            </section>
         </div>
      </div>
    </div>
  );
}
