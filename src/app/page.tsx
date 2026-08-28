"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { InteractiveSystemLab } from "@/components/InteractiveSystemLab";
import { DesignPillars } from "@/components/DesignPillars";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08080b] bg-tech-grid text-[#f4f4f6] flex flex-col selection:bg-orange-500/30 selection:text-white relative">
      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with Statement Typography & Metrics */}
        <Hero />

        {/* 2. Selected Case Studies (Behance / Miraclesux Showcase) */}
        <ProjectsShowcase />

        {/* 3. Interactive UI & System Lab (Live Node Canvas & Token Playground) */}
        <InteractiveSystemLab />

        {/* 4. Strategic Leadership Pillars */}
        <DesignPillars />

        {/* 5. Experience Timeline & Tools Checklist */}
        <ExperienceTimeline />
      </main>

      {/* 6. Footer & Closing CTA */}
      <Footer />
    </div>
  );
}
