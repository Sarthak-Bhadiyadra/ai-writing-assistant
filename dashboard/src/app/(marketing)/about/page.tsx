"use client";

import { motion } from "framer-motion";
import { Target, Users, Heart, PenTool } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Narrative Section */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Our <span className="text-gradient">Mission</span></h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Writing Buddy was born from a simple observation: professional writing is hard, and most of it happens in browser tabs where existing tools don't reach.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our mission is to empower professionals to write better and faster with AI, making communication seamless regardless of the platform. We believe everyone deserves a world-class editor by their side.
            </p>
          </div>
          <div className="relative">
             <div className="aspect-square glass rounded-3xl p-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent/20" />
                <div className="relative h-full w-full bg-surface rounded-[calc(1.5rem-2px)] flex items-center justify-center">
                   <PenTool size={80} className="text-brand-500 opacity-20" />
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/30 blur-[60px] rounded-full" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/30 blur-[80px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Why we do it</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-10 text-center">
            <div className="w-12 h-12 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-400 mx-auto mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Focus On Impact</h3>
            <p className="text-text-secondary text-sm leading-relaxed">We build tools that save time and directly improve the quality of your professional communication.</p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">User-First Security</h3>
            <p className="text-text-secondary text-sm leading-relaxed">We believe privacy is a right. Your data is never sold or used for public training without consent.</p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success mx-auto mb-6">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Accessible AI</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Advanced AI shouldn't be complicated or expensive. We make it simple and affordable for everyone.</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section>
         <div className="glass-card p-12 md:p-20 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/5 blur-[100px]" />
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
               <div className="w-32 h-32 rounded-3xl bg-brand-600/20 border border-brand-500/30 flex-shrink-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-400">SB</span>
               </div>
               <div>
                  <h3 className="text-2xl font-bold mb-2">Sarthak Bhadiyadra</h3>
                  <p className="text-brand-400 font-medium mb-4 uppercase tracking-widest text-xs">Founder & Lead Developer</p>
                  <p className="text-text-secondary leading-relaxed">
                    Sarthak founded Writing Buddy to bridge the gap between powerful AI capabilities and the everyday tools professionals use. With a passion for clean code and intuitive design, he leads the vision of making writing effortless for everyone.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
