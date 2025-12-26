// src/app/components/experience/experience.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getExperiences().subscribe(experiences => {
      this.experiences = experiences.sort((a, b) => 
        b.startDate.getTime() - a.startDate.getTime()
      );
    });
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