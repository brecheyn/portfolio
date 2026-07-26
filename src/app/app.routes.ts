// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { 
      title: 'Phares NADINGA - Full Stack Developer',
      description: 'Full Stack Developer & Cybersecurity Analyst building resilient systems for real-world impact.'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { 
      title: 'About - Phares NADINGA',
      description: 'Full-stack engineer with 3+ years experience in web and mobile applications, specialized in offline-first architectures and predictive modeling.'
    }
  },
  {
    path: 'projects',
    component: ProjectsListComponent,
    data: { 
      title: 'Projects - Phares NADINGA',
      description: 'Portfolio of projects delivering measurable results in web, mobile, and AI applications.'
    }
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    data: { 
      title: 'Project Details - Phares NADINGA',
      description: 'Detailed view of project with problem, approach, tech stack, and results.'
    }
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    data: { 
      title: 'Experience - Phares NADINGA',
      description: 'Professional experience in full-stack development and cybersecurity analysis.'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { 
      title: 'Contact - Phares NADINGA',
      description: 'Get in touch for web, mobile, or backend development projects.'
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];