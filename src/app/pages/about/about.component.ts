// src/app/pages/about/about.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { PersonalInfo, Skill, SkillCategory } from '../../models/project.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  
  personalInfo: PersonalInfo | null = null;
  skills: Skill[] = [];
  skillCategories: SkillCategory[] = [];
  activeSkillIndex = 0;

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => this.personalInfo = info);
    this.portfolioService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.skillCategories = Object.values(SkillCategory).filter(category =>
        this.skills.some(skill => skill.category === category)
      );
      this.activeSkillIndex = 0;
    });
    this.seoService.setSeoData('about.title', 'about.subtitle');
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

  getSkillsByCategory(category: SkillCategory): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  prevSkillSlide(): void {
    if (!this.skillCategories.length) return;
    this.activeSkillIndex =
      (this.activeSkillIndex - 1 + this.skillCategories.length) % this.skillCategories.length;
  }

  nextSkillSlide(): void {
    if (!this.skillCategories.length) return;
    this.activeSkillIndex = (this.activeSkillIndex + 1) % this.skillCategories.length;
  }

  goToSkillSlide(index: number): void {
    this.activeSkillIndex = index;
  }
}