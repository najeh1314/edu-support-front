import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <section class="auth-card">
        <a routerLink="/" class="back-link">Back to home</a>
        <h1>Register</h1>
        <p>Create a student or teacher account. Teacher accounts stay inactive until an admin validates them.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="double">
            <label><span>First name</span><input type="text" formControlName="firstName"></label>
            <label><span>Last name</span><input type="text" formControlName="lastName"></label>
          </div>

          <label><span>Email</span><input type="email" formControlName="email"></label>
          <label><span>Password</span><input type="password" formControlName="password"></label>
          <label><span>Level or department</span><input type="text" formControlName="level"></label>

          <label>
            <span>Role</span>
            <select formControlName="role">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>

          @if (message()) {
            <p class="message">{{ message() }}</p>
          }

          @if (errorMessage()) {
            <p class="error">{{ errorMessage() }}</p>
          }

          <button type="submit">Register</button>
        </form>
      </section>
    </main>
  `,
  styles: [`
    .auth-page { width: min(860px, 100%); margin: 0 auto; }
    .auth-card {
      padding: 28px; border-radius: 28px; background: rgba(255,252,246,.76);
      border: 1px solid rgba(30,41,59,.11); box-shadow: 0 24px 60px rgba(71,47,24,.12);
    }
    h1 { margin: 0 0 12px; color: #172033; font-family: 'Space Grotesk', 'Segoe UI', sans-serif; }
    p, span { color: #5f6779; }
    .back-link { color: #172033; font-weight: 700; text-decoration: none; }
    form { display: grid; gap: 16px; margin-top: 20px; }
    .double { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }
    label { display: grid; gap: 8px; }
    input, select { min-height: 48px; padding: 0 14px; border-radius: 14px; border: 1px solid rgba(23,32,51,.14); }
    button { min-height: 44px; border: 0; border-radius: 14px; cursor: pointer; font-weight: 800; color: white; background: linear-gradient(135deg, #d96c3f, #eb8b52); }
    .error { margin: 0; color: #b42318; font-weight: 700; }
    .message { margin: 0; color: #166534; font-weight: 700; }
    @media (max-width: 760px) { .double { grid-template-columns: 1fr; } }
  `]
})
export class RegisterPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected readonly message = signal('');
  protected readonly form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    level: ['', Validators.required],
    role: ['student', Validators.required]
  });

  protected submit(): void {
    this.errorMessage.set('');
    this.message.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.register(this.form.getRawValue() as any).subscribe({
      next: (response) => {
        this.message.set(response.message);
        setTimeout(() => this.router.navigateByUrl('/login'), 1200);
      },
      error: (error) => this.errorMessage.set(error.error?.message ?? 'Registration failed')
    });
  }
}
