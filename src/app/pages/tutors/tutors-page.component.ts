import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeacherApiService } from '../../core/api/teacher-api.service';

@Component({
  selector: 'app-tutors-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="tutor-grid">
      @for (tutor of teachers(); track tutor.id) {
        <a class="tutor-card" [routerLink]="['/app/tutors', tutor.id]">
          <div class="avatar">{{ tutor.avatar }}</div>
          <h3>{{ tutor.firstName }} {{ tutor.lastName }}</h3>
          <span>{{ tutor.level }}</span>
          <p>{{ tutor.bio }}</p>
          <div class="stats">
            <small>{{ tutor.subjects.join(', ') }}</small>
            <strong>{{ tutor.enabled ? 'Active' : 'Inactive' }}</strong>
          </div>
        </a>
      }
    </section>
  `,
  styles: [`
    .tutor-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
    .tutor-card{display:block;padding:22px;border-radius:24px;text-decoration:none;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .avatar{display:grid;place-items:center;width:54px;height:54px;margin-bottom:16px;border-radius:18px;background:linear-gradient(135deg,#d96c3f,#f2ba59);color:white;font-weight:800}
    h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span,small{color:#5f6779}
    .stats{display:flex;justify-content:space-between;gap:16px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(23,32,51,.08)}
    @media (max-width:1024px){.tutor-grid{grid-template-columns:1fr}}
  `]
})
export class TutorsPageComponent {
  private readonly teacherApi = inject(TeacherApiService);
  protected readonly teachers = toSignal(this.teacherApi.getAll(), { initialValue: [] });
}
