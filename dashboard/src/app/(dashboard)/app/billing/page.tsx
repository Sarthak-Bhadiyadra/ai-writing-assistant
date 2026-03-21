"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { Check, Zap, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { ModernButton } from "@/components/ui/ModernButton";

export default function BillingPage() {
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
        handleError(error, "Failed to load billing data");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) return (
     <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
     </div>
  );

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing the waters.",
      features: ["30 improvements per day", "Standard AI model", "Gmail & LinkedIn support"],
      isCurrent: dbUser?.plan === "free"
    },
    {
      name: "Pro",
      price: "$7",
      period: "/month",
      description: "Everything for professionals.",
      features: ["Unlimited improvements", "Advanced AI models", "Everywhere on the web", "Priority Support"],
      isCurrent: dbUser?.plan === "pro",
      popular: true
    },
    {
      name: "Team",
      price: "$25",
      period: "/month",
      description: "For teams and agencies.",
      features: ["Up to 5 users included", "Shared analytics", "Centralized billing", "Dedicated manager"],
      isCurrent: dbUser?.plan === "team"
    }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Plans & Billing</h1>
        <p className="text-text-secondary">Manage your subscription and payment methods.</p>
      </header>

      {/* Current Plan Banner */}
      <div className="glass-card bg-brand-500/10 border-brand-500/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
            <Zap size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Current Plan: <span className="text-brand-400 capitalize">{dbUser?.plan || "Free"}</span></h3>
            <p className="text-sm text-text-secondary">Your next billing date is April 16, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <ModernButton variant="secondary" size="sm">Download Invoices</ModernButton>
           <ModernButton size="sm">Manage Subscription</ModernButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={cn(
              "glass-card p-8 flex flex-col items-start gap-6 border-white/5",
              plan.popular ? "border-brand-500/30 bg-brand-500/5 ring-1 ring-brand-500/10" : ""
            )}
          >
            {plan.popular && (
              <span className="px-3 py-1 bg-brand-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Most Popular</span>
            )}
            <div>
              <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
              <p className="text-xs text-text-muted leading-relaxed">{plan.description}</p>
            </div>
            <div className="flex items-baseline gap-1">
               <span className="text-3xl font-black">{plan.price}</span>
               {plan.period && <span className="text-xs text-text-muted font-bold">{plan.period}</span>}
            </div>
            
            <ul className="flex-1 space-y-4">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>

            <ModernButton 
              className="w-full" 
              variant={plan.popular ? "primary" : "secondary"}
              disabled={plan.isCurrent}
            >
              {plan.isCurrent ? "Current Plan" : "Upgrade"}
            </ModernButton>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="glass-card">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <CreditCard className="text-brand-400" />
               <h3 className="font-bold">Payment Methods</h3>
            </div>
            <ModernButton variant="ghost" size="sm">+ Add New</ModernButton>
         </div>
         
         <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-surface-overlay border border-border rounded flex items-center justify-center font-bold italic text-blue-500">VISA</div>
               <div>
                  <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                  <p className="text-xs text-text-muted">Expires 12/28</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] uppercase font-bold text-text-muted px-2 py-0.5 border border-white/5 rounded">Default</span>
            </div>
         </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
