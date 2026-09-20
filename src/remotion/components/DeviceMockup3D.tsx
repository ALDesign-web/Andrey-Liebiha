import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface DeviceMockup3DProps {
  imageSrc: string;
  url?: string;
  delay?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  zoomInto?: { x: number; y: number; zoom: number };
  className?: string;
  style?: React.CSSProperties;
}

export const DeviceMockup3D: React.FC<DeviceMockup3DProps> = ({
  imageSrc,
  url = "bookify.store/catalog/art-collections",
  delay = 0,
  rotateX = 6,
  rotateY = -8,
  rotateZ = 1,
  scale = 1,
  zoomInto,
  className = "",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 16,
      stiffness: 70,
      mass: 1.1
    }
  });

  const opacity = Math.min(Math.max(entrance, 0), 1);
  const currentScale = (0.85 + entrance * 0.15) * scale;
  const currentRotateX = (1 - entrance) * 20 + rotateX;
  const currentRotateY = (1 - entrance) * -25 + rotateY;
  const currentRotateZ = (1 - entrance) * 5 + rotateZ;
  const translateY = (1 - entrance) * 40;

  // Floating gentle motion
  const floatY = Math.sin((frame + delay * 2) * 0.04) * 6;
  const floatRotate = Math.cos((frame + delay * 2) * 0.03) * 0.5;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        perspective: 1400,
        opacity,
        ...style
      }}
    >
      <div
        className="relative rounded-2xl bg-[#121620] border border-blue-500/30 overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_50px_-10px_rgba(59,130,246,0.2)]"
        style={{
          transform: `translateY(${translateY + floatY}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotateZ(${currentRotateZ + floatRotate}deg) scale(${currentScale})`,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
      >
        {/* macOS Browser Header */}
        <div className="h-11 bg-[#0A0D14]/95 border-b border-white/10 px-4 flex items-center justify-between backdrop-blur-md">
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
          </div>

          {/* URL Pill */}
          <div className="bg-[#161B26] border border-white/10 rounded-full px-5 py-1 text-xs font-mono text-zinc-400 flex items-center space-x-2 shadow-inner">
            <span className="text-blue-400">🔒</span>
            <span className="text-zinc-200">{url}</span>
          </div>

          {/* Controls Pill */}
          <div className="flex items-center space-x-1.5 opacity-60 text-xs font-mono text-zinc-400">
            <span>95/100</span>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="relative overflow-hidden bg-[#07080C] max-h-[680px]">
          <Img
            src={imageSrc}
            className="w-full h-auto object-cover block"
            style={
              zoomInto
                ? {
                    transformOrigin: `${zoomInto.x}% ${zoomInto.y}%`,
                    transform: `scale(${zoomInto.zoom})`,
                    transition: "transform 0.5s ease-out"
                  }
                : undefined
            }
          />

          {/* Glass Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
