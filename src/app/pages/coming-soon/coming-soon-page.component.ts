import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="state-card">
      <span class="eyebrow">{{ 'common.comingSoon' | t }}</span>
      <h2>{{ 'comingSoon.title' | t }}</h2>
      <p>{{ 'comingSoon.description' | t }}</p>
      <a routerLink="/app/dashboard">{{ 'comingSoon.back' | t }}</a>
    </section>
  `,
  styles: [`
    .state-card {
      width: min(720px, 100%);
      margin: 0 auto;
      padding: 32px;
      border-radius: 28px;
      background: rgba(255, 252, 246, 0.76);
      border: 1px solid rgba(30, 41, 59, 0.11);
      box-shadow: 0 24px 60px rgba(71, 47, 24, 0.12);
      text-align: center;
    }

    .eyebrow {
      display: inline-flex;
      margin-bottom: 16px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 250, 240, 0.92);
      border: 1px solid rgba(217, 108, 63, 0.18);
      color: #8c3b22;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    h2 {
      margin: 0 0 12px;
      color: #172033;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
    }

    p {
      color: #5f6779;
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      margin-top: 18px;
      padding: 0 18px;
      border-radius: 14px;
      text-decoration: none;
      font-weight: 800;
      color: white;
      background: #172033;
    }
  `]
})
export class ComingSoonPageComponent {}
