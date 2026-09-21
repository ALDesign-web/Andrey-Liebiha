"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Selected Works", href: "#projects" },
    { label: "Interactive Lab", href: "#lab" },
    { label: "Design Pillars", href: "#pillars" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-nav-enter ${
          isScrolled ? "py-2.5 sm:py-4" : "py-3.5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav
            className={`w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-[#1f2024]/85 backdrop-blur-xl border border-[#adb3b7]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                : "bg-white/[0.04] backdrop-blur-md border border-[#adb3b7]/15"
            }`}
          >
            {/* Left: Brand / Title */}
            <Link
              href="/"
              className="flex items-center gap-3 group text-sm font-medium tracking-tight"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff7235] to-[#ffa043] flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-[#ff7235]/20 group-hover:scale-105 transition-transform">
                AL
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-tight flex items-center gap-1.5">
                  Andrii Liebiha
                </span>
                <span className="text-[11px] text-[#adb3b7] hidden sm:inline whitespace-nowrap">
                  Senior Product Designer
                </span>
              </div>
            </Link>

            {/* Center: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-[#adb3b7]/10 rounded-full px-3 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[13px] font-medium text-[#adb3b7] hover:text-white rounded-full hover:bg-white/[0.06] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Availability Badge & CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Availability Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Product Roles</span>
              </div>

              {/* Action Button */}
              <a
                href="https://t.me/ALMotion3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-medium text-xs shadow-lg shadow-[#ff7235]/25 hover:shadow-[#ff7235]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#adb3b7] hover:text-white hover:bg-white/5 active:scale-95 rounded-full transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden p-6 rounded-3xl bg-[#18181b]/95 backdrop-blur-2xl border border-[#adb3b7]/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col gap-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#adb3b7]/15">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Product Design &amp; Systems Roles
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-200 hover:text-[#ff7235] py-2 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://t.me/ALMotion3D"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-[#ff7235] hover:bg-[#ff854d] text-white font-medium text-sm shadow-[0_4px_24px_rgba(255,114,53,0.3)] flex items-center justify-center gap-2 transition-all"
              >
                <span>Book a Call on Telegram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
