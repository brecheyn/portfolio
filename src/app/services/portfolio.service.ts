// src/app/services/portfolio.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project, Experience, Skill, PersonalInfo, ProjectCategory, SkillCategory, SocialPlatform } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private personalInfo: PersonalInfo = {
    name: 'NADINGA Yienouyaba Phares',
    title: 'Développeur Full Stack • ByN',
    bio: 'Passionné par le développement web et mobile, je crée des solutions innovantes et performantes. Je suis aussi connu sous le pseudo @brecheyn.',
    email: 'yienouyaban@gmail.com',
    phone: '+226 54441150',
    location: 'Ouagadougou, Burkina Faso',
    photo: 'assets/images/profile.png',
    cv: 'assets/cv/cvNadinga.pdf',
    socials: [
      { platform: SocialPlatform.GITHUB, url: 'https://github.com/brecheyn', icon: 'fab fa-github' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/in/', icon: 'fab fa-linkedin' },
    ]
  };

  private projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Angular',
      shortDescription: 'Plateforme e-commerce complète avec panier et paiement',
      fullDescription: 'Application e-commerce développée avec Angular, permettant la gestion complète d\'un catalogue produits, panier d\'achat, et système de paiement intégré.',
      category: ProjectCategory.WEB,
      technologies: [
        { name: 'Angular', color: '#DD0031' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'RxJS', color: '#B7178C' },
        { name: 'Firebase', color: '#FFCA28' }
      ],
      images: ['assets/images/project-placeholder.svg'],
      githubUrl: 'https://github.com/brecheyn',
      features: [
        'Authentification utilisateur',
        'Gestion du panier',
        'Filtrage et recherche de produits',
        'Interface responsive',
        'Tableau de bord admin'
      ],
      challenges: [
        'Gestion d\'état complexe avec RxJS',
        'Optimisation des performances',
        'Intégration du système de paiement'
      ],
      date: new Date('2024-06-15'),
      featured: true
    },
    {
      id: '2',
      title: 'API REST Node.js',
      shortDescription: 'API sécurisée pour application mobile',
      fullDescription: 'API RESTful développée avec Node.js et Express, incluant authentification JWT, validation des données et documentation Swagger.',
      category: ProjectCategory.BACKEND,
      technologies: [
        { name: 'Node.js', color: '#339933' },
        { name: 'Express', color: '#000000' },
        { name: 'MongoDB', color: '#47A248' },
        { name: 'JWT', color: '#000000' }
      ],
      images: ['assets/images/project-placeholder.svg'],
      githubUrl: 'https://github.com/brecheyn',
      features: [
        'Authentification JWT',
        'CRUD complet',
        'Validation des données',
        'Documentation Swagger',
        'Tests unitaires'
      ],
      date: new Date('2024-03-20'),
      featured: false
    }
  ];

  private experiences: Experience[] = [
    {
      id: '1',
      company: 'Inviis',
      position: 'Stage en développement mobile et web',
      startDate: new Date('2025-08-04'),
      current: true,
      description: 'Développement d\'applications web et mobiles',
      achievements: [
        'Développement d\'une application web et d\'une application mobile',
        'Amélioration des performances de 40%',
      ],
      technologies: ['Vite', 'Vue.js', 'Node.js', 'MongoDB', 'Docker']
    },
    {
      id: '2',
      company: 'Projet Freelance',
      position: 'Développeur Frontend',
      startDate: new Date('2022-06-01'),
      endDate: new Date('2022-12-31'),
      current: false,
      description: 'Développement d\'interfaces utilisateur modernes et responsives',
      achievements: [
        'Refonte complète de 3 sites web',
        'Intégration de designs Figma',
        'Optimisation SEO'
      ],
      technologies: ['Angular', 'React', 'Tailwind CSS']
    }
  ];

  private skills: Skill[] = [
  // Langages de programmation
  { name: 'JavaScript', category: SkillCategory.FRONTEND, level: 80 },
  { name: 'TypeScript', category: SkillCategory.FRONTEND, level: 80 },
  { name: 'Python', category: SkillCategory.BACKEND, level: 80 },
  { name: 'PHP', category: SkillCategory.BACKEND, level: 80 },
  { name: 'Java', category: SkillCategory.BACKEND, level: 80 },
  { name: 'HTML/CSS', category: SkillCategory.FRONTEND, level: 90 },
  
  // Frameworks Frontend
  { name: 'Angular', category: SkillCategory.FRONTEND, level: 85 },
  { name: 'React', category: SkillCategory.FRONTEND, level: 80 },
  { name: 'Vue + Vite', category: SkillCategory.FRONTEND, level: 80 },
  { name: 'Bootstrap', category: SkillCategory.FRONTEND, level: 80 },
  
  // Frameworks Backend
  { name: 'Node.js', category: SkillCategory.BACKEND, level: 75 },
  { name: 'Express', category: SkillCategory.BACKEND, level: 70 },
  { name: 'Django', category: SkillCategory.BACKEND, level: 80 },
  { name: 'Flask', category: SkillCategory.BACKEND, level: 80 },
  { name: 'Laravel', category: SkillCategory.BACKEND, level: 80 },
  
  // Bases de données
  { name: 'MongoDB', category: SkillCategory.DATABASE, level: 65 },
  { name: 'MySQL', category: SkillCategory.DATABASE, level: 70 }, // Si tu l'utilises
  
  // Outils et DevOps
  { name: 'Git', category: SkillCategory.TOOLS, level: 80 },
  { name: 'Docker', category: SkillCategory.TOOLS, level: 60 },
  { name: 'Metasploit', category: SkillCategory.TOOLS, level: 80 },
  
  // Design
  { name: 'Figma', category: SkillCategory.TOOLS, level: 80 },
  { name: 'Canva', category: SkillCategory.TOOLS, level: 80 },
];

  constructor() { }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of(this.personalInfo);
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.projects.filter(p => p.featured));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }

  getProjectsByCategory(category: ProjectCategory): Observable<Project[]> {
    return of(this.projects.filter(p => p.category === category));
  }

  getExperiences(): Observable<Experience[]> {
    return of(this.experiences);
  }

  getSkills(): Observable<Skill[]> {
    return of(this.skills);
  }

  getSkillsByCategory(category: SkillCategory): Observable<Skill[]> {
    return of(this.skills.filter(s => s.category === category));
  }
}
