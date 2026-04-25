import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      @for (language of translationService.availableLanguages; track language) {
        <button
          type="button"
          [class.active]="translationService.currentLanguage() === language"
          (click)="translationService.use(language)"
        >
          {{ language.toUpperCase() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .language-switcher {
      display: inline-flex;
      gap: 6px;
      padding: 6px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.66);
      border: 1px solid rgba(23, 32, 51, 0.08);
    }

    button {
      min-width: 46px;
      min-height: 36px;
      border: 0;
      border-radius: 12px;
      background: transparent;
      color: #5f6779;
      font-weight: 800;
      cursor: pointer;
    }

    button.active {
      background: #172033;
      color: white;
    }
  `]
})
export class LanguageSwitcherComponent {
  protected readonly translationService = inject(TranslationService);
}
