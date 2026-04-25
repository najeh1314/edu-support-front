import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DashboardApiService } from '../../core/api/dashboard-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-card">
      <div>
        <h2>Welcome {{ user()?.firstName }}</h2>
        <p>Your dashboard is now connected to the backend.</p>
      </div>
      <div class="role-chip">{{ authService.normalizedRole() }}</div>
    </section>

    <section class="card-grid">
      @for (metric of dashboard().metrics; track metric.key) {
        <article class="metric-card">
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.key }}</span>
        </article>
      }
    </section>
  `,
  styles: [`
    .hero-card,.metric-card{border-radius:24px;padding:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .hero-card{display:flex;justify-content:space-between;gap:16px;align-items:center}
    .card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:18px}
    .role-chip{padding:12px 16px;border-radius:16px;background:#172033;color:#fff;font-weight:800;text-transform:capitalize}
    h2,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span{color:#5f6779}
    .metric-card strong{display:block;margin-bottom:8px;font-size:2rem}
    @media (max-width:960px){.card-grid,.hero-card{grid-template-columns:1fr;display:grid}}
  `]
})
export class DashboardPageComponent {
  protected readonly authService = inject(AuthService);
  private readonly dashboardApi = inject(DashboardApiService);

  protected readonly user = this.authService.currentUser;
  protected readonly dashboard = toSignal(this.dashboardApi.getDashboard(), { initialValue: { title: '', metrics: [] } });
}
