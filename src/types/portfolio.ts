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
  highlights: string[];
  tools: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}
