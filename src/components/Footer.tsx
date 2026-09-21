"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "liebihadesign@gmail.com";

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
        {/* Main CTA Banner — Option 2: Ultra-delicate Glass / Low-Contrast Surface */}
        <div className="p-8 sm:p-14 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] text-center space-y-8 mb-16 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready for Product Design &amp; Systems Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#f2f5f1] uppercase tracking-tight max-w-3xl mx-auto leading-tight">
            Let&apos;s Build the Next <br />
            <span className="text-gradient-orange">Benchmark Experience</span>
          </h2>

          <p className="text-sm sm:text-base text-[#adb3b7] max-w-xl mx-auto leading-relaxed">
            Interested in scaling digital products, crafting high-converting web interfaces, 
            or elevating your team&apos;s design system? Let&apos;s connect.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <button
              onClick={handleCopyEmail}
              aria-label="Copy official email address"
              title="Copy official email address"
              className="px-5 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-[#adb3b7]/15 hover:border-[#ff7235]/40 text-[#f2f5f1] font-mono text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
            >
              <Mail className="w-4 h-4 text-[#ff7235] shrink-0" />
              <span className="truncate">{emailAddress}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-[#adb3b7] group-hover:text-white transition-colors shrink-0" />
              )}
            </button>

            <a
              href="https://t.me/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold text-xs sm:text-sm shadow-lg shadow-[#ff7235]/20 hover:shadow-[#ff7235]/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Book a Call on Telegram</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-xs font-mono text-[#adb3b7]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ANDRII LIEBIHA</span>
            <span>•</span>
            <span className="text-[#e7ece5]">PRODUCT DESIGN ARCHITECT</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.behance.net/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adb3b7] hover:text-[#ff7235] transition-colors flex items-center gap-1"
            >
              <span>Behance</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adb3b7] hover:text-[#ff7235] transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://t.me/ALMotion3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adb3b7] hover:text-[#ff7235] transition-colors flex items-center gap-1"
            >
              <span>Telegram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-[#adb3b7]/20 text-[#adb3b7] hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
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
