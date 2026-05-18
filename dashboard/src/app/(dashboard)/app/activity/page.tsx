"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { handleError } from "@/lib/errorHandler";
import { 
  PenTool, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PAGE_SIZE = 10;

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const supabase = createClient();

  async function fetchActivities(page: number) {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from("usage_logs")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .range(from, to);

      if (error) throw error;
      setActivities(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      handleError(error, "Failed to load activity log");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      const { error } = await supabase
        .from("usage_logs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchActivities(currentPage);
      if (expandedId === id) setExpandedId(null);
    } catch (error) {
      handleError(error, "Failed to delete activity");
    }
  }

  const handleCopy = async (id: number, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Improved text copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const getToneBadgeStyle = (tone: string) => {
    const tones: Record<string, string> = {
      "Improve Clarity": "bg-cyan-5 border-cyan-100 text-cyan-700 shadow-sm",
      "Make Concise": "bg-teal-5 border-teal-100 text-teal-700 shadow-sm",
      "Fix Grammar": "bg-emerald-5 border-emerald-100 text-emerald-700 shadow-sm",
      "Expand": "bg-indigo-5 border-indigo-100 text-indigo-700 shadow-sm",
      "Professional & Formal": "bg-purple-5 border-purple-100 text-purple-700 shadow-sm",
      "Casual & Conversational": "bg-amber-5 border-amber-100 text-amber-700 shadow-sm",
      "Friendly & Warm": "bg-rose-5 border-rose-100 text-rose-700 shadow-sm",
      "Urgent & Direct": "bg-red-5 border-red-100 text-red-700 shadow-sm",
      "Persuasive & Confident": "bg-orange-5 border-orange-100 text-orange-700 shadow-sm",
      "Academic & Scientific": "bg-blue-5 border-blue-100 text-blue-700 shadow-sm",
    };
    return tones[tone] || "bg-brand-5 border-brand-100 text-brand-700";
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">Recent Activity</h1>
          <p className="text-sm font-semibold text-slate-500">View, filter, and inspect your full writing improvement history.</p>
        </div>
      </header>

      {/* Main Glassmorphic Timeline Stream */}
      <div className="relative">
        {/* Central Vertical Line for Timeline */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 pointer-events-none" />

        <div className="space-y-4 relative">
          <AnimatePresence mode="popLayout">
            {activities.length === 0 && !loading ? (
              <motion.div 
                key="empty" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card py-20 text-center text-slate-400 flex flex-col items-center justify-center border-slate-200/50"
              >
                <Clock size={40} className="text-slate-250 mb-4 animate-float" />
                <p className="text-sm font-black text-slate-800">No activity logs found</p>
                <p className="text-xs text-slate-400 mt-1 font-semibold">Start writing with your extension to populate this log.</p>
              </motion.div>
            ) : (
              activities.map((log) => {
                const isExpanded = expandedId === log.id;
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    className={cn(
                      "relative ml-14 glass-card p-5 glass-card-hover hover:border-brand-500/20 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(15,23,42,0.01)] border-slate-200/50",
                      isExpanded ? "border-brand-500/20 bg-white shadow-[0_15px_35px_rgba(79,102,241,0.05)]" : ""
                    )}
                  >
                    {/* Timeline Node Point Indicator */}
                    <div className={cn(
                      "absolute -left-[53px] top-6 w-5 h-5 rounded-full border-4 border-slate-100 flex items-center justify-center transition-all duration-300 z-10",
                      isExpanded 
                        ? "bg-brand-600 ring-4 ring-brand-500/10 shadow-[0_0_10px_rgba(79,102,241,0.3)]" 
                        : "bg-white border-slate-200 group-hover:border-brand-500/40"
                    )} />

                    {/* Timeline Node Header Summary */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-600 border border-brand-500/10 shadow-sm">
                          <PenTool size={14} />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn("text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border", getToneBadgeStyle(log.tone))}>
                            {log.tone || 'General'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold capitalize bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {log.source || 'Webpage'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-auto md:ml-0 flex-shrink-0">
                        <span className="text-[11px] text-slate-400 font-mono font-bold">{formatRelativeTime(log.timestamp)}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => handleCopy(log.id, log.improved_text || '', e)}
                            className="w-8 h-8 rounded-lg bg-white text-slate-400 hover:text-brand-600 hover:bg-brand-500/10 border border-slate-200/50 hover:border-brand-500/10 flex items-center justify-center transition-all shadow-sm"
                            title="Copy text"
                          >
                            {copiedId === log.id ? <Check size={13} className="text-success animate-pulse" /> : <Copy size={13} />}
                          </button>
                          <button 
                            onClick={(e) => handleDelete(log.id, e)}
                            className="w-8 h-8 rounded-lg bg-white text-slate-400 hover:text-danger hover:bg-danger/10 border border-slate-200/50 hover:border-danger/10 flex items-center justify-center transition-all shadow-sm"
                            title="Delete log"
                          >
                            <Trash2 size={13} />
                          </button>
                          <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ml-1", isExpanded ? "transform rotate-180 text-brand-600" : "")} />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node Collapsed Summary Preview */}
                    {!isExpanded && log.improved_text && (
                      <p className="text-xs text-slate-500 italic mt-3 truncate pl-2 opacity-80 border-l border-slate-100 group-hover:opacity-100 transition-opacity text-left">
                        "{log.improved_text}"
                      </p>
                    )}

                    {/* Timeline Node Expanded Detail Comparison view */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-5 pt-5 border-t border-slate-150 space-y-4"
                          onClick={(e) => e.stopPropagation()} // prevent double-closing when clicking interior
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Original Content block */}
                            <div className="space-y-1.5 text-left">
                              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded">Original Content</span>
                              <div className="p-4 rounded-xl bg-white border border-slate-200/50 text-xs text-slate-600 font-semibold leading-relaxed min-h-[90px] whitespace-pre-wrap shadow-inner">
                                {log.original_text || <span className="text-slate-400 italic">No original text captured.</span>}
                              </div>
                            </div>
                            
                            {/* Improved Content block */}
                            <div className="space-y-1.5 text-left relative">
                              <span className="text-[8px] font-black uppercase tracking-widest text-brand-700 bg-brand-5 border border-brand-100 px-2 py-0.5 rounded">Writing Buddy Output</span>
                              <div className="p-4 rounded-xl bg-brand-50/30 border border-brand-500/15 text-xs text-slate-800 font-bold leading-relaxed min-h-[90px] whitespace-pre-wrap relative shadow-inner">
                                {log.improved_text || <span className="text-slate-400 italic">No output captured.</span>}
                              </div>
                            </div>
                          </div>

                          {/* Extra Context details bar */}
                          {log.url && (
                            <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 border border-slate-200/50 px-4 py-2.5 rounded-xl font-semibold">
                              <span>Captured Webpage URL:</span>
                              <a 
                                href={log.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 font-mono truncate max-w-md font-bold"
                              >
                                {log.url} <ExternalLink size={10} />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-surface/30 backdrop-blur-[1px] flex items-center justify-center z-50 pointer-events-none">
          <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="ml-14 glass-card px-6 py-4 flex items-center justify-between border-slate-200/50">
           <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
              Showing {activities.length > 0 ? currentPage * PAGE_SIZE + 1 : 0} to {Math.min((currentPage + 1) * PAGE_SIZE, totalCount)} of {totalCount} logs
           </p>
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0 || loading}
                className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-white border border-slate-200/50 transition-all shadow-sm"
              >
                 <ChevronLeft size={15} />
              </button>
              <div className="px-3 text-xs font-black text-slate-800">
                 {currentPage + 1} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1 || loading}
                className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-white border border-slate-200/50 transition-all shadow-sm"
              >
                 <ChevronRight size={15} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

