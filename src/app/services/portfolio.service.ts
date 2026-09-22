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
      fullDescription: "Système d'alerte précoce conçu pour prédire le risque de pics épidémiques de paludisme deux semaines à l'avance. Le projet combine machine learning interprétable (GAM), données climatiques, épidémiologiques et application mobile afin d'aider les acteurs de santé publique.",
      category: ProjectCategory.FULLSTACK,
      technologies: [
        { name: 'Flutter', color: '#02569B', justification: 'UI native performante pour les zones à faible connectivité' },
        { name: 'FastAPI', color: '#05998B', justification: 'API haute performance avec validation automatique' },
        { name: 'Python', color: '#3776AB', justification: 'Écosystème riche pour le machine learning' },
        { name: 'PyGAM', color: '#FFD43B', justification: 'Modèles interprétables pour la santé publique' },
        { name: 'Mapbox', color: '#4264FB', justification: 'Cartographie offline-first intégrée' },
        { name: 'SQLite', color: '#003B57', justification: 'Base embarquée pour fonctionnement sans serveur' }
      ],
      images: [
        'assets/images/projects/paluguard/dashboard.png',
        'assets/images/projects/paluguard/map.png',
        'assets/images/projects/paluguard/alerts.png',
        'assets/images/projects/paluguard/reports.png',
        'assets/images/projects/paluguard/profile.png',
        'assets/images/projects/paluguard/welcome.png',
        'assets/images/projects/paluguard/register.png',
        'assets/images/projects/paluguard/login.png',
        'assets/images/projects/paluguard/admin.png'
      ],
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
      featured: true,
      problem: 'Les acteurs de santé au Burkina Faso manquaient d\'outils prédictifs fiables pour anticiper les épidémies de paludisme, entraînant des réponses tardives et inefficaces.',
      approach: 'Développement d\'un système offline-first avec modèles GAM (Generalized Additive Models) pour capturer les relations non linéaires entre données climatiques et cas de paludisme, intégré à une application mobile Flutter.',
      techStackJustification: 'L\'architecture offline-first permet le fonctionnement dans les zones sans connectivité, tandis que les modèles GAM offrent l\'interprétabilité nécessaire pour la prise de décision en santé publique.',
      results: 'Précision de prédiction de 87% sur les données historiques, déployé dans 3 districts sanitaires pilotes, permettant une anticipation moyenne de 14 jours des pics épidémiques.'
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
      images: ['assets/images/projects/btp-pilot-main.png'],
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
      images: [
        'assets/images/projects/zawani/home.jpeg',
        'assets/images/projects/zawani/commerces.jpeg',
        'assets/images/projects/zawani/detailsSurUnCommerce.jpeg',
        'assets/images/projects/zawani/favoris.jpeg',
        'assets/images/projects/zawani/profile.jpeg',
        'assets/images/projects/zawani/login.jpeg',
        'assets/images/projects/zawani/register.jpeg',
        'assets/images/projects/zawani/Splash.jpeg'
      ],
      githubUrl: 'https://github.com/PANK4SS/zawani',
      features: [
        'Recherche géolocalisée',
        'Notation intelligente des avis via IA',
        'Mode hors-ligne partiel',
        'Tableau de bord de statistiques'
      ],
      problem: 'Les clients ont besoin de trouver rapidement des commerces locaux fiables, proches et bien documentes, tandis que les commercants manquent souvent de visibilite numerique.',
      approach: 'Creation d\'une application mobile full stack avec geolocalisation, authentification Firebase, fiches commerces detaillees, favoris synchronises et analyse semantique des commentaires.',
      results: 'Le projet propose un annuaire mobile complet avec recherche par categorie, tri par distance, partage WhatsApp, dashboard de statistiques et mode hors-ligne partiel.',
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
        { name: 'Angular', color: '#3776AB' },
        { name: 'Laravel', color: '#FF6F00' },
        { name: 'Mysql', color: '#F7931E' },
        { name: 'Render,Aiven-io', color: '#150458' }
      ],
      images: [
        'assets/images/projects/spotify-predictor/results.png',
        'assets/images/projects/spotify-predictor/model-architecture.png',
        'assets/images/projects/spotify-predictor/dataset.png',
        'assets/images/projects/spotify-predictor/prediction-code.png',
        'assets/images/projects/spotify-predictor/structure.png'
      ],
      githubUrl: 'https://github.com/brecheyn/spotify_predictors',
      features: [
        'Réseau de neurones profond (Dense layers)',
        'Analyse de 15 caractéristiques audio',
        'Précision de 85.67%',
        'Notebooks d\'exploration de données'
      ],
      problem: 'Identifier la popularite potentielle d\'une chanson Spotify a partir de ses caracteristiques audio comme la danceability, l\'energy, le tempo, la loudness ou la valence.',
      approach: 'Construction d\'un reseau de neurones profond avec TensorFlow, preprocessing Scikit-learn, notebooks d\'exploration et pipeline de prediction reutilisable.',
      results: 'Le modele atteint 85.67% d\'accuracy, 82.34% de precision, 81.23% de recall et 92.34% d\'AUC sur le jeu de test.',
      date: new Date('2024-08-10'),
      featured: true
    },
    {
      id: 'Alodo_metric',
      title: 'Alodo Metric',
      shortDescription: 'Diagnostic de solidité financière pour MPME',
      fullDescription: 'Application mobile de diagnostic de solidité financière pour les très petites entreprises (TPE) et micro-entreprises (MPME),centré sur les dimensions Finance et Commercial, avec un parcours public (introduction → questionnaire → résultat) et un back-office permettant d\'ajouter ou supprimer des questions ou option dynamiquement.',
      category: ProjectCategory.FULLSTACK,
      technologies: [
        { name: 'Python', color: '#3776AB' },
        { name: 'TensorFlow', color: '#FF6F00' },
        { name: 'Scikit-learn', color: '#F7931E' },
        { name: 'Pandas', color: '#150458' }
      ],
      images: [
        'assets/images/projects/Alodo_metric/home.png',
        'assets/images/projects/Alodo_metric/home1.png',
        'assets/images/projects/Alodo_metric/test.png',
        'assets/images/projects/Alodo_metric/result.png',
        'assets/images/projects/Alodo_metric/result1.png',
        'assets/images/projects/Alodo_metric/result2.png'
      ],
      githubUrl:'https://github.com/brecheyn/ALODO-MPME-CHALLENGE-NADINGA-Y-PHARES.git',
      liveUrl: 'https://alodo-metic.vercel.app',
      features: [
        'Questionnaire dynamique avec scoring automatique',
        'Parcours utilisateur public et back-office administrateur',
        'Visualisation des résultats avec recommandations personnalisées',
        'Gestion des questions et options dynamiques via le back-office'
      ],
      problem: 'Test de competivite de Alodo_Tech au Benin pour les MPME, necessitant un outil de diagnostic de solidite financiere et commerciale pour les TPE et micro-entreprises.',
      approach: 'Développement d\'un outils web avec un questionnaire dynamique, scoring automatique, visualisation des résultats et recommandations personnalisées, ainsi qu\'un back-office pour la gestion des questions et options.',
      date: new Date('2026-08-10'),
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
      images: [
        'assets/images/projects/cl-creator/landing.png',
        'assets/images/projects/cl-creator/cv-input.png',
        'assets/images/projects/cl-creator/offer-input.png',
        'assets/images/projects/cl-creator/result.png'
      ],
      githubUrl: 'https://github.com/brecheyn/cl-creator',
      liveUrl: 'https://clcreator.vercel.app',
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
