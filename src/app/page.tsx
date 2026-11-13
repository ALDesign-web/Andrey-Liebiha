import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { InteractiveSystemLab } from "@/components/InteractiveSystemLab";
import { DesignPillars } from "@/components/DesignPillars";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090a] text-[#f2f5f1] flex flex-col selection:bg-[#ff7235]/30 selection:text-white relative">
      {/* Subtle Studio Texture Grid behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px] z-0"
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative z-10">
        <Hero />
        <ProjectsShowcase />
        <InteractiveSystemLab />
        <DesignPillars />
        <ExperienceTimeline />
      </main>

      <Footer />
    </div>
  );
}
