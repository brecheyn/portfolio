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
    bio: 'Passionné par le développement de solutions robustes et innovantes, je combine expertise technique et vision produit pour créer des applications web et mobiles performantes.',
    email: 'yienouyaban@gmail.com',
    phone: '+226 54441150',
    location: 'Ouagadougou, Burkina Faso',
    photo: 'assets/images/profile.png',
    cv: 'assets/cv/cvNadinga.pdf',
    socials: [
      { platform: SocialPlatform.GITHUB, url: 'https://github.com/brecheyn', icon: 'fab fa-github' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/in/phares-nadinga', icon: 'fab fa-linkedin' },
    ]
  };

  private projects: Project[] = [
    {
      id: 'zawani',
      title: 'ZAWANI',
      shortDescription: 'Annuaire intelligent pour commerces locaux',
      fullDescription: 'Application mobile de mise en relation entre clients et commerces de proximité avec recherche géolocalisée et notation par IA.',
      category: ProjectCategory.FULLSTACK,
      technologies: [
        { name: 'Flask', color: '#000000' },
        { name: 'React', color: '#61DAFB' },
        { name: 'PostgreSQL', color: '#336791' },
        { name: 'Firebase', color: '#FFCA28' },
        { name: 'Capacitor', color: '#119EFF' }
      ],
      images: ['assets/images/zawani-main.png'],
      githubUrl: 'https://github.com/brecheyn/zawani',
      features: [
        'Recherche géolocalisée',
        'Notation intelligente des avis via IA',
        'Mode hors-ligne partiel',
        'Tableau de bord de statistiques'
      ],
      challenges: [
        'Synchronisation des données en temps réel',
        'Intégration de l\'IA pour l\'analyse sémantique',
        'Optimisation du rendu mobile via Capacitor'
      ],
      date: new Date('2024-12-01'),
      featured: true
    },
    {
      id: 'spotify-predictor',
      title: 'Spotify Popularity Predictor',
      shortDescription: 'IA de prédiction de popularité musicale',
      fullDescription: 'Modèle de deep learning prédisant la popularité des chansons Spotify basé sur leurs caractéristiques audio.',
      category: ProjectCategory.BACKEND,
      technologies: [
        { name: 'Python', color: '#3776AB' },
        { name: 'TensorFlow', color: '#FF6F00' },
        { name: 'Scikit-learn', color: '#F7931E' },
        { name: 'Pandas', color: '#150458' }
      ],
      images: ['assets/images/spotify-predictor.png'],
      githubUrl: 'https://github.com/brecheyn/spotify-popularity-predictor',
      features: [
        'Réseau de neurones profond (Dense layers)',
        'Analyse de 15 caractéristiques audio',
        'Précision de 85.67%',
        'Notebooks d\'exploration de données'
      ],
      challenges: [
        'Équilibrage des classes de données',
        'Optimisation des hyperparamètres',
        'Gestion des caractéristiques audio corrélées'
      ],
      date: new Date('2024-08-10'),
      featured: true
    },
    {
      id: 'cl-creator',
      title: 'CL-Creator',
      shortDescription: 'Générateur de lettres de motivation par IA',
      fullDescription: 'Outil intelligent utilisant l\'IA Groq pour générer des lettres de motivation personnalisées à partir d\'un CV.',
      category: ProjectCategory.WEB,
      technologies: [
        { name: 'React', color: '#61DAFB' },
        { name: 'Groq IA', color: '#F36F21' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Vite', color: '#646CFF' }
      ],
      images: ['assets/images/cl-creator.png'],
      githubUrl: 'https://github.com/brecheyn/cl-creator',
      features: [
        'Génération instantanée via Groq',
        'Upload de CV au format PDF',
        'Exportation directe des documents',
        'Interface minimaliste et rapide'
      ],
      date: new Date('2024-10-05'),
      featured: false
    }
  ];

  private experiences: Experience[] = [
    {
      id: 'inviis',
      company: 'Inviis',
      position: 'Stage Full Stack Developer',
      startDate: new Date('2025-08-04'),
      current: true,
      description: 'Développement d\'applications web et mobiles à fort trafic.',
      achievements: [
        'Optimisation des performances backend de 40%',
        'Déploiement de solutions conteneurisées avec Docker',
        'Mise en place de tests automatisés'
      ],
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Docker']
    }
  ];

  private skills: Skill[] = [
    { name: 'JavaScript', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'TypeScript', category: SkillCategory.FRONTEND, level: 80 },
    { name: 'Angular', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'React', category: SkillCategory.FRONTEND, level: 80 },
    { name: 'Node.js', category: SkillCategory.BACKEND, level: 80 },
    { name: 'Python', category: SkillCategory.BACKEND, level: 85 },
    { name: 'Flask', category: SkillCategory.BACKEND, level: 75 },
    { name: 'Django', category: SkillCategory.BACKEND, level: 70 },
    { name: 'MongoDB', category: SkillCategory.DATABASE, level: 75 },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: 80 },
    { name: 'Docker', category: SkillCategory.TOOLS, level: 70 },
    { name: 'Git', category: SkillCategory.TOOLS, level: 90 },
    { name: 'Figma', category: SkillCategory.TOOLS, level: 75 }
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
