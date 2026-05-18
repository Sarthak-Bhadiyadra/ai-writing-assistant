"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

const PricingCard = ({ name, price, description, features, buttonText, popular, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`glass-card relative flex flex-col p-10 ${popular ? 'border-brand-500/50 ring-1 ring-brand-500/20' : ''}`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
        Most Popular
      </div>
    )}

    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-text-muted text-sm">{description}</p>
    </div>

    <div className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-extrabold">{price}</span>
        {price !== "Free" && <span className="text-text-muted font-medium">/month</span>}
      </div>
    </div>

    <ul className="flex-1 space-y-4 mb-10">
      {features.map((feature: string) => (
        <li key={feature} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm text-text-secondary">{feature}</span>
        </li>
      ))}
    </ul>

    <ModernButton variant={popular ? "primary" : "secondary"} className="w-full">
      {buttonText}
    </ModernButton>
  </motion.div>
);

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Honest <span className="text-gradient">Pricing</span></h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Choose the plan that fits your writing volume. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard 
          name="Free"
          price="Free"
          description="Perfect for testing the waters."
          features={[
            "30 improvements per day",
            "Access to Basic tones",
            "Gmail & LinkedIn support",
            "Community support"
          ]}
          buttonText="Get Started"
          delay={0.1}
        />
        <PricingCard 
          name="Pro"
          price="$7"
          popular={true}
          description="Everything for professional writers."
          features={[
            "Unlimited improvements",
            "Access to all Premium tones",
            "Everywhere on the web",
            "Priority email support",
            "History sync across devices"
          ]}
          buttonText="Upgrade to Pro"
          delay={0.2}
        />
      </div>

      <div className="mt-32 glass-card p-12 text-center max-w-4xl mx-auto">
         <h3 className="text-2xl font-bold mb-4">Enterprise Needs?</h3>
         <p className="text-text-secondary mb-8">We offer custom solutions for larger organizations with SSO, advanced security, and dedicated support.</p>
         <ModernButton variant="secondary">Talk to our Enterprise Team</ModernButton>
      </div>
    </div>
  );
}
