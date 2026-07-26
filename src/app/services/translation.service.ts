// src/app/services/translation.service.ts

import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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