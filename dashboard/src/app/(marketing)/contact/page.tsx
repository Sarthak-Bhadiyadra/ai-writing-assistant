"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Have questions or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="flex flex-col gap-10">
          <div className="glass-card p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400">
               <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Email Us</h3>
              <p className="text-text-secondary text-sm">support@aiwriter.com</p>
              <p className="text-text-secondary text-sm">sales@aiwriter.com</p>
            </div>
          </div>

          <div className="glass-card p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
               <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Live Chat</h3>
              <p className="text-text-secondary text-sm">Available Mon-Fri, 9am - 5pm EST</p>
              <button className="mt-4 text-brand-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Start Chat <Send size={14} />
              </button>
            </div>
          </div>

          <div className="px-8 flex flex-col gap-4">
             <h4 className="font-bold text-sm uppercase tracking-widest text-text-muted">Office</h4>
             <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={18} className="text-brand-500/50" />
                <span className="text-sm">Remote-first team, based in New York City</span>
             </div>
             <div className="flex items-center gap-3 text-text-secondary">
                <Phone size={18} className="text-brand-500/50" />
                <span className="text-sm">+1 (555) 000-0000</span>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-10"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Your Name</label>
              <input type="text" placeholder="John Doe" className="field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Email Address</label>
              <input type="email" placeholder="john@example.com" className="field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <textarea placeholder="How can we help?" rows={5} className="field resize-none" />
            </div>
            <ModernButton className="w-full">
              Send Message
            </ModernButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
