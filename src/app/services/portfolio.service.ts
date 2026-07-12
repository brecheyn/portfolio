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
    title: 'Développeur Full Stack • Analyste Cybersécurité',
    bio: 'Passionné par le développement de solutions robustes et innovantes, je combine expertise technique en développement Full Stack et vision sécurisée (Analyste Cybersécurité) pour créer des applications performantes.',
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
      id: 'paluguard',
      title: 'PaluGuard',
      shortDescription: 'Système intelligent de prédiction du risque de paludisme au Burkina Faso',
      fullDescription: 'Système d’alerte précoce conçu pour prédire le risque de pics épidémiques de paludisme deux semaines à l’avance en combinant machine learning interprétable, données climatiques et épidémiologiques.',
      category: ProjectCategory.FULLSTACK,
      technologies: [
        { name: 'Flutter', color: '#02569B' },
        { name: 'FastAPI', color: '#05998B' },
        { name: 'Python', color: '#3776AB' },
        { name: 'PyGAM', color: '#FFD43B' },
        { name: 'Mapbox', color: '#4264FB' },
        { name: 'SQLite', color: '#003B57' }
      ],
      images: ['assets/images/paluguard-main.png'],
      githubUrl: 'https://github.com/brecheyn/paluguard',
      features: [
        'Prédiction du risque à 2 semaines avec modèles GAM',
        'Classification en 4 niveaux : Normal, Vigilance, Alerte, Urgence',
        'Carte interactive des zones à risque (Mapbox)',
        'Tableau de bord épidémiologique complet',
        'Gestion des rôles (RBAC) et authentification JWT'
      ],
      challenges: [
        'Modélisation des relations non linéaires (climat vs épidémie)',
        'Interprétabilité des modèles pour les acteurs de santé',
        'Intégration de données hétérogènes (NDVI, précipitations, cas)'
      ],
      date: new Date('2026-04-01'),
      featured: true
    },
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
      date: new Date('2024-08-10'),
      featured: true
    }
  ];

  private experiences: Experience[] = [
    {
      id: 'inviis-pro',
      company: 'InViis',
      position: 'Développeur Full Stack',
      startDate: new Date('2026-04-01'),
      current: true,
      description: 'Travail sur des solutions critiques, notamment le projet PaluGuard.',
      achievements: [
        'Développement du système intelligent PaluGuard',
        'Architecture modulaire Backend (FastAPI) et Mobile (Flutter)',
        'Mise en œuvre de modèles prédictifs GAM'
      ],
      technologies: ['FastAPI', 'Flutter', 'Python', 'PyGAM', 'Docker']
    },
    {
      id: 'inviis-intern',
      company: 'InViis',
      position: 'Stagiaire (Web, Mobile & IoT)',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-10-01'),
      current: false,
      description: 'Stage d’apprentissage et de perfectionnement au sein de INVIIS, travaillant sur des projets innovants en développement web, mobile et IoT.',
      achievements: [
        'Développement d’un site vitrine avec Vue.js et Vite',
        'Réalisation d’une application mobile avec Flutter et GetX',
        'Mise en pratique d’outils IoT (PlatformIO, ESP32) avec panneaux LED P10 et buzzer'
      ],
      technologies: ['Vue.js', 'Flutter', 'PlatformIO', 'ESP32', 'Vite', 'IoT']
    }
  ];

  private skills: Skill[] = [
    { name: 'JavaScript / TypeScript', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'Angular', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'Flutter', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'React / Vue.js', category: SkillCategory.FRONTEND, level: 80 },
    { name: 'Python (FastAPI/Flask)', category: SkillCategory.BACKEND, level: 90 },
    { name: 'Machine Learning (GAM/DL)', category: SkillCategory.BACKEND, level: 80 },
    { name: 'Node.js', category: SkillCategory.BACKEND, level: 80 },
    { name: 'SQL / PostgreSQL', category: SkillCategory.DATABASE, level: 85 },
    { name: 'MongoDB', category: SkillCategory.DATABASE, level: 75 },
    { name: 'Git / Docker', category: SkillCategory.TOOLS, level: 90 },
    { name: 'Cybersécurité', category: SkillCategory.TOOLS, level: 75 },
    { name: 'IoT / PlatformIO', category: SkillCategory.TOOLS, level: 80 }
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
