// src/app/services/seo.service.ts

import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private translationService = inject(TranslationService);

  setSeoData(
    titleKey: string,
    descriptionKey: string,
    image?: string
  ): void {
    const title = this.translationService.t(titleKey);
    const description = this.translationService.t(descriptionKey);

    // Set page title
    this.title.setTitle(title);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: description });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    } else {
      // Default OG image - user should provide their own
      this.meta.updateTag({ property: 'og:image', content: '/assets/og-image.png' });
    }

    // Set Twitter card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  setProjectSeo(project: {
    title: string;
    shortDescription: string;
    images?: string[];
  }): void {
    this.title.setTitle(`${project.title} | Phares NADINGA`);
    
    this.meta.updateTag({ name: 'description', content: project.shortDescription });
    this.meta.updateTag({ property: 'og:title', content: project.title });
    this.meta.updateTag({ property: 'og:description', content: project.shortDescription });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    
    if (project.images && project.images.length > 0) {
      this.meta.updateTag({ property: 'og:image', content: project.images[0] });
    }
  }
}