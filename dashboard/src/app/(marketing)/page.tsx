"use client";

import { motion } from "framer-motion";
import { ModernButton } from "@/components/ui/ModernButton";
import { 
  PenTool, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  Mail,
  Linkedin
} from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card flex flex-col items-start gap-4"
  >
    <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description }: any) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full glass border border-brand-500/20 flex items-center justify-center font-bold text-brand-400">
      {number}
    </div>
    <div>
      <h4 className="text-lg font-bold mb-1">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-20">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-xs font-semibold mb-8"
          >
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
            <span className="text-text-secondary uppercase tracking-wider">AI Powered Writing Extension</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            AI Writing Assistant <br />
            <span className="text-gradient">for the Entire Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Improve grammar, rewrite sentences, and enhance writing instantly using AI. 
            Works where you write: Gmail, LinkedIn, and every web app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ModernButton size="lg" className="w-full sm:w-auto">
              Install Chrome Extension
            </ModernButton>
            <Link href="/features">
              <ModernButton variant="secondary" size="lg" className="w-full sm:w-auto">
                View Features
              </ModernButton>
            </Link>
          </motion.div>

          {/* Hero Illustration Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 relative px-4"
          >
            <div className="relative mx-auto max-w-4xl glass rounded-t-3xl border-b-0 p-4 pb-0 shadow-2xl">
              <div className="bg-surface rounded-t-2xl border border-white/5 overflow-hidden">
                 <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/5">
                   <div className="w-3 h-3 rounded-full bg-red-500/30" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                   <div className="w-3 h-3 rounded-full bg-green-500/30" />
                 </div>
                 <div className="p-8 min-h-[400px] flex items-center justify-center text-left">
                    <div className="max-w-md w-full glass-card p-6 border-brand-500/30 animate-float">
                       <p className="text-text-secondary mb-4 italic">"I helps you write better..."</p>
                       <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-brand-500 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                            <Sparkles size={12} /> Rewrite
                          </span>
                          <span className="text-xs text-text-muted">Suggesting 3 improvements</span>
                       </div>
                       <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl">
                          <p className="text-brand-100 font-medium">"I can help you write more effectively..."</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our AI-powered tool integrate seamlessly into your workflow, making every word you write professional and impactful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Sparkles}
            title="Improve writing instantly"
            description="Our advanced AI analyzes your text and suggests better alternatives in real-time."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap}
            title="Rewrite in different tones"
            description="From professional to friendly, choose the perfect tone for any situation."
            delay={0.2}
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="Fix grammar automatically"
            description="Never worry about typos or grammar mistakes again. We catch them all."
            delay={0.3}
          />
          <FeatureCard 
            icon={Mail}
            title="Works on Gmail"
            description="Draft emails faster and more professionally directly inside the Gmail interface."
            delay={0.4}
          />
          <FeatureCard 
            icon={Linkedin}
            title="Optimized for LinkedIn"
            description="Create engaging posts and messages that land the job or the client."
            delay={0.5}
          />
          <FeatureCard 
            icon={Globe}
            title="Everywhere on the Web"
            description="If there's a text field, we're there to help. No tab switching needed."
            delay={0.6}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 relative">
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
         
         <div className="max-w-7xl mx-auto glass-card p-12 md:p-20 overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl font-bold mb-8">How It Works</h2>
                  <div className="space-y-12">
                     <Step 
                        number="01"
                        title="Select text anywhere on the web"
                        description="Highlight any text you've written or want to improve on any website."
                     />
                     <Step 
                        number="02"
                        title="Click the AI button"
                        description="A small AI icon appears near your selection. Click it to see options."
                     />
                     <Step 
                        number="03"
                        title="Get improved writing instantly"
                        description="Choose a suggestion and watch your text transform into perfection."
                     />
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-square glass rounded-3xl p-8 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     <div className="relative h-full border border-white/10 rounded-2xl bg-surface p-6 overflow-hidden">
                        <div className="h-4 w-1/2 bg-white/5 rounded mb-4" />
                        <div className="h-4 w-3/4 bg-white/5 rounded mb-8" />
                        
                        <div className="p-4 bg-brand-500/10 border border-brand-500/30 rounded-xl relative">
                           <div className="flex items-center gap-2 mb-2">
                              <PenTool size={14} className="text-brand-400" />
                              <div className="h-2 w-16 bg-brand-400/30 rounded" />
                           </div>
                           <div className="h-3 w-full bg-brand-400/20 rounded mb-2" />
                           <div className="h-3 w-4/5 bg-brand-400/20 rounded" />
                           
                           <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -right-4 -bottom-4 w-16 h-16 bg-brand-500 rounded-2xl shadow-xl flex items-center justify-center text-white"
                           >
                              <Sparkles size={32} />
                           </motion.div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Extension Promotion */}
      <section className="px-6">
         <div className="max-w-4xl mx-auto text-center px-10 py-20 rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 relative overflow-hidden shadow-2xl shadow-brand-500/20">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
               Install our Chrome Extension
            </h2>
            <p className="text-brand-100 text-lg mb-10 relative z-10 opacity-90">
               Join 10,000+ professionals writing better today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
               <ModernButton variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-brand-50 border-none px-10">
                  Add to Chrome — Free
               </ModernButton>
               {/* <div className="flex items-center gap-2 text-white/80">
                  <div className="flex -space-x-2">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-600 bg-brand-400" />
                     ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
               </div> */}
            </div>
         </div>
      </section>
    </div>
  );
}
