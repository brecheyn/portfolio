// src/app/components/contact/contact.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalInfo } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

interface ContactForm {
  name: string;
  email: string;
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
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      // Simulation d'envoi (remplace par ton API ou service d'email)
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        
        // Reset form après 3 secondes
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      }, 1500);
    }
  }

  isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
           this.formData.email.trim() !== '' &&
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
      subject: '',
      message: ''
    };
    this.submitSuccess = false;
    this.submitError = false;
  }

  sendEmail(): void {
    if (this.personalInfo?.email) {
      window.location.href = `mailto:${this.personalInfo.email}`;
    }
  }
}