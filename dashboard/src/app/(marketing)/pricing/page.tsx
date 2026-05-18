"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Building2, HelpCircle } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

const PricingCard = ({ name, price, description, features, buttonText, popular, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`glass-card relative flex flex-col p-10 text-left border-slate-200/50 justify-between min-h-[500px] transition-all duration-500 group ${
      popular 
        ? "border-brand-500/20 bg-white ring-1 ring-brand-500/10 shadow-[0_15px_35px_rgba(79,102,241,0.06)]" 
        : "hover:border-slate-250 hover:bg-slate-50/30"
    }`}
  >
    {popular && (
      <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
    )}

    {popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-600 to-accent text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_4px_10px_rgba(79,102,241,0.2)] flex items-center gap-1">
        <Sparkles size={10} className="animate-spin-slow" /> Highly Recommended
      </div>
    )}

    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-900 mb-2">{name}</h3>
        <p className="text-slate-500 text-xs font-semibold leading-relaxed">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-black tracking-tight text-slate-900">{price}</span>
          {price !== "Free" && <span className="text-xs text-slate-400 font-black uppercase tracking-wider">/month</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-10 border-t border-slate-100 pt-6">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-lg bg-brand-50 border border-brand-100/50 flex items-center justify-center text-brand-600 shadow-sm">
              <Check size={11} strokeWidth={3.5} />
            </div>
            <span className="text-xs text-slate-650 font-semibold leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <ModernButton variant={popular ? "primary" : "secondary"} className="w-full">
      {buttonText}
    </ModernButton>
  </motion.div>
);

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background glowing spheres */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Page Heading */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-xs font-black uppercase tracking-wider">
            <Sparkles size={12} strokeWidth={2} /> Pricing Plans
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Simple, Honest <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-accent">
              Pricing
            </span>
          </h1>
          <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Choose the plan that fits your writing volume. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Symmetric 2-Column Pricing Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          <PricingCard 
            name="Free"
            price="Free"
            description="Perfect for testing the waters and experiencing Writing Buddy."
            features={[
              "30 AI improvements per day",
              "Access to all standard tones",
              "Gmail & LinkedIn extension popups",
              "Standard community support assistance"
            ]}
            buttonText="Get Started"
            delay={0.1}
          />
          <PricingCard 
            name="Pro"
            price="$7"
            popular={true}
            description="Everything needed for high-volume writing, editing, and custom phrasing."
            features={[
              "Unlimited daily AI improvements",
              "Access to all premium tones",
              "Works everywhere on the internet",
              "Priority developer email support",
              "Historical context sync across tabs"
            ]}
            buttonText="Upgrade to Pro"
            delay={0.2}
          />
        </div>

        {/* Enterprise Callout featuring native Collaboration Visual Art SVG */}
        <div className="mt-32 glass-card-premium border-brand-500/15 p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 max-w-4xl mx-auto text-left shadow-[0_15px_35px_rgba(79,102,241,0.03)]">
          <div className="absolute top-0 right-0 w-84 h-84 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-6 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-brand-50 border border-brand-100/50 rounded-lg text-brand-650 text-[10px] font-black uppercase tracking-widest">
              <Building2 size={12} /> Custom Enterprise Solutions
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              SSO Integration, Dedicated Models & Enterprise Security
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              We offer custom solutions for larger organizations with multi-seat licenses, private local models, SSO auth pipelines, advanced compliance layers, and dedicated support.
            </p>
            <ModernButton variant="secondary" className="!rounded-xl border-slate-200">
              Talk to our Enterprise Team
            </ModernButton>
          </div>

          {/* Premium Workspace Collaboration Native SVG illustration */}
          <div className="w-full max-w-[280px] aspect-[1.1/1] bg-white/60 border border-slate-200/50 rounded-2xl p-6 relative z-10 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px] opacity-40 rounded-2xl" />
            
            <svg className="w-full h-full max-h-[160px]" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central Server / Workspace Shield Node */}
              <rect x="48" y="32" width="24" height="30" rx="6" fill="url(#shieldGrad)" className="animate-pulse" />
              <circle cx="60" cy="47" r="4" fill="white" />
              <line x1="56" y1="53" x2="64" y2="53" stroke="white" strokeWidth="1.5" />

              {/* Orbiting Workspace Client Nodes */}
              <circle cx="20" cy="50" r="7" fill="white" stroke="#6366f1" strokeWidth="1.5" />
              <circle cx="20" cy="50" r="3" fill="#6366f1" />

              <circle cx="60" cy="15" r="7" fill="white" stroke="#a855f7" strokeWidth="1.5" />
              <circle cx="60" cy="15" r="3" fill="#a855f7" />

              <circle cx="100" cy="50" r="7" fill="white" stroke="#06b6d4" strokeWidth="1.5" />
              <circle cx="100" cy="50" r="3" fill="#06b6d4" />

              <circle cx="60" cy="80" r="7" fill="white" stroke="#ec4899" strokeWidth="1.5" />
              <circle cx="60" cy="80" r="3" fill="#ec4899" />

              {/* Orbital Connecting lines */}
              <line x1="27" y1="50" x2="48" y2="47" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="93" y1="50" x2="72" y2="47" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="60" y1="22" x2="60" y2="32" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="60" y1="62" x2="60" y2="73" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" />

              <defs>
                <linearGradient id="shieldGrad" x1="48" y1="32" x2="72" y2="62">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
