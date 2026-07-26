// src/app/pages/project-detail/project-detail.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  
  project: Project | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.portfolioService.getProjectById(id).subscribe(project => {
        this.project = project || null;
        if (this.project) {
          this.seoService.setProjectSeo(this.project);
        }
      });
    }
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
}