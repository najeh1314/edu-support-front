import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <section class="auth-card">
        <a routerLink="/" class="back-link">Back to home</a>
        <h1>Login</h1>
        <p>Connect with your real backend account.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            <span>Email</span>
            <input type="email" formControlName="email">
          </label>

          <label>
            <span>Password</span>
            <input type="password" formControlName="password">
          </label>

          @if (errorMessage()) {
            <p class="error">{{ errorMessage() }}</p>
          }

          <button type="submit">Login</button>
        </form>

        <p class="switch">No account yet? <a routerLink="/register">Create one</a></p>
      </section>
    </main>
  `,
  styles: [`
    .auth-page { width: min(720px, 100%); margin: 0 auto; }
    .auth-card {
      padding: 28px; border-radius: 28px; background: rgba(255,252,246,.76);
      border: 1px solid rgba(30,41,59,.11); box-shadow: 0 24px 60px rgba(71,47,24,.12);
    }
    h1 { margin: 0 0 12px; color: #172033; font-family: 'Space Grotesk', 'Segoe UI', sans-serif; }
    p, span { color: #5f6779; }
    .back-link, .switch a { color: #172033; font-weight: 700; text-decoration: none; }
    form { display: grid; gap: 16px; margin-top: 20px; }
    label { display: grid; gap: 8px; }
    input { min-height: 48px; padding: 0 14px; border-radius: 14px; border: 1px solid rgba(23,32,51,.14); }
    button { min-height: 44px; border: 0; border-radius: 14px; cursor: pointer; font-weight: 800; color: white; background: linear-gradient(135deg, #d96c3f, #eb8b52); }
    .error { margin: 0; color: #b42318; font-weight: 700; }
    .switch { margin-top: 18px; }
  `]
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected submit(): void {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.getRawValue() as { email: string; password: string }).subscribe({
      next: () => this.router.navigateByUrl('/app/dashboard'),
      error: (error) => this.errorMessage.set(error.error?.message ?? 'Login failed')
    });
  }
}
