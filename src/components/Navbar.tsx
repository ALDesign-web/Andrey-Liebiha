"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, FileText } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2.5 sm:py-4" : "py-3.5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav
            className={`w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-[#0f1015]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                : "bg-white/[0.04] backdrop-blur-md border border-white/[0.08]"
            }`}
          >
            {/* Left: Brand / Title */}
            <Link
              href="/"
              className="flex items-center gap-3 group text-sm font-medium tracking-tight"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                AL
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-tight flex items-center gap-1.5">
                  Andrii Liebiha
                </span>
                <span className="text-[11px] text-zinc-400 hidden sm:inline whitespace-nowrap">
                  Senior Product Designer
                </span>
              </div>
            </Link>

            {/* Center: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-full px-3 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-colors"
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
                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-medium text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              aria-label="Toggle Navigation Menu"
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
            className="fixed inset-x-4 top-24 z-40 lg:hidden p-6 rounded-3xl bg-[#0f1015]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
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
                  className="text-lg font-medium text-zinc-200 hover:text-orange-400 py-2 transition-colors flex items-center justify-between"
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
                className="w-full text-center py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
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
