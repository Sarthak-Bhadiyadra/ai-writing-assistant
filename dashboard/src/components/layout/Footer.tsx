import Link from "next/link";
import { PenTool, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-brand-600 to-accent rounded-lg flex items-center justify-center">
                <PenTool className="text-white w-4 h-4" />
              </div>
              <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-900 to-brand-600">Writing Buddy</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-semibold">
              Improve grammar, rewrite sentences, and enhance writing instantly using AI.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-brand-500/10 hover:text-brand-600 transition-all">
                <Github size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-brand-500/10 hover:text-brand-600 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-brand-500/10 hover:text-brand-600 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/features" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Features</Link></li>
              <li><Link href="/pricing" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Pricing</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Chrome Extension</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">About Us</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Contact</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-text-secondary hover:text-brand-600 transition-colors text-sm font-semibold">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-semibold">
            © {new Date().getFullYear()} Writing Buddy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
               <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
               Systems Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

