// src/app/components/about/about.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo, Skill, SkillCategory } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  skills: Skill[] = [];
  skillCategories = Object.values(SkillCategory);

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });

    this.portfolioService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  getSkillsByCategory(category: SkillCategory): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getSkillPercentage(level: number): string {
    return `${level}%`;
  }
}