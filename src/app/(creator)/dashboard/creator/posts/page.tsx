"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  MessageSquarePlus,
  Cloud,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { CreatorUploadModal } from "@/components/creator/CreatorUploadModal";

export default function CreatorPostsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/creator/logs");
      const data = await res.json();
      if (data.success && data.logs) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.warn("Creator logs fetch notice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E3D9] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#FEF9E1] rounded-2xl text-[#D3A373]">
              <FileText size={24} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1C16]">
              AI Experiment &amp; Activity Logs
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#82756A] mt-1.5">
            Public feed of model benchmarks, prompt iterations, and Cloudinary media outputs.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#D3A373] hover:bg-[#C29263] text-[#1B1C16] px-5 py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Upload size={16} />
          <span>New Experiment Log</span>
        </button>
      </div>

      {/* Logs Feed */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#82756A] font-mono">
          Loading AI experiment activity feed...
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4E3D9] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FEF9E1] text-[#D3A373] flex items-center justify-center mx-auto">
            <MessageSquarePlus size={28} />
          </div>
          <h3 className="font-bold text-lg text-[#1B1C16]">No Activity Logs Yet</h3>
          <p className="text-xs text-[#82756A] leading-relaxed">
            Record your daily model tests, seed discoveries, and Cloudinary renders to build authority for brand clients.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="bg-[#1B1C16] text-[#FBFAF0] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2E2F27] transition-all"
          >
            Create First Log
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-3xl border border-[#E4E3D9] p-6 shadow-xs hover:border-[#D3A373]/50 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B1C16] text-[#FBFAF0] flex items-center justify-center font-bold text-xs uppercase overflow-hidden border border-[#D3A373]/30">
                    {log.creator?.user?.image ? (
                      <img
                        src={log.creator.user.image}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      log.creator?.user?.name?.charAt(0) || "E"
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1C16]">
                      {log.creator?.user?.name || "Elena Vance"}
                    </h4>
                    <span className="text-[11px] text-[#82756A] flex items-center gap-1 font-mono">
                      <Calendar size={11} />
                      {new Date(log.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={11} /> Verified Log
                </span>
              </div>

              <p className="text-sm text-[#2E2F27] leading-relaxed font-normal whitespace-pre-wrap">
                {log.content}
              </p>

              {/* Cloudinary Media Attachment */}
              {log.mediaUrl && (
                <div className="rounded-2xl overflow-hidden border border-[#E4E3D9] bg-black/5 max-h-80 relative group">
                  <img
                    src={log.mediaUrl}
                    alt="Experiment Output"
                    className="w-full h-72 object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-3 py-1 rounded-md flex items-center gap-1.5">
                    <Cloud size={12} className="text-[#D3A373]" />
                    <span>Cloudinary CDN Hosted</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <CreatorUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={fetchLogs}
      />
    </div>
  );
}
