// src/app/models/project.model.ts

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string; 
  category: ProjectCategory;
  technologies: Technology[];
  images: string[];
  demoVideo?: string; // URL vidéo YouTube/Vimeo ou GIF
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges?: string[];
  date: Date;
  featured: boolean;
}

export enum ProjectCategory {
  WEB = 'Web',
  MOBILE = 'Mobile',
  FULLSTACK = 'Full Stack',
  BACKEND = 'Backend',
  OTHER = 'Autre'
}

export interface Technology {
  name: string;
  icon?: string; // URL ou classe d'icône
  color?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 1-5 ou 1-100
  icon?: string;
}

export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Base de données',
  TOOLS = 'Outils',
  SOFT_SKILLS = 'Soft Skills'
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  photo: string;
  cv?: string;
  socials: Social[];
}

export interface Social {
  platform: SocialPlatform;
  url: string;
  icon: string;
}

export enum SocialPlatform {
  GITHUB = 'GitHub',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter',
  PORTFOLIO = 'Portfolio',
  OTHER = 'Autre'
}