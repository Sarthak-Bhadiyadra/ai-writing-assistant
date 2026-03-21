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
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
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

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      const { error } = await supabase
        .from("usage_logs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchActivities(currentPage);
    } catch (error) {
      handleError(error, "Failed to delete activity");
    }
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Recent Activity</h1>
          <p className="text-text-secondary">View and manage your full improvement history.</p>
        </div>
        {/* <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                disabled
                placeholder="Search history... (Coming soon)" 
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-brand-500/50 w-64 opacity-50 cursor-not-allowed"
              />
           </div>
        </div> */}
      </header>

      <div className="glass-card overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Source</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <AnimatePresence mode="wait">
                {activities.length === 0 && !loading ? (
                  <tr key="empty">
                    <td colSpan={5} className="px-6 py-20 text-center text-text-muted">
                      No activity logs found.
                    </td>
                  </tr>
                ) : (
                  activities.map((log) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                            <PenTool size={14} />
                          </div>
                          <span className="font-bold">{log.tone || 'General'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 min-w-[300px]">
                        <p className="text-xs text-text-secondary line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">
                          "{log.improved_text || 'No preview available'}"
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-xs text-text-muted flex items-center gap-1.5 hover:text-brand-400 transition-colors cursor-pointer capitalize">
                          {log.source || 'Webpage'}
                          {log.url && <ExternalLink size={10} />}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <span className="text-xs text-text-muted font-mono">{formatRelativeTime(log.timestamp)}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleDelete(log.id)}
                          className="w-8 h-8 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 flex items-center justify-center transition-all ml-auto"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
           <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
              Showing {activities.length > 0 ? currentPage * PAGE_SIZE + 1 : 0} to {Math.min((currentPage + 1) * PAGE_SIZE, totalCount)} of {totalCount} logs
           </p>
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0 || loading}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 p-0 border border-white/5 transition-all"
              >
                 <ChevronLeft size={16} />
              </button>
              <div className="px-4 text-xs font-bold text-text-primary">
                 {currentPage + 1} / {Math.max(1, totalPages)}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1 || loading}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 p-0 border border-white/5 transition-all"
              >
                 <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
