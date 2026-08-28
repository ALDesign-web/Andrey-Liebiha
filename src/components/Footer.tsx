"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Sparkles, ArrowUp } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "andrii.liebiha.design@gmail.com"; // Placeholder email

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-24 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-spot-orange pointer-events-none opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Main CTA Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#13141c] to-[#0d0e14] border border-white/10 text-center space-y-8 mb-16 shadow-2xl shadow-black">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready for Product Design &amp; Systems Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight max-w-3xl mx-auto leading-tight">
            Let&apos;s Build the Next <br />
            <span className="text-gradient-orange">Benchmark Experience</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Interested in scaling digital products, crafting high-converting web interfaces, 
            or elevating your team&apos;s design system? Let&apos;s connect.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/15 hover:border-orange-500/40 text-white font-mono text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer group"
            >
              <Mail className="w-4 h-4 text-orange-400" />
              <span>{emailAddress}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              )}
            </button>

            <a
              href="https://t.me/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs sm:text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Book a Call on Telegram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ANDRII LIEBIHA</span>
            <span>•</span>
            <span className="text-zinc-400">PRODUCT DESIGN ARCHITECT</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.behance.net/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Behance</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://t.me/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Telegram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
