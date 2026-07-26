// src/app/services/translation.service.ts

import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

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
      greeting: "Disponible pour de nouveaux projets",
      cta: {
        primary: "Voir les projets",
        secondary: "Télécharger le CV"
      }
    },
    home: {
      title: "Accueil",
      subtitle: "Développeur Full Stack & Analyste Cybersécurité",
      hero: {
        tagline: "Développeur Full Stack & Analyste Cybersécurité construisant des systèmes résilients pour un impact réel.",
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
      }),
      catchError(error => {
        console.error(`Failed to load translations for ${lang}:`, error);
        this.translations = FALLBACK_TRANSLATIONS[lang] || FALLBACK_TRANSLATIONS['en'];
        return of(this.translations);
      }),
      finalize(() => {
        this.loaded.set(true);
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
    const value = this.lookup(key, this.translations)
      ?? this.lookup(key, FALLBACK_TRANSLATIONS[this.getCurrentLanguage()])
      ?? this.lookup(key, FALLBACK_TRANSLATIONS['en']);

    if (params && typeof value === 'string') {
      return Object.keys(params).reduce(
        (text, param) => text.replace(`{{${param}}}`, params[param]),
        value
      );
    }

    return typeof value === 'string' ? value : key;
  }

  private lookup(key: string, source: Record<string, any> | undefined): string | undefined {
    return key.split('.').reduce<any>((value, k) => value?.[k], source);
  }

  getCurrentLanguage(): Language {
    return this.language();
  }
}
