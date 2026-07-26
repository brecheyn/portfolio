// src/app/services/theme.service.ts

import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  
  // Signal for reactive theme changes
  theme = signal<Theme>(this.detectTheme());

  private detectTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (saved && ['light', 'dark'].includes(saved)) {
      return saved;
    }
    
    // Default to dark mode
    return 'dark';
  }

  constructor() {
    // Apply theme on initialization
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
    });
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): Theme {
    return this.theme();
  }
}