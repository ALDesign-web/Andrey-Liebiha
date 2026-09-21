export type ProjectCategory = 
  | "all" 
  | "ecommerce-cro" 
  | "3d-mobile" 
  | "ai-saas";

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  imageSrc: string;
  slides: string[];
  summary: string;
  challenge: string;
  solution: string;
  role: string;
  metrics: ProjectMetric[];
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
  details?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
  details: string;
}

export interface CVMetadata {
  availability: string;
  location: string;
  education: EducationItem;
  languages: LanguageItem[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}

