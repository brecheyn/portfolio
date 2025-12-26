// src/app/components/projects/projects.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectCategory } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: ProjectCategory | 'ALL' = 'ALL';
  categories = Object.values(ProjectCategory);
  selectedProject: Project | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects;
    });
  }

  filterByCategory(category: ProjectCategory | 'ALL'): void {
    this.selectedCategory = category;
    if (category === 'ALL') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === category);
    }
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }
}