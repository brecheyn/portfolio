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
  skillCategories: SkillCategory[] = [];
  activeSkillIndex = 0;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => this.personalInfo = info);
    this.portfolioService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.skillCategories = Object.values(SkillCategory).filter(category =>
        this.skills.some(skill => skill.category === category)
      );
      this.activeSkillIndex = 0;
    });
  }

  getSkillsByCategory(category: SkillCategory): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getSkillPercentage(level: number): string {
    return `${level}%`;
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
