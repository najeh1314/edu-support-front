import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../components/language-switcher.component';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <div class="public-layout">
      <header class="public-header">
        <a class="brand" routerLink="/">EduSupport</a>

        <div class="header-actions">
          <nav class="public-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              {{ 'nav.home' | t }}
            </a>
            <a routerLink="/login" routerLinkActive="active">{{ 'nav.login' | t }}</a>
            <a routerLink="/register" routerLinkActive="active">Register</a>
            <a routerLink="/coming-soon" routerLinkActive="active">{{ 'common.comingSoon' | t }}</a>
          </nav>

          <app-language-switcher />
        </div>
      </header>

      <router-outlet />
    </div>
  `,
  styles: [`
    .public-layout {
      min-height: 100vh;
      padding: 24px clamp(18px, 4vw, 42px) 48px;
    }

    .public-header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      width: min(1200px, 100%);
      margin: 0 auto 26px;
    }

    .header-actions,
    .public-nav {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .brand {
      text-decoration: none;
      color: #172033;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
    }

    .public-nav a {
      text-decoration: none;
      color: #5f6779;
      font-weight: 700;
    }

    .public-nav a.active {
      color: #172033;
    }

    @media (max-width: 800px) {
      .public-header,
      .header-actions,
      .public-nav {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class PublicLayoutComponent {}
