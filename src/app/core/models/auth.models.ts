export type UserRole = 'ROLE_STUDENT' | 'ROLE_TEACHER' | 'ROLE_ADMIN';

export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  role: UserRole;
  enabled: boolean;
  balance: number;
  avatar: string;
  bio: string | null;
  subjects: string[];
  availability: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  role: 'student' | 'teacher';
}

export interface RegisterResponse {
  message: string;
  active: boolean;
}

export interface AuthResponse {
  token: string;
  user: AppUser;
}
