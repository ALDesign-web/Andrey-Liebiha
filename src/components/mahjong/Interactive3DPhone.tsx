"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Rotate3d } from "lucide-react";

const SPRING_ORBIT = { stiffness: 190, damping: 20, mass: 0.8 };
const SPRING_SCALE = { stiffness: 220, damping: 24, mass: 0.6 };

export interface Interactive3DPhoneProps {
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  imageClassName?: string;
  customVisual?: React.ReactNode;
  floatingLayer?: React.ReactNode;
  floatingZ?: number;
  maxRotateX?: number;
  maxRotateY?: number;
  hoverScale?: number;
  perspective?: number;
  glare?: boolean;
  showHint?: boolean;
  hintText?: string;
  className?: string;
  stageClassName?: string;
}

/**
 * Interactive cursor-tracking 3D phone stage with spring physics,
 * counter-shifting floor shadow, and optional Z-lifted overlay layer.
 */
export function Interactive3DPhone({
  src,
  alt = "",
  sizes = "330px",
  priority = false,
  imageClassName = "object-contain drop-shadow-[0_28px_52px_rgba(0,0,0,0.88)]",
  customVisual,
  floatingLayer,
  floatingZ = 34,
  maxRotateX = 14,
  maxRotateY = 20,
  hoverScale = 1.035,
  perspective = 1100,
  showHint = false,
  hintText = "Move cursor to rotate 3D",
  className = "",
  stageClassName = "relative w-full aspect-[9/19.2]",
}: Interactive3DPhoneProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasInteracted, setHasInteracted] = useState(false);

  const rawNormX = useMotionValue(0);
  const rawNormY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const smoothNormX = useSpring(rawNormX, SPRING_ORBIT);
  const smoothNormY = useSpring(rawNormY, SPRING_ORBIT);
  const smoothScale = useSpring(rawScale, SPRING_SCALE);

  // 3D hardware rotation + magnetic translation
  const rotateY = useTransform(smoothNormX, [-0.5, 0.5], [-maxRotateY, maxRotateY]);
  const rotateX = useTransform(smoothNormY, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  const translateX = useTransform(smoothNormX, [-0.5, 0.5], [-6, 6]);
  const translateY = useTransform(smoothNormY, [-0.5, 0.5], [-5, 5]);

  // Counter-shifting ambient floor shadow
  const shadowX = useTransform(smoothNormX, [-0.5, 0.5], [16, -16]);
  const shadowY = useTransform(smoothNormY, [-0.5, 0.5], [9, -9]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));

    rawNormX.set(nx);
    rawNormY.set(ny);
    rawScale.set(hoverScale);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerLeave = () => {
    rawNormX.set(0);
    rawNormY.set(0);
    rawScale.set(1);
  };

  return (
    <div className={`flex flex-col items-center overflow-visible ${className}`}>
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ perspective: `${perspective}px` }}
        className={`${stageClassName} flex items-center justify-center overflow-visible select-none`}
      >
        {/* Dynamic counter-shifting 3D floor shadow */}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ x: shadowX, y: shadowY }}
            className="pointer-events-none absolute -bottom-3 inset-x-[16%] h-7 rounded-full bg-black/75 blur-xl"
          />
        )}

        {/* Rotating 3D Phone Chassis */}
        <motion.div
          data-interactive-3d-phone="true"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  scale: smoothScale,
                  transformStyle: "preserve-3d",
                }
          }
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          {customVisual ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {customVisual}
            </div>
          ) : src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className={imageClassName}
            />
          ) : null}

          {/* Optional Z-elevated interactive layer (e.g., Act II hotspot pins or X-Ray tags) */}
          {floatingLayer && (
            <div
              style={{
                transform: shouldReduceMotion ? undefined : `translateZ(${floatingZ}px)`,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="relative w-full h-full pointer-events-auto">
                {floatingLayer}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {showHint && (
        <div
          className={`hidden md:inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono transition-opacity duration-300 ${
            hasInteracted ? "text-[#71717a] opacity-65" : "text-[#adb3b7] opacity-95"
          }`}
        >
          <Rotate3d className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
          <span>{hintText}</span>
        </div>
      )}
    </div>
  );
}
