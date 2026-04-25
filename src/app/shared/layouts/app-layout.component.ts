import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageSwitcherComponent } from '../components/language-switcher.component';
import { TranslatePipe } from '../pipes/translate.pipe';

interface NavigationItem {
  labelKey: string;
  path: string;
}

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <div class="app-shell" [class.student]="normalizedRole() === 'student'" [class.teacher]="normalizedRole() === 'teacher'" [class.admin]="normalizedRole() === 'admin'">
      <aside class="sidebar">
        <a class="brand" routerLink="/app/dashboard">
          <span>{{ currentUser()?.avatar }}</span>
          <div>
            <strong>EduSupport</strong>
            <small>{{ ('roles.' + normalizedRole()) | t }}</small>
          </div>
        </a>

        <nav class="menu">
          @for (item of navItems(); track item.path) {
            <a routerLinkActive="active" [routerLink]="item.path">{{ item.labelKey | t }}</a>
          }
        </nav>

        <div class="side-card">
          <strong>{{ currentUser()?.firstName }} {{ currentUser()?.lastName }}</strong>
          <p>{{ currentUser()?.email }}</p>
          <small>{{ currentUser()?.level }}</small>
        </div>
      </aside>

      <div class="main-area">
        <header class="toolbar">
          <div>
            <p class="overline">{{ 'common.platform' | t }}</p>
            <h1>{{ pageTitle() | t }}</h1>
          </div>

          <div class="toolbar-actions">
            <app-language-switcher />
            <button type="button" (click)="logout()">{{ 'common.logout' | t }}</button>
          </div>
        </header>

        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .app-shell {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: 100vh;
    }

    .sidebar {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100vh;
      padding: 24px 20px;
      color: white;
      background: linear-gradient(180deg, #172033, #24324a);
    }

    .app-shell.teacher .sidebar {
      background: linear-gradient(180deg, #1f5f78, #173b55);
    }

    .app-shell.admin .sidebar {
      background: linear-gradient(180deg, #4d2d52, #2f1b35);
    }

    .brand {
      display: flex;
      gap: 12px;
      align-items: center;
      color: white;
      text-decoration: none;
    }

    .brand span {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.16);
      font-weight: 800;
    }

    .brand strong {
      display: block;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
    }

    .brand small,
    .side-card p,
    .side-card small {
      color: rgba(255, 255, 255, 0.72);
    }

    .menu {
      display: grid;
      gap: 8px;
    }

    .menu a {
      padding: 12px 14px;
      border-radius: 14px;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.82);
      font-weight: 600;
    }

    .menu a.active,
    .menu a:hover {
      color: white;
      background: rgba(255, 255, 255, 0.12);
    }

    .side-card {
      margin-top: auto;
      padding: 18px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.08);
    }

    .main-area {
      padding: 28px;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
      margin-bottom: 24px;
    }

    .overline {
      margin: 0 0 8px;
      color: #8c3b22;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.78rem;
      font-weight: 700;
    }

    h1 {
      margin: 0;
      color: #172033;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
      font-size: clamp(1.9rem, 3vw, 3rem);
      letter-spacing: -0.04em;
    }

    .toolbar-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    button {
      min-height: 42px;
      padding: 0 18px;
      border: 0;
      border-radius: 14px;
      cursor: pointer;
      font-weight: 800;
      color: white;
      background: #172033;
    }

    @media (max-width: 980px) {
      .app-shell {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
        height: auto;
      }

      .toolbar,
      .toolbar-actions {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class AppLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly normalizedRole = computed(() => this.authService.normalizedRole());
  protected readonly navItems = computed<NavigationItem[]>(() => {
    const role = this.normalizedRole();

    if (role === 'teacher') {
      return [
        { labelKey: 'nav.dashboard', path: '/app/dashboard' },
        { labelKey: 'nav.myCourses', path: '/app/courses' },
        { labelKey: 'nav.privateSessions', path: '/app/private-sessions' },
        { labelKey: 'nav.notifications', path: '/app/notifications' }
      ];
    }

    if (role === 'admin') {
      return [
        { labelKey: 'nav.dashboard', path: '/app/dashboard' },
        { labelKey: 'nav.courses', path: '/app/courses' },
        { labelKey: 'nav.adminTeachers', path: '/app/admin/teachers' },
        { labelKey: 'nav.notifications', path: '/app/notifications' }
      ];
    }

    return [
      { labelKey: 'nav.dashboard', path: '/app/dashboard' },
      { labelKey: 'nav.courses', path: '/app/courses' },
      { labelKey: 'nav.tutors', path: '/app/tutors' },
      { labelKey: 'nav.wallet', path: '/app/wallet' },
      { labelKey: 'nav.privateSessions', path: '/app/private-sessions' },
      { labelKey: 'nav.notifications', path: '/app/notifications' }
    ];
  });

  protected pageTitle(): string {
    const url = this.router.url;
    if (url.includes('/courses/')) return 'pages.courseDetails';
    if (url.includes('/courses')) return 'pages.courses';
    if (url.includes('/tutors/')) return 'pages.tutorDetails';
    if (url.includes('/tutors')) return 'pages.tutors';
    if (url.includes('/wallet')) return 'Wallet';
    if (url.includes('/private-sessions')) return 'Private sessions';
    if (url.includes('/notifications')) return 'Notifications';
    if (url.includes('/admin/teachers')) return 'Teacher management';
    return 'pages.dashboard';
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
