// src/app/pages/projects-list/projects-list.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { Project, ProjectCategory } from '../../models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: ProjectCategory | 'ALL' = 'ALL';
  categories = Object.values(ProjectCategory);

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects;
    });
    this.seoService.setSeoData('projects.title', 'projects.subtitle');
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

  filterByCategory(category: ProjectCategory | 'ALL'): void {
    this.selectedCategory = category;
    if (category === 'ALL') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === category);
    }
  }
}