"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, Mail, Linkedin, Globe, MessageSquare, History, Wand2 } from "lucide-react";

const FeatureDetail = ({ icon: Icon, title, description }: any) => (
  <div className="glass-card p-10 flex flex-col gap-6">
    <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Powerful Writing <span className="text-gradient">Capabilities</span></h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Discover all the ways Writing Buddy can help you communicate more effectively across the web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureDetail 
          icon={Sparkles}
          title="Instant Refinement"
          description="Fix grammar, punctuation, and spelling errors with a single click. Our AI understands context better than traditional spellcheckers."
        />
        <FeatureDetail 
          icon={Zap}
          title="Tone Transformation"
          description="Switch between Professional, Friendly, Urgent, or Academic tones instantly. Make sure your message lands exactly as intended."
        />
        <FeatureDetail 
          icon={Mail}
          title="Email Optimization"
          description="Draft persuasive cold emails, concise replies, and professional follow-ups directly in Gmail and Outlook."
        />
        <FeatureDetail 
          icon={Linkedin}
          title="Social Content Master"
          description="Create engaging LinkedIn posts and professional bio descriptions that capture attention and build your personal brand."
        />
        <FeatureDetail 
          icon={MessageSquare}
          title="Sentence Rephrasing"
          description="Stuck on a sentence? Get 5 different ways to say the same thing, optimized for clarity and impact."
        />
        <FeatureDetail 
          icon={ShieldCheck}
          title="Privacy Focused"
          description="Your writing is yours. We use enterprise-grade encryption and never use your private data to train our public models."
        />
        <FeatureDetail 
          icon={Globe}
          title="Browser-wide Support"
          description="From internal dashboards to public forums, our extension works on every textarea and input field on the web."
        />
        <FeatureDetail 
          icon={History}
          title="Saved Improvements"
          description="Keep track of your best rewrites and reuse them later. Build your own library of perfect responses."
        />
        <FeatureDetail 
          icon={Wand2}
          title="AI Continuations"
          description="Can't find the words? Let our AI suggest the next sentence based on what you've already written."
        />
      </div>
    </div>
  );
}
