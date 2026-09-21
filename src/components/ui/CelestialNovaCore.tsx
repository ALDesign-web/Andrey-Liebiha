"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NovaSpark {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

const COLOR_MODES = [
  {
    name: "Solar Flare",
    primary: "#ff7235",
    secondary: "#fbbf24",
    accent: "#ffedd5",
    glow: "rgba(255, 114, 53, 0.4)",
  },
  {
    name: "Electric Cyan",
    primary: "#38bdf8",
    secondary: "#06b6d4",
    accent: "#e0f2fe",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  {
    name: "Cosmic Violet",
    primary: "#c084fc",
    secondary: "#ec4899",
    accent: "#fae8ff",
    glow: "rgba(192, 132, 252, 0.4)",
  },
];

export function CelestialNovaCore({ className = "" }: { className?: string }) {
  const [modeIndex, setModeIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [sparks, setSparks] = useState<NovaSpark[]>([]);
  const [novaKey, setNovaKey] = useState(0);

  // 3D Parallax Tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeColor = COLOR_MODES[modeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate tilt
    setRotateX(-(y / (rect.height / 2)) * 18);
    setRotateY((x / (rect.width / 2)) * 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleDetonate = () => {
    setIsExploding(true);
    setNovaKey((prev) => prev + 1);

    // Cycle to next chromatic energy spectrum
    setModeIndex((prev) => (prev + 1) % COLOR_MODES.length);

    // Generate radial spark burst
    const sparkCount = 28;
    const newSparks: NovaSpark[] = Array.from({ length: sparkCount }, (_, i) => {
      const angle = (i * (360 / sparkCount) + (Math.random() * 15 - 7.5)) * (Math.PI / 180);
      return {
        id: Date.now() + i,
        x: 0,
        y: 0,
        angle,
        distance: 60 + Math.random() * 95,
        size: 2 + Math.random() * 3.5,
        color: i % 2 === 0 ? activeColor.primary : activeColor.secondary,
      };
    });

    setSparks(newSparks);
    setTimeout(() => {
      setIsExploding(false);
      setSparks([]);
    }, 850);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleDetonate}
      className={`relative w-full h-[280px] sm:h-[320px] rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden group perspective-1000 ${className}`}
      style={{
        background: "radial-gradient(140% 140% at 50% 50%, rgba(20, 22, 28, 0.95) 0%, rgba(10, 11, 15, 0.98) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 36px rgba(0,0,0,0.6)",
      }}
    >
      {/* Dynamic Specular Atmosphere Bloom */}
      <motion.div
        animate={{
          opacity: isExploding ? 0.9 : 0.25,
          scale: isExploding ? 1.5 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none rounded-2xl blur-3xl transition-colors duration-700"
        style={{ background: activeColor.glow }}
      />

      {/* Floating Starlight Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-6 left-10 w-1 h-1 rounded-full bg-white animate-ping" />
        <div className="absolute bottom-10 right-14 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
        <div className="absolute top-12 right-20 w-1 h-1 rounded-full bg-white/40" />
      </div>

      {/* 3D Gyro Platform */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
      >
        {/* Shockwave Rings on Nova Explosion */}
        <AnimatePresence>
          {novaKey > 0 && (
            <>
              <motion.div
                key={`shock-1-${novaKey}`}
                initial={{ scale: 0.4, opacity: 1, borderWidth: "3px" }}
                animate={{ scale: 2.2, opacity: 0, borderWidth: "1px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-36 h-36 rounded-full pointer-events-none"
                style={{ borderColor: activeColor.primary }}
              />
              <motion.div
                key={`shock-2-${novaKey}`}
                initial={{ scale: 0.2, opacity: 0.8, borderWidth: "2px" }}
                animate={{ scale: 1.8, opacity: 0, borderWidth: "0.5px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                className="absolute w-36 h-36 rounded-full pointer-events-none"
                style={{ borderColor: activeColor.secondary }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Outer Orbital Ring 1: Equatorial with Orbiting Moon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-white/10 pointer-events-none"
          style={{
            transform: "rotateX(68deg) rotateY(15deg)",
            boxShadow: `0 0 15px ${activeColor.glow}`,
          }}
        >
          {/* Orbiting Satellite Node */}
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full shadow-lg"
            style={{
              background: activeColor.accent,
              boxShadow: `0 0 12px ${activeColor.primary}`,
            }}
          />
        </motion.div>

        {/* Middle Orbital Ring 2: Counter-Rotating Inclined Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed pointer-events-none"
          style={{
            transform: "rotateX(-55deg) rotateY(30deg)",
            borderColor: activeColor.secondary,
            opacity: 0.5,
          }}
        />

        {/* Central Luminous Celestial Core Sphere */}
        <motion.div
          animate={{
            scale: isExploding ? [1, 0.75, 1.35, 1] : [1, 1.06, 1],
          }}
          transition={{
            scale: isExploding
              ? { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }
              : { repeat: Infinity, duration: 3, ease: "easeInOut" },
          }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${activeColor.accent} 0%, ${activeColor.primary} 45%, ${activeColor.secondary} 80%, rgba(0,0,0,0.9) 100%)`,
            boxShadow: `0 0 40px ${activeColor.primary}, 0 0 80px ${activeColor.glow}, inset 0 2px 8px rgba(255,255,255,0.8)`,
          }}
        >
          {/* Core Corona Shimmer */}
          <motion.div
            animate={{ rotate: 360, opacity: [0.6, 0.9, 0.6] }}
            transition={{
              rotate: { repeat: Infinity, duration: 15, ease: "linear" },
              opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="absolute inset-1 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 60% 40%, transparent 40%, ${activeColor.primary} 90%)`,
            }}
          />

          {/* Core Specular Glare */}
          <div className="absolute top-2.5 left-4 w-6 h-3 rounded-full bg-white/80 blur-[0.8px] rotate-[-30deg] pointer-events-none" />
        </motion.div>

        {/* Exploding Nova Photon Sparks */}
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.span
              key={spark.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: Math.cos(spark.angle) * spark.distance,
                y: Math.sin(spark.angle) * spark.distance,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-full pointer-events-none shadow-md"
              style={{
                width: spark.size,
                height: spark.size,
                backgroundColor: spark.color,
                boxShadow: `0 0 8px ${spark.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Guidance & Spectrum Indicator */}
      <div className="absolute bottom-3.5 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500"
            style={{ backgroundColor: activeColor.primary }}
          />
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
            Spectrum: <strong className="text-white">{activeColor.name}</strong>
          </span>
        </div>

        <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:text-white transition-colors">
          TAP TO DETONATE
        </span>
      </div>
    </div>
  );
}
