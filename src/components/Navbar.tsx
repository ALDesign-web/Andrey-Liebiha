"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Motion Lab", href: "/#lab" },
  { label: "Approach", href: "/#pillars" },
  { label: "Experience", href: "/#experience" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#08090a]/88 backdrop-blur-md md:hidden"
        />
      )}
      <header
        onKeyDown={(e) => {
          if (e.key === "Escape" && mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }}
        className={`animate-nav-enter fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${
          scrolled
            ? "pt-[max(0.65rem,env(safe-area-inset-top))] pb-2 sm:py-3"
            : "pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:py-5"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div
          className={`w-full flex items-center justify-between px-4 sm:px-5 py-2 rounded-full transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled ? "safari-glass-scrolled" : "safari-glass"
          }`}
        >
          {/* Brand Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 min-h-[40px] rounded-full pr-2 group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center relative overflow-hidden">
              <span className="font-mono font-semibold text-xs tracking-wider text-[#f2f5f1]">
                AL
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ff7235] opacity-85" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-sm tracking-tight text-[#f2f5f1] group-hover:text-white transition-colors">
                Andrii Liebiha
              </span>
              <span className="text-[11px] font-mono text-[#adb3b7]">
                Mobile UX/UI · Motion
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 rounded-full p-1 safari-control"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-xs font-medium text-[#c4cacd] hover:text-[#f2f5f1] rounded-full hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cv"
              className="px-4 py-2 text-xs font-medium text-[#c4cacd] hover:text-[#ff7235] rounded-full hover:bg-white/[0.06] transition-colors inline-flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              CV
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-2 text-xs font-mono text-[#adb3b7] pr-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to Mobile Roles
            </span>
            <Link
              href="/#contact"
              className="tm-press min-h-[40px] px-4 py-2 rounded-full bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Drawer Trigger (minimum 44x44 touch area) */}
          <button
            type="button"
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#f2f5f1] hover:bg-white/[0.08] transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 mt-2.5">
          <nav
            id="mobile-navigation-drawer"
            data-mobile-nav-open="true"
            aria-label="Mobile navigation"
            className="mobile-nav-drawer rounded-2xl p-3.5 sm:p-4 flex flex-col gap-1 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-4 flex items-center justify-between text-sm font-medium text-[#e7ece5] hover:text-[#ff7235] rounded-xl hover:bg-white/[0.05] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#adb3b7]" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href="/cv"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-4 flex items-center justify-between text-sm font-medium text-[#e7ece5] hover:text-[#ff7235] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <span>Resume / CV</span>
              <FileText className="w-4 h-4 text-[#adb3b7]" aria-hidden="true" />
            </Link>
            <div className="pt-3 mt-2 border-t border-white/10">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="tm-press min-h-[44px] w-full rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
