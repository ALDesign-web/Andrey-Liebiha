"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidPlasmaSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
}

export function LiquidPlasmaSwitch({
  checked: controlledChecked,
  onChange,
  className = "",
}: LiquidPlasmaSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rippleKey, setRippleKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const nextState = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
    setRippleKey((prev) => prev + 1);

    // Spawn kinetic burst particles
    const color = nextState ? "#ff7235" : "#38bdf8";
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: nextState ? 100 : 28,
      y: 32,
      angle: (i * (360 / 12) + (Math.random() * 20 - 10)) * (Math.PI / 180),
      speed: 25 + Math.random() * 35,
      color: i % 2 === 0 ? color : "#ffffff",
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* SVG Goo / Plasma Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-plasma-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Main Switch Track */}
      <div
        ref={containerRef}
        role="switch"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        className="relative w-36 h-18 rounded-full p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7235] transition-all duration-300"
        style={{
          background: isChecked
            ? "radial-gradient(120% 120% at 75% 50%, rgba(255, 114, 53, 0.25), rgba(20, 20, 25, 0.95))"
            : "radial-gradient(120% 120% at 25% 50%, rgba(56, 189, 248, 0.2), rgba(18, 20, 26, 0.95))",
          boxShadow: isChecked
            ? "inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 30px rgba(255,114,53,0.3)"
            : "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.4)",
          border: isChecked
            ? "1px solid rgba(255, 114, 53, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Inner Track Glow Light Guide */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: isChecked ? "60%" : "-10%",
              opacity: [0.6, 0.85, 0.6],
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 25 },
              opacity: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            }}
            className={`w-24 h-full rounded-full blur-md ${
              isChecked ? "bg-[#ff7235]/40" : "bg-cyan-400/30"
            }`}
          />
        </div>

        {/* Shockwave Radial Wave on Snap */}
        <AnimatePresence>
          {rippleKey > 0 && (
            <motion.div
              key={rippleKey}
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute inset-0 rounded-full border-2 pointer-events-none ${
                isChecked ? "border-[#ff7235]" : "border-cyan-400"
              }`}
            />
          )}
        </AnimatePresence>

        {/* Liquid Plasma Droplets with Goo Filter */}
        <div
          className="relative w-full h-full"
          style={{ filter: "url(#liquid-plasma-goo)" }}
        >
          {/* Main Plasma Core Orb */}
          <motion.div
            layout
            animate={{
              x: isChecked ? 72 : 0,
              scaleX: [1, 1.45, 0.9, 1],
              scaleY: [1, 0.7, 1.1, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 350, damping: 24 },
              scaleX: { duration: 0.45, ease: "easeOut" },
              scaleY: { duration: 0.45, ease: "easeOut" },
            }}
            className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-lg"
            style={{
              background: isChecked
                ? "radial-gradient(circle at 35% 35%, #fff176 0%, #ff7235 55%, #d84315 100%)"
                : "radial-gradient(circle at 35% 35%, #e0f2fe 0%, #38bdf8 55%, #0284c7 100%)",
              boxShadow: isChecked
                ? "0 0 20px rgba(255, 114, 53, 0.8), inset 0 2px 4px rgba(255,255,255,0.8)"
                : "0 0 16px rgba(56, 189, 248, 0.7), inset 0 2px 4px rgba(255,255,255,0.8)",
            }}
          >
            {/* Core Specular Glint */}
            <div className="absolute top-2 left-3 w-4 h-2.5 rounded-full bg-white/70 blur-[0.6px] rotate-[-25deg] pointer-events-none" />
          </motion.div>

          {/* Secondary Liquid Satellite Droplet */}
          <motion.div
            animate={{
              x: isChecked ? [20, 60, 72] : [55, 15, 0],
              scale: isChecked ? [0.4, 0.8, 0] : [0.4, 0.8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className={`absolute top-3 left-3 w-8 h-8 rounded-full ${
              isChecked ? "bg-[#ff7235]" : "bg-cyan-400"
            }`}
          />
        </div>

        {/* Micro Emitters: Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{
                x: p.x,
                y: p.y,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: p.x + Math.cos(p.angle) * p.speed,
                y: p.y + Math.sin(p.angle) * p.speed,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* State Feedback Label */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isChecked ? "bg-[#ff7235] shadow-[0_0_8px_#ff7235]" : "bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
          }`}
        />
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
          State: <strong className={isChecked ? "text-[#ff7235]" : "text-cyan-400"}>{isChecked ? "Active Plasma (Fluid High)" : "Dormant Core (Fluid Low)"}</strong>
        </span>
      </div>
    </div>
  );
}
