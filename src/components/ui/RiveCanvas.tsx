"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  type Rive as RiveInstance,
} from "@rive-app/react-canvas";

const emptySubscribe = () => () => {};

export interface RiveCanvasProps {
  src: string;
  artboard?: string;
  stateMachine?: string;
  autoplay?: boolean;
  fit?: Fit;
  alignment?: Alignment;
  pauseWhenOffscreen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onRiveReady?: (rive: RiveInstance) => void;
  fallback?: React.ReactNode;
}

export function RiveCanvas({
  src,
  artboard,
  stateMachine = "State Machine 1",
  autoplay = true,
  fit = Fit.Contain,
  alignment = Alignment.Center,
  pauseWhenOffscreen = true,
  className = "",
  style,
  onRiveReady,
  fallback,
}: RiveCanvasProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const { rive, RiveComponent } = useRive(
    mounted
      ? {
          src,
          artboard,
          stateMachines: stateMachine ? [stateMachine] : undefined,
          autoplay,
          layout: new Layout({
            fit,
            alignment,
          }),
        }
      : null
  );

  // Notify parent when rive instance is ready
  useEffect(() => {
    if (rive && onRiveReady) {
      onRiveReady(rive);
    }
  }, [rive, onRiveReady]);

  // Intersection Observer for 60fps performance & battery preservation
  useEffect(() => {
    if (!pauseWhenOffscreen || !rive || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rive.isPlaying) {
            rive.play(stateMachine);
          }
        } else {
          if (rive.isPlaying) {
            rive.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [rive, pauseWhenOffscreen, stateMachine]);

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={style}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <RiveComponent className="w-full h-full block" />
    </div>
  );
}
