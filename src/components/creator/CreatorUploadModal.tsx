"use client";

import { useState, useRef } from "react";
import {
  Upload,
  X,
  Sparkles,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sliders,
  Copy,
  Hash,
} from "lucide-react";

interface CreatorUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreatorUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: CreatorUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState<"Video" | "Image">("Video");
  const [aiModel, setAiModel] = useState("Runway Gen-3 Alpha");
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(
    Math.floor(Math.random() * 9000000000 + 1000000000).toString()
  );
  const [cfg, setCfg] = useState("7.5");
  const [steps, setSteps] = useState("50");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [publishToPortfolio, setPublishToPortfolio] = useState(true);
  const [publishToLogs, setPublishToLogs] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    if (selectedFile.type.startsWith("video")) {
      setContentType("Video");
    } else {
      setContentType("Image");
    }

    if (!title) {
      const cleanName = selectedFile.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!file && !previewUrl) {
      setError("Please select an AI video or image to upload.");
      return;
    }
    if (!title.trim()) {
      setError("Please provide a title for your AI work.");
      return;
    }

    setIsUploading(true);
    setUploadProgress("Uploading asset to Cloudinary CDN...");

    try {
      let finalMediaUrl = previewUrl || "";

      // 1. Upload to Cloudinary via /api/upload if file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "genworks_creators");
        formData.append(
          "resource_type",
          file.type.startsWith("video") ? "video" : "image"
        );

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || "Cloudinary upload failed.");
        }

        finalMediaUrl = uploadData.url;
      }

      setUploadProgress("Indexing AI parameters in MongoDB Atlas...");

      const workflowData = {
        model: aiModel,
        prompt: prompt.trim() || "Commercial generative AI workflow",
        seed,
        cfg: parseFloat(cfg) || 7.5,
        steps: parseInt(steps) || 50,
        aspectRatio,
      };

      // 2. Save Portfolio Item
      if (publishToPortfolio) {
        await fetch("/api/creator/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            mediaUrl: finalMediaUrl,
            contentType,
            toolsUsed: [aiModel, "Topaz Video AI"],
            workflow: workflowData,
          }),
        });
      }

      // 3. Save Creator Log
      if (publishToLogs) {
        await fetch("/api/creator/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `Uploaded "${title.trim()}" generated with ${aiModel}. Seed: ${seed}, CFG: ${cfg}. Ready for commercial client licensing.`,
            mediaUrl: finalMediaUrl,
          }),
        });
      }

      setSuccess("Successfully uploaded to Cloudinary and published live!");
      setTimeout(() => {
        setIsUploading(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 1000);
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to process upload.");
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-[#E4E3D9] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E4E3D9] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D3A373] text-[#1B1C16] flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B1C16]">
                Upload AI Asset to Cloudinary
              </h2>
              <p className="text-xs text-[#82756A]">
                Real-time CDN hosting & deterministic workflow inspection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#82756A] hover:text-[#1B1C16] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-700 text-xs">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Cloudinary Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
              previewUrl
                ? "border-[#D3A373] bg-white"
                : "border-[#E4E3D9] hover:border-[#D3A373] bg-white/60 hover:bg-white"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {previewUrl ? (
              <div className="space-y-3">
                <div className="relative max-h-56 rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center mx-auto">
                  {contentType === "Video" ? (
                    <video
                      src={previewUrl}
                      controls
                      className="max-h-56 max-w-full rounded-2xl object-contain"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-56 max-w-full rounded-2xl object-contain"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-[#82756A]">
                  <span className="font-semibold text-[#1B1C16]">
                    {file?.name || "Selected Asset"}
                  </span>
                  <span>•</span>
                  <span>{file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "Ready"}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-[#D3A373] font-semibold underline hover:text-[#B48450] ml-2"
                  >
                    Change File
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FEF9E1] border border-[#D3A373]/30 flex items-center justify-center text-[#D3A373] mb-3">
                  <Upload size={26} />
                </div>
                <h4 className="font-bold text-sm text-[#1B1C16] mb-1">
                  Drag & Drop AI Render or Browse Files
                </h4>
                <p className="text-xs text-[#82756A] max-w-xs mb-3">
                  Upload MP4, WebM (9:16 / 16:9 reels) or High-Res PNG/JPG to Cloudinary
                </p>
                <span className="bg-[#1B1C16] text-[#FBFAF0] text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:bg-[#2E2F27] transition-all">
                  Select File from Computer
                </span>
              </div>
            )}
          </div>

          {/* Form Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#50453B] mb-1.5">
                Asset Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Celestial Perfume Runway Commercial (Runway Gen-3)"
                className="w-full bg-white border border-[#E4E3D9] rounded-2xl px-4 py-2.5 text-sm text-[#1B1C16] focus:outline-none focus:border-[#D3A373] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#50453B] mb-1.5">
                  AI Model Engine
                </label>
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full bg-white border border-[#E4E3D9] rounded-2xl px-4 py-2.5 text-sm text-[#1B1C16] focus:outline-none focus:border-[#D3A373]"
                >
                  <option value="Runway Gen-3 Alpha">Runway Gen-3 Alpha</option>
                  <option value="Kling 1.5 Pro">Kling 1.5 Pro</option>
                  <option value="Luma Dream Machine">Luma Dream Machine</option>
                  <option value="Midjourney v6.1">Midjourney v6.1</option>
                  <option value="Flux.1 Schnell">Flux.1 Schnell</option>
                  <option value="Stable Diffusion 3.5">Stable Diffusion 3.5 Large</option>
                  <option value="Sora (OpenAI)">Sora (OpenAI)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#50453B] mb-1.5">
                  Format / Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["9:16", "16:9", "1:1"].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        aspectRatio === ratio
                          ? "bg-[#1B1C16] text-[#FBFAF0] border-[#1B1C16]"
                          : "bg-white text-[#50453B] border-[#E4E3D9] hover:border-[#82756A]"
                      }`}
                    >
                      {ratio} {ratio === "9:16" ? "Reel" : ratio === "16:9" ? "Cinema" : "Square"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Directive */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#50453B] mb-1.5">
                Positive Prompt Directive
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Liquid gold droplets coalescing around crystal glass flacon, soft cinematic lighting, 9:16 vertical luxury ad..."
                rows={2}
                className="w-full bg-white border border-[#E4E3D9] rounded-2xl p-3 text-xs font-mono text-[#1B1C16] focus:outline-none focus:border-[#D3A373]"
              />
            </div>

            {/* Generation Parameters */}
            <div className="bg-white rounded-2xl p-4 border border-[#E4E3D9] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#50453B]">
                <span className="flex items-center gap-1.5">
                  <Sliders size={14} className="text-[#D3A373]" />
                  Deterministic Reproducibility Parameters
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSeed(
                      Math.floor(
                        Math.random() * 9000000000 + 1000000000
                      ).toString()
                    )
                  }
                  className="text-[#D3A373] text-[11px] font-semibold hover:underline"
                >
                  Generate Random Seed
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-[#82756A] uppercase mb-1">
                    Seed
                  </span>
                  <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E4E3D9] rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-[#1B1C16]"
                  />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-[#82756A] uppercase mb-1">
                    CFG Scale
                  </span>
                  <input
                    type="text"
                    value={cfg}
                    onChange={(e) => setCfg(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E4E3D9] rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-[#1B1C16]"
                  />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-[#82756A] uppercase mb-1">
                    Steps
                  </span>
                  <input
                    type="text"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E4E3D9] rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-[#1B1C16]"
                  />
                </div>
              </div>
            </div>

            {/* Target Destinations */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1B1C16]">
                <input
                  type="checkbox"
                  checked={publishToPortfolio}
                  onChange={(e) => setPublishToPortfolio(e.target.checked)}
                  className="rounded border-[#E4E3D9] text-[#D3A373] focus:ring-[#D3A373]"
                />
                <span>Add to My Portfolio Showcase</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1B1C16]">
                <input
                  type="checkbox"
                  checked={publishToLogs}
                  onChange={(e) => setPublishToLogs(e.target.checked)}
                  className="rounded border-[#E4E3D9] text-[#D3A373] focus:ring-[#D3A373]"
                />
                <span>Publish to Real-Time Activity Logs</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E4E3D9]">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#50453B] hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-[#D3A373] hover:bg-[#C29263] text-[#1B1C16] px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{uploadProgress || "Uploading..."}</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Upload & Publish to Cloudinary</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
