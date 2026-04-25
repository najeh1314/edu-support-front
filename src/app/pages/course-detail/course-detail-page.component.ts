import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseApiService } from '../../core/api/course-api.service';
import { StudentApiService } from '../../core/api/student-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (course(); as item) {
      <section class="hero-card">
        <div>
          <span class="badge">{{ item.category }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <div class="teacher-line">
            Teacher:
            <a [routerLink]="['/app/tutors', item.teacherId]">{{ item.teacherName }}</a>
          </div>
        </div>

        <div class="summary-card">
          <strong>{{ item.price }} TND</strong>
          <span>Next session: {{ item.nextSession }}</span>
          <span>Format: {{ item.format }}</span>
          @if (isStudent()) {
            <button type="button" (click)="enroll(item.id)">Enroll now</button>
          }
          @if (message()) { <p class="message">{{ message() }}</p> }
          @if (error()) { <p class="error">{{ error() }}</p> }
        </div>
      </section>

      <section class="detail-grid">
        <article class="panel">
          <h3>Outcomes</h3>
          <ul>@for (o of item.outcomes; track o) { <li>{{ o }}</li> }</ul>
        </article>
        <article class="panel">
          <h3>Modules</h3>
          <ul>@for (m of item.modules; track m) { <li>{{ m }}</li> }</ul>
        </article>
      </section>
    }
  `,
  styles: [`
    .hero-card,.panel,.summary-card{border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .hero-card{display:grid;grid-template-columns:1fr 320px;gap:18px;padding:24px}
    .summary-card{display:grid;gap:10px;padding:20px}
    .detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px}
    .panel{padding:22px}
    .badge{display:inline-flex;margin-bottom:12px;padding:8px 12px;border-radius:999px;background:rgba(217,108,63,.12);color:#8c3b22;font-size:.78rem;font-weight:700}
    h2,h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span,li{color:#5f6779}
    button,a{min-height:42px;display:inline-flex;align-items:center;justify-content:center;border-radius:14px;font-weight:800}
    button{border:0;cursor:pointer;color:#fff;background:#172033}
    .teacher-line a{color:#172033;font-weight:700;text-decoration:none;margin-left:6px}
    .message{color:#166534;font-weight:700}.error{color:#b42318;font-weight:700}
    @media (max-width:960px){.hero-card,.detail-grid{grid-template-columns:1fr}}
  `]
})
export class CourseDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly courseApi = inject(CourseApiService);
  private readonly studentApi = inject(StudentApiService);
  private readonly authService = inject(AuthService);
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly isStudent = computed(() => this.authService.normalizedRole() === 'student');
  protected readonly course = toSignal(this.courseApi.getOne(this.route.snapshot.paramMap.get('id') ?? ''), { initialValue: null });

  protected enroll(courseId: number): void {
    this.message.set('');
    this.error.set('');
    this.studentApi.enroll(courseId).subscribe({
      next: () => this.message.set('Enrollment completed.'),
      error: (error) => this.error.set(error.error?.message ?? 'Enrollment failed')
    });
  }
}
