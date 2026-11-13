"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Check, Copy, ArrowUpRight, Send, ArrowUp, FileText } from "lucide-react";
import { CV_METADATA } from "@/data/portfolioData";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CV_METADATA.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="py-16 sm:py-24 bg-[#0d0f12] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Closing Conversion Block */}
        <div className="rounded-3xl bg-[#121316] border border-white/[0.09] p-6 sm:p-12 lg:p-16 text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#e7ece5] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {CV_METADATA.availability}
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08] max-w-2xl mx-auto mb-4">
            Looking for a{" "}
            <span className="whitespace-nowrap">hands-on</span>{" "}
            <span className="text-gradient-orange">Mobile UX/UI Designer?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#adb3b7] max-w-xl mx-auto leading-relaxed mb-7 sm:mb-8">
            Happy to share live Figma files, interactive prototypes, or NDA walkthroughs tailored to your product team.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 max-w-md sm:max-w-none mx-auto">
            <a
              href={`mailto:${CV_METADATA.email}?subject=Mobile%20UX%2FUI%20Role%20Inquiry`}
              className="tm-press min-h-[48px] w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{CV_METADATA.email}</span>
            </a>

            <div className="grid grid-cols-2 sm:contents gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="tm-press min-h-[48px] px-3 sm:px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-[#f2f5f1] text-xs font-mono inline-flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#adb3b7] shrink-0" aria-hidden="true" />
                    Copy Email
                  </>
                )}
              </button>

              <a
                href={CV_METADATA.telegram}
                target="_blank"
                rel="noreferrer"
                title="Telegram @ALMotion3D"
                aria-label="Open Telegram @ALMotion3D"
                className="tm-press min-h-[48px] px-3 sm:px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-[#f2f5f1] text-xs font-mono inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#ff7235] shrink-0" aria-hidden="true" />
                <span className="sm:hidden">Telegram</span>
                <span className="hidden sm:inline">Telegram (@ALMotion3D)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 border-t border-white/[0.07] text-xs font-mono text-[#adb3b7] text-center sm:text-left">
          <div>
            Andrii Liebiha · {CV_METADATA.location}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-5">
            <a
              href={CV_METADATA.behance}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] inline-flex items-center gap-1 hover:text-[#f2f5f1] transition-colors"
            >
              Behance
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/cv"
              className="min-h-[44px] inline-flex items-center gap-1.5 hover:text-[#f2f5f1] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
              Resume / CV
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="min-h-[44px] inline-flex items-center gap-1.5 hover:text-[#f2f5f1] transition-colors"
              aria-label="Scroll back to top"
            >
              Top
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
