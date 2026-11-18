export type ProjectCategory = "all" | "ecommerce-cro" | "3d-mobile" | "ai-saas";
export type ProjectStage = "commercial" | "concept";

export interface ProjectMetric {
  label: string;
  value: string;
  change: string;
}

export interface ProjectScreen {
  src: string;
  title: string;
  caption: string;
  orientation?: "portrait" | "landscape";
  tag?: string;
}

export interface ProjectProcessStep {
  phase: string;
  title: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  platform: string;
  stage: ProjectStage;
  stageLabel: string;
  category: ProjectCategory;
  categoryLabel: string;
  imageSrc: string;
  heroMobileImage?: string;
  mockups?: ProjectScreen[];
  screens: ProjectScreen[];
  slides: string[];
  summary: string;
  challenge: string;
  solution: string;
  mobileAndMotionNotes: string;
  role: string;
  metrics: ProjectMetric[];
  processSteps: ProjectProcessStep[];
  tools: string[];
  deliverables: string[];
  featured: boolean;
  liveUrl?: string;
  behanceUrl?: string;
  figmaUrl?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  executiveSummary?: string;
  highlights: string[];
  tools: string[];
  mobileHighlights?: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  type: string;
  details: string;
}

export interface LanguageItem {
  language: string;
  level: string;
  details: string;
}

export interface CVMetadata {
  availability: string;
  location: string;
  email: string;
  telegram: string;
  behance: string;
  linkedin?: string;
  education: EducationItem;
  languages: LanguageItem[];
}

export interface SkillCategory {
  title: string;
  tag: string;
  description: string;
  iconName: string;
  skills: string[];
  focusArea: string;
}
