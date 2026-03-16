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
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-500/20">
            <PenTool className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">AI Writing Assistant</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="nav-link">Features</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium hover:text-brand-400 transition-colors">
            Login
          </Link>
          <Link href="/app">
            <ModernButton size="sm">Get Started</ModernButton>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};
