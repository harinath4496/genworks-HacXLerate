"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Upload,
  Film,
  Image as ImageIcon,
  Sliders,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Cloud,
  FolderGit2,
} from "lucide-react";
import { CreatorUploadModal } from "@/components/creator/CreatorUploadModal";

export default function PortfolioManagePage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/creator/portfolio");
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.warn("Portfolio fetch notice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E3D9] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#FEF9E1] rounded-2xl text-[#D3A373]">
              <FolderGit2 size={24} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1C16]">
              Portfolio Showcase Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#82756A] mt-1.5">
            Cloudinary CDN-hosted commercial renders, deterministically reproducible prompts &amp; verified seeds.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#D3A373] hover:bg-[#C29263] text-[#1B1C16] px-5 py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Upload size={16} />
          <span>Upload via Cloudinary</span>
        </button>
      </div>

      {/* Cloudinary CDN Status Callout */}
      <div className="bg-[#FAF9F5] border border-[#E4E3D9] rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1B1C16] text-[#FBFAF0] flex items-center justify-center shrink-0">
            <Cloud size={20} className="text-[#D3A373]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1B1C16]">
                Cloudinary Asset Storage (bzpfks5x)
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#82756A]">
              All client review videos are streamed in adaptive 4K bitrate directly from Cloudinary.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#50453B]">
          <span className="font-bold text-[#1B1C16]">{items.length}</span> Showcase Assets Indexed
        </div>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#82756A] font-mono">
          Loading portfolio works from MongoDB Atlas &amp; Cloudinary...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4E3D9] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FEF9E1] text-[#D3A373] flex items-center justify-center mx-auto">
            <Sparkles size={28} />
          </div>
          <h3 className="font-bold text-lg text-[#1B1C16]">No Portfolio Items Yet</h3>
          <p className="text-xs text-[#82756A] leading-relaxed">
            Upload your first high-definition AI commercial reel or prompt generation to showcase to top enterprise brands.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="bg-[#1B1C16] text-[#FBFAF0] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2E2F27] transition-all"
          >
            Upload Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            let parsedWorkflow: any = null;
            if (item.workflow) {
              try {
                parsedWorkflow = JSON.parse(item.workflow);
              } catch {
                parsedWorkflow = { prompt: item.workflow };
              }
            }

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#E4E3D9] overflow-hidden hover:border-[#D3A373]/50 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Media Preview */}
                  <div className="relative aspect-video bg-black/5 overflow-hidden">
                    {item.contentType === "Video" ||
                    (item.mediaUrl && item.mediaUrl.endsWith(".mp4")) ? (
                      <video
                        src={item.mediaUrl}
                        controls
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      {item.contentType === "Video" ? (
                        <Film size={12} className="text-[#D3A373]" />
                      ) : (
                        <ImageIcon size={12} className="text-[#D3A373]" />
                      )}
                      <span>{item.contentType || "Asset"}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#1B1C16] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Cloudinary CDN
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-[#1B1C16] group-hover:text-[#D3A373] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.toolsUsed?.map((tool: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-[#FAF9F5] border border-[#E4E3D9] text-[#50453B] px-2.5 py-0.5 rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Workflow / Prompt Details */}
                    {parsedWorkflow && (
                      <div className="bg-[#FAF9F5] rounded-2xl p-3 border border-[#E4E3D9] text-[11px] space-y-2">
                        {parsedWorkflow.prompt && (
                          <div>
                            <span className="block text-[9px] font-mono font-bold uppercase text-[#82756A]">
                              Prompt Directive:
                            </span>
                            <p className="text-gray-700 italic line-clamp-2 mt-0.5 font-mono text-[10px]">
                              &ldquo;{parsedWorkflow.prompt}&rdquo;
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E4E3D9]/60 font-mono text-[10px] text-[#50453B]">
                          {parsedWorkflow.seed && (
                            <div>
                              <span className="text-[#82756A]">Seed: </span>
                              <span className="font-bold text-[#1B1C16]">
                                {parsedWorkflow.seed}
                              </span>
                            </div>
                          )}
                          {parsedWorkflow.cfg && (
                            <div>
                              <span className="text-[#82756A]">CFG: </span>
                              <span className="font-bold text-[#1B1C16]">
                                {parsedWorkflow.cfg}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 py-3 bg-[#FAF9F5]/60 border-t border-[#E4E3D9] flex items-center justify-between text-[11px] text-[#82756A]">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 size={12} /> Commercial Cleared
                  </span>
                  <a
                    href={item.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1B1C16] flex items-center gap-1 font-semibold hover:underline"
                  >
                    <span>View CDN</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <CreatorUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={fetchItems}
      />
    </div>
  );
}
