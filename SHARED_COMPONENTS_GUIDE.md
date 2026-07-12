# 🎨 Guide des Composants Partagés (Shared Components)

## Vue d'Ensemble de l'Architecture Proposée

```
src/app/components/shared/
├── button/
│   ├── button.component.ts
│   ├── button.component.html
│   ├── button.component.css
│   └── button.component.spec.ts
├── card/
│   ├── card.component.ts
│   ├── card.component.html
│   ├── card.component.css
│   └── card.component.spec.ts
├── badge/
│   ├── badge.component.ts
│   ├── badge.component.html
│   ├── badge.component.css
│   └── badge.component.spec.ts
├── modal/
│   ├── modal.component.ts
│   ├── modal.component.html
│   ├── modal.component.css
│   └── modal.component.spec.ts
├── skill-bar/
│   ├── skill-bar.component.ts
│   ├── skill-bar.component.html
│   ├── skill-bar.component.css
│   └── skill-bar.component.spec.ts
├── project-card/
│   ├── project-card.component.ts
│   ├── project-card.component.html
│   ├── project-card.component.css
│   └── project-card.component.spec.ts
└── index.ts                        # Barrel export
```

---

## 1️⃣ Composant Button Réutilisable

### 📁 `src/app/components/shared/button/button.component.ts`

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Composant Button réutilisable et configurable
 * 
 * @example
 * <app-button 
 *   label="Click me"
 *   (click)="onButtonClick()"
 *   [disabled]="isLoading"
 *   variant="primary"
 *   size="large"
 * />
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  @Output() click = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }

  get buttonClass(): string {
    return `btn btn--${this.variant} btn--${this.size}`;
  }
}
```

### 📁 `src/app/components/shared/button/button.component.html`

```html
<button
  [class]="buttonClass"
  [disabled]="disabled || loading"
  [type]="type"
  [attr.aria-label]="ariaLabel || label"
  (click)="onClick()"
>
  <span *ngIf="!loading">{{ label }}</span>
  <span *ngIf="loading" class="btn__loader"></span>
</button>
```

### 📁 `src/app/components/shared/button/button.component.css`

```css
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Variantes */
.btn--primary {
  background-color: #dd0031;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background-color: #b8002a;
}

.btn--secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn--secondary:hover:not(:disabled) {
  background-color: #e8e8e8;
}

.btn--danger {
  background-color: #f44336;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background-color: #da190b;
}

.btn--ghost {
  background-color: transparent;
  color: #dd0031;
  border: 2px solid #dd0031;
}

.btn--ghost:hover:not(:disabled) {
  background-color: rgba(221, 0, 49, 0.1);
}

/* Sizes */
.btn--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

.btn--medium {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Loading state */
.btn__loader {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 📁 `src/app/components/shared/button/button.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    spyOn(component.click, 'emit');
    component.label = 'Test';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.click.emit).toHaveBeenCalled();
  });

  it('should not emit click when disabled', () => {
    spyOn(component.click, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.click.emit).not.toHaveBeenCalled();
  });

  it('should have correct CSS classes', () => {
    component.variant = 'primary';
    component.size = 'large';
    fixture.detectChanges();

    expect(component.buttonClass).toBe('btn btn--primary btn--large');
  });
});
```

---

## 2️⃣ Composant Card Générique

### 📁 `src/app/components/shared/card/card.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Composant Card générique pour afficher du contenu
 * 
 * @example
 * <app-card>
 *   <app-card-header>Titre</app-card-header>
 *   <app-card-body>Contenu</app-card-body>
 *   <app-card-footer>Pied de page</app-card-footer>
 * </app-card>
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() elevation: 'low' | 'medium' | 'high' = 'medium';
  @Input() hoverable: boolean = false;
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class CardHeaderComponent {}

@Component({
  selector: 'app-card-body',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class CardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class CardFooterComponent {}
```

### 📁 `src/app/components/shared/card/card.component.html`

```html
<div [ngClass]="['card', 'card--' + elevation, { 'card--hoverable': hoverable }]">
  <ng-content></ng-content>
</div>
```

### 📁 `src/app/components/shared/card/card.component.css`

```css
.card {
  border-radius: 0.5rem;
  background: white;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card--low {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.card--medium {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card--high {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card--hoverable:hover {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}
```

---

## 3️⃣ Composant Badge pour les Tags

### 📁 `src/app/components/shared/badge/badge.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Composant Badge pour afficher des étiquettes
 * 
 * @example
 * <app-badge label="Angular" variant="primary" />
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent {
  @Input() label: string = '';
  @Input() variant: BadgeVariant = 'primary';
  @Input() color?: string; // Couleur personnalisée (ex: #DD0031)

  get badgeStyle(): any {
    if (this.color) {
      return {
        backgroundColor: this.color,
        color: 'white',
      };
    }
    return {};
  }
}
```

### 📁 `src/app/components/shared/badge/badge.component.html`

```html
<span [class]="'badge badge--' + variant" [ngStyle]="badgeStyle">
  {{ label }}
</span>
```

### 📁 `src/app/components/shared/badge/badge.component.css`

```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.badge--primary {
  background-color: #dd0031;
  color: white;
}

.badge--success {
  background-color: #4caf50;
  color: white;
}

.badge--warning {
  background-color: #ff9800;
  color: white;
}

.badge--danger {
  background-color: #f44336;
  color: white;
}

.badge--info {
  background-color: #2196f3;
  color: white;
}
```

---

## 4️⃣ Composant Skill Bar

### 📁 `src/app/components/shared/skill-bar/skill-bar.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Composant Skill Bar pour afficher le niveau de compétence
 * 
 * @example
 * <app-skill-bar 
 *   skillName="Angular"
 *   level="85"
 *   color="#DD0031"
 * />
 */
@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.css'],
})
export class SkillBarComponent {
  @Input() skillName: string = '';
  @Input() level: number = 0; // 0-100
  @Input() color: string = '#DD0031';

  get progressStyle(): any {
    return {
      width: `${Math.min(this.level, 100)}%`,
      backgroundColor: this.color,
    };
  }
}
```

### 📁 `src/app/components/shared/skill-bar/skill-bar.component.html`

```html
<div class="skill-bar">
  <div class="skill-bar__header">
    <span class="skill-bar__name">{{ skillName }}</span>
    <span class="skill-bar__level">{{ level }}%</span>
  </div>
  <div class="skill-bar__container">
    <div class="skill-bar__progress" [ngStyle]="progressStyle"></div>
  </div>
</div>
```

### 📁 `src/app/components/shared/skill-bar/skill-bar.component.css`

```css
.skill-bar {
  margin-bottom: 1.5rem;
}

.skill-bar__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-bar__name {
  font-weight: 600;
  font-size: 0.875rem;
}

.skill-bar__level {
  font-size: 0.75rem;
  color: #666;
}

.skill-bar__container {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar__progress {
  height: 100%;
  transition: width 0.5s ease;
}
```

---

## 5️⃣ Composant Modal

### 📁 `src/app/components/shared/modal/modal.component.ts`

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

/**
 * Composant Modal réutilisable
 * 
 * @example
 * <app-modal 
 *   [isOpen]="isModalOpen"
 *   title="Détails du projet"
 *   (close)="closeModal()"
 * >
 *   Contenu du modal
 * </app-modal>
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() closeButtonLabel: string = 'Fermer';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }
}
```

### 📁 `src/app/components/shared/modal/modal.component.html`

```html
<div *ngIf="isOpen" class="modal-backdrop" (click)="onBackdropClick()">
  <div class="modal" (click)="$event.stopPropagation()">
    <div class="modal__header">
      <h2 class="modal__title">{{ title }}</h2>
      <button 
        class="modal__close" 
        (click)="onClose()"
        aria-label="Fermer le modal"
      >
        ×
      </button>
    </div>
    <div class="modal__body">
      <ng-content></ng-content>
    </div>
    <div class="modal__footer">
      <app-button
        [label]="closeButtonLabel"
        variant="secondary"
        (click)="onClose()"
      />
    </div>
  </div>
</div>
```

### 📁 `src/app/components/shared/modal/modal.component.css`

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.modal__close:hover {
  color: #000;
}

.modal__body {
  padding: 1.5rem;
}

.modal__footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
```

---

## 6️⃣ Barrel Export

### 📁 `src/app/components/shared/index.ts`

```typescript
// Barrel export pour faciliter les imports
export { ButtonComponent } from './button/button.component';
export { CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from './card/card.component';
export { BadgeComponent } from './badge/badge.component';
export { SkillBarComponent } from './skill-bar/skill-bar.component';
export { ModalComponent } from './modal/modal.component';

// Types
export type { ButtonVariant, ButtonSize } from './button/button.component';
export type { BadgeVariant } from './badge/badge.component';
```

---

## 📊 Exemple d'Utilisation Intégrée

### Refactoriser Projects Component

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardBodyComponent,
  BadgeComponent,
  ButtonComponent,
  ModalComponent,
} from '../shared';
import { Project, ProjectCategory } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent,
    BadgeComponent,
    ButtonComponent,
    ModalComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: ProjectCategory | 'ALL' = 'ALL';
  categories = Object.values(ProjectCategory);
  selectedProject: Project | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.filteredProjects = projects;
    });
  }

  filterByCategory(category: ProjectCategory | 'ALL'): void {
    this.selectedCategory = category;
    if (category === 'ALL') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((p) => p.category === category);
    }
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }
}
```

### Template Refactorisé

```html
<section id="projects" class="projects">
  <div class="projects__container">
    <h2 class="projects__title">Mes Projets</h2>

    <!-- Filtres -->
    <div class="projects__filters">
      <app-button
        *ngFor="let cat of categories"
        [label]="cat"
        [variant]="selectedCategory === cat ? 'primary' : 'ghost'"
        (click)="filterByCategory(cat)"
      />
      <app-button
        [label]="'Tous'"
        [variant]="selectedCategory === 'ALL' ? 'primary' : 'ghost'"
        (click)="filterByCategory('ALL')"
      />
    </div>

    <!-- Grid de projets -->
    <div class="projects__grid">
      <app-card *ngFor="let project of filteredProjects" [hoverable]="true">
        <app-card-body>
          <h3>{{ project.title }}</h3>
          <p>{{ project.shortDescription }}</p>

          <div class="project-tags">
            <app-badge
              *ngFor="let tech of project.technologies"
              [label]="tech.name"
              [color]="tech.color"
            />
          </div>

          <app-button
            label="Voir détails"
            variant="primary"
            size="small"
            (click)="openProjectDetails(project)"
          />
        </app-card-body>
      </app-card>
    </div>

    <!-- Modal de détails -->
    <app-modal
      [isOpen]="selectedProject !== null"
      [title]="selectedProject?.title || ''"
      (close)="closeProjectDetails()"
    >
      <div *ngIf="selectedProject">
        <p>{{ selectedProject.fullDescription }}</p>
        
        <h4>Fonctionnalités</h4>
        <ul>
          <li *ngFor="let feature of selectedProject.features">
            {{ feature }}
          </li>
        </ul>

        <div class="modal-buttons">
          <app-button
            *ngIf="selectedProject.githubUrl"
            label="Code source"
            variant="secondary"
            (click)="window.open(selectedProject.githubUrl, '_blank')"
          />
          <app-button
            *ngIf="selectedProject.liveUrl"
            label="Voir en direct"
            variant="primary"
            (click)="window.open(selectedProject.liveUrl, '_blank')"
          />
        </div>
      </div>
    </app-modal>
  </div>
</section>
```

---

## 🎯 Avantages de Cette Architecture

✅ **Réutilisabilité:** Chaque composant peut être utilisé dans d'autres sections  
✅ **Maintenabilité:** Modifications centralisées (ex: Button change = partout)  
✅ **Testabilité:** Composants isolés, faciles à tester  
✅ **Scalabilité:** Ajouter de nouveaux composants sans impacter existants  
✅ **Accessibilité:** Implémentée une fois dans le composant  
✅ **Performance:** OnPush strategy partout  
✅ **Consistance:** Design system centralisé  

---

## 📋 Checklist d'Implémentation

- [ ] Créer dossier `src/app/components/shared/`
- [ ] Implémenter ButtonComponent + tests
- [ ] Implémenter CardComponent + tests
- [ ] Implémenter BadgeComponent + tests
- [ ] Implémenter SkillBarComponent + tests
- [ ] Implémenter ModalComponent + tests
- [ ] Créer index.ts de barrel export
- [ ] Refactoriser ProjectsComponent
- [ ] Refactoriser ExperienceComponent
- [ ] Refactoriser AboutComponent
- [ ] Refactoriser HeroComponent
- [ ] Refactoriser ContactComponent

