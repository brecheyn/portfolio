// src/app/services/translation.service.ts

import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

// Fallback translations for critical UI text
const FALLBACK_TRANSLATIONS: Record<string, any> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact"
    },
    hero: {
      greeting: "Available for new projects",
      cta: {
        primary: "View Projects",
        secondary: "Download CV"
      }
    },
    home: {
      title: "Home",
      subtitle: "Full Stack Developer & Cybersecurity Analyst",
      hero: {
        tagline: "Full Stack Developer & Cybersecurity Analyst building resilient systems for real-world impact.",
        cta: {
          primary: "View Projects",
          secondary: "Contact"
        }
      },
      featuredProjects: {
        title: "Featured Projects",
        subtitle: "Selected work delivering measurable results",
        viewAll: "View all projects"
      }
    },
    about: {
      title: "About",
      subtitle: "Full-stack engineer focused on practical solutions"
    },
    projects: {
      title: "Projects",
      subtitle: "All projects with measurable outcomes"
    },
    experience: {
      title: "Experience",
      subtitle: "Professional journey and achievements"
    },
    contact: {
      title: "Contact",
      subtitle: "Let's discuss your project"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      experience: "Expérience",
      contact: "Contact"
    },
    hero: {
      greeting: "Disponible pour nouveaux projets",
      cta: {
        primary: "Voir les projets",
        secondary: "Télécharger CV"
      }
    },
    home: {
      title: "Accueil",
      subtitle: "Développeur Full Stack & Analyste en Cybersécurité",
      hero: {
        tagline: "Développeur Full Stack et analyste en cybersécurité construisant des systèmes résilients pour un impact réel.",
        cta: {
          primary: "Voir les projets",
          secondary: "Contact"
        }
      },
      featuredProjects: {
        title: "Projets en vedette",
        subtitle: "Travail sélectionné avec résultats mesurables",
        viewAll: "Voir tous les projets"
      }
    },
    about: {
      title: "À propos",
      subtitle: "Ingénieur full-stack focalisé sur les solutions pratiques"
    },
    projects: {
      title: "Projets",
      subtitle: "Tous les projets avec résultats mesurables"
    },
    experience: {
      title: "Expérience",
      subtitle: "Parcours professionnel et réalisations"
    },
    contact: {
      title: "Contact",
      subtitle: "Discutons de votre projet"
    }
  }
};

export type Language = 'en' | 'fr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private http = inject(HttpClient);
  private translations: Record<string, any> = {};
  private readonly STORAGE_KEY = 'portfolio-language';
  
  // Signal for reactive language changes
  language = signal<Language>(this.detectLanguage());
  
  // Signal to track if translations are loaded
  loaded = signal<boolean>(false);

  private detectLanguage(): Language {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Language;
    if (saved && ['en', 'fr'].includes(saved)) {
      return saved;
    }
    
    const browserLang = navigator.language;
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  }

  loadTranslations(lang: Language): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`assets/i18n/${lang}.json`).pipe(
      tap(translations => {
        this.translations = translations;
        this.loaded.set(true);
      }),
      catchError(error => {
        console.error(`Failed to load translations for ${lang}:`, error);
        // Use fallback translations
        this.translations = FALLBACK_TRANSLATIONS[lang] || FALLBACK_TRANSLATIONS['en'];
        this.loaded.set(true);
        return of(this.translations);
      })
    );
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.loadTranslations(lang).subscribe();
  }

  getTranslations(): Record<string, any> {
    return this.translations;
  }

  t(key: string, params?: Record<string, string>): string {
    const keys = key.split('.');
    let value: any = this.translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    if (params && typeof value === 'string') {
      Object.keys(params).forEach(param => {
        value = value['replace'](`{{${param}}}`, params[param]);
      });
    }
    
    return typeof value === 'string' ? value : key;
  }

  getCurrentLanguage(): Language {
    return this.language();
  }
}