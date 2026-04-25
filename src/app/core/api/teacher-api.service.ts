import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivateSessionDto, TeacherDto } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class TeacherApiService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(`${API_BASE}/teachers`);
  }

  getPrivateSessions(): Observable<PrivateSessionDto[]> {
    return this.http.get<PrivateSessionDto[]>(`${API_BASE}/teacher/private-sessions`);
  }

  confirmPrivateSession(id: number): Observable<PrivateSessionDto> {
    return this.http.post<PrivateSessionDto>(`${API_BASE}/teacher/private-sessions/${id}/confirm`, {});
  }

  rejectPrivateSession(id: number): Observable<PrivateSessionDto> {
    return this.http.post<PrivateSessionDto>(`${API_BASE}/teacher/private-sessions/${id}/reject`, {});
  }
}
