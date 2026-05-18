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
    className="glass-card glass-card-hover flex flex-col items-start gap-5 shadow-[0_15px_35px_rgba(15,23,42,0.03)] border-slate-200/40"
  >
    <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-600 shadow-inner">
      <Icon size={22} />
    </div>
    <h3 className="text-xl font-black text-slate-900">{title}</h3>
    <p className="text-slate-600 text-xs leading-relaxed font-semibold">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description }: any) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center font-black text-brand-600 shadow-sm">
      {number}
    </div>
    <div className="text-left">
      <h4 className="text-lg font-black text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-600 text-xs leading-relaxed font-semibold">{description}</p>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 pb-32 overflow-hidden bg-dot-grid">
      {/* Hero Section */}
      <section className="relative px-6 pt-20">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/5 border border-brand-500/15 text-[10px] font-black uppercase tracking-widest text-brand-600 mb-8"
          >
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
            <span>AI Powered Writing Extension</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-slate-950 mb-8 leading-[1.1]"
          >
            Writing Buddy <br />
            <span className="text-gradient">for the Entire Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold"
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
            <ModernButton size="lg" className="w-full sm:w-auto text-xs uppercase tracking-wider font-extrabold !rounded-2xl">
              Install Chrome Extension
            </ModernButton>
            <Link href="/features">
              <ModernButton variant="secondary" size="lg" className="w-full sm:w-auto text-xs uppercase tracking-wider font-extrabold !rounded-2xl border-slate-200">
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
            <div className="relative mx-auto max-w-4xl bg-white/40 border border-slate-200/50 rounded-t-3xl border-b-0 p-4 pb-0 shadow-[0_30px_70px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <div className="bg-slate-50/50 rounded-t-2xl border border-slate-200/50 overflow-hidden">
                 <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200/30 bg-slate-100/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                 </div>
                 <div className="p-8 min-h-[400px] flex items-center justify-center text-left relative overflow-hidden">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" />
                    <div className="max-w-md w-full glass-card p-6 border-slate-200/60 shadow-[0_15px_30px_rgba(15,23,42,0.04)] animate-float relative z-10">
                       <p className="text-slate-700 text-sm font-semibold mb-4 italic">"I helps you write better..."</p>
                       <div className="flex items-center gap-2.5 mb-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-brand-600 to-accent rounded-lg text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1 shadow-sm">
                            <Sparkles size={10} /> Rewrite
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">Suggesting 3 improvements</span>
                       </div>
                       <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-xl shadow-inner">
                          <p className="text-brand-700 text-xs font-bold">"I can help you write more effectively..."</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-6xl mx-auto w-full relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Powerful Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm font-semibold">
            Our AI-powered tool integrates seamlessly into your workflow, making every word you write professional and impactful.
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
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
         
         <div className="max-w-6xl mx-auto glass-card border-slate-200/50 p-12 md:p-20 overflow-hidden relative shadow-[0_20px_50px_rgba(15,23,42,0.03)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl font-black text-slate-900 mb-8 text-left">How It Works</h2>
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
                  <div className="aspect-square bg-slate-50/50 border border-slate-200/50 rounded-3xl p-8 relative overflow-hidden group shadow-inner">
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     <div className="relative h-full border border-slate-200/50 rounded-2xl bg-white p-6 overflow-hidden shadow-sm flex flex-col justify-center">
                        <div className="h-4 w-1/2 bg-slate-100 rounded mb-4" />
                        <div className="h-4 w-3/4 bg-slate-100 rounded mb-8" />
                        
                        <div className="p-4 bg-brand-500/5 border border-brand-500/15 rounded-xl relative">
                           <div className="flex items-center gap-2 mb-2">
                              <PenTool size={12} className="text-brand-500" />
                              <div className="h-2 w-16 bg-brand-400/20 rounded" />
                           </div>
                           <div className="h-3 w-full bg-brand-400/10 rounded mb-2" />
                           <div className="h-3 w-4/5 bg-brand-400/10 rounded" />
                           
                           <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -right-4 -bottom-4 w-14 h-14 bg-gradient-to-tr from-brand-600 to-accent rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center text-white"
                           >
                              <Sparkles size={24} />
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
         <div className="max-w-4xl mx-auto text-center px-10 py-20 rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 relative overflow-hidden shadow-xl shadow-brand-500/15">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
               Install our Chrome Extension
            </h2>
            <p className="text-brand-100 text-base mb-10 relative z-10 opacity-90 font-semibold">
               Join 10,000+ professionals writing better today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
               <ModernButton variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-slate-50 border-none px-10 text-xs font-black uppercase tracking-widest !rounded-2xl">
                  Add to Chrome — Free
               </ModernButton>
            </div>
         </div>
      </section>
    </div>
  );
}
