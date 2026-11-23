"use client";

import React, { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";
import type { ProjectHeroVideo } from "@/types/portfolio";

interface CaseStudyHeroVideoProps {
  video: ProjectHeroVideo;
  projectTitle: string;
}

/**
 * Chromeless autoplaying 1080p product showcase player with reduced-motion support
 * and subtle hover/focus playback controls.
 */
export function CaseStudyHeroVideo({
  video,
  projectTitle,
}: CaseStudyHeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      const reduced = mq.matches;
      setPrefersReducedMotion(reduced);
      const el = videoRef.current;
      if (!el) return;
      if (reduced) {
        el.pause();
        setIsPlaying(false);
      } else {
        el.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false)
        );
      }
    };

    syncMotionPreference();
    mq.addEventListener("change", syncMotionPreference);
    return () => mq.removeEventListener("change", syncMotionPreference);
  }, []);

  const togglePlayback = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    const target = containerRef.current ?? videoRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    target.requestFullscreen?.().catch(() => {});
  };

  return (
    <section
      className="py-10 sm:py-12 border-b border-white/[0.08]"
      aria-label={video.title ?? `${projectTitle} product showcase video`}
    >
      <figure className="rounded-2xl bg-[#0b0c10] border border-white/[0.08] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-[#07080a] group overflow-hidden"
        >
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={video.title ?? `${projectTitle} animated UI showcase`}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover block"
          />

          {/* Subtle bottom-right hover/focus controls */}
          <div className="absolute bottom-3.5 right-3.5 flex items-center gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause showcase video" : "Play showcase video"}
              className="min-h-[40px] min-w-[40px] px-3 rounded-full bg-[#08090a]/85 backdrop-blur-md border border-white/15 text-[#f2f5f1] hover:border-[#ff7235]/60 flex items-center justify-center gap-1.5 text-xs font-mono transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                  <span>Play</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Toggle fullscreen showcase video"
              className="min-h-[40px] min-w-[40px] rounded-full bg-[#08090a]/85 backdrop-blur-md border border-white/15 text-[#f2f5f1] hover:border-[#ff7235]/60 flex items-center justify-center transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {(video.title || video.caption) && (
          <figcaption className="px-5 py-4 bg-[#121316] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              {video.title && (
                <span className="text-xs font-mono text-[#ff8547]">
                  {video.title}
                </span>
              )}
              {video.caption && (
                <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
                  {video.caption}
                </p>
              )}
            </div>
            <span className="text-[11px] font-mono text-[#adb3b7] shrink-0">
              1080p · 60fps · Loop
            </span>
          </figcaption>
        )}
      </figure>
    </section>
  );
}
