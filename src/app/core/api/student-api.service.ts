import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollmentDto, PrivateSessionDto, WalletResponse } from '../models/api.models';

const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class StudentApiService {
  private readonly http = inject(HttpClient);

  wallet(): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(`${API_BASE}/student/wallet`);
  }

  topUp(amount: number): Observable<WalletResponse> {
    return this.http.post<WalletResponse>(`${API_BASE}/student/wallet/top-up`, { amount });
  }

  enroll(courseId: number): Observable<EnrollmentDto> {
    return this.http.post<EnrollmentDto>(`${API_BASE}/student/enrollments`, { courseId });
  }

  enrollments(): Observable<EnrollmentDto[]> {
    return this.http.get<EnrollmentDto[]>(`${API_BASE}/student/enrollments`);
  }

  createPrivateSession(teacherId: number, day: string, slot: string, note: string): Observable<PrivateSessionDto> {
    return this.http.post<PrivateSessionDto>(`${API_BASE}/student/private-sessions`, { teacherId, day, slot, note });
  }

  privateSessions(): Observable<PrivateSessionDto[]> {
    return this.http.get<PrivateSessionDto[]>(`${API_BASE}/student/private-sessions`);
  }
}
