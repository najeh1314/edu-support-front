import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationApiService } from '../../core/api/notification-api.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="panel">
      <h3>Notifications</h3>
      <div class="list">
        @for (notification of notifications(); track notification.id) {
          <div class="item">
            <strong>{{ notification.title }}</strong>
            <p>{{ notification.message }}</p>
            <span>{{ notification.createdAt | date:'short' }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .panel{padding:24px;border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .list{display:grid;gap:12px;margin-top:16px}
    .item{padding:16px;border-radius:18px;background:rgba(255,255,255,.72)}
    h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span{color:#5f6779}
  `]
})
export class NotificationsPageComponent {
  private readonly notificationApi = inject(NotificationApiService);
  protected readonly notifications = toSignal(this.notificationApi.getAll(), { initialValue: [] });
}
