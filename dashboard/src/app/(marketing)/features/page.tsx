"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, Mail, Linkedin, Globe, MessageSquare, History, Wand2, Check } from "lucide-react";

const FeatureDetail = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-8 flex flex-col gap-6 text-left border-slate-200/50 hover:bg-white/80 transition-all duration-300 relative overflow-hidden group hover:shadow-[0_15px_30px_rgba(79,102,241,0.03)]"
  >
    <div className="w-14 h-14 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 transition duration-300">
      <Icon size={26} />
    </div>
    <div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2 relative z-10">{title}</h3>
      <p className="text-slate-600 text-xs leading-relaxed font-semibold relative z-10">{description}</p>
    </div>
    {/* Subtle absolute corner spark */}
    <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-brand-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
  </motion.div>
);

export default function FeaturesPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Page Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-xs font-black uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" /> Core Capabilities
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Powerful Writing <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-accent">
              Capabilities
            </span>
          </h1>
          <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Discover all the ways Writing Buddy can help you communicate more effectively, polished, and confident across the web.
          </p>
        </div>

        {/* Stunning Interactive Writing Buddy Demo Mockup */}
        <section className="max-w-4xl mx-auto mb-28">
          <div className="relative group">
            {/* Ambient drop shadow backdrop */}
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 via-indigo-600 to-accent rounded-3xl opacity-10 blur-xl group-hover:opacity-15 transition duration-500" />
            
            <div className="glass-card-premium border-brand-500/15 p-6 md:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.03)] text-left">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
              
              {/* Fake Window Header Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-400 ml-2 font-mono">browser-textarea-helper.js</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[9px] font-mono text-slate-400 uppercase font-black tracking-widest">
                  Live Preview
                </span>
              </div>

              {/* Two-Pane original vs AI transformation mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                
                {/* Column 1: Original text box */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">User Textarea Input</p>
                  <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200/55 min-h-[160px] flex flex-col justify-between shadow-inner">
                    <p className="text-xs text-slate-500 leading-relaxed font-mono font-medium">
                      "hey guys i just wanted to tell you about some new features we just launched on the dashboard and hope you like them..."
                    </p>
                    
                    {/* Simulated Floating Tooltip Trigger */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/30">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/50 rounded-lg shadow-sm">
                        <Zap size={11} className="text-brand-600 animate-pulse" />
                        <span className="text-[9px] font-black text-slate-800 uppercase tracking-wide">Tone: Professional</span>
                      </div>
                      <span className="text-[8px] font-bold text-slate-400">127 chars</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Polished Output card */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-brand-600">Writing Buddy AI Suggestion</p>
                  <div className="p-5 rounded-2xl bg-gradient-to-tr from-brand-600/5 to-indigo-600/5 border border-brand-500/20 min-h-[160px] flex flex-col justify-between shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                      "I am pleased to present the latest system enhancements launched on our writing suite dashboard. We look forward to your valuable feedback."
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-500/10">
                      <div className="flex items-center gap-1">
                        <Check size={11} className="text-success" strokeWidth={3.5} />
                        <span className="text-[9px] font-black text-brand-650 uppercase tracking-widest">98% Clarity</span>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-tr from-brand-600 to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow shadow-brand-500/20 hover:shadow-lg transition">
                        Insert
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureDetail 
            icon={Sparkles}
            title="Instant Refinement"
            description="Fix grammar, punctuation, and spelling errors with a single click. Our AI understands context better than traditional spellcheckers."
            delay={0.1}
          />
          <FeatureDetail 
            icon={Zap}
            title="Tone Transformation"
            description="Switch between Professional, Friendly, Urgent, or Academic tones instantly. Make sure your message lands exactly as intended."
            delay={0.15}
          />
          <FeatureDetail 
            icon={Mail}
            title="Email Optimization"
            description="Draft persuasive cold emails, concise replies, and professional follow-ups directly in Gmail and Outlook."
            delay={0.2}
          />
          <FeatureDetail 
            icon={Linkedin}
            title="Social Content Master"
            description="Create engaging LinkedIn posts and professional bio descriptions that capture attention and build your personal brand."
            delay={0.25}
          />
          <FeatureDetail 
            icon={MessageSquare}
            title="Sentence Rephrasing"
            description="Stuck on a sentence? Get 5 different ways to say the same thing, optimized for clarity and impact."
            delay={0.3}
          />
          <FeatureDetail 
            icon={ShieldCheck}
            title="Privacy Focused"
            description="Your writing is yours. We use enterprise-grade encryption and never use your private data to train our public models."
            delay={0.35}
          />
          <FeatureDetail 
            icon={Globe}
            title="Browser-wide Support"
            description="From internal dashboards to public forums, our extension works on every textarea and input field on the web."
            delay={0.4}
          />
          <FeatureDetail 
            icon={History}
            title="Saved Improvements"
            description="Keep track of your best rewrites and reuse them later. Build your own library of perfect responses."
            delay={0.45}
          />
          <FeatureDetail 
            icon={Wand2}
            title="AI Continuations"
            description="Can't find the words? Let our AI suggest the next sentence based on what you've already written."
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}

