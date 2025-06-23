export interface User {
  id: string;
  email: string;
  nombre: string;
  telefono?: string;
  rol: 'admin' | 'user';
  activo: boolean;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  telefono?: string;
}