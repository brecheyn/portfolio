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
    bio: 'Expert en ingénierie logicielle et intelligence artificielle, je conçois des systèmes critiques alliant performance et résilience. Mon expertise couvre le cycle complet de développement : de l\'architecture Offline-First mobile à la modélisation prédictive complexe.',
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
      fullDescription: 'Système d’alerte précoce conçu pour prédire le risque de pics épidémiques de paludisme deux semaines à l’avance. Le projet combine machine learning interprétable (GAM), données climatiques, épidémiologiques et application mobile afin d’aider les acteurs de santé publique.',
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
        'Prédiction du risque à 2 semaines (Modèles GAM)',
        'Classification en 4 niveaux opérationnels : Normal, Vigilance, Alerte, Urgence',
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
      id: 'btp-pilot',
      title: 'BTP-Pilot',
      shortDescription: 'Gestion intelligente de grands chantiers BTP',
      fullDescription: 'Suite logicielle d\'entreprise conçue pour transformer la gestion des chantiers en Afrique. Résout les problèmes critiques de rupture de stock, de retards imprévus et de manque de visibilité. Projet Pilote : Ring Road de Ouagadougou - Phase 2.',
      category: ProjectCategory.MOBILE,
      technologies: [
        { name: 'Flutter', color: '#02569B' },
        { name: 'Dart', color: '#0175C2' },
        { name: 'SQLite', color: '#003B57' },
        { name: 'Material 3', color: '#6750A4' }
      ],
      images: ['assets/images/btp-pilot-main.png'],
      githubUrl: 'https://github.com/brecheyn/btp-pilot',
      features: [
        'Architecture Offline-First avec SyncQueue persistant',
        'Design System modulaire (52 écrans, 11 modules)',
        'Gestion Multi-Persona dynamique (6 rôles utilisateurs)',
        'UI prédictive pour retours d\'IA et ruptures de stock',
        'Visualisation de données (Gantt et Matrices de risques)'
      ],
      challenges: [
        'Synchronisation asynchrone résiliente en zones blanches',
        'Gestion complexe de la sérialisation JSON pour la file d\'attente',
        'Implémentation d\'un thème double (Deep Navy & Construction Orange)'
      ],
      date: new Date('2025-06-01'),
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
      id: 'inviis-pro',
      company: 'InViis',
      position: 'Développeur Full Stack',
      startDate: new Date('2026-04-01'),
      current: true,
      description: 'Développement de solutions critiques, pilotage technique du projet PaluGuard et BTP-Pilot.',
      achievements: [
        'Conception de l\'architecture Offline-First résiliente pour BTP-Pilot',
        'Mise en œuvre du moteur de prédiction intelligent PaluGuard',
        'Optimisation des APIs Backend (FastAPI) et Mobile (Flutter)'
      ],
      technologies: ['FastAPI', 'Flutter', 'Python', 'SQLite', 'Docker']
    },
    {
      id: 'inviis-intern',
      company: 'InViis',
      position: 'Stagiaire (Web, Mobile & IoT)',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-10-01'),
      current: false,
      description: 'Stage d’apprentissage et de perfectionnement au sein de INVIIS portant sur des projets innovants.',
      achievements: [
        'Développement d’un site vitrine avec Vue.js et Vite',
        'Réalisation d’une application mobile avec Flutter et GetX',
        'Mise en pratique d’outils IoT (PlatformIO, ESP32) avec panneaux LED P10',
        'Exploration de la modélisation 3D'
      ],
      technologies: ['Vue.js', 'Flutter', 'PlatformIO', 'ESP32', 'Vite', 'IoT']
    }
  ];

  private skills: Skill[] = [
    // --- FRONTEND & MOBILE ---
    { name: 'Flutter & Dart (Expert)', category: SkillCategory.FRONTEND, level: 95 },
    { name: 'Architecture Offline-First (SyncQueue)', category: SkillCategory.FRONTEND, level: 95 },
    { name: 'Material 3 & Design System', category: SkillCategory.FRONTEND, level: 90 },
    { name: 'Angular / React / Vue.js', category: SkillCategory.FRONTEND, level: 85 },
    { name: 'TypeScript / JavaScript', category: SkillCategory.FRONTEND, level: 90 },
    { name: 'HTML5 / CSS3 (SASS/Tailwind)', category: SkillCategory.FRONTEND, level: 92 },

    // --- BACKEND & IA ---
    { name: 'Python (FastAPI / Flask / Django)', category: SkillCategory.BACKEND, level: 95 },
    { name: 'Machine Learning (PyGAM / TensorFlow)', category: SkillCategory.BACKEND, level: 90 },
    { name: 'Programmation POO (Java / Python)', category: SkillCategory.BACKEND, level: 90 },
    { name: 'Node.js & Express', category: SkillCategory.BACKEND, level: 85 },
    { name: 'PHP & Laravel', category: SkillCategory.BACKEND, level: 80 },
    { name: 'C (Système)', category: SkillCategory.BACKEND, level: 75 },

    // --- DONNÉES ---
    { name: 'SQL (PostgreSQL / SQLite / MySQL)', category: SkillCategory.DATABASE, level: 92 },
    { name: 'Modélisation Merise / UML', category: SkillCategory.DATABASE, level: 90 },
    { name: 'MongoDB (NoSQL)', category: SkillCategory.DATABASE, level: 80 },
    { name: 'Modélisation de données relationnelles', category: SkillCategory.DATABASE, level: 88 },

    // --- OUTILS & EXPERTISE ---
    { name: 'Git / GitHub / CI-CD', category: SkillCategory.TOOLS, level: 95 },
    { name: 'Docker & Conteneurisation', category: SkillCategory.TOOLS, level: 88 },
    { name: 'IoT (PlatformIO / ESP32 / Arduino)', category: SkillCategory.TOOLS, level: 85 },
    { name: 'Analyste Cybersécurité & Réseaux', category: SkillCategory.TOOLS, level: 82 },
    { name: 'Figma & Design UI/UX', category: SkillCategory.TOOLS, level: 80 },
    { name: 'Modélisation 3D', category: SkillCategory.TOOLS, level: 70 }
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
