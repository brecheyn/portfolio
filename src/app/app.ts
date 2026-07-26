import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private translationService = inject(TranslationService);
  private themeService = inject(ThemeService);

  // Expose loaded state for template
  translationsLoaded = this.translationService.loaded;

  ngOnInit(): void {
    // Load initial translations
    this.translationService.loadTranslations(this.translationService.getCurrentLanguage()).subscribe();
  }
}
