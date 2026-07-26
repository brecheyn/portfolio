// src/app/pages/contact/contact.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SeoService } from '../../services/seo.service';
import { PersonalInfo } from '../../models/project.model';

interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  
  personalInfo: PersonalInfo | null = null;
  
  formData: ContactForm = {
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
    this.seoService.setSeoData('contact.title', 'contact.subtitle');
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

  onSubmit(): void {
    if (!this.isFormValid() || !this.personalInfo?.email) {
      this.submitError = true;
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const subject = encodeURIComponent(`[Portfolio] ${this.formData.subject}`);
    const body = encodeURIComponent(
      `Nom: ${this.formData.name}\n` +
      `Email: ${this.formData.email}\n` +
      `Type de projet: ${this.formData.projectType}\n` +
      `Budget: ${this.formData.budget || 'A definir'}\n` +
      `Delai souhaite: ${this.formData.timeline}\n\n` +
      `Message:\n${this.formData.message}`
    );

    window.location.href = `mailto:${this.personalInfo.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
    }, 700);
  }

  isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.projectType.trim() !== '' &&
           this.formData.timeline.trim() !== '' &&
           this.formData.subject.trim() !== '' &&
           this.formData.message.trim() !== '' &&
           this.isValidEmail(this.formData.email);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}