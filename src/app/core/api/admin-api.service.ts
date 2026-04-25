import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherDto } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);

  getTeachers(): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(`${API_BASE}/admin/teachers`);
  }

  activateTeacher(id: number): Observable<TeacherDto> {
    return this.http.patch<TeacherDto>(`${API_BASE}/admin/teachers/${id}/activate`, {});
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/admin/teachers/${id}`);
  }
}
