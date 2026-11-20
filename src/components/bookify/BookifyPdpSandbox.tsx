"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { PDP_TABS } from "./bookifyData";

const SPRING_SMOOTH = { type: "spring" as const, stiffness: 200, damping: 24, mass: 1 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 };

interface BookifyPdpSandboxProps {
  onOpenScreen?: (src: string) => void;
}

export function BookifyPdpSandbox({ onOpenScreen }: BookifyPdpSandboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [sandboxMode, setSandboxMode] = useState<"screens" | "live">("screens");
  const [activeTabId, setActiveTabId] = useState<"details" | "reviews" | "checkout">("checkout");

  // Live 45s Checkout Simulator state
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [completedDuration, setCompletedDuration] = useState<number | null>(null);

  const activeTab = PDP_TABS.find((t) => t.id === activeTabId) ?? PDP_TABS[0];

  useEffect(() => {
    if (startedAt === null || completedDuration !== null) return;
    const interval = window.setInterval(() => {
      setElapsedSec((Date.now() - startedAt) / 1000);
    }, 100);
    return () => window.clearInterval(interval);
  }, [startedAt, completedDuration]);

  const markInteractionStart = () => {
    if (startedAt === null) {
      setStartedAt(Date.now());
    }
    if (formError) setFormError(null);
  };

  const handleAutofill = () => {
    const start = startedAt ?? Date.now();
    if (startedAt === null) setStartedAt(start);
    setFullName("Olena Kovalenko");
    setEmail("olena.collector@kyiv-art.ua");
    setPhone("+380 67 412 89 10");
    setFormError(null);
  };

  const handleSubmitExpressOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError("Complete Full Name, Email, and Telephone Number, or tap Autofill Sample.");
      return;
    }
    const finalSeconds =
      startedAt !== null ? Math.max(1.2, Number(((Date.now() - startedAt) / 1000).toFixed(1))) : 3.8;
    setElapsedSec(finalSeconds);
    setCompletedDuration(finalSeconds);
    setFormError(null);
  };

  const handleResetDemo = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setQuantity(1);
    setStartedAt(null);
    setElapsedSec(0);
    setCompletedDuration(null);
    setFormError(null);
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235]">
            Interactive Proof Stage
          </p>
          <p className="text-sm text-[#adb3b7] mt-1">
            Switch between pixel-aligned Bookify browser captures or test the live 3-field inline form.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Sandbox presentation mode"
          className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 self-start sm:self-auto"
        >
          {[
            { id: "screens" as const, label: "Inspect Real Screens" },
            { id: "live" as const, label: "Try Live 45s Checkout" },
          ].map((mode) => {
            const active = sandboxMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSandboxMode(mode.id)}
                className={`relative min-h-[40px] px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  active ? "text-[#08090a] font-semibold" : "text-[#adb3b7] hover:text-[#f2f5f1]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bookify-sandbox-mode-pill"
                    transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                    className="absolute inset-0 rounded-full bg-[#ff7235]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {mode.id === "live" && <Zap className="w-3.5 h-3.5" aria-hidden="true" />}
                  {mode.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {sandboxMode === "screens" ? (
          <motion.div
            key="mode-screens"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, transition: { duration: 0.14 } }
            }
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Left 7 cols: Real Production Browser Capture */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/[0.11] bg-[#121316] p-2 sm:p-3 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between px-2 pb-2.5">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="text-[11px] font-mono text-[#adb3b7] truncate max-w-[230px] sm:max-w-none">
                    bookify.com.ua/books/classics/joan-blaeu-atlas-maior
                  </span>
                  {onOpenScreen ? (
                    <button
                      type="button"
                      onClick={() => onOpenScreen(activeTab.src)}
                      className="min-h-[32px] min-w-[32px] px-2 rounded-lg text-[11px] font-mono text-[#adb3b7] hover:text-[#f2f5f1] hover:bg-white/[0.06] inline-flex items-center gap-1 transition-colors"
                      aria-label={`Open full resolution view of ${activeTab.label}`}
                    >
                      <Maximize2 className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
                      <span className="hidden sm:inline">Zoom</span>
                    </button>
                  ) : (
                    <span className="w-6" />
                  )}
                </div>

                <div className="relative aspect-[1600/1341] w-full rounded-xl overflow-hidden bg-white border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.id}
                      initial={shouldReduceMotion ? false : { opacity: 0.35 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.22 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeTab.src}
                        alt={activeTab.alt}
                        width={1600}
                        height={1341}
                        unoptimized
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Interactive 3-Tab Controller & CRO Reasoning */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <div
                  role="tablist"
                  aria-label="Inspect Bookify product page states"
                  className="grid grid-cols-3 border-b border-white/[0.12] mb-6"
                >
                  {PDP_TABS.map((tab) => {
                    const isSelected = tab.id === activeTabId;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`relative min-h-[48px] px-2 py-3 text-xs sm:text-sm font-medium text-center transition-colors ${
                          isSelected ? "text-[#f2f5f1]" : "text-[#adb3b7] hover:text-[#f2f5f1]"
                        }`}
                      >
                        <span>{tab.label}</span>
                        {isSelected && (
                          <motion.span
                            layoutId="bookify-pdp-tab-indicator"
                            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                            className="absolute inset-x-2 bottom-0 h-[2px] bg-[#ff7235]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -6, transition: { duration: 0.14 } }
                    }
                    transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
                    className="space-y-5"
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff7235]">
                      <span className="w-2 h-2 rounded-full bg-[#ff7235]" aria-hidden="true" />
                      <span>{activeTab.metric}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.15]">
                      {activeTab.headline}
                    </h3>

                    <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
                      {activeTab.description}
                    </p>

                    <ul className="space-y-3 pt-4 border-t border-white/[0.08]">
                      {activeTab.highlightPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-[#e7ece5]">
                          <CheckCircle2
                            className="w-4 h-4 text-[#ff7235] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSandboxMode("live")}
                  className="tm-press min-h-[46px] w-full sm:w-auto px-5 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Zap className="w-4 h-4" aria-hidden="true" />
                  Launch Live 45s Checkout Demo
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mode-live"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, transition: { duration: 0.14 } }
            }
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
            className="rounded-3xl bg-[#121316] border border-white/[0.1] p-4 sm:p-8"
          >
            {/* Interactive Top Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#f2f5f1] tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                  <span>{elapsedSec.toFixed(1)}s</span>
                  <span className="text-[#adb3b7]">/ 108s legacy</span>
                </div>
                {completedDuration === null && (
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="tm-press min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#ff7235]/15 hover:bg-[#ff7235]/25 border border-[#ff7235]/35 text-xs font-mono text-[#ff8547] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Autofill Sample
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetDemo}
                className="min-h-[38px] px-3 py-1.5 rounded-full text-xs font-mono text-[#adb3b7] hover:text-[#f2f5f1] hover:bg-white/[0.06] inline-flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset Form
              </button>
            </div>

            {/* Faithful Bookify White Museum Surface */}
            <div className="rounded-2xl bg-white text-[#141517] p-5 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-[#e5e7eb]">
                <div className="md:col-span-4">
                  <div className="relative aspect-[1600/1177] rounded-xl overflow-hidden border border-[#e5e7eb] bg-[#f8f9fa]">
                    <Image
                      src="/projects/bookify/crop_atlas_spread.webp"
                      alt="Joan Blaeu Atlas Maior spread preview inside express checkout simulator"
                      width={1600}
                      height={1177}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#5c6268]">
                        Home / Books / Classics
                      </p>
                      <h3 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#141517] mt-1">
                        Joan Blaeu. Atlas Maior Of 1665
                      </h3>
                      <p className="text-xs font-mono text-[#5c6268] mt-1">
                        Hardcover · 24.7 x 37.5 cm · 4.27 kg · 512 pages
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141517] tabular-nums">
                        ${quantity * 260}
                      </span>
                      <p className="text-xs text-[#5c6268]">Free collector shipping</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-xl bg-[#f3f4f6] border border-[#e5e7eb] p-1">
                      <button
                        type="button"
                        onClick={() => {
                          markInteractionStart();
                          setQuantity((q) => Math.max(1, q - 1));
                        }}
                        aria-label="Decrease book quantity"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#141517] hover:bg-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          markInteractionStart();
                          setQuantity((q) => Math.min(9, q + 1));
                        }}
                        aria-label="Increase book quantity"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#141517] hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-mono text-[#5c6268]">
                      Active Tab: Purchase Now (Zero Page Redirects)
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Tab Underline Row */}
              <div className="grid grid-cols-3 border-b border-[#e5e7eb] text-center text-xs sm:text-sm font-medium text-[#6b7280]">
                <div className="py-3">Product Details</div>
                <div className="py-3">Rating &amp; Reviews</div>
                <div className="py-3 text-[#141517] font-semibold border-b-2 border-[#141517]">
                  Purchase Now
                </div>
              </div>

              {/* Live 3-Field Form or Confirmation */}
              <div className="pt-6">
                {completedDuration !== null ? (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                    className="rounded-xl bg-[#ecfdf5] border border-[#10b981]/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-6 h-6 text-[#059669] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-base font-semibold text-[#064e3b]">
                          Order placed in {completedDuration.toFixed(1)}s without leaving the product page
                        </p>
                        <p className="text-sm text-[#065f46] mt-0.5">
                          {quantity}x Joan Blaeu Atlas Maior (${quantity * 260}) confirmed for {fullName} ({email}).
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetDemo}
                      className="tm-press min-h-[42px] px-4 py-2 rounded-lg bg-[#065f46] hover:bg-[#047857] text-white text-xs font-semibold shrink-0 transition-colors"
                    >
                      Run Again
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitExpressOrder} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <label className="block">
                        <span className="sr-only">Full Name</span>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            markInteractionStart();
                            setFullName(e.target.value);
                          }}
                          placeholder="FULL NAME"
                          className="w-full min-h-[46px] px-3.5 rounded-lg border border-[#d1d5db] bg-white text-sm text-[#141517] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ff7235] focus:ring-2 focus:ring-[#ff7235]/20"
                        />
                      </label>
                      <label className="block">
                        <span className="sr-only">Email Address</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            markInteractionStart();
                            setEmail(e.target.value);
                          }}
                          placeholder="E-MAIL"
                          className="w-full min-h-[46px] px-3.5 rounded-lg border border-[#d1d5db] bg-white text-sm text-[#141517] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ff7235] focus:ring-2 focus:ring-[#ff7235]/20"
                        />
                      </label>
                      <label className="block">
                        <span className="sr-only">Telephone Number</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            markInteractionStart();
                            setPhone(e.target.value);
                          }}
                          placeholder="TELEPHONE NUMBER"
                          className="w-full min-h-[46px] px-3.5 rounded-lg border border-[#d1d5db] bg-white text-sm text-[#141517] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ff7235] focus:ring-2 focus:ring-[#ff7235]/20"
                        />
                      </label>
                      <button
                        type="submit"
                        className="tm-press min-h-[46px] px-5 rounded-lg bg-[#2f3235] hover:bg-[#141517] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
                      >
                        BUY NOW · ${quantity * 260}
                      </button>
                    </div>
                    {formError && (
                      <p role="alert" className="text-xs font-medium text-[#dc2626]">
                        {formError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
