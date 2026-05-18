"use client";

import { motion } from "framer-motion";
import { Target, Users, Heart, Sparkles } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Premium Background Ambient Glowspots */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-20 w-96 h-96 bg-brand-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Narrative Mission Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-xs font-black uppercase tracking-wider">
                <Sparkles size={12} className="animate-spin-slow" /> Our Mission
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                Empowering every <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-accent">
                  written word
                </span>
              </h1>
              <p className="text-lg text-slate-650 font-semibold leading-relaxed">
                Writing Buddy was born from a simple observation: professional writing is hard, and most of it happens in browser tabs where existing tools don't reach.
              </p>
              <p className="text-lg text-slate-650 font-semibold leading-relaxed">
                Our mission is to empower professionals to write better and faster with AI, making communication seamless regardless of the platform. We believe everyone deserves a world-class editor by their side.
              </p>
            </div>

            {/* Premium Animated Vector SVG Mission Illustration */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-brand-500 to-accent rounded-3xl opacity-[0.03] blur-lg group-hover:opacity-[0.06] transition duration-500" />
              
              <div className="aspect-[1.3/1] min-h-[300px] bg-white/60 border border-slate-200/50 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden shadow-sm flex items-center justify-center">
                {/* Visual Backdrop Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                <svg className="w-full h-full max-w-[380px] max-h-[280px] relative z-10" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Decorative Glowing Rings */}
                  <motion.circle 
                    cx="100" cy="75" r="45" 
                    stroke="url(#indigoGrad)" strokeWidth="1.5" strokeDasharray="3 3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle 
                    cx="100" cy="75" r="55" 
                    stroke="url(#accentGrad)" strokeWidth="1" strokeDasharray="4 4"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Connected Dots Network */}
                  <circle cx="45" cy="50" r="3" fill="#818cf8" className="animate-pulse" />
                  <circle cx="155" cy="100" r="4.5" fill="#f43f5e" />
                  <circle cx="140" cy="40" r="3" fill="#06b6d4" />
                  <line x1="45" y1="50" x2="60" y2="75" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="140" y1="40" x2="115" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="155" y1="100" x2="130" y2="85" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Simulated Writing Lines */}
                  <rect x="65" y="45" width="70" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="50" y="58" width="100" height="4" rx="2" fill="#94a3b8" />
                  <rect x="55" y="71" width="90" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="70" y="84" width="60" height="4" rx="2" fill="#94a3b8" />

                  {/* Floating AI Sparks and Glowing Pen Graphic */}
                  <g>
                    {/* Glowing highlight */}
                    <circle cx="100" cy="75" r="16" fill="#6366f1" fillOpacity="0.1" className="animate-pulse" />
                    <circle cx="100" cy="75" r="8" fill="#6366f1" fillOpacity="0.2" />
                    {/* The Pen */}
                    <motion.g
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M96 90L92 94L88 94L88 90L92 86L96 90Z" fill="#4f46e5" />
                      <path d="M96 90L122 64C124.2 61.8 127.8 61.8 130 64C132.2 66.2 132.2 69.8 130 72L104 98L96 90Z" fill="url(#penGrad)" />
                      {/* Interactive Spark particles */}
                      <path d="M125 50L127 53L130 53L128 55L129 58L126 56L123 58L124 55L122 53L125 53Z" fill="#fbbf24" className="animate-bounce" />
                    </motion.g>
                  </g>

                  {/* SVG Color Gradients */}
                  <defs>
                    <linearGradient id="indigoGrad" x1="0" y1="0" x2="200" y2="150">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="accentGrad" x1="200" y1="0" x2="0" y2="150">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="penGrad" x1="96" y1="90" x2="130" y2="64">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Corner Decorative Blur Sparks */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/10 blur-xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/15 blur-2xl rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Matrix of Core Values */}
        <section className="mb-32">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-600">Company Standards</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Why We Do It</h2>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">The principles that guide our product lifecycle and development pipeline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="glass-card p-10 relative overflow-hidden group border-slate-200/50 hover:bg-white/90 transition-all text-left flex flex-col justify-between min-h-[220px]">
              <span className="absolute right-6 bottom-4 text-7xl font-black text-slate-100 font-mono select-none pointer-events-none group-hover:text-brand-500/5 transition duration-500">01</span>
              <div>
                <div className="w-12 h-12 bg-brand-50 border border-brand-100/50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 shadow-sm">
                  <Target size={22} className="group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 relative z-10">Focus On Impact</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold relative z-10 max-w-[90%]">
                  We build tools that save time and directly improve the quality of your professional communication.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="glass-card p-10 relative overflow-hidden group border-slate-200/50 hover:bg-white/90 transition-all text-left flex flex-col justify-between min-h-[220px]">
              <span className="absolute right-6 bottom-4 text-7xl font-black text-slate-100 font-mono select-none pointer-events-none group-hover:text-accent/5 transition duration-500">02</span>
              <div>
                <div className="w-12 h-12 bg-accent/5 border border-accent/15 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm">
                  <Users size={22} className="group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 relative z-10">User-First Security</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold relative z-10 max-w-[90%]">
                  We believe privacy is a right. Your writing data is never sold or used for public training without consent.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="glass-card p-10 relative overflow-hidden group border-slate-200/50 hover:bg-white/90 transition-all text-left flex flex-col justify-between min-h-[220px]">
              <span className="absolute right-6 bottom-4 text-7xl font-black text-slate-100 font-mono select-none pointer-events-none group-hover:text-success/5 transition duration-500">03</span>
              <div>
                <div className="w-12 h-12 bg-success/5 border border-success/15 rounded-2xl flex items-center justify-center text-success mb-6 shadow-sm">
                  <Heart size={22} className="group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 relative z-10">Accessible AI</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold relative z-10 max-w-[90%]">
                  Advanced AI shouldn't be complicated or expensive. We make it simple and affordable for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Profile Founder Card Section */}
        <section>
          <div className="glass-card-premium border-brand-500/15 p-12 md:p-16 relative overflow-hidden shadow-[0_15px_35px_rgba(79,102,241,0.03)] text-left">
            <div className="absolute right-0 top-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
              {/* Floating Holographic Initial Avatar Block */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-600 to-accent rounded-3xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
                <div className="w-28 h-28 rounded-2.5xl bg-white border-2 border-slate-100 flex items-center justify-center relative z-10 shadow-lg shadow-brand-500/10">
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-brand-600 to-indigo-600 font-mono">
                    SB
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-tr from-brand-600 to-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow shadow-brand-500/30">
                  <Sparkles size={11} className="animate-spin-slow" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sarthak Bhadiyadra</h3>
                  <p className="text-brand-600 font-black uppercase tracking-widest text-[10px] mt-1">
                    Founder & Lead Developer
                  </p>
                </div>
                <p className="text-slate-650 leading-relaxed text-sm font-semibold max-w-2xl">
                  Sarthak founded Writing Buddy to bridge the gap between powerful AI capabilities and the everyday tools professionals use. With a passion for clean code, intuitive design, and custom-tailored glassmorphism, he leads the vision of making writing effortless, beautiful, and secure for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

