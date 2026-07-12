# ♿ Guide d'Accessibilité (A11y) - WCAG 2.1 AA

## 🎯 Objectif

Rendre votre portfolio accessible à **tous**, y compris les personnes en situation de handicap:
- 📱 Utilisateurs de lecteurs d'écran (NVDA, JAWS, VoiceOver)
- 🎮 Utilisateurs naviguant au clavier seul
- 👁️ Utilisateurs malvoyants (contrastes, zoom)
- 🦻 Utilisateurs sourds ou malentendants
- 🚗 Utilisateurs avec handicap moteur

---

## 📋 Audit Accessibilité Actuel

### ❌ Problèmes Identifiés

| Problème | Sévérité | Impact |
|----------|----------|--------|
| Pas d'attributs `aria-label` | 🔴 CRITIQUE | Lecteurs d'écran aveugles |
| Formulaire sans labels associés | 🔴 CRITIQUE | Impossible à utiliser |
| Images sans `alt` | 🔴 CRITIQUE | Non descriptives |
| Pas de navigation au clavier | 🔴 CRITIQUE | Utilisateurs souris morte |
| Contraste insuffisant potentiel | 🟡 MAJEUR | Malvoyants, handicap cognitif |
| Pas de ARIA role/attribute | 🟡 MAJEUR | Lecteurs d'écran confus |
| Ordre de tab illogique | 🟡 MAJEUR | Navigation confuse |
| Modales sans focus trap | 🟡 MAJEUR | Navigation déstructurée |
| Pas de landmarks ARIA | 🟡 MAJEUR | Navigation rapide impossible |

---

## ✅ Solutions Immédiates par Composant

### 1️⃣ Ajouter des Labels au Formulaire Contact

### ❌ AVANT:

```html
<form>
  <input type="text" placeholder="Votre nom">
  <input type="email" placeholder="Votre email">
  <textarea placeholder="Votre message"></textarea>
  <button>Envoyer</button>
</form>
```

### ✅ APRÈS:

```html
<form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="name">Nom <span class="required">*</span></label>
    <input
      id="name"
      type="text"
      formControlName="name"
      aria-label="Votre nom complet"
      aria-required="true"
      [attr.aria-invalid]="isFieldInvalid('name')"
      [attr.aria-describedby]="isFieldInvalid('name') ? 'name-error' : null"
      placeholder="Jean Dupont"
      required
    />
    <span 
      *ngIf="isFieldInvalid('name')" 
      id="name-error" 
      class="error" 
      role="alert"
    >
      {{ getFieldError('name') }}
    </span>
  </div>

  <div class="form-group">
    <label for="email">Email <span class="required">*</span></label>
    <input
      id="email"
      type="email"
      formControlName="email"
      aria-label="Votre adresse email"
      aria-required="true"
      [attr.aria-invalid]="isFieldInvalid('email')"
      [attr.aria-describedby]="isFieldInvalid('email') ? 'email-error' : null"
      placeholder="jean@example.com"
      required
    />
    <span 
      *ngIf="isFieldInvalid('email')" 
      id="email-error" 
      class="error" 
      role="alert"
    >
      {{ getFieldError('email') }}
    </span>
  </div>

  <div class="form-group">
    <label for="message">Message <span class="required">*</span></label>
    <textarea
      id="message"
      formControlName="message"
      aria-label="Votre message"
      aria-required="true"
      [attr.aria-invalid]="isFieldInvalid('message')"
      [attr.aria-describedby]="isFieldInvalid('message') ? 'message-error' : null"
      placeholder="Écrivez votre message..."
      rows="5"
      required
    ></textarea>
    <span 
      *ngIf="isFieldInvalid('message')" 
      id="message-error" 
      class="error" 
      role="alert"
    >
      {{ getFieldError('message') }}
    </span>
  </div>

  <app-button
    label="Envoyer"
    type="submit"
    [disabled]="!contactForm.valid || isSubmitting"
    [loading]="isSubmitting"
    ariaLabel="Envoyer le formulaire de contact"
  />
</form>
```

---

### 2️⃣ Ajouter des Images Descriptives

### ❌ AVANT:

```html
<img src="assets/profile.png" />
<img src="assets/projects/ecommerce.png" />
<img src="assets/images/tech-logo.png" />
```

### ✅ APRÈS:

```html
<!-- Image de profil -->
<img
  src="assets/images/profile.png"
  alt="Phares NADINGA, Développeur Full Stack à Ouagadougou"
  class="profile-photo"
/>

<!-- Images de projet -->
<img
  src="assets/projects/ecommerce/home.png"
  alt="Page d'accueil du projet E-Commerce Angular avec catalogue de produits"
  class="project-image"
/>
<img
  src="assets/projects/ecommerce/cart.png"
  alt="Écran du panier d'achat montrant les produits sélectionnés et le total"
  class="project-image"
/>

<!-- Logos technologie -->
<img
  src="assets/images/angular-logo.svg"
  alt="Logo Angular"
  title="Framework Angular 20.3.0"
  class="tech-logo"
/>

<!-- Images purement décoratives -->
<img
  src="assets/decorations/pattern.svg"
  alt=""  <!-- alt vide pour images purement décoratives -->
  aria-hidden="true"
  class="decoration"
/>
```

---

### 3️⃣ Ajouter des Landmarks ARIA

### ✅ Structure HTML Accessible:

```html
<!-- Main App Component -->
<div role="application" aria-label="Portfolio de Phares NADINGA">
  
  <!-- Navigation -->
  <nav aria-label="Navigation principale">
    <ul>
      <li><a href="#hero">Accueil</a></li>
      <li><a href="#about">À propos</a></li>
      <li><a href="#projects">Projets</a></li>
      <li><a href="#experience">Expérience</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <!-- Main Content -->
  <main>
    <!-- Hero Section -->
    <section 
      id="hero"
      aria-label="Section Accueil"
      role="region"
    >
      <h1>Phares NADINGA</h1>
      <p>Développeur Full Stack</p>
    </section>

    <!-- About Section -->
    <section
      id="about"
      aria-label="Section À propos"
      role="region"
      aria-describedby="about-intro"
    >
      <h2>À propos de moi</h2>
      <p id="about-intro">Passionné par le développement web et mobile...</p>
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      aria-label="Mes Projets"
      role="region"
    >
      <h2>Projets</h2>
      <article 
        *ngFor="let project of projects"
        aria-label="Projet: {{ project.title }}"
      >
        <h3>{{ project.title }}</h3>
        <!-- Contenu -->
      </article>
    </section>

    <!-- Experience Section -->
    <section
      id="experience"
      aria-label="Expérience Professionnelle"
      role="region"
    >
      <h2>Expérience</h2>
      <!-- Contenu -->
    </section>

    <!-- Contact Section -->
    <section
      id="contact"
      aria-label="Formulaire de Contact"
      role="region"
    >
      <h2>Me Contacter</h2>
      <!-- Formulaire -->
    </section>
  </main>

  <!-- Footer -->
  <footer aria-label="Pied de page">
    <p>&copy; 2024 Phares NADINGA. Tous droits réservés.</p>
  </footer>

</div>
```

---

### 4️⃣ Vérifier et Améliorer les Contrastes

### Norme WCAG 2.1 AA:
- **Texte normal:** Ratio 4.5:1 (normal vs fond)
- **Texte gros (≥18pt):** Ratio 3:1
- **Éléments graphiques:** Ratio 3:1

### ❌ MAUVAIS Contraste:

```css
/* Texte gris clair sur blanc */
color: #CCCCCC;
background: white;
/* Ratio = 2.3:1 ❌ */

/* Bouton gris pâle */
background: #F0F0F0;
color: #FFFFFF;
/* Ratio = 1.1:1 ❌ */
```

### ✅ BON Contraste:

```css
/* Texte sombre sur fond clair */
color: #333333;  /* Gris foncé */
background: white;
/* Ratio = 10.2:1 ✅ */

/* Bouton avec bon contraste */
background: #DD0031;  /* Rouge Angular */
color: #FFFFFF;
/* Ratio = 5.5:1 ✅ */

/* Lien */
color: #0066CC;  /* Bleu visiteur */
background: white;
/* Ratio = 8.59:1 ✅ */
```

### Outil de test:
- 🔧 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- 🔧 [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

---

### 5️⃣ Ajouter les Attributs ARIA Essentiels

#### Boutons:
```html
<!-- ❌ AVANT: Pas clair -->
<button class="btn">→</button>

<!-- ✅ APRÈS: Explicite -->
<button 
  class="btn"
  aria-label="Télécharger mon CV"
  title="Télécharger CV (Ctrl+D)"
>
  → Télécharger CV
</button>
```

#### Icônes:
```html
<!-- ❌ AVANT: Icône seule -->
<i class="fab fa-github"></i>

<!-- ✅ APRÈS: Avec contexte -->
<a 
  href="https://github.com/brecheyn"
  aria-label="Voir le profil GitHub de Phares NADINGA"
  title="GitHub"
>
  <i class="fab fa-github" aria-hidden="true"></i>
  <span>GitHub</span>
</a>
```

#### Sections dynamiques:
```typescript
// Annonce les mises à jour au lecteur d'écran
@ViewChild('projectsContainer') projectsContainer!: ElementRef;

filterProjects(category: string): void {
  this.filteredProjects = this.projects.filter(p => p.category === category);
  
  // Annonce le changement
  const message = `${this.filteredProjects.length} projets affichés`;
  this.announceToScreenReader(message);
}

announceToScreenReader(message: string): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 3000);
}
```

---

### 6️⃣ Navigation au Clavier

### ✅ Ajouter CSS pour Focus Visible:

```css
/* Focus visible pour tous les éléments interactifs */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid #DD0031;  /* Contraste élevé */
  outline-offset: 2px;
  border-radius: 2px;
}

/* Skip link pour sauter la nav */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #DD0031;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

### ✅ HTML avec Skip Link:

```html
<a href="#main-content" class="skip-to-content">
  Aller au contenu principal
</a>

<nav aria-label="Navigation principale">
  <!-- Navigation -->
</nav>

<main id="main-content">
  <!-- Contenu principal -->
</main>
```

---

### 7️⃣ Ordre de Tab Logique

### ❌ MAUVAIS:

```html
<input type="text" /> <!-- Tab 1 -->
<input type="email" /> <!-- Tab 3 -->
<input type="password" /> <!-- Tab 2 -->
<!-- Ordre illogique! -->
```

### ✅ BON:

```html
<!-- Respecter l'ordre DOM naturel -->
<form>
  <input type="text" placeholder="Nom" />         <!-- Tab 1 -->
  <input type="email" placeholder="Email" />      <!-- Tab 2 -->
  <input type="password" placeholder="Pass" />    <!-- Tab 3 -->
  <button type="submit">Envoyer</button>           <!-- Tab 4 -->
</form>

<!-- Si l'ordre DOM doit être changé: -->
<button tabindex="0">Important</button>            <!-- Tab 1 -->
<button tabindex="1">Moins important</button>      <!-- Tab 2 -->
<!-- Utiliser tabindex sparingly! Préférer l'ordre DOM -->
```

---

### 8️⃣ Focus Trap pour Modals

```typescript
@Component({
  selector: 'app-modal',
  // ...
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modalElement') modalElement!: ElementRef;
  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement!: HTMLElement;
  private lastFocusableElement!: HTMLElement;

  ngOnInit(): void {
    if (this.isOpen) {
      this.setupFocusTrap();
    }
  }

  /**
   * Piège le focus dans la modal
   */
  private setupFocusTrap(): void {
    setTimeout(() => {
      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      this.focusableElements = Array.from(
        this.modalElement.nativeElement.querySelectorAll(focusableSelectors)
      );

      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

      this.firstFocusableElement.focus();
    }, 100);
  }

  @HostListener('keydown.tab', ['$event'])
  handleTabKey(event: KeyboardEvent): void {
    if (event.shiftKey) {
      // Shift+Tab
      if (document.activeElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  @HostListener('keydown.escape', ['$event'])
  handleEscapeKey(): void {
    this.close.emit();
  }
}
```

---

## 🧪 Outils de Test d'Accessibilité

### Navigateur:
- 🔧 [axe DevTools](https://www.deque.com/axe/devtools/) - Extensions Chrome/Firefox
- 🔧 [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) - Intégré dans Chrome
- 🔧 [Wave](https://wave.webaim.org/extension/) - Extension Web Accessibility

### CLI:
```bash
# Installer pa11y (CLI accessibility testing)
npm install --save-dev pa11y

# Tester une page
npx pa11y http://localhost:4200

# Tester avec strict mode
npx pa11y --standard WCAG2AA http://localhost:4200
```

### Lecteurs d'écran:
- 🔊 **Windows:** NVDA (gratuit), JAWS ($90)
- 🔊 **Mac:** VoiceOver (gratuit, intégré)
- 🔊 **Navigateur:** ChromeVox (gratuit)

---

## 📝 Checklist Accessibilité

### 🔴 CRITIQUE (À faire immédiatement):
- [ ] Ajouter labels à tous les inputs
- [ ] Ajouter `alt` descriptif à toutes les images
- [ ] Tester contraste (ratio ≥ 4.5:1)
- [ ] Vérifier navigation au clavier (Tab, Enter)
- [ ] Ajouter `role="region"` aux sections principales

### 🟡 MAJEUR (À faire cette semaine):
- [ ] Ajouter aria-label/describedby aux éléments interactifs
- [ ] Ajouter landmarks ARIA (nav, main, footer)
- [ ] Implémenter focus trap dans modals
- [ ] Ajouter skip links
- [ ] Tester avec lecteur d'écran

### 🟢 À AMÉLIORER:
- [ ] Ajouter aria-live pour sections dynamiques
- [ ] Optimiser ordre du tabindex
- [ ] Ajouter aria-expanded pour accordéons
- [ ] Documenter patterns accessibles
- [ ] Tests d'accessibilité automatisés en CI

---

## 📚 Ressources

- 📖 [WCAG 2.1 Complète](https://www.w3.org/WAI/WCAG21/quickref/)
- 📖 [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- 📖 [Angular A11y Guide](https://angular.dev/guide/accessibility)
- 📖 [WebAIM Articles](https://webaim.org/articles/)
- 🎥 [Deque University](https://dequeuniversity.com/) - Formation

---

## 🎯 Objectif Final

Votre portfolio doit être utilisable par:
- ✅ Personnes aveugles avec lecteur d'écran
- ✅ Personnes malvoyantes (zoom, contraste)
- ✅ Personnes sourdes (captions si vidéo)
- ✅ Personnes sans souris (clavier seul)
- ✅ Utilisateurs de navigateurs non-graphiques
- ✅ Utilisateurs avec handicap cognitif (structure claire)

**Score cible:** WCAG 2.1 **AA** minimum (AAA si possible)

