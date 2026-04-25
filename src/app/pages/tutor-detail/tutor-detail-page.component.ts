import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeacherApiService } from '../../core/api/teacher-api.service';
import { StudentApiService } from '../../core/api/student-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-tutor-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (teacher(); as tutor) {
      <section class="hero-card">
        <div class="identity">
          <div class="avatar">{{ tutor.avatar }}</div>
          <div>
            <h2>{{ tutor.firstName }} {{ tutor.lastName }}</h2>
            <p>{{ tutor.level }}</p>
            <span>{{ tutor.subjects.join(', ') }}</span>
          </div>
        </div>
      </section>

      <section class="detail-grid">
        <article class="panel">
          <h3>About</h3>
          <p>{{ tutor.bio }}</p>
        </article>

        <article class="panel">
          <h3>Availability</h3>
          <div class="slot-list">
            @for (slot of tutor.availability; track slot) {
              <button type="button" class="slot-btn" [class.active]="selectedSlot() === slot" (click)="selectSlot(slot)">{{ slot }}</button>
            }
          </div>
        </article>
      </section>

      @if (isStudent()) {
        <section class="panel request-panel">
          <h3>Request private session</h3>
          <textarea placeholder="Add a note for the teacher" [value]="note()" (input)="note.set(($any($event.target)).value)"></textarea>
          <button type="button" [disabled]="!selectedSlot()" (click)="requestSession(tutor.id)">Send request</button>
          @if (message()) { <p class="message">{{ message() }}</p> }
          @if (error()) { <p class="error">{{ error() }}</p> }
        </section>
      }
    }
  `,
  styles: [`
    .hero-card,.panel{border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .hero-card,.identity{display:flex;gap:18px;align-items:center}
    .hero-card,.panel{padding:24px}
    .avatar{display:grid;place-items:center;width:72px;height:72px;border-radius:22px;background:linear-gradient(135deg,#d96c3f,#f2ba59);color:white;font-size:1.2rem;font-weight:800}
    .detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px}
    .slot-list{display:grid;gap:10px;margin-top:16px}
    .slot-btn,button{min-height:42px;padding:0 16px;border-radius:14px;font-weight:800}
    .slot-btn{border:1px solid rgba(23,32,51,.14);background:#fff;cursor:pointer;text-align:left}
    .slot-btn.active,button{color:#fff;background:#172033}
    button{border:0;cursor:pointer}
    textarea{width:100%;min-height:100px;margin:14px 0;padding:12px 14px;border-radius:14px;border:1px solid rgba(23,32,51,.14);font:inherit}
    h2,h3{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span{color:#5f6779}
    .request-panel{margin-top:18px}
    .message{color:#166534;font-weight:700}.error{color:#b42318;font-weight:700}
    @media (max-width:960px){.detail-grid{grid-template-columns:1fr}}
  `]
})
export class TutorDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly teacherApi = inject(TeacherApiService);
  private readonly studentApi = inject(StudentApiService);
  private readonly authService = inject(AuthService);
  protected readonly selectedSlot = signal('');
  protected readonly note = signal('');
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly teachers = toSignal(this.teacherApi.getAll(), { initialValue: [] });
  protected readonly teacher = computed(() => this.teachers().find((t) => t.id === Number(this.route.snapshot.paramMap.get('id'))));
  protected readonly isStudent = computed(() => this.authService.normalizedRole() === 'student');

  protected selectSlot(slot: string): void {
    this.selectedSlot.set(slot);
  }

  protected requestSession(teacherId: number): void {
    const selected = this.selectedSlot();
    const separator = selected.indexOf(' ');
    const day = separator > -1 ? selected.slice(0, separator) : selected;
    const slot = separator > -1 ? selected.slice(separator + 1) : selected;

    this.studentApi.createPrivateSession(teacherId, day, slot, this.note()).subscribe({
      next: () => this.message.set('Private session request sent.'),
      error: (error) => this.error.set(error.error?.message ?? 'Request failed')
    });
  }
}
