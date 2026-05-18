"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { User, Lock, Settings, ShieldAlert, Trash2, Camera, Mail, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernButton } from "@/components/ui/ModernButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "security" | "danger";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
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
      } catch (error) {
        handleError(error, "Failed to load settings data");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from("users")
        .update({
          first_name: dbUser.first_name,
          last_name: dbUser.last_name
        })
        .eq("id", dbUser.id);
      
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      handleError(error, "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
     <div className="flex items-center justify-center h-[60vh]">
        <div className="relative w-10 h-10">
          <div className="w-10 h-10 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
          <div className="absolute inset-0 m-auto w-3 h-3 bg-brand-400 rounded-full animate-ping" />
        </div>
     </div>
  );

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "security", label: "Security & Login", icon: Lock },
    { id: "danger", label: "Danger Zone", icon: ShieldAlert },
  ] as const;

  return (
    <div className="space-y-10">
      <header className="text-left">
        <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">Settings</h1>
        <p className="text-sm font-semibold text-slate-500">Configure your profile details, auth keys, and workspace parameters.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
         {/* Frosted side tabs navigation panel */}
         <div className="lg:col-span-1 flex flex-col gap-1.5 p-2 bg-white/70 border border-slate-200/50 rounded-2xl backdrop-blur-2xl shadow-sm text-left">
           {tabs.map((t) => {
             const Icon = t.icon;
             const isActive = activeTab === t.id;
             return (
               <button
                 key={t.id}
                 onClick={() => setActiveTab(t.id)}
                 className={cn(
                   "relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-left transition-colors duration-300",
                   isActive 
                     ? "text-brand-600" 
                     : "text-slate-500 hover:text-slate-900 hover:bg-slate-55/50"
                 )}
               >
                 {isActive && (
                   <motion.div 
                     layoutId="active-settings-tab" 
                     className="absolute inset-0 bg-brand-5 border border-brand-100/55 rounded-xl shadow-[inset_0_1px_0_white]"
                     transition={{ type: "spring", stiffness: 350, damping: 28 }}
                   />
                 )}
                 <Icon size={16} className={cn("relative z-10", isActive ? "text-brand-600 animate-pulse" : "text-slate-400")} />
                 <span className="relative z-10 font-black">{t.label}</span>
               </button>
             );
           })}
         </div>

         {/* Settings Tabs Content Card */}
         <div className="lg:col-span-3 glass-card border-slate-200/50 min-h-[400px] flex flex-col justify-between shadow-[0_15px_30px_rgba(15,23,42,0.02)]">
           <AnimatePresence mode="wait">
             {activeTab === "profile" && (
                <motion.form 
                  key="profile"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleSaveProfile}
                  className="space-y-8 flex-1 flex flex-col justify-between text-left"
                >
                  <div className="space-y-6">
                     <h3 className="font-extrabold text-lg tracking-tight mb-6 text-slate-900">Profile Settings</h3>
                     
                     {/* Glowing Avatar Photo Uploader */}
                     <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                       <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/20 group cursor-pointer">
                         <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative border-2 border-slate-100">
                           <User size={30} className="text-slate-400" />
                           <div className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera size={18} className="text-white" />
                           </div>
                         </div>
                       </div>
                       <div>
                          <p className="text-xs font-extrabold text-slate-800">Profile Picture</p>
                          <p className="text-[10px] text-slate-450 mt-1 leading-relaxed font-semibold">PNG or JPEG up to 2MB. Drag and drop or browse local files.</p>
                       </div>
                     </div>

                     {/* Profile Form fields */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-left">
                           <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                           <input 
                             value={dbUser?.first_name || ""} 
                             onChange={(e) => setDbUser({ ...dbUser, first_name: e.target.value })}
                             placeholder="First Name" 
                             className="field"
                           />
                        </div>
                        <div className="space-y-2 text-left">
                           <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                           <input 
                             value={dbUser?.last_name || ""} 
                             onChange={(e) => setDbUser({ ...dbUser, last_name: e.target.value })}
                             placeholder="Last Name" 
                             className="field"
                           />
                        </div>
                     </div>

                     <div className="space-y-2 text-left max-w-md">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                        <div className="relative">
                           <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             disabled 
                             value={dbUser?.email || ""} 
                             className="field pl-12 opacity-65 cursor-not-allowed bg-slate-50 border-slate-200/50 text-slate-500" 
                           />
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                     <ModernButton type="submit" disabled={saving}>
                       {saving ? "Saving Changes..." : "Save Profile"}
                     </ModernButton>
                  </div>
                </motion.form>
             )}

             {activeTab === "security" && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6 text-left flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                     <h3 className="font-extrabold text-lg tracking-tight mb-4 text-slate-900">Security Preferences</h3>
                     <p className="text-xs text-slate-500 font-semibold">Change your workspace access credentials and API tokens.</p>
                     
                     <div className="space-y-4 max-w-md pt-4">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current Password</label>
                           <input type="password" placeholder="••••••••" className="field" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">New Password</label>
                           <input type="password" placeholder="••••••••" className="field" />
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                     <ModernButton className="flex items-center gap-2">
                       <KeyRound size={14} /> Update Password
                     </ModernButton>
                  </div>
                </motion.div>
             )}

             {activeTab === "danger" && (
                <motion.div 
                  key="danger"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6 text-left flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                     <h3 className="font-extrabold text-lg tracking-tight mb-2 text-danger">Danger Zone</h3>
                     <p className="text-xs text-slate-500 font-semibold">High-risk workspace termination procedures.</p>
                     
                     {/* Solid red glass warning container */}
                     <div className="p-5 rounded-2xl bg-danger/[0.03] border border-danger/15 flex gap-4 items-start shadow-[inset_0_1px_0_white] text-left">
                        <Trash2 className="text-danger flex-shrink-0 mt-0.5" size={18} />
                        <div>
                           <p className="text-xs font-extrabold text-danger">Delete Workspace & Account</p>
                           <p className="text-[11px] text-slate-600 leading-relaxed mt-1 font-semibold">
                              This will permanently delete your account, saved document history, and all extension activity logs. 
                              This action is immediate and cannot be recovered under any circumstances.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                     <ModernButton 
                       className="bg-danger hover:bg-danger/90 border border-transparent shadow-[0_4px_12px_rgba(239,68,68,0.2)] font-black uppercase tracking-wider"
                     >
                       Delete Account Permanent
                     </ModernButton>
                  </div>
                </motion.div>
             )}
           </AnimatePresence>
         </div>
         
      </div>
    </div>
  );
}
