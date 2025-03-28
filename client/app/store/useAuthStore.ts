// src/store/authStore.ts
import { create } from "zustand";
import { io } from "socket.io-client";
import { AuthState, AuthResponse, LoginData, SignupData, UpdateProfileData } from "../types/auth";

// Get the backend URL from the env file
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

// Get the user from local storage
const initialUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: initialUser,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async (): Promise<AuthResponse> => {
    set({ isCheckingAuth: true });
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/check`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        set({ user: null });
        localStorage.removeItem("user");
        return {
          success: false,
          message: responseData.error || "Authentication check failed",
        };
      }

      set({ user: responseData });
      localStorage.setItem("user", JSON.stringify(responseData));
      get().connectSocket();
      
      return {
        success: true,
        message: "Authentication successful",
        data: responseData,
      };
    } catch (error) {
      set({ user: null });
      localStorage.removeItem("user");
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData, navigate: (path: string) => void): Promise<AuthResponse> => {
    set({ isSigningUp: true });
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || "Signup failed",
        };
      }

      navigate("/login");
      return {
        success: true,
        message: "Signup successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    set({ isLoggingIn: true });
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || "Login failed",
        };
      }

      set({ user: responseData });
      localStorage.setItem("user", JSON.stringify(responseData));
      get().connectSocket();
      
      return {
        success: true,
        message: "Login successful",
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || "Logout failed",
        };
      }

      set({ user: null });
      localStorage.removeItem("user");
      get().disconnectSocket();
      
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    }
  },

  updateProfile: async (data: UpdateProfileData): Promise<AuthResponse> => {
    set({ isUpdatingProfile: true });
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || "Profile update failed",
        };
      }

      set({ user: responseData });
      return {
        success: true,
        message: "Profile updated successfully",
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(backendUrl, {
      query: { userId: user._id },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));