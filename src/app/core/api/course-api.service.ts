import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDto, CourseUpsertRequest } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class CourseApiService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${API_BASE}/courses`);
  }

  getOne(slug: string): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${API_BASE}/courses/${slug}`);
  }

  getMine(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${API_BASE}/courses/mine`);
  }

  create(payload: CourseUpsertRequest): Observable<CourseDto> {
    return this.http.post<CourseDto>(`${API_BASE}/courses`, payload);
  }

  update(id: number, payload: CourseUpsertRequest): Observable<CourseDto> {
    return this.http.put<CourseDto>(`${API_BASE}/courses/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/courses/${id}`);
  }
}
