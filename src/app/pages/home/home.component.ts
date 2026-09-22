// src/app/pages/home/home.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  readonly imageFallback = 'assets/images/project-placeholder.svg';
  
  featuredProjects: Project[] = [];
  
  ngOnInit(): void {
    this.portfolioService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects = projects;
    });
    this.seoService.setSeoData('home.title', 'home.subtitle');
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

  getProjectImage(project: Project): string {
    return project.images?.[0] || this.imageFallback;
  }

  useImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = this.imageFallback;
  }
}
