import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class NotificationApiService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${API_BASE}/notifications`);
  }
}
