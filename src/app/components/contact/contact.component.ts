// src/app/components/contact/contact.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalInfo } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
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

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      projectType: '',
      budget: '',
      timeline: '',
      subject: '',
      message: ''
    };
    this.submitSuccess = false;
    this.submitError = false;
  }

  sendEmail(): void {
    if (this.personalInfo?.email) {
      window.location.href = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent('Demande de collaboration')}`;
    }
  }
}
