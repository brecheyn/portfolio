import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Portfolio - Phares NADINGA';
}