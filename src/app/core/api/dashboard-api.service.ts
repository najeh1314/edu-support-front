import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDto } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly http = inject(HttpClient);

  getDashboard(): Observable<DashboardDto> {
    return this.http.get<DashboardDto>(`${API_BASE}/dashboard`);
  }
}
