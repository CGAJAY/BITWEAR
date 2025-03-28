// src/types/auth.ts
import { Socket } from 'socket.io-client';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  [key: string]: any; // For additional properties that might come from the backend
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User | null;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  [key: string]: any; // Flexible for different profile fields
}

export interface AuthState {
  user: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  socket: Socket | null;
  onlineUsers?: string[]; // Added for socket online users
  checkAuth: () => Promise<AuthResponse>;
  signup: (data: SignupData, navigate: (path: string) => void) => Promise<AuthResponse>;
  login: (data: LoginData) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
  updateProfile: (data: UpdateProfileData) => Promise<AuthResponse>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}