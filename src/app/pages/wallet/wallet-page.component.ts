import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { StudentApiService } from '../../core/api/student-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-wallet-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isStudent()) {
      <section class="wallet-grid">
        <article class="panel">
          <h3>Current balance</h3>
          <strong class="amount">{{ wallet()?.balance ?? 0 }} TND</strong>
          <form [formGroup]="form" (ngSubmit)="topUp()">
            <input type="number" formControlName="amount" placeholder="Amount">
            <button type="submit">Charge balance</button>
          </form>
          @if (message()) { <p class="message">{{ message() }}</p> }
        </article>

        <article class="panel">
          <h3>Payments</h3>
          <div class="list">
            @for (payment of wallet()?.payments ?? []; track payment.id) {
              <div class="item">
                <strong>{{ payment.amount }} TND</strong>
                <span>{{ payment.reference }} · {{ payment.status }}</span>
              </div>
            }
          </div>
        </article>
      </section>
    } @else {
      <p>This page is only available for students.</p>
    }
  `,
  styles: [`
    .wallet-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
    .panel{padding:24px;border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}.amount{display:block;margin:16px 0;font-size:2.4rem}
    form,.list{display:grid;gap:12px}.item{padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.72)}
    input{min-height:46px;padding:0 14px;border-radius:14px;border:1px solid rgba(23,32,51,.14)} button{min-height:42px;border:0;border-radius:14px;cursor:pointer;font-weight:800;color:#fff;background:#172033}
    .message{color:#166534;font-weight:700}
    @media (max-width:960px){.wallet-grid{grid-template-columns:1fr}}
  `]
})
export class WalletPageComponent {
  private readonly studentApi = inject(StudentApiService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly message = signal('');
  protected readonly isStudent = () => this.authService.normalizedRole() === 'student';
  protected readonly wallet = toSignal(this.studentApi.wallet(), { initialValue: null });
  protected readonly form = this.formBuilder.group({ amount: [50, [Validators.required, Validators.min(1)]] });

  protected topUp(): void {
    if (this.form.invalid) return;
    this.studentApi.topUp(Number(this.form.getRawValue().amount ?? 0)).subscribe(() => {
      this.message.set('Balance charged successfully.');
      window.location.reload();
    });
  }
}
