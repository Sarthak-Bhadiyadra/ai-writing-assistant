import Link from "next/link";
import { PenTool, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-surface-raised border-t border-border pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <PenTool className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">AI Writing Assistant</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Improve grammar, rewrite sentences, and enhance writing instantly using AI.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/features" className="text-text-secondary hover:text-white transition-colors text-sm">Features</Link></li>
              <li><Link href="/pricing" className="text-text-secondary hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Chrome Extension</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-text-secondary hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-text-secondary hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-text-secondary hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} AI Writing Assistant. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-text-muted text-xs flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
               Systems Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
