// src/app/pages/experience/experience.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { Experience } from '../../models/project.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  
  experiences: Experience[] = [];

  ngOnInit(): void {
    this.portfolioService.getExperiences().subscribe(experiences => {
      this.experiences = experiences.sort((a, b) => 
        b.startDate.getTime() - a.startDate.getTime()
      );
    });
    this.seoService.setSeoData('experience.title', 'experience.subtitle');
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
  }

  getDuration(startDate: Date, endDate: Date | undefined): string {
    const end = endDate || new Date();
    const months = (end.getFullYear() - startDate.getFullYear()) * 12 + 
                   (end.getMonth() - startDate.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
    } else if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mois`;
    }
  }
}