import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdminApiService } from '../../core/api/admin-api.service';

@Component({
  selector: 'app-admin-teachers-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="panel">
      <h3>Teacher management</h3>
      <div class="list">
        @for (teacher of teachers(); track teacher.id) {
          <div class="item">
            <div>
              <strong>{{ teacher.firstName }} {{ teacher.lastName }}</strong>
              <p>{{ teacher.email }}</p>
              <span>{{ teacher.enabled ? 'Active' : 'Pending activation' }}</span>
            </div>
            <div class="actions">
              @if (!teacher.enabled) {
                <button type="button" (click)="activate(teacher.id)">Activate</button>
              }
              <button type="button" class="danger" (click)="remove(teacher.id)">Delete</button>
            </div>
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
export class AdminTeachersPageComponent {
  private readonly adminApi = inject(AdminApiService);
  protected readonly teachers = toSignal(this.adminApi.getTeachers(), { initialValue: [] });

  protected activate(id: number): void {
    this.adminApi.activateTeacher(id).subscribe(() => window.location.reload());
  }

  protected remove(id: number): void {
    this.adminApi.deleteTeacher(id).subscribe(() => window.location.reload());
  }
}
