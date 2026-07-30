export type Role = 'student' | 'admin';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  student_name?: string;
  student_email?: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  gpa?: string;
  statement?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
