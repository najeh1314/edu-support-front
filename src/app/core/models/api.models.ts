import { AppUser } from './auth.models';

export interface CourseDto {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  level: string;
  format: string;
  duration: string;
  price: number;
  nextSession: string;
  teacherId: number;
  teacherSlug: string;
  teacherName: string;
  outcomes: string[];
  modules: string[];
}

export interface WalletResponse {
  balance: number;
  payments: PaymentDto[];
}

export interface PaymentDto {
  id: number;
  amount: number;
  status: string;
  reference: string;
  createdAt: string;
}

export interface EnrollmentDto {
  id: number;
  courseId: number;
  courseTitle: string;
  amountPaid: number;
  enrolledAt: string;
}

export interface PrivateSessionDto {
  id: number;
  teacherId?: number;
  teacherName?: string;
  studentName?: string;
  requestedDay: string;
  requestedSlot: string;
  status: string;
  meetingLink: string | null;
  createdAt?: string;
}

export interface NotificationDto {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardDto {
  title: string;
  metrics: { key: string; value: string }[];
}

export interface CourseUpsertRequest {
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  level: string;
  format: string;
  duration: string;
  price: number;
  nextSession: string;
  outcomes: string[];
  modules: string[];
}

export type TeacherDto = AppUser;
