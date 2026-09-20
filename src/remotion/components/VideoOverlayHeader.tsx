import React from "react";
import { useCurrentFrame } from "remotion";
import { TOTAL_FRAMES } from "../types";

interface VideoOverlayHeaderProps {
  chapter: string;
  category?: string;
  totalChapters?: string;
  stageName?: string;
}

export const VideoOverlayHeader: React.FC<VideoOverlayHeaderProps> = ({
  chapter,
  category = "E-COMMERCE ART & PHOTO BOOKS PLATFORM",
  stageName
}) => {
  const frame = useCurrentFrame();

  // Progress across the entire video
  const progressPercent = (frame / (TOTAL_FRAMES || 2400)) * 100;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        {/* Brand & Category */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white font-bold text-xs tracking-wider px-2.5 py-1 rounded-sm uppercase font-mono shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            BOOKIFY
          </div>
          <span className="text-zinc-400 font-mono text-xs tracking-wider uppercase">
            {category}
          </span>
        </div>

        {/* Chapter Indicator */}
        <div className="flex items-center space-x-4">
          {stageName && (
            <span className="text-xs font-mono text-blue-400 font-medium px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              {stageName}
            </span>
          )}
          <span className="text-zinc-300 font-mono text-xs tracking-widest uppercase bg-[#11141D] px-3 py-1 rounded-full border border-white/10">
            {chapter}
          </span>
        </div>
      </div>

      {/* Bottom Footer Meta & Scrubber */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>PORTFOLIO CASE STUDY • 2026 EDITION</span>
          </div>
          <span>DESIGNED UNDER VISUAL-REDESIGN FRAMEWORK</span>
        </div>

        {/* Live Video Scrubber Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
