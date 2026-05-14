export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthUser extends UserProfile {
  // Any additional properties needed for the authenticated user session
}
