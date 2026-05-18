"use client";

import Link from "next/link";
import { ModernButton } from "@/components/ui/ModernButton";
import { motion } from "framer-motion";
import { PenTool } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
    >
      <nav className="max-w-6xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(15,23,42,0.03)] border-slate-200/40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-accent rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-md shadow-brand-500/20">
            <PenTool className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-900 to-brand-600">Writing Buddy</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Features</Link>
          <Link href="/pricing" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">About</Link>
          <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
            Login
          </Link>
          <Link href="/app">
            <ModernButton size="sm" className="!rounded-xl text-xs">Get Started</ModernButton>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

