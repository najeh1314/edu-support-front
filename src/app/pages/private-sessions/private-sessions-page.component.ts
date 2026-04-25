import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StudentApiService } from '../../core/api/student-api.service';
import { TeacherApiService } from '../../core/api/teacher-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-private-sessions-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="panel">
      <h3>Private sessions</h3>
      <div class="list">
        @for (item of sessions(); track item.id) {
          <div class="item">
            <div>
              <strong>{{ item.teacherName ?? item.studentName }}</strong>
              <p>{{ item.requestedDay }} {{ item.requestedSlot }}</p>
              <span>Status: {{ item.status }}</span>
              @if (item.meetingLink) { <p>{{ item.meetingLink }}</p> }
            </div>
            @if (isTeacher() && item.status === 'PENDING') {
              <div class="actions">
                <button type="button" (click)="confirm(item.id)">Confirm</button>
                <button type="button" class="danger" (click)="reject(item.id)">Reject</button>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .panel{padding:24px;border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .list{display:grid;gap:12px;margin-top:16px}
    .item{display:flex;justify-content:space-between;gap:16px;padding:16px;border-radius:18px;background:rgba(255,255,255,.72)}
    h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span{color:#5f6779}
    .actions{display:grid;gap:10px}
    button{min-height:40px;padding:0 14px;border:0;border-radius:12px;cursor:pointer;font-weight:800;color:#fff;background:#172033}
    .danger{background:#b42318}
  `]
})
export class PrivateSessionsPageComponent {
  private readonly authService = inject(AuthService);
  private readonly studentApi = inject(StudentApiService);
  private readonly teacherApi = inject(TeacherApiService);
  protected readonly isTeacher = computed(() => this.authService.normalizedRole() === 'teacher');
  protected readonly sessions = toSignal(
    this.isTeacher() ? this.teacherApi.getPrivateSessions() : this.studentApi.privateSessions(),
    { initialValue: [] }
  );

  protected confirm(id: number): void {
    this.teacherApi.confirmPrivateSession(id).subscribe(() => window.location.reload());
  }

  protected reject(id: number): void {
    this.teacherApi.rejectPrivateSession(id).subscribe(() => window.location.reload());
  }
}
