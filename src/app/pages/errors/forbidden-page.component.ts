import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-forbidden-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="error-card">
      <strong>403</strong>
      <h2>{{ 'errors.forbidden.title' | t }}</h2>
      <p>{{ 'errors.forbidden.description' | t }}</p>
      <a routerLink="/app/dashboard">{{ 'errors.backDashboard' | t }}</a>
    </section>
  `,
  styles: [`
    .error-card {
      width: min(700px, 100%);
      margin: 0 auto;
      padding: 32px;
      border-radius: 28px;
      text-align: center;
      background: rgba(255, 252, 246, 0.76);
      border: 1px solid rgba(30, 41, 59, 0.11);
      box-shadow: 0 24px 60px rgba(71, 47, 24, 0.12);
    }

    strong,
    h2 {
      color: #172033;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
    }

    strong {
      font-size: 4rem;
    }

    p {
      color: #5f6779;
    }

    a {
      display: inline-flex;
      min-height: 44px;
      margin-top: 18px;
      padding: 0 18px;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      text-decoration: none;
      font-weight: 800;
      color: white;
      background: #172033;
    }
  `]
})
export class ForbiddenPageComponent {}
