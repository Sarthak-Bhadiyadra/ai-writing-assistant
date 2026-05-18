"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { Check, Zap, CreditCard, Shield, Download, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernButton } from "@/components/ui/ModernButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  const supabase = createClient();

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to upgrade");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        }
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: any) {
      handleError(error, "Upgrade failed");
    } finally {
      setUpgrading(false);
    }
  };

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
        handleError(error, "Failed to load billing data");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) return (
     <div className="flex items-center justify-center h-[60vh]">
        <div className="relative w-10 h-10">
          <div className="w-10 h-10 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
          <div className="absolute inset-0 m-auto w-3 h-3 bg-brand-400 rounded-full animate-ping" />
        </div>
     </div>
  );

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing the waters.",
      features: ["30 improvements per day", "Standard Llama AI model", "Gmail & LinkedIn support", "Browser-level popups"],
      isCurrent: dbUser?.plan === "free"
    },
    {
      name: "Pro",
      price: billingPeriod === "monthly" ? "$7" : "$5.60",
      period: "/month",
      subtext: billingPeriod === "yearly" ? "Billed annually ($67/yr)" : "Billed monthly",
      description: "Everything for professionals who write regularly.",
      features: ["Unlimited improvements", "Advanced high-tier Llama models", "Everywhere on the web", "Priority Support", "Holographic interface themes"],
      isCurrent: dbUser?.plan === "pro",
      popular: true
    }
  ];

  return (
    <div className="space-y-10">
      <header className="text-left">
        <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">Plans & Billing</h1>
        <p className="text-sm font-semibold text-slate-500">Manage your subscription, pricing intervals, and credit cards.</p>
      </header>

      {/* Current Plan Overview Banner */}
      <div className="glass-card-premium border-brand-500/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(79,102,241,0.04)] text-left">
        <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Zap size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black mb-1 text-slate-900">
              Active Tier: <span className="text-brand-600 capitalize">{dbUser?.plan || "Free"}</span>
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {dbUser?.plan === "free" ? "Limited to 30 improvements/day" : "Unlimited access active"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
           <ModernButton variant="secondary" size="sm" className="flex items-center gap-2 border-slate-200">
             <Download size={14} /> Invoices
           </ModernButton>
           <ModernButton size="sm">Manage Plan</ModernButton>
        </div>
      </div>

      {/* Pricing Switcher Toggle */}
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <div className="p-1 bg-slate-100/80 border border-slate-200/50 rounded-xl flex items-center relative shadow-inner">
          <button 
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all duration-300 relative z-10",
              billingPeriod === "monthly" ? "text-slate-800" : "text-slate-400 hover:text-slate-650"
            )}
          >
            {billingPeriod === "monthly" && (
              <motion.div 
                layoutId="period-switch" 
                className="absolute inset-0 bg-white border border-slate-200/50 rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            Monthly
          </button>
          <button 
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all duration-300 relative z-10 flex items-center gap-1.5",
              billingPeriod === "yearly" ? "text-slate-800" : "text-slate-400 hover:text-slate-650"
            )}
          >
            {billingPeriod === "yearly" && (
              <motion.div 
                layoutId="period-switch" 
                className="absolute inset-0 bg-white border border-slate-200/50 rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            Yearly
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-brand-600 tracking-widest">
           <span>⚡ Save 20% with annual plans</span>
        </div>
      </div>

      {/* Plans Symmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={cn(
              "glass-card p-8 flex flex-col items-start gap-6 transition-all duration-500 relative overflow-hidden group border-slate-200/50",
              plan.popular ? "border-brand-500/20 bg-white ring-1 ring-brand-500/10 shadow-[0_15px_35px_rgba(79,102,241,0.06)]" : "hover:border-slate-250 hover:bg-slate-50/30"
            )}
          >
            {plan.popular && (
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
            )}
            
            {plan.popular && (
              <span className="px-3 py-1 bg-gradient-to-r from-brand-600 to-accent text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_4px_10px_rgba(79,102,241,0.2)]">
                Highly Recommended
              </span>
            )}
            <div>
              <h4 className="text-2xl font-black text-slate-900 mb-1">{plan.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{plan.description}</p>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1.5">
                 <span className="text-4xl font-black tracking-tight text-slate-900">{plan.price}</span>
                 {plan.period && <span className="text-xs text-slate-400 font-black uppercase tracking-wider">{plan.period}</span>}
              </div>
              {plan.subtext && <p className="text-[9px] text-brand-600 font-black mt-1 font-mono uppercase tracking-wider">{plan.subtext}</p>}
            </div>
            
            <ul className="flex-1 space-y-4 w-full pt-4 border-t border-slate-100">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0 mt-0.5 border border-success/10 shadow-sm">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span className="text-xs text-slate-600 font-semibold">{f}</span>
                </li>
              ))}
            </ul>

            <ModernButton 
              className="w-full relative z-10" 
              variant={plan.popular ? "primary" : "secondary"}
              disabled={plan.isCurrent || upgrading}
              onClick={plan.name === "Pro" ? handleUpgrade : undefined}
            >
              {upgrading ? "Contacting Stripe..." : (plan.isCurrent ? "Current Plan" : "Upgrade Workspace")}
            </ModernButton>
          </div>
        ))}
      </div>

      {/* Holographic Credit Card Widget Section */}
      <div className="glass-card border-slate-200/50 text-left">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <CreditCard className="text-brand-600 animate-pulse" />
               <h3 className="font-extrabold text-lg tracking-tight text-slate-900">Saved Payment Methods</h3>
            </div>
            <ModernButton variant="secondary" size="sm" className="!rounded-xl text-[10px] border-slate-200 uppercase font-bold tracking-widest">+ Add Card</ModernButton>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Frosted mesh Credit Card */}
            <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-brand-600 via-indigo-600 to-accent/90 border border-brand-500/20 shadow-[0_15px_35px_rgba(79,102,241,0.15)] flex flex-col justify-between aspect-[1.58/1] min-h-[170px] group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all pointer-events-none" />
              
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50">Payment Card</p>
                  <p className="text-xs font-extrabold text-white mt-0.5">Writing Buddy Pro</p>
                </div>
                <div className="w-10 h-7 rounded bg-white/10 border border-white/20 flex items-center justify-center font-black italic text-cyan-200 text-xs shadow-inner">
                  VISA
                </div>
              </div>
              
              <div>
                <p className="text-sm font-mono font-bold text-white tracking-widest">•••• •••• •••• 4242</p>
                <div className="flex items-center justify-between mt-3 text-left">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Card Holder</p>
                    <p className="text-[10px] font-bold text-white mt-0.5">Sarthak Bhadiyadra</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Expires</p>
                    <p className="text-[10px] font-bold text-white mt-0.5">12/28</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Card status metadata */}
            <div className="lg:col-span-2 flex flex-col justify-between p-1">
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/50 rounded-2xl shadow-sm text-left">
                     <div className="flex items-center gap-3">
                        <Lock size={15} className="text-brand-600" />
                        <div>
                           <p className="text-xs font-extrabold text-slate-800">Visa ending in 4242</p>
                           <p className="text-[10px] font-semibold text-slate-400">Primary payment method for invoices.</p>
                        </div>
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-wider bg-success/10 border border-success/15 text-success px-2 py-0.5 rounded-md">Default</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200/50 p-3.5 rounded-2xl font-semibold text-left">
                     <Shield size={14} className="text-success flex-shrink-0" />
                     <span>All payment processing is handled securely via Stripe. Writing Buddy does not store your credential keys.</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

