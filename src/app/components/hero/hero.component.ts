// src/app/components/hero/hero.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HeroComponent implements OnInit, OnDestroy {
  personalInfo: PersonalInfo | null = null;
  currentSlide = 0;
  readonly slides = [
    {
      icon: 'fas fa-chart-line',
      kicker: 'Stratégie produit',
      title: 'Des solutions pensées pour vos objectifs business',
      description: 'Cadrage du besoin, priorisation des fonctionnalités et choix techniques adaptés à votre marché.',
      metric: 'Vision claire'
    },
    {
      icon: 'fas fa-code',
      kicker: 'Développement',
      title: 'Applications web et mobiles robustes',
      description: 'Interfaces modernes, backends fiables et intégrations propres pour livrer un produit exploitable.',
      metric: 'Code maintenable'
    },
    {
      icon: 'fas fa-gauge-high',
      kicker: 'Performance',
      title: 'Expériences rapides, fluides et accessibles',
      description: 'Optimisation du chargement, responsive soigné et parcours utilisateurs simples à comprendre.',
      metric: 'UX efficace'
    },
    {
      icon: 'fas fa-handshake',
      kicker: 'Accompagnement',
      title: 'Un partenaire technique impliqué après la livraison',
      description: 'Maintenance, amélioration continue et conseils pour faire évoluer votre solution avec méthode.',
      metric: 'Suivi durable'
    }
  ];
  private autoSlideTimer: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  /**
   * Démarre le carousel automatique
   */
  private startAutoSlide(): void {
    this.autoSlideTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000); // Change tous les 5 secondes
  }

  /**
   * Redémarre le timer du carousel
   */
  private resetAutoSlide(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
    this.startAutoSlide();
  }

  /**
   * Aller au slide suivant
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoSlide();
  }

  /**
   * Aller au slide précédent
   */
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoSlide();
  }

  /**
   * Aller à un slide spécifique
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  pauseAutoSlide(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  resumeAutoSlide(): void {
    this.resetAutoSlide();
  }

  /**
   * Scroller vers une section
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Télécharger le CV
   */
  downloadCV(): void {
    if (this.personalInfo?.cv) {
      window.open(this.personalInfo.cv, '_blank');
    }
  }
}
