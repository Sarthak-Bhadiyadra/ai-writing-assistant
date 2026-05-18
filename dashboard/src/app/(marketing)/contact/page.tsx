"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone, Sparkles } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Page Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-xs font-black uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" /> Support Desks
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Get in <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-accent">
              Touch
            </span>
          </h1>
          <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto items-start">
          
          {/* Column 1: Contact Info & Decorative Vector Art */}
          <div className="flex flex-col gap-8 text-left">
            <div className="glass-card p-8 flex items-start gap-6 border-slate-200/50 hover:bg-white/80 transition shadow-sm">
              <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center text-brand-655 shadow-sm">
                 <Mail size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Email Us</h3>
                <p className="text-xs font-semibold text-slate-500">support@writingbuddy.com</p>
                <p className="text-xs font-semibold text-slate-500">sales@writingbuddy.com</p>
              </div>
            </div>

            <div className="glass-card p-8 flex items-start gap-6 border-slate-200/50 hover:bg-white/80 transition shadow-sm">
              <div className="w-12 h-12 bg-accent/5 border border-accent/15 rounded-2xl flex items-center justify-center text-accent shadow-sm">
                 <MessageSquare size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Live Chat</h3>
                <p className="text-xs font-semibold text-slate-500">Available Mon-Fri, 9am - 5pm EST</p>
                <button className="mt-3 text-brand-600 text-xs font-black flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Start Chat <Send size={11} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Office Details */}
            <div className="px-8 flex flex-col gap-4 pt-2">
               <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-400">Main Office</h4>
               <div className="flex items-center gap-3 text-slate-600 font-semibold text-xs">
                  <MapPin size={16} className="text-brand-500/50" />
                  <span>Remote-first team, based in New York City</span>
               </div>
               <div className="flex items-center gap-3 text-slate-600 font-semibold text-xs">
                  <Phone size={16} className="text-brand-500/50" />
                  <span>+1 (555) 000-0000</span>
               </div>
            </div>

            {/* Premium Native SVG Envelope Illustration for Layout Balance */}
            <div className="w-full max-w-[340px] aspect-[1.5/1] bg-white/60 border border-slate-200/50 rounded-2xl p-6 relative z-10 flex items-center justify-center shadow-inner mt-4 self-center lg:self-start">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:14px_14px] opacity-40 rounded-2xl" />
              
              <svg className="w-full h-full max-h-[140px]" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Floating Letters / Message Nodes */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Decorative Letter Base */}
                  <rect x="35" y="25" width="90" height="55" rx="8" fill="url(#mailBase)" stroke="#e2e8f0" strokeWidth="1" />
                  {/* Fold lines */}
                  <path d="M35 25L80 55L125 25" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d="M35 80L70 50" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d="M125 80L90 50" stroke="#cbd5e1" strokeWidth="1.5" />
                </motion.g>

                {/* Sparkling glowing signals */}
                <circle cx="80" cy="55" r="10" fill="#6366f1" fillOpacity="0.1" className="animate-pulse" />
                <path d="M135 15L137 18L140 18L138 20L139 23L136 21L133 23L134 20L132 18L135 18Z" fill="#fbbf24" className="animate-bounce" />

                <defs>
                  <linearGradient id="mailBase" x1="35" y1="25" x2="125" y2="80">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Column 2: Gorgeous Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card border-slate-200/50 p-10 shadow-[0_15px_30px_rgba(15,23,42,0.02)] text-left flex-1"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</label>
                <input type="text" placeholder="John Doe" className="field border-slate-200 focus:border-brand-500 focus:bg-white font-semibold text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <input type="email" placeholder="john@example.com" className="field border-slate-200 focus:border-brand-500 focus:bg-white font-semibold text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                <textarea placeholder="How can we help?" rows={5} className="field border-slate-200 focus:border-brand-500 focus:bg-white resize-none font-semibold text-xs" />
              </div>
              <ModernButton className="w-full relative overflow-hidden shadow shadow-brand-500/10 hover:shadow-lg transition">
                Send Message
              </ModernButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

