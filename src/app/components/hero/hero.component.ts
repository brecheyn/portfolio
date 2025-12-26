// src/app/components/hero/hero.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV(): void {
    if (this.personalInfo?.cv) {
      window.open(this.personalInfo.cv, '_blank');
    }
  }
}