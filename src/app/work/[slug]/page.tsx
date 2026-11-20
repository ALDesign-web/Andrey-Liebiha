import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";
import { ExpeditionMahjongStory } from "@/components/mahjong/ExpeditionMahjongStory";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    ...PROJECTS_DATA.map((project) => ({
      slug: project.slug,
    })),
    { slug: "luro" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug === "luro" ? "kinetix-ai" : slug;
  const project = PROJECTS_DATA.find((p) => p.slug === normalizedSlug);

  if (!project) {
    return {
      title: "Case Study Not Found | Andrii Liebiha",
    };
  }

  return {
    title: `${project.title} | Andrii Liebiha Portfolio`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = slug === "luro" ? "kinetix-ai" : slug;
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === normalizedSlug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = PROJECTS_DATA[currentIndex];
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f2f5f1] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {project.slug === "expedition-mahjong" ? (
          <ExpeditionMahjongStory project={project} nextProject={nextProject} />
        ) : (
          <CaseStudyDetail project={project} nextProject={nextProject} />
        )}
      </main>
      <Footer />
    </div>
  );
}

