import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { TranslationService } from './core/i18n/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.scss'
})
export class App {
  private readonly translationService = inject(TranslationService);
  private readonly authService = inject(AuthService);

  constructor() {
    void this.translationService.initialize();
    if (this.authService.token()) {
      this.authService.refreshProfile().subscribe({ error: () => this.authService.logout() });
    }
  }
}
